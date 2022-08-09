(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_docprovider_lib_index_js"],{

/***/ "../../packages/docprovider/lib/awareness.js":
/*!***************************************************!*\
  !*** ../../packages/docprovider/lib/awareness.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "moonsOfJupyter": () => (/* binding */ moonsOfJupyter),
/* harmony export */   "getAnonymousUserName": () => (/* binding */ getAnonymousUserName),
/* harmony export */   "userColors": () => (/* binding */ userColors),
/* harmony export */   "getRandomColor": () => (/* binding */ getRandomColor)
/* harmony export */ });
// From https://en.wikipedia.org/wiki/Moons_of_Jupiter
const moonsOfJupyter = [
    'Metis',
    'Adrastea',
    'Amalthea',
    'Thebe',
    'Io',
    'Europa',
    'Ganymede',
    'Callisto',
    'Themisto',
    'Leda',
    'Ersa',
    'Pandia',
    'Himalia',
    'Lysithea',
    'Elara',
    'Dia',
    'Carpo',
    'Valetudo',
    'Euporie',
    'Eupheme',
    // 'S/2003 J 18',
    // 'S/2010 J 2',
    'Helike',
    // 'S/2003 J 16',
    // 'S/2003 J 2',
    'Euanthe',
    // 'S/2017 J 7',
    'Hermippe',
    'Praxidike',
    'Thyone',
    'Thelxinoe',
    // 'S/2017 J 3',
    'Ananke',
    'Mneme',
    // 'S/2016 J 1',
    'Orthosie',
    'Harpalyke',
    'Iocaste',
    // 'S/2017 J 9',
    // 'S/2003 J 12',
    // 'S/2003 J 4',
    'Erinome',
    'Aitne',
    'Herse',
    'Taygete',
    // 'S/2017 J 2',
    // 'S/2017 J 6',
    'Eukelade',
    'Carme',
    // 'S/2003 J 19',
    'Isonoe',
    // 'S/2003 J 10',
    'Autonoe',
    'Philophrosyne',
    'Cyllene',
    'Pasithee',
    // 'S/2010 J 1',
    'Pasiphae',
    'Sponde',
    // 'S/2017 J 8',
    'Eurydome',
    // 'S/2017 J 5',
    'Kalyke',
    'Hegemone',
    'Kale',
    'Kallichore',
    // 'S/2011 J 1',
    // 'S/2017 J 1',
    'Chaldene',
    'Arche',
    'Eirene',
    'Kore',
    // 'S/2011 J 2',
    // 'S/2003 J 9',
    'Megaclite',
    'Aoede',
    // 'S/2003 J 23',
    'Callirrhoe',
    'Sinope'
];
/**
 * Get a random user-name based on the moons of Jupyter.
 * This function returns names like "Anonymous Io" or "Anonymous Metis".
 */
const getAnonymousUserName = () => 'Anonymous ' +
    moonsOfJupyter[Math.floor(Math.random() * moonsOfJupyter.length)];
const userColors = [
    '#12A0D3',
    '#17AB30',
    '#CC8500',
    '#A79011',
    '#ee6352',
    '#609DA9',
    '#4BA749',
    '#00A1B3'
];
const getRandomColor = () => userColors[Math.floor(Math.random() * userColors.length)];
//# sourceMappingURL=awareness.js.map

/***/ }),

/***/ "../../packages/docprovider/lib/index.js":
/*!***********************************************!*\
  !*** ../../packages/docprovider/lib/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAnonymousUserName": () => (/* reexport safe */ _awareness__WEBPACK_IMPORTED_MODULE_0__.getAnonymousUserName),
/* harmony export */   "getRandomColor": () => (/* reexport safe */ _awareness__WEBPACK_IMPORTED_MODULE_0__.getRandomColor),
/* harmony export */   "moonsOfJupyter": () => (/* reexport safe */ _awareness__WEBPACK_IMPORTED_MODULE_0__.moonsOfJupyter),
/* harmony export */   "userColors": () => (/* reexport safe */ _awareness__WEBPACK_IMPORTED_MODULE_0__.userColors),
/* harmony export */   "ProviderMock": () => (/* reexport safe */ _mock__WEBPACK_IMPORTED_MODULE_1__.ProviderMock),
/* harmony export */   "IDocumentProviderFactory": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_2__.IDocumentProviderFactory),
/* harmony export */   "WebSocketProviderWithLocks": () => (/* reexport safe */ _yprovider__WEBPACK_IMPORTED_MODULE_3__.WebSocketProviderWithLocks)
/* harmony export */ });
/* harmony import */ var _awareness__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./awareness */ "../../packages/docprovider/lib/awareness.js");
/* harmony import */ var _mock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mock */ "../../packages/docprovider/lib/mock.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tokens */ "../../packages/docprovider/lib/tokens.js");
/* harmony import */ var _yprovider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./yprovider */ "../../packages/docprovider/lib/yprovider.js");
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module docprovider
 */




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/docprovider/lib/mock.js":
/*!**********************************************!*\
  !*** ../../packages/docprovider/lib/mock.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProviderMock": () => (/* binding */ ProviderMock)
