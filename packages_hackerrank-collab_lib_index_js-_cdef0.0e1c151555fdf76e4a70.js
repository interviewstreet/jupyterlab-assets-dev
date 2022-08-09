(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_hackerrank-collab_lib_index_js-_cdef0"],{

/***/ "../../packages/hackerrank-collab/lib/dock-panel.js":
/*!**********************************************************!*\
  !*** ../../packages/hackerrank-collab/lib/dock-panel.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollabDockPanel": () => (/* binding */ CollabDockPanel)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/virtualdom */ "webpack/sharing/consume/default/@lumino/virtualdom/@lumino/virtualdom?7070");
/* harmony import */ var _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "../../packages/hackerrank-collab/lib/state.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "../../packages/hackerrank-collab/lib/utils.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module jupyterlab-collab
 */




class CollabDockPanel extends _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.DockPanelSvg {
    constructor(options = {}) {
        options.renderer = new CollabDockPanelRenderer();
        super(options);
    }
}
class CollabDockPanelRenderer extends _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.DockPanelSvg.Renderer {
    createTabBar() {
        const bar = new CollabTabBar();
        bar.addClass('lm-DockPanel-tabBar');
        return bar;
    }
}
class CollabTabBar extends _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.TabBarSvg {
    constructor(options = {}) {
        options.renderer = new CollabTabBarRenderer();
        super(options);
        _state__WEBPACK_IMPORTED_MODULE_2__.UserIndicatorState.changed.connect(() => {
            this.update();
        });
    }
}
class CollabTabBarRenderer extends _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.TabBarSvg.Renderer {
    getUserIndicatorData(data) {
        const usersValue = _state__WEBPACK_IMPORTED_MODULE_2__.UserIndicatorState.values();
        if (!_state__WEBPACK_IMPORTED_MODULE_2__.InterviewState.size || !usersValue.length) {
            return [];
        }
        return usersValue.reduce((indicatorData, user) => {
            var _a;
            if (!user ||
                !user.insideInterview ||
                user.qid !== _state__WEBPACK_IMPORTED_MODULE_2__.InterviewState.get('questionId') ||
                !user.widgetType ||
                user.widgetType === 'unknown' ||
                user.widgetType === 'launcher') {
                return indicatorData;
            }
            let filePath = user.filePath;
            if (filePath.startsWith('/projects/')) {
                filePath = filePath.replace('/projects/', '');
            }
            if (!user.screenname) {
                return indicatorData;
            }
            const widget = data.title.owner;
            const { widgetType, path } = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getWidgetInfo)(widget);
            if (widgetType === user.widgetType && path === filePath) {
                return [
                    ...indicatorData,
                    {
                        initial: (_a = user.screenname) === null || _a === void 0 ? void 0 : _a.charAt(0).toUpperCase(),
                        color: user.color
                    }
                ];
            }
            return indicatorData;
        }, []);
    }
    renderUserIndicator(user) {
        const { initial, color } = user;
        return _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.div({
            style: {
                paddingRight: '5px',
                fontWeight: 'bold',
                color
            }
        }, initial);
    }
    renderAllUserIndicators(users) {
        if (!(users === null || users === void 0 ? void 0 : users.length)) {
            return [];
        }
        return users.map((user) => this.renderUserIndicator(user));
    }
    renderTab(data) {
        let tab = super.renderTab(data);
        const userIndicatorData = this.getUserIndicatorData(data);
        return Object.assign(Object.assign({}, tab), { children: [
                ...this.renderAllUserIndicators(userIndicatorData),
                ...tab.children
            ] });
    }
}
//# sourceMappingURL=dock-panel.js.map

/***/ }),

/***/ "../../packages/hackerrank-collab/lib/index.js":
/*!*****************************************************!*\
  !*** ../../packages/hackerrank-collab/lib/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollabDockPanel": () => (/* reexport safe */ _dock_panel__WEBPACK_IMPORTED_MODULE_0__.CollabDockPanel),
