(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_filebrowser-extension_lib_index_js"],{

/***/ "../../packages/filebrowser-extension/lib/index.js":
/*!*********************************************************!*\
  !*** ../../packages/filebrowser-extension/lib/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fileUploadStatus": () => (/* binding */ fileUploadStatus),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/docmanager */ "webpack/sharing/consume/default/@jupyterlab/docmanager/@jupyterlab/docmanager");
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/filebrowser */ "webpack/sharing/consume/default/@jupyterlab/filebrowser/@jupyterlab/filebrowser");
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/statedb */ "webpack/sharing/consume/default/@jupyterlab/statedb/@jupyterlab/statedb");
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jupyterlab/statusbar */ "webpack/sharing/consume/default/@jupyterlab/statusbar/@jupyterlab/statusbar");
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _lumino_commands__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @lumino/commands */ "webpack/sharing/consume/default/@lumino/commands/@lumino/commands?8e96");
/* harmony import */ var _lumino_commands__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_lumino_commands__WEBPACK_IMPORTED_MODULE_11__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module filebrowser-extension
 */












const FILE_BROWSER_FACTORY = 'FileBrowser';
/**
 * The command IDs used by the file browser plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.copy = 'filebrowser:copy';
    CommandIDs.copyDownloadLink = 'filebrowser:copy-download-link';
    // For main browser only.
    CommandIDs.createLauncher = 'filebrowser:create-main-launcher';
    CommandIDs.cut = 'filebrowser:cut';
    CommandIDs.del = 'filebrowser:delete';
    CommandIDs.download = 'filebrowser:download';
    CommandIDs.duplicate = 'filebrowser:duplicate';
    // For main browser only.
    CommandIDs.hideBrowser = 'filebrowser:hide-main';
    CommandIDs.goToPath = 'filebrowser:go-to-path';
    CommandIDs.goUp = 'filebrowser:go-up';
    CommandIDs.openPath = 'filebrowser:open-path';
    CommandIDs.openUrl = 'filebrowser:open-url';
    CommandIDs.open = 'filebrowser:open';
    CommandIDs.openBrowserTab = 'filebrowser:open-browser-tab';
    CommandIDs.paste = 'filebrowser:paste';
    CommandIDs.createNewDirectory = 'filebrowser:create-new-directory';
    CommandIDs.createNewFile = 'filebrowser:create-new-file';
    CommandIDs.createNewMarkdownFile = 'filebrowser:create-new-markdown-file';
    CommandIDs.refresh = 'filebrowser:refresh';
    CommandIDs.rename = 'filebrowser:rename';
    // For main browser only.
    CommandIDs.copyShareableLink = 'filebrowser:share-main';
    // For main browser only.
    CommandIDs.copyPath = 'filebrowser:copy-path';
    CommandIDs.showBrowser = 'filebrowser:activate';
    CommandIDs.shutdown = 'filebrowser:shutdown';
    // For main browser only.
    CommandIDs.toggleBrowser = 'filebrowser:toggle-main';
    CommandIDs.toggleNavigateToCurrentDirectory = 'filebrowser:toggle-navigate-to-current-directory';
    CommandIDs.toggleLastModified = 'filebrowser:toggle-last-modified';
    CommandIDs.search = 'filebrowser:search';
    CommandIDs.toggleHiddenFiles = 'filebrowser:toggle-hidden-files';
})(CommandIDs || (CommandIDs = {}));
/**
 * The file browser namespace token.
 */
const namespace = 'filebrowser';
/**
 * The default file browser extension.
 */
const browser = {
    id: '@jupyterlab/filebrowser-extension:browser',
    requires: [_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.IFileBrowserFactory, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__.ITranslator],
    optional: [
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer,
        _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.ISettingRegistry,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ITreePathUpdater,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette
    ],
    provides: _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.IFileBrowserCommands,
    autoStart: true,
    activate: async (app, factory, translator, restorer, settingRegistry, treePathUpdater, commandPalette) => {
        const trans = translator.load('jupyterlab');
        const browser = factory.defaultBrowser;
        // Let the application restorer track the primary file browser (that is
        // automatically created) for restoration of application state (e.g. setting
        // the file browser as the current side bar widget).
        //
        // All other file browsers created by using the factory function are
        // responsible for their own restoration behavior, if any.
        if (restorer) {
            restorer.add(browser, namespace);
        }
        // Navigate to preferred-dir trait if found
        const preferredPath = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getOption('preferredPath');
        if (preferredPath) {
            await browser.model.cd(preferredPath);
        }
        addCommands(app, factory, translator, settingRegistry, commandPalette);
        // Show the current file browser shortcut in its title.
        const updateBrowserTitle = () => {
            const binding = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_10__.find)(app.commands.keyBindings, b => b.command === CommandIDs.toggleBrowser);
            if (binding) {
                const ks = _lumino_commands__WEBPACK_IMPORTED_MODULE_11__.CommandRegistry.formatKeystroke(binding.keys.join(' '));
                browser.title.caption = trans.__('File Browser (%1)', ks);
            }
            else {
                browser.title.caption = trans.__('File Browser');
            }
        };
        updateBrowserTitle();
        app.commands.keyBindingChanged.connect(() => {
            updateBrowserTitle();
        });
        return void Promise.all([app.restored, browser.model.restored]).then(() => {
            if (treePathUpdater) {
                browser.model.pathChanged.connect((sender, args) => {
                    treePathUpdater(args.newValue);
                });
            }
            let navigateToCurrentDirectory = false;
            let showLastModifiedColumn = true;
            let useFuzzyFilter = true;
            let showHiddenFiles = false;
            if (settingRegistry) {
                void settingRegistry
                    .load('@jupyterlab/filebrowser-extension:browser')
                    .then(settings => {
                    settings.changed.connect(settings => {
                        navigateToCurrentDirectory = settings.get('navigateToCurrentDirectory').composite;
                        browser.navigateToCurrentDirectory = navigateToCurrentDirectory;
                    });
                    navigateToCurrentDirectory = settings.get('navigateToCurrentDirectory').composite;
                    browser.navigateToCurrentDirectory = navigateToCurrentDirectory;
                    settings.changed.connect(settings => {
                        showLastModifiedColumn = settings.get('showLastModifiedColumn')
                            .composite;
                        browser.showLastModifiedColumn = showLastModifiedColumn;
                    });
                    showLastModifiedColumn = settings.get('showLastModifiedColumn')
                        .composite;
                    browser.showLastModifiedColumn = showLastModifiedColumn;
                    settings.changed.connect(settings => {
                        useFuzzyFilter = settings.get('useFuzzyFilter')
                            .composite;
                        browser.useFuzzyFilter = useFuzzyFilter;
                    });
                    useFuzzyFilter = settings.get('useFuzzyFilter')
                        .composite;
                    browser.useFuzzyFilter = useFuzzyFilter;
                    settings.changed.connect(settings => {
                        showHiddenFiles = settings.get('showHiddenFiles')
                            .composite;
                        browser.showHiddenFiles = showHiddenFiles;
                    });
                    showHiddenFiles = settings.get('showHiddenFiles')
                        .composite;
                    browser.showHiddenFiles = showHiddenFiles;
                });
            }
        });
    }
};
/**
 * The default file browser factory provider.
 */
const factory = {
    id: '@jupyterlab/filebrowser-extension:factory',
    provides: _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.IFileBrowserFactory,
    requires: [_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__.IDocumentManager, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__.ITranslator],
    optional: [_jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_6__.IStateDB, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.IRouter, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterFrontEnd.ITreeResolver],
    activate: async (app, docManager, translator, state, router, tree) => {
        const { commands } = app;
        const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({ namespace });
        const createFileBrowser = (id, options = {}) => {
            var _a;
            const model = new _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.FilterFileBrowserModel({
                translator: translator,
                auto: (_a = options.auto) !== null && _a !== void 0 ? _a : true,
                manager: docManager,
                driveName: options.driveName || '',
                refreshInterval: options.refreshInterval,
                state: options.state === null
                    ? undefined
                    : options.state || state || undefined
            });
            const restore = options.restore;
            const widget = new _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.FileBrowser({ id, model, restore, translator });
            // Track the newly created file browser.
            void tracker.add(widget);
            return widget;
        };
        // Manually restore and load the default file browser.
        const defaultBrowser = createFileBrowser('filebrowser', {
            auto: false,
            restore: false
        });
        void Private.restoreBrowser(defaultBrowser, commands, router, tree);
        return { createFileBrowser, defaultBrowser, tracker };
    }
};
/**
 * A plugin providing download + copy download link commands in the context menu.
 *
 * Disabling this plugin will NOT disable downloading files from the server.
 * Users will still be able to retrieve files from the file download URLs the
 * server provides.
 */
const downloadPlugin = {
    id: '@jupyterlab/filebrowser-extension:download',
    requires: [_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.IFileBrowserFactory, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__.ITranslator],
    autoStart: true,
    activate: (app, factory, translator) => {
        const trans = translator.load('jupyterlab');
        const { commands } = app;
        const { tracker } = factory;
        commands.addCommand(CommandIDs.download, {
            execute: () => {
                const widget = tracker.currentWidget;
                if (widget) {
                    return widget.download();
                }
            },
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.downloadIcon.bindprops({ stylesheet: 'menuItem' }),
            label: trans.__('Download')
        });
        commands.addCommand(CommandIDs.copyDownloadLink, {
            execute: () => {
                const widget = tracker.currentWidget;
                if (!widget) {
                    return;
                }
                return widget.model.manager.services.contents
                    .getDownloadUrl(widget.selectedItems().next().path)
                    .then(url => {
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Clipboard.copyToSystem(url);
                });
            },
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.copyIcon.bindprops({ stylesheet: 'menuItem' }),
            label: trans.__('Copy Download Link'),
            mnemonic: 0
        });
    }
};
/**
 * A plugin to add the file browser widget to an ILabShell
 */
const browserWidget = {
    id: '@jupyterlab/filebrowser-extension:widget',
    requires: [
        _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__.IDocumentManager,
        _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.IFileBrowserFactory,
        _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.ISettingRegistry,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IToolbarWidgetRegistry,
        _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__.ITranslator,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell,
        _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.IFileBrowserCommands
    ],
    autoStart: true,
    activate: (app, docManager, factory, settings, toolbarRegistry, translator, labShell) => {
        const { commands } = app;
        const { defaultBrowser: browser, tracker } = factory;
        const trans = translator.load('jupyterlab');
        // Set attributes when adding the browser to the UI
        browser.node.setAttribute('role', 'region');
        browser.node.setAttribute('aria-label', trans.__('File Browser Section'));
        browser.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.folderIcon;
        // Toolbar
        toolbarRegistry.registerFactory(FILE_BROWSER_FACTORY, 'uploader', (browser) => new _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.Uploader({ model: browser.model, translator }));
        (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.setToolbar)(browser, (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.createToolbarFactory)(toolbarRegistry, settings, FILE_BROWSER_FACTORY, browserWidget.id, translator));
        labShell.add(browser, 'left', { rank: 100 });
        commands.addCommand(CommandIDs.showBrowser, {
            execute: args => {
                const path = args.path || '';
                const browserForPath = Private.getBrowserForPath(path, factory);
                // Check for browser not found
                if (!browserForPath) {
                    return;
                }
                // Shortcut if we are using the main file browser
                if (browser === browserForPath) {
                    labShell.activateById(browser.id);
                    return;
                }
                else {
                    const areas = ['left', 'right'];
                    for (const area of areas) {
                        const it = labShell.widgets(area);
                        let widget = it.next();
                        while (widget) {
                            if (widget.contains(browserForPath)) {
                                labShell.activateById(widget.id);
                                return;
                            }
                            widget = it.next();
                        }
                    }
                }
            }
        });
        commands.addCommand(CommandIDs.hideBrowser, {
            execute: () => {
                const widget = tracker.currentWidget;
                if (widget && !widget.isHidden) {
                    labShell.collapseLeft();
                }
            }
        });
        // If the layout is a fresh session without saved data and not in single document
        // mode, open file browser.
        void labShell.restored.then(layout => {
            if (layout.fresh && labShell.mode !== 'single-document') {
                void commands.execute(CommandIDs.showBrowser, void 0);
            }
        });
        void Promise.all([app.restored, browser.model.restored]).then(() => {
            function maybeCreate() {
                // Create a launcher if there are no open items.
                if (labShell.isEmpty('main') &&
                    commands.hasCommand('launcher:create')) {
                    void Private.createLauncher(commands, browser);
                }
            }
            // When layout is modified, create a launcher if there are no open items.
            labShell.layoutModified.connect(() => {
                maybeCreate();
            });
            // Whether to automatically navigate to a document's current directory
            labShell.currentChanged.connect(async (_, change) => {
                if (browser.navigateToCurrentDirectory && change.newValue) {
                    const { newValue } = change;
                    const context = docManager.contextForWidget(newValue);
                    if (context) {
                        const { path } = context;
                        try {
                            await Private.navigateToPath(path, factory, translator);
                        }
                        catch (reason) {
                            console.warn(`${CommandIDs.goToPath} failed to open: ${path}`, reason);
                        }
                    }
                }
            });
            maybeCreate();
        });
    }
};
/**
 * The default file browser share-file plugin
 *
 * This extension adds a "Copy Shareable Link" command that generates a copy-
 * pastable URL. This url can be used to open a particular file in JupyterLab,
 * handy for emailing links or bookmarking for reference.
 *
 * If you need to change how this link is generated (for instance, to copy a
 * /user-redirect URL for JupyterHub), disable this plugin and replace it
 * with another implementation.
 */
const shareFile = {
    id: '@jupyterlab/filebrowser-extension:share-file',
    requires: [_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.IFileBrowserFactory, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__.ITranslator],
    autoStart: true,
    activate: (app, factory, translator) => {
        const trans = translator.load('jupyterlab');
        const { commands } = app;
        const { tracker } = factory;
        commands.addCommand(CommandIDs.copyShareableLink, {
            execute: () => {
                const widget = tracker.currentWidget;
                const model = widget === null || widget === void 0 ? void 0 : widget.selectedItems().next();
                if (!model) {
                    return;
                }
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Clipboard.copyToSystem(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getUrl({
                    workspace: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.defaultWorkspace,
                    treePath: model.path,
                    toShare: true
                }));
            },
            isVisible: () => !!tracker.currentWidget &&
                (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_10__.toArray)(tracker.currentWidget.selectedItems()).length === 1,
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.linkIcon.bindprops({ stylesheet: 'menuItem' }),
            label: trans.__('Copy Shareable Link')
        });
    }
};
/**
 * The "Open With" context menu.
 *
 * This is its own plugin in case you would like to disable this feature.
 * e.g. jupyter labextension disable @jupyterlab/filebrowser-extension:open-with
 */
