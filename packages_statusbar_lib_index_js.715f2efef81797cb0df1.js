(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_statusbar_lib_index_js"],{

/***/ "../../packages/statusbar/lib/components/group.js":
/*!********************************************************!*\
  !*** ../../packages/statusbar/lib/components/group.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroupItem": () => (/* binding */ GroupItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typestyle_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typestyle/lib */ "../../node_modules/typestyle/lib/index.js");
/* harmony import */ var _style_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/layout */ "../../packages/statusbar/lib/style/layout.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};



const groupItemLayout = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_1__.style)(_style_layout__WEBPACK_IMPORTED_MODULE_2__.centeredFlex, _style_layout__WEBPACK_IMPORTED_MODULE_2__.leftToRight);
/**
 * A tsx component for a set of items logically grouped together.
 */
function GroupItem(props) {
    const { spacing, children, className } = props, rest = __rest(props, ["spacing", "children", "className"]);
    const numChildren = react__WEBPACK_IMPORTED_MODULE_0__.Children.count(children);
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", Object.assign({ className: (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_1__.classes)(groupItemLayout, className) }, rest), react__WEBPACK_IMPORTED_MODULE_0__.Children.map(children, (child, i) => {
        if (i === 0) {
            return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { marginRight: `${spacing}px` } }, child);
        }
        else if (i === numChildren - 1) {
            return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { marginLeft: `${spacing}px` } }, child);
        }
        else {
            return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { margin: `0px ${spacing}px` } }, child);
        }
    })));
}
//# sourceMappingURL=group.js.map

/***/ }),

/***/ "../../packages/statusbar/lib/components/hover.js":
/*!********************************************************!*\
  !*** ../../packages/statusbar/lib/components/hover.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showPopup": () => (/* binding */ showPopup),
/* harmony export */   "Popup": () => (/* binding */ Popup)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typestyle_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typestyle/lib */ "../../node_modules/typestyle/lib/index.js");
/* harmony import */ var _style_statusbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/statusbar */ "../../packages/statusbar/lib/style/statusbar.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.




const hoverItem = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_2__.style)({
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
});
/**
 * Create and show a popup component.
 *
 * @param options - options for the popup
 *
 * @returns the popup that was created.
 */
function showPopup(options) {
    const dialog = new Popup(options);
    dialog.launch();
    return dialog;
}
/**
 * A class for a Popup widget.
 */
class Popup extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Widget {
    /**
     * Construct a new Popup.
     */
    constructor(options) {
        super();
        this._body = options.body;
        this._body.addClass(hoverItem);
        this._anchor = options.anchor;
        this._align = options.align;
        const layout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.PanelLayout());
        layout.addWidget(options.body);
        this._body.node.addEventListener('resize', () => {
            this.update();
        });
    }
    /**
     * Attach the popup widget to the page.
     */
    launch() {
        this._setGeometry();
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Widget.attach(this, document.body);
        this.update();
        this._anchor.addClass(_style_statusbar__WEBPACK_IMPORTED_MODULE_3__.clickedItem);
        this._anchor.removeClass(_style_statusbar__WEBPACK_IMPORTED_MODULE_3__.interactiveItem);
    }
    /**
     * Handle `'update'` messages for the widget.
     */
    onUpdateRequest(msg) {
        this._setGeometry();
        super.onUpdateRequest(msg);
    }
    /**
     * Handle `'after-attach'` messages for the widget.
     */
    onAfterAttach(msg) {
        document.addEventListener('click', this, false);
        this.node.addEventListener('keydown', this, false);
        window.addEventListener('resize', this, false);
    }
    /**
     * Handle `'after-detach'` messages for the widget.
     */
    onAfterDetach(msg) {
        document.removeEventListener('click', this, false);
        this.node.removeEventListener('keydown', this, false);
        window.removeEventListener('resize', this, false);
    }
    /**
     * Handle `'resize'` messages for the widget.
     */
    onResize() {
        this.update();
    }
    /**
     * Dispose of the widget.
     */
    dispose() {
        super.dispose();
        this._anchor.removeClass(_style_statusbar__WEBPACK_IMPORTED_MODULE_3__.clickedItem);
        this._anchor.addClass(_style_statusbar__WEBPACK_IMPORTED_MODULE_3__.interactiveItem);
    }
    /**
     * Handle DOM events for the widget.
     */
    handleEvent(event) {
        switch (event.type) {
            case 'keydown':
                this._evtKeydown(event);
                break;
            case 'click':
                this._evtClick(event);
                break;
            case 'resize':
                this.onResize();
                break;
            default:
                break;
        }
    }
    _evtClick(event) {
        if (!!event.target &&
            !(this._body.node.contains(event.target) ||
                this._anchor.node.contains(event.target))) {
            this.dispose();
        }
    }
    _evtKeydown(event) {
        // Check for escape key
        switch (event.keyCode) {
            case 27: // Escape.
                event.stopPropagation();
                event.preventDefault();
                this.dispose();
                break;
            default:
                break;
        }
    }
    _setGeometry() {
        let aligned = 0;
        const anchorRect = this._anchor.node.getBoundingClientRect();
        const bodyRect = this._body.node.getBoundingClientRect();
        if (this._align === 'right') {
            aligned = -(bodyRect.width - anchorRect.width);
        }
        const style = window.getComputedStyle(this._body.node);
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.HoverBox.setGeometry({
            anchor: anchorRect,
            host: document.body,
            maxHeight: 500,
            minHeight: 20,
            node: this._body.node,
            offset: {
                horizontal: aligned
            },
            privilege: 'forceAbove',
            style
        });
    }
}
//# sourceMappingURL=hover.js.map

/***/ }),

/***/ "../../packages/statusbar/lib/components/index.js":
/*!********************************************************!*\
  !*** ../../packages/statusbar/lib/components/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroupItem": () => (/* reexport safe */ _group__WEBPACK_IMPORTED_MODULE_0__.GroupItem),
/* harmony export */   "Popup": () => (/* reexport safe */ _hover__WEBPACK_IMPORTED_MODULE_1__.Popup),
/* harmony export */   "showPopup": () => (/* reexport safe */ _hover__WEBPACK_IMPORTED_MODULE_1__.showPopup),
/* harmony export */   "ProgressBar": () => (/* reexport safe */ _progressBar__WEBPACK_IMPORTED_MODULE_2__.ProgressBar),
/* harmony export */   "TextItem": () => (/* reexport safe */ _text__WEBPACK_IMPORTED_MODULE_3__.TextItem),
/* harmony export */   "ProgressCircle": () => (/* reexport safe */ _progressCircle__WEBPACK_IMPORTED_MODULE_4__.ProgressCircle)
/* harmony export */ });
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./group */ "../../packages/statusbar/lib/components/group.js");
/* harmony import */ var _hover__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hover */ "../../packages/statusbar/lib/components/hover.js");
/* harmony import */ var _progressBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./progressBar */ "../../packages/statusbar/lib/components/progressBar.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./text */ "../../packages/statusbar/lib/components/text.js");
/* harmony import */ var _progressCircle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./progressCircle */ "../../packages/statusbar/lib/components/progressCircle.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/statusbar/lib/components/progressBar.js":
/*!**************************************************************!*\
  !*** ../../packages/statusbar/lib/components/progressBar.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProgressBar": () => (/* binding */ ProgressBar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};

/**
 * A functional tsx component for a progress bar.
 */
function ProgressBar(props) {
    const { width, percentage } = props, rest = __rest(props, ["width", "percentage"]);
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: 'jp-Statusbar-ProgressBar-progress-bar', role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": percentage },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(Filler, Object.assign({}, Object.assign({ percentage }, rest), { contentWidth: width }))));
}
/**
 * A functional tsx component for a partially filled div.
 */
function Filler(props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: {
            width: `${props.percentage}%`
        } },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, props.content)));
}
//# sourceMappingURL=progressBar.js.map

/***/ }),

/***/ "../../packages/statusbar/lib/components/progressCircle.js":
/*!*****************************************************************!*\
  !*** ../../packages/statusbar/lib/components/progressCircle.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProgressCircle": () => (/* binding */ ProgressCircle)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function ProgressCircle(props) {
    const radius = 104;
    const d = (progress) => {
        const angle = Math.max(progress * 3.6, 0.1);
        const rad = (angle * Math.PI) / 180, x = Math.sin(rad) * radius, y = Math.cos(rad) * -radius, mid = angle < 180 ? 1 : 0, shape = `M 0 0 v -${radius} A ${radius} ${radius} 1 ` +
            mid +
            ' 0 ' +
            x.toFixed(4) +
            ' ' +
            y.toFixed(4) +
            ' z';
        return shape;
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: 'jp-Statusbar-ProgressCircle', role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": props.progress },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", { viewBox: "0 0 250 250" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("circle", { cx: "125", cy: "125", r: `${radius}`, stroke: "var(--jp-inverse-layout-color3)", strokeWidth: "20", fill: "none" }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { transform: "translate(125,125) scale(.9)", d: d(props.progress), fill: 'var(--jp-inverse-layout-color3)' }))));
}
//# sourceMappingURL=progressCircle.js.map

/***/ }),

/***/ "../../packages/statusbar/lib/components/text.js":
/*!*******************************************************!*\
  !*** ../../packages/statusbar/lib/components/text.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextItem": () => (/* binding */ TextItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typestyle_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typestyle/lib */ "../../node_modules/typestyle/lib/index.js");
/* harmony import */ var _style_text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/text */ "../../packages/statusbar/lib/style/text.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};



/**
 * A functional tsx component for a text item.
 */
function TextItem(props) {
    const { title, source, className } = props, rest = __rest(props, ["title", "source", "className"]);
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", Object.assign({ className: (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_1__.classes)(_style_text__WEBPACK_IMPORTED_MODULE_2__.textItem, className), title: title }, rest), source));
}
//# sourceMappingURL=text.js.map

/***/ }),

/***/ "../../packages/statusbar/lib/defaults/index.js":
/*!******************************************************!*\
  !*** ../../packages/statusbar/lib/defaults/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KernelStatus": () => (/* reexport safe */ _kernelStatus__WEBPACK_IMPORTED_MODULE_0__.KernelStatus),
/* harmony export */   "LineCol": () => (/* reexport safe */ _lineCol__WEBPACK_IMPORTED_MODULE_1__.LineCol),
/* harmony export */   "RunningSessions": () => (/* reexport safe */ _runningSessions__WEBPACK_IMPORTED_MODULE_2__.RunningSessions)
/* harmony export */ });
/* harmony import */ var _kernelStatus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kernelStatus */ "../../packages/statusbar/lib/defaults/kernelStatus.js");
/* harmony import */ var _lineCol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lineCol */ "../../packages/statusbar/lib/defaults/lineCol.js");
/* harmony import */ var _runningSessions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./runningSessions */ "../../packages/statusbar/lib/defaults/runningSessions.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/statusbar/lib/defaults/kernelStatus.js":
/*!*************************************************************!*\
  !*** ../../packages/statusbar/lib/defaults/kernelStatus.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KernelStatus": () => (/* binding */ KernelStatus)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! .. */ "../../packages/statusbar/lib/index.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.





/**
 * A pure functional component for rendering kernel status.
 */
function KernelStatusComponent(props) {
    const translator = props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
    const trans = translator.load('jupyterlab');
    let statusText = '';
    if (props.status) {
        statusText = ` | ${props.status}`;
    }
    return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(___WEBPACK_IMPORTED_MODULE_4__.TextItem, { onClick: props.handleClick, source: `${props.kernelName}${statusText}`, title: trans.__('Change kernel for %1', props.activityName) }));
}
/**
 * A VDomRenderer widget for displaying the status of a kernel.
 */
class KernelStatus extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomRenderer {
    /**
     * Construct the kernel status widget.
     */
    constructor(opts, translator) {
        super(new KernelStatus.Model(translator));
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this._handleClick = opts.onClick;
        this.addClass(___WEBPACK_IMPORTED_MODULE_4__.interactiveItem);
    }
    /**
     * Render the kernel status item.
     */
    render() {
        if (this.model === null) {
            return null;
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(KernelStatusComponent, { status: this.model.status, kernelName: this.model.kernelName, activityName: this.model.activityName, handleClick: this._handleClick, translator: this.translator }));
        }
    }
}
/**
 * A namespace for KernelStatus statics.
 */
(function (KernelStatus) {
    /**
     * A VDomModel for the kernel status indicator.
     */
    class Model extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomModel {
        constructor(translator) {
            super();
            /**
             * React to changes to the kernel status.
             */
            this._onKernelStatusChanged = () => {
                var _a;
                this._kernelStatus = (_a = this._sessionContext) === null || _a === void 0 ? void 0 : _a.kernelDisplayStatus;
                this.stateChanged.emit(void 0);
            };
            /**
             * React to changes in the kernel.
             */
            this._onKernelChanged = (_sessionContext, change) => {
                var _a;
                const oldState = this._getAllState();
                // sync setting of status and display name
                this._kernelStatus = (_a = this._sessionContext) === null || _a === void 0 ? void 0 : _a.kernelDisplayStatus;
                this._kernelName = _sessionContext.kernelDisplayName;
                this._triggerChange(oldState, this._getAllState());
            };
            this._activityName = 'activity'; // FIXME-TRANS:?
            this._kernelStatus = '';
            this._sessionContext = null;
            translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
            this._trans = translator.load('jupyterlab');
            this._kernelName = this._trans.__('No Kernel!');
            this._statusNames = (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.translateKernelStatuses)(translator);
        }
        /**
         * The name of the kernel.
         */
        get kernelName() {
            return this._kernelName;
        }
        /**
         * The current status of the kernel.
         */
        get status() {
            return this._kernelStatus
                ? this._statusNames[this._kernelStatus]
                : undefined;
        }
        /**
         * A display name for the activity.
         */
        get activityName() {
            return this._activityName;
        }
        set activityName(val) {
            const oldVal = this._activityName;
            if (oldVal === val) {
                return;
            }
            this._activityName = val;
            this.stateChanged.emit(void 0);
        }
        /**
         * The current client session associated with the kernel status indicator.
         */
        get sessionContext() {
            return this._sessionContext;
        }
        set sessionContext(sessionContext) {
            var _a, _b, _c;
            (_a = this._sessionContext) === null || _a === void 0 ? void 0 : _a.statusChanged.disconnect(this._onKernelStatusChanged);
            (_b = this._sessionContext) === null || _b === void 0 ? void 0 : _b.kernelChanged.disconnect(this._onKernelChanged);
            const oldState = this._getAllState();
            this._sessionContext = sessionContext;
            this._kernelStatus = sessionContext === null || sessionContext === void 0 ? void 0 : sessionContext.kernelDisplayStatus;
            this._kernelName = (_c = sessionContext === null || sessionContext === void 0 ? void 0 : sessionContext.kernelDisplayName) !== null && _c !== void 0 ? _c : this._trans.__('No Kernel');
            sessionContext === null || sessionContext === void 0 ? void 0 : sessionContext.statusChanged.connect(this._onKernelStatusChanged, this);
            sessionContext === null || sessionContext === void 0 ? void 0 : sessionContext.connectionStatusChanged.connect(this._onKernelStatusChanged, this);
            sessionContext === null || sessionContext === void 0 ? void 0 : sessionContext.kernelChanged.connect(this._onKernelChanged, this);
            this._triggerChange(oldState, this._getAllState());
        }
        _getAllState() {
            return [this._kernelName, this._kernelStatus, this._activityName];
        }
        _triggerChange(oldState, newState) {
            if (_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.JSONExt.deepEqual(oldState, newState)) {
                this.stateChanged.emit(void 0);
            }
        }
    }
    KernelStatus.Model = Model;
})(KernelStatus || (KernelStatus = {}));
//# sourceMappingURL=kernelStatus.js.map

