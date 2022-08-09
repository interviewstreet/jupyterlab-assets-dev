(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_running_lib_index_js-_79e10"],{

/***/ "../../packages/running/lib/index.js":
/*!*******************************************!*\
  !*** ../../packages/running/lib/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IRunningSessionManagers": () => (/* binding */ IRunningSessionManagers),
/* harmony export */   "RunningSessionManagers": () => (/* binding */ RunningSessionManagers),
/* harmony export */   "RunningSessions": () => (/* binding */ RunningSessions)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module running
 */






/**
 * The class name added to a running widget.
 */
const RUNNING_CLASS = 'jp-RunningSessions';
/**
 * The class name added to a running widget header.
 */
const HEADER_CLASS = 'jp-RunningSessions-header';
/**
 * The class name added to the running terminal sessions section.
 */
const SECTION_CLASS = 'jp-RunningSessions-section';
/**
 * The class name added to the running sessions section header.
 */
const SECTION_HEADER_CLASS = 'jp-RunningSessions-sectionHeader';
/**
 * The class name added to a section container.
 */
const CONTAINER_CLASS = 'jp-RunningSessions-sectionContainer';
/**
 * The class name added to the running kernel sessions section list.
 */
const LIST_CLASS = 'jp-RunningSessions-sectionList';
/**
 * The class name added to the running sessions items.
 */
const ITEM_CLASS = 'jp-RunningSessions-item';
/**
 * The class name added to a running session item label.
 */
const ITEM_LABEL_CLASS = 'jp-RunningSessions-itemLabel';
/**
 * The class name added to a running session item detail.
 */
const ITEM_DETAIL_CLASS = 'jp-RunningSessions-itemDetail';
/**
 * The class name added to a running session item shutdown button.
 */
const SHUTDOWN_BUTTON_CLASS = 'jp-RunningSessions-itemShutdown';
/**
 * The class name added to a running session item shutdown button.
 */
const SHUTDOWN_ALL_BUTTON_CLASS = 'jp-RunningSessions-shutdownAll';
/* tslint:disable */
/**
 * The running sessions token.
 */
const IRunningSessionManagers = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.Token('@jupyterlab/running:IRunningSessionManagers');
class RunningSessionManagers {
    constructor() {
        this._managers = [];
    }
    /**
     * Add a running item manager.
     *
     * @param manager - The running item manager.
     *
     */
    add(manager) {
        this._managers.push(manager);
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_4__.DisposableDelegate(() => {
            const i = this._managers.indexOf(manager);
            if (i > -1) {
                this._managers.splice(i, 1);
            }
        });
    }
    /**
     * Return an iterator of launcher items.
     */
    items() {
        return this._managers;
    }
}
function Item(props) {
    var _a;
    const { runningItem } = props;
    const icon = runningItem.icon();
    const detail = (_a = runningItem.detail) === null || _a === void 0 ? void 0 : _a.call(runningItem);
    const translator = props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
    const trans = translator.load('jupyterlab');
    const shutdownLabel = props.shutdownLabel || trans.__('Shut Down');
    const shutdownItemIcon = props.shutdownItemIcon || _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.closeIcon;
    return (react__WEBPACK_IMPORTED_MODULE_5__.createElement("li", { className: ITEM_CLASS },
        react__WEBPACK_IMPORTED_MODULE_5__.createElement(icon.react, { tag: "span", stylesheet: "runningItem" }),
        react__WEBPACK_IMPORTED_MODULE_5__.createElement("span", { className: ITEM_LABEL_CLASS, title: runningItem.labelTitle ? runningItem.labelTitle() : '', onClick: () => runningItem.open() }, runningItem.label()),
        detail && react__WEBPACK_IMPORTED_MODULE_5__.createElement("span", { className: ITEM_DETAIL_CLASS }, detail),
        react__WEBPACK_IMPORTED_MODULE_5__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButtonComponent, { className: SHUTDOWN_BUTTON_CLASS, icon: shutdownItemIcon, onClick: () => runningItem.shutdown(), tooltip: shutdownLabel })));
}
function ListView(props) {
    return (react__WEBPACK_IMPORTED_MODULE_5__.createElement("ul", { className: LIST_CLASS }, props.runningItems.map((item, i) => (react__WEBPACK_IMPORTED_MODULE_5__.createElement(Item, { key: i, runningItem: item, shutdownLabel: props.shutdownLabel, shutdownItemIcon: props.shutdownItemIcon, translator: props.translator })))));
}
function List(props) {
    return (react__WEBPACK_IMPORTED_MODULE_5__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.UseSignal, { signal: props.manager.runningChanged }, () => (react__WEBPACK_IMPORTED_MODULE_5__.createElement(ListView, { runningItems: props.manager.running(), shutdownLabel: props.shutdownLabel, shutdownAllLabel: props.shutdownAllLabel, shutdownItemIcon: props.manager.shutdownItemIcon, translator: props.translator }))));
}
/**
 * The Section component contains the shared look and feel for an interactive
 * list of kernels and sessions.
 *
 * It is specialized for each based on its props.
 */
