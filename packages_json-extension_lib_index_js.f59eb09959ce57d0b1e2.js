(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_json-extension_lib_index_js"],{

/***/ "../../packages/json-extension/lib/component.js":
/*!******************************************************!*\
  !*** ../../packages/json-extension/lib/component.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_highlighter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-highlighter */ "webpack/sharing/consume/default/react-highlighter/react-highlighter");
/* harmony import */ var react_highlighter__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_highlighter__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_json_tree__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-json-tree */ "webpack/sharing/consume/default/react-json-tree/react-json-tree");
/* harmony import */ var react_json_tree__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_json_tree__WEBPACK_IMPORTED_MODULE_5__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.






/**
 * A component that renders JSON data as a collapsible tree.
 */
class Component extends react__WEBPACK_IMPORTED_MODULE_3__.Component {
    constructor() {
        super(...arguments);
        this.state = { filter: '', value: '' };
        this.timer = 0;
        this.handleChange = (event) => {
            const { value } = event.target;
            this.setState({ value });
            window.clearTimeout(this.timer);
            this.timer = window.setTimeout(() => {
                this.setState({ filter: value });
            }, 300);
        };
    }
    render() {
        const translator = this.props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator;
        const trans = translator.load('jupyterlab');
        const { data, metadata } = this.props;
        const root = metadata && metadata.root ? metadata.root : 'root';
        const keyPaths = this.state.filter
            ? filterPaths(data, this.state.filter, [root])
            : [root];
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "container" },
            react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.InputGroup, { className: "filter", type: "text", placeholder: trans.__('Filter…'), onChange: this.handleChange, value: this.state.value, rightIcon: "ui-components:search" }),
            react__WEBPACK_IMPORTED_MODULE_3__.createElement((react_json_tree__WEBPACK_IMPORTED_MODULE_5___default()), { data: data, collectionLimit: 100, theme: {
                    extend: theme,
                    valueLabel: 'cm-variable',
                    valueText: 'cm-string',
                    nestedNodeItemString: 'cm-comment'
                }, invertTheme: false, keyPath: [root], getItemString: (type, data, itemType, itemString) => Array.isArray(data) ? (
                // Always display array type and the number of items i.e. "[] 2 items".
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("span", null,
                    itemType,
                    " ",
                    itemString)) : Object.keys(data).length === 0 ? (
                // Only display object type when it's empty i.e. "{}".
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("span", null, itemType)) : (null // Upstream typings don't accept null, but it should be ok
                ), labelRenderer: ([label, type]) => {
                    // let className = 'cm-variable';
                    // if (type === 'root') {
                    //   className = 'cm-variable-2';
                    // }
                    // if (type === 'array') {
                    //   className = 'cm-variable-2';
                    // }
                    // if (type === 'Object') {
                    //   className = 'cm-variable-3';
                    // }
                    return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("span", { className: "cm-keyword" },
                        react__WEBPACK_IMPORTED_MODULE_3__.createElement((react_highlighter__WEBPACK_IMPORTED_MODULE_4___default()), { search: this.state.filter, matchStyle: { backgroundColor: 'yellow' } }, `${label}: `)));
                }, valueRenderer: raw => {
                    let className = 'cm-string';
                    if (typeof raw === 'number') {
                        className = 'cm-number';
                    }
                    if (raw === 'true' || raw === 'false') {
                        className = 'cm-keyword';
                    }
                    return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("span", { className: className },
                        react__WEBPACK_IMPORTED_MODULE_3__.createElement((react_highlighter__WEBPACK_IMPORTED_MODULE_4___default()), { search: this.state.filter, matchStyle: { backgroundColor: 'yellow' } }, `${raw}`)));
                }, shouldExpandNode: (keyPath, data, level) => metadata && metadata.expanded
                    ? true
                    : keyPaths.join(',').includes(keyPath.join(',')) })));
    }
}
// Provide an invalid theme object (this is on purpose!) to invalidate the
// react-json-tree's inline styles that override CodeMirror CSS classes
const theme = {
    scheme: 'jupyter',
    base00: 'invalid',
    base01: 'invalid',
    base02: 'invalid',
    base03: 'invalid',
    base04: 'invalid',
    base05: 'invalid',
    base06: 'invalid',
    base07: 'invalid',
    base08: 'invalid',
    base09: 'invalid',
    base0A: 'invalid',
    base0B: 'invalid',
    base0C: 'invalid',
    base0D: 'invalid',
    base0E: 'invalid',
    base0F: 'invalid',
    author: 'invalid'
};
function objectIncludes(data, query) {
    return JSON.stringify(data).includes(query);
}
function filterPaths(data, query, parent = ['root']) {
    if (_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.JSONExt.isArray(data)) {
        return data.reduce((result, item, index) => {
            if (item && typeof item === 'object' && objectIncludes(item, query)) {
                return [
                    ...result,
                    [index, ...parent].join(','),
                    ...filterPaths(item, query, [index, ...parent])
                ];
            }
            return result;
        }, []);
    }
    if (_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.JSONExt.isObject(data)) {
        return Object.keys(data).reduce((result, key) => {
            const item = data[key];
            if (item &&
                typeof item === 'object' &&
                (key.includes(query) || objectIncludes(item, query))) {
                return [
                    ...result,
                    [key, ...parent].join(','),
                    ...filterPaths(item, query, [key, ...parent])
                ];
            }
            return result;
        }, []);
    }
    return [];
}
//# sourceMappingURL=component.js.map