/***/ }),

/***/ "../../packages/statusbar/lib/defaults/lineCol.js":
/*!********************************************************!*\
  !*** ../../packages/statusbar/lib/defaults/lineCol.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LineCol": () => (/* binding */ LineCol)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var typestyle_lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typestyle/lib */ "../../node_modules/typestyle/lib/index.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! .. */ "../../packages/statusbar/lib/index.js");
/* harmony import */ var _style_lineForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style/lineForm */ "../../packages/statusbar/lib/style/lineForm.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







/**
 * A component for rendering a "go-to-line" form.
 */
class LineFormComponent extends (react__WEBPACK_IMPORTED_MODULE_3___default().Component) {
    /**
     * Construct a new LineFormComponent.
     */
    constructor(props) {
        super(props);
        /**
         * Handle a change to the value in the input field.
         */
        this._handleChange = (event) => {
            this.setState({ value: event.currentTarget.value });
        };
        /**
         * Handle submission of the input field.
         */
        this._handleSubmit = (event) => {
            event.preventDefault();
            const value = parseInt(this._textInput.value, 10);
            if (!isNaN(value) &&
                isFinite(value) &&
                1 <= value &&
                value <= this.props.maxLine) {
                this.props.handleSubmit(value);
            }
            return false;
        };
        /**
         * Handle focusing of the input field.
         */
        this._handleFocus = () => {
            this.setState({ hasFocus: true });
        };
        /**
         * Handle blurring of the input field.
         */
        this._handleBlur = () => {
            this.setState({ hasFocus: false });
        };
        this._textInput = null;
        this.translator = props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this.state = {
            value: '',
            hasFocus: false
        };
    }
    /**
     * Focus the element on mount.
     */
    componentDidMount() {
        this._textInput.focus();
    }
    /**
     * Render the LineFormComponent.
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement("div", { className: _style_lineForm__WEBPACK_IMPORTED_MODULE_6__.lineFormSearch },
            react__WEBPACK_IMPORTED_MODULE_3___default().createElement("form", { name: "lineColumnForm", onSubmit: this._handleSubmit, noValidate: true },
                react__WEBPACK_IMPORTED_MODULE_3___default().createElement("div", { className: (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_4__.classes)(_style_lineForm__WEBPACK_IMPORTED_MODULE_6__.lineFormWrapper, 'lm-lineForm-wrapper', this.state.hasFocus ? _style_lineForm__WEBPACK_IMPORTED_MODULE_6__.lineFormWrapperFocusWithin : undefined) },
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement("input", { type: "text", className: _style_lineForm__WEBPACK_IMPORTED_MODULE_6__.lineFormInput, onChange: this._handleChange, onFocus: this._handleFocus, onBlur: this._handleBlur, value: this.state.value, ref: input => {
                            this._textInput = input;
                        } }),
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement("div", { className: _style_lineForm__WEBPACK_IMPORTED_MODULE_6__.lineFormButtonDiv },
                        react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.lineFormIcon.react, { className: _style_lineForm__WEBPACK_IMPORTED_MODULE_6__.lineFormButtonIcon, elementPosition: "center" }),
                        react__WEBPACK_IMPORTED_MODULE_3___default().createElement("input", { type: "submit", className: _style_lineForm__WEBPACK_IMPORTED_MODULE_6__.lineFormButton, value: "" }))),
                react__WEBPACK_IMPORTED_MODULE_3___default().createElement("label", { className: _style_lineForm__WEBPACK_IMPORTED_MODULE_6__.lineFormCaption }, this._trans.__('Go to line number between 1 and %1', this.props.maxLine)))));
    }
}
/**
 * A pure functional component for rendering a line/column
 * status item.
 */
function LineColComponent(props) {
    const translator = props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
    const trans = translator.load('jupyterlab');
    return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(___WEBPACK_IMPORTED_MODULE_5__.TextItem, { onClick: props.handleClick, source: trans.__('Ln %1, Col %2', props.line, props.column), title: trans.__('Go to line number…') }));
}
/**
 * A widget implementing a line/column status item.
 */
class LineCol extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomRenderer {
    /**
     * Construct a new LineCol status item.
     */
    constructor(translator) {
        super(new LineCol.Model());
        this._popup = null;
        this.addClass(___WEBPACK_IMPORTED_MODULE_5__.interactiveItem);
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
    }
    /**
     * Render the status item.
     */
    render() {
        if (this.model === null) {
            return null;
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(LineColComponent, { line: this.model.line, column: this.model.column, translator: this.translator, handleClick: () => this._handleClick() }));
        }
    }
    /**
     * A click handler for the widget.
     */
    _handleClick() {
        if (this._popup) {
            this._popup.dispose();
        }
        const body = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_3___default().createElement(LineFormComponent, { handleSubmit: val => this._handleSubmit(val), currentLine: this.model.line, maxLine: this.model.editor.lineCount, translator: this.translator }));
        this._popup = (0,___WEBPACK_IMPORTED_MODULE_5__.showPopup)({
            body: body,
            anchor: this,
            align: 'right'
        });
    }
    /**
     * Handle submission for the widget.
     */
    _handleSubmit(value) {
        this.model.editor.setCursorPosition({ line: value - 1, column: 0 });
        this._popup.dispose();
        this.model.editor.focus();
    }
}
/**
 * A namespace for LineCol statics.
 */
(function (LineCol) {
    /**
     * A VDom model for a status item tracking the line/column of an editor.
     */
    class Model extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomModel {
        constructor() {
            super(...arguments);
            /**
             * React to a change in the cursors of the current editor.
             */
            this._onSelectionChanged = () => {
                const oldState = this._getAllState();
                const pos = this.editor.getCursorPosition();
                this._line = pos.line + 1;
                this._column = pos.column + 1;
                this._triggerChange(oldState, this._getAllState());
            };
            this._line = 1;
            this._column = 1;
            this._editor = null;
        }
        /**
         * The current editor of the model.
         */
        get editor() {
            return this._editor;
        }
        set editor(editor) {
            const oldEditor = this._editor;
            if (oldEditor) {
                oldEditor.model.selections.changed.disconnect(this._onSelectionChanged);
            }
            const oldState = this._getAllState();
            this._editor = editor;
            if (!this._editor) {
                this._column = 1;
                this._line = 1;
            }
            else {
                this._editor.model.selections.changed.connect(this._onSelectionChanged);
                const pos = this._editor.getCursorPosition();
                this._column = pos.column + 1;
                this._line = pos.line + 1;
            }
            this._triggerChange(oldState, this._getAllState());
        }
        /**
         * The current line of the model.
         */
        get line() {
            return this._line;
        }
        /**
         * The current column of the model.
         */
        get column() {
            return this._column;
        }
        _getAllState() {
            return [this._line, this._column];
        }
        _triggerChange(oldState, newState) {
            if (oldState[0] !== newState[0] || oldState[1] !== newState[1]) {
                this.stateChanged.emit(void 0);
            }
        }
    }
    LineCol.Model = Model;
})(LineCol || (LineCol = {}));
//# sourceMappingURL=lineCol.js.map

/***/ }),

/***/ "../../packages/statusbar/lib/defaults/runningSessions.js":
/*!****************************************************************!*\
  !*** ../../packages/statusbar/lib/defaults/runningSessions.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RunningSessions": () => (/* binding */ RunningSessions)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! .. */ "../../packages/statusbar/lib/index.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.





/**
 * Half spacing between subitems in a status item.
 */
const HALF_SPACING = 4;
/**
 * A pure functional component for rendering kernel and terminal sessions.
 *
 * @param props: the props for the component.
 *
 * @returns a tsx component for the running sessions.
 */
function RunningSessionsComponent(props) {
    return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(___WEBPACK_IMPORTED_MODULE_4__.GroupItem, { spacing: HALF_SPACING, onClick: props.handleClick },
        react__WEBPACK_IMPORTED_MODULE_3___default().createElement(___WEBPACK_IMPORTED_MODULE_4__.GroupItem, { spacing: HALF_SPACING },
            react__WEBPACK_IMPORTED_MODULE_3___default().createElement(___WEBPACK_IMPORTED_MODULE_4__.TextItem, { source: props.terminals }),
            react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.terminalIcon.react, { left: '1px', top: '3px', stylesheet: 'statusBar' })),
        react__WEBPACK_IMPORTED_MODULE_3___default().createElement(___WEBPACK_IMPORTED_MODULE_4__.GroupItem, { spacing: HALF_SPACING },
            react__WEBPACK_IMPORTED_MODULE_3___default().createElement(___WEBPACK_IMPORTED_MODULE_4__.TextItem, { source: props.sessions }),
            react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.kernelIcon.react, { top: '2px', stylesheet: 'statusBar' }))));
}
/**
 * A VDomRenderer for a RunningSessions status item.
 */
class RunningSessions extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomRenderer {
    /**
     * Create a new RunningSessions widget.
     */
    constructor(opts) {
        super(new RunningSessions.Model());
        this._serviceManager = opts.serviceManager;
        this._handleClick = opts.onClick;
        this.translator = opts.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this._trans = this.translator.load('jupyterload');
        this._serviceManager.sessions.runningChanged.connect(this._onSessionsRunningChanged, this);
        this._serviceManager.terminals.runningChanged.connect(this._onTerminalsRunningChanged, this);
        this.addClass(___WEBPACK_IMPORTED_MODULE_4__.interactiveItem);
    }
    /**
     * Render the running sessions widget.
     */
    render() {
        if (!this.model) {
            return null;
        }
        // TODO-TRANS: Should probably be handled differently.
        // This is more localizable friendly: "Terminals: %1 | Kernels: %2"
        this.title.caption = this._trans.__('%1 Terminals, %2 Kernel sessions', this.model.terminals, this.model.sessions);
        return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(RunningSessionsComponent, { sessions: this.model.sessions, terminals: this.model.terminals, handleClick: this._handleClick }));
    }
    /**
     * Dispose of the status item.
     */
    dispose() {
        super.dispose();
        this._serviceManager.sessions.runningChanged.disconnect(this._onSessionsRunningChanged, this);
        this._serviceManager.terminals.runningChanged.disconnect(this._onTerminalsRunningChanged, this);
    }
    /**
     * Set the number of kernel sessions when the list changes.
     */
    _onSessionsRunningChanged(manager, sessions) {
        this.model.sessions = sessions.length;
    }
    /**
     * Set the number of terminal sessions when the list changes.
     */
    _onTerminalsRunningChanged(manager, terminals) {
        this.model.terminals = terminals.length;
    }
}
/**
 * A namespace for RunningSessions statics.
 */
(function (RunningSessions) {
    /**
     * A VDomModel for the RunningSessions status item.
     */
    class Model extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomModel {
        constructor() {
            super(...arguments);
            this._terminals = 0;
            this._sessions = 0;
        }
        /**
         * The number of active kernel sessions.
         */
        get sessions() {
            return this._sessions;
        }
        set sessions(sessions) {
            const oldSessions = this._sessions;
            this._sessions = sessions;
            if (oldSessions !== this._sessions) {
                this.stateChanged.emit(void 0);
            }
        }
        /**
         * The number of active terminal sessions.
         */
        get terminals() {
            return this._terminals;
        }
        set terminals(terminals) {
            const oldTerminals = this._terminals;
            this._terminals = terminals;
            if (oldTerminals !== this._terminals) {
                this.stateChanged.emit(void 0);
            }
        }
    }
    RunningSessions.Model = Model;
})(RunningSessions || (RunningSessions = {}));
//# sourceMappingURL=runningSessions.js.map

/***/ }),

/***/ "../../packages/statusbar/lib/index.js":
/*!*********************************************!*\
  !*** ../../packages/statusbar/lib/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroupItem": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.GroupItem),
/* harmony export */   "Popup": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.Popup),
/* harmony export */   "ProgressBar": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.ProgressBar),
/* harmony export */   "ProgressCircle": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.ProgressCircle),
/* harmony export */   "TextItem": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.TextItem),
/* harmony export */   "showPopup": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.showPopup),
/* harmony export */   "KernelStatus": () => (/* reexport safe */ _defaults__WEBPACK_IMPORTED_MODULE_1__.KernelStatus),
/* harmony export */   "LineCol": () => (/* reexport safe */ _defaults__WEBPACK_IMPORTED_MODULE_1__.LineCol),
/* harmony export */   "RunningSessions": () => (/* reexport safe */ _defaults__WEBPACK_IMPORTED_MODULE_1__.RunningSessions),
/* harmony export */   "StatusBar": () => (/* reexport safe */ _statusbar__WEBPACK_IMPORTED_MODULE_2__.StatusBar),
/* harmony export */   "clickedItem": () => (/* reexport safe */ _style_statusbar__WEBPACK_IMPORTED_MODULE_3__.clickedItem),
/* harmony export */   "interactiveItem": () => (/* reexport safe */ _style_statusbar__WEBPACK_IMPORTED_MODULE_3__.interactiveItem),
/* harmony export */   "item": () => (/* reexport safe */ _style_statusbar__WEBPACK_IMPORTED_MODULE_3__.item),
/* harmony export */   "leftSide": () => (/* reexport safe */ _style_statusbar__WEBPACK_IMPORTED_MODULE_3__.leftSide),
/* harmony export */   "rightSide": () => (/* reexport safe */ _style_statusbar__WEBPACK_IMPORTED_MODULE_3__.rightSide),
/* harmony export */   "side": () => (/* reexport safe */ _style_statusbar__WEBPACK_IMPORTED_MODULE_3__.side),
/* harmony export */   "statusBar": () => (/* reexport safe */ _style_statusbar__WEBPACK_IMPORTED_MODULE_3__.statusBar),
/* harmony export */   "IStatusBar": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_4__.IStatusBar)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "../../packages/statusbar/lib/components/index.js");
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaults */ "../../packages/statusbar/lib/defaults/index.js");
/* harmony import */ var _statusbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./statusbar */ "../../packages/statusbar/lib/statusbar.js");
/* harmony import */ var _style_statusbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style/statusbar */ "../../packages/statusbar/lib/style/statusbar.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tokens */ "../../packages/statusbar/lib/tokens.js");
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module statusbar
 */





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/statusbar/lib/statusbar.js":
/*!*************************************************!*\
  !*** ../../packages/statusbar/lib/statusbar.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatusBar": () => (/* binding */ StatusBar)
