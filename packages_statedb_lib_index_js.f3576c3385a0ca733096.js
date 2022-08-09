(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_statedb_lib_index_js"],{

/***/ "../../packages/statedb/lib/dataconnector.js":
/*!***************************************************!*\
  !*** ../../packages/statedb/lib/dataconnector.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataConnector = void 0;
/**
 * An abstract class that adheres to the data connector interface.
 *
 * @typeparam T - The basic entity response type a service's connector.
 *
 * @typeparam U - The basic entity request type, which is conventionally the
 * same as the response type but may be different if a service's implementation
 * requires input data to be different from output responses. Defaults to `T`.
 *
 * @typeparam V - The basic token applied to a request, conventionally a string
 * ID or filter, but may be set to a different type when an implementation
 * requires it. Defaults to `string`.
 *
 * @typeparam W - The type of the optional `query` parameter of the `list`
 * method. Defaults to `string`.
 *
 * #### Notes
 * The only abstract method in this class is the `fetch` method, which must be
 * reimplemented by all subclasses. The `remove` and `save` methods have a
 * default implementation that returns a promise that will always reject. This
 * class is a convenience superclass for connectors that only need to `fetch`.
 */
class DataConnector {
    /**
     * Retrieve the list of items available from the data connector.
     *
     * @param query - The optional query filter to apply to the connector request.
     *
     * @returns A promise that always rejects with an error.
     *
     * #### Notes
     * Subclasses should reimplement if they support a back-end that can list.
     */
    async list(query) {
        throw new Error('DataConnector#list method has not been implemented.');
    }
    /**
     * Remove a value using the data connector.
     *
     * @param id - The identifier for the data being removed.
     *
     * @returns A promise that always rejects with an error.
     *
     * #### Notes
     * Subclasses should reimplement if they support a back-end that can remove.
     */
    async remove(id) {
        throw new Error('DataConnector#remove method has not been implemented.');
    }
    /**
     * Save a value using the data connector.
     *
     * @param id - The identifier for the data being saved.
     *
     * @param value - The data being saved.
     *
     * @returns A promise that always rejects with an error.
     *
     * #### Notes
     * Subclasses should reimplement if they support a back-end that can save.
     */
    async save(id, value) {
        throw new Error('DataConnector#save method has not been implemented.');
    }
}
exports.DataConnector = DataConnector;
//# sourceMappingURL=dataconnector.js.map

/***/ }),

/***/ "../../packages/statedb/lib/index.js":
/*!*******************************************!*\
  !*** ../../packages/statedb/lib/index.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module statedb
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
__exportStar(__webpack_require__(/*! ./dataconnector */ "../../packages/statedb/lib/dataconnector.js"), exports);
__exportStar(__webpack_require__(/*! ./interfaces */ "../../packages/statedb/lib/interfaces.js"), exports);
__exportStar(__webpack_require__(/*! ./restorablepool */ "../../packages/statedb/lib/restorablepool.js"), exports);
__exportStar(__webpack_require__(/*! ./statedb */ "../../packages/statedb/lib/statedb.js"), exports);
__exportStar(__webpack_require__(/*! ./tokens */ "../../packages/statedb/lib/tokens.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/statedb/lib/interfaces.js":
/*!************************************************!*\
  !*** ../../packages/statedb/lib/interfaces.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=interfaces.js.map

/***/ }),

/***/ "../../packages/statedb/lib/restorablepool.js":
/*!****************************************************!*\
  !*** ../../packages/statedb/lib/restorablepool.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RestorablePool = void 0;
const coreutils_1 = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
const properties_1 = __webpack_require__(/*! @lumino/properties */ "webpack/sharing/consume/default/@lumino/properties/@lumino/properties?140a");
const signaling_1 = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/**
 * An object pool that supports restoration.
 *
 * @typeparam T - The type of object being tracked.
 */
class RestorablePool {
    /**
     * Create a new restorable pool.
     *
     * @param options - The instantiation options for a restorable pool.
     */
    constructor(options) {
        this._added = new signaling_1.Signal(this);
        this._current = null;
        this._currentChanged = new signaling_1.Signal(this);
        this._hasRestored = false;
        this._isDisposed = false;
        this._objects = new Set();
        this._restore = null;
        this._restored = new coreutils_1.PromiseDelegate();
        this._updated = new signaling_1.Signal(this);
        this.namespace = options.namespace;
    }
    /**
     * A signal emitted when an object object is added.
     *
     * #### Notes
     * This signal will only fire when an object is added to the pool.
     * It will not fire if an object injected into the pool.
     */
    get added() {
        return this._added;
    }
    /**
     * The current object.
     *
     * #### Notes
     * The restorable pool does not set `current`. It is intended for client use.
     *
     * If `current` is set to an object that does not exist in the pool, it is a
     * no-op.
     */
    get current() {
        return this._current;
    }
    set current(obj) {
        if (this._current === obj) {
            return;
        }
        if (obj !== null && this._objects.has(obj)) {
            this._current = obj;
            this._currentChanged.emit(this._current);
        }
    }
    /**
     * A signal emitted when the current widget changes.
     */
    get currentChanged() {
        return this._currentChanged;
    }
    /**
     * Test whether the pool is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * A promise resolved when the restorable pool has been restored.
     */
    get restored() {
        return this._restored.promise;
    }
    /**
     * The number of objects held by the pool.
     */
    get size() {
        return this._objects.size;
    }
    /**
     * A signal emitted when an object is updated.
     */
    get updated() {
        return this._updated;
    }
    /**
     * Add a new object to the pool.
     *
     * @param obj - The object object being added.
     *
     * #### Notes
     * The object passed into the pool is added synchronously; its existence in
     * the pool can be checked with the `has()` method. The promise this method
     * returns resolves after the object has been added and saved to an underlying
     * restoration connector, if one is available.
     */
    async add(obj) {
        var _a, _b;
        if (obj.isDisposed) {
            const warning = 'A disposed object cannot be added.';
            console.warn(warning, obj);
            throw new Error(warning);
        }
        if (this._objects.has(obj)) {
            const warning = 'This object already exists in the pool.';
            console.warn(warning, obj);
            throw new Error(warning);
        }
        this._objects.add(obj);
        obj.disposed.connect(this._onInstanceDisposed, this);
        if (Private.injectedProperty.get(obj)) {
            return;
        }
        if (this._restore) {
            const { connector } = this._restore;
            const objName = this._restore.name(obj);
            if (objName) {
                const name = `${this.namespace}:${objName}`;
                const data = (_b = (_a = this._restore).args) === null || _b === void 0 ? void 0 : _b.call(_a, obj);
                Private.nameProperty.set(obj, name);
                await connector.save(name, { data });
            }
        }
        // Emit the added signal.
        this._added.emit(obj);
    }
    /**
     * Dispose of the resources held by the pool.
     *
     * #### Notes
     * Disposing a pool does not affect the underlying data in the data connector,
     * it simply disposes the client-side pool without making any connector calls.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._current = null;
        this._isDisposed = true;
        this._objects.clear();
        signaling_1.Signal.clearData(this);
    }
    /**
     * Find the first object in the pool that satisfies a filter function.
     *
     * @param - fn The filter function to call on each object.
     */
    find(fn) {
        const values = this._objects.values();
        for (const value of values) {
            if (fn(value)) {
                return value;
            }
        }
        return undefined;
    }
    /**
     * Iterate through each object in the pool.
     *
     * @param fn - The function to call on each object.
     */
    forEach(fn) {
        this._objects.forEach(fn);
    }
    /**
     * Filter the objects in the pool based on a predicate.
     *
     * @param fn - The function by which to filter.
     */
    filter(fn) {
        const filtered = [];
        this.forEach(obj => {
            if (fn(obj)) {
                filtered.push(obj);
            }
        });
        return filtered;
    }
    /**
     * Inject an object into the restorable pool without the pool handling its
     * restoration lifecycle.
     *
     * @param obj - The object to inject into the pool.
     */
    inject(obj) {
        Private.injectedProperty.set(obj, true);
        return this.add(obj);
    }
    /**
     * Check if this pool has the specified object.
     *
     * @param obj - The object whose existence is being checked.
     */
    has(obj) {
        return this._objects.has(obj);
    }
    /**
     * Restore the objects in this pool's namespace.
     *
     * @param options - The configuration options that describe restoration.
     *
     * @returns A promise that resolves when restoration has completed.
     *
     * #### Notes
     * This function should almost never be invoked by client code. Its primary
     * use case is to be invoked by a layout restorer plugin that handles
     * multiple restorable pools and, when ready, asks them each to restore their
     * respective objects.
     */
    async restore(options) {
        if (this._hasRestored) {
            throw new Error('This pool has already been restored.');
        }
        this._hasRestored = true;
        const { command, connector, registry, when } = options;
        const namespace = this.namespace;
        const promises = when
            ? [connector.list(namespace)].concat(when)
            : [connector.list(namespace)];
        this._restore = options;
        const [saved] = await Promise.all(promises);
        const values = await Promise.all(saved.ids.map(async (id, index) => {
            const value = saved.values[index];
            const args = value && value.data;
            if (args === undefined) {
                return connector.remove(id);
            }
            // Execute the command and if it fails, delete the state restore data.
            return registry
                .execute(command, args)
                .catch(() => connector.remove(id));
        }));
        this._restored.resolve();
        return values;
    }
    /**
     * Save the restore data for a given object.
     *
     * @param obj - The object being saved.
     */
    async save(obj) {
        var _a, _b;
        const injected = Private.injectedProperty.get(obj);
        if (!this._restore || !this.has(obj) || injected) {
            return;
        }
        const { connector } = this._restore;
        const objName = this._restore.name(obj);
        const oldName = Private.nameProperty.get(obj);
        const newName = objName ? `${this.namespace}:${objName}` : '';
        if (oldName && oldName !== newName) {
            await connector.remove(oldName);
        }
        // Set the name property irrespective of whether the new name is null.
        Private.nameProperty.set(obj, newName);
        if (newName) {
            const data = (_b = (_a = this._restore).args) === null || _b === void 0 ? void 0 : _b.call(_a, obj);
            await connector.save(newName, { data });
        }
        if (oldName !== newName) {
            this._updated.emit(obj);
        }
    }
    /**
     * Clean up after disposed objects.
     */
    _onInstanceDisposed(obj) {
        this._objects.delete(obj);
        if (obj === this._current) {
            this._current = null;
            this._currentChanged.emit(this._current);
        }
        if (Private.injectedProperty.get(obj)) {
            return;
        }
        if (!this._restore) {
            return;
        }
        const { connector } = this._restore;
        const name = Private.nameProperty.get(obj);
        if (name) {
            void connector.remove(name);
        }
    }
}
exports.RestorablePool = RestorablePool;
/*
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * An attached property to indicate whether an object has been injected.
     */
    Private.injectedProperty = new properties_1.AttachedProperty({
        name: 'injected',
        create: () => false
    });
    /**
     * An attached property for an object's ID.
     */
    Private.nameProperty = new properties_1.AttachedProperty({
        name: 'name',
        create: () => ''
    });
})(Private || (Private = {}));
//# sourceMappingURL=restorablepool.js.map

