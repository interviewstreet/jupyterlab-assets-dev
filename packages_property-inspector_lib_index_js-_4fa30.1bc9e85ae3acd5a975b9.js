(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_property-inspector_lib_index_js-_4fa30"],{

/***/ "../../packages/property-inspector/lib/index.js":
/*!******************************************************!*\
  !*** ../../packages/property-inspector/lib/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IPropertyInspectorProvider": () => (/* reexport safe */ _token__WEBPACK_IMPORTED_MODULE_4__.IPropertyInspectorProvider),
/* harmony export */   "SideBarPropertyInspectorProvider": () => (/* binding */ SideBarPropertyInspectorProvider)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./token */ "../../packages/property-inspector/lib/token.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module property-inspector
 */






/**
 * The implementation of the PropertyInspector.
 */
class PropertyInspectorProvider extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.Widget {
    /**
     * Construct a new Property Inspector.
     */
    constructor() {
        super();
        this._tracker = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.FocusTracker();
        this._inspectors = new Map();
        this.addClass('jp-PropertyInspector');
        this._tracker = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.FocusTracker();
        this._tracker.currentChanged.connect(this._onCurrentChanged, this);
    }
    /**
     * Register a widget in the property inspector provider.
     *
     * @param widget The owner widget to register.
     */
    register(widget) {
        if (this._inspectors.has(widget)) {
            throw new Error('Widget is already registered');
        }
        const inspector = new Private.PropertyInspector(widget);
        widget.disposed.connect(this._onWidgetDisposed, this);
        this._inspectors.set(widget, inspector);
        inspector.onAction.connect(this._onInspectorAction, this);
        this._tracker.add(widget);
        return inspector;
    }
    /**
     * The current widget being tracked by the inspector.
     */
    get currentWidget() {
        return this._tracker.currentWidget;
    }
    /**
     * Refresh the content for the current widget.
     */
    refresh() {
        const current = this._tracker.currentWidget;
        if (!current) {
            this.setContent(null);
            return;
        }
        const inspector = this._inspectors.get(current);
        if (inspector) {
            this.setContent(inspector.content);
        }
    }
    /**
     * Handle the disposal of a widget.
     */
    _onWidgetDisposed(sender) {
        const inspector = this._inspectors.get(sender);
        if (inspector) {
            inspector.dispose();
            this._inspectors.delete(sender);
        }
    }
    /**
     * Handle inspector actions.
     */
    _onInspectorAction(sender, action) {
        const owner = sender.owner;
        const current = this._tracker.currentWidget;
        switch (action) {
            case 'content':
                if (current === owner) {
                    this.setContent(sender.content);
                }
                break;
            case 'dispose':
                if (owner) {
                    this._tracker.remove(owner);
                    this._inspectors.delete(owner);
                }
                break;
            case 'show-panel':
                if (current === owner) {
                    this.showPanel();
                }
                break;
            default:
                throw new Error('Unsupported inspector action');
        }
    }
    /**
     * Handle a change to the current widget in the tracker.
     */
    _onCurrentChanged() {
        const current = this._tracker.currentWidget;
        if (current) {
            const inspector = this._inspectors.get(current);
            const content = inspector.content;
            this.setContent(content);
        }
        else {
            this.setContent(null);
        }
    }
}
/**
 * A class that adds a property inspector provider to the
 * JupyterLab sidebar.
 */
