(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_application_lib_index_js"],{

/***/ "../../packages/application/lib/connectionlost.js":
/*!********************************************************!*\
  !*** ../../packages/application/lib/connectionlost.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConnectionLost": () => (/* binding */ ConnectionLost)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * A default connection lost handler, which brings up an error dialog.
 */
const ConnectionLost = async function (manager, err, translator) {
    translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
    const trans = translator.load('jupyterlab');
    const title = trans.__('Server Connection Error');
    const networkMsg = trans.__('A connection to the Jupyter server could not be established.\n' +
        'JupyterLab will continue trying to reconnect.\n' +
        'Check your network connection or Jupyter server configuration.\n');
    return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(title, { message: networkMsg });
};
//# sourceMappingURL=connectionlost.js.map

/***/ }),

/***/ "../../packages/application/lib/frontend.js":
/*!**************************************************!*\
  !*** ../../packages/application/lib/frontend.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JupyterFrontEnd": () => (/* binding */ JupyterFrontEnd),
/* harmony export */   "JupyterFrontEndContextMenu": () => (/* binding */ JupyterFrontEndContextMenu)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_application__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/application */ "webpack/sharing/consume/default/@lumino/application/@lumino/application");
/* harmony import */ var _lumino_application__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_application__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_6__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







/**
 * The base Jupyter front-end application class.
 *
 * @typeparam `T` - The `shell` type. Defaults to `JupyterFrontEnd.IShell`.
 *
 * @typeparam `U` - The type for supported format names. Defaults to `string`.
 *
 * #### Notes
 * This type is useful as a generic application against which front-end plugins
 * can be authored. It inherits from the Lumino `Application`.
 */
class JupyterFrontEnd extends _lumino_application__WEBPACK_IMPORTED_MODULE_4__.Application {
    /**
     * Construct a new JupyterFrontEnd object.
     */
    constructor(options) {
        super(options);
        this._formatChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_6__.Signal(this);
        // render context menu/submenus with inline svg icon tweaks
        this.contextMenu = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.ContextMenuSvg({
            commands: this.commands,
            renderer: options.contextMenuRenderer,
            groupByTarget: false,
            sortBySelector: false
        });
        // The default restored promise if one does not exist in the options.
        const restored = new Promise(resolve => {
            requestAnimationFrame(() => {
                resolve();
            });
        });
        this.commandLinker =
            options.commandLinker || new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.CommandLinker({ commands: this.commands });
        this.docRegistry = options.docRegistry || new _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__.DocumentRegistry();
        this.restored =
            options.restored ||
                this.started.then(() => restored).catch(() => restored);
        this.serviceManager = options.serviceManager || new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__.ServiceManager();
    }
    /**
     * The application form factor, e.g., `desktop` or `mobile`.
     */
    get format() {
        return this._format;
    }
    set format(format) {
        if (this._format !== format) {
            this._format = format;
            document.body.dataset['format'] = format;
            this._formatChanged.emit(format);
        }
    }
    /**
     * A signal that emits when the application form factor changes.
     */
    get formatChanged() {
        return this._formatChanged;
    }
    /**
     * Walks up the DOM hierarchy of the target of the active `contextmenu`
     * event, testing each HTMLElement ancestor for a user-supplied function. This can
     * be used to find an HTMLElement on which to operate, given a context menu click.
     *
     * @param fn - a function that takes an `HTMLElement` and returns a
     *   boolean for whether it is the element the requester is seeking.
     *
     * @returns an HTMLElement or undefined, if none is found.
     */
    contextMenuHitTest(fn) {
        if (!this._contextMenuEvent ||
            !(this._contextMenuEvent.target instanceof Node)) {
            return undefined;
        }
        let node = this._contextMenuEvent.target;
        do {
            if (node instanceof HTMLElement && fn(node)) {
                return node;
            }
            node = node.parentNode;
        } while (node && node.parentNode && node !== node.parentNode);
        return undefined;
        // TODO: we should be able to use .composedPath() to simplify this function
        // down to something like the below, but it seems like composedPath is
        // sometimes returning an empty list.
        /*
        if (this._contextMenuEvent) {
          this._contextMenuEvent
            .composedPath()
            .filter(x => x instanceof HTMLElement)
            .find(test);
        }
        return undefined;
        */
    }
    /**
     * A method invoked on a document `'contextmenu'` event.
     */
    evtContextMenu(event) {
        this._contextMenuEvent = event;
        if (event.shiftKey ||
            Private.suppressContextMenu(event.target)) {
            return;
        }
        const opened = this.contextMenu.open(event);
        if (opened) {
            const items = this.contextMenu.menu.items;
            // If only the context menu information will be shown,
            // with no real commands, close the context menu and
            // allow the native one to open.
            if (items.length === 1 &&
                items[0].command === JupyterFrontEndContextMenu.contextMenu) {
                this.contextMenu.menu.close();
                return;
            }
            // Stop propagation and allow the application context menu to show.
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
/**
 * The namespace for `JupyterFrontEnd` class statics.
 */
(function (JupyterFrontEnd) {
    /**
     * Is JupyterLab in document mode?
     *
     * @param path - Full URL of JupyterLab
     * @param paths - The current IPaths object hydrated from PageConfig.
     */
    function inDocMode(path, paths) {
        const docPattern = new RegExp(`^${paths.urls.doc}`);
        const match = path.match(docPattern);
        if (match) {
            return true;
        }
        else {
            return false;
        }
    }
    JupyterFrontEnd.inDocMode = inDocMode;
    /**
     * The application paths dictionary token.
     */
    JupyterFrontEnd.IPaths = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__.Token('@jupyterlab/application:IPaths');
    /**
     * The application tree resolver token.
     *
     * #### Notes
     * Not all Jupyter front-end applications will have a tree resolver
     * implemented on the client-side. This token should not be required as a
     * dependency if it is possible to make it an optional dependency.
     */
    JupyterFrontEnd.ITreeResolver = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__.Token('@jupyterlab/application:ITreeResolver');
})(JupyterFrontEnd || (JupyterFrontEnd = {}));
/**
 * A namespace for module-private functionality.
 */
var Private;
(function (Private) {
    /**
     * Returns whether the element is itself, or a child of, an element with the `jp-suppress-context-menu` data attribute.
     */
    function suppressContextMenu(element) {
        return element.closest('[data-jp-suppress-context-menu]') !== null;
    }
    Private.suppressContextMenu = suppressContextMenu;
})(Private || (Private = {}));
/**
 * A namespace for the context menu override.
 */
var JupyterFrontEndContextMenu;
(function (JupyterFrontEndContextMenu) {
    /**
     * An id for a private context-menu-info ersatz command.
     */
    JupyterFrontEndContextMenu.contextMenu = '__internal:context-menu-info';
})(JupyterFrontEndContextMenu || (JupyterFrontEndContextMenu = {}));
//# sourceMappingURL=frontend.js.map

/***/ }),

/***/ "../../packages/application/lib/index.js":
/*!***********************************************!*\
  !*** ../../packages/application/lib/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConnectionLost": () => (/* reexport safe */ _connectionlost__WEBPACK_IMPORTED_MODULE_0__.ConnectionLost),
/* harmony export */   "JupyterFrontEnd": () => (/* reexport safe */ _frontend__WEBPACK_IMPORTED_MODULE_1__.JupyterFrontEnd),
/* harmony export */   "JupyterFrontEndContextMenu": () => (/* reexport safe */ _frontend__WEBPACK_IMPORTED_MODULE_1__.JupyterFrontEndContextMenu),
/* harmony export */   "JupyterLab": () => (/* reexport safe */ _lab__WEBPACK_IMPORTED_MODULE_2__.JupyterLab),
/* harmony export */   "ILayoutRestorer": () => (/* reexport safe */ _layoutrestorer__WEBPACK_IMPORTED_MODULE_3__.ILayoutRestorer),
/* harmony export */   "LayoutRestorer": () => (/* reexport safe */ _layoutrestorer__WEBPACK_IMPORTED_MODULE_3__.LayoutRestorer),
/* harmony export */   "createRendermimePlugin": () => (/* reexport safe */ _mimerenderers__WEBPACK_IMPORTED_MODULE_4__.createRendermimePlugin),
/* harmony export */   "createRendermimePlugins": () => (/* reexport safe */ _mimerenderers__WEBPACK_IMPORTED_MODULE_4__.createRendermimePlugins),
/* harmony export */   "IMimeDocumentTracker": () => (/* reexport safe */ _mimerenderers__WEBPACK_IMPORTED_MODULE_4__.IMimeDocumentTracker),
/* harmony export */   "Router": () => (/* reexport safe */ _router__WEBPACK_IMPORTED_MODULE_5__.Router),
/* harmony export */   "ILabShell": () => (/* reexport safe */ _shell__WEBPACK_IMPORTED_MODULE_6__.ILabShell),
/* harmony export */   "LabShell": () => (/* reexport safe */ _shell__WEBPACK_IMPORTED_MODULE_6__.LabShell),
/* harmony export */   "ILabStatus": () => (/* reexport safe */ _status__WEBPACK_IMPORTED_MODULE_7__.ILabStatus),
/* harmony export */   "IConnectionLost": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_8__.IConnectionLost),
/* harmony export */   "IRouter": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_8__.IRouter),
/* harmony export */   "ITreePathUpdater": () => (/* reexport safe */ _treepathupdater__WEBPACK_IMPORTED_MODULE_9__.ITreePathUpdater)
/* harmony export */ });
/* harmony import */ var _connectionlost__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./connectionlost */ "../../packages/application/lib/connectionlost.js");
/* harmony import */ var _frontend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./frontend */ "../../packages/application/lib/frontend.js");
/* harmony import */ var _lab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lab */ "../../packages/application/lib/lab.js");
/* harmony import */ var _layoutrestorer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layoutrestorer */ "../../packages/application/lib/layoutrestorer.js");
/* harmony import */ var _mimerenderers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mimerenderers */ "../../packages/application/lib/mimerenderers.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./router */ "../../packages/application/lib/router.js");
/* harmony import */ var _shell__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shell */ "../../packages/application/lib/shell.js");
/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./status */ "../../packages/application/lib/status.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tokens */ "../../packages/application/lib/tokens.js");
/* harmony import */ var _treepathupdater__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./treepathupdater */ "../../packages/application/lib/treepathupdater.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module application
 */










//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/application/lib/lab.js":
/*!*********************************************!*\
  !*** ../../packages/application/lib/lab.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JupyterLab": () => (/* binding */ JupyterLab)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _frontend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./frontend */ "../../packages/application/lib/frontend.js");
/* harmony import */ var _mimerenderers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mimerenderers */ "../../packages/application/lib/mimerenderers.js");
/* harmony import */ var _shell__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shell */ "../../packages/application/lib/shell.js");
/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./status */ "../../packages/application/lib/status.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







/**
 * JupyterLab is the main application class. It is instantiated once and shared.
 */
class JupyterLab extends _frontend__WEBPACK_IMPORTED_MODULE_3__.JupyterFrontEnd {
    /**
     * Construct a new JupyterLab object.
     */
    constructor(options = { shell: new _shell__WEBPACK_IMPORTED_MODULE_4__.LabShell() }) {
        super(Object.assign(Object.assign({}, options), { shell: options.shell || new _shell__WEBPACK_IMPORTED_MODULE_4__.LabShell() }));
        /**
         * The name of the JupyterLab application.
         */
        this.name = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('appName') || 'JupyterLab';
        /**
         * A namespace/prefix plugins may use to denote their provenance.
         */
        this.namespace = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('appNamespace') || this.name;
        /**
         * A list of all errors encountered when registering plugins.
         */
        this.registerPluginErrors = [];
        /**
         * The application busy and dirty status signals and flags.
         */
        this.status = new _status__WEBPACK_IMPORTED_MODULE_5__.LabStatus(this);
        /**
         * The version of the JupyterLab application.
         */
        this.version = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('appVersion') || 'unknown';
        this.restored = this.shell.restored
            .then(() => undefined)
            .catch(() => undefined);
        // Create an IInfo dictionary from the options to override the defaults.
        const info = Object.keys(JupyterLab.defaultInfo).reduce((acc, val) => {
            if (val in options) {
                acc[val] = JSON.parse(JSON.stringify(options[val]));
            }
            return acc;
        }, {});
        // Populate application info.
        this._info = Object.assign(Object.assign({}, JupyterLab.defaultInfo), info);
        // Populate application paths override the defaults if necessary.
        const defaultURLs = JupyterLab.defaultPaths.urls;
        const defaultDirs = JupyterLab.defaultPaths.directories;
        const optionURLs = (options.paths && options.paths.urls) || {};
        const optionDirs = (options.paths && options.paths.directories) || {};
        this._paths = {
            urls: Object.keys(defaultURLs).reduce((acc, key) => {
                if (key in optionURLs) {
                    const value = optionURLs[key];
                    acc[key] = value;
                }
                else {
                    acc[key] = defaultURLs[key];
                }
                return acc;
            }, {}),
            directories: Object.keys(JupyterLab.defaultPaths.directories).reduce((acc, key) => {
                if (key in optionDirs) {
                    const value = optionDirs[key];
                    acc[key] = value;
                }
                else {
                    acc[key] = defaultDirs[key];
                }
                return acc;
            }, {})
        };
        if (this._info.devMode) {
            this.shell.addClass('jp-mod-devMode');
        }
        // Add initial model factory.
        this.docRegistry.addModelFactory(new _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__.Base64ModelFactory());
        if (options.mimeExtensions) {
            for (const plugin of (0,_mimerenderers__WEBPACK_IMPORTED_MODULE_6__.createRendermimePlugins)(options.mimeExtensions)) {
                this.registerPlugin(plugin);
            }
        }
    }
    /**
     * The JupyterLab application information dictionary.
     */
    get info() {
        return this._info;
    }
    /**
     * The JupyterLab application paths dictionary.
     */
    get paths() {
        return this._paths;
    }
    /**
     * Register plugins from a plugin module.
     *
     * @param mod - The plugin module to register.
     */
    registerPluginModule(mod) {
        let data = mod.default;
        // Handle commonjs exports.
        if (!mod.hasOwnProperty('__esModule')) {
            data = mod;
        }
        if (!Array.isArray(data)) {
            data = [data];
        }
        data.forEach(item => {
            try {
                this.registerPlugin(item);
            }
            catch (error) {
                this.registerPluginErrors.push(error);
            }
        });
    }
    /**
     * Register the plugins from multiple plugin modules.
     *
     * @param mods - The plugin modules to register.
     */
    registerPluginModules(mods) {
        mods.forEach(mod => {
            this.registerPluginModule(mod);
        });
    }
}
/**
 * The namespace for `JupyterLab` class statics.
 */
(function (JupyterLab) {
    /**
     * The layout restorer token.
     */
    JupyterLab.IInfo = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.Token('@jupyterlab/application:IInfo');
    /**
     * The default JupyterLab application info.
     */
    JupyterLab.defaultInfo = {
        devMode: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('devMode').toLowerCase() === 'true',
        deferred: { patterns: [], matches: [] },
        disabled: { patterns: [], matches: [] },
        mimeExtensions: [],
        filesCached: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('cacheFiles').toLowerCase() === 'true'
    };
    /**
     * The default JupyterLab application paths.
     */
    JupyterLab.defaultPaths = {
        urls: {
            base: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('baseUrl'),
            notFound: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('notFoundUrl'),
            app: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('appUrl'),
            doc: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('docUrl'),
            static: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('staticUrl'),
            settings: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('settingsUrl'),
            themes: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('themesUrl'),
            translations: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('translationsApiUrl'),
            hubHost: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('hubHost') || undefined,
            hubPrefix: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('hubPrefix') || undefined,
            hubUser: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('hubUser') || undefined,
            hubServerName: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('hubServerName') || undefined
        },
        directories: {
            appSettings: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('appSettingsDir'),
            schemas: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('schemasDir'),
            static: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('staticDir'),
            templates: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('templatesDir'),
            themes: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('themesDir'),
            userSettings: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('userSettingsDir'),
            serverRoot: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('serverRoot'),
            workspaces: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('workspacesDir')
        }
    };
})(JupyterLab || (JupyterLab = {}));
//# sourceMappingURL=lab.js.map

/***/ }),

/***/ "../../packages/application/lib/layoutrestorer.js":
/*!********************************************************!*\
  !*** ../../packages/application/lib/layoutrestorer.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ILayoutRestorer": () => (/* binding */ ILayoutRestorer),
/* harmony export */   "LayoutRestorer": () => (/* binding */ LayoutRestorer)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/properties */ "webpack/sharing/consume/default/@lumino/properties/@lumino/properties");
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_properties__WEBPACK_IMPORTED_MODULE_1__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/


/**
 * The layout restorer token.
 */
const ILayoutRestorer = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/application:ILayoutRestorer');
/**
 * The data connector key for restorer data.
 */
const KEY = 'layout-restorer:data';
/**
 * The default implementation of a layout restorer.
 *
 * #### Notes
 * The lifecycle for state restoration is subtle. The sequence of events is:
 *
 * 1. The layout restorer plugin is instantiated and makes a `fetch` call to
 *    the data connector that stores the layout restoration data. The `fetch`
 *    call returns a promise that resolves in step 6, below.
 *
 * 2. Other plugins that care about state restoration require the layout
 *    restorer as a dependency.
 *
 * 3. As each load-time plugin initializes (which happens before the front-end
 *    application has `started`), it instructs the layout restorer whether
 *    the restorer ought to `restore` its widgets by passing in its widget
 *    tracker.
 *    Alternatively, a plugin that does not require its own widget tracker
 *    (because perhaps it only creates a single widget, like a command palette),
 *    can simply `add` its widget along with a persistent unique name to the
 *    layout restorer so that its layout state can be restored when the lab
 *    application restores.
 *
 * 4. After all the load-time plugins have finished initializing, the front-end
 *    application `started` promise will resolve. This is the `first`
 *    promise that the layout restorer waits for. By this point, all of the
 *    plugins that care about restoration will have instructed the layout
 *    restorer to `restore` their widget trackers.
 *
 * 5. The layout restorer will then instruct each plugin's widget tracker
 *    to restore its state and reinstantiate whichever widgets it wants. The
 *    tracker returns a promise to the layout restorer that resolves when it
 *    has completed restoring the tracked widgets it cares about.
 *
 * 6. As each widget tracker finishes restoring the widget instances it cares
 *    about, it resolves the promise that was returned to the layout restorer
 *    (in step 5). After all of the promises that the restorer is awaiting have
 *    settled, the restorer then resolves the outstanding `fetch` promise
 *    (from step 1) and hands off a layout state object to the application
 *    shell's `restoreLayout` method for restoration.
 *
 * 7. Once the application shell has finished restoring the layout, the
 *    JupyterLab application's `restored` promise is resolved.
 *
 * Of particular note are steps 5 and 6: since data restoration of plugins
 * is accomplished by executing commands, the command that is used to restore
 * the data of each plugin must return a promise that only resolves when the
 * widget has been created and added to the plugin's widget tracker.
 */
class LayoutRestorer {
    /**
     * Create a layout restorer.
     */
    constructor(options) {
        this._firstDone = false;
        this._promisesDone = false;
        this._promises = [];
        this._restored = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.PromiseDelegate();
        this._trackers = new Set();
        this._widgets = new Map();
        this._connector = options.connector;
        this._first = options.first;
        this._registry = options.registry;
        void this._first
            .then(() => {
            this._firstDone = true;
        })
            .then(() => Promise.all(this._promises))
            .then(() => {
            this._promisesDone = true;
            // Release the tracker set.
            this._trackers.clear();
        })
            .then(() => {
            this._restored.resolve(void 0);
        });
    }
    /**
     * A promise resolved when the layout restorer is ready to receive signals.
     */
    get restored() {
        return this._restored.promise;
    }
    /**
     * Add a widget to be tracked by the layout restorer.
     */
    add(widget, name) {
        Private.nameProperty.set(widget, name);
        this._widgets.set(name, widget);
        widget.disposed.connect(this._onWidgetDisposed, this);
    }
    /**
     * Fetch the layout state for the application.
     *
     * #### Notes
     * Fetching the layout relies on all widget restoration to be complete, so
     * calls to `fetch` are guaranteed to return after restoration is complete.
     */
    async fetch() {
        const blank = {
            fresh: true,
            mainArea: null,
            downArea: null,
            leftArea: null,
            rightArea: null,
            relativeSizes: null
        };
        const layout = this._connector.fetch(KEY);
        try {
            const [data] = await Promise.all([layout, this.restored]);
            if (!data) {
                return blank;
            }
            const { main, down, left, right, relativeSizes } = data;
            // If any data exists, then this is not a fresh session.
            const fresh = false;
            // Rehydrate main area.
            const mainArea = this._rehydrateMainArea(main);
            // Rehydrate down area.
            const downArea = this._rehydrateDownArea(down);
            // Rehydrate left area.
            const leftArea = this._rehydrateSideArea(left);
            // Rehydrate right area.
            const rightArea = this._rehydrateSideArea(right);
            return {
                fresh,
                mainArea,
                downArea,
                leftArea,
                rightArea,
                relativeSizes: relativeSizes || null
            };
        }
        catch (error) {
            return blank;
        }
    }
    /**
     * Restore the widgets of a particular widget tracker.
     *
     * @param tracker - The widget tracker whose widgets will be restored.
     *
     * @param options - The restoration options.
     */
    restore(tracker, options) {
        const warning = 'restore() can only be called before `first` has resolved.';
        if (this._firstDone) {
            console.warn(warning);
            return Promise.reject(warning);
        }
        const { namespace } = tracker;
        if (this._trackers.has(namespace)) {
            const warning = `A tracker namespaced ${namespace} was already restored.`;
            console.warn(warning);
            return Promise.reject(warning);
        }
        const { args, command, name, when } = options;
        // Add the tracker to the private trackers collection.
        this._trackers.add(namespace);
        // Whenever a new widget is added to the tracker, record its name.
        tracker.widgetAdded.connect((_, widget) => {
            const widgetName = name(widget);
            if (widgetName) {
                this.add(widget, `${namespace}:${widgetName}`);
            }
        }, this);
        // Whenever a widget is updated, get its new name.
        tracker.widgetUpdated.connect((_, widget) => {
            const widgetName = name(widget);
            if (widgetName) {
                const name = `${namespace}:${widgetName}`;
                Private.nameProperty.set(widget, name);
                this._widgets.set(name, widget);
            }
        });
        const first = this._first;
        const promise = tracker
            .restore({
            args: args || (() => _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.JSONExt.emptyObject),
            command,
            connector: this._connector,
            name,
            registry: this._registry,
            when: when ? [first].concat(when) : first
        })
            .catch(error => {
            console.error(error);
        });
        this._promises.push(promise);
        return promise;
    }
    /**
     * Save the layout state for the application.
     */
    save(data) {
        // If there are promises that are unresolved, bail.
        if (!this._promisesDone) {
            const warning = 'save() was called prematurely.';
            console.warn(warning);
            return Promise.reject(warning);
        }
        const dehydrated = {};
        dehydrated.main = this._dehydrateMainArea(data.mainArea);
        dehydrated.down = this._dehydrateDownArea(data.downArea);
        dehydrated.left = this._dehydrateSideArea(data.leftArea);
        dehydrated.right = this._dehydrateSideArea(data.rightArea);
        dehydrated.relativeSizes = data.relativeSizes;
        return this._connector.save(KEY, dehydrated);
    }
    /**
     * Dehydrate a main area description into a serializable object.
     */
    _dehydrateMainArea(area) {
        if (!area) {
            return null;
        }
        return Private.serializeMain(area);
    }
    /**
     * Reydrate a serialized main area description object.
     *
     * #### Notes
     * This function consumes data that can become corrupted, so it uses type
     * coercion to guarantee the dehydrated object is safely processed.
     */
    _rehydrateMainArea(area) {
        if (!area) {
            return null;
        }
        return Private.deserializeMain(area, this._widgets);
    }
    /**
     * Dehydrate a down area description into a serializable object.
     */
    _dehydrateDownArea(area) {
        if (!area) {
            return null;
        }
        const dehydrated = {
            size: area.size
        };
        if (area.currentWidget) {
            const current = Private.nameProperty.get(area.currentWidget);
            if (current) {
                dehydrated.current = current;
            }
        }
        if (area.widgets) {
            dehydrated.widgets = area.widgets
                .map(widget => Private.nameProperty.get(widget))
                .filter(name => !!name);
        }
        return dehydrated;
    }
    /**
     * Reydrate a serialized side area description object.
     *
     * #### Notes
     * This function consumes data that can become corrupted, so it uses type
     * coercion to guarantee the dehydrated object is safely processed.
     */
    _rehydrateDownArea(area) {
        var _a;
        if (!area) {
            return { currentWidget: null, size: 0.0, widgets: null };
        }
        const internal = this._widgets;
        const currentWidget = area.current && internal.has(`${area.current}`)
            ? internal.get(`${area.current}`)
            : null;
        const widgets = !Array.isArray(area.widgets)
            ? null
            : area.widgets
                .map(name => internal.has(`${name}`) ? internal.get(`${name}`) : null)
                .filter(widget => !!widget);
        return {
            currentWidget: currentWidget,
            size: (_a = area.size) !== null && _a !== void 0 ? _a : 0.0,
            widgets: widgets
        };
    }
    /**
     * Dehydrate a side area description into a serializable object.
     */
    _dehydrateSideArea(area) {
        if (!area) {
            return null;
        }
        const dehydrated = { collapsed: area.collapsed };
        if (area.currentWidget) {
            const current = Private.nameProperty.get(area.currentWidget);
            if (current) {
                dehydrated.current = current;
            }
        }
        if (area.widgets) {
            dehydrated.widgets = area.widgets
                .map(widget => Private.nameProperty.get(widget))
                .filter(name => !!name);
        }
        return dehydrated;
    }
    /**
     * Reydrate a serialized side area description object.
     *
     * #### Notes
     * This function consumes data that can become corrupted, so it uses type
     * coercion to guarantee the dehydrated object is safely processed.
     */
    _rehydrateSideArea(area) {
        var _a;
        if (!area) {
            return { collapsed: true, currentWidget: null, widgets: null };
        }
        const internal = this._widgets;
        const collapsed = (_a = area.collapsed) !== null && _a !== void 0 ? _a : false;
        const currentWidget = area.current && internal.has(`${area.current}`)
            ? internal.get(`${area.current}`)
            : null;
        const widgets = !Array.isArray(area.widgets)
            ? null
            : area.widgets
                .map(name => internal.has(`${name}`) ? internal.get(`${name}`) : null)
                .filter(widget => !!widget);
        return {
            collapsed,
            currentWidget: currentWidget,
            widgets: widgets
        };
    }
    /**
     * Handle a widget disposal.
     */
    _onWidgetDisposed(widget) {
        const name = Private.nameProperty.get(widget);
        this._widgets.delete(name);
    }
}
/*
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * An attached property for a widget's ID in the serialized restore data.
     */
    Private.nameProperty = new _lumino_properties__WEBPACK_IMPORTED_MODULE_1__.AttachedProperty({
        name: 'name',
        create: owner => ''
    });
    /**
     * Serialize individual areas within the main area.
     */
    function serializeArea(area) {
        if (!area || !area.type) {
            return null;
        }
        if (area.type === 'tab-area') {
            return {
                type: 'tab-area',
                currentIndex: area.currentIndex,
                widgets: area.widgets
                    .map(widget => Private.nameProperty.get(widget))
                    .filter(name => !!name)
            };
        }
        return {
            type: 'split-area',
            orientation: area.orientation,
            sizes: area.sizes,
            children: area.children
                .map(serializeArea)
                .filter(area => !!area)
        };
    }
    /**
     * Return a dehydrated, serializable version of the main dock panel.
     */
    function serializeMain(area) {
        const dehydrated = {
            dock: (area && area.dock && serializeArea(area.dock.main)) || null
        };
        if (area) {
            if (area.currentWidget) {
                const current = Private.nameProperty.get(area.currentWidget);
                if (current) {
                    dehydrated.current = current;
                }
            }
        }
        return dehydrated;
    }
    Private.serializeMain = serializeMain;
    /**
     * Deserialize individual areas within the main area.
     *
     * #### Notes
     * Because this data comes from a potentially unreliable foreign source, it is
     * typed as a `JSONObject`; but the actual expected type is:
     * `ITabArea | ISplitArea`.
     *
     * For fault tolerance, types are manually checked in deserialization.
     */
    function deserializeArea(area, names) {
        if (!area) {
            return null;
        }
        // Because this data is saved to a foreign data source, its type safety is
        // not guaranteed when it is retrieved, so exhaustive checks are necessary.
        const type = area.type || 'unknown';
        if (type === 'unknown' || (type !== 'tab-area' && type !== 'split-area')) {
            console.warn(`Attempted to deserialize unknown type: ${type}`);
            return null;
        }
        if (type === 'tab-area') {
            const { currentIndex, widgets } = area;
            const hydrated = {
                type: 'tab-area',
                currentIndex: currentIndex || 0,
                widgets: (widgets &&
                    widgets
                        .map(widget => names.get(widget))
                        .filter(widget => !!widget)) ||
                    []
            };
            // Make sure the current index is within bounds.
            if (hydrated.currentIndex > hydrated.widgets.length - 1) {
                hydrated.currentIndex = 0;
            }
            return hydrated;
        }
        const { orientation, sizes, children } = area;
        const hydrated = {
            type: 'split-area',
            orientation: orientation,
            sizes: sizes || [],
            children: (children &&
                children
                    .map(child => deserializeArea(child, names))
                    .filter(widget => !!widget)) ||
                []
        };
        return hydrated;
    }
    /**
     * Return the hydrated version of the main dock panel, ready to restore.
     *
     * #### Notes
     * Because this data comes from a potentially unreliable foreign source, it is
     * typed as a `JSONObject`; but the actual expected type is: `IMainArea`.
     *
     * For fault tolerance, types are manually checked in deserialization.
     */
    function deserializeMain(area, names) {
        if (!area) {
            return null;
        }
        const name = area.current || null;
        const dock = area.dock || null;
        return {
            currentWidget: (name && names.has(name) && names.get(name)) || null,
            dock: dock ? { main: deserializeArea(dock, names) } : null
        };
    }
    Private.deserializeMain = deserializeMain;
})(Private || (Private = {}));
//# sourceMappingURL=layoutrestorer.js.map

/***/ }),

/***/ "../../packages/application/lib/mimerenderers.js":
/*!*******************************************************!*\
  !*** ../../packages/application/lib/mimerenderers.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IMimeDocumentTracker": () => (/* binding */ IMimeDocumentTracker),
/* harmony export */   "createRendermimePlugins": () => (/* binding */ createRendermimePlugins),
/* harmony export */   "createRendermimePlugin": () => (/* binding */ createRendermimePlugin)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/properties */ "webpack/sharing/consume/default/@lumino/properties/@lumino/properties");
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_properties__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _layoutrestorer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./layoutrestorer */ "../../packages/application/lib/layoutrestorer.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.








/**
 * The mime document tracker token.
 */
const IMimeDocumentTracker = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__.Token('@jupyterlab/application:IMimeDocumentTracker');
/**
 * Create rendermime plugins for rendermime extension modules.
 */
function createRendermimePlugins(extensions) {
    const plugins = [];
    const namespace = 'application-mimedocuments';
    const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.WidgetTracker({ namespace });
    extensions.forEach(mod => {
        let data = mod.default;
        // Handle CommonJS exports.
        if (!mod.hasOwnProperty('__esModule')) {
            data = mod;
        }
        if (!Array.isArray(data)) {
            data = [data];
        }
        data.forEach(item => {
            plugins.push(createRendermimePlugin(tracker, item));
        });
    });
    // Also add a meta-plugin handling state restoration
    // and exposing the mime document widget tracker.
    plugins.push({
        id: '@jupyterlab/application:mimedocument',
        optional: [_layoutrestorer__WEBPACK_IMPORTED_MODULE_7__.ILayoutRestorer],
        provides: IMimeDocumentTracker,
        autoStart: true,
        activate: (app, restorer) => {
            if (restorer) {
                void restorer.restore(tracker, {
                    command: 'docmanager:open',
                    args: widget => ({
                        path: widget.context.path,
                        factory: Private.factoryNameProperty.get(widget)
                    }),
                    name: widget => `${widget.context.path}:${Private.factoryNameProperty.get(widget)}`
                });
            }
            return tracker;
        }
    });
    return plugins;
}
/**
 * Create rendermime plugins for rendermime extension modules.
 */
function createRendermimePlugin(tracker, item) {
    return {
        id: item.id,
        requires: [_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__.IRenderMimeRegistry, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.ITranslator],
        autoStart: true,
        activate: (app, rendermime, translator) => {
            // Add the mime renderer.
            if (item.rank !== undefined) {
                rendermime.addFactory(item.rendererFactory, item.rank);
            }
            else {
                rendermime.addFactory(item.rendererFactory);
            }
            // Handle the widget factory.
            if (!item.documentWidgetFactoryOptions) {
                return;
            }
            const registry = app.docRegistry;
            let options = [];
            if (Array.isArray(item.documentWidgetFactoryOptions)) {
                options = item.documentWidgetFactoryOptions;
            }
            else {
                options = [
                    item.documentWidgetFactoryOptions
                ];
            }
            if (item.fileTypes) {
                item.fileTypes.forEach(ft => {
                    if (ft.icon) {
                        // upconvert the contents of the icon field to a proper LabIcon
                        ft = Object.assign(Object.assign({}, ft), { icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__.LabIcon.resolve({ icon: ft.icon }) });
                    }
                    app.docRegistry.addFileType(ft);
                });
            }
            options.forEach(option => {
                const toolbarFactory = option.toolbarFactory
                    ? (w) => option.toolbarFactory(w.content.renderer)
                    : undefined;
                const factory = new _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__.MimeDocumentFactory({
                    renderTimeout: item.renderTimeout,
                    dataType: item.dataType,
                    rendermime,
                    modelName: option.modelName,
                    name: option.name,
                    primaryFileType: registry.getFileType(option.primaryFileType),
                    fileTypes: option.fileTypes,
                    defaultFor: option.defaultFor,
                    defaultRendered: option.defaultRendered,
                    toolbarFactory,
                    translator,
                    factory: item.rendererFactory
                });
                registry.addWidgetFactory(factory);
                factory.widgetCreated.connect((sender, widget) => {
                    Private.factoryNameProperty.set(widget, factory.name);
                    // Notify the widget tracker if restore data needs to update.
                    widget.context.pathChanged.connect(() => {
                        void tracker.save(widget);
                    });
                    void tracker.add(widget);
                });
            });
        }
    };
}
/**
 * Private namespace for the module.
 */
var Private;
(function (Private) {
    /**
     * An attached property for keeping the factory name
     * that was used to create a mimedocument.
     */
    Private.factoryNameProperty = new _lumino_properties__WEBPACK_IMPORTED_MODULE_6__.AttachedProperty({
        name: 'factoryName',
        create: () => undefined
    });
})(Private || (Private = {}));
//# sourceMappingURL=mimerenderers.js.map

/***/ }),

/***/ "../../packages/application/lib/router.js":
/*!************************************************!*\
  !*** ../../packages/application/lib/router.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Router": () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_3__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/




/**
 * A static class that routes URLs within the application.
 */