/* harmony export */ });
class ProviderMock {
    requestInitialContent() {
        return Promise.resolve(false);
    }
    putInitializedState() {
        /* nop */
    }
    acquireLock() {
        return Promise.resolve(0);
    }
    releaseLock(lock) {
        /* nop */
    }
    destroy() {
        /* nop */
    }
    setPath(path) {
        /* nop */
    }
}
//# sourceMappingURL=mock.js.map

/***/ }),

/***/ "../../packages/docprovider/lib/tokens.js":
/*!************************************************!*\
  !*** ../../packages/docprovider/lib/tokens.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IDocumentProviderFactory": () => (/* binding */ IDocumentProviderFactory)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);

/**
 * The default document provider token.
 */
const IDocumentProviderFactory = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/docprovider:IDocumentProviderFactory');
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/docprovider/lib/yprovider.js":
/*!***************************************************!*\
  !*** ../../packages/docprovider/lib/yprovider.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebSocketProviderWithLocks": () => (/* binding */ WebSocketProviderWithLocks)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lib0_decoding__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lib0/decoding */ "../../node_modules/lib0/decoding.js");
/* harmony import */ var lib0_encoding__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lib0/encoding */ "../../node_modules/lib0/encoding.js");
/* harmony import */ var y_websocket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! y-websocket */ "../../node_modules/y-websocket/src/y-websocket.js");
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! yjs */ "webpack/sharing/consume/default/yjs/yjs");
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(yjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _awareness__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./awareness */ "../../packages/docprovider/lib/awareness.js");
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/






/**
 * A class to provide Yjs synchronization over WebSocket.
 *
 * The user can specify their own user-name and user-color by adding url parameters:
 *   ?username=Alice&usercolor=007007
 * where usercolor must be a six-digit hexadecimal encoded RGB value without the hash token.
 *
 * We specify custom messages that the server can interpret. For reference please look in yjs_ws_server.
 *
 */
