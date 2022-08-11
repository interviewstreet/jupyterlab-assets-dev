(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_imageviewer_lib_index_js-_60a71"],{

/***/ "../../packages/imageviewer/lib/index.js":
/*!***********************************************!*\
  !*** ../../packages/imageviewer/lib/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IImageTracker": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_0__.IImageTracker),
/* harmony export */   "ImageViewer": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_1__.ImageViewer),
/* harmony export */   "ImageViewerFactory": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_1__.ImageViewerFactory)
/* harmony export */ });
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokens */ "../../packages/imageviewer/lib/tokens.js");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widget */ "../../packages/imageviewer/lib/widget.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module imageviewer
 */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/imageviewer/lib/tokens.js":
/*!************************************************!*\
  !*** ../../packages/imageviewer/lib/tokens.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IImageTracker": () => (/* binding */ IImageTracker)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The image tracker token.
 */
const IImageTracker = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/imageviewer:IImageTracker');
/* tslint:enable */
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/imageviewer/lib/widget.js":
/*!************************************************!*\
  !*** ../../packages/imageviewer/lib/widget.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageViewer": () => (/* binding */ ImageViewer),
/* harmony export */   "ImageViewerFactory": () => (/* binding */ ImageViewerFactory)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_4__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.





/**
 * The class name added to a imageviewer.
 */
const IMAGE_CLASS = 'jp-ImageViewer';
/**
 * A widget for images.
 */
class ImageViewer extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget {
    /**
     * Construct a new image widget.
     */
    constructor(context) {
        super();
        this._scale = 1;
        this._matrix = [1, 0, 0, 1];
        this._colorinversion = 0;
        this._ready = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.PromiseDelegate();
        this.context = context;
        this.node.tabIndex = 0;
        this.addClass(IMAGE_CLASS);
        this._img = document.createElement('img');
        this.node.appendChild(this._img);
        this._onTitleChanged();
        context.pathChanged.connect(this._onTitleChanged, this);
        void context.ready.then(() => {
            if (this.isDisposed) {
                return;
            }
            const contents = context.contentsModel;
            this._mimeType = contents.mimetype;
            this._render();
            context.model.contentChanged.connect(this.update, this);
            context.fileChanged.connect(this.update, this);
            this._ready.resolve(void 0);
        });
    }
    /**
     * Print in iframe.
     */
    [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Printing.symbol]() {
        return () => _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Printing.printWidget(this);
    }
    /**
     * A promise that resolves when the image viewer is ready.
     */
    get ready() {
        return this._ready.promise;
    }
    /**
     * The scale factor for the image.
     */
    get scale() {
        return this._scale;
    }
    set scale(value) {
        if (value === this._scale) {
            return;
        }
        this._scale = value;
        this._updateStyle();
    }
    /**
     * The color inversion of the image.
     */
    get colorinversion() {
        return this._colorinversion;
    }
    set colorinversion(value) {
        if (value === this._colorinversion) {
            return;
        }
        this._colorinversion = value;
        this._updateStyle();
    }
    /**
     * Dispose of resources held by the image viewer.
     */
    dispose() {
        if (this._img.src) {
            URL.revokeObjectURL(this._img.src || '');
        }
        super.dispose();
    }
    /**
     * Reset rotation and flip transformations.
     */
    resetRotationFlip() {
        this._matrix = [1, 0, 0, 1];
        this._updateStyle();
    }
    /**
     * Rotate the image counter-clockwise (left).
     */
    rotateCounterclockwise() {
        this._matrix = Private.prod(this._matrix, Private.rotateCounterclockwiseMatrix);
        this._updateStyle();
    }
    /**
     * Rotate the image clockwise (right).
     */
    rotateClockwise() {
        this._matrix = Private.prod(this._matrix, Private.rotateClockwiseMatrix);
        this._updateStyle();
    }
    /**
     * Flip the image horizontally.
     */
    flipHorizontal() {
        this._matrix = Private.prod(this._matrix, Private.flipHMatrix);
        this._updateStyle();
    }
    /**
     * Flip the image vertically.
     */
    flipVertical() {
        this._matrix = Private.prod(this._matrix, Private.flipVMatrix);
        this._updateStyle();
    }
    /**
     * Handle `update-request` messages for the widget.
     */
    onUpdateRequest(msg) {
        if (this.isDisposed || !this.context.isReady) {
            return;
        }
        this._render();
    }
    /**
     * Handle `'activate-request'` messages.
     */
    onActivateRequest(msg) {
        this.node.focus();
    }
    /**
     * Handle a change to the title.
     */
    _onTitleChanged() {
        this.title.label = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.basename(this.context.localPath);
    }
    /**
     * Render the widget content.
     */
    _render() {
        const context = this.context;
        const cm = context.contentsModel;
        if (!cm) {
            return;
        }
        const oldurl = this._img.src || '';
        let content = context.model.toString();
        if (cm.format === 'base64') {
            this._img.src = `data:${this._mimeType};base64,${content}`;
        }
        else {
            const a = new Blob([content], { type: this._mimeType });
            this._img.src = URL.createObjectURL(a);
        }
        URL.revokeObjectURL(oldurl);
    }
    /**
     * Update the image CSS style, including the transform and filter.
     */
    _updateStyle() {
        const [a, b, c, d] = this._matrix;
        const [tX, tY] = Private.prodVec(this._matrix, [1, 1]);
        const transform = `matrix(${a}, ${b}, ${c}, ${d}, 0, 0) translate(${tX < 0 ? -100 : 0}%, ${tY < 0 ? -100 : 0}%) `;
        this._img.style.transform = `scale(${this._scale}) ${transform}`;
        this._img.style.filter = `invert(${this._colorinversion})`;
    }
}
/**
 * A widget factory for images.
 */
