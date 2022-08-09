(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_csvviewer-extension_lib_index_js"],{

/***/ "../../packages/csvviewer-extension/lib/index.js":
/*!*******************************************************!*\
  !*** ../../packages/csvviewer-extension/lib/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_csvviewer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/csvviewer */ "webpack/sharing/consume/default/@jupyterlab/csvviewer/@jupyterlab/csvviewer");
/* harmony import */ var _jupyterlab_csvviewer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_csvviewer__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_documentsearch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/documentsearch */ "webpack/sharing/consume/default/@jupyterlab/documentsearch/@jupyterlab/documentsearch");
/* harmony import */ var _jupyterlab_documentsearch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_documentsearch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/mainmenu */ "webpack/sharing/consume/default/@jupyterlab/mainmenu/@jupyterlab/mainmenu");
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_datagrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/datagrid */ "webpack/sharing/consume/default/@lumino/datagrid/@lumino/datagrid");
/* harmony import */ var _lumino_datagrid__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_datagrid__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _searchprovider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./searchprovider */ "../../packages/csvviewer-extension/lib/searchprovider.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module csvviewer-extension
 */









/**
 * The name of the factories that creates widgets.
 */
const FACTORY_CSV = 'CSVTable';
const FACTORY_TSV = 'TSVTable';
/**
 * The CSV file handler extension.
 */
const csv = {
    activate: activateCsv,
    id: '@jupyterlab/csvviewer-extension:csv',
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__.ITranslator],
    optional: [
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IThemeManager,
        _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_4__.IMainMenu,
        _jupyterlab_documentsearch__WEBPACK_IMPORTED_MODULE_3__.ISearchProviderRegistry,
        _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.ISettingRegistry,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IToolbarWidgetRegistry
    ],
    autoStart: true
};
/**
 * The TSV file handler extension.
 */
const tsv = {
    activate: activateTsv,
    id: '@jupyterlab/csvviewer-extension:tsv',
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__.ITranslator],
    optional: [
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IThemeManager,
        _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_4__.IMainMenu,
        _jupyterlab_documentsearch__WEBPACK_IMPORTED_MODULE_3__.ISearchProviderRegistry,
        _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.ISettingRegistry,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IToolbarWidgetRegistry
    ],
    autoStart: true
};
/**
 * Connect menu entries for find and go to line.
 */
function addMenuEntries(mainMenu, tracker, translator) {
    const trans = translator.load('jupyterlab');
    // Add go to line capability to the edit menu.
    mainMenu.editMenu.goToLiners.add({
        tracker,
        goToLine: (widget) => {
            return _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.InputDialog.getNumber({
                title: trans.__('Go to Line'),
                value: 0
            }).then(value => {
                if (value.button.accept && value.value !== null) {
                    widget.content.goToLine(value.value);
                }
            });
        }
    });
}
/**
 * Activate cssviewer extension for CSV files
 */
function activateCsv(app, translator, restorer, themeManager, mainMenu, searchregistry, settingRegistry, toolbarRegistry) {
    let toolbarFactory;
    if (toolbarRegistry) {
        toolbarRegistry.registerFactory(FACTORY_CSV, 'delimiter', widget => new _jupyterlab_csvviewer__WEBPACK_IMPORTED_MODULE_2__.CSVDelimiter({
            widget: widget.content,
            translator
        }));
        if (settingRegistry) {
            toolbarFactory = (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.createToolbarFactory)(toolbarRegistry, settingRegistry, FACTORY_CSV, csv.id, translator);
        }
    }
    const factory = new _jupyterlab_csvviewer__WEBPACK_IMPORTED_MODULE_2__.CSVViewerFactory({
        name: FACTORY_CSV,
        fileTypes: ['csv'],
        defaultFor: ['csv'],
        readOnly: true,
        toolbarFactory,
        translator
    });
    const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
        namespace: 'csvviewer'
    });
    // The current styles for the data grids.
    let style = Private.LIGHT_STYLE;
    let rendererConfig = Private.LIGHT_TEXT_CONFIG;
    if (restorer) {
        // Handle state restoration.
        void restorer.restore(tracker, {
            command: 'docmanager:open',
            args: widget => ({ path: widget.context.path, factory: FACTORY_CSV }),
            name: widget => widget.context.path
        });
    }
    app.docRegistry.addWidgetFactory(factory);
    const ft = app.docRegistry.getFileType('csv');
    factory.widgetCreated.connect((sender, widget) => {
        // Track the widget.
        void tracker.add(widget);
        // Notify the widget tracker if restore data needs to update.
        widget.context.pathChanged.connect(() => {
            void tracker.save(widget);
        });
        if (ft) {
            widget.title.icon = ft.icon;
            widget.title.iconClass = ft.iconClass;
            widget.title.iconLabel = ft.iconLabel;
        }
        // Set the theme for the new widget.
        widget.content.style = style;
        widget.content.rendererConfig = rendererConfig;
    });
    // Keep the themes up-to-date.
    const updateThemes = () => {
        const isLight = themeManager && themeManager.theme
            ? themeManager.isLight(themeManager.theme)
            : true;
        style = isLight ? Private.LIGHT_STYLE : Private.DARK_STYLE;
        rendererConfig = isLight
            ? Private.LIGHT_TEXT_CONFIG
            : Private.DARK_TEXT_CONFIG;
        tracker.forEach(grid => {
            grid.content.style = style;
            grid.content.rendererConfig = rendererConfig;
        });
    };
    if (themeManager) {
        themeManager.themeChanged.connect(updateThemes);
    }
    if (mainMenu) {
        addMenuEntries(mainMenu, tracker, translator);
    }
    if (searchregistry) {
        searchregistry.register('csv', _searchprovider__WEBPACK_IMPORTED_MODULE_8__.CSVSearchProvider);
    }
}
/**
 * Activate cssviewer extension for TSV files
 */
