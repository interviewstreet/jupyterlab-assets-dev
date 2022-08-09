(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_markdownviewer_lib_index_js-_65521"],{

/***/ "../../packages/markdownviewer/lib/index.js":
/*!**************************************************!*\
  !*** ../../packages/markdownviewer/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IMarkdownViewerTracker": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_0__.IMarkdownViewerTracker),
/* harmony export */   "MarkdownDocument": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_1__.MarkdownDocument),
/* harmony export */   "MarkdownViewer": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_1__.MarkdownViewer),
/* harmony export */   "MarkdownViewerFactory": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_1__.MarkdownViewerFactory)
/* harmony export */ });
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokens */ "../../packages/markdownviewer/lib/tokens.js");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widget */ "../../packages/markdownviewer/lib/widget.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module markdownviewer
 */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/markdownviewer/lib/tokens.js":
/*!***************************************************!*\
  !*** ../../packages/markdownviewer/lib/tokens.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IMarkdownViewerTracker": () => (/* binding */ IMarkdownViewerTracker)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * The markdownviewer tracker token.
 */
const IMarkdownViewerTracker = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/markdownviewer:IMarkdownViewerTracker');
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/markdownviewer/lib/widget.js":
/*!***************************************************!*\
  !*** ../../packages/markdownviewer/lib/widget.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MarkdownViewer": () => (/* binding */ MarkdownViewer),
/* harmony export */   "MarkdownDocument": () => (/* binding */ MarkdownDocument),
/* harmony export */   "MarkdownViewerFactory": () => (/* binding */ MarkdownViewerFactory)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_6__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







/**
 * The class name added to a markdown viewer.
 */
const MARKDOWNVIEWER_CLASS = 'jp-MarkdownViewer';
/**
 * The markdown MIME type.
 */
const MIMETYPE = 'text/markdown';
/**
 * A widget for markdown documents.
 */
class MarkdownViewer extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Widget {
    /**
     * Construct a new markdown viewer widget.
     */
    constructor(options) {
        super();
        this._config = Object.assign({}, MarkdownViewer.defaultConfig);
        this._fragment = '';
        this._ready = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__.PromiseDelegate();
        this._isRendering = false;
        this._renderRequested = false;
        this.context = options.context;
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this.renderer = options.renderer;
        this.node.tabIndex = 0;
        this.addClass(MARKDOWNVIEWER_CLASS);
        const layout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.StackedLayout());
        layout.addWidget(this.renderer);
        void this.context.ready.then(async () => {
            await this._render();
            // Throttle the rendering rate of the widget.
            this._monitor = new _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.ActivityMonitor({
                signal: this.context.model.contentChanged,
                timeout: this._config.renderTimeout
            });
            this._monitor.activityStopped.connect(this.update, this);
            this._ready.resolve(undefined);
        });
    }
    /**
     * A promise that resolves when the markdown viewer is ready.
     */
    get ready() {
        return this._ready.promise;
    }
    /**
     * Set URI fragment identifier.
     */
    setFragment(fragment) {
        this._fragment = fragment;
        this.update();
    }
    /**
     * Set a config option for the markdown viewer.
     */
    setOption(option, value) {
        if (this._config[option] === value) {
            return;
        }
        this._config[option] = value;
        const { style } = this.renderer.node;
        switch (option) {
            case 'fontFamily':
                style.setProperty('font-family', value);
                break;
            case 'fontSize':
                style.setProperty('font-size', value ? value + 'px' : null);
                break;
            case 'hideFrontMatter':
                this.update();
                break;
            case 'lineHeight':
                style.setProperty('line-height', value ? value.toString() : null);
                break;
            case 'lineWidth': {
                const padding = value ? `calc(50% - ${value / 2}ch)` : null;
                style.setProperty('padding-left', padding);
                style.setProperty('padding-right', padding);
                break;
            }
            case 'renderTimeout':
                if (this._monitor) {
                    this._monitor.timeout = value;
                }
                break;
            default:
                break;
        }
    }
    /**
     * Dispose of the resources held by the widget.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        if (this._monitor) {
            this._monitor.dispose();
        }
        this._monitor = null;
        super.dispose();
    }
    /**
     * Handle an `update-request` message to the widget.
     */
    onUpdateRequest(msg) {
        if (this.context.isReady && !this.isDisposed) {
            void this._render();
            this._fragment = '';
        }
    }
    /**
     * Handle `'activate-request'` messages.
     */
    onActivateRequest(msg) {
        this.node.focus();
    }
    /**
     * Render the mime content.
     */
    async _render() {
        if (this.isDisposed) {
            return;
        }
        // Since rendering is async, we note render requests that happen while we
        // actually are rendering for a future rendering.
        if (this._isRendering) {
            this._renderRequested = true;
            return;
        }
        // Set up for this rendering pass.
        this._renderRequested = false;
        const { context } = this;
        const { model } = context;
        const source = model.toString();
        const data = {};
        // If `hideFrontMatter`is true remove front matter.
        data[MIMETYPE] = this._config.hideFrontMatter
            ? Private.removeFrontMatter(source)
            : source;
        const mimeModel = new _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_3__.MimeModel({
            data,
            metadata: { fragment: this._fragment }
        });
        try {
            // Do the rendering asynchronously.
            this._isRendering = true;
            await this.renderer.renderModel(mimeModel);
            this._isRendering = false;
            // If there is an outstanding request to render, go ahead and render
            if (this._renderRequested) {
                return this._render();
            }
        }
        catch (reason) {
            // Dispose the document if rendering fails.
            requestAnimationFrame(() => {
                this.dispose();
            });
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this._trans.__('Renderer Failure: %1', context.path), reason);
        }
    }
}
/**
 * The namespace for MarkdownViewer class statics.
 */
