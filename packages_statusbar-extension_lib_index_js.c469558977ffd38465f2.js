(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_statusbar-extension_lib_index_js"],{

/***/ "../../packages/statusbar-extension/lib/index.js":
/*!*******************************************************!*\
  !*** ../../packages/statusbar-extension/lib/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STATUSBAR_PLUGIN_ID": () => (/* binding */ STATUSBAR_PLUGIN_ID),
/* harmony export */   "kernelStatus": () => (/* binding */ kernelStatus),
/* harmony export */   "lineColItem": () => (/* binding */ lineColItem),
/* harmony export */   "runningSessionsItem": () => (/* binding */ runningSessionsItem),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/console */ "webpack/sharing/consume/default/@jupyterlab/console/@jupyterlab/console");
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_console__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/fileeditor */ "webpack/sharing/consume/default/@jupyterlab/fileeditor/@jupyterlab/fileeditor");
/* harmony import */ var _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/statusbar */ "webpack/sharing/consume/default/@jupyterlab/statusbar/@jupyterlab/statusbar");
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _lumino_commands__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @lumino/commands */ "webpack/sharing/consume/default/@lumino/commands/@lumino/commands?8e96");
/* harmony import */ var _lumino_commands__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_lumino_commands__WEBPACK_IMPORTED_MODULE_9__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module statusbar-extension
 */










const STATUSBAR_PLUGIN_ID = '@jupyterlab/statusbar-extension:plugin';
/**
 * Initialization data for the statusbar extension.
 */
const statusBar = {
    id: STATUSBAR_PLUGIN_ID,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__.ITranslator],
    provides: _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__.IStatusBar,
    autoStart: true,
    activate: (app, translator, labShell, settingRegistry, palette) => {
        const trans = translator.load('jupyterlab');
        const statusBar = new _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__.StatusBar();
        statusBar.id = 'jp-main-statusbar';
        app.shell.add(statusBar, 'bottom');
        // If available, connect to the shell's layout modified signal.
        if (labShell) {
            labShell.layoutModified.connect(() => {
                statusBar.update();
            });
        }
        const category = trans.__('Main Area');
        const command = 'statusbar:toggle';
        app.commands.addCommand(command, {
            label: trans.__('Show Status Bar'),
            execute: (args) => {
                statusBar.setHidden(statusBar.isVisible);
                if (settingRegistry) {
                    void settingRegistry.set(STATUSBAR_PLUGIN_ID, 'visible', statusBar.isVisible);
                }
            },
            isToggled: () => statusBar.isVisible
        });
        if (palette) {
            palette.addItem({ command, category });
        }
        if (settingRegistry) {
            const loadSettings = settingRegistry.load(STATUSBAR_PLUGIN_ID);
            const updateSettings = (settings) => {
                const visible = settings.get('visible').composite;
                statusBar.setHidden(!visible);
            };
            Promise.all([loadSettings, app.restored])
                .then(([settings]) => {
                updateSettings(settings);
                settings.changed.connect(settings => {
                    updateSettings(settings);
                });
            })
                .catch((reason) => {
                console.error(reason.message);
            });
        }
        return statusBar;
    },
    optional: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell, _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.ISettingRegistry, _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette]
};
/**
 * A plugin that provides a kernel status item to the status bar.
 */
const kernelStatus = {
    id: '@jupyterlab/statusbar-extension:kernel-status',
    autoStart: true,
    requires: [
        _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__.IStatusBar,
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_4__.INotebookTracker,
        _jupyterlab_console__WEBPACK_IMPORTED_MODULE_2__.IConsoleTracker,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell,
        _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__.ITranslator
    ],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ISessionContextDialogs],
    activate: (app, statusBar, notebookTracker, consoleTracker, labShell, translator, sessionDialogs) => {
        // When the status item is clicked, launch the kernel
        // selection dialog for the current session.
        let currentSession = null;
        const changeKernel = async () => {
            if (!currentSession) {
                return;
            }
            await (sessionDialogs || _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.sessionContextDialogs).selectKernel(currentSession, translator);
        };
        // Create the status item.
        const item = new _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__.KernelStatus({ onClick: changeKernel }, translator);
        // When the title of the active widget changes, update the label
        // of the hover text.
        const onTitleChanged = (title) => {
            item.model.activityName = title.label;
        };
        // Keep the session object on the status item up-to-date.
        labShell.currentChanged.connect((_, change) => {
            const { oldValue, newValue } = change;
            // Clean up after the old value if it exists,
            // listen for changes to the title of the activity
            if (oldValue) {
                oldValue.title.changed.disconnect(onTitleChanged);
            }
            if (newValue) {
                newValue.title.changed.connect(onTitleChanged);
            }
            // Grab the session off of the current widget, if it exists.
            if (newValue && consoleTracker.has(newValue)) {
                currentSession = newValue.sessionContext;
            }
            else if (newValue && notebookTracker.has(newValue)) {
                currentSession = newValue.sessionContext;
            }
            else {
                currentSession = null;
            }
            item.model.sessionContext = currentSession;
        });
        statusBar.registerStatusItem('@jupyterlab/statusbar-extension:kernel-status', {
            item,
            align: 'left',
            rank: 1,
            isActive: () => {
                const current = labShell.currentWidget;
                return (!!current &&
                    (notebookTracker.has(current) || consoleTracker.has(current)));
            }
        });
    }
};
/**
 * A plugin providing a line/column status item to the application.
 */
