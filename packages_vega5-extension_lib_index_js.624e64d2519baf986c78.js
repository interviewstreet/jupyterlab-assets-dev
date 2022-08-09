(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_vega5-extension_lib_index_js"],{

/***/ "../../packages/vega5-extension/lib/index.js":
/*!***************************************************!*\
  !*** ../../packages/vega5-extension/lib/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VEGA_MIME_TYPE": () => (/* binding */ VEGA_MIME_TYPE),
/* harmony export */   "VEGALITE3_MIME_TYPE": () => (/* binding */ VEGALITE3_MIME_TYPE),
/* harmony export */   "VEGALITE4_MIME_TYPE": () => (/* binding */ VEGALITE4_MIME_TYPE),
/* harmony export */   "RenderedVega": () => (/* binding */ RenderedVega),
/* harmony export */   "rendererFactory": () => (/* binding */ rendererFactory),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module vega5-extension
 */

/**
 * The CSS class to add to the Vega and Vega-Lite widget.
 */
const VEGA_COMMON_CLASS = 'jp-RenderedVegaCommon5';
/**
 * The CSS class to add to the Vega.
 */
const VEGA_CLASS = 'jp-RenderedVega5';
/**
 * The CSS class to add to the Vega-Lite.
 */
const VEGALITE_CLASS = 'jp-RenderedVegaLite';
/**
 * The MIME type for Vega.
 *
 * #### Notes
 * The version of this follows the major version of Vega.
 */
const VEGA_MIME_TYPE = 'application/vnd.vega.v5+json';
/**
 * The MIME type for Vega-Lite.
 *
 * #### Notes
 * The version of this follows the major version of Vega-Lite.
 */
const VEGALITE3_MIME_TYPE = 'application/vnd.vegalite.v3+json';
/**
 * The MIME type for Vega-Lite.
 *
 * #### Notes
 * The version of this follows the major version of Vega-Lite.
 */
const VEGALITE4_MIME_TYPE = 'application/vnd.vegalite.v4+json';
/**
 * A widget for rendering Vega or Vega-Lite data, for usage with rendermime.
 */
class RenderedVega extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    /**
     * Create a new widget for rendering Vega/Vega-Lite.
     */
    constructor(options) {
        super();
        this._mimeType = options.mimeType;
        this._resolver = options.resolver;
        this.addClass(VEGA_COMMON_CLASS);
        this.addClass(this._mimeType === VEGA_MIME_TYPE ? VEGA_CLASS : VEGALITE_CLASS);
    }
    /**
     * Render Vega/Vega-Lite into this widget's node.
     */
    async renderModel(model) {
        const spec = model.data[this._mimeType];
        if (spec === undefined) {
            return;
        }
        const metadata = model.metadata[this._mimeType];
        const embedOptions = metadata && metadata.embed_options ? metadata.embed_options : {};
        // If the JupyterLab theme is dark, render this using a dark Vega theme.
        let bodyThemeDark = document.body.dataset.jpThemeLight === 'false';
        if (bodyThemeDark) {
            embedOptions.theme = 'dark';
        }
        const mode = this._mimeType === VEGA_MIME_TYPE ? 'vega' : 'vega-lite';
        const vega = Private.vega != null ? Private.vega : await Private.ensureVega();
        const el = document.createElement('div');
        // clear the output before attaching a chart
        this.node.textContent = '';
        this.node.appendChild(el);
        if (this._result) {
            this._result.finalize();
        }
        const loader = vega.vega.loader({
            http: { credentials: 'same-origin' }
        });
        const sanitize = async (uri, options) => {
            // Use the resolver for any URIs it wants to handle
            const resolver = this._resolver;
            if ((resolver === null || resolver === void 0 ? void 0 : resolver.isLocal) && resolver.isLocal(uri)) {
                const absPath = await resolver.resolveUrl(uri);
                uri = await resolver.getDownloadUrl(absPath);
            }
            return loader.sanitize(uri, options);
        };
        this._result = await vega.default(el, spec, Object.assign(Object.assign({ actions: true, defaultStyle: true }, embedOptions), { mode, loader: Object.assign(Object.assign({}, loader), { sanitize }) }));
        if (model.data['image/png']) {
            return;
        }
        // Add png representation of vega chart to output
        const imageURL = await this._result.view.toImageURL('png');
        model.setData({
            data: Object.assign(Object.assign({}, model.data), { 'image/png': imageURL.split(',')[1] })
        });
    }
    dispose() {
        if (this._result) {
            this._result.finalize();
        }
        super.dispose();
    }
}
/**
 * A mime renderer factory for vega data.
 */
