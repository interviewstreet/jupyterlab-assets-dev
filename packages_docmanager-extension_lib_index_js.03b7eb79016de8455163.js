(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_docmanager-extension_lib_index_js"],{

/***/ "../../packages/docmanager-extension/lib/index.js":
/*!********************************************************!*\
  !*** ../../packages/docmanager-extension/lib/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "savingStatusPlugin": () => (/* binding */ savingStatusPlugin),
/* harmony export */   "pathStatusPlugin": () => (/* binding */ pathStatusPlugin),
/* harmony export */   "downloadPlugin": () => (/* binding */ downloadPlugin),
/* harmony export */   "openBrowserTabPlugin": () => (/* binding */ openBrowserTabPlugin),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "ToolbarItems": () => (/* binding */ ToolbarItems)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/docmanager */ "webpack/sharing/consume/default/@jupyterlab/docmanager/@jupyterlab/docmanager");
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_docprovider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/docprovider */ "webpack/sharing/consume/default/@jupyterlab/docprovider/@jupyterlab/docprovider");
/* harmony import */ var _jupyterlab_docprovider__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docprovider__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/statusbar */ "webpack/sharing/consume/default/@jupyterlab/statusbar/@jupyterlab/statusbar");
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_12__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module docmanager-extension
 */













/**
 * The command IDs used by the document manager plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.clone = 'docmanager:clone';
    CommandIDs.deleteFile = 'docmanager:delete-file';
    CommandIDs.newUntitled = 'docmanager:new-untitled';
    CommandIDs.open = 'docmanager:open';
    CommandIDs.openBrowserTab = 'docmanager:open-browser-tab';
    CommandIDs.reload = 'docmanager:reload';
    CommandIDs.rename = 'docmanager:rename';
    CommandIDs.del = 'docmanager:delete';
    CommandIDs.restoreCheckpoint = 'docmanager:restore-checkpoint';
    CommandIDs.save = 'docmanager:save';
    CommandIDs.saveAll = 'docmanager:save-all';
    CommandIDs.saveAs = 'docmanager:save-as';
    CommandIDs.download = 'docmanager:download';
    CommandIDs.toggleAutosave = 'docmanager:toggle-autosave';
    CommandIDs.showInFileBrowser = 'docmanager:show-in-file-browser';
})(CommandIDs || (CommandIDs = {}));
/**
 * The id of the document manager plugin.
 */
const docManagerPluginId = '@jupyterlab/docmanager-extension:plugin';
/**
 * The default document manager provider.
 */
const docManagerPlugin = {
    id: docManagerPluginId,
    provides: _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__.IDocumentManager,
    requires: [_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.ISettingRegistry, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__.ITranslator],
    optional: [
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabStatus,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ISessionContextDialogs,
        _jupyterlab_docprovider__WEBPACK_IMPORTED_MODULE_4__.IDocumentProviderFactory
    ],
    activate: (app, settingRegistry, translator, status, palette, labShell, sessionDialogs, docProviderFactory) => {
        var _a;
        const trans = translator.load('jupyterlab');
        const manager = app.serviceManager;
        const contexts = new WeakSet();
        const opener = {
            open: (widget, options) => {
                if (!widget.id) {
                    widget.id = `document-manager-${++Private.id}`;
                }
                widget.title.dataset = Object.assign({ type: 'document-title' }, widget.title.dataset);
                if (!widget.isAttached) {
                    app.shell.add(widget, 'main', options || {});
                }
                if ((options === null || options === void 0 ? void 0 : options.activate) !== false) {
                    app.shell.activateById(widget.id);
                }
                // Handle dirty state for open documents.
                const context = docManager.contextForWidget(widget);
                if (context && !contexts.has(context)) {
                    if (status) {
                        handleContext(status, context);
                    }
                    contexts.add(context);
                }
            }
        };
        const registry = app.docRegistry;
        const when = app.restored.then(() => void 0);
        const docManager = new _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__.DocumentManager({
            registry,
            manager,
            opener,
            when,
            setBusy: (_a = (status && (() => status.setBusy()))) !== null && _a !== void 0 ? _a : undefined,
            sessionDialogs: sessionDialogs || undefined,
            translator,
            collaborative: true,
            docProviderFactory: docProviderFactory !== null && docProviderFactory !== void 0 ? docProviderFactory : undefined
        });
        // Register the file operations commands.
        addCommands(app, docManager, opener, settingRegistry, translator, labShell, palette);
        // Keep up to date with the settings registry.
        const onSettingsUpdated = (settings) => {
            // Handle whether to autosave
            const autosave = settings.get('autosave').composite;
            docManager.autosave =
                autosave === true || autosave === false ? autosave : true;
            app.commands.notifyCommandChanged(CommandIDs.toggleAutosave);
            // Handle autosave interval
            const autosaveInterval = settings.get('autosaveInterval').composite;
            docManager.autosaveInterval = autosaveInterval || 120;
            // Handle last modified timestamp check margin
            const lastModifiedCheckMargin = settings.get('lastModifiedCheckMargin')
                .composite;
            docManager.lastModifiedCheckMargin = lastModifiedCheckMargin || 500;
            // Handle default widget factory overrides.
            const defaultViewers = settings.get('defaultViewers').composite;
            const overrides = {};
            // Filter the defaultViewers and file types for existing ones.
            Object.keys(defaultViewers).forEach(ft => {
                if (!registry.getFileType(ft)) {
                    console.warn(`File Type ${ft} not found`);
                    return;
                }
                if (!registry.getWidgetFactory(defaultViewers[ft])) {
                    console.warn(`Document viewer ${defaultViewers[ft]} not found`);
                }
                overrides[ft] = defaultViewers[ft];
            });
            // Set the default factory overrides. If not provided, this has the
            // effect of unsetting any previous overrides.
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_9__.each)(registry.fileTypes(), ft => {
                try {
                    registry.setDefaultWidgetFactory(ft.name, overrides[ft.name]);
                }
                catch (_a) {
                    console.warn(`Failed to set default viewer ${overrides[ft.name]} for file type ${ft.name}`);
                }
            });
        };
        // Fetch the initial state of the settings.
        Promise.all([settingRegistry.load(docManagerPluginId), app.restored])
            .then(([settings]) => {
            settings.changed.connect(onSettingsUpdated);
            onSettingsUpdated(settings);
        })
            .catch((reason) => {
            console.error(reason.message);
        });
        // Register a fetch transformer for the settings registry,
        // allowing us to dynamically populate a help string with the
        // available document viewers and file types for the default
        // viewer overrides.
        settingRegistry.transform(docManagerPluginId, {
            fetch: plugin => {
                // Get the available file types.
                const fileTypes = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_9__.toArray)(registry.fileTypes())
                    .map(ft => ft.name)
                    .join('    \n');
                // Get the available widget factories.
                const factories = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_9__.toArray)(registry.widgetFactories())
                    .map(f => f.name)
                    .join('    \n');
                // Generate the help string.
                const description = trans.__(`Overrides for the default viewers for file types.
Specify a mapping from file type name to document viewer name, for example:

defaultViewers: {
  markdown: "Markdown Preview"
}

If you specify non-existent file types or viewers, or if a viewer cannot
open a given file type, the override will not function.

Available viewers:
%1

Available file types:
%2`, factories, fileTypes);
                const schema = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_10__.JSONExt.deepCopy(plugin.schema);
                schema.properties.defaultViewers.description = description;
                return Object.assign(Object.assign({}, plugin), { schema });
            }
        });
        // If the document registry gains or loses a factory or file type,
        // regenerate the settings description with the available options.
        registry.changed.connect(() => settingRegistry.reload(docManagerPluginId));
        return docManager;
    }
};
/**
 * A plugin for adding a saving status item to the status bar.
 */
const savingStatusPlugin = {
    id: '@jupyterlab/docmanager-extension:saving-status',
    autoStart: true,
    requires: [_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__.IDocumentManager, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__.ITranslator],
    optional: [_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__.IStatusBar],
    activate: (_, docManager, labShell, translator, statusBar) => {
        if (!statusBar) {
            // Automatically disable if statusbar missing
            return;
        }
        const saving = new _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__.SavingStatus({ docManager, translator });
        // Keep the currently active widget synchronized.
        saving.model.widget = labShell.currentWidget;
        labShell.currentChanged.connect(() => {
            saving.model.widget = labShell.currentWidget;
        });
        statusBar.registerStatusItem(savingStatusPlugin.id, {
            item: saving,
            align: 'middle',
            isActive: () => saving.model !== null && saving.model.status !== null,
            activeStateChanged: saving.model.stateChanged
        });
    }
};
/**
 * A plugin providing a file path widget to the status bar.
 */
const pathStatusPlugin = {
    id: '@jupyterlab/docmanager-extension:path-status',
    autoStart: true,
    requires: [_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__.IDocumentManager, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell],
    optional: [_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__.IStatusBar],
    activate: (_, docManager, labShell, statusBar) => {
        if (!statusBar) {
            // Automatically disable if statusbar missing
            return;
        }
        const path = new _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__.PathStatus({ docManager });
        // Keep the file path widget up-to-date with the application active widget.
        path.model.widget = labShell.currentWidget;
        labShell.currentChanged.connect(() => {
            path.model.widget = labShell.currentWidget;
        });
        statusBar.registerStatusItem(pathStatusPlugin.id, {
            item: path,
            align: 'right',
            rank: 0
        });
    }
};
/**
 * A plugin providing download commands in the file menu and command palette.
 */
const downloadPlugin = {
    id: '@jupyterlab/docmanager-extension:download',
    autoStart: true,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__.ITranslator, _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__.IDocumentManager],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette],
    activate: (app, translator, docManager, palette) => {
        const trans = translator.load('jupyterlab');
        const { commands, shell } = app;
        const isEnabled = () => {
            const { currentWidget } = shell;
            return !!(currentWidget && docManager.contextForWidget(currentWidget));
        };
        commands.addCommand(CommandIDs.download, {
            label: trans.__('Download'),
            caption: trans.__('Download the file to your computer'),
            isEnabled,
            execute: () => {
                // Checks that shell.currentWidget is valid:
                if (isEnabled()) {
                    const context = docManager.contextForWidget(shell.currentWidget);
                    if (!context) {
                        return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                            title: trans.__('Cannot Download'),
                            body: trans.__('No context found for current widget!'),
                            buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: trans.__('OK') })]
                        });
                    }
                    return context.download();
                }
            }
        });
        const category = trans.__('File Operations');
        if (palette) {
            palette.addItem({ command: CommandIDs.download, category });
        }
    }
};
/**
 * A plugin providing open-browser-tab commands.
 *
 * This is its own plugin in case you would like to disable this feature.
 * e.g. jupyter labextension disable @jupyterlab/docmanager-extension:open-browser-tab
 *
 * Note: If disabling this, you may also want to disable:
 * @jupyterlab/filebrowser-extension:open-browser-tab
 */
const openBrowserTabPlugin = {
    id: '@jupyterlab/docmanager-extension:open-browser-tab',
    autoStart: true,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__.ITranslator, _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__.IDocumentManager],
    activate: (app, translator, docManager) => {
        const trans = translator.load('jupyterlab');
        const { commands } = app;
        commands.addCommand(CommandIDs.openBrowserTab, {
            execute: args => {
                const path = typeof args['path'] === 'undefined' ? '' : args['path'];
                if (!path) {
                    return;
                }
                return docManager.services.contents.getDownloadUrl(path).then(url => {
                    const opened = window.open();
                    if (opened) {
                        opened.opener = null;
                        opened.location.href = url;
                    }
                    else {
                        throw new Error('Failed to open new browser tab.');
                    }
                });
            },
            icon: args => args['icon'] || '',
            label: () => trans.__('Open in New Browser Tab')
        });
    }
};
/**
 * Export the plugins as default.
 */