class Router {
    /**
     * Create a URL router.
     */
    constructor(options) {
        /**
         * If a matching rule's command resolves with the `stop` token during routing,
         * no further matches will execute.
         */
        this.stop = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.Token('@jupyterlab/application:Router#stop');
        this._routed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal(this);
        this._rules = new Map();
        this.base = options.base;
        this.commands = options.commands;
    }
    /**
     * Returns the parsed current URL of the application.
     */
    get current() {
        var _a, _b;
        const { base } = this;
        const parsed = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.parse(window.location.href);
        const { search, hash } = parsed;
        const path = (_b = (_a = parsed.pathname) === null || _a === void 0 ? void 0 : _a.replace(base, '/')) !== null && _b !== void 0 ? _b : '';
        const request = path + search + hash;
        return { hash, path, request, search };
    }
    /**
     * A signal emitted when the router routes a route.
     */
    get routed() {
        return this._routed;
    }
    /**
     * Navigate to a new path within the application.
     *
     * @param path - The new path or empty string if redirecting to root.
     *
     * @param options - The navigation options.
     */
    navigate(path, options = {}) {
        const { base } = this;
        const { history } = window;
        const { hard } = options;
        const old = document.location.href;
        const url = path && path.indexOf(base) === 0 ? path : _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(base, path);
        if (url === old) {
            return hard ? this.reload() : undefined;
        }
        history.pushState({}, '', url);
        if (hard) {
            return this.reload();
        }
        if (!options.skipRouting) {
            // Because a `route()` call may still be in the stack after having received
            // a `stop` token, wait for the next stack frame before calling `route()`.
            requestAnimationFrame(() => {
                void this.route();
            });
        }
    }
    /**
     * Register to route a path pattern to a command.
     *
     * @param options - The route registration options.
     *
     * @returns A disposable that removes the registered rule from the router.
     */
    register(options) {
        var _a;
        const { command, pattern } = options;
        const rank = (_a = options.rank) !== null && _a !== void 0 ? _a : 100;
        const rules = this._rules;
        rules.set(pattern, { command, rank });
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_2__.DisposableDelegate(() => {
            rules.delete(pattern);
        });
    }
    /**
     * Cause a hard reload of the document.
     */
    reload() {
        window.location.reload();
    }
    /**
     * Route a specific path to an action.
     *
     * #### Notes
     * If a pattern is matched, its command will be invoked with arguments that
     * match the `IRouter.ILocation` interface.
     */
    route() {
        const { commands, current, stop } = this;
        const { request } = current;
        const routed = this._routed;
        const rules = this._rules;
        const matches = [];
        // Collect all rules that match the URL.
        rules.forEach((rule, pattern) => {
            if (request === null || request === void 0 ? void 0 : request.match(pattern)) {
                matches.push(rule);
            }
        });
        // Order the matching rules by rank and enqueue them.
        const queue = matches.sort((a, b) => b.rank - a.rank);
        const done = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.PromiseDelegate();
        // Process each enqueued command sequentially and short-circuit if a promise
        // resolves with the `stop` token.
        const next = async () => {
            if (!queue.length) {
                routed.emit(current);
                done.resolve(undefined);
                return;
            }
            const { command } = queue.pop();
            try {
                const request = this.current.request;
                const result = await commands.execute(command, current);
                if (result === stop) {
                    queue.length = 0;
                    console.debug(`Routing ${request} was short-circuited by ${command}`);
                }
            }
            catch (reason) {
                console.warn(`Routing ${request} to ${command} failed`, reason);
            }
            void next();
        };
        void next();
        return done.promise;
    }
}
//# sourceMappingURL=router.js.map

/***/ }),

/***/ "../../packages/application/lib/shell.js":
/*!***********************************************!*\
  !*** ../../packages/application/lib/shell.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ILabShell": () => (/* binding */ ILabShell),
/* harmony export */   "LabShell": () => (/* binding */ LabShell)
/* harmony export */ });
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hackerrank_jupyterlab_collab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @hackerrank/jupyterlab-collab */ "webpack/sharing/consume/default/@hackerrank/jupyterlab-collab/@hackerrank/jupyterlab-collab");
/* harmony import */ var _hackerrank_jupyterlab_collab__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_hackerrank_jupyterlab_collab__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/messaging */ "webpack/sharing/consume/default/@lumino/messaging/@lumino/messaging");
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_messaging__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling/@lumino/polling");
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_polling__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_9__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.










/**
 * The class name added to AppShell instances.
 */
const APPLICATION_SHELL_CLASS = 'jp-LabShell';
/**
 * The class name added to side bar instances.
 */
const SIDEBAR_CLASS = 'jp-SideBar';
/**
 * The class name added to the current widget's title.
 */
const CURRENT_CLASS = 'jp-mod-current';
/**
 * The class name added to the active widget's title.
 */
const ACTIVE_CLASS = 'jp-mod-active';
/**
 * The default rank of items added to a sidebar.
 */
const DEFAULT_RANK = 900;
const ACTIVITY_CLASS = 'jp-Activity';
/**
 * The JupyterLab application shell token.
 */
const ILabShell = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__.Token('@jupyterlab/application:ILabShell');
/**
 * The application shell for JupyterLab.
 */
class LabShell extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.Widget {
    /**
     * Construct a new application shell.
     */
    constructor(options) {
        super();
        /**
         * A message hook for child add/remove messages on the main area dock panel.
         */
        this._dockChildHook = (handler, msg) => {
            switch (msg.type) {
                case 'child-added':
                    msg.child.addClass(ACTIVITY_CLASS);
                    this._tracker.add(msg.child);
                    break;
                case 'child-removed':
                    msg.child.removeClass(ACTIVITY_CLASS);
                    this._tracker.remove(msg.child);
                    break;
                default:
                    break;
            }
            return true;
        };
        this._activeChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_8__.Signal(this);
        this._cachedLayout = null;
        this._currentChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_8__.Signal(this);
        this._currentPath = '';
        this._currentPathChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_8__.Signal(this);
        this._modeChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_8__.Signal(this);
        this._isRestored = false;
        this._layoutModified = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_8__.Signal(this);
        this._layoutDebouncer = new _lumino_polling__WEBPACK_IMPORTED_MODULE_7__.Debouncer(() => {
            this._layoutModified.emit(undefined);
        }, 0);
        this._restored = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__.PromiseDelegate();
        this._tracker = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.FocusTracker();
        this._mainOptionsCache = new Map();
        this._sideOptionsCache = new Map();
        this.addClass(APPLICATION_SHELL_CLASS);
        this.id = 'main';
        const trans = ((options && options.translator) || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator).load('jupyterlab');
        const headerPanel = (this._headerPanel = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.BoxPanel());
        const menuHandler = (this._menuHandler = new Private.PanelHandler());
        menuHandler.panel.node.setAttribute('role', 'navigation');
        menuHandler.panel.node.setAttribute('aria-label', trans.__('main'));
        const topHandler = (this._topHandler = new Private.PanelHandler());
        topHandler.panel.node.setAttribute('role', 'banner');
        const bottomPanel = (this._bottomPanel = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.BoxPanel());
        bottomPanel.node.setAttribute('role', 'contentinfo');
        const hboxPanel = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.BoxPanel();
        const vsplitPanel = (this._vsplitPanel = new Private.RestorableSplitPanel());
        const dockPanel = (this._dockPanel = new _hackerrank_jupyterlab_collab__WEBPACK_IMPORTED_MODULE_3__.CollabDockPanel({
            hiddenMode: _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.Widget.HiddenMode.Scale,
            translator: options === null || options === void 0 ? void 0 : options.translator
        }));
        _lumino_messaging__WEBPACK_IMPORTED_MODULE_6__.MessageLoop.installMessageHook(dockPanel, this._dockChildHook);
        const hsplitPanel = (this._hsplitPanel = new Private.RestorableSplitPanel());
        const downPanel = (this._downPanel = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.TabPanelSvg({
            tabsMovable: true
        }));
        const leftHandler = (this._leftHandler = new Private.SideBarHandler());
        const rightHandler = (this._rightHandler = new Private.SideBarHandler());
        const rootLayout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.BoxLayout();
        headerPanel.id = 'jp-header-panel';
        menuHandler.panel.id = 'jp-menu-panel';
        topHandler.panel.id = 'jp-top-panel';
        bottomPanel.id = 'jp-bottom-panel';
        hboxPanel.id = 'jp-main-content-panel';
        vsplitPanel.id = 'jp-main-vsplit-panel';
        dockPanel.id = 'jp-main-dock-panel';
        hsplitPanel.id = 'jp-main-split-panel';
        downPanel.id = 'jp-down-stack';
        leftHandler.sideBar.addClass(SIDEBAR_CLASS);
        leftHandler.sideBar.addClass('jp-mod-left');
        leftHandler.sideBar.node.setAttribute('aria-label', trans.__('main sidebar'));
        leftHandler.sideBar.contentNode.setAttribute('aria-label', trans.__('main sidebar'));
        leftHandler.sideBar.node.setAttribute('role', 'complementary');
        leftHandler.stackedPanel.id = 'jp-left-stack';
        rightHandler.sideBar.addClass(SIDEBAR_CLASS);
        rightHandler.sideBar.addClass('jp-mod-right');
        rightHandler.sideBar.node.setAttribute('aria-label', trans.__('alternate sidebar'));
        rightHandler.sideBar.contentNode.setAttribute('aria-label', trans.__('alternate sidebar'));
        rightHandler.sideBar.node.setAttribute('role', 'complementary');
        rightHandler.stackedPanel.id = 'jp-right-stack';
        dockPanel.node.setAttribute('role', 'main');
        hboxPanel.spacing = 0;
        vsplitPanel.spacing = 1;
        dockPanel.spacing = 5;
        hsplitPanel.spacing = 1;
        headerPanel.direction = 'top-to-bottom';
        vsplitPanel.orientation = 'vertical';
        hboxPanel.direction = 'left-to-right';
        hsplitPanel.orientation = 'horizontal';
        bottomPanel.direction = 'bottom-to-top';
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.SplitPanel.setStretch(leftHandler.stackedPanel, 0);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.SplitPanel.setStretch(downPanel, 0);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.SplitPanel.setStretch(dockPanel, 1);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.SplitPanel.setStretch(rightHandler.stackedPanel, 0);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.BoxPanel.setStretch(leftHandler.sideBar, 0);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.BoxPanel.setStretch(hsplitPanel, 1);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.BoxPanel.setStretch(rightHandler.sideBar, 0);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.SplitPanel.setStretch(vsplitPanel, 1);
        hsplitPanel.addWidget(leftHandler.stackedPanel);
        hsplitPanel.addWidget(dockPanel);
        hsplitPanel.addWidget(rightHandler.stackedPanel);
        vsplitPanel.addWidget(hsplitPanel);
        vsplitPanel.addWidget(downPanel);
        hboxPanel.addWidget(leftHandler.sideBar);
        hboxPanel.addWidget(vsplitPanel);
        hboxPanel.addWidget(rightHandler.sideBar);
        rootLayout.direction = 'top-to-bottom';
        rootLayout.spacing = 0; // TODO make this configurable?
        // Use relative sizing to set the width of the side panels.
        // This will still respect the min-size of children widget in the stacked
        // panel. The default sizes will be overwritten during layout restoration.
        vsplitPanel.setRelativeSizes([3, 1]);
        hsplitPanel.setRelativeSizes([1, 2.5, 1]);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.BoxLayout.setStretch(headerPanel, 0);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.BoxLayout.setStretch(menuHandler.panel, 0);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.BoxLayout.setStretch(topHandler.panel, 0);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.BoxLayout.setStretch(hboxPanel, 1);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.BoxLayout.setStretch(bottomPanel, 0);
        rootLayout.addWidget(headerPanel);
        rootLayout.addWidget(topHandler.panel);
        rootLayout.addWidget(hboxPanel);
        rootLayout.addWidget(bottomPanel);
        // initially hiding header and bottom panel when no elements inside,
        this._headerPanel.hide();
        this._bottomPanel.hide();
        this._downPanel.hide();
        this.layout = rootLayout;
        // Connect change listeners.
        this._tracker.currentChanged.connect(this._onCurrentChanged, this);
        this._tracker.activeChanged.connect(this._onActiveChanged, this);
        // Connect main layout change listener.
        this._dockPanel.layoutModified.connect(this._onLayoutModified, this);
        // Connect vsplit layout change listener
        this._vsplitPanel.updated.connect(this._onLayoutModified, this);
        // Connect down panel change listeners
        this._downPanel.currentChanged.connect(this._onLayoutModified, this);
        this._downPanel.tabBar.tabMoved.connect(this._onTabPanelChanged, this);
        this._downPanel.stackedPanel.widgetRemoved.connect(this._onTabPanelChanged, this);
        // Catch current changed events on the side handlers.
        this._leftHandler.sideBar.currentChanged.connect(this._onLayoutModified, this);
        this._rightHandler.sideBar.currentChanged.connect(this._onLayoutModified, this);
        // Catch update events on the horizontal split panel
        this._hsplitPanel.updated.connect(this._onLayoutModified, this);
        // Setup single-document-mode title bar
        const titleHandler = (this._titleHandler = new Private.TitleHandler(this));
        this.add(titleHandler, 'top', { rank: 100 });
        if (this._dockPanel.mode === 'multiple-document') {
            this._topHandler.addWidget(this._menuHandler.panel, 100);
            titleHandler.hide();
        }
        else {
            rootLayout.insertWidget(2, this._menuHandler.panel);
        }
        // Skip Links
        const skipLinkWidget = (this._skipLinkWidget = new Private.SkipLinkWidget(this));
        this.add(skipLinkWidget, 'top', { rank: 0 });
        this._skipLinkWidget.show();
        // Wire up signals to update the title panel of the simple interface mode to
        // follow the title of this.currentWidget
        this.currentChanged.connect((sender, args) => {
            let newValue = args.newValue;
            let oldValue = args.oldValue;
            // Stop watching the title of the previously current widget
            if (oldValue) {
                oldValue.title.changed.disconnect(this._updateTitlePanelTitle, this);
            }
            // Start watching the title of the new current widget
            if (newValue) {
                newValue.title.changed.connect(this._updateTitlePanelTitle, this);
                this._updateTitlePanelTitle();
            }
            if (newValue && newValue instanceof _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_0__.DocumentWidget) {
                newValue.context.pathChanged.connect(this._updateCurrentPath, this);
            }
            this._updateCurrentPath();
        });
    }
    /**
     * A signal emitted when main area's active focus changes.
     */
    get activeChanged() {
        return this._activeChanged;
    }
    /**
     * The active widget in the shell's main area.
     */
    get activeWidget() {
        return this._tracker.activeWidget;
    }
    /**
     * A signal emitted when main area's current focus changes.
     */
    get currentChanged() {
        return this._currentChanged;
    }
    /**
     * A signal emitted when the shell/dock panel change modes (single/multiple document).
     */
    get modeChanged() {
        return this._modeChanged;
    }
    /**
     * A signal emitted when the path of the current document changes.
     *
     * This also fires when the current document itself changes.
     */
    get currentPathChanged() {
        return this._currentPathChanged;
    }
    /**
     * The current widget in the shell's main area.
     */
    get currentWidget() {
        return this._tracker.currentWidget;
    }
    /**
     * A signal emitted when the main area's layout is modified.
     */
    get layoutModified() {
        return this._layoutModified;
    }
    /**
     * Whether the left area is collapsed.
     */
    get leftCollapsed() {
        return !this._leftHandler.sideBar.currentTitle;
    }
    /**
     * Whether the left area is collapsed.
     */
    get rightCollapsed() {
        return !this._rightHandler.sideBar.currentTitle;
    }
    /**
     * Whether JupyterLab is in presentation mode with the
     * `jp-mod-presentationMode` CSS class.
     */
    get presentationMode() {
        return this.hasClass('jp-mod-presentationMode');
    }
    /**
     * Enable/disable presentation mode (`jp-mod-presentationMode` CSS class) with
     * a boolean.
     */
    set presentationMode(value) {
        this.toggleClass('jp-mod-presentationMode', value);
    }
    /**
     * The main dock area's user interface mode.
     */
    get mode() {
        return this._dockPanel.mode;
    }
    set mode(mode) {
        const dock = this._dockPanel;
        if (mode === dock.mode) {
            return;
        }
        const applicationCurrentWidget = this.currentWidget;
        if (mode === 'single-document') {
            // Cache the current multi-document layout before changing the mode.
            this._cachedLayout = dock.saveLayout();
            dock.mode = mode;
            // In case the active widget in the dock panel is *not* the active widget
            // of the application, defer to the application.
            if (this.currentWidget) {
                dock.activateWidget(this.currentWidget);
            }
            // Adjust menu and title
            this.layout.insertWidget(2, this._menuHandler.panel);
            this._titleHandler.show();
            this._updateTitlePanelTitle();
        }
        else {
            // Cache a reference to every widget currently in the dock panel before
            // changing its mode.
            const widgets = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.toArray)(dock.widgets());
            dock.mode = mode;
            // Restore the original layout.
            if (this._cachedLayout) {
                // Remove any disposed widgets in the cached layout and restore.
                Private.normalizeAreaConfig(dock, this._cachedLayout.main);
                dock.restoreLayout(this._cachedLayout);
                this._cachedLayout = null;
            }
            // Add any widgets created during single document mode, which have
            // subsequently been removed from the dock panel after the multiple document
            // layout has been restored. If the widget has add options cached for
            // the widget (i.e., if it has been placed with respect to another widget),
            // then take that into account.
            widgets.forEach(widget => {
                if (!widget.parent) {
                    this._addToMainArea(widget, Object.assign(Object.assign({}, this._mainOptionsCache.get(widget)), { activate: false }));
                }
            });
            this._mainOptionsCache.clear();
            // In case the active widget in the dock panel is *not* the active widget
            // of the application, defer to the application.
            if (applicationCurrentWidget) {
                dock.activateWidget(applicationCurrentWidget);
            }
            // Adjust menu and title
            this.add(this._menuHandler.panel, 'top', { rank: 100 });
            // this._topHandler.addWidget(this._menuHandler.panel, 100)
            this._titleHandler.hide();
        }
        // Set the mode data attribute on the applications shell node.
        this.node.dataset.shellMode = mode;
        this._downPanel.fit();
        // Emit the mode changed signal
        this._modeChanged.emit(mode);
    }
    /**
     * Promise that resolves when state is first restored, returning layout
     * description.
     */
    get restored() {
        return this._restored.promise;
    }
    /**
     * Activate a widget in its area.
     */
    activateById(id) {
        if (this._leftHandler.has(id)) {
            this._leftHandler.activate(id);
            return;
        }
        if (this._rightHandler.has(id)) {
            this._rightHandler.activate(id);
            return;
        }
        const tabIndex = this._downPanel.tabBar.titles.findIndex(title => title.owner.id === id);
        if (tabIndex >= 0) {
            this._downPanel.currentIndex = tabIndex;
            return;
        }
        const dock = this._dockPanel;
        const widget = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.find)(dock.widgets(), value => value.id === id);
        if (widget) {
            dock.activateWidget(widget);
        }
    }
    /*
     * Activate the next Tab in the active TabBar.
     */
    activateNextTab() {
        const current = this._currentTabBar();
        if (!current) {
            return;
        }
        const ci = current.currentIndex;
        if (ci === -1) {
            return;
        }
        if (ci < current.titles.length - 1) {
            current.currentIndex += 1;
            if (current.currentTitle) {
                current.currentTitle.owner.activate();
            }
            return;
        }
        if (ci === current.titles.length - 1) {
            const nextBar = this._adjacentBar('next');
            if (nextBar) {
                nextBar.currentIndex = 0;
                if (nextBar.currentTitle) {
                    nextBar.currentTitle.owner.activate();
                }
            }
        }
    }
    /*
     * Whether the add buttons for each main area tab bar are enabled.
     */
    get addButtonEnabled() {
        return this._dockPanel.addButtonEnabled;
    }
    set addButtonEnabled(value) {
        this._dockPanel.addButtonEnabled = value;
    }
    /*
     * A signal emitted when the add button on a main area tab bar is clicked.
     */
    get addRequested() {
        return this._dockPanel.addRequested;
    }
    /*
     * Activate the previous Tab in the active TabBar.
     */
    activatePreviousTab() {
        const current = this._currentTabBar();
        if (!current) {
            return;
        }
        const ci = current.currentIndex;
        if (ci === -1) {
            return;
        }
        if (ci > 0) {
            current.currentIndex -= 1;
            if (current.currentTitle) {
                current.currentTitle.owner.activate();
            }
            return;
        }
        if (ci === 0) {
            const prevBar = this._adjacentBar('previous');
            if (prevBar) {
                const len = prevBar.titles.length;
                prevBar.currentIndex = len - 1;
                if (prevBar.currentTitle) {
                    prevBar.currentTitle.owner.activate();
                }
            }
        }
    }
    /*
     * Activate the next TabBar.
     */
    activateNextTabBar() {
        const nextBar = this._adjacentBar('next');
        if (nextBar) {
            if (nextBar.currentTitle) {
                nextBar.currentTitle.owner.activate();
            }
        }
    }
    /*
     * Activate the next TabBar.
     */
    activatePreviousTabBar() {
        const nextBar = this._adjacentBar('previous');
        if (nextBar) {
            if (nextBar.currentTitle) {
                nextBar.currentTitle.owner.activate();
            }
        }
    }
    add(widget, area = 'main', options) {
        switch (area || 'main') {
            case 'bottom':
                return this._addToBottomArea(widget, options);
            case 'down':
                return this._addToDownArea(widget, options);
            case 'header':
                return this._addToHeaderArea(widget, options);
            case 'left':
                return this._addToLeftArea(widget, options);
            case 'main':
                return this._addToMainArea(widget, options);
            case 'menu':
                return this._addToMenuArea(widget, options);
            case 'right':
                return this._addToRightArea(widget, options);
            case 'top':
                return this._addToTopArea(widget, options);
            default:
                throw new Error(`Invalid area: ${area}`);
        }
    }
    /**
     * Collapse the left area.
     */
    collapseLeft() {
        this._leftHandler.collapse();
        this._onLayoutModified();
    }
    /**
     * Collapse the right area.
     */
    collapseRight() {
        this._rightHandler.collapse();
        this._onLayoutModified();
    }
    /**
     * Dispose the shell.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._layoutDebouncer.dispose();
        super.dispose();
    }
    /**
     * Expand the left area.
     *
     * #### Notes
     * This will open the most recently used tab,
     * or the first tab if there is no most recently used.
     */
    expandLeft() {
        this._leftHandler.expand();
        this._onLayoutModified();
    }
    /**
     * Expand the right area.
     *
     * #### Notes
     * This will open the most recently used tab,
     * or the first tab if there is no most recently used.
     */
    expandRight() {
        this._rightHandler.expand();
        this._onLayoutModified();
    }
    /**
     * Close all widgets in the main and down area.
     */
    closeAll() {
        // Make a copy of all the widget in the dock panel (using `toArray()`)
        // before removing them because removing them while iterating through them
        // modifies the underlying data of the iterator.
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.toArray)(this._dockPanel.widgets()).forEach(widget => widget.close());
        this._downPanel.stackedPanel.widgets.forEach(widget => widget.close());
    }
    /**
     * True if the given area is empty.
     */
    isEmpty(area) {
        switch (area) {
            case 'bottom':
                return this._bottomPanel.widgets.length === 0;
            case 'down':
                return this._downPanel.stackedPanel.widgets.length === 0;
            case 'header':
                return this._headerPanel.widgets.length === 0;
            case 'left':
                return this._leftHandler.stackedPanel.widgets.length === 0;
            case 'main':
                return this._dockPanel.isEmpty;
            case 'menu':
                return this._menuHandler.panel.widgets.length === 0;
            case 'right':
                return this._rightHandler.stackedPanel.widgets.length === 0;
            case 'top':
                return this._topHandler.panel.widgets.length === 0;
            default:
                return true;
        }
    }
    /**
     * Restore the layout state for the application shell.
     */
    restoreLayout(mode, layout) {
        var _a, _b;
        const { mainArea, downArea, leftArea, rightArea, relativeSizes } = layout;
        // Rehydrate the main area.
        if (mainArea) {
            const { currentWidget, dock } = mainArea;
            if (dock) {
                this._dockPanel.restoreLayout(dock);
            }
            if (mode) {
                this.mode = mode;
            }
            if (currentWidget) {
                this.activateById(currentWidget.id);
            }
        }
        else {
            // This is needed when loading in an empty workspace in single doc mode
            if (mode) {
                this.mode = mode;
            }
        }
        // Rehydrate the down area
        if (downArea) {
            const { currentWidget, widgets, size } = downArea;
            const widgetIds = (_a = widgets === null || widgets === void 0 ? void 0 : widgets.map(widget => widget.id)) !== null && _a !== void 0 ? _a : [];
            // Remove absent widgets
            this._downPanel.tabBar.titles
                .filter(title => !widgetIds.includes(title.owner.id))
                .map(title => title.owner.close());
            // Add new widgets
            const titleIds = this._downPanel.tabBar.titles.map(title => title.owner.id);
            widgets === null || widgets === void 0 ? void 0 : widgets.filter(widget => !titleIds.includes(widget.id)).map(widget => this._downPanel.addWidget(widget));
            // Reorder tabs
            while (!_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayExt.shallowEqual(widgetIds, this._downPanel.tabBar.titles.map(title => title.owner.id))) {
                this._downPanel.tabBar.titles.forEach((title, index) => {
                    const position = widgetIds.findIndex(id => title.owner.id == id);
                    if (position >= 0 && position != index) {
                        this._downPanel.tabBar.insertTab(position, title);
                    }
                });
            }
            if (currentWidget) {
                const index = this._downPanel.stackedPanel.widgets.findIndex(widget => widget.id === currentWidget.id);
                if (index) {
                    this._downPanel.currentIndex = index;
                    (_b = this._downPanel.currentWidget) === null || _b === void 0 ? void 0 : _b.activate();
                }
            }
            if (size && size > 0.0) {
                this._vsplitPanel.setRelativeSizes([1.0 - size, size]);
            }
            else {
                // Close all tabs and hide the panel
                this._downPanel.stackedPanel.widgets.forEach(widget => widget.close());
                this._downPanel.hide();
            }
        }
        // Rehydrate the left area.
        if (leftArea) {
            this._leftHandler.rehydrate(leftArea);
        }
        else {
            if (mode === 'single-document') {
                this.collapseLeft();
            }
        }
        // Rehydrate the right area.
        if (rightArea) {
            this._rightHandler.rehydrate(rightArea);
        }
        else {
            if (mode === 'single-document') {
                this.collapseRight();
            }
        }
        // Restore the relative sizes.
        if (relativeSizes) {
            this._hsplitPanel.setRelativeSizes(relativeSizes);
        }
        if (!this._isRestored) {
            // Make sure all messages in the queue are finished before notifying
            // any extensions that are waiting for the promise that guarantees the
            // application state has been restored.
            _lumino_messaging__WEBPACK_IMPORTED_MODULE_6__.MessageLoop.flush();
            this._restored.resolve(layout);
        }
    }
    /**
     * Save the dehydrated state of the application shell.
     */
    saveLayout() {
        // If the application is in single document mode, use the cached layout if
        // available. Otherwise, default to querying the dock panel for layout.
        const layout = {
            mainArea: {
                currentWidget: this._tracker.currentWidget,
                dock: this.mode === 'single-document'
                    ? this._cachedLayout || this._dockPanel.saveLayout()
                    : this._dockPanel.saveLayout()
            },
            downArea: {
                currentWidget: this._downPanel.currentWidget,
                widgets: (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.toArray)(this._downPanel.stackedPanel.widgets),
                size: this._vsplitPanel.relativeSizes()[1]
            },
            leftArea: this._leftHandler.dehydrate(),
            rightArea: this._rightHandler.dehydrate(),
            relativeSizes: this._hsplitPanel.relativeSizes()
        };
        return layout;
    }
    /**
     * Update the shell configuration.
     *
     * @param config Shell configuration
     */
    updateConfig(config) {
        if (config.hiddenMode) {
            this._dockPanel.hiddenMode =
                config.hiddenMode === 'display'
                    ? _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.Widget.HiddenMode.Display
                    : _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.Widget.HiddenMode.Scale;
        }
    }
    /**
     * Returns the widgets for an application area.
     */
    widgets(area) {
        switch (area !== null && area !== void 0 ? area : 'main') {
            case 'main':
                return this._dockPanel.widgets();
            case 'left':
                return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.iter)(this._leftHandler.sideBar.titles.map(t => t.owner));
            case 'right':
                return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.iter)(this._rightHandler.sideBar.titles.map(t => t.owner));
            case 'header':
                return this._headerPanel.children();
            case 'top':
                return this._topHandler.panel.children();
            case 'menu':
                return this._menuHandler.panel.children();
            case 'bottom':
                return this._bottomPanel.children();
            default:
                throw new Error(`Invalid area: ${area}`);
        }
    }
    /**
     * Handle `after-attach` messages for the application shell.
     */
    onAfterAttach(msg) {
        this.node.dataset.shellMode = this.mode;
    }
    /**
     * Update the title panel title based on the title of the current widget.
     */
    _updateTitlePanelTitle() {
        let current = this.currentWidget;
        const inputElement = this._titleHandler.inputElement;
        inputElement.value = current ? current.title.label : '';
        inputElement.title = current ? current.title.caption : '';
    }
    /**
     * The path of the current widget changed, fire the _currentPathChanged signal.
     */
    _updateCurrentPath() {
        let current = this.currentWidget;
        let newValue = '';
        if (current && current instanceof _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_0__.DocumentWidget) {
            newValue = current.context.path;
        }
        this._currentPathChanged.emit({
            newValue: newValue,
            oldValue: this._currentPath
        });
        this._currentPath = newValue;
    }
    /**
     * Add a widget to the left content area.
     *
     * #### Notes
     * Widgets must have a unique `id` property, which will be used as the DOM id.
     */
    _addToLeftArea(widget, options) {
        if (!widget.id) {
            console.error('Widgets added to app shell must have unique id property.');
            return;
        }
        options = options || this._sideOptionsCache.get(widget) || {};
        this._sideOptionsCache.set(widget, options);
        const rank = 'rank' in options ? options.rank : DEFAULT_RANK;
        this._leftHandler.addWidget(widget, rank);
        this._onLayoutModified();
    }
    /**
     * Add a widget to the main content area.
     *
     * #### Notes
     * Widgets must have a unique `id` property, which will be used as the DOM id.
     * All widgets added to the main area should be disposed after removal
     * (disposal before removal will remove the widget automatically).
     *
     * In the options, `ref` defaults to `null`, `mode` defaults to `'tab-after'`,
     * and `activate` defaults to `true`.
     */
    _addToMainArea(widget, options) {
        if (!widget.id) {
            console.error('Widgets added to app shell must have unique id property.');
            return;
        }
        options = options || {};
        const dock = this._dockPanel;
        const mode = options.mode || 'tab-after';
        let ref = this.currentWidget;
        if (options.ref) {
            ref = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.find)(dock.widgets(), value => value.id === options.ref) || null;
        }
        const { title } = widget;
        // Add widget ID to tab so that we can get a handle on the tab's widget
        // (for context menu support)
        title.dataset = Object.assign(Object.assign({}, title.dataset), { id: widget.id });
        if (title.icon instanceof _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.LabIcon) {
            // bind an appropriate style to the icon
            title.icon = title.icon.bindprops({
                stylesheet: 'mainAreaTab'
            });
        }
        else if (typeof title.icon === 'string' || !title.icon) {
            // add some classes to help with displaying css background imgs
            title.iconClass = (0,_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.classes)(title.iconClass, 'jp-Icon');
        }
        dock.addWidget(widget, { mode, ref });
        // The dock panel doesn't account for placement information while
        // in single document mode, so upon rehydrating any widgets that were
        // added will not be in the correct place. Cache the placement information
        // here so that we can later rehydrate correctly.
        if (dock.mode === 'single-document') {
            this._mainOptionsCache.set(widget, options);
        }
        if (options.activate !== false) {
            dock.activateWidget(widget);
        }
    }
    /**
     * Add a widget to the right content area.
     *
     * #### Notes
     * Widgets must have a unique `id` property, which will be used as the DOM id.
     */
    _addToRightArea(widget, options) {
        if (!widget.id) {
            console.error('Widgets added to app shell must have unique id property.');
            return;
        }
        options = options || this._sideOptionsCache.get(widget) || {};
        const rank = 'rank' in options ? options.rank : DEFAULT_RANK;
        this._sideOptionsCache.set(widget, options);
        this._rightHandler.addWidget(widget, rank);
        this._onLayoutModified();
    }
    /**
     * Add a widget to the top content area.
     *
     * #### Notes
     * Widgets must have a unique `id` property, which will be used as the DOM id.
     */
    _addToTopArea(widget, options) {
        var _a;
        if (!widget.id) {
            console.error('Widgets added to app shell must have unique id property.');
            return;
        }
        options = options || {};
        const rank = (_a = options.rank) !== null && _a !== void 0 ? _a : DEFAULT_RANK;
        this._topHandler.addWidget(widget, rank);
        this._onLayoutModified();
        if (this._topHandler.panel.isHidden) {
            this._topHandler.panel.show();
        }
    }
    /**
     * Add a widget to the title content area.
     *
     * #### Notes
     * Widgets must have a unique `id` property, which will be used as the DOM id.
     */
    _addToMenuArea(widget, options) {
        var _a;
        if (!widget.id) {
            console.error('Widgets added to app shell must have unique id property.');
            return;
        }
        options = options || {};
        const rank = (_a = options.rank) !== null && _a !== void 0 ? _a : DEFAULT_RANK;
        this._menuHandler.addWidget(widget, rank);
        this._onLayoutModified();
        if (this._menuHandler.panel.isHidden) {
            this._menuHandler.panel.show();
        }
    }
    /**
     * Add a widget to the header content area.
     *
     * #### Notes
     * Widgets must have a unique `id` property, which will be used as the DOM id.
     */
    _addToHeaderArea(widget, options) {
        if (!widget.id) {
            console.error('Widgets added to app shell must have unique id property.');
            return;
        }
        // Temporary: widgets are added to the panel in order of insertion.
        this._headerPanel.addWidget(widget);
        this._onLayoutModified();
        if (this._headerPanel.isHidden) {
            this._headerPanel.show();
        }
    }
    /**
     * Add a widget to the bottom content area.
     *
     * #### Notes
     * Widgets must have a unique `id` property, which will be used as the DOM id.
     */
    _addToBottomArea(widget, options) {
        if (!widget.id) {
            console.error('Widgets added to app shell must have unique id property.');
            return;
        }
        // Temporary: widgets are added to the panel in order of insertion.
        this._bottomPanel.addWidget(widget);
        this._onLayoutModified();
        if (this._bottomPanel.isHidden) {
            this._bottomPanel.show();
        }
    }
    _addToDownArea(widget, options) {
        if (!widget.id) {
            console.error('Widgets added to app shell must have unique id property.');
            return;
        }
        options = options || {};
        const { title } = widget;
        // Add widget ID to tab so that we can get a handle on the tab's widget
        // (for context menu support)
        title.dataset = Object.assign(Object.assign({}, title.dataset), { id: widget.id });
        if (title.icon instanceof _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.LabIcon) {
            // bind an appropriate style to the icon
            title.icon = title.icon.bindprops({
                stylesheet: 'mainAreaTab'
            });
        }
        else if (typeof title.icon === 'string' || !title.icon) {
            // add some classes to help with displaying css background imgs
            title.iconClass = (0,_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.classes)(title.iconClass, 'jp-Icon');
        }
        this._downPanel.addWidget(widget);
        this._onLayoutModified();
        if (this._downPanel.isHidden) {
            this._downPanel.show();
        }
    }
    /*
     * Return the tab bar adjacent to the current TabBar or `null`.
     */
    _adjacentBar(direction) {
        const current = this._currentTabBar();
        if (!current) {
            return null;
        }
        const bars = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.toArray)(this._dockPanel.tabBars());
        const len = bars.length;
        const index = bars.indexOf(current);
        if (direction === 'previous') {
            return index > 0 ? bars[index - 1] : index === 0 ? bars[len - 1] : null;
        }
        // Otherwise, direction is 'next'.
        return index < len - 1
            ? bars[index + 1]
            : index === len - 1
                ? bars[0]
                : null;
    }
    /*
     * Return the TabBar that has the currently active Widget or null.
     */
    _currentTabBar() {
        const current = this._tracker.currentWidget;
        if (!current) {
            return null;
        }
        const title = current.title;
        const bars = this._dockPanel.tabBars();
        return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.find)(bars, bar => bar.titles.indexOf(title) > -1) || null;
    }
    /**
     * Handle a change to the dock area active widget.
     */
    _onActiveChanged(sender, args) {
        if (args.newValue) {
            args.newValue.title.className += ` ${ACTIVE_CLASS}`;
        }
        if (args.oldValue) {
            args.oldValue.title.className = args.oldValue.title.className.replace(ACTIVE_CLASS, '');
        }
        this._activeChanged.emit(args);
    }
    /**
     * Handle a change to the dock area current widget.
     */
    _onCurrentChanged(sender, args) {
        if (args.newValue) {
            args.newValue.title.className += ` ${CURRENT_CLASS}`;
        }
        if (args.oldValue) {
            args.oldValue.title.className = args.oldValue.title.className.replace(CURRENT_CLASS, '');
        }
        this._currentChanged.emit(args);
        this._onLayoutModified();
    }
    /**
     * Handle a change on the down panel widgets
     */
    _onTabPanelChanged() {
        if (this._downPanel.stackedPanel.widgets.length === 0) {
            this._downPanel.hide();
        }
        this._onLayoutModified();
    }
    /**
     * Handle a change to the layout.
     */
    _onLayoutModified() {
        void this._layoutDebouncer.invoke();
    }
}
var Private;
(function (Private) {
    /**
     * A less-than comparison function for side bar rank items.
     */
    function itemCmp(first, second) {
        return first.rank - second.rank;
    }
    Private.itemCmp = itemCmp;
    /**
     * Removes widgets that have been disposed from an area config, mutates area.
     */
    function normalizeAreaConfig(parent, area) {
        if (!area) {
            return;
        }
        if (area.type === 'tab-area') {
            area.widgets = area.widgets.filter(widget => !widget.isDisposed && widget.parent === parent);
            return;
        }
        area.children.forEach(child => {
            normalizeAreaConfig(parent, child);
        });
    }
    Private.normalizeAreaConfig = normalizeAreaConfig;
    /**
     * A class which manages a panel and sorts its widgets by rank.
     */
    class PanelHandler {
        constructor() {
            /**
             * A message hook for child add/remove messages on the main area dock panel.
             */
            this._panelChildHook = (handler, msg) => {
                switch (msg.type) {
                    case 'child-added':
                        {
                            const widget = msg.child;
                            // If we already know about this widget, we're done
                            if (this._items.find(v => v.widget === widget)) {
                                break;
                            }
                            // Otherwise, add to the end by default
                            const rank = this._items[this._items.length - 1].rank;
                            this._items.push({ widget, rank });
                        }
                        break;
                    case 'child-removed':
                        {
                            const widget = msg.child;
                            _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayExt.removeFirstWhere(this._items, v => v.widget === widget);
                        }
                        break;
                    default:
                        break;
                }
                return true;
            };
            this._items = new Array();
            this._panel = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.Panel();
            _lumino_messaging__WEBPACK_IMPORTED_MODULE_6__.MessageLoop.installMessageHook(this._panel, this._panelChildHook);
        }
        /**
         * Get the panel managed by the handler.
         */
        get panel() {
            return this._panel;
        }
        /**
         * Add a widget to the panel.
         *
         * If the widget is already added, it will be moved.
         */
        addWidget(widget, rank) {
            widget.parent = null;
            const item = { widget, rank };
            const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayExt.upperBound(this._items, item, Private.itemCmp);
            _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayExt.insert(this._items, index, item);
            this._panel.insertWidget(index, widget);
        }
    }
    Private.PanelHandler = PanelHandler;
    /**
     * A class which manages a side bar and related stacked panel.
     */
    class SideBarHandler {
        /**
         * Construct a new side bar handler.
         */
        constructor() {
            this._items = new Array();
            this._sideBar = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.TabBar({
                insertBehavior: 'none',
                removeBehavior: 'none',
                allowDeselect: true,
                orientation: 'vertical'
            });
            this._stackedPanel = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.StackedPanel();
            this._sideBar.hide();
            this._stackedPanel.hide();
            this._lastCurrent = null;
            this._sideBar.currentChanged.connect(this._onCurrentChanged, this);
            this._sideBar.tabActivateRequested.connect(this._onTabActivateRequested, this);
            this._stackedPanel.widgetRemoved.connect(this._onWidgetRemoved, this);
        }
        /**
         * Get the tab bar managed by the handler.
         */
        get sideBar() {
            return this._sideBar;
        }
        /**
         * Get the stacked panel managed by the handler
         */
        get stackedPanel() {
            return this._stackedPanel;
        }
        /**
         * Expand the sidebar.
         *
         * #### Notes
         * This will open the most recently used tab, or the first tab
         * if there is no most recently used.
         */
        expand() {
            const previous = this._lastCurrent || (this._items.length > 0 && this._items[0].widget);
            if (previous) {
                this.activate(previous.id);
            }
        }
        /**
         * Activate a widget residing in the side bar by ID.
         *
         * @param id - The widget's unique ID.
         */
        activate(id) {
            const widget = this._findWidgetByID(id);
            if (widget) {
                this._sideBar.currentTitle = widget.title;
                widget.activate();
            }
        }
        /**
         * Test whether the sidebar has the given widget by id.
         */
        has(id) {
            return this._findWidgetByID(id) !== null;
        }
        /**
         * Collapse the sidebar so no items are expanded.
         */
        collapse() {
            this._sideBar.currentTitle = null;
        }
        /**
         * Add a widget and its title to the stacked panel and side bar.
         *
         * If the widget is already added, it will be moved.
         */
        addWidget(widget, rank) {
            widget.parent = null;
            widget.hide();
            const item = { widget, rank };
            const index = this._findInsertIndex(item);
            _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayExt.insert(this._items, index, item);
            this._stackedPanel.insertWidget(index, widget);
            const title = this._sideBar.insertTab(index, widget.title);
            // Store the parent id in the title dataset
            // in order to dispatch click events to the right widget.
            title.dataset = { id: widget.id };
            if (title.icon instanceof _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.LabIcon) {
                // bind an appropriate style to the icon
                title.icon = title.icon.bindprops({
                    stylesheet: 'sideBar'
                });
            }
            else if (typeof title.icon === 'string' || !title.icon) {
                // add some classes to help with displaying css background imgs
                title.iconClass = (0,_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.classes)(title.iconClass, 'jp-Icon', 'jp-Icon-20');
            }
            this._refreshVisibility();
        }
        /**
         * Dehydrate the side bar data.
         */
        dehydrate() {
            const collapsed = this._sideBar.currentTitle === null;
            const widgets = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.toArray)(this._stackedPanel.widgets);
            const currentWidget = widgets[this._sideBar.currentIndex];
            return { collapsed, currentWidget, widgets };
        }
        /**
         * Rehydrate the side bar.
         */
        rehydrate(data) {
            if (data.currentWidget) {
                this.activate(data.currentWidget.id);
            }
            if (data.collapsed) {
                this.collapse();
            }
        }
        /**
         * Find the insertion index for a rank item.
         */
        _findInsertIndex(item) {
            return _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayExt.upperBound(this._items, item, Private.itemCmp);
        }
        /**
         * Find the index of the item with the given widget, or `-1`.
         */
        _findWidgetIndex(widget) {
            return _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayExt.findFirstIndex(this._items, i => i.widget === widget);
        }
        /**
         * Find the widget which owns the given title, or `null`.
         */
        _findWidgetByTitle(title) {
            const item = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.find)(this._items, value => value.widget.title === title);
            return item ? item.widget : null;
        }
        /**
         * Find the widget with the given id, or `null`.
         */
        _findWidgetByID(id) {
            const item = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.find)(this._items, value => value.widget.id === id);
            return item ? item.widget : null;
        }
        /**
         * Refresh the visibility of the side bar and stacked panel.
         */
        _refreshVisibility() {
            this._sideBar.setHidden(this._sideBar.titles.length === 0);
            this._stackedPanel.setHidden(this._sideBar.currentTitle === null);
        }
        /**
         * Handle the `currentChanged` signal from the sidebar.
         */
        _onCurrentChanged(sender, args) {
            const oldWidget = args.previousTitle
                ? this._findWidgetByTitle(args.previousTitle)
                : null;
            const newWidget = args.currentTitle
                ? this._findWidgetByTitle(args.currentTitle)
                : null;
            if (oldWidget) {
                oldWidget.hide();
            }
            if (newWidget) {
                newWidget.show();
            }
            this._lastCurrent = newWidget || oldWidget;
            this._refreshVisibility();
        }
        /**
         * Handle a `tabActivateRequest` signal from the sidebar.
         */
        _onTabActivateRequested(sender, args) {
            args.title.owner.activate();
        }
        /*
         * Handle the `widgetRemoved` signal from the stacked panel.
         */
        _onWidgetRemoved(sender, widget) {
            if (widget === this._lastCurrent) {
                this._lastCurrent = null;
            }
            _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayExt.removeAt(this._items, this._findWidgetIndex(widget));
            this._sideBar.removeTab(widget.title);
            this._refreshVisibility();
        }
    }
    Private.SideBarHandler = SideBarHandler;
    class SkipLinkWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.Widget {
        /**
         * Construct a new skipLink widget.
         */
        constructor(shell) {
            super();
            this.addClass('jp-skiplink');
            this.id = 'jp-skiplink';
            this._shell = shell;
            this._createSkipLink('Skip to left side bar');
        }
        handleEvent(event) {
            switch (event.type) {
                case 'click':
                    this._focusLeftSideBar();
                    break;
            }
        }
        /**
         * Handle `after-attach` messages for the widget.
         */
        onAfterAttach(msg) {
            super.onAfterAttach(msg);
            this.node.addEventListener('click', this);
        }
        /**
         * A message handler invoked on a `'before-detach'`
         * message
         */
        onBeforeDetach(msg) {
            this.node.removeEventListener('click', this);
            super.onBeforeDetach(msg);
        }
        _focusLeftSideBar() {
            this._shell.expandLeft();
        }
        _createSkipLink(skipLinkText) {
            const skipLink = document.createElement('a');
            skipLink.href = '#';
            skipLink.tabIndex = 1;
            skipLink.text = skipLinkText;
            skipLink.className = 'skip-link';
            this.node.appendChild(skipLink);
        }
    }
    Private.SkipLinkWidget = SkipLinkWidget;
    class TitleHandler extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.Widget {
        /**
         * Construct a new title handler.
         */
        constructor(shell) {
            super();
            this._selected = false;
            const inputElement = document.createElement('input');
            inputElement.type = 'text';
            this.node.appendChild(inputElement);
            this._shell = shell;
            this.id = 'jp-title-panel-title';
        }
        /**
         * Handle `after-attach` messages for the widget.
         */
        onAfterAttach(msg) {
            super.onAfterAttach(msg);
            this.inputElement.addEventListener('keyup', this);
            this.inputElement.addEventListener('click', this);
            this.inputElement.addEventListener('blur', this);
        }
        /**
         * Handle `before-detach` messages for the widget.
         */
        onBeforeDetach(msg) {
            super.onBeforeDetach(msg);
            this.inputElement.removeEventListener('keyup', this);
            this.inputElement.removeEventListener('click', this);
            this.inputElement.removeEventListener('blur', this);
        }
        handleEvent(event) {
            switch (event.type) {
                case 'keyup':
                    void this._evtKeyUp(event);
                    break;
                case 'click':
                    this._evtClick(event);
                    break;
                case 'blur':
                    this._selected = false;
                    break;
            }
        }
        /**
         * Handle `keyup` events on the handler.
         */
        async _evtKeyUp(event) {
            if (event.key == 'Enter') {
                const widget = this._shell.currentWidget;
                if (widget == null) {
                    return;
                }
                const oldName = widget.title.label;
                const inputElement = this.inputElement;
                const newName = inputElement.value;
                inputElement.blur();
                if (newName !== oldName) {
                    widget.title.label = newName;
                }
                else {
                    inputElement.value = oldName;
                }
            }
        }
        /**
         * Handle `click` events on the handler.
         */
        _evtClick(event) {
            // only handle primary button clicks
            if (event.button !== 0 || this._selected) {
                return;
            }
            const inputElement = this.inputElement;
            event.preventDefault();
            event.stopPropagation();
            this._selected = true;
            const selectEnd = inputElement.value.indexOf('.');
            if (selectEnd === -1) {
                inputElement.select();
            }
            else {
                inputElement.setSelectionRange(0, selectEnd);
            }
        }
        /**
         * The input element containing the parent widget's title.
         */
        get inputElement() {
            return this.node.children[0];
        }
    }
    Private.TitleHandler = TitleHandler;
    class RestorableSplitPanel extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_9__.SplitPanel {
        constructor(options = {}) {
            super(options);
            this.updated = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_8__.Signal(this);
        }
        /**
         * Emit 'updated' signal on 'update' requests.
         */
        onUpdateRequest(msg) {
            super.onUpdateRequest(msg);
            this.updated.emit();
        }
    }
    Private.RestorableSplitPanel = RestorableSplitPanel;
})(Private || (Private = {}));
//# sourceMappingURL=shell.js.map

