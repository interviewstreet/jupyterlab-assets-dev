(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_observables_lib_index_js"],{

/***/ "../../packages/observables/lib/index.js":
/*!***********************************************!*\
  !*** ../../packages/observables/lib/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModelDB": () => (/* reexport safe */ _modeldb__WEBPACK_IMPORTED_MODULE_0__.ModelDB),
/* harmony export */   "ObservableValue": () => (/* reexport safe */ _modeldb__WEBPACK_IMPORTED_MODULE_0__.ObservableValue),
/* harmony export */   "ObservableJSON": () => (/* reexport safe */ _observablejson__WEBPACK_IMPORTED_MODULE_1__.ObservableJSON),
/* harmony export */   "ObservableList": () => (/* reexport safe */ _observablelist__WEBPACK_IMPORTED_MODULE_2__.ObservableList),
/* harmony export */   "ObservableMap": () => (/* reexport safe */ _observablemap__WEBPACK_IMPORTED_MODULE_3__.ObservableMap),
/* harmony export */   "ObservableString": () => (/* reexport safe */ _observablestring__WEBPACK_IMPORTED_MODULE_4__.ObservableString),
/* harmony export */   "ObservableUndoableList": () => (/* reexport safe */ _undoablelist__WEBPACK_IMPORTED_MODULE_5__.ObservableUndoableList)
/* harmony export */ });
/* harmony import */ var _modeldb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modeldb */ "../../packages/observables/lib/modeldb.js");
/* harmony import */ var _observablejson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observablejson */ "../../packages/observables/lib/observablejson.js");
/* harmony import */ var _observablelist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./observablelist */ "../../packages/observables/lib/observablelist.js");
/* harmony import */ var _observablemap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./observablemap */ "../../packages/observables/lib/observablemap.js");
/* harmony import */ var _observablestring__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./observablestring */ "../../packages/observables/lib/observablestring.js");
/* harmony import */ var _undoablelist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./undoablelist */ "../../packages/observables/lib/undoablelist.js");
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module observables
 */






//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/observables/lib/modeldb.js":
/*!*************************************************!*\
  !*** ../../packages/observables/lib/modeldb.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObservableValue": () => (/* binding */ ObservableValue),
/* harmony export */   "ModelDB": () => (/* binding */ ModelDB)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable?7038");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _observablejson__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./observablejson */ "../../packages/observables/lib/observablejson.js");
/* harmony import */ var _observablemap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./observablemap */ "../../packages/observables/lib/observablemap.js");
/* harmony import */ var _observablestring__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./observablestring */ "../../packages/observables/lib/observablestring.js");
/* harmony import */ var _undoablelist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./undoablelist */ "../../packages/observables/lib/undoablelist.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







/**
 * A concrete implementation of an `IObservableValue`.
 */
class ObservableValue {
    /**
     * Constructor for the value.
     *
     * @param initialValue: the starting value for the `ObservableValue`.
     */
    constructor(initialValue = null) {
        this._value = null;
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(this);
        this._isDisposed = false;
        this._value = initialValue;
    }
    /**
     * The observable type.
     */
    get type() {
        return 'Value';
    }
    /**
     * Whether the value has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * The changed signal.
     */
    get changed() {
        return this._changed;
    }
    /**
     * Get the current value, or `undefined` if it has not been set.
     */
    get() {
        return this._value;
    }
    /**
     * Set the current value.
     */
    set(value) {
        const oldValue = this._value;
        if (_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.JSONExt.deepEqual(oldValue, value)) {
            return;
        }
        this._value = value;
        this._changed.emit({
            oldValue: oldValue,
            newValue: value
        });
    }
    /**
     * Dispose of the resources held by the value.
     */
    dispose() {
        if (this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal.clearData(this);
        this._value = null;
    }
}
/**
 * The namespace for the `ObservableValue` class statics.
 */
(function (ObservableValue) {
    /**
     * The changed args object emitted by the `IObservableValue`.
     */
    class IChangedArgs {
    }
    ObservableValue.IChangedArgs = IChangedArgs;
})(ObservableValue || (ObservableValue = {}));
/**
 * A concrete implementation of an `IModelDB`.
 */
class ModelDB {
    /**
     * Constructor for the `ModelDB`.
     */
    constructor(options = {}) {
        /**
         * Whether the model has been populated with
         * any model values.
         */
        this.isPrepopulated = false;
        /**
         * Whether the model is collaborative.
         */
        this.isCollaborative = false;
        /**
         * A promise resolved when the model is connected
         * to its backend. For the in-memory ModelDB it
         * is immediately resolved.
         */
        this.connected = Promise.resolve(void 0);
        this._toDispose = false;
        this._isDisposed = false;
        this._disposables = new _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__.DisposableSet();
        this._basePath = options.basePath || '';
        if (options.baseDB) {
            this._db = options.baseDB;
        }
        else {
            this._db = new _observablemap__WEBPACK_IMPORTED_MODULE_3__.ObservableMap();
            this._toDispose = true;
        }
    }
    /**
     * The base path for the `ModelDB`. This is prepended
     * to all the paths that are passed in to the member
     * functions of the object.
     */
    get basePath() {
        return this._basePath;
    }
    /**
     * Whether the database is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Get a value for a path.
     *
     * @param path: the path for the object.
     *
     * @returns an `IObservable`.
     */
    get(path) {
        return this._db.get(this._resolvePath(path));
    }
    /**
     * Whether the `IModelDB` has an object at this path.
     *
     * @param path: the path for the object.
     *
     * @returns a boolean for whether an object is at `path`.
     */
    has(path) {
        return this._db.has(this._resolvePath(path));
    }
    /**
     * Create a string and insert it in the database.
     *
     * @param path: the path for the string.
     *
     * @returns the string that was created.
     */
    createString(path) {
        const str = new _observablestring__WEBPACK_IMPORTED_MODULE_4__.ObservableString();
        this._disposables.add(str);
        this.set(path, str);
        return str;
    }
    /**
     * Create an undoable list and insert it in the database.
     *
     * @param path: the path for the list.
     *
     * @returns the list that was created.
     *
     * #### Notes
     * The list can only store objects that are simple
     * JSON Objects and primitives.
     */
    createList(path) {
        const vec = new _undoablelist__WEBPACK_IMPORTED_MODULE_5__.ObservableUndoableList(new _undoablelist__WEBPACK_IMPORTED_MODULE_5__.ObservableUndoableList.IdentitySerializer());
        this._disposables.add(vec);
        this.set(path, vec);
        return vec;
    }
    /**
     * Create a map and insert it in the database.
     *
     * @param path: the path for the map.
     *
     * @returns the map that was created.
     *
     * #### Notes
     * The map can only store objects that are simple
     * JSON Objects and primitives.
     */
    createMap(path) {
        const map = new _observablejson__WEBPACK_IMPORTED_MODULE_6__.ObservableJSON();
        this._disposables.add(map);
        this.set(path, map);
        return map;
    }
    /**
     * Create an opaque value and insert it in the database.
     *
     * @param path: the path for the value.
     *
     * @returns the value that was created.
     */
    createValue(path) {
        const val = new ObservableValue();
        this._disposables.add(val);
        this.set(path, val);
        return val;
    }
    /**
     * Get a value at a path, or `undefined if it has not been set
     * That value must already have been created using `createValue`.
     *
     * @param path: the path for the value.
     */
    getValue(path) {
        const val = this.get(path);
        if (!val || val.type !== 'Value') {
            throw Error('Can only call getValue for an ObservableValue');
        }
        return val.get();
    }
    /**
     * Set a value at a path. That value must already have
     * been created using `createValue`.
     *
     * @param path: the path for the value.
     *
     * @param value: the new value.
     */
    setValue(path, value) {
        const val = this.get(path);
        if (!val || val.type !== 'Value') {
            throw Error('Can only call setValue on an ObservableValue');
        }
        val.set(value);
    }
    /**
     * Create a view onto a subtree of the model database.
     *
     * @param basePath: the path for the root of the subtree.
     *
     * @returns an `IModelDB` with a view onto the original
     *   `IModelDB`, with `basePath` prepended to all paths.
     */
    view(basePath) {
        const view = new ModelDB({ basePath, baseDB: this });
        this._disposables.add(view);
        return view;
    }
    /**
     * Set a value at a path. Not intended to
     * be called by user code, instead use the
     * `create*` factory methods.
     *
     * @param path: the path to set the value at.
     *
     * @param value: the value to set at the path.
     */
    set(path, value) {
        this._db.set(this._resolvePath(path), value);
    }
    /**
     * Dispose of the resources held by the database.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        if (this._toDispose) {
            this._db.dispose();
        }
        this._disposables.dispose();
    }
    /**
     * Compute the fully resolved path for a path argument.
     */
    _resolvePath(path) {
        if (this._basePath) {
            path = this._basePath + '.' + path;
        }
        return path;
    }
}
//# sourceMappingURL=modeldb.js.map

/***/ }),

/***/ "../../packages/observables/lib/observablejson.js":
/*!********************************************************!*\
  !*** ../../packages/observables/lib/observablejson.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObservableJSON": () => (/* binding */ ObservableJSON)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/messaging */ "webpack/sharing/consume/default/@lumino/messaging/@lumino/messaging?790d");
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_messaging__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _observablemap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./observablemap */ "../../packages/observables/lib/observablemap.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * A concrete Observable map for JSON data.
 */
class ObservableJSON extends _observablemap__WEBPACK_IMPORTED_MODULE_2__.ObservableMap {
    /**
     * Construct a new observable JSON object.
     */
    constructor(options = {}) {
        super({
            itemCmp: _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.JSONExt.deepEqual,
            values: options.values
        });
    }
    /**
     * Serialize the model to JSON.
     */
    toJSON() {
        const out = Object.create(null);
        const keys = this.keys();
        for (const key of keys) {
            const value = this.get(key);
            if (value !== undefined) {
                out[key] = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.JSONExt.deepCopy(value);
            }
        }
        return out;
    }
}
/**
 * The namespace for ObservableJSON static data.
 */
(function (ObservableJSON) {
    /**
     * An observable JSON change message.
     */
    class ChangeMessage extends _lumino_messaging__WEBPACK_IMPORTED_MODULE_1__.Message {
        /**
         * Create a new metadata changed message.
         */
        constructor(type, args) {
            super(type);
            this.args = args;
        }
    }
    ObservableJSON.ChangeMessage = ChangeMessage;
})(ObservableJSON || (ObservableJSON = {}));
//# sourceMappingURL=observablejson.js.map

/***/ }),

/***/ "../../packages/observables/lib/observablelist.js":
/*!********************************************************!*\
  !*** ../../packages/observables/lib/observablelist.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObservableList": () => (/* binding */ ObservableList)
/* harmony export */ });
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_1__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * A concrete implementation of [[IObservableList]].
 */