function Section(props) {
    const translator = props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
    const trans = translator.load('jupyterlab');
    const shutdownAllLabel = props.manager.shutdownAllLabel || trans.__('Shut Down All');
    const shutdownTitle = `${shutdownAllLabel}?`;
    const shutdownAllConfirmationText = props.manager.shutdownAllConfirmationText ||
        `${shutdownAllLabel} ${props.manager.name}`;
    function onShutdown() {
        void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
            title: shutdownTitle,
            body: shutdownAllConfirmationText,
            buttons: [
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: trans.__('Cancel') }),
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: shutdownAllLabel })
            ]
        }).then(result => {
            if (result.button.accept) {
                props.manager.shutdownAll();
            }
        });
    }
    return (react__WEBPACK_IMPORTED_MODULE_5__.createElement("div", { className: SECTION_CLASS },
        react__WEBPACK_IMPORTED_MODULE_5__.createElement(react__WEBPACK_IMPORTED_MODULE_5__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_5__.createElement("div", { className: `${SECTION_HEADER_CLASS} jp-stack-panel-header` },
                react__WEBPACK_IMPORTED_MODULE_5__.createElement("h2", null, props.manager.name),
                react__WEBPACK_IMPORTED_MODULE_5__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.UseSignal, { signal: props.manager.runningChanged }, () => {
                    const disabled = props.manager.running().length === 0;
                    return (react__WEBPACK_IMPORTED_MODULE_5__.createElement("button", { className: `${SHUTDOWN_ALL_BUTTON_CLASS} jp-mod-styled ${disabled && 'jp-mod-disabled'}`, disabled: disabled, onClick: onShutdown }, shutdownAllLabel));
                })),
            react__WEBPACK_IMPORTED_MODULE_5__.createElement("div", { className: CONTAINER_CLASS },
                react__WEBPACK_IMPORTED_MODULE_5__.createElement(List, { manager: props.manager, shutdownLabel: props.manager.shutdownLabel, shutdownAllLabel: shutdownAllLabel, translator: props.translator })))));
}
function RunningSessionsComponent(props) {
    const translator = props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
    const trans = translator.load('jupyterlab');
    return (react__WEBPACK_IMPORTED_MODULE_5__.createElement(react__WEBPACK_IMPORTED_MODULE_5__.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_5__.createElement("div", { className: HEADER_CLASS },
            react__WEBPACK_IMPORTED_MODULE_5__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButtonComponent, { tooltip: trans.__('Refresh List'), icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.refreshIcon, onClick: () => props.managers.items().forEach(manager => manager.refreshRunning()) })),
        props.managers.items().map(manager => (react__WEBPACK_IMPORTED_MODULE_5__.createElement(Section, { key: manager.name, manager: manager, translator: props.translator })))));
}
/**
 * A class that exposes the running terminal and kernel sessions.
 */