/* harmony export */ });
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_statusbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style/statusbar */ "../../packages/statusbar/lib/style/statusbar.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.




/**
 * Main status bar object which contains all items.
 */
class StatusBar extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget {
    constructor() {
        super();
        this._leftRankItems = [];
        this._rightRankItems = [];
        this._statusItems = {};
        this._disposables = new _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__.DisposableSet();
        this.addClass(_style_statusbar__WEBPACK_IMPORTED_MODULE_3__.statusBar);
        const rootLayout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.PanelLayout());
        const leftPanel = (this._leftSide = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Panel());
        const middlePanel = (this._middlePanel = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Panel());
        const rightPanel = (this._rightSide = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Panel());
        leftPanel.addClass(_style_statusbar__WEBPACK_IMPORTED_MODULE_3__.side);
        leftPanel.addClass(_style_statusbar__WEBPACK_IMPORTED_MODULE_3__.leftSide);
        middlePanel.addClass(_style_statusbar__WEBPACK_IMPORTED_MODULE_3__.side);
        rightPanel.addClass(_style_statusbar__WEBPACK_IMPORTED_MODULE_3__.side);
        rightPanel.addClass(_style_statusbar__WEBPACK_IMPORTED_MODULE_3__.rightSide);
        rootLayout.addWidget(leftPanel);
        rootLayout.addWidget(middlePanel);
        rootLayout.addWidget(rightPanel);
    }
    /**
     * Register a new status item.
     *
     * @param id - a unique id for the status item.
     *
     * @param statusItem - The item to add to the status bar.
     */
    registerStatusItem(id, statusItem) {
        if (id in this._statusItems) {
            throw new Error(`Status item ${id} already registered.`);
        }
        // Populate defaults for the optional properties of the status item.
        const fullStatusItem = Object.assign(Object.assign({}, Private.statusItemDefaults), statusItem);
        const { align, item, rank } = fullStatusItem;
        // Connect the activeStateChanged signal to refreshing the status item,
        // if the signal was provided.
        const onActiveStateChanged = () => {
            this._refreshItem(id);
        };
        if (fullStatusItem.activeStateChanged) {
            fullStatusItem.activeStateChanged.connect(onActiveStateChanged);
        }
        const rankItem = { id, rank };
        fullStatusItem.item.addClass(_style_statusbar__WEBPACK_IMPORTED_MODULE_3__.item);
        this._statusItems[id] = fullStatusItem;
        if (align === 'left') {
            const insertIndex = this._findInsertIndex(this._leftRankItems, rankItem);
            if (insertIndex === -1) {
                this._leftSide.addWidget(item);
                this._leftRankItems.push(rankItem);
            }
            else {
                _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.ArrayExt.insert(this._leftRankItems, insertIndex, rankItem);
                this._leftSide.insertWidget(insertIndex, item);
            }
        }
        else if (align === 'right') {
            const insertIndex = this._findInsertIndex(this._rightRankItems, rankItem);
            if (insertIndex === -1) {
                this._rightSide.addWidget(item);
                this._rightRankItems.push(rankItem);
            }
            else {
                _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.ArrayExt.insert(this._rightRankItems, insertIndex, rankItem);
                this._rightSide.insertWidget(insertIndex, item);
            }
        }
        else {
            this._middlePanel.addWidget(item);
        }
        this._refreshItem(id); // Initially refresh the status item.
        const disposable = new _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__.DisposableDelegate(() => {
            delete this._statusItems[id];
            if (fullStatusItem.activeStateChanged) {
                fullStatusItem.activeStateChanged.disconnect(onActiveStateChanged);
            }
            item.parent = null;
            item.dispose();
        });
        this._disposables.add(disposable);
        return disposable;
    }
    /**
     * Dispose of the status bar.
     */
    dispose() {
        this._leftRankItems.length = 0;
        this._rightRankItems.length = 0;
        this._disposables.dispose();
        super.dispose();
    }
    /**
     * Handle an 'update-request' message to the status bar.
     */
    onUpdateRequest(msg) {
        this._refreshAll();
        super.onUpdateRequest(msg);
    }
    _findInsertIndex(side, newItem) {
        return _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.ArrayExt.findFirstIndex(side, item => item.rank > newItem.rank);
    }
    _refreshItem(id) {
        const statusItem = this._statusItems[id];
        if (statusItem.isActive()) {
            statusItem.item.show();
            statusItem.item.update();
        }
        else {
            statusItem.item.hide();
        }
    }
    _refreshAll() {
        Object.keys(this._statusItems).forEach(id => {
            this._refreshItem(id);
        });
    }
}
/**
 * A namespace for private functionality.
 */
var Private;
(function (Private) {
    /**
     * Default options for a status item, less the item itself.
     */
    Private.statusItemDefaults = {
        align: 'left',
        rank: 0,
        isActive: () => true,
        activeStateChanged: undefined
    };
})(Private || (Private = {}));
//# sourceMappingURL=statusbar.js.map

/***/ }),

/***/ "../../packages/statusbar/lib/style/layout.js":
/*!****************************************************!*\
  !*** ../../packages/statusbar/lib/style/layout.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "centeredFlex": () => (/* binding */ centeredFlex),
/* harmony export */   "leftToRight": () => (/* binding */ leftToRight),
/* harmony export */   "rightToLeft": () => (/* binding */ rightToLeft),
/* harmony export */   "equiDistant": () => (/* binding */ equiDistant)
/* harmony export */ });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
const centeredFlex = {
    display: 'flex',
    alignItems: 'center'
};
const leftToRight = {
    flexDirection: 'row'
};
const rightToLeft = {
    flexDirection: 'row-reverse'
};
const equiDistant = {
    justifyContent: 'space-between'
};
//# sourceMappingURL=layout.js.map

/***/ }),

/***/ "../../packages/statusbar/lib/style/lineForm.js":
/*!******************************************************!*\
  !*** ../../packages/statusbar/lib/style/lineForm.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hoverItem": () => (/* binding */ hoverItem),
/* harmony export */   "lineFormSearch": () => (/* binding */ lineFormSearch),
/* harmony export */   "lineFormCaption": () => (/* binding */ lineFormCaption),
/* harmony export */   "baseLineForm": () => (/* binding */ baseLineForm),
/* harmony export */   "lineFormButtonDiv": () => (/* binding */ lineFormButtonDiv),
/* harmony export */   "lineFormButtonIcon": () => (/* binding */ lineFormButtonIcon),
/* harmony export */   "lineFormButton": () => (/* binding */ lineFormButton),
/* harmony export */   "lineFormWrapper": () => (/* binding */ lineFormWrapper),
/* harmony export */   "lineFormWrapperFocusWithin": () => (/* binding */ lineFormWrapperFocusWithin),
/* harmony export */   "lineFormInput": () => (/* binding */ lineFormInput)
/* harmony export */ });
/* harmony import */ var typestyle_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle/lib */ "../../node_modules/typestyle/lib/index.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const hoverItem = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
});
const lineFormSearch = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '4px 12px',
    backgroundColor: 'var(--jp-layout-color2)',
    boxShadow: 'var(--jp-toolbar-box-shadow)',
    zIndex: 2,
    fontSize: 'var(--jp-ui-font-size1)'
});
const lineFormCaption = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontSize: 'var(--jp-ui-font-size0)',
    lineHeight: 'var(--jp-ui-font-size1)',
    marginTop: '4px',
    color: 'var(--jp-ui-font-color0)'
});
const baseLineForm = {
    border: 'none',
    borderRadius: '0px',
    position: 'absolute',
    backgroundSize: '16px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    outline: 'none',
    top: '0px',
    right: '0px'
};
const lineFormButtonDiv = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_0__.style)(baseLineForm, {
    top: '4px',
    right: '8px',
    height: '24px',
    padding: '0px 12px',
    width: '12px'
});
const lineFormButtonIcon = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_0__.style)(baseLineForm, {
    backgroundColor: 'var(--jp-brand-color1)',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    padding: '4px 6px'
});
const lineFormButton = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_0__.style)(baseLineForm, {
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box'
});
const lineFormWrapper = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_0__.style)({
    overflow: 'hidden',
    padding: '0px 8px',
    border: '1px solid var(--jp-border-color0)',
    backgroundColor: 'var(--jp-input-active-background)',
    height: '22px'
});
const lineFormWrapperFocusWithin = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_0__.style)({
    border: 'var(--jp-border-width) solid var(--md-blue-500)',
    boxShadow: 'inset 0 0 4px var(--md-blue-300)'
});
const lineFormInput = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_0__.style)({
    background: 'transparent',
    width: '200px',
    height: '100%',
    border: 'none',
    outline: 'none',
    color: 'var(--jp-ui-font-color0)',
    lineHeight: '28px'
});
//# sourceMappingURL=lineForm.js.map

/***/ }),

/***/ "../../packages/statusbar/lib/style/statusbar.js":
/*!*******************************************************!*\
  !*** ../../packages/statusbar/lib/style/statusbar.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "statusBar": () => (/* binding */ statusBar),
/* harmony export */   "side": () => (/* binding */ side),
/* harmony export */   "leftSide": () => (/* binding */ leftSide),
/* harmony export */   "rightSide": () => (/* binding */ rightSide),
/* harmony export */   "item": () => (/* binding */ item),
/* harmony export */   "clickedItem": () => (/* binding */ clickedItem),
/* harmony export */   "interactiveItem": () => (/* binding */ interactiveItem)
/* harmony export */ });
/* harmony import */ var typestyle_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle/lib */ "../../node_modules/typestyle/lib/index.js");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout */ "../../packages/statusbar/lib/style/layout.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./text */ "../../packages/statusbar/lib/style/text.js");
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./variables */ "../../packages/statusbar/lib/style/variables.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.




const itemPadding = {
    paddingLeft: _variables__WEBPACK_IMPORTED_MODULE_3__.default.itemPadding,
    paddingRight: _variables__WEBPACK_IMPORTED_MODULE_3__.default.itemPadding
};
const interactiveHover = {
    $nest: {
        '&:hover': {
            backgroundColor: _variables__WEBPACK_IMPORTED_MODULE_3__.default.hoverColor
        }
    }
};
const clicked = {
    backgroundColor: _variables__WEBPACK_IMPORTED_MODULE_3__.default.clickColor,
    $nest: {
        ['.' + _text__WEBPACK_IMPORTED_MODULE_2__.textItem]: {
            color: _variables__WEBPACK_IMPORTED_MODULE_3__.default.textClickColor
        }
    }
};
const statusBar = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_0__.style)({
    background: _variables__WEBPACK_IMPORTED_MODULE_3__.default.backgroundColor,
    minHeight: _variables__WEBPACK_IMPORTED_MODULE_3__.default.height,
    justifyContent: 'space-between',
    paddingLeft: _variables__WEBPACK_IMPORTED_MODULE_3__.default.statusBarPadding,
    paddingRight: _variables__WEBPACK_IMPORTED_MODULE_3__.default.statusBarPadding
}, _layout__WEBPACK_IMPORTED_MODULE_1__.centeredFlex);
const side = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_0__.style)(_layout__WEBPACK_IMPORTED_MODULE_1__.centeredFlex);
const leftSide = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_0__.style)(_layout__WEBPACK_IMPORTED_MODULE_1__.leftToRight);
const rightSide = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_0__.style)(_layout__WEBPACK_IMPORTED_MODULE_1__.rightToLeft);
const item = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_0__.style)({
    maxHeight: _variables__WEBPACK_IMPORTED_MODULE_3__.default.height,
    marginLeft: _variables__WEBPACK_IMPORTED_MODULE_3__.default.itemMargin,
    marginRight: _variables__WEBPACK_IMPORTED_MODULE_3__.default.itemMargin,
    height: _variables__WEBPACK_IMPORTED_MODULE_3__.default.height,
    whiteSpace: _variables__WEBPACK_IMPORTED_MODULE_3__.default.whiteSpace,
    textOverflow: _variables__WEBPACK_IMPORTED_MODULE_3__.default.textOverflow,
    color: _variables__WEBPACK_IMPORTED_MODULE_3__.default.textColor
}, itemPadding);
const clickedItem = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_0__.style)(clicked);
const interactiveItem = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_0__.style)(interactiveHover);
//# sourceMappingURL=statusbar.js.map

/***/ }),

/***/ "../../packages/statusbar/lib/style/text.js":
/*!**************************************************!*\
  !*** ../../packages/statusbar/lib/style/text.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "baseText": () => (/* binding */ baseText),
/* harmony export */   "textItem": () => (/* binding */ textItem)
/* harmony export */ });
/* harmony import */ var typestyle_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle/lib */ "../../node_modules/typestyle/lib/index.js");
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./variables */ "../../packages/statusbar/lib/style/variables.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


const baseText = {
    fontSize: _variables__WEBPACK_IMPORTED_MODULE_1__.default.fontSize,
    fontFamily: _variables__WEBPACK_IMPORTED_MODULE_1__.default.fontFamily
};
const textItem = (0,typestyle_lib__WEBPACK_IMPORTED_MODULE_0__.style)(baseText, {
    lineHeight: '24px',
    color: _variables__WEBPACK_IMPORTED_MODULE_1__.default.textColor
});
//# sourceMappingURL=text.js.map

/***/ }),

/***/ "../../packages/statusbar/lib/style/variables.js":
/*!*******************************************************!*\
  !*** ../../packages/statusbar/lib/style/variables.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    hoverColor: 'var(--jp-layout-color3)',
    clickColor: 'var(--jp-brand-color1)',
    backgroundColor: 'var(--jp-layout-color2)',
    height: 'var(--jp-statusbar-height)',
    fontSize: 'var(--jp-ui-font-size1)',
    fontFamily: 'var(--jp-ui-font-family)',
    textColor: 'var(--jp-ui-font-color1)',
    textClickColor: 'white',
    itemMargin: '2px',
    itemPadding: '6px',
    statusBarPadding: '10px',
    interItemHalfSpacing: '2px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
});
//# sourceMappingURL=variables.js.map

/***/ }),