/***/ }),

/***/ "../../packages/application/lib/status.js":
/*!************************************************!*\
  !*** ../../packages/application/lib/status.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ILabStatus": () => (/* binding */ ILabStatus),
/* harmony export */   "LabStatus": () => (/* binding */ LabStatus)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/* tslint:disable */
/**
 * The application status token.
 */
const ILabStatus = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/application:ILabStatus');
/**
 * The application status signals and flags class.
 */
class LabStatus {
    /**
     * Construct a new  status object.
     */
    constructor(app) {
        this._busyCount = 0;
        this._dirtyCount = 0;
        this._busySignal = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(app);
        this._dirtySignal = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(app);
    }
    /**
     * Returns a signal for when application changes its busy status.
     */
    get busySignal() {
        return this._busySignal;
    }
    /**
     * Returns a signal for when application changes its dirty status.
     */
    get dirtySignal() {
        return this._dirtySignal;
    }
    /**
     * Whether the application is busy.
     */
    get isBusy() {
        return this._busyCount > 0;
    }
    /**
     * Whether the application is dirty.
     */
    get isDirty() {
        return this._dirtyCount > 0;
    }
    /**
     * Set the application state to dirty.
     *
     * @returns A disposable used to clear the dirty state for the caller.
     */
    setDirty() {
        const oldDirty = this.isDirty;
        this._dirtyCount++;
        if (this.isDirty !== oldDirty) {
            this._dirtySignal.emit(this.isDirty);
        }
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__.DisposableDelegate(() => {
            const oldDirty = this.isDirty;
            this._dirtyCount = Math.max(0, this._dirtyCount - 1);
            if (this.isDirty !== oldDirty) {
                this._dirtySignal.emit(this.isDirty);
            }
        });
    }
    /**
     * Set the application state to busy.
     *
     * @returns A disposable used to clear the busy state for the caller.
     */
    setBusy() {
        const oldBusy = this.isBusy;
        this._busyCount++;
        if (this.isBusy !== oldBusy) {
            this._busySignal.emit(this.isBusy);
        }
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__.DisposableDelegate(() => {
            const oldBusy = this.isBusy;
            this._busyCount--;
            if (this.isBusy !== oldBusy) {
                this._busySignal.emit(this.isBusy);
            }
        });
    }
}
//# sourceMappingURL=status.js.map

/***/ }),

/***/ "../../packages/application/lib/tokens.js":
/*!************************************************!*\
  !*** ../../packages/application/lib/tokens.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IConnectionLost": () => (/* binding */ IConnectionLost),
/* harmony export */   "IRouter": () => (/* binding */ IRouter)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * A token for which a plugin can provide to respond to connection failures
 * to the application server.
 */
const IConnectionLost = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/apputils:IConnectionLost');
/**
 * The URL Router token.
 */
const IRouter = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/application:IRouter');
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/application/lib/treepathupdater.js":
/*!*********************************************************!*\
  !*** ../../packages/application/lib/treepathupdater.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ITreePathUpdater": () => (/* binding */ ITreePathUpdater)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/

/**
 * The tree path updater token.
 */
