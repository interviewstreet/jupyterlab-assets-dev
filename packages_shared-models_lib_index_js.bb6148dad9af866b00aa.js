(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_shared-models_lib_index_js"],{

/***/ "../../node_modules/y-protocols/awareness.js":
/*!***************************************************!*\
  !*** ../../node_modules/y-protocols/awareness.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "outdatedTimeout": () => (/* binding */ outdatedTimeout),
/* harmony export */   "Awareness": () => (/* binding */ Awareness),
/* harmony export */   "removeAwarenessStates": () => (/* binding */ removeAwarenessStates),
/* harmony export */   "encodeAwarenessUpdate": () => (/* binding */ encodeAwarenessUpdate),
/* harmony export */   "modifyAwarenessUpdate": () => (/* binding */ modifyAwarenessUpdate),
/* harmony export */   "applyAwarenessUpdate": () => (/* binding */ applyAwarenessUpdate)
/* harmony export */ });
/* harmony import */ var lib0_encoding__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lib0/encoding */ "../../node_modules/lib0/encoding.js");
/* harmony import */ var lib0_decoding__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lib0/decoding */ "../../node_modules/lib0/decoding.js");
/* harmony import */ var lib0_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lib0/time */ "../../node_modules/lib0/time.js");
/* harmony import */ var lib0_math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lib0/math */ "../../node_modules/lib0/math.js");
/* harmony import */ var lib0_observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lib0/observable */ "../../node_modules/lib0/observable.js");
/* harmony import */ var lib0_function__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lib0/function */ "../../node_modules/lib0/function.js");
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! yjs */ "webpack/sharing/consume/default/yjs/yjs");
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(yjs__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @module awareness-protocol
 */







 // eslint-disable-line

const outdatedTimeout = 30000

/**
 * @typedef {Object} MetaClientState
 * @property {number} MetaClientState.clock
 * @property {number} MetaClientState.lastUpdated unix timestamp
 */

/**
 * The Awareness class implements a simple shared state protocol that can be used for non-persistent data like awareness information
 * (cursor, username, status, ..). Each client can update its own local state and listen to state changes of
 * remote clients. Every client may set a state of a remote peer to `null` to mark the client as offline.
 *
 * Each client is identified by a unique client id (something we borrow from `doc.clientID`). A client can override
 * its own state by propagating a message with an increasing timestamp (`clock`). If such a message is received, it is
 * applied if the known state of that client is older than the new state (`clock < newClock`). If a client thinks that
 * a remote client is offline, it may propagate a message with
 * `{ clock: currentClientClock, state: null, client: remoteClient }`. If such a
 * message is received, and the known clock of that client equals the received clock, it will override the state with `null`.
 *
 * Before a client disconnects, it should propagate a `null` state with an updated clock.
 *
 * Awareness states must be updated every 30 seconds. Otherwise the Awareness instance will delete the client state.
 *
 * @extends {Observable<string>}
 */
class Awareness extends lib0_observable__WEBPACK_IMPORTED_MODULE_1__.Observable {
  /**
   * @param {Y.Doc} doc
   */
  constructor (doc) {
    super()
    this.doc = doc
    /**
     * @type {number}
     */
    this.clientID = doc.clientID
    /**
     * Maps from client id to client state
     * @type {Map<number, Object<string, any>>}
     */
    this.states = new Map()
    /**
     * @type {Map<number, MetaClientState>}
     */
    this.meta = new Map()
    this._checkInterval = /** @type {any} */ (setInterval(() => {
      const now = lib0_time__WEBPACK_IMPORTED_MODULE_2__.getUnixTime()
      if (this.getLocalState() !== null && (outdatedTimeout / 2 <= now - /** @type {{lastUpdated:number}} */ (this.meta.get(this.clientID)).lastUpdated)) {
        // renew local clock
        this.setLocalState(this.getLocalState())
      }
      /**
       * @type {Array<number>}
       */
      const remove = []
      this.meta.forEach((meta, clientid) => {
        if (clientid !== this.clientID && outdatedTimeout <= now - meta.lastUpdated && this.states.has(clientid)) {
          remove.push(clientid)
        }
      })
      if (remove.length > 0) {
        removeAwarenessStates(this, remove, 'timeout')
      }
    }, lib0_math__WEBPACK_IMPORTED_MODULE_3__.floor(outdatedTimeout / 10)))
    doc.on('destroy', () => {
      this.destroy()
    })
    this.setLocalState({})
  }

  destroy () {
    this.emit('destroy', [this])
    this.setLocalState(null)
    super.destroy()
    clearInterval(this._checkInterval)
  }

  /**
   * @return {Object<string,any>|null}
   */
  getLocalState () {
    return this.states.get(this.clientID) || null
  }

  /**
   * @param {Object<string,any>|null} state
   */
  setLocalState (state) {
    const clientID = this.clientID
    const currLocalMeta = this.meta.get(clientID)
    const clock = currLocalMeta === undefined ? 0 : currLocalMeta.clock + 1
    const prevState = this.states.get(clientID)
    if (state === null) {
      this.states.delete(clientID)
    } else {
      this.states.set(clientID, state)
    }
    this.meta.set(clientID, {
      clock,
      lastUpdated: lib0_time__WEBPACK_IMPORTED_MODULE_2__.getUnixTime()
    })
    const added = []
    const updated = []
    const filteredUpdated = []
    const removed = []
    if (state === null) {
      removed.push(clientID)
    } else if (prevState == null) {
      if (state != null) {
        added.push(clientID)
      }
    } else {
      updated.push(clientID)
      if (!lib0_function__WEBPACK_IMPORTED_MODULE_4__.equalityDeep(prevState, state)) {
        filteredUpdated.push(clientID)
      }
    }
    if (added.length > 0 || filteredUpdated.length > 0 || removed.length > 0) {
      this.emit('change', [{ added, updated: filteredUpdated, removed }, 'local'])
    }
    this.emit('update', [{ added, updated, removed }, 'local'])
  }

  /**
   * @param {string} field
   * @param {any} value
   */
  setLocalStateField (field, value) {
    const state = this.getLocalState()
    if (state !== null) {
      this.setLocalState({
        ...state,
        [field]: value
      })
    }
  }

  /**
   * @return {Map<number,Object<string,any>>}
   */
  getStates () {
    return this.states
  }
}

/**
 * Mark (remote) clients as inactive and remove them from the list of active peers.
 * This change will be propagated to remote clients.
 *
 * @param {Awareness} awareness
 * @param {Array<number>} clients
 * @param {any} origin
 */
const removeAwarenessStates = (awareness, clients, origin) => {
  const removed = []
  for (let i = 0; i < clients.length; i++) {
    const clientID = clients[i]
    if (awareness.states.has(clientID)) {
      awareness.states.delete(clientID)
      if (clientID === awareness.clientID) {
        const curMeta = /** @type {MetaClientState} */ (awareness.meta.get(clientID))
        awareness.meta.set(clientID, {
          clock: curMeta.clock + 1,
          lastUpdated: lib0_time__WEBPACK_IMPORTED_MODULE_2__.getUnixTime()
        })
      }
      removed.push(clientID)
    }
  }
  if (removed.length > 0) {
    awareness.emit('change', [{ added: [], updated: [], removed }, origin])
    awareness.emit('update', [{ added: [], updated: [], removed }, origin])
  }
}

/**
 * @param {Awareness} awareness
 * @param {Array<number>} clients
 * @return {Uint8Array}
 */
const encodeAwarenessUpdate = (awareness, clients, states = awareness.states) => {
  const len = clients.length
  const encoder = lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.createEncoder()
  lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.writeVarUint(encoder, len)
  for (let i = 0; i < len; i++) {
    const clientID = clients[i]
    const state = states.get(clientID) || null
    const clock = /** @type {MetaClientState} */ (awareness.meta.get(clientID)).clock
    lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.writeVarUint(encoder, clientID)
    lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.writeVarUint(encoder, clock)
    lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.writeVarString(encoder, JSON.stringify(state))
  }
  return lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.toUint8Array(encoder)
}

/**
 * Modify the content of an awareness update before re-encoding it to an awareness update.
 *
 * This might be useful when you have a central server that wants to ensure that clients
 * cant hijack somebody elses identity.
 *
 * @param {Uint8Array} update
 * @param {function(any):any} modify
 * @return {Uint8Array}
 */
const modifyAwarenessUpdate = (update, modify) => {
  const decoder = lib0_decoding__WEBPACK_IMPORTED_MODULE_6__.createDecoder(update)
  const encoder = lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.createEncoder()
  const len = lib0_decoding__WEBPACK_IMPORTED_MODULE_6__.readVarUint(decoder)
  lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.writeVarUint(encoder, len)
  for (let i = 0; i < len; i++) {
    const clientID = lib0_decoding__WEBPACK_IMPORTED_MODULE_6__.readVarUint(decoder)
    const clock = lib0_decoding__WEBPACK_IMPORTED_MODULE_6__.readVarUint(decoder)
    const state = JSON.parse(lib0_decoding__WEBPACK_IMPORTED_MODULE_6__.readVarString(decoder))
    const modifiedState = modify(state)
    lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.writeVarUint(encoder, clientID)
    lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.writeVarUint(encoder, clock)
    lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.writeVarString(encoder, JSON.stringify(modifiedState))
  }
  return lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.toUint8Array(encoder)
}

/**
 * @param {Awareness} awareness
 * @param {Uint8Array} update
 * @param {any} origin This will be added to the emitted change event
 */
const applyAwarenessUpdate = (awareness, update, origin) => {
  const decoder = lib0_decoding__WEBPACK_IMPORTED_MODULE_6__.createDecoder(update)
  const timestamp = lib0_time__WEBPACK_IMPORTED_MODULE_2__.getUnixTime()
  const added = []
  const updated = []
  const filteredUpdated = []
  const removed = []
  const len = lib0_decoding__WEBPACK_IMPORTED_MODULE_6__.readVarUint(decoder)
  for (let i = 0; i < len; i++) {
    const clientID = lib0_decoding__WEBPACK_IMPORTED_MODULE_6__.readVarUint(decoder)
    let clock = lib0_decoding__WEBPACK_IMPORTED_MODULE_6__.readVarUint(decoder)
    const state = JSON.parse(lib0_decoding__WEBPACK_IMPORTED_MODULE_6__.readVarString(decoder))
    const clientMeta = awareness.meta.get(clientID)
    const prevState = awareness.states.get(clientID)
    const currClock = clientMeta === undefined ? 0 : clientMeta.clock
    if (currClock < clock || (currClock === clock && state === null && awareness.states.has(clientID))) {
      if (state === null) {
        // never let a remote client remove this local state
        if (clientID === awareness.clientID && awareness.getLocalState() != null) {
          // remote client removed the local state. Do not remote state. Broadcast a message indicating
          // that this client still exists by increasing the clock
          clock++
        } else {
          awareness.states.delete(clientID)
        }
      } else {
        awareness.states.set(clientID, state)
      }
      awareness.meta.set(clientID, {
        clock,
        lastUpdated: timestamp
      })
      if (clientMeta === undefined && state !== null) {
        added.push(clientID)
      } else if (clientMeta !== undefined && state === null) {
        removed.push(clientID)
      } else if (state !== null) {
        if (!lib0_function__WEBPACK_IMPORTED_MODULE_4__.equalityDeep(state, prevState)) {
          filteredUpdated.push(clientID)
        }
        updated.push(clientID)
      }
    }
  }
  if (added.length > 0 || filteredUpdated.length > 0 || removed.length > 0) {
    awareness.emit('change', [{
      added, updated: filteredUpdated, removed
    }, origin])
  }
  if (added.length > 0 || updated.length > 0 || removed.length > 0) {
    awareness.emit('update', [{
      added, updated, removed
    }, origin])
  }
}


/***/ }),

/***/ "../../packages/shared-models/lib/index.js":
/*!*************************************************!*\
  !*** ../../packages/shared-models/lib/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "YBaseCell": () => (/* reexport safe */ _ymodels__WEBPACK_IMPORTED_MODULE_0__.YBaseCell),
/* harmony export */   "YCodeCell": () => (/* reexport safe */ _ymodels__WEBPACK_IMPORTED_MODULE_0__.YCodeCell),
/* harmony export */   "YDocument": () => (/* reexport safe */ _ymodels__WEBPACK_IMPORTED_MODULE_0__.YDocument),
/* harmony export */   "YFile": () => (/* reexport safe */ _ymodels__WEBPACK_IMPORTED_MODULE_0__.YFile),
/* harmony export */   "YMarkdownCell": () => (/* reexport safe */ _ymodels__WEBPACK_IMPORTED_MODULE_0__.YMarkdownCell),
/* harmony export */   "YNotebook": () => (/* reexport safe */ _ymodels__WEBPACK_IMPORTED_MODULE_0__.YNotebook),
/* harmony export */   "YRawCell": () => (/* reexport safe */ _ymodels__WEBPACK_IMPORTED_MODULE_0__.YRawCell),
/* harmony export */   "createCellFromType": () => (/* reexport safe */ _ymodels__WEBPACK_IMPORTED_MODULE_0__.createCellFromType),
/* harmony export */   "createStandaloneCell": () => (/* reexport safe */ _ymodels__WEBPACK_IMPORTED_MODULE_0__.createStandaloneCell),
/* harmony export */   "convertYMapEventToMapChange": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_1__.convertYMapEventToMapChange),
/* harmony export */   "createMutex": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_1__.createMutex)
/* harmony export */ });
/* harmony import */ var _ymodels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ymodels */ "../../packages/shared-models/lib/ymodels.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../../packages/shared-models/lib/utils.js");
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module shared-models
 */



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/shared-models/lib/utils.js":
/*!*************************************************!*\
  !*** ../../packages/shared-models/lib/utils.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertYMapEventToMapChange": () => (/* binding */ convertYMapEventToMapChange),
/* harmony export */   "createMutex": () => (/* binding */ createMutex)
/* harmony export */ });
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
function convertYMapEventToMapChange(event) {
    let changes = new Map();
    event.changes.keys.forEach((event, key) => {
        changes.set(key, {
            action: event.action,
            oldValue: event.oldValue,
            newValue: this.ymeta.get(key)
        });
    });
    return changes;
}
/**
 * Creates a mutual exclude function with the following property:
 *
 * ```js
 * const mutex = createMutex()
 * mutex(() => {
 *   // This function is immediately executed
 *   mutex(() => {
 *     // This function is not executed, as the mutex is already active.
 *   })
 * })
 * ```
 */
const createMutex = () => {
    let token = true;
    return (f) => {
        if (token) {
            token = false;
            try {
                f();
            }
            finally {
                token = true;
            }
        }
    };
};
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "../../packages/shared-models/lib/ymodels.js":
/*!***************************************************!*\
  !*** ../../packages/shared-models/lib/ymodels.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "YDocument": () => (/* binding */ YDocument),