/* harmony export */   "InterviewState": () => (/* reexport safe */ _state__WEBPACK_IMPORTED_MODULE_1__.InterviewState),
/* harmony export */   "UserIndicatorState": () => (/* reexport safe */ _state__WEBPACK_IMPORTED_MODULE_1__.UserIndicatorState),
/* harmony export */   "getWidgetInfo": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_2__.getWidgetInfo)
/* harmony export */ });
/* harmony import */ var _dock_panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dock-panel */ "../../packages/hackerrank-collab/lib/dock-panel.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "../../packages/hackerrank-collab/lib/state.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "../../packages/hackerrank-collab/lib/utils.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module jupyterlab-collab
 */



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/hackerrank-collab/lib/state.js":
/*!*****************************************************!*\
  !*** ../../packages/hackerrank-collab/lib/state.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserIndicatorState": () => (/* binding */ UserIndicatorState),
/* harmony export */   "InterviewState": () => (/* binding */ InterviewState)
/* harmony export */ });
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/observables */ "webpack/sharing/consume/default/@jupyterlab/observables/@jupyterlab/observables");
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__);

const UserIndicatorState = new _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__.ObservableMap();
const InterviewState = new _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__.ObservableMap();

//# sourceMappingURL=state.js.map

/***/ }),

/***/ "../../packages/hackerrank-collab/lib/utils.js":
/*!*****************************************************!*\
  !*** ../../packages/hackerrank-collab/lib/utils.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getWidgetInfo": () => (/* binding */ getWidgetInfo)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/console */ "webpack/sharing/consume/default/@jupyterlab/console/@jupyterlab/console");
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_console__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/launcher */ "webpack/sharing/consume/default/@jupyterlab/launcher/@jupyterlab/launcher");
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_terminal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/terminal */ "webpack/sharing/consume/default/@jupyterlab/terminal/@jupyterlab/terminal");
/* harmony import */ var _jupyterlab_terminal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_terminal__WEBPACK_IMPORTED_MODULE_4__);





