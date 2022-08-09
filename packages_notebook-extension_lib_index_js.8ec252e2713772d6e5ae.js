(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_notebook-extension_lib_index_js"],{

/***/ "../../packages/notebook-extension/lib/index.js":
/*!******************************************************!*\
  !*** ../../packages/notebook-extension/lib/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "commandEditItem": () => (/* binding */ commandEditItem),
/* harmony export */   "executionIndicator": () => (/* binding */ executionIndicator),
/* harmony export */   "exportPlugin": () => (/* binding */ exportPlugin),
/* harmony export */   "notebookTrustItem": () => (/* binding */ notebookTrustItem),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/cells */ "webpack/sharing/consume/default/@jupyterlab/cells/@jupyterlab/cells");
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/docmanager */ "webpack/sharing/consume/default/@jupyterlab/docmanager/@jupyterlab/docmanager");
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_docmanager_extension__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/docmanager-extension */ "webpack/sharing/consume/default/@jupyterlab/docmanager-extension/@jupyterlab/docmanager-extension");
/* harmony import */ var _jupyterlab_docmanager_extension__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docmanager_extension__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jupyterlab/filebrowser */ "webpack/sharing/consume/default/@jupyterlab/filebrowser/@jupyterlab/filebrowser");
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jupyterlab/launcher */ "webpack/sharing/consume/default/@jupyterlab/launcher/@jupyterlab/launcher");
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jupyterlab/mainmenu */ "webpack/sharing/consume/default/@jupyterlab/mainmenu/@jupyterlab/mainmenu");
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _jupyterlab_property_inspector__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jupyterlab/property-inspector */ "webpack/sharing/consume/default/@jupyterlab/property-inspector/@jupyterlab/property-inspector");
/* harmony import */ var _jupyterlab_property_inspector__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_property_inspector__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @jupyterlab/statedb */ "webpack/sharing/consume/default/@jupyterlab/statedb/@jupyterlab/statedb");
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @jupyterlab/statusbar */ "webpack/sharing/consume/default/@jupyterlab/statusbar/@jupyterlab/statusbar");
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable?7038");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @lumino/messaging */ "webpack/sharing/consume/default/@lumino/messaging/@lumino/messaging?790d");
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_lumino_messaging__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _nboutput__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./nboutput */ "../../packages/notebook-extension/lib/nboutput.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module notebook-extension
 */
























/**
 * The command IDs used by the notebook plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.createNew = 'notebook:create-new';
    CommandIDs.interrupt = 'notebook:interrupt-kernel';
    CommandIDs.restart = 'notebook:restart-kernel';
    CommandIDs.restartClear = 'notebook:restart-clear-output';
    CommandIDs.restartAndRunToSelected = 'notebook:restart-and-run-to-selected';
    CommandIDs.restartRunAll = 'notebook:restart-run-all';
    CommandIDs.reconnectToKernel = 'notebook:reconnect-to-kernel';
    CommandIDs.changeKernel = 'notebook:change-kernel';
    CommandIDs.createConsole = 'notebook:create-console';
    CommandIDs.createOutputView = 'notebook:create-output-view';
    CommandIDs.clearAllOutputs = 'notebook:clear-all-cell-outputs';
    CommandIDs.closeAndShutdown = 'notebook:close-and-shutdown';
    CommandIDs.trust = 'notebook:trust';
    CommandIDs.exportToFormat = 'notebook:export-to-format';
    CommandIDs.run = 'notebook:run-cell';
    CommandIDs.runAndAdvance = 'notebook:run-cell-and-select-next';
    CommandIDs.runAndInsert = 'notebook:run-cell-and-insert-below';
    CommandIDs.runInConsole = 'notebook:run-in-console';
    CommandIDs.runAll = 'notebook:run-all-cells';
    CommandIDs.runAllAbove = 'notebook:run-all-above';
    CommandIDs.runAllBelow = 'notebook:run-all-below';
    CommandIDs.renderAllMarkdown = 'notebook:render-all-markdown';
    CommandIDs.toCode = 'notebook:change-cell-to-code';
    CommandIDs.toMarkdown = 'notebook:change-cell-to-markdown';
    CommandIDs.toRaw = 'notebook:change-cell-to-raw';
    CommandIDs.cut = 'notebook:cut-cell';
    CommandIDs.copy = 'notebook:copy-cell';
    CommandIDs.pasteAbove = 'notebook:paste-cell-above';
    CommandIDs.pasteBelow = 'notebook:paste-cell-below';
    CommandIDs.duplicateBelow = 'notebook:duplicate-below';
    CommandIDs.pasteAndReplace = 'notebook:paste-and-replace-cell';
    CommandIDs.moveUp = 'notebook:move-cell-up';
    CommandIDs.moveDown = 'notebook:move-cell-down';
    CommandIDs.clearOutputs = 'notebook:clear-cell-output';
    CommandIDs.deleteCell = 'notebook:delete-cell';
    CommandIDs.insertAbove = 'notebook:insert-cell-above';
    CommandIDs.insertBelow = 'notebook:insert-cell-below';
    CommandIDs.selectAbove = 'notebook:move-cursor-up';
    CommandIDs.selectBelow = 'notebook:move-cursor-down';
    CommandIDs.extendAbove = 'notebook:extend-marked-cells-above';
    CommandIDs.extendTop = 'notebook:extend-marked-cells-top';
    CommandIDs.extendBelow = 'notebook:extend-marked-cells-below';
    CommandIDs.extendBottom = 'notebook:extend-marked-cells-bottom';
    CommandIDs.selectAll = 'notebook:select-all';
    CommandIDs.deselectAll = 'notebook:deselect-all';
    CommandIDs.editMode = 'notebook:enter-edit-mode';
    CommandIDs.merge = 'notebook:merge-cells';
    CommandIDs.mergeAbove = 'notebook:merge-cell-above';
    CommandIDs.mergeBelow = 'notebook:merge-cell-below';
    CommandIDs.split = 'notebook:split-cell-at-cursor';
    CommandIDs.commandMode = 'notebook:enter-command-mode';
    CommandIDs.toggleAllLines = 'notebook:toggle-all-cell-line-numbers';
    CommandIDs.undoCellAction = 'notebook:undo-cell-action';
    CommandIDs.redoCellAction = 'notebook:redo-cell-action';
    CommandIDs.markdown1 = 'notebook:change-cell-to-heading-1';
    CommandIDs.markdown2 = 'notebook:change-cell-to-heading-2';
    CommandIDs.markdown3 = 'notebook:change-cell-to-heading-3';
    CommandIDs.markdown4 = 'notebook:change-cell-to-heading-4';
    CommandIDs.markdown5 = 'notebook:change-cell-to-heading-5';
    CommandIDs.markdown6 = 'notebook:change-cell-to-heading-6';
    CommandIDs.hideCode = 'notebook:hide-cell-code';
    CommandIDs.showCode = 'notebook:show-cell-code';
    CommandIDs.hideAllCode = 'notebook:hide-all-cell-code';
    CommandIDs.showAllCode = 'notebook:show-all-cell-code';
    CommandIDs.hideOutput = 'notebook:hide-cell-outputs';
    CommandIDs.showOutput = 'notebook:show-cell-outputs';
    CommandIDs.hideAllOutputs = 'notebook:hide-all-cell-outputs';
    CommandIDs.showAllOutputs = 'notebook:show-all-cell-outputs';
    CommandIDs.toggleRenderSideBySideCurrentNotebook = 'notebook:toggle-render-side-by-side-current';
    CommandIDs.setSideBySideRatio = 'notebook:set-side-by-side-ratio';
    CommandIDs.enableOutputScrolling = 'notebook:enable-output-scrolling';
    CommandIDs.disableOutputScrolling = 'notebook:disable-output-scrolling';
    CommandIDs.selectLastRunCell = 'notebook:select-last-run-cell';
    CommandIDs.replaceSelection = 'notebook:replace-selection';
    CommandIDs.autoClosingBrackets = 'notebook:toggle-autoclosing-brackets';
    CommandIDs.toggleCollapseCmd = 'Collapsible_Headings:Toggle_Collapse';
    CommandIDs.collapseAllCmd = 'Collapsible_Headings:Collapse_All';
    CommandIDs.expandAllCmd = 'Collapsible_Headings:Expand_All';
    CommandIDs.copyToClipboard = 'notebook:copy-to-clipboard';
})(CommandIDs || (CommandIDs = {}));
/**
 * The name of the factory that creates notebooks.
 */
const FACTORY = 'Notebook';
/**
 * The excluded Export To ...
 * (returned from nbconvert's export list)
 */
const FORMAT_EXCLUDE = ['notebook', 'python', 'custom'];
/**
 * Setting Id storing the customized toolbar definition.
 */
const PANEL_SETTINGS = '@jupyterlab/notebook-extension:panel';
/**
 * The id to use on the style tag for the side by side margins.
 */
const SIDE_BY_SIDE_STYLE_ID = 'jp-NotebookExtension-sideBySideMargins';
/**
 * The notebook widget tracker provider.
 */
const trackerPlugin = {
    id: '@jupyterlab/notebook-extension:tracker',
    provides: _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.INotebookTracker,
    requires: [_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.INotebookWidgetFactory, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_16__.ITranslator],
    optional: [
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette,
        _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_7__.IFileBrowserFactory,
        _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_8__.ILauncher,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer,
        _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_9__.IMainMenu,
        _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_13__.ISettingRegistry,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ISessionContextDialogs
    ],
    activate: activateNotebookHandler,
    autoStart: true
};
/**
 * The notebook cell factory provider.
 */
const factory = {
    id: '@jupyterlab/notebook-extension:factory',
    provides: _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookPanel.IContentFactory,
    requires: [_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_3__.IEditorServices],
    autoStart: true,
    activate: (app, editorServices) => {
        const editorFactory = editorServices.factoryService.newInlineEditor;
        return new _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookPanel.ContentFactory({ editorFactory });
    }
};
/**
 * The notebook tools extension.
 */
const tools = {
    activate: activateNotebookTools,
    provides: _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.INotebookTools,
    id: '@jupyterlab/notebook-extension:tools',
    autoStart: true,
    requires: [_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.INotebookTracker, _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_3__.IEditorServices, _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_14__.IStateDB, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_16__.ITranslator],
    optional: [_jupyterlab_property_inspector__WEBPACK_IMPORTED_MODULE_11__.IPropertyInspectorProvider]
};
/**
 * A plugin providing a CommandEdit status item.
 */
const commandEditItem = {
    id: '@jupyterlab/notebook-extension:mode-status',
    autoStart: true,
    requires: [_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.INotebookTracker, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_16__.ITranslator],
    optional: [_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_15__.IStatusBar],
    activate: (app, tracker, translator, statusBar) => {
        if (!statusBar) {
            // Automatically disable if statusbar missing
            return;
        }
        const { shell } = app;
        const item = new _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.CommandEditStatus(translator);
        // Keep the status item up-to-date with the current notebook.
        tracker.currentChanged.connect(() => {
            const current = tracker.currentWidget;
            item.model.notebook = current && current.content;
        });
        statusBar.registerStatusItem('@jupyterlab/notebook-extension:mode-status', {
            item,
            align: 'right',
            rank: 4,
            isActive: () => !!shell.currentWidget &&
                !!tracker.currentWidget &&
                shell.currentWidget === tracker.currentWidget
        });
    }
};
/**
 * A plugin that provides a execution indicator item to the status bar.
 */
const executionIndicator = {
    id: '@jupyterlab/notebook-extension:execution-indicator',
    autoStart: true,
    requires: [_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.INotebookTracker, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_16__.ITranslator],
    optional: [_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_15__.IStatusBar, _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_13__.ISettingRegistry],
    activate: (app, notebookTracker, labShell, translator, statusBar, settingRegistry) => {
        let statusbarItem;
        let labShellCurrentChanged;
        let statusBarDisposable;
        const updateSettings = (settings) => {
            var _a, _b;
            let { showOnToolBar, showProgress } = settings;
            if (!showOnToolBar) {
                // Status bar mode, only one `ExecutionIndicator` is needed.
                if (!statusBar) {
                    // Automatically disable if statusbar missing
                    return;
                }
                if (!(statusbarItem === null || statusbarItem === void 0 ? void 0 : statusbarItem.model)) {
                    statusbarItem = new _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.ExecutionIndicator(translator);
                    labShellCurrentChanged = (_, change) => {
                        const { newValue } = change;
                        if (newValue && notebookTracker.has(newValue)) {
                            const panel = newValue;
                            statusbarItem.model.attachNotebook({
                                content: panel.content,
                                context: panel.sessionContext
                            });
                        }
                    };
                    statusBarDisposable = statusBar.registerStatusItem('@jupyterlab/notebook-extension:execution-indicator', {
                        item: statusbarItem,
                        align: 'left',
                        rank: 3,
                        isActive: () => {
                            const current = labShell.currentWidget;
                            return !!current && notebookTracker.has(current);
                        }
                    });
                    statusbarItem.model.attachNotebook({
                        content: (_a = notebookTracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content,
                        context: (_b = notebookTracker.currentWidget) === null || _b === void 0 ? void 0 : _b.sessionContext
                    });
                    labShell.currentChanged.connect(labShellCurrentChanged);
                    statusbarItem.disposed.connect(() => {
                        labShell.currentChanged.disconnect(labShellCurrentChanged);
                    });
                }
                statusbarItem.model.displayOption = {
                    showOnToolBar,
                    showProgress
                };
            }
            else {
                //Remove old indicator widget on status bar
                if (statusBarDisposable) {
                    labShell.currentChanged.disconnect(labShellCurrentChanged);
                    statusBarDisposable.dispose();
                }
            }
        };
        if (settingRegistry) {
            // Indicator is default in tool bar, user needs to specify its
            // position in settings in order to have indicator on status bar.
            const loadSettings = settingRegistry.load(trackerPlugin.id);
            Promise.all([loadSettings, app.restored])
                .then(([settings]) => {
                updateSettings(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.ExecutionIndicator.getSettingValue(settings));
                settings.changed.connect(sender => updateSettings(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.ExecutionIndicator.getSettingValue(sender)));
            })
                .catch((reason) => {
                console.error(reason.message);
            });
        }
    }
};
/**
 * A plugin providing export commands in the main menu and command palette
 */
const exportPlugin = {
    id: '@jupyterlab/notebook-extension:export',
    autoStart: true,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_16__.ITranslator, _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.INotebookTracker],
    optional: [_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_9__.IMainMenu, _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette],
    activate: (app, translator, tracker, mainMenu, palette) => {
        var _a;
        const trans = translator.load('jupyterlab');
        const { commands, shell } = app;
        const services = app.serviceManager;
        const isEnabled = () => {
            return Private.isEnabled(shell, tracker);
        };
        commands.addCommand(CommandIDs.exportToFormat, {
            label: args => {
                const formatLabel = args['label'];
                return args['isPalette']
                    ? trans.__('Save and Export Notebook: %1', formatLabel)
                    : formatLabel;
            },
            execute: args => {
                const current = getCurrent(tracker, shell, args);
                if (!current) {
                    return;
                }
                const url = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_4__.PageConfig.getNBConvertURL({
                    format: args['format'],
                    download: true,
                    path: current.context.path
                });
                const { context } = current;
                if (context.model.dirty && !context.model.readOnly) {
                    return context.save().then(() => {
                        window.open(url, '_blank', 'noopener');
                    });
                }
                return new Promise(resolve => {
                    window.open(url, '_blank', 'noopener');
                    resolve(undefined);
                });
            },
            isEnabled
        });
        // Add a notebook group to the File menu.
        let exportTo;
        if (mainMenu) {
            exportTo = (_a = mainMenu.fileMenu.items.find(item => {
                var _a;
                return item.type === 'submenu' &&
                    ((_a = item.submenu) === null || _a === void 0 ? void 0 : _a.id) === 'jp-mainmenu-file-notebookexport';
            })) === null || _a === void 0 ? void 0 : _a.submenu;
        }
        void services.nbconvert.getExportFormats().then(response => {
            if (response) {
                const formatLabels = Private.getFormatLabels(translator);
                // Convert export list to palette and menu items.
                const formatList = Object.keys(response);
                formatList.forEach(function (key) {
                    const capCaseKey = trans.__(key[0].toUpperCase() + key.substr(1));
                    const labelStr = formatLabels[key] ? formatLabels[key] : capCaseKey;
                    let args = {
                        format: key,
                        label: labelStr,
                        isPalette: false
                    };
                    if (FORMAT_EXCLUDE.indexOf(key) === -1) {
                        if (exportTo) {
                            exportTo.addItem({
                                command: CommandIDs.exportToFormat,
                                args: args
                            });
                        }
                        if (palette) {
                            args = {
                                format: key,
                                label: labelStr,
                                isPalette: true
                            };
                            const category = trans.__('Notebook Operations');
                            palette.addItem({
                                command: CommandIDs.exportToFormat,
                                category,
                                args
                            });
                        }
                    }
                });
            }
        });
    }
};
/**
 * A plugin that adds a notebook trust status item to the status bar.
 */
const notebookTrustItem = {
    id: '@jupyterlab/notebook-extension:trust-status',
    autoStart: true,
    requires: [_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.INotebookTracker, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_16__.ITranslator],
    optional: [_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_15__.IStatusBar],
    activate: (app, tracker, tranlator, statusBar) => {
        if (!statusBar) {
            // Automatically disable if statusbar missing
            return;
        }
        const { shell } = app;
        const item = new _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookTrustStatus(tranlator);
        // Keep the status item up-to-date with the current notebook.
        tracker.currentChanged.connect(() => {
            const current = tracker.currentWidget;
            item.model.notebook = current && current.content;
        });
        statusBar.registerStatusItem('@jupyterlab/notebook-extension:trust-status', {
            item,
            align: 'right',
            rank: 3,
            isActive: () => !!shell.currentWidget &&
                !!tracker.currentWidget &&
                shell.currentWidget === tracker.currentWidget
        });
    }
};
/**
 * The notebook widget factory provider.
 */
const widgetFactoryPlugin = {
    id: '@jupyterlab/notebook-extension:widget-factory',
    provides: _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.INotebookWidgetFactory,
    requires: [
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookPanel.IContentFactory,
        _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_3__.IEditorServices,
        _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_12__.IRenderMimeRegistry,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ISessionContextDialogs,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IToolbarWidgetRegistry,
        _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_16__.ITranslator
    ],
    optional: [_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_13__.ISettingRegistry],
    activate: activateWidgetFactory,
    autoStart: true
};
/**
 * The cloned output provider.
 */
const clonedOutputsPlugin = {
    id: '@jupyterlab/notebook-extension:cloned-outputs',
    requires: [_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_5__.IDocumentManager, _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.INotebookTracker, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_16__.ITranslator],
    optional: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer],
    activate: activateClonedOutputs,
    autoStart: true
};
/**
 * A plugin for code consoles functionalities.
 */
const codeConsolePlugin = {
    id: '@jupyterlab/notebook-extension:code-console',
    requires: [_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.INotebookTracker, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_16__.ITranslator],
    activate: activateCodeConsole,
    autoStart: true
};
/**
 * A plugin to copy CodeCell outputs.
 */
const copyOutputPlugin = {
    id: '@jupyterlab/notebook-extensions:copy-output',
    activate: activateCopyOutput,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_16__.ITranslator, _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.INotebookTracker],
    autoStart: true
};
/**
 * Export the plugins as default.
 */
const plugins = [
    factory,
    trackerPlugin,
    executionIndicator,
    exportPlugin,
    tools,
    commandEditItem,
    notebookTrustItem,
    widgetFactoryPlugin,
    _nboutput__WEBPACK_IMPORTED_MODULE_23__.logNotebookOutput,
    clonedOutputsPlugin,
    codeConsolePlugin,
    copyOutputPlugin
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);
/**
 * Activate the notebook tools extension.
 */
function activateNotebookTools(app, tracker, editorServices, state, translator, inspectorProvider) {
    const trans = translator.load('jupyterlab');
    const id = 'notebook-tools';
    const notebookTools = new _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookTools({ tracker, translator });
    const activeCellTool = new _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookTools.ActiveCellTool();
    const slideShow = _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookTools.createSlideShowSelector(translator);
    const editorFactory = editorServices.factoryService.newInlineEditor;
    const cellMetadataEditor = new _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookTools.CellMetadataEditorTool({
        editorFactory,
        collapsed: false,
        translator
    });
    const notebookMetadataEditor = new _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookTools.NotebookMetadataEditorTool({
        editorFactory,
        translator
    });
    const services = app.serviceManager;
    // Create message hook for triggers to save to the database.
    const hook = (sender, message) => {
        switch (message.type) {
            case 'activate-request':
                void state.save(id, { open: true });
                break;
            case 'after-hide':
            case 'close-request':
                void state.remove(id);
                break;
            default:
                break;
        }
        return true;
    };
    const optionsMap = {};
    optionsMap.None = null;
    void services.nbconvert.getExportFormats().then(response => {
        if (response) {
            /**
             * The excluded Cell Inspector Raw NbConvert Formats
             * (returned from nbconvert's export list)
             */
            const rawFormatExclude = [
                'pdf',
                'slides',
                'script',
                'notebook',
                'custom'
            ];
            let optionValueArray = [
                [trans.__('PDF'), 'pdf'],
                [trans.__('Slides'), 'slides'],
                [trans.__('Script'), 'script'],
                [trans.__('Notebook'), 'notebook'],
                [trans.__('Custom'), 'custom']
            ];
            // convert exportList to palette and menu items
            const formatList = Object.keys(response);
            const formatLabels = Private.getFormatLabels(translator);
            formatList.forEach(function (key) {
                if (rawFormatExclude.indexOf(key) === -1) {
                    const altOption = trans.__(key[0].toUpperCase() + key.substr(1));
                    const option = formatLabels[key] ? formatLabels[key] : altOption;
                    const mimeTypeValue = response[key].output_mimetype;
                    optionValueArray.push([option, mimeTypeValue]);
                }
            });
            const nbConvert = _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookTools.createNBConvertSelector(optionValueArray, translator);
            notebookTools.addItem({ tool: nbConvert, section: 'common', rank: 3 });
        }
    });
    notebookTools.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_17__.buildIcon;
    notebookTools.title.caption = trans.__('Notebook Tools');
    notebookTools.id = id;
    notebookTools.addItem({ tool: activeCellTool, section: 'common', rank: 1 });
    notebookTools.addItem({ tool: slideShow, section: 'common', rank: 2 });
    notebookTools.addItem({
        tool: cellMetadataEditor,
        section: 'advanced',
        rank: 1
    });
    notebookTools.addItem({
        tool: notebookMetadataEditor,
        section: 'advanced',
        rank: 2
    });
    _lumino_messaging__WEBPACK_IMPORTED_MODULE_21__.MessageLoop.installMessageHook(notebookTools, hook);
    if (inspectorProvider) {
        tracker.widgetAdded.connect((sender, panel) => {
            const inspector = inspectorProvider.register(panel);
            inspector.render(notebookTools);
        });
    }
    return notebookTools;
}
/**
 * Activate the notebook widget factory.
 */
function activateWidgetFactory(app, contentFactory, editorServices, rendermime, sessionContextDialogs, toolbarRegistry, translator, settingRegistry) {
    const preferKernelOption = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_4__.PageConfig.getOption('notebookStartsKernel');
    // If the option is not set, assume `true`
    const preferKernelValue = preferKernelOption === '' || preferKernelOption.toLowerCase() === 'true';
    const { commands } = app;
    let toolbarFactory;
    // Register notebook toolbar widgets
    toolbarRegistry.registerFactory(FACTORY, 'save', panel => _jupyterlab_docmanager_extension__WEBPACK_IMPORTED_MODULE_6__.ToolbarItems.createSaveButton(commands, panel.context.fileChanged));
    toolbarRegistry.registerFactory(FACTORY, 'cellType', panel => _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.ToolbarItems.createCellTypeItem(panel, translator));
    toolbarRegistry.registerFactory(FACTORY, 'kernelName', panel => _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Toolbar.createKernelNameItem(panel.sessionContext, sessionContextDialogs, translator));
    toolbarRegistry.registerFactory(FACTORY, 'executionProgress', panel => {
        return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.ExecutionIndicator.createExecutionIndicatorItem(panel, translator, settingRegistry === null || settingRegistry === void 0 ? void 0 : settingRegistry.load(trackerPlugin.id));
    });
    if (settingRegistry) {
        // Create the factory
        toolbarFactory = (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.createToolbarFactory)(toolbarRegistry, settingRegistry, FACTORY, PANEL_SETTINGS, translator);
    }
    const factory = new _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookWidgetFactory({
        name: FACTORY,
        fileTypes: ['notebook'],
        modelName: 'notebook',
        defaultFor: ['notebook'],
        preferKernel: preferKernelValue,
        canStartKernel: true,
        autoStartDefault: true,
        rendermime,
        contentFactory,
        editorConfig: _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.StaticNotebook.defaultEditorConfig,
        notebookConfig: _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.StaticNotebook.defaultNotebookConfig,
        mimeTypeService: editorServices.mimeTypeService,
        sessionDialogs: sessionContextDialogs,
        toolbarFactory,
        translator: translator
    });
    app.docRegistry.addWidgetFactory(factory);
    return factory;
}
/**
 * Activate the plugin to create and track cloned outputs.
 */
function activateClonedOutputs(app, docManager, notebookTracker, translator, restorer) {
    const trans = translator.load('jupyterlab');
    const clonedOutputs = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
        namespace: 'cloned-outputs'
    });
    if (restorer) {
        void restorer.restore(clonedOutputs, {
            command: CommandIDs.createOutputView,
            args: widget => ({
                path: widget.content.path,
                index: widget.content.index
            }),
            name: widget => `${widget.content.path}:${widget.content.index}`,
            when: notebookTracker.restored // After the notebook widgets (but not contents).
        });
    }
    const { commands, shell } = app;
    const isEnabledAndSingleSelected = () => {
        return Private.isEnabledAndSingleSelected(shell, notebookTracker);
    };
    commands.addCommand(CommandIDs.createOutputView, {
        label: trans.__('Create New View for Output'),
        execute: async (args) => {
            var _a;
            let cell;
            let current;
            // If we are given a notebook path and cell index, then
            // use that, otherwise use the current active cell.
            const path = args.path;
            let index = args.index;
            if (path && index !== undefined && index !== null) {
                current = docManager.findWidget(path, FACTORY);
                if (!current) {
                    return;
                }
            }
            else {
                current = notebookTracker.currentWidget;
                if (!current) {
                    return;
                }
                cell = current.content.activeCell;
                index = current.content.activeCellIndex;
            }
            // Create a MainAreaWidget
            const content = new Private.ClonedOutputArea({
                notebook: current,
                cell,
                index,
                translator
            });
            const widget = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MainAreaWidget({ content });
            current.context.addSibling(widget, {
                ref: current.id,
                mode: 'split-bottom'
            });
            const updateCloned = () => {
                void clonedOutputs.save(widget);
            };
            current.context.pathChanged.connect(updateCloned);
            (_a = current.context.model) === null || _a === void 0 ? void 0 : _a.cells.changed.connect(updateCloned);
            // Add the cloned output to the output widget tracker.
            void clonedOutputs.add(widget);
            // Remove the output view if the parent notebook is closed.
            current.content.disposed.connect(() => {
                var _a;
                current.context.pathChanged.disconnect(updateCloned);
                (_a = current.context.model) === null || _a === void 0 ? void 0 : _a.cells.changed.disconnect(updateCloned);
                widget.dispose();
            });
        },
        isEnabled: isEnabledAndSingleSelected
    });
}
/**
 * Activate the plugin to add code console functionalities
 */
