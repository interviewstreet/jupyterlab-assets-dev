(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_pdf-extension_lib_index_js"],{

/***/ "../../packages/pdf-extension/lib/index.js":
/*!*************************************************!*\
  !*** ../../packages/pdf-extension/lib/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderedPDF": () => (/* binding */ RenderedPDF),
/* harmony export */   "rendererFactory": () => (/* binding */ rendererFactory),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module pdf-extension
 */



/**
 * The MIME type for PDF.
 */
const MIME_TYPE = 'application/pdf';
/**
 * A class for rendering a PDF document.
 */
class RenderedPDF extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget {
    constructor() {
        super();
        this._base64 = '';
        this._disposable = null;
        this._ready = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.PromiseDelegate();
        this.addClass('jp-PDFContainer');
        // We put the object in an iframe, which seems to have a better chance
        // of retaining its scroll position upon tab focusing, moving around etc.
        const iframe = document.createElement('iframe');
        this.node.appendChild(iframe);
        // The iframe content window is not available until the onload event.
        iframe.onload = () => {
            const body = iframe.contentWindow.document.createElement('body');
            body.style.margin = '0px';
            iframe.contentWindow.document.body = body;
            this._object = iframe.contentWindow.document.createElement('object');
            // work around for https://discussions.apple.com/thread/252247740
            // Detect if running on Desktop Safari
            if (!window.safari) {
                this._object.type = MIME_TYPE;
            }
            this._object.width = '100%';
            this._object.height = '100%';
            body.appendChild(this._object);
            this._ready.resolve(void 0);
        };
    }
    /**
     * Render PDF into this widget's node.
     */
    async renderModel(model) {
        await this._ready.promise;
        const data = model.data[MIME_TYPE];
        if (!data ||
            (data.length === this._base64.length && data === this._base64)) {
            // If there is no data, or if the string has not changed, we do not
            // need to re-parse the data and rerender. We do, however, check
            // for a fragment if the user wants to scroll the output.
            if (model.metadata.fragment && this._object.data) {
                const url = this._object.data;
                this._object.data = `${url.split('#')[0]}${model.metadata.fragment}`;
            }
            // For some opaque reason, Firefox seems to loose its scroll position
            // upon unhiding a PDF. But triggering a refresh of the URL makes it
            // find it again. No idea what the reason for this is.
            if (Private.IS_FIREFOX) {
                this._object.data = this._object.data; // eslint-disable-line
            }
            return Promise.resolve(void 0);
        }
        this._base64 = data;
        const blob = Private.b64toBlob(data, MIME_TYPE);
        // Release reference to any previous object url.
        if (this._disposable) {
            this._disposable.dispose();
        }
        let objectUrl = URL.createObjectURL(blob);
        if (model.metadata.fragment) {
            objectUrl += model.metadata.fragment;
        }
        this._object.data = objectUrl;
        // Set the disposable release the object URL.
        this._disposable = new _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__.DisposableDelegate(() => {
            try {
                URL.revokeObjectURL(objectUrl);
            }
            catch (error) {
                /* no-op */
            }
        });
        return;
    }
    /**
     * Handle a `before-hide` message.
     */
    onBeforeHide() {
        // Dispose of any URL fragment before hiding the widget
        // so that it is not remembered upon show. Only Firefox
        // seems to have a problem with this.
        if (Private.IS_FIREFOX) {
            this._object.data = this._object.data.split('#')[0];
        }
    }
    /**
     * Dispose of the resources held by the pdf widget.
     */
    dispose() {
        if (this._disposable) {
            this._disposable.dispose();
        }
        super.dispose();
    }
}
/**
 * A mime renderer factory for PDF data.
 */
const rendererFactory = {
    safe: false,
    mimeTypes: [MIME_TYPE],
    defaultRank: 100,
    createRenderer: options => new RenderedPDF()
};
const extensions = [
    {
        id: '@jupyterlab/pdf-extension:factory',
        rendererFactory,
        dataType: 'string',
        documentWidgetFactoryOptions: {
            name: 'PDF',
            modelName: 'base64',
            primaryFileType: 'PDF',
            fileTypes: ['PDF'],
            defaultFor: ['PDF']
        }
    }
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extensions);
/**
 * A namespace for PDF widget private data.
 */