/***/ }),

/***/ "../../packages/statedb/lib/statedb.js":
/*!*********************************************!*\
  !*** ../../packages/statedb/lib/statedb.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StateDB = void 0;
const signaling_1 = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/**
 * The default concrete implementation of a state database.
 */
class StateDB {
    /**
     * Create a new state database.
     *
     * @param options - The instantiation options for a state database.
     */
    constructor(options = {}) {
        this._changed = new signaling_1.Signal(this);
        const { connector, transform } = options;
        this._connector = connector || new StateDB.Connector();
        if (!transform) {
            this._ready = Promise.resolve(undefined);
        }
        else {
            this._ready = transform.then(transformation => {
                const { contents, type } = transformation;
                switch (type) {
                    case 'cancel':
                        return;
                    case 'clear':
                        return this._clear();
                    case 'merge':
                        return this._merge(contents || {});
                    case 'overwrite':
                        return this._overwrite(contents || {});
                    default:
                        return;
                }
            });
        }
    }
    /**
     * A signal that emits the change type any time a value changes.
     */
    get changed() {
        return this._changed;
    }
    /**
     * Clear the entire database.
     */
    async clear() {
        await this._ready;
        await this._clear();
    }
    /**
     * Retrieve a saved bundle from the database.
     *
     * @param id - The identifier used to retrieve a data bundle.
     *
     * @returns A promise that bears a data payload if available.
     *
     * #### Notes
     * The `id` values of stored items in the state database are formatted:
     * `'namespace:identifier'`, which is the same convention that command
     * identifiers in JupyterLab use as well. While this is not a technical
     * requirement for `fetch()`, `remove()`, and `save()`, it *is* necessary for
     * using the `list(namespace: string)` method.
     *
     * The promise returned by this method may be rejected if an error occurs in
     * retrieving the data. Non-existence of an `id` will succeed with the `value`
     * `undefined`.
     */
    async fetch(id) {
        await this._ready;
        return this._fetch(id);
    }
    /**
     * Retrieve all the saved bundles for a namespace.
     *
     * @param filter - The namespace prefix to retrieve.
     *
     * @returns A promise that bears a collection of payloads for a namespace.
     *
     * #### Notes
     * Namespaces are entirely conventional entities. The `id` values of stored
     * items in the state database are formatted: `'namespace:identifier'`, which
     * is the same convention that command identifiers in JupyterLab use as well.
     *
     * If there are any errors in retrieving the data, they will be logged to the
     * console in order to optimistically return any extant data without failing.
     * This promise will always succeed.
     */
    async list(namespace) {
        await this._ready;
        return this._list(namespace);
    }
    /**
     * Remove a value from the database.
     *
     * @param id - The identifier for the data being removed.
     *
     * @returns A promise that is rejected if remove fails and succeeds otherwise.
     */
    async remove(id) {
        await this._ready;
        await this._remove(id);
        this._changed.emit({ id, type: 'remove' });
    }
    /**
     * Save a value in the database.
     *
     * @param id - The identifier for the data being saved.
     *
     * @param value - The data being saved.
     *
     * @returns A promise that is rejected if saving fails and succeeds otherwise.
     *
     * #### Notes
     * The `id` values of stored items in the state database are formatted:
     * `'namespace:identifier'`, which is the same convention that command
     * identifiers in JupyterLab use as well. While this is not a technical
     * requirement for `fetch()`, `remove()`, and `save()`, it *is* necessary for
     * using the `list(namespace: string)` method.
     */
    async save(id, value) {
        await this._ready;
        await this._save(id, value);
        this._changed.emit({ id, type: 'save' });
    }
    /**
     * Return a serialized copy of the state database's entire contents.
     *
     * @returns A promise that resolves with the database contents as JSON.
     */
    async toJSON() {
        await this._ready;
        const { ids, values } = await this._list();
        return values.reduce((acc, val, idx) => {
            acc[ids[idx]] = val;
            return acc;
        }, {});
    }
    /**
     * Clear the entire database.
     */
    async _clear() {
        await Promise.all((await this._list()).ids.map(id => this._remove(id)));
    }
    /**
     * Fetch a value from the database.
     */
    async _fetch(id) {
        const value = await this._connector.fetch(id);
        if (value) {
            return JSON.parse(value).v;
        }
    }
    /**
     * Fetch a list from the database.
     */
    async _list(namespace = '') {
        const { ids, values } = await this._connector.list(namespace);
        return {
            ids,
            values: values.map(val => JSON.parse(val).v)
        };
    }
    /**
     * Merge data into the state database.
     */
    async _merge(contents) {
        await Promise.all(Object.keys(contents).map(key => contents[key] && this._save(key, contents[key])));
    }
    /**
     * Overwrite the entire database with new contents.
     */
    async _overwrite(contents) {
        await this._clear();
        await this._merge(contents);
    }
    /**
     * Remove a key in the database.
     */
    async _remove(id) {
        return this._connector.remove(id);
    }
    /**
     * Save a key and its value in the database.
     */
    async _save(id, value) {
        return this._connector.save(id, JSON.stringify({ v: value }));
    }
}
exports.StateDB = StateDB;
/**
 * A namespace for StateDB statics.
 */