class ImageViewerFactory extends _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__.ABCWidgetFactory {
    /**
     * Create a new widget given a context.
     */
    createNewWidget(context) {
        const content = new ImageViewer(context);
        const widget = new _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__.DocumentWidget({ content, context });
        return widget;
    }
}
/**
 * A namespace for image widget private data.
 */
var Private;
(function (Private) {
    /**
     * Multiply 2x2 matrices.
     */
    function prod([a11, a12, a21, a22], [b11, b12, b21, b22]) {
        return [
            a11 * b11 + a12 * b21,
            a11 * b12 + a12 * b22,
            a21 * b11 + a22 * b21,
            a21 * b12 + a22 * b22
        ];
    }
    Private.prod = prod;
    /**
     * Multiply a 2x2 matrix and a 2x1 vector.
     */
    function prodVec([a11, a12, a21, a22], [b1, b2]) {
        return [a11 * b1 + a12 * b2, a21 * b1 + a22 * b2];
    }
    Private.prodVec = prodVec;
    /**
     * Clockwise rotation transformation matrix.
     */
    Private.rotateClockwiseMatrix = [0, 1, -1, 0];
    /**
     * Counter-clockwise rotation transformation matrix.
     */
    Private.rotateCounterclockwiseMatrix = [0, -1, 1, 0];
    /**
     * Horizontal flip transformation matrix.
     */
    Private.flipHMatrix = [-1, 0, 0, 1];
    /**
     * Vertical flip transformation matrix.
     */
    Private.flipVMatrix = [1, 0, 0, -1];
})(Private || (Private = {}));
//# sourceMappingURL=widget.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvaW1hZ2V2aWV3ZXIvbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9pbWFnZXZpZXdlci9saWIvdG9rZW5zLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9pbWFnZXZpZXdlci9saWIvd2lkZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3lCO0FBQ0E7QUFDekIsaUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUMwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNPLDBCQUEwQixvREFBSztBQUN0QztBQUNBLGtDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFDZ0Q7QUFDQTtBQUMyQjtBQUN2QjtBQUNYO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sMEJBQTBCLG1EQUFNO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsOERBQWU7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssaUVBQWU7QUFDcEIscUJBQXFCLHNFQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsbUVBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLGdCQUFnQixTQUFTLFFBQVE7QUFDckU7QUFDQTtBQUNBLDJDQUEyQyx1QkFBdUI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxvQkFBb0Isa0JBQWtCLEtBQUssa0JBQWtCO0FBQ3JILDZDQUE2QyxZQUFZLElBQUksVUFBVTtBQUN2RSwyQ0FBMkMscUJBQXFCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxpQ0FBaUMscUVBQWdCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsbUVBQWMsRUFBRSxtQkFBbUI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQixrQyIsImZpbGUiOiJwYWNrYWdlc19pbWFnZXZpZXdlcl9saWJfaW5kZXhfanMtXzYwYTcxLjFhZmM3NzkyY2IzYzkwZDA1ZTlmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgaW1hZ2V2aWV3ZXJcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi90b2tlbnMnO1xuZXhwb3J0ICogZnJvbSAnLi93aWRnZXQnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG4vKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLyoqXG4gKiBUaGUgaW1hZ2UgdHJhY2tlciB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IElJbWFnZVRyYWNrZXIgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL2ltYWdldmlld2VyOklJbWFnZVRyYWNrZXInKTtcbi8qIHRzbGludDplbmFibGUgKi9cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRva2Vucy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBQYXRoRXh0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IFByaW50aW5nIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgQUJDV2lkZ2V0RmFjdG9yeSwgRG9jdW1lbnRXaWRnZXQgfSBmcm9tICdAanVweXRlcmxhYi9kb2NyZWdpc3RyeSc7XG5pbXBvcnQgeyBQcm9taXNlRGVsZWdhdGUgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBhIGltYWdldmlld2VyLlxuICovXG5jb25zdCBJTUFHRV9DTEFTUyA9ICdqcC1JbWFnZVZpZXdlcic7XG4vKipcbiAqIEEgd2lkZ2V0IGZvciBpbWFnZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbWFnZVZpZXdlciBleHRlbmRzIFdpZGdldCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IGltYWdlIHdpZGdldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3NjYWxlID0gMTtcbiAgICAgICAgdGhpcy5fbWF0cml4ID0gWzEsIDAsIDAsIDFdO1xuICAgICAgICB0aGlzLl9jb2xvcmludmVyc2lvbiA9IDA7XG4gICAgICAgIHRoaXMuX3JlYWR5ID0gbmV3IFByb21pc2VEZWxlZ2F0ZSgpO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLm5vZGUudGFiSW5kZXggPSAwO1xuICAgICAgICB0aGlzLmFkZENsYXNzKElNQUdFX0NMQVNTKTtcbiAgICAgICAgdGhpcy5faW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZCh0aGlzLl9pbWcpO1xuICAgICAgICB0aGlzLl9vblRpdGxlQ2hhbmdlZCgpO1xuICAgICAgICBjb250ZXh0LnBhdGhDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25UaXRsZUNoYW5nZWQsIHRoaXMpO1xuICAgICAgICB2b2lkIGNvbnRleHQucmVhZHkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY29udGVudHMgPSBjb250ZXh0LmNvbnRlbnRzTW9kZWw7XG4gICAgICAgICAgICB0aGlzLl9taW1lVHlwZSA9IGNvbnRlbnRzLm1pbWV0eXBlO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgICAgICAgICBjb250ZXh0Lm1vZGVsLmNvbnRlbnRDaGFuZ2VkLmNvbm5lY3QodGhpcy51cGRhdGUsIHRoaXMpO1xuICAgICAgICAgICAgY29udGV4dC5maWxlQ2hhbmdlZC5jb25uZWN0KHRoaXMudXBkYXRlLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX3JlYWR5LnJlc29sdmUodm9pZCAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByaW50IGluIGlmcmFtZS5cbiAgICAgKi9cbiAgICBbUHJpbnRpbmcuc3ltYm9sXSgpIHtcbiAgICAgICAgcmV0dXJuICgpID0+IFByaW50aW5nLnByaW50V2lkZ2V0KHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBpbWFnZSB2aWV3ZXIgaXMgcmVhZHkuXG4gICAgICovXG4gICAgZ2V0IHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVhZHkucHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHNjYWxlIGZhY3RvciBmb3IgdGhlIGltYWdlLlxuICAgICAqL1xuICAgIGdldCBzY2FsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlO1xuICAgIH1cbiAgICBzZXQgc2NhbGUodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLl9zY2FsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NjYWxlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVN0eWxlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjb2xvciBpbnZlcnNpb24gb2YgdGhlIGltYWdlLlxuICAgICAqL1xuICAgIGdldCBjb2xvcmludmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yaW52ZXJzaW9uO1xuICAgIH1cbiAgICBzZXQgY29sb3JpbnZlcnNpb24odmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLl9jb2xvcmludmVyc2lvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NvbG9yaW52ZXJzaW9uID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVN0eWxlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIGltYWdlIHZpZXdlci5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5faW1nLnNyYykge1xuICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh0aGlzLl9pbWcuc3JjIHx8ICcnKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc2V0IHJvdGF0aW9uIGFuZCBmbGlwIHRyYW5zZm9ybWF0aW9ucy5cbiAgICAgKi9cbiAgICByZXNldFJvdGF0aW9uRmxpcCgpIHtcbiAgICAgICAgdGhpcy5fbWF0cml4ID0gWzEsIDAsIDAsIDFdO1xuICAgICAgICB0aGlzLl91cGRhdGVTdHlsZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSb3RhdGUgdGhlIGltYWdlIGNvdW50ZXItY2xvY2t3aXNlIChsZWZ0KS5cbiAgICAgKi9cbiAgICByb3RhdGVDb3VudGVyY2xvY2t3aXNlKCkge1xuICAgICAgICB0aGlzLl9tYXRyaXggPSBQcml2YXRlLnByb2QodGhpcy5fbWF0cml4LCBQcml2YXRlLnJvdGF0ZUNvdW50ZXJjbG9ja3dpc2VNYXRyaXgpO1xuICAgICAgICB0aGlzLl91cGRhdGVTdHlsZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSb3RhdGUgdGhlIGltYWdlIGNsb2Nrd2lzZSAocmlnaHQpLlxuICAgICAqL1xuICAgIHJvdGF0ZUNsb2Nrd2lzZSgpIHtcbiAgICAgICAgdGhpcy5fbWF0cml4ID0gUHJpdmF0ZS5wcm9kKHRoaXMuX21hdHJpeCwgUHJpdmF0ZS5yb3RhdGVDbG9ja3dpc2VNYXRyaXgpO1xuICAgICAgICB0aGlzLl91cGRhdGVTdHlsZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGbGlwIHRoZSBpbWFnZSBob3Jpem9udGFsbHkuXG4gICAgICovXG4gICAgZmxpcEhvcml6b250YWwoKSB7XG4gICAgICAgIHRoaXMuX21hdHJpeCA9IFByaXZhdGUucHJvZCh0aGlzLl9tYXRyaXgsIFByaXZhdGUuZmxpcEhNYXRyaXgpO1xuICAgICAgICB0aGlzLl91cGRhdGVTdHlsZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGbGlwIHRoZSBpbWFnZSB2ZXJ0aWNhbGx5LlxuICAgICAqL1xuICAgIGZsaXBWZXJ0aWNhbCgpIHtcbiAgICAgICAgdGhpcy5fbWF0cml4ID0gUHJpdmF0ZS5wcm9kKHRoaXMuX21hdHJpeCwgUHJpdmF0ZS5mbGlwVk1hdHJpeCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVN0eWxlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgdXBkYXRlLXJlcXVlc3RgIG1lc3NhZ2VzIGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIG9uVXBkYXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCB8fCAhdGhpcy5jb250ZXh0LmlzUmVhZHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGAnYWN0aXZhdGUtcmVxdWVzdCdgIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIG9uQWN0aXZhdGVSZXF1ZXN0KG1zZykge1xuICAgICAgICB0aGlzLm5vZGUuZm9jdXMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSB0aXRsZS5cbiAgICAgKi9cbiAgICBfb25UaXRsZUNoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMudGl0bGUubGFiZWwgPSBQYXRoRXh0LmJhc2VuYW1lKHRoaXMuY29udGV4dC5sb2NhbFBhdGgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgdGhlIHdpZGdldCBjb250ZW50LlxuICAgICAqL1xuICAgIF9yZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IGNtID0gY29udGV4dC5jb250ZW50c01vZGVsO1xuICAgICAgICBpZiAoIWNtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb2xkdXJsID0gdGhpcy5faW1nLnNyYyB8fCAnJztcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBjb250ZXh0Lm1vZGVsLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmIChjbS5mb3JtYXQgPT09ICdiYXNlNjQnKSB7XG4gICAgICAgICAgICB0aGlzLl9pbWcuc3JjID0gYGRhdGE6JHt0aGlzLl9taW1lVHlwZX07YmFzZTY0LCR7Y29udGVudH1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgYSA9IG5ldyBCbG9iKFtjb250ZW50XSwgeyB0eXBlOiB0aGlzLl9taW1lVHlwZSB9KTtcbiAgICAgICAgICAgIHRoaXMuX2ltZy5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGEpO1xuICAgICAgICB9XG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwob2xkdXJsKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBpbWFnZSBDU1Mgc3R5bGUsIGluY2x1ZGluZyB0aGUgdHJhbnNmb3JtIGFuZCBmaWx0ZXIuXG4gICAgICovXG4gICAgX3VwZGF0ZVN0eWxlKCkge1xuICAgICAgICBjb25zdCBbYSwgYiwgYywgZF0gPSB0aGlzLl9tYXRyaXg7XG4gICAgICAgIGNvbnN0IFt0WCwgdFldID0gUHJpdmF0ZS5wcm9kVmVjKHRoaXMuX21hdHJpeCwgWzEsIDFdKTtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gYG1hdHJpeCgke2F9LCAke2J9LCAke2N9LCAke2R9LCAwLCAwKSB0cmFuc2xhdGUoJHt0WCA8IDAgPyAtMTAwIDogMH0lLCAke3RZIDwgMCA/IC0xMDAgOiAwfSUpIGA7XG4gICAgICAgIHRoaXMuX2ltZy5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoJHt0aGlzLl9zY2FsZX0pICR7dHJhbnNmb3JtfWA7XG4gICAgICAgIHRoaXMuX2ltZy5zdHlsZS5maWx0ZXIgPSBgaW52ZXJ0KCR7dGhpcy5fY29sb3JpbnZlcnNpb259KWA7XG4gICAgfVxufVxuLyoqXG4gKiBBIHdpZGdldCBmYWN0b3J5IGZvciBpbWFnZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbWFnZVZpZXdlckZhY3RvcnkgZXh0ZW5kcyBBQkNXaWRnZXRGYWN0b3J5IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgd2lkZ2V0IGdpdmVuIGEgY29udGV4dC5cbiAgICAgKi9cbiAgICBjcmVhdGVOZXdXaWRnZXQoY29udGV4dCkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gbmV3IEltYWdlVmlld2VyKGNvbnRleHQpO1xuICAgICAgICBjb25zdCB3aWRnZXQgPSBuZXcgRG9jdW1lbnRXaWRnZXQoeyBjb250ZW50LCBjb250ZXh0IH0pO1xuICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH1cbn1cbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIGltYWdlIHdpZGdldCBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogTXVsdGlwbHkgMngyIG1hdHJpY2VzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHByb2QoW2ExMSwgYTEyLCBhMjEsIGEyMl0sIFtiMTEsIGIxMiwgYjIxLCBiMjJdKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBhMTEgKiBiMTEgKyBhMTIgKiBiMjEsXG4gICAgICAgICAgICBhMTEgKiBiMTIgKyBhMTIgKiBiMjIsXG4gICAgICAgICAgICBhMjEgKiBiMTEgKyBhMjIgKiBiMjEsXG4gICAgICAgICAgICBhMjEgKiBiMTIgKyBhMjIgKiBiMjJcbiAgICAgICAgXTtcbiAgICB9XG4gICAgUHJpdmF0ZS5wcm9kID0gcHJvZDtcbiAgICAvKipcbiAgICAgKiBNdWx0aXBseSBhIDJ4MiBtYXRyaXggYW5kIGEgMngxIHZlY3Rvci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcm9kVmVjKFthMTEsIGExMiwgYTIxLCBhMjJdLCBbYjEsIGIyXSkge1xuICAgICAgICByZXR1cm4gW2ExMSAqIGIxICsgYTEyICogYjIsIGEyMSAqIGIxICsgYTIyICogYjJdO1xuICAgIH1cbiAgICBQcml2YXRlLnByb2RWZWMgPSBwcm9kVmVjO1xuICAgIC8qKlxuICAgICAqIENsb2Nrd2lzZSByb3RhdGlvbiB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguXG4gICAgICovXG4gICAgUHJpdmF0ZS5yb3RhdGVDbG9ja3dpc2VNYXRyaXggPSBbMCwgMSwgLTEsIDBdO1xuICAgIC8qKlxuICAgICAqIENvdW50ZXItY2xvY2t3aXNlIHJvdGF0aW9uIHRyYW5zZm9ybWF0aW9uIG1hdHJpeC5cbiAgICAgKi9cbiAgICBQcml2YXRlLnJvdGF0ZUNvdW50ZXJjbG9ja3dpc2VNYXRyaXggPSBbMCwgLTEsIDEsIDBdO1xuICAgIC8qKlxuICAgICAqIEhvcml6b250YWwgZmxpcCB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguXG4gICAgICovXG4gICAgUHJpdmF0ZS5mbGlwSE1hdHJpeCA9IFstMSwgMCwgMCwgMV07XG4gICAgLyoqXG4gICAgICogVmVydGljYWwgZmxpcCB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguXG4gICAgICovXG4gICAgUHJpdmF0ZS5mbGlwVk1hdHJpeCA9IFsxLCAwLCAwLCAtMV07XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpZGdldC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9