const plugins = [
    docManagerPlugin,
    pathStatusPlugin,
    savingStatusPlugin,
    downloadPlugin,
    openBrowserTabPlugin
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);
/**
 * Toolbar item factory
 */
var ToolbarItems;
(function (ToolbarItems) {
    /**
     * Create save button toolbar item.
     *
     */
    function createSaveButton(commands, fileChanged) {
        return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.addCommandToolbarButtonClass)(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_12__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.UseSignal, { signal: fileChanged }, () => (react__WEBPACK_IMPORTED_MODULE_12__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.CommandToolbarButtonComponent, { commands: commands, id: CommandIDs.save, label: '', args: { toolbar: true } })))));
    }
    ToolbarItems.createSaveButton = createSaveButton;
})(ToolbarItems || (ToolbarItems = {}));
/* Widget to display the revert to checkpoint confirmation. */
class RevertConfirmWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_11__.Widget {
    /**
     * Construct a new revert confirmation widget.
     */
    constructor(checkpoint, trans, fileType = 'notebook') {
        super({
            node: Private.createRevertConfirmNode(checkpoint, fileType, trans)
        });
    }
}
// Returns the file type for a widget.
function fileType(widget, docManager) {
    if (!widget) {
        return 'File';
    }
    const context = docManager.contextForWidget(widget);
    if (!context) {
        return '';
    }
    const fts = docManager.registry.getFileTypesForPath(context.path);
    return fts.length && fts[0].displayName ? fts[0].displayName : 'File';
}
/**
 * Add the file operations commands to the application's command registry.
 */
function addCommands(app, docManager, opener, settingRegistry, translator, labShell, palette) {
    const trans = translator.load('jupyterlab');
    const { commands, shell } = app;
    const category = trans.__('File Operations');
    const isEnabled = () => {
        const { currentWidget } = shell;
        return !!(currentWidget && docManager.contextForWidget(currentWidget));
    };
    const isWritable = () => {
        const { currentWidget } = shell;
        if (!currentWidget) {
            return false;
        }
        const context = docManager.contextForWidget(currentWidget);
        return !!(context &&
            context.contentsModel &&
            context.contentsModel.writable);
    };
    // If inside a rich application like JupyterLab, add additional functionality.
    if (labShell) {
        addLabCommands(app, docManager, labShell, opener, translator);
    }
    commands.addCommand(CommandIDs.deleteFile, {
        label: () => `Delete ${fileType(shell.currentWidget, docManager)}`,
        execute: args => {
            const path = typeof args['path'] === 'undefined' ? '' : args['path'];
            if (!path) {
                const command = CommandIDs.deleteFile;
                throw new Error(`A non-empty path is required for ${command}.`);
            }
            return docManager.deleteFile(path);
        }
    });
    commands.addCommand(CommandIDs.newUntitled, {
        execute: args => {
            // FIXME-TRANS: Localizing args['error']?
            const errorTitle = args['error'] || trans.__('Error');
            const path = typeof args['path'] === 'undefined' ? '' : args['path'];
            const options = {
                type: args['type'],
                path
            };
            if (args['type'] === 'file') {
                options.ext = args['ext'] || '.txt';
            }
            return docManager.services.contents
                .newUntitled(options)
                .catch(error => (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showErrorMessage)(errorTitle, error));
        },
        label: args => args['label'] || `New ${args['type']}`
    });
    commands.addCommand(CommandIDs.open, {
        execute: args => {
            const path = typeof args['path'] === 'undefined' ? '' : args['path'];
            const factory = args['factory'] || void 0;
            const kernel = args === null || args === void 0 ? void 0 : args.kernel;
            const options = args['options'] || void 0;
            return docManager.services.contents
                .get(path, { content: false })
                .then(() => docManager.openOrReveal(path, factory, kernel, options));
        },
        icon: args => args['icon'] || '',
        label: args => (args['label'] || args['factory']),
        mnemonic: args => args['mnemonic'] || -1
    });
    commands.addCommand(CommandIDs.reload, {
        label: () => trans.__('Reload %1 from Disk', fileType(shell.currentWidget, docManager)),
        caption: trans.__('Reload contents from disk'),
        isEnabled,
        execute: () => {
            // Checks that shell.currentWidget is valid:
            if (!isEnabled()) {
                return;
            }
            const context = docManager.contextForWidget(shell.currentWidget);
            const type = fileType(shell.currentWidget, docManager);
            if (!context) {
                return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                    title: trans.__('Cannot Reload'),
                    body: trans.__('No context found for current widget!'),
                    buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: trans.__('Ok') })]
                });
            }
            if (context.model.dirty) {
                return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                    title: trans.__('Reload %1 from Disk', type),
                    body: trans.__('Are you sure you want to reload the %1 from the disk?', type),
                    buttons: [
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton({ label: trans.__('Cancel') }),
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.warnButton({ label: trans.__('Reload') })
                    ]
                }).then(result => {
                    if (result.button.accept && !context.isDisposed) {
                        return context.revert();
                    }
                });
            }
            else {
                if (!context.isDisposed) {
                    return context.revert();
                }
            }
        }
    });
    commands.addCommand(CommandIDs.restoreCheckpoint, {
        label: () => trans.__('Revert %1 to Checkpoint', fileType(shell.currentWidget, docManager)),
        caption: trans.__('Revert contents to previous checkpoint'),
        isEnabled,
        execute: () => {
            // Checks that shell.currentWidget is valid:
            if (!isEnabled()) {
                return;
            }
            const context = docManager.contextForWidget(shell.currentWidget);
            if (!context) {
                return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                    title: trans.__('Cannot Revert'),
                    body: trans.__('No context found for current widget!'),
                    buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: trans.__('Ok') })]
                });
            }
            return context.listCheckpoints().then(checkpoints => {
                if (checkpoints.length < 1) {
                    return;
                }
                const lastCheckpoint = checkpoints[checkpoints.length - 1];
                if (!lastCheckpoint) {
                    return;
                }
                const type = fileType(shell.currentWidget, docManager);
                return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                    title: trans.__('Revert %1 to checkpoint', type),
                    body: new RevertConfirmWidget(lastCheckpoint, trans, type),
                    buttons: [
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton({ label: trans.__('Cancel') }),
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.warnButton({ label: trans.__('Revert') })
                    ]
                }).then(result => {
                    if (context.isDisposed) {
                        return;
                    }
                    if (result.button.accept) {
                        if (context.model.readOnly) {
                            return context.revert();
                        }
                        return context.restoreCheckpoint().then(() => context.revert());
                    }
                });
            });
        }
    });
    commands.addCommand(CommandIDs.save, {
        label: () => trans.__('Save %1', fileType(shell.currentWidget, docManager)),
        caption: trans.__('Save and create checkpoint'),
        icon: args => (args.toolbar ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_8__.saveIcon : ''),
        isEnabled: isWritable,
        execute: () => {
            // Checks that shell.currentWidget is valid:
            if (isEnabled()) {
                const widget = shell.currentWidget;
                const context = docManager.contextForWidget(widget);
                if (!context) {
                    return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                        title: trans.__('Cannot Save'),
                        body: trans.__('No context found for current widget!'),
                        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: trans.__('Ok') })]
                    });
                }
                else {
                    if (context.model.readOnly) {
                        return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                            title: trans.__('Cannot Save'),
                            body: trans.__('Document is read-only'),
                            buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: trans.__('Ok') })]
                        });
                    }
                    return context
                        .save()
                        .then(() => {
                        if (!(widget === null || widget === void 0 ? void 0 : widget.isDisposed)) {
                            return context.createCheckpoint();
                        }
                    })
                        .catch(err => {
                        // If the save was canceled by user-action, do nothing.
                        // FIXME-TRANS: Is this using the text on the button or?
                        if (err.message === 'Cancel') {
                            return;
                        }
                        throw err;
                    });
                }
            }
        }
    });
    commands.addCommand(CommandIDs.saveAll, {
        label: () => trans.__('Save All'),
        caption: trans.__('Save all open documents'),
        isEnabled: () => {
            return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_9__.some)((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_9__.map)(shell.widgets('main'), w => docManager.contextForWidget(w)), c => { var _a, _b; return (_b = (_a = c === null || c === void 0 ? void 0 : c.contentsModel) === null || _a === void 0 ? void 0 : _a.writable) !== null && _b !== void 0 ? _b : false; });
        },
        execute: () => {
            const promises = [];
            const paths = new Set(); // Cache so we don't double save files.
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_9__.each)(shell.widgets('main'), widget => {
                const context = docManager.contextForWidget(widget);
                if (context && !context.model.readOnly && !paths.has(context.path)) {
                    paths.add(context.path);
                    promises.push(context.save());
                }
            });
            return Promise.all(promises);
        }
    });
    commands.addCommand(CommandIDs.saveAs, {
        label: () => trans.__('Save %1 As…', fileType(shell.currentWidget, docManager)),
        caption: trans.__('Save with new path'),
        isEnabled,
        execute: () => {
            // Checks that shell.currentWidget is valid:
            if (isEnabled()) {
                const context = docManager.contextForWidget(shell.currentWidget);
                if (!context) {
                    return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                        title: trans.__('Cannot Save'),
                        body: trans.__('No context found for current widget!'),
                        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: trans.__('Ok') })]
                    });
                }
                return context.saveAs();
            }
        }
    });
    commands.addCommand(CommandIDs.toggleAutosave, {
        label: trans.__('Autosave Documents'),
        isToggled: () => docManager.autosave,
        execute: () => {
            const value = !docManager.autosave;
            const key = 'autosave';
            return settingRegistry
                .set(docManagerPluginId, key, value)
                .catch((reason) => {
                console.error(`Failed to set ${docManagerPluginId}:${key} - ${reason.message}`);
            });
        }
    });
    if (palette) {
        [
            CommandIDs.reload,
            CommandIDs.restoreCheckpoint,
            CommandIDs.save,
            CommandIDs.saveAs,
            CommandIDs.toggleAutosave
        ].forEach(command => {
            palette.addItem({ command, category });
        });
    }
}
function addLabCommands(app, docManager, labShell, opener, translator) {
    const trans = translator.load('jupyterlab');
    const { commands } = app;
    // Returns the doc widget associated with the most recent contextmenu event.
    const contextMenuWidget = () => {
        var _a;
        const pathRe = /[Pp]ath:\s?(.*)\n?/;
        const test = (node) => { var _a; return !!((_a = node['title']) === null || _a === void 0 ? void 0 : _a.match(pathRe)); };
        const node = app.contextMenuHitTest(test);
        const pathMatch = node === null || node === void 0 ? void 0 : node['title'].match(pathRe);
        return ((_a = (pathMatch && docManager.findWidget(pathMatch[1], null))) !== null && _a !== void 0 ? _a : 
        // Fall back to active doc widget if path cannot be obtained from event.
        labShell.currentWidget);
    };
    // Returns `true` if the current widget has a document context.
    const isEnabled = () => {
        const { currentWidget } = labShell;
        return !!(currentWidget && docManager.contextForWidget(currentWidget));
    };
    commands.addCommand(CommandIDs.clone, {
        label: () => trans.__('New View for %1', fileType(contextMenuWidget(), docManager)),
        isEnabled,
        execute: args => {
            const widget = contextMenuWidget();
            const options = args['options'] || {
                mode: 'split-right'
            };
            if (!widget) {
                return;
            }
            // Clone the widget.
            const child = docManager.cloneWidget(widget);
            if (child) {
                opener.open(child, options);
            }
        }
    });
    commands.addCommand(CommandIDs.rename, {
        label: () => {
            let t = fileType(contextMenuWidget(), docManager);
            if (t) {
                t = ' ' + t;
            }
            return trans.__('Rename%1…', t);
        },
        isEnabled,
        execute: () => {
            // Implies contextMenuWidget() !== null
            if (isEnabled()) {
                const context = docManager.contextForWidget(contextMenuWidget());
                return (0,_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__.renameDialog)(docManager, context.path);
            }
        }
    });
    commands.addCommand(CommandIDs.del, {
        label: () => trans.__('Delete %1', fileType(contextMenuWidget(), docManager)),
        isEnabled,
        execute: async () => {
            // Implies contextMenuWidget() !== null
            if (isEnabled()) {
                const context = docManager.contextForWidget(contextMenuWidget());
                if (!context) {
                    return;
                }
                const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                    title: trans.__('Delete'),
                    body: trans.__('Are you sure you want to delete %1', context.path),
                    buttons: [
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton({ label: trans.__('Cancel') }),
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.warnButton({ label: trans.__('Delete') })
                    ]
                });
                if (result.button.accept) {
                    await app.commands.execute('docmanager:delete-file', {
                        path: context.path
                    });
                }
            }
        }
    });
    commands.addCommand(CommandIDs.showInFileBrowser, {
        label: () => trans.__('Show in File Browser'),
        isEnabled,
        execute: async () => {
            const widget = contextMenuWidget();
            const context = widget && docManager.contextForWidget(widget);
            if (!context) {
                return;
            }
            // 'activate' is needed if this command is selected in the "open tabs" sidebar
            await commands.execute('filebrowser:activate', { path: context.path });
            await commands.execute('filebrowser:go-to-path', { path: context.path });
        }
    });
}
/**
 * Handle dirty state for a context.
 */
