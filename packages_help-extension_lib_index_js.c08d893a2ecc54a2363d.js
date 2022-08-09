(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_help-extension_lib_index_js"],{

/***/ "../../packages/help-extension/lib/index.js":
/*!**************************************************!*\
  !*** ../../packages/help-extension/lib/index.js ***!
  \**************************************************/
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
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/mainmenu */ "webpack/sharing/consume/default/@jupyterlab/mainmenu/@jupyterlab/mainmenu");
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _licenses__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./licenses */ "../../packages/help-extension/lib/licenses.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module help-extension
 */








/**
 * The command IDs used by the help plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.open = 'help:open';
    CommandIDs.about = 'help:about';
    CommandIDs.activate = 'help:activate';
    CommandIDs.close = 'help:close';
    CommandIDs.show = 'help:show';
    CommandIDs.hide = 'help:hide';
    CommandIDs.launchClassic = 'help:launch-classic-notebook';
    CommandIDs.jupyterForum = 'help:jupyter-forum';
    CommandIDs.licenses = 'help:licenses';
    CommandIDs.licenseReport = 'help:license-report';
    CommandIDs.refreshLicenses = 'help:licenses-refresh';
})(CommandIDs || (CommandIDs = {}));
/**
 * A flag denoting whether the application is loaded over HTTPS.
 */
const LAB_IS_SECURE = window.location.protocol === 'https:';
/**
 * The class name added to the help widget.
 */
const HELP_CLASS = 'jp-Help';
/**
 * Add a command to show an About dialog.
 */
const about = {
    id: '@jupyterlab/help-extension:about',
    autoStart: true,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette],
    activate: (app, translator, palette) => {
        const { commands } = app;
        const trans = translator.load('jupyterlab');
        const category = trans.__('Help');
        commands.addCommand(CommandIDs.about, {
            label: trans.__('About %1', app.name),
            execute: () => {
                // Create the header of the about dialog
                const versionNumber = trans.__('Version %1', app.version);
                const versionInfo = (react__WEBPACK_IMPORTED_MODULE_6__.createElement("span", { className: "jp-About-version-info" },
                    react__WEBPACK_IMPORTED_MODULE_6__.createElement("span", { className: "jp-About-version" },
                        versionNumber,
                        "(",
                        "4-r-dev-12",
                        ")")));
                const title = (react__WEBPACK_IMPORTED_MODULE_6__.createElement("span", { className: "jp-About-header" },
                    react__WEBPACK_IMPORTED_MODULE_6__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__.jupyterIcon.react, { margin: "7px 9.5px", height: "auto", width: "58px" }),
                    react__WEBPACK_IMPORTED_MODULE_6__.createElement("div", { className: "jp-About-header-info" },
                        react__WEBPACK_IMPORTED_MODULE_6__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__.jupyterlabWordmarkIcon.react, { height: "auto", width: "196px" }),
                        versionInfo)));
                // Create the body of the about dialog
                const jupyterURL = 'https://jupyter.org/about.html';
                const contributorsURL = 'https://github.com/jupyterlab/jupyterlab/graphs/contributors';
                const externalLinks = (react__WEBPACK_IMPORTED_MODULE_6__.createElement("span", { className: "jp-About-externalLinks" },
                    react__WEBPACK_IMPORTED_MODULE_6__.createElement("a", { href: contributorsURL, target: "_blank", rel: "noopener noreferrer", className: "jp-Button-flat" }, trans.__('CONTRIBUTOR LIST')),
                    react__WEBPACK_IMPORTED_MODULE_6__.createElement("a", { href: jupyterURL, target: "_blank", rel: "noopener noreferrer", className: "jp-Button-flat" }, trans.__('ABOUT PROJECT JUPYTER'))));
                const copyright = (react__WEBPACK_IMPORTED_MODULE_6__.createElement("span", { className: "jp-About-copyright" }, trans.__('© 2015-2022 Project Jupyter Contributors')));
                const body = (react__WEBPACK_IMPORTED_MODULE_6__.createElement("div", { className: "jp-About-body" },
                    externalLinks,
                    copyright));
                return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                    title,
                    body,
                    buttons: [
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.createButton({
                            label: trans.__('Dismiss'),
                            className: 'jp-About-button jp-mod-reject jp-mod-styled'
                        })
                    ]
                });
            }
        });
        if (palette) {
            palette.addItem({ command: CommandIDs.about, category });
        }
    }
};
/**
 * A plugin to add a command to open the Classic Notebook interface.
 */
const launchClassic = {
    id: '@jupyterlab/help-extension:launch-classic',
    autoStart: true,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette],
    activate: (app, translator, palette) => {
        const { commands } = app;
        const trans = translator.load('jupyterlab');
        const category = trans.__('Help');
        commands.addCommand(CommandIDs.launchClassic, {
            label: trans.__('Launch Classic Notebook'),
            execute: () => {
                window.open(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getBaseUrl() + 'tree');
            }
        });
        if (palette) {
            palette.addItem({ command: CommandIDs.launchClassic, category });
        }
    }
};
/**
 * A plugin to add a command to open the Jupyter Forum.
 */
const jupyterForum = {
    id: '@jupyterlab/help-extension:jupyter-forum',
    autoStart: true,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette],
    activate: (app, translator, palette) => {
        const { commands } = app;
        const trans = translator.load('jupyterlab');
        const category = trans.__('Help');
        commands.addCommand(CommandIDs.jupyterForum, {
            label: trans.__('Jupyter Forum'),
            execute: () => {
                window.open('https://discourse.jupyter.org/c/jupyterlab');
            }
        });
        if (palette) {
            palette.addItem({ command: CommandIDs.jupyterForum, category });
        }
    }
};
/**
 * A plugin to add a list of resources to the help menu.
 */
const resources = {
    id: '@jupyterlab/help-extension:resources',
    autoStart: true,
    requires: [_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__.IMainMenu, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer],
    activate: (app, mainMenu, translator, palette, restorer) => {
        const trans = translator.load('jupyterlab');
        let counter = 0;
        const category = trans.__('Help');
        const namespace = 'help-doc';
        const { commands, shell, serviceManager } = app;
        const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({ namespace });
        const resources = [
            {
                text: trans.__('JupyterLab Reference'),
                url: 'https://jupyterlab.readthedocs.io/en/3.4.x/'
            },
            {
                text: trans.__('JupyterLab FAQ'),
                url: 'https://jupyterlab.readthedocs.io/en/3.4.x/getting_started/faq.html'
            },
            {
                text: trans.__('Jupyter Reference'),
                url: 'https://jupyter.org/documentation'
            },
            {
                text: trans.__('Markdown Reference'),
                url: 'https://commonmark.org/help/'
            }
        ];
        resources.sort((a, b) => {
            return a.text.localeCompare(b.text);
        });
        // Handle state restoration.
        if (restorer) {
            void restorer.restore(tracker, {
                command: CommandIDs.open,
                args: widget => ({
                    url: widget.content.url,
                    text: widget.content.title.label
                }),
                name: widget => widget.content.url
            });
        }
        /**
         * Create a new HelpWidget widget.
         */
        function newHelpWidget(url, text) {
            // Allow scripts and forms so that things like
            // readthedocs can use their search functionality.
            // We *don't* allow same origin requests, which
            // can prevent some content from being loaded onto the
            // help pages.
            const content = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IFrame({
                sandbox: ['allow-scripts', 'allow-forms']
            });
            content.url = url;
            content.addClass(HELP_CLASS);
            content.title.label = text;
            content.id = `${namespace}-${++counter}`;
            const widget = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MainAreaWidget({ content });
            widget.addClass('jp-Help');
            return widget;
        }
        // Populate the Help menu.
        const helpMenu = mainMenu.helpMenu;
        const resourcesGroup = resources.map(args => ({
            args,
            command: CommandIDs.open
        }));
        helpMenu.addGroup(resourcesGroup, 10);
        // Generate a cache of the kernel help links.
        const kernelInfoCache = new Map();
        serviceManager.sessions.runningChanged.connect((m, sessions) => {
            var _a;
            // If a new session has been added, it is at the back
            // of the session list. If one has changed or stopped,
            // it does not hurt to check it.
            if (!sessions.length) {
                return;
            }
            const sessionModel = sessions[sessions.length - 1];
            if (!sessionModel.kernel ||
                kernelInfoCache.has(sessionModel.kernel.name)) {
                return;
            }
            const session = serviceManager.sessions.connectTo({
                model: sessionModel,
                kernelConnectionOptions: { handleComms: false }
            });
            void ((_a = session.kernel) === null || _a === void 0 ? void 0 : _a.info.then(kernelInfo => {
                var _a, _b;
                const name = session.kernel.name;
                // Check the cache second time so that, if two callbacks get scheduled,
                // they don't try to add the same commands.
                if (kernelInfoCache.has(name)) {
                    return;
                }
                // Set the Kernel Info cache.
                kernelInfoCache.set(name, kernelInfo);
                // Utility function to check if the current widget
                // has registered itself with the help menu.
                const usesKernel = () => {
                    let result = false;
                    const widget = app.shell.currentWidget;
                    if (!widget) {
                        return result;
                    }
                    helpMenu.kernelUsers.forEach(u => {
                        var _a;
                        if (u.tracker.has(widget) && ((_a = u.getKernel(widget)) === null || _a === void 0 ? void 0 : _a.name) === name) {
                            result = true;
                        }
                    });
                    return result;
                };
                // Add the kernel banner to the Help Menu.
                const bannerCommand = `help-menu-${name}:banner`;
                const spec = (_b = (_a = serviceManager.kernelspecs) === null || _a === void 0 ? void 0 : _a.specs) === null || _b === void 0 ? void 0 : _b.kernelspecs[name];
                if (!spec) {
                    return;
                }
                const kernelName = spec.display_name;
                let kernelIconUrl = spec.resources['logo-64x64'];
                commands.addCommand(bannerCommand, {
                    label: trans.__('About the %1 Kernel', kernelName),
                    isVisible: usesKernel,
                    isEnabled: usesKernel,
                    execute: () => {
                        // Create the header of the about dialog
                        const headerLogo = react__WEBPACK_IMPORTED_MODULE_6__.createElement("img", { src: kernelIconUrl });
                        const title = (react__WEBPACK_IMPORTED_MODULE_6__.createElement("span", { className: "jp-About-header" },
                            headerLogo,
                            react__WEBPACK_IMPORTED_MODULE_6__.createElement("div", { className: "jp-About-header-info" }, kernelName)));
                        const banner = react__WEBPACK_IMPORTED_MODULE_6__.createElement("pre", null, kernelInfo.banner);
                        const body = react__WEBPACK_IMPORTED_MODULE_6__.createElement("div", { className: "jp-About-body" }, banner);
                        return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                            title,
                            body,
                            buttons: [
                                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.createButton({
                                    label: trans.__('Dismiss'),
                                    className: 'jp-About-button jp-mod-reject jp-mod-styled'
                                })
                            ]
                        });
                    }
                });
                helpMenu.addGroup([{ command: bannerCommand }], 20);
                // Add the kernel info help_links to the Help menu.
                const kernelGroup = [];
                (kernelInfo.help_links || []).forEach(link => {
                    const commandId = `help-menu-${name}:${link.text}`;
                    commands.addCommand(commandId, {
                        label: link.text,
                        isVisible: usesKernel,
                        isEnabled: usesKernel,
                        execute: () => {
                            return commands.execute(CommandIDs.open, link);
                        }
                    });
                    kernelGroup.push({ command: commandId });
                });
                helpMenu.addGroup(kernelGroup, 21);
                // Dispose of the session object since we no longer need it.
                session.dispose();
            }));
        });
        commands.addCommand(CommandIDs.open, {
            label: args => args['text'],
            execute: args => {
                const url = args['url'];
                const text = args['text'];
                const newBrowserTab = args['newBrowserTab'] || false;
                // If help resource will generate a mixed content error, load externally.
                if (newBrowserTab ||
                    (LAB_IS_SECURE && _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.parse(url).protocol !== 'https:')) {
                    window.open(url);
                    return;
                }
                const widget = newHelpWidget(url, text);
                void tracker.add(widget);
                shell.add(widget, 'main');
                return widget;
            }
        });
        if (palette) {
            resources.forEach(args => {
                palette.addItem({ args, command: CommandIDs.open, category });
            });
            palette.addItem({
                args: { reload: true },
                command: 'apputils:reset',
                category
            });
        }
    }
};
/**
 * A plugin to add a licenses reporting tools.
 */
