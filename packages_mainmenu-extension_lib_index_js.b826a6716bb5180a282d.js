(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_mainmenu-extension_lib_index_js"],{

/***/ "../../packages/mainmenu-extension/lib/index.js":
/*!******************************************************!*\
  !*** ../../packages/mainmenu-extension/lib/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommandIDs": () => (/* binding */ CommandIDs),
/* harmony export */   "createEditMenu": () => (/* binding */ createEditMenu),
/* harmony export */   "createFileMenu": () => (/* binding */ createFileMenu),
/* harmony export */   "createKernelMenu": () => (/* binding */ createKernelMenu),
/* harmony export */   "createViewMenu": () => (/* binding */ createViewMenu),
/* harmony export */   "createRunMenu": () => (/* binding */ createRunMenu),
/* harmony export */   "createTabsMenu": () => (/* binding */ createTabsMenu),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/mainmenu */ "webpack/sharing/consume/default/@jupyterlab/mainmenu/@jupyterlab/mainmenu");
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_10__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module mainmenu-extension
 */











const PLUGIN_ID = '@jupyterlab/mainmenu-extension:plugin';
/**
 * A namespace for command IDs of semantic extension points.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.openEdit = 'editmenu:open';
    CommandIDs.undo = 'editmenu:undo';
    CommandIDs.redo = 'editmenu:redo';
    CommandIDs.clearCurrent = 'editmenu:clear-current';
    CommandIDs.clearAll = 'editmenu:clear-all';
    CommandIDs.find = 'editmenu:find';
    CommandIDs.goToLine = 'editmenu:go-to-line';
    CommandIDs.openFile = 'filemenu:open';
    CommandIDs.closeAndCleanup = 'filemenu:close-and-cleanup';
    CommandIDs.createConsole = 'filemenu:create-console';
    CommandIDs.shutdown = 'filemenu:shutdown';
    CommandIDs.logout = 'filemenu:logout';
    CommandIDs.openKernel = 'kernelmenu:open';
    CommandIDs.interruptKernel = 'kernelmenu:interrupt';
    CommandIDs.reconnectToKernel = 'kernelmenu:reconnect-to-kernel';
    CommandIDs.restartKernel = 'kernelmenu:restart';
    CommandIDs.restartKernelAndClear = 'kernelmenu:restart-and-clear';
    CommandIDs.changeKernel = 'kernelmenu:change';
    CommandIDs.shutdownKernel = 'kernelmenu:shutdown';
    CommandIDs.shutdownAllKernels = 'kernelmenu:shutdownAll';
    CommandIDs.openView = 'viewmenu:open';
    CommandIDs.wordWrap = 'viewmenu:word-wrap';
    CommandIDs.lineNumbering = 'viewmenu:line-numbering';
    CommandIDs.matchBrackets = 'viewmenu:match-brackets';
    CommandIDs.openRun = 'runmenu:open';
    CommandIDs.run = 'runmenu:run';
    CommandIDs.runAll = 'runmenu:run-all';
    CommandIDs.restartAndRunAll = 'runmenu:restart-and-run-all';
    CommandIDs.runAbove = 'runmenu:run-above';
    CommandIDs.runBelow = 'runmenu:run-below';
    CommandIDs.openTabs = 'tabsmenu:open';
    CommandIDs.activateById = 'tabsmenu:activate-by-id';
    CommandIDs.activatePreviouslyUsedTab = 'tabsmenu:activate-previously-used-tab';
    CommandIDs.openSettings = 'settingsmenu:open';
    CommandIDs.openHelp = 'helpmenu:open';
    CommandIDs.openFirst = 'mainmenu:open-first';
})(CommandIDs || (CommandIDs = {}));
/**
 * A service providing an interface to the main menu.
 */
const plugin = {
    id: PLUGIN_ID,
    requires: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.IRouter, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell, _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.ISettingRegistry],
    provides: _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__.IMainMenu,
    activate: async (app, router, translator, palette, labShell, registry) => {
        const { commands } = app;
        const trans = translator.load('jupyterlab');
        const menu = new _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__.MainMenu(commands);
        menu.id = 'jp-MainMenu';
        menu.addClass('jp-scrollbar-tiny');
        // Built menu from settings
        if (registry) {
            await Private.loadSettingsMenu(registry, (aMenu) => {
                menu.addMenu(aMenu, { rank: aMenu.rank });
            }, options => _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__.MainMenu.generateMenu(commands, options, trans), translator);
        }
        // Only add quit button if the back-end supports it by checking page config.
        const quitButton = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getOption('quitButton').toLowerCase();
        menu.fileMenu.quitEntry = quitButton === 'true';
        // Create the application menus.
        createEditMenu(app, menu.editMenu, trans);
        createFileMenu(app, menu.fileMenu, router, trans);
        createKernelMenu(app, menu.kernelMenu, trans);
        createRunMenu(app, menu.runMenu, trans);
        createViewMenu(app, menu.viewMenu, trans);
        // The tabs menu relies on lab shell functionality.
        if (labShell) {
            createTabsMenu(app, menu.tabsMenu, labShell, trans);
        }
        // Create commands to open the main application menus.
        const activateMenu = (item) => {
            menu.activeMenu = item;
            menu.openActiveMenu();
        };
        commands.addCommand(CommandIDs.openEdit, {
            label: trans.__('Open Edit Menu'),
            execute: () => activateMenu(menu.editMenu)
        });
        commands.addCommand(CommandIDs.openFile, {
            label: trans.__('Open File Menu'),
            execute: () => activateMenu(menu.fileMenu)
        });
        commands.addCommand(CommandIDs.openKernel, {
            label: trans.__('Open Kernel Menu'),
            execute: () => activateMenu(menu.kernelMenu)
        });
        commands.addCommand(CommandIDs.openRun, {
            label: trans.__('Open Run Menu'),
            execute: () => activateMenu(menu.runMenu)
        });
        commands.addCommand(CommandIDs.openView, {
            label: trans.__('Open View Menu'),
            execute: () => activateMenu(menu.viewMenu)
        });
        commands.addCommand(CommandIDs.openSettings, {
            label: trans.__('Open Settings Menu'),
            execute: () => activateMenu(menu.settingsMenu)
        });
        commands.addCommand(CommandIDs.openTabs, {
            label: trans.__('Open Tabs Menu'),
            execute: () => activateMenu(menu.tabsMenu)
        });
        commands.addCommand(CommandIDs.openHelp, {
            label: trans.__('Open Help Menu'),
            execute: () => activateMenu(menu.helpMenu)
        });
        commands.addCommand(CommandIDs.openFirst, {
            label: trans.__('Open First Menu'),
            execute: () => {
                menu.activeIndex = 0;
                menu.openActiveMenu();
            }
        });
        if (palette) {
            // Add some of the commands defined here to the command palette.
            palette.addItem({
                command: CommandIDs.shutdown,
                category: trans.__('Main Area')
            });
            palette.addItem({
                command: CommandIDs.logout,
                category: trans.__('Main Area')
            });
            palette.addItem({
                command: CommandIDs.shutdownAllKernels,
                category: trans.__('Kernel Operations')
            });
            palette.addItem({
                command: CommandIDs.activatePreviouslyUsedTab,
                category: trans.__('Main Area')
            });
        }
        app.shell.add(menu, 'menu', { rank: 100 });
        return menu;
    }
};
/**
 * Create the basic `Edit` menu.
 */
function createEditMenu(app, menu, trans) {
    const commands = app.commands;
    // Add the undo/redo commands the the Edit menu.
    commands.addCommand(CommandIDs.undo, {
        label: trans.__('Undo'),
        isEnabled: Private.delegateEnabled(app, menu.undoers, 'undo'),
        execute: Private.delegateExecute(app, menu.undoers, 'undo')
    });
    commands.addCommand(CommandIDs.redo, {
        label: trans.__('Redo'),
        isEnabled: Private.delegateEnabled(app, menu.undoers, 'redo'),
        execute: Private.delegateExecute(app, menu.undoers, 'redo')
    });
    // Add the clear commands to the Edit menu.
    commands.addCommand(CommandIDs.clearCurrent, {
        label: () => {
            const enabled = Private.delegateEnabled(app, menu.clearers, 'clearCurrent')();
            let localizedLabel = trans.__('Clear');
            if (enabled) {
                localizedLabel = Private.delegateLabel(app, menu.clearers, 'clearCurrentLabel');
            }
            return localizedLabel;
        },
        isEnabled: Private.delegateEnabled(app, menu.clearers, 'clearCurrent'),
        execute: Private.delegateExecute(app, menu.clearers, 'clearCurrent')
    });
    commands.addCommand(CommandIDs.clearAll, {
        label: () => {
            const enabled = Private.delegateEnabled(app, menu.clearers, 'clearAll')();
            let localizedLabel = trans.__('Clear All');
            if (enabled) {
                localizedLabel = Private.delegateLabel(app, menu.clearers, 'clearAllLabel');
            }
            return localizedLabel;
        },
        isEnabled: Private.delegateEnabled(app, menu.clearers, 'clearAll'),
        execute: Private.delegateExecute(app, menu.clearers, 'clearAll')
    });
    commands.addCommand(CommandIDs.goToLine, {
        label: trans.__('Go to Line…'),
        isEnabled: Private.delegateEnabled(app, menu.goToLiners, 'goToLine'),
        execute: Private.delegateExecute(app, menu.goToLiners, 'goToLine')
    });
}
/**
 * Create the basic `File` menu.
 */
function createFileMenu(app, menu, router, trans) {
    const commands = app.commands;
    // Add a delegator command for closing and cleaning up an activity.
    // This one is a bit different, in that we consider it enabled
    // even if it cannot find a delegate for the activity.
    // In that case, we instead call the application `close` command.
    commands.addCommand(CommandIDs.closeAndCleanup, {
        label: () => {
            const localizedLabel = Private.delegateLabel(app, menu.closeAndCleaners, 'closeAndCleanupLabel');
            return localizedLabel ? localizedLabel : trans.__('Close and Shutdown');
        },
        isEnabled: () => !!app.shell.currentWidget && !!app.shell.currentWidget.title.closable,
        execute: () => {
            // Check if we have a registered delegate. If so, call that.
            if (Private.delegateEnabled(app, menu.closeAndCleaners, 'closeAndCleanup')()) {
                return Private.delegateExecute(app, menu.closeAndCleaners, 'closeAndCleanup')();
            }
            // If we have no delegate, call the top-level application close.
            return app.commands.execute('application:close');
        }
    });
    // Add a delegator command for creating a console for an activity.
    commands.addCommand(CommandIDs.createConsole, {
        label: () => {
            const localizedLabel = Private.delegateLabel(app, menu.consoleCreators, 'createConsoleLabel');
            return localizedLabel
                ? localizedLabel
                : trans.__('New Console for Activity');
        },
        isEnabled: Private.delegateEnabled(app, menu.consoleCreators, 'createConsole'),
        execute: Private.delegateExecute(app, menu.consoleCreators, 'createConsole')
    });
    commands.addCommand(CommandIDs.shutdown, {
        label: trans.__('Shut Down'),
        caption: trans.__('Shut down JupyterLab'),
        isVisible: () => menu.quitEntry,
        isEnabled: () => menu.quitEntry,
        execute: () => {
            return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                title: trans.__('Shutdown confirmation'),
                body: trans.__('Please confirm you want to shut down JupyterLab.'),
                buttons: [
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton(),
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.warnButton({ label: trans.__('Shut Down') })
                ]
            }).then(async (result) => {
                if (result.button.accept) {
                    const setting = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_4__.ServerConnection.makeSettings();
                    const apiURL = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.join(setting.baseUrl, 'api/shutdown');
                    // Shutdown all kernel and terminal sessions before shutting down the server
                    // If this fails, we continue execution so we can post an api/shutdown request
                    try {
                        await Promise.all([
                            app.serviceManager.sessions.shutdownAll(),
                            app.serviceManager.terminals.shutdownAll()
                        ]);
                    }
                    catch (e) {
                        // Do nothing
                        console.log(`Failed to shutdown sessions and terminals: ${e}`);
                    }
                    return _jupyterlab_services__WEBPACK_IMPORTED_MODULE_4__.ServerConnection.makeRequest(apiURL, { method: 'POST' }, setting)
                        .then(result => {
                        if (result.ok) {
                            // Close this window if the shutdown request has been successful
                            const body = document.createElement('div');
                            const p1 = document.createElement('p');
                            p1.textContent = trans.__('You have shut down the Jupyter server. You can now close this tab.');
                            const p2 = document.createElement('p');
                            p2.textContent = trans.__('To use JupyterLab again, you will need to relaunch it.');
                            body.appendChild(p1);
                            body.appendChild(p2);
                            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                                title: trans.__('Server stopped'),
                                body: new _lumino_widgets__WEBPACK_IMPORTED_MODULE_10__.Widget({ node: body }),
                                buttons: []
                            });
                            window.close();
                        }
                        else {
                            throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_4__.ServerConnection.ResponseError(result);
                        }
                    })
                        .catch(data => {
                        throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_4__.ServerConnection.NetworkError(data);
                    });
                }
            });
        }
    });
    commands.addCommand(CommandIDs.logout, {
        label: trans.__('Log Out'),
        caption: trans.__('Log out of JupyterLab'),
        isVisible: () => menu.quitEntry,
        isEnabled: () => menu.quitEntry,
        execute: () => {
            router.navigate('/logout', { hard: true });
        }
    });
}
/**
 * Create the basic `Kernel` menu.
 */