function activateCodeConsole(app, tracker, translator) {
    const trans = translator.load('jupyterlab');
    const { commands, shell } = app;
    const isEnabled = () => Private.isEnabled(shell, tracker);
    commands.addCommand(CommandIDs.createConsole, {
        label: trans.__('New Console for Notebook'),
        execute: args => {
            const current = tracker.currentWidget;
            if (!current) {
                return;
            }
            return Private.createConsole(commands, current, args['activate']);
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.runInConsole, {
        label: trans.__('Run Selected Text or Current Line in Console'),
        execute: async (args) => {
            var _a, _b;
            // Default to not activating the notebook (thereby putting the notebook
            // into command mode)
            const current = tracker.currentWidget;
            if (!current) {
                return;
            }
            const { context, content } = current;
            const cell = content.activeCell;
            const metadata = cell === null || cell === void 0 ? void 0 : cell.model.metadata.toJSON();
            const path = context.path;
            // ignore action in non-code cell
            if (!cell || cell.model.type !== 'code') {
                return;
            }
            let code;
            const editor = cell.editor;
            const selection = editor.getSelection();
            const { start, end } = selection;
            const selected = start.column !== end.column || start.line !== end.line;
            if (selected) {
                // Get the selected code from the editor.
                const start = editor.getOffsetAt(selection.start);
                const end = editor.getOffsetAt(selection.end);
                code = editor.model.value.text.substring(start, end);
            }
            else {
                // no selection, find the complete statement around the current line
                const cursor = editor.getCursorPosition();
                const srcLines = editor.model.value.text.split('\n');
                let curLine = selection.start.line;
                while (curLine < editor.lineCount &&
                    !srcLines[curLine].replace(/\s/g, '').length) {
                    curLine += 1;
                }
                // if curLine > 0, we first do a search from beginning
                let fromFirst = curLine > 0;
                let firstLine = 0;
                let lastLine = firstLine + 1;
                // eslint-disable-next-line
                while (true) {
                    code = srcLines.slice(firstLine, lastLine).join('\n');
                    const reply = await ((_b = (_a = current.context.sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel) === null || _b === void 0 ? void 0 : _b.requestIsComplete({
                        // ipython needs an empty line at the end to correctly identify completeness of indented code
                        code: code + '\n\n'
                    }));
                    if ((reply === null || reply === void 0 ? void 0 : reply.content.status) === 'complete') {
                        if (curLine < lastLine) {
                            // we find a block of complete statement containing the current line, great!
                            while (lastLine < editor.lineCount &&
                                !srcLines[lastLine].replace(/\s/g, '').length) {
                                lastLine += 1;
                            }
                            editor.setCursorPosition({
                                line: lastLine,
                                column: cursor.column
                            });
                            break;
                        }
                        else {
                            // discard the complete statement before the current line and continue
                            firstLine = lastLine;
                            lastLine = firstLine + 1;
                        }
                    }
                    else if (lastLine < editor.lineCount) {
                        // if incomplete and there are more lines, add the line and check again
                        lastLine += 1;
                    }
                    else if (fromFirst) {
                        // we search from the first line and failed, we search again from current line
                        firstLine = curLine;
                        lastLine = curLine + 1;
                        fromFirst = false;
                    }
                    else {
                        // if we have searched both from first line and from current line and we
                        // cannot find anything, we submit the current line.
                        code = srcLines[curLine];
                        while (curLine + 1 < editor.lineCount &&
                            !srcLines[curLine + 1].replace(/\s/g, '').length) {
                            curLine += 1;
                        }
                        editor.setCursorPosition({
                            line: curLine + 1,
                            column: cursor.column
                        });
                        break;
                    }
                }
            }
            if (!code) {
                return;
            }
            await commands.execute('console:open', {
                activate: false,
                insertMode: 'split-bottom',
                path
            });
            await commands.execute('console:inject', {
                activate: false,
                code,
                path,
                metadata
            });
        },
        isEnabled
    });
}
/**
 * Activate the output copying extension
 */
function activateCopyOutput(app, translator, tracker) {
    const trans = translator.load('jupyterlab');
    /**
     * Copy the contents of an HTMLElement to the system clipboard
     */
    function copyElement(e) {
        const sel = window.getSelection();
        if (sel == null) {
            return;
        }
        // Save the current selection.
        const savedRanges = [];
        for (let i = 0; i < sel.rangeCount; ++i) {
            savedRanges[i] = sel.getRangeAt(i).cloneRange();
        }
        const range = document.createRange();
        range.selectNodeContents(e);
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('copy');
        // Restore the saved selection.
        sel.removeAllRanges();
        savedRanges.forEach(r => sel.addRange(r));
    }
    app.commands.addCommand(CommandIDs.copyToClipboard, {
        label: trans.__('Copy Output to Clipboard'),
        execute: args => {
            var _a;
            const cell = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content.activeCell;
            if (cell == null) {
                return;
            }
            const output = cell.outputArea.outputTracker.currentWidget;
            if (output == null) {
                return;
            }
            const outputAreaAreas = output.node.getElementsByClassName('jp-OutputArea-output');
            if (outputAreaAreas.length > 0) {
                const area = outputAreaAreas[0];
                copyElement(area);
            }
        }
    });
    app.contextMenu.addItem({
        command: CommandIDs.copyToClipboard,
        selector: '.jp-OutputArea-child',
        rank: 0
    });
}
/**
 * Activate the notebook handler extension.
 */
function activateNotebookHandler(app, factory, translator, palette, browserFactory, launcher, restorer, mainMenu, settingRegistry, sessionDialogs) {
    const trans = translator.load('jupyterlab');
    const services = app.serviceManager;
    const { commands } = app;
    const tracker = new _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookTracker({ namespace: 'notebook' });
    // Fetch settings if possible.
    const fetchSettings = settingRegistry
        ? settingRegistry.load(trackerPlugin.id)
        : Promise.reject(new Error(`No setting registry for ${trackerPlugin.id}`));
    fetchSettings
        .then(settings => {
        updateConfig(settings);
        settings.changed.connect(() => {
            updateConfig(settings);
        });
        commands.addCommand(CommandIDs.autoClosingBrackets, {
            execute: args => {
                var _a;
                const codeConfig = settings.get('codeCellConfig')
                    .composite;
                const markdownConfig = settings.get('markdownCellConfig')
                    .composite;
                const rawConfig = settings.get('rawCellConfig')
                    .composite;
                const anyToggled = codeConfig.autoClosingBrackets ||
                    markdownConfig.autoClosingBrackets ||
                    rawConfig.autoClosingBrackets;
                const toggled = !!((_a = args['force']) !== null && _a !== void 0 ? _a : !anyToggled);
                [
                    codeConfig.autoClosingBrackets,
                    markdownConfig.autoClosingBrackets,
                    rawConfig.autoClosingBrackets
                ] = [toggled, toggled, toggled];
                void settings.set('codeCellConfig', codeConfig);
                void settings.set('markdownCellConfig', markdownConfig);
                void settings.set('rawCellConfig', rawConfig);
            },
            label: trans.__('Auto Close Brackets for All Notebook Cell Types'),
            isToggled: () => ['codeCellConfig', 'markdownCellConfig', 'rawCellConfig'].some(x => settings.get(x).composite.autoClosingBrackets)
        });
    })
        .catch((reason) => {
        console.warn(reason.message);
        updateTracker({
            editorConfig: factory.editorConfig,
            notebookConfig: factory.notebookConfig,
            kernelShutdown: factory.shutdownOnClose
        });
    });
    // Handle state restoration.
    if (restorer) {
        void restorer.restore(tracker, {
            command: 'docmanager:open',
            args: panel => ({ path: panel.context.path, factory: FACTORY }),
            name: panel => panel.context.path,
            when: services.ready
        });
    }
    const registry = app.docRegistry;
    const modelFactory = new _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookModelFactory({
        disableDocumentWideUndoRedo: factory.notebookConfig.disableDocumentWideUndoRedo
    });
    registry.addModelFactory(modelFactory);
    addCommands(app, tracker, translator, sessionDialogs);
    if (palette) {
        populatePalette(palette, translator);
    }
    let id = 0; // The ID counter for notebook panels.
    const ft = app.docRegistry.getFileType('notebook');
    factory.widgetCreated.connect((sender, widget) => {
        var _a, _b;
        // If the notebook panel does not have an ID, assign it one.
        widget.id = widget.id || `notebook-${++id}`;
        // Set up the title icon
        widget.title.icon = ft === null || ft === void 0 ? void 0 : ft.icon;
        widget.title.iconClass = (_a = ft === null || ft === void 0 ? void 0 : ft.iconClass) !== null && _a !== void 0 ? _a : '';
        widget.title.iconLabel = (_b = ft === null || ft === void 0 ? void 0 : ft.iconLabel) !== null && _b !== void 0 ? _b : '';
        // Notify the widget tracker if restore data needs to update.
        widget.context.pathChanged.connect(() => {
            void tracker.save(widget);
        });
        // Add the notebook panel to the tracker.
        void tracker.add(widget);
    });
    /**
     * Update the settings of the current tracker.
     */
    function updateTracker(options) {
        tracker.forEach(widget => {
            widget.setConfig(options);
        });
    }
    /**
     * Update the setting values.
     */
    function updateConfig(settings) {
        const code = Object.assign(Object.assign({}, _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.StaticNotebook.defaultEditorConfig.code), settings.get('codeCellConfig').composite);
        const markdown = Object.assign(Object.assign({}, _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.StaticNotebook.defaultEditorConfig.markdown), settings.get('markdownCellConfig').composite);
        const raw = Object.assign(Object.assign({}, _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.StaticNotebook.defaultEditorConfig.raw), settings.get('rawCellConfig').composite);
        factory.editorConfig = { code, markdown, raw };
        factory.notebookConfig = {
            scrollPastEnd: settings.get('scrollPastEnd').composite,
            defaultCell: settings.get('defaultCell').composite,
            recordTiming: settings.get('recordTiming').composite,
            numberCellsToRenderDirectly: settings.get('numberCellsToRenderDirectly')
                .composite,
            remainingTimeBeforeRescheduling: settings.get('remainingTimeBeforeRescheduling').composite,
            renderCellOnIdle: settings.get('renderCellOnIdle').composite,
            observedTopMargin: settings.get('observedTopMargin').composite,
            observedBottomMargin: settings.get('observedBottomMargin')
                .composite,
            maxNumberOutputs: settings.get('maxNumberOutputs').composite,
            showEditorForReadOnlyMarkdown: settings.get('showEditorForReadOnlyMarkdown').composite,
            disableDocumentWideUndoRedo: settings.get('experimentalDisableDocumentWideUndoRedo').composite,
            renderingLayout: settings.get('renderingLayout').composite,
            sideBySideLeftMarginOverride: settings.get('sideBySideLeftMarginOverride')
                .composite,
            sideBySideRightMarginOverride: settings.get('sideBySideRightMarginOverride').composite
        };
        const sideBySideMarginStyle = `.jp-mod-sideBySide.jp-Notebook .jp-Notebook-cell { 
      margin-left: ${factory.notebookConfig.sideBySideLeftMarginOverride} !important;
      margin-right: ${factory.notebookConfig.sideBySideRightMarginOverride} !important;`;
        const sideBySideMarginTag = document.getElementById(SIDE_BY_SIDE_STYLE_ID);
        if (sideBySideMarginTag) {
            sideBySideMarginTag.innerText = sideBySideMarginStyle;
        }
        else {
            document.head.insertAdjacentHTML('beforeend', `<style id="${SIDE_BY_SIDE_STYLE_ID}">${sideBySideMarginStyle}}</style>`);
        }
        factory.shutdownOnClose = settings.get('kernelShutdown')
            .composite;
        modelFactory.disableDocumentWideUndoRedo = settings.get('experimentalDisableDocumentWideUndoRedo').composite;
        updateTracker({
            editorConfig: factory.editorConfig,
            notebookConfig: factory.notebookConfig,
            kernelShutdown: factory.shutdownOnClose
        });
    }
    // Add main menu notebook menu.
    if (mainMenu) {
        populateMenus(app, mainMenu, tracker, translator, sessionDialogs);
    }
    // Utility function to create a new notebook.
    const createNew = (cwd, kernelName) => {
        return commands
            .execute('docmanager:new-untitled', { path: cwd, type: 'notebook' })
            .then(model => {
            if (model != undefined) {
                return commands.execute('docmanager:open', {
                    path: model.path,
                    factory: FACTORY,
                    kernel: { name: kernelName }
                });
            }
        });
    };
    // Add a command for creating a new notebook.
    commands.addCommand(CommandIDs.createNew, {
        label: args => {
            var _a, _b, _c;
            const kernelName = args['kernelName'] || '';
            if (args['isLauncher'] && args['kernelName'] && services.kernelspecs) {
                return ((_c = (_b = (_a = services.kernelspecs.specs) === null || _a === void 0 ? void 0 : _a.kernelspecs[kernelName]) === null || _b === void 0 ? void 0 : _b.display_name) !== null && _c !== void 0 ? _c : '');
            }
            if (args['isPalette'] || args['isContextMenu']) {
                return trans.__('New Notebook');
            }
            return trans.__('Notebook');
        },
        caption: trans.__('Create a new notebook'),
        icon: args => (args['isPalette'] ? undefined : _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_17__.notebookIcon),
        execute: args => {
            const cwd = args['cwd'] ||
                (browserFactory ? browserFactory.defaultBrowser.model.path : '');
            const kernelName = args['kernelName'] || '';
            return createNew(cwd, kernelName);
        }
    });
    // Add a launcher item if the launcher is available.
    if (launcher) {
        void services.ready.then(() => {
            let disposables = null;
            const onSpecsChanged = () => {
                if (disposables) {
                    disposables.dispose();
                    disposables = null;
                }
                const specs = services.kernelspecs.specs;
                if (!specs) {
                    return;
                }
                disposables = new _lumino_disposable__WEBPACK_IMPORTED_MODULE_20__.DisposableSet();
                for (const name in specs.kernelspecs) {
                    const rank = name === specs.default ? 0 : Infinity;
                    const spec = specs.kernelspecs[name];
                    let kernelIconUrl = spec.resources['logo-64x64'];
                    disposables.add(launcher.add({
                        command: CommandIDs.createNew,
                        args: { isLauncher: true, kernelName: name },
                        category: trans.__('Notebook'),
                        rank,
                        kernelIconUrl,
                        metadata: {
                            kernel: _lumino_coreutils__WEBPACK_IMPORTED_MODULE_19__.JSONExt.deepCopy(spec.metadata || {})
                        }
                    }));
                }
            };
            onSpecsChanged();
            services.kernelspecs.specsChanged.connect(onSpecsChanged);
        });
    }
    return tracker;
}
// Get the current widget and activate unless the args specify otherwise.
function getCurrent(tracker, shell, args) {
    const widget = tracker.currentWidget;
    const activate = args['activate'] !== false;
    if (activate && widget) {
        shell.activateById(widget.id);
    }
    return widget;
}
/**
 * Add the notebook commands to the application's command registry.
 */
function addCommands(app, tracker, translator, sessionDialogs) {
    const trans = translator.load('jupyterlab');
    const { commands, shell } = app;
    sessionDialogs = sessionDialogs !== null && sessionDialogs !== void 0 ? sessionDialogs : _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.sessionContextDialogs;
    const isEnabled = () => {
        return Private.isEnabled(shell, tracker);
    };
    const isEnabledAndSingleSelected = () => {
        return Private.isEnabledAndSingleSelected(shell, tracker);
    };
    const refreshCellCollapsed = (notebook) => {
        var _a, _b;
        for (const cell of notebook.widgets) {
            if (cell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_2__.MarkdownCell && cell.headingCollapsed) {
                _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.setHeadingCollapse(cell, true, notebook);
            }
            if (cell.model.id === ((_b = (_a = notebook.activeCell) === null || _a === void 0 ? void 0 : _a.model) === null || _b === void 0 ? void 0 : _b.id)) {
                _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.expandParent(cell, notebook);
            }
        }
    };
    const isEnabledAndHeadingSelected = () => {
        return Private.isEnabledAndHeadingSelected(shell, tracker);
    };
    // Set up signal handler to keep the collapse state consistent
    tracker.currentChanged.connect((sender, panel) => {
        var _a, _b;
        if (!((_b = (_a = panel === null || panel === void 0 ? void 0 : panel.content) === null || _a === void 0 ? void 0 : _a.model) === null || _b === void 0 ? void 0 : _b.cells)) {
            return;
        }
        panel.content.model.cells.changed.connect((list, args) => {
            // Might be overkill to refresh this every time, but
            // it helps to keep the collapse state consistent.
            refreshCellCollapsed(panel.content);
        });
        panel.content.activeCellChanged.connect((notebook, cell) => {
            _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.expandParent(cell, notebook);
        });
    });
    commands.addCommand(CommandIDs.runAndAdvance, {
        label: trans.__('Run Selected Cells'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                const { context, content } = current;
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.runAndAdvance(content, context.sessionContext);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.run, {
        label: trans.__("Run Selected Cells and Don't Advance"),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                const { context, content } = current;
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.run(content, context.sessionContext);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.runAndInsert, {
        label: trans.__('Run Selected Cells and Insert Below'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                const { context, content } = current;
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.runAndInsert(content, context.sessionContext);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.runAll, {
        label: trans.__('Run All Cells'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                const { context, content } = current;
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.runAll(content, context.sessionContext);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.runAllAbove, {
        label: trans.__('Run All Above Selected Cell'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                const { context, content } = current;
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.runAllAbove(content, context.sessionContext);
            }
        },
        isEnabled: () => {
            // Can't run above if there are multiple cells selected,
            // or if we are at the top of the notebook.
            return (isEnabledAndSingleSelected() &&
                tracker.currentWidget.content.activeCellIndex !== 0);
        }
    });
    commands.addCommand(CommandIDs.runAllBelow, {
        label: trans.__('Run Selected Cell and All Below'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                const { context, content } = current;
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.runAllBelow(content, context.sessionContext);
            }
        },
        isEnabled: () => {
            // Can't run below if there are multiple cells selected,
            // or if we are at the bottom of the notebook.
            return (isEnabledAndSingleSelected() &&
                tracker.currentWidget.content.activeCellIndex !==
                    tracker.currentWidget.content.widgets.length - 1);
        }
    });
    commands.addCommand(CommandIDs.renderAllMarkdown, {
        label: trans.__('Render All Markdown Cells'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                const { context, content } = current;
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.renderAllMarkdown(content, context.sessionContext);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.restart, {
        label: trans.__('Restart Kernel…'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return sessionDialogs.restart(current.sessionContext, translator);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.closeAndShutdown, {
        label: trans.__('Close and Shut Down'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (!current) {
                return;
            }
            const fileName = current.title.label;
            return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                title: trans.__('Shut down the notebook?'),
                body: trans.__('Are you sure you want to close "%1"?', fileName),
                buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton(), _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.warnButton()]
            }).then(result => {
                if (result.button.accept) {
                    return current.context.sessionContext.shutdown().then(() => {
                        current.dispose();
                    });
                }
            });
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.trust, {
        label: () => trans.__('Trust Notebook'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                const { context, content } = current;
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.trust(content).then(() => context.save());
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.restartClear, {
        label: trans.__('Restart Kernel and Clear All Outputs…'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                const { content, sessionContext } = current;
                return sessionDialogs.restart(sessionContext, translator).then(() => {
                    _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.clearAllOutputs(content);
                });
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.restartAndRunToSelected, {
        label: trans.__('Restart Kernel and Run up to Selected Cell…'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                const { context, content } = current;
                return sessionDialogs
                    .restart(current.sessionContext, translator)
                    .then(restarted => {
                    if (restarted) {
                        void _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.runAllAbove(content, context.sessionContext).then(executed => {
                            if (executed || content.activeCellIndex === 0) {
                                void _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.run(content, context.sessionContext);
                            }
                        });
                    }
                });
            }
        },
        isEnabled: isEnabledAndSingleSelected
    });
    commands.addCommand(CommandIDs.restartRunAll, {
        label: trans.__('Restart Kernel and Run All Cells…'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                const { context, content, sessionContext } = current;
                return sessionDialogs
                    .restart(sessionContext, translator)
                    .then(restarted => {
                    if (restarted) {
                        void _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.runAll(content, context.sessionContext);
                    }
                    return restarted;
                });
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.clearAllOutputs, {
        label: trans.__('Clear All Outputs'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.clearAllOutputs(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.clearOutputs, {
        label: trans.__('Clear Outputs'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.clearOutputs(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.interrupt, {
        label: trans.__('Interrupt Kernel'),
        execute: args => {
            var _a;
            const current = getCurrent(tracker, shell, args);
            if (!current) {
                return;
            }
            const kernel = (_a = current.context.sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel;
            if (kernel) {
                return kernel.interrupt();
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.toCode, {
        label: trans.__('Change to Code Cell Type'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.changeCellType(current.content, 'code');
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.toMarkdown, {
        label: trans.__('Change to Markdown Cell Type'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.changeCellType(current.content, 'markdown');
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.toRaw, {
        label: trans.__('Change to Raw Cell Type'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.changeCellType(current.content, 'raw');
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.cut, {
        label: trans.__('Cut Cells'),
        caption: trans.__('Cut the selected cells'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.cut(current.content);
            }
        },
        icon: args => (args.toolbar ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_17__.cutIcon : undefined),
        isEnabled
    });
    commands.addCommand(CommandIDs.copy, {
        label: trans.__('Copy Cells'),
        caption: trans.__('Copy the selected cells'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.copy(current.content);
            }
        },
        icon: args => (args.toolbar ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_17__.copyIcon : ''),
        isEnabled
    });
    commands.addCommand(CommandIDs.pasteBelow, {
        label: trans.__('Paste Cells Below'),
        caption: trans.__('Paste cells from the clipboard'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.paste(current.content, 'below');
            }
        },
        icon: args => (args.toolbar ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_17__.pasteIcon : undefined),
        isEnabled
    });
    commands.addCommand(CommandIDs.pasteAbove, {
        label: trans.__('Paste Cells Above'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.paste(current.content, 'above');
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.duplicateBelow, {
        label: trans.__('Duplicate Cells Below'),
        caption: trans.__('Copy the selected cells and paste them below the selection'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.duplicate(current.content, 'belowSelected');
            }
        },
        icon: args => (args.toolbar ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_17__.duplicateIcon : ''),
        isEnabled
    });
    commands.addCommand(CommandIDs.pasteAndReplace, {
        label: trans.__('Paste Cells and Replace'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.paste(current.content, 'replace');
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.deleteCell, {
        label: trans.__('Delete Cells'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.deleteCells(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.split, {
        label: trans.__('Split Cell'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.splitCell(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.merge, {
        label: trans.__('Merge Selected Cells'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.mergeCells(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.mergeAbove, {
        label: trans.__('Merge Cell Above'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.mergeCells(current.content, true);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.mergeBelow, {
        label: trans.__('Merge Cell Below'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.mergeCells(current.content, false);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.insertAbove, {
        label: trans.__('Insert Cell Above'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.insertAbove(current.content);
            }
        },
        icon: args => (args.toolbar ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_17__.addAboveIcon : undefined),
        isEnabled
    });
    commands.addCommand(CommandIDs.insertBelow, {
        label: trans.__('Insert Cell Below'),
        caption: trans.__('Insert a cell below'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.insertBelow(current.content);
            }
        },
        icon: args => (args.toolbar ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_17__.addBelowIcon : undefined),
        isEnabled
    });
    commands.addCommand(CommandIDs.selectAbove, {
        label: trans.__('Select Cell Above'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.selectAbove(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.selectBelow, {
        label: trans.__('Select Cell Below'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.selectBelow(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.extendAbove, {
        label: trans.__('Extend Selection Above'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.extendSelectionAbove(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.extendTop, {
        label: trans.__('Extend Selection to Top'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.extendSelectionAbove(current.content, true);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.extendBelow, {
        label: trans.__('Extend Selection Below'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.extendSelectionBelow(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.extendBottom, {
        label: trans.__('Extend Selection to Bottom'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.extendSelectionBelow(current.content, true);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.selectAll, {
        label: trans.__('Select All Cells'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.selectAll(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.deselectAll, {
        label: trans.__('Deselect All Cells'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.deselectAll(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.moveUp, {
        label: trans.__('Move Cells Up'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.moveUp(current.content);
            }
        },
        isEnabled,
        icon: args => (args.toolbar ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_17__.moveUpIcon : undefined)
    });
    commands.addCommand(CommandIDs.moveDown, {
        label: trans.__('Move Cells Down'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.moveDown(current.content);
            }
        },
        isEnabled,
        icon: args => (args.toolbar ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_17__.moveDownIcon : undefined)
    });
    commands.addCommand(CommandIDs.toggleAllLines, {
        label: trans.__('Toggle All Line Numbers'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.toggleAllLineNumbers(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.commandMode, {
        label: trans.__('Enter Command Mode'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                current.content.mode = 'command';
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.editMode, {
        label: trans.__('Enter Edit Mode'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                current.content.mode = 'edit';
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.undoCellAction, {
        label: trans.__('Undo Cell Operation'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.undo(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.redoCellAction, {
        label: trans.__('Redo Cell Operation'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.redo(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.changeKernel, {
        label: trans.__('Change Kernel…'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return sessionDialogs.selectKernel(current.context.sessionContext, translator);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.reconnectToKernel, {
        label: trans.__('Reconnect To Kernel'),
        execute: args => {
            var _a;
            const current = getCurrent(tracker, shell, args);
            if (!current) {
                return;
            }
            const kernel = (_a = current.context.sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel;
            if (kernel) {
                return kernel.reconnect();
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.markdown1, {
        label: trans.__('Change to Heading 1'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.setMarkdownHeader(current.content, 1);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.markdown2, {
        label: trans.__('Change to Heading 2'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.setMarkdownHeader(current.content, 2);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.markdown3, {
        label: trans.__('Change to Heading 3'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.setMarkdownHeader(current.content, 3);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.markdown4, {
        label: trans.__('Change to Heading 4'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.setMarkdownHeader(current.content, 4);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.markdown5, {
        label: trans.__('Change to Heading 5'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.setMarkdownHeader(current.content, 5);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.markdown6, {
        label: trans.__('Change to Heading 6'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.setMarkdownHeader(current.content, 6);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.hideCode, {
        label: trans.__('Collapse Selected Code'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.hideCode(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.showCode, {
        label: trans.__('Expand Selected Code'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.showCode(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.hideAllCode, {
        label: trans.__('Collapse All Code'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.hideAllCode(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.showAllCode, {
        label: trans.__('Expand All Code'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.showAllCode(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.hideOutput, {
        label: trans.__('Collapse Selected Outputs'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.hideOutput(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.showOutput, {
        label: trans.__('Expand Selected Outputs'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.showOutput(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.hideAllOutputs, {
        label: trans.__('Collapse All Outputs'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.hideAllOutputs(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.toggleRenderSideBySideCurrentNotebook, {
        label: trans.__('Render Side-by-Side'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                if (current.content.renderingLayout === 'side-by-side') {
                    return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.renderDefault(current.content);
                }
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.renderSideBySide(current.content);
            }
        },
        isEnabled,
        isToggled: args => {
            const current = getCurrent(tracker, shell, Object.assign(Object.assign({}, args), { activate: false }));
            if (current) {
                return current.content.renderingLayout === 'side-by-side';
            }
            else {
                return false;
            }
        }
    });
    commands.addCommand(CommandIDs.setSideBySideRatio, {
        label: trans.__('Set side-by-side ratio'),
        execute: args => {
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.InputDialog.getNumber({
                title: trans.__('Width of the output in side-by-side mode'),
                value: 1
            })
                .then(result => {
                if (result.value) {
                    document.documentElement.style.setProperty('--jp-side-by-side-output-size', `${result.value}fr`);
                }
            })
                .catch(console.error);
        }
    });
    commands.addCommand(CommandIDs.showAllOutputs, {
        label: trans.__('Expand All Outputs'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.showAllOutputs(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.enableOutputScrolling, {
        label: trans.__('Enable Scrolling for Outputs'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.enableOutputScrolling(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.disableOutputScrolling, {
        label: trans.__('Disable Scrolling for Outputs'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.disableOutputScrolling(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.selectLastRunCell, {
        label: trans.__('Select current running or last run cell'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.selectLastRunCell(current.content);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.replaceSelection, {
        label: trans.__('Replace Selection in Notebook Cell'),
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            const text = args['text'] || '';
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.replaceSelection(current.content, text);
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.toggleCollapseCmd, {
        label: 'Toggle Collapse Notebook Heading',
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.toggleCurrentHeadingCollapse(current.content);
            }
        },
        isEnabled: isEnabledAndHeadingSelected
    });
    commands.addCommand(CommandIDs.collapseAllCmd, {
        label: 'Collapse All Cells',
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.collapseAll(current.content);
            }
        }
    });
    commands.addCommand(CommandIDs.expandAllCmd, {
        label: 'Expand All Headings',
        execute: args => {
            const current = getCurrent(tracker, shell, args);
            if (current) {
                return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.expandAllHeadings(current.content);
            }
        }
    });
}
/**
 * Populate the application's command palette with notebook commands.
 */
function populatePalette(palette, translator) {
    const trans = translator.load('jupyterlab');
    let category = trans.__('Notebook Operations');
    [
        CommandIDs.interrupt,
        CommandIDs.restart,
        CommandIDs.restartClear,
        CommandIDs.restartRunAll,
        CommandIDs.runAll,
        CommandIDs.renderAllMarkdown,
        CommandIDs.runAllAbove,
        CommandIDs.runAllBelow,
        CommandIDs.restartAndRunToSelected,
        CommandIDs.selectAll,
        CommandIDs.deselectAll,
        CommandIDs.clearAllOutputs,
        CommandIDs.toggleAllLines,
        CommandIDs.editMode,
        CommandIDs.commandMode,
        CommandIDs.changeKernel,
        CommandIDs.reconnectToKernel,
        CommandIDs.createConsole,
        CommandIDs.closeAndShutdown,
        CommandIDs.trust,
        CommandIDs.toggleCollapseCmd,
        CommandIDs.collapseAllCmd,
        CommandIDs.expandAllCmd
    ].forEach(command => {
        palette.addItem({ command, category });
    });
    palette.addItem({
        command: CommandIDs.createNew,
        category,
        args: { isPalette: true }
    });
    category = trans.__('Notebook Cell Operations');
    [
        CommandIDs.run,
        CommandIDs.runAndAdvance,
        CommandIDs.runAndInsert,
        CommandIDs.runInConsole,
        CommandIDs.clearOutputs,
        CommandIDs.toCode,
        CommandIDs.toMarkdown,
        CommandIDs.toRaw,
        CommandIDs.cut,
        CommandIDs.copy,
        CommandIDs.pasteBelow,
        CommandIDs.pasteAbove,
        CommandIDs.pasteAndReplace,
        CommandIDs.deleteCell,
        CommandIDs.split,
        CommandIDs.merge,
        CommandIDs.mergeAbove,
        CommandIDs.mergeBelow,
        CommandIDs.insertAbove,
        CommandIDs.insertBelow,
        CommandIDs.selectAbove,
        CommandIDs.selectBelow,
        CommandIDs.extendAbove,
        CommandIDs.extendTop,
        CommandIDs.extendBelow,
        CommandIDs.extendBottom,
        CommandIDs.moveDown,
        CommandIDs.moveUp,
        CommandIDs.undoCellAction,
        CommandIDs.redoCellAction,
        CommandIDs.markdown1,
        CommandIDs.markdown2,
        CommandIDs.markdown3,
        CommandIDs.markdown4,
        CommandIDs.markdown5,
        CommandIDs.markdown6,
        CommandIDs.hideCode,
        CommandIDs.showCode,
        CommandIDs.hideAllCode,
        CommandIDs.showAllCode,
        CommandIDs.hideOutput,
        CommandIDs.showOutput,
        CommandIDs.hideAllOutputs,
        CommandIDs.showAllOutputs,
        CommandIDs.toggleRenderSideBySideCurrentNotebook,
        CommandIDs.setSideBySideRatio,
        CommandIDs.enableOutputScrolling,
        CommandIDs.disableOutputScrolling
    ].forEach(command => {
        palette.addItem({ command, category });
    });
}
/**
 * Populates the application menus for the notebook.
 */
function populateMenus(app, mainMenu, tracker, translator, sessionDialogs) {
    const trans = translator.load('jupyterlab');
    const { commands } = app;
    sessionDialogs = sessionDialogs || _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.sessionContextDialogs;
    // Add undo/redo hooks to the edit menu.
    mainMenu.editMenu.undoers.add({
        tracker,
        undo: widget => {
            var _a;
            (_a = widget.content.activeCell) === null || _a === void 0 ? void 0 : _a.editor.undo();
        },
        redo: widget => {
            var _a;
            (_a = widget.content.activeCell) === null || _a === void 0 ? void 0 : _a.editor.redo();
        }
    });
    // Add a clearer to the edit menu
    mainMenu.editMenu.clearers.add({
        tracker,
        clearCurrentLabel: (n) => trans.__('Clear Output'),
        clearAllLabel: (n) => {
            return trans.__('Clear All Outputs');
        },
        clearCurrent: (current) => {
            return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.clearOutputs(current.content);
        },
        clearAll: (current) => {
            return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.clearAllOutputs(current.content);
        }
    });
    // Add a close and shutdown command to the file menu.
    mainMenu.fileMenu.closeAndCleaners.add({
        tracker,
        closeAndCleanupLabel: (n) => trans.__('Close and Shutdown Notebook'),
        closeAndCleanup: (current) => {
            const fileName = current.title.label;
            return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                title: trans.__('Shut down the Notebook?'),
                body: trans.__('Are you sure you want to close "%1"?', fileName),
                buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton(), _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.warnButton()]
            }).then(result => {
                if (result.button.accept) {
                    return current.context.sessionContext.shutdown().then(() => {
                        current.dispose();
                    });
                }
            });
        }
    });
    // Add a kernel user to the Kernel menu
    mainMenu.kernelMenu.kernelUsers.add({
        tracker,
        interruptKernel: current => {
            var _a;
            const kernel = (_a = current.sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel;
            if (kernel) {
                return kernel.interrupt();
            }
            return Promise.resolve(void 0);
        },
        reconnectToKernel: current => {
            var _a;
            const kernel = (_a = current.sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel;
            if (kernel) {
                return kernel.reconnect();
            }
            return Promise.resolve(void 0);
        },
        restartKernelAndClearLabel: (n) => trans.__('Restart Kernel and Clear All Outputs…'),
        restartKernel: current => sessionDialogs.restart(current.sessionContext, translator),
        restartKernelAndClear: current => {
            return sessionDialogs
                .restart(current.sessionContext, translator)
                .then(restarted => {
                if (restarted) {
                    _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.clearAllOutputs(current.content);
                }
                return restarted;
            });
        },
        changeKernel: current => sessionDialogs.selectKernel(current.sessionContext, translator),
        shutdownKernel: current => current.sessionContext.shutdown()
    });
    // Add a console creator the the Kernel menu
    mainMenu.fileMenu.consoleCreators.add({
        tracker,
        createConsoleLabel: (n) => trans.__('New Console for Notebook'),
        createConsole: current => Private.createConsole(commands, current, true)
    });
    // Add an IEditorViewer to the application view menu
    mainMenu.viewMenu.editorViewers.add({
        tracker,
        toggleLineNumbers: widget => {
            _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.toggleAllLineNumbers(widget.content);
        },
        lineNumbersToggled: widget => {
            const config = widget.content.editorConfig;
            return !!(config.code.lineNumbers &&
                config.markdown.lineNumbers &&
                config.raw.lineNumbers);
        }
    });
    // Add an ICodeRunner to the application run menu
    mainMenu.runMenu.codeRunners.add({
        tracker,
        runLabel: (n) => trans.__('Run Selected Cells'),
        runCaption: (n) => trans.__('Run the selected cells and advance'),
        runAllLabel: (n) => trans.__('Run All Cells'),
        runAllCaption: (n) => trans.__('Run the all notebook cells'),
        restartAndRunAllLabel: (n) => trans.__('Restart Kernel and Run All Cells…'),
        restartAndRunAllCaption: (n) => trans.__('Restart the kernel, then re-run the whole notebook'),
        run: current => {
            const { context, content } = current;
            return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.runAndAdvance(content, context.sessionContext).then(() => void 0);
        },
        runAll: current => {
            const { context, content } = current;
            return _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.runAll(content, context.sessionContext).then(() => void 0);
        },
        restartAndRunAll: current => {
            const { context, content } = current;
            return sessionDialogs
                .restart(context.sessionContext, translator)
                .then(restarted => {
                if (restarted) {
                    void _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.runAll(content, context.sessionContext);
                }
                return restarted;
            });
        }
    });
    // Add kernel information to the application help menu.
    mainMenu.helpMenu.kernelUsers.add({
        tracker,
        getKernel: current => { var _a; return (_a = current.sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel; }
    });
}
/**
 * A namespace for module private functionality.
 */
var Private;
(function (Private) {
    /**
     * Create a console connected with a notebook kernel
     *
     * @param commands Commands registry
     * @param widget Notebook panel
     * @param activate Should the console be activated
     */
    function createConsole(commands, widget, activate) {
        const options = {
            path: widget.context.path,
            preferredLanguage: widget.context.model.defaultKernelLanguage,
            activate: activate,
            ref: widget.id,
            insertMode: 'split-bottom'
        };
        return commands.execute('console:create', options);
    }
    Private.createConsole = createConsole;
    /**
     * Whether there is an active notebook.
     */
    function isEnabled(shell, tracker) {
        return (tracker.currentWidget !== null &&
            tracker.currentWidget === shell.currentWidget);
    }
    Private.isEnabled = isEnabled;
    /**
     * Whether there is an notebook active, with a single selected cell.
     */
    function isEnabledAndSingleSelected(shell, tracker) {
        if (!Private.isEnabled(shell, tracker)) {
            return false;
        }
        const { content } = tracker.currentWidget;
        const index = content.activeCellIndex;
        // If there are selections that are not the active cell,
        // this command is confusing, so disable it.
        for (let i = 0; i < content.widgets.length; ++i) {
            if (content.isSelected(content.widgets[i]) && i !== index) {
                return false;
            }
        }
        return true;
    }
    Private.isEnabledAndSingleSelected = isEnabledAndSingleSelected;
    /**
     * Whether there is an notebook active, with a single selected cell.
     */
    function isEnabledAndHeadingSelected(shell, tracker) {
        if (!Private.isEnabled(shell, tracker)) {
            return false;
        }
        const { content } = tracker.currentWidget;
        const index = content.activeCellIndex;
        if (!(content.activeCell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_2__.MarkdownCell)) {
            return false;
        }
        // If there are selections that are not the active cell,
        // this command is confusing, so disable it.
        for (let i = 0; i < content.widgets.length; ++i) {
            if (content.isSelected(content.widgets[i]) && i !== index) {
                return false;
            }
        }
        return true;
    }
    Private.isEnabledAndHeadingSelected = isEnabledAndHeadingSelected;
    /**
     * The default Export To ... formats and their human readable labels.
     */
    function getFormatLabels(translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_16__.nullTranslator;
        const trans = translator.load('jupyterlab');
        return {
            html: trans.__('HTML'),
            latex: trans.__('LaTeX'),
            markdown: trans.__('Markdown'),
            pdf: trans.__('PDF'),
            rst: trans.__('ReStructured Text'),
            script: trans.__('Executable Script'),
            slides: trans.__('Reveal.js Slides')
        };
    }
    Private.getFormatLabels = getFormatLabels;
    /**
     * A widget hosting a cloned output area.
     */
    class ClonedOutputArea extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_22__.Panel {
        constructor(options) {
            super();
            this._cell = null;
            const trans = (options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_16__.nullTranslator).load('jupyterlab');
            this._notebook = options.notebook;
            this._index = options.index !== undefined ? options.index : -1;
            this._cell = options.cell || null;
            this.id = `LinkedOutputView-${_lumino_coreutils__WEBPACK_IMPORTED_MODULE_19__.UUID.uuid4()}`;
            this.title.label = 'Output View';
            this.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_17__.notebookIcon;
            this.title.caption = this._notebook.title.label
                ? trans.__('For Notebook: %1', this._notebook.title.label)
                : trans.__('For Notebook:');
            this.addClass('jp-LinkedOutputView');
            // Wait for the notebook to be loaded before
            // cloning the output area.
            void this._notebook.context.ready.then(() => {
                if (!this._cell) {
                    this._cell = this._notebook.content.widgets[this._index];
                }
                if (!this._cell || this._cell.model.type !== 'code') {
                    this.dispose();
                    return;
                }
                const clone = this._cell.cloneOutputArea();
                this.addWidget(clone);
            });
        }
        /**
         * The index of the cell in the notebook.
         */
        get index() {
            return this._cell
                ? _lumino_algorithm__WEBPACK_IMPORTED_MODULE_18__.ArrayExt.findFirstIndex(this._notebook.content.widgets, c => c === this._cell)
                : this._index;
        }
        /**
         * The path of the notebook for the cloned output area.
         */
        get path() {
            return this._notebook.context.path;
        }
    }
    Private.ClonedOutputArea = ClonedOutputArea;
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/notebook-extension/lib/nboutput.js":
/*!*********************************************************!*\
  !*** ../../packages/notebook-extension/lib/nboutput.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logNotebookOutput": () => (/* binding */ logNotebookOutput)
/* harmony export */ });
/* harmony import */ var _jupyterlab_logconsole__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/logconsole */ "webpack/sharing/consume/default/@jupyterlab/logconsole/@jupyterlab/logconsole");
/* harmony import */ var _jupyterlab_logconsole__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_logconsole__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * The Log Console extension.
 */
const logNotebookOutput = {
    activate: activateNBOutput,
    id: '@jupyterlab/notebook-extension:log-output',
    requires: [_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.INotebookTracker],
    optional: [_jupyterlab_logconsole__WEBPACK_IMPORTED_MODULE_0__.ILoggerRegistry],
    autoStart: true
};
function activateNBOutput(app, nbtracker, loggerRegistry) {
    if (!loggerRegistry) {
        // Automatically disable if logconsole is missing
        return;
    }
    function registerNB(nb) {
        function logOutput(msg, levelNormal, levelError) {
            if (_jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__.KernelMessage.isDisplayDataMsg(msg) ||
                _jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__.KernelMessage.isStreamMsg(msg) ||
                _jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__.KernelMessage.isErrorMsg(msg) ||
                _jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__.KernelMessage.isExecuteResultMsg(msg)) {
                const logger = loggerRegistry.getLogger(nb.context.path);
                logger.rendermime = nb.content.rendermime;
                const data = Object.assign(Object.assign({}, msg.content), { output_type: msg.header.msg_type });
                let level = levelNormal;
                if (_jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__.KernelMessage.isErrorMsg(msg) ||
                    (_jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__.KernelMessage.isStreamMsg(msg) && msg.content.name === 'stderr')) {
                    level = levelError;
                }
                logger.log({ type: 'output', data, level });
            }
        }
        // There is overlap here since unhandled messages are also emitted in the
        // iopubMessage signal. However, unhandled messages warrant a higher log
        // severity, so we'll accept that they are logged twice.
        nb.context.sessionContext.iopubMessage.connect((_, msg) => logOutput(msg, 'info', 'info'));
        nb.context.sessionContext.unhandledMessage.connect((_, msg) => logOutput(msg, 'warning', 'error'));
    }
    nbtracker.forEach(nb => registerNB(nb));
    nbtracker.widgetAdded.connect((_, nb) => registerNB(nb));
}
//# sourceMappingURL=nboutput.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbm90ZWJvb2stZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbm90ZWJvb2stZXh0ZW5zaW9uL2xpYi9uYm91dHB1dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3FFO0FBQ3dKO0FBQzVLO0FBQ1E7QUFDTjtBQUNPO0FBQ3lCO0FBQ3JCO0FBQ2I7QUFDQTtBQUNzUDtBQUMzTjtBQUNmO0FBQ0U7QUFDaEI7QUFDSTtBQUNtQjtBQUNpRztBQUMxSDtBQUNLO0FBQ0M7QUFDSDtBQUNSO0FBQ087QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDakM7QUFDQTtB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IiwiZmlsZSI6InBhY2thZ2VzX25vdGVib29rLWV4dGVuc2lvbl9saWJfaW5kZXhfanMuOGVjMjUyZTI3MTM3NzJkNmU1YWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBub3RlYm9vay1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgSUxhYlNoZWxsLCBJTGF5b3V0UmVzdG9yZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBjcmVhdGVUb29sYmFyRmFjdG9yeSwgRGlhbG9nLCBJQ29tbWFuZFBhbGV0dGUsIElucHV0RGlhbG9nLCBJU2Vzc2lvbkNvbnRleHREaWFsb2dzLCBJVG9vbGJhcldpZGdldFJlZ2lzdHJ5LCBNYWluQXJlYVdpZGdldCwgc2Vzc2lvbkNvbnRleHREaWFsb2dzLCBzaG93RGlhbG9nLCBUb29sYmFyLCBXaWRnZXRUcmFja2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgTWFya2Rvd25DZWxsIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY2VsbHMnO1xuaW1wb3J0IHsgSUVkaXRvclNlcnZpY2VzIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29kZWVkaXRvcic7XG5pbXBvcnQgeyBQYWdlQ29uZmlnIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IElEb2N1bWVudE1hbmFnZXIgfSBmcm9tICdAanVweXRlcmxhYi9kb2NtYW5hZ2VyJztcbmltcG9ydCB7IFRvb2xiYXJJdGVtcyBhcyBEb2NUb29sYmFySXRlbXMgfSBmcm9tICdAanVweXRlcmxhYi9kb2NtYW5hZ2VyLWV4dGVuc2lvbic7XG5pbXBvcnQgeyBJRmlsZUJyb3dzZXJGYWN0b3J5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvZmlsZWJyb3dzZXInO1xuaW1wb3J0IHsgSUxhdW5jaGVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvbGF1bmNoZXInO1xuaW1wb3J0IHsgSU1haW5NZW51IH0gZnJvbSAnQGp1cHl0ZXJsYWIvbWFpbm1lbnUnO1xuaW1wb3J0IHsgQ29tbWFuZEVkaXRTdGF0dXMsIEV4ZWN1dGlvbkluZGljYXRvciwgSU5vdGVib29rVG9vbHMsIElOb3RlYm9va1RyYWNrZXIsIElOb3RlYm9va1dpZGdldEZhY3RvcnksIE5vdGVib29rQWN0aW9ucywgTm90ZWJvb2tNb2RlbEZhY3RvcnksIE5vdGVib29rUGFuZWwsIE5vdGVib29rVG9vbHMsIE5vdGVib29rVHJhY2tlciwgTm90ZWJvb2tUcnVzdFN0YXR1cywgTm90ZWJvb2tXaWRnZXRGYWN0b3J5LCBTdGF0aWNOb3RlYm9vaywgVG9vbGJhckl0ZW1zIH0gZnJvbSAnQGp1cHl0ZXJsYWIvbm90ZWJvb2snO1xuaW1wb3J0IHsgSVByb3BlcnR5SW5zcGVjdG9yUHJvdmlkZXIgfSBmcm9tICdAanVweXRlcmxhYi9wcm9wZXJ0eS1pbnNwZWN0b3InO1xuaW1wb3J0IHsgSVJlbmRlck1pbWVSZWdpc3RyeSB9IGZyb20gJ0BqdXB5dGVybGFiL3JlbmRlcm1pbWUnO1xuaW1wb3J0IHsgSVNldHRpbmdSZWdpc3RyeSB9IGZyb20gJ0BqdXB5dGVybGFiL3NldHRpbmdyZWdpc3RyeSc7XG5pbXBvcnQgeyBJU3RhdGVEQiB9IGZyb20gJ0BqdXB5dGVybGFiL3N0YXRlZGInO1xuaW1wb3J0IHsgSVN0YXR1c0JhciB9IGZyb20gJ0BqdXB5dGVybGFiL3N0YXR1c2Jhcic7XG5pbXBvcnQgeyBJVHJhbnNsYXRvciwgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBhZGRBYm92ZUljb24sIGFkZEJlbG93SWNvbiwgYnVpbGRJY29uLCBjb3B5SWNvbiwgY3V0SWNvbiwgZHVwbGljYXRlSWNvbiwgbW92ZURvd25JY29uLCBtb3ZlVXBJY29uLCBub3RlYm9va0ljb24sIHBhc3RlSWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgQXJyYXlFeHQgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG5pbXBvcnQgeyBKU09ORXh0LCBVVUlEIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgRGlzcG9zYWJsZVNldCB9IGZyb20gJ0BsdW1pbm8vZGlzcG9zYWJsZSc7XG5pbXBvcnQgeyBNZXNzYWdlTG9vcCB9IGZyb20gJ0BsdW1pbm8vbWVzc2FnaW5nJztcbmltcG9ydCB7IFBhbmVsIH0gZnJvbSAnQGx1bWluby93aWRnZXRzJztcbmltcG9ydCB7IGxvZ05vdGVib29rT3V0cHV0IH0gZnJvbSAnLi9uYm91dHB1dCc7XG4vKipcbiAqIFRoZSBjb21tYW5kIElEcyB1c2VkIGJ5IHRoZSBub3RlYm9vayBwbHVnaW4uXG4gKi9cbnZhciBDb21tYW5kSURzO1xuKGZ1bmN0aW9uIChDb21tYW5kSURzKSB7XG4gICAgQ29tbWFuZElEcy5jcmVhdGVOZXcgPSAnbm90ZWJvb2s6Y3JlYXRlLW5ldyc7XG4gICAgQ29tbWFuZElEcy5pbnRlcnJ1cHQgPSAnbm90ZWJvb2s6aW50ZXJydXB0LWtlcm5lbCc7XG4gICAgQ29tbWFuZElEcy5yZXN0YXJ0ID0gJ25vdGVib29rOnJlc3RhcnQta2VybmVsJztcbiAgICBDb21tYW5kSURzLnJlc3RhcnRDbGVhciA9ICdub3RlYm9vazpyZXN0YXJ0LWNsZWFyLW91dHB1dCc7XG4gICAgQ29tbWFuZElEcy5yZXN0YXJ0QW5kUnVuVG9TZWxlY3RlZCA9ICdub3RlYm9vazpyZXN0YXJ0LWFuZC1ydW4tdG8tc2VsZWN0ZWQnO1xuICAgIENvbW1hbmRJRHMucmVzdGFydFJ1bkFsbCA9ICdub3RlYm9vazpyZXN0YXJ0LXJ1bi1hbGwnO1xuICAgIENvbW1hbmRJRHMucmVjb25uZWN0VG9LZXJuZWwgPSAnbm90ZWJvb2s6cmVjb25uZWN0LXRvLWtlcm5lbCc7XG4gICAgQ29tbWFuZElEcy5jaGFuZ2VLZXJuZWwgPSAnbm90ZWJvb2s6Y2hhbmdlLWtlcm5lbCc7XG4gICAgQ29tbWFuZElEcy5jcmVhdGVDb25zb2xlID0gJ25vdGVib29rOmNyZWF0ZS1jb25zb2xlJztcbiAgICBDb21tYW5kSURzLmNyZWF0ZU91dHB1dFZpZXcgPSAnbm90ZWJvb2s6Y3JlYXRlLW91dHB1dC12aWV3JztcbiAgICBDb21tYW5kSURzLmNsZWFyQWxsT3V0cHV0cyA9ICdub3RlYm9vazpjbGVhci1hbGwtY2VsbC1vdXRwdXRzJztcbiAgICBDb21tYW5kSURzLmNsb3NlQW5kU2h1dGRvd24gPSAnbm90ZWJvb2s6Y2xvc2UtYW5kLXNodXRkb3duJztcbiAgICBDb21tYW5kSURzLnRydXN0ID0gJ25vdGVib29rOnRydXN0JztcbiAgICBDb21tYW5kSURzLmV4cG9ydFRvRm9ybWF0ID0gJ25vdGVib29rOmV4cG9ydC10by1mb3JtYXQnO1xuICAgIENvbW1hbmRJRHMucnVuID0gJ25vdGVib29rOnJ1bi1jZWxsJztcbiAgICBDb21tYW5kSURzLnJ1bkFuZEFkdmFuY2UgPSAnbm90ZWJvb2s6cnVuLWNlbGwtYW5kLXNlbGVjdC1uZXh0JztcbiAgICBDb21tYW5kSURzLnJ1bkFuZEluc2VydCA9ICdub3RlYm9vazpydW4tY2VsbC1hbmQtaW5zZXJ0LWJlbG93JztcbiAgICBDb21tYW5kSURzLnJ1bkluQ29uc29sZSA9ICdub3RlYm9vazpydW4taW4tY29uc29sZSc7XG4gICAgQ29tbWFuZElEcy5ydW5BbGwgPSAnbm90ZWJvb2s6cnVuLWFsbC1jZWxscyc7XG4gICAgQ29tbWFuZElEcy5ydW5BbGxBYm92ZSA9ICdub3RlYm9vazpydW4tYWxsLWFib3ZlJztcbiAgICBDb21tYW5kSURzLnJ1bkFsbEJlbG93ID0gJ25vdGVib29rOnJ1bi1hbGwtYmVsb3cnO1xuICAgIENvbW1hbmRJRHMucmVuZGVyQWxsTWFya2Rvd24gPSAnbm90ZWJvb2s6cmVuZGVyLWFsbC1tYXJrZG93bic7XG4gICAgQ29tbWFuZElEcy50b0NvZGUgPSAnbm90ZWJvb2s6Y2hhbmdlLWNlbGwtdG8tY29kZSc7XG4gICAgQ29tbWFuZElEcy50b01hcmtkb3duID0gJ25vdGVib29rOmNoYW5nZS1jZWxsLXRvLW1hcmtkb3duJztcbiAgICBDb21tYW5kSURzLnRvUmF3ID0gJ25vdGVib29rOmNoYW5nZS1jZWxsLXRvLXJhdyc7XG4gICAgQ29tbWFuZElEcy5jdXQgPSAnbm90ZWJvb2s6Y3V0LWNlbGwnO1xuICAgIENvbW1hbmRJRHMuY29weSA9ICdub3RlYm9vazpjb3B5LWNlbGwnO1xuICAgIENvbW1hbmRJRHMucGFzdGVBYm92ZSA9ICdub3RlYm9vazpwYXN0ZS1jZWxsLWFib3ZlJztcbiAgICBDb21tYW5kSURzLnBhc3RlQmVsb3cgPSAnbm90ZWJvb2s6cGFzdGUtY2VsbC1iZWxvdyc7XG4gICAgQ29tbWFuZElEcy5kdXBsaWNhdGVCZWxvdyA9ICdub3RlYm9vazpkdXBsaWNhdGUtYmVsb3cnO1xuICAgIENvbW1hbmRJRHMucGFzdGVBbmRSZXBsYWNlID0gJ25vdGVib29rOnBhc3RlLWFuZC1yZXBsYWNlLWNlbGwnO1xuICAgIENvbW1hbmRJRHMubW92ZVVwID0gJ25vdGVib29rOm1vdmUtY2VsbC11cCc7XG4gICAgQ29tbWFuZElEcy5tb3ZlRG93biA9ICdub3RlYm9vazptb3ZlLWNlbGwtZG93bic7XG4gICAgQ29tbWFuZElEcy5jbGVhck91dHB1dHMgPSAnbm90ZWJvb2s6Y2xlYXItY2VsbC1vdXRwdXQnO1xuICAgIENvbW1hbmRJRHMuZGVsZXRlQ2VsbCA9ICdub3RlYm9vazpkZWxldGUtY2VsbCc7XG4gICAgQ29tbWFuZElEcy5pbnNlcnRBYm92ZSA9ICdub3RlYm9vazppbnNlcnQtY2VsbC1hYm92ZSc7XG4gICAgQ29tbWFuZElEcy5pbnNlcnRCZWxvdyA9ICdub3RlYm9vazppbnNlcnQtY2VsbC1iZWxvdyc7XG4gICAgQ29tbWFuZElEcy5zZWxlY3RBYm92ZSA9ICdub3RlYm9vazptb3ZlLWN1cnNvci11cCc7XG4gICAgQ29tbWFuZElEcy5zZWxlY3RCZWxvdyA9ICdub3RlYm9vazptb3ZlLWN1cnNvci1kb3duJztcbiAgICBDb21tYW5kSURzLmV4dGVuZEFib3ZlID0gJ25vdGVib29rOmV4dGVuZC1tYXJrZWQtY2VsbHMtYWJvdmUnO1xuICAgIENvbW1hbmRJRHMuZXh0ZW5kVG9wID0gJ25vdGVib29rOmV4dGVuZC1tYXJrZWQtY2VsbHMtdG9wJztcbiAgICBDb21tYW5kSURzLmV4dGVuZEJlbG93ID0gJ25vdGVib29rOmV4dGVuZC1tYXJrZWQtY2VsbHMtYmVsb3cnO1xuICAgIENvbW1hbmRJRHMuZXh0ZW5kQm90dG9tID0gJ25vdGVib29rOmV4dGVuZC1tYXJrZWQtY2VsbHMtYm90dG9tJztcbiAgICBDb21tYW5kSURzLnNlbGVjdEFsbCA9ICdub3RlYm9vazpzZWxlY3QtYWxsJztcbiAgICBDb21tYW5kSURzLmRlc2VsZWN0QWxsID0gJ25vdGVib29rOmRlc2VsZWN0LWFsbCc7XG4gICAgQ29tbWFuZElEcy5lZGl0TW9kZSA9ICdub3RlYm9vazplbnRlci1lZGl0LW1vZGUnO1xuICAgIENvbW1hbmRJRHMubWVyZ2UgPSAnbm90ZWJvb2s6bWVyZ2UtY2VsbHMnO1xuICAgIENvbW1hbmRJRHMubWVyZ2VBYm92ZSA9ICdub3RlYm9vazptZXJnZS1jZWxsLWFib3ZlJztcbiAgICBDb21tYW5kSURzLm1lcmdlQmVsb3cgPSAnbm90ZWJvb2s6bWVyZ2UtY2VsbC1iZWxvdyc7XG4gICAgQ29tbWFuZElEcy5zcGxpdCA9ICdub3RlYm9vazpzcGxpdC1jZWxsLWF0LWN1cnNvcic7XG4gICAgQ29tbWFuZElEcy5jb21tYW5kTW9kZSA9ICdub3RlYm9vazplbnRlci1jb21tYW5kLW1vZGUnO1xuICAgIENvbW1hbmRJRHMudG9nZ2xlQWxsTGluZXMgPSAnbm90ZWJvb2s6dG9nZ2xlLWFsbC1jZWxsLWxpbmUtbnVtYmVycyc7XG4gICAgQ29tbWFuZElEcy51bmRvQ2VsbEFjdGlvbiA9ICdub3RlYm9vazp1bmRvLWNlbGwtYWN0aW9uJztcbiAgICBDb21tYW5kSURzLnJlZG9DZWxsQWN0aW9uID0gJ25vdGVib29rOnJlZG8tY2VsbC1hY3Rpb24nO1xuICAgIENvbW1hbmRJRHMubWFya2Rvd24xID0gJ25vdGVib29rOmNoYW5nZS1jZWxsLXRvLWhlYWRpbmctMSc7XG4gICAgQ29tbWFuZElEcy5tYXJrZG93bjIgPSAnbm90ZWJvb2s6Y2hhbmdlLWNlbGwtdG8taGVhZGluZy0yJztcbiAgICBDb21tYW5kSURzLm1hcmtkb3duMyA9ICdub3RlYm9vazpjaGFuZ2UtY2VsbC10by1oZWFkaW5nLTMnO1xuICAgIENvbW1hbmRJRHMubWFya2Rvd240ID0gJ25vdGVib29rOmNoYW5nZS1jZWxsLXRvLWhlYWRpbmctNCc7XG4gICAgQ29tbWFuZElEcy5tYXJrZG93bjUgPSAnbm90ZWJvb2s6Y2hhbmdlLWNlbGwtdG8taGVhZGluZy01JztcbiAgICBDb21tYW5kSURzLm1hcmtkb3duNiA9ICdub3RlYm9vazpjaGFuZ2UtY2VsbC10by1oZWFkaW5nLTYnO1xuICAgIENvbW1hbmRJRHMuaGlkZUNvZGUgPSAnbm90ZWJvb2s6aGlkZS1jZWxsLWNvZGUnO1xuICAgIENvbW1hbmRJRHMuc2hvd0NvZGUgPSAnbm90ZWJvb2s6c2hvdy1jZWxsLWNvZGUnO1xuICAgIENvbW1hbmRJRHMuaGlkZUFsbENvZGUgPSAnbm90ZWJvb2s6aGlkZS1hbGwtY2VsbC1jb2RlJztcbiAgICBDb21tYW5kSURzLnNob3dBbGxDb2RlID0gJ25vdGVib29rOnNob3ctYWxsLWNlbGwtY29kZSc7XG4gICAgQ29tbWFuZElEcy5oaWRlT3V0cHV0ID0gJ25vdGVib29rOmhpZGUtY2VsbC1vdXRwdXRzJztcbiAgICBDb21tYW5kSURzLnNob3dPdXRwdXQgPSAnbm90ZWJvb2s6c2hvdy1jZWxsLW91dHB1dHMnO1xuICAgIENvbW1hbmRJRHMuaGlkZUFsbE91dHB1dHMgPSAnbm90ZWJvb2s6aGlkZS1hbGwtY2VsbC1vdXRwdXRzJztcbiAgICBDb21tYW5kSURzLnNob3dBbGxPdXRwdXRzID0gJ25vdGVib29rOnNob3ctYWxsLWNlbGwtb3V0cHV0cyc7XG4gICAgQ29tbWFuZElEcy50b2dnbGVSZW5kZXJTaWRlQnlTaWRlQ3VycmVudE5vdGVib29rID0gJ25vdGVib29rOnRvZ2dsZS1yZW5kZXItc2lkZS1ieS1zaWRlLWN1cnJlbnQnO1xuICAgIENvbW1hbmRJRHMuc2V0U2lkZUJ5U2lkZVJhdGlvID0gJ25vdGVib29rOnNldC1zaWRlLWJ5LXNpZGUtcmF0aW8nO1xuICAgIENvbW1hbmRJRHMuZW5hYmxlT3V0cHV0U2Nyb2xsaW5nID0gJ25vdGVib29rOmVuYWJsZS1vdXRwdXQtc2Nyb2xsaW5nJztcbiAgICBDb21tYW5kSURzLmRpc2FibGVPdXRwdXRTY3JvbGxpbmcgPSAnbm90ZWJvb2s6ZGlzYWJsZS1vdXRwdXQtc2Nyb2xsaW5nJztcbiAgICBDb21tYW5kSURzLnNlbGVjdExhc3RSdW5DZWxsID0gJ25vdGVib29rOnNlbGVjdC1sYXN0LXJ1bi1jZWxsJztcbiAgICBDb21tYW5kSURzLnJlcGxhY2VTZWxlY3Rpb24gPSAnbm90ZWJvb2s6cmVwbGFjZS1zZWxlY3Rpb24nO1xuICAgIENvbW1hbmRJRHMuYXV0b0Nsb3NpbmdCcmFja2V0cyA9ICdub3RlYm9vazp0b2dnbGUtYXV0b2Nsb3NpbmctYnJhY2tldHMnO1xuICAgIENvbW1hbmRJRHMudG9nZ2xlQ29sbGFwc2VDbWQgPSAnQ29sbGFwc2libGVfSGVhZGluZ3M6VG9nZ2xlX0NvbGxhcHNlJztcbiAgICBDb21tYW5kSURzLmNvbGxhcHNlQWxsQ21kID0gJ0NvbGxhcHNpYmxlX0hlYWRpbmdzOkNvbGxhcHNlX0FsbCc7XG4gICAgQ29tbWFuZElEcy5leHBhbmRBbGxDbWQgPSAnQ29sbGFwc2libGVfSGVhZGluZ3M6RXhwYW5kX0FsbCc7XG4gICAgQ29tbWFuZElEcy5jb3B5VG9DbGlwYm9hcmQgPSAnbm90ZWJvb2s6Y29weS10by1jbGlwYm9hcmQnO1xufSkoQ29tbWFuZElEcyB8fCAoQ29tbWFuZElEcyA9IHt9KSk7XG4vKipcbiAqIFRoZSBuYW1lIG9mIHRoZSBmYWN0b3J5IHRoYXQgY3JlYXRlcyBub3RlYm9va3MuXG4gKi9cbmNvbnN0IEZBQ1RPUlkgPSAnTm90ZWJvb2snO1xuLyoqXG4gKiBUaGUgZXhjbHVkZWQgRXhwb3J0IFRvIC4uLlxuICogKHJldHVybmVkIGZyb20gbmJjb252ZXJ0J3MgZXhwb3J0IGxpc3QpXG4gKi9cbmNvbnN0IEZPUk1BVF9FWENMVURFID0gWydub3RlYm9vaycsICdweXRob24nLCAnY3VzdG9tJ107XG4vKipcbiAqIFNldHRpbmcgSWQgc3RvcmluZyB0aGUgY3VzdG9taXplZCB0b29sYmFyIGRlZmluaXRpb24uXG4gKi9cbmNvbnN0IFBBTkVMX1NFVFRJTkdTID0gJ0BqdXB5dGVybGFiL25vdGVib29rLWV4dGVuc2lvbjpwYW5lbCc7XG4vKipcbiAqIFRoZSBpZCB0byB1c2Ugb24gdGhlIHN0eWxlIHRhZyBmb3IgdGhlIHNpZGUgYnkgc2lkZSBtYXJnaW5zLlxuICovXG5jb25zdCBTSURFX0JZX1NJREVfU1RZTEVfSUQgPSAnanAtTm90ZWJvb2tFeHRlbnNpb24tc2lkZUJ5U2lkZU1hcmdpbnMnO1xuLyoqXG4gKiBUaGUgbm90ZWJvb2sgd2lkZ2V0IHRyYWNrZXIgcHJvdmlkZXIuXG4gKi9cbmNvbnN0IHRyYWNrZXJQbHVnaW4gPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9ub3RlYm9vay1leHRlbnNpb246dHJhY2tlcicsXG4gICAgcHJvdmlkZXM6IElOb3RlYm9va1RyYWNrZXIsXG4gICAgcmVxdWlyZXM6IFtJTm90ZWJvb2tXaWRnZXRGYWN0b3J5LCBJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtcbiAgICAgICAgSUNvbW1hbmRQYWxldHRlLFxuICAgICAgICBJRmlsZUJyb3dzZXJGYWN0b3J5LFxuICAgICAgICBJTGF1bmNoZXIsXG4gICAgICAgIElMYXlvdXRSZXN0b3JlcixcbiAgICAgICAgSU1haW5NZW51LFxuICAgICAgICBJU2V0dGluZ1JlZ2lzdHJ5LFxuICAgICAgICBJU2Vzc2lvbkNvbnRleHREaWFsb2dzXG4gICAgXSxcbiAgICBhY3RpdmF0ZTogYWN0aXZhdGVOb3RlYm9va0hhbmRsZXIsXG4gICAgYXV0b1N0YXJ0OiB0cnVlXG59O1xuLyoqXG4gKiBUaGUgbm90ZWJvb2sgY2VsbCBmYWN0b3J5IHByb3ZpZGVyLlxuICovXG5jb25zdCBmYWN0b3J5ID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvbm90ZWJvb2stZXh0ZW5zaW9uOmZhY3RvcnknLFxuICAgIHByb3ZpZGVzOiBOb3RlYm9va1BhbmVsLklDb250ZW50RmFjdG9yeSxcbiAgICByZXF1aXJlczogW0lFZGl0b3JTZXJ2aWNlc10sXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBlZGl0b3JTZXJ2aWNlcykgPT4ge1xuICAgICAgICBjb25zdCBlZGl0b3JGYWN0b3J5ID0gZWRpdG9yU2VydmljZXMuZmFjdG9yeVNlcnZpY2UubmV3SW5saW5lRWRpdG9yO1xuICAgICAgICByZXR1cm4gbmV3IE5vdGVib29rUGFuZWwuQ29udGVudEZhY3RvcnkoeyBlZGl0b3JGYWN0b3J5IH0pO1xuICAgIH1cbn07XG4vKipcbiAqIFRoZSBub3RlYm9vayB0b29scyBleHRlbnNpb24uXG4gKi9cbmNvbnN0IHRvb2xzID0ge1xuICAgIGFjdGl2YXRlOiBhY3RpdmF0ZU5vdGVib29rVG9vbHMsXG4gICAgcHJvdmlkZXM6IElOb3RlYm9va1Rvb2xzLFxuICAgIGlkOiAnQGp1cHl0ZXJsYWIvbm90ZWJvb2stZXh0ZW5zaW9uOnRvb2xzJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJTm90ZWJvb2tUcmFja2VyLCBJRWRpdG9yU2VydmljZXMsIElTdGF0ZURCLCBJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtJUHJvcGVydHlJbnNwZWN0b3JQcm92aWRlcl1cbn07XG4vKipcbiAqIEEgcGx1Z2luIHByb3ZpZGluZyBhIENvbW1hbmRFZGl0IHN0YXR1cyBpdGVtLlxuICovXG5leHBvcnQgY29uc3QgY29tbWFuZEVkaXRJdGVtID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvbm90ZWJvb2stZXh0ZW5zaW9uOm1vZGUtc3RhdHVzJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJTm90ZWJvb2tUcmFja2VyLCBJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtJU3RhdHVzQmFyXSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgdHJhY2tlciwgdHJhbnNsYXRvciwgc3RhdHVzQmFyKSA9PiB7XG4gICAgICAgIGlmICghc3RhdHVzQmFyKSB7XG4gICAgICAgICAgICAvLyBBdXRvbWF0aWNhbGx5IGRpc2FibGUgaWYgc3RhdHVzYmFyIG1pc3NpbmdcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IHNoZWxsIH0gPSBhcHA7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXcgQ29tbWFuZEVkaXRTdGF0dXModHJhbnNsYXRvcik7XG4gICAgICAgIC8vIEtlZXAgdGhlIHN0YXR1cyBpdGVtIHVwLXRvLWRhdGUgd2l0aCB0aGUgY3VycmVudCBub3RlYm9vay5cbiAgICAgICAgdHJhY2tlci5jdXJyZW50Q2hhbmdlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICBpdGVtLm1vZGVsLm5vdGVib29rID0gY3VycmVudCAmJiBjdXJyZW50LmNvbnRlbnQ7XG4gICAgICAgIH0pO1xuICAgICAgICBzdGF0dXNCYXIucmVnaXN0ZXJTdGF0dXNJdGVtKCdAanVweXRlcmxhYi9ub3RlYm9vay1leHRlbnNpb246bW9kZS1zdGF0dXMnLCB7XG4gICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgYWxpZ246ICdyaWdodCcsXG4gICAgICAgICAgICByYW5rOiA0LFxuICAgICAgICAgICAgaXNBY3RpdmU6ICgpID0+ICEhc2hlbGwuY3VycmVudFdpZGdldCAmJlxuICAgICAgICAgICAgICAgICEhdHJhY2tlci5jdXJyZW50V2lkZ2V0ICYmXG4gICAgICAgICAgICAgICAgc2hlbGwuY3VycmVudFdpZGdldCA9PT0gdHJhY2tlci5jdXJyZW50V2lkZ2V0XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4vKipcbiAqIEEgcGx1Z2luIHRoYXQgcHJvdmlkZXMgYSBleGVjdXRpb24gaW5kaWNhdG9yIGl0ZW0gdG8gdGhlIHN0YXR1cyBiYXIuXG4gKi9cbmV4cG9ydCBjb25zdCBleGVjdXRpb25JbmRpY2F0b3IgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9ub3RlYm9vay1leHRlbnNpb246ZXhlY3V0aW9uLWluZGljYXRvcicsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHJlcXVpcmVzOiBbSU5vdGVib29rVHJhY2tlciwgSUxhYlNoZWxsLCBJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtJU3RhdHVzQmFyLCBJU2V0dGluZ1JlZ2lzdHJ5XSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgbm90ZWJvb2tUcmFja2VyLCBsYWJTaGVsbCwgdHJhbnNsYXRvciwgc3RhdHVzQmFyLCBzZXR0aW5nUmVnaXN0cnkpID0+IHtcbiAgICAgICAgbGV0IHN0YXR1c2Jhckl0ZW07XG4gICAgICAgIGxldCBsYWJTaGVsbEN1cnJlbnRDaGFuZ2VkO1xuICAgICAgICBsZXQgc3RhdHVzQmFyRGlzcG9zYWJsZTtcbiAgICAgICAgY29uc3QgdXBkYXRlU2V0dGluZ3MgPSAoc2V0dGluZ3MpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICBsZXQgeyBzaG93T25Ub29sQmFyLCBzaG93UHJvZ3Jlc3MgfSA9IHNldHRpbmdzO1xuICAgICAgICAgICAgaWYgKCFzaG93T25Ub29sQmFyKSB7XG4gICAgICAgICAgICAgICAgLy8gU3RhdHVzIGJhciBtb2RlLCBvbmx5IG9uZSBgRXhlY3V0aW9uSW5kaWNhdG9yYCBpcyBuZWVkZWQuXG4gICAgICAgICAgICAgICAgaWYgKCFzdGF0dXNCYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXV0b21hdGljYWxseSBkaXNhYmxlIGlmIHN0YXR1c2JhciBtaXNzaW5nXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEoc3RhdHVzYmFySXRlbSA9PT0gbnVsbCB8fCBzdGF0dXNiYXJJdGVtID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0dXNiYXJJdGVtLm1vZGVsKSkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNiYXJJdGVtID0gbmV3IEV4ZWN1dGlvbkluZGljYXRvcih0cmFuc2xhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgbGFiU2hlbGxDdXJyZW50Q2hhbmdlZCA9IChfLCBjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbmV3VmFsdWUgfSA9IGNoYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAmJiBub3RlYm9va1RyYWNrZXIuaGFzKG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhbmVsID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzYmFySXRlbS5tb2RlbC5hdHRhY2hOb3RlYm9vayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHBhbmVsLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHBhbmVsLnNlc3Npb25Db250ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0JhckRpc3Bvc2FibGUgPSBzdGF0dXNCYXIucmVnaXN0ZXJTdGF0dXNJdGVtKCdAanVweXRlcmxhYi9ub3RlYm9vay1leHRlbnNpb246ZXhlY3V0aW9uLWluZGljYXRvcicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IHN0YXR1c2Jhckl0ZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbjogJ2xlZnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuazogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGxhYlNoZWxsLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhY3VycmVudCAmJiBub3RlYm9va1RyYWNrZXIuaGFzKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzYmFySXRlbS5tb2RlbC5hdHRhY2hOb3RlYm9vayh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAoX2EgPSBub3RlYm9va1RyYWNrZXIuY3VycmVudFdpZGdldCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiAoX2IgPSBub3RlYm9va1RyYWNrZXIuY3VycmVudFdpZGdldCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnNlc3Npb25Db250ZXh0XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBsYWJTaGVsbC5jdXJyZW50Q2hhbmdlZC5jb25uZWN0KGxhYlNoZWxsQ3VycmVudENoYW5nZWQpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNiYXJJdGVtLmRpc3Bvc2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiU2hlbGwuY3VycmVudENoYW5nZWQuZGlzY29ubmVjdChsYWJTaGVsbEN1cnJlbnRDaGFuZ2VkKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YXR1c2Jhckl0ZW0ubW9kZWwuZGlzcGxheU9wdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd09uVG9vbEJhcixcbiAgICAgICAgICAgICAgICAgICAgc2hvd1Byb2dyZXNzXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vUmVtb3ZlIG9sZCBpbmRpY2F0b3Igd2lkZ2V0IG9uIHN0YXR1cyBiYXJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzQmFyRGlzcG9zYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBsYWJTaGVsbC5jdXJyZW50Q2hhbmdlZC5kaXNjb25uZWN0KGxhYlNoZWxsQ3VycmVudENoYW5nZWQpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNCYXJEaXNwb3NhYmxlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChzZXR0aW5nUmVnaXN0cnkpIHtcbiAgICAgICAgICAgIC8vIEluZGljYXRvciBpcyBkZWZhdWx0IGluIHRvb2wgYmFyLCB1c2VyIG5lZWRzIHRvIHNwZWNpZnkgaXRzXG4gICAgICAgICAgICAvLyBwb3NpdGlvbiBpbiBzZXR0aW5ncyBpbiBvcmRlciB0byBoYXZlIGluZGljYXRvciBvbiBzdGF0dXMgYmFyLlxuICAgICAgICAgICAgY29uc3QgbG9hZFNldHRpbmdzID0gc2V0dGluZ1JlZ2lzdHJ5LmxvYWQodHJhY2tlclBsdWdpbi5pZCk7XG4gICAgICAgICAgICBQcm9taXNlLmFsbChbbG9hZFNldHRpbmdzLCBhcHAucmVzdG9yZWRdKVxuICAgICAgICAgICAgICAgIC50aGVuKChbc2V0dGluZ3NdKSA9PiB7XG4gICAgICAgICAgICAgICAgdXBkYXRlU2V0dGluZ3MoRXhlY3V0aW9uSW5kaWNhdG9yLmdldFNldHRpbmdWYWx1ZShzZXR0aW5ncykpO1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLmNoYW5nZWQuY29ubmVjdChzZW5kZXIgPT4gdXBkYXRlU2V0dGluZ3MoRXhlY3V0aW9uSW5kaWNhdG9yLmdldFNldHRpbmdWYWx1ZShzZW5kZXIpKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihyZWFzb24ubWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4vKipcbiAqIEEgcGx1Z2luIHByb3ZpZGluZyBleHBvcnQgY29tbWFuZHMgaW4gdGhlIG1haW4gbWVudSBhbmQgY29tbWFuZCBwYWxldHRlXG4gKi9cbmV4cG9ydCBjb25zdCBleHBvcnRQbHVnaW4gPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9ub3RlYm9vay1leHRlbnNpb246ZXhwb3J0JyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJVHJhbnNsYXRvciwgSU5vdGVib29rVHJhY2tlcl0sXG4gICAgb3B0aW9uYWw6IFtJTWFpbk1lbnUsIElDb21tYW5kUGFsZXR0ZV0sXG4gICAgYWN0aXZhdGU6IChhcHAsIHRyYW5zbGF0b3IsIHRyYWNrZXIsIG1haW5NZW51LCBwYWxldHRlKSA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kcywgc2hlbGwgfSA9IGFwcDtcbiAgICAgICAgY29uc3Qgc2VydmljZXMgPSBhcHAuc2VydmljZU1hbmFnZXI7XG4gICAgICAgIGNvbnN0IGlzRW5hYmxlZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBQcml2YXRlLmlzRW5hYmxlZChzaGVsbCwgdHJhY2tlcik7XG4gICAgICAgIH07XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5leHBvcnRUb0Zvcm1hdCwge1xuICAgICAgICAgICAgbGFiZWw6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdExhYmVsID0gYXJnc1snbGFiZWwnXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJnc1snaXNQYWxldHRlJ11cbiAgICAgICAgICAgICAgICAgICAgPyB0cmFucy5fXygnU2F2ZSBhbmQgRXhwb3J0IE5vdGVib29rOiAlMScsIGZvcm1hdExhYmVsKVxuICAgICAgICAgICAgICAgICAgICA6IGZvcm1hdExhYmVsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBQYWdlQ29uZmlnLmdldE5CQ29udmVydFVSTCh7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogYXJnc1snZm9ybWF0J10sXG4gICAgICAgICAgICAgICAgICAgIGRvd25sb2FkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBjdXJyZW50LmNvbnRleHQucGF0aFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgY29udGV4dCB9ID0gY3VycmVudDtcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5tb2RlbC5kaXJ0eSAmJiAhY29udGV4dC5tb2RlbC5yZWFkT25seSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5zYXZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cub3Blbih1cmwsICdfYmxhbmsnLCAnbm9vcGVuZXInKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJywgJ25vb3BlbmVyJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VuYWJsZWRcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEFkZCBhIG5vdGVib29rIGdyb3VwIHRvIHRoZSBGaWxlIG1lbnUuXG4gICAgICAgIGxldCBleHBvcnRUbztcbiAgICAgICAgaWYgKG1haW5NZW51KSB7XG4gICAgICAgICAgICBleHBvcnRUbyA9IChfYSA9IG1haW5NZW51LmZpbGVNZW51Lml0ZW1zLmZpbmQoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnR5cGUgPT09ICdzdWJtZW51JyAmJlxuICAgICAgICAgICAgICAgICAgICAoKF9hID0gaXRlbS5zdWJtZW51KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWQpID09PSAnanAtbWFpbm1lbnUtZmlsZS1ub3RlYm9va2V4cG9ydCc7XG4gICAgICAgICAgICB9KSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnN1Ym1lbnU7XG4gICAgICAgIH1cbiAgICAgICAgdm9pZCBzZXJ2aWNlcy5uYmNvbnZlcnQuZ2V0RXhwb3J0Rm9ybWF0cygpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0TGFiZWxzID0gUHJpdmF0ZS5nZXRGb3JtYXRMYWJlbHModHJhbnNsYXRvcik7XG4gICAgICAgICAgICAgICAgLy8gQ29udmVydCBleHBvcnQgbGlzdCB0byBwYWxldHRlIGFuZCBtZW51IGl0ZW1zLlxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdExpc3QgPSBPYmplY3Qua2V5cyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgZm9ybWF0TGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FwQ2FzZUtleSA9IHRyYW5zLl9fKGtleVswXS50b1VwcGVyQ2FzZSgpICsga2V5LnN1YnN0cigxKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsU3RyID0gZm9ybWF0TGFiZWxzW2tleV0gPyBmb3JtYXRMYWJlbHNba2V5XSA6IGNhcENhc2VLZXk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcmdzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogbGFiZWxTdHIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1BhbGV0dGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmIChGT1JNQVRfRVhDTFVERS5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhwb3J0VG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBvcnRUby5hZGRJdGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy5leHBvcnRUb0Zvcm1hdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogYXJnc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhbGV0dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGxhYmVsU3RyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1BhbGV0dGU6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gdHJhbnMuX18oJ05vdGVib29rIE9wZXJhdGlvbnMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWxldHRlLmFkZEl0ZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLmV4cG9ydFRvRm9ybWF0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4vKipcbiAqIEEgcGx1Z2luIHRoYXQgYWRkcyBhIG5vdGVib29rIHRydXN0IHN0YXR1cyBpdGVtIHRvIHRoZSBzdGF0dXMgYmFyLlxuICovXG5leHBvcnQgY29uc3Qgbm90ZWJvb2tUcnVzdEl0ZW0gPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9ub3RlYm9vay1leHRlbnNpb246dHJ1c3Qtc3RhdHVzJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJTm90ZWJvb2tUcmFja2VyLCBJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtJU3RhdHVzQmFyXSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgdHJhY2tlciwgdHJhbmxhdG9yLCBzdGF0dXNCYXIpID0+IHtcbiAgICAgICAgaWYgKCFzdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIC8vIEF1dG9tYXRpY2FsbHkgZGlzYWJsZSBpZiBzdGF0dXNiYXIgbWlzc2luZ1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgc2hlbGwgfSA9IGFwcDtcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ldyBOb3RlYm9va1RydXN0U3RhdHVzKHRyYW5sYXRvcik7XG4gICAgICAgIC8vIEtlZXAgdGhlIHN0YXR1cyBpdGVtIHVwLXRvLWRhdGUgd2l0aCB0aGUgY3VycmVudCBub3RlYm9vay5cbiAgICAgICAgdHJhY2tlci5jdXJyZW50Q2hhbmdlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICBpdGVtLm1vZGVsLm5vdGVib29rID0gY3VycmVudCAmJiBjdXJyZW50LmNvbnRlbnQ7XG4gICAgICAgIH0pO1xuICAgICAgICBzdGF0dXNCYXIucmVnaXN0ZXJTdGF0dXNJdGVtKCdAanVweXRlcmxhYi9ub3RlYm9vay1leHRlbnNpb246dHJ1c3Qtc3RhdHVzJywge1xuICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgIGFsaWduOiAncmlnaHQnLFxuICAgICAgICAgICAgcmFuazogMyxcbiAgICAgICAgICAgIGlzQWN0aXZlOiAoKSA9PiAhIXNoZWxsLmN1cnJlbnRXaWRnZXQgJiZcbiAgICAgICAgICAgICAgICAhIXRyYWNrZXIuY3VycmVudFdpZGdldCAmJlxuICAgICAgICAgICAgICAgIHNoZWxsLmN1cnJlbnRXaWRnZXQgPT09IHRyYWNrZXIuY3VycmVudFdpZGdldFxuICAgICAgICB9KTtcbiAgICB9XG59O1xuLyoqXG4gKiBUaGUgbm90ZWJvb2sgd2lkZ2V0IGZhY3RvcnkgcHJvdmlkZXIuXG4gKi9cbmNvbnN0IHdpZGdldEZhY3RvcnlQbHVnaW4gPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9ub3RlYm9vay1leHRlbnNpb246d2lkZ2V0LWZhY3RvcnknLFxuICAgIHByb3ZpZGVzOiBJTm90ZWJvb2tXaWRnZXRGYWN0b3J5LFxuICAgIHJlcXVpcmVzOiBbXG4gICAgICAgIE5vdGVib29rUGFuZWwuSUNvbnRlbnRGYWN0b3J5LFxuICAgICAgICBJRWRpdG9yU2VydmljZXMsXG4gICAgICAgIElSZW5kZXJNaW1lUmVnaXN0cnksXG4gICAgICAgIElTZXNzaW9uQ29udGV4dERpYWxvZ3MsXG4gICAgICAgIElUb29sYmFyV2lkZ2V0UmVnaXN0cnksXG4gICAgICAgIElUcmFuc2xhdG9yXG4gICAgXSxcbiAgICBvcHRpb25hbDogW0lTZXR0aW5nUmVnaXN0cnldLFxuICAgIGFjdGl2YXRlOiBhY3RpdmF0ZVdpZGdldEZhY3RvcnksXG4gICAgYXV0b1N0YXJ0OiB0cnVlXG59O1xuLyoqXG4gKiBUaGUgY2xvbmVkIG91dHB1dCBwcm92aWRlci5cbiAqL1xuY29uc3QgY2xvbmVkT3V0cHV0c1BsdWdpbiA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL25vdGVib29rLWV4dGVuc2lvbjpjbG9uZWQtb3V0cHV0cycsXG4gICAgcmVxdWlyZXM6IFtJRG9jdW1lbnRNYW5hZ2VyLCBJTm90ZWJvb2tUcmFja2VyLCBJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtJTGF5b3V0UmVzdG9yZXJdLFxuICAgIGFjdGl2YXRlOiBhY3RpdmF0ZUNsb25lZE91dHB1dHMsXG4gICAgYXV0b1N0YXJ0OiB0cnVlXG59O1xuLyoqXG4gKiBBIHBsdWdpbiBmb3IgY29kZSBjb25zb2xlcyBmdW5jdGlvbmFsaXRpZXMuXG4gKi9cbmNvbnN0IGNvZGVDb25zb2xlUGx1Z2luID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvbm90ZWJvb2stZXh0ZW5zaW9uOmNvZGUtY29uc29sZScsXG4gICAgcmVxdWlyZXM6IFtJTm90ZWJvb2tUcmFja2VyLCBJVHJhbnNsYXRvcl0sXG4gICAgYWN0aXZhdGU6IGFjdGl2YXRlQ29kZUNvbnNvbGUsXG4gICAgYXV0b1N0YXJ0OiB0cnVlXG59O1xuLyoqXG4gKiBBIHBsdWdpbiB0byBjb3B5IENvZGVDZWxsIG91dHB1dHMuXG4gKi9cbmNvbnN0IGNvcHlPdXRwdXRQbHVnaW4gPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9ub3RlYm9vay1leHRlbnNpb25zOmNvcHktb3V0cHV0JyxcbiAgICBhY3RpdmF0ZTogYWN0aXZhdGVDb3B5T3V0cHV0LFxuICAgIHJlcXVpcmVzOiBbSVRyYW5zbGF0b3IsIElOb3RlYm9va1RyYWNrZXJdLFxuICAgIGF1dG9TdGFydDogdHJ1ZVxufTtcbi8qKlxuICogRXhwb3J0IHRoZSBwbHVnaW5zIGFzIGRlZmF1bHQuXG4gKi9cbmNvbnN0IHBsdWdpbnMgPSBbXG4gICAgZmFjdG9yeSxcbiAgICB0cmFja2VyUGx1Z2luLFxuICAgIGV4ZWN1dGlvbkluZGljYXRvcixcbiAgICBleHBvcnRQbHVnaW4sXG4gICAgdG9vbHMsXG4gICAgY29tbWFuZEVkaXRJdGVtLFxuICAgIG5vdGVib29rVHJ1c3RJdGVtLFxuICAgIHdpZGdldEZhY3RvcnlQbHVnaW4sXG4gICAgbG9nTm90ZWJvb2tPdXRwdXQsXG4gICAgY2xvbmVkT3V0cHV0c1BsdWdpbixcbiAgICBjb2RlQ29uc29sZVBsdWdpbixcbiAgICBjb3B5T3V0cHV0UGx1Z2luXG5dO1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2lucztcbi8qKlxuICogQWN0aXZhdGUgdGhlIG5vdGVib29rIHRvb2xzIGV4dGVuc2lvbi5cbiAqL1xuZnVuY3Rpb24gYWN0aXZhdGVOb3RlYm9va1Rvb2xzKGFwcCwgdHJhY2tlciwgZWRpdG9yU2VydmljZXMsIHN0YXRlLCB0cmFuc2xhdG9yLCBpbnNwZWN0b3JQcm92aWRlcikge1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgY29uc3QgaWQgPSAnbm90ZWJvb2stdG9vbHMnO1xuICAgIGNvbnN0IG5vdGVib29rVG9vbHMgPSBuZXcgTm90ZWJvb2tUb29scyh7IHRyYWNrZXIsIHRyYW5zbGF0b3IgfSk7XG4gICAgY29uc3QgYWN0aXZlQ2VsbFRvb2wgPSBuZXcgTm90ZWJvb2tUb29scy5BY3RpdmVDZWxsVG9vbCgpO1xuICAgIGNvbnN0IHNsaWRlU2hvdyA9IE5vdGVib29rVG9vbHMuY3JlYXRlU2xpZGVTaG93U2VsZWN0b3IodHJhbnNsYXRvcik7XG4gICAgY29uc3QgZWRpdG9yRmFjdG9yeSA9IGVkaXRvclNlcnZpY2VzLmZhY3RvcnlTZXJ2aWNlLm5ld0lubGluZUVkaXRvcjtcbiAgICBjb25zdCBjZWxsTWV0YWRhdGFFZGl0b3IgPSBuZXcgTm90ZWJvb2tUb29scy5DZWxsTWV0YWRhdGFFZGl0b3JUb29sKHtcbiAgICAgICAgZWRpdG9yRmFjdG9yeSxcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgdHJhbnNsYXRvclxuICAgIH0pO1xuICAgIGNvbnN0IG5vdGVib29rTWV0YWRhdGFFZGl0b3IgPSBuZXcgTm90ZWJvb2tUb29scy5Ob3RlYm9va01ldGFkYXRhRWRpdG9yVG9vbCh7XG4gICAgICAgIGVkaXRvckZhY3RvcnksXG4gICAgICAgIHRyYW5zbGF0b3JcbiAgICB9KTtcbiAgICBjb25zdCBzZXJ2aWNlcyA9IGFwcC5zZXJ2aWNlTWFuYWdlcjtcbiAgICAvLyBDcmVhdGUgbWVzc2FnZSBob29rIGZvciB0cmlnZ2VycyB0byBzYXZlIHRvIHRoZSBkYXRhYmFzZS5cbiAgICBjb25zdCBob29rID0gKHNlbmRlciwgbWVzc2FnZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnYWN0aXZhdGUtcmVxdWVzdCc6XG4gICAgICAgICAgICAgICAgdm9pZCBzdGF0ZS5zYXZlKGlkLCB7IG9wZW46IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdhZnRlci1oaWRlJzpcbiAgICAgICAgICAgIGNhc2UgJ2Nsb3NlLXJlcXVlc3QnOlxuICAgICAgICAgICAgICAgIHZvaWQgc3RhdGUucmVtb3ZlKGlkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBjb25zdCBvcHRpb25zTWFwID0ge307XG4gICAgb3B0aW9uc01hcC5Ob25lID0gbnVsbDtcbiAgICB2b2lkIHNlcnZpY2VzLm5iY29udmVydC5nZXRFeHBvcnRGb3JtYXRzKCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgZXhjbHVkZWQgQ2VsbCBJbnNwZWN0b3IgUmF3IE5iQ29udmVydCBGb3JtYXRzXG4gICAgICAgICAgICAgKiAocmV0dXJuZWQgZnJvbSBuYmNvbnZlcnQncyBleHBvcnQgbGlzdClcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3QgcmF3Rm9ybWF0RXhjbHVkZSA9IFtcbiAgICAgICAgICAgICAgICAncGRmJyxcbiAgICAgICAgICAgICAgICAnc2xpZGVzJyxcbiAgICAgICAgICAgICAgICAnc2NyaXB0JyxcbiAgICAgICAgICAgICAgICAnbm90ZWJvb2snLFxuICAgICAgICAgICAgICAgICdjdXN0b20nXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgbGV0IG9wdGlvblZhbHVlQXJyYXkgPSBbXG4gICAgICAgICAgICAgICAgW3RyYW5zLl9fKCdQREYnKSwgJ3BkZiddLFxuICAgICAgICAgICAgICAgIFt0cmFucy5fXygnU2xpZGVzJyksICdzbGlkZXMnXSxcbiAgICAgICAgICAgICAgICBbdHJhbnMuX18oJ1NjcmlwdCcpLCAnc2NyaXB0J10sXG4gICAgICAgICAgICAgICAgW3RyYW5zLl9fKCdOb3RlYm9vaycpLCAnbm90ZWJvb2snXSxcbiAgICAgICAgICAgICAgICBbdHJhbnMuX18oJ0N1c3RvbScpLCAnY3VzdG9tJ11cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICAvLyBjb252ZXJ0IGV4cG9ydExpc3QgdG8gcGFsZXR0ZSBhbmQgbWVudSBpdGVtc1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0TGlzdCA9IE9iamVjdC5rZXlzKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdExhYmVscyA9IFByaXZhdGUuZ2V0Rm9ybWF0TGFiZWxzKHRyYW5zbGF0b3IpO1xuICAgICAgICAgICAgZm9ybWF0TGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAocmF3Rm9ybWF0RXhjbHVkZS5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsdE9wdGlvbiA9IHRyYW5zLl9fKGtleVswXS50b1VwcGVyQ2FzZSgpICsga2V5LnN1YnN0cigxKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGZvcm1hdExhYmVsc1trZXldID8gZm9ybWF0TGFiZWxzW2tleV0gOiBhbHRPcHRpb247XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlVmFsdWUgPSByZXNwb25zZVtrZXldLm91dHB1dF9taW1ldHlwZTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uVmFsdWVBcnJheS5wdXNoKFtvcHRpb24sIG1pbWVUeXBlVmFsdWVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IG5iQ29udmVydCA9IE5vdGVib29rVG9vbHMuY3JlYXRlTkJDb252ZXJ0U2VsZWN0b3Iob3B0aW9uVmFsdWVBcnJheSwgdHJhbnNsYXRvcik7XG4gICAgICAgICAgICBub3RlYm9va1Rvb2xzLmFkZEl0ZW0oeyB0b29sOiBuYkNvbnZlcnQsIHNlY3Rpb246ICdjb21tb24nLCByYW5rOiAzIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgbm90ZWJvb2tUb29scy50aXRsZS5pY29uID0gYnVpbGRJY29uO1xuICAgIG5vdGVib29rVG9vbHMudGl0bGUuY2FwdGlvbiA9IHRyYW5zLl9fKCdOb3RlYm9vayBUb29scycpO1xuICAgIG5vdGVib29rVG9vbHMuaWQgPSBpZDtcbiAgICBub3RlYm9va1Rvb2xzLmFkZEl0ZW0oeyB0b29sOiBhY3RpdmVDZWxsVG9vbCwgc2VjdGlvbjogJ2NvbW1vbicsIHJhbms6IDEgfSk7XG4gICAgbm90ZWJvb2tUb29scy5hZGRJdGVtKHsgdG9vbDogc2xpZGVTaG93LCBzZWN0aW9uOiAnY29tbW9uJywgcmFuazogMiB9KTtcbiAgICBub3RlYm9va1Rvb2xzLmFkZEl0ZW0oe1xuICAgICAgICB0b29sOiBjZWxsTWV0YWRhdGFFZGl0b3IsXG4gICAgICAgIHNlY3Rpb246ICdhZHZhbmNlZCcsXG4gICAgICAgIHJhbms6IDFcbiAgICB9KTtcbiAgICBub3RlYm9va1Rvb2xzLmFkZEl0ZW0oe1xuICAgICAgICB0b29sOiBub3RlYm9va01ldGFkYXRhRWRpdG9yLFxuICAgICAgICBzZWN0aW9uOiAnYWR2YW5jZWQnLFxuICAgICAgICByYW5rOiAyXG4gICAgfSk7XG4gICAgTWVzc2FnZUxvb3AuaW5zdGFsbE1lc3NhZ2VIb29rKG5vdGVib29rVG9vbHMsIGhvb2spO1xuICAgIGlmIChpbnNwZWN0b3JQcm92aWRlcikge1xuICAgICAgICB0cmFja2VyLndpZGdldEFkZGVkLmNvbm5lY3QoKHNlbmRlciwgcGFuZWwpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluc3BlY3RvciA9IGluc3BlY3RvclByb3ZpZGVyLnJlZ2lzdGVyKHBhbmVsKTtcbiAgICAgICAgICAgIGluc3BlY3Rvci5yZW5kZXIobm90ZWJvb2tUb29scyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbm90ZWJvb2tUb29scztcbn1cbi8qKlxuICogQWN0aXZhdGUgdGhlIG5vdGVib29rIHdpZGdldCBmYWN0b3J5LlxuICovXG5mdW5jdGlvbiBhY3RpdmF0ZVdpZGdldEZhY3RvcnkoYXBwLCBjb250ZW50RmFjdG9yeSwgZWRpdG9yU2VydmljZXMsIHJlbmRlcm1pbWUsIHNlc3Npb25Db250ZXh0RGlhbG9ncywgdG9vbGJhclJlZ2lzdHJ5LCB0cmFuc2xhdG9yLCBzZXR0aW5nUmVnaXN0cnkpIHtcbiAgICBjb25zdCBwcmVmZXJLZXJuZWxPcHRpb24gPSBQYWdlQ29uZmlnLmdldE9wdGlvbignbm90ZWJvb2tTdGFydHNLZXJuZWwnKTtcbiAgICAvLyBJZiB0aGUgb3B0aW9uIGlzIG5vdCBzZXQsIGFzc3VtZSBgdHJ1ZWBcbiAgICBjb25zdCBwcmVmZXJLZXJuZWxWYWx1ZSA9IHByZWZlcktlcm5lbE9wdGlvbiA9PT0gJycgfHwgcHJlZmVyS2VybmVsT3B0aW9uLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJztcbiAgICBjb25zdCB7IGNvbW1hbmRzIH0gPSBhcHA7XG4gICAgbGV0IHRvb2xiYXJGYWN0b3J5O1xuICAgIC8vIFJlZ2lzdGVyIG5vdGVib29rIHRvb2xiYXIgd2lkZ2V0c1xuICAgIHRvb2xiYXJSZWdpc3RyeS5yZWdpc3RlckZhY3RvcnkoRkFDVE9SWSwgJ3NhdmUnLCBwYW5lbCA9PiBEb2NUb29sYmFySXRlbXMuY3JlYXRlU2F2ZUJ1dHRvbihjb21tYW5kcywgcGFuZWwuY29udGV4dC5maWxlQ2hhbmdlZCkpO1xuICAgIHRvb2xiYXJSZWdpc3RyeS5yZWdpc3RlckZhY3RvcnkoRkFDVE9SWSwgJ2NlbGxUeXBlJywgcGFuZWwgPT4gVG9vbGJhckl0ZW1zLmNyZWF0ZUNlbGxUeXBlSXRlbShwYW5lbCwgdHJhbnNsYXRvcikpO1xuICAgIHRvb2xiYXJSZWdpc3RyeS5yZWdpc3RlckZhY3RvcnkoRkFDVE9SWSwgJ2tlcm5lbE5hbWUnLCBwYW5lbCA9PiBUb29sYmFyLmNyZWF0ZUtlcm5lbE5hbWVJdGVtKHBhbmVsLnNlc3Npb25Db250ZXh0LCBzZXNzaW9uQ29udGV4dERpYWxvZ3MsIHRyYW5zbGF0b3IpKTtcbiAgICB0b29sYmFyUmVnaXN0cnkucmVnaXN0ZXJGYWN0b3J5KEZBQ1RPUlksICdleGVjdXRpb25Qcm9ncmVzcycsIHBhbmVsID0+IHtcbiAgICAgICAgcmV0dXJuIEV4ZWN1dGlvbkluZGljYXRvci5jcmVhdGVFeGVjdXRpb25JbmRpY2F0b3JJdGVtKHBhbmVsLCB0cmFuc2xhdG9yLCBzZXR0aW5nUmVnaXN0cnkgPT09IG51bGwgfHwgc2V0dGluZ1JlZ2lzdHJ5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXR0aW5nUmVnaXN0cnkubG9hZCh0cmFja2VyUGx1Z2luLmlkKSk7XG4gICAgfSk7XG4gICAgaWYgKHNldHRpbmdSZWdpc3RyeSkge1xuICAgICAgICAvLyBDcmVhdGUgdGhlIGZhY3RvcnlcbiAgICAgICAgdG9vbGJhckZhY3RvcnkgPSBjcmVhdGVUb29sYmFyRmFjdG9yeSh0b29sYmFyUmVnaXN0cnksIHNldHRpbmdSZWdpc3RyeSwgRkFDVE9SWSwgUEFORUxfU0VUVElOR1MsIHRyYW5zbGF0b3IpO1xuICAgIH1cbiAgICBjb25zdCBmYWN0b3J5ID0gbmV3IE5vdGVib29rV2lkZ2V0RmFjdG9yeSh7XG4gICAgICAgIG5hbWU6IEZBQ1RPUlksXG4gICAgICAgIGZpbGVUeXBlczogWydub3RlYm9vayddLFxuICAgICAgICBtb2RlbE5hbWU6ICdub3RlYm9vaycsXG4gICAgICAgIGRlZmF1bHRGb3I6IFsnbm90ZWJvb2snXSxcbiAgICAgICAgcHJlZmVyS2VybmVsOiBwcmVmZXJLZXJuZWxWYWx1ZSxcbiAgICAgICAgY2FuU3RhcnRLZXJuZWw6IHRydWUsXG4gICAgICAgIGF1dG9TdGFydERlZmF1bHQ6IHRydWUsXG4gICAgICAgIHJlbmRlcm1pbWUsXG4gICAgICAgIGNvbnRlbnRGYWN0b3J5LFxuICAgICAgICBlZGl0b3JDb25maWc6IFN0YXRpY05vdGVib29rLmRlZmF1bHRFZGl0b3JDb25maWcsXG4gICAgICAgIG5vdGVib29rQ29uZmlnOiBTdGF0aWNOb3RlYm9vay5kZWZhdWx0Tm90ZWJvb2tDb25maWcsXG4gICAgICAgIG1pbWVUeXBlU2VydmljZTogZWRpdG9yU2VydmljZXMubWltZVR5cGVTZXJ2aWNlLFxuICAgICAgICBzZXNzaW9uRGlhbG9nczogc2Vzc2lvbkNvbnRleHREaWFsb2dzLFxuICAgICAgICB0b29sYmFyRmFjdG9yeSxcbiAgICAgICAgdHJhbnNsYXRvcjogdHJhbnNsYXRvclxuICAgIH0pO1xuICAgIGFwcC5kb2NSZWdpc3RyeS5hZGRXaWRnZXRGYWN0b3J5KGZhY3RvcnkpO1xuICAgIHJldHVybiBmYWN0b3J5O1xufVxuLyoqXG4gKiBBY3RpdmF0ZSB0aGUgcGx1Z2luIHRvIGNyZWF0ZSBhbmQgdHJhY2sgY2xvbmVkIG91dHB1dHMuXG4gKi9cbmZ1bmN0aW9uIGFjdGl2YXRlQ2xvbmVkT3V0cHV0cyhhcHAsIGRvY01hbmFnZXIsIG5vdGVib29rVHJhY2tlciwgdHJhbnNsYXRvciwgcmVzdG9yZXIpIHtcbiAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgIGNvbnN0IGNsb25lZE91dHB1dHMgPSBuZXcgV2lkZ2V0VHJhY2tlcih7XG4gICAgICAgIG5hbWVzcGFjZTogJ2Nsb25lZC1vdXRwdXRzJ1xuICAgIH0pO1xuICAgIGlmIChyZXN0b3Jlcikge1xuICAgICAgICB2b2lkIHJlc3RvcmVyLnJlc3RvcmUoY2xvbmVkT3V0cHV0cywge1xuICAgICAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy5jcmVhdGVPdXRwdXRWaWV3LFxuICAgICAgICAgICAgYXJnczogd2lkZ2V0ID0+ICh7XG4gICAgICAgICAgICAgICAgcGF0aDogd2lkZ2V0LmNvbnRlbnQucGF0aCxcbiAgICAgICAgICAgICAgICBpbmRleDogd2lkZ2V0LmNvbnRlbnQuaW5kZXhcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmFtZTogd2lkZ2V0ID0+IGAke3dpZGdldC5jb250ZW50LnBhdGh9OiR7d2lkZ2V0LmNvbnRlbnQuaW5kZXh9YCxcbiAgICAgICAgICAgIHdoZW46IG5vdGVib29rVHJhY2tlci5yZXN0b3JlZCAvLyBBZnRlciB0aGUgbm90ZWJvb2sgd2lkZ2V0cyAoYnV0IG5vdCBjb250ZW50cykuXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCB7IGNvbW1hbmRzLCBzaGVsbCB9ID0gYXBwO1xuICAgIGNvbnN0IGlzRW5hYmxlZEFuZFNpbmdsZVNlbGVjdGVkID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gUHJpdmF0ZS5pc0VuYWJsZWRBbmRTaW5nbGVTZWxlY3RlZChzaGVsbCwgbm90ZWJvb2tUcmFja2VyKTtcbiAgICB9O1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jcmVhdGVPdXRwdXRWaWV3LCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnQ3JlYXRlIE5ldyBWaWV3IGZvciBPdXRwdXQnKSxcbiAgICAgICAgZXhlY3V0ZTogYXN5bmMgKGFyZ3MpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGxldCBjZWxsO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnQ7XG4gICAgICAgICAgICAvLyBJZiB3ZSBhcmUgZ2l2ZW4gYSBub3RlYm9vayBwYXRoIGFuZCBjZWxsIGluZGV4LCB0aGVuXG4gICAgICAgICAgICAvLyB1c2UgdGhhdCwgb3RoZXJ3aXNlIHVzZSB0aGUgY3VycmVudCBhY3RpdmUgY2VsbC5cbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBhcmdzLnBhdGg7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBhcmdzLmluZGV4O1xuICAgICAgICAgICAgaWYgKHBhdGggJiYgaW5kZXggIT09IHVuZGVmaW5lZCAmJiBpbmRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBkb2NNYW5hZ2VyLmZpbmRXaWRnZXQocGF0aCwgRkFDVE9SWSk7XG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbm90ZWJvb2tUcmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2VsbCA9IGN1cnJlbnQuY29udGVudC5hY3RpdmVDZWxsO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gY3VycmVudC5jb250ZW50LmFjdGl2ZUNlbGxJbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIE1haW5BcmVhV2lkZ2V0XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gbmV3IFByaXZhdGUuQ2xvbmVkT3V0cHV0QXJlYSh7XG4gICAgICAgICAgICAgICAgbm90ZWJvb2s6IGN1cnJlbnQsXG4gICAgICAgICAgICAgICAgY2VsbCxcbiAgICAgICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgICAgICB0cmFuc2xhdG9yXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IG5ldyBNYWluQXJlYVdpZGdldCh7IGNvbnRlbnQgfSk7XG4gICAgICAgICAgICBjdXJyZW50LmNvbnRleHQuYWRkU2libGluZyh3aWRnZXQsIHtcbiAgICAgICAgICAgICAgICByZWY6IGN1cnJlbnQuaWQsXG4gICAgICAgICAgICAgICAgbW9kZTogJ3NwbGl0LWJvdHRvbSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlQ2xvbmVkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZvaWQgY2xvbmVkT3V0cHV0cy5zYXZlKHdpZGdldCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY3VycmVudC5jb250ZXh0LnBhdGhDaGFuZ2VkLmNvbm5lY3QodXBkYXRlQ2xvbmVkKTtcbiAgICAgICAgICAgIChfYSA9IGN1cnJlbnQuY29udGV4dC5tb2RlbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNlbGxzLmNoYW5nZWQuY29ubmVjdCh1cGRhdGVDbG9uZWQpO1xuICAgICAgICAgICAgLy8gQWRkIHRoZSBjbG9uZWQgb3V0cHV0IHRvIHRoZSBvdXRwdXQgd2lkZ2V0IHRyYWNrZXIuXG4gICAgICAgICAgICB2b2lkIGNsb25lZE91dHB1dHMuYWRkKHdpZGdldCk7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIG91dHB1dCB2aWV3IGlmIHRoZSBwYXJlbnQgbm90ZWJvb2sgaXMgY2xvc2VkLlxuICAgICAgICAgICAgY3VycmVudC5jb250ZW50LmRpc3Bvc2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICBjdXJyZW50LmNvbnRleHQucGF0aENoYW5nZWQuZGlzY29ubmVjdCh1cGRhdGVDbG9uZWQpO1xuICAgICAgICAgICAgICAgIChfYSA9IGN1cnJlbnQuY29udGV4dC5tb2RlbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNlbGxzLmNoYW5nZWQuZGlzY29ubmVjdCh1cGRhdGVDbG9uZWQpO1xuICAgICAgICAgICAgICAgIHdpZGdldC5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkOiBpc0VuYWJsZWRBbmRTaW5nbGVTZWxlY3RlZFxuICAgIH0pO1xufVxuLyoqXG4gKiBBY3RpdmF0ZSB0aGUgcGx1Z2luIHRvIGFkZCBjb2RlIGNvbnNvbGUgZnVuY3Rpb25hbGl0aWVzXG4gKi9cbmZ1bmN0aW9uIGFjdGl2YXRlQ29kZUNvbnNvbGUoYXBwLCB0cmFja2VyLCB0cmFuc2xhdG9yKSB7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICBjb25zdCB7IGNvbW1hbmRzLCBzaGVsbCB9ID0gYXBwO1xuICAgIGNvbnN0IGlzRW5hYmxlZCA9ICgpID0+IFByaXZhdGUuaXNFbmFibGVkKHNoZWxsLCB0cmFja2VyKTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuY3JlYXRlQ29uc29sZSwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ05ldyBDb25zb2xlIGZvciBOb3RlYm9vaycpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJpdmF0ZS5jcmVhdGVDb25zb2xlKGNvbW1hbmRzLCBjdXJyZW50LCBhcmdzWydhY3RpdmF0ZSddKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnJ1bkluQ29uc29sZSwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1J1biBTZWxlY3RlZCBUZXh0IG9yIEN1cnJlbnQgTGluZSBpbiBDb25zb2xlJyksXG4gICAgICAgIGV4ZWN1dGU6IGFzeW5jIChhcmdzKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBub3QgYWN0aXZhdGluZyB0aGUgbm90ZWJvb2sgKHRoZXJlYnkgcHV0dGluZyB0aGUgbm90ZWJvb2tcbiAgICAgICAgICAgIC8vIGludG8gY29tbWFuZCBtb2RlKVxuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IHRyYWNrZXIuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgIGlmICghY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgY29udGV4dCwgY29udGVudCB9ID0gY3VycmVudDtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBjb250ZW50LmFjdGl2ZUNlbGw7XG4gICAgICAgICAgICBjb25zdCBtZXRhZGF0YSA9IGNlbGwgPT09IG51bGwgfHwgY2VsbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2VsbC5tb2RlbC5tZXRhZGF0YS50b0pTT04oKTtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBjb250ZXh0LnBhdGg7XG4gICAgICAgICAgICAvLyBpZ25vcmUgYWN0aW9uIGluIG5vbi1jb2RlIGNlbGxcbiAgICAgICAgICAgIGlmICghY2VsbCB8fCBjZWxsLm1vZGVsLnR5cGUgIT09ICdjb2RlJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBjb2RlO1xuICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gY2VsbC5lZGl0b3I7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSBlZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCB7IHN0YXJ0LCBlbmQgfSA9IHNlbGVjdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gc3RhcnQuY29sdW1uICE9PSBlbmQuY29sdW1uIHx8IHN0YXJ0LmxpbmUgIT09IGVuZC5saW5lO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBzZWxlY3RlZCBjb2RlIGZyb20gdGhlIGVkaXRvci5cbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IGVkaXRvci5nZXRPZmZzZXRBdChzZWxlY3Rpb24uc3RhcnQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IGVkaXRvci5nZXRPZmZzZXRBdChzZWxlY3Rpb24uZW5kKTtcbiAgICAgICAgICAgICAgICBjb2RlID0gZWRpdG9yLm1vZGVsLnZhbHVlLnRleHQuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbm8gc2VsZWN0aW9uLCBmaW5kIHRoZSBjb21wbGV0ZSBzdGF0ZW1lbnQgYXJvdW5kIHRoZSBjdXJyZW50IGxpbmVcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzcmNMaW5lcyA9IGVkaXRvci5tb2RlbC52YWx1ZS50ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgICAgICAgICBsZXQgY3VyTGluZSA9IHNlbGVjdGlvbi5zdGFydC5saW5lO1xuICAgICAgICAgICAgICAgIHdoaWxlIChjdXJMaW5lIDwgZWRpdG9yLmxpbmVDb3VudCAmJlxuICAgICAgICAgICAgICAgICAgICAhc3JjTGluZXNbY3VyTGluZV0ucmVwbGFjZSgvXFxzL2csICcnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VyTGluZSArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiBjdXJMaW5lID4gMCwgd2UgZmlyc3QgZG8gYSBzZWFyY2ggZnJvbSBiZWdpbm5pbmdcbiAgICAgICAgICAgICAgICBsZXQgZnJvbUZpcnN0ID0gY3VyTGluZSA+IDA7XG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0TGluZSA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IGxhc3RMaW5lID0gZmlyc3RMaW5lICsgMTtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb2RlID0gc3JjTGluZXMuc2xpY2UoZmlyc3RMaW5lLCBsYXN0TGluZSkuam9pbignXFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcGx5ID0gYXdhaXQgKChfYiA9IChfYSA9IGN1cnJlbnQuY29udGV4dC5zZXNzaW9uQ29udGV4dC5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eua2VybmVsKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucmVxdWVzdElzQ29tcGxldGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXB5dGhvbiBuZWVkcyBhbiBlbXB0eSBsaW5lIGF0IHRoZSBlbmQgdG8gY29ycmVjdGx5IGlkZW50aWZ5IGNvbXBsZXRlbmVzcyBvZiBpbmRlbnRlZCBjb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBjb2RlICsgJ1xcblxcbidcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHJlcGx5ID09PSBudWxsIHx8IHJlcGx5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXBseS5jb250ZW50LnN0YXR1cykgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJMaW5lIDwgbGFzdExpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSBmaW5kIGEgYmxvY2sgb2YgY29tcGxldGUgc3RhdGVtZW50IGNvbnRhaW5pbmcgdGhlIGN1cnJlbnQgbGluZSwgZ3JlYXQhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGxhc3RMaW5lIDwgZWRpdG9yLmxpbmVDb3VudCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhc3JjTGluZXNbbGFzdExpbmVdLnJlcGxhY2UoL1xccy9nLCAnJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RMaW5lICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvci5zZXRDdXJzb3JQb3NpdGlvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IGxhc3RMaW5lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IGN1cnNvci5jb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRpc2NhcmQgdGhlIGNvbXBsZXRlIHN0YXRlbWVudCBiZWZvcmUgdGhlIGN1cnJlbnQgbGluZSBhbmQgY29udGludWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdExpbmUgPSBsYXN0TGluZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0TGluZSA9IGZpcnN0TGluZSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobGFzdExpbmUgPCBlZGl0b3IubGluZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBpbmNvbXBsZXRlIGFuZCB0aGVyZSBhcmUgbW9yZSBsaW5lcywgYWRkIHRoZSBsaW5lIGFuZCBjaGVjayBhZ2FpblxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdExpbmUgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChmcm9tRmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIHNlYXJjaCBmcm9tIHRoZSBmaXJzdCBsaW5lIGFuZCBmYWlsZWQsIHdlIHNlYXJjaCBhZ2FpbiBmcm9tIGN1cnJlbnQgbGluZVxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RMaW5lID0gY3VyTGluZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RMaW5lID0gY3VyTGluZSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tRmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHdlIGhhdmUgc2VhcmNoZWQgYm90aCBmcm9tIGZpcnN0IGxpbmUgYW5kIGZyb20gY3VycmVudCBsaW5lIGFuZCB3ZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2Fubm90IGZpbmQgYW55dGhpbmcsIHdlIHN1Ym1pdCB0aGUgY3VycmVudCBsaW5lLlxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZSA9IHNyY0xpbmVzW2N1ckxpbmVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGN1ckxpbmUgKyAxIDwgZWRpdG9yLmxpbmVDb3VudCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFzcmNMaW5lc1tjdXJMaW5lICsgMV0ucmVwbGFjZSgvXFxzL2csICcnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJMaW5lICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0Q3Vyc29yUG9zaXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IGN1ckxpbmUgKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogY3Vyc29yLmNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IGNvbW1hbmRzLmV4ZWN1dGUoJ2NvbnNvbGU6b3BlbicsIHtcbiAgICAgICAgICAgICAgICBhY3RpdmF0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgaW5zZXJ0TW9kZTogJ3NwbGl0LWJvdHRvbScsXG4gICAgICAgICAgICAgICAgcGF0aFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhd2FpdCBjb21tYW5kcy5leGVjdXRlKCdjb25zb2xlOmluamVjdCcsIHtcbiAgICAgICAgICAgICAgICBhY3RpdmF0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29kZSxcbiAgICAgICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgICAgIG1ldGFkYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG59XG4vKipcbiAqIEFjdGl2YXRlIHRoZSBvdXRwdXQgY29weWluZyBleHRlbnNpb25cbiAqL1xuZnVuY3Rpb24gYWN0aXZhdGVDb3B5T3V0cHV0KGFwcCwgdHJhbnNsYXRvciwgdHJhY2tlcikge1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgLyoqXG4gICAgICogQ29weSB0aGUgY29udGVudHMgb2YgYW4gSFRNTEVsZW1lbnQgdG8gdGhlIHN5c3RlbSBjbGlwYm9hcmRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb3B5RWxlbWVudChlKSB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgaWYgKHNlbCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2F2ZSB0aGUgY3VycmVudCBzZWxlY3Rpb24uXG4gICAgICAgIGNvbnN0IHNhdmVkUmFuZ2VzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsLnJhbmdlQ291bnQ7ICsraSkge1xuICAgICAgICAgICAgc2F2ZWRSYW5nZXNbaV0gPSBzZWwuZ2V0UmFuZ2VBdChpKS5jbG9uZVJhbmdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMoZSk7XG4gICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICAgICAgLy8gUmVzdG9yZSB0aGUgc2F2ZWQgc2VsZWN0aW9uLlxuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIHNhdmVkUmFuZ2VzLmZvckVhY2gociA9PiBzZWwuYWRkUmFuZ2UocikpO1xuICAgIH1cbiAgICBhcHAuY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmNvcHlUb0NsaXBib2FyZCwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0NvcHkgT3V0cHV0IHRvIENsaXBib2FyZCcpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSAoX2EgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb250ZW50LmFjdGl2ZUNlbGw7XG4gICAgICAgICAgICBpZiAoY2VsbCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgb3V0cHV0ID0gY2VsbC5vdXRwdXRBcmVhLm91dHB1dFRyYWNrZXIuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgIGlmIChvdXRwdXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG91dHB1dEFyZWFBcmVhcyA9IG91dHB1dC5ub2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2pwLU91dHB1dEFyZWEtb3V0cHV0Jyk7XG4gICAgICAgICAgICBpZiAob3V0cHV0QXJlYUFyZWFzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhcmVhID0gb3V0cHV0QXJlYUFyZWFzWzBdO1xuICAgICAgICAgICAgICAgIGNvcHlFbGVtZW50KGFyZWEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgYXBwLmNvbnRleHRNZW51LmFkZEl0ZW0oe1xuICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLmNvcHlUb0NsaXBib2FyZCxcbiAgICAgICAgc2VsZWN0b3I6ICcuanAtT3V0cHV0QXJlYS1jaGlsZCcsXG4gICAgICAgIHJhbms6IDBcbiAgICB9KTtcbn1cbi8qKlxuICogQWN0aXZhdGUgdGhlIG5vdGVib29rIGhhbmRsZXIgZXh0ZW5zaW9uLlxuICovXG5mdW5jdGlvbiBhY3RpdmF0ZU5vdGVib29rSGFuZGxlcihhcHAsIGZhY3RvcnksIHRyYW5zbGF0b3IsIHBhbGV0dGUsIGJyb3dzZXJGYWN0b3J5LCBsYXVuY2hlciwgcmVzdG9yZXIsIG1haW5NZW51LCBzZXR0aW5nUmVnaXN0cnksIHNlc3Npb25EaWFsb2dzKSB7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICBjb25zdCBzZXJ2aWNlcyA9IGFwcC5zZXJ2aWNlTWFuYWdlcjtcbiAgICBjb25zdCB7IGNvbW1hbmRzIH0gPSBhcHA7XG4gICAgY29uc3QgdHJhY2tlciA9IG5ldyBOb3RlYm9va1RyYWNrZXIoeyBuYW1lc3BhY2U6ICdub3RlYm9vaycgfSk7XG4gICAgLy8gRmV0Y2ggc2V0dGluZ3MgaWYgcG9zc2libGUuXG4gICAgY29uc3QgZmV0Y2hTZXR0aW5ncyA9IHNldHRpbmdSZWdpc3RyeVxuICAgICAgICA/IHNldHRpbmdSZWdpc3RyeS5sb2FkKHRyYWNrZXJQbHVnaW4uaWQpXG4gICAgICAgIDogUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGBObyBzZXR0aW5nIHJlZ2lzdHJ5IGZvciAke3RyYWNrZXJQbHVnaW4uaWR9YCkpO1xuICAgIGZldGNoU2V0dGluZ3NcbiAgICAgICAgLnRoZW4oc2V0dGluZ3MgPT4ge1xuICAgICAgICB1cGRhdGVDb25maWcoc2V0dGluZ3MpO1xuICAgICAgICBzZXR0aW5ncy5jaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlQ29uZmlnKHNldHRpbmdzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5hdXRvQ2xvc2luZ0JyYWNrZXRzLCB7XG4gICAgICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgY29uc3QgY29kZUNvbmZpZyA9IHNldHRpbmdzLmdldCgnY29kZUNlbGxDb25maWcnKVxuICAgICAgICAgICAgICAgICAgICAuY29tcG9zaXRlO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hcmtkb3duQ29uZmlnID0gc2V0dGluZ3MuZ2V0KCdtYXJrZG93bkNlbGxDb25maWcnKVxuICAgICAgICAgICAgICAgICAgICAuY29tcG9zaXRlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhd0NvbmZpZyA9IHNldHRpbmdzLmdldCgncmF3Q2VsbENvbmZpZycpXG4gICAgICAgICAgICAgICAgICAgIC5jb21wb3NpdGU7XG4gICAgICAgICAgICAgICAgY29uc3QgYW55VG9nZ2xlZCA9IGNvZGVDb25maWcuYXV0b0Nsb3NpbmdCcmFja2V0cyB8fFxuICAgICAgICAgICAgICAgICAgICBtYXJrZG93bkNvbmZpZy5hdXRvQ2xvc2luZ0JyYWNrZXRzIHx8XG4gICAgICAgICAgICAgICAgICAgIHJhd0NvbmZpZy5hdXRvQ2xvc2luZ0JyYWNrZXRzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvZ2dsZWQgPSAhISgoX2EgPSBhcmdzWydmb3JjZSddKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAhYW55VG9nZ2xlZCk7XG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBjb2RlQ29uZmlnLmF1dG9DbG9zaW5nQnJhY2tldHMsXG4gICAgICAgICAgICAgICAgICAgIG1hcmtkb3duQ29uZmlnLmF1dG9DbG9zaW5nQnJhY2tldHMsXG4gICAgICAgICAgICAgICAgICAgIHJhd0NvbmZpZy5hdXRvQ2xvc2luZ0JyYWNrZXRzXG4gICAgICAgICAgICAgICAgXSA9IFt0b2dnbGVkLCB0b2dnbGVkLCB0b2dnbGVkXTtcbiAgICAgICAgICAgICAgICB2b2lkIHNldHRpbmdzLnNldCgnY29kZUNlbGxDb25maWcnLCBjb2RlQ29uZmlnKTtcbiAgICAgICAgICAgICAgICB2b2lkIHNldHRpbmdzLnNldCgnbWFya2Rvd25DZWxsQ29uZmlnJywgbWFya2Rvd25Db25maWcpO1xuICAgICAgICAgICAgICAgIHZvaWQgc2V0dGluZ3Muc2V0KCdyYXdDZWxsQ29uZmlnJywgcmF3Q29uZmlnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0F1dG8gQ2xvc2UgQnJhY2tldHMgZm9yIEFsbCBOb3RlYm9vayBDZWxsIFR5cGVzJyksXG4gICAgICAgICAgICBpc1RvZ2dsZWQ6ICgpID0+IFsnY29kZUNlbGxDb25maWcnLCAnbWFya2Rvd25DZWxsQ29uZmlnJywgJ3Jhd0NlbGxDb25maWcnXS5zb21lKHggPT4gc2V0dGluZ3MuZ2V0KHgpLmNvbXBvc2l0ZS5hdXRvQ2xvc2luZ0JyYWNrZXRzKVxuICAgICAgICB9KTtcbiAgICB9KVxuICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xuICAgICAgICBjb25zb2xlLndhcm4ocmVhc29uLm1lc3NhZ2UpO1xuICAgICAgICB1cGRhdGVUcmFja2VyKHtcbiAgICAgICAgICAgIGVkaXRvckNvbmZpZzogZmFjdG9yeS5lZGl0b3JDb25maWcsXG4gICAgICAgICAgICBub3RlYm9va0NvbmZpZzogZmFjdG9yeS5ub3RlYm9va0NvbmZpZyxcbiAgICAgICAgICAgIGtlcm5lbFNodXRkb3duOiBmYWN0b3J5LnNodXRkb3duT25DbG9zZVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBIYW5kbGUgc3RhdGUgcmVzdG9yYXRpb24uXG4gICAgaWYgKHJlc3RvcmVyKSB7XG4gICAgICAgIHZvaWQgcmVzdG9yZXIucmVzdG9yZSh0cmFja2VyLCB7XG4gICAgICAgICAgICBjb21tYW5kOiAnZG9jbWFuYWdlcjpvcGVuJyxcbiAgICAgICAgICAgIGFyZ3M6IHBhbmVsID0+ICh7IHBhdGg6IHBhbmVsLmNvbnRleHQucGF0aCwgZmFjdG9yeTogRkFDVE9SWSB9KSxcbiAgICAgICAgICAgIG5hbWU6IHBhbmVsID0+IHBhbmVsLmNvbnRleHQucGF0aCxcbiAgICAgICAgICAgIHdoZW46IHNlcnZpY2VzLnJlYWR5XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCByZWdpc3RyeSA9IGFwcC5kb2NSZWdpc3RyeTtcbiAgICBjb25zdCBtb2RlbEZhY3RvcnkgPSBuZXcgTm90ZWJvb2tNb2RlbEZhY3Rvcnkoe1xuICAgICAgICBkaXNhYmxlRG9jdW1lbnRXaWRlVW5kb1JlZG86IGZhY3Rvcnkubm90ZWJvb2tDb25maWcuZGlzYWJsZURvY3VtZW50V2lkZVVuZG9SZWRvXG4gICAgfSk7XG4gICAgcmVnaXN0cnkuYWRkTW9kZWxGYWN0b3J5KG1vZGVsRmFjdG9yeSk7XG4gICAgYWRkQ29tbWFuZHMoYXBwLCB0cmFja2VyLCB0cmFuc2xhdG9yLCBzZXNzaW9uRGlhbG9ncyk7XG4gICAgaWYgKHBhbGV0dGUpIHtcbiAgICAgICAgcG9wdWxhdGVQYWxldHRlKHBhbGV0dGUsIHRyYW5zbGF0b3IpO1xuICAgIH1cbiAgICBsZXQgaWQgPSAwOyAvLyBUaGUgSUQgY291bnRlciBmb3Igbm90ZWJvb2sgcGFuZWxzLlxuICAgIGNvbnN0IGZ0ID0gYXBwLmRvY1JlZ2lzdHJ5LmdldEZpbGVUeXBlKCdub3RlYm9vaycpO1xuICAgIGZhY3Rvcnkud2lkZ2V0Q3JlYXRlZC5jb25uZWN0KChzZW5kZXIsIHdpZGdldCkgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAvLyBJZiB0aGUgbm90ZWJvb2sgcGFuZWwgZG9lcyBub3QgaGF2ZSBhbiBJRCwgYXNzaWduIGl0IG9uZS5cbiAgICAgICAgd2lkZ2V0LmlkID0gd2lkZ2V0LmlkIHx8IGBub3RlYm9vay0keysraWR9YDtcbiAgICAgICAgLy8gU2V0IHVwIHRoZSB0aXRsZSBpY29uXG4gICAgICAgIHdpZGdldC50aXRsZS5pY29uID0gZnQgPT09IG51bGwgfHwgZnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZ0Lmljb247XG4gICAgICAgIHdpZGdldC50aXRsZS5pY29uQ2xhc3MgPSAoX2EgPSBmdCA9PT0gbnVsbCB8fCBmdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZnQuaWNvbkNsYXNzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcbiAgICAgICAgd2lkZ2V0LnRpdGxlLmljb25MYWJlbCA9IChfYiA9IGZ0ID09PSBudWxsIHx8IGZ0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmdC5pY29uTGFiZWwpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6ICcnO1xuICAgICAgICAvLyBOb3RpZnkgdGhlIHdpZGdldCB0cmFja2VyIGlmIHJlc3RvcmUgZGF0YSBuZWVkcyB0byB1cGRhdGUuXG4gICAgICAgIHdpZGdldC5jb250ZXh0LnBhdGhDaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgdm9pZCB0cmFja2VyLnNhdmUod2lkZ2V0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEFkZCB0aGUgbm90ZWJvb2sgcGFuZWwgdG8gdGhlIHRyYWNrZXIuXG4gICAgICAgIHZvaWQgdHJhY2tlci5hZGQod2lkZ2V0KTtcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHNldHRpbmdzIG9mIHRoZSBjdXJyZW50IHRyYWNrZXIuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlVHJhY2tlcihvcHRpb25zKSB7XG4gICAgICAgIHRyYWNrZXIuZm9yRWFjaCh3aWRnZXQgPT4ge1xuICAgICAgICAgICAgd2lkZ2V0LnNldENvbmZpZyhvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgc2V0dGluZyB2YWx1ZXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlQ29uZmlnKHNldHRpbmdzKSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIFN0YXRpY05vdGVib29rLmRlZmF1bHRFZGl0b3JDb25maWcuY29kZSksIHNldHRpbmdzLmdldCgnY29kZUNlbGxDb25maWcnKS5jb21wb3NpdGUpO1xuICAgICAgICBjb25zdCBtYXJrZG93biA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgU3RhdGljTm90ZWJvb2suZGVmYXVsdEVkaXRvckNvbmZpZy5tYXJrZG93biksIHNldHRpbmdzLmdldCgnbWFya2Rvd25DZWxsQ29uZmlnJykuY29tcG9zaXRlKTtcbiAgICAgICAgY29uc3QgcmF3ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBTdGF0aWNOb3RlYm9vay5kZWZhdWx0RWRpdG9yQ29uZmlnLnJhdyksIHNldHRpbmdzLmdldCgncmF3Q2VsbENvbmZpZycpLmNvbXBvc2l0ZSk7XG4gICAgICAgIGZhY3RvcnkuZWRpdG9yQ29uZmlnID0geyBjb2RlLCBtYXJrZG93biwgcmF3IH07XG4gICAgICAgIGZhY3Rvcnkubm90ZWJvb2tDb25maWcgPSB7XG4gICAgICAgICAgICBzY3JvbGxQYXN0RW5kOiBzZXR0aW5ncy5nZXQoJ3Njcm9sbFBhc3RFbmQnKS5jb21wb3NpdGUsXG4gICAgICAgICAgICBkZWZhdWx0Q2VsbDogc2V0dGluZ3MuZ2V0KCdkZWZhdWx0Q2VsbCcpLmNvbXBvc2l0ZSxcbiAgICAgICAgICAgIHJlY29yZFRpbWluZzogc2V0dGluZ3MuZ2V0KCdyZWNvcmRUaW1pbmcnKS5jb21wb3NpdGUsXG4gICAgICAgICAgICBudW1iZXJDZWxsc1RvUmVuZGVyRGlyZWN0bHk6IHNldHRpbmdzLmdldCgnbnVtYmVyQ2VsbHNUb1JlbmRlckRpcmVjdGx5JylcbiAgICAgICAgICAgICAgICAuY29tcG9zaXRlLFxuICAgICAgICAgICAgcmVtYWluaW5nVGltZUJlZm9yZVJlc2NoZWR1bGluZzogc2V0dGluZ3MuZ2V0KCdyZW1haW5pbmdUaW1lQmVmb3JlUmVzY2hlZHVsaW5nJykuY29tcG9zaXRlLFxuICAgICAgICAgICAgcmVuZGVyQ2VsbE9uSWRsZTogc2V0dGluZ3MuZ2V0KCdyZW5kZXJDZWxsT25JZGxlJykuY29tcG9zaXRlLFxuICAgICAgICAgICAgb2JzZXJ2ZWRUb3BNYXJnaW46IHNldHRpbmdzLmdldCgnb2JzZXJ2ZWRUb3BNYXJnaW4nKS5jb21wb3NpdGUsXG4gICAgICAgICAgICBvYnNlcnZlZEJvdHRvbU1hcmdpbjogc2V0dGluZ3MuZ2V0KCdvYnNlcnZlZEJvdHRvbU1hcmdpbicpXG4gICAgICAgICAgICAgICAgLmNvbXBvc2l0ZSxcbiAgICAgICAgICAgIG1heE51bWJlck91dHB1dHM6IHNldHRpbmdzLmdldCgnbWF4TnVtYmVyT3V0cHV0cycpLmNvbXBvc2l0ZSxcbiAgICAgICAgICAgIHNob3dFZGl0b3JGb3JSZWFkT25seU1hcmtkb3duOiBzZXR0aW5ncy5nZXQoJ3Nob3dFZGl0b3JGb3JSZWFkT25seU1hcmtkb3duJykuY29tcG9zaXRlLFxuICAgICAgICAgICAgZGlzYWJsZURvY3VtZW50V2lkZVVuZG9SZWRvOiBzZXR0aW5ncy5nZXQoJ2V4cGVyaW1lbnRhbERpc2FibGVEb2N1bWVudFdpZGVVbmRvUmVkbycpLmNvbXBvc2l0ZSxcbiAgICAgICAgICAgIHJlbmRlcmluZ0xheW91dDogc2V0dGluZ3MuZ2V0KCdyZW5kZXJpbmdMYXlvdXQnKS5jb21wb3NpdGUsXG4gICAgICAgICAgICBzaWRlQnlTaWRlTGVmdE1hcmdpbk92ZXJyaWRlOiBzZXR0aW5ncy5nZXQoJ3NpZGVCeVNpZGVMZWZ0TWFyZ2luT3ZlcnJpZGUnKVxuICAgICAgICAgICAgICAgIC5jb21wb3NpdGUsXG4gICAgICAgICAgICBzaWRlQnlTaWRlUmlnaHRNYXJnaW5PdmVycmlkZTogc2V0dGluZ3MuZ2V0KCdzaWRlQnlTaWRlUmlnaHRNYXJnaW5PdmVycmlkZScpLmNvbXBvc2l0ZVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzaWRlQnlTaWRlTWFyZ2luU3R5bGUgPSBgLmpwLW1vZC1zaWRlQnlTaWRlLmpwLU5vdGVib29rIC5qcC1Ob3RlYm9vay1jZWxsIHsgXG4gICAgICBtYXJnaW4tbGVmdDogJHtmYWN0b3J5Lm5vdGVib29rQ29uZmlnLnNpZGVCeVNpZGVMZWZ0TWFyZ2luT3ZlcnJpZGV9ICFpbXBvcnRhbnQ7XG4gICAgICBtYXJnaW4tcmlnaHQ6ICR7ZmFjdG9yeS5ub3RlYm9va0NvbmZpZy5zaWRlQnlTaWRlUmlnaHRNYXJnaW5PdmVycmlkZX0gIWltcG9ydGFudDtgO1xuICAgICAgICBjb25zdCBzaWRlQnlTaWRlTWFyZ2luVGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoU0lERV9CWV9TSURFX1NUWUxFX0lEKTtcbiAgICAgICAgaWYgKHNpZGVCeVNpZGVNYXJnaW5UYWcpIHtcbiAgICAgICAgICAgIHNpZGVCeVNpZGVNYXJnaW5UYWcuaW5uZXJUZXh0ID0gc2lkZUJ5U2lkZU1hcmdpblN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGA8c3R5bGUgaWQ9XCIke1NJREVfQllfU0lERV9TVFlMRV9JRH1cIj4ke3NpZGVCeVNpZGVNYXJnaW5TdHlsZX19PC9zdHlsZT5gKTtcbiAgICAgICAgfVxuICAgICAgICBmYWN0b3J5LnNodXRkb3duT25DbG9zZSA9IHNldHRpbmdzLmdldCgna2VybmVsU2h1dGRvd24nKVxuICAgICAgICAgICAgLmNvbXBvc2l0ZTtcbiAgICAgICAgbW9kZWxGYWN0b3J5LmRpc2FibGVEb2N1bWVudFdpZGVVbmRvUmVkbyA9IHNldHRpbmdzLmdldCgnZXhwZXJpbWVudGFsRGlzYWJsZURvY3VtZW50V2lkZVVuZG9SZWRvJykuY29tcG9zaXRlO1xuICAgICAgICB1cGRhdGVUcmFja2VyKHtcbiAgICAgICAgICAgIGVkaXRvckNvbmZpZzogZmFjdG9yeS5lZGl0b3JDb25maWcsXG4gICAgICAgICAgICBub3RlYm9va0NvbmZpZzogZmFjdG9yeS5ub3RlYm9va0NvbmZpZyxcbiAgICAgICAgICAgIGtlcm5lbFNodXRkb3duOiBmYWN0b3J5LnNodXRkb3duT25DbG9zZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gQWRkIG1haW4gbWVudSBub3RlYm9vayBtZW51LlxuICAgIGlmIChtYWluTWVudSkge1xuICAgICAgICBwb3B1bGF0ZU1lbnVzKGFwcCwgbWFpbk1lbnUsIHRyYWNrZXIsIHRyYW5zbGF0b3IsIHNlc3Npb25EaWFsb2dzKTtcbiAgICB9XG4gICAgLy8gVXRpbGl0eSBmdW5jdGlvbiB0byBjcmVhdGUgYSBuZXcgbm90ZWJvb2suXG4gICAgY29uc3QgY3JlYXRlTmV3ID0gKGN3ZCwga2VybmVsTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gY29tbWFuZHNcbiAgICAgICAgICAgIC5leGVjdXRlKCdkb2NtYW5hZ2VyOm5ldy11bnRpdGxlZCcsIHsgcGF0aDogY3dkLCB0eXBlOiAnbm90ZWJvb2snIH0pXG4gICAgICAgICAgICAudGhlbihtb2RlbCA9PiB7XG4gICAgICAgICAgICBpZiAobW9kZWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmRzLmV4ZWN1dGUoJ2RvY21hbmFnZXI6b3BlbicsIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogbW9kZWwucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgZmFjdG9yeTogRkFDVE9SWSxcbiAgICAgICAgICAgICAgICAgICAga2VybmVsOiB7IG5hbWU6IGtlcm5lbE5hbWUgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vIEFkZCBhIGNvbW1hbmQgZm9yIGNyZWF0aW5nIGEgbmV3IG5vdGVib29rLlxuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jcmVhdGVOZXcsIHtcbiAgICAgICAgbGFiZWw6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgICAgICBjb25zdCBrZXJuZWxOYW1lID0gYXJnc1sna2VybmVsTmFtZSddIHx8ICcnO1xuICAgICAgICAgICAgaWYgKGFyZ3NbJ2lzTGF1bmNoZXInXSAmJiBhcmdzWydrZXJuZWxOYW1lJ10gJiYgc2VydmljZXMua2VybmVsc3BlY3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKChfYyA9IChfYiA9IChfYSA9IHNlcnZpY2VzLmtlcm5lbHNwZWNzLnNwZWNzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eua2VybmVsc3BlY3Nba2VybmVsTmFtZV0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5kaXNwbGF5X25hbWUpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhcmdzWydpc1BhbGV0dGUnXSB8fCBhcmdzWydpc0NvbnRleHRNZW51J10pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnMuX18oJ05ldyBOb3RlYm9vaycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRyYW5zLl9fKCdOb3RlYm9vaycpO1xuICAgICAgICB9LFxuICAgICAgICBjYXB0aW9uOiB0cmFucy5fXygnQ3JlYXRlIGEgbmV3IG5vdGVib29rJyksXG4gICAgICAgIGljb246IGFyZ3MgPT4gKGFyZ3NbJ2lzUGFsZXR0ZSddID8gdW5kZWZpbmVkIDogbm90ZWJvb2tJY29uKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjd2QgPSBhcmdzWydjd2QnXSB8fFxuICAgICAgICAgICAgICAgIChicm93c2VyRmFjdG9yeSA/IGJyb3dzZXJGYWN0b3J5LmRlZmF1bHRCcm93c2VyLm1vZGVsLnBhdGggOiAnJyk7XG4gICAgICAgICAgICBjb25zdCBrZXJuZWxOYW1lID0gYXJnc1sna2VybmVsTmFtZSddIHx8ICcnO1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZU5ldyhjd2QsIGtlcm5lbE5hbWUpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gQWRkIGEgbGF1bmNoZXIgaXRlbSBpZiB0aGUgbGF1bmNoZXIgaXMgYXZhaWxhYmxlLlxuICAgIGlmIChsYXVuY2hlcikge1xuICAgICAgICB2b2lkIHNlcnZpY2VzLnJlYWR5LnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRpc3Bvc2FibGVzID0gbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IG9uU3BlY3NDaGFuZ2VkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkaXNwb3NhYmxlcykge1xuICAgICAgICAgICAgICAgICAgICBkaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIGRpc3Bvc2FibGVzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BlY3MgPSBzZXJ2aWNlcy5rZXJuZWxzcGVjcy5zcGVjcztcbiAgICAgICAgICAgICAgICBpZiAoIXNwZWNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGlzcG9zYWJsZXMgPSBuZXcgRGlzcG9zYWJsZVNldCgpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmFtZSBpbiBzcGVjcy5rZXJuZWxzcGVjcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5rID0gbmFtZSA9PT0gc3BlY3MuZGVmYXVsdCA/IDAgOiBJbmZpbml0eTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BlYyA9IHNwZWNzLmtlcm5lbHNwZWNzW25hbWVdO1xuICAgICAgICAgICAgICAgICAgICBsZXQga2VybmVsSWNvblVybCA9IHNwZWMucmVzb3VyY2VzWydsb2dvLTY0eDY0J107XG4gICAgICAgICAgICAgICAgICAgIGRpc3Bvc2FibGVzLmFkZChsYXVuY2hlci5hZGQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy5jcmVhdGVOZXcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzOiB7IGlzTGF1bmNoZXI6IHRydWUsIGtlcm5lbE5hbWU6IG5hbWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiB0cmFucy5fXygnTm90ZWJvb2snKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmssXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXJuZWxJY29uVXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXJuZWw6IEpTT05FeHQuZGVlcENvcHkoc3BlYy5tZXRhZGF0YSB8fCB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvblNwZWNzQ2hhbmdlZCgpO1xuICAgICAgICAgICAgc2VydmljZXMua2VybmVsc3BlY3Muc3BlY3NDaGFuZ2VkLmNvbm5lY3Qob25TcGVjc0NoYW5nZWQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRyYWNrZXI7XG59XG4vLyBHZXQgdGhlIGN1cnJlbnQgd2lkZ2V0IGFuZCBhY3RpdmF0ZSB1bmxlc3MgdGhlIGFyZ3Mgc3BlY2lmeSBvdGhlcndpc2UuXG5mdW5jdGlvbiBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKSB7XG4gICAgY29uc3Qgd2lkZ2V0ID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0O1xuICAgIGNvbnN0IGFjdGl2YXRlID0gYXJnc1snYWN0aXZhdGUnXSAhPT0gZmFsc2U7XG4gICAgaWYgKGFjdGl2YXRlICYmIHdpZGdldCkge1xuICAgICAgICBzaGVsbC5hY3RpdmF0ZUJ5SWQod2lkZ2V0LmlkKTtcbiAgICB9XG4gICAgcmV0dXJuIHdpZGdldDtcbn1cbi8qKlxuICogQWRkIHRoZSBub3RlYm9vayBjb21tYW5kcyB0byB0aGUgYXBwbGljYXRpb24ncyBjb21tYW5kIHJlZ2lzdHJ5LlxuICovXG5mdW5jdGlvbiBhZGRDb21tYW5kcyhhcHAsIHRyYWNrZXIsIHRyYW5zbGF0b3IsIHNlc3Npb25EaWFsb2dzKSB7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICBjb25zdCB7IGNvbW1hbmRzLCBzaGVsbCB9ID0gYXBwO1xuICAgIHNlc3Npb25EaWFsb2dzID0gc2Vzc2lvbkRpYWxvZ3MgIT09IG51bGwgJiYgc2Vzc2lvbkRpYWxvZ3MgIT09IHZvaWQgMCA/IHNlc3Npb25EaWFsb2dzIDogc2Vzc2lvbkNvbnRleHREaWFsb2dzO1xuICAgIGNvbnN0IGlzRW5hYmxlZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIFByaXZhdGUuaXNFbmFibGVkKHNoZWxsLCB0cmFja2VyKTtcbiAgICB9O1xuICAgIGNvbnN0IGlzRW5hYmxlZEFuZFNpbmdsZVNlbGVjdGVkID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gUHJpdmF0ZS5pc0VuYWJsZWRBbmRTaW5nbGVTZWxlY3RlZChzaGVsbCwgdHJhY2tlcik7XG4gICAgfTtcbiAgICBjb25zdCByZWZyZXNoQ2VsbENvbGxhcHNlZCA9IChub3RlYm9vaykgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBmb3IgKGNvbnN0IGNlbGwgb2Ygbm90ZWJvb2sud2lkZ2V0cykge1xuICAgICAgICAgICAgaWYgKGNlbGwgaW5zdGFuY2VvZiBNYXJrZG93bkNlbGwgJiYgY2VsbC5oZWFkaW5nQ29sbGFwc2VkKSB7XG4gICAgICAgICAgICAgICAgTm90ZWJvb2tBY3Rpb25zLnNldEhlYWRpbmdDb2xsYXBzZShjZWxsLCB0cnVlLCBub3RlYm9vayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2VsbC5tb2RlbC5pZCA9PT0gKChfYiA9IChfYSA9IG5vdGVib29rLmFjdGl2ZUNlbGwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tb2RlbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmlkKSkge1xuICAgICAgICAgICAgICAgIE5vdGVib29rQWN0aW9ucy5leHBhbmRQYXJlbnQoY2VsbCwgbm90ZWJvb2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBpc0VuYWJsZWRBbmRIZWFkaW5nU2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBQcml2YXRlLmlzRW5hYmxlZEFuZEhlYWRpbmdTZWxlY3RlZChzaGVsbCwgdHJhY2tlcik7XG4gICAgfTtcbiAgICAvLyBTZXQgdXAgc2lnbmFsIGhhbmRsZXIgdG8ga2VlcCB0aGUgY29sbGFwc2Ugc3RhdGUgY29uc2lzdGVudFxuICAgIHRyYWNrZXIuY3VycmVudENoYW5nZWQuY29ubmVjdCgoc2VuZGVyLCBwYW5lbCkgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBpZiAoISgoX2IgPSAoX2EgPSBwYW5lbCA9PT0gbnVsbCB8fCBwYW5lbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFuZWwuY29udGVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1vZGVsKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2VsbHMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcGFuZWwuY29udGVudC5tb2RlbC5jZWxscy5jaGFuZ2VkLmNvbm5lY3QoKGxpc3QsIGFyZ3MpID0+IHtcbiAgICAgICAgICAgIC8vIE1pZ2h0IGJlIG92ZXJraWxsIHRvIHJlZnJlc2ggdGhpcyBldmVyeSB0aW1lLCBidXRcbiAgICAgICAgICAgIC8vIGl0IGhlbHBzIHRvIGtlZXAgdGhlIGNvbGxhcHNlIHN0YXRlIGNvbnNpc3RlbnQuXG4gICAgICAgICAgICByZWZyZXNoQ2VsbENvbGxhcHNlZChwYW5lbC5jb250ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBhbmVsLmNvbnRlbnQuYWN0aXZlQ2VsbENoYW5nZWQuY29ubmVjdCgobm90ZWJvb2ssIGNlbGwpID0+IHtcbiAgICAgICAgICAgIE5vdGVib29rQWN0aW9ucy5leHBhbmRQYXJlbnQoY2VsbCwgbm90ZWJvb2spO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMucnVuQW5kQWR2YW5jZSwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1J1biBTZWxlY3RlZCBDZWxscycpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjb250ZXh0LCBjb250ZW50IH0gPSBjdXJyZW50O1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMucnVuQW5kQWR2YW5jZShjb250ZW50LCBjb250ZXh0LnNlc3Npb25Db250ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnJ1biwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oXCJSdW4gU2VsZWN0ZWQgQ2VsbHMgYW5kIERvbid0IEFkdmFuY2VcIiksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGNvbnRleHQsIGNvbnRlbnQgfSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5vdGVib29rQWN0aW9ucy5ydW4oY29udGVudCwgY29udGV4dC5zZXNzaW9uQ29udGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5ydW5BbmRJbnNlcnQsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdSdW4gU2VsZWN0ZWQgQ2VsbHMgYW5kIEluc2VydCBCZWxvdycpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjb250ZXh0LCBjb250ZW50IH0gPSBjdXJyZW50O1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMucnVuQW5kSW5zZXJ0KGNvbnRlbnQsIGNvbnRleHQuc2Vzc2lvbkNvbnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMucnVuQWxsLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnUnVuIEFsbCBDZWxscycpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjb250ZXh0LCBjb250ZW50IH0gPSBjdXJyZW50O1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMucnVuQWxsKGNvbnRlbnQsIGNvbnRleHQuc2Vzc2lvbkNvbnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMucnVuQWxsQWJvdmUsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdSdW4gQWxsIEFib3ZlIFNlbGVjdGVkIENlbGwnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgY29udGV4dCwgY29udGVudCB9ID0gY3VycmVudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLnJ1bkFsbEFib3ZlKGNvbnRlbnQsIGNvbnRleHQuc2Vzc2lvbkNvbnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIC8vIENhbid0IHJ1biBhYm92ZSBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgY2VsbHMgc2VsZWN0ZWQsXG4gICAgICAgICAgICAvLyBvciBpZiB3ZSBhcmUgYXQgdGhlIHRvcCBvZiB0aGUgbm90ZWJvb2suXG4gICAgICAgICAgICByZXR1cm4gKGlzRW5hYmxlZEFuZFNpbmdsZVNlbGVjdGVkKCkgJiZcbiAgICAgICAgICAgICAgICB0cmFja2VyLmN1cnJlbnRXaWRnZXQuY29udGVudC5hY3RpdmVDZWxsSW5kZXggIT09IDApO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnJ1bkFsbEJlbG93LCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnUnVuIFNlbGVjdGVkIENlbGwgYW5kIEFsbCBCZWxvdycpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjb250ZXh0LCBjb250ZW50IH0gPSBjdXJyZW50O1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMucnVuQWxsQmVsb3coY29udGVudCwgY29udGV4dC5zZXNzaW9uQ29udGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZDogKCkgPT4ge1xuICAgICAgICAgICAgLy8gQ2FuJ3QgcnVuIGJlbG93IGlmIHRoZXJlIGFyZSBtdWx0aXBsZSBjZWxscyBzZWxlY3RlZCxcbiAgICAgICAgICAgIC8vIG9yIGlmIHdlIGFyZSBhdCB0aGUgYm90dG9tIG9mIHRoZSBub3RlYm9vay5cbiAgICAgICAgICAgIHJldHVybiAoaXNFbmFibGVkQW5kU2luZ2xlU2VsZWN0ZWQoKSAmJlxuICAgICAgICAgICAgICAgIHRyYWNrZXIuY3VycmVudFdpZGdldC5jb250ZW50LmFjdGl2ZUNlbGxJbmRleCAhPT1cbiAgICAgICAgICAgICAgICAgICAgdHJhY2tlci5jdXJyZW50V2lkZ2V0LmNvbnRlbnQud2lkZ2V0cy5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5yZW5kZXJBbGxNYXJrZG93biwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1JlbmRlciBBbGwgTWFya2Rvd24gQ2VsbHMnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgY29udGV4dCwgY29udGVudCB9ID0gY3VycmVudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLnJlbmRlckFsbE1hcmtkb3duKGNvbnRlbnQsIGNvbnRleHQuc2Vzc2lvbkNvbnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMucmVzdGFydCwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1Jlc3RhcnQgS2VybmVs4oCmJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2Vzc2lvbkRpYWxvZ3MucmVzdGFydChjdXJyZW50LnNlc3Npb25Db250ZXh0LCB0cmFuc2xhdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmNsb3NlQW5kU2h1dGRvd24sIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdDbG9zZSBhbmQgU2h1dCBEb3duJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBjdXJyZW50LnRpdGxlLmxhYmVsO1xuICAgICAgICAgICAgcmV0dXJuIHNob3dEaWFsb2coe1xuICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFucy5fXygnU2h1dCBkb3duIHRoZSBub3RlYm9vaz8nKSxcbiAgICAgICAgICAgICAgICBib2R5OiB0cmFucy5fXygnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNsb3NlIFwiJTFcIj8nLCBmaWxlTmFtZSksXG4gICAgICAgICAgICAgICAgYnV0dG9uczogW0RpYWxvZy5jYW5jZWxCdXR0b24oKSwgRGlhbG9nLndhcm5CdXR0b24oKV1cbiAgICAgICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmJ1dHRvbi5hY2NlcHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQuY29udGV4dC5zZXNzaW9uQ29udGV4dC5zaHV0ZG93bigpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudC5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMudHJ1c3QsIHtcbiAgICAgICAgbGFiZWw6ICgpID0+IHRyYW5zLl9fKCdUcnVzdCBOb3RlYm9vaycpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjb250ZXh0LCBjb250ZW50IH0gPSBjdXJyZW50O1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMudHJ1c3QoY29udGVudCkudGhlbigoKSA9PiBjb250ZXh0LnNhdmUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5yZXN0YXJ0Q2xlYXIsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdSZXN0YXJ0IEtlcm5lbCBhbmQgQ2xlYXIgQWxsIE91dHB1dHPigKYnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgY29udGVudCwgc2Vzc2lvbkNvbnRleHQgfSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlc3Npb25EaWFsb2dzLnJlc3RhcnQoc2Vzc2lvbkNvbnRleHQsIHRyYW5zbGF0b3IpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBOb3RlYm9va0FjdGlvbnMuY2xlYXJBbGxPdXRwdXRzKGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMucmVzdGFydEFuZFJ1blRvU2VsZWN0ZWQsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdSZXN0YXJ0IEtlcm5lbCBhbmQgUnVuIHVwIHRvIFNlbGVjdGVkIENlbGzigKYnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgY29udGV4dCwgY29udGVudCB9ID0gY3VycmVudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2Vzc2lvbkRpYWxvZ3NcbiAgICAgICAgICAgICAgICAgICAgLnJlc3RhcnQoY3VycmVudC5zZXNzaW9uQ29udGV4dCwgdHJhbnNsYXRvcilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzdGFydGVkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCBOb3RlYm9va0FjdGlvbnMucnVuQWxsQWJvdmUoY29udGVudCwgY29udGV4dC5zZXNzaW9uQ29udGV4dCkudGhlbihleGVjdXRlZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4ZWN1dGVkIHx8IGNvbnRlbnQuYWN0aXZlQ2VsbEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgTm90ZWJvb2tBY3Rpb25zLnJ1bihjb250ZW50LCBjb250ZXh0LnNlc3Npb25Db250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWQ6IGlzRW5hYmxlZEFuZFNpbmdsZVNlbGVjdGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnJlc3RhcnRSdW5BbGwsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdSZXN0YXJ0IEtlcm5lbCBhbmQgUnVuIEFsbCBDZWxsc+KApicpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjb250ZXh0LCBjb250ZW50LCBzZXNzaW9uQ29udGV4dCB9ID0gY3VycmVudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2Vzc2lvbkRpYWxvZ3NcbiAgICAgICAgICAgICAgICAgICAgLnJlc3RhcnQoc2Vzc2lvbkNvbnRleHQsIHRyYW5zbGF0b3IpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3RhcnRlZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgTm90ZWJvb2tBY3Rpb25zLnJ1bkFsbChjb250ZW50LCBjb250ZXh0LnNlc3Npb25Db250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdGFydGVkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuY2xlYXJBbGxPdXRwdXRzLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnQ2xlYXIgQWxsIE91dHB1dHMnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuY2xlYXJBbGxPdXRwdXRzKGN1cnJlbnQuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jbGVhck91dHB1dHMsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdDbGVhciBPdXRwdXRzJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLmNsZWFyT3V0cHV0cyhjdXJyZW50LmNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuaW50ZXJydXB0LCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnSW50ZXJydXB0IEtlcm5lbCcpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmICghY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGtlcm5lbCA9IChfYSA9IGN1cnJlbnQuY29udGV4dC5zZXNzaW9uQ29udGV4dC5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eua2VybmVsO1xuICAgICAgICAgICAgaWYgKGtlcm5lbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXJuZWwuaW50ZXJydXB0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy50b0NvZGUsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdDaGFuZ2UgdG8gQ29kZSBDZWxsIFR5cGUnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuY2hhbmdlQ2VsbFR5cGUoY3VycmVudC5jb250ZW50LCAnY29kZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMudG9NYXJrZG93biwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0NoYW5nZSB0byBNYXJrZG93biBDZWxsIFR5cGUnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuY2hhbmdlQ2VsbFR5cGUoY3VycmVudC5jb250ZW50LCAnbWFya2Rvd24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnRvUmF3LCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnQ2hhbmdlIHRvIFJhdyBDZWxsIFR5cGUnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuY2hhbmdlQ2VsbFR5cGUoY3VycmVudC5jb250ZW50LCAncmF3Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jdXQsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdDdXQgQ2VsbHMnKSxcbiAgICAgICAgY2FwdGlvbjogdHJhbnMuX18oJ0N1dCB0aGUgc2VsZWN0ZWQgY2VsbHMnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuY3V0KGN1cnJlbnQuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGljb246IGFyZ3MgPT4gKGFyZ3MudG9vbGJhciA/IGN1dEljb24gOiB1bmRlZmluZWQpLFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuY29weSwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0NvcHkgQ2VsbHMnKSxcbiAgICAgICAgY2FwdGlvbjogdHJhbnMuX18oJ0NvcHkgdGhlIHNlbGVjdGVkIGNlbGxzJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLmNvcHkoY3VycmVudC5jb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaWNvbjogYXJncyA9PiAoYXJncy50b29sYmFyID8gY29weUljb24gOiAnJyksXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5wYXN0ZUJlbG93LCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnUGFzdGUgQ2VsbHMgQmVsb3cnKSxcbiAgICAgICAgY2FwdGlvbjogdHJhbnMuX18oJ1Bhc3RlIGNlbGxzIGZyb20gdGhlIGNsaXBib2FyZCcpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5vdGVib29rQWN0aW9ucy5wYXN0ZShjdXJyZW50LmNvbnRlbnQsICdiZWxvdycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpY29uOiBhcmdzID0+IChhcmdzLnRvb2xiYXIgPyBwYXN0ZUljb24gOiB1bmRlZmluZWQpLFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMucGFzdGVBYm92ZSwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1Bhc3RlIENlbGxzIEFib3ZlJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLnBhc3RlKGN1cnJlbnQuY29udGVudCwgJ2Fib3ZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5kdXBsaWNhdGVCZWxvdywge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0R1cGxpY2F0ZSBDZWxscyBCZWxvdycpLFxuICAgICAgICBjYXB0aW9uOiB0cmFucy5fXygnQ29weSB0aGUgc2VsZWN0ZWQgY2VsbHMgYW5kIHBhc3RlIHRoZW0gYmVsb3cgdGhlIHNlbGVjdGlvbicpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgTm90ZWJvb2tBY3Rpb25zLmR1cGxpY2F0ZShjdXJyZW50LmNvbnRlbnQsICdiZWxvd1NlbGVjdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGljb246IGFyZ3MgPT4gKGFyZ3MudG9vbGJhciA/IGR1cGxpY2F0ZUljb24gOiAnJyksXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5wYXN0ZUFuZFJlcGxhY2UsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdQYXN0ZSBDZWxscyBhbmQgUmVwbGFjZScpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5vdGVib29rQWN0aW9ucy5wYXN0ZShjdXJyZW50LmNvbnRlbnQsICdyZXBsYWNlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5kZWxldGVDZWxsLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnRGVsZXRlIENlbGxzJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLmRlbGV0ZUNlbGxzKGN1cnJlbnQuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5zcGxpdCwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1NwbGl0IENlbGwnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuc3BsaXRDZWxsKGN1cnJlbnQuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5tZXJnZSwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ01lcmdlIFNlbGVjdGVkIENlbGxzJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLm1lcmdlQ2VsbHMoY3VycmVudC5jb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm1lcmdlQWJvdmUsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdNZXJnZSBDZWxsIEFib3ZlJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLm1lcmdlQ2VsbHMoY3VycmVudC5jb250ZW50LCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm1lcmdlQmVsb3csIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdNZXJnZSBDZWxsIEJlbG93JyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLm1lcmdlQ2VsbHMoY3VycmVudC5jb250ZW50LCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5pbnNlcnRBYm92ZSwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0luc2VydCBDZWxsIEFib3ZlJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLmluc2VydEFib3ZlKGN1cnJlbnQuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGljb246IGFyZ3MgPT4gKGFyZ3MudG9vbGJhciA/IGFkZEFib3ZlSWNvbiA6IHVuZGVmaW5lZCksXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5pbnNlcnRCZWxvdywge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0luc2VydCBDZWxsIEJlbG93JyksXG4gICAgICAgIGNhcHRpb246IHRyYW5zLl9fKCdJbnNlcnQgYSBjZWxsIGJlbG93JyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLmluc2VydEJlbG93KGN1cnJlbnQuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGljb246IGFyZ3MgPT4gKGFyZ3MudG9vbGJhciA/IGFkZEJlbG93SWNvbiA6IHVuZGVmaW5lZCksXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5zZWxlY3RBYm92ZSwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1NlbGVjdCBDZWxsIEFib3ZlJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLnNlbGVjdEFib3ZlKGN1cnJlbnQuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5zZWxlY3RCZWxvdywge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1NlbGVjdCBDZWxsIEJlbG93JyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLnNlbGVjdEJlbG93KGN1cnJlbnQuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5leHRlbmRBYm92ZSwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0V4dGVuZCBTZWxlY3Rpb24gQWJvdmUnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuZXh0ZW5kU2VsZWN0aW9uQWJvdmUoY3VycmVudC5jb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmV4dGVuZFRvcCwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0V4dGVuZCBTZWxlY3Rpb24gdG8gVG9wJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLmV4dGVuZFNlbGVjdGlvbkFib3ZlKGN1cnJlbnQuY29udGVudCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5leHRlbmRCZWxvdywge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0V4dGVuZCBTZWxlY3Rpb24gQmVsb3cnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuZXh0ZW5kU2VsZWN0aW9uQmVsb3coY3VycmVudC5jb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmV4dGVuZEJvdHRvbSwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0V4dGVuZCBTZWxlY3Rpb24gdG8gQm90dG9tJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLmV4dGVuZFNlbGVjdGlvbkJlbG93KGN1cnJlbnQuY29udGVudCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5zZWxlY3RBbGwsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdTZWxlY3QgQWxsIENlbGxzJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLnNlbGVjdEFsbChjdXJyZW50LmNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuZGVzZWxlY3RBbGwsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdEZXNlbGVjdCBBbGwgQ2VsbHMnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuZGVzZWxlY3RBbGwoY3VycmVudC5jb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm1vdmVVcCwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ01vdmUgQ2VsbHMgVXAnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMubW92ZVVwKGN1cnJlbnQuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZCxcbiAgICAgICAgaWNvbjogYXJncyA9PiAoYXJncy50b29sYmFyID8gbW92ZVVwSWNvbiA6IHVuZGVmaW5lZClcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMubW92ZURvd24sIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdNb3ZlIENlbGxzIERvd24nKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMubW92ZURvd24oY3VycmVudC5jb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkLFxuICAgICAgICBpY29uOiBhcmdzID0+IChhcmdzLnRvb2xiYXIgPyBtb3ZlRG93bkljb24gOiB1bmRlZmluZWQpXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnRvZ2dsZUFsbExpbmVzLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnVG9nZ2xlIEFsbCBMaW5lIE51bWJlcnMnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMudG9nZ2xlQWxsTGluZU51bWJlcnMoY3VycmVudC5jb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmNvbW1hbmRNb2RlLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnRW50ZXIgQ29tbWFuZCBNb2RlJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50LmNvbnRlbnQubW9kZSA9ICdjb21tYW5kJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmVkaXRNb2RlLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnRW50ZXIgRWRpdCBNb2RlJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50LmNvbnRlbnQubW9kZSA9ICdlZGl0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnVuZG9DZWxsQWN0aW9uLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnVW5kbyBDZWxsIE9wZXJhdGlvbicpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5vdGVib29rQWN0aW9ucy51bmRvKGN1cnJlbnQuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5yZWRvQ2VsbEFjdGlvbiwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1JlZG8gQ2VsbCBPcGVyYXRpb24nKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMucmVkbyhjdXJyZW50LmNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuY2hhbmdlS2VybmVsLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnQ2hhbmdlIEtlcm5lbOKApicpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlc3Npb25EaWFsb2dzLnNlbGVjdEtlcm5lbChjdXJyZW50LmNvbnRleHQuc2Vzc2lvbkNvbnRleHQsIHRyYW5zbGF0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMucmVjb25uZWN0VG9LZXJuZWwsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdSZWNvbm5lY3QgVG8gS2VybmVsJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qga2VybmVsID0gKF9hID0gY3VycmVudC5jb250ZXh0LnNlc3Npb25Db250ZXh0LnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5rZXJuZWw7XG4gICAgICAgICAgICBpZiAoa2VybmVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtlcm5lbC5yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm1hcmtkb3duMSwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0NoYW5nZSB0byBIZWFkaW5nIDEnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuc2V0TWFya2Rvd25IZWFkZXIoY3VycmVudC5jb250ZW50LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm1hcmtkb3duMiwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0NoYW5nZSB0byBIZWFkaW5nIDInKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuc2V0TWFya2Rvd25IZWFkZXIoY3VycmVudC5jb250ZW50LCAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm1hcmtkb3duMywge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0NoYW5nZSB0byBIZWFkaW5nIDMnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuc2V0TWFya2Rvd25IZWFkZXIoY3VycmVudC5jb250ZW50LCAzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm1hcmtkb3duNCwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0NoYW5nZSB0byBIZWFkaW5nIDQnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuc2V0TWFya2Rvd25IZWFkZXIoY3VycmVudC5jb250ZW50LCA0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm1hcmtkb3duNSwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0NoYW5nZSB0byBIZWFkaW5nIDUnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuc2V0TWFya2Rvd25IZWFkZXIoY3VycmVudC5jb250ZW50LCA1KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm1hcmtkb3duNiwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0NoYW5nZSB0byBIZWFkaW5nIDYnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuc2V0TWFya2Rvd25IZWFkZXIoY3VycmVudC5jb250ZW50LCA2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmhpZGVDb2RlLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnQ29sbGFwc2UgU2VsZWN0ZWQgQ29kZScpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5vdGVib29rQWN0aW9ucy5oaWRlQ29kZShjdXJyZW50LmNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuc2hvd0NvZGUsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdFeHBhbmQgU2VsZWN0ZWQgQ29kZScpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5vdGVib29rQWN0aW9ucy5zaG93Q29kZShjdXJyZW50LmNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuaGlkZUFsbENvZGUsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdDb2xsYXBzZSBBbGwgQ29kZScpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5vdGVib29rQWN0aW9ucy5oaWRlQWxsQ29kZShjdXJyZW50LmNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuc2hvd0FsbENvZGUsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdFeHBhbmQgQWxsIENvZGUnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuc2hvd0FsbENvZGUoY3VycmVudC5jb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmhpZGVPdXRwdXQsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdDb2xsYXBzZSBTZWxlY3RlZCBPdXRwdXRzJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLmhpZGVPdXRwdXQoY3VycmVudC5jb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnNob3dPdXRwdXQsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdFeHBhbmQgU2VsZWN0ZWQgT3V0cHV0cycpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5vdGVib29rQWN0aW9ucy5zaG93T3V0cHV0KGN1cnJlbnQuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5oaWRlQWxsT3V0cHV0cywge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0NvbGxhcHNlIEFsbCBPdXRwdXRzJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLmhpZGVBbGxPdXRwdXRzKGN1cnJlbnQuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy50b2dnbGVSZW5kZXJTaWRlQnlTaWRlQ3VycmVudE5vdGVib29rLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnUmVuZGVyIFNpZGUtYnktU2lkZScpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KHRyYWNrZXIsIHNoZWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuY29udGVudC5yZW5kZXJpbmdMYXlvdXQgPT09ICdzaWRlLWJ5LXNpZGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMucmVuZGVyRGVmYXVsdChjdXJyZW50LmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLnJlbmRlclNpZGVCeVNpZGUoY3VycmVudC5jb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkLFxuICAgICAgICBpc1RvZ2dsZWQ6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgYXJncyksIHsgYWN0aXZhdGU6IGZhbHNlIH0pKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQuY29udGVudC5yZW5kZXJpbmdMYXlvdXQgPT09ICdzaWRlLWJ5LXNpZGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnNldFNpZGVCeVNpZGVSYXRpbywge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1NldCBzaWRlLWJ5LXNpZGUgcmF0aW8nKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBJbnB1dERpYWxvZy5nZXROdW1iZXIoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFucy5fXygnV2lkdGggb2YgdGhlIG91dHB1dCBpbiBzaWRlLWJ5LXNpZGUgbW9kZScpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAxXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tanAtc2lkZS1ieS1zaWRlLW91dHB1dC1zaXplJywgYCR7cmVzdWx0LnZhbHVlfWZyYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuc2hvd0FsbE91dHB1dHMsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdFeHBhbmQgQWxsIE91dHB1dHMnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuc2hvd0FsbE91dHB1dHMoY3VycmVudC5jb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmVuYWJsZU91dHB1dFNjcm9sbGluZywge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0VuYWJsZSBTY3JvbGxpbmcgZm9yIE91dHB1dHMnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuZW5hYmxlT3V0cHV0U2Nyb2xsaW5nKGN1cnJlbnQuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5kaXNhYmxlT3V0cHV0U2Nyb2xsaW5nLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnRGlzYWJsZSBTY3JvbGxpbmcgZm9yIE91dHB1dHMnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuZGlzYWJsZU91dHB1dFNjcm9sbGluZyhjdXJyZW50LmNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuc2VsZWN0TGFzdFJ1bkNlbGwsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdTZWxlY3QgY3VycmVudCBydW5uaW5nIG9yIGxhc3QgcnVuIGNlbGwnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMuc2VsZWN0TGFzdFJ1bkNlbGwoY3VycmVudC5jb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnJlcGxhY2VTZWxlY3Rpb24sIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdSZXBsYWNlIFNlbGVjdGlvbiBpbiBOb3RlYm9vayBDZWxsJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGFyZ3NbJ3RleHQnXSB8fCAnJztcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5vdGVib29rQWN0aW9ucy5yZXBsYWNlU2VsZWN0aW9uKGN1cnJlbnQuY29udGVudCwgdGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy50b2dnbGVDb2xsYXBzZUNtZCwge1xuICAgICAgICBsYWJlbDogJ1RvZ2dsZSBDb2xsYXBzZSBOb3RlYm9vayBIZWFkaW5nJyxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudCh0cmFja2VyLCBzaGVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RlYm9va0FjdGlvbnMudG9nZ2xlQ3VycmVudEhlYWRpbmdDb2xsYXBzZShjdXJyZW50LmNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWQ6IGlzRW5hYmxlZEFuZEhlYWRpbmdTZWxlY3RlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jb2xsYXBzZUFsbENtZCwge1xuICAgICAgICBsYWJlbDogJ0NvbGxhcHNlIEFsbCBDZWxscycsXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLmNvbGxhcHNlQWxsKGN1cnJlbnQuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuZXhwYW5kQWxsQ21kLCB7XG4gICAgICAgIGxhYmVsOiAnRXhwYW5kIEFsbCBIZWFkaW5ncycsXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQodHJhY2tlciwgc2hlbGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLmV4cGFuZEFsbEhlYWRpbmdzKGN1cnJlbnQuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogUG9wdWxhdGUgdGhlIGFwcGxpY2F0aW9uJ3MgY29tbWFuZCBwYWxldHRlIHdpdGggbm90ZWJvb2sgY29tbWFuZHMuXG4gKi9cbmZ1bmN0aW9uIHBvcHVsYXRlUGFsZXR0ZShwYWxldHRlLCB0cmFuc2xhdG9yKSB7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICBsZXQgY2F0ZWdvcnkgPSB0cmFucy5fXygnTm90ZWJvb2sgT3BlcmF0aW9ucycpO1xuICAgIFtcbiAgICAgICAgQ29tbWFuZElEcy5pbnRlcnJ1cHQsXG4gICAgICAgIENvbW1hbmRJRHMucmVzdGFydCxcbiAgICAgICAgQ29tbWFuZElEcy5yZXN0YXJ0Q2xlYXIsXG4gICAgICAgIENvbW1hbmRJRHMucmVzdGFydFJ1bkFsbCxcbiAgICAgICAgQ29tbWFuZElEcy5ydW5BbGwsXG4gICAgICAgIENvbW1hbmRJRHMucmVuZGVyQWxsTWFya2Rvd24sXG4gICAgICAgIENvbW1hbmRJRHMucnVuQWxsQWJvdmUsXG4gICAgICAgIENvbW1hbmRJRHMucnVuQWxsQmVsb3csXG4gICAgICAgIENvbW1hbmRJRHMucmVzdGFydEFuZFJ1blRvU2VsZWN0ZWQsXG4gICAgICAgIENvbW1hbmRJRHMuc2VsZWN0QWxsLFxuICAgICAgICBDb21tYW5kSURzLmRlc2VsZWN0QWxsLFxuICAgICAgICBDb21tYW5kSURzLmNsZWFyQWxsT3V0cHV0cyxcbiAgICAgICAgQ29tbWFuZElEcy50b2dnbGVBbGxMaW5lcyxcbiAgICAgICAgQ29tbWFuZElEcy5lZGl0TW9kZSxcbiAgICAgICAgQ29tbWFuZElEcy5jb21tYW5kTW9kZSxcbiAgICAgICAgQ29tbWFuZElEcy5jaGFuZ2VLZXJuZWwsXG4gICAgICAgIENvbW1hbmRJRHMucmVjb25uZWN0VG9LZXJuZWwsXG4gICAgICAgIENvbW1hbmRJRHMuY3JlYXRlQ29uc29sZSxcbiAgICAgICAgQ29tbWFuZElEcy5jbG9zZUFuZFNodXRkb3duLFxuICAgICAgICBDb21tYW5kSURzLnRydXN0LFxuICAgICAgICBDb21tYW5kSURzLnRvZ2dsZUNvbGxhcHNlQ21kLFxuICAgICAgICBDb21tYW5kSURzLmNvbGxhcHNlQWxsQ21kLFxuICAgICAgICBDb21tYW5kSURzLmV4cGFuZEFsbENtZFxuICAgIF0uZm9yRWFjaChjb21tYW5kID0+IHtcbiAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHsgY29tbWFuZCwgY2F0ZWdvcnkgfSk7XG4gICAgfSk7XG4gICAgcGFsZXR0ZS5hZGRJdGVtKHtcbiAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy5jcmVhdGVOZXcsXG4gICAgICAgIGNhdGVnb3J5LFxuICAgICAgICBhcmdzOiB7IGlzUGFsZXR0ZTogdHJ1ZSB9XG4gICAgfSk7XG4gICAgY2F0ZWdvcnkgPSB0cmFucy5fXygnTm90ZWJvb2sgQ2VsbCBPcGVyYXRpb25zJyk7XG4gICAgW1xuICAgICAgICBDb21tYW5kSURzLnJ1bixcbiAgICAgICAgQ29tbWFuZElEcy5ydW5BbmRBZHZhbmNlLFxuICAgICAgICBDb21tYW5kSURzLnJ1bkFuZEluc2VydCxcbiAgICAgICAgQ29tbWFuZElEcy5ydW5JbkNvbnNvbGUsXG4gICAgICAgIENvbW1hbmRJRHMuY2xlYXJPdXRwdXRzLFxuICAgICAgICBDb21tYW5kSURzLnRvQ29kZSxcbiAgICAgICAgQ29tbWFuZElEcy50b01hcmtkb3duLFxuICAgICAgICBDb21tYW5kSURzLnRvUmF3LFxuICAgICAgICBDb21tYW5kSURzLmN1dCxcbiAgICAgICAgQ29tbWFuZElEcy5jb3B5LFxuICAgICAgICBDb21tYW5kSURzLnBhc3RlQmVsb3csXG4gICAgICAgIENvbW1hbmRJRHMucGFzdGVBYm92ZSxcbiAgICAgICAgQ29tbWFuZElEcy5wYXN0ZUFuZFJlcGxhY2UsXG4gICAgICAgIENvbW1hbmRJRHMuZGVsZXRlQ2VsbCxcbiAgICAgICAgQ29tbWFuZElEcy5zcGxpdCxcbiAgICAgICAgQ29tbWFuZElEcy5tZXJnZSxcbiAgICAgICAgQ29tbWFuZElEcy5tZXJnZUFib3ZlLFxuICAgICAgICBDb21tYW5kSURzLm1lcmdlQmVsb3csXG4gICAgICAgIENvbW1hbmRJRHMuaW5zZXJ0QWJvdmUsXG4gICAgICAgIENvbW1hbmRJRHMuaW5zZXJ0QmVsb3csXG4gICAgICAgIENvbW1hbmRJRHMuc2VsZWN0QWJvdmUsXG4gICAgICAgIENvbW1hbmRJRHMuc2VsZWN0QmVsb3csXG4gICAgICAgIENvbW1hbmRJRHMuZXh0ZW5kQWJvdmUsXG4gICAgICAgIENvbW1hbmRJRHMuZXh0ZW5kVG9wLFxuICAgICAgICBDb21tYW5kSURzLmV4dGVuZEJlbG93LFxuICAgICAgICBDb21tYW5kSURzLmV4dGVuZEJvdHRvbSxcbiAgICAgICAgQ29tbWFuZElEcy5tb3ZlRG93bixcbiAgICAgICAgQ29tbWFuZElEcy5tb3ZlVXAsXG4gICAgICAgIENvbW1hbmRJRHMudW5kb0NlbGxBY3Rpb24sXG4gICAgICAgIENvbW1hbmRJRHMucmVkb0NlbGxBY3Rpb24sXG4gICAgICAgIENvbW1hbmRJRHMubWFya2Rvd24xLFxuICAgICAgICBDb21tYW5kSURzLm1hcmtkb3duMixcbiAgICAgICAgQ29tbWFuZElEcy5tYXJrZG93bjMsXG4gICAgICAgIENvbW1hbmRJRHMubWFya2Rvd240LFxuICAgICAgICBDb21tYW5kSURzLm1hcmtkb3duNSxcbiAgICAgICAgQ29tbWFuZElEcy5tYXJrZG93bjYsXG4gICAgICAgIENvbW1hbmRJRHMuaGlkZUNvZGUsXG4gICAgICAgIENvbW1hbmRJRHMuc2hvd0NvZGUsXG4gICAgICAgIENvbW1hbmRJRHMuaGlkZUFsbENvZGUsXG4gICAgICAgIENvbW1hbmRJRHMuc2hvd0FsbENvZGUsXG4gICAgICAgIENvbW1hbmRJRHMuaGlkZU91dHB1dCxcbiAgICAgICAgQ29tbWFuZElEcy5zaG93T3V0cHV0LFxuICAgICAgICBDb21tYW5kSURzLmhpZGVBbGxPdXRwdXRzLFxuICAgICAgICBDb21tYW5kSURzLnNob3dBbGxPdXRwdXRzLFxuICAgICAgICBDb21tYW5kSURzLnRvZ2dsZVJlbmRlclNpZGVCeVNpZGVDdXJyZW50Tm90ZWJvb2ssXG4gICAgICAgIENvbW1hbmRJRHMuc2V0U2lkZUJ5U2lkZVJhdGlvLFxuICAgICAgICBDb21tYW5kSURzLmVuYWJsZU91dHB1dFNjcm9sbGluZyxcbiAgICAgICAgQ29tbWFuZElEcy5kaXNhYmxlT3V0cHV0U2Nyb2xsaW5nXG4gICAgXS5mb3JFYWNoKGNvbW1hbmQgPT4ge1xuICAgICAgICBwYWxldHRlLmFkZEl0ZW0oeyBjb21tYW5kLCBjYXRlZ29yeSB9KTtcbiAgICB9KTtcbn1cbi8qKlxuICogUG9wdWxhdGVzIHRoZSBhcHBsaWNhdGlvbiBtZW51cyBmb3IgdGhlIG5vdGVib29rLlxuICovXG5mdW5jdGlvbiBwb3B1bGF0ZU1lbnVzKGFwcCwgbWFpbk1lbnUsIHRyYWNrZXIsIHRyYW5zbGF0b3IsIHNlc3Npb25EaWFsb2dzKSB7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICBjb25zdCB7IGNvbW1hbmRzIH0gPSBhcHA7XG4gICAgc2Vzc2lvbkRpYWxvZ3MgPSBzZXNzaW9uRGlhbG9ncyB8fCBzZXNzaW9uQ29udGV4dERpYWxvZ3M7XG4gICAgLy8gQWRkIHVuZG8vcmVkbyBob29rcyB0byB0aGUgZWRpdCBtZW51LlxuICAgIG1haW5NZW51LmVkaXRNZW51LnVuZG9lcnMuYWRkKHtcbiAgICAgICAgdHJhY2tlcixcbiAgICAgICAgdW5kbzogd2lkZ2V0ID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIChfYSA9IHdpZGdldC5jb250ZW50LmFjdGl2ZUNlbGwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5lZGl0b3IudW5kbygpO1xuICAgICAgICB9LFxuICAgICAgICByZWRvOiB3aWRnZXQgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgKF9hID0gd2lkZ2V0LmNvbnRlbnQuYWN0aXZlQ2VsbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmVkaXRvci5yZWRvKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBBZGQgYSBjbGVhcmVyIHRvIHRoZSBlZGl0IG1lbnVcbiAgICBtYWluTWVudS5lZGl0TWVudS5jbGVhcmVycy5hZGQoe1xuICAgICAgICB0cmFja2VyLFxuICAgICAgICBjbGVhckN1cnJlbnRMYWJlbDogKG4pID0+IHRyYW5zLl9fKCdDbGVhciBPdXRwdXQnKSxcbiAgICAgICAgY2xlYXJBbGxMYWJlbDogKG4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0cmFucy5fXygnQ2xlYXIgQWxsIE91dHB1dHMnKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXJDdXJyZW50OiAoY3VycmVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE5vdGVib29rQWN0aW9ucy5jbGVhck91dHB1dHMoY3VycmVudC5jb250ZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXJBbGw6IChjdXJyZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLmNsZWFyQWxsT3V0cHV0cyhjdXJyZW50LmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gQWRkIGEgY2xvc2UgYW5kIHNodXRkb3duIGNvbW1hbmQgdG8gdGhlIGZpbGUgbWVudS5cbiAgICBtYWluTWVudS5maWxlTWVudS5jbG9zZUFuZENsZWFuZXJzLmFkZCh7XG4gICAgICAgIHRyYWNrZXIsXG4gICAgICAgIGNsb3NlQW5kQ2xlYW51cExhYmVsOiAobikgPT4gdHJhbnMuX18oJ0Nsb3NlIGFuZCBTaHV0ZG93biBOb3RlYm9vaycpLFxuICAgICAgICBjbG9zZUFuZENsZWFudXA6IChjdXJyZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGN1cnJlbnQudGl0bGUubGFiZWw7XG4gICAgICAgICAgICByZXR1cm4gc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdTaHV0IGRvd24gdGhlIE5vdGVib29rPycpLFxuICAgICAgICAgICAgICAgIGJvZHk6IHRyYW5zLl9fKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2xvc2UgXCIlMVwiPycsIGZpbGVOYW1lKSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbRGlhbG9nLmNhbmNlbEJ1dHRvbigpLCBEaWFsb2cud2FybkJ1dHRvbigpXVxuICAgICAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuYnV0dG9uLmFjY2VwdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudC5jb250ZXh0LnNlc3Npb25Db250ZXh0LnNodXRkb3duKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBBZGQgYSBrZXJuZWwgdXNlciB0byB0aGUgS2VybmVsIG1lbnVcbiAgICBtYWluTWVudS5rZXJuZWxNZW51Lmtlcm5lbFVzZXJzLmFkZCh7XG4gICAgICAgIHRyYWNrZXIsXG4gICAgICAgIGludGVycnVwdEtlcm5lbDogY3VycmVudCA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCBrZXJuZWwgPSAoX2EgPSBjdXJyZW50LnNlc3Npb25Db250ZXh0LnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5rZXJuZWw7XG4gICAgICAgICAgICBpZiAoa2VybmVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtlcm5lbC5pbnRlcnJ1cHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodm9pZCAwKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVjb25uZWN0VG9LZXJuZWw6IGN1cnJlbnQgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3Qga2VybmVsID0gKF9hID0gY3VycmVudC5zZXNzaW9uQ29udGV4dC5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eua2VybmVsO1xuICAgICAgICAgICAgaWYgKGtlcm5lbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXJuZWwucmVjb25uZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZvaWQgMCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlc3RhcnRLZXJuZWxBbmRDbGVhckxhYmVsOiAobikgPT4gdHJhbnMuX18oJ1Jlc3RhcnQgS2VybmVsIGFuZCBDbGVhciBBbGwgT3V0cHV0c+KApicpLFxuICAgICAgICByZXN0YXJ0S2VybmVsOiBjdXJyZW50ID0+IHNlc3Npb25EaWFsb2dzLnJlc3RhcnQoY3VycmVudC5zZXNzaW9uQ29udGV4dCwgdHJhbnNsYXRvciksXG4gICAgICAgIHJlc3RhcnRLZXJuZWxBbmRDbGVhcjogY3VycmVudCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbkRpYWxvZ3NcbiAgICAgICAgICAgICAgICAucmVzdGFydChjdXJyZW50LnNlc3Npb25Db250ZXh0LCB0cmFuc2xhdG9yKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3RhcnRlZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICBOb3RlYm9va0FjdGlvbnMuY2xlYXJBbGxPdXRwdXRzKGN1cnJlbnQuY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN0YXJ0ZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgY2hhbmdlS2VybmVsOiBjdXJyZW50ID0+IHNlc3Npb25EaWFsb2dzLnNlbGVjdEtlcm5lbChjdXJyZW50LnNlc3Npb25Db250ZXh0LCB0cmFuc2xhdG9yKSxcbiAgICAgICAgc2h1dGRvd25LZXJuZWw6IGN1cnJlbnQgPT4gY3VycmVudC5zZXNzaW9uQ29udGV4dC5zaHV0ZG93bigpXG4gICAgfSk7XG4gICAgLy8gQWRkIGEgY29uc29sZSBjcmVhdG9yIHRoZSB0aGUgS2VybmVsIG1lbnVcbiAgICBtYWluTWVudS5maWxlTWVudS5jb25zb2xlQ3JlYXRvcnMuYWRkKHtcbiAgICAgICAgdHJhY2tlcixcbiAgICAgICAgY3JlYXRlQ29uc29sZUxhYmVsOiAobikgPT4gdHJhbnMuX18oJ05ldyBDb25zb2xlIGZvciBOb3RlYm9vaycpLFxuICAgICAgICBjcmVhdGVDb25zb2xlOiBjdXJyZW50ID0+IFByaXZhdGUuY3JlYXRlQ29uc29sZShjb21tYW5kcywgY3VycmVudCwgdHJ1ZSlcbiAgICB9KTtcbiAgICAvLyBBZGQgYW4gSUVkaXRvclZpZXdlciB0byB0aGUgYXBwbGljYXRpb24gdmlldyBtZW51XG4gICAgbWFpbk1lbnUudmlld01lbnUuZWRpdG9yVmlld2Vycy5hZGQoe1xuICAgICAgICB0cmFja2VyLFxuICAgICAgICB0b2dnbGVMaW5lTnVtYmVyczogd2lkZ2V0ID0+IHtcbiAgICAgICAgICAgIE5vdGVib29rQWN0aW9ucy50b2dnbGVBbGxMaW5lTnVtYmVycyh3aWRnZXQuY29udGVudCk7XG4gICAgICAgIH0sXG4gICAgICAgIGxpbmVOdW1iZXJzVG9nZ2xlZDogd2lkZ2V0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHdpZGdldC5jb250ZW50LmVkaXRvckNvbmZpZztcbiAgICAgICAgICAgIHJldHVybiAhIShjb25maWcuY29kZS5saW5lTnVtYmVycyAmJlxuICAgICAgICAgICAgICAgIGNvbmZpZy5tYXJrZG93bi5saW5lTnVtYmVycyAmJlxuICAgICAgICAgICAgICAgIGNvbmZpZy5yYXcubGluZU51bWJlcnMpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gQWRkIGFuIElDb2RlUnVubmVyIHRvIHRoZSBhcHBsaWNhdGlvbiBydW4gbWVudVxuICAgIG1haW5NZW51LnJ1bk1lbnUuY29kZVJ1bm5lcnMuYWRkKHtcbiAgICAgICAgdHJhY2tlcixcbiAgICAgICAgcnVuTGFiZWw6IChuKSA9PiB0cmFucy5fXygnUnVuIFNlbGVjdGVkIENlbGxzJyksXG4gICAgICAgIHJ1bkNhcHRpb246IChuKSA9PiB0cmFucy5fXygnUnVuIHRoZSBzZWxlY3RlZCBjZWxscyBhbmQgYWR2YW5jZScpLFxuICAgICAgICBydW5BbGxMYWJlbDogKG4pID0+IHRyYW5zLl9fKCdSdW4gQWxsIENlbGxzJyksXG4gICAgICAgIHJ1bkFsbENhcHRpb246IChuKSA9PiB0cmFucy5fXygnUnVuIHRoZSBhbGwgbm90ZWJvb2sgY2VsbHMnKSxcbiAgICAgICAgcmVzdGFydEFuZFJ1bkFsbExhYmVsOiAobikgPT4gdHJhbnMuX18oJ1Jlc3RhcnQgS2VybmVsIGFuZCBSdW4gQWxsIENlbGxz4oCmJyksXG4gICAgICAgIHJlc3RhcnRBbmRSdW5BbGxDYXB0aW9uOiAobikgPT4gdHJhbnMuX18oJ1Jlc3RhcnQgdGhlIGtlcm5lbCwgdGhlbiByZS1ydW4gdGhlIHdob2xlIG5vdGVib29rJyksXG4gICAgICAgIHJ1bjogY3VycmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGNvbnRleHQsIGNvbnRlbnQgfSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICByZXR1cm4gTm90ZWJvb2tBY3Rpb25zLnJ1bkFuZEFkdmFuY2UoY29udGVudCwgY29udGV4dC5zZXNzaW9uQ29udGV4dCkudGhlbigoKSA9PiB2b2lkIDApO1xuICAgICAgICB9LFxuICAgICAgICBydW5BbGw6IGN1cnJlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBjb250ZXh0LCBjb250ZW50IH0gPSBjdXJyZW50O1xuICAgICAgICAgICAgcmV0dXJuIE5vdGVib29rQWN0aW9ucy5ydW5BbGwoY29udGVudCwgY29udGV4dC5zZXNzaW9uQ29udGV4dCkudGhlbigoKSA9PiB2b2lkIDApO1xuICAgICAgICB9LFxuICAgICAgICByZXN0YXJ0QW5kUnVuQWxsOiBjdXJyZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29udGV4dCwgY29udGVudCB9ID0gY3VycmVudDtcbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uRGlhbG9nc1xuICAgICAgICAgICAgICAgIC5yZXN0YXJ0KGNvbnRleHQuc2Vzc2lvbkNvbnRleHQsIHRyYW5zbGF0b3IpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzdGFydGVkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgTm90ZWJvb2tBY3Rpb25zLnJ1bkFsbChjb250ZW50LCBjb250ZXh0LnNlc3Npb25Db250ZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3RhcnRlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gQWRkIGtlcm5lbCBpbmZvcm1hdGlvbiB0byB0aGUgYXBwbGljYXRpb24gaGVscCBtZW51LlxuICAgIG1haW5NZW51LmhlbHBNZW51Lmtlcm5lbFVzZXJzLmFkZCh7XG4gICAgICAgIHRyYWNrZXIsXG4gICAgICAgIGdldEtlcm5lbDogY3VycmVudCA9PiB7IHZhciBfYTsgcmV0dXJuIChfYSA9IGN1cnJlbnQuc2Vzc2lvbkNvbnRleHQuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmtlcm5lbDsgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgbW9kdWxlIHByaXZhdGUgZnVuY3Rpb25hbGl0eS5cbiAqL1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBjb25zb2xlIGNvbm5lY3RlZCB3aXRoIGEgbm90ZWJvb2sga2VybmVsXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29tbWFuZHMgQ29tbWFuZHMgcmVnaXN0cnlcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IE5vdGVib29rIHBhbmVsXG4gICAgICogQHBhcmFtIGFjdGl2YXRlIFNob3VsZCB0aGUgY29uc29sZSBiZSBhY3RpdmF0ZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVDb25zb2xlKGNvbW1hbmRzLCB3aWRnZXQsIGFjdGl2YXRlKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBwYXRoOiB3aWRnZXQuY29udGV4dC5wYXRoLFxuICAgICAgICAgICAgcHJlZmVycmVkTGFuZ3VhZ2U6IHdpZGdldC5jb250ZXh0Lm1vZGVsLmRlZmF1bHRLZXJuZWxMYW5ndWFnZSxcbiAgICAgICAgICAgIGFjdGl2YXRlOiBhY3RpdmF0ZSxcbiAgICAgICAgICAgIHJlZjogd2lkZ2V0LmlkLFxuICAgICAgICAgICAgaW5zZXJ0TW9kZTogJ3NwbGl0LWJvdHRvbSdcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGNvbW1hbmRzLmV4ZWN1dGUoJ2NvbnNvbGU6Y3JlYXRlJywgb3B0aW9ucyk7XG4gICAgfVxuICAgIFByaXZhdGUuY3JlYXRlQ29uc29sZSA9IGNyZWF0ZUNvbnNvbGU7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGVyZSBpcyBhbiBhY3RpdmUgbm90ZWJvb2suXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNFbmFibGVkKHNoZWxsLCB0cmFja2VyKSB7XG4gICAgICAgIHJldHVybiAodHJhY2tlci5jdXJyZW50V2lkZ2V0ICE9PSBudWxsICYmXG4gICAgICAgICAgICB0cmFja2VyLmN1cnJlbnRXaWRnZXQgPT09IHNoZWxsLmN1cnJlbnRXaWRnZXQpO1xuICAgIH1cbiAgICBQcml2YXRlLmlzRW5hYmxlZCA9IGlzRW5hYmxlZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZXJlIGlzIGFuIG5vdGVib29rIGFjdGl2ZSwgd2l0aCBhIHNpbmdsZSBzZWxlY3RlZCBjZWxsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzRW5hYmxlZEFuZFNpbmdsZVNlbGVjdGVkKHNoZWxsLCB0cmFja2VyKSB7XG4gICAgICAgIGlmICghUHJpdmF0ZS5pc0VuYWJsZWQoc2hlbGwsIHRyYWNrZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBjb250ZW50IH0gPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gY29udGVudC5hY3RpdmVDZWxsSW5kZXg7XG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBzZWxlY3Rpb25zIHRoYXQgYXJlIG5vdCB0aGUgYWN0aXZlIGNlbGwsXG4gICAgICAgIC8vIHRoaXMgY29tbWFuZCBpcyBjb25mdXNpbmcsIHNvIGRpc2FibGUgaXQuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGVudC53aWRnZXRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoY29udGVudC5pc1NlbGVjdGVkKGNvbnRlbnQud2lkZ2V0c1tpXSkgJiYgaSAhPT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIFByaXZhdGUuaXNFbmFibGVkQW5kU2luZ2xlU2VsZWN0ZWQgPSBpc0VuYWJsZWRBbmRTaW5nbGVTZWxlY3RlZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZXJlIGlzIGFuIG5vdGVib29rIGFjdGl2ZSwgd2l0aCBhIHNpbmdsZSBzZWxlY3RlZCBjZWxsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzRW5hYmxlZEFuZEhlYWRpbmdTZWxlY3RlZChzaGVsbCwgdHJhY2tlcikge1xuICAgICAgICBpZiAoIVByaXZhdGUuaXNFbmFibGVkKHNoZWxsLCB0cmFja2VyKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgY29udGVudCB9ID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0O1xuICAgICAgICBjb25zdCBpbmRleCA9IGNvbnRlbnQuYWN0aXZlQ2VsbEluZGV4O1xuICAgICAgICBpZiAoIShjb250ZW50LmFjdGl2ZUNlbGwgaW5zdGFuY2VvZiBNYXJrZG93bkNlbGwpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIHNlbGVjdGlvbnMgdGhhdCBhcmUgbm90IHRoZSBhY3RpdmUgY2VsbCxcbiAgICAgICAgLy8gdGhpcyBjb21tYW5kIGlzIGNvbmZ1c2luZywgc28gZGlzYWJsZSBpdC5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250ZW50LndpZGdldHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChjb250ZW50LmlzU2VsZWN0ZWQoY29udGVudC53aWRnZXRzW2ldKSAmJiBpICE9PSBpbmRleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgUHJpdmF0ZS5pc0VuYWJsZWRBbmRIZWFkaW5nU2VsZWN0ZWQgPSBpc0VuYWJsZWRBbmRIZWFkaW5nU2VsZWN0ZWQ7XG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgRXhwb3J0IFRvIC4uLiBmb3JtYXRzIGFuZCB0aGVpciBodW1hbiByZWFkYWJsZSBsYWJlbHMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0Rm9ybWF0TGFiZWxzKHRyYW5zbGF0b3IpIHtcbiAgICAgICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBodG1sOiB0cmFucy5fXygnSFRNTCcpLFxuICAgICAgICAgICAgbGF0ZXg6IHRyYW5zLl9fKCdMYVRlWCcpLFxuICAgICAgICAgICAgbWFya2Rvd246IHRyYW5zLl9fKCdNYXJrZG93bicpLFxuICAgICAgICAgICAgcGRmOiB0cmFucy5fXygnUERGJyksXG4gICAgICAgICAgICByc3Q6IHRyYW5zLl9fKCdSZVN0cnVjdHVyZWQgVGV4dCcpLFxuICAgICAgICAgICAgc2NyaXB0OiB0cmFucy5fXygnRXhlY3V0YWJsZSBTY3JpcHQnKSxcbiAgICAgICAgICAgIHNsaWRlczogdHJhbnMuX18oJ1JldmVhbC5qcyBTbGlkZXMnKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBQcml2YXRlLmdldEZvcm1hdExhYmVscyA9IGdldEZvcm1hdExhYmVscztcbiAgICAvKipcbiAgICAgKiBBIHdpZGdldCBob3N0aW5nIGEgY2xvbmVkIG91dHB1dCBhcmVhLlxuICAgICAqL1xuICAgIGNsYXNzIENsb25lZE91dHB1dEFyZWEgZXh0ZW5kcyBQYW5lbCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9jZWxsID0gbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zID0gKG9wdGlvbnMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcikubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICAgICAgdGhpcy5fbm90ZWJvb2sgPSBvcHRpb25zLm5vdGVib29rO1xuICAgICAgICAgICAgdGhpcy5faW5kZXggPSBvcHRpb25zLmluZGV4ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmluZGV4IDogLTE7XG4gICAgICAgICAgICB0aGlzLl9jZWxsID0gb3B0aW9ucy5jZWxsIHx8IG51bGw7XG4gICAgICAgICAgICB0aGlzLmlkID0gYExpbmtlZE91dHB1dFZpZXctJHtVVUlELnV1aWQ0KCl9YDtcbiAgICAgICAgICAgIHRoaXMudGl0bGUubGFiZWwgPSAnT3V0cHV0IFZpZXcnO1xuICAgICAgICAgICAgdGhpcy50aXRsZS5pY29uID0gbm90ZWJvb2tJY29uO1xuICAgICAgICAgICAgdGhpcy50aXRsZS5jYXB0aW9uID0gdGhpcy5fbm90ZWJvb2sudGl0bGUubGFiZWxcbiAgICAgICAgICAgICAgICA/IHRyYW5zLl9fKCdGb3IgTm90ZWJvb2s6ICUxJywgdGhpcy5fbm90ZWJvb2sudGl0bGUubGFiZWwpXG4gICAgICAgICAgICAgICAgOiB0cmFucy5fXygnRm9yIE5vdGVib29rOicpO1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtTGlua2VkT3V0cHV0VmlldycpO1xuICAgICAgICAgICAgLy8gV2FpdCBmb3IgdGhlIG5vdGVib29rIHRvIGJlIGxvYWRlZCBiZWZvcmVcbiAgICAgICAgICAgIC8vIGNsb25pbmcgdGhlIG91dHB1dCBhcmVhLlxuICAgICAgICAgICAgdm9pZCB0aGlzLl9ub3RlYm9vay5jb250ZXh0LnJlYWR5LnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY2VsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZWxsID0gdGhpcy5fbm90ZWJvb2suY29udGVudC53aWRnZXRzW3RoaXMuX2luZGV4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9jZWxsIHx8IHRoaXMuX2NlbGwubW9kZWwudHlwZSAhPT0gJ2NvZGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGNsb25lID0gdGhpcy5fY2VsbC5jbG9uZU91dHB1dEFyZWEoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFdpZGdldChjbG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGluZGV4IG9mIHRoZSBjZWxsIGluIHRoZSBub3RlYm9vay5cbiAgICAgICAgICovXG4gICAgICAgIGdldCBpbmRleCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jZWxsXG4gICAgICAgICAgICAgICAgPyBBcnJheUV4dC5maW5kRmlyc3RJbmRleCh0aGlzLl9ub3RlYm9vay5jb250ZW50LndpZGdldHMsIGMgPT4gYyA9PT0gdGhpcy5fY2VsbClcbiAgICAgICAgICAgICAgICA6IHRoaXMuX2luZGV4O1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgcGF0aCBvZiB0aGUgbm90ZWJvb2sgZm9yIHRoZSBjbG9uZWQgb3V0cHV0IGFyZWEuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgcGF0aCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ub3RlYm9vay5jb250ZXh0LnBhdGg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUHJpdmF0ZS5DbG9uZWRPdXRwdXRBcmVhID0gQ2xvbmVkT3V0cHV0QXJlYTtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgSUxvZ2dlclJlZ2lzdHJ5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvbG9nY29uc29sZSc7XG5pbXBvcnQgeyBJTm90ZWJvb2tUcmFja2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvbm90ZWJvb2snO1xuaW1wb3J0IHsgS2VybmVsTWVzc2FnZSB9IGZyb20gJ0BqdXB5dGVybGFiL3NlcnZpY2VzJztcbi8qKlxuICogVGhlIExvZyBDb25zb2xlIGV4dGVuc2lvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGxvZ05vdGVib29rT3V0cHV0ID0ge1xuICAgIGFjdGl2YXRlOiBhY3RpdmF0ZU5CT3V0cHV0LFxuICAgIGlkOiAnQGp1cHl0ZXJsYWIvbm90ZWJvb2stZXh0ZW5zaW9uOmxvZy1vdXRwdXQnLFxuICAgIHJlcXVpcmVzOiBbSU5vdGVib29rVHJhY2tlcl0sXG4gICAgb3B0aW9uYWw6IFtJTG9nZ2VyUmVnaXN0cnldLFxuICAgIGF1dG9TdGFydDogdHJ1ZVxufTtcbmZ1bmN0aW9uIGFjdGl2YXRlTkJPdXRwdXQoYXBwLCBuYnRyYWNrZXIsIGxvZ2dlclJlZ2lzdHJ5KSB7XG4gICAgaWYgKCFsb2dnZXJSZWdpc3RyeSkge1xuICAgICAgICAvLyBBdXRvbWF0aWNhbGx5IGRpc2FibGUgaWYgbG9nY29uc29sZSBpcyBtaXNzaW5nXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJOQihuYikge1xuICAgICAgICBmdW5jdGlvbiBsb2dPdXRwdXQobXNnLCBsZXZlbE5vcm1hbCwgbGV2ZWxFcnJvcikge1xuICAgICAgICAgICAgaWYgKEtlcm5lbE1lc3NhZ2UuaXNEaXNwbGF5RGF0YU1zZyhtc2cpIHx8XG4gICAgICAgICAgICAgICAgS2VybmVsTWVzc2FnZS5pc1N0cmVhbU1zZyhtc2cpIHx8XG4gICAgICAgICAgICAgICAgS2VybmVsTWVzc2FnZS5pc0Vycm9yTXNnKG1zZykgfHxcbiAgICAgICAgICAgICAgICBLZXJuZWxNZXNzYWdlLmlzRXhlY3V0ZVJlc3VsdE1zZyhtc2cpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbG9nZ2VyID0gbG9nZ2VyUmVnaXN0cnkuZ2V0TG9nZ2VyKG5iLmNvbnRleHQucGF0aCk7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLnJlbmRlcm1pbWUgPSBuYi5jb250ZW50LnJlbmRlcm1pbWU7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbXNnLmNvbnRlbnQpLCB7IG91dHB1dF90eXBlOiBtc2cuaGVhZGVyLm1zZ190eXBlIH0pO1xuICAgICAgICAgICAgICAgIGxldCBsZXZlbCA9IGxldmVsTm9ybWFsO1xuICAgICAgICAgICAgICAgIGlmIChLZXJuZWxNZXNzYWdlLmlzRXJyb3JNc2cobXNnKSB8fFxuICAgICAgICAgICAgICAgICAgICAoS2VybmVsTWVzc2FnZS5pc1N0cmVhbU1zZyhtc2cpICYmIG1zZy5jb250ZW50Lm5hbWUgPT09ICdzdGRlcnInKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXZlbCA9IGxldmVsRXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coeyB0eXBlOiAnb3V0cHV0JywgZGF0YSwgbGV2ZWwgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlcmUgaXMgb3ZlcmxhcCBoZXJlIHNpbmNlIHVuaGFuZGxlZCBtZXNzYWdlcyBhcmUgYWxzbyBlbWl0dGVkIGluIHRoZVxuICAgICAgICAvLyBpb3B1Yk1lc3NhZ2Ugc2lnbmFsLiBIb3dldmVyLCB1bmhhbmRsZWQgbWVzc2FnZXMgd2FycmFudCBhIGhpZ2hlciBsb2dcbiAgICAgICAgLy8gc2V2ZXJpdHksIHNvIHdlJ2xsIGFjY2VwdCB0aGF0IHRoZXkgYXJlIGxvZ2dlZCB0d2ljZS5cbiAgICAgICAgbmIuY29udGV4dC5zZXNzaW9uQ29udGV4dC5pb3B1Yk1lc3NhZ2UuY29ubmVjdCgoXywgbXNnKSA9PiBsb2dPdXRwdXQobXNnLCAnaW5mbycsICdpbmZvJykpO1xuICAgICAgICBuYi5jb250ZXh0LnNlc3Npb25Db250ZXh0LnVuaGFuZGxlZE1lc3NhZ2UuY29ubmVjdCgoXywgbXNnKSA9PiBsb2dPdXRwdXQobXNnLCAnd2FybmluZycsICdlcnJvcicpKTtcbiAgICB9XG4gICAgbmJ0cmFja2VyLmZvckVhY2gobmIgPT4gcmVnaXN0ZXJOQihuYikpO1xuICAgIG5idHJhY2tlci53aWRnZXRBZGRlZC5jb25uZWN0KChfLCBuYikgPT4gcmVnaXN0ZXJOQihuYikpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bmJvdXRwdXQuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==