const licenses = {
    id: '@jupyterlab/help-extension:licenses',
    autoStart: true,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.ITranslator],
    optional: [_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__.IMainMenu, _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer],
    activate: (app, translator, menu, palette, restorer) => {
        // bail if no license API is available from the server
        if (!_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getOption('licensesUrl')) {
            return;
        }
        const { commands, shell } = app;
        const trans = translator.load('jupyterlab');
        // translation strings
        const category = trans.__('Help');
        const downloadAsText = trans.__('Download All Licenses as');
        const licensesText = trans.__('Licenses');
        const refreshLicenses = trans.__('Refresh Licenses');
        // an incrementer for license widget ids
        let counter = 0;
        const licensesUrl = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.join(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getBaseUrl(), _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getOption('licensesUrl')) + '/';
        const licensesNamespace = 'help-licenses';
        const licensesTracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
            namespace: licensesNamespace
        });
        /**
         * Return a full license report format based on a format name
         */
        function formatOrDefault(format) {
            return (_licenses__WEBPACK_IMPORTED_MODULE_7__.Licenses.REPORT_FORMATS[format] ||
                _licenses__WEBPACK_IMPORTED_MODULE_7__.Licenses.REPORT_FORMATS[_licenses__WEBPACK_IMPORTED_MODULE_7__.Licenses.DEFAULT_FORMAT]);
        }
        /**
         * Create a MainAreaWidget for a license viewer
         */
        function createLicenseWidget(args) {
            const licensesModel = new _licenses__WEBPACK_IMPORTED_MODULE_7__.Licenses.Model(Object.assign(Object.assign({}, args), { licensesUrl,
                trans, serverSettings: app.serviceManager.serverSettings }));
            const content = new _licenses__WEBPACK_IMPORTED_MODULE_7__.Licenses({ model: licensesModel });
            content.id = `${licensesNamespace}-${++counter}`;
            content.title.label = licensesText;
            content.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__.copyrightIcon;
            const main = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MainAreaWidget({
                content,
                reveal: licensesModel.licensesReady
            });
            main.toolbar.addItem('refresh-licenses', new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.CommandToolbarButton({
                id: CommandIDs.refreshLicenses,
                args: { noLabel: 1 },
                commands
            }));
            main.toolbar.addItem('spacer', _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Toolbar.createSpacerItem());
            for (const format of Object.keys(_licenses__WEBPACK_IMPORTED_MODULE_7__.Licenses.REPORT_FORMATS)) {
                const button = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.CommandToolbarButton({
                    id: CommandIDs.licenseReport,
                    args: { format, noLabel: 1 },
                    commands
                });
                main.toolbar.addItem(`download-${format}`, button);
            }
            return main;
        }
        // register license-related commands
        commands.addCommand(CommandIDs.licenses, {
            label: licensesText,
            execute: (args) => {
                const licenseMain = createLicenseWidget(args);
                shell.add(licenseMain, 'main');
                // add to tracker so it can be restored, and update when choices change
                void licensesTracker.add(licenseMain);
                licenseMain.content.model.trackerDataChanged.connect(() => {
                    void licensesTracker.save(licenseMain);
                });
                return licenseMain;
            }
        });
        commands.addCommand(CommandIDs.refreshLicenses, {
            label: args => (args.noLabel ? '' : refreshLicenses),
            caption: refreshLicenses,
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__.refreshIcon,
            execute: async () => {
                var _a;
                return (_a = licensesTracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content.model.initLicenses();
            }
        });
        commands.addCommand(CommandIDs.licenseReport, {
            label: args => {
                if (args.noLabel) {
                    return '';
                }
                const format = formatOrDefault(`${args.format}`);
                return `${downloadAsText} ${format.title}`;
            },
            caption: args => {
                const format = formatOrDefault(`${args.format}`);
                return `${downloadAsText} ${format.title}`;
            },
            icon: args => {
                const format = formatOrDefault(`${args.format}`);
                return format.icon;
            },
            execute: async (args) => {
                var _a;
                const format = formatOrDefault(`${args.format}`);
                return await ((_a = licensesTracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content.model.download({
                    format: format.id
                }));
            }
        });
        // handle optional integrations
        if (palette) {
            palette.addItem({ command: CommandIDs.licenses, category });
        }
        if (menu) {
            const helpMenu = menu.helpMenu;
            helpMenu.addGroup([{ command: CommandIDs.licenses }], 0);
        }
        if (restorer) {
            void restorer.restore(licensesTracker, {
                command: CommandIDs.licenses,
                name: widget => 'licenses',
                args: widget => {
                    const { currentBundleName, currentPackageIndex, packageFilter } = widget.content.model;
                    const args = {
                        currentBundleName,
                        currentPackageIndex,
                        packageFilter
                    };
                    return args;
                }
            });
        }
    }
};
const plugins = [
    about,
    launchClassic,
    jupyterForum,
    resources,
    licenses
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/help-extension/lib/licenses.js":
/*!*****************************************************!*\
  !*** ../../packages/help-extension/lib/licenses.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Licenses": () => (/* binding */ Licenses)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/virtualdom */ "webpack/sharing/consume/default/@lumino/virtualdom/@lumino/virtualdom");
/* harmony import */ var _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.








/**
 * A license viewer
 */