const openWithPlugin = {
    id: '@jupyterlab/filebrowser-extension:open-with',
    requires: [_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.IFileBrowserFactory],
    autoStart: true,
    activate: (app, factory) => {
        const { docRegistry } = app;
        const { tracker } = factory;
        function updateOpenWithMenu(contextMenu) {
            var _a, _b;
            const openWith = (_b = (_a = contextMenu.menu.items.find(item => {
                var _a;
                return item.type === 'submenu' &&
                    ((_a = item.submenu) === null || _a === void 0 ? void 0 : _a.id) === 'jp-contextmenu-open-with';
            })) === null || _a === void 0 ? void 0 : _a.submenu) !== null && _b !== void 0 ? _b : null;
            if (!openWith) {
                return; // Bail early if the open with menu is not displayed
            }
            // clear the current menu items
            openWith.clearItems();
            // get the widget factories that could be used to open all of the items
            // in the current filebrowser selection
            const factories = tracker.currentWidget
                ? Private.OpenWith.intersection((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_10__.map)(tracker.currentWidget.selectedItems(), i => {
                    return Private.OpenWith.getFactories(docRegistry, i);
                }))
                : new Set();
            // make new menu items from the widget factories
            factories.forEach(factory => {
                openWith.addItem({
                    args: { factory: factory },
                    command: CommandIDs.open
                });
            });
        }
        app.contextMenu.opened.connect(updateOpenWithMenu);
    }
};
/**
 * The "Open in New Browser Tab" context menu.
 *
 * This is its own plugin in case you would like to disable this feature.
 * e.g. jupyter labextension disable @jupyterlab/filebrowser-extension:open-browser-tab
 *
 * Note: If disabling this, you may also want to disable:
 * @jupyterlab/docmanager-extension:open-browser-tab
 */
const openBrowserTabPlugin = {
    id: '@jupyterlab/filebrowser-extension:open-browser-tab',
    requires: [_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.IFileBrowserFactory, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__.ITranslator],
    autoStart: true,
    activate: (app, factory, translator) => {
        const { commands } = app;
        const trans = translator.load('jupyterlab');
        const { tracker } = factory;
        commands.addCommand(CommandIDs.openBrowserTab, {
            execute: () => {
                const widget = tracker.currentWidget;
                if (!widget) {
                    return;
                }
                return Promise.all((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_10__.toArray)((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_10__.map)(widget.selectedItems(), item => {
                    return commands.execute('docmanager:open-browser-tab', {
                        path: item.path
                    });
                })));
            },
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.addIcon.bindprops({ stylesheet: 'menuItem' }),
            label: trans.__('Open in New Browser Tab'),
            mnemonic: 0
        });
    }
};
/**
 * A plugin providing file upload status.
 */
const fileUploadStatus = {
    id: '@jupyterlab/filebrowser-extension:file-upload-status',
    autoStart: true,
    requires: [_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.IFileBrowserFactory, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__.ITranslator],
    optional: [_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_7__.IStatusBar],
    activate: (app, browser, translator, statusBar) => {
        if (!statusBar) {
            // Automatically disable if statusbar missing
            return;
        }
        const item = new _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.FileUploadStatus({
            tracker: browser.tracker,
            translator
        });
        statusBar.registerStatusItem('@jupyterlab/filebrowser-extension:file-upload-status', {
            item,
            align: 'middle',
            isActive: () => {
                return !!item.model && item.model.items.length > 0;
            },
            activeStateChanged: item.model.stateChanged
        });
    }
};
/**
 * A plugin to open files from remote URLs
 */
const openUrlPlugin = {
    id: '@jupyterlab/filebrowser-extension:open-url',
    autoStart: true,
    requires: [_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.IFileBrowserFactory, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette],
    activate: (app, factory, translator, palette) => {
        const { commands } = app;
        const trans = translator.load('jupyterlab');
        const { defaultBrowser: browser } = factory;
        const command = CommandIDs.openUrl;
        commands.addCommand(command, {
            label: args => args.url ? trans.__('Open %1', args.url) : trans.__('Open from URL…'),
            caption: args => args.url ? trans.__('Open %1', args.url) : trans.__('Open from URL'),
            execute: async (args) => {
                var _a, _b, _c;
                let url = (_a = args === null || args === void 0 ? void 0 : args.url) !== null && _a !== void 0 ? _a : '';
                if (!url) {
                    url = (_b = (await _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.InputDialog.getText({
                        label: trans.__('URL'),
                        placeholder: 'https://example.com/path/to/file',
                        title: trans.__('Open URL'),
                        okLabel: trans.__('Open')
                    })).value) !== null && _b !== void 0 ? _b : undefined;
                }
                if (!url) {
                    return;
                }
                let type = '';
                let blob;
                // fetch the file from the URL
                try {
                    const req = await fetch(url);
                    blob = await req.blob();
                    type = (_c = req.headers.get('Content-Type')) !== null && _c !== void 0 ? _c : '';
                }
                catch (reason) {
                    if (reason.response && reason.response.status !== 200) {
                        reason.message = trans.__('Could not open URL: %1', url);
                    }
                    return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showErrorMessage)(trans.__('Cannot fetch'), reason);
                }
                // upload the content of the file to the server
                try {
                    const name = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PathExt.basename(url);
                    const file = new File([blob], name, { type });
                    const model = await browser.model.upload(file);
                    return commands.execute('docmanager:open', {
                        path: model.path
                    });
                }
                catch (error) {
                    return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showErrorMessage)(trans._p('showErrorMessage', 'Upload Error'), error);
                }
            }
        });
        if (palette) {
            palette.addItem({
                command,
                category: trans.__('File Operations')
            });
        }
    }
};
/**
 * Add the main file browser commands to the application's command registry.
 */
function addCommands(app, factory, translator, settingRegistry, commandPalette) {
    const trans = translator.load('jupyterlab');
    const { docRegistry: registry, commands } = app;
    const { defaultBrowser: browser, tracker } = factory;
    commands.addCommand(CommandIDs.del, {
        execute: () => {
            const widget = tracker.currentWidget;
            if (widget) {
                return widget.delete();
            }
        },
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.closeIcon.bindprops({ stylesheet: 'menuItem' }),
        label: trans.__('Delete'),
        mnemonic: 0
    });
    commands.addCommand(CommandIDs.copy, {
        execute: () => {
            const widget = tracker.currentWidget;
            if (widget) {
                return widget.copy();
            }
        },
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.copyIcon.bindprops({ stylesheet: 'menuItem' }),
        label: trans.__('Copy'),
        mnemonic: 0
    });
    commands.addCommand(CommandIDs.cut, {
        execute: () => {
            const widget = tracker.currentWidget;
            if (widget) {
                return widget.cut();
            }
        },
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.cutIcon.bindprops({ stylesheet: 'menuItem' }),
        label: trans.__('Cut')
    });
    commands.addCommand(CommandIDs.duplicate, {
        execute: () => {
            const widget = tracker.currentWidget;
            if (widget) {
                return widget.duplicate();
            }
        },
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.copyIcon.bindprops({ stylesheet: 'menuItem' }),
        label: trans.__('Duplicate')
    });
    commands.addCommand(CommandIDs.goToPath, {
        execute: async (args) => {
            var _a;
            const path = args.path || '';
            const showBrowser = !((_a = args === null || args === void 0 ? void 0 : args.dontShowBrowser) !== null && _a !== void 0 ? _a : false);
            try {
                const item = await Private.navigateToPath(path, factory, translator);
                if (item.type !== 'directory' && showBrowser) {
                    const browserForPath = Private.getBrowserForPath(path, factory);
                    if (browserForPath) {
                        browserForPath.clearSelectedItems();
                        const parts = path.split('/');
                        const name = parts[parts.length - 1];
                        if (name) {
                            await browserForPath.selectItemByName(name);
                        }
                    }
                }
            }
            catch (reason) {
                console.warn(`${CommandIDs.goToPath} failed to go to: ${path}`, reason);
            }
            if (showBrowser) {
                return commands.execute(CommandIDs.showBrowser, { path });
            }
        }
    });
    commands.addCommand(CommandIDs.goUp, {
        label: 'go up',
        execute: async () => {
            const browserForPath = Private.getBrowserForPath('', factory);
            if (!browserForPath) {
                return;
            }
            const { model } = browserForPath;
            await model.restored;
            if (model.path === model.rootPath) {
                return;
            }
            try {
                await model.cd('..');
            }
            catch (reason) {
                console.warn(`${CommandIDs.goUp} failed to go to parent directory of ${model.path}`, reason);
            }
        }
    });
    commands.addCommand(CommandIDs.openPath, {
        label: args => args.path ? trans.__('Open %1', args.path) : trans.__('Open from Path…'),
        caption: args => args.path ? trans.__('Open %1', args.path) : trans.__('Open from path'),
        execute: async (args) => {
            var _a;
            let path;
            if (args === null || args === void 0 ? void 0 : args.path) {
                path = args.path;
            }
            else {
                path = (_a = (await _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.InputDialog.getText({
                    label: trans.__('Path'),
                    placeholder: '/path/relative/to/jlab/root',
                    title: trans.__('Open Path'),
                    okLabel: trans.__('Open')
                })).value) !== null && _a !== void 0 ? _a : undefined;
            }
            if (!path) {
                return;
            }
            try {
                const trailingSlash = path !== '/' && path.endsWith('/');
                if (trailingSlash) {
                    // The normal contents service errors on paths ending in slash
                    path = path.slice(0, path.length - 1);
                }
                const browserForPath = Private.getBrowserForPath(path, factory);
                const { services } = browserForPath.model.manager;
                const item = await services.contents.get(path, {
                    content: false
                });
                if (trailingSlash && item.type !== 'directory') {
                    throw new Error(`Path ${path}/ is not a directory`);
                }
                await commands.execute(CommandIDs.goToPath, {
                    path,
                    dontShowBrowser: args.dontShowBrowser
                });
                if (item.type === 'directory') {
                    return;
                }
                return commands.execute('docmanager:open', { path });
            }
            catch (reason) {
                if (reason.response && reason.response.status === 404) {
                    reason.message = trans.__('Could not find path: %1', path);
                }
                return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showErrorMessage)(trans.__('Cannot open'), reason);
            }
        }
    });
    // Add the openPath command to the command palette
    if (commandPalette) {
        commandPalette.addItem({
            command: CommandIDs.openPath,
            category: trans.__('File Operations')
        });
    }
    commands.addCommand(CommandIDs.open, {
        execute: args => {
            const factory = args['factory'] || void 0;
            const widget = tracker.currentWidget;
            if (!widget) {
                return;
            }
            const { contents } = widget.model.manager.services;
            return Promise.all((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_10__.toArray)((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_10__.map)(widget.selectedItems(), item => {
                if (item.type === 'directory') {
                    const localPath = contents.localPath(item.path);
                    return widget.model.cd(`/${localPath}`);
                }
                return commands.execute('docmanager:open', {
                    factory: factory,
                    path: item.path
                });
            })));
        },
        icon: args => {
            var _a;
            const factory = args['factory'] || void 0;
            if (factory) {
                // if an explicit factory is passed...
                const ft = registry.getFileType(factory);
                // ...set an icon if the factory name corresponds to a file type name...
                // ...or leave the icon blank
                return (_a = ft === null || ft === void 0 ? void 0 : ft.icon) === null || _a === void 0 ? void 0 : _a.bindprops({ stylesheet: 'menuItem' });
            }
            else {
                return _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.folderIcon.bindprops({ stylesheet: 'menuItem' });
            }
        },
        // FIXME-TRANS: Is this localizable?
        label: args => (args['label'] || args['factory'] || trans.__('Open')),
        mnemonic: 0
    });
    commands.addCommand(CommandIDs.paste, {
        execute: () => {
            const widget = tracker.currentWidget;
            if (widget) {
                return widget.paste();
            }
        },
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.pasteIcon.bindprops({ stylesheet: 'menuItem' }),
        label: trans.__('Paste'),
        mnemonic: 0
    });
    commands.addCommand(CommandIDs.createNewDirectory, {
        execute: () => {
            const widget = tracker.currentWidget;
            if (widget) {
                return widget.createNewDirectory();
            }
        },
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.newFolderIcon.bindprops({ stylesheet: 'menuItem' }),
        label: trans.__('New Folder')
    });
    commands.addCommand(CommandIDs.createNewFile, {
        execute: () => {
            const widget = tracker.currentWidget;
            if (widget) {
                return widget.createNewFile({ ext: 'txt' });
            }
        },
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.textEditorIcon.bindprops({ stylesheet: 'menuItem' }),
        label: trans.__('New File')
    });
    commands.addCommand(CommandIDs.createNewMarkdownFile, {
        execute: () => {
            const widget = tracker.currentWidget;
            if (widget) {
                return widget.createNewFile({ ext: 'md' });
            }
        },
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.markdownIcon.bindprops({ stylesheet: 'menuItem' }),
        label: trans.__('New Markdown File')
    });
    commands.addCommand(CommandIDs.refresh, {
        execute: args => {
            const widget = tracker.currentWidget;
            if (widget) {
                return widget.model.refresh();
            }
        },
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.refreshIcon.bindprops({ stylesheet: 'menuItem' }),
        caption: trans.__('Refresh the file browser.'),
        label: trans.__('Refresh File List')
    });
    commands.addCommand(CommandIDs.rename, {
        execute: args => {
            const widget = tracker.currentWidget;
            if (widget) {
                return widget.rename();
            }
        },
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.editIcon.bindprops({ stylesheet: 'menuItem' }),
        label: trans.__('Rename'),
        mnemonic: 0
    });
    commands.addCommand(CommandIDs.copyPath, {
        execute: () => {
            const widget = tracker.currentWidget;
            if (!widget) {
                return;
            }
            const item = widget.selectedItems().next();
            if (!item) {
                return;
            }
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Clipboard.copyToSystem(item.path);
        },
        isVisible: () => !!tracker.currentWidget &&
            tracker.currentWidget.selectedItems().next !== undefined,
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.fileIcon.bindprops({ stylesheet: 'menuItem' }),
        label: trans.__('Copy Path')
    });
    commands.addCommand(CommandIDs.shutdown, {
        execute: () => {
            const widget = tracker.currentWidget;
            if (widget) {
                return widget.shutdownKernels();
            }
        },
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.stopIcon.bindprops({ stylesheet: 'menuItem' }),
        label: trans.__('Shut Down Kernel')
    });
    commands.addCommand(CommandIDs.toggleBrowser, {
        execute: () => {
            if (browser.isHidden) {
                return commands.execute(CommandIDs.showBrowser, void 0);
            }
            return commands.execute(CommandIDs.hideBrowser, void 0);
        }
    });
    commands.addCommand(CommandIDs.createLauncher, {
        label: trans.__('New Launcher'),
        icon: args => (args.toolbar ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.addIcon : undefined),
        execute: (args) => {
            if (commands.hasCommand('launcher:create')) {
                return Private.createLauncher(commands, browser, args);
            }
        }
    });
    if (settingRegistry) {
        commands.addCommand(CommandIDs.toggleNavigateToCurrentDirectory, {
            label: trans.__('Show Active File in File Browser'),
            isToggled: () => browser.navigateToCurrentDirectory,
            execute: () => {
                const value = !browser.navigateToCurrentDirectory;
                const key = 'navigateToCurrentDirectory';
                return settingRegistry
                    .set('@jupyterlab/filebrowser-extension:browser', key, value)
                    .catch((reason) => {
                    console.error(`Failed to set navigateToCurrentDirectory setting`);
                });
            }
        });
    }
    commands.addCommand(CommandIDs.toggleLastModified, {
        label: trans.__('Show Last Modified Column'),
        isToggled: () => browser.showLastModifiedColumn,
        execute: () => {
            const value = !browser.showLastModifiedColumn;
            const key = 'showLastModifiedColumn';
            if (settingRegistry) {
                return settingRegistry
                    .set('@jupyterlab/filebrowser-extension:browser', key, value)
                    .catch((reason) => {
                    console.error(`Failed to set showLastModifiedColumn setting`);
                });
            }
        }
    });
    commands.addCommand(CommandIDs.toggleHiddenFiles, {
        label: trans.__('Show Hidden Files'),
        isToggled: () => browser.showHiddenFiles,
        isVisible: () => _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getOption('allow_hidden_files') === 'true',
        execute: () => {
            const value = !browser.showHiddenFiles;
            const key = 'showHiddenFiles';
            if (settingRegistry) {
                return settingRegistry
                    .set('@jupyterlab/filebrowser-extension:browser', key, value)
                    .catch((reason) => {
                    console.error(`Failed to set showHiddenFiles setting`);
                });
            }
        }
    });
    commands.addCommand(CommandIDs.search, {
        label: trans.__('Search on File Names'),
        execute: () => alert('search')
    });
    if (commandPalette) {
        commandPalette.addItem({
            command: CommandIDs.toggleNavigateToCurrentDirectory,
            category: trans.__('File Operations')
        });
    }
}
/**
 * A namespace for private module data.
 */