class WebSocketProviderWithLocks extends y_websocket__WEBPACK_IMPORTED_MODULE_2__.WebsocketProvider {
    /**
     * Construct a new WebSocketProviderWithLocks
     *
     * @param options The instantiation options for a WebSocketProviderWithLocks
     */
    constructor(options) {
        var _a, _b, _c;
        super(options.url, options.contentType + ':' + options.path, options.ymodel.ydoc, {
            awareness: options.ymodel.awareness
        });
        this._currentLockRequest = null;
        this._initialContentRequest = null;
        this._path = options.path;
        this._contentType = options.contentType;
        this._serverUrl = options.url;
        const searchParams = new URL(window.location.href).searchParams;
        const color = (_a = '#' + searchParams.get('usercolor')) !== null && _a !== void 0 ? _a : (0,_awareness__WEBPACK_IMPORTED_MODULE_3__.getRandomColor)().slice(1);
        const name = (_b = searchParams.get('username')) !== null && _b !== void 0 ? _b : (0,_awareness__WEBPACK_IMPORTED_MODULE_3__.getAnonymousUserName)();
        const awareness = options.ymodel.awareness;
        const currState = awareness.getLocalState();
        // only set if this was not already set by another plugin
        if (currState && ((_c = currState.user) === null || _c === void 0 ? void 0 : _c.name) == null) {
            options.ymodel.awareness.setLocalStateField('user', {
                name,
                color
            });
        }
        // Message handler that confirms when a lock has been acquired
        this.messageHandlers[127] = (encoder, decoder, provider, emitSynced, messageType) => {
            // acquired lock
            const timestamp = lib0_decoding__WEBPACK_IMPORTED_MODULE_4__.readUint32(decoder);
            const lockRequest = this._currentLockRequest;
            this._currentLockRequest = null;
            if (lockRequest) {
                lockRequest.resolve(timestamp);
            }
        };
        // Message handler that receives the initial content
        this.messageHandlers[125] = (encoder, decoder, provider, emitSynced, messageType) => {
            // received initial content
            const initialContent = lib0_decoding__WEBPACK_IMPORTED_MODULE_4__.readTailAsUint8Array(decoder);
            // Apply data from server
            if (initialContent.byteLength > 0) {
                yjs__WEBPACK_IMPORTED_MODULE_1__.applyUpdate(this.doc, initialContent);
            }
            const initialContentRequest = this._initialContentRequest;
            this._initialContentRequest = null;
            if (initialContentRequest) {
                initialContentRequest.resolve(initialContent.byteLength > 0);
            }
        };
        this._isInitialized = false;
        this._onConnectionStatus = this._onConnectionStatus.bind(this);
        this.on('status', this._onConnectionStatus);
    }
    setPath(newPath) {
        if (newPath !== this._path) {
            this._path = newPath;
            const encoder = lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.createEncoder();
            lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.write(encoder, 123);
            // writing a utf8 string to the encoder
            const escapedPath = unescape(encodeURIComponent(this._contentType + ':' + newPath));
            for (let i = 0; i < escapedPath.length; i++) {
                lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.write(encoder, 
                /** @type {number} */ escapedPath.codePointAt(i));
            }
            this._sendMessage(lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.toUint8Array(encoder));
            // prevent publishing messages to the old channel id.
            this.disconnectBc();
            // The next time the provider connects, we should connect through a different server url
            this.bcChannel =
                this._serverUrl + '/' + this._contentType + ':' + this._path;
            this.url = this.bcChannel;
            this.connectBc();
        }
    }
    /**
     * Resolves to true if the initial content has been initialized on the server. false otherwise.
     */
    requestInitialContent() {
        if (this._initialContentRequest) {
            return this._initialContentRequest.promise;
        }
        this._initialContentRequest = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.PromiseDelegate();
        this._sendMessage(new Uint8Array([125]));
        // Resolve with true if the server doesn't respond for some reason.
        // In case of a connection problem, we don't want the user to re-initialize the window.
        // Instead wait for y-websocket to connect to the server.
        // @todo maybe we should reload instead..
        setTimeout(() => { var _a; return (_a = this._initialContentRequest) === null || _a === void 0 ? void 0 : _a.resolve(false); }, 1000);
        return this._initialContentRequest.promise;
    }
    /**
     * Put the initialized state.
     */
    putInitializedState() {
        const encoder = lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.createEncoder();
        lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.writeVarUint(encoder, 124);
        lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.writeUint8Array(encoder, yjs__WEBPACK_IMPORTED_MODULE_1__.encodeStateAsUpdate(this.doc));
        this._sendMessage(lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.toUint8Array(encoder));
        this._isInitialized = true;
    }
    /**
     * Acquire a lock.
     * Returns a Promise that resolves to the lock number.
     */
    acquireLock() {
        if (this._currentLockRequest) {
            return this._currentLockRequest.promise;
        }
        this._sendMessage(new Uint8Array([127]));
        // try to acquire lock in regular interval
        if (this._requestLockInterval) {
            clearInterval(this._requestLockInterval);
        }
        this._requestLockInterval = setInterval(() => {
            if (this.wsconnected) {
                // try to acquire lock
                this._sendMessage(new Uint8Array([127]));
            }
        }, 500);
        let resolve, reject;
        const promise = new Promise((_resolve, _reject) => {
            resolve = _resolve;
            reject = _reject;
        });
        this._currentLockRequest = { promise, resolve, reject };
        return promise;
    }
    /**
     * Release a lock.
     *
     * @param lock The lock to release.
     */
    releaseLock(lock) {
        const encoder = lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.createEncoder();
        // reply with release lock
        lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.writeVarUint(encoder, 126);
        lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.writeUint32(encoder, lock);
        // releasing lock
        this._sendMessage(lib0_encoding__WEBPACK_IMPORTED_MODULE_5__.toUint8Array(encoder));
        if (this._requestLockInterval) {
            clearInterval(this._requestLockInterval);
        }
    }
    /**
     * Send a new message to WebSocket server.
     *
     * @param message The message to send
     */
    _sendMessage(message) {
        // send once connected
        const send = () => {
            setTimeout(() => {
                if (this.wsconnected) {
                    this.ws.send(message);
                }
                else {
                    this.once('status', send);
                }
            }, 0);
        };
        send();
    }
    /**
     * Handle a change to the connection status.
     *
     * @param status The connection status.
     */
    async _onConnectionStatus(status) {
        if (this._isInitialized && status.status === 'connected') {
            const lock = await this.acquireLock();
            const contentIsInitialized = await this.requestInitialContent();
            if (!contentIsInitialized) {
                this.putInitializedState();
            }
            this.releaseLock(lock);
        }
    }
}
//# sourceMappingURL=yprovider.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZG9jcHJvdmlkZXIvbGliL2F3YXJlbmVzcy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZG9jcHJvdmlkZXIvbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9kb2Nwcm92aWRlci9saWIvbW9jay5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZG9jcHJvdmlkZXIvbGliL3Rva2Vucy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZG9jcHJvdmlkZXIvbGliL3lwcm92aWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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bmRleF9qcy5kM2JhYWQ5NGU4ZjJlNWJiY2NjOC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEZyb20gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTW9vbnNfb2ZfSnVwaXRlclxuZXhwb3J0IGNvbnN0IG1vb25zT2ZKdXB5dGVyID0gW1xuICAgICdNZXRpcycsXG4gICAgJ0FkcmFzdGVhJyxcbiAgICAnQW1hbHRoZWEnLFxuICAgICdUaGViZScsXG4gICAgJ0lvJyxcbiAgICAnRXVyb3BhJyxcbiAgICAnR2FueW1lZGUnLFxuICAgICdDYWxsaXN0bycsXG4gICAgJ1RoZW1pc3RvJyxcbiAgICAnTGVkYScsXG4gICAgJ0Vyc2EnLFxuICAgICdQYW5kaWEnLFxuICAgICdIaW1hbGlhJyxcbiAgICAnTHlzaXRoZWEnLFxuICAgICdFbGFyYScsXG4gICAgJ0RpYScsXG4gICAgJ0NhcnBvJyxcbiAgICAnVmFsZXR1ZG8nLFxuICAgICdFdXBvcmllJyxcbiAgICAnRXVwaGVtZScsXG4gICAgLy8gJ1MvMjAwMyBKIDE4JyxcbiAgICAvLyAnUy8yMDEwIEogMicsXG4gICAgJ0hlbGlrZScsXG4gICAgLy8gJ1MvMjAwMyBKIDE2JyxcbiAgICAvLyAnUy8yMDAzIEogMicsXG4gICAgJ0V1YW50aGUnLFxuICAgIC8vICdTLzIwMTcgSiA3JyxcbiAgICAnSGVybWlwcGUnLFxuICAgICdQcmF4aWRpa2UnLFxuICAgICdUaHlvbmUnLFxuICAgICdUaGVseGlub2UnLFxuICAgIC8vICdTLzIwMTcgSiAzJyxcbiAgICAnQW5hbmtlJyxcbiAgICAnTW5lbWUnLFxuICAgIC8vICdTLzIwMTYgSiAxJyxcbiAgICAnT3J0aG9zaWUnLFxuICAgICdIYXJwYWx5a2UnLFxuICAgICdJb2Nhc3RlJyxcbiAgICAvLyAnUy8yMDE3IEogOScsXG4gICAgLy8gJ1MvMjAwMyBKIDEyJyxcbiAgICAvLyAnUy8yMDAzIEogNCcsXG4gICAgJ0VyaW5vbWUnLFxuICAgICdBaXRuZScsXG4gICAgJ0hlcnNlJyxcbiAgICAnVGF5Z2V0ZScsXG4gICAgLy8gJ1MvMjAxNyBKIDInLFxuICAgIC8vICdTLzIwMTcgSiA2JyxcbiAgICAnRXVrZWxhZGUnLFxuICAgICdDYXJtZScsXG4gICAgLy8gJ1MvMjAwMyBKIDE5JyxcbiAgICAnSXNvbm9lJyxcbiAgICAvLyAnUy8yMDAzIEogMTAnLFxuICAgICdBdXRvbm9lJyxcbiAgICAnUGhpbG9waHJvc3luZScsXG4gICAgJ0N5bGxlbmUnLFxuICAgICdQYXNpdGhlZScsXG4gICAgLy8gJ1MvMjAxMCBKIDEnLFxuICAgICdQYXNpcGhhZScsXG4gICAgJ1Nwb25kZScsXG4gICAgLy8gJ1MvMjAxNyBKIDgnLFxuICAgICdFdXJ5ZG9tZScsXG4gICAgLy8gJ1MvMjAxNyBKIDUnLFxuICAgICdLYWx5a2UnLFxuICAgICdIZWdlbW9uZScsXG4gICAgJ0thbGUnLFxuICAgICdLYWxsaWNob3JlJyxcbiAgICAvLyAnUy8yMDExIEogMScsXG4gICAgLy8gJ1MvMjAxNyBKIDEnLFxuICAgICdDaGFsZGVuZScsXG4gICAgJ0FyY2hlJyxcbiAgICAnRWlyZW5lJyxcbiAgICAnS29yZScsXG4gICAgLy8gJ1MvMjAxMSBKIDInLFxuICAgIC8vICdTLzIwMDMgSiA5JyxcbiAgICAnTWVnYWNsaXRlJyxcbiAgICAnQW9lZGUnLFxuICAgIC8vICdTLzIwMDMgSiAyMycsXG4gICAgJ0NhbGxpcnJob2UnLFxuICAgICdTaW5vcGUnXG5dO1xuLyoqXG4gKiBHZXQgYSByYW5kb20gdXNlci1uYW1lIGJhc2VkIG9uIHRoZSBtb29ucyBvZiBKdXB5dGVyLlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIG5hbWVzIGxpa2UgXCJBbm9ueW1vdXMgSW9cIiBvciBcIkFub255bW91cyBNZXRpc1wiLlxuICovXG5leHBvcnQgY29uc3QgZ2V0QW5vbnltb3VzVXNlck5hbWUgPSAoKSA9PiAnQW5vbnltb3VzICcgK1xuICAgIG1vb25zT2ZKdXB5dGVyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1vb25zT2ZKdXB5dGVyLmxlbmd0aCldO1xuZXhwb3J0IGNvbnN0IHVzZXJDb2xvcnMgPSBbXG4gICAgJyMxMkEwRDMnLFxuICAgICcjMTdBQjMwJyxcbiAgICAnI0NDODUwMCcsXG4gICAgJyNBNzkwMTEnLFxuICAgICcjZWU2MzUyJyxcbiAgICAnIzYwOURBOScsXG4gICAgJyM0QkE3NDknLFxuICAgICcjMDBBMUIzJ1xuXTtcbmV4cG9ydCBjb25zdCBnZXRSYW5kb21Db2xvciA9ICgpID0+IHVzZXJDb2xvcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdXNlckNvbG9ycy5sZW5ndGgpXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF3YXJlbmVzcy5qcy5tYXAiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIGRvY3Byb3ZpZGVyXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYXdhcmVuZXNzJztcbmV4cG9ydCAqIGZyb20gJy4vbW9jayc7XG5leHBvcnQgKiBmcm9tICcuL3Rva2Vucyc7XG5leHBvcnQgKiBmcm9tICcuL3lwcm92aWRlcic7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQgY2xhc3MgUHJvdmlkZXJNb2NrIHtcbiAgICByZXF1ZXN0SW5pdGlhbENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cbiAgICBwdXRJbml0aWFsaXplZFN0YXRlKCkge1xuICAgICAgICAvKiBub3AgKi9cbiAgICB9XG4gICAgYWNxdWlyZUxvY2soKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoMCk7XG4gICAgfVxuICAgIHJlbGVhc2VMb2NrKGxvY2spIHtcbiAgICAgICAgLyogbm9wICovXG4gICAgfVxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIC8qIG5vcCAqL1xuICAgIH1cbiAgICBzZXRQYXRoKHBhdGgpIHtcbiAgICAgICAgLyogbm9wICovXG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9jay5qcy5tYXAiLCJpbXBvcnQgeyBUb2tlbiB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbi8qKlxuICogVGhlIGRlZmF1bHQgZG9jdW1lbnQgcHJvdmlkZXIgdG9rZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBJRG9jdW1lbnRQcm92aWRlckZhY3RvcnkgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL2RvY3Byb3ZpZGVyOklEb2N1bWVudFByb3ZpZGVyRmFjdG9yeScpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9rZW5zLmpzLm1hcCIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxufCBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgUHJvbWlzZURlbGVnYXRlIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0ICogYXMgZGVjb2RpbmcgZnJvbSAnbGliMC9kZWNvZGluZyc7XG5pbXBvcnQgKiBhcyBlbmNvZGluZyBmcm9tICdsaWIwL2VuY29kaW5nJztcbmltcG9ydCB7IFdlYnNvY2tldFByb3ZpZGVyIH0gZnJvbSAneS13ZWJzb2NrZXQnO1xuaW1wb3J0ICogYXMgWSBmcm9tICd5anMnO1xuaW1wb3J0IHsgZ2V0QW5vbnltb3VzVXNlck5hbWUsIGdldFJhbmRvbUNvbG9yIH0gZnJvbSAnLi9hd2FyZW5lc3MnO1xuLyoqXG4gKiBBIGNsYXNzIHRvIHByb3ZpZGUgWWpzIHN5bmNocm9uaXphdGlvbiBvdmVyIFdlYlNvY2tldC5cbiAqXG4gKiBUaGUgdXNlciBjYW4gc3BlY2lmeSB0aGVpciBvd24gdXNlci1uYW1lIGFuZCB1c2VyLWNvbG9yIGJ5IGFkZGluZyB1cmwgcGFyYW1ldGVyczpcbiAqICAgP3VzZXJuYW1lPUFsaWNlJnVzZXJjb2xvcj0wMDcwMDdcbiAqIHdoZXJlIHVzZXJjb2xvciBtdXN0IGJlIGEgc2l4LWRpZ2l0IGhleGFkZWNpbWFsIGVuY29kZWQgUkdCIHZhbHVlIHdpdGhvdXQgdGhlIGhhc2ggdG9rZW4uXG4gKlxuICogV2Ugc3BlY2lmeSBjdXN0b20gbWVzc2FnZXMgdGhhdCB0aGUgc2VydmVyIGNhbiBpbnRlcnByZXQuIEZvciByZWZlcmVuY2UgcGxlYXNlIGxvb2sgaW4geWpzX3dzX3NlcnZlci5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBXZWJTb2NrZXRQcm92aWRlcldpdGhMb2NrcyBleHRlbmRzIFdlYnNvY2tldFByb3ZpZGVyIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgV2ViU29ja2V0UHJvdmlkZXJXaXRoTG9ja3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIFRoZSBpbnN0YW50aWF0aW9uIG9wdGlvbnMgZm9yIGEgV2ViU29ja2V0UHJvdmlkZXJXaXRoTG9ja3NcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBzdXBlcihvcHRpb25zLnVybCwgb3B0aW9ucy5jb250ZW50VHlwZSArICc6JyArIG9wdGlvbnMucGF0aCwgb3B0aW9ucy55bW9kZWwueWRvYywge1xuICAgICAgICAgICAgYXdhcmVuZXNzOiBvcHRpb25zLnltb2RlbC5hd2FyZW5lc3NcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRMb2NrUmVxdWVzdCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2luaXRpYWxDb250ZW50UmVxdWVzdCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3BhdGggPSBvcHRpb25zLnBhdGg7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRUeXBlID0gb3B0aW9ucy5jb250ZW50VHlwZTtcbiAgICAgICAgdGhpcy5fc2VydmVyVXJsID0gb3B0aW9ucy51cmw7XG4gICAgICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpLnNlYXJjaFBhcmFtcztcbiAgICAgICAgY29uc3QgY29sb3IgPSAoX2EgPSAnIycgKyBzZWFyY2hQYXJhbXMuZ2V0KCd1c2VyY29sb3InKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZ2V0UmFuZG9tQ29sb3IoKS5zbGljZSgxKTtcbiAgICAgICAgY29uc3QgbmFtZSA9IChfYiA9IHNlYXJjaFBhcmFtcy5nZXQoJ3VzZXJuYW1lJykpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IGdldEFub255bW91c1VzZXJOYW1lKCk7XG4gICAgICAgIGNvbnN0IGF3YXJlbmVzcyA9IG9wdGlvbnMueW1vZGVsLmF3YXJlbmVzcztcbiAgICAgICAgY29uc3QgY3VyclN0YXRlID0gYXdhcmVuZXNzLmdldExvY2FsU3RhdGUoKTtcbiAgICAgICAgLy8gb25seSBzZXQgaWYgdGhpcyB3YXMgbm90IGFscmVhZHkgc2V0IGJ5IGFub3RoZXIgcGx1Z2luXG4gICAgICAgIGlmIChjdXJyU3RhdGUgJiYgKChfYyA9IGN1cnJTdGF0ZS51c2VyKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubmFtZSkgPT0gbnVsbCkge1xuICAgICAgICAgICAgb3B0aW9ucy55bW9kZWwuYXdhcmVuZXNzLnNldExvY2FsU3RhdGVGaWVsZCgndXNlcicsIHtcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgIGNvbG9yXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBNZXNzYWdlIGhhbmRsZXIgdGhhdCBjb25maXJtcyB3aGVuIGEgbG9jayBoYXMgYmVlbiBhY3F1aXJlZFxuICAgICAgICB0aGlzLm1lc3NhZ2VIYW5kbGVyc1sxMjddID0gKGVuY29kZXIsIGRlY29kZXIsIHByb3ZpZGVyLCBlbWl0U3luY2VkLCBtZXNzYWdlVHlwZSkgPT4ge1xuICAgICAgICAgICAgLy8gYWNxdWlyZWQgbG9ja1xuICAgICAgICAgICAgY29uc3QgdGltZXN0YW1wID0gZGVjb2RpbmcucmVhZFVpbnQzMihkZWNvZGVyKTtcbiAgICAgICAgICAgIGNvbnN0IGxvY2tSZXF1ZXN0ID0gdGhpcy5fY3VycmVudExvY2tSZXF1ZXN0O1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudExvY2tSZXF1ZXN0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChsb2NrUmVxdWVzdCkge1xuICAgICAgICAgICAgICAgIGxvY2tSZXF1ZXN0LnJlc29sdmUodGltZXN0YW1wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gTWVzc2FnZSBoYW5kbGVyIHRoYXQgcmVjZWl2ZXMgdGhlIGluaXRpYWwgY29udGVudFxuICAgICAgICB0aGlzLm1lc3NhZ2VIYW5kbGVyc1sxMjVdID0gKGVuY29kZXIsIGRlY29kZXIsIHByb3ZpZGVyLCBlbWl0U3luY2VkLCBtZXNzYWdlVHlwZSkgPT4ge1xuICAgICAgICAgICAgLy8gcmVjZWl2ZWQgaW5pdGlhbCBjb250ZW50XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsQ29udGVudCA9IGRlY29kaW5nLnJlYWRUYWlsQXNVaW50OEFycmF5KGRlY29kZXIpO1xuICAgICAgICAgICAgLy8gQXBwbHkgZGF0YSBmcm9tIHNlcnZlclxuICAgICAgICAgICAgaWYgKGluaXRpYWxDb250ZW50LmJ5dGVMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgWS5hcHBseVVwZGF0ZSh0aGlzLmRvYywgaW5pdGlhbENvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaW5pdGlhbENvbnRlbnRSZXF1ZXN0ID0gdGhpcy5faW5pdGlhbENvbnRlbnRSZXF1ZXN0O1xuICAgICAgICAgICAgdGhpcy5faW5pdGlhbENvbnRlbnRSZXF1ZXN0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChpbml0aWFsQ29udGVudFJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsQ29udGVudFJlcXVlc3QucmVzb2x2ZShpbml0aWFsQ29udGVudC5ieXRlTGVuZ3RoID4gMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2lzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fb25Db25uZWN0aW9uU3RhdHVzID0gdGhpcy5fb25Db25uZWN0aW9uU3RhdHVzLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub24oJ3N0YXR1cycsIHRoaXMuX29uQ29ubmVjdGlvblN0YXR1cyk7XG4gICAgfVxuICAgIHNldFBhdGgobmV3UGF0aCkge1xuICAgICAgICBpZiAobmV3UGF0aCAhPT0gdGhpcy5fcGF0aCkge1xuICAgICAgICAgICAgdGhpcy5fcGF0aCA9IG5ld1BhdGg7XG4gICAgICAgICAgICBjb25zdCBlbmNvZGVyID0gZW5jb2RpbmcuY3JlYXRlRW5jb2RlcigpO1xuICAgICAgICAgICAgZW5jb2Rpbmcud3JpdGUoZW5jb2RlciwgMTIzKTtcbiAgICAgICAgICAgIC8vIHdyaXRpbmcgYSB1dGY4IHN0cmluZyB0byB0aGUgZW5jb2RlclxuICAgICAgICAgICAgY29uc3QgZXNjYXBlZFBhdGggPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQodGhpcy5fY29udGVudFR5cGUgKyAnOicgKyBuZXdQYXRoKSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVzY2FwZWRQYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZW5jb2Rpbmcud3JpdGUoZW5jb2RlciwgXG4gICAgICAgICAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovIGVzY2FwZWRQYXRoLmNvZGVQb2ludEF0KGkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlKGVuY29kaW5nLnRvVWludDhBcnJheShlbmNvZGVyKSk7XG4gICAgICAgICAgICAvLyBwcmV2ZW50IHB1Ymxpc2hpbmcgbWVzc2FnZXMgdG8gdGhlIG9sZCBjaGFubmVsIGlkLlxuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0QmMoKTtcbiAgICAgICAgICAgIC8vIFRoZSBuZXh0IHRpbWUgdGhlIHByb3ZpZGVyIGNvbm5lY3RzLCB3ZSBzaG91bGQgY29ubmVjdCB0aHJvdWdoIGEgZGlmZmVyZW50IHNlcnZlciB1cmxcbiAgICAgICAgICAgIHRoaXMuYmNDaGFubmVsID1cbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJVcmwgKyAnLycgKyB0aGlzLl9jb250ZW50VHlwZSArICc6JyArIHRoaXMuX3BhdGg7XG4gICAgICAgICAgICB0aGlzLnVybCA9IHRoaXMuYmNDaGFubmVsO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0QmMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXNvbHZlcyB0byB0cnVlIGlmIHRoZSBpbml0aWFsIGNvbnRlbnQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQgb24gdGhlIHNlcnZlci4gZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIHJlcXVlc3RJbml0aWFsQ29udGVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luaXRpYWxDb250ZW50UmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRpYWxDb250ZW50UmVxdWVzdC5wcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2luaXRpYWxDb250ZW50UmVxdWVzdCA9IG5ldyBQcm9taXNlRGVsZWdhdGUoKTtcbiAgICAgICAgdGhpcy5fc2VuZE1lc3NhZ2UobmV3IFVpbnQ4QXJyYXkoWzEyNV0pKTtcbiAgICAgICAgLy8gUmVzb2x2ZSB3aXRoIHRydWUgaWYgdGhlIHNlcnZlciBkb2Vzbid0IHJlc3BvbmQgZm9yIHNvbWUgcmVhc29uLlxuICAgICAgICAvLyBJbiBjYXNlIG9mIGEgY29ubmVjdGlvbiBwcm9ibGVtLCB3ZSBkb24ndCB3YW50IHRoZSB1c2VyIHRvIHJlLWluaXRpYWxpemUgdGhlIHdpbmRvdy5cbiAgICAgICAgLy8gSW5zdGVhZCB3YWl0IGZvciB5LXdlYnNvY2tldCB0byBjb25uZWN0IHRvIHRoZSBzZXJ2ZXIuXG4gICAgICAgIC8vIEB0b2RvIG1heWJlIHdlIHNob3VsZCByZWxvYWQgaW5zdGVhZC4uXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB2YXIgX2E7IHJldHVybiAoX2EgPSB0aGlzLl9pbml0aWFsQ29udGVudFJlcXVlc3QpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZXNvbHZlKGZhbHNlKTsgfSwgMTAwMCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0aWFsQ29udGVudFJlcXVlc3QucHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHV0IHRoZSBpbml0aWFsaXplZCBzdGF0ZS5cbiAgICAgKi9cbiAgICBwdXRJbml0aWFsaXplZFN0YXRlKCkge1xuICAgICAgICBjb25zdCBlbmNvZGVyID0gZW5jb2RpbmcuY3JlYXRlRW5jb2RlcigpO1xuICAgICAgICBlbmNvZGluZy53cml0ZVZhclVpbnQoZW5jb2RlciwgMTI0KTtcbiAgICAgICAgZW5jb2Rpbmcud3JpdGVVaW50OEFycmF5KGVuY29kZXIsIFkuZW5jb2RlU3RhdGVBc1VwZGF0ZSh0aGlzLmRvYykpO1xuICAgICAgICB0aGlzLl9zZW5kTWVzc2FnZShlbmNvZGluZy50b1VpbnQ4QXJyYXkoZW5jb2RlcikpO1xuICAgICAgICB0aGlzLl9pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWNxdWlyZSBhIGxvY2suXG4gICAgICogUmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgbG9jayBudW1iZXIuXG4gICAgICovXG4gICAgYWNxdWlyZUxvY2soKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50TG9ja1JlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50TG9ja1JlcXVlc3QucHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZW5kTWVzc2FnZShuZXcgVWludDhBcnJheShbMTI3XSkpO1xuICAgICAgICAvLyB0cnkgdG8gYWNxdWlyZSBsb2NrIGluIHJlZ3VsYXIgaW50ZXJ2YWxcbiAgICAgICAgaWYgKHRoaXMuX3JlcXVlc3RMb2NrSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fcmVxdWVzdExvY2tJbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVxdWVzdExvY2tJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLndzY29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gdHJ5IHRvIGFjcXVpcmUgbG9ja1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlKG5ldyBVaW50OEFycmF5KFsxMjddKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICAgIGxldCByZXNvbHZlLCByZWplY3Q7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgoX3Jlc29sdmUsIF9yZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUgPSBfcmVzb2x2ZTtcbiAgICAgICAgICAgIHJlamVjdCA9IF9yZWplY3Q7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9jdXJyZW50TG9ja1JlcXVlc3QgPSB7IHByb21pc2UsIHJlc29sdmUsIHJlamVjdCB9O1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVsZWFzZSBhIGxvY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbG9jayBUaGUgbG9jayB0byByZWxlYXNlLlxuICAgICAqL1xuICAgIHJlbGVhc2VMb2NrKGxvY2spIHtcbiAgICAgICAgY29uc3QgZW5jb2RlciA9IGVuY29kaW5nLmNyZWF0ZUVuY29kZXIoKTtcbiAgICAgICAgLy8gcmVwbHkgd2l0aCByZWxlYXNlIGxvY2tcbiAgICAgICAgZW5jb2Rpbmcud3JpdGVWYXJVaW50KGVuY29kZXIsIDEyNik7XG4gICAgICAgIGVuY29kaW5nLndyaXRlVWludDMyKGVuY29kZXIsIGxvY2spO1xuICAgICAgICAvLyByZWxlYXNpbmcgbG9ja1xuICAgICAgICB0aGlzLl9zZW5kTWVzc2FnZShlbmNvZGluZy50b1VpbnQ4QXJyYXkoZW5jb2RlcikpO1xuICAgICAgICBpZiAodGhpcy5fcmVxdWVzdExvY2tJbnRlcnZhbCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9yZXF1ZXN0TG9ja0ludGVydmFsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgbmV3IG1lc3NhZ2UgdG8gV2ViU29ja2V0IHNlcnZlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICAgKi9cbiAgICBfc2VuZE1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICAvLyBzZW5kIG9uY2UgY29ubmVjdGVkXG4gICAgICAgIGNvbnN0IHNlbmQgPSAoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy53c2Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndzLnNlbmQobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uY2UoJ3N0YXR1cycsIHNlbmQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9O1xuICAgICAgICBzZW5kKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUgY29ubmVjdGlvbiBzdGF0dXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RhdHVzIFRoZSBjb25uZWN0aW9uIHN0YXR1cy5cbiAgICAgKi9cbiAgICBhc3luYyBfb25Db25uZWN0aW9uU3RhdHVzKHN0YXR1cykge1xuICAgICAgICBpZiAodGhpcy5faXNJbml0aWFsaXplZCAmJiBzdGF0dXMuc3RhdHVzID09PSAnY29ubmVjdGVkJykge1xuICAgICAgICAgICAgY29uc3QgbG9jayA9IGF3YWl0IHRoaXMuYWNxdWlyZUxvY2soKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRJc0luaXRpYWxpemVkID0gYXdhaXQgdGhpcy5yZXF1ZXN0SW5pdGlhbENvbnRlbnQoKTtcbiAgICAgICAgICAgIGlmICghY29udGVudElzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnB1dEluaXRpYWxpemVkU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVsZWFzZUxvY2sobG9jayk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD15cHJvdmlkZXIuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==