function createKernelMenu(app, menu, trans) {
    const commands = app.commands;
    commands.addCommand(CommandIDs.interruptKernel, {
        label: trans.__('Interrupt Kernel'),
        caption: trans.__('Interrupt the kernel'),
        icon: args => (args.toolbar ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7__.stopIcon : undefined),
        isEnabled: Private.delegateEnabled(app, menu.kernelUsers, 'interruptKernel'),
        execute: Private.delegateExecute(app, menu.kernelUsers, 'interruptKernel')
    });
    commands.addCommand(CommandIDs.reconnectToKernel, {
        label: trans.__('Reconnect to Kernel'),
        isEnabled: Private.delegateEnabled(app, menu.kernelUsers, 'reconnectToKernel'),
        execute: Private.delegateExecute(app, menu.kernelUsers, 'reconnectToKernel')
    });
    commands.addCommand(CommandIDs.restartKernel, {
        label: trans.__('Restart Kernel…'),
        caption: trans.__('Restart the kernel'),
        icon: args => (args.toolbar ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7__.refreshIcon : undefined),
        isEnabled: Private.delegateEnabled(app, menu.kernelUsers, 'restartKernel'),
        execute: Private.delegateExecute(app, menu.kernelUsers, 'restartKernel')
    });
    commands.addCommand(CommandIDs.restartKernelAndClear, {
        label: () => {
            const enabled = Private.delegateEnabled(app, menu.kernelUsers, 'restartKernelAndClear')();
            let localizedLabel = trans.__('Restart Kernel and Clear…');
            if (enabled) {
                localizedLabel = Private.delegateLabel(app, menu.kernelUsers, 'restartKernelAndClearLabel');
            }
            return localizedLabel;
        },
        isEnabled: Private.delegateEnabled(app, menu.kernelUsers, 'restartKernelAndClear'),
        execute: Private.delegateExecute(app, menu.kernelUsers, 'restartKernelAndClear')
    });
    commands.addCommand(CommandIDs.changeKernel, {
        label: trans.__('Change Kernel…'),
        isEnabled: Private.delegateEnabled(app, menu.kernelUsers, 'changeKernel'),
        execute: Private.delegateExecute(app, menu.kernelUsers, 'changeKernel')
    });
    commands.addCommand(CommandIDs.shutdownKernel, {
        label: trans.__('Shut Down Kernel'),
        isEnabled: Private.delegateEnabled(app, menu.kernelUsers, 'shutdownKernel'),
        execute: Private.delegateExecute(app, menu.kernelUsers, 'shutdownKernel')
    });
    commands.addCommand(CommandIDs.shutdownAllKernels, {
        label: trans.__('Shut Down All Kernels…'),
        isEnabled: () => {
            return app.serviceManager.sessions.running().next() !== undefined;
        },
        execute: () => {
            return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                title: trans.__('Shut Down All?'),
                body: trans.__('Shut down all kernels?'),
                buttons: [
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton({ label: trans.__('Dismiss') }),
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.warnButton({ label: trans.__('Shut Down All') })
                ]
            }).then(result => {
                if (result.button.accept) {
                    return app.serviceManager.sessions.shutdownAll();
                }
            });
        }
    });
}
/**
 * Create the basic `View` menu.
 */
function createViewMenu(app, menu, trans) {
    const commands = app.commands;
    commands.addCommand(CommandIDs.lineNumbering, {
        label: trans.__('Show Line Numbers'),
        isEnabled: Private.delegateEnabled(app, menu.editorViewers, 'toggleLineNumbers'),
        isToggled: Private.delegateToggled(app, menu.editorViewers, 'lineNumbersToggled'),
        execute: Private.delegateExecute(app, menu.editorViewers, 'toggleLineNumbers')
    });
    commands.addCommand(CommandIDs.matchBrackets, {
        label: trans.__('Match Brackets'),
        isEnabled: Private.delegateEnabled(app, menu.editorViewers, 'toggleMatchBrackets'),
        isToggled: Private.delegateToggled(app, menu.editorViewers, 'matchBracketsToggled'),
        execute: Private.delegateExecute(app, menu.editorViewers, 'toggleMatchBrackets')
    });
    commands.addCommand(CommandIDs.wordWrap, {
        label: trans.__('Wrap Words'),
        isEnabled: Private.delegateEnabled(app, menu.editorViewers, 'toggleWordWrap'),
        isToggled: Private.delegateToggled(app, menu.editorViewers, 'wordWrapToggled'),
        execute: Private.delegateExecute(app, menu.editorViewers, 'toggleWordWrap')
    });
}
/**
 * Create the basic `Run` menu.
 */
function createRunMenu(app, menu, trans) {
    const commands = app.commands;
    commands.addCommand(CommandIDs.run, {
        label: () => {
            const localizedLabel = Private.delegateLabel(app, menu.codeRunners, 'runLabel');
            const enabled = Private.delegateEnabled(app, menu.codeRunners, 'run')();
            return enabled ? localizedLabel : trans.__('Run Selected');
        },
        caption: () => {
            const localizedCaption = Private.delegateLabel(app, menu.codeRunners, 'runCaption');
            const enabled = Private.delegateEnabled(app, menu.codeRunners, 'run')();
            return enabled ? localizedCaption : trans.__('Run Selected');
        },
        icon: args => (args.toolbar ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7__.runIcon : undefined),
        isEnabled: Private.delegateEnabled(app, menu.codeRunners, 'run'),
        execute: Private.delegateExecute(app, menu.codeRunners, 'run')
    });
    commands.addCommand(CommandIDs.runAll, {
        label: () => {
            let localizedLabel = trans.__('Run All');
            const enabled = Private.delegateEnabled(app, menu.codeRunners, 'runAll')();
            if (enabled) {
                localizedLabel = Private.delegateLabel(app, menu.codeRunners, 'runAllLabel');
            }
            return localizedLabel;
        },
        caption: () => {
            let localizedCaption = trans.__('Run All');
            const enabled = Private.delegateEnabled(app, menu.codeRunners, 'runAll')();
            if (enabled) {
                localizedCaption = Private.delegateLabel(app, menu.codeRunners, 'runAllCaption');
            }
            return localizedCaption;
        },
        isEnabled: Private.delegateEnabled(app, menu.codeRunners, 'runAll'),
        execute: Private.delegateExecute(app, menu.codeRunners, 'runAll')
    });
    commands.addCommand(CommandIDs.restartAndRunAll, {
        label: () => {
            let localizedLabel = trans.__('Restart Kernel and Run All');
            const enabled = Private.delegateEnabled(app, menu.codeRunners, 'restartAndRunAll')();
            if (enabled) {
                localizedLabel = Private.delegateLabel(app, menu.codeRunners, 'restartAndRunAllLabel');
            }
            return localizedLabel;
        },
        caption: () => {
            let localizedCaption = trans.__('Restart Kernel and Run All');
            const enabled = Private.delegateEnabled(app, menu.codeRunners, 'restartAndRunAll')();
            if (enabled) {
                localizedCaption = Private.delegateLabel(app, menu.codeRunners, 'restartAndRunAllLabel');
            }
            return localizedCaption;
        },
        icon: args => (args.toolbar ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7__.fastForwardIcon : undefined),
        isEnabled: Private.delegateEnabled(app, menu.codeRunners, 'restartAndRunAll'),
        execute: Private.delegateExecute(app, menu.codeRunners, 'restartAndRunAll')
    });
}
/**
 * Create the basic `Tabs` menu.
 */