var Private;
(function (Private) {
    /**
     * Create a launcher for a given filebrowser widget.
     */
    function createLauncher(commands, browser, args) {
        const { model } = browser;
        return commands
            .execute('launcher:create', Object.assign({ cwd: model.path }, args))
            .then((launcher) => {
            model.pathChanged.connect(() => {
                if (launcher.content) {
                    launcher.content.cwd = model.path;
                }
            }, launcher);
            return launcher;
        });
    }
    Private.createLauncher = createLauncher;
    /**
     * Get browser object given file path.
     */
    function getBrowserForPath(path, factory) {
        const { defaultBrowser: browser, tracker } = factory;
        const driveName = browser.model.manager.services.contents.driveName(path);
        if (driveName) {
            const browserForPath = tracker.find(_path => _path.model.driveName === driveName);
            if (!browserForPath) {
                // warn that no filebrowser could be found for this driveName
                console.warn(`${CommandIDs.goToPath} failed to find filebrowser for path: ${path}`);
                return;
            }
            return browserForPath;
        }
        // if driveName is empty, assume the main filebrowser
        return browser;
    }
    Private.getBrowserForPath = getBrowserForPath;
    /**
     * Navigate to a path or the path containing a file.
     */
    async function navigateToPath(path, factory, translator) {
        const trans = translator.load('jupyterlab');
        const browserForPath = Private.getBrowserForPath(path, factory);
        if (!browserForPath) {
            throw new Error(trans.__('No browser for path'));
        }
        const { services } = browserForPath.model.manager;
        const localPath = services.contents.localPath(path);
        await services.ready;
        const item = await services.contents.get(path, { content: false });
        const { model } = browserForPath;
        await model.restored;
        if (item.type === 'directory') {
            await model.cd(`/${localPath}`);
        }
        else {
            await model.cd(`/${_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PathExt.dirname(localPath)}`);
        }
        return item;
    }
    Private.navigateToPath = navigateToPath;
    /**
     * Restores file browser state and overrides state if tree resolver resolves.
     */
    async function restoreBrowser(browser, commands, router, tree) {
        const restoring = 'jp-mod-restoring';
        browser.addClass(restoring);
        if (!router) {
            await browser.model.restore(browser.id);
            await browser.model.refresh();
            browser.removeClass(restoring);
            return;
        }
        const listener = async () => {
            router.routed.disconnect(listener);
            const paths = await (tree === null || tree === void 0 ? void 0 : tree.paths);
            if ((paths === null || paths === void 0 ? void 0 : paths.file) || (paths === null || paths === void 0 ? void 0 : paths.browser)) {
                // Restore the model without populating it.
                await browser.model.restore(browser.id, false);
                if (paths.file) {
                    await commands.execute(CommandIDs.openPath, {
                        path: paths.file,
                        dontShowBrowser: true
                    });
                }
                if (paths.browser) {
                    await commands.execute(CommandIDs.openPath, {
                        path: paths.browser,
                        dontShowBrowser: true
                    });
                }
            }
            else {
                await browser.model.restore(browser.id);
                await browser.model.refresh();
            }
            browser.removeClass(restoring);
        };
        router.routed.connect(listener);
    }
    Private.restoreBrowser = restoreBrowser;
})(Private || (Private = {}));
/**
 * Export the plugins as default.
 */
