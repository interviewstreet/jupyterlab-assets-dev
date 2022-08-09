(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_mainmenu_lib_index_js"],{

/***/ "../../packages/mainmenu/lib/edit.js":
/*!*******************************************!*\
  !*** ../../packages/mainmenu/lib/edit.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditMenu": () => (/* binding */ EditMenu)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * An extensible Edit menu for the application.
 */
class EditMenu extends _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.RankedMenu {
    /**
     * Construct the edit menu.
     */
    constructor(options) {
        super(options);
        this.undoers = new Set();
        this.clearers = new Set();
        this.goToLiners = new Set();
    }
    /**
     * Dispose of the resources held by the edit menu.
     */
    dispose() {
        this.undoers.clear();
        this.clearers.clear();
        super.dispose();
    }
}
//# sourceMappingURL=edit.js.map

/***/ }),

/***/ "../../packages/mainmenu/lib/file.js":
/*!*******************************************!*\
  !*** ../../packages/mainmenu/lib/file.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileMenu": () => (/* binding */ FileMenu)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * An extensible FileMenu for the application.
 */
class FileMenu extends _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.RankedMenu {
    constructor(options) {
        super(options);
        this.quitEntry = false;
        // Create the "New" submenu.
        this.closeAndCleaners = new Set();
        this.consoleCreators = new Set();
    }
    /**
     * The New submenu.
     */
    get newMenu() {
        var _a, _b;
        if (!this._newMenu) {
            this._newMenu = (_b = (_a = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__.find)(this.items, menu => { var _a; return ((_a = menu.submenu) === null || _a === void 0 ? void 0 : _a.id) === 'jp-mainmenu-file-new'; })) === null || _a === void 0 ? void 0 : _a.submenu) !== null && _b !== void 0 ? _b : new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.RankedMenu({
                commands: this.commands
            });
        }
        return this._newMenu;
    }
    /**
     * Dispose of the resources held by the file menu.
     */
    dispose() {
        var _a;
        (_a = this._newMenu) === null || _a === void 0 ? void 0 : _a.dispose();
        this.consoleCreators.clear();
        super.dispose();
    }
}
//# sourceMappingURL=file.js.map

/***/ }),

/***/ "../../packages/mainmenu/lib/help.js":
/*!*******************************************!*\
  !*** ../../packages/mainmenu/lib/help.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpMenu": () => (/* binding */ HelpMenu)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * An extensible Help menu for the application.
 */
class HelpMenu extends _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.RankedMenu {
    /**
     * Construct the help menu.
     */
    constructor(options) {
        super(options);
        this.kernelUsers = new Set();
    }
}
//# sourceMappingURL=help.js.map

/***/ }),

/***/ "../../packages/mainmenu/lib/index.js":
/*!********************************************!*\
  !*** ../../packages/mainmenu/lib/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainMenu": () => (/* reexport safe */ _mainmenu__WEBPACK_IMPORTED_MODULE_0__.MainMenu),
/* harmony export */   "EditMenu": () => (/* reexport safe */ _edit__WEBPACK_IMPORTED_MODULE_1__.EditMenu),
/* harmony export */   "FileMenu": () => (/* reexport safe */ _file__WEBPACK_IMPORTED_MODULE_2__.FileMenu),
/* harmony export */   "HelpMenu": () => (/* reexport safe */ _help__WEBPACK_IMPORTED_MODULE_3__.HelpMenu),
/* harmony export */   "KernelMenu": () => (/* reexport safe */ _kernel__WEBPACK_IMPORTED_MODULE_4__.KernelMenu),
/* harmony export */   "RunMenu": () => (/* reexport safe */ _run__WEBPACK_IMPORTED_MODULE_5__.RunMenu),
/* harmony export */   "SettingsMenu": () => (/* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_6__.SettingsMenu),
/* harmony export */   "ViewMenu": () => (/* reexport safe */ _view__WEBPACK_IMPORTED_MODULE_7__.ViewMenu),
/* harmony export */   "TabsMenu": () => (/* reexport safe */ _tabs__WEBPACK_IMPORTED_MODULE_8__.TabsMenu),
/* harmony export */   "IMainMenu": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_9__.IMainMenu),
/* harmony export */   "IJupyterLabMenu": () => (/* reexport safe */ _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_10__.IRankedMenu),
/* harmony export */   "JupyterLabMenu": () => (/* reexport safe */ _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_10__.RankedMenu)
/* harmony export */ });
/* harmony import */ var _mainmenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mainmenu */ "../../packages/mainmenu/lib/mainmenu.js");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "../../packages/mainmenu/lib/edit.js");
/* harmony import */ var _file__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./file */ "../../packages/mainmenu/lib/file.js");
/* harmony import */ var _help__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./help */ "../../packages/mainmenu/lib/help.js");
/* harmony import */ var _kernel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./kernel */ "../../packages/mainmenu/lib/kernel.js");
/* harmony import */ var _run__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./run */ "../../packages/mainmenu/lib/run.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./settings */ "../../packages/mainmenu/lib/settings.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./view */ "../../packages/mainmenu/lib/view.js");
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tabs */ "../../packages/mainmenu/lib/tabs.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tokens */ "../../packages/mainmenu/lib/tokens.js");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_10__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module mainmenu
 */










/**
 * @deprecated since version 3.1
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/mainmenu/lib/kernel.js":
/*!*********************************************!*\
  !*** ../../packages/mainmenu/lib/kernel.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KernelMenu": () => (/* binding */ KernelMenu)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * An extensible Kernel menu for the application.
 */
