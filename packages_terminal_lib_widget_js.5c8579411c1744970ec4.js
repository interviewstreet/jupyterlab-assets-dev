(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_terminal_lib_widget_js"],{

/***/ "../../packages/terminal/lib/tokens.js":
/*!*********************************************!*\
  !*** ../../packages/terminal/lib/tokens.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ITerminalTracker": () => (/* binding */ ITerminalTracker),
/* harmony export */   "ITerminal": () => (/* binding */ ITerminal)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The editor tracker token.
 */
const ITerminalTracker = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/terminal:ITerminalTracker');
/* tslint:enable */
/**
 * The namespace for terminals. Separated from the widget so it can be lazy
 * loaded.
 */
var ITerminal;
(function (ITerminal) {
    /**
     * The default options used for creating terminals.
     */
    ITerminal.defaultOptions = {
        theme: 'inherit',
        fontFamily: 'Menlo, Consolas, "DejaVu Sans Mono", monospace',
        fontSize: 13,
        lineHeight: 1.0,
        scrollback: 1000,
        shutdownOnClose: false,
        closeOnExit: true,
        cursorBlink: true,
        initialCommand: '',
        screenReaderMode: false,
        pasteWithCtrlV: true,
        autoFit: true,
        macOptionIsMeta: false
    };
})(ITerminal || (ITerminal = {}));
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/terminal/lib/widget.js":
/*!*********************************************!*\
  !*** ../../packages/terminal/lib/widget.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Terminal": () => (/* binding */ Terminal)