class Licenses extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.SplitPanel {
    constructor(options) {
        super();
        this.addClass('jp-Licenses');
        this.model = options.model;
        this.initLeftPanel();
        this.initFilters();
        this.initBundles();
        this.initGrid();
        this.initLicenseText();
        this.setRelativeSizes([1, 2, 3]);
        void this.model.initLicenses().then(() => this._updateBundles());
        this.model.trackerDataChanged.connect(() => {
            this.title.label = this.model.title;
        });
    }
    /**
     * Handle disposing of the widget
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._bundles.currentChanged.disconnect(this.onBundleSelected, this);
        this.model.dispose();
        super.dispose();
    }
    /**
     * Initialize the left area for filters and bundles
     */
    initLeftPanel() {
        this._leftPanel = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Panel();
        this._leftPanel.addClass('jp-Licenses-FormArea');
        this.addWidget(this._leftPanel);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.SplitPanel.setStretch(this._leftPanel, 1);
    }
    /**
     * Initialize the filters
     */
    initFilters() {
        this._filters = new Licenses.Filters(this.model);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.SplitPanel.setStretch(this._filters, 1);
        this._leftPanel.addWidget(this._filters);
    }
    /**
     * Initialize the listing of available bundles
     */
    initBundles() {
        this._bundles = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.TabBar({
            orientation: 'vertical',
            renderer: new Licenses.BundleTabRenderer(this.model)
        });
        this._bundles.addClass('jp-Licenses-Bundles');
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.SplitPanel.setStretch(this._bundles, 1);
        this._leftPanel.addWidget(this._bundles);
        this._bundles.currentChanged.connect(this.onBundleSelected, this);
        this.model.stateChanged.connect(() => this._bundles.update());
    }
    /**
     * Initialize the listing of packages within the current bundle
     */
    initGrid() {
        this._grid = new Licenses.Grid(this.model);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.SplitPanel.setStretch(this._grid, 1);
        this.addWidget(this._grid);
    }
    /**
     * Initialize the full text of the current package
     */
    initLicenseText() {
        this._licenseText = new Licenses.FullText(this.model);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.SplitPanel.setStretch(this._grid, 1);
        this.addWidget(this._licenseText);
    }
    /**
     * Event handler for updating the model with the current bundle
     */
    onBundleSelected() {
        var _a;
        if ((_a = this._bundles.currentTitle) === null || _a === void 0 ? void 0 : _a.label) {
            this.model.currentBundleName = this._bundles.currentTitle.label;
        }
    }
    /**
     * Update the bundle tabs.
     */
    _updateBundles() {
        this._bundles.clearTabs();
        let i = 0;
        const { currentBundleName } = this.model;
        let currentIndex = 0;
        for (const bundle of this.model.bundleNames) {
            const tab = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Widget();
            tab.title.label = bundle;
            if (bundle === currentBundleName) {
                currentIndex = i;
            }
            this._bundles.insertTab(++i, tab.title);
        }
        this._bundles.currentIndex = currentIndex;
    }
}
/** A namespace for license components */
(function (Licenses) {
    /**
     * License report formats understood by the server (once lower-cased)
     */
    Licenses.REPORT_FORMATS = {
        markdown: {
            id: 'markdown',
            title: 'Markdown',
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.markdownIcon
        },
        csv: {
            id: 'csv',
            title: 'CSV',
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.spreadsheetIcon
        },
        json: {
            id: 'csv',
            title: 'JSON',
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.jsonIcon
        }
    };
    /**
     * The default format (most human-readable)
     */
    Licenses.DEFAULT_FORMAT = 'markdown';
    /**
     * A model for license data
     */
    class Model extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomModel {
        constructor(options) {
            super();
            this._selectedPackageChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
            this._trackerDataChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
            this._currentPackageIndex = 0;
            this._licensesReady = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.PromiseDelegate();
            this._packageFilter = {};
            this._trans = options.trans;
            this._licensesUrl = options.licensesUrl;
            this._serverSettings =
                options.serverSettings || _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeSettings();
            if (options.currentBundleName) {
                this._currentBundleName = options.currentBundleName;
            }
            if (options.packageFilter) {
                this._packageFilter = options.packageFilter;
            }
            if (options.currentPackageIndex) {
                this._currentPackageIndex = options.currentPackageIndex;
            }
        }
        /**
         * Handle the initial request for the licenses from the server.
         */
        async initLicenses() {
            try {
                const response = await _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeRequest(this._licensesUrl, {}, this._serverSettings);
                this._serverResponse = await response.json();
                this._licensesReady.resolve();
                this.stateChanged.emit(void 0);
            }
            catch (err) {
                this._licensesReady.reject(err);
            }
        }
        /**
         * Create a temporary download link, and emulate clicking it to trigger a named
         * file download.
         */
        async download(options) {
            const url = `${this._licensesUrl}?format=${options.format}&download=1`;
            const element = document.createElement('a');
            element.href = url;
            element.download = '';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            return void 0;
        }
        /**
         * A promise that resolves when the licenses from the server change
         */
        get selectedPackageChanged() {
            return this._selectedPackageChanged;
        }
        /**
         * A promise that resolves when the trackable data changes
         */
        get trackerDataChanged() {
            return this._trackerDataChanged;
        }
        /**
         * The names of the license bundles available
         */
        get bundleNames() {
            var _a;
            return Object.keys(((_a = this._serverResponse) === null || _a === void 0 ? void 0 : _a.bundles) || {});
        }
        /**
         * The current license bundle
         */
        get currentBundleName() {
            if (this._currentBundleName) {
                return this._currentBundleName;
            }
            if (this.bundleNames.length) {
                return this.bundleNames[0];
            }
            return null;
        }
        /**
         * Set the current license bundle, and reset the selected index
         */
        set currentBundleName(currentBundleName) {
            if (this._currentBundleName !== currentBundleName) {
                this._currentBundleName = currentBundleName;
                this.stateChanged.emit(void 0);
                this._trackerDataChanged.emit(void 0);
            }
        }
        /**
         * A promise that resolves when the licenses are available from the server
         */
        get licensesReady() {
            return this._licensesReady.promise;
        }
        /**
         * All the license bundles, keyed by the distributing packages
         */
        get bundles() {
            var _a;
            return ((_a = this._serverResponse) === null || _a === void 0 ? void 0 : _a.bundles) || {};
        }
        /**
         * The index of the currently-selected package within its license bundle
         */
        get currentPackageIndex() {
            return this._currentPackageIndex;
        }
        /**
         * Update the currently-selected package within its license bundle
         */
        set currentPackageIndex(currentPackageIndex) {
            if (this._currentPackageIndex === currentPackageIndex) {
                return;
            }
            this._currentPackageIndex = currentPackageIndex;
            this._selectedPackageChanged.emit(void 0);
            this.stateChanged.emit(void 0);
            this._trackerDataChanged.emit(void 0);
        }
        /**
         * The license data for the currently-selected package
         */
        get currentPackage() {
            var _a;
            if (this.currentBundleName &&
                this.bundles &&
                this._currentPackageIndex != null) {
                return this.getFilteredPackages(((_a = this.bundles[this.currentBundleName]) === null || _a === void 0 ? void 0 : _a.packages) || [])[this._currentPackageIndex];
            }
            return null;
        }
        /**
         * A translation bundle
         */
        get trans() {
            return this._trans;
        }
        get title() {
            return `${this._currentBundleName || ''} ${this._trans.__('Licenses')}`.trim();
        }
        /**
         * The current package filter
         */
        get packageFilter() {
            return this._packageFilter;
        }
        set packageFilter(packageFilter) {
            this._packageFilter = packageFilter;
            this.stateChanged.emit(void 0);
            this._trackerDataChanged.emit(void 0);
        }
        /**
         * Get filtered packages from current bundle where at least one token of each
         * key is present.
         */
        getFilteredPackages(allRows) {
            let rows = [];
            let filters = Object.entries(this._packageFilter)
                .filter(([k, v]) => v && `${v}`.trim().length)
                .map(([k, v]) => [k, `${v}`.toLowerCase().trim().split(' ')]);
            for (const row of allRows) {
                let keyHits = 0;
                for (const [key, bits] of filters) {
                    let bitHits = 0;
                    let rowKeyValue = `${row[key]}`.toLowerCase();
                    for (const bit of bits) {
                        if (rowKeyValue.includes(bit)) {
                            bitHits += 1;
                        }
                    }
                    if (bitHits) {
                        keyHits += 1;
                    }
                }
                if (keyHits === filters.length) {
                    rows.push(row);
                }
            }
            return Object.values(rows);
        }
    }
    Licenses.Model = Model;
    /**
     * A filter form for limiting the packages displayed
     */
    class Filters extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomRenderer {
        constructor(model) {
            super(model);
            /**
             * Render a filter input
             */
            this.renderFilter = (key) => {
                const value = this.model.packageFilter[key] || '';
                return (react__WEBPACK_IMPORTED_MODULE_7__.createElement("input", { type: "text", name: key, defaultValue: value, className: "jp-mod-styled", onInput: this.onFilterInput }));
            };
            /**
             * Handle a filter input changing
             */
            this.onFilterInput = (evt) => {
                const input = evt.currentTarget;
                const { name, value } = input;
                this.model.packageFilter = Object.assign(Object.assign({}, this.model.packageFilter), { [name]: value });
            };
            this.addClass('jp-Licenses-Filters');
            this.addClass('jp-RenderedHTMLCommon');
        }
        render() {
            const { trans } = this.model;
            return (react__WEBPACK_IMPORTED_MODULE_7__.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_7__.createElement("label", null,
                    react__WEBPACK_IMPORTED_MODULE_7__.createElement("strong", null, trans.__('Filter Licenses By'))),
                react__WEBPACK_IMPORTED_MODULE_7__.createElement("ul", null,
                    react__WEBPACK_IMPORTED_MODULE_7__.createElement("li", null,
                        react__WEBPACK_IMPORTED_MODULE_7__.createElement("label", null, trans.__('Package')),
                        this.renderFilter('name')),
                    react__WEBPACK_IMPORTED_MODULE_7__.createElement("li", null,
                        react__WEBPACK_IMPORTED_MODULE_7__.createElement("label", null, trans.__('Version')),
                        this.renderFilter('versionInfo')),
                    react__WEBPACK_IMPORTED_MODULE_7__.createElement("li", null,
                        react__WEBPACK_IMPORTED_MODULE_7__.createElement("label", null, trans.__('License')),
                        this.renderFilter('licenseId'))),
                react__WEBPACK_IMPORTED_MODULE_7__.createElement("label", null,
                    react__WEBPACK_IMPORTED_MODULE_7__.createElement("strong", null, trans.__('Distributions')))));
        }
    }
    Licenses.Filters = Filters;
    /**
     * A fancy bundle renderer with the package count
     */
    class BundleTabRenderer extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.TabBar.Renderer {
        constructor(model) {
            super();
            this.closeIconSelector = '.lm-TabBar-tabCloseIcon';
            this.model = model;
        }
        /**
         * Render a full bundle
         */
        renderTab(data) {
            let title = data.title.caption;
            let key = this.createTabKey(data);
            let style = this.createTabStyle(data);
            let className = this.createTabClass(data);
            let dataset = this.createTabDataset(data);
            return _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_5__.h.li({ key, className, title, style, dataset }, this.renderIcon(data), this.renderLabel(data), this.renderCountBadge(data));
        }
        /**
         * Render the package count
         */
        renderCountBadge(data) {
            const bundle = data.title.label;
            const { bundles } = this.model;
            const packages = this.model.getFilteredPackages((bundles && bundle ? bundles[bundle].packages : []) || []);
            return _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_5__.h.label({}, `${packages.length}`);
        }
    }
    Licenses.BundleTabRenderer = BundleTabRenderer;
    /**
     * A grid of licenses
     */
    class Grid extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomRenderer {
        constructor(model) {
            super(model);
            /**
             * Render a single package's license information
             */
            this.renderRow = (row, index) => {
                const selected = index === this.model.currentPackageIndex;
                const onCheck = () => (this.model.currentPackageIndex = index);
                return (react__WEBPACK_IMPORTED_MODULE_7__.createElement("tr", { key: row.name, className: selected ? 'jp-mod-selected' : '', onClick: onCheck },
                    react__WEBPACK_IMPORTED_MODULE_7__.createElement("td", null,
                        react__WEBPACK_IMPORTED_MODULE_7__.createElement("input", { type: "radio", name: "show-package-license", value: index, onChange: onCheck, checked: selected })),
                    react__WEBPACK_IMPORTED_MODULE_7__.createElement("th", null, row.name),
                    react__WEBPACK_IMPORTED_MODULE_7__.createElement("td", null,
                        react__WEBPACK_IMPORTED_MODULE_7__.createElement("code", null, row.versionInfo)),
                    react__WEBPACK_IMPORTED_MODULE_7__.createElement("td", null,
                        react__WEBPACK_IMPORTED_MODULE_7__.createElement("code", null, row.licenseId))));
            };
            this.addClass('jp-Licenses-Grid');
            this.addClass('jp-RenderedHTMLCommon');
        }
        /**
         * Render a grid of package license information
         */
        render() {
            var _a;
            const { bundles, currentBundleName, trans } = this.model;
            const filteredPackages = this.model.getFilteredPackages(bundles && currentBundleName
                ? ((_a = bundles[currentBundleName]) === null || _a === void 0 ? void 0 : _a.packages) || []
                : []);
            if (!filteredPackages.length) {
                return (react__WEBPACK_IMPORTED_MODULE_7__.createElement("blockquote", null,
                    react__WEBPACK_IMPORTED_MODULE_7__.createElement("em", null, trans.__('No Packages found'))));
            }
            return (react__WEBPACK_IMPORTED_MODULE_7__.createElement("form", null,
                react__WEBPACK_IMPORTED_MODULE_7__.createElement("table", null,
                    react__WEBPACK_IMPORTED_MODULE_7__.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_7__.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_7__.createElement("td", null),
                            react__WEBPACK_IMPORTED_MODULE_7__.createElement("th", null, trans.__('Package')),
                            react__WEBPACK_IMPORTED_MODULE_7__.createElement("th", null, trans.__('Version')),
                            react__WEBPACK_IMPORTED_MODULE_7__.createElement("th", null, trans.__('License')))),
                    react__WEBPACK_IMPORTED_MODULE_7__.createElement("tbody", null, filteredPackages.map(this.renderRow)))));
        }
    }
    Licenses.Grid = Grid;
    /**
     * A package's full license text
     */
    class FullText extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomRenderer {
        constructor(model) {
            super(model);
            this.addClass('jp-Licenses-Text');
            this.addClass('jp-RenderedHTMLCommon');
            this.addClass('jp-RenderedMarkdown');
        }
        /**
         * Render the license text, or a null state if no package is selected
         */
        render() {
            const { currentPackage, trans } = this.model;
            let head = '';
            let quote = trans.__('No Package selected');
            let code = '';
            if (currentPackage) {
                const { name, versionInfo, licenseId, extractedText } = currentPackage;
                head = `${name} v${versionInfo}`;
                quote = `${trans.__('License')}: ${licenseId || trans.__('No License ID found')}`;
                code = extractedText || trans.__('No License Text found');
            }
            return [
                react__WEBPACK_IMPORTED_MODULE_7__.createElement("h1", { key: "h1" }, head),
                react__WEBPACK_IMPORTED_MODULE_7__.createElement("blockquote", { key: "quote" },
                    react__WEBPACK_IMPORTED_MODULE_7__.createElement("em", null, quote)),
                react__WEBPACK_IMPORTED_MODULE_7__.createElement("code", { key: "code" }, code)
            ];
        }
    }
    Licenses.FullText = FullText;
})(Licenses || (Licenses = {}));
//# sourceMappingURL=licenses.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvaGVscC1leHRlbnNpb24vbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9oZWxwLWV4dGVuc2lvbi9saWIvbGljZW5zZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwRDtBQUN1RjtBQUN0RjtBQUNWO0FBQ0s7QUFDc0Q7QUFDN0U7QUFDTztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdFQUFXO0FBQzFCLGVBQWUsaUVBQWU7QUFDOUI7QUFDQSxlQUFlLFdBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsZ0RBQW1CLFVBQVUscUNBQXFDO0FBQ3ZHLG9CQUFvQixnREFBbUIsVUFBVSxnQ0FBZ0M7QUFDakY7QUFDQTtBQUNBLHdCQUF3QixZQUFxQjtBQUM3QztBQUNBLCtCQUErQixnREFBbUIsVUFBVSwrQkFBK0I7QUFDM0Ysb0JBQW9CLGdEQUFtQixDQUFDLHdFQUFpQixHQUFHLHFEQUFxRDtBQUNqSCxvQkFBb0IsZ0RBQW1CLFNBQVMsb0NBQW9DO0FBQ3BGLHdCQUF3QixnREFBbUIsQ0FBQyxtRkFBNEIsR0FBRyxpQ0FBaUM7QUFDNUc7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsZ0RBQW1CLFVBQVUsc0NBQXNDO0FBQzFHLG9CQUFvQixnREFBbUIs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QUN2QyxnQkFBZ0IsZ0RBQW1CLFVBQVUsY0FBYztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsNEJBQTRCO0FBQzdCLG9DIiwiZmlsZSI6InBhY2thZ2VzX2hlbHAtZXh0ZW5zaW9uX2xpYl9pbmRleF9qcy5jMDhkODkzYTJlY2M1NGEyMzYzZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIGhlbHAtZXh0ZW5zaW9uXG4gKi9cbmltcG9ydCB7IElMYXlvdXRSZXN0b3JlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uJztcbmltcG9ydCB7IENvbW1hbmRUb29sYmFyQnV0dG9uLCBEaWFsb2csIElDb21tYW5kUGFsZXR0ZSwgSUZyYW1lLCBNYWluQXJlYVdpZGdldCwgc2hvd0RpYWxvZywgVG9vbGJhciwgV2lkZ2V0VHJhY2tlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IFBhZ2VDb25maWcsIFVSTEV4dCB9IGZyb20gJ0BqdXB5dGVybGFiL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBJTWFpbk1lbnUgfSBmcm9tICdAanVweXRlcmxhYi9tYWlubWVudSc7XG5pbXBvcnQgeyBJVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGNvcHlyaWdodEljb24sIGp1cHl0ZXJJY29uLCBqdXB5dGVybGFiV29yZG1hcmtJY29uLCByZWZyZXNoSWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGljZW5zZXMgfSBmcm9tICcuL2xpY2Vuc2VzJztcbi8qKlxuICogVGhlIGNvbW1hbmQgSURzIHVzZWQgYnkgdGhlIGhlbHAgcGx1Z2luLlxuICovXG52YXIgQ29tbWFuZElEcztcbihmdW5jdGlvbiAoQ29tbWFuZElEcykge1xuICAgIENvbW1hbmRJRHMub3BlbiA9ICdoZWxwOm9wZW4nO1xuICAgIENvbW1hbmRJRHMuYWJvdXQgPSAnaGVscDphYm91dCc7XG4gICAgQ29tbWFuZElEcy5hY3RpdmF0ZSA9ICdoZWxwOmFjdGl2YXRlJztcbiAgICBDb21tYW5kSURzLmNsb3NlID0gJ2hlbHA6Y2xvc2UnO1xuICAgIENvbW1hbmRJRHMuc2hvdyA9ICdoZWxwOnNob3cnO1xuICAgIENvbW1hbmRJRHMuaGlkZSA9ICdoZWxwOmhpZGUnO1xuICAgIENvbW1hbmRJRHMubGF1bmNoQ2xhc3NpYyA9ICdoZWxwOmxhdW5jaC1jbGFzc2ljLW5vdGVib29rJztcbiAgICBDb21tYW5kSURzLmp1cHl0ZXJGb3J1bSA9ICdoZWxwOmp1cHl0ZXItZm9ydW0nO1xuICAgIENvbW1hbmRJRHMubGljZW5zZXMgPSAnaGVscDpsaWNlbnNlcyc7XG4gICAgQ29tbWFuZElEcy5saWNlbnNlUmVwb3J0ID0gJ2hlbHA6bGljZW5zZS1yZXBvcnQnO1xuICAgIENvbW1hbmRJRHMucmVmcmVzaExpY2Vuc2VzID0gJ2hlbHA6bGljZW5zZXMtcmVmcmVzaCc7XG59KShDb21tYW5kSURzIHx8IChDb21tYW5kSURzID0ge30pKTtcbi8qKlxuICogQSBmbGFnIGRlbm90aW5nIHdoZXRoZXIgdGhlIGFwcGxpY2F0aW9uIGlzIGxvYWRlZCBvdmVyIEhUVFBTLlxuICovXG5jb25zdCBMQUJfSVNfU0VDVVJFID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSAnaHR0cHM6Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIGhlbHAgd2lkZ2V0LlxuICovXG5jb25zdCBIRUxQX0NMQVNTID0gJ2pwLUhlbHAnO1xuLyoqXG4gKiBBZGQgYSBjb21tYW5kIHRvIHNob3cgYW4gQWJvdXQgZGlhbG9nLlxuICovXG5jb25zdCBhYm91dCA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2hlbHAtZXh0ZW5zaW9uOmFib3V0JyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtJQ29tbWFuZFBhbGV0dGVdLFxuICAgIGFjdGl2YXRlOiAoYXBwLCB0cmFuc2xhdG9yLCBwYWxldHRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMgfSA9IGFwcDtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSB0cmFucy5fXygnSGVscCcpO1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuYWJvdXQsIHtcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnQWJvdXQgJTEnLCBhcHAubmFtZSksXG4gICAgICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBoZWFkZXIgb2YgdGhlIGFib3V0IGRpYWxvZ1xuICAgICAgICAgICAgICAgIGNvbnN0IHZlcnNpb25OdW1iZXIgPSB0cmFucy5fXygnVmVyc2lvbiAlMScsIGFwcC52ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2ZXJzaW9uSW5mbyA9IChSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJqcC1BYm91dC12ZXJzaW9uLWluZm9cIiB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJqcC1BYm91dC12ZXJzaW9uXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNpb25OdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIihcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52LklNQUdFX1RBRyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiKVwiKSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImpwLUFib3V0LWhlYWRlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoanVweXRlckljb24ucmVhY3QsIHsgbWFyZ2luOiBcIjdweCA5LjVweFwiLCBoZWlnaHQ6IFwiYXV0b1wiLCB3aWR0aDogXCI1OHB4XCIgfSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtQWJvdXQtaGVhZGVyLWluZm9cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChqdXB5dGVybGFiV29yZG1hcmtJY29uLnJlYWN0LCB7IGhlaWdodDogXCJhdXRvXCIsIHdpZHRoOiBcIjE5NnB4XCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uSW5mbykpKTtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGJvZHkgb2YgdGhlIGFib3V0IGRpYWxvZ1xuICAgICAgICAgICAgICAgIGNvbnN0IGp1cHl0ZXJVUkwgPSAnaHR0cHM6Ly9qdXB5dGVyLm9yZy9hYm91dC5odG1sJztcbiAgICAgICAgICAgICAgICBjb25zdCBjb250cmlidXRvcnNVUkwgPSAnaHR0cHM6Ly9naXRodWIuY29tL2p1cHl0ZXJsYWIvanVweXRlcmxhYi9ncmFwaHMvY29udHJpYnV0b3JzJztcbiAgICAgICAgICAgICAgICBjb25zdCBleHRlcm5hbExpbmtzID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImpwLUFib3V0LWV4dGVybmFsTGlua3NcIiB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGhyZWY6IGNvbnRyaWJ1dG9yc1VSTCwgdGFyZ2V0OiBcIl9ibGFua1wiLCByZWw6IFwibm9vcGVuZXIgbm9yZWZlcnJlclwiLCBjbGFzc05hbWU6IFwianAtQnV0dG9uLWZsYXRcIiB9LCB0cmFucy5fXygnQ09OVFJJQlVUT1IgTElTVCcpKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgeyBocmVmOiBqdXB5dGVyVVJMLCB0YXJnZXQ6IFwiX2JsYW5rXCIsIHJlbDogXCJub29wZW5lciBub3JlZmVycmVyXCIsIGNsYXNzTmFtZTogXCJqcC1CdXR0b24tZmxhdFwiIH0sIHRyYW5zLl9fKCdBQk9VVCBQUk9KRUNUIEpVUFlURVInKSkpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb3B5cmlnaHQgPSAoUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwianAtQWJvdXQtY29weXJpZ2h0XCIgfSwgdHJhbnMuX18oJ8KpIDIwMTUtMjAyMiBQcm9qZWN0IEp1cHl0ZXIgQ29udHJpYnV0b3JzJykpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtQWJvdXQtYm9keVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4dGVybmFsTGlua3MsXG4gICAgICAgICAgICAgICAgICAgIGNvcHlyaWdodCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzaG93RGlhbG9nKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIGJvZHksXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZy5jcmVhdGVCdXR0b24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnRGlzbWlzcycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2pwLUFib3V0LWJ1dHRvbiBqcC1tb2QtcmVqZWN0IGpwLW1vZC1zdHlsZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocGFsZXR0ZSkge1xuICAgICAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHsgY29tbWFuZDogQ29tbWFuZElEcy5hYm91dCwgY2F0ZWdvcnkgfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuLyoqXG4gKiBBIHBsdWdpbiB0byBhZGQgYSBjb21tYW5kIHRvIG9wZW4gdGhlIENsYXNzaWMgTm90ZWJvb2sgaW50ZXJmYWNlLlxuICovXG5jb25zdCBsYXVuY2hDbGFzc2ljID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvaGVscC1leHRlbnNpb246bGF1bmNoLWNsYXNzaWMnLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICByZXF1aXJlczogW0lUcmFuc2xhdG9yXSxcbiAgICBvcHRpb25hbDogW0lDb21tYW5kUGFsZXR0ZV0sXG4gICAgYWN0aXZhdGU6IChhcHAsIHRyYW5zbGF0b3IsIHBhbGV0dGUpID0+IHtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kcyB9ID0gYXBwO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCBjYXRlZ29yeSA9IHRyYW5zLl9fKCdIZWxwJyk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5sYXVuY2hDbGFzc2ljLCB7XG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0xhdW5jaCBDbGFzc2ljIE5vdGVib29rJyksXG4gICAgICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oUGFnZUNvbmZpZy5nZXRCYXNlVXJsKCkgKyAndHJlZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHBhbGV0dGUpIHtcbiAgICAgICAgICAgIHBhbGV0dGUuYWRkSXRlbSh7IGNvbW1hbmQ6IENvbW1hbmRJRHMubGF1bmNoQ2xhc3NpYywgY2F0ZWdvcnkgfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuLyoqXG4gKiBBIHBsdWdpbiB0byBhZGQgYSBjb21tYW5kIHRvIG9wZW4gdGhlIEp1cHl0ZXIgRm9ydW0uXG4gKi9cbmNvbnN0IGp1cHl0ZXJGb3J1bSA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2hlbHAtZXh0ZW5zaW9uOmp1cHl0ZXItZm9ydW0nLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICByZXF1aXJlczogW0lUcmFuc2xhdG9yXSxcbiAgICBvcHRpb25hbDogW0lDb21tYW5kUGFsZXR0ZV0sXG4gICAgYWN0aXZhdGU6IChhcHAsIHRyYW5zbGF0b3IsIHBhbGV0dGUpID0+IHtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kcyB9ID0gYXBwO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCBjYXRlZ29yeSA9IHRyYW5zLl9fKCdIZWxwJyk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5qdXB5dGVyRm9ydW0sIHtcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnSnVweXRlciBGb3J1bScpLFxuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKCdodHRwczovL2Rpc2NvdXJzZS5qdXB5dGVyLm9yZy9jL2p1cHl0ZXJsYWInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChwYWxldHRlKSB7XG4gICAgICAgICAgICBwYWxldHRlLmFkZEl0ZW0oeyBjb21tYW5kOiBDb21tYW5kSURzLmp1cHl0ZXJGb3J1bSwgY2F0ZWdvcnkgfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuLyoqXG4gKiBBIHBsdWdpbiB0byBhZGQgYSBsaXN0IG9mIHJlc291cmNlcyB0byB0aGUgaGVscCBtZW51LlxuICovXG5jb25zdCByZXNvdXJjZXMgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9oZWxwLWV4dGVuc2lvbjpyZXNvdXJjZXMnLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICByZXF1aXJlczogW0lNYWluTWVudSwgSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbSUNvbW1hbmRQYWxldHRlLCBJTGF5b3V0UmVzdG9yZXJdLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBtYWluTWVudSwgdHJhbnNsYXRvciwgcGFsZXR0ZSwgcmVzdG9yZXIpID0+IHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgICBjb25zdCBjYXRlZ29yeSA9IHRyYW5zLl9fKCdIZWxwJyk7XG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9ICdoZWxwLWRvYyc7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMsIHNoZWxsLCBzZXJ2aWNlTWFuYWdlciB9ID0gYXBwO1xuICAgICAgICBjb25zdCB0cmFja2VyID0gbmV3IFdpZGdldFRyYWNrZXIoeyBuYW1lc3BhY2UgfSk7XG4gICAgICAgIGNvbnN0IHJlc291cmNlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiB0cmFucy5fXygnSnVweXRlckxhYiBSZWZlcmVuY2UnKSxcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2p1cHl0ZXJsYWIucmVhZHRoZWRvY3MuaW8vZW4vMy40LngvJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiB0cmFucy5fXygnSnVweXRlckxhYiBGQVEnKSxcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2p1cHl0ZXJsYWIucmVhZHRoZWRvY3MuaW8vZW4vMy40LngvZ2V0dGluZ19zdGFydGVkL2ZhcS5odG1sJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiB0cmFucy5fXygnSnVweXRlciBSZWZlcmVuY2UnKSxcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2p1cHl0ZXIub3JnL2RvY3VtZW50YXRpb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6IHRyYW5zLl9fKCdNYXJrZG93biBSZWZlcmVuY2UnKSxcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2NvbW1vbm1hcmsub3JnL2hlbHAvJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgICAgICByZXNvdXJjZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGEudGV4dC5sb2NhbGVDb21wYXJlKGIudGV4dCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBIYW5kbGUgc3RhdGUgcmVzdG9yYXRpb24uXG4gICAgICAgIGlmIChyZXN0b3Jlcikge1xuICAgICAgICAgICAgdm9pZCByZXN0b3Jlci5yZXN0b3JlKHRyYWNrZXIsIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLm9wZW4sXG4gICAgICAgICAgICAgICAgYXJnczogd2lkZ2V0ID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogd2lkZ2V0LmNvbnRlbnQudXJsLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB3aWRnZXQuY29udGVudC50aXRsZS5sYWJlbFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG5hbWU6IHdpZGdldCA9PiB3aWRnZXQuY29udGVudC51cmxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgYSBuZXcgSGVscFdpZGdldCB3aWRnZXQuXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBuZXdIZWxwV2lkZ2V0KHVybCwgdGV4dCkge1xuICAgICAgICAgICAgLy8gQWxsb3cgc2NyaXB0cyBhbmQgZm9ybXMgc28gdGhhdCB0aGluZ3MgbGlrZVxuICAgICAgICAgICAgLy8gcmVhZHRoZWRvY3MgY2FuIHVzZSB0aGVpciBzZWFyY2ggZnVuY3Rpb25hbGl0eS5cbiAgICAgICAgICAgIC8vIFdlICpkb24ndCogYWxsb3cgc2FtZSBvcmlnaW4gcmVxdWVzdHMsIHdoaWNoXG4gICAgICAgICAgICAvLyBjYW4gcHJldmVudCBzb21lIGNvbnRlbnQgZnJvbSBiZWluZyBsb2FkZWQgb250byB0aGVcbiAgICAgICAgICAgIC8vIGhlbHAgcGFnZXMuXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gbmV3IElGcmFtZSh7XG4gICAgICAgICAgICAgICAgc2FuZGJveDogWydhbGxvdy1zY3JpcHRzJywgJ2FsbG93LWZvcm1zJ11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udGVudC51cmwgPSB1cmw7XG4gICAgICAgICAgICBjb250ZW50LmFkZENsYXNzKEhFTFBfQ0xBU1MpO1xuICAgICAgICAgICAgY29udGVudC50aXRsZS5sYWJlbCA9IHRleHQ7XG4gICAgICAgICAgICBjb250ZW50LmlkID0gYCR7bmFtZXNwYWNlfS0keysrY291bnRlcn1gO1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gbmV3IE1haW5BcmVhV2lkZ2V0KHsgY29udGVudCB9KTtcbiAgICAgICAgICAgIHdpZGdldC5hZGRDbGFzcygnanAtSGVscCcpO1xuICAgICAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICAgICAgfVxuICAgICAgICAvLyBQb3B1bGF0ZSB0aGUgSGVscCBtZW51LlxuICAgICAgICBjb25zdCBoZWxwTWVudSA9IG1haW5NZW51LmhlbHBNZW51O1xuICAgICAgICBjb25zdCByZXNvdXJjZXNHcm91cCA9IHJlc291cmNlcy5tYXAoYXJncyA9PiAoe1xuICAgICAgICAgICAgYXJncyxcbiAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMub3BlblxuICAgICAgICB9KSk7XG4gICAgICAgIGhlbHBNZW51LmFkZEdyb3VwKHJlc291cmNlc0dyb3VwLCAxMCk7XG4gICAgICAgIC8vIEdlbmVyYXRlIGEgY2FjaGUgb2YgdGhlIGtlcm5lbCBoZWxwIGxpbmtzLlxuICAgICAgICBjb25zdCBrZXJuZWxJbmZvQ2FjaGUgPSBuZXcgTWFwKCk7XG4gICAgICAgIHNlcnZpY2VNYW5hZ2VyLnNlc3Npb25zLnJ1bm5pbmdDaGFuZ2VkLmNvbm5lY3QoKG0sIHNlc3Npb25zKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAvLyBJZiBhIG5ldyBzZXNzaW9uIGhhcyBiZWVuIGFkZGVkLCBpdCBpcyBhdCB0aGUgYmFja1xuICAgICAgICAgICAgLy8gb2YgdGhlIHNlc3Npb24gbGlzdC4gSWYgb25lIGhhcyBjaGFuZ2VkIG9yIHN0b3BwZWQsXG4gICAgICAgICAgICAvLyBpdCBkb2VzIG5vdCBodXJ0IHRvIGNoZWNrIGl0LlxuICAgICAgICAgICAgaWYgKCFzZXNzaW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uTW9kZWwgPSBzZXNzaW9uc1tzZXNzaW9ucy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmICghc2Vzc2lvbk1vZGVsLmtlcm5lbCB8fFxuICAgICAgICAgICAgICAgIGtlcm5lbEluZm9DYWNoZS5oYXMoc2Vzc2lvbk1vZGVsLmtlcm5lbC5uYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHNlc3Npb24gPSBzZXJ2aWNlTWFuYWdlci5zZXNzaW9ucy5jb25uZWN0VG8oe1xuICAgICAgICAgICAgICAgIG1vZGVsOiBzZXNzaW9uTW9kZWwsXG4gICAgICAgICAgICAgICAga2VybmVsQ29ubmVjdGlvbk9wdGlvbnM6IHsgaGFuZGxlQ29tbXM6IGZhbHNlIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdm9pZCAoKF9hID0gc2Vzc2lvbi5rZXJuZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pbmZvLnRoZW4oa2VybmVsSW5mbyA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gc2Vzc2lvbi5rZXJuZWwubmFtZTtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0aGUgY2FjaGUgc2Vjb25kIHRpbWUgc28gdGhhdCwgaWYgdHdvIGNhbGxiYWNrcyBnZXQgc2NoZWR1bGVkLFxuICAgICAgICAgICAgICAgIC8vIHRoZXkgZG9uJ3QgdHJ5IHRvIGFkZCB0aGUgc2FtZSBjb21tYW5kcy5cbiAgICAgICAgICAgICAgICBpZiAoa2VybmVsSW5mb0NhY2hlLmhhcyhuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgS2VybmVsIEluZm8gY2FjaGUuXG4gICAgICAgICAgICAgICAga2VybmVsSW5mb0NhY2hlLnNldChuYW1lLCBrZXJuZWxJbmZvKTtcbiAgICAgICAgICAgICAgICAvLyBVdGlsaXR5IGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSBjdXJyZW50IHdpZGdldFxuICAgICAgICAgICAgICAgIC8vIGhhcyByZWdpc3RlcmVkIGl0c2VsZiB3aXRoIHRoZSBoZWxwIG1lbnUuXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlc0tlcm5lbCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSBhcHAuc2hlbGwuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaGVscE1lbnUua2VybmVsVXNlcnMuZm9yRWFjaCh1ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1LnRyYWNrZXIuaGFzKHdpZGdldCkgJiYgKChfYSA9IHUuZ2V0S2VybmVsKHdpZGdldCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lKSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBrZXJuZWwgYmFubmVyIHRvIHRoZSBIZWxwIE1lbnUuXG4gICAgICAgICAgICAgICAgY29uc3QgYmFubmVyQ29tbWFuZCA9IGBoZWxwLW1lbnUtJHtuYW1lfTpiYW5uZXJgO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNwZWMgPSAoX2IgPSAoX2EgPSBzZXJ2aWNlTWFuYWdlci5rZXJuZWxzcGVjcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNwZWNzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iua2VybmVsc3BlY3NbbmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKCFzcGVjKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qga2VybmVsTmFtZSA9IHNwZWMuZGlzcGxheV9uYW1lO1xuICAgICAgICAgICAgICAgIGxldCBrZXJuZWxJY29uVXJsID0gc3BlYy5yZXNvdXJjZXNbJ2xvZ28tNjR4NjQnXTtcbiAgICAgICAgICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKGJhbm5lckNvbW1hbmQsIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdBYm91dCB0aGUgJTEgS2VybmVsJywga2VybmVsTmFtZSksXG4gICAgICAgICAgICAgICAgICAgIGlzVmlzaWJsZTogdXNlc0tlcm5lbCxcbiAgICAgICAgICAgICAgICAgICAgaXNFbmFibGVkOiB1c2VzS2VybmVsLFxuICAgICAgICAgICAgICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGhlYWRlciBvZiB0aGUgYWJvdXQgZGlhbG9nXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJMb2dvID0gUmVhY3QuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7IHNyYzoga2VybmVsSWNvblVybCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImpwLUFib3V0LWhlYWRlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyTG9nbyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLUFib3V0LWhlYWRlci1pbmZvXCIgfSwga2VybmVsTmFtZSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhbm5lciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwcmVcIiwgbnVsbCwga2VybmVsSW5mby5iYW5uZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm9keSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtQWJvdXQtYm9keVwiIH0sIGJhbm5lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZy5jcmVhdGVCdXR0b24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdEaXNtaXNzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdqcC1BYm91dC1idXR0b24ganAtbW9kLXJlamVjdCBqcC1tb2Qtc3R5bGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaGVscE1lbnUuYWRkR3JvdXAoW3sgY29tbWFuZDogYmFubmVyQ29tbWFuZCB9XSwgMjApO1xuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUga2VybmVsIGluZm8gaGVscF9saW5rcyB0byB0aGUgSGVscCBtZW51LlxuICAgICAgICAgICAgICAgIGNvbnN0IGtlcm5lbEdyb3VwID0gW107XG4gICAgICAgICAgICAgICAgKGtlcm5lbEluZm8uaGVscF9saW5rcyB8fCBbXSkuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tbWFuZElkID0gYGhlbHAtbWVudS0ke25hbWV9OiR7bGluay50ZXh0fWA7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoY29tbWFuZElkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogbGluay50ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNWaXNpYmxlOiB1c2VzS2VybmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNFbmFibGVkOiB1c2VzS2VybmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kcy5leGVjdXRlKENvbW1hbmRJRHMub3BlbiwgbGluayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBrZXJuZWxHcm91cC5wdXNoKHsgY29tbWFuZDogY29tbWFuZElkIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGhlbHBNZW51LmFkZEdyb3VwKGtlcm5lbEdyb3VwLCAyMSk7XG4gICAgICAgICAgICAgICAgLy8gRGlzcG9zZSBvZiB0aGUgc2Vzc2lvbiBvYmplY3Qgc2luY2Ugd2Ugbm8gbG9uZ2VyIG5lZWQgaXQuXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMub3Blbiwge1xuICAgICAgICAgICAgbGFiZWw6IGFyZ3MgPT4gYXJnc1sndGV4dCddLFxuICAgICAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gYXJnc1sndXJsJ107XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IGFyZ3NbJ3RleHQnXTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdCcm93c2VyVGFiID0gYXJnc1snbmV3QnJvd3NlclRhYiddIHx8IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIElmIGhlbHAgcmVzb3VyY2Ugd2lsbCBnZW5lcmF0ZSBhIG1peGVkIGNvbnRlbnQgZXJyb3IsIGxvYWQgZXh0ZXJuYWxseS5cbiAgICAgICAgICAgICAgICBpZiAobmV3QnJvd3NlclRhYiB8fFxuICAgICAgICAgICAgICAgICAgICAoTEFCX0lTX1NFQ1VSRSAmJiBVUkxFeHQucGFyc2UodXJsKS5wcm90b2NvbCAhPT0gJ2h0dHBzOicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHVybCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gbmV3SGVscFdpZGdldCh1cmwsIHRleHQpO1xuICAgICAgICAgICAgICAgIHZvaWQgdHJhY2tlci5hZGQod2lkZ2V0KTtcbiAgICAgICAgICAgICAgICBzaGVsbC5hZGQod2lkZ2V0LCAnbWFpbicpO1xuICAgICAgICAgICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocGFsZXR0ZSkge1xuICAgICAgICAgICAgcmVzb3VyY2VzLmZvckVhY2goYXJncyA9PiB7XG4gICAgICAgICAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHsgYXJncywgY29tbWFuZDogQ29tbWFuZElEcy5vcGVuLCBjYXRlZ29yeSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHtcbiAgICAgICAgICAgICAgICBhcmdzOiB7IHJlbG9hZDogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdhcHB1dGlsczpyZXNldCcsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcbi8qKlxuICogQSBwbHVnaW4gdG8gYWRkIGEgbGljZW5zZXMgcmVwb3J0aW5nIHRvb2xzLlxuICovXG5jb25zdCBsaWNlbnNlcyA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2hlbHAtZXh0ZW5zaW9uOmxpY2Vuc2VzJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtJTWFpbk1lbnUsIElDb21tYW5kUGFsZXR0ZSwgSUxheW91dFJlc3RvcmVyXSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgdHJhbnNsYXRvciwgbWVudSwgcGFsZXR0ZSwgcmVzdG9yZXIpID0+IHtcbiAgICAgICAgLy8gYmFpbCBpZiBubyBsaWNlbnNlIEFQSSBpcyBhdmFpbGFibGUgZnJvbSB0aGUgc2VydmVyXG4gICAgICAgIGlmICghUGFnZUNvbmZpZy5nZXRPcHRpb24oJ2xpY2Vuc2VzVXJsJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IGNvbW1hbmRzLCBzaGVsbCB9ID0gYXBwO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICAvLyB0cmFuc2xhdGlvbiBzdHJpbmdzXG4gICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gdHJhbnMuX18oJ0hlbHAnKTtcbiAgICAgICAgY29uc3QgZG93bmxvYWRBc1RleHQgPSB0cmFucy5fXygnRG93bmxvYWQgQWxsIExpY2Vuc2VzIGFzJyk7XG4gICAgICAgIGNvbnN0IGxpY2Vuc2VzVGV4dCA9IHRyYW5zLl9fKCdMaWNlbnNlcycpO1xuICAgICAgICBjb25zdCByZWZyZXNoTGljZW5zZXMgPSB0cmFucy5fXygnUmVmcmVzaCBMaWNlbnNlcycpO1xuICAgICAgICAvLyBhbiBpbmNyZW1lbnRlciBmb3IgbGljZW5zZSB3aWRnZXQgaWRzXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAgICAgY29uc3QgbGljZW5zZXNVcmwgPSBVUkxFeHQuam9pbihQYWdlQ29uZmlnLmdldEJhc2VVcmwoKSwgUGFnZUNvbmZpZy5nZXRPcHRpb24oJ2xpY2Vuc2VzVXJsJykpICsgJy8nO1xuICAgICAgICBjb25zdCBsaWNlbnNlc05hbWVzcGFjZSA9ICdoZWxwLWxpY2Vuc2VzJztcbiAgICAgICAgY29uc3QgbGljZW5zZXNUcmFja2VyID0gbmV3IFdpZGdldFRyYWNrZXIoe1xuICAgICAgICAgICAgbmFtZXNwYWNlOiBsaWNlbnNlc05hbWVzcGFjZVxuICAgICAgICB9KTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBhIGZ1bGwgbGljZW5zZSByZXBvcnQgZm9ybWF0IGJhc2VkIG9uIGEgZm9ybWF0IG5hbWVcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGZvcm1hdE9yRGVmYXVsdChmb3JtYXQpIHtcbiAgICAgICAgICAgIHJldHVybiAoTGljZW5zZXMuUkVQT1JUX0ZPUk1BVFNbZm9ybWF0XSB8fFxuICAgICAgICAgICAgICAgIExpY2Vuc2VzLlJFUE9SVF9GT1JNQVRTW0xpY2Vuc2VzLkRFRkFVTFRfRk9STUFUXSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhIE1haW5BcmVhV2lkZ2V0IGZvciBhIGxpY2Vuc2Ugdmlld2VyXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBjcmVhdGVMaWNlbnNlV2lkZ2V0KGFyZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpY2Vuc2VzTW9kZWwgPSBuZXcgTGljZW5zZXMuTW9kZWwoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBhcmdzKSwgeyBsaWNlbnNlc1VybCxcbiAgICAgICAgICAgICAgICB0cmFucywgc2VydmVyU2V0dGluZ3M6IGFwcC5zZXJ2aWNlTWFuYWdlci5zZXJ2ZXJTZXR0aW5ncyB9KSk7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gbmV3IExpY2Vuc2VzKHsgbW9kZWw6IGxpY2Vuc2VzTW9kZWwgfSk7XG4gICAgICAgICAgICBjb250ZW50LmlkID0gYCR7bGljZW5zZXNOYW1lc3BhY2V9LSR7Kytjb3VudGVyfWA7XG4gICAgICAgICAgICBjb250ZW50LnRpdGxlLmxhYmVsID0gbGljZW5zZXNUZXh0O1xuICAgICAgICAgICAgY29udGVudC50aXRsZS5pY29uID0gY29weXJpZ2h0SWNvbjtcbiAgICAgICAgICAgIGNvbnN0IG1haW4gPSBuZXcgTWFpbkFyZWFXaWRnZXQoe1xuICAgICAgICAgICAgICAgIGNvbnRlbnQsXG4gICAgICAgICAgICAgICAgcmV2ZWFsOiBsaWNlbnNlc01vZGVsLmxpY2Vuc2VzUmVhZHlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWFpbi50b29sYmFyLmFkZEl0ZW0oJ3JlZnJlc2gtbGljZW5zZXMnLCBuZXcgQ29tbWFuZFRvb2xiYXJCdXR0b24oe1xuICAgICAgICAgICAgICAgIGlkOiBDb21tYW5kSURzLnJlZnJlc2hMaWNlbnNlcyxcbiAgICAgICAgICAgICAgICBhcmdzOiB7IG5vTGFiZWw6IDEgfSxcbiAgICAgICAgICAgICAgICBjb21tYW5kc1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgbWFpbi50b29sYmFyLmFkZEl0ZW0oJ3NwYWNlcicsIFRvb2xiYXIuY3JlYXRlU3BhY2VySXRlbSgpKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZm9ybWF0IG9mIE9iamVjdC5rZXlzKExpY2Vuc2VzLlJFUE9SVF9GT1JNQVRTKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IG5ldyBDb21tYW5kVG9vbGJhckJ1dHRvbih7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBDb21tYW5kSURzLmxpY2Vuc2VSZXBvcnQsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IHsgZm9ybWF0LCBub0xhYmVsOiAxIH0sXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbWFpbi50b29sYmFyLmFkZEl0ZW0oYGRvd25sb2FkLSR7Zm9ybWF0fWAsIGJ1dHRvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWFpbjtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWdpc3RlciBsaWNlbnNlLXJlbGF0ZWQgY29tbWFuZHNcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmxpY2Vuc2VzLCB7XG4gICAgICAgICAgICBsYWJlbDogbGljZW5zZXNUZXh0LFxuICAgICAgICAgICAgZXhlY3V0ZTogKGFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaWNlbnNlTWFpbiA9IGNyZWF0ZUxpY2Vuc2VXaWRnZXQoYXJncyk7XG4gICAgICAgICAgICAgICAgc2hlbGwuYWRkKGxpY2Vuc2VNYWluLCAnbWFpbicpO1xuICAgICAgICAgICAgICAgIC8vIGFkZCB0byB0cmFja2VyIHNvIGl0IGNhbiBiZSByZXN0b3JlZCwgYW5kIHVwZGF0ZSB3aGVuIGNob2ljZXMgY2hhbmdlXG4gICAgICAgICAgICAgICAgdm9pZCBsaWNlbnNlc1RyYWNrZXIuYWRkKGxpY2Vuc2VNYWluKTtcbiAgICAgICAgICAgICAgICBsaWNlbnNlTWFpbi5jb250ZW50Lm1vZGVsLnRyYWNrZXJEYXRhQ2hhbmdlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBsaWNlbnNlc1RyYWNrZXIuc2F2ZShsaWNlbnNlTWFpbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpY2Vuc2VNYWluO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnJlZnJlc2hMaWNlbnNlcywge1xuICAgICAgICAgICAgbGFiZWw6IGFyZ3MgPT4gKGFyZ3Mubm9MYWJlbCA/ICcnIDogcmVmcmVzaExpY2Vuc2VzKSxcbiAgICAgICAgICAgIGNhcHRpb246IHJlZnJlc2hMaWNlbnNlcyxcbiAgICAgICAgICAgIGljb246IHJlZnJlc2hJY29uLFxuICAgICAgICAgICAgZXhlY3V0ZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9hID0gbGljZW5zZXNUcmFja2VyLmN1cnJlbnRXaWRnZXQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb250ZW50Lm1vZGVsLmluaXRMaWNlbnNlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmxpY2Vuc2VSZXBvcnQsIHtcbiAgICAgICAgICAgIGxhYmVsOiBhcmdzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5ub0xhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0ID0gZm9ybWF0T3JEZWZhdWx0KGAke2FyZ3MuZm9ybWF0fWApO1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHtkb3dubG9hZEFzVGV4dH0gJHtmb3JtYXQudGl0bGV9YDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYXB0aW9uOiBhcmdzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXQgPSBmb3JtYXRPckRlZmF1bHQoYCR7YXJncy5mb3JtYXR9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke2Rvd25sb2FkQXNUZXh0fSAke2Zvcm1hdC50aXRsZX1gO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGljb246IGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IGZvcm1hdE9yRGVmYXVsdChgJHthcmdzLmZvcm1hdH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0Lmljb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXhlY3V0ZTogYXN5bmMgKGFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0ID0gZm9ybWF0T3JEZWZhdWx0KGAke2FyZ3MuZm9ybWF0fWApO1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCAoKF9hID0gbGljZW5zZXNUcmFja2VyLmN1cnJlbnRXaWRnZXQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb250ZW50Lm1vZGVsLmRvd25sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBmb3JtYXQuaWRcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBoYW5kbGUgb3B0aW9uYWwgaW50ZWdyYXRpb25zXG4gICAgICAgIGlmIChwYWxldHRlKSB7XG4gICAgICAgICAgICBwYWxldHRlLmFkZEl0ZW0oeyBjb21tYW5kOiBDb21tYW5kSURzLmxpY2Vuc2VzLCBjYXRlZ29yeSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVudSkge1xuICAgICAgICAgICAgY29uc3QgaGVscE1lbnUgPSBtZW51LmhlbHBNZW51O1xuICAgICAgICAgICAgaGVscE1lbnUuYWRkR3JvdXAoW3sgY29tbWFuZDogQ29tbWFuZElEcy5saWNlbnNlcyB9XSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3RvcmVyKSB7XG4gICAgICAgICAgICB2b2lkIHJlc3RvcmVyLnJlc3RvcmUobGljZW5zZXNUcmFja2VyLCB7XG4gICAgICAgICAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy5saWNlbnNlcyxcbiAgICAgICAgICAgICAgICBuYW1lOiB3aWRnZXQgPT4gJ2xpY2Vuc2VzJyxcbiAgICAgICAgICAgICAgICBhcmdzOiB3aWRnZXQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGN1cnJlbnRCdW5kbGVOYW1lLCBjdXJyZW50UGFja2FnZUluZGV4LCBwYWNrYWdlRmlsdGVyIH0gPSB3aWRnZXQuY29udGVudC5tb2RlbDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRCdW5kbGVOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFBhY2thZ2VJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhY2thZ2VGaWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFyZ3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuY29uc3QgcGx1Z2lucyA9IFtcbiAgICBhYm91dCxcbiAgICBsYXVuY2hDbGFzc2ljLFxuICAgIGp1cHl0ZXJGb3J1bSxcbiAgICByZXNvdXJjZXMsXG4gICAgbGljZW5zZXNcbl07XG5leHBvcnQgZGVmYXVsdCBwbHVnaW5zO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgVkRvbU1vZGVsLCBWRG9tUmVuZGVyZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBTZXJ2ZXJDb25uZWN0aW9uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvc2VydmljZXMnO1xuaW1wb3J0IHsganNvbkljb24sIG1hcmtkb3duSWNvbiwgc3ByZWFkc2hlZXRJY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyBQcm9taXNlRGVsZWdhdGUgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG5pbXBvcnQgeyBoIH0gZnJvbSAnQGx1bWluby92aXJ0dWFsZG9tJztcbmltcG9ydCB7IFBhbmVsLCBTcGxpdFBhbmVsLCBUYWJCYXIsIFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG4vKipcbiAqIEEgbGljZW5zZSB2aWV3ZXJcbiAqL1xuZXhwb3J0IGNsYXNzIExpY2Vuc2VzIGV4dGVuZHMgU3BsaXRQYW5lbCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1MaWNlbnNlcycpO1xuICAgICAgICB0aGlzLm1vZGVsID0gb3B0aW9ucy5tb2RlbDtcbiAgICAgICAgdGhpcy5pbml0TGVmdFBhbmVsKCk7XG4gICAgICAgIHRoaXMuaW5pdEZpbHRlcnMoKTtcbiAgICAgICAgdGhpcy5pbml0QnVuZGxlcygpO1xuICAgICAgICB0aGlzLmluaXRHcmlkKCk7XG4gICAgICAgIHRoaXMuaW5pdExpY2Vuc2VUZXh0KCk7XG4gICAgICAgIHRoaXMuc2V0UmVsYXRpdmVTaXplcyhbMSwgMiwgM10pO1xuICAgICAgICB2b2lkIHRoaXMubW9kZWwuaW5pdExpY2Vuc2VzKCkudGhlbigoKSA9PiB0aGlzLl91cGRhdGVCdW5kbGVzKCkpO1xuICAgICAgICB0aGlzLm1vZGVsLnRyYWNrZXJEYXRhQ2hhbmdlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGl0bGUubGFiZWwgPSB0aGlzLm1vZGVsLnRpdGxlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGRpc3Bvc2luZyBvZiB0aGUgd2lkZ2V0XG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2J1bmRsZXMuY3VycmVudENoYW5nZWQuZGlzY29ubmVjdCh0aGlzLm9uQnVuZGxlU2VsZWN0ZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLm1vZGVsLmRpc3Bvc2UoKTtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBsZWZ0IGFyZWEgZm9yIGZpbHRlcnMgYW5kIGJ1bmRsZXNcbiAgICAgKi9cbiAgICBpbml0TGVmdFBhbmVsKCkge1xuICAgICAgICB0aGlzLl9sZWZ0UGFuZWwgPSBuZXcgUGFuZWwoKTtcbiAgICAgICAgdGhpcy5fbGVmdFBhbmVsLmFkZENsYXNzKCdqcC1MaWNlbnNlcy1Gb3JtQXJlYScpO1xuICAgICAgICB0aGlzLmFkZFdpZGdldCh0aGlzLl9sZWZ0UGFuZWwpO1xuICAgICAgICBTcGxpdFBhbmVsLnNldFN0cmV0Y2godGhpcy5fbGVmdFBhbmVsLCAxKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgZmlsdGVyc1xuICAgICAqL1xuICAgIGluaXRGaWx0ZXJzKCkge1xuICAgICAgICB0aGlzLl9maWx0ZXJzID0gbmV3IExpY2Vuc2VzLkZpbHRlcnModGhpcy5tb2RlbCk7XG4gICAgICAgIFNwbGl0UGFuZWwuc2V0U3RyZXRjaCh0aGlzLl9maWx0ZXJzLCAxKTtcbiAgICAgICAgdGhpcy5fbGVmdFBhbmVsLmFkZFdpZGdldCh0aGlzLl9maWx0ZXJzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgbGlzdGluZyBvZiBhdmFpbGFibGUgYnVuZGxlc1xuICAgICAqL1xuICAgIGluaXRCdW5kbGVzKCkge1xuICAgICAgICB0aGlzLl9idW5kbGVzID0gbmV3IFRhYkJhcih7XG4gICAgICAgICAgICBvcmllbnRhdGlvbjogJ3ZlcnRpY2FsJyxcbiAgICAgICAgICAgIHJlbmRlcmVyOiBuZXcgTGljZW5zZXMuQnVuZGxlVGFiUmVuZGVyZXIodGhpcy5tb2RlbClcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2J1bmRsZXMuYWRkQ2xhc3MoJ2pwLUxpY2Vuc2VzLUJ1bmRsZXMnKTtcbiAgICAgICAgU3BsaXRQYW5lbC5zZXRTdHJldGNoKHRoaXMuX2J1bmRsZXMsIDEpO1xuICAgICAgICB0aGlzLl9sZWZ0UGFuZWwuYWRkV2lkZ2V0KHRoaXMuX2J1bmRsZXMpO1xuICAgICAgICB0aGlzLl9idW5kbGVzLmN1cnJlbnRDaGFuZ2VkLmNvbm5lY3QodGhpcy5vbkJ1bmRsZVNlbGVjdGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5tb2RlbC5zdGF0ZUNoYW5nZWQuY29ubmVjdCgoKSA9PiB0aGlzLl9idW5kbGVzLnVwZGF0ZSgpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgbGlzdGluZyBvZiBwYWNrYWdlcyB3aXRoaW4gdGhlIGN1cnJlbnQgYnVuZGxlXG4gICAgICovXG4gICAgaW5pdEdyaWQoKSB7XG4gICAgICAgIHRoaXMuX2dyaWQgPSBuZXcgTGljZW5zZXMuR3JpZCh0aGlzLm1vZGVsKTtcbiAgICAgICAgU3BsaXRQYW5lbC5zZXRTdHJldGNoKHRoaXMuX2dyaWQsIDEpO1xuICAgICAgICB0aGlzLmFkZFdpZGdldCh0aGlzLl9ncmlkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgZnVsbCB0ZXh0IG9mIHRoZSBjdXJyZW50IHBhY2thZ2VcbiAgICAgKi9cbiAgICBpbml0TGljZW5zZVRleHQoKSB7XG4gICAgICAgIHRoaXMuX2xpY2Vuc2VUZXh0ID0gbmV3IExpY2Vuc2VzLkZ1bGxUZXh0KHRoaXMubW9kZWwpO1xuICAgICAgICBTcGxpdFBhbmVsLnNldFN0cmV0Y2godGhpcy5fZ3JpZCwgMSk7XG4gICAgICAgIHRoaXMuYWRkV2lkZ2V0KHRoaXMuX2xpY2Vuc2VUZXh0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXZlbnQgaGFuZGxlciBmb3IgdXBkYXRpbmcgdGhlIG1vZGVsIHdpdGggdGhlIGN1cnJlbnQgYnVuZGxlXG4gICAgICovXG4gICAgb25CdW5kbGVTZWxlY3RlZCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoKF9hID0gdGhpcy5fYnVuZGxlcy5jdXJyZW50VGl0bGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5jdXJyZW50QnVuZGxlTmFtZSA9IHRoaXMuX2J1bmRsZXMuY3VycmVudFRpdGxlLmxhYmVsO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgYnVuZGxlIHRhYnMuXG4gICAgICovXG4gICAgX3VwZGF0ZUJ1bmRsZXMoKSB7XG4gICAgICAgIHRoaXMuX2J1bmRsZXMuY2xlYXJUYWJzKCk7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50QnVuZGxlTmFtZSB9ID0gdGhpcy5tb2RlbDtcbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgYnVuZGxlIG9mIHRoaXMubW9kZWwuYnVuZGxlTmFtZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhYiA9IG5ldyBXaWRnZXQoKTtcbiAgICAgICAgICAgIHRhYi50aXRsZS5sYWJlbCA9IGJ1bmRsZTtcbiAgICAgICAgICAgIGlmIChidW5kbGUgPT09IGN1cnJlbnRCdW5kbGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2J1bmRsZXMuaW5zZXJ0VGFiKCsraSwgdGFiLnRpdGxlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9idW5kbGVzLmN1cnJlbnRJbmRleCA9IGN1cnJlbnRJbmRleDtcbiAgICB9XG59XG4vKiogQSBuYW1lc3BhY2UgZm9yIGxpY2Vuc2UgY29tcG9uZW50cyAqL1xuKGZ1bmN0aW9uIChMaWNlbnNlcykge1xuICAgIC8qKlxuICAgICAqIExpY2Vuc2UgcmVwb3J0IGZvcm1hdHMgdW5kZXJzdG9vZCBieSB0aGUgc2VydmVyIChvbmNlIGxvd2VyLWNhc2VkKVxuICAgICAqL1xuICAgIExpY2Vuc2VzLlJFUE9SVF9GT1JNQVRTID0ge1xuICAgICAgICBtYXJrZG93bjoge1xuICAgICAgICAgICAgaWQ6ICdtYXJrZG93bicsXG4gICAgICAgICAgICB0aXRsZTogJ01hcmtkb3duJyxcbiAgICAgICAgICAgIGljb246IG1hcmtkb3duSWNvblxuICAgICAgICB9LFxuICAgICAgICBjc3Y6IHtcbiAgICAgICAgICAgIGlkOiAnY3N2JyxcbiAgICAgICAgICAgIHRpdGxlOiAnQ1NWJyxcbiAgICAgICAgICAgIGljb246IHNwcmVhZHNoZWV0SWNvblxuICAgICAgICB9LFxuICAgICAgICBqc29uOiB7XG4gICAgICAgICAgICBpZDogJ2NzdicsXG4gICAgICAgICAgICB0aXRsZTogJ0pTT04nLFxuICAgICAgICAgICAgaWNvbjoganNvbkljb25cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgZm9ybWF0IChtb3N0IGh1bWFuLXJlYWRhYmxlKVxuICAgICAqL1xuICAgIExpY2Vuc2VzLkRFRkFVTFRfRk9STUFUID0gJ21hcmtkb3duJztcbiAgICAvKipcbiAgICAgKiBBIG1vZGVsIGZvciBsaWNlbnNlIGRhdGFcbiAgICAgKi9cbiAgICBjbGFzcyBNb2RlbCBleHRlbmRzIFZEb21Nb2RlbCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZFBhY2thZ2VDaGFuZ2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX3RyYWNrZXJEYXRhQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50UGFja2FnZUluZGV4ID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2xpY2Vuc2VzUmVhZHkgPSBuZXcgUHJvbWlzZURlbGVnYXRlKCk7XG4gICAgICAgICAgICB0aGlzLl9wYWNrYWdlRmlsdGVyID0ge307XG4gICAgICAgICAgICB0aGlzLl90cmFucyA9IG9wdGlvbnMudHJhbnM7XG4gICAgICAgICAgICB0aGlzLl9saWNlbnNlc1VybCA9IG9wdGlvbnMubGljZW5zZXNVcmw7XG4gICAgICAgICAgICB0aGlzLl9zZXJ2ZXJTZXR0aW5ncyA9XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5zZXJ2ZXJTZXR0aW5ncyB8fCBTZXJ2ZXJDb25uZWN0aW9uLm1ha2VTZXR0aW5ncygpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY3VycmVudEJ1bmRsZU5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50QnVuZGxlTmFtZSA9IG9wdGlvbnMuY3VycmVudEJ1bmRsZU5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5wYWNrYWdlRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFja2FnZUZpbHRlciA9IG9wdGlvbnMucGFja2FnZUZpbHRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmN1cnJlbnRQYWNrYWdlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50UGFja2FnZUluZGV4ID0gb3B0aW9ucy5jdXJyZW50UGFja2FnZUluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgdGhlIGluaXRpYWwgcmVxdWVzdCBmb3IgdGhlIGxpY2Vuc2VzIGZyb20gdGhlIHNlcnZlci5cbiAgICAgICAgICovXG4gICAgICAgIGFzeW5jIGluaXRMaWNlbnNlcygpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBTZXJ2ZXJDb25uZWN0aW9uLm1ha2VSZXF1ZXN0KHRoaXMuX2xpY2Vuc2VzVXJsLCB7fSwgdGhpcy5fc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZlclJlc3BvbnNlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xpY2Vuc2VzUmVhZHkucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9saWNlbnNlc1JlYWR5LnJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgYSB0ZW1wb3JhcnkgZG93bmxvYWQgbGluaywgYW5kIGVtdWxhdGUgY2xpY2tpbmcgaXQgdG8gdHJpZ2dlciBhIG5hbWVkXG4gICAgICAgICAqIGZpbGUgZG93bmxvYWQuXG4gICAgICAgICAqL1xuICAgICAgICBhc3luYyBkb3dubG9hZChvcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLl9saWNlbnNlc1VybH0/Zm9ybWF0PSR7b3B0aW9ucy5mb3JtYXR9JmRvd25sb2FkPTFgO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgIGVsZW1lbnQuaHJlZiA9IHVybDtcbiAgICAgICAgICAgIGVsZW1lbnQuZG93bmxvYWQgPSAnJztcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgICAgICBlbGVtZW50LmNsaWNrKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbGljZW5zZXMgZnJvbSB0aGUgc2VydmVyIGNoYW5nZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IHNlbGVjdGVkUGFja2FnZUNoYW5nZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRQYWNrYWdlQ2hhbmdlZDtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgdHJhY2thYmxlIGRhdGEgY2hhbmdlc1xuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IHRyYWNrZXJEYXRhQ2hhbmdlZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90cmFja2VyRGF0YUNoYW5nZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBuYW1lcyBvZiB0aGUgbGljZW5zZSBidW5kbGVzIGF2YWlsYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IGJ1bmRsZU5hbWVzKCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKCgoX2EgPSB0aGlzLl9zZXJ2ZXJSZXNwb25zZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmJ1bmRsZXMpIHx8IHt9KTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGN1cnJlbnQgbGljZW5zZSBidW5kbGVcbiAgICAgICAgICovXG4gICAgICAgIGdldCBjdXJyZW50QnVuZGxlTmFtZSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50QnVuZGxlTmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50QnVuZGxlTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmJ1bmRsZU5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1bmRsZU5hbWVzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGUgY3VycmVudCBsaWNlbnNlIGJ1bmRsZSwgYW5kIHJlc2V0IHRoZSBzZWxlY3RlZCBpbmRleFxuICAgICAgICAgKi9cbiAgICAgICAgc2V0IGN1cnJlbnRCdW5kbGVOYW1lKGN1cnJlbnRCdW5kbGVOYW1lKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudEJ1bmRsZU5hbWUgIT09IGN1cnJlbnRCdW5kbGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudEJ1bmRsZU5hbWUgPSBjdXJyZW50QnVuZGxlTmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhY2tlckRhdGFDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbGljZW5zZXMgYXJlIGF2YWlsYWJsZSBmcm9tIHRoZSBzZXJ2ZXJcbiAgICAgICAgICovXG4gICAgICAgIGdldCBsaWNlbnNlc1JlYWR5KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpY2Vuc2VzUmVhZHkucHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQWxsIHRoZSBsaWNlbnNlIGJ1bmRsZXMsIGtleWVkIGJ5IHRoZSBkaXN0cmlidXRpbmcgcGFja2FnZXNcbiAgICAgICAgICovXG4gICAgICAgIGdldCBidW5kbGVzKCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuICgoX2EgPSB0aGlzLl9zZXJ2ZXJSZXNwb25zZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmJ1bmRsZXMpIHx8IHt9O1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaW5kZXggb2YgdGhlIGN1cnJlbnRseS1zZWxlY3RlZCBwYWNrYWdlIHdpdGhpbiBpdHMgbGljZW5zZSBidW5kbGVcbiAgICAgICAgICovXG4gICAgICAgIGdldCBjdXJyZW50UGFja2FnZUluZGV4KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQYWNrYWdlSW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVwZGF0ZSB0aGUgY3VycmVudGx5LXNlbGVjdGVkIHBhY2thZ2Ugd2l0aGluIGl0cyBsaWNlbnNlIGJ1bmRsZVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0IGN1cnJlbnRQYWNrYWdlSW5kZXgoY3VycmVudFBhY2thZ2VJbmRleCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRQYWNrYWdlSW5kZXggPT09IGN1cnJlbnRQYWNrYWdlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50UGFja2FnZUluZGV4ID0gY3VycmVudFBhY2thZ2VJbmRleDtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkUGFja2FnZUNoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgICAgICAgICAgdGhpcy5fdHJhY2tlckRhdGFDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGxpY2Vuc2UgZGF0YSBmb3IgdGhlIGN1cnJlbnRseS1zZWxlY3RlZCBwYWNrYWdlXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgY3VycmVudFBhY2thZ2UoKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50QnVuZGxlTmFtZSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuYnVuZGxlcyAmJlxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQYWNrYWdlSW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpbHRlcmVkUGFja2FnZXMoKChfYSA9IHRoaXMuYnVuZGxlc1t0aGlzLmN1cnJlbnRCdW5kbGVOYW1lXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBhY2thZ2VzKSB8fCBbXSlbdGhpcy5fY3VycmVudFBhY2thZ2VJbmRleF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQSB0cmFuc2xhdGlvbiBidW5kbGVcbiAgICAgICAgICovXG4gICAgICAgIGdldCB0cmFucygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90cmFucztcbiAgICAgICAgfVxuICAgICAgICBnZXQgdGl0bGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5fY3VycmVudEJ1bmRsZU5hbWUgfHwgJyd9ICR7dGhpcy5fdHJhbnMuX18oJ0xpY2Vuc2VzJyl9YC50cmltKCk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjdXJyZW50IHBhY2thZ2UgZmlsdGVyXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgcGFja2FnZUZpbHRlcigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYWNrYWdlRmlsdGVyO1xuICAgICAgICB9XG4gICAgICAgIHNldCBwYWNrYWdlRmlsdGVyKHBhY2thZ2VGaWx0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhY2thZ2VGaWx0ZXIgPSBwYWNrYWdlRmlsdGVyO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgICAgICAgICAgdGhpcy5fdHJhY2tlckRhdGFDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGZpbHRlcmVkIHBhY2thZ2VzIGZyb20gY3VycmVudCBidW5kbGUgd2hlcmUgYXQgbGVhc3Qgb25lIHRva2VuIG9mIGVhY2hcbiAgICAgICAgICoga2V5IGlzIHByZXNlbnQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXRGaWx0ZXJlZFBhY2thZ2VzKGFsbFJvd3MpIHtcbiAgICAgICAgICAgIGxldCByb3dzID0gW107XG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9IE9iamVjdC5lbnRyaWVzKHRoaXMuX3BhY2thZ2VGaWx0ZXIpXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoW2ssIHZdKSA9PiB2ICYmIGAke3Z9YC50cmltKCkubGVuZ3RoKVxuICAgICAgICAgICAgICAgIC5tYXAoKFtrLCB2XSkgPT4gW2ssIGAke3Z9YC50b0xvd2VyQ2FzZSgpLnRyaW0oKS5zcGxpdCgnICcpXSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJvdyBvZiBhbGxSb3dzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleUhpdHMgPSAwO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgW2tleSwgYml0c10gb2YgZmlsdGVycykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYml0SGl0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dLZXlWYWx1ZSA9IGAke3Jvd1trZXldfWAudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBiaXQgb2YgYml0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvd0tleVZhbHVlLmluY2x1ZGVzKGJpdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaXRIaXRzICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGJpdEhpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleUhpdHMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoa2V5SGl0cyA9PT0gZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC52YWx1ZXMocm93cyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgTGljZW5zZXMuTW9kZWwgPSBNb2RlbDtcbiAgICAvKipcbiAgICAgKiBBIGZpbHRlciBmb3JtIGZvciBsaW1pdGluZyB0aGUgcGFja2FnZXMgZGlzcGxheWVkXG4gICAgICovXG4gICAgY2xhc3MgRmlsdGVycyBleHRlbmRzIFZEb21SZW5kZXJlciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKG1vZGVsKSB7XG4gICAgICAgICAgICBzdXBlcihtb2RlbCk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlbmRlciBhIGZpbHRlciBpbnB1dFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnJlbmRlckZpbHRlciA9IChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMubW9kZWwucGFja2FnZUZpbHRlcltrZXldIHx8ICcnO1xuICAgICAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIsIG5hbWU6IGtleSwgZGVmYXVsdFZhbHVlOiB2YWx1ZSwgY2xhc3NOYW1lOiBcImpwLW1vZC1zdHlsZWRcIiwgb25JbnB1dDogdGhpcy5vbkZpbHRlcklucHV0IH0pKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEhhbmRsZSBhIGZpbHRlciBpbnB1dCBjaGFuZ2luZ1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLm9uRmlsdGVySW5wdXQgPSAoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBldnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG5hbWUsIHZhbHVlIH0gPSBpbnB1dDtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnBhY2thZ2VGaWx0ZXIgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMubW9kZWwucGFja2FnZUZpbHRlciksIHsgW25hbWVdOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1MaWNlbnNlcy1GaWx0ZXJzJyk7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1SZW5kZXJlZEhUTUxDb21tb24nKTtcbiAgICAgICAgfVxuICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgICBjb25zdCB7IHRyYW5zIH0gPSB0aGlzLm1vZGVsO1xuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdHJvbmdcIiwgbnVsbCwgdHJhbnMuX18oJ0ZpbHRlciBMaWNlbnNlcyBCeScpKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIHRyYW5zLl9fKCdQYWNrYWdlJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJGaWx0ZXIoJ25hbWUnKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIHRyYW5zLl9fKCdWZXJzaW9uJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJGaWx0ZXIoJ3ZlcnNpb25JbmZvJykpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCB0cmFucy5fXygnTGljZW5zZScpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyRmlsdGVyKCdsaWNlbnNlSWQnKSkpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3Ryb25nXCIsIG51bGwsIHRyYW5zLl9fKCdEaXN0cmlidXRpb25zJykpKSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIExpY2Vuc2VzLkZpbHRlcnMgPSBGaWx0ZXJzO1xuICAgIC8qKlxuICAgICAqIEEgZmFuY3kgYnVuZGxlIHJlbmRlcmVyIHdpdGggdGhlIHBhY2thZ2UgY291bnRcbiAgICAgKi9cbiAgICBjbGFzcyBCdW5kbGVUYWJSZW5kZXJlciBleHRlbmRzIFRhYkJhci5SZW5kZXJlciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKG1vZGVsKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZUljb25TZWxlY3RvciA9ICcubG0tVGFiQmFyLXRhYkNsb3NlSWNvbic7XG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbmRlciBhIGZ1bGwgYnVuZGxlXG4gICAgICAgICAqL1xuICAgICAgICByZW5kZXJUYWIoZGF0YSkge1xuICAgICAgICAgICAgbGV0IHRpdGxlID0gZGF0YS50aXRsZS5jYXB0aW9uO1xuICAgICAgICAgICAgbGV0IGtleSA9IHRoaXMuY3JlYXRlVGFiS2V5KGRhdGEpO1xuICAgICAgICAgICAgbGV0IHN0eWxlID0gdGhpcy5jcmVhdGVUYWJTdHlsZShkYXRhKTtcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSB0aGlzLmNyZWF0ZVRhYkNsYXNzKGRhdGEpO1xuICAgICAgICAgICAgbGV0IGRhdGFzZXQgPSB0aGlzLmNyZWF0ZVRhYkRhdGFzZXQoZGF0YSk7XG4gICAgICAgICAgICByZXR1cm4gaC5saSh7IGtleSwgY2xhc3NOYW1lLCB0aXRsZSwgc3R5bGUsIGRhdGFzZXQgfSwgdGhpcy5yZW5kZXJJY29uKGRhdGEpLCB0aGlzLnJlbmRlckxhYmVsKGRhdGEpLCB0aGlzLnJlbmRlckNvdW50QmFkZ2UoZGF0YSkpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW5kZXIgdGhlIHBhY2thZ2UgY291bnRcbiAgICAgICAgICovXG4gICAgICAgIHJlbmRlckNvdW50QmFkZ2UoZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgYnVuZGxlID0gZGF0YS50aXRsZS5sYWJlbDtcbiAgICAgICAgICAgIGNvbnN0IHsgYnVuZGxlcyB9ID0gdGhpcy5tb2RlbDtcbiAgICAgICAgICAgIGNvbnN0IHBhY2thZ2VzID0gdGhpcy5tb2RlbC5nZXRGaWx0ZXJlZFBhY2thZ2VzKChidW5kbGVzICYmIGJ1bmRsZSA/IGJ1bmRsZXNbYnVuZGxlXS5wYWNrYWdlcyA6IFtdKSB8fCBbXSk7XG4gICAgICAgICAgICByZXR1cm4gaC5sYWJlbCh7fSwgYCR7cGFja2FnZXMubGVuZ3RofWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIExpY2Vuc2VzLkJ1bmRsZVRhYlJlbmRlcmVyID0gQnVuZGxlVGFiUmVuZGVyZXI7XG4gICAgLyoqXG4gICAgICogQSBncmlkIG9mIGxpY2Vuc2VzXG4gICAgICovXG4gICAgY2xhc3MgR3JpZCBleHRlbmRzIFZEb21SZW5kZXJlciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKG1vZGVsKSB7XG4gICAgICAgICAgICBzdXBlcihtb2RlbCk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlbmRlciBhIHNpbmdsZSBwYWNrYWdlJ3MgbGljZW5zZSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnJlbmRlclJvdyA9IChyb3csIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBpbmRleCA9PT0gdGhpcy5tb2RlbC5jdXJyZW50UGFja2FnZUluZGV4O1xuICAgICAgICAgICAgICAgIGNvbnN0IG9uQ2hlY2sgPSAoKSA9PiAodGhpcy5tb2RlbC5jdXJyZW50UGFja2FnZUluZGV4ID0gaW5kZXgpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIHsga2V5OiByb3cubmFtZSwgY2xhc3NOYW1lOiBzZWxlY3RlZCA/ICdqcC1tb2Qtc2VsZWN0ZWQnIDogJycsIG9uQ2xpY2s6IG9uQ2hlY2sgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyB0eXBlOiBcInJhZGlvXCIsIG5hbWU6IFwic2hvdy1wYWNrYWdlLWxpY2Vuc2VcIiwgdmFsdWU6IGluZGV4LCBvbkNoYW5nZTogb25DaGVjaywgY2hlY2tlZDogc2VsZWN0ZWQgfSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhcIiwgbnVsbCwgcm93Lm5hbWUpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIHJvdy52ZXJzaW9uSW5mbykpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIHJvdy5saWNlbnNlSWQpKSkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLUxpY2Vuc2VzLUdyaWQnKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLVJlbmRlcmVkSFRNTENvbW1vbicpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW5kZXIgYSBncmlkIG9mIHBhY2thZ2UgbGljZW5zZSBpbmZvcm1hdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgeyBidW5kbGVzLCBjdXJyZW50QnVuZGxlTmFtZSwgdHJhbnMgfSA9IHRoaXMubW9kZWw7XG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZFBhY2thZ2VzID0gdGhpcy5tb2RlbC5nZXRGaWx0ZXJlZFBhY2thZ2VzKGJ1bmRsZXMgJiYgY3VycmVudEJ1bmRsZU5hbWVcbiAgICAgICAgICAgICAgICA/ICgoX2EgPSBidW5kbGVzW2N1cnJlbnRCdW5kbGVOYW1lXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBhY2thZ2VzKSB8fCBbXVxuICAgICAgICAgICAgICAgIDogW10pO1xuICAgICAgICAgICAgaWYgKCFmaWx0ZXJlZFBhY2thZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImJsb2NrcXVvdGVcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImVtXCIsIG51bGwsIHRyYW5zLl9fKCdObyBQYWNrYWdlcyBmb3VuZCcpKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiLCBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhlYWRcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhcIiwgbnVsbCwgdHJhbnMuX18oJ1BhY2thZ2UnKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRoXCIsIG51bGwsIHRyYW5zLl9fKCdWZXJzaW9uJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiLCBudWxsLCB0cmFucy5fXygnTGljZW5zZScpKSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiwgbnVsbCwgZmlsdGVyZWRQYWNrYWdlcy5tYXAodGhpcy5yZW5kZXJSb3cpKSkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBMaWNlbnNlcy5HcmlkID0gR3JpZDtcbiAgICAvKipcbiAgICAgKiBBIHBhY2thZ2UncyBmdWxsIGxpY2Vuc2UgdGV4dFxuICAgICAqL1xuICAgIGNsYXNzIEZ1bGxUZXh0IGV4dGVuZHMgVkRvbVJlbmRlcmVyIHtcbiAgICAgICAgY29uc3RydWN0b3IobW9kZWwpIHtcbiAgICAgICAgICAgIHN1cGVyKG1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLUxpY2Vuc2VzLVRleHQnKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLVJlbmRlcmVkSFRNTENvbW1vbicpO1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtUmVuZGVyZWRNYXJrZG93bicpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW5kZXIgdGhlIGxpY2Vuc2UgdGV4dCwgb3IgYSBudWxsIHN0YXRlIGlmIG5vIHBhY2thZ2UgaXMgc2VsZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY3VycmVudFBhY2thZ2UsIHRyYW5zIH0gPSB0aGlzLm1vZGVsO1xuICAgICAgICAgICAgbGV0IGhlYWQgPSAnJztcbiAgICAgICAgICAgIGxldCBxdW90ZSA9IHRyYW5zLl9fKCdObyBQYWNrYWdlIHNlbGVjdGVkJyk7XG4gICAgICAgICAgICBsZXQgY29kZSA9ICcnO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRQYWNrYWdlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBuYW1lLCB2ZXJzaW9uSW5mbywgbGljZW5zZUlkLCBleHRyYWN0ZWRUZXh0IH0gPSBjdXJyZW50UGFja2FnZTtcbiAgICAgICAgICAgICAgICBoZWFkID0gYCR7bmFtZX0gdiR7dmVyc2lvbkluZm99YDtcbiAgICAgICAgICAgICAgICBxdW90ZSA9IGAke3RyYW5zLl9fKCdMaWNlbnNlJyl9OiAke2xpY2Vuc2VJZCB8fCB0cmFucy5fXygnTm8gTGljZW5zZSBJRCBmb3VuZCcpfWA7XG4gICAgICAgICAgICAgICAgY29kZSA9IGV4dHJhY3RlZFRleHQgfHwgdHJhbnMuX18oJ05vIExpY2Vuc2UgVGV4dCBmb3VuZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDFcIiwgeyBrZXk6IFwiaDFcIiB9LCBoZWFkKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYmxvY2txdW90ZVwiLCB7IGtleTogXCJxdW90ZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJlbVwiLCBudWxsLCBxdW90ZSkpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIHsga2V5OiBcImNvZGVcIiB9LCBjb2RlKVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBMaWNlbnNlcy5GdWxsVGV4dCA9IEZ1bGxUZXh0O1xufSkoTGljZW5zZXMgfHwgKExpY2Vuc2VzID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpY2Vuc2VzLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=