(function (StateDB) {
    /**
     * An in-memory string key/value data connector.
     */
    class Connector {
        constructor() {
            this._storage = {};
        }
        /**
         * Retrieve an item from the data connector.
         */
        async fetch(id) {
            return this._storage[id];
        }
        /**
         * Retrieve the list of items available from the data connector.
         *
         * @param namespace - If not empty, only keys whose first token before `:`
         * exactly match `namespace` will be returned, e.g. `foo` in `foo:bar`.
         */
        async list(namespace = '') {
            return Object.keys(this._storage).reduce((acc, val) => {
                if (namespace === '' ? true : namespace === val.split(':')[0]) {
                    acc.ids.push(val);
                    acc.values.push(this._storage[val]);
                }
                return acc;
            }, { ids: [], values: [] });
        }
        /**
         * Remove a value using the data connector.
         */
        async remove(id) {
            delete this._storage[id];
        }
        /**
         * Save a value using the data connector.
         */
        async save(id, value) {
            this._storage[id] = value;
        }
    }
    StateDB.Connector = Connector;
})(StateDB = exports.StateDB || (exports.StateDB = {}));
//# sourceMappingURL=statedb.js.map

/***/ }),

/***/ "../../packages/statedb/lib/tokens.js":
/*!********************************************!*\
  !*** ../../packages/statedb/lib/tokens.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IStateDB = void 0;
const coreutils_1 = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* tslint:disable */
/**
 * The default state database token.
 */