class RunningSessions extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget {
    /**
     * Construct a new running widget.
     */
    constructor(managers, translator) {
        super();
        this.managers = managers;
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        // this can't be in the react element, because then it would be too nested
        this.addClass(RUNNING_CLASS);
    }
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_5__.createElement(RunningSessionsComponent, { managers: this.managers, translator: this.translator }));
    }
}
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvcnVubmluZy9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzBHO0FBQ2pEO0FBQ1U7QUFDekI7QUFDYztBQUN6QjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxvQ0FBb0Msb0RBQUs7QUFDekM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGtFQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QjtBQUNBO0FBQ0EsMkNBQTJDLG1FQUFjO0FBQ3pEO0FBQ0E7QUFDQSx1REFBdUQsZ0VBQVM7QUFDaEUsWUFBWSxnREFBbUIsUUFBUSx3QkFBd0I7QUFDL0QsUUFBUSxnREFBbUIsY0FBYyx5Q0FBeUM7QUFDbEYsUUFBUSxnREFBbUIsVUFBVSxnSUFBZ0k7QUFDckssa0JBQWtCLGdEQUFtQixVQUFVLCtCQUErQjtBQUM5RSxRQUFRLGdEQUFtQixDQUFDLHdFQUFzQixHQUFHLDBIQUEwSDtBQUMvSztBQUNBO0FBQ0EsWUFBWSxnREFBbUIsUUFBUSx3QkFBd0IsdUNBQXVDLGdEQUFtQixRQUFRLHdJQUF3STtBQUN6UTtBQUNBO0FBQ0EsWUFBWSxnREFBbUIsQ0FBQywyREFBUyxHQUFHLHVDQUF1QyxTQUFTLGdEQUFtQixZQUFZLHNNQUFzTTtBQUNqVTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLG1FQUFjO0FBQ3pEO0FBQ0E7QUFDQSw2QkFBNkIsaUJBQWlCO0FBQzlDO0FBQ0EsV0FBVyxpQkFBaUIsR0FBRyxtQkFBbUI7QUFDbEQ7QUFDQSxhQUFhLGdFQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixxRUFBbUIsRUFBRSw0QkFBNEI7QUFDakUsZ0JBQWdCLG1FQUFpQixFQUFFLDBCQUEwQjtBQUM3RDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxZQUFZLGdEQUFtQixTQUFTLDJCQUEyQjtBQUNuRSxRQUFRLGdEQUFtQixDQUFDLDJDQUFjO0FBQzFDLFlBQVksZ0RBQW1CLFNBQVMsZUFBZSxxQkFBcUIseUJBQXlCO0FBQ3JHLGdCQUFnQixnREFBbUI7QUFDbkMsZ0JBQWdCLGdEQUFtQixDQUFDLDJEQUFTLEdBQUcsdUNBQXVDO0FBQ3ZGO0FBQ0EsNEJBQTRCLGdEQUFtQixZQUFZLGVBQWUsMEJBQTBCLGlCQUFpQiw4QkFBOEIsNENBQTRDO0FBQy9MLGlCQUFpQjtBQUNqQixZQUFZLGdEQUFtQixTQUFTLDZCQUE2QjtBQUNyRSxnQkFBZ0IsZ0RBQW1CLFFBQVEsdUlBQXVJO0FBQ2xMO0FBQ0E7QUFDQSwyQ0FBMkMsbUVBQWM7QUFDekQ7QUFDQSxZQUFZLGdEQUFtQixDQUFDLDJDQUFjO0FBQzlDLFFBQVEsZ0RBQW1CLFNBQVMsMEJBQTBCO0FBQzlELFlBQVksZ0RBQW1CLENBQUMsd0VBQXNCLEdBQUcsMENBQTBDLGtFQUFXLHNGQUFzRjtBQUNwTSwrQ0FBK0MsZ0RBQW1CLFdBQVcsb0VBQW9FO0FBQ2pKO0FBQ0E7QUFDQTtBQUNBO0FBQ08sOEJBQThCLDZEQUFXO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxtRUFBYztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixnREFBbUIsNEJBQTRCLHVEQUF1RDtBQUN0SDtBQUNBO0FBQ0EsaUMiLCJmaWxlIjoicGFja2FnZXNfcnVubmluZ19saWJfaW5kZXhfanMtXzc5ZTEwLjA1MzJhNzc5YjhlOTViMDdmODAyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgcnVubmluZ1xuICovXG5pbXBvcnQgeyBEaWFsb2csIFJlYWN0V2lkZ2V0LCBzaG93RGlhbG9nLCBUb29sYmFyQnV0dG9uQ29tcG9uZW50LCBVc2VTaWduYWwgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGNsb3NlSWNvbiwgcmVmcmVzaEljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgRGlzcG9zYWJsZURlbGVnYXRlIH0gZnJvbSAnQGx1bWluby9kaXNwb3NhYmxlJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gYSBydW5uaW5nIHdpZGdldC5cbiAqL1xuY29uc3QgUlVOTklOR19DTEFTUyA9ICdqcC1SdW5uaW5nU2Vzc2lvbnMnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBhIHJ1bm5pbmcgd2lkZ2V0IGhlYWRlci5cbiAqL1xuY29uc3QgSEVBREVSX0NMQVNTID0gJ2pwLVJ1bm5pbmdTZXNzaW9ucy1oZWFkZXInO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byB0aGUgcnVubmluZyB0ZXJtaW5hbCBzZXNzaW9ucyBzZWN0aW9uLlxuICovXG5jb25zdCBTRUNUSU9OX0NMQVNTID0gJ2pwLVJ1bm5pbmdTZXNzaW9ucy1zZWN0aW9uJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIHJ1bm5pbmcgc2Vzc2lvbnMgc2VjdGlvbiBoZWFkZXIuXG4gKi9cbmNvbnN0IFNFQ1RJT05fSEVBREVSX0NMQVNTID0gJ2pwLVJ1bm5pbmdTZXNzaW9ucy1zZWN0aW9uSGVhZGVyJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gYSBzZWN0aW9uIGNvbnRhaW5lci5cbiAqL1xuY29uc3QgQ09OVEFJTkVSX0NMQVNTID0gJ2pwLVJ1bm5pbmdTZXNzaW9ucy1zZWN0aW9uQ29udGFpbmVyJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIHJ1bm5pbmcga2VybmVsIHNlc3Npb25zIHNlY3Rpb24gbGlzdC5cbiAqL1xuY29uc3QgTElTVF9DTEFTUyA9ICdqcC1SdW5uaW5nU2Vzc2lvbnMtc2VjdGlvbkxpc3QnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byB0aGUgcnVubmluZyBzZXNzaW9ucyBpdGVtcy5cbiAqL1xuY29uc3QgSVRFTV9DTEFTUyA9ICdqcC1SdW5uaW5nU2Vzc2lvbnMtaXRlbSc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGEgcnVubmluZyBzZXNzaW9uIGl0ZW0gbGFiZWwuXG4gKi9cbmNvbnN0IElURU1fTEFCRUxfQ0xBU1MgPSAnanAtUnVubmluZ1Nlc3Npb25zLWl0ZW1MYWJlbCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGEgcnVubmluZyBzZXNzaW9uIGl0ZW0gZGV0YWlsLlxuICovXG5jb25zdCBJVEVNX0RFVEFJTF9DTEFTUyA9ICdqcC1SdW5uaW5nU2Vzc2lvbnMtaXRlbURldGFpbCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGEgcnVubmluZyBzZXNzaW9uIGl0ZW0gc2h1dGRvd24gYnV0dG9uLlxuICovXG5jb25zdCBTSFVURE9XTl9CVVRUT05fQ0xBU1MgPSAnanAtUnVubmluZ1Nlc3Npb25zLWl0ZW1TaHV0ZG93bic7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGEgcnVubmluZyBzZXNzaW9uIGl0ZW0gc2h1dGRvd24gYnV0dG9uLlxuICovXG5jb25zdCBTSFVURE9XTl9BTExfQlVUVE9OX0NMQVNTID0gJ2pwLVJ1bm5pbmdTZXNzaW9ucy1zaHV0ZG93bkFsbCc7XG4vKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLyoqXG4gKiBUaGUgcnVubmluZyBzZXNzaW9ucyB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IElSdW5uaW5nU2Vzc2lvbk1hbmFnZXJzID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi9ydW5uaW5nOklSdW5uaW5nU2Vzc2lvbk1hbmFnZXJzJyk7XG5leHBvcnQgY2xhc3MgUnVubmluZ1Nlc3Npb25NYW5hZ2VycyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZXJzID0gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIHJ1bm5pbmcgaXRlbSBtYW5hZ2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hbmFnZXIgLSBUaGUgcnVubmluZyBpdGVtIG1hbmFnZXIuXG4gICAgICpcbiAgICAgKi9cbiAgICBhZGQobWFuYWdlcikge1xuICAgICAgICB0aGlzLl9tYW5hZ2Vycy5wdXNoKG1hbmFnZXIpO1xuICAgICAgICByZXR1cm4gbmV3IERpc3Bvc2FibGVEZWxlZ2F0ZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpID0gdGhpcy5fbWFuYWdlcnMuaW5kZXhPZihtYW5hZ2VyKTtcbiAgICAgICAgICAgIGlmIChpID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYW5hZ2Vycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYW4gaXRlcmF0b3Igb2YgbGF1bmNoZXIgaXRlbXMuXG4gICAgICovXG4gICAgaXRlbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYW5hZ2VycztcbiAgICB9XG59XG5mdW5jdGlvbiBJdGVtKHByb3BzKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IHsgcnVubmluZ0l0ZW0gfSA9IHByb3BzO1xuICAgIGNvbnN0IGljb24gPSBydW5uaW5nSXRlbS5pY29uKCk7XG4gICAgY29uc3QgZGV0YWlsID0gKF9hID0gcnVubmluZ0l0ZW0uZGV0YWlsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChydW5uaW5nSXRlbSk7XG4gICAgY29uc3QgdHJhbnNsYXRvciA9IHByb3BzLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICBjb25zdCBzaHV0ZG93bkxhYmVsID0gcHJvcHMuc2h1dGRvd25MYWJlbCB8fCB0cmFucy5fXygnU2h1dCBEb3duJyk7XG4gICAgY29uc3Qgc2h1dGRvd25JdGVtSWNvbiA9IHByb3BzLnNodXRkb3duSXRlbUljb24gfHwgY2xvc2VJY29uO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBJVEVNX0NMQVNTIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoaWNvbi5yZWFjdCwgeyB0YWc6IFwic3BhblwiLCBzdHlsZXNoZWV0OiBcInJ1bm5pbmdJdGVtXCIgfSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBJVEVNX0xBQkVMX0NMQVNTLCB0aXRsZTogcnVubmluZ0l0ZW0ubGFiZWxUaXRsZSA/IHJ1bm5pbmdJdGVtLmxhYmVsVGl0bGUoKSA6ICcnLCBvbkNsaWNrOiAoKSA9PiBydW5uaW5nSXRlbS5vcGVuKCkgfSwgcnVubmluZ0l0ZW0ubGFiZWwoKSksXG4gICAgICAgIGRldGFpbCAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogSVRFTV9ERVRBSUxfQ0xBU1MgfSwgZGV0YWlsKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUb29sYmFyQnV0dG9uQ29tcG9uZW50LCB7IGNsYXNzTmFtZTogU0hVVERPV05fQlVUVE9OX0NMQVNTLCBpY29uOiBzaHV0ZG93bkl0ZW1JY29uLCBvbkNsaWNrOiAoKSA9PiBydW5uaW5nSXRlbS5zaHV0ZG93bigpLCB0b29sdGlwOiBzaHV0ZG93bkxhYmVsIH0pKSk7XG59XG5mdW5jdGlvbiBMaXN0Vmlldyhwcm9wcykge1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHsgY2xhc3NOYW1lOiBMSVNUX0NMQVNTIH0sIHByb3BzLnJ1bm5pbmdJdGVtcy5tYXAoKGl0ZW0sIGkpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KEl0ZW0sIHsga2V5OiBpLCBydW5uaW5nSXRlbTogaXRlbSwgc2h1dGRvd25MYWJlbDogcHJvcHMuc2h1dGRvd25MYWJlbCwgc2h1dGRvd25JdGVtSWNvbjogcHJvcHMuc2h1dGRvd25JdGVtSWNvbiwgdHJhbnNsYXRvcjogcHJvcHMudHJhbnNsYXRvciB9KSkpKSk7XG59XG5mdW5jdGlvbiBMaXN0KHByb3BzKSB7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFVzZVNpZ25hbCwgeyBzaWduYWw6IHByb3BzLm1hbmFnZXIucnVubmluZ0NoYW5nZWQgfSwgKCkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGlzdFZpZXcsIHsgcnVubmluZ0l0ZW1zOiBwcm9wcy5tYW5hZ2VyLnJ1bm5pbmcoKSwgc2h1dGRvd25MYWJlbDogcHJvcHMuc2h1dGRvd25MYWJlbCwgc2h1dGRvd25BbGxMYWJlbDogcHJvcHMuc2h1dGRvd25BbGxMYWJlbCwgc2h1dGRvd25JdGVtSWNvbjogcHJvcHMubWFuYWdlci5zaHV0ZG93bkl0ZW1JY29uLCB0cmFuc2xhdG9yOiBwcm9wcy50cmFuc2xhdG9yIH0pKSkpO1xufVxuLyoqXG4gKiBUaGUgU2VjdGlvbiBjb21wb25lbnQgY29udGFpbnMgdGhlIHNoYXJlZCBsb29rIGFuZCBmZWVsIGZvciBhbiBpbnRlcmFjdGl2ZVxuICogbGlzdCBvZiBrZXJuZWxzIGFuZCBzZXNzaW9ucy5cbiAqXG4gKiBJdCBpcyBzcGVjaWFsaXplZCBmb3IgZWFjaCBiYXNlZCBvbiBpdHMgcHJvcHMuXG4gKi9cbmZ1bmN0aW9uIFNlY3Rpb24ocHJvcHMpIHtcbiAgICBjb25zdCB0cmFuc2xhdG9yID0gcHJvcHMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgIGNvbnN0IHNodXRkb3duQWxsTGFiZWwgPSBwcm9wcy5tYW5hZ2VyLnNodXRkb3duQWxsTGFiZWwgfHwgdHJhbnMuX18oJ1NodXQgRG93biBBbGwnKTtcbiAgICBjb25zdCBzaHV0ZG93blRpdGxlID0gYCR7c2h1dGRvd25BbGxMYWJlbH0/YDtcbiAgICBjb25zdCBzaHV0ZG93bkFsbENvbmZpcm1hdGlvblRleHQgPSBwcm9wcy5tYW5hZ2VyLnNodXRkb3duQWxsQ29uZmlybWF0aW9uVGV4dCB8fFxuICAgICAgICBgJHtzaHV0ZG93bkFsbExhYmVsfSAke3Byb3BzLm1hbmFnZXIubmFtZX1gO1xuICAgIGZ1bmN0aW9uIG9uU2h1dGRvd24oKSB7XG4gICAgICAgIHZvaWQgc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICB0aXRsZTogc2h1dGRvd25UaXRsZSxcbiAgICAgICAgICAgIGJvZHk6IHNodXRkb3duQWxsQ29uZmlybWF0aW9uVGV4dCxcbiAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICBEaWFsb2cuY2FuY2VsQnV0dG9uKHsgbGFiZWw6IHRyYW5zLl9fKCdDYW5jZWwnKSB9KSxcbiAgICAgICAgICAgICAgICBEaWFsb2cud2FybkJ1dHRvbih7IGxhYmVsOiBzaHV0ZG93bkFsbExhYmVsIH0pXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuYnV0dG9uLmFjY2VwdCkge1xuICAgICAgICAgICAgICAgIHByb3BzLm1hbmFnZXIuc2h1dGRvd25BbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogU0VDVElPTl9DTEFTUyB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogYCR7U0VDVElPTl9IRUFERVJfQ0xBU1N9IGpwLXN0YWNrLXBhbmVsLWhlYWRlcmAgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDJcIiwgbnVsbCwgcHJvcHMubWFuYWdlci5uYW1lKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFVzZVNpZ25hbCwgeyBzaWduYWw6IHByb3BzLm1hbmFnZXIucnVubmluZ0NoYW5nZWQgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXNhYmxlZCA9IHByb3BzLm1hbmFnZXIucnVubmluZygpLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBgJHtTSFVURE9XTl9BTExfQlVUVE9OX0NMQVNTfSBqcC1tb2Qtc3R5bGVkICR7ZGlzYWJsZWQgJiYgJ2pwLW1vZC1kaXNhYmxlZCd9YCwgZGlzYWJsZWQ6IGRpc2FibGVkLCBvbkNsaWNrOiBvblNodXRkb3duIH0sIHNodXRkb3duQWxsTGFiZWwpKTtcbiAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBDT05UQUlORVJfQ0xBU1MgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExpc3QsIHsgbWFuYWdlcjogcHJvcHMubWFuYWdlciwgc2h1dGRvd25MYWJlbDogcHJvcHMubWFuYWdlci5zaHV0ZG93bkxhYmVsLCBzaHV0ZG93bkFsbExhYmVsOiBzaHV0ZG93bkFsbExhYmVsLCB0cmFuc2xhdG9yOiBwcm9wcy50cmFuc2xhdG9yIH0pKSkpKTtcbn1cbmZ1bmN0aW9uIFJ1bm5pbmdTZXNzaW9uc0NvbXBvbmVudChwcm9wcykge1xuICAgIGNvbnN0IHRyYW5zbGF0b3IgPSBwcm9wcy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBIRUFERVJfQ0xBU1MgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVG9vbGJhckJ1dHRvbkNvbXBvbmVudCwgeyB0b29sdGlwOiB0cmFucy5fXygnUmVmcmVzaCBMaXN0JyksIGljb246IHJlZnJlc2hJY29uLCBvbkNsaWNrOiAoKSA9PiBwcm9wcy5tYW5hZ2Vycy5pdGVtcygpLmZvckVhY2gobWFuYWdlciA9PiBtYW5hZ2VyLnJlZnJlc2hSdW5uaW5nKCkpIH0pKSxcbiAgICAgICAgcHJvcHMubWFuYWdlcnMuaXRlbXMoKS5tYXAobWFuYWdlciA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChTZWN0aW9uLCB7IGtleTogbWFuYWdlci5uYW1lLCBtYW5hZ2VyOiBtYW5hZ2VyLCB0cmFuc2xhdG9yOiBwcm9wcy50cmFuc2xhdG9yIH0pKSkpKTtcbn1cbi8qKlxuICogQSBjbGFzcyB0aGF0IGV4cG9zZXMgdGhlIHJ1bm5pbmcgdGVybWluYWwgYW5kIGtlcm5lbCBzZXNzaW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJ1bm5pbmdTZXNzaW9ucyBleHRlbmRzIFJlYWN0V2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgcnVubmluZyB3aWRnZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWFuYWdlcnMsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5tYW5hZ2VycyA9IG1hbmFnZXJzO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICAvLyB0aGlzIGNhbid0IGJlIGluIHRoZSByZWFjdCBlbGVtZW50LCBiZWNhdXNlIHRoZW4gaXQgd291bGQgYmUgdG9vIG5lc3RlZFxuICAgICAgICB0aGlzLmFkZENsYXNzKFJVTk5JTkdfQ0xBU1MpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSdW5uaW5nU2Vzc2lvbnNDb21wb25lbnQsIHsgbWFuYWdlcnM6IHRoaXMubWFuYWdlcnMsIHRyYW5zbGF0b3I6IHRoaXMudHJhbnNsYXRvciB9KSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==