/***/ }),

/***/ "../../packages/json-extension/lib/index.js":
/*!**************************************************!*\
  !*** ../../packages/json-extension/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MIME_TYPE": () => (/* binding */ MIME_TYPE),
/* harmony export */   "RenderedJSON": () => (/* binding */ RenderedJSON),
/* harmony export */   "rendererFactory": () => (/* binding */ rendererFactory),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom */ "webpack/sharing/consume/default/react-dom/react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component */ "../../packages/json-extension/lib/component.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module json-extension
 */






/**
 * The CSS class to add to the JSON Widget.
 */
const CSS_CLASS = 'jp-RenderedJSON';
/**
 * The MIME type for JSON.
 */
const MIME_TYPE = 'application/json';
/**
 * A renderer for JSON data.
 */
class RenderedJSON extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget {
    /**
     * Create a new widget for rendering JSON.
     */
    constructor(options) {
        super();
        this.addClass(CSS_CLASS);
        this.addClass('CodeMirror');
        this.addClass('cm-s-jupyter');
        this._mimeType = options.mimeType;
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
    }
    [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Printing.symbol]() {
        return () => _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Printing.printWidget(this);
    }
    /**
     * Render JSON into this widget's node.
     */
    renderModel(model) {
        const data = (model.data[this._mimeType] || {});
        const metadata = (model.metadata[this._mimeType] || {});
        return new Promise((resolve, reject) => {
            react_dom__WEBPACK_IMPORTED_MODULE_4__.render(react__WEBPACK_IMPORTED_MODULE_3__.createElement(_component__WEBPACK_IMPORTED_MODULE_5__.Component, { data: data, metadata: metadata, translator: this.translator }), this.node, () => {
                resolve();
            });
        });
    }
    /**
     * Called before the widget is detached from the DOM.
     */
    onBeforeDetach(msg) {
        // Unmount the component so it can tear down.
        react_dom__WEBPACK_IMPORTED_MODULE_4__.unmountComponentAtNode(this.node);
    }
}
/**
 * A mime renderer factory for JSON data.
 */
