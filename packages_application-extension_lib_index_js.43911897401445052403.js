(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_application-extension_lib_index_js"],{

/***/ "../../packages/application-extension/lib/index.js":
/*!*********************************************************!*\
  !*** ../../packages/application-extension/lib/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_CONTEXT_ITEM_RANK": () => (/* binding */ DEFAULT_CONTEXT_ITEM_RANK),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_property_inspector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/property-inspector */ "webpack/sharing/consume/default/@jupyterlab/property-inspector/@jupyterlab/property-inspector");
/* harmony import */ var _jupyterlab_property_inspector__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_property_inspector__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/statedb */ "webpack/sharing/consume/default/@jupyterlab/statedb/@jupyterlab/statedb");
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_12__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module application-extension
 */













/**
 * Default context menu item rank
 */
const DEFAULT_CONTEXT_ITEM_RANK = 100;
/**
 * The command IDs used by the application plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.activateNextTab = 'application:activate-next-tab';
    CommandIDs.activatePreviousTab = 'application:activate-previous-tab';
    CommandIDs.activateNextTabBar = 'application:activate-next-tab-bar';
    CommandIDs.activatePreviousTabBar = 'application:activate-previous-tab-bar';
    CommandIDs.close = 'application:close';
    CommandIDs.closeOtherTabs = 'application:close-other-tabs';
    CommandIDs.closeRightTabs = 'application:close-right-tabs';
    CommandIDs.closeAll = 'application:close-all';
    CommandIDs.setMode = 'application:set-mode';
    CommandIDs.toggleMode = 'application:toggle-mode';
    CommandIDs.toggleLeftArea = 'application:toggle-left-area';
    CommandIDs.toggleRightArea = 'application:toggle-right-area';
    CommandIDs.togglePresentationMode = 'application:toggle-presentation-mode';
    CommandIDs.tree = 'router:tree';
    CommandIDs.switchSidebar = 'sidebar:switch';
})(CommandIDs || (CommandIDs = {}));
/**
 * A plugin to register the commands for the main application.
 */
const mainCommands = {
    id: '@jupyterlab/application-extension:commands',
    autoStart: true,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__.ITranslator],
    optional: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell, _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette],
    activate: (app, translator, labShell, palette) => {
        const { commands, shell } = app;
        const trans = translator.load('jupyterlab');
        const category = trans.__('Main Area');
        // Add Command to override the JLab context menu.
        commands.addCommand(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterFrontEndContextMenu.contextMenu, {
            label: trans.__('Shift+Right Click for Browser Menu'),
            isEnabled: () => false,
            execute: () => void 0
        });
        // Returns the widget associated with the most recent contextmenu event.
        const contextMenuWidget = () => {
            const test = (node) => !!node.dataset.id;
            const node = app.contextMenuHitTest(test);
            if (!node) {
                // Fall back to active widget if path cannot be obtained from event.
                return shell.currentWidget;
            }
            const matches = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_8__.toArray)(shell.widgets('main')).filter(widget => widget.id === node.dataset.id);
            if (matches.length < 1) {
                return shell.currentWidget;
            }
            return matches[0];
        };
        // Closes an array of widgets.
        const closeWidgets = (widgets) => {
            widgets.forEach(widget => widget.close());
        };
        // Find the tab area for a widget within a specific dock area.
        const findTab = (area, widget) => {
            switch (area.type) {
                case 'split-area': {
                    const iterator = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_8__.iter)(area.children);
                    let tab = null;
                    let value;
                    do {
                        value = iterator.next();
                        if (value) {
                            tab = findTab(value, widget);
                        }
                    } while (!tab && value);
                    return tab;
                }
                case 'tab-area': {
                    const { id } = widget;
                    return area.widgets.some(widget => widget.id === id) ? area : null;
                }
                default:
                    return null;
            }
        };
        // Find the tab area for a widget within the main dock area.
        const tabAreaFor = (widget) => {
            var _a;
            const layout = labShell === null || labShell === void 0 ? void 0 : labShell.saveLayout();
            const mainArea = layout === null || layout === void 0 ? void 0 : layout.mainArea;
            if (!mainArea || _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getOption('mode') !== 'multiple-document') {
                return null;
            }
            const area = (_a = mainArea.dock) === null || _a === void 0 ? void 0 : _a.main;
            if (!area) {
                return null;
            }
            return findTab(area, widget);
        };
        // Returns an array of all widgets to the right of a widget in a tab area.
        const widgetsRightOf = (widget) => {
            const { id } = widget;
            const tabArea = tabAreaFor(widget);
            const widgets = tabArea ? tabArea.widgets || [] : [];
            const index = widgets.findIndex(widget => widget.id === id);
            if (index < 0) {
                return [];
            }
            return widgets.slice(index + 1);
        };
        commands.addCommand(CommandIDs.close, {
            label: () => trans.__('Close Tab'),
            isEnabled: () => {
                const widget = contextMenuWidget();
                return !!widget && widget.title.closable;
            },
            execute: () => {
                const widget = contextMenuWidget();
                if (widget) {
                    widget.close();
                }
            }
        });
        commands.addCommand(CommandIDs.closeOtherTabs, {
            label: () => trans.__('Close All Other Tabs'),
            isEnabled: () => {
                // Ensure there are at least two widgets.
                const iterator = shell.widgets('main');
                return !!iterator.next() && !!iterator.next();
            },
            execute: () => {
                const widget = contextMenuWidget();
                if (!widget) {
                    return;
                }
                const { id } = widget;
                const otherWidgets = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_8__.toArray)(shell.widgets('main')).filter(widget => widget.id !== id);
                closeWidgets(otherWidgets);
            }
        });
        commands.addCommand(CommandIDs.closeRightTabs, {
            label: () => trans.__('Close Tabs to Right'),
            isEnabled: () => !!contextMenuWidget() &&
                widgetsRightOf(contextMenuWidget()).length > 0,
            execute: () => {
                const widget = contextMenuWidget();
                if (!widget) {
                    return;
                }
                closeWidgets(widgetsRightOf(widget));
            }
        });
        if (labShell) {
            commands.addCommand(CommandIDs.activateNextTab, {
                label: trans.__('Activate Next Tab'),
                execute: () => {
                    labShell.activateNextTab();
                }
            });
            commands.addCommand(CommandIDs.activatePreviousTab, {
                label: trans.__('Activate Previous Tab'),
                execute: () => {
                    labShell.activatePreviousTab();
                }
            });
            commands.addCommand(CommandIDs.activateNextTabBar, {
                label: trans.__('Activate Next Tab Bar'),
                execute: () => {
                    labShell.activateNextTabBar();
                }
            });
            commands.addCommand(CommandIDs.activatePreviousTabBar, {
                label: trans.__('Activate Previous Tab Bar'),
                execute: () => {
                    labShell.activatePreviousTabBar();
                }
            });
            commands.addCommand(CommandIDs.closeAll, {
                label: trans.__('Close All Tabs'),
                execute: () => {
                    labShell.closeAll();
                }
            });
            commands.addCommand(CommandIDs.toggleLeftArea, {
                label: () => trans.__('Show Left Sidebar'),
                execute: () => {
                    if (labShell.leftCollapsed) {
                        labShell.expandLeft();
                    }
                    else {
                        labShell.collapseLeft();
                        if (labShell.currentWidget) {
                            labShell.activateById(labShell.currentWidget.id);
                        }
                    }
                },
                isToggled: () => !labShell.leftCollapsed,
                isVisible: () => !labShell.isEmpty('left')
            });
            commands.addCommand(CommandIDs.toggleRightArea, {
                label: () => trans.__('Show Right Sidebar'),
                execute: () => {
                    if (labShell.rightCollapsed) {
                        labShell.expandRight();
                    }
                    else {
                        labShell.collapseRight();
                        if (labShell.currentWidget) {
                            labShell.activateById(labShell.currentWidget.id);
                        }
                    }
                },
                isToggled: () => !labShell.rightCollapsed,
                isVisible: () => !labShell.isEmpty('right')
            });
            commands.addCommand(CommandIDs.togglePresentationMode, {
                label: () => trans.__('Presentation Mode'),
                execute: () => {
                    labShell.presentationMode = !labShell.presentationMode;
                },
                isToggled: () => labShell.presentationMode,
                isVisible: () => true
            });
            commands.addCommand(CommandIDs.setMode, {
                isVisible: args => {
                    const mode = args['mode'];
                    return mode === 'single-document' || mode === 'multiple-document';
                },
                execute: args => {
                    const mode = args['mode'];
                    if (mode === 'single-document' || mode === 'multiple-document') {
                        labShell.mode = mode;
                        return;
                    }
                    throw new Error(`Unsupported application shell mode: ${mode}`);
                }
            });
            commands.addCommand(CommandIDs.toggleMode, {
                label: trans.__('Simple Interface'),
                isToggled: () => labShell.mode === 'single-document',
                execute: () => {
                    const args = labShell.mode === 'multiple-document'
                        ? { mode: 'single-document' }
                        : { mode: 'multiple-document' };
                    return commands.execute(CommandIDs.setMode, args);
                }
            });
        }
        if (palette) {
            [
                CommandIDs.activateNextTab,
                CommandIDs.activatePreviousTab,
                CommandIDs.activateNextTabBar,
                CommandIDs.activatePreviousTabBar,
                CommandIDs.close,
                CommandIDs.closeAll,
                CommandIDs.closeOtherTabs,
                CommandIDs.closeRightTabs,
                CommandIDs.toggleLeftArea,
                CommandIDs.toggleRightArea,
                CommandIDs.togglePresentationMode,
                CommandIDs.toggleMode
            ].forEach(command => palette.addItem({ command, category }));
        }
    }
};
/**
 * The main extension.
 */
const main = {
    id: '@jupyterlab/application-extension:main',
    requires: [
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.IRouter,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IWindowResolver,
        _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__.ITranslator,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterFrontEnd.ITreeResolver
    ],
    optional: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.IConnectionLost],
    provides: _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ITreePathUpdater,
    activate: (app, router, resolver, translator, treeResolver, connectionLost) => {
        const trans = translator.load('jupyterlab');
        if (!(app instanceof _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterLab)) {
            throw new Error(`${main.id} must be activated in JupyterLab.`);
        }
        // These two internal state variables are used to manage the two source
        // of the tree part of the URL being updated: 1) path of the active document,
        // 2) path of the default browser if the active main area widget isn't a document.
        let _docTreePath = '';
        let _defaultBrowserTreePath = '';
        function updateTreePath(treePath) {
            // Wait for tree resolver to finish before updating the path because it use the PageConfig['treePath']
            void treeResolver.paths.then(() => {
                _defaultBrowserTreePath = treePath;
                if (!_docTreePath) {
                    const url = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getUrl({ treePath });
                    const path = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.parse(url).pathname +
                        _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.parse(window.location.href).search;
                    router.navigate(path, { skipRouting: true });
                    // Persist the new tree path to PageConfig as it is used elsewhere at runtime.
                    _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.setOption('treePath', treePath);
                }
            });
        }
        // Requiring the window resolver guarantees that the application extension
        // only loads if there is a viable window name. Otherwise, the application
        // will short-circuit and ask the user to navigate away.
        const workspace = resolver.name;
        console.debug(`Starting application in workspace: "${workspace}"`);
        // If there were errors registering plugins, tell the user.
        if (app.registerPluginErrors.length !== 0) {
            const body = (react__WEBPACK_IMPORTED_MODULE_12__.createElement("pre", null, app.registerPluginErrors.map(e => e.message).join('\n')));
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showErrorMessage)(trans.__('Error Registering Plugins'), {
                message: body
            });
        }
        // If the application shell layout is modified,
        // trigger a refresh of the commands.
        app.shell.layoutModified.connect(() => {
            app.commands.notifyCommandChanged();
        });
        // Watch the mode and update the page URL to /lab or /doc to reflect the
        // change.
        app.shell.modeChanged.connect((_, args) => {
            const url = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getUrl({ mode: args });
            const path = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.parse(url).pathname;
            router.navigate(path, { skipRouting: true });
            // Persist this mode change to PageConfig as it is used elsewhere at runtime.
            _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.setOption('mode', args);
        });
        // Wait for tree resolver to finish before updating the path because it use the PageConfig['treePath']
        void treeResolver.paths.then(() => {
            // Watch the path of the current widget in the main area and update the page
            // URL to reflect the change.
            app.shell.currentPathChanged.connect((_, args) => {
                const maybeTreePath = args.newValue;
                const treePath = maybeTreePath || _defaultBrowserTreePath;
                const url = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getUrl({ treePath: treePath });
                const path = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.parse(url).pathname +
                    _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.parse(window.location.href).search;
                router.navigate(path, { skipRouting: true });
                // Persist the new tree path to PageConfig as it is used elsewhere at runtime.
                _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.setOption('treePath', treePath);
                _docTreePath = maybeTreePath;
            });
        });
        // If the connection to the server is lost, handle it with the
        // connection lost handler.
        connectionLost = connectionLost || _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ConnectionLost;
        app.serviceManager.connectionFailure.connect((manager, error) => connectionLost(manager, error, translator));
        const builder = app.serviceManager.builder;
        const build = () => {
            return builder
                .build()
                .then(() => {
                return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                    title: trans.__('Build Complete'),
                    body: (react__WEBPACK_IMPORTED_MODULE_12__.createElement("div", null,
                        trans.__('Build successfully completed, reload page?'),
                        react__WEBPACK_IMPORTED_MODULE_12__.createElement("br", null),
                        trans.__('You will lose any unsaved changes.'))),
                    buttons: [
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton({
                            label: trans.__('Reload Without Saving'),
                            actions: ['reload']
                        }),
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: trans.__('Save and Reload') })
                    ],
                    hasClose: true
                });
            })
                .then(({ button: { accept, actions } }) => {
                if (accept) {
                    void app.commands
                        .execute('docmanager:save')
                        .then(() => {
                        router.reload();
                    })
                        .catch(err => {
                        void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showErrorMessage)(trans.__('Save Failed'), {
                            message: react__WEBPACK_IMPORTED_MODULE_12__.createElement("pre", null, err.message)
                        });
                    });
                }
                else if (actions.includes('reload')) {
                    router.reload();
                }
            })
                .catch(err => {
                void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showErrorMessage)(trans.__('Build Failed'), {
                    message: react__WEBPACK_IMPORTED_MODULE_12__.createElement("pre", null, err.message)
                });
            });
        };
        if (builder.isAvailable && builder.shouldCheck) {
            void builder.getStatus().then(response => {
                if (response.status === 'building') {
                    return build();
                }
                if (response.status !== 'needed') {
                    return;
                }
                const body = (react__WEBPACK_IMPORTED_MODULE_12__.createElement("div", null,
                    trans.__('JupyterLab build is suggested:'),
                    react__WEBPACK_IMPORTED_MODULE_12__.createElement("br", null),
                    react__WEBPACK_IMPORTED_MODULE_12__.createElement("pre", null, response.message)));
                void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                    title: trans.__('Build Recommended'),
                    body,
                    buttons: [
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton(),
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: trans.__('Build') })
                    ]
                }).then(result => (result.button.accept ? build() : undefined));
            });
        }
        return updateTreePath;
    },
    autoStart: true
};
/**
 * Plugin to build the context menu from the settings.
 */