class KernelMenu extends _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.RankedMenu {
    /**
     * Construct the kernel menu.
     */
    constructor(options) {
        super(options);
        this.kernelUsers = new Set();
    }
    /**
     * Dispose of the resources held by the kernel menu.
     */
    dispose() {
        this.kernelUsers.clear();
        super.dispose();
    }
}
//# sourceMappingURL=kernel.js.map

/***/ }),

/***/ "../../packages/mainmenu/lib/mainmenu.js":
/*!***********************************************!*\
  !*** ../../packages/mainmenu/lib/mainmenu.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainMenu": () => (/* binding */ MainMenu)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "../../packages/mainmenu/lib/edit.js");
/* harmony import */ var _file__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./file */ "../../packages/mainmenu/lib/file.js");
/* harmony import */ var _help__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./help */ "../../packages/mainmenu/lib/help.js");
/* harmony import */ var _kernel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./kernel */ "../../packages/mainmenu/lib/kernel.js");
/* harmony import */ var _run__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./run */ "../../packages/mainmenu/lib/run.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./settings */ "../../packages/mainmenu/lib/settings.js");
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./tabs */ "../../packages/mainmenu/lib/tabs.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./view */ "../../packages/mainmenu/lib/view.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.











/**
 * The main menu class.  It is intended to be used as a singleton.
 */