exports.IStateDB = new coreutils_1.Token('@jupyterlab/coreutils:IStateDB');
//# sourceMappingURL=tokens.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc3RhdGVkYi9saWIvZGF0YWNvbm5lY3Rvci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc3RhdGVkYi9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3N0YXRlZGIvbGliL2ludGVyZmFjZXMuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3N0YXRlZGIvbGliL3Jlc3RvcmFibGVwb29sLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zdGF0ZWRiL2xpYi9zdGF0ZWRiLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zdGF0ZWRiL2xpYi90b2tlbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLHlDOzs7Ozs7Ozs7OztBQ3ZFYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLG9DQUFvQyxhQUFhLEVBQUUsRUFBRTtBQUN2RixDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsYUFBYSxtQkFBTyxDQUFDLG9FQUFpQjtBQUN0QyxhQUFhLG1CQUFPLENBQUMsOERBQWM7QUFDbkMsYUFBYSxtQkFBTyxDQUFDLHNFQUFrQjtBQUN2QyxhQUFhLG1CQUFPLENBQUMsd0RBQVc7QUFDaEMsYUFBYSxtQkFBTyxDQUFDLHNEQUFVO0FBQy9CLGlDOzs7Ozs7Ozs7OztBQ3pCYTtBQUNiO0FBQ0E7QUFDQSw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Qsc0M7Ozs7Ozs7Ozs7O0FDSmE7QUFDYjtBQUNBO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELHNCQUFzQjtBQUN0QixvQkFBb0IsbUJBQU8sQ0FBQyxtR0FBbUI7QUFDL0MscUJBQXFCLG1CQUFPLENBQUMsc0dBQW9CO0FBQ2pELG9CQUFvQixtQkFBTyxDQUFDLG1HQUFtQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQ7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0EsZ0NBQWdDLGVBQWUsR0FBRyxRQUFRO0FBQzFEO0FBQ0E7QUFDQSw0Q0FBNEMsT0FBTztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUscUNBQXFDO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFlBQVk7QUFDM0I7QUFDQTtBQUNBLHFDQUFxQyxlQUFlLEdBQUcsUUFBUTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxPQUFPO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFlBQVk7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMsMEJBQTBCO0FBQzNCLDBDOzs7Ozs7Ozs7OztBQ3pUYTtBQUNiO0FBQ0E7QUFDQSw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsZUFBZTtBQUNmLG9CQUFvQixtQkFBTyxDQUFDLG1HQUFtQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQSxlQUFlLHVCQUF1QjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBLDZEQUE2RDtBQUM3RDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIscUJBQXFCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsbUJBQW1CO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGNBQWM7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsU0FBUyxJQUFJO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsY0FBYztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxXQUFXO0FBQ25FO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxHQUFHLHNCQUFzQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdDQUFnQyxlQUFlLEtBQUs7QUFDckQsbUM7Ozs7Ozs7Ozs7O0FDaFBhO0FBQ2I7QUFDQTtBQUNBLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxnQkFBZ0I7QUFDaEIsb0JBQW9CLG1CQUFPLENBQUMsbUdBQW1CO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLGtDIiwiZmlsZSI6InBhY2thZ2VzX3N0YXRlZGJfbGliX2luZGV4X2pzLmYzNTc2YzMzODVhMGNhNzMzMDk2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRhdGFDb25uZWN0b3IgPSB2b2lkIDA7XG4vKipcbiAqIEFuIGFic3RyYWN0IGNsYXNzIHRoYXQgYWRoZXJlcyB0byB0aGUgZGF0YSBjb25uZWN0b3IgaW50ZXJmYWNlLlxuICpcbiAqIEB0eXBlcGFyYW0gVCAtIFRoZSBiYXNpYyBlbnRpdHkgcmVzcG9uc2UgdHlwZSBhIHNlcnZpY2UncyBjb25uZWN0b3IuXG4gKlxuICogQHR5cGVwYXJhbSBVIC0gVGhlIGJhc2ljIGVudGl0eSByZXF1ZXN0IHR5cGUsIHdoaWNoIGlzIGNvbnZlbnRpb25hbGx5IHRoZVxuICogc2FtZSBhcyB0aGUgcmVzcG9uc2UgdHlwZSBidXQgbWF5IGJlIGRpZmZlcmVudCBpZiBhIHNlcnZpY2UncyBpbXBsZW1lbnRhdGlvblxuICogcmVxdWlyZXMgaW5wdXQgZGF0YSB0byBiZSBkaWZmZXJlbnQgZnJvbSBvdXRwdXQgcmVzcG9uc2VzLiBEZWZhdWx0cyB0byBgVGAuXG4gKlxuICogQHR5cGVwYXJhbSBWIC0gVGhlIGJhc2ljIHRva2VuIGFwcGxpZWQgdG8gYSByZXF1ZXN0LCBjb252ZW50aW9uYWxseSBhIHN0cmluZ1xuICogSUQgb3IgZmlsdGVyLCBidXQgbWF5IGJlIHNldCB0byBhIGRpZmZlcmVudCB0eXBlIHdoZW4gYW4gaW1wbGVtZW50YXRpb25cbiAqIHJlcXVpcmVzIGl0LiBEZWZhdWx0cyB0byBgc3RyaW5nYC5cbiAqXG4gKiBAdHlwZXBhcmFtIFcgLSBUaGUgdHlwZSBvZiB0aGUgb3B0aW9uYWwgYHF1ZXJ5YCBwYXJhbWV0ZXIgb2YgdGhlIGBsaXN0YFxuICogbWV0aG9kLiBEZWZhdWx0cyB0byBgc3RyaW5nYC5cbiAqXG4gKiAjIyMjIE5vdGVzXG4gKiBUaGUgb25seSBhYnN0cmFjdCBtZXRob2QgaW4gdGhpcyBjbGFzcyBpcyB0aGUgYGZldGNoYCBtZXRob2QsIHdoaWNoIG11c3QgYmVcbiAqIHJlaW1wbGVtZW50ZWQgYnkgYWxsIHN1YmNsYXNzZXMuIFRoZSBgcmVtb3ZlYCBhbmQgYHNhdmVgIG1ldGhvZHMgaGF2ZSBhXG4gKiBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHRoYXQgcmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIGFsd2F5cyByZWplY3QuIFRoaXNcbiAqIGNsYXNzIGlzIGEgY29udmVuaWVuY2Ugc3VwZXJjbGFzcyBmb3IgY29ubmVjdG9ycyB0aGF0IG9ubHkgbmVlZCB0byBgZmV0Y2hgLlxuICovXG5jbGFzcyBEYXRhQ29ubmVjdG9yIHtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZSB0aGUgbGlzdCBvZiBpdGVtcyBhdmFpbGFibGUgZnJvbSB0aGUgZGF0YSBjb25uZWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcXVlcnkgLSBUaGUgb3B0aW9uYWwgcXVlcnkgZmlsdGVyIHRvIGFwcGx5IHRvIHRoZSBjb25uZWN0b3IgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IGFsd2F5cyByZWplY3RzIHdpdGggYW4gZXJyb3IuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogU3ViY2xhc3NlcyBzaG91bGQgcmVpbXBsZW1lbnQgaWYgdGhleSBzdXBwb3J0IGEgYmFjay1lbmQgdGhhdCBjYW4gbGlzdC5cbiAgICAgKi9cbiAgICBhc3luYyBsaXN0KHF1ZXJ5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YUNvbm5lY3RvciNsaXN0IG1ldGhvZCBoYXMgbm90IGJlZW4gaW1wbGVtZW50ZWQuJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIHZhbHVlIHVzaW5nIHRoZSBkYXRhIGNvbm5lY3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAtIFRoZSBpZGVudGlmaWVyIGZvciB0aGUgZGF0YSBiZWluZyByZW1vdmVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgYWx3YXlzIHJlamVjdHMgd2l0aCBhbiBlcnJvci5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBTdWJjbGFzc2VzIHNob3VsZCByZWltcGxlbWVudCBpZiB0aGV5IHN1cHBvcnQgYSBiYWNrLWVuZCB0aGF0IGNhbiByZW1vdmUuXG4gICAgICovXG4gICAgYXN5bmMgcmVtb3ZlKGlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YUNvbm5lY3RvciNyZW1vdmUgbWV0aG9kIGhhcyBub3QgYmVlbiBpbXBsZW1lbnRlZC4nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2F2ZSBhIHZhbHVlIHVzaW5nIHRoZSBkYXRhIGNvbm5lY3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAtIFRoZSBpZGVudGlmaWVyIGZvciB0aGUgZGF0YSBiZWluZyBzYXZlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSBkYXRhIGJlaW5nIHNhdmVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgYWx3YXlzIHJlamVjdHMgd2l0aCBhbiBlcnJvci5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBTdWJjbGFzc2VzIHNob3VsZCByZWltcGxlbWVudCBpZiB0aGV5IHN1cHBvcnQgYSBiYWNrLWVuZCB0aGF0IGNhbiBzYXZlLlxuICAgICAqL1xuICAgIGFzeW5jIHNhdmUoaWQsIHZhbHVlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YUNvbm5lY3RvciNzYXZlIG1ldGhvZCBoYXMgbm90IGJlZW4gaW1wbGVtZW50ZWQuJyk7XG4gICAgfVxufVxuZXhwb3J0cy5EYXRhQ29ubmVjdG9yID0gRGF0YUNvbm5lY3Rvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGFjb25uZWN0b3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIHN0YXRlZGJcbiAqL1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vZGF0YWNvbm5lY3RvclwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vaW50ZXJmYWNlc1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vcmVzdG9yYWJsZXBvb2xcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3N0YXRlZGJcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3Rva2Vuc1wiKSwgZXhwb3J0cyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVyZmFjZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlJlc3RvcmFibGVQb29sID0gdm9pZCAwO1xuY29uc3QgY29yZXV0aWxzXzEgPSByZXF1aXJlKFwiQGx1bWluby9jb3JldXRpbHNcIik7XG5jb25zdCBwcm9wZXJ0aWVzXzEgPSByZXF1aXJlKFwiQGx1bWluby9wcm9wZXJ0aWVzXCIpO1xuY29uc3Qgc2lnbmFsaW5nXzEgPSByZXF1aXJlKFwiQGx1bWluby9zaWduYWxpbmdcIik7XG4vKipcbiAqIEFuIG9iamVjdCBwb29sIHRoYXQgc3VwcG9ydHMgcmVzdG9yYXRpb24uXG4gKlxuICogQHR5cGVwYXJhbSBUIC0gVGhlIHR5cGUgb2Ygb2JqZWN0IGJlaW5nIHRyYWNrZWQuXG4gKi9cbmNsYXNzIFJlc3RvcmFibGVQb29sIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgcmVzdG9yYWJsZSBwb29sLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgaW5zdGFudGlhdGlvbiBvcHRpb25zIGZvciBhIHJlc3RvcmFibGUgcG9vbC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2FkZGVkID0gbmV3IHNpZ25hbGluZ18xLlNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fY3VycmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRDaGFuZ2VkID0gbmV3IHNpZ25hbGluZ18xLlNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5faGFzUmVzdG9yZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9vYmplY3RzID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLl9yZXN0b3JlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVzdG9yZWQgPSBuZXcgY29yZXV0aWxzXzEuUHJvbWlzZURlbGVnYXRlKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZWQgPSBuZXcgc2lnbmFsaW5nXzEuU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLm5hbWVzcGFjZSA9IG9wdGlvbnMubmFtZXNwYWNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gYW4gb2JqZWN0IG9iamVjdCBpcyBhZGRlZC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIHNpZ25hbCB3aWxsIG9ubHkgZmlyZSB3aGVuIGFuIG9iamVjdCBpcyBhZGRlZCB0byB0aGUgcG9vbC5cbiAgICAgKiBJdCB3aWxsIG5vdCBmaXJlIGlmIGFuIG9iamVjdCBpbmplY3RlZCBpbnRvIHRoZSBwb29sLlxuICAgICAqL1xuICAgIGdldCBhZGRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZGVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBvYmplY3QuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIHJlc3RvcmFibGUgcG9vbCBkb2VzIG5vdCBzZXQgYGN1cnJlbnRgLiBJdCBpcyBpbnRlbmRlZCBmb3IgY2xpZW50IHVzZS5cbiAgICAgKlxuICAgICAqIElmIGBjdXJyZW50YCBpcyBzZXQgdG8gYW4gb2JqZWN0IHRoYXQgZG9lcyBub3QgZXhpc3QgaW4gdGhlIHBvb2wsIGl0IGlzIGFcbiAgICAgKiBuby1vcC5cbiAgICAgKi9cbiAgICBnZXQgY3VycmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gICAgfVxuICAgIHNldCBjdXJyZW50KG9iaikge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudCA9PT0gb2JqKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iaiAhPT0gbnVsbCAmJiB0aGlzLl9vYmplY3RzLmhhcyhvYmopKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50ID0gb2JqO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudENoYW5nZWQuZW1pdCh0aGlzLl9jdXJyZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIGN1cnJlbnQgd2lkZ2V0IGNoYW5nZXMuXG4gICAgICovXG4gICAgZ2V0IGN1cnJlbnRDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudENoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRlc3Qgd2hldGhlciB0aGUgcG9vbCBpcyBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSByZXNvbHZlZCB3aGVuIHRoZSByZXN0b3JhYmxlIHBvb2wgaGFzIGJlZW4gcmVzdG9yZWQuXG4gICAgICovXG4gICAgZ2V0IHJlc3RvcmVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzdG9yZWQucHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiBvYmplY3RzIGhlbGQgYnkgdGhlIHBvb2wuXG4gICAgICovXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vYmplY3RzLnNpemU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiBhbiBvYmplY3QgaXMgdXBkYXRlZC5cbiAgICAgKi9cbiAgICBnZXQgdXBkYXRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VwZGF0ZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIG5ldyBvYmplY3QgdG8gdGhlIHBvb2wuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2JqIC0gVGhlIG9iamVjdCBvYmplY3QgYmVpbmcgYWRkZWQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIG9iamVjdCBwYXNzZWQgaW50byB0aGUgcG9vbCBpcyBhZGRlZCBzeW5jaHJvbm91c2x5OyBpdHMgZXhpc3RlbmNlIGluXG4gICAgICogdGhlIHBvb2wgY2FuIGJlIGNoZWNrZWQgd2l0aCB0aGUgYGhhcygpYCBtZXRob2QuIFRoZSBwcm9taXNlIHRoaXMgbWV0aG9kXG4gICAgICogcmV0dXJucyByZXNvbHZlcyBhZnRlciB0aGUgb2JqZWN0IGhhcyBiZWVuIGFkZGVkIGFuZCBzYXZlZCB0byBhbiB1bmRlcmx5aW5nXG4gICAgICogcmVzdG9yYXRpb24gY29ubmVjdG9yLCBpZiBvbmUgaXMgYXZhaWxhYmxlLlxuICAgICAqL1xuICAgIGFzeW5jIGFkZChvYmopIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgaWYgKG9iai5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICBjb25zdCB3YXJuaW5nID0gJ0EgZGlzcG9zZWQgb2JqZWN0IGNhbm5vdCBiZSBhZGRlZC4nO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKHdhcm5pbmcsIG9iaik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Iod2FybmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX29iamVjdHMuaGFzKG9iaikpIHtcbiAgICAgICAgICAgIGNvbnN0IHdhcm5pbmcgPSAnVGhpcyBvYmplY3QgYWxyZWFkeSBleGlzdHMgaW4gdGhlIHBvb2wuJztcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybih3YXJuaW5nLCBvYmopO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHdhcm5pbmcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29iamVjdHMuYWRkKG9iaik7XG4gICAgICAgIG9iai5kaXNwb3NlZC5jb25uZWN0KHRoaXMuX29uSW5zdGFuY2VEaXNwb3NlZCwgdGhpcyk7XG4gICAgICAgIGlmIChQcml2YXRlLmluamVjdGVkUHJvcGVydHkuZ2V0KG9iaikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcmVzdG9yZSkge1xuICAgICAgICAgICAgY29uc3QgeyBjb25uZWN0b3IgfSA9IHRoaXMuX3Jlc3RvcmU7XG4gICAgICAgICAgICBjb25zdCBvYmpOYW1lID0gdGhpcy5fcmVzdG9yZS5uYW1lKG9iaik7XG4gICAgICAgICAgICBpZiAob2JqTmFtZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBgJHt0aGlzLm5hbWVzcGFjZX06JHtvYmpOYW1lfWA7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IChfYiA9IChfYSA9IHRoaXMuX3Jlc3RvcmUpLmFyZ3MpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCBvYmopO1xuICAgICAgICAgICAgICAgIFByaXZhdGUubmFtZVByb3BlcnR5LnNldChvYmosIG5hbWUpO1xuICAgICAgICAgICAgICAgIGF3YWl0IGNvbm5lY3Rvci5zYXZlKG5hbWUsIHsgZGF0YSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBFbWl0IHRoZSBhZGRlZCBzaWduYWwuXG4gICAgICAgIHRoaXMuX2FkZGVkLmVtaXQob2JqKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIHBvb2wuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogRGlzcG9zaW5nIGEgcG9vbCBkb2VzIG5vdCBhZmZlY3QgdGhlIHVuZGVybHlpbmcgZGF0YSBpbiB0aGUgZGF0YSBjb25uZWN0b3IsXG4gICAgICogaXQgc2ltcGx5IGRpc3Bvc2VzIHRoZSBjbGllbnQtc2lkZSBwb29sIHdpdGhvdXQgbWFraW5nIGFueSBjb25uZWN0b3IgY2FsbHMuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fb2JqZWN0cy5jbGVhcigpO1xuICAgICAgICBzaWduYWxpbmdfMS5TaWduYWwuY2xlYXJEYXRhKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kIHRoZSBmaXJzdCBvYmplY3QgaW4gdGhlIHBvb2wgdGhhdCBzYXRpc2ZpZXMgYSBmaWx0ZXIgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gLSBmbiBUaGUgZmlsdGVyIGZ1bmN0aW9uIHRvIGNhbGwgb24gZWFjaCBvYmplY3QuXG4gICAgICovXG4gICAgZmluZChmbikge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLl9vYmplY3RzLnZhbHVlcygpO1xuICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgaWYgKGZuKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlIHRocm91Z2ggZWFjaCBvYmplY3QgaW4gdGhlIHBvb2wuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gY2FsbCBvbiBlYWNoIG9iamVjdC5cbiAgICAgKi9cbiAgICBmb3JFYWNoKGZuKSB7XG4gICAgICAgIHRoaXMuX29iamVjdHMuZm9yRWFjaChmbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbHRlciB0aGUgb2JqZWN0cyBpbiB0aGUgcG9vbCBiYXNlZCBvbiBhIHByZWRpY2F0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmbiAtIFRoZSBmdW5jdGlvbiBieSB3aGljaCB0byBmaWx0ZXIuXG4gICAgICovXG4gICAgZmlsdGVyKGZuKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gW107XG4gICAgICAgIHRoaXMuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgaWYgKGZuKG9iaikpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZC5wdXNoKG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmlsdGVyZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluamVjdCBhbiBvYmplY3QgaW50byB0aGUgcmVzdG9yYWJsZSBwb29sIHdpdGhvdXQgdGhlIHBvb2wgaGFuZGxpbmcgaXRzXG4gICAgICogcmVzdG9yYXRpb24gbGlmZWN5Y2xlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9iaiAtIFRoZSBvYmplY3QgdG8gaW5qZWN0IGludG8gdGhlIHBvb2wuXG4gICAgICovXG4gICAgaW5qZWN0KG9iaikge1xuICAgICAgICBQcml2YXRlLmluamVjdGVkUHJvcGVydHkuc2V0KG9iaiwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZChvYmopO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGlzIHBvb2wgaGFzIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIG9iaiAtIFRoZSBvYmplY3Qgd2hvc2UgZXhpc3RlbmNlIGlzIGJlaW5nIGNoZWNrZWQuXG4gICAgICovXG4gICAgaGFzKG9iaikge1xuICAgICAgICByZXR1cm4gdGhpcy5fb2JqZWN0cy5oYXMob2JqKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzdG9yZSB0aGUgb2JqZWN0cyBpbiB0aGlzIHBvb2wncyBuYW1lc3BhY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgdGhhdCBkZXNjcmliZSByZXN0b3JhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gcmVzdG9yYXRpb24gaGFzIGNvbXBsZXRlZC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBhbG1vc3QgbmV2ZXIgYmUgaW52b2tlZCBieSBjbGllbnQgY29kZS4gSXRzIHByaW1hcnlcbiAgICAgKiB1c2UgY2FzZSBpcyB0byBiZSBpbnZva2VkIGJ5IGEgbGF5b3V0IHJlc3RvcmVyIHBsdWdpbiB0aGF0IGhhbmRsZXNcbiAgICAgKiBtdWx0aXBsZSByZXN0b3JhYmxlIHBvb2xzIGFuZCwgd2hlbiByZWFkeSwgYXNrcyB0aGVtIGVhY2ggdG8gcmVzdG9yZSB0aGVpclxuICAgICAqIHJlc3BlY3RpdmUgb2JqZWN0cy5cbiAgICAgKi9cbiAgICBhc3luYyByZXN0b3JlKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hhc1Jlc3RvcmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgcG9vbCBoYXMgYWxyZWFkeSBiZWVuIHJlc3RvcmVkLicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2hhc1Jlc3RvcmVkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kLCBjb25uZWN0b3IsIHJlZ2lzdHJ5LCB3aGVuIH0gPSBvcHRpb25zO1xuICAgICAgICBjb25zdCBuYW1lc3BhY2UgPSB0aGlzLm5hbWVzcGFjZTtcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSB3aGVuXG4gICAgICAgICAgICA/IFtjb25uZWN0b3IubGlzdChuYW1lc3BhY2UpXS5jb25jYXQod2hlbilcbiAgICAgICAgICAgIDogW2Nvbm5lY3Rvci5saXN0KG5hbWVzcGFjZSldO1xuICAgICAgICB0aGlzLl9yZXN0b3JlID0gb3B0aW9ucztcbiAgICAgICAgY29uc3QgW3NhdmVkXSA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gYXdhaXQgUHJvbWlzZS5hbGwoc2F2ZWQuaWRzLm1hcChhc3luYyAoaWQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHNhdmVkLnZhbHVlc1tpbmRleF07XG4gICAgICAgICAgICBjb25zdCBhcmdzID0gdmFsdWUgJiYgdmFsdWUuZGF0YTtcbiAgICAgICAgICAgIGlmIChhcmdzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29ubmVjdG9yLnJlbW92ZShpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSBjb21tYW5kIGFuZCBpZiBpdCBmYWlscywgZGVsZXRlIHRoZSBzdGF0ZSByZXN0b3JlIGRhdGEuXG4gICAgICAgICAgICByZXR1cm4gcmVnaXN0cnlcbiAgICAgICAgICAgICAgICAuZXhlY3V0ZShjb21tYW5kLCBhcmdzKVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiBjb25uZWN0b3IucmVtb3ZlKGlkKSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5fcmVzdG9yZWQucmVzb2x2ZSgpO1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYXZlIHRoZSByZXN0b3JlIGRhdGEgZm9yIGEgZ2l2ZW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIG9iaiAtIFRoZSBvYmplY3QgYmVpbmcgc2F2ZWQuXG4gICAgICovXG4gICAgYXN5bmMgc2F2ZShvYmopIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgaW5qZWN0ZWQgPSBQcml2YXRlLmluamVjdGVkUHJvcGVydHkuZ2V0KG9iaik7XG4gICAgICAgIGlmICghdGhpcy5fcmVzdG9yZSB8fCAhdGhpcy5oYXMob2JqKSB8fCBpbmplY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgY29ubmVjdG9yIH0gPSB0aGlzLl9yZXN0b3JlO1xuICAgICAgICBjb25zdCBvYmpOYW1lID0gdGhpcy5fcmVzdG9yZS5uYW1lKG9iaik7XG4gICAgICAgIGNvbnN0IG9sZE5hbWUgPSBQcml2YXRlLm5hbWVQcm9wZXJ0eS5nZXQob2JqKTtcbiAgICAgICAgY29uc3QgbmV3TmFtZSA9IG9iak5hbWUgPyBgJHt0aGlzLm5hbWVzcGFjZX06JHtvYmpOYW1lfWAgOiAnJztcbiAgICAgICAgaWYgKG9sZE5hbWUgJiYgb2xkTmFtZSAhPT0gbmV3TmFtZSkge1xuICAgICAgICAgICAgYXdhaXQgY29ubmVjdG9yLnJlbW92ZShvbGROYW1lKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgdGhlIG5hbWUgcHJvcGVydHkgaXJyZXNwZWN0aXZlIG9mIHdoZXRoZXIgdGhlIG5ldyBuYW1lIGlzIG51bGwuXG4gICAgICAgIFByaXZhdGUubmFtZVByb3BlcnR5LnNldChvYmosIG5ld05hbWUpO1xuICAgICAgICBpZiAobmV3TmFtZSkge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IChfYiA9IChfYSA9IHRoaXMuX3Jlc3RvcmUpLmFyZ3MpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCBvYmopO1xuICAgICAgICAgICAgYXdhaXQgY29ubmVjdG9yLnNhdmUobmV3TmFtZSwgeyBkYXRhIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvbGROYW1lICE9PSBuZXdOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVkLmVtaXQob2JqKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhbiB1cCBhZnRlciBkaXNwb3NlZCBvYmplY3RzLlxuICAgICAqL1xuICAgIF9vbkluc3RhbmNlRGlzcG9zZWQob2JqKSB7XG4gICAgICAgIHRoaXMuX29iamVjdHMuZGVsZXRlKG9iaik7XG4gICAgICAgIGlmIChvYmogPT09IHRoaXMuX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudENoYW5nZWQuZW1pdCh0aGlzLl9jdXJyZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoUHJpdmF0ZS5pbmplY3RlZFByb3BlcnR5LmdldChvYmopKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9yZXN0b3JlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBjb25uZWN0b3IgfSA9IHRoaXMuX3Jlc3RvcmU7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBQcml2YXRlLm5hbWVQcm9wZXJ0eS5nZXQob2JqKTtcbiAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIHZvaWQgY29ubmVjdG9yLnJlbW92ZShuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuUmVzdG9yYWJsZVBvb2wgPSBSZXN0b3JhYmxlUG9vbDtcbi8qXG4gKiBBIG5hbWVzcGFjZSBmb3IgcHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEFuIGF0dGFjaGVkIHByb3BlcnR5IHRvIGluZGljYXRlIHdoZXRoZXIgYW4gb2JqZWN0IGhhcyBiZWVuIGluamVjdGVkLlxuICAgICAqL1xuICAgIFByaXZhdGUuaW5qZWN0ZWRQcm9wZXJ0eSA9IG5ldyBwcm9wZXJ0aWVzXzEuQXR0YWNoZWRQcm9wZXJ0eSh7XG4gICAgICAgIG5hbWU6ICdpbmplY3RlZCcsXG4gICAgICAgIGNyZWF0ZTogKCkgPT4gZmFsc2VcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBBbiBhdHRhY2hlZCBwcm9wZXJ0eSBmb3IgYW4gb2JqZWN0J3MgSUQuXG4gICAgICovXG4gICAgUHJpdmF0ZS5uYW1lUHJvcGVydHkgPSBuZXcgcHJvcGVydGllc18xLkF0dGFjaGVkUHJvcGVydHkoe1xuICAgICAgICBuYW1lOiAnbmFtZScsXG4gICAgICAgIGNyZWF0ZTogKCkgPT4gJydcbiAgICB9KTtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVzdG9yYWJsZXBvb2wuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlN0YXRlREIgPSB2b2lkIDA7XG5jb25zdCBzaWduYWxpbmdfMSA9IHJlcXVpcmUoXCJAbHVtaW5vL3NpZ25hbGluZ1wiKTtcbi8qKlxuICogVGhlIGRlZmF1bHQgY29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgYSBzdGF0ZSBkYXRhYmFzZS5cbiAqL1xuY2xhc3MgU3RhdGVEQiB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHN0YXRlIGRhdGFiYXNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgaW5zdGFudGlhdGlvbiBvcHRpb25zIGZvciBhIHN0YXRlIGRhdGFiYXNlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLl9jaGFuZ2VkID0gbmV3IHNpZ25hbGluZ18xLlNpZ25hbCh0aGlzKTtcbiAgICAgICAgY29uc3QgeyBjb25uZWN0b3IsIHRyYW5zZm9ybSB9ID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5fY29ubmVjdG9yID0gY29ubmVjdG9yIHx8IG5ldyBTdGF0ZURCLkNvbm5lY3RvcigpO1xuICAgICAgICBpZiAoIXRyYW5zZm9ybSkge1xuICAgICAgICAgICAgdGhpcy5fcmVhZHkgPSBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3JlYWR5ID0gdHJhbnNmb3JtLnRoZW4odHJhbnNmb3JtYXRpb24gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgY29udGVudHMsIHR5cGUgfSA9IHRyYW5zZm9ybWF0aW9uO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjYW5jZWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjbGVhcic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21lcmdlKGNvbnRlbnRzIHx8IHt9KTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnb3ZlcndyaXRlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vdmVyd3JpdGUoY29udGVudHMgfHwge30pO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIHRoYXQgZW1pdHMgdGhlIGNoYW5nZSB0eXBlIGFueSB0aW1lIGEgdmFsdWUgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBnZXQgY2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFyIHRoZSBlbnRpcmUgZGF0YWJhc2UuXG4gICAgICovXG4gICAgYXN5bmMgY2xlYXIoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3JlYWR5O1xuICAgICAgICBhd2FpdCB0aGlzLl9jbGVhcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZSBhIHNhdmVkIGJ1bmRsZSBmcm9tIHRoZSBkYXRhYmFzZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAtIFRoZSBpZGVudGlmaWVyIHVzZWQgdG8gcmV0cmlldmUgYSBkYXRhIGJ1bmRsZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IGJlYXJzIGEgZGF0YSBwYXlsb2FkIGlmIGF2YWlsYWJsZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgYGlkYCB2YWx1ZXMgb2Ygc3RvcmVkIGl0ZW1zIGluIHRoZSBzdGF0ZSBkYXRhYmFzZSBhcmUgZm9ybWF0dGVkOlxuICAgICAqIGAnbmFtZXNwYWNlOmlkZW50aWZpZXInYCwgd2hpY2ggaXMgdGhlIHNhbWUgY29udmVudGlvbiB0aGF0IGNvbW1hbmRcbiAgICAgKiBpZGVudGlmaWVycyBpbiBKdXB5dGVyTGFiIHVzZSBhcyB3ZWxsLiBXaGlsZSB0aGlzIGlzIG5vdCBhIHRlY2huaWNhbFxuICAgICAqIHJlcXVpcmVtZW50IGZvciBgZmV0Y2goKWAsIGByZW1vdmUoKWAsIGFuZCBgc2F2ZSgpYCwgaXQgKmlzKiBuZWNlc3NhcnkgZm9yXG4gICAgICogdXNpbmcgdGhlIGBsaXN0KG5hbWVzcGFjZTogc3RyaW5nKWAgbWV0aG9kLlxuICAgICAqXG4gICAgICogVGhlIHByb21pc2UgcmV0dXJuZWQgYnkgdGhpcyBtZXRob2QgbWF5IGJlIHJlamVjdGVkIGlmIGFuIGVycm9yIG9jY3VycyBpblxuICAgICAqIHJldHJpZXZpbmcgdGhlIGRhdGEuIE5vbi1leGlzdGVuY2Ugb2YgYW4gYGlkYCB3aWxsIHN1Y2NlZWQgd2l0aCB0aGUgYHZhbHVlYFxuICAgICAqIGB1bmRlZmluZWRgLlxuICAgICAqL1xuICAgIGFzeW5jIGZldGNoKGlkKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3JlYWR5O1xuICAgICAgICByZXR1cm4gdGhpcy5fZmV0Y2goaWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZSBhbGwgdGhlIHNhdmVkIGJ1bmRsZXMgZm9yIGEgbmFtZXNwYWNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGZpbHRlciAtIFRoZSBuYW1lc3BhY2UgcHJlZml4IHRvIHJldHJpZXZlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgYmVhcnMgYSBjb2xsZWN0aW9uIG9mIHBheWxvYWRzIGZvciBhIG5hbWVzcGFjZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBOYW1lc3BhY2VzIGFyZSBlbnRpcmVseSBjb252ZW50aW9uYWwgZW50aXRpZXMuIFRoZSBgaWRgIHZhbHVlcyBvZiBzdG9yZWRcbiAgICAgKiBpdGVtcyBpbiB0aGUgc3RhdGUgZGF0YWJhc2UgYXJlIGZvcm1hdHRlZDogYCduYW1lc3BhY2U6aWRlbnRpZmllcidgLCB3aGljaFxuICAgICAqIGlzIHRoZSBzYW1lIGNvbnZlbnRpb24gdGhhdCBjb21tYW5kIGlkZW50aWZpZXJzIGluIEp1cHl0ZXJMYWIgdXNlIGFzIHdlbGwuXG4gICAgICpcbiAgICAgKiBJZiB0aGVyZSBhcmUgYW55IGVycm9ycyBpbiByZXRyaWV2aW5nIHRoZSBkYXRhLCB0aGV5IHdpbGwgYmUgbG9nZ2VkIHRvIHRoZVxuICAgICAqIGNvbnNvbGUgaW4gb3JkZXIgdG8gb3B0aW1pc3RpY2FsbHkgcmV0dXJuIGFueSBleHRhbnQgZGF0YSB3aXRob3V0IGZhaWxpbmcuXG4gICAgICogVGhpcyBwcm9taXNlIHdpbGwgYWx3YXlzIHN1Y2NlZWQuXG4gICAgICovXG4gICAgYXN5bmMgbGlzdChuYW1lc3BhY2UpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fcmVhZHk7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0KG5hbWVzcGFjZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIHZhbHVlIGZyb20gdGhlIGRhdGFiYXNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIC0gVGhlIGlkZW50aWZpZXIgZm9yIHRoZSBkYXRhIGJlaW5nIHJlbW92ZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCBpcyByZWplY3RlZCBpZiByZW1vdmUgZmFpbHMgYW5kIHN1Y2NlZWRzIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBhc3luYyByZW1vdmUoaWQpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fcmVhZHk7XG4gICAgICAgIGF3YWl0IHRoaXMuX3JlbW92ZShpZCk7XG4gICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh7IGlkLCB0eXBlOiAncmVtb3ZlJyB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2F2ZSBhIHZhbHVlIGluIHRoZSBkYXRhYmFzZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAtIFRoZSBpZGVudGlmaWVyIGZvciB0aGUgZGF0YSBiZWluZyBzYXZlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSBkYXRhIGJlaW5nIHNhdmVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgaXMgcmVqZWN0ZWQgaWYgc2F2aW5nIGZhaWxzIGFuZCBzdWNjZWVkcyBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIGBpZGAgdmFsdWVzIG9mIHN0b3JlZCBpdGVtcyBpbiB0aGUgc3RhdGUgZGF0YWJhc2UgYXJlIGZvcm1hdHRlZDpcbiAgICAgKiBgJ25hbWVzcGFjZTppZGVudGlmaWVyJ2AsIHdoaWNoIGlzIHRoZSBzYW1lIGNvbnZlbnRpb24gdGhhdCBjb21tYW5kXG4gICAgICogaWRlbnRpZmllcnMgaW4gSnVweXRlckxhYiB1c2UgYXMgd2VsbC4gV2hpbGUgdGhpcyBpcyBub3QgYSB0ZWNobmljYWxcbiAgICAgKiByZXF1aXJlbWVudCBmb3IgYGZldGNoKClgLCBgcmVtb3ZlKClgLCBhbmQgYHNhdmUoKWAsIGl0ICppcyogbmVjZXNzYXJ5IGZvclxuICAgICAqIHVzaW5nIHRoZSBgbGlzdChuYW1lc3BhY2U6IHN0cmluZylgIG1ldGhvZC5cbiAgICAgKi9cbiAgICBhc3luYyBzYXZlKGlkLCB2YWx1ZSkge1xuICAgICAgICBhd2FpdCB0aGlzLl9yZWFkeTtcbiAgICAgICAgYXdhaXQgdGhpcy5fc2F2ZShpZCwgdmFsdWUpO1xuICAgICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQoeyBpZCwgdHlwZTogJ3NhdmUnIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBzZXJpYWxpemVkIGNvcHkgb2YgdGhlIHN0YXRlIGRhdGFiYXNlJ3MgZW50aXJlIGNvbnRlbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZGF0YWJhc2UgY29udGVudHMgYXMgSlNPTi5cbiAgICAgKi9cbiAgICBhc3luYyB0b0pTT04oKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3JlYWR5O1xuICAgICAgICBjb25zdCB7IGlkcywgdmFsdWVzIH0gPSBhd2FpdCB0aGlzLl9saXN0KCk7XG4gICAgICAgIHJldHVybiB2YWx1ZXMucmVkdWNlKChhY2MsIHZhbCwgaWR4KSA9PiB7XG4gICAgICAgICAgICBhY2NbaWRzW2lkeF1dID0gdmFsO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhciB0aGUgZW50aXJlIGRhdGFiYXNlLlxuICAgICAqL1xuICAgIGFzeW5jIF9jbGVhcigpIHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoKGF3YWl0IHRoaXMuX2xpc3QoKSkuaWRzLm1hcChpZCA9PiB0aGlzLl9yZW1vdmUoaWQpKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZldGNoIGEgdmFsdWUgZnJvbSB0aGUgZGF0YWJhc2UuXG4gICAgICovXG4gICAgYXN5bmMgX2ZldGNoKGlkKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgdGhpcy5fY29ubmVjdG9yLmZldGNoKGlkKTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSkudjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBGZXRjaCBhIGxpc3QgZnJvbSB0aGUgZGF0YWJhc2UuXG4gICAgICovXG4gICAgYXN5bmMgX2xpc3QobmFtZXNwYWNlID0gJycpIHtcbiAgICAgICAgY29uc3QgeyBpZHMsIHZhbHVlcyB9ID0gYXdhaXQgdGhpcy5fY29ubmVjdG9yLmxpc3QobmFtZXNwYWNlKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkcyxcbiAgICAgICAgICAgIHZhbHVlczogdmFsdWVzLm1hcCh2YWwgPT4gSlNPTi5wYXJzZSh2YWwpLnYpXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1lcmdlIGRhdGEgaW50byB0aGUgc3RhdGUgZGF0YWJhc2UuXG4gICAgICovXG4gICAgYXN5bmMgX21lcmdlKGNvbnRlbnRzKSB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKE9iamVjdC5rZXlzKGNvbnRlbnRzKS5tYXAoa2V5ID0+IGNvbnRlbnRzW2tleV0gJiYgdGhpcy5fc2F2ZShrZXksIGNvbnRlbnRzW2tleV0pKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJ3cml0ZSB0aGUgZW50aXJlIGRhdGFiYXNlIHdpdGggbmV3IGNvbnRlbnRzLlxuICAgICAqL1xuICAgIGFzeW5jIF9vdmVyd3JpdGUoY29udGVudHMpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fY2xlYXIoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5fbWVyZ2UoY29udGVudHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBrZXkgaW4gdGhlIGRhdGFiYXNlLlxuICAgICAqL1xuICAgIGFzeW5jIF9yZW1vdmUoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3Rvci5yZW1vdmUoaWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYXZlIGEga2V5IGFuZCBpdHMgdmFsdWUgaW4gdGhlIGRhdGFiYXNlLlxuICAgICAqL1xuICAgIGFzeW5jIF9zYXZlKGlkLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29ubmVjdG9yLnNhdmUoaWQsIEpTT04uc3RyaW5naWZ5KHsgdjogdmFsdWUgfSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuU3RhdGVEQiA9IFN0YXRlREI7XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBTdGF0ZURCIHN0YXRpY3MuXG4gKi9cbihmdW5jdGlvbiAoU3RhdGVEQikge1xuICAgIC8qKlxuICAgICAqIEFuIGluLW1lbW9yeSBzdHJpbmcga2V5L3ZhbHVlIGRhdGEgY29ubmVjdG9yLlxuICAgICAqL1xuICAgIGNsYXNzIENvbm5lY3RvciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXRyaWV2ZSBhbiBpdGVtIGZyb20gdGhlIGRhdGEgY29ubmVjdG9yLlxuICAgICAgICAgKi9cbiAgICAgICAgYXN5bmMgZmV0Y2goaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdG9yYWdlW2lkXTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0cmlldmUgdGhlIGxpc3Qgb2YgaXRlbXMgYXZhaWxhYmxlIGZyb20gdGhlIGRhdGEgY29ubmVjdG9yLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gbmFtZXNwYWNlIC0gSWYgbm90IGVtcHR5LCBvbmx5IGtleXMgd2hvc2UgZmlyc3QgdG9rZW4gYmVmb3JlIGA6YFxuICAgICAgICAgKiBleGFjdGx5IG1hdGNoIGBuYW1lc3BhY2VgIHdpbGwgYmUgcmV0dXJuZWQsIGUuZy4gYGZvb2AgaW4gYGZvbzpiYXJgLlxuICAgICAgICAgKi9cbiAgICAgICAgYXN5bmMgbGlzdChuYW1lc3BhY2UgPSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3N0b3JhZ2UpLnJlZHVjZSgoYWNjLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobmFtZXNwYWNlID09PSAnJyA/IHRydWUgOiBuYW1lc3BhY2UgPT09IHZhbC5zcGxpdCgnOicpWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYy5pZHMucHVzaCh2YWwpO1xuICAgICAgICAgICAgICAgICAgICBhY2MudmFsdWVzLnB1c2godGhpcy5fc3RvcmFnZVt2YWxdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIHsgaWRzOiBbXSwgdmFsdWVzOiBbXSB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIGEgdmFsdWUgdXNpbmcgdGhlIGRhdGEgY29ubmVjdG9yLlxuICAgICAgICAgKi9cbiAgICAgICAgYXN5bmMgcmVtb3ZlKGlkKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fc3RvcmFnZVtpZF07XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNhdmUgYSB2YWx1ZSB1c2luZyB0aGUgZGF0YSBjb25uZWN0b3IuXG4gICAgICAgICAqL1xuICAgICAgICBhc3luYyBzYXZlKGlkLCB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZVtpZF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBTdGF0ZURCLkNvbm5lY3RvciA9IENvbm5lY3Rvcjtcbn0pKFN0YXRlREIgPSBleHBvcnRzLlN0YXRlREIgfHwgKGV4cG9ydHMuU3RhdGVEQiA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdGF0ZWRiLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5JU3RhdGVEQiA9IHZvaWQgMDtcbmNvbnN0IGNvcmV1dGlsc18xID0gcmVxdWlyZShcIkBsdW1pbm8vY29yZXV0aWxzXCIpO1xuLyogdHNsaW50OmRpc2FibGUgKi9cbi8qKlxuICogVGhlIGRlZmF1bHQgc3RhdGUgZGF0YWJhc2UgdG9rZW4uXG4gKi9cbmV4cG9ydHMuSVN0YXRlREIgPSBuZXcgY29yZXV0aWxzXzEuVG9rZW4oJ0BqdXB5dGVybGFiL2NvcmV1dGlsczpJU3RhdGVEQicpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9rZW5zLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=