const contextMenuPlugin = {
    id: '@jupyterlab/application-extension:context-menu',
    autoStart: true,
    requires: [_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4__.ISettingRegistry, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__.ITranslator],
    activate: (app, settingRegistry, translator) => {
        const trans = translator.load('jupyterlab');
        function createMenu(options) {
            const menu = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7__.RankedMenu(Object.assign(Object.assign({}, options), { commands: app.commands }));
            if (options.label) {
                menu.title.label = trans.__(options.label);
            }
            return menu;
        }
        // Load the context menu lately so plugins are loaded.
        app.started
            .then(() => {
            return Private.loadSettingsContextMenu(app.contextMenu, settingRegistry, createMenu, translator);
        })
            .catch(reason => {
            console.error('Failed to load context menu items from settings registry.', reason);
        });
    }
};
/**
 * Check if the application is dirty before closing the browser tab.
 */
const dirty = {
    id: '@jupyterlab/application-extension:dirty',
    autoStart: true,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__.ITranslator],
    activate: (app, translator) => {
        if (!(app instanceof _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterLab)) {
            throw new Error(`${dirty.id} must be activated in JupyterLab.`);
        }
        const trans = translator.load('jupyterlab');
        const message = trans.__('Are you sure you want to exit JupyterLab?\n\nAny unsaved changes will be lost.');
        // The spec for the `beforeunload` event is implemented differently by
        // the different browser vendors. Consequently, the `event.returnValue`
        // attribute needs to set in addition to a return value being returned.
        // For more information, see:
        // https://developer.mozilla.org/en/docs/Web/Events/beforeunload
        window.addEventListener('beforeunload', event => {
            if (app.status.isDirty) {
                return (event.returnValue = message);
            }
        });
    }
};
/**
 * The default layout restorer provider.
 */
const layout = {
    id: '@jupyterlab/application-extension:layout',
    requires: [_jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_5__.IStateDB, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell, _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4__.ISettingRegistry, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__.ITranslator],
    activate: (app, state, labShell, settingRegistry, translator) => {
        const first = app.started;
        const registry = app.commands;
        const restorer = new _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.LayoutRestorer({ connector: state, first, registry });
        void restorer.fetch().then(saved => {
            labShell.restoreLayout(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getOption('mode'), saved);
            labShell.layoutModified.connect(() => {
                void restorer.save(labShell.saveLayout());
            });
            Private.activateSidebarSwitcher(app, labShell, settingRegistry, translator, saved);
        });
        return restorer;
    },
    autoStart: true,
    provides: _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer
};
/**
 * The default URL router provider.
 */
const router = {
    id: '@jupyterlab/application-extension:router',
    requires: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterFrontEnd.IPaths],
    activate: (app, paths) => {
        const { commands } = app;
        const base = paths.urls.base;
        const router = new _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.Router({ base, commands });
        void app.started.then(() => {
            // Route the very first request on load.
            void router.route();
            // Route all pop state events.
            window.addEventListener('popstate', () => {
                void router.route();
            });
        });
        return router;
    },
    autoStart: true,
    provides: _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.IRouter
};
/**
 * The default tree route resolver plugin.
 */
const tree = {
    id: '@jupyterlab/application-extension:tree-resolver',
    autoStart: true,
    requires: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.IRouter],
    provides: _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterFrontEnd.ITreeResolver,
    activate: (app, router) => {
        const { commands } = app;
        const set = new _lumino_disposable__WEBPACK_IMPORTED_MODULE_10__.DisposableSet();
        const delegate = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__.PromiseDelegate();
        const treePattern = new RegExp('/(lab|doc)(/workspaces/[a-zA-Z0-9-_]+)?(/tree/.*)?');
        set.add(commands.addCommand(CommandIDs.tree, {
            execute: async (args) => {
                var _a;
                if (set.isDisposed) {
                    return;
                }
                const query = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.queryStringToObject((_a = args.search) !== null && _a !== void 0 ? _a : '');
                const browser = query['file-browser-path'] || '';
                // Remove the file browser path from the query string.
                delete query['file-browser-path'];
                // Clean up artifacts immediately upon routing.
                set.dispose();
                delegate.resolve({ browser, file: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getOption('treePath') });
            }
        }));
        set.add(router.register({ command: CommandIDs.tree, pattern: treePattern }));
        // If a route is handled by the router without the tree command being
        // invoked, resolve to `null` and clean up artifacts.
        const listener = () => {
            if (set.isDisposed) {
                return;
            }
            set.dispose();
            delegate.resolve(null);
        };
        router.routed.connect(listener);
        set.add(new _lumino_disposable__WEBPACK_IMPORTED_MODULE_10__.DisposableDelegate(() => {
            router.routed.disconnect(listener);
        }));
        return { paths: delegate.promise };
    }
};
/**
 * The default URL not found extension.
 */
const notfound = {
    id: '@jupyterlab/application-extension:notfound',
    requires: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterFrontEnd.IPaths, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.IRouter, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__.ITranslator],
    activate: (_, paths, router, translator) => {
        const trans = translator.load('jupyterlab');
        const bad = paths.urls.notFound;
        if (!bad) {
            return;
        }
        const base = router.base;
        const message = trans.__('The path: %1 was not found. JupyterLab redirected to: %2', bad, base);
        // Change the URL back to the base application URL.
        router.navigate('');
        void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showErrorMessage)(trans.__('Path Not Found'), { message });
    },
    autoStart: true
};
/**
 * Change the favicon changing based on the busy status;
 */
const busy = {
    id: '@jupyterlab/application-extension:faviconbusy',
    requires: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabStatus],
    activate: async (_, status) => {
        status.busySignal.connect((_, isBusy) => {
            const favicon = document.querySelector(`link[rel="icon"]${isBusy ? '.idle.favicon' : '.busy.favicon'}`);
            if (!favicon) {
                return;
            }
            const newFavicon = document.querySelector(`link${isBusy ? '.busy.favicon' : '.idle.favicon'}`);
            if (!newFavicon) {
                return;
            }
            // If we have the two icons with the special classes, then toggle them.
            if (favicon !== newFavicon) {
                favicon.rel = '';
                newFavicon.rel = 'icon';
                // Firefox doesn't seem to recognize just changing rel, so we also
                // reinsert the link into the DOM.
                newFavicon.parentNode.replaceChild(newFavicon, newFavicon);
            }
        });
    },
    autoStart: true
};
/**
 * The default JupyterLab application shell.
 */
const shell = {
    id: '@jupyterlab/application-extension:shell',
    optional: [_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4__.ISettingRegistry],
    activate: (app, settingRegistry) => {
        if (!(app.shell instanceof _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.LabShell)) {
            throw new Error(`${shell.id} did not find a LabShell instance.`);
        }
        if (settingRegistry) {
            settingRegistry
                .load(shell.id)
                .then(settings => {
                app.shell.updateConfig(settings.composite);
                settings.changed.connect(() => {
                    app.shell.updateConfig(settings.composite);
                });
            })
                .catch(error => {
                console.error('Failed to load shell settings.', error);
            });
        }
        return app.shell;
    },
    autoStart: true,
    provides: _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell
};
/**
 * The default JupyterLab application status provider.
 */
const status = {
    id: '@jupyterlab/application-extension:status',
    activate: (app) => {
        if (!(app instanceof _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterLab)) {
            throw new Error(`${status.id} must be activated in JupyterLab.`);
        }
        return app.status;
    },
    autoStart: true,
    provides: _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabStatus
};
/**
 * The default JupyterLab application-specific information provider.
 *
 * #### Notes
 * This plugin should only be used by plugins that specifically need to access
 * JupyterLab application information, e.g., listing extensions that have been
 * loaded or deferred within JupyterLab.
 */
const info = {
    id: '@jupyterlab/application-extension:info',
    activate: (app) => {
        if (!(app instanceof _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterLab)) {
            throw new Error(`${info.id} must be activated in JupyterLab.`);
        }
        return app.info;
    },
    autoStart: true,
    provides: _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterLab.IInfo
};
/**
 * The default JupyterLab paths dictionary provider.
 */
const paths = {
    id: '@jupyterlab/apputils-extension:paths',
    activate: (app) => {
        if (!(app instanceof _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterLab)) {
            throw new Error(`${paths.id} must be activated in JupyterLab.`);
        }
        return app.paths;
    },
    autoStart: true,
    provides: _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterFrontEnd.IPaths
};
/**
 * The default property inspector provider.
 */
const propertyInspector = {
    id: '@jupyterlab/application-extension:property-inspector',
    autoStart: true,
    requires: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__.ITranslator],
    optional: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer],
    provides: _jupyterlab_property_inspector__WEBPACK_IMPORTED_MODULE_3__.IPropertyInspectorProvider,
    activate: (app, labshell, translator, restorer) => {
        const trans = translator.load('jupyterlab');
        const widget = new _jupyterlab_property_inspector__WEBPACK_IMPORTED_MODULE_3__.SideBarPropertyInspectorProvider(labshell, undefined, translator);
        widget.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7__.buildIcon;
        widget.title.caption = trans.__('Property Inspector');
        widget.id = 'jp-property-inspector';
        labshell.add(widget, 'right', { rank: 100 });
        if (restorer) {
            restorer.add(widget, 'jp-property-inspector');
        }
        return widget;
    }
};
const JupyterLogo = {
    id: '@jupyterlab/application-extension:logo',
    autoStart: true,
    requires: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell],
    activate: (app, shell) => {
        const logo = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_11__.Widget();
        _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7__.jupyterIcon.element({
            container: logo.node,
            elementPosition: 'center',
            margin: '2px 2px 2px 8px',
            height: 'auto',
            width: '16px'
        });
        logo.id = 'jp-MainLogo';
        shell.add(logo, 'top', { rank: 0 });
    }
};
/**
 * Export the plugins as default.
 */