class SideBarPropertyInspectorProvider extends PropertyInspectorProvider {
    /**
     * Construct a new Side Bar Property Inspector.
     */
    constructor(labshell, placeholder, translator) {
        super();
        this._labshell = labshell;
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        const layout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.SingletonLayout());
        if (placeholder) {
            this._placeholder = placeholder;
        }
        else {
            const node = document.createElement('div');
            const content = document.createElement('div');
            content.textContent = this._trans.__('No properties to inspect.');
            content.className = 'jp-PropertyInspector-placeholderContent';
            node.appendChild(content);
            this._placeholder = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.Widget({ node });
            this._placeholder.addClass('jp-PropertyInspector-placeholder');
        }
        layout.widget = this._placeholder;
        labshell.currentChanged.connect(this._onShellCurrentChanged, this);
        this._onShellCurrentChanged();
    }
    /**
     * Set the content of the sidebar panel.
     */
    setContent(content) {
        const layout = this.layout;
        if (layout.widget) {
            layout.widget.removeClass('jp-PropertyInspector-content');
            layout.removeWidget(layout.widget);
        }
        if (!content) {
            content = this._placeholder;
        }
        content.addClass('jp-PropertyInspector-content');
        layout.widget = content;
    }
    /**
     * Show the sidebar panel.
     */
    showPanel() {
        this._labshell.activateById(this.id);
    }
    /**
     * Handle the case when the current widget is not in our tracker.
     */
    _onShellCurrentChanged() {
        const current = this.currentWidget;
        if (!current) {
            this.setContent(null);
            return;
        }
        const currentShell = this._labshell.currentWidget;
        if (currentShell === null || currentShell === void 0 ? void 0 : currentShell.node.contains(current.node)) {
            this.refresh();
        }
        else {
            this.setContent(null);
        }
    }
}
/**
 * A namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * An implementation of the property inspector used by the
     * property inspector provider.
     */
    class PropertyInspector {
        /**
         * Construct a new property inspector.
         */
        constructor(owner) {
            this._isDisposed = false;
            this._content = null;
            this._owner = null;
            this._onAction = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(this);
            this._owner = owner;
        }
        /**
         * The owner widget for the property inspector.
         */
        get owner() {
            return this._owner;
        }
        /**
         * The current content for the property inspector.
         */
        get content() {
            return this._content;
        }
        /**
         * Whether the property inspector is disposed.
         */
        get isDisposed() {
            return this._isDisposed;
        }
        /**
         * A signal used for actions related to the property inspector.
         */
        get onAction() {
            return this._onAction;
        }
        /**
         * Show the property inspector panel.
         */
        showPanel() {
            if (this._isDisposed) {
                return;
            }
            this._onAction.emit('show-panel');
        }
        /**
         * Render the property inspector content.
         */
        render(widget) {
            if (this._isDisposed) {
                return;
            }
            if (widget instanceof _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.Widget) {
                this._content = widget;
            }
            else {
                this._content = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget.create(widget);
            }
            this._onAction.emit('content');
        }
        /**
         * Dispose of the property inspector.
         */
        dispose() {
            if (this._isDisposed) {
                return;
            }
            this._isDisposed = true;
            this._content = null;
            this._owner = null;
            _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal.clearData(this);
        }
    }
    Private.PropertyInspector = PropertyInspector;
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/property-inspector/lib/token.js":
/*!******************************************************!*\
  !*** ../../packages/property-inspector/lib/token.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IPropertyInspectorProvider": () => (/* binding */ IPropertyInspectorProvider)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * The property inspector provider token.
 */
