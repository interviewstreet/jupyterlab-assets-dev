(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_htmlviewer_lib_index_js-_effa1"],{

/***/ "../../packages/htmlviewer/lib/index.js":
/*!**********************************************!*\
  !*** ../../packages/htmlviewer/lib/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IHTMLViewerTracker": () => (/* binding */ IHTMLViewerTracker),
/* harmony export */   "HTMLViewer": () => (/* binding */ HTMLViewer),
/* harmony export */   "HTMLViewerFactory": () => (/* binding */ HTMLViewerFactory),
/* harmony export */   "ToolbarItems": () => (/* binding */ ToolbarItems)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module htmlviewer
 */








/**
 * The HTML viewer tracker token.
 */
const IHTMLViewerTracker = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__.Token('@jupyterlab/htmlviewer:IHTMLViewerTracker');
/**
 * The timeout to wait for change activity to have ceased before rendering.
 */
const RENDER_TIMEOUT = 1000;
/**
 * The CSS class to add to the HTMLViewer Widget.
 */
const CSS_CLASS = 'jp-HTMLViewer';
/**
 * A viewer widget for HTML documents.
 *
 * #### Notes
 * The iframed HTML document can pose a potential security risk,
 * since it can execute Javascript, and make same-origin requests
 * to the server, thereby executing arbitrary Javascript.
 *
 * Here, we sandbox the iframe so that it can't execute Javascript
 * or launch any popups. We allow one exception: 'allow-same-origin'
 * requests, so that local HTML documents can access CSS, images,
 * etc from the files system.
 */
class HTMLViewer extends _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__.DocumentWidget {
    /**
     * Create a new widget for rendering HTML.
     */
    constructor(options) {
        super(Object.assign(Object.assign({}, options), { content: new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.IFrame({ sandbox: ['allow-same-origin'] }) }));
        this._renderPending = false;
        this._parser = new DOMParser();
        this._monitor = null;
        this._objectUrl = '';
        this._trustedChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_6__.Signal(this);
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.nullTranslator;
        this.content.addClass(CSS_CLASS);
        void this.context.ready.then(() => {
            this.update();
            // Throttle the rendering rate of the widget.
            this._monitor = new _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.ActivityMonitor({
                signal: this.context.model.contentChanged,
                timeout: RENDER_TIMEOUT
            });
            this._monitor.activityStopped.connect(this.update, this);
        });
    }
    /**
     * Whether the HTML document is trusted. If trusted,
     * it can execute Javascript in the iframe sandbox.
     */
    get trusted() {
        return this.content.sandbox.indexOf('allow-scripts') !== -1;
    }
    set trusted(value) {
        if (this.trusted === value) {
            return;
        }
        if (value) {
            this.content.sandbox = Private.trusted;
        }
        else {
            this.content.sandbox = Private.untrusted;
        }
        // eslint-disable-next-line
        this.content.url = this.content.url; // Force a refresh.
        this._trustedChanged.emit(value);
    }
    /**
     * Emitted when the trust state of the document changes.
     */
    get trustedChanged() {
        return this._trustedChanged;
    }
    /**
     * Dispose of resources held by the html viewer.
     */
    dispose() {
        if (this._objectUrl) {
            try {
                URL.revokeObjectURL(this._objectUrl);
            }
            catch (error) {
                /* no-op */
            }
        }
        super.dispose();
    }
    /**
     * Handle and update request.
     */
    onUpdateRequest() {
        if (this._renderPending) {
            return;
        }
        this._renderPending = true;
        void this._renderModel().then(() => (this._renderPending = false));
    }
    /**
     * Render HTML in IFrame into this widget's node.
     */
    async _renderModel() {
        let data = this.context.model.toString();
        data = await this._setBase(data);
        // Set the new iframe url.
        const blob = new Blob([data], { type: 'text/html' });
        const oldUrl = this._objectUrl;
        this._objectUrl = URL.createObjectURL(blob);
        this.content.url = this._objectUrl;
        // Release reference to any previous object url.
        if (oldUrl) {
            try {
                URL.revokeObjectURL(oldUrl);
            }
            catch (error) {
                /* no-op */
            }
        }
        return;
    }
    /**
     * Set a <base> element in the HTML string so that the iframe
     * can correctly dereference relative links.
     */
    async _setBase(data) {
        const doc = this._parser.parseFromString(data, 'text/html');
        let base = doc.querySelector('base');
        if (!base) {
            base = doc.createElement('base');
            doc.head.insertBefore(base, doc.head.firstChild);
        }
        const path = this.context.path;
        const baseUrl = await this.context.urlResolver.getDownloadUrl(path);
        // Set the base href, plus a fake name for the url of this
        // document. The fake name doesn't really matter, as long
        // as the document can dereference relative links to resources
        // (e.g. CSS and scripts).
        base.href = baseUrl;
        base.target = '_self';
        return doc.documentElement.innerHTML;
    }
}
/**
 * A widget factory for HTMLViewers.
 */