function getWidgetInfo(widget) {
    /**
     * Following can be MainAreaWidget's instance on DockPanelSvg
     * 1. ConsolePanel
     * 2. DocumentWidget
     * 3. Launcher
     * 4. Terminal
     */
    if (!widget || !(widget instanceof _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.MainAreaWidget)) {
        return { path: '', widgetType: 'unknown' };
    }
    const contentWidget = widget.content;
    if (contentWidget instanceof _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_3__.Launcher) {
        return { path: '', widgetType: 'launcher' };
        // ConsolePanel will always contain CodeConsole
    }
    else if (widget instanceof _jupyterlab_console__WEBPACK_IMPORTED_MODULE_1__.ConsolePanel) {
        return { path: widget.sessionContext.path, widgetType: 'console' };
    }
    else if (widget instanceof _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__.DocumentWidget) {
        return { path: widget.context.path, widgetType: 'document' };
    }
    else if (contentWidget instanceof _jupyterlab_terminal__WEBPACK_IMPORTED_MODULE_4__.Terminal) {
        return { path: contentWidget.session.model.name, widgetType: 'terminal' };
    }
    return { path: '', widgetType: 'unknown' };
}
//# sourceMappingURL=utils.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvaGFja2VycmFuay1jb2xsYWIvbGliL2RvY2stcGFuZWwuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2hhY2tlcnJhbmstY29sbGFiL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvaGFja2VycmFuay1jb2xsYWIvbGliL3N0YXRlLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9oYWNrZXJyYW5rLWNvbGxhYi9saWIvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvRTtBQUM3QjtBQUNzQjtBQUNyQjtBQUNqQyw4QkFBOEIsbUVBQVk7QUFDakQsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLDRFQUFxQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsZ0VBQVM7QUFDcEMsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQSxRQUFRLHNFQUFrQztBQUMxQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsbUNBQW1DLHlFQUFrQjtBQUNyRDtBQUNBLDJCQUEyQiw2REFBeUI7QUFDcEQsYUFBYSx1REFBbUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHNEQUFrQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUIsR0FBRyxxREFBYTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEMsZUFBZSxxREFBSztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFNBQVM7QUFDdEQ7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0Esc0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDNkI7QUFDTDtBQUNBO0FBQ3hCLGlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUd0Q7QUFDeEQsK0JBQStCLGtFQUFhO0FBQzVDLDJCQUEyQixrRUFBYTtBQUNNO0FBQzlDLGlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSnNEO0FBQ0g7QUFDTTtBQUNUO0FBQ0E7QUFDekM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxnRUFBYztBQUNyRCxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLGlDQUFpQywwREFBUTtBQUN6QyxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLCtCQUErQiw2REFBWTtBQUMzQyxnQkFBZ0I7QUFDaEI7QUFDQSwrQkFBK0IsbUVBQWM7QUFDN0MsZ0JBQWdCO0FBQ2hCO0FBQ0Esc0NBQXNDLDBEQUFRO0FBQzlDLGdCQUFnQjtBQUNoQjtBQUNBLFlBQVk7QUFDWjtBQUNBLGlDIiwiZmlsZSI6InBhY2thZ2VzX2hhY2tlcnJhbmstY29sbGFiX2xpYl9pbmRleF9qcy1fY2RlZjAuMGUxYzE1MTU1NWZkZjc2ZTRhNzAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBqdXB5dGVybGFiLWNvbGxhYlxuICovXG5pbXBvcnQgeyBEb2NrUGFuZWxTdmcsIFRhYkJhclN2ZyB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgaCB9IGZyb20gJ0BsdW1pbm8vdmlydHVhbGRvbSc7XG5pbXBvcnQgeyBJbnRlcnZpZXdTdGF0ZSwgVXNlckluZGljYXRvclN0YXRlIH0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBnZXRXaWRnZXRJbmZvIH0gZnJvbSAnLi91dGlscyc7XG5leHBvcnQgY2xhc3MgQ29sbGFiRG9ja1BhbmVsIGV4dGVuZHMgRG9ja1BhbmVsU3ZnIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgb3B0aW9ucy5yZW5kZXJlciA9IG5ldyBDb2xsYWJEb2NrUGFuZWxSZW5kZXJlcigpO1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICB9XG59XG5jbGFzcyBDb2xsYWJEb2NrUGFuZWxSZW5kZXJlciBleHRlbmRzIERvY2tQYW5lbFN2Zy5SZW5kZXJlciB7XG4gICAgY3JlYXRlVGFiQmFyKCkge1xuICAgICAgICBjb25zdCBiYXIgPSBuZXcgQ29sbGFiVGFiQmFyKCk7XG4gICAgICAgIGJhci5hZGRDbGFzcygnbG0tRG9ja1BhbmVsLXRhYkJhcicpO1xuICAgICAgICByZXR1cm4gYmFyO1xuICAgIH1cbn1cbmNsYXNzIENvbGxhYlRhYkJhciBleHRlbmRzIFRhYkJhclN2ZyB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIG9wdGlvbnMucmVuZGVyZXIgPSBuZXcgQ29sbGFiVGFiQmFyUmVuZGVyZXIoKTtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIFVzZXJJbmRpY2F0b3JTdGF0ZS5jaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuY2xhc3MgQ29sbGFiVGFiQmFyUmVuZGVyZXIgZXh0ZW5kcyBUYWJCYXJTdmcuUmVuZGVyZXIge1xuICAgIGdldFVzZXJJbmRpY2F0b3JEYXRhKGRhdGEpIHtcbiAgICAgICAgY29uc3QgdXNlcnNWYWx1ZSA9IFVzZXJJbmRpY2F0b3JTdGF0ZS52YWx1ZXMoKTtcbiAgICAgICAgaWYgKCFJbnRlcnZpZXdTdGF0ZS5zaXplIHx8ICF1c2Vyc1ZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1c2Vyc1ZhbHVlLnJlZHVjZSgoaW5kaWNhdG9yRGF0YSwgdXNlcikgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgaWYgKCF1c2VyIHx8XG4gICAgICAgICAgICAgICAgIXVzZXIuaW5zaWRlSW50ZXJ2aWV3IHx8XG4gICAgICAgICAgICAgICAgdXNlci5xaWQgIT09IEludGVydmlld1N0YXRlLmdldCgncXVlc3Rpb25JZCcpIHx8XG4gICAgICAgICAgICAgICAgIXVzZXIud2lkZ2V0VHlwZSB8fFxuICAgICAgICAgICAgICAgIHVzZXIud2lkZ2V0VHlwZSA9PT0gJ3Vua25vd24nIHx8XG4gICAgICAgICAgICAgICAgdXNlci53aWRnZXRUeXBlID09PSAnbGF1bmNoZXInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGljYXRvckRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZmlsZVBhdGggPSB1c2VyLmZpbGVQYXRoO1xuICAgICAgICAgICAgaWYgKGZpbGVQYXRoLnN0YXJ0c1dpdGgoJy9wcm9qZWN0cy8nKSkge1xuICAgICAgICAgICAgICAgIGZpbGVQYXRoID0gZmlsZVBhdGgucmVwbGFjZSgnL3Byb2plY3RzLycsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdXNlci5zY3JlZW5uYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGljYXRvckRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB3aWRnZXQgPSBkYXRhLnRpdGxlLm93bmVyO1xuICAgICAgICAgICAgY29uc3QgeyB3aWRnZXRUeXBlLCBwYXRoIH0gPSBnZXRXaWRnZXRJbmZvKHdpZGdldCk7XG4gICAgICAgICAgICBpZiAod2lkZ2V0VHlwZSA9PT0gdXNlci53aWRnZXRUeXBlICYmIHBhdGggPT09IGZpbGVQYXRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgLi4uaW5kaWNhdG9yRGF0YSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbDogKF9hID0gdXNlci5zY3JlZW5uYW1lKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2hhckF0KDApLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdXNlci5jb2xvclxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbmRpY2F0b3JEYXRhO1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuICAgIHJlbmRlclVzZXJJbmRpY2F0b3IodXNlcikge1xuICAgICAgICBjb25zdCB7IGluaXRpYWwsIGNvbG9yIH0gPSB1c2VyO1xuICAgICAgICByZXR1cm4gaC5kaXYoe1xuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICc1cHgnLFxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgICAgICBjb2xvclxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBpbml0aWFsKTtcbiAgICB9XG4gICAgcmVuZGVyQWxsVXNlckluZGljYXRvcnModXNlcnMpIHtcbiAgICAgICAgaWYgKCEodXNlcnMgPT09IG51bGwgfHwgdXNlcnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXJzLmxlbmd0aCkpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXNlcnMubWFwKCh1c2VyKSA9PiB0aGlzLnJlbmRlclVzZXJJbmRpY2F0b3IodXNlcikpO1xuICAgIH1cbiAgICByZW5kZXJUYWIoZGF0YSkge1xuICAgICAgICBsZXQgdGFiID0gc3VwZXIucmVuZGVyVGFiKGRhdGEpO1xuICAgICAgICBjb25zdCB1c2VySW5kaWNhdG9yRGF0YSA9IHRoaXMuZ2V0VXNlckluZGljYXRvckRhdGEoZGF0YSk7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRhYiksIHsgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAuLi50aGlzLnJlbmRlckFsbFVzZXJJbmRpY2F0b3JzKHVzZXJJbmRpY2F0b3JEYXRhKSxcbiAgICAgICAgICAgICAgICAuLi50YWIuY2hpbGRyZW5cbiAgICAgICAgICAgIF0gfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG9jay1wYW5lbC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBqdXB5dGVybGFiLWNvbGxhYlxuICovXG5leHBvcnQgKiBmcm9tICcuL2RvY2stcGFuZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9zdGF0ZSc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGVNYXAgfSBmcm9tICdAanVweXRlcmxhYi9vYnNlcnZhYmxlcyc7XG5jb25zdCBVc2VySW5kaWNhdG9yU3RhdGUgPSBuZXcgT2JzZXJ2YWJsZU1hcCgpO1xuY29uc3QgSW50ZXJ2aWV3U3RhdGUgPSBuZXcgT2JzZXJ2YWJsZU1hcCgpO1xuZXhwb3J0IHsgVXNlckluZGljYXRvclN0YXRlLCBJbnRlcnZpZXdTdGF0ZSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RhdGUuanMubWFwIiwiaW1wb3J0IHsgTWFpbkFyZWFXaWRnZXQgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBDb25zb2xlUGFuZWwgfSBmcm9tICdAanVweXRlcmxhYi9jb25zb2xlJztcbmltcG9ydCB7IERvY3VtZW50V2lkZ2V0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvZG9jcmVnaXN0cnknO1xuaW1wb3J0IHsgTGF1bmNoZXIgfSBmcm9tICdAanVweXRlcmxhYi9sYXVuY2hlcic7XG5pbXBvcnQgeyBUZXJtaW5hbCB9IGZyb20gJ0BqdXB5dGVybGFiL3Rlcm1pbmFsJztcbmV4cG9ydCBmdW5jdGlvbiBnZXRXaWRnZXRJbmZvKHdpZGdldCkge1xuICAgIC8qKlxuICAgICAqIEZvbGxvd2luZyBjYW4gYmUgTWFpbkFyZWFXaWRnZXQncyBpbnN0YW5jZSBvbiBEb2NrUGFuZWxTdmdcbiAgICAgKiAxLiBDb25zb2xlUGFuZWxcbiAgICAgKiAyLiBEb2N1bWVudFdpZGdldFxuICAgICAqIDMuIExhdW5jaGVyXG4gICAgICogNC4gVGVybWluYWxcbiAgICAgKi9cbiAgICBpZiAoIXdpZGdldCB8fCAhKHdpZGdldCBpbnN0YW5jZW9mIE1haW5BcmVhV2lkZ2V0KSkge1xuICAgICAgICByZXR1cm4geyBwYXRoOiAnJywgd2lkZ2V0VHlwZTogJ3Vua25vd24nIH07XG4gICAgfVxuICAgIGNvbnN0IGNvbnRlbnRXaWRnZXQgPSB3aWRnZXQuY29udGVudDtcbiAgICBpZiAoY29udGVudFdpZGdldCBpbnN0YW5jZW9mIExhdW5jaGVyKSB7XG4gICAgICAgIHJldHVybiB7IHBhdGg6ICcnLCB3aWRnZXRUeXBlOiAnbGF1bmNoZXInIH07XG4gICAgICAgIC8vIENvbnNvbGVQYW5lbCB3aWxsIGFsd2F5cyBjb250YWluIENvZGVDb25zb2xlXG4gICAgfVxuICAgIGVsc2UgaWYgKHdpZGdldCBpbnN0YW5jZW9mIENvbnNvbGVQYW5lbCkge1xuICAgICAgICByZXR1cm4geyBwYXRoOiB3aWRnZXQuc2Vzc2lvbkNvbnRleHQucGF0aCwgd2lkZ2V0VHlwZTogJ2NvbnNvbGUnIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKHdpZGdldCBpbnN0YW5jZW9mIERvY3VtZW50V2lkZ2V0KSB7XG4gICAgICAgIHJldHVybiB7IHBhdGg6IHdpZGdldC5jb250ZXh0LnBhdGgsIHdpZGdldFR5cGU6ICdkb2N1bWVudCcgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29udGVudFdpZGdldCBpbnN0YW5jZW9mIFRlcm1pbmFsKSB7XG4gICAgICAgIHJldHVybiB7IHBhdGg6IGNvbnRlbnRXaWRnZXQuc2Vzc2lvbi5tb2RlbC5uYW1lLCB3aWRnZXRUeXBlOiAndGVybWluYWwnIH07XG4gICAgfVxuICAgIHJldHVybiB7IHBhdGg6ICcnLCB3aWRnZXRUeXBlOiAndW5rbm93bicgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWxzLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=