/***/ "../../packages/statusbar/lib/tokens.js":
/*!**********************************************!*\
  !*** ../../packages/statusbar/lib/tokens.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IStatusBar": () => (/* binding */ IStatusBar)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

// tslint:disable-next-line:variable-name
const IStatusBar = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/statusbar:IStatusBar');
//# sourceMappingURL=tokens.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc3RhdHVzYmFyL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zdGF0dXNiYXIvbGliL2NvbXBvbmVudHMvaG92ZXIuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3N0YXR1c2Jhci9saWIvY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc3RhdHVzYmFyL2xpYi9jb21wb25lbnRzL3Byb2dyZXNzQmFyLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zdGF0dXNiYXIvbGliL2NvbXBvbmVudHMvcHJvZ3Jlc3NDaXJjbGUuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3N0YXR1c2Jhci9saWIvY29tcG9uZW50cy90ZXh0LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zdGF0dXNiYXIvbGliL2RlZmF1bHRzL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zdGF0dXNiYXIvbGliL2RlZmF1bHRzL2tlcm5lbFN0YXR1cy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc3RhdHVzYmFyL2xpYi9kZWZhdWx0cy9saW5lQ29sLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zdGF0dXNiYXIvbGliL2RlZmF1bHRzL3J1bm5pbmdTZXNzaW9ucy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc3RhdHVzYmFyL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc3RhdHVzYmFyL2xpYi9zdGF0dXNiYXIuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3N0YXR1c2Jhci9saWIvc3R5bGUvbGF5b3V0LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zdGF0dXNiYXIvbGliL3N0eWxlL2xpbmVGb3JtLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zdGF0dXNiYXIvbGliL3N0eWxlL3N0YXR1c2Jhci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc3RhdHVzYmFyL2xpYi9zdHlsZS90ZXh0LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zdGF0dXNiYXIvbGliL3N0eWxlL3ZhcmlhYmxlcy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc3RhdHVzYmFyL2xpYi90b2tlbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0EsY0FBYyxTQUFJLElBQUksU0FBSTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCxjQUFjO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDK0I7QUFDZ0I7QUFDYTtBQUM1RCx3QkFBd0Isb0RBQUssQ0FBQyx1REFBWSxFQUFF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QixvREFBSyxDQUFDLGdEQUFXO0FBQ2xDLGtCQUFrQixvREFBSyxDQUFDLGdEQUFXO0FBQ25DLGFBQWEsb0RBQUs7QUFDekIsZUFBZSxzREFBVztBQUMxQixnQkFBZ0IsMERBQWU7QUFDL0IsaUJBQWlCLDBEQUFlO0FBQ2hDLFlBQVksc0RBQVc7QUFDdkIsZ0JBQWdCLDBEQUFlO0FBQy9CLGtCQUFrQiw0REFBaUI7QUFDbkMsV0FBVyx5REFBYztBQUN6QixDQUFDO0FBQ00sb0JBQW9CLG9EQUFLO0FBQ3pCLHdCQUF3QixvREFBSztBQUNwQyxxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUNBO0FBQ0E7QUFDc0M7QUFDUDtBQUN4QjtBQUNQLGNBQWMsd0RBQWE7QUFDM0IsZ0JBQWdCLDBEQUFlO0FBQy9CO0FBQ08saUJBQWlCLG9EQUFLO0FBQzdCO0FBQ0EsV0FBVyx5REFBYztBQUN6QixDQUFDO0FBQ0QsZ0M7Ozs7Ozs7Ozs7Ozs7OztBQ1pBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQztBQUNGLHFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQzBDO0FBQzFDO0FBQ08sdUJBQXVCLG9EQUFLO0FBQ25DLGtDIiwiZmlsZSI6InBhY2thZ2VzX3N0YXR1c2Jhcl9saWJfaW5kZXhfanMuNzE1ZjJlZmVmODE3OTdjYjBkZjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjbGFzc2VzLCBzdHlsZSB9IGZyb20gJ3R5cGVzdHlsZS9saWInO1xuaW1wb3J0IHsgY2VudGVyZWRGbGV4LCBsZWZ0VG9SaWdodCB9IGZyb20gJy4uL3N0eWxlL2xheW91dCc7XG5jb25zdCBncm91cEl0ZW1MYXlvdXQgPSBzdHlsZShjZW50ZXJlZEZsZXgsIGxlZnRUb1JpZ2h0KTtcbi8qKlxuICogQSB0c3ggY29tcG9uZW50IGZvciBhIHNldCBvZiBpdGVtcyBsb2dpY2FsbHkgZ3JvdXBlZCB0b2dldGhlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEdyb3VwSXRlbShwcm9wcykge1xuICAgIGNvbnN0IHsgc3BhY2luZywgY2hpbGRyZW4sIGNsYXNzTmFtZSB9ID0gcHJvcHMsIHJlc3QgPSBfX3Jlc3QocHJvcHMsIFtcInNwYWNpbmdcIiwgXCJjaGlsZHJlblwiLCBcImNsYXNzTmFtZVwiXSk7XG4gICAgY29uc3QgbnVtQ2hpbGRyZW4gPSBSZWFjdC5DaGlsZHJlbi5jb3VudChjaGlsZHJlbik7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIE9iamVjdC5hc3NpZ24oeyBjbGFzc05hbWU6IGNsYXNzZXMoZ3JvdXBJdGVtTGF5b3V0LCBjbGFzc05hbWUpIH0sIHJlc3QpLCBSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIChjaGlsZCwgaSkgPT4ge1xuICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBtYXJnaW5SaWdodDogYCR7c3BhY2luZ31weGAgfSB9LCBjaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaSA9PT0gbnVtQ2hpbGRyZW4gLSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IG1hcmdpbkxlZnQ6IGAke3NwYWNpbmd9cHhgIH0gfSwgY2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBtYXJnaW46IGAwcHggJHtzcGFjaW5nfXB4YCB9IH0sIGNoaWxkKTtcbiAgICAgICAgfVxuICAgIH0pKSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ncm91cC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBIb3ZlckJveCB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IFBhbmVsTGF5b3V0LCBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuaW1wb3J0IHsgc3R5bGUgfSBmcm9tICd0eXBlc3R5bGUvbGliJztcbmltcG9ydCB7IGNsaWNrZWRJdGVtLCBpbnRlcmFjdGl2ZUl0ZW0gfSBmcm9tICcuLi9zdHlsZS9zdGF0dXNiYXInO1xuY29uc3QgaG92ZXJJdGVtID0gc3R5bGUoe1xuICAgIGJveFNoYWRvdzogJzBweCA0cHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yNSknXG59KTtcbi8qKlxuICogQ3JlYXRlIGFuZCBzaG93IGEgcG9wdXAgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9ucyBmb3IgdGhlIHBvcHVwXG4gKlxuICogQHJldHVybnMgdGhlIHBvcHVwIHRoYXQgd2FzIGNyZWF0ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93UG9wdXAob3B0aW9ucykge1xuICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBQb3B1cChvcHRpb25zKTtcbiAgICBkaWFsb2cubGF1bmNoKCk7XG4gICAgcmV0dXJuIGRpYWxvZztcbn1cbi8qKlxuICogQSBjbGFzcyBmb3IgYSBQb3B1cCB3aWRnZXQuXG4gKi9cbmV4cG9ydCBjbGFzcyBQb3B1cCBleHRlbmRzIFdpZGdldCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IFBvcHVwLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fYm9keSA9IG9wdGlvbnMuYm9keTtcbiAgICAgICAgdGhpcy5fYm9keS5hZGRDbGFzcyhob3Zlckl0ZW0pO1xuICAgICAgICB0aGlzLl9hbmNob3IgPSBvcHRpb25zLmFuY2hvcjtcbiAgICAgICAgdGhpcy5fYWxpZ24gPSBvcHRpb25zLmFsaWduO1xuICAgICAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5sYXlvdXQgPSBuZXcgUGFuZWxMYXlvdXQoKSk7XG4gICAgICAgIGxheW91dC5hZGRXaWRnZXQob3B0aW9ucy5ib2R5KTtcbiAgICAgICAgdGhpcy5fYm9keS5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdHRhY2ggdGhlIHBvcHVwIHdpZGdldCB0byB0aGUgcGFnZS5cbiAgICAgKi9cbiAgICBsYXVuY2goKSB7XG4gICAgICAgIHRoaXMuX3NldEdlb21ldHJ5KCk7XG4gICAgICAgIFdpZGdldC5hdHRhY2godGhpcywgZG9jdW1lbnQuYm9keSk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIHRoaXMuX2FuY2hvci5hZGRDbGFzcyhjbGlja2VkSXRlbSk7XG4gICAgICAgIHRoaXMuX2FuY2hvci5yZW1vdmVDbGFzcyhpbnRlcmFjdGl2ZUl0ZW0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYCd1cGRhdGUnYCBtZXNzYWdlcyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBvblVwZGF0ZVJlcXVlc3QobXNnKSB7XG4gICAgICAgIHRoaXMuX3NldEdlb21ldHJ5KCk7XG4gICAgICAgIHN1cGVyLm9uVXBkYXRlUmVxdWVzdChtc2cpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYCdhZnRlci1hdHRhY2gnYCBtZXNzYWdlcyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBvbkFmdGVyQXR0YWNoKG1zZykge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLCBmYWxzZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLCBmYWxzZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgJ2FmdGVyLWRldGFjaCdgIG1lc3NhZ2VzIGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIG9uQWZ0ZXJEZXRhY2gobXNnKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcywgZmFsc2UpO1xuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMsIGZhbHNlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMsIGZhbHNlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGAncmVzaXplJ2AgbWVzc2FnZXMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgb25SZXNpemUoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX2FuY2hvci5yZW1vdmVDbGFzcyhjbGlja2VkSXRlbSk7XG4gICAgICAgIHRoaXMuX2FuY2hvci5hZGRDbGFzcyhpbnRlcmFjdGl2ZUl0ZW0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgRE9NIGV2ZW50cyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBoYW5kbGVFdmVudChldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2tleWRvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dEtleWRvd24oZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY2xpY2snOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dENsaWNrKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3Jlc2l6ZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZXZ0Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKCEhZXZlbnQudGFyZ2V0ICYmXG4gICAgICAgICAgICAhKHRoaXMuX2JvZHkubm9kZS5jb250YWlucyhldmVudC50YXJnZXQpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5jaG9yLm5vZGUuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9ldnRLZXlkb3duKGV2ZW50KSB7XG4gICAgICAgIC8vIENoZWNrIGZvciBlc2NhcGUga2V5XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSAyNzogLy8gRXNjYXBlLlxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9zZXRHZW9tZXRyeSgpIHtcbiAgICAgICAgbGV0IGFsaWduZWQgPSAwO1xuICAgICAgICBjb25zdCBhbmNob3JSZWN0ID0gdGhpcy5fYW5jaG9yLm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IGJvZHlSZWN0ID0gdGhpcy5fYm9keS5ub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAodGhpcy5fYWxpZ24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIGFsaWduZWQgPSAtKGJvZHlSZWN0LndpZHRoIC0gYW5jaG9yUmVjdC53aWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9ib2R5Lm5vZGUpO1xuICAgICAgICBIb3ZlckJveC5zZXRHZW9tZXRyeSh7XG4gICAgICAgICAgICBhbmNob3I6IGFuY2hvclJlY3QsXG4gICAgICAgICAgICBob3N0OiBkb2N1bWVudC5ib2R5LFxuICAgICAgICAgICAgbWF4SGVpZ2h0OiA1MDAsXG4gICAgICAgICAgICBtaW5IZWlnaHQ6IDIwLFxuICAgICAgICAgICAgbm9kZTogdGhpcy5fYm9keS5ub2RlLFxuICAgICAgICAgICAgb2Zmc2V0OiB7XG4gICAgICAgICAgICAgICAgaG9yaXpvbnRhbDogYWxpZ25lZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByaXZpbGVnZTogJ2ZvcmNlQWJvdmUnLFxuICAgICAgICAgICAgc3R5bGVcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aG92ZXIuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuZXhwb3J0ICogZnJvbSAnLi9ncm91cCc7XG5leHBvcnQgKiBmcm9tICcuL2hvdmVyJztcbmV4cG9ydCAqIGZyb20gJy4vcHJvZ3Jlc3NCYXInO1xuZXhwb3J0ICogZnJvbSAnLi90ZXh0JztcbmV4cG9ydCAqIGZyb20gJy4vcHJvZ3Jlc3NDaXJjbGUnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBBIGZ1bmN0aW9uYWwgdHN4IGNvbXBvbmVudCBmb3IgYSBwcm9ncmVzcyBiYXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBQcm9ncmVzc0Jhcihwcm9wcykge1xuICAgIGNvbnN0IHsgd2lkdGgsIHBlcmNlbnRhZ2UgfSA9IHByb3BzLCByZXN0ID0gX19yZXN0KHByb3BzLCBbXCJ3aWR0aFwiLCBcInBlcmNlbnRhZ2VcIl0pO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2pwLVN0YXR1c2Jhci1Qcm9ncmVzc0Jhci1wcm9ncmVzcy1iYXInLCByb2xlOiBcInByb2dyZXNzYmFyXCIsIFwiYXJpYS12YWx1ZW1pblwiOiAwLCBcImFyaWEtdmFsdWVtYXhcIjogMTAwLCBcImFyaWEtdmFsdWVub3dcIjogcGVyY2VudGFnZSB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZpbGxlciwgT2JqZWN0LmFzc2lnbih7fSwgT2JqZWN0LmFzc2lnbih7IHBlcmNlbnRhZ2UgfSwgcmVzdCksIHsgY29udGVudFdpZHRoOiB3aWR0aCB9KSkpKTtcbn1cbi8qKlxuICogQSBmdW5jdGlvbmFsIHRzeCBjb21wb25lbnQgZm9yIGEgcGFydGlhbGx5IGZpbGxlZCBkaXYuXG4gKi9cbmZ1bmN0aW9uIEZpbGxlcihwcm9wcykge1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICB3aWR0aDogYCR7cHJvcHMucGVyY2VudGFnZX0lYFxuICAgICAgICB9IH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIHByb3BzLmNvbnRlbnQpKSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm9ncmVzc0Jhci5qcy5tYXAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuZXhwb3J0IGZ1bmN0aW9uIFByb2dyZXNzQ2lyY2xlKHByb3BzKSB7XG4gICAgY29uc3QgcmFkaXVzID0gMTA0O1xuICAgIGNvbnN0IGQgPSAocHJvZ3Jlc3MpID0+IHtcbiAgICAgICAgY29uc3QgYW5nbGUgPSBNYXRoLm1heChwcm9ncmVzcyAqIDMuNiwgMC4xKTtcbiAgICAgICAgY29uc3QgcmFkID0gKGFuZ2xlICogTWF0aC5QSSkgLyAxODAsIHggPSBNYXRoLnNpbihyYWQpICogcmFkaXVzLCB5ID0gTWF0aC5jb3MocmFkKSAqIC1yYWRpdXMsIG1pZCA9IGFuZ2xlIDwgMTgwID8gMSA6IDAsIHNoYXBlID0gYE0gMCAwIHYgLSR7cmFkaXVzfSBBICR7cmFkaXVzfSAke3JhZGl1c30gMSBgICtcbiAgICAgICAgICAgIG1pZCArXG4gICAgICAgICAgICAnIDAgJyArXG4gICAgICAgICAgICB4LnRvRml4ZWQoNCkgK1xuICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgIHkudG9GaXhlZCg0KSArXG4gICAgICAgICAgICAnIHonO1xuICAgICAgICByZXR1cm4gc2hhcGU7XG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdqcC1TdGF0dXNiYXItUHJvZ3Jlc3NDaXJjbGUnLCByb2xlOiBcInByb2dyZXNzYmFyXCIsIFwiYXJpYS12YWx1ZW1pblwiOiAwLCBcImFyaWEtdmFsdWVtYXhcIjogMTAwLCBcImFyaWEtdmFsdWVub3dcIjogcHJvcHMucHJvZ3Jlc3MgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IHZpZXdCb3g6IFwiMCAwIDI1MCAyNTBcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNpcmNsZVwiLCB7IGN4OiBcIjEyNVwiLCBjeTogXCIxMjVcIiwgcjogYCR7cmFkaXVzfWAsIHN0cm9rZTogXCJ2YXIoLS1qcC1pbnZlcnNlLWxheW91dC1jb2xvcjMpXCIsIHN0cm9rZVdpZHRoOiBcIjIwXCIsIGZpbGw6IFwibm9uZVwiIH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwgeyB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKDEyNSwxMjUpIHNjYWxlKC45KVwiLCBkOiBkKHByb3BzLnByb2dyZXNzKSwgZmlsbDogJ3ZhcigtLWpwLWludmVyc2UtbGF5b3V0LWNvbG9yMyknIH0pKSkpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvZ3Jlc3NDaXJjbGUuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY2xhc3NlcyB9IGZyb20gJ3R5cGVzdHlsZS9saWInO1xuaW1wb3J0IHsgdGV4dEl0ZW0gfSBmcm9tICcuLi9zdHlsZS90ZXh0Jztcbi8qKlxuICogQSBmdW5jdGlvbmFsIHRzeCBjb21wb25lbnQgZm9yIGEgdGV4dCBpdGVtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gVGV4dEl0ZW0ocHJvcHMpIHtcbiAgICBjb25zdCB7IHRpdGxlLCBzb3VyY2UsIGNsYXNzTmFtZSB9ID0gcHJvcHMsIHJlc3QgPSBfX3Jlc3QocHJvcHMsIFtcInRpdGxlXCIsIFwic291cmNlXCIsIFwiY2xhc3NOYW1lXCJdKTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIE9iamVjdC5hc3NpZ24oeyBjbGFzc05hbWU6IGNsYXNzZXModGV4dEl0ZW0sIGNsYXNzTmFtZSksIHRpdGxlOiB0aXRsZSB9LCByZXN0KSwgc291cmNlKSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10ZXh0LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmV4cG9ydCAqIGZyb20gJy4va2VybmVsU3RhdHVzJztcbmV4cG9ydCAqIGZyb20gJy4vbGluZUNvbCc7XG5leHBvcnQgKiBmcm9tICcuL3J1bm5pbmdTZXNzaW9ucyc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyB0cmFuc2xhdGVLZXJuZWxTdGF0dXNlcywgVkRvbU1vZGVsLCBWRG9tUmVuZGVyZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IEpTT05FeHQgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgaW50ZXJhY3RpdmVJdGVtLCBUZXh0SXRlbSB9IGZyb20gJy4uJztcbi8qKlxuICogQSBwdXJlIGZ1bmN0aW9uYWwgY29tcG9uZW50IGZvciByZW5kZXJpbmcga2VybmVsIHN0YXR1cy5cbiAqL1xuZnVuY3Rpb24gS2VybmVsU3RhdHVzQ29tcG9uZW50KHByb3BzKSB7XG4gICAgY29uc3QgdHJhbnNsYXRvciA9IHByb3BzLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICBsZXQgc3RhdHVzVGV4dCA9ICcnO1xuICAgIGlmIChwcm9wcy5zdGF0dXMpIHtcbiAgICAgICAgc3RhdHVzVGV4dCA9IGAgfCAke3Byb3BzLnN0YXR1c31gO1xuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEl0ZW0sIHsgb25DbGljazogcHJvcHMuaGFuZGxlQ2xpY2ssIHNvdXJjZTogYCR7cHJvcHMua2VybmVsTmFtZX0ke3N0YXR1c1RleHR9YCwgdGl0bGU6IHRyYW5zLl9fKCdDaGFuZ2Uga2VybmVsIGZvciAlMScsIHByb3BzLmFjdGl2aXR5TmFtZSkgfSkpO1xufVxuLyoqXG4gKiBBIFZEb21SZW5kZXJlciB3aWRnZXQgZm9yIGRpc3BsYXlpbmcgdGhlIHN0YXR1cyBvZiBhIGtlcm5lbC5cbiAqL1xuZXhwb3J0IGNsYXNzIEtlcm5lbFN0YXR1cyBleHRlbmRzIFZEb21SZW5kZXJlciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IHRoZSBrZXJuZWwgc3RhdHVzIHdpZGdldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzLCB0cmFuc2xhdG9yKSB7XG4gICAgICAgIHN1cGVyKG5ldyBLZXJuZWxTdGF0dXMuTW9kZWwodHJhbnNsYXRvcikpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICB0aGlzLl9oYW5kbGVDbGljayA9IG9wdHMub25DbGljaztcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhpbnRlcmFjdGl2ZUl0ZW0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgdGhlIGtlcm5lbCBzdGF0dXMgaXRlbS5cbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChLZXJuZWxTdGF0dXNDb21wb25lbnQsIHsgc3RhdHVzOiB0aGlzLm1vZGVsLnN0YXR1cywga2VybmVsTmFtZTogdGhpcy5tb2RlbC5rZXJuZWxOYW1lLCBhY3Rpdml0eU5hbWU6IHRoaXMubW9kZWwuYWN0aXZpdHlOYW1lLCBoYW5kbGVDbGljazogdGhpcy5faGFuZGxlQ2xpY2ssIHRyYW5zbGF0b3I6IHRoaXMudHJhbnNsYXRvciB9KSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBLZXJuZWxTdGF0dXMgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChLZXJuZWxTdGF0dXMpIHtcbiAgICAvKipcbiAgICAgKiBBIFZEb21Nb2RlbCBmb3IgdGhlIGtlcm5lbCBzdGF0dXMgaW5kaWNhdG9yLlxuICAgICAqL1xuICAgIGNsYXNzIE1vZGVsIGV4dGVuZHMgVkRvbU1vZGVsIHtcbiAgICAgICAgY29uc3RydWN0b3IodHJhbnNsYXRvcikge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVhY3QgdG8gY2hhbmdlcyB0byB0aGUga2VybmVsIHN0YXR1cy5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5fb25LZXJuZWxTdGF0dXNDaGFuZ2VkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICB0aGlzLl9rZXJuZWxTdGF0dXMgPSAoX2EgPSB0aGlzLl9zZXNzaW9uQ29udGV4dCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmtlcm5lbERpc3BsYXlTdGF0dXM7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVhY3QgdG8gY2hhbmdlcyBpbiB0aGUga2VybmVsLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLl9vbktlcm5lbENoYW5nZWQgPSAoX3Nlc3Npb25Db250ZXh0LCBjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkU3RhdGUgPSB0aGlzLl9nZXRBbGxTdGF0ZSgpO1xuICAgICAgICAgICAgICAgIC8vIHN5bmMgc2V0dGluZyBvZiBzdGF0dXMgYW5kIGRpc3BsYXkgbmFtZVxuICAgICAgICAgICAgICAgIHRoaXMuX2tlcm5lbFN0YXR1cyA9IChfYSA9IHRoaXMuX3Nlc3Npb25Db250ZXh0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eua2VybmVsRGlzcGxheVN0YXR1cztcbiAgICAgICAgICAgICAgICB0aGlzLl9rZXJuZWxOYW1lID0gX3Nlc3Npb25Db250ZXh0Lmtlcm5lbERpc3BsYXlOYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDaGFuZ2Uob2xkU3RhdGUsIHRoaXMuX2dldEFsbFN0YXRlKCkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2aXR5TmFtZSA9ICdhY3Rpdml0eSc7IC8vIEZJWE1FLVRSQU5TOj9cbiAgICAgICAgICAgIHRoaXMuX2tlcm5lbFN0YXR1cyA9ICcnO1xuICAgICAgICAgICAgdGhpcy5fc2Vzc2lvbkNvbnRleHQgPSBudWxsO1xuICAgICAgICAgICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgICAgICB0aGlzLl90cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICAgICAgdGhpcy5fa2VybmVsTmFtZSA9IHRoaXMuX3RyYW5zLl9fKCdObyBLZXJuZWwhJyk7XG4gICAgICAgICAgICB0aGlzLl9zdGF0dXNOYW1lcyA9IHRyYW5zbGF0ZUtlcm5lbFN0YXR1c2VzKHRyYW5zbGF0b3IpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbmFtZSBvZiB0aGUga2VybmVsLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IGtlcm5lbE5hbWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fa2VybmVsTmFtZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGN1cnJlbnQgc3RhdHVzIG9mIHRoZSBrZXJuZWwuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgc3RhdHVzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2tlcm5lbFN0YXR1c1xuICAgICAgICAgICAgICAgID8gdGhpcy5fc3RhdHVzTmFtZXNbdGhpcy5fa2VybmVsU3RhdHVzXVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGRpc3BsYXkgbmFtZSBmb3IgdGhlIGFjdGl2aXR5LlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IGFjdGl2aXR5TmFtZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hY3Rpdml0eU5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGFjdGl2aXR5TmFtZSh2YWwpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFZhbCA9IHRoaXMuX2FjdGl2aXR5TmFtZTtcbiAgICAgICAgICAgIGlmIChvbGRWYWwgPT09IHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2FjdGl2aXR5TmFtZSA9IHZhbDtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGN1cnJlbnQgY2xpZW50IHNlc3Npb24gYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXJuZWwgc3RhdHVzIGluZGljYXRvci5cbiAgICAgICAgICovXG4gICAgICAgIGdldCBzZXNzaW9uQ29udGV4dCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXNzaW9uQ29udGV4dDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgc2Vzc2lvbkNvbnRleHQoc2Vzc2lvbkNvbnRleHQpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgKF9hID0gdGhpcy5fc2Vzc2lvbkNvbnRleHQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zdGF0dXNDaGFuZ2VkLmRpc2Nvbm5lY3QodGhpcy5fb25LZXJuZWxTdGF0dXNDaGFuZ2VkKTtcbiAgICAgICAgICAgIChfYiA9IHRoaXMuX3Nlc3Npb25Db250ZXh0KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iua2VybmVsQ2hhbmdlZC5kaXNjb25uZWN0KHRoaXMuX29uS2VybmVsQ2hhbmdlZCk7XG4gICAgICAgICAgICBjb25zdCBvbGRTdGF0ZSA9IHRoaXMuX2dldEFsbFN0YXRlKCk7XG4gICAgICAgICAgICB0aGlzLl9zZXNzaW9uQ29udGV4dCA9IHNlc3Npb25Db250ZXh0O1xuICAgICAgICAgICAgdGhpcy5fa2VybmVsU3RhdHVzID0gc2Vzc2lvbkNvbnRleHQgPT09IG51bGwgfHwgc2Vzc2lvbkNvbnRleHQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlc3Npb25Db250ZXh0Lmtlcm5lbERpc3BsYXlTdGF0dXM7XG4gICAgICAgICAgICB0aGlzLl9rZXJuZWxOYW1lID0gKF9jID0gc2Vzc2lvbkNvbnRleHQgPT09IG51bGwgfHwgc2Vzc2lvbkNvbnRleHQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlc3Npb25Db250ZXh0Lmtlcm5lbERpc3BsYXlOYW1lKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiB0aGlzLl90cmFucy5fXygnTm8gS2VybmVsJyk7XG4gICAgICAgICAgICBzZXNzaW9uQ29udGV4dCA9PT0gbnVsbCB8fCBzZXNzaW9uQ29udGV4dCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2Vzc2lvbkNvbnRleHQuc3RhdHVzQ2hhbmdlZC5jb25uZWN0KHRoaXMuX29uS2VybmVsU3RhdHVzQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgICAgICBzZXNzaW9uQ29udGV4dCA9PT0gbnVsbCB8fCBzZXNzaW9uQ29udGV4dCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2Vzc2lvbkNvbnRleHQuY29ubmVjdGlvblN0YXR1c0NoYW5nZWQuY29ubmVjdCh0aGlzLl9vbktlcm5lbFN0YXR1c0NoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgc2Vzc2lvbkNvbnRleHQgPT09IG51bGwgfHwgc2Vzc2lvbkNvbnRleHQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlc3Npb25Db250ZXh0Lmtlcm5lbENoYW5nZWQuY29ubmVjdCh0aGlzLl9vbktlcm5lbENoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNoYW5nZShvbGRTdGF0ZSwgdGhpcy5fZ2V0QWxsU3RhdGUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgX2dldEFsbFN0YXRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIFt0aGlzLl9rZXJuZWxOYW1lLCB0aGlzLl9rZXJuZWxTdGF0dXMsIHRoaXMuX2FjdGl2aXR5TmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgX3RyaWdnZXJDaGFuZ2Uob2xkU3RhdGUsIG5ld1N0YXRlKSB7XG4gICAgICAgICAgICBpZiAoSlNPTkV4dC5kZWVwRXF1YWwob2xkU3RhdGUsIG5ld1N0YXRlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBLZXJuZWxTdGF0dXMuTW9kZWwgPSBNb2RlbDtcbn0pKEtlcm5lbFN0YXR1cyB8fCAoS2VybmVsU3RhdHVzID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWtlcm5lbFN0YXR1cy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBSZWFjdFdpZGdldCwgVkRvbU1vZGVsLCBWRG9tUmVuZGVyZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGxpbmVGb3JtSWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNsYXNzZXMgfSBmcm9tICd0eXBlc3R5bGUvbGliJztcbmltcG9ydCB7IGludGVyYWN0aXZlSXRlbSwgc2hvd1BvcHVwLCBUZXh0SXRlbSB9IGZyb20gJy4uJztcbmltcG9ydCB7IGxpbmVGb3JtQnV0dG9uLCBsaW5lRm9ybUJ1dHRvbkRpdiwgbGluZUZvcm1CdXR0b25JY29uLCBsaW5lRm9ybUNhcHRpb24sIGxpbmVGb3JtSW5wdXQsIGxpbmVGb3JtU2VhcmNoLCBsaW5lRm9ybVdyYXBwZXIsIGxpbmVGb3JtV3JhcHBlckZvY3VzV2l0aGluIH0gZnJvbSAnLi4vc3R5bGUvbGluZUZvcm0nO1xuLyoqXG4gKiBBIGNvbXBvbmVudCBmb3IgcmVuZGVyaW5nIGEgXCJnby10by1saW5lXCIgZm9ybS5cbiAqL1xuY2xhc3MgTGluZUZvcm1Db21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBMaW5lRm9ybUNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIHZhbHVlIGluIHRoZSBpbnB1dCBmaWVsZC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2hhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlIH0pO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIHN1Ym1pc3Npb24gb2YgdGhlIGlucHV0IGZpZWxkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5faGFuZGxlU3VibWl0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBwYXJzZUludCh0aGlzLl90ZXh0SW5wdXQudmFsdWUsIDEwKTtcbiAgICAgICAgICAgIGlmICghaXNOYU4odmFsdWUpICYmXG4gICAgICAgICAgICAgICAgaXNGaW5pdGUodmFsdWUpICYmXG4gICAgICAgICAgICAgICAgMSA8PSB2YWx1ZSAmJlxuICAgICAgICAgICAgICAgIHZhbHVlIDw9IHRoaXMucHJvcHMubWF4TGluZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlU3VibWl0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZSBmb2N1c2luZyBvZiB0aGUgaW5wdXQgZmllbGQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9oYW5kbGVGb2N1cyA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBoYXNGb2N1czogdHJ1ZSB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZSBibHVycmluZyBvZiB0aGUgaW5wdXQgZmllbGQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9oYW5kbGVCbHVyID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGhhc0ZvY3VzOiBmYWxzZSB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fdGV4dElucHV0ID0gbnVsbDtcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gcHJvcHMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgdGhpcy5fdHJhbnMgPSB0aGlzLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgaGFzRm9jdXM6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZvY3VzIHRoZSBlbGVtZW50IG9uIG1vdW50LlxuICAgICAqL1xuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLl90ZXh0SW5wdXQuZm9jdXMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIHRoZSBMaW5lRm9ybUNvbXBvbmVudC5cbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogbGluZUZvcm1TZWFyY2ggfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIsIHsgbmFtZTogXCJsaW5lQ29sdW1uRm9ybVwiLCBvblN1Ym1pdDogdGhpcy5faGFuZGxlU3VibWl0LCBub1ZhbGlkYXRlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogY2xhc3NlcyhsaW5lRm9ybVdyYXBwZXIsICdsbS1saW5lRm9ybS13cmFwcGVyJywgdGhpcy5zdGF0ZS5oYXNGb2N1cyA/IGxpbmVGb3JtV3JhcHBlckZvY3VzV2l0aGluIDogdW5kZWZpbmVkKSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyB0eXBlOiBcInRleHRcIiwgY2xhc3NOYW1lOiBsaW5lRm9ybUlucHV0LCBvbkNoYW5nZTogdGhpcy5faGFuZGxlQ2hhbmdlLCBvbkZvY3VzOiB0aGlzLl9oYW5kbGVGb2N1cywgb25CbHVyOiB0aGlzLl9oYW5kbGVCbHVyLCB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgcmVmOiBpbnB1dCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4dElucHV0ID0gaW5wdXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0pLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBsaW5lRm9ybUJ1dHRvbkRpdiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChsaW5lRm9ybUljb24ucmVhY3QsIHsgY2xhc3NOYW1lOiBsaW5lRm9ybUJ1dHRvbkljb24sIGVsZW1lbnRQb3NpdGlvbjogXCJjZW50ZXJcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IHR5cGU6IFwic3VibWl0XCIsIGNsYXNzTmFtZTogbGluZUZvcm1CdXR0b24sIHZhbHVlOiBcIlwiIH0pKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBsaW5lRm9ybUNhcHRpb24gfSwgdGhpcy5fdHJhbnMuX18oJ0dvIHRvIGxpbmUgbnVtYmVyIGJldHdlZW4gMSBhbmQgJTEnLCB0aGlzLnByb3BzLm1heExpbmUpKSkpKTtcbiAgICB9XG59XG4vKipcbiAqIEEgcHVyZSBmdW5jdGlvbmFsIGNvbXBvbmVudCBmb3IgcmVuZGVyaW5nIGEgbGluZS9jb2x1bW5cbiAqIHN0YXR1cyBpdGVtLlxuICovXG5mdW5jdGlvbiBMaW5lQ29sQ29tcG9uZW50KHByb3BzKSB7XG4gICAgY29uc3QgdHJhbnNsYXRvciA9IHByb3BzLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEl0ZW0sIHsgb25DbGljazogcHJvcHMuaGFuZGxlQ2xpY2ssIHNvdXJjZTogdHJhbnMuX18oJ0xuICUxLCBDb2wgJTInLCBwcm9wcy5saW5lLCBwcm9wcy5jb2x1bW4pLCB0aXRsZTogdHJhbnMuX18oJ0dvIHRvIGxpbmUgbnVtYmVy4oCmJykgfSkpO1xufVxuLyoqXG4gKiBBIHdpZGdldCBpbXBsZW1lbnRpbmcgYSBsaW5lL2NvbHVtbiBzdGF0dXMgaXRlbS5cbiAqL1xuZXhwb3J0IGNsYXNzIExpbmVDb2wgZXh0ZW5kcyBWRG9tUmVuZGVyZXIge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBMaW5lQ29sIHN0YXR1cyBpdGVtLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHRyYW5zbGF0b3IpIHtcbiAgICAgICAgc3VwZXIobmV3IExpbmVDb2wuTW9kZWwoKSk7XG4gICAgICAgIHRoaXMuX3BvcHVwID0gbnVsbDtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhpbnRlcmFjdGl2ZUl0ZW0pO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgdGhlIHN0YXR1cyBpdGVtLlxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KExpbmVDb2xDb21wb25lbnQsIHsgbGluZTogdGhpcy5tb2RlbC5saW5lLCBjb2x1bW46IHRoaXMubW9kZWwuY29sdW1uLCB0cmFuc2xhdG9yOiB0aGlzLnRyYW5zbGF0b3IsIGhhbmRsZUNsaWNrOiAoKSA9PiB0aGlzLl9oYW5kbGVDbGljaygpIH0pKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIGNsaWNrIGhhbmRsZXIgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgX2hhbmRsZUNsaWNrKCkge1xuICAgICAgICBpZiAodGhpcy5fcG9wdXApIHtcbiAgICAgICAgICAgIHRoaXMuX3BvcHVwLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBib2R5ID0gUmVhY3RXaWRnZXQuY3JlYXRlKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGluZUZvcm1Db21wb25lbnQsIHsgaGFuZGxlU3VibWl0OiB2YWwgPT4gdGhpcy5faGFuZGxlU3VibWl0KHZhbCksIGN1cnJlbnRMaW5lOiB0aGlzLm1vZGVsLmxpbmUsIG1heExpbmU6IHRoaXMubW9kZWwuZWRpdG9yLmxpbmVDb3VudCwgdHJhbnNsYXRvcjogdGhpcy50cmFuc2xhdG9yIH0pKTtcbiAgICAgICAgdGhpcy5fcG9wdXAgPSBzaG93UG9wdXAoe1xuICAgICAgICAgICAgYm9keTogYm9keSxcbiAgICAgICAgICAgIGFuY2hvcjogdGhpcyxcbiAgICAgICAgICAgIGFsaWduOiAncmlnaHQnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgc3VibWlzc2lvbiBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBfaGFuZGxlU3VibWl0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMubW9kZWwuZWRpdG9yLnNldEN1cnNvclBvc2l0aW9uKHsgbGluZTogdmFsdWUgLSAxLCBjb2x1bW46IDAgfSk7XG4gICAgICAgIHRoaXMuX3BvcHVwLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5tb2RlbC5lZGl0b3IuZm9jdXMoKTtcbiAgICB9XG59XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBMaW5lQ29sIHN0YXRpY3MuXG4gKi9cbihmdW5jdGlvbiAoTGluZUNvbCkge1xuICAgIC8qKlxuICAgICAqIEEgVkRvbSBtb2RlbCBmb3IgYSBzdGF0dXMgaXRlbSB0cmFja2luZyB0aGUgbGluZS9jb2x1bW4gb2YgYW4gZWRpdG9yLlxuICAgICAqL1xuICAgIGNsYXNzIE1vZGVsIGV4dGVuZHMgVkRvbU1vZGVsIHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZWFjdCB0byBhIGNoYW5nZSBpbiB0aGUgY3Vyc29ycyBvZiB0aGUgY3VycmVudCBlZGl0b3IuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuX29uU2VsZWN0aW9uQ2hhbmdlZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRTdGF0ZSA9IHRoaXMuX2dldEFsbFN0YXRlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zID0gdGhpcy5lZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lID0gcG9zLmxpbmUgKyAxO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbHVtbiA9IHBvcy5jb2x1bW4gKyAxO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDaGFuZ2Uob2xkU3RhdGUsIHRoaXMuX2dldEFsbFN0YXRlKCkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuX2xpbmUgPSAxO1xuICAgICAgICAgICAgdGhpcy5fY29sdW1uID0gMTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRvciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjdXJyZW50IGVkaXRvciBvZiB0aGUgbW9kZWwuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgZWRpdG9yKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VkaXRvcjtcbiAgICAgICAgfVxuICAgICAgICBzZXQgZWRpdG9yKGVkaXRvcikge1xuICAgICAgICAgICAgY29uc3Qgb2xkRWRpdG9yID0gdGhpcy5fZWRpdG9yO1xuICAgICAgICAgICAgaWYgKG9sZEVkaXRvcikge1xuICAgICAgICAgICAgICAgIG9sZEVkaXRvci5tb2RlbC5zZWxlY3Rpb25zLmNoYW5nZWQuZGlzY29ubmVjdCh0aGlzLl9vblNlbGVjdGlvbkNoYW5nZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgb2xkU3RhdGUgPSB0aGlzLl9nZXRBbGxTdGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdG9yID0gZWRpdG9yO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9lZGl0b3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2x1bW4gPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmUgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdG9yLm1vZGVsLnNlbGVjdGlvbnMuY2hhbmdlZC5jb25uZWN0KHRoaXMuX29uU2VsZWN0aW9uQ2hhbmdlZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zID0gdGhpcy5fZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29sdW1uID0gcG9zLmNvbHVtbiArIDE7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZSA9IHBvcy5saW5lICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDaGFuZ2Uob2xkU3RhdGUsIHRoaXMuX2dldEFsbFN0YXRlKCkpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY3VycmVudCBsaW5lIG9mIHRoZSBtb2RlbC5cbiAgICAgICAgICovXG4gICAgICAgIGdldCBsaW5lKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmU7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjdXJyZW50IGNvbHVtbiBvZiB0aGUgbW9kZWwuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgY29sdW1uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICBfZ2V0QWxsU3RhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gW3RoaXMuX2xpbmUsIHRoaXMuX2NvbHVtbl07XG4gICAgICAgIH1cbiAgICAgICAgX3RyaWdnZXJDaGFuZ2Uob2xkU3RhdGUsIG5ld1N0YXRlKSB7XG4gICAgICAgICAgICBpZiAob2xkU3RhdGVbMF0gIT09IG5ld1N0YXRlWzBdIHx8IG9sZFN0YXRlWzFdICE9PSBuZXdTdGF0ZVsxXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBMaW5lQ29sLk1vZGVsID0gTW9kZWw7XG59KShMaW5lQ29sIHx8IChMaW5lQ29sID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpbmVDb2wuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgVkRvbU1vZGVsLCBWRG9tUmVuZGVyZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGtlcm5lbEljb24sIHRlcm1pbmFsSWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEdyb3VwSXRlbSwgaW50ZXJhY3RpdmVJdGVtLCBUZXh0SXRlbSB9IGZyb20gJy4uJztcbi8qKlxuICogSGFsZiBzcGFjaW5nIGJldHdlZW4gc3ViaXRlbXMgaW4gYSBzdGF0dXMgaXRlbS5cbiAqL1xuY29uc3QgSEFMRl9TUEFDSU5HID0gNDtcbi8qKlxuICogQSBwdXJlIGZ1bmN0aW9uYWwgY29tcG9uZW50IGZvciByZW5kZXJpbmcga2VybmVsIGFuZCB0ZXJtaW5hbCBzZXNzaW9ucy5cbiAqXG4gKiBAcGFyYW0gcHJvcHM6IHRoZSBwcm9wcyBmb3IgdGhlIGNvbXBvbmVudC5cbiAqXG4gKiBAcmV0dXJucyBhIHRzeCBjb21wb25lbnQgZm9yIHRoZSBydW5uaW5nIHNlc3Npb25zLlxuICovXG5mdW5jdGlvbiBSdW5uaW5nU2Vzc2lvbnNDb21wb25lbnQocHJvcHMpIHtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JvdXBJdGVtLCB7IHNwYWNpbmc6IEhBTEZfU1BBQ0lORywgb25DbGljazogcHJvcHMuaGFuZGxlQ2xpY2sgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChHcm91cEl0ZW0sIHsgc3BhY2luZzogSEFMRl9TUEFDSU5HIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRJdGVtLCB7IHNvdXJjZTogcHJvcHMudGVybWluYWxzIH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCh0ZXJtaW5hbEljb24ucmVhY3QsIHsgbGVmdDogJzFweCcsIHRvcDogJzNweCcsIHN0eWxlc2hlZXQ6ICdzdGF0dXNCYXInIH0pKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChHcm91cEl0ZW0sIHsgc3BhY2luZzogSEFMRl9TUEFDSU5HIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRJdGVtLCB7IHNvdXJjZTogcHJvcHMuc2Vzc2lvbnMgfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KGtlcm5lbEljb24ucmVhY3QsIHsgdG9wOiAnMnB4Jywgc3R5bGVzaGVldDogJ3N0YXR1c0JhcicgfSkpKSk7XG59XG4vKipcbiAqIEEgVkRvbVJlbmRlcmVyIGZvciBhIFJ1bm5pbmdTZXNzaW9ucyBzdGF0dXMgaXRlbS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJ1bm5pbmdTZXNzaW9ucyBleHRlbmRzIFZEb21SZW5kZXJlciB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IFJ1bm5pbmdTZXNzaW9ucyB3aWRnZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihuZXcgUnVubmluZ1Nlc3Npb25zLk1vZGVsKCkpO1xuICAgICAgICB0aGlzLl9zZXJ2aWNlTWFuYWdlciA9IG9wdHMuc2VydmljZU1hbmFnZXI7XG4gICAgICAgIHRoaXMuX2hhbmRsZUNsaWNrID0gb3B0cy5vbkNsaWNrO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSBvcHRzLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMuX3RyYW5zID0gdGhpcy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsb2FkJyk7XG4gICAgICAgIHRoaXMuX3NlcnZpY2VNYW5hZ2VyLnNlc3Npb25zLnJ1bm5pbmdDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25TZXNzaW9uc1J1bm5pbmdDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fc2VydmljZU1hbmFnZXIudGVybWluYWxzLnJ1bm5pbmdDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25UZXJtaW5hbHNSdW5uaW5nQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoaW50ZXJhY3RpdmVJdGVtKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIHRoZSBydW5uaW5nIHNlc3Npb25zIHdpZGdldC5cbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETy1UUkFOUzogU2hvdWxkIHByb2JhYmx5IGJlIGhhbmRsZWQgZGlmZmVyZW50bHkuXG4gICAgICAgIC8vIFRoaXMgaXMgbW9yZSBsb2NhbGl6YWJsZSBmcmllbmRseTogXCJUZXJtaW5hbHM6ICUxIHwgS2VybmVsczogJTJcIlxuICAgICAgICB0aGlzLnRpdGxlLmNhcHRpb24gPSB0aGlzLl90cmFucy5fXygnJTEgVGVybWluYWxzLCAlMiBLZXJuZWwgc2Vzc2lvbnMnLCB0aGlzLm1vZGVsLnRlcm1pbmFscywgdGhpcy5tb2RlbC5zZXNzaW9ucyk7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSdW5uaW5nU2Vzc2lvbnNDb21wb25lbnQsIHsgc2Vzc2lvbnM6IHRoaXMubW9kZWwuc2Vzc2lvbnMsIHRlcm1pbmFsczogdGhpcy5tb2RlbC50ZXJtaW5hbHMsIGhhbmRsZUNsaWNrOiB0aGlzLl9oYW5kbGVDbGljayB9KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHN0YXR1cyBpdGVtLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fc2VydmljZU1hbmFnZXIuc2Vzc2lvbnMucnVubmluZ0NoYW5nZWQuZGlzY29ubmVjdCh0aGlzLl9vblNlc3Npb25zUnVubmluZ0NoYW5nZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLl9zZXJ2aWNlTWFuYWdlci50ZXJtaW5hbHMucnVubmluZ0NoYW5nZWQuZGlzY29ubmVjdCh0aGlzLl9vblRlcm1pbmFsc1J1bm5pbmdDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBudW1iZXIgb2Yga2VybmVsIHNlc3Npb25zIHdoZW4gdGhlIGxpc3QgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBfb25TZXNzaW9uc1J1bm5pbmdDaGFuZ2VkKG1hbmFnZXIsIHNlc3Npb25zKSB7XG4gICAgICAgIHRoaXMubW9kZWwuc2Vzc2lvbnMgPSBzZXNzaW9ucy5sZW5ndGg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgbnVtYmVyIG9mIHRlcm1pbmFsIHNlc3Npb25zIHdoZW4gdGhlIGxpc3QgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBfb25UZXJtaW5hbHNSdW5uaW5nQ2hhbmdlZChtYW5hZ2VyLCB0ZXJtaW5hbHMpIHtcbiAgICAgICAgdGhpcy5tb2RlbC50ZXJtaW5hbHMgPSB0ZXJtaW5hbHMubGVuZ3RoO1xuICAgIH1cbn1cbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIFJ1bm5pbmdTZXNzaW9ucyBzdGF0aWNzLlxuICovXG4oZnVuY3Rpb24gKFJ1bm5pbmdTZXNzaW9ucykge1xuICAgIC8qKlxuICAgICAqIEEgVkRvbU1vZGVsIGZvciB0aGUgUnVubmluZ1Nlc3Npb25zIHN0YXR1cyBpdGVtLlxuICAgICAqL1xuICAgIGNsYXNzIE1vZGVsIGV4dGVuZHMgVkRvbU1vZGVsIHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICAgICAgdGhpcy5fdGVybWluYWxzID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3Nlc3Npb25zID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG51bWJlciBvZiBhY3RpdmUga2VybmVsIHNlc3Npb25zLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IHNlc3Npb25zKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Nlc3Npb25zO1xuICAgICAgICB9XG4gICAgICAgIHNldCBzZXNzaW9ucyhzZXNzaW9ucykge1xuICAgICAgICAgICAgY29uc3Qgb2xkU2Vzc2lvbnMgPSB0aGlzLl9zZXNzaW9ucztcbiAgICAgICAgICAgIHRoaXMuX3Nlc3Npb25zID0gc2Vzc2lvbnM7XG4gICAgICAgICAgICBpZiAob2xkU2Vzc2lvbnMgIT09IHRoaXMuX3Nlc3Npb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbnVtYmVyIG9mIGFjdGl2ZSB0ZXJtaW5hbCBzZXNzaW9ucy5cbiAgICAgICAgICovXG4gICAgICAgIGdldCB0ZXJtaW5hbHMoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGVybWluYWxzO1xuICAgICAgICB9XG4gICAgICAgIHNldCB0ZXJtaW5hbHModGVybWluYWxzKSB7XG4gICAgICAgICAgICBjb25zdCBvbGRUZXJtaW5hbHMgPSB0aGlzLl90ZXJtaW5hbHM7XG4gICAgICAgICAgICB0aGlzLl90ZXJtaW5hbHMgPSB0ZXJtaW5hbHM7XG4gICAgICAgICAgICBpZiAob2xkVGVybWluYWxzICE9PSB0aGlzLl90ZXJtaW5hbHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgUnVubmluZ1Nlc3Npb25zLk1vZGVsID0gTW9kZWw7XG59KShSdW5uaW5nU2Vzc2lvbnMgfHwgKFJ1bm5pbmdTZXNzaW9ucyA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ydW5uaW5nU2Vzc2lvbnMuanMubWFwIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBzdGF0dXNiYXJcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vZGVmYXVsdHMnO1xuZXhwb3J0ICogZnJvbSAnLi9zdGF0dXNiYXInO1xuZXhwb3J0ICogZnJvbSAnLi9zdHlsZS9zdGF0dXNiYXInO1xuZXhwb3J0ICogZnJvbSAnLi90b2tlbnMnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgQXJyYXlFeHQgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG5pbXBvcnQgeyBEaXNwb3NhYmxlRGVsZWdhdGUsIERpc3Bvc2FibGVTZXQgfSBmcm9tICdAbHVtaW5vL2Rpc3Bvc2FibGUnO1xuaW1wb3J0IHsgUGFuZWwsIFBhbmVsTGF5b3V0LCBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuaW1wb3J0IHsgc3RhdHVzQmFyIGFzIGJhclN0eWxlLCBpdGVtIGFzIGl0ZW1TdHlsZSwgbGVmdFNpZGUgYXMgbGVmdFNpZGVTdHlsZSwgcmlnaHRTaWRlIGFzIHJpZ2h0U2lkZVN0eWxlLCBzaWRlIGFzIHNpZGVTdHlsZSB9IGZyb20gJy4vc3R5bGUvc3RhdHVzYmFyJztcbi8qKlxuICogTWFpbiBzdGF0dXMgYmFyIG9iamVjdCB3aGljaCBjb250YWlucyBhbGwgaXRlbXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGF0dXNCYXIgZXh0ZW5kcyBXaWRnZXQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9sZWZ0UmFua0l0ZW1zID0gW107XG4gICAgICAgIHRoaXMuX3JpZ2h0UmFua0l0ZW1zID0gW107XG4gICAgICAgIHRoaXMuX3N0YXR1c0l0ZW1zID0ge307XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVzID0gbmV3IERpc3Bvc2FibGVTZXQoKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhiYXJTdHlsZSk7XG4gICAgICAgIGNvbnN0IHJvb3RMYXlvdXQgPSAodGhpcy5sYXlvdXQgPSBuZXcgUGFuZWxMYXlvdXQoKSk7XG4gICAgICAgIGNvbnN0IGxlZnRQYW5lbCA9ICh0aGlzLl9sZWZ0U2lkZSA9IG5ldyBQYW5lbCgpKTtcbiAgICAgICAgY29uc3QgbWlkZGxlUGFuZWwgPSAodGhpcy5fbWlkZGxlUGFuZWwgPSBuZXcgUGFuZWwoKSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0UGFuZWwgPSAodGhpcy5fcmlnaHRTaWRlID0gbmV3IFBhbmVsKCkpO1xuICAgICAgICBsZWZ0UGFuZWwuYWRkQ2xhc3Moc2lkZVN0eWxlKTtcbiAgICAgICAgbGVmdFBhbmVsLmFkZENsYXNzKGxlZnRTaWRlU3R5bGUpO1xuICAgICAgICBtaWRkbGVQYW5lbC5hZGRDbGFzcyhzaWRlU3R5bGUpO1xuICAgICAgICByaWdodFBhbmVsLmFkZENsYXNzKHNpZGVTdHlsZSk7XG4gICAgICAgIHJpZ2h0UGFuZWwuYWRkQ2xhc3MocmlnaHRTaWRlU3R5bGUpO1xuICAgICAgICByb290TGF5b3V0LmFkZFdpZGdldChsZWZ0UGFuZWwpO1xuICAgICAgICByb290TGF5b3V0LmFkZFdpZGdldChtaWRkbGVQYW5lbCk7XG4gICAgICAgIHJvb3RMYXlvdXQuYWRkV2lkZ2V0KHJpZ2h0UGFuZWwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBhIG5ldyBzdGF0dXMgaXRlbS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAtIGEgdW5pcXVlIGlkIGZvciB0aGUgc3RhdHVzIGl0ZW0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RhdHVzSXRlbSAtIFRoZSBpdGVtIHRvIGFkZCB0byB0aGUgc3RhdHVzIGJhci5cbiAgICAgKi9cbiAgICByZWdpc3RlclN0YXR1c0l0ZW0oaWQsIHN0YXR1c0l0ZW0pIHtcbiAgICAgICAgaWYgKGlkIGluIHRoaXMuX3N0YXR1c0l0ZW1zKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN0YXR1cyBpdGVtICR7aWR9IGFscmVhZHkgcmVnaXN0ZXJlZC5gKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBQb3B1bGF0ZSBkZWZhdWx0cyBmb3IgdGhlIG9wdGlvbmFsIHByb3BlcnRpZXMgb2YgdGhlIHN0YXR1cyBpdGVtLlxuICAgICAgICBjb25zdCBmdWxsU3RhdHVzSXRlbSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgUHJpdmF0ZS5zdGF0dXNJdGVtRGVmYXVsdHMpLCBzdGF0dXNJdGVtKTtcbiAgICAgICAgY29uc3QgeyBhbGlnbiwgaXRlbSwgcmFuayB9ID0gZnVsbFN0YXR1c0l0ZW07XG4gICAgICAgIC8vIENvbm5lY3QgdGhlIGFjdGl2ZVN0YXRlQ2hhbmdlZCBzaWduYWwgdG8gcmVmcmVzaGluZyB0aGUgc3RhdHVzIGl0ZW0sXG4gICAgICAgIC8vIGlmIHRoZSBzaWduYWwgd2FzIHByb3ZpZGVkLlxuICAgICAgICBjb25zdCBvbkFjdGl2ZVN0YXRlQ2hhbmdlZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hJdGVtKGlkKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGZ1bGxTdGF0dXNJdGVtLmFjdGl2ZVN0YXRlQ2hhbmdlZCkge1xuICAgICAgICAgICAgZnVsbFN0YXR1c0l0ZW0uYWN0aXZlU3RhdGVDaGFuZ2VkLmNvbm5lY3Qob25BY3RpdmVTdGF0ZUNoYW5nZWQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJhbmtJdGVtID0geyBpZCwgcmFuayB9O1xuICAgICAgICBmdWxsU3RhdHVzSXRlbS5pdGVtLmFkZENsYXNzKGl0ZW1TdHlsZSk7XG4gICAgICAgIHRoaXMuX3N0YXR1c0l0ZW1zW2lkXSA9IGZ1bGxTdGF0dXNJdGVtO1xuICAgICAgICBpZiAoYWxpZ24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgY29uc3QgaW5zZXJ0SW5kZXggPSB0aGlzLl9maW5kSW5zZXJ0SW5kZXgodGhpcy5fbGVmdFJhbmtJdGVtcywgcmFua0l0ZW0pO1xuICAgICAgICAgICAgaWYgKGluc2VydEluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xlZnRTaWRlLmFkZFdpZGdldChpdGVtKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sZWZ0UmFua0l0ZW1zLnB1c2gocmFua0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgQXJyYXlFeHQuaW5zZXJ0KHRoaXMuX2xlZnRSYW5rSXRlbXMsIGluc2VydEluZGV4LCByYW5rSXRlbSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGVmdFNpZGUuaW5zZXJ0V2lkZ2V0KGluc2VydEluZGV4LCBpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbGlnbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgY29uc3QgaW5zZXJ0SW5kZXggPSB0aGlzLl9maW5kSW5zZXJ0SW5kZXgodGhpcy5fcmlnaHRSYW5rSXRlbXMsIHJhbmtJdGVtKTtcbiAgICAgICAgICAgIGlmIChpbnNlcnRJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yaWdodFNpZGUuYWRkV2lkZ2V0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JpZ2h0UmFua0l0ZW1zLnB1c2gocmFua0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgQXJyYXlFeHQuaW5zZXJ0KHRoaXMuX3JpZ2h0UmFua0l0ZW1zLCBpbnNlcnRJbmRleCwgcmFua0l0ZW0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JpZ2h0U2lkZS5pbnNlcnRXaWRnZXQoaW5zZXJ0SW5kZXgsIGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWlkZGxlUGFuZWwuYWRkV2lkZ2V0KGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlZnJlc2hJdGVtKGlkKTsgLy8gSW5pdGlhbGx5IHJlZnJlc2ggdGhlIHN0YXR1cyBpdGVtLlxuICAgICAgICBjb25zdCBkaXNwb3NhYmxlID0gbmV3IERpc3Bvc2FibGVEZWxlZ2F0ZSgoKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fc3RhdHVzSXRlbXNbaWRdO1xuICAgICAgICAgICAgaWYgKGZ1bGxTdGF0dXNJdGVtLmFjdGl2ZVN0YXRlQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIGZ1bGxTdGF0dXNJdGVtLmFjdGl2ZVN0YXRlQ2hhbmdlZC5kaXNjb25uZWN0KG9uQWN0aXZlU3RhdGVDaGFuZ2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZW0ucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGl0ZW0uZGlzcG9zZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZXMuYWRkKGRpc3Bvc2FibGUpO1xuICAgICAgICByZXR1cm4gZGlzcG9zYWJsZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgc3RhdHVzIGJhci5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLl9sZWZ0UmFua0l0ZW1zLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX3JpZ2h0UmFua0l0ZW1zLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYW4gJ3VwZGF0ZS1yZXF1ZXN0JyBtZXNzYWdlIHRvIHRoZSBzdGF0dXMgYmFyLlxuICAgICAqL1xuICAgIG9uVXBkYXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgdGhpcy5fcmVmcmVzaEFsbCgpO1xuICAgICAgICBzdXBlci5vblVwZGF0ZVJlcXVlc3QobXNnKTtcbiAgICB9XG4gICAgX2ZpbmRJbnNlcnRJbmRleChzaWRlLCBuZXdJdGVtKSB7XG4gICAgICAgIHJldHVybiBBcnJheUV4dC5maW5kRmlyc3RJbmRleChzaWRlLCBpdGVtID0+IGl0ZW0ucmFuayA+IG5ld0l0ZW0ucmFuayk7XG4gICAgfVxuICAgIF9yZWZyZXNoSXRlbShpZCkge1xuICAgICAgICBjb25zdCBzdGF0dXNJdGVtID0gdGhpcy5fc3RhdHVzSXRlbXNbaWRdO1xuICAgICAgICBpZiAoc3RhdHVzSXRlbS5pc0FjdGl2ZSgpKSB7XG4gICAgICAgICAgICBzdGF0dXNJdGVtLml0ZW0uc2hvdygpO1xuICAgICAgICAgICAgc3RhdHVzSXRlbS5pdGVtLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RhdHVzSXRlbS5pdGVtLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfcmVmcmVzaEFsbCgpIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5fc3RhdHVzSXRlbXMpLmZvckVhY2goaWQgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaEl0ZW0oaWQpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIGZ1bmN0aW9uYWxpdHkuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBvcHRpb25zIGZvciBhIHN0YXR1cyBpdGVtLCBsZXNzIHRoZSBpdGVtIGl0c2VsZi5cbiAgICAgKi9cbiAgICBQcml2YXRlLnN0YXR1c0l0ZW1EZWZhdWx0cyA9IHtcbiAgICAgICAgYWxpZ246ICdsZWZ0JyxcbiAgICAgICAgcmFuazogMCxcbiAgICAgICAgaXNBY3RpdmU6ICgpID0+IHRydWUsXG4gICAgICAgIGFjdGl2ZVN0YXRlQ2hhbmdlZDogdW5kZWZpbmVkXG4gICAgfTtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RhdHVzYmFyLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmV4cG9ydCBjb25zdCBjZW50ZXJlZEZsZXggPSB7XG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInXG59O1xuZXhwb3J0IGNvbnN0IGxlZnRUb1JpZ2h0ID0ge1xuICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnXG59O1xuZXhwb3J0IGNvbnN0IHJpZ2h0VG9MZWZ0ID0ge1xuICAgIGZsZXhEaXJlY3Rpb246ICdyb3ctcmV2ZXJzZSdcbn07XG5leHBvcnQgY29uc3QgZXF1aURpc3RhbnQgPSB7XG4gICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJ1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxheW91dC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBzdHlsZSB9IGZyb20gJ3R5cGVzdHlsZS9saWInO1xuZXhwb3J0IGNvbnN0IGhvdmVySXRlbSA9IHN0eWxlKHtcbiAgICBib3hTaGFkb3c6ICcwcHggNHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMjUpJ1xufSk7XG5leHBvcnQgY29uc3QgbGluZUZvcm1TZWFyY2ggPSBzdHlsZSh7XG4gICAgcGFkZGluZzogJzRweCAxMnB4JyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1qcC1sYXlvdXQtY29sb3IyKScsXG4gICAgYm94U2hhZG93OiAndmFyKC0tanAtdG9vbGJhci1ib3gtc2hhZG93KScsXG4gICAgekluZGV4OiAyLFxuICAgIGZvbnRTaXplOiAndmFyKC0tanAtdWktZm9udC1zaXplMSknXG59KTtcbmV4cG9ydCBjb25zdCBsaW5lRm9ybUNhcHRpb24gPSBzdHlsZSh7XG4gICAgZm9udFNpemU6ICd2YXIoLS1qcC11aS1mb250LXNpemUwKScsXG4gICAgbGluZUhlaWdodDogJ3ZhcigtLWpwLXVpLWZvbnQtc2l6ZTEpJyxcbiAgICBtYXJnaW5Ub3A6ICc0cHgnLFxuICAgIGNvbG9yOiAndmFyKC0tanAtdWktZm9udC1jb2xvcjApJ1xufSk7XG5leHBvcnQgY29uc3QgYmFzZUxpbmVGb3JtID0ge1xuICAgIGJvcmRlcjogJ25vbmUnLFxuICAgIGJvcmRlclJhZGl1czogJzBweCcsXG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgYmFja2dyb3VuZFNpemU6ICcxNnB4JyxcbiAgICBiYWNrZ3JvdW5kUmVwZWF0OiAnbm8tcmVwZWF0JyxcbiAgICBiYWNrZ3JvdW5kUG9zaXRpb246ICdjZW50ZXInLFxuICAgIG91dGxpbmU6ICdub25lJyxcbiAgICB0b3A6ICcwcHgnLFxuICAgIHJpZ2h0OiAnMHB4J1xufTtcbmV4cG9ydCBjb25zdCBsaW5lRm9ybUJ1dHRvbkRpdiA9IHN0eWxlKGJhc2VMaW5lRm9ybSwge1xuICAgIHRvcDogJzRweCcsXG4gICAgcmlnaHQ6ICc4cHgnLFxuICAgIGhlaWdodDogJzI0cHgnLFxuICAgIHBhZGRpbmc6ICcwcHggMTJweCcsXG4gICAgd2lkdGg6ICcxMnB4J1xufSk7XG5leHBvcnQgY29uc3QgbGluZUZvcm1CdXR0b25JY29uID0gc3R5bGUoYmFzZUxpbmVGb3JtLCB7XG4gICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tanAtYnJhbmQtY29sb3IxKScsXG4gICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICBwYWRkaW5nOiAnNHB4IDZweCdcbn0pO1xuZXhwb3J0IGNvbnN0IGxpbmVGb3JtQnV0dG9uID0gc3R5bGUoYmFzZUxpbmVGb3JtLCB7XG4gICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgIGhlaWdodDogJzEwMCUnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCdcbn0pO1xuZXhwb3J0IGNvbnN0IGxpbmVGb3JtV3JhcHBlciA9IHN0eWxlKHtcbiAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgcGFkZGluZzogJzBweCA4cHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1qcC1ib3JkZXItY29sb3IwKScsXG4gICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tanAtaW5wdXQtYWN0aXZlLWJhY2tncm91bmQpJyxcbiAgICBoZWlnaHQ6ICcyMnB4J1xufSk7XG5leHBvcnQgY29uc3QgbGluZUZvcm1XcmFwcGVyRm9jdXNXaXRoaW4gPSBzdHlsZSh7XG4gICAgYm9yZGVyOiAndmFyKC0tanAtYm9yZGVyLXdpZHRoKSBzb2xpZCB2YXIoLS1tZC1ibHVlLTUwMCknLFxuICAgIGJveFNoYWRvdzogJ2luc2V0IDAgMCA0cHggdmFyKC0tbWQtYmx1ZS0zMDApJ1xufSk7XG5leHBvcnQgY29uc3QgbGluZUZvcm1JbnB1dCA9IHN0eWxlKHtcbiAgICBiYWNrZ3JvdW5kOiAndHJhbnNwYXJlbnQnLFxuICAgIHdpZHRoOiAnMjAwcHgnLFxuICAgIGhlaWdodDogJzEwMCUnLFxuICAgIGJvcmRlcjogJ25vbmUnLFxuICAgIG91dGxpbmU6ICdub25lJyxcbiAgICBjb2xvcjogJ3ZhcigtLWpwLXVpLWZvbnQtY29sb3IwKScsXG4gICAgbGluZUhlaWdodDogJzI4cHgnXG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpbmVGb3JtLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IHN0eWxlIH0gZnJvbSAndHlwZXN0eWxlL2xpYic7XG5pbXBvcnQgeyBjZW50ZXJlZEZsZXgsIGxlZnRUb1JpZ2h0LCByaWdodFRvTGVmdCB9IGZyb20gJy4vbGF5b3V0JztcbmltcG9ydCB7IHRleHRJdGVtIH0gZnJvbSAnLi90ZXh0JztcbmltcG9ydCB2YXJzIGZyb20gJy4vdmFyaWFibGVzJztcbmNvbnN0IGl0ZW1QYWRkaW5nID0ge1xuICAgIHBhZGRpbmdMZWZ0OiB2YXJzLml0ZW1QYWRkaW5nLFxuICAgIHBhZGRpbmdSaWdodDogdmFycy5pdGVtUGFkZGluZ1xufTtcbmNvbnN0IGludGVyYWN0aXZlSG92ZXIgPSB7XG4gICAgJG5lc3Q6IHtcbiAgICAgICAgJyY6aG92ZXInOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHZhcnMuaG92ZXJDb2xvclxuICAgICAgICB9XG4gICAgfVxufTtcbmNvbnN0IGNsaWNrZWQgPSB7XG4gICAgYmFja2dyb3VuZENvbG9yOiB2YXJzLmNsaWNrQ29sb3IsXG4gICAgJG5lc3Q6IHtcbiAgICAgICAgWycuJyArIHRleHRJdGVtXToge1xuICAgICAgICAgICAgY29sb3I6IHZhcnMudGV4dENsaWNrQ29sb3JcbiAgICAgICAgfVxuICAgIH1cbn07XG5leHBvcnQgY29uc3Qgc3RhdHVzQmFyID0gc3R5bGUoe1xuICAgIGJhY2tncm91bmQ6IHZhcnMuYmFja2dyb3VuZENvbG9yLFxuICAgIG1pbkhlaWdodDogdmFycy5oZWlnaHQsXG4gICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICBwYWRkaW5nTGVmdDogdmFycy5zdGF0dXNCYXJQYWRkaW5nLFxuICAgIHBhZGRpbmdSaWdodDogdmFycy5zdGF0dXNCYXJQYWRkaW5nXG59LCBjZW50ZXJlZEZsZXgpO1xuZXhwb3J0IGNvbnN0IHNpZGUgPSBzdHlsZShjZW50ZXJlZEZsZXgpO1xuZXhwb3J0IGNvbnN0IGxlZnRTaWRlID0gc3R5bGUobGVmdFRvUmlnaHQpO1xuZXhwb3J0IGNvbnN0IHJpZ2h0U2lkZSA9IHN0eWxlKHJpZ2h0VG9MZWZ0KTtcbmV4cG9ydCBjb25zdCBpdGVtID0gc3R5bGUoe1xuICAgIG1heEhlaWdodDogdmFycy5oZWlnaHQsXG4gICAgbWFyZ2luTGVmdDogdmFycy5pdGVtTWFyZ2luLFxuICAgIG1hcmdpblJpZ2h0OiB2YXJzLml0ZW1NYXJnaW4sXG4gICAgaGVpZ2h0OiB2YXJzLmhlaWdodCxcbiAgICB3aGl0ZVNwYWNlOiB2YXJzLndoaXRlU3BhY2UsXG4gICAgdGV4dE92ZXJmbG93OiB2YXJzLnRleHRPdmVyZmxvdyxcbiAgICBjb2xvcjogdmFycy50ZXh0Q29sb3Jcbn0sIGl0ZW1QYWRkaW5nKTtcbmV4cG9ydCBjb25zdCBjbGlja2VkSXRlbSA9IHN0eWxlKGNsaWNrZWQpO1xuZXhwb3J0IGNvbnN0IGludGVyYWN0aXZlSXRlbSA9IHN0eWxlKGludGVyYWN0aXZlSG92ZXIpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RhdHVzYmFyLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IHN0eWxlIH0gZnJvbSAndHlwZXN0eWxlL2xpYic7XG5pbXBvcnQgdmFycyBmcm9tICcuL3ZhcmlhYmxlcyc7XG5leHBvcnQgY29uc3QgYmFzZVRleHQgPSB7XG4gICAgZm9udFNpemU6IHZhcnMuZm9udFNpemUsXG4gICAgZm9udEZhbWlseTogdmFycy5mb250RmFtaWx5XG59O1xuZXhwb3J0IGNvbnN0IHRleHRJdGVtID0gc3R5bGUoYmFzZVRleHQsIHtcbiAgICBsaW5lSGVpZ2h0OiAnMjRweCcsXG4gICAgY29sb3I6IHZhcnMudGV4dENvbG9yXG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRleHQuanMubWFwIiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGhvdmVyQ29sb3I6ICd2YXIoLS1qcC1sYXlvdXQtY29sb3IzKScsXG4gICAgY2xpY2tDb2xvcjogJ3ZhcigtLWpwLWJyYW5kLWNvbG9yMSknLFxuICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWpwLWxheW91dC1jb2xvcjIpJyxcbiAgICBoZWlnaHQ6ICd2YXIoLS1qcC1zdGF0dXNiYXItaGVpZ2h0KScsXG4gICAgZm9udFNpemU6ICd2YXIoLS1qcC11aS1mb250LXNpemUxKScsXG4gICAgZm9udEZhbWlseTogJ3ZhcigtLWpwLXVpLWZvbnQtZmFtaWx5KScsXG4gICAgdGV4dENvbG9yOiAndmFyKC0tanAtdWktZm9udC1jb2xvcjEpJyxcbiAgICB0ZXh0Q2xpY2tDb2xvcjogJ3doaXRlJyxcbiAgICBpdGVtTWFyZ2luOiAnMnB4JyxcbiAgICBpdGVtUGFkZGluZzogJzZweCcsXG4gICAgc3RhdHVzQmFyUGFkZGluZzogJzEwcHgnLFxuICAgIGludGVySXRlbUhhbGZTcGFjaW5nOiAnMnB4JyxcbiAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcydcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD12YXJpYWJsZXMuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuZXhwb3J0IGNvbnN0IElTdGF0dXNCYXIgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL3N0YXR1c2JhcjpJU3RhdHVzQmFyJyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b2tlbnMuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==