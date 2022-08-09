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
                        "3-julia-dev-20",
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
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/virtualdom */ "webpack/sharing/consume/default/@lumino/virtualdom/@lumino/virtualdom?7070");
/* harmony import */ var _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvaGVscC1leHRlbnNpb24vbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9oZWxwLWV4dGVuc2lvbi9saWIvbGljZW5zZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwRDtBQUN1RjtBQUN0RjtBQUNWO0FBQ0s7QUFDc0Q7QUFDN0U7QUFDTztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdFQUFXO0FBQzFCLGVBQWUsaUVBQWU7QUFDOUI7QUFDQSxlQUFlLFdBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsZ0RBQW1CLFVBQVUscUNBQXFDO0FBQ3ZHLG9CQUFvQixnREFBbUIsVUFBVSxnQ0FBZ0M7QUFDakY7QUFDQTtBQUNBLHdCQUF3QixnQkFBcUI7QUFDN0M7QUFDQSwrQkFBK0IsZ0RBQW1CLFVBQVUsK0JBQStCO0FBQzNGLG9CQUFvQixnREFBbUIsQ0FBQyx3RUFBaUIsR0FBRyxxREFBcUQ7QUFDakgsb0JBQW9CLGdEQUFtQixTQUFTLG9DQUFvQztBQUNwRix3QkFBd0IsZ0RBQW1CLENBQUMsbUZBQTRCLEdBQUcsaUNBQWlDO0FBQzVHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLGdEQUFtQixVQUFVLHNDQUFzQztBQUMxRyxvQkFBb0IsZ0RBQW1C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QUFDdkMsZ0JBQWdCLGdEQUFtQixVQUFVLGNBQWM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRCQUE0QjtBQUM3QixvQyIsImZpbGUiOiJwYWNrYWdlc19oZWxwLWV4dGVuc2lvbl9saWJfaW5kZXhfanMuMWZiMzJmZDdmYWY2NDM4NThjYjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBoZWxwLWV4dGVuc2lvblxuICovXG5pbXBvcnQgeyBJTGF5b3V0UmVzdG9yZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBDb21tYW5kVG9vbGJhckJ1dHRvbiwgRGlhbG9nLCBJQ29tbWFuZFBhbGV0dGUsIElGcmFtZSwgTWFpbkFyZWFXaWRnZXQsIHNob3dEaWFsb2csIFRvb2xiYXIsIFdpZGdldFRyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBQYWdlQ29uZmlnLCBVUkxFeHQgfSBmcm9tICdAanVweXRlcmxhYi9jb3JldXRpbHMnO1xuaW1wb3J0IHsgSU1haW5NZW51IH0gZnJvbSAnQGp1cHl0ZXJsYWIvbWFpbm1lbnUnO1xuaW1wb3J0IHsgSVRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBjb3B5cmlnaHRJY29uLCBqdXB5dGVySWNvbiwganVweXRlcmxhYldvcmRtYXJrSWNvbiwgcmVmcmVzaEljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpY2Vuc2VzIH0gZnJvbSAnLi9saWNlbnNlcyc7XG4vKipcbiAqIFRoZSBjb21tYW5kIElEcyB1c2VkIGJ5IHRoZSBoZWxwIHBsdWdpbi5cbiAqL1xudmFyIENvbW1hbmRJRHM7XG4oZnVuY3Rpb24gKENvbW1hbmRJRHMpIHtcbiAgICBDb21tYW5kSURzLm9wZW4gPSAnaGVscDpvcGVuJztcbiAgICBDb21tYW5kSURzLmFib3V0ID0gJ2hlbHA6YWJvdXQnO1xuICAgIENvbW1hbmRJRHMuYWN0aXZhdGUgPSAnaGVscDphY3RpdmF0ZSc7XG4gICAgQ29tbWFuZElEcy5jbG9zZSA9ICdoZWxwOmNsb3NlJztcbiAgICBDb21tYW5kSURzLnNob3cgPSAnaGVscDpzaG93JztcbiAgICBDb21tYW5kSURzLmhpZGUgPSAnaGVscDpoaWRlJztcbiAgICBDb21tYW5kSURzLmxhdW5jaENsYXNzaWMgPSAnaGVscDpsYXVuY2gtY2xhc3NpYy1ub3RlYm9vayc7XG4gICAgQ29tbWFuZElEcy5qdXB5dGVyRm9ydW0gPSAnaGVscDpqdXB5dGVyLWZvcnVtJztcbiAgICBDb21tYW5kSURzLmxpY2Vuc2VzID0gJ2hlbHA6bGljZW5zZXMnO1xuICAgIENvbW1hbmRJRHMubGljZW5zZVJlcG9ydCA9ICdoZWxwOmxpY2Vuc2UtcmVwb3J0JztcbiAgICBDb21tYW5kSURzLnJlZnJlc2hMaWNlbnNlcyA9ICdoZWxwOmxpY2Vuc2VzLXJlZnJlc2gnO1xufSkoQ29tbWFuZElEcyB8fCAoQ29tbWFuZElEcyA9IHt9KSk7XG4vKipcbiAqIEEgZmxhZyBkZW5vdGluZyB3aGV0aGVyIHRoZSBhcHBsaWNhdGlvbiBpcyBsb2FkZWQgb3ZlciBIVFRQUy5cbiAqL1xuY29uc3QgTEFCX0lTX1NFQ1VSRSA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRoZSBoZWxwIHdpZGdldC5cbiAqL1xuY29uc3QgSEVMUF9DTEFTUyA9ICdqcC1IZWxwJztcbi8qKlxuICogQWRkIGEgY29tbWFuZCB0byBzaG93IGFuIEFib3V0IGRpYWxvZy5cbiAqL1xuY29uc3QgYWJvdXQgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9oZWxwLWV4dGVuc2lvbjphYm91dCcsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHJlcXVpcmVzOiBbSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbSUNvbW1hbmRQYWxldHRlXSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgdHJhbnNsYXRvciwgcGFsZXR0ZSkgPT4ge1xuICAgICAgICBjb25zdCB7IGNvbW1hbmRzIH0gPSBhcHA7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gdHJhbnMuX18oJ0hlbHAnKTtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmFib3V0LCB7XG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0Fib3V0ICUxJywgYXBwLm5hbWUpLFxuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgaGVhZGVyIG9mIHRoZSBhYm91dCBkaWFsb2dcbiAgICAgICAgICAgICAgICBjb25zdCB2ZXJzaW9uTnVtYmVyID0gdHJhbnMuX18oJ1ZlcnNpb24gJTEnLCBhcHAudmVyc2lvbik7XG4gICAgICAgICAgICAgICAgY29uc3QgdmVyc2lvbkluZm8gPSAoUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwianAtQWJvdXQtdmVyc2lvbi1pbmZvXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwianAtQWJvdXQtdmVyc2lvblwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzLmVudi5JTUFHRV9UQUcsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIilcIikpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IChSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJqcC1BYm91dC1oZWFkZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KGp1cHl0ZXJJY29uLnJlYWN0LCB7IG1hcmdpbjogXCI3cHggOS41cHhcIiwgaGVpZ2h0OiBcImF1dG9cIiwgd2lkdGg6IFwiNThweFwiIH0pLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLUFib3V0LWhlYWRlci1pbmZvXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoanVweXRlcmxhYldvcmRtYXJrSWNvbi5yZWFjdCwgeyBoZWlnaHQ6IFwiYXV0b1wiLCB3aWR0aDogXCIxOTZweFwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbkluZm8pKSk7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBib2R5IG9mIHRoZSBhYm91dCBkaWFsb2dcbiAgICAgICAgICAgICAgICBjb25zdCBqdXB5dGVyVVJMID0gJ2h0dHBzOi8vanVweXRlci5vcmcvYWJvdXQuaHRtbCc7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJpYnV0b3JzVVJMID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9qdXB5dGVybGFiL2p1cHl0ZXJsYWIvZ3JhcGhzL2NvbnRyaWJ1dG9ycyc7XG4gICAgICAgICAgICAgICAgY29uc3QgZXh0ZXJuYWxMaW5rcyA9IChSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJqcC1BYm91dC1leHRlcm5hbExpbmtzXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgeyBocmVmOiBjb250cmlidXRvcnNVUkwsIHRhcmdldDogXCJfYmxhbmtcIiwgcmVsOiBcIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiwgY2xhc3NOYW1lOiBcImpwLUJ1dHRvbi1mbGF0XCIgfSwgdHJhbnMuX18oJ0NPTlRSSUJVVE9SIExJU1QnKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgaHJlZjoganVweXRlclVSTCwgdGFyZ2V0OiBcIl9ibGFua1wiLCByZWw6IFwibm9vcGVuZXIgbm9yZWZlcnJlclwiLCBjbGFzc05hbWU6IFwianAtQnV0dG9uLWZsYXRcIiB9LCB0cmFucy5fXygnQUJPVVQgUFJPSkVDVCBKVVBZVEVSJykpKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29weXJpZ2h0ID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImpwLUFib3V0LWNvcHlyaWdodFwiIH0sIHRyYW5zLl9fKCfCqSAyMDE1LTIwMjIgUHJvamVjdCBKdXB5dGVyIENvbnRyaWJ1dG9ycycpKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgYm9keSA9IChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLUFib3V0LWJvZHlcIiB9LFxuICAgICAgICAgICAgICAgICAgICBleHRlcm5hbExpbmtzLFxuICAgICAgICAgICAgICAgICAgICBjb3B5cmlnaHQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBib2R5LFxuICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBEaWFsb2cuY3JlYXRlQnV0dG9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0Rpc21pc3MnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdqcC1BYm91dC1idXR0b24ganAtbW9kLXJlamVjdCBqcC1tb2Qtc3R5bGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHBhbGV0dGUpIHtcbiAgICAgICAgICAgIHBhbGV0dGUuYWRkSXRlbSh7IGNvbW1hbmQ6IENvbW1hbmRJRHMuYWJvdXQsIGNhdGVnb3J5IH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcbi8qKlxuICogQSBwbHVnaW4gdG8gYWRkIGEgY29tbWFuZCB0byBvcGVuIHRoZSBDbGFzc2ljIE5vdGVib29rIGludGVyZmFjZS5cbiAqL1xuY29uc3QgbGF1bmNoQ2xhc3NpYyA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2hlbHAtZXh0ZW5zaW9uOmxhdW5jaC1jbGFzc2ljJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtJQ29tbWFuZFBhbGV0dGVdLFxuICAgIGFjdGl2YXRlOiAoYXBwLCB0cmFuc2xhdG9yLCBwYWxldHRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMgfSA9IGFwcDtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSB0cmFucy5fXygnSGVscCcpO1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMubGF1bmNoQ2xhc3NpYywge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdMYXVuY2ggQ2xhc3NpYyBOb3RlYm9vaycpLFxuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKFBhZ2VDb25maWcuZ2V0QmFzZVVybCgpICsgJ3RyZWUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChwYWxldHRlKSB7XG4gICAgICAgICAgICBwYWxldHRlLmFkZEl0ZW0oeyBjb21tYW5kOiBDb21tYW5kSURzLmxhdW5jaENsYXNzaWMsIGNhdGVnb3J5IH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcbi8qKlxuICogQSBwbHVnaW4gdG8gYWRkIGEgY29tbWFuZCB0byBvcGVuIHRoZSBKdXB5dGVyIEZvcnVtLlxuICovXG5jb25zdCBqdXB5dGVyRm9ydW0gPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9oZWxwLWV4dGVuc2lvbjpqdXB5dGVyLWZvcnVtJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtJQ29tbWFuZFBhbGV0dGVdLFxuICAgIGFjdGl2YXRlOiAoYXBwLCB0cmFuc2xhdG9yLCBwYWxldHRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMgfSA9IGFwcDtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSB0cmFucy5fXygnSGVscCcpO1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuanVweXRlckZvcnVtLCB7XG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0p1cHl0ZXIgRm9ydW0nKSxcbiAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbignaHR0cHM6Ly9kaXNjb3Vyc2UuanVweXRlci5vcmcvYy9qdXB5dGVybGFiJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocGFsZXR0ZSkge1xuICAgICAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHsgY29tbWFuZDogQ29tbWFuZElEcy5qdXB5dGVyRm9ydW0sIGNhdGVnb3J5IH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcbi8qKlxuICogQSBwbHVnaW4gdG8gYWRkIGEgbGlzdCBvZiByZXNvdXJjZXMgdG8gdGhlIGhlbHAgbWVudS5cbiAqL1xuY29uc3QgcmVzb3VyY2VzID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvaGVscC1leHRlbnNpb246cmVzb3VyY2VzJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJTWFpbk1lbnUsIElUcmFuc2xhdG9yXSxcbiAgICBvcHRpb25hbDogW0lDb21tYW5kUGFsZXR0ZSwgSUxheW91dFJlc3RvcmVyXSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgbWFpbk1lbnUsIHRyYW5zbGF0b3IsIHBhbGV0dGUsIHJlc3RvcmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSB0cmFucy5fXygnSGVscCcpO1xuICAgICAgICBjb25zdCBuYW1lc3BhY2UgPSAnaGVscC1kb2MnO1xuICAgICAgICBjb25zdCB7IGNvbW1hbmRzLCBzaGVsbCwgc2VydmljZU1hbmFnZXIgfSA9IGFwcDtcbiAgICAgICAgY29uc3QgdHJhY2tlciA9IG5ldyBXaWRnZXRUcmFja2VyKHsgbmFtZXNwYWNlIH0pO1xuICAgICAgICBjb25zdCByZXNvdXJjZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogdHJhbnMuX18oJ0p1cHl0ZXJMYWIgUmVmZXJlbmNlJyksXG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9qdXB5dGVybGFiLnJlYWR0aGVkb2NzLmlvL2VuLzMuNC54LydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogdHJhbnMuX18oJ0p1cHl0ZXJMYWIgRkFRJyksXG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9qdXB5dGVybGFiLnJlYWR0aGVkb2NzLmlvL2VuLzMuNC54L2dldHRpbmdfc3RhcnRlZC9mYXEuaHRtbCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogdHJhbnMuX18oJ0p1cHl0ZXIgUmVmZXJlbmNlJyksXG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9qdXB5dGVyLm9yZy9kb2N1bWVudGF0aW9uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiB0cmFucy5fXygnTWFya2Rvd24gUmVmZXJlbmNlJyksXG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9jb21tb25tYXJrLm9yZy9oZWxwLydcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgICAgcmVzb3VyY2VzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhLnRleHQubG9jYWxlQ29tcGFyZShiLnRleHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gSGFuZGxlIHN0YXRlIHJlc3RvcmF0aW9uLlxuICAgICAgICBpZiAocmVzdG9yZXIpIHtcbiAgICAgICAgICAgIHZvaWQgcmVzdG9yZXIucmVzdG9yZSh0cmFja2VyLCB7XG4gICAgICAgICAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy5vcGVuLFxuICAgICAgICAgICAgICAgIGFyZ3M6IHdpZGdldCA9PiAoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHdpZGdldC5jb250ZW50LnVybCxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogd2lkZ2V0LmNvbnRlbnQudGl0bGUubGFiZWxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBuYW1lOiB3aWRnZXQgPT4gd2lkZ2V0LmNvbnRlbnQudXJsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgbmV3IEhlbHBXaWRnZXQgd2lkZ2V0LlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbmV3SGVscFdpZGdldCh1cmwsIHRleHQpIHtcbiAgICAgICAgICAgIC8vIEFsbG93IHNjcmlwdHMgYW5kIGZvcm1zIHNvIHRoYXQgdGhpbmdzIGxpa2VcbiAgICAgICAgICAgIC8vIHJlYWR0aGVkb2NzIGNhbiB1c2UgdGhlaXIgc2VhcmNoIGZ1bmN0aW9uYWxpdHkuXG4gICAgICAgICAgICAvLyBXZSAqZG9uJ3QqIGFsbG93IHNhbWUgb3JpZ2luIHJlcXVlc3RzLCB3aGljaFxuICAgICAgICAgICAgLy8gY2FuIHByZXZlbnQgc29tZSBjb250ZW50IGZyb20gYmVpbmcgbG9hZGVkIG9udG8gdGhlXG4gICAgICAgICAgICAvLyBoZWxwIHBhZ2VzLlxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IG5ldyBJRnJhbWUoe1xuICAgICAgICAgICAgICAgIHNhbmRib3g6IFsnYWxsb3ctc2NyaXB0cycsICdhbGxvdy1mb3JtcyddXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnRlbnQudXJsID0gdXJsO1xuICAgICAgICAgICAgY29udGVudC5hZGRDbGFzcyhIRUxQX0NMQVNTKTtcbiAgICAgICAgICAgIGNvbnRlbnQudGl0bGUubGFiZWwgPSB0ZXh0O1xuICAgICAgICAgICAgY29udGVudC5pZCA9IGAke25hbWVzcGFjZX0tJHsrK2NvdW50ZXJ9YDtcbiAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IG5ldyBNYWluQXJlYVdpZGdldCh7IGNvbnRlbnQgfSk7XG4gICAgICAgICAgICB3aWRnZXQuYWRkQ2xhc3MoJ2pwLUhlbHAnKTtcbiAgICAgICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUG9wdWxhdGUgdGhlIEhlbHAgbWVudS5cbiAgICAgICAgY29uc3QgaGVscE1lbnUgPSBtYWluTWVudS5oZWxwTWVudTtcbiAgICAgICAgY29uc3QgcmVzb3VyY2VzR3JvdXAgPSByZXNvdXJjZXMubWFwKGFyZ3MgPT4gKHtcbiAgICAgICAgICAgIGFyZ3MsXG4gICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLm9wZW5cbiAgICAgICAgfSkpO1xuICAgICAgICBoZWxwTWVudS5hZGRHcm91cChyZXNvdXJjZXNHcm91cCwgMTApO1xuICAgICAgICAvLyBHZW5lcmF0ZSBhIGNhY2hlIG9mIHRoZSBrZXJuZWwgaGVscCBsaW5rcy5cbiAgICAgICAgY29uc3Qga2VybmVsSW5mb0NhY2hlID0gbmV3IE1hcCgpO1xuICAgICAgICBzZXJ2aWNlTWFuYWdlci5zZXNzaW9ucy5ydW5uaW5nQ2hhbmdlZC5jb25uZWN0KChtLCBzZXNzaW9ucykgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgLy8gSWYgYSBuZXcgc2Vzc2lvbiBoYXMgYmVlbiBhZGRlZCwgaXQgaXMgYXQgdGhlIGJhY2tcbiAgICAgICAgICAgIC8vIG9mIHRoZSBzZXNzaW9uIGxpc3QuIElmIG9uZSBoYXMgY2hhbmdlZCBvciBzdG9wcGVkLFxuICAgICAgICAgICAgLy8gaXQgZG9lcyBub3QgaHVydCB0byBjaGVjayBpdC5cbiAgICAgICAgICAgIGlmICghc2Vzc2lvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbk1vZGVsID0gc2Vzc2lvbnNbc2Vzc2lvbnMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZiAoIXNlc3Npb25Nb2RlbC5rZXJuZWwgfHxcbiAgICAgICAgICAgICAgICBrZXJuZWxJbmZvQ2FjaGUuaGFzKHNlc3Npb25Nb2RlbC5rZXJuZWwubmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gc2VydmljZU1hbmFnZXIuc2Vzc2lvbnMuY29ubmVjdFRvKHtcbiAgICAgICAgICAgICAgICBtb2RlbDogc2Vzc2lvbk1vZGVsLFxuICAgICAgICAgICAgICAgIGtlcm5lbENvbm5lY3Rpb25PcHRpb25zOiB7IGhhbmRsZUNvbW1zOiBmYWxzZSB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZvaWQgKChfYSA9IHNlc3Npb24ua2VybmVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5mby50aGVuKGtlcm5lbEluZm8gPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IHNlc3Npb24ua2VybmVsLm5hbWU7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIGNhY2hlIHNlY29uZCB0aW1lIHNvIHRoYXQsIGlmIHR3byBjYWxsYmFja3MgZ2V0IHNjaGVkdWxlZCxcbiAgICAgICAgICAgICAgICAvLyB0aGV5IGRvbid0IHRyeSB0byBhZGQgdGhlIHNhbWUgY29tbWFuZHMuXG4gICAgICAgICAgICAgICAgaWYgKGtlcm5lbEluZm9DYWNoZS5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIEtlcm5lbCBJbmZvIGNhY2hlLlxuICAgICAgICAgICAgICAgIGtlcm5lbEluZm9DYWNoZS5zZXQobmFtZSwga2VybmVsSW5mbyk7XG4gICAgICAgICAgICAgICAgLy8gVXRpbGl0eSBmdW5jdGlvbiB0byBjaGVjayBpZiB0aGUgY3VycmVudCB3aWRnZXRcbiAgICAgICAgICAgICAgICAvLyBoYXMgcmVnaXN0ZXJlZCBpdHNlbGYgd2l0aCB0aGUgaGVscCBtZW51LlxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXNLZXJuZWwgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gYXBwLnNoZWxsLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICghd2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGhlbHBNZW51Lmtlcm5lbFVzZXJzLmZvckVhY2godSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodS50cmFja2VyLmhhcyh3aWRnZXQpICYmICgoX2EgPSB1LmdldEtlcm5lbCh3aWRnZXQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZSkgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUga2VybmVsIGJhbm5lciB0byB0aGUgSGVscCBNZW51LlxuICAgICAgICAgICAgICAgIGNvbnN0IGJhbm5lckNvbW1hbmQgPSBgaGVscC1tZW51LSR7bmFtZX06YmFubmVyYDtcbiAgICAgICAgICAgICAgICBjb25zdCBzcGVjID0gKF9iID0gKF9hID0gc2VydmljZU1hbmFnZXIua2VybmVsc3BlY3MpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zcGVjcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmtlcm5lbHNwZWNzW25hbWVdO1xuICAgICAgICAgICAgICAgIGlmICghc3BlYykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGtlcm5lbE5hbWUgPSBzcGVjLmRpc3BsYXlfbmFtZTtcbiAgICAgICAgICAgICAgICBsZXQga2VybmVsSWNvblVybCA9IHNwZWMucmVzb3VyY2VzWydsb2dvLTY0eDY0J107XG4gICAgICAgICAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChiYW5uZXJDb21tYW5kLCB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnQWJvdXQgdGhlICUxIEtlcm5lbCcsIGtlcm5lbE5hbWUpLFxuICAgICAgICAgICAgICAgICAgICBpc1Zpc2libGU6IHVzZXNLZXJuZWwsXG4gICAgICAgICAgICAgICAgICAgIGlzRW5hYmxlZDogdXNlc0tlcm5lbCxcbiAgICAgICAgICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBoZWFkZXIgb2YgdGhlIGFib3V0IGRpYWxvZ1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyTG9nbyA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBzcmM6IGtlcm5lbEljb25VcmwgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IChSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJqcC1BYm91dC1oZWFkZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckxvZ28sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJqcC1BYm91dC1oZWFkZXItaW5mb1wiIH0sIGtlcm5lbE5hbWUpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYW5uZXIgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwicHJlXCIsIG51bGwsIGtlcm5lbEluZm8uYmFubmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLUFib3V0LWJvZHlcIiB9LCBiYW5uZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNob3dEaWFsb2coe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEaWFsb2cuY3JlYXRlQnV0dG9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnRGlzbWlzcycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnanAtQWJvdXQtYnV0dG9uIGpwLW1vZC1yZWplY3QganAtbW9kLXN0eWxlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGhlbHBNZW51LmFkZEdyb3VwKFt7IGNvbW1hbmQ6IGJhbm5lckNvbW1hbmQgfV0sIDIwKTtcbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIGtlcm5lbCBpbmZvIGhlbHBfbGlua3MgdG8gdGhlIEhlbHAgbWVudS5cbiAgICAgICAgICAgICAgICBjb25zdCBrZXJuZWxHcm91cCA9IFtdO1xuICAgICAgICAgICAgICAgIChrZXJuZWxJbmZvLmhlbHBfbGlua3MgfHwgW10pLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1hbmRJZCA9IGBoZWxwLW1lbnUtJHtuYW1lfToke2xpbmsudGV4dH1gO1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKGNvbW1hbmRJZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGxpbmsudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVmlzaWJsZTogdXNlc0tlcm5lbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRW5hYmxlZDogdXNlc0tlcm5lbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZHMuZXhlY3V0ZShDb21tYW5kSURzLm9wZW4sIGxpbmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAga2VybmVsR3JvdXAucHVzaCh7IGNvbW1hbmQ6IGNvbW1hbmRJZCB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBoZWxwTWVudS5hZGRHcm91cChrZXJuZWxHcm91cCwgMjEpO1xuICAgICAgICAgICAgICAgIC8vIERpc3Bvc2Ugb2YgdGhlIHNlc3Npb24gb2JqZWN0IHNpbmNlIHdlIG5vIGxvbmdlciBuZWVkIGl0LlxuICAgICAgICAgICAgICAgIHNlc3Npb24uZGlzcG9zZSgpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm9wZW4sIHtcbiAgICAgICAgICAgIGxhYmVsOiBhcmdzID0+IGFyZ3NbJ3RleHQnXSxcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGFyZ3NbJ3VybCddO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBhcmdzWyd0ZXh0J107XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3QnJvd3NlclRhYiA9IGFyZ3NbJ25ld0Jyb3dzZXJUYWInXSB8fCBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyBJZiBoZWxwIHJlc291cmNlIHdpbGwgZ2VuZXJhdGUgYSBtaXhlZCBjb250ZW50IGVycm9yLCBsb2FkIGV4dGVybmFsbHkuXG4gICAgICAgICAgICAgICAgaWYgKG5ld0Jyb3dzZXJUYWIgfHxcbiAgICAgICAgICAgICAgICAgICAgKExBQl9JU19TRUNVUkUgJiYgVVJMRXh0LnBhcnNlKHVybCkucHJvdG9jb2wgIT09ICdodHRwczonKSkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cub3Blbih1cmwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IG5ld0hlbHBXaWRnZXQodXJsLCB0ZXh0KTtcbiAgICAgICAgICAgICAgICB2b2lkIHRyYWNrZXIuYWRkKHdpZGdldCk7XG4gICAgICAgICAgICAgICAgc2hlbGwuYWRkKHdpZGdldCwgJ21haW4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHBhbGV0dGUpIHtcbiAgICAgICAgICAgIHJlc291cmNlcy5mb3JFYWNoKGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIHBhbGV0dGUuYWRkSXRlbSh7IGFyZ3MsIGNvbW1hbmQ6IENvbW1hbmRJRHMub3BlbiwgY2F0ZWdvcnkgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBhbGV0dGUuYWRkSXRlbSh7XG4gICAgICAgICAgICAgICAgYXJnczogeyByZWxvYWQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAnYXBwdXRpbHM6cmVzZXQnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4vKipcbiAqIEEgcGx1Z2luIHRvIGFkZCBhIGxpY2Vuc2VzIHJlcG9ydGluZyB0b29scy5cbiAqL1xuY29uc3QgbGljZW5zZXMgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9oZWxwLWV4dGVuc2lvbjpsaWNlbnNlcycsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHJlcXVpcmVzOiBbSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbSU1haW5NZW51LCBJQ29tbWFuZFBhbGV0dGUsIElMYXlvdXRSZXN0b3Jlcl0sXG4gICAgYWN0aXZhdGU6IChhcHAsIHRyYW5zbGF0b3IsIG1lbnUsIHBhbGV0dGUsIHJlc3RvcmVyKSA9PiB7XG4gICAgICAgIC8vIGJhaWwgaWYgbm8gbGljZW5zZSBBUEkgaXMgYXZhaWxhYmxlIGZyb20gdGhlIHNlcnZlclxuICAgICAgICBpZiAoIVBhZ2VDb25maWcuZ2V0T3B0aW9uKCdsaWNlbnNlc1VybCcpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBjb21tYW5kcywgc2hlbGwgfSA9IGFwcDtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgLy8gdHJhbnNsYXRpb24gc3RyaW5nc1xuICAgICAgICBjb25zdCBjYXRlZ29yeSA9IHRyYW5zLl9fKCdIZWxwJyk7XG4gICAgICAgIGNvbnN0IGRvd25sb2FkQXNUZXh0ID0gdHJhbnMuX18oJ0Rvd25sb2FkIEFsbCBMaWNlbnNlcyBhcycpO1xuICAgICAgICBjb25zdCBsaWNlbnNlc1RleHQgPSB0cmFucy5fXygnTGljZW5zZXMnKTtcbiAgICAgICAgY29uc3QgcmVmcmVzaExpY2Vuc2VzID0gdHJhbnMuX18oJ1JlZnJlc2ggTGljZW5zZXMnKTtcbiAgICAgICAgLy8gYW4gaW5jcmVtZW50ZXIgZm9yIGxpY2Vuc2Ugd2lkZ2V0IGlkc1xuICAgICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICAgIGNvbnN0IGxpY2Vuc2VzVXJsID0gVVJMRXh0LmpvaW4oUGFnZUNvbmZpZy5nZXRCYXNlVXJsKCksIFBhZ2VDb25maWcuZ2V0T3B0aW9uKCdsaWNlbnNlc1VybCcpKSArICcvJztcbiAgICAgICAgY29uc3QgbGljZW5zZXNOYW1lc3BhY2UgPSAnaGVscC1saWNlbnNlcyc7XG4gICAgICAgIGNvbnN0IGxpY2Vuc2VzVHJhY2tlciA9IG5ldyBXaWRnZXRUcmFja2VyKHtcbiAgICAgICAgICAgIG5hbWVzcGFjZTogbGljZW5zZXNOYW1lc3BhY2VcbiAgICAgICAgfSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gYSBmdWxsIGxpY2Vuc2UgcmVwb3J0IGZvcm1hdCBiYXNlZCBvbiBhIGZvcm1hdCBuYW1lXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBmb3JtYXRPckRlZmF1bHQoZm9ybWF0KSB7XG4gICAgICAgICAgICByZXR1cm4gKExpY2Vuc2VzLlJFUE9SVF9GT1JNQVRTW2Zvcm1hdF0gfHxcbiAgICAgICAgICAgICAgICBMaWNlbnNlcy5SRVBPUlRfRk9STUFUU1tMaWNlbnNlcy5ERUZBVUxUX0ZPUk1BVF0pO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgYSBNYWluQXJlYVdpZGdldCBmb3IgYSBsaWNlbnNlIHZpZXdlclxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlTGljZW5zZVdpZGdldChhcmdzKSB7XG4gICAgICAgICAgICBjb25zdCBsaWNlbnNlc01vZGVsID0gbmV3IExpY2Vuc2VzLk1vZGVsKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgYXJncyksIHsgbGljZW5zZXNVcmwsXG4gICAgICAgICAgICAgICAgdHJhbnMsIHNlcnZlclNldHRpbmdzOiBhcHAuc2VydmljZU1hbmFnZXIuc2VydmVyU2V0dGluZ3MgfSkpO1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IG5ldyBMaWNlbnNlcyh7IG1vZGVsOiBsaWNlbnNlc01vZGVsIH0pO1xuICAgICAgICAgICAgY29udGVudC5pZCA9IGAke2xpY2Vuc2VzTmFtZXNwYWNlfS0keysrY291bnRlcn1gO1xuICAgICAgICAgICAgY29udGVudC50aXRsZS5sYWJlbCA9IGxpY2Vuc2VzVGV4dDtcbiAgICAgICAgICAgIGNvbnRlbnQudGl0bGUuaWNvbiA9IGNvcHlyaWdodEljb247XG4gICAgICAgICAgICBjb25zdCBtYWluID0gbmV3IE1haW5BcmVhV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgICAgICAgIHJldmVhbDogbGljZW5zZXNNb2RlbC5saWNlbnNlc1JlYWR5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1haW4udG9vbGJhci5hZGRJdGVtKCdyZWZyZXNoLWxpY2Vuc2VzJywgbmV3IENvbW1hbmRUb29sYmFyQnV0dG9uKHtcbiAgICAgICAgICAgICAgICBpZDogQ29tbWFuZElEcy5yZWZyZXNoTGljZW5zZXMsXG4gICAgICAgICAgICAgICAgYXJnczogeyBub0xhYmVsOiAxIH0sXG4gICAgICAgICAgICAgICAgY29tbWFuZHNcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIG1haW4udG9vbGJhci5hZGRJdGVtKCdzcGFjZXInLCBUb29sYmFyLmNyZWF0ZVNwYWNlckl0ZW0oKSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZvcm1hdCBvZiBPYmplY3Qua2V5cyhMaWNlbnNlcy5SRVBPUlRfRk9STUFUUykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBidXR0b24gPSBuZXcgQ29tbWFuZFRvb2xiYXJCdXR0b24oe1xuICAgICAgICAgICAgICAgICAgICBpZDogQ29tbWFuZElEcy5saWNlbnNlUmVwb3J0LFxuICAgICAgICAgICAgICAgICAgICBhcmdzOiB7IGZvcm1hdCwgbm9MYWJlbDogMSB9LFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG1haW4udG9vbGJhci5hZGRJdGVtKGBkb3dubG9hZC0ke2Zvcm1hdH1gLCBidXR0b24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1haW47XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVnaXN0ZXIgbGljZW5zZS1yZWxhdGVkIGNvbW1hbmRzXG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5saWNlbnNlcywge1xuICAgICAgICAgICAgbGFiZWw6IGxpY2Vuc2VzVGV4dCxcbiAgICAgICAgICAgIGV4ZWN1dGU6IChhcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGljZW5zZU1haW4gPSBjcmVhdGVMaWNlbnNlV2lkZ2V0KGFyZ3MpO1xuICAgICAgICAgICAgICAgIHNoZWxsLmFkZChsaWNlbnNlTWFpbiwgJ21haW4nKTtcbiAgICAgICAgICAgICAgICAvLyBhZGQgdG8gdHJhY2tlciBzbyBpdCBjYW4gYmUgcmVzdG9yZWQsIGFuZCB1cGRhdGUgd2hlbiBjaG9pY2VzIGNoYW5nZVxuICAgICAgICAgICAgICAgIHZvaWQgbGljZW5zZXNUcmFja2VyLmFkZChsaWNlbnNlTWFpbik7XG4gICAgICAgICAgICAgICAgbGljZW5zZU1haW4uY29udGVudC5tb2RlbC50cmFja2VyRGF0YUNoYW5nZWQuY29ubmVjdCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgbGljZW5zZXNUcmFja2VyLnNhdmUobGljZW5zZU1haW4pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBsaWNlbnNlTWFpbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5yZWZyZXNoTGljZW5zZXMsIHtcbiAgICAgICAgICAgIGxhYmVsOiBhcmdzID0+IChhcmdzLm5vTGFiZWwgPyAnJyA6IHJlZnJlc2hMaWNlbnNlcyksXG4gICAgICAgICAgICBjYXB0aW9uOiByZWZyZXNoTGljZW5zZXMsXG4gICAgICAgICAgICBpY29uOiByZWZyZXNoSWNvbixcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYSA9IGxpY2Vuc2VzVHJhY2tlci5jdXJyZW50V2lkZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudC5tb2RlbC5pbml0TGljZW5zZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5saWNlbnNlUmVwb3J0LCB7XG4gICAgICAgICAgICBsYWJlbDogYXJncyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3Mubm9MYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IGZvcm1hdE9yRGVmYXVsdChgJHthcmdzLmZvcm1hdH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7ZG93bmxvYWRBc1RleHR9ICR7Zm9ybWF0LnRpdGxlfWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FwdGlvbjogYXJncyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0ID0gZm9ybWF0T3JEZWZhdWx0KGAke2FyZ3MuZm9ybWF0fWApO1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHtkb3dubG9hZEFzVGV4dH0gJHtmb3JtYXQudGl0bGV9YDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpY29uOiBhcmdzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXQgPSBmb3JtYXRPckRlZmF1bHQoYCR7YXJncy5mb3JtYXR9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5pY29uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFzeW5jIChhcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IGZvcm1hdE9yRGVmYXVsdChgJHthcmdzLmZvcm1hdH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgKChfYSA9IGxpY2Vuc2VzVHJhY2tlci5jdXJyZW50V2lkZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudC5tb2RlbC5kb3dubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZm9ybWF0LmlkXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gaGFuZGxlIG9wdGlvbmFsIGludGVncmF0aW9uc1xuICAgICAgICBpZiAocGFsZXR0ZSkge1xuICAgICAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHsgY29tbWFuZDogQ29tbWFuZElEcy5saWNlbnNlcywgY2F0ZWdvcnkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lbnUpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlbHBNZW51ID0gbWVudS5oZWxwTWVudTtcbiAgICAgICAgICAgIGhlbHBNZW51LmFkZEdyb3VwKFt7IGNvbW1hbmQ6IENvbW1hbmRJRHMubGljZW5zZXMgfV0sIDApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN0b3Jlcikge1xuICAgICAgICAgICAgdm9pZCByZXN0b3Jlci5yZXN0b3JlKGxpY2Vuc2VzVHJhY2tlciwge1xuICAgICAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMubGljZW5zZXMsXG4gICAgICAgICAgICAgICAgbmFtZTogd2lkZ2V0ID0+ICdsaWNlbnNlcycsXG4gICAgICAgICAgICAgICAgYXJnczogd2lkZ2V0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBjdXJyZW50QnVuZGxlTmFtZSwgY3VycmVudFBhY2thZ2VJbmRleCwgcGFja2FnZUZpbHRlciB9ID0gd2lkZ2V0LmNvbnRlbnQubW9kZWw7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50QnVuZGxlTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYWNrYWdlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWNrYWdlRmlsdGVyXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcmdzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcbmNvbnN0IHBsdWdpbnMgPSBbXG4gICAgYWJvdXQsXG4gICAgbGF1bmNoQ2xhc3NpYyxcbiAgICBqdXB5dGVyRm9ydW0sXG4gICAgcmVzb3VyY2VzLFxuICAgIGxpY2Vuc2VzXG5dO1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2lucztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFZEb21Nb2RlbCwgVkRvbVJlbmRlcmVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgU2VydmVyQ29ubmVjdGlvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3NlcnZpY2VzJztcbmltcG9ydCB7IGpzb25JY29uLCBtYXJrZG93bkljb24sIHNwcmVhZHNoZWV0SWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgUHJvbWlzZURlbGVnYXRlIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuaW1wb3J0IHsgaCB9IGZyb20gJ0BsdW1pbm8vdmlydHVhbGRvbSc7XG5pbXBvcnQgeyBQYW5lbCwgU3BsaXRQYW5lbCwgVGFiQmFyLCBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBBIGxpY2Vuc2Ugdmlld2VyXG4gKi9cbmV4cG9ydCBjbGFzcyBMaWNlbnNlcyBleHRlbmRzIFNwbGl0UGFuZWwge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtTGljZW5zZXMnKTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG9wdGlvbnMubW9kZWw7XG4gICAgICAgIHRoaXMuaW5pdExlZnRQYW5lbCgpO1xuICAgICAgICB0aGlzLmluaXRGaWx0ZXJzKCk7XG4gICAgICAgIHRoaXMuaW5pdEJ1bmRsZXMoKTtcbiAgICAgICAgdGhpcy5pbml0R3JpZCgpO1xuICAgICAgICB0aGlzLmluaXRMaWNlbnNlVGV4dCgpO1xuICAgICAgICB0aGlzLnNldFJlbGF0aXZlU2l6ZXMoWzEsIDIsIDNdKTtcbiAgICAgICAgdm9pZCB0aGlzLm1vZGVsLmluaXRMaWNlbnNlcygpLnRoZW4oKCkgPT4gdGhpcy5fdXBkYXRlQnVuZGxlcygpKTtcbiAgICAgICAgdGhpcy5tb2RlbC50cmFja2VyRGF0YUNoYW5nZWQuY29ubmVjdCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRpdGxlLmxhYmVsID0gdGhpcy5tb2RlbC50aXRsZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBkaXNwb3Npbmcgb2YgdGhlIHdpZGdldFxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9idW5kbGVzLmN1cnJlbnRDaGFuZ2VkLmRpc2Nvbm5lY3QodGhpcy5vbkJ1bmRsZVNlbGVjdGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5tb2RlbC5kaXNwb3NlKCk7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgbGVmdCBhcmVhIGZvciBmaWx0ZXJzIGFuZCBidW5kbGVzXG4gICAgICovXG4gICAgaW5pdExlZnRQYW5lbCgpIHtcbiAgICAgICAgdGhpcy5fbGVmdFBhbmVsID0gbmV3IFBhbmVsKCk7XG4gICAgICAgIHRoaXMuX2xlZnRQYW5lbC5hZGRDbGFzcygnanAtTGljZW5zZXMtRm9ybUFyZWEnKTtcbiAgICAgICAgdGhpcy5hZGRXaWRnZXQodGhpcy5fbGVmdFBhbmVsKTtcbiAgICAgICAgU3BsaXRQYW5lbC5zZXRTdHJldGNoKHRoaXMuX2xlZnRQYW5lbCwgMSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIGZpbHRlcnNcbiAgICAgKi9cbiAgICBpbml0RmlsdGVycygpIHtcbiAgICAgICAgdGhpcy5fZmlsdGVycyA9IG5ldyBMaWNlbnNlcy5GaWx0ZXJzKHRoaXMubW9kZWwpO1xuICAgICAgICBTcGxpdFBhbmVsLnNldFN0cmV0Y2godGhpcy5fZmlsdGVycywgMSk7XG4gICAgICAgIHRoaXMuX2xlZnRQYW5lbC5hZGRXaWRnZXQodGhpcy5fZmlsdGVycyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIGxpc3Rpbmcgb2YgYXZhaWxhYmxlIGJ1bmRsZXNcbiAgICAgKi9cbiAgICBpbml0QnVuZGxlcygpIHtcbiAgICAgICAgdGhpcy5fYnVuZGxlcyA9IG5ldyBUYWJCYXIoe1xuICAgICAgICAgICAgb3JpZW50YXRpb246ICd2ZXJ0aWNhbCcsXG4gICAgICAgICAgICByZW5kZXJlcjogbmV3IExpY2Vuc2VzLkJ1bmRsZVRhYlJlbmRlcmVyKHRoaXMubW9kZWwpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9idW5kbGVzLmFkZENsYXNzKCdqcC1MaWNlbnNlcy1CdW5kbGVzJyk7XG4gICAgICAgIFNwbGl0UGFuZWwuc2V0U3RyZXRjaCh0aGlzLl9idW5kbGVzLCAxKTtcbiAgICAgICAgdGhpcy5fbGVmdFBhbmVsLmFkZFdpZGdldCh0aGlzLl9idW5kbGVzKTtcbiAgICAgICAgdGhpcy5fYnVuZGxlcy5jdXJyZW50Q2hhbmdlZC5jb25uZWN0KHRoaXMub25CdW5kbGVTZWxlY3RlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMubW9kZWwuc3RhdGVDaGFuZ2VkLmNvbm5lY3QoKCkgPT4gdGhpcy5fYnVuZGxlcy51cGRhdGUoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIGxpc3Rpbmcgb2YgcGFja2FnZXMgd2l0aGluIHRoZSBjdXJyZW50IGJ1bmRsZVxuICAgICAqL1xuICAgIGluaXRHcmlkKCkge1xuICAgICAgICB0aGlzLl9ncmlkID0gbmV3IExpY2Vuc2VzLkdyaWQodGhpcy5tb2RlbCk7XG4gICAgICAgIFNwbGl0UGFuZWwuc2V0U3RyZXRjaCh0aGlzLl9ncmlkLCAxKTtcbiAgICAgICAgdGhpcy5hZGRXaWRnZXQodGhpcy5fZ3JpZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIGZ1bGwgdGV4dCBvZiB0aGUgY3VycmVudCBwYWNrYWdlXG4gICAgICovXG4gICAgaW5pdExpY2Vuc2VUZXh0KCkge1xuICAgICAgICB0aGlzLl9saWNlbnNlVGV4dCA9IG5ldyBMaWNlbnNlcy5GdWxsVGV4dCh0aGlzLm1vZGVsKTtcbiAgICAgICAgU3BsaXRQYW5lbC5zZXRTdHJldGNoKHRoaXMuX2dyaWQsIDEpO1xuICAgICAgICB0aGlzLmFkZFdpZGdldCh0aGlzLl9saWNlbnNlVGV4dCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZXIgZm9yIHVwZGF0aW5nIHRoZSBtb2RlbCB3aXRoIHRoZSBjdXJyZW50IGJ1bmRsZVxuICAgICAqL1xuICAgIG9uQnVuZGxlU2VsZWN0ZWQoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKChfYSA9IHRoaXMuX2J1bmRsZXMuY3VycmVudFRpdGxlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwuY3VycmVudEJ1bmRsZU5hbWUgPSB0aGlzLl9idW5kbGVzLmN1cnJlbnRUaXRsZS5sYWJlbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIGJ1bmRsZSB0YWJzLlxuICAgICAqL1xuICAgIF91cGRhdGVCdW5kbGVzKCkge1xuICAgICAgICB0aGlzLl9idW5kbGVzLmNsZWFyVGFicygpO1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGNvbnN0IHsgY3VycmVudEJ1bmRsZU5hbWUgfSA9IHRoaXMubW9kZWw7XG4gICAgICAgIGxldCBjdXJyZW50SW5kZXggPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IGJ1bmRsZSBvZiB0aGlzLm1vZGVsLmJ1bmRsZU5hbWVzKSB7XG4gICAgICAgICAgICBjb25zdCB0YWIgPSBuZXcgV2lkZ2V0KCk7XG4gICAgICAgICAgICB0YWIudGl0bGUubGFiZWwgPSBidW5kbGU7XG4gICAgICAgICAgICBpZiAoYnVuZGxlID09PSBjdXJyZW50QnVuZGxlTmFtZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9idW5kbGVzLmluc2VydFRhYigrK2ksIHRhYi50aXRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYnVuZGxlcy5jdXJyZW50SW5kZXggPSBjdXJyZW50SW5kZXg7XG4gICAgfVxufVxuLyoqIEEgbmFtZXNwYWNlIGZvciBsaWNlbnNlIGNvbXBvbmVudHMgKi9cbihmdW5jdGlvbiAoTGljZW5zZXMpIHtcbiAgICAvKipcbiAgICAgKiBMaWNlbnNlIHJlcG9ydCBmb3JtYXRzIHVuZGVyc3Rvb2QgYnkgdGhlIHNlcnZlciAob25jZSBsb3dlci1jYXNlZClcbiAgICAgKi9cbiAgICBMaWNlbnNlcy5SRVBPUlRfRk9STUFUUyA9IHtcbiAgICAgICAgbWFya2Rvd246IHtcbiAgICAgICAgICAgIGlkOiAnbWFya2Rvd24nLFxuICAgICAgICAgICAgdGl0bGU6ICdNYXJrZG93bicsXG4gICAgICAgICAgICBpY29uOiBtYXJrZG93bkljb25cbiAgICAgICAgfSxcbiAgICAgICAgY3N2OiB7XG4gICAgICAgICAgICBpZDogJ2NzdicsXG4gICAgICAgICAgICB0aXRsZTogJ0NTVicsXG4gICAgICAgICAgICBpY29uOiBzcHJlYWRzaGVldEljb25cbiAgICAgICAgfSxcbiAgICAgICAganNvbjoge1xuICAgICAgICAgICAgaWQ6ICdjc3YnLFxuICAgICAgICAgICAgdGl0bGU6ICdKU09OJyxcbiAgICAgICAgICAgIGljb246IGpzb25JY29uXG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGZvcm1hdCAobW9zdCBodW1hbi1yZWFkYWJsZSlcbiAgICAgKi9cbiAgICBMaWNlbnNlcy5ERUZBVUxUX0ZPUk1BVCA9ICdtYXJrZG93bic7XG4gICAgLyoqXG4gICAgICogQSBtb2RlbCBmb3IgbGljZW5zZSBkYXRhXG4gICAgICovXG4gICAgY2xhc3MgTW9kZWwgZXh0ZW5kcyBWRG9tTW9kZWwge1xuICAgICAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRQYWNrYWdlQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl90cmFja2VyRGF0YUNoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFBhY2thZ2VJbmRleCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9saWNlbnNlc1JlYWR5ID0gbmV3IFByb21pc2VEZWxlZ2F0ZSgpO1xuICAgICAgICAgICAgdGhpcy5fcGFja2FnZUZpbHRlciA9IHt9O1xuICAgICAgICAgICAgdGhpcy5fdHJhbnMgPSBvcHRpb25zLnRyYW5zO1xuICAgICAgICAgICAgdGhpcy5fbGljZW5zZXNVcmwgPSBvcHRpb25zLmxpY2Vuc2VzVXJsO1xuICAgICAgICAgICAgdGhpcy5fc2VydmVyU2V0dGluZ3MgPVxuICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmVyU2V0dGluZ3MgfHwgU2VydmVyQ29ubmVjdGlvbi5tYWtlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmN1cnJlbnRCdW5kbGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudEJ1bmRsZU5hbWUgPSBvcHRpb25zLmN1cnJlbnRCdW5kbGVOYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGFja2FnZUZpbHRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhY2thZ2VGaWx0ZXIgPSBvcHRpb25zLnBhY2thZ2VGaWx0ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jdXJyZW50UGFja2FnZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFBhY2thZ2VJbmRleCA9IG9wdGlvbnMuY3VycmVudFBhY2thZ2VJbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIHRoZSBpbml0aWFsIHJlcXVlc3QgZm9yIHRoZSBsaWNlbnNlcyBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAgICAgICAqL1xuICAgICAgICBhc3luYyBpbml0TGljZW5zZXMoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgU2VydmVyQ29ubmVjdGlvbi5tYWtlUmVxdWVzdCh0aGlzLl9saWNlbnNlc1VybCwge30sIHRoaXMuX3NlcnZlclNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJSZXNwb25zZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9saWNlbnNlc1JlYWR5LnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGljZW5zZXNSZWFkeS5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgdGVtcG9yYXJ5IGRvd25sb2FkIGxpbmssIGFuZCBlbXVsYXRlIGNsaWNraW5nIGl0IHRvIHRyaWdnZXIgYSBuYW1lZFxuICAgICAgICAgKiBmaWxlIGRvd25sb2FkLlxuICAgICAgICAgKi9cbiAgICAgICAgYXN5bmMgZG93bmxvYWQob3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gYCR7dGhpcy5fbGljZW5zZXNVcmx9P2Zvcm1hdD0ke29wdGlvbnMuZm9ybWF0fSZkb3dubG9hZD0xYDtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICBlbGVtZW50LmhyZWYgPSB1cmw7XG4gICAgICAgICAgICBlbGVtZW50LmRvd25sb2FkID0gJyc7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGljaygpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGxpY2Vuc2VzIGZyb20gdGhlIHNlcnZlciBjaGFuZ2VcbiAgICAgICAgICovXG4gICAgICAgIGdldCBzZWxlY3RlZFBhY2thZ2VDaGFuZ2VkKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkUGFja2FnZUNoYW5nZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHRyYWNrYWJsZSBkYXRhIGNoYW5nZXNcbiAgICAgICAgICovXG4gICAgICAgIGdldCB0cmFja2VyRGF0YUNoYW5nZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJhY2tlckRhdGFDaGFuZ2VkO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbmFtZXMgb2YgdGhlIGxpY2Vuc2UgYnVuZGxlcyBhdmFpbGFibGVcbiAgICAgICAgICovXG4gICAgICAgIGdldCBidW5kbGVOYW1lcygpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cygoKF9hID0gdGhpcy5fc2VydmVyUmVzcG9uc2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5idW5kbGVzKSB8fCB7fSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjdXJyZW50IGxpY2Vuc2UgYnVuZGxlXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgY3VycmVudEJ1bmRsZU5hbWUoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudEJ1bmRsZU5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudEJ1bmRsZU5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5idW5kbGVOYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idW5kbGVOYW1lc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdGhlIGN1cnJlbnQgbGljZW5zZSBidW5kbGUsIGFuZCByZXNldCB0aGUgc2VsZWN0ZWQgaW5kZXhcbiAgICAgICAgICovXG4gICAgICAgIHNldCBjdXJyZW50QnVuZGxlTmFtZShjdXJyZW50QnVuZGxlTmFtZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRCdW5kbGVOYW1lICE9PSBjdXJyZW50QnVuZGxlTmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRCdW5kbGVOYW1lID0gY3VycmVudEJ1bmRsZU5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyYWNrZXJEYXRhQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGxpY2Vuc2VzIGFyZSBhdmFpbGFibGUgZnJvbSB0aGUgc2VydmVyXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgbGljZW5zZXNSZWFkeSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saWNlbnNlc1JlYWR5LnByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFsbCB0aGUgbGljZW5zZSBidW5kbGVzLCBrZXllZCBieSB0aGUgZGlzdHJpYnV0aW5nIHBhY2thZ2VzXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgYnVuZGxlcygpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHJldHVybiAoKF9hID0gdGhpcy5fc2VydmVyUmVzcG9uc2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5idW5kbGVzKSB8fCB7fTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGluZGV4IG9mIHRoZSBjdXJyZW50bHktc2VsZWN0ZWQgcGFja2FnZSB3aXRoaW4gaXRzIGxpY2Vuc2UgYnVuZGxlXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgY3VycmVudFBhY2thZ2VJbmRleCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50UGFja2FnZUluZGV4O1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVcGRhdGUgdGhlIGN1cnJlbnRseS1zZWxlY3RlZCBwYWNrYWdlIHdpdGhpbiBpdHMgbGljZW5zZSBidW5kbGVcbiAgICAgICAgICovXG4gICAgICAgIHNldCBjdXJyZW50UGFja2FnZUluZGV4KGN1cnJlbnRQYWNrYWdlSW5kZXgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50UGFja2FnZUluZGV4ID09PSBjdXJyZW50UGFja2FnZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFBhY2thZ2VJbmRleCA9IGN1cnJlbnRQYWNrYWdlSW5kZXg7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZFBhY2thZ2VDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgICAgIHRoaXMuX3RyYWNrZXJEYXRhQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBsaWNlbnNlIGRhdGEgZm9yIHRoZSBjdXJyZW50bHktc2VsZWN0ZWQgcGFja2FnZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IGN1cnJlbnRQYWNrYWdlKCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudEJ1bmRsZU5hbWUgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmJ1bmRsZXMgJiZcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50UGFja2FnZUluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWx0ZXJlZFBhY2thZ2VzKCgoX2EgPSB0aGlzLmJ1bmRsZXNbdGhpcy5jdXJyZW50QnVuZGxlTmFtZV0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wYWNrYWdlcykgfHwgW10pW3RoaXMuX2N1cnJlbnRQYWNrYWdlSW5kZXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgdHJhbnNsYXRpb24gYnVuZGxlXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgdHJhbnMoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnM7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IHRpdGxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuX2N1cnJlbnRCdW5kbGVOYW1lIHx8ICcnfSAke3RoaXMuX3RyYW5zLl9fKCdMaWNlbnNlcycpfWAudHJpbSgpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY3VycmVudCBwYWNrYWdlIGZpbHRlclxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IHBhY2thZ2VGaWx0ZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFja2FnZUZpbHRlcjtcbiAgICAgICAgfVxuICAgICAgICBzZXQgcGFja2FnZUZpbHRlcihwYWNrYWdlRmlsdGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9wYWNrYWdlRmlsdGVyID0gcGFja2FnZUZpbHRlcjtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgICAgIHRoaXMuX3RyYWNrZXJEYXRhQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBmaWx0ZXJlZCBwYWNrYWdlcyBmcm9tIGN1cnJlbnQgYnVuZGxlIHdoZXJlIGF0IGxlYXN0IG9uZSB0b2tlbiBvZiBlYWNoXG4gICAgICAgICAqIGtleSBpcyBwcmVzZW50LlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0RmlsdGVyZWRQYWNrYWdlcyhhbGxSb3dzKSB7XG4gICAgICAgICAgICBsZXQgcm93cyA9IFtdO1xuICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSBPYmplY3QuZW50cmllcyh0aGlzLl9wYWNrYWdlRmlsdGVyKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKFtrLCB2XSkgPT4gdiAmJiBgJHt2fWAudHJpbSgpLmxlbmd0aClcbiAgICAgICAgICAgICAgICAubWFwKChbaywgdl0pID0+IFtrLCBgJHt2fWAudG9Mb3dlckNhc2UoKS50cmltKCkuc3BsaXQoJyAnKV0pO1xuICAgICAgICAgICAgZm9yIChjb25zdCByb3cgb2YgYWxsUm93cykge1xuICAgICAgICAgICAgICAgIGxldCBrZXlIaXRzID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IFtrZXksIGJpdHNdIG9mIGZpbHRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJpdEhpdHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcm93S2V5VmFsdWUgPSBgJHtyb3dba2V5XX1gLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYml0IG9mIGJpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dLZXlWYWx1ZS5pbmNsdWRlcyhiaXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYml0SGl0cyArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChiaXRIaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlIaXRzICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGtleUhpdHMgPT09IGZpbHRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKHJvd3MpO1xuICAgICAgICB9XG4gICAgfVxuICAgIExpY2Vuc2VzLk1vZGVsID0gTW9kZWw7XG4gICAgLyoqXG4gICAgICogQSBmaWx0ZXIgZm9ybSBmb3IgbGltaXRpbmcgdGhlIHBhY2thZ2VzIGRpc3BsYXllZFxuICAgICAqL1xuICAgIGNsYXNzIEZpbHRlcnMgZXh0ZW5kcyBWRG9tUmVuZGVyZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihtb2RlbCkge1xuICAgICAgICAgICAgc3VwZXIobW9kZWwpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZW5kZXIgYSBmaWx0ZXIgaW5wdXRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJGaWx0ZXIgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLm1vZGVsLnBhY2thZ2VGaWx0ZXJba2V5XSB8fCAnJztcbiAgICAgICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IHR5cGU6IFwidGV4dFwiLCBuYW1lOiBrZXksIGRlZmF1bHRWYWx1ZTogdmFsdWUsIGNsYXNzTmFtZTogXCJqcC1tb2Qtc3R5bGVkXCIsIG9uSW5wdXQ6IHRoaXMub25GaWx0ZXJJbnB1dCB9KSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBIYW5kbGUgYSBmaWx0ZXIgaW5wdXQgY2hhbmdpbmdcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5vbkZpbHRlcklucHV0ID0gKGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZXZ0LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gaW5wdXQ7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5wYWNrYWdlRmlsdGVyID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLm1vZGVsLnBhY2thZ2VGaWx0ZXIpLCB7IFtuYW1lXTogdmFsdWUgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtTGljZW5zZXMtRmlsdGVycycpO1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtUmVuZGVyZWRIVE1MQ29tbW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgICAgY29uc3QgeyB0cmFucyB9ID0gdGhpcy5tb2RlbDtcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3Ryb25nXCIsIG51bGwsIHRyYW5zLl9fKCdGaWx0ZXIgTGljZW5zZXMgQnknKSkpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCB0cmFucy5fXygnUGFja2FnZScpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyRmlsdGVyKCduYW1lJykpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCB0cmFucy5fXygnVmVyc2lvbicpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyRmlsdGVyKCd2ZXJzaW9uSW5mbycpKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgdHJhbnMuX18oJ0xpY2Vuc2UnKSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckZpbHRlcignbGljZW5zZUlkJykpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInN0cm9uZ1wiLCBudWxsLCB0cmFucy5fXygnRGlzdHJpYnV0aW9ucycpKSkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBMaWNlbnNlcy5GaWx0ZXJzID0gRmlsdGVycztcbiAgICAvKipcbiAgICAgKiBBIGZhbmN5IGJ1bmRsZSByZW5kZXJlciB3aXRoIHRoZSBwYWNrYWdlIGNvdW50XG4gICAgICovXG4gICAgY2xhc3MgQnVuZGxlVGFiUmVuZGVyZXIgZXh0ZW5kcyBUYWJCYXIuUmVuZGVyZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihtb2RlbCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VJY29uU2VsZWN0b3IgPSAnLmxtLVRhYkJhci10YWJDbG9zZUljb24nO1xuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW5kZXIgYSBmdWxsIGJ1bmRsZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVuZGVyVGFiKGRhdGEpIHtcbiAgICAgICAgICAgIGxldCB0aXRsZSA9IGRhdGEudGl0bGUuY2FwdGlvbjtcbiAgICAgICAgICAgIGxldCBrZXkgPSB0aGlzLmNyZWF0ZVRhYktleShkYXRhKTtcbiAgICAgICAgICAgIGxldCBzdHlsZSA9IHRoaXMuY3JlYXRlVGFiU3R5bGUoZGF0YSk7XG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5jcmVhdGVUYWJDbGFzcyhkYXRhKTtcbiAgICAgICAgICAgIGxldCBkYXRhc2V0ID0gdGhpcy5jcmVhdGVUYWJEYXRhc2V0KGRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIGgubGkoeyBrZXksIGNsYXNzTmFtZSwgdGl0bGUsIHN0eWxlLCBkYXRhc2V0IH0sIHRoaXMucmVuZGVySWNvbihkYXRhKSwgdGhpcy5yZW5kZXJMYWJlbChkYXRhKSwgdGhpcy5yZW5kZXJDb3VudEJhZGdlKGRhdGEpKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmVuZGVyIHRoZSBwYWNrYWdlIGNvdW50XG4gICAgICAgICAqL1xuICAgICAgICByZW5kZXJDb3VudEJhZGdlKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1bmRsZSA9IGRhdGEudGl0bGUubGFiZWw7XG4gICAgICAgICAgICBjb25zdCB7IGJ1bmRsZXMgfSA9IHRoaXMubW9kZWw7XG4gICAgICAgICAgICBjb25zdCBwYWNrYWdlcyA9IHRoaXMubW9kZWwuZ2V0RmlsdGVyZWRQYWNrYWdlcygoYnVuZGxlcyAmJiBidW5kbGUgPyBidW5kbGVzW2J1bmRsZV0ucGFja2FnZXMgOiBbXSkgfHwgW10pO1xuICAgICAgICAgICAgcmV0dXJuIGgubGFiZWwoe30sIGAke3BhY2thZ2VzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBMaWNlbnNlcy5CdW5kbGVUYWJSZW5kZXJlciA9IEJ1bmRsZVRhYlJlbmRlcmVyO1xuICAgIC8qKlxuICAgICAqIEEgZ3JpZCBvZiBsaWNlbnNlc1xuICAgICAqL1xuICAgIGNsYXNzIEdyaWQgZXh0ZW5kcyBWRG9tUmVuZGVyZXIge1xuICAgICAgICBjb25zdHJ1Y3Rvcihtb2RlbCkge1xuICAgICAgICAgICAgc3VwZXIobW9kZWwpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZW5kZXIgYSBzaW5nbGUgcGFja2FnZSdzIGxpY2Vuc2UgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJSb3cgPSAocm93LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gaW5kZXggPT09IHRoaXMubW9kZWwuY3VycmVudFBhY2thZ2VJbmRleDtcbiAgICAgICAgICAgICAgICBjb25zdCBvbkNoZWNrID0gKCkgPT4gKHRoaXMubW9kZWwuY3VycmVudFBhY2thZ2VJbmRleCA9IGluZGV4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCB7IGtleTogcm93Lm5hbWUsIGNsYXNzTmFtZTogc2VsZWN0ZWQgPyAnanAtbW9kLXNlbGVjdGVkJyA6ICcnLCBvbkNsaWNrOiBvbkNoZWNrIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgdHlwZTogXCJyYWRpb1wiLCBuYW1lOiBcInNob3ctcGFja2FnZS1saWNlbnNlXCIsIHZhbHVlOiBpbmRleCwgb25DaGFuZ2U6IG9uQ2hlY2ssIGNoZWNrZWQ6IHNlbGVjdGVkIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRoXCIsIG51bGwsIHJvdy5uYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiY29kZVwiLCBudWxsLCByb3cudmVyc2lvbkluZm8pKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiY29kZVwiLCBudWxsLCByb3cubGljZW5zZUlkKSkpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1MaWNlbnNlcy1HcmlkJyk7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1SZW5kZXJlZEhUTUxDb21tb24nKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmVuZGVyIGEgZ3JpZCBvZiBwYWNrYWdlIGxpY2Vuc2UgaW5mb3JtYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IHsgYnVuZGxlcywgY3VycmVudEJ1bmRsZU5hbWUsIHRyYW5zIH0gPSB0aGlzLm1vZGVsO1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRQYWNrYWdlcyA9IHRoaXMubW9kZWwuZ2V0RmlsdGVyZWRQYWNrYWdlcyhidW5kbGVzICYmIGN1cnJlbnRCdW5kbGVOYW1lXG4gICAgICAgICAgICAgICAgPyAoKF9hID0gYnVuZGxlc1tjdXJyZW50QnVuZGxlTmFtZV0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wYWNrYWdlcykgfHwgW11cbiAgICAgICAgICAgICAgICA6IFtdKTtcbiAgICAgICAgICAgIGlmICghZmlsdGVyZWRQYWNrYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJibG9ja3F1b3RlXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJlbVwiLCBudWxsLCB0cmFucy5fXygnTm8gUGFja2FnZXMgZm91bmQnKSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImZvcm1cIiwgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRoZWFkXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwgbnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRoXCIsIG51bGwsIHRyYW5zLl9fKCdQYWNrYWdlJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiLCBudWxsLCB0cmFucy5fXygnVmVyc2lvbicpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhcIiwgbnVsbCwgdHJhbnMuX18oJ0xpY2Vuc2UnKSkpKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRib2R5XCIsIG51bGwsIGZpbHRlcmVkUGFja2FnZXMubWFwKHRoaXMucmVuZGVyUm93KSkpKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgTGljZW5zZXMuR3JpZCA9IEdyaWQ7XG4gICAgLyoqXG4gICAgICogQSBwYWNrYWdlJ3MgZnVsbCBsaWNlbnNlIHRleHRcbiAgICAgKi9cbiAgICBjbGFzcyBGdWxsVGV4dCBleHRlbmRzIFZEb21SZW5kZXJlciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKG1vZGVsKSB7XG4gICAgICAgICAgICBzdXBlcihtb2RlbCk7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1MaWNlbnNlcy1UZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1SZW5kZXJlZEhUTUxDb21tb24nKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLVJlbmRlcmVkTWFya2Rvd24nKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmVuZGVyIHRoZSBsaWNlbnNlIHRleHQsIG9yIGEgbnVsbCBzdGF0ZSBpZiBubyBwYWNrYWdlIGlzIHNlbGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgICBjb25zdCB7IGN1cnJlbnRQYWNrYWdlLCB0cmFucyB9ID0gdGhpcy5tb2RlbDtcbiAgICAgICAgICAgIGxldCBoZWFkID0gJyc7XG4gICAgICAgICAgICBsZXQgcXVvdGUgPSB0cmFucy5fXygnTm8gUGFja2FnZSBzZWxlY3RlZCcpO1xuICAgICAgICAgICAgbGV0IGNvZGUgPSAnJztcbiAgICAgICAgICAgIGlmIChjdXJyZW50UGFja2FnZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgbmFtZSwgdmVyc2lvbkluZm8sIGxpY2Vuc2VJZCwgZXh0cmFjdGVkVGV4dCB9ID0gY3VycmVudFBhY2thZ2U7XG4gICAgICAgICAgICAgICAgaGVhZCA9IGAke25hbWV9IHYke3ZlcnNpb25JbmZvfWA7XG4gICAgICAgICAgICAgICAgcXVvdGUgPSBgJHt0cmFucy5fXygnTGljZW5zZScpfTogJHtsaWNlbnNlSWQgfHwgdHJhbnMuX18oJ05vIExpY2Vuc2UgSUQgZm91bmQnKX1gO1xuICAgICAgICAgICAgICAgIGNvZGUgPSBleHRyYWN0ZWRUZXh0IHx8IHRyYW5zLl9fKCdObyBMaWNlbnNlIFRleHQgZm91bmQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImgxXCIsIHsga2V5OiBcImgxXCIgfSwgaGVhZCksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJsb2NrcXVvdGVcIiwgeyBrZXk6IFwicXVvdGVcIiB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZW1cIiwgbnVsbCwgcXVvdGUpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiY29kZVwiLCB7IGtleTogXCJjb2RlXCIgfSwgY29kZSlcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgTGljZW5zZXMuRnVsbFRleHQgPSBGdWxsVGV4dDtcbn0pKExpY2Vuc2VzIHx8IChMaWNlbnNlcyA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saWNlbnNlcy5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9