class MainMenu extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.MenuBar {
    /**
     * Construct the main menu bar.
     */
    constructor(commands) {
        super();
        this._items = [];
        this._commands = commands;
    }
    /**
     * The application "Edit" menu.
     */
    get editMenu() {
        if (!this._editMenu) {
            this._editMenu = new _edit__WEBPACK_IMPORTED_MODULE_3__.EditMenu({
                commands: this._commands,
                rank: 2,
                renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.defaultRenderer
            });
        }
        return this._editMenu;
    }
    /**
     * The application "File" menu.
     */
    get fileMenu() {
        if (!this._fileMenu) {
            this._fileMenu = new _file__WEBPACK_IMPORTED_MODULE_4__.FileMenu({
                commands: this._commands,
                rank: 1,
                renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.defaultRenderer
            });
        }
        return this._fileMenu;
    }
    /**
     * The application "Help" menu.
     */
    get helpMenu() {
        if (!this._helpMenu) {
            this._helpMenu = new _help__WEBPACK_IMPORTED_MODULE_5__.HelpMenu({
                commands: this._commands,
                rank: 1000,
                renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.defaultRenderer
            });
        }
        return this._helpMenu;
    }
    /**
     * The application "Kernel" menu.
     */
    get kernelMenu() {
        if (!this._kernelMenu) {
            this._kernelMenu = new _kernel__WEBPACK_IMPORTED_MODULE_6__.KernelMenu({
                commands: this._commands,
                rank: 5,
                renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.defaultRenderer
            });
        }
        return this._kernelMenu;
    }
    /**
     * The application "Run" menu.
     */
    get runMenu() {
        if (!this._runMenu) {
            this._runMenu = new _run__WEBPACK_IMPORTED_MODULE_7__.RunMenu({
                commands: this._commands,
                rank: 4,
                renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.defaultRenderer
            });
        }
        return this._runMenu;
    }
    /**
     * The application "Settings" menu.
     */
    get settingsMenu() {
        if (!this._settingsMenu) {
            this._settingsMenu = new _settings__WEBPACK_IMPORTED_MODULE_8__.SettingsMenu({
                commands: this._commands,
                rank: 999,
                renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.defaultRenderer
            });
        }
        return this._settingsMenu;
    }
    /**
     * The application "View" menu.
     */
    get viewMenu() {
        if (!this._viewMenu) {
            this._viewMenu = new _view__WEBPACK_IMPORTED_MODULE_9__.ViewMenu({
                commands: this._commands,
                rank: 3,
                renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.defaultRenderer
            });
        }
        return this._viewMenu;
    }
    /**
     * The application "Tabs" menu.
     */
    get tabsMenu() {
        if (!this._tabsMenu) {
            this._tabsMenu = new _tabs__WEBPACK_IMPORTED_MODULE_10__.TabsMenu({
                commands: this._commands,
                rank: 500,
                renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.defaultRenderer
            });
        }
        return this._tabsMenu;
    }
    /**
     * Add a new menu to the main menu bar.
     */
    addMenu(menu, options = {}) {
        if (_lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__.ArrayExt.firstIndexOf(this.menus, menu) > -1) {
            return;
        }
        // override default renderer with svg-supporting renderer
        _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.overrideDefaultRenderer(menu);
        const rank = 'rank' in options
            ? options.rank
            : 'rank' in menu
                ? menu.rank
                : _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.IRankedMenu.DEFAULT_RANK;
        const rankItem = { menu, rank };
        const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__.ArrayExt.upperBound(this._items, rankItem, Private.itemCmp);
        // Upon disposal, remove the menu and its rank reference.
        menu.disposed.connect(this._onMenuDisposed, this);
        _lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__.ArrayExt.insert(this._items, index, rankItem);
        /**
         * Create a new menu.
         */
        this.insertMenu(index, menu);
        // Link the menu to the API - backward compatibility when switching to menu description in settings
        switch (menu.id) {
            case 'jp-mainmenu-file':
                if (!this._fileMenu && menu instanceof _file__WEBPACK_IMPORTED_MODULE_4__.FileMenu) {
                    this._fileMenu = menu;
                }
                break;
            case 'jp-mainmenu-edit':
                if (!this._editMenu && menu instanceof _edit__WEBPACK_IMPORTED_MODULE_3__.EditMenu) {
                    this._editMenu = menu;
                }
                break;
            case 'jp-mainmenu-view':
                if (!this._viewMenu && menu instanceof _view__WEBPACK_IMPORTED_MODULE_9__.ViewMenu) {
                    this._viewMenu = menu;
                }
                break;
            case 'jp-mainmenu-run':
                if (!this._runMenu && menu instanceof _run__WEBPACK_IMPORTED_MODULE_7__.RunMenu) {
                    this._runMenu = menu;
                }
                break;
            case 'jp-mainmenu-kernel':
                if (!this._kernelMenu && menu instanceof _kernel__WEBPACK_IMPORTED_MODULE_6__.KernelMenu) {
                    this._kernelMenu = menu;
                }
                break;
            case 'jp-mainmenu-tabs':
                if (!this._tabsMenu && menu instanceof _tabs__WEBPACK_IMPORTED_MODULE_10__.TabsMenu) {
                    this._tabsMenu = menu;
                }
                break;
            case 'jp-mainmenu-settings':
                if (!this._settingsMenu && menu instanceof _settings__WEBPACK_IMPORTED_MODULE_8__.SettingsMenu) {
                    this._settingsMenu = menu;
                }
                break;
            case 'jp-mainmenu-help':
                if (!this._helpMenu && menu instanceof _help__WEBPACK_IMPORTED_MODULE_5__.HelpMenu) {
                    this._helpMenu = menu;
                }
                break;
        }
    }
    /**
     * Dispose of the resources held by the menu bar.
     */
    dispose() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_a = this._editMenu) === null || _a === void 0 ? void 0 : _a.dispose();
        (_b = this._fileMenu) === null || _b === void 0 ? void 0 : _b.dispose();
        (_c = this._helpMenu) === null || _c === void 0 ? void 0 : _c.dispose();
        (_d = this._kernelMenu) === null || _d === void 0 ? void 0 : _d.dispose();
        (_e = this._runMenu) === null || _e === void 0 ? void 0 : _e.dispose();
        (_f = this._settingsMenu) === null || _f === void 0 ? void 0 : _f.dispose();
        (_g = this._viewMenu) === null || _g === void 0 ? void 0 : _g.dispose();
        (_h = this._tabsMenu) === null || _h === void 0 ? void 0 : _h.dispose();
        super.dispose();
    }
    /**
     * Generate the menu.
     *
     * @param commands The command registry
     * @param options The main menu options.
     * @param trans - The application language translator.
     */
    static generateMenu(commands, options, trans) {
        let menu;
        const { id, label, rank } = options;
        switch (id) {
            case 'jp-mainmenu-file':
                menu = new _file__WEBPACK_IMPORTED_MODULE_4__.FileMenu({
                    commands,
                    rank,
                    renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.defaultRenderer
                });
                break;
            case 'jp-mainmenu-edit':
                menu = new _edit__WEBPACK_IMPORTED_MODULE_3__.EditMenu({
                    commands,
                    rank,
                    renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.defaultRenderer
                });
                break;
            case 'jp-mainmenu-view':
                menu = new _view__WEBPACK_IMPORTED_MODULE_9__.ViewMenu({
                    commands,
                    rank,
                    renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.defaultRenderer
                });
                break;
            case 'jp-mainmenu-run':
                menu = new _run__WEBPACK_IMPORTED_MODULE_7__.RunMenu({
                    commands,
                    rank,
                    renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.defaultRenderer
                });
                break;
            case 'jp-mainmenu-kernel':
                menu = new _kernel__WEBPACK_IMPORTED_MODULE_6__.KernelMenu({
                    commands,
                    rank,
                    renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.defaultRenderer
                });
                break;
            case 'jp-mainmenu-tabs':
                menu = new _tabs__WEBPACK_IMPORTED_MODULE_10__.TabsMenu({
                    commands,
                    rank,
                    renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.defaultRenderer
                });
                break;
            case 'jp-mainmenu-settings':
                menu = new _settings__WEBPACK_IMPORTED_MODULE_8__.SettingsMenu({
                    commands,
                    rank,
                    renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.defaultRenderer
                });
                break;
            case 'jp-mainmenu-help':
                menu = new _help__WEBPACK_IMPORTED_MODULE_5__.HelpMenu({
                    commands,
                    rank,
                    renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.defaultRenderer
                });
                break;
            default:
                menu = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.RankedMenu({
                    commands,
                    rank,
                    renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.MenuSvg.defaultRenderer
                });
        }
        if (label) {
            menu.title.label = trans._p('menu', label);
        }
        return menu;
    }
    /**
     * Handle the disposal of a menu.
     */
    _onMenuDisposed(menu) {
        this.removeMenu(menu);
        const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__.ArrayExt.findFirstIndex(this._items, item => item.menu === menu);
        if (index !== -1) {
            _lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__.ArrayExt.removeAt(this._items, index);
        }
    }
}
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * A comparator function for menu rank items.
     */
    function itemCmp(first, second) {
        return first.rank - second.rank;
    }
    Private.itemCmp = itemCmp;
})(Private || (Private = {}));
//# sourceMappingURL=mainmenu.js.map

/***/ }),

/***/ "../../packages/mainmenu/lib/run.js":
/*!******************************************!*\
  !*** ../../packages/mainmenu/lib/run.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RunMenu": () => (/* binding */ RunMenu)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * An extensible Run menu for the application.
 */