function activateTsv(app, translator, restorer, themeManager, mainMenu, searchregistry, settingRegistry, toolbarRegistry) {
    let toolbarFactory;
    if (toolbarRegistry) {
        toolbarRegistry.registerFactory(FACTORY_TSV, 'delimiter', widget => new _jupyterlab_csvviewer__WEBPACK_IMPORTED_MODULE_2__.CSVDelimiter({
            widget: widget.content,
            translator
        }));
        if (settingRegistry) {
            toolbarFactory = (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.createToolbarFactory)(toolbarRegistry, settingRegistry, FACTORY_TSV, tsv.id, translator);
        }
    }
    const factory = new _jupyterlab_csvviewer__WEBPACK_IMPORTED_MODULE_2__.TSVViewerFactory({
        name: FACTORY_TSV,
        fileTypes: ['tsv'],
        defaultFor: ['tsv'],
        readOnly: true,
        toolbarFactory,
        translator
    });
    const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
        namespace: 'tsvviewer'
    });
    // The current styles for the data grids.
    let style = Private.LIGHT_STYLE;
    let rendererConfig = Private.LIGHT_TEXT_CONFIG;
    if (restorer) {
        // Handle state restoration.
        void restorer.restore(tracker, {
            command: 'docmanager:open',
            args: widget => ({ path: widget.context.path, factory: FACTORY_TSV }),
            name: widget => widget.context.path
        });
    }
    app.docRegistry.addWidgetFactory(factory);
    const ft = app.docRegistry.getFileType('tsv');
    factory.widgetCreated.connect((sender, widget) => {
        // Track the widget.
        void tracker.add(widget);
        // Notify the widget tracker if restore data needs to update.
        widget.context.pathChanged.connect(() => {
            void tracker.save(widget);
        });
        if (ft) {
            widget.title.icon = ft.icon;
            widget.title.iconClass = ft.iconClass;
            widget.title.iconLabel = ft.iconLabel;
        }
        // Set the theme for the new widget.
        widget.content.style = style;
        widget.content.rendererConfig = rendererConfig;
    });
    // Keep the themes up-to-date.
    const updateThemes = () => {
        const isLight = themeManager && themeManager.theme
            ? themeManager.isLight(themeManager.theme)
            : true;
        style = isLight ? Private.LIGHT_STYLE : Private.DARK_STYLE;
        rendererConfig = isLight
            ? Private.LIGHT_TEXT_CONFIG
            : Private.DARK_TEXT_CONFIG;
        tracker.forEach(grid => {
            grid.content.style = style;
            grid.content.rendererConfig = rendererConfig;
        });
    };
    if (themeManager) {
        themeManager.themeChanged.connect(updateThemes);
    }
    if (mainMenu) {
        addMenuEntries(mainMenu, tracker, translator);
    }
    if (searchregistry) {
        searchregistry.register('tsv', _searchprovider__WEBPACK_IMPORTED_MODULE_8__.CSVSearchProvider);
    }
}
/**
 * Export the plugins as default.
 */
const plugins = [csv, tsv];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * The light theme for the data grid.
     */
    Private.LIGHT_STYLE = Object.assign(Object.assign({}, _lumino_datagrid__WEBPACK_IMPORTED_MODULE_7__.DataGrid.defaultStyle), { voidColor: '#F3F3F3', backgroundColor: 'white', headerBackgroundColor: '#EEEEEE', gridLineColor: 'rgba(20, 20, 20, 0.15)', headerGridLineColor: 'rgba(20, 20, 20, 0.25)', rowBackgroundColor: i => (i % 2 === 0 ? '#F5F5F5' : 'white') });
    /**
     * The dark theme for the data grid.
     */
    Private.DARK_STYLE = Object.assign(Object.assign({}, _lumino_datagrid__WEBPACK_IMPORTED_MODULE_7__.DataGrid.defaultStyle), { voidColor: 'black', backgroundColor: '#111111', headerBackgroundColor: '#424242', gridLineColor: 'rgba(235, 235, 235, 0.15)', headerGridLineColor: 'rgba(235, 235, 235, 0.25)', rowBackgroundColor: i => (i % 2 === 0 ? '#212121' : '#111111') });
    /**
     * The light config for the data grid renderer.
     */
    Private.LIGHT_TEXT_CONFIG = {
        textColor: '#111111',
        matchBackgroundColor: '#FFFFE0',
        currentMatchBackgroundColor: '#FFFF00',
        horizontalAlignment: 'right'
    };
    /**
     * The dark config for the data grid renderer.
     */
    Private.DARK_TEXT_CONFIG = {
        textColor: '#F5F5F5',
        matchBackgroundColor: '#838423',
        currentMatchBackgroundColor: '#A3807A',
        horizontalAlignment: 'right'
    };
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/csvviewer-extension/lib/searchprovider.js":
/*!****************************************************************!*\
  !*** ../../packages/csvviewer-extension/lib/searchprovider.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CSVSearchProvider": () => (/* binding */ CSVSearchProvider)
/* harmony export */ });
/* harmony import */ var _jupyterlab_csvviewer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/csvviewer */ "webpack/sharing/consume/default/@jupyterlab/csvviewer/@jupyterlab/csvviewer");
/* harmony import */ var _jupyterlab_csvviewer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_csvviewer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