class ObservableList {
    /**
     * Construct a new observable map.
     */
    constructor(options = {}) {
        this._array = [];
        this._isDisposed = false;
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
        if (options.values !== void 0) {
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.each)(options.values, value => {
                this._array.push(value);
            });
        }
        this._itemCmp = options.itemCmp || Private.itemCmp;
    }
    /**
     * The type of this object.
     */
    get type() {
        return 'List';
    }
    /**
     * A signal emitted when the list has changed.
     */
    get changed() {
        return this._changed;
    }
    /**
     * The length of the list.
     */
    get length() {
        return this._array.length;
    }
    /**
     * Test whether the list has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the list.
     */
    dispose() {
        if (this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal.clearData(this);
        this.clear();
    }
    /**
     * Create an iterator over the values in the list.
     *
     * @returns A new iterator starting at the front of the list.
     *
     * #### Complexity
     * Constant.
     *
     * #### Iterator Validity
     * No changes.
     */
    iter() {
        return new _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.ArrayIterator(this._array);
    }
    /**
     * Get the value at the specified index.
     *
     * @param index - The positive integer index of interest.
     *
     * @returns The value at the specified index.
     *
     * #### Undefined Behavior
     * An `index` which is non-integral or out of range.
     */
    get(index) {
        return this._array[index];
    }
    /**
     * Set the value at the specified index.
     *
     * @param index - The positive integer index of interest.
     *
     * @param value - The value to set at the specified index.
     *
     * #### Complexity
     * Constant.
     *
     * #### Iterator Validity
     * No changes.
     *
     * #### Undefined Behavior
     * An `index` which is non-integral or out of range.
     */
    set(index, value) {
        const oldValue = this._array[index];
        if (value === undefined) {
            throw new Error('Cannot set an undefined item');
        }
        // Bail if the value does not change.
        const itemCmp = this._itemCmp;
        if (itemCmp(oldValue, value)) {
            return;
        }
        this._array[index] = value;
        this._changed.emit({
            type: 'set',
            oldIndex: index,
            newIndex: index,
            oldValues: [oldValue],
            newValues: [value]
        });
    }
    /**
     * Add a value to the end of the list.
     *
     * @param value - The value to add to the end of the list.
     *
     * @returns The new length of the list.
     *
     * #### Complexity
     * Constant.
     *
     * #### Notes
     * By convention, the oldIndex is set to -1 to indicate
     * an push operation.
     *
     * #### Iterator Validity
     * No changes.
     */
    push(value) {
        const num = this._array.push(value);
        this._changed.emit({
            type: 'add',
            oldIndex: -1,
            newIndex: this.length - 1,
            oldValues: [],
            newValues: [value]
        });
        return num;
    }
    /**
     * Insert a value into the list at a specific index.
     *
     * @param index - The index at which to insert the value.
     *
     * @param value - The value to set at the specified index.
     *
     * #### Complexity
     * Linear.
     *
     * #### Iterator Validity
     * No changes.
     *
     * #### Notes
     * The `index` will be clamped to the bounds of the list.
     *
     * By convention, the oldIndex is set to -2 to indicate
     * an insert operation.
     *
     * The value -2 as oldIndex can be used to distinguish from the push
     * method which will use a value -1.
     *
     * #### Undefined Behavior
     * An `index` which is non-integral.
     */
    insert(index, value) {
        if (index === this._array.length) {
            this._array.push(value);
        }
        else {
            _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.ArrayExt.insert(this._array, index, value);
        }
        this._changed.emit({
            type: 'add',
            oldIndex: -2,
            newIndex: index,
            oldValues: [],
            newValues: [value]
        });
    }
    /**
     * Remove the first occurrence of a value from the list.
     *
     * @param value - The value of interest.
     *
     * @returns The index of the removed value, or `-1` if the value
     *   is not contained in the list.
     *
     * #### Complexity
     * Linear.
     *
     * #### Iterator Validity
     * Iterators pointing at the removed value and beyond are invalidated.
     */
    removeValue(value) {
        const itemCmp = this._itemCmp;
        const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.ArrayExt.findFirstIndex(this._array, item => {
            return itemCmp(item, value);
        });
        this.remove(index);
        return index;
    }
    /**
     * Remove and return the value at a specific index.
     *
     * @param index - The index of the value of interest.
     *
     * @returns The value at the specified index, or `undefined` if the
     *   index is out of range.
     *
     * #### Complexity
     * Constant.
     *
     * #### Iterator Validity
     * Iterators pointing at the removed value and beyond are invalidated.
     *
     * #### Undefined Behavior
     * An `index` which is non-integral.
     */
    remove(index) {
        const value = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.ArrayExt.removeAt(this._array, index);
        if (value === undefined) {
            return;
        }
        this._changed.emit({
            type: 'remove',
            oldIndex: index,
            newIndex: -1,
            newValues: [],
            oldValues: [value]
        });
        return value;
    }
    /**
     * Remove all values from the list.
     *
     * #### Complexity
     * Linear.
     *
     * #### Iterator Validity
     * All current iterators are invalidated.
     */
    clear() {
        const copy = this._array.slice();
        this._array.length = 0;
        this._changed.emit({
            type: 'remove',
            oldIndex: 0,
            newIndex: 0,
            newValues: [],
            oldValues: copy
        });
    }
    /**
     * Move a value from one index to another.
     *
     * @parm fromIndex - The index of the element to move.
     *
     * @param toIndex - The index to move the element to.
     *
     * #### Complexity
     * Constant.
     *
     * #### Iterator Validity
     * Iterators pointing at the lesser of the `fromIndex` and the `toIndex`
     * and beyond are invalidated.
     *
     * #### Undefined Behavior
     * A `fromIndex` or a `toIndex` which is non-integral.
     */
    move(fromIndex, toIndex) {
        if (this.length <= 1 || fromIndex === toIndex) {
            return;
        }
        const values = [this._array[fromIndex]];
        _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.ArrayExt.move(this._array, fromIndex, toIndex);
        this._changed.emit({
            type: 'move',
            oldIndex: fromIndex,
            newIndex: toIndex,
            oldValues: values,
            newValues: values
        });
    }
    /**
     * Push a set of values to the back of the list.
     *
     * @param values - An iterable or array-like set of values to add.
     *
     * @returns The new length of the list.
     *
     * #### Complexity
     * Linear.
     *
     * #### Notes
     * By convention, the oldIndex is set to -1 to indicate
     * an push operation.
     *
     * #### Iterator Validity
     * No changes.
     */
    pushAll(values) {
        const newIndex = this.length;
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.each)(values, value => {
            this._array.push(value);
        });
        this._changed.emit({
            type: 'add',
            oldIndex: -1,
            newIndex,
            oldValues: [],
            newValues: (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.toArray)(values)
        });
        return this.length;
    }
    /**
     * Insert a set of items into the list at the specified index.
     *
     * @param index - The index at which to insert the values.
     *
     * @param values - The values to insert at the specified index.
     *
     * #### Complexity.
     * Linear.
     *
     * #### Iterator Validity
     * No changes.
     *
     * #### Notes
     * The `index` will be clamped to the bounds of the list.
     * By convention, the oldIndex is set to -2 to indicate
     * an insert operation.
     *
     * #### Undefined Behavior.
     * An `index` which is non-integral.
     */
    insertAll(index, values) {
        const newIndex = index;
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.each)(values, value => {
            _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.ArrayExt.insert(this._array, index++, value);
        });
        this._changed.emit({
            type: 'add',
            oldIndex: -2,
            newIndex,
            oldValues: [],
            newValues: (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.toArray)(values)
        });
    }
    /**
     * Remove a range of items from the list.
     *
     * @param startIndex - The start index of the range to remove (inclusive).
     *
     * @param endIndex - The end index of the range to remove (exclusive).
     *
     * @returns The new length of the list.
     *
     * #### Complexity
     * Linear.
     *
     * #### Iterator Validity
     * Iterators pointing to the first removed value and beyond are invalid.
     *
     * #### Undefined Behavior
     * A `startIndex` or `endIndex` which is non-integral.
     */
    removeRange(startIndex, endIndex) {
        const oldValues = this._array.slice(startIndex, endIndex);
        for (let i = startIndex; i < endIndex; i++) {
            _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.ArrayExt.removeAt(this._array, startIndex);
        }
        this._changed.emit({
            type: 'remove',
            oldIndex: startIndex,
            newIndex: -1,
            oldValues,
            newValues: []
        });
        return this.length;
    }
}
/**
 * The namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * The default strict equality item cmp.
     */
    function itemCmp(first, second) {
        return first === second;
    }
    Private.itemCmp = itemCmp;
})(Private || (Private = {}));
//# sourceMappingURL=observablelist.js.map

/***/ }),

/***/ "../../packages/observables/lib/observablemap.js":
/*!*******************************************************!*\
  !*** ../../packages/observables/lib/observablemap.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObservableMap": () => (/* binding */ ObservableMap)
/* harmony export */ });
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * A concrete implementation of IObservableMap<T>.
 */
class ObservableMap {
    /**
     * Construct a new observable map.
     */
    constructor(options = {}) {
        this._map = new Map();
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal(this);
        this._isDisposed = false;
        this._itemCmp = options.itemCmp || Private.itemCmp;
        if (options.values) {
            for (const key in options.values) {
                this._map.set(key, options.values[key]);
            }
        }
    }
    /**
     * The type of the Observable.
     */
    get type() {
        return 'Map';
    }
    /**
     * A signal emitted when the map has changed.
     */
    get changed() {
        return this._changed;
    }
    /**
     * Whether this map has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * The number of key-value pairs in the map.
     */
    get size() {
        return this._map.size;
    }
    /**
     * Set a key-value pair in the map
     *
     * @param key - The key to set.
     *
     * @param value - The value for the key.
     *
     * @returns the old value for the key, or undefined
     *   if that did not exist.
     *
     * @throws if the new value is undefined.
     *
     * #### Notes
     * This is a no-op if the value does not change.
     */
    set(key, value) {
        const oldVal = this._map.get(key);
        if (value === undefined) {
            throw Error('Cannot set an undefined value, use remove');
        }
        // Bail if the value does not change.
        const itemCmp = this._itemCmp;
        if (oldVal !== undefined && itemCmp(oldVal, value)) {
            return oldVal;
        }
        this._map.set(key, value);
        this._changed.emit({
            type: oldVal ? 'change' : 'add',
            key: key,
            oldValue: oldVal,
            newValue: value
        });
        return oldVal;
    }
    /**
     * Get a value for a given key.
     *
     * @param key - the key.
     *
     * @returns the value for that key.
     */
    get(key) {
        return this._map.get(key);
    }
    /**
     * Check whether the map has a key.
     *
     * @param key - the key to check.
     *
     * @returns `true` if the map has the key, `false` otherwise.
     */
    has(key) {
        return this._map.has(key);
    }
    /**
     * Get a list of the keys in the map.
     *
     * @returns - a list of keys.
     */
    keys() {
        const keyList = [];
        this._map.forEach((v, k) => {
            keyList.push(k);
        });
        return keyList;
    }
    /**
     * Get a list of the values in the map.
     *
     * @returns - a list of values.
     */
    values() {
        const valList = [];
        this._map.forEach((v, k) => {
            valList.push(v);
        });
        return valList;
    }
    /**
     * Remove a key from the map
     *
     * @param key - the key to remove.
     *
     * @returns the value of the given key,
     *   or undefined if that does not exist.
     *
     * #### Notes
     * This is a no-op if the value does not change.
     */
    delete(key) {
        const oldVal = this._map.get(key);
        const removed = this._map.delete(key);
        if (removed) {
            this._changed.emit({
                type: 'remove',
                key: key,
                oldValue: oldVal,
                newValue: undefined
            });
        }
        return oldVal;
    }
    /**
     * Set the ObservableMap to an empty map.
     */
    clear() {
        // Delete one by one to emit the correct signals.
        const keyList = this.keys();
        for (let i = 0; i < keyList.length; i++) {
            this.delete(keyList[i]);
        }
    }
    /**
     * Dispose of the resources held by the map.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal.clearData(this);
        this._map.clear();
    }
}
/**
 * The namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * The default strict equality item comparator.
     */
    function itemCmp(first, second) {
        return first === second;
    }
    Private.itemCmp = itemCmp;
})(Private || (Private = {}));
//# sourceMappingURL=observablemap.js.map