class RunMenu extends _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.RankedMenu {
    /**
     * Construct the run menu.
     */
    constructor(options) {
        super(options);
        this.codeRunners = new Set();
    }
    /**
     * Dispose of the resources held by the run menu.
     */
    dispose() {
        this.codeRunners.clear();
        super.dispose();
    }
}
//# sourceMappingURL=run.js.map

/***/ }),

/***/ "../../packages/mainmenu/lib/settings.js":
/*!***********************************************!*\
  !*** ../../packages/mainmenu/lib/settings.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsMenu": () => (/* binding */ SettingsMenu)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * An extensible Settings menu for the application.
 */
class SettingsMenu extends _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.RankedMenu {
    /**
     * Construct the settings menu.
     */
    constructor(options) {
        super(options);
    }
}
//# sourceMappingURL=settings.js.map

/***/ }),

/***/ "../../packages/mainmenu/lib/tabs.js":
/*!*******************************************!*\
  !*** ../../packages/mainmenu/lib/tabs.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabsMenu": () => (/* binding */ TabsMenu)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * An extensible Tabs menu for the application.
 */
class TabsMenu extends _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.RankedMenu {
    /**
     * Construct the tabs menu.
     */
    constructor(options) {
        super(options);
    }
}
//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ "../../packages/mainmenu/lib/tokens.js":
/*!*********************************************!*\
  !*** ../../packages/mainmenu/lib/tokens.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IMainMenu": () => (/* binding */ IMainMenu)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The main menu token.
 */
const IMainMenu = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/mainmenu:IMainMenu');
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/mainmenu/lib/view.js":
/*!*******************************************!*\
  !*** ../../packages/mainmenu/lib/view.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewMenu": () => (/* binding */ ViewMenu)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * An extensible View menu for the application.
 */