class CSVSearchProvider {
    constructor() {
        /**
         * The same list of matches provided by the startQuery promise resolution
         */
        this.matches = [];
        /**
         * The current index of the selected match.
         */
        this.currentMatchIndex = null;
        /**
         * Set to true if the widget under search is read-only, false
         * if it is editable.  Will be used to determine whether to show
         * the replace option.
         */
        this.isReadOnly = true;
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(this);
    }
    /**
     * Report whether or not this provider has the ability to search on the given object
     */
    static canSearchOn(domain) {
        // check to see if the CSVSearchProvider can search on the
        // first cell, false indicates another editor is present
        return (domain instanceof _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__.DocumentWidget && domain.content instanceof _jupyterlab_csvviewer__WEBPACK_IMPORTED_MODULE_0__.CSVViewer);
    }
    /**
     * Get an initial query value if applicable so that it can be entered
     * into the search box as an initial query
     *
     * @returns Initial value used to populate the search box.
     */
    getInitialQuery(searchTarget) {
        // CSV Viewer does not support selection
        return null;
    }
    /**
     * Initialize the search using the provided options.  Should update the UI
     * to highlight all matches and "select" whatever the first match should be.
     *
     * @param query A RegExp to be use to perform the search
     * @param searchTarget The widget to be searched
     *
     * @returns A promise that resolves with a list of all matches
     */
    async startQuery(query, searchTarget) {
        this._target = searchTarget;
        this._query = query;
        searchTarget.content.searchService.find(query);
        return this.matches;
    }
    /**
     * Clears state of a search provider to prepare for startQuery to be called
     * in order to start a new query or refresh an existing one.
     *
     * @returns A promise that resolves when the search provider is ready to
     * begin a new search.
     */
    async endQuery() {
        this._target.content.searchService.clear();
    }
    /**
     * Resets UI state as it was before the search process began.  Cleans up and
     * disposes of all internal state.
     *
     * @returns A promise that resolves when all state has been cleaned up.
     */
    async endSearch() {
        this._target.content.searchService.clear();
    }
    /**
     * Move the current match indicator to the next match.
     *
     * @returns A promise that resolves once the action has completed.
     */
    async highlightNext() {
        this._target.content.searchService.find(this._query);
        return undefined;
    }
    /**
     * Move the current match indicator to the previous match.
     *
     * @returns A promise that resolves once the action has completed.
     */
    async highlightPrevious() {
        this._target.content.searchService.find(this._query, true);
        return undefined;
    }
    /**
     * Replace the currently selected match with the provided text
     * Not implemented in the CSV viewer as it is read-only.
     *
     * @returns A promise that resolves once the action has completed.
     */
    async replaceCurrentMatch(newText) {
        return false;
    }
    /**
     * Replace all matches in the notebook with the provided text
     * Not implemented in the CSV viewer as it is read-only.
     *
     * @returns A promise that resolves once the action has completed.
     */
    async replaceAllMatches(newText) {
        return false;
    }
    /**
     * Signal indicating that something in the search has changed, so the UI should update
     */
    get changed() {
        return this._changed;
    }
}
//# sourceMappingURL=searchprovider.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY3N2dmlld2VyLWV4dGVuc2lvbi9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2NzdnZpZXdlci1leHRlbnNpb24vbGliL3NlYXJjaHByb3ZpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwRDtBQUNxRTtBQUN0QztBQUNwQjtBQUNwQjtBQUNjO0FBQ1Q7QUFDVjtBQUNTO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdFQUFXO0FBQzFCO0FBQ0EsUUFBUSxvRUFBZTtBQUN2QixRQUFRLCtEQUFhO0FBQ3JCLFFBQVEsMkRBQVM7QUFDakIsUUFBUSwrRUFBdUI7QUFDL0IsUUFBUSx5RUFBZ0I7QUFDeEIsUUFBUSx3RUFBc0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxnRUFBVztBQUMxQjtBQUNBLFFBQVEsb0VBQWU7QUFDdkIsUUFBUSwrREFBYTtBQUNyQixRQUFRLDJEQUFTO0FBQ2pCLFFBQVEsK0VBQXVCO0FBQy9CLFFBQVEseUVBQWdCO0FBQ3hCLFFBQVEsd0VBQXNCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1RUFBcUI7QUFDeEM7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0YsK0RBQVk7QUFDNUY7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDIiwiZmlsZSI6InBhY2thZ2VzX2NzdnZpZXdlci1leHRlbnNpb25fbGliX2luZGV4X2pzLjJmNjhmYWI1MjdmM2I2NGMwZTBhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgY3N2dmlld2VyLWV4dGVuc2lvblxuICovXG5pbXBvcnQgeyBJTGF5b3V0UmVzdG9yZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBjcmVhdGVUb29sYmFyRmFjdG9yeSwgSW5wdXREaWFsb2csIElUaGVtZU1hbmFnZXIsIElUb29sYmFyV2lkZ2V0UmVnaXN0cnksIFdpZGdldFRyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBDU1ZEZWxpbWl0ZXIsIENTVlZpZXdlckZhY3RvcnksIFRTVlZpZXdlckZhY3RvcnkgfSBmcm9tICdAanVweXRlcmxhYi9jc3Z2aWV3ZXInO1xuaW1wb3J0IHsgSVNlYXJjaFByb3ZpZGVyUmVnaXN0cnkgfSBmcm9tICdAanVweXRlcmxhYi9kb2N1bWVudHNlYXJjaCc7XG5pbXBvcnQgeyBJTWFpbk1lbnUgfSBmcm9tICdAanVweXRlcmxhYi9tYWlubWVudSc7XG5pbXBvcnQgeyBJU2V0dGluZ1JlZ2lzdHJ5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvc2V0dGluZ3JlZ2lzdHJ5JztcbmltcG9ydCB7IElUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgRGF0YUdyaWQgfSBmcm9tICdAbHVtaW5vL2RhdGFncmlkJztcbmltcG9ydCB7IENTVlNlYXJjaFByb3ZpZGVyIH0gZnJvbSAnLi9zZWFyY2hwcm92aWRlcic7XG4vKipcbiAqIFRoZSBuYW1lIG9mIHRoZSBmYWN0b3JpZXMgdGhhdCBjcmVhdGVzIHdpZGdldHMuXG4gKi9cbmNvbnN0IEZBQ1RPUllfQ1NWID0gJ0NTVlRhYmxlJztcbmNvbnN0IEZBQ1RPUllfVFNWID0gJ1RTVlRhYmxlJztcbi8qKlxuICogVGhlIENTViBmaWxlIGhhbmRsZXIgZXh0ZW5zaW9uLlxuICovXG5jb25zdCBjc3YgPSB7XG4gICAgYWN0aXZhdGU6IGFjdGl2YXRlQ3N2LFxuICAgIGlkOiAnQGp1cHl0ZXJsYWIvY3N2dmlld2VyLWV4dGVuc2lvbjpjc3YnLFxuICAgIHJlcXVpcmVzOiBbSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbXG4gICAgICAgIElMYXlvdXRSZXN0b3JlcixcbiAgICAgICAgSVRoZW1lTWFuYWdlcixcbiAgICAgICAgSU1haW5NZW51LFxuICAgICAgICBJU2VhcmNoUHJvdmlkZXJSZWdpc3RyeSxcbiAgICAgICAgSVNldHRpbmdSZWdpc3RyeSxcbiAgICAgICAgSVRvb2xiYXJXaWRnZXRSZWdpc3RyeVxuICAgIF0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlXG59O1xuLyoqXG4gKiBUaGUgVFNWIGZpbGUgaGFuZGxlciBleHRlbnNpb24uXG4gKi9cbmNvbnN0IHRzdiA9IHtcbiAgICBhY3RpdmF0ZTogYWN0aXZhdGVUc3YsXG4gICAgaWQ6ICdAanVweXRlcmxhYi9jc3Z2aWV3ZXItZXh0ZW5zaW9uOnRzdicsXG4gICAgcmVxdWlyZXM6IFtJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtcbiAgICAgICAgSUxheW91dFJlc3RvcmVyLFxuICAgICAgICBJVGhlbWVNYW5hZ2VyLFxuICAgICAgICBJTWFpbk1lbnUsXG4gICAgICAgIElTZWFyY2hQcm92aWRlclJlZ2lzdHJ5LFxuICAgICAgICBJU2V0dGluZ1JlZ2lzdHJ5LFxuICAgICAgICBJVG9vbGJhcldpZGdldFJlZ2lzdHJ5XG4gICAgXSxcbiAgICBhdXRvU3RhcnQ6IHRydWVcbn07XG4vKipcbiAqIENvbm5lY3QgbWVudSBlbnRyaWVzIGZvciBmaW5kIGFuZCBnbyB0byBsaW5lLlxuICovXG5mdW5jdGlvbiBhZGRNZW51RW50cmllcyhtYWluTWVudSwgdHJhY2tlciwgdHJhbnNsYXRvcikge1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgLy8gQWRkIGdvIHRvIGxpbmUgY2FwYWJpbGl0eSB0byB0aGUgZWRpdCBtZW51LlxuICAgIG1haW5NZW51LmVkaXRNZW51LmdvVG9MaW5lcnMuYWRkKHtcbiAgICAgICAgdHJhY2tlcixcbiAgICAgICAgZ29Ub0xpbmU6ICh3aWRnZXQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBJbnB1dERpYWxvZy5nZXROdW1iZXIoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFucy5fXygnR28gdG8gTGluZScpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgICAgICB9KS50aGVuKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuYnV0dG9uLmFjY2VwdCAmJiB2YWx1ZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB3aWRnZXQuY29udGVudC5nb1RvTGluZSh2YWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogQWN0aXZhdGUgY3Nzdmlld2VyIGV4dGVuc2lvbiBmb3IgQ1NWIGZpbGVzXG4gKi9cbmZ1bmN0aW9uIGFjdGl2YXRlQ3N2KGFwcCwgdHJhbnNsYXRvciwgcmVzdG9yZXIsIHRoZW1lTWFuYWdlciwgbWFpbk1lbnUsIHNlYXJjaHJlZ2lzdHJ5LCBzZXR0aW5nUmVnaXN0cnksIHRvb2xiYXJSZWdpc3RyeSkge1xuICAgIGxldCB0b29sYmFyRmFjdG9yeTtcbiAgICBpZiAodG9vbGJhclJlZ2lzdHJ5KSB7XG4gICAgICAgIHRvb2xiYXJSZWdpc3RyeS5yZWdpc3RlckZhY3RvcnkoRkFDVE9SWV9DU1YsICdkZWxpbWl0ZXInLCB3aWRnZXQgPT4gbmV3IENTVkRlbGltaXRlcih7XG4gICAgICAgICAgICB3aWRnZXQ6IHdpZGdldC5jb250ZW50LFxuICAgICAgICAgICAgdHJhbnNsYXRvclxuICAgICAgICB9KSk7XG4gICAgICAgIGlmIChzZXR0aW5nUmVnaXN0cnkpIHtcbiAgICAgICAgICAgIHRvb2xiYXJGYWN0b3J5ID0gY3JlYXRlVG9vbGJhckZhY3RvcnkodG9vbGJhclJlZ2lzdHJ5LCBzZXR0aW5nUmVnaXN0cnksIEZBQ1RPUllfQ1NWLCBjc3YuaWQsIHRyYW5zbGF0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGZhY3RvcnkgPSBuZXcgQ1NWVmlld2VyRmFjdG9yeSh7XG4gICAgICAgIG5hbWU6IEZBQ1RPUllfQ1NWLFxuICAgICAgICBmaWxlVHlwZXM6IFsnY3N2J10sXG4gICAgICAgIGRlZmF1bHRGb3I6IFsnY3N2J10sXG4gICAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgICB0b29sYmFyRmFjdG9yeSxcbiAgICAgICAgdHJhbnNsYXRvclxuICAgIH0pO1xuICAgIGNvbnN0IHRyYWNrZXIgPSBuZXcgV2lkZ2V0VHJhY2tlcih7XG4gICAgICAgIG5hbWVzcGFjZTogJ2NzdnZpZXdlcidcbiAgICB9KTtcbiAgICAvLyBUaGUgY3VycmVudCBzdHlsZXMgZm9yIHRoZSBkYXRhIGdyaWRzLlxuICAgIGxldCBzdHlsZSA9IFByaXZhdGUuTElHSFRfU1RZTEU7XG4gICAgbGV0IHJlbmRlcmVyQ29uZmlnID0gUHJpdmF0ZS5MSUdIVF9URVhUX0NPTkZJRztcbiAgICBpZiAocmVzdG9yZXIpIHtcbiAgICAgICAgLy8gSGFuZGxlIHN0YXRlIHJlc3RvcmF0aW9uLlxuICAgICAgICB2b2lkIHJlc3RvcmVyLnJlc3RvcmUodHJhY2tlciwge1xuICAgICAgICAgICAgY29tbWFuZDogJ2RvY21hbmFnZXI6b3BlbicsXG4gICAgICAgICAgICBhcmdzOiB3aWRnZXQgPT4gKHsgcGF0aDogd2lkZ2V0LmNvbnRleHQucGF0aCwgZmFjdG9yeTogRkFDVE9SWV9DU1YgfSksXG4gICAgICAgICAgICBuYW1lOiB3aWRnZXQgPT4gd2lkZ2V0LmNvbnRleHQucGF0aFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXBwLmRvY1JlZ2lzdHJ5LmFkZFdpZGdldEZhY3RvcnkoZmFjdG9yeSk7XG4gICAgY29uc3QgZnQgPSBhcHAuZG9jUmVnaXN0cnkuZ2V0RmlsZVR5cGUoJ2NzdicpO1xuICAgIGZhY3Rvcnkud2lkZ2V0Q3JlYXRlZC5jb25uZWN0KChzZW5kZXIsIHdpZGdldCkgPT4ge1xuICAgICAgICAvLyBUcmFjayB0aGUgd2lkZ2V0LlxuICAgICAgICB2b2lkIHRyYWNrZXIuYWRkKHdpZGdldCk7XG4gICAgICAgIC8vIE5vdGlmeSB0aGUgd2lkZ2V0IHRyYWNrZXIgaWYgcmVzdG9yZSBkYXRhIG5lZWRzIHRvIHVwZGF0ZS5cbiAgICAgICAgd2lkZ2V0LmNvbnRleHQucGF0aENoYW5nZWQuY29ubmVjdCgoKSA9PiB7XG4gICAgICAgICAgICB2b2lkIHRyYWNrZXIuc2F2ZSh3aWRnZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGZ0KSB7XG4gICAgICAgICAgICB3aWRnZXQudGl0bGUuaWNvbiA9IGZ0Lmljb247XG4gICAgICAgICAgICB3aWRnZXQudGl0bGUuaWNvbkNsYXNzID0gZnQuaWNvbkNsYXNzO1xuICAgICAgICAgICAgd2lkZ2V0LnRpdGxlLmljb25MYWJlbCA9IGZ0Lmljb25MYWJlbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgdGhlIHRoZW1lIGZvciB0aGUgbmV3IHdpZGdldC5cbiAgICAgICAgd2lkZ2V0LmNvbnRlbnQuc3R5bGUgPSBzdHlsZTtcbiAgICAgICAgd2lkZ2V0LmNvbnRlbnQucmVuZGVyZXJDb25maWcgPSByZW5kZXJlckNvbmZpZztcbiAgICB9KTtcbiAgICAvLyBLZWVwIHRoZSB0aGVtZXMgdXAtdG8tZGF0ZS5cbiAgICBjb25zdCB1cGRhdGVUaGVtZXMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzTGlnaHQgPSB0aGVtZU1hbmFnZXIgJiYgdGhlbWVNYW5hZ2VyLnRoZW1lXG4gICAgICAgICAgICA/IHRoZW1lTWFuYWdlci5pc0xpZ2h0KHRoZW1lTWFuYWdlci50aGVtZSlcbiAgICAgICAgICAgIDogdHJ1ZTtcbiAgICAgICAgc3R5bGUgPSBpc0xpZ2h0ID8gUHJpdmF0ZS5MSUdIVF9TVFlMRSA6IFByaXZhdGUuREFSS19TVFlMRTtcbiAgICAgICAgcmVuZGVyZXJDb25maWcgPSBpc0xpZ2h0XG4gICAgICAgICAgICA/IFByaXZhdGUuTElHSFRfVEVYVF9DT05GSUdcbiAgICAgICAgICAgIDogUHJpdmF0ZS5EQVJLX1RFWFRfQ09ORklHO1xuICAgICAgICB0cmFja2VyLmZvckVhY2goZ3JpZCA9PiB7XG4gICAgICAgICAgICBncmlkLmNvbnRlbnQuc3R5bGUgPSBzdHlsZTtcbiAgICAgICAgICAgIGdyaWQuY29udGVudC5yZW5kZXJlckNvbmZpZyA9IHJlbmRlcmVyQ29uZmlnO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGlmICh0aGVtZU1hbmFnZXIpIHtcbiAgICAgICAgdGhlbWVNYW5hZ2VyLnRoZW1lQ2hhbmdlZC5jb25uZWN0KHVwZGF0ZVRoZW1lcyk7XG4gICAgfVxuICAgIGlmIChtYWluTWVudSkge1xuICAgICAgICBhZGRNZW51RW50cmllcyhtYWluTWVudSwgdHJhY2tlciwgdHJhbnNsYXRvcik7XG4gICAgfVxuICAgIGlmIChzZWFyY2hyZWdpc3RyeSkge1xuICAgICAgICBzZWFyY2hyZWdpc3RyeS5yZWdpc3RlcignY3N2JywgQ1NWU2VhcmNoUHJvdmlkZXIpO1xuICAgIH1cbn1cbi8qKlxuICogQWN0aXZhdGUgY3Nzdmlld2VyIGV4dGVuc2lvbiBmb3IgVFNWIGZpbGVzXG4gKi9cbmZ1bmN0aW9uIGFjdGl2YXRlVHN2KGFwcCwgdHJhbnNsYXRvciwgcmVzdG9yZXIsIHRoZW1lTWFuYWdlciwgbWFpbk1lbnUsIHNlYXJjaHJlZ2lzdHJ5LCBzZXR0aW5nUmVnaXN0cnksIHRvb2xiYXJSZWdpc3RyeSkge1xuICAgIGxldCB0b29sYmFyRmFjdG9yeTtcbiAgICBpZiAodG9vbGJhclJlZ2lzdHJ5KSB7XG4gICAgICAgIHRvb2xiYXJSZWdpc3RyeS5yZWdpc3RlckZhY3RvcnkoRkFDVE9SWV9UU1YsICdkZWxpbWl0ZXInLCB3aWRnZXQgPT4gbmV3IENTVkRlbGltaXRlcih7XG4gICAgICAgICAgICB3aWRnZXQ6IHdpZGdldC5jb250ZW50LFxuICAgICAgICAgICAgdHJhbnNsYXRvclxuICAgICAgICB9KSk7XG4gICAgICAgIGlmIChzZXR0aW5nUmVnaXN0cnkpIHtcbiAgICAgICAgICAgIHRvb2xiYXJGYWN0b3J5ID0gY3JlYXRlVG9vbGJhckZhY3RvcnkodG9vbGJhclJlZ2lzdHJ5LCBzZXR0aW5nUmVnaXN0cnksIEZBQ1RPUllfVFNWLCB0c3YuaWQsIHRyYW5zbGF0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGZhY3RvcnkgPSBuZXcgVFNWVmlld2VyRmFjdG9yeSh7XG4gICAgICAgIG5hbWU6IEZBQ1RPUllfVFNWLFxuICAgICAgICBmaWxlVHlwZXM6IFsndHN2J10sXG4gICAgICAgIGRlZmF1bHRGb3I6IFsndHN2J10sXG4gICAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgICB0b29sYmFyRmFjdG9yeSxcbiAgICAgICAgdHJhbnNsYXRvclxuICAgIH0pO1xuICAgIGNvbnN0IHRyYWNrZXIgPSBuZXcgV2lkZ2V0VHJhY2tlcih7XG4gICAgICAgIG5hbWVzcGFjZTogJ3RzdnZpZXdlcidcbiAgICB9KTtcbiAgICAvLyBUaGUgY3VycmVudCBzdHlsZXMgZm9yIHRoZSBkYXRhIGdyaWRzLlxuICAgIGxldCBzdHlsZSA9IFByaXZhdGUuTElHSFRfU1RZTEU7XG4gICAgbGV0IHJlbmRlcmVyQ29uZmlnID0gUHJpdmF0ZS5MSUdIVF9URVhUX0NPTkZJRztcbiAgICBpZiAocmVzdG9yZXIpIHtcbiAgICAgICAgLy8gSGFuZGxlIHN0YXRlIHJlc3RvcmF0aW9uLlxuICAgICAgICB2b2lkIHJlc3RvcmVyLnJlc3RvcmUodHJhY2tlciwge1xuICAgICAgICAgICAgY29tbWFuZDogJ2RvY21hbmFnZXI6b3BlbicsXG4gICAgICAgICAgICBhcmdzOiB3aWRnZXQgPT4gKHsgcGF0aDogd2lkZ2V0LmNvbnRleHQucGF0aCwgZmFjdG9yeTogRkFDVE9SWV9UU1YgfSksXG4gICAgICAgICAgICBuYW1lOiB3aWRnZXQgPT4gd2lkZ2V0LmNvbnRleHQucGF0aFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXBwLmRvY1JlZ2lzdHJ5LmFkZFdpZGdldEZhY3RvcnkoZmFjdG9yeSk7XG4gICAgY29uc3QgZnQgPSBhcHAuZG9jUmVnaXN0cnkuZ2V0RmlsZVR5cGUoJ3RzdicpO1xuICAgIGZhY3Rvcnkud2lkZ2V0Q3JlYXRlZC5jb25uZWN0KChzZW5kZXIsIHdpZGdldCkgPT4ge1xuICAgICAgICAvLyBUcmFjayB0aGUgd2lkZ2V0LlxuICAgICAgICB2b2lkIHRyYWNrZXIuYWRkKHdpZGdldCk7XG4gICAgICAgIC8vIE5vdGlmeSB0aGUgd2lkZ2V0IHRyYWNrZXIgaWYgcmVzdG9yZSBkYXRhIG5lZWRzIHRvIHVwZGF0ZS5cbiAgICAgICAgd2lkZ2V0LmNvbnRleHQucGF0aENoYW5nZWQuY29ubmVjdCgoKSA9PiB7XG4gICAgICAgICAgICB2b2lkIHRyYWNrZXIuc2F2ZSh3aWRnZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGZ0KSB7XG4gICAgICAgICAgICB3aWRnZXQudGl0bGUuaWNvbiA9IGZ0Lmljb247XG4gICAgICAgICAgICB3aWRnZXQudGl0bGUuaWNvbkNsYXNzID0gZnQuaWNvbkNsYXNzO1xuICAgICAgICAgICAgd2lkZ2V0LnRpdGxlLmljb25MYWJlbCA9IGZ0Lmljb25MYWJlbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgdGhlIHRoZW1lIGZvciB0aGUgbmV3IHdpZGdldC5cbiAgICAgICAgd2lkZ2V0LmNvbnRlbnQuc3R5bGUgPSBzdHlsZTtcbiAgICAgICAgd2lkZ2V0LmNvbnRlbnQucmVuZGVyZXJDb25maWcgPSByZW5kZXJlckNvbmZpZztcbiAgICB9KTtcbiAgICAvLyBLZWVwIHRoZSB0aGVtZXMgdXAtdG8tZGF0ZS5cbiAgICBjb25zdCB1cGRhdGVUaGVtZXMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzTGlnaHQgPSB0aGVtZU1hbmFnZXIgJiYgdGhlbWVNYW5hZ2VyLnRoZW1lXG4gICAgICAgICAgICA/IHRoZW1lTWFuYWdlci5pc0xpZ2h0KHRoZW1lTWFuYWdlci50aGVtZSlcbiAgICAgICAgICAgIDogdHJ1ZTtcbiAgICAgICAgc3R5bGUgPSBpc0xpZ2h0ID8gUHJpdmF0ZS5MSUdIVF9TVFlMRSA6IFByaXZhdGUuREFSS19TVFlMRTtcbiAgICAgICAgcmVuZGVyZXJDb25maWcgPSBpc0xpZ2h0XG4gICAgICAgICAgICA/IFByaXZhdGUuTElHSFRfVEVYVF9DT05GSUdcbiAgICAgICAgICAgIDogUHJpdmF0ZS5EQVJLX1RFWFRfQ09ORklHO1xuICAgICAgICB0cmFja2VyLmZvckVhY2goZ3JpZCA9PiB7XG4gICAgICAgICAgICBncmlkLmNvbnRlbnQuc3R5bGUgPSBzdHlsZTtcbiAgICAgICAgICAgIGdyaWQuY29udGVudC5yZW5kZXJlckNvbmZpZyA9IHJlbmRlcmVyQ29uZmlnO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGlmICh0aGVtZU1hbmFnZXIpIHtcbiAgICAgICAgdGhlbWVNYW5hZ2VyLnRoZW1lQ2hhbmdlZC5jb25uZWN0KHVwZGF0ZVRoZW1lcyk7XG4gICAgfVxuICAgIGlmIChtYWluTWVudSkge1xuICAgICAgICBhZGRNZW51RW50cmllcyhtYWluTWVudSwgdHJhY2tlciwgdHJhbnNsYXRvcik7XG4gICAgfVxuICAgIGlmIChzZWFyY2hyZWdpc3RyeSkge1xuICAgICAgICBzZWFyY2hyZWdpc3RyeS5yZWdpc3RlcigndHN2JywgQ1NWU2VhcmNoUHJvdmlkZXIpO1xuICAgIH1cbn1cbi8qKlxuICogRXhwb3J0IHRoZSBwbHVnaW5zIGFzIGRlZmF1bHQuXG4gKi9cbmNvbnN0IHBsdWdpbnMgPSBbY3N2LCB0c3ZdO1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2lucztcbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIHByaXZhdGUgZGF0YS5cbiAqL1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbGlnaHQgdGhlbWUgZm9yIHRoZSBkYXRhIGdyaWQuXG4gICAgICovXG4gICAgUHJpdmF0ZS5MSUdIVF9TVFlMRSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgRGF0YUdyaWQuZGVmYXVsdFN0eWxlKSwgeyB2b2lkQ29sb3I6ICcjRjNGM0YzJywgYmFja2dyb3VuZENvbG9yOiAnd2hpdGUnLCBoZWFkZXJCYWNrZ3JvdW5kQ29sb3I6ICcjRUVFRUVFJywgZ3JpZExpbmVDb2xvcjogJ3JnYmEoMjAsIDIwLCAyMCwgMC4xNSknLCBoZWFkZXJHcmlkTGluZUNvbG9yOiAncmdiYSgyMCwgMjAsIDIwLCAwLjI1KScsIHJvd0JhY2tncm91bmRDb2xvcjogaSA9PiAoaSAlIDIgPT09IDAgPyAnI0Y1RjVGNScgOiAnd2hpdGUnKSB9KTtcbiAgICAvKipcbiAgICAgKiBUaGUgZGFyayB0aGVtZSBmb3IgdGhlIGRhdGEgZ3JpZC5cbiAgICAgKi9cbiAgICBQcml2YXRlLkRBUktfU1RZTEUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIERhdGFHcmlkLmRlZmF1bHRTdHlsZSksIHsgdm9pZENvbG9yOiAnYmxhY2snLCBiYWNrZ3JvdW5kQ29sb3I6ICcjMTExMTExJywgaGVhZGVyQmFja2dyb3VuZENvbG9yOiAnIzQyNDI0MicsIGdyaWRMaW5lQ29sb3I6ICdyZ2JhKDIzNSwgMjM1LCAyMzUsIDAuMTUpJywgaGVhZGVyR3JpZExpbmVDb2xvcjogJ3JnYmEoMjM1LCAyMzUsIDIzNSwgMC4yNSknLCByb3dCYWNrZ3JvdW5kQ29sb3I6IGkgPT4gKGkgJSAyID09PSAwID8gJyMyMTIxMjEnIDogJyMxMTExMTEnKSB9KTtcbiAgICAvKipcbiAgICAgKiBUaGUgbGlnaHQgY29uZmlnIGZvciB0aGUgZGF0YSBncmlkIHJlbmRlcmVyLlxuICAgICAqL1xuICAgIFByaXZhdGUuTElHSFRfVEVYVF9DT05GSUcgPSB7XG4gICAgICAgIHRleHRDb2xvcjogJyMxMTExMTEnLFxuICAgICAgICBtYXRjaEJhY2tncm91bmRDb2xvcjogJyNGRkZGRTAnLFxuICAgICAgICBjdXJyZW50TWF0Y2hCYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRjAwJyxcbiAgICAgICAgaG9yaXpvbnRhbEFsaWdubWVudDogJ3JpZ2h0J1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIGRhcmsgY29uZmlnIGZvciB0aGUgZGF0YSBncmlkIHJlbmRlcmVyLlxuICAgICAqL1xuICAgIFByaXZhdGUuREFSS19URVhUX0NPTkZJRyA9IHtcbiAgICAgICAgdGV4dENvbG9yOiAnI0Y1RjVGNScsXG4gICAgICAgIG1hdGNoQmFja2dyb3VuZENvbG9yOiAnIzgzODQyMycsXG4gICAgICAgIGN1cnJlbnRNYXRjaEJhY2tncm91bmRDb2xvcjogJyNBMzgwN0EnLFxuICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiAncmlnaHQnXG4gICAgfTtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgQ1NWVmlld2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY3N2dmlld2VyJztcbmltcG9ydCB7IERvY3VtZW50V2lkZ2V0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvZG9jcmVnaXN0cnknO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuZXhwb3J0IGNsYXNzIENTVlNlYXJjaFByb3ZpZGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBzYW1lIGxpc3Qgb2YgbWF0Y2hlcyBwcm92aWRlZCBieSB0aGUgc3RhcnRRdWVyeSBwcm9taXNlIHJlc29sdXRpb25cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIHNlbGVjdGVkIG1hdGNoLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jdXJyZW50TWF0Y2hJbmRleCA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdG8gdHJ1ZSBpZiB0aGUgd2lkZ2V0IHVuZGVyIHNlYXJjaCBpcyByZWFkLW9ubHksIGZhbHNlXG4gICAgICAgICAqIGlmIGl0IGlzIGVkaXRhYmxlLiAgV2lsbCBiZSB1c2VkIHRvIGRldGVybWluZSB3aGV0aGVyIHRvIHNob3dcbiAgICAgICAgICogdGhlIHJlcGxhY2Ugb3B0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc1JlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcG9ydCB3aGV0aGVyIG9yIG5vdCB0aGlzIHByb3ZpZGVyIGhhcyB0aGUgYWJpbGl0eSB0byBzZWFyY2ggb24gdGhlIGdpdmVuIG9iamVjdFxuICAgICAqL1xuICAgIHN0YXRpYyBjYW5TZWFyY2hPbihkb21haW4pIHtcbiAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZSBDU1ZTZWFyY2hQcm92aWRlciBjYW4gc2VhcmNoIG9uIHRoZVxuICAgICAgICAvLyBmaXJzdCBjZWxsLCBmYWxzZSBpbmRpY2F0ZXMgYW5vdGhlciBlZGl0b3IgaXMgcHJlc2VudFxuICAgICAgICByZXR1cm4gKGRvbWFpbiBpbnN0YW5jZW9mIERvY3VtZW50V2lkZ2V0ICYmIGRvbWFpbi5jb250ZW50IGluc3RhbmNlb2YgQ1NWVmlld2VyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGFuIGluaXRpYWwgcXVlcnkgdmFsdWUgaWYgYXBwbGljYWJsZSBzbyB0aGF0IGl0IGNhbiBiZSBlbnRlcmVkXG4gICAgICogaW50byB0aGUgc2VhcmNoIGJveCBhcyBhbiBpbml0aWFsIHF1ZXJ5XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBJbml0aWFsIHZhbHVlIHVzZWQgdG8gcG9wdWxhdGUgdGhlIHNlYXJjaCBib3guXG4gICAgICovXG4gICAgZ2V0SW5pdGlhbFF1ZXJ5KHNlYXJjaFRhcmdldCkge1xuICAgICAgICAvLyBDU1YgVmlld2VyIGRvZXMgbm90IHN1cHBvcnQgc2VsZWN0aW9uXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBzZWFyY2ggdXNpbmcgdGhlIHByb3ZpZGVkIG9wdGlvbnMuICBTaG91bGQgdXBkYXRlIHRoZSBVSVxuICAgICAqIHRvIGhpZ2hsaWdodCBhbGwgbWF0Y2hlcyBhbmQgXCJzZWxlY3RcIiB3aGF0ZXZlciB0aGUgZmlyc3QgbWF0Y2ggc2hvdWxkIGJlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHF1ZXJ5IEEgUmVnRXhwIHRvIGJlIHVzZSB0byBwZXJmb3JtIHRoZSBzZWFyY2hcbiAgICAgKiBAcGFyYW0gc2VhcmNoVGFyZ2V0IFRoZSB3aWRnZXQgdG8gYmUgc2VhcmNoZWRcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYSBsaXN0IG9mIGFsbCBtYXRjaGVzXG4gICAgICovXG4gICAgYXN5bmMgc3RhcnRRdWVyeShxdWVyeSwgc2VhcmNoVGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuX3RhcmdldCA9IHNlYXJjaFRhcmdldDtcbiAgICAgICAgdGhpcy5fcXVlcnkgPSBxdWVyeTtcbiAgICAgICAgc2VhcmNoVGFyZ2V0LmNvbnRlbnQuc2VhcmNoU2VydmljZS5maW5kKHF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hlcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHN0YXRlIG9mIGEgc2VhcmNoIHByb3ZpZGVyIHRvIHByZXBhcmUgZm9yIHN0YXJ0UXVlcnkgdG8gYmUgY2FsbGVkXG4gICAgICogaW4gb3JkZXIgdG8gc3RhcnQgYSBuZXcgcXVlcnkgb3IgcmVmcmVzaCBhbiBleGlzdGluZyBvbmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzZWFyY2ggcHJvdmlkZXIgaXMgcmVhZHkgdG9cbiAgICAgKiBiZWdpbiBhIG5ldyBzZWFyY2guXG4gICAgICovXG4gICAgYXN5bmMgZW5kUXVlcnkoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldC5jb250ZW50LnNlYXJjaFNlcnZpY2UuY2xlYXIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzZXRzIFVJIHN0YXRlIGFzIGl0IHdhcyBiZWZvcmUgdGhlIHNlYXJjaCBwcm9jZXNzIGJlZ2FuLiAgQ2xlYW5zIHVwIGFuZFxuICAgICAqIGRpc3Bvc2VzIG9mIGFsbCBpbnRlcm5hbCBzdGF0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gYWxsIHN0YXRlIGhhcyBiZWVuIGNsZWFuZWQgdXAuXG4gICAgICovXG4gICAgYXN5bmMgZW5kU2VhcmNoKCkge1xuICAgICAgICB0aGlzLl90YXJnZXQuY29udGVudC5zZWFyY2hTZXJ2aWNlLmNsZWFyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1vdmUgdGhlIGN1cnJlbnQgbWF0Y2ggaW5kaWNhdG9yIHRvIHRoZSBuZXh0IG1hdGNoLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgb25jZSB0aGUgYWN0aW9uIGhhcyBjb21wbGV0ZWQuXG4gICAgICovXG4gICAgYXN5bmMgaGlnaGxpZ2h0TmV4dCgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0LmNvbnRlbnQuc2VhcmNoU2VydmljZS5maW5kKHRoaXMuX3F1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTW92ZSB0aGUgY3VycmVudCBtYXRjaCBpbmRpY2F0b3IgdG8gdGhlIHByZXZpb3VzIG1hdGNoLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgb25jZSB0aGUgYWN0aW9uIGhhcyBjb21wbGV0ZWQuXG4gICAgICovXG4gICAgYXN5bmMgaGlnaGxpZ2h0UHJldmlvdXMoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldC5jb250ZW50LnNlYXJjaFNlcnZpY2UuZmluZCh0aGlzLl9xdWVyeSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcGxhY2UgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBtYXRjaCB3aXRoIHRoZSBwcm92aWRlZCB0ZXh0XG4gICAgICogTm90IGltcGxlbWVudGVkIGluIHRoZSBDU1Ygdmlld2VyIGFzIGl0IGlzIHJlYWQtb25seS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIG9uY2UgdGhlIGFjdGlvbiBoYXMgY29tcGxldGVkLlxuICAgICAqL1xuICAgIGFzeW5jIHJlcGxhY2VDdXJyZW50TWF0Y2gobmV3VGV4dCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcGxhY2UgYWxsIG1hdGNoZXMgaW4gdGhlIG5vdGVib29rIHdpdGggdGhlIHByb3ZpZGVkIHRleHRcbiAgICAgKiBOb3QgaW1wbGVtZW50ZWQgaW4gdGhlIENTViB2aWV3ZXIgYXMgaXQgaXMgcmVhZC1vbmx5LlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgb25jZSB0aGUgYWN0aW9uIGhhcyBjb21wbGV0ZWQuXG4gICAgICovXG4gICAgYXN5bmMgcmVwbGFjZUFsbE1hdGNoZXMobmV3VGV4dCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNpZ25hbCBpbmRpY2F0aW5nIHRoYXQgc29tZXRoaW5nIGluIHRoZSBzZWFyY2ggaGFzIGNoYW5nZWQsIHNvIHRoZSBVSSBzaG91bGQgdXBkYXRlXG4gICAgICovXG4gICAgZ2V0IGNoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFuZ2VkO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlYXJjaHByb3ZpZGVyLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=