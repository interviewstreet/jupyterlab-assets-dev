(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_services_lib_index_js"],{

/***/ "../../node_modules/process/browser.js":
/*!*********************************************!*\
  !*** ../../node_modules/process/browser.js ***!
  \*********************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "../../packages/services/lib/basemanager.js":
/*!**************************************************!*\
  !*** ../../packages/services/lib/basemanager.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseManager = void 0;
const signaling_1 = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
const serverconnection_1 = __webpack_require__(/*! ./serverconnection */ "../../packages/services/lib/serverconnection.js");
class BaseManager {
    constructor(options) {
        var _a;
        this._isDisposed = false;
        this._disposed = new signaling_1.Signal(this);
        this.serverSettings = (_a = options.serverSettings) !== null && _a !== void 0 ? _a : serverconnection_1.ServerConnection.makeSettings();
    }
    /**
     * A signal emitted when the delegate is disposed.
     */
    get disposed() {
        return this._disposed;
    }
    /**
     * Test whether the delegate has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the delegate and invoke the callback function.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._disposed.emit(undefined);
        signaling_1.Signal.clearData(this);
    }
}
exports.BaseManager = BaseManager;
//# sourceMappingURL=basemanager.js.map

/***/ }),

/***/ "../../packages/services/lib/builder/index.js":
/*!****************************************************!*\
  !*** ../../packages/services/lib/builder/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BuildManager = void 0;
const coreutils_1 = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
const serverconnection_1 = __webpack_require__(/*! ../serverconnection */ "../../packages/services/lib/serverconnection.js");
/**
 * The url for the lab build service.
 */
const BUILD_SETTINGS_URL = 'api/build';
/**
 * The build API service manager.
 */
class BuildManager {
    /**
     * Create a new setting manager.
     */
    constructor(options = {}) {
        var _a;
        this._url = '';
        this.serverSettings = (_a = options.serverSettings) !== null && _a !== void 0 ? _a : serverconnection_1.ServerConnection.makeSettings();
        const { baseUrl, appUrl } = this.serverSettings;
        this._url = coreutils_1.URLExt.join(baseUrl, appUrl, BUILD_SETTINGS_URL);
    }
    /**
     * Test whether the build service is available.
     */
    get isAvailable() {
        return coreutils_1.PageConfig.getOption('buildAvailable').toLowerCase() === 'true';
    }
    /**
     * Test whether to check build status automatically.
     */
    get shouldCheck() {
        return coreutils_1.PageConfig.getOption('buildCheck').toLowerCase() === 'true';
    }
    /**
     * Get whether the application should be built.
     */
    getStatus() {
        const { _url, serverSettings } = this;
        const promise = serverconnection_1.ServerConnection.makeRequest(_url, {}, serverSettings);
        return promise
            .then(response => {
            if (response.status !== 200) {
                throw new serverconnection_1.ServerConnection.ResponseError(response);
            }
            return response.json();
        })
            .then(data => {
            if (typeof data.status !== 'string') {
                throw new Error('Invalid data');
            }
            if (typeof data.message !== 'string') {
                throw new Error('Invalid data');
            }
            return data;
        });
    }
    /**
     * Build the application.
     */
    build() {
        const { _url, serverSettings } = this;
        const init = { method: 'POST' };
        const promise = serverconnection_1.ServerConnection.makeRequest(_url, init, serverSettings);
        return promise.then(response => {
            if (response.status === 400) {
                throw new serverconnection_1.ServerConnection.ResponseError(response, 'Build aborted');
            }
            if (response.status !== 200) {
                const message = `Build failed with ${response.status}.

        If you are experiencing the build failure after installing an extension (or trying to include previously installed extension after updating JupyterLab) please check the extension repository for new installation instructions as many extensions migrated to the prebuilt extensions system which no longer requires rebuilding JupyterLab (but uses a different installation procedure, typically involving a package manager such as 'pip' or 'conda').

        If you specifically intended to install a source extension, please run 'jupyter lab build' on the server for full output.`;
                throw new serverconnection_1.ServerConnection.ResponseError(response, message);
            }
        });
    }
    /**
     * Cancel an active build.
     */
    cancel() {
        const { _url, serverSettings } = this;
        const init = { method: 'DELETE' };
        const promise = serverconnection_1.ServerConnection.makeRequest(_url, init, serverSettings);
        return promise.then(response => {
            if (response.status !== 204) {
                throw new serverconnection_1.ServerConnection.ResponseError(response);
            }
        });
    }
}
exports.BuildManager = BuildManager;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/services/lib/config/index.js":
/*!***************************************************!*\
  !*** ../../packages/services/lib/config/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigWithDefaults = exports.ConfigSection = void 0;
const coreutils_1 = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
const __1 = __webpack_require__(/*! .. */ "../../packages/services/lib/index.js");
/**
 * The url for the config service.
 */
const SERVICE_CONFIG_URL = 'api/config';
/**
 * The namespace for ConfigSection statics.
 */
var ConfigSection;
(function (ConfigSection) {
    /**
     * Create a config section.
     *
     * @returns A Promise that is fulfilled with the config section is loaded.
     */
    function create(options) {
        const section = new DefaultConfigSection(options);
        return section.load().then(() => {
            return section;
        });
    }
    ConfigSection.create = create;
})(ConfigSection = exports.ConfigSection || (exports.ConfigSection = {}));
/**
 * Implementation of the Configurable data section.
 */
class DefaultConfigSection {
    /**
     * Construct a new config section.
     */
    constructor(options) {
        var _a;
        this._url = 'unknown';
        const settings = (this.serverSettings = (_a = options.serverSettings) !== null && _a !== void 0 ? _a : __1.ServerConnection.makeSettings());
        this._url = coreutils_1.URLExt.join(settings.baseUrl, SERVICE_CONFIG_URL, encodeURIComponent(options.name));
    }
    /**
     * Get the data for this section.
     */
    get data() {
        return this._data;
    }
    /**
     * Load the initial data for this section.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/config).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    async load() {
        const response = await __1.ServerConnection.makeRequest(this._url, {}, this.serverSettings);
        if (response.status !== 200) {
            const err = await __1.ServerConnection.ResponseError.create(response);
            throw err;
        }
        this._data = await response.json();
    }
    /**
     * Modify the stored config values.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/config).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     *
     * Updates the local data immediately, sends the change to the server,
     * and updates the local data with the response, and fulfils the promise
     * with that data.
     */
    async update(newdata) {
        this._data = Object.assign(Object.assign({}, this._data), newdata);
        const init = {
            method: 'PATCH',
            body: JSON.stringify(newdata)
        };
        const response = await __1.ServerConnection.makeRequest(this._url, init, this.serverSettings);
        if (response.status !== 200) {
            const err = await __1.ServerConnection.ResponseError.create(response);
            throw err;
        }
        this._data = await response.json();
        return this._data;
    }
}
/**
 * Configurable object with defaults.
 */
class ConfigWithDefaults {
    /**
     * Create a new config with defaults.
     */
    constructor(options) {
        var _a, _b;
        this._className = '';
        this._section = options.section;
        this._defaults = (_a = options.defaults) !== null && _a !== void 0 ? _a : {};
        this._className = (_b = options.className) !== null && _b !== void 0 ? _b : '';
    }
    /**
     * Get data from the config section or fall back to defaults.
     */
    get(key) {
        const data = this._classData();
        return key in data ? data[key] : this._defaults[key];
    }
    /**
     * Set a config value.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/config).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     *
     * Sends the update to the server, and changes our local copy of the data
     * immediately.
     */
    set(key, value) {
        const d = {};
        d[key] = value;
        if (this._className) {
            const d2 = {};
            d2[this._className] = d;
            return this._section.update(d2);
        }
        else {
            return this._section.update(d);
        }
    }
    /**
     * Get data from the Section with our classname, if available.
     *
     * #### Notes
     * If we have no classname, get all of the data in the Section
     */
    _classData() {
        const data = this._section.data;
        if (this._className && this._className in data) {
            return data[this._className];
        }
        return data;
    }
}
exports.ConfigWithDefaults = ConfigWithDefaults;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/services/lib/contents/index.js":
/*!*****************************************************!*\
  !*** ../../packages/services/lib/contents/index.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Drive = exports.ContentsManager = exports.Contents = void 0;
const coreutils_1 = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
const algorithm_1 = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
const signaling_1 = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
const __1 = __webpack_require__(/*! .. */ "../../packages/services/lib/index.js");
const validate = __importStar(__webpack_require__(/*! ./validate */ "../../packages/services/lib/contents/validate.js"));
/**
 * The url for the default drive service.
 */
const SERVICE_DRIVE_URL = 'api/contents';
/**
 * The url for the file access.
 */
const FILES_URL = 'files';
/**
 * A namespace for contents interfaces.
 */
var Contents;
(function (Contents) {
    /**
     * Validates an IModel, throwing an error if it does not pass.
     */
    function validateContentsModel(contents) {
        validate.validateContentsModel(contents);
    }
    Contents.validateContentsModel = validateContentsModel;
    /**
     * Validates an ICheckpointModel, throwing an error if it does not pass.
     */
    function validateCheckpointModel(checkpoint) {
        validate.validateCheckpointModel(checkpoint);
    }
    Contents.validateCheckpointModel = validateCheckpointModel;
})(Contents = exports.Contents || (exports.Contents = {}));
/**
 * A contents manager that passes file operations to the server.
 * Multiple servers implementing the `IDrive` interface can be
 * attached to the contents manager, so that the same session can
 * perform file operations on multiple backends.
 *
 * This includes checkpointing with the normal file operations.
 */
class ContentsManager {
    /**
     * Construct a new contents manager object.
     *
     * @param options - The options used to initialize the object.
     */
    constructor(options = {}) {
        var _a, _b;
        this._isDisposed = false;
        this._additionalDrives = new Map();
        this._fileChanged = new signaling_1.Signal(this);
        const serverSettings = (this.serverSettings = (_a = options.serverSettings) !== null && _a !== void 0 ? _a : __1.ServerConnection.makeSettings());
        this._defaultDrive = (_b = options.defaultDrive) !== null && _b !== void 0 ? _b : new Drive({ serverSettings });
        this._defaultDrive.fileChanged.connect(this._onFileChanged, this);
    }
    /**
     * A signal emitted when a file operation takes place.
     */
    get fileChanged() {
        return this._fileChanged;
    }
    /**
     * Test whether the manager has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the manager.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        signaling_1.Signal.clearData(this);
    }
    /**
     * Add an `IDrive` to the manager.
     */
    addDrive(drive) {
        this._additionalDrives.set(drive.name, drive);
        drive.fileChanged.connect(this._onFileChanged, this);
    }
    /**
     * Given a path, get a ModelDB.IFactory from the
     * relevant backend. Returns `undefined` if the backend
     * does not provide one.
     */
    getModelDBFactory(path) {
        var _a;
        const [drive] = this._driveForPath(path);
        return (_a = drive === null || drive === void 0 ? void 0 : drive.modelDBFactory) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Given a path of the form `drive:local/portion/of/it.txt`
     * get the local part of it.
     *
     * @param path: the path.
     *
     * @returns The local part of the path.
     */
    localPath(path) {
        const parts = path.split('/');
        const firstParts = parts[0].split(':');
        if (firstParts.length === 1 || !this._additionalDrives.has(firstParts[0])) {
            return coreutils_1.PathExt.removeSlash(path);
        }
        return coreutils_1.PathExt.join(firstParts.slice(1).join(':'), ...parts.slice(1));
    }
    /**
     * Normalize a global path. Reduces '..' and '.' parts, and removes
     * leading slashes from the local part of the path, while retaining
     * the drive name if it exists.
     *
     * @param path: the path.
     *
     * @returns The normalized path.
     */
    normalize(path) {
        const parts = path.split(':');
        if (parts.length === 1) {
            return coreutils_1.PathExt.normalize(path);
        }
        return `${parts[0]}:${coreutils_1.PathExt.normalize(parts.slice(1).join(':'))}`;
    }
    /**
     * Resolve a global path, starting from the root path. Behaves like
     * posix-path.resolve, with 3 differences:
     *  - will never prepend cwd
     *  - if root has a drive name, the result is prefixed with "<drive>:"
     *  - before adding drive name, leading slashes are removed
     *
     * @param path: the path.
     *
     * @returns The normalized path.
     */
    resolvePath(root, path) {
        const driveName = this.driveName(root);
        const localPath = this.localPath(root);
        const resolved = coreutils_1.PathExt.resolve('/', localPath, path);
        return driveName ? `${driveName}:${resolved}` : resolved;
    }
    /**
     * Given a path of the form `drive:local/portion/of/it.txt`
     * get the name of the drive. If the path is missing
     * a drive portion, returns an empty string.
     *
     * @param path: the path.
     *
     * @returns The drive name for the path, or the empty string.
     */
    driveName(path) {
        const parts = path.split('/');
        const firstParts = parts[0].split(':');
        if (firstParts.length === 1) {
            return '';
        }
        if (this._additionalDrives.has(firstParts[0])) {
            return firstParts[0];
        }
        return '';
    }
    /**
     * Get a file or directory.
     *
     * @param path: The path to the file.
     *
     * @param options: The options used to fetch the file.
     *
     * @returns A promise which resolves with the file content.
     */
    get(path, options) {
        const [drive, localPath] = this._driveForPath(path);
        return drive.get(localPath, options).then(contentsModel => {
            const listing = [];
            if (contentsModel.type === 'directory' && contentsModel.content) {
                algorithm_1.each(contentsModel.content, (item) => {
                    listing.push(Object.assign(Object.assign({}, item), { path: this._toGlobalPath(drive, item.path) }));
                });
                return Object.assign(Object.assign({}, contentsModel), { path: this._toGlobalPath(drive, localPath), content: listing });
            }
            else {
                return Object.assign(Object.assign({}, contentsModel), { path: this._toGlobalPath(drive, localPath) });
            }
        });
    }
    /**
     * Get an encoded download url given a file path.
     *
     * @param path - An absolute POSIX file path on the server.
     *
     * #### Notes
     * It is expected that the path contains no relative paths.
     *
     * The returned URL may include a query parameter.
     */
    getDownloadUrl(path) {
        const [drive, localPath] = this._driveForPath(path);
        return drive.getDownloadUrl(localPath);
    }
    /**
     * Create a new untitled file or directory in the specified directory path.
     *
     * @param options: The options used to create the file.
     *
     * @returns A promise which resolves with the created file content when the
     *    file is created.
     */
    newUntitled(options = {}) {
        if (options.path) {
            const globalPath = this.normalize(options.path);
            const [drive, localPath] = this._driveForPath(globalPath);
            return drive
                .newUntitled(Object.assign(Object.assign({}, options), { path: localPath }))
                .then(contentsModel => {
                return Object.assign(Object.assign({}, contentsModel), { path: coreutils_1.PathExt.join(globalPath, contentsModel.name) });
            });
        }
        else {
            return this._defaultDrive.newUntitled(options);
        }
    }
    /**
     * Delete a file.
     *
     * @param path - The path to the file.
     *
     * @returns A promise which resolves when the file is deleted.
     */
    delete(path) {
        const [drive, localPath] = this._driveForPath(path);
        return drive.delete(localPath);
    }
    /**
     * Rename a file or directory.
     *
     * @param path - The original file path.
     *
     * @param newPath - The new file path.
     *
     * @returns A promise which resolves with the new file contents model when
     *   the file is renamed.
     */
    rename(path, newPath) {
        const [drive1, path1] = this._driveForPath(path);
        const [drive2, path2] = this._driveForPath(newPath);
        if (drive1 !== drive2) {
            throw Error('ContentsManager: renaming files must occur within a Drive');
        }
        return drive1.rename(path1, path2).then(contentsModel => {
            return Object.assign(Object.assign({}, contentsModel), { path: this._toGlobalPath(drive1, path2) });
        });
    }
    /**
     * Save a file.
     *
     * @param path - The desired file path.
     *
     * @param options - Optional overrides to the model.
     *
     * @returns A promise which resolves with the file content model when the
     *   file is saved.
     *
     * #### Notes
     * Ensure that `model.content` is populated for the file.
     */
    save(path, options = {}) {
        const globalPath = this.normalize(path);
        const [drive, localPath] = this._driveForPath(path);
        return drive
            .save(localPath, Object.assign(Object.assign({}, options), { path: localPath }))
            .then(contentsModel => {
            return Object.assign(Object.assign({}, contentsModel), { path: globalPath });
        });
    }
    /**
     * Copy a file into a given directory.
     *
     * @param path - The original file path.
     *
     * @param toDir - The destination directory path.
     *
     * @returns A promise which resolves with the new contents model when the
     *  file is copied.
     *
     * #### Notes
     * The server will select the name of the copied file.
     */
    copy(fromFile, toDir) {
        const [drive1, path1] = this._driveForPath(fromFile);
        const [drive2, path2] = this._driveForPath(toDir);
        if (drive1 === drive2) {
            return drive1.copy(path1, path2).then(contentsModel => {
                return Object.assign(Object.assign({}, contentsModel), { path: this._toGlobalPath(drive1, contentsModel.path) });
            });
        }
        else {
            throw Error('Copying files between drives is not currently implemented');
        }
    }
    /**
     * Create a checkpoint for a file.
     *
     * @param path - The path of the file.
     *
     * @returns A promise which resolves with the new checkpoint model when the
     *   checkpoint is created.
     */
    createCheckpoint(path) {
        const [drive, localPath] = this._driveForPath(path);
        return drive.createCheckpoint(localPath);
    }
    /**
     * List available checkpoints for a file.
     *
     * @param path - The path of the file.
     *
     * @returns A promise which resolves with a list of checkpoint models for
     *    the file.
     */
    listCheckpoints(path) {
        const [drive, localPath] = this._driveForPath(path);
        return drive.listCheckpoints(localPath);
    }
    /**
     * Restore a file to a known checkpoint state.
     *
     * @param path - The path of the file.
     *
     * @param checkpointID - The id of the checkpoint to restore.
     *
     * @returns A promise which resolves when the checkpoint is restored.
     */
    restoreCheckpoint(path, checkpointID) {
        const [drive, localPath] = this._driveForPath(path);
        return drive.restoreCheckpoint(localPath, checkpointID);
    }
    /**
     * Delete a checkpoint for a file.
     *
     * @param path - The path of the file.
     *
     * @param checkpointID - The id of the checkpoint to delete.
     *
     * @returns A promise which resolves when the checkpoint is deleted.
     */
    deleteCheckpoint(path, checkpointID) {
        const [drive, localPath] = this._driveForPath(path);
        return drive.deleteCheckpoint(localPath, checkpointID);
    }
    /**
     * Given a drive and a local path, construct a fully qualified
     * path. The inverse of `_driveForPath`.
     *
     * @param drive: an `IDrive`.
     *
     * @param localPath: the local path on the drive.
     *
     * @returns the fully qualified path.
     */
    _toGlobalPath(drive, localPath) {
        if (drive === this._defaultDrive) {
            return coreutils_1.PathExt.removeSlash(localPath);
        }
        else {
            return `${drive.name}:${coreutils_1.PathExt.removeSlash(localPath)}`;
        }
    }
    /**
     * Given a path, get the `IDrive to which it refers,
     * where the path satisfies the pattern
     * `'driveName:path/to/file'`. If there is no `driveName`
     * prepended to the path, it returns the default drive.
     *
     * @param path: a path to a file.
     *
     * @returns A tuple containing an `IDrive` object for the path,
     * and a local path for that drive.
     */
    _driveForPath(path) {
        const driveName = this.driveName(path);
        const localPath = this.localPath(path);
        if (driveName) {
            return [this._additionalDrives.get(driveName), localPath];
        }
        else {
            return [this._defaultDrive, localPath];
        }
    }
    /**
     * Respond to fileChanged signals from the drives attached to
     * the manager. This prepends the drive name to the path if necessary,
     * and then forwards the signal.
     */
    _onFileChanged(sender, args) {
        var _a, _b;
        if (sender === this._defaultDrive) {
            this._fileChanged.emit(args);
        }
        else {
            let newValue = null;
            let oldValue = null;
            if ((_a = args.newValue) === null || _a === void 0 ? void 0 : _a.path) {
                newValue = Object.assign(Object.assign({}, args.newValue), { path: this._toGlobalPath(sender, args.newValue.path) });
            }
            if ((_b = args.oldValue) === null || _b === void 0 ? void 0 : _b.path) {
                oldValue = Object.assign(Object.assign({}, args.oldValue), { path: this._toGlobalPath(sender, args.oldValue.path) });
            }
            this._fileChanged.emit({
                type: args.type,
                newValue,
                oldValue
            });
        }
    }
}
exports.ContentsManager = ContentsManager;
/**
 * A default implementation for an `IDrive`, talking to the
 * server using the Jupyter REST API.
 */
class Drive {
    /**
     * Construct a new contents manager object.
     *
     * @param options - The options used to initialize the object.
     */
    constructor(options = {}) {
        var _a, _b, _c;
        this._isDisposed = false;
        this._fileChanged = new signaling_1.Signal(this);
        this.name = (_a = options.name) !== null && _a !== void 0 ? _a : 'Default';
        this._apiEndpoint = (_b = options.apiEndpoint) !== null && _b !== void 0 ? _b : SERVICE_DRIVE_URL;
        this.serverSettings = (_c = options.serverSettings) !== null && _c !== void 0 ? _c : __1.ServerConnection.makeSettings();
    }
    /**
     * A signal emitted when a file operation takes place.
     */
    get fileChanged() {
        return this._fileChanged;
    }
    /**
     * Test whether the manager has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the manager.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        signaling_1.Signal.clearData(this);
    }
    /**
     * Get a file or directory.
     *
     * @param localPath: The path to the file.
     *
     * @param options: The options used to fetch the file.
     *
     * @returns A promise which resolves with the file content.
     *
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents) and validates the response model.
     */
    async get(localPath, options) {
        let url = this._getUrl(localPath);
        if (options) {
            // The notebook type cannot take an format option.
            if (options.type === 'notebook') {
                delete options['format'];
            }
            const content = options.content ? '1' : '0';
            const params = Object.assign(Object.assign({}, options), { content });
            url += coreutils_1.URLExt.objectToQueryString(params);
        }
        const settings = this.serverSettings;
        const response = await __1.ServerConnection.makeRequest(url, {}, settings);
        if (response.status !== 200) {
            const err = await __1.ServerConnection.ResponseError.create(response);
            throw err;
        }
        const data = await response.json();
        validate.validateContentsModel(data);
        return data;
    }
    /**
     * Get an encoded download url given a file path.
     *
     * @param localPath - An absolute POSIX file path on the server.
     *
     * #### Notes
     * It is expected that the path contains no relative paths.
     *
     * The returned URL may include a query parameter.
     */
    getDownloadUrl(localPath) {
        const baseUrl = this.serverSettings.baseUrl;
        let url = coreutils_1.URLExt.join(baseUrl, FILES_URL, coreutils_1.URLExt.encodeParts(localPath));
        const xsrfTokenMatch = document.cookie.match('\\b_xsrf=([^;]*)\\b');
        if (xsrfTokenMatch) {
            const fullUrl = new URL(url);
            fullUrl.searchParams.append('_xsrf', xsrfTokenMatch[1]);
            url = fullUrl.toString();
        }
        return Promise.resolve(url);
    }
    /**
     * Create a new untitled file or directory in the specified directory path.
     *
     * @param options: The options used to create the file.
     *
     * @returns A promise which resolves with the created file content when the
     *    file is created.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents) and validates the response model.
     */
    async newUntitled(options = {}) {
        var _a;
        let body = '{}';
        if (options) {
            if (options.ext) {
                options.ext = Private.normalizeExtension(options.ext);
            }
            body = JSON.stringify(options);
        }
        const settings = this.serverSettings;
        const url = this._getUrl((_a = options.path) !== null && _a !== void 0 ? _a : '');
        const init = {
            method: 'POST',
            body
        };
        const response = await __1.ServerConnection.makeRequest(url, init, settings);
        if (response.status !== 201) {
            const err = await __1.ServerConnection.ResponseError.create(response);
            throw err;
        }
        const data = await response.json();
        validate.validateContentsModel(data);
        this._fileChanged.emit({
            type: 'new',
            oldValue: null,
            newValue: data
        });
        return data;
    }
    /**
     * Delete a file.
     *
     * @param localPath - The path to the file.
     *
     * @returns A promise which resolves when the file is deleted.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents).
     */
    async delete(localPath) {
        const url = this._getUrl(localPath);
        const settings = this.serverSettings;
        const init = { method: 'DELETE' };
        const response = await __1.ServerConnection.makeRequest(url, init, settings);
        // TODO: update IPEP27 to specify errors more precisely, so
        // that error types can be detected here with certainty.
        if (response.status !== 204) {
            const err = await __1.ServerConnection.ResponseError.create(response);
            throw err;
        }
        this._fileChanged.emit({
            type: 'delete',
            oldValue: { path: localPath },
            newValue: null
        });
    }
    /**
     * Rename a file or directory.
     *
     * @param oldLocalPath - The original file path.
     *
     * @param newLocalPath - The new file path.
     *
     * @returns A promise which resolves with the new file contents model when
     *   the file is renamed.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents) and validates the response model.
     */
    async rename(oldLocalPath, newLocalPath) {
        const settings = this.serverSettings;
        const url = this._getUrl(oldLocalPath);
        const init = {
            method: 'PATCH',
            body: JSON.stringify({ path: newLocalPath })
        };
        const response = await __1.ServerConnection.makeRequest(url, init, settings);
        if (response.status !== 200) {
            const err = await __1.ServerConnection.ResponseError.create(response);
            throw err;
        }
        const data = await response.json();
        validate.validateContentsModel(data);
        this._fileChanged.emit({
            type: 'rename',
            oldValue: { path: oldLocalPath },
            newValue: data
        });
        return data;
    }
    /**
     * Save a file.
     *
     * @param localPath - The desired file path.
     *
     * @param options - Optional overrides to the model.
     *
     * @returns A promise which resolves with the file content model when the
     *   file is saved.
     *
     * #### Notes
     * Ensure that `model.content` is populated for the file.
     *
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents) and validates the response model.
     */
    async save(localPath, options = {}) {
        const settings = this.serverSettings;
        const url = this._getUrl(localPath);
        const init = {
            method: 'PUT',
            body: JSON.stringify(options)
        };
        const response = await __1.ServerConnection.makeRequest(url, init, settings);
        // will return 200 for an existing file and 201 for a new file
        if (response.status !== 200 && response.status !== 201) {
            const err = await __1.ServerConnection.ResponseError.create(response);
            throw err;
        }
        const data = await response.json();
        validate.validateContentsModel(data);
        this._fileChanged.emit({
            type: 'save',
            oldValue: null,
            newValue: data
        });
        return data;
    }
    /**
     * Copy a file into a given directory.
     *
     * @param localPath - The original file path.
     *
     * @param toDir - The destination directory path.
     *
     * @returns A promise which resolves with the new contents model when the
     *  file is copied.
     *
     * #### Notes
     * The server will select the name of the copied file.
     *
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents) and validates the response model.
     */
    async copy(fromFile, toDir) {
        const settings = this.serverSettings;
        const url = this._getUrl(toDir);
        const init = {
            method: 'POST',
            body: JSON.stringify({ copy_from: fromFile })
        };
        const response = await __1.ServerConnection.makeRequest(url, init, settings);
        if (response.status !== 201) {
            const err = await __1.ServerConnection.ResponseError.create(response);
            throw err;
        }
        const data = await response.json();
        validate.validateContentsModel(data);
        this._fileChanged.emit({
            type: 'new',
            oldValue: null,
            newValue: data
        });
        return data;
    }
    /**
     * Create a checkpoint for a file.
     *
     * @param localPath - The path of the file.
     *
     * @returns A promise which resolves with the new checkpoint model when the
     *   checkpoint is created.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents) and validates the response model.
     */
    async createCheckpoint(localPath) {
        const url = this._getUrl(localPath, 'checkpoints');
        const init = { method: 'POST' };
        const response = await __1.ServerConnection.makeRequest(url, init, this.serverSettings);
        if (response.status !== 201) {
            const err = await __1.ServerConnection.ResponseError.create(response);
            throw err;
        }
        const data = await response.json();
        validate.validateCheckpointModel(data);
        return data;
    }
    /**
     * List available checkpoints for a file.
     *
     * @param localPath - The path of the file.
     *
     * @returns A promise which resolves with a list of checkpoint models for
     *    the file.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents) and validates the response model.
     */
    async listCheckpoints(localPath) {
        const url = this._getUrl(localPath, 'checkpoints');
        const response = await __1.ServerConnection.makeRequest(url, {}, this.serverSettings);
        if (response.status !== 200) {
            const err = await __1.ServerConnection.ResponseError.create(response);
            throw err;
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error('Invalid Checkpoint list');
        }
        for (let i = 0; i < data.length; i++) {
            validate.validateCheckpointModel(data[i]);
        }
        return data;
    }
    /**
     * Restore a file to a known checkpoint state.
     *
     * @param localPath - The path of the file.
     *
     * @param checkpointID - The id of the checkpoint to restore.
     *
     * @returns A promise which resolves when the checkpoint is restored.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents).
     */
    async restoreCheckpoint(localPath, checkpointID) {
        const url = this._getUrl(localPath, 'checkpoints', checkpointID);
        const init = { method: 'POST' };
        const response = await __1.ServerConnection.makeRequest(url, init, this.serverSettings);
        if (response.status !== 204) {
            const err = await __1.ServerConnection.ResponseError.create(response);
            throw err;
        }
    }
    /**
     * Delete a checkpoint for a file.
     *
     * @param localPath - The path of the file.
     *
     * @param checkpointID - The id of the checkpoint to delete.
     *
     * @returns A promise which resolves when the checkpoint is deleted.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/contents).
     */
    async deleteCheckpoint(localPath, checkpointID) {
        const url = this._getUrl(localPath, 'checkpoints', checkpointID);
        const init = { method: 'DELETE' };
        const response = await __1.ServerConnection.makeRequest(url, init, this.serverSettings);
        if (response.status !== 204) {
            const err = await __1.ServerConnection.ResponseError.create(response);
            throw err;
        }
    }
    /**
     * Get a REST url for a file given a path.
     */
    _getUrl(...args) {
        const parts = args.map(path => coreutils_1.URLExt.encodeParts(path));
        const baseUrl = this.serverSettings.baseUrl;
        return coreutils_1.URLExt.join(baseUrl, this._apiEndpoint, ...parts);
    }
}
exports.Drive = Drive;
/**
 * A namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * Normalize a file extension to be of the type `'.foo'`.
     *
     * Adds a leading dot if not present and converts to lower case.
     */
    function normalizeExtension(extension) {
        if (extension.length > 0 && extension.indexOf('.') !== 0) {
            extension = `.${extension}`;
        }
        return extension;
    }
    Private.normalizeExtension = normalizeExtension;
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/services/lib/contents/validate.js":
/*!********************************************************!*\
  !*** ../../packages/services/lib/contents/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateCheckpointModel = exports.validateContentsModel = void 0;
const validate_1 = __webpack_require__(/*! ../validate */ "../../packages/services/lib/validate.js");
/**
 * Validate an `Contents.IModel` object.
 */
function validateContentsModel(model) {
    validate_1.validateProperty(model, 'name', 'string');
    validate_1.validateProperty(model, 'path', 'string');
    validate_1.validateProperty(model, 'type', 'string');
    validate_1.validateProperty(model, 'created', 'string');
    validate_1.validateProperty(model, 'last_modified', 'string');
    validate_1.validateProperty(model, 'mimetype', 'object');
    validate_1.validateProperty(model, 'content', 'object');
    validate_1.validateProperty(model, 'format', 'object');
}
exports.validateContentsModel = validateContentsModel;
/**
 * Validate an `Contents.ICheckpointModel` object.
 */
function validateCheckpointModel(model) {
    validate_1.validateProperty(model, 'id', 'string');
    validate_1.validateProperty(model, 'last_modified', 'string');
}
exports.validateCheckpointModel = validateCheckpointModel;
//# sourceMappingURL=validate.js.map

/***/ }),

/***/ "../../packages/services/lib/index.js":
/*!********************************************!*\
  !*** ../../packages/services/lib/index.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module services
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./config */ "../../packages/services/lib/config/index.js"), exports);
__exportStar(__webpack_require__(/*! ./contents */ "../../packages/services/lib/contents/index.js"), exports);
__exportStar(__webpack_require__(/*! ./kernel */ "../../packages/services/lib/kernel/index.js"), exports);
__exportStar(__webpack_require__(/*! ./kernelspec */ "../../packages/services/lib/kernelspec/index.js"), exports);
__exportStar(__webpack_require__(/*! ./manager */ "../../packages/services/lib/manager.js"), exports);
__exportStar(__webpack_require__(/*! ./serverconnection */ "../../packages/services/lib/serverconnection.js"), exports);
__exportStar(__webpack_require__(/*! ./session */ "../../packages/services/lib/session/index.js"), exports);
__exportStar(__webpack_require__(/*! ./setting */ "../../packages/services/lib/setting/index.js"), exports);
__exportStar(__webpack_require__(/*! ./terminal */ "../../packages/services/lib/terminal/index.js"), exports);
__exportStar(__webpack_require__(/*! ./workspace */ "../../packages/services/lib/workspace/index.js"), exports);
__exportStar(__webpack_require__(/*! ./nbconvert */ "../../packages/services/lib/nbconvert/index.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/services/lib/kernel/comm.js":
/*!**************************************************!*\
  !*** ../../packages/services/lib/kernel/comm.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommHandler = void 0;
const disposable_1 = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable?7038");
const KernelMessage = __importStar(__webpack_require__(/*! ./messages */ "../../packages/services/lib/kernel/messages.js"));
/**
 * Comm channel handler.
 */
class CommHandler extends disposable_1.DisposableDelegate {
    /**
     * Construct a new comm channel.
     */
    constructor(target, id, kernel, disposeCb) {
        super(disposeCb);
        this._target = '';
        this._id = '';
        this._id = id;
        this._target = target;
        this._kernel = kernel;
    }
    /**
     * The unique id for the comm channel.
     */
    get commId() {
        return this._id;
    }
    /**
     * The target name for the comm channel.
     */
    get targetName() {
        return this._target;
    }
    /**
     * Get the callback for a comm close event.
     *
     * #### Notes
     * This is called when the comm is closed from either the server or client.
     *
     * **See also:** [[ICommClose]], [[close]]
     */
    get onClose() {
        return this._onClose;
    }
    /**
     * Set the callback for a comm close event.
     *
     * #### Notes
     * This is called when the comm is closed from either the server or client. If
     * the function returns a promise, and the kernel was closed from the server,
     * kernel message processing will pause until the returned promise is
     * fulfilled.
     *
     * **See also:** [[close]]
     */
    set onClose(cb) {
        this._onClose = cb;
    }
    /**
     * Get the callback for a comm message received event.
     */
    get onMsg() {
        return this._onMsg;
    }
    /**
     * Set the callback for a comm message received event.
     *
     * #### Notes
     * This is called when a comm message is received. If the function returns a
     * promise, kernel message processing will pause until it is fulfilled.
     */
    set onMsg(cb) {
        this._onMsg = cb;
    }
    /**
     * Open a comm with optional data and metadata.
     *
     * #### Notes
     * This sends a `comm_open` message to the server.
     *
     * **See also:** [[ICommOpen]]
     */
    open(data, metadata, buffers = []) {
        if (this.isDisposed || this._kernel.isDisposed) {
            throw new Error('Cannot open');
        }
        const msg = KernelMessage.createMessage({
            msgType: 'comm_open',
            channel: 'shell',
            username: this._kernel.username,
            session: this._kernel.clientId,
            content: {
                comm_id: this._id,
                target_name: this._target,
                data: data !== null && data !== void 0 ? data : {}
            },
            metadata,
            buffers
        });
        return this._kernel.sendShellMessage(msg, false, true);
    }
    /**
     * Send a `comm_msg` message to the kernel.
     *
     * #### Notes
     * This is a no-op if the comm has been closed.
     *
     * **See also:** [[ICommMsg]]
     */
    send(data, metadata, buffers = [], disposeOnDone = true) {
        if (this.isDisposed || this._kernel.isDisposed) {
            throw new Error('Cannot send');
        }
        const msg = KernelMessage.createMessage({
            msgType: 'comm_msg',
            channel: 'shell',
            username: this._kernel.username,
            session: this._kernel.clientId,
            content: {
                comm_id: this._id,
                data: data
            },
            metadata,
            buffers
        });
        return this._kernel.sendShellMessage(msg, false, disposeOnDone);
    }
    /**
     * Close the comm.
     *
     * #### Notes
     * This will send a `comm_close` message to the kernel, and call the
     * `onClose` callback if set.
     *
     * This is a no-op if the comm is already closed.
     *
     * **See also:** [[ICommClose]], [[onClose]]
     */
    close(data, metadata, buffers = []) {
        if (this.isDisposed || this._kernel.isDisposed) {
            throw new Error('Cannot close');
        }
        const msg = KernelMessage.createMessage({
            msgType: 'comm_close',
            channel: 'shell',
            username: this._kernel.username,
            session: this._kernel.clientId,
            content: {
                comm_id: this._id,
                data: data !== null && data !== void 0 ? data : {}
            },
            metadata,
            buffers
        });
        const future = this._kernel.sendShellMessage(msg, false, true);
        const onClose = this._onClose;
        if (onClose) {
            const ioMsg = KernelMessage.createMessage({
                msgType: 'comm_close',
                channel: 'iopub',
                username: this._kernel.username,
                session: this._kernel.clientId,
                content: {
                    comm_id: this._id,
                    data: data !== null && data !== void 0 ? data : {}
                },
                metadata,
                buffers
            });
            // In the future, we may want to communicate back to the user the possible
            // promise returned from onClose.
            void onClose(ioMsg);
        }
        this.dispose();
        return future;
    }
}
exports.CommHandler = CommHandler;
//# sourceMappingURL=comm.js.map

/***/ }),

/***/ "../../packages/services/lib/kernel/default.js":
/*!*****************************************************!*\
  !*** ../../packages/services/lib/kernel/default.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KernelConnection = void 0;
const coreutils_1 = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
const coreutils_2 = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
const signaling_1 = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
const __1 = __webpack_require__(/*! .. */ "../../packages/services/lib/index.js");
const comm_1 = __webpack_require__(/*! ./comm */ "../../packages/services/lib/kernel/comm.js");
const KernelMessage = __importStar(__webpack_require__(/*! ./messages */ "../../packages/services/lib/kernel/messages.js"));
const future_1 = __webpack_require__(/*! ./future */ "../../packages/services/lib/kernel/future.js");
const serialize = __importStar(__webpack_require__(/*! ./serialize */ "../../packages/services/lib/kernel/serialize.js"));
const validate = __importStar(__webpack_require__(/*! ./validate */ "../../packages/services/lib/kernel/validate.js"));
const kernelspec_1 = __webpack_require__(/*! ../kernelspec */ "../../packages/services/lib/kernelspec/index.js");
const restapi = __importStar(__webpack_require__(/*! ./restapi */ "../../packages/services/lib/kernel/restapi.js"));
const KERNEL_INFO_TIMEOUT = 3000;
const RESTARTING_KERNEL_SESSION = '_RESTARTING_';
const STARTING_KERNEL_SESSION = '';
/**
 * Implementation of the Kernel object.
 *
 * #### Notes
 * Messages from the server are handled in the order they were received and
 * asynchronously. Any message handler can return a promise, and message
 * handling will pause until the promise is fulfilled.
 */
class KernelConnection {
    /**
     * Construct a kernel object.
     */
    constructor(options) {
        var _a, _b, _c, _d;
        /**
         * Create the kernel websocket connection and add socket status handlers.
         */
        this._createSocket = () => {
            this._errorIfDisposed();
            // Make sure the socket is clear
            this._clearSocket();
            // Update the connection status to reflect opening a new connection.
            this._updateConnectionStatus('connecting');
            const settings = this.serverSettings;
            const partialUrl = coreutils_1.URLExt.join(settings.wsUrl, restapi.KERNEL_SERVICE_URL, encodeURIComponent(this._id));
            // Strip any authentication from the display string.
            const display = partialUrl.replace(/^((?:\w+:)?\/\/)(?:[^@\/]+@)/, '$1');
            console.debug(`Starting WebSocket: ${display}`);
            let url = coreutils_1.URLExt.join(partialUrl, 'channels?session_id=' + encodeURIComponent(this._clientId));
            // If token authentication is in use.
            const token = settings.token;
            if (settings.appendToken && token !== '') {
                url = url + `&token=${encodeURIComponent(token)}`;
            }
            this._ws = new settings.WebSocket(url);
            // Ensure incoming binary messages are not Blobs
            this._ws.binaryType = 'arraybuffer';
            let alreadyCalledOnclose = false;
            const getKernelModel = async (evt) => {
                var _a, _b;
                if (this._isDisposed) {
                    return;
                }
                this._reason = '';
                this._model = undefined;
                try {
                    const model = await restapi.getKernelModel(this._id, settings);
                    this._model = model;
                    if ((model === null || model === void 0 ? void 0 : model.execution_state) === 'dead') {
                        this._updateStatus('dead');
                    }
                    else {
                        this._onWSClose(evt);
                    }
                }
                catch (err) {
                    // Try again, if there is a network failure
                    // Handle network errors, as well as cases where we are on a
                    // JupyterHub and the server is not running. JupyterHub returns a
                    // 503 (<2.0) or 424 (>2.0) in that case.
                    if (err instanceof __1.ServerConnection.NetworkError ||
                        ((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) === 503 ||
                        ((_b = err.response) === null || _b === void 0 ? void 0 : _b.status) === 424) {
                        const timeout = Private.getRandomIntInclusive(10, 30) * 1e3;
                        setTimeout(getKernelModel, timeout, evt);
                    }
                    else {
                        this._reason = 'Kernel died unexpectedly';
                        this._updateStatus('dead');
                    }
                }
                return;
            };
            const earlyClose = async (evt) => {
                // If the websocket was closed early, that could mean
                // that the kernel is actually dead. Try getting
                // information about the kernel from the API call,
                // if that fails, then assume the kernel is dead,
                // otherwise just follow the typical websocket closed
                // protocol.
                if (alreadyCalledOnclose) {
                    return;
                }
                alreadyCalledOnclose = true;
                await getKernelModel(evt);
                return;
            };
            this._ws.onmessage = this._onWSMessage;
            this._ws.onopen = this._onWSOpen;
            this._ws.onclose = earlyClose;
            this._ws.onerror = earlyClose;
        };
        // Make websocket callbacks arrow functions so they bind `this`.
        /**
         * Handle a websocket open event.
         */
        this._onWSOpen = (evt) => {
            this._ws.onclose = this._onWSClose;
            this._ws.onerror = this._onWSClose;
            this._updateConnectionStatus('connected');
        };
        /**
         * Handle a websocket message, validating and routing appropriately.
         */
        this._onWSMessage = (evt) => {
            // Notify immediately if there is an error with the message.
            let msg;
            try {
                msg = serialize.deserialize(evt.data);
                validate.validateMessage(msg);
            }
            catch (error) {
                error.message = `Kernel message validation error: ${error.message}`;
                // We throw the error so that it bubbles up to the top, and displays the right stack.
                throw error;
            }
            // Update the current kernel session id
            this._kernelSession = msg.header.session;
            // Handle the message asynchronously, in the order received.
            this._msgChain = this._msgChain
                .then(() => {
                // Return so that any promises from handling a message are fulfilled
                // before proceeding to the next message.
                return this._handleMessage(msg);
            })
                .catch(error => {
                // Log any errors in handling the message, thus resetting the _msgChain
                // promise so we can process more messages.
                // Ignore the "Canceled" errors that are thrown during kernel dispose.
                if (error.message.startsWith('Canceled future for ')) {
                    console.error(error);
                }
            });
            // Emit the message receive signal
            this._anyMessage.emit({ msg, direction: 'recv' });
        };
        /**
         * Handle a websocket close event.
         */
        this._onWSClose = (evt) => {
            if (!this.isDisposed) {
                this._reconnect();
            }
        };
        this._id = '';
        this._name = '';
        this._status = 'unknown';
        this._connectionStatus = 'connecting';
        this._kernelSession = '';
        this._isDisposed = false;
        /**
         * Websocket to communicate with kernel.
         */
        this._ws = null;
        this._username = '';
        this._reconnectLimit = 7;
        this._reconnectAttempt = 0;
        this._reconnectTimeout = null;
        this._futures = new Map();
        this._comms = new Map();
        this._targetRegistry = Object.create(null);
        this._info = new coreutils_2.PromiseDelegate();
        this._pendingMessages = [];
        this._statusChanged = new signaling_1.Signal(this);
        this._connectionStatusChanged = new signaling_1.Signal(this);
        this._disposed = new signaling_1.Signal(this);
        this._iopubMessage = new signaling_1.Signal(this);
        this._anyMessage = new signaling_1.Signal(this);
        this._pendingInput = new signaling_1.Signal(this);
        this._unhandledMessage = new signaling_1.Signal(this);
        this._displayIdToParentIds = new Map();
        this._msgIdToDisplayIds = new Map();
        this._msgChain = Promise.resolve();
        this._hasPendingInput = false;
        this._reason = '';
        this._noOp = () => {
            /* no-op */
        };
        this._name = options.model.name;
        this._id = options.model.id;
        this.serverSettings = (_a = options.serverSettings) !== null && _a !== void 0 ? _a : __1.ServerConnection.makeSettings();
        this._clientId = (_b = options.clientId) !== null && _b !== void 0 ? _b : coreutils_2.UUID.uuid4();
        this._username = (_c = options.username) !== null && _c !== void 0 ? _c : '';
        this.handleComms = (_d = options.handleComms) !== null && _d !== void 0 ? _d : true;
        this._createSocket();
    }
    get disposed() {
        return this._disposed;
    }
    /**
     * A signal emitted when the kernel status changes.
     */
    get statusChanged() {
        return this._statusChanged;
    }
    /**
     * A signal emitted when the kernel status changes.
     */
    get connectionStatusChanged() {
        return this._connectionStatusChanged;
    }
    /**
     * A signal emitted for iopub kernel messages.
     *
     * #### Notes
     * This signal is emitted after the iopub message is handled asynchronously.
     */
    get iopubMessage() {
        return this._iopubMessage;
    }
    /**
     * A signal emitted for unhandled kernel message.
     *
     * #### Notes
     * This signal is emitted for a message that was not handled. It is emitted
     * during the asynchronous message handling code.
     */
    get unhandledMessage() {
        return this._unhandledMessage;
    }
    /**
     * The kernel model
     */
    get model() {
        return (this._model || {
            id: this.id,
            name: this.name,
            reason: this._reason
        });
    }
    /**
     * A signal emitted for any kernel message.
     *
     * #### Notes
     * This signal is emitted when a message is received, before it is handled
     * asynchronously.
     *
     * This message is emitted when a message is queued for sending (either in
     * the websocket buffer, or our own pending message buffer). The message may
     * actually be sent across the wire at a later time.
     *
     * The message emitted in this signal should not be modified in any way.
     */
    get anyMessage() {
        return this._anyMessage;
    }
    /**
     * A signal emitted when a kernel has pending inputs from the user.
     */
    get pendingInput() {
        return this._pendingInput;
    }
    /**
     * The id of the server-side kernel.
     */
    get id() {
        return this._id;
    }
    /**
     * The name of the server-side kernel.
     */
    get name() {
        return this._name;
    }
    /**
     * The client username.
     */
    get username() {
        return this._username;
    }
    /**
     * The client unique id.
     */
    get clientId() {
        return this._clientId;
    }
    /**
     * The current status of the kernel.
     */
    get status() {
        return this._status;
    }
    /**
     * The current connection status of the kernel connection.
     */
    get connectionStatus() {
        return this._connectionStatus;
    }
    /**
     * Test whether the kernel has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * The cached kernel info.
     *
     * @returns A promise that resolves to the kernel info.
     */
    get info() {
        return this._info.promise;
    }
    /**
     * The kernel spec.
     *
     * @returns A promise that resolves to the kernel spec.
     */
    get spec() {
        if (this._specPromise) {
            return this._specPromise;
        }
        this._specPromise = kernelspec_1.KernelSpecAPI.getSpecs(this.serverSettings).then(specs => {
            return specs.kernelspecs[this._name];
        });
        return this._specPromise;
    }
    /**
     * Clone the current kernel with a new clientId.
     */
    clone(options = {}) {
        return new KernelConnection(Object.assign({ model: this.model, username: this.username, serverSettings: this.serverSettings, 
            // handleComms defaults to false since that is safer
            handleComms: false }, options));
    }
    /**
     * Dispose of the resources held by the kernel.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        this._disposed.emit();
        this._updateConnectionStatus('disconnected');
        this._clearKernelState();
        this._pendingMessages = [];
        this._clearSocket();
        // Clear Lumino signals
        signaling_1.Signal.clearData(this);
    }
    /**
     * Send a shell message to the kernel.
     *
     * #### Notes
     * Send a message to the kernel's shell channel, yielding a future object
     * for accepting replies.
     *
     * If `expectReply` is given and `true`, the future is disposed when both a
     * shell reply and an idle status message are received. If `expectReply`
     * is not given or is `false`, the future is resolved when an idle status
     * message is received.
     * If `disposeOnDone` is not given or is `true`, the Future is disposed at this point.
     * If `disposeOnDone` is given and `false`, it is up to the caller to dispose of the Future.
     *
     * All replies are validated as valid kernel messages.
     *
     * If the kernel status is `dead`, this will throw an error.
     */
    sendShellMessage(msg, expectReply = false, disposeOnDone = true) {
        return this._sendKernelShellControl(future_1.KernelShellFutureHandler, msg, expectReply, disposeOnDone);
    }
    /**
     * Send a control message to the kernel.
     *
     * #### Notes
     * Send a message to the kernel's control channel, yielding a future object
     * for accepting replies.
     *
     * If `expectReply` is given and `true`, the future is disposed when both a
     * control reply and an idle status message are received. If `expectReply`
     * is not given or is `false`, the future is resolved when an idle status
     * message is received.
     * If `disposeOnDone` is not given or is `true`, the Future is disposed at this point.
     * If `disposeOnDone` is given and `false`, it is up to the caller to dispose of the Future.
     *
     * All replies are validated as valid kernel messages.
     *
     * If the kernel status is `dead`, this will throw an error.
     */
    sendControlMessage(msg, expectReply = false, disposeOnDone = true) {
        return this._sendKernelShellControl(future_1.KernelControlFutureHandler, msg, expectReply, disposeOnDone);
    }
    _sendKernelShellControl(ctor, msg, expectReply = false, disposeOnDone = true) {
        this._sendMessage(msg);
        this._anyMessage.emit({ msg, direction: 'send' });
        const future = new ctor(() => {
            const msgId = msg.header.msg_id;
            this._futures.delete(msgId);
            // Remove stored display id information.
            const displayIds = this._msgIdToDisplayIds.get(msgId);
            if (!displayIds) {
                return;
            }
            displayIds.forEach(displayId => {
                const msgIds = this._displayIdToParentIds.get(displayId);
                if (msgIds) {
                    const idx = msgIds.indexOf(msgId);
                    if (idx === -1) {
                        return;
                    }
                    if (msgIds.length === 1) {
                        this._displayIdToParentIds.delete(displayId);
                    }
                    else {
                        msgIds.splice(idx, 1);
                        this._displayIdToParentIds.set(displayId, msgIds);
                    }
                }
            });
            this._msgIdToDisplayIds.delete(msgId);
        }, msg, expectReply, disposeOnDone, this);
        this._futures.set(msg.header.msg_id, future);
        return future;
    }
    /**
     * Send a message on the websocket.
     *
     * If queue is true, queue the message for later sending if we cannot send
     * now. Otherwise throw an error.
     *
     * #### Notes
     * As an exception to the queueing, if we are sending a kernel_info_request
     * message while we think the kernel is restarting, we send the message
     * immediately without queueing. This is so that we can trigger a message
     * back, which will then clear the kernel restarting state.
     */
    _sendMessage(msg, queue = true) {
        if (this.status === 'dead') {
            throw new Error('Kernel is dead');
        }
        // If we have a kernel_info_request and we are starting or restarting, send the
        // kernel_info_request immediately if we can, and if not throw an error so
        // we can retry later. On restarting we do this because we must get at least one message
        // from the kernel to reset the kernel session (thus clearing the restart
        // status sentinel).
        if ((this._kernelSession === STARTING_KERNEL_SESSION ||
            this._kernelSession === RESTARTING_KERNEL_SESSION) &&
            KernelMessage.isInfoRequestMsg(msg)) {
            if (this.connectionStatus === 'connected') {
                this._ws.send(serialize.serialize(msg));
                return;
            }
            else {
                throw new Error('Could not send message: status is not connected');
            }
        }
        // If there are pending messages, add to the queue so we keep messages in order
        if (queue && this._pendingMessages.length > 0) {
            this._pendingMessages.push(msg);
            return;
        }
        // Send if the ws allows it, otherwise queue the message.
        if (this.connectionStatus === 'connected' &&
            this._kernelSession !== RESTARTING_KERNEL_SESSION) {
            this._ws.send(serialize.serialize(msg));
        }
        else if (queue) {
            this._pendingMessages.push(msg);
        }
        else {
            throw new Error('Could not send message');
        }
    }
    /**
     * Interrupt a kernel.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/kernels).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     *
     * It is assumed that the API call does not mutate the kernel id or name.
     *
     * The promise will be rejected if the kernel status is `Dead` or if the
     * request fails or the response is invalid.
     */
    async interrupt() {
        this.hasPendingInput = false;
        if (this.status === 'dead') {
            throw new Error('Kernel is dead');
        }
        return restapi.interruptKernel(this.id, this.serverSettings);
    }
    /**
     * Request a kernel restart.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/kernels)
     * and validates the response model.
     *
     * Any existing Future or Comm objects are cleared once the kernel has
     * actually be restarted.
     *
     * The promise is fulfilled on a valid server response (after the kernel restarts)
     * and rejected otherwise.
     *
     * It is assumed that the API call does not mutate the kernel id or name.
     *
     * The promise will be rejected if the request fails or the response is
     * invalid.
     */
    async restart() {
        if (this.status === 'dead') {
            throw new Error('Kernel is dead');
        }
        this._updateStatus('restarting');
        this._clearKernelState();
        this._kernelSession = RESTARTING_KERNEL_SESSION;
        await restapi.restartKernel(this.id, this.serverSettings);
        // Reconnect to the kernel to address cases where kernel ports
        // have changed during the restart.
        await this.reconnect();
        this.hasPendingInput = false;
    }
    /**
     * Reconnect to a kernel.
     *
     * #### Notes
     * This may try multiple times to reconnect to a kernel, and will sever any
     * existing connection.
     */
    reconnect() {
        this._errorIfDisposed();
        const result = new coreutils_2.PromiseDelegate();
        // Set up a listener for the connection status changing, which accepts or
        // rejects after the retries are done.
        const fulfill = (sender, status) => {
            if (status === 'connected') {
                result.resolve();
                this.connectionStatusChanged.disconnect(fulfill, this);
            }
            else if (status === 'disconnected') {
                result.reject(new Error('Kernel connection disconnected'));
                this.connectionStatusChanged.disconnect(fulfill, this);
            }
        };
        this.connectionStatusChanged.connect(fulfill, this);
        // Reset the reconnect limit so we start the connection attempts fresh
        this._reconnectAttempt = 0;
        // Start the reconnection process, which will also clear any existing
        // connection.
        this._reconnect();
        // Return the promise that should resolve on connection or reject if the
        // retries don't work.
        return result.promise;
    }
    /**
     * Shutdown a kernel.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/kernels).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     *
     * On a valid response, disposes this kernel connection.
     *
     * If the kernel is already `dead`, disposes this kernel connection without
     * a server request.
     */
    async shutdown() {
        if (this.status !== 'dead') {
            await restapi.shutdownKernel(this.id, this.serverSettings);
        }
        this.handleShutdown();
    }
    /**
     * Handles a kernel shutdown.
     *
     * #### Notes
     * This method should be called if we know from outside information that a
     * kernel is dead (for example, we cannot find the kernel model on the
     * server).
     */
    handleShutdown() {
        this._updateStatus('dead');
        this.dispose();
    }
    /**
     * Send a `kernel_info_request` message.
     *
     * #### Notes
     * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#kernel-info).
     *
     * Fulfills with the `kernel_info_response` content when the shell reply is
     * received and validated.
     */
    async requestKernelInfo() {
        const msg = KernelMessage.createMessage({
            msgType: 'kernel_info_request',
            channel: 'shell',
            username: this._username,
            session: this._clientId,
            content: {}
        });
        let reply;
        try {
            reply = (await Private.handleShellMessage(this, msg));
        }
        catch (e) {
            // If we rejected because the future was disposed, ignore and return.
            if (this.isDisposed) {
                return;
            }
            else {
                throw e;
            }
        }
        this._errorIfDisposed();
        if (!reply) {
            return;
        }
        // Kernels sometimes do not include a status field on kernel_info_reply
        // messages, so set a default for now.
        // See https://github.com/jupyterlab/jupyterlab/issues/6760
        if (reply.content.status === undefined) {
            reply.content.status = 'ok';
        }
        if (reply.content.status !== 'ok') {
            this._info.reject('Kernel info reply errored');
            return reply;
        }
        this._info.resolve(reply.content);
        this._kernelSession = reply.header.session;
        return reply;
    }
    /**
     * Send a `complete_request` message.
     *
     * #### Notes
     * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#completion).
     *
     * Fulfills with the `complete_reply` content when the shell reply is
     * received and validated.
     */
    requestComplete(content) {
        const msg = KernelMessage.createMessage({
            msgType: 'complete_request',
            channel: 'shell',
            username: this._username,
            session: this._clientId,
            content
        });
        return Private.handleShellMessage(this, msg);
    }
    /**
     * Send an `inspect_request` message.
     *
     * #### Notes
     * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#introspection).
     *
     * Fulfills with the `inspect_reply` content when the shell reply is
     * received and validated.
     */
    requestInspect(content) {
        const msg = KernelMessage.createMessage({
            msgType: 'inspect_request',
            channel: 'shell',
            username: this._username,
            session: this._clientId,
            content: content
        });
        return Private.handleShellMessage(this, msg);
    }
    /**
     * Send a `history_request` message.
     *
     * #### Notes
     * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#history).
     *
     * Fulfills with the `history_reply` content when the shell reply is
     * received and validated.
     */
    requestHistory(content) {
        const msg = KernelMessage.createMessage({
            msgType: 'history_request',
            channel: 'shell',
            username: this._username,
            session: this._clientId,
            content
        });
        return Private.handleShellMessage(this, msg);
    }
    /**
     * Send an `execute_request` message.
     *
     * #### Notes
     * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#execute).
     *
     * Future `onReply` is called with the `execute_reply` content when the
     * shell reply is received and validated. The future will resolve when
     * this message is received and the `idle` iopub status is received.
     * The future will also be disposed at this point unless `disposeOnDone`
     * is specified and `false`, in which case it is up to the caller to dispose
     * of the future.
     *
     * **See also:** [[IExecuteReply]]
     */
    requestExecute(content, disposeOnDone = true, metadata) {
        const defaults = {
            silent: false,
            store_history: true,
            user_expressions: {},
            allow_stdin: true,
            stop_on_error: false
        };
        const msg = KernelMessage.createMessage({
            msgType: 'execute_request',
            channel: 'shell',
            username: this._username,
            session: this._clientId,
            content: Object.assign(Object.assign({}, defaults), content),
            metadata
        });
        return this.sendShellMessage(msg, true, disposeOnDone);
    }
    /**
     * Send an experimental `debug_request` message.
     *
     * @hidden
     *
     * #### Notes
     * Debug messages are experimental messages that are not in the official
     * kernel message specification. As such, this function is *NOT* considered
     * part of the public API, and may change without notice.
     */
    requestDebug(content, disposeOnDone = true) {
        const msg = KernelMessage.createMessage({
            msgType: 'debug_request',
            channel: 'control',
            username: this._username,
            session: this._clientId,
            content
        });
        return this.sendControlMessage(msg, true, disposeOnDone);
    }
    /**
     * Send an `is_complete_request` message.
     *
     * #### Notes
     * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#code-completeness).
     *
     * Fulfills with the `is_complete_response` content when the shell reply is
     * received and validated.
     */
    requestIsComplete(content) {
        const msg = KernelMessage.createMessage({
            msgType: 'is_complete_request',
            channel: 'shell',
            username: this._username,
            session: this._clientId,
            content
        });
        return Private.handleShellMessage(this, msg);
    }
    /**
     * Send a `comm_info_request` message.
     *
     * #### Notes
     * Fulfills with the `comm_info_reply` content when the shell reply is
     * received and validated.
     */
    requestCommInfo(content) {
        const msg = KernelMessage.createMessage({
            msgType: 'comm_info_request',
            channel: 'shell',
            username: this._username,
            session: this._clientId,
            content
        });
        return Private.handleShellMessage(this, msg);
    }
    /**
     * Send an `input_reply` message.
     *
     * #### Notes
     * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#messages-on-the-stdin-router-dealer-sockets).
     */
    sendInputReply(content, parent_header) {
        const msg = KernelMessage.createMessage({
            msgType: 'input_reply',
            channel: 'stdin',
            username: this._username,
            session: this._clientId,
            content
        });
        if (parent_header) {
            msg.parent_header = parent_header;
        }
        this._sendMessage(msg);
        this._anyMessage.emit({ msg, direction: 'send' });
        this.hasPendingInput = false;
    }
    /**
     * Create a new comm.
     *
     * #### Notes
     * If a client-side comm already exists with the given commId, an error is thrown.
     * If the kernel does not handle comms, an error is thrown.
     */
    createComm(targetName, commId = coreutils_2.UUID.uuid4()) {
        if (!this.handleComms) {
            throw new Error('Comms are disabled on this kernel connection');
        }
        if (this._comms.has(commId)) {
            throw new Error('Comm is already created');
        }
        const comm = new comm_1.CommHandler(targetName, commId, this, () => {
            this._unregisterComm(commId);
        });
        this._comms.set(commId, comm);
        return comm;
    }
    /**
     * Check if a comm exists.
     */
    hasComm(commId) {
        return this._comms.has(commId);
    }
    /**
     * Register a comm target handler.
     *
     * @param targetName - The name of the comm target.
     *
     * @param callback - The callback invoked for a comm open message.
     *
     * @returns A disposable used to unregister the comm target.
     *
     * #### Notes
     * Only one comm target can be registered to a target name at a time, an
     * existing callback for the same target name will be overridden.  A registered
     * comm target handler will take precedence over a comm which specifies a
     * `target_module`.
     *
     * If the callback returns a promise, kernel message processing will pause
     * until the returned promise is fulfilled.
     */
    registerCommTarget(targetName, callback) {
        if (!this.handleComms) {
            return;
        }
        this._targetRegistry[targetName] = callback;
    }
    /**
     * Remove a comm target handler.
     *
     * @param targetName - The name of the comm target to remove.
     *
     * @param callback - The callback to remove.
     *
     * #### Notes
     * The comm target is only removed if the callback argument matches.
     */
    removeCommTarget(targetName, callback) {
        if (!this.handleComms) {
            return;
        }
        if (!this.isDisposed && this._targetRegistry[targetName] === callback) {
            delete this._targetRegistry[targetName];
        }
    }
    /**
     * Register an IOPub message hook.
     *
     * @param msg_id - The parent_header message id the hook will intercept.
     *
     * @param hook - The callback invoked for the message.
     *
     * #### Notes
     * The IOPub hook system allows you to preempt the handlers for IOPub
     * messages that are responses to a given message id.
     *
     * The most recently registered hook is run first. A hook can return a
     * boolean or a promise to a boolean, in which case all kernel message
     * processing pauses until the promise is fulfilled. If a hook return value
     * resolves to false, any later hooks will not run and the function will
     * return a promise resolving to false. If a hook throws an error, the error
     * is logged to the console and the next hook is run. If a hook is
     * registered during the hook processing, it will not run until the next
     * message. If a hook is removed during the hook processing, it will be
     * deactivated immediately.
     *
     * See also [[IFuture.registerMessageHook]].
     */
    registerMessageHook(msgId, hook) {
        var _a;
        const future = (_a = this._futures) === null || _a === void 0 ? void 0 : _a.get(msgId);
        if (future) {
            future.registerMessageHook(hook);
        }
    }
    /**
     * Remove an IOPub message hook.
     *
     * @param msg_id - The parent_header message id the hook intercepted.
     *
     * @param hook - The callback invoked for the message.
     *
     */
    removeMessageHook(msgId, hook) {
        var _a;
        const future = (_a = this._futures) === null || _a === void 0 ? void 0 : _a.get(msgId);
        if (future) {
            future.removeMessageHook(hook);
        }
    }
    /**
     * Remove the input guard, if any.
     */
    removeInputGuard() {
        this.hasPendingInput = false;
    }
    /**
     * Handle a message with a display id.
     *
     * @returns Whether the message was handled.
     */
    async _handleDisplayId(displayId, msg) {
        var _a, _b;
        const msgId = msg.parent_header.msg_id;
        let parentIds = this._displayIdToParentIds.get(displayId);
        if (parentIds) {
            // We've seen it before, update existing outputs with same display_id
            // by handling display_data as update_display_data.
            const updateMsg = {
                header: coreutils_2.JSONExt.deepCopy(msg.header),
                parent_header: coreutils_2.JSONExt.deepCopy(msg.parent_header),
                metadata: coreutils_2.JSONExt.deepCopy(msg.metadata),
                content: coreutils_2.JSONExt.deepCopy(msg.content),
                channel: msg.channel,
                buffers: msg.buffers ? msg.buffers.slice() : []
            };
            updateMsg.header.msg_type = 'update_display_data';
            await Promise.all(parentIds.map(async (parentId) => {
                const future = this._futures && this._futures.get(parentId);
                if (future) {
                    await future.handleMsg(updateMsg);
                }
            }));
        }
        // We're done here if it's update_display.
        if (msg.header.msg_type === 'update_display_data') {
            // It's an update, don't proceed to the normal display.
            return true;
        }
        // Regular display_data with id, record it for future updating
        // in _displayIdToParentIds for future lookup.
        parentIds = (_a = this._displayIdToParentIds.get(displayId)) !== null && _a !== void 0 ? _a : [];
        if (parentIds.indexOf(msgId) === -1) {
            parentIds.push(msgId);
        }
        this._displayIdToParentIds.set(displayId, parentIds);
        // Add to our map of display ids for this message.
        const displayIds = (_b = this._msgIdToDisplayIds.get(msgId)) !== null && _b !== void 0 ? _b : [];
        if (displayIds.indexOf(msgId) === -1) {
            displayIds.push(msgId);
        }
        this._msgIdToDisplayIds.set(msgId, displayIds);
        // Let the message propagate to the intended recipient.
        return false;
    }
    /**
     * Forcefully clear the socket state.
     *
     * #### Notes
     * This will clear all socket state without calling any handlers and will
     * not update the connection status. If you call this method, you are
     * responsible for updating the connection status as needed and recreating
     * the socket if you plan to reconnect.
     */
    _clearSocket() {
        if (this._ws !== null) {
            // Clear the websocket event handlers and the socket itself.
            this._ws.onopen = this._noOp;
            this._ws.onclose = this._noOp;
            this._ws.onerror = this._noOp;
            this._ws.onmessage = this._noOp;
            this._ws.close();
            this._ws = null;
        }
    }
    /**
     * Handle status iopub messages from the kernel.
     */
    _updateStatus(status) {
        if (this._status === status || this._status === 'dead') {
            return;
        }
        this._status = status;
        Private.logKernelStatus(this);
        this._statusChanged.emit(status);
        if (status === 'dead') {
            this.dispose();
        }
    }
    /**
     * Send pending messages to the kernel.
     */
    _sendPending() {
        // We check to make sure we are still connected each time. For
        // example, if a websocket buffer overflows, it may close, so we should
        // stop sending messages.
        while (this.connectionStatus === 'connected' &&
            this._kernelSession !== RESTARTING_KERNEL_SESSION &&
            this._pendingMessages.length > 0) {
            this._sendMessage(this._pendingMessages[0], false);
            // We shift the message off the queue after the message is sent so that
            // if there is an exception, the message is still pending.
            this._pendingMessages.shift();
        }
    }
    /**
     * Clear the internal state.
     */
    _clearKernelState() {
        this._kernelSession = '';
        this._pendingMessages = [];
        this._futures.forEach(future => {
            future.dispose();
        });
        this._comms.forEach(comm => {
            comm.dispose();
        });
        this._msgChain = Promise.resolve();
        this._futures = new Map();
        this._comms = new Map();
        this._displayIdToParentIds.clear();
        this._msgIdToDisplayIds.clear();
    }
    /**
     * Check to make sure it is okay to proceed to handle a message.
     *
     * #### Notes
     * Because we handle messages asynchronously, before a message is handled the
     * kernel might be disposed or restarted (and have a different session id).
     * This function throws an error in each of these cases. This is meant to be
     * called at the start of an asynchronous message handler to cancel message
     * processing if the message no longer is valid.
     */
    _assertCurrentMessage(msg) {
        this._errorIfDisposed();
        if (msg.header.session !== this._kernelSession) {
            throw new Error(`Canceling handling of old message: ${msg.header.msg_type}`);
        }
    }
    /**
     * Handle a `comm_open` kernel message.
     */
    async _handleCommOpen(msg) {
        this._assertCurrentMessage(msg);
        const content = msg.content;
        const comm = new comm_1.CommHandler(content.target_name, content.comm_id, this, () => {
            this._unregisterComm(content.comm_id);
        });
        this._comms.set(content.comm_id, comm);
        try {
            const target = await Private.loadObject(content.target_name, content.target_module, this._targetRegistry);
            await target(comm, msg);
        }
        catch (e) {
            // Close the comm asynchronously. We cannot block message processing on
            // kernel messages to wait for another kernel message.
            comm.close();
            console.error('Exception opening new comm');
            throw e;
        }
    }
    /**
     * Handle 'comm_close' kernel message.
     */
    async _handleCommClose(msg) {
        this._assertCurrentMessage(msg);
        const content = msg.content;
        const comm = this._comms.get(content.comm_id);
        if (!comm) {
            console.error('Comm not found for comm id ' + content.comm_id);
            return;
        }
        this._unregisterComm(comm.commId);
        const onClose = comm.onClose;
        if (onClose) {
            // tslint:disable-next-line:await-promise
            await onClose(msg);
        }
        comm.dispose();
    }
    /**
     * Handle a 'comm_msg' kernel message.
     */
    async _handleCommMsg(msg) {
        this._assertCurrentMessage(msg);
        const content = msg.content;
        const comm = this._comms.get(content.comm_id);
        if (!comm) {
            return;
        }
        const onMsg = comm.onMsg;
        if (onMsg) {
            // tslint:disable-next-line:await-promise
            await onMsg(msg);
        }
    }
    /**
     * Unregister a comm instance.
     */
    _unregisterComm(commId) {
        this._comms.delete(commId);
    }
    /**
     * Handle connection status changes.
     */
    _updateConnectionStatus(connectionStatus) {
        if (this._connectionStatus === connectionStatus) {
            return;
        }
        this._connectionStatus = connectionStatus;
        // If we are not 'connecting', reset any reconnection attempts.
        if (connectionStatus !== 'connecting') {
            this._reconnectAttempt = 0;
            clearTimeout(this._reconnectTimeout);
        }
        if (this.status !== 'dead') {
            if (connectionStatus === 'connected') {
                let restarting = this._kernelSession === RESTARTING_KERNEL_SESSION;
                // Send a kernel info request to make sure we send at least one
                // message to get kernel status back. Always request kernel info
                // first, to get kernel status back and ensure iopub is fully
                // established. If we are restarting, this message will skip the queue
                // and be sent immediately.
                let p = this.requestKernelInfo();
                // Send any pending messages after the kernelInfo resolves, or after a
                // timeout as a failsafe.
                let sendPendingCalled = false;
                let sendPendingOnce = () => {
                    if (sendPendingCalled) {
                        return;
                    }
                    sendPendingCalled = true;
                    if (restarting && this._kernelSession === RESTARTING_KERNEL_SESSION) {
                        // We were restarting and a message didn't arrive to set the
                        // session, but we just assume the restart succeeded and send any
                        // pending messages.
                        // FIXME: it would be better to retry the kernel_info_request here
                        this._kernelSession = '';
                    }
                    clearTimeout(timeoutHandle);
                    if (this._pendingMessages.length > 0) {
                        this._sendPending();
                    }
                };
                void p.then(sendPendingOnce);
                // FIXME: if sent while zmq subscriptions are not established,
                // kernelInfo may not resolve, so use a timeout to ensure we don't hang forever.
                // It may be preferable to retry kernelInfo rather than give up after one timeout.
                let timeoutHandle = setTimeout(sendPendingOnce, KERNEL_INFO_TIMEOUT);
            }
            else {
                // If the connection is down, then we do not know what is happening
                // with the kernel, so set the status to unknown.
                this._updateStatus('unknown');
            }
        }
        // Notify others that the connection status changed.
        this._connectionStatusChanged.emit(connectionStatus);
    }
    async _handleMessage(msg) {
        var _a, _b;
        let handled = false;
        // Check to see if we have a display_id we need to reroute.
        if (msg.parent_header &&
            msg.channel === 'iopub' &&
            (KernelMessage.isDisplayDataMsg(msg) ||
                KernelMessage.isUpdateDisplayDataMsg(msg) ||
                KernelMessage.isExecuteResultMsg(msg))) {
            // display_data messages may re-route based on their display_id.
            const transient = ((_a = msg.content.transient) !== null && _a !== void 0 ? _a : {});
            const displayId = transient['display_id'];
            if (displayId) {
                handled = await this._handleDisplayId(displayId, msg);
                // The await above may make this message out of date, so check again.
                this._assertCurrentMessage(msg);
            }
        }
        if (!handled && msg.parent_header) {
            const parentHeader = msg.parent_header;
            const future = (_b = this._futures) === null || _b === void 0 ? void 0 : _b.get(parentHeader.msg_id);
            if (future) {
                await future.handleMsg(msg);
                this._assertCurrentMessage(msg);
            }
            else {
                // If the message was sent by us and was not iopub, it is orphaned.
                const owned = parentHeader.session === this.clientId;
                if (msg.channel !== 'iopub' && owned) {
                    this._unhandledMessage.emit(msg);
                }
            }
        }
        if (msg.channel === 'iopub') {
            switch (msg.header.msg_type) {
                case 'status': {
                    // Updating the status is synchronous, and we call no async user code
                    const executionState = msg.content
                        .execution_state;
                    if (executionState === 'restarting') {
                        // The kernel has been auto-restarted by the server. After
                        // processing for this message is completely done, we want to
                        // handle this restart, so we don't await, but instead schedule
                        // the work as a microtask (i.e., in a promise resolution). We
                        // schedule this here so that it comes before any microtasks that
                        // might be scheduled in the status signal emission below.
                        void Promise.resolve().then(async () => {
                            this._updateStatus('autorestarting');
                            this._clearKernelState();
                            // We must reconnect since the kernel connection information may have
                            // changed, and the server only refreshes its zmq connection when a new
                            // websocket is opened.
                            await this.reconnect();
                        });
                    }
                    this._updateStatus(executionState);
                    break;
                }
                case 'comm_open':
                    if (this.handleComms) {
                        await this._handleCommOpen(msg);
                    }
                    break;
                case 'comm_msg':
                    if (this.handleComms) {
                        await this._handleCommMsg(msg);
                    }
                    break;
                case 'comm_close':
                    if (this.handleComms) {
                        await this._handleCommClose(msg);
                    }
                    break;
                default:
                    break;
            }
            // If the message was a status dead message, we might have disposed ourselves.
            if (!this.isDisposed) {
                this._assertCurrentMessage(msg);
                // the message wouldn't be emitted if we were disposed anyway.
                this._iopubMessage.emit(msg);
            }
        }
    }
    /**
     * Attempt a connection if we have not exhausted connection attempts.
     */
    _reconnect() {
        this._errorIfDisposed();
        // Clear any existing reconnection attempt
        clearTimeout(this._reconnectTimeout);
        // Update the connection status and schedule a possible reconnection.
        if (this._reconnectAttempt < this._reconnectLimit) {
            this._updateConnectionStatus('connecting');
            // The first reconnect attempt should happen immediately, and subsequent
            // attempts should pick a random number in a growing range so that we
            // don't overload the server with synchronized reconnection attempts
            // across multiple kernels.
            const timeout = Private.getRandomIntInclusive(0, 1e3 * (Math.pow(2, this._reconnectAttempt) - 1));
            console.warn(`Connection lost, reconnecting in ${Math.floor(timeout / 1000)} seconds.`);
            this._reconnectTimeout = setTimeout(this._createSocket, timeout);
            this._reconnectAttempt += 1;
        }
        else {
            this._updateConnectionStatus('disconnected');
        }
        // Clear the websocket event handlers and the socket itself.
        this._clearSocket();
    }
    /**
     * Utility function to throw an error if this instance is disposed.
     */
    _errorIfDisposed() {
        if (this.isDisposed) {
            throw new Error('Kernel connection is disposed');
        }
    }
    get hasPendingInput() {
        return this._hasPendingInput;
    }
    set hasPendingInput(value) {
        this._hasPendingInput = value;
        this._pendingInput.emit(value);
    }
}
exports.KernelConnection = KernelConnection;
/**
 * A private namespace for the Kernel.
 */
var Private;
(function (Private) {
    /**
     * Log the current kernel status.
     */
    function logKernelStatus(kernel) {
        switch (kernel.status) {
            case 'idle':
            case 'busy':
            case 'unknown':
                return;
            default:
                console.debug(`Kernel: ${kernel.status} (${kernel.id})`);
                break;
        }
    }
    Private.logKernelStatus = logKernelStatus;
    /**
     * Send a kernel message to the kernel and resolve the reply message.
     */
    async function handleShellMessage(kernel, msg) {
        const future = kernel.sendShellMessage(msg, true);
        return future.done;
    }
    Private.handleShellMessage = handleShellMessage;
    /**
     * Try to load an object from a module or a registry.
     *
     * Try to load an object from a module asynchronously if a module
     * is specified, otherwise tries to load an object from the global
     * registry, if the global registry is provided.
     *
     * #### Notes
     * Loading a module uses requirejs.
     */
    function loadObject(name, moduleName, registry) {
        return new Promise((resolve, reject) => {
            // Try loading the module using require.js
            if (moduleName) {
                if (typeof requirejs === 'undefined') {
                    throw new Error('requirejs not found');
                }
                requirejs([moduleName], (mod) => {
                    if (mod[name] === void 0) {
                        const msg = `Object '${name}' not found in module '${moduleName}'`;
                        reject(new Error(msg));
                    }
                    else {
                        resolve(mod[name]);
                    }
                }, reject);
            }
            else {
                if (registry === null || registry === void 0 ? void 0 : registry[name]) {
                    resolve(registry[name]);
                }
                else {
                    reject(new Error(`Object '${name}' not found in registry`));
                }
            }
        });
    }
    Private.loadObject = loadObject;
    /**
     * Get a random integer between min and max, inclusive of both.
     *
     * #### Notes
     * From
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
     *
     * From the MDN page: It might be tempting to use Math.round() to accomplish
     * that, but doing so would cause your random numbers to follow a non-uniform
     * distribution, which may not be acceptable for your needs.
     */
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    Private.getRandomIntInclusive = getRandomIntInclusive;
})(Private || (Private = {}));
//# sourceMappingURL=default.js.map

/***/ }),

/***/ "../../packages/services/lib/kernel/future.js":
/*!****************************************************!*\
  !*** ../../packages/services/lib/kernel/future.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KernelShellFutureHandler = exports.KernelControlFutureHandler = exports.KernelFutureHandler = void 0;
const coreutils_1 = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
const disposable_1 = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable?7038");
const KernelMessage = __importStar(__webpack_require__(/*! ./messages */ "../../packages/services/lib/kernel/messages.js"));
/**
 * Implementation of a kernel future.
 *
 * If a reply is expected, the Future is considered done when both a `reply`
 * message and an `idle` iopub status message have been received.  Otherwise, it
 * is considered done when the `idle` status is received.
 *
 */
class KernelFutureHandler extends disposable_1.DisposableDelegate {
    /**
     * Construct a new KernelFutureHandler.
     */
    constructor(cb, msg, expectReply, disposeOnDone, kernel) {
        super(cb);
        this._status = 0;
        this._stdin = Private.noOp;
        this._iopub = Private.noOp;
        this._reply = Private.noOp;
        this._done = new coreutils_1.PromiseDelegate();
        this._hooks = new Private.HookList();
        this._disposeOnDone = true;
        this._msg = msg;
        if (!expectReply) {
            this._setFlag(Private.KernelFutureFlag.GotReply);
        }
        this._disposeOnDone = disposeOnDone;
        this._kernel = kernel;
    }
    /**
     * Get the original outgoing message.
     */
    get msg() {
        return this._msg;
    }
    /**
     * A promise that resolves when the future is done.
     */
    get done() {
        return this._done.promise;
    }
    /**
     * Get the reply handler.
     */
    get onReply() {
        return this._reply;
    }
    /**
     * Set the reply handler.
     */
    set onReply(cb) {
        this._reply = cb;
    }
    /**
     * Get the iopub handler.
     */
    get onIOPub() {
        return this._iopub;
    }
    /**
     * Set the iopub handler.
     */
    set onIOPub(cb) {
        this._iopub = cb;
    }
    /**
     * Get the stdin handler.
     */
    get onStdin() {
        return this._stdin;
    }
    /**
     * Set the stdin handler.
     */
    set onStdin(cb) {
        this._stdin = cb;
    }
    /**
     * Register hook for IOPub messages.
     *
     * @param hook - The callback invoked for an IOPub message.
     *
     * #### Notes
     * The IOPub hook system allows you to preempt the handlers for IOPub
     * messages handled by the future.
     *
     * The most recently registered hook is run first. A hook can return a
     * boolean or a promise to a boolean, in which case all kernel message
     * processing pauses until the promise is fulfilled. If a hook return value
     * resolves to false, any later hooks will not run and the function will
     * return a promise resolving to false. If a hook throws an error, the error
     * is logged to the console and the next hook is run. If a hook is
     * registered during the hook processing, it will not run until the next
     * message. If a hook is removed during the hook processing, it will be
     * deactivated immediately.
     */
    registerMessageHook(hook) {
        if (this.isDisposed) {
            throw new Error('Kernel future is disposed');
        }
        this._hooks.add(hook);
    }
    /**
     * Remove a hook for IOPub messages.
     *
     * @param hook - The hook to remove.
     *
     * #### Notes
     * If a hook is removed during the hook processing, it will be deactivated immediately.
     */
    removeMessageHook(hook) {
        if (this.isDisposed) {
            return;
        }
        this._hooks.remove(hook);
    }
    /**
     * Send an `input_reply` message.
     */
    sendInputReply(content, parent_header) {
        this._kernel.sendInputReply(content, parent_header);
    }
    /**
     * Dispose and unregister the future.
     */
    dispose() {
        this._stdin = Private.noOp;
        this._iopub = Private.noOp;
        this._reply = Private.noOp;
        this._hooks = null;
        if (!this._testFlag(Private.KernelFutureFlag.IsDone)) {
            // TODO: Uncomment the following logging code, and check for any tests that trigger it.
            // let status = [];
            // if (!this._testFlag(Private.KernelFutureFlag.GotIdle)) {
            //   status.push('idle');
            // }
            // if (!this._testFlag(Private.KernelFutureFlag.GotReply)) {
            //   status.push('reply');
            // }
            // console.warn(
            //   `*************** DISPOSED BEFORE DONE: K${this._kernel.id.slice(
            //     0,
            //     6
            //   )} M${this._msg.header.msg_id.slice(0, 6)} missing ${status.join(' ')}`
            // );
            // Reject the `done` promise, but catch its error here in case no one else
            // is waiting for the promise to resolve. This prevents the error from
            // being displayed in the console, but does not prevent it from being
            // caught by a client who is waiting for it.
            this._done.promise.catch(() => {
                /* no-op */
            });
            this._done.reject(new Error(`Canceled future for ${this.msg.header.msg_type} message before replies were done`));
        }
        super.dispose();
    }
    /**
     * Handle an incoming kernel message.
     */
    async handleMsg(msg) {
        switch (msg.channel) {
            case 'control':
            case 'shell':
                if (msg.channel === this.msg.channel &&
                    msg.parent_header.msg_id === this.msg.header.msg_id) {
                    await this._handleReply(msg);
                }
                break;
            case 'stdin':
                await this._handleStdin(msg);
                break;
            case 'iopub':
                await this._handleIOPub(msg);
                break;
            default:
                break;
        }
    }
    async _handleReply(msg) {
        const reply = this._reply;
        if (reply) {
            // tslint:disable-next-line:await-promise
            await reply(msg);
        }
        this._replyMsg = msg;
        this._setFlag(Private.KernelFutureFlag.GotReply);
        if (this._testFlag(Private.KernelFutureFlag.GotIdle)) {
            this._handleDone();
        }
    }
    async _handleStdin(msg) {
        this._kernel.hasPendingInput = true;
        const stdin = this._stdin;
        if (stdin) {
            // tslint:disable-next-line:await-promise
            await stdin(msg);
        }
    }
    async _handleIOPub(msg) {
        const process = await this._hooks.process(msg);
        const iopub = this._iopub;
        if (process && iopub) {
            // tslint:disable-next-line:await-promise
            await iopub(msg);
        }
        if (KernelMessage.isStatusMsg(msg) &&
            msg.content.execution_state === 'idle') {
            this._setFlag(Private.KernelFutureFlag.GotIdle);
            if (this._testFlag(Private.KernelFutureFlag.GotReply)) {
                this._handleDone();
            }
        }
    }
    _handleDone() {
        if (this._testFlag(Private.KernelFutureFlag.IsDone)) {
            return;
        }
        this._setFlag(Private.KernelFutureFlag.IsDone);
        this._done.resolve(this._replyMsg);
        if (this._disposeOnDone) {
            this.dispose();
        }
    }
    /**
     * Test whether the given future flag is set.
     */
    _testFlag(flag) {
        // tslint:disable-next-line
        return (this._status & flag) !== 0;
    }
    /**
     * Set the given future flag.
     */
    _setFlag(flag) {
        // tslint:disable-next-line
        this._status |= flag;
    }
}
exports.KernelFutureHandler = KernelFutureHandler;
class KernelControlFutureHandler extends KernelFutureHandler {
}
exports.KernelControlFutureHandler = KernelControlFutureHandler;
class KernelShellFutureHandler extends KernelFutureHandler {
}
exports.KernelShellFutureHandler = KernelShellFutureHandler;
var Private;
(function (Private) {
    /**
     * A no-op function.
     */
    Private.noOp = () => {
        /* no-op */
    };
    /**
     * Defer a computation.
     *
     * #### NOTES
     * We can't just use requestAnimationFrame since it is not available in node.
     * This implementation is from Phosphor:
     * https://github.com/phosphorjs/phosphor/blob/e88e4321289bb1198f3098e7bda40736501f2ed8/tests/test-messaging/src/index.spec.ts#L63
     */
    const defer = (() => {
        const ok = typeof requestAnimationFrame === 'function';
        return ok ? requestAnimationFrame : setImmediate;
    })();
    class HookList {
        constructor() {
            this._hooks = [];
        }
        /**
         * Register a hook.
         *
         * @param hook - The callback to register.
         */
        add(hook) {
            this.remove(hook);
            this._hooks.push(hook);
        }
        /**
         * Remove a hook, if it exists in the hook list.
         *
         * @param hook - The callback to remove.
         */
        remove(hook) {
            const index = this._hooks.indexOf(hook);
            if (index >= 0) {
                this._hooks[index] = null;
                this._scheduleCompact();
            }
        }
        /**
         * Process a message through the hooks.
         *
         * @returns a promise resolving to false if any hook resolved as false,
         * otherwise true
         *
         * #### Notes
         * The most recently registered hook is run first. A hook can return a
         * boolean or a promise to a boolean, in which case processing pauses until
         * the promise is fulfilled. If a hook return value resolves to false, any
         * later hooks will not run and the function will return a promise resolving
         * to false. If a hook throws an error, the error is logged to the console
         * and the next hook is run. If a hook is registered during the hook
         * processing, it will not run until the next message. If a hook is removed
         * during the hook processing, it will be deactivated immediately.
         */
        async process(msg) {
            // Wait until we can start a new process run.
            await this._processing;
            // Start the next process run.
            const processing = new coreutils_1.PromiseDelegate();
            this._processing = processing.promise;
            let continueHandling;
            // Call the end hook (most recently-added) first. Starting at the end also
            // guarantees that hooks added during the processing will not be run in
            // this process run.
            for (let i = this._hooks.length - 1; i >= 0; i--) {
                const hook = this._hooks[i];
                // If the hook has been removed, continue to the next one.
                if (hook === null) {
                    continue;
                }
                // Execute the hook and log any errors.
                try {
                    // tslint:disable-next-line:await-promise
                    continueHandling = await hook(msg);
                }
                catch (err) {
                    continueHandling = true;
                    console.error(err);
                }
                // If the hook resolved to false, stop processing and return.
                if (continueHandling === false) {
                    processing.resolve(undefined);
                    return false;
                }
            }
            // All hooks returned true (or errored out), so return true.
            processing.resolve(undefined);
            return true;
        }
        /**
         * Schedule a cleanup of the list, removing any hooks that have been nulled out.
         */
        _scheduleCompact() {
            if (!this._compactScheduled) {
                this._compactScheduled = true;
                // Schedule a compaction in between processing runs. We do the
                // scheduling in an animation frame to rate-limit our compactions. If we
                // need to compact more frequently, we can change this to directly
                // schedule the compaction.
                defer(() => {
                    this._processing = this._processing.then(() => {
                        this._compactScheduled = false;
                        this._compact();
                    });
                });
            }
        }
        /**
         * Compact the list, removing any nulls.
         */
        _compact() {
            let numNulls = 0;
            for (let i = 0, len = this._hooks.length; i < len; i++) {
                const hook = this._hooks[i];
                if (this._hooks[i] === null) {
                    numNulls++;
                }
                else {
                    this._hooks[i - numNulls] = hook;
                }
            }
            this._hooks.length -= numNulls;
        }
    }
    Private.HookList = HookList;
    /**
     * Bit flags for the kernel future state.
     */
    let KernelFutureFlag;
    (function (KernelFutureFlag) {
        KernelFutureFlag[KernelFutureFlag["GotReply"] = 1] = "GotReply";
        KernelFutureFlag[KernelFutureFlag["GotIdle"] = 2] = "GotIdle";
        KernelFutureFlag[KernelFutureFlag["IsDone"] = 4] = "IsDone";
        KernelFutureFlag[KernelFutureFlag["DisposeOnDone"] = 8] = "DisposeOnDone";
    })(KernelFutureFlag = Private.KernelFutureFlag || (Private.KernelFutureFlag = {}));
})(Private || (Private = {}));
//# sourceMappingURL=future.js.map

/***/ }),

/***/ "../../packages/services/lib/kernel/index.js":
/*!***************************************************!*\
  !*** ../../packages/services/lib/kernel/index.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KernelConnection = exports.KernelAPI = exports.KernelMessage = exports.Kernel = void 0;
// Namespace some of our modules for convenience and backwards compatibility.
const Kernel = __importStar(__webpack_require__(/*! ./kernel */ "../../packages/services/lib/kernel/kernel.js"));
exports.Kernel = Kernel;
const KernelMessage = __importStar(__webpack_require__(/*! ./messages */ "../../packages/services/lib/kernel/messages.js"));
exports.KernelMessage = KernelMessage;
const KernelAPI = __importStar(__webpack_require__(/*! ./restapi */ "../../packages/services/lib/kernel/restapi.js"));
exports.KernelAPI = KernelAPI;
const default_1 = __webpack_require__(/*! ./default */ "../../packages/services/lib/kernel/default.js");
Object.defineProperty(exports, "KernelConnection", ({ enumerable: true, get: function () { return default_1.KernelConnection; } }));
__exportStar(__webpack_require__(/*! ./manager */ "../../packages/services/lib/kernel/manager.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/services/lib/kernel/kernel.js":
/*!****************************************************!*\
  !*** ../../packages/services/lib/kernel/kernel.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=kernel.js.map

/***/ }),

/***/ "../../packages/services/lib/kernel/manager.js":
/*!*****************************************************!*\
  !*** ../../packages/services/lib/kernel/manager.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KernelManager = void 0;
const algorithm_1 = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
const polling_1 = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling/@lumino/polling");
const signaling_1 = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
const __1 = __webpack_require__(/*! .. */ "../../packages/services/lib/index.js");
const basemanager_1 = __webpack_require__(/*! ../basemanager */ "../../packages/services/lib/basemanager.js");
const restapi_1 = __webpack_require__(/*! ./restapi */ "../../packages/services/lib/kernel/restapi.js");
const default_1 = __webpack_require__(/*! ./default */ "../../packages/services/lib/kernel/default.js");
/**
 * An implementation of a kernel manager.
 */
class KernelManager extends basemanager_1.BaseManager {
    /**
     * Construct a new kernel manager.
     *
     * @param options - The default options for kernel.
     */
    constructor(options = {}) {
        var _a;
        super(options);
        this._isReady = false;
        this._kernelConnections = new Set();
        this._models = new Map();
        this._runningChanged = new signaling_1.Signal(this);
        this._connectionFailure = new signaling_1.Signal(this);
        // Start model and specs polling with exponential backoff.
        this._pollModels = new polling_1.Poll({
            auto: false,
            factory: () => this.requestRunning(),
            frequency: {
                interval: 10 * 1000,
                backoff: true,
                max: 300 * 1000
            },
            name: `@jupyterlab/services:KernelManager#models`,
            standby: (_a = options.standby) !== null && _a !== void 0 ? _a : 'when-hidden'
        });
        // Initialize internal data.
        this._ready = (async () => {
            await this._pollModels.start();
            await this._pollModels.tick;
            this._isReady = true;
        })();
    }
    /**
     * Test whether the manager is ready.
     */
    get isReady() {
        return this._isReady;
    }
    /**
     * A promise that fulfills when the manager is ready.
     */
    get ready() {
        return this._ready;
    }
    /**
     * A signal emitted when the running kernels change.
     */
    get runningChanged() {
        return this._runningChanged;
    }
    /**
     * A signal emitted when there is a connection failure.
     */
    get connectionFailure() {
        return this._connectionFailure;
    }
    /**
     * Dispose of the resources used by the manager.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._models.clear();
        this._kernelConnections.forEach(x => x.dispose());
        this._pollModels.dispose();
        super.dispose();
    }
    /**
     * Connect to an existing kernel.
     *
     * @returns The new kernel connection.
     *
     * #### Notes
     * This will use the manager's server settings and ignore any server
     * settings passed in the options.
     */
    connectTo(options) {
        var _a;
        const { id } = options.model;
        let handleComms = (_a = options.handleComms) !== null && _a !== void 0 ? _a : true;
        // By default, handle comms only if no other kernel connection is.
        if (options.handleComms === undefined) {
            for (const kc of this._kernelConnections) {
                if (kc.id === id && kc.handleComms) {
                    handleComms = false;
                    break;
                }
            }
        }
        const kernelConnection = new default_1.KernelConnection(Object.assign(Object.assign({ handleComms }, options), { serverSettings: this.serverSettings }));
        this._onStarted(kernelConnection);
        if (!this._models.has(id)) {
            // We trust the user to connect to an existing kernel, but we verify
            // asynchronously.
            void this.refreshRunning().catch(() => {
                /* no-op */
            });
        }
        return kernelConnection;
    }
    /**
     * Create an iterator over the most recent running kernels.
     *
     * @returns A new iterator over the running kernels.
     */
    running() {
        return algorithm_1.iter([...this._models.values()]);
    }
    /**
     * Force a refresh of the running kernels.
     *
     * @returns A promise that resolves when the running list has been refreshed.
     *
     * #### Notes
     * This is not typically meant to be called by the user, since the
     * manager maintains its own internal state.
     */
    async refreshRunning() {
        await this._pollModels.refresh();
        await this._pollModels.tick;
    }
    /**
     * Start a new kernel.
     *
     * @param createOptions - The kernel creation options
     *
     * @param connectOptions - The kernel connection options
     *
     * @returns A promise that resolves with the kernel connection.
     *
     * #### Notes
     * The manager `serverSettings` will be always be used.
     */
    async startNew(createOptions = {}, connectOptions = {}) {
        const model = await restapi_1.startNew(createOptions, this.serverSettings);
        return this.connectTo(Object.assign(Object.assign({}, connectOptions), { model }));
    }
    /**
     * Shut down a kernel by id.
     *
     * @param id - The id of the target kernel.
     *
     * @returns A promise that resolves when the operation is complete.
     */
    async shutdown(id) {
        await restapi_1.shutdownKernel(id, this.serverSettings);
        await this.refreshRunning();
    }
    /**
     * Shut down all kernels.
     *
     * @returns A promise that resolves when all of the kernels are shut down.
     */
    async shutdownAll() {
        // Update the list of models to make sure our list is current.
        await this.refreshRunning();
        // Shut down all models.
        await Promise.all([...this._models.keys()].map(id => restapi_1.shutdownKernel(id, this.serverSettings)));
        // Update the list of models to clear out our state.
        await this.refreshRunning();
    }
    /**
     * Find a kernel by id.
     *
     * @param id - The id of the target kernel.
     *
     * @returns A promise that resolves with the kernel's model.
     */
    async findById(id) {
        if (this._models.has(id)) {
            return this._models.get(id);
        }
        await this.refreshRunning();
        return this._models.get(id);
    }
    /**
     * Execute a request to the server to poll running kernels and update state.
     */
    async requestRunning() {
        var _a, _b;
        let models;
        try {
            models = await restapi_1.listRunning(this.serverSettings);
        }
        catch (err) {
            // Handle network errors, as well as cases where we are on a
            // JupyterHub and the server is not running. JupyterHub returns a
            // 503 (<2.0) or 424 (>2.0) in that case.
            if (err instanceof __1.ServerConnection.NetworkError ||
                ((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) === 503 ||
                ((_b = err.response) === null || _b === void 0 ? void 0 : _b.status) === 424) {
                this._connectionFailure.emit(err);
            }
            throw err;
        }
        if (this.isDisposed) {
            return;
        }
        if (this._models.size === models.length &&
            algorithm_1.every(models, x => {
                const existing = this._models.get(x.id);
                if (!existing) {
                    return false;
                }
                return existing.name === x.name;
            })) {
            // Identical models list (presuming models does not contain duplicate
            // ids), so just return
            return;
        }
        this._models = new Map(models.map(x => [x.id, x]));
        // For any kernel connection to a kernel that doesn't exist, notify it of
        // the shutdown.
        this._kernelConnections.forEach(kc => {
            if (!this._models.has(kc.id)) {
                kc.handleShutdown();
            }
        });
        this._runningChanged.emit(models);
    }
    /**
     * Handle a kernel starting.
     */
    _onStarted(kernelConnection) {
        this._kernelConnections.add(kernelConnection);
        kernelConnection.statusChanged.connect(this._onStatusChanged, this);
        kernelConnection.disposed.connect(this._onDisposed, this);
    }
    _onDisposed(kernelConnection) {
        this._kernelConnections.delete(kernelConnection);
        // A dispose emission could mean the server session is deleted, or that
        // the kernel JS object is disposed and the kernel still exists on the
        // server, so we refresh from the server to make sure we reflect the
        // server state.
        void this.refreshRunning().catch(() => {
            /* no-op */
        });
    }
    _onStatusChanged(kernelConnection, status) {
        if (status === 'dead') {
            // We asynchronously update our list of kernels, which asynchronously
            // will dispose them. We do not want to immediately dispose them because
            // there may be other signal handlers that want to be called.
            void this.refreshRunning().catch(() => {
                /* no-op */
            });
        }
    }
}
exports.KernelManager = KernelManager;
//# sourceMappingURL=manager.js.map

/***/ }),

/***/ "../../packages/services/lib/kernel/messages.js":
/*!******************************************************!*\
  !*** ../../packages/services/lib/kernel/messages.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isInputReplyMsg = exports.isInputRequestMsg = exports.isDebugReplyMsg = exports.isDebugRequestMsg = exports.isExecuteReplyMsg = exports.isInfoRequestMsg = exports.isCommMsgMsg = exports.isCommCloseMsg = exports.isCommOpenMsg = exports.isDebugEventMsg = exports.isClearOutputMsg = exports.isStatusMsg = exports.isErrorMsg = exports.isExecuteResultMsg = exports.isExecuteInputMsg = exports.isUpdateDisplayDataMsg = exports.isDisplayDataMsg = exports.isStreamMsg = exports.createMessage = void 0;
const coreutils_1 = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
function createMessage(options) {
    var _a, _b, _c, _d, _e;
    return {
        buffers: (_a = options.buffers) !== null && _a !== void 0 ? _a : [],
        channel: options.channel,
        content: options.content,
        header: {
            date: new Date().toISOString(),
            msg_id: (_b = options.msgId) !== null && _b !== void 0 ? _b : coreutils_1.UUID.uuid4(),
            msg_type: options.msgType,
            session: options.session,
            username: (_c = options.username) !== null && _c !== void 0 ? _c : '',
            version: '5.2'
        },
        metadata: (_d = options.metadata) !== null && _d !== void 0 ? _d : {},
        parent_header: (_e = options.parentHeader) !== null && _e !== void 0 ? _e : {}
    };
}
exports.createMessage = createMessage;
/**
 * Test whether a kernel message is a `'stream'` message.
 */
function isStreamMsg(msg) {
    return msg.header.msg_type === 'stream';
}
exports.isStreamMsg = isStreamMsg;
/**
 * Test whether a kernel message is an `'display_data'` message.
 */
function isDisplayDataMsg(msg) {
    return msg.header.msg_type === 'display_data';
}
exports.isDisplayDataMsg = isDisplayDataMsg;
/**
 * Test whether a kernel message is an `'update_display_data'` message.
 */
function isUpdateDisplayDataMsg(msg) {
    return msg.header.msg_type === 'update_display_data';
}
exports.isUpdateDisplayDataMsg = isUpdateDisplayDataMsg;
/**
 * Test whether a kernel message is an `'execute_input'` message.
 */
function isExecuteInputMsg(msg) {
    return msg.header.msg_type === 'execute_input';
}
exports.isExecuteInputMsg = isExecuteInputMsg;
/**
 * Test whether a kernel message is an `'execute_result'` message.
 */
function isExecuteResultMsg(msg) {
    return msg.header.msg_type === 'execute_result';
}
exports.isExecuteResultMsg = isExecuteResultMsg;
/**
 * Test whether a kernel message is an `'error'` message.
 */
function isErrorMsg(msg) {
    return msg.header.msg_type === 'error';
}
exports.isErrorMsg = isErrorMsg;
/**
 * Test whether a kernel message is a `'status'` message.
 */
function isStatusMsg(msg) {
    return msg.header.msg_type === 'status';
}
exports.isStatusMsg = isStatusMsg;
/**
 * Test whether a kernel message is a `'clear_output'` message.
 */
function isClearOutputMsg(msg) {
    return msg.header.msg_type === 'clear_output';
}
exports.isClearOutputMsg = isClearOutputMsg;
/**
 * Test whether a kernel message is an experimental `'debug_event'` message.
 *
 * @hidden
 *
 * #### Notes
 * Debug messages are experimental messages that are not in the official
 * kernel message specification. As such, this is *NOT* considered
 * part of the public API, and may change without notice.
 */
function isDebugEventMsg(msg) {
    return msg.header.msg_type === 'debug_event';
}
exports.isDebugEventMsg = isDebugEventMsg;
/**
 * Test whether a kernel message is a `'comm_open'` message.
 */
function isCommOpenMsg(msg) {
    return msg.header.msg_type === 'comm_open';
}
exports.isCommOpenMsg = isCommOpenMsg;
/**
 * Test whether a kernel message is a `'comm_close'` message.
 */
function isCommCloseMsg(msg) {
    return msg.header.msg_type === 'comm_close';
}
exports.isCommCloseMsg = isCommCloseMsg;
/**
 * Test whether a kernel message is a `'comm_msg'` message.
 */
function isCommMsgMsg(msg) {
    return msg.header.msg_type === 'comm_msg';
}
exports.isCommMsgMsg = isCommMsgMsg;
/**
 * Test whether a kernel message is a `'kernel_info_request'` message.
 */
function isInfoRequestMsg(msg) {
    return msg.header.msg_type === 'kernel_info_request';
}
exports.isInfoRequestMsg = isInfoRequestMsg;
/**
 * Test whether a kernel message is an `'execute_reply'` message.
 */
function isExecuteReplyMsg(msg) {
    return msg.header.msg_type === 'execute_reply';
}
exports.isExecuteReplyMsg = isExecuteReplyMsg;
/**
 * Test whether a kernel message is an experimental `'debug_request'` message.
 *
 * @hidden
 *
 * #### Notes
 * Debug messages are experimental messages that are not in the official
 * kernel message specification. As such, this is *NOT* considered
 * part of the public API, and may change without notice.
 */
function isDebugRequestMsg(msg) {
    return msg.header.msg_type === 'debug_request';
}
exports.isDebugRequestMsg = isDebugRequestMsg;
/**
 * Test whether a kernel message is an experimental `'debug_reply'` message.
 *
 * @hidden
 *
 * #### Notes
 * Debug messages are experimental messages that are not in the official
 * kernel message specification. As such, this is *NOT* considered
 * part of the public API, and may change without notice.
 */
function isDebugReplyMsg(msg) {
    return msg.header.msg_type === 'debug_reply';
}
exports.isDebugReplyMsg = isDebugReplyMsg;
/**
 * Test whether a kernel message is an `'input_request'` message.
 */
function isInputRequestMsg(msg) {
    return msg.header.msg_type === 'input_request';
}
exports.isInputRequestMsg = isInputRequestMsg;
/**
 * Test whether a kernel message is an `'input_reply'` message.
 */
function isInputReplyMsg(msg) {
    return msg.header.msg_type === 'input_reply';
}
exports.isInputReplyMsg = isInputReplyMsg;
//# sourceMappingURL=messages.js.map

/***/ }),

/***/ "../../packages/services/lib/kernel/restapi.js":
/*!*****************************************************!*\
  !*** ../../packages/services/lib/kernel/restapi.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getKernelModel = exports.shutdownKernel = exports.interruptKernel = exports.restartKernel = exports.startNew = exports.listRunning = exports.KERNEL_SERVICE_URL = void 0;
const serverconnection_1 = __webpack_require__(/*! ../serverconnection */ "../../packages/services/lib/serverconnection.js");
const coreutils_1 = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
const validate_1 = __webpack_require__(/*! ./validate */ "../../packages/services/lib/kernel/validate.js");
/**
 * The url for the kernel service.
 */
exports.KERNEL_SERVICE_URL = 'api/kernels';
/**
 * Fetch the running kernels.
 *
 * @param settings - The optional server settings.
 *
 * @returns A promise that resolves with the list of running kernels.
 *
 * #### Notes
 * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/kernels) and validates the response model.
 *
 * The promise is fulfilled on a valid response and rejected otherwise.
 */
async function listRunning(settings = serverconnection_1.ServerConnection.makeSettings()) {
    const url = coreutils_1.URLExt.join(settings.baseUrl, exports.KERNEL_SERVICE_URL);
    const response = await serverconnection_1.ServerConnection.makeRequest(url, {}, settings);
    if (response.status !== 200) {
        const err = await serverconnection_1.ServerConnection.ResponseError.create(response);
        throw err;
    }
    const data = await response.json();
    validate_1.validateModels(data);
    return data;
}
exports.listRunning = listRunning;
/**
 * Start a new kernel.
 *
 * @param options - The options used to create the kernel.
 *
 * @returns A promise that resolves with a kernel connection object.
 *
 * #### Notes
 * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/kernels) and validates the response model.
 *
 * The promise is fulfilled on a valid response and rejected otherwise.
 */
async function startNew(options = {}, settings = serverconnection_1.ServerConnection.makeSettings()) {
    const url = coreutils_1.URLExt.join(settings.baseUrl, exports.KERNEL_SERVICE_URL);
    const init = {
        method: 'POST',
        body: JSON.stringify(options)
    };
    const response = await serverconnection_1.ServerConnection.makeRequest(url, init, settings);
    if (response.status !== 201) {
        const err = await serverconnection_1.ServerConnection.ResponseError.create(response);
        throw err;
    }
    const data = await response.json();
    validate_1.validateModel(data);
    return data;
}
exports.startNew = startNew;
/**
 * Restart a kernel.
 *
 * #### Notes
 * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/kernels) and validates the response model.
 *
 * The promise is fulfilled on a valid response (and thus after a restart) and rejected otherwise.
 */
async function restartKernel(id, settings = serverconnection_1.ServerConnection.makeSettings()) {
    const url = coreutils_1.URLExt.join(settings.baseUrl, exports.KERNEL_SERVICE_URL, encodeURIComponent(id), 'restart');
    const init = { method: 'POST' };
    const response = await serverconnection_1.ServerConnection.makeRequest(url, init, settings);
    if (response.status !== 200) {
        const err = await serverconnection_1.ServerConnection.ResponseError.create(response);
        throw err;
    }
    const data = await response.json();
    validate_1.validateModel(data);
}
exports.restartKernel = restartKernel;
/**
 * Interrupt a kernel.
 *
 * #### Notes
 * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/kernels) and validates the response model.
 *
 * The promise is fulfilled on a valid response and rejected otherwise.
 */
async function interruptKernel(id, settings = serverconnection_1.ServerConnection.makeSettings()) {
    const url = coreutils_1.URLExt.join(settings.baseUrl, exports.KERNEL_SERVICE_URL, encodeURIComponent(id), 'interrupt');
    const init = { method: 'POST' };
    const response = await serverconnection_1.ServerConnection.makeRequest(url, init, settings);
    if (response.status !== 204) {
        const err = await serverconnection_1.ServerConnection.ResponseError.create(response);
        throw err;
    }
}
exports.interruptKernel = interruptKernel;
/**
 * Shut down a kernel.
 *
 * @param id - The id of the running kernel.
 *
 * @param settings - The server settings for the request.
 *
 * @returns A promise that resolves when the kernel is shut down.
 *
 *
 * #### Notes
 * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/kernels) and validates the response model.
 *
 * The promise is fulfilled on a valid response and rejected otherwise.
 */
async function shutdownKernel(id, settings = serverconnection_1.ServerConnection.makeSettings()) {
    const url = coreutils_1.URLExt.join(settings.baseUrl, exports.KERNEL_SERVICE_URL, encodeURIComponent(id));
    const init = { method: 'DELETE' };
    const response = await serverconnection_1.ServerConnection.makeRequest(url, init, settings);
    if (response.status === 404) {
        const msg = `The kernel "${id}" does not exist on the server`;
        console.warn(msg);
    }
    else if (response.status !== 204) {
        const err = await serverconnection_1.ServerConnection.ResponseError.create(response);
        throw err;
    }
}
exports.shutdownKernel = shutdownKernel;
/**
 * Get a full kernel model from the server by kernel id string.
 *
 * #### Notes
 * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/kernels) and validates the response model.
 *
 * The promise is fulfilled on a valid response and rejected otherwise.
 */
async function getKernelModel(id, settings = serverconnection_1.ServerConnection.makeSettings()) {
    const url = coreutils_1.URLExt.join(settings.baseUrl, exports.KERNEL_SERVICE_URL, encodeURIComponent(id));
    const response = await serverconnection_1.ServerConnection.makeRequest(url, {}, settings);
    if (response.status === 404) {
        return undefined;
    }
    else if (response.status !== 200) {
        const err = await serverconnection_1.ServerConnection.ResponseError.create(response);
        throw err;
    }
    const data = await response.json();
    validate_1.validateModel(data);
    return data;
}
exports.getKernelModel = getKernelModel;
//# sourceMappingURL=restapi.js.map

/***/ }),

/***/ "../../packages/services/lib/kernel/serialize.js":
/*!*******************************************************!*\
  !*** ../../packages/services/lib/kernel/serialize.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.serialize = exports.deserialize = void 0;
/**
 * Deserialize and return the unpacked message.
 *
 * #### Notes
 * Handles JSON blob strings and binary messages.
 */
function deserialize(data) {
    let value;
    if (typeof data === 'string') {
        value = JSON.parse(data);
    }
    else {
        value = deserializeBinary(data);
    }
    return value;
}
exports.deserialize = deserialize;
/**
 * Serialize a kernel message for transport.
 *
 * #### Notes
 * If there is binary content, an `ArrayBuffer` is returned,
 * otherwise the message is converted to a JSON string.
 */
function serialize(msg) {
    var _a;
    let value;
    if ((_a = msg.buffers) === null || _a === void 0 ? void 0 : _a.length) {
        value = serializeBinary(msg);
    }
    else {
        value = JSON.stringify(msg);
    }
    return value;
}
exports.serialize = serialize;
/**
 * Deserialize a binary message to a Kernel Message.
 */
function deserializeBinary(buf) {
    const data = new DataView(buf);
    // read the header: 1 + nbufs 32b integers
    const nbufs = data.getUint32(0);
    const offsets = [];
    if (nbufs < 2) {
        throw new Error('Invalid incoming Kernel Message');
    }
    for (let i = 1; i <= nbufs; i++) {
        offsets.push(data.getUint32(i * 4));
    }
    const jsonBytes = new Uint8Array(buf.slice(offsets[0], offsets[1]));
    const msg = JSON.parse(new TextDecoder('utf8').decode(jsonBytes));
    // the remaining chunks are stored as DataViews in msg.buffers
    msg.buffers = [];
    for (let i = 1; i < nbufs; i++) {
        const start = offsets[i];
        const stop = offsets[i + 1] || buf.byteLength;
        msg.buffers.push(new DataView(buf.slice(start, stop)));
    }
    return msg;
}
/**
 * Implement the binary serialization protocol.
 *
 * Serialize Kernel message to ArrayBuffer.
 */
function serializeBinary(msg) {
    const offsets = [];
    const buffers = [];
    const encoder = new TextEncoder();
    let origBuffers = [];
    if (msg.buffers !== undefined) {
        origBuffers = msg.buffers;
        delete msg['buffers'];
    }
    const jsonUtf8 = encoder.encode(JSON.stringify(msg));
    buffers.push(jsonUtf8.buffer);
    for (let i = 0; i < origBuffers.length; i++) {
        // msg.buffers elements could be either views or ArrayBuffers
        // buffers elements are ArrayBuffers
        const b = origBuffers[i];
        buffers.push(ArrayBuffer.isView(b) ? b.buffer : b);
    }
    const nbufs = buffers.length;
    offsets.push(4 * (nbufs + 1));
    for (let i = 0; i + 1 < buffers.length; i++) {
        offsets.push(offsets[offsets.length - 1] + buffers[i].byteLength);
    }
    const msgBuf = new Uint8Array(offsets[offsets.length - 1] + buffers[buffers.length - 1].byteLength);
    // use DataView.setUint32 for network byte-order
    const view = new DataView(msgBuf.buffer);
    // write nbufs to first 4 bytes
    view.setUint32(0, nbufs);
    // write offsets to next 4 * nbufs bytes
    for (let i = 0; i < offsets.length; i++) {
        view.setUint32(4 * (i + 1), offsets[i]);
    }
    // write all the buffers at their respective offsets
    for (let i = 0; i < buffers.length; i++) {
        msgBuf.set(new Uint8Array(buffers[i]), offsets[i]);
    }
    return msgBuf.buffer;
}
//# sourceMappingURL=serialize.js.map

/***/ }),

/***/ "../../packages/services/lib/kernel/validate.js":
/*!******************************************************!*\
  !*** ../../packages/services/lib/kernel/validate.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateModels = exports.validateModel = exports.validateMessage = void 0;
const validate_1 = __webpack_require__(/*! ../validate */ "../../packages/services/lib/validate.js");
/**
 * Required fields for `IKernelHeader`.
 */
const HEADER_FIELDS = ['username', 'version', 'session', 'msg_id', 'msg_type'];
/**
 * Required fields and types for contents of various types of `kernel.IMessage`
 * messages on the iopub channel.
 */
const IOPUB_CONTENT_FIELDS = {
    stream: { name: 'string', text: 'string' },
    display_data: { data: 'object', metadata: 'object' },
    execute_input: { code: 'string', execution_count: 'number' },
    execute_result: {
        execution_count: 'number',
        data: 'object',
        metadata: 'object'
    },
    error: { ename: 'string', evalue: 'string', traceback: 'object' },
    status: {
        execution_state: [
            'string',
            ['starting', 'idle', 'busy', 'restarting', 'dead']
        ]
    },
    clear_output: { wait: 'boolean' },
    comm_open: { comm_id: 'string', target_name: 'string', data: 'object' },
    comm_msg: { comm_id: 'string', data: 'object' },
    comm_close: { comm_id: 'string' },
    shutdown_reply: { restart: 'boolean' } // Emitted by the IPython kernel.
};
/**
 * Validate the header of a kernel message.
 */
function validateHeader(header) {
    for (let i = 0; i < HEADER_FIELDS.length; i++) {
        validate_1.validateProperty(header, HEADER_FIELDS[i], 'string');
    }
}
/**
 * Validate a kernel message object.
 */
function validateMessage(msg) {
    validate_1.validateProperty(msg, 'metadata', 'object');
    validate_1.validateProperty(msg, 'content', 'object');
    validate_1.validateProperty(msg, 'channel', 'string');
    validateHeader(msg.header);
    if (msg.channel === 'iopub') {
        validateIOPubContent(msg);
    }
}
exports.validateMessage = validateMessage;
/**
 * Validate content an kernel message on the iopub channel.
 */
function validateIOPubContent(msg) {
    if (msg.channel === 'iopub') {
        const fields = IOPUB_CONTENT_FIELDS[msg.header.msg_type];
        // Check for unknown message type.
        if (fields === undefined) {
            return;
        }
        const names = Object.keys(fields);
        const content = msg.content;
        for (let i = 0; i < names.length; i++) {
            let args = fields[names[i]];
            if (!Array.isArray(args)) {
                args = [args];
            }
            validate_1.validateProperty(content, names[i], ...args);
        }
    }
}
/**
 * Validate a `Kernel.IModel` object.
 */
function validateModel(model) {
    validate_1.validateProperty(model, 'name', 'string');
    validate_1.validateProperty(model, 'id', 'string');
}
exports.validateModel = validateModel;
/**
 * Validate an array of `IModel` objects.
 */
function validateModels(models) {
    if (!Array.isArray(models)) {
        throw new Error('Invalid kernel list');
    }
    models.forEach(d => validateModel(d));
}
exports.validateModels = validateModels;
//# sourceMappingURL=validate.js.map

/***/ }),

/***/ "../../packages/services/lib/kernelspec/index.js":
/*!*******************************************************!*\
  !*** ../../packages/services/lib/kernelspec/index.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KernelSpecAPI = exports.KernelSpec = void 0;
const KernelSpec = __importStar(__webpack_require__(/*! ./kernelspec */ "../../packages/services/lib/kernelspec/kernelspec.js"));
exports.KernelSpec = KernelSpec;
const KernelSpecAPI = __importStar(__webpack_require__(/*! ./restapi */ "../../packages/services/lib/kernelspec/restapi.js"));
exports.KernelSpecAPI = KernelSpecAPI;
__exportStar(__webpack_require__(/*! ./manager */ "../../packages/services/lib/kernelspec/manager.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/services/lib/kernelspec/kernelspec.js":
/*!************************************************************!*\
  !*** ../../packages/services/lib/kernelspec/kernelspec.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=kernelspec.js.map

/***/ }),

/***/ "../../packages/services/lib/kernelspec/manager.js":
/*!*********************************************************!*\
  !*** ../../packages/services/lib/kernelspec/manager.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KernelSpecManager = void 0;
const coreutils_1 = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
const polling_1 = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling/@lumino/polling");
const signaling_1 = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
const restapi = __importStar(__webpack_require__(/*! ./restapi */ "../../packages/services/lib/kernelspec/restapi.js"));
const basemanager_1 = __webpack_require__(/*! ../basemanager */ "../../packages/services/lib/basemanager.js");
/**
 * An implementation of a kernel spec manager.
 */
class KernelSpecManager extends basemanager_1.BaseManager {
    /**
     * Construct a new kernel spec manager.
     *
     * @param options - The default options for kernel.
     */
    constructor(options = {}) {
        var _a;
        super(options);
        this._isReady = false;
        this._connectionFailure = new signaling_1.Signal(this);
        this._specs = null;
        this._specsChanged = new signaling_1.Signal(this);
        // Initialize internal data.
        this._ready = Promise.all([this.requestSpecs()])
            .then(_ => undefined)
            .catch(_ => undefined)
            .then(() => {
            if (this.isDisposed) {
                return;
            }
            this._isReady = true;
        });
        this._pollSpecs = new polling_1.Poll({
            auto: false,
            factory: () => this.requestSpecs(),
            frequency: {
                interval: 61 * 1000,
                backoff: true,
                max: 300 * 1000
            },
            name: `@jupyterlab/services:KernelSpecManager#specs`,
            standby: (_a = options.standby) !== null && _a !== void 0 ? _a : 'when-hidden'
        });
        void this.ready.then(() => {
            void this._pollSpecs.start();
        });
    }
    /**
     * Test whether the manager is ready.
     */
    get isReady() {
        return this._isReady;
    }
    /**
     * A promise that fulfills when the manager is ready.
     */
    get ready() {
        return this._ready;
    }
    /**
     * Get the most recently fetched kernel specs.
     */
    get specs() {
        return this._specs;
    }
    /**
     * A signal emitted when the specs change.
     */
    get specsChanged() {
        return this._specsChanged;
    }
    /**
     * A signal emitted when there is a connection failure.
     */
    get connectionFailure() {
        return this._connectionFailure;
    }
    /**
     * Dispose of the resources used by the manager.
     */
    dispose() {
        this._pollSpecs.dispose();
        super.dispose();
    }
    /**
     * Force a refresh of the specs from the server.
     *
     * @returns A promise that resolves when the specs are fetched.
     *
     * #### Notes
     * This is intended to be called only in response to a user action,
     * since the manager maintains its internal state.
     */
    async refreshSpecs() {
        await this._pollSpecs.refresh();
        await this._pollSpecs.tick;
    }
    /**
     * Execute a request to the server to poll specs and update state.
     */
    async requestSpecs() {
        const specs = await restapi.getSpecs(this.serverSettings);
        if (this.isDisposed) {
            return;
        }
        if (!coreutils_1.JSONExt.deepEqual(specs, this._specs)) {
            this._specs = specs;
            this._specsChanged.emit(specs);
        }
    }
}
exports.KernelSpecManager = KernelSpecManager;
//# sourceMappingURL=manager.js.map

/***/ }),

/***/ "../../packages/services/lib/kernelspec/restapi.js":
/*!*********************************************************!*\
  !*** ../../packages/services/lib/kernelspec/restapi.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSpecs = void 0;
const serverconnection_1 = __webpack_require__(/*! ../serverconnection */ "../../packages/services/lib/serverconnection.js");
const validate_1 = __webpack_require__(/*! ./validate */ "../../packages/services/lib/kernelspec/validate.js");
const coreutils_1 = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/**
 * The url for the kernelspec service.
 */
const KERNELSPEC_SERVICE_URL = 'api/kernelspecs';
/**
 * Fetch all of the kernel specs.
 *
 * @param settings - The optional server settings.
 * @param useCache - Whether to use the cache. If false, always request.
 *
 * @returns A promise that resolves with the kernel specs.
 *
 * #### Notes
 * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/kernelspecs).
 */
async function getSpecs(settings = serverconnection_1.ServerConnection.makeSettings()) {
    const url = coreutils_1.URLExt.join(settings.baseUrl, KERNELSPEC_SERVICE_URL);
    const response = await serverconnection_1.ServerConnection.makeRequest(url, {}, settings);
    if (response.status !== 200) {
        const err = await serverconnection_1.ServerConnection.ResponseError.create(response);
        throw err;
    }
    const data = await response.json();
    return validate_1.validateSpecModels(data);
}
exports.getSpecs = getSpecs;
//# sourceMappingURL=restapi.js.map

/***/ }),

/***/ "../../packages/services/lib/kernelspec/validate.js":
/*!**********************************************************!*\
  !*** ../../packages/services/lib/kernelspec/validate.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateSpecModels = exports.validateSpecModel = void 0;
const validate_1 = __webpack_require__(/*! ../validate */ "../../packages/services/lib/validate.js");
/**
 * Validate a server kernelspec model to a client side model.
 */
function validateSpecModel(data) {
    const spec = data.spec;
    if (!spec) {
        throw new Error('Invalid kernel spec');
    }
    validate_1.validateProperty(data, 'name', 'string');
    validate_1.validateProperty(data, 'resources', 'object');
    validate_1.validateProperty(spec, 'language', 'string');
    validate_1.validateProperty(spec, 'display_name', 'string');
    validate_1.validateProperty(spec, 'argv', 'array');
    let metadata = null;
    if (spec.hasOwnProperty('metadata')) {
        validate_1.validateProperty(spec, 'metadata', 'object');
        metadata = spec.metadata;
    }
    let env = null;
    if (spec.hasOwnProperty('env')) {
        validate_1.validateProperty(spec, 'env', 'object');
        env = spec.env;
    }
    return {
        name: data.name,
        resources: data.resources,
        language: spec.language,
        display_name: spec.display_name,
        argv: spec.argv,
        metadata,
        env
    };
}
exports.validateSpecModel = validateSpecModel;
/**
 * Validate a `Kernel.ISpecModels` object.
 */
function validateSpecModels(data) {
    if (!data.hasOwnProperty('kernelspecs')) {
        throw new Error('No kernelspecs found');
    }
    let keys = Object.keys(data.kernelspecs);
    const kernelspecs = Object.create(null);
    let defaultSpec = data.default;
    for (let i = 0; i < keys.length; i++) {
        const ks = data.kernelspecs[keys[i]];
        try {
            kernelspecs[keys[i]] = validateSpecModel(ks);
        }
        catch (err) {
            // Remove the errant kernel spec.
            console.warn(`Removing errant kernel spec: ${keys[i]}`);
        }
    }
    keys = Object.keys(kernelspecs);
    if (!keys.length) {
        throw new Error('No valid kernelspecs found');
    }
    if (!defaultSpec ||
        typeof defaultSpec !== 'string' ||
        !(defaultSpec in kernelspecs)) {
        defaultSpec = keys[0];
        console.warn(`Default kernel not found, using '${keys[0]}'`);
    }
    return {
        default: defaultSpec,
        kernelspecs
    };
}
exports.validateSpecModels = validateSpecModels;
//# sourceMappingURL=validate.js.map

/***/ }),

/***/ "../../packages/services/lib/manager.js":
/*!**********************************************!*\
  !*** ../../packages/services/lib/manager.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceManager = void 0;
const signaling_1 = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
const builder_1 = __webpack_require__(/*! ./builder */ "../../packages/services/lib/builder/index.js");
const nbconvert_1 = __webpack_require__(/*! ./nbconvert */ "../../packages/services/lib/nbconvert/index.js");
const contents_1 = __webpack_require__(/*! ./contents */ "../../packages/services/lib/contents/index.js");
const kernelspec_1 = __webpack_require__(/*! ./kernelspec */ "../../packages/services/lib/kernelspec/index.js");
const session_1 = __webpack_require__(/*! ./session */ "../../packages/services/lib/session/index.js");
const setting_1 = __webpack_require__(/*! ./setting */ "../../packages/services/lib/setting/index.js");
const terminal_1 = __webpack_require__(/*! ./terminal */ "../../packages/services/lib/terminal/index.js");
const serverconnection_1 = __webpack_require__(/*! ./serverconnection */ "../../packages/services/lib/serverconnection.js");
const workspace_1 = __webpack_require__(/*! ./workspace */ "../../packages/services/lib/workspace/index.js");
const kernel_1 = __webpack_require__(/*! ./kernel */ "../../packages/services/lib/kernel/index.js");
/**
 * A Jupyter services manager.
 */
class ServiceManager {
    /**
     * Construct a new services provider.
     */
    constructor(options = {}) {
        var _a, _b;
        this._isDisposed = false;
        this._connectionFailure = new signaling_1.Signal(this);
        this._isReady = false;
        const defaultDrive = options.defaultDrive;
        const serverSettings = (_a = options.serverSettings) !== null && _a !== void 0 ? _a : serverconnection_1.ServerConnection.makeSettings();
        const standby = (_b = options.standby) !== null && _b !== void 0 ? _b : 'when-hidden';
        const normalized = { defaultDrive, serverSettings, standby };
        const kernelManager = new kernel_1.KernelManager(normalized);
        this.serverSettings = serverSettings;
        this.contents = new contents_1.ContentsManager(normalized);
        this.sessions = new session_1.SessionManager(Object.assign(Object.assign({}, normalized), { kernelManager: kernelManager }));
        this.settings = new setting_1.SettingManager(normalized);
        this.terminals = new terminal_1.TerminalManager(normalized);
        this.builder = new builder_1.BuildManager(normalized);
        this.workspaces = new workspace_1.WorkspaceManager(normalized);
        this.nbconvert = new nbconvert_1.NbConvertManager(normalized);
        this.kernelspecs = new kernelspec_1.KernelSpecManager(normalized);
        // Relay connection failures from the service managers that poll
        // the server for current information.
        this.kernelspecs.connectionFailure.connect(this._onConnectionFailure, this);
        this.sessions.connectionFailure.connect(this._onConnectionFailure, this);
        this.terminals.connectionFailure.connect(this._onConnectionFailure, this);
        const readyList = [this.sessions.ready, this.kernelspecs.ready];
        if (this.terminals.isAvailable()) {
            readyList.push(this.terminals.ready);
        }
        this._readyPromise = Promise.all(readyList).then(() => {
            this._isReady = true;
        });
    }
    /**
     * A signal emitted when there is a connection failure with the kernel.
     */
    get connectionFailure() {
        return this._connectionFailure;
    }
    /**
     * Test whether the service manager is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources used by the manager.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        signaling_1.Signal.clearData(this);
        this.contents.dispose();
        this.sessions.dispose();
        this.terminals.dispose();
    }
    /**
     * Test whether the manager is ready.
     */
    get isReady() {
        return this._isReady;
    }
    /**
     * A promise that fulfills when the manager is ready.
     */
    get ready() {
        return this._readyPromise;
    }
    _onConnectionFailure(sender, err) {
        this._connectionFailure.emit(err);
    }
}
exports.ServiceManager = ServiceManager;
//# sourceMappingURL=manager.js.map

/***/ }),

/***/ "../../packages/services/lib/nbconvert/index.js":
/*!******************************************************!*\
  !*** ../../packages/services/lib/nbconvert/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NbConvertManager = void 0;
const coreutils_1 = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
const serverconnection_1 = __webpack_require__(/*! ../serverconnection */ "../../packages/services/lib/serverconnection.js");
/**
 * The url for the lab nbconvert service.
 */
const NBCONVERT_SETTINGS_URL = 'api/nbconvert';
/**
 * The nbconvert API service manager.
 */
class NbConvertManager {
    /**
     * Create a new nbconvert manager.
     */
    constructor(options = {}) {
        var _a;
        this.serverSettings = (_a = options.serverSettings) !== null && _a !== void 0 ? _a : serverconnection_1.ServerConnection.makeSettings();
    }
    /**
     * Get whether the application should be built.
     */
    async getExportFormats() {
        const base = this.serverSettings.baseUrl;
        const url = coreutils_1.URLExt.join(base, NBCONVERT_SETTINGS_URL);
        const { serverSettings } = this;
        const response = await serverconnection_1.ServerConnection.makeRequest(url, {}, serverSettings);
        if (response.status !== 200) {
            const err = await serverconnection_1.ServerConnection.ResponseError.create(response);
            throw err;
        }
        const data = await response.json();
        const exportList = {};
        const keys = Object.keys(data);
        keys.forEach(function (key) {
            const mimeType = data[key].output_mimetype;
            exportList[key] = { output_mimetype: mimeType };
        });
        return exportList;
    }
}
exports.NbConvertManager = NbConvertManager;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/services/lib/serverconnection.js":
/*!*******************************************************!*\
  !*** ../../packages/services/lib/serverconnection.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "../../node_modules/process/browser.js");

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServerConnection = void 0;
const coreutils_1 = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
let FETCH;
let HEADERS;
let REQUEST;
let WEBSOCKET;
if (typeof window === 'undefined') {
    // Mangle the require statements so it does not get picked up in the
    // browser assets.
    /* tslint:disable */
    const fetchMod = __webpack_require__(/*! node-fetch */ "node-fetch");
    FETCH = (_a = __webpack_require__.g.fetch) !== null && _a !== void 0 ? _a : fetchMod;
    REQUEST = (_b = __webpack_require__.g.Request) !== null && _b !== void 0 ? _b : fetchMod.Request;
    HEADERS = (_c = __webpack_require__.g.Headers) !== null && _c !== void 0 ? _c : fetchMod.Headers;
    WEBSOCKET = __webpack_require__(/*! ws */ "ws");
    /* tslint:enable */
}
else {
    FETCH = fetch;
    REQUEST = Request;
    HEADERS = Headers;
    WEBSOCKET = WebSocket;
}
/**
 * The namespace for ServerConnection functions.
 *
 * #### Notes
 * This is only intended to manage communication with the Jupyter server.
 *
 * The default values can be used in a JupyterLab or Jupyter Notebook context.
 *
 * We use `token` authentication if available, falling back on an XSRF
 * cookie if one has been provided on the `document`.
 *
 * A content type of `'application/json'` is added when using authentication
 * and there is no body data to allow the server to prevent malicious forms.
 */
var ServerConnection;
(function (ServerConnection) {
    /**
     * Create a settings object given a subset of options.
     *
     * @param options - An optional partial set of options.
     *
     * @returns The full settings object.
     */
    function makeSettings(options) {
        return Private.makeSettings(options);
    }
    ServerConnection.makeSettings = makeSettings;
    /**
     * Make an request to the notebook server.
     *
     * @param url - The url for the request.
     *
     * @param init - The initialization options for the request.
     *
     * @param settings - The server settings to apply to the request.
     *
     * @returns a Promise that resolves with the response.
     *
     * @throws If the url of the request is not a notebook server url.
     *
     * #### Notes
     * The `url` must start with `settings.baseUrl`.  The `init` settings are
     * merged with `settings.init`, with `init` taking precedence.
     * The headers in the two objects are not merged.
     * If there is no body data, we set the content type to `application/json`
     * because it is required by the Notebook server.
     */
    function makeRequest(url, init, settings) {
        return Private.handleRequest(url, init, settings);
    }
    ServerConnection.makeRequest = makeRequest;
    /**
     * A wrapped error for a fetch response.
     */
    class ResponseError extends Error {
        /**
         * Create a new response error.
         */
        constructor(response, message = `Invalid response: ${response.status} ${response.statusText}`, traceback = '') {
            super(message);
            this.response = response;
            this.traceback = traceback;
        }
        /**
         * Create a ResponseError from a response, handling the traceback and message
         * as appropriate.
         *
         * @param response The response object.
         *
         * @returns A promise that resolves with a `ResponseError` object.
         */
        static async create(response) {
            try {
                const data = await response.json();
                if (data['traceback']) {
                    console.error(data['traceback']);
                }
                if (data['message']) {
                    return new ResponseError(response, data['message']);
                }
                return new ResponseError(response);
            }
            catch (e) {
                console.debug(e);
                return new ResponseError(response);
            }
        }
    }
    ServerConnection.ResponseError = ResponseError;
    /**
     * A wrapped error for a network error.
     */
    class NetworkError extends TypeError {
        /**
         * Create a new network error.
         */
        constructor(original) {
            super(original.message);
            this.stack = original.stack;
        }
    }
    ServerConnection.NetworkError = NetworkError;
})(ServerConnection = exports.ServerConnection || (exports.ServerConnection = {}));
/**
 * The namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * Handle the server connection settings, returning a new value.
     */
    function makeSettings(options = {}) {
        var _a;
        const pageBaseUrl = coreutils_1.PageConfig.getBaseUrl();
        const pageWsUrl = coreutils_1.PageConfig.getWsUrl();
        const baseUrl = coreutils_1.URLExt.normalize(options.baseUrl) || pageBaseUrl;
        let wsUrl = options.wsUrl;
        // Prefer the default wsUrl if we are using the default baseUrl.
        if (!wsUrl && baseUrl === pageBaseUrl) {
            wsUrl = pageWsUrl;
        }
        // Otherwise convert the baseUrl to a wsUrl if possible.
        if (!wsUrl && baseUrl.indexOf('http') === 0) {
            wsUrl = 'ws' + baseUrl.slice(4);
        }
        // Otherwise fall back on the default wsUrl.
        wsUrl = wsUrl !== null && wsUrl !== void 0 ? wsUrl : pageWsUrl;
        return Object.assign(Object.assign({ init: { cache: 'no-store', credentials: 'same-origin' }, fetch: FETCH, Headers: HEADERS, Request: REQUEST, WebSocket: WEBSOCKET, token: coreutils_1.PageConfig.getToken(), appUrl: coreutils_1.PageConfig.getOption('appUrl'), appendToken: typeof window === 'undefined' ||
                (typeof process !== 'undefined' &&
                    ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.JEST_WORKER_ID) !== undefined) ||
                coreutils_1.URLExt.getHostName(pageBaseUrl) !== coreutils_1.URLExt.getHostName(wsUrl) }, options), { baseUrl,
            wsUrl });
    }
    Private.makeSettings = makeSettings;
    /**
     * Handle a request.
     *
     * @param url - The url for the request.
     *
     * @param init - The overrides for the request init.
     *
     * @param settings - The settings object for the request.
     *
     * #### Notes
     * The `url` must start with `settings.baseUrl`.  The `init` settings
     * take precedence over `settings.init`.
     */
    function handleRequest(url, init, settings) {
        var _a;
        // Handle notebook server requests.
        if (url.indexOf(settings.baseUrl) !== 0) {
            throw new Error('Can only be used for notebook server requests');
        }
        // Use explicit cache buster when `no-store` is set since
        // not all browsers use it properly.
        const cache = (_a = init.cache) !== null && _a !== void 0 ? _a : settings.init.cache;
        if (cache === 'no-store') {
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
            url += (/\?/.test(url) ? '&' : '?') + new Date().getTime();
        }
        const request = new settings.Request(url, Object.assign(Object.assign({}, settings.init), init));
        // Handle authentication. Authentication can be overdetermined by
        // settings token and XSRF token.
        let authenticated = false;
        if (settings.token) {
            authenticated = true;
            request.headers.append('Authorization', `token ${settings.token}`);
        }
        if (typeof document !== 'undefined' && (document === null || document === void 0 ? void 0 : document.cookie)) {
            const xsrfToken = getCookie('_xsrf');
            if (xsrfToken !== undefined) {
                authenticated = true;
                request.headers.append('X-XSRFToken', xsrfToken);
            }
        }
        // Set the content type if there is no given data and we are
        // using an authenticated connection.
        if (!request.headers.has('Content-Type') && authenticated) {
            request.headers.set('Content-Type', 'application/json');
        }
        // Use `call` to avoid a `TypeError` in the browser.
        return settings.fetch.call(null, request).catch((e) => {
            // Convert the TypeError into a more specific error.
            throw new ServerConnection.NetworkError(e);
        });
        // TODO: *this* is probably where we need a system-wide connectionFailure
        // signal we can hook into.
    }
    Private.handleRequest = handleRequest;
    /**
     * Get a cookie from the document.
     */
    function getCookie(name) {
        // From http://www.tornadoweb.org/en/stable/guide/security.html
        const matches = document.cookie.match('\\b' + name + '=([^;]*)\\b');
        return matches === null || matches === void 0 ? void 0 : matches[1];
    }
})(Private || (Private = {}));
//# sourceMappingURL=serverconnection.js.map

/***/ }),

/***/ "../../packages/services/lib/session/default.js":
/*!******************************************************!*\
  !*** ../../packages/services/lib/session/default.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionConnection = void 0;
const signaling_1 = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
const __1 = __webpack_require__(/*! .. */ "../../packages/services/lib/index.js");
const restapi_1 = __webpack_require__(/*! ./restapi */ "../../packages/services/lib/session/restapi.js");
const coreutils_1 = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/**
 * Session object for accessing the session REST api. The session
 * should be used to start kernels and then shut them down -- for
 * all other kernel operations, the kernel object should be used.
 */
class SessionConnection {
    /**
     * Construct a new session.
     */
    constructor(options) {
        var _a, _b, _c, _d;
        this._id = '';
        this._path = '';
        this._name = '';
        this._type = '';
        this._kernel = null;
        this._isDisposed = false;
        this._disposed = new signaling_1.Signal(this);
        this._kernelChanged = new signaling_1.Signal(this);
        this._statusChanged = new signaling_1.Signal(this);
        this._connectionStatusChanged = new signaling_1.Signal(this);
        this._pendingInput = new signaling_1.Signal(this);
        this._iopubMessage = new signaling_1.Signal(this);
        this._unhandledMessage = new signaling_1.Signal(this);
        this._anyMessage = new signaling_1.Signal(this);
        this._propertyChanged = new signaling_1.Signal(this);
        this._id = options.model.id;
        this._name = options.model.name;
        this._path = options.model.path;
        this._type = options.model.type;
        this._username = (_a = options.username) !== null && _a !== void 0 ? _a : '';
        this._clientId = (_b = options.clientId) !== null && _b !== void 0 ? _b : coreutils_1.UUID.uuid4();
        this._connectToKernel = options.connectToKernel;
        this._kernelConnectionOptions = (_c = options.kernelConnectionOptions) !== null && _c !== void 0 ? _c : {};
        this.serverSettings = (_d = options.serverSettings) !== null && _d !== void 0 ? _d : __1.ServerConnection.makeSettings();
        this.setupKernel(options.model.kernel);
    }
    /**
     * A signal emitted when the session is disposed.
     */
    get disposed() {
        return this._disposed;
    }
    /**
     * A signal emitted when the kernel changes.
     */
    get kernelChanged() {
        return this._kernelChanged;
    }
    /**
     * A signal proxied from the connection about the kernel status.
     */
    get statusChanged() {
        return this._statusChanged;
    }
    /**
     * A signal proxied from the kernel about the connection status.
     */
    get connectionStatusChanged() {
        return this._connectionStatusChanged;
    }
    /**
     * A signal proxied from the kernel pending input.
     */
    get pendingInput() {
        return this._pendingInput;
    }
    /**
     * A signal proxied from the kernel about iopub kernel messages.
     */
    get iopubMessage() {
        return this._iopubMessage;
    }
    /**
     * A signal proxied from the kernel for an unhandled kernel message.
     */
    get unhandledMessage() {
        return this._unhandledMessage;
    }
    /**
     * A signal proxied from the kernel emitted for any kernel message.
     *
     * #### Notes
     * The behavior is undefined if the message is modified during message
     * handling. As such, it should be treated as read-only.
     */
    get anyMessage() {
        return this._anyMessage;
    }
    /**
     * A signal emitted when a session property changes.
     */
    get propertyChanged() {
        return this._propertyChanged;
    }
    /**
     * Get the session id.
     */
    get id() {
        return this._id;
    }
    /**
     * Get the session kernel connection object.
     *
     * #### Notes
     * This is a read-only property, and can be altered by [changeKernel].
     */
    get kernel() {
        return this._kernel;
    }
    /**
     * Get the session path.
     */
    get path() {
        return this._path;
    }
    /**
     * Get the session type.
     */
    get type() {
        return this._type;
    }
    /**
     * Get the session name.
     */
    get name() {
        return this._name;
    }
    /**
     * Get the model associated with the session.
     */
    get model() {
        return {
            id: this.id,
            kernel: this.kernel && { id: this.kernel.id, name: this.kernel.name },
            path: this._path,
            type: this._type,
            name: this._name
        };
    }
    /**
     * Test whether the session has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Update the session based on a session model from the server.
     *
     * #### Notes
     * This only updates this session connection instance. Use `setPath`,
     * `setName`, `setType`, and `changeKernel` to change the session values on
     * the server.
     */
    update(model) {
        const oldModel = this.model;
        this._path = model.path;
        this._name = model.name;
        this._type = model.type;
        if ((this._kernel === null && model.kernel !== null) ||
            (this._kernel !== null && model.kernel === null) ||
            (this._kernel !== null &&
                model.kernel !== null &&
                this._kernel.id !== model.kernel.id)) {
            if (this._kernel !== null) {
                this._kernel.dispose();
            }
            const oldValue = this._kernel || null;
            this.setupKernel(model.kernel);
            const newValue = this._kernel || null;
            this._kernelChanged.emit({ name: 'kernel', oldValue, newValue });
        }
        this._handleModelChange(oldModel);
    }
    /**
     * Dispose of the resources held by the session.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        this._disposed.emit();
        if (this._kernel) {
            this._kernel.dispose();
            const oldValue = this._kernel;
            this._kernel = null;
            const newValue = this._kernel;
            this._kernelChanged.emit({ name: 'kernel', oldValue, newValue });
        }
        signaling_1.Signal.clearData(this);
    }
    /**
     * Change the session path.
     *
     * @param path - The new session path.
     *
     * @returns A promise that resolves when the session has renamed.
     *
     * #### Notes
     * This uses the Jupyter REST API, and the response is validated.
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    async setPath(path) {
        if (this.isDisposed) {
            throw new Error('Session is disposed');
        }
        await this._patch({ path });
    }
    /**
     * Change the session name.
     */
    async setName(name) {
        if (this.isDisposed) {
            throw new Error('Session is disposed');
        }
        await this._patch({ name });
    }
    /**
     * Change the session type.
     */
    async setType(type) {
        if (this.isDisposed) {
            throw new Error('Session is disposed');
        }
        await this._patch({ type });
    }
    /**
     * Change the kernel.
     *
     * @params options - The name or id of the new kernel.
     *
     * #### Notes
     * This shuts down the existing kernel and creates a new kernel,
     * keeping the existing session ID and session path.
     */
    async changeKernel(options) {
        if (this.isDisposed) {
            throw new Error('Session is disposed');
        }
        await this._patch({ kernel: options });
        return this.kernel;
    }
    /**
     * Kill the kernel and shutdown the session.
     *
     * @returns - The promise fulfilled on a valid response from the server.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml#!/sessions), and validates the response.
     * Disposes of the session and emits a [sessionDied] signal on success.
     */
    async shutdown() {
        if (this.isDisposed) {
            throw new Error('Session is disposed');
        }
        await restapi_1.shutdownSession(this.id, this.serverSettings);
        this.dispose();
    }
    /**
     * Create a new kernel connection and connect to its signals.
     *
     * #### Notes
     * This method is not meant to be subclassed.
     */
    setupKernel(model) {
        if (model === null) {
            this._kernel = null;
            return;
        }
        const kc = this._connectToKernel(Object.assign(Object.assign({}, this._kernelConnectionOptions), { model, username: this._username, clientId: this._clientId, serverSettings: this.serverSettings }));
        this._kernel = kc;
        kc.statusChanged.connect(this.onKernelStatus, this);
        kc.connectionStatusChanged.connect(this.onKernelConnectionStatus, this);
        kc.pendingInput.connect(this.onPendingInput, this);
        kc.unhandledMessage.connect(this.onUnhandledMessage, this);
        kc.iopubMessage.connect(this.onIOPubMessage, this);
        kc.anyMessage.connect(this.onAnyMessage, this);
    }
    /**
     * Handle to changes in the Kernel status.
     */
    onKernelStatus(sender, state) {
        this._statusChanged.emit(state);
    }
    /**
     * Handle to changes in the Kernel status.
     */
    onKernelConnectionStatus(sender, state) {
        this._connectionStatusChanged.emit(state);
    }
    /**
     * Handle a change in the pendingInput.
     */
    onPendingInput(sender, state) {
        this._pendingInput.emit(state);
    }
    /**
     * Handle iopub kernel messages.
     */
    onIOPubMessage(sender, msg) {
        this._iopubMessage.emit(msg);
    }
    /**
     * Handle unhandled kernel messages.
     */
    onUnhandledMessage(sender, msg) {
        this._unhandledMessage.emit(msg);
    }
    /**
     * Handle any kernel messages.
     */
    onAnyMessage(sender, args) {
        this._anyMessage.emit(args);
    }
    /**
     * Send a PATCH to the server, updating the session path or the kernel.
     */
    async _patch(body) {
        const model = await restapi_1.updateSession(Object.assign(Object.assign({}, body), { id: this._id }), this.serverSettings);
        this.update(model);
        return model;
    }
    /**
     * Handle a change to the model.
     */
    _handleModelChange(oldModel) {
        if (oldModel.name !== this._name) {
            this._propertyChanged.emit('name');
        }
        if (oldModel.type !== this._type) {
            this._propertyChanged.emit('type');
        }
        if (oldModel.path !== this._path) {
            this._propertyChanged.emit('path');
        }
    }
}
exports.SessionConnection = SessionConnection;
//# sourceMappingURL=default.js.map

/***/ }),

/***/ "../../packages/services/lib/session/index.js":
/*!****************************************************!*\
  !*** ../../packages/services/lib/session/index.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionAPI = exports.Session = void 0;
const Session = __importStar(__webpack_require__(/*! ./session */ "../../packages/services/lib/session/session.js"));
exports.Session = Session;
const SessionAPI = __importStar(__webpack_require__(/*! ./restapi */ "../../packages/services/lib/session/restapi.js"));
exports.SessionAPI = SessionAPI;
__exportStar(__webpack_require__(/*! ./manager */ "../../packages/services/lib/session/manager.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/services/lib/session/manager.js":
/*!******************************************************!*\
  !*** ../../packages/services/lib/session/manager.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionManager = void 0;
const algorithm_1 = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
const polling_1 = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling/@lumino/polling");
const signaling_1 = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
const serverconnection_1 = __webpack_require__(/*! ../serverconnection */ "../../packages/services/lib/serverconnection.js");
const basemanager_1 = __webpack_require__(/*! ../basemanager */ "../../packages/services/lib/basemanager.js");
const default_1 = __webpack_require__(/*! ./default */ "../../packages/services/lib/session/default.js");
const restapi_1 = __webpack_require__(/*! ./restapi */ "../../packages/services/lib/session/restapi.js");
/**
 * An implementation of a session manager.
 */
class SessionManager extends basemanager_1.BaseManager {
    /**
     * Construct a new session manager.
     *
     * @param options - The default options for each session.
     */
    constructor(options) {
        var _a;
        super(options);
        this._isReady = false;
        this._sessionConnections = new Set();
        this._models = new Map();
        this._runningChanged = new signaling_1.Signal(this);
        this._connectionFailure = new signaling_1.Signal(this);
        // We define these here so they bind `this` correctly
        this._connectToKernel = (options) => {
            return this._kernelManager.connectTo(options);
        };
        this._kernelManager = options.kernelManager;
        // Start model polling with exponential backoff.
        this._pollModels = new polling_1.Poll({
            auto: false,
            factory: () => this.requestRunning(),
            frequency: {
                interval: 10 * 1000,
                backoff: true,
                max: 300 * 1000
            },
            name: `@jupyterlab/services:SessionManager#models`,
            standby: (_a = options.standby) !== null && _a !== void 0 ? _a : 'when-hidden'
        });
        // Initialize internal data.
        this._ready = (async () => {
            await this._pollModels.start();
            await this._pollModels.tick;
            await this._kernelManager.ready;
            this._isReady = true;
        })();
    }
    /**
     * Test whether the manager is ready.
     */
    get isReady() {
        return this._isReady;
    }
    /**
     * A promise that fulfills when the manager is ready.
     */
    get ready() {
        return this._ready;
    }
    /**
     * A signal emitted when the running sessions change.
     */
    get runningChanged() {
        return this._runningChanged;
    }
    /**
     * A signal emitted when there is a connection failure.
     */
    get connectionFailure() {
        return this._connectionFailure;
    }
    /**
     * Dispose of the resources used by the manager.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._models.clear();
        this._sessionConnections.forEach(x => x.dispose());
        this._pollModels.dispose();
        super.dispose();
    }
    /*
     * Connect to a running session.  See also [[connectToSession]].
     */
    connectTo(options) {
        const sessionConnection = new default_1.SessionConnection(Object.assign(Object.assign({}, options), { connectToKernel: this._connectToKernel, serverSettings: this.serverSettings }));
        this._onStarted(sessionConnection);
        if (!this._models.has(options.model.id)) {
            // We trust the user to connect to an existing session, but we verify
            // asynchronously.
            void this.refreshRunning().catch(() => {
                /* no-op */
            });
        }
        return sessionConnection;
    }
    /**
     * Create an iterator over the most recent running sessions.
     *
     * @returns A new iterator over the running sessions.
     */
    running() {
        return algorithm_1.iter([...this._models.values()]);
    }
    /**
     * Force a refresh of the running sessions.
     *
     * @returns A promise that with the list of running sessions.
     *
     * #### Notes
     * This is not typically meant to be called by the user, since the
     * manager maintains its own internal state.
     */
    async refreshRunning() {
        await this._pollModels.refresh();
        await this._pollModels.tick;
    }
    /**
     * Start a new session.  See also [[startNewSession]].
     *
     * @param createOptions - Options for creating the session
     *
     * @param connectOptions - Options for connecting to the session
     */
    async startNew(createOptions, connectOptions = {}) {
        const model = await restapi_1.startSession(createOptions, this.serverSettings);
        await this.refreshRunning();
        return this.connectTo(Object.assign(Object.assign({}, connectOptions), { model }));
    }
    /**
     * Shut down a session by id.
     */
    async shutdown(id) {
        await restapi_1.shutdownSession(id, this.serverSettings);
        await this.refreshRunning();
    }
    /**
     * Shut down all sessions.
     *
     * @returns A promise that resolves when all of the kernels are shut down.
     */
    async shutdownAll() {
        // Update the list of models to make sure our list is current.
        await this.refreshRunning();
        // Shut down all models.
        await Promise.all([...this._models.keys()].map(id => restapi_1.shutdownSession(id, this.serverSettings)));
        // Update the list of models to clear out our state.
        await this.refreshRunning();
    }
    /**
     * Find a session associated with a path and stop it if it is the only session
     * using that kernel.
     *
     * @param path - The path in question.
     *
     * @returns A promise that resolves when the relevant sessions are stopped.
     */
    async stopIfNeeded(path) {
        try {
            const sessions = await restapi_1.listRunning(this.serverSettings);
            const matches = sessions.filter(value => value.path === path);
            if (matches.length === 1) {
                const id = matches[0].id;
                await this.shutdown(id);
            }
        }
        catch (error) {
            /* Always succeed. */
        }
    }
    /**
     * Find a session by id.
     */
    async findById(id) {
        if (this._models.has(id)) {
            return this._models.get(id);
        }
        await this.refreshRunning();
        return this._models.get(id);
    }
    /**
     * Find a session by path.
     */
    async findByPath(path) {
        for (const m of this._models.values()) {
            if (m.path === path) {
                return m;
            }
        }
        await this.refreshRunning();
        for (const m of this._models.values()) {
            if (m.path === path) {
                return m;
            }
        }
        return undefined;
    }
    /**
     * Execute a request to the server to poll running kernels and update state.
     */
    async requestRunning() {
        var _a, _b;
        let models;
        try {
            models = await restapi_1.listRunning(this.serverSettings);
        }
        catch (err) {
            // Handle network errors, as well as cases where we are on a
            // JupyterHub and the server is not running. JupyterHub returns a
            // 503 (<2.0) or 424 (>2.0) in that case.
            if (err instanceof serverconnection_1.ServerConnection.NetworkError ||
                ((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) === 503 ||
                ((_b = err.response) === null || _b === void 0 ? void 0 : _b.status) === 424) {
                this._connectionFailure.emit(err);
            }
            throw err;
        }
        if (this.isDisposed) {
            return;
        }
        if (this._models.size === models.length &&
            algorithm_1.every(models, x => {
                var _a, _b, _c, _d;
                const existing = this._models.get(x.id);
                if (!existing) {
                    return false;
                }
                return (((_a = existing.kernel) === null || _a === void 0 ? void 0 : _a.id) === ((_b = x.kernel) === null || _b === void 0 ? void 0 : _b.id) &&
                    ((_c = existing.kernel) === null || _c === void 0 ? void 0 : _c.name) === ((_d = x.kernel) === null || _d === void 0 ? void 0 : _d.name) &&
                    existing.name === x.name &&
                    existing.path === x.path &&
                    existing.type === x.type);
            })) {
            // Identical models list (presuming models does not contain duplicate
            // ids), so just return
            return;
        }
        this._models = new Map(models.map(x => [x.id, x]));
        this._sessionConnections.forEach(sc => {
            if (this._models.has(sc.id)) {
                sc.update(this._models.get(sc.id));
            }
            else {
                sc.dispose();
            }
        });
        this._runningChanged.emit(models);
    }
    /**
     * Handle a session starting.
     */
    _onStarted(sessionConnection) {
        this._sessionConnections.add(sessionConnection);
        sessionConnection.disposed.connect(this._onDisposed, this);
        sessionConnection.propertyChanged.connect(this._onChanged, this);
        sessionConnection.kernelChanged.connect(this._onChanged, this);
    }
    _onDisposed(sessionConnection) {
        this._sessionConnections.delete(sessionConnection);
        // A session termination emission could mean the server session is deleted,
        // or that the session JS object is disposed and the session still exists on
        // the server, so we refresh from the server to make sure we reflect the
        // server state.
        void this.refreshRunning().catch(() => {
            /* no-op */
        });
    }
    _onChanged() {
        void this.refreshRunning().catch(() => {
            /* no-op */
        });
    }
}
exports.SessionManager = SessionManager;
//# sourceMappingURL=manager.js.map

/***/ }),

/***/ "../../packages/services/lib/session/restapi.js":
/*!******************************************************!*\
  !*** ../../packages/services/lib/session/restapi.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateSession = exports.startSession = exports.getSessionModel = exports.shutdownSession = exports.getSessionUrl = exports.listRunning = exports.SESSION_SERVICE_URL = void 0;
const serverconnection_1 = __webpack_require__(/*! ../serverconnection */ "../../packages/services/lib/serverconnection.js");
const coreutils_1 = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
const validate_1 = __webpack_require__(/*! ./validate */ "../../packages/services/lib/session/validate.js");
/**
 * The url for the session service.
 */
exports.SESSION_SERVICE_URL = 'api/sessions';
/**
 * List the running sessions.
 */
async function listRunning(settings = serverconnection_1.ServerConnection.makeSettings()) {
    const url = coreutils_1.URLExt.join(settings.baseUrl, exports.SESSION_SERVICE_URL);
    const response = await serverconnection_1.ServerConnection.makeRequest(url, {}, settings);
    if (response.status !== 200) {
        const err = await serverconnection_1.ServerConnection.ResponseError.create(response);
        throw err;
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error('Invalid Session list');
    }
    data.forEach(m => {
        validate_1.updateLegacySessionModel(m);
        validate_1.validateModel(m);
    });
    return data;
}
exports.listRunning = listRunning;
/**
 * Get a session url.
 */
function getSessionUrl(baseUrl, id) {
    return coreutils_1.URLExt.join(baseUrl, exports.SESSION_SERVICE_URL, id);
}
exports.getSessionUrl = getSessionUrl;
/**
 * Shut down a session by id.
 */
async function shutdownSession(id, settings = serverconnection_1.ServerConnection.makeSettings()) {
    var _a;
    const url = getSessionUrl(settings.baseUrl, id);
    const init = { method: 'DELETE' };
    const response = await serverconnection_1.ServerConnection.makeRequest(url, init, settings);
    if (response.status === 404) {
        const data = await response.json();
        const msg = (_a = data.message) !== null && _a !== void 0 ? _a : `The session "${id}"" does not exist on the server`;
        console.warn(msg);
    }
    else if (response.status === 410) {
        throw new serverconnection_1.ServerConnection.ResponseError(response, 'The kernel was deleted but the session was not');
    }
    else if (response.status !== 204) {
        const err = await serverconnection_1.ServerConnection.ResponseError.create(response);
        throw err;
    }
}
exports.shutdownSession = shutdownSession;
/**
 * Get a full session model from the server by session id string.
 */
async function getSessionModel(id, settings = serverconnection_1.ServerConnection.makeSettings()) {
    const url = getSessionUrl(settings.baseUrl, id);
    const response = await serverconnection_1.ServerConnection.makeRequest(url, {}, settings);
    if (response.status !== 200) {
        const err = await serverconnection_1.ServerConnection.ResponseError.create(response);
        throw err;
    }
    const data = await response.json();
    validate_1.updateLegacySessionModel(data);
    validate_1.validateModel(data);
    return data;
}
exports.getSessionModel = getSessionModel;
/**
 * Create a new session, or return an existing session if the session path
 * already exists.
 */
async function startSession(options, settings = serverconnection_1.ServerConnection.makeSettings()) {
    const url = coreutils_1.URLExt.join(settings.baseUrl, exports.SESSION_SERVICE_URL);
    const init = {
        method: 'POST',
        body: JSON.stringify(options)
    };
    const response = await serverconnection_1.ServerConnection.makeRequest(url, init, settings);
    if (response.status !== 201) {
        const err = await serverconnection_1.ServerConnection.ResponseError.create(response);
        throw err;
    }
    const data = await response.json();
    validate_1.updateLegacySessionModel(data);
    validate_1.validateModel(data);
    return data;
}
exports.startSession = startSession;
/**
 * Send a PATCH to the server, updating the session path or the kernel.
 */
async function updateSession(model, settings = serverconnection_1.ServerConnection.makeSettings()) {
    const url = getSessionUrl(settings.baseUrl, model.id);
    const init = {
        method: 'PATCH',
        body: JSON.stringify(model)
    };
    const response = await serverconnection_1.ServerConnection.makeRequest(url, init, settings);
    if (response.status !== 200) {
        const err = await serverconnection_1.ServerConnection.ResponseError.create(response);
        throw err;
    }
    const data = await response.json();
    validate_1.updateLegacySessionModel(data);
    validate_1.validateModel(data);
    return data;
}
exports.updateSession = updateSession;
//# sourceMappingURL=restapi.js.map

/***/ }),

/***/ "../../packages/services/lib/session/session.js":
/*!******************************************************!*\
  !*** ../../packages/services/lib/session/session.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=session.js.map

/***/ }),

/***/ "../../packages/services/lib/session/validate.js":
/*!*******************************************************!*\
  !*** ../../packages/services/lib/session/validate.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateModels = exports.updateLegacySessionModel = exports.validateModel = void 0;
const validate_1 = __webpack_require__(/*! ../kernel/validate */ "../../packages/services/lib/kernel/validate.js");
const validate_2 = __webpack_require__(/*! ../validate */ "../../packages/services/lib/validate.js");
/**
 * Validate an `Session.IModel` object.
 */
function validateModel(data) {
    validate_2.validateProperty(data, 'id', 'string');
    validate_2.validateProperty(data, 'type', 'string');
    validate_2.validateProperty(data, 'name', 'string');
    validate_2.validateProperty(data, 'path', 'string');
    validate_2.validateProperty(data, 'kernel', 'object');
    validate_1.validateModel(data.kernel);
}
exports.validateModel = validateModel;
/**
 * Update model from legacy session data.
 */
function updateLegacySessionModel(data) {
    if (data.path === undefined && data.notebook !== undefined) {
        data.path = data.notebook.path;
        data.type = 'notebook';
        data.name = '';
    }
}
exports.updateLegacySessionModel = updateLegacySessionModel;
/**
 * Validate an array of `Session.IModel` objects.
 */
function validateModels(models) {
    if (!Array.isArray(models)) {
        throw new Error('Invalid session list');
    }
    models.forEach(d => validateModel(d));
}
exports.validateModels = validateModels;
//# sourceMappingURL=validate.js.map

/***/ }),

/***/ "../../packages/services/lib/setting/index.js":
/*!****************************************************!*\
  !*** ../../packages/services/lib/setting/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SettingManager = void 0;
const coreutils_1 = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
const statedb_1 = __webpack_require__(/*! @jupyterlab/statedb */ "webpack/sharing/consume/default/@jupyterlab/statedb/@jupyterlab/statedb");
const serverconnection_1 = __webpack_require__(/*! ../serverconnection */ "../../packages/services/lib/serverconnection.js");
/**
 * The url for the lab settings service.
 */
const SERVICE_SETTINGS_URL = 'api/settings';
/**
 * The settings API service manager.
 */
class SettingManager extends statedb_1.DataConnector {
    /**
     * Create a new setting manager.
     */
    constructor(options = {}) {
        var _a;
        super();
        this.serverSettings = (_a = options.serverSettings) !== null && _a !== void 0 ? _a : serverconnection_1.ServerConnection.makeSettings();
    }
    /**
     * Fetch a plugin's settings.
     *
     * @param id - The plugin's ID.
     *
     * @returns A promise that resolves if successful.
     */
    async fetch(id) {
        if (!id) {
            throw new Error('Plugin `id` parameter is required for settings fetch.');
        }
        const { serverSettings } = this;
        const { baseUrl, appUrl } = serverSettings;
        const { makeRequest, ResponseError } = serverconnection_1.ServerConnection;
        const base = baseUrl + appUrl;
        const url = Private.url(base, id);
        const response = await makeRequest(url, {}, serverSettings);
        if (response.status !== 200) {
            const err = await ResponseError.create(response);
            throw err;
        }
        // Assert what type the server response is returning.
        return response.json();
    }
    /**
     * Fetch the list of all plugin setting bundles.
     *
     * @returns A promise that resolves if successful.
     */
    async list() {
        var _a, _b;
        const { serverSettings } = this;
        const { baseUrl, appUrl } = serverSettings;
        const { makeRequest, ResponseError } = serverconnection_1.ServerConnection;
        const base = baseUrl + appUrl;
        const url = Private.url(base, '');
        const response = await makeRequest(url, {}, serverSettings);
        if (response.status !== 200) {
            throw new ResponseError(response);
        }
        const json = await response.json();
        const values = (_b = (_a = json === null || json === void 0 ? void 0 : json['settings']) === null || _a === void 0 ? void 0 : _a.map((plugin) => {
            plugin.data = { composite: {}, user: {} };
            return plugin;
        })) !== null && _b !== void 0 ? _b : [];
        const ids = values.map(plugin => plugin.id);
        return { ids, values };
    }
    /**
     * Save a plugin's settings.
     *
     * @param id - The plugin's ID.
     *
     * @param raw - The user setting values as a raw string of JSON with comments.
     *
     * @returns A promise that resolves if successful.
     */
    async save(id, raw) {
        const { serverSettings } = this;
        const { baseUrl, appUrl } = serverSettings;
        const { makeRequest, ResponseError } = serverconnection_1.ServerConnection;
        const base = baseUrl + appUrl;
        const url = Private.url(base, id);
        // NOTE: 'raw' is JSON5 (not valid JSON), so we encode it as a string in a valid JSON body
        const init = { body: JSON.stringify({ raw }), method: 'PUT' };
        const response = await makeRequest(url, init, serverSettings);
        if (response.status !== 204) {
            throw new ResponseError(response);
        }
    }
}
exports.SettingManager = SettingManager;
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * Get the url for a plugin's settings.
     */
    function url(base, id) {
        return coreutils_1.URLExt.join(base, SERVICE_SETTINGS_URL, id);
    }
    Private.url = url;
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/services/lib/terminal/default.js":
/*!*******************************************************!*\
  !*** ../../packages/services/lib/terminal/default.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TerminalConnection = void 0;
const coreutils_1 = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
const coreutils_2 = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
const signaling_1 = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
const __1 = __webpack_require__(/*! .. */ "../../packages/services/lib/index.js");
const restapi_1 = __webpack_require__(/*! ./restapi */ "../../packages/services/lib/terminal/restapi.js");
/**
 * An implementation of a terminal interface.
 */
class TerminalConnection {
    /**
     * Construct a new terminal session.
     */
    constructor(options) {
        var _a;
        /**
         * Create the terminal websocket connection and add socket status handlers.
         *
         * #### Notes
         * You are responsible for updating the connection status as appropriate.
         */
        this._createSocket = () => {
            this._errorIfDisposed();
            // Make sure the socket is clear
            this._clearSocket();
            // Update the connection status to reflect opening a new connection.
            this._updateConnectionStatus('connecting');
            const name = this._name;
            const settings = this.serverSettings;
            let url = coreutils_1.URLExt.join(settings.wsUrl, 'terminals', 'websocket', encodeURIComponent(name));
            // If token authentication is in use.
            const token = settings.token;
            if (settings.appendToken && token !== '') {
                url = url + `?token=${encodeURIComponent(token)}`;
            }
            this._ws = new settings.WebSocket(url);
            this._ws.onmessage = this._onWSMessage;
            this._ws.onclose = this._onWSClose;
            this._ws.onerror = this._onWSClose;
        };
        // Websocket messages events are defined as variables to bind `this`
        this._onWSMessage = (event) => {
            if (this._isDisposed) {
                return;
            }
            const data = JSON.parse(event.data);
            // Handle a disconnect message.
            if (data[0] === 'disconnect') {
                this.dispose();
            }
            if (this._connectionStatus === 'connecting') {
                // After reconnection, ignore all messages until a 'setup' message
                // before we are truly connected. Setting the connection status to
                // connected only then means that if we do not get a setup message
                // before our retry timeout, we will delete the websocket and try again.
                if (data[0] === 'setup') {
                    this._updateConnectionStatus('connected');
                }
                return;
            }
            this._messageReceived.emit({
                type: data[0],
                content: data.slice(1)
            });
        };
        this._onWSClose = (event) => {
            console.warn(`Terminal websocket closed: ${event.code}`);
            if (!this.isDisposed) {
                this._reconnect();
            }
        };
        this._connectionStatus = 'connecting';
        this._connectionStatusChanged = new signaling_1.Signal(this);
        this._isDisposed = false;
        this._disposed = new signaling_1.Signal(this);
        this._messageReceived = new signaling_1.Signal(this);
        this._reconnectTimeout = null;
        this._ws = null;
        this._noOp = () => {
            /* no-op */
        };
        this._reconnectLimit = 7;
        this._reconnectAttempt = 0;
        this._pendingMessages = [];
        this._name = options.model.name;
        this.serverSettings = (_a = options.serverSettings) !== null && _a !== void 0 ? _a : __1.ServerConnection.makeSettings();
        this._createSocket();
    }
    /**
     * A signal emitted when the session is disposed.
     */
    get disposed() {
        return this._disposed;
    }
    /**
     * A signal emitted when a message is received from the server.
     */
    get messageReceived() {
        return this._messageReceived;
    }
    /**
     * Get the name of the terminal session.
     */
    get name() {
        return this._name;
    }
    /**
     * Get the model for the terminal session.
     */
    get model() {
        return { name: this._name };
    }
    /**
     * Test whether the session is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the session.
     */
    dispose() {
        if (this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        this._disposed.emit();
        this._updateConnectionStatus('disconnected');
        this._clearSocket();
        signaling_1.Signal.clearData(this);
    }
    /**
     * Send a message to the terminal session.
     *
     * #### Notes
     * If the connection is down, the message will be queued for sending when
     * the connection comes back up.
     */
    send(message) {
        this._sendMessage(message);
    }
    /**
     * Send a message on the websocket, or possibly queue for later sending.
     *
     * @param queue - whether to queue the message if it cannot be sent
     */
    _sendMessage(message, queue = true) {
        if (this._isDisposed || !message.content) {
            return;
        }
        if (this.connectionStatus === 'connected' && this._ws) {
            const msg = [message.type, ...message.content];
            this._ws.send(JSON.stringify(msg));
        }
        else if (queue) {
            this._pendingMessages.push(message);
        }
        else {
            throw new Error(`Could not send message: ${JSON.stringify(message)}`);
        }
    }
    /**
     * Send pending messages to the kernel.
     */
    _sendPending() {
        // We check to make sure we are still connected each time. For
        // example, if a websocket buffer overflows, it may close, so we should
        // stop sending messages.
        while (this.connectionStatus === 'connected' &&
            this._pendingMessages.length > 0) {
            this._sendMessage(this._pendingMessages[0], false);
            // We shift the message off the queue after the message is sent so that
            // if there is an exception, the message is still pending.
            this._pendingMessages.shift();
        }
    }
    /**
     * Reconnect to a terminal.
     *
     * #### Notes
     * This may try multiple times to reconnect to a terminal, and will sever
     * any existing connection.
     */
    reconnect() {
        this._errorIfDisposed();
        const result = new coreutils_2.PromiseDelegate();
        // Set up a listener for the connection status changing, which accepts or
        // rejects after the retries are done.
        const fulfill = (sender, status) => {
            if (status === 'connected') {
                result.resolve();
                this.connectionStatusChanged.disconnect(fulfill, this);
            }
            else if (status === 'disconnected') {
                result.reject(new Error('Terminal connection disconnected'));
                this.connectionStatusChanged.disconnect(fulfill, this);
            }
        };
        this.connectionStatusChanged.connect(fulfill, this);
        // Reset the reconnect limit so we start the connection attempts fresh
        this._reconnectAttempt = 0;
        // Start the reconnection process, which will also clear any existing
        // connection.
        this._reconnect();
        // Return the promise that should resolve on connection or reject if the
        // retries don't work.
        return result.promise;
    }
    /**
     * Attempt a connection if we have not exhausted connection attempts.
     */
    _reconnect() {
        this._errorIfDisposed();
        // Clear any existing reconnection attempt
        clearTimeout(this._reconnectTimeout);
        // Update the connection status and schedule a possible reconnection.
        if (this._reconnectAttempt < this._reconnectLimit) {
            this._updateConnectionStatus('connecting');
            // The first reconnect attempt should happen immediately, and subsequent
            // attempts should pick a random number in a growing range so that we
            // don't overload the server with synchronized reconnection attempts
            // across multiple kernels.
            const timeout = Private.getRandomIntInclusive(0, 1e3 * (Math.pow(2, this._reconnectAttempt) - 1));
            console.error(`Connection lost, reconnecting in ${Math.floor(timeout / 1000)} seconds.`);
            this._reconnectTimeout = setTimeout(this._createSocket, timeout);
            this._reconnectAttempt += 1;
        }
        else {
            this._updateConnectionStatus('disconnected');
        }
        // Clear the websocket event handlers and the socket itself.
        this._clearSocket();
    }
    /**
     * Forcefully clear the socket state.
     *
     * #### Notes
     * This will clear all socket state without calling any handlers and will
     * not update the connection status. If you call this method, you are
     * responsible for updating the connection status as needed and recreating
     * the socket if you plan to reconnect.
     */
    _clearSocket() {
        if (this._ws !== null) {
            // Clear the websocket event handlers and the socket itself.
            this._ws.onopen = this._noOp;
            this._ws.onclose = this._noOp;
            this._ws.onerror = this._noOp;
            this._ws.onmessage = this._noOp;
            this._ws.close();
            this._ws = null;
        }
    }
    /**
     * Shut down the terminal session.
     */
    async shutdown() {
        await restapi_1.shutdownTerminal(this.name, this.serverSettings);
        this.dispose();
    }
    /**
     * Clone the current terminal connection.
     */
    clone() {
        return new TerminalConnection(this);
    }
    /**
     * Handle connection status changes.
     */
    _updateConnectionStatus(connectionStatus) {
        if (this._connectionStatus === connectionStatus) {
            return;
        }
        this._connectionStatus = connectionStatus;
        // If we are not 'connecting', stop any reconnection attempts.
        if (connectionStatus !== 'connecting') {
            this._reconnectAttempt = 0;
            clearTimeout(this._reconnectTimeout);
        }
        // Send the pending messages if we just connected.
        if (connectionStatus === 'connected') {
            this._sendPending();
        }
        // Notify others that the connection status changed.
        this._connectionStatusChanged.emit(connectionStatus);
    }
    /**
     * Utility function to throw an error if this instance is disposed.
     */
    _errorIfDisposed() {
        if (this.isDisposed) {
            throw new Error('Terminal connection is disposed');
        }
    }
    /**
     * A signal emitted when the terminal connection status changes.
     */
    get connectionStatusChanged() {
        return this._connectionStatusChanged;
    }
    /**
     * The current connection status of the terminal connection.
     */
    get connectionStatus() {
        return this._connectionStatus;
    }
}
exports.TerminalConnection = TerminalConnection;
var Private;
(function (Private) {
    /**
     * Get the url for a terminal.
     */
    function getTermUrl(baseUrl, name) {
        return coreutils_1.URLExt.join(baseUrl, restapi_1.TERMINAL_SERVICE_URL, encodeURIComponent(name));
    }
    Private.getTermUrl = getTermUrl;
    /**
     * Get a random integer between min and max, inclusive of both.
     *
     * #### Notes
     * From
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
     *
     * From the MDN page: It might be tempting to use Math.round() to accomplish
     * that, but doing so would cause your random numbers to follow a non-uniform
     * distribution, which may not be acceptable for your needs.
     */
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    Private.getRandomIntInclusive = getRandomIntInclusive;
})(Private || (Private = {}));
//# sourceMappingURL=default.js.map

/***/ }),

/***/ "../../packages/services/lib/terminal/index.js":
/*!*****************************************************!*\
  !*** ../../packages/services/lib/terminal/index.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TerminalAPI = exports.Terminal = void 0;
const Terminal = __importStar(__webpack_require__(/*! ./terminal */ "../../packages/services/lib/terminal/terminal.js"));
exports.Terminal = Terminal;
const TerminalAPI = __importStar(__webpack_require__(/*! ./restapi */ "../../packages/services/lib/terminal/restapi.js"));
exports.TerminalAPI = TerminalAPI;
__exportStar(__webpack_require__(/*! ./manager */ "../../packages/services/lib/terminal/manager.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/services/lib/terminal/manager.js":
/*!*******************************************************!*\
  !*** ../../packages/services/lib/terminal/manager.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TerminalManager = void 0;
const algorithm_1 = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
const polling_1 = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling/@lumino/polling");
const signaling_1 = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
const __1 = __webpack_require__(/*! .. */ "../../packages/services/lib/index.js");
const basemanager_1 = __webpack_require__(/*! ../basemanager */ "../../packages/services/lib/basemanager.js");
const restapi_1 = __webpack_require__(/*! ./restapi */ "../../packages/services/lib/terminal/restapi.js");
const default_1 = __webpack_require__(/*! ./default */ "../../packages/services/lib/terminal/default.js");
/**
 * A terminal session manager.
 */
class TerminalManager extends basemanager_1.BaseManager {
    /**
     * Construct a new terminal manager.
     */
    constructor(options = {}) {
        var _a;
        super(options);
        this._isReady = false;
        // As an optimization, we unwrap the models to just store the names.
        this._names = [];
        this._terminalConnections = new Set();
        this._runningChanged = new signaling_1.Signal(this);
        this._connectionFailure = new signaling_1.Signal(this);
        // Check if terminals are available
        if (!this.isAvailable()) {
            this._ready = Promise.reject('Terminals unavailable');
            this._ready.catch(_ => undefined);
            return;
        }
        // Start polling with exponential backoff.
        this._pollModels = new polling_1.Poll({
            auto: false,
            factory: () => this.requestRunning(),
            frequency: {
                interval: 10 * 1000,
                backoff: true,
                max: 300 * 1000
            },
            name: `@jupyterlab/services:TerminalManager#models`,
            standby: (_a = options.standby) !== null && _a !== void 0 ? _a : 'when-hidden'
        });
        // Initialize internal data.
        this._ready = (async () => {
            await this._pollModels.start();
            await this._pollModels.tick;
            this._isReady = true;
        })();
    }
    /**
     * Test whether the manager is ready.
     */
    get isReady() {
        return this._isReady;
    }
    /**
     * A promise that fulfills when the manager is ready.
     */
    get ready() {
        return this._ready;
    }
    /**
     * A signal emitted when the running terminals change.
     */
    get runningChanged() {
        return this._runningChanged;
    }
    /**
     * A signal emitted when there is a connection failure.
     */
    get connectionFailure() {
        return this._connectionFailure;
    }
    /**
     * Dispose of the resources used by the manager.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._names.length = 0;
        this._terminalConnections.forEach(x => x.dispose());
        this._pollModels.dispose();
        super.dispose();
    }
    /**
     * Whether the terminal service is available.
     */
    isAvailable() {
        return restapi_1.isAvailable();
    }
    /*
     * Connect to a running terminal.
     *
     * @param options - The options used to connect to the terminal.
     *
     * @returns The new terminal connection instance.
     *
     * #### Notes
     * The manager `serverSettings` will be used.
     */
    connectTo(options) {
        const terminalConnection = new default_1.TerminalConnection(Object.assign(Object.assign({}, options), { serverSettings: this.serverSettings }));
        this._onStarted(terminalConnection);
        if (!this._names.includes(options.model.name)) {
            // We trust the user to connect to an existing session, but we verify
            // asynchronously.
            void this.refreshRunning().catch(() => {
                /* no-op */
            });
        }
        return terminalConnection;
    }
    /**
     * Create an iterator over the most recent running terminals.
     *
     * @returns A new iterator over the running terminals.
     */
    running() {
        return algorithm_1.iter(this._models);
    }
    /**
     * Force a refresh of the running terminals.
     *
     * @returns A promise that with the list of running terminals.
     *
     * #### Notes
     * This is intended to be called only in response to a user action,
     * since the manager maintains its internal state.
     */
    async refreshRunning() {
        await this._pollModels.refresh();
        await this._pollModels.tick;
    }
    /**
     * Create a new terminal session.
     *
     * @param options - The options used to create the terminal.
     *
     * @returns A promise that resolves with the terminal connection instance.
     *
     * #### Notes
     * The manager `serverSettings` will be used unless overridden in the
     * options.
     */
    async startNew(options) {
        const model = await restapi_1.startNew(this.serverSettings, options === null || options === void 0 ? void 0 : options.name, options === null || options === void 0 ? void 0 : options.cwd);
        await this.refreshRunning();
        return this.connectTo({ model });
    }
    /**
     * Shut down a terminal session by name.
     */
    async shutdown(name) {
        await restapi_1.shutdownTerminal(name, this.serverSettings);
        await this.refreshRunning();
    }
    /**
     * Shut down all terminal sessions.
     *
     * @returns A promise that resolves when all of the sessions are shut down.
     */
    async shutdownAll() {
        // Update the list of models to make sure our list is current.
        await this.refreshRunning();
        // Shut down all models.
        await Promise.all(this._names.map(name => restapi_1.shutdownTerminal(name, this.serverSettings)));
        // Update the list of models to clear out our state.
        await this.refreshRunning();
    }
    /**
     * Execute a request to the server to poll running terminals and update state.
     */
    async requestRunning() {
        var _a, _b;
        let models;
        try {
            models = await restapi_1.listRunning(this.serverSettings);
        }
        catch (err) {
            // Handle network errors, as well as cases where we are on a
            // JupyterHub and the server is not running. JupyterHub returns a
            // 503 (<2.0) or 424 (>2.0) in that case.
            if (err instanceof __1.ServerConnection.NetworkError ||
                ((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) === 503 ||
                ((_b = err.response) === null || _b === void 0 ? void 0 : _b.status) === 424) {
                this._connectionFailure.emit(err);
            }
            throw err;
        }
        if (this.isDisposed) {
            return;
        }
        const names = models.map(({ name }) => name).sort();
        if (names === this._names) {
            // Identical models list, so just return
            return;
        }
        this._names = names;
        this._terminalConnections.forEach(tc => {
            if (!names.includes(tc.name)) {
                tc.dispose();
            }
        });
        this._runningChanged.emit(this._models);
    }
    /**
     * Handle a session starting.
     */
    _onStarted(terminalConnection) {
        this._terminalConnections.add(terminalConnection);
        terminalConnection.disposed.connect(this._onDisposed, this);
    }
    /**
     * Handle a session terminating.
     */
    _onDisposed(terminalConnection) {
        this._terminalConnections.delete(terminalConnection);
        // Update the running models to make sure we reflect the server state
        void this.refreshRunning().catch(() => {
            /* no-op */
        });
    }
    get _models() {
        return this._names.map(name => {
            return { name };
        });
    }
}
exports.TerminalManager = TerminalManager;
//# sourceMappingURL=manager.js.map

/***/ }),

/***/ "../../packages/services/lib/terminal/restapi.js":
/*!*******************************************************!*\
  !*** ../../packages/services/lib/terminal/restapi.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shutdownTerminal = exports.listRunning = exports.startNew = exports.isAvailable = exports.TERMINAL_SERVICE_URL = void 0;
const coreutils_1 = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
const serverconnection_1 = __webpack_require__(/*! ../serverconnection */ "../../packages/services/lib/serverconnection.js");
/**
 * The url for the terminal service.
 */
exports.TERMINAL_SERVICE_URL = 'api/terminals';
/**
 * Whether the terminal service is available.
 */
function isAvailable() {
    const available = String(coreutils_1.PageConfig.getOption('terminalsAvailable'));
    return available.toLowerCase() === 'true';
}
exports.isAvailable = isAvailable;
/**
 * Start a new terminal session.
 *
 * @param settings - The server settings to use.
 *
 * @param name - The name of the target terminal.
 *
 * @param cwd - The path in which the terminal will start.
 *
 * @returns A promise that resolves with the session model.
 */
async function startNew(settings = serverconnection_1.ServerConnection.makeSettings(), name, cwd) {
    Private.errorIfNotAvailable();
    const url = coreutils_1.URLExt.join(settings.baseUrl, exports.TERMINAL_SERVICE_URL);
    const init = {
        method: 'POST',
        body: JSON.stringify({ name, cwd })
    };
    const response = await serverconnection_1.ServerConnection.makeRequest(url, init, settings);
    if (response.status !== 200) {
        const err = await serverconnection_1.ServerConnection.ResponseError.create(response);
        throw err;
    }
    const data = await response.json();
    // TODO: Validate model
    return data;
}
exports.startNew = startNew;
/**
 * List the running terminal sessions.
 *
 * @param settings - The server settings to use.
 *
 * @returns A promise that resolves with the list of running session models.
 */
async function listRunning(settings = serverconnection_1.ServerConnection.makeSettings()) {
    Private.errorIfNotAvailable();
    const url = coreutils_1.URLExt.join(settings.baseUrl, exports.TERMINAL_SERVICE_URL);
    const response = await serverconnection_1.ServerConnection.makeRequest(url, {}, settings);
    if (response.status !== 200) {
        const err = await serverconnection_1.ServerConnection.ResponseError.create(response);
        throw err;
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error('Invalid terminal list');
    }
    // TODO: validate each model
    return data;
}
exports.listRunning = listRunning;
/**
 * Shut down a terminal session by name.
 *
 * @param name - The name of the target session.
 *
 * @param settings - The server settings to use.
 *
 * @returns A promise that resolves when the session is shut down.
 */
async function shutdownTerminal(name, settings = serverconnection_1.ServerConnection.makeSettings()) {
    var _a;
    Private.errorIfNotAvailable();
    const url = coreutils_1.URLExt.join(settings.baseUrl, exports.TERMINAL_SERVICE_URL, name);
    const init = { method: 'DELETE' };
    const response = await serverconnection_1.ServerConnection.makeRequest(url, init, settings);
    if (response.status === 404) {
        const data = await response.json();
        const msg = (_a = data.message) !== null && _a !== void 0 ? _a : `The terminal session "${name}"" does not exist on the server`;
        console.warn(msg);
    }
    else if (response.status !== 204) {
        const err = await serverconnection_1.ServerConnection.ResponseError.create(response);
        throw err;
    }
}
exports.shutdownTerminal = shutdownTerminal;
var Private;
(function (Private) {
    /**
     * Throw an error if terminals are not available.
     */
    function errorIfNotAvailable() {
        if (!isAvailable()) {
            throw new Error('Terminals Unavailable');
        }
    }
    Private.errorIfNotAvailable = errorIfNotAvailable;
})(Private || (Private = {}));
//# sourceMappingURL=restapi.js.map

/***/ }),

/***/ "../../packages/services/lib/terminal/terminal.js":
/*!********************************************************!*\
  !*** ../../packages/services/lib/terminal/terminal.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isAvailable = void 0;
const restapi_1 = __webpack_require__(/*! ./restapi */ "../../packages/services/lib/terminal/restapi.js");
Object.defineProperty(exports, "isAvailable", ({ enumerable: true, get: function () { return restapi_1.isAvailable; } }));
//# sourceMappingURL=terminal.js.map

/***/ }),

/***/ "../../packages/services/lib/validate.js":
/*!***********************************************!*\
  !*** ../../packages/services/lib/validate.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateProperty = void 0;
/**
 * Validate a property as being on an object, and optionally
 * of a given type and among a given set of values.
 */
function validateProperty(object, name, typeName, values = []) {
    if (!object.hasOwnProperty(name)) {
        throw Error(`Missing property '${name}'`);
    }
    const value = object[name];
    if (typeName !== void 0) {
        let valid = true;
        switch (typeName) {
            case 'array':
                valid = Array.isArray(value);
                break;
            case 'object':
                valid = typeof value !== 'undefined';
                break;
            default:
                valid = typeof value === typeName;
        }
        if (!valid) {
            throw new Error(`Property '${name}' is not of type '${typeName}'`);
        }
        if (values.length > 0) {
            let valid = true;
            switch (typeName) {
                case 'string':
                case 'number':
                case 'boolean':
                    valid = values.includes(value);
                    break;
                default:
                    valid = values.findIndex(v => v === value) >= 0;
                    break;
            }
            if (!valid) {
                throw new Error(`Property '${name}' is not one of the valid values ${JSON.stringify(values)}`);
            }
        }
    }
}
exports.validateProperty = validateProperty;
//# sourceMappingURL=validate.js.map

/***/ }),

/***/ "../../packages/services/lib/workspace/index.js":
/*!******************************************************!*\
  !*** ../../packages/services/lib/workspace/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkspaceManager = void 0;
const coreutils_1 = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
const statedb_1 = __webpack_require__(/*! @jupyterlab/statedb */ "webpack/sharing/consume/default/@jupyterlab/statedb/@jupyterlab/statedb");
const serverconnection_1 = __webpack_require__(/*! ../serverconnection */ "../../packages/services/lib/serverconnection.js");
/**
 * The url for the lab workspaces service.
 */
const SERVICE_WORKSPACES_URL = 'api/workspaces';
/**
 * The workspaces API service manager.
 */
class WorkspaceManager extends statedb_1.DataConnector {
    /**
     * Create a new workspace manager.
     */
    constructor(options = {}) {
        var _a;
        super();
        this.serverSettings = (_a = options.serverSettings) !== null && _a !== void 0 ? _a : serverconnection_1.ServerConnection.makeSettings();
    }
    /**
     * Fetch a workspace.
     *
     * @param id - The workspace's ID.
     *
     * @returns A promise that resolves if successful.
     */
    async fetch(id) {
        const { serverSettings } = this;
        const { baseUrl, appUrl } = serverSettings;
        const { makeRequest, ResponseError } = serverconnection_1.ServerConnection;
        const base = baseUrl + appUrl;
        const url = Private.url(base, id);
        const response = await makeRequest(url, {}, serverSettings);
        if (response.status !== 200) {
            const err = await ResponseError.create(response);
            throw err;
        }
        return response.json();
    }
    /**
     * Fetch the list of workspace IDs that exist on the server.
     *
     * @returns A promise that resolves if successful.
     */
    async list() {
        const { serverSettings } = this;
        const { baseUrl, appUrl } = serverSettings;
        const { makeRequest, ResponseError } = serverconnection_1.ServerConnection;
        const base = baseUrl + appUrl;
        const url = Private.url(base, '');
        const response = await makeRequest(url, {}, serverSettings);
        if (response.status !== 200) {
            const err = await ResponseError.create(response);
            throw err;
        }
        const result = await response.json();
        return result.workspaces;
    }
    /**
     * Remove a workspace from the server.
     *
     * @param id - The workspaces's ID.
     *
     * @returns A promise that resolves if successful.
     */
    async remove(id) {
        const { serverSettings } = this;
        const { baseUrl, appUrl } = serverSettings;
        const { makeRequest, ResponseError } = serverconnection_1.ServerConnection;
        const base = baseUrl + appUrl;
        const url = Private.url(base, id);
        const init = { method: 'DELETE' };
        const response = await makeRequest(url, init, serverSettings);
        if (response.status !== 204) {
            const err = await ResponseError.create(response);
            throw err;
        }
    }
    /**
     * Save a workspace.
     *
     * @param id - The workspace's ID.
     *
     * @param workspace - The workspace being saved.
     *
     * @returns A promise that resolves if successful.
     */
    async save(id, workspace) {
        const { serverSettings } = this;
        const { baseUrl, appUrl } = serverSettings;
        const { makeRequest, ResponseError } = serverconnection_1.ServerConnection;
        const base = baseUrl + appUrl;
        const url = Private.url(base, id);
        const init = { body: JSON.stringify(workspace), method: 'PUT' };
        const response = await makeRequest(url, init, serverSettings);
        if (response.status !== 204) {
            const err = await ResponseError.create(response);
            throw err;
        }
    }
}
exports.WorkspaceManager = WorkspaceManager;
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * Get the url for a workspace.
     */
    function url(base, id) {
        return coreutils_1.URLExt.join(base, SERVICE_WORKSPACES_URL, id);
    }
    Private.url = url;
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2VydmljZXMvbGliL2Jhc2VtYW5hZ2VyLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXJ2aWNlcy9saWIvYnVpbGRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2VydmljZXMvbGliL2NvbmZpZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2VydmljZXMvbGliL2NvbnRlbnRzL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXJ2aWNlcy9saWIvY29udGVudHMvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3NlcnZpY2VzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2VydmljZXMvbGliL2tlcm5lbC9jb21tLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXJ2aWNlcy9saWIva2VybmVsL2RlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3NlcnZpY2VzL2xpYi9rZXJuZWwvZnV0dXJlLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXJ2aWNlcy9saWIva2VybmVsL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXJ2aWNlcy9saWIva2VybmVsL2tlcm5lbC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2VydmljZXMvbGliL2tlcm5lbC9tYW5hZ2VyLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXJ2aWNlcy9saWIva2VybmVsL21lc3NhZ2VzLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXJ2aWNlcy9saWIva2VybmVsL3Jlc3RhcGkuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3NlcnZpY2VzL2xpYi9rZXJuZWwvc2VyaWFsaXplLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXJ2aWNlcy9saWIva2VybmVsL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXJ2aWNlcy9saWIva2VybmVsc3BlYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2VydmljZXMvbGliL2tlcm5lbHNwZWMva2VybmVsc3BlYy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2VydmljZXMvbGliL2tlcm5lbHNwZWMvbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2VydmljZXMvbGliL2tlcm5lbHNwZWMvcmVzdGFwaS5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2VydmljZXMvbGliL2tlcm5lbHNwZWMvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3NlcnZpY2VzL2xpYi9tYW5hZ2VyLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXJ2aWNlcy9saWIvbmJjb252ZXJ0L2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXJ2aWNlcy9saWIvc2VydmVyY29ubmVjdGlvbi5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2VydmljZXMvbGliL3Nlc3Npb24vZGVmYXVsdC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2VydmljZXMvbGliL3Nlc3Npb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3NlcnZpY2VzL2xpYi9zZXNzaW9uL21hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3NlcnZpY2VzL2xpYi9zZXNzaW9uL3Jlc3RhcGkuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3NlcnZpY2VzL2xpYi9zZXNzaW9uL3Nlc3Npb24uanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3NlcnZpY2VzL2xpYi9zZXNzaW9uL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXJ2aWNlcy9saWIvc2V0dGluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2VydmljZXMvbGliL3Rlcm1pbmFsL2RlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3NlcnZpY2VzL2xpYi90ZXJtaW5hbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2VydmljZXMvbGliL3Rlcm1pbmFsL21hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3NlcnZpY2VzL2xpYi90ZXJtaW5hbC9yZXN0YXBpLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXJ2aWNlcy9saWIvdGVybWluYWwvdGVybWluYWwuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3NlcnZpY2VzL2xpYi92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2VydmljZXMvbGliL3dvcmtzcGFjZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7OztBQ3ZMekI7QUFDYjtBQUNBO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELG1CQUFtQjtBQUNuQixvQkFBb0IsbUJBQU8sQ0FBQyxtR0FBbUI7QUFDL0MsMkJBQTJCLG1CQUFPLENBQUMsMkVBQW9CO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQix1Qzs7Ozs7Ozs7Ozs7QUN0Q2E7QUFDYjtBQUNBO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELG9CQUFvQjtBQUNwQixvQkFBb0IsbUJBQU8sQ0FBQywwR0FBdUI7QUFDbkQsMkJBQTJCLG1CQUFPLENBQUMsNEVBQXFCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsZUFBZSxrQkFBa0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx1QkFBdUI7QUFDdEMsZ0ZBQWdGO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHVCQUF1QjtBQUN0QyxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELGdCQUFnQjs7QUFFckU7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHVCQUF1QjtBQUN0QyxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLGlDOzs7Ozs7Ozs7OztBQ2hHYTtBQUNiO0FBQ0E7QUFDQSw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsMEJBQTBCLEdBQUcscUJBQXFCO0FBQ2xELG9CQUFvQixtQkFBTyxDQUFDLDBHQUF1QjtBQUNuRCxZQUFZLG1CQUFPLENBQUMsZ0RBQUk7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDLDRDQUE0QyxxQkFBcUIsS0FBSztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZFQUE2RTtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLGlDOzs7Ozs7Ozs7OztBQ3RKYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLG9DQUFvQyxhQUFhLEVBQUUsRUFBRTtBQUN2RixDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLHlDQUF5Qyw2QkFBNkI7QUFDdEUsQ0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGFBQWEsR0FBRyx1QkFBdUIsR0FBRyxnQkFBZ0I7QUFDMUQsb0JBQW9CLG1CQUFPLENBQUMsMEdBQXVCO0FBQ25ELG9CQUFvQixtQkFBTyxDQUFDLG1HQUFtQjtBQUMvQyxvQkFBb0IsbUJBQU8sQ0FBQyxtR0FBbUI7QUFDL0MsWUFBWSxtQkFBTyxDQUFDLGdEQUFJO0FBQ3hCLDhCQUE4QixtQkFBTyxDQUFDLG9FQUFZO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsa0NBQWtDLGdCQUFnQixLQUFLO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFHQUFxRyxpQkFBaUI7QUFDdEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixTQUFTLEdBQUcsd0RBQXdEO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFVBQVUsR0FBRyxTQUFTO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCxVQUFVLDZDQUE2QztBQUN0SCxpQkFBaUI7QUFDakIscURBQXFELG1CQUFtQiwrREFBK0Q7QUFDdkk7QUFDQTtBQUNBLHFEQUFxRCxtQkFBbUIsNkNBQTZDO0FBQ3JIO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsYUFBYSxrQkFBa0I7QUFDMUY7QUFDQSxxREFBcUQsbUJBQW1CLGlFQUFpRTtBQUN6SSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELG1CQUFtQiwwQ0FBMEM7QUFDOUcsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELGFBQWEsa0JBQWtCO0FBQzFGO0FBQ0EsaURBQWlELG1CQUFtQixtQkFBbUI7QUFDdkYsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELG1CQUFtQix1REFBdUQ7QUFDL0gsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFdBQVcsR0FBRywyQ0FBMkM7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsbUJBQW1CLHVEQUF1RDtBQUNuSTtBQUNBO0FBQ0EseURBQXlELG1CQUFtQix1REFBdUQ7QUFDbkk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELGFBQWEsVUFBVTtBQUNoRjtBQUNBO0FBQ0E7QUFDQSx1RUFBdUU7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHFCQUFxQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msc0JBQXNCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLGNBQWM7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLG1DQUFtQyx5QkFBeUI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLG1EQUFtRDtBQUNuRDtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix5QkFBeUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHlCQUF5QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0Usb0JBQW9CO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0ZBQStGO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsMkJBQTJCO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxjQUFjLElBQUksVUFBVTtBQUNyRTtBQUNBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyw2Q0FBNkM7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxxQ0FBcUM7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxxQ0FBcUM7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLE9BQU87QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixPQUFPO0FBQ2xD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0EsNERBQTRELG9CQUFvQixRQUFRO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLHVEQUF1RCxXQUFXO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsd0JBQXdCO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEMsZUFBZSxrQkFBa0I7QUFDakMsZUFBZSw2QkFBNkI7QUFDNUM7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQixpQyIsImZpbGUiOiJwYWNrYWdlc19zZXJ2aWNlc19saWJfaW5kZXhfanMuZTllNjhjNzY5YTkyN2Q4YWE4ZjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJhc2VNYW5hZ2VyID0gdm9pZCAwO1xuY29uc3Qgc2lnbmFsaW5nXzEgPSByZXF1aXJlKFwiQGx1bWluby9zaWduYWxpbmdcIik7XG5jb25zdCBzZXJ2ZXJjb25uZWN0aW9uXzEgPSByZXF1aXJlKFwiLi9zZXJ2ZXJjb25uZWN0aW9uXCIpO1xuY2xhc3MgQmFzZU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VkID0gbmV3IHNpZ25hbGluZ18xLlNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5zZXJ2ZXJTZXR0aW5ncyA9IChfYSA9IG9wdGlvbnMuc2VydmVyU2V0dGluZ3MpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VTZXR0aW5ncygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIGRlbGVnYXRlIGlzIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBkaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3Bvc2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUZXN0IHdoZXRoZXIgdGhlIGRlbGVnYXRlIGhhcyBiZWVuIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBpc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEaXNwb3NlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgZGVsZWdhdGUgYW5kIGludm9rZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VkLmVtaXQodW5kZWZpbmVkKTtcbiAgICAgICAgc2lnbmFsaW5nXzEuU2lnbmFsLmNsZWFyRGF0YSh0aGlzKTtcbiAgICB9XG59XG5leHBvcnRzLkJhc2VNYW5hZ2VyID0gQmFzZU1hbmFnZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlbWFuYWdlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQnVpbGRNYW5hZ2VyID0gdm9pZCAwO1xuY29uc3QgY29yZXV0aWxzXzEgPSByZXF1aXJlKFwiQGp1cHl0ZXJsYWIvY29yZXV0aWxzXCIpO1xuY29uc3Qgc2VydmVyY29ubmVjdGlvbl8xID0gcmVxdWlyZShcIi4uL3NlcnZlcmNvbm5lY3Rpb25cIik7XG4vKipcbiAqIFRoZSB1cmwgZm9yIHRoZSBsYWIgYnVpbGQgc2VydmljZS5cbiAqL1xuY29uc3QgQlVJTERfU0VUVElOR1NfVVJMID0gJ2FwaS9idWlsZCc7XG4vKipcbiAqIFRoZSBidWlsZCBBUEkgc2VydmljZSBtYW5hZ2VyLlxuICovXG5jbGFzcyBCdWlsZE1hbmFnZXIge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBzZXR0aW5nIG1hbmFnZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdGhpcy5fdXJsID0gJyc7XG4gICAgICAgIHRoaXMuc2VydmVyU2V0dGluZ3MgPSAoX2EgPSBvcHRpb25zLnNlcnZlclNldHRpbmdzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlU2V0dGluZ3MoKTtcbiAgICAgICAgY29uc3QgeyBiYXNlVXJsLCBhcHBVcmwgfSA9IHRoaXMuc2VydmVyU2V0dGluZ3M7XG4gICAgICAgIHRoaXMuX3VybCA9IGNvcmV1dGlsc18xLlVSTEV4dC5qb2luKGJhc2VVcmwsIGFwcFVybCwgQlVJTERfU0VUVElOR1NfVVJMKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIHRoZSBidWlsZCBzZXJ2aWNlIGlzIGF2YWlsYWJsZS5cbiAgICAgKi9cbiAgICBnZXQgaXNBdmFpbGFibGUoKSB7XG4gICAgICAgIHJldHVybiBjb3JldXRpbHNfMS5QYWdlQ29uZmlnLmdldE9wdGlvbignYnVpbGRBdmFpbGFibGUnKS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRlc3Qgd2hldGhlciB0byBjaGVjayBidWlsZCBzdGF0dXMgYXV0b21hdGljYWxseS5cbiAgICAgKi9cbiAgICBnZXQgc2hvdWxkQ2hlY2soKSB7XG4gICAgICAgIHJldHVybiBjb3JldXRpbHNfMS5QYWdlQ29uZmlnLmdldE9wdGlvbignYnVpbGRDaGVjaycpLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHdoZXRoZXIgdGhlIGFwcGxpY2F0aW9uIHNob3VsZCBiZSBidWlsdC5cbiAgICAgKi9cbiAgICBnZXRTdGF0dXMoKSB7XG4gICAgICAgIGNvbnN0IHsgX3VybCwgc2VydmVyU2V0dGluZ3MgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlUmVxdWVzdChfdXJsLCB7fSwgc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLlJlc3BvbnNlRXJyb3IocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnN0YXR1cyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZGF0YScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhLm1lc3NhZ2UgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGRhdGEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVpbGQgdGhlIGFwcGxpY2F0aW9uLlxuICAgICAqL1xuICAgIGJ1aWxkKCkge1xuICAgICAgICBjb25zdCB7IF91cmwsIHNlcnZlclNldHRpbmdzIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCBpbml0ID0geyBtZXRob2Q6ICdQT1NUJyB9O1xuICAgICAgICBjb25zdCBwcm9taXNlID0gc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24ubWFrZVJlcXVlc3QoX3VybCwgaW5pdCwgc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5SZXNwb25zZUVycm9yKHJlc3BvbnNlLCAnQnVpbGQgYWJvcnRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGBCdWlsZCBmYWlsZWQgd2l0aCAke3Jlc3BvbnNlLnN0YXR1c30uXG5cbiAgICAgICAgSWYgeW91IGFyZSBleHBlcmllbmNpbmcgdGhlIGJ1aWxkIGZhaWx1cmUgYWZ0ZXIgaW5zdGFsbGluZyBhbiBleHRlbnNpb24gKG9yIHRyeWluZyB0byBpbmNsdWRlIHByZXZpb3VzbHkgaW5zdGFsbGVkIGV4dGVuc2lvbiBhZnRlciB1cGRhdGluZyBKdXB5dGVyTGFiKSBwbGVhc2UgY2hlY2sgdGhlIGV4dGVuc2lvbiByZXBvc2l0b3J5IGZvciBuZXcgaW5zdGFsbGF0aW9uIGluc3RydWN0aW9ucyBhcyBtYW55IGV4dGVuc2lvbnMgbWlncmF0ZWQgdG8gdGhlIHByZWJ1aWx0IGV4dGVuc2lvbnMgc3lzdGVtIHdoaWNoIG5vIGxvbmdlciByZXF1aXJlcyByZWJ1aWxkaW5nIEp1cHl0ZXJMYWIgKGJ1dCB1c2VzIGEgZGlmZmVyZW50IGluc3RhbGxhdGlvbiBwcm9jZWR1cmUsIHR5cGljYWxseSBpbnZvbHZpbmcgYSBwYWNrYWdlIG1hbmFnZXIgc3VjaCBhcyAncGlwJyBvciAnY29uZGEnKS5cblxuICAgICAgICBJZiB5b3Ugc3BlY2lmaWNhbGx5IGludGVuZGVkIHRvIGluc3RhbGwgYSBzb3VyY2UgZXh0ZW5zaW9uLCBwbGVhc2UgcnVuICdqdXB5dGVyIGxhYiBidWlsZCcgb24gdGhlIHNlcnZlciBmb3IgZnVsbCBvdXRwdXQuYDtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24uUmVzcG9uc2VFcnJvcihyZXNwb25zZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYW5jZWwgYW4gYWN0aXZlIGJ1aWxkLlxuICAgICAqL1xuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgY29uc3QgeyBfdXJsLCBzZXJ2ZXJTZXR0aW5ncyB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgaW5pdCA9IHsgbWV0aG9kOiAnREVMRVRFJyB9O1xuICAgICAgICBjb25zdCBwcm9taXNlID0gc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24ubWFrZVJlcXVlc3QoX3VybCwgaW5pdCwgc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwNCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5SZXNwb25zZUVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5CdWlsZE1hbmFnZXIgPSBCdWlsZE1hbmFnZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ29uZmlnV2l0aERlZmF1bHRzID0gZXhwb3J0cy5Db25maWdTZWN0aW9uID0gdm9pZCAwO1xuY29uc3QgY29yZXV0aWxzXzEgPSByZXF1aXJlKFwiQGp1cHl0ZXJsYWIvY29yZXV0aWxzXCIpO1xuY29uc3QgX18xID0gcmVxdWlyZShcIi4uXCIpO1xuLyoqXG4gKiBUaGUgdXJsIGZvciB0aGUgY29uZmlnIHNlcnZpY2UuXG4gKi9cbmNvbnN0IFNFUlZJQ0VfQ09ORklHX1VSTCA9ICdhcGkvY29uZmlnJztcbi8qKlxuICogVGhlIG5hbWVzcGFjZSBmb3IgQ29uZmlnU2VjdGlvbiBzdGF0aWNzLlxuICovXG52YXIgQ29uZmlnU2VjdGlvbjtcbihmdW5jdGlvbiAoQ29uZmlnU2VjdGlvbikge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGNvbmZpZyBzZWN0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBQcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdpdGggdGhlIGNvbmZpZyBzZWN0aW9uIGlzIGxvYWRlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUob3B0aW9ucykge1xuICAgICAgICBjb25zdCBzZWN0aW9uID0gbmV3IERlZmF1bHRDb25maWdTZWN0aW9uKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gc2VjdGlvbi5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc2VjdGlvbjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIENvbmZpZ1NlY3Rpb24uY3JlYXRlID0gY3JlYXRlO1xufSkoQ29uZmlnU2VjdGlvbiA9IGV4cG9ydHMuQ29uZmlnU2VjdGlvbiB8fCAoZXhwb3J0cy5Db25maWdTZWN0aW9uID0ge30pKTtcbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIENvbmZpZ3VyYWJsZSBkYXRhIHNlY3Rpb24uXG4gKi9cbmNsYXNzIERlZmF1bHRDb25maWdTZWN0aW9uIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgY29uZmlnIHNlY3Rpb24uXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHRoaXMuX3VybCA9ICd1bmtub3duJztcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSAodGhpcy5zZXJ2ZXJTZXR0aW5ncyA9IChfYSA9IG9wdGlvbnMuc2VydmVyU2V0dGluZ3MpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IF9fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VTZXR0aW5ncygpKTtcbiAgICAgICAgdGhpcy5fdXJsID0gY29yZXV0aWxzXzEuVVJMRXh0LmpvaW4oc2V0dGluZ3MuYmFzZVVybCwgU0VSVklDRV9DT05GSUdfVVJMLCBlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5uYW1lKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZGF0YSBmb3IgdGhpcyBzZWN0aW9uLlxuICAgICAqL1xuICAgIGdldCBkYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9hZCB0aGUgaW5pdGlhbCBkYXRhIGZvciB0aGlzIHNlY3Rpb24uXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVXNlcyB0aGUgW0p1cHl0ZXIgTm90ZWJvb2sgQVBJXShodHRwOi8vcGV0c3RvcmUuc3dhZ2dlci5pby8/dXJsPWh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9qdXB5dGVyL25vdGVib29rL21hc3Rlci9ub3RlYm9vay9zZXJ2aWNlcy9hcGkvYXBpLnlhbWwjIS9jb25maWcpLlxuICAgICAqXG4gICAgICogVGhlIHByb21pc2UgaXMgZnVsZmlsbGVkIG9uIGEgdmFsaWQgcmVzcG9uc2UgYW5kIHJlamVjdGVkIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkKCkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IF9fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VSZXF1ZXN0KHRoaXMuX3VybCwge30sIHRoaXMuc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IGF3YWl0IF9fMS5TZXJ2ZXJDb25uZWN0aW9uLlJlc3BvbnNlRXJyb3IuY3JlYXRlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNb2RpZnkgdGhlIHN0b3JlZCBjb25maWcgdmFsdWVzLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFVzZXMgdGhlIFtKdXB5dGVyIE5vdGVib29rIEFQSV0oaHR0cDovL3BldHN0b3JlLnN3YWdnZXIuaW8vP3VybD1odHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vanVweXRlci9ub3RlYm9vay9tYXN0ZXIvbm90ZWJvb2svc2VydmljZXMvYXBpL2FwaS55YW1sIyEvY29uZmlnKS5cbiAgICAgKlxuICAgICAqIFRoZSBwcm9taXNlIGlzIGZ1bGZpbGxlZCBvbiBhIHZhbGlkIHJlc3BvbnNlIGFuZCByZWplY3RlZCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBVcGRhdGVzIHRoZSBsb2NhbCBkYXRhIGltbWVkaWF0ZWx5LCBzZW5kcyB0aGUgY2hhbmdlIHRvIHRoZSBzZXJ2ZXIsXG4gICAgICogYW5kIHVwZGF0ZXMgdGhlIGxvY2FsIGRhdGEgd2l0aCB0aGUgcmVzcG9uc2UsIGFuZCBmdWxmaWxzIHRoZSBwcm9taXNlXG4gICAgICogd2l0aCB0aGF0IGRhdGEuXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlKG5ld2RhdGEpIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fZGF0YSksIG5ld2RhdGEpO1xuICAgICAgICBjb25zdCBpbml0ID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3ZGF0YSlcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBfXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlUmVxdWVzdCh0aGlzLl91cmwsIGluaXQsIHRoaXMuc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IGF3YWl0IF9fMS5TZXJ2ZXJDb25uZWN0aW9uLlJlc3BvbnNlRXJyb3IuY3JlYXRlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICB9XG59XG4vKipcbiAqIENvbmZpZ3VyYWJsZSBvYmplY3Qgd2l0aCBkZWZhdWx0cy5cbiAqL1xuY2xhc3MgQ29uZmlnV2l0aERlZmF1bHRzIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgY29uZmlnIHdpdGggZGVmYXVsdHMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICB0aGlzLl9jbGFzc05hbWUgPSAnJztcbiAgICAgICAgdGhpcy5fc2VjdGlvbiA9IG9wdGlvbnMuc2VjdGlvbjtcbiAgICAgICAgdGhpcy5fZGVmYXVsdHMgPSAoX2EgPSBvcHRpb25zLmRlZmF1bHRzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB7fTtcbiAgICAgICAgdGhpcy5fY2xhc3NOYW1lID0gKF9iID0gb3B0aW9ucy5jbGFzc05hbWUpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6ICcnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgZGF0YSBmcm9tIHRoZSBjb25maWcgc2VjdGlvbiBvciBmYWxsIGJhY2sgdG8gZGVmYXVsdHMuXG4gICAgICovXG4gICAgZ2V0KGtleSkge1xuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5fY2xhc3NEYXRhKCk7XG4gICAgICAgIHJldHVybiBrZXkgaW4gZGF0YSA/IGRhdGFba2V5XSA6IHRoaXMuX2RlZmF1bHRzW2tleV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCBhIGNvbmZpZyB2YWx1ZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBVc2VzIHRoZSBbSnVweXRlciBOb3RlYm9vayBBUEldKGh0dHA6Ly9wZXRzdG9yZS5zd2FnZ2VyLmlvLz91cmw9aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2p1cHl0ZXIvbm90ZWJvb2svbWFzdGVyL25vdGVib29rL3NlcnZpY2VzL2FwaS9hcGkueWFtbCMhL2NvbmZpZykuXG4gICAgICpcbiAgICAgKiBUaGUgcHJvbWlzZSBpcyBmdWxmaWxsZWQgb24gYSB2YWxpZCByZXNwb25zZSBhbmQgcmVqZWN0ZWQgb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogU2VuZHMgdGhlIHVwZGF0ZSB0byB0aGUgc2VydmVyLCBhbmQgY2hhbmdlcyBvdXIgbG9jYWwgY29weSBvZiB0aGUgZGF0YVxuICAgICAqIGltbWVkaWF0ZWx5LlxuICAgICAqL1xuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGQgPSB7fTtcbiAgICAgICAgZFtrZXldID0gdmFsdWU7XG4gICAgICAgIGlmICh0aGlzLl9jbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGQyID0ge307XG4gICAgICAgICAgICBkMlt0aGlzLl9jbGFzc05hbWVdID0gZDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZWN0aW9uLnVwZGF0ZShkMik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VjdGlvbi51cGRhdGUoZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGRhdGEgZnJvbSB0aGUgU2VjdGlvbiB3aXRoIG91ciBjbGFzc25hbWUsIGlmIGF2YWlsYWJsZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBJZiB3ZSBoYXZlIG5vIGNsYXNzbmFtZSwgZ2V0IGFsbCBvZiB0aGUgZGF0YSBpbiB0aGUgU2VjdGlvblxuICAgICAqL1xuICAgIF9jbGFzc0RhdGEoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9zZWN0aW9uLmRhdGE7XG4gICAgICAgIGlmICh0aGlzLl9jbGFzc05hbWUgJiYgdGhpcy5fY2xhc3NOYW1lIGluIGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhW3RoaXMuX2NsYXNzTmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxufVxuZXhwb3J0cy5Db25maWdXaXRoRGVmYXVsdHMgPSBDb25maWdXaXRoRGVmYXVsdHM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Ecml2ZSA9IGV4cG9ydHMuQ29udGVudHNNYW5hZ2VyID0gZXhwb3J0cy5Db250ZW50cyA9IHZvaWQgMDtcbmNvbnN0IGNvcmV1dGlsc18xID0gcmVxdWlyZShcIkBqdXB5dGVybGFiL2NvcmV1dGlsc1wiKTtcbmNvbnN0IGFsZ29yaXRobV8xID0gcmVxdWlyZShcIkBsdW1pbm8vYWxnb3JpdGhtXCIpO1xuY29uc3Qgc2lnbmFsaW5nXzEgPSByZXF1aXJlKFwiQGx1bWluby9zaWduYWxpbmdcIik7XG5jb25zdCBfXzEgPSByZXF1aXJlKFwiLi5cIik7XG5jb25zdCB2YWxpZGF0ZSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi92YWxpZGF0ZVwiKSk7XG4vKipcbiAqIFRoZSB1cmwgZm9yIHRoZSBkZWZhdWx0IGRyaXZlIHNlcnZpY2UuXG4gKi9cbmNvbnN0IFNFUlZJQ0VfRFJJVkVfVVJMID0gJ2FwaS9jb250ZW50cyc7XG4vKipcbiAqIFRoZSB1cmwgZm9yIHRoZSBmaWxlIGFjY2Vzcy5cbiAqL1xuY29uc3QgRklMRVNfVVJMID0gJ2ZpbGVzJztcbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIGNvbnRlbnRzIGludGVyZmFjZXMuXG4gKi9cbnZhciBDb250ZW50cztcbihmdW5jdGlvbiAoQ29udGVudHMpIHtcbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYW4gSU1vZGVsLCB0aHJvd2luZyBhbiBlcnJvciBpZiBpdCBkb2VzIG5vdCBwYXNzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlQ29udGVudHNNb2RlbChjb250ZW50cykge1xuICAgICAgICB2YWxpZGF0ZS52YWxpZGF0ZUNvbnRlbnRzTW9kZWwoY29udGVudHMpO1xuICAgIH1cbiAgICBDb250ZW50cy52YWxpZGF0ZUNvbnRlbnRzTW9kZWwgPSB2YWxpZGF0ZUNvbnRlbnRzTW9kZWw7XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGFuIElDaGVja3BvaW50TW9kZWwsIHRocm93aW5nIGFuIGVycm9yIGlmIGl0IGRvZXMgbm90IHBhc3MuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVDaGVja3BvaW50TW9kZWwoY2hlY2twb2ludCkge1xuICAgICAgICB2YWxpZGF0ZS52YWxpZGF0ZUNoZWNrcG9pbnRNb2RlbChjaGVja3BvaW50KTtcbiAgICB9XG4gICAgQ29udGVudHMudmFsaWRhdGVDaGVja3BvaW50TW9kZWwgPSB2YWxpZGF0ZUNoZWNrcG9pbnRNb2RlbDtcbn0pKENvbnRlbnRzID0gZXhwb3J0cy5Db250ZW50cyB8fCAoZXhwb3J0cy5Db250ZW50cyA9IHt9KSk7XG4vKipcbiAqIEEgY29udGVudHMgbWFuYWdlciB0aGF0IHBhc3NlcyBmaWxlIG9wZXJhdGlvbnMgdG8gdGhlIHNlcnZlci5cbiAqIE11bHRpcGxlIHNlcnZlcnMgaW1wbGVtZW50aW5nIHRoZSBgSURyaXZlYCBpbnRlcmZhY2UgY2FuIGJlXG4gKiBhdHRhY2hlZCB0byB0aGUgY29udGVudHMgbWFuYWdlciwgc28gdGhhdCB0aGUgc2FtZSBzZXNzaW9uIGNhblxuICogcGVyZm9ybSBmaWxlIG9wZXJhdGlvbnMgb24gbXVsdGlwbGUgYmFja2VuZHMuXG4gKlxuICogVGhpcyBpbmNsdWRlcyBjaGVja3BvaW50aW5nIHdpdGggdGhlIG5vcm1hbCBmaWxlIG9wZXJhdGlvbnMuXG4gKi9cbmNsYXNzIENvbnRlbnRzTWFuYWdlciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IGNvbnRlbnRzIG1hbmFnZXIgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgb3B0aW9ucyB1c2VkIHRvIGluaXRpYWxpemUgdGhlIG9iamVjdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9hZGRpdGlvbmFsRHJpdmVzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9maWxlQ2hhbmdlZCA9IG5ldyBzaWduYWxpbmdfMS5TaWduYWwodGhpcyk7XG4gICAgICAgIGNvbnN0IHNlcnZlclNldHRpbmdzID0gKHRoaXMuc2VydmVyU2V0dGluZ3MgPSAoX2EgPSBvcHRpb25zLnNlcnZlclNldHRpbmdzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBfXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlU2V0dGluZ3MoKSk7XG4gICAgICAgIHRoaXMuX2RlZmF1bHREcml2ZSA9IChfYiA9IG9wdGlvbnMuZGVmYXVsdERyaXZlKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBuZXcgRHJpdmUoeyBzZXJ2ZXJTZXR0aW5ncyB9KTtcbiAgICAgICAgdGhpcy5fZGVmYXVsdERyaXZlLmZpbGVDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25GaWxlQ2hhbmdlZCwgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiBhIGZpbGUgb3BlcmF0aW9uIHRha2VzIHBsYWNlLlxuICAgICAqL1xuICAgIGdldCBmaWxlQ2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbGVDaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUZXN0IHdoZXRoZXIgdGhlIG1hbmFnZXIgaGFzIGJlZW4gZGlzcG9zZWQuXG4gICAgICovXG4gICAgZ2V0IGlzRGlzcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0Rpc3Bvc2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUgbWFuYWdlci5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIHNpZ25hbGluZ18xLlNpZ25hbC5jbGVhckRhdGEodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhbiBgSURyaXZlYCB0byB0aGUgbWFuYWdlci5cbiAgICAgKi9cbiAgICBhZGREcml2ZShkcml2ZSkge1xuICAgICAgICB0aGlzLl9hZGRpdGlvbmFsRHJpdmVzLnNldChkcml2ZS5uYW1lLCBkcml2ZSk7XG4gICAgICAgIGRyaXZlLmZpbGVDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25GaWxlQ2hhbmdlZCwgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdpdmVuIGEgcGF0aCwgZ2V0IGEgTW9kZWxEQi5JRmFjdG9yeSBmcm9tIHRoZVxuICAgICAqIHJlbGV2YW50IGJhY2tlbmQuIFJldHVybnMgYHVuZGVmaW5lZGAgaWYgdGhlIGJhY2tlbmRcbiAgICAgKiBkb2VzIG5vdCBwcm92aWRlIG9uZS5cbiAgICAgKi9cbiAgICBnZXRNb2RlbERCRmFjdG9yeShwYXRoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgW2RyaXZlXSA9IHRoaXMuX2RyaXZlRm9yUGF0aChwYXRoKTtcbiAgICAgICAgcmV0dXJuIChfYSA9IGRyaXZlID09PSBudWxsIHx8IGRyaXZlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkcml2ZS5tb2RlbERCRmFjdG9yeSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBwYXRoIG9mIHRoZSBmb3JtIGBkcml2ZTpsb2NhbC9wb3J0aW9uL29mL2l0LnR4dGBcbiAgICAgKiBnZXQgdGhlIGxvY2FsIHBhcnQgb2YgaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aDogdGhlIHBhdGguXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbG9jYWwgcGFydCBvZiB0aGUgcGF0aC5cbiAgICAgKi9cbiAgICBsb2NhbFBhdGgocGF0aCkge1xuICAgICAgICBjb25zdCBwYXJ0cyA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICAgICAgY29uc3QgZmlyc3RQYXJ0cyA9IHBhcnRzWzBdLnNwbGl0KCc6Jyk7XG4gICAgICAgIGlmIChmaXJzdFBhcnRzLmxlbmd0aCA9PT0gMSB8fCAhdGhpcy5fYWRkaXRpb25hbERyaXZlcy5oYXMoZmlyc3RQYXJ0c1swXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBjb3JldXRpbHNfMS5QYXRoRXh0LnJlbW92ZVNsYXNoKHBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3JldXRpbHNfMS5QYXRoRXh0LmpvaW4oZmlyc3RQYXJ0cy5zbGljZSgxKS5qb2luKCc6JyksIC4uLnBhcnRzLnNsaWNlKDEpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTm9ybWFsaXplIGEgZ2xvYmFsIHBhdGguIFJlZHVjZXMgJy4uJyBhbmQgJy4nIHBhcnRzLCBhbmQgcmVtb3Zlc1xuICAgICAqIGxlYWRpbmcgc2xhc2hlcyBmcm9tIHRoZSBsb2NhbCBwYXJ0IG9mIHRoZSBwYXRoLCB3aGlsZSByZXRhaW5pbmdcbiAgICAgKiB0aGUgZHJpdmUgbmFtZSBpZiBpdCBleGlzdHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aDogdGhlIHBhdGguXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbm9ybWFsaXplZCBwYXRoLlxuICAgICAqL1xuICAgIG5vcm1hbGl6ZShwYXRoKSB7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gcGF0aC5zcGxpdCgnOicpO1xuICAgICAgICBpZiAocGFydHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gY29yZXV0aWxzXzEuUGF0aEV4dC5ub3JtYWxpemUocGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke3BhcnRzWzBdfToke2NvcmV1dGlsc18xLlBhdGhFeHQubm9ybWFsaXplKHBhcnRzLnNsaWNlKDEpLmpvaW4oJzonKSl9YDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzb2x2ZSBhIGdsb2JhbCBwYXRoLCBzdGFydGluZyBmcm9tIHRoZSByb290IHBhdGguIEJlaGF2ZXMgbGlrZVxuICAgICAqIHBvc2l4LXBhdGgucmVzb2x2ZSwgd2l0aCAzIGRpZmZlcmVuY2VzOlxuICAgICAqICAtIHdpbGwgbmV2ZXIgcHJlcGVuZCBjd2RcbiAgICAgKiAgLSBpZiByb290IGhhcyBhIGRyaXZlIG5hbWUsIHRoZSByZXN1bHQgaXMgcHJlZml4ZWQgd2l0aCBcIjxkcml2ZT46XCJcbiAgICAgKiAgLSBiZWZvcmUgYWRkaW5nIGRyaXZlIG5hbWUsIGxlYWRpbmcgc2xhc2hlcyBhcmUgcmVtb3ZlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGg6IHRoZSBwYXRoLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5vcm1hbGl6ZWQgcGF0aC5cbiAgICAgKi9cbiAgICByZXNvbHZlUGF0aChyb290LCBwYXRoKSB7XG4gICAgICAgIGNvbnN0IGRyaXZlTmFtZSA9IHRoaXMuZHJpdmVOYW1lKHJvb3QpO1xuICAgICAgICBjb25zdCBsb2NhbFBhdGggPSB0aGlzLmxvY2FsUGF0aChyb290KTtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSBjb3JldXRpbHNfMS5QYXRoRXh0LnJlc29sdmUoJy8nLCBsb2NhbFBhdGgsIHBhdGgpO1xuICAgICAgICByZXR1cm4gZHJpdmVOYW1lID8gYCR7ZHJpdmVOYW1lfToke3Jlc29sdmVkfWAgOiByZXNvbHZlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBwYXRoIG9mIHRoZSBmb3JtIGBkcml2ZTpsb2NhbC9wb3J0aW9uL29mL2l0LnR4dGBcbiAgICAgKiBnZXQgdGhlIG5hbWUgb2YgdGhlIGRyaXZlLiBJZiB0aGUgcGF0aCBpcyBtaXNzaW5nXG4gICAgICogYSBkcml2ZSBwb3J0aW9uLCByZXR1cm5zIGFuIGVtcHR5IHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoOiB0aGUgcGF0aC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBkcml2ZSBuYW1lIGZvciB0aGUgcGF0aCwgb3IgdGhlIGVtcHR5IHN0cmluZy5cbiAgICAgKi9cbiAgICBkcml2ZU5hbWUocGF0aCkge1xuICAgICAgICBjb25zdCBwYXJ0cyA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICAgICAgY29uc3QgZmlyc3RQYXJ0cyA9IHBhcnRzWzBdLnNwbGl0KCc6Jyk7XG4gICAgICAgIGlmIChmaXJzdFBhcnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9hZGRpdGlvbmFsRHJpdmVzLmhhcyhmaXJzdFBhcnRzWzBdKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZpcnN0UGFydHNbMF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYSBmaWxlIG9yIGRpcmVjdG9yeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoOiBUaGUgcGF0aCB0byB0aGUgZmlsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zOiBUaGUgb3B0aW9ucyB1c2VkIHRvIGZldGNoIHRoZSBmaWxlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHdpdGggdGhlIGZpbGUgY29udGVudC5cbiAgICAgKi9cbiAgICBnZXQocGF0aCwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCBbZHJpdmUsIGxvY2FsUGF0aF0gPSB0aGlzLl9kcml2ZUZvclBhdGgocGF0aCk7XG4gICAgICAgIHJldHVybiBkcml2ZS5nZXQobG9jYWxQYXRoLCBvcHRpb25zKS50aGVuKGNvbnRlbnRzTW9kZWwgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGlzdGluZyA9IFtdO1xuICAgICAgICAgICAgaWYgKGNvbnRlbnRzTW9kZWwudHlwZSA9PT0gJ2RpcmVjdG9yeScgJiYgY29udGVudHNNb2RlbC5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgYWxnb3JpdGhtXzEuZWFjaChjb250ZW50c01vZGVsLmNvbnRlbnQsIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RpbmcucHVzaChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pLCB7IHBhdGg6IHRoaXMuX3RvR2xvYmFsUGF0aChkcml2ZSwgaXRlbS5wYXRoKSB9KSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY29udGVudHNNb2RlbCksIHsgcGF0aDogdGhpcy5fdG9HbG9iYWxQYXRoKGRyaXZlLCBsb2NhbFBhdGgpLCBjb250ZW50OiBsaXN0aW5nIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY29udGVudHNNb2RlbCksIHsgcGF0aDogdGhpcy5fdG9HbG9iYWxQYXRoKGRyaXZlLCBsb2NhbFBhdGgpIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGFuIGVuY29kZWQgZG93bmxvYWQgdXJsIGdpdmVuIGEgZmlsZSBwYXRoLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggLSBBbiBhYnNvbHV0ZSBQT1NJWCBmaWxlIHBhdGggb24gdGhlIHNlcnZlci5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBJdCBpcyBleHBlY3RlZCB0aGF0IHRoZSBwYXRoIGNvbnRhaW5zIG5vIHJlbGF0aXZlIHBhdGhzLlxuICAgICAqXG4gICAgICogVGhlIHJldHVybmVkIFVSTCBtYXkgaW5jbHVkZSBhIHF1ZXJ5IHBhcmFtZXRlci5cbiAgICAgKi9cbiAgICBnZXREb3dubG9hZFVybChwYXRoKSB7XG4gICAgICAgIGNvbnN0IFtkcml2ZSwgbG9jYWxQYXRoXSA9IHRoaXMuX2RyaXZlRm9yUGF0aChwYXRoKTtcbiAgICAgICAgcmV0dXJuIGRyaXZlLmdldERvd25sb2FkVXJsKGxvY2FsUGF0aCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyB1bnRpdGxlZCBmaWxlIG9yIGRpcmVjdG9yeSBpbiB0aGUgc3BlY2lmaWVkIGRpcmVjdG9yeSBwYXRoLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnM6IFRoZSBvcHRpb25zIHVzZWQgdG8gY3JlYXRlIHRoZSBmaWxlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHdpdGggdGhlIGNyZWF0ZWQgZmlsZSBjb250ZW50IHdoZW4gdGhlXG4gICAgICogICAgZmlsZSBpcyBjcmVhdGVkLlxuICAgICAqL1xuICAgIG5ld1VudGl0bGVkKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBpZiAob3B0aW9ucy5wYXRoKSB7XG4gICAgICAgICAgICBjb25zdCBnbG9iYWxQYXRoID0gdGhpcy5ub3JtYWxpemUob3B0aW9ucy5wYXRoKTtcbiAgICAgICAgICAgIGNvbnN0IFtkcml2ZSwgbG9jYWxQYXRoXSA9IHRoaXMuX2RyaXZlRm9yUGF0aChnbG9iYWxQYXRoKTtcbiAgICAgICAgICAgIHJldHVybiBkcml2ZVxuICAgICAgICAgICAgICAgIC5uZXdVbnRpdGxlZChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IHBhdGg6IGxvY2FsUGF0aCB9KSlcbiAgICAgICAgICAgICAgICAudGhlbihjb250ZW50c01vZGVsID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjb250ZW50c01vZGVsKSwgeyBwYXRoOiBjb3JldXRpbHNfMS5QYXRoRXh0LmpvaW4oZ2xvYmFsUGF0aCwgY29udGVudHNNb2RlbC5uYW1lKSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHREcml2ZS5uZXdVbnRpdGxlZChvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWxldGUgYSBmaWxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggLSBUaGUgcGF0aCB0byB0aGUgZmlsZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aGVuIHRoZSBmaWxlIGlzIGRlbGV0ZWQuXG4gICAgICovXG4gICAgZGVsZXRlKHBhdGgpIHtcbiAgICAgICAgY29uc3QgW2RyaXZlLCBsb2NhbFBhdGhdID0gdGhpcy5fZHJpdmVGb3JQYXRoKHBhdGgpO1xuICAgICAgICByZXR1cm4gZHJpdmUuZGVsZXRlKGxvY2FsUGF0aCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmFtZSBhIGZpbGUgb3IgZGlyZWN0b3J5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggLSBUaGUgb3JpZ2luYWwgZmlsZSBwYXRoLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5ld1BhdGggLSBUaGUgbmV3IGZpbGUgcGF0aC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aXRoIHRoZSBuZXcgZmlsZSBjb250ZW50cyBtb2RlbCB3aGVuXG4gICAgICogICB0aGUgZmlsZSBpcyByZW5hbWVkLlxuICAgICAqL1xuICAgIHJlbmFtZShwYXRoLCBuZXdQYXRoKSB7XG4gICAgICAgIGNvbnN0IFtkcml2ZTEsIHBhdGgxXSA9IHRoaXMuX2RyaXZlRm9yUGF0aChwYXRoKTtcbiAgICAgICAgY29uc3QgW2RyaXZlMiwgcGF0aDJdID0gdGhpcy5fZHJpdmVGb3JQYXRoKG5ld1BhdGgpO1xuICAgICAgICBpZiAoZHJpdmUxICE9PSBkcml2ZTIpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdDb250ZW50c01hbmFnZXI6IHJlbmFtaW5nIGZpbGVzIG11c3Qgb2NjdXIgd2l0aGluIGEgRHJpdmUnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZHJpdmUxLnJlbmFtZShwYXRoMSwgcGF0aDIpLnRoZW4oY29udGVudHNNb2RlbCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjb250ZW50c01vZGVsKSwgeyBwYXRoOiB0aGlzLl90b0dsb2JhbFBhdGgoZHJpdmUxLCBwYXRoMikgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYXZlIGEgZmlsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoIC0gVGhlIGRlc2lyZWQgZmlsZSBwYXRoLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25hbCBvdmVycmlkZXMgdG8gdGhlIG1vZGVsLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHdpdGggdGhlIGZpbGUgY29udGVudCBtb2RlbCB3aGVuIHRoZVxuICAgICAqICAgZmlsZSBpcyBzYXZlZC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBFbnN1cmUgdGhhdCBgbW9kZWwuY29udGVudGAgaXMgcG9wdWxhdGVkIGZvciB0aGUgZmlsZS5cbiAgICAgKi9cbiAgICBzYXZlKHBhdGgsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBjb25zdCBnbG9iYWxQYXRoID0gdGhpcy5ub3JtYWxpemUocGF0aCk7XG4gICAgICAgIGNvbnN0IFtkcml2ZSwgbG9jYWxQYXRoXSA9IHRoaXMuX2RyaXZlRm9yUGF0aChwYXRoKTtcbiAgICAgICAgcmV0dXJuIGRyaXZlXG4gICAgICAgICAgICAuc2F2ZShsb2NhbFBhdGgsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgcGF0aDogbG9jYWxQYXRoIH0pKVxuICAgICAgICAgICAgLnRoZW4oY29udGVudHNNb2RlbCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjb250ZW50c01vZGVsKSwgeyBwYXRoOiBnbG9iYWxQYXRoIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29weSBhIGZpbGUgaW50byBhIGdpdmVuIGRpcmVjdG9yeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoIC0gVGhlIG9yaWdpbmFsIGZpbGUgcGF0aC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0b0RpciAtIFRoZSBkZXN0aW5hdGlvbiBkaXJlY3RvcnkgcGF0aC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aXRoIHRoZSBuZXcgY29udGVudHMgbW9kZWwgd2hlbiB0aGVcbiAgICAgKiAgZmlsZSBpcyBjb3BpZWQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIHNlcnZlciB3aWxsIHNlbGVjdCB0aGUgbmFtZSBvZiB0aGUgY29waWVkIGZpbGUuXG4gICAgICovXG4gICAgY29weShmcm9tRmlsZSwgdG9EaXIpIHtcbiAgICAgICAgY29uc3QgW2RyaXZlMSwgcGF0aDFdID0gdGhpcy5fZHJpdmVGb3JQYXRoKGZyb21GaWxlKTtcbiAgICAgICAgY29uc3QgW2RyaXZlMiwgcGF0aDJdID0gdGhpcy5fZHJpdmVGb3JQYXRoKHRvRGlyKTtcbiAgICAgICAgaWYgKGRyaXZlMSA9PT0gZHJpdmUyKSB7XG4gICAgICAgICAgICByZXR1cm4gZHJpdmUxLmNvcHkocGF0aDEsIHBhdGgyKS50aGVuKGNvbnRlbnRzTW9kZWwgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGNvbnRlbnRzTW9kZWwpLCB7IHBhdGg6IHRoaXMuX3RvR2xvYmFsUGF0aChkcml2ZTEsIGNvbnRlbnRzTW9kZWwucGF0aCkgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdDb3B5aW5nIGZpbGVzIGJldHdlZW4gZHJpdmVzIGlzIG5vdCBjdXJyZW50bHkgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBjaGVja3BvaW50IGZvciBhIGZpbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCAtIFRoZSBwYXRoIG9mIHRoZSBmaWxlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHdpdGggdGhlIG5ldyBjaGVja3BvaW50IG1vZGVsIHdoZW4gdGhlXG4gICAgICogICBjaGVja3BvaW50IGlzIGNyZWF0ZWQuXG4gICAgICovXG4gICAgY3JlYXRlQ2hlY2twb2ludChwYXRoKSB7XG4gICAgICAgIGNvbnN0IFtkcml2ZSwgbG9jYWxQYXRoXSA9IHRoaXMuX2RyaXZlRm9yUGF0aChwYXRoKTtcbiAgICAgICAgcmV0dXJuIGRyaXZlLmNyZWF0ZUNoZWNrcG9pbnQobG9jYWxQYXRoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlzdCBhdmFpbGFibGUgY2hlY2twb2ludHMgZm9yIGEgZmlsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoIC0gVGhlIHBhdGggb2YgdGhlIGZpbGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2l0aCBhIGxpc3Qgb2YgY2hlY2twb2ludCBtb2RlbHMgZm9yXG4gICAgICogICAgdGhlIGZpbGUuXG4gICAgICovXG4gICAgbGlzdENoZWNrcG9pbnRzKHBhdGgpIHtcbiAgICAgICAgY29uc3QgW2RyaXZlLCBsb2NhbFBhdGhdID0gdGhpcy5fZHJpdmVGb3JQYXRoKHBhdGgpO1xuICAgICAgICByZXR1cm4gZHJpdmUubGlzdENoZWNrcG9pbnRzKGxvY2FsUGF0aCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc3RvcmUgYSBmaWxlIHRvIGEga25vd24gY2hlY2twb2ludCBzdGF0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoIC0gVGhlIHBhdGggb2YgdGhlIGZpbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hlY2twb2ludElEIC0gVGhlIGlkIG9mIHRoZSBjaGVja3BvaW50IHRvIHJlc3RvcmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2hlbiB0aGUgY2hlY2twb2ludCBpcyByZXN0b3JlZC5cbiAgICAgKi9cbiAgICByZXN0b3JlQ2hlY2twb2ludChwYXRoLCBjaGVja3BvaW50SUQpIHtcbiAgICAgICAgY29uc3QgW2RyaXZlLCBsb2NhbFBhdGhdID0gdGhpcy5fZHJpdmVGb3JQYXRoKHBhdGgpO1xuICAgICAgICByZXR1cm4gZHJpdmUucmVzdG9yZUNoZWNrcG9pbnQobG9jYWxQYXRoLCBjaGVja3BvaW50SUQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWxldGUgYSBjaGVja3BvaW50IGZvciBhIGZpbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCAtIFRoZSBwYXRoIG9mIHRoZSBmaWxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoZWNrcG9pbnRJRCAtIFRoZSBpZCBvZiB0aGUgY2hlY2twb2ludCB0byBkZWxldGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2hlbiB0aGUgY2hlY2twb2ludCBpcyBkZWxldGVkLlxuICAgICAqL1xuICAgIGRlbGV0ZUNoZWNrcG9pbnQocGF0aCwgY2hlY2twb2ludElEKSB7XG4gICAgICAgIGNvbnN0IFtkcml2ZSwgbG9jYWxQYXRoXSA9IHRoaXMuX2RyaXZlRm9yUGF0aChwYXRoKTtcbiAgICAgICAgcmV0dXJuIGRyaXZlLmRlbGV0ZUNoZWNrcG9pbnQobG9jYWxQYXRoLCBjaGVja3BvaW50SUQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHaXZlbiBhIGRyaXZlIGFuZCBhIGxvY2FsIHBhdGgsIGNvbnN0cnVjdCBhIGZ1bGx5IHF1YWxpZmllZFxuICAgICAqIHBhdGguIFRoZSBpbnZlcnNlIG9mIGBfZHJpdmVGb3JQYXRoYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkcml2ZTogYW4gYElEcml2ZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbG9jYWxQYXRoOiB0aGUgbG9jYWwgcGF0aCBvbiB0aGUgZHJpdmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB0aGUgZnVsbHkgcXVhbGlmaWVkIHBhdGguXG4gICAgICovXG4gICAgX3RvR2xvYmFsUGF0aChkcml2ZSwgbG9jYWxQYXRoKSB7XG4gICAgICAgIGlmIChkcml2ZSA9PT0gdGhpcy5fZGVmYXVsdERyaXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gY29yZXV0aWxzXzEuUGF0aEV4dC5yZW1vdmVTbGFzaChsb2NhbFBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGAke2RyaXZlLm5hbWV9OiR7Y29yZXV0aWxzXzEuUGF0aEV4dC5yZW1vdmVTbGFzaChsb2NhbFBhdGgpfWA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBwYXRoLCBnZXQgdGhlIGBJRHJpdmUgdG8gd2hpY2ggaXQgcmVmZXJzLFxuICAgICAqIHdoZXJlIHRoZSBwYXRoIHNhdGlzZmllcyB0aGUgcGF0dGVyblxuICAgICAqIGAnZHJpdmVOYW1lOnBhdGgvdG8vZmlsZSdgLiBJZiB0aGVyZSBpcyBubyBgZHJpdmVOYW1lYFxuICAgICAqIHByZXBlbmRlZCB0byB0aGUgcGF0aCwgaXQgcmV0dXJucyB0aGUgZGVmYXVsdCBkcml2ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoOiBhIHBhdGggdG8gYSBmaWxlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSB0dXBsZSBjb250YWluaW5nIGFuIGBJRHJpdmVgIG9iamVjdCBmb3IgdGhlIHBhdGgsXG4gICAgICogYW5kIGEgbG9jYWwgcGF0aCBmb3IgdGhhdCBkcml2ZS5cbiAgICAgKi9cbiAgICBfZHJpdmVGb3JQYXRoKHBhdGgpIHtcbiAgICAgICAgY29uc3QgZHJpdmVOYW1lID0gdGhpcy5kcml2ZU5hbWUocGF0aCk7XG4gICAgICAgIGNvbnN0IGxvY2FsUGF0aCA9IHRoaXMubG9jYWxQYXRoKHBhdGgpO1xuICAgICAgICBpZiAoZHJpdmVOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gW3RoaXMuX2FkZGl0aW9uYWxEcml2ZXMuZ2V0KGRyaXZlTmFtZSksIGxvY2FsUGF0aF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW3RoaXMuX2RlZmF1bHREcml2ZSwgbG9jYWxQYXRoXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXNwb25kIHRvIGZpbGVDaGFuZ2VkIHNpZ25hbHMgZnJvbSB0aGUgZHJpdmVzIGF0dGFjaGVkIHRvXG4gICAgICogdGhlIG1hbmFnZXIuIFRoaXMgcHJlcGVuZHMgdGhlIGRyaXZlIG5hbWUgdG8gdGhlIHBhdGggaWYgbmVjZXNzYXJ5LFxuICAgICAqIGFuZCB0aGVuIGZvcndhcmRzIHRoZSBzaWduYWwuXG4gICAgICovXG4gICAgX29uRmlsZUNoYW5nZWQoc2VuZGVyLCBhcmdzKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmIChzZW5kZXIgPT09IHRoaXMuX2RlZmF1bHREcml2ZSkge1xuICAgICAgICAgICAgdGhpcy5fZmlsZUNoYW5nZWQuZW1pdChhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICBsZXQgb2xkVmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgaWYgKChfYSA9IGFyZ3MubmV3VmFsdWUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wYXRoKSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGFyZ3MubmV3VmFsdWUpLCB7IHBhdGg6IHRoaXMuX3RvR2xvYmFsUGF0aChzZW5kZXIsIGFyZ3MubmV3VmFsdWUucGF0aCkgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKF9iID0gYXJncy5vbGRWYWx1ZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnBhdGgpIHtcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgYXJncy5vbGRWYWx1ZSksIHsgcGF0aDogdGhpcy5fdG9HbG9iYWxQYXRoKHNlbmRlciwgYXJncy5vbGRWYWx1ZS5wYXRoKSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2ZpbGVDaGFuZ2VkLmVtaXQoe1xuICAgICAgICAgICAgICAgIHR5cGU6IGFyZ3MudHlwZSxcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSxcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkNvbnRlbnRzTWFuYWdlciA9IENvbnRlbnRzTWFuYWdlcjtcbi8qKlxuICogQSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGZvciBhbiBgSURyaXZlYCwgdGFsa2luZyB0byB0aGVcbiAqIHNlcnZlciB1c2luZyB0aGUgSnVweXRlciBSRVNUIEFQSS5cbiAqL1xuY2xhc3MgRHJpdmUge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBjb250ZW50cyBtYW5hZ2VyIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgdXNlZCB0byBpbml0aWFsaXplIHRoZSBvYmplY3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2ZpbGVDaGFuZ2VkID0gbmV3IHNpZ25hbGluZ18xLlNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5uYW1lID0gKF9hID0gb3B0aW9ucy5uYW1lKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnRGVmYXVsdCc7XG4gICAgICAgIHRoaXMuX2FwaUVuZHBvaW50ID0gKF9iID0gb3B0aW9ucy5hcGlFbmRwb2ludCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogU0VSVklDRV9EUklWRV9VUkw7XG4gICAgICAgIHRoaXMuc2VydmVyU2V0dGluZ3MgPSAoX2MgPSBvcHRpb25zLnNlcnZlclNldHRpbmdzKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBfXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlU2V0dGluZ3MoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIGEgZmlsZSBvcGVyYXRpb24gdGFrZXMgcGxhY2UuXG4gICAgICovXG4gICAgZ2V0IGZpbGVDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsZUNoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRlc3Qgd2hldGhlciB0aGUgbWFuYWdlciBoYXMgYmVlbiBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSBtYW5hZ2VyLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgc2lnbmFsaW5nXzEuU2lnbmFsLmNsZWFyRGF0YSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGEgZmlsZSBvciBkaXJlY3RvcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbG9jYWxQYXRoOiBUaGUgcGF0aCB0byB0aGUgZmlsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zOiBUaGUgb3B0aW9ucyB1c2VkIHRvIGZldGNoIHRoZSBmaWxlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHdpdGggdGhlIGZpbGUgY29udGVudC5cbiAgICAgKlxuICAgICAqIFVzZXMgdGhlIFtKdXB5dGVyIE5vdGVib29rIEFQSV0oaHR0cDovL3BldHN0b3JlLnN3YWdnZXIuaW8vP3VybD1odHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vanVweXRlci9ub3RlYm9vay9tYXN0ZXIvbm90ZWJvb2svc2VydmljZXMvYXBpL2FwaS55YW1sIyEvY29udGVudHMpIGFuZCB2YWxpZGF0ZXMgdGhlIHJlc3BvbnNlIG1vZGVsLlxuICAgICAqL1xuICAgIGFzeW5jIGdldChsb2NhbFBhdGgsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuX2dldFVybChsb2NhbFBhdGgpO1xuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgLy8gVGhlIG5vdGVib29rIHR5cGUgY2Fubm90IHRha2UgYW4gZm9ybWF0IG9wdGlvbi5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLnR5cGUgPT09ICdub3RlYm9vaycpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9uc1snZm9ybWF0J107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gb3B0aW9ucy5jb250ZW50ID8gJzEnIDogJzAnO1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBjb250ZW50IH0pO1xuICAgICAgICAgICAgdXJsICs9IGNvcmV1dGlsc18xLlVSTEV4dC5vYmplY3RUb1F1ZXJ5U3RyaW5nKHBhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLnNlcnZlclNldHRpbmdzO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IF9fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VSZXF1ZXN0KHVybCwge30sIHNldHRpbmdzKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBhd2FpdCBfXzEuU2VydmVyQ29ubmVjdGlvbi5SZXNwb25zZUVycm9yLmNyZWF0ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgdmFsaWRhdGUudmFsaWRhdGVDb250ZW50c01vZGVsKGRhdGEpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGFuIGVuY29kZWQgZG93bmxvYWQgdXJsIGdpdmVuIGEgZmlsZSBwYXRoLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxvY2FsUGF0aCAtIEFuIGFic29sdXRlIFBPU0lYIGZpbGUgcGF0aCBvbiB0aGUgc2VydmVyLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIEl0IGlzIGV4cGVjdGVkIHRoYXQgdGhlIHBhdGggY29udGFpbnMgbm8gcmVsYXRpdmUgcGF0aHMuXG4gICAgICpcbiAgICAgKiBUaGUgcmV0dXJuZWQgVVJMIG1heSBpbmNsdWRlIGEgcXVlcnkgcGFyYW1ldGVyLlxuICAgICAqL1xuICAgIGdldERvd25sb2FkVXJsKGxvY2FsUGF0aCkge1xuICAgICAgICBjb25zdCBiYXNlVXJsID0gdGhpcy5zZXJ2ZXJTZXR0aW5ncy5iYXNlVXJsO1xuICAgICAgICBsZXQgdXJsID0gY29yZXV0aWxzXzEuVVJMRXh0LmpvaW4oYmFzZVVybCwgRklMRVNfVVJMLCBjb3JldXRpbHNfMS5VUkxFeHQuZW5jb2RlUGFydHMobG9jYWxQYXRoKSk7XG4gICAgICAgIGNvbnN0IHhzcmZUb2tlbk1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKCdcXFxcYl94c3JmPShbXjtdKilcXFxcYicpO1xuICAgICAgICBpZiAoeHNyZlRva2VuTWF0Y2gpIHtcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxVcmwgPSBuZXcgVVJMKHVybCk7XG4gICAgICAgICAgICBmdWxsVXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoJ194c3JmJywgeHNyZlRva2VuTWF0Y2hbMV0pO1xuICAgICAgICAgICAgdXJsID0gZnVsbFVybC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodXJsKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHVudGl0bGVkIGZpbGUgb3IgZGlyZWN0b3J5IGluIHRoZSBzcGVjaWZpZWQgZGlyZWN0b3J5IHBhdGguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9uczogVGhlIG9wdGlvbnMgdXNlZCB0byBjcmVhdGUgdGhlIGZpbGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2l0aCB0aGUgY3JlYXRlZCBmaWxlIGNvbnRlbnQgd2hlbiB0aGVcbiAgICAgKiAgICBmaWxlIGlzIGNyZWF0ZWQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVXNlcyB0aGUgW0p1cHl0ZXIgTm90ZWJvb2sgQVBJXShodHRwOi8vcGV0c3RvcmUuc3dhZ2dlci5pby8/dXJsPWh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9qdXB5dGVyL25vdGVib29rL21hc3Rlci9ub3RlYm9vay9zZXJ2aWNlcy9hcGkvYXBpLnlhbWwjIS9jb250ZW50cykgYW5kIHZhbGlkYXRlcyB0aGUgcmVzcG9uc2UgbW9kZWwuXG4gICAgICovXG4gICAgYXN5bmMgbmV3VW50aXRsZWQob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgbGV0IGJvZHkgPSAne30nO1xuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZXh0KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5leHQgPSBQcml2YXRlLm5vcm1hbGl6ZUV4dGVuc2lvbihvcHRpb25zLmV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLnNlcnZlclNldHRpbmdzO1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9nZXRVcmwoKF9hID0gb3B0aW9ucy5wYXRoKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJyk7XG4gICAgICAgIGNvbnN0IGluaXQgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHlcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBfXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlUmVxdWVzdCh1cmwsIGluaXQsIHNldHRpbmdzKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAxKSB7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBhd2FpdCBfXzEuU2VydmVyQ29ubmVjdGlvbi5SZXNwb25zZUVycm9yLmNyZWF0ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgdmFsaWRhdGUudmFsaWRhdGVDb250ZW50c01vZGVsKGRhdGEpO1xuICAgICAgICB0aGlzLl9maWxlQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6ICduZXcnLFxuICAgICAgICAgICAgb2xkVmFsdWU6IG51bGwsXG4gICAgICAgICAgICBuZXdWYWx1ZTogZGF0YVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBhIGZpbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbG9jYWxQYXRoIC0gVGhlIHBhdGggdG8gdGhlIGZpbGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2hlbiB0aGUgZmlsZSBpcyBkZWxldGVkLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFVzZXMgdGhlIFtKdXB5dGVyIE5vdGVib29rIEFQSV0oaHR0cDovL3BldHN0b3JlLnN3YWdnZXIuaW8vP3VybD1odHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vanVweXRlci9ub3RlYm9vay9tYXN0ZXIvbm90ZWJvb2svc2VydmljZXMvYXBpL2FwaS55YW1sIyEvY29udGVudHMpLlxuICAgICAqL1xuICAgIGFzeW5jIGRlbGV0ZShsb2NhbFBhdGgpIHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5fZ2V0VXJsKGxvY2FsUGF0aCk7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5zZXJ2ZXJTZXR0aW5ncztcbiAgICAgICAgY29uc3QgaW5pdCA9IHsgbWV0aG9kOiAnREVMRVRFJyB9O1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IF9fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VSZXF1ZXN0KHVybCwgaW5pdCwgc2V0dGluZ3MpO1xuICAgICAgICAvLyBUT0RPOiB1cGRhdGUgSVBFUDI3IHRvIHNwZWNpZnkgZXJyb3JzIG1vcmUgcHJlY2lzZWx5LCBzb1xuICAgICAgICAvLyB0aGF0IGVycm9yIHR5cGVzIGNhbiBiZSBkZXRlY3RlZCBoZXJlIHdpdGggY2VydGFpbnR5LlxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDQpIHtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IGF3YWl0IF9fMS5TZXJ2ZXJDb25uZWN0aW9uLlJlc3BvbnNlRXJyb3IuY3JlYXRlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9maWxlQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6ICdkZWxldGUnLFxuICAgICAgICAgICAgb2xkVmFsdWU6IHsgcGF0aDogbG9jYWxQYXRoIH0sXG4gICAgICAgICAgICBuZXdWYWx1ZTogbnVsbFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuYW1lIGEgZmlsZSBvciBkaXJlY3RvcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2xkTG9jYWxQYXRoIC0gVGhlIG9yaWdpbmFsIGZpbGUgcGF0aC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuZXdMb2NhbFBhdGggLSBUaGUgbmV3IGZpbGUgcGF0aC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aXRoIHRoZSBuZXcgZmlsZSBjb250ZW50cyBtb2RlbCB3aGVuXG4gICAgICogICB0aGUgZmlsZSBpcyByZW5hbWVkLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFVzZXMgdGhlIFtKdXB5dGVyIE5vdGVib29rIEFQSV0oaHR0cDovL3BldHN0b3JlLnN3YWdnZXIuaW8vP3VybD1odHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vanVweXRlci9ub3RlYm9vay9tYXN0ZXIvbm90ZWJvb2svc2VydmljZXMvYXBpL2FwaS55YW1sIyEvY29udGVudHMpIGFuZCB2YWxpZGF0ZXMgdGhlIHJlc3BvbnNlIG1vZGVsLlxuICAgICAqL1xuICAgIGFzeW5jIHJlbmFtZShvbGRMb2NhbFBhdGgsIG5ld0xvY2FsUGF0aCkge1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuc2VydmVyU2V0dGluZ3M7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuX2dldFVybChvbGRMb2NhbFBhdGgpO1xuICAgICAgICBjb25zdCBpbml0ID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBwYXRoOiBuZXdMb2NhbFBhdGggfSlcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBfXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlUmVxdWVzdCh1cmwsIGluaXQsIHNldHRpbmdzKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBhd2FpdCBfXzEuU2VydmVyQ29ubmVjdGlvbi5SZXNwb25zZUVycm9yLmNyZWF0ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgdmFsaWRhdGUudmFsaWRhdGVDb250ZW50c01vZGVsKGRhdGEpO1xuICAgICAgICB0aGlzLl9maWxlQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6ICdyZW5hbWUnLFxuICAgICAgICAgICAgb2xkVmFsdWU6IHsgcGF0aDogb2xkTG9jYWxQYXRoIH0sXG4gICAgICAgICAgICBuZXdWYWx1ZTogZGF0YVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhdmUgYSBmaWxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxvY2FsUGF0aCAtIFRoZSBkZXNpcmVkIGZpbGUgcGF0aC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwgb3ZlcnJpZGVzIHRvIHRoZSBtb2RlbC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aXRoIHRoZSBmaWxlIGNvbnRlbnQgbW9kZWwgd2hlbiB0aGVcbiAgICAgKiAgIGZpbGUgaXMgc2F2ZWQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogRW5zdXJlIHRoYXQgYG1vZGVsLmNvbnRlbnRgIGlzIHBvcHVsYXRlZCBmb3IgdGhlIGZpbGUuXG4gICAgICpcbiAgICAgKiBVc2VzIHRoZSBbSnVweXRlciBOb3RlYm9vayBBUEldKGh0dHA6Ly9wZXRzdG9yZS5zd2FnZ2VyLmlvLz91cmw9aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2p1cHl0ZXIvbm90ZWJvb2svbWFzdGVyL25vdGVib29rL3NlcnZpY2VzL2FwaS9hcGkueWFtbCMhL2NvbnRlbnRzKSBhbmQgdmFsaWRhdGVzIHRoZSByZXNwb25zZSBtb2RlbC5cbiAgICAgKi9cbiAgICBhc3luYyBzYXZlKGxvY2FsUGF0aCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5zZXJ2ZXJTZXR0aW5ncztcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5fZ2V0VXJsKGxvY2FsUGF0aCk7XG4gICAgICAgIGNvbnN0IGluaXQgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkob3B0aW9ucylcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBfXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlUmVxdWVzdCh1cmwsIGluaXQsIHNldHRpbmdzKTtcbiAgICAgICAgLy8gd2lsbCByZXR1cm4gMjAwIGZvciBhbiBleGlzdGluZyBmaWxlIGFuZCAyMDEgZm9yIGEgbmV3IGZpbGVcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAxKSB7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBhd2FpdCBfXzEuU2VydmVyQ29ubmVjdGlvbi5SZXNwb25zZUVycm9yLmNyZWF0ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgdmFsaWRhdGUudmFsaWRhdGVDb250ZW50c01vZGVsKGRhdGEpO1xuICAgICAgICB0aGlzLl9maWxlQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6ICdzYXZlJyxcbiAgICAgICAgICAgIG9sZFZhbHVlOiBudWxsLFxuICAgICAgICAgICAgbmV3VmFsdWU6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb3B5IGEgZmlsZSBpbnRvIGEgZ2l2ZW4gZGlyZWN0b3J5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGxvY2FsUGF0aCAtIFRoZSBvcmlnaW5hbCBmaWxlIHBhdGguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdG9EaXIgLSBUaGUgZGVzdGluYXRpb24gZGlyZWN0b3J5IHBhdGguXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2l0aCB0aGUgbmV3IGNvbnRlbnRzIG1vZGVsIHdoZW4gdGhlXG4gICAgICogIGZpbGUgaXMgY29waWVkLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSBzZXJ2ZXIgd2lsbCBzZWxlY3QgdGhlIG5hbWUgb2YgdGhlIGNvcGllZCBmaWxlLlxuICAgICAqXG4gICAgICogVXNlcyB0aGUgW0p1cHl0ZXIgTm90ZWJvb2sgQVBJXShodHRwOi8vcGV0c3RvcmUuc3dhZ2dlci5pby8/dXJsPWh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9qdXB5dGVyL25vdGVib29rL21hc3Rlci9ub3RlYm9vay9zZXJ2aWNlcy9hcGkvYXBpLnlhbWwjIS9jb250ZW50cykgYW5kIHZhbGlkYXRlcyB0aGUgcmVzcG9uc2UgbW9kZWwuXG4gICAgICovXG4gICAgYXN5bmMgY29weShmcm9tRmlsZSwgdG9EaXIpIHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLnNlcnZlclNldHRpbmdzO1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9nZXRVcmwodG9EaXIpO1xuICAgICAgICBjb25zdCBpbml0ID0ge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGNvcHlfZnJvbTogZnJvbUZpbGUgfSlcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBfXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlUmVxdWVzdCh1cmwsIGluaXQsIHNldHRpbmdzKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAxKSB7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBhd2FpdCBfXzEuU2VydmVyQ29ubmVjdGlvbi5SZXNwb25zZUVycm9yLmNyZWF0ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgdmFsaWRhdGUudmFsaWRhdGVDb250ZW50c01vZGVsKGRhdGEpO1xuICAgICAgICB0aGlzLl9maWxlQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6ICduZXcnLFxuICAgICAgICAgICAgb2xkVmFsdWU6IG51bGwsXG4gICAgICAgICAgICBuZXdWYWx1ZTogZGF0YVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGNoZWNrcG9pbnQgZm9yIGEgZmlsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsb2NhbFBhdGggLSBUaGUgcGF0aCBvZiB0aGUgZmlsZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aXRoIHRoZSBuZXcgY2hlY2twb2ludCBtb2RlbCB3aGVuIHRoZVxuICAgICAqICAgY2hlY2twb2ludCBpcyBjcmVhdGVkLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFVzZXMgdGhlIFtKdXB5dGVyIE5vdGVib29rIEFQSV0oaHR0cDovL3BldHN0b3JlLnN3YWdnZXIuaW8vP3VybD1odHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vanVweXRlci9ub3RlYm9vay9tYXN0ZXIvbm90ZWJvb2svc2VydmljZXMvYXBpL2FwaS55YW1sIyEvY29udGVudHMpIGFuZCB2YWxpZGF0ZXMgdGhlIHJlc3BvbnNlIG1vZGVsLlxuICAgICAqL1xuICAgIGFzeW5jIGNyZWF0ZUNoZWNrcG9pbnQobG9jYWxQYXRoKSB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuX2dldFVybChsb2NhbFBhdGgsICdjaGVja3BvaW50cycpO1xuICAgICAgICBjb25zdCBpbml0ID0geyBtZXRob2Q6ICdQT1NUJyB9O1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IF9fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VSZXF1ZXN0KHVybCwgaW5pdCwgdGhpcy5zZXJ2ZXJTZXR0aW5ncyk7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMSkge1xuICAgICAgICAgICAgY29uc3QgZXJyID0gYXdhaXQgX18xLlNlcnZlckNvbm5lY3Rpb24uUmVzcG9uc2VFcnJvci5jcmVhdGUocmVzcG9uc2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHZhbGlkYXRlLnZhbGlkYXRlQ2hlY2twb2ludE1vZGVsKGRhdGEpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlzdCBhdmFpbGFibGUgY2hlY2twb2ludHMgZm9yIGEgZmlsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsb2NhbFBhdGggLSBUaGUgcGF0aCBvZiB0aGUgZmlsZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aXRoIGEgbGlzdCBvZiBjaGVja3BvaW50IG1vZGVscyBmb3JcbiAgICAgKiAgICB0aGUgZmlsZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBVc2VzIHRoZSBbSnVweXRlciBOb3RlYm9vayBBUEldKGh0dHA6Ly9wZXRzdG9yZS5zd2FnZ2VyLmlvLz91cmw9aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2p1cHl0ZXIvbm90ZWJvb2svbWFzdGVyL25vdGVib29rL3NlcnZpY2VzL2FwaS9hcGkueWFtbCMhL2NvbnRlbnRzKSBhbmQgdmFsaWRhdGVzIHRoZSByZXNwb25zZSBtb2RlbC5cbiAgICAgKi9cbiAgICBhc3luYyBsaXN0Q2hlY2twb2ludHMobG9jYWxQYXRoKSB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuX2dldFVybChsb2NhbFBhdGgsICdjaGVja3BvaW50cycpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IF9fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VSZXF1ZXN0KHVybCwge30sIHRoaXMuc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IGF3YWl0IF9fMS5TZXJ2ZXJDb25uZWN0aW9uLlJlc3BvbnNlRXJyb3IuY3JlYXRlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBDaGVja3BvaW50IGxpc3QnKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhbGlkYXRlLnZhbGlkYXRlQ2hlY2twb2ludE1vZGVsKGRhdGFbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXN0b3JlIGEgZmlsZSB0byBhIGtub3duIGNoZWNrcG9pbnQgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbG9jYWxQYXRoIC0gVGhlIHBhdGggb2YgdGhlIGZpbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hlY2twb2ludElEIC0gVGhlIGlkIG9mIHRoZSBjaGVja3BvaW50IHRvIHJlc3RvcmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2hlbiB0aGUgY2hlY2twb2ludCBpcyByZXN0b3JlZC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBVc2VzIHRoZSBbSnVweXRlciBOb3RlYm9vayBBUEldKGh0dHA6Ly9wZXRzdG9yZS5zd2FnZ2VyLmlvLz91cmw9aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2p1cHl0ZXIvbm90ZWJvb2svbWFzdGVyL25vdGVib29rL3NlcnZpY2VzL2FwaS9hcGkueWFtbCMhL2NvbnRlbnRzKS5cbiAgICAgKi9cbiAgICBhc3luYyByZXN0b3JlQ2hlY2twb2ludChsb2NhbFBhdGgsIGNoZWNrcG9pbnRJRCkge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9nZXRVcmwobG9jYWxQYXRoLCAnY2hlY2twb2ludHMnLCBjaGVja3BvaW50SUQpO1xuICAgICAgICBjb25zdCBpbml0ID0geyBtZXRob2Q6ICdQT1NUJyB9O1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IF9fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VSZXF1ZXN0KHVybCwgaW5pdCwgdGhpcy5zZXJ2ZXJTZXR0aW5ncyk7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwNCkge1xuICAgICAgICAgICAgY29uc3QgZXJyID0gYXdhaXQgX18xLlNlcnZlckNvbm5lY3Rpb24uUmVzcG9uc2VFcnJvci5jcmVhdGUocmVzcG9uc2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBhIGNoZWNrcG9pbnQgZm9yIGEgZmlsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsb2NhbFBhdGggLSBUaGUgcGF0aCBvZiB0aGUgZmlsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGVja3BvaW50SUQgLSBUaGUgaWQgb2YgdGhlIGNoZWNrcG9pbnQgdG8gZGVsZXRlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHdoZW4gdGhlIGNoZWNrcG9pbnQgaXMgZGVsZXRlZC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBVc2VzIHRoZSBbSnVweXRlciBOb3RlYm9vayBBUEldKGh0dHA6Ly9wZXRzdG9yZS5zd2FnZ2VyLmlvLz91cmw9aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2p1cHl0ZXIvbm90ZWJvb2svbWFzdGVyL25vdGVib29rL3NlcnZpY2VzL2FwaS9hcGkueWFtbCMhL2NvbnRlbnRzKS5cbiAgICAgKi9cbiAgICBhc3luYyBkZWxldGVDaGVja3BvaW50KGxvY2FsUGF0aCwgY2hlY2twb2ludElEKSB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuX2dldFVybChsb2NhbFBhdGgsICdjaGVja3BvaW50cycsIGNoZWNrcG9pbnRJRCk7XG4gICAgICAgIGNvbnN0IGluaXQgPSB7IG1ldGhvZDogJ0RFTEVURScgfTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBfXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlUmVxdWVzdCh1cmwsIGluaXQsIHRoaXMuc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDQpIHtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IGF3YWl0IF9fMS5TZXJ2ZXJDb25uZWN0aW9uLlJlc3BvbnNlRXJyb3IuY3JlYXRlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYSBSRVNUIHVybCBmb3IgYSBmaWxlIGdpdmVuIGEgcGF0aC5cbiAgICAgKi9cbiAgICBfZ2V0VXJsKC4uLmFyZ3MpIHtcbiAgICAgICAgY29uc3QgcGFydHMgPSBhcmdzLm1hcChwYXRoID0+IGNvcmV1dGlsc18xLlVSTEV4dC5lbmNvZGVQYXJ0cyhwYXRoKSk7XG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPSB0aGlzLnNlcnZlclNldHRpbmdzLmJhc2VVcmw7XG4gICAgICAgIHJldHVybiBjb3JldXRpbHNfMS5VUkxFeHQuam9pbihiYXNlVXJsLCB0aGlzLl9hcGlFbmRwb2ludCwgLi4ucGFydHMpO1xuICAgIH1cbn1cbmV4cG9ydHMuRHJpdmUgPSBEcml2ZTtcbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIG1vZHVsZSBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogTm9ybWFsaXplIGEgZmlsZSBleHRlbnNpb24gdG8gYmUgb2YgdGhlIHR5cGUgYCcuZm9vJ2AuXG4gICAgICpcbiAgICAgKiBBZGRzIGEgbGVhZGluZyBkb3QgaWYgbm90IHByZXNlbnQgYW5kIGNvbnZlcnRzIHRvIGxvd2VyIGNhc2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplRXh0ZW5zaW9uKGV4dGVuc2lvbikge1xuICAgICAgICBpZiAoZXh0ZW5zaW9uLmxlbmd0aCA+IDAgJiYgZXh0ZW5zaW9uLmluZGV4T2YoJy4nKSAhPT0gMCkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gYC4ke2V4dGVuc2lvbn1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbnNpb247XG4gICAgfVxuICAgIFByaXZhdGUubm9ybWFsaXplRXh0ZW5zaW9uID0gbm9ybWFsaXplRXh0ZW5zaW9uO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudmFsaWRhdGVDaGVja3BvaW50TW9kZWwgPSBleHBvcnRzLnZhbGlkYXRlQ29udGVudHNNb2RlbCA9IHZvaWQgMDtcbmNvbnN0IHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG4vKipcbiAqIFZhbGlkYXRlIGFuIGBDb250ZW50cy5JTW9kZWxgIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVDb250ZW50c01vZGVsKG1vZGVsKSB7XG4gICAgdmFsaWRhdGVfMS52YWxpZGF0ZVByb3BlcnR5KG1vZGVsLCAnbmFtZScsICdzdHJpbmcnKTtcbiAgICB2YWxpZGF0ZV8xLnZhbGlkYXRlUHJvcGVydHkobW9kZWwsICdwYXRoJywgJ3N0cmluZycpO1xuICAgIHZhbGlkYXRlXzEudmFsaWRhdGVQcm9wZXJ0eShtb2RlbCwgJ3R5cGUnLCAnc3RyaW5nJyk7XG4gICAgdmFsaWRhdGVfMS52YWxpZGF0ZVByb3BlcnR5KG1vZGVsLCAnY3JlYXRlZCcsICdzdHJpbmcnKTtcbiAgICB2YWxpZGF0ZV8xLnZhbGlkYXRlUHJvcGVydHkobW9kZWwsICdsYXN0X21vZGlmaWVkJywgJ3N0cmluZycpO1xuICAgIHZhbGlkYXRlXzEudmFsaWRhdGVQcm9wZXJ0eShtb2RlbCwgJ21pbWV0eXBlJywgJ29iamVjdCcpO1xuICAgIHZhbGlkYXRlXzEudmFsaWRhdGVQcm9wZXJ0eShtb2RlbCwgJ2NvbnRlbnQnLCAnb2JqZWN0Jyk7XG4gICAgdmFsaWRhdGVfMS52YWxpZGF0ZVByb3BlcnR5KG1vZGVsLCAnZm9ybWF0JywgJ29iamVjdCcpO1xufVxuZXhwb3J0cy52YWxpZGF0ZUNvbnRlbnRzTW9kZWwgPSB2YWxpZGF0ZUNvbnRlbnRzTW9kZWw7XG4vKipcbiAqIFZhbGlkYXRlIGFuIGBDb250ZW50cy5JQ2hlY2twb2ludE1vZGVsYCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlQ2hlY2twb2ludE1vZGVsKG1vZGVsKSB7XG4gICAgdmFsaWRhdGVfMS52YWxpZGF0ZVByb3BlcnR5KG1vZGVsLCAnaWQnLCAnc3RyaW5nJyk7XG4gICAgdmFsaWRhdGVfMS52YWxpZGF0ZVByb3BlcnR5KG1vZGVsLCAnbGFzdF9tb2RpZmllZCcsICdzdHJpbmcnKTtcbn1cbmV4cG9ydHMudmFsaWRhdGVDaGVja3BvaW50TW9kZWwgPSB2YWxpZGF0ZUNoZWNrcG9pbnRNb2RlbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZhbGlkYXRlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgc2VydmljZXNcbiAqL1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vY29uZmlnXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9jb250ZW50c1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4va2VybmVsXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9rZXJuZWxzcGVjXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9tYW5hZ2VyXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9zZXJ2ZXJjb25uZWN0aW9uXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9zZXNzaW9uXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9zZXR0aW5nXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi90ZXJtaW5hbFwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vd29ya3NwYWNlXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9uYmNvbnZlcnRcIiksIGV4cG9ydHMpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ29tbUhhbmRsZXIgPSB2b2lkIDA7XG5jb25zdCBkaXNwb3NhYmxlXzEgPSByZXF1aXJlKFwiQGx1bWluby9kaXNwb3NhYmxlXCIpO1xuY29uc3QgS2VybmVsTWVzc2FnZSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9tZXNzYWdlc1wiKSk7XG4vKipcbiAqIENvbW0gY2hhbm5lbCBoYW5kbGVyLlxuICovXG5jbGFzcyBDb21tSGFuZGxlciBleHRlbmRzIGRpc3Bvc2FibGVfMS5EaXNwb3NhYmxlRGVsZWdhdGUge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBjb21tIGNoYW5uZWwuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodGFyZ2V0LCBpZCwga2VybmVsLCBkaXNwb3NlQ2IpIHtcbiAgICAgICAgc3VwZXIoZGlzcG9zZUNiKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0ID0gJyc7XG4gICAgICAgIHRoaXMuX2lkID0gJyc7XG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XG4gICAgICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICAgICAgdGhpcy5fa2VybmVsID0ga2VybmVsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgdW5pcXVlIGlkIGZvciB0aGUgY29tbSBjaGFubmVsLlxuICAgICAqL1xuICAgIGdldCBjb21tSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBuYW1lIGZvciB0aGUgY29tbSBjaGFubmVsLlxuICAgICAqL1xuICAgIGdldCB0YXJnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNhbGxiYWNrIGZvciBhIGNvbW0gY2xvc2UgZXZlbnQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBpcyBjYWxsZWQgd2hlbiB0aGUgY29tbSBpcyBjbG9zZWQgZnJvbSBlaXRoZXIgdGhlIHNlcnZlciBvciBjbGllbnQuXG4gICAgICpcbiAgICAgKiAqKlNlZSBhbHNvOioqIFtbSUNvbW1DbG9zZV1dLCBbW2Nsb3NlXV1cbiAgICAgKi9cbiAgICBnZXQgb25DbG9zZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29uQ2xvc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY2FsbGJhY2sgZm9yIGEgY29tbSBjbG9zZSBldmVudC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGlzIGNhbGxlZCB3aGVuIHRoZSBjb21tIGlzIGNsb3NlZCBmcm9tIGVpdGhlciB0aGUgc2VydmVyIG9yIGNsaWVudC4gSWZcbiAgICAgKiB0aGUgZnVuY3Rpb24gcmV0dXJucyBhIHByb21pc2UsIGFuZCB0aGUga2VybmVsIHdhcyBjbG9zZWQgZnJvbSB0aGUgc2VydmVyLFxuICAgICAqIGtlcm5lbCBtZXNzYWdlIHByb2Nlc3Npbmcgd2lsbCBwYXVzZSB1bnRpbCB0aGUgcmV0dXJuZWQgcHJvbWlzZSBpc1xuICAgICAqIGZ1bGZpbGxlZC5cbiAgICAgKlxuICAgICAqICoqU2VlIGFsc286KiogW1tjbG9zZV1dXG4gICAgICovXG4gICAgc2V0IG9uQ2xvc2UoY2IpIHtcbiAgICAgICAgdGhpcy5fb25DbG9zZSA9IGNiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNhbGxiYWNrIGZvciBhIGNvbW0gbWVzc2FnZSByZWNlaXZlZCBldmVudC5cbiAgICAgKi9cbiAgICBnZXQgb25Nc2coKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbk1zZztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjYWxsYmFjayBmb3IgYSBjb21tIG1lc3NhZ2UgcmVjZWl2ZWQgZXZlbnQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBpcyBjYWxsZWQgd2hlbiBhIGNvbW0gbWVzc2FnZSBpcyByZWNlaXZlZC4gSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgYVxuICAgICAqIHByb21pc2UsIGtlcm5lbCBtZXNzYWdlIHByb2Nlc3Npbmcgd2lsbCBwYXVzZSB1bnRpbCBpdCBpcyBmdWxmaWxsZWQuXG4gICAgICovXG4gICAgc2V0IG9uTXNnKGNiKSB7XG4gICAgICAgIHRoaXMuX29uTXNnID0gY2I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wZW4gYSBjb21tIHdpdGggb3B0aW9uYWwgZGF0YSBhbmQgbWV0YWRhdGEuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBzZW5kcyBhIGBjb21tX29wZW5gIG1lc3NhZ2UgdG8gdGhlIHNlcnZlci5cbiAgICAgKlxuICAgICAqICoqU2VlIGFsc286KiogW1tJQ29tbU9wZW5dXVxuICAgICAqL1xuICAgIG9wZW4oZGF0YSwgbWV0YWRhdGEsIGJ1ZmZlcnMgPSBbXSkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkIHx8IHRoaXMuX2tlcm5lbC5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBvcGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbXNnID0gS2VybmVsTWVzc2FnZS5jcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgICAgIG1zZ1R5cGU6ICdjb21tX29wZW4nLFxuICAgICAgICAgICAgY2hhbm5lbDogJ3NoZWxsJyxcbiAgICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLl9rZXJuZWwudXNlcm5hbWUsXG4gICAgICAgICAgICBzZXNzaW9uOiB0aGlzLl9rZXJuZWwuY2xpZW50SWQsXG4gICAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICAgICAgY29tbV9pZDogdGhpcy5faWQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0X25hbWU6IHRoaXMuX3RhcmdldCxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhICE9PSBudWxsICYmIGRhdGEgIT09IHZvaWQgMCA/IGRhdGEgOiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1ldGFkYXRhLFxuICAgICAgICAgICAgYnVmZmVyc1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tlcm5lbC5zZW5kU2hlbGxNZXNzYWdlKG1zZywgZmFsc2UsIHRydWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgYGNvbW1fbXNnYCBtZXNzYWdlIHRvIHRoZSBrZXJuZWwuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBpcyBhIG5vLW9wIGlmIHRoZSBjb21tIGhhcyBiZWVuIGNsb3NlZC5cbiAgICAgKlxuICAgICAqICoqU2VlIGFsc286KiogW1tJQ29tbU1zZ11dXG4gICAgICovXG4gICAgc2VuZChkYXRhLCBtZXRhZGF0YSwgYnVmZmVycyA9IFtdLCBkaXNwb3NlT25Eb25lID0gdHJ1ZSkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkIHx8IHRoaXMuX2tlcm5lbC5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzZW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbXNnID0gS2VybmVsTWVzc2FnZS5jcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgICAgIG1zZ1R5cGU6ICdjb21tX21zZycsXG4gICAgICAgICAgICBjaGFubmVsOiAnc2hlbGwnLFxuICAgICAgICAgICAgdXNlcm5hbWU6IHRoaXMuX2tlcm5lbC51c2VybmFtZSxcbiAgICAgICAgICAgIHNlc3Npb246IHRoaXMuX2tlcm5lbC5jbGllbnRJZCxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICBjb21tX2lkOiB0aGlzLl9pZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWV0YWRhdGEsXG4gICAgICAgICAgICBidWZmZXJzXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5fa2VybmVsLnNlbmRTaGVsbE1lc3NhZ2UobXNnLCBmYWxzZSwgZGlzcG9zZU9uRG9uZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlIHRoZSBjb21tLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgd2lsbCBzZW5kIGEgYGNvbW1fY2xvc2VgIG1lc3NhZ2UgdG8gdGhlIGtlcm5lbCwgYW5kIGNhbGwgdGhlXG4gICAgICogYG9uQ2xvc2VgIGNhbGxiYWNrIGlmIHNldC5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgYSBuby1vcCBpZiB0aGUgY29tbSBpcyBhbHJlYWR5IGNsb3NlZC5cbiAgICAgKlxuICAgICAqICoqU2VlIGFsc286KiogW1tJQ29tbUNsb3NlXV0sIFtbb25DbG9zZV1dXG4gICAgICovXG4gICAgY2xvc2UoZGF0YSwgbWV0YWRhdGEsIGJ1ZmZlcnMgPSBbXSkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkIHx8IHRoaXMuX2tlcm5lbC5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjbG9zZScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1zZyA9IEtlcm5lbE1lc3NhZ2UuY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgICAgICBtc2dUeXBlOiAnY29tbV9jbG9zZScsXG4gICAgICAgICAgICBjaGFubmVsOiAnc2hlbGwnLFxuICAgICAgICAgICAgdXNlcm5hbWU6IHRoaXMuX2tlcm5lbC51c2VybmFtZSxcbiAgICAgICAgICAgIHNlc3Npb246IHRoaXMuX2tlcm5lbC5jbGllbnRJZCxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICBjb21tX2lkOiB0aGlzLl9pZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhICE9PSBudWxsICYmIGRhdGEgIT09IHZvaWQgMCA/IGRhdGEgOiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1ldGFkYXRhLFxuICAgICAgICAgICAgYnVmZmVyc1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZnV0dXJlID0gdGhpcy5fa2VybmVsLnNlbmRTaGVsbE1lc3NhZ2UobXNnLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIGNvbnN0IG9uQ2xvc2UgPSB0aGlzLl9vbkNsb3NlO1xuICAgICAgICBpZiAob25DbG9zZSkge1xuICAgICAgICAgICAgY29uc3QgaW9Nc2cgPSBLZXJuZWxNZXNzYWdlLmNyZWF0ZU1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIG1zZ1R5cGU6ICdjb21tX2Nsb3NlJyxcbiAgICAgICAgICAgICAgICBjaGFubmVsOiAnaW9wdWInLFxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLl9rZXJuZWwudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgc2Vzc2lvbjogdGhpcy5fa2VybmVsLmNsaWVudElkLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgY29tbV9pZDogdGhpcy5faWQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEgIT09IG51bGwgJiYgZGF0YSAhPT0gdm9pZCAwID8gZGF0YSA6IHt9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXRhZGF0YSxcbiAgICAgICAgICAgICAgICBidWZmZXJzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIEluIHRoZSBmdXR1cmUsIHdlIG1heSB3YW50IHRvIGNvbW11bmljYXRlIGJhY2sgdG8gdGhlIHVzZXIgdGhlIHBvc3NpYmxlXG4gICAgICAgICAgICAvLyBwcm9taXNlIHJldHVybmVkIGZyb20gb25DbG9zZS5cbiAgICAgICAgICAgIHZvaWQgb25DbG9zZShpb01zZyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgIHJldHVybiBmdXR1cmU7XG4gICAgfVxufVxuZXhwb3J0cy5Db21tSGFuZGxlciA9IENvbW1IYW5kbGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tbS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5LZXJuZWxDb25uZWN0aW9uID0gdm9pZCAwO1xuY29uc3QgY29yZXV0aWxzXzEgPSByZXF1aXJlKFwiQGp1cHl0ZXJsYWIvY29yZXV0aWxzXCIpO1xuY29uc3QgY29yZXV0aWxzXzIgPSByZXF1aXJlKFwiQGx1bWluby9jb3JldXRpbHNcIik7XG5jb25zdCBzaWduYWxpbmdfMSA9IHJlcXVpcmUoXCJAbHVtaW5vL3NpZ25hbGluZ1wiKTtcbmNvbnN0IF9fMSA9IHJlcXVpcmUoXCIuLlwiKTtcbmNvbnN0IGNvbW1fMSA9IHJlcXVpcmUoXCIuL2NvbW1cIik7XG5jb25zdCBLZXJuZWxNZXNzYWdlID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL21lc3NhZ2VzXCIpKTtcbmNvbnN0IGZ1dHVyZV8xID0gcmVxdWlyZShcIi4vZnV0dXJlXCIpO1xuY29uc3Qgc2VyaWFsaXplID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3NlcmlhbGl6ZVwiKSk7XG5jb25zdCB2YWxpZGF0ZSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi92YWxpZGF0ZVwiKSk7XG5jb25zdCBrZXJuZWxzcGVjXzEgPSByZXF1aXJlKFwiLi4va2VybmVsc3BlY1wiKTtcbmNvbnN0IHJlc3RhcGkgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vcmVzdGFwaVwiKSk7XG5jb25zdCBLRVJORUxfSU5GT19USU1FT1VUID0gMzAwMDtcbmNvbnN0IFJFU1RBUlRJTkdfS0VSTkVMX1NFU1NJT04gPSAnX1JFU1RBUlRJTkdfJztcbmNvbnN0IFNUQVJUSU5HX0tFUk5FTF9TRVNTSU9OID0gJyc7XG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBLZXJuZWwgb2JqZWN0LlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIE1lc3NhZ2VzIGZyb20gdGhlIHNlcnZlciBhcmUgaGFuZGxlZCBpbiB0aGUgb3JkZXIgdGhleSB3ZXJlIHJlY2VpdmVkIGFuZFxuICogYXN5bmNocm9ub3VzbHkuIEFueSBtZXNzYWdlIGhhbmRsZXIgY2FuIHJldHVybiBhIHByb21pc2UsIGFuZCBtZXNzYWdlXG4gKiBoYW5kbGluZyB3aWxsIHBhdXNlIHVudGlsIHRoZSBwcm9taXNlIGlzIGZ1bGZpbGxlZC5cbiAqL1xuY2xhc3MgS2VybmVsQ29ubmVjdGlvbiB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEga2VybmVsIG9iamVjdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSB0aGUga2VybmVsIHdlYnNvY2tldCBjb25uZWN0aW9uIGFuZCBhZGQgc29ja2V0IHN0YXR1cyBoYW5kbGVycy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2NyZWF0ZVNvY2tldCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9ySWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBzb2NrZXQgaXMgY2xlYXJcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyU29ja2V0KCk7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGNvbm5lY3Rpb24gc3RhdHVzIHRvIHJlZmxlY3Qgb3BlbmluZyBhIG5ldyBjb25uZWN0aW9uLlxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ29ubmVjdGlvblN0YXR1cygnY29ubmVjdGluZycpO1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLnNlcnZlclNldHRpbmdzO1xuICAgICAgICAgICAgY29uc3QgcGFydGlhbFVybCA9IGNvcmV1dGlsc18xLlVSTEV4dC5qb2luKHNldHRpbmdzLndzVXJsLCByZXN0YXBpLktFUk5FTF9TRVJWSUNFX1VSTCwgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuX2lkKSk7XG4gICAgICAgICAgICAvLyBTdHJpcCBhbnkgYXV0aGVudGljYXRpb24gZnJvbSB0aGUgZGlzcGxheSBzdHJpbmcuXG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5ID0gcGFydGlhbFVybC5yZXBsYWNlKC9eKCg/Olxcdys6KT9cXC9cXC8pKD86W15AXFwvXStAKS8sICckMScpO1xuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhgU3RhcnRpbmcgV2ViU29ja2V0OiAke2Rpc3BsYXl9YCk7XG4gICAgICAgICAgICBsZXQgdXJsID0gY29yZXV0aWxzXzEuVVJMRXh0LmpvaW4ocGFydGlhbFVybCwgJ2NoYW5uZWxzP3Nlc3Npb25faWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLl9jbGllbnRJZCkpO1xuICAgICAgICAgICAgLy8gSWYgdG9rZW4gYXV0aGVudGljYXRpb24gaXMgaW4gdXNlLlxuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBzZXR0aW5ncy50b2tlbjtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5hcHBlbmRUb2tlbiAmJiB0b2tlbiAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmwgKyBgJnRva2VuPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRva2VuKX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fd3MgPSBuZXcgc2V0dGluZ3MuV2ViU29ja2V0KHVybCk7XG4gICAgICAgICAgICAvLyBFbnN1cmUgaW5jb21pbmcgYmluYXJ5IG1lc3NhZ2VzIGFyZSBub3QgQmxvYnNcbiAgICAgICAgICAgIHRoaXMuX3dzLmJpbmFyeVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICAgICAgbGV0IGFscmVhZHlDYWxsZWRPbmNsb3NlID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBnZXRLZXJuZWxNb2RlbCA9IGFzeW5jIChldnQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVhc29uID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW9kZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZWwgPSBhd2FpdCByZXN0YXBpLmdldEtlcm5lbE1vZGVsKHRoaXMuX2lkLCBzZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XG4gICAgICAgICAgICAgICAgICAgIGlmICgobW9kZWwgPT09IG51bGwgfHwgbW9kZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGVsLmV4ZWN1dGlvbl9zdGF0ZSkgPT09ICdkZWFkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3RhdHVzKCdkZWFkJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbldTQ2xvc2UoZXZ0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRyeSBhZ2FpbiwgaWYgdGhlcmUgaXMgYSBuZXR3b3JrIGZhaWx1cmVcbiAgICAgICAgICAgICAgICAgICAgLy8gSGFuZGxlIG5ldHdvcmsgZXJyb3JzLCBhcyB3ZWxsIGFzIGNhc2VzIHdoZXJlIHdlIGFyZSBvbiBhXG4gICAgICAgICAgICAgICAgICAgIC8vIEp1cHl0ZXJIdWIgYW5kIHRoZSBzZXJ2ZXIgaXMgbm90IHJ1bm5pbmcuIEp1cHl0ZXJIdWIgcmV0dXJucyBhXG4gICAgICAgICAgICAgICAgICAgIC8vIDUwMyAoPDIuMCkgb3IgNDI0ICg+Mi4wKSBpbiB0aGF0IGNhc2UuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBfXzEuU2VydmVyQ29ubmVjdGlvbi5OZXR3b3JrRXJyb3IgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICgoX2EgPSBlcnIucmVzcG9uc2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zdGF0dXMpID09PSA1MDMgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICgoX2IgPSBlcnIucmVzcG9uc2UpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zdGF0dXMpID09PSA0MjQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVvdXQgPSBQcml2YXRlLmdldFJhbmRvbUludEluY2x1c2l2ZSgxMCwgMzApICogMWUzO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChnZXRLZXJuZWxNb2RlbCwgdGltZW91dCwgZXZ0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlYXNvbiA9ICdLZXJuZWwgZGllZCB1bmV4cGVjdGVkbHknO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3RhdHVzKCdkZWFkJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGVhcmx5Q2xvc2UgPSBhc3luYyAoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHdlYnNvY2tldCB3YXMgY2xvc2VkIGVhcmx5LCB0aGF0IGNvdWxkIG1lYW5cbiAgICAgICAgICAgICAgICAvLyB0aGF0IHRoZSBrZXJuZWwgaXMgYWN0dWFsbHkgZGVhZC4gVHJ5IGdldHRpbmdcbiAgICAgICAgICAgICAgICAvLyBpbmZvcm1hdGlvbiBhYm91dCB0aGUga2VybmVsIGZyb20gdGhlIEFQSSBjYWxsLFxuICAgICAgICAgICAgICAgIC8vIGlmIHRoYXQgZmFpbHMsIHRoZW4gYXNzdW1lIHRoZSBrZXJuZWwgaXMgZGVhZCxcbiAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2UganVzdCBmb2xsb3cgdGhlIHR5cGljYWwgd2Vic29ja2V0IGNsb3NlZFxuICAgICAgICAgICAgICAgIC8vIHByb3RvY29sLlxuICAgICAgICAgICAgICAgIGlmIChhbHJlYWR5Q2FsbGVkT25jbG9zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFscmVhZHlDYWxsZWRPbmNsb3NlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhd2FpdCBnZXRLZXJuZWxNb2RlbChldnQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl93cy5vbm1lc3NhZ2UgPSB0aGlzLl9vbldTTWVzc2FnZTtcbiAgICAgICAgICAgIHRoaXMuX3dzLm9ub3BlbiA9IHRoaXMuX29uV1NPcGVuO1xuICAgICAgICAgICAgdGhpcy5fd3Mub25jbG9zZSA9IGVhcmx5Q2xvc2U7XG4gICAgICAgICAgICB0aGlzLl93cy5vbmVycm9yID0gZWFybHlDbG9zZTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gTWFrZSB3ZWJzb2NrZXQgY2FsbGJhY2tzIGFycm93IGZ1bmN0aW9ucyBzbyB0aGV5IGJpbmQgYHRoaXNgLlxuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIGEgd2Vic29ja2V0IG9wZW4gZXZlbnQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9vbldTT3BlbiA9IChldnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3dzLm9uY2xvc2UgPSB0aGlzLl9vbldTQ2xvc2U7XG4gICAgICAgICAgICB0aGlzLl93cy5vbmVycm9yID0gdGhpcy5fb25XU0Nsb3NlO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ29ubmVjdGlvblN0YXR1cygnY29ubmVjdGVkJyk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYSB3ZWJzb2NrZXQgbWVzc2FnZSwgdmFsaWRhdGluZyBhbmQgcm91dGluZyBhcHByb3ByaWF0ZWx5LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fb25XU01lc3NhZ2UgPSAoZXZ0KSA9PiB7XG4gICAgICAgICAgICAvLyBOb3RpZnkgaW1tZWRpYXRlbHkgaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2l0aCB0aGUgbWVzc2FnZS5cbiAgICAgICAgICAgIGxldCBtc2c7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIG1zZyA9IHNlcmlhbGl6ZS5kZXNlcmlhbGl6ZShldnQuZGF0YSk7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGUudmFsaWRhdGVNZXNzYWdlKG1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gYEtlcm5lbCBtZXNzYWdlIHZhbGlkYXRpb24gZXJyb3I6ICR7ZXJyb3IubWVzc2FnZX1gO1xuICAgICAgICAgICAgICAgIC8vIFdlIHRocm93IHRoZSBlcnJvciBzbyB0aGF0IGl0IGJ1YmJsZXMgdXAgdG8gdGhlIHRvcCwgYW5kIGRpc3BsYXlzIHRoZSByaWdodCBzdGFjay5cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY3VycmVudCBrZXJuZWwgc2Vzc2lvbiBpZFxuICAgICAgICAgICAgdGhpcy5fa2VybmVsU2Vzc2lvbiA9IG1zZy5oZWFkZXIuc2Vzc2lvbjtcbiAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgbWVzc2FnZSBhc3luY2hyb25vdXNseSwgaW4gdGhlIG9yZGVyIHJlY2VpdmVkLlxuICAgICAgICAgICAgdGhpcy5fbXNnQ2hhaW4gPSB0aGlzLl9tc2dDaGFpblxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gc28gdGhhdCBhbnkgcHJvbWlzZXMgZnJvbSBoYW5kbGluZyBhIG1lc3NhZ2UgYXJlIGZ1bGZpbGxlZFxuICAgICAgICAgICAgICAgIC8vIGJlZm9yZSBwcm9jZWVkaW5nIHRvIHRoZSBuZXh0IG1lc3NhZ2UuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZU1lc3NhZ2UobXNnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAvLyBMb2cgYW55IGVycm9ycyBpbiBoYW5kbGluZyB0aGUgbWVzc2FnZSwgdGh1cyByZXNldHRpbmcgdGhlIF9tc2dDaGFpblxuICAgICAgICAgICAgICAgIC8vIHByb21pc2Ugc28gd2UgY2FuIHByb2Nlc3MgbW9yZSBtZXNzYWdlcy5cbiAgICAgICAgICAgICAgICAvLyBJZ25vcmUgdGhlIFwiQ2FuY2VsZWRcIiBlcnJvcnMgdGhhdCBhcmUgdGhyb3duIGR1cmluZyBrZXJuZWwgZGlzcG9zZS5cbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IubWVzc2FnZS5zdGFydHNXaXRoKCdDYW5jZWxlZCBmdXR1cmUgZm9yICcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gRW1pdCB0aGUgbWVzc2FnZSByZWNlaXZlIHNpZ25hbFxuICAgICAgICAgICAgdGhpcy5fYW55TWVzc2FnZS5lbWl0KHsgbXNnLCBkaXJlY3Rpb246ICdyZWN2JyB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZSBhIHdlYnNvY2tldCBjbG9zZSBldmVudC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX29uV1NDbG9zZSA9IChldnQpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2lkID0gJyc7XG4gICAgICAgIHRoaXMuX25hbWUgPSAnJztcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gJ3Vua25vd24nO1xuICAgICAgICB0aGlzLl9jb25uZWN0aW9uU3RhdHVzID0gJ2Nvbm5lY3RpbmcnO1xuICAgICAgICB0aGlzLl9rZXJuZWxTZXNzaW9uID0gJyc7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdlYnNvY2tldCB0byBjb21tdW5pY2F0ZSB3aXRoIGtlcm5lbC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3dzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdXNlcm5hbWUgPSAnJztcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0TGltaXQgPSA3O1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3RBdHRlbXB0ID0gMDtcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0VGltZW91dCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2Z1dHVyZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX2NvbW1zID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl90YXJnZXRSZWdpc3RyeSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2luZm8gPSBuZXcgY29yZXV0aWxzXzIuUHJvbWlzZURlbGVnYXRlKCk7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdNZXNzYWdlcyA9IFtdO1xuICAgICAgICB0aGlzLl9zdGF0dXNDaGFuZ2VkID0gbmV3IHNpZ25hbGluZ18xLlNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGlvblN0YXR1c0NoYW5nZWQgPSBuZXcgc2lnbmFsaW5nXzEuU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9kaXNwb3NlZCA9IG5ldyBzaWduYWxpbmdfMS5TaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2lvcHViTWVzc2FnZSA9IG5ldyBzaWduYWxpbmdfMS5TaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2FueU1lc3NhZ2UgPSBuZXcgc2lnbmFsaW5nXzEuU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9wZW5kaW5nSW5wdXQgPSBuZXcgc2lnbmFsaW5nXzEuU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl91bmhhbmRsZWRNZXNzYWdlID0gbmV3IHNpZ25hbGluZ18xLlNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZGlzcGxheUlkVG9QYXJlbnRJZHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX21zZ0lkVG9EaXNwbGF5SWRzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9tc2dDaGFpbiA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB0aGlzLl9oYXNQZW5kaW5nSW5wdXQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVhc29uID0gJyc7XG4gICAgICAgIHRoaXMuX25vT3AgPSAoKSA9PiB7XG4gICAgICAgICAgICAvKiBuby1vcCAqL1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9uYW1lID0gb3B0aW9ucy5tb2RlbC5uYW1lO1xuICAgICAgICB0aGlzLl9pZCA9IG9wdGlvbnMubW9kZWwuaWQ7XG4gICAgICAgIHRoaXMuc2VydmVyU2V0dGluZ3MgPSAoX2EgPSBvcHRpb25zLnNlcnZlclNldHRpbmdzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBfXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlU2V0dGluZ3MoKTtcbiAgICAgICAgdGhpcy5fY2xpZW50SWQgPSAoX2IgPSBvcHRpb25zLmNsaWVudElkKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBjb3JldXRpbHNfMi5VVUlELnV1aWQ0KCk7XG4gICAgICAgIHRoaXMuX3VzZXJuYW1lID0gKF9jID0gb3B0aW9ucy51c2VybmFtZSkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogJyc7XG4gICAgICAgIHRoaXMuaGFuZGxlQ29tbXMgPSAoX2QgPSBvcHRpb25zLmhhbmRsZUNvbW1zKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiB0cnVlO1xuICAgICAgICB0aGlzLl9jcmVhdGVTb2NrZXQoKTtcbiAgICB9XG4gICAgZ2V0IGRpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUga2VybmVsIHN0YXR1cyBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGdldCBzdGF0dXNDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHVzQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBrZXJuZWwgc3RhdHVzIGNoYW5nZXMuXG4gICAgICovXG4gICAgZ2V0IGNvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29ubmVjdGlvblN0YXR1c0NoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgZm9yIGlvcHViIGtlcm5lbCBtZXNzYWdlcy5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIHNpZ25hbCBpcyBlbWl0dGVkIGFmdGVyIHRoZSBpb3B1YiBtZXNzYWdlIGlzIGhhbmRsZWQgYXN5bmNocm9ub3VzbHkuXG4gICAgICovXG4gICAgZ2V0IGlvcHViTWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lvcHViTWVzc2FnZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCBmb3IgdW5oYW5kbGVkIGtlcm5lbCBtZXNzYWdlLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgc2lnbmFsIGlzIGVtaXR0ZWQgZm9yIGEgbWVzc2FnZSB0aGF0IHdhcyBub3QgaGFuZGxlZC4gSXQgaXMgZW1pdHRlZFxuICAgICAqIGR1cmluZyB0aGUgYXN5bmNocm9ub3VzIG1lc3NhZ2UgaGFuZGxpbmcgY29kZS5cbiAgICAgKi9cbiAgICBnZXQgdW5oYW5kbGVkTWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VuaGFuZGxlZE1lc3NhZ2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBrZXJuZWwgbW9kZWxcbiAgICAgKi9cbiAgICBnZXQgbW9kZWwoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5fbW9kZWwgfHwge1xuICAgICAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICByZWFzb246IHRoaXMuX3JlYXNvblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCBmb3IgYW55IGtlcm5lbCBtZXNzYWdlLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgc2lnbmFsIGlzIGVtaXR0ZWQgd2hlbiBhIG1lc3NhZ2UgaXMgcmVjZWl2ZWQsIGJlZm9yZSBpdCBpcyBoYW5kbGVkXG4gICAgICogYXN5bmNocm9ub3VzbHkuXG4gICAgICpcbiAgICAgKiBUaGlzIG1lc3NhZ2UgaXMgZW1pdHRlZCB3aGVuIGEgbWVzc2FnZSBpcyBxdWV1ZWQgZm9yIHNlbmRpbmcgKGVpdGhlciBpblxuICAgICAqIHRoZSB3ZWJzb2NrZXQgYnVmZmVyLCBvciBvdXIgb3duIHBlbmRpbmcgbWVzc2FnZSBidWZmZXIpLiBUaGUgbWVzc2FnZSBtYXlcbiAgICAgKiBhY3R1YWxseSBiZSBzZW50IGFjcm9zcyB0aGUgd2lyZSBhdCBhIGxhdGVyIHRpbWUuXG4gICAgICpcbiAgICAgKiBUaGUgbWVzc2FnZSBlbWl0dGVkIGluIHRoaXMgc2lnbmFsIHNob3VsZCBub3QgYmUgbW9kaWZpZWQgaW4gYW55IHdheS5cbiAgICAgKi9cbiAgICBnZXQgYW55TWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FueU1lc3NhZ2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiBhIGtlcm5lbCBoYXMgcGVuZGluZyBpbnB1dHMgZnJvbSB0aGUgdXNlci5cbiAgICAgKi9cbiAgICBnZXQgcGVuZGluZ0lucHV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGVuZGluZ0lucHV0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgaWQgb2YgdGhlIHNlcnZlci1zaWRlIGtlcm5lbC5cbiAgICAgKi9cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIHNlcnZlci1zaWRlIGtlcm5lbC5cbiAgICAgKi9cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjbGllbnQgdXNlcm5hbWUuXG4gICAgICovXG4gICAgZ2V0IHVzZXJuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlcm5hbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjbGllbnQgdW5pcXVlIGlkLlxuICAgICAqL1xuICAgIGdldCBjbGllbnRJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaWVudElkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBzdGF0dXMgb2YgdGhlIGtlcm5lbC5cbiAgICAgKi9cbiAgICBnZXQgc3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBjb25uZWN0aW9uIHN0YXR1cyBvZiB0aGUga2VybmVsIGNvbm5lY3Rpb24uXG4gICAgICovXG4gICAgZ2V0IGNvbm5lY3Rpb25TdGF0dXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25uZWN0aW9uU3RhdHVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUZXN0IHdoZXRoZXIgdGhlIGtlcm5lbCBoYXMgYmVlbiBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjYWNoZWQga2VybmVsIGluZm8uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUga2VybmVsIGluZm8uXG4gICAgICovXG4gICAgZ2V0IGluZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmZvLnByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBrZXJuZWwgc3BlYy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBrZXJuZWwgc3BlYy5cbiAgICAgKi9cbiAgICBnZXQgc3BlYygpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NwZWNQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3BlY1Byb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3BlY1Byb21pc2UgPSBrZXJuZWxzcGVjXzEuS2VybmVsU3BlY0FQSS5nZXRTcGVjcyh0aGlzLnNlcnZlclNldHRpbmdzKS50aGVuKHNwZWNzID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzcGVjcy5rZXJuZWxzcGVjc1t0aGlzLl9uYW1lXTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVjUHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvbmUgdGhlIGN1cnJlbnQga2VybmVsIHdpdGggYSBuZXcgY2xpZW50SWQuXG4gICAgICovXG4gICAgY2xvbmUob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHJldHVybiBuZXcgS2VybmVsQ29ubmVjdGlvbihPYmplY3QuYXNzaWduKHsgbW9kZWw6IHRoaXMubW9kZWwsIHVzZXJuYW1lOiB0aGlzLnVzZXJuYW1lLCBzZXJ2ZXJTZXR0aW5nczogdGhpcy5zZXJ2ZXJTZXR0aW5ncywgXG4gICAgICAgICAgICAvLyBoYW5kbGVDb21tcyBkZWZhdWx0cyB0byBmYWxzZSBzaW5jZSB0aGF0IGlzIHNhZmVyXG4gICAgICAgICAgICBoYW5kbGVDb21tczogZmFsc2UgfSwgb3B0aW9ucykpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUga2VybmVsLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZGlzcG9zZWQuZW1pdCgpO1xuICAgICAgICB0aGlzLl91cGRhdGVDb25uZWN0aW9uU3RhdHVzKCdkaXNjb25uZWN0ZWQnKTtcbiAgICAgICAgdGhpcy5fY2xlYXJLZXJuZWxTdGF0ZSgpO1xuICAgICAgICB0aGlzLl9wZW5kaW5nTWVzc2FnZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fY2xlYXJTb2NrZXQoKTtcbiAgICAgICAgLy8gQ2xlYXIgTHVtaW5vIHNpZ25hbHNcbiAgICAgICAgc2lnbmFsaW5nXzEuU2lnbmFsLmNsZWFyRGF0YSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZCBhIHNoZWxsIG1lc3NhZ2UgdG8gdGhlIGtlcm5lbC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBTZW5kIGEgbWVzc2FnZSB0byB0aGUga2VybmVsJ3Mgc2hlbGwgY2hhbm5lbCwgeWllbGRpbmcgYSBmdXR1cmUgb2JqZWN0XG4gICAgICogZm9yIGFjY2VwdGluZyByZXBsaWVzLlxuICAgICAqXG4gICAgICogSWYgYGV4cGVjdFJlcGx5YCBpcyBnaXZlbiBhbmQgYHRydWVgLCB0aGUgZnV0dXJlIGlzIGRpc3Bvc2VkIHdoZW4gYm90aCBhXG4gICAgICogc2hlbGwgcmVwbHkgYW5kIGFuIGlkbGUgc3RhdHVzIG1lc3NhZ2UgYXJlIHJlY2VpdmVkLiBJZiBgZXhwZWN0UmVwbHlgXG4gICAgICogaXMgbm90IGdpdmVuIG9yIGlzIGBmYWxzZWAsIHRoZSBmdXR1cmUgaXMgcmVzb2x2ZWQgd2hlbiBhbiBpZGxlIHN0YXR1c1xuICAgICAqIG1lc3NhZ2UgaXMgcmVjZWl2ZWQuXG4gICAgICogSWYgYGRpc3Bvc2VPbkRvbmVgIGlzIG5vdCBnaXZlbiBvciBpcyBgdHJ1ZWAsIHRoZSBGdXR1cmUgaXMgZGlzcG9zZWQgYXQgdGhpcyBwb2ludC5cbiAgICAgKiBJZiBgZGlzcG9zZU9uRG9uZWAgaXMgZ2l2ZW4gYW5kIGBmYWxzZWAsIGl0IGlzIHVwIHRvIHRoZSBjYWxsZXIgdG8gZGlzcG9zZSBvZiB0aGUgRnV0dXJlLlxuICAgICAqXG4gICAgICogQWxsIHJlcGxpZXMgYXJlIHZhbGlkYXRlZCBhcyB2YWxpZCBrZXJuZWwgbWVzc2FnZXMuXG4gICAgICpcbiAgICAgKiBJZiB0aGUga2VybmVsIHN0YXR1cyBpcyBgZGVhZGAsIHRoaXMgd2lsbCB0aHJvdyBhbiBlcnJvci5cbiAgICAgKi9cbiAgICBzZW5kU2hlbGxNZXNzYWdlKG1zZywgZXhwZWN0UmVwbHkgPSBmYWxzZSwgZGlzcG9zZU9uRG9uZSA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbmRLZXJuZWxTaGVsbENvbnRyb2woZnV0dXJlXzEuS2VybmVsU2hlbGxGdXR1cmVIYW5kbGVyLCBtc2csIGV4cGVjdFJlcGx5LCBkaXNwb3NlT25Eb25lKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZCBhIGNvbnRyb2wgbWVzc2FnZSB0byB0aGUga2VybmVsLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFNlbmQgYSBtZXNzYWdlIHRvIHRoZSBrZXJuZWwncyBjb250cm9sIGNoYW5uZWwsIHlpZWxkaW5nIGEgZnV0dXJlIG9iamVjdFxuICAgICAqIGZvciBhY2NlcHRpbmcgcmVwbGllcy5cbiAgICAgKlxuICAgICAqIElmIGBleHBlY3RSZXBseWAgaXMgZ2l2ZW4gYW5kIGB0cnVlYCwgdGhlIGZ1dHVyZSBpcyBkaXNwb3NlZCB3aGVuIGJvdGggYVxuICAgICAqIGNvbnRyb2wgcmVwbHkgYW5kIGFuIGlkbGUgc3RhdHVzIG1lc3NhZ2UgYXJlIHJlY2VpdmVkLiBJZiBgZXhwZWN0UmVwbHlgXG4gICAgICogaXMgbm90IGdpdmVuIG9yIGlzIGBmYWxzZWAsIHRoZSBmdXR1cmUgaXMgcmVzb2x2ZWQgd2hlbiBhbiBpZGxlIHN0YXR1c1xuICAgICAqIG1lc3NhZ2UgaXMgcmVjZWl2ZWQuXG4gICAgICogSWYgYGRpc3Bvc2VPbkRvbmVgIGlzIG5vdCBnaXZlbiBvciBpcyBgdHJ1ZWAsIHRoZSBGdXR1cmUgaXMgZGlzcG9zZWQgYXQgdGhpcyBwb2ludC5cbiAgICAgKiBJZiBgZGlzcG9zZU9uRG9uZWAgaXMgZ2l2ZW4gYW5kIGBmYWxzZWAsIGl0IGlzIHVwIHRvIHRoZSBjYWxsZXIgdG8gZGlzcG9zZSBvZiB0aGUgRnV0dXJlLlxuICAgICAqXG4gICAgICogQWxsIHJlcGxpZXMgYXJlIHZhbGlkYXRlZCBhcyB2YWxpZCBrZXJuZWwgbWVzc2FnZXMuXG4gICAgICpcbiAgICAgKiBJZiB0aGUga2VybmVsIHN0YXR1cyBpcyBgZGVhZGAsIHRoaXMgd2lsbCB0aHJvdyBhbiBlcnJvci5cbiAgICAgKi9cbiAgICBzZW5kQ29udHJvbE1lc3NhZ2UobXNnLCBleHBlY3RSZXBseSA9IGZhbHNlLCBkaXNwb3NlT25Eb25lID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VuZEtlcm5lbFNoZWxsQ29udHJvbChmdXR1cmVfMS5LZXJuZWxDb250cm9sRnV0dXJlSGFuZGxlciwgbXNnLCBleHBlY3RSZXBseSwgZGlzcG9zZU9uRG9uZSk7XG4gICAgfVxuICAgIF9zZW5kS2VybmVsU2hlbGxDb250cm9sKGN0b3IsIG1zZywgZXhwZWN0UmVwbHkgPSBmYWxzZSwgZGlzcG9zZU9uRG9uZSA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5fc2VuZE1lc3NhZ2UobXNnKTtcbiAgICAgICAgdGhpcy5fYW55TWVzc2FnZS5lbWl0KHsgbXNnLCBkaXJlY3Rpb246ICdzZW5kJyB9KTtcbiAgICAgICAgY29uc3QgZnV0dXJlID0gbmV3IGN0b3IoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbXNnSWQgPSBtc2cuaGVhZGVyLm1zZ19pZDtcbiAgICAgICAgICAgIHRoaXMuX2Z1dHVyZXMuZGVsZXRlKG1zZ0lkKTtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBzdG9yZWQgZGlzcGxheSBpZCBpbmZvcm1hdGlvbi5cbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlJZHMgPSB0aGlzLl9tc2dJZFRvRGlzcGxheUlkcy5nZXQobXNnSWQpO1xuICAgICAgICAgICAgaWYgKCFkaXNwbGF5SWRzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlzcGxheUlkcy5mb3JFYWNoKGRpc3BsYXlJZCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbXNnSWRzID0gdGhpcy5fZGlzcGxheUlkVG9QYXJlbnRJZHMuZ2V0KGRpc3BsYXlJZCk7XG4gICAgICAgICAgICAgICAgaWYgKG1zZ0lkcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBtc2dJZHMuaW5kZXhPZihtc2dJZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1zZ0lkcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlJZFRvUGFyZW50SWRzLmRlbGV0ZShkaXNwbGF5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbXNnSWRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzcGxheUlkVG9QYXJlbnRJZHMuc2V0KGRpc3BsYXlJZCwgbXNnSWRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fbXNnSWRUb0Rpc3BsYXlJZHMuZGVsZXRlKG1zZ0lkKTtcbiAgICAgICAgfSwgbXNnLCBleHBlY3RSZXBseSwgZGlzcG9zZU9uRG9uZSwgdGhpcyk7XG4gICAgICAgIHRoaXMuX2Z1dHVyZXMuc2V0KG1zZy5oZWFkZXIubXNnX2lkLCBmdXR1cmUpO1xuICAgICAgICByZXR1cm4gZnV0dXJlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgbWVzc2FnZSBvbiB0aGUgd2Vic29ja2V0LlxuICAgICAqXG4gICAgICogSWYgcXVldWUgaXMgdHJ1ZSwgcXVldWUgdGhlIG1lc3NhZ2UgZm9yIGxhdGVyIHNlbmRpbmcgaWYgd2UgY2Fubm90IHNlbmRcbiAgICAgKiBub3cuIE90aGVyd2lzZSB0aHJvdyBhbiBlcnJvci5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBBcyBhbiBleGNlcHRpb24gdG8gdGhlIHF1ZXVlaW5nLCBpZiB3ZSBhcmUgc2VuZGluZyBhIGtlcm5lbF9pbmZvX3JlcXVlc3RcbiAgICAgKiBtZXNzYWdlIHdoaWxlIHdlIHRoaW5rIHRoZSBrZXJuZWwgaXMgcmVzdGFydGluZywgd2Ugc2VuZCB0aGUgbWVzc2FnZVxuICAgICAqIGltbWVkaWF0ZWx5IHdpdGhvdXQgcXVldWVpbmcuIFRoaXMgaXMgc28gdGhhdCB3ZSBjYW4gdHJpZ2dlciBhIG1lc3NhZ2VcbiAgICAgKiBiYWNrLCB3aGljaCB3aWxsIHRoZW4gY2xlYXIgdGhlIGtlcm5lbCByZXN0YXJ0aW5nIHN0YXRlLlxuICAgICAqL1xuICAgIF9zZW5kTWVzc2FnZShtc2csIHF1ZXVlID0gdHJ1ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT09ICdkZWFkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdLZXJuZWwgaXMgZGVhZCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIGhhdmUgYSBrZXJuZWxfaW5mb19yZXF1ZXN0IGFuZCB3ZSBhcmUgc3RhcnRpbmcgb3IgcmVzdGFydGluZywgc2VuZCB0aGVcbiAgICAgICAgLy8ga2VybmVsX2luZm9fcmVxdWVzdCBpbW1lZGlhdGVseSBpZiB3ZSBjYW4sIGFuZCBpZiBub3QgdGhyb3cgYW4gZXJyb3Igc29cbiAgICAgICAgLy8gd2UgY2FuIHJldHJ5IGxhdGVyLiBPbiByZXN0YXJ0aW5nIHdlIGRvIHRoaXMgYmVjYXVzZSB3ZSBtdXN0IGdldCBhdCBsZWFzdCBvbmUgbWVzc2FnZVxuICAgICAgICAvLyBmcm9tIHRoZSBrZXJuZWwgdG8gcmVzZXQgdGhlIGtlcm5lbCBzZXNzaW9uICh0aHVzIGNsZWFyaW5nIHRoZSByZXN0YXJ0XG4gICAgICAgIC8vIHN0YXR1cyBzZW50aW5lbCkuXG4gICAgICAgIGlmICgodGhpcy5fa2VybmVsU2Vzc2lvbiA9PT0gU1RBUlRJTkdfS0VSTkVMX1NFU1NJT04gfHxcbiAgICAgICAgICAgIHRoaXMuX2tlcm5lbFNlc3Npb24gPT09IFJFU1RBUlRJTkdfS0VSTkVMX1NFU1NJT04pICYmXG4gICAgICAgICAgICBLZXJuZWxNZXNzYWdlLmlzSW5mb1JlcXVlc3RNc2cobXNnKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXR1cyA9PT0gJ2Nvbm5lY3RlZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93cy5zZW5kKHNlcmlhbGl6ZS5zZXJpYWxpemUobXNnKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3Qgc2VuZCBtZXNzYWdlOiBzdGF0dXMgaXMgbm90IGNvbm5lY3RlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBwZW5kaW5nIG1lc3NhZ2VzLCBhZGQgdG8gdGhlIHF1ZXVlIHNvIHdlIGtlZXAgbWVzc2FnZXMgaW4gb3JkZXJcbiAgICAgICAgaWYgKHF1ZXVlICYmIHRoaXMuX3BlbmRpbmdNZXNzYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9wZW5kaW5nTWVzc2FnZXMucHVzaChtc2cpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNlbmQgaWYgdGhlIHdzIGFsbG93cyBpdCwgb3RoZXJ3aXNlIHF1ZXVlIHRoZSBtZXNzYWdlLlxuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdHVzID09PSAnY29ubmVjdGVkJyAmJlxuICAgICAgICAgICAgdGhpcy5fa2VybmVsU2Vzc2lvbiAhPT0gUkVTVEFSVElOR19LRVJORUxfU0VTU0lPTikge1xuICAgICAgICAgICAgdGhpcy5fd3Muc2VuZChzZXJpYWxpemUuc2VyaWFsaXplKG1zZykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHF1ZXVlKSB7XG4gICAgICAgICAgICB0aGlzLl9wZW5kaW5nTWVzc2FnZXMucHVzaChtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3Qgc2VuZCBtZXNzYWdlJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSW50ZXJydXB0IGEga2VybmVsLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFVzZXMgdGhlIFtKdXB5dGVyIE5vdGVib29rIEFQSV0oaHR0cDovL3BldHN0b3JlLnN3YWdnZXIuaW8vP3VybD1odHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vanVweXRlci9ub3RlYm9vay9tYXN0ZXIvbm90ZWJvb2svc2VydmljZXMvYXBpL2FwaS55YW1sIyEva2VybmVscykuXG4gICAgICpcbiAgICAgKiBUaGUgcHJvbWlzZSBpcyBmdWxmaWxsZWQgb24gYSB2YWxpZCByZXNwb25zZSBhbmQgcmVqZWN0ZWQgb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogSXQgaXMgYXNzdW1lZCB0aGF0IHRoZSBBUEkgY2FsbCBkb2VzIG5vdCBtdXRhdGUgdGhlIGtlcm5lbCBpZCBvciBuYW1lLlxuICAgICAqXG4gICAgICogVGhlIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZCBpZiB0aGUga2VybmVsIHN0YXR1cyBpcyBgRGVhZGAgb3IgaWYgdGhlXG4gICAgICogcmVxdWVzdCBmYWlscyBvciB0aGUgcmVzcG9uc2UgaXMgaW52YWxpZC5cbiAgICAgKi9cbiAgICBhc3luYyBpbnRlcnJ1cHQoKSB7XG4gICAgICAgIHRoaXMuaGFzUGVuZGluZ0lucHV0ID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gJ2RlYWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0tlcm5lbCBpcyBkZWFkJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3RhcGkuaW50ZXJydXB0S2VybmVsKHRoaXMuaWQsIHRoaXMuc2VydmVyU2V0dGluZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IGEga2VybmVsIHJlc3RhcnQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVXNlcyB0aGUgW0p1cHl0ZXIgTm90ZWJvb2sgQVBJXShodHRwOi8vcGV0c3RvcmUuc3dhZ2dlci5pby8/dXJsPWh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9qdXB5dGVyL25vdGVib29rL21hc3Rlci9ub3RlYm9vay9zZXJ2aWNlcy9hcGkvYXBpLnlhbWwjIS9rZXJuZWxzKVxuICAgICAqIGFuZCB2YWxpZGF0ZXMgdGhlIHJlc3BvbnNlIG1vZGVsLlxuICAgICAqXG4gICAgICogQW55IGV4aXN0aW5nIEZ1dHVyZSBvciBDb21tIG9iamVjdHMgYXJlIGNsZWFyZWQgb25jZSB0aGUga2VybmVsIGhhc1xuICAgICAqIGFjdHVhbGx5IGJlIHJlc3RhcnRlZC5cbiAgICAgKlxuICAgICAqIFRoZSBwcm9taXNlIGlzIGZ1bGZpbGxlZCBvbiBhIHZhbGlkIHNlcnZlciByZXNwb25zZSAoYWZ0ZXIgdGhlIGtlcm5lbCByZXN0YXJ0cylcbiAgICAgKiBhbmQgcmVqZWN0ZWQgb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogSXQgaXMgYXNzdW1lZCB0aGF0IHRoZSBBUEkgY2FsbCBkb2VzIG5vdCBtdXRhdGUgdGhlIGtlcm5lbCBpZCBvciBuYW1lLlxuICAgICAqXG4gICAgICogVGhlIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZCBpZiB0aGUgcmVxdWVzdCBmYWlscyBvciB0aGUgcmVzcG9uc2UgaXNcbiAgICAgKiBpbnZhbGlkLlxuICAgICAqL1xuICAgIGFzeW5jIHJlc3RhcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gJ2RlYWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0tlcm5lbCBpcyBkZWFkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlU3RhdHVzKCdyZXN0YXJ0aW5nJyk7XG4gICAgICAgIHRoaXMuX2NsZWFyS2VybmVsU3RhdGUoKTtcbiAgICAgICAgdGhpcy5fa2VybmVsU2Vzc2lvbiA9IFJFU1RBUlRJTkdfS0VSTkVMX1NFU1NJT047XG4gICAgICAgIGF3YWl0IHJlc3RhcGkucmVzdGFydEtlcm5lbCh0aGlzLmlkLCB0aGlzLnNlcnZlclNldHRpbmdzKTtcbiAgICAgICAgLy8gUmVjb25uZWN0IHRvIHRoZSBrZXJuZWwgdG8gYWRkcmVzcyBjYXNlcyB3aGVyZSBrZXJuZWwgcG9ydHNcbiAgICAgICAgLy8gaGF2ZSBjaGFuZ2VkIGR1cmluZyB0aGUgcmVzdGFydC5cbiAgICAgICAgYXdhaXQgdGhpcy5yZWNvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5oYXNQZW5kaW5nSW5wdXQgPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVjb25uZWN0IHRvIGEga2VybmVsLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgbWF5IHRyeSBtdWx0aXBsZSB0aW1lcyB0byByZWNvbm5lY3QgdG8gYSBrZXJuZWwsIGFuZCB3aWxsIHNldmVyIGFueVxuICAgICAqIGV4aXN0aW5nIGNvbm5lY3Rpb24uXG4gICAgICovXG4gICAgcmVjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9lcnJvcklmRGlzcG9zZWQoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IGNvcmV1dGlsc18yLlByb21pc2VEZWxlZ2F0ZSgpO1xuICAgICAgICAvLyBTZXQgdXAgYSBsaXN0ZW5lciBmb3IgdGhlIGNvbm5lY3Rpb24gc3RhdHVzIGNoYW5naW5nLCB3aGljaCBhY2NlcHRzIG9yXG4gICAgICAgIC8vIHJlamVjdHMgYWZ0ZXIgdGhlIHJldHJpZXMgYXJlIGRvbmUuXG4gICAgICAgIGNvbnN0IGZ1bGZpbGwgPSAoc2VuZGVyLCBzdGF0dXMpID0+IHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdjb25uZWN0ZWQnKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkLmRpc2Nvbm5lY3QoZnVsZmlsbCwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzdGF0dXMgPT09ICdkaXNjb25uZWN0ZWQnKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnJlamVjdChuZXcgRXJyb3IoJ0tlcm5lbCBjb25uZWN0aW9uIGRpc2Nvbm5lY3RlZCcpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkLmRpc2Nvbm5lY3QoZnVsZmlsbCwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXR1c0NoYW5nZWQuY29ubmVjdChmdWxmaWxsLCB0aGlzKTtcbiAgICAgICAgLy8gUmVzZXQgdGhlIHJlY29ubmVjdCBsaW1pdCBzbyB3ZSBzdGFydCB0aGUgY29ubmVjdGlvbiBhdHRlbXB0cyBmcmVzaFxuICAgICAgICB0aGlzLl9yZWNvbm5lY3RBdHRlbXB0ID0gMDtcbiAgICAgICAgLy8gU3RhcnQgdGhlIHJlY29ubmVjdGlvbiBwcm9jZXNzLCB3aGljaCB3aWxsIGFsc28gY2xlYXIgYW55IGV4aXN0aW5nXG4gICAgICAgIC8vIGNvbm5lY3Rpb24uXG4gICAgICAgIHRoaXMuX3JlY29ubmVjdCgpO1xuICAgICAgICAvLyBSZXR1cm4gdGhlIHByb21pc2UgdGhhdCBzaG91bGQgcmVzb2x2ZSBvbiBjb25uZWN0aW9uIG9yIHJlamVjdCBpZiB0aGVcbiAgICAgICAgLy8gcmV0cmllcyBkb24ndCB3b3JrLlxuICAgICAgICByZXR1cm4gcmVzdWx0LnByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNodXRkb3duIGEga2VybmVsLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFVzZXMgdGhlIFtKdXB5dGVyIE5vdGVib29rIEFQSV0oaHR0cDovL3BldHN0b3JlLnN3YWdnZXIuaW8vP3VybD1odHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vanVweXRlci9ub3RlYm9vay9tYXN0ZXIvbm90ZWJvb2svc2VydmljZXMvYXBpL2FwaS55YW1sIyEva2VybmVscykuXG4gICAgICpcbiAgICAgKiBUaGUgcHJvbWlzZSBpcyBmdWxmaWxsZWQgb24gYSB2YWxpZCByZXNwb25zZSBhbmQgcmVqZWN0ZWQgb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogT24gYSB2YWxpZCByZXNwb25zZSwgZGlzcG9zZXMgdGhpcyBrZXJuZWwgY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIElmIHRoZSBrZXJuZWwgaXMgYWxyZWFkeSBgZGVhZGAsIGRpc3Bvc2VzIHRoaXMga2VybmVsIGNvbm5lY3Rpb24gd2l0aG91dFxuICAgICAqIGEgc2VydmVyIHJlcXVlc3QuXG4gICAgICovXG4gICAgYXN5bmMgc2h1dGRvd24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyAhPT0gJ2RlYWQnKSB7XG4gICAgICAgICAgICBhd2FpdCByZXN0YXBpLnNodXRkb3duS2VybmVsKHRoaXMuaWQsIHRoaXMuc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGFuZGxlU2h1dGRvd24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBhIGtlcm5lbCBzaHV0ZG93bi5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgY2FsbGVkIGlmIHdlIGtub3cgZnJvbSBvdXRzaWRlIGluZm9ybWF0aW9uIHRoYXQgYVxuICAgICAqIGtlcm5lbCBpcyBkZWFkIChmb3IgZXhhbXBsZSwgd2UgY2Fubm90IGZpbmQgdGhlIGtlcm5lbCBtb2RlbCBvbiB0aGVcbiAgICAgKiBzZXJ2ZXIpLlxuICAgICAqL1xuICAgIGhhbmRsZVNodXRkb3duKCkge1xuICAgICAgICB0aGlzLl91cGRhdGVTdGF0dXMoJ2RlYWQnKTtcbiAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmQgYSBga2VybmVsX2luZm9fcmVxdWVzdGAgbWVzc2FnZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBTZWUgW01lc3NhZ2luZyBpbiBKdXB5dGVyXShodHRwczovL2p1cHl0ZXItY2xpZW50LnJlYWR0aGVkb2NzLmlvL2VuL2xhdGVzdC9tZXNzYWdpbmcuaHRtbCNrZXJuZWwtaW5mbykuXG4gICAgICpcbiAgICAgKiBGdWxmaWxscyB3aXRoIHRoZSBga2VybmVsX2luZm9fcmVzcG9uc2VgIGNvbnRlbnQgd2hlbiB0aGUgc2hlbGwgcmVwbHkgaXNcbiAgICAgKiByZWNlaXZlZCBhbmQgdmFsaWRhdGVkLlxuICAgICAqL1xuICAgIGFzeW5jIHJlcXVlc3RLZXJuZWxJbmZvKCkge1xuICAgICAgICBjb25zdCBtc2cgPSBLZXJuZWxNZXNzYWdlLmNyZWF0ZU1lc3NhZ2Uoe1xuICAgICAgICAgICAgbXNnVHlwZTogJ2tlcm5lbF9pbmZvX3JlcXVlc3QnLFxuICAgICAgICAgICAgY2hhbm5lbDogJ3NoZWxsJyxcbiAgICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLl91c2VybmFtZSxcbiAgICAgICAgICAgIHNlc3Npb246IHRoaXMuX2NsaWVudElkLFxuICAgICAgICAgICAgY29udGVudDoge31cbiAgICAgICAgfSk7XG4gICAgICAgIGxldCByZXBseTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlcGx5ID0gKGF3YWl0IFByaXZhdGUuaGFuZGxlU2hlbGxNZXNzYWdlKHRoaXMsIG1zZykpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSByZWplY3RlZCBiZWNhdXNlIHRoZSBmdXR1cmUgd2FzIGRpc3Bvc2VkLCBpZ25vcmUgYW5kIHJldHVybi5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Vycm9ySWZEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoIXJlcGx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gS2VybmVscyBzb21ldGltZXMgZG8gbm90IGluY2x1ZGUgYSBzdGF0dXMgZmllbGQgb24ga2VybmVsX2luZm9fcmVwbHlcbiAgICAgICAgLy8gbWVzc2FnZXMsIHNvIHNldCBhIGRlZmF1bHQgZm9yIG5vdy5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qdXB5dGVybGFiL2p1cHl0ZXJsYWIvaXNzdWVzLzY3NjBcbiAgICAgICAgaWYgKHJlcGx5LmNvbnRlbnQuc3RhdHVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlcGx5LmNvbnRlbnQuc3RhdHVzID0gJ29rJztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVwbHkuY29udGVudC5zdGF0dXMgIT09ICdvaycpIHtcbiAgICAgICAgICAgIHRoaXMuX2luZm8ucmVqZWN0KCdLZXJuZWwgaW5mbyByZXBseSBlcnJvcmVkJyk7XG4gICAgICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW5mby5yZXNvbHZlKHJlcGx5LmNvbnRlbnQpO1xuICAgICAgICB0aGlzLl9rZXJuZWxTZXNzaW9uID0gcmVwbHkuaGVhZGVyLnNlc3Npb247XG4gICAgICAgIHJldHVybiByZXBseTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZCBhIGBjb21wbGV0ZV9yZXF1ZXN0YCBtZXNzYWdlLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFNlZSBbTWVzc2FnaW5nIGluIEp1cHl0ZXJdKGh0dHBzOi8vanVweXRlci1jbGllbnQucmVhZHRoZWRvY3MuaW8vZW4vbGF0ZXN0L21lc3NhZ2luZy5odG1sI2NvbXBsZXRpb24pLlxuICAgICAqXG4gICAgICogRnVsZmlsbHMgd2l0aCB0aGUgYGNvbXBsZXRlX3JlcGx5YCBjb250ZW50IHdoZW4gdGhlIHNoZWxsIHJlcGx5IGlzXG4gICAgICogcmVjZWl2ZWQgYW5kIHZhbGlkYXRlZC5cbiAgICAgKi9cbiAgICByZXF1ZXN0Q29tcGxldGUoY29udGVudCkge1xuICAgICAgICBjb25zdCBtc2cgPSBLZXJuZWxNZXNzYWdlLmNyZWF0ZU1lc3NhZ2Uoe1xuICAgICAgICAgICAgbXNnVHlwZTogJ2NvbXBsZXRlX3JlcXVlc3QnLFxuICAgICAgICAgICAgY2hhbm5lbDogJ3NoZWxsJyxcbiAgICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLl91c2VybmFtZSxcbiAgICAgICAgICAgIHNlc3Npb246IHRoaXMuX2NsaWVudElkLFxuICAgICAgICAgICAgY29udGVudFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFByaXZhdGUuaGFuZGxlU2hlbGxNZXNzYWdlKHRoaXMsIG1zZyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmQgYW4gYGluc3BlY3RfcmVxdWVzdGAgbWVzc2FnZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBTZWUgW01lc3NhZ2luZyBpbiBKdXB5dGVyXShodHRwczovL2p1cHl0ZXItY2xpZW50LnJlYWR0aGVkb2NzLmlvL2VuL2xhdGVzdC9tZXNzYWdpbmcuaHRtbCNpbnRyb3NwZWN0aW9uKS5cbiAgICAgKlxuICAgICAqIEZ1bGZpbGxzIHdpdGggdGhlIGBpbnNwZWN0X3JlcGx5YCBjb250ZW50IHdoZW4gdGhlIHNoZWxsIHJlcGx5IGlzXG4gICAgICogcmVjZWl2ZWQgYW5kIHZhbGlkYXRlZC5cbiAgICAgKi9cbiAgICByZXF1ZXN0SW5zcGVjdChjb250ZW50KSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IEtlcm5lbE1lc3NhZ2UuY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgICAgICBtc2dUeXBlOiAnaW5zcGVjdF9yZXF1ZXN0JyxcbiAgICAgICAgICAgIGNoYW5uZWw6ICdzaGVsbCcsXG4gICAgICAgICAgICB1c2VybmFtZTogdGhpcy5fdXNlcm5hbWUsXG4gICAgICAgICAgICBzZXNzaW9uOiB0aGlzLl9jbGllbnRJZCxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnRcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBQcml2YXRlLmhhbmRsZVNoZWxsTWVzc2FnZSh0aGlzLCBtc2cpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgYGhpc3RvcnlfcmVxdWVzdGAgbWVzc2FnZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBTZWUgW01lc3NhZ2luZyBpbiBKdXB5dGVyXShodHRwczovL2p1cHl0ZXItY2xpZW50LnJlYWR0aGVkb2NzLmlvL2VuL2xhdGVzdC9tZXNzYWdpbmcuaHRtbCNoaXN0b3J5KS5cbiAgICAgKlxuICAgICAqIEZ1bGZpbGxzIHdpdGggdGhlIGBoaXN0b3J5X3JlcGx5YCBjb250ZW50IHdoZW4gdGhlIHNoZWxsIHJlcGx5IGlzXG4gICAgICogcmVjZWl2ZWQgYW5kIHZhbGlkYXRlZC5cbiAgICAgKi9cbiAgICByZXF1ZXN0SGlzdG9yeShjb250ZW50KSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IEtlcm5lbE1lc3NhZ2UuY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgICAgICBtc2dUeXBlOiAnaGlzdG9yeV9yZXF1ZXN0JyxcbiAgICAgICAgICAgIGNoYW5uZWw6ICdzaGVsbCcsXG4gICAgICAgICAgICB1c2VybmFtZTogdGhpcy5fdXNlcm5hbWUsXG4gICAgICAgICAgICBzZXNzaW9uOiB0aGlzLl9jbGllbnRJZCxcbiAgICAgICAgICAgIGNvbnRlbnRcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBQcml2YXRlLmhhbmRsZVNoZWxsTWVzc2FnZSh0aGlzLCBtc2cpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGFuIGBleGVjdXRlX3JlcXVlc3RgIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogU2VlIFtNZXNzYWdpbmcgaW4gSnVweXRlcl0oaHR0cHM6Ly9qdXB5dGVyLWNsaWVudC5yZWFkdGhlZG9jcy5pby9lbi9sYXRlc3QvbWVzc2FnaW5nLmh0bWwjZXhlY3V0ZSkuXG4gICAgICpcbiAgICAgKiBGdXR1cmUgYG9uUmVwbHlgIGlzIGNhbGxlZCB3aXRoIHRoZSBgZXhlY3V0ZV9yZXBseWAgY29udGVudCB3aGVuIHRoZVxuICAgICAqIHNoZWxsIHJlcGx5IGlzIHJlY2VpdmVkIGFuZCB2YWxpZGF0ZWQuIFRoZSBmdXR1cmUgd2lsbCByZXNvbHZlIHdoZW5cbiAgICAgKiB0aGlzIG1lc3NhZ2UgaXMgcmVjZWl2ZWQgYW5kIHRoZSBgaWRsZWAgaW9wdWIgc3RhdHVzIGlzIHJlY2VpdmVkLlxuICAgICAqIFRoZSBmdXR1cmUgd2lsbCBhbHNvIGJlIGRpc3Bvc2VkIGF0IHRoaXMgcG9pbnQgdW5sZXNzIGBkaXNwb3NlT25Eb25lYFxuICAgICAqIGlzIHNwZWNpZmllZCBhbmQgYGZhbHNlYCwgaW4gd2hpY2ggY2FzZSBpdCBpcyB1cCB0byB0aGUgY2FsbGVyIHRvIGRpc3Bvc2VcbiAgICAgKiBvZiB0aGUgZnV0dXJlLlxuICAgICAqXG4gICAgICogKipTZWUgYWxzbzoqKiBbW0lFeGVjdXRlUmVwbHldXVxuICAgICAqL1xuICAgIHJlcXVlc3RFeGVjdXRlKGNvbnRlbnQsIGRpc3Bvc2VPbkRvbmUgPSB0cnVlLCBtZXRhZGF0YSkge1xuICAgICAgICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIHNpbGVudDogZmFsc2UsXG4gICAgICAgICAgICBzdG9yZV9oaXN0b3J5OiB0cnVlLFxuICAgICAgICAgICAgdXNlcl9leHByZXNzaW9uczoge30sXG4gICAgICAgICAgICBhbGxvd19zdGRpbjogdHJ1ZSxcbiAgICAgICAgICAgIHN0b3Bfb25fZXJyb3I6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG1zZyA9IEtlcm5lbE1lc3NhZ2UuY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgICAgICBtc2dUeXBlOiAnZXhlY3V0ZV9yZXF1ZXN0JyxcbiAgICAgICAgICAgIGNoYW5uZWw6ICdzaGVsbCcsXG4gICAgICAgICAgICB1c2VybmFtZTogdGhpcy5fdXNlcm5hbWUsXG4gICAgICAgICAgICBzZXNzaW9uOiB0aGlzLl9jbGllbnRJZCxcbiAgICAgICAgICAgIGNvbnRlbnQ6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMpLCBjb250ZW50KSxcbiAgICAgICAgICAgIG1ldGFkYXRhXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kU2hlbGxNZXNzYWdlKG1zZywgdHJ1ZSwgZGlzcG9zZU9uRG9uZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmQgYW4gZXhwZXJpbWVudGFsIGBkZWJ1Z19yZXF1ZXN0YCBtZXNzYWdlLlxuICAgICAqXG4gICAgICogQGhpZGRlblxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIERlYnVnIG1lc3NhZ2VzIGFyZSBleHBlcmltZW50YWwgbWVzc2FnZXMgdGhhdCBhcmUgbm90IGluIHRoZSBvZmZpY2lhbFxuICAgICAqIGtlcm5lbCBtZXNzYWdlIHNwZWNpZmljYXRpb24uIEFzIHN1Y2gsIHRoaXMgZnVuY3Rpb24gaXMgKk5PVCogY29uc2lkZXJlZFxuICAgICAqIHBhcnQgb2YgdGhlIHB1YmxpYyBBUEksIGFuZCBtYXkgY2hhbmdlIHdpdGhvdXQgbm90aWNlLlxuICAgICAqL1xuICAgIHJlcXVlc3REZWJ1Zyhjb250ZW50LCBkaXNwb3NlT25Eb25lID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBtc2cgPSBLZXJuZWxNZXNzYWdlLmNyZWF0ZU1lc3NhZ2Uoe1xuICAgICAgICAgICAgbXNnVHlwZTogJ2RlYnVnX3JlcXVlc3QnLFxuICAgICAgICAgICAgY2hhbm5lbDogJ2NvbnRyb2wnLFxuICAgICAgICAgICAgdXNlcm5hbWU6IHRoaXMuX3VzZXJuYW1lLFxuICAgICAgICAgICAgc2Vzc2lvbjogdGhpcy5fY2xpZW50SWQsXG4gICAgICAgICAgICBjb250ZW50XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kQ29udHJvbE1lc3NhZ2UobXNnLCB0cnVlLCBkaXNwb3NlT25Eb25lKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZCBhbiBgaXNfY29tcGxldGVfcmVxdWVzdGAgbWVzc2FnZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBTZWUgW01lc3NhZ2luZyBpbiBKdXB5dGVyXShodHRwczovL2p1cHl0ZXItY2xpZW50LnJlYWR0aGVkb2NzLmlvL2VuL2xhdGVzdC9tZXNzYWdpbmcuaHRtbCNjb2RlLWNvbXBsZXRlbmVzcykuXG4gICAgICpcbiAgICAgKiBGdWxmaWxscyB3aXRoIHRoZSBgaXNfY29tcGxldGVfcmVzcG9uc2VgIGNvbnRlbnQgd2hlbiB0aGUgc2hlbGwgcmVwbHkgaXNcbiAgICAgKiByZWNlaXZlZCBhbmQgdmFsaWRhdGVkLlxuICAgICAqL1xuICAgIHJlcXVlc3RJc0NvbXBsZXRlKGNvbnRlbnQpIHtcbiAgICAgICAgY29uc3QgbXNnID0gS2VybmVsTWVzc2FnZS5jcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgICAgIG1zZ1R5cGU6ICdpc19jb21wbGV0ZV9yZXF1ZXN0JyxcbiAgICAgICAgICAgIGNoYW5uZWw6ICdzaGVsbCcsXG4gICAgICAgICAgICB1c2VybmFtZTogdGhpcy5fdXNlcm5hbWUsXG4gICAgICAgICAgICBzZXNzaW9uOiB0aGlzLl9jbGllbnRJZCxcbiAgICAgICAgICAgIGNvbnRlbnRcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBQcml2YXRlLmhhbmRsZVNoZWxsTWVzc2FnZSh0aGlzLCBtc2cpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgYGNvbW1faW5mb19yZXF1ZXN0YCBtZXNzYWdlLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIEZ1bGZpbGxzIHdpdGggdGhlIGBjb21tX2luZm9fcmVwbHlgIGNvbnRlbnQgd2hlbiB0aGUgc2hlbGwgcmVwbHkgaXNcbiAgICAgKiByZWNlaXZlZCBhbmQgdmFsaWRhdGVkLlxuICAgICAqL1xuICAgIHJlcXVlc3RDb21tSW5mbyhjb250ZW50KSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IEtlcm5lbE1lc3NhZ2UuY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgICAgICBtc2dUeXBlOiAnY29tbV9pbmZvX3JlcXVlc3QnLFxuICAgICAgICAgICAgY2hhbm5lbDogJ3NoZWxsJyxcbiAgICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLl91c2VybmFtZSxcbiAgICAgICAgICAgIHNlc3Npb246IHRoaXMuX2NsaWVudElkLFxuICAgICAgICAgICAgY29udGVudFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFByaXZhdGUuaGFuZGxlU2hlbGxNZXNzYWdlKHRoaXMsIG1zZyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmQgYW4gYGlucHV0X3JlcGx5YCBtZXNzYWdlLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFNlZSBbTWVzc2FnaW5nIGluIEp1cHl0ZXJdKGh0dHBzOi8vanVweXRlci1jbGllbnQucmVhZHRoZWRvY3MuaW8vZW4vbGF0ZXN0L21lc3NhZ2luZy5odG1sI21lc3NhZ2VzLW9uLXRoZS1zdGRpbi1yb3V0ZXItZGVhbGVyLXNvY2tldHMpLlxuICAgICAqL1xuICAgIHNlbmRJbnB1dFJlcGx5KGNvbnRlbnQsIHBhcmVudF9oZWFkZXIpIHtcbiAgICAgICAgY29uc3QgbXNnID0gS2VybmVsTWVzc2FnZS5jcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgICAgIG1zZ1R5cGU6ICdpbnB1dF9yZXBseScsXG4gICAgICAgICAgICBjaGFubmVsOiAnc3RkaW4nLFxuICAgICAgICAgICAgdXNlcm5hbWU6IHRoaXMuX3VzZXJuYW1lLFxuICAgICAgICAgICAgc2Vzc2lvbjogdGhpcy5fY2xpZW50SWQsXG4gICAgICAgICAgICBjb250ZW50XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocGFyZW50X2hlYWRlcikge1xuICAgICAgICAgICAgbXNnLnBhcmVudF9oZWFkZXIgPSBwYXJlbnRfaGVhZGVyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlKG1zZyk7XG4gICAgICAgIHRoaXMuX2FueU1lc3NhZ2UuZW1pdCh7IG1zZywgZGlyZWN0aW9uOiAnc2VuZCcgfSk7XG4gICAgICAgIHRoaXMuaGFzUGVuZGluZ0lucHV0ID0gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBjb21tLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIElmIGEgY2xpZW50LXNpZGUgY29tbSBhbHJlYWR5IGV4aXN0cyB3aXRoIHRoZSBnaXZlbiBjb21tSWQsIGFuIGVycm9yIGlzIHRocm93bi5cbiAgICAgKiBJZiB0aGUga2VybmVsIGRvZXMgbm90IGhhbmRsZSBjb21tcywgYW4gZXJyb3IgaXMgdGhyb3duLlxuICAgICAqL1xuICAgIGNyZWF0ZUNvbW0odGFyZ2V0TmFtZSwgY29tbUlkID0gY29yZXV0aWxzXzIuVVVJRC51dWlkNCgpKSB7XG4gICAgICAgIGlmICghdGhpcy5oYW5kbGVDb21tcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb21tcyBhcmUgZGlzYWJsZWQgb24gdGhpcyBrZXJuZWwgY29ubmVjdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jb21tcy5oYXMoY29tbUlkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb21tIGlzIGFscmVhZHkgY3JlYXRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbW0gPSBuZXcgY29tbV8xLkNvbW1IYW5kbGVyKHRhcmdldE5hbWUsIGNvbW1JZCwgdGhpcywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdW5yZWdpc3RlckNvbW0oY29tbUlkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2NvbW1zLnNldChjb21tSWQsIGNvbW0pO1xuICAgICAgICByZXR1cm4gY29tbTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSBjb21tIGV4aXN0cy5cbiAgICAgKi9cbiAgICBoYXNDb21tKGNvbW1JZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tbXMuaGFzKGNvbW1JZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGEgY29tbSB0YXJnZXQgaGFuZGxlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0YXJnZXROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNvbW0gdGFyZ2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGludm9rZWQgZm9yIGEgY29tbSBvcGVuIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIGRpc3Bvc2FibGUgdXNlZCB0byB1bnJlZ2lzdGVyIHRoZSBjb21tIHRhcmdldC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBPbmx5IG9uZSBjb21tIHRhcmdldCBjYW4gYmUgcmVnaXN0ZXJlZCB0byBhIHRhcmdldCBuYW1lIGF0IGEgdGltZSwgYW5cbiAgICAgKiBleGlzdGluZyBjYWxsYmFjayBmb3IgdGhlIHNhbWUgdGFyZ2V0IG5hbWUgd2lsbCBiZSBvdmVycmlkZGVuLiAgQSByZWdpc3RlcmVkXG4gICAgICogY29tbSB0YXJnZXQgaGFuZGxlciB3aWxsIHRha2UgcHJlY2VkZW5jZSBvdmVyIGEgY29tbSB3aGljaCBzcGVjaWZpZXMgYVxuICAgICAqIGB0YXJnZXRfbW9kdWxlYC5cbiAgICAgKlxuICAgICAqIElmIHRoZSBjYWxsYmFjayByZXR1cm5zIGEgcHJvbWlzZSwga2VybmVsIG1lc3NhZ2UgcHJvY2Vzc2luZyB3aWxsIHBhdXNlXG4gICAgICogdW50aWwgdGhlIHJldHVybmVkIHByb21pc2UgaXMgZnVsZmlsbGVkLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyQ29tbVRhcmdldCh0YXJnZXROYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoIXRoaXMuaGFuZGxlQ29tbXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90YXJnZXRSZWdpc3RyeVt0YXJnZXROYW1lXSA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBjb21tIHRhcmdldCBoYW5kbGVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRhcmdldE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY29tbSB0YXJnZXQgdG8gcmVtb3ZlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRvIHJlbW92ZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgY29tbSB0YXJnZXQgaXMgb25seSByZW1vdmVkIGlmIHRoZSBjYWxsYmFjayBhcmd1bWVudCBtYXRjaGVzLlxuICAgICAqL1xuICAgIHJlbW92ZUNvbW1UYXJnZXQodGFyZ2V0TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhbmRsZUNvbW1zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzcG9zZWQgJiYgdGhpcy5fdGFyZ2V0UmVnaXN0cnlbdGFyZ2V0TmFtZV0gPT09IGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fdGFyZ2V0UmVnaXN0cnlbdGFyZ2V0TmFtZV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgYW4gSU9QdWIgbWVzc2FnZSBob29rLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1zZ19pZCAtIFRoZSBwYXJlbnRfaGVhZGVyIG1lc3NhZ2UgaWQgdGhlIGhvb2sgd2lsbCBpbnRlcmNlcHQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaG9vayAtIFRoZSBjYWxsYmFjayBpbnZva2VkIGZvciB0aGUgbWVzc2FnZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgSU9QdWIgaG9vayBzeXN0ZW0gYWxsb3dzIHlvdSB0byBwcmVlbXB0IHRoZSBoYW5kbGVycyBmb3IgSU9QdWJcbiAgICAgKiBtZXNzYWdlcyB0aGF0IGFyZSByZXNwb25zZXMgdG8gYSBnaXZlbiBtZXNzYWdlIGlkLlxuICAgICAqXG4gICAgICogVGhlIG1vc3QgcmVjZW50bHkgcmVnaXN0ZXJlZCBob29rIGlzIHJ1biBmaXJzdC4gQSBob29rIGNhbiByZXR1cm4gYVxuICAgICAqIGJvb2xlYW4gb3IgYSBwcm9taXNlIHRvIGEgYm9vbGVhbiwgaW4gd2hpY2ggY2FzZSBhbGwga2VybmVsIG1lc3NhZ2VcbiAgICAgKiBwcm9jZXNzaW5nIHBhdXNlcyB1bnRpbCB0aGUgcHJvbWlzZSBpcyBmdWxmaWxsZWQuIElmIGEgaG9vayByZXR1cm4gdmFsdWVcbiAgICAgKiByZXNvbHZlcyB0byBmYWxzZSwgYW55IGxhdGVyIGhvb2tzIHdpbGwgbm90IHJ1biBhbmQgdGhlIGZ1bmN0aW9uIHdpbGxcbiAgICAgKiByZXR1cm4gYSBwcm9taXNlIHJlc29sdmluZyB0byBmYWxzZS4gSWYgYSBob29rIHRocm93cyBhbiBlcnJvciwgdGhlIGVycm9yXG4gICAgICogaXMgbG9nZ2VkIHRvIHRoZSBjb25zb2xlIGFuZCB0aGUgbmV4dCBob29rIGlzIHJ1bi4gSWYgYSBob29rIGlzXG4gICAgICogcmVnaXN0ZXJlZCBkdXJpbmcgdGhlIGhvb2sgcHJvY2Vzc2luZywgaXQgd2lsbCBub3QgcnVuIHVudGlsIHRoZSBuZXh0XG4gICAgICogbWVzc2FnZS4gSWYgYSBob29rIGlzIHJlbW92ZWQgZHVyaW5nIHRoZSBob29rIHByb2Nlc3NpbmcsIGl0IHdpbGwgYmVcbiAgICAgKiBkZWFjdGl2YXRlZCBpbW1lZGlhdGVseS5cbiAgICAgKlxuICAgICAqIFNlZSBhbHNvIFtbSUZ1dHVyZS5yZWdpc3Rlck1lc3NhZ2VIb29rXV0uXG4gICAgICovXG4gICAgcmVnaXN0ZXJNZXNzYWdlSG9vayhtc2dJZCwgaG9vaykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGZ1dHVyZSA9IChfYSA9IHRoaXMuX2Z1dHVyZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXQobXNnSWQpO1xuICAgICAgICBpZiAoZnV0dXJlKSB7XG4gICAgICAgICAgICBmdXR1cmUucmVnaXN0ZXJNZXNzYWdlSG9vayhob29rKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYW4gSU9QdWIgbWVzc2FnZSBob29rLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1zZ19pZCAtIFRoZSBwYXJlbnRfaGVhZGVyIG1lc3NhZ2UgaWQgdGhlIGhvb2sgaW50ZXJjZXB0ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaG9vayAtIFRoZSBjYWxsYmFjayBpbnZva2VkIGZvciB0aGUgbWVzc2FnZS5cbiAgICAgKlxuICAgICAqL1xuICAgIHJlbW92ZU1lc3NhZ2VIb29rKG1zZ0lkLCBob29rKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgZnV0dXJlID0gKF9hID0gdGhpcy5fZnV0dXJlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldChtc2dJZCk7XG4gICAgICAgIGlmIChmdXR1cmUpIHtcbiAgICAgICAgICAgIGZ1dHVyZS5yZW1vdmVNZXNzYWdlSG9vayhob29rKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdGhlIGlucHV0IGd1YXJkLCBpZiBhbnkuXG4gICAgICovXG4gICAgcmVtb3ZlSW5wdXRHdWFyZCgpIHtcbiAgICAgICAgdGhpcy5oYXNQZW5kaW5nSW5wdXQgPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgbWVzc2FnZSB3aXRoIGEgZGlzcGxheSBpZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIG1lc3NhZ2Ugd2FzIGhhbmRsZWQuXG4gICAgICovXG4gICAgYXN5bmMgX2hhbmRsZURpc3BsYXlJZChkaXNwbGF5SWQsIG1zZykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBtc2dJZCA9IG1zZy5wYXJlbnRfaGVhZGVyLm1zZ19pZDtcbiAgICAgICAgbGV0IHBhcmVudElkcyA9IHRoaXMuX2Rpc3BsYXlJZFRvUGFyZW50SWRzLmdldChkaXNwbGF5SWQpO1xuICAgICAgICBpZiAocGFyZW50SWRzKSB7XG4gICAgICAgICAgICAvLyBXZSd2ZSBzZWVuIGl0IGJlZm9yZSwgdXBkYXRlIGV4aXN0aW5nIG91dHB1dHMgd2l0aCBzYW1lIGRpc3BsYXlfaWRcbiAgICAgICAgICAgIC8vIGJ5IGhhbmRsaW5nIGRpc3BsYXlfZGF0YSBhcyB1cGRhdGVfZGlzcGxheV9kYXRhLlxuICAgICAgICAgICAgY29uc3QgdXBkYXRlTXNnID0ge1xuICAgICAgICAgICAgICAgIGhlYWRlcjogY29yZXV0aWxzXzIuSlNPTkV4dC5kZWVwQ29weShtc2cuaGVhZGVyKSxcbiAgICAgICAgICAgICAgICBwYXJlbnRfaGVhZGVyOiBjb3JldXRpbHNfMi5KU09ORXh0LmRlZXBDb3B5KG1zZy5wYXJlbnRfaGVhZGVyKSxcbiAgICAgICAgICAgICAgICBtZXRhZGF0YTogY29yZXV0aWxzXzIuSlNPTkV4dC5kZWVwQ29weShtc2cubWV0YWRhdGEpLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGNvcmV1dGlsc18yLkpTT05FeHQuZGVlcENvcHkobXNnLmNvbnRlbnQpLFxuICAgICAgICAgICAgICAgIGNoYW5uZWw6IG1zZy5jaGFubmVsLFxuICAgICAgICAgICAgICAgIGJ1ZmZlcnM6IG1zZy5idWZmZXJzID8gbXNnLmJ1ZmZlcnMuc2xpY2UoKSA6IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdXBkYXRlTXNnLmhlYWRlci5tc2dfdHlwZSA9ICd1cGRhdGVfZGlzcGxheV9kYXRhJztcbiAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHBhcmVudElkcy5tYXAoYXN5bmMgKHBhcmVudElkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZnV0dXJlID0gdGhpcy5fZnV0dXJlcyAmJiB0aGlzLl9mdXR1cmVzLmdldChwYXJlbnRJZCk7XG4gICAgICAgICAgICAgICAgaWYgKGZ1dHVyZSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBmdXR1cmUuaGFuZGxlTXNnKHVwZGF0ZU1zZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdlJ3JlIGRvbmUgaGVyZSBpZiBpdCdzIHVwZGF0ZV9kaXNwbGF5LlxuICAgICAgICBpZiAobXNnLmhlYWRlci5tc2dfdHlwZSA9PT0gJ3VwZGF0ZV9kaXNwbGF5X2RhdGEnKSB7XG4gICAgICAgICAgICAvLyBJdCdzIGFuIHVwZGF0ZSwgZG9uJ3QgcHJvY2VlZCB0byB0aGUgbm9ybWFsIGRpc3BsYXkuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZWd1bGFyIGRpc3BsYXlfZGF0YSB3aXRoIGlkLCByZWNvcmQgaXQgZm9yIGZ1dHVyZSB1cGRhdGluZ1xuICAgICAgICAvLyBpbiBfZGlzcGxheUlkVG9QYXJlbnRJZHMgZm9yIGZ1dHVyZSBsb29rdXAuXG4gICAgICAgIHBhcmVudElkcyA9IChfYSA9IHRoaXMuX2Rpc3BsYXlJZFRvUGFyZW50SWRzLmdldChkaXNwbGF5SWQpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXTtcbiAgICAgICAgaWYgKHBhcmVudElkcy5pbmRleE9mKG1zZ0lkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHBhcmVudElkcy5wdXNoKG1zZ0lkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kaXNwbGF5SWRUb1BhcmVudElkcy5zZXQoZGlzcGxheUlkLCBwYXJlbnRJZHMpO1xuICAgICAgICAvLyBBZGQgdG8gb3VyIG1hcCBvZiBkaXNwbGF5IGlkcyBmb3IgdGhpcyBtZXNzYWdlLlxuICAgICAgICBjb25zdCBkaXNwbGF5SWRzID0gKF9iID0gdGhpcy5fbXNnSWRUb0Rpc3BsYXlJZHMuZ2V0KG1zZ0lkKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogW107XG4gICAgICAgIGlmIChkaXNwbGF5SWRzLmluZGV4T2YobXNnSWQpID09PSAtMSkge1xuICAgICAgICAgICAgZGlzcGxheUlkcy5wdXNoKG1zZ0lkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tc2dJZFRvRGlzcGxheUlkcy5zZXQobXNnSWQsIGRpc3BsYXlJZHMpO1xuICAgICAgICAvLyBMZXQgdGhlIG1lc3NhZ2UgcHJvcGFnYXRlIHRvIHRoZSBpbnRlbmRlZCByZWNpcGllbnQuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRm9yY2VmdWxseSBjbGVhciB0aGUgc29ja2V0IHN0YXRlLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgd2lsbCBjbGVhciBhbGwgc29ja2V0IHN0YXRlIHdpdGhvdXQgY2FsbGluZyBhbnkgaGFuZGxlcnMgYW5kIHdpbGxcbiAgICAgKiBub3QgdXBkYXRlIHRoZSBjb25uZWN0aW9uIHN0YXR1cy4gSWYgeW91IGNhbGwgdGhpcyBtZXRob2QsIHlvdSBhcmVcbiAgICAgKiByZXNwb25zaWJsZSBmb3IgdXBkYXRpbmcgdGhlIGNvbm5lY3Rpb24gc3RhdHVzIGFzIG5lZWRlZCBhbmQgcmVjcmVhdGluZ1xuICAgICAqIHRoZSBzb2NrZXQgaWYgeW91IHBsYW4gdG8gcmVjb25uZWN0LlxuICAgICAqL1xuICAgIF9jbGVhclNvY2tldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3dzICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBDbGVhciB0aGUgd2Vic29ja2V0IGV2ZW50IGhhbmRsZXJzIGFuZCB0aGUgc29ja2V0IGl0c2VsZi5cbiAgICAgICAgICAgIHRoaXMuX3dzLm9ub3BlbiA9IHRoaXMuX25vT3A7XG4gICAgICAgICAgICB0aGlzLl93cy5vbmNsb3NlID0gdGhpcy5fbm9PcDtcbiAgICAgICAgICAgIHRoaXMuX3dzLm9uZXJyb3IgPSB0aGlzLl9ub09wO1xuICAgICAgICAgICAgdGhpcy5fd3Mub25tZXNzYWdlID0gdGhpcy5fbm9PcDtcbiAgICAgICAgICAgIHRoaXMuX3dzLmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl93cyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHN0YXR1cyBpb3B1YiBtZXNzYWdlcyBmcm9tIHRoZSBrZXJuZWwuXG4gICAgICovXG4gICAgX3VwZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXR1cyA9PT0gc3RhdHVzIHx8IHRoaXMuX3N0YXR1cyA9PT0gJ2RlYWQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICBQcml2YXRlLmxvZ0tlcm5lbFN0YXR1cyh0aGlzKTtcbiAgICAgICAgdGhpcy5fc3RhdHVzQ2hhbmdlZC5lbWl0KHN0YXR1cyk7XG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdkZWFkJykge1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZCBwZW5kaW5nIG1lc3NhZ2VzIHRvIHRoZSBrZXJuZWwuXG4gICAgICovXG4gICAgX3NlbmRQZW5kaW5nKCkge1xuICAgICAgICAvLyBXZSBjaGVjayB0byBtYWtlIHN1cmUgd2UgYXJlIHN0aWxsIGNvbm5lY3RlZCBlYWNoIHRpbWUuIEZvclxuICAgICAgICAvLyBleGFtcGxlLCBpZiBhIHdlYnNvY2tldCBidWZmZXIgb3ZlcmZsb3dzLCBpdCBtYXkgY2xvc2UsIHNvIHdlIHNob3VsZFxuICAgICAgICAvLyBzdG9wIHNlbmRpbmcgbWVzc2FnZXMuXG4gICAgICAgIHdoaWxlICh0aGlzLmNvbm5lY3Rpb25TdGF0dXMgPT09ICdjb25uZWN0ZWQnICYmXG4gICAgICAgICAgICB0aGlzLl9rZXJuZWxTZXNzaW9uICE9PSBSRVNUQVJUSU5HX0tFUk5FTF9TRVNTSU9OICYmXG4gICAgICAgICAgICB0aGlzLl9wZW5kaW5nTWVzc2FnZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fc2VuZE1lc3NhZ2UodGhpcy5fcGVuZGluZ01lc3NhZ2VzWzBdLCBmYWxzZSk7XG4gICAgICAgICAgICAvLyBXZSBzaGlmdCB0aGUgbWVzc2FnZSBvZmYgdGhlIHF1ZXVlIGFmdGVyIHRoZSBtZXNzYWdlIGlzIHNlbnQgc28gdGhhdFxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXhjZXB0aW9uLCB0aGUgbWVzc2FnZSBpcyBzdGlsbCBwZW5kaW5nLlxuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ01lc3NhZ2VzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYXIgdGhlIGludGVybmFsIHN0YXRlLlxuICAgICAqL1xuICAgIF9jbGVhcktlcm5lbFN0YXRlKCkge1xuICAgICAgICB0aGlzLl9rZXJuZWxTZXNzaW9uID0gJyc7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdNZXNzYWdlcyA9IFtdO1xuICAgICAgICB0aGlzLl9mdXR1cmVzLmZvckVhY2goZnV0dXJlID0+IHtcbiAgICAgICAgICAgIGZ1dHVyZS5kaXNwb3NlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9jb21tcy5mb3JFYWNoKGNvbW0gPT4ge1xuICAgICAgICAgICAgY29tbS5kaXNwb3NlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9tc2dDaGFpbiA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB0aGlzLl9mdXR1cmVzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9jb21tcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fZGlzcGxheUlkVG9QYXJlbnRJZHMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fbXNnSWRUb0Rpc3BsYXlJZHMuY2xlYXIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgdG8gbWFrZSBzdXJlIGl0IGlzIG9rYXkgdG8gcHJvY2VlZCB0byBoYW5kbGUgYSBtZXNzYWdlLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIEJlY2F1c2Ugd2UgaGFuZGxlIG1lc3NhZ2VzIGFzeW5jaHJvbm91c2x5LCBiZWZvcmUgYSBtZXNzYWdlIGlzIGhhbmRsZWQgdGhlXG4gICAgICoga2VybmVsIG1pZ2h0IGJlIGRpc3Bvc2VkIG9yIHJlc3RhcnRlZCAoYW5kIGhhdmUgYSBkaWZmZXJlbnQgc2Vzc2lvbiBpZCkuXG4gICAgICogVGhpcyBmdW5jdGlvbiB0aHJvd3MgYW4gZXJyb3IgaW4gZWFjaCBvZiB0aGVzZSBjYXNlcy4gVGhpcyBpcyBtZWFudCB0byBiZVxuICAgICAqIGNhbGxlZCBhdCB0aGUgc3RhcnQgb2YgYW4gYXN5bmNocm9ub3VzIG1lc3NhZ2UgaGFuZGxlciB0byBjYW5jZWwgbWVzc2FnZVxuICAgICAqIHByb2Nlc3NpbmcgaWYgdGhlIG1lc3NhZ2Ugbm8gbG9uZ2VyIGlzIHZhbGlkLlxuICAgICAqL1xuICAgIF9hc3NlcnRDdXJyZW50TWVzc2FnZShtc2cpIHtcbiAgICAgICAgdGhpcy5fZXJyb3JJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGlmIChtc2cuaGVhZGVyLnNlc3Npb24gIT09IHRoaXMuX2tlcm5lbFNlc3Npb24pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuY2VsaW5nIGhhbmRsaW5nIG9mIG9sZCBtZXNzYWdlOiAke21zZy5oZWFkZXIubXNnX3R5cGV9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgYGNvbW1fb3BlbmAga2VybmVsIG1lc3NhZ2UuXG4gICAgICovXG4gICAgYXN5bmMgX2hhbmRsZUNvbW1PcGVuKG1zZykge1xuICAgICAgICB0aGlzLl9hc3NlcnRDdXJyZW50TWVzc2FnZShtc2cpO1xuICAgICAgICBjb25zdCBjb250ZW50ID0gbXNnLmNvbnRlbnQ7XG4gICAgICAgIGNvbnN0IGNvbW0gPSBuZXcgY29tbV8xLkNvbW1IYW5kbGVyKGNvbnRlbnQudGFyZ2V0X25hbWUsIGNvbnRlbnQuY29tbV9pZCwgdGhpcywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdW5yZWdpc3RlckNvbW0oY29udGVudC5jb21tX2lkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2NvbW1zLnNldChjb250ZW50LmNvbW1faWQsIGNvbW0pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gYXdhaXQgUHJpdmF0ZS5sb2FkT2JqZWN0KGNvbnRlbnQudGFyZ2V0X25hbWUsIGNvbnRlbnQudGFyZ2V0X21vZHVsZSwgdGhpcy5fdGFyZ2V0UmVnaXN0cnkpO1xuICAgICAgICAgICAgYXdhaXQgdGFyZ2V0KGNvbW0sIG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIENsb3NlIHRoZSBjb21tIGFzeW5jaHJvbm91c2x5LiBXZSBjYW5ub3QgYmxvY2sgbWVzc2FnZSBwcm9jZXNzaW5nIG9uXG4gICAgICAgICAgICAvLyBrZXJuZWwgbWVzc2FnZXMgdG8gd2FpdCBmb3IgYW5vdGhlciBrZXJuZWwgbWVzc2FnZS5cbiAgICAgICAgICAgIGNvbW0uY2xvc2UoKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0V4Y2VwdGlvbiBvcGVuaW5nIG5ldyBjb21tJyk7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSAnY29tbV9jbG9zZScga2VybmVsIG1lc3NhZ2UuXG4gICAgICovXG4gICAgYXN5bmMgX2hhbmRsZUNvbW1DbG9zZShtc2cpIHtcbiAgICAgICAgdGhpcy5fYXNzZXJ0Q3VycmVudE1lc3NhZ2UobXNnKTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IG1zZy5jb250ZW50O1xuICAgICAgICBjb25zdCBjb21tID0gdGhpcy5fY29tbXMuZ2V0KGNvbnRlbnQuY29tbV9pZCk7XG4gICAgICAgIGlmICghY29tbSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignQ29tbSBub3QgZm91bmQgZm9yIGNvbW0gaWQgJyArIGNvbnRlbnQuY29tbV9pZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdW5yZWdpc3RlckNvbW0oY29tbS5jb21tSWQpO1xuICAgICAgICBjb25zdCBvbkNsb3NlID0gY29tbS5vbkNsb3NlO1xuICAgICAgICBpZiAob25DbG9zZSkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmF3YWl0LXByb21pc2VcbiAgICAgICAgICAgIGF3YWl0IG9uQ2xvc2UobXNnKTtcbiAgICAgICAgfVxuICAgICAgICBjb21tLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgJ2NvbW1fbXNnJyBrZXJuZWwgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBhc3luYyBfaGFuZGxlQ29tbU1zZyhtc2cpIHtcbiAgICAgICAgdGhpcy5fYXNzZXJ0Q3VycmVudE1lc3NhZ2UobXNnKTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IG1zZy5jb250ZW50O1xuICAgICAgICBjb25zdCBjb21tID0gdGhpcy5fY29tbXMuZ2V0KGNvbnRlbnQuY29tbV9pZCk7XG4gICAgICAgIGlmICghY29tbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9uTXNnID0gY29tbS5vbk1zZztcbiAgICAgICAgaWYgKG9uTXNnKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YXdhaXQtcHJvbWlzZVxuICAgICAgICAgICAgYXdhaXQgb25Nc2cobXNnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVbnJlZ2lzdGVyIGEgY29tbSBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBfdW5yZWdpc3RlckNvbW0oY29tbUlkKSB7XG4gICAgICAgIHRoaXMuX2NvbW1zLmRlbGV0ZShjb21tSWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY29ubmVjdGlvbiBzdGF0dXMgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBfdXBkYXRlQ29ubmVjdGlvblN0YXR1cyhjb25uZWN0aW9uU3RhdHVzKSB7XG4gICAgICAgIGlmICh0aGlzLl9jb25uZWN0aW9uU3RhdHVzID09PSBjb25uZWN0aW9uU3RhdHVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29ubmVjdGlvblN0YXR1cyA9IGNvbm5lY3Rpb25TdGF0dXM7XG4gICAgICAgIC8vIElmIHdlIGFyZSBub3QgJ2Nvbm5lY3RpbmcnLCByZXNldCBhbnkgcmVjb25uZWN0aW9uIGF0dGVtcHRzLlxuICAgICAgICBpZiAoY29ubmVjdGlvblN0YXR1cyAhPT0gJ2Nvbm5lY3RpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RBdHRlbXB0ID0gMDtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9yZWNvbm5lY3RUaW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0dXMgIT09ICdkZWFkJykge1xuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb25TdGF0dXMgPT09ICdjb25uZWN0ZWQnKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3RhcnRpbmcgPSB0aGlzLl9rZXJuZWxTZXNzaW9uID09PSBSRVNUQVJUSU5HX0tFUk5FTF9TRVNTSU9OO1xuICAgICAgICAgICAgICAgIC8vIFNlbmQgYSBrZXJuZWwgaW5mbyByZXF1ZXN0IHRvIG1ha2Ugc3VyZSB3ZSBzZW5kIGF0IGxlYXN0IG9uZVxuICAgICAgICAgICAgICAgIC8vIG1lc3NhZ2UgdG8gZ2V0IGtlcm5lbCBzdGF0dXMgYmFjay4gQWx3YXlzIHJlcXVlc3Qga2VybmVsIGluZm9cbiAgICAgICAgICAgICAgICAvLyBmaXJzdCwgdG8gZ2V0IGtlcm5lbCBzdGF0dXMgYmFjayBhbmQgZW5zdXJlIGlvcHViIGlzIGZ1bGx5XG4gICAgICAgICAgICAgICAgLy8gZXN0YWJsaXNoZWQuIElmIHdlIGFyZSByZXN0YXJ0aW5nLCB0aGlzIG1lc3NhZ2Ugd2lsbCBza2lwIHRoZSBxdWV1ZVxuICAgICAgICAgICAgICAgIC8vIGFuZCBiZSBzZW50IGltbWVkaWF0ZWx5LlxuICAgICAgICAgICAgICAgIGxldCBwID0gdGhpcy5yZXF1ZXN0S2VybmVsSW5mbygpO1xuICAgICAgICAgICAgICAgIC8vIFNlbmQgYW55IHBlbmRpbmcgbWVzc2FnZXMgYWZ0ZXIgdGhlIGtlcm5lbEluZm8gcmVzb2x2ZXMsIG9yIGFmdGVyIGFcbiAgICAgICAgICAgICAgICAvLyB0aW1lb3V0IGFzIGEgZmFpbHNhZmUuXG4gICAgICAgICAgICAgICAgbGV0IHNlbmRQZW5kaW5nQ2FsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbGV0IHNlbmRQZW5kaW5nT25jZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbmRQZW5kaW5nQ2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2VuZFBlbmRpbmdDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdGFydGluZyAmJiB0aGlzLl9rZXJuZWxTZXNzaW9uID09PSBSRVNUQVJUSU5HX0tFUk5FTF9TRVNTSU9OKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSB3ZXJlIHJlc3RhcnRpbmcgYW5kIGEgbWVzc2FnZSBkaWRuJ3QgYXJyaXZlIHRvIHNldCB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlc3Npb24sIGJ1dCB3ZSBqdXN0IGFzc3VtZSB0aGUgcmVzdGFydCBzdWNjZWVkZWQgYW5kIHNlbmQgYW55XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwZW5kaW5nIG1lc3NhZ2VzLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRklYTUU6IGl0IHdvdWxkIGJlIGJldHRlciB0byByZXRyeSB0aGUga2VybmVsX2luZm9fcmVxdWVzdCBoZXJlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXJuZWxTZXNzaW9uID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRIYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcGVuZGluZ01lc3NhZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbmRQZW5kaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHZvaWQgcC50aGVuKHNlbmRQZW5kaW5nT25jZSk7XG4gICAgICAgICAgICAgICAgLy8gRklYTUU6IGlmIHNlbnQgd2hpbGUgem1xIHN1YnNjcmlwdGlvbnMgYXJlIG5vdCBlc3RhYmxpc2hlZCxcbiAgICAgICAgICAgICAgICAvLyBrZXJuZWxJbmZvIG1heSBub3QgcmVzb2x2ZSwgc28gdXNlIGEgdGltZW91dCB0byBlbnN1cmUgd2UgZG9uJ3QgaGFuZyBmb3JldmVyLlxuICAgICAgICAgICAgICAgIC8vIEl0IG1heSBiZSBwcmVmZXJhYmxlIHRvIHJldHJ5IGtlcm5lbEluZm8gcmF0aGVyIHRoYW4gZ2l2ZSB1cCBhZnRlciBvbmUgdGltZW91dC5cbiAgICAgICAgICAgICAgICBsZXQgdGltZW91dEhhbmRsZSA9IHNldFRpbWVvdXQoc2VuZFBlbmRpbmdPbmNlLCBLRVJORUxfSU5GT19USU1FT1VUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBjb25uZWN0aW9uIGlzIGRvd24sIHRoZW4gd2UgZG8gbm90IGtub3cgd2hhdCBpcyBoYXBwZW5pbmdcbiAgICAgICAgICAgICAgICAvLyB3aXRoIHRoZSBrZXJuZWwsIHNvIHNldCB0aGUgc3RhdHVzIHRvIHVua25vd24uXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3RhdHVzKCd1bmtub3duJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm90aWZ5IG90aGVycyB0aGF0IHRoZSBjb25uZWN0aW9uIHN0YXR1cyBjaGFuZ2VkLlxuICAgICAgICB0aGlzLl9jb25uZWN0aW9uU3RhdHVzQ2hhbmdlZC5lbWl0KGNvbm5lY3Rpb25TdGF0dXMpO1xuICAgIH1cbiAgICBhc3luYyBfaGFuZGxlTWVzc2FnZShtc2cpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgbGV0IGhhbmRsZWQgPSBmYWxzZTtcbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgYSBkaXNwbGF5X2lkIHdlIG5lZWQgdG8gcmVyb3V0ZS5cbiAgICAgICAgaWYgKG1zZy5wYXJlbnRfaGVhZGVyICYmXG4gICAgICAgICAgICBtc2cuY2hhbm5lbCA9PT0gJ2lvcHViJyAmJlxuICAgICAgICAgICAgKEtlcm5lbE1lc3NhZ2UuaXNEaXNwbGF5RGF0YU1zZyhtc2cpIHx8XG4gICAgICAgICAgICAgICAgS2VybmVsTWVzc2FnZS5pc1VwZGF0ZURpc3BsYXlEYXRhTXNnKG1zZykgfHxcbiAgICAgICAgICAgICAgICBLZXJuZWxNZXNzYWdlLmlzRXhlY3V0ZVJlc3VsdE1zZyhtc2cpKSkge1xuICAgICAgICAgICAgLy8gZGlzcGxheV9kYXRhIG1lc3NhZ2VzIG1heSByZS1yb3V0ZSBiYXNlZCBvbiB0aGVpciBkaXNwbGF5X2lkLlxuICAgICAgICAgICAgY29uc3QgdHJhbnNpZW50ID0gKChfYSA9IG1zZy5jb250ZW50LnRyYW5zaWVudCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDoge30pO1xuICAgICAgICAgICAgY29uc3QgZGlzcGxheUlkID0gdHJhbnNpZW50WydkaXNwbGF5X2lkJ107XG4gICAgICAgICAgICBpZiAoZGlzcGxheUlkKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlZCA9IGF3YWl0IHRoaXMuX2hhbmRsZURpc3BsYXlJZChkaXNwbGF5SWQsIG1zZyk7XG4gICAgICAgICAgICAgICAgLy8gVGhlIGF3YWl0IGFib3ZlIG1heSBtYWtlIHRoaXMgbWVzc2FnZSBvdXQgb2YgZGF0ZSwgc28gY2hlY2sgYWdhaW4uXG4gICAgICAgICAgICAgICAgdGhpcy5fYXNzZXJ0Q3VycmVudE1lc3NhZ2UobXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWhhbmRsZWQgJiYgbXNnLnBhcmVudF9oZWFkZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudEhlYWRlciA9IG1zZy5wYXJlbnRfaGVhZGVyO1xuICAgICAgICAgICAgY29uc3QgZnV0dXJlID0gKF9iID0gdGhpcy5fZnV0dXJlcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmdldChwYXJlbnRIZWFkZXIubXNnX2lkKTtcbiAgICAgICAgICAgIGlmIChmdXR1cmUpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBmdXR1cmUuaGFuZGxlTXNnKG1zZyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXNzZXJ0Q3VycmVudE1lc3NhZ2UobXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBtZXNzYWdlIHdhcyBzZW50IGJ5IHVzIGFuZCB3YXMgbm90IGlvcHViLCBpdCBpcyBvcnBoYW5lZC5cbiAgICAgICAgICAgICAgICBjb25zdCBvd25lZCA9IHBhcmVudEhlYWRlci5zZXNzaW9uID09PSB0aGlzLmNsaWVudElkO1xuICAgICAgICAgICAgICAgIGlmIChtc2cuY2hhbm5lbCAhPT0gJ2lvcHViJyAmJiBvd25lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91bmhhbmRsZWRNZXNzYWdlLmVtaXQobXNnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1zZy5jaGFubmVsID09PSAnaW9wdWInKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG1zZy5oZWFkZXIubXNnX3R5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdGF0dXMnOiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0aW5nIHRoZSBzdGF0dXMgaXMgc3luY2hyb25vdXMsIGFuZCB3ZSBjYWxsIG5vIGFzeW5jIHVzZXIgY29kZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBleGVjdXRpb25TdGF0ZSA9IG1zZy5jb250ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAuZXhlY3V0aW9uX3N0YXRlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhlY3V0aW9uU3RhdGUgPT09ICdyZXN0YXJ0aW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGtlcm5lbCBoYXMgYmVlbiBhdXRvLXJlc3RhcnRlZCBieSB0aGUgc2VydmVyLiBBZnRlclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJvY2Vzc2luZyBmb3IgdGhpcyBtZXNzYWdlIGlzIGNvbXBsZXRlbHkgZG9uZSwgd2Ugd2FudCB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGFuZGxlIHRoaXMgcmVzdGFydCwgc28gd2UgZG9uJ3QgYXdhaXQsIGJ1dCBpbnN0ZWFkIHNjaGVkdWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgd29yayBhcyBhIG1pY3JvdGFzayAoaS5lLiwgaW4gYSBwcm9taXNlIHJlc29sdXRpb24pLiBXZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2NoZWR1bGUgdGhpcyBoZXJlIHNvIHRoYXQgaXQgY29tZXMgYmVmb3JlIGFueSBtaWNyb3Rhc2tzIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1pZ2h0IGJlIHNjaGVkdWxlZCBpbiB0aGUgc3RhdHVzIHNpZ25hbCBlbWlzc2lvbiBiZWxvdy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3RhdHVzKCdhdXRvcmVzdGFydGluZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NsZWFyS2VybmVsU3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBtdXN0IHJlY29ubmVjdCBzaW5jZSB0aGUga2VybmVsIGNvbm5lY3Rpb24gaW5mb3JtYXRpb24gbWF5IGhhdmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2VkLCBhbmQgdGhlIHNlcnZlciBvbmx5IHJlZnJlc2hlcyBpdHMgem1xIGNvbm5lY3Rpb24gd2hlbiBhIG5ld1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlYnNvY2tldCBpcyBvcGVuZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YXR1cyhleGVjdXRpb25TdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlICdjb21tX29wZW4nOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVDb21tcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5faGFuZGxlQ29tbU9wZW4obXNnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjb21tX21zZyc6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZUNvbW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9oYW5kbGVDb21tTXNnKG1zZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29tbV9jbG9zZSc6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZUNvbW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9oYW5kbGVDb21tQ2xvc2UobXNnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHRoZSBtZXNzYWdlIHdhcyBhIHN0YXR1cyBkZWFkIG1lc3NhZ2UsIHdlIG1pZ2h0IGhhdmUgZGlzcG9zZWQgb3Vyc2VsdmVzLlxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hc3NlcnRDdXJyZW50TWVzc2FnZShtc2cpO1xuICAgICAgICAgICAgICAgIC8vIHRoZSBtZXNzYWdlIHdvdWxkbid0IGJlIGVtaXR0ZWQgaWYgd2Ugd2VyZSBkaXNwb3NlZCBhbnl3YXkuXG4gICAgICAgICAgICAgICAgdGhpcy5faW9wdWJNZXNzYWdlLmVtaXQobXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0IGEgY29ubmVjdGlvbiBpZiB3ZSBoYXZlIG5vdCBleGhhdXN0ZWQgY29ubmVjdGlvbiBhdHRlbXB0cy5cbiAgICAgKi9cbiAgICBfcmVjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9lcnJvcklmRGlzcG9zZWQoKTtcbiAgICAgICAgLy8gQ2xlYXIgYW55IGV4aXN0aW5nIHJlY29ubmVjdGlvbiBhdHRlbXB0XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9yZWNvbm5lY3RUaW1lb3V0KTtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBjb25uZWN0aW9uIHN0YXR1cyBhbmQgc2NoZWR1bGUgYSBwb3NzaWJsZSByZWNvbm5lY3Rpb24uXG4gICAgICAgIGlmICh0aGlzLl9yZWNvbm5lY3RBdHRlbXB0IDwgdGhpcy5fcmVjb25uZWN0TGltaXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0dXMoJ2Nvbm5lY3RpbmcnKTtcbiAgICAgICAgICAgIC8vIFRoZSBmaXJzdCByZWNvbm5lY3QgYXR0ZW1wdCBzaG91bGQgaGFwcGVuIGltbWVkaWF0ZWx5LCBhbmQgc3Vic2VxdWVudFxuICAgICAgICAgICAgLy8gYXR0ZW1wdHMgc2hvdWxkIHBpY2sgYSByYW5kb20gbnVtYmVyIGluIGEgZ3Jvd2luZyByYW5nZSBzbyB0aGF0IHdlXG4gICAgICAgICAgICAvLyBkb24ndCBvdmVybG9hZCB0aGUgc2VydmVyIHdpdGggc3luY2hyb25pemVkIHJlY29ubmVjdGlvbiBhdHRlbXB0c1xuICAgICAgICAgICAgLy8gYWNyb3NzIG11bHRpcGxlIGtlcm5lbHMuXG4gICAgICAgICAgICBjb25zdCB0aW1lb3V0ID0gUHJpdmF0ZS5nZXRSYW5kb21JbnRJbmNsdXNpdmUoMCwgMWUzICogKE1hdGgucG93KDIsIHRoaXMuX3JlY29ubmVjdEF0dGVtcHQpIC0gMSkpO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBDb25uZWN0aW9uIGxvc3QsIHJlY29ubmVjdGluZyBpbiAke01hdGguZmxvb3IodGltZW91dCAvIDEwMDApfSBzZWNvbmRzLmApO1xuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0VGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5fY3JlYXRlU29ja2V0LCB0aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuX3JlY29ubmVjdEF0dGVtcHQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0dXMoJ2Rpc2Nvbm5lY3RlZCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENsZWFyIHRoZSB3ZWJzb2NrZXQgZXZlbnQgaGFuZGxlcnMgYW5kIHRoZSBzb2NrZXQgaXRzZWxmLlxuICAgICAgICB0aGlzLl9jbGVhclNvY2tldCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIHRocm93IGFuIGVycm9yIGlmIHRoaXMgaW5zdGFuY2UgaXMgZGlzcG9zZWQuXG4gICAgICovXG4gICAgX2Vycm9ySWZEaXNwb3NlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdLZXJuZWwgY29ubmVjdGlvbiBpcyBkaXNwb3NlZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBoYXNQZW5kaW5nSW5wdXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oYXNQZW5kaW5nSW5wdXQ7XG4gICAgfVxuICAgIHNldCBoYXNQZW5kaW5nSW5wdXQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5faGFzUGVuZGluZ0lucHV0ID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdJbnB1dC5lbWl0KHZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLktlcm5lbENvbm5lY3Rpb24gPSBLZXJuZWxDb25uZWN0aW9uO1xuLyoqXG4gKiBBIHByaXZhdGUgbmFtZXNwYWNlIGZvciB0aGUgS2VybmVsLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIExvZyB0aGUgY3VycmVudCBrZXJuZWwgc3RhdHVzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGxvZ0tlcm5lbFN0YXR1cyhrZXJuZWwpIHtcbiAgICAgICAgc3dpdGNoIChrZXJuZWwuc3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlICdpZGxlJzpcbiAgICAgICAgICAgIGNhc2UgJ2J1c3knOlxuICAgICAgICAgICAgY2FzZSAndW5rbm93bic6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKGBLZXJuZWw6ICR7a2VybmVsLnN0YXR1c30gKCR7a2VybmVsLmlkfSlgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBQcml2YXRlLmxvZ0tlcm5lbFN0YXR1cyA9IGxvZ0tlcm5lbFN0YXR1cztcbiAgICAvKipcbiAgICAgKiBTZW5kIGEga2VybmVsIG1lc3NhZ2UgdG8gdGhlIGtlcm5lbCBhbmQgcmVzb2x2ZSB0aGUgcmVwbHkgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBhc3luYyBmdW5jdGlvbiBoYW5kbGVTaGVsbE1lc3NhZ2Uoa2VybmVsLCBtc2cpIHtcbiAgICAgICAgY29uc3QgZnV0dXJlID0ga2VybmVsLnNlbmRTaGVsbE1lc3NhZ2UobXNnLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIGZ1dHVyZS5kb25lO1xuICAgIH1cbiAgICBQcml2YXRlLmhhbmRsZVNoZWxsTWVzc2FnZSA9IGhhbmRsZVNoZWxsTWVzc2FnZTtcbiAgICAvKipcbiAgICAgKiBUcnkgdG8gbG9hZCBhbiBvYmplY3QgZnJvbSBhIG1vZHVsZSBvciBhIHJlZ2lzdHJ5LlxuICAgICAqXG4gICAgICogVHJ5IHRvIGxvYWQgYW4gb2JqZWN0IGZyb20gYSBtb2R1bGUgYXN5bmNocm9ub3VzbHkgaWYgYSBtb2R1bGVcbiAgICAgKiBpcyBzcGVjaWZpZWQsIG90aGVyd2lzZSB0cmllcyB0byBsb2FkIGFuIG9iamVjdCBmcm9tIHRoZSBnbG9iYWxcbiAgICAgKiByZWdpc3RyeSwgaWYgdGhlIGdsb2JhbCByZWdpc3RyeSBpcyBwcm92aWRlZC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBMb2FkaW5nIGEgbW9kdWxlIHVzZXMgcmVxdWlyZWpzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGxvYWRPYmplY3QobmFtZSwgbW9kdWxlTmFtZSwgcmVnaXN0cnkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIC8vIFRyeSBsb2FkaW5nIHRoZSBtb2R1bGUgdXNpbmcgcmVxdWlyZS5qc1xuICAgICAgICAgICAgaWYgKG1vZHVsZU5hbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlcXVpcmVqcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZXF1aXJlanMgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlcXVpcmVqcyhbbW9kdWxlTmFtZV0sIChtb2QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZFtuYW1lXSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtc2cgPSBgT2JqZWN0ICcke25hbWV9JyBub3QgZm91bmQgaW4gbW9kdWxlICcke21vZHVsZU5hbWV9J2A7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKG1zZykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShtb2RbbmFtZV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChyZWdpc3RyeSA9PT0gbnVsbCB8fCByZWdpc3RyeSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVnaXN0cnlbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZWdpc3RyeVtuYW1lXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBPYmplY3QgJyR7bmFtZX0nIG5vdCBmb3VuZCBpbiByZWdpc3RyeWApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBQcml2YXRlLmxvYWRPYmplY3QgPSBsb2FkT2JqZWN0O1xuICAgIC8qKlxuICAgICAqIEdldCBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIGFuZCBtYXgsIGluY2x1c2l2ZSBvZiBib3RoLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIEZyb21cbiAgICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXRoL3JhbmRvbSNHZXR0aW5nX2FfcmFuZG9tX2ludGVnZXJfYmV0d2Vlbl90d29fdmFsdWVzX2luY2x1c2l2ZVxuICAgICAqXG4gICAgICogRnJvbSB0aGUgTUROIHBhZ2U6IEl0IG1pZ2h0IGJlIHRlbXB0aW5nIHRvIHVzZSBNYXRoLnJvdW5kKCkgdG8gYWNjb21wbGlzaFxuICAgICAqIHRoYXQsIGJ1dCBkb2luZyBzbyB3b3VsZCBjYXVzZSB5b3VyIHJhbmRvbSBudW1iZXJzIHRvIGZvbGxvdyBhIG5vbi11bmlmb3JtXG4gICAgICogZGlzdHJpYnV0aW9uLCB3aGljaCBtYXkgbm90IGJlIGFjY2VwdGFibGUgZm9yIHlvdXIgbmVlZHMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UmFuZG9tSW50SW5jbHVzaXZlKG1pbiwgbWF4KSB7XG4gICAgICAgIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICAgICAgICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuICAgIH1cbiAgICBQcml2YXRlLmdldFJhbmRvbUludEluY2x1c2l2ZSA9IGdldFJhbmRvbUludEluY2x1c2l2ZTtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVmYXVsdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5LZXJuZWxTaGVsbEZ1dHVyZUhhbmRsZXIgPSBleHBvcnRzLktlcm5lbENvbnRyb2xGdXR1cmVIYW5kbGVyID0gZXhwb3J0cy5LZXJuZWxGdXR1cmVIYW5kbGVyID0gdm9pZCAwO1xuY29uc3QgY29yZXV0aWxzXzEgPSByZXF1aXJlKFwiQGx1bWluby9jb3JldXRpbHNcIik7XG5jb25zdCBkaXNwb3NhYmxlXzEgPSByZXF1aXJlKFwiQGx1bWluby9kaXNwb3NhYmxlXCIpO1xuY29uc3QgS2VybmVsTWVzc2FnZSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9tZXNzYWdlc1wiKSk7XG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIGEga2VybmVsIGZ1dHVyZS5cbiAqXG4gKiBJZiBhIHJlcGx5IGlzIGV4cGVjdGVkLCB0aGUgRnV0dXJlIGlzIGNvbnNpZGVyZWQgZG9uZSB3aGVuIGJvdGggYSBgcmVwbHlgXG4gKiBtZXNzYWdlIGFuZCBhbiBgaWRsZWAgaW9wdWIgc3RhdHVzIG1lc3NhZ2UgaGF2ZSBiZWVuIHJlY2VpdmVkLiAgT3RoZXJ3aXNlLCBpdFxuICogaXMgY29uc2lkZXJlZCBkb25lIHdoZW4gdGhlIGBpZGxlYCBzdGF0dXMgaXMgcmVjZWl2ZWQuXG4gKlxuICovXG5jbGFzcyBLZXJuZWxGdXR1cmVIYW5kbGVyIGV4dGVuZHMgZGlzcG9zYWJsZV8xLkRpc3Bvc2FibGVEZWxlZ2F0ZSB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IEtlcm5lbEZ1dHVyZUhhbmRsZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY2IsIG1zZywgZXhwZWN0UmVwbHksIGRpc3Bvc2VPbkRvbmUsIGtlcm5lbCkge1xuICAgICAgICBzdXBlcihjYik7XG4gICAgICAgIHRoaXMuX3N0YXR1cyA9IDA7XG4gICAgICAgIHRoaXMuX3N0ZGluID0gUHJpdmF0ZS5ub09wO1xuICAgICAgICB0aGlzLl9pb3B1YiA9IFByaXZhdGUubm9PcDtcbiAgICAgICAgdGhpcy5fcmVwbHkgPSBQcml2YXRlLm5vT3A7XG4gICAgICAgIHRoaXMuX2RvbmUgPSBuZXcgY29yZXV0aWxzXzEuUHJvbWlzZURlbGVnYXRlKCk7XG4gICAgICAgIHRoaXMuX2hvb2tzID0gbmV3IFByaXZhdGUuSG9va0xpc3QoKTtcbiAgICAgICAgdGhpcy5fZGlzcG9zZU9uRG9uZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX21zZyA9IG1zZztcbiAgICAgICAgaWYgKCFleHBlY3RSZXBseSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0RmxhZyhQcml2YXRlLktlcm5lbEZ1dHVyZUZsYWcuR290UmVwbHkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VPbkRvbmUgPSBkaXNwb3NlT25Eb25lO1xuICAgICAgICB0aGlzLl9rZXJuZWwgPSBrZXJuZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgb3JpZ2luYWwgb3V0Z29pbmcgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBnZXQgbXNnKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbXNnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBmdXR1cmUgaXMgZG9uZS5cbiAgICAgKi9cbiAgICBnZXQgZG9uZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RvbmUucHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSByZXBseSBoYW5kbGVyLlxuICAgICAqL1xuICAgIGdldCBvblJlcGx5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVwbHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgcmVwbHkgaGFuZGxlci5cbiAgICAgKi9cbiAgICBzZXQgb25SZXBseShjYikge1xuICAgICAgICB0aGlzLl9yZXBseSA9IGNiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGlvcHViIGhhbmRsZXIuXG4gICAgICovXG4gICAgZ2V0IG9uSU9QdWIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pb3B1YjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBpb3B1YiBoYW5kbGVyLlxuICAgICAqL1xuICAgIHNldCBvbklPUHViKGNiKSB7XG4gICAgICAgIHRoaXMuX2lvcHViID0gY2I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgc3RkaW4gaGFuZGxlci5cbiAgICAgKi9cbiAgICBnZXQgb25TdGRpbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZGluO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHN0ZGluIGhhbmRsZXIuXG4gICAgICovXG4gICAgc2V0IG9uU3RkaW4oY2IpIHtcbiAgICAgICAgdGhpcy5fc3RkaW4gPSBjYjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgaG9vayBmb3IgSU9QdWIgbWVzc2FnZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaG9vayAtIFRoZSBjYWxsYmFjayBpbnZva2VkIGZvciBhbiBJT1B1YiBtZXNzYWdlLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSBJT1B1YiBob29rIHN5c3RlbSBhbGxvd3MgeW91IHRvIHByZWVtcHQgdGhlIGhhbmRsZXJzIGZvciBJT1B1YlxuICAgICAqIG1lc3NhZ2VzIGhhbmRsZWQgYnkgdGhlIGZ1dHVyZS5cbiAgICAgKlxuICAgICAqIFRoZSBtb3N0IHJlY2VudGx5IHJlZ2lzdGVyZWQgaG9vayBpcyBydW4gZmlyc3QuIEEgaG9vayBjYW4gcmV0dXJuIGFcbiAgICAgKiBib29sZWFuIG9yIGEgcHJvbWlzZSB0byBhIGJvb2xlYW4sIGluIHdoaWNoIGNhc2UgYWxsIGtlcm5lbCBtZXNzYWdlXG4gICAgICogcHJvY2Vzc2luZyBwYXVzZXMgdW50aWwgdGhlIHByb21pc2UgaXMgZnVsZmlsbGVkLiBJZiBhIGhvb2sgcmV0dXJuIHZhbHVlXG4gICAgICogcmVzb2x2ZXMgdG8gZmFsc2UsIGFueSBsYXRlciBob29rcyB3aWxsIG5vdCBydW4gYW5kIHRoZSBmdW5jdGlvbiB3aWxsXG4gICAgICogcmV0dXJuIGEgcHJvbWlzZSByZXNvbHZpbmcgdG8gZmFsc2UuIElmIGEgaG9vayB0aHJvd3MgYW4gZXJyb3IsIHRoZSBlcnJvclxuICAgICAqIGlzIGxvZ2dlZCB0byB0aGUgY29uc29sZSBhbmQgdGhlIG5leHQgaG9vayBpcyBydW4uIElmIGEgaG9vayBpc1xuICAgICAqIHJlZ2lzdGVyZWQgZHVyaW5nIHRoZSBob29rIHByb2Nlc3NpbmcsIGl0IHdpbGwgbm90IHJ1biB1bnRpbCB0aGUgbmV4dFxuICAgICAqIG1lc3NhZ2UuIElmIGEgaG9vayBpcyByZW1vdmVkIGR1cmluZyB0aGUgaG9vayBwcm9jZXNzaW5nLCBpdCB3aWxsIGJlXG4gICAgICogZGVhY3RpdmF0ZWQgaW1tZWRpYXRlbHkuXG4gICAgICovXG4gICAgcmVnaXN0ZXJNZXNzYWdlSG9vayhob29rKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignS2VybmVsIGZ1dHVyZSBpcyBkaXNwb3NlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2hvb2tzLmFkZChob29rKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgaG9vayBmb3IgSU9QdWIgbWVzc2FnZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaG9vayAtIFRoZSBob29rIHRvIHJlbW92ZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBJZiBhIGhvb2sgaXMgcmVtb3ZlZCBkdXJpbmcgdGhlIGhvb2sgcHJvY2Vzc2luZywgaXQgd2lsbCBiZSBkZWFjdGl2YXRlZCBpbW1lZGlhdGVseS5cbiAgICAgKi9cbiAgICByZW1vdmVNZXNzYWdlSG9vayhob29rKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ob29rcy5yZW1vdmUoaG9vayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmQgYW4gYGlucHV0X3JlcGx5YCBtZXNzYWdlLlxuICAgICAqL1xuICAgIHNlbmRJbnB1dFJlcGx5KGNvbnRlbnQsIHBhcmVudF9oZWFkZXIpIHtcbiAgICAgICAgdGhpcy5fa2VybmVsLnNlbmRJbnB1dFJlcGx5KGNvbnRlbnQsIHBhcmVudF9oZWFkZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIGFuZCB1bnJlZ2lzdGVyIHRoZSBmdXR1cmUuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5fc3RkaW4gPSBQcml2YXRlLm5vT3A7XG4gICAgICAgIHRoaXMuX2lvcHViID0gUHJpdmF0ZS5ub09wO1xuICAgICAgICB0aGlzLl9yZXBseSA9IFByaXZhdGUubm9PcDtcbiAgICAgICAgdGhpcy5faG9va3MgPSBudWxsO1xuICAgICAgICBpZiAoIXRoaXMuX3Rlc3RGbGFnKFByaXZhdGUuS2VybmVsRnV0dXJlRmxhZy5Jc0RvbmUpKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBVbmNvbW1lbnQgdGhlIGZvbGxvd2luZyBsb2dnaW5nIGNvZGUsIGFuZCBjaGVjayBmb3IgYW55IHRlc3RzIHRoYXQgdHJpZ2dlciBpdC5cbiAgICAgICAgICAgIC8vIGxldCBzdGF0dXMgPSBbXTtcbiAgICAgICAgICAgIC8vIGlmICghdGhpcy5fdGVzdEZsYWcoUHJpdmF0ZS5LZXJuZWxGdXR1cmVGbGFnLkdvdElkbGUpKSB7XG4gICAgICAgICAgICAvLyAgIHN0YXR1cy5wdXNoKCdpZGxlJyk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBpZiAoIXRoaXMuX3Rlc3RGbGFnKFByaXZhdGUuS2VybmVsRnV0dXJlRmxhZy5Hb3RSZXBseSkpIHtcbiAgICAgICAgICAgIC8vICAgc3RhdHVzLnB1c2goJ3JlcGx5Jyk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAvLyAgIGAqKioqKioqKioqKioqKiogRElTUE9TRUQgQkVGT1JFIERPTkU6IEske3RoaXMuX2tlcm5lbC5pZC5zbGljZShcbiAgICAgICAgICAgIC8vICAgICAwLFxuICAgICAgICAgICAgLy8gICAgIDZcbiAgICAgICAgICAgIC8vICAgKX0gTSR7dGhpcy5fbXNnLmhlYWRlci5tc2dfaWQuc2xpY2UoMCwgNil9IG1pc3NpbmcgJHtzdGF0dXMuam9pbignICcpfWBcbiAgICAgICAgICAgIC8vICk7XG4gICAgICAgICAgICAvLyBSZWplY3QgdGhlIGBkb25lYCBwcm9taXNlLCBidXQgY2F0Y2ggaXRzIGVycm9yIGhlcmUgaW4gY2FzZSBubyBvbmUgZWxzZVxuICAgICAgICAgICAgLy8gaXMgd2FpdGluZyBmb3IgdGhlIHByb21pc2UgdG8gcmVzb2x2ZS4gVGhpcyBwcmV2ZW50cyB0aGUgZXJyb3IgZnJvbVxuICAgICAgICAgICAgLy8gYmVpbmcgZGlzcGxheWVkIGluIHRoZSBjb25zb2xlLCBidXQgZG9lcyBub3QgcHJldmVudCBpdCBmcm9tIGJlaW5nXG4gICAgICAgICAgICAvLyBjYXVnaHQgYnkgYSBjbGllbnQgd2hvIGlzIHdhaXRpbmcgZm9yIGl0LlxuICAgICAgICAgICAgdGhpcy5fZG9uZS5wcm9taXNlLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvKiBuby1vcCAqL1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9kb25lLnJlamVjdChuZXcgRXJyb3IoYENhbmNlbGVkIGZ1dHVyZSBmb3IgJHt0aGlzLm1zZy5oZWFkZXIubXNnX3R5cGV9IG1lc3NhZ2UgYmVmb3JlIHJlcGxpZXMgd2VyZSBkb25lYCkpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGFuIGluY29taW5nIGtlcm5lbCBtZXNzYWdlLlxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZU1zZyhtc2cpIHtcbiAgICAgICAgc3dpdGNoIChtc2cuY2hhbm5lbCkge1xuICAgICAgICAgICAgY2FzZSAnY29udHJvbCc6XG4gICAgICAgICAgICBjYXNlICdzaGVsbCc6XG4gICAgICAgICAgICAgICAgaWYgKG1zZy5jaGFubmVsID09PSB0aGlzLm1zZy5jaGFubmVsICYmXG4gICAgICAgICAgICAgICAgICAgIG1zZy5wYXJlbnRfaGVhZGVyLm1zZ19pZCA9PT0gdGhpcy5tc2cuaGVhZGVyLm1zZ19pZCkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9oYW5kbGVSZXBseShtc2cpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3N0ZGluJzpcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9oYW5kbGVTdGRpbihtc2cpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaW9wdWInOlxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2hhbmRsZUlPUHViKG1zZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIF9oYW5kbGVSZXBseShtc2cpIHtcbiAgICAgICAgY29uc3QgcmVwbHkgPSB0aGlzLl9yZXBseTtcbiAgICAgICAgaWYgKHJlcGx5KSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YXdhaXQtcHJvbWlzZVxuICAgICAgICAgICAgYXdhaXQgcmVwbHkobXNnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZXBseU1zZyA9IG1zZztcbiAgICAgICAgdGhpcy5fc2V0RmxhZyhQcml2YXRlLktlcm5lbEZ1dHVyZUZsYWcuR290UmVwbHkpO1xuICAgICAgICBpZiAodGhpcy5fdGVzdEZsYWcoUHJpdmF0ZS5LZXJuZWxGdXR1cmVGbGFnLkdvdElkbGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVEb25lKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgX2hhbmRsZVN0ZGluKG1zZykge1xuICAgICAgICB0aGlzLl9rZXJuZWwuaGFzUGVuZGluZ0lucHV0ID0gdHJ1ZTtcbiAgICAgICAgY29uc3Qgc3RkaW4gPSB0aGlzLl9zdGRpbjtcbiAgICAgICAgaWYgKHN0ZGluKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YXdhaXQtcHJvbWlzZVxuICAgICAgICAgICAgYXdhaXQgc3RkaW4obXNnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBfaGFuZGxlSU9QdWIobXNnKSB7XG4gICAgICAgIGNvbnN0IHByb2Nlc3MgPSBhd2FpdCB0aGlzLl9ob29rcy5wcm9jZXNzKG1zZyk7XG4gICAgICAgIGNvbnN0IGlvcHViID0gdGhpcy5faW9wdWI7XG4gICAgICAgIGlmIChwcm9jZXNzICYmIGlvcHViKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YXdhaXQtcHJvbWlzZVxuICAgICAgICAgICAgYXdhaXQgaW9wdWIobXNnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoS2VybmVsTWVzc2FnZS5pc1N0YXR1c01zZyhtc2cpICYmXG4gICAgICAgICAgICBtc2cuY29udGVudC5leGVjdXRpb25fc3RhdGUgPT09ICdpZGxlJykge1xuICAgICAgICAgICAgdGhpcy5fc2V0RmxhZyhQcml2YXRlLktlcm5lbEZ1dHVyZUZsYWcuR290SWRsZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5fdGVzdEZsYWcoUHJpdmF0ZS5LZXJuZWxGdXR1cmVGbGFnLkdvdFJlcGx5KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZURvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfaGFuZGxlRG9uZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Rlc3RGbGFnKFByaXZhdGUuS2VybmVsRnV0dXJlRmxhZy5Jc0RvbmUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0RmxhZyhQcml2YXRlLktlcm5lbEZ1dHVyZUZsYWcuSXNEb25lKTtcbiAgICAgICAgdGhpcy5fZG9uZS5yZXNvbHZlKHRoaXMuX3JlcGx5TXNnKTtcbiAgICAgICAgaWYgKHRoaXMuX2Rpc3Bvc2VPbkRvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRlc3Qgd2hldGhlciB0aGUgZ2l2ZW4gZnV0dXJlIGZsYWcgaXMgc2V0LlxuICAgICAqL1xuICAgIF90ZXN0RmxhZyhmbGFnKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICByZXR1cm4gKHRoaXMuX3N0YXR1cyAmIGZsYWcpICE9PSAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGdpdmVuIGZ1dHVyZSBmbGFnLlxuICAgICAqL1xuICAgIF9zZXRGbGFnKGZsYWcpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIHRoaXMuX3N0YXR1cyB8PSBmbGFnO1xuICAgIH1cbn1cbmV4cG9ydHMuS2VybmVsRnV0dXJlSGFuZGxlciA9IEtlcm5lbEZ1dHVyZUhhbmRsZXI7XG5jbGFzcyBLZXJuZWxDb250cm9sRnV0dXJlSGFuZGxlciBleHRlbmRzIEtlcm5lbEZ1dHVyZUhhbmRsZXIge1xufVxuZXhwb3J0cy5LZXJuZWxDb250cm9sRnV0dXJlSGFuZGxlciA9IEtlcm5lbENvbnRyb2xGdXR1cmVIYW5kbGVyO1xuY2xhc3MgS2VybmVsU2hlbGxGdXR1cmVIYW5kbGVyIGV4dGVuZHMgS2VybmVsRnV0dXJlSGFuZGxlciB7XG59XG5leHBvcnRzLktlcm5lbFNoZWxsRnV0dXJlSGFuZGxlciA9IEtlcm5lbFNoZWxsRnV0dXJlSGFuZGxlcjtcbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogQSBuby1vcCBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBQcml2YXRlLm5vT3AgPSAoKSA9PiB7XG4gICAgICAgIC8qIG5vLW9wICovXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZWZlciBhIGNvbXB1dGF0aW9uLlxuICAgICAqXG4gICAgICogIyMjIyBOT1RFU1xuICAgICAqIFdlIGNhbid0IGp1c3QgdXNlIHJlcXVlc3RBbmltYXRpb25GcmFtZSBzaW5jZSBpdCBpcyBub3QgYXZhaWxhYmxlIGluIG5vZGUuXG4gICAgICogVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBmcm9tIFBob3NwaG9yOlxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9waG9zcGhvcmpzL3Bob3NwaG9yL2Jsb2IvZTg4ZTQzMjEyODliYjExOThmMzA5OGU3YmRhNDA3MzY1MDFmMmVkOC90ZXN0cy90ZXN0LW1lc3NhZ2luZy9zcmMvaW5kZXguc3BlYy50cyNMNjNcbiAgICAgKi9cbiAgICBjb25zdCBkZWZlciA9ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9rID0gdHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgcmV0dXJuIG9rID8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIDogc2V0SW1tZWRpYXRlO1xuICAgIH0pKCk7XG4gICAgY2xhc3MgSG9va0xpc3Qge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHRoaXMuX2hvb2tzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZ2lzdGVyIGEgaG9vay5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGhvb2sgLSBUaGUgY2FsbGJhY2sgdG8gcmVnaXN0ZXIuXG4gICAgICAgICAqL1xuICAgICAgICBhZGQoaG9vaykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoaG9vayk7XG4gICAgICAgICAgICB0aGlzLl9ob29rcy5wdXNoKGhvb2spO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgYSBob29rLCBpZiBpdCBleGlzdHMgaW4gdGhlIGhvb2sgbGlzdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGhvb2sgLSBUaGUgY2FsbGJhY2sgdG8gcmVtb3ZlLlxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlKGhvb2spIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faG9va3MuaW5kZXhPZihob29rKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faG9va3NbaW5kZXhdID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2hlZHVsZUNvbXBhY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUHJvY2VzcyBhIG1lc3NhZ2UgdGhyb3VnaCB0aGUgaG9va3MuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIGEgcHJvbWlzZSByZXNvbHZpbmcgdG8gZmFsc2UgaWYgYW55IGhvb2sgcmVzb2x2ZWQgYXMgZmFsc2UsXG4gICAgICAgICAqIG90aGVyd2lzZSB0cnVlXG4gICAgICAgICAqXG4gICAgICAgICAqICMjIyMgTm90ZXNcbiAgICAgICAgICogVGhlIG1vc3QgcmVjZW50bHkgcmVnaXN0ZXJlZCBob29rIGlzIHJ1biBmaXJzdC4gQSBob29rIGNhbiByZXR1cm4gYVxuICAgICAgICAgKiBib29sZWFuIG9yIGEgcHJvbWlzZSB0byBhIGJvb2xlYW4sIGluIHdoaWNoIGNhc2UgcHJvY2Vzc2luZyBwYXVzZXMgdW50aWxcbiAgICAgICAgICogdGhlIHByb21pc2UgaXMgZnVsZmlsbGVkLiBJZiBhIGhvb2sgcmV0dXJuIHZhbHVlIHJlc29sdmVzIHRvIGZhbHNlLCBhbnlcbiAgICAgICAgICogbGF0ZXIgaG9va3Mgd2lsbCBub3QgcnVuIGFuZCB0aGUgZnVuY3Rpb24gd2lsbCByZXR1cm4gYSBwcm9taXNlIHJlc29sdmluZ1xuICAgICAgICAgKiB0byBmYWxzZS4gSWYgYSBob29rIHRocm93cyBhbiBlcnJvciwgdGhlIGVycm9yIGlzIGxvZ2dlZCB0byB0aGUgY29uc29sZVxuICAgICAgICAgKiBhbmQgdGhlIG5leHQgaG9vayBpcyBydW4uIElmIGEgaG9vayBpcyByZWdpc3RlcmVkIGR1cmluZyB0aGUgaG9va1xuICAgICAgICAgKiBwcm9jZXNzaW5nLCBpdCB3aWxsIG5vdCBydW4gdW50aWwgdGhlIG5leHQgbWVzc2FnZS4gSWYgYSBob29rIGlzIHJlbW92ZWRcbiAgICAgICAgICogZHVyaW5nIHRoZSBob29rIHByb2Nlc3NpbmcsIGl0IHdpbGwgYmUgZGVhY3RpdmF0ZWQgaW1tZWRpYXRlbHkuXG4gICAgICAgICAqL1xuICAgICAgICBhc3luYyBwcm9jZXNzKG1zZykge1xuICAgICAgICAgICAgLy8gV2FpdCB1bnRpbCB3ZSBjYW4gc3RhcnQgYSBuZXcgcHJvY2VzcyBydW4uXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9wcm9jZXNzaW5nO1xuICAgICAgICAgICAgLy8gU3RhcnQgdGhlIG5leHQgcHJvY2VzcyBydW4uXG4gICAgICAgICAgICBjb25zdCBwcm9jZXNzaW5nID0gbmV3IGNvcmV1dGlsc18xLlByb21pc2VEZWxlZ2F0ZSgpO1xuICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc2luZyA9IHByb2Nlc3NpbmcucHJvbWlzZTtcbiAgICAgICAgICAgIGxldCBjb250aW51ZUhhbmRsaW5nO1xuICAgICAgICAgICAgLy8gQ2FsbCB0aGUgZW5kIGhvb2sgKG1vc3QgcmVjZW50bHktYWRkZWQpIGZpcnN0LiBTdGFydGluZyBhdCB0aGUgZW5kIGFsc29cbiAgICAgICAgICAgIC8vIGd1YXJhbnRlZXMgdGhhdCBob29rcyBhZGRlZCBkdXJpbmcgdGhlIHByb2Nlc3Npbmcgd2lsbCBub3QgYmUgcnVuIGluXG4gICAgICAgICAgICAvLyB0aGlzIHByb2Nlc3MgcnVuLlxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2hvb2tzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaG9vayA9IHRoaXMuX2hvb2tzW2ldO1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBob29rIGhhcyBiZWVuIHJlbW92ZWQsIGNvbnRpbnVlIHRvIHRoZSBuZXh0IG9uZS5cbiAgICAgICAgICAgICAgICBpZiAoaG9vayA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSB0aGUgaG9vayBhbmQgbG9nIGFueSBlcnJvcnMuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmF3YWl0LXByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVIYW5kbGluZyA9IGF3YWl0IGhvb2sobXNnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZUhhbmRsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgaG9vayByZXNvbHZlZCB0byBmYWxzZSwgc3RvcCBwcm9jZXNzaW5nIGFuZCByZXR1cm4uXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRpbnVlSGFuZGxpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NpbmcucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQWxsIGhvb2tzIHJldHVybmVkIHRydWUgKG9yIGVycm9yZWQgb3V0KSwgc28gcmV0dXJuIHRydWUuXG4gICAgICAgICAgICBwcm9jZXNzaW5nLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTY2hlZHVsZSBhIGNsZWFudXAgb2YgdGhlIGxpc3QsIHJlbW92aW5nIGFueSBob29rcyB0aGF0IGhhdmUgYmVlbiBudWxsZWQgb3V0LlxuICAgICAgICAgKi9cbiAgICAgICAgX3NjaGVkdWxlQ29tcGFjdCgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fY29tcGFjdFNjaGVkdWxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBhY3RTY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIFNjaGVkdWxlIGEgY29tcGFjdGlvbiBpbiBiZXR3ZWVuIHByb2Nlc3NpbmcgcnVucy4gV2UgZG8gdGhlXG4gICAgICAgICAgICAgICAgLy8gc2NoZWR1bGluZyBpbiBhbiBhbmltYXRpb24gZnJhbWUgdG8gcmF0ZS1saW1pdCBvdXIgY29tcGFjdGlvbnMuIElmIHdlXG4gICAgICAgICAgICAgICAgLy8gbmVlZCB0byBjb21wYWN0IG1vcmUgZnJlcXVlbnRseSwgd2UgY2FuIGNoYW5nZSB0aGlzIHRvIGRpcmVjdGx5XG4gICAgICAgICAgICAgICAgLy8gc2NoZWR1bGUgdGhlIGNvbXBhY3Rpb24uXG4gICAgICAgICAgICAgICAgZGVmZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9jZXNzaW5nID0gdGhpcy5fcHJvY2Vzc2luZy50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBhY3RTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBhY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbXBhY3QgdGhlIGxpc3QsIHJlbW92aW5nIGFueSBudWxscy5cbiAgICAgICAgICovXG4gICAgICAgIF9jb21wYWN0KCkge1xuICAgICAgICAgICAgbGV0IG51bU51bGxzID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLl9ob29rcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhvb2sgPSB0aGlzLl9ob29rc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faG9va3NbaV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbnVtTnVsbHMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hvb2tzW2kgLSBudW1OdWxsc10gPSBob29rO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2hvb2tzLmxlbmd0aCAtPSBudW1OdWxscztcbiAgICAgICAgfVxuICAgIH1cbiAgICBQcml2YXRlLkhvb2tMaXN0ID0gSG9va0xpc3Q7XG4gICAgLyoqXG4gICAgICogQml0IGZsYWdzIGZvciB0aGUga2VybmVsIGZ1dHVyZSBzdGF0ZS5cbiAgICAgKi9cbiAgICBsZXQgS2VybmVsRnV0dXJlRmxhZztcbiAgICAoZnVuY3Rpb24gKEtlcm5lbEZ1dHVyZUZsYWcpIHtcbiAgICAgICAgS2VybmVsRnV0dXJlRmxhZ1tLZXJuZWxGdXR1cmVGbGFnW1wiR290UmVwbHlcIl0gPSAxXSA9IFwiR290UmVwbHlcIjtcbiAgICAgICAgS2VybmVsRnV0dXJlRmxhZ1tLZXJuZWxGdXR1cmVGbGFnW1wiR290SWRsZVwiXSA9IDJdID0gXCJHb3RJZGxlXCI7XG4gICAgICAgIEtlcm5lbEZ1dHVyZUZsYWdbS2VybmVsRnV0dXJlRmxhZ1tcIklzRG9uZVwiXSA9IDRdID0gXCJJc0RvbmVcIjtcbiAgICAgICAgS2VybmVsRnV0dXJlRmxhZ1tLZXJuZWxGdXR1cmVGbGFnW1wiRGlzcG9zZU9uRG9uZVwiXSA9IDhdID0gXCJEaXNwb3NlT25Eb25lXCI7XG4gICAgfSkoS2VybmVsRnV0dXJlRmxhZyA9IFByaXZhdGUuS2VybmVsRnV0dXJlRmxhZyB8fCAoUHJpdmF0ZS5LZXJuZWxGdXR1cmVGbGFnID0ge30pKTtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnV0dXJlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5LZXJuZWxDb25uZWN0aW9uID0gZXhwb3J0cy5LZXJuZWxBUEkgPSBleHBvcnRzLktlcm5lbE1lc3NhZ2UgPSBleHBvcnRzLktlcm5lbCA9IHZvaWQgMDtcbi8vIE5hbWVzcGFjZSBzb21lIG9mIG91ciBtb2R1bGVzIGZvciBjb252ZW5pZW5jZSBhbmQgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG5jb25zdCBLZXJuZWwgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4va2VybmVsXCIpKTtcbmV4cG9ydHMuS2VybmVsID0gS2VybmVsO1xuY29uc3QgS2VybmVsTWVzc2FnZSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9tZXNzYWdlc1wiKSk7XG5leHBvcnRzLktlcm5lbE1lc3NhZ2UgPSBLZXJuZWxNZXNzYWdlO1xuY29uc3QgS2VybmVsQVBJID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3Jlc3RhcGlcIikpO1xuZXhwb3J0cy5LZXJuZWxBUEkgPSBLZXJuZWxBUEk7XG5jb25zdCBkZWZhdWx0XzEgPSByZXF1aXJlKFwiLi9kZWZhdWx0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiS2VybmVsQ29ubmVjdGlvblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZGVmYXVsdF8xLktlcm5lbENvbm5lY3Rpb247IH0gfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vbWFuYWdlclwiKSwgZXhwb3J0cyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWtlcm5lbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuS2VybmVsTWFuYWdlciA9IHZvaWQgMDtcbmNvbnN0IGFsZ29yaXRobV8xID0gcmVxdWlyZShcIkBsdW1pbm8vYWxnb3JpdGhtXCIpO1xuY29uc3QgcG9sbGluZ18xID0gcmVxdWlyZShcIkBsdW1pbm8vcG9sbGluZ1wiKTtcbmNvbnN0IHNpZ25hbGluZ18xID0gcmVxdWlyZShcIkBsdW1pbm8vc2lnbmFsaW5nXCIpO1xuY29uc3QgX18xID0gcmVxdWlyZShcIi4uXCIpO1xuY29uc3QgYmFzZW1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuLi9iYXNlbWFuYWdlclwiKTtcbmNvbnN0IHJlc3RhcGlfMSA9IHJlcXVpcmUoXCIuL3Jlc3RhcGlcIik7XG5jb25zdCBkZWZhdWx0XzEgPSByZXF1aXJlKFwiLi9kZWZhdWx0XCIpO1xuLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiBhIGtlcm5lbCBtYW5hZ2VyLlxuICovXG5jbGFzcyBLZXJuZWxNYW5hZ2VyIGV4dGVuZHMgYmFzZW1hbmFnZXJfMS5CYXNlTWFuYWdlciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IGtlcm5lbCBtYW5hZ2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgZGVmYXVsdCBvcHRpb25zIGZvciBrZXJuZWwuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2lzUmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fa2VybmVsQ29ubmVjdGlvbnMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuX21vZGVscyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fcnVubmluZ0NoYW5nZWQgPSBuZXcgc2lnbmFsaW5nXzEuU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9jb25uZWN0aW9uRmFpbHVyZSA9IG5ldyBzaWduYWxpbmdfMS5TaWduYWwodGhpcyk7XG4gICAgICAgIC8vIFN0YXJ0IG1vZGVsIGFuZCBzcGVjcyBwb2xsaW5nIHdpdGggZXhwb25lbnRpYWwgYmFja29mZi5cbiAgICAgICAgdGhpcy5fcG9sbE1vZGVscyA9IG5ldyBwb2xsaW5nXzEuUG9sbCh7XG4gICAgICAgICAgICBhdXRvOiBmYWxzZSxcbiAgICAgICAgICAgIGZhY3Rvcnk6ICgpID0+IHRoaXMucmVxdWVzdFJ1bm5pbmcoKSxcbiAgICAgICAgICAgIGZyZXF1ZW5jeToge1xuICAgICAgICAgICAgICAgIGludGVydmFsOiAxMCAqIDEwMDAsXG4gICAgICAgICAgICAgICAgYmFja29mZjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtYXg6IDMwMCAqIDEwMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYW1lOiBgQGp1cHl0ZXJsYWIvc2VydmljZXM6S2VybmVsTWFuYWdlciNtb2RlbHNgLFxuICAgICAgICAgICAgc3RhbmRieTogKF9hID0gb3B0aW9ucy5zdGFuZGJ5KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnd2hlbi1oaWRkZW4nXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBJbml0aWFsaXplIGludGVybmFsIGRhdGEuXG4gICAgICAgIHRoaXMuX3JlYWR5ID0gKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3BvbGxNb2RlbHMuc3RhcnQoKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3BvbGxNb2RlbHMudGljaztcbiAgICAgICAgICAgIHRoaXMuX2lzUmVhZHkgPSB0cnVlO1xuICAgICAgICB9KSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUZXN0IHdoZXRoZXIgdGhlIG1hbmFnZXIgaXMgcmVhZHkuXG4gICAgICovXG4gICAgZ2V0IGlzUmVhZHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1JlYWR5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdGhhdCBmdWxmaWxscyB3aGVuIHRoZSBtYW5hZ2VyIGlzIHJlYWR5LlxuICAgICAqL1xuICAgIGdldCByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWR5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIHJ1bm5pbmcga2VybmVscyBjaGFuZ2UuXG4gICAgICovXG4gICAgZ2V0IHJ1bm5pbmdDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcnVubmluZ0NoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGVyZSBpcyBhIGNvbm5lY3Rpb24gZmFpbHVyZS5cbiAgICAgKi9cbiAgICBnZXQgY29ubmVjdGlvbkZhaWx1cmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25uZWN0aW9uRmFpbHVyZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIG1hbmFnZXIuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21vZGVscy5jbGVhcigpO1xuICAgICAgICB0aGlzLl9rZXJuZWxDb25uZWN0aW9ucy5mb3JFYWNoKHggPT4geC5kaXNwb3NlKCkpO1xuICAgICAgICB0aGlzLl9wb2xsTW9kZWxzLmRpc3Bvc2UoKTtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb25uZWN0IHRvIGFuIGV4aXN0aW5nIGtlcm5lbC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXcga2VybmVsIGNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyB3aWxsIHVzZSB0aGUgbWFuYWdlcidzIHNlcnZlciBzZXR0aW5ncyBhbmQgaWdub3JlIGFueSBzZXJ2ZXJcbiAgICAgKiBzZXR0aW5ncyBwYXNzZWQgaW4gdGhlIG9wdGlvbnMuXG4gICAgICovXG4gICAgY29ubmVjdFRvKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCB7IGlkIH0gPSBvcHRpb25zLm1vZGVsO1xuICAgICAgICBsZXQgaGFuZGxlQ29tbXMgPSAoX2EgPSBvcHRpb25zLmhhbmRsZUNvbW1zKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB0cnVlO1xuICAgICAgICAvLyBCeSBkZWZhdWx0LCBoYW5kbGUgY29tbXMgb25seSBpZiBubyBvdGhlciBrZXJuZWwgY29ubmVjdGlvbiBpcy5cbiAgICAgICAgaWYgKG9wdGlvbnMuaGFuZGxlQ29tbXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrYyBvZiB0aGlzLl9rZXJuZWxDb25uZWN0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChrYy5pZCA9PT0gaWQgJiYga2MuaGFuZGxlQ29tbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlQ29tbXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGtlcm5lbENvbm5lY3Rpb24gPSBuZXcgZGVmYXVsdF8xLktlcm5lbENvbm5lY3Rpb24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHsgaGFuZGxlQ29tbXMgfSwgb3B0aW9ucyksIHsgc2VydmVyU2V0dGluZ3M6IHRoaXMuc2VydmVyU2V0dGluZ3MgfSkpO1xuICAgICAgICB0aGlzLl9vblN0YXJ0ZWQoa2VybmVsQ29ubmVjdGlvbik7XG4gICAgICAgIGlmICghdGhpcy5fbW9kZWxzLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIC8vIFdlIHRydXN0IHRoZSB1c2VyIHRvIGNvbm5lY3QgdG8gYW4gZXhpc3Rpbmcga2VybmVsLCBidXQgd2UgdmVyaWZ5XG4gICAgICAgICAgICAvLyBhc3luY2hyb25vdXNseS5cbiAgICAgICAgICAgIHZvaWQgdGhpcy5yZWZyZXNoUnVubmluZygpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvKiBuby1vcCAqL1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtlcm5lbENvbm5lY3Rpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBpdGVyYXRvciBvdmVyIHRoZSBtb3N0IHJlY2VudCBydW5uaW5nIGtlcm5lbHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIG5ldyBpdGVyYXRvciBvdmVyIHRoZSBydW5uaW5nIGtlcm5lbHMuXG4gICAgICovXG4gICAgcnVubmluZygpIHtcbiAgICAgICAgcmV0dXJuIGFsZ29yaXRobV8xLml0ZXIoWy4uLnRoaXMuX21vZGVscy52YWx1ZXMoKV0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGb3JjZSBhIHJlZnJlc2ggb2YgdGhlIHJ1bm5pbmcga2VybmVscy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHJ1bm5pbmcgbGlzdCBoYXMgYmVlbiByZWZyZXNoZWQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBpcyBub3QgdHlwaWNhbGx5IG1lYW50IHRvIGJlIGNhbGxlZCBieSB0aGUgdXNlciwgc2luY2UgdGhlXG4gICAgICogbWFuYWdlciBtYWludGFpbnMgaXRzIG93biBpbnRlcm5hbCBzdGF0ZS5cbiAgICAgKi9cbiAgICBhc3luYyByZWZyZXNoUnVubmluZygpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fcG9sbE1vZGVscy5yZWZyZXNoKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuX3BvbGxNb2RlbHMudGljaztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnQgYSBuZXcga2VybmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZWF0ZU9wdGlvbnMgLSBUaGUga2VybmVsIGNyZWF0aW9uIG9wdGlvbnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb25uZWN0T3B0aW9ucyAtIFRoZSBrZXJuZWwgY29ubmVjdGlvbiBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBrZXJuZWwgY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgbWFuYWdlciBgc2VydmVyU2V0dGluZ3NgIHdpbGwgYmUgYWx3YXlzIGJlIHVzZWQuXG4gICAgICovXG4gICAgYXN5bmMgc3RhcnROZXcoY3JlYXRlT3B0aW9ucyA9IHt9LCBjb25uZWN0T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gYXdhaXQgcmVzdGFwaV8xLnN0YXJ0TmV3KGNyZWF0ZU9wdGlvbnMsIHRoaXMuc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0VG8oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjb25uZWN0T3B0aW9ucyksIHsgbW9kZWwgfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaHV0IGRvd24gYSBrZXJuZWwgYnkgaWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgLSBUaGUgaWQgb2YgdGhlIHRhcmdldCBrZXJuZWwuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBvcGVyYXRpb24gaXMgY29tcGxldGUuXG4gICAgICovXG4gICAgYXN5bmMgc2h1dGRvd24oaWQpIHtcbiAgICAgICAgYXdhaXQgcmVzdGFwaV8xLnNodXRkb3duS2VybmVsKGlkLCB0aGlzLnNlcnZlclNldHRpbmdzKTtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoUnVubmluZygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaHV0IGRvd24gYWxsIGtlcm5lbHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIGFsbCBvZiB0aGUga2VybmVscyBhcmUgc2h1dCBkb3duLlxuICAgICAqL1xuICAgIGFzeW5jIHNodXRkb3duQWxsKCkge1xuICAgICAgICAvLyBVcGRhdGUgdGhlIGxpc3Qgb2YgbW9kZWxzIHRvIG1ha2Ugc3VyZSBvdXIgbGlzdCBpcyBjdXJyZW50LlxuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2hSdW5uaW5nKCk7XG4gICAgICAgIC8vIFNodXQgZG93biBhbGwgbW9kZWxzLlxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbLi4udGhpcy5fbW9kZWxzLmtleXMoKV0ubWFwKGlkID0+IHJlc3RhcGlfMS5zaHV0ZG93bktlcm5lbChpZCwgdGhpcy5zZXJ2ZXJTZXR0aW5ncykpKTtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBsaXN0IG9mIG1vZGVscyB0byBjbGVhciBvdXQgb3VyIHN0YXRlLlxuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2hSdW5uaW5nKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmQgYSBrZXJuZWwgYnkgaWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgLSBUaGUgaWQgb2YgdGhlIHRhcmdldCBrZXJuZWwuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBrZXJuZWwncyBtb2RlbC5cbiAgICAgKi9cbiAgICBhc3luYyBmaW5kQnlJZChpZCkge1xuICAgICAgICBpZiAodGhpcy5fbW9kZWxzLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb2RlbHMuZ2V0KGlkKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2hSdW5uaW5nKCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlbHMuZ2V0KGlkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXhlY3V0ZSBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB0byBwb2xsIHJ1bm5pbmcga2VybmVscyBhbmQgdXBkYXRlIHN0YXRlLlxuICAgICAqL1xuICAgIGFzeW5jIHJlcXVlc3RSdW5uaW5nKCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBsZXQgbW9kZWxzO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbW9kZWxzID0gYXdhaXQgcmVzdGFwaV8xLmxpc3RSdW5uaW5nKHRoaXMuc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBuZXR3b3JrIGVycm9ycywgYXMgd2VsbCBhcyBjYXNlcyB3aGVyZSB3ZSBhcmUgb24gYVxuICAgICAgICAgICAgLy8gSnVweXRlckh1YiBhbmQgdGhlIHNlcnZlciBpcyBub3QgcnVubmluZy4gSnVweXRlckh1YiByZXR1cm5zIGFcbiAgICAgICAgICAgIC8vIDUwMyAoPDIuMCkgb3IgNDI0ICg+Mi4wKSBpbiB0aGF0IGNhc2UuXG4gICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgX18xLlNlcnZlckNvbm5lY3Rpb24uTmV0d29ya0Vycm9yIHx8XG4gICAgICAgICAgICAgICAgKChfYSA9IGVyci5yZXNwb25zZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnN0YXR1cykgPT09IDUwMyB8fFxuICAgICAgICAgICAgICAgICgoX2IgPSBlcnIucmVzcG9uc2UpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zdGF0dXMpID09PSA0MjQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9uRmFpbHVyZS5lbWl0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9tb2RlbHMuc2l6ZSA9PT0gbW9kZWxzLmxlbmd0aCAmJlxuICAgICAgICAgICAgYWxnb3JpdGhtXzEuZXZlcnkobW9kZWxzLCB4ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBleGlzdGluZyA9IHRoaXMuX21vZGVscy5nZXQoeC5pZCk7XG4gICAgICAgICAgICAgICAgaWYgKCFleGlzdGluZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBleGlzdGluZy5uYW1lID09PSB4Lm5hbWU7XG4gICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgLy8gSWRlbnRpY2FsIG1vZGVscyBsaXN0IChwcmVzdW1pbmcgbW9kZWxzIGRvZXMgbm90IGNvbnRhaW4gZHVwbGljYXRlXG4gICAgICAgICAgICAvLyBpZHMpLCBzbyBqdXN0IHJldHVyblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21vZGVscyA9IG5ldyBNYXAobW9kZWxzLm1hcCh4ID0+IFt4LmlkLCB4XSkpO1xuICAgICAgICAvLyBGb3IgYW55IGtlcm5lbCBjb25uZWN0aW9uIHRvIGEga2VybmVsIHRoYXQgZG9lc24ndCBleGlzdCwgbm90aWZ5IGl0IG9mXG4gICAgICAgIC8vIHRoZSBzaHV0ZG93bi5cbiAgICAgICAgdGhpcy5fa2VybmVsQ29ubmVjdGlvbnMuZm9yRWFjaChrYyA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX21vZGVscy5oYXMoa2MuaWQpKSB7XG4gICAgICAgICAgICAgICAga2MuaGFuZGxlU2h1dGRvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3J1bm5pbmdDaGFuZ2VkLmVtaXQobW9kZWxzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEga2VybmVsIHN0YXJ0aW5nLlxuICAgICAqL1xuICAgIF9vblN0YXJ0ZWQoa2VybmVsQ29ubmVjdGlvbikge1xuICAgICAgICB0aGlzLl9rZXJuZWxDb25uZWN0aW9ucy5hZGQoa2VybmVsQ29ubmVjdGlvbik7XG4gICAgICAgIGtlcm5lbENvbm5lY3Rpb24uc3RhdHVzQ2hhbmdlZC5jb25uZWN0KHRoaXMuX29uU3RhdHVzQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIGtlcm5lbENvbm5lY3Rpb24uZGlzcG9zZWQuY29ubmVjdCh0aGlzLl9vbkRpc3Bvc2VkLCB0aGlzKTtcbiAgICB9XG4gICAgX29uRGlzcG9zZWQoa2VybmVsQ29ubmVjdGlvbikge1xuICAgICAgICB0aGlzLl9rZXJuZWxDb25uZWN0aW9ucy5kZWxldGUoa2VybmVsQ29ubmVjdGlvbik7XG4gICAgICAgIC8vIEEgZGlzcG9zZSBlbWlzc2lvbiBjb3VsZCBtZWFuIHRoZSBzZXJ2ZXIgc2Vzc2lvbiBpcyBkZWxldGVkLCBvciB0aGF0XG4gICAgICAgIC8vIHRoZSBrZXJuZWwgSlMgb2JqZWN0IGlzIGRpc3Bvc2VkIGFuZCB0aGUga2VybmVsIHN0aWxsIGV4aXN0cyBvbiB0aGVcbiAgICAgICAgLy8gc2VydmVyLCBzbyB3ZSByZWZyZXNoIGZyb20gdGhlIHNlcnZlciB0byBtYWtlIHN1cmUgd2UgcmVmbGVjdCB0aGVcbiAgICAgICAgLy8gc2VydmVyIHN0YXRlLlxuICAgICAgICB2b2lkIHRoaXMucmVmcmVzaFJ1bm5pbmcoKS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAvKiBuby1vcCAqL1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX29uU3RhdHVzQ2hhbmdlZChrZXJuZWxDb25uZWN0aW9uLCBzdGF0dXMpIHtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2RlYWQnKSB7XG4gICAgICAgICAgICAvLyBXZSBhc3luY2hyb25vdXNseSB1cGRhdGUgb3VyIGxpc3Qgb2Yga2VybmVscywgd2hpY2ggYXN5bmNocm9ub3VzbHlcbiAgICAgICAgICAgIC8vIHdpbGwgZGlzcG9zZSB0aGVtLiBXZSBkbyBub3Qgd2FudCB0byBpbW1lZGlhdGVseSBkaXNwb3NlIHRoZW0gYmVjYXVzZVxuICAgICAgICAgICAgLy8gdGhlcmUgbWF5IGJlIG90aGVyIHNpZ25hbCBoYW5kbGVycyB0aGF0IHdhbnQgdG8gYmUgY2FsbGVkLlxuICAgICAgICAgICAgdm9pZCB0aGlzLnJlZnJlc2hSdW5uaW5nKCkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8qIG5vLW9wICovXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuS2VybmVsTWFuYWdlciA9IEtlcm5lbE1hbmFnZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYW5hZ2VyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc0lucHV0UmVwbHlNc2cgPSBleHBvcnRzLmlzSW5wdXRSZXF1ZXN0TXNnID0gZXhwb3J0cy5pc0RlYnVnUmVwbHlNc2cgPSBleHBvcnRzLmlzRGVidWdSZXF1ZXN0TXNnID0gZXhwb3J0cy5pc0V4ZWN1dGVSZXBseU1zZyA9IGV4cG9ydHMuaXNJbmZvUmVxdWVzdE1zZyA9IGV4cG9ydHMuaXNDb21tTXNnTXNnID0gZXhwb3J0cy5pc0NvbW1DbG9zZU1zZyA9IGV4cG9ydHMuaXNDb21tT3Blbk1zZyA9IGV4cG9ydHMuaXNEZWJ1Z0V2ZW50TXNnID0gZXhwb3J0cy5pc0NsZWFyT3V0cHV0TXNnID0gZXhwb3J0cy5pc1N0YXR1c01zZyA9IGV4cG9ydHMuaXNFcnJvck1zZyA9IGV4cG9ydHMuaXNFeGVjdXRlUmVzdWx0TXNnID0gZXhwb3J0cy5pc0V4ZWN1dGVJbnB1dE1zZyA9IGV4cG9ydHMuaXNVcGRhdGVEaXNwbGF5RGF0YU1zZyA9IGV4cG9ydHMuaXNEaXNwbGF5RGF0YU1zZyA9IGV4cG9ydHMuaXNTdHJlYW1Nc2cgPSBleHBvcnRzLmNyZWF0ZU1lc3NhZ2UgPSB2b2lkIDA7XG5jb25zdCBjb3JldXRpbHNfMSA9IHJlcXVpcmUoXCJAbHVtaW5vL2NvcmV1dGlsc1wiKTtcbmZ1bmN0aW9uIGNyZWF0ZU1lc3NhZ2Uob3B0aW9ucykge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2U7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYnVmZmVyczogKF9hID0gb3B0aW9ucy5idWZmZXJzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXSxcbiAgICAgICAgY2hhbm5lbDogb3B0aW9ucy5jaGFubmVsLFxuICAgICAgICBjb250ZW50OiBvcHRpb25zLmNvbnRlbnQsXG4gICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgbXNnX2lkOiAoX2IgPSBvcHRpb25zLm1zZ0lkKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBjb3JldXRpbHNfMS5VVUlELnV1aWQ0KCksXG4gICAgICAgICAgICBtc2dfdHlwZTogb3B0aW9ucy5tc2dUeXBlLFxuICAgICAgICAgICAgc2Vzc2lvbjogb3B0aW9ucy5zZXNzaW9uLFxuICAgICAgICAgICAgdXNlcm5hbWU6IChfYyA9IG9wdGlvbnMudXNlcm5hbWUpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6ICcnLFxuICAgICAgICAgICAgdmVyc2lvbjogJzUuMidcbiAgICAgICAgfSxcbiAgICAgICAgbWV0YWRhdGE6IChfZCA9IG9wdGlvbnMubWV0YWRhdGEpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IHt9LFxuICAgICAgICBwYXJlbnRfaGVhZGVyOiAoX2UgPSBvcHRpb25zLnBhcmVudEhlYWRlcikgIT09IG51bGwgJiYgX2UgIT09IHZvaWQgMCA/IF9lIDoge31cbiAgICB9O1xufVxuZXhwb3J0cy5jcmVhdGVNZXNzYWdlID0gY3JlYXRlTWVzc2FnZTtcbi8qKlxuICogVGVzdCB3aGV0aGVyIGEga2VybmVsIG1lc3NhZ2UgaXMgYSBgJ3N0cmVhbSdgIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtTXNnKG1zZykge1xuICAgIHJldHVybiBtc2cuaGVhZGVyLm1zZ190eXBlID09PSAnc3RyZWFtJztcbn1cbmV4cG9ydHMuaXNTdHJlYW1Nc2cgPSBpc1N0cmVhbU1zZztcbi8qKlxuICogVGVzdCB3aGV0aGVyIGEga2VybmVsIG1lc3NhZ2UgaXMgYW4gYCdkaXNwbGF5X2RhdGEnYCBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBpc0Rpc3BsYXlEYXRhTXNnKG1zZykge1xuICAgIHJldHVybiBtc2cuaGVhZGVyLm1zZ190eXBlID09PSAnZGlzcGxheV9kYXRhJztcbn1cbmV4cG9ydHMuaXNEaXNwbGF5RGF0YU1zZyA9IGlzRGlzcGxheURhdGFNc2c7XG4vKipcbiAqIFRlc3Qgd2hldGhlciBhIGtlcm5lbCBtZXNzYWdlIGlzIGFuIGAndXBkYXRlX2Rpc3BsYXlfZGF0YSdgIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIGlzVXBkYXRlRGlzcGxheURhdGFNc2cobXNnKSB7XG4gICAgcmV0dXJuIG1zZy5oZWFkZXIubXNnX3R5cGUgPT09ICd1cGRhdGVfZGlzcGxheV9kYXRhJztcbn1cbmV4cG9ydHMuaXNVcGRhdGVEaXNwbGF5RGF0YU1zZyA9IGlzVXBkYXRlRGlzcGxheURhdGFNc2c7XG4vKipcbiAqIFRlc3Qgd2hldGhlciBhIGtlcm5lbCBtZXNzYWdlIGlzIGFuIGAnZXhlY3V0ZV9pbnB1dCdgIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIGlzRXhlY3V0ZUlucHV0TXNnKG1zZykge1xuICAgIHJldHVybiBtc2cuaGVhZGVyLm1zZ190eXBlID09PSAnZXhlY3V0ZV9pbnB1dCc7XG59XG5leHBvcnRzLmlzRXhlY3V0ZUlucHV0TXNnID0gaXNFeGVjdXRlSW5wdXRNc2c7XG4vKipcbiAqIFRlc3Qgd2hldGhlciBhIGtlcm5lbCBtZXNzYWdlIGlzIGFuIGAnZXhlY3V0ZV9yZXN1bHQnYCBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBpc0V4ZWN1dGVSZXN1bHRNc2cobXNnKSB7XG4gICAgcmV0dXJuIG1zZy5oZWFkZXIubXNnX3R5cGUgPT09ICdleGVjdXRlX3Jlc3VsdCc7XG59XG5leHBvcnRzLmlzRXhlY3V0ZVJlc3VsdE1zZyA9IGlzRXhlY3V0ZVJlc3VsdE1zZztcbi8qKlxuICogVGVzdCB3aGV0aGVyIGEga2VybmVsIG1lc3NhZ2UgaXMgYW4gYCdlcnJvcidgIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIGlzRXJyb3JNc2cobXNnKSB7XG4gICAgcmV0dXJuIG1zZy5oZWFkZXIubXNnX3R5cGUgPT09ICdlcnJvcic7XG59XG5leHBvcnRzLmlzRXJyb3JNc2cgPSBpc0Vycm9yTXNnO1xuLyoqXG4gKiBUZXN0IHdoZXRoZXIgYSBrZXJuZWwgbWVzc2FnZSBpcyBhIGAnc3RhdHVzJ2AgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gaXNTdGF0dXNNc2cobXNnKSB7XG4gICAgcmV0dXJuIG1zZy5oZWFkZXIubXNnX3R5cGUgPT09ICdzdGF0dXMnO1xufVxuZXhwb3J0cy5pc1N0YXR1c01zZyA9IGlzU3RhdHVzTXNnO1xuLyoqXG4gKiBUZXN0IHdoZXRoZXIgYSBrZXJuZWwgbWVzc2FnZSBpcyBhIGAnY2xlYXJfb3V0cHV0J2AgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gaXNDbGVhck91dHB1dE1zZyhtc2cpIHtcbiAgICByZXR1cm4gbXNnLmhlYWRlci5tc2dfdHlwZSA9PT0gJ2NsZWFyX291dHB1dCc7XG59XG5leHBvcnRzLmlzQ2xlYXJPdXRwdXRNc2cgPSBpc0NsZWFyT3V0cHV0TXNnO1xuLyoqXG4gKiBUZXN0IHdoZXRoZXIgYSBrZXJuZWwgbWVzc2FnZSBpcyBhbiBleHBlcmltZW50YWwgYCdkZWJ1Z19ldmVudCdgIG1lc3NhZ2UuXG4gKlxuICogQGhpZGRlblxuICpcbiAqICMjIyMgTm90ZXNcbiAqIERlYnVnIG1lc3NhZ2VzIGFyZSBleHBlcmltZW50YWwgbWVzc2FnZXMgdGhhdCBhcmUgbm90IGluIHRoZSBvZmZpY2lhbFxuICoga2VybmVsIG1lc3NhZ2Ugc3BlY2lmaWNhdGlvbi4gQXMgc3VjaCwgdGhpcyBpcyAqTk9UKiBjb25zaWRlcmVkXG4gKiBwYXJ0IG9mIHRoZSBwdWJsaWMgQVBJLCBhbmQgbWF5IGNoYW5nZSB3aXRob3V0IG5vdGljZS5cbiAqL1xuZnVuY3Rpb24gaXNEZWJ1Z0V2ZW50TXNnKG1zZykge1xuICAgIHJldHVybiBtc2cuaGVhZGVyLm1zZ190eXBlID09PSAnZGVidWdfZXZlbnQnO1xufVxuZXhwb3J0cy5pc0RlYnVnRXZlbnRNc2cgPSBpc0RlYnVnRXZlbnRNc2c7XG4vKipcbiAqIFRlc3Qgd2hldGhlciBhIGtlcm5lbCBtZXNzYWdlIGlzIGEgYCdjb21tX29wZW4nYCBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBpc0NvbW1PcGVuTXNnKG1zZykge1xuICAgIHJldHVybiBtc2cuaGVhZGVyLm1zZ190eXBlID09PSAnY29tbV9vcGVuJztcbn1cbmV4cG9ydHMuaXNDb21tT3Blbk1zZyA9IGlzQ29tbU9wZW5Nc2c7XG4vKipcbiAqIFRlc3Qgd2hldGhlciBhIGtlcm5lbCBtZXNzYWdlIGlzIGEgYCdjb21tX2Nsb3NlJ2AgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gaXNDb21tQ2xvc2VNc2cobXNnKSB7XG4gICAgcmV0dXJuIG1zZy5oZWFkZXIubXNnX3R5cGUgPT09ICdjb21tX2Nsb3NlJztcbn1cbmV4cG9ydHMuaXNDb21tQ2xvc2VNc2cgPSBpc0NvbW1DbG9zZU1zZztcbi8qKlxuICogVGVzdCB3aGV0aGVyIGEga2VybmVsIG1lc3NhZ2UgaXMgYSBgJ2NvbW1fbXNnJ2AgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gaXNDb21tTXNnTXNnKG1zZykge1xuICAgIHJldHVybiBtc2cuaGVhZGVyLm1zZ190eXBlID09PSAnY29tbV9tc2cnO1xufVxuZXhwb3J0cy5pc0NvbW1Nc2dNc2cgPSBpc0NvbW1Nc2dNc2c7XG4vKipcbiAqIFRlc3Qgd2hldGhlciBhIGtlcm5lbCBtZXNzYWdlIGlzIGEgYCdrZXJuZWxfaW5mb19yZXF1ZXN0J2AgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gaXNJbmZvUmVxdWVzdE1zZyhtc2cpIHtcbiAgICByZXR1cm4gbXNnLmhlYWRlci5tc2dfdHlwZSA9PT0gJ2tlcm5lbF9pbmZvX3JlcXVlc3QnO1xufVxuZXhwb3J0cy5pc0luZm9SZXF1ZXN0TXNnID0gaXNJbmZvUmVxdWVzdE1zZztcbi8qKlxuICogVGVzdCB3aGV0aGVyIGEga2VybmVsIG1lc3NhZ2UgaXMgYW4gYCdleGVjdXRlX3JlcGx5J2AgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gaXNFeGVjdXRlUmVwbHlNc2cobXNnKSB7XG4gICAgcmV0dXJuIG1zZy5oZWFkZXIubXNnX3R5cGUgPT09ICdleGVjdXRlX3JlcGx5Jztcbn1cbmV4cG9ydHMuaXNFeGVjdXRlUmVwbHlNc2cgPSBpc0V4ZWN1dGVSZXBseU1zZztcbi8qKlxuICogVGVzdCB3aGV0aGVyIGEga2VybmVsIG1lc3NhZ2UgaXMgYW4gZXhwZXJpbWVudGFsIGAnZGVidWdfcmVxdWVzdCdgIG1lc3NhZ2UuXG4gKlxuICogQGhpZGRlblxuICpcbiAqICMjIyMgTm90ZXNcbiAqIERlYnVnIG1lc3NhZ2VzIGFyZSBleHBlcmltZW50YWwgbWVzc2FnZXMgdGhhdCBhcmUgbm90IGluIHRoZSBvZmZpY2lhbFxuICoga2VybmVsIG1lc3NhZ2Ugc3BlY2lmaWNhdGlvbi4gQXMgc3VjaCwgdGhpcyBpcyAqTk9UKiBjb25zaWRlcmVkXG4gKiBwYXJ0IG9mIHRoZSBwdWJsaWMgQVBJLCBhbmQgbWF5IGNoYW5nZSB3aXRob3V0IG5vdGljZS5cbiAqL1xuZnVuY3Rpb24gaXNEZWJ1Z1JlcXVlc3RNc2cobXNnKSB7XG4gICAgcmV0dXJuIG1zZy5oZWFkZXIubXNnX3R5cGUgPT09ICdkZWJ1Z19yZXF1ZXN0Jztcbn1cbmV4cG9ydHMuaXNEZWJ1Z1JlcXVlc3RNc2cgPSBpc0RlYnVnUmVxdWVzdE1zZztcbi8qKlxuICogVGVzdCB3aGV0aGVyIGEga2VybmVsIG1lc3NhZ2UgaXMgYW4gZXhwZXJpbWVudGFsIGAnZGVidWdfcmVwbHknYCBtZXNzYWdlLlxuICpcbiAqIEBoaWRkZW5cbiAqXG4gKiAjIyMjIE5vdGVzXG4gKiBEZWJ1ZyBtZXNzYWdlcyBhcmUgZXhwZXJpbWVudGFsIG1lc3NhZ2VzIHRoYXQgYXJlIG5vdCBpbiB0aGUgb2ZmaWNpYWxcbiAqIGtlcm5lbCBtZXNzYWdlIHNwZWNpZmljYXRpb24uIEFzIHN1Y2gsIHRoaXMgaXMgKk5PVCogY29uc2lkZXJlZFxuICogcGFydCBvZiB0aGUgcHVibGljIEFQSSwgYW5kIG1heSBjaGFuZ2Ugd2l0aG91dCBub3RpY2UuXG4gKi9cbmZ1bmN0aW9uIGlzRGVidWdSZXBseU1zZyhtc2cpIHtcbiAgICByZXR1cm4gbXNnLmhlYWRlci5tc2dfdHlwZSA9PT0gJ2RlYnVnX3JlcGx5Jztcbn1cbmV4cG9ydHMuaXNEZWJ1Z1JlcGx5TXNnID0gaXNEZWJ1Z1JlcGx5TXNnO1xuLyoqXG4gKiBUZXN0IHdoZXRoZXIgYSBrZXJuZWwgbWVzc2FnZSBpcyBhbiBgJ2lucHV0X3JlcXVlc3QnYCBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBpc0lucHV0UmVxdWVzdE1zZyhtc2cpIHtcbiAgICByZXR1cm4gbXNnLmhlYWRlci5tc2dfdHlwZSA9PT0gJ2lucHV0X3JlcXVlc3QnO1xufVxuZXhwb3J0cy5pc0lucHV0UmVxdWVzdE1zZyA9IGlzSW5wdXRSZXF1ZXN0TXNnO1xuLyoqXG4gKiBUZXN0IHdoZXRoZXIgYSBrZXJuZWwgbWVzc2FnZSBpcyBhbiBgJ2lucHV0X3JlcGx5J2AgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gaXNJbnB1dFJlcGx5TXNnKG1zZykge1xuICAgIHJldHVybiBtc2cuaGVhZGVyLm1zZ190eXBlID09PSAnaW5wdXRfcmVwbHknO1xufVxuZXhwb3J0cy5pc0lucHV0UmVwbHlNc2cgPSBpc0lucHV0UmVwbHlNc2c7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXNzYWdlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0S2VybmVsTW9kZWwgPSBleHBvcnRzLnNodXRkb3duS2VybmVsID0gZXhwb3J0cy5pbnRlcnJ1cHRLZXJuZWwgPSBleHBvcnRzLnJlc3RhcnRLZXJuZWwgPSBleHBvcnRzLnN0YXJ0TmV3ID0gZXhwb3J0cy5saXN0UnVubmluZyA9IGV4cG9ydHMuS0VSTkVMX1NFUlZJQ0VfVVJMID0gdm9pZCAwO1xuY29uc3Qgc2VydmVyY29ubmVjdGlvbl8xID0gcmVxdWlyZShcIi4uL3NlcnZlcmNvbm5lY3Rpb25cIik7XG5jb25zdCBjb3JldXRpbHNfMSA9IHJlcXVpcmUoXCJAanVweXRlcmxhYi9jb3JldXRpbHNcIik7XG5jb25zdCB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4vdmFsaWRhdGVcIik7XG4vKipcbiAqIFRoZSB1cmwgZm9yIHRoZSBrZXJuZWwgc2VydmljZS5cbiAqL1xuZXhwb3J0cy5LRVJORUxfU0VSVklDRV9VUkwgPSAnYXBpL2tlcm5lbHMnO1xuLyoqXG4gKiBGZXRjaCB0aGUgcnVubmluZyBrZXJuZWxzLlxuICpcbiAqIEBwYXJhbSBzZXR0aW5ncyAtIFRoZSBvcHRpb25hbCBzZXJ2ZXIgc2V0dGluZ3MuXG4gKlxuICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgbGlzdCBvZiBydW5uaW5nIGtlcm5lbHMuXG4gKlxuICogIyMjIyBOb3Rlc1xuICogVXNlcyB0aGUgW0p1cHl0ZXIgTm90ZWJvb2sgQVBJXShodHRwOi8vcGV0c3RvcmUuc3dhZ2dlci5pby8/dXJsPWh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9qdXB5dGVyL25vdGVib29rL21hc3Rlci9ub3RlYm9vay9zZXJ2aWNlcy9hcGkvYXBpLnlhbWwjIS9rZXJuZWxzKSBhbmQgdmFsaWRhdGVzIHRoZSByZXNwb25zZSBtb2RlbC5cbiAqXG4gKiBUaGUgcHJvbWlzZSBpcyBmdWxmaWxsZWQgb24gYSB2YWxpZCByZXNwb25zZSBhbmQgcmVqZWN0ZWQgb3RoZXJ3aXNlLlxuICovXG5hc3luYyBmdW5jdGlvbiBsaXN0UnVubmluZyhzZXR0aW5ncyA9IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VTZXR0aW5ncygpKSB7XG4gICAgY29uc3QgdXJsID0gY29yZXV0aWxzXzEuVVJMRXh0LmpvaW4oc2V0dGluZ3MuYmFzZVVybCwgZXhwb3J0cy5LRVJORUxfU0VSVklDRV9VUkwpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24ubWFrZVJlcXVlc3QodXJsLCB7fSwgc2V0dGluZ3MpO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICBjb25zdCBlcnIgPSBhd2FpdCBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5SZXNwb25zZUVycm9yLmNyZWF0ZShyZXNwb25zZSk7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICB2YWxpZGF0ZV8xLnZhbGlkYXRlTW9kZWxzKGRhdGEpO1xuICAgIHJldHVybiBkYXRhO1xufVxuZXhwb3J0cy5saXN0UnVubmluZyA9IGxpc3RSdW5uaW5nO1xuLyoqXG4gKiBTdGFydCBhIG5ldyBrZXJuZWwuXG4gKlxuICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgb3B0aW9ucyB1c2VkIHRvIGNyZWF0ZSB0aGUga2VybmVsLlxuICpcbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYSBrZXJuZWwgY29ubmVjdGlvbiBvYmplY3QuXG4gKlxuICogIyMjIyBOb3Rlc1xuICogVXNlcyB0aGUgW0p1cHl0ZXIgTm90ZWJvb2sgQVBJXShodHRwOi8vcGV0c3RvcmUuc3dhZ2dlci5pby8/dXJsPWh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9qdXB5dGVyL25vdGVib29rL21hc3Rlci9ub3RlYm9vay9zZXJ2aWNlcy9hcGkvYXBpLnlhbWwjIS9rZXJuZWxzKSBhbmQgdmFsaWRhdGVzIHRoZSByZXNwb25zZSBtb2RlbC5cbiAqXG4gKiBUaGUgcHJvbWlzZSBpcyBmdWxmaWxsZWQgb24gYSB2YWxpZCByZXNwb25zZSBhbmQgcmVqZWN0ZWQgb3RoZXJ3aXNlLlxuICovXG5hc3luYyBmdW5jdGlvbiBzdGFydE5ldyhvcHRpb25zID0ge30sIHNldHRpbmdzID0gc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24ubWFrZVNldHRpbmdzKCkpIHtcbiAgICBjb25zdCB1cmwgPSBjb3JldXRpbHNfMS5VUkxFeHQuam9pbihzZXR0aW5ncy5iYXNlVXJsLCBleHBvcnRzLktFUk5FTF9TRVJWSUNFX1VSTCk7XG4gICAgY29uc3QgaW5pdCA9IHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VSZXF1ZXN0KHVybCwgaW5pdCwgc2V0dGluZ3MpO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMSkge1xuICAgICAgICBjb25zdCBlcnIgPSBhd2FpdCBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5SZXNwb25zZUVycm9yLmNyZWF0ZShyZXNwb25zZSk7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICB2YWxpZGF0ZV8xLnZhbGlkYXRlTW9kZWwoZGF0YSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG5leHBvcnRzLnN0YXJ0TmV3ID0gc3RhcnROZXc7XG4vKipcbiAqIFJlc3RhcnQgYSBrZXJuZWwuXG4gKlxuICogIyMjIyBOb3Rlc1xuICogVXNlcyB0aGUgW0p1cHl0ZXIgTm90ZWJvb2sgQVBJXShodHRwOi8vcGV0c3RvcmUuc3dhZ2dlci5pby8/dXJsPWh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9qdXB5dGVyL25vdGVib29rL21hc3Rlci9ub3RlYm9vay9zZXJ2aWNlcy9hcGkvYXBpLnlhbWwjIS9rZXJuZWxzKSBhbmQgdmFsaWRhdGVzIHRoZSByZXNwb25zZSBtb2RlbC5cbiAqXG4gKiBUaGUgcHJvbWlzZSBpcyBmdWxmaWxsZWQgb24gYSB2YWxpZCByZXNwb25zZSAoYW5kIHRodXMgYWZ0ZXIgYSByZXN0YXJ0KSBhbmQgcmVqZWN0ZWQgb3RoZXJ3aXNlLlxuICovXG5hc3luYyBmdW5jdGlvbiByZXN0YXJ0S2VybmVsKGlkLCBzZXR0aW5ncyA9IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VTZXR0aW5ncygpKSB7XG4gICAgY29uc3QgdXJsID0gY29yZXV0aWxzXzEuVVJMRXh0LmpvaW4oc2V0dGluZ3MuYmFzZVVybCwgZXhwb3J0cy5LRVJORUxfU0VSVklDRV9VUkwsIGVuY29kZVVSSUNvbXBvbmVudChpZCksICdyZXN0YXJ0Jyk7XG4gICAgY29uc3QgaW5pdCA9IHsgbWV0aG9kOiAnUE9TVCcgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VSZXF1ZXN0KHVybCwgaW5pdCwgc2V0dGluZ3MpO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICBjb25zdCBlcnIgPSBhd2FpdCBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5SZXNwb25zZUVycm9yLmNyZWF0ZShyZXNwb25zZSk7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICB2YWxpZGF0ZV8xLnZhbGlkYXRlTW9kZWwoZGF0YSk7XG59XG5leHBvcnRzLnJlc3RhcnRLZXJuZWwgPSByZXN0YXJ0S2VybmVsO1xuLyoqXG4gKiBJbnRlcnJ1cHQgYSBrZXJuZWwuXG4gKlxuICogIyMjIyBOb3Rlc1xuICogVXNlcyB0aGUgW0p1cHl0ZXIgTm90ZWJvb2sgQVBJXShodHRwOi8vcGV0c3RvcmUuc3dhZ2dlci5pby8/dXJsPWh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9qdXB5dGVyL25vdGVib29rL21hc3Rlci9ub3RlYm9vay9zZXJ2aWNlcy9hcGkvYXBpLnlhbWwjIS9rZXJuZWxzKSBhbmQgdmFsaWRhdGVzIHRoZSByZXNwb25zZSBtb2RlbC5cbiAqXG4gKiBUaGUgcHJvbWlzZSBpcyBmdWxmaWxsZWQgb24gYSB2YWxpZCByZXNwb25zZSBhbmQgcmVqZWN0ZWQgb3RoZXJ3aXNlLlxuICovXG5hc3luYyBmdW5jdGlvbiBpbnRlcnJ1cHRLZXJuZWwoaWQsIHNldHRpbmdzID0gc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24ubWFrZVNldHRpbmdzKCkpIHtcbiAgICBjb25zdCB1cmwgPSBjb3JldXRpbHNfMS5VUkxFeHQuam9pbihzZXR0aW5ncy5iYXNlVXJsLCBleHBvcnRzLktFUk5FTF9TRVJWSUNFX1VSTCwgZW5jb2RlVVJJQ29tcG9uZW50KGlkKSwgJ2ludGVycnVwdCcpO1xuICAgIGNvbnN0IGluaXQgPSB7IG1ldGhvZDogJ1BPU1QnIH07XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlUmVxdWVzdCh1cmwsIGluaXQsIHNldHRpbmdzKTtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDQpIHtcbiAgICAgICAgY29uc3QgZXJyID0gYXdhaXQgc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24uUmVzcG9uc2VFcnJvci5jcmVhdGUocmVzcG9uc2UpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxufVxuZXhwb3J0cy5pbnRlcnJ1cHRLZXJuZWwgPSBpbnRlcnJ1cHRLZXJuZWw7XG4vKipcbiAqIFNodXQgZG93biBhIGtlcm5lbC5cbiAqXG4gKiBAcGFyYW0gaWQgLSBUaGUgaWQgb2YgdGhlIHJ1bm5pbmcga2VybmVsLlxuICpcbiAqIEBwYXJhbSBzZXR0aW5ncyAtIFRoZSBzZXJ2ZXIgc2V0dGluZ3MgZm9yIHRoZSByZXF1ZXN0LlxuICpcbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGtlcm5lbCBpcyBzaHV0IGRvd24uXG4gKlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIFVzZXMgdGhlIFtKdXB5dGVyIE5vdGVib29rIEFQSV0oaHR0cDovL3BldHN0b3JlLnN3YWdnZXIuaW8vP3VybD1odHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vanVweXRlci9ub3RlYm9vay9tYXN0ZXIvbm90ZWJvb2svc2VydmljZXMvYXBpL2FwaS55YW1sIyEva2VybmVscykgYW5kIHZhbGlkYXRlcyB0aGUgcmVzcG9uc2UgbW9kZWwuXG4gKlxuICogVGhlIHByb21pc2UgaXMgZnVsZmlsbGVkIG9uIGEgdmFsaWQgcmVzcG9uc2UgYW5kIHJlamVjdGVkIG90aGVyd2lzZS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gc2h1dGRvd25LZXJuZWwoaWQsIHNldHRpbmdzID0gc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24ubWFrZVNldHRpbmdzKCkpIHtcbiAgICBjb25zdCB1cmwgPSBjb3JldXRpbHNfMS5VUkxFeHQuam9pbihzZXR0aW5ncy5iYXNlVXJsLCBleHBvcnRzLktFUk5FTF9TRVJWSUNFX1VSTCwgZW5jb2RlVVJJQ29tcG9uZW50KGlkKSk7XG4gICAgY29uc3QgaW5pdCA9IHsgbWV0aG9kOiAnREVMRVRFJyB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24ubWFrZVJlcXVlc3QodXJsLCBpbml0LCBzZXR0aW5ncyk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IGBUaGUga2VybmVsIFwiJHtpZH1cIiBkb2VzIG5vdCBleGlzdCBvbiB0aGUgc2VydmVyYDtcbiAgICAgICAgY29uc29sZS53YXJuKG1zZyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjA0KSB7XG4gICAgICAgIGNvbnN0IGVyciA9IGF3YWl0IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLlJlc3BvbnNlRXJyb3IuY3JlYXRlKHJlc3BvbnNlKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbn1cbmV4cG9ydHMuc2h1dGRvd25LZXJuZWwgPSBzaHV0ZG93bktlcm5lbDtcbi8qKlxuICogR2V0IGEgZnVsbCBrZXJuZWwgbW9kZWwgZnJvbSB0aGUgc2VydmVyIGJ5IGtlcm5lbCBpZCBzdHJpbmcuXG4gKlxuICogIyMjIyBOb3Rlc1xuICogVXNlcyB0aGUgW0p1cHl0ZXIgTm90ZWJvb2sgQVBJXShodHRwOi8vcGV0c3RvcmUuc3dhZ2dlci5pby8/dXJsPWh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9qdXB5dGVyL25vdGVib29rL21hc3Rlci9ub3RlYm9vay9zZXJ2aWNlcy9hcGkvYXBpLnlhbWwjIS9rZXJuZWxzKSBhbmQgdmFsaWRhdGVzIHRoZSByZXNwb25zZSBtb2RlbC5cbiAqXG4gKiBUaGUgcHJvbWlzZSBpcyBmdWxmaWxsZWQgb24gYSB2YWxpZCByZXNwb25zZSBhbmQgcmVqZWN0ZWQgb3RoZXJ3aXNlLlxuICovXG5hc3luYyBmdW5jdGlvbiBnZXRLZXJuZWxNb2RlbChpZCwgc2V0dGluZ3MgPSBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlU2V0dGluZ3MoKSkge1xuICAgIGNvbnN0IHVybCA9IGNvcmV1dGlsc18xLlVSTEV4dC5qb2luKHNldHRpbmdzLmJhc2VVcmwsIGV4cG9ydHMuS0VSTkVMX1NFUlZJQ0VfVVJMLCBlbmNvZGVVUklDb21wb25lbnQoaWQpKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VSZXF1ZXN0KHVybCwge30sIHNldHRpbmdzKTtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgY29uc3QgZXJyID0gYXdhaXQgc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24uUmVzcG9uc2VFcnJvci5jcmVhdGUocmVzcG9uc2UpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgdmFsaWRhdGVfMS52YWxpZGF0ZU1vZGVsKGRhdGEpO1xuICAgIHJldHVybiBkYXRhO1xufVxuZXhwb3J0cy5nZXRLZXJuZWxNb2RlbCA9IGdldEtlcm5lbE1vZGVsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVzdGFwaS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2VyaWFsaXplID0gZXhwb3J0cy5kZXNlcmlhbGl6ZSA9IHZvaWQgMDtcbi8qKlxuICogRGVzZXJpYWxpemUgYW5kIHJldHVybiB0aGUgdW5wYWNrZWQgbWVzc2FnZS5cbiAqXG4gKiAjIyMjIE5vdGVzXG4gKiBIYW5kbGVzIEpTT04gYmxvYiBzdHJpbmdzIGFuZCBiaW5hcnkgbWVzc2FnZXMuXG4gKi9cbmZ1bmN0aW9uIGRlc2VyaWFsaXplKGRhdGEpIHtcbiAgICBsZXQgdmFsdWU7XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGRlc2VyaWFsaXplQmluYXJ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnRzLmRlc2VyaWFsaXplID0gZGVzZXJpYWxpemU7XG4vKipcbiAqIFNlcmlhbGl6ZSBhIGtlcm5lbCBtZXNzYWdlIGZvciB0cmFuc3BvcnQuXG4gKlxuICogIyMjIyBOb3Rlc1xuICogSWYgdGhlcmUgaXMgYmluYXJ5IGNvbnRlbnQsIGFuIGBBcnJheUJ1ZmZlcmAgaXMgcmV0dXJuZWQsXG4gKiBvdGhlcndpc2UgdGhlIG1lc3NhZ2UgaXMgY29udmVydGVkIHRvIGEgSlNPTiBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIHNlcmlhbGl6ZShtc2cpIHtcbiAgICB2YXIgX2E7XG4gICAgbGV0IHZhbHVlO1xuICAgIGlmICgoX2EgPSBtc2cuYnVmZmVycykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkge1xuICAgICAgICB2YWx1ZSA9IHNlcmlhbGl6ZUJpbmFyeShtc2cpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeShtc2cpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnRzLnNlcmlhbGl6ZSA9IHNlcmlhbGl6ZTtcbi8qKlxuICogRGVzZXJpYWxpemUgYSBiaW5hcnkgbWVzc2FnZSB0byBhIEtlcm5lbCBNZXNzYWdlLlxuICovXG5mdW5jdGlvbiBkZXNlcmlhbGl6ZUJpbmFyeShidWYpIHtcbiAgICBjb25zdCBkYXRhID0gbmV3IERhdGFWaWV3KGJ1Zik7XG4gICAgLy8gcmVhZCB0aGUgaGVhZGVyOiAxICsgbmJ1ZnMgMzJiIGludGVnZXJzXG4gICAgY29uc3QgbmJ1ZnMgPSBkYXRhLmdldFVpbnQzMigwKTtcbiAgICBjb25zdCBvZmZzZXRzID0gW107XG4gICAgaWYgKG5idWZzIDwgMikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaW5jb21pbmcgS2VybmVsIE1lc3NhZ2UnKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbmJ1ZnM7IGkrKykge1xuICAgICAgICBvZmZzZXRzLnB1c2goZGF0YS5nZXRVaW50MzIoaSAqIDQpKTtcbiAgICB9XG4gICAgY29uc3QganNvbkJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYnVmLnNsaWNlKG9mZnNldHNbMF0sIG9mZnNldHNbMV0pKTtcbiAgICBjb25zdCBtc2cgPSBKU09OLnBhcnNlKG5ldyBUZXh0RGVjb2RlcigndXRmOCcpLmRlY29kZShqc29uQnl0ZXMpKTtcbiAgICAvLyB0aGUgcmVtYWluaW5nIGNodW5rcyBhcmUgc3RvcmVkIGFzIERhdGFWaWV3cyBpbiBtc2cuYnVmZmVyc1xuICAgIG1zZy5idWZmZXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBuYnVmczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gb2Zmc2V0c1tpXTtcbiAgICAgICAgY29uc3Qgc3RvcCA9IG9mZnNldHNbaSArIDFdIHx8IGJ1Zi5ieXRlTGVuZ3RoO1xuICAgICAgICBtc2cuYnVmZmVycy5wdXNoKG5ldyBEYXRhVmlldyhidWYuc2xpY2Uoc3RhcnQsIHN0b3ApKSk7XG4gICAgfVxuICAgIHJldHVybiBtc2c7XG59XG4vKipcbiAqIEltcGxlbWVudCB0aGUgYmluYXJ5IHNlcmlhbGl6YXRpb24gcHJvdG9jb2wuXG4gKlxuICogU2VyaWFsaXplIEtlcm5lbCBtZXNzYWdlIHRvIEFycmF5QnVmZmVyLlxuICovXG5mdW5jdGlvbiBzZXJpYWxpemVCaW5hcnkobXNnKSB7XG4gICAgY29uc3Qgb2Zmc2V0cyA9IFtdO1xuICAgIGNvbnN0IGJ1ZmZlcnMgPSBbXTtcbiAgICBjb25zdCBlbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKCk7XG4gICAgbGV0IG9yaWdCdWZmZXJzID0gW107XG4gICAgaWYgKG1zZy5idWZmZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3JpZ0J1ZmZlcnMgPSBtc2cuYnVmZmVycztcbiAgICAgICAgZGVsZXRlIG1zZ1snYnVmZmVycyddO1xuICAgIH1cbiAgICBjb25zdCBqc29uVXRmOCA9IGVuY29kZXIuZW5jb2RlKEpTT04uc3RyaW5naWZ5KG1zZykpO1xuICAgIGJ1ZmZlcnMucHVzaChqc29uVXRmOC5idWZmZXIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3JpZ0J1ZmZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gbXNnLmJ1ZmZlcnMgZWxlbWVudHMgY291bGQgYmUgZWl0aGVyIHZpZXdzIG9yIEFycmF5QnVmZmVyc1xuICAgICAgICAvLyBidWZmZXJzIGVsZW1lbnRzIGFyZSBBcnJheUJ1ZmZlcnNcbiAgICAgICAgY29uc3QgYiA9IG9yaWdCdWZmZXJzW2ldO1xuICAgICAgICBidWZmZXJzLnB1c2goQXJyYXlCdWZmZXIuaXNWaWV3KGIpID8gYi5idWZmZXIgOiBiKTtcbiAgICB9XG4gICAgY29uc3QgbmJ1ZnMgPSBidWZmZXJzLmxlbmd0aDtcbiAgICBvZmZzZXRzLnB1c2goNCAqIChuYnVmcyArIDEpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSArIDEgPCBidWZmZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG9mZnNldHMucHVzaChvZmZzZXRzW29mZnNldHMubGVuZ3RoIC0gMV0gKyBidWZmZXJzW2ldLmJ5dGVMZW5ndGgpO1xuICAgIH1cbiAgICBjb25zdCBtc2dCdWYgPSBuZXcgVWludDhBcnJheShvZmZzZXRzW29mZnNldHMubGVuZ3RoIC0gMV0gKyBidWZmZXJzW2J1ZmZlcnMubGVuZ3RoIC0gMV0uYnl0ZUxlbmd0aCk7XG4gICAgLy8gdXNlIERhdGFWaWV3LnNldFVpbnQzMiBmb3IgbmV0d29yayBieXRlLW9yZGVyXG4gICAgY29uc3QgdmlldyA9IG5ldyBEYXRhVmlldyhtc2dCdWYuYnVmZmVyKTtcbiAgICAvLyB3cml0ZSBuYnVmcyB0byBmaXJzdCA0IGJ5dGVzXG4gICAgdmlldy5zZXRVaW50MzIoMCwgbmJ1ZnMpO1xuICAgIC8vIHdyaXRlIG9mZnNldHMgdG8gbmV4dCA0ICogbmJ1ZnMgYnl0ZXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9mZnNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmlldy5zZXRVaW50MzIoNCAqIChpICsgMSksIG9mZnNldHNbaV0pO1xuICAgIH1cbiAgICAvLyB3cml0ZSBhbGwgdGhlIGJ1ZmZlcnMgYXQgdGhlaXIgcmVzcGVjdGl2ZSBvZmZzZXRzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG1zZ0J1Zi5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmZmVyc1tpXSksIG9mZnNldHNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gbXNnQnVmLmJ1ZmZlcjtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlcmlhbGl6ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudmFsaWRhdGVNb2RlbHMgPSBleHBvcnRzLnZhbGlkYXRlTW9kZWwgPSBleHBvcnRzLnZhbGlkYXRlTWVzc2FnZSA9IHZvaWQgMDtcbmNvbnN0IHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG4vKipcbiAqIFJlcXVpcmVkIGZpZWxkcyBmb3IgYElLZXJuZWxIZWFkZXJgLlxuICovXG5jb25zdCBIRUFERVJfRklFTERTID0gWyd1c2VybmFtZScsICd2ZXJzaW9uJywgJ3Nlc3Npb24nLCAnbXNnX2lkJywgJ21zZ190eXBlJ107XG4vKipcbiAqIFJlcXVpcmVkIGZpZWxkcyBhbmQgdHlwZXMgZm9yIGNvbnRlbnRzIG9mIHZhcmlvdXMgdHlwZXMgb2YgYGtlcm5lbC5JTWVzc2FnZWBcbiAqIG1lc3NhZ2VzIG9uIHRoZSBpb3B1YiBjaGFubmVsLlxuICovXG5jb25zdCBJT1BVQl9DT05URU5UX0ZJRUxEUyA9IHtcbiAgICBzdHJlYW06IHsgbmFtZTogJ3N0cmluZycsIHRleHQ6ICdzdHJpbmcnIH0sXG4gICAgZGlzcGxheV9kYXRhOiB7IGRhdGE6ICdvYmplY3QnLCBtZXRhZGF0YTogJ29iamVjdCcgfSxcbiAgICBleGVjdXRlX2lucHV0OiB7IGNvZGU6ICdzdHJpbmcnLCBleGVjdXRpb25fY291bnQ6ICdudW1iZXInIH0sXG4gICAgZXhlY3V0ZV9yZXN1bHQ6IHtcbiAgICAgICAgZXhlY3V0aW9uX2NvdW50OiAnbnVtYmVyJyxcbiAgICAgICAgZGF0YTogJ29iamVjdCcsXG4gICAgICAgIG1ldGFkYXRhOiAnb2JqZWN0J1xuICAgIH0sXG4gICAgZXJyb3I6IHsgZW5hbWU6ICdzdHJpbmcnLCBldmFsdWU6ICdzdHJpbmcnLCB0cmFjZWJhY2s6ICdvYmplY3QnIH0sXG4gICAgc3RhdHVzOiB7XG4gICAgICAgIGV4ZWN1dGlvbl9zdGF0ZTogW1xuICAgICAgICAgICAgJ3N0cmluZycsXG4gICAgICAgICAgICBbJ3N0YXJ0aW5nJywgJ2lkbGUnLCAnYnVzeScsICdyZXN0YXJ0aW5nJywgJ2RlYWQnXVxuICAgICAgICBdXG4gICAgfSxcbiAgICBjbGVhcl9vdXRwdXQ6IHsgd2FpdDogJ2Jvb2xlYW4nIH0sXG4gICAgY29tbV9vcGVuOiB7IGNvbW1faWQ6ICdzdHJpbmcnLCB0YXJnZXRfbmFtZTogJ3N0cmluZycsIGRhdGE6ICdvYmplY3QnIH0sXG4gICAgY29tbV9tc2c6IHsgY29tbV9pZDogJ3N0cmluZycsIGRhdGE6ICdvYmplY3QnIH0sXG4gICAgY29tbV9jbG9zZTogeyBjb21tX2lkOiAnc3RyaW5nJyB9LFxuICAgIHNodXRkb3duX3JlcGx5OiB7IHJlc3RhcnQ6ICdib29sZWFuJyB9IC8vIEVtaXR0ZWQgYnkgdGhlIElQeXRob24ga2VybmVsLlxufTtcbi8qKlxuICogVmFsaWRhdGUgdGhlIGhlYWRlciBvZiBhIGtlcm5lbCBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUhlYWRlcihoZWFkZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEhFQURFUl9GSUVMRFMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsaWRhdGVfMS52YWxpZGF0ZVByb3BlcnR5KGhlYWRlciwgSEVBREVSX0ZJRUxEU1tpXSwgJ3N0cmluZycpO1xuICAgIH1cbn1cbi8qKlxuICogVmFsaWRhdGUgYSBrZXJuZWwgbWVzc2FnZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlTWVzc2FnZShtc2cpIHtcbiAgICB2YWxpZGF0ZV8xLnZhbGlkYXRlUHJvcGVydHkobXNnLCAnbWV0YWRhdGEnLCAnb2JqZWN0Jyk7XG4gICAgdmFsaWRhdGVfMS52YWxpZGF0ZVByb3BlcnR5KG1zZywgJ2NvbnRlbnQnLCAnb2JqZWN0Jyk7XG4gICAgdmFsaWRhdGVfMS52YWxpZGF0ZVByb3BlcnR5KG1zZywgJ2NoYW5uZWwnLCAnc3RyaW5nJyk7XG4gICAgdmFsaWRhdGVIZWFkZXIobXNnLmhlYWRlcik7XG4gICAgaWYgKG1zZy5jaGFubmVsID09PSAnaW9wdWInKSB7XG4gICAgICAgIHZhbGlkYXRlSU9QdWJDb250ZW50KG1zZyk7XG4gICAgfVxufVxuZXhwb3J0cy52YWxpZGF0ZU1lc3NhZ2UgPSB2YWxpZGF0ZU1lc3NhZ2U7XG4vKipcbiAqIFZhbGlkYXRlIGNvbnRlbnQgYW4ga2VybmVsIG1lc3NhZ2Ugb24gdGhlIGlvcHViIGNoYW5uZWwuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlSU9QdWJDb250ZW50KG1zZykge1xuICAgIGlmIChtc2cuY2hhbm5lbCA9PT0gJ2lvcHViJykge1xuICAgICAgICBjb25zdCBmaWVsZHMgPSBJT1BVQl9DT05URU5UX0ZJRUxEU1ttc2cuaGVhZGVyLm1zZ190eXBlXTtcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHVua25vd24gbWVzc2FnZSB0eXBlLlxuICAgICAgICBpZiAoZmllbGRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKGZpZWxkcyk7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBtc2cuY29udGVudDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGFyZ3MgPSBmaWVsZHNbbmFtZXNbaV1dO1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFyZ3MpKSB7XG4gICAgICAgICAgICAgICAgYXJncyA9IFthcmdzXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbGlkYXRlXzEudmFsaWRhdGVQcm9wZXJ0eShjb250ZW50LCBuYW1lc1tpXSwgLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIFZhbGlkYXRlIGEgYEtlcm5lbC5JTW9kZWxgIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVNb2RlbChtb2RlbCkge1xuICAgIHZhbGlkYXRlXzEudmFsaWRhdGVQcm9wZXJ0eShtb2RlbCwgJ25hbWUnLCAnc3RyaW5nJyk7XG4gICAgdmFsaWRhdGVfMS52YWxpZGF0ZVByb3BlcnR5KG1vZGVsLCAnaWQnLCAnc3RyaW5nJyk7XG59XG5leHBvcnRzLnZhbGlkYXRlTW9kZWwgPSB2YWxpZGF0ZU1vZGVsO1xuLyoqXG4gKiBWYWxpZGF0ZSBhbiBhcnJheSBvZiBgSU1vZGVsYCBvYmplY3RzLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZU1vZGVscyhtb2RlbHMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkobW9kZWxzKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQga2VybmVsIGxpc3QnKTtcbiAgICB9XG4gICAgbW9kZWxzLmZvckVhY2goZCA9PiB2YWxpZGF0ZU1vZGVsKGQpKTtcbn1cbmV4cG9ydHMudmFsaWRhdGVNb2RlbHMgPSB2YWxpZGF0ZU1vZGVscztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZhbGlkYXRlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5LZXJuZWxTcGVjQVBJID0gZXhwb3J0cy5LZXJuZWxTcGVjID0gdm9pZCAwO1xuY29uc3QgS2VybmVsU3BlYyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9rZXJuZWxzcGVjXCIpKTtcbmV4cG9ydHMuS2VybmVsU3BlYyA9IEtlcm5lbFNwZWM7XG5jb25zdCBLZXJuZWxTcGVjQVBJID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3Jlc3RhcGlcIikpO1xuZXhwb3J0cy5LZXJuZWxTcGVjQVBJID0gS2VybmVsU3BlY0FQSTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9tYW5hZ2VyXCIpLCBleHBvcnRzKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9a2VybmVsc3BlYy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5LZXJuZWxTcGVjTWFuYWdlciA9IHZvaWQgMDtcbmNvbnN0IGNvcmV1dGlsc18xID0gcmVxdWlyZShcIkBsdW1pbm8vY29yZXV0aWxzXCIpO1xuY29uc3QgcG9sbGluZ18xID0gcmVxdWlyZShcIkBsdW1pbm8vcG9sbGluZ1wiKTtcbmNvbnN0IHNpZ25hbGluZ18xID0gcmVxdWlyZShcIkBsdW1pbm8vc2lnbmFsaW5nXCIpO1xuY29uc3QgcmVzdGFwaSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9yZXN0YXBpXCIpKTtcbmNvbnN0IGJhc2VtYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi4vYmFzZW1hbmFnZXJcIik7XG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIGEga2VybmVsIHNwZWMgbWFuYWdlci5cbiAqL1xuY2xhc3MgS2VybmVsU3BlY01hbmFnZXIgZXh0ZW5kcyBiYXNlbWFuYWdlcl8xLkJhc2VNYW5hZ2VyIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcga2VybmVsIHNwZWMgbWFuYWdlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIGRlZmF1bHQgb3B0aW9ucyBmb3Iga2VybmVsLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9pc1JlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3Rpb25GYWlsdXJlID0gbmV3IHNpZ25hbGluZ18xLlNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fc3BlY3MgPSBudWxsO1xuICAgICAgICB0aGlzLl9zcGVjc0NoYW5nZWQgPSBuZXcgc2lnbmFsaW5nXzEuU2lnbmFsKHRoaXMpO1xuICAgICAgICAvLyBJbml0aWFsaXplIGludGVybmFsIGRhdGEuXG4gICAgICAgIHRoaXMuX3JlYWR5ID0gUHJvbWlzZS5hbGwoW3RoaXMucmVxdWVzdFNwZWNzKCldKVxuICAgICAgICAgICAgLnRoZW4oXyA9PiB1bmRlZmluZWQpXG4gICAgICAgICAgICAuY2F0Y2goXyA9PiB1bmRlZmluZWQpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5faXNSZWFkeSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9wb2xsU3BlY3MgPSBuZXcgcG9sbGluZ18xLlBvbGwoe1xuICAgICAgICAgICAgYXV0bzogZmFsc2UsXG4gICAgICAgICAgICBmYWN0b3J5OiAoKSA9PiB0aGlzLnJlcXVlc3RTcGVjcygpLFxuICAgICAgICAgICAgZnJlcXVlbmN5OiB7XG4gICAgICAgICAgICAgICAgaW50ZXJ2YWw6IDYxICogMTAwMCxcbiAgICAgICAgICAgICAgICBiYWNrb2ZmOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1heDogMzAwICogMTAwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hbWU6IGBAanVweXRlcmxhYi9zZXJ2aWNlczpLZXJuZWxTcGVjTWFuYWdlciNzcGVjc2AsXG4gICAgICAgICAgICBzdGFuZGJ5OiAoX2EgPSBvcHRpb25zLnN0YW5kYnkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICd3aGVuLWhpZGRlbidcbiAgICAgICAgfSk7XG4gICAgICAgIHZvaWQgdGhpcy5yZWFkeS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHZvaWQgdGhpcy5fcG9sbFNwZWNzLnN0YXJ0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUZXN0IHdoZXRoZXIgdGhlIG1hbmFnZXIgaXMgcmVhZHkuXG4gICAgICovXG4gICAgZ2V0IGlzUmVhZHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1JlYWR5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdGhhdCBmdWxmaWxscyB3aGVuIHRoZSBtYW5hZ2VyIGlzIHJlYWR5LlxuICAgICAqL1xuICAgIGdldCByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWR5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1vc3QgcmVjZW50bHkgZmV0Y2hlZCBrZXJuZWwgc3BlY3MuXG4gICAgICovXG4gICAgZ2V0IHNwZWNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3BlY3M7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgc3BlY3MgY2hhbmdlLlxuICAgICAqL1xuICAgIGdldCBzcGVjc0NoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVjc0NoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGVyZSBpcyBhIGNvbm5lY3Rpb24gZmFpbHVyZS5cbiAgICAgKi9cbiAgICBnZXQgY29ubmVjdGlvbkZhaWx1cmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25uZWN0aW9uRmFpbHVyZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIG1hbmFnZXIuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5fcG9sbFNwZWNzLmRpc3Bvc2UoKTtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGb3JjZSBhIHJlZnJlc2ggb2YgdGhlIHNwZWNzIGZyb20gdGhlIHNlcnZlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNwZWNzIGFyZSBmZXRjaGVkLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmUgY2FsbGVkIG9ubHkgaW4gcmVzcG9uc2UgdG8gYSB1c2VyIGFjdGlvbixcbiAgICAgKiBzaW5jZSB0aGUgbWFuYWdlciBtYWludGFpbnMgaXRzIGludGVybmFsIHN0YXRlLlxuICAgICAqL1xuICAgIGFzeW5jIHJlZnJlc2hTcGVjcygpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fcG9sbFNwZWNzLnJlZnJlc2goKTtcbiAgICAgICAgYXdhaXQgdGhpcy5fcG9sbFNwZWNzLnRpY2s7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdG8gcG9sbCBzcGVjcyBhbmQgdXBkYXRlIHN0YXRlLlxuICAgICAqL1xuICAgIGFzeW5jIHJlcXVlc3RTcGVjcygpIHtcbiAgICAgICAgY29uc3Qgc3BlY3MgPSBhd2FpdCByZXN0YXBpLmdldFNwZWNzKHRoaXMuc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb3JldXRpbHNfMS5KU09ORXh0LmRlZXBFcXVhbChzcGVjcywgdGhpcy5fc3BlY3MpKSB7XG4gICAgICAgICAgICB0aGlzLl9zcGVjcyA9IHNwZWNzO1xuICAgICAgICAgICAgdGhpcy5fc3BlY3NDaGFuZ2VkLmVtaXQoc3BlY3MpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5LZXJuZWxTcGVjTWFuYWdlciA9IEtlcm5lbFNwZWNNYW5hZ2VyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFuYWdlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0U3BlY3MgPSB2b2lkIDA7XG5jb25zdCBzZXJ2ZXJjb25uZWN0aW9uXzEgPSByZXF1aXJlKFwiLi4vc2VydmVyY29ubmVjdGlvblwiKTtcbmNvbnN0IHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi92YWxpZGF0ZVwiKTtcbmNvbnN0IGNvcmV1dGlsc18xID0gcmVxdWlyZShcIkBqdXB5dGVybGFiL2NvcmV1dGlsc1wiKTtcbi8qKlxuICogVGhlIHVybCBmb3IgdGhlIGtlcm5lbHNwZWMgc2VydmljZS5cbiAqL1xuY29uc3QgS0VSTkVMU1BFQ19TRVJWSUNFX1VSTCA9ICdhcGkva2VybmVsc3BlY3MnO1xuLyoqXG4gKiBGZXRjaCBhbGwgb2YgdGhlIGtlcm5lbCBzcGVjcy5cbiAqXG4gKiBAcGFyYW0gc2V0dGluZ3MgLSBUaGUgb3B0aW9uYWwgc2VydmVyIHNldHRpbmdzLlxuICogQHBhcmFtIHVzZUNhY2hlIC0gV2hldGhlciB0byB1c2UgdGhlIGNhY2hlLiBJZiBmYWxzZSwgYWx3YXlzIHJlcXVlc3QuXG4gKlxuICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUga2VybmVsIHNwZWNzLlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIFVzZXMgdGhlIFtKdXB5dGVyIE5vdGVib29rIEFQSV0oaHR0cDovL3BldHN0b3JlLnN3YWdnZXIuaW8vP3VybD1odHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vanVweXRlci9ub3RlYm9vay9tYXN0ZXIvbm90ZWJvb2svc2VydmljZXMvYXBpL2FwaS55YW1sIyEva2VybmVsc3BlY3MpLlxuICovXG5hc3luYyBmdW5jdGlvbiBnZXRTcGVjcyhzZXR0aW5ncyA9IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VTZXR0aW5ncygpKSB7XG4gICAgY29uc3QgdXJsID0gY29yZXV0aWxzXzEuVVJMRXh0LmpvaW4oc2V0dGluZ3MuYmFzZVVybCwgS0VSTkVMU1BFQ19TRVJWSUNFX1VSTCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlUmVxdWVzdCh1cmwsIHt9LCBzZXR0aW5ncyk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgIGNvbnN0IGVyciA9IGF3YWl0IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLlJlc3BvbnNlRXJyb3IuY3JlYXRlKHJlc3BvbnNlKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHJldHVybiB2YWxpZGF0ZV8xLnZhbGlkYXRlU3BlY01vZGVscyhkYXRhKTtcbn1cbmV4cG9ydHMuZ2V0U3BlY3MgPSBnZXRTcGVjcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlc3RhcGkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnZhbGlkYXRlU3BlY01vZGVscyA9IGV4cG9ydHMudmFsaWRhdGVTcGVjTW9kZWwgPSB2b2lkIDA7XG5jb25zdCB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4uL3ZhbGlkYXRlXCIpO1xuLyoqXG4gKiBWYWxpZGF0ZSBhIHNlcnZlciBrZXJuZWxzcGVjIG1vZGVsIHRvIGEgY2xpZW50IHNpZGUgbW9kZWwuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlU3BlY01vZGVsKGRhdGEpIHtcbiAgICBjb25zdCBzcGVjID0gZGF0YS5zcGVjO1xuICAgIGlmICghc3BlYykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQga2VybmVsIHNwZWMnKTtcbiAgICB9XG4gICAgdmFsaWRhdGVfMS52YWxpZGF0ZVByb3BlcnR5KGRhdGEsICduYW1lJywgJ3N0cmluZycpO1xuICAgIHZhbGlkYXRlXzEudmFsaWRhdGVQcm9wZXJ0eShkYXRhLCAncmVzb3VyY2VzJywgJ29iamVjdCcpO1xuICAgIHZhbGlkYXRlXzEudmFsaWRhdGVQcm9wZXJ0eShzcGVjLCAnbGFuZ3VhZ2UnLCAnc3RyaW5nJyk7XG4gICAgdmFsaWRhdGVfMS52YWxpZGF0ZVByb3BlcnR5KHNwZWMsICdkaXNwbGF5X25hbWUnLCAnc3RyaW5nJyk7XG4gICAgdmFsaWRhdGVfMS52YWxpZGF0ZVByb3BlcnR5KHNwZWMsICdhcmd2JywgJ2FycmF5Jyk7XG4gICAgbGV0IG1ldGFkYXRhID0gbnVsbDtcbiAgICBpZiAoc3BlYy5oYXNPd25Qcm9wZXJ0eSgnbWV0YWRhdGEnKSkge1xuICAgICAgICB2YWxpZGF0ZV8xLnZhbGlkYXRlUHJvcGVydHkoc3BlYywgJ21ldGFkYXRhJywgJ29iamVjdCcpO1xuICAgICAgICBtZXRhZGF0YSA9IHNwZWMubWV0YWRhdGE7XG4gICAgfVxuICAgIGxldCBlbnYgPSBudWxsO1xuICAgIGlmIChzcGVjLmhhc093blByb3BlcnR5KCdlbnYnKSkge1xuICAgICAgICB2YWxpZGF0ZV8xLnZhbGlkYXRlUHJvcGVydHkoc3BlYywgJ2VudicsICdvYmplY3QnKTtcbiAgICAgICAgZW52ID0gc3BlYy5lbnY7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgcmVzb3VyY2VzOiBkYXRhLnJlc291cmNlcyxcbiAgICAgICAgbGFuZ3VhZ2U6IHNwZWMubGFuZ3VhZ2UsXG4gICAgICAgIGRpc3BsYXlfbmFtZTogc3BlYy5kaXNwbGF5X25hbWUsXG4gICAgICAgIGFyZ3Y6IHNwZWMuYXJndixcbiAgICAgICAgbWV0YWRhdGEsXG4gICAgICAgIGVudlxuICAgIH07XG59XG5leHBvcnRzLnZhbGlkYXRlU3BlY01vZGVsID0gdmFsaWRhdGVTcGVjTW9kZWw7XG4vKipcbiAqIFZhbGlkYXRlIGEgYEtlcm5lbC5JU3BlY01vZGVsc2Agb2JqZWN0LlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVNwZWNNb2RlbHMoZGF0YSkge1xuICAgIGlmICghZGF0YS5oYXNPd25Qcm9wZXJ0eSgna2VybmVsc3BlY3MnKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGtlcm5lbHNwZWNzIGZvdW5kJyk7XG4gICAgfVxuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMoZGF0YS5rZXJuZWxzcGVjcyk7XG4gICAgY29uc3Qga2VybmVsc3BlY3MgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIGxldCBkZWZhdWx0U3BlYyA9IGRhdGEuZGVmYXVsdDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qga3MgPSBkYXRhLmtlcm5lbHNwZWNzW2tleXNbaV1dO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAga2VybmVsc3BlY3Nba2V5c1tpXV0gPSB2YWxpZGF0ZVNwZWNNb2RlbChrcyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBlcnJhbnQga2VybmVsIHNwZWMuXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYFJlbW92aW5nIGVycmFudCBrZXJuZWwgc3BlYzogJHtrZXlzW2ldfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGtleXMgPSBPYmplY3Qua2V5cyhrZXJuZWxzcGVjcyk7XG4gICAgaWYgKCFrZXlzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHZhbGlkIGtlcm5lbHNwZWNzIGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICghZGVmYXVsdFNwZWMgfHxcbiAgICAgICAgdHlwZW9mIGRlZmF1bHRTcGVjICE9PSAnc3RyaW5nJyB8fFxuICAgICAgICAhKGRlZmF1bHRTcGVjIGluIGtlcm5lbHNwZWNzKSkge1xuICAgICAgICBkZWZhdWx0U3BlYyA9IGtleXNbMF07XG4gICAgICAgIGNvbnNvbGUud2FybihgRGVmYXVsdCBrZXJuZWwgbm90IGZvdW5kLCB1c2luZyAnJHtrZXlzWzBdfSdgKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVmYXVsdDogZGVmYXVsdFNwZWMsXG4gICAgICAgIGtlcm5lbHNwZWNzXG4gICAgfTtcbn1cbmV4cG9ydHMudmFsaWRhdGVTcGVjTW9kZWxzID0gdmFsaWRhdGVTcGVjTW9kZWxzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmFsaWRhdGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNlcnZpY2VNYW5hZ2VyID0gdm9pZCAwO1xuY29uc3Qgc2lnbmFsaW5nXzEgPSByZXF1aXJlKFwiQGx1bWluby9zaWduYWxpbmdcIik7XG5jb25zdCBidWlsZGVyXzEgPSByZXF1aXJlKFwiLi9idWlsZGVyXCIpO1xuY29uc3QgbmJjb252ZXJ0XzEgPSByZXF1aXJlKFwiLi9uYmNvbnZlcnRcIik7XG5jb25zdCBjb250ZW50c18xID0gcmVxdWlyZShcIi4vY29udGVudHNcIik7XG5jb25zdCBrZXJuZWxzcGVjXzEgPSByZXF1aXJlKFwiLi9rZXJuZWxzcGVjXCIpO1xuY29uc3Qgc2Vzc2lvbl8xID0gcmVxdWlyZShcIi4vc2Vzc2lvblwiKTtcbmNvbnN0IHNldHRpbmdfMSA9IHJlcXVpcmUoXCIuL3NldHRpbmdcIik7XG5jb25zdCB0ZXJtaW5hbF8xID0gcmVxdWlyZShcIi4vdGVybWluYWxcIik7XG5jb25zdCBzZXJ2ZXJjb25uZWN0aW9uXzEgPSByZXF1aXJlKFwiLi9zZXJ2ZXJjb25uZWN0aW9uXCIpO1xuY29uc3Qgd29ya3NwYWNlXzEgPSByZXF1aXJlKFwiLi93b3Jrc3BhY2VcIik7XG5jb25zdCBrZXJuZWxfMSA9IHJlcXVpcmUoXCIuL2tlcm5lbFwiKTtcbi8qKlxuICogQSBKdXB5dGVyIHNlcnZpY2VzIG1hbmFnZXIuXG4gKi9cbmNsYXNzIFNlcnZpY2VNYW5hZ2VyIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgc2VydmljZXMgcHJvdmlkZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGlvbkZhaWx1cmUgPSBuZXcgc2lnbmFsaW5nXzEuU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9pc1JlYWR5ID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGRlZmF1bHREcml2ZSA9IG9wdGlvbnMuZGVmYXVsdERyaXZlO1xuICAgICAgICBjb25zdCBzZXJ2ZXJTZXR0aW5ncyA9IChfYSA9IG9wdGlvbnMuc2VydmVyU2V0dGluZ3MpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VTZXR0aW5ncygpO1xuICAgICAgICBjb25zdCBzdGFuZGJ5ID0gKF9iID0gb3B0aW9ucy5zdGFuZGJ5KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnd2hlbi1oaWRkZW4nO1xuICAgICAgICBjb25zdCBub3JtYWxpemVkID0geyBkZWZhdWx0RHJpdmUsIHNlcnZlclNldHRpbmdzLCBzdGFuZGJ5IH07XG4gICAgICAgIGNvbnN0IGtlcm5lbE1hbmFnZXIgPSBuZXcga2VybmVsXzEuS2VybmVsTWFuYWdlcihub3JtYWxpemVkKTtcbiAgICAgICAgdGhpcy5zZXJ2ZXJTZXR0aW5ncyA9IHNlcnZlclNldHRpbmdzO1xuICAgICAgICB0aGlzLmNvbnRlbnRzID0gbmV3IGNvbnRlbnRzXzEuQ29udGVudHNNYW5hZ2VyKG5vcm1hbGl6ZWQpO1xuICAgICAgICB0aGlzLnNlc3Npb25zID0gbmV3IHNlc3Npb25fMS5TZXNzaW9uTWFuYWdlcihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG5vcm1hbGl6ZWQpLCB7IGtlcm5lbE1hbmFnZXI6IGtlcm5lbE1hbmFnZXIgfSkpO1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gbmV3IHNldHRpbmdfMS5TZXR0aW5nTWFuYWdlcihub3JtYWxpemVkKTtcbiAgICAgICAgdGhpcy50ZXJtaW5hbHMgPSBuZXcgdGVybWluYWxfMS5UZXJtaW5hbE1hbmFnZXIobm9ybWFsaXplZCk7XG4gICAgICAgIHRoaXMuYnVpbGRlciA9IG5ldyBidWlsZGVyXzEuQnVpbGRNYW5hZ2VyKG5vcm1hbGl6ZWQpO1xuICAgICAgICB0aGlzLndvcmtzcGFjZXMgPSBuZXcgd29ya3NwYWNlXzEuV29ya3NwYWNlTWFuYWdlcihub3JtYWxpemVkKTtcbiAgICAgICAgdGhpcy5uYmNvbnZlcnQgPSBuZXcgbmJjb252ZXJ0XzEuTmJDb252ZXJ0TWFuYWdlcihub3JtYWxpemVkKTtcbiAgICAgICAgdGhpcy5rZXJuZWxzcGVjcyA9IG5ldyBrZXJuZWxzcGVjXzEuS2VybmVsU3BlY01hbmFnZXIobm9ybWFsaXplZCk7XG4gICAgICAgIC8vIFJlbGF5IGNvbm5lY3Rpb24gZmFpbHVyZXMgZnJvbSB0aGUgc2VydmljZSBtYW5hZ2VycyB0aGF0IHBvbGxcbiAgICAgICAgLy8gdGhlIHNlcnZlciBmb3IgY3VycmVudCBpbmZvcm1hdGlvbi5cbiAgICAgICAgdGhpcy5rZXJuZWxzcGVjcy5jb25uZWN0aW9uRmFpbHVyZS5jb25uZWN0KHRoaXMuX29uQ29ubmVjdGlvbkZhaWx1cmUsIHRoaXMpO1xuICAgICAgICB0aGlzLnNlc3Npb25zLmNvbm5lY3Rpb25GYWlsdXJlLmNvbm5lY3QodGhpcy5fb25Db25uZWN0aW9uRmFpbHVyZSwgdGhpcyk7XG4gICAgICAgIHRoaXMudGVybWluYWxzLmNvbm5lY3Rpb25GYWlsdXJlLmNvbm5lY3QodGhpcy5fb25Db25uZWN0aW9uRmFpbHVyZSwgdGhpcyk7XG4gICAgICAgIGNvbnN0IHJlYWR5TGlzdCA9IFt0aGlzLnNlc3Npb25zLnJlYWR5LCB0aGlzLmtlcm5lbHNwZWNzLnJlYWR5XTtcbiAgICAgICAgaWYgKHRoaXMudGVybWluYWxzLmlzQXZhaWxhYmxlKCkpIHtcbiAgICAgICAgICAgIHJlYWR5TGlzdC5wdXNoKHRoaXMudGVybWluYWxzLnJlYWR5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZWFkeVByb21pc2UgPSBQcm9taXNlLmFsbChyZWFkeUxpc3QpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5faXNSZWFkeSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlcmUgaXMgYSBjb25uZWN0aW9uIGZhaWx1cmUgd2l0aCB0aGUga2VybmVsLlxuICAgICAqL1xuICAgIGdldCBjb25uZWN0aW9uRmFpbHVyZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3Rpb25GYWlsdXJlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUZXN0IHdoZXRoZXIgdGhlIHNlcnZpY2UgbWFuYWdlciBpcyBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBtYW5hZ2VyLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgc2lnbmFsaW5nXzEuU2lnbmFsLmNsZWFyRGF0YSh0aGlzKTtcbiAgICAgICAgdGhpcy5jb250ZW50cy5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbnMuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLnRlcm1pbmFscy5kaXNwb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRlc3Qgd2hldGhlciB0aGUgbWFuYWdlciBpcyByZWFkeS5cbiAgICAgKi9cbiAgICBnZXQgaXNSZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzUmVhZHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0aGF0IGZ1bGZpbGxzIHdoZW4gdGhlIG1hbmFnZXIgaXMgcmVhZHkuXG4gICAgICovXG4gICAgZ2V0IHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVhZHlQcm9taXNlO1xuICAgIH1cbiAgICBfb25Db25uZWN0aW9uRmFpbHVyZShzZW5kZXIsIGVycikge1xuICAgICAgICB0aGlzLl9jb25uZWN0aW9uRmFpbHVyZS5lbWl0KGVycik7XG4gICAgfVxufVxuZXhwb3J0cy5TZXJ2aWNlTWFuYWdlciA9IFNlcnZpY2VNYW5hZ2VyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFuYWdlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTmJDb252ZXJ0TWFuYWdlciA9IHZvaWQgMDtcbmNvbnN0IGNvcmV1dGlsc18xID0gcmVxdWlyZShcIkBqdXB5dGVybGFiL2NvcmV1dGlsc1wiKTtcbmNvbnN0IHNlcnZlcmNvbm5lY3Rpb25fMSA9IHJlcXVpcmUoXCIuLi9zZXJ2ZXJjb25uZWN0aW9uXCIpO1xuLyoqXG4gKiBUaGUgdXJsIGZvciB0aGUgbGFiIG5iY29udmVydCBzZXJ2aWNlLlxuICovXG5jb25zdCBOQkNPTlZFUlRfU0VUVElOR1NfVVJMID0gJ2FwaS9uYmNvbnZlcnQnO1xuLyoqXG4gKiBUaGUgbmJjb252ZXJ0IEFQSSBzZXJ2aWNlIG1hbmFnZXIuXG4gKi9cbmNsYXNzIE5iQ29udmVydE1hbmFnZXIge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBuYmNvbnZlcnQgbWFuYWdlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0aGlzLnNlcnZlclNldHRpbmdzID0gKF9hID0gb3B0aW9ucy5zZXJ2ZXJTZXR0aW5ncykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24ubWFrZVNldHRpbmdzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB3aGV0aGVyIHRoZSBhcHBsaWNhdGlvbiBzaG91bGQgYmUgYnVpbHQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0RXhwb3J0Rm9ybWF0cygpIHtcbiAgICAgICAgY29uc3QgYmFzZSA9IHRoaXMuc2VydmVyU2V0dGluZ3MuYmFzZVVybDtcbiAgICAgICAgY29uc3QgdXJsID0gY29yZXV0aWxzXzEuVVJMRXh0LmpvaW4oYmFzZSwgTkJDT05WRVJUX1NFVFRJTkdTX1VSTCk7XG4gICAgICAgIGNvbnN0IHsgc2VydmVyU2V0dGluZ3MgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24ubWFrZVJlcXVlc3QodXJsLCB7fSwgc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IGF3YWl0IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLlJlc3BvbnNlRXJyb3IuY3JlYXRlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBjb25zdCBleHBvcnRMaXN0ID0ge307XG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgICAgICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gZGF0YVtrZXldLm91dHB1dF9taW1ldHlwZTtcbiAgICAgICAgICAgIGV4cG9ydExpc3Rba2V5XSA9IHsgb3V0cHV0X21pbWV0eXBlOiBtaW1lVHlwZSB9O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGV4cG9ydExpc3Q7XG4gICAgfVxufVxuZXhwb3J0cy5OYkNvbnZlcnRNYW5hZ2VyID0gTmJDb252ZXJ0TWFuYWdlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxudmFyIF9hLCBfYiwgX2M7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNlcnZlckNvbm5lY3Rpb24gPSB2b2lkIDA7XG5jb25zdCBjb3JldXRpbHNfMSA9IHJlcXVpcmUoXCJAanVweXRlcmxhYi9jb3JldXRpbHNcIik7XG5sZXQgRkVUQ0g7XG5sZXQgSEVBREVSUztcbmxldCBSRVFVRVNUO1xubGV0IFdFQlNPQ0tFVDtcbmlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgIC8vIE1hbmdsZSB0aGUgcmVxdWlyZSBzdGF0ZW1lbnRzIHNvIGl0IGRvZXMgbm90IGdldCBwaWNrZWQgdXAgaW4gdGhlXG4gICAgLy8gYnJvd3NlciBhc3NldHMuXG4gICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICBjb25zdCBmZXRjaE1vZCA9IHJlcXVpcmUoJ25vZGUtZmV0Y2gnKTtcbiAgICBGRVRDSCA9IChfYSA9IGdsb2JhbC5mZXRjaCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZmV0Y2hNb2Q7XG4gICAgUkVRVUVTVCA9IChfYiA9IGdsb2JhbC5SZXF1ZXN0KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBmZXRjaE1vZC5SZXF1ZXN0O1xuICAgIEhFQURFUlMgPSAoX2MgPSBnbG9iYWwuSGVhZGVycykgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogZmV0Y2hNb2QuSGVhZGVycztcbiAgICBXRUJTT0NLRVQgPSByZXF1aXJlKCd3cycpO1xuICAgIC8qIHRzbGludDplbmFibGUgKi9cbn1cbmVsc2Uge1xuICAgIEZFVENIID0gZmV0Y2g7XG4gICAgUkVRVUVTVCA9IFJlcXVlc3Q7XG4gICAgSEVBREVSUyA9IEhlYWRlcnM7XG4gICAgV0VCU09DS0VUID0gV2ViU29ja2V0O1xufVxuLyoqXG4gKiBUaGUgbmFtZXNwYWNlIGZvciBTZXJ2ZXJDb25uZWN0aW9uIGZ1bmN0aW9ucy5cbiAqXG4gKiAjIyMjIE5vdGVzXG4gKiBUaGlzIGlzIG9ubHkgaW50ZW5kZWQgdG8gbWFuYWdlIGNvbW11bmljYXRpb24gd2l0aCB0aGUgSnVweXRlciBzZXJ2ZXIuXG4gKlxuICogVGhlIGRlZmF1bHQgdmFsdWVzIGNhbiBiZSB1c2VkIGluIGEgSnVweXRlckxhYiBvciBKdXB5dGVyIE5vdGVib29rIGNvbnRleHQuXG4gKlxuICogV2UgdXNlIGB0b2tlbmAgYXV0aGVudGljYXRpb24gaWYgYXZhaWxhYmxlLCBmYWxsaW5nIGJhY2sgb24gYW4gWFNSRlxuICogY29va2llIGlmIG9uZSBoYXMgYmVlbiBwcm92aWRlZCBvbiB0aGUgYGRvY3VtZW50YC5cbiAqXG4gKiBBIGNvbnRlbnQgdHlwZSBvZiBgJ2FwcGxpY2F0aW9uL2pzb24nYCBpcyBhZGRlZCB3aGVuIHVzaW5nIGF1dGhlbnRpY2F0aW9uXG4gKiBhbmQgdGhlcmUgaXMgbm8gYm9keSBkYXRhIHRvIGFsbG93IHRoZSBzZXJ2ZXIgdG8gcHJldmVudCBtYWxpY2lvdXMgZm9ybXMuXG4gKi9cbnZhciBTZXJ2ZXJDb25uZWN0aW9uO1xuKGZ1bmN0aW9uIChTZXJ2ZXJDb25uZWN0aW9uKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgc2V0dGluZ3Mgb2JqZWN0IGdpdmVuIGEgc3Vic2V0IG9mIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIHBhcnRpYWwgc2V0IG9mIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgZnVsbCBzZXR0aW5ncyBvYmplY3QuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbWFrZVNldHRpbmdzKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIFByaXZhdGUubWFrZVNldHRpbmdzKG9wdGlvbnMpO1xuICAgIH1cbiAgICBTZXJ2ZXJDb25uZWN0aW9uLm1ha2VTZXR0aW5ncyA9IG1ha2VTZXR0aW5ncztcbiAgICAvKipcbiAgICAgKiBNYWtlIGFuIHJlcXVlc3QgdG8gdGhlIG5vdGVib29rIHNlcnZlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB1cmwgLSBUaGUgdXJsIGZvciB0aGUgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbml0IC0gVGhlIGluaXRpYWxpemF0aW9uIG9wdGlvbnMgZm9yIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHNldHRpbmdzIC0gVGhlIHNlcnZlciBzZXR0aW5ncyB0byBhcHBseSB0byB0aGUgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlLlxuICAgICAqXG4gICAgICogQHRocm93cyBJZiB0aGUgdXJsIG9mIHRoZSByZXF1ZXN0IGlzIG5vdCBhIG5vdGVib29rIHNlcnZlciB1cmwuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIGB1cmxgIG11c3Qgc3RhcnQgd2l0aCBgc2V0dGluZ3MuYmFzZVVybGAuICBUaGUgYGluaXRgIHNldHRpbmdzIGFyZVxuICAgICAqIG1lcmdlZCB3aXRoIGBzZXR0aW5ncy5pbml0YCwgd2l0aCBgaW5pdGAgdGFraW5nIHByZWNlZGVuY2UuXG4gICAgICogVGhlIGhlYWRlcnMgaW4gdGhlIHR3byBvYmplY3RzIGFyZSBub3QgbWVyZ2VkLlxuICAgICAqIElmIHRoZXJlIGlzIG5vIGJvZHkgZGF0YSwgd2Ugc2V0IHRoZSBjb250ZW50IHR5cGUgdG8gYGFwcGxpY2F0aW9uL2pzb25gXG4gICAgICogYmVjYXVzZSBpdCBpcyByZXF1aXJlZCBieSB0aGUgTm90ZWJvb2sgc2VydmVyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KHVybCwgaW5pdCwgc2V0dGluZ3MpIHtcbiAgICAgICAgcmV0dXJuIFByaXZhdGUuaGFuZGxlUmVxdWVzdCh1cmwsIGluaXQsIHNldHRpbmdzKTtcbiAgICB9XG4gICAgU2VydmVyQ29ubmVjdGlvbi5tYWtlUmVxdWVzdCA9IG1ha2VSZXF1ZXN0O1xuICAgIC8qKlxuICAgICAqIEEgd3JhcHBlZCBlcnJvciBmb3IgYSBmZXRjaCByZXNwb25zZS5cbiAgICAgKi9cbiAgICBjbGFzcyBSZXNwb25zZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgbmV3IHJlc3BvbnNlIGVycm9yLlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IocmVzcG9uc2UsIG1lc3NhZ2UgPSBgSW52YWxpZCByZXNwb25zZTogJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gLCB0cmFjZWJhY2sgPSAnJykge1xuICAgICAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgICAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgICAgICB0aGlzLnRyYWNlYmFjayA9IHRyYWNlYmFjaztcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgUmVzcG9uc2VFcnJvciBmcm9tIGEgcmVzcG9uc2UsIGhhbmRsaW5nIHRoZSB0cmFjZWJhY2sgYW5kIG1lc3NhZ2VcbiAgICAgICAgICogYXMgYXBwcm9wcmlhdGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSByZXNwb25zZSBUaGUgcmVzcG9uc2Ugb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIGEgYFJlc3BvbnNlRXJyb3JgIG9iamVjdC5cbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBhc3luYyBjcmVhdGUocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVsndHJhY2ViYWNrJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihkYXRhWyd0cmFjZWJhY2snXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkYXRhWydtZXNzYWdlJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZUVycm9yKHJlc3BvbnNlLCBkYXRhWydtZXNzYWdlJ10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJlc3BvbnNlRXJyb3IocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2VFcnJvcihyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgU2VydmVyQ29ubmVjdGlvbi5SZXNwb25zZUVycm9yID0gUmVzcG9uc2VFcnJvcjtcbiAgICAvKipcbiAgICAgKiBBIHdyYXBwZWQgZXJyb3IgZm9yIGEgbmV0d29yayBlcnJvci5cbiAgICAgKi9cbiAgICBjbGFzcyBOZXR3b3JrRXJyb3IgZXh0ZW5kcyBUeXBlRXJyb3Ige1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgbmV3IG5ldHdvcmsgZXJyb3IuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihvcmlnaW5hbCkge1xuICAgICAgICAgICAgc3VwZXIob3JpZ2luYWwubWVzc2FnZSk7XG4gICAgICAgICAgICB0aGlzLnN0YWNrID0gb3JpZ2luYWwuc3RhY2s7XG4gICAgICAgIH1cbiAgICB9XG4gICAgU2VydmVyQ29ubmVjdGlvbi5OZXR3b3JrRXJyb3IgPSBOZXR3b3JrRXJyb3I7XG59KShTZXJ2ZXJDb25uZWN0aW9uID0gZXhwb3J0cy5TZXJ2ZXJDb25uZWN0aW9uIHx8IChleHBvcnRzLlNlcnZlckNvbm5lY3Rpb24gPSB7fSkpO1xuLyoqXG4gKiBUaGUgbmFtZXNwYWNlIGZvciBtb2R1bGUgcHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgc2VydmVyIGNvbm5lY3Rpb24gc2V0dGluZ3MsIHJldHVybmluZyBhIG5ldyB2YWx1ZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYWtlU2V0dGluZ3Mob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgcGFnZUJhc2VVcmwgPSBjb3JldXRpbHNfMS5QYWdlQ29uZmlnLmdldEJhc2VVcmwoKTtcbiAgICAgICAgY29uc3QgcGFnZVdzVXJsID0gY29yZXV0aWxzXzEuUGFnZUNvbmZpZy5nZXRXc1VybCgpO1xuICAgICAgICBjb25zdCBiYXNlVXJsID0gY29yZXV0aWxzXzEuVVJMRXh0Lm5vcm1hbGl6ZShvcHRpb25zLmJhc2VVcmwpIHx8IHBhZ2VCYXNlVXJsO1xuICAgICAgICBsZXQgd3NVcmwgPSBvcHRpb25zLndzVXJsO1xuICAgICAgICAvLyBQcmVmZXIgdGhlIGRlZmF1bHQgd3NVcmwgaWYgd2UgYXJlIHVzaW5nIHRoZSBkZWZhdWx0IGJhc2VVcmwuXG4gICAgICAgIGlmICghd3NVcmwgJiYgYmFzZVVybCA9PT0gcGFnZUJhc2VVcmwpIHtcbiAgICAgICAgICAgIHdzVXJsID0gcGFnZVdzVXJsO1xuICAgICAgICB9XG4gICAgICAgIC8vIE90aGVyd2lzZSBjb252ZXJ0IHRoZSBiYXNlVXJsIHRvIGEgd3NVcmwgaWYgcG9zc2libGUuXG4gICAgICAgIGlmICghd3NVcmwgJiYgYmFzZVVybC5pbmRleE9mKCdodHRwJykgPT09IDApIHtcbiAgICAgICAgICAgIHdzVXJsID0gJ3dzJyArIGJhc2VVcmwuc2xpY2UoNCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3RoZXJ3aXNlIGZhbGwgYmFjayBvbiB0aGUgZGVmYXVsdCB3c1VybC5cbiAgICAgICAgd3NVcmwgPSB3c1VybCAhPT0gbnVsbCAmJiB3c1VybCAhPT0gdm9pZCAwID8gd3NVcmwgOiBwYWdlV3NVcmw7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oeyBpbml0OiB7IGNhY2hlOiAnbm8tc3RvcmUnLCBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyB9LCBmZXRjaDogRkVUQ0gsIEhlYWRlcnM6IEhFQURFUlMsIFJlcXVlc3Q6IFJFUVVFU1QsIFdlYlNvY2tldDogV0VCU09DS0VULCB0b2tlbjogY29yZXV0aWxzXzEuUGFnZUNvbmZpZy5nZXRUb2tlbigpLCBhcHBVcmw6IGNvcmV1dGlsc18xLlBhZ2VDb25maWcuZ2V0T3B0aW9uKCdhcHBVcmwnKSwgYXBwZW5kVG9rZW46IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgICAgICAgICAgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgICAgICAoKF9hID0gcHJvY2VzcyA9PT0gbnVsbCB8fCBwcm9jZXNzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcm9jZXNzLmVudikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLkpFU1RfV09SS0VSX0lEKSAhPT0gdW5kZWZpbmVkKSB8fFxuICAgICAgICAgICAgICAgIGNvcmV1dGlsc18xLlVSTEV4dC5nZXRIb3N0TmFtZShwYWdlQmFzZVVybCkgIT09IGNvcmV1dGlsc18xLlVSTEV4dC5nZXRIb3N0TmFtZSh3c1VybCkgfSwgb3B0aW9ucyksIHsgYmFzZVVybCxcbiAgICAgICAgICAgIHdzVXJsIH0pO1xuICAgIH1cbiAgICBQcml2YXRlLm1ha2VTZXR0aW5ncyA9IG1ha2VTZXR0aW5ncztcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHVybCAtIFRoZSB1cmwgZm9yIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGluaXQgLSBUaGUgb3ZlcnJpZGVzIGZvciB0aGUgcmVxdWVzdCBpbml0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHNldHRpbmdzIC0gVGhlIHNldHRpbmdzIG9iamVjdCBmb3IgdGhlIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIGB1cmxgIG11c3Qgc3RhcnQgd2l0aCBgc2V0dGluZ3MuYmFzZVVybGAuICBUaGUgYGluaXRgIHNldHRpbmdzXG4gICAgICogdGFrZSBwcmVjZWRlbmNlIG92ZXIgYHNldHRpbmdzLmluaXRgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhbmRsZVJlcXVlc3QodXJsLCBpbml0LCBzZXR0aW5ncykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIEhhbmRsZSBub3RlYm9vayBzZXJ2ZXIgcmVxdWVzdHMuXG4gICAgICAgIGlmICh1cmwuaW5kZXhPZihzZXR0aW5ncy5iYXNlVXJsKSAhPT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gb25seSBiZSB1c2VkIGZvciBub3RlYm9vayBzZXJ2ZXIgcmVxdWVzdHMnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBVc2UgZXhwbGljaXQgY2FjaGUgYnVzdGVyIHdoZW4gYG5vLXN0b3JlYCBpcyBzZXQgc2luY2VcbiAgICAgICAgLy8gbm90IGFsbCBicm93c2VycyB1c2UgaXQgcHJvcGVybHkuXG4gICAgICAgIGNvbnN0IGNhY2hlID0gKF9hID0gaW5pdC5jYWNoZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogc2V0dGluZ3MuaW5pdC5jYWNoZTtcbiAgICAgICAgaWYgKGNhY2hlID09PSAnbm8tc3RvcmUnKSB7XG4gICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvWE1MSHR0cFJlcXVlc3QvVXNpbmdfWE1MSHR0cFJlcXVlc3QjQnlwYXNzaW5nX3RoZV9jYWNoZVxuICAgICAgICAgICAgdXJsICs9ICgvXFw/Ly50ZXN0KHVybCkgPyAnJicgOiAnPycpICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBzZXR0aW5ncy5SZXF1ZXN0KHVybCwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBzZXR0aW5ncy5pbml0KSwgaW5pdCkpO1xuICAgICAgICAvLyBIYW5kbGUgYXV0aGVudGljYXRpb24uIEF1dGhlbnRpY2F0aW9uIGNhbiBiZSBvdmVyZGV0ZXJtaW5lZCBieVxuICAgICAgICAvLyBzZXR0aW5ncyB0b2tlbiBhbmQgWFNSRiB0b2tlbi5cbiAgICAgICAgbGV0IGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHNldHRpbmdzLnRva2VuKSB7XG4gICAgICAgICAgICBhdXRoZW50aWNhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBgdG9rZW4gJHtzZXR0aW5ncy50b2tlbn1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiAoZG9jdW1lbnQgPT09IG51bGwgfHwgZG9jdW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRvY3VtZW50LmNvb2tpZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHhzcmZUb2tlbiA9IGdldENvb2tpZSgnX3hzcmYnKTtcbiAgICAgICAgICAgIGlmICh4c3JmVG9rZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5hcHBlbmQoJ1gtWFNSRlRva2VuJywgeHNyZlRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgdGhlIGNvbnRlbnQgdHlwZSBpZiB0aGVyZSBpcyBubyBnaXZlbiBkYXRhIGFuZCB3ZSBhcmVcbiAgICAgICAgLy8gdXNpbmcgYW4gYXV0aGVudGljYXRlZCBjb25uZWN0aW9uLlxuICAgICAgICBpZiAoIXJlcXVlc3QuaGVhZGVycy5oYXMoJ0NvbnRlbnQtVHlwZScpICYmIGF1dGhlbnRpY2F0ZWQpIHtcbiAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXNlIGBjYWxsYCB0byBhdm9pZCBhIGBUeXBlRXJyb3JgIGluIHRoZSBicm93c2VyLlxuICAgICAgICByZXR1cm4gc2V0dGluZ3MuZmV0Y2guY2FsbChudWxsLCByZXF1ZXN0KS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgLy8gQ29udmVydCB0aGUgVHlwZUVycm9yIGludG8gYSBtb3JlIHNwZWNpZmljIGVycm9yLlxuICAgICAgICAgICAgdGhyb3cgbmV3IFNlcnZlckNvbm5lY3Rpb24uTmV0d29ya0Vycm9yKGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gVE9ETzogKnRoaXMqIGlzIHByb2JhYmx5IHdoZXJlIHdlIG5lZWQgYSBzeXN0ZW0td2lkZSBjb25uZWN0aW9uRmFpbHVyZVxuICAgICAgICAvLyBzaWduYWwgd2UgY2FuIGhvb2sgaW50by5cbiAgICB9XG4gICAgUHJpdmF0ZS5oYW5kbGVSZXF1ZXN0ID0gaGFuZGxlUmVxdWVzdDtcbiAgICAvKipcbiAgICAgKiBHZXQgYSBjb29raWUgZnJvbSB0aGUgZG9jdW1lbnQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0Q29va2llKG5hbWUpIHtcbiAgICAgICAgLy8gRnJvbSBodHRwOi8vd3d3LnRvcm5hZG93ZWIub3JnL2VuL3N0YWJsZS9ndWlkZS9zZWN1cml0eS5odG1sXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBkb2N1bWVudC5jb29raWUubWF0Y2goJ1xcXFxiJyArIG5hbWUgKyAnPShbXjtdKilcXFxcYicpO1xuICAgICAgICByZXR1cm4gbWF0Y2hlcyA9PT0gbnVsbCB8fCBtYXRjaGVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtYXRjaGVzWzFdO1xuICAgIH1cbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VydmVyY29ubmVjdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2Vzc2lvbkNvbm5lY3Rpb24gPSB2b2lkIDA7XG5jb25zdCBzaWduYWxpbmdfMSA9IHJlcXVpcmUoXCJAbHVtaW5vL3NpZ25hbGluZ1wiKTtcbmNvbnN0IF9fMSA9IHJlcXVpcmUoXCIuLlwiKTtcbmNvbnN0IHJlc3RhcGlfMSA9IHJlcXVpcmUoXCIuL3Jlc3RhcGlcIik7XG5jb25zdCBjb3JldXRpbHNfMSA9IHJlcXVpcmUoXCJAbHVtaW5vL2NvcmV1dGlsc1wiKTtcbi8qKlxuICogU2Vzc2lvbiBvYmplY3QgZm9yIGFjY2Vzc2luZyB0aGUgc2Vzc2lvbiBSRVNUIGFwaS4gVGhlIHNlc3Npb25cbiAqIHNob3VsZCBiZSB1c2VkIHRvIHN0YXJ0IGtlcm5lbHMgYW5kIHRoZW4gc2h1dCB0aGVtIGRvd24gLS0gZm9yXG4gKiBhbGwgb3RoZXIga2VybmVsIG9wZXJhdGlvbnMsIHRoZSBrZXJuZWwgb2JqZWN0IHNob3VsZCBiZSB1c2VkLlxuICovXG5jbGFzcyBTZXNzaW9uQ29ubmVjdGlvbiB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IHNlc3Npb24uXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgIHRoaXMuX2lkID0gJyc7XG4gICAgICAgIHRoaXMuX3BhdGggPSAnJztcbiAgICAgICAgdGhpcy5fbmFtZSA9ICcnO1xuICAgICAgICB0aGlzLl90eXBlID0gJyc7XG4gICAgICAgIHRoaXMuX2tlcm5lbCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGlzcG9zZWQgPSBuZXcgc2lnbmFsaW5nXzEuU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9rZXJuZWxDaGFuZ2VkID0gbmV3IHNpZ25hbGluZ18xLlNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fc3RhdHVzQ2hhbmdlZCA9IG5ldyBzaWduYWxpbmdfMS5TaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkID0gbmV3IHNpZ25hbGluZ18xLlNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fcGVuZGluZ0lucHV0ID0gbmV3IHNpZ25hbGluZ18xLlNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5faW9wdWJNZXNzYWdlID0gbmV3IHNpZ25hbGluZ18xLlNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fdW5oYW5kbGVkTWVzc2FnZSA9IG5ldyBzaWduYWxpbmdfMS5TaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2FueU1lc3NhZ2UgPSBuZXcgc2lnbmFsaW5nXzEuU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9wcm9wZXJ0eUNoYW5nZWQgPSBuZXcgc2lnbmFsaW5nXzEuU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9pZCA9IG9wdGlvbnMubW9kZWwuaWQ7XG4gICAgICAgIHRoaXMuX25hbWUgPSBvcHRpb25zLm1vZGVsLm5hbWU7XG4gICAgICAgIHRoaXMuX3BhdGggPSBvcHRpb25zLm1vZGVsLnBhdGg7XG4gICAgICAgIHRoaXMuX3R5cGUgPSBvcHRpb25zLm1vZGVsLnR5cGU7XG4gICAgICAgIHRoaXMuX3VzZXJuYW1lID0gKF9hID0gb3B0aW9ucy51c2VybmFtZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJyc7XG4gICAgICAgIHRoaXMuX2NsaWVudElkID0gKF9iID0gb3B0aW9ucy5jbGllbnRJZCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogY29yZXV0aWxzXzEuVVVJRC51dWlkNCgpO1xuICAgICAgICB0aGlzLl9jb25uZWN0VG9LZXJuZWwgPSBvcHRpb25zLmNvbm5lY3RUb0tlcm5lbDtcbiAgICAgICAgdGhpcy5fa2VybmVsQ29ubmVjdGlvbk9wdGlvbnMgPSAoX2MgPSBvcHRpb25zLmtlcm5lbENvbm5lY3Rpb25PcHRpb25zKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiB7fTtcbiAgICAgICAgdGhpcy5zZXJ2ZXJTZXR0aW5ncyA9IChfZCA9IG9wdGlvbnMuc2VydmVyU2V0dGluZ3MpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IF9fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VTZXR0aW5ncygpO1xuICAgICAgICB0aGlzLnNldHVwS2VybmVsKG9wdGlvbnMubW9kZWwua2VybmVsKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBzZXNzaW9uIGlzIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBkaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3Bvc2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIGtlcm5lbCBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGdldCBrZXJuZWxDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fa2VybmVsQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgcHJveGllZCBmcm9tIHRoZSBjb25uZWN0aW9uIGFib3V0IHRoZSBrZXJuZWwgc3RhdHVzLlxuICAgICAqL1xuICAgIGdldCBzdGF0dXNDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHVzQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgcHJveGllZCBmcm9tIHRoZSBrZXJuZWwgYWJvdXQgdGhlIGNvbm5lY3Rpb24gc3RhdHVzLlxuICAgICAqL1xuICAgIGdldCBjb25uZWN0aW9uU3RhdHVzQ2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBwcm94aWVkIGZyb20gdGhlIGtlcm5lbCBwZW5kaW5nIGlucHV0LlxuICAgICAqL1xuICAgIGdldCBwZW5kaW5nSW5wdXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wZW5kaW5nSW5wdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIHByb3hpZWQgZnJvbSB0aGUga2VybmVsIGFib3V0IGlvcHViIGtlcm5lbCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBnZXQgaW9wdWJNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW9wdWJNZXNzYWdlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBwcm94aWVkIGZyb20gdGhlIGtlcm5lbCBmb3IgYW4gdW5oYW5kbGVkIGtlcm5lbCBtZXNzYWdlLlxuICAgICAqL1xuICAgIGdldCB1bmhhbmRsZWRNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdW5oYW5kbGVkTWVzc2FnZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgcHJveGllZCBmcm9tIHRoZSBrZXJuZWwgZW1pdHRlZCBmb3IgYW55IGtlcm5lbCBtZXNzYWdlLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSBiZWhhdmlvciBpcyB1bmRlZmluZWQgaWYgdGhlIG1lc3NhZ2UgaXMgbW9kaWZpZWQgZHVyaW5nIG1lc3NhZ2VcbiAgICAgKiBoYW5kbGluZy4gQXMgc3VjaCwgaXQgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgcmVhZC1vbmx5LlxuICAgICAqL1xuICAgIGdldCBhbnlNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW55TWVzc2FnZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIGEgc2Vzc2lvbiBwcm9wZXJ0eSBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGdldCBwcm9wZXJ0eUNoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0eUNoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgc2Vzc2lvbiBpZC5cbiAgICAgKi9cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzZXNzaW9uIGtlcm5lbCBjb25uZWN0aW9uIG9iamVjdC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGlzIGEgcmVhZC1vbmx5IHByb3BlcnR5LCBhbmQgY2FuIGJlIGFsdGVyZWQgYnkgW2NoYW5nZUtlcm5lbF0uXG4gICAgICovXG4gICAgZ2V0IGtlcm5lbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tlcm5lbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzZXNzaW9uIHBhdGguXG4gICAgICovXG4gICAgZ2V0IHBhdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHNlc3Npb24gdHlwZS5cbiAgICAgKi9cbiAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgc2Vzc2lvbiBuYW1lLlxuICAgICAqL1xuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBtb2RlbCBhc3NvY2lhdGVkIHdpdGggdGhlIHNlc3Npb24uXG4gICAgICovXG4gICAgZ2V0IG1vZGVsKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgICAgICBrZXJuZWw6IHRoaXMua2VybmVsICYmIHsgaWQ6IHRoaXMua2VybmVsLmlkLCBuYW1lOiB0aGlzLmtlcm5lbC5uYW1lIH0sXG4gICAgICAgICAgICBwYXRoOiB0aGlzLl9wYXRoLFxuICAgICAgICAgICAgdHlwZTogdGhpcy5fdHlwZSxcbiAgICAgICAgICAgIG5hbWU6IHRoaXMuX25hbWVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIHRoZSBzZXNzaW9uIGhhcyBiZWVuIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBpc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEaXNwb3NlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBzZXNzaW9uIGJhc2VkIG9uIGEgc2Vzc2lvbiBtb2RlbCBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBvbmx5IHVwZGF0ZXMgdGhpcyBzZXNzaW9uIGNvbm5lY3Rpb24gaW5zdGFuY2UuIFVzZSBgc2V0UGF0aGAsXG4gICAgICogYHNldE5hbWVgLCBgc2V0VHlwZWAsIGFuZCBgY2hhbmdlS2VybmVsYCB0byBjaGFuZ2UgdGhlIHNlc3Npb24gdmFsdWVzIG9uXG4gICAgICogdGhlIHNlcnZlci5cbiAgICAgKi9cbiAgICB1cGRhdGUobW9kZWwpIHtcbiAgICAgICAgY29uc3Qgb2xkTW9kZWwgPSB0aGlzLm1vZGVsO1xuICAgICAgICB0aGlzLl9wYXRoID0gbW9kZWwucGF0aDtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG1vZGVsLm5hbWU7XG4gICAgICAgIHRoaXMuX3R5cGUgPSBtb2RlbC50eXBlO1xuICAgICAgICBpZiAoKHRoaXMuX2tlcm5lbCA9PT0gbnVsbCAmJiBtb2RlbC5rZXJuZWwgIT09IG51bGwpIHx8XG4gICAgICAgICAgICAodGhpcy5fa2VybmVsICE9PSBudWxsICYmIG1vZGVsLmtlcm5lbCA9PT0gbnVsbCkgfHxcbiAgICAgICAgICAgICh0aGlzLl9rZXJuZWwgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICBtb2RlbC5rZXJuZWwgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICB0aGlzLl9rZXJuZWwuaWQgIT09IG1vZGVsLmtlcm5lbC5pZCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9rZXJuZWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9rZXJuZWwuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLl9rZXJuZWwgfHwgbnVsbDtcbiAgICAgICAgICAgIHRoaXMuc2V0dXBLZXJuZWwobW9kZWwua2VybmVsKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5fa2VybmVsIHx8IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9rZXJuZWxDaGFuZ2VkLmVtaXQoeyBuYW1lOiAna2VybmVsJywgb2xkVmFsdWUsIG5ld1ZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2hhbmRsZU1vZGVsQ2hhbmdlKG9sZE1vZGVsKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIHNlc3Npb24uXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9kaXNwb3NlZC5lbWl0KCk7XG4gICAgICAgIGlmICh0aGlzLl9rZXJuZWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2tlcm5lbC5kaXNwb3NlKCk7XG4gICAgICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuX2tlcm5lbDtcbiAgICAgICAgICAgIHRoaXMuX2tlcm5lbCA9IG51bGw7XG4gICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuX2tlcm5lbDtcbiAgICAgICAgICAgIHRoaXMuX2tlcm5lbENoYW5nZWQuZW1pdCh7IG5hbWU6ICdrZXJuZWwnLCBvbGRWYWx1ZSwgbmV3VmFsdWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2lnbmFsaW5nXzEuU2lnbmFsLmNsZWFyRGF0YSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hhbmdlIHRoZSBzZXNzaW9uIHBhdGguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCAtIFRoZSBuZXcgc2Vzc2lvbiBwYXRoLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgc2Vzc2lvbiBoYXMgcmVuYW1lZC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIHVzZXMgdGhlIEp1cHl0ZXIgUkVTVCBBUEksIGFuZCB0aGUgcmVzcG9uc2UgaXMgdmFsaWRhdGVkLlxuICAgICAqIFRoZSBwcm9taXNlIGlzIGZ1bGZpbGxlZCBvbiBhIHZhbGlkIHJlc3BvbnNlIGFuZCByZWplY3RlZCBvdGhlcndpc2UuXG4gICAgICovXG4gICAgYXN5bmMgc2V0UGF0aChwYXRoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2Vzc2lvbiBpcyBkaXNwb3NlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuX3BhdGNoKHsgcGF0aCB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hhbmdlIHRoZSBzZXNzaW9uIG5hbWUuXG4gICAgICovXG4gICAgYXN5bmMgc2V0TmFtZShuYW1lKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2Vzc2lvbiBpcyBkaXNwb3NlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuX3BhdGNoKHsgbmFtZSB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hhbmdlIHRoZSBzZXNzaW9uIHR5cGUuXG4gICAgICovXG4gICAgYXN5bmMgc2V0VHlwZSh0eXBlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2Vzc2lvbiBpcyBkaXNwb3NlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuX3BhdGNoKHsgdHlwZSB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hhbmdlIHRoZSBrZXJuZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW1zIG9wdGlvbnMgLSBUaGUgbmFtZSBvciBpZCBvZiB0aGUgbmV3IGtlcm5lbC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIHNodXRzIGRvd24gdGhlIGV4aXN0aW5nIGtlcm5lbCBhbmQgY3JlYXRlcyBhIG5ldyBrZXJuZWwsXG4gICAgICoga2VlcGluZyB0aGUgZXhpc3Rpbmcgc2Vzc2lvbiBJRCBhbmQgc2Vzc2lvbiBwYXRoLlxuICAgICAqL1xuICAgIGFzeW5jIGNoYW5nZUtlcm5lbChvcHRpb25zKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2Vzc2lvbiBpcyBkaXNwb3NlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuX3BhdGNoKHsga2VybmVsOiBvcHRpb25zIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5rZXJuZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEtpbGwgdGhlIGtlcm5lbCBhbmQgc2h1dGRvd24gdGhlIHNlc3Npb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIFRoZSBwcm9taXNlIGZ1bGZpbGxlZCBvbiBhIHZhbGlkIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlci5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBVc2VzIHRoZSBbSnVweXRlciBOb3RlYm9vayBBUEldKGh0dHA6Ly9wZXRzdG9yZS5zd2FnZ2VyLmlvLz91cmw9aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2p1cHl0ZXIvbm90ZWJvb2svbWFzdGVyL25vdGVib29rL3NlcnZpY2VzL2FwaS9hcGkueWFtbCMhL3Nlc3Npb25zKSwgYW5kIHZhbGlkYXRlcyB0aGUgcmVzcG9uc2UuXG4gICAgICogRGlzcG9zZXMgb2YgdGhlIHNlc3Npb24gYW5kIGVtaXRzIGEgW3Nlc3Npb25EaWVkXSBzaWduYWwgb24gc3VjY2Vzcy5cbiAgICAgKi9cbiAgICBhc3luYyBzaHV0ZG93bigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZXNzaW9uIGlzIGRpc3Bvc2VkJyk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgcmVzdGFwaV8xLnNodXRkb3duU2Vzc2lvbih0aGlzLmlkLCB0aGlzLnNlcnZlclNldHRpbmdzKTtcbiAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBrZXJuZWwgY29ubmVjdGlvbiBhbmQgY29ubmVjdCB0byBpdHMgc2lnbmFscy5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBub3QgbWVhbnQgdG8gYmUgc3ViY2xhc3NlZC5cbiAgICAgKi9cbiAgICBzZXR1cEtlcm5lbChtb2RlbCkge1xuICAgICAgICBpZiAobW9kZWwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2tlcm5lbCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga2MgPSB0aGlzLl9jb25uZWN0VG9LZXJuZWwoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9rZXJuZWxDb25uZWN0aW9uT3B0aW9ucyksIHsgbW9kZWwsIHVzZXJuYW1lOiB0aGlzLl91c2VybmFtZSwgY2xpZW50SWQ6IHRoaXMuX2NsaWVudElkLCBzZXJ2ZXJTZXR0aW5nczogdGhpcy5zZXJ2ZXJTZXR0aW5ncyB9KSk7XG4gICAgICAgIHRoaXMuX2tlcm5lbCA9IGtjO1xuICAgICAgICBrYy5zdGF0dXNDaGFuZ2VkLmNvbm5lY3QodGhpcy5vbktlcm5lbFN0YXR1cywgdGhpcyk7XG4gICAgICAgIGtjLmNvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkLmNvbm5lY3QodGhpcy5vbktlcm5lbENvbm5lY3Rpb25TdGF0dXMsIHRoaXMpO1xuICAgICAgICBrYy5wZW5kaW5nSW5wdXQuY29ubmVjdCh0aGlzLm9uUGVuZGluZ0lucHV0LCB0aGlzKTtcbiAgICAgICAga2MudW5oYW5kbGVkTWVzc2FnZS5jb25uZWN0KHRoaXMub25VbmhhbmRsZWRNZXNzYWdlLCB0aGlzKTtcbiAgICAgICAga2MuaW9wdWJNZXNzYWdlLmNvbm5lY3QodGhpcy5vbklPUHViTWVzc2FnZSwgdGhpcyk7XG4gICAgICAgIGtjLmFueU1lc3NhZ2UuY29ubmVjdCh0aGlzLm9uQW55TWVzc2FnZSwgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0byBjaGFuZ2VzIGluIHRoZSBLZXJuZWwgc3RhdHVzLlxuICAgICAqL1xuICAgIG9uS2VybmVsU3RhdHVzKHNlbmRlciwgc3RhdGUpIHtcbiAgICAgICAgdGhpcy5fc3RhdHVzQ2hhbmdlZC5lbWl0KHN0YXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRvIGNoYW5nZXMgaW4gdGhlIEtlcm5lbCBzdGF0dXMuXG4gICAgICovXG4gICAgb25LZXJuZWxDb25uZWN0aW9uU3RhdHVzKHNlbmRlciwgc3RhdGUpIHtcbiAgICAgICAgdGhpcy5fY29ubmVjdGlvblN0YXR1c0NoYW5nZWQuZW1pdChzdGF0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSBpbiB0aGUgcGVuZGluZ0lucHV0LlxuICAgICAqL1xuICAgIG9uUGVuZGluZ0lucHV0KHNlbmRlciwgc3RhdGUpIHtcbiAgICAgICAgdGhpcy5fcGVuZGluZ0lucHV0LmVtaXQoc3RhdGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgaW9wdWIga2VybmVsIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIG9uSU9QdWJNZXNzYWdlKHNlbmRlciwgbXNnKSB7XG4gICAgICAgIHRoaXMuX2lvcHViTWVzc2FnZS5lbWl0KG1zZyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB1bmhhbmRsZWQga2VybmVsIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIG9uVW5oYW5kbGVkTWVzc2FnZShzZW5kZXIsIG1zZykge1xuICAgICAgICB0aGlzLl91bmhhbmRsZWRNZXNzYWdlLmVtaXQobXNnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGFueSBrZXJuZWwgbWVzc2FnZXMuXG4gICAgICovXG4gICAgb25BbnlNZXNzYWdlKHNlbmRlciwgYXJncykge1xuICAgICAgICB0aGlzLl9hbnlNZXNzYWdlLmVtaXQoYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmQgYSBQQVRDSCB0byB0aGUgc2VydmVyLCB1cGRhdGluZyB0aGUgc2Vzc2lvbiBwYXRoIG9yIHRoZSBrZXJuZWwuXG4gICAgICovXG4gICAgYXN5bmMgX3BhdGNoKGJvZHkpIHtcbiAgICAgICAgY29uc3QgbW9kZWwgPSBhd2FpdCByZXN0YXBpXzEudXBkYXRlU2Vzc2lvbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGJvZHkpLCB7IGlkOiB0aGlzLl9pZCB9KSwgdGhpcy5zZXJ2ZXJTZXR0aW5ncyk7XG4gICAgICAgIHRoaXMudXBkYXRlKG1vZGVsKTtcbiAgICAgICAgcmV0dXJuIG1vZGVsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIG1vZGVsLlxuICAgICAqL1xuICAgIF9oYW5kbGVNb2RlbENoYW5nZShvbGRNb2RlbCkge1xuICAgICAgICBpZiAob2xkTW9kZWwubmFtZSAhPT0gdGhpcy5fbmFtZSkge1xuICAgICAgICAgICAgdGhpcy5fcHJvcGVydHlDaGFuZ2VkLmVtaXQoJ25hbWUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2xkTW9kZWwudHlwZSAhPT0gdGhpcy5fdHlwZSkge1xuICAgICAgICAgICAgdGhpcy5fcHJvcGVydHlDaGFuZ2VkLmVtaXQoJ3R5cGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2xkTW9kZWwucGF0aCAhPT0gdGhpcy5fcGF0aCkge1xuICAgICAgICAgICAgdGhpcy5fcHJvcGVydHlDaGFuZ2VkLmVtaXQoJ3BhdGgnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuU2Vzc2lvbkNvbm5lY3Rpb24gPSBTZXNzaW9uQ29ubmVjdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlZmF1bHQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNlc3Npb25BUEkgPSBleHBvcnRzLlNlc3Npb24gPSB2b2lkIDA7XG5jb25zdCBTZXNzaW9uID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3Nlc3Npb25cIikpO1xuZXhwb3J0cy5TZXNzaW9uID0gU2Vzc2lvbjtcbmNvbnN0IFNlc3Npb25BUEkgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vcmVzdGFwaVwiKSk7XG5leHBvcnRzLlNlc3Npb25BUEkgPSBTZXNzaW9uQVBJO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL21hbmFnZXJcIiksIGV4cG9ydHMpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNlc3Npb25NYW5hZ2VyID0gdm9pZCAwO1xuY29uc3QgYWxnb3JpdGhtXzEgPSByZXF1aXJlKFwiQGx1bWluby9hbGdvcml0aG1cIik7XG5jb25zdCBwb2xsaW5nXzEgPSByZXF1aXJlKFwiQGx1bWluby9wb2xsaW5nXCIpO1xuY29uc3Qgc2lnbmFsaW5nXzEgPSByZXF1aXJlKFwiQGx1bWluby9zaWduYWxpbmdcIik7XG5jb25zdCBzZXJ2ZXJjb25uZWN0aW9uXzEgPSByZXF1aXJlKFwiLi4vc2VydmVyY29ubmVjdGlvblwiKTtcbmNvbnN0IGJhc2VtYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi4vYmFzZW1hbmFnZXJcIik7XG5jb25zdCBkZWZhdWx0XzEgPSByZXF1aXJlKFwiLi9kZWZhdWx0XCIpO1xuY29uc3QgcmVzdGFwaV8xID0gcmVxdWlyZShcIi4vcmVzdGFwaVwiKTtcbi8qKlxuICogQW4gaW1wbGVtZW50YXRpb24gb2YgYSBzZXNzaW9uIG1hbmFnZXIuXG4gKi9cbmNsYXNzIFNlc3Npb25NYW5hZ2VyIGV4dGVuZHMgYmFzZW1hbmFnZXJfMS5CYXNlTWFuYWdlciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IHNlc3Npb24gbWFuYWdlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIGRlZmF1bHQgb3B0aW9ucyBmb3IgZWFjaCBzZXNzaW9uLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5faXNSZWFkeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zZXNzaW9uQ29ubmVjdGlvbnMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuX21vZGVscyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fcnVubmluZ0NoYW5nZWQgPSBuZXcgc2lnbmFsaW5nXzEuU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9jb25uZWN0aW9uRmFpbHVyZSA9IG5ldyBzaWduYWxpbmdfMS5TaWduYWwodGhpcyk7XG4gICAgICAgIC8vIFdlIGRlZmluZSB0aGVzZSBoZXJlIHNvIHRoZXkgYmluZCBgdGhpc2AgY29ycmVjdGx5XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RUb0tlcm5lbCA9IChvcHRpb25zKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fa2VybmVsTWFuYWdlci5jb25uZWN0VG8ob3B0aW9ucyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2tlcm5lbE1hbmFnZXIgPSBvcHRpb25zLmtlcm5lbE1hbmFnZXI7XG4gICAgICAgIC8vIFN0YXJ0IG1vZGVsIHBvbGxpbmcgd2l0aCBleHBvbmVudGlhbCBiYWNrb2ZmLlxuICAgICAgICB0aGlzLl9wb2xsTW9kZWxzID0gbmV3IHBvbGxpbmdfMS5Qb2xsKHtcbiAgICAgICAgICAgIGF1dG86IGZhbHNlLFxuICAgICAgICAgICAgZmFjdG9yeTogKCkgPT4gdGhpcy5yZXF1ZXN0UnVubmluZygpLFxuICAgICAgICAgICAgZnJlcXVlbmN5OiB7XG4gICAgICAgICAgICAgICAgaW50ZXJ2YWw6IDEwICogMTAwMCxcbiAgICAgICAgICAgICAgICBiYWNrb2ZmOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1heDogMzAwICogMTAwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hbWU6IGBAanVweXRlcmxhYi9zZXJ2aWNlczpTZXNzaW9uTWFuYWdlciNtb2RlbHNgLFxuICAgICAgICAgICAgc3RhbmRieTogKF9hID0gb3B0aW9ucy5zdGFuZGJ5KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnd2hlbi1oaWRkZW4nXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBJbml0aWFsaXplIGludGVybmFsIGRhdGEuXG4gICAgICAgIHRoaXMuX3JlYWR5ID0gKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3BvbGxNb2RlbHMuc3RhcnQoKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3BvbGxNb2RlbHMudGljaztcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX2tlcm5lbE1hbmFnZXIucmVhZHk7XG4gICAgICAgICAgICB0aGlzLl9pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgfSkoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIHRoZSBtYW5hZ2VyIGlzIHJlYWR5LlxuICAgICAqL1xuICAgIGdldCBpc1JlYWR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNSZWFkeTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgd2hlbiB0aGUgbWFuYWdlciBpcyByZWFkeS5cbiAgICAgKi9cbiAgICBnZXQgcmVhZHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFkeTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBydW5uaW5nIHNlc3Npb25zIGNoYW5nZS5cbiAgICAgKi9cbiAgICBnZXQgcnVubmluZ0NoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ydW5uaW5nQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZXJlIGlzIGEgY29ubmVjdGlvbiBmYWlsdXJlLlxuICAgICAqL1xuICAgIGdldCBjb25uZWN0aW9uRmFpbHVyZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3Rpb25GYWlsdXJlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgdXNlZCBieSB0aGUgbWFuYWdlci5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbW9kZWxzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuX3Nlc3Npb25Db25uZWN0aW9ucy5mb3JFYWNoKHggPT4geC5kaXNwb3NlKCkpO1xuICAgICAgICB0aGlzLl9wb2xsTW9kZWxzLmRpc3Bvc2UoKTtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKlxuICAgICAqIENvbm5lY3QgdG8gYSBydW5uaW5nIHNlc3Npb24uICBTZWUgYWxzbyBbW2Nvbm5lY3RUb1Nlc3Npb25dXS5cbiAgICAgKi9cbiAgICBjb25uZWN0VG8ob3B0aW9ucykge1xuICAgICAgICBjb25zdCBzZXNzaW9uQ29ubmVjdGlvbiA9IG5ldyBkZWZhdWx0XzEuU2Vzc2lvbkNvbm5lY3Rpb24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBjb25uZWN0VG9LZXJuZWw6IHRoaXMuX2Nvbm5lY3RUb0tlcm5lbCwgc2VydmVyU2V0dGluZ3M6IHRoaXMuc2VydmVyU2V0dGluZ3MgfSkpO1xuICAgICAgICB0aGlzLl9vblN0YXJ0ZWQoc2Vzc2lvbkNvbm5lY3Rpb24pO1xuICAgICAgICBpZiAoIXRoaXMuX21vZGVscy5oYXMob3B0aW9ucy5tb2RlbC5pZCkpIHtcbiAgICAgICAgICAgIC8vIFdlIHRydXN0IHRoZSB1c2VyIHRvIGNvbm5lY3QgdG8gYW4gZXhpc3Rpbmcgc2Vzc2lvbiwgYnV0IHdlIHZlcmlmeVxuICAgICAgICAgICAgLy8gYXN5bmNocm9ub3VzbHkuXG4gICAgICAgICAgICB2b2lkIHRoaXMucmVmcmVzaFJ1bm5pbmcoKS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLyogbm8tb3AgKi9cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZXNzaW9uQ29ubmVjdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGl0ZXJhdG9yIG92ZXIgdGhlIG1vc3QgcmVjZW50IHJ1bm5pbmcgc2Vzc2lvbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIG5ldyBpdGVyYXRvciBvdmVyIHRoZSBydW5uaW5nIHNlc3Npb25zLlxuICAgICAqL1xuICAgIHJ1bm5pbmcoKSB7XG4gICAgICAgIHJldHVybiBhbGdvcml0aG1fMS5pdGVyKFsuLi50aGlzLl9tb2RlbHMudmFsdWVzKCldKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRm9yY2UgYSByZWZyZXNoIG9mIHRoZSBydW5uaW5nIHNlc3Npb25zLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgd2l0aCB0aGUgbGlzdCBvZiBydW5uaW5nIHNlc3Npb25zLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgaXMgbm90IHR5cGljYWxseSBtZWFudCB0byBiZSBjYWxsZWQgYnkgdGhlIHVzZXIsIHNpbmNlIHRoZVxuICAgICAqIG1hbmFnZXIgbWFpbnRhaW5zIGl0cyBvd24gaW50ZXJuYWwgc3RhdGUuXG4gICAgICovXG4gICAgYXN5bmMgcmVmcmVzaFJ1bm5pbmcoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3BvbGxNb2RlbHMucmVmcmVzaCgpO1xuICAgICAgICBhd2FpdCB0aGlzLl9wb2xsTW9kZWxzLnRpY2s7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0IGEgbmV3IHNlc3Npb24uICBTZWUgYWxzbyBbW3N0YXJ0TmV3U2Vzc2lvbl1dLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZWF0ZU9wdGlvbnMgLSBPcHRpb25zIGZvciBjcmVhdGluZyB0aGUgc2Vzc2lvblxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbm5lY3RPcHRpb25zIC0gT3B0aW9ucyBmb3IgY29ubmVjdGluZyB0byB0aGUgc2Vzc2lvblxuICAgICAqL1xuICAgIGFzeW5jIHN0YXJ0TmV3KGNyZWF0ZU9wdGlvbnMsIGNvbm5lY3RPcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgbW9kZWwgPSBhd2FpdCByZXN0YXBpXzEuc3RhcnRTZXNzaW9uKGNyZWF0ZU9wdGlvbnMsIHRoaXMuc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2hSdW5uaW5nKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RUbyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGNvbm5lY3RPcHRpb25zKSwgeyBtb2RlbCB9KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNodXQgZG93biBhIHNlc3Npb24gYnkgaWQuXG4gICAgICovXG4gICAgYXN5bmMgc2h1dGRvd24oaWQpIHtcbiAgICAgICAgYXdhaXQgcmVzdGFwaV8xLnNodXRkb3duU2Vzc2lvbihpZCwgdGhpcy5zZXJ2ZXJTZXR0aW5ncyk7XG4gICAgICAgIGF3YWl0IHRoaXMucmVmcmVzaFJ1bm5pbmcoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2h1dCBkb3duIGFsbCBzZXNzaW9ucy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gYWxsIG9mIHRoZSBrZXJuZWxzIGFyZSBzaHV0IGRvd24uXG4gICAgICovXG4gICAgYXN5bmMgc2h1dGRvd25BbGwoKSB7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgbGlzdCBvZiBtb2RlbHMgdG8gbWFrZSBzdXJlIG91ciBsaXN0IGlzIGN1cnJlbnQuXG4gICAgICAgIGF3YWl0IHRoaXMucmVmcmVzaFJ1bm5pbmcoKTtcbiAgICAgICAgLy8gU2h1dCBkb3duIGFsbCBtb2RlbHMuXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFsuLi50aGlzLl9tb2RlbHMua2V5cygpXS5tYXAoaWQgPT4gcmVzdGFwaV8xLnNodXRkb3duU2Vzc2lvbihpZCwgdGhpcy5zZXJ2ZXJTZXR0aW5ncykpKTtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBsaXN0IG9mIG1vZGVscyB0byBjbGVhciBvdXQgb3VyIHN0YXRlLlxuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2hSdW5uaW5nKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmQgYSBzZXNzaW9uIGFzc29jaWF0ZWQgd2l0aCBhIHBhdGggYW5kIHN0b3AgaXQgaWYgaXQgaXMgdGhlIG9ubHkgc2Vzc2lvblxuICAgICAqIHVzaW5nIHRoYXQga2VybmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggLSBUaGUgcGF0aCBpbiBxdWVzdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHJlbGV2YW50IHNlc3Npb25zIGFyZSBzdG9wcGVkLlxuICAgICAqL1xuICAgIGFzeW5jIHN0b3BJZk5lZWRlZChwYXRoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9ucyA9IGF3YWl0IHJlc3RhcGlfMS5saXN0UnVubmluZyh0aGlzLnNlcnZlclNldHRpbmdzKTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSBzZXNzaW9ucy5maWx0ZXIodmFsdWUgPT4gdmFsdWUucGF0aCA9PT0gcGF0aCk7XG4gICAgICAgICAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IG1hdGNoZXNbMF0uaWQ7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zaHV0ZG93bihpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvKiBBbHdheXMgc3VjY2VlZC4gKi9cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kIGEgc2Vzc2lvbiBieSBpZC5cbiAgICAgKi9cbiAgICBhc3luYyBmaW5kQnlJZChpZCkge1xuICAgICAgICBpZiAodGhpcy5fbW9kZWxzLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb2RlbHMuZ2V0KGlkKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2hSdW5uaW5nKCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlbHMuZ2V0KGlkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmluZCBhIHNlc3Npb24gYnkgcGF0aC5cbiAgICAgKi9cbiAgICBhc3luYyBmaW5kQnlQYXRoKHBhdGgpIHtcbiAgICAgICAgZm9yIChjb25zdCBtIG9mIHRoaXMuX21vZGVscy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKG0ucGF0aCA9PT0gcGF0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMucmVmcmVzaFJ1bm5pbmcoKTtcbiAgICAgICAgZm9yIChjb25zdCBtIG9mIHRoaXMuX21vZGVscy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKG0ucGF0aCA9PT0gcGF0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdG8gcG9sbCBydW5uaW5nIGtlcm5lbHMgYW5kIHVwZGF0ZSBzdGF0ZS5cbiAgICAgKi9cbiAgICBhc3luYyByZXF1ZXN0UnVubmluZygpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgbGV0IG1vZGVscztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG1vZGVscyA9IGF3YWl0IHJlc3RhcGlfMS5saXN0UnVubmluZyh0aGlzLnNlcnZlclNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgbmV0d29yayBlcnJvcnMsIGFzIHdlbGwgYXMgY2FzZXMgd2hlcmUgd2UgYXJlIG9uIGFcbiAgICAgICAgICAgIC8vIEp1cHl0ZXJIdWIgYW5kIHRoZSBzZXJ2ZXIgaXMgbm90IHJ1bm5pbmcuIEp1cHl0ZXJIdWIgcmV0dXJucyBhXG4gICAgICAgICAgICAvLyA1MDMgKDwyLjApIG9yIDQyNCAoPjIuMCkgaW4gdGhhdCBjYXNlLlxuICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLk5ldHdvcmtFcnJvciB8fFxuICAgICAgICAgICAgICAgICgoX2EgPSBlcnIucmVzcG9uc2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zdGF0dXMpID09PSA1MDMgfHxcbiAgICAgICAgICAgICAgICAoKF9iID0gZXJyLnJlc3BvbnNlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iuc3RhdHVzKSA9PT0gNDI0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbkZhaWx1cmUuZW1pdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbW9kZWxzLnNpemUgPT09IG1vZGVscy5sZW5ndGggJiZcbiAgICAgICAgICAgIGFsZ29yaXRobV8xLmV2ZXJ5KG1vZGVscywgeCA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nID0gdGhpcy5fbW9kZWxzLmdldCh4LmlkKTtcbiAgICAgICAgICAgICAgICBpZiAoIWV4aXN0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoKF9hID0gZXhpc3Rpbmcua2VybmVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWQpID09PSAoKF9iID0geC5rZXJuZWwpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5pZCkgJiZcbiAgICAgICAgICAgICAgICAgICAgKChfYyA9IGV4aXN0aW5nLmtlcm5lbCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLm5hbWUpID09PSAoKF9kID0geC5rZXJuZWwpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5uYW1lKSAmJlxuICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5uYW1lID09PSB4Lm5hbWUgJiZcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcucGF0aCA9PT0geC5wYXRoICYmXG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLnR5cGUgPT09IHgudHlwZSk7XG4gICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgLy8gSWRlbnRpY2FsIG1vZGVscyBsaXN0IChwcmVzdW1pbmcgbW9kZWxzIGRvZXMgbm90IGNvbnRhaW4gZHVwbGljYXRlXG4gICAgICAgICAgICAvLyBpZHMpLCBzbyBqdXN0IHJldHVyblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21vZGVscyA9IG5ldyBNYXAobW9kZWxzLm1hcCh4ID0+IFt4LmlkLCB4XSkpO1xuICAgICAgICB0aGlzLl9zZXNzaW9uQ29ubmVjdGlvbnMuZm9yRWFjaChzYyA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbW9kZWxzLmhhcyhzYy5pZCkpIHtcbiAgICAgICAgICAgICAgICBzYy51cGRhdGUodGhpcy5fbW9kZWxzLmdldChzYy5pZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2MuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fcnVubmluZ0NoYW5nZWQuZW1pdChtb2RlbHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBzZXNzaW9uIHN0YXJ0aW5nLlxuICAgICAqL1xuICAgIF9vblN0YXJ0ZWQoc2Vzc2lvbkNvbm5lY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fc2Vzc2lvbkNvbm5lY3Rpb25zLmFkZChzZXNzaW9uQ29ubmVjdGlvbik7XG4gICAgICAgIHNlc3Npb25Db25uZWN0aW9uLmRpc3Bvc2VkLmNvbm5lY3QodGhpcy5fb25EaXNwb3NlZCwgdGhpcyk7XG4gICAgICAgIHNlc3Npb25Db25uZWN0aW9uLnByb3BlcnR5Q2hhbmdlZC5jb25uZWN0KHRoaXMuX29uQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIHNlc3Npb25Db25uZWN0aW9uLmtlcm5lbENoYW5nZWQuY29ubmVjdCh0aGlzLl9vbkNoYW5nZWQsIHRoaXMpO1xuICAgIH1cbiAgICBfb25EaXNwb3NlZChzZXNzaW9uQ29ubmVjdGlvbikge1xuICAgICAgICB0aGlzLl9zZXNzaW9uQ29ubmVjdGlvbnMuZGVsZXRlKHNlc3Npb25Db25uZWN0aW9uKTtcbiAgICAgICAgLy8gQSBzZXNzaW9uIHRlcm1pbmF0aW9uIGVtaXNzaW9uIGNvdWxkIG1lYW4gdGhlIHNlcnZlciBzZXNzaW9uIGlzIGRlbGV0ZWQsXG4gICAgICAgIC8vIG9yIHRoYXQgdGhlIHNlc3Npb24gSlMgb2JqZWN0IGlzIGRpc3Bvc2VkIGFuZCB0aGUgc2Vzc2lvbiBzdGlsbCBleGlzdHMgb25cbiAgICAgICAgLy8gdGhlIHNlcnZlciwgc28gd2UgcmVmcmVzaCBmcm9tIHRoZSBzZXJ2ZXIgdG8gbWFrZSBzdXJlIHdlIHJlZmxlY3QgdGhlXG4gICAgICAgIC8vIHNlcnZlciBzdGF0ZS5cbiAgICAgICAgdm9pZCB0aGlzLnJlZnJlc2hSdW5uaW5nKCkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgLyogbm8tb3AgKi9cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9vbkNoYW5nZWQoKSB7XG4gICAgICAgIHZvaWQgdGhpcy5yZWZyZXNoUnVubmluZygpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIC8qIG5vLW9wICovXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuU2Vzc2lvbk1hbmFnZXIgPSBTZXNzaW9uTWFuYWdlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hbmFnZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVwZGF0ZVNlc3Npb24gPSBleHBvcnRzLnN0YXJ0U2Vzc2lvbiA9IGV4cG9ydHMuZ2V0U2Vzc2lvbk1vZGVsID0gZXhwb3J0cy5zaHV0ZG93blNlc3Npb24gPSBleHBvcnRzLmdldFNlc3Npb25VcmwgPSBleHBvcnRzLmxpc3RSdW5uaW5nID0gZXhwb3J0cy5TRVNTSU9OX1NFUlZJQ0VfVVJMID0gdm9pZCAwO1xuY29uc3Qgc2VydmVyY29ubmVjdGlvbl8xID0gcmVxdWlyZShcIi4uL3NlcnZlcmNvbm5lY3Rpb25cIik7XG5jb25zdCBjb3JldXRpbHNfMSA9IHJlcXVpcmUoXCJAanVweXRlcmxhYi9jb3JldXRpbHNcIik7XG5jb25zdCB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4vdmFsaWRhdGVcIik7XG4vKipcbiAqIFRoZSB1cmwgZm9yIHRoZSBzZXNzaW9uIHNlcnZpY2UuXG4gKi9cbmV4cG9ydHMuU0VTU0lPTl9TRVJWSUNFX1VSTCA9ICdhcGkvc2Vzc2lvbnMnO1xuLyoqXG4gKiBMaXN0IHRoZSBydW5uaW5nIHNlc3Npb25zLlxuICovXG5hc3luYyBmdW5jdGlvbiBsaXN0UnVubmluZyhzZXR0aW5ncyA9IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VTZXR0aW5ncygpKSB7XG4gICAgY29uc3QgdXJsID0gY29yZXV0aWxzXzEuVVJMRXh0LmpvaW4oc2V0dGluZ3MuYmFzZVVybCwgZXhwb3J0cy5TRVNTSU9OX1NFUlZJQ0VfVVJMKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VSZXF1ZXN0KHVybCwge30sIHNldHRpbmdzKTtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgY29uc3QgZXJyID0gYXdhaXQgc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24uUmVzcG9uc2VFcnJvci5jcmVhdGUocmVzcG9uc2UpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBTZXNzaW9uIGxpc3QnKTtcbiAgICB9XG4gICAgZGF0YS5mb3JFYWNoKG0gPT4ge1xuICAgICAgICB2YWxpZGF0ZV8xLnVwZGF0ZUxlZ2FjeVNlc3Npb25Nb2RlbChtKTtcbiAgICAgICAgdmFsaWRhdGVfMS52YWxpZGF0ZU1vZGVsKG0pO1xuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xufVxuZXhwb3J0cy5saXN0UnVubmluZyA9IGxpc3RSdW5uaW5nO1xuLyoqXG4gKiBHZXQgYSBzZXNzaW9uIHVybC5cbiAqL1xuZnVuY3Rpb24gZ2V0U2Vzc2lvblVybChiYXNlVXJsLCBpZCkge1xuICAgIHJldHVybiBjb3JldXRpbHNfMS5VUkxFeHQuam9pbihiYXNlVXJsLCBleHBvcnRzLlNFU1NJT05fU0VSVklDRV9VUkwsIGlkKTtcbn1cbmV4cG9ydHMuZ2V0U2Vzc2lvblVybCA9IGdldFNlc3Npb25Vcmw7XG4vKipcbiAqIFNodXQgZG93biBhIHNlc3Npb24gYnkgaWQuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHNodXRkb3duU2Vzc2lvbihpZCwgc2V0dGluZ3MgPSBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlU2V0dGluZ3MoKSkge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCB1cmwgPSBnZXRTZXNzaW9uVXJsKHNldHRpbmdzLmJhc2VVcmwsIGlkKTtcbiAgICBjb25zdCBpbml0ID0geyBtZXRob2Q6ICdERUxFVEUnIH07XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlUmVxdWVzdCh1cmwsIGluaXQsIHNldHRpbmdzKTtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgY29uc3QgbXNnID0gKF9hID0gZGF0YS5tZXNzYWdlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBgVGhlIHNlc3Npb24gXCIke2lkfVwiXCIgZG9lcyBub3QgZXhpc3Qgb24gdGhlIHNlcnZlcmA7XG4gICAgICAgIGNvbnNvbGUud2Fybihtc2cpO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQxMCkge1xuICAgICAgICB0aHJvdyBuZXcgc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24uUmVzcG9uc2VFcnJvcihyZXNwb25zZSwgJ1RoZSBrZXJuZWwgd2FzIGRlbGV0ZWQgYnV0IHRoZSBzZXNzaW9uIHdhcyBub3QnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDQpIHtcbiAgICAgICAgY29uc3QgZXJyID0gYXdhaXQgc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24uUmVzcG9uc2VFcnJvci5jcmVhdGUocmVzcG9uc2UpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxufVxuZXhwb3J0cy5zaHV0ZG93blNlc3Npb24gPSBzaHV0ZG93blNlc3Npb247XG4vKipcbiAqIEdldCBhIGZ1bGwgc2Vzc2lvbiBtb2RlbCBmcm9tIHRoZSBzZXJ2ZXIgYnkgc2Vzc2lvbiBpZCBzdHJpbmcuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldFNlc3Npb25Nb2RlbChpZCwgc2V0dGluZ3MgPSBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlU2V0dGluZ3MoKSkge1xuICAgIGNvbnN0IHVybCA9IGdldFNlc3Npb25Vcmwoc2V0dGluZ3MuYmFzZVVybCwgaWQpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24ubWFrZVJlcXVlc3QodXJsLCB7fSwgc2V0dGluZ3MpO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICBjb25zdCBlcnIgPSBhd2FpdCBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5SZXNwb25zZUVycm9yLmNyZWF0ZShyZXNwb25zZSk7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICB2YWxpZGF0ZV8xLnVwZGF0ZUxlZ2FjeVNlc3Npb25Nb2RlbChkYXRhKTtcbiAgICB2YWxpZGF0ZV8xLnZhbGlkYXRlTW9kZWwoZGF0YSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG5leHBvcnRzLmdldFNlc3Npb25Nb2RlbCA9IGdldFNlc3Npb25Nb2RlbDtcbi8qKlxuICogQ3JlYXRlIGEgbmV3IHNlc3Npb24sIG9yIHJldHVybiBhbiBleGlzdGluZyBzZXNzaW9uIGlmIHRoZSBzZXNzaW9uIHBhdGhcbiAqIGFscmVhZHkgZXhpc3RzLlxuICovXG5hc3luYyBmdW5jdGlvbiBzdGFydFNlc3Npb24ob3B0aW9ucywgc2V0dGluZ3MgPSBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlU2V0dGluZ3MoKSkge1xuICAgIGNvbnN0IHVybCA9IGNvcmV1dGlsc18xLlVSTEV4dC5qb2luKHNldHRpbmdzLmJhc2VVcmwsIGV4cG9ydHMuU0VTU0lPTl9TRVJWSUNFX1VSTCk7XG4gICAgY29uc3QgaW5pdCA9IHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VSZXF1ZXN0KHVybCwgaW5pdCwgc2V0dGluZ3MpO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMSkge1xuICAgICAgICBjb25zdCBlcnIgPSBhd2FpdCBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5SZXNwb25zZUVycm9yLmNyZWF0ZShyZXNwb25zZSk7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICB2YWxpZGF0ZV8xLnVwZGF0ZUxlZ2FjeVNlc3Npb25Nb2RlbChkYXRhKTtcbiAgICB2YWxpZGF0ZV8xLnZhbGlkYXRlTW9kZWwoZGF0YSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG5leHBvcnRzLnN0YXJ0U2Vzc2lvbiA9IHN0YXJ0U2Vzc2lvbjtcbi8qKlxuICogU2VuZCBhIFBBVENIIHRvIHRoZSBzZXJ2ZXIsIHVwZGF0aW5nIHRoZSBzZXNzaW9uIHBhdGggb3IgdGhlIGtlcm5lbC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gdXBkYXRlU2Vzc2lvbihtb2RlbCwgc2V0dGluZ3MgPSBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlU2V0dGluZ3MoKSkge1xuICAgIGNvbnN0IHVybCA9IGdldFNlc3Npb25Vcmwoc2V0dGluZ3MuYmFzZVVybCwgbW9kZWwuaWQpO1xuICAgIGNvbnN0IGluaXQgPSB7XG4gICAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobW9kZWwpXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VSZXF1ZXN0KHVybCwgaW5pdCwgc2V0dGluZ3MpO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICBjb25zdCBlcnIgPSBhd2FpdCBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5SZXNwb25zZUVycm9yLmNyZWF0ZShyZXNwb25zZSk7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICB2YWxpZGF0ZV8xLnVwZGF0ZUxlZ2FjeVNlc3Npb25Nb2RlbChkYXRhKTtcbiAgICB2YWxpZGF0ZV8xLnZhbGlkYXRlTW9kZWwoZGF0YSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG5leHBvcnRzLnVwZGF0ZVNlc3Npb24gPSB1cGRhdGVTZXNzaW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVzdGFwaS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlc3Npb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnZhbGlkYXRlTW9kZWxzID0gZXhwb3J0cy51cGRhdGVMZWdhY3lTZXNzaW9uTW9kZWwgPSBleHBvcnRzLnZhbGlkYXRlTW9kZWwgPSB2b2lkIDA7XG5jb25zdCB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4uL2tlcm5lbC92YWxpZGF0ZVwiKTtcbmNvbnN0IHZhbGlkYXRlXzIgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG4vKipcbiAqIFZhbGlkYXRlIGFuIGBTZXNzaW9uLklNb2RlbGAgb2JqZWN0LlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZU1vZGVsKGRhdGEpIHtcbiAgICB2YWxpZGF0ZV8yLnZhbGlkYXRlUHJvcGVydHkoZGF0YSwgJ2lkJywgJ3N0cmluZycpO1xuICAgIHZhbGlkYXRlXzIudmFsaWRhdGVQcm9wZXJ0eShkYXRhLCAndHlwZScsICdzdHJpbmcnKTtcbiAgICB2YWxpZGF0ZV8yLnZhbGlkYXRlUHJvcGVydHkoZGF0YSwgJ25hbWUnLCAnc3RyaW5nJyk7XG4gICAgdmFsaWRhdGVfMi52YWxpZGF0ZVByb3BlcnR5KGRhdGEsICdwYXRoJywgJ3N0cmluZycpO1xuICAgIHZhbGlkYXRlXzIudmFsaWRhdGVQcm9wZXJ0eShkYXRhLCAna2VybmVsJywgJ29iamVjdCcpO1xuICAgIHZhbGlkYXRlXzEudmFsaWRhdGVNb2RlbChkYXRhLmtlcm5lbCk7XG59XG5leHBvcnRzLnZhbGlkYXRlTW9kZWwgPSB2YWxpZGF0ZU1vZGVsO1xuLyoqXG4gKiBVcGRhdGUgbW9kZWwgZnJvbSBsZWdhY3kgc2Vzc2lvbiBkYXRhLlxuICovXG5mdW5jdGlvbiB1cGRhdGVMZWdhY3lTZXNzaW9uTW9kZWwoZGF0YSkge1xuICAgIGlmIChkYXRhLnBhdGggPT09IHVuZGVmaW5lZCAmJiBkYXRhLm5vdGVib29rICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGF0YS5wYXRoID0gZGF0YS5ub3RlYm9vay5wYXRoO1xuICAgICAgICBkYXRhLnR5cGUgPSAnbm90ZWJvb2snO1xuICAgICAgICBkYXRhLm5hbWUgPSAnJztcbiAgICB9XG59XG5leHBvcnRzLnVwZGF0ZUxlZ2FjeVNlc3Npb25Nb2RlbCA9IHVwZGF0ZUxlZ2FjeVNlc3Npb25Nb2RlbDtcbi8qKlxuICogVmFsaWRhdGUgYW4gYXJyYXkgb2YgYFNlc3Npb24uSU1vZGVsYCBvYmplY3RzLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZU1vZGVscyhtb2RlbHMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkobW9kZWxzKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc2Vzc2lvbiBsaXN0Jyk7XG4gICAgfVxuICAgIG1vZGVscy5mb3JFYWNoKGQgPT4gdmFsaWRhdGVNb2RlbChkKSk7XG59XG5leHBvcnRzLnZhbGlkYXRlTW9kZWxzID0gdmFsaWRhdGVNb2RlbHM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12YWxpZGF0ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2V0dGluZ01hbmFnZXIgPSB2b2lkIDA7XG5jb25zdCBjb3JldXRpbHNfMSA9IHJlcXVpcmUoXCJAanVweXRlcmxhYi9jb3JldXRpbHNcIik7XG5jb25zdCBzdGF0ZWRiXzEgPSByZXF1aXJlKFwiQGp1cHl0ZXJsYWIvc3RhdGVkYlwiKTtcbmNvbnN0IHNlcnZlcmNvbm5lY3Rpb25fMSA9IHJlcXVpcmUoXCIuLi9zZXJ2ZXJjb25uZWN0aW9uXCIpO1xuLyoqXG4gKiBUaGUgdXJsIGZvciB0aGUgbGFiIHNldHRpbmdzIHNlcnZpY2UuXG4gKi9cbmNvbnN0IFNFUlZJQ0VfU0VUVElOR1NfVVJMID0gJ2FwaS9zZXR0aW5ncyc7XG4vKipcbiAqIFRoZSBzZXR0aW5ncyBBUEkgc2VydmljZSBtYW5hZ2VyLlxuICovXG5jbGFzcyBTZXR0aW5nTWFuYWdlciBleHRlbmRzIHN0YXRlZGJfMS5EYXRhQ29ubmVjdG9yIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgc2V0dGluZyBtYW5hZ2VyLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2VydmVyU2V0dGluZ3MgPSAoX2EgPSBvcHRpb25zLnNlcnZlclNldHRpbmdzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlU2V0dGluZ3MoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmV0Y2ggYSBwbHVnaW4ncyBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAtIFRoZSBwbHVnaW4ncyBJRC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGlmIHN1Y2Nlc3NmdWwuXG4gICAgICovXG4gICAgYXN5bmMgZmV0Y2goaWQpIHtcbiAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbHVnaW4gYGlkYCBwYXJhbWV0ZXIgaXMgcmVxdWlyZWQgZm9yIHNldHRpbmdzIGZldGNoLicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgc2VydmVyU2V0dGluZ3MgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHsgYmFzZVVybCwgYXBwVXJsIH0gPSBzZXJ2ZXJTZXR0aW5ncztcbiAgICAgICAgY29uc3QgeyBtYWtlUmVxdWVzdCwgUmVzcG9uc2VFcnJvciB9ID0gc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb247XG4gICAgICAgIGNvbnN0IGJhc2UgPSBiYXNlVXJsICsgYXBwVXJsO1xuICAgICAgICBjb25zdCB1cmwgPSBQcml2YXRlLnVybChiYXNlLCBpZCk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbWFrZVJlcXVlc3QodXJsLCB7fSwgc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IGF3YWl0IFJlc3BvbnNlRXJyb3IuY3JlYXRlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgICAvLyBBc3NlcnQgd2hhdCB0eXBlIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgaXMgcmV0dXJuaW5nLlxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGZXRjaCB0aGUgbGlzdCBvZiBhbGwgcGx1Z2luIHNldHRpbmcgYnVuZGxlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGlmIHN1Y2Nlc3NmdWwuXG4gICAgICovXG4gICAgYXN5bmMgbGlzdCgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgeyBzZXJ2ZXJTZXR0aW5ncyB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgeyBiYXNlVXJsLCBhcHBVcmwgfSA9IHNlcnZlclNldHRpbmdzO1xuICAgICAgICBjb25zdCB7IG1ha2VSZXF1ZXN0LCBSZXNwb25zZUVycm9yIH0gPSBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbjtcbiAgICAgICAgY29uc3QgYmFzZSA9IGJhc2VVcmwgKyBhcHBVcmw7XG4gICAgICAgIGNvbnN0IHVybCA9IFByaXZhdGUudXJsKGJhc2UsICcnKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBtYWtlUmVxdWVzdCh1cmwsIHt9LCBzZXJ2ZXJTZXR0aW5ncyk7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlc3BvbnNlRXJyb3IocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IChfYiA9IChfYSA9IGpzb24gPT09IG51bGwgfHwganNvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDoganNvblsnc2V0dGluZ3MnXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1hcCgocGx1Z2luKSA9PiB7XG4gICAgICAgICAgICBwbHVnaW4uZGF0YSA9IHsgY29tcG9zaXRlOiB7fSwgdXNlcjoge30gfTtcbiAgICAgICAgICAgIHJldHVybiBwbHVnaW47XG4gICAgICAgIH0pKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBbXTtcbiAgICAgICAgY29uc3QgaWRzID0gdmFsdWVzLm1hcChwbHVnaW4gPT4gcGx1Z2luLmlkKTtcbiAgICAgICAgcmV0dXJuIHsgaWRzLCB2YWx1ZXMgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2F2ZSBhIHBsdWdpbidzIHNldHRpbmdzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIC0gVGhlIHBsdWdpbidzIElELlxuICAgICAqXG4gICAgICogQHBhcmFtIHJhdyAtIFRoZSB1c2VyIHNldHRpbmcgdmFsdWVzIGFzIGEgcmF3IHN0cmluZyBvZiBKU09OIHdpdGggY29tbWVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBpZiBzdWNjZXNzZnVsLlxuICAgICAqL1xuICAgIGFzeW5jIHNhdmUoaWQsIHJhdykge1xuICAgICAgICBjb25zdCB7IHNlcnZlclNldHRpbmdzIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCB7IGJhc2VVcmwsIGFwcFVybCB9ID0gc2VydmVyU2V0dGluZ3M7XG4gICAgICAgIGNvbnN0IHsgbWFrZVJlcXVlc3QsIFJlc3BvbnNlRXJyb3IgfSA9IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uO1xuICAgICAgICBjb25zdCBiYXNlID0gYmFzZVVybCArIGFwcFVybDtcbiAgICAgICAgY29uc3QgdXJsID0gUHJpdmF0ZS51cmwoYmFzZSwgaWQpO1xuICAgICAgICAvLyBOT1RFOiAncmF3JyBpcyBKU09ONSAobm90IHZhbGlkIEpTT04pLCBzbyB3ZSBlbmNvZGUgaXQgYXMgYSBzdHJpbmcgaW4gYSB2YWxpZCBKU09OIGJvZHlcbiAgICAgICAgY29uc3QgaW5pdCA9IHsgYm9keTogSlNPTi5zdHJpbmdpZnkoeyByYXcgfSksIG1ldGhvZDogJ1BVVCcgfTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBtYWtlUmVxdWVzdCh1cmwsIGluaXQsIHNlcnZlclNldHRpbmdzKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjA0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVzcG9uc2VFcnJvcihyZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLlNldHRpbmdNYW5hZ2VyID0gU2V0dGluZ01hbmFnZXI7XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB1cmwgZm9yIGEgcGx1Z2luJ3Mgc2V0dGluZ3MuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdXJsKGJhc2UsIGlkKSB7XG4gICAgICAgIHJldHVybiBjb3JldXRpbHNfMS5VUkxFeHQuam9pbihiYXNlLCBTRVJWSUNFX1NFVFRJTkdTX1VSTCwgaWQpO1xuICAgIH1cbiAgICBQcml2YXRlLnVybCA9IHVybDtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlRlcm1pbmFsQ29ubmVjdGlvbiA9IHZvaWQgMDtcbmNvbnN0IGNvcmV1dGlsc18xID0gcmVxdWlyZShcIkBqdXB5dGVybGFiL2NvcmV1dGlsc1wiKTtcbmNvbnN0IGNvcmV1dGlsc18yID0gcmVxdWlyZShcIkBsdW1pbm8vY29yZXV0aWxzXCIpO1xuY29uc3Qgc2lnbmFsaW5nXzEgPSByZXF1aXJlKFwiQGx1bWluby9zaWduYWxpbmdcIik7XG5jb25zdCBfXzEgPSByZXF1aXJlKFwiLi5cIik7XG5jb25zdCByZXN0YXBpXzEgPSByZXF1aXJlKFwiLi9yZXN0YXBpXCIpO1xuLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiBhIHRlcm1pbmFsIGludGVyZmFjZS5cbiAqL1xuY2xhc3MgVGVybWluYWxDb25uZWN0aW9uIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVybWluYWwgc2Vzc2lvbi5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSB0aGUgdGVybWluYWwgd2Vic29ja2V0IGNvbm5lY3Rpb24gYW5kIGFkZCBzb2NrZXQgc3RhdHVzIGhhbmRsZXJzLlxuICAgICAgICAgKlxuICAgICAgICAgKiAjIyMjIE5vdGVzXG4gICAgICAgICAqIFlvdSBhcmUgcmVzcG9uc2libGUgZm9yIHVwZGF0aW5nIHRoZSBjb25uZWN0aW9uIHN0YXR1cyBhcyBhcHByb3ByaWF0ZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2NyZWF0ZVNvY2tldCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9ySWZEaXNwb3NlZCgpO1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBzb2NrZXQgaXMgY2xlYXJcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyU29ja2V0KCk7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGNvbm5lY3Rpb24gc3RhdHVzIHRvIHJlZmxlY3Qgb3BlbmluZyBhIG5ldyBjb25uZWN0aW9uLlxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ29ubmVjdGlvblN0YXR1cygnY29ubmVjdGluZycpO1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuX25hbWU7XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuc2VydmVyU2V0dGluZ3M7XG4gICAgICAgICAgICBsZXQgdXJsID0gY29yZXV0aWxzXzEuVVJMRXh0LmpvaW4oc2V0dGluZ3Mud3NVcmwsICd0ZXJtaW5hbHMnLCAnd2Vic29ja2V0JywgZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpKTtcbiAgICAgICAgICAgIC8vIElmIHRva2VuIGF1dGhlbnRpY2F0aW9uIGlzIGluIHVzZS5cbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gc2V0dGluZ3MudG9rZW47XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuYXBwZW5kVG9rZW4gJiYgdG9rZW4gIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gdXJsICsgYD90b2tlbj0ke2VuY29kZVVSSUNvbXBvbmVudCh0b2tlbil9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3dzID0gbmV3IHNldHRpbmdzLldlYlNvY2tldCh1cmwpO1xuICAgICAgICAgICAgdGhpcy5fd3Mub25tZXNzYWdlID0gdGhpcy5fb25XU01lc3NhZ2U7XG4gICAgICAgICAgICB0aGlzLl93cy5vbmNsb3NlID0gdGhpcy5fb25XU0Nsb3NlO1xuICAgICAgICAgICAgdGhpcy5fd3Mub25lcnJvciA9IHRoaXMuX29uV1NDbG9zZTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gV2Vic29ja2V0IG1lc3NhZ2VzIGV2ZW50cyBhcmUgZGVmaW5lZCBhcyB2YXJpYWJsZXMgdG8gYmluZCBgdGhpc2BcbiAgICAgICAgdGhpcy5fb25XU01lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XG4gICAgICAgICAgICAvLyBIYW5kbGUgYSBkaXNjb25uZWN0IG1lc3NhZ2UuXG4gICAgICAgICAgICBpZiAoZGF0YVswXSA9PT0gJ2Rpc2Nvbm5lY3QnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fY29ubmVjdGlvblN0YXR1cyA9PT0gJ2Nvbm5lY3RpbmcnKSB7XG4gICAgICAgICAgICAgICAgLy8gQWZ0ZXIgcmVjb25uZWN0aW9uLCBpZ25vcmUgYWxsIG1lc3NhZ2VzIHVudGlsIGEgJ3NldHVwJyBtZXNzYWdlXG4gICAgICAgICAgICAgICAgLy8gYmVmb3JlIHdlIGFyZSB0cnVseSBjb25uZWN0ZWQuIFNldHRpbmcgdGhlIGNvbm5lY3Rpb24gc3RhdHVzIHRvXG4gICAgICAgICAgICAgICAgLy8gY29ubmVjdGVkIG9ubHkgdGhlbiBtZWFucyB0aGF0IGlmIHdlIGRvIG5vdCBnZXQgYSBzZXR1cCBtZXNzYWdlXG4gICAgICAgICAgICAgICAgLy8gYmVmb3JlIG91ciByZXRyeSB0aW1lb3V0LCB3ZSB3aWxsIGRlbGV0ZSB0aGUgd2Vic29ja2V0IGFuZCB0cnkgYWdhaW4uXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbMF0gPT09ICdzZXR1cCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ29ubmVjdGlvblN0YXR1cygnY29ubmVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX21lc3NhZ2VSZWNlaXZlZC5lbWl0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBkYXRhWzBdLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuc2xpY2UoMSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9vbldTQ2xvc2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgVGVybWluYWwgd2Vic29ja2V0IGNsb3NlZDogJHtldmVudC5jb2RlfWApO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGlvblN0YXR1cyA9ICdjb25uZWN0aW5nJztcbiAgICAgICAgdGhpcy5fY29ubmVjdGlvblN0YXR1c0NoYW5nZWQgPSBuZXcgc2lnbmFsaW5nXzEuU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VkID0gbmV3IHNpZ25hbGluZ18xLlNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fbWVzc2FnZVJlY2VpdmVkID0gbmV3IHNpZ25hbGluZ18xLlNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0VGltZW91dCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3dzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbm9PcCA9ICgpID0+IHtcbiAgICAgICAgICAgIC8qIG5vLW9wICovXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdExpbWl0ID0gNztcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0QXR0ZW1wdCA9IDA7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdNZXNzYWdlcyA9IFtdO1xuICAgICAgICB0aGlzLl9uYW1lID0gb3B0aW9ucy5tb2RlbC5uYW1lO1xuICAgICAgICB0aGlzLnNlcnZlclNldHRpbmdzID0gKF9hID0gb3B0aW9ucy5zZXJ2ZXJTZXR0aW5ncykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogX18xLlNlcnZlckNvbm5lY3Rpb24ubWFrZVNldHRpbmdzKCk7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVNvY2tldCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIHNlc3Npb24gaXMgZGlzcG9zZWQuXG4gICAgICovXG4gICAgZ2V0IGRpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiBhIG1lc3NhZ2UgaXMgcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyLlxuICAgICAqL1xuICAgIGdldCBtZXNzYWdlUmVjZWl2ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXNzYWdlUmVjZWl2ZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbmFtZSBvZiB0aGUgdGVybWluYWwgc2Vzc2lvbi5cbiAgICAgKi9cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbW9kZWwgZm9yIHRoZSB0ZXJtaW5hbCBzZXNzaW9uLlxuICAgICAqL1xuICAgIGdldCBtb2RlbCgpIHtcbiAgICAgICAgcmV0dXJuIHsgbmFtZTogdGhpcy5fbmFtZSB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUZXN0IHdoZXRoZXIgdGhlIHNlc3Npb24gaXMgZGlzcG9zZWQuXG4gICAgICovXG4gICAgZ2V0IGlzRGlzcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0Rpc3Bvc2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUgc2Vzc2lvbi5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5faXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9kaXNwb3NlZC5lbWl0KCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0dXMoJ2Rpc2Nvbm5lY3RlZCcpO1xuICAgICAgICB0aGlzLl9jbGVhclNvY2tldCgpO1xuICAgICAgICBzaWduYWxpbmdfMS5TaWduYWwuY2xlYXJEYXRhKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgbWVzc2FnZSB0byB0aGUgdGVybWluYWwgc2Vzc2lvbi5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBJZiB0aGUgY29ubmVjdGlvbiBpcyBkb3duLCB0aGUgbWVzc2FnZSB3aWxsIGJlIHF1ZXVlZCBmb3Igc2VuZGluZyB3aGVuXG4gICAgICogdGhlIGNvbm5lY3Rpb24gY29tZXMgYmFjayB1cC5cbiAgICAgKi9cbiAgICBzZW5kKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5fc2VuZE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmQgYSBtZXNzYWdlIG9uIHRoZSB3ZWJzb2NrZXQsIG9yIHBvc3NpYmx5IHF1ZXVlIGZvciBsYXRlciBzZW5kaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHF1ZXVlIC0gd2hldGhlciB0byBxdWV1ZSB0aGUgbWVzc2FnZSBpZiBpdCBjYW5ub3QgYmUgc2VudFxuICAgICAqL1xuICAgIF9zZW5kTWVzc2FnZShtZXNzYWdlLCBxdWV1ZSA9IHRydWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzRGlzcG9zZWQgfHwgIW1lc3NhZ2UuY29udGVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0dXMgPT09ICdjb25uZWN0ZWQnICYmIHRoaXMuX3dzKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBbbWVzc2FnZS50eXBlLCAuLi5tZXNzYWdlLmNvbnRlbnRdO1xuICAgICAgICAgICAgdGhpcy5fd3Muc2VuZChKU09OLnN0cmluZ2lmeShtc2cpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChxdWV1ZSkge1xuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ01lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBzZW5kIG1lc3NhZ2U6ICR7SlNPTi5zdHJpbmdpZnkobWVzc2FnZSl9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZCBwZW5kaW5nIG1lc3NhZ2VzIHRvIHRoZSBrZXJuZWwuXG4gICAgICovXG4gICAgX3NlbmRQZW5kaW5nKCkge1xuICAgICAgICAvLyBXZSBjaGVjayB0byBtYWtlIHN1cmUgd2UgYXJlIHN0aWxsIGNvbm5lY3RlZCBlYWNoIHRpbWUuIEZvclxuICAgICAgICAvLyBleGFtcGxlLCBpZiBhIHdlYnNvY2tldCBidWZmZXIgb3ZlcmZsb3dzLCBpdCBtYXkgY2xvc2UsIHNvIHdlIHNob3VsZFxuICAgICAgICAvLyBzdG9wIHNlbmRpbmcgbWVzc2FnZXMuXG4gICAgICAgIHdoaWxlICh0aGlzLmNvbm5lY3Rpb25TdGF0dXMgPT09ICdjb25uZWN0ZWQnICYmXG4gICAgICAgICAgICB0aGlzLl9wZW5kaW5nTWVzc2FnZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fc2VuZE1lc3NhZ2UodGhpcy5fcGVuZGluZ01lc3NhZ2VzWzBdLCBmYWxzZSk7XG4gICAgICAgICAgICAvLyBXZSBzaGlmdCB0aGUgbWVzc2FnZSBvZmYgdGhlIHF1ZXVlIGFmdGVyIHRoZSBtZXNzYWdlIGlzIHNlbnQgc28gdGhhdFxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXhjZXB0aW9uLCB0aGUgbWVzc2FnZSBpcyBzdGlsbCBwZW5kaW5nLlxuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ01lc3NhZ2VzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVjb25uZWN0IHRvIGEgdGVybWluYWwuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBtYXkgdHJ5IG11bHRpcGxlIHRpbWVzIHRvIHJlY29ubmVjdCB0byBhIHRlcm1pbmFsLCBhbmQgd2lsbCBzZXZlclxuICAgICAqIGFueSBleGlzdGluZyBjb25uZWN0aW9uLlxuICAgICAqL1xuICAgIHJlY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fZXJyb3JJZkRpc3Bvc2VkKCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBjb3JldXRpbHNfMi5Qcm9taXNlRGVsZWdhdGUoKTtcbiAgICAgICAgLy8gU2V0IHVwIGEgbGlzdGVuZXIgZm9yIHRoZSBjb25uZWN0aW9uIHN0YXR1cyBjaGFuZ2luZywgd2hpY2ggYWNjZXB0cyBvclxuICAgICAgICAvLyByZWplY3RzIGFmdGVyIHRoZSByZXRyaWVzIGFyZSBkb25lLlxuICAgICAgICBjb25zdCBmdWxmaWxsID0gKHNlbmRlciwgc3RhdHVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnY29ubmVjdGVkJykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdHVzQ2hhbmdlZC5kaXNjb25uZWN0KGZ1bGZpbGwsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc3RhdHVzID09PSAnZGlzY29ubmVjdGVkJykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5yZWplY3QobmV3IEVycm9yKCdUZXJtaW5hbCBjb25uZWN0aW9uIGRpc2Nvbm5lY3RlZCcpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkLmRpc2Nvbm5lY3QoZnVsZmlsbCwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXR1c0NoYW5nZWQuY29ubmVjdChmdWxmaWxsLCB0aGlzKTtcbiAgICAgICAgLy8gUmVzZXQgdGhlIHJlY29ubmVjdCBsaW1pdCBzbyB3ZSBzdGFydCB0aGUgY29ubmVjdGlvbiBhdHRlbXB0cyBmcmVzaFxuICAgICAgICB0aGlzLl9yZWNvbm5lY3RBdHRlbXB0ID0gMDtcbiAgICAgICAgLy8gU3RhcnQgdGhlIHJlY29ubmVjdGlvbiBwcm9jZXNzLCB3aGljaCB3aWxsIGFsc28gY2xlYXIgYW55IGV4aXN0aW5nXG4gICAgICAgIC8vIGNvbm5lY3Rpb24uXG4gICAgICAgIHRoaXMuX3JlY29ubmVjdCgpO1xuICAgICAgICAvLyBSZXR1cm4gdGhlIHByb21pc2UgdGhhdCBzaG91bGQgcmVzb2x2ZSBvbiBjb25uZWN0aW9uIG9yIHJlamVjdCBpZiB0aGVcbiAgICAgICAgLy8gcmV0cmllcyBkb24ndCB3b3JrLlxuICAgICAgICByZXR1cm4gcmVzdWx0LnByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGVtcHQgYSBjb25uZWN0aW9uIGlmIHdlIGhhdmUgbm90IGV4aGF1c3RlZCBjb25uZWN0aW9uIGF0dGVtcHRzLlxuICAgICAqL1xuICAgIF9yZWNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2Vycm9ySWZEaXNwb3NlZCgpO1xuICAgICAgICAvLyBDbGVhciBhbnkgZXhpc3RpbmcgcmVjb25uZWN0aW9uIGF0dGVtcHRcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3JlY29ubmVjdFRpbWVvdXQpO1xuICAgICAgICAvLyBVcGRhdGUgdGhlIGNvbm5lY3Rpb24gc3RhdHVzIGFuZCBzY2hlZHVsZSBhIHBvc3NpYmxlIHJlY29ubmVjdGlvbi5cbiAgICAgICAgaWYgKHRoaXMuX3JlY29ubmVjdEF0dGVtcHQgPCB0aGlzLl9yZWNvbm5lY3RMaW1pdCkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ29ubmVjdGlvblN0YXR1cygnY29ubmVjdGluZycpO1xuICAgICAgICAgICAgLy8gVGhlIGZpcnN0IHJlY29ubmVjdCBhdHRlbXB0IHNob3VsZCBoYXBwZW4gaW1tZWRpYXRlbHksIGFuZCBzdWJzZXF1ZW50XG4gICAgICAgICAgICAvLyBhdHRlbXB0cyBzaG91bGQgcGljayBhIHJhbmRvbSBudW1iZXIgaW4gYSBncm93aW5nIHJhbmdlIHNvIHRoYXQgd2VcbiAgICAgICAgICAgIC8vIGRvbid0IG92ZXJsb2FkIHRoZSBzZXJ2ZXIgd2l0aCBzeW5jaHJvbml6ZWQgcmVjb25uZWN0aW9uIGF0dGVtcHRzXG4gICAgICAgICAgICAvLyBhY3Jvc3MgbXVsdGlwbGUga2VybmVscy5cbiAgICAgICAgICAgIGNvbnN0IHRpbWVvdXQgPSBQcml2YXRlLmdldFJhbmRvbUludEluY2x1c2l2ZSgwLCAxZTMgKiAoTWF0aC5wb3coMiwgdGhpcy5fcmVjb25uZWN0QXR0ZW1wdCkgLSAxKSk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBDb25uZWN0aW9uIGxvc3QsIHJlY29ubmVjdGluZyBpbiAke01hdGguZmxvb3IodGltZW91dCAvIDEwMDApfSBzZWNvbmRzLmApO1xuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0VGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5fY3JlYXRlU29ja2V0LCB0aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuX3JlY29ubmVjdEF0dGVtcHQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0dXMoJ2Rpc2Nvbm5lY3RlZCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENsZWFyIHRoZSB3ZWJzb2NrZXQgZXZlbnQgaGFuZGxlcnMgYW5kIHRoZSBzb2NrZXQgaXRzZWxmLlxuICAgICAgICB0aGlzLl9jbGVhclNvY2tldCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGb3JjZWZ1bGx5IGNsZWFyIHRoZSBzb2NrZXQgc3RhdGUuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyB3aWxsIGNsZWFyIGFsbCBzb2NrZXQgc3RhdGUgd2l0aG91dCBjYWxsaW5nIGFueSBoYW5kbGVycyBhbmQgd2lsbFxuICAgICAqIG5vdCB1cGRhdGUgdGhlIGNvbm5lY3Rpb24gc3RhdHVzLiBJZiB5b3UgY2FsbCB0aGlzIG1ldGhvZCwgeW91IGFyZVxuICAgICAqIHJlc3BvbnNpYmxlIGZvciB1cGRhdGluZyB0aGUgY29ubmVjdGlvbiBzdGF0dXMgYXMgbmVlZGVkIGFuZCByZWNyZWF0aW5nXG4gICAgICogdGhlIHNvY2tldCBpZiB5b3UgcGxhbiB0byByZWNvbm5lY3QuXG4gICAgICovXG4gICAgX2NsZWFyU29ja2V0KCkge1xuICAgICAgICBpZiAodGhpcy5fd3MgIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIENsZWFyIHRoZSB3ZWJzb2NrZXQgZXZlbnQgaGFuZGxlcnMgYW5kIHRoZSBzb2NrZXQgaXRzZWxmLlxuICAgICAgICAgICAgdGhpcy5fd3Mub25vcGVuID0gdGhpcy5fbm9PcDtcbiAgICAgICAgICAgIHRoaXMuX3dzLm9uY2xvc2UgPSB0aGlzLl9ub09wO1xuICAgICAgICAgICAgdGhpcy5fd3Mub25lcnJvciA9IHRoaXMuX25vT3A7XG4gICAgICAgICAgICB0aGlzLl93cy5vbm1lc3NhZ2UgPSB0aGlzLl9ub09wO1xuICAgICAgICAgICAgdGhpcy5fd3MuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX3dzID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaHV0IGRvd24gdGhlIHRlcm1pbmFsIHNlc3Npb24uXG4gICAgICovXG4gICAgYXN5bmMgc2h1dGRvd24oKSB7XG4gICAgICAgIGF3YWl0IHJlc3RhcGlfMS5zaHV0ZG93blRlcm1pbmFsKHRoaXMubmFtZSwgdGhpcy5zZXJ2ZXJTZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9uZSB0aGUgY3VycmVudCB0ZXJtaW5hbCBjb25uZWN0aW9uLlxuICAgICAqL1xuICAgIGNsb25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IFRlcm1pbmFsQ29ubmVjdGlvbih0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNvbm5lY3Rpb24gc3RhdHVzIGNoYW5nZXMuXG4gICAgICovXG4gICAgX3VwZGF0ZUNvbm5lY3Rpb25TdGF0dXMoY29ubmVjdGlvblN0YXR1cykge1xuICAgICAgICBpZiAodGhpcy5fY29ubmVjdGlvblN0YXR1cyA9PT0gY29ubmVjdGlvblN0YXR1cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Nvbm5lY3Rpb25TdGF0dXMgPSBjb25uZWN0aW9uU3RhdHVzO1xuICAgICAgICAvLyBJZiB3ZSBhcmUgbm90ICdjb25uZWN0aW5nJywgc3RvcCBhbnkgcmVjb25uZWN0aW9uIGF0dGVtcHRzLlxuICAgICAgICBpZiAoY29ubmVjdGlvblN0YXR1cyAhPT0gJ2Nvbm5lY3RpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RBdHRlbXB0ID0gMDtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9yZWNvbm5lY3RUaW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZW5kIHRoZSBwZW5kaW5nIG1lc3NhZ2VzIGlmIHdlIGp1c3QgY29ubmVjdGVkLlxuICAgICAgICBpZiAoY29ubmVjdGlvblN0YXR1cyA9PT0gJ2Nvbm5lY3RlZCcpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbmRQZW5kaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm90aWZ5IG90aGVycyB0aGF0IHRoZSBjb25uZWN0aW9uIHN0YXR1cyBjaGFuZ2VkLlxuICAgICAgICB0aGlzLl9jb25uZWN0aW9uU3RhdHVzQ2hhbmdlZC5lbWl0KGNvbm5lY3Rpb25TdGF0dXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIHRocm93IGFuIGVycm9yIGlmIHRoaXMgaW5zdGFuY2UgaXMgZGlzcG9zZWQuXG4gICAgICovXG4gICAgX2Vycm9ySWZEaXNwb3NlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZXJtaW5hbCBjb25uZWN0aW9uIGlzIGRpc3Bvc2VkJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSB0ZXJtaW5hbCBjb25uZWN0aW9uIHN0YXR1cyBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGdldCBjb25uZWN0aW9uU3RhdHVzQ2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBjb25uZWN0aW9uIHN0YXR1cyBvZiB0aGUgdGVybWluYWwgY29ubmVjdGlvbi5cbiAgICAgKi9cbiAgICBnZXQgY29ubmVjdGlvblN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3Rpb25TdGF0dXM7XG4gICAgfVxufVxuZXhwb3J0cy5UZXJtaW5hbENvbm5lY3Rpb24gPSBUZXJtaW5hbENvbm5lY3Rpb247XG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdXJsIGZvciBhIHRlcm1pbmFsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFRlcm1VcmwoYmFzZVVybCwgbmFtZSkge1xuICAgICAgICByZXR1cm4gY29yZXV0aWxzXzEuVVJMRXh0LmpvaW4oYmFzZVVybCwgcmVzdGFwaV8xLlRFUk1JTkFMX1NFUlZJQ0VfVVJMLCBlbmNvZGVVUklDb21wb25lbnQobmFtZSkpO1xuICAgIH1cbiAgICBQcml2YXRlLmdldFRlcm1VcmwgPSBnZXRUZXJtVXJsO1xuICAgIC8qKlxuICAgICAqIEdldCBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIGFuZCBtYXgsIGluY2x1c2l2ZSBvZiBib3RoLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIEZyb21cbiAgICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXRoL3JhbmRvbSNHZXR0aW5nX2FfcmFuZG9tX2ludGVnZXJfYmV0d2Vlbl90d29fdmFsdWVzX2luY2x1c2l2ZVxuICAgICAqXG4gICAgICogRnJvbSB0aGUgTUROIHBhZ2U6IEl0IG1pZ2h0IGJlIHRlbXB0aW5nIHRvIHVzZSBNYXRoLnJvdW5kKCkgdG8gYWNjb21wbGlzaFxuICAgICAqIHRoYXQsIGJ1dCBkb2luZyBzbyB3b3VsZCBjYXVzZSB5b3VyIHJhbmRvbSBudW1iZXJzIHRvIGZvbGxvdyBhIG5vbi11bmlmb3JtXG4gICAgICogZGlzdHJpYnV0aW9uLCB3aGljaCBtYXkgbm90IGJlIGFjY2VwdGFibGUgZm9yIHlvdXIgbmVlZHMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UmFuZG9tSW50SW5jbHVzaXZlKG1pbiwgbWF4KSB7XG4gICAgICAgIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICAgICAgICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuICAgIH1cbiAgICBQcml2YXRlLmdldFJhbmRvbUludEluY2x1c2l2ZSA9IGdldFJhbmRvbUludEluY2x1c2l2ZTtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVmYXVsdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVGVybWluYWxBUEkgPSBleHBvcnRzLlRlcm1pbmFsID0gdm9pZCAwO1xuY29uc3QgVGVybWluYWwgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vdGVybWluYWxcIikpO1xuZXhwb3J0cy5UZXJtaW5hbCA9IFRlcm1pbmFsO1xuY29uc3QgVGVybWluYWxBUEkgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vcmVzdGFwaVwiKSk7XG5leHBvcnRzLlRlcm1pbmFsQVBJID0gVGVybWluYWxBUEk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vbWFuYWdlclwiKSwgZXhwb3J0cyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVGVybWluYWxNYW5hZ2VyID0gdm9pZCAwO1xuY29uc3QgYWxnb3JpdGhtXzEgPSByZXF1aXJlKFwiQGx1bWluby9hbGdvcml0aG1cIik7XG5jb25zdCBwb2xsaW5nXzEgPSByZXF1aXJlKFwiQGx1bWluby9wb2xsaW5nXCIpO1xuY29uc3Qgc2lnbmFsaW5nXzEgPSByZXF1aXJlKFwiQGx1bWluby9zaWduYWxpbmdcIik7XG5jb25zdCBfXzEgPSByZXF1aXJlKFwiLi5cIik7XG5jb25zdCBiYXNlbWFuYWdlcl8xID0gcmVxdWlyZShcIi4uL2Jhc2VtYW5hZ2VyXCIpO1xuY29uc3QgcmVzdGFwaV8xID0gcmVxdWlyZShcIi4vcmVzdGFwaVwiKTtcbmNvbnN0IGRlZmF1bHRfMSA9IHJlcXVpcmUoXCIuL2RlZmF1bHRcIik7XG4vKipcbiAqIEEgdGVybWluYWwgc2Vzc2lvbiBtYW5hZ2VyLlxuICovXG5jbGFzcyBUZXJtaW5hbE1hbmFnZXIgZXh0ZW5kcyBiYXNlbWFuYWdlcl8xLkJhc2VNYW5hZ2VyIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVybWluYWwgbWFuYWdlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5faXNSZWFkeSA9IGZhbHNlO1xuICAgICAgICAvLyBBcyBhbiBvcHRpbWl6YXRpb24sIHdlIHVud3JhcCB0aGUgbW9kZWxzIHRvIGp1c3Qgc3RvcmUgdGhlIG5hbWVzLlxuICAgICAgICB0aGlzLl9uYW1lcyA9IFtdO1xuICAgICAgICB0aGlzLl90ZXJtaW5hbENvbm5lY3Rpb25zID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLl9ydW5uaW5nQ2hhbmdlZCA9IG5ldyBzaWduYWxpbmdfMS5TaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3Rpb25GYWlsdXJlID0gbmV3IHNpZ25hbGluZ18xLlNpZ25hbCh0aGlzKTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGVybWluYWxzIGFyZSBhdmFpbGFibGVcbiAgICAgICAgaWYgKCF0aGlzLmlzQXZhaWxhYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlYWR5ID0gUHJvbWlzZS5yZWplY3QoJ1Rlcm1pbmFscyB1bmF2YWlsYWJsZScpO1xuICAgICAgICAgICAgdGhpcy5fcmVhZHkuY2F0Y2goXyA9PiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFN0YXJ0IHBvbGxpbmcgd2l0aCBleHBvbmVudGlhbCBiYWNrb2ZmLlxuICAgICAgICB0aGlzLl9wb2xsTW9kZWxzID0gbmV3IHBvbGxpbmdfMS5Qb2xsKHtcbiAgICAgICAgICAgIGF1dG86IGZhbHNlLFxuICAgICAgICAgICAgZmFjdG9yeTogKCkgPT4gdGhpcy5yZXF1ZXN0UnVubmluZygpLFxuICAgICAgICAgICAgZnJlcXVlbmN5OiB7XG4gICAgICAgICAgICAgICAgaW50ZXJ2YWw6IDEwICogMTAwMCxcbiAgICAgICAgICAgICAgICBiYWNrb2ZmOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1heDogMzAwICogMTAwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hbWU6IGBAanVweXRlcmxhYi9zZXJ2aWNlczpUZXJtaW5hbE1hbmFnZXIjbW9kZWxzYCxcbiAgICAgICAgICAgIHN0YW5kYnk6IChfYSA9IG9wdGlvbnMuc3RhbmRieSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJ3doZW4taGlkZGVuJ1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBpbnRlcm5hbCBkYXRhLlxuICAgICAgICB0aGlzLl9yZWFkeSA9IChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9wb2xsTW9kZWxzLnN0YXJ0KCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9wb2xsTW9kZWxzLnRpY2s7XG4gICAgICAgICAgICB0aGlzLl9pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgfSkoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIHRoZSBtYW5hZ2VyIGlzIHJlYWR5LlxuICAgICAqL1xuICAgIGdldCBpc1JlYWR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNSZWFkeTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgd2hlbiB0aGUgbWFuYWdlciBpcyByZWFkeS5cbiAgICAgKi9cbiAgICBnZXQgcmVhZHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFkeTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBydW5uaW5nIHRlcm1pbmFscyBjaGFuZ2UuXG4gICAgICovXG4gICAgZ2V0IHJ1bm5pbmdDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcnVubmluZ0NoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGVyZSBpcyBhIGNvbm5lY3Rpb24gZmFpbHVyZS5cbiAgICAgKi9cbiAgICBnZXQgY29ubmVjdGlvbkZhaWx1cmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25uZWN0aW9uRmFpbHVyZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIG1hbmFnZXIuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX25hbWVzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX3Rlcm1pbmFsQ29ubmVjdGlvbnMuZm9yRWFjaCh4ID0+IHguZGlzcG9zZSgpKTtcbiAgICAgICAgdGhpcy5fcG9sbE1vZGVscy5kaXNwb3NlKCk7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgdGVybWluYWwgc2VydmljZSBpcyBhdmFpbGFibGUuXG4gICAgICovXG4gICAgaXNBdmFpbGFibGUoKSB7XG4gICAgICAgIHJldHVybiByZXN0YXBpXzEuaXNBdmFpbGFibGUoKTtcbiAgICB9XG4gICAgLypcbiAgICAgKiBDb25uZWN0IHRvIGEgcnVubmluZyB0ZXJtaW5hbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgdXNlZCB0byBjb25uZWN0IHRvIHRoZSB0ZXJtaW5hbC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXcgdGVybWluYWwgY29ubmVjdGlvbiBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgbWFuYWdlciBgc2VydmVyU2V0dGluZ3NgIHdpbGwgYmUgdXNlZC5cbiAgICAgKi9cbiAgICBjb25uZWN0VG8ob3B0aW9ucykge1xuICAgICAgICBjb25zdCB0ZXJtaW5hbENvbm5lY3Rpb24gPSBuZXcgZGVmYXVsdF8xLlRlcm1pbmFsQ29ubmVjdGlvbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IHNlcnZlclNldHRpbmdzOiB0aGlzLnNlcnZlclNldHRpbmdzIH0pKTtcbiAgICAgICAgdGhpcy5fb25TdGFydGVkKHRlcm1pbmFsQ29ubmVjdGlvbik7XG4gICAgICAgIGlmICghdGhpcy5fbmFtZXMuaW5jbHVkZXMob3B0aW9ucy5tb2RlbC5uYW1lKSkge1xuICAgICAgICAgICAgLy8gV2UgdHJ1c3QgdGhlIHVzZXIgdG8gY29ubmVjdCB0byBhbiBleGlzdGluZyBzZXNzaW9uLCBidXQgd2UgdmVyaWZ5XG4gICAgICAgICAgICAvLyBhc3luY2hyb25vdXNseS5cbiAgICAgICAgICAgIHZvaWQgdGhpcy5yZWZyZXNoUnVubmluZygpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvKiBuby1vcCAqL1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRlcm1pbmFsQ29ubmVjdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGl0ZXJhdG9yIG92ZXIgdGhlIG1vc3QgcmVjZW50IHJ1bm5pbmcgdGVybWluYWxzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBuZXcgaXRlcmF0b3Igb3ZlciB0aGUgcnVubmluZyB0ZXJtaW5hbHMuXG4gICAgICovXG4gICAgcnVubmluZygpIHtcbiAgICAgICAgcmV0dXJuIGFsZ29yaXRobV8xLml0ZXIodGhpcy5fbW9kZWxzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRm9yY2UgYSByZWZyZXNoIG9mIHRoZSBydW5uaW5nIHRlcm1pbmFscy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHdpdGggdGhlIGxpc3Qgb2YgcnVubmluZyB0ZXJtaW5hbHMuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBpcyBpbnRlbmRlZCB0byBiZSBjYWxsZWQgb25seSBpbiByZXNwb25zZSB0byBhIHVzZXIgYWN0aW9uLFxuICAgICAqIHNpbmNlIHRoZSBtYW5hZ2VyIG1haW50YWlucyBpdHMgaW50ZXJuYWwgc3RhdGUuXG4gICAgICovXG4gICAgYXN5bmMgcmVmcmVzaFJ1bm5pbmcoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3BvbGxNb2RlbHMucmVmcmVzaCgpO1xuICAgICAgICBhd2FpdCB0aGlzLl9wb2xsTW9kZWxzLnRpY2s7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyB0ZXJtaW5hbCBzZXNzaW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgb3B0aW9ucyB1c2VkIHRvIGNyZWF0ZSB0aGUgdGVybWluYWwuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSB0ZXJtaW5hbCBjb25uZWN0aW9uIGluc3RhbmNlLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSBtYW5hZ2VyIGBzZXJ2ZXJTZXR0aW5nc2Agd2lsbCBiZSB1c2VkIHVubGVzcyBvdmVycmlkZGVuIGluIHRoZVxuICAgICAqIG9wdGlvbnMuXG4gICAgICovXG4gICAgYXN5bmMgc3RhcnROZXcob3B0aW9ucykge1xuICAgICAgICBjb25zdCBtb2RlbCA9IGF3YWl0IHJlc3RhcGlfMS5zdGFydE5ldyh0aGlzLnNlcnZlclNldHRpbmdzLCBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMubmFtZSwgb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmN3ZCk7XG4gICAgICAgIGF3YWl0IHRoaXMucmVmcmVzaFJ1bm5pbmcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdFRvKHsgbW9kZWwgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNodXQgZG93biBhIHRlcm1pbmFsIHNlc3Npb24gYnkgbmFtZS5cbiAgICAgKi9cbiAgICBhc3luYyBzaHV0ZG93bihuYW1lKSB7XG4gICAgICAgIGF3YWl0IHJlc3RhcGlfMS5zaHV0ZG93blRlcm1pbmFsKG5hbWUsIHRoaXMuc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2hSdW5uaW5nKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNodXQgZG93biBhbGwgdGVybWluYWwgc2Vzc2lvbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIGFsbCBvZiB0aGUgc2Vzc2lvbnMgYXJlIHNodXQgZG93bi5cbiAgICAgKi9cbiAgICBhc3luYyBzaHV0ZG93bkFsbCgpIHtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBsaXN0IG9mIG1vZGVscyB0byBtYWtlIHN1cmUgb3VyIGxpc3QgaXMgY3VycmVudC5cbiAgICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoUnVubmluZygpO1xuICAgICAgICAvLyBTaHV0IGRvd24gYWxsIG1vZGVscy5cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5fbmFtZXMubWFwKG5hbWUgPT4gcmVzdGFwaV8xLnNodXRkb3duVGVybWluYWwobmFtZSwgdGhpcy5zZXJ2ZXJTZXR0aW5ncykpKTtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBsaXN0IG9mIG1vZGVscyB0byBjbGVhciBvdXQgb3VyIHN0YXRlLlxuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2hSdW5uaW5nKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdG8gcG9sbCBydW5uaW5nIHRlcm1pbmFscyBhbmQgdXBkYXRlIHN0YXRlLlxuICAgICAqL1xuICAgIGFzeW5jIHJlcXVlc3RSdW5uaW5nKCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBsZXQgbW9kZWxzO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbW9kZWxzID0gYXdhaXQgcmVzdGFwaV8xLmxpc3RSdW5uaW5nKHRoaXMuc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBuZXR3b3JrIGVycm9ycywgYXMgd2VsbCBhcyBjYXNlcyB3aGVyZSB3ZSBhcmUgb24gYVxuICAgICAgICAgICAgLy8gSnVweXRlckh1YiBhbmQgdGhlIHNlcnZlciBpcyBub3QgcnVubmluZy4gSnVweXRlckh1YiByZXR1cm5zIGFcbiAgICAgICAgICAgIC8vIDUwMyAoPDIuMCkgb3IgNDI0ICg+Mi4wKSBpbiB0aGF0IGNhc2UuXG4gICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgX18xLlNlcnZlckNvbm5lY3Rpb24uTmV0d29ya0Vycm9yIHx8XG4gICAgICAgICAgICAgICAgKChfYSA9IGVyci5yZXNwb25zZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnN0YXR1cykgPT09IDUwMyB8fFxuICAgICAgICAgICAgICAgICgoX2IgPSBlcnIucmVzcG9uc2UpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zdGF0dXMpID09PSA0MjQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9uRmFpbHVyZS5lbWl0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5hbWVzID0gbW9kZWxzLm1hcCgoeyBuYW1lIH0pID0+IG5hbWUpLnNvcnQoKTtcbiAgICAgICAgaWYgKG5hbWVzID09PSB0aGlzLl9uYW1lcykge1xuICAgICAgICAgICAgLy8gSWRlbnRpY2FsIG1vZGVscyBsaXN0LCBzbyBqdXN0IHJldHVyblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX25hbWVzID0gbmFtZXM7XG4gICAgICAgIHRoaXMuX3Rlcm1pbmFsQ29ubmVjdGlvbnMuZm9yRWFjaCh0YyA9PiB7XG4gICAgICAgICAgICBpZiAoIW5hbWVzLmluY2x1ZGVzKHRjLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGMuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fcnVubmluZ0NoYW5nZWQuZW1pdCh0aGlzLl9tb2RlbHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBzZXNzaW9uIHN0YXJ0aW5nLlxuICAgICAqL1xuICAgIF9vblN0YXJ0ZWQodGVybWluYWxDb25uZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuX3Rlcm1pbmFsQ29ubmVjdGlvbnMuYWRkKHRlcm1pbmFsQ29ubmVjdGlvbik7XG4gICAgICAgIHRlcm1pbmFsQ29ubmVjdGlvbi5kaXNwb3NlZC5jb25uZWN0KHRoaXMuX29uRGlzcG9zZWQsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBzZXNzaW9uIHRlcm1pbmF0aW5nLlxuICAgICAqL1xuICAgIF9vbkRpc3Bvc2VkKHRlcm1pbmFsQ29ubmVjdGlvbikge1xuICAgICAgICB0aGlzLl90ZXJtaW5hbENvbm5lY3Rpb25zLmRlbGV0ZSh0ZXJtaW5hbENvbm5lY3Rpb24pO1xuICAgICAgICAvLyBVcGRhdGUgdGhlIHJ1bm5pbmcgbW9kZWxzIHRvIG1ha2Ugc3VyZSB3ZSByZWZsZWN0IHRoZSBzZXJ2ZXIgc3RhdGVcbiAgICAgICAgdm9pZCB0aGlzLnJlZnJlc2hSdW5uaW5nKCkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgLyogbm8tb3AgKi9cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBfbW9kZWxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZXMubWFwKG5hbWUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgbmFtZSB9O1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLlRlcm1pbmFsTWFuYWdlciA9IFRlcm1pbmFsTWFuYWdlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hbmFnZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNodXRkb3duVGVybWluYWwgPSBleHBvcnRzLmxpc3RSdW5uaW5nID0gZXhwb3J0cy5zdGFydE5ldyA9IGV4cG9ydHMuaXNBdmFpbGFibGUgPSBleHBvcnRzLlRFUk1JTkFMX1NFUlZJQ0VfVVJMID0gdm9pZCAwO1xuY29uc3QgY29yZXV0aWxzXzEgPSByZXF1aXJlKFwiQGp1cHl0ZXJsYWIvY29yZXV0aWxzXCIpO1xuY29uc3Qgc2VydmVyY29ubmVjdGlvbl8xID0gcmVxdWlyZShcIi4uL3NlcnZlcmNvbm5lY3Rpb25cIik7XG4vKipcbiAqIFRoZSB1cmwgZm9yIHRoZSB0ZXJtaW5hbCBzZXJ2aWNlLlxuICovXG5leHBvcnRzLlRFUk1JTkFMX1NFUlZJQ0VfVVJMID0gJ2FwaS90ZXJtaW5hbHMnO1xuLyoqXG4gKiBXaGV0aGVyIHRoZSB0ZXJtaW5hbCBzZXJ2aWNlIGlzIGF2YWlsYWJsZS5cbiAqL1xuZnVuY3Rpb24gaXNBdmFpbGFibGUoKSB7XG4gICAgY29uc3QgYXZhaWxhYmxlID0gU3RyaW5nKGNvcmV1dGlsc18xLlBhZ2VDb25maWcuZ2V0T3B0aW9uKCd0ZXJtaW5hbHNBdmFpbGFibGUnKSk7XG4gICAgcmV0dXJuIGF2YWlsYWJsZS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XG59XG5leHBvcnRzLmlzQXZhaWxhYmxlID0gaXNBdmFpbGFibGU7XG4vKipcbiAqIFN0YXJ0IGEgbmV3IHRlcm1pbmFsIHNlc3Npb24uXG4gKlxuICogQHBhcmFtIHNldHRpbmdzIC0gVGhlIHNlcnZlciBzZXR0aW5ncyB0byB1c2UuXG4gKlxuICogQHBhcmFtIG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgdGFyZ2V0IHRlcm1pbmFsLlxuICpcbiAqIEBwYXJhbSBjd2QgLSBUaGUgcGF0aCBpbiB3aGljaCB0aGUgdGVybWluYWwgd2lsbCBzdGFydC5cbiAqXG4gKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBzZXNzaW9uIG1vZGVsLlxuICovXG5hc3luYyBmdW5jdGlvbiBzdGFydE5ldyhzZXR0aW5ncyA9IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VTZXR0aW5ncygpLCBuYW1lLCBjd2QpIHtcbiAgICBQcml2YXRlLmVycm9ySWZOb3RBdmFpbGFibGUoKTtcbiAgICBjb25zdCB1cmwgPSBjb3JldXRpbHNfMS5VUkxFeHQuam9pbihzZXR0aW5ncy5iYXNlVXJsLCBleHBvcnRzLlRFUk1JTkFMX1NFUlZJQ0VfVVJMKTtcbiAgICBjb25zdCBpbml0ID0ge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBuYW1lLCBjd2QgfSlcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24ubWFrZVJlcXVlc3QodXJsLCBpbml0LCBzZXR0aW5ncyk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgIGNvbnN0IGVyciA9IGF3YWl0IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLlJlc3BvbnNlRXJyb3IuY3JlYXRlKHJlc3BvbnNlKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIC8vIFRPRE86IFZhbGlkYXRlIG1vZGVsXG4gICAgcmV0dXJuIGRhdGE7XG59XG5leHBvcnRzLnN0YXJ0TmV3ID0gc3RhcnROZXc7XG4vKipcbiAqIExpc3QgdGhlIHJ1bm5pbmcgdGVybWluYWwgc2Vzc2lvbnMuXG4gKlxuICogQHBhcmFtIHNldHRpbmdzIC0gVGhlIHNlcnZlciBzZXR0aW5ncyB0byB1c2UuXG4gKlxuICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgbGlzdCBvZiBydW5uaW5nIHNlc3Npb24gbW9kZWxzLlxuICovXG5hc3luYyBmdW5jdGlvbiBsaXN0UnVubmluZyhzZXR0aW5ncyA9IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VTZXR0aW5ncygpKSB7XG4gICAgUHJpdmF0ZS5lcnJvcklmTm90QXZhaWxhYmxlKCk7XG4gICAgY29uc3QgdXJsID0gY29yZXV0aWxzXzEuVVJMRXh0LmpvaW4oc2V0dGluZ3MuYmFzZVVybCwgZXhwb3J0cy5URVJNSU5BTF9TRVJWSUNFX1VSTCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzZXJ2ZXJjb25uZWN0aW9uXzEuU2VydmVyQ29ubmVjdGlvbi5tYWtlUmVxdWVzdCh1cmwsIHt9LCBzZXR0aW5ncyk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgIGNvbnN0IGVyciA9IGF3YWl0IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLlJlc3BvbnNlRXJyb3IuY3JlYXRlKHJlc3BvbnNlKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdGVybWluYWwgbGlzdCcpO1xuICAgIH1cbiAgICAvLyBUT0RPOiB2YWxpZGF0ZSBlYWNoIG1vZGVsXG4gICAgcmV0dXJuIGRhdGE7XG59XG5leHBvcnRzLmxpc3RSdW5uaW5nID0gbGlzdFJ1bm5pbmc7XG4vKipcbiAqIFNodXQgZG93biBhIHRlcm1pbmFsIHNlc3Npb24gYnkgbmFtZS5cbiAqXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSB0YXJnZXQgc2Vzc2lvbi5cbiAqXG4gKiBAcGFyYW0gc2V0dGluZ3MgLSBUaGUgc2VydmVyIHNldHRpbmdzIHRvIHVzZS5cbiAqXG4gKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzZXNzaW9uIGlzIHNodXQgZG93bi5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gc2h1dGRvd25UZXJtaW5hbChuYW1lLCBzZXR0aW5ncyA9IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VTZXR0aW5ncygpKSB7XG4gICAgdmFyIF9hO1xuICAgIFByaXZhdGUuZXJyb3JJZk5vdEF2YWlsYWJsZSgpO1xuICAgIGNvbnN0IHVybCA9IGNvcmV1dGlsc18xLlVSTEV4dC5qb2luKHNldHRpbmdzLmJhc2VVcmwsIGV4cG9ydHMuVEVSTUlOQUxfU0VSVklDRV9VUkwsIG5hbWUpO1xuICAgIGNvbnN0IGluaXQgPSB7IG1ldGhvZDogJ0RFTEVURScgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uLm1ha2VSZXF1ZXN0KHVybCwgaW5pdCwgc2V0dGluZ3MpO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBjb25zdCBtc2cgPSAoX2EgPSBkYXRhLm1lc3NhZ2UpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGBUaGUgdGVybWluYWwgc2Vzc2lvbiBcIiR7bmFtZX1cIlwiIGRvZXMgbm90IGV4aXN0IG9uIHRoZSBzZXJ2ZXJgO1xuICAgICAgICBjb25zb2xlLndhcm4obXNnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDQpIHtcbiAgICAgICAgY29uc3QgZXJyID0gYXdhaXQgc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24uUmVzcG9uc2VFcnJvci5jcmVhdGUocmVzcG9uc2UpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxufVxuZXhwb3J0cy5zaHV0ZG93blRlcm1pbmFsID0gc2h1dGRvd25UZXJtaW5hbDtcbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogVGhyb3cgYW4gZXJyb3IgaWYgdGVybWluYWxzIGFyZSBub3QgYXZhaWxhYmxlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGVycm9ySWZOb3RBdmFpbGFibGUoKSB7XG4gICAgICAgIGlmICghaXNBdmFpbGFibGUoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZXJtaW5hbHMgVW5hdmFpbGFibGUnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBQcml2YXRlLmVycm9ySWZOb3RBdmFpbGFibGUgPSBlcnJvcklmTm90QXZhaWxhYmxlO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXN0YXBpLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc0F2YWlsYWJsZSA9IHZvaWQgMDtcbmNvbnN0IHJlc3RhcGlfMSA9IHJlcXVpcmUoXCIuL3Jlc3RhcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJpc0F2YWlsYWJsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVzdGFwaV8xLmlzQXZhaWxhYmxlOyB9IH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGVybWluYWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnZhbGlkYXRlUHJvcGVydHkgPSB2b2lkIDA7XG4vKipcbiAqIFZhbGlkYXRlIGEgcHJvcGVydHkgYXMgYmVpbmcgb24gYW4gb2JqZWN0LCBhbmQgb3B0aW9uYWxseVxuICogb2YgYSBnaXZlbiB0eXBlIGFuZCBhbW9uZyBhIGdpdmVuIHNldCBvZiB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcGVydHkob2JqZWN0LCBuYW1lLCB0eXBlTmFtZSwgdmFsdWVzID0gW10pIHtcbiAgICBpZiAoIW9iamVjdC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICB0aHJvdyBFcnJvcihgTWlzc2luZyBwcm9wZXJ0eSAnJHtuYW1lfSdgKTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSBvYmplY3RbbmFtZV07XG4gICAgaWYgKHR5cGVOYW1lICE9PSB2b2lkIDApIHtcbiAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgc3dpdGNoICh0eXBlTmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICAgICAgICAgIHZhbGlkID0gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgIHZhbGlkID0gdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdmFsaWQgPSB0eXBlb2YgdmFsdWUgPT09IHR5cGVOYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUHJvcGVydHkgJyR7bmFtZX0nIGlzIG5vdCBvZiB0eXBlICcke3R5cGVOYW1lfSdgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IHZhbHVlcy5pbmNsdWRlcyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gdmFsdWVzLmZpbmRJbmRleCh2ID0+IHYgPT09IHZhbHVlKSA+PSAwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFByb3BlcnR5ICcke25hbWV9JyBpcyBub3Qgb25lIG9mIHRoZSB2YWxpZCB2YWx1ZXMgJHtKU09OLnN0cmluZ2lmeSh2YWx1ZXMpfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy52YWxpZGF0ZVByb3BlcnR5ID0gdmFsaWRhdGVQcm9wZXJ0eTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZhbGlkYXRlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Xb3Jrc3BhY2VNYW5hZ2VyID0gdm9pZCAwO1xuY29uc3QgY29yZXV0aWxzXzEgPSByZXF1aXJlKFwiQGp1cHl0ZXJsYWIvY29yZXV0aWxzXCIpO1xuY29uc3Qgc3RhdGVkYl8xID0gcmVxdWlyZShcIkBqdXB5dGVybGFiL3N0YXRlZGJcIik7XG5jb25zdCBzZXJ2ZXJjb25uZWN0aW9uXzEgPSByZXF1aXJlKFwiLi4vc2VydmVyY29ubmVjdGlvblwiKTtcbi8qKlxuICogVGhlIHVybCBmb3IgdGhlIGxhYiB3b3Jrc3BhY2VzIHNlcnZpY2UuXG4gKi9cbmNvbnN0IFNFUlZJQ0VfV09SS1NQQUNFU19VUkwgPSAnYXBpL3dvcmtzcGFjZXMnO1xuLyoqXG4gKiBUaGUgd29ya3NwYWNlcyBBUEkgc2VydmljZSBtYW5hZ2VyLlxuICovXG5jbGFzcyBXb3Jrc3BhY2VNYW5hZ2VyIGV4dGVuZHMgc3RhdGVkYl8xLkRhdGFDb25uZWN0b3Ige1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyB3b3Jrc3BhY2UgbWFuYWdlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNlcnZlclNldHRpbmdzID0gKF9hID0gb3B0aW9ucy5zZXJ2ZXJTZXR0aW5ncykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb24ubWFrZVNldHRpbmdzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZldGNoIGEgd29ya3NwYWNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIC0gVGhlIHdvcmtzcGFjZSdzIElELlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgaWYgc3VjY2Vzc2Z1bC5cbiAgICAgKi9cbiAgICBhc3luYyBmZXRjaChpZCkge1xuICAgICAgICBjb25zdCB7IHNlcnZlclNldHRpbmdzIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCB7IGJhc2VVcmwsIGFwcFVybCB9ID0gc2VydmVyU2V0dGluZ3M7XG4gICAgICAgIGNvbnN0IHsgbWFrZVJlcXVlc3QsIFJlc3BvbnNlRXJyb3IgfSA9IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uO1xuICAgICAgICBjb25zdCBiYXNlID0gYmFzZVVybCArIGFwcFVybDtcbiAgICAgICAgY29uc3QgdXJsID0gUHJpdmF0ZS51cmwoYmFzZSwgaWQpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG1ha2VSZXF1ZXN0KHVybCwge30sIHNlcnZlclNldHRpbmdzKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBhd2FpdCBSZXNwb25zZUVycm9yLmNyZWF0ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmV0Y2ggdGhlIGxpc3Qgb2Ygd29ya3NwYWNlIElEcyB0aGF0IGV4aXN0IG9uIHRoZSBzZXJ2ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBpZiBzdWNjZXNzZnVsLlxuICAgICAqL1xuICAgIGFzeW5jIGxpc3QoKSB7XG4gICAgICAgIGNvbnN0IHsgc2VydmVyU2V0dGluZ3MgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHsgYmFzZVVybCwgYXBwVXJsIH0gPSBzZXJ2ZXJTZXR0aW5ncztcbiAgICAgICAgY29uc3QgeyBtYWtlUmVxdWVzdCwgUmVzcG9uc2VFcnJvciB9ID0gc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb247XG4gICAgICAgIGNvbnN0IGJhc2UgPSBiYXNlVXJsICsgYXBwVXJsO1xuICAgICAgICBjb25zdCB1cmwgPSBQcml2YXRlLnVybChiYXNlLCAnJyk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbWFrZVJlcXVlc3QodXJsLCB7fSwgc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IGF3YWl0IFJlc3BvbnNlRXJyb3IuY3JlYXRlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQud29ya3NwYWNlcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgd29ya3NwYWNlIGZyb20gdGhlIHNlcnZlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAtIFRoZSB3b3Jrc3BhY2VzJ3MgSUQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBpZiBzdWNjZXNzZnVsLlxuICAgICAqL1xuICAgIGFzeW5jIHJlbW92ZShpZCkge1xuICAgICAgICBjb25zdCB7IHNlcnZlclNldHRpbmdzIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCB7IGJhc2VVcmwsIGFwcFVybCB9ID0gc2VydmVyU2V0dGluZ3M7XG4gICAgICAgIGNvbnN0IHsgbWFrZVJlcXVlc3QsIFJlc3BvbnNlRXJyb3IgfSA9IHNlcnZlcmNvbm5lY3Rpb25fMS5TZXJ2ZXJDb25uZWN0aW9uO1xuICAgICAgICBjb25zdCBiYXNlID0gYmFzZVVybCArIGFwcFVybDtcbiAgICAgICAgY29uc3QgdXJsID0gUHJpdmF0ZS51cmwoYmFzZSwgaWQpO1xuICAgICAgICBjb25zdCBpbml0ID0geyBtZXRob2Q6ICdERUxFVEUnIH07XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbWFrZVJlcXVlc3QodXJsLCBpbml0LCBzZXJ2ZXJTZXR0aW5ncyk7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwNCkge1xuICAgICAgICAgICAgY29uc3QgZXJyID0gYXdhaXQgUmVzcG9uc2VFcnJvci5jcmVhdGUocmVzcG9uc2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhdmUgYSB3b3Jrc3BhY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgLSBUaGUgd29ya3NwYWNlJ3MgSUQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd29ya3NwYWNlIC0gVGhlIHdvcmtzcGFjZSBiZWluZyBzYXZlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGlmIHN1Y2Nlc3NmdWwuXG4gICAgICovXG4gICAgYXN5bmMgc2F2ZShpZCwgd29ya3NwYWNlKSB7XG4gICAgICAgIGNvbnN0IHsgc2VydmVyU2V0dGluZ3MgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHsgYmFzZVVybCwgYXBwVXJsIH0gPSBzZXJ2ZXJTZXR0aW5ncztcbiAgICAgICAgY29uc3QgeyBtYWtlUmVxdWVzdCwgUmVzcG9uc2VFcnJvciB9ID0gc2VydmVyY29ubmVjdGlvbl8xLlNlcnZlckNvbm5lY3Rpb247XG4gICAgICAgIGNvbnN0IGJhc2UgPSBiYXNlVXJsICsgYXBwVXJsO1xuICAgICAgICBjb25zdCB1cmwgPSBQcml2YXRlLnVybChiYXNlLCBpZCk7XG4gICAgICAgIGNvbnN0IGluaXQgPSB7IGJvZHk6IEpTT04uc3RyaW5naWZ5KHdvcmtzcGFjZSksIG1ldGhvZDogJ1BVVCcgfTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBtYWtlUmVxdWVzdCh1cmwsIGluaXQsIHNlcnZlclNldHRpbmdzKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjA0KSB7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBhd2FpdCBSZXNwb25zZUVycm9yLmNyZWF0ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLldvcmtzcGFjZU1hbmFnZXIgPSBXb3Jrc3BhY2VNYW5hZ2VyO1xuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgcHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdXJsIGZvciBhIHdvcmtzcGFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1cmwoYmFzZSwgaWQpIHtcbiAgICAgICAgcmV0dXJuIGNvcmV1dGlsc18xLlVSTEV4dC5qb2luKGJhc2UsIFNFUlZJQ0VfV09SS1NQQUNFU19VUkwsIGlkKTtcbiAgICB9XG4gICAgUHJpdmF0ZS51cmwgPSB1cmw7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=