const rendererFactory = {
    safe: true,
    mimeTypes: [VEGA_MIME_TYPE, VEGALITE3_MIME_TYPE, VEGALITE4_MIME_TYPE],
    createRenderer: options => new RenderedVega(options)
};
const extension = {
    id: '@jupyterlab/vega5-extension:factory',
    rendererFactory,
    rank: 57,
    dataType: 'json',
    documentWidgetFactoryOptions: [
        {
            name: 'Vega5',
            primaryFileType: 'vega5',
            fileTypes: ['vega5', 'json'],
            defaultFor: ['vega5']
        },
        {
            name: 'Vega-Lite4',
            primaryFileType: 'vega-lite4',
            fileTypes: ['vega-lite3', 'vega-lite4', 'json'],
            defaultFor: ['vega-lite3', 'vega-lite4']
        }
    ],
    fileTypes: [
        {
            mimeTypes: [VEGA_MIME_TYPE],
            name: 'vega5',
            extensions: ['.vg', '.vg.json', '.vega'],
            icon: 'ui-components:vega'
        },
        {
            mimeTypes: [VEGALITE4_MIME_TYPE],
            name: 'vega-lite4',
            extensions: ['.vl', '.vl.json', '.vegalite'],
            icon: 'ui-components:vega'
        },
        {
            mimeTypes: [VEGALITE3_MIME_TYPE],
            name: 'vega-lite3',
            extensions: [],
            icon: 'ui-components:vega'
        }
    ]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extension);
/**
 * A namespace for private module data.
 */