class HTMLViewerFactory extends _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__.ABCWidgetFactory {
    /**
     * Create a new widget given a context.
     */
    createNewWidget(context) {
        return new HTMLViewer({ context });
    }
    /**
     * Default factory for toolbar items to be added after the widget is created.
     */
    defaultToolbarFactory(widget) {
        return [
            // Make a refresh button for the toolbar.
            {
                name: 'refresh',
                widget: ToolbarItems.createRefreshButton(widget, this.translator)
            },
            // Make a trust button for the toolbar.
            {
                name: 'trust',
                widget: ToolbarItems.createTrustButton(widget, this.translator)
            }
        ];
    }
}
/**
 * A namespace for toolbar items generator
 */
var ToolbarItems;
(function (ToolbarItems) {
    /**
     * Create the refresh button
     *
     * @param widget HTML viewer widget
     * @param translator Application translator object
     * @returns Toolbar item button
     */
    function createRefreshButton(widget, translator) {
        const trans = (translator !== null && translator !== void 0 ? translator : _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.nullTranslator).load('jupyterlab');
        return new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__.refreshIcon,
            onClick: async () => {
                if (!widget.context.model.dirty) {
                    await widget.context.revert();
                    widget.update();
                }
            },
            tooltip: trans.__('Rerender HTML Document')
        });
    }
    ToolbarItems.createRefreshButton = createRefreshButton;
    /**
     * Create the trust button
     *
     * @param document HTML viewer widget
     * @param translator Application translator object
     * @returns Toolbar item button
     */
    function createTrustButton(document, translator) {
        return _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_7__.createElement(Private.TrustButtonComponent, { htmlDocument: document, translator: translator }));
    }
    ToolbarItems.createTrustButton = createTrustButton;
})(ToolbarItems || (ToolbarItems = {}));
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * Sandbox exceptions for untrusted HTML.
     */
    Private.untrusted = [];
    /**
     * Sandbox exceptions for trusted HTML.
     */
    Private.trusted = ['allow-scripts'];
    /**
     * React component for a trusted button.
     *
     * This wraps the ToolbarButtonComponent and watches for trust changes.
     */
    function TrustButtonComponent(props) {
        const translator = props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.nullTranslator;
        const trans = translator.load('jupyterlab');
        return (react__WEBPACK_IMPORTED_MODULE_7__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.UseSignal, { signal: props.htmlDocument.trustedChanged, initialSender: props.htmlDocument }, () => (react__WEBPACK_IMPORTED_MODULE_7__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButtonComponent, { className: "", onClick: () => (props.htmlDocument.trusted = !props.htmlDocument.trusted), tooltip: trans.__(`Whether the HTML file is trusted.
Trusting the file allows scripts to run in it,
which may result in security risks.
Only enable for files you trust.`), label: props.htmlDocument.trusted
                ? trans.__('Distrust HTML')
                : trans.__('Trust HTML') }))));
    }
    Private.TrustButtonComponent = TrustButtonComponent;
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvaHRtbHZpZXdlci9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzZHO0FBQ3JEO0FBQ21CO0FBQ2xCO0FBQ0Q7QUFDZDtBQUNDO0FBQ1o7QUFDL0I7QUFDQTtBQUNBO0FBQ08sK0JBQStCLG9EQUFLO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLHlCQUF5QixtRUFBYztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxhQUFhLGNBQWMsd0RBQU0sRUFBRSxpQ0FBaUMsR0FBRztBQUNuSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxxREFBTTtBQUN6QyxnREFBZ0QsbUVBQWM7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msa0VBQWU7QUFDL0M7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsb0JBQW9CO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLGdDQUFnQyxxRUFBZ0I7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsVUFBVTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRkFBbUYsbUVBQWM7QUFDakcsbUJBQW1CLCtEQUFhO0FBQ2hDLGtCQUFrQixrRUFBVztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxvRUFBa0IsQ0FBQyxnREFBbUIsZ0NBQWdDLGlEQUFpRDtBQUN0STtBQUNBO0FBQ0EsQ0FBQyxvQ0FBb0M7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsbUVBQWM7QUFDN0Q7QUFDQSxnQkFBZ0IsZ0RBQW1CLENBQUMsMkRBQVMsR0FBRywrRUFBK0UsU0FBUyxnREFBbUIsQ0FBQyx3RUFBc0IsR0FBRztBQUNyTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0IsaUMiLCJmaWxlIjoicGFja2FnZXNfaHRtbHZpZXdlcl9saWJfaW5kZXhfanMtX2VmZmExLjYxMDYzOWMxMzRlNjdmMWM5YWRmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBodG1sdmlld2VyXG4gKi9cbmltcG9ydCB7IElGcmFtZSwgUmVhY3RXaWRnZXQsIFRvb2xiYXJCdXR0b24sIFRvb2xiYXJCdXR0b25Db21wb25lbnQsIFVzZVNpZ25hbCB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IEFjdGl2aXR5TW9uaXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBBQkNXaWRnZXRGYWN0b3J5LCBEb2N1bWVudFdpZGdldCB9IGZyb20gJ0BqdXB5dGVybGFiL2RvY3JlZ2lzdHJ5JztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgcmVmcmVzaEljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBUaGUgSFRNTCB2aWV3ZXIgdHJhY2tlciB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IElIVE1MVmlld2VyVHJhY2tlciA9IG5ldyBUb2tlbignQGp1cHl0ZXJsYWIvaHRtbHZpZXdlcjpJSFRNTFZpZXdlclRyYWNrZXInKTtcbi8qKlxuICogVGhlIHRpbWVvdXQgdG8gd2FpdCBmb3IgY2hhbmdlIGFjdGl2aXR5IHRvIGhhdmUgY2Vhc2VkIGJlZm9yZSByZW5kZXJpbmcuXG4gKi9cbmNvbnN0IFJFTkRFUl9USU1FT1VUID0gMTAwMDtcbi8qKlxuICogVGhlIENTUyBjbGFzcyB0byBhZGQgdG8gdGhlIEhUTUxWaWV3ZXIgV2lkZ2V0LlxuICovXG5jb25zdCBDU1NfQ0xBU1MgPSAnanAtSFRNTFZpZXdlcic7XG4vKipcbiAqIEEgdmlld2VyIHdpZGdldCBmb3IgSFRNTCBkb2N1bWVudHMuXG4gKlxuICogIyMjIyBOb3Rlc1xuICogVGhlIGlmcmFtZWQgSFRNTCBkb2N1bWVudCBjYW4gcG9zZSBhIHBvdGVudGlhbCBzZWN1cml0eSByaXNrLFxuICogc2luY2UgaXQgY2FuIGV4ZWN1dGUgSmF2YXNjcmlwdCwgYW5kIG1ha2Ugc2FtZS1vcmlnaW4gcmVxdWVzdHNcbiAqIHRvIHRoZSBzZXJ2ZXIsIHRoZXJlYnkgZXhlY3V0aW5nIGFyYml0cmFyeSBKYXZhc2NyaXB0LlxuICpcbiAqIEhlcmUsIHdlIHNhbmRib3ggdGhlIGlmcmFtZSBzbyB0aGF0IGl0IGNhbid0IGV4ZWN1dGUgSmF2YXNjcmlwdFxuICogb3IgbGF1bmNoIGFueSBwb3B1cHMuIFdlIGFsbG93IG9uZSBleGNlcHRpb246ICdhbGxvdy1zYW1lLW9yaWdpbidcbiAqIHJlcXVlc3RzLCBzbyB0aGF0IGxvY2FsIEhUTUwgZG9jdW1lbnRzIGNhbiBhY2Nlc3MgQ1NTLCBpbWFnZXMsXG4gKiBldGMgZnJvbSB0aGUgZmlsZXMgc3lzdGVtLlxuICovXG5leHBvcnQgY2xhc3MgSFRNTFZpZXdlciBleHRlbmRzIERvY3VtZW50V2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgd2lkZ2V0IGZvciByZW5kZXJpbmcgSFRNTC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgY29udGVudDogbmV3IElGcmFtZSh7IHNhbmRib3g6IFsnYWxsb3ctc2FtZS1vcmlnaW4nXSB9KSB9KSk7XG4gICAgICAgIHRoaXMuX3JlbmRlclBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICB0aGlzLl9tb25pdG9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb2JqZWN0VXJsID0gJyc7XG4gICAgICAgIHRoaXMuX3RydXN0ZWRDaGFuZ2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gb3B0aW9ucy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2xhc3MoQ1NTX0NMQVNTKTtcbiAgICAgICAgdm9pZCB0aGlzLmNvbnRleHQucmVhZHkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgLy8gVGhyb3R0bGUgdGhlIHJlbmRlcmluZyByYXRlIG9mIHRoZSB3aWRnZXQuXG4gICAgICAgICAgICB0aGlzLl9tb25pdG9yID0gbmV3IEFjdGl2aXR5TW9uaXRvcih7XG4gICAgICAgICAgICAgICAgc2lnbmFsOiB0aGlzLmNvbnRleHQubW9kZWwuY29udGVudENoYW5nZWQsXG4gICAgICAgICAgICAgICAgdGltZW91dDogUkVOREVSX1RJTUVPVVRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fbW9uaXRvci5hY3Rpdml0eVN0b3BwZWQuY29ubmVjdCh0aGlzLnVwZGF0ZSwgdGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBIVE1MIGRvY3VtZW50IGlzIHRydXN0ZWQuIElmIHRydXN0ZWQsXG4gICAgICogaXQgY2FuIGV4ZWN1dGUgSmF2YXNjcmlwdCBpbiB0aGUgaWZyYW1lIHNhbmRib3guXG4gICAgICovXG4gICAgZ2V0IHRydXN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuc2FuZGJveC5pbmRleE9mKCdhbGxvdy1zY3JpcHRzJykgIT09IC0xO1xuICAgIH1cbiAgICBzZXQgdHJ1c3RlZCh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy50cnVzdGVkID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnNhbmRib3ggPSBQcml2YXRlLnRydXN0ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2FuZGJveCA9IFByaXZhdGUudW50cnVzdGVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICB0aGlzLmNvbnRlbnQudXJsID0gdGhpcy5jb250ZW50LnVybDsgLy8gRm9yY2UgYSByZWZyZXNoLlxuICAgICAgICB0aGlzLl90cnVzdGVkQ2hhbmdlZC5lbWl0KHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW1pdHRlZCB3aGVuIHRoZSB0cnVzdCBzdGF0ZSBvZiB0aGUgZG9jdW1lbnQgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBnZXQgdHJ1c3RlZENoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90cnVzdGVkQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiByZXNvdXJjZXMgaGVsZCBieSB0aGUgaHRtbCB2aWV3ZXIuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX29iamVjdFVybCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHRoaXMuX29iamVjdFVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvKiBuby1vcCAqL1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGFuZCB1cGRhdGUgcmVxdWVzdC5cbiAgICAgKi9cbiAgICBvblVwZGF0ZVJlcXVlc3QoKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZW5kZXJQZW5kaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVuZGVyUGVuZGluZyA9IHRydWU7XG4gICAgICAgIHZvaWQgdGhpcy5fcmVuZGVyTW9kZWwoKS50aGVuKCgpID0+ICh0aGlzLl9yZW5kZXJQZW5kaW5nID0gZmFsc2UpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIEhUTUwgaW4gSUZyYW1lIGludG8gdGhpcyB3aWRnZXQncyBub2RlLlxuICAgICAqL1xuICAgIGFzeW5jIF9yZW5kZXJNb2RlbCgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmNvbnRleHQubW9kZWwudG9TdHJpbmcoKTtcbiAgICAgICAgZGF0YSA9IGF3YWl0IHRoaXMuX3NldEJhc2UoZGF0YSk7XG4gICAgICAgIC8vIFNldCB0aGUgbmV3IGlmcmFtZSB1cmwuXG4gICAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbZGF0YV0sIHsgdHlwZTogJ3RleHQvaHRtbCcgfSk7XG4gICAgICAgIGNvbnN0IG9sZFVybCA9IHRoaXMuX29iamVjdFVybDtcbiAgICAgICAgdGhpcy5fb2JqZWN0VXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgICAgdGhpcy5jb250ZW50LnVybCA9IHRoaXMuX29iamVjdFVybDtcbiAgICAgICAgLy8gUmVsZWFzZSByZWZlcmVuY2UgdG8gYW55IHByZXZpb3VzIG9iamVjdCB1cmwuXG4gICAgICAgIGlmIChvbGRVcmwpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChvbGRVcmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgLyogbm8tb3AgKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCBhIDxiYXNlPiBlbGVtZW50IGluIHRoZSBIVE1MIHN0cmluZyBzbyB0aGF0IHRoZSBpZnJhbWVcbiAgICAgKiBjYW4gY29ycmVjdGx5IGRlcmVmZXJlbmNlIHJlbGF0aXZlIGxpbmtzLlxuICAgICAqL1xuICAgIGFzeW5jIF9zZXRCYXNlKGRhdGEpIHtcbiAgICAgICAgY29uc3QgZG9jID0gdGhpcy5fcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhkYXRhLCAndGV4dC9odG1sJyk7XG4gICAgICAgIGxldCBiYXNlID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ2Jhc2UnKTtcbiAgICAgICAgaWYgKCFiYXNlKSB7XG4gICAgICAgICAgICBiYXNlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2Jhc2UnKTtcbiAgICAgICAgICAgIGRvYy5oZWFkLmluc2VydEJlZm9yZShiYXNlLCBkb2MuaGVhZC5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXRoID0gdGhpcy5jb250ZXh0LnBhdGg7XG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPSBhd2FpdCB0aGlzLmNvbnRleHQudXJsUmVzb2x2ZXIuZ2V0RG93bmxvYWRVcmwocGF0aCk7XG4gICAgICAgIC8vIFNldCB0aGUgYmFzZSBocmVmLCBwbHVzIGEgZmFrZSBuYW1lIGZvciB0aGUgdXJsIG9mIHRoaXNcbiAgICAgICAgLy8gZG9jdW1lbnQuIFRoZSBmYWtlIG5hbWUgZG9lc24ndCByZWFsbHkgbWF0dGVyLCBhcyBsb25nXG4gICAgICAgIC8vIGFzIHRoZSBkb2N1bWVudCBjYW4gZGVyZWZlcmVuY2UgcmVsYXRpdmUgbGlua3MgdG8gcmVzb3VyY2VzXG4gICAgICAgIC8vIChlLmcuIENTUyBhbmQgc2NyaXB0cykuXG4gICAgICAgIGJhc2UuaHJlZiA9IGJhc2VVcmw7XG4gICAgICAgIGJhc2UudGFyZ2V0ID0gJ19zZWxmJztcbiAgICAgICAgcmV0dXJuIGRvYy5kb2N1bWVudEVsZW1lbnQuaW5uZXJIVE1MO1xuICAgIH1cbn1cbi8qKlxuICogQSB3aWRnZXQgZmFjdG9yeSBmb3IgSFRNTFZpZXdlcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBIVE1MVmlld2VyRmFjdG9yeSBleHRlbmRzIEFCQ1dpZGdldEZhY3Rvcnkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyB3aWRnZXQgZ2l2ZW4gYSBjb250ZXh0LlxuICAgICAqL1xuICAgIGNyZWF0ZU5ld1dpZGdldChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBuZXcgSFRNTFZpZXdlcih7IGNvbnRleHQgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgZmFjdG9yeSBmb3IgdG9vbGJhciBpdGVtcyB0byBiZSBhZGRlZCBhZnRlciB0aGUgd2lkZ2V0IGlzIGNyZWF0ZWQuXG4gICAgICovXG4gICAgZGVmYXVsdFRvb2xiYXJGYWN0b3J5KHdpZGdldCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgLy8gTWFrZSBhIHJlZnJlc2ggYnV0dG9uIGZvciB0aGUgdG9vbGJhci5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAncmVmcmVzaCcsXG4gICAgICAgICAgICAgICAgd2lkZ2V0OiBUb29sYmFySXRlbXMuY3JlYXRlUmVmcmVzaEJ1dHRvbih3aWRnZXQsIHRoaXMudHJhbnNsYXRvcilcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBNYWtlIGEgdHJ1c3QgYnV0dG9uIGZvciB0aGUgdG9vbGJhci5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAndHJ1c3QnLFxuICAgICAgICAgICAgICAgIHdpZGdldDogVG9vbGJhckl0ZW1zLmNyZWF0ZVRydXN0QnV0dG9uKHdpZGdldCwgdGhpcy50cmFuc2xhdG9yKVxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH1cbn1cbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIHRvb2xiYXIgaXRlbXMgZ2VuZXJhdG9yXG4gKi9cbmV4cG9ydCB2YXIgVG9vbGJhckl0ZW1zO1xuKGZ1bmN0aW9uIChUb29sYmFySXRlbXMpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIHJlZnJlc2ggYnV0dG9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IEhUTUwgdmlld2VyIHdpZGdldFxuICAgICAqIEBwYXJhbSB0cmFuc2xhdG9yIEFwcGxpY2F0aW9uIHRyYW5zbGF0b3Igb2JqZWN0XG4gICAgICogQHJldHVybnMgVG9vbGJhciBpdGVtIGJ1dHRvblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVJlZnJlc2hCdXR0b24od2lkZ2V0LCB0cmFuc2xhdG9yKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gKHRyYW5zbGF0b3IgIT09IG51bGwgJiYgdHJhbnNsYXRvciAhPT0gdm9pZCAwID8gdHJhbnNsYXRvciA6IG51bGxUcmFuc2xhdG9yKS5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHJldHVybiBuZXcgVG9vbGJhckJ1dHRvbih7XG4gICAgICAgICAgICBpY29uOiByZWZyZXNoSWNvbixcbiAgICAgICAgICAgIG9uQ2xpY2s6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXdpZGdldC5jb250ZXh0Lm1vZGVsLmRpcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHdpZGdldC5jb250ZXh0LnJldmVydCgpO1xuICAgICAgICAgICAgICAgICAgICB3aWRnZXQudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IHRyYW5zLl9fKCdSZXJlbmRlciBIVE1MIERvY3VtZW50JylcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFRvb2xiYXJJdGVtcy5jcmVhdGVSZWZyZXNoQnV0dG9uID0gY3JlYXRlUmVmcmVzaEJ1dHRvbjtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIHRydXN0IGJ1dHRvblxuICAgICAqXG4gICAgICogQHBhcmFtIGRvY3VtZW50IEhUTUwgdmlld2VyIHdpZGdldFxuICAgICAqIEBwYXJhbSB0cmFuc2xhdG9yIEFwcGxpY2F0aW9uIHRyYW5zbGF0b3Igb2JqZWN0XG4gICAgICogQHJldHVybnMgVG9vbGJhciBpdGVtIGJ1dHRvblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVRydXN0QnV0dG9uKGRvY3VtZW50LCB0cmFuc2xhdG9yKSB7XG4gICAgICAgIHJldHVybiBSZWFjdFdpZGdldC5jcmVhdGUoUmVhY3QuY3JlYXRlRWxlbWVudChQcml2YXRlLlRydXN0QnV0dG9uQ29tcG9uZW50LCB7IGh0bWxEb2N1bWVudDogZG9jdW1lbnQsIHRyYW5zbGF0b3I6IHRyYW5zbGF0b3IgfSkpO1xuICAgIH1cbiAgICBUb29sYmFySXRlbXMuY3JlYXRlVHJ1c3RCdXR0b24gPSBjcmVhdGVUcnVzdEJ1dHRvbjtcbn0pKFRvb2xiYXJJdGVtcyB8fCAoVG9vbGJhckl0ZW1zID0ge30pKTtcbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIHByaXZhdGUgZGF0YS5cbiAqL1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICAvKipcbiAgICAgKiBTYW5kYm94IGV4Y2VwdGlvbnMgZm9yIHVudHJ1c3RlZCBIVE1MLlxuICAgICAqL1xuICAgIFByaXZhdGUudW50cnVzdGVkID0gW107XG4gICAgLyoqXG4gICAgICogU2FuZGJveCBleGNlcHRpb25zIGZvciB0cnVzdGVkIEhUTUwuXG4gICAgICovXG4gICAgUHJpdmF0ZS50cnVzdGVkID0gWydhbGxvdy1zY3JpcHRzJ107XG4gICAgLyoqXG4gICAgICogUmVhY3QgY29tcG9uZW50IGZvciBhIHRydXN0ZWQgYnV0dG9uLlxuICAgICAqXG4gICAgICogVGhpcyB3cmFwcyB0aGUgVG9vbGJhckJ1dHRvbkNvbXBvbmVudCBhbmQgd2F0Y2hlcyBmb3IgdHJ1c3QgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBUcnVzdEJ1dHRvbkNvbXBvbmVudChwcm9wcykge1xuICAgICAgICBjb25zdCB0cmFuc2xhdG9yID0gcHJvcHMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFVzZVNpZ25hbCwgeyBzaWduYWw6IHByb3BzLmh0bWxEb2N1bWVudC50cnVzdGVkQ2hhbmdlZCwgaW5pdGlhbFNlbmRlcjogcHJvcHMuaHRtbERvY3VtZW50IH0sICgpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xiYXJCdXR0b25Db21wb25lbnQsIHsgY2xhc3NOYW1lOiBcIlwiLCBvbkNsaWNrOiAoKSA9PiAocHJvcHMuaHRtbERvY3VtZW50LnRydXN0ZWQgPSAhcHJvcHMuaHRtbERvY3VtZW50LnRydXN0ZWQpLCB0b29sdGlwOiB0cmFucy5fXyhgV2hldGhlciB0aGUgSFRNTCBmaWxlIGlzIHRydXN0ZWQuXG5UcnVzdGluZyB0aGUgZmlsZSBhbGxvd3Mgc2NyaXB0cyB0byBydW4gaW4gaXQsXG53aGljaCBtYXkgcmVzdWx0IGluIHNlY3VyaXR5IHJpc2tzLlxuT25seSBlbmFibGUgZm9yIGZpbGVzIHlvdSB0cnVzdC5gKSwgbGFiZWw6IHByb3BzLmh0bWxEb2N1bWVudC50cnVzdGVkXG4gICAgICAgICAgICAgICAgPyB0cmFucy5fXygnRGlzdHJ1c3QgSFRNTCcpXG4gICAgICAgICAgICAgICAgOiB0cmFucy5fXygnVHJ1c3QgSFRNTCcpIH0pKSkpO1xuICAgIH1cbiAgICBQcml2YXRlLlRydXN0QnV0dG9uQ29tcG9uZW50ID0gVHJ1c3RCdXR0b25Db21wb25lbnQ7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=