const lineColItem = {
    id: '@jupyterlab/statusbar-extension:line-col-status',
    autoStart: true,
    requires: [
        _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__.IStatusBar,
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_4__.INotebookTracker,
        _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_3__.IEditorTracker,
        _jupyterlab_console__WEBPACK_IMPORTED_MODULE_2__.IConsoleTracker,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell,
        _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__.ITranslator
    ],
    activate: (_, statusBar, notebookTracker, editorTracker, consoleTracker, labShell, translator) => {
        const item = new _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__.LineCol(translator);
        const onActiveCellChanged = (notebook, cell) => {
            item.model.editor = cell && cell.editor;
        };
        const onPromptCreated = (console, prompt) => {
            item.model.editor = prompt && prompt.editor;
        };
        labShell.currentChanged.connect((_, change) => {
            const { oldValue, newValue } = change;
            // Check if we need to disconnect the console listener
            // or the notebook active cell listener
            if (oldValue && consoleTracker.has(oldValue)) {
                oldValue.console.promptCellCreated.disconnect(onPromptCreated);
            }
            else if (oldValue && notebookTracker.has(oldValue)) {
                oldValue.content.activeCellChanged.disconnect(onActiveCellChanged);
            }
            // Wire up the new editor to the model if it exists
            if (newValue && consoleTracker.has(newValue)) {
                newValue.console.promptCellCreated.connect(onPromptCreated);
                const prompt = newValue.console.promptCell;
                item.model.editor = prompt && prompt.editor;
            }
            else if (newValue && notebookTracker.has(newValue)) {
                newValue.content.activeCellChanged.connect(onActiveCellChanged);
                const cell = newValue.content.activeCell;
                item.model.editor = cell && cell.editor;
            }
            else if (newValue && editorTracker.has(newValue)) {
                item.model.editor = newValue.content.editor;
            }
            else {
                item.model.editor = null;
            }
        });
        // Add the status item to the status bar.
        statusBar.registerStatusItem('@jupyterlab/statusbar-extension:line-col-status', {
            item,
            align: 'right',
            rank: 2,
            isActive: () => {
                const current = labShell.currentWidget;
                return (!!current &&
                    (notebookTracker.has(current) ||
                        editorTracker.has(current) ||
                        consoleTracker.has(current)));
            }
        });
    }
};
/*
 * A plugin providing running terminals and sessions information
 * to the status bar.
 */
const runningSessionsItem = {
    id: '@jupyterlab/statusbar-extension:running-sessions-status',
    autoStart: true,
    requires: [_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__.IStatusBar, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__.ITranslator],
    activate: (app, statusBar, translator) => {
        const item = new _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__.RunningSessions({
            onClick: () => app.shell.activateById('jp-running-sessions'),
            serviceManager: app.serviceManager,
            translator
        });
        statusBar.registerStatusItem('@jupyterlab/statusbar-extension:running-sessions-status', {
            item,
            align: 'left',
            rank: 0
        });
    }
};
/**
 * The simple interface mode switch in the status bar.
 */