const ITreePathUpdater = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/application:ITreePathUpdater');
//# sourceMappingURL=treepathupdater.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwbGljYXRpb24vbGliL2Nvbm5lY3Rpb25sb3N0LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9hcHBsaWNhdGlvbi9saWIvZnJvbnRlbmQuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2FwcGxpY2F0aW9uL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwbGljYXRpb24vbGliL2xhYi5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwbGljYXRpb24vbGliL2xheW91dHJlc3RvcmVyLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9hcHBsaWNhdGlvbi9saWIvbWltZXJlbmRlcmVycy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwbGljYXRpb24vbGliL3JvdXRlci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwbGljYXRpb24vbGliL3NoZWxsLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9hcHBsaWNhdGlvbi9saWIvc3RhdHVzLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9hcHBsaWNhdGlvbi9saWIvdG9rZW5zLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9w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QXFCO0FBQzdCLFFBQVEsa0VBQXFCO0FBQzdCLFFBQVEsZ0VBQW1CO0FBQzNCLFFBQVEsZ0VBQW1CO0FBQzNCLFFBQVEsZ0VBQW1CO0FBQzNCLFFBQVEsa0VBQXFCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBb0I7QUFDNUIsUUFBUSxpRUFBb0I7QUFDNUIsUUFBUSxpRUFBb0I7QUFDNUIsUUFBUSxpRUFBb0I7QUFDNUIsUUFBUSxpRUFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFlBQVk7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLFVBQVU7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELG1FQUFjO0FBQzlEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwwREFBTztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RUFBOEUsd0NBQXdDLGtCQUFrQjtBQUN4STtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxZQUFZO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVEQUFJO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsS0FBSztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsMERBQU87QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx5REFBeUQ7QUFDeEU7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLCtCQUEr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O0FBQ0EsbUJBQW1CLGtFQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxrQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEZBO0FBQ0E7QUFDMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDTyw0QkFBNEIsb0RBQUs7QUFDeEM7QUFDQTtBQUNBO0FBQ08sb0JBQW9CLG9EQUFLO0FBQ2hDLGtDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQzBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNPLDZCQUE2QixvREFBSztBQUN6QywyQyIsImZpbGUiOiJwYWNrYWdlc19hcHBsaWNhdGlvbl9saWJfaW5kZXhfanMuOTZhMmFiMzgwN2MyNWJhYTFkOTguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBzaG93RXJyb3JNZXNzYWdlIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG4vKipcbiAqIEEgZGVmYXVsdCBjb25uZWN0aW9uIGxvc3QgaGFuZGxlciwgd2hpY2ggYnJpbmdzIHVwIGFuIGVycm9yIGRpYWxvZy5cbiAqL1xuZXhwb3J0IGNvbnN0IENvbm5lY3Rpb25Mb3N0ID0gYXN5bmMgZnVuY3Rpb24gKG1hbmFnZXIsIGVyciwgdHJhbnNsYXRvcikge1xuICAgIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgY29uc3QgdGl0bGUgPSB0cmFucy5fXygnU2VydmVyIENvbm5lY3Rpb24gRXJyb3InKTtcbiAgICBjb25zdCBuZXR3b3JrTXNnID0gdHJhbnMuX18oJ0EgY29ubmVjdGlvbiB0byB0aGUgSnVweXRlciBzZXJ2ZXIgY291bGQgbm90IGJlIGVzdGFibGlzaGVkLlxcbicgK1xuICAgICAgICAnSnVweXRlckxhYiB3aWxsIGNvbnRpbnVlIHRyeWluZyB0byByZWNvbm5lY3QuXFxuJyArXG4gICAgICAgICdDaGVjayB5b3VyIG5ldHdvcmsgY29ubmVjdGlvbiBvciBKdXB5dGVyIHNlcnZlciBjb25maWd1cmF0aW9uLlxcbicpO1xuICAgIHJldHVybiBzaG93RXJyb3JNZXNzYWdlKHRpdGxlLCB7IG1lc3NhZ2U6IG5ldHdvcmtNc2cgfSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29ubmVjdGlvbmxvc3QuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgQ29tbWFuZExpbmtlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IERvY3VtZW50UmVnaXN0cnkgfSBmcm9tICdAanVweXRlcmxhYi9kb2NyZWdpc3RyeSc7XG5pbXBvcnQgeyBTZXJ2aWNlTWFuYWdlciB9IGZyb20gJ0BqdXB5dGVybGFiL3NlcnZpY2VzJztcbmltcG9ydCB7IENvbnRleHRNZW51U3ZnIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbiB9IGZyb20gJ0BsdW1pbm8vYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG4vKipcbiAqIFRoZSBiYXNlIEp1cHl0ZXIgZnJvbnQtZW5kIGFwcGxpY2F0aW9uIGNsYXNzLlxuICpcbiAqIEB0eXBlcGFyYW0gYFRgIC0gVGhlIGBzaGVsbGAgdHlwZS4gRGVmYXVsdHMgdG8gYEp1cHl0ZXJGcm9udEVuZC5JU2hlbGxgLlxuICpcbiAqIEB0eXBlcGFyYW0gYFVgIC0gVGhlIHR5cGUgZm9yIHN1cHBvcnRlZCBmb3JtYXQgbmFtZXMuIERlZmF1bHRzIHRvIGBzdHJpbmdgLlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIFRoaXMgdHlwZSBpcyB1c2VmdWwgYXMgYSBnZW5lcmljIGFwcGxpY2F0aW9uIGFnYWluc3Qgd2hpY2ggZnJvbnQtZW5kIHBsdWdpbnNcbiAqIGNhbiBiZSBhdXRob3JlZC4gSXQgaW5oZXJpdHMgZnJvbSB0aGUgTHVtaW5vIGBBcHBsaWNhdGlvbmAuXG4gKi9cbmV4cG9ydCBjbGFzcyBKdXB5dGVyRnJvbnRFbmQgZXh0ZW5kcyBBcHBsaWNhdGlvbiB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IEp1cHl0ZXJGcm9udEVuZCBvYmplY3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fZm9ybWF0Q2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIC8vIHJlbmRlciBjb250ZXh0IG1lbnUvc3VibWVudXMgd2l0aCBpbmxpbmUgc3ZnIGljb24gdHdlYWtzXG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUgPSBuZXcgQ29udGV4dE1lbnVTdmcoe1xuICAgICAgICAgICAgY29tbWFuZHM6IHRoaXMuY29tbWFuZHMsXG4gICAgICAgICAgICByZW5kZXJlcjogb3B0aW9ucy5jb250ZXh0TWVudVJlbmRlcmVyLFxuICAgICAgICAgICAgZ3JvdXBCeVRhcmdldDogZmFsc2UsXG4gICAgICAgICAgICBzb3J0QnlTZWxlY3RvcjogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFRoZSBkZWZhdWx0IHJlc3RvcmVkIHByb21pc2UgaWYgb25lIGRvZXMgbm90IGV4aXN0IGluIHRoZSBvcHRpb25zLlxuICAgICAgICBjb25zdCByZXN0b3JlZCA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29tbWFuZExpbmtlciA9XG4gICAgICAgICAgICBvcHRpb25zLmNvbW1hbmRMaW5rZXIgfHwgbmV3IENvbW1hbmRMaW5rZXIoeyBjb21tYW5kczogdGhpcy5jb21tYW5kcyB9KTtcbiAgICAgICAgdGhpcy5kb2NSZWdpc3RyeSA9IG9wdGlvbnMuZG9jUmVnaXN0cnkgfHwgbmV3IERvY3VtZW50UmVnaXN0cnkoKTtcbiAgICAgICAgdGhpcy5yZXN0b3JlZCA9XG4gICAgICAgICAgICBvcHRpb25zLnJlc3RvcmVkIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydGVkLnRoZW4oKCkgPT4gcmVzdG9yZWQpLmNhdGNoKCgpID0+IHJlc3RvcmVkKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlTWFuYWdlciA9IG9wdGlvbnMuc2VydmljZU1hbmFnZXIgfHwgbmV3IFNlcnZpY2VNYW5hZ2VyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBhcHBsaWNhdGlvbiBmb3JtIGZhY3RvciwgZS5nLiwgYGRlc2t0b3BgIG9yIGBtb2JpbGVgLlxuICAgICAqL1xuICAgIGdldCBmb3JtYXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JtYXQ7XG4gICAgfVxuICAgIHNldCBmb3JtYXQoZm9ybWF0KSB7XG4gICAgICAgIGlmICh0aGlzLl9mb3JtYXQgIT09IGZvcm1hdCkge1xuICAgICAgICAgICAgdGhpcy5fZm9ybWF0ID0gZm9ybWF0O1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5kYXRhc2V0Wydmb3JtYXQnXSA9IGZvcm1hdDtcbiAgICAgICAgICAgIHRoaXMuX2Zvcm1hdENoYW5nZWQuZW1pdChmb3JtYXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIHRoYXQgZW1pdHMgd2hlbiB0aGUgYXBwbGljYXRpb24gZm9ybSBmYWN0b3IgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBnZXQgZm9ybWF0Q2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdENoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdhbGtzIHVwIHRoZSBET00gaGllcmFyY2h5IG9mIHRoZSB0YXJnZXQgb2YgdGhlIGFjdGl2ZSBgY29udGV4dG1lbnVgXG4gICAgICogZXZlbnQsIHRlc3RpbmcgZWFjaCBIVE1MRWxlbWVudCBhbmNlc3RvciBmb3IgYSB1c2VyLXN1cHBsaWVkIGZ1bmN0aW9uLiBUaGlzIGNhblxuICAgICAqIGJlIHVzZWQgdG8gZmluZCBhbiBIVE1MRWxlbWVudCBvbiB3aGljaCB0byBvcGVyYXRlLCBnaXZlbiBhIGNvbnRleHQgbWVudSBjbGljay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmbiAtIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhbiBgSFRNTEVsZW1lbnRgIGFuZCByZXR1cm5zIGFcbiAgICAgKiAgIGJvb2xlYW4gZm9yIHdoZXRoZXIgaXQgaXMgdGhlIGVsZW1lbnQgdGhlIHJlcXVlc3RlciBpcyBzZWVraW5nLlxuICAgICAqXG4gICAgICogQHJldHVybnMgYW4gSFRNTEVsZW1lbnQgb3IgdW5kZWZpbmVkLCBpZiBub25lIGlzIGZvdW5kLlxuICAgICAqL1xuICAgIGNvbnRleHRNZW51SGl0VGVzdChmbikge1xuICAgICAgICBpZiAoIXRoaXMuX2NvbnRleHRNZW51RXZlbnQgfHxcbiAgICAgICAgICAgICEodGhpcy5fY29udGV4dE1lbnVFdmVudC50YXJnZXQgaW5zdGFuY2VvZiBOb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuX2NvbnRleHRNZW51RXZlbnQudGFyZ2V0O1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIGZuKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICB9IHdoaWxlIChub2RlICYmIG5vZGUucGFyZW50Tm9kZSAmJiBub2RlICE9PSBub2RlLnBhcmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAvLyBUT0RPOiB3ZSBzaG91bGQgYmUgYWJsZSB0byB1c2UgLmNvbXBvc2VkUGF0aCgpIHRvIHNpbXBsaWZ5IHRoaXMgZnVuY3Rpb25cbiAgICAgICAgLy8gZG93biB0byBzb21ldGhpbmcgbGlrZSB0aGUgYmVsb3csIGJ1dCBpdCBzZWVtcyBsaWtlIGNvbXBvc2VkUGF0aCBpc1xuICAgICAgICAvLyBzb21ldGltZXMgcmV0dXJuaW5nIGFuIGVtcHR5IGxpc3QuXG4gICAgICAgIC8qXG4gICAgICAgIGlmICh0aGlzLl9jb250ZXh0TWVudUV2ZW50KSB7XG4gICAgICAgICAgdGhpcy5fY29udGV4dE1lbnVFdmVudFxuICAgICAgICAgICAgLmNvbXBvc2VkUGF0aCgpXG4gICAgICAgICAgICAuZmlsdGVyKHggPT4geCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KVxuICAgICAgICAgICAgLmZpbmQodGVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgKi9cbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBtZXRob2QgaW52b2tlZCBvbiBhIGRvY3VtZW50IGAnY29udGV4dG1lbnUnYCBldmVudC5cbiAgICAgKi9cbiAgICBldnRDb250ZXh0TWVudShldmVudCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0TWVudUV2ZW50ID0gZXZlbnQ7XG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSB8fFxuICAgICAgICAgICAgUHJpdmF0ZS5zdXBwcmVzc0NvbnRleHRNZW51KGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcGVuZWQgPSB0aGlzLmNvbnRleHRNZW51Lm9wZW4oZXZlbnQpO1xuICAgICAgICBpZiAob3BlbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuY29udGV4dE1lbnUubWVudS5pdGVtcztcbiAgICAgICAgICAgIC8vIElmIG9ubHkgdGhlIGNvbnRleHQgbWVudSBpbmZvcm1hdGlvbiB3aWxsIGJlIHNob3duLFxuICAgICAgICAgICAgLy8gd2l0aCBubyByZWFsIGNvbW1hbmRzLCBjbG9zZSB0aGUgY29udGV4dCBtZW51IGFuZFxuICAgICAgICAgICAgLy8gYWxsb3cgdGhlIG5hdGl2ZSBvbmUgdG8gb3Blbi5cbiAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDEgJiZcbiAgICAgICAgICAgICAgICBpdGVtc1swXS5jb21tYW5kID09PSBKdXB5dGVyRnJvbnRFbmRDb250ZXh0TWVudS5jb250ZXh0TWVudSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUubWVudS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFN0b3AgcHJvcGFnYXRpb24gYW5kIGFsbG93IHRoZSBhcHBsaWNhdGlvbiBjb250ZXh0IG1lbnUgdG8gc2hvdy5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogVGhlIG5hbWVzcGFjZSBmb3IgYEp1cHl0ZXJGcm9udEVuZGAgY2xhc3Mgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChKdXB5dGVyRnJvbnRFbmQpIHtcbiAgICAvKipcbiAgICAgKiBJcyBKdXB5dGVyTGFiIGluIGRvY3VtZW50IG1vZGU/XG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCAtIEZ1bGwgVVJMIG9mIEp1cHl0ZXJMYWJcbiAgICAgKiBAcGFyYW0gcGF0aHMgLSBUaGUgY3VycmVudCBJUGF0aHMgb2JqZWN0IGh5ZHJhdGVkIGZyb20gUGFnZUNvbmZpZy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbkRvY01vZGUocGF0aCwgcGF0aHMpIHtcbiAgICAgICAgY29uc3QgZG9jUGF0dGVybiA9IG5ldyBSZWdFeHAoYF4ke3BhdGhzLnVybHMuZG9jfWApO1xuICAgICAgICBjb25zdCBtYXRjaCA9IHBhdGgubWF0Y2goZG9jUGF0dGVybik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgSnVweXRlckZyb250RW5kLmluRG9jTW9kZSA9IGluRG9jTW9kZTtcbiAgICAvKipcbiAgICAgKiBUaGUgYXBwbGljYXRpb24gcGF0aHMgZGljdGlvbmFyeSB0b2tlbi5cbiAgICAgKi9cbiAgICBKdXB5dGVyRnJvbnRFbmQuSVBhdGhzID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi9hcHBsaWNhdGlvbjpJUGF0aHMnKTtcbiAgICAvKipcbiAgICAgKiBUaGUgYXBwbGljYXRpb24gdHJlZSByZXNvbHZlciB0b2tlbi5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBOb3QgYWxsIEp1cHl0ZXIgZnJvbnQtZW5kIGFwcGxpY2F0aW9ucyB3aWxsIGhhdmUgYSB0cmVlIHJlc29sdmVyXG4gICAgICogaW1wbGVtZW50ZWQgb24gdGhlIGNsaWVudC1zaWRlLiBUaGlzIHRva2VuIHNob3VsZCBub3QgYmUgcmVxdWlyZWQgYXMgYVxuICAgICAqIGRlcGVuZGVuY3kgaWYgaXQgaXMgcG9zc2libGUgdG8gbWFrZSBpdCBhbiBvcHRpb25hbCBkZXBlbmRlbmN5LlxuICAgICAqL1xuICAgIEp1cHl0ZXJGcm9udEVuZC5JVHJlZVJlc29sdmVyID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi9hcHBsaWNhdGlvbjpJVHJlZVJlc29sdmVyJyk7XG59KShKdXB5dGVyRnJvbnRFbmQgfHwgKEp1cHl0ZXJGcm9udEVuZCA9IHt9KSk7XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBtb2R1bGUtcHJpdmF0ZSBmdW5jdGlvbmFsaXR5LlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgd2hldGhlciB0aGUgZWxlbWVudCBpcyBpdHNlbGYsIG9yIGEgY2hpbGQgb2YsIGFuIGVsZW1lbnQgd2l0aCB0aGUgYGpwLXN1cHByZXNzLWNvbnRleHQtbWVudWAgZGF0YSBhdHRyaWJ1dGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3VwcHJlc3NDb250ZXh0TWVudShlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LmNsb3Nlc3QoJ1tkYXRhLWpwLXN1cHByZXNzLWNvbnRleHQtbWVudV0nKSAhPT0gbnVsbDtcbiAgICB9XG4gICAgUHJpdmF0ZS5zdXBwcmVzc0NvbnRleHRNZW51ID0gc3VwcHJlc3NDb250ZXh0TWVudTtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgdGhlIGNvbnRleHQgbWVudSBvdmVycmlkZS5cbiAqL1xuZXhwb3J0IHZhciBKdXB5dGVyRnJvbnRFbmRDb250ZXh0TWVudTtcbihmdW5jdGlvbiAoSnVweXRlckZyb250RW5kQ29udGV4dE1lbnUpIHtcbiAgICAvKipcbiAgICAgKiBBbiBpZCBmb3IgYSBwcml2YXRlIGNvbnRleHQtbWVudS1pbmZvIGVyc2F0eiBjb21tYW5kLlxuICAgICAqL1xuICAgIEp1cHl0ZXJGcm9udEVuZENvbnRleHRNZW51LmNvbnRleHRNZW51ID0gJ19faW50ZXJuYWw6Y29udGV4dC1tZW51LWluZm8nO1xufSkoSnVweXRlckZyb250RW5kQ29udGV4dE1lbnUgfHwgKEp1cHl0ZXJGcm9udEVuZENvbnRleHRNZW51ID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb250ZW5kLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIGFwcGxpY2F0aW9uXG4gKi9cbmV4cG9ydCB7IENvbm5lY3Rpb25Mb3N0IH0gZnJvbSAnLi9jb25uZWN0aW9ubG9zdCc7XG5leHBvcnQgeyBKdXB5dGVyRnJvbnRFbmQsIEp1cHl0ZXJGcm9udEVuZENvbnRleHRNZW51IH0gZnJvbSAnLi9mcm9udGVuZCc7XG5leHBvcnQgeyBKdXB5dGVyTGFiIH0gZnJvbSAnLi9sYWInO1xuZXhwb3J0IHsgSUxheW91dFJlc3RvcmVyLCBMYXlvdXRSZXN0b3JlciB9IGZyb20gJy4vbGF5b3V0cmVzdG9yZXInO1xuZXhwb3J0IHsgY3JlYXRlUmVuZGVybWltZVBsdWdpbiwgY3JlYXRlUmVuZGVybWltZVBsdWdpbnMsIElNaW1lRG9jdW1lbnRUcmFja2VyIH0gZnJvbSAnLi9taW1lcmVuZGVyZXJzJztcbmV4cG9ydCB7IFJvdXRlciB9IGZyb20gJy4vcm91dGVyJztcbmV4cG9ydCB7IElMYWJTaGVsbCwgTGFiU2hlbGwgfSBmcm9tICcuL3NoZWxsJztcbmV4cG9ydCB7IElMYWJTdGF0dXMgfSBmcm9tICcuL3N0YXR1cyc7XG5leHBvcnQgKiBmcm9tICcuL3Rva2Vucyc7XG5leHBvcnQgeyBJVHJlZVBhdGhVcGRhdGVyIH0gZnJvbSAnLi90cmVlcGF0aHVwZGF0ZXInO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgUGFnZUNvbmZpZyB9IGZyb20gJ0BqdXB5dGVybGFiL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBCYXNlNjRNb2RlbEZhY3RvcnkgfSBmcm9tICdAanVweXRlcmxhYi9kb2NyZWdpc3RyeSc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbmltcG9ydCB7IEp1cHl0ZXJGcm9udEVuZCB9IGZyb20gJy4vZnJvbnRlbmQnO1xuaW1wb3J0IHsgY3JlYXRlUmVuZGVybWltZVBsdWdpbnMgfSBmcm9tICcuL21pbWVyZW5kZXJlcnMnO1xuaW1wb3J0IHsgTGFiU2hlbGwgfSBmcm9tICcuL3NoZWxsJztcbmltcG9ydCB7IExhYlN0YXR1cyB9IGZyb20gJy4vc3RhdHVzJztcbi8qKlxuICogSnVweXRlckxhYiBpcyB0aGUgbWFpbiBhcHBsaWNhdGlvbiBjbGFzcy4gSXQgaXMgaW5zdGFudGlhdGVkIG9uY2UgYW5kIHNoYXJlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIEp1cHl0ZXJMYWIgZXh0ZW5kcyBKdXB5dGVyRnJvbnRFbmQge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBKdXB5dGVyTGFiIG9iamVjdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0geyBzaGVsbDogbmV3IExhYlNoZWxsKCkgfSkge1xuICAgICAgICBzdXBlcihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IHNoZWxsOiBvcHRpb25zLnNoZWxsIHx8IG5ldyBMYWJTaGVsbCgpIH0pKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBuYW1lIG9mIHRoZSBKdXB5dGVyTGFiIGFwcGxpY2F0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5uYW1lID0gUGFnZUNvbmZpZy5nZXRPcHRpb24oJ2FwcE5hbWUnKSB8fCAnSnVweXRlckxhYic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIG5hbWVzcGFjZS9wcmVmaXggcGx1Z2lucyBtYXkgdXNlIHRvIGRlbm90ZSB0aGVpciBwcm92ZW5hbmNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5uYW1lc3BhY2UgPSBQYWdlQ29uZmlnLmdldE9wdGlvbignYXBwTmFtZXNwYWNlJykgfHwgdGhpcy5uYW1lO1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBsaXN0IG9mIGFsbCBlcnJvcnMgZW5jb3VudGVyZWQgd2hlbiByZWdpc3RlcmluZyBwbHVnaW5zLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZWdpc3RlclBsdWdpbkVycm9ycyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGFwcGxpY2F0aW9uIGJ1c3kgYW5kIGRpcnR5IHN0YXR1cyBzaWduYWxzIGFuZCBmbGFncy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3RhdHVzID0gbmV3IExhYlN0YXR1cyh0aGlzKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBKdXB5dGVyTGFiIGFwcGxpY2F0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy52ZXJzaW9uID0gUGFnZUNvbmZpZy5nZXRPcHRpb24oJ2FwcFZlcnNpb24nKSB8fCAndW5rbm93bic7XG4gICAgICAgIHRoaXMucmVzdG9yZWQgPSB0aGlzLnNoZWxsLnJlc3RvcmVkXG4gICAgICAgICAgICAudGhlbigoKSA9PiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4gdW5kZWZpbmVkKTtcbiAgICAgICAgLy8gQ3JlYXRlIGFuIElJbmZvIGRpY3Rpb25hcnkgZnJvbSB0aGUgb3B0aW9ucyB0byBvdmVycmlkZSB0aGUgZGVmYXVsdHMuXG4gICAgICAgIGNvbnN0IGluZm8gPSBPYmplY3Qua2V5cyhKdXB5dGVyTGFiLmRlZmF1bHRJbmZvKS5yZWR1Y2UoKGFjYywgdmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBhY2NbdmFsXSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob3B0aW9uc1t2YWxdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSk7XG4gICAgICAgIC8vIFBvcHVsYXRlIGFwcGxpY2F0aW9uIGluZm8uXG4gICAgICAgIHRoaXMuX2luZm8gPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIEp1cHl0ZXJMYWIuZGVmYXVsdEluZm8pLCBpbmZvKTtcbiAgICAgICAgLy8gUG9wdWxhdGUgYXBwbGljYXRpb24gcGF0aHMgb3ZlcnJpZGUgdGhlIGRlZmF1bHRzIGlmIG5lY2Vzc2FyeS5cbiAgICAgICAgY29uc3QgZGVmYXVsdFVSTHMgPSBKdXB5dGVyTGFiLmRlZmF1bHRQYXRocy51cmxzO1xuICAgICAgICBjb25zdCBkZWZhdWx0RGlycyA9IEp1cHl0ZXJMYWIuZGVmYXVsdFBhdGhzLmRpcmVjdG9yaWVzO1xuICAgICAgICBjb25zdCBvcHRpb25VUkxzID0gKG9wdGlvbnMucGF0aHMgJiYgb3B0aW9ucy5wYXRocy51cmxzKSB8fCB7fTtcbiAgICAgICAgY29uc3Qgb3B0aW9uRGlycyA9IChvcHRpb25zLnBhdGhzICYmIG9wdGlvbnMucGF0aHMuZGlyZWN0b3JpZXMpIHx8IHt9O1xuICAgICAgICB0aGlzLl9wYXRocyA9IHtcbiAgICAgICAgICAgIHVybHM6IE9iamVjdC5rZXlzKGRlZmF1bHRVUkxzKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSBpbiBvcHRpb25VUkxzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uVVJMc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBhY2Nba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjW2tleV0gPSBkZWZhdWx0VVJMc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfSwge30pLFxuICAgICAgICAgICAgZGlyZWN0b3JpZXM6IE9iamVjdC5rZXlzKEp1cHl0ZXJMYWIuZGVmYXVsdFBhdGhzLmRpcmVjdG9yaWVzKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSBpbiBvcHRpb25EaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uRGlyc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBhY2Nba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjW2tleV0gPSBkZWZhdWx0RGlyc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfSwge30pXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLl9pbmZvLmRldk1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hlbGwuYWRkQ2xhc3MoJ2pwLW1vZC1kZXZNb2RlJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIGluaXRpYWwgbW9kZWwgZmFjdG9yeS5cbiAgICAgICAgdGhpcy5kb2NSZWdpc3RyeS5hZGRNb2RlbEZhY3RvcnkobmV3IEJhc2U2NE1vZGVsRmFjdG9yeSgpKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubWltZUV4dGVuc2lvbnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIGNyZWF0ZVJlbmRlcm1pbWVQbHVnaW5zKG9wdGlvbnMubWltZUV4dGVuc2lvbnMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlclBsdWdpbihwbHVnaW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBKdXB5dGVyTGFiIGFwcGxpY2F0aW9uIGluZm9ybWF0aW9uIGRpY3Rpb25hcnkuXG4gICAgICovXG4gICAgZ2V0IGluZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmZvO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgSnVweXRlckxhYiBhcHBsaWNhdGlvbiBwYXRocyBkaWN0aW9uYXJ5LlxuICAgICAqL1xuICAgIGdldCBwYXRocygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGhzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBwbHVnaW5zIGZyb20gYSBwbHVnaW4gbW9kdWxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1vZCAtIFRoZSBwbHVnaW4gbW9kdWxlIHRvIHJlZ2lzdGVyLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyUGx1Z2luTW9kdWxlKG1vZCkge1xuICAgICAgICBsZXQgZGF0YSA9IG1vZC5kZWZhdWx0O1xuICAgICAgICAvLyBIYW5kbGUgY29tbW9uanMgZXhwb3J0cy5cbiAgICAgICAgaWYgKCFtb2QuaGFzT3duUHJvcGVydHkoJ19fZXNNb2R1bGUnKSkge1xuICAgICAgICAgICAgZGF0YSA9IG1vZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgIGRhdGEgPSBbZGF0YV07XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyUGx1Z2luKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlclBsdWdpbkVycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIHRoZSBwbHVnaW5zIGZyb20gbXVsdGlwbGUgcGx1Z2luIG1vZHVsZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbW9kcyAtIFRoZSBwbHVnaW4gbW9kdWxlcyB0byByZWdpc3Rlci5cbiAgICAgKi9cbiAgICByZWdpc3RlclBsdWdpbk1vZHVsZXMobW9kcykge1xuICAgICAgICBtb2RzLmZvckVhY2gobW9kID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJQbHVnaW5Nb2R1bGUobW9kKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBUaGUgbmFtZXNwYWNlIGZvciBgSnVweXRlckxhYmAgY2xhc3Mgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChKdXB5dGVyTGFiKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGxheW91dCByZXN0b3JlciB0b2tlbi5cbiAgICAgKi9cbiAgICBKdXB5dGVyTGFiLklJbmZvID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi9hcHBsaWNhdGlvbjpJSW5mbycpO1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IEp1cHl0ZXJMYWIgYXBwbGljYXRpb24gaW5mby5cbiAgICAgKi9cbiAgICBKdXB5dGVyTGFiLmRlZmF1bHRJbmZvID0ge1xuICAgICAgICBkZXZNb2RlOiBQYWdlQ29uZmlnLmdldE9wdGlvbignZGV2TW9kZScpLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJyxcbiAgICAgICAgZGVmZXJyZWQ6IHsgcGF0dGVybnM6IFtdLCBtYXRjaGVzOiBbXSB9LFxuICAgICAgICBkaXNhYmxlZDogeyBwYXR0ZXJuczogW10sIG1hdGNoZXM6IFtdIH0sXG4gICAgICAgIG1pbWVFeHRlbnNpb25zOiBbXSxcbiAgICAgICAgZmlsZXNDYWNoZWQ6IFBhZ2VDb25maWcuZ2V0T3B0aW9uKCdjYWNoZUZpbGVzJykudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgZGVmYXVsdCBKdXB5dGVyTGFiIGFwcGxpY2F0aW9uIHBhdGhzLlxuICAgICAqL1xuICAgIEp1cHl0ZXJMYWIuZGVmYXVsdFBhdGhzID0ge1xuICAgICAgICB1cmxzOiB7XG4gICAgICAgICAgICBiYXNlOiBQYWdlQ29uZmlnLmdldE9wdGlvbignYmFzZVVybCcpLFxuICAgICAgICAgICAgbm90Rm91bmQ6IFBhZ2VDb25maWcuZ2V0T3B0aW9uKCdub3RGb3VuZFVybCcpLFxuICAgICAgICAgICAgYXBwOiBQYWdlQ29uZmlnLmdldE9wdGlvbignYXBwVXJsJyksXG4gICAgICAgICAgICBkb2M6IFBhZ2VDb25maWcuZ2V0T3B0aW9uKCdkb2NVcmwnKSxcbiAgICAgICAgICAgIHN0YXRpYzogUGFnZUNvbmZpZy5nZXRPcHRpb24oJ3N0YXRpY1VybCcpLFxuICAgICAgICAgICAgc2V0dGluZ3M6IFBhZ2VDb25maWcuZ2V0T3B0aW9uKCdzZXR0aW5nc1VybCcpLFxuICAgICAgICAgICAgdGhlbWVzOiBQYWdlQ29uZmlnLmdldE9wdGlvbigndGhlbWVzVXJsJyksXG4gICAgICAgICAgICB0cmFuc2xhdGlvbnM6IFBhZ2VDb25maWcuZ2V0T3B0aW9uKCd0cmFuc2xhdGlvbnNBcGlVcmwnKSxcbiAgICAgICAgICAgIGh1Ykhvc3Q6IFBhZ2VDb25maWcuZ2V0T3B0aW9uKCdodWJIb3N0JykgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgaHViUHJlZml4OiBQYWdlQ29uZmlnLmdldE9wdGlvbignaHViUHJlZml4JykgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgaHViVXNlcjogUGFnZUNvbmZpZy5nZXRPcHRpb24oJ2h1YlVzZXInKSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICBodWJTZXJ2ZXJOYW1lOiBQYWdlQ29uZmlnLmdldE9wdGlvbignaHViU2VydmVyTmFtZScpIHx8IHVuZGVmaW5lZFxuICAgICAgICB9LFxuICAgICAgICBkaXJlY3Rvcmllczoge1xuICAgICAgICAgICAgYXBwU2V0dGluZ3M6IFBhZ2VDb25maWcuZ2V0T3B0aW9uKCdhcHBTZXR0aW5nc0RpcicpLFxuICAgICAgICAgICAgc2NoZW1hczogUGFnZUNvbmZpZy5nZXRPcHRpb24oJ3NjaGVtYXNEaXInKSxcbiAgICAgICAgICAgIHN0YXRpYzogUGFnZUNvbmZpZy5nZXRPcHRpb24oJ3N0YXRpY0RpcicpLFxuICAgICAgICAgICAgdGVtcGxhdGVzOiBQYWdlQ29uZmlnLmdldE9wdGlvbigndGVtcGxhdGVzRGlyJyksXG4gICAgICAgICAgICB0aGVtZXM6IFBhZ2VDb25maWcuZ2V0T3B0aW9uKCd0aGVtZXNEaXInKSxcbiAgICAgICAgICAgIHVzZXJTZXR0aW5nczogUGFnZUNvbmZpZy5nZXRPcHRpb24oJ3VzZXJTZXR0aW5nc0RpcicpLFxuICAgICAgICAgICAgc2VydmVyUm9vdDogUGFnZUNvbmZpZy5nZXRPcHRpb24oJ3NlcnZlclJvb3QnKSxcbiAgICAgICAgICAgIHdvcmtzcGFjZXM6IFBhZ2VDb25maWcuZ2V0T3B0aW9uKCd3b3Jrc3BhY2VzRGlyJylcbiAgICAgICAgfVxuICAgIH07XG59KShKdXB5dGVyTGFiIHx8IChKdXB5dGVyTGFiID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxhYi5qcy5tYXAiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEpTT05FeHQsIFByb21pc2VEZWxlZ2F0ZSwgVG9rZW4gfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBBdHRhY2hlZFByb3BlcnR5IH0gZnJvbSAnQGx1bWluby9wcm9wZXJ0aWVzJztcbi8qKlxuICogVGhlIGxheW91dCByZXN0b3JlciB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IElMYXlvdXRSZXN0b3JlciA9IG5ldyBUb2tlbignQGp1cHl0ZXJsYWIvYXBwbGljYXRpb246SUxheW91dFJlc3RvcmVyJyk7XG4vKipcbiAqIFRoZSBkYXRhIGNvbm5lY3RvciBrZXkgZm9yIHJlc3RvcmVyIGRhdGEuXG4gKi9cbmNvbnN0IEtFWSA9ICdsYXlvdXQtcmVzdG9yZXI6ZGF0YSc7XG4vKipcbiAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGEgbGF5b3V0IHJlc3RvcmVyLlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIFRoZSBsaWZlY3ljbGUgZm9yIHN0YXRlIHJlc3RvcmF0aW9uIGlzIHN1YnRsZS4gVGhlIHNlcXVlbmNlIG9mIGV2ZW50cyBpczpcbiAqXG4gKiAxLiBUaGUgbGF5b3V0IHJlc3RvcmVyIHBsdWdpbiBpcyBpbnN0YW50aWF0ZWQgYW5kIG1ha2VzIGEgYGZldGNoYCBjYWxsIHRvXG4gKiAgICB0aGUgZGF0YSBjb25uZWN0b3IgdGhhdCBzdG9yZXMgdGhlIGxheW91dCByZXN0b3JhdGlvbiBkYXRhLiBUaGUgYGZldGNoYFxuICogICAgY2FsbCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGluIHN0ZXAgNiwgYmVsb3cuXG4gKlxuICogMi4gT3RoZXIgcGx1Z2lucyB0aGF0IGNhcmUgYWJvdXQgc3RhdGUgcmVzdG9yYXRpb24gcmVxdWlyZSB0aGUgbGF5b3V0XG4gKiAgICByZXN0b3JlciBhcyBhIGRlcGVuZGVuY3kuXG4gKlxuICogMy4gQXMgZWFjaCBsb2FkLXRpbWUgcGx1Z2luIGluaXRpYWxpemVzICh3aGljaCBoYXBwZW5zIGJlZm9yZSB0aGUgZnJvbnQtZW5kXG4gKiAgICBhcHBsaWNhdGlvbiBoYXMgYHN0YXJ0ZWRgKSwgaXQgaW5zdHJ1Y3RzIHRoZSBsYXlvdXQgcmVzdG9yZXIgd2hldGhlclxuICogICAgdGhlIHJlc3RvcmVyIG91Z2h0IHRvIGByZXN0b3JlYCBpdHMgd2lkZ2V0cyBieSBwYXNzaW5nIGluIGl0cyB3aWRnZXRcbiAqICAgIHRyYWNrZXIuXG4gKiAgICBBbHRlcm5hdGl2ZWx5LCBhIHBsdWdpbiB0aGF0IGRvZXMgbm90IHJlcXVpcmUgaXRzIG93biB3aWRnZXQgdHJhY2tlclxuICogICAgKGJlY2F1c2UgcGVyaGFwcyBpdCBvbmx5IGNyZWF0ZXMgYSBzaW5nbGUgd2lkZ2V0LCBsaWtlIGEgY29tbWFuZCBwYWxldHRlKSxcbiAqICAgIGNhbiBzaW1wbHkgYGFkZGAgaXRzIHdpZGdldCBhbG9uZyB3aXRoIGEgcGVyc2lzdGVudCB1bmlxdWUgbmFtZSB0byB0aGVcbiAqICAgIGxheW91dCByZXN0b3JlciBzbyB0aGF0IGl0cyBsYXlvdXQgc3RhdGUgY2FuIGJlIHJlc3RvcmVkIHdoZW4gdGhlIGxhYlxuICogICAgYXBwbGljYXRpb24gcmVzdG9yZXMuXG4gKlxuICogNC4gQWZ0ZXIgYWxsIHRoZSBsb2FkLXRpbWUgcGx1Z2lucyBoYXZlIGZpbmlzaGVkIGluaXRpYWxpemluZywgdGhlIGZyb250LWVuZFxuICogICAgYXBwbGljYXRpb24gYHN0YXJ0ZWRgIHByb21pc2Ugd2lsbCByZXNvbHZlLiBUaGlzIGlzIHRoZSBgZmlyc3RgXG4gKiAgICBwcm9taXNlIHRoYXQgdGhlIGxheW91dCByZXN0b3JlciB3YWl0cyBmb3IuIEJ5IHRoaXMgcG9pbnQsIGFsbCBvZiB0aGVcbiAqICAgIHBsdWdpbnMgdGhhdCBjYXJlIGFib3V0IHJlc3RvcmF0aW9uIHdpbGwgaGF2ZSBpbnN0cnVjdGVkIHRoZSBsYXlvdXRcbiAqICAgIHJlc3RvcmVyIHRvIGByZXN0b3JlYCB0aGVpciB3aWRnZXQgdHJhY2tlcnMuXG4gKlxuICogNS4gVGhlIGxheW91dCByZXN0b3JlciB3aWxsIHRoZW4gaW5zdHJ1Y3QgZWFjaCBwbHVnaW4ncyB3aWRnZXQgdHJhY2tlclxuICogICAgdG8gcmVzdG9yZSBpdHMgc3RhdGUgYW5kIHJlaW5zdGFudGlhdGUgd2hpY2hldmVyIHdpZGdldHMgaXQgd2FudHMuIFRoZVxuICogICAgdHJhY2tlciByZXR1cm5zIGEgcHJvbWlzZSB0byB0aGUgbGF5b3V0IHJlc3RvcmVyIHRoYXQgcmVzb2x2ZXMgd2hlbiBpdFxuICogICAgaGFzIGNvbXBsZXRlZCByZXN0b3JpbmcgdGhlIHRyYWNrZWQgd2lkZ2V0cyBpdCBjYXJlcyBhYm91dC5cbiAqXG4gKiA2LiBBcyBlYWNoIHdpZGdldCB0cmFja2VyIGZpbmlzaGVzIHJlc3RvcmluZyB0aGUgd2lkZ2V0IGluc3RhbmNlcyBpdCBjYXJlc1xuICogICAgYWJvdXQsIGl0IHJlc29sdmVzIHRoZSBwcm9taXNlIHRoYXQgd2FzIHJldHVybmVkIHRvIHRoZSBsYXlvdXQgcmVzdG9yZXJcbiAqICAgIChpbiBzdGVwIDUpLiBBZnRlciBhbGwgb2YgdGhlIHByb21pc2VzIHRoYXQgdGhlIHJlc3RvcmVyIGlzIGF3YWl0aW5nIGhhdmVcbiAqICAgIHNldHRsZWQsIHRoZSByZXN0b3JlciB0aGVuIHJlc29sdmVzIHRoZSBvdXRzdGFuZGluZyBgZmV0Y2hgIHByb21pc2VcbiAqICAgIChmcm9tIHN0ZXAgMSkgYW5kIGhhbmRzIG9mZiBhIGxheW91dCBzdGF0ZSBvYmplY3QgdG8gdGhlIGFwcGxpY2F0aW9uXG4gKiAgICBzaGVsbCdzIGByZXN0b3JlTGF5b3V0YCBtZXRob2QgZm9yIHJlc3RvcmF0aW9uLlxuICpcbiAqIDcuIE9uY2UgdGhlIGFwcGxpY2F0aW9uIHNoZWxsIGhhcyBmaW5pc2hlZCByZXN0b3JpbmcgdGhlIGxheW91dCwgdGhlXG4gKiAgICBKdXB5dGVyTGFiIGFwcGxpY2F0aW9uJ3MgYHJlc3RvcmVkYCBwcm9taXNlIGlzIHJlc29sdmVkLlxuICpcbiAqIE9mIHBhcnRpY3VsYXIgbm90ZSBhcmUgc3RlcHMgNSBhbmQgNjogc2luY2UgZGF0YSByZXN0b3JhdGlvbiBvZiBwbHVnaW5zXG4gKiBpcyBhY2NvbXBsaXNoZWQgYnkgZXhlY3V0aW5nIGNvbW1hbmRzLCB0aGUgY29tbWFuZCB0aGF0IGlzIHVzZWQgdG8gcmVzdG9yZVxuICogdGhlIGRhdGEgb2YgZWFjaCBwbHVnaW4gbXVzdCByZXR1cm4gYSBwcm9taXNlIHRoYXQgb25seSByZXNvbHZlcyB3aGVuIHRoZVxuICogd2lkZ2V0IGhhcyBiZWVuIGNyZWF0ZWQgYW5kIGFkZGVkIHRvIHRoZSBwbHVnaW4ncyB3aWRnZXQgdHJhY2tlci5cbiAqL1xuZXhwb3J0IGNsYXNzIExheW91dFJlc3RvcmVyIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBsYXlvdXQgcmVzdG9yZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9maXJzdERvbmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcHJvbWlzZXNEb25lID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3Byb21pc2VzID0gW107XG4gICAgICAgIHRoaXMuX3Jlc3RvcmVkID0gbmV3IFByb21pc2VEZWxlZ2F0ZSgpO1xuICAgICAgICB0aGlzLl90cmFja2VycyA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5fd2lkZ2V0cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fY29ubmVjdG9yID0gb3B0aW9ucy5jb25uZWN0b3I7XG4gICAgICAgIHRoaXMuX2ZpcnN0ID0gb3B0aW9ucy5maXJzdDtcbiAgICAgICAgdGhpcy5fcmVnaXN0cnkgPSBvcHRpb25zLnJlZ2lzdHJ5O1xuICAgICAgICB2b2lkIHRoaXMuX2ZpcnN0XG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9maXJzdERvbmUgPSB0cnVlO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gUHJvbWlzZS5hbGwodGhpcy5fcHJvbWlzZXMpKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZXNEb25lID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgdGhlIHRyYWNrZXIgc2V0LlxuICAgICAgICAgICAgdGhpcy5fdHJhY2tlcnMuY2xlYXIoKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc3RvcmVkLnJlc29sdmUodm9pZCAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSByZXNvbHZlZCB3aGVuIHRoZSBsYXlvdXQgcmVzdG9yZXIgaXMgcmVhZHkgdG8gcmVjZWl2ZSBzaWduYWxzLlxuICAgICAqL1xuICAgIGdldCByZXN0b3JlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3RvcmVkLnByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIHdpZGdldCB0byBiZSB0cmFja2VkIGJ5IHRoZSBsYXlvdXQgcmVzdG9yZXIuXG4gICAgICovXG4gICAgYWRkKHdpZGdldCwgbmFtZSkge1xuICAgICAgICBQcml2YXRlLm5hbWVQcm9wZXJ0eS5zZXQod2lkZ2V0LCBuYW1lKTtcbiAgICAgICAgdGhpcy5fd2lkZ2V0cy5zZXQobmFtZSwgd2lkZ2V0KTtcbiAgICAgICAgd2lkZ2V0LmRpc3Bvc2VkLmNvbm5lY3QodGhpcy5fb25XaWRnZXREaXNwb3NlZCwgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZldGNoIHRoZSBsYXlvdXQgc3RhdGUgZm9yIHRoZSBhcHBsaWNhdGlvbi5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBGZXRjaGluZyB0aGUgbGF5b3V0IHJlbGllcyBvbiBhbGwgd2lkZ2V0IHJlc3RvcmF0aW9uIHRvIGJlIGNvbXBsZXRlLCBzb1xuICAgICAqIGNhbGxzIHRvIGBmZXRjaGAgYXJlIGd1YXJhbnRlZWQgdG8gcmV0dXJuIGFmdGVyIHJlc3RvcmF0aW9uIGlzIGNvbXBsZXRlLlxuICAgICAqL1xuICAgIGFzeW5jIGZldGNoKCkge1xuICAgICAgICBjb25zdCBibGFuayA9IHtcbiAgICAgICAgICAgIGZyZXNoOiB0cnVlLFxuICAgICAgICAgICAgbWFpbkFyZWE6IG51bGwsXG4gICAgICAgICAgICBkb3duQXJlYTogbnVsbCxcbiAgICAgICAgICAgIGxlZnRBcmVhOiBudWxsLFxuICAgICAgICAgICAgcmlnaHRBcmVhOiBudWxsLFxuICAgICAgICAgICAgcmVsYXRpdmVTaXplczogbnVsbFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBsYXlvdXQgPSB0aGlzLl9jb25uZWN0b3IuZmV0Y2goS0VZKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IFtkYXRhXSA9IGF3YWl0IFByb21pc2UuYWxsKFtsYXlvdXQsIHRoaXMucmVzdG9yZWRdKTtcbiAgICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBibGFuaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgbWFpbiwgZG93biwgbGVmdCwgcmlnaHQsIHJlbGF0aXZlU2l6ZXMgfSA9IGRhdGE7XG4gICAgICAgICAgICAvLyBJZiBhbnkgZGF0YSBleGlzdHMsIHRoZW4gdGhpcyBpcyBub3QgYSBmcmVzaCBzZXNzaW9uLlxuICAgICAgICAgICAgY29uc3QgZnJlc2ggPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIFJlaHlkcmF0ZSBtYWluIGFyZWEuXG4gICAgICAgICAgICBjb25zdCBtYWluQXJlYSA9IHRoaXMuX3JlaHlkcmF0ZU1haW5BcmVhKG1haW4pO1xuICAgICAgICAgICAgLy8gUmVoeWRyYXRlIGRvd24gYXJlYS5cbiAgICAgICAgICAgIGNvbnN0IGRvd25BcmVhID0gdGhpcy5fcmVoeWRyYXRlRG93bkFyZWEoZG93bik7XG4gICAgICAgICAgICAvLyBSZWh5ZHJhdGUgbGVmdCBhcmVhLlxuICAgICAgICAgICAgY29uc3QgbGVmdEFyZWEgPSB0aGlzLl9yZWh5ZHJhdGVTaWRlQXJlYShsZWZ0KTtcbiAgICAgICAgICAgIC8vIFJlaHlkcmF0ZSByaWdodCBhcmVhLlxuICAgICAgICAgICAgY29uc3QgcmlnaHRBcmVhID0gdGhpcy5fcmVoeWRyYXRlU2lkZUFyZWEocmlnaHQpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBmcmVzaCxcbiAgICAgICAgICAgICAgICBtYWluQXJlYSxcbiAgICAgICAgICAgICAgICBkb3duQXJlYSxcbiAgICAgICAgICAgICAgICBsZWZ0QXJlYSxcbiAgICAgICAgICAgICAgICByaWdodEFyZWEsXG4gICAgICAgICAgICAgICAgcmVsYXRpdmVTaXplczogcmVsYXRpdmVTaXplcyB8fCBudWxsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGJsYW5rO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc3RvcmUgdGhlIHdpZGdldHMgb2YgYSBwYXJ0aWN1bGFyIHdpZGdldCB0cmFja2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRyYWNrZXIgLSBUaGUgd2lkZ2V0IHRyYWNrZXIgd2hvc2Ugd2lkZ2V0cyB3aWxsIGJlIHJlc3RvcmVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgcmVzdG9yYXRpb24gb3B0aW9ucy5cbiAgICAgKi9cbiAgICByZXN0b3JlKHRyYWNrZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3Qgd2FybmluZyA9ICdyZXN0b3JlKCkgY2FuIG9ubHkgYmUgY2FsbGVkIGJlZm9yZSBgZmlyc3RgIGhhcyByZXNvbHZlZC4nO1xuICAgICAgICBpZiAodGhpcy5fZmlyc3REb25lKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4od2FybmluZyk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qod2FybmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBuYW1lc3BhY2UgfSA9IHRyYWNrZXI7XG4gICAgICAgIGlmICh0aGlzLl90cmFja2Vycy5oYXMobmFtZXNwYWNlKSkge1xuICAgICAgICAgICAgY29uc3Qgd2FybmluZyA9IGBBIHRyYWNrZXIgbmFtZXNwYWNlZCAke25hbWVzcGFjZX0gd2FzIGFscmVhZHkgcmVzdG9yZWQuYDtcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh3YXJuaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IGFyZ3MsIGNvbW1hbmQsIG5hbWUsIHdoZW4gfSA9IG9wdGlvbnM7XG4gICAgICAgIC8vIEFkZCB0aGUgdHJhY2tlciB0byB0aGUgcHJpdmF0ZSB0cmFja2VycyBjb2xsZWN0aW9uLlxuICAgICAgICB0aGlzLl90cmFja2Vycy5hZGQobmFtZXNwYWNlKTtcbiAgICAgICAgLy8gV2hlbmV2ZXIgYSBuZXcgd2lkZ2V0IGlzIGFkZGVkIHRvIHRoZSB0cmFja2VyLCByZWNvcmQgaXRzIG5hbWUuXG4gICAgICAgIHRyYWNrZXIud2lkZ2V0QWRkZWQuY29ubmVjdCgoXywgd2lkZ2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXROYW1lID0gbmFtZSh3aWRnZXQpO1xuICAgICAgICAgICAgaWYgKHdpZGdldE5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZCh3aWRnZXQsIGAke25hbWVzcGFjZX06JHt3aWRnZXROYW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgLy8gV2hlbmV2ZXIgYSB3aWRnZXQgaXMgdXBkYXRlZCwgZ2V0IGl0cyBuZXcgbmFtZS5cbiAgICAgICAgdHJhY2tlci53aWRnZXRVcGRhdGVkLmNvbm5lY3QoKF8sIHdpZGdldCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0TmFtZSA9IG5hbWUod2lkZ2V0KTtcbiAgICAgICAgICAgIGlmICh3aWRnZXROYW1lKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGAke25hbWVzcGFjZX06JHt3aWRnZXROYW1lfWA7XG4gICAgICAgICAgICAgICAgUHJpdmF0ZS5uYW1lUHJvcGVydHkuc2V0KHdpZGdldCwgbmFtZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkZ2V0cy5zZXQobmFtZSwgd2lkZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5fZmlyc3Q7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0cmFja2VyXG4gICAgICAgICAgICAucmVzdG9yZSh7XG4gICAgICAgICAgICBhcmdzOiBhcmdzIHx8ICgoKSA9PiBKU09ORXh0LmVtcHR5T2JqZWN0KSxcbiAgICAgICAgICAgIGNvbW1hbmQsXG4gICAgICAgICAgICBjb25uZWN0b3I6IHRoaXMuX2Nvbm5lY3RvcixcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICByZWdpc3RyeTogdGhpcy5fcmVnaXN0cnksXG4gICAgICAgICAgICB3aGVuOiB3aGVuID8gW2ZpcnN0XS5jb25jYXQod2hlbikgOiBmaXJzdFxuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fcHJvbWlzZXMucHVzaChwcm9taXNlKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhdmUgdGhlIGxheW91dCBzdGF0ZSBmb3IgdGhlIGFwcGxpY2F0aW9uLlxuICAgICAqL1xuICAgIHNhdmUoZGF0YSkge1xuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgcHJvbWlzZXMgdGhhdCBhcmUgdW5yZXNvbHZlZCwgYmFpbC5cbiAgICAgICAgaWYgKCF0aGlzLl9wcm9taXNlc0RvbmUpIHtcbiAgICAgICAgICAgIGNvbnN0IHdhcm5pbmcgPSAnc2F2ZSgpIHdhcyBjYWxsZWQgcHJlbWF0dXJlbHkuJztcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh3YXJuaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZWh5ZHJhdGVkID0ge307XG4gICAgICAgIGRlaHlkcmF0ZWQubWFpbiA9IHRoaXMuX2RlaHlkcmF0ZU1haW5BcmVhKGRhdGEubWFpbkFyZWEpO1xuICAgICAgICBkZWh5ZHJhdGVkLmRvd24gPSB0aGlzLl9kZWh5ZHJhdGVEb3duQXJlYShkYXRhLmRvd25BcmVhKTtcbiAgICAgICAgZGVoeWRyYXRlZC5sZWZ0ID0gdGhpcy5fZGVoeWRyYXRlU2lkZUFyZWEoZGF0YS5sZWZ0QXJlYSk7XG4gICAgICAgIGRlaHlkcmF0ZWQucmlnaHQgPSB0aGlzLl9kZWh5ZHJhdGVTaWRlQXJlYShkYXRhLnJpZ2h0QXJlYSk7XG4gICAgICAgIGRlaHlkcmF0ZWQucmVsYXRpdmVTaXplcyA9IGRhdGEucmVsYXRpdmVTaXplcztcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3Rvci5zYXZlKEtFWSwgZGVoeWRyYXRlZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlaHlkcmF0ZSBhIG1haW4gYXJlYSBkZXNjcmlwdGlvbiBpbnRvIGEgc2VyaWFsaXphYmxlIG9iamVjdC5cbiAgICAgKi9cbiAgICBfZGVoeWRyYXRlTWFpbkFyZWEoYXJlYSkge1xuICAgICAgICBpZiAoIWFyZWEpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcml2YXRlLnNlcmlhbGl6ZU1haW4oYXJlYSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJleWRyYXRlIGEgc2VyaWFsaXplZCBtYWluIGFyZWEgZGVzY3JpcHRpb24gb2JqZWN0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgZnVuY3Rpb24gY29uc3VtZXMgZGF0YSB0aGF0IGNhbiBiZWNvbWUgY29ycnVwdGVkLCBzbyBpdCB1c2VzIHR5cGVcbiAgICAgKiBjb2VyY2lvbiB0byBndWFyYW50ZWUgdGhlIGRlaHlkcmF0ZWQgb2JqZWN0IGlzIHNhZmVseSBwcm9jZXNzZWQuXG4gICAgICovXG4gICAgX3JlaHlkcmF0ZU1haW5BcmVhKGFyZWEpIHtcbiAgICAgICAgaWYgKCFhcmVhKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJpdmF0ZS5kZXNlcmlhbGl6ZU1haW4oYXJlYSwgdGhpcy5fd2lkZ2V0cyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlaHlkcmF0ZSBhIGRvd24gYXJlYSBkZXNjcmlwdGlvbiBpbnRvIGEgc2VyaWFsaXphYmxlIG9iamVjdC5cbiAgICAgKi9cbiAgICBfZGVoeWRyYXRlRG93bkFyZWEoYXJlYSkge1xuICAgICAgICBpZiAoIWFyZWEpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRlaHlkcmF0ZWQgPSB7XG4gICAgICAgICAgICBzaXplOiBhcmVhLnNpemVcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGFyZWEuY3VycmVudFdpZGdldCkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IFByaXZhdGUubmFtZVByb3BlcnR5LmdldChhcmVhLmN1cnJlbnRXaWRnZXQpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBkZWh5ZHJhdGVkLmN1cnJlbnQgPSBjdXJyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhcmVhLndpZGdldHMpIHtcbiAgICAgICAgICAgIGRlaHlkcmF0ZWQud2lkZ2V0cyA9IGFyZWEud2lkZ2V0c1xuICAgICAgICAgICAgICAgIC5tYXAod2lkZ2V0ID0+IFByaXZhdGUubmFtZVByb3BlcnR5LmdldCh3aWRnZXQpKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIobmFtZSA9PiAhIW5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWh5ZHJhdGVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXlkcmF0ZSBhIHNlcmlhbGl6ZWQgc2lkZSBhcmVhIGRlc2NyaXB0aW9uIG9iamVjdC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNvbnN1bWVzIGRhdGEgdGhhdCBjYW4gYmVjb21lIGNvcnJ1cHRlZCwgc28gaXQgdXNlcyB0eXBlXG4gICAgICogY29lcmNpb24gdG8gZ3VhcmFudGVlIHRoZSBkZWh5ZHJhdGVkIG9iamVjdCBpcyBzYWZlbHkgcHJvY2Vzc2VkLlxuICAgICAqL1xuICAgIF9yZWh5ZHJhdGVEb3duQXJlYShhcmVhKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKCFhcmVhKSB7XG4gICAgICAgICAgICByZXR1cm4geyBjdXJyZW50V2lkZ2V0OiBudWxsLCBzaXplOiAwLjAsIHdpZGdldHM6IG51bGwgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbnRlcm5hbCA9IHRoaXMuX3dpZGdldHM7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRXaWRnZXQgPSBhcmVhLmN1cnJlbnQgJiYgaW50ZXJuYWwuaGFzKGAke2FyZWEuY3VycmVudH1gKVxuICAgICAgICAgICAgPyBpbnRlcm5hbC5nZXQoYCR7YXJlYS5jdXJyZW50fWApXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGNvbnN0IHdpZGdldHMgPSAhQXJyYXkuaXNBcnJheShhcmVhLndpZGdldHMpXG4gICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgIDogYXJlYS53aWRnZXRzXG4gICAgICAgICAgICAgICAgLm1hcChuYW1lID0+IGludGVybmFsLmhhcyhgJHtuYW1lfWApID8gaW50ZXJuYWwuZ2V0KGAke25hbWV9YCkgOiBudWxsKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIod2lkZ2V0ID0+ICEhd2lkZ2V0KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGN1cnJlbnRXaWRnZXQ6IGN1cnJlbnRXaWRnZXQsXG4gICAgICAgICAgICBzaXplOiAoX2EgPSBhcmVhLnNpemUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDAuMCxcbiAgICAgICAgICAgIHdpZGdldHM6IHdpZGdldHNcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVoeWRyYXRlIGEgc2lkZSBhcmVhIGRlc2NyaXB0aW9uIGludG8gYSBzZXJpYWxpemFibGUgb2JqZWN0LlxuICAgICAqL1xuICAgIF9kZWh5ZHJhdGVTaWRlQXJlYShhcmVhKSB7XG4gICAgICAgIGlmICghYXJlYSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGVoeWRyYXRlZCA9IHsgY29sbGFwc2VkOiBhcmVhLmNvbGxhcHNlZCB9O1xuICAgICAgICBpZiAoYXJlYS5jdXJyZW50V2lkZ2V0KSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gUHJpdmF0ZS5uYW1lUHJvcGVydHkuZ2V0KGFyZWEuY3VycmVudFdpZGdldCk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIGRlaHlkcmF0ZWQuY3VycmVudCA9IGN1cnJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFyZWEud2lkZ2V0cykge1xuICAgICAgICAgICAgZGVoeWRyYXRlZC53aWRnZXRzID0gYXJlYS53aWRnZXRzXG4gICAgICAgICAgICAgICAgLm1hcCh3aWRnZXQgPT4gUHJpdmF0ZS5uYW1lUHJvcGVydHkuZ2V0KHdpZGdldCkpXG4gICAgICAgICAgICAgICAgLmZpbHRlcihuYW1lID0+ICEhbmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlaHlkcmF0ZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJleWRyYXRlIGEgc2VyaWFsaXplZCBzaWRlIGFyZWEgZGVzY3JpcHRpb24gb2JqZWN0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgZnVuY3Rpb24gY29uc3VtZXMgZGF0YSB0aGF0IGNhbiBiZWNvbWUgY29ycnVwdGVkLCBzbyBpdCB1c2VzIHR5cGVcbiAgICAgKiBjb2VyY2lvbiB0byBndWFyYW50ZWUgdGhlIGRlaHlkcmF0ZWQgb2JqZWN0IGlzIHNhZmVseSBwcm9jZXNzZWQuXG4gICAgICovXG4gICAgX3JlaHlkcmF0ZVNpZGVBcmVhKGFyZWEpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoIWFyZWEpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGNvbGxhcHNlZDogdHJ1ZSwgY3VycmVudFdpZGdldDogbnVsbCwgd2lkZ2V0czogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGludGVybmFsID0gdGhpcy5fd2lkZ2V0cztcbiAgICAgICAgY29uc3QgY29sbGFwc2VkID0gKF9hID0gYXJlYS5jb2xsYXBzZWQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGZhbHNlO1xuICAgICAgICBjb25zdCBjdXJyZW50V2lkZ2V0ID0gYXJlYS5jdXJyZW50ICYmIGludGVybmFsLmhhcyhgJHthcmVhLmN1cnJlbnR9YClcbiAgICAgICAgICAgID8gaW50ZXJuYWwuZ2V0KGAke2FyZWEuY3VycmVudH1gKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBjb25zdCB3aWRnZXRzID0gIUFycmF5LmlzQXJyYXkoYXJlYS53aWRnZXRzKVxuICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICA6IGFyZWEud2lkZ2V0c1xuICAgICAgICAgICAgICAgIC5tYXAobmFtZSA9PiBpbnRlcm5hbC5oYXMoYCR7bmFtZX1gKSA/IGludGVybmFsLmdldChgJHtuYW1lfWApIDogbnVsbClcbiAgICAgICAgICAgICAgICAuZmlsdGVyKHdpZGdldCA9PiAhIXdpZGdldCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2xsYXBzZWQsXG4gICAgICAgICAgICBjdXJyZW50V2lkZ2V0OiBjdXJyZW50V2lkZ2V0LFxuICAgICAgICAgICAgd2lkZ2V0czogd2lkZ2V0c1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSB3aWRnZXQgZGlzcG9zYWwuXG4gICAgICovXG4gICAgX29uV2lkZ2V0RGlzcG9zZWQod2lkZ2V0KSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBQcml2YXRlLm5hbWVQcm9wZXJ0eS5nZXQod2lkZ2V0KTtcbiAgICAgICAgdGhpcy5fd2lkZ2V0cy5kZWxldGUobmFtZSk7XG4gICAgfVxufVxuLypcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogQW4gYXR0YWNoZWQgcHJvcGVydHkgZm9yIGEgd2lkZ2V0J3MgSUQgaW4gdGhlIHNlcmlhbGl6ZWQgcmVzdG9yZSBkYXRhLlxuICAgICAqL1xuICAgIFByaXZhdGUubmFtZVByb3BlcnR5ID0gbmV3IEF0dGFjaGVkUHJvcGVydHkoe1xuICAgICAgICBuYW1lOiAnbmFtZScsXG4gICAgICAgIGNyZWF0ZTogb3duZXIgPT4gJydcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBTZXJpYWxpemUgaW5kaXZpZHVhbCBhcmVhcyB3aXRoaW4gdGhlIG1haW4gYXJlYS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXJpYWxpemVBcmVhKGFyZWEpIHtcbiAgICAgICAgaWYgKCFhcmVhIHx8ICFhcmVhLnR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcmVhLnR5cGUgPT09ICd0YWItYXJlYScpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3RhYi1hcmVhJyxcbiAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXg6IGFyZWEuY3VycmVudEluZGV4LFxuICAgICAgICAgICAgICAgIHdpZGdldHM6IGFyZWEud2lkZ2V0c1xuICAgICAgICAgICAgICAgICAgICAubWFwKHdpZGdldCA9PiBQcml2YXRlLm5hbWVQcm9wZXJ0eS5nZXQod2lkZ2V0KSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihuYW1lID0+ICEhbmFtZSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcGxpdC1hcmVhJyxcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiBhcmVhLm9yaWVudGF0aW9uLFxuICAgICAgICAgICAgc2l6ZXM6IGFyZWEuc2l6ZXMsXG4gICAgICAgICAgICBjaGlsZHJlbjogYXJlYS5jaGlsZHJlblxuICAgICAgICAgICAgICAgIC5tYXAoc2VyaWFsaXplQXJlYSlcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGFyZWEgPT4gISFhcmVhKVxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBkZWh5ZHJhdGVkLCBzZXJpYWxpemFibGUgdmVyc2lvbiBvZiB0aGUgbWFpbiBkb2NrIHBhbmVsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNlcmlhbGl6ZU1haW4oYXJlYSkge1xuICAgICAgICBjb25zdCBkZWh5ZHJhdGVkID0ge1xuICAgICAgICAgICAgZG9jazogKGFyZWEgJiYgYXJlYS5kb2NrICYmIHNlcmlhbGl6ZUFyZWEoYXJlYS5kb2NrLm1haW4pKSB8fCBudWxsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChhcmVhKSB7XG4gICAgICAgICAgICBpZiAoYXJlYS5jdXJyZW50V2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IFByaXZhdGUubmFtZVByb3BlcnR5LmdldChhcmVhLmN1cnJlbnRXaWRnZXQpO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGRlaHlkcmF0ZWQuY3VycmVudCA9IGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWh5ZHJhdGVkO1xuICAgIH1cbiAgICBQcml2YXRlLnNlcmlhbGl6ZU1haW4gPSBzZXJpYWxpemVNYWluO1xuICAgIC8qKlxuICAgICAqIERlc2VyaWFsaXplIGluZGl2aWR1YWwgYXJlYXMgd2l0aGluIHRoZSBtYWluIGFyZWEuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogQmVjYXVzZSB0aGlzIGRhdGEgY29tZXMgZnJvbSBhIHBvdGVudGlhbGx5IHVucmVsaWFibGUgZm9yZWlnbiBzb3VyY2UsIGl0IGlzXG4gICAgICogdHlwZWQgYXMgYSBgSlNPTk9iamVjdGA7IGJ1dCB0aGUgYWN0dWFsIGV4cGVjdGVkIHR5cGUgaXM6XG4gICAgICogYElUYWJBcmVhIHwgSVNwbGl0QXJlYWAuXG4gICAgICpcbiAgICAgKiBGb3IgZmF1bHQgdG9sZXJhbmNlLCB0eXBlcyBhcmUgbWFudWFsbHkgY2hlY2tlZCBpbiBkZXNlcmlhbGl6YXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gZGVzZXJpYWxpemVBcmVhKGFyZWEsIG5hbWVzKSB7XG4gICAgICAgIGlmICghYXJlYSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQmVjYXVzZSB0aGlzIGRhdGEgaXMgc2F2ZWQgdG8gYSBmb3JlaWduIGRhdGEgc291cmNlLCBpdHMgdHlwZSBzYWZldHkgaXNcbiAgICAgICAgLy8gbm90IGd1YXJhbnRlZWQgd2hlbiBpdCBpcyByZXRyaWV2ZWQsIHNvIGV4aGF1c3RpdmUgY2hlY2tzIGFyZSBuZWNlc3NhcnkuXG4gICAgICAgIGNvbnN0IHR5cGUgPSBhcmVhLnR5cGUgfHwgJ3Vua25vd24nO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3Vua25vd24nIHx8ICh0eXBlICE9PSAndGFiLWFyZWEnICYmIHR5cGUgIT09ICdzcGxpdC1hcmVhJykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQXR0ZW1wdGVkIHRvIGRlc2VyaWFsaXplIHVua25vd24gdHlwZTogJHt0eXBlfWApO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09ICd0YWItYXJlYScpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY3VycmVudEluZGV4LCB3aWRnZXRzIH0gPSBhcmVhO1xuICAgICAgICAgICAgY29uc3QgaHlkcmF0ZWQgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3RhYi1hcmVhJyxcbiAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXg6IGN1cnJlbnRJbmRleCB8fCAwLFxuICAgICAgICAgICAgICAgIHdpZGdldHM6ICh3aWRnZXRzICYmXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldHNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAod2lkZ2V0ID0+IG5hbWVzLmdldCh3aWRnZXQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcih3aWRnZXQgPT4gISF3aWRnZXQpKSB8fFxuICAgICAgICAgICAgICAgICAgICBbXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgY3VycmVudCBpbmRleCBpcyB3aXRoaW4gYm91bmRzLlxuICAgICAgICAgICAgaWYgKGh5ZHJhdGVkLmN1cnJlbnRJbmRleCA+IGh5ZHJhdGVkLndpZGdldHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIGh5ZHJhdGVkLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaHlkcmF0ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBvcmllbnRhdGlvbiwgc2l6ZXMsIGNoaWxkcmVuIH0gPSBhcmVhO1xuICAgICAgICBjb25zdCBoeWRyYXRlZCA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdzcGxpdC1hcmVhJyxcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvbixcbiAgICAgICAgICAgIHNpemVzOiBzaXplcyB8fCBbXSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiAoY2hpbGRyZW4gJiZcbiAgICAgICAgICAgICAgICBjaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAubWFwKGNoaWxkID0+IGRlc2VyaWFsaXplQXJlYShjaGlsZCwgbmFtZXMpKVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHdpZGdldCA9PiAhIXdpZGdldCkpIHx8XG4gICAgICAgICAgICAgICAgW11cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGh5ZHJhdGVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGh5ZHJhdGVkIHZlcnNpb24gb2YgdGhlIG1haW4gZG9jayBwYW5lbCwgcmVhZHkgdG8gcmVzdG9yZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBCZWNhdXNlIHRoaXMgZGF0YSBjb21lcyBmcm9tIGEgcG90ZW50aWFsbHkgdW5yZWxpYWJsZSBmb3JlaWduIHNvdXJjZSwgaXQgaXNcbiAgICAgKiB0eXBlZCBhcyBhIGBKU09OT2JqZWN0YDsgYnV0IHRoZSBhY3R1YWwgZXhwZWN0ZWQgdHlwZSBpczogYElNYWluQXJlYWAuXG4gICAgICpcbiAgICAgKiBGb3IgZmF1bHQgdG9sZXJhbmNlLCB0eXBlcyBhcmUgbWFudWFsbHkgY2hlY2tlZCBpbiBkZXNlcmlhbGl6YXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gZGVzZXJpYWxpemVNYWluKGFyZWEsIG5hbWVzKSB7XG4gICAgICAgIGlmICghYXJlYSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmFtZSA9IGFyZWEuY3VycmVudCB8fCBudWxsO1xuICAgICAgICBjb25zdCBkb2NrID0gYXJlYS5kb2NrIHx8IG51bGw7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjdXJyZW50V2lkZ2V0OiAobmFtZSAmJiBuYW1lcy5oYXMobmFtZSkgJiYgbmFtZXMuZ2V0KG5hbWUpKSB8fCBudWxsLFxuICAgICAgICAgICAgZG9jazogZG9jayA/IHsgbWFpbjogZGVzZXJpYWxpemVBcmVhKGRvY2ssIG5hbWVzKSB9IDogbnVsbFxuICAgICAgICB9O1xuICAgIH1cbiAgICBQcml2YXRlLmRlc2VyaWFsaXplTWFpbiA9IGRlc2VyaWFsaXplTWFpbjtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGF5b3V0cmVzdG9yZXIuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgV2lkZ2V0VHJhY2tlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IE1pbWVEb2N1bWVudEZhY3RvcnkgfSBmcm9tICdAanVweXRlcmxhYi9kb2NyZWdpc3RyeSc7XG5pbXBvcnQgeyBJUmVuZGVyTWltZVJlZ2lzdHJ5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvcmVuZGVybWltZSc7XG5pbXBvcnQgeyBJVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IExhYkljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgQXR0YWNoZWRQcm9wZXJ0eSB9IGZyb20gJ0BsdW1pbm8vcHJvcGVydGllcyc7XG5pbXBvcnQgeyBJTGF5b3V0UmVzdG9yZXIgfSBmcm9tICcuL2xheW91dHJlc3RvcmVyJztcbi8qKlxuICogVGhlIG1pbWUgZG9jdW1lbnQgdHJhY2tlciB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IElNaW1lRG9jdW1lbnRUcmFja2VyID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi9hcHBsaWNhdGlvbjpJTWltZURvY3VtZW50VHJhY2tlcicpO1xuLyoqXG4gKiBDcmVhdGUgcmVuZGVybWltZSBwbHVnaW5zIGZvciByZW5kZXJtaW1lIGV4dGVuc2lvbiBtb2R1bGVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVuZGVybWltZVBsdWdpbnMoZXh0ZW5zaW9ucykge1xuICAgIGNvbnN0IHBsdWdpbnMgPSBbXTtcbiAgICBjb25zdCBuYW1lc3BhY2UgPSAnYXBwbGljYXRpb24tbWltZWRvY3VtZW50cyc7XG4gICAgY29uc3QgdHJhY2tlciA9IG5ldyBXaWRnZXRUcmFja2VyKHsgbmFtZXNwYWNlIH0pO1xuICAgIGV4dGVuc2lvbnMuZm9yRWFjaChtb2QgPT4ge1xuICAgICAgICBsZXQgZGF0YSA9IG1vZC5kZWZhdWx0O1xuICAgICAgICAvLyBIYW5kbGUgQ29tbW9uSlMgZXhwb3J0cy5cbiAgICAgICAgaWYgKCFtb2QuaGFzT3duUHJvcGVydHkoJ19fZXNNb2R1bGUnKSkge1xuICAgICAgICAgICAgZGF0YSA9IG1vZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgIGRhdGEgPSBbZGF0YV07XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcGx1Z2lucy5wdXNoKGNyZWF0ZVJlbmRlcm1pbWVQbHVnaW4odHJhY2tlciwgaXRlbSkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBBbHNvIGFkZCBhIG1ldGEtcGx1Z2luIGhhbmRsaW5nIHN0YXRlIHJlc3RvcmF0aW9uXG4gICAgLy8gYW5kIGV4cG9zaW5nIHRoZSBtaW1lIGRvY3VtZW50IHdpZGdldCB0cmFja2VyLlxuICAgIHBsdWdpbnMucHVzaCh7XG4gICAgICAgIGlkOiAnQGp1cHl0ZXJsYWIvYXBwbGljYXRpb246bWltZWRvY3VtZW50JyxcbiAgICAgICAgb3B0aW9uYWw6IFtJTGF5b3V0UmVzdG9yZXJdLFxuICAgICAgICBwcm92aWRlczogSU1pbWVEb2N1bWVudFRyYWNrZXIsXG4gICAgICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICAgICAgYWN0aXZhdGU6IChhcHAsIHJlc3RvcmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdG9yZXIpIHtcbiAgICAgICAgICAgICAgICB2b2lkIHJlc3RvcmVyLnJlc3RvcmUodHJhY2tlciwge1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiAnZG9jbWFuYWdlcjpvcGVuJyxcbiAgICAgICAgICAgICAgICAgICAgYXJnczogd2lkZ2V0ID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiB3aWRnZXQuY29udGV4dC5wYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjdG9yeTogUHJpdmF0ZS5mYWN0b3J5TmFtZVByb3BlcnR5LmdldCh3aWRnZXQpXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB3aWRnZXQgPT4gYCR7d2lkZ2V0LmNvbnRleHQucGF0aH06JHtQcml2YXRlLmZhY3RvcnlOYW1lUHJvcGVydHkuZ2V0KHdpZGdldCl9YFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRyYWNrZXI7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcGx1Z2lucztcbn1cbi8qKlxuICogQ3JlYXRlIHJlbmRlcm1pbWUgcGx1Z2lucyBmb3IgcmVuZGVybWltZSBleHRlbnNpb24gbW9kdWxlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlbmRlcm1pbWVQbHVnaW4odHJhY2tlciwgaXRlbSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICByZXF1aXJlczogW0lSZW5kZXJNaW1lUmVnaXN0cnksIElUcmFuc2xhdG9yXSxcbiAgICAgICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgICAgICBhY3RpdmF0ZTogKGFwcCwgcmVuZGVybWltZSwgdHJhbnNsYXRvcikgPT4ge1xuICAgICAgICAgICAgLy8gQWRkIHRoZSBtaW1lIHJlbmRlcmVyLlxuICAgICAgICAgICAgaWYgKGl0ZW0ucmFuayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVybWltZS5hZGRGYWN0b3J5KGl0ZW0ucmVuZGVyZXJGYWN0b3J5LCBpdGVtLnJhbmspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVuZGVybWltZS5hZGRGYWN0b3J5KGl0ZW0ucmVuZGVyZXJGYWN0b3J5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgd2lkZ2V0IGZhY3RvcnkuXG4gICAgICAgICAgICBpZiAoIWl0ZW0uZG9jdW1lbnRXaWRnZXRGYWN0b3J5T3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlZ2lzdHJ5ID0gYXBwLmRvY1JlZ2lzdHJ5O1xuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0uZG9jdW1lbnRXaWRnZXRGYWN0b3J5T3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gaXRlbS5kb2N1bWVudFdpZGdldEZhY3RvcnlPcHRpb25zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IFtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5kb2N1bWVudFdpZGdldEZhY3RvcnlPcHRpb25zXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpdGVtLmZpbGVUeXBlcykge1xuICAgICAgICAgICAgICAgIGl0ZW0uZmlsZVR5cGVzLmZvckVhY2goZnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZnQuaWNvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXBjb252ZXJ0IHRoZSBjb250ZW50cyBvZiB0aGUgaWNvbiBmaWVsZCB0byBhIHByb3BlciBMYWJJY29uXG4gICAgICAgICAgICAgICAgICAgICAgICBmdCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZnQpLCB7IGljb246IExhYkljb24ucmVzb2x2ZSh7IGljb246IGZ0Lmljb24gfSkgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXBwLmRvY1JlZ2lzdHJ5LmFkZEZpbGVUeXBlKGZ0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvb2xiYXJGYWN0b3J5ID0gb3B0aW9uLnRvb2xiYXJGYWN0b3J5XG4gICAgICAgICAgICAgICAgICAgID8gKHcpID0+IG9wdGlvbi50b29sYmFyRmFjdG9yeSh3LmNvbnRlbnQucmVuZGVyZXIpXG4gICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZhY3RvcnkgPSBuZXcgTWltZURvY3VtZW50RmFjdG9yeSh7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlclRpbWVvdXQ6IGl0ZW0ucmVuZGVyVGltZW91dCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6IGl0ZW0uZGF0YVR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcm1pbWUsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsTmFtZTogb3B0aW9uLm1vZGVsTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogb3B0aW9uLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlGaWxlVHlwZTogcmVnaXN0cnkuZ2V0RmlsZVR5cGUob3B0aW9uLnByaW1hcnlGaWxlVHlwZSksXG4gICAgICAgICAgICAgICAgICAgIGZpbGVUeXBlczogb3B0aW9uLmZpbGVUeXBlcyxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEZvcjogb3B0aW9uLmRlZmF1bHRGb3IsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRSZW5kZXJlZDogb3B0aW9uLmRlZmF1bHRSZW5kZXJlZCxcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhckZhY3RvcnksXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0b3IsXG4gICAgICAgICAgICAgICAgICAgIGZhY3Rvcnk6IGl0ZW0ucmVuZGVyZXJGYWN0b3J5XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVnaXN0cnkuYWRkV2lkZ2V0RmFjdG9yeShmYWN0b3J5KTtcbiAgICAgICAgICAgICAgICBmYWN0b3J5LndpZGdldENyZWF0ZWQuY29ubmVjdCgoc2VuZGVyLCB3aWRnZXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgUHJpdmF0ZS5mYWN0b3J5TmFtZVByb3BlcnR5LnNldCh3aWRnZXQsIGZhY3RvcnkubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5vdGlmeSB0aGUgd2lkZ2V0IHRyYWNrZXIgaWYgcmVzdG9yZSBkYXRhIG5lZWRzIHRvIHVwZGF0ZS5cbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmNvbnRleHQucGF0aENoYW5nZWQuY29ubmVjdCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2b2lkIHRyYWNrZXIuc2F2ZSh3aWRnZXQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCB0cmFja2VyLmFkZCh3aWRnZXQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBQcml2YXRlIG5hbWVzcGFjZSBmb3IgdGhlIG1vZHVsZS5cbiAqL1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICAvKipcbiAgICAgKiBBbiBhdHRhY2hlZCBwcm9wZXJ0eSBmb3Iga2VlcGluZyB0aGUgZmFjdG9yeSBuYW1lXG4gICAgICogdGhhdCB3YXMgdXNlZCB0byBjcmVhdGUgYSBtaW1lZG9jdW1lbnQuXG4gICAgICovXG4gICAgUHJpdmF0ZS5mYWN0b3J5TmFtZVByb3BlcnR5ID0gbmV3IEF0dGFjaGVkUHJvcGVydHkoe1xuICAgICAgICBuYW1lOiAnZmFjdG9yeU5hbWUnLFxuICAgICAgICBjcmVhdGU6ICgpID0+IHVuZGVmaW5lZFxuICAgIH0pO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1taW1lcmVuZGVyZXJzLmpzLm1hcCIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxufCBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgVVJMRXh0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IFByb21pc2VEZWxlZ2F0ZSwgVG9rZW4gfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBEaXNwb3NhYmxlRGVsZWdhdGUgfSBmcm9tICdAbHVtaW5vL2Rpc3Bvc2FibGUnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuLyoqXG4gKiBBIHN0YXRpYyBjbGFzcyB0aGF0IHJvdXRlcyBVUkxzIHdpdGhpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBSb3V0ZXIge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIFVSTCByb3V0ZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgYSBtYXRjaGluZyBydWxlJ3MgY29tbWFuZCByZXNvbHZlcyB3aXRoIHRoZSBgc3RvcGAgdG9rZW4gZHVyaW5nIHJvdXRpbmcsXG4gICAgICAgICAqIG5vIGZ1cnRoZXIgbWF0Y2hlcyB3aWxsIGV4ZWN1dGUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnN0b3AgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uOlJvdXRlciNzdG9wJyk7XG4gICAgICAgIHRoaXMuX3JvdXRlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX3J1bGVzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmJhc2UgPSBvcHRpb25zLmJhc2U7XG4gICAgICAgIHRoaXMuY29tbWFuZHMgPSBvcHRpb25zLmNvbW1hbmRzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBwYXJzZWQgY3VycmVudCBVUkwgb2YgdGhlIGFwcGxpY2F0aW9uLlxuICAgICAqL1xuICAgIGdldCBjdXJyZW50KCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCB7IGJhc2UgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IFVSTEV4dC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICAgIGNvbnN0IHsgc2VhcmNoLCBoYXNoIH0gPSBwYXJzZWQ7XG4gICAgICAgIGNvbnN0IHBhdGggPSAoX2IgPSAoX2EgPSBwYXJzZWQucGF0aG5hbWUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZXBsYWNlKGJhc2UsICcvJykpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6ICcnO1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gcGF0aCArIHNlYXJjaCArIGhhc2g7XG4gICAgICAgIHJldHVybiB7IGhhc2gsIHBhdGgsIHJlcXVlc3QsIHNlYXJjaCB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIHJvdXRlciByb3V0ZXMgYSByb3V0ZS5cbiAgICAgKi9cbiAgICBnZXQgcm91dGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm91dGVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBOYXZpZ2F0ZSB0byBhIG5ldyBwYXRoIHdpdGhpbiB0aGUgYXBwbGljYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCAtIFRoZSBuZXcgcGF0aCBvciBlbXB0eSBzdHJpbmcgaWYgcmVkaXJlY3RpbmcgdG8gcm9vdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIG5hdmlnYXRpb24gb3B0aW9ucy5cbiAgICAgKi9cbiAgICBuYXZpZ2F0ZShwYXRoLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgeyBiYXNlIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCB7IGhpc3RvcnkgfSA9IHdpbmRvdztcbiAgICAgICAgY29uc3QgeyBoYXJkIH0gPSBvcHRpb25zO1xuICAgICAgICBjb25zdCBvbGQgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuICAgICAgICBjb25zdCB1cmwgPSBwYXRoICYmIHBhdGguaW5kZXhPZihiYXNlKSA9PT0gMCA/IHBhdGggOiBVUkxFeHQuam9pbihiYXNlLCBwYXRoKTtcbiAgICAgICAgaWYgKHVybCA9PT0gb2xkKSB7XG4gICAgICAgICAgICByZXR1cm4gaGFyZCA/IHRoaXMucmVsb2FkKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoe30sICcnLCB1cmwpO1xuICAgICAgICBpZiAoaGFyZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVsb2FkKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvcHRpb25zLnNraXBSb3V0aW5nKSB7XG4gICAgICAgICAgICAvLyBCZWNhdXNlIGEgYHJvdXRlKClgIGNhbGwgbWF5IHN0aWxsIGJlIGluIHRoZSBzdGFjayBhZnRlciBoYXZpbmcgcmVjZWl2ZWRcbiAgICAgICAgICAgIC8vIGEgYHN0b3BgIHRva2VuLCB3YWl0IGZvciB0aGUgbmV4dCBzdGFjayBmcmFtZSBiZWZvcmUgY2FsbGluZyBgcm91dGUoKWAuXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZvaWQgdGhpcy5yb3V0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgdG8gcm91dGUgYSBwYXRoIHBhdHRlcm4gdG8gYSBjb21tYW5kLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgcm91dGUgcmVnaXN0cmF0aW9uIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIGRpc3Bvc2FibGUgdGhhdCByZW1vdmVzIHRoZSByZWdpc3RlcmVkIHJ1bGUgZnJvbSB0aGUgcm91dGVyLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCB7IGNvbW1hbmQsIHBhdHRlcm4gfSA9IG9wdGlvbnM7XG4gICAgICAgIGNvbnN0IHJhbmsgPSAoX2EgPSBvcHRpb25zLnJhbmspICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDEwMDtcbiAgICAgICAgY29uc3QgcnVsZXMgPSB0aGlzLl9ydWxlcztcbiAgICAgICAgcnVsZXMuc2V0KHBhdHRlcm4sIHsgY29tbWFuZCwgcmFuayB9KTtcbiAgICAgICAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlRGVsZWdhdGUoKCkgPT4ge1xuICAgICAgICAgICAgcnVsZXMuZGVsZXRlKHBhdHRlcm4pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2F1c2UgYSBoYXJkIHJlbG9hZCBvZiB0aGUgZG9jdW1lbnQuXG4gICAgICovXG4gICAgcmVsb2FkKCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJvdXRlIGEgc3BlY2lmaWMgcGF0aCB0byBhbiBhY3Rpb24uXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogSWYgYSBwYXR0ZXJuIGlzIG1hdGNoZWQsIGl0cyBjb21tYW5kIHdpbGwgYmUgaW52b2tlZCB3aXRoIGFyZ3VtZW50cyB0aGF0XG4gICAgICogbWF0Y2ggdGhlIGBJUm91dGVyLklMb2NhdGlvbmAgaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIHJvdXRlKCkge1xuICAgICAgICBjb25zdCB7IGNvbW1hbmRzLCBjdXJyZW50LCBzdG9wIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCB7IHJlcXVlc3QgfSA9IGN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IHJvdXRlZCA9IHRoaXMuX3JvdXRlZDtcbiAgICAgICAgY29uc3QgcnVsZXMgPSB0aGlzLl9ydWxlcztcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IFtdO1xuICAgICAgICAvLyBDb2xsZWN0IGFsbCBydWxlcyB0aGF0IG1hdGNoIHRoZSBVUkwuXG4gICAgICAgIHJ1bGVzLmZvckVhY2goKHJ1bGUsIHBhdHRlcm4pID0+IHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0ID09PSBudWxsIHx8IHJlcXVlc3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlcXVlc3QubWF0Y2gocGF0dGVybikpIHtcbiAgICAgICAgICAgICAgICBtYXRjaGVzLnB1c2gocnVsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBPcmRlciB0aGUgbWF0Y2hpbmcgcnVsZXMgYnkgcmFuayBhbmQgZW5xdWV1ZSB0aGVtLlxuICAgICAgICBjb25zdCBxdWV1ZSA9IG1hdGNoZXMuc29ydCgoYSwgYikgPT4gYi5yYW5rIC0gYS5yYW5rKTtcbiAgICAgICAgY29uc3QgZG9uZSA9IG5ldyBQcm9taXNlRGVsZWdhdGUoKTtcbiAgICAgICAgLy8gUHJvY2VzcyBlYWNoIGVucXVldWVkIGNvbW1hbmQgc2VxdWVudGlhbGx5IGFuZCBzaG9ydC1jaXJjdWl0IGlmIGEgcHJvbWlzZVxuICAgICAgICAvLyByZXNvbHZlcyB3aXRoIHRoZSBgc3RvcGAgdG9rZW4uXG4gICAgICAgIGNvbnN0IG5leHQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJvdXRlZC5lbWl0KGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIGRvbmUucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZCB9ID0gcXVldWUucG9wKCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLmN1cnJlbnQucmVxdWVzdDtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjb21tYW5kcy5leGVjdXRlKGNvbW1hbmQsIGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHN0b3ApIHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhgUm91dGluZyAke3JlcXVlc3R9IHdhcyBzaG9ydC1jaXJjdWl0ZWQgYnkgJHtjb21tYW5kfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChyZWFzb24pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFJvdXRpbmcgJHtyZXF1ZXN0fSB0byAke2NvbW1hbmR9IGZhaWxlZGAsIHJlYXNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2b2lkIG5leHQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdm9pZCBuZXh0KCk7XG4gICAgICAgIHJldHVybiBkb25lLnByb21pc2U7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cm91dGVyLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IERvY3VtZW50V2lkZ2V0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvZG9jcmVnaXN0cnknO1xuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBjbGFzc2VzLCBMYWJJY29uLCBUYWJQYW5lbFN2ZyB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgQ29sbGFiRG9ja1BhbmVsIH0gZnJvbSAnQGhhY2tlcnJhbmsvanVweXRlcmxhYi1jb2xsYWInO1xuaW1wb3J0IHsgQXJyYXlFeHQsIGZpbmQsIGl0ZXIsIHRvQXJyYXkgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG5pbXBvcnQgeyBQcm9taXNlRGVsZWdhdGUsIFRva2VuIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgTWVzc2FnZUxvb3AgfSBmcm9tICdAbHVtaW5vL21lc3NhZ2luZyc7XG5pbXBvcnQgeyBEZWJvdW5jZXIgfSBmcm9tICdAbHVtaW5vL3BvbGxpbmcnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuaW1wb3J0IHsgQm94TGF5b3V0LCBCb3hQYW5lbCwgRm9jdXNUcmFja2VyLCBQYW5lbCwgU3BsaXRQYW5lbCwgU3RhY2tlZFBhbmVsLCBUYWJCYXIsIFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIEFwcFNoZWxsIGluc3RhbmNlcy5cbiAqL1xuY29uc3QgQVBQTElDQVRJT05fU0hFTExfQ0xBU1MgPSAnanAtTGFiU2hlbGwnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBzaWRlIGJhciBpbnN0YW5jZXMuXG4gKi9cbmNvbnN0IFNJREVCQVJfQ0xBU1MgPSAnanAtU2lkZUJhcic7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRoZSBjdXJyZW50IHdpZGdldCdzIHRpdGxlLlxuICovXG5jb25zdCBDVVJSRU5UX0NMQVNTID0gJ2pwLW1vZC1jdXJyZW50Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIGFjdGl2ZSB3aWRnZXQncyB0aXRsZS5cbiAqL1xuY29uc3QgQUNUSVZFX0NMQVNTID0gJ2pwLW1vZC1hY3RpdmUnO1xuLyoqXG4gKiBUaGUgZGVmYXVsdCByYW5rIG9mIGl0ZW1zIGFkZGVkIHRvIGEgc2lkZWJhci5cbiAqL1xuY29uc3QgREVGQVVMVF9SQU5LID0gOTAwO1xuY29uc3QgQUNUSVZJVFlfQ0xBU1MgPSAnanAtQWN0aXZpdHknO1xuLyoqXG4gKiBUaGUgSnVweXRlckxhYiBhcHBsaWNhdGlvbiBzaGVsbCB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IElMYWJTaGVsbCA9IG5ldyBUb2tlbignQGp1cHl0ZXJsYWIvYXBwbGljYXRpb246SUxhYlNoZWxsJyk7XG4vKipcbiAqIFRoZSBhcHBsaWNhdGlvbiBzaGVsbCBmb3IgSnVweXRlckxhYi5cbiAqL1xuZXhwb3J0IGNsYXNzIExhYlNoZWxsIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgYXBwbGljYXRpb24gc2hlbGwuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBtZXNzYWdlIGhvb2sgZm9yIGNoaWxkIGFkZC9yZW1vdmUgbWVzc2FnZXMgb24gdGhlIG1haW4gYXJlYSBkb2NrIHBhbmVsLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fZG9ja0NoaWxkSG9vayA9IChoYW5kbGVyLCBtc2cpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAobXNnLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjaGlsZC1hZGRlZCc6XG4gICAgICAgICAgICAgICAgICAgIG1zZy5jaGlsZC5hZGRDbGFzcyhBQ1RJVklUWV9DTEFTUyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyYWNrZXIuYWRkKG1zZy5jaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NoaWxkLXJlbW92ZWQnOlxuICAgICAgICAgICAgICAgICAgICBtc2cuY2hpbGQucmVtb3ZlQ2xhc3MoQUNUSVZJVFlfQ0xBU1MpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmFja2VyLnJlbW92ZShtc2cuY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9hY3RpdmVDaGFuZ2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fY2FjaGVkTGF5b3V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY3VycmVudENoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9jdXJyZW50UGF0aCA9ICcnO1xuICAgICAgICB0aGlzLl9jdXJyZW50UGF0aENoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9tb2RlQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2lzUmVzdG9yZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fbGF5b3V0TW9kaWZpZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9sYXlvdXREZWJvdW5jZXIgPSBuZXcgRGVib3VuY2VyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2xheW91dE1vZGlmaWVkLmVtaXQodW5kZWZpbmVkKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICAgIHRoaXMuX3Jlc3RvcmVkID0gbmV3IFByb21pc2VEZWxlZ2F0ZSgpO1xuICAgICAgICB0aGlzLl90cmFja2VyID0gbmV3IEZvY3VzVHJhY2tlcigpO1xuICAgICAgICB0aGlzLl9tYWluT3B0aW9uc0NhY2hlID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9zaWRlT3B0aW9uc0NhY2hlID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKEFQUExJQ0FUSU9OX1NIRUxMX0NMQVNTKTtcbiAgICAgICAgdGhpcy5pZCA9ICdtYWluJztcbiAgICAgICAgY29uc3QgdHJhbnMgPSAoKG9wdGlvbnMgJiYgb3B0aW9ucy50cmFuc2xhdG9yKSB8fCBudWxsVHJhbnNsYXRvcikubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCBoZWFkZXJQYW5lbCA9ICh0aGlzLl9oZWFkZXJQYW5lbCA9IG5ldyBCb3hQYW5lbCgpKTtcbiAgICAgICAgY29uc3QgbWVudUhhbmRsZXIgPSAodGhpcy5fbWVudUhhbmRsZXIgPSBuZXcgUHJpdmF0ZS5QYW5lbEhhbmRsZXIoKSk7XG4gICAgICAgIG1lbnVIYW5kbGVyLnBhbmVsLm5vZGUuc2V0QXR0cmlidXRlKCdyb2xlJywgJ25hdmlnYXRpb24nKTtcbiAgICAgICAgbWVudUhhbmRsZXIucGFuZWwubm9kZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCB0cmFucy5fXygnbWFpbicpKTtcbiAgICAgICAgY29uc3QgdG9wSGFuZGxlciA9ICh0aGlzLl90b3BIYW5kbGVyID0gbmV3IFByaXZhdGUuUGFuZWxIYW5kbGVyKCkpO1xuICAgICAgICB0b3BIYW5kbGVyLnBhbmVsLm5vZGUuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2Jhbm5lcicpO1xuICAgICAgICBjb25zdCBib3R0b21QYW5lbCA9ICh0aGlzLl9ib3R0b21QYW5lbCA9IG5ldyBCb3hQYW5lbCgpKTtcbiAgICAgICAgYm90dG9tUGFuZWwubm9kZS5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnY29udGVudGluZm8nKTtcbiAgICAgICAgY29uc3QgaGJveFBhbmVsID0gbmV3IEJveFBhbmVsKCk7XG4gICAgICAgIGNvbnN0IHZzcGxpdFBhbmVsID0gKHRoaXMuX3ZzcGxpdFBhbmVsID0gbmV3IFByaXZhdGUuUmVzdG9yYWJsZVNwbGl0UGFuZWwoKSk7XG4gICAgICAgIGNvbnN0IGRvY2tQYW5lbCA9ICh0aGlzLl9kb2NrUGFuZWwgPSBuZXcgQ29sbGFiRG9ja1BhbmVsKHtcbiAgICAgICAgICAgIGhpZGRlbk1vZGU6IFdpZGdldC5IaWRkZW5Nb2RlLlNjYWxlLFxuICAgICAgICAgICAgdHJhbnNsYXRvcjogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnRyYW5zbGF0b3JcbiAgICAgICAgfSkpO1xuICAgICAgICBNZXNzYWdlTG9vcC5pbnN0YWxsTWVzc2FnZUhvb2soZG9ja1BhbmVsLCB0aGlzLl9kb2NrQ2hpbGRIb29rKTtcbiAgICAgICAgY29uc3QgaHNwbGl0UGFuZWwgPSAodGhpcy5faHNwbGl0UGFuZWwgPSBuZXcgUHJpdmF0ZS5SZXN0b3JhYmxlU3BsaXRQYW5lbCgpKTtcbiAgICAgICAgY29uc3QgZG93blBhbmVsID0gKHRoaXMuX2Rvd25QYW5lbCA9IG5ldyBUYWJQYW5lbFN2Zyh7XG4gICAgICAgICAgICB0YWJzTW92YWJsZTogdHJ1ZVxuICAgICAgICB9KSk7XG4gICAgICAgIGNvbnN0IGxlZnRIYW5kbGVyID0gKHRoaXMuX2xlZnRIYW5kbGVyID0gbmV3IFByaXZhdGUuU2lkZUJhckhhbmRsZXIoKSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0SGFuZGxlciA9ICh0aGlzLl9yaWdodEhhbmRsZXIgPSBuZXcgUHJpdmF0ZS5TaWRlQmFySGFuZGxlcigpKTtcbiAgICAgICAgY29uc3Qgcm9vdExheW91dCA9IG5ldyBCb3hMYXlvdXQoKTtcbiAgICAgICAgaGVhZGVyUGFuZWwuaWQgPSAnanAtaGVhZGVyLXBhbmVsJztcbiAgICAgICAgbWVudUhhbmRsZXIucGFuZWwuaWQgPSAnanAtbWVudS1wYW5lbCc7XG4gICAgICAgIHRvcEhhbmRsZXIucGFuZWwuaWQgPSAnanAtdG9wLXBhbmVsJztcbiAgICAgICAgYm90dG9tUGFuZWwuaWQgPSAnanAtYm90dG9tLXBhbmVsJztcbiAgICAgICAgaGJveFBhbmVsLmlkID0gJ2pwLW1haW4tY29udGVudC1wYW5lbCc7XG4gICAgICAgIHZzcGxpdFBhbmVsLmlkID0gJ2pwLW1haW4tdnNwbGl0LXBhbmVsJztcbiAgICAgICAgZG9ja1BhbmVsLmlkID0gJ2pwLW1haW4tZG9jay1wYW5lbCc7XG4gICAgICAgIGhzcGxpdFBhbmVsLmlkID0gJ2pwLW1haW4tc3BsaXQtcGFuZWwnO1xuICAgICAgICBkb3duUGFuZWwuaWQgPSAnanAtZG93bi1zdGFjayc7XG4gICAgICAgIGxlZnRIYW5kbGVyLnNpZGVCYXIuYWRkQ2xhc3MoU0lERUJBUl9DTEFTUyk7XG4gICAgICAgIGxlZnRIYW5kbGVyLnNpZGVCYXIuYWRkQ2xhc3MoJ2pwLW1vZC1sZWZ0Jyk7XG4gICAgICAgIGxlZnRIYW5kbGVyLnNpZGVCYXIubm9kZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCB0cmFucy5fXygnbWFpbiBzaWRlYmFyJykpO1xuICAgICAgICBsZWZ0SGFuZGxlci5zaWRlQmFyLmNvbnRlbnROb2RlLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHRyYW5zLl9fKCdtYWluIHNpZGViYXInKSk7XG4gICAgICAgIGxlZnRIYW5kbGVyLnNpZGVCYXIubm9kZS5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnY29tcGxlbWVudGFyeScpO1xuICAgICAgICBsZWZ0SGFuZGxlci5zdGFja2VkUGFuZWwuaWQgPSAnanAtbGVmdC1zdGFjayc7XG4gICAgICAgIHJpZ2h0SGFuZGxlci5zaWRlQmFyLmFkZENsYXNzKFNJREVCQVJfQ0xBU1MpO1xuICAgICAgICByaWdodEhhbmRsZXIuc2lkZUJhci5hZGRDbGFzcygnanAtbW9kLXJpZ2h0Jyk7XG4gICAgICAgIHJpZ2h0SGFuZGxlci5zaWRlQmFyLm5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgdHJhbnMuX18oJ2FsdGVybmF0ZSBzaWRlYmFyJykpO1xuICAgICAgICByaWdodEhhbmRsZXIuc2lkZUJhci5jb250ZW50Tm9kZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCB0cmFucy5fXygnYWx0ZXJuYXRlIHNpZGViYXInKSk7XG4gICAgICAgIHJpZ2h0SGFuZGxlci5zaWRlQmFyLm5vZGUuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2NvbXBsZW1lbnRhcnknKTtcbiAgICAgICAgcmlnaHRIYW5kbGVyLnN0YWNrZWRQYW5lbC5pZCA9ICdqcC1yaWdodC1zdGFjayc7XG4gICAgICAgIGRvY2tQYW5lbC5ub2RlLnNldEF0dHJpYnV0ZSgncm9sZScsICdtYWluJyk7XG4gICAgICAgIGhib3hQYW5lbC5zcGFjaW5nID0gMDtcbiAgICAgICAgdnNwbGl0UGFuZWwuc3BhY2luZyA9IDE7XG4gICAgICAgIGRvY2tQYW5lbC5zcGFjaW5nID0gNTtcbiAgICAgICAgaHNwbGl0UGFuZWwuc3BhY2luZyA9IDE7XG4gICAgICAgIGhlYWRlclBhbmVsLmRpcmVjdGlvbiA9ICd0b3AtdG8tYm90dG9tJztcbiAgICAgICAgdnNwbGl0UGFuZWwub3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuICAgICAgICBoYm94UGFuZWwuZGlyZWN0aW9uID0gJ2xlZnQtdG8tcmlnaHQnO1xuICAgICAgICBoc3BsaXRQYW5lbC5vcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICAgICAgYm90dG9tUGFuZWwuZGlyZWN0aW9uID0gJ2JvdHRvbS10by10b3AnO1xuICAgICAgICBTcGxpdFBhbmVsLnNldFN0cmV0Y2gobGVmdEhhbmRsZXIuc3RhY2tlZFBhbmVsLCAwKTtcbiAgICAgICAgU3BsaXRQYW5lbC5zZXRTdHJldGNoKGRvd25QYW5lbCwgMCk7XG4gICAgICAgIFNwbGl0UGFuZWwuc2V0U3RyZXRjaChkb2NrUGFuZWwsIDEpO1xuICAgICAgICBTcGxpdFBhbmVsLnNldFN0cmV0Y2gocmlnaHRIYW5kbGVyLnN0YWNrZWRQYW5lbCwgMCk7XG4gICAgICAgIEJveFBhbmVsLnNldFN0cmV0Y2gobGVmdEhhbmRsZXIuc2lkZUJhciwgMCk7XG4gICAgICAgIEJveFBhbmVsLnNldFN0cmV0Y2goaHNwbGl0UGFuZWwsIDEpO1xuICAgICAgICBCb3hQYW5lbC5zZXRTdHJldGNoKHJpZ2h0SGFuZGxlci5zaWRlQmFyLCAwKTtcbiAgICAgICAgU3BsaXRQYW5lbC5zZXRTdHJldGNoKHZzcGxpdFBhbmVsLCAxKTtcbiAgICAgICAgaHNwbGl0UGFuZWwuYWRkV2lkZ2V0KGxlZnRIYW5kbGVyLnN0YWNrZWRQYW5lbCk7XG4gICAgICAgIGhzcGxpdFBhbmVsLmFkZFdpZGdldChkb2NrUGFuZWwpO1xuICAgICAgICBoc3BsaXRQYW5lbC5hZGRXaWRnZXQocmlnaHRIYW5kbGVyLnN0YWNrZWRQYW5lbCk7XG4gICAgICAgIHZzcGxpdFBhbmVsLmFkZFdpZGdldChoc3BsaXRQYW5lbCk7XG4gICAgICAgIHZzcGxpdFBhbmVsLmFkZFdpZGdldChkb3duUGFuZWwpO1xuICAgICAgICBoYm94UGFuZWwuYWRkV2lkZ2V0KGxlZnRIYW5kbGVyLnNpZGVCYXIpO1xuICAgICAgICBoYm94UGFuZWwuYWRkV2lkZ2V0KHZzcGxpdFBhbmVsKTtcbiAgICAgICAgaGJveFBhbmVsLmFkZFdpZGdldChyaWdodEhhbmRsZXIuc2lkZUJhcik7XG4gICAgICAgIHJvb3RMYXlvdXQuZGlyZWN0aW9uID0gJ3RvcC10by1ib3R0b20nO1xuICAgICAgICByb290TGF5b3V0LnNwYWNpbmcgPSAwOyAvLyBUT0RPIG1ha2UgdGhpcyBjb25maWd1cmFibGU/XG4gICAgICAgIC8vIFVzZSByZWxhdGl2ZSBzaXppbmcgdG8gc2V0IHRoZSB3aWR0aCBvZiB0aGUgc2lkZSBwYW5lbHMuXG4gICAgICAgIC8vIFRoaXMgd2lsbCBzdGlsbCByZXNwZWN0IHRoZSBtaW4tc2l6ZSBvZiBjaGlsZHJlbiB3aWRnZXQgaW4gdGhlIHN0YWNrZWRcbiAgICAgICAgLy8gcGFuZWwuIFRoZSBkZWZhdWx0IHNpemVzIHdpbGwgYmUgb3ZlcndyaXR0ZW4gZHVyaW5nIGxheW91dCByZXN0b3JhdGlvbi5cbiAgICAgICAgdnNwbGl0UGFuZWwuc2V0UmVsYXRpdmVTaXplcyhbMywgMV0pO1xuICAgICAgICBoc3BsaXRQYW5lbC5zZXRSZWxhdGl2ZVNpemVzKFsxLCAyLjUsIDFdKTtcbiAgICAgICAgQm94TGF5b3V0LnNldFN0cmV0Y2goaGVhZGVyUGFuZWwsIDApO1xuICAgICAgICBCb3hMYXlvdXQuc2V0U3RyZXRjaChtZW51SGFuZGxlci5wYW5lbCwgMCk7XG4gICAgICAgIEJveExheW91dC5zZXRTdHJldGNoKHRvcEhhbmRsZXIucGFuZWwsIDApO1xuICAgICAgICBCb3hMYXlvdXQuc2V0U3RyZXRjaChoYm94UGFuZWwsIDEpO1xuICAgICAgICBCb3hMYXlvdXQuc2V0U3RyZXRjaChib3R0b21QYW5lbCwgMCk7XG4gICAgICAgIHJvb3RMYXlvdXQuYWRkV2lkZ2V0KGhlYWRlclBhbmVsKTtcbiAgICAgICAgcm9vdExheW91dC5hZGRXaWRnZXQodG9wSGFuZGxlci5wYW5lbCk7XG4gICAgICAgIHJvb3RMYXlvdXQuYWRkV2lkZ2V0KGhib3hQYW5lbCk7XG4gICAgICAgIHJvb3RMYXlvdXQuYWRkV2lkZ2V0KGJvdHRvbVBhbmVsKTtcbiAgICAgICAgLy8gaW5pdGlhbGx5IGhpZGluZyBoZWFkZXIgYW5kIGJvdHRvbSBwYW5lbCB3aGVuIG5vIGVsZW1lbnRzIGluc2lkZSxcbiAgICAgICAgdGhpcy5faGVhZGVyUGFuZWwuaGlkZSgpO1xuICAgICAgICB0aGlzLl9ib3R0b21QYW5lbC5oaWRlKCk7XG4gICAgICAgIHRoaXMuX2Rvd25QYW5lbC5oaWRlKCk7XG4gICAgICAgIHRoaXMubGF5b3V0ID0gcm9vdExheW91dDtcbiAgICAgICAgLy8gQ29ubmVjdCBjaGFuZ2UgbGlzdGVuZXJzLlxuICAgICAgICB0aGlzLl90cmFja2VyLmN1cnJlbnRDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25DdXJyZW50Q2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuX3RyYWNrZXIuYWN0aXZlQ2hhbmdlZC5jb25uZWN0KHRoaXMuX29uQWN0aXZlQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIC8vIENvbm5lY3QgbWFpbiBsYXlvdXQgY2hhbmdlIGxpc3RlbmVyLlxuICAgICAgICB0aGlzLl9kb2NrUGFuZWwubGF5b3V0TW9kaWZpZWQuY29ubmVjdCh0aGlzLl9vbkxheW91dE1vZGlmaWVkLCB0aGlzKTtcbiAgICAgICAgLy8gQ29ubmVjdCB2c3BsaXQgbGF5b3V0IGNoYW5nZSBsaXN0ZW5lclxuICAgICAgICB0aGlzLl92c3BsaXRQYW5lbC51cGRhdGVkLmNvbm5lY3QodGhpcy5fb25MYXlvdXRNb2RpZmllZCwgdGhpcyk7XG4gICAgICAgIC8vIENvbm5lY3QgZG93biBwYW5lbCBjaGFuZ2UgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuX2Rvd25QYW5lbC5jdXJyZW50Q2hhbmdlZC5jb25uZWN0KHRoaXMuX29uTGF5b3V0TW9kaWZpZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLl9kb3duUGFuZWwudGFiQmFyLnRhYk1vdmVkLmNvbm5lY3QodGhpcy5fb25UYWJQYW5lbENoYW5nZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLl9kb3duUGFuZWwuc3RhY2tlZFBhbmVsLndpZGdldFJlbW92ZWQuY29ubmVjdCh0aGlzLl9vblRhYlBhbmVsQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIC8vIENhdGNoIGN1cnJlbnQgY2hhbmdlZCBldmVudHMgb24gdGhlIHNpZGUgaGFuZGxlcnMuXG4gICAgICAgIHRoaXMuX2xlZnRIYW5kbGVyLnNpZGVCYXIuY3VycmVudENoYW5nZWQuY29ubmVjdCh0aGlzLl9vbkxheW91dE1vZGlmaWVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fcmlnaHRIYW5kbGVyLnNpZGVCYXIuY3VycmVudENoYW5nZWQuY29ubmVjdCh0aGlzLl9vbkxheW91dE1vZGlmaWVkLCB0aGlzKTtcbiAgICAgICAgLy8gQ2F0Y2ggdXBkYXRlIGV2ZW50cyBvbiB0aGUgaG9yaXpvbnRhbCBzcGxpdCBwYW5lbFxuICAgICAgICB0aGlzLl9oc3BsaXRQYW5lbC51cGRhdGVkLmNvbm5lY3QodGhpcy5fb25MYXlvdXRNb2RpZmllZCwgdGhpcyk7XG4gICAgICAgIC8vIFNldHVwIHNpbmdsZS1kb2N1bWVudC1tb2RlIHRpdGxlIGJhclxuICAgICAgICBjb25zdCB0aXRsZUhhbmRsZXIgPSAodGhpcy5fdGl0bGVIYW5kbGVyID0gbmV3IFByaXZhdGUuVGl0bGVIYW5kbGVyKHRoaXMpKTtcbiAgICAgICAgdGhpcy5hZGQodGl0bGVIYW5kbGVyLCAndG9wJywgeyByYW5rOiAxMDAgfSk7XG4gICAgICAgIGlmICh0aGlzLl9kb2NrUGFuZWwubW9kZSA9PT0gJ211bHRpcGxlLWRvY3VtZW50Jykge1xuICAgICAgICAgICAgdGhpcy5fdG9wSGFuZGxlci5hZGRXaWRnZXQodGhpcy5fbWVudUhhbmRsZXIucGFuZWwsIDEwMCk7XG4gICAgICAgICAgICB0aXRsZUhhbmRsZXIuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcm9vdExheW91dC5pbnNlcnRXaWRnZXQoMiwgdGhpcy5fbWVudUhhbmRsZXIucGFuZWwpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNraXAgTGlua3NcbiAgICAgICAgY29uc3Qgc2tpcExpbmtXaWRnZXQgPSAodGhpcy5fc2tpcExpbmtXaWRnZXQgPSBuZXcgUHJpdmF0ZS5Ta2lwTGlua1dpZGdldCh0aGlzKSk7XG4gICAgICAgIHRoaXMuYWRkKHNraXBMaW5rV2lkZ2V0LCAndG9wJywgeyByYW5rOiAwIH0pO1xuICAgICAgICB0aGlzLl9za2lwTGlua1dpZGdldC5zaG93KCk7XG4gICAgICAgIC8vIFdpcmUgdXAgc2lnbmFscyB0byB1cGRhdGUgdGhlIHRpdGxlIHBhbmVsIG9mIHRoZSBzaW1wbGUgaW50ZXJmYWNlIG1vZGUgdG9cbiAgICAgICAgLy8gZm9sbG93IHRoZSB0aXRsZSBvZiB0aGlzLmN1cnJlbnRXaWRnZXRcbiAgICAgICAgdGhpcy5jdXJyZW50Q2hhbmdlZC5jb25uZWN0KChzZW5kZXIsIGFyZ3MpID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IGFyZ3MubmV3VmFsdWU7XG4gICAgICAgICAgICBsZXQgb2xkVmFsdWUgPSBhcmdzLm9sZFZhbHVlO1xuICAgICAgICAgICAgLy8gU3RvcCB3YXRjaGluZyB0aGUgdGl0bGUgb2YgdGhlIHByZXZpb3VzbHkgY3VycmVudCB3aWRnZXRcbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIG9sZFZhbHVlLnRpdGxlLmNoYW5nZWQuZGlzY29ubmVjdCh0aGlzLl91cGRhdGVUaXRsZVBhbmVsVGl0bGUsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU3RhcnQgd2F0Y2hpbmcgdGhlIHRpdGxlIG9mIHRoZSBuZXcgY3VycmVudCB3aWRnZXRcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlLnRpdGxlLmNoYW5nZWQuY29ubmVjdCh0aGlzLl91cGRhdGVUaXRsZVBhbmVsVGl0bGUsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRpdGxlUGFuZWxUaXRsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICYmIG5ld1ZhbHVlIGluc3RhbmNlb2YgRG9jdW1lbnRXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZS5jb250ZXh0LnBhdGhDaGFuZ2VkLmNvbm5lY3QodGhpcy5fdXBkYXRlQ3VycmVudFBhdGgsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ3VycmVudFBhdGgoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiBtYWluIGFyZWEncyBhY3RpdmUgZm9jdXMgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBnZXQgYWN0aXZlQ2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUNoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBhY3RpdmUgd2lkZ2V0IGluIHRoZSBzaGVsbCdzIG1haW4gYXJlYS5cbiAgICAgKi9cbiAgICBnZXQgYWN0aXZlV2lkZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHJhY2tlci5hY3RpdmVXaWRnZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiBtYWluIGFyZWEncyBjdXJyZW50IGZvY3VzIGNoYW5nZXMuXG4gICAgICovXG4gICAgZ2V0IGN1cnJlbnRDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudENoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgc2hlbGwvZG9jayBwYW5lbCBjaGFuZ2UgbW9kZXMgKHNpbmdsZS9tdWx0aXBsZSBkb2N1bWVudCkuXG4gICAgICovXG4gICAgZ2V0IG1vZGVDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZUNoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgcGF0aCBvZiB0aGUgY3VycmVudCBkb2N1bWVudCBjaGFuZ2VzLlxuICAgICAqXG4gICAgICogVGhpcyBhbHNvIGZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgZG9jdW1lbnQgaXRzZWxmIGNoYW5nZXMuXG4gICAgICovXG4gICAgZ2V0IGN1cnJlbnRQYXRoQ2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQYXRoQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgd2lkZ2V0IGluIHRoZSBzaGVsbCdzIG1haW4gYXJlYS5cbiAgICAgKi9cbiAgICBnZXQgY3VycmVudFdpZGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWNrZXIuY3VycmVudFdpZGdldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBtYWluIGFyZWEncyBsYXlvdXQgaXMgbW9kaWZpZWQuXG4gICAgICovXG4gICAgZ2V0IGxheW91dE1vZGlmaWVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGF5b3V0TW9kaWZpZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGxlZnQgYXJlYSBpcyBjb2xsYXBzZWQuXG4gICAgICovXG4gICAgZ2V0IGxlZnRDb2xsYXBzZWQoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5fbGVmdEhhbmRsZXIuc2lkZUJhci5jdXJyZW50VGl0bGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGxlZnQgYXJlYSBpcyBjb2xsYXBzZWQuXG4gICAgICovXG4gICAgZ2V0IHJpZ2h0Q29sbGFwc2VkKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuX3JpZ2h0SGFuZGxlci5zaWRlQmFyLmN1cnJlbnRUaXRsZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciBKdXB5dGVyTGFiIGlzIGluIHByZXNlbnRhdGlvbiBtb2RlIHdpdGggdGhlXG4gICAgICogYGpwLW1vZC1wcmVzZW50YXRpb25Nb2RlYCBDU1MgY2xhc3MuXG4gICAgICovXG4gICAgZ2V0IHByZXNlbnRhdGlvbk1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0NsYXNzKCdqcC1tb2QtcHJlc2VudGF0aW9uTW9kZScpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbmFibGUvZGlzYWJsZSBwcmVzZW50YXRpb24gbW9kZSAoYGpwLW1vZC1wcmVzZW50YXRpb25Nb2RlYCBDU1MgY2xhc3MpIHdpdGhcbiAgICAgKiBhIGJvb2xlYW4uXG4gICAgICovXG4gICAgc2V0IHByZXNlbnRhdGlvbk1vZGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy50b2dnbGVDbGFzcygnanAtbW9kLXByZXNlbnRhdGlvbk1vZGUnLCB2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBtYWluIGRvY2sgYXJlYSdzIHVzZXIgaW50ZXJmYWNlIG1vZGUuXG4gICAgICovXG4gICAgZ2V0IG1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kb2NrUGFuZWwubW9kZTtcbiAgICB9XG4gICAgc2V0IG1vZGUobW9kZSkge1xuICAgICAgICBjb25zdCBkb2NrID0gdGhpcy5fZG9ja1BhbmVsO1xuICAgICAgICBpZiAobW9kZSA9PT0gZG9jay5tb2RlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXBwbGljYXRpb25DdXJyZW50V2lkZ2V0ID0gdGhpcy5jdXJyZW50V2lkZ2V0O1xuICAgICAgICBpZiAobW9kZSA9PT0gJ3NpbmdsZS1kb2N1bWVudCcpIHtcbiAgICAgICAgICAgIC8vIENhY2hlIHRoZSBjdXJyZW50IG11bHRpLWRvY3VtZW50IGxheW91dCBiZWZvcmUgY2hhbmdpbmcgdGhlIG1vZGUuXG4gICAgICAgICAgICB0aGlzLl9jYWNoZWRMYXlvdXQgPSBkb2NrLnNhdmVMYXlvdXQoKTtcbiAgICAgICAgICAgIGRvY2subW9kZSA9IG1vZGU7XG4gICAgICAgICAgICAvLyBJbiBjYXNlIHRoZSBhY3RpdmUgd2lkZ2V0IGluIHRoZSBkb2NrIHBhbmVsIGlzICpub3QqIHRoZSBhY3RpdmUgd2lkZ2V0XG4gICAgICAgICAgICAvLyBvZiB0aGUgYXBwbGljYXRpb24sIGRlZmVyIHRvIHRoZSBhcHBsaWNhdGlvbi5cbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICBkb2NrLmFjdGl2YXRlV2lkZ2V0KHRoaXMuY3VycmVudFdpZGdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBZGp1c3QgbWVudSBhbmQgdGl0bGVcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Lmluc2VydFdpZGdldCgyLCB0aGlzLl9tZW51SGFuZGxlci5wYW5lbCk7XG4gICAgICAgICAgICB0aGlzLl90aXRsZUhhbmRsZXIuc2hvdygpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVGl0bGVQYW5lbFRpdGxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBDYWNoZSBhIHJlZmVyZW5jZSB0byBldmVyeSB3aWRnZXQgY3VycmVudGx5IGluIHRoZSBkb2NrIHBhbmVsIGJlZm9yZVxuICAgICAgICAgICAgLy8gY2hhbmdpbmcgaXRzIG1vZGUuXG4gICAgICAgICAgICBjb25zdCB3aWRnZXRzID0gdG9BcnJheShkb2NrLndpZGdldHMoKSk7XG4gICAgICAgICAgICBkb2NrLm1vZGUgPSBtb2RlO1xuICAgICAgICAgICAgLy8gUmVzdG9yZSB0aGUgb3JpZ2luYWwgbGF5b3V0LlxuICAgICAgICAgICAgaWYgKHRoaXMuX2NhY2hlZExheW91dCkge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBhbnkgZGlzcG9zZWQgd2lkZ2V0cyBpbiB0aGUgY2FjaGVkIGxheW91dCBhbmQgcmVzdG9yZS5cbiAgICAgICAgICAgICAgICBQcml2YXRlLm5vcm1hbGl6ZUFyZWFDb25maWcoZG9jaywgdGhpcy5fY2FjaGVkTGF5b3V0Lm1haW4pO1xuICAgICAgICAgICAgICAgIGRvY2sucmVzdG9yZUxheW91dCh0aGlzLl9jYWNoZWRMYXlvdXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlZExheW91dCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBZGQgYW55IHdpZGdldHMgY3JlYXRlZCBkdXJpbmcgc2luZ2xlIGRvY3VtZW50IG1vZGUsIHdoaWNoIGhhdmVcbiAgICAgICAgICAgIC8vIHN1YnNlcXVlbnRseSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgZG9jayBwYW5lbCBhZnRlciB0aGUgbXVsdGlwbGUgZG9jdW1lbnRcbiAgICAgICAgICAgIC8vIGxheW91dCBoYXMgYmVlbiByZXN0b3JlZC4gSWYgdGhlIHdpZGdldCBoYXMgYWRkIG9wdGlvbnMgY2FjaGVkIGZvclxuICAgICAgICAgICAgLy8gdGhlIHdpZGdldCAoaS5lLiwgaWYgaXQgaGFzIGJlZW4gcGxhY2VkIHdpdGggcmVzcGVjdCB0byBhbm90aGVyIHdpZGdldCksXG4gICAgICAgICAgICAvLyB0aGVuIHRha2UgdGhhdCBpbnRvIGFjY291bnQuXG4gICAgICAgICAgICB3aWRnZXRzLmZvckVhY2god2lkZ2V0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXdpZGdldC5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkVG9NYWluQXJlYSh3aWRnZXQsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fbWFpbk9wdGlvbnNDYWNoZS5nZXQod2lkZ2V0KSksIHsgYWN0aXZhdGU6IGZhbHNlIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX21haW5PcHRpb25zQ2FjaGUuY2xlYXIoKTtcbiAgICAgICAgICAgIC8vIEluIGNhc2UgdGhlIGFjdGl2ZSB3aWRnZXQgaW4gdGhlIGRvY2sgcGFuZWwgaXMgKm5vdCogdGhlIGFjdGl2ZSB3aWRnZXRcbiAgICAgICAgICAgIC8vIG9mIHRoZSBhcHBsaWNhdGlvbiwgZGVmZXIgdG8gdGhlIGFwcGxpY2F0aW9uLlxuICAgICAgICAgICAgaWYgKGFwcGxpY2F0aW9uQ3VycmVudFdpZGdldCkge1xuICAgICAgICAgICAgICAgIGRvY2suYWN0aXZhdGVXaWRnZXQoYXBwbGljYXRpb25DdXJyZW50V2lkZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFkanVzdCBtZW51IGFuZCB0aXRsZVxuICAgICAgICAgICAgdGhpcy5hZGQodGhpcy5fbWVudUhhbmRsZXIucGFuZWwsICd0b3AnLCB7IHJhbms6IDEwMCB9KTtcbiAgICAgICAgICAgIC8vIHRoaXMuX3RvcEhhbmRsZXIuYWRkV2lkZ2V0KHRoaXMuX21lbnVIYW5kbGVyLnBhbmVsLCAxMDApXG4gICAgICAgICAgICB0aGlzLl90aXRsZUhhbmRsZXIuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNldCB0aGUgbW9kZSBkYXRhIGF0dHJpYnV0ZSBvbiB0aGUgYXBwbGljYXRpb25zIHNoZWxsIG5vZGUuXG4gICAgICAgIHRoaXMubm9kZS5kYXRhc2V0LnNoZWxsTW9kZSA9IG1vZGU7XG4gICAgICAgIHRoaXMuX2Rvd25QYW5lbC5maXQoKTtcbiAgICAgICAgLy8gRW1pdCB0aGUgbW9kZSBjaGFuZ2VkIHNpZ25hbFxuICAgICAgICB0aGlzLl9tb2RlQ2hhbmdlZC5lbWl0KG1vZGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiBzdGF0ZSBpcyBmaXJzdCByZXN0b3JlZCwgcmV0dXJuaW5nIGxheW91dFxuICAgICAqIGRlc2NyaXB0aW9uLlxuICAgICAqL1xuICAgIGdldCByZXN0b3JlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3RvcmVkLnByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlIGEgd2lkZ2V0IGluIGl0cyBhcmVhLlxuICAgICAqL1xuICAgIGFjdGl2YXRlQnlJZChpZCkge1xuICAgICAgICBpZiAodGhpcy5fbGVmdEhhbmRsZXIuaGFzKGlkKSkge1xuICAgICAgICAgICAgdGhpcy5fbGVmdEhhbmRsZXIuYWN0aXZhdGUoaWQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9yaWdodEhhbmRsZXIuaGFzKGlkKSkge1xuICAgICAgICAgICAgdGhpcy5fcmlnaHRIYW5kbGVyLmFjdGl2YXRlKGlkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0YWJJbmRleCA9IHRoaXMuX2Rvd25QYW5lbC50YWJCYXIudGl0bGVzLmZpbmRJbmRleCh0aXRsZSA9PiB0aXRsZS5vd25lci5pZCA9PT0gaWQpO1xuICAgICAgICBpZiAodGFiSW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5fZG93blBhbmVsLmN1cnJlbnRJbmRleCA9IHRhYkluZGV4O1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRvY2sgPSB0aGlzLl9kb2NrUGFuZWw7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IGZpbmQoZG9jay53aWRnZXRzKCksIHZhbHVlID0+IHZhbHVlLmlkID09PSBpZCk7XG4gICAgICAgIGlmICh3aWRnZXQpIHtcbiAgICAgICAgICAgIGRvY2suYWN0aXZhdGVXaWRnZXQod2lkZ2V0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKlxuICAgICAqIEFjdGl2YXRlIHRoZSBuZXh0IFRhYiBpbiB0aGUgYWN0aXZlIFRhYkJhci5cbiAgICAgKi9cbiAgICBhY3RpdmF0ZU5leHRUYWIoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLl9jdXJyZW50VGFiQmFyKCk7XG4gICAgICAgIGlmICghY3VycmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNpID0gY3VycmVudC5jdXJyZW50SW5kZXg7XG4gICAgICAgIGlmIChjaSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2kgPCBjdXJyZW50LnRpdGxlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBjdXJyZW50LmN1cnJlbnRJbmRleCArPSAxO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQuY3VycmVudFRpdGxlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudC5jdXJyZW50VGl0bGUub3duZXIuYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2kgPT09IGN1cnJlbnQudGl0bGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRCYXIgPSB0aGlzLl9hZGphY2VudEJhcignbmV4dCcpO1xuICAgICAgICAgICAgaWYgKG5leHRCYXIpIHtcbiAgICAgICAgICAgICAgICBuZXh0QmFyLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRCYXIuY3VycmVudFRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRCYXIuY3VycmVudFRpdGxlLm93bmVyLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qXG4gICAgICogV2hldGhlciB0aGUgYWRkIGJ1dHRvbnMgZm9yIGVhY2ggbWFpbiBhcmVhIHRhYiBiYXIgYXJlIGVuYWJsZWQuXG4gICAgICovXG4gICAgZ2V0IGFkZEJ1dHRvbkVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kb2NrUGFuZWwuYWRkQnV0dG9uRW5hYmxlZDtcbiAgICB9XG4gICAgc2V0IGFkZEJ1dHRvbkVuYWJsZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZG9ja1BhbmVsLmFkZEJ1dHRvbkVuYWJsZWQgPSB2YWx1ZTtcbiAgICB9XG4gICAgLypcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIGFkZCBidXR0b24gb24gYSBtYWluIGFyZWEgdGFiIGJhciBpcyBjbGlja2VkLlxuICAgICAqL1xuICAgIGdldCBhZGRSZXF1ZXN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kb2NrUGFuZWwuYWRkUmVxdWVzdGVkO1xuICAgIH1cbiAgICAvKlxuICAgICAqIEFjdGl2YXRlIHRoZSBwcmV2aW91cyBUYWIgaW4gdGhlIGFjdGl2ZSBUYWJCYXIuXG4gICAgICovXG4gICAgYWN0aXZhdGVQcmV2aW91c1RhYigpIHtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHRoaXMuX2N1cnJlbnRUYWJCYXIoKTtcbiAgICAgICAgaWYgKCFjdXJyZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2kgPSBjdXJyZW50LmN1cnJlbnRJbmRleDtcbiAgICAgICAgaWYgKGNpID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaSA+IDApIHtcbiAgICAgICAgICAgIGN1cnJlbnQuY3VycmVudEluZGV4IC09IDE7XG4gICAgICAgICAgICBpZiAoY3VycmVudC5jdXJyZW50VGl0bGUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50LmN1cnJlbnRUaXRsZS5vd25lci5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaSA9PT0gMCkge1xuICAgICAgICAgICAgY29uc3QgcHJldkJhciA9IHRoaXMuX2FkamFjZW50QmFyKCdwcmV2aW91cycpO1xuICAgICAgICAgICAgaWYgKHByZXZCYXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsZW4gPSBwcmV2QmFyLnRpdGxlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgcHJldkJhci5jdXJyZW50SW5kZXggPSBsZW4gLSAxO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2QmFyLmN1cnJlbnRUaXRsZSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2QmFyLmN1cnJlbnRUaXRsZS5vd25lci5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKlxuICAgICAqIEFjdGl2YXRlIHRoZSBuZXh0IFRhYkJhci5cbiAgICAgKi9cbiAgICBhY3RpdmF0ZU5leHRUYWJCYXIoKSB7XG4gICAgICAgIGNvbnN0IG5leHRCYXIgPSB0aGlzLl9hZGphY2VudEJhcignbmV4dCcpO1xuICAgICAgICBpZiAobmV4dEJhcikge1xuICAgICAgICAgICAgaWYgKG5leHRCYXIuY3VycmVudFRpdGxlKSB7XG4gICAgICAgICAgICAgICAgbmV4dEJhci5jdXJyZW50VGl0bGUub3duZXIuYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKlxuICAgICAqIEFjdGl2YXRlIHRoZSBuZXh0IFRhYkJhci5cbiAgICAgKi9cbiAgICBhY3RpdmF0ZVByZXZpb3VzVGFiQmFyKCkge1xuICAgICAgICBjb25zdCBuZXh0QmFyID0gdGhpcy5fYWRqYWNlbnRCYXIoJ3ByZXZpb3VzJyk7XG4gICAgICAgIGlmIChuZXh0QmFyKSB7XG4gICAgICAgICAgICBpZiAobmV4dEJhci5jdXJyZW50VGl0bGUpIHtcbiAgICAgICAgICAgICAgICBuZXh0QmFyLmN1cnJlbnRUaXRsZS5vd25lci5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGFkZCh3aWRnZXQsIGFyZWEgPSAnbWFpbicsIG9wdGlvbnMpIHtcbiAgICAgICAgc3dpdGNoIChhcmVhIHx8ICdtYWluJykge1xuICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYWRkVG9Cb3R0b21BcmVhKHdpZGdldCwgb3B0aW9ucyk7XG4gICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYWRkVG9Eb3duQXJlYSh3aWRnZXQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYWRkVG9IZWFkZXJBcmVhKHdpZGdldCwgb3B0aW9ucyk7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYWRkVG9MZWZ0QXJlYSh3aWRnZXQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgY2FzZSAnbWFpbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FkZFRvTWFpbkFyZWEod2lkZ2V0LCBvcHRpb25zKTtcbiAgICAgICAgICAgIGNhc2UgJ21lbnUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hZGRUb01lbnVBcmVhKHdpZGdldCwgb3B0aW9ucyk7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FkZFRvUmlnaHRBcmVhKHdpZGdldCwgb3B0aW9ucyk7XG4gICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hZGRUb1RvcEFyZWEod2lkZ2V0LCBvcHRpb25zKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGFyZWE6ICR7YXJlYX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb2xsYXBzZSB0aGUgbGVmdCBhcmVhLlxuICAgICAqL1xuICAgIGNvbGxhcHNlTGVmdCgpIHtcbiAgICAgICAgdGhpcy5fbGVmdEhhbmRsZXIuY29sbGFwc2UoKTtcbiAgICAgICAgdGhpcy5fb25MYXlvdXRNb2RpZmllZCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb2xsYXBzZSB0aGUgcmlnaHQgYXJlYS5cbiAgICAgKi9cbiAgICBjb2xsYXBzZVJpZ2h0KCkge1xuICAgICAgICB0aGlzLl9yaWdodEhhbmRsZXIuY29sbGFwc2UoKTtcbiAgICAgICAgdGhpcy5fb25MYXlvdXRNb2RpZmllZCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIHRoZSBzaGVsbC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGF5b3V0RGVib3VuY2VyLmRpc3Bvc2UoKTtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFeHBhbmQgdGhlIGxlZnQgYXJlYS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIHdpbGwgb3BlbiB0aGUgbW9zdCByZWNlbnRseSB1c2VkIHRhYixcbiAgICAgKiBvciB0aGUgZmlyc3QgdGFiIGlmIHRoZXJlIGlzIG5vIG1vc3QgcmVjZW50bHkgdXNlZC5cbiAgICAgKi9cbiAgICBleHBhbmRMZWZ0KCkge1xuICAgICAgICB0aGlzLl9sZWZ0SGFuZGxlci5leHBhbmQoKTtcbiAgICAgICAgdGhpcy5fb25MYXlvdXRNb2RpZmllZCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFeHBhbmQgdGhlIHJpZ2h0IGFyZWEuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyB3aWxsIG9wZW4gdGhlIG1vc3QgcmVjZW50bHkgdXNlZCB0YWIsXG4gICAgICogb3IgdGhlIGZpcnN0IHRhYiBpZiB0aGVyZSBpcyBubyBtb3N0IHJlY2VudGx5IHVzZWQuXG4gICAgICovXG4gICAgZXhwYW5kUmlnaHQoKSB7XG4gICAgICAgIHRoaXMuX3JpZ2h0SGFuZGxlci5leHBhbmQoKTtcbiAgICAgICAgdGhpcy5fb25MYXlvdXRNb2RpZmllZCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9zZSBhbGwgd2lkZ2V0cyBpbiB0aGUgbWFpbiBhbmQgZG93biBhcmVhLlxuICAgICAqL1xuICAgIGNsb3NlQWxsKCkge1xuICAgICAgICAvLyBNYWtlIGEgY29weSBvZiBhbGwgdGhlIHdpZGdldCBpbiB0aGUgZG9jayBwYW5lbCAodXNpbmcgYHRvQXJyYXkoKWApXG4gICAgICAgIC8vIGJlZm9yZSByZW1vdmluZyB0aGVtIGJlY2F1c2UgcmVtb3ZpbmcgdGhlbSB3aGlsZSBpdGVyYXRpbmcgdGhyb3VnaCB0aGVtXG4gICAgICAgIC8vIG1vZGlmaWVzIHRoZSB1bmRlcmx5aW5nIGRhdGEgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICB0b0FycmF5KHRoaXMuX2RvY2tQYW5lbC53aWRnZXRzKCkpLmZvckVhY2god2lkZ2V0ID0+IHdpZGdldC5jbG9zZSgpKTtcbiAgICAgICAgdGhpcy5fZG93blBhbmVsLnN0YWNrZWRQYW5lbC53aWRnZXRzLmZvckVhY2god2lkZ2V0ID0+IHdpZGdldC5jbG9zZSgpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJ1ZSBpZiB0aGUgZ2l2ZW4gYXJlYSBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBpc0VtcHR5KGFyZWEpIHtcbiAgICAgICAgc3dpdGNoIChhcmVhKSB7XG4gICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ib3R0b21QYW5lbC53aWRnZXRzLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kb3duUGFuZWwuc3RhY2tlZFBhbmVsLndpZGdldHMubGVuZ3RoID09PSAwO1xuICAgICAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faGVhZGVyUGFuZWwud2lkZ2V0cy5sZW5ndGggPT09IDA7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGVmdEhhbmRsZXIuc3RhY2tlZFBhbmVsLndpZGdldHMubGVuZ3RoID09PSAwO1xuICAgICAgICAgICAgY2FzZSAnbWFpbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RvY2tQYW5lbC5pc0VtcHR5O1xuICAgICAgICAgICAgY2FzZSAnbWVudSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21lbnVIYW5kbGVyLnBhbmVsLndpZGdldHMubGVuZ3RoID09PSAwO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yaWdodEhhbmRsZXIuc3RhY2tlZFBhbmVsLndpZGdldHMubGVuZ3RoID09PSAwO1xuICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdG9wSGFuZGxlci5wYW5lbC53aWRnZXRzLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzdG9yZSB0aGUgbGF5b3V0IHN0YXRlIGZvciB0aGUgYXBwbGljYXRpb24gc2hlbGwuXG4gICAgICovXG4gICAgcmVzdG9yZUxheW91dChtb2RlLCBsYXlvdXQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgeyBtYWluQXJlYSwgZG93bkFyZWEsIGxlZnRBcmVhLCByaWdodEFyZWEsIHJlbGF0aXZlU2l6ZXMgfSA9IGxheW91dDtcbiAgICAgICAgLy8gUmVoeWRyYXRlIHRoZSBtYWluIGFyZWEuXG4gICAgICAgIGlmIChtYWluQXJlYSkge1xuICAgICAgICAgICAgY29uc3QgeyBjdXJyZW50V2lkZ2V0LCBkb2NrIH0gPSBtYWluQXJlYTtcbiAgICAgICAgICAgIGlmIChkb2NrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZG9ja1BhbmVsLnJlc3RvcmVMYXlvdXQoZG9jayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3VycmVudFdpZGdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVCeUlkKGN1cnJlbnRXaWRnZXQuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyBuZWVkZWQgd2hlbiBsb2FkaW5nIGluIGFuIGVtcHR5IHdvcmtzcGFjZSBpbiBzaW5nbGUgZG9jIG1vZGVcbiAgICAgICAgICAgIGlmIChtb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBSZWh5ZHJhdGUgdGhlIGRvd24gYXJlYVxuICAgICAgICBpZiAoZG93bkFyZWEpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY3VycmVudFdpZGdldCwgd2lkZ2V0cywgc2l6ZSB9ID0gZG93bkFyZWE7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXRJZHMgPSAoX2EgPSB3aWRnZXRzID09PSBudWxsIHx8IHdpZGdldHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpZGdldHMubWFwKHdpZGdldCA9PiB3aWRnZXQuaWQpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXTtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhYnNlbnQgd2lkZ2V0c1xuICAgICAgICAgICAgdGhpcy5fZG93blBhbmVsLnRhYkJhci50aXRsZXNcbiAgICAgICAgICAgICAgICAuZmlsdGVyKHRpdGxlID0+ICF3aWRnZXRJZHMuaW5jbHVkZXModGl0bGUub3duZXIuaWQpKVxuICAgICAgICAgICAgICAgIC5tYXAodGl0bGUgPT4gdGl0bGUub3duZXIuY2xvc2UoKSk7XG4gICAgICAgICAgICAvLyBBZGQgbmV3IHdpZGdldHNcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlSWRzID0gdGhpcy5fZG93blBhbmVsLnRhYkJhci50aXRsZXMubWFwKHRpdGxlID0+IHRpdGxlLm93bmVyLmlkKTtcbiAgICAgICAgICAgIHdpZGdldHMgPT09IG51bGwgfHwgd2lkZ2V0cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2lkZ2V0cy5maWx0ZXIod2lkZ2V0ID0+ICF0aXRsZUlkcy5pbmNsdWRlcyh3aWRnZXQuaWQpKS5tYXAod2lkZ2V0ID0+IHRoaXMuX2Rvd25QYW5lbC5hZGRXaWRnZXQod2lkZ2V0KSk7XG4gICAgICAgICAgICAvLyBSZW9yZGVyIHRhYnNcbiAgICAgICAgICAgIHdoaWxlICghQXJyYXlFeHQuc2hhbGxvd0VxdWFsKHdpZGdldElkcywgdGhpcy5fZG93blBhbmVsLnRhYkJhci50aXRsZXMubWFwKHRpdGxlID0+IHRpdGxlLm93bmVyLmlkKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kb3duUGFuZWwudGFiQmFyLnRpdGxlcy5mb3JFYWNoKCh0aXRsZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSB3aWRnZXRJZHMuZmluZEluZGV4KGlkID0+IHRpdGxlLm93bmVyLmlkID09IGlkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uID49IDAgJiYgcG9zaXRpb24gIT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rvd25QYW5lbC50YWJCYXIuaW5zZXJ0VGFiKHBvc2l0aW9uLCB0aXRsZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjdXJyZW50V2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9kb3duUGFuZWwuc3RhY2tlZFBhbmVsLndpZGdldHMuZmluZEluZGV4KHdpZGdldCA9PiB3aWRnZXQuaWQgPT09IGN1cnJlbnRXaWRnZXQuaWQpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kb3duUGFuZWwuY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIChfYiA9IHRoaXMuX2Rvd25QYW5lbC5jdXJyZW50V2lkZ2V0KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYWN0aXZhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2l6ZSAmJiBzaXplID4gMC4wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdnNwbGl0UGFuZWwuc2V0UmVsYXRpdmVTaXplcyhbMS4wIC0gc2l6ZSwgc2l6ZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQ2xvc2UgYWxsIHRhYnMgYW5kIGhpZGUgdGhlIHBhbmVsXG4gICAgICAgICAgICAgICAgdGhpcy5fZG93blBhbmVsLnN0YWNrZWRQYW5lbC53aWRnZXRzLmZvckVhY2god2lkZ2V0ID0+IHdpZGdldC5jbG9zZSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kb3duUGFuZWwuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFJlaHlkcmF0ZSB0aGUgbGVmdCBhcmVhLlxuICAgICAgICBpZiAobGVmdEFyZWEpIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZnRIYW5kbGVyLnJlaHlkcmF0ZShsZWZ0QXJlYSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAobW9kZSA9PT0gJ3NpbmdsZS1kb2N1bWVudCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlTGVmdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFJlaHlkcmF0ZSB0aGUgcmlnaHQgYXJlYS5cbiAgICAgICAgaWYgKHJpZ2h0QXJlYSkge1xuICAgICAgICAgICAgdGhpcy5fcmlnaHRIYW5kbGVyLnJlaHlkcmF0ZShyaWdodEFyZWEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKG1vZGUgPT09ICdzaW5nbGUtZG9jdW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZVJpZ2h0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVzdG9yZSB0aGUgcmVsYXRpdmUgc2l6ZXMuXG4gICAgICAgIGlmIChyZWxhdGl2ZVNpemVzKSB7XG4gICAgICAgICAgICB0aGlzLl9oc3BsaXRQYW5lbC5zZXRSZWxhdGl2ZVNpemVzKHJlbGF0aXZlU2l6ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5faXNSZXN0b3JlZCkge1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIGFsbCBtZXNzYWdlcyBpbiB0aGUgcXVldWUgYXJlIGZpbmlzaGVkIGJlZm9yZSBub3RpZnlpbmdcbiAgICAgICAgICAgIC8vIGFueSBleHRlbnNpb25zIHRoYXQgYXJlIHdhaXRpbmcgZm9yIHRoZSBwcm9taXNlIHRoYXQgZ3VhcmFudGVlcyB0aGVcbiAgICAgICAgICAgIC8vIGFwcGxpY2F0aW9uIHN0YXRlIGhhcyBiZWVuIHJlc3RvcmVkLlxuICAgICAgICAgICAgTWVzc2FnZUxvb3AuZmx1c2goKTtcbiAgICAgICAgICAgIHRoaXMuX3Jlc3RvcmVkLnJlc29sdmUobGF5b3V0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYXZlIHRoZSBkZWh5ZHJhdGVkIHN0YXRlIG9mIHRoZSBhcHBsaWNhdGlvbiBzaGVsbC5cbiAgICAgKi9cbiAgICBzYXZlTGF5b3V0KCkge1xuICAgICAgICAvLyBJZiB0aGUgYXBwbGljYXRpb24gaXMgaW4gc2luZ2xlIGRvY3VtZW50IG1vZGUsIHVzZSB0aGUgY2FjaGVkIGxheW91dCBpZlxuICAgICAgICAvLyBhdmFpbGFibGUuIE90aGVyd2lzZSwgZGVmYXVsdCB0byBxdWVyeWluZyB0aGUgZG9jayBwYW5lbCBmb3IgbGF5b3V0LlxuICAgICAgICBjb25zdCBsYXlvdXQgPSB7XG4gICAgICAgICAgICBtYWluQXJlYToge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRXaWRnZXQ6IHRoaXMuX3RyYWNrZXIuY3VycmVudFdpZGdldCxcbiAgICAgICAgICAgICAgICBkb2NrOiB0aGlzLm1vZGUgPT09ICdzaW5nbGUtZG9jdW1lbnQnXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5fY2FjaGVkTGF5b3V0IHx8IHRoaXMuX2RvY2tQYW5lbC5zYXZlTGF5b3V0KClcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLl9kb2NrUGFuZWwuc2F2ZUxheW91dCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG93bkFyZWE6IHtcbiAgICAgICAgICAgICAgICBjdXJyZW50V2lkZ2V0OiB0aGlzLl9kb3duUGFuZWwuY3VycmVudFdpZGdldCxcbiAgICAgICAgICAgICAgICB3aWRnZXRzOiB0b0FycmF5KHRoaXMuX2Rvd25QYW5lbC5zdGFja2VkUGFuZWwud2lkZ2V0cyksXG4gICAgICAgICAgICAgICAgc2l6ZTogdGhpcy5fdnNwbGl0UGFuZWwucmVsYXRpdmVTaXplcygpWzFdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVmdEFyZWE6IHRoaXMuX2xlZnRIYW5kbGVyLmRlaHlkcmF0ZSgpLFxuICAgICAgICAgICAgcmlnaHRBcmVhOiB0aGlzLl9yaWdodEhhbmRsZXIuZGVoeWRyYXRlKCksXG4gICAgICAgICAgICByZWxhdGl2ZVNpemVzOiB0aGlzLl9oc3BsaXRQYW5lbC5yZWxhdGl2ZVNpemVzKClcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGxheW91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBzaGVsbCBjb25maWd1cmF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbmZpZyBTaGVsbCBjb25maWd1cmF0aW9uXG4gICAgICovXG4gICAgdXBkYXRlQ29uZmlnKGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnLmhpZGRlbk1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2RvY2tQYW5lbC5oaWRkZW5Nb2RlID1cbiAgICAgICAgICAgICAgICBjb25maWcuaGlkZGVuTW9kZSA9PT0gJ2Rpc3BsYXknXG4gICAgICAgICAgICAgICAgICAgID8gV2lkZ2V0LkhpZGRlbk1vZGUuRGlzcGxheVxuICAgICAgICAgICAgICAgICAgICA6IFdpZGdldC5IaWRkZW5Nb2RlLlNjYWxlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHdpZGdldHMgZm9yIGFuIGFwcGxpY2F0aW9uIGFyZWEuXG4gICAgICovXG4gICAgd2lkZ2V0cyhhcmVhKSB7XG4gICAgICAgIHN3aXRjaCAoYXJlYSAhPT0gbnVsbCAmJiBhcmVhICE9PSB2b2lkIDAgPyBhcmVhIDogJ21haW4nKSB7XG4gICAgICAgICAgICBjYXNlICdtYWluJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZG9ja1BhbmVsLndpZGdldHMoKTtcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVyKHRoaXMuX2xlZnRIYW5kbGVyLnNpZGVCYXIudGl0bGVzLm1hcCh0ID0+IHQub3duZXIpKTtcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlcih0aGlzLl9yaWdodEhhbmRsZXIuc2lkZUJhci50aXRsZXMubWFwKHQgPT4gdC5vd25lcikpO1xuICAgICAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faGVhZGVyUGFuZWwuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RvcEhhbmRsZXIucGFuZWwuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgIGNhc2UgJ21lbnUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tZW51SGFuZGxlci5wYW5lbC5jaGlsZHJlbigpO1xuICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYm90dG9tUGFuZWwuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGFyZWE6ICR7YXJlYX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYGFmdGVyLWF0dGFjaGAgbWVzc2FnZXMgZm9yIHRoZSBhcHBsaWNhdGlvbiBzaGVsbC5cbiAgICAgKi9cbiAgICBvbkFmdGVyQXR0YWNoKG1zZykge1xuICAgICAgICB0aGlzLm5vZGUuZGF0YXNldC5zaGVsbE1vZGUgPSB0aGlzLm1vZGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgdGl0bGUgcGFuZWwgdGl0bGUgYmFzZWQgb24gdGhlIHRpdGxlIG9mIHRoZSBjdXJyZW50IHdpZGdldC5cbiAgICAgKi9cbiAgICBfdXBkYXRlVGl0bGVQYW5lbFRpdGxlKCkge1xuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuY3VycmVudFdpZGdldDtcbiAgICAgICAgY29uc3QgaW5wdXRFbGVtZW50ID0gdGhpcy5fdGl0bGVIYW5kbGVyLmlucHV0RWxlbWVudDtcbiAgICAgICAgaW5wdXRFbGVtZW50LnZhbHVlID0gY3VycmVudCA/IGN1cnJlbnQudGl0bGUubGFiZWwgOiAnJztcbiAgICAgICAgaW5wdXRFbGVtZW50LnRpdGxlID0gY3VycmVudCA/IGN1cnJlbnQudGl0bGUuY2FwdGlvbiA6ICcnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgcGF0aCBvZiB0aGUgY3VycmVudCB3aWRnZXQgY2hhbmdlZCwgZmlyZSB0aGUgX2N1cnJlbnRQYXRoQ2hhbmdlZCBzaWduYWwuXG4gICAgICovXG4gICAgX3VwZGF0ZUN1cnJlbnRQYXRoKCkge1xuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuY3VycmVudFdpZGdldDtcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gJyc7XG4gICAgICAgIGlmIChjdXJyZW50ICYmIGN1cnJlbnQgaW5zdGFuY2VvZiBEb2N1bWVudFdpZGdldCkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSBjdXJyZW50LmNvbnRleHQucGF0aDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJyZW50UGF0aENoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWUsXG4gICAgICAgICAgICBvbGRWYWx1ZTogdGhpcy5fY3VycmVudFBhdGhcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQYXRoID0gbmV3VmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIHdpZGdldCB0byB0aGUgbGVmdCBjb250ZW50IGFyZWEuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogV2lkZ2V0cyBtdXN0IGhhdmUgYSB1bmlxdWUgYGlkYCBwcm9wZXJ0eSwgd2hpY2ggd2lsbCBiZSB1c2VkIGFzIHRoZSBET00gaWQuXG4gICAgICovXG4gICAgX2FkZFRvTGVmdEFyZWEod2lkZ2V0LCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghd2lkZ2V0LmlkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdXaWRnZXRzIGFkZGVkIHRvIGFwcCBzaGVsbCBtdXN0IGhhdmUgdW5pcXVlIGlkIHByb3BlcnR5LicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHRoaXMuX3NpZGVPcHRpb25zQ2FjaGUuZ2V0KHdpZGdldCkgfHwge307XG4gICAgICAgIHRoaXMuX3NpZGVPcHRpb25zQ2FjaGUuc2V0KHdpZGdldCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHJhbmsgPSAncmFuaycgaW4gb3B0aW9ucyA/IG9wdGlvbnMucmFuayA6IERFRkFVTFRfUkFOSztcbiAgICAgICAgdGhpcy5fbGVmdEhhbmRsZXIuYWRkV2lkZ2V0KHdpZGdldCwgcmFuayk7XG4gICAgICAgIHRoaXMuX29uTGF5b3V0TW9kaWZpZWQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgd2lkZ2V0IHRvIHRoZSBtYWluIGNvbnRlbnQgYXJlYS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBXaWRnZXRzIG11c3QgaGF2ZSBhIHVuaXF1ZSBgaWRgIHByb3BlcnR5LCB3aGljaCB3aWxsIGJlIHVzZWQgYXMgdGhlIERPTSBpZC5cbiAgICAgKiBBbGwgd2lkZ2V0cyBhZGRlZCB0byB0aGUgbWFpbiBhcmVhIHNob3VsZCBiZSBkaXNwb3NlZCBhZnRlciByZW1vdmFsXG4gICAgICogKGRpc3Bvc2FsIGJlZm9yZSByZW1vdmFsIHdpbGwgcmVtb3ZlIHRoZSB3aWRnZXQgYXV0b21hdGljYWxseSkuXG4gICAgICpcbiAgICAgKiBJbiB0aGUgb3B0aW9ucywgYHJlZmAgZGVmYXVsdHMgdG8gYG51bGxgLCBgbW9kZWAgZGVmYXVsdHMgdG8gYCd0YWItYWZ0ZXInYCxcbiAgICAgKiBhbmQgYGFjdGl2YXRlYCBkZWZhdWx0cyB0byBgdHJ1ZWAuXG4gICAgICovXG4gICAgX2FkZFRvTWFpbkFyZWEod2lkZ2V0LCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghd2lkZ2V0LmlkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdXaWRnZXRzIGFkZGVkIHRvIGFwcCBzaGVsbCBtdXN0IGhhdmUgdW5pcXVlIGlkIHByb3BlcnR5LicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBjb25zdCBkb2NrID0gdGhpcy5fZG9ja1BhbmVsO1xuICAgICAgICBjb25zdCBtb2RlID0gb3B0aW9ucy5tb2RlIHx8ICd0YWItYWZ0ZXInO1xuICAgICAgICBsZXQgcmVmID0gdGhpcy5jdXJyZW50V2lkZ2V0O1xuICAgICAgICBpZiAob3B0aW9ucy5yZWYpIHtcbiAgICAgICAgICAgIHJlZiA9IGZpbmQoZG9jay53aWRnZXRzKCksIHZhbHVlID0+IHZhbHVlLmlkID09PSBvcHRpb25zLnJlZikgfHwgbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IHRpdGxlIH0gPSB3aWRnZXQ7XG4gICAgICAgIC8vIEFkZCB3aWRnZXQgSUQgdG8gdGFiIHNvIHRoYXQgd2UgY2FuIGdldCBhIGhhbmRsZSBvbiB0aGUgdGFiJ3Mgd2lkZ2V0XG4gICAgICAgIC8vIChmb3IgY29udGV4dCBtZW51IHN1cHBvcnQpXG4gICAgICAgIHRpdGxlLmRhdGFzZXQgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRpdGxlLmRhdGFzZXQpLCB7IGlkOiB3aWRnZXQuaWQgfSk7XG4gICAgICAgIGlmICh0aXRsZS5pY29uIGluc3RhbmNlb2YgTGFiSWNvbikge1xuICAgICAgICAgICAgLy8gYmluZCBhbiBhcHByb3ByaWF0ZSBzdHlsZSB0byB0aGUgaWNvblxuICAgICAgICAgICAgdGl0bGUuaWNvbiA9IHRpdGxlLmljb24uYmluZHByb3BzKHtcbiAgICAgICAgICAgICAgICBzdHlsZXNoZWV0OiAnbWFpbkFyZWFUYWInXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdGl0bGUuaWNvbiA9PT0gJ3N0cmluZycgfHwgIXRpdGxlLmljb24pIHtcbiAgICAgICAgICAgIC8vIGFkZCBzb21lIGNsYXNzZXMgdG8gaGVscCB3aXRoIGRpc3BsYXlpbmcgY3NzIGJhY2tncm91bmQgaW1nc1xuICAgICAgICAgICAgdGl0bGUuaWNvbkNsYXNzID0gY2xhc3Nlcyh0aXRsZS5pY29uQ2xhc3MsICdqcC1JY29uJyk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jay5hZGRXaWRnZXQod2lkZ2V0LCB7IG1vZGUsIHJlZiB9KTtcbiAgICAgICAgLy8gVGhlIGRvY2sgcGFuZWwgZG9lc24ndCBhY2NvdW50IGZvciBwbGFjZW1lbnQgaW5mb3JtYXRpb24gd2hpbGVcbiAgICAgICAgLy8gaW4gc2luZ2xlIGRvY3VtZW50IG1vZGUsIHNvIHVwb24gcmVoeWRyYXRpbmcgYW55IHdpZGdldHMgdGhhdCB3ZXJlXG4gICAgICAgIC8vIGFkZGVkIHdpbGwgbm90IGJlIGluIHRoZSBjb3JyZWN0IHBsYWNlLiBDYWNoZSB0aGUgcGxhY2VtZW50IGluZm9ybWF0aW9uXG4gICAgICAgIC8vIGhlcmUgc28gdGhhdCB3ZSBjYW4gbGF0ZXIgcmVoeWRyYXRlIGNvcnJlY3RseS5cbiAgICAgICAgaWYgKGRvY2subW9kZSA9PT0gJ3NpbmdsZS1kb2N1bWVudCcpIHtcbiAgICAgICAgICAgIHRoaXMuX21haW5PcHRpb25zQ2FjaGUuc2V0KHdpZGdldCwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuYWN0aXZhdGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBkb2NrLmFjdGl2YXRlV2lkZ2V0KHdpZGdldCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgd2lkZ2V0IHRvIHRoZSByaWdodCBjb250ZW50IGFyZWEuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogV2lkZ2V0cyBtdXN0IGhhdmUgYSB1bmlxdWUgYGlkYCBwcm9wZXJ0eSwgd2hpY2ggd2lsbCBiZSB1c2VkIGFzIHRoZSBET00gaWQuXG4gICAgICovXG4gICAgX2FkZFRvUmlnaHRBcmVhKHdpZGdldCwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIXdpZGdldC5pZCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignV2lkZ2V0cyBhZGRlZCB0byBhcHAgc2hlbGwgbXVzdCBoYXZlIHVuaXF1ZSBpZCBwcm9wZXJ0eS4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB0aGlzLl9zaWRlT3B0aW9uc0NhY2hlLmdldCh3aWRnZXQpIHx8IHt9O1xuICAgICAgICBjb25zdCByYW5rID0gJ3JhbmsnIGluIG9wdGlvbnMgPyBvcHRpb25zLnJhbmsgOiBERUZBVUxUX1JBTks7XG4gICAgICAgIHRoaXMuX3NpZGVPcHRpb25zQ2FjaGUuc2V0KHdpZGdldCwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3JpZ2h0SGFuZGxlci5hZGRXaWRnZXQod2lkZ2V0LCByYW5rKTtcbiAgICAgICAgdGhpcy5fb25MYXlvdXRNb2RpZmllZCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgYSB3aWRnZXQgdG8gdGhlIHRvcCBjb250ZW50IGFyZWEuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogV2lkZ2V0cyBtdXN0IGhhdmUgYSB1bmlxdWUgYGlkYCBwcm9wZXJ0eSwgd2hpY2ggd2lsbCBiZSB1c2VkIGFzIHRoZSBET00gaWQuXG4gICAgICovXG4gICAgX2FkZFRvVG9wQXJlYSh3aWRnZXQsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoIXdpZGdldC5pZCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignV2lkZ2V0cyBhZGRlZCB0byBhcHAgc2hlbGwgbXVzdCBoYXZlIHVuaXF1ZSBpZCBwcm9wZXJ0eS4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgY29uc3QgcmFuayA9IChfYSA9IG9wdGlvbnMucmFuaykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogREVGQVVMVF9SQU5LO1xuICAgICAgICB0aGlzLl90b3BIYW5kbGVyLmFkZFdpZGdldCh3aWRnZXQsIHJhbmspO1xuICAgICAgICB0aGlzLl9vbkxheW91dE1vZGlmaWVkKCk7XG4gICAgICAgIGlmICh0aGlzLl90b3BIYW5kbGVyLnBhbmVsLmlzSGlkZGVuKSB7XG4gICAgICAgICAgICB0aGlzLl90b3BIYW5kbGVyLnBhbmVsLnNob3coKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgYSB3aWRnZXQgdG8gdGhlIHRpdGxlIGNvbnRlbnQgYXJlYS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBXaWRnZXRzIG11c3QgaGF2ZSBhIHVuaXF1ZSBgaWRgIHByb3BlcnR5LCB3aGljaCB3aWxsIGJlIHVzZWQgYXMgdGhlIERPTSBpZC5cbiAgICAgKi9cbiAgICBfYWRkVG9NZW51QXJlYSh3aWRnZXQsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoIXdpZGdldC5pZCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignV2lkZ2V0cyBhZGRlZCB0byBhcHAgc2hlbGwgbXVzdCBoYXZlIHVuaXF1ZSBpZCBwcm9wZXJ0eS4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgY29uc3QgcmFuayA9IChfYSA9IG9wdGlvbnMucmFuaykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogREVGQVVMVF9SQU5LO1xuICAgICAgICB0aGlzLl9tZW51SGFuZGxlci5hZGRXaWRnZXQod2lkZ2V0LCByYW5rKTtcbiAgICAgICAgdGhpcy5fb25MYXlvdXRNb2RpZmllZCgpO1xuICAgICAgICBpZiAodGhpcy5fbWVudUhhbmRsZXIucGFuZWwuaXNIaWRkZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX21lbnVIYW5kbGVyLnBhbmVsLnNob3coKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgYSB3aWRnZXQgdG8gdGhlIGhlYWRlciBjb250ZW50IGFyZWEuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogV2lkZ2V0cyBtdXN0IGhhdmUgYSB1bmlxdWUgYGlkYCBwcm9wZXJ0eSwgd2hpY2ggd2lsbCBiZSB1c2VkIGFzIHRoZSBET00gaWQuXG4gICAgICovXG4gICAgX2FkZFRvSGVhZGVyQXJlYSh3aWRnZXQsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCF3aWRnZXQuaWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1dpZGdldHMgYWRkZWQgdG8gYXBwIHNoZWxsIG11c3QgaGF2ZSB1bmlxdWUgaWQgcHJvcGVydHkuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGVtcG9yYXJ5OiB3aWRnZXRzIGFyZSBhZGRlZCB0byB0aGUgcGFuZWwgaW4gb3JkZXIgb2YgaW5zZXJ0aW9uLlxuICAgICAgICB0aGlzLl9oZWFkZXJQYW5lbC5hZGRXaWRnZXQod2lkZ2V0KTtcbiAgICAgICAgdGhpcy5fb25MYXlvdXRNb2RpZmllZCgpO1xuICAgICAgICBpZiAodGhpcy5faGVhZGVyUGFuZWwuaXNIaWRkZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2hlYWRlclBhbmVsLnNob3coKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgYSB3aWRnZXQgdG8gdGhlIGJvdHRvbSBjb250ZW50IGFyZWEuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogV2lkZ2V0cyBtdXN0IGhhdmUgYSB1bmlxdWUgYGlkYCBwcm9wZXJ0eSwgd2hpY2ggd2lsbCBiZSB1c2VkIGFzIHRoZSBET00gaWQuXG4gICAgICovXG4gICAgX2FkZFRvQm90dG9tQXJlYSh3aWRnZXQsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCF3aWRnZXQuaWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1dpZGdldHMgYWRkZWQgdG8gYXBwIHNoZWxsIG11c3QgaGF2ZSB1bmlxdWUgaWQgcHJvcGVydHkuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGVtcG9yYXJ5OiB3aWRnZXRzIGFyZSBhZGRlZCB0byB0aGUgcGFuZWwgaW4gb3JkZXIgb2YgaW5zZXJ0aW9uLlxuICAgICAgICB0aGlzLl9ib3R0b21QYW5lbC5hZGRXaWRnZXQod2lkZ2V0KTtcbiAgICAgICAgdGhpcy5fb25MYXlvdXRNb2RpZmllZCgpO1xuICAgICAgICBpZiAodGhpcy5fYm90dG9tUGFuZWwuaXNIaWRkZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2JvdHRvbVBhbmVsLnNob3coKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfYWRkVG9Eb3duQXJlYSh3aWRnZXQsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCF3aWRnZXQuaWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1dpZGdldHMgYWRkZWQgdG8gYXBwIHNoZWxsIG11c3QgaGF2ZSB1bmlxdWUgaWQgcHJvcGVydHkuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIGNvbnN0IHsgdGl0bGUgfSA9IHdpZGdldDtcbiAgICAgICAgLy8gQWRkIHdpZGdldCBJRCB0byB0YWIgc28gdGhhdCB3ZSBjYW4gZ2V0IGEgaGFuZGxlIG9uIHRoZSB0YWIncyB3aWRnZXRcbiAgICAgICAgLy8gKGZvciBjb250ZXh0IG1lbnUgc3VwcG9ydClcbiAgICAgICAgdGl0bGUuZGF0YXNldCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGl0bGUuZGF0YXNldCksIHsgaWQ6IHdpZGdldC5pZCB9KTtcbiAgICAgICAgaWYgKHRpdGxlLmljb24gaW5zdGFuY2VvZiBMYWJJY29uKSB7XG4gICAgICAgICAgICAvLyBiaW5kIGFuIGFwcHJvcHJpYXRlIHN0eWxlIHRvIHRoZSBpY29uXG4gICAgICAgICAgICB0aXRsZS5pY29uID0gdGl0bGUuaWNvbi5iaW5kcHJvcHMoe1xuICAgICAgICAgICAgICAgIHN0eWxlc2hlZXQ6ICdtYWluQXJlYVRhYidcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB0aXRsZS5pY29uID09PSAnc3RyaW5nJyB8fCAhdGl0bGUuaWNvbikge1xuICAgICAgICAgICAgLy8gYWRkIHNvbWUgY2xhc3NlcyB0byBoZWxwIHdpdGggZGlzcGxheWluZyBjc3MgYmFja2dyb3VuZCBpbWdzXG4gICAgICAgICAgICB0aXRsZS5pY29uQ2xhc3MgPSBjbGFzc2VzKHRpdGxlLmljb25DbGFzcywgJ2pwLUljb24nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kb3duUGFuZWwuYWRkV2lkZ2V0KHdpZGdldCk7XG4gICAgICAgIHRoaXMuX29uTGF5b3V0TW9kaWZpZWQoKTtcbiAgICAgICAgaWYgKHRoaXMuX2Rvd25QYW5lbC5pc0hpZGRlbikge1xuICAgICAgICAgICAgdGhpcy5fZG93blBhbmVsLnNob3coKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKlxuICAgICAqIFJldHVybiB0aGUgdGFiIGJhciBhZGphY2VudCB0byB0aGUgY3VycmVudCBUYWJCYXIgb3IgYG51bGxgLlxuICAgICAqL1xuICAgIF9hZGphY2VudEJhcihkaXJlY3Rpb24pIHtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHRoaXMuX2N1cnJlbnRUYWJCYXIoKTtcbiAgICAgICAgaWYgKCFjdXJyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBiYXJzID0gdG9BcnJheSh0aGlzLl9kb2NrUGFuZWwudGFiQmFycygpKTtcbiAgICAgICAgY29uc3QgbGVuID0gYmFycy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gYmFycy5pbmRleE9mKGN1cnJlbnQpO1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAncHJldmlvdXMnKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXggPiAwID8gYmFyc1tpbmRleCAtIDFdIDogaW5kZXggPT09IDAgPyBiYXJzW2xlbiAtIDFdIDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBPdGhlcndpc2UsIGRpcmVjdGlvbiBpcyAnbmV4dCcuXG4gICAgICAgIHJldHVybiBpbmRleCA8IGxlbiAtIDFcbiAgICAgICAgICAgID8gYmFyc1tpbmRleCArIDFdXG4gICAgICAgICAgICA6IGluZGV4ID09PSBsZW4gLSAxXG4gICAgICAgICAgICAgICAgPyBiYXJzWzBdXG4gICAgICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cbiAgICAvKlxuICAgICAqIFJldHVybiB0aGUgVGFiQmFyIHRoYXQgaGFzIHRoZSBjdXJyZW50bHkgYWN0aXZlIFdpZGdldCBvciBudWxsLlxuICAgICAqL1xuICAgIF9jdXJyZW50VGFiQmFyKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5fdHJhY2tlci5jdXJyZW50V2lkZ2V0O1xuICAgICAgICBpZiAoIWN1cnJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRpdGxlID0gY3VycmVudC50aXRsZTtcbiAgICAgICAgY29uc3QgYmFycyA9IHRoaXMuX2RvY2tQYW5lbC50YWJCYXJzKCk7XG4gICAgICAgIHJldHVybiBmaW5kKGJhcnMsIGJhciA9PiBiYXIudGl0bGVzLmluZGV4T2YodGl0bGUpID4gLTEpIHx8IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUgZG9jayBhcmVhIGFjdGl2ZSB3aWRnZXQuXG4gICAgICovXG4gICAgX29uQWN0aXZlQ2hhbmdlZChzZW5kZXIsIGFyZ3MpIHtcbiAgICAgICAgaWYgKGFyZ3MubmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGFyZ3MubmV3VmFsdWUudGl0bGUuY2xhc3NOYW1lICs9IGAgJHtBQ1RJVkVfQ0xBU1N9YDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJncy5vbGRWYWx1ZSkge1xuICAgICAgICAgICAgYXJncy5vbGRWYWx1ZS50aXRsZS5jbGFzc05hbWUgPSBhcmdzLm9sZFZhbHVlLnRpdGxlLmNsYXNzTmFtZS5yZXBsYWNlKEFDVElWRV9DTEFTUywgJycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2FjdGl2ZUNoYW5nZWQuZW1pdChhcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBkb2NrIGFyZWEgY3VycmVudCB3aWRnZXQuXG4gICAgICovXG4gICAgX29uQ3VycmVudENoYW5nZWQoc2VuZGVyLCBhcmdzKSB7XG4gICAgICAgIGlmIChhcmdzLm5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBhcmdzLm5ld1ZhbHVlLnRpdGxlLmNsYXNzTmFtZSArPSBgICR7Q1VSUkVOVF9DTEFTU31gO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcmdzLm9sZFZhbHVlKSB7XG4gICAgICAgICAgICBhcmdzLm9sZFZhbHVlLnRpdGxlLmNsYXNzTmFtZSA9IGFyZ3Mub2xkVmFsdWUudGl0bGUuY2xhc3NOYW1lLnJlcGxhY2UoQ1VSUkVOVF9DTEFTUywgJycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1cnJlbnRDaGFuZ2VkLmVtaXQoYXJncyk7XG4gICAgICAgIHRoaXMuX29uTGF5b3V0TW9kaWZpZWQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIG9uIHRoZSBkb3duIHBhbmVsIHdpZGdldHNcbiAgICAgKi9cbiAgICBfb25UYWJQYW5lbENoYW5nZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9kb3duUGFuZWwuc3RhY2tlZFBhbmVsLndpZGdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9kb3duUGFuZWwuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29uTGF5b3V0TW9kaWZpZWQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBsYXlvdXQuXG4gICAgICovXG4gICAgX29uTGF5b3V0TW9kaWZpZWQoKSB7XG4gICAgICAgIHZvaWQgdGhpcy5fbGF5b3V0RGVib3VuY2VyLmludm9rZSgpO1xuICAgIH1cbn1cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogQSBsZXNzLXRoYW4gY29tcGFyaXNvbiBmdW5jdGlvbiBmb3Igc2lkZSBiYXIgcmFuayBpdGVtcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpdGVtQ21wKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgICAgcmV0dXJuIGZpcnN0LnJhbmsgLSBzZWNvbmQucmFuaztcbiAgICB9XG4gICAgUHJpdmF0ZS5pdGVtQ21wID0gaXRlbUNtcDtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHdpZGdldHMgdGhhdCBoYXZlIGJlZW4gZGlzcG9zZWQgZnJvbSBhbiBhcmVhIGNvbmZpZywgbXV0YXRlcyBhcmVhLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZUFyZWFDb25maWcocGFyZW50LCBhcmVhKSB7XG4gICAgICAgIGlmICghYXJlYSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcmVhLnR5cGUgPT09ICd0YWItYXJlYScpIHtcbiAgICAgICAgICAgIGFyZWEud2lkZ2V0cyA9IGFyZWEud2lkZ2V0cy5maWx0ZXIod2lkZ2V0ID0+ICF3aWRnZXQuaXNEaXNwb3NlZCAmJiB3aWRnZXQucGFyZW50ID09PSBwYXJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGFyZWEuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICBub3JtYWxpemVBcmVhQ29uZmlnKHBhcmVudCwgY2hpbGQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgUHJpdmF0ZS5ub3JtYWxpemVBcmVhQ29uZmlnID0gbm9ybWFsaXplQXJlYUNvbmZpZztcbiAgICAvKipcbiAgICAgKiBBIGNsYXNzIHdoaWNoIG1hbmFnZXMgYSBwYW5lbCBhbmQgc29ydHMgaXRzIHdpZGdldHMgYnkgcmFuay5cbiAgICAgKi9cbiAgICBjbGFzcyBQYW5lbEhhbmRsZXIge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSBtZXNzYWdlIGhvb2sgZm9yIGNoaWxkIGFkZC9yZW1vdmUgbWVzc2FnZXMgb24gdGhlIG1haW4gYXJlYSBkb2NrIHBhbmVsLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLl9wYW5lbENoaWxkSG9vayA9IChoYW5kbGVyLCBtc2cpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG1zZy50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NoaWxkLWFkZGVkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSBtc2cuY2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgYWxyZWFkeSBrbm93IGFib3V0IHRoaXMgd2lkZ2V0LCB3ZSdyZSBkb25lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmZpbmQodiA9PiB2LndpZGdldCA9PT0gd2lkZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBhZGQgdG8gdGhlIGVuZCBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFuayA9IHRoaXMuX2l0ZW1zW3RoaXMuX2l0ZW1zLmxlbmd0aCAtIDFdLnJhbms7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXRlbXMucHVzaCh7IHdpZGdldCwgcmFuayB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjaGlsZC1yZW1vdmVkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSBtc2cuY2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXlFeHQucmVtb3ZlRmlyc3RXaGVyZSh0aGlzLl9pdGVtcywgdiA9PiB2LndpZGdldCA9PT0gd2lkZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICB0aGlzLl9wYW5lbCA9IG5ldyBQYW5lbCgpO1xuICAgICAgICAgICAgTWVzc2FnZUxvb3AuaW5zdGFsbE1lc3NhZ2VIb29rKHRoaXMuX3BhbmVsLCB0aGlzLl9wYW5lbENoaWxkSG9vayk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgcGFuZWwgbWFuYWdlZCBieSB0aGUgaGFuZGxlci5cbiAgICAgICAgICovXG4gICAgICAgIGdldCBwYW5lbCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYW5lbDtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIGEgd2lkZ2V0IHRvIHRoZSBwYW5lbC5cbiAgICAgICAgICpcbiAgICAgICAgICogSWYgdGhlIHdpZGdldCBpcyBhbHJlYWR5IGFkZGVkLCBpdCB3aWxsIGJlIG1vdmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgYWRkV2lkZ2V0KHdpZGdldCwgcmFuaykge1xuICAgICAgICAgICAgd2lkZ2V0LnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0geyB3aWRnZXQsIHJhbmsgfTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gQXJyYXlFeHQudXBwZXJCb3VuZCh0aGlzLl9pdGVtcywgaXRlbSwgUHJpdmF0ZS5pdGVtQ21wKTtcbiAgICAgICAgICAgIEFycmF5RXh0Lmluc2VydCh0aGlzLl9pdGVtcywgaW5kZXgsIGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5fcGFuZWwuaW5zZXJ0V2lkZ2V0KGluZGV4LCB3aWRnZXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFByaXZhdGUuUGFuZWxIYW5kbGVyID0gUGFuZWxIYW5kbGVyO1xuICAgIC8qKlxuICAgICAqIEEgY2xhc3Mgd2hpY2ggbWFuYWdlcyBhIHNpZGUgYmFyIGFuZCByZWxhdGVkIHN0YWNrZWQgcGFuZWwuXG4gICAgICovXG4gICAgY2xhc3MgU2lkZUJhckhhbmRsZXIge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29uc3RydWN0IGEgbmV3IHNpZGUgYmFyIGhhbmRsZXIuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICB0aGlzLl9zaWRlQmFyID0gbmV3IFRhYkJhcih7XG4gICAgICAgICAgICAgICAgaW5zZXJ0QmVoYXZpb3I6ICdub25lJyxcbiAgICAgICAgICAgICAgICByZW1vdmVCZWhhdmlvcjogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGFsbG93RGVzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgb3JpZW50YXRpb246ICd2ZXJ0aWNhbCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fc3RhY2tlZFBhbmVsID0gbmV3IFN0YWNrZWRQYW5lbCgpO1xuICAgICAgICAgICAgdGhpcy5fc2lkZUJhci5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLl9zdGFja2VkUGFuZWwuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy5fbGFzdEN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fc2lkZUJhci5jdXJyZW50Q2hhbmdlZC5jb25uZWN0KHRoaXMuX29uQ3VycmVudENoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fc2lkZUJhci50YWJBY3RpdmF0ZVJlcXVlc3RlZC5jb25uZWN0KHRoaXMuX29uVGFiQWN0aXZhdGVSZXF1ZXN0ZWQsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fc3RhY2tlZFBhbmVsLndpZGdldFJlbW92ZWQuY29ubmVjdCh0aGlzLl9vbldpZGdldFJlbW92ZWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIHRhYiBiYXIgbWFuYWdlZCBieSB0aGUgaGFuZGxlci5cbiAgICAgICAgICovXG4gICAgICAgIGdldCBzaWRlQmFyKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpZGVCYXI7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgc3RhY2tlZCBwYW5lbCBtYW5hZ2VkIGJ5IHRoZSBoYW5kbGVyXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgc3RhY2tlZFBhbmVsKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YWNrZWRQYW5lbDtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogRXhwYW5kIHRoZSBzaWRlYmFyLlxuICAgICAgICAgKlxuICAgICAgICAgKiAjIyMjIE5vdGVzXG4gICAgICAgICAqIFRoaXMgd2lsbCBvcGVuIHRoZSBtb3N0IHJlY2VudGx5IHVzZWQgdGFiLCBvciB0aGUgZmlyc3QgdGFiXG4gICAgICAgICAqIGlmIHRoZXJlIGlzIG5vIG1vc3QgcmVjZW50bHkgdXNlZC5cbiAgICAgICAgICovXG4gICAgICAgIGV4cGFuZCgpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzID0gdGhpcy5fbGFzdEN1cnJlbnQgfHwgKHRoaXMuX2l0ZW1zLmxlbmd0aCA+IDAgJiYgdGhpcy5faXRlbXNbMF0ud2lkZ2V0KTtcbiAgICAgICAgICAgIGlmIChwcmV2aW91cykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZhdGUocHJldmlvdXMuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBY3RpdmF0ZSBhIHdpZGdldCByZXNpZGluZyBpbiB0aGUgc2lkZSBiYXIgYnkgSUQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBpZCAtIFRoZSB3aWRnZXQncyB1bmlxdWUgSUQuXG4gICAgICAgICAqL1xuICAgICAgICBhY3RpdmF0ZShpZCkge1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdGhpcy5fZmluZFdpZGdldEJ5SUQoaWQpO1xuICAgICAgICAgICAgaWYgKHdpZGdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NpZGVCYXIuY3VycmVudFRpdGxlID0gd2lkZ2V0LnRpdGxlO1xuICAgICAgICAgICAgICAgIHdpZGdldC5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUZXN0IHdoZXRoZXIgdGhlIHNpZGViYXIgaGFzIHRoZSBnaXZlbiB3aWRnZXQgYnkgaWQuXG4gICAgICAgICAqL1xuICAgICAgICBoYXMoaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9maW5kV2lkZ2V0QnlJRChpZCkgIT09IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbGxhcHNlIHRoZSBzaWRlYmFyIHNvIG5vIGl0ZW1zIGFyZSBleHBhbmRlZC5cbiAgICAgICAgICovXG4gICAgICAgIGNvbGxhcHNlKCkge1xuICAgICAgICAgICAgdGhpcy5fc2lkZUJhci5jdXJyZW50VGl0bGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgYSB3aWRnZXQgYW5kIGl0cyB0aXRsZSB0byB0aGUgc3RhY2tlZCBwYW5lbCBhbmQgc2lkZSBiYXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIHRoZSB3aWRnZXQgaXMgYWxyZWFkeSBhZGRlZCwgaXQgd2lsbCBiZSBtb3ZlZC5cbiAgICAgICAgICovXG4gICAgICAgIGFkZFdpZGdldCh3aWRnZXQsIHJhbmspIHtcbiAgICAgICAgICAgIHdpZGdldC5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgd2lkZ2V0LmhpZGUoKTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB7IHdpZGdldCwgcmFuayB9O1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9maW5kSW5zZXJ0SW5kZXgoaXRlbSk7XG4gICAgICAgICAgICBBcnJheUV4dC5pbnNlcnQodGhpcy5faXRlbXMsIGluZGV4LCBpdGVtKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YWNrZWRQYW5lbC5pbnNlcnRXaWRnZXQoaW5kZXgsIHdpZGdldCk7XG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMuX3NpZGVCYXIuaW5zZXJ0VGFiKGluZGV4LCB3aWRnZXQudGl0bGUpO1xuICAgICAgICAgICAgLy8gU3RvcmUgdGhlIHBhcmVudCBpZCBpbiB0aGUgdGl0bGUgZGF0YXNldFxuICAgICAgICAgICAgLy8gaW4gb3JkZXIgdG8gZGlzcGF0Y2ggY2xpY2sgZXZlbnRzIHRvIHRoZSByaWdodCB3aWRnZXQuXG4gICAgICAgICAgICB0aXRsZS5kYXRhc2V0ID0geyBpZDogd2lkZ2V0LmlkIH07XG4gICAgICAgICAgICBpZiAodGl0bGUuaWNvbiBpbnN0YW5jZW9mIExhYkljb24pIHtcbiAgICAgICAgICAgICAgICAvLyBiaW5kIGFuIGFwcHJvcHJpYXRlIHN0eWxlIHRvIHRoZSBpY29uXG4gICAgICAgICAgICAgICAgdGl0bGUuaWNvbiA9IHRpdGxlLmljb24uYmluZHByb3BzKHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzaGVldDogJ3NpZGVCYXInXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdGl0bGUuaWNvbiA9PT0gJ3N0cmluZycgfHwgIXRpdGxlLmljb24pIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgc29tZSBjbGFzc2VzIHRvIGhlbHAgd2l0aCBkaXNwbGF5aW5nIGNzcyBiYWNrZ3JvdW5kIGltZ3NcbiAgICAgICAgICAgICAgICB0aXRsZS5pY29uQ2xhc3MgPSBjbGFzc2VzKHRpdGxlLmljb25DbGFzcywgJ2pwLUljb24nLCAnanAtSWNvbi0yMCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFZpc2liaWxpdHkoKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogRGVoeWRyYXRlIHRoZSBzaWRlIGJhciBkYXRhLlxuICAgICAgICAgKi9cbiAgICAgICAgZGVoeWRyYXRlKCkge1xuICAgICAgICAgICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5fc2lkZUJhci5jdXJyZW50VGl0bGUgPT09IG51bGw7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXRzID0gdG9BcnJheSh0aGlzLl9zdGFja2VkUGFuZWwud2lkZ2V0cyk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50V2lkZ2V0ID0gd2lkZ2V0c1t0aGlzLl9zaWRlQmFyLmN1cnJlbnRJbmRleF07XG4gICAgICAgICAgICByZXR1cm4geyBjb2xsYXBzZWQsIGN1cnJlbnRXaWRnZXQsIHdpZGdldHMgfTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmVoeWRyYXRlIHRoZSBzaWRlIGJhci5cbiAgICAgICAgICovXG4gICAgICAgIHJlaHlkcmF0ZShkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5jdXJyZW50V2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZShkYXRhLmN1cnJlbnRXaWRnZXQuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuY29sbGFwc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaW5kIHRoZSBpbnNlcnRpb24gaW5kZXggZm9yIGEgcmFuayBpdGVtLlxuICAgICAgICAgKi9cbiAgICAgICAgX2ZpbmRJbnNlcnRJbmRleChpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXlFeHQudXBwZXJCb3VuZCh0aGlzLl9pdGVtcywgaXRlbSwgUHJpdmF0ZS5pdGVtQ21wKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogRmluZCB0aGUgaW5kZXggb2YgdGhlIGl0ZW0gd2l0aCB0aGUgZ2l2ZW4gd2lkZ2V0LCBvciBgLTFgLlxuICAgICAgICAgKi9cbiAgICAgICAgX2ZpbmRXaWRnZXRJbmRleCh3aWRnZXQpIHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheUV4dC5maW5kRmlyc3RJbmRleCh0aGlzLl9pdGVtcywgaSA9PiBpLndpZGdldCA9PT0gd2lkZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogRmluZCB0aGUgd2lkZ2V0IHdoaWNoIG93bnMgdGhlIGdpdmVuIHRpdGxlLCBvciBgbnVsbGAuXG4gICAgICAgICAqL1xuICAgICAgICBfZmluZFdpZGdldEJ5VGl0bGUodGl0bGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBmaW5kKHRoaXMuX2l0ZW1zLCB2YWx1ZSA9PiB2YWx1ZS53aWRnZXQudGl0bGUgPT09IHRpdGxlKTtcbiAgICAgICAgICAgIHJldHVybiBpdGVtID8gaXRlbS53aWRnZXQgOiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaW5kIHRoZSB3aWRnZXQgd2l0aCB0aGUgZ2l2ZW4gaWQsIG9yIGBudWxsYC5cbiAgICAgICAgICovXG4gICAgICAgIF9maW5kV2lkZ2V0QnlJRChpZCkge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGZpbmQodGhpcy5faXRlbXMsIHZhbHVlID0+IHZhbHVlLndpZGdldC5pZCA9PT0gaWQpO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0gPyBpdGVtLndpZGdldCA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZnJlc2ggdGhlIHZpc2liaWxpdHkgb2YgdGhlIHNpZGUgYmFyIGFuZCBzdGFja2VkIHBhbmVsLlxuICAgICAgICAgKi9cbiAgICAgICAgX3JlZnJlc2hWaXNpYmlsaXR5KCkge1xuICAgICAgICAgICAgdGhpcy5fc2lkZUJhci5zZXRIaWRkZW4odGhpcy5fc2lkZUJhci50aXRsZXMubGVuZ3RoID09PSAwKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YWNrZWRQYW5lbC5zZXRIaWRkZW4odGhpcy5fc2lkZUJhci5jdXJyZW50VGl0bGUgPT09IG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgdGhlIGBjdXJyZW50Q2hhbmdlZGAgc2lnbmFsIGZyb20gdGhlIHNpZGViYXIuXG4gICAgICAgICAqL1xuICAgICAgICBfb25DdXJyZW50Q2hhbmdlZChzZW5kZXIsIGFyZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFdpZGdldCA9IGFyZ3MucHJldmlvdXNUaXRsZVxuICAgICAgICAgICAgICAgID8gdGhpcy5fZmluZFdpZGdldEJ5VGl0bGUoYXJncy5wcmV2aW91c1RpdGxlKVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IG5ld1dpZGdldCA9IGFyZ3MuY3VycmVudFRpdGxlXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9maW5kV2lkZ2V0QnlUaXRsZShhcmdzLmN1cnJlbnRUaXRsZSlcbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICBpZiAob2xkV2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgb2xkV2lkZ2V0LmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXdXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICBuZXdXaWRnZXQuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbGFzdEN1cnJlbnQgPSBuZXdXaWRnZXQgfHwgb2xkV2lkZ2V0O1xuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFZpc2liaWxpdHkoKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIGEgYHRhYkFjdGl2YXRlUmVxdWVzdGAgc2lnbmFsIGZyb20gdGhlIHNpZGViYXIuXG4gICAgICAgICAqL1xuICAgICAgICBfb25UYWJBY3RpdmF0ZVJlcXVlc3RlZChzZW5kZXIsIGFyZ3MpIHtcbiAgICAgICAgICAgIGFyZ3MudGl0bGUub3duZXIuYWN0aXZhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICAvKlxuICAgICAgICAgKiBIYW5kbGUgdGhlIGB3aWRnZXRSZW1vdmVkYCBzaWduYWwgZnJvbSB0aGUgc3RhY2tlZCBwYW5lbC5cbiAgICAgICAgICovXG4gICAgICAgIF9vbldpZGdldFJlbW92ZWQoc2VuZGVyLCB3aWRnZXQpIHtcbiAgICAgICAgICAgIGlmICh3aWRnZXQgPT09IHRoaXMuX2xhc3RDdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdEN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQXJyYXlFeHQucmVtb3ZlQXQodGhpcy5faXRlbXMsIHRoaXMuX2ZpbmRXaWRnZXRJbmRleCh3aWRnZXQpKTtcbiAgICAgICAgICAgIHRoaXMuX3NpZGVCYXIucmVtb3ZlVGFiKHdpZGdldC50aXRsZSk7XG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoVmlzaWJpbGl0eSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFByaXZhdGUuU2lkZUJhckhhbmRsZXIgPSBTaWRlQmFySGFuZGxlcjtcbiAgICBjbGFzcyBTa2lwTGlua1dpZGdldCBleHRlbmRzIFdpZGdldCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgc2tpcExpbmsgd2lkZ2V0LlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3Ioc2hlbGwpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1za2lwbGluaycpO1xuICAgICAgICAgICAgdGhpcy5pZCA9ICdqcC1za2lwbGluayc7XG4gICAgICAgICAgICB0aGlzLl9zaGVsbCA9IHNoZWxsO1xuICAgICAgICAgICAgdGhpcy5fY3JlYXRlU2tpcExpbmsoJ1NraXAgdG8gbGVmdCBzaWRlIGJhcicpO1xuICAgICAgICB9XG4gICAgICAgIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZvY3VzTGVmdFNpZGVCYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZSBgYWZ0ZXItYXR0YWNoYCBtZXNzYWdlcyBmb3IgdGhlIHdpZGdldC5cbiAgICAgICAgICovXG4gICAgICAgIG9uQWZ0ZXJBdHRhY2gobXNnKSB7XG4gICAgICAgICAgICBzdXBlci5vbkFmdGVyQXR0YWNoKG1zZyk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQSBtZXNzYWdlIGhhbmRsZXIgaW52b2tlZCBvbiBhIGAnYmVmb3JlLWRldGFjaCdgXG4gICAgICAgICAqIG1lc3NhZ2VcbiAgICAgICAgICovXG4gICAgICAgIG9uQmVmb3JlRGV0YWNoKG1zZykge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcyk7XG4gICAgICAgICAgICBzdXBlci5vbkJlZm9yZURldGFjaChtc2cpO1xuICAgICAgICB9XG4gICAgICAgIF9mb2N1c0xlZnRTaWRlQmFyKCkge1xuICAgICAgICAgICAgdGhpcy5fc2hlbGwuZXhwYW5kTGVmdCgpO1xuICAgICAgICB9XG4gICAgICAgIF9jcmVhdGVTa2lwTGluayhza2lwTGlua1RleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNraXBMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgc2tpcExpbmsuaHJlZiA9ICcjJztcbiAgICAgICAgICAgIHNraXBMaW5rLnRhYkluZGV4ID0gMTtcbiAgICAgICAgICAgIHNraXBMaW5rLnRleHQgPSBza2lwTGlua1RleHQ7XG4gICAgICAgICAgICBza2lwTGluay5jbGFzc05hbWUgPSAnc2tpcC1saW5rJztcbiAgICAgICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZChza2lwTGluayk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUHJpdmF0ZS5Ta2lwTGlua1dpZGdldCA9IFNraXBMaW5rV2lkZ2V0O1xuICAgIGNsYXNzIFRpdGxlSGFuZGxlciBleHRlbmRzIFdpZGdldCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGl0bGUgaGFuZGxlci5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKHNoZWxsKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZChpbnB1dEVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5fc2hlbGwgPSBzaGVsbDtcbiAgICAgICAgICAgIHRoaXMuaWQgPSAnanAtdGl0bGUtcGFuZWwtdGl0bGUnO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYGFmdGVyLWF0dGFjaGAgbWVzc2FnZXMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICAgICAqL1xuICAgICAgICBvbkFmdGVyQXR0YWNoKG1zZykge1xuICAgICAgICAgICAgc3VwZXIub25BZnRlckF0dGFjaChtc2cpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLmlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZSBgYmVmb3JlLWRldGFjaGAgbWVzc2FnZXMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICAgICAqL1xuICAgICAgICBvbkJlZm9yZURldGFjaChtc2cpIHtcbiAgICAgICAgICAgIHN1cGVyLm9uQmVmb3JlRGV0YWNoKG1zZyk7XG4gICAgICAgICAgICB0aGlzLmlucHV0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBoYW5kbGVFdmVudChldmVudCkge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAna2V5dXAnOlxuICAgICAgICAgICAgICAgICAgICB2b2lkIHRoaXMuX2V2dEtleVVwKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2xpY2snOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldnRDbGljayhldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2JsdXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIGBrZXl1cGAgZXZlbnRzIG9uIHRoZSBoYW5kbGVyLlxuICAgICAgICAgKi9cbiAgICAgICAgYXN5bmMgX2V2dEtleVVwKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSB0aGlzLl9zaGVsbC5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZE5hbWUgPSB3aWRnZXQudGl0bGUubGFiZWw7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXRFbGVtZW50ID0gdGhpcy5pbnB1dEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3TmFtZSA9IGlucHV0RWxlbWVudC52YWx1ZTtcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQuYmx1cigpO1xuICAgICAgICAgICAgICAgIGlmIChuZXdOYW1lICE9PSBvbGROYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpZGdldC50aXRsZS5sYWJlbCA9IG5ld05hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQudmFsdWUgPSBvbGROYW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIGBjbGlja2AgZXZlbnRzIG9uIHRoZSBoYW5kbGVyLlxuICAgICAgICAgKi9cbiAgICAgICAgX2V2dENsaWNrKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyBvbmx5IGhhbmRsZSBwcmltYXJ5IGJ1dHRvbiBjbGlja3NcbiAgICAgICAgICAgIGlmIChldmVudC5idXR0b24gIT09IDAgfHwgdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSB0aGlzLmlucHV0RWxlbWVudDtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdEVuZCA9IGlucHV0RWxlbWVudC52YWx1ZS5pbmRleE9mKCcuJyk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0RW5kID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudC5zZWxlY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSgwLCBzZWxlY3RFbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaW5wdXQgZWxlbWVudCBjb250YWluaW5nIHRoZSBwYXJlbnQgd2lkZ2V0J3MgdGl0bGUuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgaW5wdXRFbGVtZW50KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5jaGlsZHJlblswXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBQcml2YXRlLlRpdGxlSGFuZGxlciA9IFRpdGxlSGFuZGxlcjtcbiAgICBjbGFzcyBSZXN0b3JhYmxlU3BsaXRQYW5lbCBleHRlbmRzIFNwbGl0UGFuZWwge1xuICAgICAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogRW1pdCAndXBkYXRlZCcgc2lnbmFsIG9uICd1cGRhdGUnIHJlcXVlc3RzLlxuICAgICAgICAgKi9cbiAgICAgICAgb25VcGRhdGVSZXF1ZXN0KG1zZykge1xuICAgICAgICAgICAgc3VwZXIub25VcGRhdGVSZXF1ZXN0KG1zZyk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZWQuZW1pdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFByaXZhdGUuUmVzdG9yYWJsZVNwbGl0UGFuZWwgPSBSZXN0b3JhYmxlU3BsaXRQYW5lbDtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2hlbGwuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBEaXNwb3NhYmxlRGVsZWdhdGUgfSBmcm9tICdAbHVtaW5vL2Rpc3Bvc2FibGUnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuLyogdHNsaW50OmRpc2FibGUgKi9cbi8qKlxuICogVGhlIGFwcGxpY2F0aW9uIHN0YXR1cyB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IElMYWJTdGF0dXMgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uOklMYWJTdGF0dXMnKTtcbi8qKlxuICogVGhlIGFwcGxpY2F0aW9uIHN0YXR1cyBzaWduYWxzIGFuZCBmbGFncyBjbGFzcy5cbiAqL1xuZXhwb3J0IGNsYXNzIExhYlN0YXR1cyB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3ICBzdGF0dXMgb2JqZWN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGFwcCkge1xuICAgICAgICB0aGlzLl9idXN5Q291bnQgPSAwO1xuICAgICAgICB0aGlzLl9kaXJ0eUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fYnVzeVNpZ25hbCA9IG5ldyBTaWduYWwoYXBwKTtcbiAgICAgICAgdGhpcy5fZGlydHlTaWduYWwgPSBuZXcgU2lnbmFsKGFwcCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzaWduYWwgZm9yIHdoZW4gYXBwbGljYXRpb24gY2hhbmdlcyBpdHMgYnVzeSBzdGF0dXMuXG4gICAgICovXG4gICAgZ2V0IGJ1c3lTaWduYWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9idXN5U2lnbmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc2lnbmFsIGZvciB3aGVuIGFwcGxpY2F0aW9uIGNoYW5nZXMgaXRzIGRpcnR5IHN0YXR1cy5cbiAgICAgKi9cbiAgICBnZXQgZGlydHlTaWduYWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXJ0eVNpZ25hbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgYXBwbGljYXRpb24gaXMgYnVzeS5cbiAgICAgKi9cbiAgICBnZXQgaXNCdXN5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYnVzeUNvdW50ID4gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgYXBwbGljYXRpb24gaXMgZGlydHkuXG4gICAgICovXG4gICAgZ2V0IGlzRGlydHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXJ0eUNvdW50ID4gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBhcHBsaWNhdGlvbiBzdGF0ZSB0byBkaXJ0eS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgZGlzcG9zYWJsZSB1c2VkIHRvIGNsZWFyIHRoZSBkaXJ0eSBzdGF0ZSBmb3IgdGhlIGNhbGxlci5cbiAgICAgKi9cbiAgICBzZXREaXJ0eSgpIHtcbiAgICAgICAgY29uc3Qgb2xkRGlydHkgPSB0aGlzLmlzRGlydHk7XG4gICAgICAgIHRoaXMuX2RpcnR5Q291bnQrKztcbiAgICAgICAgaWYgKHRoaXMuaXNEaXJ0eSAhPT0gb2xkRGlydHkpIHtcbiAgICAgICAgICAgIHRoaXMuX2RpcnR5U2lnbmFsLmVtaXQodGhpcy5pc0RpcnR5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IERpc3Bvc2FibGVEZWxlZ2F0ZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvbGREaXJ0eSA9IHRoaXMuaXNEaXJ0eTtcbiAgICAgICAgICAgIHRoaXMuX2RpcnR5Q291bnQgPSBNYXRoLm1heCgwLCB0aGlzLl9kaXJ0eUNvdW50IC0gMSk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0RpcnR5ICE9PSBvbGREaXJ0eSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnR5U2lnbmFsLmVtaXQodGhpcy5pc0RpcnR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgYXBwbGljYXRpb24gc3RhdGUgdG8gYnVzeS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgZGlzcG9zYWJsZSB1c2VkIHRvIGNsZWFyIHRoZSBidXN5IHN0YXRlIGZvciB0aGUgY2FsbGVyLlxuICAgICAqL1xuICAgIHNldEJ1c3koKSB7XG4gICAgICAgIGNvbnN0IG9sZEJ1c3kgPSB0aGlzLmlzQnVzeTtcbiAgICAgICAgdGhpcy5fYnVzeUNvdW50Kys7XG4gICAgICAgIGlmICh0aGlzLmlzQnVzeSAhPT0gb2xkQnVzeSkge1xuICAgICAgICAgICAgdGhpcy5fYnVzeVNpZ25hbC5lbWl0KHRoaXMuaXNCdXN5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IERpc3Bvc2FibGVEZWxlZ2F0ZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvbGRCdXN5ID0gdGhpcy5pc0J1c3k7XG4gICAgICAgICAgICB0aGlzLl9idXN5Q291bnQtLTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQnVzeSAhPT0gb2xkQnVzeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1c3lTaWduYWwuZW1pdCh0aGlzLmlzQnVzeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0YXR1cy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbi8qKlxuICogQSB0b2tlbiBmb3Igd2hpY2ggYSBwbHVnaW4gY2FuIHByb3ZpZGUgdG8gcmVzcG9uZCB0byBjb25uZWN0aW9uIGZhaWx1cmVzXG4gKiB0byB0aGUgYXBwbGljYXRpb24gc2VydmVyLlxuICovXG5leHBvcnQgY29uc3QgSUNvbm5lY3Rpb25Mb3N0ID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi9hcHB1dGlsczpJQ29ubmVjdGlvbkxvc3QnKTtcbi8qKlxuICogVGhlIFVSTCBSb3V0ZXIgdG9rZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBJUm91dGVyID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi9hcHBsaWNhdGlvbjpJUm91dGVyJyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b2tlbnMuanMubWFwIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbi8qKlxuICogVGhlIHRyZWUgcGF0aCB1cGRhdGVyIHRva2VuLlxuICovXG5leHBvcnQgY29uc3QgSVRyZWVQYXRoVXBkYXRlciA9IG5ldyBUb2tlbignQGp1cHl0ZXJsYWIvYXBwbGljYXRpb246SVRyZWVQYXRoVXBkYXRlcicpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJlZXBhdGh1cGRhdGVyLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=