const rendererFactory = {
    safe: true,
    mimeTypes: [MIME_TYPE],
    createRenderer: options => new RenderedJSON(options)
};
const extensions = [
    {
        id: '@jupyterlab/json-extension:factory',
        rendererFactory,
        rank: 0,
        dataType: 'json',
        documentWidgetFactoryOptions: {
            name: 'JSON',
            primaryFileType: 'json',
            fileTypes: ['json', 'notebook', 'geojson'],
            defaultFor: ['json']
        }
    }
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extensions);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvanNvbi1leHRlbnNpb24vbGliL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvanNvbi1leHRlbnNpb24vbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ3lEO0FBQ0Y7QUFDWDtBQUNiO0FBQ1c7QUFDSDtBQUN2QztBQUNBO0FBQ0E7QUFDTyx3QkFBd0IsNENBQWU7QUFDOUM7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0EsbUJBQW1CLFFBQVE7QUFDM0IsMkJBQTJCLFFBQVE7QUFDbkM7QUFDQTtBQUNBLCtCQUErQixnQkFBZ0I7QUFDL0MsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxtRUFBYztBQUNsRTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGdEQUFtQixTQUFTLHlCQUF5QjtBQUNyRSxZQUFZLGdEQUFtQixDQUFDLGlFQUFVLEdBQUcsK0pBQStKO0FBQzVNLFlBQVksZ0RBQW1CLENBQUMsd0RBQVEsR0FBRztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGdCQUFnQixnREFBbUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FO0FBQ3BFLGdCQUFnQixnREFBbUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixnREFBbUIsVUFBVSwwQkFBMEI7QUFDbkYsd0JBQXdCLGdEQUFtQixDQUFDLDBEQUFTLEdBQUcseUNBQXlDLDRCQUE0QixFQUFFLEtBQUssTUFBTTtBQUMxSSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsZ0RBQW1CLFVBQVUsdUJBQXVCO0FBQ2hGLHdCQUF3QixnREFBbUIsQ0FBQywwREFBUyxHQUFHLHlDQUF5Qyw0QkFBNEIsRUFBRSxLQUFLLElBQUk7QUFDeEksaUJBQWlCO0FBQ2pCO0FBQ0Esc0VBQXNFO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw4REFBZTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxRQUFRLCtEQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EscUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNnRDtBQUNTO0FBQ2hCO0FBQ1Y7QUFDTztBQUNFO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTywyQkFBMkIsbURBQU07QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELG1FQUFjO0FBQzlEO0FBQ0EsS0FBSyxpRUFBZTtBQUNwQixxQkFBcUIsc0VBQW9CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQsOERBQThEO0FBQzlEO0FBQ0EsWUFBWSw2Q0FBZSxDQUFDLGdEQUFtQixDQUFDLGlEQUFTLEdBQUcsOERBQThEO0FBQzFIO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDZEQUErQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxVQUFVLEVBQUM7QUFDMUIsaUMiLCJmaWxlIjoicGFja2FnZXNfanNvbi1leHRlbnNpb25fbGliX2luZGV4X2pzLmY1OWViMDk5NTljZTU3ZDBiMWUyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBJbnB1dEdyb3VwIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyBKU09ORXh0IH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhpZ2hsaWdodCBmcm9tICdyZWFjdC1oaWdobGlnaHRlcic7XG5pbXBvcnQgSlNPTlRyZWUgZnJvbSAncmVhY3QtanNvbi10cmVlJztcbi8qKlxuICogQSBjb21wb25lbnQgdGhhdCByZW5kZXJzIEpTT04gZGF0YSBhcyBhIGNvbGxhcHNpYmxlIHRyZWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0geyBmaWx0ZXI6ICcnLCB2YWx1ZTogJycgfTtcbiAgICAgICAgdGhpcy50aW1lciA9IDA7XG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWUgfSk7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICAgICAgdGhpcy50aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZmlsdGVyOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgdHJhbnNsYXRvciA9IHRoaXMucHJvcHMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgeyBkYXRhLCBtZXRhZGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3Qgcm9vdCA9IG1ldGFkYXRhICYmIG1ldGFkYXRhLnJvb3QgPyBtZXRhZGF0YS5yb290IDogJ3Jvb3QnO1xuICAgICAgICBjb25zdCBrZXlQYXRocyA9IHRoaXMuc3RhdGUuZmlsdGVyXG4gICAgICAgICAgICA/IGZpbHRlclBhdGhzKGRhdGEsIHRoaXMuc3RhdGUuZmlsdGVyLCBbcm9vdF0pXG4gICAgICAgICAgICA6IFtyb290XTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImNvbnRhaW5lclwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0R3JvdXAsIHsgY2xhc3NOYW1lOiBcImZpbHRlclwiLCB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IHRyYW5zLl9fKCdGaWx0ZXLigKYnKSwgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlLCB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgcmlnaHRJY29uOiBcInVpLWNvbXBvbmVudHM6c2VhcmNoXCIgfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEpTT05UcmVlLCB7IGRhdGE6IGRhdGEsIGNvbGxlY3Rpb25MaW1pdDogMTAwLCB0aGVtZToge1xuICAgICAgICAgICAgICAgICAgICBleHRlbmQ6IHRoZW1lLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZUxhYmVsOiAnY20tdmFyaWFibGUnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVRleHQ6ICdjbS1zdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICBuZXN0ZWROb2RlSXRlbVN0cmluZzogJ2NtLWNvbW1lbnQnXG4gICAgICAgICAgICAgICAgfSwgaW52ZXJ0VGhlbWU6IGZhbHNlLCBrZXlQYXRoOiBbcm9vdF0sIGdldEl0ZW1TdHJpbmc6ICh0eXBlLCBkYXRhLCBpdGVtVHlwZSwgaXRlbVN0cmluZykgPT4gQXJyYXkuaXNBcnJheShkYXRhKSA/IChcbiAgICAgICAgICAgICAgICAvLyBBbHdheXMgZGlzcGxheSBhcnJheSB0eXBlIGFuZCB0aGUgbnVtYmVyIG9mIGl0ZW1zIGkuZS4gXCJbXSAyIGl0ZW1zXCIuXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgaXRlbVR5cGUsXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiLFxuICAgICAgICAgICAgICAgICAgICBpdGVtU3RyaW5nKSkgOiBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgLy8gT25seSBkaXNwbGF5IG9iamVjdCB0eXBlIHdoZW4gaXQncyBlbXB0eSBpLmUuIFwie31cIi5cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBpdGVtVHlwZSkpIDogKG51bGwgLy8gVXBzdHJlYW0gdHlwaW5ncyBkb24ndCBhY2NlcHQgbnVsbCwgYnV0IGl0IHNob3VsZCBiZSBva1xuICAgICAgICAgICAgICAgICksIGxhYmVsUmVuZGVyZXI6IChbbGFiZWwsIHR5cGVdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBjbGFzc05hbWUgPSAnY20tdmFyaWFibGUnO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiAodHlwZSA9PT0gJ3Jvb3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgY2xhc3NOYW1lID0gJ2NtLXZhcmlhYmxlLTInO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh0eXBlID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgY2xhc3NOYW1lID0gJ2NtLXZhcmlhYmxlLTInO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh0eXBlID09PSAnT2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAvLyAgIGNsYXNzTmFtZSA9ICdjbS12YXJpYWJsZS0zJztcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImNtLWtleXdvcmRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIaWdobGlnaHQsIHsgc2VhcmNoOiB0aGlzLnN0YXRlLmZpbHRlciwgbWF0Y2hTdHlsZTogeyBiYWNrZ3JvdW5kQ29sb3I6ICd5ZWxsb3cnIH0gfSwgYCR7bGFiZWx9OiBgKSkpO1xuICAgICAgICAgICAgICAgIH0sIHZhbHVlUmVuZGVyZXI6IHJhdyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSAnY20tc3RyaW5nJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByYXcgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAnY20tbnVtYmVyJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocmF3ID09PSAndHJ1ZScgfHwgcmF3ID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAnY20ta2V5d29yZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEhpZ2hsaWdodCwgeyBzZWFyY2g6IHRoaXMuc3RhdGUuZmlsdGVyLCBtYXRjaFN0eWxlOiB7IGJhY2tncm91bmRDb2xvcjogJ3llbGxvdycgfSB9LCBgJHtyYXd9YCkpKTtcbiAgICAgICAgICAgICAgICB9LCBzaG91bGRFeHBhbmROb2RlOiAoa2V5UGF0aCwgZGF0YSwgbGV2ZWwpID0+IG1ldGFkYXRhICYmIG1ldGFkYXRhLmV4cGFuZGVkXG4gICAgICAgICAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICA6IGtleVBhdGhzLmpvaW4oJywnKS5pbmNsdWRlcyhrZXlQYXRoLmpvaW4oJywnKSkgfSkpKTtcbiAgICB9XG59XG4vLyBQcm92aWRlIGFuIGludmFsaWQgdGhlbWUgb2JqZWN0ICh0aGlzIGlzIG9uIHB1cnBvc2UhKSB0byBpbnZhbGlkYXRlIHRoZVxuLy8gcmVhY3QtanNvbi10cmVlJ3MgaW5saW5lIHN0eWxlcyB0aGF0IG92ZXJyaWRlIENvZGVNaXJyb3IgQ1NTIGNsYXNzZXNcbmNvbnN0IHRoZW1lID0ge1xuICAgIHNjaGVtZTogJ2p1cHl0ZXInLFxuICAgIGJhc2UwMDogJ2ludmFsaWQnLFxuICAgIGJhc2UwMTogJ2ludmFsaWQnLFxuICAgIGJhc2UwMjogJ2ludmFsaWQnLFxuICAgIGJhc2UwMzogJ2ludmFsaWQnLFxuICAgIGJhc2UwNDogJ2ludmFsaWQnLFxuICAgIGJhc2UwNTogJ2ludmFsaWQnLFxuICAgIGJhc2UwNjogJ2ludmFsaWQnLFxuICAgIGJhc2UwNzogJ2ludmFsaWQnLFxuICAgIGJhc2UwODogJ2ludmFsaWQnLFxuICAgIGJhc2UwOTogJ2ludmFsaWQnLFxuICAgIGJhc2UwQTogJ2ludmFsaWQnLFxuICAgIGJhc2UwQjogJ2ludmFsaWQnLFxuICAgIGJhc2UwQzogJ2ludmFsaWQnLFxuICAgIGJhc2UwRDogJ2ludmFsaWQnLFxuICAgIGJhc2UwRTogJ2ludmFsaWQnLFxuICAgIGJhc2UwRjogJ2ludmFsaWQnLFxuICAgIGF1dGhvcjogJ2ludmFsaWQnXG59O1xuZnVuY3Rpb24gb2JqZWN0SW5jbHVkZXMoZGF0YSwgcXVlcnkpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSkuaW5jbHVkZXMocXVlcnkpO1xufVxuZnVuY3Rpb24gZmlsdGVyUGF0aHMoZGF0YSwgcXVlcnksIHBhcmVudCA9IFsncm9vdCddKSB7XG4gICAgaWYgKEpTT05FeHQuaXNBcnJheShkYXRhKSkge1xuICAgICAgICByZXR1cm4gZGF0YS5yZWR1Y2UoKHJlc3VsdCwgaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtICYmIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJiBvYmplY3RJbmNsdWRlcyhpdGVtLCBxdWVyeSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAuLi5yZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIFtpbmRleCwgLi4ucGFyZW50XS5qb2luKCcsJyksXG4gICAgICAgICAgICAgICAgICAgIC4uLmZpbHRlclBhdGhzKGl0ZW0sIHF1ZXJ5LCBbaW5kZXgsIC4uLnBhcmVudF0pXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG4gICAgaWYgKEpTT05FeHQuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGRhdGEpLnJlZHVjZSgocmVzdWx0LCBrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBkYXRhW2tleV07XG4gICAgICAgICAgICBpZiAoaXRlbSAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgICAgIChrZXkuaW5jbHVkZXMocXVlcnkpIHx8IG9iamVjdEluY2x1ZGVzKGl0ZW0sIHF1ZXJ5KSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAuLi5yZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIFtrZXksIC4uLnBhcmVudF0uam9pbignLCcpLFxuICAgICAgICAgICAgICAgICAgICAuLi5maWx0ZXJQYXRocyhpdGVtLCBxdWVyeSwgW2tleSwgLi4ucGFyZW50XSlcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cbiAgICByZXR1cm4gW107XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21wb25lbnQuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUganNvbi1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgUHJpbnRpbmcgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQnO1xuLyoqXG4gKiBUaGUgQ1NTIGNsYXNzIHRvIGFkZCB0byB0aGUgSlNPTiBXaWRnZXQuXG4gKi9cbmNvbnN0IENTU19DTEFTUyA9ICdqcC1SZW5kZXJlZEpTT04nO1xuLyoqXG4gKiBUaGUgTUlNRSB0eXBlIGZvciBKU09OLlxuICovXG5leHBvcnQgY29uc3QgTUlNRV9UWVBFID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuLyoqXG4gKiBBIHJlbmRlcmVyIGZvciBKU09OIGRhdGEuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZW5kZXJlZEpTT04gZXh0ZW5kcyBXaWRnZXQge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyB3aWRnZXQgZm9yIHJlbmRlcmluZyBKU09OLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhDU1NfQ0xBU1MpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKCdDb2RlTWlycm9yJyk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2NtLXMtanVweXRlcicpO1xuICAgICAgICB0aGlzLl9taW1lVHlwZSA9IG9wdGlvbnMubWltZVR5cGU7XG4gICAgICAgIHRoaXMudHJhbnNsYXRvciA9IG9wdGlvbnMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICB9XG4gICAgW1ByaW50aW5nLnN5bWJvbF0oKSB7XG4gICAgICAgIHJldHVybiAoKSA9PiBQcmludGluZy5wcmludFdpZGdldCh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIEpTT04gaW50byB0aGlzIHdpZGdldCdzIG5vZGUuXG4gICAgICovXG4gICAgcmVuZGVyTW9kZWwobW9kZWwpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IChtb2RlbC5kYXRhW3RoaXMuX21pbWVUeXBlXSB8fCB7fSk7XG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gKG1vZGVsLm1ldGFkYXRhW3RoaXMuX21pbWVUeXBlXSB8fCB7fSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBSZWFjdERPTS5yZW5kZXIoUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIHsgZGF0YTogZGF0YSwgbWV0YWRhdGE6IG1ldGFkYXRhLCB0cmFuc2xhdG9yOiB0aGlzLnRyYW5zbGF0b3IgfSksIHRoaXMubm9kZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJlZm9yZSB0aGUgd2lkZ2V0IGlzIGRldGFjaGVkIGZyb20gdGhlIERPTS5cbiAgICAgKi9cbiAgICBvbkJlZm9yZURldGFjaChtc2cpIHtcbiAgICAgICAgLy8gVW5tb3VudCB0aGUgY29tcG9uZW50IHNvIGl0IGNhbiB0ZWFyIGRvd24uXG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy5ub2RlKTtcbiAgICB9XG59XG4vKipcbiAqIEEgbWltZSByZW5kZXJlciBmYWN0b3J5IGZvciBKU09OIGRhdGEuXG4gKi9cbmV4cG9ydCBjb25zdCByZW5kZXJlckZhY3RvcnkgPSB7XG4gICAgc2FmZTogdHJ1ZSxcbiAgICBtaW1lVHlwZXM6IFtNSU1FX1RZUEVdLFxuICAgIGNyZWF0ZVJlbmRlcmVyOiBvcHRpb25zID0+IG5ldyBSZW5kZXJlZEpTT04ob3B0aW9ucylcbn07XG5jb25zdCBleHRlbnNpb25zID0gW1xuICAgIHtcbiAgICAgICAgaWQ6ICdAanVweXRlcmxhYi9qc29uLWV4dGVuc2lvbjpmYWN0b3J5JyxcbiAgICAgICAgcmVuZGVyZXJGYWN0b3J5LFxuICAgICAgICByYW5rOiAwLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBkb2N1bWVudFdpZGdldEZhY3RvcnlPcHRpb25zOiB7XG4gICAgICAgICAgICBuYW1lOiAnSlNPTicsXG4gICAgICAgICAgICBwcmltYXJ5RmlsZVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGZpbGVUeXBlczogWydqc29uJywgJ25vdGVib29rJywgJ2dlb2pzb24nXSxcbiAgICAgICAgICAgIGRlZmF1bHRGb3I6IFsnanNvbiddXG4gICAgICAgIH1cbiAgICB9XG5dO1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=