(function (MarkdownViewer) {
    /**
     * The default configuration options for an editor.
     */
    MarkdownViewer.defaultConfig = {
        fontFamily: null,
        fontSize: null,
        lineHeight: null,
        lineWidth: null,
        hideFrontMatter: true,
        renderTimeout: 1000
    };
})(MarkdownViewer || (MarkdownViewer = {}));
/**
 * A document widget for markdown content.
 */
class MarkdownDocument extends _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__.DocumentWidget {
    setFragment(fragment) {
        this.content.setFragment(fragment);
    }
}
/**
 * A widget factory for markdown viewers.
 */
class MarkdownViewerFactory extends _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__.ABCWidgetFactory {
    /**
     * Construct a new markdown viewer widget factory.
     */
    constructor(options) {
        super(Private.createRegistryOptions(options));
        this._fileType = options.primaryFileType;
        this._rendermime = options.rendermime;
    }
    /**
     * Create a new widget given a context.
     */
    createNewWidget(context) {
        var _a, _b, _c, _d, _e;
        const rendermime = this._rendermime.clone({
            resolver: context.urlResolver
        });
        const renderer = rendermime.createRenderer(MIMETYPE);
        const content = new MarkdownViewer({ context, renderer });
        content.title.icon = (_a = this._fileType) === null || _a === void 0 ? void 0 : _a.icon;
        content.title.iconClass = (_c = (_b = this._fileType) === null || _b === void 0 ? void 0 : _b.iconClass) !== null && _c !== void 0 ? _c : '';
        content.title.iconLabel = (_e = (_d = this._fileType) === null || _d === void 0 ? void 0 : _d.iconLabel) !== null && _e !== void 0 ? _e : '';
        const widget = new MarkdownDocument({ content, context });
        return widget;
    }
}
/**
 * A namespace for markdown viewer widget private data.
 */
