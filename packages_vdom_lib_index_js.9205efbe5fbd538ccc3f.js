(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_vdom_lib_index_js"],{

/***/ "../../packages/vdom/lib/index.js":
/*!****************************************!*\
  !*** ../../packages/vdom/lib/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IVDOMTracker": () => (/* binding */ IVDOMTracker),
/* harmony export */   "RenderedVDOM": () => (/* binding */ RenderedVDOM)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nteract_transform_vdom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nteract/transform-vdom */ "../../node_modules/@nteract/transform-vdom/lib/index.js");
/* harmony import */ var _nteract_transform_vdom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nteract_transform_vdom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom */ "webpack/sharing/consume/default/react-dom/react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_4__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module vdom
 */





/**
 * The CSS class to add to the VDOM Widget.
 */
const CSS_CLASS = 'jp-RenderedVDOM';
/**
 * The VDOM tracker token.
 */
const IVDOMTracker = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/vdom:IVDOMTracker');
/**
 * A renderer for declarative virtual DOM content.
 */
class RenderedVDOM extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Widget {
    /**
     * Create a new widget for rendering DOM.
     */
    constructor(options, context) {
        super();
        /**
         * Handle events for VDOM element.
         */
        this.handleVDOMEvent = (targetName, event) => {
            var _a, _b;
            // When a VDOM element's event handler is called, send a serialized
            // representation of the event to the registered comm channel for the
            // kernel to handle
            if (this._timer) {
                window.clearTimeout(this._timer);
            }
            const kernel = (_b = (_a = this._sessionContext) === null || _a === void 0 ? void 0 : _a.session) === null || _b === void 0 ? void 0 : _b.kernel;
            if (kernel) {
                this._timer = window.setTimeout(() => {
                    if (!this._comms[targetName]) {
                        this._comms[targetName] = kernel.createComm(targetName);
                        this._comms[targetName].open();
                    }
                    this._comms[targetName].send(JSON.stringify(event));
                }, 16);
            }
        };
        this._comms = {};
        this.addClass(CSS_CLASS);
        this.addClass('jp-RenderedHTML');
        this.addClass('jp-RenderedHTMLCommon');
        this._mimeType = options.mimeType;
        if (context) {
            this._sessionContext = context.sessionContext;
        }
    }
    /**
     * Dispose of the widget.
     */
    dispose() {
        // Dispose of comm disposables
        for (const targetName in this._comms) {
            this._comms[targetName].dispose();
        }
        super.dispose();
    }
    /**
     * Called before the widget is detached from the DOM.
     */
    onBeforeDetach(msg) {
        // Dispose of React component(s).
        react_dom__WEBPACK_IMPORTED_MODULE_4__.unmountComponentAtNode(this.node);
    }
    /**
     * Render VDOM into this widget's node.
     */
    renderModel(model) {
        return new Promise((resolve, reject) => {
            const data = model.data[this._mimeType];
            react_dom__WEBPACK_IMPORTED_MODULE_4__.render(react__WEBPACK_IMPORTED_MODULE_3__.createElement((_nteract_transform_vdom__WEBPACK_IMPORTED_MODULE_2___default()), { data: data, onVDOMEvent: this.handleVDOMEvent }), this.node, () => {
                resolve();
            });
        });
    }
}
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdmRvbS9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzBDO0FBQ0Q7QUFDRTtBQUNaO0FBQ087QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyx5QkFBeUIsb0RBQUs7QUFDckM7QUFDQTtBQUNBO0FBQ08sMkJBQTJCLG1EQUFNO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2REFBK0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDZDQUFlLENBQUMsZ0RBQW1CLENBQUMsZ0VBQUksR0FBRyxnREFBZ0Q7QUFDdkc7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxpQyIsImZpbGUiOiJwYWNrYWdlc192ZG9tX2xpYl9pbmRleF9qcy45MjA1ZWZiZTVmYmQ1MzhjY2MzZi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIHZkb21cbiAqL1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuaW1wb3J0IFZET00gZnJvbSAnQG50ZXJhY3QvdHJhbnNmb3JtLXZkb20nO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbi8qKlxuICogVGhlIENTUyBjbGFzcyB0byBhZGQgdG8gdGhlIFZET00gV2lkZ2V0LlxuICovXG5jb25zdCBDU1NfQ0xBU1MgPSAnanAtUmVuZGVyZWRWRE9NJztcbi8qKlxuICogVGhlIFZET00gdHJhY2tlciB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IElWRE9NVHJhY2tlciA9IG5ldyBUb2tlbignQGp1cHl0ZXJsYWIvdmRvbTpJVkRPTVRyYWNrZXInKTtcbi8qKlxuICogQSByZW5kZXJlciBmb3IgZGVjbGFyYXRpdmUgdmlydHVhbCBET00gY29udGVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlbmRlcmVkVkRPTSBleHRlbmRzIFdpZGdldCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHdpZGdldCBmb3IgcmVuZGVyaW5nIERPTS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgZXZlbnRzIGZvciBWRE9NIGVsZW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmhhbmRsZVZET01FdmVudCA9ICh0YXJnZXROYW1lLCBldmVudCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIC8vIFdoZW4gYSBWRE9NIGVsZW1lbnQncyBldmVudCBoYW5kbGVyIGlzIGNhbGxlZCwgc2VuZCBhIHNlcmlhbGl6ZWRcbiAgICAgICAgICAgIC8vIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBldmVudCB0byB0aGUgcmVnaXN0ZXJlZCBjb21tIGNoYW5uZWwgZm9yIHRoZVxuICAgICAgICAgICAgLy8ga2VybmVsIHRvIGhhbmRsZVxuICAgICAgICAgICAgaWYgKHRoaXMuX3RpbWVyKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBrZXJuZWwgPSAoX2IgPSAoX2EgPSB0aGlzLl9zZXNzaW9uQ29udGV4dCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNlc3Npb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5rZXJuZWw7XG4gICAgICAgICAgICBpZiAoa2VybmVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY29tbXNbdGFyZ2V0TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbW1zW3RhcmdldE5hbWVdID0ga2VybmVsLmNyZWF0ZUNvbW0odGFyZ2V0TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21tc1t0YXJnZXROYW1lXS5vcGVuKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tbXNbdGFyZ2V0TmFtZV0uc2VuZChKU09OLnN0cmluZ2lmeShldmVudCkpO1xuICAgICAgICAgICAgICAgIH0sIDE2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fY29tbXMgPSB7fTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhDU1NfQ0xBU1MpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1SZW5kZXJlZEhUTUwnKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtUmVuZGVyZWRIVE1MQ29tbW9uJyk7XG4gICAgICAgIHRoaXMuX21pbWVUeXBlID0gb3B0aW9ucy5taW1lVHlwZTtcbiAgICAgICAgaWYgKGNvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nlc3Npb25Db250ZXh0ID0gY29udGV4dC5zZXNzaW9uQ29udGV4dDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgLy8gRGlzcG9zZSBvZiBjb21tIGRpc3Bvc2FibGVzXG4gICAgICAgIGZvciAoY29uc3QgdGFyZ2V0TmFtZSBpbiB0aGlzLl9jb21tcykge1xuICAgICAgICAgICAgdGhpcy5fY29tbXNbdGFyZ2V0TmFtZV0uZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJlZm9yZSB0aGUgd2lkZ2V0IGlzIGRldGFjaGVkIGZyb20gdGhlIERPTS5cbiAgICAgKi9cbiAgICBvbkJlZm9yZURldGFjaChtc2cpIHtcbiAgICAgICAgLy8gRGlzcG9zZSBvZiBSZWFjdCBjb21wb25lbnQocykuXG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy5ub2RlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIFZET00gaW50byB0aGlzIHdpZGdldCdzIG5vZGUuXG4gICAgICovXG4gICAgcmVuZGVyTW9kZWwobW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBtb2RlbC5kYXRhW3RoaXMuX21pbWVUeXBlXTtcbiAgICAgICAgICAgIFJlYWN0RE9NLnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KFZET00sIHsgZGF0YTogZGF0YSwgb25WRE9NRXZlbnQ6IHRoaXMuaGFuZGxlVkRPTUV2ZW50IH0pLCB0aGlzLm5vZGUsICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==