/***/ }),

/***/ "../../packages/observables/lib/observablestring.js":
/*!**********************************************************!*\
  !*** ../../packages/observables/lib/observablestring.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObservableString": () => (/* binding */ ObservableString)
/* harmony export */ });
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * A concrete implementation of [[IObservableString]]
 */
class ObservableString {
    /**
     * Construct a new observable string.
     */
    constructor(initialText = '') {
        this._text = '';
        this._isDisposed = false;
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal(this);
        this._text = initialText;
    }
    /**
     * The type of the Observable.
     */
    get type() {
        return 'String';
    }
    /**
     * A signal emitted when the string has changed.
     */
    get changed() {
        return this._changed;
    }
    /**
     * Set the value of the string.
     */
    set text(value) {
        if (value.length === this._text.length && value === this._text) {
            return;
        }
        this._text = value;
        this._changed.emit({
            type: 'set',
            start: 0,
            end: value.length,
            value: value
        });
    }
    /**
     * Get the value of the string.
     */
    get text() {
        return this._text;
    }
    /**
     * Insert a substring.
     *
     * @param index - The starting index.
     *
     * @param text - The substring to insert.
     */
    insert(index, text) {
        this._text = this._text.slice(0, index) + text + this._text.slice(index);
        this._changed.emit({
            type: 'insert',
            start: index,
            end: index + text.length,
            value: text
        });
    }
    /**
     * Remove a substring.
     *
     * @param start - The starting index.
     *
     * @param end - The ending index.
     */
    remove(start, end) {
        const oldValue = this._text.slice(start, end);
        this._text = this._text.slice(0, start) + this._text.slice(end);
        this._changed.emit({
            type: 'remove',
            start: start,
            end: end,
            value: oldValue
        });
    }
    /**
     * Set the ObservableString to an empty string.
     */
    clear() {
        this.text = '';
    }
    /**
     * Test whether the string has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the string.
     */
    dispose() {
        if (this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal.clearData(this);
        this.clear();
    }
}
//# sourceMappingURL=observablestring.js.map

/***/ }),

/***/ "../../packages/observables/lib/undoablelist.js":
/*!******************************************************!*\
  !*** ../../packages/observables/lib/undoablelist.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObservableUndoableList": () => (/* binding */ ObservableUndoableList)
/* harmony export */ });
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _observablelist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observablelist */ "../../packages/observables/lib/observablelist.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * A concrete implementation of an observable undoable list.
 */
class ObservableUndoableList extends _observablelist__WEBPACK_IMPORTED_MODULE_1__.ObservableList {
    /**
     * Construct a new undoable observable list.
     */
    constructor(serializer) {
        super();
        this._inCompound = false;
        this._isUndoable = true;
        this._madeCompoundChange = false;
        this._index = -1;
        this._stack = [];
        this._serializer = serializer;
        this.changed.connect(this._onListChanged, this);
    }
    /**
     * Whether the object can redo changes.
     */
    get canRedo() {
        return this._index < this._stack.length - 1;
    }
    /**
     * Whether the object can undo changes.
     */
    get canUndo() {
        return this._index >= 0;
    }
    /**
     * Begin a compound operation.
     *
     * @param isUndoAble - Whether the operation is undoable.
     *   The default is `true`.
     */
    beginCompoundOperation(isUndoAble) {
        this._inCompound = true;
        this._isUndoable = isUndoAble !== false;
        this._madeCompoundChange = false;
    }
    /**
     * End a compound operation.
     */
    endCompoundOperation() {
        this._inCompound = false;
        this._isUndoable = true;
        if (this._madeCompoundChange) {
            this._index++;
        }
    }
    /**
     * Undo an operation.
     */
    undo() {
        if (!this.canUndo) {
            return;
        }
        const changes = this._stack[this._index];
        this._isUndoable = false;
        for (const change of changes.reverse()) {
            this._undoChange(change);
        }
        this._isUndoable = true;
        this._index--;
    }
    /**
     * Redo an operation.
     */
    redo() {
        if (!this.canRedo) {
            return;
        }
        this._index++;
        const changes = this._stack[this._index];
        this._isUndoable = false;
        for (const change of changes) {
            this._redoChange(change);
        }
        this._isUndoable = true;
    }
    /**
     * Clear the change stack.
     */
    clearUndo() {
        this._index = -1;
        this._stack = [];
    }
    /**
     * Handle a change in the list.
     */
    _onListChanged(list, change) {
        if (this.isDisposed || !this._isUndoable) {
            return;
        }
        // Clear everything after this position if necessary.
        if (!this._inCompound || !this._madeCompoundChange) {
            this._stack = this._stack.slice(0, this._index + 1);
        }
        // Copy the change.
        const evt = this._copyChange(change);
        // Put the change in the stack.
        if (this._stack[this._index + 1]) {
            this._stack[this._index + 1].push(evt);
        }
        else {
            this._stack.push([evt]);
        }
        // If not in a compound operation, increase index.
        if (!this._inCompound) {
            this._index++;
        }
        else {
            this._madeCompoundChange = true;
        }
    }
    /**
     * Undo a change event.
     */
    _undoChange(change) {
        let index = 0;
        const serializer = this._serializer;
        switch (change.type) {
            case 'add':
                (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.each)(change.newValues, () => {
                    this.remove(change.newIndex);
                });
                break;
            case 'set':
                index = change.oldIndex;
                (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.each)(change.oldValues, value => {
                    this.set(index++, serializer.fromJSON(value));
                });
                break;
            case 'remove':
                index = change.oldIndex;
                (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.each)(change.oldValues, value => {
                    this.insert(index++, serializer.fromJSON(value));
                });
                break;
            case 'move':
                this.move(change.newIndex, change.oldIndex);
                break;
            default:
                return;
        }
    }
    /**
     * Redo a change event.
     */
    _redoChange(change) {
        let index = 0;
        const serializer = this._serializer;
        switch (change.type) {
            case 'add':
                index = change.newIndex;
                (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.each)(change.newValues, value => {
                    this.insert(index++, serializer.fromJSON(value));
                });
                break;
            case 'set':
                index = change.newIndex;
                (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.each)(change.newValues, value => {
                    this.set(change.newIndex++, serializer.fromJSON(value));
                });
                break;
            case 'remove':
                (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.each)(change.oldValues, () => {
                    this.remove(change.oldIndex);
                });
                break;
            case 'move':
                this.move(change.oldIndex, change.newIndex);
                break;
            default:
                return;
        }
    }
    /**
     * Copy a change as JSON.
     */
    _copyChange(change) {
        const oldValues = [];
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.each)(change.oldValues, value => {
            oldValues.push(this._serializer.toJSON(value));
        });
        const newValues = [];
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.each)(change.newValues, value => {
            newValues.push(this._serializer.toJSON(value));
        });
        return {
            type: change.type,
            oldIndex: change.oldIndex,
            newIndex: change.newIndex,
            oldValues,
            newValues
        };
    }
}
/**
 * Namespace for ObservableUndoableList utilities.
 */
