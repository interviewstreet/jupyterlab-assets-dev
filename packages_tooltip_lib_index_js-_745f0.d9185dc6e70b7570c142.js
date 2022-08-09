(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_tooltip_lib_index_js-_745f0"],{

/***/ "../../packages/tooltip/lib/index.js":
/*!*******************************************!*\
  !*** ../../packages/tooltip/lib/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ITooltipManager": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_0__.ITooltipManager),
/* harmony export */   "Tooltip": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_1__.Tooltip)
/* harmony export */ });
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokens */ "../../packages/tooltip/lib/tokens.js");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widget */ "../../packages/tooltip/lib/widget.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module tooltip
 */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/tooltip/lib/tokens.js":
/*!********************************************!*\
  !*** ../../packages/tooltip/lib/tokens.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ITooltipManager": () => (/* binding */ ITooltipManager)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The tooltip manager token.
 */
const ITooltipManager = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/tooltip:ITooltipManager');
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/tooltip/lib/widget.js":
/*!********************************************!*\
  !*** ../../packages/tooltip/lib/widget.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tooltip": () => (/* binding */ Tooltip)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * The class name added to each tooltip.
 */
const TOOLTIP_CLASS = 'jp-Tooltip';
/**
 * The class name added to the tooltip content.
 */
const CONTENT_CLASS = 'jp-Tooltip-content';
/**
 * The class added to the body when a tooltip exists on the page.
 */
const BODY_CLASS = 'jp-mod-tooltip';
/**
 * The minimum height of a tooltip widget.
 */
const MIN_HEIGHT = 20;
/**
 * The maximum height of a tooltip widget.
 */
const MAX_HEIGHT = 250;
/**
 * A flag to indicate that event handlers are caught in the capture phase.
 */
const USE_CAPTURE = true;
/**
 * A tooltip widget.
 */