/* harmony export */   "YFile": () => (/* binding */ YFile),
/* harmony export */   "YNotebook": () => (/* binding */ YNotebook),
/* harmony export */   "createCellFromType": () => (/* binding */ createCellFromType),
/* harmony export */   "createStandaloneCell": () => (/* binding */ createStandaloneCell),
/* harmony export */   "YBaseCell": () => (/* binding */ YBaseCell),
/* harmony export */   "YCodeCell": () => (/* binding */ YCodeCell),
/* harmony export */   "YRawCell": () => (/* binding */ YRawCell),
/* harmony export */   "YMarkdownCell": () => (/* binding */ YMarkdownCell),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var y_protocols_awareness__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! y-protocols/awareness */ "../../node_modules/y-protocols/awareness.js");
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! yjs */ "webpack/sharing/consume/default/yjs/yjs");
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(yjs__WEBPACK_IMPORTED_MODULE_3__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/




const deepCopy = (o) => JSON.parse(JSON.stringify(o));
class YDocument {
    constructor() {
        this.isDisposed = false;
        this.ydoc = new yjs__WEBPACK_IMPORTED_MODULE_3__.Doc();
        this.source = this.ydoc.getText('source');
        this.ystate = this.ydoc.getMap('state');
        this.undoManager = new yjs__WEBPACK_IMPORTED_MODULE_3__.UndoManager([this.source], {
            trackedOrigins: new Set([this])
        });
        this.awareness = new y_protocols_awareness__WEBPACK_IMPORTED_MODULE_2__.Awareness(this.ydoc);
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
    }
    get dirty() {
        return this.ystate.get('dirty');
    }
    set dirty(value) {
        this.transact(() => {
            this.ystate.set('dirty', value);
        }, false);
    }
    /**
     * Perform a transaction. While the function f is called, all changes to the shared
     * document are bundled into a single event.
     */
    transact(f, undoable = true) {
        this.ydoc.transact(f, undoable ? this : null);
    }
    /**
     * Dispose of the resources.
     */
    dispose() {
        this.isDisposed = true;
        this.ydoc.destroy();
    }
    /**
     * Whether the object can undo changes.
     */
    canUndo() {
        return this.undoManager.undoStack.length > 0;
    }
    /**
     * Whether the object can redo changes.
     */
    canRedo() {
        return this.undoManager.redoStack.length > 0;
    }
    /**
     * Undo an operation.
     */
    undo() {
        this.undoManager.undo();
    }
    /**
     * Redo an operation.
     */
    redo() {
        this.undoManager.redo();
    }
    /**
     * Clear the change stack.
     */
    clearUndoHistory() {
        this.undoManager.clear();
    }
    /**
     * The changed signal.
     */
    get changed() {
        return this._changed;
    }
}
class YFile extends YDocument {
    constructor() {
        super();
        /**
         * Handle a change to the ymodel.
         */
        this._modelObserver = (event) => {
            const changes = {};
            changes.sourceChange = event.changes.delta;
            this._changed.emit(changes);
        };
        /**
         * Handle a change to the ystate.
         */
        this._onStateChanged = (event) => {
            const stateChange = [];
            event.keysChanged.forEach(key => {
                const change = event.changes.keys.get(key);
                if (change) {
                    stateChange.push({
                        name: key,
                        oldValue: change.oldValue,
                        newValue: this.ystate.get(key)
                    });
                }
            });
            this._changed.emit({ stateChange });
        };
        this.ysource = this.ydoc.getText('source');
        this.ysource.observe(this._modelObserver);
        this.ystate.observe(this._onStateChanged);
    }
    /**
     * Dispose of the resources.
     */
    dispose() {
        this.ysource.unobserve(this._modelObserver);
        this.ystate.unobserve(this._onStateChanged);
    }
    static create() {
        return new YFile();
    }
    /**
     * Gets cell's source.
     *
     * @returns Cell's source.
     */
    getSource() {
        return this.ysource.toString();
    }
    /**
     * Sets cell's source.
     *
     * @param value: New source.
     */
    setSource(value) {
        this.transact(() => {
            const ytext = this.ysource;
            ytext.delete(0, ytext.length);
            ytext.insert(0, value);
        });
    }
    /**
     * Replace content from `start' to `end` with `value`.
     *
     * @param start: The start index of the range to replace (inclusive).
     *
     * @param end: The end index of the range to replace (exclusive).
     *
     * @param value: New source (optional).
     */
    updateSource(start, end, value = '') {
        this.transact(() => {
            const ysource = this.ysource;
            // insert and then delete.
            // This ensures that the cursor position is adjusted after the replaced content.
            ysource.insert(start, value);
            ysource.delete(start + value.length, end - start);
        });
    }
}
/**
 * Shared implementation of the Shared Document types.
 *
 * Shared cells can be inserted into a SharedNotebook.
 * Shared cells only start emitting events when they are connected to a SharedNotebook.
 *
 * "Standalone" cells must not be inserted into a (Shared)Notebook.
 * Standalone cells emit events immediately after they have been created, but they must not
 * be included into a (Shared)Notebook.
 */
class YNotebook extends YDocument {
    constructor(options) {
        super();
        /**
         * Handle a change to the list of cells.
         */
        this._onYCellsChanged = (event) => {
            // update the type⇔cell mapping by iterating through the added/removed types
            event.changes.added.forEach(item => {
                const type = item.content.type;
                if (!this._ycellMapping.has(type)) {
                    this._ycellMapping.set(type, createCellFromType(type));
                }
                const cell = this._ycellMapping.get(type);
                cell._notebook = this;
                if (!this.disableDocumentWideUndoRedo) {
                    cell._undoManager = this.undoManager;
                }
                else {
                    cell._undoManager = new yjs__WEBPACK_IMPORTED_MODULE_3__.UndoManager([cell.ymodel], {});
                }
            });
            event.changes.deleted.forEach(item => {
                const type = item.content.type;
                const model = this._ycellMapping.get(type);
                if (model) {
                    model.dispose();
                    this._ycellMapping.delete(type);
                }
            });
            let index = 0;
            // this reflects the event.changes.delta, but replaces the content of delta.insert with ycells
            const cellsChange = [];
            event.changes.delta.forEach((d) => {
                if (d.insert != null) {
                    const insertedCells = d.insert.map((ycell) => this._ycellMapping.get(ycell));
                    cellsChange.push({ insert: insertedCells });
                    this.cells.splice(index, 0, ...insertedCells);
                    index += d.insert.length;
                }
                else if (d.delete != null) {
                    cellsChange.push(d);
                    this.cells.splice(index, d.delete);
                }
                else if (d.retain != null) {
                    cellsChange.push(d);
                    index += d.retain;
                }
            });
            this._changed.emit({
                cellsChange: cellsChange
            });
        };
        /**
         * Handle a change to the ystate.
         */
        this._onMetadataChanged = (event) => {
            if (event.keysChanged.has('metadata')) {
                const change = event.changes.keys.get('metadata');
                const metadataChange = {
                    oldValue: (change === null || change === void 0 ? void 0 : change.oldValue) ? change.oldValue : undefined,
                    newValue: this.getMetadata()
                };
                this._changed.emit({ metadataChange });
            }
        };
        /**
         * Handle a change to the ystate.
         */
        this._onStateChanged = (event) => {
            const stateChange = [];
            event.keysChanged.forEach(key => {
                const change = event.changes.keys.get(key);
                if (change) {
                    stateChange.push({
                        name: key,
                        oldValue: change.oldValue,
                        newValue: this.ystate.get(key)
                    });
                }
            });
            this._changed.emit({ stateChange });
        };
        this.ycells = this.ydoc.getArray('cells');
        this.ymeta = this.ydoc.getMap('meta');
        this.ymodel = this.ydoc.getMap('model');
        this.undoManager = new yjs__WEBPACK_IMPORTED_MODULE_3__.UndoManager([this.ycells], {
            trackedOrigins: new Set([this])
        });
        this._ycellMapping = new Map();
        this._disableDocumentWideUndoRedo = options.disableDocumentWideUndoRedo;
        this.ycells.observe(this._onYCellsChanged);
        this.cells = this.ycells.toArray().map(ycell => {
            if (!this._ycellMapping.has(ycell)) {
                this._ycellMapping.set(ycell, createCellFromType(ycell));
            }
            return this._ycellMapping.get(ycell);
        });
        this.ymeta.observe(this._onMetadataChanged);
        this.ystate.observe(this._onStateChanged);
    }
    get nbformat() {
        return this.ystate.get('nbformat');
    }
    set nbformat(value) {
        this.transact(() => {
            this.ystate.set('nbformat', value);
        }, false);
    }
    get nbformat_minor() {
        return this.ystate.get('nbformatMinor');
    }
    set nbformat_minor(value) {
        this.transact(() => {
            this.ystate.set('nbformatMinor', value);
        }, false);
    }
    /**
     * Dispose of the resources.
     */
    dispose() {
        this.ycells.unobserve(this._onYCellsChanged);
        this.ymeta.unobserve(this._onMetadataChanged);
        this.ystate.unobserve(this._onStateChanged);
    }
    /**
     * Get a shared cell by index.
     *
     * @param index: Cell's position.
     *
     * @returns The requested shared cell.
     */
    getCell(index) {
        return this.cells[index];
    }
    /**
     * Insert a shared cell into a specific position.
     *
     * @param index: Cell's position.
     *
     * @param cell: Cell to insert.
     */
    insertCell(index, cell) {
        this.insertCells(index, [cell]);
    }
    /**
     * Insert a list of shared cells into a specific position.
     *
     * @param index: Position to insert the cells.
     *
     * @param cells: Array of shared cells to insert.
     */
    insertCells(index, cells) {
        cells.forEach(cell => {
            this._ycellMapping.set(cell.ymodel, cell);
            if (!this.disableDocumentWideUndoRedo) {
                cell.undoManager = this.undoManager;
            }
        });
        this.transact(() => {
            this.ycells.insert(index, cells.map(cell => cell.ymodel));
        });
    }
    /**
     * Move a cell.
     *
     * @param fromIndex: Index of the cell to move.
     *
     * @param toIndex: New position of the cell.
     */
    moveCell(fromIndex, toIndex) {
        this.transact(() => {
            const fromCell = this.getCell(fromIndex).clone();
            this.deleteCell(fromIndex);
            this.insertCell(toIndex, fromCell);
        });
    }
    /**
     * Remove a cell.
     *
     * @param index: Index of the cell to remove.
     */
    deleteCell(index) {
        this.deleteCellRange(index, index + 1);
    }
    /**
     * Remove a range of cells.
     *
     * @param from: The start index of the range to remove (inclusive).
     *
     * @param to: The end index of the range to remove (exclusive).
     */
    deleteCellRange(from, to) {
        this.transact(() => {
            this.ycells.delete(from, to - from);
        });
    }
    /**
     * Returns the metadata associated with the notebook.
     *
     * @returns Notebook's metadata.
     */
    getMetadata() {
        const meta = this.ymeta.get('metadata');
        return meta ? deepCopy(meta) : {};
    }
    /**
     * Sets the metadata associated with the notebook.
     *
     * @param metadata: Notebook's metadata.
     */
    setMetadata(value) {
        this.ymeta.set('metadata', deepCopy(value));
    }
    /**
     * Updates the metadata associated with the notebook.
     *
     * @param value: Metadata's attribute to update.
     */
    updateMetadata(value) {
        // TODO: Maybe modify only attributes instead of replacing the whole metadata?
        this.ymeta.set('metadata', Object.assign({}, this.getMetadata(), value));
    }
    /**
     * Create a new YNotebook.
     */
    static create(disableDocumentWideUndoRedo) {
        return new YNotebook({ disableDocumentWideUndoRedo });
    }
    /**
     * Wether the the undo/redo logic should be
     * considered on the full document across all cells.
     *
     * @return The disableDocumentWideUndoRedo setting.
     */
    get disableDocumentWideUndoRedo() {
        return this._disableDocumentWideUndoRedo;
    }
}
/**
 * Create a new shared cell given the type.
 */
const createCellFromType = (type) => {
    switch (type.get('cell_type')) {
        case 'code':
            return new YCodeCell(type);
        case 'markdown':
            return new YMarkdownCell(type);
        case 'raw':
            return new YRawCell(type);
        default:
            throw new Error('Found unknown cell type');
    }
};
/**
 * Create a new standalone cell given the type.
 */
const createStandaloneCell = (cellType, id) => {
    switch (cellType) {
        case 'markdown':
            return YMarkdownCell.createStandalone(id);
        case 'code':
            return YCodeCell.createStandalone(id);
        default:
            // raw
            return YRawCell.createStandalone(id);
    }
};
class YBaseCell {
    constructor(ymodel) {
        /**
         * The notebook that this cell belongs to.
         */
        this._notebook = null;
        /**
         * Whether the cell is standalone or not.
         *
         * If the cell is standalone. It cannot be
         * inserted into a YNotebook because the Yjs model is already
         * attached to an anonymous Y.Doc instance.
         */
        this.isStandalone = false;
        /**
         * Handle a change to the ymodel.
         */
        this._modelObserver = (events) => {
            const changes = {};
            const sourceEvent = events.find(event => event.target === this.ymodel.get('source'));
            if (sourceEvent) {
                changes.sourceChange = sourceEvent.changes.delta;
            }
            const outputEvent = events.find(event => event.target === this.ymodel.get('outputs'));
            if (outputEvent) {
                changes.outputsChange = outputEvent.changes.delta;
            }
            const modelEvent = events.find(event => event.target === this.ymodel);
            if (modelEvent && modelEvent.keysChanged.has('metadata')) {
                const change = modelEvent.changes.keys.get('metadata');
                changes.metadataChange = {
                    oldValue: (change === null || change === void 0 ? void 0 : change.oldValue) ? change.oldValue : undefined,
                    newValue: this.getMetadata()
                };
            }
            if (modelEvent && modelEvent.keysChanged.has('execution_count')) {
                const change = modelEvent.changes.keys.get('execution_count');
                changes.executionCountChange = {
                    oldValue: change.oldValue,
                    newValue: this.ymodel.get('execution_count')
                };
            }
            // The model allows us to replace the complete source with a new string. We express this in the Delta format
            // as a replace of the complete string.
            const ysource = this.ymodel.get('source');
            if (modelEvent && modelEvent.keysChanged.has('source')) {
                changes.sourceChange = [
                    { delete: this._prevSourceLength },
                    { insert: ysource.toString() }
                ];
            }
            this._prevSourceLength = ysource.length;
            this._changed.emit(changes);
        };
        this.isDisposed = false;
        this._undoManager = null;
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
        this.ymodel = ymodel;
        const ysource = ymodel.get('source');
        this._prevSourceLength = ysource ? ysource.length : 0;
        this.ymodel.observeDeep(this._modelObserver);
        this._awareness = null;
    }
    get ysource() {
        return this.ymodel.get('source');
    }
    get awareness() {
        var _a, _b, _c;
        return (_c = (_a = this._awareness) !== null && _a !== void 0 ? _a : (_b = this.notebook) === null || _b === void 0 ? void 0 : _b.awareness) !== null && _c !== void 0 ? _c : null;
    }
    /**
     * Perform a transaction. While the function f is called, all changes to the shared
     * document are bundled into a single event.
     */
    transact(f, undoable = true) {
        this.notebook && undoable
            ? this.notebook.transact(f)
            : this.ymodel.doc.transact(f, this);
    }
    /**
     * The notebook that this cell belongs to.
     */
    get undoManager() {
        var _a;
        if (!this.notebook) {
            return this._undoManager;
        }
        return ((_a = this.notebook) === null || _a === void 0 ? void 0 : _a.disableDocumentWideUndoRedo) ? this._undoManager
            : this.notebook.undoManager;
    }
    /**
     * Set the undoManager when adding new cells.
     */
    set undoManager(undoManager) {
        this._undoManager = undoManager;
    }
    /**
     * Undo an operation.
     */
    undo() {
        var _a;
        (_a = this.undoManager) === null || _a === void 0 ? void 0 : _a.undo();
    }
    /**
     * Redo an operation.
     */
    redo() {
        var _a;
        (_a = this.undoManager) === null || _a === void 0 ? void 0 : _a.redo();
    }
    /**
     * Whether the object can undo changes.
     */
    canUndo() {
        return !!this.undoManager && this.undoManager.undoStack.length > 0;
    }
    /**
     * Whether the object can redo changes.
     */
    canRedo() {
        return !!this.undoManager && this.undoManager.redoStack.length > 0;
    }
    /**
     * Clear the change stack.
     */
    clearUndoHistory() {
        var _a;
        (_a = this.undoManager) === null || _a === void 0 ? void 0 : _a.clear();
    }
    /**
     * The notebook that this cell belongs to.
     */
    get notebook() {
        return this._notebook;
    }
    /**
     * Create a new YRawCell that can be inserted into a YNotebook
     */
    static create(id = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.UUID.uuid4()) {
        const ymodel = new yjs__WEBPACK_IMPORTED_MODULE_3__.Map();
        const ysource = new yjs__WEBPACK_IMPORTED_MODULE_3__.Text();
        ymodel.set('source', ysource);
        ymodel.set('metadata', {});
        ymodel.set('cell_type', this.prototype.cell_type);
        ymodel.set('id', id);
        return new this(ymodel);
    }
    /**
     * Create a new YRawCell that works standalone. It cannot be
     * inserted into a YNotebook because the Yjs model is already
     * attached to an anonymous Y.Doc instance.
     */
    static createStandalone(id) {
        const cell = this.create(id);
        cell.isStandalone = true;
        const doc = new yjs__WEBPACK_IMPORTED_MODULE_3__.Doc();
        doc.getArray().insert(0, [cell.ymodel]);
        cell._awareness = new y_protocols_awareness__WEBPACK_IMPORTED_MODULE_2__.Awareness(doc);
        cell._undoManager = new yjs__WEBPACK_IMPORTED_MODULE_3__.UndoManager([cell.ymodel], {
            trackedOrigins: new Set([cell])
        });
        return cell;
    }
    /**
     * Clone the cell.
     *
     * @todo clone should only be available in the specific implementations i.e. ISharedCodeCell
     */
    clone() {
        const ymodel = new yjs__WEBPACK_IMPORTED_MODULE_3__.Map();
        const ysource = new yjs__WEBPACK_IMPORTED_MODULE_3__.Text(this.getSource());
        ymodel.set('source', ysource);
        ymodel.set('metadata', this.getMetadata());
        ymodel.set('cell_type', this.cell_type);
        ymodel.set('id', this.getId());
        const Self = this.constructor;
        const clone = new Self(ymodel);
        // TODO The assignment of the undoManager does not work for a clone.
        // See https://github.com/jupyterlab/jupyterlab/issues/11035
        clone._undoManager = this.undoManager;
        return clone;
    }
    /**
     * The changed signal.
     */
    get changed() {
        return this._changed;
    }
    /**
     * Dispose of the resources.
     */
    dispose() {
        this.ymodel.unobserveDeep(this._modelObserver);
    }
    /**
     * Gets the cell attachments.
     *
     * @returns The cell attachments.
     */
    getAttachments() {
        return this.ymodel.get('attachments');
    }
    /**
     * Sets the cell attachments
     *
     * @param attachments: The cell attachments.
     */
    setAttachments(attachments) {
        this.transact(() => {
            if (attachments == null) {
                this.ymodel.delete('attachments');
            }
            else {
                this.ymodel.set('attachments', attachments);
            }
        });
    }
    /**
     * Get cell id.
     *
     * @returns Cell id
     */
    getId() {
        return this.ymodel.get('id');
    }
    /**
     * Gets cell's source.
     *
     * @returns Cell's source.
     */
    getSource() {
        return this.ymodel.get('source').toString();
    }
    /**
     * Sets cell's source.
     *
     * @param value: New source.
     */
    setSource(value) {
        const ytext = this.ymodel.get('source');
        this.transact(() => {
            ytext.delete(0, ytext.length);
            ytext.insert(0, value);
        });
        // @todo Do we need proper replace semantic? This leads to issues in editor bindings because they don't switch source.
        // this.ymodel.set('source', new Y.Text(value));
    }
    /**
     * Replace content from `start' to `end` with `value`.
     *
     * @param start: The start index of the range to replace (inclusive).
     *
     * @param end: The end index of the range to replace (exclusive).
     *
     * @param value: New source (optional).
     */
    updateSource(start, end, value = '') {
        this.transact(() => {
            const ysource = this.ysource;
            // insert and then delete.
            // This ensures that the cursor position is adjusted after the replaced content.
            ysource.insert(start, value);
            ysource.delete(start + value.length, end - start);
        });
    }
    /**
     * The type of the cell.
     */
    get cell_type() {
        throw new Error('A YBaseCell must not be constructed');
    }
    /**
     * Returns the metadata associated with the notebook.
     *
     * @returns Notebook's metadata.
     */
    getMetadata() {
        return deepCopy(this.ymodel.get('metadata'));
    }
    /**
     * Sets the metadata associated with the notebook.
     *
     * @param metadata: Notebook's metadata.
     */
    setMetadata(value) {
        this.transact(() => {
            this.ymodel.set('metadata', deepCopy(value));
        });
    }
    /**
     * Serialize the model to JSON.
     */
    toJSON() {
        return {
            id: this.getId(),
            cell_type: this.cell_type,
            source: this.getSource(),
            metadata: this.getMetadata()
        };
    }
}
class YCodeCell extends YBaseCell {
    /**
     * The type of the cell.
     */
    get cell_type() {
        return 'code';
    }
    /**
     * The code cell's prompt number. Will be null if the cell has not been run.
     */
    get execution_count() {
        return this.ymodel.get('execution_count');
    }
    /**
     * The code cell's prompt number. Will be null if the cell has not been run.
     */
    set execution_count(count) {
        this.transact(() => {
            this.ymodel.set('execution_count', count);
        });
    }
    /**
     * Execution, display, or stream outputs.
     */
    getOutputs() {
        return deepCopy(this.ymodel.get('outputs').toArray());
    }
    /**
     * Replace all outputs.
     */
    setOutputs(outputs) {
        const youtputs = this.ymodel.get('outputs');
        this.transact(() => {
            youtputs.delete(0, youtputs.length);
            youtputs.insert(0, outputs);
        }, false);
    }
    /**
     * Replace content from `start' to `end` with `outputs`.
     *
     * @param start: The start index of the range to replace (inclusive).
     *
     * @param end: The end index of the range to replace (exclusive).
     *
     * @param outputs: New outputs (optional).
     */
    updateOutputs(start, end, outputs = []) {
        const youtputs = this.ymodel.get('outputs');
        const fin = end < youtputs.length ? end - start : youtputs.length - start;
        this.transact(() => {
            youtputs.delete(start, fin);
            youtputs.insert(start, outputs);
        }, false);
    }
    /**
     * Create a new YCodeCell that can be inserted into a YNotebook
     */
    static create(id) {
        const cell = super.create(id);
        cell.ymodel.set('execution_count', 0); // for some default value
        cell.ymodel.set('outputs', new yjs__WEBPACK_IMPORTED_MODULE_3__.Array());
        return cell;
    }
    /**
     * Create a new YCodeCell that works standalone. It cannot be
     * inserted into a YNotebook because the Yjs model is already
     * attached to an anonymous Y.Doc instance.
     */
    static createStandalone(id) {
        const cell = super.createStandalone(id);
        cell.ymodel.set('execution_count', null); // for some default value
        cell.ymodel.set('outputs', new yjs__WEBPACK_IMPORTED_MODULE_3__.Array());
        return cell;
    }
    /**
     * Create a new YCodeCell that can be inserted into a YNotebook
     *
     * @todo clone should only be available in the specific implementations i.e. ISharedCodeCell
     */
    clone() {
        const cell = super.clone();
        const youtputs = new yjs__WEBPACK_IMPORTED_MODULE_3__.Array();
        youtputs.insert(0, this.getOutputs());
        cell.ymodel.set('execution_count', this.execution_count); // for some default value
        cell.ymodel.set('outputs', youtputs);
        return cell;
    }
    /**
     * Serialize the model to JSON.
     */
    toJSON() {
        return {
            id: this.getId(),
            cell_type: 'code',
            source: this.getSource(),
            metadata: this.getMetadata(),
            outputs: this.getOutputs(),
            execution_count: this.execution_count
        };
    }
}
class YRawCell extends YBaseCell {
    /**
     * Create a new YRawCell that can be inserted into a YNotebook
     */
    static create(id) {
        return super.create(id);
    }
    /**
     * Create a new YRawCell that works standalone. It cannot be
     * inserted into a YNotebook because the Yjs model is already
     * attached to an anonymous Y.Doc instance.
     */
    static createStandalone(id) {
        return super.createStandalone(id);
    }
    /**
     * String identifying the type of cell.
     */
    get cell_type() {
        return 'raw';
    }
    /**
     * Serialize the model to JSON.
     */
    toJSON() {
        return {
            id: this.getId(),
            cell_type: 'raw',
            source: this.getSource(),
            metadata: this.getMetadata(),
            attachments: this.getAttachments()
        };
    }
}
class YMarkdownCell extends YBaseCell {
    /**
     * Create a new YMarkdownCell that can be inserted into a YNotebook
     */
    static create(id) {
        return super.create(id);
    }
    /**
     * Create a new YMarkdownCell that works standalone. It cannot be
     * inserted into a YNotebook because the Yjs model is already
     * attached to an anonymous Y.Doc instance.
     */
    static createStandalone(id) {
        return super.createStandalone(id);
    }
    /**
     * String identifying the type of cell.
     */
    get cell_type() {
        return 'markdown';
    }
    /**
     * Serialize the model to JSON.
     */
    toJSON() {
        return {
            id: this.getId(),
            cell_type: 'markdown',
            source: this.getSource(),
            metadata: this.getMetadata(),
            attachments: this.getAttachments()
        };
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (YNotebook);
//# sourceMappingURL=ymodels.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vbm9kZV9tb2R1bGVzL3ktcHJvdG9jb2xzL2F3YXJlbmVzcy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2hhcmVkLW1vZGVscy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1tb2RlbHMvbGliL3V0aWxzLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zaGFyZWQtbW9kZWxzL2xpYi95bW9kZWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUV5QztBQUNBO0FBQ1I7QUFDQTtBQUNXO0FBQ1Y7QUFDVjs7QUFFakI7O0FBRVA7QUFDQSxhQUFhLE9BQU87QUFDcEIsY0FBYyxPQUFPO0FBQ3JCLGNBQWMsT0FBTztBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLCtEQUErRDtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDTyx3QkFBd0IsdURBQVU7QUFDekM7QUFDQSxhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLHFDQUFxQyxJQUFJO0FBQ3pDLGtCQUFrQixrREFBZ0I7QUFDbEMscUZBQXFGLG9CQUFvQjtBQUN6RztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxP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OEJBQThCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQ0FBaUM7QUFDdEQscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHFEQUFNO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsU0FBUyxFQUFDO0FBQ3pCLG1DIiwiZmlsZSI6InBhY2thZ2VzX3NoYXJlZC1tb2RlbHNfbGliX2luZGV4X2pzLmJiNjE0OGRhZDlhZjg2NmIwMGFhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlIGF3YXJlbmVzcy1wcm90b2NvbFxuICovXG5cbmltcG9ydCAqIGFzIGVuY29kaW5nIGZyb20gJ2xpYjAvZW5jb2RpbmcnXG5pbXBvcnQgKiBhcyBkZWNvZGluZyBmcm9tICdsaWIwL2RlY29kaW5nJ1xuaW1wb3J0ICogYXMgdGltZSBmcm9tICdsaWIwL3RpbWUnXG5pbXBvcnQgKiBhcyBtYXRoIGZyb20gJ2xpYjAvbWF0aCdcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdsaWIwL29ic2VydmFibGUnXG5pbXBvcnQgKiBhcyBmIGZyb20gJ2xpYjAvZnVuY3Rpb24nXG5pbXBvcnQgKiBhcyBZIGZyb20gJ3lqcycgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG5leHBvcnQgY29uc3Qgb3V0ZGF0ZWRUaW1lb3V0ID0gMzAwMDBcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBNZXRhQ2xpZW50U3RhdGVcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBNZXRhQ2xpZW50U3RhdGUuY2xvY2tcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBNZXRhQ2xpZW50U3RhdGUubGFzdFVwZGF0ZWQgdW5peCB0aW1lc3RhbXBcbiAqL1xuXG4vKipcbiAqIFRoZSBBd2FyZW5lc3MgY2xhc3MgaW1wbGVtZW50cyBhIHNpbXBsZSBzaGFyZWQgc3RhdGUgcHJvdG9jb2wgdGhhdCBjYW4gYmUgdXNlZCBmb3Igbm9uLXBlcnNpc3RlbnQgZGF0YSBsaWtlIGF3YXJlbmVzcyBpbmZvcm1hdGlvblxuICogKGN1cnNvciwgdXNlcm5hbWUsIHN0YXR1cywgLi4pLiBFYWNoIGNsaWVudCBjYW4gdXBkYXRlIGl0cyBvd24gbG9jYWwgc3RhdGUgYW5kIGxpc3RlbiB0byBzdGF0ZSBjaGFuZ2VzIG9mXG4gKiByZW1vdGUgY2xpZW50cy4gRXZlcnkgY2xpZW50IG1heSBzZXQgYSBzdGF0ZSBvZiBhIHJlbW90ZSBwZWVyIHRvIGBudWxsYCB0byBtYXJrIHRoZSBjbGllbnQgYXMgb2ZmbGluZS5cbiAqXG4gKiBFYWNoIGNsaWVudCBpcyBpZGVudGlmaWVkIGJ5IGEgdW5pcXVlIGNsaWVudCBpZCAoc29tZXRoaW5nIHdlIGJvcnJvdyBmcm9tIGBkb2MuY2xpZW50SURgKS4gQSBjbGllbnQgY2FuIG92ZXJyaWRlXG4gKiBpdHMgb3duIHN0YXRlIGJ5IHByb3BhZ2F0aW5nIGEgbWVzc2FnZSB3aXRoIGFuIGluY3JlYXNpbmcgdGltZXN0YW1wIChgY2xvY2tgKS4gSWYgc3VjaCBhIG1lc3NhZ2UgaXMgcmVjZWl2ZWQsIGl0IGlzXG4gKiBhcHBsaWVkIGlmIHRoZSBrbm93biBzdGF0ZSBvZiB0aGF0IGNsaWVudCBpcyBvbGRlciB0aGFuIHRoZSBuZXcgc3RhdGUgKGBjbG9jayA8IG5ld0Nsb2NrYCkuIElmIGEgY2xpZW50IHRoaW5rcyB0aGF0XG4gKiBhIHJlbW90ZSBjbGllbnQgaXMgb2ZmbGluZSwgaXQgbWF5IHByb3BhZ2F0ZSBhIG1lc3NhZ2Ugd2l0aFxuICogYHsgY2xvY2s6IGN1cnJlbnRDbGllbnRDbG9jaywgc3RhdGU6IG51bGwsIGNsaWVudDogcmVtb3RlQ2xpZW50IH1gLiBJZiBzdWNoIGFcbiAqIG1lc3NhZ2UgaXMgcmVjZWl2ZWQsIGFuZCB0aGUga25vd24gY2xvY2sgb2YgdGhhdCBjbGllbnQgZXF1YWxzIHRoZSByZWNlaXZlZCBjbG9jaywgaXQgd2lsbCBvdmVycmlkZSB0aGUgc3RhdGUgd2l0aCBgbnVsbGAuXG4gKlxuICogQmVmb3JlIGEgY2xpZW50IGRpc2Nvbm5lY3RzLCBpdCBzaG91bGQgcHJvcGFnYXRlIGEgYG51bGxgIHN0YXRlIHdpdGggYW4gdXBkYXRlZCBjbG9jay5cbiAqXG4gKiBBd2FyZW5lc3Mgc3RhdGVzIG11c3QgYmUgdXBkYXRlZCBldmVyeSAzMCBzZWNvbmRzLiBPdGhlcndpc2UgdGhlIEF3YXJlbmVzcyBpbnN0YW5jZSB3aWxsIGRlbGV0ZSB0aGUgY2xpZW50IHN0YXRlLlxuICpcbiAqIEBleHRlbmRzIHtPYnNlcnZhYmxlPHN0cmluZz59XG4gKi9cbmV4cG9ydCBjbGFzcyBBd2FyZW5lc3MgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7WS5Eb2N9IGRvY1xuICAgKi9cbiAgY29uc3RydWN0b3IgKGRvYykge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmRvYyA9IGRvY1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5jbGllbnRJRCA9IGRvYy5jbGllbnRJRFxuICAgIC8qKlxuICAgICAqIE1hcHMgZnJvbSBjbGllbnQgaWQgdG8gY2xpZW50IHN0YXRlXG4gICAgICogQHR5cGUge01hcDxudW1iZXIsIE9iamVjdDxzdHJpbmcsIGFueT4+fVxuICAgICAqL1xuICAgIHRoaXMuc3RhdGVzID0gbmV3IE1hcCgpXG4gICAgLyoqXG4gICAgICogQHR5cGUge01hcDxudW1iZXIsIE1ldGFDbGllbnRTdGF0ZT59XG4gICAgICovXG4gICAgdGhpcy5tZXRhID0gbmV3IE1hcCgpXG4gICAgdGhpcy5fY2hlY2tJbnRlcnZhbCA9IC8qKiBAdHlwZSB7YW55fSAqLyAoc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgY29uc3Qgbm93ID0gdGltZS5nZXRVbml4VGltZSgpXG4gICAgICBpZiAodGhpcy5nZXRMb2NhbFN0YXRlKCkgIT09IG51bGwgJiYgKG91dGRhdGVkVGltZW91dCAvIDIgPD0gbm93IC0gLyoqIEB0eXBlIHt7bGFzdFVwZGF0ZWQ6bnVtYmVyfX0gKi8gKHRoaXMubWV0YS5nZXQodGhpcy5jbGllbnRJRCkpLmxhc3RVcGRhdGVkKSkge1xuICAgICAgICAvLyByZW5ldyBsb2NhbCBjbG9ja1xuICAgICAgICB0aGlzLnNldExvY2FsU3RhdGUodGhpcy5nZXRMb2NhbFN0YXRlKCkpXG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIEB0eXBlIHtBcnJheTxudW1iZXI+fVxuICAgICAgICovXG4gICAgICBjb25zdCByZW1vdmUgPSBbXVxuICAgICAgdGhpcy5tZXRhLmZvckVhY2goKG1ldGEsIGNsaWVudGlkKSA9PiB7XG4gICAgICAgIGlmIChjbGllbnRpZCAhPT0gdGhpcy5jbGllbnRJRCAmJiBvdXRkYXRlZFRpbWVvdXQgPD0gbm93IC0gbWV0YS5sYXN0VXBkYXRlZCAmJiB0aGlzLnN0YXRlcy5oYXMoY2xpZW50aWQpKSB7XG4gICAgICAgICAgcmVtb3ZlLnB1c2goY2xpZW50aWQpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBpZiAocmVtb3ZlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmVtb3ZlQXdhcmVuZXNzU3RhdGVzKHRoaXMsIHJlbW92ZSwgJ3RpbWVvdXQnKVxuICAgICAgfVxuICAgIH0sIG1hdGguZmxvb3Iob3V0ZGF0ZWRUaW1lb3V0IC8gMTApKSlcbiAgICBkb2Mub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICB0aGlzLmRlc3Ryb3koKVxuICAgIH0pXG4gICAgdGhpcy5zZXRMb2NhbFN0YXRlKHt9KVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5lbWl0KCdkZXN0cm95JywgW3RoaXNdKVxuICAgIHRoaXMuc2V0TG9jYWxTdGF0ZShudWxsKVxuICAgIHN1cGVyLmRlc3Ryb3koKVxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fY2hlY2tJbnRlcnZhbClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtPYmplY3Q8c3RyaW5nLGFueT58bnVsbH1cbiAgICovXG4gIGdldExvY2FsU3RhdGUgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlcy5nZXQodGhpcy5jbGllbnRJRCkgfHwgbnVsbFxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZyxhbnk+fG51bGx9IHN0YXRlXG4gICAqL1xuICBzZXRMb2NhbFN0YXRlIChzdGF0ZSkge1xuICAgIGNvbnN0IGNsaWVudElEID0gdGhpcy5jbGllbnRJRFxuICAgIGNvbnN0IGN1cnJMb2NhbE1ldGEgPSB0aGlzLm1ldGEuZ2V0KGNsaWVudElEKVxuICAgIGNvbnN0IGNsb2NrID0gY3VyckxvY2FsTWV0YSA9PT0gdW5kZWZpbmVkID8gMCA6IGN1cnJMb2NhbE1ldGEuY2xvY2sgKyAxXG4gICAgY29uc3QgcHJldlN0YXRlID0gdGhpcy5zdGF0ZXMuZ2V0KGNsaWVudElEKVxuICAgIGlmIChzdGF0ZSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zdGF0ZXMuZGVsZXRlKGNsaWVudElEKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlcy5zZXQoY2xpZW50SUQsIHN0YXRlKVxuICAgIH1cbiAgICB0aGlzLm1ldGEuc2V0KGNsaWVudElELCB7XG4gICAgICBjbG9jayxcbiAgICAgIGxhc3RVcGRhdGVkOiB0aW1lLmdldFVuaXhUaW1lKClcbiAgICB9KVxuICAgIGNvbnN0IGFkZGVkID0gW11cbiAgICBjb25zdCB1cGRhdGVkID0gW11cbiAgICBjb25zdCBmaWx0ZXJlZFVwZGF0ZWQgPSBbXVxuICAgIGNvbnN0IHJlbW92ZWQgPSBbXVxuICAgIGlmIChzdGF0ZSA9PT0gbnVsbCkge1xuICAgICAgcmVtb3ZlZC5wdXNoKGNsaWVudElEKVxuICAgIH0gZWxzZSBpZiAocHJldlN0YXRlID09IG51bGwpIHtcbiAgICAgIGlmIChzdGF0ZSAhPSBudWxsKSB7XG4gICAgICAgIGFkZGVkLnB1c2goY2xpZW50SUQpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZWQucHVzaChjbGllbnRJRClcbiAgICAgIGlmICghZi5lcXVhbGl0eURlZXAocHJldlN0YXRlLCBzdGF0ZSkpIHtcbiAgICAgICAgZmlsdGVyZWRVcGRhdGVkLnB1c2goY2xpZW50SUQpXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChhZGRlZC5sZW5ndGggPiAwIHx8IGZpbHRlcmVkVXBkYXRlZC5sZW5ndGggPiAwIHx8IHJlbW92ZWQubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCBbeyBhZGRlZCwgdXBkYXRlZDogZmlsdGVyZWRVcGRhdGVkLCByZW1vdmVkIH0sICdsb2NhbCddKVxuICAgIH1cbiAgICB0aGlzLmVtaXQoJ3VwZGF0ZScsIFt7IGFkZGVkLCB1cGRhdGVkLCByZW1vdmVkIH0sICdsb2NhbCddKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZFxuICAgKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAgICovXG4gIHNldExvY2FsU3RhdGVGaWVsZCAoZmllbGQsIHZhbHVlKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldExvY2FsU3RhdGUoKVxuICAgIGlmIChzdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRMb2NhbFN0YXRlKHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIFtmaWVsZF06IHZhbHVlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtNYXA8bnVtYmVyLE9iamVjdDxzdHJpbmcsYW55Pj59XG4gICAqL1xuICBnZXRTdGF0ZXMgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlc1xuICB9XG59XG5cbi8qKlxuICogTWFyayAocmVtb3RlKSBjbGllbnRzIGFzIGluYWN0aXZlIGFuZCByZW1vdmUgdGhlbSBmcm9tIHRoZSBsaXN0IG9mIGFjdGl2ZSBwZWVycy5cbiAqIFRoaXMgY2hhbmdlIHdpbGwgYmUgcHJvcGFnYXRlZCB0byByZW1vdGUgY2xpZW50cy5cbiAqXG4gKiBAcGFyYW0ge0F3YXJlbmVzc30gYXdhcmVuZXNzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGNsaWVudHNcbiAqIEBwYXJhbSB7YW55fSBvcmlnaW5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUF3YXJlbmVzc1N0YXRlcyA9IChhd2FyZW5lc3MsIGNsaWVudHMsIG9yaWdpbikgPT4ge1xuICBjb25zdCByZW1vdmVkID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGllbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2xpZW50SUQgPSBjbGllbnRzW2ldXG4gICAgaWYgKGF3YXJlbmVzcy5zdGF0ZXMuaGFzKGNsaWVudElEKSkge1xuICAgICAgYXdhcmVuZXNzLnN0YXRlcy5kZWxldGUoY2xpZW50SUQpXG4gICAgICBpZiAoY2xpZW50SUQgPT09IGF3YXJlbmVzcy5jbGllbnRJRCkge1xuICAgICAgICBjb25zdCBjdXJNZXRhID0gLyoqIEB0eXBlIHtNZXRhQ2xpZW50U3RhdGV9ICovIChhd2FyZW5lc3MubWV0YS5nZXQoY2xpZW50SUQpKVxuICAgICAgICBhd2FyZW5lc3MubWV0YS5zZXQoY2xpZW50SUQsIHtcbiAgICAgICAgICBjbG9jazogY3VyTWV0YS5jbG9jayArIDEsXG4gICAgICAgICAgbGFzdFVwZGF0ZWQ6IHRpbWUuZ2V0VW5peFRpbWUoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgcmVtb3ZlZC5wdXNoKGNsaWVudElEKVxuICAgIH1cbiAgfVxuICBpZiAocmVtb3ZlZC5sZW5ndGggPiAwKSB7XG4gICAgYXdhcmVuZXNzLmVtaXQoJ2NoYW5nZScsIFt7IGFkZGVkOiBbXSwgdXBkYXRlZDogW10sIHJlbW92ZWQgfSwgb3JpZ2luXSlcbiAgICBhd2FyZW5lc3MuZW1pdCgndXBkYXRlJywgW3sgYWRkZWQ6IFtdLCB1cGRhdGVkOiBbXSwgcmVtb3ZlZCB9LCBvcmlnaW5dKVxuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtBd2FyZW5lc3N9IGF3YXJlbmVzc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBjbGllbnRzXG4gKiBAcmV0dXJuIHtVaW50OEFycmF5fVxuICovXG5leHBvcnQgY29uc3QgZW5jb2RlQXdhcmVuZXNzVXBkYXRlID0gKGF3YXJlbmVzcywgY2xpZW50cywgc3RhdGVzID0gYXdhcmVuZXNzLnN0YXRlcykgPT4ge1xuICBjb25zdCBsZW4gPSBjbGllbnRzLmxlbmd0aFxuICBjb25zdCBlbmNvZGVyID0gZW5jb2RpbmcuY3JlYXRlRW5jb2RlcigpXG4gIGVuY29kaW5nLndyaXRlVmFyVWludChlbmNvZGVyLCBsZW4pXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBjbGllbnRJRCA9IGNsaWVudHNbaV1cbiAgICBjb25zdCBzdGF0ZSA9IHN0YXRlcy5nZXQoY2xpZW50SUQpIHx8IG51bGxcbiAgICBjb25zdCBjbG9jayA9IC8qKiBAdHlwZSB7TWV0YUNsaWVudFN0YXRlfSAqLyAoYXdhcmVuZXNzLm1ldGEuZ2V0KGNsaWVudElEKSkuY2xvY2tcbiAgICBlbmNvZGluZy53cml0ZVZhclVpbnQoZW5jb2RlciwgY2xpZW50SUQpXG4gICAgZW5jb2Rpbmcud3JpdGVWYXJVaW50KGVuY29kZXIsIGNsb2NrKVxuICAgIGVuY29kaW5nLndyaXRlVmFyU3RyaW5nKGVuY29kZXIsIEpTT04uc3RyaW5naWZ5KHN0YXRlKSlcbiAgfVxuICByZXR1cm4gZW5jb2RpbmcudG9VaW50OEFycmF5KGVuY29kZXIpXG59XG5cbi8qKlxuICogTW9kaWZ5IHRoZSBjb250ZW50IG9mIGFuIGF3YXJlbmVzcyB1cGRhdGUgYmVmb3JlIHJlLWVuY29kaW5nIGl0IHRvIGFuIGF3YXJlbmVzcyB1cGRhdGUuXG4gKlxuICogVGhpcyBtaWdodCBiZSB1c2VmdWwgd2hlbiB5b3UgaGF2ZSBhIGNlbnRyYWwgc2VydmVyIHRoYXQgd2FudHMgdG8gZW5zdXJlIHRoYXQgY2xpZW50c1xuICogY2FudCBoaWphY2sgc29tZWJvZHkgZWxzZXMgaWRlbnRpdHkuXG4gKlxuICogQHBhcmFtIHtVaW50OEFycmF5fSB1cGRhdGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oYW55KTphbnl9IG1vZGlmeVxuICogQHJldHVybiB7VWludDhBcnJheX1cbiAqL1xuZXhwb3J0IGNvbnN0IG1vZGlmeUF3YXJlbmVzc1VwZGF0ZSA9ICh1cGRhdGUsIG1vZGlmeSkgPT4ge1xuICBjb25zdCBkZWNvZGVyID0gZGVjb2RpbmcuY3JlYXRlRGVjb2Rlcih1cGRhdGUpXG4gIGNvbnN0IGVuY29kZXIgPSBlbmNvZGluZy5jcmVhdGVFbmNvZGVyKClcbiAgY29uc3QgbGVuID0gZGVjb2RpbmcucmVhZFZhclVpbnQoZGVjb2RlcilcbiAgZW5jb2Rpbmcud3JpdGVWYXJVaW50KGVuY29kZXIsIGxlbilcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IGNsaWVudElEID0gZGVjb2RpbmcucmVhZFZhclVpbnQoZGVjb2RlcilcbiAgICBjb25zdCBjbG9jayA9IGRlY29kaW5nLnJlYWRWYXJVaW50KGRlY29kZXIpXG4gICAgY29uc3Qgc3RhdGUgPSBKU09OLnBhcnNlKGRlY29kaW5nLnJlYWRWYXJTdHJpbmcoZGVjb2RlcikpXG4gICAgY29uc3QgbW9kaWZpZWRTdGF0ZSA9IG1vZGlmeShzdGF0ZSlcbiAgICBlbmNvZGluZy53cml0ZVZhclVpbnQoZW5jb2RlciwgY2xpZW50SUQpXG4gICAgZW5jb2Rpbmcud3JpdGVWYXJVaW50KGVuY29kZXIsIGNsb2NrKVxuICAgIGVuY29kaW5nLndyaXRlVmFyU3RyaW5nKGVuY29kZXIsIEpTT04uc3RyaW5naWZ5KG1vZGlmaWVkU3RhdGUpKVxuICB9XG4gIHJldHVybiBlbmNvZGluZy50b1VpbnQ4QXJyYXkoZW5jb2Rlcilcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0F3YXJlbmVzc30gYXdhcmVuZXNzXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IHVwZGF0ZVxuICogQHBhcmFtIHthbnl9IG9yaWdpbiBUaGlzIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGVtaXR0ZWQgY2hhbmdlIGV2ZW50XG4gKi9cbmV4cG9ydCBjb25zdCBhcHBseUF3YXJlbmVzc1VwZGF0ZSA9IChhd2FyZW5lc3MsIHVwZGF0ZSwgb3JpZ2luKSA9PiB7XG4gIGNvbnN0IGRlY29kZXIgPSBkZWNvZGluZy5jcmVhdGVEZWNvZGVyKHVwZGF0ZSlcbiAgY29uc3QgdGltZXN0YW1wID0gdGltZS5nZXRVbml4VGltZSgpXG4gIGNvbnN0IGFkZGVkID0gW11cbiAgY29uc3QgdXBkYXRlZCA9IFtdXG4gIGNvbnN0IGZpbHRlcmVkVXBkYXRlZCA9IFtdXG4gIGNvbnN0IHJlbW92ZWQgPSBbXVxuICBjb25zdCBsZW4gPSBkZWNvZGluZy5yZWFkVmFyVWludChkZWNvZGVyKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgY2xpZW50SUQgPSBkZWNvZGluZy5yZWFkVmFyVWludChkZWNvZGVyKVxuICAgIGxldCBjbG9jayA9IGRlY29kaW5nLnJlYWRWYXJVaW50KGRlY29kZXIpXG4gICAgY29uc3Qgc3RhdGUgPSBKU09OLnBhcnNlKGRlY29kaW5nLnJlYWRWYXJTdHJpbmcoZGVjb2RlcikpXG4gICAgY29uc3QgY2xpZW50TWV0YSA9IGF3YXJlbmVzcy5tZXRhLmdldChjbGllbnRJRClcbiAgICBjb25zdCBwcmV2U3RhdGUgPSBhd2FyZW5lc3Muc3RhdGVzLmdldChjbGllbnRJRClcbiAgICBjb25zdCBjdXJyQ2xvY2sgPSBjbGllbnRNZXRhID09PSB1bmRlZmluZWQgPyAwIDogY2xpZW50TWV0YS5jbG9ja1xuICAgIGlmIChjdXJyQ2xvY2sgPCBjbG9jayB8fCAoY3VyckNsb2NrID09PSBjbG9jayAmJiBzdGF0ZSA9PT0gbnVsbCAmJiBhd2FyZW5lc3Muc3RhdGVzLmhhcyhjbGllbnRJRCkpKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IG51bGwpIHtcbiAgICAgICAgLy8gbmV2ZXIgbGV0IGEgcmVtb3RlIGNsaWVudCByZW1vdmUgdGhpcyBsb2NhbCBzdGF0ZVxuICAgICAgICBpZiAoY2xpZW50SUQgPT09IGF3YXJlbmVzcy5jbGllbnRJRCAmJiBhd2FyZW5lc3MuZ2V0TG9jYWxTdGF0ZSgpICE9IG51bGwpIHtcbiAgICAgICAgICAvLyByZW1vdGUgY2xpZW50IHJlbW92ZWQgdGhlIGxvY2FsIHN0YXRlLiBEbyBub3QgcmVtb3RlIHN0YXRlLiBCcm9hZGNhc3QgYSBtZXNzYWdlIGluZGljYXRpbmdcbiAgICAgICAgICAvLyB0aGF0IHRoaXMgY2xpZW50IHN0aWxsIGV4aXN0cyBieSBpbmNyZWFzaW5nIHRoZSBjbG9ja1xuICAgICAgICAgIGNsb2NrKytcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhd2FyZW5lc3Muc3RhdGVzLmRlbGV0ZShjbGllbnRJRClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhcmVuZXNzLnN0YXRlcy5zZXQoY2xpZW50SUQsIHN0YXRlKVxuICAgICAgfVxuICAgICAgYXdhcmVuZXNzLm1ldGEuc2V0KGNsaWVudElELCB7XG4gICAgICAgIGNsb2NrLFxuICAgICAgICBsYXN0VXBkYXRlZDogdGltZXN0YW1wXG4gICAgICB9KVxuICAgICAgaWYgKGNsaWVudE1ldGEgPT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICBhZGRlZC5wdXNoKGNsaWVudElEKVxuICAgICAgfSBlbHNlIGlmIChjbGllbnRNZXRhICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgPT09IG51bGwpIHtcbiAgICAgICAgcmVtb3ZlZC5wdXNoKGNsaWVudElEKVxuICAgICAgfSBlbHNlIGlmIChzdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoIWYuZXF1YWxpdHlEZWVwKHN0YXRlLCBwcmV2U3RhdGUpKSB7XG4gICAgICAgICAgZmlsdGVyZWRVcGRhdGVkLnB1c2goY2xpZW50SUQpXG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlZC5wdXNoKGNsaWVudElEKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoYWRkZWQubGVuZ3RoID4gMCB8fCBmaWx0ZXJlZFVwZGF0ZWQubGVuZ3RoID4gMCB8fCByZW1vdmVkLmxlbmd0aCA+IDApIHtcbiAgICBhd2FyZW5lc3MuZW1pdCgnY2hhbmdlJywgW3tcbiAgICAgIGFkZGVkLCB1cGRhdGVkOiBmaWx0ZXJlZFVwZGF0ZWQsIHJlbW92ZWRcbiAgICB9LCBvcmlnaW5dKVxuICB9XG4gIGlmIChhZGRlZC5sZW5ndGggPiAwIHx8IHVwZGF0ZWQubGVuZ3RoID4gMCB8fCByZW1vdmVkLmxlbmd0aCA+IDApIHtcbiAgICBhd2FyZW5lc3MuZW1pdCgndXBkYXRlJywgW3tcbiAgICAgIGFkZGVkLCB1cGRhdGVkLCByZW1vdmVkXG4gICAgfSwgb3JpZ2luXSlcbiAgfVxufVxuIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBzaGFyZWQtbW9kZWxzXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYXBpJztcbmV4cG9ydCAqIGZyb20gJy4veW1vZGVscyc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxufCBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRZTWFwRXZlbnRUb01hcENoYW5nZShldmVudCkge1xuICAgIGxldCBjaGFuZ2VzID0gbmV3IE1hcCgpO1xuICAgIGV2ZW50LmNoYW5nZXMua2V5cy5mb3JFYWNoKChldmVudCwga2V5KSA9PiB7XG4gICAgICAgIGNoYW5nZXMuc2V0KGtleSwge1xuICAgICAgICAgICAgYWN0aW9uOiBldmVudC5hY3Rpb24sXG4gICAgICAgICAgICBvbGRWYWx1ZTogZXZlbnQub2xkVmFsdWUsXG4gICAgICAgICAgICBuZXdWYWx1ZTogdGhpcy55bWV0YS5nZXQoa2V5KVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gY2hhbmdlcztcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG11dHVhbCBleGNsdWRlIGZ1bmN0aW9uIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0eTpcbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbXV0ZXggPSBjcmVhdGVNdXRleCgpXG4gKiBtdXRleCgoKSA9PiB7XG4gKiAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgaW1tZWRpYXRlbHkgZXhlY3V0ZWRcbiAqICAgbXV0ZXgoKCkgPT4ge1xuICogICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgbm90IGV4ZWN1dGVkLCBhcyB0aGUgbXV0ZXggaXMgYWxyZWFkeSBhY3RpdmUuXG4gKiAgIH0pXG4gKiB9KVxuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVNdXRleCA9ICgpID0+IHtcbiAgICBsZXQgdG9rZW4gPSB0cnVlO1xuICAgIHJldHVybiAoZikgPT4ge1xuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgIHRva2VuID0gZmFsc2U7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbHMuanMubWFwIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuaW1wb3J0IHsgQXdhcmVuZXNzIH0gZnJvbSAneS1wcm90b2NvbHMvYXdhcmVuZXNzJztcbmltcG9ydCAqIGFzIFkgZnJvbSAneWpzJztcbmNvbnN0IGRlZXBDb3B5ID0gKG8pID0+IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobykpO1xuZXhwb3J0IGNsYXNzIFlEb2N1bWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnlkb2MgPSBuZXcgWS5Eb2MoKTtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSB0aGlzLnlkb2MuZ2V0VGV4dCgnc291cmNlJyk7XG4gICAgICAgIHRoaXMueXN0YXRlID0gdGhpcy55ZG9jLmdldE1hcCgnc3RhdGUnKTtcbiAgICAgICAgdGhpcy51bmRvTWFuYWdlciA9IG5ldyBZLlVuZG9NYW5hZ2VyKFt0aGlzLnNvdXJjZV0sIHtcbiAgICAgICAgICAgIHRyYWNrZWRPcmlnaW5zOiBuZXcgU2V0KFt0aGlzXSlcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXdhcmVuZXNzID0gbmV3IEF3YXJlbmVzcyh0aGlzLnlkb2MpO1xuICAgICAgICB0aGlzLl9jaGFuZ2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICB9XG4gICAgZ2V0IGRpcnR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy55c3RhdGUuZ2V0KCdkaXJ0eScpO1xuICAgIH1cbiAgICBzZXQgZGlydHkodmFsdWUpIHtcbiAgICAgICAgdGhpcy50cmFuc2FjdCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnlzdGF0ZS5zZXQoJ2RpcnR5JywgdmFsdWUpO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSB0cmFuc2FjdGlvbi4gV2hpbGUgdGhlIGZ1bmN0aW9uIGYgaXMgY2FsbGVkLCBhbGwgY2hhbmdlcyB0byB0aGUgc2hhcmVkXG4gICAgICogZG9jdW1lbnQgYXJlIGJ1bmRsZWQgaW50byBhIHNpbmdsZSBldmVudC5cbiAgICAgKi9cbiAgICB0cmFuc2FjdChmLCB1bmRvYWJsZSA9IHRydWUpIHtcbiAgICAgICAgdGhpcy55ZG9jLnRyYW5zYWN0KGYsIHVuZG9hYmxlID8gdGhpcyA6IG51bGwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy55ZG9jLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgb2JqZWN0IGNhbiB1bmRvIGNoYW5nZXMuXG4gICAgICovXG4gICAgY2FuVW5kbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5kb01hbmFnZXIudW5kb1N0YWNrLmxlbmd0aCA+IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIG9iamVjdCBjYW4gcmVkbyBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGNhblJlZG8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVuZG9NYW5hZ2VyLnJlZG9TdGFjay5sZW5ndGggPiAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVbmRvIGFuIG9wZXJhdGlvbi5cbiAgICAgKi9cbiAgICB1bmRvKCkge1xuICAgICAgICB0aGlzLnVuZG9NYW5hZ2VyLnVuZG8oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVkbyBhbiBvcGVyYXRpb24uXG4gICAgICovXG4gICAgcmVkbygpIHtcbiAgICAgICAgdGhpcy51bmRvTWFuYWdlci5yZWRvKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFyIHRoZSBjaGFuZ2Ugc3RhY2suXG4gICAgICovXG4gICAgY2xlYXJVbmRvSGlzdG9yeSgpIHtcbiAgICAgICAgdGhpcy51bmRvTWFuYWdlci5jbGVhcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY2hhbmdlZCBzaWduYWwuXG4gICAgICovXG4gICAgZ2V0IGNoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFuZ2VkO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBZRmlsZSBleHRlbmRzIFlEb2N1bWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIHltb2RlbC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX21vZGVsT2JzZXJ2ZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZXMgPSB7fTtcbiAgICAgICAgICAgIGNoYW5nZXMuc291cmNlQ2hhbmdlID0gZXZlbnQuY2hhbmdlcy5kZWx0YTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdChjaGFuZ2VzKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUgeXN0YXRlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fb25TdGF0ZUNoYW5nZWQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlQ2hhbmdlID0gW107XG4gICAgICAgICAgICBldmVudC5rZXlzQ2hhbmdlZC5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hhbmdlID0gZXZlbnQuY2hhbmdlcy5rZXlzLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVDaGFuZ2UucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZTogY2hhbmdlLm9sZFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWU6IHRoaXMueXN0YXRlLmdldChrZXkpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlZC5lbWl0KHsgc3RhdGVDaGFuZ2UgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMueXNvdXJjZSA9IHRoaXMueWRvYy5nZXRUZXh0KCdzb3VyY2UnKTtcbiAgICAgICAgdGhpcy55c291cmNlLm9ic2VydmUodGhpcy5fbW9kZWxPYnNlcnZlcik7XG4gICAgICAgIHRoaXMueXN0YXRlLm9ic2VydmUodGhpcy5fb25TdGF0ZUNoYW5nZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy55c291cmNlLnVub2JzZXJ2ZSh0aGlzLl9tb2RlbE9ic2VydmVyKTtcbiAgICAgICAgdGhpcy55c3RhdGUudW5vYnNlcnZlKHRoaXMuX29uU3RhdGVDaGFuZ2VkKTtcbiAgICB9XG4gICAgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBZRmlsZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIGNlbGwncyBzb3VyY2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBDZWxsJ3Mgc291cmNlLlxuICAgICAqL1xuICAgIGdldFNvdXJjZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueXNvdXJjZS50b1N0cmluZygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIGNlbGwncyBzb3VyY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWU6IE5ldyBzb3VyY2UuXG4gICAgICovXG4gICAgc2V0U291cmNlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudHJhbnNhY3QoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeXRleHQgPSB0aGlzLnlzb3VyY2U7XG4gICAgICAgICAgICB5dGV4dC5kZWxldGUoMCwgeXRleHQubGVuZ3RoKTtcbiAgICAgICAgICAgIHl0ZXh0Lmluc2VydCgwLCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlIGNvbnRlbnQgZnJvbSBgc3RhcnQnIHRvIGBlbmRgIHdpdGggYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzdGFydDogVGhlIHN0YXJ0IGluZGV4IG9mIHRoZSByYW5nZSB0byByZXBsYWNlIChpbmNsdXNpdmUpLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVuZDogVGhlIGVuZCBpbmRleCBvZiB0aGUgcmFuZ2UgdG8gcmVwbGFjZSAoZXhjbHVzaXZlKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZTogTmV3IHNvdXJjZSAob3B0aW9uYWwpLlxuICAgICAqL1xuICAgIHVwZGF0ZVNvdXJjZShzdGFydCwgZW5kLCB2YWx1ZSA9ICcnKSB7XG4gICAgICAgIHRoaXMudHJhbnNhY3QoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeXNvdXJjZSA9IHRoaXMueXNvdXJjZTtcbiAgICAgICAgICAgIC8vIGluc2VydCBhbmQgdGhlbiBkZWxldGUuXG4gICAgICAgICAgICAvLyBUaGlzIGVuc3VyZXMgdGhhdCB0aGUgY3Vyc29yIHBvc2l0aW9uIGlzIGFkanVzdGVkIGFmdGVyIHRoZSByZXBsYWNlZCBjb250ZW50LlxuICAgICAgICAgICAgeXNvdXJjZS5pbnNlcnQoc3RhcnQsIHZhbHVlKTtcbiAgICAgICAgICAgIHlzb3VyY2UuZGVsZXRlKHN0YXJ0ICsgdmFsdWUubGVuZ3RoLCBlbmQgLSBzdGFydCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogU2hhcmVkIGltcGxlbWVudGF0aW9uIG9mIHRoZSBTaGFyZWQgRG9jdW1lbnQgdHlwZXMuXG4gKlxuICogU2hhcmVkIGNlbGxzIGNhbiBiZSBpbnNlcnRlZCBpbnRvIGEgU2hhcmVkTm90ZWJvb2suXG4gKiBTaGFyZWQgY2VsbHMgb25seSBzdGFydCBlbWl0dGluZyBldmVudHMgd2hlbiB0aGV5IGFyZSBjb25uZWN0ZWQgdG8gYSBTaGFyZWROb3RlYm9vay5cbiAqXG4gKiBcIlN0YW5kYWxvbmVcIiBjZWxscyBtdXN0IG5vdCBiZSBpbnNlcnRlZCBpbnRvIGEgKFNoYXJlZClOb3RlYm9vay5cbiAqIFN0YW5kYWxvbmUgY2VsbHMgZW1pdCBldmVudHMgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhleSBoYXZlIGJlZW4gY3JlYXRlZCwgYnV0IHRoZXkgbXVzdCBub3RcbiAqIGJlIGluY2x1ZGVkIGludG8gYSAoU2hhcmVkKU5vdGVib29rLlxuICovXG5leHBvcnQgY2xhc3MgWU5vdGVib29rIGV4dGVuZHMgWURvY3VtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIGxpc3Qgb2YgY2VsbHMuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9vbllDZWxsc0NoYW5nZWQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgdHlwZeKHlGNlbGwgbWFwcGluZyBieSBpdGVyYXRpbmcgdGhyb3VnaCB0aGUgYWRkZWQvcmVtb3ZlZCB0eXBlc1xuICAgICAgICAgICAgZXZlbnQuY2hhbmdlcy5hZGRlZC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBpdGVtLmNvbnRlbnQudHlwZTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3ljZWxsTWFwcGluZy5oYXModHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feWNlbGxNYXBwaW5nLnNldCh0eXBlLCBjcmVhdGVDZWxsRnJvbVR5cGUodHlwZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5feWNlbGxNYXBwaW5nLmdldCh0eXBlKTtcbiAgICAgICAgICAgICAgICBjZWxsLl9ub3RlYm9vayA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVEb2N1bWVudFdpZGVVbmRvUmVkbykge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLl91bmRvTWFuYWdlciA9IHRoaXMudW5kb01hbmFnZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLl91bmRvTWFuYWdlciA9IG5ldyBZLlVuZG9NYW5hZ2VyKFtjZWxsLnltb2RlbF0sIHt9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV2ZW50LmNoYW5nZXMuZGVsZXRlZC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBpdGVtLmNvbnRlbnQudHlwZTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMuX3ljZWxsTWFwcGluZy5nZXQodHlwZSk7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feWNlbGxNYXBwaW5nLmRlbGV0ZSh0eXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICAvLyB0aGlzIHJlZmxlY3RzIHRoZSBldmVudC5jaGFuZ2VzLmRlbHRhLCBidXQgcmVwbGFjZXMgdGhlIGNvbnRlbnQgb2YgZGVsdGEuaW5zZXJ0IHdpdGggeWNlbGxzXG4gICAgICAgICAgICBjb25zdCBjZWxsc0NoYW5nZSA9IFtdO1xuICAgICAgICAgICAgZXZlbnQuY2hhbmdlcy5kZWx0YS5mb3JFYWNoKChkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGQuaW5zZXJ0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5zZXJ0ZWRDZWxscyA9IGQuaW5zZXJ0Lm1hcCgoeWNlbGwpID0+IHRoaXMuX3ljZWxsTWFwcGluZy5nZXQoeWNlbGwpKTtcbiAgICAgICAgICAgICAgICAgICAgY2VsbHNDaGFuZ2UucHVzaCh7IGluc2VydDogaW5zZXJ0ZWRDZWxscyB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxscy5zcGxpY2UoaW5kZXgsIDAsIC4uLmluc2VydGVkQ2VsbHMpO1xuICAgICAgICAgICAgICAgICAgICBpbmRleCArPSBkLmluc2VydC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGQuZGVsZXRlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbHNDaGFuZ2UucHVzaChkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxscy5zcGxpY2UoaW5kZXgsIGQuZGVsZXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZC5yZXRhaW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsc0NoYW5nZS5wdXNoKGQpO1xuICAgICAgICAgICAgICAgICAgICBpbmRleCArPSBkLnJldGFpbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgY2VsbHNDaGFuZ2U6IGNlbGxzQ2hhbmdlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUgeXN0YXRlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fb25NZXRhZGF0YUNoYW5nZWQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlzQ2hhbmdlZC5oYXMoJ21ldGFkYXRhJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFuZ2UgPSBldmVudC5jaGFuZ2VzLmtleXMuZ2V0KCdtZXRhZGF0YScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1ldGFkYXRhQ2hhbmdlID0ge1xuICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZTogKGNoYW5nZSA9PT0gbnVsbCB8fCBjaGFuZ2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNoYW5nZS5vbGRWYWx1ZSkgPyBjaGFuZ2Uub2xkVmFsdWUgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiB0aGlzLmdldE1ldGFkYXRhKClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh7IG1ldGFkYXRhQ2hhbmdlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSB5c3RhdGUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9vblN0YXRlQ2hhbmdlZCA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhdGVDaGFuZ2UgPSBbXTtcbiAgICAgICAgICAgIGV2ZW50LmtleXNDaGFuZ2VkLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFuZ2UgPSBldmVudC5jaGFuZ2VzLmtleXMuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZUNoYW5nZS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBjaGFuZ2Uub2xkVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZTogdGhpcy55c3RhdGUuZ2V0KGtleSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQoeyBzdGF0ZUNoYW5nZSB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy55Y2VsbHMgPSB0aGlzLnlkb2MuZ2V0QXJyYXkoJ2NlbGxzJyk7XG4gICAgICAgIHRoaXMueW1ldGEgPSB0aGlzLnlkb2MuZ2V0TWFwKCdtZXRhJyk7XG4gICAgICAgIHRoaXMueW1vZGVsID0gdGhpcy55ZG9jLmdldE1hcCgnbW9kZWwnKTtcbiAgICAgICAgdGhpcy51bmRvTWFuYWdlciA9IG5ldyBZLlVuZG9NYW5hZ2VyKFt0aGlzLnljZWxsc10sIHtcbiAgICAgICAgICAgIHRyYWNrZWRPcmlnaW5zOiBuZXcgU2V0KFt0aGlzXSlcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3ljZWxsTWFwcGluZyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fZGlzYWJsZURvY3VtZW50V2lkZVVuZG9SZWRvID0gb3B0aW9ucy5kaXNhYmxlRG9jdW1lbnRXaWRlVW5kb1JlZG87XG4gICAgICAgIHRoaXMueWNlbGxzLm9ic2VydmUodGhpcy5fb25ZQ2VsbHNDaGFuZ2VkKTtcbiAgICAgICAgdGhpcy5jZWxscyA9IHRoaXMueWNlbGxzLnRvQXJyYXkoKS5tYXAoeWNlbGwgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl95Y2VsbE1hcHBpbmcuaGFzKHljZWxsKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ljZWxsTWFwcGluZy5zZXQoeWNlbGwsIGNyZWF0ZUNlbGxGcm9tVHlwZSh5Y2VsbCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ljZWxsTWFwcGluZy5nZXQoeWNlbGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy55bWV0YS5vYnNlcnZlKHRoaXMuX29uTWV0YWRhdGFDaGFuZ2VkKTtcbiAgICAgICAgdGhpcy55c3RhdGUub2JzZXJ2ZSh0aGlzLl9vblN0YXRlQ2hhbmdlZCk7XG4gICAgfVxuICAgIGdldCBuYmZvcm1hdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueXN0YXRlLmdldCgnbmJmb3JtYXQnKTtcbiAgICB9XG4gICAgc2V0IG5iZm9ybWF0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMudHJhbnNhY3QoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy55c3RhdGUuc2V0KCduYmZvcm1hdCcsIHZhbHVlKTtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH1cbiAgICBnZXQgbmJmb3JtYXRfbWlub3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnlzdGF0ZS5nZXQoJ25iZm9ybWF0TWlub3InKTtcbiAgICB9XG4gICAgc2V0IG5iZm9ybWF0X21pbm9yKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudHJhbnNhY3QoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy55c3RhdGUuc2V0KCduYmZvcm1hdE1pbm9yJywgdmFsdWUpO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcy5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLnljZWxscy51bm9ic2VydmUodGhpcy5fb25ZQ2VsbHNDaGFuZ2VkKTtcbiAgICAgICAgdGhpcy55bWV0YS51bm9ic2VydmUodGhpcy5fb25NZXRhZGF0YUNoYW5nZWQpO1xuICAgICAgICB0aGlzLnlzdGF0ZS51bm9ic2VydmUodGhpcy5fb25TdGF0ZUNoYW5nZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYSBzaGFyZWQgY2VsbCBieSBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleDogQ2VsbCdzIHBvc2l0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIHJlcXVlc3RlZCBzaGFyZWQgY2VsbC5cbiAgICAgKi9cbiAgICBnZXRDZWxsKGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNlbGxzW2luZGV4XTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0IGEgc2hhcmVkIGNlbGwgaW50byBhIHNwZWNpZmljIHBvc2l0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4OiBDZWxsJ3MgcG9zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2VsbDogQ2VsbCB0byBpbnNlcnQuXG4gICAgICovXG4gICAgaW5zZXJ0Q2VsbChpbmRleCwgY2VsbCkge1xuICAgICAgICB0aGlzLmluc2VydENlbGxzKGluZGV4LCBbY2VsbF0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnQgYSBsaXN0IG9mIHNoYXJlZCBjZWxscyBpbnRvIGEgc3BlY2lmaWMgcG9zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXg6IFBvc2l0aW9uIHRvIGluc2VydCB0aGUgY2VsbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2VsbHM6IEFycmF5IG9mIHNoYXJlZCBjZWxscyB0byBpbnNlcnQuXG4gICAgICovXG4gICAgaW5zZXJ0Q2VsbHMoaW5kZXgsIGNlbGxzKSB7XG4gICAgICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICB0aGlzLl95Y2VsbE1hcHBpbmcuc2V0KGNlbGwueW1vZGVsLCBjZWxsKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5kaXNhYmxlRG9jdW1lbnRXaWRlVW5kb1JlZG8pIHtcbiAgICAgICAgICAgICAgICBjZWxsLnVuZG9NYW5hZ2VyID0gdGhpcy51bmRvTWFuYWdlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudHJhbnNhY3QoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy55Y2VsbHMuaW5zZXJ0KGluZGV4LCBjZWxscy5tYXAoY2VsbCA9PiBjZWxsLnltb2RlbCkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTW92ZSBhIGNlbGwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZnJvbUluZGV4OiBJbmRleCBvZiB0aGUgY2VsbCB0byBtb3ZlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRvSW5kZXg6IE5ldyBwb3NpdGlvbiBvZiB0aGUgY2VsbC5cbiAgICAgKi9cbiAgICBtb3ZlQ2VsbChmcm9tSW5kZXgsIHRvSW5kZXgpIHtcbiAgICAgICAgdGhpcy50cmFuc2FjdCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcm9tQ2VsbCA9IHRoaXMuZ2V0Q2VsbChmcm9tSW5kZXgpLmNsb25lKCk7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUNlbGwoZnJvbUluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0Q2VsbCh0b0luZGV4LCBmcm9tQ2VsbCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBjZWxsLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4OiBJbmRleCBvZiB0aGUgY2VsbCB0byByZW1vdmUuXG4gICAgICovXG4gICAgZGVsZXRlQ2VsbChpbmRleCkge1xuICAgICAgICB0aGlzLmRlbGV0ZUNlbGxSYW5nZShpbmRleCwgaW5kZXggKyAxKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgcmFuZ2Ugb2YgY2VsbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZnJvbTogVGhlIHN0YXJ0IGluZGV4IG9mIHRoZSByYW5nZSB0byByZW1vdmUgKGluY2x1c2l2ZSkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdG86IFRoZSBlbmQgaW5kZXggb2YgdGhlIHJhbmdlIHRvIHJlbW92ZSAoZXhjbHVzaXZlKS5cbiAgICAgKi9cbiAgICBkZWxldGVDZWxsUmFuZ2UoZnJvbSwgdG8pIHtcbiAgICAgICAgdGhpcy50cmFuc2FjdCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnljZWxscy5kZWxldGUoZnJvbSwgdG8gLSBmcm9tKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG1ldGFkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGUgbm90ZWJvb2suXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBOb3RlYm9vaydzIG1ldGFkYXRhLlxuICAgICAqL1xuICAgIGdldE1ldGFkYXRhKCkge1xuICAgICAgICBjb25zdCBtZXRhID0gdGhpcy55bWV0YS5nZXQoJ21ldGFkYXRhJyk7XG4gICAgICAgIHJldHVybiBtZXRhID8gZGVlcENvcHkobWV0YSkgOiB7fTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbWV0YWRhdGEgYXNzb2NpYXRlZCB3aXRoIHRoZSBub3RlYm9vay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtZXRhZGF0YTogTm90ZWJvb2sncyBtZXRhZGF0YS5cbiAgICAgKi9cbiAgICBzZXRNZXRhZGF0YSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnltZXRhLnNldCgnbWV0YWRhdGEnLCBkZWVwQ29weSh2YWx1ZSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBtZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhlIG5vdGVib29rLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlOiBNZXRhZGF0YSdzIGF0dHJpYnV0ZSB0byB1cGRhdGUuXG4gICAgICovXG4gICAgdXBkYXRlTWV0YWRhdGEodmFsdWUpIHtcbiAgICAgICAgLy8gVE9ETzogTWF5YmUgbW9kaWZ5IG9ubHkgYXR0cmlidXRlcyBpbnN0ZWFkIG9mIHJlcGxhY2luZyB0aGUgd2hvbGUgbWV0YWRhdGE/XG4gICAgICAgIHRoaXMueW1ldGEuc2V0KCdtZXRhZGF0YScsIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZ2V0TWV0YWRhdGEoKSwgdmFsdWUpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IFlOb3RlYm9vay5cbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlKGRpc2FibGVEb2N1bWVudFdpZGVVbmRvUmVkbykge1xuICAgICAgICByZXR1cm4gbmV3IFlOb3RlYm9vayh7IGRpc2FibGVEb2N1bWVudFdpZGVVbmRvUmVkbyB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2V0aGVyIHRoZSB0aGUgdW5kby9yZWRvIGxvZ2ljIHNob3VsZCBiZVxuICAgICAqIGNvbnNpZGVyZWQgb24gdGhlIGZ1bGwgZG9jdW1lbnQgYWNyb3NzIGFsbCBjZWxscy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gVGhlIGRpc2FibGVEb2N1bWVudFdpZGVVbmRvUmVkbyBzZXR0aW5nLlxuICAgICAqL1xuICAgIGdldCBkaXNhYmxlRG9jdW1lbnRXaWRlVW5kb1JlZG8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlRG9jdW1lbnRXaWRlVW5kb1JlZG87XG4gICAgfVxufVxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgc2hhcmVkIGNlbGwgZ2l2ZW4gdGhlIHR5cGUuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsRnJvbVR5cGUgPSAodHlwZSkgPT4ge1xuICAgIHN3aXRjaCAodHlwZS5nZXQoJ2NlbGxfdHlwZScpKSB7XG4gICAgICAgIGNhc2UgJ2NvZGUnOlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBZQ29kZUNlbGwodHlwZSk7XG4gICAgICAgIGNhc2UgJ21hcmtkb3duJzpcbiAgICAgICAgICAgIHJldHVybiBuZXcgWU1hcmtkb3duQ2VsbCh0eXBlKTtcbiAgICAgICAgY2FzZSAncmF3JzpcbiAgICAgICAgICAgIHJldHVybiBuZXcgWVJhd0NlbGwodHlwZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZvdW5kIHVua25vd24gY2VsbCB0eXBlJyk7XG4gICAgfVxufTtcbi8qKlxuICogQ3JlYXRlIGEgbmV3IHN0YW5kYWxvbmUgY2VsbCBnaXZlbiB0aGUgdHlwZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVN0YW5kYWxvbmVDZWxsID0gKGNlbGxUeXBlLCBpZCkgPT4ge1xuICAgIHN3aXRjaCAoY2VsbFR5cGUpIHtcbiAgICAgICAgY2FzZSAnbWFya2Rvd24nOlxuICAgICAgICAgICAgcmV0dXJuIFlNYXJrZG93bkNlbGwuY3JlYXRlU3RhbmRhbG9uZShpZCk7XG4gICAgICAgIGNhc2UgJ2NvZGUnOlxuICAgICAgICAgICAgcmV0dXJuIFlDb2RlQ2VsbC5jcmVhdGVTdGFuZGFsb25lKGlkKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vIHJhd1xuICAgICAgICAgICAgcmV0dXJuIFlSYXdDZWxsLmNyZWF0ZVN0YW5kYWxvbmUoaWQpO1xuICAgIH1cbn07XG5leHBvcnQgY2xhc3MgWUJhc2VDZWxsIHtcbiAgICBjb25zdHJ1Y3Rvcih5bW9kZWwpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBub3RlYm9vayB0aGF0IHRoaXMgY2VsbCBiZWxvbmdzIHRvLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fbm90ZWJvb2sgPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0aGUgY2VsbCBpcyBzdGFuZGFsb25lIG9yIG5vdC5cbiAgICAgICAgICpcbiAgICAgICAgICogSWYgdGhlIGNlbGwgaXMgc3RhbmRhbG9uZS4gSXQgY2Fubm90IGJlXG4gICAgICAgICAqIGluc2VydGVkIGludG8gYSBZTm90ZWJvb2sgYmVjYXVzZSB0aGUgWWpzIG1vZGVsIGlzIGFscmVhZHlcbiAgICAgICAgICogYXR0YWNoZWQgdG8gYW4gYW5vbnltb3VzIFkuRG9jIGluc3RhbmNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc1N0YW5kYWxvbmUgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUgeW1vZGVsLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fbW9kZWxPYnNlcnZlciA9IChldmVudHMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZXMgPSB7fTtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZUV2ZW50ID0gZXZlbnRzLmZpbmQoZXZlbnQgPT4gZXZlbnQudGFyZ2V0ID09PSB0aGlzLnltb2RlbC5nZXQoJ3NvdXJjZScpKTtcbiAgICAgICAgICAgIGlmIChzb3VyY2VFdmVudCkge1xuICAgICAgICAgICAgICAgIGNoYW5nZXMuc291cmNlQ2hhbmdlID0gc291cmNlRXZlbnQuY2hhbmdlcy5kZWx0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG91dHB1dEV2ZW50ID0gZXZlbnRzLmZpbmQoZXZlbnQgPT4gZXZlbnQudGFyZ2V0ID09PSB0aGlzLnltb2RlbC5nZXQoJ291dHB1dHMnKSk7XG4gICAgICAgICAgICBpZiAob3V0cHV0RXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLm91dHB1dHNDaGFuZ2UgPSBvdXRwdXRFdmVudC5jaGFuZ2VzLmRlbHRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbW9kZWxFdmVudCA9IGV2ZW50cy5maW5kKGV2ZW50ID0+IGV2ZW50LnRhcmdldCA9PT0gdGhpcy55bW9kZWwpO1xuICAgICAgICAgICAgaWYgKG1vZGVsRXZlbnQgJiYgbW9kZWxFdmVudC5rZXlzQ2hhbmdlZC5oYXMoJ21ldGFkYXRhJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFuZ2UgPSBtb2RlbEV2ZW50LmNoYW5nZXMua2V5cy5nZXQoJ21ldGFkYXRhJyk7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5tZXRhZGF0YUNoYW5nZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IChjaGFuZ2UgPT09IG51bGwgfHwgY2hhbmdlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjaGFuZ2Uub2xkVmFsdWUpID8gY2hhbmdlLm9sZFZhbHVlIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZTogdGhpcy5nZXRNZXRhZGF0YSgpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtb2RlbEV2ZW50ICYmIG1vZGVsRXZlbnQua2V5c0NoYW5nZWQuaGFzKCdleGVjdXRpb25fY291bnQnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZSA9IG1vZGVsRXZlbnQuY2hhbmdlcy5rZXlzLmdldCgnZXhlY3V0aW9uX2NvdW50Jyk7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5leGVjdXRpb25Db3VudENoYW5nZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IGNoYW5nZS5vbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWU6IHRoaXMueW1vZGVsLmdldCgnZXhlY3V0aW9uX2NvdW50JylcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhlIG1vZGVsIGFsbG93cyB1cyB0byByZXBsYWNlIHRoZSBjb21wbGV0ZSBzb3VyY2Ugd2l0aCBhIG5ldyBzdHJpbmcuIFdlIGV4cHJlc3MgdGhpcyBpbiB0aGUgRGVsdGEgZm9ybWF0XG4gICAgICAgICAgICAvLyBhcyBhIHJlcGxhY2Ugb2YgdGhlIGNvbXBsZXRlIHN0cmluZy5cbiAgICAgICAgICAgIGNvbnN0IHlzb3VyY2UgPSB0aGlzLnltb2RlbC5nZXQoJ3NvdXJjZScpO1xuICAgICAgICAgICAgaWYgKG1vZGVsRXZlbnQgJiYgbW9kZWxFdmVudC5rZXlzQ2hhbmdlZC5oYXMoJ3NvdXJjZScpKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5zb3VyY2VDaGFuZ2UgPSBbXG4gICAgICAgICAgICAgICAgICAgIHsgZGVsZXRlOiB0aGlzLl9wcmV2U291cmNlTGVuZ3RoIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgaW5zZXJ0OiB5c291cmNlLnRvU3RyaW5nKCkgfVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9wcmV2U291cmNlTGVuZ3RoID0geXNvdXJjZS5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQoY2hhbmdlcyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl91bmRvTWFuYWdlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLnltb2RlbCA9IHltb2RlbDtcbiAgICAgICAgY29uc3QgeXNvdXJjZSA9IHltb2RlbC5nZXQoJ3NvdXJjZScpO1xuICAgICAgICB0aGlzLl9wcmV2U291cmNlTGVuZ3RoID0geXNvdXJjZSA/IHlzb3VyY2UubGVuZ3RoIDogMDtcbiAgICAgICAgdGhpcy55bW9kZWwub2JzZXJ2ZURlZXAodGhpcy5fbW9kZWxPYnNlcnZlcik7XG4gICAgICAgIHRoaXMuX2F3YXJlbmVzcyA9IG51bGw7XG4gICAgfVxuICAgIGdldCB5c291cmNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy55bW9kZWwuZ2V0KCdzb3VyY2UnKTtcbiAgICB9XG4gICAgZ2V0IGF3YXJlbmVzcygpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIHJldHVybiAoX2MgPSAoX2EgPSB0aGlzLl9hd2FyZW5lc3MpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IChfYiA9IHRoaXMubm90ZWJvb2spID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hd2FyZW5lc3MpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSB0cmFuc2FjdGlvbi4gV2hpbGUgdGhlIGZ1bmN0aW9uIGYgaXMgY2FsbGVkLCBhbGwgY2hhbmdlcyB0byB0aGUgc2hhcmVkXG4gICAgICogZG9jdW1lbnQgYXJlIGJ1bmRsZWQgaW50byBhIHNpbmdsZSBldmVudC5cbiAgICAgKi9cbiAgICB0cmFuc2FjdChmLCB1bmRvYWJsZSA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5ub3RlYm9vayAmJiB1bmRvYWJsZVxuICAgICAgICAgICAgPyB0aGlzLm5vdGVib29rLnRyYW5zYWN0KGYpXG4gICAgICAgICAgICA6IHRoaXMueW1vZGVsLmRvYy50cmFuc2FjdChmLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG5vdGVib29rIHRoYXQgdGhpcyBjZWxsIGJlbG9uZ3MgdG8uXG4gICAgICovXG4gICAgZ2V0IHVuZG9NYW5hZ2VyKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICghdGhpcy5ub3RlYm9vaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VuZG9NYW5hZ2VyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoKF9hID0gdGhpcy5ub3RlYm9vaykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRpc2FibGVEb2N1bWVudFdpZGVVbmRvUmVkbykgPyB0aGlzLl91bmRvTWFuYWdlclxuICAgICAgICAgICAgOiB0aGlzLm5vdGVib29rLnVuZG9NYW5hZ2VyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHVuZG9NYW5hZ2VyIHdoZW4gYWRkaW5nIG5ldyBjZWxscy5cbiAgICAgKi9cbiAgICBzZXQgdW5kb01hbmFnZXIodW5kb01hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fdW5kb01hbmFnZXIgPSB1bmRvTWFuYWdlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVW5kbyBhbiBvcGVyYXRpb24uXG4gICAgICovXG4gICAgdW5kbygpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAoX2EgPSB0aGlzLnVuZG9NYW5hZ2VyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudW5kbygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWRvIGFuIG9wZXJhdGlvbi5cbiAgICAgKi9cbiAgICByZWRvKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIChfYSA9IHRoaXMudW5kb01hbmFnZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZWRvKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIG9iamVjdCBjYW4gdW5kbyBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGNhblVuZG8oKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMudW5kb01hbmFnZXIgJiYgdGhpcy51bmRvTWFuYWdlci51bmRvU3RhY2subGVuZ3RoID4gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgb2JqZWN0IGNhbiByZWRvIGNoYW5nZXMuXG4gICAgICovXG4gICAgY2FuUmVkbygpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy51bmRvTWFuYWdlciAmJiB0aGlzLnVuZG9NYW5hZ2VyLnJlZG9TdGFjay5sZW5ndGggPiAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhciB0aGUgY2hhbmdlIHN0YWNrLlxuICAgICAqL1xuICAgIGNsZWFyVW5kb0hpc3RvcnkoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy51bmRvTWFuYWdlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsZWFyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBub3RlYm9vayB0aGF0IHRoaXMgY2VsbCBiZWxvbmdzIHRvLlxuICAgICAqL1xuICAgIGdldCBub3RlYm9vaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vdGVib29rO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgWVJhd0NlbGwgdGhhdCBjYW4gYmUgaW5zZXJ0ZWQgaW50byBhIFlOb3RlYm9va1xuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGUoaWQgPSBVVUlELnV1aWQ0KCkpIHtcbiAgICAgICAgY29uc3QgeW1vZGVsID0gbmV3IFkuTWFwKCk7XG4gICAgICAgIGNvbnN0IHlzb3VyY2UgPSBuZXcgWS5UZXh0KCk7XG4gICAgICAgIHltb2RlbC5zZXQoJ3NvdXJjZScsIHlzb3VyY2UpO1xuICAgICAgICB5bW9kZWwuc2V0KCdtZXRhZGF0YScsIHt9KTtcbiAgICAgICAgeW1vZGVsLnNldCgnY2VsbF90eXBlJywgdGhpcy5wcm90b3R5cGUuY2VsbF90eXBlKTtcbiAgICAgICAgeW1vZGVsLnNldCgnaWQnLCBpZCk7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcyh5bW9kZWwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgWVJhd0NlbGwgdGhhdCB3b3JrcyBzdGFuZGFsb25lLiBJdCBjYW5ub3QgYmVcbiAgICAgKiBpbnNlcnRlZCBpbnRvIGEgWU5vdGVib29rIGJlY2F1c2UgdGhlIFlqcyBtb2RlbCBpcyBhbHJlYWR5XG4gICAgICogYXR0YWNoZWQgdG8gYW4gYW5vbnltb3VzIFkuRG9jIGluc3RhbmNlLlxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGVTdGFuZGFsb25lKGlkKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmNyZWF0ZShpZCk7XG4gICAgICAgIGNlbGwuaXNTdGFuZGFsb25lID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgZG9jID0gbmV3IFkuRG9jKCk7XG4gICAgICAgIGRvYy5nZXRBcnJheSgpLmluc2VydCgwLCBbY2VsbC55bW9kZWxdKTtcbiAgICAgICAgY2VsbC5fYXdhcmVuZXNzID0gbmV3IEF3YXJlbmVzcyhkb2MpO1xuICAgICAgICBjZWxsLl91bmRvTWFuYWdlciA9IG5ldyBZLlVuZG9NYW5hZ2VyKFtjZWxsLnltb2RlbF0sIHtcbiAgICAgICAgICAgIHRyYWNrZWRPcmlnaW5zOiBuZXcgU2V0KFtjZWxsXSlcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9uZSB0aGUgY2VsbC5cbiAgICAgKlxuICAgICAqIEB0b2RvIGNsb25lIHNob3VsZCBvbmx5IGJlIGF2YWlsYWJsZSBpbiB0aGUgc3BlY2lmaWMgaW1wbGVtZW50YXRpb25zIGkuZS4gSVNoYXJlZENvZGVDZWxsXG4gICAgICovXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIGNvbnN0IHltb2RlbCA9IG5ldyBZLk1hcCgpO1xuICAgICAgICBjb25zdCB5c291cmNlID0gbmV3IFkuVGV4dCh0aGlzLmdldFNvdXJjZSgpKTtcbiAgICAgICAgeW1vZGVsLnNldCgnc291cmNlJywgeXNvdXJjZSk7XG4gICAgICAgIHltb2RlbC5zZXQoJ21ldGFkYXRhJywgdGhpcy5nZXRNZXRhZGF0YSgpKTtcbiAgICAgICAgeW1vZGVsLnNldCgnY2VsbF90eXBlJywgdGhpcy5jZWxsX3R5cGUpO1xuICAgICAgICB5bW9kZWwuc2V0KCdpZCcsIHRoaXMuZ2V0SWQoKSk7XG4gICAgICAgIGNvbnN0IFNlbGYgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgICAgICBjb25zdCBjbG9uZSA9IG5ldyBTZWxmKHltb2RlbCk7XG4gICAgICAgIC8vIFRPRE8gVGhlIGFzc2lnbm1lbnQgb2YgdGhlIHVuZG9NYW5hZ2VyIGRvZXMgbm90IHdvcmsgZm9yIGEgY2xvbmUuXG4gICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vanVweXRlcmxhYi9qdXB5dGVybGFiL2lzc3Vlcy8xMTAzNVxuICAgICAgICBjbG9uZS5fdW5kb01hbmFnZXIgPSB0aGlzLnVuZG9NYW5hZ2VyO1xuICAgICAgICByZXR1cm4gY2xvbmU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjaGFuZ2VkIHNpZ25hbC5cbiAgICAgKi9cbiAgICBnZXQgY2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcy5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLnltb2RlbC51bm9ic2VydmVEZWVwKHRoaXMuX21vZGVsT2JzZXJ2ZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjZWxsIGF0dGFjaG1lbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIGNlbGwgYXR0YWNobWVudHMuXG4gICAgICovXG4gICAgZ2V0QXR0YWNobWVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnltb2RlbC5nZXQoJ2F0dGFjaG1lbnRzJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGNlbGwgYXR0YWNobWVudHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhdHRhY2htZW50czogVGhlIGNlbGwgYXR0YWNobWVudHMuXG4gICAgICovXG4gICAgc2V0QXR0YWNobWVudHMoYXR0YWNobWVudHMpIHtcbiAgICAgICAgdGhpcy50cmFuc2FjdCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoYXR0YWNobWVudHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMueW1vZGVsLmRlbGV0ZSgnYXR0YWNobWVudHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMueW1vZGVsLnNldCgnYXR0YWNobWVudHMnLCBhdHRhY2htZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgY2VsbCBpZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIENlbGwgaWRcbiAgICAgKi9cbiAgICBnZXRJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueW1vZGVsLmdldCgnaWQnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyBjZWxsJ3Mgc291cmNlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQ2VsbCdzIHNvdXJjZS5cbiAgICAgKi9cbiAgICBnZXRTb3VyY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnltb2RlbC5nZXQoJ3NvdXJjZScpLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgY2VsbCdzIHNvdXJjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZTogTmV3IHNvdXJjZS5cbiAgICAgKi9cbiAgICBzZXRTb3VyY2UodmFsdWUpIHtcbiAgICAgICAgY29uc3QgeXRleHQgPSB0aGlzLnltb2RlbC5nZXQoJ3NvdXJjZScpO1xuICAgICAgICB0aGlzLnRyYW5zYWN0KCgpID0+IHtcbiAgICAgICAgICAgIHl0ZXh0LmRlbGV0ZSgwLCB5dGV4dC5sZW5ndGgpO1xuICAgICAgICAgICAgeXRleHQuaW5zZXJ0KDAsIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEB0b2RvIERvIHdlIG5lZWQgcHJvcGVyIHJlcGxhY2Ugc2VtYW50aWM/IFRoaXMgbGVhZHMgdG8gaXNzdWVzIGluIGVkaXRvciBiaW5kaW5ncyBiZWNhdXNlIHRoZXkgZG9uJ3Qgc3dpdGNoIHNvdXJjZS5cbiAgICAgICAgLy8gdGhpcy55bW9kZWwuc2V0KCdzb3VyY2UnLCBuZXcgWS5UZXh0KHZhbHVlKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcGxhY2UgY29udGVudCBmcm9tIGBzdGFydCcgdG8gYGVuZGAgd2l0aCBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHN0YXJ0OiBUaGUgc3RhcnQgaW5kZXggb2YgdGhlIHJhbmdlIHRvIHJlcGxhY2UgKGluY2x1c2l2ZSkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW5kOiBUaGUgZW5kIGluZGV4IG9mIHRoZSByYW5nZSB0byByZXBsYWNlIChleGNsdXNpdmUpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlOiBOZXcgc291cmNlIChvcHRpb25hbCkuXG4gICAgICovXG4gICAgdXBkYXRlU291cmNlKHN0YXJ0LCBlbmQsIHZhbHVlID0gJycpIHtcbiAgICAgICAgdGhpcy50cmFuc2FjdCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB5c291cmNlID0gdGhpcy55c291cmNlO1xuICAgICAgICAgICAgLy8gaW5zZXJ0IGFuZCB0aGVuIGRlbGV0ZS5cbiAgICAgICAgICAgIC8vIFRoaXMgZW5zdXJlcyB0aGF0IHRoZSBjdXJzb3IgcG9zaXRpb24gaXMgYWRqdXN0ZWQgYWZ0ZXIgdGhlIHJlcGxhY2VkIGNvbnRlbnQuXG4gICAgICAgICAgICB5c291cmNlLmluc2VydChzdGFydCwgdmFsdWUpO1xuICAgICAgICAgICAgeXNvdXJjZS5kZWxldGUoc3RhcnQgKyB2YWx1ZS5sZW5ndGgsIGVuZCAtIHN0YXJ0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSB0eXBlIG9mIHRoZSBjZWxsLlxuICAgICAqL1xuICAgIGdldCBjZWxsX3R5cGUoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQSBZQmFzZUNlbGwgbXVzdCBub3QgYmUgY29uc3RydWN0ZWQnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbWV0YWRhdGEgYXNzb2NpYXRlZCB3aXRoIHRoZSBub3RlYm9vay5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE5vdGVib29rJ3MgbWV0YWRhdGEuXG4gICAgICovXG4gICAgZ2V0TWV0YWRhdGEoKSB7XG4gICAgICAgIHJldHVybiBkZWVwQ29weSh0aGlzLnltb2RlbC5nZXQoJ21ldGFkYXRhJykpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhlIG5vdGVib29rLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1ldGFkYXRhOiBOb3RlYm9vaydzIG1ldGFkYXRhLlxuICAgICAqL1xuICAgIHNldE1ldGFkYXRhKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudHJhbnNhY3QoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy55bW9kZWwuc2V0KCdtZXRhZGF0YScsIGRlZXBDb3B5KHZhbHVlKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXJpYWxpemUgdGhlIG1vZGVsIHRvIEpTT04uXG4gICAgICovXG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHRoaXMuZ2V0SWQoKSxcbiAgICAgICAgICAgIGNlbGxfdHlwZTogdGhpcy5jZWxsX3R5cGUsXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMuZ2V0U291cmNlKCksXG4gICAgICAgICAgICBtZXRhZGF0YTogdGhpcy5nZXRNZXRhZGF0YSgpXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFlDb2RlQ2VsbCBleHRlbmRzIFlCYXNlQ2VsbCB7XG4gICAgLyoqXG4gICAgICogVGhlIHR5cGUgb2YgdGhlIGNlbGwuXG4gICAgICovXG4gICAgZ2V0IGNlbGxfdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuICdjb2RlJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGNvZGUgY2VsbCdzIHByb21wdCBudW1iZXIuIFdpbGwgYmUgbnVsbCBpZiB0aGUgY2VsbCBoYXMgbm90IGJlZW4gcnVuLlxuICAgICAqL1xuICAgIGdldCBleGVjdXRpb25fY291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnltb2RlbC5nZXQoJ2V4ZWN1dGlvbl9jb3VudCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY29kZSBjZWxsJ3MgcHJvbXB0IG51bWJlci4gV2lsbCBiZSBudWxsIGlmIHRoZSBjZWxsIGhhcyBub3QgYmVlbiBydW4uXG4gICAgICovXG4gICAgc2V0IGV4ZWN1dGlvbl9jb3VudChjb3VudCkge1xuICAgICAgICB0aGlzLnRyYW5zYWN0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMueW1vZGVsLnNldCgnZXhlY3V0aW9uX2NvdW50JywgY291bnQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXhlY3V0aW9uLCBkaXNwbGF5LCBvciBzdHJlYW0gb3V0cHV0cy5cbiAgICAgKi9cbiAgICBnZXRPdXRwdXRzKCkge1xuICAgICAgICByZXR1cm4gZGVlcENvcHkodGhpcy55bW9kZWwuZ2V0KCdvdXRwdXRzJykudG9BcnJheSgpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVwbGFjZSBhbGwgb3V0cHV0cy5cbiAgICAgKi9cbiAgICBzZXRPdXRwdXRzKG91dHB1dHMpIHtcbiAgICAgICAgY29uc3QgeW91dHB1dHMgPSB0aGlzLnltb2RlbC5nZXQoJ291dHB1dHMnKTtcbiAgICAgICAgdGhpcy50cmFuc2FjdCgoKSA9PiB7XG4gICAgICAgICAgICB5b3V0cHV0cy5kZWxldGUoMCwgeW91dHB1dHMubGVuZ3RoKTtcbiAgICAgICAgICAgIHlvdXRwdXRzLmluc2VydCgwLCBvdXRwdXRzKTtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlIGNvbnRlbnQgZnJvbSBgc3RhcnQnIHRvIGBlbmRgIHdpdGggYG91dHB1dHNgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHN0YXJ0OiBUaGUgc3RhcnQgaW5kZXggb2YgdGhlIHJhbmdlIHRvIHJlcGxhY2UgKGluY2x1c2l2ZSkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW5kOiBUaGUgZW5kIGluZGV4IG9mIHRoZSByYW5nZSB0byByZXBsYWNlIChleGNsdXNpdmUpLlxuICAgICAqXG4gICAgICogQHBhcmFtIG91dHB1dHM6IE5ldyBvdXRwdXRzIChvcHRpb25hbCkuXG4gICAgICovXG4gICAgdXBkYXRlT3V0cHV0cyhzdGFydCwgZW5kLCBvdXRwdXRzID0gW10pIHtcbiAgICAgICAgY29uc3QgeW91dHB1dHMgPSB0aGlzLnltb2RlbC5nZXQoJ291dHB1dHMnKTtcbiAgICAgICAgY29uc3QgZmluID0gZW5kIDwgeW91dHB1dHMubGVuZ3RoID8gZW5kIC0gc3RhcnQgOiB5b3V0cHV0cy5sZW5ndGggLSBzdGFydDtcbiAgICAgICAgdGhpcy50cmFuc2FjdCgoKSA9PiB7XG4gICAgICAgICAgICB5b3V0cHV0cy5kZWxldGUoc3RhcnQsIGZpbik7XG4gICAgICAgICAgICB5b3V0cHV0cy5pbnNlcnQoc3RhcnQsIG91dHB1dHMpO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBZQ29kZUNlbGwgdGhhdCBjYW4gYmUgaW5zZXJ0ZWQgaW50byBhIFlOb3RlYm9va1xuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGUoaWQpIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IHN1cGVyLmNyZWF0ZShpZCk7XG4gICAgICAgIGNlbGwueW1vZGVsLnNldCgnZXhlY3V0aW9uX2NvdW50JywgMCk7IC8vIGZvciBzb21lIGRlZmF1bHQgdmFsdWVcbiAgICAgICAgY2VsbC55bW9kZWwuc2V0KCdvdXRwdXRzJywgbmV3IFkuQXJyYXkoKSk7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgWUNvZGVDZWxsIHRoYXQgd29ya3Mgc3RhbmRhbG9uZS4gSXQgY2Fubm90IGJlXG4gICAgICogaW5zZXJ0ZWQgaW50byBhIFlOb3RlYm9vayBiZWNhdXNlIHRoZSBZanMgbW9kZWwgaXMgYWxyZWFkeVxuICAgICAqIGF0dGFjaGVkIHRvIGFuIGFub255bW91cyBZLkRvYyBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlU3RhbmRhbG9uZShpZCkge1xuICAgICAgICBjb25zdCBjZWxsID0gc3VwZXIuY3JlYXRlU3RhbmRhbG9uZShpZCk7XG4gICAgICAgIGNlbGwueW1vZGVsLnNldCgnZXhlY3V0aW9uX2NvdW50JywgbnVsbCk7IC8vIGZvciBzb21lIGRlZmF1bHQgdmFsdWVcbiAgICAgICAgY2VsbC55bW9kZWwuc2V0KCdvdXRwdXRzJywgbmV3IFkuQXJyYXkoKSk7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgWUNvZGVDZWxsIHRoYXQgY2FuIGJlIGluc2VydGVkIGludG8gYSBZTm90ZWJvb2tcbiAgICAgKlxuICAgICAqIEB0b2RvIGNsb25lIHNob3VsZCBvbmx5IGJlIGF2YWlsYWJsZSBpbiB0aGUgc3BlY2lmaWMgaW1wbGVtZW50YXRpb25zIGkuZS4gSVNoYXJlZENvZGVDZWxsXG4gICAgICovXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBzdXBlci5jbG9uZSgpO1xuICAgICAgICBjb25zdCB5b3V0cHV0cyA9IG5ldyBZLkFycmF5KCk7XG4gICAgICAgIHlvdXRwdXRzLmluc2VydCgwLCB0aGlzLmdldE91dHB1dHMoKSk7XG4gICAgICAgIGNlbGwueW1vZGVsLnNldCgnZXhlY3V0aW9uX2NvdW50JywgdGhpcy5leGVjdXRpb25fY291bnQpOyAvLyBmb3Igc29tZSBkZWZhdWx0IHZhbHVlXG4gICAgICAgIGNlbGwueW1vZGVsLnNldCgnb3V0cHV0cycsIHlvdXRwdXRzKTtcbiAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlcmlhbGl6ZSB0aGUgbW9kZWwgdG8gSlNPTi5cbiAgICAgKi9cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogdGhpcy5nZXRJZCgpLFxuICAgICAgICAgICAgY2VsbF90eXBlOiAnY29kZScsXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMuZ2V0U291cmNlKCksXG4gICAgICAgICAgICBtZXRhZGF0YTogdGhpcy5nZXRNZXRhZGF0YSgpLFxuICAgICAgICAgICAgb3V0cHV0czogdGhpcy5nZXRPdXRwdXRzKCksXG4gICAgICAgICAgICBleGVjdXRpb25fY291bnQ6IHRoaXMuZXhlY3V0aW9uX2NvdW50XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFlSYXdDZWxsIGV4dGVuZHMgWUJhc2VDZWxsIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgWVJhd0NlbGwgdGhhdCBjYW4gYmUgaW5zZXJ0ZWQgaW50byBhIFlOb3RlYm9va1xuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGUoaWQpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmNyZWF0ZShpZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBZUmF3Q2VsbCB0aGF0IHdvcmtzIHN0YW5kYWxvbmUuIEl0IGNhbm5vdCBiZVxuICAgICAqIGluc2VydGVkIGludG8gYSBZTm90ZWJvb2sgYmVjYXVzZSB0aGUgWWpzIG1vZGVsIGlzIGFscmVhZHlcbiAgICAgKiBhdHRhY2hlZCB0byBhbiBhbm9ueW1vdXMgWS5Eb2MgaW5zdGFuY2UuXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZVN0YW5kYWxvbmUoaWQpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmNyZWF0ZVN0YW5kYWxvbmUoaWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdHJpbmcgaWRlbnRpZnlpbmcgdGhlIHR5cGUgb2YgY2VsbC5cbiAgICAgKi9cbiAgICBnZXQgY2VsbF90eXBlKCkge1xuICAgICAgICByZXR1cm4gJ3Jhdyc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlcmlhbGl6ZSB0aGUgbW9kZWwgdG8gSlNPTi5cbiAgICAgKi9cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogdGhpcy5nZXRJZCgpLFxuICAgICAgICAgICAgY2VsbF90eXBlOiAncmF3JyxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcy5nZXRTb3VyY2UoKSxcbiAgICAgICAgICAgIG1ldGFkYXRhOiB0aGlzLmdldE1ldGFkYXRhKCksXG4gICAgICAgICAgICBhdHRhY2htZW50czogdGhpcy5nZXRBdHRhY2htZW50cygpXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFlNYXJrZG93bkNlbGwgZXh0ZW5kcyBZQmFzZUNlbGwge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBZTWFya2Rvd25DZWxsIHRoYXQgY2FuIGJlIGluc2VydGVkIGludG8gYSBZTm90ZWJvb2tcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlKGlkKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5jcmVhdGUoaWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgWU1hcmtkb3duQ2VsbCB0aGF0IHdvcmtzIHN0YW5kYWxvbmUuIEl0IGNhbm5vdCBiZVxuICAgICAqIGluc2VydGVkIGludG8gYSBZTm90ZWJvb2sgYmVjYXVzZSB0aGUgWWpzIG1vZGVsIGlzIGFscmVhZHlcbiAgICAgKiBhdHRhY2hlZCB0byBhbiBhbm9ueW1vdXMgWS5Eb2MgaW5zdGFuY2UuXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZVN0YW5kYWxvbmUoaWQpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmNyZWF0ZVN0YW5kYWxvbmUoaWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdHJpbmcgaWRlbnRpZnlpbmcgdGhlIHR5cGUgb2YgY2VsbC5cbiAgICAgKi9cbiAgICBnZXQgY2VsbF90eXBlKCkge1xuICAgICAgICByZXR1cm4gJ21hcmtkb3duJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VyaWFsaXplIHRoZSBtb2RlbCB0byBKU09OLlxuICAgICAqL1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiB0aGlzLmdldElkKCksXG4gICAgICAgICAgICBjZWxsX3R5cGU6ICdtYXJrZG93bicsXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMuZ2V0U291cmNlKCksXG4gICAgICAgICAgICBtZXRhZGF0YTogdGhpcy5nZXRNZXRhZGF0YSgpLFxuICAgICAgICAgICAgYXR0YWNobWVudHM6IHRoaXMuZ2V0QXR0YWNobWVudHMoKVxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFlOb3RlYm9vaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXltb2RlbHMuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==