function createTabsMenu(app, menu, labShell, trans) {
    const commands = app.commands;
    // A list of the active tabs in the main area.
    const tabGroup = [];
    // A disposable for getting rid of the out-of-date tabs list.
    let disposable;
    // Command to activate a widget by id.
    commands.addCommand(CommandIDs.activateById, {
        label: args => {
            const id = args['id'] || '';
            const widget = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_8__.find)(app.shell.widgets('main'), w => w.id === id);
            return (widget && widget.title.label) || '';
        },
        isToggled: args => {
            const id = args['id'] || '';
            return !!app.shell.currentWidget && app.shell.currentWidget.id === id;
        },
        execute: args => app.shell.activateById(args['id'] || '')
    });
    let previousId = '';
    // Command to toggle between the current
    // tab and the last modified tab.
    commands.addCommand(CommandIDs.activatePreviouslyUsedTab, {
        label: trans.__('Activate Previously Used Tab'),
        isEnabled: () => !!previousId,
        execute: () => commands.execute(CommandIDs.activateById, { id: previousId })
    });
    if (labShell) {
        void app.restored.then(() => {
            // Iterate over the current widgets in the
            // main area, and add them to the tab group
            // of the menu.
            const populateTabs = () => {
                // remove the previous tab list
                if (disposable && !disposable.isDisposed) {
                    disposable.dispose();
                }
                tabGroup.length = 0;
                let isPreviouslyUsedTabAttached = false;
                (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_8__.each)(app.shell.widgets('main'), widget => {
                    if (widget.id === previousId) {
                        isPreviouslyUsedTabAttached = true;
                    }
                    tabGroup.push({
                        command: CommandIDs.activateById,
                        args: { id: widget.id }
                    });
                });
                disposable = menu.addGroup(tabGroup, 1);
                previousId = isPreviouslyUsedTabAttached ? previousId : '';
            };
            populateTabs();
            labShell.layoutModified.connect(() => {
                populateTabs();
            });
            // Update the ID of the previous active tab if a new tab is selected.
            labShell.currentChanged.connect((_, args) => {
                const widget = args.oldValue;
                if (!widget) {
                    return;
                }
                previousId = widget.id;
            });
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);
/**
 * A namespace for Private data.
 */
var Private;
(function (Private) {
    /**
     * Return the first value of the iterable that satisfies the predicate
     * function.
     */
    function find(it, predicate) {
        for (const value of it) {
            if (predicate(value)) {
                return value;
            }
        }
        return undefined;
    }
    /**
     * A utility function that delegates a portion of a label to an IMenuExtender.
     */
    function delegateLabel(app, s, label) {
        const widget = app.shell.currentWidget;
        const extender = widget
            ? find(s, value => value.tracker.has(widget))
            : undefined;
        if (!extender || !extender[label]) {
            return '';
        }
        else {
            const count = extender.tracker.size;
            // Coerce the result to be a string. When Typedoc is updated to use
            // Typescript 2.8, we can possibly use conditional types to get Typescript
            // to recognize this is a string.
            return extender[label](count);
        }
    }
    Private.delegateLabel = delegateLabel;
    /**
     * A utility function that delegates command execution
     * to an IMenuExtender.
     */
    function delegateExecute(app, s, executor) {
        return () => {
            const widget = app.shell.currentWidget;
            const extender = widget
                ? find(s, value => value.tracker.has(widget))
                : undefined;
            if (!extender) {
                return Promise.resolve(void 0);
            }
            // Coerce the result to be a function. When Typedoc is updated to use
            // Typescript 2.8, we can possibly use conditional types to get Typescript
            // to recognize this is a function.
            const f = extender[executor];
            return f(widget);
        };
    }
    Private.delegateExecute = delegateExecute;
    /**
     * A utility function that delegates whether a command is enabled
     * to an IMenuExtender.
     */
    function delegateEnabled(app, s, executor) {
        return () => {
            const widget = app.shell.currentWidget;
            const extender = widget
                ? find(s, value => value.tracker.has(widget))
                : undefined;
            return (!!extender &&
                !!extender[executor] &&
                (extender.isEnabled && widget ? extender.isEnabled(widget) : true));
        };
    }
    Private.delegateEnabled = delegateEnabled;
    /**
     * A utility function that delegates whether a command is toggled
     * for an IMenuExtender.
     */
    function delegateToggled(app, s, toggled) {
        return () => {
            const widget = app.shell.currentWidget;
            const extender = widget
                ? find(s, value => value.tracker.has(widget))
                : undefined;
            // Coerce extender[toggled] to be a function. When Typedoc is updated to use
            // Typescript 2.8, we can possibly use conditional types to get Typescript
            // to recognize this is a function.
            return (!!extender &&
                !!extender[toggled] &&
                !!widget &&
                !!extender[toggled](widget));
        };
    }
    Private.delegateToggled = delegateToggled;
    async function displayInformation(trans) {
        const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
            title: trans.__('Information'),
            body: trans.__('Menu customization has changed. You will need to reload JupyterLab to see the changes.'),
            buttons: [
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton(),
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: trans.__('Reload') })
            ]
        });
        if (result.button.accept) {
            location.reload();
        }
    }
    async function loadSettingsMenu(registry, addMenu, menuFactory, translator) {
        var _a;
        const trans = translator.load('jupyterlab');
        let canonical;
        let loaded = {};
        /**
         * Populate the plugin's schema defaults.
         */
        function populate(schema) {
            var _a, _b;
            loaded = {};
            const pluginDefaults = Object.keys(registry.plugins)
                .map(plugin => {
                var _a, _b;
                const menus = (_b = (_a = registry.plugins[plugin].schema['jupyter.lab.menus']) === null || _a === void 0 ? void 0 : _a.main) !== null && _b !== void 0 ? _b : [];
                loaded[plugin] = menus;
                return menus;
            })
                .concat([(_b = (_a = schema['jupyter.lab.menus']) === null || _a === void 0 ? void 0 : _a.main) !== null && _b !== void 0 ? _b : []])
                .reduceRight((acc, val) => _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.SettingRegistry.reconcileMenus(acc, val, true), schema.properties.menus.default);
            // Apply default value as last step to take into account overrides.json
            // The standard default being [] as the plugin must use `jupyter.lab.menus.main`
            // to define their default value.
            schema.properties.menus.default = _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.SettingRegistry.reconcileMenus(pluginDefaults, schema.properties.menus.default, true)
                // flatten one level
                .sort((a, b) => { var _a, _b; return ((_a = a.rank) !== null && _a !== void 0 ? _a : Infinity) - ((_b = b.rank) !== null && _b !== void 0 ? _b : Infinity); });
        }
        // Transform the plugin object to return different schema than the default.
        registry.transform(PLUGIN_ID, {
            compose: plugin => {
                var _a, _b, _c, _d;
                // Only override the canonical schema the first time.
                if (!canonical) {
                    canonical = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__.JSONExt.deepCopy(plugin.schema);
                    populate(canonical);
                }
                const defaults = (_c = (_b = (_a = canonical.properties) === null || _a === void 0 ? void 0 : _a.menus) === null || _b === void 0 ? void 0 : _b.default) !== null && _c !== void 0 ? _c : [];
                const user = Object.assign(Object.assign({}, plugin.data.user), { menus: (_d = plugin.data.user.menus) !== null && _d !== void 0 ? _d : [] });
                const composite = Object.assign(Object.assign({}, plugin.data.composite), { menus: _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.SettingRegistry.reconcileMenus(defaults, user.menus) });
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
        const settings = await registry.load(PLUGIN_ID);
        const currentMenus = (_a = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__.JSONExt.deepCopy(settings.composite.menus)) !== null && _a !== void 0 ? _a : [];
        const menus = new Array();
        // Create menu for non-disabled element
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MenuFactory.createMenus(currentMenus
            .filter(menu => !menu.disabled)
            .map(menu => {
            var _a;
            return Object.assign(Object.assign({}, menu), { items: _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.SettingRegistry.filterDisabledItems((_a = menu.items) !== null && _a !== void 0 ? _a : []) });
        }), menuFactory).forEach(menu => {
            menus.push(menu);
            addMenu(menu);
        });
        settings.changed.connect(() => {
            var _a;
            // As extension may change menu through API, prompt the user to reload if the
            // menu has been updated.
            const newMenus = (_a = settings.composite.menus) !== null && _a !== void 0 ? _a : [];
            if (!_lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__.JSONExt.deepEqual(currentMenus, newMenus)) {
                void displayInformation(trans);
            }
        });
        registry.pluginChanged.connect(async (sender, plugin) => {
            var _a, _b, _c;
            if (plugin !== PLUGIN_ID) {
                // If the plugin changed its menu.
                const oldMenus = (_a = loaded[plugin]) !== null && _a !== void 0 ? _a : [];
                const newMenus = (_c = (_b = registry.plugins[plugin].schema['jupyter.lab.menus']) === null || _b === void 0 ? void 0 : _b.main) !== null && _c !== void 0 ? _c : [];
                if (!_lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__.JSONExt.deepEqual(oldMenus, newMenus)) {
                    if (loaded[plugin]) {
                        // The plugin has changed, request the user to reload the UI - this should not happen
                        await displayInformation(trans);
                    }
                    else {
                        // The plugin was not yet loaded when the menu was built => update the menu
                        loaded[plugin] = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__.JSONExt.deepCopy(newMenus);
                        // Merge potential disabled state
                        const toAdd = _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.SettingRegistry.reconcileMenus(newMenus, currentMenus, false, false)
                            .filter(menu => !menu.disabled)
                            .map(menu => {
                            var _a;
                            return Object.assign(Object.assign({}, menu), { items: _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.SettingRegistry.filterDisabledItems((_a = menu.items) !== null && _a !== void 0 ? _a : []) });
                        });
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MenuFactory.updateMenus(menus, toAdd, menuFactory).forEach(menu => {
                            addMenu(menu);
                        });
                    }
                }
            }
        });
    }
    Private.loadSettingsMenu = loadSettingsMenu;
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbWFpbm1lbnUtZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDNkQ7QUFDMkI7QUFDN0I7QUFDQTtBQUNIO0FBQ3dCO0FBQzFCO0FBQ3NDO0FBQzdDO0FBQ0g7QUFDSDtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdDQUFnQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSw0REFBTyxFQUFFLGdFQUFXO0FBQ25DLGVBQWUsaUVBQWUsRUFBRSw4REFBUyxFQUFFLHlFQUFnQjtBQUMzRCxjQUFjLDJEQUFTO0FBQ3ZCO0FBQ0EsZUFBZSxXQUFXO0FBQzFCO0FBQ0EseUJBQXlCLDBEQUFRO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsbUJBQW1CO0FBQ3hELGFBQWEsYUFBYSx1RUFBcUI7QUFDL0M7QUFDQTtBQUNBLDJCQUEyQix1RUFBb0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNB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RTtBQUNBLGlDQUFpQyxZQUFZLDhIQUE4SCxFQUFFO0FBQzdLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLCtEQUFnQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsc0JBQXNCLDJFQUEyRTtBQUM1SixnRUFBZ0UsMkJBQTJCLFFBQVEsdUZBQThCLHdCQUF3QjtBQUN6SiwrQkFBK0I7QUFDL0I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLCtEQUFnQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQywrREFBZ0I7QUFDbkQ7QUFDQTtBQUNBLFFBQVEseUVBQXVCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxVQUFVLFFBQVEsNEZBQW1DLHlEQUF5RDtBQUMvSixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdFQUFpQjtBQUNsQztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixnRUFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLCtEQUFnQjtBQUN6RDtBQUNBLHNDQUFzQyx1RkFBOEI7QUFDcEU7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLFVBQVUsUUFBUSw0RkFBbUMseURBQXlEO0FBQy9LLHlCQUF5QjtBQUN6Qix3QkFBd0IseUVBQXVCO0FBQy9DO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0IsaUMiLCJmaWxlIjoicGFja2FnZXNfbWFpbm1lbnUtZXh0ZW5zaW9uX2xpYl9pbmRleF9qcy5iODI2YTY3MTZiYjUxODBhMjgyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIG1haW5tZW51LWV4dGVuc2lvblxuICovXG5pbXBvcnQgeyBJTGFiU2hlbGwsIElSb3V0ZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBEaWFsb2csIElDb21tYW5kUGFsZXR0ZSwgTWVudUZhY3RvcnksIHNob3dEaWFsb2cgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBQYWdlQ29uZmlnLCBVUkxFeHQgfSBmcm9tICdAanVweXRlcmxhYi9jb3JldXRpbHMnO1xuaW1wb3J0IHsgSU1haW5NZW51LCBNYWluTWVudSB9IGZyb20gJ0BqdXB5dGVybGFiL21haW5tZW51JztcbmltcG9ydCB7IFNlcnZlckNvbm5lY3Rpb24gfSBmcm9tICdAanVweXRlcmxhYi9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBJU2V0dGluZ1JlZ2lzdHJ5LCBTZXR0aW5nUmVnaXN0cnkgfSBmcm9tICdAanVweXRlcmxhYi9zZXR0aW5ncmVnaXN0cnknO1xuaW1wb3J0IHsgSVRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBmYXN0Rm9yd2FyZEljb24sIHJlZnJlc2hJY29uLCBydW5JY29uLCBzdG9wSWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgZWFjaCwgZmluZCB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCB7IEpTT05FeHQgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuY29uc3QgUExVR0lOX0lEID0gJ0BqdXB5dGVybGFiL21haW5tZW51LWV4dGVuc2lvbjpwbHVnaW4nO1xuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgY29tbWFuZCBJRHMgb2Ygc2VtYW50aWMgZXh0ZW5zaW9uIHBvaW50cy5cbiAqL1xuZXhwb3J0IHZhciBDb21tYW5kSURzO1xuKGZ1bmN0aW9uIChDb21tYW5kSURzKSB7XG4gICAgQ29tbWFuZElEcy5vcGVuRWRpdCA9ICdlZGl0bWVudTpvcGVuJztcbiAgICBDb21tYW5kSURzLnVuZG8gPSAnZWRpdG1lbnU6dW5kbyc7XG4gICAgQ29tbWFuZElEcy5yZWRvID0gJ2VkaXRtZW51OnJlZG8nO1xuICAgIENvbW1hbmRJRHMuY2xlYXJDdXJyZW50ID0gJ2VkaXRtZW51OmNsZWFyLWN1cnJlbnQnO1xuICAgIENvbW1hbmRJRHMuY2xlYXJBbGwgPSAnZWRpdG1lbnU6Y2xlYXItYWxsJztcbiAgICBDb21tYW5kSURzLmZpbmQgPSAnZWRpdG1lbnU6ZmluZCc7XG4gICAgQ29tbWFuZElEcy5nb1RvTGluZSA9ICdlZGl0bWVudTpnby10by1saW5lJztcbiAgICBDb21tYW5kSURzLm9wZW5GaWxlID0gJ2ZpbGVtZW51Om9wZW4nO1xuICAgIENvbW1hbmRJRHMuY2xvc2VBbmRDbGVhbnVwID0gJ2ZpbGVtZW51OmNsb3NlLWFuZC1jbGVhbnVwJztcbiAgICBDb21tYW5kSURzLmNyZWF0ZUNvbnNvbGUgPSAnZmlsZW1lbnU6Y3JlYXRlLWNvbnNvbGUnO1xuICAgIENvbW1hbmRJRHMuc2h1dGRvd24gPSAnZmlsZW1lbnU6c2h1dGRvd24nO1xuICAgIENvbW1hbmRJRHMubG9nb3V0ID0gJ2ZpbGVtZW51OmxvZ291dCc7XG4gICAgQ29tbWFuZElEcy5vcGVuS2VybmVsID0gJ2tlcm5lbG1lbnU6b3Blbic7XG4gICAgQ29tbWFuZElEcy5pbnRlcnJ1cHRLZXJuZWwgPSAna2VybmVsbWVudTppbnRlcnJ1cHQnO1xuICAgIENvbW1hbmRJRHMucmVjb25uZWN0VG9LZXJuZWwgPSAna2VybmVsbWVudTpyZWNvbm5lY3QtdG8ta2VybmVsJztcbiAgICBDb21tYW5kSURzLnJlc3RhcnRLZXJuZWwgPSAna2VybmVsbWVudTpyZXN0YXJ0JztcbiAgICBDb21tYW5kSURzLnJlc3RhcnRLZXJuZWxBbmRDbGVhciA9ICdrZXJuZWxtZW51OnJlc3RhcnQtYW5kLWNsZWFyJztcbiAgICBDb21tYW5kSURzLmNoYW5nZUtlcm5lbCA9ICdrZXJuZWxtZW51OmNoYW5nZSc7XG4gICAgQ29tbWFuZElEcy5zaHV0ZG93bktlcm5lbCA9ICdrZXJuZWxtZW51OnNodXRkb3duJztcbiAgICBDb21tYW5kSURzLnNodXRkb3duQWxsS2VybmVscyA9ICdrZXJuZWxtZW51OnNodXRkb3duQWxsJztcbiAgICBDb21tYW5kSURzLm9wZW5WaWV3ID0gJ3ZpZXdtZW51Om9wZW4nO1xuICAgIENvbW1hbmRJRHMud29yZFdyYXAgPSAndmlld21lbnU6d29yZC13cmFwJztcbiAgICBDb21tYW5kSURzLmxpbmVOdW1iZXJpbmcgPSAndmlld21lbnU6bGluZS1udW1iZXJpbmcnO1xuICAgIENvbW1hbmRJRHMubWF0Y2hCcmFja2V0cyA9ICd2aWV3bWVudTptYXRjaC1icmFja2V0cyc7XG4gICAgQ29tbWFuZElEcy5vcGVuUnVuID0gJ3J1bm1lbnU6b3Blbic7XG4gICAgQ29tbWFuZElEcy5ydW4gPSAncnVubWVudTpydW4nO1xuICAgIENvbW1hbmRJRHMucnVuQWxsID0gJ3J1bm1lbnU6cnVuLWFsbCc7XG4gICAgQ29tbWFuZElEcy5yZXN0YXJ0QW5kUnVuQWxsID0gJ3J1bm1lbnU6cmVzdGFydC1hbmQtcnVuLWFsbCc7XG4gICAgQ29tbWFuZElEcy5ydW5BYm92ZSA9ICdydW5tZW51OnJ1bi1hYm92ZSc7XG4gICAgQ29tbWFuZElEcy5ydW5CZWxvdyA9ICdydW5tZW51OnJ1bi1iZWxvdyc7XG4gICAgQ29tbWFuZElEcy5vcGVuVGFicyA9ICd0YWJzbWVudTpvcGVuJztcbiAgICBDb21tYW5kSURzLmFjdGl2YXRlQnlJZCA9ICd0YWJzbWVudTphY3RpdmF0ZS1ieS1pZCc7XG4gICAgQ29tbWFuZElEcy5hY3RpdmF0ZVByZXZpb3VzbHlVc2VkVGFiID0gJ3RhYnNtZW51OmFjdGl2YXRlLXByZXZpb3VzbHktdXNlZC10YWInO1xuICAgIENvbW1hbmRJRHMub3BlblNldHRpbmdzID0gJ3NldHRpbmdzbWVudTpvcGVuJztcbiAgICBDb21tYW5kSURzLm9wZW5IZWxwID0gJ2hlbHBtZW51Om9wZW4nO1xuICAgIENvbW1hbmRJRHMub3BlbkZpcnN0ID0gJ21haW5tZW51Om9wZW4tZmlyc3QnO1xufSkoQ29tbWFuZElEcyB8fCAoQ29tbWFuZElEcyA9IHt9KSk7XG4vKipcbiAqIEEgc2VydmljZSBwcm92aWRpbmcgYW4gaW50ZXJmYWNlIHRvIHRoZSBtYWluIG1lbnUuXG4gKi9cbmNvbnN0IHBsdWdpbiA9IHtcbiAgICBpZDogUExVR0lOX0lELFxuICAgIHJlcXVpcmVzOiBbSVJvdXRlciwgSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbSUNvbW1hbmRQYWxldHRlLCBJTGFiU2hlbGwsIElTZXR0aW5nUmVnaXN0cnldLFxuICAgIHByb3ZpZGVzOiBJTWFpbk1lbnUsXG4gICAgYWN0aXZhdGU6IGFzeW5jIChhcHAsIHJvdXRlciwgdHJhbnNsYXRvciwgcGFsZXR0ZSwgbGFiU2hlbGwsIHJlZ2lzdHJ5KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMgfSA9IGFwcDtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgbWVudSA9IG5ldyBNYWluTWVudShjb21tYW5kcyk7XG4gICAgICAgIG1lbnUuaWQgPSAnanAtTWFpbk1lbnUnO1xuICAgICAgICBtZW51LmFkZENsYXNzKCdqcC1zY3JvbGxiYXItdGlueScpO1xuICAgICAgICAvLyBCdWlsdCBtZW51IGZyb20gc2V0dGluZ3NcbiAgICAgICAgaWYgKHJlZ2lzdHJ5KSB7XG4gICAgICAgICAgICBhd2FpdCBQcml2YXRlLmxvYWRTZXR0aW5nc01lbnUocmVnaXN0cnksIChhTWVudSkgPT4ge1xuICAgICAgICAgICAgICAgIG1lbnUuYWRkTWVudShhTWVudSwgeyByYW5rOiBhTWVudS5yYW5rIH0pO1xuICAgICAgICAgICAgfSwgb3B0aW9ucyA9PiBNYWluTWVudS5nZW5lcmF0ZU1lbnUoY29tbWFuZHMsIG9wdGlvbnMsIHRyYW5zKSwgdHJhbnNsYXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT25seSBhZGQgcXVpdCBidXR0b24gaWYgdGhlIGJhY2stZW5kIHN1cHBvcnRzIGl0IGJ5IGNoZWNraW5nIHBhZ2UgY29uZmlnLlxuICAgICAgICBjb25zdCBxdWl0QnV0dG9uID0gUGFnZUNvbmZpZy5nZXRPcHRpb24oJ3F1aXRCdXR0b24nKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBtZW51LmZpbGVNZW51LnF1aXRFbnRyeSA9IHF1aXRCdXR0b24gPT09ICd0cnVlJztcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBhcHBsaWNhdGlvbiBtZW51cy5cbiAgICAgICAgY3JlYXRlRWRpdE1lbnUoYXBwLCBtZW51LmVkaXRNZW51LCB0cmFucyk7XG4gICAgICAgIGNyZWF0ZUZpbGVNZW51KGFwcCwgbWVudS5maWxlTWVudSwgcm91dGVyLCB0cmFucyk7XG4gICAgICAgIGNyZWF0ZUtlcm5lbE1lbnUoYXBwLCBtZW51Lmtlcm5lbE1lbnUsIHRyYW5zKTtcbiAgICAgICAgY3JlYXRlUnVuTWVudShhcHAsIG1lbnUucnVuTWVudSwgdHJhbnMpO1xuICAgICAgICBjcmVhdGVWaWV3TWVudShhcHAsIG1lbnUudmlld01lbnUsIHRyYW5zKTtcbiAgICAgICAgLy8gVGhlIHRhYnMgbWVudSByZWxpZXMgb24gbGFiIHNoZWxsIGZ1bmN0aW9uYWxpdHkuXG4gICAgICAgIGlmIChsYWJTaGVsbCkge1xuICAgICAgICAgICAgY3JlYXRlVGFic01lbnUoYXBwLCBtZW51LnRhYnNNZW51LCBsYWJTaGVsbCwgdHJhbnMpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENyZWF0ZSBjb21tYW5kcyB0byBvcGVuIHRoZSBtYWluIGFwcGxpY2F0aW9uIG1lbnVzLlxuICAgICAgICBjb25zdCBhY3RpdmF0ZU1lbnUgPSAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgbWVudS5hY3RpdmVNZW51ID0gaXRlbTtcbiAgICAgICAgICAgIG1lbnUub3BlbkFjdGl2ZU1lbnUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm9wZW5FZGl0LCB7XG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ09wZW4gRWRpdCBNZW51JyksXG4gICAgICAgICAgICBleGVjdXRlOiAoKSA9PiBhY3RpdmF0ZU1lbnUobWVudS5lZGl0TWVudSlcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5vcGVuRmlsZSwge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdPcGVuIEZpbGUgTWVudScpLFxuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4gYWN0aXZhdGVNZW51KG1lbnUuZmlsZU1lbnUpXG4gICAgICAgIH0pO1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMub3Blbktlcm5lbCwge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdPcGVuIEtlcm5lbCBNZW51JyksXG4gICAgICAgICAgICBleGVjdXRlOiAoKSA9PiBhY3RpdmF0ZU1lbnUobWVudS5rZXJuZWxNZW51KVxuICAgICAgICB9KTtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm9wZW5SdW4sIHtcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnT3BlbiBSdW4gTWVudScpLFxuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4gYWN0aXZhdGVNZW51KG1lbnUucnVuTWVudSlcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5vcGVuVmlldywge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdPcGVuIFZpZXcgTWVudScpLFxuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4gYWN0aXZhdGVNZW51KG1lbnUudmlld01lbnUpXG4gICAgICAgIH0pO1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMub3BlblNldHRpbmdzLCB7XG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ09wZW4gU2V0dGluZ3MgTWVudScpLFxuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4gYWN0aXZhdGVNZW51KG1lbnUuc2V0dGluZ3NNZW51KVxuICAgICAgICB9KTtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm9wZW5UYWJzLCB7XG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ09wZW4gVGFicyBNZW51JyksXG4gICAgICAgICAgICBleGVjdXRlOiAoKSA9PiBhY3RpdmF0ZU1lbnUobWVudS50YWJzTWVudSlcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5vcGVuSGVscCwge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdPcGVuIEhlbHAgTWVudScpLFxuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4gYWN0aXZhdGVNZW51KG1lbnUuaGVscE1lbnUpXG4gICAgICAgIH0pO1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMub3BlbkZpcnN0LCB7XG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ09wZW4gRmlyc3QgTWVudScpLFxuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIG1lbnUuYWN0aXZlSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIG1lbnUub3BlbkFjdGl2ZU1lbnUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChwYWxldHRlKSB7XG4gICAgICAgICAgICAvLyBBZGQgc29tZSBvZiB0aGUgY29tbWFuZHMgZGVmaW5lZCBoZXJlIHRvIHRoZSBjb21tYW5kIHBhbGV0dGUuXG4gICAgICAgICAgICBwYWxldHRlLmFkZEl0ZW0oe1xuICAgICAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMuc2h1dGRvd24sXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHRyYW5zLl9fKCdNYWluIEFyZWEnKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwYWxldHRlLmFkZEl0ZW0oe1xuICAgICAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMubG9nb3V0LFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiB0cmFucy5fXygnTWFpbiBBcmVhJylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHtcbiAgICAgICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLnNodXRkb3duQWxsS2VybmVscyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogdHJhbnMuX18oJ0tlcm5lbCBPcGVyYXRpb25zJylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHtcbiAgICAgICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLmFjdGl2YXRlUHJldmlvdXNseVVzZWRUYWIsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHRyYW5zLl9fKCdNYWluIEFyZWEnKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYXBwLnNoZWxsLmFkZChtZW51LCAnbWVudScsIHsgcmFuazogMTAwIH0pO1xuICAgICAgICByZXR1cm4gbWVudTtcbiAgICB9XG59O1xuLyoqXG4gKiBDcmVhdGUgdGhlIGJhc2ljIGBFZGl0YCBtZW51LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWRpdE1lbnUoYXBwLCBtZW51LCB0cmFucykge1xuICAgIGNvbnN0IGNvbW1hbmRzID0gYXBwLmNvbW1hbmRzO1xuICAgIC8vIEFkZCB0aGUgdW5kby9yZWRvIGNvbW1hbmRzIHRoZSB0aGUgRWRpdCBtZW51LlxuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy51bmRvLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnVW5kbycpLFxuICAgICAgICBpc0VuYWJsZWQ6IFByaXZhdGUuZGVsZWdhdGVFbmFibGVkKGFwcCwgbWVudS51bmRvZXJzLCAndW5kbycpLFxuICAgICAgICBleGVjdXRlOiBQcml2YXRlLmRlbGVnYXRlRXhlY3V0ZShhcHAsIG1lbnUudW5kb2VycywgJ3VuZG8nKVxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5yZWRvLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnUmVkbycpLFxuICAgICAgICBpc0VuYWJsZWQ6IFByaXZhdGUuZGVsZWdhdGVFbmFibGVkKGFwcCwgbWVudS51bmRvZXJzLCAncmVkbycpLFxuICAgICAgICBleGVjdXRlOiBQcml2YXRlLmRlbGVnYXRlRXhlY3V0ZShhcHAsIG1lbnUudW5kb2VycywgJ3JlZG8nKVxuICAgIH0pO1xuICAgIC8vIEFkZCB0aGUgY2xlYXIgY29tbWFuZHMgdG8gdGhlIEVkaXQgbWVudS5cbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuY2xlYXJDdXJyZW50LCB7XG4gICAgICAgIGxhYmVsOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbmFibGVkID0gUHJpdmF0ZS5kZWxlZ2F0ZUVuYWJsZWQoYXBwLCBtZW51LmNsZWFyZXJzLCAnY2xlYXJDdXJyZW50JykoKTtcbiAgICAgICAgICAgIGxldCBsb2NhbGl6ZWRMYWJlbCA9IHRyYW5zLl9fKCdDbGVhcicpO1xuICAgICAgICAgICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBsb2NhbGl6ZWRMYWJlbCA9IFByaXZhdGUuZGVsZWdhdGVMYWJlbChhcHAsIG1lbnUuY2xlYXJlcnMsICdjbGVhckN1cnJlbnRMYWJlbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxvY2FsaXplZExhYmVsO1xuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWQ6IFByaXZhdGUuZGVsZWdhdGVFbmFibGVkKGFwcCwgbWVudS5jbGVhcmVycywgJ2NsZWFyQ3VycmVudCcpLFxuICAgICAgICBleGVjdXRlOiBQcml2YXRlLmRlbGVnYXRlRXhlY3V0ZShhcHAsIG1lbnUuY2xlYXJlcnMsICdjbGVhckN1cnJlbnQnKVxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jbGVhckFsbCwge1xuICAgICAgICBsYWJlbDogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZW5hYmxlZCA9IFByaXZhdGUuZGVsZWdhdGVFbmFibGVkKGFwcCwgbWVudS5jbGVhcmVycywgJ2NsZWFyQWxsJykoKTtcbiAgICAgICAgICAgIGxldCBsb2NhbGl6ZWRMYWJlbCA9IHRyYW5zLl9fKCdDbGVhciBBbGwnKTtcbiAgICAgICAgICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxpemVkTGFiZWwgPSBQcml2YXRlLmRlbGVnYXRlTGFiZWwoYXBwLCBtZW51LmNsZWFyZXJzLCAnY2xlYXJBbGxMYWJlbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxvY2FsaXplZExhYmVsO1xuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWQ6IFByaXZhdGUuZGVsZWdhdGVFbmFibGVkKGFwcCwgbWVudS5jbGVhcmVycywgJ2NsZWFyQWxsJyksXG4gICAgICAgIGV4ZWN1dGU6IFByaXZhdGUuZGVsZWdhdGVFeGVjdXRlKGFwcCwgbWVudS5jbGVhcmVycywgJ2NsZWFyQWxsJylcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuZ29Ub0xpbmUsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdHbyB0byBMaW5l4oCmJyksXG4gICAgICAgIGlzRW5hYmxlZDogUHJpdmF0ZS5kZWxlZ2F0ZUVuYWJsZWQoYXBwLCBtZW51LmdvVG9MaW5lcnMsICdnb1RvTGluZScpLFxuICAgICAgICBleGVjdXRlOiBQcml2YXRlLmRlbGVnYXRlRXhlY3V0ZShhcHAsIG1lbnUuZ29Ub0xpbmVycywgJ2dvVG9MaW5lJylcbiAgICB9KTtcbn1cbi8qKlxuICogQ3JlYXRlIHRoZSBiYXNpYyBgRmlsZWAgbWVudS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZpbGVNZW51KGFwcCwgbWVudSwgcm91dGVyLCB0cmFucykge1xuICAgIGNvbnN0IGNvbW1hbmRzID0gYXBwLmNvbW1hbmRzO1xuICAgIC8vIEFkZCBhIGRlbGVnYXRvciBjb21tYW5kIGZvciBjbG9zaW5nIGFuZCBjbGVhbmluZyB1cCBhbiBhY3Rpdml0eS5cbiAgICAvLyBUaGlzIG9uZSBpcyBhIGJpdCBkaWZmZXJlbnQsIGluIHRoYXQgd2UgY29uc2lkZXIgaXQgZW5hYmxlZFxuICAgIC8vIGV2ZW4gaWYgaXQgY2Fubm90IGZpbmQgYSBkZWxlZ2F0ZSBmb3IgdGhlIGFjdGl2aXR5LlxuICAgIC8vIEluIHRoYXQgY2FzZSwgd2UgaW5zdGVhZCBjYWxsIHRoZSBhcHBsaWNhdGlvbiBgY2xvc2VgIGNvbW1hbmQuXG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmNsb3NlQW5kQ2xlYW51cCwge1xuICAgICAgICBsYWJlbDogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbG9jYWxpemVkTGFiZWwgPSBQcml2YXRlLmRlbGVnYXRlTGFiZWwoYXBwLCBtZW51LmNsb3NlQW5kQ2xlYW5lcnMsICdjbG9zZUFuZENsZWFudXBMYWJlbCcpO1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsaXplZExhYmVsID8gbG9jYWxpemVkTGFiZWwgOiB0cmFucy5fXygnQ2xvc2UgYW5kIFNodXRkb3duJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZDogKCkgPT4gISFhcHAuc2hlbGwuY3VycmVudFdpZGdldCAmJiAhIWFwcC5zaGVsbC5jdXJyZW50V2lkZ2V0LnRpdGxlLmNsb3NhYmxlLFxuICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGEgcmVnaXN0ZXJlZCBkZWxlZ2F0ZS4gSWYgc28sIGNhbGwgdGhhdC5cbiAgICAgICAgICAgIGlmIChQcml2YXRlLmRlbGVnYXRlRW5hYmxlZChhcHAsIG1lbnUuY2xvc2VBbmRDbGVhbmVycywgJ2Nsb3NlQW5kQ2xlYW51cCcpKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJpdmF0ZS5kZWxlZ2F0ZUV4ZWN1dGUoYXBwLCBtZW51LmNsb3NlQW5kQ2xlYW5lcnMsICdjbG9zZUFuZENsZWFudXAnKSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBubyBkZWxlZ2F0ZSwgY2FsbCB0aGUgdG9wLWxldmVsIGFwcGxpY2F0aW9uIGNsb3NlLlxuICAgICAgICAgICAgcmV0dXJuIGFwcC5jb21tYW5kcy5leGVjdXRlKCdhcHBsaWNhdGlvbjpjbG9zZScpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gQWRkIGEgZGVsZWdhdG9yIGNvbW1hbmQgZm9yIGNyZWF0aW5nIGEgY29uc29sZSBmb3IgYW4gYWN0aXZpdHkuXG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmNyZWF0ZUNvbnNvbGUsIHtcbiAgICAgICAgbGFiZWw6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsaXplZExhYmVsID0gUHJpdmF0ZS5kZWxlZ2F0ZUxhYmVsKGFwcCwgbWVudS5jb25zb2xlQ3JlYXRvcnMsICdjcmVhdGVDb25zb2xlTGFiZWwnKTtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGl6ZWRMYWJlbFxuICAgICAgICAgICAgICAgID8gbG9jYWxpemVkTGFiZWxcbiAgICAgICAgICAgICAgICA6IHRyYW5zLl9fKCdOZXcgQ29uc29sZSBmb3IgQWN0aXZpdHknKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkOiBQcml2YXRlLmRlbGVnYXRlRW5hYmxlZChhcHAsIG1lbnUuY29uc29sZUNyZWF0b3JzLCAnY3JlYXRlQ29uc29sZScpLFxuICAgICAgICBleGVjdXRlOiBQcml2YXRlLmRlbGVnYXRlRXhlY3V0ZShhcHAsIG1lbnUuY29uc29sZUNyZWF0b3JzLCAnY3JlYXRlQ29uc29sZScpXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnNodXRkb3duLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnU2h1dCBEb3duJyksXG4gICAgICAgIGNhcHRpb246IHRyYW5zLl9fKCdTaHV0IGRvd24gSnVweXRlckxhYicpLFxuICAgICAgICBpc1Zpc2libGU6ICgpID0+IG1lbnUucXVpdEVudHJ5LFxuICAgICAgICBpc0VuYWJsZWQ6ICgpID0+IG1lbnUucXVpdEVudHJ5LFxuICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdTaHV0ZG93biBjb25maXJtYXRpb24nKSxcbiAgICAgICAgICAgICAgICBib2R5OiB0cmFucy5fXygnUGxlYXNlIGNvbmZpcm0geW91IHdhbnQgdG8gc2h1dCBkb3duIEp1cHl0ZXJMYWIuJyksXG4gICAgICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgICAgICBEaWFsb2cuY2FuY2VsQnV0dG9uKCksXG4gICAgICAgICAgICAgICAgICAgIERpYWxvZy53YXJuQnV0dG9uKHsgbGFiZWw6IHRyYW5zLl9fKCdTaHV0IERvd24nKSB9KVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pLnRoZW4oYXN5bmMgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuYnV0dG9uLmFjY2VwdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXR0aW5nID0gU2VydmVyQ29ubmVjdGlvbi5tYWtlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXBpVVJMID0gVVJMRXh0LmpvaW4oc2V0dGluZy5iYXNlVXJsLCAnYXBpL3NodXRkb3duJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNodXRkb3duIGFsbCBrZXJuZWwgYW5kIHRlcm1pbmFsIHNlc3Npb25zIGJlZm9yZSBzaHV0dGluZyBkb3duIHRoZSBzZXJ2ZXJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhpcyBmYWlscywgd2UgY29udGludWUgZXhlY3V0aW9uIHNvIHdlIGNhbiBwb3N0IGFuIGFwaS9zaHV0ZG93biByZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwLnNlcnZpY2VNYW5hZ2VyLnNlc3Npb25zLnNodXRkb3duQWxsKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwLnNlcnZpY2VNYW5hZ2VyLnRlcm1pbmFscy5zaHV0ZG93bkFsbCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG8gbm90aGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEZhaWxlZCB0byBzaHV0ZG93biBzZXNzaW9ucyBhbmQgdGVybWluYWxzOiAke2V9YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFNlcnZlckNvbm5lY3Rpb24ubWFrZVJlcXVlc3QoYXBpVVJMLCB7IG1ldGhvZDogJ1BPU1QnIH0sIHNldHRpbmcpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5vaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENsb3NlIHRoaXMgd2luZG93IGlmIHRoZSBzaHV0ZG93biByZXF1ZXN0IGhhcyBiZWVuIHN1Y2Nlc3NmdWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcDEudGV4dENvbnRlbnQgPSB0cmFucy5fXygnWW91IGhhdmUgc2h1dCBkb3duIHRoZSBKdXB5dGVyIHNlcnZlci4gWW91IGNhbiBub3cgY2xvc2UgdGhpcyB0YWIuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcDIudGV4dENvbnRlbnQgPSB0cmFucy5fXygnVG8gdXNlIEp1cHl0ZXJMYWIgYWdhaW4sIHlvdSB3aWxsIG5lZWQgdG8gcmVsYXVuY2ggaXQuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZChwMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZChwMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCBzaG93RGlhbG9nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdTZXJ2ZXIgc3RvcHBlZCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBuZXcgV2lkZ2V0KHsgbm9kZTogYm9keSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTZXJ2ZXJDb25uZWN0aW9uLlJlc3BvbnNlRXJyb3IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTZXJ2ZXJDb25uZWN0aW9uLk5ldHdvcmtFcnJvcihkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMubG9nb3V0LCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnTG9nIE91dCcpLFxuICAgICAgICBjYXB0aW9uOiB0cmFucy5fXygnTG9nIG91dCBvZiBKdXB5dGVyTGFiJyksXG4gICAgICAgIGlzVmlzaWJsZTogKCkgPT4gbWVudS5xdWl0RW50cnksXG4gICAgICAgIGlzRW5hYmxlZDogKCkgPT4gbWVudS5xdWl0RW50cnksXG4gICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgIHJvdXRlci5uYXZpZ2F0ZSgnL2xvZ291dCcsIHsgaGFyZDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBDcmVhdGUgdGhlIGJhc2ljIGBLZXJuZWxgIG1lbnUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVLZXJuZWxNZW51KGFwcCwgbWVudSwgdHJhbnMpIHtcbiAgICBjb25zdCBjb21tYW5kcyA9IGFwcC5jb21tYW5kcztcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuaW50ZXJydXB0S2VybmVsLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnSW50ZXJydXB0IEtlcm5lbCcpLFxuICAgICAgICBjYXB0aW9uOiB0cmFucy5fXygnSW50ZXJydXB0IHRoZSBrZXJuZWwnKSxcbiAgICAgICAgaWNvbjogYXJncyA9PiAoYXJncy50b29sYmFyID8gc3RvcEljb24gOiB1bmRlZmluZWQpLFxuICAgICAgICBpc0VuYWJsZWQ6IFByaXZhdGUuZGVsZWdhdGVFbmFibGVkKGFwcCwgbWVudS5rZXJuZWxVc2VycywgJ2ludGVycnVwdEtlcm5lbCcpLFxuICAgICAgICBleGVjdXRlOiBQcml2YXRlLmRlbGVnYXRlRXhlY3V0ZShhcHAsIG1lbnUua2VybmVsVXNlcnMsICdpbnRlcnJ1cHRLZXJuZWwnKVxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5yZWNvbm5lY3RUb0tlcm5lbCwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1JlY29ubmVjdCB0byBLZXJuZWwnKSxcbiAgICAgICAgaXNFbmFibGVkOiBQcml2YXRlLmRlbGVnYXRlRW5hYmxlZChhcHAsIG1lbnUua2VybmVsVXNlcnMsICdyZWNvbm5lY3RUb0tlcm5lbCcpLFxuICAgICAgICBleGVjdXRlOiBQcml2YXRlLmRlbGVnYXRlRXhlY3V0ZShhcHAsIG1lbnUua2VybmVsVXNlcnMsICdyZWNvbm5lY3RUb0tlcm5lbCcpXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnJlc3RhcnRLZXJuZWwsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdSZXN0YXJ0IEtlcm5lbOKApicpLFxuICAgICAgICBjYXB0aW9uOiB0cmFucy5fXygnUmVzdGFydCB0aGUga2VybmVsJyksXG4gICAgICAgIGljb246IGFyZ3MgPT4gKGFyZ3MudG9vbGJhciA/IHJlZnJlc2hJY29uIDogdW5kZWZpbmVkKSxcbiAgICAgICAgaXNFbmFibGVkOiBQcml2YXRlLmRlbGVnYXRlRW5hYmxlZChhcHAsIG1lbnUua2VybmVsVXNlcnMsICdyZXN0YXJ0S2VybmVsJyksXG4gICAgICAgIGV4ZWN1dGU6IFByaXZhdGUuZGVsZWdhdGVFeGVjdXRlKGFwcCwgbWVudS5rZXJuZWxVc2VycywgJ3Jlc3RhcnRLZXJuZWwnKVxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5yZXN0YXJ0S2VybmVsQW5kQ2xlYXIsIHtcbiAgICAgICAgbGFiZWw6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVuYWJsZWQgPSBQcml2YXRlLmRlbGVnYXRlRW5hYmxlZChhcHAsIG1lbnUua2VybmVsVXNlcnMsICdyZXN0YXJ0S2VybmVsQW5kQ2xlYXInKSgpO1xuICAgICAgICAgICAgbGV0IGxvY2FsaXplZExhYmVsID0gdHJhbnMuX18oJ1Jlc3RhcnQgS2VybmVsIGFuZCBDbGVhcuKApicpO1xuICAgICAgICAgICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBsb2NhbGl6ZWRMYWJlbCA9IFByaXZhdGUuZGVsZWdhdGVMYWJlbChhcHAsIG1lbnUua2VybmVsVXNlcnMsICdyZXN0YXJ0S2VybmVsQW5kQ2xlYXJMYWJlbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxvY2FsaXplZExhYmVsO1xuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWQ6IFByaXZhdGUuZGVsZWdhdGVFbmFibGVkKGFwcCwgbWVudS5rZXJuZWxVc2VycywgJ3Jlc3RhcnRLZXJuZWxBbmRDbGVhcicpLFxuICAgICAgICBleGVjdXRlOiBQcml2YXRlLmRlbGVnYXRlRXhlY3V0ZShhcHAsIG1lbnUua2VybmVsVXNlcnMsICdyZXN0YXJ0S2VybmVsQW5kQ2xlYXInKVxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jaGFuZ2VLZXJuZWwsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdDaGFuZ2UgS2VybmVs4oCmJyksXG4gICAgICAgIGlzRW5hYmxlZDogUHJpdmF0ZS5kZWxlZ2F0ZUVuYWJsZWQoYXBwLCBtZW51Lmtlcm5lbFVzZXJzLCAnY2hhbmdlS2VybmVsJyksXG4gICAgICAgIGV4ZWN1dGU6IFByaXZhdGUuZGVsZWdhdGVFeGVjdXRlKGFwcCwgbWVudS5rZXJuZWxVc2VycywgJ2NoYW5nZUtlcm5lbCcpXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnNodXRkb3duS2VybmVsLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnU2h1dCBEb3duIEtlcm5lbCcpLFxuICAgICAgICBpc0VuYWJsZWQ6IFByaXZhdGUuZGVsZWdhdGVFbmFibGVkKGFwcCwgbWVudS5rZXJuZWxVc2VycywgJ3NodXRkb3duS2VybmVsJyksXG4gICAgICAgIGV4ZWN1dGU6IFByaXZhdGUuZGVsZWdhdGVFeGVjdXRlKGFwcCwgbWVudS5rZXJuZWxVc2VycywgJ3NodXRkb3duS2VybmVsJylcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuc2h1dGRvd25BbGxLZXJuZWxzLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnU2h1dCBEb3duIEFsbCBLZXJuZWxz4oCmJyksXG4gICAgICAgIGlzRW5hYmxlZDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGFwcC5zZXJ2aWNlTWFuYWdlci5zZXNzaW9ucy5ydW5uaW5nKCkubmV4dCgpICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzaG93RGlhbG9nKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogdHJhbnMuX18oJ1NodXQgRG93biBBbGw/JyksXG4gICAgICAgICAgICAgICAgYm9keTogdHJhbnMuX18oJ1NodXQgZG93biBhbGwga2VybmVscz8nKSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgIERpYWxvZy5jYW5jZWxCdXR0b24oeyBsYWJlbDogdHJhbnMuX18oJ0Rpc21pc3MnKSB9KSxcbiAgICAgICAgICAgICAgICAgICAgRGlhbG9nLndhcm5CdXR0b24oeyBsYWJlbDogdHJhbnMuX18oJ1NodXQgRG93biBBbGwnKSB9KVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmJ1dHRvbi5hY2NlcHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFwcC5zZXJ2aWNlTWFuYWdlci5zZXNzaW9ucy5zaHV0ZG93bkFsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSB0aGUgYmFzaWMgYFZpZXdgIG1lbnUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWaWV3TWVudShhcHAsIG1lbnUsIHRyYW5zKSB7XG4gICAgY29uc3QgY29tbWFuZHMgPSBhcHAuY29tbWFuZHM7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmxpbmVOdW1iZXJpbmcsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdTaG93IExpbmUgTnVtYmVycycpLFxuICAgICAgICBpc0VuYWJsZWQ6IFByaXZhdGUuZGVsZWdhdGVFbmFibGVkKGFwcCwgbWVudS5lZGl0b3JWaWV3ZXJzLCAndG9nZ2xlTGluZU51bWJlcnMnKSxcbiAgICAgICAgaXNUb2dnbGVkOiBQcml2YXRlLmRlbGVnYXRlVG9nZ2xlZChhcHAsIG1lbnUuZWRpdG9yVmlld2VycywgJ2xpbmVOdW1iZXJzVG9nZ2xlZCcpLFxuICAgICAgICBleGVjdXRlOiBQcml2YXRlLmRlbGVnYXRlRXhlY3V0ZShhcHAsIG1lbnUuZWRpdG9yVmlld2VycywgJ3RvZ2dsZUxpbmVOdW1iZXJzJylcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMubWF0Y2hCcmFja2V0cywge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ01hdGNoIEJyYWNrZXRzJyksXG4gICAgICAgIGlzRW5hYmxlZDogUHJpdmF0ZS5kZWxlZ2F0ZUVuYWJsZWQoYXBwLCBtZW51LmVkaXRvclZpZXdlcnMsICd0b2dnbGVNYXRjaEJyYWNrZXRzJyksXG4gICAgICAgIGlzVG9nZ2xlZDogUHJpdmF0ZS5kZWxlZ2F0ZVRvZ2dsZWQoYXBwLCBtZW51LmVkaXRvclZpZXdlcnMsICdtYXRjaEJyYWNrZXRzVG9nZ2xlZCcpLFxuICAgICAgICBleGVjdXRlOiBQcml2YXRlLmRlbGVnYXRlRXhlY3V0ZShhcHAsIG1lbnUuZWRpdG9yVmlld2VycywgJ3RvZ2dsZU1hdGNoQnJhY2tldHMnKVxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy53b3JkV3JhcCwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1dyYXAgV29yZHMnKSxcbiAgICAgICAgaXNFbmFibGVkOiBQcml2YXRlLmRlbGVnYXRlRW5hYmxlZChhcHAsIG1lbnUuZWRpdG9yVmlld2VycywgJ3RvZ2dsZVdvcmRXcmFwJyksXG4gICAgICAgIGlzVG9nZ2xlZDogUHJpdmF0ZS5kZWxlZ2F0ZVRvZ2dsZWQoYXBwLCBtZW51LmVkaXRvclZpZXdlcnMsICd3b3JkV3JhcFRvZ2dsZWQnKSxcbiAgICAgICAgZXhlY3V0ZTogUHJpdmF0ZS5kZWxlZ2F0ZUV4ZWN1dGUoYXBwLCBtZW51LmVkaXRvclZpZXdlcnMsICd0b2dnbGVXb3JkV3JhcCcpXG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSB0aGUgYmFzaWMgYFJ1bmAgbWVudS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJ1bk1lbnUoYXBwLCBtZW51LCB0cmFucykge1xuICAgIGNvbnN0IGNvbW1hbmRzID0gYXBwLmNvbW1hbmRzO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5ydW4sIHtcbiAgICAgICAgbGFiZWw6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsaXplZExhYmVsID0gUHJpdmF0ZS5kZWxlZ2F0ZUxhYmVsKGFwcCwgbWVudS5jb2RlUnVubmVycywgJ3J1bkxhYmVsJyk7XG4gICAgICAgICAgICBjb25zdCBlbmFibGVkID0gUHJpdmF0ZS5kZWxlZ2F0ZUVuYWJsZWQoYXBwLCBtZW51LmNvZGVSdW5uZXJzLCAncnVuJykoKTtcbiAgICAgICAgICAgIHJldHVybiBlbmFibGVkID8gbG9jYWxpemVkTGFiZWwgOiB0cmFucy5fXygnUnVuIFNlbGVjdGVkJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGNhcHRpb246ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsaXplZENhcHRpb24gPSBQcml2YXRlLmRlbGVnYXRlTGFiZWwoYXBwLCBtZW51LmNvZGVSdW5uZXJzLCAncnVuQ2FwdGlvbicpO1xuICAgICAgICAgICAgY29uc3QgZW5hYmxlZCA9IFByaXZhdGUuZGVsZWdhdGVFbmFibGVkKGFwcCwgbWVudS5jb2RlUnVubmVycywgJ3J1bicpKCk7XG4gICAgICAgICAgICByZXR1cm4gZW5hYmxlZCA/IGxvY2FsaXplZENhcHRpb24gOiB0cmFucy5fXygnUnVuIFNlbGVjdGVkJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGljb246IGFyZ3MgPT4gKGFyZ3MudG9vbGJhciA/IHJ1bkljb24gOiB1bmRlZmluZWQpLFxuICAgICAgICBpc0VuYWJsZWQ6IFByaXZhdGUuZGVsZWdhdGVFbmFibGVkKGFwcCwgbWVudS5jb2RlUnVubmVycywgJ3J1bicpLFxuICAgICAgICBleGVjdXRlOiBQcml2YXRlLmRlbGVnYXRlRXhlY3V0ZShhcHAsIG1lbnUuY29kZVJ1bm5lcnMsICdydW4nKVxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5ydW5BbGwsIHtcbiAgICAgICAgbGFiZWw6ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBsb2NhbGl6ZWRMYWJlbCA9IHRyYW5zLl9fKCdSdW4gQWxsJyk7XG4gICAgICAgICAgICBjb25zdCBlbmFibGVkID0gUHJpdmF0ZS5kZWxlZ2F0ZUVuYWJsZWQoYXBwLCBtZW51LmNvZGVSdW5uZXJzLCAncnVuQWxsJykoKTtcbiAgICAgICAgICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxpemVkTGFiZWwgPSBQcml2YXRlLmRlbGVnYXRlTGFiZWwoYXBwLCBtZW51LmNvZGVSdW5uZXJzLCAncnVuQWxsTGFiZWwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsb2NhbGl6ZWRMYWJlbDtcbiAgICAgICAgfSxcbiAgICAgICAgY2FwdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGxvY2FsaXplZENhcHRpb24gPSB0cmFucy5fXygnUnVuIEFsbCcpO1xuICAgICAgICAgICAgY29uc3QgZW5hYmxlZCA9IFByaXZhdGUuZGVsZWdhdGVFbmFibGVkKGFwcCwgbWVudS5jb2RlUnVubmVycywgJ3J1bkFsbCcpKCk7XG4gICAgICAgICAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIGxvY2FsaXplZENhcHRpb24gPSBQcml2YXRlLmRlbGVnYXRlTGFiZWwoYXBwLCBtZW51LmNvZGVSdW5uZXJzLCAncnVuQWxsQ2FwdGlvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxvY2FsaXplZENhcHRpb247XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZDogUHJpdmF0ZS5kZWxlZ2F0ZUVuYWJsZWQoYXBwLCBtZW51LmNvZGVSdW5uZXJzLCAncnVuQWxsJyksXG4gICAgICAgIGV4ZWN1dGU6IFByaXZhdGUuZGVsZWdhdGVFeGVjdXRlKGFwcCwgbWVudS5jb2RlUnVubmVycywgJ3J1bkFsbCcpXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnJlc3RhcnRBbmRSdW5BbGwsIHtcbiAgICAgICAgbGFiZWw6ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBsb2NhbGl6ZWRMYWJlbCA9IHRyYW5zLl9fKCdSZXN0YXJ0IEtlcm5lbCBhbmQgUnVuIEFsbCcpO1xuICAgICAgICAgICAgY29uc3QgZW5hYmxlZCA9IFByaXZhdGUuZGVsZWdhdGVFbmFibGVkKGFwcCwgbWVudS5jb2RlUnVubmVycywgJ3Jlc3RhcnRBbmRSdW5BbGwnKSgpO1xuICAgICAgICAgICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBsb2NhbGl6ZWRMYWJlbCA9IFByaXZhdGUuZGVsZWdhdGVMYWJlbChhcHAsIG1lbnUuY29kZVJ1bm5lcnMsICdyZXN0YXJ0QW5kUnVuQWxsTGFiZWwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsb2NhbGl6ZWRMYWJlbDtcbiAgICAgICAgfSxcbiAgICAgICAgY2FwdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGxvY2FsaXplZENhcHRpb24gPSB0cmFucy5fXygnUmVzdGFydCBLZXJuZWwgYW5kIFJ1biBBbGwnKTtcbiAgICAgICAgICAgIGNvbnN0IGVuYWJsZWQgPSBQcml2YXRlLmRlbGVnYXRlRW5hYmxlZChhcHAsIG1lbnUuY29kZVJ1bm5lcnMsICdyZXN0YXJ0QW5kUnVuQWxsJykoKTtcbiAgICAgICAgICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxpemVkQ2FwdGlvbiA9IFByaXZhdGUuZGVsZWdhdGVMYWJlbChhcHAsIG1lbnUuY29kZVJ1bm5lcnMsICdyZXN0YXJ0QW5kUnVuQWxsTGFiZWwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsb2NhbGl6ZWRDYXB0aW9uO1xuICAgICAgICB9LFxuICAgICAgICBpY29uOiBhcmdzID0+IChhcmdzLnRvb2xiYXIgPyBmYXN0Rm9yd2FyZEljb24gOiB1bmRlZmluZWQpLFxuICAgICAgICBpc0VuYWJsZWQ6IFByaXZhdGUuZGVsZWdhdGVFbmFibGVkKGFwcCwgbWVudS5jb2RlUnVubmVycywgJ3Jlc3RhcnRBbmRSdW5BbGwnKSxcbiAgICAgICAgZXhlY3V0ZTogUHJpdmF0ZS5kZWxlZ2F0ZUV4ZWN1dGUoYXBwLCBtZW51LmNvZGVSdW5uZXJzLCAncmVzdGFydEFuZFJ1bkFsbCcpXG4gICAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSB0aGUgYmFzaWMgYFRhYnNgIG1lbnUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUYWJzTWVudShhcHAsIG1lbnUsIGxhYlNoZWxsLCB0cmFucykge1xuICAgIGNvbnN0IGNvbW1hbmRzID0gYXBwLmNvbW1hbmRzO1xuICAgIC8vIEEgbGlzdCBvZiB0aGUgYWN0aXZlIHRhYnMgaW4gdGhlIG1haW4gYXJlYS5cbiAgICBjb25zdCB0YWJHcm91cCA9IFtdO1xuICAgIC8vIEEgZGlzcG9zYWJsZSBmb3IgZ2V0dGluZyByaWQgb2YgdGhlIG91dC1vZi1kYXRlIHRhYnMgbGlzdC5cbiAgICBsZXQgZGlzcG9zYWJsZTtcbiAgICAvLyBDb21tYW5kIHRvIGFjdGl2YXRlIGEgd2lkZ2V0IGJ5IGlkLlxuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5hY3RpdmF0ZUJ5SWQsIHtcbiAgICAgICAgbGFiZWw6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgaWQgPSBhcmdzWydpZCddIHx8ICcnO1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZmluZChhcHAuc2hlbGwud2lkZ2V0cygnbWFpbicpLCB3ID0+IHcuaWQgPT09IGlkKTtcbiAgICAgICAgICAgIHJldHVybiAod2lkZ2V0ICYmIHdpZGdldC50aXRsZS5sYWJlbCkgfHwgJyc7XG4gICAgICAgIH0sXG4gICAgICAgIGlzVG9nZ2xlZDogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGFyZ3NbJ2lkJ10gfHwgJyc7XG4gICAgICAgICAgICByZXR1cm4gISFhcHAuc2hlbGwuY3VycmVudFdpZGdldCAmJiBhcHAuc2hlbGwuY3VycmVudFdpZGdldC5pZCA9PT0gaWQ7XG4gICAgICAgIH0sXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4gYXBwLnNoZWxsLmFjdGl2YXRlQnlJZChhcmdzWydpZCddIHx8ICcnKVxuICAgIH0pO1xuICAgIGxldCBwcmV2aW91c0lkID0gJyc7XG4gICAgLy8gQ29tbWFuZCB0byB0b2dnbGUgYmV0d2VlbiB0aGUgY3VycmVudFxuICAgIC8vIHRhYiBhbmQgdGhlIGxhc3QgbW9kaWZpZWQgdGFiLlxuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5hY3RpdmF0ZVByZXZpb3VzbHlVc2VkVGFiLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnQWN0aXZhdGUgUHJldmlvdXNseSBVc2VkIFRhYicpLFxuICAgICAgICBpc0VuYWJsZWQ6ICgpID0+ICEhcHJldmlvdXNJZCxcbiAgICAgICAgZXhlY3V0ZTogKCkgPT4gY29tbWFuZHMuZXhlY3V0ZShDb21tYW5kSURzLmFjdGl2YXRlQnlJZCwgeyBpZDogcHJldmlvdXNJZCB9KVxuICAgIH0pO1xuICAgIGlmIChsYWJTaGVsbCkge1xuICAgICAgICB2b2lkIGFwcC5yZXN0b3JlZC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUgY3VycmVudCB3aWRnZXRzIGluIHRoZVxuICAgICAgICAgICAgLy8gbWFpbiBhcmVhLCBhbmQgYWRkIHRoZW0gdG8gdGhlIHRhYiBncm91cFxuICAgICAgICAgICAgLy8gb2YgdGhlIG1lbnUuXG4gICAgICAgICAgICBjb25zdCBwb3B1bGF0ZVRhYnMgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBwcmV2aW91cyB0YWIgbGlzdFxuICAgICAgICAgICAgICAgIGlmIChkaXNwb3NhYmxlICYmICFkaXNwb3NhYmxlLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcG9zYWJsZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRhYkdyb3VwLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IGlzUHJldmlvdXNseVVzZWRUYWJBdHRhY2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGVhY2goYXBwLnNoZWxsLndpZGdldHMoJ21haW4nKSwgd2lkZ2V0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpZGdldC5pZCA9PT0gcHJldmlvdXNJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNQcmV2aW91c2x5VXNlZFRhYkF0dGFjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0YWJHcm91cC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMuYWN0aXZhdGVCeUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogeyBpZDogd2lkZ2V0LmlkIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZGlzcG9zYWJsZSA9IG1lbnUuYWRkR3JvdXAodGFiR3JvdXAsIDEpO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzSWQgPSBpc1ByZXZpb3VzbHlVc2VkVGFiQXR0YWNoZWQgPyBwcmV2aW91c0lkIDogJyc7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcG9wdWxhdGVUYWJzKCk7XG4gICAgICAgICAgICBsYWJTaGVsbC5sYXlvdXRNb2RpZmllZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZVRhYnMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBJRCBvZiB0aGUgcHJldmlvdXMgYWN0aXZlIHRhYiBpZiBhIG5ldyB0YWIgaXMgc2VsZWN0ZWQuXG4gICAgICAgICAgICBsYWJTaGVsbC5jdXJyZW50Q2hhbmdlZC5jb25uZWN0KChfLCBhcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gYXJncy5vbGRWYWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAoIXdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByZXZpb3VzSWQgPSB3aWRnZXQuaWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgcGx1Z2luO1xuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgUHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgZmlyc3QgdmFsdWUgb2YgdGhlIGl0ZXJhYmxlIHRoYXQgc2F0aXNmaWVzIHRoZSBwcmVkaWNhdGVcbiAgICAgKiBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaW5kKGl0LCBwcmVkaWNhdGUpIHtcbiAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiBpdCkge1xuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSB1dGlsaXR5IGZ1bmN0aW9uIHRoYXQgZGVsZWdhdGVzIGEgcG9ydGlvbiBvZiBhIGxhYmVsIHRvIGFuIElNZW51RXh0ZW5kZXIuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZGVsZWdhdGVMYWJlbChhcHAsIHMsIGxhYmVsKSB7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IGFwcC5zaGVsbC5jdXJyZW50V2lkZ2V0O1xuICAgICAgICBjb25zdCBleHRlbmRlciA9IHdpZGdldFxuICAgICAgICAgICAgPyBmaW5kKHMsIHZhbHVlID0+IHZhbHVlLnRyYWNrZXIuaGFzKHdpZGdldCkpXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCFleHRlbmRlciB8fCAhZXh0ZW5kZXJbbGFiZWxdKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IGV4dGVuZGVyLnRyYWNrZXIuc2l6ZTtcbiAgICAgICAgICAgIC8vIENvZXJjZSB0aGUgcmVzdWx0IHRvIGJlIGEgc3RyaW5nLiBXaGVuIFR5cGVkb2MgaXMgdXBkYXRlZCB0byB1c2VcbiAgICAgICAgICAgIC8vIFR5cGVzY3JpcHQgMi44LCB3ZSBjYW4gcG9zc2libHkgdXNlIGNvbmRpdGlvbmFsIHR5cGVzIHRvIGdldCBUeXBlc2NyaXB0XG4gICAgICAgICAgICAvLyB0byByZWNvZ25pemUgdGhpcyBpcyBhIHN0cmluZy5cbiAgICAgICAgICAgIHJldHVybiBleHRlbmRlcltsYWJlbF0oY291bnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFByaXZhdGUuZGVsZWdhdGVMYWJlbCA9IGRlbGVnYXRlTGFiZWw7XG4gICAgLyoqXG4gICAgICogQSB1dGlsaXR5IGZ1bmN0aW9uIHRoYXQgZGVsZWdhdGVzIGNvbW1hbmQgZXhlY3V0aW9uXG4gICAgICogdG8gYW4gSU1lbnVFeHRlbmRlci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkZWxlZ2F0ZUV4ZWN1dGUoYXBwLCBzLCBleGVjdXRvcikge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gYXBwLnNoZWxsLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICBjb25zdCBleHRlbmRlciA9IHdpZGdldFxuICAgICAgICAgICAgICAgID8gZmluZChzLCB2YWx1ZSA9PiB2YWx1ZS50cmFja2VyLmhhcyh3aWRnZXQpKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKCFleHRlbmRlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENvZXJjZSB0aGUgcmVzdWx0IHRvIGJlIGEgZnVuY3Rpb24uIFdoZW4gVHlwZWRvYyBpcyB1cGRhdGVkIHRvIHVzZVxuICAgICAgICAgICAgLy8gVHlwZXNjcmlwdCAyLjgsIHdlIGNhbiBwb3NzaWJseSB1c2UgY29uZGl0aW9uYWwgdHlwZXMgdG8gZ2V0IFR5cGVzY3JpcHRcbiAgICAgICAgICAgIC8vIHRvIHJlY29nbml6ZSB0aGlzIGlzIGEgZnVuY3Rpb24uXG4gICAgICAgICAgICBjb25zdCBmID0gZXh0ZW5kZXJbZXhlY3V0b3JdO1xuICAgICAgICAgICAgcmV0dXJuIGYod2lkZ2V0KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUHJpdmF0ZS5kZWxlZ2F0ZUV4ZWN1dGUgPSBkZWxlZ2F0ZUV4ZWN1dGU7XG4gICAgLyoqXG4gICAgICogQSB1dGlsaXR5IGZ1bmN0aW9uIHRoYXQgZGVsZWdhdGVzIHdoZXRoZXIgYSBjb21tYW5kIGlzIGVuYWJsZWRcbiAgICAgKiB0byBhbiBJTWVudUV4dGVuZGVyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRlbGVnYXRlRW5hYmxlZChhcHAsIHMsIGV4ZWN1dG9yKSB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXQgPSBhcHAuc2hlbGwuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgIGNvbnN0IGV4dGVuZGVyID0gd2lkZ2V0XG4gICAgICAgICAgICAgICAgPyBmaW5kKHMsIHZhbHVlID0+IHZhbHVlLnRyYWNrZXIuaGFzKHdpZGdldCkpXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm4gKCEhZXh0ZW5kZXIgJiZcbiAgICAgICAgICAgICAgICAhIWV4dGVuZGVyW2V4ZWN1dG9yXSAmJlxuICAgICAgICAgICAgICAgIChleHRlbmRlci5pc0VuYWJsZWQgJiYgd2lkZ2V0ID8gZXh0ZW5kZXIuaXNFbmFibGVkKHdpZGdldCkgOiB0cnVlKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFByaXZhdGUuZGVsZWdhdGVFbmFibGVkID0gZGVsZWdhdGVFbmFibGVkO1xuICAgIC8qKlxuICAgICAqIEEgdXRpbGl0eSBmdW5jdGlvbiB0aGF0IGRlbGVnYXRlcyB3aGV0aGVyIGEgY29tbWFuZCBpcyB0b2dnbGVkXG4gICAgICogZm9yIGFuIElNZW51RXh0ZW5kZXIuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZGVsZWdhdGVUb2dnbGVkKGFwcCwgcywgdG9nZ2xlZCkge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gYXBwLnNoZWxsLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICBjb25zdCBleHRlbmRlciA9IHdpZGdldFxuICAgICAgICAgICAgICAgID8gZmluZChzLCB2YWx1ZSA9PiB2YWx1ZS50cmFja2VyLmhhcyh3aWRnZXQpKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgLy8gQ29lcmNlIGV4dGVuZGVyW3RvZ2dsZWRdIHRvIGJlIGEgZnVuY3Rpb24uIFdoZW4gVHlwZWRvYyBpcyB1cGRhdGVkIHRvIHVzZVxuICAgICAgICAgICAgLy8gVHlwZXNjcmlwdCAyLjgsIHdlIGNhbiBwb3NzaWJseSB1c2UgY29uZGl0aW9uYWwgdHlwZXMgdG8gZ2V0IFR5cGVzY3JpcHRcbiAgICAgICAgICAgIC8vIHRvIHJlY29nbml6ZSB0aGlzIGlzIGEgZnVuY3Rpb24uXG4gICAgICAgICAgICByZXR1cm4gKCEhZXh0ZW5kZXIgJiZcbiAgICAgICAgICAgICAgICAhIWV4dGVuZGVyW3RvZ2dsZWRdICYmXG4gICAgICAgICAgICAgICAgISF3aWRnZXQgJiZcbiAgICAgICAgICAgICAgICAhIWV4dGVuZGVyW3RvZ2dsZWRdKHdpZGdldCkpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBQcml2YXRlLmRlbGVnYXRlVG9nZ2xlZCA9IGRlbGVnYXRlVG9nZ2xlZDtcbiAgICBhc3luYyBmdW5jdGlvbiBkaXNwbGF5SW5mb3JtYXRpb24odHJhbnMpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICB0aXRsZTogdHJhbnMuX18oJ0luZm9ybWF0aW9uJyksXG4gICAgICAgICAgICBib2R5OiB0cmFucy5fXygnTWVudSBjdXN0b21pemF0aW9uIGhhcyBjaGFuZ2VkLiBZb3Ugd2lsbCBuZWVkIHRvIHJlbG9hZCBKdXB5dGVyTGFiIHRvIHNlZSB0aGUgY2hhbmdlcy4nKSxcbiAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICBEaWFsb2cuY2FuY2VsQnV0dG9uKCksXG4gICAgICAgICAgICAgICAgRGlhbG9nLm9rQnV0dG9uKHsgbGFiZWw6IHRyYW5zLl9fKCdSZWxvYWQnKSB9KVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHJlc3VsdC5idXR0b24uYWNjZXB0KSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBmdW5jdGlvbiBsb2FkU2V0dGluZ3NNZW51KHJlZ2lzdHJ5LCBhZGRNZW51LCBtZW51RmFjdG9yeSwgdHJhbnNsYXRvcikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGxldCBjYW5vbmljYWw7XG4gICAgICAgIGxldCBsb2FkZWQgPSB7fTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBvcHVsYXRlIHRoZSBwbHVnaW4ncyBzY2hlbWEgZGVmYXVsdHMuXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBwb3B1bGF0ZShzY2hlbWEpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICBsb2FkZWQgPSB7fTtcbiAgICAgICAgICAgIGNvbnN0IHBsdWdpbkRlZmF1bHRzID0gT2JqZWN0LmtleXMocmVnaXN0cnkucGx1Z2lucylcbiAgICAgICAgICAgICAgICAubWFwKHBsdWdpbiA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICBjb25zdCBtZW51cyA9IChfYiA9IChfYSA9IHJlZ2lzdHJ5LnBsdWdpbnNbcGx1Z2luXS5zY2hlbWFbJ2p1cHl0ZXIubGFiLm1lbnVzJ10pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYWluKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBbXTtcbiAgICAgICAgICAgICAgICBsb2FkZWRbcGx1Z2luXSA9IG1lbnVzO1xuICAgICAgICAgICAgICAgIHJldHVybiBtZW51cztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNvbmNhdChbKF9iID0gKF9hID0gc2NoZW1hWydqdXB5dGVyLmxhYi5tZW51cyddKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWFpbikgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogW11dKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2VSaWdodCgoYWNjLCB2YWwpID0+IFNldHRpbmdSZWdpc3RyeS5yZWNvbmNpbGVNZW51cyhhY2MsIHZhbCwgdHJ1ZSksIHNjaGVtYS5wcm9wZXJ0aWVzLm1lbnVzLmRlZmF1bHQpO1xuICAgICAgICAgICAgLy8gQXBwbHkgZGVmYXVsdCB2YWx1ZSBhcyBsYXN0IHN0ZXAgdG8gdGFrZSBpbnRvIGFjY291bnQgb3ZlcnJpZGVzLmpzb25cbiAgICAgICAgICAgIC8vIFRoZSBzdGFuZGFyZCBkZWZhdWx0IGJlaW5nIFtdIGFzIHRoZSBwbHVnaW4gbXVzdCB1c2UgYGp1cHl0ZXIubGFiLm1lbnVzLm1haW5gXG4gICAgICAgICAgICAvLyB0byBkZWZpbmUgdGhlaXIgZGVmYXVsdCB2YWx1ZS5cbiAgICAgICAgICAgIHNjaGVtYS5wcm9wZXJ0aWVzLm1lbnVzLmRlZmF1bHQgPSBTZXR0aW5nUmVnaXN0cnkucmVjb25jaWxlTWVudXMocGx1Z2luRGVmYXVsdHMsIHNjaGVtYS5wcm9wZXJ0aWVzLm1lbnVzLmRlZmF1bHQsIHRydWUpXG4gICAgICAgICAgICAgICAgLy8gZmxhdHRlbiBvbmUgbGV2ZWxcbiAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4geyB2YXIgX2EsIF9iOyByZXR1cm4gKChfYSA9IGEucmFuaykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogSW5maW5pdHkpIC0gKChfYiA9IGIucmFuaykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogSW5maW5pdHkpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUcmFuc2Zvcm0gdGhlIHBsdWdpbiBvYmplY3QgdG8gcmV0dXJuIGRpZmZlcmVudCBzY2hlbWEgdGhhbiB0aGUgZGVmYXVsdC5cbiAgICAgICAgcmVnaXN0cnkudHJhbnNmb3JtKFBMVUdJTl9JRCwge1xuICAgICAgICAgICAgY29tcG9zZTogcGx1Z2luID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgICAgICAgICAgLy8gT25seSBvdmVycmlkZSB0aGUgY2Fub25pY2FsIHNjaGVtYSB0aGUgZmlyc3QgdGltZS5cbiAgICAgICAgICAgICAgICBpZiAoIWNhbm9uaWNhbCkge1xuICAgICAgICAgICAgICAgICAgICBjYW5vbmljYWwgPSBKU09ORXh0LmRlZXBDb3B5KHBsdWdpbi5zY2hlbWEpO1xuICAgICAgICAgICAgICAgICAgICBwb3B1bGF0ZShjYW5vbmljYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0cyA9IChfYyA9IChfYiA9IChfYSA9IGNhbm9uaWNhbC5wcm9wZXJ0aWVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWVudXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5kZWZhdWx0KSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBbXTtcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwbHVnaW4uZGF0YS51c2VyKSwgeyBtZW51czogKF9kID0gcGx1Z2luLmRhdGEudXNlci5tZW51cykgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogW10gfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tcG9zaXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwbHVnaW4uZGF0YS5jb21wb3NpdGUpLCB7IG1lbnVzOiBTZXR0aW5nUmVnaXN0cnkucmVjb25jaWxlTWVudXMoZGVmYXVsdHMsIHVzZXIubWVudXMpIH0pO1xuICAgICAgICAgICAgICAgIHBsdWdpbi5kYXRhID0geyBjb21wb3NpdGUsIHVzZXIgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZldGNoOiBwbHVnaW4gPT4ge1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgb3ZlcnJpZGUgdGhlIGNhbm9uaWNhbCBzY2hlbWEgdGhlIGZpcnN0IHRpbWUuXG4gICAgICAgICAgICAgICAgaWYgKCFjYW5vbmljYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2Fub25pY2FsID0gSlNPTkV4dC5kZWVwQ29weShwbHVnaW4uc2NoZW1hKTtcbiAgICAgICAgICAgICAgICAgICAgcG9wdWxhdGUoY2Fub25pY2FsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogcGx1Z2luLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBwbHVnaW4uaWQsXG4gICAgICAgICAgICAgICAgICAgIHJhdzogcGx1Z2luLnJhdyxcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1hOiBjYW5vbmljYWwsXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb246IHBsdWdpbi52ZXJzaW9uXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFJlcG9wdWxhdGUgdGhlIGNhbm9uaWNhbCB2YXJpYWJsZSBhZnRlciB0aGUgc2V0dGluZyByZWdpc3RyeSBoYXNcbiAgICAgICAgLy8gcHJlbG9hZGVkIGFsbCBpbml0aWFsIHBsdWdpbnMuXG4gICAgICAgIGNhbm9uaWNhbCA9IG51bGw7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgcmVnaXN0cnkubG9hZChQTFVHSU5fSUQpO1xuICAgICAgICBjb25zdCBjdXJyZW50TWVudXMgPSAoX2EgPSBKU09ORXh0LmRlZXBDb3B5KHNldHRpbmdzLmNvbXBvc2l0ZS5tZW51cykpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdO1xuICAgICAgICBjb25zdCBtZW51cyA9IG5ldyBBcnJheSgpO1xuICAgICAgICAvLyBDcmVhdGUgbWVudSBmb3Igbm9uLWRpc2FibGVkIGVsZW1lbnRcbiAgICAgICAgTWVudUZhY3RvcnkuY3JlYXRlTWVudXMoY3VycmVudE1lbnVzXG4gICAgICAgICAgICAuZmlsdGVyKG1lbnUgPT4gIW1lbnUuZGlzYWJsZWQpXG4gICAgICAgICAgICAubWFwKG1lbnUgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbWVudSksIHsgaXRlbXM6IFNldHRpbmdSZWdpc3RyeS5maWx0ZXJEaXNhYmxlZEl0ZW1zKChfYSA9IG1lbnUuaXRlbXMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdKSB9KTtcbiAgICAgICAgfSksIG1lbnVGYWN0b3J5KS5mb3JFYWNoKG1lbnUgPT4ge1xuICAgICAgICAgICAgbWVudXMucHVzaChtZW51KTtcbiAgICAgICAgICAgIGFkZE1lbnUobWVudSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXR0aW5ncy5jaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgLy8gQXMgZXh0ZW5zaW9uIG1heSBjaGFuZ2UgbWVudSB0aHJvdWdoIEFQSSwgcHJvbXB0IHRoZSB1c2VyIHRvIHJlbG9hZCBpZiB0aGVcbiAgICAgICAgICAgIC8vIG1lbnUgaGFzIGJlZW4gdXBkYXRlZC5cbiAgICAgICAgICAgIGNvbnN0IG5ld01lbnVzID0gKF9hID0gc2V0dGluZ3MuY29tcG9zaXRlLm1lbnVzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXTtcbiAgICAgICAgICAgIGlmICghSlNPTkV4dC5kZWVwRXF1YWwoY3VycmVudE1lbnVzLCBuZXdNZW51cykpIHtcbiAgICAgICAgICAgICAgICB2b2lkIGRpc3BsYXlJbmZvcm1hdGlvbih0cmFucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZWdpc3RyeS5wbHVnaW5DaGFuZ2VkLmNvbm5lY3QoYXN5bmMgKHNlbmRlciwgcGx1Z2luKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgICAgIGlmIChwbHVnaW4gIT09IFBMVUdJTl9JRCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBwbHVnaW4gY2hhbmdlZCBpdHMgbWVudS5cbiAgICAgICAgICAgICAgICBjb25zdCBvbGRNZW51cyA9IChfYSA9IGxvYWRlZFtwbHVnaW5dKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdNZW51cyA9IChfYyA9IChfYiA9IHJlZ2lzdHJ5LnBsdWdpbnNbcGx1Z2luXS5zY2hlbWFbJ2p1cHl0ZXIubGFiLm1lbnVzJ10pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5tYWluKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBbXTtcbiAgICAgICAgICAgICAgICBpZiAoIUpTT05FeHQuZGVlcEVxdWFsKG9sZE1lbnVzLCBuZXdNZW51cykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRlZFtwbHVnaW5dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgcGx1Z2luIGhhcyBjaGFuZ2VkLCByZXF1ZXN0IHRoZSB1c2VyIHRvIHJlbG9hZCB0aGUgVUkgLSB0aGlzIHNob3VsZCBub3QgaGFwcGVuXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBkaXNwbGF5SW5mb3JtYXRpb24odHJhbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHBsdWdpbiB3YXMgbm90IHlldCBsb2FkZWQgd2hlbiB0aGUgbWVudSB3YXMgYnVpbHQgPT4gdXBkYXRlIHRoZSBtZW51XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkZWRbcGx1Z2luXSA9IEpTT05FeHQuZGVlcENvcHkobmV3TWVudXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWVyZ2UgcG90ZW50aWFsIGRpc2FibGVkIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b0FkZCA9IFNldHRpbmdSZWdpc3RyeS5yZWNvbmNpbGVNZW51cyhuZXdNZW51cywgY3VycmVudE1lbnVzLCBmYWxzZSwgZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihtZW51ID0+ICFtZW51LmRpc2FibGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAobWVudSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1lbnUpLCB7IGl0ZW1zOiBTZXR0aW5nUmVnaXN0cnkuZmlsdGVyRGlzYWJsZWRJdGVtcygoX2EgPSBtZW51Lml0ZW1zKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXSkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1lbnVGYWN0b3J5LnVwZGF0ZU1lbnVzKG1lbnVzLCB0b0FkZCwgbWVudUZhY3RvcnkpLmZvckVhY2gobWVudSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkTWVudShtZW51KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgUHJpdmF0ZS5sb2FkU2V0dGluZ3NNZW51ID0gbG9hZFNldHRpbmdzTWVudTtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==