class Tooltip extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget {
    /**
     * Instantiate a tooltip.
     */
    constructor(options) {
        super();
        this._content = null;
        const layout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.PanelLayout());
        const model = new _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1__.MimeModel({ data: options.bundle });
        this.anchor = options.anchor;
        this.addClass(TOOLTIP_CLASS);
        this.hide();
        this._editor = options.editor;
        this._position = options.position;
        this._rendermime = options.rendermime;
        const mimeType = this._rendermime.preferredMimeType(options.bundle, 'any');
        if (!mimeType) {
            return;
        }
        this._content = this._rendermime.createRenderer(mimeType);
        this._content
            .renderModel(model)
            .then(() => this._setGeometry())
            .catch(error => console.error('tooltip rendering failed', error));
        this._content.addClass(CONTENT_CLASS);
        layout.addWidget(this._content);
    }
    /**
     * Dispose of the resources held by the widget.
     */
    dispose() {
        if (this._content) {
            this._content.dispose();
            this._content = null;
        }
        super.dispose();
    }
    /**
     * Handle the DOM events for the widget.
     *
     * @param event - The DOM event sent to the widget.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the dock panel's node. It should
     * not be called directly by user code.
     */
    handleEvent(event) {
        if (this.isHidden || this.isDisposed) {
            return;
        }
        const { node } = this;
        const target = event.target;
        switch (event.type) {
            case 'keydown':
                if (node.contains(target)) {
                    return;
                }
                this.dispose();
                break;
            case 'mousedown':
                if (node.contains(target)) {
                    this.activate();
                    return;
                }
                this.dispose();
                break;
            case 'scroll':
                this._evtScroll(event);
                break;
            default:
                break;
        }
    }
    /**
     * Handle `'activate-request'` messages.
     */
    onActivateRequest(msg) {
        this.node.tabIndex = 0;
        this.node.focus();
    }
    /**
     * Handle `'after-attach'` messages.
     */
    onAfterAttach(msg) {
        document.body.classList.add(BODY_CLASS);
        document.addEventListener('keydown', this, USE_CAPTURE);
        document.addEventListener('mousedown', this, USE_CAPTURE);
        this.anchor.node.addEventListener('scroll', this, USE_CAPTURE);
        this.update();
    }
    /**
     * Handle `before-detach` messages for the widget.
     */
    onBeforeDetach(msg) {
        document.body.classList.remove(BODY_CLASS);
        document.removeEventListener('keydown', this, USE_CAPTURE);
        document.removeEventListener('mousedown', this, USE_CAPTURE);
        this.anchor.node.removeEventListener('scroll', this, USE_CAPTURE);
    }
    /**
     * Handle `'update-request'` messages.
     */
    onUpdateRequest(msg) {
        if (this.isHidden) {
            this.show();
        }
        this._setGeometry();
        super.onUpdateRequest(msg);
    }
    /**
     * Handle scroll events for the widget
     */
    _evtScroll(event) {
        // All scrolls except scrolls in the actual hover box node may cause the
        // referent editor that anchors the node to move, so the only scroll events
        // that can safely be ignored are ones that happen inside the hovering node.
        if (this.node.contains(event.target)) {
            return;
        }
        this.update();
    }
    /**
     * Find the position of the first character of the current token.
     */
    _getTokenPosition() {
        const editor = this._editor;
        const cursor = editor.getCursorPosition();
        const end = editor.getOffsetAt(cursor);
        const line = editor.getLine(cursor.line);
        if (!line) {
            return;
        }
        const tokens = line.substring(0, end).split(/\W+/);
        const last = tokens[tokens.length - 1];
        const start = last ? end - last.length : end;
        return editor.getPositionAt(start);
    }
    /**
     * Set the geometry of the tooltip widget.
     */
    _setGeometry() {
        // determine position for hover box placement
        const position = this._position ? this._position : this._getTokenPosition();
        if (!position) {
            return;
        }
        const editor = this._editor;
        const anchor = editor.getCoordinateForPosition(position);
        const style = window.getComputedStyle(this.node);
        const paddingLeft = parseInt(style.paddingLeft, 10) || 0;
        // Calculate the geometry of the tooltip.
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.HoverBox.setGeometry({
            anchor,
            host: editor.host,
            maxHeight: MAX_HEIGHT,
            minHeight: MIN_HEIGHT,
            node: this.node,
            offset: { horizontal: -1 * paddingLeft },
            privilege: 'below',
            style: style
        });
    }
}
//# sourceMappingURL=widget.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9vbHRpcC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3Rvb2x0aXAvbGliL3Rva2Vucy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9vbHRpcC9saWIvd2lkZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDeUI7QUFDQTtBQUN6QixpQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQzBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ08sNEJBQTRCLG9EQUFLO0FBQ3hDLGtDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ2dEO0FBQ0c7QUFDRztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxzQkFBc0IsbURBQU07QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHdEQUFXO0FBQ3JELDBCQUEwQiw2REFBUyxFQUFFLHVCQUF1QjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNFQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLCtCQUErQjtBQUNwRDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxrQyIsImZpbGUiOiJwYWNrYWdlc190b29sdGlwX2xpYl9pbmRleF9qcy1fNzQ1ZjAuZDkxODVkYzZlNzBiNzU3MGMxNDIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSB0b29sdGlwXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vdG9rZW5zJztcbmV4cG9ydCAqIGZyb20gJy4vd2lkZ2V0Jztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuLyogdHNsaW50OmRpc2FibGUgKi9cbi8qKlxuICogVGhlIHRvb2x0aXAgbWFuYWdlciB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IElUb29sdGlwTWFuYWdlciA9IG5ldyBUb2tlbignQGp1cHl0ZXJsYWIvdG9vbHRpcDpJVG9vbHRpcE1hbmFnZXInKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRva2Vucy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBIb3ZlckJveCB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IE1pbWVNb2RlbCB9IGZyb20gJ0BqdXB5dGVybGFiL3JlbmRlcm1pbWUnO1xuaW1wb3J0IHsgUGFuZWxMYXlvdXQsIFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGVhY2ggdG9vbHRpcC5cbiAqL1xuY29uc3QgVE9PTFRJUF9DTEFTUyA9ICdqcC1Ub29sdGlwJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIHRvb2x0aXAgY29udGVudC5cbiAqL1xuY29uc3QgQ09OVEVOVF9DTEFTUyA9ICdqcC1Ub29sdGlwLWNvbnRlbnQnO1xuLyoqXG4gKiBUaGUgY2xhc3MgYWRkZWQgdG8gdGhlIGJvZHkgd2hlbiBhIHRvb2x0aXAgZXhpc3RzIG9uIHRoZSBwYWdlLlxuICovXG5jb25zdCBCT0RZX0NMQVNTID0gJ2pwLW1vZC10b29sdGlwJztcbi8qKlxuICogVGhlIG1pbmltdW0gaGVpZ2h0IG9mIGEgdG9vbHRpcCB3aWRnZXQuXG4gKi9cbmNvbnN0IE1JTl9IRUlHSFQgPSAyMDtcbi8qKlxuICogVGhlIG1heGltdW0gaGVpZ2h0IG9mIGEgdG9vbHRpcCB3aWRnZXQuXG4gKi9cbmNvbnN0IE1BWF9IRUlHSFQgPSAyNTA7XG4vKipcbiAqIEEgZmxhZyB0byBpbmRpY2F0ZSB0aGF0IGV2ZW50IGhhbmRsZXJzIGFyZSBjYXVnaHQgaW4gdGhlIGNhcHR1cmUgcGhhc2UuXG4gKi9cbmNvbnN0IFVTRV9DQVBUVVJFID0gdHJ1ZTtcbi8qKlxuICogQSB0b29sdGlwIHdpZGdldC5cbiAqL1xuZXhwb3J0IGNsYXNzIFRvb2x0aXAgZXh0ZW5kcyBXaWRnZXQge1xuICAgIC8qKlxuICAgICAqIEluc3RhbnRpYXRlIGEgdG9vbHRpcC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSBudWxsO1xuICAgICAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5sYXlvdXQgPSBuZXcgUGFuZWxMYXlvdXQoKSk7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gbmV3IE1pbWVNb2RlbCh7IGRhdGE6IG9wdGlvbnMuYnVuZGxlIH0pO1xuICAgICAgICB0aGlzLmFuY2hvciA9IG9wdGlvbnMuYW5jaG9yO1xuICAgICAgICB0aGlzLmFkZENsYXNzKFRPT0xUSVBfQ0xBU1MpO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgdGhpcy5fZWRpdG9yID0gb3B0aW9ucy5lZGl0b3I7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gb3B0aW9ucy5wb3NpdGlvbjtcbiAgICAgICAgdGhpcy5fcmVuZGVybWltZSA9IG9wdGlvbnMucmVuZGVybWltZTtcbiAgICAgICAgY29uc3QgbWltZVR5cGUgPSB0aGlzLl9yZW5kZXJtaW1lLnByZWZlcnJlZE1pbWVUeXBlKG9wdGlvbnMuYnVuZGxlLCAnYW55Jyk7XG4gICAgICAgIGlmICghbWltZVR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jb250ZW50ID0gdGhpcy5fcmVuZGVybWltZS5jcmVhdGVSZW5kZXJlcihtaW1lVHlwZSk7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRcbiAgICAgICAgICAgIC5yZW5kZXJNb2RlbChtb2RlbClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuX3NldEdlb21ldHJ5KCkpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcigndG9vbHRpcCByZW5kZXJpbmcgZmFpbGVkJywgZXJyb3IpKTtcbiAgICAgICAgdGhpcy5fY29udGVudC5hZGRDbGFzcyhDT05URU5UX0NMQVNTKTtcbiAgICAgICAgbGF5b3V0LmFkZFdpZGdldCh0aGlzLl9jb250ZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5fY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5fY29udGVudC5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgRE9NIGV2ZW50cyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudCAtIFRoZSBET00gZXZlbnQgc2VudCB0byB0aGUgd2lkZ2V0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgbWV0aG9kIGltcGxlbWVudHMgdGhlIERPTSBgRXZlbnRMaXN0ZW5lcmAgaW50ZXJmYWNlIGFuZCBpc1xuICAgICAqIGNhbGxlZCBpbiByZXNwb25zZSB0byBldmVudHMgb24gdGhlIGRvY2sgcGFuZWwncyBub2RlLiBJdCBzaG91bGRcbiAgICAgKiBub3QgYmUgY2FsbGVkIGRpcmVjdGx5IGJ5IHVzZXIgY29kZS5cbiAgICAgKi9cbiAgICBoYW5kbGVFdmVudChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0hpZGRlbiB8fCB0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IG5vZGUgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdrZXlkb3duJzpcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgICAgICAgICAgIGlmIChub2RlLmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2Nyb2xsJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldnRTY3JvbGwoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYCdhY3RpdmF0ZS1yZXF1ZXN0J2AgbWVzc2FnZXMuXG4gICAgICovXG4gICAgb25BY3RpdmF0ZVJlcXVlc3QobXNnKSB7XG4gICAgICAgIHRoaXMubm9kZS50YWJJbmRleCA9IDA7XG4gICAgICAgIHRoaXMubm9kZS5mb2N1cygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYCdhZnRlci1hdHRhY2gnYCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBvbkFmdGVyQXR0YWNoKG1zZykge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoQk9EWV9DTEFTUyk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLCBVU0VfQ0FQVFVSRSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMsIFVTRV9DQVBUVVJFKTtcbiAgICAgICAgdGhpcy5hbmNob3Iubm9kZS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLCBVU0VfQ0FQVFVSRSk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgYmVmb3JlLWRldGFjaGAgbWVzc2FnZXMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgb25CZWZvcmVEZXRhY2gobXNnKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShCT0RZX0NMQVNTKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMsIFVTRV9DQVBUVVJFKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcywgVVNFX0NBUFRVUkUpO1xuICAgICAgICB0aGlzLmFuY2hvci5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMsIFVTRV9DQVBUVVJFKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGAndXBkYXRlLXJlcXVlc3QnYCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBvblVwZGF0ZVJlcXVlc3QobXNnKSB7XG4gICAgICAgIGlmICh0aGlzLmlzSGlkZGVuKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXRHZW9tZXRyeSgpO1xuICAgICAgICBzdXBlci5vblVwZGF0ZVJlcXVlc3QobXNnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHNjcm9sbCBldmVudHMgZm9yIHRoZSB3aWRnZXRcbiAgICAgKi9cbiAgICBfZXZ0U2Nyb2xsKGV2ZW50KSB7XG4gICAgICAgIC8vIEFsbCBzY3JvbGxzIGV4Y2VwdCBzY3JvbGxzIGluIHRoZSBhY3R1YWwgaG92ZXIgYm94IG5vZGUgbWF5IGNhdXNlIHRoZVxuICAgICAgICAvLyByZWZlcmVudCBlZGl0b3IgdGhhdCBhbmNob3JzIHRoZSBub2RlIHRvIG1vdmUsIHNvIHRoZSBvbmx5IHNjcm9sbCBldmVudHNcbiAgICAgICAgLy8gdGhhdCBjYW4gc2FmZWx5IGJlIGlnbm9yZWQgYXJlIG9uZXMgdGhhdCBoYXBwZW4gaW5zaWRlIHRoZSBob3ZlcmluZyBub2RlLlxuICAgICAgICBpZiAodGhpcy5ub2RlLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBjdXJyZW50IHRva2VuLlxuICAgICAqL1xuICAgIF9nZXRUb2tlblBvc2l0aW9uKCkge1xuICAgICAgICBjb25zdCBlZGl0b3IgPSB0aGlzLl9lZGl0b3I7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICBjb25zdCBlbmQgPSBlZGl0b3IuZ2V0T2Zmc2V0QXQoY3Vyc29yKTtcbiAgICAgICAgY29uc3QgbGluZSA9IGVkaXRvci5nZXRMaW5lKGN1cnNvci5saW5lKTtcbiAgICAgICAgaWYgKCFsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdG9rZW5zID0gbGluZS5zdWJzdHJpbmcoMCwgZW5kKS5zcGxpdCgvXFxXKy8pO1xuICAgICAgICBjb25zdCBsYXN0ID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBsYXN0ID8gZW5kIC0gbGFzdC5sZW5ndGggOiBlbmQ7XG4gICAgICAgIHJldHVybiBlZGl0b3IuZ2V0UG9zaXRpb25BdChzdGFydCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZ2VvbWV0cnkgb2YgdGhlIHRvb2x0aXAgd2lkZ2V0LlxuICAgICAqL1xuICAgIF9zZXRHZW9tZXRyeSgpIHtcbiAgICAgICAgLy8gZGV0ZXJtaW5lIHBvc2l0aW9uIGZvciBob3ZlciBib3ggcGxhY2VtZW50XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5fcG9zaXRpb24gPyB0aGlzLl9wb3NpdGlvbiA6IHRoaXMuX2dldFRva2VuUG9zaXRpb24oKTtcbiAgICAgICAgaWYgKCFwb3NpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVkaXRvciA9IHRoaXMuX2VkaXRvcjtcbiAgICAgICAgY29uc3QgYW5jaG9yID0gZWRpdG9yLmdldENvb3JkaW5hdGVGb3JQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5ub2RlKTtcbiAgICAgICAgY29uc3QgcGFkZGluZ0xlZnQgPSBwYXJzZUludChzdHlsZS5wYWRkaW5nTGVmdCwgMTApIHx8IDA7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZ2VvbWV0cnkgb2YgdGhlIHRvb2x0aXAuXG4gICAgICAgIEhvdmVyQm94LnNldEdlb21ldHJ5KHtcbiAgICAgICAgICAgIGFuY2hvcixcbiAgICAgICAgICAgIGhvc3Q6IGVkaXRvci5ob3N0LFxuICAgICAgICAgICAgbWF4SGVpZ2h0OiBNQVhfSEVJR0hULFxuICAgICAgICAgICAgbWluSGVpZ2h0OiBNSU5fSEVJR0hULFxuICAgICAgICAgICAgbm9kZTogdGhpcy5ub2RlLFxuICAgICAgICAgICAgb2Zmc2V0OiB7IGhvcml6b250YWw6IC0xICogcGFkZGluZ0xlZnQgfSxcbiAgICAgICAgICAgIHByaXZpbGVnZTogJ2JlbG93JyxcbiAgICAgICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgICB9KTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD13aWRnZXQuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==