var Private;
(function (Private) {
    /**
     * A flag for determining whether the user is using Firefox.
     * There are some different PDF viewer behaviors on Firefox,
     * and we try to address them with this. User agent string parsing
     * is *not* reliable, so this should be considered a best-effort test.
     */
    Private.IS_FIREFOX = /Firefox/.test(navigator.userAgent);
    /**
     * Convert a base64 encoded string to a Blob object.
     * Modified from a snippet found here:
     * https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
     *
     * @param b64Data - The base64 encoded data.
     *
     * @param contentType - The mime type of the data.
     *
     * @param sliceSize - The size to chunk the data into for processing.
     *
     * @returns a Blob for the data.
     */
    function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    }
    Private.b64toBlob = b64toBlob;
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvcGRmLWV4dGVuc2lvbi9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ29EO0FBQ0k7QUFDZjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLDBCQUEwQixtREFBTTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiw4REFBZTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLGtCQUFrQixFQUFFLHdCQUF3QjtBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrRUFBa0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsVUFBVSxFQUFDO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdDQUFnQztBQUM1RDtBQUNBO0FBQ0EsMkJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLG9CQUFvQjtBQUN6RDtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0IsaUMiLCJmaWxlIjoicGFja2FnZXNfcGRmLWV4dGVuc2lvbl9saWJfaW5kZXhfanMuMGRhYjZhYzU2MGU5N2QyOTY3YjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBwZGYtZXh0ZW5zaW9uXG4gKi9cbmltcG9ydCB7IFByb21pc2VEZWxlZ2F0ZSB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbmltcG9ydCB7IERpc3Bvc2FibGVEZWxlZ2F0ZSB9IGZyb20gJ0BsdW1pbm8vZGlzcG9zYWJsZSc7XG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuLyoqXG4gKiBUaGUgTUlNRSB0eXBlIGZvciBQREYuXG4gKi9cbmNvbnN0IE1JTUVfVFlQRSA9ICdhcHBsaWNhdGlvbi9wZGYnO1xuLyoqXG4gKiBBIGNsYXNzIGZvciByZW5kZXJpbmcgYSBQREYgZG9jdW1lbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZW5kZXJlZFBERiBleHRlbmRzIFdpZGdldCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2Jhc2U2NCA9ICcnO1xuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVhZHkgPSBuZXcgUHJvbWlzZURlbGVnYXRlKCk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLVBERkNvbnRhaW5lcicpO1xuICAgICAgICAvLyBXZSBwdXQgdGhlIG9iamVjdCBpbiBhbiBpZnJhbWUsIHdoaWNoIHNlZW1zIHRvIGhhdmUgYSBiZXR0ZXIgY2hhbmNlXG4gICAgICAgIC8vIG9mIHJldGFpbmluZyBpdHMgc2Nyb2xsIHBvc2l0aW9uIHVwb24gdGFiIGZvY3VzaW5nLCBtb3ZpbmcgYXJvdW5kIGV0Yy5cbiAgICAgICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgICAvLyBUaGUgaWZyYW1lIGNvbnRlbnQgd2luZG93IGlzIG5vdCBhdmFpbGFibGUgdW50aWwgdGhlIG9ubG9hZCBldmVudC5cbiAgICAgICAgaWZyYW1lLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdib2R5Jyk7XG4gICAgICAgICAgICBib2R5LnN0eWxlLm1hcmdpbiA9ICcwcHgnO1xuICAgICAgICAgICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuYm9keSA9IGJvZHk7XG4gICAgICAgICAgICB0aGlzLl9vYmplY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKTtcbiAgICAgICAgICAgIC8vIHdvcmsgYXJvdW5kIGZvciBodHRwczovL2Rpc2N1c3Npb25zLmFwcGxlLmNvbS90aHJlYWQvMjUyMjQ3NzQwXG4gICAgICAgICAgICAvLyBEZXRlY3QgaWYgcnVubmluZyBvbiBEZXNrdG9wIFNhZmFyaVxuICAgICAgICAgICAgaWYgKCF3aW5kb3cuc2FmYXJpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb2JqZWN0LnR5cGUgPSBNSU1FX1RZUEU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9vYmplY3Qud2lkdGggPSAnMTAwJSc7XG4gICAgICAgICAgICB0aGlzLl9vYmplY3QuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9vYmplY3QpO1xuICAgICAgICAgICAgdGhpcy5fcmVhZHkucmVzb2x2ZSh2b2lkIDApO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgUERGIGludG8gdGhpcyB3aWRnZXQncyBub2RlLlxuICAgICAqL1xuICAgIGFzeW5jIHJlbmRlck1vZGVsKG1vZGVsKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3JlYWR5LnByb21pc2U7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBtb2RlbC5kYXRhW01JTUVfVFlQRV07XG4gICAgICAgIGlmICghZGF0YSB8fFxuICAgICAgICAgICAgKGRhdGEubGVuZ3RoID09PSB0aGlzLl9iYXNlNjQubGVuZ3RoICYmIGRhdGEgPT09IHRoaXMuX2Jhc2U2NCkpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIGRhdGEsIG9yIGlmIHRoZSBzdHJpbmcgaGFzIG5vdCBjaGFuZ2VkLCB3ZSBkbyBub3RcbiAgICAgICAgICAgIC8vIG5lZWQgdG8gcmUtcGFyc2UgdGhlIGRhdGEgYW5kIHJlcmVuZGVyLiBXZSBkbywgaG93ZXZlciwgY2hlY2tcbiAgICAgICAgICAgIC8vIGZvciBhIGZyYWdtZW50IGlmIHRoZSB1c2VyIHdhbnRzIHRvIHNjcm9sbCB0aGUgb3V0cHV0LlxuICAgICAgICAgICAgaWYgKG1vZGVsLm1ldGFkYXRhLmZyYWdtZW50ICYmIHRoaXMuX29iamVjdC5kYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5fb2JqZWN0LmRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5fb2JqZWN0LmRhdGEgPSBgJHt1cmwuc3BsaXQoJyMnKVswXX0ke21vZGVsLm1ldGFkYXRhLmZyYWdtZW50fWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBGb3Igc29tZSBvcGFxdWUgcmVhc29uLCBGaXJlZm94IHNlZW1zIHRvIGxvb3NlIGl0cyBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgICAgIC8vIHVwb24gdW5oaWRpbmcgYSBQREYuIEJ1dCB0cmlnZ2VyaW5nIGEgcmVmcmVzaCBvZiB0aGUgVVJMIG1ha2VzIGl0XG4gICAgICAgICAgICAvLyBmaW5kIGl0IGFnYWluLiBObyBpZGVhIHdoYXQgdGhlIHJlYXNvbiBmb3IgdGhpcyBpcy5cbiAgICAgICAgICAgIGlmIChQcml2YXRlLklTX0ZJUkVGT1gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vYmplY3QuZGF0YSA9IHRoaXMuX29iamVjdC5kYXRhOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZvaWQgMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYmFzZTY0ID0gZGF0YTtcbiAgICAgICAgY29uc3QgYmxvYiA9IFByaXZhdGUuYjY0dG9CbG9iKGRhdGEsIE1JTUVfVFlQRSk7XG4gICAgICAgIC8vIFJlbGVhc2UgcmVmZXJlbmNlIHRvIGFueSBwcmV2aW91cyBvYmplY3QgdXJsLlxuICAgICAgICBpZiAodGhpcy5fZGlzcG9zYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fZGlzcG9zYWJsZS5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9iamVjdFVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICAgIGlmIChtb2RlbC5tZXRhZGF0YS5mcmFnbWVudCkge1xuICAgICAgICAgICAgb2JqZWN0VXJsICs9IG1vZGVsLm1ldGFkYXRhLmZyYWdtZW50O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29iamVjdC5kYXRhID0gb2JqZWN0VXJsO1xuICAgICAgICAvLyBTZXQgdGhlIGRpc3Bvc2FibGUgcmVsZWFzZSB0aGUgb2JqZWN0IFVSTC5cbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZSA9IG5ldyBEaXNwb3NhYmxlRGVsZWdhdGUoKCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKG9iamVjdFVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvKiBuby1vcCAqL1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBgYmVmb3JlLWhpZGVgIG1lc3NhZ2UuXG4gICAgICovXG4gICAgb25CZWZvcmVIaWRlKCkge1xuICAgICAgICAvLyBEaXNwb3NlIG9mIGFueSBVUkwgZnJhZ21lbnQgYmVmb3JlIGhpZGluZyB0aGUgd2lkZ2V0XG4gICAgICAgIC8vIHNvIHRoYXQgaXQgaXMgbm90IHJlbWVtYmVyZWQgdXBvbiBzaG93LiBPbmx5IEZpcmVmb3hcbiAgICAgICAgLy8gc2VlbXMgdG8gaGF2ZSBhIHByb2JsZW0gd2l0aCB0aGlzLlxuICAgICAgICBpZiAoUHJpdmF0ZS5JU19GSVJFRk9YKSB7XG4gICAgICAgICAgICB0aGlzLl9vYmplY3QuZGF0YSA9IHRoaXMuX29iamVjdC5kYXRhLnNwbGl0KCcjJylbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIHBkZiB3aWRnZXQuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Rpc3Bvc2FibGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2FibGUuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG59XG4vKipcbiAqIEEgbWltZSByZW5kZXJlciBmYWN0b3J5IGZvciBQREYgZGF0YS5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbmRlcmVyRmFjdG9yeSA9IHtcbiAgICBzYWZlOiBmYWxzZSxcbiAgICBtaW1lVHlwZXM6IFtNSU1FX1RZUEVdLFxuICAgIGRlZmF1bHRSYW5rOiAxMDAsXG4gICAgY3JlYXRlUmVuZGVyZXI6IG9wdGlvbnMgPT4gbmV3IFJlbmRlcmVkUERGKClcbn07XG5jb25zdCBleHRlbnNpb25zID0gW1xuICAgIHtcbiAgICAgICAgaWQ6ICdAanVweXRlcmxhYi9wZGYtZXh0ZW5zaW9uOmZhY3RvcnknLFxuICAgICAgICByZW5kZXJlckZhY3RvcnksXG4gICAgICAgIGRhdGFUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgZG9jdW1lbnRXaWRnZXRGYWN0b3J5T3B0aW9uczoge1xuICAgICAgICAgICAgbmFtZTogJ1BERicsXG4gICAgICAgICAgICBtb2RlbE5hbWU6ICdiYXNlNjQnLFxuICAgICAgICAgICAgcHJpbWFyeUZpbGVUeXBlOiAnUERGJyxcbiAgICAgICAgICAgIGZpbGVUeXBlczogWydQREYnXSxcbiAgICAgICAgICAgIGRlZmF1bHRGb3I6IFsnUERGJ11cbiAgICAgICAgfVxuICAgIH1cbl07XG5leHBvcnQgZGVmYXVsdCBleHRlbnNpb25zO1xuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgUERGIHdpZGdldCBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogQSBmbGFnIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIHRoZSB1c2VyIGlzIHVzaW5nIEZpcmVmb3guXG4gICAgICogVGhlcmUgYXJlIHNvbWUgZGlmZmVyZW50IFBERiB2aWV3ZXIgYmVoYXZpb3JzIG9uIEZpcmVmb3gsXG4gICAgICogYW5kIHdlIHRyeSB0byBhZGRyZXNzIHRoZW0gd2l0aCB0aGlzLiBVc2VyIGFnZW50IHN0cmluZyBwYXJzaW5nXG4gICAgICogaXMgKm5vdCogcmVsaWFibGUsIHNvIHRoaXMgc2hvdWxkIGJlIGNvbnNpZGVyZWQgYSBiZXN0LWVmZm9ydCB0ZXN0LlxuICAgICAqL1xuICAgIFByaXZhdGUuSVNfRklSRUZPWCA9IC9GaXJlZm94Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYSBiYXNlNjQgZW5jb2RlZCBzdHJpbmcgdG8gYSBCbG9iIG9iamVjdC5cbiAgICAgKiBNb2RpZmllZCBmcm9tIGEgc25pcHBldCBmb3VuZCBoZXJlOlxuICAgICAqIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2MjQ1NzY3L2NyZWF0aW5nLWEtYmxvYi1mcm9tLWEtYmFzZTY0LXN0cmluZy1pbi1qYXZhc2NyaXB0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gYjY0RGF0YSAtIFRoZSBiYXNlNjQgZW5jb2RlZCBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRlbnRUeXBlIC0gVGhlIG1pbWUgdHlwZSBvZiB0aGUgZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzbGljZVNpemUgLSBUaGUgc2l6ZSB0byBjaHVuayB0aGUgZGF0YSBpbnRvIGZvciBwcm9jZXNzaW5nLlxuICAgICAqXG4gICAgICogQHJldHVybnMgYSBCbG9iIGZvciB0aGUgZGF0YS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiNjR0b0Jsb2IoYjY0RGF0YSwgY29udGVudFR5cGUgPSAnJywgc2xpY2VTaXplID0gNTEyKSB7XG4gICAgICAgIGNvbnN0IGJ5dGVDaGFyYWN0ZXJzID0gYXRvYihiNjREYXRhKTtcbiAgICAgICAgY29uc3QgYnl0ZUFycmF5cyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBvZmZzZXQgPSAwOyBvZmZzZXQgPCBieXRlQ2hhcmFjdGVycy5sZW5ndGg7IG9mZnNldCArPSBzbGljZVNpemUpIHtcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlID0gYnl0ZUNoYXJhY3RlcnMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBzbGljZVNpemUpO1xuICAgICAgICAgICAgY29uc3QgYnl0ZU51bWJlcnMgPSBuZXcgQXJyYXkoc2xpY2UubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBieXRlTnVtYmVyc1tpXSA9IHNsaWNlLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBieXRlQXJyYXkgPSBuZXcgVWludDhBcnJheShieXRlTnVtYmVycyk7XG4gICAgICAgICAgICBieXRlQXJyYXlzLnB1c2goYnl0ZUFycmF5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEJsb2IoYnl0ZUFycmF5cywgeyB0eXBlOiBjb250ZW50VHlwZSB9KTtcbiAgICB9XG4gICAgUHJpdmF0ZS5iNjR0b0Jsb2IgPSBiNjR0b0Jsb2I7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=