var Private;
(function (Private) {
    /**
     * Create the document registry options.
     */
    function createRegistryOptions(options) {
        return Object.assign(Object.assign({}, options), { readOnly: true });
    }
    Private.createRegistryOptions = createRegistryOptions;
    /**
     * Remove YALM front matter from source.
     */
    function removeFrontMatter(source) {
        const re = /^---\n[^]*?\n(---|...)\n/;
        const match = source.match(re);
        if (!match) {
            return source;
        }
        const { length } = match[0];
        return source.slice(length);
    }
    Private.removeFrontMatter = removeFrontMatter;
})(Private || (Private = {}));
//# sourceMappingURL=widget.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbWFya2Rvd252aWV3ZXIvbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9tYXJrZG93bnZpZXdlci9saWIvdG9rZW5zLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9tYXJrZG93bnZpZXdlci9saWIvd2lkZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QjtBQUNBO0FBQ3pCLGlDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1JBO0FBQ0E7QUFDMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ08sbUNBQW1DLG9EQUFLO0FBQy9DLGtDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUN3RDtBQUNBO0FBQ21CO0FBQ3hCO0FBQ007QUFDTDtBQUNJO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyw2QkFBNkIsbURBQU07QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBLDBCQUEwQiw4REFBZTtBQUN6QztBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsbUVBQWM7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsMERBQWE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msa0VBQWU7QUFDL0M7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsVUFBVTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxVQUFVO0FBQ3pCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsNkRBQVM7QUFDdkM7QUFDQSx1QkFBdUI7QUFDdkIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsaUJBQWlCLHNFQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHdDQUF3QztBQUN6QztBQUNBO0FBQ0E7QUFDTywrQkFBK0IsbUVBQWM7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxvQ0FBb0MscUVBQWdCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLDRDQUE0QyxvQkFBb0I7QUFDaEU7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLG1CQUFtQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsYUFBYSxpQkFBaUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQixrQyIsImZpbGUiOiJwYWNrYWdlc19tYXJrZG93bnZpZXdlcl9saWJfaW5kZXhfanMtXzY1NTIxLjhmNzFlYTM3NTFmN2VkMDAwNDRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgbWFya2Rvd252aWV3ZXJcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi90b2tlbnMnO1xuZXhwb3J0ICogZnJvbSAnLi93aWRnZXQnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG4vKipcbiAqIFRoZSBtYXJrZG93bnZpZXdlciB0cmFja2VyIHRva2VuLlxuICovXG5leHBvcnQgY29uc3QgSU1hcmtkb3duVmlld2VyVHJhY2tlciA9IG5ldyBUb2tlbignQGp1cHl0ZXJsYWIvbWFya2Rvd252aWV3ZXI6SU1hcmtkb3duVmlld2VyVHJhY2tlcicpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9rZW5zLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IHNob3dFcnJvck1lc3NhZ2UgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBBY3Rpdml0eU1vbml0b3IgfSBmcm9tICdAanVweXRlcmxhYi9jb3JldXRpbHMnO1xuaW1wb3J0IHsgQUJDV2lkZ2V0RmFjdG9yeSwgRG9jdW1lbnRXaWRnZXQgfSBmcm9tICdAanVweXRlcmxhYi9kb2NyZWdpc3RyeSc7XG5pbXBvcnQgeyBNaW1lTW9kZWwgfSBmcm9tICdAanVweXRlcmxhYi9yZW5kZXJtaW1lJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgUHJvbWlzZURlbGVnYXRlIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgU3RhY2tlZExheW91dCwgV2lkZ2V0IH0gZnJvbSAnQGx1bWluby93aWRnZXRzJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gYSBtYXJrZG93biB2aWV3ZXIuXG4gKi9cbmNvbnN0IE1BUktET1dOVklFV0VSX0NMQVNTID0gJ2pwLU1hcmtkb3duVmlld2VyJztcbi8qKlxuICogVGhlIG1hcmtkb3duIE1JTUUgdHlwZS5cbiAqL1xuY29uc3QgTUlNRVRZUEUgPSAndGV4dC9tYXJrZG93bic7XG4vKipcbiAqIEEgd2lkZ2V0IGZvciBtYXJrZG93biBkb2N1bWVudHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXJrZG93blZpZXdlciBleHRlbmRzIFdpZGdldCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IG1hcmtkb3duIHZpZXdlciB3aWRnZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBNYXJrZG93blZpZXdlci5kZWZhdWx0Q29uZmlnKTtcbiAgICAgICAgdGhpcy5fZnJhZ21lbnQgPSAnJztcbiAgICAgICAgdGhpcy5fcmVhZHkgPSBuZXcgUHJvbWlzZURlbGVnYXRlKCk7XG4gICAgICAgIHRoaXMuX2lzUmVuZGVyaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3JlbmRlclJlcXVlc3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBvcHRpb25zLmNvbnRleHQ7XG4gICAgICAgIHRoaXMudHJhbnNsYXRvciA9IG9wdGlvbnMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgdGhpcy5fdHJhbnMgPSB0aGlzLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyID0gb3B0aW9ucy5yZW5kZXJlcjtcbiAgICAgICAgdGhpcy5ub2RlLnRhYkluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhNQVJLRE9XTlZJRVdFUl9DTEFTUyk7XG4gICAgICAgIGNvbnN0IGxheW91dCA9ICh0aGlzLmxheW91dCA9IG5ldyBTdGFja2VkTGF5b3V0KCkpO1xuICAgICAgICBsYXlvdXQuYWRkV2lkZ2V0KHRoaXMucmVuZGVyZXIpO1xuICAgICAgICB2b2lkIHRoaXMuY29udGV4dC5yZWFkeS50aGVuKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3JlbmRlcigpO1xuICAgICAgICAgICAgLy8gVGhyb3R0bGUgdGhlIHJlbmRlcmluZyByYXRlIG9mIHRoZSB3aWRnZXQuXG4gICAgICAgICAgICB0aGlzLl9tb25pdG9yID0gbmV3IEFjdGl2aXR5TW9uaXRvcih7XG4gICAgICAgICAgICAgICAgc2lnbmFsOiB0aGlzLmNvbnRleHQubW9kZWwuY29udGVudENoYW5nZWQsXG4gICAgICAgICAgICAgICAgdGltZW91dDogdGhpcy5fY29uZmlnLnJlbmRlclRpbWVvdXRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fbW9uaXRvci5hY3Rpdml0eVN0b3BwZWQuY29ubmVjdCh0aGlzLnVwZGF0ZSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9yZWFkeS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBtYXJrZG93biB2aWV3ZXIgaXMgcmVhZHkuXG4gICAgICovXG4gICAgZ2V0IHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVhZHkucHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IFVSSSBmcmFnbWVudCBpZGVudGlmaWVyLlxuICAgICAqL1xuICAgIHNldEZyYWdtZW50KGZyYWdtZW50KSB7XG4gICAgICAgIHRoaXMuX2ZyYWdtZW50ID0gZnJhZ21lbnQ7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCBhIGNvbmZpZyBvcHRpb24gZm9yIHRoZSBtYXJrZG93biB2aWV3ZXIuXG4gICAgICovXG4gICAgc2V0T3B0aW9uKG9wdGlvbiwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZ1tvcHRpb25dID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NvbmZpZ1tvcHRpb25dID0gdmFsdWU7XG4gICAgICAgIGNvbnN0IHsgc3R5bGUgfSA9IHRoaXMucmVuZGVyZXIubm9kZTtcbiAgICAgICAgc3dpdGNoIChvcHRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2ZvbnRGYW1pbHknOlxuICAgICAgICAgICAgICAgIHN0eWxlLnNldFByb3BlcnR5KCdmb250LWZhbWlseScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2ZvbnRTaXplJzpcbiAgICAgICAgICAgICAgICBzdHlsZS5zZXRQcm9wZXJ0eSgnZm9udC1zaXplJywgdmFsdWUgPyB2YWx1ZSArICdweCcgOiBudWxsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2hpZGVGcm9udE1hdHRlcic6XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xpbmVIZWlnaHQnOlxuICAgICAgICAgICAgICAgIHN0eWxlLnNldFByb3BlcnR5KCdsaW5lLWhlaWdodCcsIHZhbHVlID8gdmFsdWUudG9TdHJpbmcoKSA6IG51bGwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbGluZVdpZHRoJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhZGRpbmcgPSB2YWx1ZSA/IGBjYWxjKDUwJSAtICR7dmFsdWUgLyAyfWNoKWAgOiBudWxsO1xuICAgICAgICAgICAgICAgIHN0eWxlLnNldFByb3BlcnR5KCdwYWRkaW5nLWxlZnQnLCBwYWRkaW5nKTtcbiAgICAgICAgICAgICAgICBzdHlsZS5zZXRQcm9wZXJ0eSgncGFkZGluZy1yaWdodCcsIHBhZGRpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAncmVuZGVyVGltZW91dCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vbml0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW9uaXRvci50aW1lb3V0ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbW9uaXRvcikge1xuICAgICAgICAgICAgdGhpcy5fbW9uaXRvci5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbW9uaXRvciA9IG51bGw7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGFuIGB1cGRhdGUtcmVxdWVzdGAgbWVzc2FnZSB0byB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIG9uVXBkYXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dC5pc1JlYWR5ICYmICF0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHZvaWQgdGhpcy5fcmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9mcmFnbWVudCA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgJ2FjdGl2YXRlLXJlcXVlc3QnYCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBvbkFjdGl2YXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgdGhpcy5ub2RlLmZvY3VzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlciB0aGUgbWltZSBjb250ZW50LlxuICAgICAqL1xuICAgIGFzeW5jIF9yZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBTaW5jZSByZW5kZXJpbmcgaXMgYXN5bmMsIHdlIG5vdGUgcmVuZGVyIHJlcXVlc3RzIHRoYXQgaGFwcGVuIHdoaWxlIHdlXG4gICAgICAgIC8vIGFjdHVhbGx5IGFyZSByZW5kZXJpbmcgZm9yIGEgZnV0dXJlIHJlbmRlcmluZy5cbiAgICAgICAgaWYgKHRoaXMuX2lzUmVuZGVyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJSZXF1ZXN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNldCB1cCBmb3IgdGhpcyByZW5kZXJpbmcgcGFzcy5cbiAgICAgICAgdGhpcy5fcmVuZGVyUmVxdWVzdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHsgY29udGV4dCB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgeyBtb2RlbCB9ID0gY29udGV4dDtcbiAgICAgICAgY29uc3Qgc291cmNlID0gbW9kZWwudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IHt9O1xuICAgICAgICAvLyBJZiBgaGlkZUZyb250TWF0dGVyYGlzIHRydWUgcmVtb3ZlIGZyb250IG1hdHRlci5cbiAgICAgICAgZGF0YVtNSU1FVFlQRV0gPSB0aGlzLl9jb25maWcuaGlkZUZyb250TWF0dGVyXG4gICAgICAgICAgICA/IFByaXZhdGUucmVtb3ZlRnJvbnRNYXR0ZXIoc291cmNlKVxuICAgICAgICAgICAgOiBzb3VyY2U7XG4gICAgICAgIGNvbnN0IG1pbWVNb2RlbCA9IG5ldyBNaW1lTW9kZWwoe1xuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIG1ldGFkYXRhOiB7IGZyYWdtZW50OiB0aGlzLl9mcmFnbWVudCB9XG4gICAgICAgIH0pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gRG8gdGhlIHJlbmRlcmluZyBhc3luY2hyb25vdXNseS5cbiAgICAgICAgICAgIHRoaXMuX2lzUmVuZGVyaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucmVuZGVyZXIucmVuZGVyTW9kZWwobWltZU1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMuX2lzUmVuZGVyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbiBvdXRzdGFuZGluZyByZXF1ZXN0IHRvIHJlbmRlciwgZ28gYWhlYWQgYW5kIHJlbmRlclxuICAgICAgICAgICAgaWYgKHRoaXMuX3JlbmRlclJlcXVlc3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAocmVhc29uKSB7XG4gICAgICAgICAgICAvLyBEaXNwb3NlIHRoZSBkb2N1bWVudCBpZiByZW5kZXJpbmcgZmFpbHMuXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2b2lkIHNob3dFcnJvck1lc3NhZ2UodGhpcy5fdHJhbnMuX18oJ1JlbmRlcmVyIEZhaWx1cmU6ICUxJywgY29udGV4dC5wYXRoKSwgcmVhc29uKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogVGhlIG5hbWVzcGFjZSBmb3IgTWFya2Rvd25WaWV3ZXIgY2xhc3Mgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChNYXJrZG93blZpZXdlcikge1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgYW4gZWRpdG9yLlxuICAgICAqL1xuICAgIE1hcmtkb3duVmlld2VyLmRlZmF1bHRDb25maWcgPSB7XG4gICAgICAgIGZvbnRGYW1pbHk6IG51bGwsXG4gICAgICAgIGZvbnRTaXplOiBudWxsLFxuICAgICAgICBsaW5lSGVpZ2h0OiBudWxsLFxuICAgICAgICBsaW5lV2lkdGg6IG51bGwsXG4gICAgICAgIGhpZGVGcm9udE1hdHRlcjogdHJ1ZSxcbiAgICAgICAgcmVuZGVyVGltZW91dDogMTAwMFxuICAgIH07XG59KShNYXJrZG93blZpZXdlciB8fCAoTWFya2Rvd25WaWV3ZXIgPSB7fSkpO1xuLyoqXG4gKiBBIGRvY3VtZW50IHdpZGdldCBmb3IgbWFya2Rvd24gY29udGVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIE1hcmtkb3duRG9jdW1lbnQgZXh0ZW5kcyBEb2N1bWVudFdpZGdldCB7XG4gICAgc2V0RnJhZ21lbnQoZnJhZ21lbnQpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LnNldEZyYWdtZW50KGZyYWdtZW50KTtcbiAgICB9XG59XG4vKipcbiAqIEEgd2lkZ2V0IGZhY3RvcnkgZm9yIG1hcmtkb3duIHZpZXdlcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXJrZG93blZpZXdlckZhY3RvcnkgZXh0ZW5kcyBBQkNXaWRnZXRGYWN0b3J5IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgbWFya2Rvd24gdmlld2VyIHdpZGdldCBmYWN0b3J5LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoUHJpdmF0ZS5jcmVhdGVSZWdpc3RyeU9wdGlvbnMob3B0aW9ucykpO1xuICAgICAgICB0aGlzLl9maWxlVHlwZSA9IG9wdGlvbnMucHJpbWFyeUZpbGVUeXBlO1xuICAgICAgICB0aGlzLl9yZW5kZXJtaW1lID0gb3B0aW9ucy5yZW5kZXJtaW1lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgd2lkZ2V0IGdpdmVuIGEgY29udGV4dC5cbiAgICAgKi9cbiAgICBjcmVhdGVOZXdXaWRnZXQoY29udGV4dCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lO1xuICAgICAgICBjb25zdCByZW5kZXJtaW1lID0gdGhpcy5fcmVuZGVybWltZS5jbG9uZSh7XG4gICAgICAgICAgICByZXNvbHZlcjogY29udGV4dC51cmxSZXNvbHZlclxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcmVuZGVyZXIgPSByZW5kZXJtaW1lLmNyZWF0ZVJlbmRlcmVyKE1JTUVUWVBFKTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IG5ldyBNYXJrZG93blZpZXdlcih7IGNvbnRleHQsIHJlbmRlcmVyIH0pO1xuICAgICAgICBjb250ZW50LnRpdGxlLmljb24gPSAoX2EgPSB0aGlzLl9maWxlVHlwZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmljb247XG4gICAgICAgIGNvbnRlbnQudGl0bGUuaWNvbkNsYXNzID0gKF9jID0gKF9iID0gdGhpcy5fZmlsZVR5cGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5pY29uQ2xhc3MpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6ICcnO1xuICAgICAgICBjb250ZW50LnRpdGxlLmljb25MYWJlbCA9IChfZSA9IChfZCA9IHRoaXMuX2ZpbGVUeXBlKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuaWNvbkxhYmVsKSAhPT0gbnVsbCAmJiBfZSAhPT0gdm9pZCAwID8gX2UgOiAnJztcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gbmV3IE1hcmtkb3duRG9jdW1lbnQoeyBjb250ZW50LCBjb250ZXh0IH0pO1xuICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH1cbn1cbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIG1hcmtkb3duIHZpZXdlciB3aWRnZXQgcHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgZG9jdW1lbnQgcmVnaXN0cnkgb3B0aW9ucy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVSZWdpc3RyeU9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyByZWFkT25seTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgUHJpdmF0ZS5jcmVhdGVSZWdpc3RyeU9wdGlvbnMgPSBjcmVhdGVSZWdpc3RyeU9wdGlvbnM7XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIFlBTE0gZnJvbnQgbWF0dGVyIGZyb20gc291cmNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlbW92ZUZyb250TWF0dGVyKHNvdXJjZSkge1xuICAgICAgICBjb25zdCByZSA9IC9eLS0tXFxuW15dKj9cXG4oLS0tfC4uLilcXG4vO1xuICAgICAgICBjb25zdCBtYXRjaCA9IHNvdXJjZS5tYXRjaChyZSk7XG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBsZW5ndGggfSA9IG1hdGNoWzBdO1xuICAgICAgICByZXR1cm4gc291cmNlLnNsaWNlKGxlbmd0aCk7XG4gICAgfVxuICAgIFByaXZhdGUucmVtb3ZlRnJvbnRNYXR0ZXIgPSByZW1vdmVGcm9udE1hdHRlcjtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2lkZ2V0LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=