const modeSwitch = {
    id: '@jupyterlab/statusbar-extension:mode-switch',
    requires: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__.ITranslator, _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__.IStatusBar],
    optional: [_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.ISettingRegistry],
    activate: (app, shell, translator, statusBar, settingRegistry) => {
        const trans = translator.load('jupyterlab');
        const modeSwitch = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_8__.Switch();
        modeSwitch.id = 'jp-single-document-mode';
        modeSwitch.valueChanged.connect((_, args) => {
            shell.mode = args.newValue ? 'single-document' : 'multiple-document';
        });
        shell.modeChanged.connect((_, mode) => {
            modeSwitch.value = mode === 'single-document';
        });
        if (settingRegistry) {
            const loadSettings = settingRegistry.load(STATUSBAR_PLUGIN_ID);
            const updateSettings = (settings) => {
                const startMode = settings.get('startMode').composite;
                if (startMode) {
                    shell.mode =
                        startMode === 'single' ? 'single-document' : 'multiple-document';
                }
            };
            Promise.all([loadSettings, app.restored])
                .then(([settings]) => {
                updateSettings(settings);
            })
                .catch((reason) => {
                console.error(reason.message);
            });
        }
        modeSwitch.value = shell.mode === 'single-document';
        // Show the current file browser shortcut in its title.
        const updateModeSwitchTitle = () => {
            const binding = app.commands.keyBindings.find(b => b.command === 'application:toggle-mode');
            if (binding) {
                const ks = _lumino_commands__WEBPACK_IMPORTED_MODULE_9__.CommandRegistry.formatKeystroke(binding.keys.join(' '));
                modeSwitch.caption = trans.__('Simple Interface (%1)', ks);
            }
            else {
                modeSwitch.caption = trans.__('Simple Interface');
            }
        };
        updateModeSwitchTitle();
        app.commands.keyBindingChanged.connect(() => {
            updateModeSwitchTitle();
        });
        modeSwitch.label = trans.__('Simple');
        statusBar.registerStatusItem('@jupyterlab/statusbar-extension:mode-switch', {
            item: modeSwitch,
            align: 'left',
            rank: -1
        });
    },
    autoStart: true
};
const plugins = [
    statusBar,
    lineColItem,
    kernelStatus,
    runningSessionsItem,
    modeSwitch
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc3RhdHVzYmFyLWV4dGVuc2lvbi9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvRDtBQUNrRDtBQUNoRDtBQUNFO0FBQ0E7QUFDTztBQUN1QztBQUNoRDtBQUNIO0FBQ0E7QUFDNUM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxnRUFBVztBQUMxQixjQUFjLDZEQUFVO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qiw0REFBUztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQSw2QkFBNkIsb0JBQW9CO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsS0FBSztBQUNMLGVBQWUsOERBQVMsRUFBRSx5RUFBZ0IsRUFBRSxpRUFBZTtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2REFBVTtBQUNsQixRQUFRLGtFQUFnQjtBQUN4QixRQUFRLGdFQUFlO0FBQ3ZCLFFBQVEsOERBQVM7QUFDakIsUUFBUSxnRUFBVztBQUNuQjtBQUNBLGVBQWUsd0VBQXNCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsdUVBQXFCO0FBQzFEO0FBQ0E7QUFDQSx5QkFBeUIsK0RBQVksRUFBRSx3QkFBd0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxRQUFRLDZEQUFVO0FBQ2xCLFFBQVEsa0VBQWdCO0FBQ3hCLFFBQVEsa0VBQWM7QUFDdEIsUUFBUSxnRUFBZTtBQUN2QixRQUFRLDhEQUFTO0FBQ2pCLFFBQVEsZ0VBQVc7QUFDbkI7QUFDQTtBQUNBLHlCQUF5QiwwREFBTztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLGVBQWUsNkRBQVUsRUFBRSxnRUFBVztBQUN0QztBQUNBLHlCQUF5QixrRUFBZTtBQUN4QztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDhEQUFTLEVBQUUsZ0VBQVcsRUFBRSw2REFBVTtBQUNqRCxlQUFlLHlFQUFnQjtBQUMvQjtBQUNBO0FBQ0EsK0JBQStCLDZEQUFNO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiw2RUFBK0I7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLE9BQU8sRUFBQztBQUN2QixpQyIsImZpbGUiOiJwYWNrYWdlc19zdGF0dXNiYXItZXh0ZW5zaW9uX2xpYl9pbmRleF9qcy5jNDY5NTU4OTc3ZmZkMzg0NjVmMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIHN0YXR1c2Jhci1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgSUxhYlNoZWxsIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgSUNvbW1hbmRQYWxldHRlLCBJU2Vzc2lvbkNvbnRleHREaWFsb2dzLCBzZXNzaW9uQ29udGV4dERpYWxvZ3MgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBJQ29uc29sZVRyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9jb25zb2xlJztcbmltcG9ydCB7IElFZGl0b3JUcmFja2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvZmlsZWVkaXRvcic7XG5pbXBvcnQgeyBJTm90ZWJvb2tUcmFja2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvbm90ZWJvb2snO1xuaW1wb3J0IHsgSVNldHRpbmdSZWdpc3RyeSB9IGZyb20gJ0BqdXB5dGVybGFiL3NldHRpbmdyZWdpc3RyeSc7XG5pbXBvcnQgeyBJU3RhdHVzQmFyLCBLZXJuZWxTdGF0dXMsIExpbmVDb2wsIFJ1bm5pbmdTZXNzaW9ucywgU3RhdHVzQmFyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvc3RhdHVzYmFyJztcbmltcG9ydCB7IElUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgU3dpdGNoIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyBDb21tYW5kUmVnaXN0cnkgfSBmcm9tICdAbHVtaW5vL2NvbW1hbmRzJztcbmV4cG9ydCBjb25zdCBTVEFUVVNCQVJfUExVR0lOX0lEID0gJ0BqdXB5dGVybGFiL3N0YXR1c2Jhci1leHRlbnNpb246cGx1Z2luJztcbi8qKlxuICogSW5pdGlhbGl6YXRpb24gZGF0YSBmb3IgdGhlIHN0YXR1c2JhciBleHRlbnNpb24uXG4gKi9cbmNvbnN0IHN0YXR1c0JhciA9IHtcbiAgICBpZDogU1RBVFVTQkFSX1BMVUdJTl9JRCxcbiAgICByZXF1aXJlczogW0lUcmFuc2xhdG9yXSxcbiAgICBwcm92aWRlczogSVN0YXR1c0JhcixcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgYWN0aXZhdGU6IChhcHAsIHRyYW5zbGF0b3IsIGxhYlNoZWxsLCBzZXR0aW5nUmVnaXN0cnksIHBhbGV0dGUpID0+IHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3Qgc3RhdHVzQmFyID0gbmV3IFN0YXR1c0JhcigpO1xuICAgICAgICBzdGF0dXNCYXIuaWQgPSAnanAtbWFpbi1zdGF0dXNiYXInO1xuICAgICAgICBhcHAuc2hlbGwuYWRkKHN0YXR1c0JhciwgJ2JvdHRvbScpO1xuICAgICAgICAvLyBJZiBhdmFpbGFibGUsIGNvbm5lY3QgdG8gdGhlIHNoZWxsJ3MgbGF5b3V0IG1vZGlmaWVkIHNpZ25hbC5cbiAgICAgICAgaWYgKGxhYlNoZWxsKSB7XG4gICAgICAgICAgICBsYWJTaGVsbC5sYXlvdXRNb2RpZmllZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBzdGF0dXNCYXIudXBkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjYXRlZ29yeSA9IHRyYW5zLl9fKCdNYWluIEFyZWEnKTtcbiAgICAgICAgY29uc3QgY29tbWFuZCA9ICdzdGF0dXNiYXI6dG9nZ2xlJztcbiAgICAgICAgYXBwLmNvbW1hbmRzLmFkZENvbW1hbmQoY29tbWFuZCwge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdTaG93IFN0YXR1cyBCYXInKSxcbiAgICAgICAgICAgIGV4ZWN1dGU6IChhcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgc3RhdHVzQmFyLnNldEhpZGRlbihzdGF0dXNCYXIuaXNWaXNpYmxlKTtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ1JlZ2lzdHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgc2V0dGluZ1JlZ2lzdHJ5LnNldChTVEFUVVNCQVJfUExVR0lOX0lELCAndmlzaWJsZScsIHN0YXR1c0Jhci5pc1Zpc2libGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1RvZ2dsZWQ6ICgpID0+IHN0YXR1c0Jhci5pc1Zpc2libGVcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChwYWxldHRlKSB7XG4gICAgICAgICAgICBwYWxldHRlLmFkZEl0ZW0oeyBjb21tYW5kLCBjYXRlZ29yeSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2V0dGluZ1JlZ2lzdHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBsb2FkU2V0dGluZ3MgPSBzZXR0aW5nUmVnaXN0cnkubG9hZChTVEFUVVNCQVJfUExVR0lOX0lEKTtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZVNldHRpbmdzID0gKHNldHRpbmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlzaWJsZSA9IHNldHRpbmdzLmdldCgndmlzaWJsZScpLmNvbXBvc2l0ZTtcbiAgICAgICAgICAgICAgICBzdGF0dXNCYXIuc2V0SGlkZGVuKCF2aXNpYmxlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBQcm9taXNlLmFsbChbbG9hZFNldHRpbmdzLCBhcHAucmVzdG9yZWRdKVxuICAgICAgICAgICAgICAgIC50aGVuKChbc2V0dGluZ3NdKSA9PiB7XG4gICAgICAgICAgICAgICAgdXBkYXRlU2V0dGluZ3Moc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLmNoYW5nZWQuY29ubmVjdChzZXR0aW5ncyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVNldHRpbmdzKHNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHJlYXNvbi5tZXNzYWdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0dXNCYXI7XG4gICAgfSxcbiAgICBvcHRpb25hbDogW0lMYWJTaGVsbCwgSVNldHRpbmdSZWdpc3RyeSwgSUNvbW1hbmRQYWxldHRlXVxufTtcbi8qKlxuICogQSBwbHVnaW4gdGhhdCBwcm92aWRlcyBhIGtlcm5lbCBzdGF0dXMgaXRlbSB0byB0aGUgc3RhdHVzIGJhci5cbiAqL1xuZXhwb3J0IGNvbnN0IGtlcm5lbFN0YXR1cyA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL3N0YXR1c2Jhci1leHRlbnNpb246a2VybmVsLXN0YXR1cycsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHJlcXVpcmVzOiBbXG4gICAgICAgIElTdGF0dXNCYXIsXG4gICAgICAgIElOb3RlYm9va1RyYWNrZXIsXG4gICAgICAgIElDb25zb2xlVHJhY2tlcixcbiAgICAgICAgSUxhYlNoZWxsLFxuICAgICAgICBJVHJhbnNsYXRvclxuICAgIF0sXG4gICAgb3B0aW9uYWw6IFtJU2Vzc2lvbkNvbnRleHREaWFsb2dzXSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgc3RhdHVzQmFyLCBub3RlYm9va1RyYWNrZXIsIGNvbnNvbGVUcmFja2VyLCBsYWJTaGVsbCwgdHJhbnNsYXRvciwgc2Vzc2lvbkRpYWxvZ3MpID0+IHtcbiAgICAgICAgLy8gV2hlbiB0aGUgc3RhdHVzIGl0ZW0gaXMgY2xpY2tlZCwgbGF1bmNoIHRoZSBrZXJuZWxcbiAgICAgICAgLy8gc2VsZWN0aW9uIGRpYWxvZyBmb3IgdGhlIGN1cnJlbnQgc2Vzc2lvbi5cbiAgICAgICAgbGV0IGN1cnJlbnRTZXNzaW9uID0gbnVsbDtcbiAgICAgICAgY29uc3QgY2hhbmdlS2VybmVsID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50U2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IChzZXNzaW9uRGlhbG9ncyB8fCBzZXNzaW9uQ29udGV4dERpYWxvZ3MpLnNlbGVjdEtlcm5lbChjdXJyZW50U2Vzc2lvbiwgdHJhbnNsYXRvcik7XG4gICAgICAgIH07XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgc3RhdHVzIGl0ZW0uXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXcgS2VybmVsU3RhdHVzKHsgb25DbGljazogY2hhbmdlS2VybmVsIH0sIHRyYW5zbGF0b3IpO1xuICAgICAgICAvLyBXaGVuIHRoZSB0aXRsZSBvZiB0aGUgYWN0aXZlIHdpZGdldCBjaGFuZ2VzLCB1cGRhdGUgdGhlIGxhYmVsXG4gICAgICAgIC8vIG9mIHRoZSBob3ZlciB0ZXh0LlxuICAgICAgICBjb25zdCBvblRpdGxlQ2hhbmdlZCA9ICh0aXRsZSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5tb2RlbC5hY3Rpdml0eU5hbWUgPSB0aXRsZS5sYWJlbDtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gS2VlcCB0aGUgc2Vzc2lvbiBvYmplY3Qgb24gdGhlIHN0YXR1cyBpdGVtIHVwLXRvLWRhdGUuXG4gICAgICAgIGxhYlNoZWxsLmN1cnJlbnRDaGFuZ2VkLmNvbm5lY3QoKF8sIGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBvbGRWYWx1ZSwgbmV3VmFsdWUgfSA9IGNoYW5nZTtcbiAgICAgICAgICAgIC8vIENsZWFuIHVwIGFmdGVyIHRoZSBvbGQgdmFsdWUgaWYgaXQgZXhpc3RzLFxuICAgICAgICAgICAgLy8gbGlzdGVuIGZvciBjaGFuZ2VzIHRvIHRoZSB0aXRsZSBvZiB0aGUgYWN0aXZpdHlcbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIG9sZFZhbHVlLnRpdGxlLmNoYW5nZWQuZGlzY29ubmVjdChvblRpdGxlQ2hhbmdlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZS50aXRsZS5jaGFuZ2VkLmNvbm5lY3Qob25UaXRsZUNoYW5nZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gR3JhYiB0aGUgc2Vzc2lvbiBvZmYgb2YgdGhlIGN1cnJlbnQgd2lkZ2V0LCBpZiBpdCBleGlzdHMuXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgJiYgY29uc29sZVRyYWNrZXIuaGFzKG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTZXNzaW9uID0gbmV3VmFsdWUuc2Vzc2lvbkNvbnRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdWYWx1ZSAmJiBub3RlYm9va1RyYWNrZXIuaGFzKG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTZXNzaW9uID0gbmV3VmFsdWUuc2Vzc2lvbkNvbnRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U2Vzc2lvbiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtLm1vZGVsLnNlc3Npb25Db250ZXh0ID0gY3VycmVudFNlc3Npb247XG4gICAgICAgIH0pO1xuICAgICAgICBzdGF0dXNCYXIucmVnaXN0ZXJTdGF0dXNJdGVtKCdAanVweXRlcmxhYi9zdGF0dXNiYXItZXh0ZW5zaW9uOmtlcm5lbC1zdGF0dXMnLCB7XG4gICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgYWxpZ246ICdsZWZ0JyxcbiAgICAgICAgICAgIHJhbms6IDEsXG4gICAgICAgICAgICBpc0FjdGl2ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBsYWJTaGVsbC5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgICAgIHJldHVybiAoISFjdXJyZW50ICYmXG4gICAgICAgICAgICAgICAgICAgIChub3RlYm9va1RyYWNrZXIuaGFzKGN1cnJlbnQpIHx8IGNvbnNvbGVUcmFja2VyLmhhcyhjdXJyZW50KSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuLyoqXG4gKiBBIHBsdWdpbiBwcm92aWRpbmcgYSBsaW5lL2NvbHVtbiBzdGF0dXMgaXRlbSB0byB0aGUgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBsaW5lQ29sSXRlbSA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL3N0YXR1c2Jhci1leHRlbnNpb246bGluZS1jb2wtc3RhdHVzJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtcbiAgICAgICAgSVN0YXR1c0JhcixcbiAgICAgICAgSU5vdGVib29rVHJhY2tlcixcbiAgICAgICAgSUVkaXRvclRyYWNrZXIsXG4gICAgICAgIElDb25zb2xlVHJhY2tlcixcbiAgICAgICAgSUxhYlNoZWxsLFxuICAgICAgICBJVHJhbnNsYXRvclxuICAgIF0sXG4gICAgYWN0aXZhdGU6IChfLCBzdGF0dXNCYXIsIG5vdGVib29rVHJhY2tlciwgZWRpdG9yVHJhY2tlciwgY29uc29sZVRyYWNrZXIsIGxhYlNoZWxsLCB0cmFuc2xhdG9yKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXcgTGluZUNvbCh0cmFuc2xhdG9yKTtcbiAgICAgICAgY29uc3Qgb25BY3RpdmVDZWxsQ2hhbmdlZCA9IChub3RlYm9vaywgY2VsbCkgPT4ge1xuICAgICAgICAgICAgaXRlbS5tb2RlbC5lZGl0b3IgPSBjZWxsICYmIGNlbGwuZWRpdG9yO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBvblByb21wdENyZWF0ZWQgPSAoY29uc29sZSwgcHJvbXB0KSA9PiB7XG4gICAgICAgICAgICBpdGVtLm1vZGVsLmVkaXRvciA9IHByb21wdCAmJiBwcm9tcHQuZWRpdG9yO1xuICAgICAgICB9O1xuICAgICAgICBsYWJTaGVsbC5jdXJyZW50Q2hhbmdlZC5jb25uZWN0KChfLCBjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgb2xkVmFsdWUsIG5ld1ZhbHVlIH0gPSBjaGFuZ2U7XG4gICAgICAgICAgICAvLyBDaGVjayBpZiB3ZSBuZWVkIHRvIGRpc2Nvbm5lY3QgdGhlIGNvbnNvbGUgbGlzdGVuZXJcbiAgICAgICAgICAgIC8vIG9yIHRoZSBub3RlYm9vayBhY3RpdmUgY2VsbCBsaXN0ZW5lclxuICAgICAgICAgICAgaWYgKG9sZFZhbHVlICYmIGNvbnNvbGVUcmFja2VyLmhhcyhvbGRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZS5jb25zb2xlLnByb21wdENlbGxDcmVhdGVkLmRpc2Nvbm5lY3Qob25Qcm9tcHRDcmVhdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9sZFZhbHVlICYmIG5vdGVib29rVHJhY2tlci5oYXMob2xkVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgb2xkVmFsdWUuY29udGVudC5hY3RpdmVDZWxsQ2hhbmdlZC5kaXNjb25uZWN0KG9uQWN0aXZlQ2VsbENoYW5nZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gV2lyZSB1cCB0aGUgbmV3IGVkaXRvciB0byB0aGUgbW9kZWwgaWYgaXQgZXhpc3RzXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgJiYgY29uc29sZVRyYWNrZXIuaGFzKG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlLmNvbnNvbGUucHJvbXB0Q2VsbENyZWF0ZWQuY29ubmVjdChvblByb21wdENyZWF0ZWQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb21wdCA9IG5ld1ZhbHVlLmNvbnNvbGUucHJvbXB0Q2VsbDtcbiAgICAgICAgICAgICAgICBpdGVtLm1vZGVsLmVkaXRvciA9IHByb21wdCAmJiBwcm9tcHQuZWRpdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3VmFsdWUgJiYgbm90ZWJvb2tUcmFja2VyLmhhcyhuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZS5jb250ZW50LmFjdGl2ZUNlbGxDaGFuZ2VkLmNvbm5lY3Qob25BY3RpdmVDZWxsQ2hhbmdlZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IG5ld1ZhbHVlLmNvbnRlbnQuYWN0aXZlQ2VsbDtcbiAgICAgICAgICAgICAgICBpdGVtLm1vZGVsLmVkaXRvciA9IGNlbGwgJiYgY2VsbC5lZGl0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdWYWx1ZSAmJiBlZGl0b3JUcmFja2VyLmhhcyhuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpdGVtLm1vZGVsLmVkaXRvciA9IG5ld1ZhbHVlLmNvbnRlbnQuZWRpdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbS5tb2RlbC5lZGl0b3IgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQWRkIHRoZSBzdGF0dXMgaXRlbSB0byB0aGUgc3RhdHVzIGJhci5cbiAgICAgICAgc3RhdHVzQmFyLnJlZ2lzdGVyU3RhdHVzSXRlbSgnQGp1cHl0ZXJsYWIvc3RhdHVzYmFyLWV4dGVuc2lvbjpsaW5lLWNvbC1zdGF0dXMnLCB7XG4gICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgYWxpZ246ICdyaWdodCcsXG4gICAgICAgICAgICByYW5rOiAyLFxuICAgICAgICAgICAgaXNBY3RpdmU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gbGFiU2hlbGwuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCEhY3VycmVudCAmJlxuICAgICAgICAgICAgICAgICAgICAobm90ZWJvb2tUcmFja2VyLmhhcyhjdXJyZW50KSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yVHJhY2tlci5oYXMoY3VycmVudCkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGVUcmFja2VyLmhhcyhjdXJyZW50KSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuLypcbiAqIEEgcGx1Z2luIHByb3ZpZGluZyBydW5uaW5nIHRlcm1pbmFscyBhbmQgc2Vzc2lvbnMgaW5mb3JtYXRpb25cbiAqIHRvIHRoZSBzdGF0dXMgYmFyLlxuICovXG5leHBvcnQgY29uc3QgcnVubmluZ1Nlc3Npb25zSXRlbSA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL3N0YXR1c2Jhci1leHRlbnNpb246cnVubmluZy1zZXNzaW9ucy1zdGF0dXMnLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICByZXF1aXJlczogW0lTdGF0dXNCYXIsIElUcmFuc2xhdG9yXSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgc3RhdHVzQmFyLCB0cmFuc2xhdG9yKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXcgUnVubmluZ1Nlc3Npb25zKHtcbiAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IGFwcC5zaGVsbC5hY3RpdmF0ZUJ5SWQoJ2pwLXJ1bm5pbmctc2Vzc2lvbnMnKSxcbiAgICAgICAgICAgIHNlcnZpY2VNYW5hZ2VyOiBhcHAuc2VydmljZU1hbmFnZXIsXG4gICAgICAgICAgICB0cmFuc2xhdG9yXG4gICAgICAgIH0pO1xuICAgICAgICBzdGF0dXNCYXIucmVnaXN0ZXJTdGF0dXNJdGVtKCdAanVweXRlcmxhYi9zdGF0dXNiYXItZXh0ZW5zaW9uOnJ1bm5pbmctc2Vzc2lvbnMtc3RhdHVzJywge1xuICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgIGFsaWduOiAnbGVmdCcsXG4gICAgICAgICAgICByYW5rOiAwXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4vKipcbiAqIFRoZSBzaW1wbGUgaW50ZXJmYWNlIG1vZGUgc3dpdGNoIGluIHRoZSBzdGF0dXMgYmFyLlxuICovXG5jb25zdCBtb2RlU3dpdGNoID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvc3RhdHVzYmFyLWV4dGVuc2lvbjptb2RlLXN3aXRjaCcsXG4gICAgcmVxdWlyZXM6IFtJTGFiU2hlbGwsIElUcmFuc2xhdG9yLCBJU3RhdHVzQmFyXSxcbiAgICBvcHRpb25hbDogW0lTZXR0aW5nUmVnaXN0cnldLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBzaGVsbCwgdHJhbnNsYXRvciwgc3RhdHVzQmFyLCBzZXR0aW5nUmVnaXN0cnkpID0+IHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgbW9kZVN3aXRjaCA9IG5ldyBTd2l0Y2goKTtcbiAgICAgICAgbW9kZVN3aXRjaC5pZCA9ICdqcC1zaW5nbGUtZG9jdW1lbnQtbW9kZSc7XG4gICAgICAgIG1vZGVTd2l0Y2gudmFsdWVDaGFuZ2VkLmNvbm5lY3QoKF8sIGFyZ3MpID0+IHtcbiAgICAgICAgICAgIHNoZWxsLm1vZGUgPSBhcmdzLm5ld1ZhbHVlID8gJ3NpbmdsZS1kb2N1bWVudCcgOiAnbXVsdGlwbGUtZG9jdW1lbnQnO1xuICAgICAgICB9KTtcbiAgICAgICAgc2hlbGwubW9kZUNoYW5nZWQuY29ubmVjdCgoXywgbW9kZSkgPT4ge1xuICAgICAgICAgICAgbW9kZVN3aXRjaC52YWx1ZSA9IG1vZGUgPT09ICdzaW5nbGUtZG9jdW1lbnQnO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHNldHRpbmdSZWdpc3RyeSkge1xuICAgICAgICAgICAgY29uc3QgbG9hZFNldHRpbmdzID0gc2V0dGluZ1JlZ2lzdHJ5LmxvYWQoU1RBVFVTQkFSX1BMVUdJTl9JRCk7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVTZXR0aW5ncyA9IChzZXR0aW5ncykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0TW9kZSA9IHNldHRpbmdzLmdldCgnc3RhcnRNb2RlJykuY29tcG9zaXRlO1xuICAgICAgICAgICAgICAgIGlmIChzdGFydE1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hlbGwubW9kZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydE1vZGUgPT09ICdzaW5nbGUnID8gJ3NpbmdsZS1kb2N1bWVudCcgOiAnbXVsdGlwbGUtZG9jdW1lbnQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBQcm9taXNlLmFsbChbbG9hZFNldHRpbmdzLCBhcHAucmVzdG9yZWRdKVxuICAgICAgICAgICAgICAgIC50aGVuKChbc2V0dGluZ3NdKSA9PiB7XG4gICAgICAgICAgICAgICAgdXBkYXRlU2V0dGluZ3Moc2V0dGluZ3MpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVhc29uLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbW9kZVN3aXRjaC52YWx1ZSA9IHNoZWxsLm1vZGUgPT09ICdzaW5nbGUtZG9jdW1lbnQnO1xuICAgICAgICAvLyBTaG93IHRoZSBjdXJyZW50IGZpbGUgYnJvd3NlciBzaG9ydGN1dCBpbiBpdHMgdGl0bGUuXG4gICAgICAgIGNvbnN0IHVwZGF0ZU1vZGVTd2l0Y2hUaXRsZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJpbmRpbmcgPSBhcHAuY29tbWFuZHMua2V5QmluZGluZ3MuZmluZChiID0+IGIuY29tbWFuZCA9PT0gJ2FwcGxpY2F0aW9uOnRvZ2dsZS1tb2RlJyk7XG4gICAgICAgICAgICBpZiAoYmluZGluZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtzID0gQ29tbWFuZFJlZ2lzdHJ5LmZvcm1hdEtleXN0cm9rZShiaW5kaW5nLmtleXMuam9pbignICcpKTtcbiAgICAgICAgICAgICAgICBtb2RlU3dpdGNoLmNhcHRpb24gPSB0cmFucy5fXygnU2ltcGxlIEludGVyZmFjZSAoJTEpJywga3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbW9kZVN3aXRjaC5jYXB0aW9uID0gdHJhbnMuX18oJ1NpbXBsZSBJbnRlcmZhY2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdXBkYXRlTW9kZVN3aXRjaFRpdGxlKCk7XG4gICAgICAgIGFwcC5jb21tYW5kcy5rZXlCaW5kaW5nQ2hhbmdlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZU1vZGVTd2l0Y2hUaXRsZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgbW9kZVN3aXRjaC5sYWJlbCA9IHRyYW5zLl9fKCdTaW1wbGUnKTtcbiAgICAgICAgc3RhdHVzQmFyLnJlZ2lzdGVyU3RhdHVzSXRlbSgnQGp1cHl0ZXJsYWIvc3RhdHVzYmFyLWV4dGVuc2lvbjptb2RlLXN3aXRjaCcsIHtcbiAgICAgICAgICAgIGl0ZW06IG1vZGVTd2l0Y2gsXG4gICAgICAgICAgICBhbGlnbjogJ2xlZnQnLFxuICAgICAgICAgICAgcmFuazogLTFcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBhdXRvU3RhcnQ6IHRydWVcbn07XG5jb25zdCBwbHVnaW5zID0gW1xuICAgIHN0YXR1c0JhcixcbiAgICBsaW5lQ29sSXRlbSxcbiAgICBrZXJuZWxTdGF0dXMsXG4gICAgcnVubmluZ1Nlc3Npb25zSXRlbSxcbiAgICBtb2RlU3dpdGNoXG5dO1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2lucztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=