/* harmony export */ });
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/domutils */ "webpack/sharing/consume/default/@lumino/domutils/@lumino/domutils");
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_domutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/messaging */ "webpack/sharing/consume/default/@lumino/messaging/@lumino/messaging");
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_messaging__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var xterm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! xterm */ "../../node_modules/xterm/lib/xterm.js");
/* harmony import */ var xterm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(xterm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var xterm_addon_fit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! xterm-addon-fit */ "../../node_modules/xterm-addon-fit/lib/xterm-addon-fit.js");
/* harmony import */ var xterm_addon_fit__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(xterm_addon_fit__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! . */ "../../packages/terminal/lib/tokens.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};







/**
 * The class name added to a terminal widget.
 */
const TERMINAL_CLASS = 'jp-Terminal';
/**
 * The class name added to a terminal body.
 */
const TERMINAL_BODY_CLASS = 'jp-Terminal-body';
/**
 * A widget which manages a terminal session.
 */
class Terminal extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.Widget {
    /**
     * Construct a new terminal widget.
     *
     * @param session - The terminal session object.
     *
     * @param options - The terminal configuration options.
     *
     * @param translator - The language translator.
     */
    constructor(session, options = {}, translator) {
        super();
        this._needsResize = true;
        this._termOpened = false;
        this._offsetWidth = -1;
        this._offsetHeight = -1;
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator;
        this._trans = translator.load('jupyterlab');
        this.session = session;
        // Initialize settings.
        this._options = Object.assign(Object.assign({}, ___WEBPACK_IMPORTED_MODULE_6__.ITerminal.defaultOptions), options);
        const _a = this._options, { theme } = _a, other = __rest(_a, ["theme"]);
        const xtermOptions = Object.assign({ theme: Private.getXTermTheme(theme) }, other);
        this.addClass(TERMINAL_CLASS);
        this._setThemeAttribute(theme);
        // Create the xterm.
        this._term = new xterm__WEBPACK_IMPORTED_MODULE_4__.Terminal(xtermOptions);
        this._fitAddon = new xterm_addon_fit__WEBPACK_IMPORTED_MODULE_5__.FitAddon();
        this._term.loadAddon(this._fitAddon);
        this._initializeTerm();
        this.id = `jp-Terminal-${Private.id++}`;
        this.title.label = this._trans.__('Terminal');
        session.messageReceived.connect(this._onMessage, this);
        session.disposed.connect(() => {
            if (this.getOption('closeOnExit')) {
                this.dispose();
            }
        }, this);
        if (session.connectionStatus === 'connected') {
            this._initialConnection();
        }
        else {
            session.connectionStatusChanged.connect(this._initialConnection, this);
        }
    }
    _setThemeAttribute(theme) {
        if (this.isDisposed) {
            return;
        }
        this.node.setAttribute('data-term-theme', theme ? theme.toLowerCase() : 'inherit');
    }
    _initialConnection() {
        if (this.isDisposed) {
            return;
        }
        if (this.session.connectionStatus !== 'connected') {
            return;
        }
        this.title.label = this._trans.__('Terminal %1', this.session.name);
        this._setSessionSize();
        if (this._options.initialCommand) {
            this.session.send({
                type: 'stdin',
                content: [this._options.initialCommand + '\r']
            });
        }
        // Only run this initial connection logic once.
        this.session.connectionStatusChanged.disconnect(this._initialConnection, this);
    }
    /**
     * Get a config option for the terminal.
     */
    getOption(option) {
        return this._options[option];
    }
    /**
     * Set a config option for the terminal.
     */
    setOption(option, value) {
        if (option !== 'theme' &&
            (this._options[option] === value || option === 'initialCommand')) {
            return;
        }
        this._options[option] = value;
        switch (option) {
            case 'shutdownOnClose': // Do not transmit to XTerm
            case 'closeOnExit': // Do not transmit to XTerm
                break;
            case 'theme':
                this._term.setOption('theme', Private.getXTermTheme(value));
                this._setThemeAttribute(value);
                break;
            default:
                this._term.setOption(option, value);
                break;
        }
        this._needsResize = true;
        this.update();
    }
    /**
     * Dispose of the resources held by the terminal widget.
     */
    dispose() {
        if (!this.session.isDisposed) {
            if (this.getOption('shutdownOnClose')) {
                this.session.shutdown().catch(reason => {
                    console.error(`Terminal not shut down: ${reason}`);
                });
            }
        }
        this._term.dispose();
        super.dispose();
    }
    /**
     * Refresh the terminal session.
     *
     * #### Notes
     * Failure to reconnect to the session should be caught appropriately
     */
    async refresh() {
        if (!this.isDisposed) {
            await this.session.reconnect();
            this._term.clear();
        }
    }
    /**
     * Process a message sent to the widget.
     *
     * @param msg - The message sent to the widget.
     *
     * #### Notes
     * Subclasses may reimplement this method as needed.
     */
    processMessage(msg) {
        super.processMessage(msg);
        switch (msg.type) {
            case 'fit-request':
                this.onFitRequest(msg);
                break;
            default:
                break;
        }
    }
    /**
     * Set the size of the terminal when attached if dirty.
     */
    onAfterAttach(msg) {
        this.update();
    }
    /**
     * Set the size of the terminal when shown if dirty.
     */
    onAfterShow(msg) {
        this.update();
    }
    /**
     * On resize, use the computed row and column sizes to resize the terminal.
     */
    onResize(msg) {
        this._offsetWidth = msg.width;
        this._offsetHeight = msg.height;
        this._needsResize = true;
        this.update();
    }
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    onUpdateRequest(msg) {
        var _a;
        if (!this.isVisible || !this.isAttached) {
            return;
        }
        // Open the terminal if necessary.
        if (!this._termOpened) {
            this._term.open(this.node);
            (_a = this._term.element) === null || _a === void 0 ? void 0 : _a.classList.add(TERMINAL_BODY_CLASS);
            this._termOpened = true;
        }
        if (this._needsResize) {
            this._resizeTerminal();
        }
    }
    /**
     * A message handler invoked on an `'fit-request'` message.
     */
    onFitRequest(msg) {
        const resize = _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.Widget.ResizeMessage.UnknownSize;
        _lumino_messaging__WEBPACK_IMPORTED_MODULE_2__.MessageLoop.sendMessage(this, resize);
    }
    /**
     * Handle `'activate-request'` messages.
     */
    onActivateRequest(msg) {
        this._term.focus();
    }
    /**
     * Initialize the terminal object.
     */
    _initializeTerm() {
        const term = this._term;
        term.onData((data) => {
            if (this.isDisposed) {
                return;
            }
            this.session.send({
                type: 'stdin',
                content: [data]
            });
        });
        term.onTitleChange((title) => {
            this.title.label = title;
        });
        // Do not add any Ctrl+C/Ctrl+V handling on macOS,
        // where Cmd+C/Cmd+V works as intended.
        if (_lumino_domutils__WEBPACK_IMPORTED_MODULE_1__.Platform.IS_MAC) {
            return;
        }
        term.attachCustomKeyEventHandler(event => {
            if (event.ctrlKey && event.key === 'c' && term.hasSelection()) {
                // Return so that the usual OS copy happens
                // instead of interrupt signal.
                return false;
            }
            if (event.ctrlKey && event.key === 'v' && this._options.pasteWithCtrlV) {
                // Return so that the usual paste happens.
                return false;
            }
            return true;
        });
    }
    /**
     * Handle a message from the terminal session.
     */
    _onMessage(sender, msg) {
        switch (msg.type) {
            case 'stdout':
                if (msg.content) {
                    this._term.write(msg.content[0]);
                }
                break;
            case 'disconnect':
                this._term.write('\r\n\r\n[Finished… Term Session]\r\n');
                break;
            default:
                break;
        }
    }
    /**
     * Resize the terminal based on computed geometry.
     */
    _resizeTerminal() {
        if (this._options.autoFit) {
            this._fitAddon.fit();
        }
        if (this._offsetWidth === -1) {
            this._offsetWidth = this.node.offsetWidth;
        }
        if (this._offsetHeight === -1) {
            this._offsetHeight = this.node.offsetHeight;
        }
        this._setSessionSize();
        this._needsResize = false;
    }
    /**
     * Set the size of the terminal in the session.
     */
    _setSessionSize() {
        const content = [
            this._term.rows,
            this._term.cols,
            this._offsetHeight,
            this._offsetWidth
        ];
        if (!this.isDisposed) {
            this.session.send({ type: 'set_size', content });
        }
    }
}
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * An incrementing counter for ids.
     */
    Private.id = 0;
    /**
     * The light terminal theme.
     */
    Private.lightTheme = {
        foreground: '#000',
        background: '#fff',
        cursor: '#616161',
        cursorAccent: '#F5F5F5',
        selection: 'rgba(97, 97, 97, 0.3)' // md-grey-700
    };
    /**
     * The dark terminal theme.
     */
    Private.darkTheme = {
        foreground: '#fff',
        background: '#000',
        cursor: '#fff',
        cursorAccent: '#000',
        selection: 'rgba(255, 255, 255, 0.3)'
    };
    /**
     * The current theme.
     */
    Private.inheritTheme = () => ({
        foreground: getComputedStyle(document.body)
            .getPropertyValue('--jp-ui-font-color0')
            .trim(),
        background: getComputedStyle(document.body)
            .getPropertyValue('--jp-layout-color0')
            .trim(),
        cursor: getComputedStyle(document.body)
            .getPropertyValue('--jp-ui-font-color1')
            .trim(),
        cursorAccent: getComputedStyle(document.body)
            .getPropertyValue('--jp-ui-inverse-font-color0')
            .trim(),
        selection: getComputedStyle(document.body)
            .getPropertyValue('--jp-ui-font-color3')
            .trim()
    });
    function getXTermTheme(theme) {
        switch (theme) {
            case 'light':
                return Private.lightTheme;
            case 'dark':
                return Private.darkTheme;
            case 'inherit':
            default:
                return Private.inheritTheme();
        }
    }
    Private.getXTermTheme = getXTermTheme;
})(Private || (Private = {}));
//# sourceMappingURL=widget.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdGVybWluYWwvbGliL3Rva2Vucy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdGVybWluYWwvbGliL3dpZGdldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUMwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNPLDZCQUE2QixvREFBSztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsOEJBQThCO0FBQy9CLGtDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbENBO0FBQ0E7QUFDQSxjQUFjLFNBQUksSUFBSSxTQUFJO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELGNBQWM7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN5RDtBQUNiO0FBQ0k7QUFDUDtBQUNDO0FBQ0M7QUFDYjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sdUJBQXVCLG1EQUFNO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLG1FQUFjO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxFQUFFLHVEQUF3QjtBQUNoRixtQ0FBbUMsUUFBUTtBQUMzQyw0Q0FBNEMsc0NBQXNDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QiwyQ0FBSztBQUM5Qiw2QkFBNkIscURBQVE7QUFDckM7QUFDQTtBQUNBLGlDQUFpQyxhQUFhO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsT0FBTztBQUNwRSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDZFQUFnQztBQUN2RCxRQUFRLHNFQUF1QjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsWUFBWSw2REFBZTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsNEJBQTRCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQixrQyIsImZpbGUiOiJwYWNrYWdlc190ZXJtaW5hbF9saWJfd2lkZ2V0X2pzLjVjODU3OTQxMWMxNzQ0OTcwZWM0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG4vKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLyoqXG4gKiBUaGUgZWRpdG9yIHRyYWNrZXIgdG9rZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBJVGVybWluYWxUcmFja2VyID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi90ZXJtaW5hbDpJVGVybWluYWxUcmFja2VyJyk7XG4vKiB0c2xpbnQ6ZW5hYmxlICovXG4vKipcbiAqIFRoZSBuYW1lc3BhY2UgZm9yIHRlcm1pbmFscy4gU2VwYXJhdGVkIGZyb20gdGhlIHdpZGdldCBzbyBpdCBjYW4gYmUgbGF6eVxuICogbG9hZGVkLlxuICovXG5leHBvcnQgdmFyIElUZXJtaW5hbDtcbihmdW5jdGlvbiAoSVRlcm1pbmFsKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgb3B0aW9ucyB1c2VkIGZvciBjcmVhdGluZyB0ZXJtaW5hbHMuXG4gICAgICovXG4gICAgSVRlcm1pbmFsLmRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgICB0aGVtZTogJ2luaGVyaXQnLFxuICAgICAgICBmb250RmFtaWx5OiAnTWVubG8sIENvbnNvbGFzLCBcIkRlamFWdSBTYW5zIE1vbm9cIiwgbW9ub3NwYWNlJyxcbiAgICAgICAgZm9udFNpemU6IDEzLFxuICAgICAgICBsaW5lSGVpZ2h0OiAxLjAsXG4gICAgICAgIHNjcm9sbGJhY2s6IDEwMDAsXG4gICAgICAgIHNodXRkb3duT25DbG9zZTogZmFsc2UsXG4gICAgICAgIGNsb3NlT25FeGl0OiB0cnVlLFxuICAgICAgICBjdXJzb3JCbGluazogdHJ1ZSxcbiAgICAgICAgaW5pdGlhbENvbW1hbmQ6ICcnLFxuICAgICAgICBzY3JlZW5SZWFkZXJNb2RlOiBmYWxzZSxcbiAgICAgICAgcGFzdGVXaXRoQ3RybFY6IHRydWUsXG4gICAgICAgIGF1dG9GaXQ6IHRydWUsXG4gICAgICAgIG1hY09wdGlvbklzTWV0YTogZmFsc2VcbiAgICB9O1xufSkoSVRlcm1pbmFsIHx8IChJVGVybWluYWwgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9rZW5zLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAbHVtaW5vL2RvbXV0aWxzJztcbmltcG9ydCB7IE1lc3NhZ2VMb29wIH0gZnJvbSAnQGx1bWluby9tZXNzYWdpbmcnO1xuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSAnQGx1bWluby93aWRnZXRzJztcbmltcG9ydCB7IFRlcm1pbmFsIGFzIFh0ZXJtIH0gZnJvbSAneHRlcm0nO1xuaW1wb3J0IHsgRml0QWRkb24gfSBmcm9tICd4dGVybS1hZGRvbi1maXQnO1xuaW1wb3J0IHsgSVRlcm1pbmFsIH0gZnJvbSAnLic7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGEgdGVybWluYWwgd2lkZ2V0LlxuICovXG5jb25zdCBURVJNSU5BTF9DTEFTUyA9ICdqcC1UZXJtaW5hbCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGEgdGVybWluYWwgYm9keS5cbiAqL1xuY29uc3QgVEVSTUlOQUxfQk9EWV9DTEFTUyA9ICdqcC1UZXJtaW5hbC1ib2R5Jztcbi8qKlxuICogQSB3aWRnZXQgd2hpY2ggbWFuYWdlcyBhIHRlcm1pbmFsIHNlc3Npb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBUZXJtaW5hbCBleHRlbmRzIFdpZGdldCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IHRlcm1pbmFsIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzZXNzaW9uIC0gVGhlIHRlcm1pbmFsIHNlc3Npb24gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgdGVybWluYWwgY29uZmlndXJhdGlvbiBvcHRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRyYW5zbGF0b3IgLSBUaGUgbGFuZ3VhZ2UgdHJhbnNsYXRvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzZXNzaW9uLCBvcHRpb25zID0ge30sIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fbmVlZHNSZXNpemUgPSB0cnVlO1xuICAgICAgICB0aGlzLl90ZXJtT3BlbmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX29mZnNldFdpZHRoID0gLTE7XG4gICAgICAgIHRoaXMuX29mZnNldEhlaWdodCA9IC0xO1xuICAgICAgICB0cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgdGhpcy5fdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBzZXR0aW5ncy5cbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgSVRlcm1pbmFsLmRlZmF1bHRPcHRpb25zKSwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IF9hID0gdGhpcy5fb3B0aW9ucywgeyB0aGVtZSB9ID0gX2EsIG90aGVyID0gX19yZXN0KF9hLCBbXCJ0aGVtZVwiXSk7XG4gICAgICAgIGNvbnN0IHh0ZXJtT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oeyB0aGVtZTogUHJpdmF0ZS5nZXRYVGVybVRoZW1lKHRoZW1lKSB9LCBvdGhlcik7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoVEVSTUlOQUxfQ0xBU1MpO1xuICAgICAgICB0aGlzLl9zZXRUaGVtZUF0dHJpYnV0ZSh0aGVtZSk7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgeHRlcm0uXG4gICAgICAgIHRoaXMuX3Rlcm0gPSBuZXcgWHRlcm0oeHRlcm1PcHRpb25zKTtcbiAgICAgICAgdGhpcy5fZml0QWRkb24gPSBuZXcgRml0QWRkb24oKTtcbiAgICAgICAgdGhpcy5fdGVybS5sb2FkQWRkb24odGhpcy5fZml0QWRkb24pO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplVGVybSgpO1xuICAgICAgICB0aGlzLmlkID0gYGpwLVRlcm1pbmFsLSR7UHJpdmF0ZS5pZCsrfWA7XG4gICAgICAgIHRoaXMudGl0bGUubGFiZWwgPSB0aGlzLl90cmFucy5fXygnVGVybWluYWwnKTtcbiAgICAgICAgc2Vzc2lvbi5tZXNzYWdlUmVjZWl2ZWQuY29ubmVjdCh0aGlzLl9vbk1lc3NhZ2UsIHRoaXMpO1xuICAgICAgICBzZXNzaW9uLmRpc3Bvc2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0T3B0aW9uKCdjbG9zZU9uRXhpdCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICBpZiAoc2Vzc2lvbi5jb25uZWN0aW9uU3RhdHVzID09PSAnY29ubmVjdGVkJykge1xuICAgICAgICAgICAgdGhpcy5faW5pdGlhbENvbm5lY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlc3Npb24uY29ubmVjdGlvblN0YXR1c0NoYW5nZWQuY29ubmVjdCh0aGlzLl9pbml0aWFsQ29ubmVjdGlvbiwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3NldFRoZW1lQXR0cmlidXRlKHRoZW1lKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLXRlcm0tdGhlbWUnLCB0aGVtZSA/IHRoZW1lLnRvTG93ZXJDYXNlKCkgOiAnaW5oZXJpdCcpO1xuICAgIH1cbiAgICBfaW5pdGlhbENvbm5lY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZXNzaW9uLmNvbm5lY3Rpb25TdGF0dXMgIT09ICdjb25uZWN0ZWQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aXRsZS5sYWJlbCA9IHRoaXMuX3RyYW5zLl9fKCdUZXJtaW5hbCAlMScsIHRoaXMuc2Vzc2lvbi5uYW1lKTtcbiAgICAgICAgdGhpcy5fc2V0U2Vzc2lvblNpemUoKTtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuaW5pdGlhbENvbW1hbmQpIHtcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5zZW5kKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RkaW4nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFt0aGlzLl9vcHRpb25zLmluaXRpYWxDb21tYW5kICsgJ1xcciddXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPbmx5IHJ1biB0aGlzIGluaXRpYWwgY29ubmVjdGlvbiBsb2dpYyBvbmNlLlxuICAgICAgICB0aGlzLnNlc3Npb24uY29ubmVjdGlvblN0YXR1c0NoYW5nZWQuZGlzY29ubmVjdCh0aGlzLl9pbml0aWFsQ29ubmVjdGlvbiwgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBhIGNvbmZpZyBvcHRpb24gZm9yIHRoZSB0ZXJtaW5hbC5cbiAgICAgKi9cbiAgICBnZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zW29wdGlvbl07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCBhIGNvbmZpZyBvcHRpb24gZm9yIHRoZSB0ZXJtaW5hbC5cbiAgICAgKi9cbiAgICBzZXRPcHRpb24ob3B0aW9uLCB2YWx1ZSkge1xuICAgICAgICBpZiAob3B0aW9uICE9PSAndGhlbWUnICYmXG4gICAgICAgICAgICAodGhpcy5fb3B0aW9uc1tvcHRpb25dID09PSB2YWx1ZSB8fCBvcHRpb24gPT09ICdpbml0aWFsQ29tbWFuZCcpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb3B0aW9uc1tvcHRpb25dID0gdmFsdWU7XG4gICAgICAgIHN3aXRjaCAob3B0aW9uKSB7XG4gICAgICAgICAgICBjYXNlICdzaHV0ZG93bk9uQ2xvc2UnOiAvLyBEbyBub3QgdHJhbnNtaXQgdG8gWFRlcm1cbiAgICAgICAgICAgIGNhc2UgJ2Nsb3NlT25FeGl0JzogLy8gRG8gbm90IHRyYW5zbWl0IHRvIFhUZXJtXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0aGVtZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5fdGVybS5zZXRPcHRpb24oJ3RoZW1lJywgUHJpdmF0ZS5nZXRYVGVybVRoZW1lKHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0VGhlbWVBdHRyaWJ1dGUodmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXJtLnNldE9wdGlvbihvcHRpb24sIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9uZWVkc1Jlc2l6ZSA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSB0ZXJtaW5hbCB3aWRnZXQuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlc3Npb24uaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0T3B0aW9uKCdzaHV0ZG93bk9uQ2xvc2UnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5zaHV0ZG93bigpLmNhdGNoKHJlYXNvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFRlcm1pbmFsIG5vdCBzaHV0IGRvd246ICR7cmVhc29ufWApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Rlcm0uZGlzcG9zZSgpO1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZnJlc2ggdGhlIHRlcm1pbmFsIHNlc3Npb24uXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogRmFpbHVyZSB0byByZWNvbm5lY3QgdG8gdGhlIHNlc3Npb24gc2hvdWxkIGJlIGNhdWdodCBhcHByb3ByaWF0ZWx5XG4gICAgICovXG4gICAgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2Vzc2lvbi5yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgIHRoaXMuX3Rlcm0uY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzIGEgbWVzc2FnZSBzZW50IHRvIHRoZSB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbXNnIC0gVGhlIG1lc3NhZ2Ugc2VudCB0byB0aGUgd2lkZ2V0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFN1YmNsYXNzZXMgbWF5IHJlaW1wbGVtZW50IHRoaXMgbWV0aG9kIGFzIG5lZWRlZC5cbiAgICAgKi9cbiAgICBwcm9jZXNzTWVzc2FnZShtc2cpIHtcbiAgICAgICAgc3VwZXIucHJvY2Vzc01lc3NhZ2UobXNnKTtcbiAgICAgICAgc3dpdGNoIChtc2cudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnZml0LXJlcXVlc3QnOlxuICAgICAgICAgICAgICAgIHRoaXMub25GaXRSZXF1ZXN0KG1zZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgc2l6ZSBvZiB0aGUgdGVybWluYWwgd2hlbiBhdHRhY2hlZCBpZiBkaXJ0eS5cbiAgICAgKi9cbiAgICBvbkFmdGVyQXR0YWNoKG1zZykge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHNpemUgb2YgdGhlIHRlcm1pbmFsIHdoZW4gc2hvd24gaWYgZGlydHkuXG4gICAgICovXG4gICAgb25BZnRlclNob3cobXNnKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9uIHJlc2l6ZSwgdXNlIHRoZSBjb21wdXRlZCByb3cgYW5kIGNvbHVtbiBzaXplcyB0byByZXNpemUgdGhlIHRlcm1pbmFsLlxuICAgICAqL1xuICAgIG9uUmVzaXplKG1zZykge1xuICAgICAgICB0aGlzLl9vZmZzZXRXaWR0aCA9IG1zZy53aWR0aDtcbiAgICAgICAgdGhpcy5fb2Zmc2V0SGVpZ2h0ID0gbXNnLmhlaWdodDtcbiAgICAgICAgdGhpcy5fbmVlZHNSZXNpemUgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIG1lc3NhZ2UgaGFuZGxlciBpbnZva2VkIG9uIGFuIGAndXBkYXRlLXJlcXVlc3QnYCBtZXNzYWdlLlxuICAgICAqL1xuICAgIG9uVXBkYXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlIHx8ICF0aGlzLmlzQXR0YWNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBPcGVuIHRoZSB0ZXJtaW5hbCBpZiBuZWNlc3NhcnkuXG4gICAgICAgIGlmICghdGhpcy5fdGVybU9wZW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fdGVybS5vcGVuKHRoaXMubm9kZSk7XG4gICAgICAgICAgICAoX2EgPSB0aGlzLl90ZXJtLmVsZW1lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jbGFzc0xpc3QuYWRkKFRFUk1JTkFMX0JPRFlfQ0xBU1MpO1xuICAgICAgICAgICAgdGhpcy5fdGVybU9wZW5lZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX25lZWRzUmVzaXplKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemVUZXJtaW5hbCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgbWVzc2FnZSBoYW5kbGVyIGludm9rZWQgb24gYW4gYCdmaXQtcmVxdWVzdCdgIG1lc3NhZ2UuXG4gICAgICovXG4gICAgb25GaXRSZXF1ZXN0KG1zZykge1xuICAgICAgICBjb25zdCByZXNpemUgPSBXaWRnZXQuUmVzaXplTWVzc2FnZS5Vbmtub3duU2l6ZTtcbiAgICAgICAgTWVzc2FnZUxvb3Auc2VuZE1lc3NhZ2UodGhpcywgcmVzaXplKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGAnYWN0aXZhdGUtcmVxdWVzdCdgIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIG9uQWN0aXZhdGVSZXF1ZXN0KG1zZykge1xuICAgICAgICB0aGlzLl90ZXJtLmZvY3VzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIHRlcm1pbmFsIG9iamVjdC5cbiAgICAgKi9cbiAgICBfaW5pdGlhbGl6ZVRlcm0oKSB7XG4gICAgICAgIGNvbnN0IHRlcm0gPSB0aGlzLl90ZXJtO1xuICAgICAgICB0ZXJtLm9uRGF0YSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5zZW5kKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RkaW4nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFtkYXRhXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0ZXJtLm9uVGl0bGVDaGFuZ2UoKHRpdGxlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRpdGxlLmxhYmVsID0gdGl0bGU7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBEbyBub3QgYWRkIGFueSBDdHJsK0MvQ3RybCtWIGhhbmRsaW5nIG9uIG1hY09TLFxuICAgICAgICAvLyB3aGVyZSBDbWQrQy9DbWQrViB3b3JrcyBhcyBpbnRlbmRlZC5cbiAgICAgICAgaWYgKFBsYXRmb3JtLklTX01BQykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRlcm0uYXR0YWNoQ3VzdG9tS2V5RXZlbnRIYW5kbGVyKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5jdHJsS2V5ICYmIGV2ZW50LmtleSA9PT0gJ2MnICYmIHRlcm0uaGFzU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gc28gdGhhdCB0aGUgdXN1YWwgT1MgY29weSBoYXBwZW5zXG4gICAgICAgICAgICAgICAgLy8gaW5zdGVhZCBvZiBpbnRlcnJ1cHQgc2lnbmFsLlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChldmVudC5jdHJsS2V5ICYmIGV2ZW50LmtleSA9PT0gJ3YnICYmIHRoaXMuX29wdGlvbnMucGFzdGVXaXRoQ3RybFYpIHtcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gc28gdGhhdCB0aGUgdXN1YWwgcGFzdGUgaGFwcGVucy5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIG1lc3NhZ2UgZnJvbSB0aGUgdGVybWluYWwgc2Vzc2lvbi5cbiAgICAgKi9cbiAgICBfb25NZXNzYWdlKHNlbmRlciwgbXNnKSB7XG4gICAgICAgIHN3aXRjaCAobXNnLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3N0ZG91dCc6XG4gICAgICAgICAgICAgICAgaWYgKG1zZy5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rlcm0ud3JpdGUobXNnLmNvbnRlbnRbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Rpc2Nvbm5lY3QnOlxuICAgICAgICAgICAgICAgIHRoaXMuX3Rlcm0ud3JpdGUoJ1xcclxcblxcclxcbltGaW5pc2hlZOKApiBUZXJtIFNlc3Npb25dXFxyXFxuJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc2l6ZSB0aGUgdGVybWluYWwgYmFzZWQgb24gY29tcHV0ZWQgZ2VvbWV0cnkuXG4gICAgICovXG4gICAgX3Jlc2l6ZVRlcm1pbmFsKCkge1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5hdXRvRml0KSB7XG4gICAgICAgICAgICB0aGlzLl9maXRBZGRvbi5maXQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fb2Zmc2V0V2lkdGggPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXRXaWR0aCA9IHRoaXMubm9kZS5vZmZzZXRXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fb2Zmc2V0SGVpZ2h0ID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0SGVpZ2h0ID0gdGhpcy5ub2RlLm9mZnNldEhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXRTZXNzaW9uU2l6ZSgpO1xuICAgICAgICB0aGlzLl9uZWVkc1Jlc2l6ZSA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHNpemUgb2YgdGhlIHRlcm1pbmFsIGluIHRoZSBzZXNzaW9uLlxuICAgICAqL1xuICAgIF9zZXRTZXNzaW9uU2l6ZSgpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IFtcbiAgICAgICAgICAgIHRoaXMuX3Rlcm0ucm93cyxcbiAgICAgICAgICAgIHRoaXMuX3Rlcm0uY29scyxcbiAgICAgICAgICAgIHRoaXMuX29mZnNldEhlaWdodCxcbiAgICAgICAgICAgIHRoaXMuX29mZnNldFdpZHRoXG4gICAgICAgIF07XG4gICAgICAgIGlmICghdGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICB0aGlzLnNlc3Npb24uc2VuZCh7IHR5cGU6ICdzZXRfc2l6ZScsIGNvbnRlbnQgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogQW4gaW5jcmVtZW50aW5nIGNvdW50ZXIgZm9yIGlkcy5cbiAgICAgKi9cbiAgICBQcml2YXRlLmlkID0gMDtcbiAgICAvKipcbiAgICAgKiBUaGUgbGlnaHQgdGVybWluYWwgdGhlbWUuXG4gICAgICovXG4gICAgUHJpdmF0ZS5saWdodFRoZW1lID0ge1xuICAgICAgICBmb3JlZ3JvdW5kOiAnIzAwMCcsXG4gICAgICAgIGJhY2tncm91bmQ6ICcjZmZmJyxcbiAgICAgICAgY3Vyc29yOiAnIzYxNjE2MScsXG4gICAgICAgIGN1cnNvckFjY2VudDogJyNGNUY1RjUnLFxuICAgICAgICBzZWxlY3Rpb246ICdyZ2JhKDk3LCA5NywgOTcsIDAuMyknIC8vIG1kLWdyZXktNzAwXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgZGFyayB0ZXJtaW5hbCB0aGVtZS5cbiAgICAgKi9cbiAgICBQcml2YXRlLmRhcmtUaGVtZSA9IHtcbiAgICAgICAgZm9yZWdyb3VuZDogJyNmZmYnLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnIzAwMCcsXG4gICAgICAgIGN1cnNvcjogJyNmZmYnLFxuICAgICAgICBjdXJzb3JBY2NlbnQ6ICcjMDAwJyxcbiAgICAgICAgc2VsZWN0aW9uOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpJ1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgdGhlbWUuXG4gICAgICovXG4gICAgUHJpdmF0ZS5pbmhlcml0VGhlbWUgPSAoKSA9PiAoe1xuICAgICAgICBmb3JlZ3JvdW5kOiBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpXG4gICAgICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgnLS1qcC11aS1mb250LWNvbG9yMCcpXG4gICAgICAgICAgICAudHJpbSgpLFxuICAgICAgICBiYWNrZ3JvdW5kOiBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpXG4gICAgICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgnLS1qcC1sYXlvdXQtY29sb3IwJylcbiAgICAgICAgICAgIC50cmltKCksXG4gICAgICAgIGN1cnNvcjogZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVxuICAgICAgICAgICAgLmdldFByb3BlcnR5VmFsdWUoJy0tanAtdWktZm9udC1jb2xvcjEnKVxuICAgICAgICAgICAgLnRyaW0oKSxcbiAgICAgICAgY3Vyc29yQWNjZW50OiBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpXG4gICAgICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgnLS1qcC11aS1pbnZlcnNlLWZvbnQtY29sb3IwJylcbiAgICAgICAgICAgIC50cmltKCksXG4gICAgICAgIHNlbGVjdGlvbjogZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVxuICAgICAgICAgICAgLmdldFByb3BlcnR5VmFsdWUoJy0tanAtdWktZm9udC1jb2xvcjMnKVxuICAgICAgICAgICAgLnRyaW0oKVxuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGdldFhUZXJtVGhlbWUodGhlbWUpIHtcbiAgICAgICAgc3dpdGNoICh0aGVtZSkge1xuICAgICAgICAgICAgY2FzZSAnbGlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBQcml2YXRlLmxpZ2h0VGhlbWU7XG4gICAgICAgICAgICBjYXNlICdkYXJrJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJpdmF0ZS5kYXJrVGhlbWU7XG4gICAgICAgICAgICBjYXNlICdpbmhlcml0JzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByaXZhdGUuaW5oZXJpdFRoZW1lKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUHJpdmF0ZS5nZXRYVGVybVRoZW1lID0gZ2V0WFRlcm1UaGVtZTtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2lkZ2V0LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=