const IPropertyInspectorProvider = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/property-inspector:IPropertyInspectorProvider');
//# sourceMappingURL=token.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvcHJvcGVydHktaW5zcGVjdG9yL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvcHJvcGVydHktaW5zcGVjdG9yL2xpYi90b2tlbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNtRDtBQUNNO0FBQ2Q7QUFDNkI7QUFDbkI7QUFDZjtBQUN0QztBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsbURBQU07QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix5REFBWTtBQUN4QztBQUNBO0FBQ0EsNEJBQTRCLHlEQUFZO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsbUVBQWM7QUFDdEQ7QUFDQSwwQ0FBMEMsNERBQWU7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLG1EQUFNLEVBQUUsT0FBTztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHFEQUFNO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxtREFBTTtBQUN4QztBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msb0VBQWtCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwrREFBZ0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0IsaUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM1FBO0FBQ0E7QUFDMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ08sdUNBQXVDLG9EQUFLO0FBQ25ELGlDIiwiZmlsZSI6InBhY2thZ2VzX3Byb3BlcnR5LWluc3BlY3Rvcl9saWJfaW5kZXhfanMtXzRmYTMwLjFiYzllODVhZTNhY2Q1YTk3NWI5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgcHJvcGVydHktaW5zcGVjdG9yXG4gKi9cbmltcG9ydCB7IFJlYWN0V2lkZ2V0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG5pbXBvcnQgeyBGb2N1c1RyYWNrZXIsIFNpbmdsZXRvbkxheW91dCwgV2lkZ2V0IH0gZnJvbSAnQGx1bWluby93aWRnZXRzJztcbmltcG9ydCB7IElQcm9wZXJ0eUluc3BlY3RvclByb3ZpZGVyIH0gZnJvbSAnLi90b2tlbic7XG5leHBvcnQgeyBJUHJvcGVydHlJbnNwZWN0b3JQcm92aWRlciB9O1xuLyoqXG4gKiBUaGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIFByb3BlcnR5SW5zcGVjdG9yLlxuICovXG5jbGFzcyBQcm9wZXJ0eUluc3BlY3RvclByb3ZpZGVyIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgUHJvcGVydHkgSW5zcGVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl90cmFja2VyID0gbmV3IEZvY3VzVHJhY2tlcigpO1xuICAgICAgICB0aGlzLl9pbnNwZWN0b3JzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1Qcm9wZXJ0eUluc3BlY3RvcicpO1xuICAgICAgICB0aGlzLl90cmFja2VyID0gbmV3IEZvY3VzVHJhY2tlcigpO1xuICAgICAgICB0aGlzLl90cmFja2VyLmN1cnJlbnRDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25DdXJyZW50Q2hhbmdlZCwgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGEgd2lkZ2V0IGluIHRoZSBwcm9wZXJ0eSBpbnNwZWN0b3IgcHJvdmlkZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IFRoZSBvd25lciB3aWRnZXQgdG8gcmVnaXN0ZXIuXG4gICAgICovXG4gICAgcmVnaXN0ZXIod2lkZ2V0KSB7XG4gICAgICAgIGlmICh0aGlzLl9pbnNwZWN0b3JzLmhhcyh3aWRnZXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dpZGdldCBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbnNwZWN0b3IgPSBuZXcgUHJpdmF0ZS5Qcm9wZXJ0eUluc3BlY3Rvcih3aWRnZXQpO1xuICAgICAgICB3aWRnZXQuZGlzcG9zZWQuY29ubmVjdCh0aGlzLl9vbldpZGdldERpc3Bvc2VkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5faW5zcGVjdG9ycy5zZXQod2lkZ2V0LCBpbnNwZWN0b3IpO1xuICAgICAgICBpbnNwZWN0b3Iub25BY3Rpb24uY29ubmVjdCh0aGlzLl9vbkluc3BlY3RvckFjdGlvbiwgdGhpcyk7XG4gICAgICAgIHRoaXMuX3RyYWNrZXIuYWRkKHdpZGdldCk7XG4gICAgICAgIHJldHVybiBpbnNwZWN0b3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IHdpZGdldCBiZWluZyB0cmFja2VkIGJ5IHRoZSBpbnNwZWN0b3IuXG4gICAgICovXG4gICAgZ2V0IGN1cnJlbnRXaWRnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZnJlc2ggdGhlIGNvbnRlbnQgZm9yIHRoZSBjdXJyZW50IHdpZGdldC5cbiAgICAgKi9cbiAgICByZWZyZXNoKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5fdHJhY2tlci5jdXJyZW50V2lkZ2V0O1xuICAgICAgICBpZiAoIWN1cnJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudChudWxsKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbnNwZWN0b3IgPSB0aGlzLl9pbnNwZWN0b3JzLmdldChjdXJyZW50KTtcbiAgICAgICAgaWYgKGluc3BlY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5zZXRDb250ZW50KGluc3BlY3Rvci5jb250ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGRpc3Bvc2FsIG9mIGEgd2lkZ2V0LlxuICAgICAqL1xuICAgIF9vbldpZGdldERpc3Bvc2VkKHNlbmRlcikge1xuICAgICAgICBjb25zdCBpbnNwZWN0b3IgPSB0aGlzLl9pbnNwZWN0b3JzLmdldChzZW5kZXIpO1xuICAgICAgICBpZiAoaW5zcGVjdG9yKSB7XG4gICAgICAgICAgICBpbnNwZWN0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5faW5zcGVjdG9ycy5kZWxldGUoc2VuZGVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgaW5zcGVjdG9yIGFjdGlvbnMuXG4gICAgICovXG4gICAgX29uSW5zcGVjdG9yQWN0aW9uKHNlbmRlciwgYWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IG93bmVyID0gc2VuZGVyLm93bmVyO1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5fdHJhY2tlci5jdXJyZW50V2lkZ2V0O1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT09IG93bmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudChzZW5kZXIuY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGlzcG9zZSc6XG4gICAgICAgICAgICAgICAgaWYgKG93bmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyYWNrZXIucmVtb3ZlKG93bmVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5zcGVjdG9ycy5kZWxldGUob3duZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3Nob3ctcGFuZWwnOlxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50ID09PSBvd25lcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQYW5lbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBpbnNwZWN0b3IgYWN0aW9uJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBjdXJyZW50IHdpZGdldCBpbiB0aGUgdHJhY2tlci5cbiAgICAgKi9cbiAgICBfb25DdXJyZW50Q2hhbmdlZCgpIHtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHRoaXMuX3RyYWNrZXIuY3VycmVudFdpZGdldDtcbiAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGluc3BlY3RvciA9IHRoaXMuX2luc3BlY3RvcnMuZ2V0KGN1cnJlbnQpO1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGluc3BlY3Rvci5jb250ZW50O1xuICAgICAgICAgICAgdGhpcy5zZXRDb250ZW50KGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRDb250ZW50KG51bGwpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgYWRkcyBhIHByb3BlcnR5IGluc3BlY3RvciBwcm92aWRlciB0byB0aGVcbiAqIEp1cHl0ZXJMYWIgc2lkZWJhci5cbiAqL1xuZXhwb3J0IGNsYXNzIFNpZGVCYXJQcm9wZXJ0eUluc3BlY3RvclByb3ZpZGVyIGV4dGVuZHMgUHJvcGVydHlJbnNwZWN0b3JQcm92aWRlciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IFNpZGUgQmFyIFByb3BlcnR5IEluc3BlY3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihsYWJzaGVsbCwgcGxhY2Vob2xkZXIsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fbGFic2hlbGwgPSBsYWJzaGVsbDtcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgdGhpcy5fdHJhbnMgPSB0aGlzLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5sYXlvdXQgPSBuZXcgU2luZ2xldG9uTGF5b3V0KCkpO1xuICAgICAgICBpZiAocGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb250ZW50LnRleHRDb250ZW50ID0gdGhpcy5fdHJhbnMuX18oJ05vIHByb3BlcnRpZXMgdG8gaW5zcGVjdC4nKTtcbiAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NOYW1lID0gJ2pwLVByb3BlcnR5SW5zcGVjdG9yLXBsYWNlaG9sZGVyQ29udGVudCc7XG4gICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIgPSBuZXcgV2lkZ2V0KHsgbm9kZSB9KTtcbiAgICAgICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyLmFkZENsYXNzKCdqcC1Qcm9wZXJ0eUluc3BlY3Rvci1wbGFjZWhvbGRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGxheW91dC53aWRnZXQgPSB0aGlzLl9wbGFjZWhvbGRlcjtcbiAgICAgICAgbGFic2hlbGwuY3VycmVudENoYW5nZWQuY29ubmVjdCh0aGlzLl9vblNoZWxsQ3VycmVudENoYW5nZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLl9vblNoZWxsQ3VycmVudENoYW5nZWQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjb250ZW50IG9mIHRoZSBzaWRlYmFyIHBhbmVsLlxuICAgICAqL1xuICAgIHNldENvbnRlbnQoY29udGVudCkge1xuICAgICAgICBjb25zdCBsYXlvdXQgPSB0aGlzLmxheW91dDtcbiAgICAgICAgaWYgKGxheW91dC53aWRnZXQpIHtcbiAgICAgICAgICAgIGxheW91dC53aWRnZXQucmVtb3ZlQ2xhc3MoJ2pwLVByb3BlcnR5SW5zcGVjdG9yLWNvbnRlbnQnKTtcbiAgICAgICAgICAgIGxheW91dC5yZW1vdmVXaWRnZXQobGF5b3V0LndpZGdldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb250ZW50KSB7XG4gICAgICAgICAgICBjb250ZW50ID0gdGhpcy5fcGxhY2Vob2xkZXI7XG4gICAgICAgIH1cbiAgICAgICAgY29udGVudC5hZGRDbGFzcygnanAtUHJvcGVydHlJbnNwZWN0b3ItY29udGVudCcpO1xuICAgICAgICBsYXlvdXQud2lkZ2V0ID0gY29udGVudDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvdyB0aGUgc2lkZWJhciBwYW5lbC5cbiAgICAgKi9cbiAgICBzaG93UGFuZWwoKSB7XG4gICAgICAgIHRoaXMuX2xhYnNoZWxsLmFjdGl2YXRlQnlJZCh0aGlzLmlkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBjYXNlIHdoZW4gdGhlIGN1cnJlbnQgd2lkZ2V0IGlzIG5vdCBpbiBvdXIgdHJhY2tlci5cbiAgICAgKi9cbiAgICBfb25TaGVsbEN1cnJlbnRDaGFuZ2VkKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5jdXJyZW50V2lkZ2V0O1xuICAgICAgICBpZiAoIWN1cnJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudChudWxsKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjdXJyZW50U2hlbGwgPSB0aGlzLl9sYWJzaGVsbC5jdXJyZW50V2lkZ2V0O1xuICAgICAgICBpZiAoY3VycmVudFNoZWxsID09PSBudWxsIHx8IGN1cnJlbnRTaGVsbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VycmVudFNoZWxsLm5vZGUuY29udGFpbnMoY3VycmVudC5ub2RlKSkge1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldENvbnRlbnQobnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBtb2R1bGUgcHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEFuIGltcGxlbWVudGF0aW9uIG9mIHRoZSBwcm9wZXJ0eSBpbnNwZWN0b3IgdXNlZCBieSB0aGVcbiAgICAgKiBwcm9wZXJ0eSBpbnNwZWN0b3IgcHJvdmlkZXIuXG4gICAgICovXG4gICAgY2xhc3MgUHJvcGVydHlJbnNwZWN0b3Ige1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29uc3RydWN0IGEgbmV3IHByb3BlcnR5IGluc3BlY3Rvci5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKG93bmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9jb250ZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX293bmVyID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX29uQWN0aW9uID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX293bmVyID0gb3duZXI7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvd25lciB3aWRnZXQgZm9yIHRoZSBwcm9wZXJ0eSBpbnNwZWN0b3IuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgb3duZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb3duZXI7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjdXJyZW50IGNvbnRlbnQgZm9yIHRoZSBwcm9wZXJ0eSBpbnNwZWN0b3IuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgY29udGVudCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGV0aGVyIHRoZSBwcm9wZXJ0eSBpbnNwZWN0b3IgaXMgZGlzcG9zZWQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc0Rpc3Bvc2VkO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIHNpZ25hbCB1c2VkIGZvciBhY3Rpb25zIHJlbGF0ZWQgdG8gdGhlIHByb3BlcnR5IGluc3BlY3Rvci5cbiAgICAgICAgICovXG4gICAgICAgIGdldCBvbkFjdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vbkFjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogU2hvdyB0aGUgcHJvcGVydHkgaW5zcGVjdG9yIHBhbmVsLlxuICAgICAgICAgKi9cbiAgICAgICAgc2hvd1BhbmVsKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9vbkFjdGlvbi5lbWl0KCdzaG93LXBhbmVsJyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbmRlciB0aGUgcHJvcGVydHkgaW5zcGVjdG9yIGNvbnRlbnQuXG4gICAgICAgICAqL1xuICAgICAgICByZW5kZXIod2lkZ2V0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3aWRnZXQgaW5zdGFuY2VvZiBXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50ID0gd2lkZ2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGVudCA9IFJlYWN0V2lkZ2V0LmNyZWF0ZSh3aWRnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fb25BY3Rpb24uZW1pdCgnY29udGVudCcpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNwb3NlIG9mIHRoZSBwcm9wZXJ0eSBpbnNwZWN0b3IuXG4gICAgICAgICAqL1xuICAgICAgICBkaXNwb3NlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fb3duZXIgPSBudWxsO1xuICAgICAgICAgICAgU2lnbmFsLmNsZWFyRGF0YSh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBQcml2YXRlLlByb3BlcnR5SW5zcGVjdG9yID0gUHJvcGVydHlJbnNwZWN0b3I7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuLyoqXG4gKiBUaGUgcHJvcGVydHkgaW5zcGVjdG9yIHByb3ZpZGVyIHRva2VuLlxuICovXG5leHBvcnQgY29uc3QgSVByb3BlcnR5SW5zcGVjdG9yUHJvdmlkZXIgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL3Byb3BlcnR5LWluc3BlY3RvcjpJUHJvcGVydHlJbnNwZWN0b3JQcm92aWRlcicpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9rZW4uanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==