class ViewMenu extends _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.RankedMenu {
    /**
     * Construct the view menu.
     */
    constructor(options) {
        super(options);
        this.editorViewers = new Set();
    }
    /**
     * Dispose of the resources held by the view menu.
     */
    dispose() {
        this.editorViewers.clear();
        super.dispose();
    }
}
//# sourceMappingURL=view.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbWFpbm1lbnUvbGliL2VkaXQuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL21haW5tZW51L2xpYi9maWxlLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9tYWlubWVudS9saWIvaGVscC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbWFpbm1lbnUvbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9tYWlubWVudS9saWIva2VybmVsLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9tYWlubWVudS9saWIvbWFpbm1lbnUuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL21haW5tZW51L2xpYi9ydW4uanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL21haW5tZW51L2xpYi9zZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbWFpbm1lbnUvbGliL3RhYnMuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL21haW5tZW51L2xpYi90b2tlbnMuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL21haW5tZW51L2xpYi92aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7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Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ08sdUJBQXVCLGlFQUFVO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0M7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEE7QUFDQTtBQUMwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNPLHNCQUFzQixvREFBSztBQUNsQyxrQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ3VEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNPLHVCQUF1QixpRUFBVTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQyIsImZpbGUiOiJwYWNrYWdlc19tYWlubWVudV9saWJfaW5kZXhfanMuZTQ3MjdmYTk1MTcxODQ5YzhiNmYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBSYW5rZWRNZW51IH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG4vKipcbiAqIEFuIGV4dGVuc2libGUgRWRpdCBtZW51IGZvciB0aGUgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBFZGl0TWVudSBleHRlbmRzIFJhbmtlZE1lbnUge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCB0aGUgZWRpdCBtZW51LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMudW5kb2VycyA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5jbGVhcmVycyA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5nb1RvTGluZXJzID0gbmV3IFNldCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUgZWRpdCBtZW51LlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMudW5kb2Vycy5jbGVhcigpO1xuICAgICAgICB0aGlzLmNsZWFyZXJzLmNsZWFyKCk7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lZGl0LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFJhbmtlZE1lbnUgfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IGZpbmQgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG4vKipcbiAqIEFuIGV4dGVuc2libGUgRmlsZU1lbnUgZm9yIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEZpbGVNZW51IGV4dGVuZHMgUmFua2VkTWVudSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5xdWl0RW50cnkgPSBmYWxzZTtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBcIk5ld1wiIHN1Ym1lbnUuXG4gICAgICAgIHRoaXMuY2xvc2VBbmRDbGVhbmVycyA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5jb25zb2xlQ3JlYXRvcnMgPSBuZXcgU2V0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBOZXcgc3VibWVudS5cbiAgICAgKi9cbiAgICBnZXQgbmV3TWVudSgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgaWYgKCF0aGlzLl9uZXdNZW51KSB7XG4gICAgICAgICAgICB0aGlzLl9uZXdNZW51ID0gKF9iID0gKF9hID0gZmluZCh0aGlzLml0ZW1zLCBtZW51ID0+IHsgdmFyIF9hOyByZXR1cm4gKChfYSA9IG1lbnUuc3VibWVudSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkKSA9PT0gJ2pwLW1haW5tZW51LWZpbGUtbmV3JzsgfSkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zdWJtZW51KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBuZXcgUmFua2VkTWVudSh7XG4gICAgICAgICAgICAgICAgY29tbWFuZHM6IHRoaXMuY29tbWFuZHNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9uZXdNZW51O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUgZmlsZSBtZW51LlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy5fbmV3TWVudSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5jb25zb2xlQ3JlYXRvcnMuY2xlYXIoKTtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbGUuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgUmFua2VkTWVudSB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuLyoqXG4gKiBBbiBleHRlbnNpYmxlIEhlbHAgbWVudSBmb3IgdGhlIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgSGVscE1lbnUgZXh0ZW5kcyBSYW5rZWRNZW51IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgdGhlIGhlbHAgbWVudS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmtlcm5lbFVzZXJzID0gbmV3IFNldCgpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlbHAuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgbWFpbm1lbnVcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9tYWlubWVudSc7XG5leHBvcnQgKiBmcm9tICcuL2VkaXQnO1xuZXhwb3J0ICogZnJvbSAnLi9maWxlJztcbmV4cG9ydCAqIGZyb20gJy4vaGVscCc7XG5leHBvcnQgKiBmcm9tICcuL2tlcm5lbCc7XG5leHBvcnQgKiBmcm9tICcuL3J1bic7XG5leHBvcnQgKiBmcm9tICcuL3NldHRpbmdzJztcbmV4cG9ydCAqIGZyb20gJy4vdmlldyc7XG5leHBvcnQgKiBmcm9tICcuL3RhYnMnO1xuZXhwb3J0ICogZnJvbSAnLi90b2tlbnMnO1xuLyoqXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDMuMVxuICovXG5leHBvcnQgeyBJUmFua2VkTWVudSBhcyBJSnVweXRlckxhYk1lbnUsIFJhbmtlZE1lbnUgYXMgSnVweXRlckxhYk1lbnUgfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFJhbmtlZE1lbnUgfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbi8qKlxuICogQW4gZXh0ZW5zaWJsZSBLZXJuZWwgbWVudSBmb3IgdGhlIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgS2VybmVsTWVudSBleHRlbmRzIFJhbmtlZE1lbnUge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCB0aGUga2VybmVsIG1lbnUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5rZXJuZWxVc2VycyA9IG5ldyBTZXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIGtlcm5lbCBtZW51LlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMua2VybmVsVXNlcnMuY2xlYXIoKTtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWtlcm5lbC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBJUmFua2VkTWVudSwgTWVudVN2ZywgUmFua2VkTWVudSB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgQXJyYXlFeHQgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG5pbXBvcnQgeyBNZW51QmFyIH0gZnJvbSAnQGx1bWluby93aWRnZXRzJztcbmltcG9ydCB7IEVkaXRNZW51IH0gZnJvbSAnLi9lZGl0JztcbmltcG9ydCB7IEZpbGVNZW51IH0gZnJvbSAnLi9maWxlJztcbmltcG9ydCB7IEhlbHBNZW51IH0gZnJvbSAnLi9oZWxwJztcbmltcG9ydCB7IEtlcm5lbE1lbnUgfSBmcm9tICcuL2tlcm5lbCc7XG5pbXBvcnQgeyBSdW5NZW51IH0gZnJvbSAnLi9ydW4nO1xuaW1wb3J0IHsgU2V0dGluZ3NNZW51IH0gZnJvbSAnLi9zZXR0aW5ncyc7XG5pbXBvcnQgeyBUYWJzTWVudSB9IGZyb20gJy4vdGFicyc7XG5pbXBvcnQgeyBWaWV3TWVudSB9IGZyb20gJy4vdmlldyc7XG4vKipcbiAqIFRoZSBtYWluIG1lbnUgY2xhc3MuICBJdCBpcyBpbnRlbmRlZCB0byBiZSB1c2VkIGFzIGEgc2luZ2xldG9uLlxuICovXG5leHBvcnQgY2xhc3MgTWFpbk1lbnUgZXh0ZW5kcyBNZW51QmFyIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgdGhlIG1haW4gbWVudSBiYXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29tbWFuZHMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5faXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5fY29tbWFuZHMgPSBjb21tYW5kcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGFwcGxpY2F0aW9uIFwiRWRpdFwiIG1lbnUuXG4gICAgICovXG4gICAgZ2V0IGVkaXRNZW51KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2VkaXRNZW51KSB7XG4gICAgICAgICAgICB0aGlzLl9lZGl0TWVudSA9IG5ldyBFZGl0TWVudSh7XG4gICAgICAgICAgICAgICAgY29tbWFuZHM6IHRoaXMuX2NvbW1hbmRzLFxuICAgICAgICAgICAgICAgIHJhbms6IDIsXG4gICAgICAgICAgICAgICAgcmVuZGVyZXI6IE1lbnVTdmcuZGVmYXVsdFJlbmRlcmVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdE1lbnU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBhcHBsaWNhdGlvbiBcIkZpbGVcIiBtZW51LlxuICAgICAqL1xuICAgIGdldCBmaWxlTWVudSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9maWxlTWVudSkge1xuICAgICAgICAgICAgdGhpcy5fZmlsZU1lbnUgPSBuZXcgRmlsZU1lbnUoe1xuICAgICAgICAgICAgICAgIGNvbW1hbmRzOiB0aGlzLl9jb21tYW5kcyxcbiAgICAgICAgICAgICAgICByYW5rOiAxLFxuICAgICAgICAgICAgICAgIHJlbmRlcmVyOiBNZW51U3ZnLmRlZmF1bHRSZW5kZXJlclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbGVNZW51O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgYXBwbGljYXRpb24gXCJIZWxwXCIgbWVudS5cbiAgICAgKi9cbiAgICBnZXQgaGVscE1lbnUoKSB7XG4gICAgICAgIGlmICghdGhpcy5faGVscE1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMuX2hlbHBNZW51ID0gbmV3IEhlbHBNZW51KHtcbiAgICAgICAgICAgICAgICBjb21tYW5kczogdGhpcy5fY29tbWFuZHMsXG4gICAgICAgICAgICAgICAgcmFuazogMTAwMCxcbiAgICAgICAgICAgICAgICByZW5kZXJlcjogTWVudVN2Zy5kZWZhdWx0UmVuZGVyZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWxwTWVudTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGFwcGxpY2F0aW9uIFwiS2VybmVsXCIgbWVudS5cbiAgICAgKi9cbiAgICBnZXQga2VybmVsTWVudSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9rZXJuZWxNZW51KSB7XG4gICAgICAgICAgICB0aGlzLl9rZXJuZWxNZW51ID0gbmV3IEtlcm5lbE1lbnUoe1xuICAgICAgICAgICAgICAgIGNvbW1hbmRzOiB0aGlzLl9jb21tYW5kcyxcbiAgICAgICAgICAgICAgICByYW5rOiA1LFxuICAgICAgICAgICAgICAgIHJlbmRlcmVyOiBNZW51U3ZnLmRlZmF1bHRSZW5kZXJlclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2tlcm5lbE1lbnU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBhcHBsaWNhdGlvbiBcIlJ1blwiIG1lbnUuXG4gICAgICovXG4gICAgZ2V0IHJ1bk1lbnUoKSB7XG4gICAgICAgIGlmICghdGhpcy5fcnVuTWVudSkge1xuICAgICAgICAgICAgdGhpcy5fcnVuTWVudSA9IG5ldyBSdW5NZW51KHtcbiAgICAgICAgICAgICAgICBjb21tYW5kczogdGhpcy5fY29tbWFuZHMsXG4gICAgICAgICAgICAgICAgcmFuazogNCxcbiAgICAgICAgICAgICAgICByZW5kZXJlcjogTWVudVN2Zy5kZWZhdWx0UmVuZGVyZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9ydW5NZW51O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgYXBwbGljYXRpb24gXCJTZXR0aW5nc1wiIG1lbnUuXG4gICAgICovXG4gICAgZ2V0IHNldHRpbmdzTWVudSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZXR0aW5nc01lbnUpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzTWVudSA9IG5ldyBTZXR0aW5nc01lbnUoe1xuICAgICAgICAgICAgICAgIGNvbW1hbmRzOiB0aGlzLl9jb21tYW5kcyxcbiAgICAgICAgICAgICAgICByYW5rOiA5OTksXG4gICAgICAgICAgICAgICAgcmVuZGVyZXI6IE1lbnVTdmcuZGVmYXVsdFJlbmRlcmVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3NNZW51O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgYXBwbGljYXRpb24gXCJWaWV3XCIgbWVudS5cbiAgICAgKi9cbiAgICBnZXQgdmlld01lbnUoKSB7XG4gICAgICAgIGlmICghdGhpcy5fdmlld01lbnUpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdNZW51ID0gbmV3IFZpZXdNZW51KHtcbiAgICAgICAgICAgICAgICBjb21tYW5kczogdGhpcy5fY29tbWFuZHMsXG4gICAgICAgICAgICAgICAgcmFuazogMyxcbiAgICAgICAgICAgICAgICByZW5kZXJlcjogTWVudVN2Zy5kZWZhdWx0UmVuZGVyZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl92aWV3TWVudTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGFwcGxpY2F0aW9uIFwiVGFic1wiIG1lbnUuXG4gICAgICovXG4gICAgZ2V0IHRhYnNNZW51KCkge1xuICAgICAgICBpZiAoIXRoaXMuX3RhYnNNZW51KSB7XG4gICAgICAgICAgICB0aGlzLl90YWJzTWVudSA9IG5ldyBUYWJzTWVudSh7XG4gICAgICAgICAgICAgICAgY29tbWFuZHM6IHRoaXMuX2NvbW1hbmRzLFxuICAgICAgICAgICAgICAgIHJhbms6IDUwMCxcbiAgICAgICAgICAgICAgICByZW5kZXJlcjogTWVudVN2Zy5kZWZhdWx0UmVuZGVyZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl90YWJzTWVudTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgbmV3IG1lbnUgdG8gdGhlIG1haW4gbWVudSBiYXIuXG4gICAgICovXG4gICAgYWRkTWVudShtZW51LCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgaWYgKEFycmF5RXh0LmZpcnN0SW5kZXhPZih0aGlzLm1lbnVzLCBtZW51KSA+IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gb3ZlcnJpZGUgZGVmYXVsdCByZW5kZXJlciB3aXRoIHN2Zy1zdXBwb3J0aW5nIHJlbmRlcmVyXG4gICAgICAgIE1lbnVTdmcub3ZlcnJpZGVEZWZhdWx0UmVuZGVyZXIobWVudSk7XG4gICAgICAgIGNvbnN0IHJhbmsgPSAncmFuaycgaW4gb3B0aW9uc1xuICAgICAgICAgICAgPyBvcHRpb25zLnJhbmtcbiAgICAgICAgICAgIDogJ3JhbmsnIGluIG1lbnVcbiAgICAgICAgICAgICAgICA/IG1lbnUucmFua1xuICAgICAgICAgICAgICAgIDogSVJhbmtlZE1lbnUuREVGQVVMVF9SQU5LO1xuICAgICAgICBjb25zdCByYW5rSXRlbSA9IHsgbWVudSwgcmFuayB9O1xuICAgICAgICBjb25zdCBpbmRleCA9IEFycmF5RXh0LnVwcGVyQm91bmQodGhpcy5faXRlbXMsIHJhbmtJdGVtLCBQcml2YXRlLml0ZW1DbXApO1xuICAgICAgICAvLyBVcG9uIGRpc3Bvc2FsLCByZW1vdmUgdGhlIG1lbnUgYW5kIGl0cyByYW5rIHJlZmVyZW5jZS5cbiAgICAgICAgbWVudS5kaXNwb3NlZC5jb25uZWN0KHRoaXMuX29uTWVudURpc3Bvc2VkLCB0aGlzKTtcbiAgICAgICAgQXJyYXlFeHQuaW5zZXJ0KHRoaXMuX2l0ZW1zLCBpbmRleCwgcmFua0l0ZW0pO1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgbmV3IG1lbnUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmluc2VydE1lbnUoaW5kZXgsIG1lbnUpO1xuICAgICAgICAvLyBMaW5rIHRoZSBtZW51IHRvIHRoZSBBUEkgLSBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IHdoZW4gc3dpdGNoaW5nIHRvIG1lbnUgZGVzY3JpcHRpb24gaW4gc2V0dGluZ3NcbiAgICAgICAgc3dpdGNoIChtZW51LmlkKSB7XG4gICAgICAgICAgICBjYXNlICdqcC1tYWlubWVudS1maWxlJzpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2ZpbGVNZW51ICYmIG1lbnUgaW5zdGFuY2VvZiBGaWxlTWVudSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maWxlTWVudSA9IG1lbnU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnanAtbWFpbm1lbnUtZWRpdCc6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9lZGl0TWVudSAmJiBtZW51IGluc3RhbmNlb2YgRWRpdE1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdE1lbnUgPSBtZW51O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2pwLW1haW5tZW51LXZpZXcnOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fdmlld01lbnUgJiYgbWVudSBpbnN0YW5jZW9mIFZpZXdNZW51KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdNZW51ID0gbWVudTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdqcC1tYWlubWVudS1ydW4nOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fcnVuTWVudSAmJiBtZW51IGluc3RhbmNlb2YgUnVuTWVudSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ydW5NZW51ID0gbWVudTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdqcC1tYWlubWVudS1rZXJuZWwnOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fa2VybmVsTWVudSAmJiBtZW51IGluc3RhbmNlb2YgS2VybmVsTWVudSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXJuZWxNZW51ID0gbWVudTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdqcC1tYWlubWVudS10YWJzJzpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3RhYnNNZW51ICYmIG1lbnUgaW5zdGFuY2VvZiBUYWJzTWVudSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90YWJzTWVudSA9IG1lbnU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnanAtbWFpbm1lbnUtc2V0dGluZ3MnOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3NNZW51ICYmIG1lbnUgaW5zdGFuY2VvZiBTZXR0aW5nc01lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NNZW51ID0gbWVudTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdqcC1tYWlubWVudS1oZWxwJzpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2hlbHBNZW51ICYmIG1lbnUgaW5zdGFuY2VvZiBIZWxwTWVudSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oZWxwTWVudSA9IG1lbnU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSBtZW51IGJhci5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oO1xuICAgICAgICAoX2EgPSB0aGlzLl9lZGl0TWVudSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRpc3Bvc2UoKTtcbiAgICAgICAgKF9iID0gdGhpcy5fZmlsZU1lbnUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5kaXNwb3NlKCk7XG4gICAgICAgIChfYyA9IHRoaXMuX2hlbHBNZW51KSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZGlzcG9zZSgpO1xuICAgICAgICAoX2QgPSB0aGlzLl9rZXJuZWxNZW51KSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuZGlzcG9zZSgpO1xuICAgICAgICAoX2UgPSB0aGlzLl9ydW5NZW51KSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuZGlzcG9zZSgpO1xuICAgICAgICAoX2YgPSB0aGlzLl9zZXR0aW5nc01lbnUpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5kaXNwb3NlKCk7XG4gICAgICAgIChfZyA9IHRoaXMuX3ZpZXdNZW51KSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cuZGlzcG9zZSgpO1xuICAgICAgICAoX2ggPSB0aGlzLl90YWJzTWVudSkgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oLmRpc3Bvc2UoKTtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSB0aGUgbWVudS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb21tYW5kcyBUaGUgY29tbWFuZCByZWdpc3RyeVxuICAgICAqIEBwYXJhbSBvcHRpb25zIFRoZSBtYWluIG1lbnUgb3B0aW9ucy5cbiAgICAgKiBAcGFyYW0gdHJhbnMgLSBUaGUgYXBwbGljYXRpb24gbGFuZ3VhZ2UgdHJhbnNsYXRvci5cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2VuZXJhdGVNZW51KGNvbW1hbmRzLCBvcHRpb25zLCB0cmFucykge1xuICAgICAgICBsZXQgbWVudTtcbiAgICAgICAgY29uc3QgeyBpZCwgbGFiZWwsIHJhbmsgfSA9IG9wdGlvbnM7XG4gICAgICAgIHN3aXRjaCAoaWQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2pwLW1haW5tZW51LWZpbGUnOlxuICAgICAgICAgICAgICAgIG1lbnUgPSBuZXcgRmlsZU1lbnUoe1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kcyxcbiAgICAgICAgICAgICAgICAgICAgcmFuayxcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXI6IE1lbnVTdmcuZGVmYXVsdFJlbmRlcmVyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdqcC1tYWlubWVudS1lZGl0JzpcbiAgICAgICAgICAgICAgICBtZW51ID0gbmV3IEVkaXRNZW51KHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZHMsXG4gICAgICAgICAgICAgICAgICAgIHJhbmssXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyOiBNZW51U3ZnLmRlZmF1bHRSZW5kZXJlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnanAtbWFpbm1lbnUtdmlldyc6XG4gICAgICAgICAgICAgICAgbWVudSA9IG5ldyBWaWV3TWVudSh7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzLFxuICAgICAgICAgICAgICAgICAgICByYW5rLFxuICAgICAgICAgICAgICAgICAgICByZW5kZXJlcjogTWVudVN2Zy5kZWZhdWx0UmVuZGVyZXJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2pwLW1haW5tZW51LXJ1bic6XG4gICAgICAgICAgICAgICAgbWVudSA9IG5ldyBSdW5NZW51KHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZHMsXG4gICAgICAgICAgICAgICAgICAgIHJhbmssXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyOiBNZW51U3ZnLmRlZmF1bHRSZW5kZXJlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnanAtbWFpbm1lbnUta2VybmVsJzpcbiAgICAgICAgICAgICAgICBtZW51ID0gbmV3IEtlcm5lbE1lbnUoe1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kcyxcbiAgICAgICAgICAgICAgICAgICAgcmFuayxcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXI6IE1lbnVTdmcuZGVmYXVsdFJlbmRlcmVyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdqcC1tYWlubWVudS10YWJzJzpcbiAgICAgICAgICAgICAgICBtZW51ID0gbmV3IFRhYnNNZW51KHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZHMsXG4gICAgICAgICAgICAgICAgICAgIHJhbmssXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyOiBNZW51U3ZnLmRlZmF1bHRSZW5kZXJlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnanAtbWFpbm1lbnUtc2V0dGluZ3MnOlxuICAgICAgICAgICAgICAgIG1lbnUgPSBuZXcgU2V0dGluZ3NNZW51KHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZHMsXG4gICAgICAgICAgICAgICAgICAgIHJhbmssXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyOiBNZW51U3ZnLmRlZmF1bHRSZW5kZXJlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnanAtbWFpbm1lbnUtaGVscCc6XG4gICAgICAgICAgICAgICAgbWVudSA9IG5ldyBIZWxwTWVudSh7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzLFxuICAgICAgICAgICAgICAgICAgICByYW5rLFxuICAgICAgICAgICAgICAgICAgICByZW5kZXJlcjogTWVudVN2Zy5kZWZhdWx0UmVuZGVyZXJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgbWVudSA9IG5ldyBSYW5rZWRNZW51KHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZHMsXG4gICAgICAgICAgICAgICAgICAgIHJhbmssXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyOiBNZW51U3ZnLmRlZmF1bHRSZW5kZXJlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgbWVudS50aXRsZS5sYWJlbCA9IHRyYW5zLl9wKCdtZW51JywgbGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZW51O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGRpc3Bvc2FsIG9mIGEgbWVudS5cbiAgICAgKi9cbiAgICBfb25NZW51RGlzcG9zZWQobWVudSkge1xuICAgICAgICB0aGlzLnJlbW92ZU1lbnUobWVudSk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gQXJyYXlFeHQuZmluZEZpcnN0SW5kZXgodGhpcy5faXRlbXMsIGl0ZW0gPT4gaXRlbS5tZW51ID09PSBtZW51KTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgQXJyYXlFeHQucmVtb3ZlQXQodGhpcy5faXRlbXMsIGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIHByaXZhdGUgZGF0YS5cbiAqL1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICAvKipcbiAgICAgKiBBIGNvbXBhcmF0b3IgZnVuY3Rpb24gZm9yIG1lbnUgcmFuayBpdGVtcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpdGVtQ21wKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgICAgcmV0dXJuIGZpcnN0LnJhbmsgLSBzZWNvbmQucmFuaztcbiAgICB9XG4gICAgUHJpdmF0ZS5pdGVtQ21wID0gaXRlbUNtcDtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbm1lbnUuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgUmFua2VkTWVudSB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuLyoqXG4gKiBBbiBleHRlbnNpYmxlIFJ1biBtZW51IGZvciB0aGUgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBSdW5NZW51IGV4dGVuZHMgUmFua2VkTWVudSB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IHRoZSBydW4gbWVudS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNvZGVSdW5uZXJzID0gbmV3IFNldCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUgcnVuIG1lbnUuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5jb2RlUnVubmVycy5jbGVhcigpO1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cnVuLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFJhbmtlZE1lbnUgfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbi8qKlxuICogQW4gZXh0ZW5zaWJsZSBTZXR0aW5ncyBtZW51IGZvciB0aGUgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXR0aW5nc01lbnUgZXh0ZW5kcyBSYW5rZWRNZW51IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgdGhlIHNldHRpbmdzIG1lbnUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXR0aW5ncy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBSYW5rZWRNZW51IH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG4vKipcbiAqIEFuIGV4dGVuc2libGUgVGFicyBtZW51IGZvciB0aGUgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBUYWJzTWVudSBleHRlbmRzIFJhbmtlZE1lbnUge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCB0aGUgdGFicyBtZW51LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFicy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbi8qIHRzbGludDpkaXNhYmxlICovXG4vKipcbiAqIFRoZSBtYWluIG1lbnUgdG9rZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBJTWFpbk1lbnUgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL21haW5tZW51OklNYWluTWVudScpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9rZW5zLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFJhbmtlZE1lbnUgfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbi8qKlxuICogQW4gZXh0ZW5zaWJsZSBWaWV3IG1lbnUgZm9yIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZpZXdNZW51IGV4dGVuZHMgUmFua2VkTWVudSB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IHRoZSB2aWV3IG1lbnUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5lZGl0b3JWaWV3ZXJzID0gbmV3IFNldCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUgdmlldyBtZW51LlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yVmlld2Vycy5jbGVhcigpO1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmlldy5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9