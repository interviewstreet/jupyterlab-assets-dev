(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_attachments_lib_index_js-_e3871"],{

/***/ "../../packages/attachments/lib/index.js":
/*!***********************************************!*\
  !*** ../../packages/attachments/lib/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttachmentsModel": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_0__.AttachmentsModel),
/* harmony export */   "AttachmentsResolver": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_0__.AttachmentsResolver)
/* harmony export */ });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "../../packages/attachments/lib/model.js");
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module attachments
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/attachments/lib/model.js":
/*!***********************************************!*\
  !*** ../../packages/attachments/lib/model.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttachmentsModel": () => (/* binding */ AttachmentsModel),
/* harmony export */   "AttachmentsResolver": () => (/* binding */ AttachmentsResolver)
/* harmony export */ });
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/observables */ "webpack/sharing/consume/default/@jupyterlab/observables/@jupyterlab/observables");
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * The default implementation of the IAttachmentsModel.
 */
class AttachmentsModel {
    /**
     * Construct a new observable outputs instance.
     */
    constructor(options = {}) {
        this._map = new _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__.ObservableMap();
        this._isDisposed = false;
        this._stateChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(this);
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(this);
        this._modelDB = null;
        this._serialized = null;
        this._changeGuard = false;
        this.contentFactory =
            options.contentFactory || AttachmentsModel.defaultContentFactory;
        if (options.values) {
            for (const key of Object.keys(options.values)) {
                if (options.values[key] !== undefined) {
                    this.set(key, options.values[key]);
                }
            }
        }
        this._map.changed.connect(this._onMapChanged, this);
        // If we are given a IModelDB, keep an up-to-date
        // serialized copy of the AttachmentsModel in it.
        if (options.modelDB) {
            this._modelDB = options.modelDB;
            this._serialized = this._modelDB.createValue('attachments');
            if (this._serialized.get()) {
                this.fromJSON(this._serialized.get());
            }
            else {
                this._serialized.set(this.toJSON());
            }
            this._serialized.changed.connect(this._onSerializedChanged, this);
        }
    }
    /**
     * A signal emitted when the model state changes.
     */
    get stateChanged() {
        return this._stateChanged;
    }
    /**
     * A signal emitted when the model changes.
     */
    get changed() {
        return this._changed;
    }
    /**
     * The keys of the attachments in the model.
     */
    get keys() {
        return this._map.keys();
    }
    /**
     * Get the length of the items in the model.
     */
    get length() {
        return this._map.keys().length;
    }
    /**
     * Test whether the model is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources used by the model.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        this._map.dispose();
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal.clearData(this);
    }
    /**
     * Whether the specified key is set.
     */
    has(key) {
        return this._map.has(key);
    }
    /**
     * Get an item at the specified key.
     */
    get(key) {
        return this._map.get(key);
    }
    /**
     * Set the value at the specified key.
     */
    set(key, value) {
        // Normalize stream data.
        const item = this._createItem({ value });
        this._map.set(key, item);
    }
    /**
     * Remove the attachment whose name is the specified key
     */
    remove(key) {
        this._map.delete(key);
    }
    /**
     * Clear all of the attachments.
     */
    clear() {
        this._map.values().forEach((item) => {
            item.dispose();
        });
        this._map.clear();
    }
    /**
     * Deserialize the model from JSON.
     *
     * #### Notes
     * This will clear any existing data.
     */
    fromJSON(values) {
        this.clear();
        Object.keys(values).forEach(key => {
            if (values[key] !== undefined) {
                this.set(key, values[key]);
            }
        });
    }
    /**
     * Serialize the model to JSON.
     */
    toJSON() {
        const ret = {};
        for (const key of this._map.keys()) {
            ret[key] = this._map.get(key).toJSON();
        }
        return ret;
    }
    /**
     * Create an attachment item and hook up its signals.
     */
    _createItem(options) {
        const factory = this.contentFactory;
        const item = factory.createAttachmentModel(options);
        item.changed.connect(this._onGenericChange, this);
        return item;
    }
    /**
     * Handle a change to the list.
     */
    _onMapChanged(sender, args) {
        if (this._serialized && !this._changeGuard) {
            this._changeGuard = true;
            this._serialized.set(this.toJSON());
            this._changeGuard = false;
        }
        this._changed.emit(args);
        this._stateChanged.emit(void 0);
    }
    /**
     * If the serialized version of the outputs have changed due to a remote
     * action, then update the model accordingly.
     */
    _onSerializedChanged(sender, args) {
        if (!this._changeGuard) {
            this._changeGuard = true;
            this.fromJSON(args.newValue);
            this._changeGuard = false;
        }
    }
    /**
     * Handle a change to an item.
     */
    _onGenericChange() {
        this._stateChanged.emit(void 0);
    }
}
/**
 * The namespace for AttachmentsModel class statics.
 */