function handleContext(status, context) {
    let disposable = null;
    const onStateChanged = (sender, args) => {
        if (args.name === 'dirty') {
            if (args.newValue === true) {
                if (!disposable) {
                    disposable = status.setDirty();
                }
            }
            else if (disposable) {
                disposable.dispose();
                disposable = null;
            }
        }
    };
    void context.ready.then(() => {
        context.model.stateChanged.connect(onStateChanged);
        if (context.model.dirty) {
            disposable = status.setDirty();
        }
    });
    context.disposed.connect(() => {
        if (disposable) {
            disposable.dispose();
        }
    });
}
/**
 * A namespace for private module data.
 */
var Private;
(function (Private) {
    /**
     * A counter for unique IDs.
     */
    Private.id = 0;
    function createRevertConfirmNode(checkpoint, fileType, trans) {
        const body = document.createElement('div');
        const confirmMessage = document.createElement('p');
        const confirmText = document.createTextNode(trans.__('Are you sure you want to revert the %1 to the latest checkpoint? ', fileType));
        const cannotUndoText = document.createElement('strong');
        cannotUndoText.textContent = trans.__('This cannot be undone.');
        confirmMessage.appendChild(confirmText);
        confirmMessage.appendChild(cannotUndoText);
        const lastCheckpointMessage = document.createElement('p');
        const lastCheckpointText = document.createTextNode(trans.__('The checkpoint was last updated at: '));
        const lastCheckpointDate = document.createElement('p');
        const date = new Date(checkpoint.last_modified);
        lastCheckpointDate.style.textAlign = 'center';
        lastCheckpointDate.textContent =
            _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.Time.format(date, 'dddd, MMMM Do YYYY, h:mm:ss a') +
                ' (' +
                _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.Time.formatHuman(date) +
                ')';
        lastCheckpointMessage.appendChild(lastCheckpointText);
        lastCheckpointMessage.appendChild(lastCheckpointDate);
        body.appendChild(confirmMessage);
        body.appendChild(lastCheckpointMessage);
        return body;
    }
    Private.createRevertConfirmNode = createRevertConfirmNode;
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZG9jbWFuYWdlci1leHRlbnNpb24vbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2dFO0FBQzBJO0FBQzdKO0FBQ3NFO0FBQ2hEO0FBQ0o7QUFDWjtBQUNHO0FBQ0Q7QUFDUTtBQUNqQjtBQUNIO0FBQ1Y7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsb0VBQWdCO0FBQzlCLGVBQWUseUVBQWdCLEVBQUUsZ0VBQVc7QUFDNUM7QUFDQSxRQUFRLCtEQUFVO0FBQ2xCLFFBQVEsaUVBQWU7QUFDdkIsUUFBUSw4REFBUztBQUNqQixRQUFRLHdFQUFzQjtBQUM5QixRQUFRLDZFQUF3QjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsYUFBYTtBQUNqRTtBQUNBLHNEQUFzRCx5QkFBeUI7QUFDL0U7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbUVBQWU7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELHFCQUFxQjtBQUNqRiw4REFBOEQscUJBQXFCO0FBQ25GO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDhEQUFXO0FBQ3ZCO0FBQ0EsZ0JBQWdCLG1FQUFnQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0IsaUMiLCJmaWxlIjoicGFja2FnZXNfZG9jbWFuYWdlci1leHRlbnNpb25fbGliX2luZGV4X2pzLjAzYjdlYjc5MDE2ZGU4NDU1MTYzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgZG9jbWFuYWdlci1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgSUxhYlNoZWxsLCBJTGFiU3RhdHVzIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgYWRkQ29tbWFuZFRvb2xiYXJCdXR0b25DbGFzcywgQ29tbWFuZFRvb2xiYXJCdXR0b25Db21wb25lbnQsIERpYWxvZywgSUNvbW1hbmRQYWxldHRlLCBJU2Vzc2lvbkNvbnRleHREaWFsb2dzLCBSZWFjdFdpZGdldCwgc2hvd0RpYWxvZywgc2hvd0Vycm9yTWVzc2FnZSwgVXNlU2lnbmFsIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgVGltZSB9IGZyb20gJ0BqdXB5dGVybGFiL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBEb2N1bWVudE1hbmFnZXIsIElEb2N1bWVudE1hbmFnZXIsIFBhdGhTdGF0dXMsIHJlbmFtZURpYWxvZywgU2F2aW5nU3RhdHVzIH0gZnJvbSAnQGp1cHl0ZXJsYWIvZG9jbWFuYWdlcic7XG5pbXBvcnQgeyBJRG9jdW1lbnRQcm92aWRlckZhY3RvcnkgfSBmcm9tICdAanVweXRlcmxhYi9kb2Nwcm92aWRlcic7XG5pbXBvcnQgeyBJU2V0dGluZ1JlZ2lzdHJ5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvc2V0dGluZ3JlZ2lzdHJ5JztcbmltcG9ydCB7IElTdGF0dXNCYXIgfSBmcm9tICdAanVweXRlcmxhYi9zdGF0dXNiYXInO1xuaW1wb3J0IHsgSVRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBzYXZlSWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgZWFjaCwgbWFwLCBzb21lLCB0b0FycmF5IH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IHsgSlNPTkV4dCB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG4vKipcbiAqIFRoZSBjb21tYW5kIElEcyB1c2VkIGJ5IHRoZSBkb2N1bWVudCBtYW5hZ2VyIHBsdWdpbi5cbiAqL1xudmFyIENvbW1hbmRJRHM7XG4oZnVuY3Rpb24gKENvbW1hbmRJRHMpIHtcbiAgICBDb21tYW5kSURzLmNsb25lID0gJ2RvY21hbmFnZXI6Y2xvbmUnO1xuICAgIENvbW1hbmRJRHMuZGVsZXRlRmlsZSA9ICdkb2NtYW5hZ2VyOmRlbGV0ZS1maWxlJztcbiAgICBDb21tYW5kSURzLm5ld1VudGl0bGVkID0gJ2RvY21hbmFnZXI6bmV3LXVudGl0bGVkJztcbiAgICBDb21tYW5kSURzLm9wZW4gPSAnZG9jbWFuYWdlcjpvcGVuJztcbiAgICBDb21tYW5kSURzLm9wZW5Ccm93c2VyVGFiID0gJ2RvY21hbmFnZXI6b3Blbi1icm93c2VyLXRhYic7XG4gICAgQ29tbWFuZElEcy5yZWxvYWQgPSAnZG9jbWFuYWdlcjpyZWxvYWQnO1xuICAgIENvbW1hbmRJRHMucmVuYW1lID0gJ2RvY21hbmFnZXI6cmVuYW1lJztcbiAgICBDb21tYW5kSURzLmRlbCA9ICdkb2NtYW5hZ2VyOmRlbGV0ZSc7XG4gICAgQ29tbWFuZElEcy5yZXN0b3JlQ2hlY2twb2ludCA9ICdkb2NtYW5hZ2VyOnJlc3RvcmUtY2hlY2twb2ludCc7XG4gICAgQ29tbWFuZElEcy5zYXZlID0gJ2RvY21hbmFnZXI6c2F2ZSc7XG4gICAgQ29tbWFuZElEcy5zYXZlQWxsID0gJ2RvY21hbmFnZXI6c2F2ZS1hbGwnO1xuICAgIENvbW1hbmRJRHMuc2F2ZUFzID0gJ2RvY21hbmFnZXI6c2F2ZS1hcyc7XG4gICAgQ29tbWFuZElEcy5kb3dubG9hZCA9ICdkb2NtYW5hZ2VyOmRvd25sb2FkJztcbiAgICBDb21tYW5kSURzLnRvZ2dsZUF1dG9zYXZlID0gJ2RvY21hbmFnZXI6dG9nZ2xlLWF1dG9zYXZlJztcbiAgICBDb21tYW5kSURzLnNob3dJbkZpbGVCcm93c2VyID0gJ2RvY21hbmFnZXI6c2hvdy1pbi1maWxlLWJyb3dzZXInO1xufSkoQ29tbWFuZElEcyB8fCAoQ29tbWFuZElEcyA9IHt9KSk7XG4vKipcbiAqIFRoZSBpZCBvZiB0aGUgZG9jdW1lbnQgbWFuYWdlciBwbHVnaW4uXG4gKi9cbmNvbnN0IGRvY01hbmFnZXJQbHVnaW5JZCA9ICdAanVweXRlcmxhYi9kb2NtYW5hZ2VyLWV4dGVuc2lvbjpwbHVnaW4nO1xuLyoqXG4gKiBUaGUgZGVmYXVsdCBkb2N1bWVudCBtYW5hZ2VyIHByb3ZpZGVyLlxuICovXG5jb25zdCBkb2NNYW5hZ2VyUGx1Z2luID0ge1xuICAgIGlkOiBkb2NNYW5hZ2VyUGx1Z2luSWQsXG4gICAgcHJvdmlkZXM6IElEb2N1bWVudE1hbmFnZXIsXG4gICAgcmVxdWlyZXM6IFtJU2V0dGluZ1JlZ2lzdHJ5LCBJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtcbiAgICAgICAgSUxhYlN0YXR1cyxcbiAgICAgICAgSUNvbW1hbmRQYWxldHRlLFxuICAgICAgICBJTGFiU2hlbGwsXG4gICAgICAgIElTZXNzaW9uQ29udGV4dERpYWxvZ3MsXG4gICAgICAgIElEb2N1bWVudFByb3ZpZGVyRmFjdG9yeVxuICAgIF0sXG4gICAgYWN0aXZhdGU6IChhcHAsIHNldHRpbmdSZWdpc3RyeSwgdHJhbnNsYXRvciwgc3RhdHVzLCBwYWxldHRlLCBsYWJTaGVsbCwgc2Vzc2lvbkRpYWxvZ3MsIGRvY1Byb3ZpZGVyRmFjdG9yeSkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSBhcHAuc2VydmljZU1hbmFnZXI7XG4gICAgICAgIGNvbnN0IGNvbnRleHRzID0gbmV3IFdlYWtTZXQoKTtcbiAgICAgICAgY29uc3Qgb3BlbmVyID0ge1xuICAgICAgICAgICAgb3BlbjogKHdpZGdldCwgb3B0aW9ucykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghd2lkZ2V0LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpZGdldC5pZCA9IGBkb2N1bWVudC1tYW5hZ2VyLSR7KytQcml2YXRlLmlkfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdpZGdldC50aXRsZS5kYXRhc2V0ID0gT2JqZWN0LmFzc2lnbih7IHR5cGU6ICdkb2N1bWVudC10aXRsZScgfSwgd2lkZ2V0LnRpdGxlLmRhdGFzZXQpO1xuICAgICAgICAgICAgICAgIGlmICghd2lkZ2V0LmlzQXR0YWNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwLnNoZWxsLmFkZCh3aWRnZXQsICdtYWluJywgb3B0aW9ucyB8fCB7fSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmFjdGl2YXRlKSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwLnNoZWxsLmFjdGl2YXRlQnlJZCh3aWRnZXQuaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgZGlydHkgc3RhdGUgZm9yIG9wZW4gZG9jdW1lbnRzLlxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSBkb2NNYW5hZ2VyLmNvbnRleHRGb3JXaWRnZXQod2lkZ2V0KTtcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dCAmJiAhY29udGV4dHMuaGFzKGNvbnRleHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUNvbnRleHQoc3RhdHVzLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0cy5hZGQoY29udGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZWdpc3RyeSA9IGFwcC5kb2NSZWdpc3RyeTtcbiAgICAgICAgY29uc3Qgd2hlbiA9IGFwcC5yZXN0b3JlZC50aGVuKCgpID0+IHZvaWQgMCk7XG4gICAgICAgIGNvbnN0IGRvY01hbmFnZXIgPSBuZXcgRG9jdW1lbnRNYW5hZ2VyKHtcbiAgICAgICAgICAgIHJlZ2lzdHJ5LFxuICAgICAgICAgICAgbWFuYWdlcixcbiAgICAgICAgICAgIG9wZW5lcixcbiAgICAgICAgICAgIHdoZW4sXG4gICAgICAgICAgICBzZXRCdXN5OiAoX2EgPSAoc3RhdHVzICYmICgoKSA9PiBzdGF0dXMuc2V0QnVzeSgpKSkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHNlc3Npb25EaWFsb2dzOiBzZXNzaW9uRGlhbG9ncyB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICB0cmFuc2xhdG9yLFxuICAgICAgICAgICAgY29sbGFib3JhdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIGRvY1Byb3ZpZGVyRmFjdG9yeTogZG9jUHJvdmlkZXJGYWN0b3J5ICE9PSBudWxsICYmIGRvY1Byb3ZpZGVyRmFjdG9yeSAhPT0gdm9pZCAwID8gZG9jUHJvdmlkZXJGYWN0b3J5IDogdW5kZWZpbmVkXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBSZWdpc3RlciB0aGUgZmlsZSBvcGVyYXRpb25zIGNvbW1hbmRzLlxuICAgICAgICBhZGRDb21tYW5kcyhhcHAsIGRvY01hbmFnZXIsIG9wZW5lciwgc2V0dGluZ1JlZ2lzdHJ5LCB0cmFuc2xhdG9yLCBsYWJTaGVsbCwgcGFsZXR0ZSk7XG4gICAgICAgIC8vIEtlZXAgdXAgdG8gZGF0ZSB3aXRoIHRoZSBzZXR0aW5ncyByZWdpc3RyeS5cbiAgICAgICAgY29uc3Qgb25TZXR0aW5nc1VwZGF0ZWQgPSAoc2V0dGluZ3MpID0+IHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSB3aGV0aGVyIHRvIGF1dG9zYXZlXG4gICAgICAgICAgICBjb25zdCBhdXRvc2F2ZSA9IHNldHRpbmdzLmdldCgnYXV0b3NhdmUnKS5jb21wb3NpdGU7XG4gICAgICAgICAgICBkb2NNYW5hZ2VyLmF1dG9zYXZlID1cbiAgICAgICAgICAgICAgICBhdXRvc2F2ZSA9PT0gdHJ1ZSB8fCBhdXRvc2F2ZSA9PT0gZmFsc2UgPyBhdXRvc2F2ZSA6IHRydWU7XG4gICAgICAgICAgICBhcHAuY29tbWFuZHMubm90aWZ5Q29tbWFuZENoYW5nZWQoQ29tbWFuZElEcy50b2dnbGVBdXRvc2F2ZSk7XG4gICAgICAgICAgICAvLyBIYW5kbGUgYXV0b3NhdmUgaW50ZXJ2YWxcbiAgICAgICAgICAgIGNvbnN0IGF1dG9zYXZlSW50ZXJ2YWwgPSBzZXR0aW5ncy5nZXQoJ2F1dG9zYXZlSW50ZXJ2YWwnKS5jb21wb3NpdGU7XG4gICAgICAgICAgICBkb2NNYW5hZ2VyLmF1dG9zYXZlSW50ZXJ2YWwgPSBhdXRvc2F2ZUludGVydmFsIHx8IDEyMDtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBsYXN0IG1vZGlmaWVkIHRpbWVzdGFtcCBjaGVjayBtYXJnaW5cbiAgICAgICAgICAgIGNvbnN0IGxhc3RNb2RpZmllZENoZWNrTWFyZ2luID0gc2V0dGluZ3MuZ2V0KCdsYXN0TW9kaWZpZWRDaGVja01hcmdpbicpXG4gICAgICAgICAgICAgICAgLmNvbXBvc2l0ZTtcbiAgICAgICAgICAgIGRvY01hbmFnZXIubGFzdE1vZGlmaWVkQ2hlY2tNYXJnaW4gPSBsYXN0TW9kaWZpZWRDaGVja01hcmdpbiB8fCA1MDA7XG4gICAgICAgICAgICAvLyBIYW5kbGUgZGVmYXVsdCB3aWRnZXQgZmFjdG9yeSBvdmVycmlkZXMuXG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0Vmlld2VycyA9IHNldHRpbmdzLmdldCgnZGVmYXVsdFZpZXdlcnMnKS5jb21wb3NpdGU7XG4gICAgICAgICAgICBjb25zdCBvdmVycmlkZXMgPSB7fTtcbiAgICAgICAgICAgIC8vIEZpbHRlciB0aGUgZGVmYXVsdFZpZXdlcnMgYW5kIGZpbGUgdHlwZXMgZm9yIGV4aXN0aW5nIG9uZXMuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhkZWZhdWx0Vmlld2VycykuZm9yRWFjaChmdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZWdpc3RyeS5nZXRGaWxlVHlwZShmdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBGaWxlIFR5cGUgJHtmdH0gbm90IGZvdW5kYCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFyZWdpc3RyeS5nZXRXaWRnZXRGYWN0b3J5KGRlZmF1bHRWaWV3ZXJzW2Z0XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBEb2N1bWVudCB2aWV3ZXIgJHtkZWZhdWx0Vmlld2Vyc1tmdF19IG5vdCBmb3VuZGApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvdmVycmlkZXNbZnRdID0gZGVmYXVsdFZpZXdlcnNbZnRdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBTZXQgdGhlIGRlZmF1bHQgZmFjdG9yeSBvdmVycmlkZXMuIElmIG5vdCBwcm92aWRlZCwgdGhpcyBoYXMgdGhlXG4gICAgICAgICAgICAvLyBlZmZlY3Qgb2YgdW5zZXR0aW5nIGFueSBwcmV2aW91cyBvdmVycmlkZXMuXG4gICAgICAgICAgICBlYWNoKHJlZ2lzdHJ5LmZpbGVUeXBlcygpLCBmdCA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0cnkuc2V0RGVmYXVsdFdpZGdldEZhY3RvcnkoZnQubmFtZSwgb3ZlcnJpZGVzW2Z0Lm5hbWVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRmFpbGVkIHRvIHNldCBkZWZhdWx0IHZpZXdlciAke292ZXJyaWRlc1tmdC5uYW1lXX0gZm9yIGZpbGUgdHlwZSAke2Z0Lm5hbWV9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIEZldGNoIHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBzZXR0aW5ncy5cbiAgICAgICAgUHJvbWlzZS5hbGwoW3NldHRpbmdSZWdpc3RyeS5sb2FkKGRvY01hbmFnZXJQbHVnaW5JZCksIGFwcC5yZXN0b3JlZF0pXG4gICAgICAgICAgICAudGhlbigoW3NldHRpbmdzXSkgPT4ge1xuICAgICAgICAgICAgc2V0dGluZ3MuY2hhbmdlZC5jb25uZWN0KG9uU2V0dGluZ3NVcGRhdGVkKTtcbiAgICAgICAgICAgIG9uU2V0dGluZ3NVcGRhdGVkKHNldHRpbmdzKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHJlYXNvbi5tZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFJlZ2lzdGVyIGEgZmV0Y2ggdHJhbnNmb3JtZXIgZm9yIHRoZSBzZXR0aW5ncyByZWdpc3RyeSxcbiAgICAgICAgLy8gYWxsb3dpbmcgdXMgdG8gZHluYW1pY2FsbHkgcG9wdWxhdGUgYSBoZWxwIHN0cmluZyB3aXRoIHRoZVxuICAgICAgICAvLyBhdmFpbGFibGUgZG9jdW1lbnQgdmlld2VycyBhbmQgZmlsZSB0eXBlcyBmb3IgdGhlIGRlZmF1bHRcbiAgICAgICAgLy8gdmlld2VyIG92ZXJyaWRlcy5cbiAgICAgICAgc2V0dGluZ1JlZ2lzdHJ5LnRyYW5zZm9ybShkb2NNYW5hZ2VyUGx1Z2luSWQsIHtcbiAgICAgICAgICAgIGZldGNoOiBwbHVnaW4gPT4ge1xuICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgYXZhaWxhYmxlIGZpbGUgdHlwZXMuXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZVR5cGVzID0gdG9BcnJheShyZWdpc3RyeS5maWxlVHlwZXMoKSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcChmdCA9PiBmdC5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAuam9pbignICAgIFxcbicpO1xuICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgYXZhaWxhYmxlIHdpZGdldCBmYWN0b3JpZXMuXG4gICAgICAgICAgICAgICAgY29uc3QgZmFjdG9yaWVzID0gdG9BcnJheShyZWdpc3RyeS53aWRnZXRGYWN0b3JpZXMoKSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcChmID0+IGYubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oJyAgICBcXG4nKTtcbiAgICAgICAgICAgICAgICAvLyBHZW5lcmF0ZSB0aGUgaGVscCBzdHJpbmcuXG4gICAgICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSB0cmFucy5fXyhgT3ZlcnJpZGVzIGZvciB0aGUgZGVmYXVsdCB2aWV3ZXJzIGZvciBmaWxlIHR5cGVzLlxuU3BlY2lmeSBhIG1hcHBpbmcgZnJvbSBmaWxlIHR5cGUgbmFtZSB0byBkb2N1bWVudCB2aWV3ZXIgbmFtZSwgZm9yIGV4YW1wbGU6XG5cbmRlZmF1bHRWaWV3ZXJzOiB7XG4gIG1hcmtkb3duOiBcIk1hcmtkb3duIFByZXZpZXdcIlxufVxuXG5JZiB5b3Ugc3BlY2lmeSBub24tZXhpc3RlbnQgZmlsZSB0eXBlcyBvciB2aWV3ZXJzLCBvciBpZiBhIHZpZXdlciBjYW5ub3Rcbm9wZW4gYSBnaXZlbiBmaWxlIHR5cGUsIHRoZSBvdmVycmlkZSB3aWxsIG5vdCBmdW5jdGlvbi5cblxuQXZhaWxhYmxlIHZpZXdlcnM6XG4lMVxuXG5BdmFpbGFibGUgZmlsZSB0eXBlczpcbiUyYCwgZmFjdG9yaWVzLCBmaWxlVHlwZXMpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjaGVtYSA9IEpTT05FeHQuZGVlcENvcHkocGx1Z2luLnNjaGVtYSk7XG4gICAgICAgICAgICAgICAgc2NoZW1hLnByb3BlcnRpZXMuZGVmYXVsdFZpZXdlcnMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwbHVnaW4pLCB7IHNjaGVtYSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIElmIHRoZSBkb2N1bWVudCByZWdpc3RyeSBnYWlucyBvciBsb3NlcyBhIGZhY3Rvcnkgb3IgZmlsZSB0eXBlLFxuICAgICAgICAvLyByZWdlbmVyYXRlIHRoZSBzZXR0aW5ncyBkZXNjcmlwdGlvbiB3aXRoIHRoZSBhdmFpbGFibGUgb3B0aW9ucy5cbiAgICAgICAgcmVnaXN0cnkuY2hhbmdlZC5jb25uZWN0KCgpID0+IHNldHRpbmdSZWdpc3RyeS5yZWxvYWQoZG9jTWFuYWdlclBsdWdpbklkKSk7XG4gICAgICAgIHJldHVybiBkb2NNYW5hZ2VyO1xuICAgIH1cbn07XG4vKipcbiAqIEEgcGx1Z2luIGZvciBhZGRpbmcgYSBzYXZpbmcgc3RhdHVzIGl0ZW0gdG8gdGhlIHN0YXR1cyBiYXIuXG4gKi9cbmV4cG9ydCBjb25zdCBzYXZpbmdTdGF0dXNQbHVnaW4gPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9kb2NtYW5hZ2VyLWV4dGVuc2lvbjpzYXZpbmctc3RhdHVzJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJRG9jdW1lbnRNYW5hZ2VyLCBJTGFiU2hlbGwsIElUcmFuc2xhdG9yXSxcbiAgICBvcHRpb25hbDogW0lTdGF0dXNCYXJdLFxuICAgIGFjdGl2YXRlOiAoXywgZG9jTWFuYWdlciwgbGFiU2hlbGwsIHRyYW5zbGF0b3IsIHN0YXR1c0JhcikgPT4ge1xuICAgICAgICBpZiAoIXN0YXR1c0Jhcikge1xuICAgICAgICAgICAgLy8gQXV0b21hdGljYWxseSBkaXNhYmxlIGlmIHN0YXR1c2JhciBtaXNzaW5nXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2F2aW5nID0gbmV3IFNhdmluZ1N0YXR1cyh7IGRvY01hbmFnZXIsIHRyYW5zbGF0b3IgfSk7XG4gICAgICAgIC8vIEtlZXAgdGhlIGN1cnJlbnRseSBhY3RpdmUgd2lkZ2V0IHN5bmNocm9uaXplZC5cbiAgICAgICAgc2F2aW5nLm1vZGVsLndpZGdldCA9IGxhYlNoZWxsLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgIGxhYlNoZWxsLmN1cnJlbnRDaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgc2F2aW5nLm1vZGVsLndpZGdldCA9IGxhYlNoZWxsLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgIH0pO1xuICAgICAgICBzdGF0dXNCYXIucmVnaXN0ZXJTdGF0dXNJdGVtKHNhdmluZ1N0YXR1c1BsdWdpbi5pZCwge1xuICAgICAgICAgICAgaXRlbTogc2F2aW5nLFxuICAgICAgICAgICAgYWxpZ246ICdtaWRkbGUnLFxuICAgICAgICAgICAgaXNBY3RpdmU6ICgpID0+IHNhdmluZy5tb2RlbCAhPT0gbnVsbCAmJiBzYXZpbmcubW9kZWwuc3RhdHVzICE9PSBudWxsLFxuICAgICAgICAgICAgYWN0aXZlU3RhdGVDaGFuZ2VkOiBzYXZpbmcubW9kZWwuc3RhdGVDaGFuZ2VkXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4vKipcbiAqIEEgcGx1Z2luIHByb3ZpZGluZyBhIGZpbGUgcGF0aCB3aWRnZXQgdG8gdGhlIHN0YXR1cyBiYXIuXG4gKi9cbmV4cG9ydCBjb25zdCBwYXRoU3RhdHVzUGx1Z2luID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvZG9jbWFuYWdlci1leHRlbnNpb246cGF0aC1zdGF0dXMnLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICByZXF1aXJlczogW0lEb2N1bWVudE1hbmFnZXIsIElMYWJTaGVsbF0sXG4gICAgb3B0aW9uYWw6IFtJU3RhdHVzQmFyXSxcbiAgICBhY3RpdmF0ZTogKF8sIGRvY01hbmFnZXIsIGxhYlNoZWxsLCBzdGF0dXNCYXIpID0+IHtcbiAgICAgICAgaWYgKCFzdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIC8vIEF1dG9tYXRpY2FsbHkgZGlzYWJsZSBpZiBzdGF0dXNiYXIgbWlzc2luZ1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhdGggPSBuZXcgUGF0aFN0YXR1cyh7IGRvY01hbmFnZXIgfSk7XG4gICAgICAgIC8vIEtlZXAgdGhlIGZpbGUgcGF0aCB3aWRnZXQgdXAtdG8tZGF0ZSB3aXRoIHRoZSBhcHBsaWNhdGlvbiBhY3RpdmUgd2lkZ2V0LlxuICAgICAgICBwYXRoLm1vZGVsLndpZGdldCA9IGxhYlNoZWxsLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgIGxhYlNoZWxsLmN1cnJlbnRDaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgcGF0aC5tb2RlbC53aWRnZXQgPSBsYWJTaGVsbC5jdXJyZW50V2lkZ2V0O1xuICAgICAgICB9KTtcbiAgICAgICAgc3RhdHVzQmFyLnJlZ2lzdGVyU3RhdHVzSXRlbShwYXRoU3RhdHVzUGx1Z2luLmlkLCB7XG4gICAgICAgICAgICBpdGVtOiBwYXRoLFxuICAgICAgICAgICAgYWxpZ246ICdyaWdodCcsXG4gICAgICAgICAgICByYW5rOiAwXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4vKipcbiAqIEEgcGx1Z2luIHByb3ZpZGluZyBkb3dubG9hZCBjb21tYW5kcyBpbiB0aGUgZmlsZSBtZW51IGFuZCBjb21tYW5kIHBhbGV0dGUuXG4gKi9cbmV4cG9ydCBjb25zdCBkb3dubG9hZFBsdWdpbiA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2RvY21hbmFnZXItZXh0ZW5zaW9uOmRvd25sb2FkJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJVHJhbnNsYXRvciwgSURvY3VtZW50TWFuYWdlcl0sXG4gICAgb3B0aW9uYWw6IFtJQ29tbWFuZFBhbGV0dGVdLFxuICAgIGFjdGl2YXRlOiAoYXBwLCB0cmFuc2xhdG9yLCBkb2NNYW5hZ2VyLCBwYWxldHRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMsIHNoZWxsIH0gPSBhcHA7XG4gICAgICAgIGNvbnN0IGlzRW5hYmxlZCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY3VycmVudFdpZGdldCB9ID0gc2hlbGw7XG4gICAgICAgICAgICByZXR1cm4gISEoY3VycmVudFdpZGdldCAmJiBkb2NNYW5hZ2VyLmNvbnRleHRGb3JXaWRnZXQoY3VycmVudFdpZGdldCkpO1xuICAgICAgICB9O1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuZG93bmxvYWQsIHtcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnRG93bmxvYWQnKSxcbiAgICAgICAgICAgIGNhcHRpb246IHRyYW5zLl9fKCdEb3dubG9hZCB0aGUgZmlsZSB0byB5b3VyIGNvbXB1dGVyJyksXG4gICAgICAgICAgICBpc0VuYWJsZWQsXG4gICAgICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2tzIHRoYXQgc2hlbGwuY3VycmVudFdpZGdldCBpcyB2YWxpZDpcbiAgICAgICAgICAgICAgICBpZiAoaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGV4dCA9IGRvY01hbmFnZXIuY29udGV4dEZvcldpZGdldChzaGVsbC5jdXJyZW50V2lkZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdDYW5ub3QgRG93bmxvYWQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiB0cmFucy5fXygnTm8gY29udGV4dCBmb3VuZCBmb3IgY3VycmVudCB3aWRnZXQhJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW0RpYWxvZy5va0J1dHRvbih7IGxhYmVsOiB0cmFucy5fXygnT0snKSB9KV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0LmRvd25sb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSB0cmFucy5fXygnRmlsZSBPcGVyYXRpb25zJyk7XG4gICAgICAgIGlmIChwYWxldHRlKSB7XG4gICAgICAgICAgICBwYWxldHRlLmFkZEl0ZW0oeyBjb21tYW5kOiBDb21tYW5kSURzLmRvd25sb2FkLCBjYXRlZ29yeSB9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4vKipcbiAqIEEgcGx1Z2luIHByb3ZpZGluZyBvcGVuLWJyb3dzZXItdGFiIGNvbW1hbmRzLlxuICpcbiAqIFRoaXMgaXMgaXRzIG93biBwbHVnaW4gaW4gY2FzZSB5b3Ugd291bGQgbGlrZSB0byBkaXNhYmxlIHRoaXMgZmVhdHVyZS5cbiAqIGUuZy4ganVweXRlciBsYWJleHRlbnNpb24gZGlzYWJsZSBAanVweXRlcmxhYi9kb2NtYW5hZ2VyLWV4dGVuc2lvbjpvcGVuLWJyb3dzZXItdGFiXG4gKlxuICogTm90ZTogSWYgZGlzYWJsaW5nIHRoaXMsIHlvdSBtYXkgYWxzbyB3YW50IHRvIGRpc2FibGU6XG4gKiBAanVweXRlcmxhYi9maWxlYnJvd3Nlci1leHRlbnNpb246b3Blbi1icm93c2VyLXRhYlxuICovXG5leHBvcnQgY29uc3Qgb3BlbkJyb3dzZXJUYWJQbHVnaW4gPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9kb2NtYW5hZ2VyLWV4dGVuc2lvbjpvcGVuLWJyb3dzZXItdGFiJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJVHJhbnNsYXRvciwgSURvY3VtZW50TWFuYWdlcl0sXG4gICAgYWN0aXZhdGU6IChhcHAsIHRyYW5zbGF0b3IsIGRvY01hbmFnZXIpID0+IHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kcyB9ID0gYXBwO1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMub3BlbkJyb3dzZXJUYWIsIHtcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGggPSB0eXBlb2YgYXJnc1sncGF0aCddID09PSAndW5kZWZpbmVkJyA/ICcnIDogYXJnc1sncGF0aCddO1xuICAgICAgICAgICAgICAgIGlmICghcGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkb2NNYW5hZ2VyLnNlcnZpY2VzLmNvbnRlbnRzLmdldERvd25sb2FkVXJsKHBhdGgpLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3BlbmVkID0gd2luZG93Lm9wZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wZW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkLm9wZW5lciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIG9wZW4gbmV3IGJyb3dzZXIgdGFiLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaWNvbjogYXJncyA9PiBhcmdzWydpY29uJ10gfHwgJycsXG4gICAgICAgICAgICBsYWJlbDogKCkgPT4gdHJhbnMuX18oJ09wZW4gaW4gTmV3IEJyb3dzZXIgVGFiJylcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbi8qKlxuICogRXhwb3J0IHRoZSBwbHVnaW5zIGFzIGRlZmF1bHQuXG4gKi9cbmNvbnN0IHBsdWdpbnMgPSBbXG4gICAgZG9jTWFuYWdlclBsdWdpbixcbiAgICBwYXRoU3RhdHVzUGx1Z2luLFxuICAgIHNhdmluZ1N0YXR1c1BsdWdpbixcbiAgICBkb3dubG9hZFBsdWdpbixcbiAgICBvcGVuQnJvd3NlclRhYlBsdWdpblxuXTtcbmV4cG9ydCBkZWZhdWx0IHBsdWdpbnM7XG4vKipcbiAqIFRvb2xiYXIgaXRlbSBmYWN0b3J5XG4gKi9cbmV4cG9ydCB2YXIgVG9vbGJhckl0ZW1zO1xuKGZ1bmN0aW9uIChUb29sYmFySXRlbXMpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgc2F2ZSBidXR0b24gdG9vbGJhciBpdGVtLlxuICAgICAqXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlU2F2ZUJ1dHRvbihjb21tYW5kcywgZmlsZUNoYW5nZWQpIHtcbiAgICAgICAgcmV0dXJuIGFkZENvbW1hbmRUb29sYmFyQnV0dG9uQ2xhc3MoUmVhY3RXaWRnZXQuY3JlYXRlKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVXNlU2lnbmFsLCB7IHNpZ25hbDogZmlsZUNoYW5nZWQgfSwgKCkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tbWFuZFRvb2xiYXJCdXR0b25Db21wb25lbnQsIHsgY29tbWFuZHM6IGNvbW1hbmRzLCBpZDogQ29tbWFuZElEcy5zYXZlLCBsYWJlbDogJycsIGFyZ3M6IHsgdG9vbGJhcjogdHJ1ZSB9IH0pKSkpKTtcbiAgICB9XG4gICAgVG9vbGJhckl0ZW1zLmNyZWF0ZVNhdmVCdXR0b24gPSBjcmVhdGVTYXZlQnV0dG9uO1xufSkoVG9vbGJhckl0ZW1zIHx8IChUb29sYmFySXRlbXMgPSB7fSkpO1xuLyogV2lkZ2V0IHRvIGRpc3BsYXkgdGhlIHJldmVydCB0byBjaGVja3BvaW50IGNvbmZpcm1hdGlvbi4gKi9cbmNsYXNzIFJldmVydENvbmZpcm1XaWRnZXQgZXh0ZW5kcyBXaWRnZXQge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyByZXZlcnQgY29uZmlybWF0aW9uIHdpZGdldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjaGVja3BvaW50LCB0cmFucywgZmlsZVR5cGUgPSAnbm90ZWJvb2snKSB7XG4gICAgICAgIHN1cGVyKHtcbiAgICAgICAgICAgIG5vZGU6IFByaXZhdGUuY3JlYXRlUmV2ZXJ0Q29uZmlybU5vZGUoY2hlY2twb2ludCwgZmlsZVR5cGUsIHRyYW5zKVxuICAgICAgICB9KTtcbiAgICB9XG59XG4vLyBSZXR1cm5zIHRoZSBmaWxlIHR5cGUgZm9yIGEgd2lkZ2V0LlxuZnVuY3Rpb24gZmlsZVR5cGUod2lkZ2V0LCBkb2NNYW5hZ2VyKSB7XG4gICAgaWYgKCF3aWRnZXQpIHtcbiAgICAgICAgcmV0dXJuICdGaWxlJztcbiAgICB9XG4gICAgY29uc3QgY29udGV4dCA9IGRvY01hbmFnZXIuY29udGV4dEZvcldpZGdldCh3aWRnZXQpO1xuICAgIGlmICghY29udGV4dCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGNvbnN0IGZ0cyA9IGRvY01hbmFnZXIucmVnaXN0cnkuZ2V0RmlsZVR5cGVzRm9yUGF0aChjb250ZXh0LnBhdGgpO1xuICAgIHJldHVybiBmdHMubGVuZ3RoICYmIGZ0c1swXS5kaXNwbGF5TmFtZSA/IGZ0c1swXS5kaXNwbGF5TmFtZSA6ICdGaWxlJztcbn1cbi8qKlxuICogQWRkIHRoZSBmaWxlIG9wZXJhdGlvbnMgY29tbWFuZHMgdG8gdGhlIGFwcGxpY2F0aW9uJ3MgY29tbWFuZCByZWdpc3RyeS5cbiAqL1xuZnVuY3Rpb24gYWRkQ29tbWFuZHMoYXBwLCBkb2NNYW5hZ2VyLCBvcGVuZXIsIHNldHRpbmdSZWdpc3RyeSwgdHJhbnNsYXRvciwgbGFiU2hlbGwsIHBhbGV0dGUpIHtcbiAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgIGNvbnN0IHsgY29tbWFuZHMsIHNoZWxsIH0gPSBhcHA7XG4gICAgY29uc3QgY2F0ZWdvcnkgPSB0cmFucy5fXygnRmlsZSBPcGVyYXRpb25zJyk7XG4gICAgY29uc3QgaXNFbmFibGVkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7IGN1cnJlbnRXaWRnZXQgfSA9IHNoZWxsO1xuICAgICAgICByZXR1cm4gISEoY3VycmVudFdpZGdldCAmJiBkb2NNYW5hZ2VyLmNvbnRleHRGb3JXaWRnZXQoY3VycmVudFdpZGdldCkpO1xuICAgIH07XG4gICAgY29uc3QgaXNXcml0YWJsZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50V2lkZ2V0IH0gPSBzaGVsbDtcbiAgICAgICAgaWYgKCFjdXJyZW50V2lkZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29udGV4dCA9IGRvY01hbmFnZXIuY29udGV4dEZvcldpZGdldChjdXJyZW50V2lkZ2V0KTtcbiAgICAgICAgcmV0dXJuICEhKGNvbnRleHQgJiZcbiAgICAgICAgICAgIGNvbnRleHQuY29udGVudHNNb2RlbCAmJlxuICAgICAgICAgICAgY29udGV4dC5jb250ZW50c01vZGVsLndyaXRhYmxlKTtcbiAgICB9O1xuICAgIC8vIElmIGluc2lkZSBhIHJpY2ggYXBwbGljYXRpb24gbGlrZSBKdXB5dGVyTGFiLCBhZGQgYWRkaXRpb25hbCBmdW5jdGlvbmFsaXR5LlxuICAgIGlmIChsYWJTaGVsbCkge1xuICAgICAgICBhZGRMYWJDb21tYW5kcyhhcHAsIGRvY01hbmFnZXIsIGxhYlNoZWxsLCBvcGVuZXIsIHRyYW5zbGF0b3IpO1xuICAgIH1cbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuZGVsZXRlRmlsZSwge1xuICAgICAgICBsYWJlbDogKCkgPT4gYERlbGV0ZSAke2ZpbGVUeXBlKHNoZWxsLmN1cnJlbnRXaWRnZXQsIGRvY01hbmFnZXIpfWAsXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGF0aCA9IHR5cGVvZiBhcmdzWydwYXRoJ10gPT09ICd1bmRlZmluZWQnID8gJycgOiBhcmdzWydwYXRoJ107XG4gICAgICAgICAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tYW5kID0gQ29tbWFuZElEcy5kZWxldGVGaWxlO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQSBub24tZW1wdHkgcGF0aCBpcyByZXF1aXJlZCBmb3IgJHtjb21tYW5kfS5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkb2NNYW5hZ2VyLmRlbGV0ZUZpbGUocGF0aCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMubmV3VW50aXRsZWQsIHtcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICAvLyBGSVhNRS1UUkFOUzogTG9jYWxpemluZyBhcmdzWydlcnJvciddP1xuICAgICAgICAgICAgY29uc3QgZXJyb3JUaXRsZSA9IGFyZ3NbJ2Vycm9yJ10gfHwgdHJhbnMuX18oJ0Vycm9yJyk7XG4gICAgICAgICAgICBjb25zdCBwYXRoID0gdHlwZW9mIGFyZ3NbJ3BhdGgnXSA9PT0gJ3VuZGVmaW5lZCcgPyAnJyA6IGFyZ3NbJ3BhdGgnXTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogYXJnc1sndHlwZSddLFxuICAgICAgICAgICAgICAgIHBhdGhcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoYXJnc1sndHlwZSddID09PSAnZmlsZScpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmV4dCA9IGFyZ3NbJ2V4dCddIHx8ICcudHh0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkb2NNYW5hZ2VyLnNlcnZpY2VzLmNvbnRlbnRzXG4gICAgICAgICAgICAgICAgLm5ld1VudGl0bGVkKG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHNob3dFcnJvck1lc3NhZ2UoZXJyb3JUaXRsZSwgZXJyb3IpKTtcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IGFyZ3MgPT4gYXJnc1snbGFiZWwnXSB8fCBgTmV3ICR7YXJnc1sndHlwZSddfWBcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMub3Blbiwge1xuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSB0eXBlb2YgYXJnc1sncGF0aCddID09PSAndW5kZWZpbmVkJyA/ICcnIDogYXJnc1sncGF0aCddO1xuICAgICAgICAgICAgY29uc3QgZmFjdG9yeSA9IGFyZ3NbJ2ZhY3RvcnknXSB8fCB2b2lkIDA7XG4gICAgICAgICAgICBjb25zdCBrZXJuZWwgPSBhcmdzID09PSBudWxsIHx8IGFyZ3MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFyZ3Mua2VybmVsO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGFyZ3NbJ29wdGlvbnMnXSB8fCB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4gZG9jTWFuYWdlci5zZXJ2aWNlcy5jb250ZW50c1xuICAgICAgICAgICAgICAgIC5nZXQocGF0aCwgeyBjb250ZW50OiBmYWxzZSB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGRvY01hbmFnZXIub3Blbk9yUmV2ZWFsKHBhdGgsIGZhY3RvcnksIGtlcm5lbCwgb3B0aW9ucykpO1xuICAgICAgICB9LFxuICAgICAgICBpY29uOiBhcmdzID0+IGFyZ3NbJ2ljb24nXSB8fCAnJyxcbiAgICAgICAgbGFiZWw6IGFyZ3MgPT4gKGFyZ3NbJ2xhYmVsJ10gfHwgYXJnc1snZmFjdG9yeSddKSxcbiAgICAgICAgbW5lbW9uaWM6IGFyZ3MgPT4gYXJnc1snbW5lbW9uaWMnXSB8fCAtMVxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5yZWxvYWQsIHtcbiAgICAgICAgbGFiZWw6ICgpID0+IHRyYW5zLl9fKCdSZWxvYWQgJTEgZnJvbSBEaXNrJywgZmlsZVR5cGUoc2hlbGwuY3VycmVudFdpZGdldCwgZG9jTWFuYWdlcikpLFxuICAgICAgICBjYXB0aW9uOiB0cmFucy5fXygnUmVsb2FkIGNvbnRlbnRzIGZyb20gZGlzaycpLFxuICAgICAgICBpc0VuYWJsZWQsXG4gICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgIC8vIENoZWNrcyB0aGF0IHNoZWxsLmN1cnJlbnRXaWRnZXQgaXMgdmFsaWQ6XG4gICAgICAgICAgICBpZiAoIWlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY29udGV4dCA9IGRvY01hbmFnZXIuY29udGV4dEZvcldpZGdldChzaGVsbC5jdXJyZW50V2lkZ2V0KTtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBmaWxlVHlwZShzaGVsbC5jdXJyZW50V2lkZ2V0LCBkb2NNYW5hZ2VyKTtcbiAgICAgICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaG93RGlhbG9nKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdDYW5ub3QgUmVsb2FkJyksXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHRyYW5zLl9fKCdObyBjb250ZXh0IGZvdW5kIGZvciBjdXJyZW50IHdpZGdldCEnKSxcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW0RpYWxvZy5va0J1dHRvbih7IGxhYmVsOiB0cmFucy5fXygnT2snKSB9KV1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb250ZXh0Lm1vZGVsLmRpcnR5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNob3dEaWFsb2coe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdHJhbnMuX18oJ1JlbG9hZCAlMSBmcm9tIERpc2snLCB0eXBlKSxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogdHJhbnMuX18oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byByZWxvYWQgdGhlICUxIGZyb20gdGhlIGRpc2s/JywgdHlwZSksXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZy5jYW5jZWxCdXR0b24oeyBsYWJlbDogdHJhbnMuX18oJ0NhbmNlbCcpIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9nLndhcm5CdXR0b24oeyBsYWJlbDogdHJhbnMuX18oJ1JlbG9hZCcpIH0pXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuYnV0dG9uLmFjY2VwdCAmJiAhY29udGV4dC5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5yZXZlcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0LmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQucmV2ZXJ0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnJlc3RvcmVDaGVja3BvaW50LCB7XG4gICAgICAgIGxhYmVsOiAoKSA9PiB0cmFucy5fXygnUmV2ZXJ0ICUxIHRvIENoZWNrcG9pbnQnLCBmaWxlVHlwZShzaGVsbC5jdXJyZW50V2lkZ2V0LCBkb2NNYW5hZ2VyKSksXG4gICAgICAgIGNhcHRpb246IHRyYW5zLl9fKCdSZXZlcnQgY29udGVudHMgdG8gcHJldmlvdXMgY2hlY2twb2ludCcpLFxuICAgICAgICBpc0VuYWJsZWQsXG4gICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgIC8vIENoZWNrcyB0aGF0IHNoZWxsLmN1cnJlbnRXaWRnZXQgaXMgdmFsaWQ6XG4gICAgICAgICAgICBpZiAoIWlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY29udGV4dCA9IGRvY01hbmFnZXIuY29udGV4dEZvcldpZGdldChzaGVsbC5jdXJyZW50V2lkZ2V0KTtcbiAgICAgICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaG93RGlhbG9nKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdDYW5ub3QgUmV2ZXJ0JyksXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHRyYW5zLl9fKCdObyBjb250ZXh0IGZvdW5kIGZvciBjdXJyZW50IHdpZGdldCEnKSxcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW0RpYWxvZy5va0J1dHRvbih7IGxhYmVsOiB0cmFucy5fXygnT2snKSB9KV1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0Lmxpc3RDaGVja3BvaW50cygpLnRoZW4oY2hlY2twb2ludHMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGVja3BvaW50cy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdENoZWNrcG9pbnQgPSBjaGVja3BvaW50c1tjaGVja3BvaW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAoIWxhc3RDaGVja3BvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IGZpbGVUeXBlKHNoZWxsLmN1cnJlbnRXaWRnZXQsIGRvY01hbmFnZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzaG93RGlhbG9nKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdSZXZlcnQgJTEgdG8gY2hlY2twb2ludCcsIHR5cGUpLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBuZXcgUmV2ZXJ0Q29uZmlybVdpZGdldChsYXN0Q2hlY2twb2ludCwgdHJhbnMsIHR5cGUpLFxuICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBEaWFsb2cuY2FuY2VsQnV0dG9uKHsgbGFiZWw6IHRyYW5zLl9fKCdDYW5jZWwnKSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZy53YXJuQnV0dG9uKHsgbGFiZWw6IHRyYW5zLl9fKCdSZXZlcnQnKSB9KVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5idXR0b24uYWNjZXB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5tb2RlbC5yZWFkT25seSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0LnJldmVydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQucmVzdG9yZUNoZWNrcG9pbnQoKS50aGVuKCgpID0+IGNvbnRleHQucmV2ZXJ0KCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5zYXZlLCB7XG4gICAgICAgIGxhYmVsOiAoKSA9PiB0cmFucy5fXygnU2F2ZSAlMScsIGZpbGVUeXBlKHNoZWxsLmN1cnJlbnRXaWRnZXQsIGRvY01hbmFnZXIpKSxcbiAgICAgICAgY2FwdGlvbjogdHJhbnMuX18oJ1NhdmUgYW5kIGNyZWF0ZSBjaGVja3BvaW50JyksXG4gICAgICAgIGljb246IGFyZ3MgPT4gKGFyZ3MudG9vbGJhciA/IHNhdmVJY29uIDogJycpLFxuICAgICAgICBpc0VuYWJsZWQ6IGlzV3JpdGFibGUsXG4gICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgIC8vIENoZWNrcyB0aGF0IHNoZWxsLmN1cnJlbnRXaWRnZXQgaXMgdmFsaWQ6XG4gICAgICAgICAgICBpZiAoaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSBzaGVsbC5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSBkb2NNYW5hZ2VyLmNvbnRleHRGb3JXaWRnZXQod2lkZ2V0KTtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNob3dEaWFsb2coe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdDYW5ub3QgU2F2ZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogdHJhbnMuX18oJ05vIGNvbnRleHQgZm91bmQgZm9yIGN1cnJlbnQgd2lkZ2V0IScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW0RpYWxvZy5va0J1dHRvbih7IGxhYmVsOiB0cmFucy5fXygnT2snKSB9KV1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5tb2RlbC5yZWFkT25seSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNob3dEaWFsb2coe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFucy5fXygnQ2Fubm90IFNhdmUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiB0cmFucy5fXygnRG9jdW1lbnQgaXMgcmVhZC1vbmx5JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW0RpYWxvZy5va0J1dHRvbih7IGxhYmVsOiB0cmFucy5fXygnT2snKSB9KV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAuc2F2ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh3aWRnZXQgPT09IG51bGwgfHwgd2lkZ2V0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aWRnZXQuaXNEaXNwb3NlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5jcmVhdGVDaGVja3BvaW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzYXZlIHdhcyBjYW5jZWxlZCBieSB1c2VyLWFjdGlvbiwgZG8gbm90aGluZy5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZJWE1FLVRSQU5TOiBJcyB0aGlzIHVzaW5nIHRoZSB0ZXh0IG9uIHRoZSBidXR0b24gb3I/XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyLm1lc3NhZ2UgPT09ICdDYW5jZWwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuc2F2ZUFsbCwge1xuICAgICAgICBsYWJlbDogKCkgPT4gdHJhbnMuX18oJ1NhdmUgQWxsJyksXG4gICAgICAgIGNhcHRpb246IHRyYW5zLl9fKCdTYXZlIGFsbCBvcGVuIGRvY3VtZW50cycpLFxuICAgICAgICBpc0VuYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzb21lKG1hcChzaGVsbC53aWRnZXRzKCdtYWluJyksIHcgPT4gZG9jTWFuYWdlci5jb250ZXh0Rm9yV2lkZ2V0KHcpKSwgYyA9PiB7IHZhciBfYSwgX2I7IHJldHVybiAoX2IgPSAoX2EgPSBjID09PSBudWxsIHx8IGMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGMuY29udGVudHNNb2RlbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLndyaXRhYmxlKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBmYWxzZTsgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgICAgICAgICBjb25zdCBwYXRocyA9IG5ldyBTZXQoKTsgLy8gQ2FjaGUgc28gd2UgZG9uJ3QgZG91YmxlIHNhdmUgZmlsZXMuXG4gICAgICAgICAgICBlYWNoKHNoZWxsLndpZGdldHMoJ21haW4nKSwgd2lkZ2V0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gZG9jTWFuYWdlci5jb250ZXh0Rm9yV2lkZ2V0KHdpZGdldCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQgJiYgIWNvbnRleHQubW9kZWwucmVhZE9ubHkgJiYgIXBhdGhzLmhhcyhjb250ZXh0LnBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhzLmFkZChjb250ZXh0LnBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKGNvbnRleHQuc2F2ZSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuc2F2ZUFzLCB7XG4gICAgICAgIGxhYmVsOiAoKSA9PiB0cmFucy5fXygnU2F2ZSAlMSBBc+KApicsIGZpbGVUeXBlKHNoZWxsLmN1cnJlbnRXaWRnZXQsIGRvY01hbmFnZXIpKSxcbiAgICAgICAgY2FwdGlvbjogdHJhbnMuX18oJ1NhdmUgd2l0aCBuZXcgcGF0aCcpLFxuICAgICAgICBpc0VuYWJsZWQsXG4gICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgIC8vIENoZWNrcyB0aGF0IHNoZWxsLmN1cnJlbnRXaWRnZXQgaXMgdmFsaWQ6XG4gICAgICAgICAgICBpZiAoaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gZG9jTWFuYWdlci5jb250ZXh0Rm9yV2lkZ2V0KHNoZWxsLmN1cnJlbnRXaWRnZXQpO1xuICAgICAgICAgICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdHJhbnMuX18oJ0Nhbm5vdCBTYXZlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiB0cmFucy5fXygnTm8gY29udGV4dCBmb3VuZCBmb3IgY3VycmVudCB3aWRnZXQhJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbRGlhbG9nLm9rQnV0dG9uKHsgbGFiZWw6IHRyYW5zLl9fKCdPaycpIH0pXVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQuc2F2ZUFzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMudG9nZ2xlQXV0b3NhdmUsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdBdXRvc2F2ZSBEb2N1bWVudHMnKSxcbiAgICAgICAgaXNUb2dnbGVkOiAoKSA9PiBkb2NNYW5hZ2VyLmF1dG9zYXZlLFxuICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9ICFkb2NNYW5hZ2VyLmF1dG9zYXZlO1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gJ2F1dG9zYXZlJztcbiAgICAgICAgICAgIHJldHVybiBzZXR0aW5nUmVnaXN0cnlcbiAgICAgICAgICAgICAgICAuc2V0KGRvY01hbmFnZXJQbHVnaW5JZCwga2V5LCB2YWx1ZSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBzZXQgJHtkb2NNYW5hZ2VyUGx1Z2luSWR9OiR7a2V5fSAtICR7cmVhc29uLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChwYWxldHRlKSB7XG4gICAgICAgIFtcbiAgICAgICAgICAgIENvbW1hbmRJRHMucmVsb2FkLFxuICAgICAgICAgICAgQ29tbWFuZElEcy5yZXN0b3JlQ2hlY2twb2ludCxcbiAgICAgICAgICAgIENvbW1hbmRJRHMuc2F2ZSxcbiAgICAgICAgICAgIENvbW1hbmRJRHMuc2F2ZUFzLFxuICAgICAgICAgICAgQ29tbWFuZElEcy50b2dnbGVBdXRvc2F2ZVxuICAgICAgICBdLmZvckVhY2goY29tbWFuZCA9PiB7XG4gICAgICAgICAgICBwYWxldHRlLmFkZEl0ZW0oeyBjb21tYW5kLCBjYXRlZ29yeSB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gYWRkTGFiQ29tbWFuZHMoYXBwLCBkb2NNYW5hZ2VyLCBsYWJTaGVsbCwgb3BlbmVyLCB0cmFuc2xhdG9yKSB7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICBjb25zdCB7IGNvbW1hbmRzIH0gPSBhcHA7XG4gICAgLy8gUmV0dXJucyB0aGUgZG9jIHdpZGdldCBhc3NvY2lhdGVkIHdpdGggdGhlIG1vc3QgcmVjZW50IGNvbnRleHRtZW51IGV2ZW50LlxuICAgIGNvbnN0IGNvbnRleHRNZW51V2lkZ2V0ID0gKCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHBhdGhSZSA9IC9bUHBdYXRoOlxccz8oLiopXFxuPy87XG4gICAgICAgIGNvbnN0IHRlc3QgPSAobm9kZSkgPT4geyB2YXIgX2E7IHJldHVybiAhISgoX2EgPSBub2RlWyd0aXRsZSddKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWF0Y2gocGF0aFJlKSk7IH07XG4gICAgICAgIGNvbnN0IG5vZGUgPSBhcHAuY29udGV4dE1lbnVIaXRUZXN0KHRlc3QpO1xuICAgICAgICBjb25zdCBwYXRoTWF0Y2ggPSBub2RlID09PSBudWxsIHx8IG5vZGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5vZGVbJ3RpdGxlJ10ubWF0Y2gocGF0aFJlKTtcbiAgICAgICAgcmV0dXJuICgoX2EgPSAocGF0aE1hdGNoICYmIGRvY01hbmFnZXIuZmluZFdpZGdldChwYXRoTWF0Y2hbMV0sIG51bGwpKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byBhY3RpdmUgZG9jIHdpZGdldCBpZiBwYXRoIGNhbm5vdCBiZSBvYnRhaW5lZCBmcm9tIGV2ZW50LlxuICAgICAgICBsYWJTaGVsbC5jdXJyZW50V2lkZ2V0KTtcbiAgICB9O1xuICAgIC8vIFJldHVybnMgYHRydWVgIGlmIHRoZSBjdXJyZW50IHdpZGdldCBoYXMgYSBkb2N1bWVudCBjb250ZXh0LlxuICAgIGNvbnN0IGlzRW5hYmxlZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50V2lkZ2V0IH0gPSBsYWJTaGVsbDtcbiAgICAgICAgcmV0dXJuICEhKGN1cnJlbnRXaWRnZXQgJiYgZG9jTWFuYWdlci5jb250ZXh0Rm9yV2lkZ2V0KGN1cnJlbnRXaWRnZXQpKTtcbiAgICB9O1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jbG9uZSwge1xuICAgICAgICBsYWJlbDogKCkgPT4gdHJhbnMuX18oJ05ldyBWaWV3IGZvciAlMScsIGZpbGVUeXBlKGNvbnRleHRNZW51V2lkZ2V0KCksIGRvY01hbmFnZXIpKSxcbiAgICAgICAgaXNFbmFibGVkLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IGNvbnRleHRNZW51V2lkZ2V0KCk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gYXJnc1snb3B0aW9ucyddIHx8IHtcbiAgICAgICAgICAgICAgICBtb2RlOiAnc3BsaXQtcmlnaHQnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKCF3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDbG9uZSB0aGUgd2lkZ2V0LlxuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBkb2NNYW5hZ2VyLmNsb25lV2lkZ2V0KHdpZGdldCk7XG4gICAgICAgICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgICAgICAgICBvcGVuZXIub3BlbihjaGlsZCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMucmVuYW1lLCB7XG4gICAgICAgIGxhYmVsOiAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdCA9IGZpbGVUeXBlKGNvbnRleHRNZW51V2lkZ2V0KCksIGRvY01hbmFnZXIpO1xuICAgICAgICAgICAgaWYgKHQpIHtcbiAgICAgICAgICAgICAgICB0ID0gJyAnICsgdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cmFucy5fXygnUmVuYW1lJTHigKYnLCB0KTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkLFxuICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBJbXBsaWVzIGNvbnRleHRNZW51V2lkZ2V0KCkgIT09IG51bGxcbiAgICAgICAgICAgIGlmIChpc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSBkb2NNYW5hZ2VyLmNvbnRleHRGb3JXaWRnZXQoY29udGV4dE1lbnVXaWRnZXQoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbmFtZURpYWxvZyhkb2NNYW5hZ2VyLCBjb250ZXh0LnBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmRlbCwge1xuICAgICAgICBsYWJlbDogKCkgPT4gdHJhbnMuX18oJ0RlbGV0ZSAlMScsIGZpbGVUeXBlKGNvbnRleHRNZW51V2lkZ2V0KCksIGRvY01hbmFnZXIpKSxcbiAgICAgICAgaXNFbmFibGVkLFxuICAgICAgICBleGVjdXRlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAvLyBJbXBsaWVzIGNvbnRleHRNZW51V2lkZ2V0KCkgIT09IG51bGxcbiAgICAgICAgICAgIGlmIChpc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSBkb2NNYW5hZ2VyLmNvbnRleHRGb3JXaWRnZXQoY29udGV4dE1lbnVXaWRnZXQoKSk7XG4gICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFucy5fXygnRGVsZXRlJyksXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHRyYW5zLl9fKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlICUxJywgY29udGV4dC5wYXRoKSxcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9nLmNhbmNlbEJ1dHRvbih7IGxhYmVsOiB0cmFucy5fXygnQ2FuY2VsJykgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBEaWFsb2cud2FybkJ1dHRvbih7IGxhYmVsOiB0cmFucy5fXygnRGVsZXRlJykgfSlcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuYnV0dG9uLmFjY2VwdCkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBhcHAuY29tbWFuZHMuZXhlY3V0ZSgnZG9jbWFuYWdlcjpkZWxldGUtZmlsZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IGNvbnRleHQucGF0aFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuc2hvd0luRmlsZUJyb3dzZXIsIHtcbiAgICAgICAgbGFiZWw6ICgpID0+IHRyYW5zLl9fKCdTaG93IGluIEZpbGUgQnJvd3NlcicpLFxuICAgICAgICBpc0VuYWJsZWQsXG4gICAgICAgIGV4ZWN1dGU6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IGNvbnRleHRNZW51V2lkZ2V0KCk7XG4gICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gd2lkZ2V0ICYmIGRvY01hbmFnZXIuY29udGV4dEZvcldpZGdldCh3aWRnZXQpO1xuICAgICAgICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gJ2FjdGl2YXRlJyBpcyBuZWVkZWQgaWYgdGhpcyBjb21tYW5kIGlzIHNlbGVjdGVkIGluIHRoZSBcIm9wZW4gdGFic1wiIHNpZGViYXJcbiAgICAgICAgICAgIGF3YWl0IGNvbW1hbmRzLmV4ZWN1dGUoJ2ZpbGVicm93c2VyOmFjdGl2YXRlJywgeyBwYXRoOiBjb250ZXh0LnBhdGggfSk7XG4gICAgICAgICAgICBhd2FpdCBjb21tYW5kcy5leGVjdXRlKCdmaWxlYnJvd3Nlcjpnby10by1wYXRoJywgeyBwYXRoOiBjb250ZXh0LnBhdGggfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogSGFuZGxlIGRpcnR5IHN0YXRlIGZvciBhIGNvbnRleHQuXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUNvbnRleHQoc3RhdHVzLCBjb250ZXh0KSB7XG4gICAgbGV0IGRpc3Bvc2FibGUgPSBudWxsO1xuICAgIGNvbnN0IG9uU3RhdGVDaGFuZ2VkID0gKHNlbmRlciwgYXJncykgPT4ge1xuICAgICAgICBpZiAoYXJncy5uYW1lID09PSAnZGlydHknKSB7XG4gICAgICAgICAgICBpZiAoYXJncy5uZXdWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghZGlzcG9zYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBkaXNwb3NhYmxlID0gc3RhdHVzLnNldERpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlzcG9zYWJsZSkge1xuICAgICAgICAgICAgICAgIGRpc3Bvc2FibGUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGRpc3Bvc2FibGUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB2b2lkIGNvbnRleHQucmVhZHkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnRleHQubW9kZWwuc3RhdGVDaGFuZ2VkLmNvbm5lY3Qob25TdGF0ZUNoYW5nZWQpO1xuICAgICAgICBpZiAoY29udGV4dC5tb2RlbC5kaXJ0eSkge1xuICAgICAgICAgICAgZGlzcG9zYWJsZSA9IHN0YXR1cy5zZXREaXJ0eSgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29udGV4dC5kaXNwb3NlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGRpc3Bvc2FibGUpIHtcbiAgICAgICAgICAgIGRpc3Bvc2FibGUuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIG1vZHVsZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEEgY291bnRlciBmb3IgdW5pcXVlIElEcy5cbiAgICAgKi9cbiAgICBQcml2YXRlLmlkID0gMDtcbiAgICBmdW5jdGlvbiBjcmVhdGVSZXZlcnRDb25maXJtTm9kZShjaGVja3BvaW50LCBmaWxlVHlwZSwgdHJhbnMpIHtcbiAgICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBjb25maXJtTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgY29uZmlybVRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0cmFucy5fXygnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJldmVydCB0aGUgJTEgdG8gdGhlIGxhdGVzdCBjaGVja3BvaW50PyAnLCBmaWxlVHlwZSkpO1xuICAgICAgICBjb25zdCBjYW5ub3RVbmRvVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0cm9uZycpO1xuICAgICAgICBjYW5ub3RVbmRvVGV4dC50ZXh0Q29udGVudCA9IHRyYW5zLl9fKCdUaGlzIGNhbm5vdCBiZSB1bmRvbmUuJyk7XG4gICAgICAgIGNvbmZpcm1NZXNzYWdlLmFwcGVuZENoaWxkKGNvbmZpcm1UZXh0KTtcbiAgICAgICAgY29uZmlybU1lc3NhZ2UuYXBwZW5kQ2hpbGQoY2Fubm90VW5kb1RleHQpO1xuICAgICAgICBjb25zdCBsYXN0Q2hlY2twb2ludE1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGNvbnN0IGxhc3RDaGVja3BvaW50VGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRyYW5zLl9fKCdUaGUgY2hlY2twb2ludCB3YXMgbGFzdCB1cGRhdGVkIGF0OiAnKSk7XG4gICAgICAgIGNvbnN0IGxhc3RDaGVja3BvaW50RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGNoZWNrcG9pbnQubGFzdF9tb2RpZmllZCk7XG4gICAgICAgIGxhc3RDaGVja3BvaW50RGF0ZS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgbGFzdENoZWNrcG9pbnREYXRlLnRleHRDb250ZW50ID1cbiAgICAgICAgICAgIFRpbWUuZm9ybWF0KGRhdGUsICdkZGRkLCBNTU1NIERvIFlZWVksIGg6bW06c3MgYScpICtcbiAgICAgICAgICAgICAgICAnICgnICtcbiAgICAgICAgICAgICAgICBUaW1lLmZvcm1hdEh1bWFuKGRhdGUpICtcbiAgICAgICAgICAgICAgICAnKSc7XG4gICAgICAgIGxhc3RDaGVja3BvaW50TWVzc2FnZS5hcHBlbmRDaGlsZChsYXN0Q2hlY2twb2ludFRleHQpO1xuICAgICAgICBsYXN0Q2hlY2twb2ludE1lc3NhZ2UuYXBwZW5kQ2hpbGQobGFzdENoZWNrcG9pbnREYXRlKTtcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChjb25maXJtTWVzc2FnZSk7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQobGFzdENoZWNrcG9pbnRNZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgfVxuICAgIFByaXZhdGUuY3JlYXRlUmV2ZXJ0Q29uZmlybU5vZGUgPSBjcmVhdGVSZXZlcnRDb25maXJtTm9kZTtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==