(function (ObservableUndoableList) {
    /**
     * A default, identity serializer.
     */
    class IdentitySerializer {
        /**
         * Identity serialize.
         */
        toJSON(value) {
            return value;
        }
        /**
         * Identity deserialize.
         */
        fromJSON(value) {
            return value;
        }
    }
    ObservableUndoableList.IdentitySerializer = IdentitySerializer;
})(ObservableUndoableList || (ObservableUndoableList = {}));
//# sourceMappingURL=undoablelist.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvb2JzZXJ2YWJsZXMvbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9vYnNlcnZhYmxlcy9saWIvbW9kZWxkYi5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvb2JzZXJ2YWJsZXMvbGliL29ic2VydmFibGVqc29uLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9vYnNlcnZhYmxlcy9saWIvb2JzZXJ2YWJsZWxpc3QuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL29ic2VydmFibGVzL2xpYi9vYnNlcnZhYmxlbWFwLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9vYnNlcnZhYmxlcy9saWIvb2JzZXJ2YWJsZXN0cmluZy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvb2JzZXJ2YWJsZXMvbGliL3VuZG9hYmxlbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUNPO0FBQ0E7QUFDRDtBQUNHO0FBQ0o7QUFDL0IsaUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEE7QUFDQTtBQUM0QztBQUNPO0FBQ1I7QUFDTztBQUNGO0FBQ007QUFDRTtBQUN4RDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHFEQUFNO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGdFQUFpQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwrREFBZ0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBDQUEwQztBQUMzQztBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDZEQUFhO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIseURBQWE7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLCtEQUFnQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpRUFBc0IsS0FBSyxvRkFBeUM7QUFDNUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMkRBQWM7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHlCQUF5QjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbFNBO0FBQ0E7QUFDNEM7QUFDQTtBQUNJO0FBQ2hEO0FBQ0E7QUFDQTtBQUNPLDZCQUE2Qix5REFBYTtBQUNqRDtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQSxxQkFBcUIsZ0VBQWlCO0FBQ3RDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLCtEQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msc0RBQU87QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx3Q0FBd0M7QUFDekMsMEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuREE7QUFDQTtBQUMyRTtBQUNoQztBQUMzQztBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0EsNEJBQTRCLHFEQUFNO0FBQ2xDO0FBQ0EsWUFBWSx1REFBSTtBQUNoQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwrREFBZ0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiw0REFBYTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksOERBQWU7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixzRUFBdUI7QUFDN0M7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGdFQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw0REFBYTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdURBQUk7QUFDWjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDBEQUFPO0FBQzlCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdURBQUk7QUFDWixZQUFZLDhEQUFlO0FBQzNCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDBEQUFPO0FBQzlCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsY0FBYztBQUM5QyxZQUFZLGdFQUFpQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQiwwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsWkE7QUFDQTtBQUMyQztBQUMzQztBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBLDRCQUE0QixxREFBTTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtEQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQix5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0TEE7QUFDQTtBQUMyQztBQUMzQztBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixxREFBTTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsK0RBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLDRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxR0E7QUFDQTtBQUN5QztBQUNTO0FBQ2xEO0FBQ0E7QUFDQTtBQUNPLHFDQUFxQywyREFBYztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHVEQUFJO0FBQ3BCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix1REFBSTtBQUNwQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsdURBQUk7QUFDcEI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix1REFBSTtBQUNwQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsdURBQUk7QUFDcEI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGdCQUFnQix1REFBSTtBQUNwQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdURBQUk7QUFDWjtBQUNBLFNBQVM7QUFDVDtBQUNBLFFBQVEsdURBQUk7QUFDWjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsd0RBQXdEO0FBQ3pELHdDIiwiZmlsZSI6InBhY2thZ2VzX29ic2VydmFibGVzX2xpYl9pbmRleF9qcy5kY2I5ODk2YWJmMTJkMzIzYTVhOS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxufCBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgb2JzZXJ2YWJsZXNcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbGRiJztcbmV4cG9ydCAqIGZyb20gJy4vb2JzZXJ2YWJsZWpzb24nO1xuZXhwb3J0ICogZnJvbSAnLi9vYnNlcnZhYmxlbGlzdCc7XG5leHBvcnQgKiBmcm9tICcuL29ic2VydmFibGVtYXAnO1xuZXhwb3J0ICogZnJvbSAnLi9vYnNlcnZhYmxlc3RyaW5nJztcbmV4cG9ydCAqIGZyb20gJy4vdW5kb2FibGVsaXN0Jztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IEpTT05FeHQgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBEaXNwb3NhYmxlU2V0IH0gZnJvbSAnQGx1bWluby9kaXNwb3NhYmxlJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmltcG9ydCB7IE9ic2VydmFibGVKU09OIH0gZnJvbSAnLi9vYnNlcnZhYmxlanNvbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlTWFwIH0gZnJvbSAnLi9vYnNlcnZhYmxlbWFwJztcbmltcG9ydCB7IE9ic2VydmFibGVTdHJpbmcgfSBmcm9tICcuL29ic2VydmFibGVzdHJpbmcnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZVVuZG9hYmxlTGlzdCB9IGZyb20gJy4vdW5kb2FibGVsaXN0Jztcbi8qKlxuICogQSBjb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhbiBgSU9ic2VydmFibGVWYWx1ZWAuXG4gKi9cbmV4cG9ydCBjbGFzcyBPYnNlcnZhYmxlVmFsdWUge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yIGZvciB0aGUgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5pdGlhbFZhbHVlOiB0aGUgc3RhcnRpbmcgdmFsdWUgZm9yIHRoZSBgT2JzZXJ2YWJsZVZhbHVlYC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsVmFsdWUgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBvYnNlcnZhYmxlIHR5cGUuXG4gICAgICovXG4gICAgZ2V0IHR5cGUoKSB7XG4gICAgICAgIHJldHVybiAnVmFsdWUnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSB2YWx1ZSBoYXMgYmVlbiBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjaGFuZ2VkIHNpZ25hbC5cbiAgICAgKi9cbiAgICBnZXQgY2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCB2YWx1ZSwgb3IgYHVuZGVmaW5lZGAgaWYgaXQgaGFzIG5vdCBiZWVuIHNldC5cbiAgICAgKi9cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjdXJyZW50IHZhbHVlLlxuICAgICAqL1xuICAgIHNldCh2YWx1ZSkge1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xuICAgICAgICBpZiAoSlNPTkV4dC5kZWVwRXF1YWwob2xkVmFsdWUsIHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWUsXG4gICAgICAgICAgICBuZXdWYWx1ZTogdmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSB2YWx1ZS5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5faXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICBTaWduYWwuY2xlYXJEYXRhKHRoaXMpO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG4gICAgfVxufVxuLyoqXG4gKiBUaGUgbmFtZXNwYWNlIGZvciB0aGUgYE9ic2VydmFibGVWYWx1ZWAgY2xhc3Mgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChPYnNlcnZhYmxlVmFsdWUpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgY2hhbmdlZCBhcmdzIG9iamVjdCBlbWl0dGVkIGJ5IHRoZSBgSU9ic2VydmFibGVWYWx1ZWAuXG4gICAgICovXG4gICAgY2xhc3MgSUNoYW5nZWRBcmdzIHtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZVZhbHVlLklDaGFuZ2VkQXJncyA9IElDaGFuZ2VkQXJncztcbn0pKE9ic2VydmFibGVWYWx1ZSB8fCAoT2JzZXJ2YWJsZVZhbHVlID0ge30pKTtcbi8qKlxuICogQSBjb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhbiBgSU1vZGVsREJgLlxuICovXG5leHBvcnQgY2xhc3MgTW9kZWxEQiB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBgTW9kZWxEQmAuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGV0aGVyIHRoZSBtb2RlbCBoYXMgYmVlbiBwb3B1bGF0ZWQgd2l0aFxuICAgICAgICAgKiBhbnkgbW9kZWwgdmFsdWVzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc1ByZXBvcHVsYXRlZCA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0aGUgbW9kZWwgaXMgY29sbGFib3JhdGl2ZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaXNDb2xsYWJvcmF0aXZlID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIHByb21pc2UgcmVzb2x2ZWQgd2hlbiB0aGUgbW9kZWwgaXMgY29ubmVjdGVkXG4gICAgICAgICAqIHRvIGl0cyBiYWNrZW5kLiBGb3IgdGhlIGluLW1lbW9yeSBNb2RlbERCIGl0XG4gICAgICAgICAqIGlzIGltbWVkaWF0ZWx5IHJlc29sdmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBQcm9taXNlLnJlc29sdmUodm9pZCAwKTtcbiAgICAgICAgdGhpcy5fdG9EaXNwb3NlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZXMgPSBuZXcgRGlzcG9zYWJsZVNldCgpO1xuICAgICAgICB0aGlzLl9iYXNlUGF0aCA9IG9wdGlvbnMuYmFzZVBhdGggfHwgJyc7XG4gICAgICAgIGlmIChvcHRpb25zLmJhc2VEQikge1xuICAgICAgICAgICAgdGhpcy5fZGIgPSBvcHRpb25zLmJhc2VEQjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2RiID0gbmV3IE9ic2VydmFibGVNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuX3RvRGlzcG9zZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGJhc2UgcGF0aCBmb3IgdGhlIGBNb2RlbERCYC4gVGhpcyBpcyBwcmVwZW5kZWRcbiAgICAgKiB0byBhbGwgdGhlIHBhdGhzIHRoYXQgYXJlIHBhc3NlZCBpbiB0byB0aGUgbWVtYmVyXG4gICAgICogZnVuY3Rpb25zIG9mIHRoZSBvYmplY3QuXG4gICAgICovXG4gICAgZ2V0IGJhc2VQYXRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmFzZVBhdGg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGRhdGFiYXNlIGlzIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBpc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEaXNwb3NlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGEgdmFsdWUgZm9yIGEgcGF0aC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoOiB0aGUgcGF0aCBmb3IgdGhlIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGFuIGBJT2JzZXJ2YWJsZWAuXG4gICAgICovXG4gICAgZ2V0KHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RiLmdldCh0aGlzLl9yZXNvbHZlUGF0aChwYXRoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGBJTW9kZWxEQmAgaGFzIGFuIG9iamVjdCBhdCB0aGlzIHBhdGguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aDogdGhlIHBhdGggZm9yIHRoZSBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBhIGJvb2xlYW4gZm9yIHdoZXRoZXIgYW4gb2JqZWN0IGlzIGF0IGBwYXRoYC5cbiAgICAgKi9cbiAgICBoYXMocGF0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGIuaGFzKHRoaXMuX3Jlc29sdmVQYXRoKHBhdGgpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgc3RyaW5nIGFuZCBpbnNlcnQgaXQgaW4gdGhlIGRhdGFiYXNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGg6IHRoZSBwYXRoIGZvciB0aGUgc3RyaW5nLlxuICAgICAqXG4gICAgICogQHJldHVybnMgdGhlIHN0cmluZyB0aGF0IHdhcyBjcmVhdGVkLlxuICAgICAqL1xuICAgIGNyZWF0ZVN0cmluZyhwYXRoKSB7XG4gICAgICAgIGNvbnN0IHN0ciA9IG5ldyBPYnNlcnZhYmxlU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVzLmFkZChzdHIpO1xuICAgICAgICB0aGlzLnNldChwYXRoLCBzdHIpO1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gdW5kb2FibGUgbGlzdCBhbmQgaW5zZXJ0IGl0IGluIHRoZSBkYXRhYmFzZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoOiB0aGUgcGF0aCBmb3IgdGhlIGxpc3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB0aGUgbGlzdCB0aGF0IHdhcyBjcmVhdGVkLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSBsaXN0IGNhbiBvbmx5IHN0b3JlIG9iamVjdHMgdGhhdCBhcmUgc2ltcGxlXG4gICAgICogSlNPTiBPYmplY3RzIGFuZCBwcmltaXRpdmVzLlxuICAgICAqL1xuICAgIGNyZWF0ZUxpc3QocGF0aCkge1xuICAgICAgICBjb25zdCB2ZWMgPSBuZXcgT2JzZXJ2YWJsZVVuZG9hYmxlTGlzdChuZXcgT2JzZXJ2YWJsZVVuZG9hYmxlTGlzdC5JZGVudGl0eVNlcmlhbGl6ZXIoKSk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVzLmFkZCh2ZWMpO1xuICAgICAgICB0aGlzLnNldChwYXRoLCB2ZWMpO1xuICAgICAgICByZXR1cm4gdmVjO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBtYXAgYW5kIGluc2VydCBpdCBpbiB0aGUgZGF0YWJhc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aDogdGhlIHBhdGggZm9yIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB0aGUgbWFwIHRoYXQgd2FzIGNyZWF0ZWQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIG1hcCBjYW4gb25seSBzdG9yZSBvYmplY3RzIHRoYXQgYXJlIHNpbXBsZVxuICAgICAqIEpTT04gT2JqZWN0cyBhbmQgcHJpbWl0aXZlcy5cbiAgICAgKi9cbiAgICBjcmVhdGVNYXAocGF0aCkge1xuICAgICAgICBjb25zdCBtYXAgPSBuZXcgT2JzZXJ2YWJsZUpTT04oKTtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZXMuYWRkKG1hcCk7XG4gICAgICAgIHRoaXMuc2V0KHBhdGgsIG1hcCk7XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBvcGFxdWUgdmFsdWUgYW5kIGluc2VydCBpdCBpbiB0aGUgZGF0YWJhc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aDogdGhlIHBhdGggZm9yIHRoZSB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRoZSB2YWx1ZSB0aGF0IHdhcyBjcmVhdGVkLlxuICAgICAqL1xuICAgIGNyZWF0ZVZhbHVlKHBhdGgpIHtcbiAgICAgICAgY29uc3QgdmFsID0gbmV3IE9ic2VydmFibGVWYWx1ZSgpO1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlcy5hZGQodmFsKTtcbiAgICAgICAgdGhpcy5zZXQocGF0aCwgdmFsKTtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGEgdmFsdWUgYXQgYSBwYXRoLCBvciBgdW5kZWZpbmVkIGlmIGl0IGhhcyBub3QgYmVlbiBzZXRcbiAgICAgKiBUaGF0IHZhbHVlIG11c3QgYWxyZWFkeSBoYXZlIGJlZW4gY3JlYXRlZCB1c2luZyBgY3JlYXRlVmFsdWVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGg6IHRoZSBwYXRoIGZvciB0aGUgdmFsdWUuXG4gICAgICovXG4gICAgZ2V0VmFsdWUocGF0aCkge1xuICAgICAgICBjb25zdCB2YWwgPSB0aGlzLmdldChwYXRoKTtcbiAgICAgICAgaWYgKCF2YWwgfHwgdmFsLnR5cGUgIT09ICdWYWx1ZScpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdDYW4gb25seSBjYWxsIGdldFZhbHVlIGZvciBhbiBPYnNlcnZhYmxlVmFsdWUnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsLmdldCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgYSB2YWx1ZSBhdCBhIHBhdGguIFRoYXQgdmFsdWUgbXVzdCBhbHJlYWR5IGhhdmVcbiAgICAgKiBiZWVuIGNyZWF0ZWQgdXNpbmcgYGNyZWF0ZVZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoOiB0aGUgcGF0aCBmb3IgdGhlIHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlOiB0aGUgbmV3IHZhbHVlLlxuICAgICAqL1xuICAgIHNldFZhbHVlKHBhdGgsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHRoaXMuZ2V0KHBhdGgpO1xuICAgICAgICBpZiAoIXZhbCB8fCB2YWwudHlwZSAhPT0gJ1ZhbHVlJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0NhbiBvbmx5IGNhbGwgc2V0VmFsdWUgb24gYW4gT2JzZXJ2YWJsZVZhbHVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsLnNldCh2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHZpZXcgb250byBhIHN1YnRyZWUgb2YgdGhlIG1vZGVsIGRhdGFiYXNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGJhc2VQYXRoOiB0aGUgcGF0aCBmb3IgdGhlIHJvb3Qgb2YgdGhlIHN1YnRyZWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBhbiBgSU1vZGVsREJgIHdpdGggYSB2aWV3IG9udG8gdGhlIG9yaWdpbmFsXG4gICAgICogICBgSU1vZGVsREJgLCB3aXRoIGBiYXNlUGF0aGAgcHJlcGVuZGVkIHRvIGFsbCBwYXRocy5cbiAgICAgKi9cbiAgICB2aWV3KGJhc2VQYXRoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgTW9kZWxEQih7IGJhc2VQYXRoLCBiYXNlREI6IHRoaXMgfSk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVzLmFkZCh2aWV3KTtcbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCBhIHZhbHVlIGF0IGEgcGF0aC4gTm90IGludGVuZGVkIHRvXG4gICAgICogYmUgY2FsbGVkIGJ5IHVzZXIgY29kZSwgaW5zdGVhZCB1c2UgdGhlXG4gICAgICogYGNyZWF0ZSpgIGZhY3RvcnkgbWV0aG9kcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoOiB0aGUgcGF0aCB0byBzZXQgdGhlIHZhbHVlIGF0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlOiB0aGUgdmFsdWUgdG8gc2V0IGF0IHRoZSBwYXRoLlxuICAgICAqL1xuICAgIHNldChwYXRoLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9kYi5zZXQodGhpcy5fcmVzb2x2ZVBhdGgocGF0aCksIHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIGRhdGFiYXNlLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuX3RvRGlzcG9zZSkge1xuICAgICAgICAgICAgdGhpcy5fZGIuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSB0aGUgZnVsbHkgcmVzb2x2ZWQgcGF0aCBmb3IgYSBwYXRoIGFyZ3VtZW50LlxuICAgICAqL1xuICAgIF9yZXNvbHZlUGF0aChwYXRoKSB7XG4gICAgICAgIGlmICh0aGlzLl9iYXNlUGF0aCkge1xuICAgICAgICAgICAgcGF0aCA9IHRoaXMuX2Jhc2VQYXRoICsgJy4nICsgcGF0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGF0aDtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2RlbGRiLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IEpTT05FeHQgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnQGx1bWluby9tZXNzYWdpbmcnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZU1hcCB9IGZyb20gJy4vb2JzZXJ2YWJsZW1hcCc7XG4vKipcbiAqIEEgY29uY3JldGUgT2JzZXJ2YWJsZSBtYXAgZm9yIEpTT04gZGF0YS5cbiAqL1xuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVKU09OIGV4dGVuZHMgT2JzZXJ2YWJsZU1hcCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IG9ic2VydmFibGUgSlNPTiBvYmplY3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKHtcbiAgICAgICAgICAgIGl0ZW1DbXA6IEpTT05FeHQuZGVlcEVxdWFsLFxuICAgICAgICAgICAgdmFsdWVzOiBvcHRpb25zLnZhbHVlc1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VyaWFsaXplIHRoZSBtb2RlbCB0byBKU09OLlxuICAgICAqL1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3Qgb3V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgY29uc3Qga2V5cyA9IHRoaXMua2V5cygpO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0KGtleSk7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG91dFtrZXldID0gSlNPTkV4dC5kZWVwQ29weSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG59XG4vKipcbiAqIFRoZSBuYW1lc3BhY2UgZm9yIE9ic2VydmFibGVKU09OIHN0YXRpYyBkYXRhLlxuICovXG4oZnVuY3Rpb24gKE9ic2VydmFibGVKU09OKSB7XG4gICAgLyoqXG4gICAgICogQW4gb2JzZXJ2YWJsZSBKU09OIGNoYW5nZSBtZXNzYWdlLlxuICAgICAqL1xuICAgIGNsYXNzIENoYW5nZU1lc3NhZ2UgZXh0ZW5kcyBNZXNzYWdlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhIG5ldyBtZXRhZGF0YSBjaGFuZ2VkIG1lc3NhZ2UuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlLCBhcmdzKSB7XG4gICAgICAgICAgICBzdXBlcih0eXBlKTtcbiAgICAgICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JzZXJ2YWJsZUpTT04uQ2hhbmdlTWVzc2FnZSA9IENoYW5nZU1lc3NhZ2U7XG59KShPYnNlcnZhYmxlSlNPTiB8fCAoT2JzZXJ2YWJsZUpTT04gPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZWpzb24uanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgQXJyYXlFeHQsIEFycmF5SXRlcmF0b3IsIGVhY2gsIHRvQXJyYXkgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG4vKipcbiAqIEEgY29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgW1tJT2JzZXJ2YWJsZUxpc3RdXS5cbiAqL1xuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVMaXN0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgb2JzZXJ2YWJsZSBtYXAuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX2FycmF5ID0gW107XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIGlmIChvcHRpb25zLnZhbHVlcyAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBlYWNoKG9wdGlvbnMudmFsdWVzLCB2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXJyYXkucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pdGVtQ21wID0gb3B0aW9ucy5pdGVtQ21wIHx8IFByaXZhdGUuaXRlbUNtcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHR5cGUgb2YgdGhpcyBvYmplY3QuXG4gICAgICovXG4gICAgZ2V0IHR5cGUoKSB7XG4gICAgICAgIHJldHVybiAnTGlzdCc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgbGlzdCBoYXMgY2hhbmdlZC5cbiAgICAgKi9cbiAgICBnZXQgY2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBsZW5ndGggb2YgdGhlIGxpc3QuXG4gICAgICovXG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FycmF5Lmxlbmd0aDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIHRoZSBsaXN0IGhhcyBiZWVuIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBpc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEaXNwb3NlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIGxpc3QuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgU2lnbmFsLmNsZWFyRGF0YSh0aGlzKTtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gaXRlcmF0b3Igb3ZlciB0aGUgdmFsdWVzIGluIHRoZSBsaXN0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBuZXcgaXRlcmF0b3Igc3RhcnRpbmcgYXQgdGhlIGZyb250IG9mIHRoZSBsaXN0LlxuICAgICAqXG4gICAgICogIyMjIyBDb21wbGV4aXR5XG4gICAgICogQ29uc3RhbnQuXG4gICAgICpcbiAgICAgKiAjIyMjIEl0ZXJhdG9yIFZhbGlkaXR5XG4gICAgICogTm8gY2hhbmdlcy5cbiAgICAgKi9cbiAgICBpdGVyKCkge1xuICAgICAgICByZXR1cm4gbmV3IEFycmF5SXRlcmF0b3IodGhpcy5fYXJyYXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZhbHVlIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggLSBUaGUgcG9zaXRpdmUgaW50ZWdlciBpbmRleCBvZiBpbnRlcmVzdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSB2YWx1ZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgICAqXG4gICAgICogIyMjIyBVbmRlZmluZWQgQmVoYXZpb3JcbiAgICAgKiBBbiBgaW5kZXhgIHdoaWNoIGlzIG5vbi1pbnRlZ3JhbCBvciBvdXQgb2YgcmFuZ2UuXG4gICAgICovXG4gICAgZ2V0KGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hcnJheVtpbmRleF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdmFsdWUgYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCAtIFRoZSBwb3NpdGl2ZSBpbnRlZ2VyIGluZGV4IG9mIGludGVyZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIHNldCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgICAqXG4gICAgICogIyMjIyBDb21wbGV4aXR5XG4gICAgICogQ29uc3RhbnQuXG4gICAgICpcbiAgICAgKiAjIyMjIEl0ZXJhdG9yIFZhbGlkaXR5XG4gICAgICogTm8gY2hhbmdlcy5cbiAgICAgKlxuICAgICAqICMjIyMgVW5kZWZpbmVkIEJlaGF2aW9yXG4gICAgICogQW4gYGluZGV4YCB3aGljaCBpcyBub24taW50ZWdyYWwgb3Igb3V0IG9mIHJhbmdlLlxuICAgICAqL1xuICAgIHNldChpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLl9hcnJheVtpbmRleF07XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzZXQgYW4gdW5kZWZpbmVkIGl0ZW0nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBCYWlsIGlmIHRoZSB2YWx1ZSBkb2VzIG5vdCBjaGFuZ2UuXG4gICAgICAgIGNvbnN0IGl0ZW1DbXAgPSB0aGlzLl9pdGVtQ21wO1xuICAgICAgICBpZiAoaXRlbUNtcChvbGRWYWx1ZSwgdmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYXJyYXlbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiAnc2V0JyxcbiAgICAgICAgICAgIG9sZEluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIG5ld0luZGV4OiBpbmRleCxcbiAgICAgICAgICAgIG9sZFZhbHVlczogW29sZFZhbHVlXSxcbiAgICAgICAgICAgIG5ld1ZhbHVlczogW3ZhbHVlXVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgdmFsdWUgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBhZGQgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXcgbGVuZ3RoIG9mIHRoZSBsaXN0LlxuICAgICAqXG4gICAgICogIyMjIyBDb21wbGV4aXR5XG4gICAgICogQ29uc3RhbnQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogQnkgY29udmVudGlvbiwgdGhlIG9sZEluZGV4IGlzIHNldCB0byAtMSB0byBpbmRpY2F0ZVxuICAgICAqIGFuIHB1c2ggb3BlcmF0aW9uLlxuICAgICAqXG4gICAgICogIyMjIyBJdGVyYXRvciBWYWxpZGl0eVxuICAgICAqIE5vIGNoYW5nZXMuXG4gICAgICovXG4gICAgcHVzaCh2YWx1ZSkge1xuICAgICAgICBjb25zdCBudW0gPSB0aGlzLl9hcnJheS5wdXNoKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fY2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGQnLFxuICAgICAgICAgICAgb2xkSW5kZXg6IC0xLFxuICAgICAgICAgICAgbmV3SW5kZXg6IHRoaXMubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgIG9sZFZhbHVlczogW10sXG4gICAgICAgICAgICBuZXdWYWx1ZXM6IFt2YWx1ZV1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBudW07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydCBhIHZhbHVlIGludG8gdGhlIGxpc3QgYXQgYSBzcGVjaWZpYyBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCAtIFRoZSBpbmRleCBhdCB3aGljaCB0byBpbnNlcnQgdGhlIHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIHNldCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgICAqXG4gICAgICogIyMjIyBDb21wbGV4aXR5XG4gICAgICogTGluZWFyLlxuICAgICAqXG4gICAgICogIyMjIyBJdGVyYXRvciBWYWxpZGl0eVxuICAgICAqIE5vIGNoYW5nZXMuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIGBpbmRleGAgd2lsbCBiZSBjbGFtcGVkIHRvIHRoZSBib3VuZHMgb2YgdGhlIGxpc3QuXG4gICAgICpcbiAgICAgKiBCeSBjb252ZW50aW9uLCB0aGUgb2xkSW5kZXggaXMgc2V0IHRvIC0yIHRvIGluZGljYXRlXG4gICAgICogYW4gaW5zZXJ0IG9wZXJhdGlvbi5cbiAgICAgKlxuICAgICAqIFRoZSB2YWx1ZSAtMiBhcyBvbGRJbmRleCBjYW4gYmUgdXNlZCB0byBkaXN0aW5ndWlzaCBmcm9tIHRoZSBwdXNoXG4gICAgICogbWV0aG9kIHdoaWNoIHdpbGwgdXNlIGEgdmFsdWUgLTEuXG4gICAgICpcbiAgICAgKiAjIyMjIFVuZGVmaW5lZCBCZWhhdmlvclxuICAgICAqIEFuIGBpbmRleGAgd2hpY2ggaXMgbm9uLWludGVncmFsLlxuICAgICAqL1xuICAgIGluc2VydChpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGluZGV4ID09PSB0aGlzLl9hcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2FycmF5LnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgQXJyYXlFeHQuaW5zZXJ0KHRoaXMuX2FycmF5LCBpbmRleCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiAnYWRkJyxcbiAgICAgICAgICAgIG9sZEluZGV4OiAtMixcbiAgICAgICAgICAgIG5ld0luZGV4OiBpbmRleCxcbiAgICAgICAgICAgIG9sZFZhbHVlczogW10sXG4gICAgICAgICAgICBuZXdWYWx1ZXM6IFt2YWx1ZV1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBhIHZhbHVlIGZyb20gdGhlIGxpc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgb2YgaW50ZXJlc3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgaW5kZXggb2YgdGhlIHJlbW92ZWQgdmFsdWUsIG9yIGAtMWAgaWYgdGhlIHZhbHVlXG4gICAgICogICBpcyBub3QgY29udGFpbmVkIGluIHRoZSBsaXN0LlxuICAgICAqXG4gICAgICogIyMjIyBDb21wbGV4aXR5XG4gICAgICogTGluZWFyLlxuICAgICAqXG4gICAgICogIyMjIyBJdGVyYXRvciBWYWxpZGl0eVxuICAgICAqIEl0ZXJhdG9ycyBwb2ludGluZyBhdCB0aGUgcmVtb3ZlZCB2YWx1ZSBhbmQgYmV5b25kIGFyZSBpbnZhbGlkYXRlZC5cbiAgICAgKi9cbiAgICByZW1vdmVWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBpdGVtQ21wID0gdGhpcy5faXRlbUNtcDtcbiAgICAgICAgY29uc3QgaW5kZXggPSBBcnJheUV4dC5maW5kRmlyc3RJbmRleCh0aGlzLl9hcnJheSwgaXRlbSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbUNtcChpdGVtLCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlbW92ZShpbmRleCk7XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFuZCByZXR1cm4gdGhlIHZhbHVlIGF0IGEgc3BlY2lmaWMgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHZhbHVlIG9mIGludGVyZXN0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIHZhbHVlIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXgsIG9yIGB1bmRlZmluZWRgIGlmIHRoZVxuICAgICAqICAgaW5kZXggaXMgb3V0IG9mIHJhbmdlLlxuICAgICAqXG4gICAgICogIyMjIyBDb21wbGV4aXR5XG4gICAgICogQ29uc3RhbnQuXG4gICAgICpcbiAgICAgKiAjIyMjIEl0ZXJhdG9yIFZhbGlkaXR5XG4gICAgICogSXRlcmF0b3JzIHBvaW50aW5nIGF0IHRoZSByZW1vdmVkIHZhbHVlIGFuZCBiZXlvbmQgYXJlIGludmFsaWRhdGVkLlxuICAgICAqXG4gICAgICogIyMjIyBVbmRlZmluZWQgQmVoYXZpb3JcbiAgICAgKiBBbiBgaW5kZXhgIHdoaWNoIGlzIG5vbi1pbnRlZ3JhbC5cbiAgICAgKi9cbiAgICByZW1vdmUoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBBcnJheUV4dC5yZW1vdmVBdCh0aGlzLl9hcnJheSwgaW5kZXgpO1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiAncmVtb3ZlJyxcbiAgICAgICAgICAgIG9sZEluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIG5ld0luZGV4OiAtMSxcbiAgICAgICAgICAgIG5ld1ZhbHVlczogW10sXG4gICAgICAgICAgICBvbGRWYWx1ZXM6IFt2YWx1ZV1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCB2YWx1ZXMgZnJvbSB0aGUgbGlzdC5cbiAgICAgKlxuICAgICAqICMjIyMgQ29tcGxleGl0eVxuICAgICAqIExpbmVhci5cbiAgICAgKlxuICAgICAqICMjIyMgSXRlcmF0b3IgVmFsaWRpdHlcbiAgICAgKiBBbGwgY3VycmVudCBpdGVyYXRvcnMgYXJlIGludmFsaWRhdGVkLlxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICBjb25zdCBjb3B5ID0gdGhpcy5fYXJyYXkuc2xpY2UoKTtcbiAgICAgICAgdGhpcy5fYXJyYXkubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fY2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6ICdyZW1vdmUnLFxuICAgICAgICAgICAgb2xkSW5kZXg6IDAsXG4gICAgICAgICAgICBuZXdJbmRleDogMCxcbiAgICAgICAgICAgIG5ld1ZhbHVlczogW10sXG4gICAgICAgICAgICBvbGRWYWx1ZXM6IGNvcHlcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1vdmUgYSB2YWx1ZSBmcm9tIG9uZSBpbmRleCB0byBhbm90aGVyLlxuICAgICAqXG4gICAgICogQHBhcm0gZnJvbUluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIG1vdmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdG9JbmRleCAtIFRoZSBpbmRleCB0byBtb3ZlIHRoZSBlbGVtZW50IHRvLlxuICAgICAqXG4gICAgICogIyMjIyBDb21wbGV4aXR5XG4gICAgICogQ29uc3RhbnQuXG4gICAgICpcbiAgICAgKiAjIyMjIEl0ZXJhdG9yIFZhbGlkaXR5XG4gICAgICogSXRlcmF0b3JzIHBvaW50aW5nIGF0IHRoZSBsZXNzZXIgb2YgdGhlIGBmcm9tSW5kZXhgIGFuZCB0aGUgYHRvSW5kZXhgXG4gICAgICogYW5kIGJleW9uZCBhcmUgaW52YWxpZGF0ZWQuXG4gICAgICpcbiAgICAgKiAjIyMjIFVuZGVmaW5lZCBCZWhhdmlvclxuICAgICAqIEEgYGZyb21JbmRleGAgb3IgYSBgdG9JbmRleGAgd2hpY2ggaXMgbm9uLWludGVncmFsLlxuICAgICAqL1xuICAgIG1vdmUoZnJvbUluZGV4LCB0b0luZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA8PSAxIHx8IGZyb21JbmRleCA9PT0gdG9JbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFt0aGlzLl9hcnJheVtmcm9tSW5kZXhdXTtcbiAgICAgICAgQXJyYXlFeHQubW92ZSh0aGlzLl9hcnJheSwgZnJvbUluZGV4LCB0b0luZGV4KTtcbiAgICAgICAgdGhpcy5fY2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6ICdtb3ZlJyxcbiAgICAgICAgICAgIG9sZEluZGV4OiBmcm9tSW5kZXgsXG4gICAgICAgICAgICBuZXdJbmRleDogdG9JbmRleCxcbiAgICAgICAgICAgIG9sZFZhbHVlczogdmFsdWVzLFxuICAgICAgICAgICAgbmV3VmFsdWVzOiB2YWx1ZXNcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2ggYSBzZXQgb2YgdmFsdWVzIHRvIHRoZSBiYWNrIG9mIHRoZSBsaXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlcyAtIEFuIGl0ZXJhYmxlIG9yIGFycmF5LWxpa2Ugc2V0IG9mIHZhbHVlcyB0byBhZGQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3IGxlbmd0aCBvZiB0aGUgbGlzdC5cbiAgICAgKlxuICAgICAqICMjIyMgQ29tcGxleGl0eVxuICAgICAqIExpbmVhci5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBCeSBjb252ZW50aW9uLCB0aGUgb2xkSW5kZXggaXMgc2V0IHRvIC0xIHRvIGluZGljYXRlXG4gICAgICogYW4gcHVzaCBvcGVyYXRpb24uXG4gICAgICpcbiAgICAgKiAjIyMjIEl0ZXJhdG9yIFZhbGlkaXR5XG4gICAgICogTm8gY2hhbmdlcy5cbiAgICAgKi9cbiAgICBwdXNoQWxsKHZhbHVlcykge1xuICAgICAgICBjb25zdCBuZXdJbmRleCA9IHRoaXMubGVuZ3RoO1xuICAgICAgICBlYWNoKHZhbHVlcywgdmFsdWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5fYXJyYXkucHVzaCh2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogJ2FkZCcsXG4gICAgICAgICAgICBvbGRJbmRleDogLTEsXG4gICAgICAgICAgICBuZXdJbmRleCxcbiAgICAgICAgICAgIG9sZFZhbHVlczogW10sXG4gICAgICAgICAgICBuZXdWYWx1ZXM6IHRvQXJyYXkodmFsdWVzKVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnQgYSBzZXQgb2YgaXRlbXMgaW50byB0aGUgbGlzdCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IC0gVGhlIGluZGV4IGF0IHdoaWNoIHRvIGluc2VydCB0aGUgdmFsdWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlcyAtIFRoZSB2YWx1ZXMgdG8gaW5zZXJ0IGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICpcbiAgICAgKiAjIyMjIENvbXBsZXhpdHkuXG4gICAgICogTGluZWFyLlxuICAgICAqXG4gICAgICogIyMjIyBJdGVyYXRvciBWYWxpZGl0eVxuICAgICAqIE5vIGNoYW5nZXMuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIGBpbmRleGAgd2lsbCBiZSBjbGFtcGVkIHRvIHRoZSBib3VuZHMgb2YgdGhlIGxpc3QuXG4gICAgICogQnkgY29udmVudGlvbiwgdGhlIG9sZEluZGV4IGlzIHNldCB0byAtMiB0byBpbmRpY2F0ZVxuICAgICAqIGFuIGluc2VydCBvcGVyYXRpb24uXG4gICAgICpcbiAgICAgKiAjIyMjIFVuZGVmaW5lZCBCZWhhdmlvci5cbiAgICAgKiBBbiBgaW5kZXhgIHdoaWNoIGlzIG5vbi1pbnRlZ3JhbC5cbiAgICAgKi9cbiAgICBpbnNlcnRBbGwoaW5kZXgsIHZhbHVlcykge1xuICAgICAgICBjb25zdCBuZXdJbmRleCA9IGluZGV4O1xuICAgICAgICBlYWNoKHZhbHVlcywgdmFsdWUgPT4ge1xuICAgICAgICAgICAgQXJyYXlFeHQuaW5zZXJ0KHRoaXMuX2FycmF5LCBpbmRleCsrLCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogJ2FkZCcsXG4gICAgICAgICAgICBvbGRJbmRleDogLTIsXG4gICAgICAgICAgICBuZXdJbmRleCxcbiAgICAgICAgICAgIG9sZFZhbHVlczogW10sXG4gICAgICAgICAgICBuZXdWYWx1ZXM6IHRvQXJyYXkodmFsdWVzKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgcmFuZ2Ugb2YgaXRlbXMgZnJvbSB0aGUgbGlzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzdGFydEluZGV4IC0gVGhlIHN0YXJ0IGluZGV4IG9mIHRoZSByYW5nZSB0byByZW1vdmUgKGluY2x1c2l2ZSkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW5kSW5kZXggLSBUaGUgZW5kIGluZGV4IG9mIHRoZSByYW5nZSB0byByZW1vdmUgKGV4Y2x1c2l2ZSkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3IGxlbmd0aCBvZiB0aGUgbGlzdC5cbiAgICAgKlxuICAgICAqICMjIyMgQ29tcGxleGl0eVxuICAgICAqIExpbmVhci5cbiAgICAgKlxuICAgICAqICMjIyMgSXRlcmF0b3IgVmFsaWRpdHlcbiAgICAgKiBJdGVyYXRvcnMgcG9pbnRpbmcgdG8gdGhlIGZpcnN0IHJlbW92ZWQgdmFsdWUgYW5kIGJleW9uZCBhcmUgaW52YWxpZC5cbiAgICAgKlxuICAgICAqICMjIyMgVW5kZWZpbmVkIEJlaGF2aW9yXG4gICAgICogQSBgc3RhcnRJbmRleGAgb3IgYGVuZEluZGV4YCB3aGljaCBpcyBub24taW50ZWdyYWwuXG4gICAgICovXG4gICAgcmVtb3ZlUmFuZ2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWVzID0gdGhpcy5fYXJyYXkuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGVuZEluZGV4OyBpKyspIHtcbiAgICAgICAgICAgIEFycmF5RXh0LnJlbW92ZUF0KHRoaXMuX2FycmF5LCBzdGFydEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogJ3JlbW92ZScsXG4gICAgICAgICAgICBvbGRJbmRleDogc3RhcnRJbmRleCxcbiAgICAgICAgICAgIG5ld0luZGV4OiAtMSxcbiAgICAgICAgICAgIG9sZFZhbHVlcyxcbiAgICAgICAgICAgIG5ld1ZhbHVlczogW11cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmxlbmd0aDtcbiAgICB9XG59XG4vKipcbiAqIFRoZSBuYW1lc3BhY2UgZm9yIG1vZHVsZSBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgc3RyaWN0IGVxdWFsaXR5IGl0ZW0gY21wLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGl0ZW1DbXAoZmlyc3QsIHNlY29uZCkge1xuICAgICAgICByZXR1cm4gZmlyc3QgPT09IHNlY29uZDtcbiAgICB9XG4gICAgUHJpdmF0ZS5pdGVtQ21wID0gaXRlbUNtcDtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZWxpc3QuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuLyoqXG4gKiBBIGNvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIElPYnNlcnZhYmxlTWFwPFQ+LlxuICovXG5leHBvcnQgY2xhc3MgT2JzZXJ2YWJsZU1hcCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IG9ic2VydmFibGUgbWFwLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLl9tYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX2NoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2l0ZW1DbXAgPSBvcHRpb25zLml0ZW1DbXAgfHwgUHJpdmF0ZS5pdGVtQ21wO1xuICAgICAgICBpZiAob3B0aW9ucy52YWx1ZXMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9wdGlvbnMudmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwLnNldChrZXksIG9wdGlvbnMudmFsdWVzW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSB0eXBlIG9mIHRoZSBPYnNlcnZhYmxlLlxuICAgICAqL1xuICAgIGdldCB0eXBlKCkge1xuICAgICAgICByZXR1cm4gJ01hcCc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgbWFwIGhhcyBjaGFuZ2VkLlxuICAgICAqL1xuICAgIGdldCBjaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGlzIG1hcCBoYXMgYmVlbiBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBudW1iZXIgb2Yga2V5LXZhbHVlIHBhaXJzIGluIHRoZSBtYXAuXG4gICAgICovXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAuc2l6ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IGEga2V5LXZhbHVlIHBhaXIgaW4gdGhlIG1hcFxuICAgICAqXG4gICAgICogQHBhcmFtIGtleSAtIFRoZSBrZXkgdG8gc2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIGZvciB0aGUga2V5LlxuICAgICAqXG4gICAgICogQHJldHVybnMgdGhlIG9sZCB2YWx1ZSBmb3IgdGhlIGtleSwgb3IgdW5kZWZpbmVkXG4gICAgICogICBpZiB0aGF0IGRpZCBub3QgZXhpc3QuXG4gICAgICpcbiAgICAgKiBAdGhyb3dzIGlmIHRoZSBuZXcgdmFsdWUgaXMgdW5kZWZpbmVkLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgaXMgYSBuby1vcCBpZiB0aGUgdmFsdWUgZG9lcyBub3QgY2hhbmdlLlxuICAgICAqL1xuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG9sZFZhbCA9IHRoaXMuX21hcC5nZXQoa2V5KTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdDYW5ub3Qgc2V0IGFuIHVuZGVmaW5lZCB2YWx1ZSwgdXNlIHJlbW92ZScpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEJhaWwgaWYgdGhlIHZhbHVlIGRvZXMgbm90IGNoYW5nZS5cbiAgICAgICAgY29uc3QgaXRlbUNtcCA9IHRoaXMuX2l0ZW1DbXA7XG4gICAgICAgIGlmIChvbGRWYWwgIT09IHVuZGVmaW5lZCAmJiBpdGVtQ21wKG9sZFZhbCwgdmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gb2xkVmFsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBvbGRWYWwgPyAnY2hhbmdlJyA6ICdhZGQnLFxuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBvbGRWYWx1ZTogb2xkVmFsLFxuICAgICAgICAgICAgbmV3VmFsdWU6IHZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gb2xkVmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYSB2YWx1ZSBmb3IgYSBnaXZlbiBrZXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5IC0gdGhlIGtleS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRoZSB2YWx1ZSBmb3IgdGhhdCBrZXkuXG4gICAgICovXG4gICAgZ2V0KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLmdldChrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayB3aGV0aGVyIHRoZSBtYXAgaGFzIGEga2V5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGtleSAtIHRoZSBrZXkgdG8gY2hlY2suXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG1hcCBoYXMgdGhlIGtleSwgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICovXG4gICAgaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLmhhcyhrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYSBsaXN0IG9mIHRoZSBrZXlzIGluIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIGEgbGlzdCBvZiBrZXlzLlxuICAgICAqL1xuICAgIGtleXMoKSB7XG4gICAgICAgIGNvbnN0IGtleUxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fbWFwLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgICAgIGtleUxpc3QucHVzaChrKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBrZXlMaXN0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYSBsaXN0IG9mIHRoZSB2YWx1ZXMgaW4gdGhlIG1hcC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0gYSBsaXN0IG9mIHZhbHVlcy5cbiAgICAgKi9cbiAgICB2YWx1ZXMoKSB7XG4gICAgICAgIGNvbnN0IHZhbExpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fbWFwLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgICAgIHZhbExpc3QucHVzaCh2KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB2YWxMaXN0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBrZXkgZnJvbSB0aGUgbWFwXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5IC0gdGhlIGtleSB0byByZW1vdmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGdpdmVuIGtleSxcbiAgICAgKiAgIG9yIHVuZGVmaW5lZCBpZiB0aGF0IGRvZXMgbm90IGV4aXN0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgaXMgYSBuby1vcCBpZiB0aGUgdmFsdWUgZG9lcyBub3QgY2hhbmdlLlxuICAgICAqL1xuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsID0gdGhpcy5fbWFwLmdldChrZXkpO1xuICAgICAgICBjb25zdCByZW1vdmVkID0gdGhpcy5fbWFwLmRlbGV0ZShrZXkpO1xuICAgICAgICBpZiAocmVtb3ZlZCkge1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncmVtb3ZlJyxcbiAgICAgICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZTogb2xkVmFsLFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvbGRWYWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgT2JzZXJ2YWJsZU1hcCB0byBhbiBlbXB0eSBtYXAuXG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIC8vIERlbGV0ZSBvbmUgYnkgb25lIHRvIGVtaXQgdGhlIGNvcnJlY3Qgc2lnbmFscy5cbiAgICAgICAgY29uc3Qga2V5TGlzdCA9IHRoaXMua2V5cygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlKGtleUxpc3RbaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSBtYXAuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICBTaWduYWwuY2xlYXJEYXRhKHRoaXMpO1xuICAgICAgICB0aGlzLl9tYXAuY2xlYXIoKTtcbiAgICB9XG59XG4vKipcbiAqIFRoZSBuYW1lc3BhY2UgZm9yIG1vZHVsZSBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgc3RyaWN0IGVxdWFsaXR5IGl0ZW0gY29tcGFyYXRvci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpdGVtQ21wKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgICAgcmV0dXJuIGZpcnN0ID09PSBzZWNvbmQ7XG4gICAgfVxuICAgIFByaXZhdGUuaXRlbUNtcCA9IGl0ZW1DbXA7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmFibGVtYXAuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuLyoqXG4gKiBBIGNvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIFtbSU9ic2VydmFibGVTdHJpbmddXVxuICovXG5leHBvcnQgY2xhc3MgT2JzZXJ2YWJsZVN0cmluZyB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IG9ic2VydmFibGUgc3RyaW5nLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGluaXRpYWxUZXh0ID0gJycpIHtcbiAgICAgICAgdGhpcy5fdGV4dCA9ICcnO1xuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2NoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl90ZXh0ID0gaW5pdGlhbFRleHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSB0eXBlIG9mIHRoZSBPYnNlcnZhYmxlLlxuICAgICAqL1xuICAgIGdldCB0eXBlKCkge1xuICAgICAgICByZXR1cm4gJ1N0cmluZyc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgc3RyaW5nIGhhcyBjaGFuZ2VkLlxuICAgICAqL1xuICAgIGdldCBjaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB2YWx1ZSBvZiB0aGUgc3RyaW5nLlxuICAgICAqL1xuICAgIHNldCB0ZXh0KHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IHRoaXMuX3RleHQubGVuZ3RoICYmIHZhbHVlID09PSB0aGlzLl90ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdGV4dCA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogJ3NldCcsXG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGVuZDogdmFsdWUubGVuZ3RoLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZhbHVlIG9mIHRoZSBzdHJpbmcuXG4gICAgICovXG4gICAgZ2V0IHRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnQgYSBzdWJzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggLSBUaGUgc3RhcnRpbmcgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGV4dCAtIFRoZSBzdWJzdHJpbmcgdG8gaW5zZXJ0LlxuICAgICAqL1xuICAgIGluc2VydChpbmRleCwgdGV4dCkge1xuICAgICAgICB0aGlzLl90ZXh0ID0gdGhpcy5fdGV4dC5zbGljZSgwLCBpbmRleCkgKyB0ZXh0ICsgdGhpcy5fdGV4dC5zbGljZShpbmRleCk7XG4gICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiAnaW5zZXJ0JyxcbiAgICAgICAgICAgIHN0YXJ0OiBpbmRleCxcbiAgICAgICAgICAgIGVuZDogaW5kZXggKyB0ZXh0Lmxlbmd0aCxcbiAgICAgICAgICAgIHZhbHVlOiB0ZXh0XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBzdWJzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RhcnQgLSBUaGUgc3RhcnRpbmcgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW5kIC0gVGhlIGVuZGluZyBpbmRleC5cbiAgICAgKi9cbiAgICByZW1vdmUoc3RhcnQsIGVuZCkge1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuX3RleHQuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gICAgICAgIHRoaXMuX3RleHQgPSB0aGlzLl90ZXh0LnNsaWNlKDAsIHN0YXJ0KSArIHRoaXMuX3RleHQuc2xpY2UoZW5kKTtcbiAgICAgICAgdGhpcy5fY2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6ICdyZW1vdmUnLFxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBlbmQsXG4gICAgICAgICAgICB2YWx1ZTogb2xkVmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgT2JzZXJ2YWJsZVN0cmluZyB0byBhbiBlbXB0eSBzdHJpbmcuXG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMudGV4dCA9ICcnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUZXN0IHdoZXRoZXIgdGhlIHN0cmluZyBoYXMgYmVlbiBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSBzdHJpbmcuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgU2lnbmFsLmNsZWFyRGF0YSh0aGlzKTtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmFibGVzdHJpbmcuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgZWFjaCB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCB7IE9ic2VydmFibGVMaXN0IH0gZnJvbSAnLi9vYnNlcnZhYmxlbGlzdCc7XG4vKipcbiAqIEEgY29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgYW4gb2JzZXJ2YWJsZSB1bmRvYWJsZSBsaXN0LlxuICovXG5leHBvcnQgY2xhc3MgT2JzZXJ2YWJsZVVuZG9hYmxlTGlzdCBleHRlbmRzIE9ic2VydmFibGVMaXN0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgdW5kb2FibGUgb2JzZXJ2YWJsZSBsaXN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHNlcmlhbGl6ZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5faW5Db21wb3VuZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1VuZG9hYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbWFkZUNvbXBvdW5kQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuX3N0YWNrID0gW107XG4gICAgICAgIHRoaXMuX3NlcmlhbGl6ZXIgPSBzZXJpYWxpemVyO1xuICAgICAgICB0aGlzLmNoYW5nZWQuY29ubmVjdCh0aGlzLl9vbkxpc3RDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgb2JqZWN0IGNhbiByZWRvIGNoYW5nZXMuXG4gICAgICovXG4gICAgZ2V0IGNhblJlZG8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmRleCA8IHRoaXMuX3N0YWNrLmxlbmd0aCAtIDE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIG9iamVjdCBjYW4gdW5kbyBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGdldCBjYW5VbmRvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5kZXggPj0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQmVnaW4gYSBjb21wb3VuZCBvcGVyYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXNVbmRvQWJsZSAtIFdoZXRoZXIgdGhlIG9wZXJhdGlvbiBpcyB1bmRvYWJsZS5cbiAgICAgKiAgIFRoZSBkZWZhdWx0IGlzIGB0cnVlYC5cbiAgICAgKi9cbiAgICBiZWdpbkNvbXBvdW5kT3BlcmF0aW9uKGlzVW5kb0FibGUpIHtcbiAgICAgICAgdGhpcy5faW5Db21wb3VuZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2lzVW5kb2FibGUgPSBpc1VuZG9BYmxlICE9PSBmYWxzZTtcbiAgICAgICAgdGhpcy5fbWFkZUNvbXBvdW5kQ2hhbmdlID0gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVuZCBhIGNvbXBvdW5kIG9wZXJhdGlvbi5cbiAgICAgKi9cbiAgICBlbmRDb21wb3VuZE9wZXJhdGlvbigpIHtcbiAgICAgICAgdGhpcy5faW5Db21wb3VuZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1VuZG9hYmxlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuX21hZGVDb21wb3VuZENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5faW5kZXgrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVbmRvIGFuIG9wZXJhdGlvbi5cbiAgICAgKi9cbiAgICB1bmRvKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2FuVW5kbykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLl9zdGFja1t0aGlzLl9pbmRleF07XG4gICAgICAgIHRoaXMuX2lzVW5kb2FibGUgPSBmYWxzZTtcbiAgICAgICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcy5yZXZlcnNlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3VuZG9DaGFuZ2UoY2hhbmdlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc1VuZG9hYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5faW5kZXgtLTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVkbyBhbiBvcGVyYXRpb24uXG4gICAgICovXG4gICAgcmVkbygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNhblJlZG8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pbmRleCsrO1xuICAgICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5fc3RhY2tbdGhpcy5faW5kZXhdO1xuICAgICAgICB0aGlzLl9pc1VuZG9hYmxlID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlZG9DaGFuZ2UoY2hhbmdlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc1VuZG9hYmxlID0gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYXIgdGhlIGNoYW5nZSBzdGFjay5cbiAgICAgKi9cbiAgICBjbGVhclVuZG8oKSB7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuX3N0YWNrID0gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSBpbiB0aGUgbGlzdC5cbiAgICAgKi9cbiAgICBfb25MaXN0Q2hhbmdlZChsaXN0LCBjaGFuZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCB8fCAhdGhpcy5faXNVbmRvYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIENsZWFyIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhpcyBwb3NpdGlvbiBpZiBuZWNlc3NhcnkuXG4gICAgICAgIGlmICghdGhpcy5faW5Db21wb3VuZCB8fCAhdGhpcy5fbWFkZUNvbXBvdW5kQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFjayA9IHRoaXMuX3N0YWNrLnNsaWNlKDAsIHRoaXMuX2luZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29weSB0aGUgY2hhbmdlLlxuICAgICAgICBjb25zdCBldnQgPSB0aGlzLl9jb3B5Q2hhbmdlKGNoYW5nZSk7XG4gICAgICAgIC8vIFB1dCB0aGUgY2hhbmdlIGluIHRoZSBzdGFjay5cbiAgICAgICAgaWYgKHRoaXMuX3N0YWNrW3RoaXMuX2luZGV4ICsgMV0pIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YWNrW3RoaXMuX2luZGV4ICsgMV0ucHVzaChldnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc3RhY2sucHVzaChbZXZ0XSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgbm90IGluIGEgY29tcG91bmQgb3BlcmF0aW9uLCBpbmNyZWFzZSBpbmRleC5cbiAgICAgICAgaWYgKCF0aGlzLl9pbkNvbXBvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLl9pbmRleCsrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWFkZUNvbXBvdW5kQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVbmRvIGEgY2hhbmdlIGV2ZW50LlxuICAgICAqL1xuICAgIF91bmRvQ2hhbmdlKGNoYW5nZSkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBjb25zdCBzZXJpYWxpemVyID0gdGhpcy5fc2VyaWFsaXplcjtcbiAgICAgICAgc3dpdGNoIChjaGFuZ2UudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnYWRkJzpcbiAgICAgICAgICAgICAgICBlYWNoKGNoYW5nZS5uZXdWYWx1ZXMsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoY2hhbmdlLm5ld0luZGV4KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NldCc6XG4gICAgICAgICAgICAgICAgaW5kZXggPSBjaGFuZ2Uub2xkSW5kZXg7XG4gICAgICAgICAgICAgICAgZWFjaChjaGFuZ2Uub2xkVmFsdWVzLCB2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KGluZGV4KyssIHNlcmlhbGl6ZXIuZnJvbUpTT04odmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgaW5kZXggPSBjaGFuZ2Uub2xkSW5kZXg7XG4gICAgICAgICAgICAgICAgZWFjaChjaGFuZ2Uub2xkVmFsdWVzLCB2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KGluZGV4KyssIHNlcmlhbGl6ZXIuZnJvbUpTT04odmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vdmUnOlxuICAgICAgICAgICAgICAgIHRoaXMubW92ZShjaGFuZ2UubmV3SW5kZXgsIGNoYW5nZS5vbGRJbmRleCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWRvIGEgY2hhbmdlIGV2ZW50LlxuICAgICAqL1xuICAgIF9yZWRvQ2hhbmdlKGNoYW5nZSkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBjb25zdCBzZXJpYWxpemVyID0gdGhpcy5fc2VyaWFsaXplcjtcbiAgICAgICAgc3dpdGNoIChjaGFuZ2UudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnYWRkJzpcbiAgICAgICAgICAgICAgICBpbmRleCA9IGNoYW5nZS5uZXdJbmRleDtcbiAgICAgICAgICAgICAgICBlYWNoKGNoYW5nZS5uZXdWYWx1ZXMsIHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQoaW5kZXgrKywgc2VyaWFsaXplci5mcm9tSlNPTih2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2V0JzpcbiAgICAgICAgICAgICAgICBpbmRleCA9IGNoYW5nZS5uZXdJbmRleDtcbiAgICAgICAgICAgICAgICBlYWNoKGNoYW5nZS5uZXdWYWx1ZXMsIHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQoY2hhbmdlLm5ld0luZGV4KyssIHNlcmlhbGl6ZXIuZnJvbUpTT04odmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgZWFjaChjaGFuZ2Uub2xkVmFsdWVzLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGNoYW5nZS5vbGRJbmRleCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb3ZlJzpcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmUoY2hhbmdlLm9sZEluZGV4LCBjaGFuZ2UubmV3SW5kZXgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29weSBhIGNoYW5nZSBhcyBKU09OLlxuICAgICAqL1xuICAgIF9jb3B5Q2hhbmdlKGNoYW5nZSkge1xuICAgICAgICBjb25zdCBvbGRWYWx1ZXMgPSBbXTtcbiAgICAgICAgZWFjaChjaGFuZ2Uub2xkVmFsdWVzLCB2YWx1ZSA9PiB7XG4gICAgICAgICAgICBvbGRWYWx1ZXMucHVzaCh0aGlzLl9zZXJpYWxpemVyLnRvSlNPTih2YWx1ZSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbmV3VmFsdWVzID0gW107XG4gICAgICAgIGVhY2goY2hhbmdlLm5ld1ZhbHVlcywgdmFsdWUgPT4ge1xuICAgICAgICAgICAgbmV3VmFsdWVzLnB1c2godGhpcy5fc2VyaWFsaXplci50b0pTT04odmFsdWUpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBjaGFuZ2UudHlwZSxcbiAgICAgICAgICAgIG9sZEluZGV4OiBjaGFuZ2Uub2xkSW5kZXgsXG4gICAgICAgICAgICBuZXdJbmRleDogY2hhbmdlLm5ld0luZGV4LFxuICAgICAgICAgICAgb2xkVmFsdWVzLFxuICAgICAgICAgICAgbmV3VmFsdWVzXG4gICAgICAgIH07XG4gICAgfVxufVxuLyoqXG4gKiBOYW1lc3BhY2UgZm9yIE9ic2VydmFibGVVbmRvYWJsZUxpc3QgdXRpbGl0aWVzLlxuICovXG4oZnVuY3Rpb24gKE9ic2VydmFibGVVbmRvYWJsZUxpc3QpIHtcbiAgICAvKipcbiAgICAgKiBBIGRlZmF1bHQsIGlkZW50aXR5IHNlcmlhbGl6ZXIuXG4gICAgICovXG4gICAgY2xhc3MgSWRlbnRpdHlTZXJpYWxpemVyIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElkZW50aXR5IHNlcmlhbGl6ZS5cbiAgICAgICAgICovXG4gICAgICAgIHRvSlNPTih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZGVudGl0eSBkZXNlcmlhbGl6ZS5cbiAgICAgICAgICovXG4gICAgICAgIGZyb21KU09OKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JzZXJ2YWJsZVVuZG9hYmxlTGlzdC5JZGVudGl0eVNlcmlhbGl6ZXIgPSBJZGVudGl0eVNlcmlhbGl6ZXI7XG59KShPYnNlcnZhYmxlVW5kb2FibGVMaXN0IHx8IChPYnNlcnZhYmxlVW5kb2FibGVMaXN0ID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVuZG9hYmxlbGlzdC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9