const plugins = [
    factory,
    browser,
    shareFile,
    fileUploadStatus,
    downloadPlugin,
    browserWidget,
    openWithPlugin,
    openBrowserTabPlugin,
    openUrlPlugin
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);
(function (Private) {
    let OpenWith;
    (function (OpenWith) {
        /**
         * Get the factories for the selected item
         *
         * @param docRegistry Application document registry
         * @param item Selected item model
         * @returns Available factories for the model
         */
        function getFactories(docRegistry, item) {
            var _a;
            const factories = docRegistry
                .preferredWidgetFactories(item.path)
                .map(f => f.name);
            const notebookFactory = (_a = docRegistry.getWidgetFactory('notebook')) === null || _a === void 0 ? void 0 : _a.name;
            if (notebookFactory &&
                item.type === 'notebook' &&
                factories.indexOf(notebookFactory) === -1) {
                factories.unshift(notebookFactory);
            }
            return factories;
        }
        OpenWith.getFactories = getFactories;
        /**
         * Return the intersection of multiple arrays.
         *
         * @param iter Iterator of arrays
         * @returns Set of common elements to all arrays
         */
        function intersection(iter) {
            // pop the first element of iter
            const first = iter.next();
            // first will be undefined if iter is empty
            if (!first) {
                return new Set();
            }
            // "initialize" the intersection from first
            const isect = new Set(first);
            // reduce over the remaining elements of iter
            return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_10__.reduce)(iter, (isect, subarr) => {
                // filter out all elements not present in both isect and subarr,
                // accumulate result in new set
                return new Set(subarr.filter(x => isect.has(x)));
            }, isect);
        }
        OpenWith.intersection = intersection;
    })(OpenWith = Private.OpenWith || (Private.OpenWith = {}));
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZmlsZWJyb3dzZXItZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNpSDtBQUN5RDtBQUM5RztBQUNGO0FBQzJGO0FBQ3RGO0FBQ2hCO0FBQ0k7QUFDRztBQUNtSztBQUMxSjtBQUNaO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx3RUFBbUIsRUFBRSxnRUFBVztBQUMvQztBQUNBLFFBQVEsb0VBQWU7QUFDdkIsUUFBUSx5RUFBZ0I7QUFDeEIsUUFBUSxxRUFBZ0I7QUFDeEIsUUFBUSxpRUFBZTtBQUN2QjtBQUNBLGNBQWMseUVBQW9CO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsdUVBQW9CO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix3REFBSTtBQUNoQztBQUNBLDJCQUEyQiw4RUFBK0I7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtB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InBhY2thZ2VzX2ZpbGVicm93c2VyLWV4dGVuc2lvbl9saWJfaW5kZXhfanMuOTZhYmQxNDMwNWZjNTQyMzhkYjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBmaWxlYnJvd3Nlci1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgSUxhYlNoZWxsLCBJTGF5b3V0UmVzdG9yZXIsIElSb3V0ZXIsIElUcmVlUGF0aFVwZGF0ZXIsIEp1cHl0ZXJGcm9udEVuZCB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uJztcbmltcG9ydCB7IENsaXBib2FyZCwgY3JlYXRlVG9vbGJhckZhY3RvcnksIElDb21tYW5kUGFsZXR0ZSwgSW5wdXREaWFsb2csIElUb29sYmFyV2lkZ2V0UmVnaXN0cnksIHNldFRvb2xiYXIsIHNob3dFcnJvck1lc3NhZ2UsIFdpZGdldFRyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBQYWdlQ29uZmlnLCBQYXRoRXh0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IElEb2N1bWVudE1hbmFnZXIgfSBmcm9tICdAanVweXRlcmxhYi9kb2NtYW5hZ2VyJztcbmltcG9ydCB7IEZpbGVCcm93c2VyLCBGaWxlVXBsb2FkU3RhdHVzLCBGaWx0ZXJGaWxlQnJvd3Nlck1vZGVsLCBJRmlsZUJyb3dzZXJDb21tYW5kcywgSUZpbGVCcm93c2VyRmFjdG9yeSwgVXBsb2FkZXIgfSBmcm9tICdAanVweXRlcmxhYi9maWxlYnJvd3Nlcic7XG5pbXBvcnQgeyBJU2V0dGluZ1JlZ2lzdHJ5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvc2V0dGluZ3JlZ2lzdHJ5JztcbmltcG9ydCB7IElTdGF0ZURCIH0gZnJvbSAnQGp1cHl0ZXJsYWIvc3RhdGVkYic7XG5pbXBvcnQgeyBJU3RhdHVzQmFyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvc3RhdHVzYmFyJztcbmltcG9ydCB7IElUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgYWRkSWNvbiwgY2xvc2VJY29uLCBjb3B5SWNvbiwgY3V0SWNvbiwgZG93bmxvYWRJY29uLCBlZGl0SWNvbiwgZmlsZUljb24sIGZvbGRlckljb24sIGxpbmtJY29uLCBtYXJrZG93bkljb24sIG5ld0ZvbGRlckljb24sIHBhc3RlSWNvbiwgcmVmcmVzaEljb24sIHN0b3BJY29uLCB0ZXh0RWRpdG9ySWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgZmluZCwgbWFwLCByZWR1Y2UsIHRvQXJyYXkgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG5pbXBvcnQgeyBDb21tYW5kUmVnaXN0cnkgfSBmcm9tICdAbHVtaW5vL2NvbW1hbmRzJztcbmNvbnN0IEZJTEVfQlJPV1NFUl9GQUNUT1JZID0gJ0ZpbGVCcm93c2VyJztcbi8qKlxuICogVGhlIGNvbW1hbmQgSURzIHVzZWQgYnkgdGhlIGZpbGUgYnJvd3NlciBwbHVnaW4uXG4gKi9cbnZhciBDb21tYW5kSURzO1xuKGZ1bmN0aW9uIChDb21tYW5kSURzKSB7XG4gICAgQ29tbWFuZElEcy5jb3B5ID0gJ2ZpbGVicm93c2VyOmNvcHknO1xuICAgIENvbW1hbmRJRHMuY29weURvd25sb2FkTGluayA9ICdmaWxlYnJvd3Nlcjpjb3B5LWRvd25sb2FkLWxpbmsnO1xuICAgIC8vIEZvciBtYWluIGJyb3dzZXIgb25seS5cbiAgICBDb21tYW5kSURzLmNyZWF0ZUxhdW5jaGVyID0gJ2ZpbGVicm93c2VyOmNyZWF0ZS1tYWluLWxhdW5jaGVyJztcbiAgICBDb21tYW5kSURzLmN1dCA9ICdmaWxlYnJvd3NlcjpjdXQnO1xuICAgIENvbW1hbmRJRHMuZGVsID0gJ2ZpbGVicm93c2VyOmRlbGV0ZSc7XG4gICAgQ29tbWFuZElEcy5kb3dubG9hZCA9ICdmaWxlYnJvd3Nlcjpkb3dubG9hZCc7XG4gICAgQ29tbWFuZElEcy5kdXBsaWNhdGUgPSAnZmlsZWJyb3dzZXI6ZHVwbGljYXRlJztcbiAgICAvLyBGb3IgbWFpbiBicm93c2VyIG9ubHkuXG4gICAgQ29tbWFuZElEcy5oaWRlQnJvd3NlciA9ICdmaWxlYnJvd3NlcjpoaWRlLW1haW4nO1xuICAgIENvbW1hbmRJRHMuZ29Ub1BhdGggPSAnZmlsZWJyb3dzZXI6Z28tdG8tcGF0aCc7XG4gICAgQ29tbWFuZElEcy5nb1VwID0gJ2ZpbGVicm93c2VyOmdvLXVwJztcbiAgICBDb21tYW5kSURzLm9wZW5QYXRoID0gJ2ZpbGVicm93c2VyOm9wZW4tcGF0aCc7XG4gICAgQ29tbWFuZElEcy5vcGVuVXJsID0gJ2ZpbGVicm93c2VyOm9wZW4tdXJsJztcbiAgICBDb21tYW5kSURzLm9wZW4gPSAnZmlsZWJyb3dzZXI6b3Blbic7XG4gICAgQ29tbWFuZElEcy5vcGVuQnJvd3NlclRhYiA9ICdmaWxlYnJvd3NlcjpvcGVuLWJyb3dzZXItdGFiJztcbiAgICBDb21tYW5kSURzLnBhc3RlID0gJ2ZpbGVicm93c2VyOnBhc3RlJztcbiAgICBDb21tYW5kSURzLmNyZWF0ZU5ld0RpcmVjdG9yeSA9ICdmaWxlYnJvd3NlcjpjcmVhdGUtbmV3LWRpcmVjdG9yeSc7XG4gICAgQ29tbWFuZElEcy5jcmVhdGVOZXdGaWxlID0gJ2ZpbGVicm93c2VyOmNyZWF0ZS1uZXctZmlsZSc7XG4gICAgQ29tbWFuZElEcy5jcmVhdGVOZXdNYXJrZG93bkZpbGUgPSAnZmlsZWJyb3dzZXI6Y3JlYXRlLW5ldy1tYXJrZG93bi1maWxlJztcbiAgICBDb21tYW5kSURzLnJlZnJlc2ggPSAnZmlsZWJyb3dzZXI6cmVmcmVzaCc7XG4gICAgQ29tbWFuZElEcy5yZW5hbWUgPSAnZmlsZWJyb3dzZXI6cmVuYW1lJztcbiAgICAvLyBGb3IgbWFpbiBicm93c2VyIG9ubHkuXG4gICAgQ29tbWFuZElEcy5jb3B5U2hhcmVhYmxlTGluayA9ICdmaWxlYnJvd3NlcjpzaGFyZS1tYWluJztcbiAgICAvLyBGb3IgbWFpbiBicm93c2VyIG9ubHkuXG4gICAgQ29tbWFuZElEcy5jb3B5UGF0aCA9ICdmaWxlYnJvd3Nlcjpjb3B5LXBhdGgnO1xuICAgIENvbW1hbmRJRHMuc2hvd0Jyb3dzZXIgPSAnZmlsZWJyb3dzZXI6YWN0aXZhdGUnO1xuICAgIENvbW1hbmRJRHMuc2h1dGRvd24gPSAnZmlsZWJyb3dzZXI6c2h1dGRvd24nO1xuICAgIC8vIEZvciBtYWluIGJyb3dzZXIgb25seS5cbiAgICBDb21tYW5kSURzLnRvZ2dsZUJyb3dzZXIgPSAnZmlsZWJyb3dzZXI6dG9nZ2xlLW1haW4nO1xuICAgIENvbW1hbmRJRHMudG9nZ2xlTmF2aWdhdGVUb0N1cnJlbnREaXJlY3RvcnkgPSAnZmlsZWJyb3dzZXI6dG9nZ2xlLW5hdmlnYXRlLXRvLWN1cnJlbnQtZGlyZWN0b3J5JztcbiAgICBDb21tYW5kSURzLnRvZ2dsZUxhc3RNb2RpZmllZCA9ICdmaWxlYnJvd3Nlcjp0b2dnbGUtbGFzdC1tb2RpZmllZCc7XG4gICAgQ29tbWFuZElEcy5zZWFyY2ggPSAnZmlsZWJyb3dzZXI6c2VhcmNoJztcbiAgICBDb21tYW5kSURzLnRvZ2dsZUhpZGRlbkZpbGVzID0gJ2ZpbGVicm93c2VyOnRvZ2dsZS1oaWRkZW4tZmlsZXMnO1xufSkoQ29tbWFuZElEcyB8fCAoQ29tbWFuZElEcyA9IHt9KSk7XG4vKipcbiAqIFRoZSBmaWxlIGJyb3dzZXIgbmFtZXNwYWNlIHRva2VuLlxuICovXG5jb25zdCBuYW1lc3BhY2UgPSAnZmlsZWJyb3dzZXInO1xuLyoqXG4gKiBUaGUgZGVmYXVsdCBmaWxlIGJyb3dzZXIgZXh0ZW5zaW9uLlxuICovXG5jb25zdCBicm93c2VyID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvZmlsZWJyb3dzZXItZXh0ZW5zaW9uOmJyb3dzZXInLFxuICAgIHJlcXVpcmVzOiBbSUZpbGVCcm93c2VyRmFjdG9yeSwgSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbXG4gICAgICAgIElMYXlvdXRSZXN0b3JlcixcbiAgICAgICAgSVNldHRpbmdSZWdpc3RyeSxcbiAgICAgICAgSVRyZWVQYXRoVXBkYXRlcixcbiAgICAgICAgSUNvbW1hbmRQYWxldHRlXG4gICAgXSxcbiAgICBwcm92aWRlczogSUZpbGVCcm93c2VyQ29tbWFuZHMsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIGFjdGl2YXRlOiBhc3luYyAoYXBwLCBmYWN0b3J5LCB0cmFuc2xhdG9yLCByZXN0b3Jlciwgc2V0dGluZ1JlZ2lzdHJ5LCB0cmVlUGF0aFVwZGF0ZXIsIGNvbW1hbmRQYWxldHRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGNvbnN0IGJyb3dzZXIgPSBmYWN0b3J5LmRlZmF1bHRCcm93c2VyO1xuICAgICAgICAvLyBMZXQgdGhlIGFwcGxpY2F0aW9uIHJlc3RvcmVyIHRyYWNrIHRoZSBwcmltYXJ5IGZpbGUgYnJvd3NlciAodGhhdCBpc1xuICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IGNyZWF0ZWQpIGZvciByZXN0b3JhdGlvbiBvZiBhcHBsaWNhdGlvbiBzdGF0ZSAoZS5nLiBzZXR0aW5nXG4gICAgICAgIC8vIHRoZSBmaWxlIGJyb3dzZXIgYXMgdGhlIGN1cnJlbnQgc2lkZSBiYXIgd2lkZ2V0KS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gQWxsIG90aGVyIGZpbGUgYnJvd3NlcnMgY3JlYXRlZCBieSB1c2luZyB0aGUgZmFjdG9yeSBmdW5jdGlvbiBhcmVcbiAgICAgICAgLy8gcmVzcG9uc2libGUgZm9yIHRoZWlyIG93biByZXN0b3JhdGlvbiBiZWhhdmlvciwgaWYgYW55LlxuICAgICAgICBpZiAocmVzdG9yZXIpIHtcbiAgICAgICAgICAgIHJlc3RvcmVyLmFkZChicm93c2VyLCBuYW1lc3BhY2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5hdmlnYXRlIHRvIHByZWZlcnJlZC1kaXIgdHJhaXQgaWYgZm91bmRcbiAgICAgICAgY29uc3QgcHJlZmVycmVkUGF0aCA9IFBhZ2VDb25maWcuZ2V0T3B0aW9uKCdwcmVmZXJyZWRQYXRoJyk7XG4gICAgICAgIGlmIChwcmVmZXJyZWRQYXRoKSB7XG4gICAgICAgICAgICBhd2FpdCBicm93c2VyLm1vZGVsLmNkKHByZWZlcnJlZFBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGFkZENvbW1hbmRzKGFwcCwgZmFjdG9yeSwgdHJhbnNsYXRvciwgc2V0dGluZ1JlZ2lzdHJ5LCBjb21tYW5kUGFsZXR0ZSk7XG4gICAgICAgIC8vIFNob3cgdGhlIGN1cnJlbnQgZmlsZSBicm93c2VyIHNob3J0Y3V0IGluIGl0cyB0aXRsZS5cbiAgICAgICAgY29uc3QgdXBkYXRlQnJvd3NlclRpdGxlID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmluZGluZyA9IGZpbmQoYXBwLmNvbW1hbmRzLmtleUJpbmRpbmdzLCBiID0+IGIuY29tbWFuZCA9PT0gQ29tbWFuZElEcy50b2dnbGVCcm93c2VyKTtcbiAgICAgICAgICAgIGlmIChiaW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga3MgPSBDb21tYW5kUmVnaXN0cnkuZm9ybWF0S2V5c3Ryb2tlKGJpbmRpbmcua2V5cy5qb2luKCcgJykpO1xuICAgICAgICAgICAgICAgIGJyb3dzZXIudGl0bGUuY2FwdGlvbiA9IHRyYW5zLl9fKCdGaWxlIEJyb3dzZXIgKCUxKScsIGtzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJyb3dzZXIudGl0bGUuY2FwdGlvbiA9IHRyYW5zLl9fKCdGaWxlIEJyb3dzZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdXBkYXRlQnJvd3NlclRpdGxlKCk7XG4gICAgICAgIGFwcC5jb21tYW5kcy5rZXlCaW5kaW5nQ2hhbmdlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZUJyb3dzZXJUaXRsZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHZvaWQgUHJvbWlzZS5hbGwoW2FwcC5yZXN0b3JlZCwgYnJvd3Nlci5tb2RlbC5yZXN0b3JlZF0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRyZWVQYXRoVXBkYXRlcikge1xuICAgICAgICAgICAgICAgIGJyb3dzZXIubW9kZWwucGF0aENoYW5nZWQuY29ubmVjdCgoc2VuZGVyLCBhcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWVQYXRoVXBkYXRlcihhcmdzLm5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBuYXZpZ2F0ZVRvQ3VycmVudERpcmVjdG9yeSA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IHNob3dMYXN0TW9kaWZpZWRDb2x1bW4gPSB0cnVlO1xuICAgICAgICAgICAgbGV0IHVzZUZ1enp5RmlsdGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBzaG93SGlkZGVuRmlsZXMgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5nUmVnaXN0cnkpIHtcbiAgICAgICAgICAgICAgICB2b2lkIHNldHRpbmdSZWdpc3RyeVxuICAgICAgICAgICAgICAgICAgICAubG9hZCgnQGp1cHl0ZXJsYWIvZmlsZWJyb3dzZXItZXh0ZW5zaW9uOmJyb3dzZXInKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihzZXR0aW5ncyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmNoYW5nZWQuY29ubmVjdChzZXR0aW5ncyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZVRvQ3VycmVudERpcmVjdG9yeSA9IHNldHRpbmdzLmdldCgnbmF2aWdhdGVUb0N1cnJlbnREaXJlY3RvcnknKS5jb21wb3NpdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicm93c2VyLm5hdmlnYXRlVG9DdXJyZW50RGlyZWN0b3J5ID0gbmF2aWdhdGVUb0N1cnJlbnREaXJlY3Rvcnk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZVRvQ3VycmVudERpcmVjdG9yeSA9IHNldHRpbmdzLmdldCgnbmF2aWdhdGVUb0N1cnJlbnREaXJlY3RvcnknKS5jb21wb3NpdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyb3dzZXIubmF2aWdhdGVUb0N1cnJlbnREaXJlY3RvcnkgPSBuYXZpZ2F0ZVRvQ3VycmVudERpcmVjdG9yeTtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuY2hhbmdlZC5jb25uZWN0KHNldHRpbmdzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dMYXN0TW9kaWZpZWRDb2x1bW4gPSBzZXR0aW5ncy5nZXQoJ3Nob3dMYXN0TW9kaWZpZWRDb2x1bW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb21wb3NpdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicm93c2VyLnNob3dMYXN0TW9kaWZpZWRDb2x1bW4gPSBzaG93TGFzdE1vZGlmaWVkQ29sdW1uO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0xhc3RNb2RpZmllZENvbHVtbiA9IHNldHRpbmdzLmdldCgnc2hvd0xhc3RNb2RpZmllZENvbHVtbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY29tcG9zaXRlO1xuICAgICAgICAgICAgICAgICAgICBicm93c2VyLnNob3dMYXN0TW9kaWZpZWRDb2x1bW4gPSBzaG93TGFzdE1vZGlmaWVkQ29sdW1uO1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5jaGFuZ2VkLmNvbm5lY3Qoc2V0dGluZ3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlRnV6enlGaWx0ZXIgPSBzZXR0aW5ncy5nZXQoJ3VzZUZ1enp5RmlsdGVyJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29tcG9zaXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJvd3Nlci51c2VGdXp6eUZpbHRlciA9IHVzZUZ1enp5RmlsdGVyO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdXNlRnV6enlGaWx0ZXIgPSBzZXR0aW5ncy5nZXQoJ3VzZUZ1enp5RmlsdGVyJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jb21wb3NpdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyb3dzZXIudXNlRnV6enlGaWx0ZXIgPSB1c2VGdXp6eUZpbHRlcjtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuY2hhbmdlZC5jb25uZWN0KHNldHRpbmdzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dIaWRkZW5GaWxlcyA9IHNldHRpbmdzLmdldCgnc2hvd0hpZGRlbkZpbGVzJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29tcG9zaXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJvd3Nlci5zaG93SGlkZGVuRmlsZXMgPSBzaG93SGlkZGVuRmlsZXM7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzaG93SGlkZGVuRmlsZXMgPSBzZXR0aW5ncy5nZXQoJ3Nob3dIaWRkZW5GaWxlcycpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY29tcG9zaXRlO1xuICAgICAgICAgICAgICAgICAgICBicm93c2VyLnNob3dIaWRkZW5GaWxlcyA9IHNob3dIaWRkZW5GaWxlcztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcbi8qKlxuICogVGhlIGRlZmF1bHQgZmlsZSBicm93c2VyIGZhY3RvcnkgcHJvdmlkZXIuXG4gKi9cbmNvbnN0IGZhY3RvcnkgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9maWxlYnJvd3Nlci1leHRlbnNpb246ZmFjdG9yeScsXG4gICAgcHJvdmlkZXM6IElGaWxlQnJvd3NlckZhY3RvcnksXG4gICAgcmVxdWlyZXM6IFtJRG9jdW1lbnRNYW5hZ2VyLCBJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtJU3RhdGVEQiwgSVJvdXRlciwgSnVweXRlckZyb250RW5kLklUcmVlUmVzb2x2ZXJdLFxuICAgIGFjdGl2YXRlOiBhc3luYyAoYXBwLCBkb2NNYW5hZ2VyLCB0cmFuc2xhdG9yLCBzdGF0ZSwgcm91dGVyLCB0cmVlKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMgfSA9IGFwcDtcbiAgICAgICAgY29uc3QgdHJhY2tlciA9IG5ldyBXaWRnZXRUcmFja2VyKHsgbmFtZXNwYWNlIH0pO1xuICAgICAgICBjb25zdCBjcmVhdGVGaWxlQnJvd3NlciA9IChpZCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9IG5ldyBGaWx0ZXJGaWxlQnJvd3Nlck1vZGVsKHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdG9yOiB0cmFuc2xhdG9yLFxuICAgICAgICAgICAgICAgIGF1dG86IChfYSA9IG9wdGlvbnMuYXV0bykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtYW5hZ2VyOiBkb2NNYW5hZ2VyLFxuICAgICAgICAgICAgICAgIGRyaXZlTmFtZTogb3B0aW9ucy5kcml2ZU5hbWUgfHwgJycsXG4gICAgICAgICAgICAgICAgcmVmcmVzaEludGVydmFsOiBvcHRpb25zLnJlZnJlc2hJbnRlcnZhbCxcbiAgICAgICAgICAgICAgICBzdGF0ZTogb3B0aW9ucy5zdGF0ZSA9PT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICA6IG9wdGlvbnMuc3RhdGUgfHwgc3RhdGUgfHwgdW5kZWZpbmVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3RvcmUgPSBvcHRpb25zLnJlc3RvcmU7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXQgPSBuZXcgRmlsZUJyb3dzZXIoeyBpZCwgbW9kZWwsIHJlc3RvcmUsIHRyYW5zbGF0b3IgfSk7XG4gICAgICAgICAgICAvLyBUcmFjayB0aGUgbmV3bHkgY3JlYXRlZCBmaWxlIGJyb3dzZXIuXG4gICAgICAgICAgICB2b2lkIHRyYWNrZXIuYWRkKHdpZGdldCk7XG4gICAgICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgICAgICB9O1xuICAgICAgICAvLyBNYW51YWxseSByZXN0b3JlIGFuZCBsb2FkIHRoZSBkZWZhdWx0IGZpbGUgYnJvd3Nlci5cbiAgICAgICAgY29uc3QgZGVmYXVsdEJyb3dzZXIgPSBjcmVhdGVGaWxlQnJvd3NlcignZmlsZWJyb3dzZXInLCB7XG4gICAgICAgICAgICBhdXRvOiBmYWxzZSxcbiAgICAgICAgICAgIHJlc3RvcmU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB2b2lkIFByaXZhdGUucmVzdG9yZUJyb3dzZXIoZGVmYXVsdEJyb3dzZXIsIGNvbW1hbmRzLCByb3V0ZXIsIHRyZWUpO1xuICAgICAgICByZXR1cm4geyBjcmVhdGVGaWxlQnJvd3NlciwgZGVmYXVsdEJyb3dzZXIsIHRyYWNrZXIgfTtcbiAgICB9XG59O1xuLyoqXG4gKiBBIHBsdWdpbiBwcm92aWRpbmcgZG93bmxvYWQgKyBjb3B5IGRvd25sb2FkIGxpbmsgY29tbWFuZHMgaW4gdGhlIGNvbnRleHQgbWVudS5cbiAqXG4gKiBEaXNhYmxpbmcgdGhpcyBwbHVnaW4gd2lsbCBOT1QgZGlzYWJsZSBkb3dubG9hZGluZyBmaWxlcyBmcm9tIHRoZSBzZXJ2ZXIuXG4gKiBVc2VycyB3aWxsIHN0aWxsIGJlIGFibGUgdG8gcmV0cmlldmUgZmlsZXMgZnJvbSB0aGUgZmlsZSBkb3dubG9hZCBVUkxzIHRoZVxuICogc2VydmVyIHByb3ZpZGVzLlxuICovXG5jb25zdCBkb3dubG9hZFBsdWdpbiA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2ZpbGVicm93c2VyLWV4dGVuc2lvbjpkb3dubG9hZCcsXG4gICAgcmVxdWlyZXM6IFtJRmlsZUJyb3dzZXJGYWN0b3J5LCBJVHJhbnNsYXRvcl0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBmYWN0b3J5LCB0cmFuc2xhdG9yKSA9PiB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMgfSA9IGFwcDtcbiAgICAgICAgY29uc3QgeyB0cmFja2VyIH0gPSBmYWN0b3J5O1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuZG93bmxvYWQsIHtcbiAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICAgICAgaWYgKHdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2lkZ2V0LmRvd25sb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGljb246IGRvd25sb2FkSWNvbi5iaW5kcHJvcHMoeyBzdHlsZXNoZWV0OiAnbWVudUl0ZW0nIH0pLFxuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdEb3dubG9hZCcpXG4gICAgICAgIH0pO1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuY29weURvd25sb2FkTGluaywge1xuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IHRyYWNrZXIuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgICAgICBpZiAoIXdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB3aWRnZXQubW9kZWwubWFuYWdlci5zZXJ2aWNlcy5jb250ZW50c1xuICAgICAgICAgICAgICAgICAgICAuZ2V0RG93bmxvYWRVcmwod2lkZ2V0LnNlbGVjdGVkSXRlbXMoKS5uZXh0KCkucGF0aClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgQ2xpcGJvYXJkLmNvcHlUb1N5c3RlbSh1cmwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGljb246IGNvcHlJY29uLmJpbmRwcm9wcyh7IHN0eWxlc2hlZXQ6ICdtZW51SXRlbScgfSksXG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0NvcHkgRG93bmxvYWQgTGluaycpLFxuICAgICAgICAgICAgbW5lbW9uaWM6IDBcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbi8qKlxuICogQSBwbHVnaW4gdG8gYWRkIHRoZSBmaWxlIGJyb3dzZXIgd2lkZ2V0IHRvIGFuIElMYWJTaGVsbFxuICovXG5jb25zdCBicm93c2VyV2lkZ2V0ID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvZmlsZWJyb3dzZXItZXh0ZW5zaW9uOndpZGdldCcsXG4gICAgcmVxdWlyZXM6IFtcbiAgICAgICAgSURvY3VtZW50TWFuYWdlcixcbiAgICAgICAgSUZpbGVCcm93c2VyRmFjdG9yeSxcbiAgICAgICAgSVNldHRpbmdSZWdpc3RyeSxcbiAgICAgICAgSVRvb2xiYXJXaWRnZXRSZWdpc3RyeSxcbiAgICAgICAgSVRyYW5zbGF0b3IsXG4gICAgICAgIElMYWJTaGVsbCxcbiAgICAgICAgSUZpbGVCcm93c2VyQ29tbWFuZHNcbiAgICBdLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgZG9jTWFuYWdlciwgZmFjdG9yeSwgc2V0dGluZ3MsIHRvb2xiYXJSZWdpc3RyeSwgdHJhbnNsYXRvciwgbGFiU2hlbGwpID0+IHtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kcyB9ID0gYXBwO1xuICAgICAgICBjb25zdCB7IGRlZmF1bHRCcm93c2VyOiBicm93c2VyLCB0cmFja2VyIH0gPSBmYWN0b3J5O1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICAvLyBTZXQgYXR0cmlidXRlcyB3aGVuIGFkZGluZyB0aGUgYnJvd3NlciB0byB0aGUgVUlcbiAgICAgICAgYnJvd3Nlci5ub2RlLnNldEF0dHJpYnV0ZSgncm9sZScsICdyZWdpb24nKTtcbiAgICAgICAgYnJvd3Nlci5ub2RlLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHRyYW5zLl9fKCdGaWxlIEJyb3dzZXIgU2VjdGlvbicpKTtcbiAgICAgICAgYnJvd3Nlci50aXRsZS5pY29uID0gZm9sZGVySWNvbjtcbiAgICAgICAgLy8gVG9vbGJhclxuICAgICAgICB0b29sYmFyUmVnaXN0cnkucmVnaXN0ZXJGYWN0b3J5KEZJTEVfQlJPV1NFUl9GQUNUT1JZLCAndXBsb2FkZXInLCAoYnJvd3NlcikgPT4gbmV3IFVwbG9hZGVyKHsgbW9kZWw6IGJyb3dzZXIubW9kZWwsIHRyYW5zbGF0b3IgfSkpO1xuICAgICAgICBzZXRUb29sYmFyKGJyb3dzZXIsIGNyZWF0ZVRvb2xiYXJGYWN0b3J5KHRvb2xiYXJSZWdpc3RyeSwgc2V0dGluZ3MsIEZJTEVfQlJPV1NFUl9GQUNUT1JZLCBicm93c2VyV2lkZ2V0LmlkLCB0cmFuc2xhdG9yKSk7XG4gICAgICAgIGxhYlNoZWxsLmFkZChicm93c2VyLCAnbGVmdCcsIHsgcmFuazogMTAwIH0pO1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuc2hvd0Jyb3dzZXIsIHtcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGggPSBhcmdzLnBhdGggfHwgJyc7XG4gICAgICAgICAgICAgICAgY29uc3QgYnJvd3NlckZvclBhdGggPSBQcml2YXRlLmdldEJyb3dzZXJGb3JQYXRoKHBhdGgsIGZhY3RvcnkpO1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBicm93c2VyIG5vdCBmb3VuZFxuICAgICAgICAgICAgICAgIGlmICghYnJvd3NlckZvclBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dCBpZiB3ZSBhcmUgdXNpbmcgdGhlIG1haW4gZmlsZSBicm93c2VyXG4gICAgICAgICAgICAgICAgaWYgKGJyb3dzZXIgPT09IGJyb3dzZXJGb3JQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYlNoZWxsLmFjdGl2YXRlQnlJZChicm93c2VyLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJlYXMgPSBbJ2xlZnQnLCAncmlnaHQnXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBhcmVhIG9mIGFyZWFzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdCA9IGxhYlNoZWxsLndpZGdldHMoYXJlYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0ID0gaXQubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aWRnZXQuY29udGFpbnMoYnJvd3NlckZvclBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYlNoZWxsLmFjdGl2YXRlQnlJZCh3aWRnZXQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldCA9IGl0Lm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5oaWRlQnJvd3Nlciwge1xuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IHRyYWNrZXIuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgICAgICBpZiAod2lkZ2V0ICYmICF3aWRnZXQuaXNIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiU2hlbGwuY29sbGFwc2VMZWZ0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gSWYgdGhlIGxheW91dCBpcyBhIGZyZXNoIHNlc3Npb24gd2l0aG91dCBzYXZlZCBkYXRhIGFuZCBub3QgaW4gc2luZ2xlIGRvY3VtZW50XG4gICAgICAgIC8vIG1vZGUsIG9wZW4gZmlsZSBicm93c2VyLlxuICAgICAgICB2b2lkIGxhYlNoZWxsLnJlc3RvcmVkLnRoZW4obGF5b3V0ID0+IHtcbiAgICAgICAgICAgIGlmIChsYXlvdXQuZnJlc2ggJiYgbGFiU2hlbGwubW9kZSAhPT0gJ3NpbmdsZS1kb2N1bWVudCcpIHtcbiAgICAgICAgICAgICAgICB2b2lkIGNvbW1hbmRzLmV4ZWN1dGUoQ29tbWFuZElEcy5zaG93QnJvd3Nlciwgdm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZvaWQgUHJvbWlzZS5hbGwoW2FwcC5yZXN0b3JlZCwgYnJvd3Nlci5tb2RlbC5yZXN0b3JlZF0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgZnVuY3Rpb24gbWF5YmVDcmVhdGUoKSB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbGF1bmNoZXIgaWYgdGhlcmUgYXJlIG5vIG9wZW4gaXRlbXMuXG4gICAgICAgICAgICAgICAgaWYgKGxhYlNoZWxsLmlzRW1wdHkoJ21haW4nKSAmJlxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kcy5oYXNDb21tYW5kKCdsYXVuY2hlcjpjcmVhdGUnKSkge1xuICAgICAgICAgICAgICAgICAgICB2b2lkIFByaXZhdGUuY3JlYXRlTGF1bmNoZXIoY29tbWFuZHMsIGJyb3dzZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFdoZW4gbGF5b3V0IGlzIG1vZGlmaWVkLCBjcmVhdGUgYSBsYXVuY2hlciBpZiB0aGVyZSBhcmUgbm8gb3BlbiBpdGVtcy5cbiAgICAgICAgICAgIGxhYlNoZWxsLmxheW91dE1vZGlmaWVkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG1heWJlQ3JlYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIFdoZXRoZXIgdG8gYXV0b21hdGljYWxseSBuYXZpZ2F0ZSB0byBhIGRvY3VtZW50J3MgY3VycmVudCBkaXJlY3RvcnlcbiAgICAgICAgICAgIGxhYlNoZWxsLmN1cnJlbnRDaGFuZ2VkLmNvbm5lY3QoYXN5bmMgKF8sIGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChicm93c2VyLm5hdmlnYXRlVG9DdXJyZW50RGlyZWN0b3J5ICYmIGNoYW5nZS5uZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IG5ld1ZhbHVlIH0gPSBjaGFuZ2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSBkb2NNYW5hZ2VyLmNvbnRleHRGb3JXaWRnZXQobmV3VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBwYXRoIH0gPSBjb250ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBQcml2YXRlLm5hdmlnYXRlVG9QYXRoKHBhdGgsIGZhY3RvcnksIHRyYW5zbGF0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKHJlYXNvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtDb21tYW5kSURzLmdvVG9QYXRofSBmYWlsZWQgdG8gb3BlbjogJHtwYXRofWAsIHJlYXNvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1heWJlQ3JlYXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4vKipcbiAqIFRoZSBkZWZhdWx0IGZpbGUgYnJvd3NlciBzaGFyZS1maWxlIHBsdWdpblxuICpcbiAqIFRoaXMgZXh0ZW5zaW9uIGFkZHMgYSBcIkNvcHkgU2hhcmVhYmxlIExpbmtcIiBjb21tYW5kIHRoYXQgZ2VuZXJhdGVzIGEgY29weS1cbiAqIHBhc3RhYmxlIFVSTC4gVGhpcyB1cmwgY2FuIGJlIHVzZWQgdG8gb3BlbiBhIHBhcnRpY3VsYXIgZmlsZSBpbiBKdXB5dGVyTGFiLFxuICogaGFuZHkgZm9yIGVtYWlsaW5nIGxpbmtzIG9yIGJvb2ttYXJraW5nIGZvciByZWZlcmVuY2UuXG4gKlxuICogSWYgeW91IG5lZWQgdG8gY2hhbmdlIGhvdyB0aGlzIGxpbmsgaXMgZ2VuZXJhdGVkIChmb3IgaW5zdGFuY2UsIHRvIGNvcHkgYVxuICogL3VzZXItcmVkaXJlY3QgVVJMIGZvciBKdXB5dGVySHViKSwgZGlzYWJsZSB0aGlzIHBsdWdpbiBhbmQgcmVwbGFjZSBpdFxuICogd2l0aCBhbm90aGVyIGltcGxlbWVudGF0aW9uLlxuICovXG5jb25zdCBzaGFyZUZpbGUgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9maWxlYnJvd3Nlci1leHRlbnNpb246c2hhcmUtZmlsZScsXG4gICAgcmVxdWlyZXM6IFtJRmlsZUJyb3dzZXJGYWN0b3J5LCBJVHJhbnNsYXRvcl0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBmYWN0b3J5LCB0cmFuc2xhdG9yKSA9PiB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMgfSA9IGFwcDtcbiAgICAgICAgY29uc3QgeyB0cmFja2VyIH0gPSBmYWN0b3J5O1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuY29weVNoYXJlYWJsZUxpbmssIHtcbiAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kZWwgPSB3aWRnZXQgPT09IG51bGwgfHwgd2lkZ2V0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aWRnZXQuc2VsZWN0ZWRJdGVtcygpLm5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIW1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgQ2xpcGJvYXJkLmNvcHlUb1N5c3RlbShQYWdlQ29uZmlnLmdldFVybCh7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtzcGFjZTogUGFnZUNvbmZpZy5kZWZhdWx0V29ya3NwYWNlLFxuICAgICAgICAgICAgICAgICAgICB0cmVlUGF0aDogbW9kZWwucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgdG9TaGFyZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1Zpc2libGU6ICgpID0+ICEhdHJhY2tlci5jdXJyZW50V2lkZ2V0ICYmXG4gICAgICAgICAgICAgICAgdG9BcnJheSh0cmFja2VyLmN1cnJlbnRXaWRnZXQuc2VsZWN0ZWRJdGVtcygpKS5sZW5ndGggPT09IDEsXG4gICAgICAgICAgICBpY29uOiBsaW5rSWNvbi5iaW5kcHJvcHMoeyBzdHlsZXNoZWV0OiAnbWVudUl0ZW0nIH0pLFxuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdDb3B5IFNoYXJlYWJsZSBMaW5rJylcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbi8qKlxuICogVGhlIFwiT3BlbiBXaXRoXCIgY29udGV4dCBtZW51LlxuICpcbiAqIFRoaXMgaXMgaXRzIG93biBwbHVnaW4gaW4gY2FzZSB5b3Ugd291bGQgbGlrZSB0byBkaXNhYmxlIHRoaXMgZmVhdHVyZS5cbiAqIGUuZy4ganVweXRlciBsYWJleHRlbnNpb24gZGlzYWJsZSBAanVweXRlcmxhYi9maWxlYnJvd3Nlci1leHRlbnNpb246b3Blbi13aXRoXG4gKi9cbmNvbnN0IG9wZW5XaXRoUGx1Z2luID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvZmlsZWJyb3dzZXItZXh0ZW5zaW9uOm9wZW4td2l0aCcsXG4gICAgcmVxdWlyZXM6IFtJRmlsZUJyb3dzZXJGYWN0b3J5XSxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgYWN0aXZhdGU6IChhcHAsIGZhY3RvcnkpID0+IHtcbiAgICAgICAgY29uc3QgeyBkb2NSZWdpc3RyeSB9ID0gYXBwO1xuICAgICAgICBjb25zdCB7IHRyYWNrZXIgfSA9IGZhY3Rvcnk7XG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZU9wZW5XaXRoTWVudShjb250ZXh0TWVudSkge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIGNvbnN0IG9wZW5XaXRoID0gKF9iID0gKF9hID0gY29udGV4dE1lbnUubWVudS5pdGVtcy5maW5kKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS50eXBlID09PSAnc3VibWVudScgJiZcbiAgICAgICAgICAgICAgICAgICAgKChfYSA9IGl0ZW0uc3VibWVudSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkKSA9PT0gJ2pwLWNvbnRleHRtZW51LW9wZW4td2l0aCc7XG4gICAgICAgICAgICB9KSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnN1Ym1lbnUpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG51bGw7XG4gICAgICAgICAgICBpZiAoIW9wZW5XaXRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBCYWlsIGVhcmx5IGlmIHRoZSBvcGVuIHdpdGggbWVudSBpcyBub3QgZGlzcGxheWVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjbGVhciB0aGUgY3VycmVudCBtZW51IGl0ZW1zXG4gICAgICAgICAgICBvcGVuV2l0aC5jbGVhckl0ZW1zKCk7XG4gICAgICAgICAgICAvLyBnZXQgdGhlIHdpZGdldCBmYWN0b3JpZXMgdGhhdCBjb3VsZCBiZSB1c2VkIHRvIG9wZW4gYWxsIG9mIHRoZSBpdGVtc1xuICAgICAgICAgICAgLy8gaW4gdGhlIGN1cnJlbnQgZmlsZWJyb3dzZXIgc2VsZWN0aW9uXG4gICAgICAgICAgICBjb25zdCBmYWN0b3JpZXMgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXRcbiAgICAgICAgICAgICAgICA/IFByaXZhdGUuT3BlbldpdGguaW50ZXJzZWN0aW9uKG1hcCh0cmFja2VyLmN1cnJlbnRXaWRnZXQuc2VsZWN0ZWRJdGVtcygpLCBpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByaXZhdGUuT3BlbldpdGguZ2V0RmFjdG9yaWVzKGRvY1JlZ2lzdHJ5LCBpKTtcbiAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICA6IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIC8vIG1ha2UgbmV3IG1lbnUgaXRlbXMgZnJvbSB0aGUgd2lkZ2V0IGZhY3Rvcmllc1xuICAgICAgICAgICAgZmFjdG9yaWVzLmZvckVhY2goZmFjdG9yeSA9PiB7XG4gICAgICAgICAgICAgICAgb3BlbldpdGguYWRkSXRlbSh7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IHsgZmFjdG9yeTogZmFjdG9yeSB9LFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLm9wZW5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGFwcC5jb250ZXh0TWVudS5vcGVuZWQuY29ubmVjdCh1cGRhdGVPcGVuV2l0aE1lbnUpO1xuICAgIH1cbn07XG4vKipcbiAqIFRoZSBcIk9wZW4gaW4gTmV3IEJyb3dzZXIgVGFiXCIgY29udGV4dCBtZW51LlxuICpcbiAqIFRoaXMgaXMgaXRzIG93biBwbHVnaW4gaW4gY2FzZSB5b3Ugd291bGQgbGlrZSB0byBkaXNhYmxlIHRoaXMgZmVhdHVyZS5cbiAqIGUuZy4ganVweXRlciBsYWJleHRlbnNpb24gZGlzYWJsZSBAanVweXRlcmxhYi9maWxlYnJvd3Nlci1leHRlbnNpb246b3Blbi1icm93c2VyLXRhYlxuICpcbiAqIE5vdGU6IElmIGRpc2FibGluZyB0aGlzLCB5b3UgbWF5IGFsc28gd2FudCB0byBkaXNhYmxlOlxuICogQGp1cHl0ZXJsYWIvZG9jbWFuYWdlci1leHRlbnNpb246b3Blbi1icm93c2VyLXRhYlxuICovXG5jb25zdCBvcGVuQnJvd3NlclRhYlBsdWdpbiA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2ZpbGVicm93c2VyLWV4dGVuc2lvbjpvcGVuLWJyb3dzZXItdGFiJyxcbiAgICByZXF1aXJlczogW0lGaWxlQnJvd3NlckZhY3RvcnksIElUcmFuc2xhdG9yXSxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgYWN0aXZhdGU6IChhcHAsIGZhY3RvcnksIHRyYW5zbGF0b3IpID0+IHtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kcyB9ID0gYXBwO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCB7IHRyYWNrZXIgfSA9IGZhY3Rvcnk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5vcGVuQnJvd3NlclRhYiwge1xuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IHRyYWNrZXIuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgICAgICBpZiAoIXdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbCh0b0FycmF5KG1hcCh3aWRnZXQuc2VsZWN0ZWRJdGVtcygpLCBpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmRzLmV4ZWN1dGUoJ2RvY21hbmFnZXI6b3Blbi1icm93c2VyLXRhYicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IGl0ZW0ucGF0aFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGljb246IGFkZEljb24uYmluZHByb3BzKHsgc3R5bGVzaGVldDogJ21lbnVJdGVtJyB9KSxcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnT3BlbiBpbiBOZXcgQnJvd3NlciBUYWInKSxcbiAgICAgICAgICAgIG1uZW1vbmljOiAwXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4vKipcbiAqIEEgcGx1Z2luIHByb3ZpZGluZyBmaWxlIHVwbG9hZCBzdGF0dXMuXG4gKi9cbmV4cG9ydCBjb25zdCBmaWxlVXBsb2FkU3RhdHVzID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvZmlsZWJyb3dzZXItZXh0ZW5zaW9uOmZpbGUtdXBsb2FkLXN0YXR1cycsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHJlcXVpcmVzOiBbSUZpbGVCcm93c2VyRmFjdG9yeSwgSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbSVN0YXR1c0Jhcl0sXG4gICAgYWN0aXZhdGU6IChhcHAsIGJyb3dzZXIsIHRyYW5zbGF0b3IsIHN0YXR1c0JhcikgPT4ge1xuICAgICAgICBpZiAoIXN0YXR1c0Jhcikge1xuICAgICAgICAgICAgLy8gQXV0b21hdGljYWxseSBkaXNhYmxlIGlmIHN0YXR1c2JhciBtaXNzaW5nXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbSA9IG5ldyBGaWxlVXBsb2FkU3RhdHVzKHtcbiAgICAgICAgICAgIHRyYWNrZXI6IGJyb3dzZXIudHJhY2tlcixcbiAgICAgICAgICAgIHRyYW5zbGF0b3JcbiAgICAgICAgfSk7XG4gICAgICAgIHN0YXR1c0Jhci5yZWdpc3RlclN0YXR1c0l0ZW0oJ0BqdXB5dGVybGFiL2ZpbGVicm93c2VyLWV4dGVuc2lvbjpmaWxlLXVwbG9hZC1zdGF0dXMnLCB7XG4gICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgYWxpZ246ICdtaWRkbGUnLFxuICAgICAgICAgICAgaXNBY3RpdmU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFpdGVtLm1vZGVsICYmIGl0ZW0ubW9kZWwuaXRlbXMubGVuZ3RoID4gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhY3RpdmVTdGF0ZUNoYW5nZWQ6IGl0ZW0ubW9kZWwuc3RhdGVDaGFuZ2VkXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4vKipcbiAqIEEgcGx1Z2luIHRvIG9wZW4gZmlsZXMgZnJvbSByZW1vdGUgVVJMc1xuICovXG5jb25zdCBvcGVuVXJsUGx1Z2luID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvZmlsZWJyb3dzZXItZXh0ZW5zaW9uOm9wZW4tdXJsJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJRmlsZUJyb3dzZXJGYWN0b3J5LCBJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtJQ29tbWFuZFBhbGV0dGVdLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBmYWN0b3J5LCB0cmFuc2xhdG9yLCBwYWxldHRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMgfSA9IGFwcDtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgeyBkZWZhdWx0QnJvd3NlcjogYnJvd3NlciB9ID0gZmFjdG9yeTtcbiAgICAgICAgY29uc3QgY29tbWFuZCA9IENvbW1hbmRJRHMub3BlblVybDtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChjb21tYW5kLCB7XG4gICAgICAgICAgICBsYWJlbDogYXJncyA9PiBhcmdzLnVybCA/IHRyYW5zLl9fKCdPcGVuICUxJywgYXJncy51cmwpIDogdHJhbnMuX18oJ09wZW4gZnJvbSBVUkzigKYnKSxcbiAgICAgICAgICAgIGNhcHRpb246IGFyZ3MgPT4gYXJncy51cmwgPyB0cmFucy5fXygnT3BlbiAlMScsIGFyZ3MudXJsKSA6IHRyYW5zLl9fKCdPcGVuIGZyb20gVVJMJyksXG4gICAgICAgICAgICBleGVjdXRlOiBhc3luYyAoYXJncykgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSAoX2EgPSBhcmdzID09PSBudWxsIHx8IGFyZ3MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFyZ3MudXJsKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcbiAgICAgICAgICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgICAgICAgICB1cmwgPSAoX2IgPSAoYXdhaXQgSW5wdXREaWFsb2cuZ2V0VGV4dCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1VSTCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdodHRwczovL2V4YW1wbGUuY29tL3BhdGgvdG8vZmlsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdHJhbnMuX18oJ09wZW4gVVJMJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBva0xhYmVsOiB0cmFucy5fXygnT3BlbicpXG4gICAgICAgICAgICAgICAgICAgIH0pKS52YWx1ZSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gJyc7XG4gICAgICAgICAgICAgICAgbGV0IGJsb2I7XG4gICAgICAgICAgICAgICAgLy8gZmV0Y2ggdGhlIGZpbGUgZnJvbSB0aGUgVVJMXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVxID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICAgICAgICAgICAgICAgICAgYmxvYiA9IGF3YWl0IHJlcS5ibG9iKCk7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSAoX2MgPSByZXEuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKHJlYXNvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVhc29uLnJlc3BvbnNlICYmIHJlYXNvbi5yZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhc29uLm1lc3NhZ2UgPSB0cmFucy5fXygnQ291bGQgbm90IG9wZW4gVVJMOiAlMScsIHVybCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNob3dFcnJvck1lc3NhZ2UodHJhbnMuX18oJ0Nhbm5vdCBmZXRjaCcpLCByZWFzb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyB1cGxvYWQgdGhlIGNvbnRlbnQgb2YgdGhlIGZpbGUgdG8gdGhlIHNlcnZlclxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBQYXRoRXh0LmJhc2VuYW1lKHVybCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBuZXcgRmlsZShbYmxvYl0sIG5hbWUsIHsgdHlwZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZWwgPSBhd2FpdCBicm93c2VyLm1vZGVsLnVwbG9hZChmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmRzLmV4ZWN1dGUoJ2RvY21hbmFnZXI6b3BlbicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IG1vZGVsLnBhdGhcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hvd0Vycm9yTWVzc2FnZSh0cmFucy5fcCgnc2hvd0Vycm9yTWVzc2FnZScsICdVcGxvYWQgRXJyb3InKSwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChwYWxldHRlKSB7XG4gICAgICAgICAgICBwYWxldHRlLmFkZEl0ZW0oe1xuICAgICAgICAgICAgICAgIGNvbW1hbmQsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHRyYW5zLl9fKCdGaWxlIE9wZXJhdGlvbnMnKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuLyoqXG4gKiBBZGQgdGhlIG1haW4gZmlsZSBicm93c2VyIGNvbW1hbmRzIHRvIHRoZSBhcHBsaWNhdGlvbidzIGNvbW1hbmQgcmVnaXN0cnkuXG4gKi9cbmZ1bmN0aW9uIGFkZENvbW1hbmRzKGFwcCwgZmFjdG9yeSwgdHJhbnNsYXRvciwgc2V0dGluZ1JlZ2lzdHJ5LCBjb21tYW5kUGFsZXR0ZSkge1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgY29uc3QgeyBkb2NSZWdpc3RyeTogcmVnaXN0cnksIGNvbW1hbmRzIH0gPSBhcHA7XG4gICAgY29uc3QgeyBkZWZhdWx0QnJvd3NlcjogYnJvd3NlciwgdHJhY2tlciB9ID0gZmFjdG9yeTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuZGVsLCB7XG4gICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IHRyYWNrZXIuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgIGlmICh3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2lkZ2V0LmRlbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpY29uOiBjbG9zZUljb24uYmluZHByb3BzKHsgc3R5bGVzaGVldDogJ21lbnVJdGVtJyB9KSxcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdEZWxldGUnKSxcbiAgICAgICAgbW5lbW9uaWM6IDBcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuY29weSwge1xuICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXQgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpZGdldC5jb3B5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGljb246IGNvcHlJY29uLmJpbmRwcm9wcyh7IHN0eWxlc2hlZXQ6ICdtZW51SXRlbScgfSksXG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnQ29weScpLFxuICAgICAgICBtbmVtb25pYzogMFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jdXQsIHtcbiAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgaWYgKHdpZGdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3aWRnZXQuY3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGljb246IGN1dEljb24uYmluZHByb3BzKHsgc3R5bGVzaGVldDogJ21lbnVJdGVtJyB9KSxcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdDdXQnKVxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5kdXBsaWNhdGUsIHtcbiAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgaWYgKHdpZGdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3aWRnZXQuZHVwbGljYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGljb246IGNvcHlJY29uLmJpbmRwcm9wcyh7IHN0eWxlc2hlZXQ6ICdtZW51SXRlbScgfSksXG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnRHVwbGljYXRlJylcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuZ29Ub1BhdGgsIHtcbiAgICAgICAgZXhlY3V0ZTogYXN5bmMgKGFyZ3MpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBhcmdzLnBhdGggfHwgJyc7XG4gICAgICAgICAgICBjb25zdCBzaG93QnJvd3NlciA9ICEoKF9hID0gYXJncyA9PT0gbnVsbCB8fCBhcmdzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhcmdzLmRvbnRTaG93QnJvd3NlcikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZmFsc2UpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gYXdhaXQgUHJpdmF0ZS5uYXZpZ2F0ZVRvUGF0aChwYXRoLCBmYWN0b3J5LCB0cmFuc2xhdG9yKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlICE9PSAnZGlyZWN0b3J5JyAmJiBzaG93QnJvd3Nlcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBicm93c2VyRm9yUGF0aCA9IFByaXZhdGUuZ2V0QnJvd3NlckZvclBhdGgocGF0aCwgZmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChicm93c2VyRm9yUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJvd3NlckZvclBhdGguY2xlYXJTZWxlY3RlZEl0ZW1zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0cyA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgYnJvd3NlckZvclBhdGguc2VsZWN0SXRlbUJ5TmFtZShuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChyZWFzb24pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7Q29tbWFuZElEcy5nb1RvUGF0aH0gZmFpbGVkIHRvIGdvIHRvOiAke3BhdGh9YCwgcmVhc29uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaG93QnJvd3Nlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kcy5leGVjdXRlKENvbW1hbmRJRHMuc2hvd0Jyb3dzZXIsIHsgcGF0aCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5nb1VwLCB7XG4gICAgICAgIGxhYmVsOiAnZ28gdXAnLFxuICAgICAgICBleGVjdXRlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBicm93c2VyRm9yUGF0aCA9IFByaXZhdGUuZ2V0QnJvd3NlckZvclBhdGgoJycsIGZhY3RvcnkpO1xuICAgICAgICAgICAgaWYgKCFicm93c2VyRm9yUGF0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgbW9kZWwgfSA9IGJyb3dzZXJGb3JQYXRoO1xuICAgICAgICAgICAgYXdhaXQgbW9kZWwucmVzdG9yZWQ7XG4gICAgICAgICAgICBpZiAobW9kZWwucGF0aCA9PT0gbW9kZWwucm9vdFBhdGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IG1vZGVsLmNkKCcuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtDb21tYW5kSURzLmdvVXB9IGZhaWxlZCB0byBnbyB0byBwYXJlbnQgZGlyZWN0b3J5IG9mICR7bW9kZWwucGF0aH1gLCByZWFzb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm9wZW5QYXRoLCB7XG4gICAgICAgIGxhYmVsOiBhcmdzID0+IGFyZ3MucGF0aCA/IHRyYW5zLl9fKCdPcGVuICUxJywgYXJncy5wYXRoKSA6IHRyYW5zLl9fKCdPcGVuIGZyb20gUGF0aOKApicpLFxuICAgICAgICBjYXB0aW9uOiBhcmdzID0+IGFyZ3MucGF0aCA/IHRyYW5zLl9fKCdPcGVuICUxJywgYXJncy5wYXRoKSA6IHRyYW5zLl9fKCdPcGVuIGZyb20gcGF0aCcpLFxuICAgICAgICBleGVjdXRlOiBhc3luYyAoYXJncykgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgbGV0IHBhdGg7XG4gICAgICAgICAgICBpZiAoYXJncyA9PT0gbnVsbCB8fCBhcmdzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhcmdzLnBhdGgpIHtcbiAgICAgICAgICAgICAgICBwYXRoID0gYXJncy5wYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IChfYSA9IChhd2FpdCBJbnB1dERpYWxvZy5nZXRUZXh0KHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdQYXRoJyksXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnL3BhdGgvcmVsYXRpdmUvdG8vamxhYi9yb290JyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdPcGVuIFBhdGgnKSxcbiAgICAgICAgICAgICAgICAgICAgb2tMYWJlbDogdHJhbnMuX18oJ09wZW4nKVxuICAgICAgICAgICAgICAgIH0pKS52YWx1ZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwYXRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFpbGluZ1NsYXNoID0gcGF0aCAhPT0gJy8nICYmIHBhdGguZW5kc1dpdGgoJy8nKTtcbiAgICAgICAgICAgICAgICBpZiAodHJhaWxpbmdTbGFzaCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbm9ybWFsIGNvbnRlbnRzIHNlcnZpY2UgZXJyb3JzIG9uIHBhdGhzIGVuZGluZyBpbiBzbGFzaFxuICAgICAgICAgICAgICAgICAgICBwYXRoID0gcGF0aC5zbGljZSgwLCBwYXRoLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBicm93c2VyRm9yUGF0aCA9IFByaXZhdGUuZ2V0QnJvd3NlckZvclBhdGgocGF0aCwgZmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBzZXJ2aWNlcyB9ID0gYnJvd3NlckZvclBhdGgubW9kZWwubWFuYWdlcjtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gYXdhaXQgc2VydmljZXMuY29udGVudHMuZ2V0KHBhdGgsIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodHJhaWxpbmdTbGFzaCAmJiBpdGVtLnR5cGUgIT09ICdkaXJlY3RvcnknKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUGF0aCAke3BhdGh9LyBpcyBub3QgYSBkaXJlY3RvcnlgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXdhaXQgY29tbWFuZHMuZXhlY3V0ZShDb21tYW5kSURzLmdvVG9QYXRoLCB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICAgICAgICAgIGRvbnRTaG93QnJvd3NlcjogYXJncy5kb250U2hvd0Jyb3dzZXJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnZGlyZWN0b3J5Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kcy5leGVjdXRlKCdkb2NtYW5hZ2VyOm9wZW4nLCB7IHBhdGggfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlYXNvbi5yZXNwb25zZSAmJiByZWFzb24ucmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVhc29uLm1lc3NhZ2UgPSB0cmFucy5fXygnQ291bGQgbm90IGZpbmQgcGF0aDogJTEnLCBwYXRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNob3dFcnJvck1lc3NhZ2UodHJhbnMuX18oJ0Nhbm5vdCBvcGVuJyksIHJlYXNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBBZGQgdGhlIG9wZW5QYXRoIGNvbW1hbmQgdG8gdGhlIGNvbW1hbmQgcGFsZXR0ZVxuICAgIGlmIChjb21tYW5kUGFsZXR0ZSkge1xuICAgICAgICBjb21tYW5kUGFsZXR0ZS5hZGRJdGVtKHtcbiAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMub3BlblBhdGgsXG4gICAgICAgICAgICBjYXRlZ29yeTogdHJhbnMuX18oJ0ZpbGUgT3BlcmF0aW9ucycpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMub3Blbiwge1xuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZhY3RvcnkgPSBhcmdzWydmYWN0b3J5J10gfHwgdm9pZCAwO1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgaWYgKCF3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IGNvbnRlbnRzIH0gPSB3aWRnZXQubW9kZWwubWFuYWdlci5zZXJ2aWNlcztcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbCh0b0FycmF5KG1hcCh3aWRnZXQuc2VsZWN0ZWRJdGVtcygpLCBpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnZGlyZWN0b3J5Jykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2NhbFBhdGggPSBjb250ZW50cy5sb2NhbFBhdGgoaXRlbS5wYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpZGdldC5tb2RlbC5jZChgLyR7bG9jYWxQYXRofWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZHMuZXhlY3V0ZSgnZG9jbWFuYWdlcjpvcGVuJywge1xuICAgICAgICAgICAgICAgICAgICBmYWN0b3J5OiBmYWN0b3J5LFxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBpdGVtLnBhdGhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGljb246IGFyZ3MgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgZmFjdG9yeSA9IGFyZ3NbJ2ZhY3RvcnknXSB8fCB2b2lkIDA7XG4gICAgICAgICAgICBpZiAoZmFjdG9yeSkge1xuICAgICAgICAgICAgICAgIC8vIGlmIGFuIGV4cGxpY2l0IGZhY3RvcnkgaXMgcGFzc2VkLi4uXG4gICAgICAgICAgICAgICAgY29uc3QgZnQgPSByZWdpc3RyeS5nZXRGaWxlVHlwZShmYWN0b3J5KTtcbiAgICAgICAgICAgICAgICAvLyAuLi5zZXQgYW4gaWNvbiBpZiB0aGUgZmFjdG9yeSBuYW1lIGNvcnJlc3BvbmRzIHRvIGEgZmlsZSB0eXBlIG5hbWUuLi5cbiAgICAgICAgICAgICAgICAvLyAuLi5vciBsZWF2ZSB0aGUgaWNvbiBibGFua1xuICAgICAgICAgICAgICAgIHJldHVybiAoX2EgPSBmdCA9PT0gbnVsbCB8fCBmdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZnQuaWNvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmJpbmRwcm9wcyh7IHN0eWxlc2hlZXQ6ICdtZW51SXRlbScgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9sZGVySWNvbi5iaW5kcHJvcHMoeyBzdHlsZXNoZWV0OiAnbWVudUl0ZW0nIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyBGSVhNRS1UUkFOUzogSXMgdGhpcyBsb2NhbGl6YWJsZT9cbiAgICAgICAgbGFiZWw6IGFyZ3MgPT4gKGFyZ3NbJ2xhYmVsJ10gfHwgYXJnc1snZmFjdG9yeSddIHx8IHRyYW5zLl9fKCdPcGVuJykpLFxuICAgICAgICBtbmVtb25pYzogMFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5wYXN0ZSwge1xuICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXQgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpZGdldC5wYXN0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpY29uOiBwYXN0ZUljb24uYmluZHByb3BzKHsgc3R5bGVzaGVldDogJ21lbnVJdGVtJyB9KSxcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdQYXN0ZScpLFxuICAgICAgICBtbmVtb25pYzogMFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jcmVhdGVOZXdEaXJlY3RvcnksIHtcbiAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgaWYgKHdpZGdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3aWRnZXQuY3JlYXRlTmV3RGlyZWN0b3J5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGljb246IG5ld0ZvbGRlckljb24uYmluZHByb3BzKHsgc3R5bGVzaGVldDogJ21lbnVJdGVtJyB9KSxcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdOZXcgRm9sZGVyJylcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuY3JlYXRlTmV3RmlsZSwge1xuICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXQgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpZGdldC5jcmVhdGVOZXdGaWxlKHsgZXh0OiAndHh0JyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaWNvbjogdGV4dEVkaXRvckljb24uYmluZHByb3BzKHsgc3R5bGVzaGVldDogJ21lbnVJdGVtJyB9KSxcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdOZXcgRmlsZScpXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmNyZWF0ZU5ld01hcmtkb3duRmlsZSwge1xuICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXQgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpZGdldC5jcmVhdGVOZXdGaWxlKHsgZXh0OiAnbWQnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpY29uOiBtYXJrZG93bkljb24uYmluZHByb3BzKHsgc3R5bGVzaGVldDogJ21lbnVJdGVtJyB9KSxcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdOZXcgTWFya2Rvd24gRmlsZScpXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnJlZnJlc2gsIHtcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXQgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpZGdldC5tb2RlbC5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGljb246IHJlZnJlc2hJY29uLmJpbmRwcm9wcyh7IHN0eWxlc2hlZXQ6ICdtZW51SXRlbScgfSksXG4gICAgICAgIGNhcHRpb246IHRyYW5zLl9fKCdSZWZyZXNoIHRoZSBmaWxlIGJyb3dzZXIuJyksXG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnUmVmcmVzaCBGaWxlIExpc3QnKVxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5yZW5hbWUsIHtcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXQgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpZGdldC5yZW5hbWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaWNvbjogZWRpdEljb24uYmluZHByb3BzKHsgc3R5bGVzaGVldDogJ21lbnVJdGVtJyB9KSxcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdSZW5hbWUnKSxcbiAgICAgICAgbW5lbW9uaWM6IDBcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuY29weVBhdGgsIHtcbiAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgaWYgKCF3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gd2lkZ2V0LnNlbGVjdGVkSXRlbXMoKS5uZXh0KCk7XG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBDbGlwYm9hcmQuY29weVRvU3lzdGVtKGl0ZW0ucGF0aCk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzVmlzaWJsZTogKCkgPT4gISF0cmFja2VyLmN1cnJlbnRXaWRnZXQgJiZcbiAgICAgICAgICAgIHRyYWNrZXIuY3VycmVudFdpZGdldC5zZWxlY3RlZEl0ZW1zKCkubmV4dCAhPT0gdW5kZWZpbmVkLFxuICAgICAgICBpY29uOiBmaWxlSWNvbi5iaW5kcHJvcHMoeyBzdHlsZXNoZWV0OiAnbWVudUl0ZW0nIH0pLFxuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0NvcHkgUGF0aCcpXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnNodXRkb3duLCB7XG4gICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IHRyYWNrZXIuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgIGlmICh3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2lkZ2V0LnNodXRkb3duS2VybmVscygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpY29uOiBzdG9wSWNvbi5iaW5kcHJvcHMoeyBzdHlsZXNoZWV0OiAnbWVudUl0ZW0nIH0pLFxuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1NodXQgRG93biBLZXJuZWwnKVxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy50b2dnbGVCcm93c2VyLCB7XG4gICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgIGlmIChicm93c2VyLmlzSGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmRzLmV4ZWN1dGUoQ29tbWFuZElEcy5zaG93QnJvd3Nlciwgdm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21tYW5kcy5leGVjdXRlKENvbW1hbmRJRHMuaGlkZUJyb3dzZXIsIHZvaWQgMCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuY3JlYXRlTGF1bmNoZXIsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdOZXcgTGF1bmNoZXInKSxcbiAgICAgICAgaWNvbjogYXJncyA9PiAoYXJncy50b29sYmFyID8gYWRkSWNvbiA6IHVuZGVmaW5lZCksXG4gICAgICAgIGV4ZWN1dGU6IChhcmdzKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29tbWFuZHMuaGFzQ29tbWFuZCgnbGF1bmNoZXI6Y3JlYXRlJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJpdmF0ZS5jcmVhdGVMYXVuY2hlcihjb21tYW5kcywgYnJvd3NlciwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoc2V0dGluZ1JlZ2lzdHJ5KSB7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy50b2dnbGVOYXZpZ2F0ZVRvQ3VycmVudERpcmVjdG9yeSwge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdTaG93IEFjdGl2ZSBGaWxlIGluIEZpbGUgQnJvd3NlcicpLFxuICAgICAgICAgICAgaXNUb2dnbGVkOiAoKSA9PiBicm93c2VyLm5hdmlnYXRlVG9DdXJyZW50RGlyZWN0b3J5LFxuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gIWJyb3dzZXIubmF2aWdhdGVUb0N1cnJlbnREaXJlY3Rvcnk7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gJ25hdmlnYXRlVG9DdXJyZW50RGlyZWN0b3J5JztcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0dGluZ1JlZ2lzdHJ5XG4gICAgICAgICAgICAgICAgICAgIC5zZXQoJ0BqdXB5dGVybGFiL2ZpbGVicm93c2VyLWV4dGVuc2lvbjpicm93c2VyJywga2V5LCB2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNldCBuYXZpZ2F0ZVRvQ3VycmVudERpcmVjdG9yeSBzZXR0aW5nYCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMudG9nZ2xlTGFzdE1vZGlmaWVkLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnU2hvdyBMYXN0IE1vZGlmaWVkIENvbHVtbicpLFxuICAgICAgICBpc1RvZ2dsZWQ6ICgpID0+IGJyb3dzZXIuc2hvd0xhc3RNb2RpZmllZENvbHVtbixcbiAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAhYnJvd3Nlci5zaG93TGFzdE1vZGlmaWVkQ29sdW1uO1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gJ3Nob3dMYXN0TW9kaWZpZWRDb2x1bW4nO1xuICAgICAgICAgICAgaWYgKHNldHRpbmdSZWdpc3RyeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXR0aW5nUmVnaXN0cnlcbiAgICAgICAgICAgICAgICAgICAgLnNldCgnQGp1cHl0ZXJsYWIvZmlsZWJyb3dzZXItZXh0ZW5zaW9uOmJyb3dzZXInLCBrZXksIHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2V0IHNob3dMYXN0TW9kaWZpZWRDb2x1bW4gc2V0dGluZ2ApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnRvZ2dsZUhpZGRlbkZpbGVzLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnU2hvdyBIaWRkZW4gRmlsZXMnKSxcbiAgICAgICAgaXNUb2dnbGVkOiAoKSA9PiBicm93c2VyLnNob3dIaWRkZW5GaWxlcyxcbiAgICAgICAgaXNWaXNpYmxlOiAoKSA9PiBQYWdlQ29uZmlnLmdldE9wdGlvbignYWxsb3dfaGlkZGVuX2ZpbGVzJykgPT09ICd0cnVlJyxcbiAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAhYnJvd3Nlci5zaG93SGlkZGVuRmlsZXM7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSAnc2hvd0hpZGRlbkZpbGVzJztcbiAgICAgICAgICAgIGlmIChzZXR0aW5nUmVnaXN0cnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0dGluZ1JlZ2lzdHJ5XG4gICAgICAgICAgICAgICAgICAgIC5zZXQoJ0BqdXB5dGVybGFiL2ZpbGVicm93c2VyLWV4dGVuc2lvbjpicm93c2VyJywga2V5LCB2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNldCBzaG93SGlkZGVuRmlsZXMgc2V0dGluZ2ApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnNlYXJjaCwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1NlYXJjaCBvbiBGaWxlIE5hbWVzJyksXG4gICAgICAgIGV4ZWN1dGU6ICgpID0+IGFsZXJ0KCdzZWFyY2gnKVxuICAgIH0pO1xuICAgIGlmIChjb21tYW5kUGFsZXR0ZSkge1xuICAgICAgICBjb21tYW5kUGFsZXR0ZS5hZGRJdGVtKHtcbiAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMudG9nZ2xlTmF2aWdhdGVUb0N1cnJlbnREaXJlY3RvcnksXG4gICAgICAgICAgICBjYXRlZ29yeTogdHJhbnMuX18oJ0ZpbGUgT3BlcmF0aW9ucycpXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIHByaXZhdGUgbW9kdWxlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbGF1bmNoZXIgZm9yIGEgZ2l2ZW4gZmlsZWJyb3dzZXIgd2lkZ2V0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUxhdW5jaGVyKGNvbW1hbmRzLCBicm93c2VyLCBhcmdzKSB7XG4gICAgICAgIGNvbnN0IHsgbW9kZWwgfSA9IGJyb3dzZXI7XG4gICAgICAgIHJldHVybiBjb21tYW5kc1xuICAgICAgICAgICAgLmV4ZWN1dGUoJ2xhdW5jaGVyOmNyZWF0ZScsIE9iamVjdC5hc3NpZ24oeyBjd2Q6IG1vZGVsLnBhdGggfSwgYXJncykpXG4gICAgICAgICAgICAudGhlbigobGF1bmNoZXIpID0+IHtcbiAgICAgICAgICAgIG1vZGVsLnBhdGhDaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChsYXVuY2hlci5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGxhdW5jaGVyLmNvbnRlbnQuY3dkID0gbW9kZWwucGF0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBsYXVuY2hlcik7XG4gICAgICAgICAgICByZXR1cm4gbGF1bmNoZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBQcml2YXRlLmNyZWF0ZUxhdW5jaGVyID0gY3JlYXRlTGF1bmNoZXI7XG4gICAgLyoqXG4gICAgICogR2V0IGJyb3dzZXIgb2JqZWN0IGdpdmVuIGZpbGUgcGF0aC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRCcm93c2VyRm9yUGF0aChwYXRoLCBmYWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IHsgZGVmYXVsdEJyb3dzZXI6IGJyb3dzZXIsIHRyYWNrZXIgfSA9IGZhY3Rvcnk7XG4gICAgICAgIGNvbnN0IGRyaXZlTmFtZSA9IGJyb3dzZXIubW9kZWwubWFuYWdlci5zZXJ2aWNlcy5jb250ZW50cy5kcml2ZU5hbWUocGF0aCk7XG4gICAgICAgIGlmIChkcml2ZU5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGJyb3dzZXJGb3JQYXRoID0gdHJhY2tlci5maW5kKF9wYXRoID0+IF9wYXRoLm1vZGVsLmRyaXZlTmFtZSA9PT0gZHJpdmVOYW1lKTtcbiAgICAgICAgICAgIGlmICghYnJvd3NlckZvclBhdGgpIHtcbiAgICAgICAgICAgICAgICAvLyB3YXJuIHRoYXQgbm8gZmlsZWJyb3dzZXIgY291bGQgYmUgZm91bmQgZm9yIHRoaXMgZHJpdmVOYW1lXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke0NvbW1hbmRJRHMuZ29Ub1BhdGh9IGZhaWxlZCB0byBmaW5kIGZpbGVicm93c2VyIGZvciBwYXRoOiAke3BhdGh9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGJyb3dzZXJGb3JQYXRoO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIGRyaXZlTmFtZSBpcyBlbXB0eSwgYXNzdW1lIHRoZSBtYWluIGZpbGVicm93c2VyXG4gICAgICAgIHJldHVybiBicm93c2VyO1xuICAgIH1cbiAgICBQcml2YXRlLmdldEJyb3dzZXJGb3JQYXRoID0gZ2V0QnJvd3NlckZvclBhdGg7XG4gICAgLyoqXG4gICAgICogTmF2aWdhdGUgdG8gYSBwYXRoIG9yIHRoZSBwYXRoIGNvbnRhaW5pbmcgYSBmaWxlLlxuICAgICAqL1xuICAgIGFzeW5jIGZ1bmN0aW9uIG5hdmlnYXRlVG9QYXRoKHBhdGgsIGZhY3RvcnksIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgYnJvd3NlckZvclBhdGggPSBQcml2YXRlLmdldEJyb3dzZXJGb3JQYXRoKHBhdGgsIGZhY3RvcnkpO1xuICAgICAgICBpZiAoIWJyb3dzZXJGb3JQYXRoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodHJhbnMuX18oJ05vIGJyb3dzZXIgZm9yIHBhdGgnKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBzZXJ2aWNlcyB9ID0gYnJvd3NlckZvclBhdGgubW9kZWwubWFuYWdlcjtcbiAgICAgICAgY29uc3QgbG9jYWxQYXRoID0gc2VydmljZXMuY29udGVudHMubG9jYWxQYXRoKHBhdGgpO1xuICAgICAgICBhd2FpdCBzZXJ2aWNlcy5yZWFkeTtcbiAgICAgICAgY29uc3QgaXRlbSA9IGF3YWl0IHNlcnZpY2VzLmNvbnRlbnRzLmdldChwYXRoLCB7IGNvbnRlbnQ6IGZhbHNlIH0pO1xuICAgICAgICBjb25zdCB7IG1vZGVsIH0gPSBicm93c2VyRm9yUGF0aDtcbiAgICAgICAgYXdhaXQgbW9kZWwucmVzdG9yZWQ7XG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdkaXJlY3RvcnknKSB7XG4gICAgICAgICAgICBhd2FpdCBtb2RlbC5jZChgLyR7bG9jYWxQYXRofWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXdhaXQgbW9kZWwuY2QoYC8ke1BhdGhFeHQuZGlybmFtZShsb2NhbFBhdGgpfWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cbiAgICBQcml2YXRlLm5hdmlnYXRlVG9QYXRoID0gbmF2aWdhdGVUb1BhdGg7XG4gICAgLyoqXG4gICAgICogUmVzdG9yZXMgZmlsZSBicm93c2VyIHN0YXRlIGFuZCBvdmVycmlkZXMgc3RhdGUgaWYgdHJlZSByZXNvbHZlciByZXNvbHZlcy5cbiAgICAgKi9cbiAgICBhc3luYyBmdW5jdGlvbiByZXN0b3JlQnJvd3Nlcihicm93c2VyLCBjb21tYW5kcywgcm91dGVyLCB0cmVlKSB7XG4gICAgICAgIGNvbnN0IHJlc3RvcmluZyA9ICdqcC1tb2QtcmVzdG9yaW5nJztcbiAgICAgICAgYnJvd3Nlci5hZGRDbGFzcyhyZXN0b3JpbmcpO1xuICAgICAgICBpZiAoIXJvdXRlcikge1xuICAgICAgICAgICAgYXdhaXQgYnJvd3Nlci5tb2RlbC5yZXN0b3JlKGJyb3dzZXIuaWQpO1xuICAgICAgICAgICAgYXdhaXQgYnJvd3Nlci5tb2RlbC5yZWZyZXNoKCk7XG4gICAgICAgICAgICBicm93c2VyLnJlbW92ZUNsYXNzKHJlc3RvcmluZyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByb3V0ZXIucm91dGVkLmRpc2Nvbm5lY3QobGlzdGVuZXIpO1xuICAgICAgICAgICAgY29uc3QgcGF0aHMgPSBhd2FpdCAodHJlZSA9PT0gbnVsbCB8fCB0cmVlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0cmVlLnBhdGhzKTtcbiAgICAgICAgICAgIGlmICgocGF0aHMgPT09IG51bGwgfHwgcGF0aHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhdGhzLmZpbGUpIHx8IChwYXRocyA9PT0gbnVsbCB8fCBwYXRocyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGF0aHMuYnJvd3NlcikpIHtcbiAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIHRoZSBtb2RlbCB3aXRob3V0IHBvcHVsYXRpbmcgaXQuXG4gICAgICAgICAgICAgICAgYXdhaXQgYnJvd3Nlci5tb2RlbC5yZXN0b3JlKGJyb3dzZXIuaWQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBpZiAocGF0aHMuZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBjb21tYW5kcy5leGVjdXRlKENvbW1hbmRJRHMub3BlblBhdGgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IHBhdGhzLmZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkb250U2hvd0Jyb3dzZXI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwYXRocy5icm93c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGNvbW1hbmRzLmV4ZWN1dGUoQ29tbWFuZElEcy5vcGVuUGF0aCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogcGF0aHMuYnJvd3NlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbnRTaG93QnJvd3NlcjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBicm93c2VyLm1vZGVsLnJlc3RvcmUoYnJvd3Nlci5pZCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgYnJvd3Nlci5tb2RlbC5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicm93c2VyLnJlbW92ZUNsYXNzKHJlc3RvcmluZyk7XG4gICAgICAgIH07XG4gICAgICAgIHJvdXRlci5yb3V0ZWQuY29ubmVjdChsaXN0ZW5lcik7XG4gICAgfVxuICAgIFByaXZhdGUucmVzdG9yZUJyb3dzZXIgPSByZXN0b3JlQnJvd3Nlcjtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLyoqXG4gKiBFeHBvcnQgdGhlIHBsdWdpbnMgYXMgZGVmYXVsdC5cbiAqL1xuY29uc3QgcGx1Z2lucyA9IFtcbiAgICBmYWN0b3J5LFxuICAgIGJyb3dzZXIsXG4gICAgc2hhcmVGaWxlLFxuICAgIGZpbGVVcGxvYWRTdGF0dXMsXG4gICAgZG93bmxvYWRQbHVnaW4sXG4gICAgYnJvd3NlcldpZGdldCxcbiAgICBvcGVuV2l0aFBsdWdpbixcbiAgICBvcGVuQnJvd3NlclRhYlBsdWdpbixcbiAgICBvcGVuVXJsUGx1Z2luXG5dO1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2lucztcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIGxldCBPcGVuV2l0aDtcbiAgICAoZnVuY3Rpb24gKE9wZW5XaXRoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIGZhY3RvcmllcyBmb3IgdGhlIHNlbGVjdGVkIGl0ZW1cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGRvY1JlZ2lzdHJ5IEFwcGxpY2F0aW9uIGRvY3VtZW50IHJlZ2lzdHJ5XG4gICAgICAgICAqIEBwYXJhbSBpdGVtIFNlbGVjdGVkIGl0ZW0gbW9kZWxcbiAgICAgICAgICogQHJldHVybnMgQXZhaWxhYmxlIGZhY3RvcmllcyBmb3IgdGhlIG1vZGVsXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBnZXRGYWN0b3JpZXMoZG9jUmVnaXN0cnksIGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IGZhY3RvcmllcyA9IGRvY1JlZ2lzdHJ5XG4gICAgICAgICAgICAgICAgLnByZWZlcnJlZFdpZGdldEZhY3RvcmllcyhpdGVtLnBhdGgpXG4gICAgICAgICAgICAgICAgLm1hcChmID0+IGYubmFtZSk7XG4gICAgICAgICAgICBjb25zdCBub3RlYm9va0ZhY3RvcnkgPSAoX2EgPSBkb2NSZWdpc3RyeS5nZXRXaWRnZXRGYWN0b3J5KCdub3RlYm9vaycpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZTtcbiAgICAgICAgICAgIGlmIChub3RlYm9va0ZhY3RvcnkgJiZcbiAgICAgICAgICAgICAgICBpdGVtLnR5cGUgPT09ICdub3RlYm9vaycgJiZcbiAgICAgICAgICAgICAgICBmYWN0b3JpZXMuaW5kZXhPZihub3RlYm9va0ZhY3RvcnkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGZhY3Rvcmllcy51bnNoaWZ0KG5vdGVib29rRmFjdG9yeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFjdG9yaWVzO1xuICAgICAgICB9XG4gICAgICAgIE9wZW5XaXRoLmdldEZhY3RvcmllcyA9IGdldEZhY3RvcmllcztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiB0aGUgaW50ZXJzZWN0aW9uIG9mIG11bHRpcGxlIGFycmF5cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGl0ZXIgSXRlcmF0b3Igb2YgYXJyYXlzXG4gICAgICAgICAqIEByZXR1cm5zIFNldCBvZiBjb21tb24gZWxlbWVudHMgdG8gYWxsIGFycmF5c1xuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gaW50ZXJzZWN0aW9uKGl0ZXIpIHtcbiAgICAgICAgICAgIC8vIHBvcCB0aGUgZmlyc3QgZWxlbWVudCBvZiBpdGVyXG4gICAgICAgICAgICBjb25zdCBmaXJzdCA9IGl0ZXIubmV4dCgpO1xuICAgICAgICAgICAgLy8gZmlyc3Qgd2lsbCBiZSB1bmRlZmluZWQgaWYgaXRlciBpcyBlbXB0eVxuICAgICAgICAgICAgaWYgKCFmaXJzdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBcImluaXRpYWxpemVcIiB0aGUgaW50ZXJzZWN0aW9uIGZyb20gZmlyc3RcbiAgICAgICAgICAgIGNvbnN0IGlzZWN0ID0gbmV3IFNldChmaXJzdCk7XG4gICAgICAgICAgICAvLyByZWR1Y2Ugb3ZlciB0aGUgcmVtYWluaW5nIGVsZW1lbnRzIG9mIGl0ZXJcbiAgICAgICAgICAgIHJldHVybiByZWR1Y2UoaXRlciwgKGlzZWN0LCBzdWJhcnIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBmaWx0ZXIgb3V0IGFsbCBlbGVtZW50cyBub3QgcHJlc2VudCBpbiBib3RoIGlzZWN0IGFuZCBzdWJhcnIsXG4gICAgICAgICAgICAgICAgLy8gYWNjdW11bGF0ZSByZXN1bHQgaW4gbmV3IHNldFxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU2V0KHN1YmFyci5maWx0ZXIoeCA9PiBpc2VjdC5oYXMoeCkpKTtcbiAgICAgICAgICAgIH0sIGlzZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBPcGVuV2l0aC5pbnRlcnNlY3Rpb24gPSBpbnRlcnNlY3Rpb247XG4gICAgfSkoT3BlbldpdGggPSBQcml2YXRlLk9wZW5XaXRoIHx8IChQcml2YXRlLk9wZW5XaXRoID0ge30pKTtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==