const plugins = [
    contextMenuPlugin,
    dirty,
    main,
    mainCommands,
    layout,
    router,
    tree,
    notfound,
    busy,
    shell,
    status,
    info,
    paths,
    propertyInspector,
    JupyterLogo
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);
var Private;
(function (Private) {
    async function displayInformation(trans) {
        const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
            title: trans.__('Information'),
            body: trans.__('Context menu customization has changed. You will need to reload JupyterLab to see the changes.'),
            buttons: [
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton(),
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: trans.__('Reload') })
            ]
        });
        if (result.button.accept) {
            location.reload();
        }
    }
    async function loadSettingsContextMenu(contextMenu, registry, menuFactory, translator) {
        var _a;
        const trans = translator.load('jupyterlab');
        const pluginId = contextMenuPlugin.id;
        let canonical;
        let loaded = {};
        /**
         * Populate the plugin's schema defaults.
         *
         * We keep track of disabled entries in case the plugin is loaded
         * after the menu initialization.
         */
        function populate(schema) {
            var _a, _b;
            loaded = {};
            const pluginDefaults = Object.keys(registry.plugins)
                .map(plugin => {
                var _a, _b;
                const items = (_b = (_a = registry.plugins[plugin].schema['jupyter.lab.menus']) === null || _a === void 0 ? void 0 : _a.context) !== null && _b !== void 0 ? _b : [];
                loaded[plugin] = items;
                return items;
            })
                .concat([(_b = (_a = schema['jupyter.lab.menus']) === null || _a === void 0 ? void 0 : _a.context) !== null && _b !== void 0 ? _b : []])
                .reduceRight((acc, val) => _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4__.SettingRegistry.reconcileItems(acc, val, true), []);
            // Apply default value as last step to take into account overrides.json
            // The standard default being [] as the plugin must use `jupyter.lab.menus.context`
            // to define their default value.
            schema.properties.contextMenu.default = _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4__.SettingRegistry.reconcileItems(pluginDefaults, schema.properties.contextMenu.default, true)
                // flatten one level
                .sort((a, b) => { var _a, _b; return ((_a = a.rank) !== null && _a !== void 0 ? _a : Infinity) - ((_b = b.rank) !== null && _b !== void 0 ? _b : Infinity); });
        }
        // Transform the plugin object to return different schema than the default.
        registry.transform(pluginId, {
            compose: plugin => {
                var _a, _b, _c, _d;
                // Only override the canonical schema the first time.
                if (!canonical) {
                    canonical = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__.JSONExt.deepCopy(plugin.schema);
                    populate(canonical);
                }
                const defaults = (_c = (_b = (_a = canonical.properties) === null || _a === void 0 ? void 0 : _a.contextMenu) === null || _b === void 0 ? void 0 : _b.default) !== null && _c !== void 0 ? _c : [];
                const user = Object.assign(Object.assign({}, plugin.data.user), { contextMenu: (_d = plugin.data.user.contextMenu) !== null && _d !== void 0 ? _d : [] });
                const composite = Object.assign(Object.assign({}, plugin.data.composite), { contextMenu: _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4__.SettingRegistry.reconcileItems(defaults, user.contextMenu, false) });
                plugin.data = { composite, user };
                return plugin;
            },
            fetch: plugin => {
                // Only override the canonical schema the first time.
                if (!canonical) {
                    canonical = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__.JSONExt.deepCopy(plugin.schema);
                    populate(canonical);
                }
                return {
                    data: plugin.data,
                    id: plugin.id,
                    raw: plugin.raw,
                    schema: canonical,
                    version: plugin.version
                };
            }
        });
        // Repopulate the canonical variable after the setting registry has
        // preloaded all initial plugins.
        canonical = null;
        const settings = await registry.load(pluginId);
        const contextItems = (_a = settings.composite.contextMenu) !== null && _a !== void 0 ? _a : [];
        // Create menu item for non-disabled element
        _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4__.SettingRegistry.filterDisabledItems(contextItems).forEach(item => {
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MenuFactory.addContextItem(Object.assign({ 
                // We have to set the default rank because Lumino is sorting the visible items
                rank: DEFAULT_CONTEXT_ITEM_RANK }, item), contextMenu, menuFactory);
        });
        settings.changed.connect(() => {
            var _a;
            // As extension may change the context menu through API,
            // prompt the user to reload if the menu has been updated.
            const newItems = (_a = settings.composite.contextMenu) !== null && _a !== void 0 ? _a : [];
            if (!_lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__.JSONExt.deepEqual(contextItems, newItems)) {
                void displayInformation(trans);
            }
        });
        registry.pluginChanged.connect(async (sender, plugin) => {
            var _a, _b, _c, _d;
            if (plugin !== pluginId) {
                // If the plugin changed its menu.
                const oldItems = (_a = loaded[plugin]) !== null && _a !== void 0 ? _a : [];
                const newItems = (_c = (_b = registry.plugins[plugin].schema['jupyter.lab.menus']) === null || _b === void 0 ? void 0 : _b.context) !== null && _c !== void 0 ? _c : [];
                if (!_lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__.JSONExt.deepEqual(oldItems, newItems)) {
                    if (loaded[plugin]) {
                        // The plugin has changed, request the user to reload the UI
                        await displayInformation(trans);
                    }
                    else {
                        // The plugin was not yet loaded when the menu was built => update the menu
                        loaded[plugin] = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__.JSONExt.deepCopy(newItems);
                        // Merge potential disabled state
                        const toAdd = (_d = _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4__.SettingRegistry.reconcileItems(newItems, contextItems, false, false)) !== null && _d !== void 0 ? _d : [];
                        _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4__.SettingRegistry.filterDisabledItems(toAdd).forEach(item => {
                            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MenuFactory.addContextItem(Object.assign({ 
                                // We have to set the default rank because Lumino is sorting the visible items
                                rank: DEFAULT_CONTEXT_ITEM_RANK }, item), contextMenu, menuFactory);
                        });
                    }
                }
            }
        });
    }
    Private.loadSettingsContextMenu = loadSettingsContextMenu;
    function activateSidebarSwitcher(app, labShell, settingRegistry, translator, initial) {
        const setting = '@jupyterlab/application-extension:sidebar';
        const trans = translator.load('jupyterlab');
        let overrides = {};
        const update = (_, layout) => {
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_8__.each)(labShell.widgets('left'), widget => {
                var _a;
                if (overrides[widget.id] && overrides[widget.id] === 'right') {
                    labShell.add(widget, 'right');
                    if (layout && ((_a = layout.rightArea) === null || _a === void 0 ? void 0 : _a.currentWidget) === widget) {
                        labShell.activateById(widget.id);
                    }
                }
            });
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_8__.each)(labShell.widgets('right'), widget => {
                var _a;
                if (overrides[widget.id] && overrides[widget.id] === 'left') {
                    labShell.add(widget, 'left');
                    if (layout && ((_a = layout.leftArea) === null || _a === void 0 ? void 0 : _a.currentWidget) === widget) {
                        labShell.activateById(widget.id);
                    }
                }
            });
        };
        // Fetch overrides from the settings system.
        void Promise.all([settingRegistry.load(setting), app.restored]).then(([settings]) => {
            overrides = (settings.get('overrides').composite ||
                {});
            settings.changed.connect(settings => {
                overrides = (settings.get('overrides').composite ||
                    {});
                update(labShell);
            });
            labShell.layoutModified.connect(update);
            update(labShell, initial);
        });
        // Add a command to switch a side panels's side
        app.commands.addCommand(CommandIDs.switchSidebar, {
            label: trans.__('Switch Sidebar Side'),
            execute: () => {
                // First, try to find the correct panel based on the application
                // context menu click. Bail if we don't find a sidebar for the widget.
                const contextNode = app.contextMenuHitTest(node => !!node.dataset.id);
                if (!contextNode) {
                    return;
                }
                const id = contextNode.dataset['id'];
                const leftPanel = document.getElementById('jp-left-stack');
                const node = document.getElementById(id);
                let side;
                if (leftPanel && node && leftPanel.contains(node)) {
                    side = 'right';
                }
                else {
                    side = 'left';
                }
                // Move the panel to the other side.
                return settingRegistry.set(setting, 'overrides', Object.assign(Object.assign({}, overrides), { [id]: side }));
            }
        });
    }
    Private.activateSidebarSwitcher = activateSidebarSwitcher;
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwbGljYXRpb24tZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3dPO0FBQzdHO0FBQ2hFO0FBQ21EO0FBQzlCO0FBQ2pDO0FBQ087QUFDeUI7QUFDdkI7QUFDSztBQUNVO0FBQzlCO0FBQ1Y7QUFDL0I7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxnRUFBVztBQUMxQixlQUFlLDhEQUFTLEVBQUUsaUVBQWU7QUFDekM7QUFDQSxlQUFlLGtCQUFrQjtBQUNqQztBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsMkZBQXNDO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDBEQUFPO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHVEQUFJO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixLQUFLO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsdUVBQW9CO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FB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YjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0ZBQStGLGVBQWUsYUFBYTtBQUMzSDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0IsaUMiLCJmaWxlIjoicGFja2FnZXNfYXBwbGljYXRpb24tZXh0ZW5zaW9uX2xpYl9pbmRleF9qcy40MzkxMTg5NzQwMTQ0NTA1MjQwMy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIGFwcGxpY2F0aW9uLWV4dGVuc2lvblxuICovXG5pbXBvcnQgeyBDb25uZWN0aW9uTG9zdCwgSUNvbm5lY3Rpb25Mb3N0LCBJTGFiU2hlbGwsIElMYWJTdGF0dXMsIElMYXlvdXRSZXN0b3JlciwgSVJvdXRlciwgSVRyZWVQYXRoVXBkYXRlciwgSnVweXRlckZyb250RW5kLCBKdXB5dGVyRnJvbnRFbmRDb250ZXh0TWVudSwgSnVweXRlckxhYiwgTGFiU2hlbGwsIExheW91dFJlc3RvcmVyLCBSb3V0ZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBEaWFsb2csIElDb21tYW5kUGFsZXR0ZSwgSVdpbmRvd1Jlc29sdmVyLCBNZW51RmFjdG9yeSwgc2hvd0RpYWxvZywgc2hvd0Vycm9yTWVzc2FnZSB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IFBhZ2VDb25maWcsIFVSTEV4dCB9IGZyb20gJ0BqdXB5dGVybGFiL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBJUHJvcGVydHlJbnNwZWN0b3JQcm92aWRlciwgU2lkZUJhclByb3BlcnR5SW5zcGVjdG9yUHJvdmlkZXIgfSBmcm9tICdAanVweXRlcmxhYi9wcm9wZXJ0eS1pbnNwZWN0b3InO1xuaW1wb3J0IHsgSVNldHRpbmdSZWdpc3RyeSwgU2V0dGluZ1JlZ2lzdHJ5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvc2V0dGluZ3JlZ2lzdHJ5JztcbmltcG9ydCB7IElTdGF0ZURCIH0gZnJvbSAnQGp1cHl0ZXJsYWIvc3RhdGVkYic7XG5pbXBvcnQgeyBJVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGJ1aWxkSWNvbiwganVweXRlckljb24sIFJhbmtlZE1lbnUgfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IGVhY2gsIGl0ZXIsIHRvQXJyYXkgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG5pbXBvcnQgeyBKU09ORXh0LCBQcm9taXNlRGVsZWdhdGUgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBEaXNwb3NhYmxlRGVsZWdhdGUsIERpc3Bvc2FibGVTZXQgfSBmcm9tICdAbHVtaW5vL2Rpc3Bvc2FibGUnO1xuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSAnQGx1bWluby93aWRnZXRzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8qKlxuICogRGVmYXVsdCBjb250ZXh0IG1lbnUgaXRlbSByYW5rXG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTlRFWFRfSVRFTV9SQU5LID0gMTAwO1xuLyoqXG4gKiBUaGUgY29tbWFuZCBJRHMgdXNlZCBieSB0aGUgYXBwbGljYXRpb24gcGx1Z2luLlxuICovXG52YXIgQ29tbWFuZElEcztcbihmdW5jdGlvbiAoQ29tbWFuZElEcykge1xuICAgIENvbW1hbmRJRHMuYWN0aXZhdGVOZXh0VGFiID0gJ2FwcGxpY2F0aW9uOmFjdGl2YXRlLW5leHQtdGFiJztcbiAgICBDb21tYW5kSURzLmFjdGl2YXRlUHJldmlvdXNUYWIgPSAnYXBwbGljYXRpb246YWN0aXZhdGUtcHJldmlvdXMtdGFiJztcbiAgICBDb21tYW5kSURzLmFjdGl2YXRlTmV4dFRhYkJhciA9ICdhcHBsaWNhdGlvbjphY3RpdmF0ZS1uZXh0LXRhYi1iYXInO1xuICAgIENvbW1hbmRJRHMuYWN0aXZhdGVQcmV2aW91c1RhYkJhciA9ICdhcHBsaWNhdGlvbjphY3RpdmF0ZS1wcmV2aW91cy10YWItYmFyJztcbiAgICBDb21tYW5kSURzLmNsb3NlID0gJ2FwcGxpY2F0aW9uOmNsb3NlJztcbiAgICBDb21tYW5kSURzLmNsb3NlT3RoZXJUYWJzID0gJ2FwcGxpY2F0aW9uOmNsb3NlLW90aGVyLXRhYnMnO1xuICAgIENvbW1hbmRJRHMuY2xvc2VSaWdodFRhYnMgPSAnYXBwbGljYXRpb246Y2xvc2UtcmlnaHQtdGFicyc7XG4gICAgQ29tbWFuZElEcy5jbG9zZUFsbCA9ICdhcHBsaWNhdGlvbjpjbG9zZS1hbGwnO1xuICAgIENvbW1hbmRJRHMuc2V0TW9kZSA9ICdhcHBsaWNhdGlvbjpzZXQtbW9kZSc7XG4gICAgQ29tbWFuZElEcy50b2dnbGVNb2RlID0gJ2FwcGxpY2F0aW9uOnRvZ2dsZS1tb2RlJztcbiAgICBDb21tYW5kSURzLnRvZ2dsZUxlZnRBcmVhID0gJ2FwcGxpY2F0aW9uOnRvZ2dsZS1sZWZ0LWFyZWEnO1xuICAgIENvbW1hbmRJRHMudG9nZ2xlUmlnaHRBcmVhID0gJ2FwcGxpY2F0aW9uOnRvZ2dsZS1yaWdodC1hcmVhJztcbiAgICBDb21tYW5kSURzLnRvZ2dsZVByZXNlbnRhdGlvbk1vZGUgPSAnYXBwbGljYXRpb246dG9nZ2xlLXByZXNlbnRhdGlvbi1tb2RlJztcbiAgICBDb21tYW5kSURzLnRyZWUgPSAncm91dGVyOnRyZWUnO1xuICAgIENvbW1hbmRJRHMuc3dpdGNoU2lkZWJhciA9ICdzaWRlYmFyOnN3aXRjaCc7XG59KShDb21tYW5kSURzIHx8IChDb21tYW5kSURzID0ge30pKTtcbi8qKlxuICogQSBwbHVnaW4gdG8gcmVnaXN0ZXIgdGhlIGNvbW1hbmRzIGZvciB0aGUgbWFpbiBhcHBsaWNhdGlvbi5cbiAqL1xuY29uc3QgbWFpbkNvbW1hbmRzID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tZXh0ZW5zaW9uOmNvbW1hbmRzJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtJTGFiU2hlbGwsIElDb21tYW5kUGFsZXR0ZV0sXG4gICAgYWN0aXZhdGU6IChhcHAsIHRyYW5zbGF0b3IsIGxhYlNoZWxsLCBwYWxldHRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMsIHNoZWxsIH0gPSBhcHA7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gdHJhbnMuX18oJ01haW4gQXJlYScpO1xuICAgICAgICAvLyBBZGQgQ29tbWFuZCB0byBvdmVycmlkZSB0aGUgSkxhYiBjb250ZXh0IG1lbnUuXG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoSnVweXRlckZyb250RW5kQ29udGV4dE1lbnUuY29udGV4dE1lbnUsIHtcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnU2hpZnQrUmlnaHQgQ2xpY2sgZm9yIEJyb3dzZXIgTWVudScpLFxuICAgICAgICAgICAgaXNFbmFibGVkOiAoKSA9PiBmYWxzZSxcbiAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gUmV0dXJucyB0aGUgd2lkZ2V0IGFzc29jaWF0ZWQgd2l0aCB0aGUgbW9zdCByZWNlbnQgY29udGV4dG1lbnUgZXZlbnQuXG4gICAgICAgIGNvbnN0IGNvbnRleHRNZW51V2lkZ2V0ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVzdCA9IChub2RlKSA9PiAhIW5vZGUuZGF0YXNldC5pZDtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBhcHAuY29udGV4dE1lbnVIaXRUZXN0KHRlc3QpO1xuICAgICAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICAgICAgLy8gRmFsbCBiYWNrIHRvIGFjdGl2ZSB3aWRnZXQgaWYgcGF0aCBjYW5ub3QgYmUgb2J0YWluZWQgZnJvbSBldmVudC5cbiAgICAgICAgICAgICAgICByZXR1cm4gc2hlbGwuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0b0FycmF5KHNoZWxsLndpZGdldHMoJ21haW4nKSkuZmlsdGVyKHdpZGdldCA9PiB3aWRnZXQuaWQgPT09IG5vZGUuZGF0YXNldC5pZCk7XG4gICAgICAgICAgICBpZiAobWF0Y2hlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNoZWxsLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hlc1swXTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gQ2xvc2VzIGFuIGFycmF5IG9mIHdpZGdldHMuXG4gICAgICAgIGNvbnN0IGNsb3NlV2lkZ2V0cyA9ICh3aWRnZXRzKSA9PiB7XG4gICAgICAgICAgICB3aWRnZXRzLmZvckVhY2god2lkZ2V0ID0+IHdpZGdldC5jbG9zZSgpKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gRmluZCB0aGUgdGFiIGFyZWEgZm9yIGEgd2lkZ2V0IHdpdGhpbiBhIHNwZWNpZmljIGRvY2sgYXJlYS5cbiAgICAgICAgY29uc3QgZmluZFRhYiA9IChhcmVhLCB3aWRnZXQpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoYXJlYS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3BsaXQtYXJlYSc6IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlcmF0b3IgPSBpdGVyKGFyZWEuY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFiID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYiA9IGZpbmRUYWIodmFsdWUsIHdpZGdldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKCF0YWIgJiYgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlICd0YWItYXJlYSc6IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBpZCB9ID0gd2lkZ2V0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJlYS53aWRnZXRzLnNvbWUod2lkZ2V0ID0+IHdpZGdldC5pZCA9PT0gaWQpID8gYXJlYSA6IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyBGaW5kIHRoZSB0YWIgYXJlYSBmb3IgYSB3aWRnZXQgd2l0aGluIHRoZSBtYWluIGRvY2sgYXJlYS5cbiAgICAgICAgY29uc3QgdGFiQXJlYUZvciA9ICh3aWRnZXQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IGxheW91dCA9IGxhYlNoZWxsID09PSBudWxsIHx8IGxhYlNoZWxsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsYWJTaGVsbC5zYXZlTGF5b3V0KCk7XG4gICAgICAgICAgICBjb25zdCBtYWluQXJlYSA9IGxheW91dCA9PT0gbnVsbCB8fCBsYXlvdXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxheW91dC5tYWluQXJlYTtcbiAgICAgICAgICAgIGlmICghbWFpbkFyZWEgfHwgUGFnZUNvbmZpZy5nZXRPcHRpb24oJ21vZGUnKSAhPT0gJ211bHRpcGxlLWRvY3VtZW50Jykge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYXJlYSA9IChfYSA9IG1haW5BcmVhLmRvY2spID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYWluO1xuICAgICAgICAgICAgaWYgKCFhcmVhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmluZFRhYihhcmVhLCB3aWRnZXQpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBSZXR1cm5zIGFuIGFycmF5IG9mIGFsbCB3aWRnZXRzIHRvIHRoZSByaWdodCBvZiBhIHdpZGdldCBpbiBhIHRhYiBhcmVhLlxuICAgICAgICBjb25zdCB3aWRnZXRzUmlnaHRPZiA9ICh3aWRnZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaWQgfSA9IHdpZGdldDtcbiAgICAgICAgICAgIGNvbnN0IHRhYkFyZWEgPSB0YWJBcmVhRm9yKHdpZGdldCk7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXRzID0gdGFiQXJlYSA/IHRhYkFyZWEud2lkZ2V0cyB8fCBbXSA6IFtdO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB3aWRnZXRzLmZpbmRJbmRleCh3aWRnZXQgPT4gd2lkZ2V0LmlkID09PSBpZCk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHdpZGdldHMuc2xpY2UoaW5kZXggKyAxKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmNsb3NlLCB7XG4gICAgICAgICAgICBsYWJlbDogKCkgPT4gdHJhbnMuX18oJ0Nsb3NlIFRhYicpLFxuICAgICAgICAgICAgaXNFbmFibGVkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gY29udGV4dE1lbnVXaWRnZXQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gISF3aWRnZXQgJiYgd2lkZ2V0LnRpdGxlLmNsb3NhYmxlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSBjb250ZXh0TWVudVdpZGdldCgpO1xuICAgICAgICAgICAgICAgIGlmICh3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmNsb3NlT3RoZXJUYWJzLCB7XG4gICAgICAgICAgICBsYWJlbDogKCkgPT4gdHJhbnMuX18oJ0Nsb3NlIEFsbCBPdGhlciBUYWJzJyksXG4gICAgICAgICAgICBpc0VuYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBFbnN1cmUgdGhlcmUgYXJlIGF0IGxlYXN0IHR3byB3aWRnZXRzLlxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZXJhdG9yID0gc2hlbGwud2lkZ2V0cygnbWFpbicpO1xuICAgICAgICAgICAgICAgIHJldHVybiAhIWl0ZXJhdG9yLm5leHQoKSAmJiAhIWl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gY29udGV4dE1lbnVXaWRnZXQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHsgaWQgfSA9IHdpZGdldDtcbiAgICAgICAgICAgICAgICBjb25zdCBvdGhlcldpZGdldHMgPSB0b0FycmF5KHNoZWxsLndpZGdldHMoJ21haW4nKSkuZmlsdGVyKHdpZGdldCA9PiB3aWRnZXQuaWQgIT09IGlkKTtcbiAgICAgICAgICAgICAgICBjbG9zZVdpZGdldHMob3RoZXJXaWRnZXRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jbG9zZVJpZ2h0VGFicywge1xuICAgICAgICAgICAgbGFiZWw6ICgpID0+IHRyYW5zLl9fKCdDbG9zZSBUYWJzIHRvIFJpZ2h0JyksXG4gICAgICAgICAgICBpc0VuYWJsZWQ6ICgpID0+ICEhY29udGV4dE1lbnVXaWRnZXQoKSAmJlxuICAgICAgICAgICAgICAgIHdpZGdldHNSaWdodE9mKGNvbnRleHRNZW51V2lkZ2V0KCkpLmxlbmd0aCA+IDAsXG4gICAgICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gY29udGV4dE1lbnVXaWRnZXQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsb3NlV2lkZ2V0cyh3aWRnZXRzUmlnaHRPZih3aWRnZXQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChsYWJTaGVsbCkge1xuICAgICAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmFjdGl2YXRlTmV4dFRhYiwge1xuICAgICAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnQWN0aXZhdGUgTmV4dCBUYWInKSxcbiAgICAgICAgICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxhYlNoZWxsLmFjdGl2YXRlTmV4dFRhYigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmFjdGl2YXRlUHJldmlvdXNUYWIsIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0FjdGl2YXRlIFByZXZpb3VzIFRhYicpLFxuICAgICAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiU2hlbGwuYWN0aXZhdGVQcmV2aW91c1RhYigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmFjdGl2YXRlTmV4dFRhYkJhciwge1xuICAgICAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnQWN0aXZhdGUgTmV4dCBUYWIgQmFyJyksXG4gICAgICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsYWJTaGVsbC5hY3RpdmF0ZU5leHRUYWJCYXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5hY3RpdmF0ZVByZXZpb3VzVGFiQmFyLCB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdBY3RpdmF0ZSBQcmV2aW91cyBUYWIgQmFyJyksXG4gICAgICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsYWJTaGVsbC5hY3RpdmF0ZVByZXZpb3VzVGFiQmFyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuY2xvc2VBbGwsIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0Nsb3NlIEFsbCBUYWJzJyksXG4gICAgICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsYWJTaGVsbC5jbG9zZUFsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnRvZ2dsZUxlZnRBcmVhLCB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICgpID0+IHRyYW5zLl9fKCdTaG93IExlZnQgU2lkZWJhcicpLFxuICAgICAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhYlNoZWxsLmxlZnRDb2xsYXBzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYlNoZWxsLmV4cGFuZExlZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYlNoZWxsLmNvbGxhcHNlTGVmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYlNoZWxsLmN1cnJlbnRXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJTaGVsbC5hY3RpdmF0ZUJ5SWQobGFiU2hlbGwuY3VycmVudFdpZGdldC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlzVG9nZ2xlZDogKCkgPT4gIWxhYlNoZWxsLmxlZnRDb2xsYXBzZWQsXG4gICAgICAgICAgICAgICAgaXNWaXNpYmxlOiAoKSA9PiAhbGFiU2hlbGwuaXNFbXB0eSgnbGVmdCcpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy50b2dnbGVSaWdodEFyZWEsIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogKCkgPT4gdHJhbnMuX18oJ1Nob3cgUmlnaHQgU2lkZWJhcicpLFxuICAgICAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhYlNoZWxsLnJpZ2h0Q29sbGFwc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJTaGVsbC5leHBhbmRSaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiU2hlbGwuY29sbGFwc2VSaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYlNoZWxsLmN1cnJlbnRXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJTaGVsbC5hY3RpdmF0ZUJ5SWQobGFiU2hlbGwuY3VycmVudFdpZGdldC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlzVG9nZ2xlZDogKCkgPT4gIWxhYlNoZWxsLnJpZ2h0Q29sbGFwc2VkLFxuICAgICAgICAgICAgICAgIGlzVmlzaWJsZTogKCkgPT4gIWxhYlNoZWxsLmlzRW1wdHkoJ3JpZ2h0JylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnRvZ2dsZVByZXNlbnRhdGlvbk1vZGUsIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogKCkgPT4gdHJhbnMuX18oJ1ByZXNlbnRhdGlvbiBNb2RlJyksXG4gICAgICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsYWJTaGVsbC5wcmVzZW50YXRpb25Nb2RlID0gIWxhYlNoZWxsLnByZXNlbnRhdGlvbk1vZGU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpc1RvZ2dsZWQ6ICgpID0+IGxhYlNoZWxsLnByZXNlbnRhdGlvbk1vZGUsXG4gICAgICAgICAgICAgICAgaXNWaXNpYmxlOiAoKSA9PiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5zZXRNb2RlLCB7XG4gICAgICAgICAgICAgICAgaXNWaXNpYmxlOiBhcmdzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZSA9IGFyZ3NbJ21vZGUnXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vZGUgPT09ICdzaW5nbGUtZG9jdW1lbnQnIHx8IG1vZGUgPT09ICdtdWx0aXBsZS1kb2N1bWVudCc7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZSA9IGFyZ3NbJ21vZGUnXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGUgPT09ICdzaW5nbGUtZG9jdW1lbnQnIHx8IG1vZGUgPT09ICdtdWx0aXBsZS1kb2N1bWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYlNoZWxsLm1vZGUgPSBtb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgYXBwbGljYXRpb24gc2hlbGwgbW9kZTogJHttb2RlfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnRvZ2dsZU1vZGUsIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1NpbXBsZSBJbnRlcmZhY2UnKSxcbiAgICAgICAgICAgICAgICBpc1RvZ2dsZWQ6ICgpID0+IGxhYlNoZWxsLm1vZGUgPT09ICdzaW5nbGUtZG9jdW1lbnQnLFxuICAgICAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJncyA9IGxhYlNoZWxsLm1vZGUgPT09ICdtdWx0aXBsZS1kb2N1bWVudCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8geyBtb2RlOiAnc2luZ2xlLWRvY3VtZW50JyB9XG4gICAgICAgICAgICAgICAgICAgICAgICA6IHsgbW9kZTogJ211bHRpcGxlLWRvY3VtZW50JyB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZHMuZXhlY3V0ZShDb21tYW5kSURzLnNldE1vZGUsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYWxldHRlKSB7XG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgQ29tbWFuZElEcy5hY3RpdmF0ZU5leHRUYWIsXG4gICAgICAgICAgICAgICAgQ29tbWFuZElEcy5hY3RpdmF0ZVByZXZpb3VzVGFiLFxuICAgICAgICAgICAgICAgIENvbW1hbmRJRHMuYWN0aXZhdGVOZXh0VGFiQmFyLFxuICAgICAgICAgICAgICAgIENvbW1hbmRJRHMuYWN0aXZhdGVQcmV2aW91c1RhYkJhcixcbiAgICAgICAgICAgICAgICBDb21tYW5kSURzLmNsb3NlLFxuICAgICAgICAgICAgICAgIENvbW1hbmRJRHMuY2xvc2VBbGwsXG4gICAgICAgICAgICAgICAgQ29tbWFuZElEcy5jbG9zZU90aGVyVGFicyxcbiAgICAgICAgICAgICAgICBDb21tYW5kSURzLmNsb3NlUmlnaHRUYWJzLFxuICAgICAgICAgICAgICAgIENvbW1hbmRJRHMudG9nZ2xlTGVmdEFyZWEsXG4gICAgICAgICAgICAgICAgQ29tbWFuZElEcy50b2dnbGVSaWdodEFyZWEsXG4gICAgICAgICAgICAgICAgQ29tbWFuZElEcy50b2dnbGVQcmVzZW50YXRpb25Nb2RlLFxuICAgICAgICAgICAgICAgIENvbW1hbmRJRHMudG9nZ2xlTW9kZVxuICAgICAgICAgICAgXS5mb3JFYWNoKGNvbW1hbmQgPT4gcGFsZXR0ZS5hZGRJdGVtKHsgY29tbWFuZCwgY2F0ZWdvcnkgfSkpO1xuICAgICAgICB9XG4gICAgfVxufTtcbi8qKlxuICogVGhlIG1haW4gZXh0ZW5zaW9uLlxuICovXG5jb25zdCBtYWluID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tZXh0ZW5zaW9uOm1haW4nLFxuICAgIHJlcXVpcmVzOiBbXG4gICAgICAgIElSb3V0ZXIsXG4gICAgICAgIElXaW5kb3dSZXNvbHZlcixcbiAgICAgICAgSVRyYW5zbGF0b3IsXG4gICAgICAgIEp1cHl0ZXJGcm9udEVuZC5JVHJlZVJlc29sdmVyXG4gICAgXSxcbiAgICBvcHRpb25hbDogW0lDb25uZWN0aW9uTG9zdF0sXG4gICAgcHJvdmlkZXM6IElUcmVlUGF0aFVwZGF0ZXIsXG4gICAgYWN0aXZhdGU6IChhcHAsIHJvdXRlciwgcmVzb2x2ZXIsIHRyYW5zbGF0b3IsIHRyZWVSZXNvbHZlciwgY29ubmVjdGlvbkxvc3QpID0+IHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgaWYgKCEoYXBwIGluc3RhbmNlb2YgSnVweXRlckxhYikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHttYWluLmlkfSBtdXN0IGJlIGFjdGl2YXRlZCBpbiBKdXB5dGVyTGFiLmApO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZXNlIHR3byBpbnRlcm5hbCBzdGF0ZSB2YXJpYWJsZXMgYXJlIHVzZWQgdG8gbWFuYWdlIHRoZSB0d28gc291cmNlXG4gICAgICAgIC8vIG9mIHRoZSB0cmVlIHBhcnQgb2YgdGhlIFVSTCBiZWluZyB1cGRhdGVkOiAxKSBwYXRoIG9mIHRoZSBhY3RpdmUgZG9jdW1lbnQsXG4gICAgICAgIC8vIDIpIHBhdGggb2YgdGhlIGRlZmF1bHQgYnJvd3NlciBpZiB0aGUgYWN0aXZlIG1haW4gYXJlYSB3aWRnZXQgaXNuJ3QgYSBkb2N1bWVudC5cbiAgICAgICAgbGV0IF9kb2NUcmVlUGF0aCA9ICcnO1xuICAgICAgICBsZXQgX2RlZmF1bHRCcm93c2VyVHJlZVBhdGggPSAnJztcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlVHJlZVBhdGgodHJlZVBhdGgpIHtcbiAgICAgICAgICAgIC8vIFdhaXQgZm9yIHRyZWUgcmVzb2x2ZXIgdG8gZmluaXNoIGJlZm9yZSB1cGRhdGluZyB0aGUgcGF0aCBiZWNhdXNlIGl0IHVzZSB0aGUgUGFnZUNvbmZpZ1sndHJlZVBhdGgnXVxuICAgICAgICAgICAgdm9pZCB0cmVlUmVzb2x2ZXIucGF0aHMudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgX2RlZmF1bHRCcm93c2VyVHJlZVBhdGggPSB0cmVlUGF0aDtcbiAgICAgICAgICAgICAgICBpZiAoIV9kb2NUcmVlUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBQYWdlQ29uZmlnLmdldFVybCh7IHRyZWVQYXRoIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXRoID0gVVJMRXh0LnBhcnNlKHVybCkucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgVVJMRXh0LnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmKS5zZWFyY2g7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlci5uYXZpZ2F0ZShwYXRoLCB7IHNraXBSb3V0aW5nOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyBQZXJzaXN0IHRoZSBuZXcgdHJlZSBwYXRoIHRvIFBhZ2VDb25maWcgYXMgaXQgaXMgdXNlZCBlbHNld2hlcmUgYXQgcnVudGltZS5cbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbmZpZy5zZXRPcHRpb24oJ3RyZWVQYXRoJywgdHJlZVBhdGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlcXVpcmluZyB0aGUgd2luZG93IHJlc29sdmVyIGd1YXJhbnRlZXMgdGhhdCB0aGUgYXBwbGljYXRpb24gZXh0ZW5zaW9uXG4gICAgICAgIC8vIG9ubHkgbG9hZHMgaWYgdGhlcmUgaXMgYSB2aWFibGUgd2luZG93IG5hbWUuIE90aGVyd2lzZSwgdGhlIGFwcGxpY2F0aW9uXG4gICAgICAgIC8vIHdpbGwgc2hvcnQtY2lyY3VpdCBhbmQgYXNrIHRoZSB1c2VyIHRvIG5hdmlnYXRlIGF3YXkuXG4gICAgICAgIGNvbnN0IHdvcmtzcGFjZSA9IHJlc29sdmVyLm5hbWU7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoYFN0YXJ0aW5nIGFwcGxpY2F0aW9uIGluIHdvcmtzcGFjZTogXCIke3dvcmtzcGFjZX1cImApO1xuICAgICAgICAvLyBJZiB0aGVyZSB3ZXJlIGVycm9ycyByZWdpc3RlcmluZyBwbHVnaW5zLCB0ZWxsIHRoZSB1c2VyLlxuICAgICAgICBpZiAoYXBwLnJlZ2lzdGVyUGx1Z2luRXJyb3JzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgY29uc3QgYm9keSA9IChSZWFjdC5jcmVhdGVFbGVtZW50KFwicHJlXCIsIG51bGwsIGFwcC5yZWdpc3RlclBsdWdpbkVycm9ycy5tYXAoZSA9PiBlLm1lc3NhZ2UpLmpvaW4oJ1xcbicpKSk7XG4gICAgICAgICAgICB2b2lkIHNob3dFcnJvck1lc3NhZ2UodHJhbnMuX18oJ0Vycm9yIFJlZ2lzdGVyaW5nIFBsdWdpbnMnKSwge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGJvZHlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSBhcHBsaWNhdGlvbiBzaGVsbCBsYXlvdXQgaXMgbW9kaWZpZWQsXG4gICAgICAgIC8vIHRyaWdnZXIgYSByZWZyZXNoIG9mIHRoZSBjb21tYW5kcy5cbiAgICAgICAgYXBwLnNoZWxsLmxheW91dE1vZGlmaWVkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgYXBwLmNvbW1hbmRzLm5vdGlmeUNvbW1hbmRDaGFuZ2VkKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBXYXRjaCB0aGUgbW9kZSBhbmQgdXBkYXRlIHRoZSBwYWdlIFVSTCB0byAvbGFiIG9yIC9kb2MgdG8gcmVmbGVjdCB0aGVcbiAgICAgICAgLy8gY2hhbmdlLlxuICAgICAgICBhcHAuc2hlbGwubW9kZUNoYW5nZWQuY29ubmVjdCgoXywgYXJncykgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gUGFnZUNvbmZpZy5nZXRVcmwoeyBtb2RlOiBhcmdzIH0pO1xuICAgICAgICAgICAgY29uc3QgcGF0aCA9IFVSTEV4dC5wYXJzZSh1cmwpLnBhdGhuYW1lO1xuICAgICAgICAgICAgcm91dGVyLm5hdmlnYXRlKHBhdGgsIHsgc2tpcFJvdXRpbmc6IHRydWUgfSk7XG4gICAgICAgICAgICAvLyBQZXJzaXN0IHRoaXMgbW9kZSBjaGFuZ2UgdG8gUGFnZUNvbmZpZyBhcyBpdCBpcyB1c2VkIGVsc2V3aGVyZSBhdCBydW50aW1lLlxuICAgICAgICAgICAgUGFnZUNvbmZpZy5zZXRPcHRpb24oJ21vZGUnLCBhcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFdhaXQgZm9yIHRyZWUgcmVzb2x2ZXIgdG8gZmluaXNoIGJlZm9yZSB1cGRhdGluZyB0aGUgcGF0aCBiZWNhdXNlIGl0IHVzZSB0aGUgUGFnZUNvbmZpZ1sndHJlZVBhdGgnXVxuICAgICAgICB2b2lkIHRyZWVSZXNvbHZlci5wYXRocy50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIFdhdGNoIHRoZSBwYXRoIG9mIHRoZSBjdXJyZW50IHdpZGdldCBpbiB0aGUgbWFpbiBhcmVhIGFuZCB1cGRhdGUgdGhlIHBhZ2VcbiAgICAgICAgICAgIC8vIFVSTCB0byByZWZsZWN0IHRoZSBjaGFuZ2UuXG4gICAgICAgICAgICBhcHAuc2hlbGwuY3VycmVudFBhdGhDaGFuZ2VkLmNvbm5lY3QoKF8sIGFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXliZVRyZWVQYXRoID0gYXJncy5uZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmVlUGF0aCA9IG1heWJlVHJlZVBhdGggfHwgX2RlZmF1bHRCcm93c2VyVHJlZVBhdGg7XG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gUGFnZUNvbmZpZy5nZXRVcmwoeyB0cmVlUGF0aDogdHJlZVBhdGggfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IFVSTEV4dC5wYXJzZSh1cmwpLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAgICAgVVJMRXh0LnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmKS5zZWFyY2g7XG4gICAgICAgICAgICAgICAgcm91dGVyLm5hdmlnYXRlKHBhdGgsIHsgc2tpcFJvdXRpbmc6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgLy8gUGVyc2lzdCB0aGUgbmV3IHRyZWUgcGF0aCB0byBQYWdlQ29uZmlnIGFzIGl0IGlzIHVzZWQgZWxzZXdoZXJlIGF0IHJ1bnRpbWUuXG4gICAgICAgICAgICAgICAgUGFnZUNvbmZpZy5zZXRPcHRpb24oJ3RyZWVQYXRoJywgdHJlZVBhdGgpO1xuICAgICAgICAgICAgICAgIF9kb2NUcmVlUGF0aCA9IG1heWJlVHJlZVBhdGg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIElmIHRoZSBjb25uZWN0aW9uIHRvIHRoZSBzZXJ2ZXIgaXMgbG9zdCwgaGFuZGxlIGl0IHdpdGggdGhlXG4gICAgICAgIC8vIGNvbm5lY3Rpb24gbG9zdCBoYW5kbGVyLlxuICAgICAgICBjb25uZWN0aW9uTG9zdCA9IGNvbm5lY3Rpb25Mb3N0IHx8IENvbm5lY3Rpb25Mb3N0O1xuICAgICAgICBhcHAuc2VydmljZU1hbmFnZXIuY29ubmVjdGlvbkZhaWx1cmUuY29ubmVjdCgobWFuYWdlciwgZXJyb3IpID0+IGNvbm5lY3Rpb25Mb3N0KG1hbmFnZXIsIGVycm9yLCB0cmFuc2xhdG9yKSk7XG4gICAgICAgIGNvbnN0IGJ1aWxkZXIgPSBhcHAuc2VydmljZU1hbmFnZXIuYnVpbGRlcjtcbiAgICAgICAgY29uc3QgYnVpbGQgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYnVpbGRlclxuICAgICAgICAgICAgICAgIC5idWlsZCgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaG93RGlhbG9nKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdCdWlsZCBDb21wbGV0ZScpLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnMuX18oJ0J1aWxkIHN1Y2Nlc3NmdWxseSBjb21wbGV0ZWQsIHJlbG9hZCBwYWdlPycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJyXCIsIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnMuX18oJ1lvdSB3aWxsIGxvc2UgYW55IHVuc2F2ZWQgY2hhbmdlcy4nKSkpLFxuICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBEaWFsb2cuY2FuY2VsQnV0dG9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1JlbG9hZCBXaXRob3V0IFNhdmluZycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IFsncmVsb2FkJ11cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9nLm9rQnV0dG9uKHsgbGFiZWw6IHRyYW5zLl9fKCdTYXZlIGFuZCBSZWxvYWQnKSB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBoYXNDbG9zZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoeyBidXR0b246IHsgYWNjZXB0LCBhY3Rpb25zIH0gfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhY2NlcHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBhcHAuY29tbWFuZHNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5leGVjdXRlKCdkb2NtYW5hZ2VyOnNhdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVyLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2b2lkIHNob3dFcnJvck1lc3NhZ2UodHJhbnMuX18oJ1NhdmUgRmFpbGVkJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBSZWFjdC5jcmVhdGVFbGVtZW50KFwicHJlXCIsIG51bGwsIGVyci5tZXNzYWdlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhY3Rpb25zLmluY2x1ZGVzKCdyZWxvYWQnKSkge1xuICAgICAgICAgICAgICAgICAgICByb3V0ZXIucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICB2b2lkIHNob3dFcnJvck1lc3NhZ2UodHJhbnMuX18oJ0J1aWxkIEZhaWxlZCcpLCB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwcmVcIiwgbnVsbCwgZXJyLm1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGJ1aWxkZXIuaXNBdmFpbGFibGUgJiYgYnVpbGRlci5zaG91bGRDaGVjaykge1xuICAgICAgICAgICAgdm9pZCBidWlsZGVyLmdldFN0YXR1cygpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09ICdidWlsZGluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJ1aWxkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09ICduZWVkZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgYm9keSA9IChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zLl9fKCdKdXB5dGVyTGFiIGJ1aWxkIGlzIHN1Z2dlc3RlZDonKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJyXCIsIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwicHJlXCIsIG51bGwsIHJlc3BvbnNlLm1lc3NhZ2UpKSk7XG4gICAgICAgICAgICAgICAgdm9pZCBzaG93RGlhbG9nKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdCdWlsZCBSZWNvbW1lbmRlZCcpLFxuICAgICAgICAgICAgICAgICAgICBib2R5LFxuICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBEaWFsb2cuY2FuY2VsQnV0dG9uKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBEaWFsb2cub2tCdXR0b24oeyBsYWJlbDogdHJhbnMuX18oJ0J1aWxkJykgfSlcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IChyZXN1bHQuYnV0dG9uLmFjY2VwdCA/IGJ1aWxkKCkgOiB1bmRlZmluZWQpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cGRhdGVUcmVlUGF0aDtcbiAgICB9LFxuICAgIGF1dG9TdGFydDogdHJ1ZVxufTtcbi8qKlxuICogUGx1Z2luIHRvIGJ1aWxkIHRoZSBjb250ZXh0IG1lbnUgZnJvbSB0aGUgc2V0dGluZ3MuXG4gKi9cbmNvbnN0IGNvbnRleHRNZW51UGx1Z2luID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tZXh0ZW5zaW9uOmNvbnRleHQtbWVudScsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHJlcXVpcmVzOiBbSVNldHRpbmdSZWdpc3RyeSwgSVRyYW5zbGF0b3JdLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBzZXR0aW5nUmVnaXN0cnksIHRyYW5zbGF0b3IpID0+IHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlTWVudShvcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBtZW51ID0gbmV3IFJhbmtlZE1lbnUoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBjb21tYW5kczogYXBwLmNvbW1hbmRzIH0pKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgbWVudS50aXRsZS5sYWJlbCA9IHRyYW5zLl9fKG9wdGlvbnMubGFiZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTG9hZCB0aGUgY29udGV4dCBtZW51IGxhdGVseSBzbyBwbHVnaW5zIGFyZSBsb2FkZWQuXG4gICAgICAgIGFwcC5zdGFydGVkXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUHJpdmF0ZS5sb2FkU2V0dGluZ3NDb250ZXh0TWVudShhcHAuY29udGV4dE1lbnUsIHNldHRpbmdSZWdpc3RyeSwgY3JlYXRlTWVudSwgdHJhbnNsYXRvcik7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2gocmVhc29uID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGNvbnRleHQgbWVudSBpdGVtcyBmcm9tIHNldHRpbmdzIHJlZ2lzdHJ5LicsIHJlYXNvbik7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4vKipcbiAqIENoZWNrIGlmIHRoZSBhcHBsaWNhdGlvbiBpcyBkaXJ0eSBiZWZvcmUgY2xvc2luZyB0aGUgYnJvd3NlciB0YWIuXG4gKi9cbmNvbnN0IGRpcnR5ID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tZXh0ZW5zaW9uOmRpcnR5JyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJVHJhbnNsYXRvcl0sXG4gICAgYWN0aXZhdGU6IChhcHAsIHRyYW5zbGF0b3IpID0+IHtcbiAgICAgICAgaWYgKCEoYXBwIGluc3RhbmNlb2YgSnVweXRlckxhYikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtkaXJ0eS5pZH0gbXVzdCBiZSBhY3RpdmF0ZWQgaW4gSnVweXRlckxhYi5gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnMuX18oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBleGl0IEp1cHl0ZXJMYWI/XFxuXFxuQW55IHVuc2F2ZWQgY2hhbmdlcyB3aWxsIGJlIGxvc3QuJyk7XG4gICAgICAgIC8vIFRoZSBzcGVjIGZvciB0aGUgYGJlZm9yZXVubG9hZGAgZXZlbnQgaXMgaW1wbGVtZW50ZWQgZGlmZmVyZW50bHkgYnlcbiAgICAgICAgLy8gdGhlIGRpZmZlcmVudCBicm93c2VyIHZlbmRvcnMuIENvbnNlcXVlbnRseSwgdGhlIGBldmVudC5yZXR1cm5WYWx1ZWBcbiAgICAgICAgLy8gYXR0cmlidXRlIG5lZWRzIHRvIHNldCBpbiBhZGRpdGlvbiB0byBhIHJldHVybiB2YWx1ZSBiZWluZyByZXR1cm5lZC5cbiAgICAgICAgLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZTpcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvRXZlbnRzL2JlZm9yZXVubG9hZFxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKGFwcC5zdGF0dXMuaXNEaXJ0eSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZXZlbnQucmV0dXJuVmFsdWUgPSBtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcbi8qKlxuICogVGhlIGRlZmF1bHQgbGF5b3V0IHJlc3RvcmVyIHByb3ZpZGVyLlxuICovXG5jb25zdCBsYXlvdXQgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9hcHBsaWNhdGlvbi1leHRlbnNpb246bGF5b3V0JyxcbiAgICByZXF1aXJlczogW0lTdGF0ZURCLCBJTGFiU2hlbGwsIElTZXR0aW5nUmVnaXN0cnksIElUcmFuc2xhdG9yXSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgc3RhdGUsIGxhYlNoZWxsLCBzZXR0aW5nUmVnaXN0cnksIHRyYW5zbGF0b3IpID0+IHtcbiAgICAgICAgY29uc3QgZmlyc3QgPSBhcHAuc3RhcnRlZDtcbiAgICAgICAgY29uc3QgcmVnaXN0cnkgPSBhcHAuY29tbWFuZHM7XG4gICAgICAgIGNvbnN0IHJlc3RvcmVyID0gbmV3IExheW91dFJlc3RvcmVyKHsgY29ubmVjdG9yOiBzdGF0ZSwgZmlyc3QsIHJlZ2lzdHJ5IH0pO1xuICAgICAgICB2b2lkIHJlc3RvcmVyLmZldGNoKCkudGhlbihzYXZlZCA9PiB7XG4gICAgICAgICAgICBsYWJTaGVsbC5yZXN0b3JlTGF5b3V0KFBhZ2VDb25maWcuZ2V0T3B0aW9uKCdtb2RlJyksIHNhdmVkKTtcbiAgICAgICAgICAgIGxhYlNoZWxsLmxheW91dE1vZGlmaWVkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZvaWQgcmVzdG9yZXIuc2F2ZShsYWJTaGVsbC5zYXZlTGF5b3V0KCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBQcml2YXRlLmFjdGl2YXRlU2lkZWJhclN3aXRjaGVyKGFwcCwgbGFiU2hlbGwsIHNldHRpbmdSZWdpc3RyeSwgdHJhbnNsYXRvciwgc2F2ZWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3RvcmVyO1xuICAgIH0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHByb3ZpZGVzOiBJTGF5b3V0UmVzdG9yZXJcbn07XG4vKipcbiAqIFRoZSBkZWZhdWx0IFVSTCByb3V0ZXIgcHJvdmlkZXIuXG4gKi9cbmNvbnN0IHJvdXRlciA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLWV4dGVuc2lvbjpyb3V0ZXInLFxuICAgIHJlcXVpcmVzOiBbSnVweXRlckZyb250RW5kLklQYXRoc10sXG4gICAgYWN0aXZhdGU6IChhcHAsIHBhdGhzKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMgfSA9IGFwcDtcbiAgICAgICAgY29uc3QgYmFzZSA9IHBhdGhzLnVybHMuYmFzZTtcbiAgICAgICAgY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcih7IGJhc2UsIGNvbW1hbmRzIH0pO1xuICAgICAgICB2b2lkIGFwcC5zdGFydGVkLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gUm91dGUgdGhlIHZlcnkgZmlyc3QgcmVxdWVzdCBvbiBsb2FkLlxuICAgICAgICAgICAgdm9pZCByb3V0ZXIucm91dGUoKTtcbiAgICAgICAgICAgIC8vIFJvdXRlIGFsbCBwb3Agc3RhdGUgZXZlbnRzLlxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZvaWQgcm91dGVyLnJvdXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByb3V0ZXI7XG4gICAgfSxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcHJvdmlkZXM6IElSb3V0ZXJcbn07XG4vKipcbiAqIFRoZSBkZWZhdWx0IHRyZWUgcm91dGUgcmVzb2x2ZXIgcGx1Z2luLlxuICovXG5jb25zdCB0cmVlID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tZXh0ZW5zaW9uOnRyZWUtcmVzb2x2ZXInLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICByZXF1aXJlczogW0lSb3V0ZXJdLFxuICAgIHByb3ZpZGVzOiBKdXB5dGVyRnJvbnRFbmQuSVRyZWVSZXNvbHZlcixcbiAgICBhY3RpdmF0ZTogKGFwcCwgcm91dGVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMgfSA9IGFwcDtcbiAgICAgICAgY29uc3Qgc2V0ID0gbmV3IERpc3Bvc2FibGVTZXQoKTtcbiAgICAgICAgY29uc3QgZGVsZWdhdGUgPSBuZXcgUHJvbWlzZURlbGVnYXRlKCk7XG4gICAgICAgIGNvbnN0IHRyZWVQYXR0ZXJuID0gbmV3IFJlZ0V4cCgnLyhsYWJ8ZG9jKSgvd29ya3NwYWNlcy9bYS16QS1aMC05LV9dKyk/KC90cmVlLy4qKT8nKTtcbiAgICAgICAgc2V0LmFkZChjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMudHJlZSwge1xuICAgICAgICAgICAgZXhlY3V0ZTogYXN5bmMgKGFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgaWYgKHNldC5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcXVlcnkgPSBVUkxFeHQucXVlcnlTdHJpbmdUb09iamVjdCgoX2EgPSBhcmdzLnNlYXJjaCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJyb3dzZXIgPSBxdWVyeVsnZmlsZS1icm93c2VyLXBhdGgnXSB8fCAnJztcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGZpbGUgYnJvd3NlciBwYXRoIGZyb20gdGhlIHF1ZXJ5IHN0cmluZy5cbiAgICAgICAgICAgICAgICBkZWxldGUgcXVlcnlbJ2ZpbGUtYnJvd3Nlci1wYXRoJ107XG4gICAgICAgICAgICAgICAgLy8gQ2xlYW4gdXAgYXJ0aWZhY3RzIGltbWVkaWF0ZWx5IHVwb24gcm91dGluZy5cbiAgICAgICAgICAgICAgICBzZXQuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGRlbGVnYXRlLnJlc29sdmUoeyBicm93c2VyLCBmaWxlOiBQYWdlQ29uZmlnLmdldE9wdGlvbigndHJlZVBhdGgnKSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgICBzZXQuYWRkKHJvdXRlci5yZWdpc3Rlcih7IGNvbW1hbmQ6IENvbW1hbmRJRHMudHJlZSwgcGF0dGVybjogdHJlZVBhdHRlcm4gfSkpO1xuICAgICAgICAvLyBJZiBhIHJvdXRlIGlzIGhhbmRsZWQgYnkgdGhlIHJvdXRlciB3aXRob3V0IHRoZSB0cmVlIGNvbW1hbmQgYmVpbmdcbiAgICAgICAgLy8gaW52b2tlZCwgcmVzb2x2ZSB0byBgbnVsbGAgYW5kIGNsZWFuIHVwIGFydGlmYWN0cy5cbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2V0LmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXQuZGlzcG9zZSgpO1xuICAgICAgICAgICAgZGVsZWdhdGUucmVzb2x2ZShudWxsKTtcbiAgICAgICAgfTtcbiAgICAgICAgcm91dGVyLnJvdXRlZC5jb25uZWN0KGxpc3RlbmVyKTtcbiAgICAgICAgc2V0LmFkZChuZXcgRGlzcG9zYWJsZURlbGVnYXRlKCgpID0+IHtcbiAgICAgICAgICAgIHJvdXRlci5yb3V0ZWQuZGlzY29ubmVjdChsaXN0ZW5lcik7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHsgcGF0aHM6IGRlbGVnYXRlLnByb21pc2UgfTtcbiAgICB9XG59O1xuLyoqXG4gKiBUaGUgZGVmYXVsdCBVUkwgbm90IGZvdW5kIGV4dGVuc2lvbi5cbiAqL1xuY29uc3Qgbm90Zm91bmQgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9hcHBsaWNhdGlvbi1leHRlbnNpb246bm90Zm91bmQnLFxuICAgIHJlcXVpcmVzOiBbSnVweXRlckZyb250RW5kLklQYXRocywgSVJvdXRlciwgSVRyYW5zbGF0b3JdLFxuICAgIGFjdGl2YXRlOiAoXywgcGF0aHMsIHJvdXRlciwgdHJhbnNsYXRvcikgPT4ge1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCBiYWQgPSBwYXRocy51cmxzLm5vdEZvdW5kO1xuICAgICAgICBpZiAoIWJhZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJhc2UgPSByb3V0ZXIuYmFzZTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zLl9fKCdUaGUgcGF0aDogJTEgd2FzIG5vdCBmb3VuZC4gSnVweXRlckxhYiByZWRpcmVjdGVkIHRvOiAlMicsIGJhZCwgYmFzZSk7XG4gICAgICAgIC8vIENoYW5nZSB0aGUgVVJMIGJhY2sgdG8gdGhlIGJhc2UgYXBwbGljYXRpb24gVVJMLlxuICAgICAgICByb3V0ZXIubmF2aWdhdGUoJycpO1xuICAgICAgICB2b2lkIHNob3dFcnJvck1lc3NhZ2UodHJhbnMuX18oJ1BhdGggTm90IEZvdW5kJyksIHsgbWVzc2FnZSB9KTtcbiAgICB9LFxuICAgIGF1dG9TdGFydDogdHJ1ZVxufTtcbi8qKlxuICogQ2hhbmdlIHRoZSBmYXZpY29uIGNoYW5naW5nIGJhc2VkIG9uIHRoZSBidXN5IHN0YXR1cztcbiAqL1xuY29uc3QgYnVzeSA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLWV4dGVuc2lvbjpmYXZpY29uYnVzeScsXG4gICAgcmVxdWlyZXM6IFtJTGFiU3RhdHVzXSxcbiAgICBhY3RpdmF0ZTogYXN5bmMgKF8sIHN0YXR1cykgPT4ge1xuICAgICAgICBzdGF0dXMuYnVzeVNpZ25hbC5jb25uZWN0KChfLCBpc0J1c3kpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZhdmljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsaW5rW3JlbD1cImljb25cIl0ke2lzQnVzeSA/ICcuaWRsZS5mYXZpY29uJyA6ICcuYnVzeS5mYXZpY29uJ31gKTtcbiAgICAgICAgICAgIGlmICghZmF2aWNvbikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG5ld0Zhdmljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsaW5rJHtpc0J1c3kgPyAnLmJ1c3kuZmF2aWNvbicgOiAnLmlkbGUuZmF2aWNvbid9YCk7XG4gICAgICAgICAgICBpZiAoIW5ld0Zhdmljb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIHRoZSB0d28gaWNvbnMgd2l0aCB0aGUgc3BlY2lhbCBjbGFzc2VzLCB0aGVuIHRvZ2dsZSB0aGVtLlxuICAgICAgICAgICAgaWYgKGZhdmljb24gIT09IG5ld0Zhdmljb24pIHtcbiAgICAgICAgICAgICAgICBmYXZpY29uLnJlbCA9ICcnO1xuICAgICAgICAgICAgICAgIG5ld0Zhdmljb24ucmVsID0gJ2ljb24nO1xuICAgICAgICAgICAgICAgIC8vIEZpcmVmb3ggZG9lc24ndCBzZWVtIHRvIHJlY29nbml6ZSBqdXN0IGNoYW5naW5nIHJlbCwgc28gd2UgYWxzb1xuICAgICAgICAgICAgICAgIC8vIHJlaW5zZXJ0IHRoZSBsaW5rIGludG8gdGhlIERPTS5cbiAgICAgICAgICAgICAgICBuZXdGYXZpY29uLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0Zhdmljb24sIG5ld0Zhdmljb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGF1dG9TdGFydDogdHJ1ZVxufTtcbi8qKlxuICogVGhlIGRlZmF1bHQgSnVweXRlckxhYiBhcHBsaWNhdGlvbiBzaGVsbC5cbiAqL1xuY29uc3Qgc2hlbGwgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9hcHBsaWNhdGlvbi1leHRlbnNpb246c2hlbGwnLFxuICAgIG9wdGlvbmFsOiBbSVNldHRpbmdSZWdpc3RyeV0sXG4gICAgYWN0aXZhdGU6IChhcHAsIHNldHRpbmdSZWdpc3RyeSkgPT4ge1xuICAgICAgICBpZiAoIShhcHAuc2hlbGwgaW5zdGFuY2VvZiBMYWJTaGVsbCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtzaGVsbC5pZH0gZGlkIG5vdCBmaW5kIGEgTGFiU2hlbGwgaW5zdGFuY2UuYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNldHRpbmdSZWdpc3RyeSkge1xuICAgICAgICAgICAgc2V0dGluZ1JlZ2lzdHJ5XG4gICAgICAgICAgICAgICAgLmxvYWQoc2hlbGwuaWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oc2V0dGluZ3MgPT4ge1xuICAgICAgICAgICAgICAgIGFwcC5zaGVsbC51cGRhdGVDb25maWcoc2V0dGluZ3MuY29tcG9zaXRlKTtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5jaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhcHAuc2hlbGwudXBkYXRlQ29uZmlnKHNldHRpbmdzLmNvbXBvc2l0ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGxvYWQgc2hlbGwgc2V0dGluZ3MuJywgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFwcC5zaGVsbDtcbiAgICB9LFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICBwcm92aWRlczogSUxhYlNoZWxsXG59O1xuLyoqXG4gKiBUaGUgZGVmYXVsdCBKdXB5dGVyTGFiIGFwcGxpY2F0aW9uIHN0YXR1cyBwcm92aWRlci5cbiAqL1xuY29uc3Qgc3RhdHVzID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tZXh0ZW5zaW9uOnN0YXR1cycsXG4gICAgYWN0aXZhdGU6IChhcHApID0+IHtcbiAgICAgICAgaWYgKCEoYXBwIGluc3RhbmNlb2YgSnVweXRlckxhYikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtzdGF0dXMuaWR9IG11c3QgYmUgYWN0aXZhdGVkIGluIEp1cHl0ZXJMYWIuYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFwcC5zdGF0dXM7XG4gICAgfSxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcHJvdmlkZXM6IElMYWJTdGF0dXNcbn07XG4vKipcbiAqIFRoZSBkZWZhdWx0IEp1cHl0ZXJMYWIgYXBwbGljYXRpb24tc3BlY2lmaWMgaW5mb3JtYXRpb24gcHJvdmlkZXIuXG4gKlxuICogIyMjIyBOb3Rlc1xuICogVGhpcyBwbHVnaW4gc2hvdWxkIG9ubHkgYmUgdXNlZCBieSBwbHVnaW5zIHRoYXQgc3BlY2lmaWNhbGx5IG5lZWQgdG8gYWNjZXNzXG4gKiBKdXB5dGVyTGFiIGFwcGxpY2F0aW9uIGluZm9ybWF0aW9uLCBlLmcuLCBsaXN0aW5nIGV4dGVuc2lvbnMgdGhhdCBoYXZlIGJlZW5cbiAqIGxvYWRlZCBvciBkZWZlcnJlZCB3aXRoaW4gSnVweXRlckxhYi5cbiAqL1xuY29uc3QgaW5mbyA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLWV4dGVuc2lvbjppbmZvJyxcbiAgICBhY3RpdmF0ZTogKGFwcCkgPT4ge1xuICAgICAgICBpZiAoIShhcHAgaW5zdGFuY2VvZiBKdXB5dGVyTGFiKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2luZm8uaWR9IG11c3QgYmUgYWN0aXZhdGVkIGluIEp1cHl0ZXJMYWIuYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFwcC5pbmZvO1xuICAgIH0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHByb3ZpZGVzOiBKdXB5dGVyTGFiLklJbmZvXG59O1xuLyoqXG4gKiBUaGUgZGVmYXVsdCBKdXB5dGVyTGFiIHBhdGhzIGRpY3Rpb25hcnkgcHJvdmlkZXIuXG4gKi9cbmNvbnN0IHBhdGhzID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMtZXh0ZW5zaW9uOnBhdGhzJyxcbiAgICBhY3RpdmF0ZTogKGFwcCkgPT4ge1xuICAgICAgICBpZiAoIShhcHAgaW5zdGFuY2VvZiBKdXB5dGVyTGFiKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3BhdGhzLmlkfSBtdXN0IGJlIGFjdGl2YXRlZCBpbiBKdXB5dGVyTGFiLmApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcHAucGF0aHM7XG4gICAgfSxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcHJvdmlkZXM6IEp1cHl0ZXJGcm9udEVuZC5JUGF0aHNcbn07XG4vKipcbiAqIFRoZSBkZWZhdWx0IHByb3BlcnR5IGluc3BlY3RvciBwcm92aWRlci5cbiAqL1xuY29uc3QgcHJvcGVydHlJbnNwZWN0b3IgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9hcHBsaWNhdGlvbi1leHRlbnNpb246cHJvcGVydHktaW5zcGVjdG9yJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJTGFiU2hlbGwsIElUcmFuc2xhdG9yXSxcbiAgICBvcHRpb25hbDogW0lMYXlvdXRSZXN0b3Jlcl0sXG4gICAgcHJvdmlkZXM6IElQcm9wZXJ0eUluc3BlY3RvclByb3ZpZGVyLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBsYWJzaGVsbCwgdHJhbnNsYXRvciwgcmVzdG9yZXIpID0+IHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gbmV3IFNpZGVCYXJQcm9wZXJ0eUluc3BlY3RvclByb3ZpZGVyKGxhYnNoZWxsLCB1bmRlZmluZWQsIHRyYW5zbGF0b3IpO1xuICAgICAgICB3aWRnZXQudGl0bGUuaWNvbiA9IGJ1aWxkSWNvbjtcbiAgICAgICAgd2lkZ2V0LnRpdGxlLmNhcHRpb24gPSB0cmFucy5fXygnUHJvcGVydHkgSW5zcGVjdG9yJyk7XG4gICAgICAgIHdpZGdldC5pZCA9ICdqcC1wcm9wZXJ0eS1pbnNwZWN0b3InO1xuICAgICAgICBsYWJzaGVsbC5hZGQod2lkZ2V0LCAncmlnaHQnLCB7IHJhbms6IDEwMCB9KTtcbiAgICAgICAgaWYgKHJlc3RvcmVyKSB7XG4gICAgICAgICAgICByZXN0b3Jlci5hZGQod2lkZ2V0LCAnanAtcHJvcGVydHktaW5zcGVjdG9yJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9XG59O1xuY29uc3QgSnVweXRlckxvZ28gPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9hcHBsaWNhdGlvbi1leHRlbnNpb246bG9nbycsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHJlcXVpcmVzOiBbSUxhYlNoZWxsXSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgc2hlbGwpID0+IHtcbiAgICAgICAgY29uc3QgbG9nbyA9IG5ldyBXaWRnZXQoKTtcbiAgICAgICAganVweXRlckljb24uZWxlbWVudCh7XG4gICAgICAgICAgICBjb250YWluZXI6IGxvZ28ubm9kZSxcbiAgICAgICAgICAgIGVsZW1lbnRQb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBtYXJnaW46ICcycHggMnB4IDJweCA4cHgnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICB3aWR0aDogJzE2cHgnXG4gICAgICAgIH0pO1xuICAgICAgICBsb2dvLmlkID0gJ2pwLU1haW5Mb2dvJztcbiAgICAgICAgc2hlbGwuYWRkKGxvZ28sICd0b3AnLCB7IHJhbms6IDAgfSk7XG4gICAgfVxufTtcbi8qKlxuICogRXhwb3J0IHRoZSBwbHVnaW5zIGFzIGRlZmF1bHQuXG4gKi9cbmNvbnN0IHBsdWdpbnMgPSBbXG4gICAgY29udGV4dE1lbnVQbHVnaW4sXG4gICAgZGlydHksXG4gICAgbWFpbixcbiAgICBtYWluQ29tbWFuZHMsXG4gICAgbGF5b3V0LFxuICAgIHJvdXRlcixcbiAgICB0cmVlLFxuICAgIG5vdGZvdW5kLFxuICAgIGJ1c3ksXG4gICAgc2hlbGwsXG4gICAgc3RhdHVzLFxuICAgIGluZm8sXG4gICAgcGF0aHMsXG4gICAgcHJvcGVydHlJbnNwZWN0b3IsXG4gICAgSnVweXRlckxvZ29cbl07XG5leHBvcnQgZGVmYXVsdCBwbHVnaW5zO1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICBhc3luYyBmdW5jdGlvbiBkaXNwbGF5SW5mb3JtYXRpb24odHJhbnMpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICB0aXRsZTogdHJhbnMuX18oJ0luZm9ybWF0aW9uJyksXG4gICAgICAgICAgICBib2R5OiB0cmFucy5fXygnQ29udGV4dCBtZW51IGN1c3RvbWl6YXRpb24gaGFzIGNoYW5nZWQuIFlvdSB3aWxsIG5lZWQgdG8gcmVsb2FkIEp1cHl0ZXJMYWIgdG8gc2VlIHRoZSBjaGFuZ2VzLicpLFxuICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgIERpYWxvZy5jYW5jZWxCdXR0b24oKSxcbiAgICAgICAgICAgICAgICBEaWFsb2cub2tCdXR0b24oeyBsYWJlbDogdHJhbnMuX18oJ1JlbG9hZCcpIH0pXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocmVzdWx0LmJ1dHRvbi5hY2NlcHQpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGZ1bmN0aW9uIGxvYWRTZXR0aW5nc0NvbnRleHRNZW51KGNvbnRleHRNZW51LCByZWdpc3RyeSwgbWVudUZhY3RvcnksIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCBwbHVnaW5JZCA9IGNvbnRleHRNZW51UGx1Z2luLmlkO1xuICAgICAgICBsZXQgY2Fub25pY2FsO1xuICAgICAgICBsZXQgbG9hZGVkID0ge307XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQb3B1bGF0ZSB0aGUgcGx1Z2luJ3Mgc2NoZW1hIGRlZmF1bHRzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBXZSBrZWVwIHRyYWNrIG9mIGRpc2FibGVkIGVudHJpZXMgaW4gY2FzZSB0aGUgcGx1Z2luIGlzIGxvYWRlZFxuICAgICAgICAgKiBhZnRlciB0aGUgbWVudSBpbml0aWFsaXphdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHBvcHVsYXRlKHNjaGVtYSkge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIGxvYWRlZCA9IHt9O1xuICAgICAgICAgICAgY29uc3QgcGx1Z2luRGVmYXVsdHMgPSBPYmplY3Qua2V5cyhyZWdpc3RyeS5wbHVnaW5zKVxuICAgICAgICAgICAgICAgIC5tYXAocGx1Z2luID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gKF9iID0gKF9hID0gcmVnaXN0cnkucGx1Z2luc1twbHVnaW5dLnNjaGVtYVsnanVweXRlci5sYWIubWVudXMnXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbnRleHQpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IFtdO1xuICAgICAgICAgICAgICAgIGxvYWRlZFtwbHVnaW5dID0gaXRlbXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY29uY2F0KFsoX2IgPSAoX2EgPSBzY2hlbWFbJ2p1cHl0ZXIubGFiLm1lbnVzJ10pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb250ZXh0KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBbXV0pXG4gICAgICAgICAgICAgICAgLnJlZHVjZVJpZ2h0KChhY2MsIHZhbCkgPT4gU2V0dGluZ1JlZ2lzdHJ5LnJlY29uY2lsZUl0ZW1zKGFjYywgdmFsLCB0cnVlKSwgW10pO1xuICAgICAgICAgICAgLy8gQXBwbHkgZGVmYXVsdCB2YWx1ZSBhcyBsYXN0IHN0ZXAgdG8gdGFrZSBpbnRvIGFjY291bnQgb3ZlcnJpZGVzLmpzb25cbiAgICAgICAgICAgIC8vIFRoZSBzdGFuZGFyZCBkZWZhdWx0IGJlaW5nIFtdIGFzIHRoZSBwbHVnaW4gbXVzdCB1c2UgYGp1cHl0ZXIubGFiLm1lbnVzLmNvbnRleHRgXG4gICAgICAgICAgICAvLyB0byBkZWZpbmUgdGhlaXIgZGVmYXVsdCB2YWx1ZS5cbiAgICAgICAgICAgIHNjaGVtYS5wcm9wZXJ0aWVzLmNvbnRleHRNZW51LmRlZmF1bHQgPSBTZXR0aW5nUmVnaXN0cnkucmVjb25jaWxlSXRlbXMocGx1Z2luRGVmYXVsdHMsIHNjaGVtYS5wcm9wZXJ0aWVzLmNvbnRleHRNZW51LmRlZmF1bHQsIHRydWUpXG4gICAgICAgICAgICAgICAgLy8gZmxhdHRlbiBvbmUgbGV2ZWxcbiAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4geyB2YXIgX2EsIF9iOyByZXR1cm4gKChfYSA9IGEucmFuaykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogSW5maW5pdHkpIC0gKChfYiA9IGIucmFuaykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogSW5maW5pdHkpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUcmFuc2Zvcm0gdGhlIHBsdWdpbiBvYmplY3QgdG8gcmV0dXJuIGRpZmZlcmVudCBzY2hlbWEgdGhhbiB0aGUgZGVmYXVsdC5cbiAgICAgICAgcmVnaXN0cnkudHJhbnNmb3JtKHBsdWdpbklkLCB7XG4gICAgICAgICAgICBjb21wb3NlOiBwbHVnaW4gPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgICAgICAgICAvLyBPbmx5IG92ZXJyaWRlIHRoZSBjYW5vbmljYWwgc2NoZW1hIHRoZSBmaXJzdCB0aW1lLlxuICAgICAgICAgICAgICAgIGlmICghY2Fub25pY2FsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbm9uaWNhbCA9IEpTT05FeHQuZGVlcENvcHkocGx1Z2luLnNjaGVtYSk7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVsYXRlKGNhbm9uaWNhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRzID0gKF9jID0gKF9iID0gKF9hID0gY2Fub25pY2FsLnByb3BlcnRpZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb250ZXh0TWVudSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmRlZmF1bHQpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IFtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHBsdWdpbi5kYXRhLnVzZXIpLCB7IGNvbnRleHRNZW51OiAoX2QgPSBwbHVnaW4uZGF0YS51c2VyLmNvbnRleHRNZW51KSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiBbXSB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21wb3NpdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHBsdWdpbi5kYXRhLmNvbXBvc2l0ZSksIHsgY29udGV4dE1lbnU6IFNldHRpbmdSZWdpc3RyeS5yZWNvbmNpbGVJdGVtcyhkZWZhdWx0cywgdXNlci5jb250ZXh0TWVudSwgZmFsc2UpIH0pO1xuICAgICAgICAgICAgICAgIHBsdWdpbi5kYXRhID0geyBjb21wb3NpdGUsIHVzZXIgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZldGNoOiBwbHVnaW4gPT4ge1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgb3ZlcnJpZGUgdGhlIGNhbm9uaWNhbCBzY2hlbWEgdGhlIGZpcnN0IHRpbWUuXG4gICAgICAgICAgICAgICAgaWYgKCFjYW5vbmljYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2Fub25pY2FsID0gSlNPTkV4dC5kZWVwQ29weShwbHVnaW4uc2NoZW1hKTtcbiAgICAgICAgICAgICAgICAgICAgcG9wdWxhdGUoY2Fub25pY2FsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogcGx1Z2luLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBwbHVnaW4uaWQsXG4gICAgICAgICAgICAgICAgICAgIHJhdzogcGx1Z2luLnJhdyxcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1hOiBjYW5vbmljYWwsXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb246IHBsdWdpbi52ZXJzaW9uXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFJlcG9wdWxhdGUgdGhlIGNhbm9uaWNhbCB2YXJpYWJsZSBhZnRlciB0aGUgc2V0dGluZyByZWdpc3RyeSBoYXNcbiAgICAgICAgLy8gcHJlbG9hZGVkIGFsbCBpbml0aWFsIHBsdWdpbnMuXG4gICAgICAgIGNhbm9uaWNhbCA9IG51bGw7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgcmVnaXN0cnkubG9hZChwbHVnaW5JZCk7XG4gICAgICAgIGNvbnN0IGNvbnRleHRJdGVtcyA9IChfYSA9IHNldHRpbmdzLmNvbXBvc2l0ZS5jb250ZXh0TWVudSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW107XG4gICAgICAgIC8vIENyZWF0ZSBtZW51IGl0ZW0gZm9yIG5vbi1kaXNhYmxlZCBlbGVtZW50XG4gICAgICAgIFNldHRpbmdSZWdpc3RyeS5maWx0ZXJEaXNhYmxlZEl0ZW1zKGNvbnRleHRJdGVtcykuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIE1lbnVGYWN0b3J5LmFkZENvbnRleHRJdGVtKE9iamVjdC5hc3NpZ24oeyBcbiAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIHRvIHNldCB0aGUgZGVmYXVsdCByYW5rIGJlY2F1c2UgTHVtaW5vIGlzIHNvcnRpbmcgdGhlIHZpc2libGUgaXRlbXNcbiAgICAgICAgICAgICAgICByYW5rOiBERUZBVUxUX0NPTlRFWFRfSVRFTV9SQU5LIH0sIGl0ZW0pLCBjb250ZXh0TWVudSwgbWVudUZhY3RvcnkpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2V0dGluZ3MuY2hhbmdlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIC8vIEFzIGV4dGVuc2lvbiBtYXkgY2hhbmdlIHRoZSBjb250ZXh0IG1lbnUgdGhyb3VnaCBBUEksXG4gICAgICAgICAgICAvLyBwcm9tcHQgdGhlIHVzZXIgdG8gcmVsb2FkIGlmIHRoZSBtZW51IGhhcyBiZWVuIHVwZGF0ZWQuXG4gICAgICAgICAgICBjb25zdCBuZXdJdGVtcyA9IChfYSA9IHNldHRpbmdzLmNvbXBvc2l0ZS5jb250ZXh0TWVudSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW107XG4gICAgICAgICAgICBpZiAoIUpTT05FeHQuZGVlcEVxdWFsKGNvbnRleHRJdGVtcywgbmV3SXRlbXMpKSB7XG4gICAgICAgICAgICAgICAgdm9pZCBkaXNwbGF5SW5mb3JtYXRpb24odHJhbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmVnaXN0cnkucGx1Z2luQ2hhbmdlZC5jb25uZWN0KGFzeW5jIChzZW5kZXIsIHBsdWdpbikgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICAgICAgaWYgKHBsdWdpbiAhPT0gcGx1Z2luSWQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcGx1Z2luIGNoYW5nZWQgaXRzIG1lbnUuXG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkSXRlbXMgPSAoX2EgPSBsb2FkZWRbcGx1Z2luXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW107XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SXRlbXMgPSAoX2MgPSAoX2IgPSByZWdpc3RyeS5wbHVnaW5zW3BsdWdpbl0uc2NoZW1hWydqdXB5dGVyLmxhYi5tZW51cyddKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY29udGV4dCkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogW107XG4gICAgICAgICAgICAgICAgaWYgKCFKU09ORXh0LmRlZXBFcXVhbChvbGRJdGVtcywgbmV3SXRlbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2FkZWRbcGx1Z2luXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHBsdWdpbiBoYXMgY2hhbmdlZCwgcmVxdWVzdCB0aGUgdXNlciB0byByZWxvYWQgdGhlIFVJXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBkaXNwbGF5SW5mb3JtYXRpb24odHJhbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHBsdWdpbiB3YXMgbm90IHlldCBsb2FkZWQgd2hlbiB0aGUgbWVudSB3YXMgYnVpbHQgPT4gdXBkYXRlIHRoZSBtZW51XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkZWRbcGx1Z2luXSA9IEpTT05FeHQuZGVlcENvcHkobmV3SXRlbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWVyZ2UgcG90ZW50aWFsIGRpc2FibGVkIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b0FkZCA9IChfZCA9IFNldHRpbmdSZWdpc3RyeS5yZWNvbmNpbGVJdGVtcyhuZXdJdGVtcywgY29udGV4dEl0ZW1zLCBmYWxzZSwgZmFsc2UpKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFNldHRpbmdSZWdpc3RyeS5maWx0ZXJEaXNhYmxlZEl0ZW1zKHRvQWRkKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1lbnVGYWN0b3J5LmFkZENvbnRleHRJdGVtKE9iamVjdC5hc3NpZ24oeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byBzZXQgdGhlIGRlZmF1bHQgcmFuayBiZWNhdXNlIEx1bWlubyBpcyBzb3J0aW5nIHRoZSB2aXNpYmxlIGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbms6IERFRkFVTFRfQ09OVEVYVF9JVEVNX1JBTksgfSwgaXRlbSksIGNvbnRleHRNZW51LCBtZW51RmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFByaXZhdGUubG9hZFNldHRpbmdzQ29udGV4dE1lbnUgPSBsb2FkU2V0dGluZ3NDb250ZXh0TWVudTtcbiAgICBmdW5jdGlvbiBhY3RpdmF0ZVNpZGViYXJTd2l0Y2hlcihhcHAsIGxhYlNoZWxsLCBzZXR0aW5nUmVnaXN0cnksIHRyYW5zbGF0b3IsIGluaXRpYWwpIHtcbiAgICAgICAgY29uc3Qgc2V0dGluZyA9ICdAanVweXRlcmxhYi9hcHBsaWNhdGlvbi1leHRlbnNpb246c2lkZWJhcic7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGxldCBvdmVycmlkZXMgPSB7fTtcbiAgICAgICAgY29uc3QgdXBkYXRlID0gKF8sIGxheW91dCkgPT4ge1xuICAgICAgICAgICAgZWFjaChsYWJTaGVsbC53aWRnZXRzKCdsZWZ0JyksIHdpZGdldCA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGlmIChvdmVycmlkZXNbd2lkZ2V0LmlkXSAmJiBvdmVycmlkZXNbd2lkZ2V0LmlkXSA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgICAgICBsYWJTaGVsbC5hZGQod2lkZ2V0LCAncmlnaHQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxheW91dCAmJiAoKF9hID0gbGF5b3V0LnJpZ2h0QXJlYSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmN1cnJlbnRXaWRnZXQpID09PSB3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYlNoZWxsLmFjdGl2YXRlQnlJZCh3aWRnZXQuaWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlYWNoKGxhYlNoZWxsLndpZGdldHMoJ3JpZ2h0JyksIHdpZGdldCA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGlmIChvdmVycmlkZXNbd2lkZ2V0LmlkXSAmJiBvdmVycmlkZXNbd2lkZ2V0LmlkXSA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYlNoZWxsLmFkZCh3aWRnZXQsICdsZWZ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXlvdXQgJiYgKChfYSA9IGxheW91dC5sZWZ0QXJlYSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmN1cnJlbnRXaWRnZXQpID09PSB3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYlNoZWxsLmFjdGl2YXRlQnlJZCh3aWRnZXQuaWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIEZldGNoIG92ZXJyaWRlcyBmcm9tIHRoZSBzZXR0aW5ncyBzeXN0ZW0uXG4gICAgICAgIHZvaWQgUHJvbWlzZS5hbGwoW3NldHRpbmdSZWdpc3RyeS5sb2FkKHNldHRpbmcpLCBhcHAucmVzdG9yZWRdKS50aGVuKChbc2V0dGluZ3NdKSA9PiB7XG4gICAgICAgICAgICBvdmVycmlkZXMgPSAoc2V0dGluZ3MuZ2V0KCdvdmVycmlkZXMnKS5jb21wb3NpdGUgfHxcbiAgICAgICAgICAgICAgICB7fSk7XG4gICAgICAgICAgICBzZXR0aW5ncy5jaGFuZ2VkLmNvbm5lY3Qoc2V0dGluZ3MgPT4ge1xuICAgICAgICAgICAgICAgIG92ZXJyaWRlcyA9IChzZXR0aW5ncy5nZXQoJ292ZXJyaWRlcycpLmNvbXBvc2l0ZSB8fFxuICAgICAgICAgICAgICAgICAgICB7fSk7XG4gICAgICAgICAgICAgICAgdXBkYXRlKGxhYlNoZWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGFiU2hlbGwubGF5b3V0TW9kaWZpZWQuY29ubmVjdCh1cGRhdGUpO1xuICAgICAgICAgICAgdXBkYXRlKGxhYlNoZWxsLCBpbml0aWFsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEFkZCBhIGNvbW1hbmQgdG8gc3dpdGNoIGEgc2lkZSBwYW5lbHMncyBzaWRlXG4gICAgICAgIGFwcC5jb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuc3dpdGNoU2lkZWJhciwge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdTd2l0Y2ggU2lkZWJhciBTaWRlJyksXG4gICAgICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gRmlyc3QsIHRyeSB0byBmaW5kIHRoZSBjb3JyZWN0IHBhbmVsIGJhc2VkIG9uIHRoZSBhcHBsaWNhdGlvblxuICAgICAgICAgICAgICAgIC8vIGNvbnRleHQgbWVudSBjbGljay4gQmFpbCBpZiB3ZSBkb24ndCBmaW5kIGEgc2lkZWJhciBmb3IgdGhlIHdpZGdldC5cbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZXh0Tm9kZSA9IGFwcC5jb250ZXh0TWVudUhpdFRlc3Qobm9kZSA9PiAhIW5vZGUuZGF0YXNldC5pZCk7XG4gICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gY29udGV4dE5vZGUuZGF0YXNldFsnaWQnXTtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0UGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanAtbGVmdC1zdGFjaycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICAgICAgICAgICAgbGV0IHNpZGU7XG4gICAgICAgICAgICAgICAgaWYgKGxlZnRQYW5lbCAmJiBub2RlICYmIGxlZnRQYW5lbC5jb250YWlucyhub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBzaWRlID0gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNpZGUgPSAnbGVmdCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIE1vdmUgdGhlIHBhbmVsIHRvIHRoZSBvdGhlciBzaWRlLlxuICAgICAgICAgICAgICAgIHJldHVybiBzZXR0aW5nUmVnaXN0cnkuc2V0KHNldHRpbmcsICdvdmVycmlkZXMnLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG92ZXJyaWRlcyksIHsgW2lkXTogc2lkZSB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBQcml2YXRlLmFjdGl2YXRlU2lkZWJhclN3aXRjaGVyID0gYWN0aXZhdGVTaWRlYmFyU3dpdGNoZXI7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=