(function (AttachmentsModel) {
    /**
     * The default implementation of a `IAttachmentsModel.IContentFactory`.
     */
    class ContentFactory {
        /**
         * Create an attachment model.
         */
        createAttachmentModel(options) {
            return new _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1__.AttachmentModel(options);
        }
    }
    AttachmentsModel.ContentFactory = ContentFactory;
    /**
     * The default attachment model factory.
     */
    AttachmentsModel.defaultContentFactory = new ContentFactory();
})(AttachmentsModel || (AttachmentsModel = {}));
/**
 * A resolver for cell attachments 'attachment:filename'.
 *
 * Will resolve to a data: url.
 */
class AttachmentsResolver {
    /**
     * Create an attachments resolver object.
     */
    constructor(options) {
        this._parent = options.parent || null;
        this._model = options.model;
    }
    /**
     * Resolve a relative url to a correct server path.
     */
    async resolveUrl(url) {
        if (this._parent && !url.startsWith('attachment:')) {
            return this._parent.resolveUrl(url);
        }
        return url;
    }
    /**
     * Get the download url of a given absolute server path.
     *
     * #### Notes
     * The returned URL may include a query parameter.
     */
    async getDownloadUrl(path) {
        if (this._parent && !path.startsWith('attachment:')) {
            return this._parent.getDownloadUrl(path);
        }
        // Return a data URL with the data of the url
        const key = path.slice('attachment:'.length);
        const attachment = this._model.get(key);
        if (attachment === undefined) {
            // Resolve with unprocessed path, to show as broken image
            return path;
        }
        const { data } = attachment;
        const mimeType = Object.keys(data)[0];
        // Only support known safe types:
        if (mimeType === undefined ||
            _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1__.imageRendererFactory.mimeTypes.indexOf(mimeType) === -1) {
            throw new Error(`Cannot render unknown image mime type "${mimeType}".`);
        }
        const dataUrl = `data:${mimeType};base64,${data[mimeType]}`;
        return dataUrl;
    }
    /**
     * Whether the URL should be handled by the resolver
     * or not.
     */
    isLocal(url) {
        var _a, _b, _c;
        if (this._parent && !url.startsWith('attachment:')) {
            return (_c = (_b = (_a = this._parent).isLocal) === null || _b === void 0 ? void 0 : _b.call(_a, url)) !== null && _c !== void 0 ? _c : true;
        }
        return true;
    }
}
//# sourceMappingURL=model.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXR0YWNobWVudHMvbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9hdHRhY2htZW50cy9saWIvbW9kZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN3QjtBQUN4QixpQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFDd0Q7QUFDdUI7QUFDcEM7QUFDM0M7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsd0JBQXdCLGtFQUFhO0FBQ3JDO0FBQ0EsaUNBQWlDLHFEQUFNO0FBQ3ZDLDRCQUE0QixxREFBTTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtEQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsUUFBUTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixtRUFBZTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsNENBQTRDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQSxZQUFZLDBGQUFzQztBQUNsRCxzRUFBc0UsU0FBUztBQUMvRTtBQUNBLGdDQUFnQyxVQUFVLFNBQVMsZUFBZTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUMiLCJmaWxlIjoicGFja2FnZXNfYXR0YWNobWVudHNfbGliX2luZGV4X2pzLV9lMzg3MS42NjAyMTgyYTEzMTYzZDk5ZWM4My5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxufCBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgYXR0YWNobWVudHNcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbCc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBPYnNlcnZhYmxlTWFwIH0gZnJvbSAnQGp1cHl0ZXJsYWIvb2JzZXJ2YWJsZXMnO1xuaW1wb3J0IHsgQXR0YWNobWVudE1vZGVsLCBpbWFnZVJlbmRlcmVyRmFjdG9yeSB9IGZyb20gJ0BqdXB5dGVybGFiL3JlbmRlcm1pbWUnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuLyoqXG4gKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgSUF0dGFjaG1lbnRzTW9kZWwuXG4gKi9cbmV4cG9ydCBjbGFzcyBBdHRhY2htZW50c01vZGVsIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgb2JzZXJ2YWJsZSBvdXRwdXRzIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLl9tYXAgPSBuZXcgT2JzZXJ2YWJsZU1hcCgpO1xuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2NoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9tb2RlbERCID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2VyaWFsaXplZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NoYW5nZUd1YXJkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29udGVudEZhY3RvcnkgPVxuICAgICAgICAgICAgb3B0aW9ucy5jb250ZW50RmFjdG9yeSB8fCBBdHRhY2htZW50c01vZGVsLmRlZmF1bHRDb250ZW50RmFjdG9yeTtcbiAgICAgICAgaWYgKG9wdGlvbnMudmFsdWVzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhvcHRpb25zLnZhbHVlcykpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy52YWx1ZXNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgb3B0aW9ucy52YWx1ZXNba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hcC5jaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25NYXBDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgLy8gSWYgd2UgYXJlIGdpdmVuIGEgSU1vZGVsREIsIGtlZXAgYW4gdXAtdG8tZGF0ZVxuICAgICAgICAvLyBzZXJpYWxpemVkIGNvcHkgb2YgdGhlIEF0dGFjaG1lbnRzTW9kZWwgaW4gaXQuXG4gICAgICAgIGlmIChvcHRpb25zLm1vZGVsREIpIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGVsREIgPSBvcHRpb25zLm1vZGVsREI7XG4gICAgICAgICAgICB0aGlzLl9zZXJpYWxpemVkID0gdGhpcy5fbW9kZWxEQi5jcmVhdGVWYWx1ZSgnYXR0YWNobWVudHMnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZXJpYWxpemVkLmdldCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcm9tSlNPTih0aGlzLl9zZXJpYWxpemVkLmdldCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlcmlhbGl6ZWQuc2V0KHRoaXMudG9KU09OKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc2VyaWFsaXplZC5jaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25TZXJpYWxpemVkQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBtb2RlbCBzdGF0ZSBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGdldCBzdGF0ZUNoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZUNoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgbW9kZWwgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBnZXQgY2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBrZXlzIG9mIHRoZSBhdHRhY2htZW50cyBpbiB0aGUgbW9kZWwuXG4gICAgICovXG4gICAgZ2V0IGtleXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAua2V5cygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGxlbmd0aCBvZiB0aGUgaXRlbXMgaW4gdGhlIG1vZGVsLlxuICAgICAqL1xuICAgIGdldCBsZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAua2V5cygpLmxlbmd0aDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIHRoZSBtb2RlbCBpcyBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBtb2RlbC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX21hcC5kaXNwb3NlKCk7XG4gICAgICAgIFNpZ25hbC5jbGVhckRhdGEodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHNwZWNpZmllZCBrZXkgaXMgc2V0LlxuICAgICAqL1xuICAgIGhhcyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC5oYXMoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGFuIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCBrZXkuXG4gICAgICovXG4gICAgZ2V0KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLmdldChrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHZhbHVlIGF0IHRoZSBzcGVjaWZpZWQga2V5LlxuICAgICAqL1xuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIC8vIE5vcm1hbGl6ZSBzdHJlYW0gZGF0YS5cbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX2NyZWF0ZUl0ZW0oeyB2YWx1ZSB9KTtcbiAgICAgICAgdGhpcy5fbWFwLnNldChrZXksIGl0ZW0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdGhlIGF0dGFjaG1lbnQgd2hvc2UgbmFtZSBpcyB0aGUgc3BlY2lmaWVkIGtleVxuICAgICAqL1xuICAgIHJlbW92ZShrZXkpIHtcbiAgICAgICAgdGhpcy5fbWFwLmRlbGV0ZShrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhciBhbGwgb2YgdGhlIGF0dGFjaG1lbnRzLlxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9tYXAudmFsdWVzKCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5kaXNwb3NlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9tYXAuY2xlYXIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVzZXJpYWxpemUgdGhlIG1vZGVsIGZyb20gSlNPTi5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIHdpbGwgY2xlYXIgYW55IGV4aXN0aW5nIGRhdGEuXG4gICAgICovXG4gICAgZnJvbUpTT04odmFsdWVzKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgT2JqZWN0LmtleXModmFsdWVzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWVzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgdmFsdWVzW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VyaWFsaXplIHRoZSBtb2RlbCB0byBKU09OLlxuICAgICAqL1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3QgcmV0ID0ge307XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMuX21hcC5rZXlzKCkpIHtcbiAgICAgICAgICAgIHJldFtrZXldID0gdGhpcy5fbWFwLmdldChrZXkpLnRvSlNPTigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBhdHRhY2htZW50IGl0ZW0gYW5kIGhvb2sgdXAgaXRzIHNpZ25hbHMuXG4gICAgICovXG4gICAgX2NyZWF0ZUl0ZW0ob3B0aW9ucykge1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5jb250ZW50RmFjdG9yeTtcbiAgICAgICAgY29uc3QgaXRlbSA9IGZhY3RvcnkuY3JlYXRlQXR0YWNobWVudE1vZGVsKG9wdGlvbnMpO1xuICAgICAgICBpdGVtLmNoYW5nZWQuY29ubmVjdCh0aGlzLl9vbkdlbmVyaWNDaGFuZ2UsIHRoaXMpO1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBsaXN0LlxuICAgICAqL1xuICAgIF9vbk1hcENoYW5nZWQoc2VuZGVyLCBhcmdzKSB7XG4gICAgICAgIGlmICh0aGlzLl9zZXJpYWxpemVkICYmICF0aGlzLl9jaGFuZ2VHdWFyZCkge1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlR3VhcmQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fc2VyaWFsaXplZC5zZXQodGhpcy50b0pTT04oKSk7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VHdWFyZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdChhcmdzKTtcbiAgICAgICAgdGhpcy5fc3RhdGVDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgdGhlIHNlcmlhbGl6ZWQgdmVyc2lvbiBvZiB0aGUgb3V0cHV0cyBoYXZlIGNoYW5nZWQgZHVlIHRvIGEgcmVtb3RlXG4gICAgICogYWN0aW9uLCB0aGVuIHVwZGF0ZSB0aGUgbW9kZWwgYWNjb3JkaW5nbHkuXG4gICAgICovXG4gICAgX29uU2VyaWFsaXplZENoYW5nZWQoc2VuZGVyLCBhcmdzKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2hhbmdlR3VhcmQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZUd1YXJkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZnJvbUpTT04oYXJncy5uZXdWYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VHdWFyZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSB0byBhbiBpdGVtLlxuICAgICAqL1xuICAgIF9vbkdlbmVyaWNDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgfVxufVxuLyoqXG4gKiBUaGUgbmFtZXNwYWNlIGZvciBBdHRhY2htZW50c01vZGVsIGNsYXNzIHN0YXRpY3MuXG4gKi9cbihmdW5jdGlvbiAoQXR0YWNobWVudHNNb2RlbCkge1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGEgYElBdHRhY2htZW50c01vZGVsLklDb250ZW50RmFjdG9yeWAuXG4gICAgICovXG4gICAgY2xhc3MgQ29udGVudEZhY3Rvcnkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGFuIGF0dGFjaG1lbnQgbW9kZWwuXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVBdHRhY2htZW50TW9kZWwob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBdHRhY2htZW50TW9kZWwob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQXR0YWNobWVudHNNb2RlbC5Db250ZW50RmFjdG9yeSA9IENvbnRlbnRGYWN0b3J5O1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGF0dGFjaG1lbnQgbW9kZWwgZmFjdG9yeS5cbiAgICAgKi9cbiAgICBBdHRhY2htZW50c01vZGVsLmRlZmF1bHRDb250ZW50RmFjdG9yeSA9IG5ldyBDb250ZW50RmFjdG9yeSgpO1xufSkoQXR0YWNobWVudHNNb2RlbCB8fCAoQXR0YWNobWVudHNNb2RlbCA9IHt9KSk7XG4vKipcbiAqIEEgcmVzb2x2ZXIgZm9yIGNlbGwgYXR0YWNobWVudHMgJ2F0dGFjaG1lbnQ6ZmlsZW5hbWUnLlxuICpcbiAqIFdpbGwgcmVzb2x2ZSB0byBhIGRhdGE6IHVybC5cbiAqL1xuZXhwb3J0IGNsYXNzIEF0dGFjaG1lbnRzUmVzb2x2ZXIge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBhdHRhY2htZW50cyByZXNvbHZlciBvYmplY3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBvcHRpb25zLnBhcmVudCB8fCBudWxsO1xuICAgICAgICB0aGlzLl9tb2RlbCA9IG9wdGlvbnMubW9kZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc29sdmUgYSByZWxhdGl2ZSB1cmwgdG8gYSBjb3JyZWN0IHNlcnZlciBwYXRoLlxuICAgICAqL1xuICAgIGFzeW5jIHJlc29sdmVVcmwodXJsKSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQgJiYgIXVybC5zdGFydHNXaXRoKCdhdHRhY2htZW50OicpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50LnJlc29sdmVVcmwodXJsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGRvd25sb2FkIHVybCBvZiBhIGdpdmVuIGFic29sdXRlIHNlcnZlciBwYXRoLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSByZXR1cm5lZCBVUkwgbWF5IGluY2x1ZGUgYSBxdWVyeSBwYXJhbWV0ZXIuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0RG93bmxvYWRVcmwocGF0aCkge1xuICAgICAgICBpZiAodGhpcy5fcGFyZW50ICYmICFwYXRoLnN0YXJ0c1dpdGgoJ2F0dGFjaG1lbnQ6JykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQuZ2V0RG93bmxvYWRVcmwocGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmV0dXJuIGEgZGF0YSBVUkwgd2l0aCB0aGUgZGF0YSBvZiB0aGUgdXJsXG4gICAgICAgIGNvbnN0IGtleSA9IHBhdGguc2xpY2UoJ2F0dGFjaG1lbnQ6Jy5sZW5ndGgpO1xuICAgICAgICBjb25zdCBhdHRhY2htZW50ID0gdGhpcy5fbW9kZWwuZ2V0KGtleSk7XG4gICAgICAgIGlmIChhdHRhY2htZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIFJlc29sdmUgd2l0aCB1bnByb2Nlc3NlZCBwYXRoLCB0byBzaG93IGFzIGJyb2tlbiBpbWFnZVxuICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhdHRhY2htZW50O1xuICAgICAgICBjb25zdCBtaW1lVHlwZSA9IE9iamVjdC5rZXlzKGRhdGEpWzBdO1xuICAgICAgICAvLyBPbmx5IHN1cHBvcnQga25vd24gc2FmZSB0eXBlczpcbiAgICAgICAgaWYgKG1pbWVUeXBlID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIGltYWdlUmVuZGVyZXJGYWN0b3J5Lm1pbWVUeXBlcy5pbmRleE9mKG1pbWVUeXBlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHJlbmRlciB1bmtub3duIGltYWdlIG1pbWUgdHlwZSBcIiR7bWltZVR5cGV9XCIuYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YVVybCA9IGBkYXRhOiR7bWltZVR5cGV9O2Jhc2U2NCwke2RhdGFbbWltZVR5cGVdfWA7XG4gICAgICAgIHJldHVybiBkYXRhVXJsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBVUkwgc2hvdWxkIGJlIGhhbmRsZWQgYnkgdGhlIHJlc29sdmVyXG4gICAgICogb3Igbm90LlxuICAgICAqL1xuICAgIGlzTG9jYWwodXJsKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBpZiAodGhpcy5fcGFyZW50ICYmICF1cmwuc3RhcnRzV2l0aCgnYXR0YWNobWVudDonKSkge1xuICAgICAgICAgICAgcmV0dXJuIChfYyA9IChfYiA9IChfYSA9IHRoaXMuX3BhcmVudCkuaXNMb2NhbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EsIHVybCkpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9kZWwuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==