(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_javascript-extension_lib_index_js"],{

/***/ "../../packages/javascript-extension/lib/index.js":
/*!********************************************************!*\
  !*** ../../packages/javascript-extension/lib/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TEXT_JAVASCRIPT_MIMETYPE": () => (/* binding */ TEXT_JAVASCRIPT_MIMETYPE),
/* harmony export */   "APPLICATION_JAVASCRIPT_MIMETYPE": () => (/* binding */ APPLICATION_JAVASCRIPT_MIMETYPE),
/* harmony export */   "ExperimentalRenderedJavascript": () => (/* binding */ ExperimentalRenderedJavascript),
/* harmony export */   "rendererFactory": () => (/* binding */ rendererFactory),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module javascript-extension
 */

const TEXT_JAVASCRIPT_MIMETYPE = 'text/javascript';
const APPLICATION_JAVASCRIPT_MIMETYPE = 'application/javascript';
function evalInContext(code, element, document, window) {
    // eslint-disable-next-line
    return eval(code);
}
class ExperimentalRenderedJavascript extends _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_0__.RenderedJavaScript {
    render(model) {
        const trans = this.translator.load('jupyterlab');
        const renderJavascript = () => {
            try {
                const data = model.data[this.mimeType];
                if (data) {
                    evalInContext(data, this.node, document, window);
                }
                return Promise.resolve();
            }
            catch (error) {
                return Promise.reject(error);
            }
        };
        if (!model.trusted) {
            // If output is not trusted or if arbitrary Javascript execution is not enabled, render an informative error message
            const pre = document.createElement('pre');
            pre.textContent = trans.__('Are you sure that you want to run arbitrary Javascript within your JupyterLab session?');
            const button = document.createElement('button');
            button.textContent = trans.__('Run');
            this.node.appendChild(pre);
            this.node.appendChild(button);
            button.onclick = event => {
                this.node.textContent = '';
                void renderJavascript();
            };
            return Promise.resolve();
        }
        return renderJavascript();
    }
}
/**
 * A mime renderer factory for text/javascript data.
 */
const rendererFactory = {
    safe: false,
    mimeTypes: [TEXT_JAVASCRIPT_MIMETYPE, APPLICATION_JAVASCRIPT_MIMETYPE],
    createRenderer: options => new ExperimentalRenderedJavascript(options)
};
const extension = {
    id: '@jupyterlab/javascript-extension:factory',
    rendererFactory,
    rank: 0,
    dataType: 'string'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extension);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvamF2YXNjcmlwdC1leHRlbnNpb24vbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDNEQ7QUFDckQ7QUFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ08sNkNBQTZDLHNFQUFrQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxTQUFTLEVBQUM7QUFDekIsaUMiLCJmaWxlIjoicGFja2FnZXNfamF2YXNjcmlwdC1leHRlbnNpb25fbGliX2luZGV4X2pzLmEzNTMwMWFiMzQ5MTZmZjMwYmE4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgamF2YXNjcmlwdC1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgUmVuZGVyZWRKYXZhU2NyaXB0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvcmVuZGVybWltZSc7XG5leHBvcnQgY29uc3QgVEVYVF9KQVZBU0NSSVBUX01JTUVUWVBFID0gJ3RleHQvamF2YXNjcmlwdCc7XG5leHBvcnQgY29uc3QgQVBQTElDQVRJT05fSkFWQVNDUklQVF9NSU1FVFlQRSA9ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0JztcbmZ1bmN0aW9uIGV2YWxJbkNvbnRleHQoY29kZSwgZWxlbWVudCwgZG9jdW1lbnQsIHdpbmRvdykge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHJldHVybiBldmFsKGNvZGUpO1xufVxuZXhwb3J0IGNsYXNzIEV4cGVyaW1lbnRhbFJlbmRlcmVkSmF2YXNjcmlwdCBleHRlbmRzIFJlbmRlcmVkSmF2YVNjcmlwdCB7XG4gICAgcmVuZGVyKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdGhpcy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgcmVuZGVySmF2YXNjcmlwdCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IG1vZGVsLmRhdGFbdGhpcy5taW1lVHlwZV07XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZhbEluQ29udGV4dChkYXRhLCB0aGlzLm5vZGUsIGRvY3VtZW50LCB3aW5kb3cpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAoIW1vZGVsLnRydXN0ZWQpIHtcbiAgICAgICAgICAgIC8vIElmIG91dHB1dCBpcyBub3QgdHJ1c3RlZCBvciBpZiBhcmJpdHJhcnkgSmF2YXNjcmlwdCBleGVjdXRpb24gaXMgbm90IGVuYWJsZWQsIHJlbmRlciBhbiBpbmZvcm1hdGl2ZSBlcnJvciBtZXNzYWdlXG4gICAgICAgICAgICBjb25zdCBwcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTtcbiAgICAgICAgICAgIHByZS50ZXh0Q29udGVudCA9IHRyYW5zLl9fKCdBcmUgeW91IHN1cmUgdGhhdCB5b3Ugd2FudCB0byBydW4gYXJiaXRyYXJ5IEphdmFzY3JpcHQgd2l0aGluIHlvdXIgSnVweXRlckxhYiBzZXNzaW9uPycpO1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSB0cmFucy5fXygnUnVuJyk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQocHJlKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgICAgICAgYnV0dG9uLm9uY2xpY2sgPSBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgdm9pZCByZW5kZXJKYXZhc2NyaXB0KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZW5kZXJKYXZhc2NyaXB0KCk7XG4gICAgfVxufVxuLyoqXG4gKiBBIG1pbWUgcmVuZGVyZXIgZmFjdG9yeSBmb3IgdGV4dC9qYXZhc2NyaXB0IGRhdGEuXG4gKi9cbmV4cG9ydCBjb25zdCByZW5kZXJlckZhY3RvcnkgPSB7XG4gICAgc2FmZTogZmFsc2UsXG4gICAgbWltZVR5cGVzOiBbVEVYVF9KQVZBU0NSSVBUX01JTUVUWVBFLCBBUFBMSUNBVElPTl9KQVZBU0NSSVBUX01JTUVUWVBFXSxcbiAgICBjcmVhdGVSZW5kZXJlcjogb3B0aW9ucyA9PiBuZXcgRXhwZXJpbWVudGFsUmVuZGVyZWRKYXZhc2NyaXB0KG9wdGlvbnMpXG59O1xuY29uc3QgZXh0ZW5zaW9uID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvamF2YXNjcmlwdC1leHRlbnNpb246ZmFjdG9yeScsXG4gICAgcmVuZGVyZXJGYWN0b3J5LFxuICAgIHJhbms6IDAsXG4gICAgZGF0YVR5cGU6ICdzdHJpbmcnXG59O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==