var Private;
(function (Private) {
    /**
     * Lazy-load and cache the vega-embed library
     */
    function ensureVega() {
        if (Private.vegaReady) {
            return Private.vegaReady;
        }
        Private.vegaReady = __webpack_require__.e(/*! import() */ "webpack_sharing_consume_default_vega-embed_vega-embed").then(__webpack_require__.t.bind(__webpack_require__, /*! vega-embed */ "webpack/sharing/consume/default/vega-embed/vega-embed", 23));
        return Private.vegaReady;
    }
    Private.ensureVega = ensureVega;
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdmVnYTUtZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ08sMkJBQTJCLG1EQUFNO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRixvQ0FBb0Msa0JBQWtCLDZDQUE2QyxZQUFZLFdBQVcsR0FBRztBQUM5TTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsZ0JBQWdCLHNDQUFzQztBQUN0RyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLFNBQVMsRUFBQztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsbU9BQW9CO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLENBQUMsMEJBQTBCO0FBQzNCLGlDIiwiZmlsZSI6InBhY2thZ2VzX3ZlZ2E1LWV4dGVuc2lvbl9saWJfaW5kZXhfanMuNjI0ZTY0ZDI1MTliYWY5ODZjNzguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIHZlZ2E1LWV4dGVuc2lvblxuICovXG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuLyoqXG4gKiBUaGUgQ1NTIGNsYXNzIHRvIGFkZCB0byB0aGUgVmVnYSBhbmQgVmVnYS1MaXRlIHdpZGdldC5cbiAqL1xuY29uc3QgVkVHQV9DT01NT05fQ0xBU1MgPSAnanAtUmVuZGVyZWRWZWdhQ29tbW9uNSc7XG4vKipcbiAqIFRoZSBDU1MgY2xhc3MgdG8gYWRkIHRvIHRoZSBWZWdhLlxuICovXG5jb25zdCBWRUdBX0NMQVNTID0gJ2pwLVJlbmRlcmVkVmVnYTUnO1xuLyoqXG4gKiBUaGUgQ1NTIGNsYXNzIHRvIGFkZCB0byB0aGUgVmVnYS1MaXRlLlxuICovXG5jb25zdCBWRUdBTElURV9DTEFTUyA9ICdqcC1SZW5kZXJlZFZlZ2FMaXRlJztcbi8qKlxuICogVGhlIE1JTUUgdHlwZSBmb3IgVmVnYS5cbiAqXG4gKiAjIyMjIE5vdGVzXG4gKiBUaGUgdmVyc2lvbiBvZiB0aGlzIGZvbGxvd3MgdGhlIG1ham9yIHZlcnNpb24gb2YgVmVnYS5cbiAqL1xuZXhwb3J0IGNvbnN0IFZFR0FfTUlNRV9UWVBFID0gJ2FwcGxpY2F0aW9uL3ZuZC52ZWdhLnY1K2pzb24nO1xuLyoqXG4gKiBUaGUgTUlNRSB0eXBlIGZvciBWZWdhLUxpdGUuXG4gKlxuICogIyMjIyBOb3Rlc1xuICogVGhlIHZlcnNpb24gb2YgdGhpcyBmb2xsb3dzIHRoZSBtYWpvciB2ZXJzaW9uIG9mIFZlZ2EtTGl0ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IFZFR0FMSVRFM19NSU1FX1RZUEUgPSAnYXBwbGljYXRpb24vdm5kLnZlZ2FsaXRlLnYzK2pzb24nO1xuLyoqXG4gKiBUaGUgTUlNRSB0eXBlIGZvciBWZWdhLUxpdGUuXG4gKlxuICogIyMjIyBOb3Rlc1xuICogVGhlIHZlcnNpb24gb2YgdGhpcyBmb2xsb3dzIHRoZSBtYWpvciB2ZXJzaW9uIG9mIFZlZ2EtTGl0ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IFZFR0FMSVRFNF9NSU1FX1RZUEUgPSAnYXBwbGljYXRpb24vdm5kLnZlZ2FsaXRlLnY0K2pzb24nO1xuLyoqXG4gKiBBIHdpZGdldCBmb3IgcmVuZGVyaW5nIFZlZ2Egb3IgVmVnYS1MaXRlIGRhdGEsIGZvciB1c2FnZSB3aXRoIHJlbmRlcm1pbWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZW5kZXJlZFZlZ2EgZXh0ZW5kcyBXaWRnZXQge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyB3aWRnZXQgZm9yIHJlbmRlcmluZyBWZWdhL1ZlZ2EtTGl0ZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX21pbWVUeXBlID0gb3B0aW9ucy5taW1lVHlwZTtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZXIgPSBvcHRpb25zLnJlc29sdmVyO1xuICAgICAgICB0aGlzLmFkZENsYXNzKFZFR0FfQ09NTU9OX0NMQVNTKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyh0aGlzLl9taW1lVHlwZSA9PT0gVkVHQV9NSU1FX1RZUEUgPyBWRUdBX0NMQVNTIDogVkVHQUxJVEVfQ0xBU1MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgVmVnYS9WZWdhLUxpdGUgaW50byB0aGlzIHdpZGdldCdzIG5vZGUuXG4gICAgICovXG4gICAgYXN5bmMgcmVuZGVyTW9kZWwobW9kZWwpIHtcbiAgICAgICAgY29uc3Qgc3BlYyA9IG1vZGVsLmRhdGFbdGhpcy5fbWltZVR5cGVdO1xuICAgICAgICBpZiAoc3BlYyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWV0YWRhdGEgPSBtb2RlbC5tZXRhZGF0YVt0aGlzLl9taW1lVHlwZV07XG4gICAgICAgIGNvbnN0IGVtYmVkT3B0aW9ucyA9IG1ldGFkYXRhICYmIG1ldGFkYXRhLmVtYmVkX29wdGlvbnMgPyBtZXRhZGF0YS5lbWJlZF9vcHRpb25zIDoge307XG4gICAgICAgIC8vIElmIHRoZSBKdXB5dGVyTGFiIHRoZW1lIGlzIGRhcmssIHJlbmRlciB0aGlzIHVzaW5nIGEgZGFyayBWZWdhIHRoZW1lLlxuICAgICAgICBsZXQgYm9keVRoZW1lRGFyayA9IGRvY3VtZW50LmJvZHkuZGF0YXNldC5qcFRoZW1lTGlnaHQgPT09ICdmYWxzZSc7XG4gICAgICAgIGlmIChib2R5VGhlbWVEYXJrKSB7XG4gICAgICAgICAgICBlbWJlZE9wdGlvbnMudGhlbWUgPSAnZGFyayc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbW9kZSA9IHRoaXMuX21pbWVUeXBlID09PSBWRUdBX01JTUVfVFlQRSA/ICd2ZWdhJyA6ICd2ZWdhLWxpdGUnO1xuICAgICAgICBjb25zdCB2ZWdhID0gUHJpdmF0ZS52ZWdhICE9IG51bGwgPyBQcml2YXRlLnZlZ2EgOiBhd2FpdCBQcml2YXRlLmVuc3VyZVZlZ2EoKTtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgLy8gY2xlYXIgdGhlIG91dHB1dCBiZWZvcmUgYXR0YWNoaW5nIGEgY2hhcnRcbiAgICAgICAgdGhpcy5ub2RlLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgIGlmICh0aGlzLl9yZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc3VsdC5maW5hbGl6ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxvYWRlciA9IHZlZ2EudmVnYS5sb2FkZXIoe1xuICAgICAgICAgICAgaHR0cDogeyBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzYW5pdGl6ZSA9IGFzeW5jICh1cmksIG9wdGlvbnMpID0+IHtcbiAgICAgICAgICAgIC8vIFVzZSB0aGUgcmVzb2x2ZXIgZm9yIGFueSBVUklzIGl0IHdhbnRzIHRvIGhhbmRsZVxuICAgICAgICAgICAgY29uc3QgcmVzb2x2ZXIgPSB0aGlzLl9yZXNvbHZlcjtcbiAgICAgICAgICAgIGlmICgocmVzb2x2ZXIgPT09IG51bGwgfHwgcmVzb2x2ZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlc29sdmVyLmlzTG9jYWwpICYmIHJlc29sdmVyLmlzTG9jYWwodXJpKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFic1BhdGggPSBhd2FpdCByZXNvbHZlci5yZXNvbHZlVXJsKHVyaSk7XG4gICAgICAgICAgICAgICAgdXJpID0gYXdhaXQgcmVzb2x2ZXIuZ2V0RG93bmxvYWRVcmwoYWJzUGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbG9hZGVyLnNhbml0aXplKHVyaSwgb3B0aW9ucyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IGF3YWl0IHZlZ2EuZGVmYXVsdChlbCwgc3BlYywgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHsgYWN0aW9uczogdHJ1ZSwgZGVmYXVsdFN0eWxlOiB0cnVlIH0sIGVtYmVkT3B0aW9ucyksIHsgbW9kZSwgbG9hZGVyOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxvYWRlciksIHsgc2FuaXRpemUgfSkgfSkpO1xuICAgICAgICBpZiAobW9kZWwuZGF0YVsnaW1hZ2UvcG5nJ10pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgcG5nIHJlcHJlc2VudGF0aW9uIG9mIHZlZ2EgY2hhcnQgdG8gb3V0cHV0XG4gICAgICAgIGNvbnN0IGltYWdlVVJMID0gYXdhaXQgdGhpcy5fcmVzdWx0LnZpZXcudG9JbWFnZVVSTCgncG5nJyk7XG4gICAgICAgIG1vZGVsLnNldERhdGEoe1xuICAgICAgICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbC5kYXRhKSwgeyAnaW1hZ2UvcG5nJzogaW1hZ2VVUkwuc3BsaXQoJywnKVsxXSB9KVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Jlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5fcmVzdWx0LmZpbmFsaXplKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbn1cbi8qKlxuICogQSBtaW1lIHJlbmRlcmVyIGZhY3RvcnkgZm9yIHZlZ2EgZGF0YS5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbmRlcmVyRmFjdG9yeSA9IHtcbiAgICBzYWZlOiB0cnVlLFxuICAgIG1pbWVUeXBlczogW1ZFR0FfTUlNRV9UWVBFLCBWRUdBTElURTNfTUlNRV9UWVBFLCBWRUdBTElURTRfTUlNRV9UWVBFXSxcbiAgICBjcmVhdGVSZW5kZXJlcjogb3B0aW9ucyA9PiBuZXcgUmVuZGVyZWRWZWdhKG9wdGlvbnMpXG59O1xuY29uc3QgZXh0ZW5zaW9uID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvdmVnYTUtZXh0ZW5zaW9uOmZhY3RvcnknLFxuICAgIHJlbmRlcmVyRmFjdG9yeSxcbiAgICByYW5rOiA1NyxcbiAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgIGRvY3VtZW50V2lkZ2V0RmFjdG9yeU9wdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1ZlZ2E1JyxcbiAgICAgICAgICAgIHByaW1hcnlGaWxlVHlwZTogJ3ZlZ2E1JyxcbiAgICAgICAgICAgIGZpbGVUeXBlczogWyd2ZWdhNScsICdqc29uJ10sXG4gICAgICAgICAgICBkZWZhdWx0Rm9yOiBbJ3ZlZ2E1J11cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1ZlZ2EtTGl0ZTQnLFxuICAgICAgICAgICAgcHJpbWFyeUZpbGVUeXBlOiAndmVnYS1saXRlNCcsXG4gICAgICAgICAgICBmaWxlVHlwZXM6IFsndmVnYS1saXRlMycsICd2ZWdhLWxpdGU0JywgJ2pzb24nXSxcbiAgICAgICAgICAgIGRlZmF1bHRGb3I6IFsndmVnYS1saXRlMycsICd2ZWdhLWxpdGU0J11cbiAgICAgICAgfVxuICAgIF0sXG4gICAgZmlsZVR5cGVzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG1pbWVUeXBlczogW1ZFR0FfTUlNRV9UWVBFXSxcbiAgICAgICAgICAgIG5hbWU6ICd2ZWdhNScsXG4gICAgICAgICAgICBleHRlbnNpb25zOiBbJy52ZycsICcudmcuanNvbicsICcudmVnYSddLFxuICAgICAgICAgICAgaWNvbjogJ3VpLWNvbXBvbmVudHM6dmVnYSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbWltZVR5cGVzOiBbVkVHQUxJVEU0X01JTUVfVFlQRV0sXG4gICAgICAgICAgICBuYW1lOiAndmVnYS1saXRlNCcsXG4gICAgICAgICAgICBleHRlbnNpb25zOiBbJy52bCcsICcudmwuanNvbicsICcudmVnYWxpdGUnXSxcbiAgICAgICAgICAgIGljb246ICd1aS1jb21wb25lbnRzOnZlZ2EnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG1pbWVUeXBlczogW1ZFR0FMSVRFM19NSU1FX1RZUEVdLFxuICAgICAgICAgICAgbmFtZTogJ3ZlZ2EtbGl0ZTMnLFxuICAgICAgICAgICAgZXh0ZW5zaW9uczogW10sXG4gICAgICAgICAgICBpY29uOiAndWktY29tcG9uZW50czp2ZWdhJ1xuICAgICAgICB9XG4gICAgXVxufTtcbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbjtcbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIHByaXZhdGUgbW9kdWxlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogTGF6eS1sb2FkIGFuZCBjYWNoZSB0aGUgdmVnYS1lbWJlZCBsaWJyYXJ5XG4gICAgICovXG4gICAgZnVuY3Rpb24gZW5zdXJlVmVnYSgpIHtcbiAgICAgICAgaWYgKFByaXZhdGUudmVnYVJlYWR5KSB7XG4gICAgICAgICAgICByZXR1cm4gUHJpdmF0ZS52ZWdhUmVhZHk7XG4gICAgICAgIH1cbiAgICAgICAgUHJpdmF0ZS52ZWdhUmVhZHkgPSBpbXBvcnQoJ3ZlZ2EtZW1iZWQnKTtcbiAgICAgICAgcmV0dXJuIFByaXZhdGUudmVnYVJlYWR5O1xuICAgIH1cbiAgICBQcml2YXRlLmVuc3VyZVZlZ2EgPSBlbnN1cmVWZWdhO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9