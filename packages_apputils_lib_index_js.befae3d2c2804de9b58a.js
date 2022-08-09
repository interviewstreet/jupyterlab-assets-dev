(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_apputils_lib_index_js"],{

/***/ "../../packages/apputils/lib/clipboard.js":
/*!************************************************!*\
  !*** ../../packages/apputils/lib/clipboard.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Clipboard": () => (/* binding */ Clipboard)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * The clipboard interface.
 */
var Clipboard;
(function (Clipboard) {
    /**
     * Get the application clipboard instance.
     */
    function getInstance() {
        return Private.instance;
    }
    Clipboard.getInstance = getInstance;
    /**
     * Set the application clipboard instance.
     */
    function setInstance(value) {
        Private.instance = value;
    }
    Clipboard.setInstance = setInstance;
    /**
     * Copy text to the system clipboard.
     *
     * #### Notes
     * This can only be called in response to a user input event.
     */
    function copyToSystem(clipboardData) {
        const node = document.body;
        const handler = (event) => {
            const data = event.clipboardData || window.clipboardData;
            if (typeof clipboardData === 'string') {
                data.setData('text', clipboardData);
            }
            else {
                clipboardData.types().map((mimeType) => {
                    data.setData(mimeType, clipboardData.getData(mimeType));
                });
            }
            event.preventDefault();
            node.removeEventListener('copy', handler);
        };
        node.addEventListener('copy', handler);
        generateEvent(node);
    }
    Clipboard.copyToSystem = copyToSystem;
    /**
     * Generate a clipboard event on a node.
     *
     * @param node - The element on which to generate the event.
     *
     * @param type - The type of event to generate.
     *   `'paste'` events cannot be programmatically generated.
     *
     * #### Notes
     * This can only be called in response to a user input event.
     */
    function generateEvent(node, type = 'copy') {
        // http://stackoverflow.com/a/5210367
        // Identify selected text.
        let sel = window.getSelection();
        // Save the current selection.
        const savedRanges = [];
        for (let i = 0, len = (sel === null || sel === void 0 ? void 0 : sel.rangeCount) || 0; i < len; ++i) {
            savedRanges[i] = sel.getRangeAt(i).cloneRange();
        }
        // Select the node content.
        const range = document.createRange();
        range.selectNodeContents(node);
        if (sel) {
            sel.removeAllRanges();
            sel.addRange(range);
        }
        // Execute the command.
        document.execCommand(type);
        // Restore the previous selection.
        sel = window.getSelection();
        if (sel) {
            sel.removeAllRanges();
            for (let i = 0, len = savedRanges.length; i < len; ++i) {
                sel.addRange(savedRanges[i]);
            }
        }
    }
    Clipboard.generateEvent = generateEvent;
})(Clipboard || (Clipboard = {}));
/**
 * The namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * The application clipboard instance.
     */
    Private.instance = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.MimeData();
})(Private || (Private = {}));
//# sourceMappingURL=clipboard.js.map

/***/ }),

/***/ "../../packages/apputils/lib/collapse.js":
/*!***********************************************!*\
  !*** ../../packages/apputils/lib/collapse.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Collapse": () => (/* binding */ Collapse)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * A panel that supports a collapsible header made from the widget's title.
 * Clicking on the title expands or contracts the widget.
 */
class Collapse extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget {
    constructor(options) {
        super(options);
        this._collapseChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
        const { widget, collapsed = true } = options;
        this.addClass('jp-Collapse');
        this._header = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget();
        this._header.addClass('jp-Collapse-header');
        this._content = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Panel();
        this._content.addClass('jp-Collapse-contents');
        const layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.PanelLayout();
        this.layout = layout;
        layout.addWidget(this._header);
        layout.addWidget(this._content);
        this.widget = widget;
        this.collapsed = collapsed;
    }
    /**
     * The widget inside the collapse panel.
     */
    get widget() {
        return this._widget;
    }
    set widget(widget) {
        const oldWidget = this._widget;
        if (oldWidget) {
            oldWidget.title.changed.disconnect(this._onTitleChanged, this);
            oldWidget.parent = null;
        }
        this._widget = widget;
        widget.title.changed.connect(this._onTitleChanged, this);
        this._onTitleChanged(widget.title);
        this._content.addWidget(widget);
    }
    /**
     * The collapsed state of the panel.
     */
    get collapsed() {
        return this._collapsed;
    }
    set collapsed(value) {
        if (value === this._collapsed) {
            return;
        }
        if (value) {
            this._collapse();
        }
        else {
            this._uncollapse();
        }
    }
    /**
     * A signal for when the widget collapse state changes.
     */
    get collapseChanged() {
        return this._collapseChanged;
    }
    /**
     * Toggle the collapse state of the panel.
     */
    toggle() {
        this.collapsed = !this.collapsed;
    }
    /**
     * Dispose the widget.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        // Delete references we explicitly hold to other widgets.
        this._header = null;
        this._widget = null;
        this._content = null;
        super.dispose();
    }
    /**
     * Handle the DOM events for the Collapse widget.
     *
     * @param event - The DOM event sent to the panel.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the panel's DOM node. It should
     * not be called directly by user code.
     */
    handleEvent(event) {
        switch (event.type) {
            case 'click':
                this._evtClick(event);
                break;
            default:
                break;
        }
    }
    onAfterAttach(msg) {
        this._header.node.addEventListener('click', this);
    }
    onBeforeDetach(msg) {
        this._header.node.removeEventListener('click', this);
    }
    _collapse() {
        this._collapsed = true;
        if (this._content) {
            this._content.hide();
        }
        this._setHeader();
        this._collapseChanged.emit(void 0);
    }
    _uncollapse() {
        this._collapsed = false;
        if (this._content) {
            this._content.show();
        }
        this._setHeader();
        this._collapseChanged.emit(void 0);
    }
    _evtClick(event) {
        this.toggle();
    }
    /**
     * Handle the `changed` signal of a title object.
     */
    _onTitleChanged(sender) {
        this._setHeader();
    }
    _setHeader() {
        (this._collapsed ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.caretUpIcon : _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.caretDownIcon).element({
            container: this._header.node,
            label: this._widget.title.label,
            elementPosition: 'right',
            height: '28px'
        });
    }
}
//# sourceMappingURL=collapse.js.map

/***/ }),

/***/ "../../packages/apputils/lib/commandlinker.js":
/*!****************************************************!*\
  !*** ../../packages/apputils/lib/commandlinker.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommandLinker": () => (/* binding */ CommandLinker)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/

/**
 * The command data attribute added to nodes that are connected.
 */
const COMMAND_ATTR = 'commandlinker-command';
/**
 * The args data attribute added to nodes that are connected.
 */
const ARGS_ATTR = 'commandlinker-args';
/**
 * A static class that provides helper methods to generate clickable nodes that
 * execute registered commands with pre-populated arguments.
 */
class CommandLinker {
    /**
     * Instantiate a new command linker.
     */
    constructor(options) {
        this._isDisposed = false;
        this._commands = options.commands;
        document.body.addEventListener('click', this);
    }
    /**
     * Test whether the linker is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the linker.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        document.body.removeEventListener('click', this);
    }
    /**
     * Connect a command/argument pair to a given node so that when it is clicked,
     * the command will execute.
     *
     * @param node - The node being connected.
     *
     * @param command - The command ID to execute upon click.
     *
     * @param args - The arguments with which to invoke the command.
     *
     * @returns The same node that was passed in, after it has been connected.
     *
     * #### Notes
     * Only `click` events will execute the command on a connected node. So, there
     * are two considerations that are relevant:
     * 1. If a node is connected, the default click action will be prevented.
     * 2. The `HTMLElement` passed in should be clickable.
     */
    connectNode(node, command, args) {
        node.setAttribute(`data-${COMMAND_ATTR}`, command);
        if (args !== void 0) {
            node.setAttribute(`data-${ARGS_ATTR}`, JSON.stringify(args));
        }
        return node;
    }
    /**
     * Disconnect a node that has been connected to execute a command on click.
     *
     * @param node - The node being disconnected.
     *
     * @returns The same node that was passed in, after it has been disconnected.
     *
     * #### Notes
     * This method is safe to call multiple times and is safe to call on nodes
     * that were never connected.
     *
     * This method can be called on rendered virtual DOM nodes that were populated
     * using the `populateVNodeDataset` method in order to disconnect them from
     * executing their command/argument pair.
     */
    disconnectNode(node) {
        node.removeAttribute(`data-${COMMAND_ATTR}`);
        node.removeAttribute(`data-${ARGS_ATTR}`);
        return node;
    }
    /**
     * Handle the DOM events for the command linker helper class.
     *
     * @param event - The DOM event sent to the class.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the panel's DOM node. It should
     * not be called directly by user code.
     */
    handleEvent(event) {
        switch (event.type) {
            case 'click':
                this._evtClick(event);
                break;
            default:
                return;
        }
    }
    /**
     * Populate the `dataset` attribute within the collection of attributes used
     * to instantiate a virtual DOM node with the values necessary for its
     * rendered DOM node to respond to clicks by executing a command/argument
     * pair.
     *
     * @param command - The command ID to execute upon click.
     *
     * @param args - The arguments with which to invoke the command.
     *
     * @returns A `dataset` collection for use within virtual node attributes.
     *
     * #### Notes
     * The return value can be used on its own as the value for the `dataset`
     * attribute of a virtual element, or it can be added to an existing `dataset`
     * as in the example below.
     *
     * #### Example
     * ```typescript
     * let command = 'some:command-id';
     * let args = { alpha: 'beta' };
     * let anchor = h.a({
     *   className: 'some-class',
     *   dataset: {
     *     foo: '1',
     *     bar: '2',
     *     ../...linker.populateVNodeDataset(command, args)
     *   }
     * }, 'some text');
     * ```
     */
    populateVNodeDataset(command, args) {
        let dataset;
        if (args !== void 0) {
            dataset = { [ARGS_ATTR]: JSON.stringify(args), [COMMAND_ATTR]: command };
        }
        else {
            dataset = { [COMMAND_ATTR]: command };
        }
        return dataset;
    }
    /**
     * The global click handler that deploys commands/argument pairs that are
     * attached to the node being clicked.
     */
    _evtClick(event) {
        let target = event.target;
        while (target && target.parentElement) {
            if (target.hasAttribute(`data-${COMMAND_ATTR}`)) {
                event.preventDefault();
                const command = target.getAttribute(`data-${COMMAND_ATTR}`);
                if (!command) {
                    return;
                }
                const argsValue = target.getAttribute(`data-${ARGS_ATTR}`);
                let args = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.JSONExt.emptyObject;
                if (argsValue) {
                    args = JSON.parse(argsValue);
                }
                void this._commands.execute(command, args);
                return;
            }
            target = target.parentElement;
        }
    }
}
//# sourceMappingURL=commandlinker.js.map

/***/ }),

/***/ "../../packages/apputils/lib/commandpalette.js":
/*!*****************************************************!*\
  !*** ../../packages/apputils/lib/commandpalette.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ICommandPalette": () => (/* binding */ ICommandPalette),
/* harmony export */   "ModalCommandPalette": () => (/* binding */ ModalCommandPalette)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/



/* tslint:disable */
/**
 * The command palette token.
 */
const ICommandPalette = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/apputils:ICommandPalette');
/**
 * Class name identifying the input group with search icon.
 */
const SEARCH_ICON_GROUP_CLASS = 'jp-SearchIconGroup';
/**
 * Wrap the command palette in a modal to make it more usable.
 */
class ModalCommandPalette extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Panel {
    constructor(options) {
        super();
        this.addClass('jp-ModalCommandPalette');
        this.id = 'modal-command-palette';
        this.palette = options.commandPalette;
        this._commandPalette.commands.commandExecuted.connect(() => {
            if (this.isAttached && this.isVisible) {
                this.hideAndReset();
            }
        });
        // required to properly receive blur and focus events;
        // selection of items with mouse may not work without this.
        this.node.tabIndex = 0;
    }
    get palette() {
        return this._commandPalette;
    }
    set palette(value) {
        this._commandPalette = value;
        if (!this.searchIconGroup) {
            this._commandPalette.inputNode.insertAdjacentElement('afterend', this.createSearchIconGroup());
        }
        this.addWidget(value);
        this.hideAndReset();
    }
    attach() {
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Widget.attach(this, document.body);
    }
    detach() {
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Widget.detach(this);
    }
    /**
     * Hide the modal command palette and reset its search.
     */
    hideAndReset() {
        this.hide();
        this._commandPalette.inputNode.value = '';
        this._commandPalette.refresh();
    }
    /**
     * Handle incoming events.
     */
    handleEvent(event) {
        switch (event.type) {
            case 'keydown':
                this._evtKeydown(event);
                break;
            case 'blur': {
                // if the focus shifted outside of this DOM element, hide and reset.
                if (
                // focus went away from child element
                this.node.contains(event.target) &&
                    // and it did NOT go to another child element but someplace else
                    !this.node.contains(event.relatedTarget)) {
                    event.stopPropagation();
                    this.hideAndReset();
                }
                break;
            }
            case 'contextmenu':
                event.preventDefault();
                event.stopPropagation();
                break;
            default:
                break;
        }
    }
    /**
     * Find the element with search icon group.
     */
    get searchIconGroup() {
        return this._commandPalette.node.getElementsByClassName(SEARCH_ICON_GROUP_CLASS)[0];
    }
    /**
     * Create element with search icon group.
     */
    createSearchIconGroup() {
        const inputGroup = document.createElement('div');
        inputGroup.classList.add(SEARCH_ICON_GROUP_CLASS);
        _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.searchIcon.render(inputGroup);
        return inputGroup;
    }
    /**
     *  A message handler invoked on an `'after-attach'` message.
     */
    onAfterAttach(msg) {
        this.node.addEventListener('keydown', this, true);
        this.node.addEventListener('contextmenu', this, true);
    }
    /**
     *  A message handler invoked on an `'after-detach'` message.
     */
    onAfterDetach(msg) {
        this.node.removeEventListener('keydown', this, true);
        this.node.removeEventListener('contextmenu', this, true);
    }
    onBeforeHide(msg) {
        document.removeEventListener('blur', this, true);
    }
    onAfterShow(msg) {
        document.addEventListener('blur', this, true);
    }
    /**
     * A message handler invoked on an `'activate-request'` message.
     */
    onActivateRequest(msg) {
        if (this.isAttached) {
            this.show();
            this._commandPalette.activate();
        }
    }
    /**
     * Handle the `'keydown'` event for the widget.
     */
    _evtKeydown(event) {
        // Check for escape key
        switch (event.keyCode) {
            case 27: // Escape.
                event.stopPropagation();
                event.preventDefault();
                this.hideAndReset();
                break;
            default:
                break;
        }
    }
}
//# sourceMappingURL=commandpalette.js.map

/***/ }),

/***/ "../../packages/apputils/lib/dialog.js":
/*!*********************************************!*\
  !*** ../../packages/apputils/lib/dialog.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showDialog": () => (/* binding */ showDialog),
/* harmony export */   "showErrorMessage": () => (/* binding */ showErrorMessage),
/* harmony export */   "Dialog": () => (/* binding */ Dialog)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/messaging */ "webpack/sharing/consume/default/@lumino/messaging/@lumino/messaging?790d");
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_messaging__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _styling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./styling */ "../../packages/apputils/lib/styling.js");
/* harmony import */ var _vdom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vdom */ "../../packages/apputils/lib/vdom.js");
/* harmony import */ var _widgettracker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./widgettracker */ "../../packages/apputils/lib/widgettracker.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.









/**
 * Create and show a dialog.
 *
 * @param options - The dialog setup options.
 *
 * @returns A promise that resolves with whether the dialog was accepted.
 */
function showDialog(options = {}) {
    const dialog = new Dialog(options);
    return dialog.launch();
}
/**
 * Show an error message dialog.
 *
 * @param title - The title of the dialog box.
 *
 * @param error - the error to show in the dialog body (either a string
 *   or an object with a string `message` property).
 */
function showErrorMessage(title, error, buttons = [
    Dialog.okButton({ label: 'Dismiss' })
]) {
    console.warn('Showing error:', error);
    // Cache promises to prevent multiple copies of identical dialogs showing
    // to the user.
    const body = typeof error === 'string' ? error : error.message;
    const key = title + '----' + body;
    const promise = Private.errorMessagePromiseCache.get(key);
    if (promise) {
        return promise;
    }
    else {
        const dialogPromise = showDialog({
            title: title,
            body: body,
            buttons: buttons
        }).then(() => {
            Private.errorMessagePromiseCache.delete(key);
        }, error => {
            // TODO: Use .finally() above when supported
            Private.errorMessagePromiseCache.delete(key);
            throw error;
        });
        Private.errorMessagePromiseCache.set(key, dialogPromise);
        return dialogPromise;
    }
}
/**
 * A modal dialog widget.
 */
class Dialog extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget {
    /**
     * Create a dialog panel instance.
     *
     * @param options - The dialog setup options.
     */
    constructor(options = {}) {
        super();
        this._focusNodeSelector = '';
        this.addClass('jp-Dialog');
        const normalized = Private.handleOptions(options);
        const renderer = normalized.renderer;
        this._host = normalized.host;
        this._defaultButton = normalized.defaultButton;
        this._buttons = normalized.buttons;
        this._hasClose = normalized.hasClose;
        this._buttonNodes = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__.toArray)((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__.map)(this._buttons, button => {
            return renderer.createButtonNode(button);
        }));
        this._lastMouseDownInDialog = false;
        const layout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.PanelLayout());
        const content = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Panel();
        content.addClass('jp-Dialog-content');
        if (typeof options.body === 'string') {
            content.addClass('jp-Dialog-content-small');
        }
        layout.addWidget(content);
        this._body = normalized.body;
        const header = renderer.createHeader(normalized.title, () => this.reject(), options);
        const body = renderer.createBody(normalized.body);
        const footer = renderer.createFooter(this._buttonNodes);
        content.addWidget(header);
        content.addWidget(body);
        content.addWidget(footer);
        this._primary = this._buttonNodes[this._defaultButton];
        this._focusNodeSelector = options.focusNodeSelector;
        // Add new dialogs to the tracker.
        void Dialog.tracker.add(this);
    }
    /**
     * Dispose of the resources used by the dialog.
     */
    dispose() {
        const promise = this._promise;
        if (promise) {
            this._promise = null;
            promise.reject(void 0);
            _lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__.ArrayExt.removeFirstOf(Private.launchQueue, promise.promise);
        }
        super.dispose();
    }
    /**
     * Launch the dialog as a modal window.
     *
     * @returns a promise that resolves with the result of the dialog.
     */
    launch() {
        // Return the existing dialog if already open.
        if (this._promise) {
            return this._promise.promise;
        }
        const promise = (this._promise = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.PromiseDelegate());
        const promises = Promise.all(Private.launchQueue);
        Private.launchQueue.push(this._promise.promise);
        return promises.then(() => {
            // Do not show Dialog if it was disposed of before it was at the front of the launch queue
            if (!this._promise) {
                return Promise.resolve({ button: Dialog.cancelButton(), value: null });
            }
            _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget.attach(this, this._host);
            return promise.promise;
        });
    }
    /**
     * Resolve the current dialog.
     *
     * @param index - An optional index to the button to resolve.
     *
     * #### Notes
     * Will default to the defaultIndex.
     * Will resolve the current `show()` with the button value.
     * Will be a no-op if the dialog is not shown.
     */
    resolve(index) {
        if (!this._promise) {
            return;
        }
        if (index === undefined) {
            index = this._defaultButton;
        }
        this._resolve(this._buttons[index]);
    }
    /**
     * Reject the current dialog with a default reject value.
     *
     * #### Notes
     * Will be a no-op if the dialog is not shown.
     */
    reject() {
        if (!this._promise) {
            return;
        }
        this._resolve(Dialog.cancelButton());
    }
    /**
     * Handle the DOM events for the directory listing.
     *
     * @param event - The DOM event sent to the widget.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the panel's DOM node. It should
     * not be called directly by user code.
     */
    handleEvent(event) {
        switch (event.type) {
            case 'keydown':
                this._evtKeydown(event);
                break;
            case 'mousedown':
                this._evtMouseDown(event);
                break;
            case 'click':
                this._evtClick(event);
                break;
            case 'focus':
                this._evtFocus(event);
                break;
            case 'contextmenu':
                event.preventDefault();
                event.stopPropagation();
                break;
            default:
                break;
        }
    }
    /**
     *  A message handler invoked on an `'after-attach'` message.
     */
    onAfterAttach(msg) {
        var _a;
        const node = this.node;
        node.addEventListener('keydown', this, true);
        node.addEventListener('contextmenu', this, true);
        node.addEventListener('click', this, true);
        document.addEventListener('mousedown', this, true);
        document.addEventListener('focus', this, true);
        this._first = Private.findFirstFocusable(this.node);
        this._original = document.activeElement;
        if (this._focusNodeSelector) {
            const body = this.node.querySelector('.jp-Dialog-body');
            const el = body === null || body === void 0 ? void 0 : body.querySelector(this._focusNodeSelector);
            if (el) {
                this._primary = el;
            }
        }
        (_a = this._primary) === null || _a === void 0 ? void 0 : _a.focus();
    }
    /**
     *  A message handler invoked on an `'after-detach'` message.
     */
    onAfterDetach(msg) {
        const node = this.node;
        node.removeEventListener('keydown', this, true);
        node.removeEventListener('contextmenu', this, true);
        node.removeEventListener('click', this, true);
        document.removeEventListener('focus', this, true);
        document.removeEventListener('mousedown', this, true);
        this._original.focus();
    }
    /**
     * A message handler invoked on a `'close-request'` message.
     */
    onCloseRequest(msg) {
        if (this._promise) {
            this.reject();
        }
        super.onCloseRequest(msg);
    }
    /**
     * Handle the `'click'` event for a dialog button.
     *
     * @param event - The DOM event sent to the widget
     */
    _evtClick(event) {
        const content = this.node.getElementsByClassName('jp-Dialog-content')[0];
        if (!content.contains(event.target)) {
            event.stopPropagation();
            event.preventDefault();
            if (this._hasClose && !this._lastMouseDownInDialog) {
                this.reject();
            }
            return;
        }
        for (const buttonNode of this._buttonNodes) {
            if (buttonNode.contains(event.target)) {
                const index = this._buttonNodes.indexOf(buttonNode);
                this.resolve(index);
            }
        }
    }
    /**
     * Handle the `'keydown'` event for the widget.
     *
     * @param event - The DOM event sent to the widget
     */
    _evtKeydown(event) {
        // Check for escape key
        switch (event.keyCode) {
            case 27: // Escape.
                event.stopPropagation();
                event.preventDefault();
                if (this._hasClose) {
                    this.reject();
                }
                break;
            case 37: {
                // Left arrow
                const activeEl = document.activeElement;
                if (activeEl instanceof HTMLButtonElement) {
                    let idx = this._buttonNodes.indexOf(activeEl) - 1;
                    // Handle a left arrows on the first button
                    if (idx < 0) {
                        idx = this._buttonNodes.length - 1;
                    }
                    const node = this._buttonNodes[idx];
                    event.stopPropagation();
                    event.preventDefault();
                    node.focus();
                }
                break;
            }
            case 39: {
                // Right arrow
                const activeEl = document.activeElement;
                if (activeEl instanceof HTMLButtonElement) {
                    let idx = this._buttonNodes.indexOf(activeEl) + 1;
                    // Handle a right arrows on the last button
                    if (idx == this._buttons.length) {
                        idx = 0;
                    }
                    const node = this._buttonNodes[idx];
                    event.stopPropagation();
                    event.preventDefault();
                    node.focus();
                }
                break;
            }
            case 9: {
                // Tab.
                // Handle a tab on the last button.
                const node = this._buttonNodes[this._buttons.length - 1];
                if (document.activeElement === node && !event.shiftKey) {
                    event.stopPropagation();
                    event.preventDefault();
                    this._first.focus();
                }
                break;
            }
            case 13: {
                // Enter.
                event.stopPropagation();
                event.preventDefault();
                const activeEl = document.activeElement;
                let index;
                if (activeEl instanceof HTMLButtonElement) {
                    index = this._buttonNodes.indexOf(activeEl);
                }
                this.resolve(index);
                break;
            }
            default:
                break;
        }
    }
    /**
     * Handle the `'focus'` event for the widget.
     *
     * @param event - The DOM event sent to the widget
     */
    _evtFocus(event) {
        var _a;
        const target = event.target;
        if (!this.node.contains(target)) {
            event.stopPropagation();
            (_a = this._buttonNodes[this._defaultButton]) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }
    /**
     * Handle the `'mousedown'` event for the widget.
     *
     * @param event - The DOM event sent to the widget
     */
    _evtMouseDown(event) {
        const content = this.node.getElementsByClassName('jp-Dialog-content')[0];
        const target = event.target;
        this._lastMouseDownInDialog = content.contains(target);
    }
    /**
     * Resolve a button item.
     */
    _resolve(button) {
        // Prevent loopback.
        const promise = this._promise;
        if (!promise) {
            this.dispose();
            return;
        }
        this._promise = null;
        _lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__.ArrayExt.removeFirstOf(Private.launchQueue, promise.promise);
        const body = this._body;
        let value = null;
        if (button.accept &&
            body instanceof _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget &&
            typeof body.getValue === 'function') {
            value = body.getValue();
        }
        this.dispose();
        promise.resolve({ button, value });
    }
}
/**
 * The namespace for Dialog class statics.
 */
(function (Dialog) {
    /**
     * Create a button item.
     */
    function createButton(value) {
        value.accept = value.accept !== false;
        const defaultLabel = value.accept ? 'OK' : 'Cancel';
        return {
            label: value.label || defaultLabel,
            iconClass: value.iconClass || '',
            iconLabel: value.iconLabel || '',
            caption: value.caption || '',
            className: value.className || '',
            accept: value.accept,
            actions: value.actions || [],
            displayType: value.displayType || 'default'
        };
    }
    Dialog.createButton = createButton;
    /**
     * Create a reject button.
     */
    function cancelButton(options = {}) {
        options.accept = false;
        return createButton(options);
    }
    Dialog.cancelButton = cancelButton;
    /**
     * Create an accept button.
     */
    function okButton(options = {}) {
        options.accept = true;
        return createButton(options);
    }
    Dialog.okButton = okButton;
    /**
     * Create a warn button.
     */
    function warnButton(options = {}) {
        options.displayType = 'warn';
        return createButton(options);
    }
    Dialog.warnButton = warnButton;
    /**
     * Disposes all dialog instances.
     *
     * #### Notes
     * This function should only be used in tests or cases where application state
     * may be discarded.
     */
    function flush() {
        Dialog.tracker.forEach(dialog => {
            dialog.dispose();
        });
    }
    Dialog.flush = flush;
    /**
     * The default implementation of a dialog renderer.
     */
    class Renderer {
        /**
         * Create the header of the dialog.
         *
         * @param title - The title of the dialog.
         *
         * @returns A widget for the dialog header.
         */
        createHeader(title, reject = () => {
            /* empty */
        }, options = {}) {
            let header;
            const handleMouseDown = (event) => {
                // Fire action only when left button is pressed.
                if (event.button === 0) {
                    event.preventDefault();
                    reject();
                }
            };
            const handleKeyDown = (event) => {
                const { key } = event;
                if (key === 'Enter' || key === ' ') {
                    reject();
                }
            };
            if (typeof title === 'string') {
                header = _vdom__WEBPACK_IMPORTED_MODULE_6__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_5__.createElement(react__WEBPACK_IMPORTED_MODULE_5__.Fragment, null,
                    title,
                    options.hasClose && (react__WEBPACK_IMPORTED_MODULE_5__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.Button, { className: "jp-Dialog-close-button", onMouseDown: handleMouseDown, onKeyDown: handleKeyDown, title: "Cancel", minimal: true },
                        react__WEBPACK_IMPORTED_MODULE_5__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon.resolveReact, { icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.closeIcon, iconClass: "jp-Icon", className: "jp-ToolbarButtonComponent-icon", tag: "span" })))));
            }
            else {
                header = _vdom__WEBPACK_IMPORTED_MODULE_6__.ReactWidget.create(title);
            }
            header.addClass('jp-Dialog-header');
            _styling__WEBPACK_IMPORTED_MODULE_7__.Styling.styleNode(header.node);
            return header;
        }
        /**
         * Create the body of the dialog.
         *
         * @param value - The input value for the body.
         *
         * @returns A widget for the body.
         */
        createBody(value) {
            let body;
            if (typeof value === 'string') {
                body = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget({ node: document.createElement('span') });
                body.node.textContent = value;
            }
            else if (value instanceof _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget) {
                body = value;
            }
            else {
                body = _vdom__WEBPACK_IMPORTED_MODULE_6__.ReactWidget.create(value);
                // Immediately update the body even though it has not yet attached in
                // order to trigger a render of the DOM nodes from the React element.
                _lumino_messaging__WEBPACK_IMPORTED_MODULE_3__.MessageLoop.sendMessage(body, _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget.Msg.UpdateRequest);
            }
            body.addClass('jp-Dialog-body');
            _styling__WEBPACK_IMPORTED_MODULE_7__.Styling.styleNode(body.node);
            return body;
        }
        /**
         * Create the footer of the dialog.
         *
         * @param buttonNodes - The buttons nodes to add to the footer.
         *
         * @returns A widget for the footer.
         */
        createFooter(buttons) {
            const footer = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget();
            footer.addClass('jp-Dialog-footer');
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__.each)(buttons, button => {
                footer.node.appendChild(button);
            });
            _styling__WEBPACK_IMPORTED_MODULE_7__.Styling.styleNode(footer.node);
            return footer;
        }
        /**
         * Create a button node for the dialog.
         *
         * @param button - The button data.
         *
         * @returns A node for the button.
         */
        createButtonNode(button) {
            const e = document.createElement('button');
            e.className = this.createItemClass(button);
            e.appendChild(this.renderIcon(button));
            e.appendChild(this.renderLabel(button));
            return e;
        }
        /**
         * Create the class name for the button.
         *
         * @param data - The data to use for the class name.
         *
         * @returns The full class name for the button.
         */
        createItemClass(data) {
            // Setup the initial class name.
            let name = 'jp-Dialog-button';
            // Add the other state classes.
            if (data.accept) {
                name += ' jp-mod-accept';
            }
            else {
                name += ' jp-mod-reject';
            }
            if (data.displayType === 'warn') {
                name += ' jp-mod-warn';
            }
            // Add the extra class.
            const extra = data.className;
            if (extra) {
                name += ` ${extra}`;
            }
            // Return the complete class name.
            return name;
        }
        /**
         * Render an icon element for a dialog item.
         *
         * @param data - The data to use for rendering the icon.
         *
         * @returns An HTML element representing the icon.
         */
        renderIcon(data) {
            const e = document.createElement('div');
            e.className = this.createIconClass(data);
            e.appendChild(document.createTextNode(data.iconLabel));
            return e;
        }
        /**
         * Create the class name for the button icon.
         *
         * @param data - The data to use for the class name.
         *
         * @returns The full class name for the item icon.
         */
        createIconClass(data) {
            const name = 'jp-Dialog-buttonIcon';
            const extra = data.iconClass;
            return extra ? `${name} ${extra}` : name;
        }
        /**
         * Render the label element for a button.
         *
         * @param data - The data to use for rendering the label.
         *
         * @returns An HTML element representing the item label.
         */
        renderLabel(data) {
            const e = document.createElement('div');
            e.className = 'jp-Dialog-buttonLabel';
            e.title = data.caption;
            e.appendChild(document.createTextNode(data.label));
            return e;
        }
    }
    Dialog.Renderer = Renderer;
    /**
     * The default renderer instance.
     */
    Dialog.defaultRenderer = new Renderer();
    /**
     * The dialog widget tracker.
     */
    Dialog.tracker = new _widgettracker__WEBPACK_IMPORTED_MODULE_8__.WidgetTracker({
        namespace: '@jupyterlab/apputils:Dialog'
    });
})(Dialog || (Dialog = {}));
/**
 * The namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * The queue for launching dialogs.
     */
    Private.launchQueue = [];
    Private.errorMessagePromiseCache = new Map();
    /**
     * Handle the input options for a dialog.
     *
     * @param options - The input options.
     *
     * @returns A new options object with defaults applied.
     */
    function handleOptions(options = {}) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const buttons = (_a = options.buttons) !== null && _a !== void 0 ? _a : [
            Dialog.cancelButton(),
            Dialog.okButton()
        ];
        return {
            title: (_b = options.title) !== null && _b !== void 0 ? _b : '',
            body: (_c = options.body) !== null && _c !== void 0 ? _c : '',
            host: (_d = options.host) !== null && _d !== void 0 ? _d : document.body,
            buttons,
            defaultButton: (_e = options.defaultButton) !== null && _e !== void 0 ? _e : buttons.length - 1,
            renderer: (_f = options.renderer) !== null && _f !== void 0 ? _f : Dialog.defaultRenderer,
            focusNodeSelector: (_g = options.focusNodeSelector) !== null && _g !== void 0 ? _g : '',
            hasClose: (_h = options.hasClose) !== null && _h !== void 0 ? _h : true
        };
    }
    Private.handleOptions = handleOptions;
    /**
     *  Find the first focusable item in the dialog.
     */
    function findFirstFocusable(node) {
        const candidateSelectors = [
            'input',
            'select',
            'a[href]',
            'textarea',
            'button',
            '[tabindex]'
        ].join(',');
        return node.querySelectorAll(candidateSelectors)[0];
    }
    Private.findFirstFocusable = findFirstFocusable;
})(Private || (Private = {}));
//# sourceMappingURL=dialog.js.map

/***/ }),

/***/ "../../packages/apputils/lib/domutils.js":
/*!***********************************************!*\
  !*** ../../packages/apputils/lib/domutils.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOMUtils": () => (/* binding */ DOMUtils)
/* harmony export */ });
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/domutils */ "webpack/sharing/consume/default/@lumino/domutils/@lumino/domutils?0bc5");
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_domutils__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * The namespace for DOM utilities.
 */
var DOMUtils;
(function (DOMUtils) {
    /**
     * Get the index of the node at a client position, or `-1`.
     */
    function hitTestNodes(nodes, x, y) {
        return _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.ArrayExt.findFirstIndex(nodes, node => {
            return _lumino_domutils__WEBPACK_IMPORTED_MODULE_2__.ElementExt.hitTest(node, x, y);
        });
    }
    DOMUtils.hitTestNodes = hitTestNodes;
    /**
     * Find the first element matching a class name.
     */
    function findElement(parent, className) {
        return parent.querySelector(`.${className}`);
    }
    DOMUtils.findElement = findElement;
    /**
     * Find the first element matching a class name.
     */
    function findElements(parent, className) {
        return parent.getElementsByClassName(className);
    }
    DOMUtils.findElements = findElements;
    /**
     * Create a DOM id with prefix "id-" to solve bug for UUIDs beginning with numbers.
     */
    function createDomID() {
        return `id-${_lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.UUID.uuid4()}`;
    }
    DOMUtils.createDomID = createDomID;
})(DOMUtils || (DOMUtils = {}));
//# sourceMappingURL=domutils.js.map

/***/ }),

/***/ "../../packages/apputils/lib/hoverbox.js":
/*!***********************************************!*\
  !*** ../../packages/apputils/lib/hoverbox.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HoverBox": () => (/* binding */ HoverBox)
/* harmony export */ });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * The class name added to all hover boxes.
 */
const HOVERBOX_CLASS = 'jp-HoverBox';
/**
 * The class name added to a hovering node that is scrolled out of view.
 */
const OUTOFVIEW_CLASS = 'jp-mod-outofview';
/**
 * A namespace for `HoverBox` members.
 */
var HoverBox;
(function (HoverBox) {
    /**
     * Set the visible dimensions of a hovering box anchored to an editor cursor.
     *
     * @param options - The hover box geometry calculation options.
     */
    function setGeometry(options) {
        const { anchor, host, node, privilege } = options;
        // Add hover box class if it does not exist.
        node.classList.add(HOVERBOX_CLASS);
        // Hide the hover box before querying the DOM for the anchor coordinates.
        node.classList.add(OUTOFVIEW_CLASS);
        // If the current coordinates are not visible, bail.
        if (!host.contains(document.elementFromPoint(anchor.left, anchor.top))) {
            return;
        }
        // Clear any previously set max-height.
        node.style.maxHeight = '';
        // Clear any programmatically set margin-top.
        node.style.marginTop = '';
        // Make sure the node is visible so that its dimensions can be queried.
        node.classList.remove(OUTOFVIEW_CLASS);
        const style = options.style || window.getComputedStyle(node);
        const innerHeight = window.innerHeight;
        const spaceAbove = anchor.top;
        const spaceBelow = innerHeight - anchor.bottom;
        const marginTop = parseInt(style.marginTop, 10) || 0;
        const minHeight = parseInt(style.minHeight, 10) || options.minHeight;
        let maxHeight = parseInt(style.maxHeight, 10) || options.maxHeight;
        // Determine whether to render above or below; check privilege.
        const renderBelow = privilege === 'forceAbove'
            ? false
            : privilege === 'forceBelow'
                ? true
                : privilege === 'above'
                    ? spaceAbove < maxHeight && spaceAbove < spaceBelow
                    : spaceBelow >= maxHeight || spaceBelow >= spaceAbove;
        if (renderBelow) {
            maxHeight = Math.min(spaceBelow - marginTop, maxHeight);
        }
        else {
            maxHeight = Math.min(spaceAbove, maxHeight);
            // If the box renders above the text, its top margin is irrelevant.
            node.style.marginTop = '0px';
        }
        node.style.maxHeight = `${maxHeight}px`;
        // Make sure the box ought to be visible.
        const withinBounds = maxHeight > minHeight &&
            (spaceBelow >= minHeight || spaceAbove >= minHeight);
        if (!withinBounds) {
            node.classList.add(OUTOFVIEW_CLASS);
            return;
        }
        // Position the box vertically.
        const offsetAbove = (options.offset &&
            options.offset.vertical &&
            options.offset.vertical.above) ||
            0;
        const offsetBelow = (options.offset &&
            options.offset.vertical &&
            options.offset.vertical.below) ||
            0;
        const top = renderBelow
            ? innerHeight - spaceBelow + offsetBelow
            : spaceAbove - node.getBoundingClientRect().height + offsetAbove;
        node.style.top = `${Math.floor(top)}px`;
        // Position the box horizontally.
        const offsetHorizontal = (options.offset && options.offset.horizontal) || 0;
        let left = anchor.left + offsetHorizontal;
        node.style.left = `${Math.ceil(left)}px`;
        node.style.width = 'auto';
        // Expand the menu width by the scrollbar size, if present.
        if (node.scrollHeight >= maxHeight) {
            node.style.width = `${2 * node.offsetWidth - node.clientWidth}`;
            node.scrollTop = 0;
        }
        // Move left to fit in the window.
        const right = node.getBoundingClientRect().right;
        if (right > window.innerWidth) {
            left -= right - window.innerWidth;
            node.style.left = `${Math.ceil(left)}px`;
        }
    }
    HoverBox.setGeometry = setGeometry;
})(HoverBox || (HoverBox = {}));
//# sourceMappingURL=hoverbox.js.map

/***/ }),

/***/ "../../packages/apputils/lib/iframe.js":
/*!*********************************************!*\
  !*** ../../packages/apputils/lib/iframe.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IFrame": () => (/* binding */ IFrame)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * A phosphor widget which wraps an IFrame.
 */
class IFrame extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    /**
     * Create a new IFrame widget.
     */
    constructor(options = {}) {
        super({ node: Private.createNode() });
        this._sandbox = [];
        this.addClass('jp-IFrame');
        this.sandbox = options.sandbox || [];
        this.referrerPolicy = options.referrerPolicy || 'no-referrer';
    }
    /**
     * Referrer policy for the iframe.
     *
     * #### Notes
     * By default, `no-referrer` is chosen.
     *
     * For more information, see
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/referrerPolicy
     */
    get referrerPolicy() {
        return this._referrerPolicy;
    }
    set referrerPolicy(value) {
        if (this._referrerPolicy === value) {
            return;
        }
        this._referrerPolicy = value;
        const iframe = this.node.querySelector('iframe');
        iframe.setAttribute('referrerpolicy', value);
    }
    /**
     * Exceptions to the sandboxing.
     *
     * #### Notes
     * By default, all sandboxing security policies are enabled.
     * This setting allows the user to selectively disable these
     * policies. This should be done with care, as it can
     * introduce security risks, and possibly allow malicious
     * sites to execute code in a JupyterLab session.
     *
     * For more information, see
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
     */
    get sandbox() {
        return this._sandbox.slice();
    }
    set sandbox(values) {
        this._sandbox = values.slice();
        const iframe = this.node.querySelector('iframe');
        const exceptions = values.length ? values.join(' ') : '';
        iframe.setAttribute('sandbox', exceptions);
    }
    /**
     * The url of the IFrame.
     */
    get url() {
        return this.node.querySelector('iframe').getAttribute('src') || '';
    }
    set url(url) {
        this.node.querySelector('iframe').setAttribute('src', url);
    }
}
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * Create the main content node of an iframe widget.
     */
    function createNode() {
        const node = document.createElement('div');
        const iframe = document.createElement('iframe');
        iframe.setAttribute('sandbox', '');
        iframe.style.height = '100%';
        iframe.style.width = '100%';
        node.appendChild(iframe);
        return node;
    }
    Private.createNode = createNode;
})(Private || (Private = {}));
//# sourceMappingURL=iframe.js.map

/***/ }),

/***/ "../../packages/apputils/lib/index.js":
/*!********************************************!*\
  !*** ../../packages/apputils/lib/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Clipboard": () => (/* reexport safe */ _clipboard__WEBPACK_IMPORTED_MODULE_0__.Clipboard),
/* harmony export */   "Collapse": () => (/* reexport safe */ _collapse__WEBPACK_IMPORTED_MODULE_1__.Collapse),
/* harmony export */   "CommandLinker": () => (/* reexport safe */ _commandlinker__WEBPACK_IMPORTED_MODULE_2__.CommandLinker),
/* harmony export */   "ICommandPalette": () => (/* reexport safe */ _commandpalette__WEBPACK_IMPORTED_MODULE_3__.ICommandPalette),
/* harmony export */   "ModalCommandPalette": () => (/* reexport safe */ _commandpalette__WEBPACK_IMPORTED_MODULE_3__.ModalCommandPalette),
/* harmony export */   "Dialog": () => (/* reexport safe */ _dialog__WEBPACK_IMPORTED_MODULE_4__.Dialog),
/* harmony export */   "showDialog": () => (/* reexport safe */ _dialog__WEBPACK_IMPORTED_MODULE_4__.showDialog),
/* harmony export */   "showErrorMessage": () => (/* reexport safe */ _dialog__WEBPACK_IMPORTED_MODULE_4__.showErrorMessage),
/* harmony export */   "DOMUtils": () => (/* reexport safe */ _domutils__WEBPACK_IMPORTED_MODULE_5__.DOMUtils),
/* harmony export */   "HoverBox": () => (/* reexport safe */ _hoverbox__WEBPACK_IMPORTED_MODULE_6__.HoverBox),
/* harmony export */   "IFrame": () => (/* reexport safe */ _iframe__WEBPACK_IMPORTED_MODULE_7__.IFrame),
/* harmony export */   "InputDialog": () => (/* reexport safe */ _inputdialog__WEBPACK_IMPORTED_MODULE_8__.InputDialog),
/* harmony export */   "MainAreaWidget": () => (/* reexport safe */ _mainareawidget__WEBPACK_IMPORTED_MODULE_9__.MainAreaWidget),
/* harmony export */   "MenuFactory": () => (/* reexport safe */ _menufactory__WEBPACK_IMPORTED_MODULE_10__.MenuFactory),
/* harmony export */   "Printing": () => (/* reexport safe */ _printing__WEBPACK_IMPORTED_MODULE_11__.Printing),
/* harmony export */   "Sanitizer": () => (/* reexport safe */ _sanitizer__WEBPACK_IMPORTED_MODULE_12__.Sanitizer),
/* harmony export */   "defaultSanitizer": () => (/* reexport safe */ _sanitizer__WEBPACK_IMPORTED_MODULE_12__.defaultSanitizer),
/* harmony export */   "FilenameSearcher": () => (/* reexport safe */ _search__WEBPACK_IMPORTED_MODULE_13__.FilenameSearcher),
/* harmony export */   "FilterBox": () => (/* reexport safe */ _search__WEBPACK_IMPORTED_MODULE_13__.FilterBox),
/* harmony export */   "updateFilterFunction": () => (/* reexport safe */ _search__WEBPACK_IMPORTED_MODULE_13__.updateFilterFunction),
/* harmony export */   "SessionContext": () => (/* reexport safe */ _sessioncontext__WEBPACK_IMPORTED_MODULE_14__.SessionContext),
/* harmony export */   "sessionContextDialogs": () => (/* reexport safe */ _sessioncontext__WEBPACK_IMPORTED_MODULE_14__.sessionContextDialogs),
/* harmony export */   "Spinner": () => (/* reexport safe */ _spinner__WEBPACK_IMPORTED_MODULE_15__.Spinner),
/* harmony export */   "ISplashScreen": () => (/* reexport safe */ _splash__WEBPACK_IMPORTED_MODULE_16__.ISplashScreen),
/* harmony export */   "Styling": () => (/* reexport safe */ _styling__WEBPACK_IMPORTED_MODULE_17__.Styling),
/* harmony export */   "ThemeManager": () => (/* reexport safe */ _thememanager__WEBPACK_IMPORTED_MODULE_18__.ThemeManager),
/* harmony export */   "ISanitizer": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_19__.ISanitizer),
/* harmony export */   "ISessionContextDialogs": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_19__.ISessionContextDialogs),
/* harmony export */   "IThemeManager": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_19__.IThemeManager),
/* harmony export */   "IToolbarWidgetRegistry": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_19__.IToolbarWidgetRegistry),
/* harmony export */   "CommandToolbarButton": () => (/* reexport safe */ _toolbar__WEBPACK_IMPORTED_MODULE_20__.CommandToolbarButton),
/* harmony export */   "CommandToolbarButtonComponent": () => (/* reexport safe */ _toolbar__WEBPACK_IMPORTED_MODULE_20__.CommandToolbarButtonComponent),
/* harmony export */   "ReactiveToolbar": () => (/* reexport safe */ _toolbar__WEBPACK_IMPORTED_MODULE_20__.ReactiveToolbar),
/* harmony export */   "Toolbar": () => (/* reexport safe */ _toolbar__WEBPACK_IMPORTED_MODULE_20__.Toolbar),
/* harmony export */   "ToolbarButton": () => (/* reexport safe */ _toolbar__WEBPACK_IMPORTED_MODULE_20__.ToolbarButton),
/* harmony export */   "ToolbarButtonComponent": () => (/* reexport safe */ _toolbar__WEBPACK_IMPORTED_MODULE_20__.ToolbarButtonComponent),
/* harmony export */   "ToolbarWidgetRegistry": () => (/* reexport safe */ _toolbar__WEBPACK_IMPORTED_MODULE_20__.ToolbarWidgetRegistry),
/* harmony export */   "addCommandToolbarButtonClass": () => (/* reexport safe */ _toolbar__WEBPACK_IMPORTED_MODULE_20__.addCommandToolbarButtonClass),
/* harmony export */   "addToolbarButtonClass": () => (/* reexport safe */ _toolbar__WEBPACK_IMPORTED_MODULE_20__.addToolbarButtonClass),
/* harmony export */   "createDefaultFactory": () => (/* reexport safe */ _toolbar__WEBPACK_IMPORTED_MODULE_20__.createDefaultFactory),
/* harmony export */   "createToolbarFactory": () => (/* reexport safe */ _toolbar__WEBPACK_IMPORTED_MODULE_20__.createToolbarFactory),
/* harmony export */   "setToolbar": () => (/* reexport safe */ _toolbar__WEBPACK_IMPORTED_MODULE_20__.setToolbar),
/* harmony export */   "ReactWidget": () => (/* reexport safe */ _vdom__WEBPACK_IMPORTED_MODULE_21__.ReactWidget),
/* harmony export */   "UseSignal": () => (/* reexport safe */ _vdom__WEBPACK_IMPORTED_MODULE_21__.UseSignal),
/* harmony export */   "VDomModel": () => (/* reexport safe */ _vdom__WEBPACK_IMPORTED_MODULE_21__.VDomModel),
/* harmony export */   "VDomRenderer": () => (/* reexport safe */ _vdom__WEBPACK_IMPORTED_MODULE_21__.VDomRenderer),
/* harmony export */   "WidgetTracker": () => (/* reexport safe */ _widgettracker__WEBPACK_IMPORTED_MODULE_22__.WidgetTracker),
/* harmony export */   "IWindowResolver": () => (/* reexport safe */ _windowresolver__WEBPACK_IMPORTED_MODULE_23__.IWindowResolver),
/* harmony export */   "WindowResolver": () => (/* reexport safe */ _windowresolver__WEBPACK_IMPORTED_MODULE_23__.WindowResolver),
/* harmony export */   "translateKernelStatuses": () => (/* reexport safe */ _kernelstatuses__WEBPACK_IMPORTED_MODULE_24__.translateKernelStatuses)
/* harmony export */ });
/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clipboard */ "../../packages/apputils/lib/clipboard.js");
/* harmony import */ var _collapse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collapse */ "../../packages/apputils/lib/collapse.js");
/* harmony import */ var _commandlinker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commandlinker */ "../../packages/apputils/lib/commandlinker.js");
/* harmony import */ var _commandpalette__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./commandpalette */ "../../packages/apputils/lib/commandpalette.js");
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dialog */ "../../packages/apputils/lib/dialog.js");
/* harmony import */ var _domutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./domutils */ "../../packages/apputils/lib/domutils.js");
/* harmony import */ var _hoverbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hoverbox */ "../../packages/apputils/lib/hoverbox.js");
/* harmony import */ var _iframe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./iframe */ "../../packages/apputils/lib/iframe.js");
/* harmony import */ var _inputdialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./inputdialog */ "../../packages/apputils/lib/inputdialog.js");
/* harmony import */ var _mainareawidget__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mainareawidget */ "../../packages/apputils/lib/mainareawidget.js");
/* harmony import */ var _menufactory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./menufactory */ "../../packages/apputils/lib/menufactory.js");
/* harmony import */ var _printing__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./printing */ "../../packages/apputils/lib/printing.js");
/* harmony import */ var _sanitizer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./sanitizer */ "../../packages/apputils/lib/sanitizer.js");
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./search */ "../../packages/apputils/lib/search.js");
/* harmony import */ var _sessioncontext__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./sessioncontext */ "../../packages/apputils/lib/sessioncontext.js");
/* harmony import */ var _spinner__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./spinner */ "../../packages/apputils/lib/spinner.js");
/* harmony import */ var _splash__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./splash */ "../../packages/apputils/lib/splash.js");
/* harmony import */ var _styling__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./styling */ "../../packages/apputils/lib/styling.js");
/* harmony import */ var _thememanager__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./thememanager */ "../../packages/apputils/lib/thememanager.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./tokens */ "../../packages/apputils/lib/tokens.js");
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./toolbar */ "../../packages/apputils/lib/toolbar/index.js");
/* harmony import */ var _vdom__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./vdom */ "../../packages/apputils/lib/vdom.js");
/* harmony import */ var _widgettracker__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./widgettracker */ "../../packages/apputils/lib/widgettracker.js");
/* harmony import */ var _windowresolver__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./windowresolver */ "../../packages/apputils/lib/windowresolver.js");
/* harmony import */ var _kernelstatuses__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./kernelstatuses */ "../../packages/apputils/lib/kernelstatuses.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module apputils
 */

























//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/apputils/lib/inputdialog.js":
/*!**************************************************!*\
  !*** ../../packages/apputils/lib/inputdialog.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputDialog": () => (/* binding */ InputDialog)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dialog */ "../../packages/apputils/lib/dialog.js");
/* harmony import */ var _styling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styling */ "../../packages/apputils/lib/styling.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



const INPUT_DIALOG_CLASS = 'jp-Input-Dialog';
const INPUT_BOOLEAN_DIALOG_CLASS = 'jp-Input-Boolean-Dialog';
/**
 * Namespace for input dialogs
 */
var InputDialog;
(function (InputDialog) {
    /**
     * Create and show a input dialog for a boolean.
     *
     * @param options - The dialog setup options.
     *
     * @returns A promise that resolves with whether the dialog was accepted
     */
    function getBoolean(options) {
        return (0,_dialog__WEBPACK_IMPORTED_MODULE_1__.showDialog)(Object.assign(Object.assign({}, options), { body: new InputBooleanDialog(options), buttons: [
                _dialog__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton({ label: options.cancelLabel }),
                _dialog__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: options.okLabel })
            ], focusNodeSelector: 'input' }));
    }
    InputDialog.getBoolean = getBoolean;
    /**
     * Create and show a input dialog for a number.
     *
     * @param options - The dialog setup options.
     *
     * @returns A promise that resolves with whether the dialog was accepted
     */
    function getNumber(options) {
        return (0,_dialog__WEBPACK_IMPORTED_MODULE_1__.showDialog)(Object.assign(Object.assign({}, options), { body: new InputNumberDialog(options), buttons: [
                _dialog__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton({ label: options.cancelLabel }),
                _dialog__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: options.okLabel })
            ], focusNodeSelector: 'input' }));
    }
    InputDialog.getNumber = getNumber;
    /**
     * Create and show a input dialog for a choice.
     *
     * @param options - The dialog setup options.
     *
     * @returns A promise that resolves with whether the dialog was accepted
     */
    function getItem(options) {
        return (0,_dialog__WEBPACK_IMPORTED_MODULE_1__.showDialog)(Object.assign(Object.assign({}, options), { body: new InputItemsDialog(options), buttons: [
                _dialog__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton({ label: options.cancelLabel }),
                _dialog__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: options.okLabel })
            ], focusNodeSelector: options.editable ? 'input' : 'select' }));
    }
    InputDialog.getItem = getItem;
    /**
     * Create and show a input dialog for a text.
     *
     * @param options - The dialog setup options.
     *
     * @returns A promise that resolves with whether the dialog was accepted
     */
    function getText(options) {
        return (0,_dialog__WEBPACK_IMPORTED_MODULE_1__.showDialog)(Object.assign(Object.assign({}, options), { body: new InputTextDialog(options), buttons: [
                _dialog__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton({ label: options.cancelLabel }),
                _dialog__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: options.okLabel })
            ], focusNodeSelector: 'input' }));
    }
    InputDialog.getText = getText;
    /**
     * Create and show a input dialog for a password.
     *
     * @param options - The dialog setup options.
     *
     * @returns A promise that resolves with whether the dialog was accepted
     */
    function getPassword(options) {
        return (0,_dialog__WEBPACK_IMPORTED_MODULE_1__.showDialog)(Object.assign(Object.assign({}, options), { body: new InputPasswordDialog(options), buttons: [
                _dialog__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton({ label: options.cancelLabel }),
                _dialog__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: options.okLabel })
            ], focusNodeSelector: 'input' }));
    }
    InputDialog.getPassword = getPassword;
})(InputDialog || (InputDialog = {}));
/**
 * Base widget for input dialog body
 */
class InputDialogBase extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    /**
     * InputDialog constructor
     *
     * @param label Input field label
     */
    constructor(label) {
        super();
        this.addClass(INPUT_DIALOG_CLASS);
        this._input = document.createElement('input');
        this._input.classList.add('jp-mod-styled');
        this._input.id = 'jp-dialog-input-id';
        if (label !== undefined) {
            const labelElement = document.createElement('label');
            labelElement.textContent = label;
            labelElement.htmlFor = this._input.id;
            // Initialize the node
            this.node.appendChild(labelElement);
        }
        this.node.appendChild(this._input);
    }
}
/**
 * Widget body for input boolean dialog
 */
class InputBooleanDialog extends InputDialogBase {
    /**
     * InputBooleanDialog constructor
     *
     * @param options Constructor options
     */
    constructor(options) {
        super(options.label);
        this.addClass(INPUT_BOOLEAN_DIALOG_CLASS);
        this._input.type = 'checkbox';
        this._input.checked = options.value ? true : false;
    }
    /**
     * Get the text specified by the user
     */
    getValue() {
        return this._input.checked;
    }
}
/**
 * Widget body for input number dialog
 */
class InputNumberDialog extends InputDialogBase {
    /**
     * InputNumberDialog constructor
     *
     * @param options Constructor options
     */
    constructor(options) {
        super(options.label);
        this._input.type = 'number';
        this._input.value = options.value ? options.value.toString() : '0';
    }
    /**
     * Get the number specified by the user.
     */
    getValue() {
        if (this._input.value) {
            return Number(this._input.value);
        }
        else {
            return Number.NaN;
        }
    }
}
/**
 * Widget body for input text dialog
 */
class InputTextDialog extends InputDialogBase {
    /**
     * InputTextDialog constructor
     *
     * @param options Constructor options
     */
    constructor(options) {
        super(options.label);
        this._input.type = 'text';
        this._input.value = options.text ? options.text : '';
        if (options.placeholder) {
            this._input.placeholder = options.placeholder;
        }
    }
    /**
     * Get the text specified by the user
     */
    getValue() {
        return this._input.value;
    }
}
/**
 * Widget body for input password dialog
 */
class InputPasswordDialog extends InputDialogBase {
    /**
     * InputPasswordDialog constructor
     *
     * @param options Constructor options
     */
    constructor(options) {
        super(options.label);
        this._input.type = 'password';
        this._input.value = options.text ? options.text : '';
        if (options.placeholder) {
            this._input.placeholder = options.placeholder;
        }
    }
    /**
     * Get the text specified by the user
     */
    getValue() {
        return this._input.value;
    }
}
/**
 * Widget body for input list dialog
 */
class InputItemsDialog extends InputDialogBase {
    /**
     * InputItemsDialog constructor
     *
     * @param options Constructor options
     */
    constructor(options) {
        super(options.label);
        this._editable = options.editable || false;
        let current = options.current || 0;
        let defaultIndex;
        if (typeof current === 'number') {
            defaultIndex = Math.max(0, Math.min(current, options.items.length - 1));
            current = '';
        }
        this._list = document.createElement('select');
        options.items.forEach((item, index) => {
            const option = document.createElement('option');
            if (index === defaultIndex) {
                option.selected = true;
                current = item;
            }
            option.value = item;
            option.textContent = item;
            this._list.appendChild(option);
        });
        if (options.editable) {
            /* Use of list and datalist */
            const data = document.createElement('datalist');
            data.id = 'input-dialog-items';
            data.appendChild(this._list);
            this._input.type = 'list';
            this._input.value = current;
            this._input.setAttribute('list', data.id);
            if (options.placeholder) {
                this._input.placeholder = options.placeholder;
            }
            this.node.appendChild(data);
        }
        else {
            /* Use select directly */
            this._input.remove();
            this.node.appendChild(_styling__WEBPACK_IMPORTED_MODULE_2__.Styling.wrapSelect(this._list));
        }
    }
    /**
     * Get the user choice
     */
    getValue() {
        if (this._editable) {
            return this._input.value;
        }
        else {
            return this._list.value;
        }
    }
}
//# sourceMappingURL=inputdialog.js.map

/***/ }),

/***/ "../../packages/apputils/lib/kernelstatuses.js":
/*!*****************************************************!*\
  !*** ../../packages/apputils/lib/kernelstatuses.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "translateKernelStatuses": () => (/* binding */ translateKernelStatuses)
/* harmony export */ });
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Helper function to translate kernel statuses mapping by using
 * input translator.
 *
 * @param translator - - Language translator.
 * @return The translated kernel status mapping.
 */
function translateKernelStatuses(translator) {
    translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator;
    const trans = translator.load('jupyterlab');
    const translated = {
        unknown: trans.__('Unknown'),
        starting: trans.__('Starting'),
        idle: trans.__('Idle'),
        busy: trans.__('Busy'),
        terminating: trans.__('Terminating'),
        restarting: trans.__('Restarting'),
        autorestarting: trans.__('Autorestarting'),
        dead: trans.__('Dead'),
        connected: trans.__('Connected'),
        connecting: trans.__('Connecting'),
        disconnected: trans.__('Disconnected'),
        initializing: trans.__('Initializing'),
        '': ''
    };
    return translated;
}
//# sourceMappingURL=kernelstatuses.js.map

/***/ }),

/***/ "../../packages/apputils/lib/mainareawidget.js":
/*!*****************************************************!*\
  !*** ../../packages/apputils/lib/mainareawidget.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainAreaWidget": () => (/* binding */ MainAreaWidget)
/* harmony export */ });
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/messaging */ "webpack/sharing/consume/default/@lumino/messaging/@lumino/messaging?790d");
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_messaging__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _domutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./domutils */ "../../packages/apputils/lib/domutils.js");
/* harmony import */ var _printing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./printing */ "../../packages/apputils/lib/printing.js");
/* harmony import */ var _spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./spinner */ "../../packages/apputils/lib/spinner.js");
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toolbar */ "../../packages/apputils/lib/toolbar/widget.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







/**
 * A flag to indicate that event handlers are caught in the capture phase.
 */
const USE_CAPTURE = true;
/**
 * A widget meant to be contained in the JupyterLab main area.
 *
 * #### Notes
 * Mirrors all of the `title` attributes of the content.
 * This widget is `closable` by default.
 * This widget is automatically disposed when closed.
 * This widget ensures its own focus when activated.
 */
class MainAreaWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget {
    /**
     * Construct a new main area widget.
     *
     * @param options - The options for initializing the widget.
     */
    constructor(options) {
        super(options);
        this._changeGuard = false;
        this._spinner = new _spinner__WEBPACK_IMPORTED_MODULE_3__.Spinner();
        this._isRevealed = false;
        this._evtMouseDown = () => {
            if (!this.node.contains(document.activeElement)) {
                this._focusContent();
            }
        };
        this.addClass('jp-MainAreaWidget');
        // Set contain=strict to avoid many forced layout rendering while adding cells.
        // Don't forget to remove the CSS class when your remove the spinner to allow
        // the content to be rendered.
        // @see https://github.com/jupyterlab/jupyterlab/issues/9381
        this.addClass('jp-MainAreaWidget-ContainStrict');
        this.id = _domutils__WEBPACK_IMPORTED_MODULE_4__.DOMUtils.createDomID();
        const trans = (options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator).load('jupyterlab');
        const content = (this._content = options.content);
        content.node.setAttribute('role', 'region');
        content.node.setAttribute('aria-label', trans.__('notebook content'));
        const toolbar = (this._toolbar = options.toolbar || new _toolbar__WEBPACK_IMPORTED_MODULE_5__.ReactiveToolbar());
        toolbar.node.setAttribute('role', 'navigation');
        toolbar.node.setAttribute('aria-label', trans.__('notebook actions'));
        const contentHeader = (this._contentHeader =
            options.contentHeader ||
                new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.BoxPanel({
                    direction: 'top-to-bottom',
                    spacing: 0
                }));
        const layout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.BoxLayout({ spacing: 0 }));
        layout.direction = 'top-to-bottom';
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.BoxLayout.setStretch(toolbar, 0);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.BoxLayout.setStretch(contentHeader, 0);
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.BoxLayout.setStretch(content, 1);
        layout.addWidget(toolbar);
        layout.addWidget(contentHeader);
        layout.addWidget(content);
        if (!content.id) {
            content.id = _domutils__WEBPACK_IMPORTED_MODULE_4__.DOMUtils.createDomID();
        }
        content.node.tabIndex = 0;
        this._updateTitle();
        content.title.changed.connect(this._updateTitle, this);
        this.title.closable = true;
        this.title.changed.connect(this._updateContentTitle, this);
        if (options.reveal) {
            this.node.appendChild(this._spinner.node);
            this._revealed = options.reveal
                .then(() => {
                if (content.isDisposed) {
                    this.dispose();
                    return;
                }
                content.disposed.connect(() => this.dispose());
                const active = document.activeElement === this._spinner.node;
                this._disposeSpinner();
                this._isRevealed = true;
                if (active) {
                    this._focusContent();
                }
            })
                .catch(e => {
                // Show a revealed promise error.
                const error = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget();
                error.addClass('jp-MainAreaWidget-error');
                // Show the error to the user.
                const pre = document.createElement('pre');
                pre.textContent = String(e);
                error.node.appendChild(pre);
                _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.BoxLayout.setStretch(error, 1);
                this._disposeSpinner();
                content.dispose();
                this._content = null;
                toolbar.dispose();
                this._toolbar = null;
                layout.addWidget(error);
                this._isRevealed = true;
                throw error;
            });
        }
        else {
            // Handle no reveal promise.
            this._spinner.dispose();
            this.removeClass('jp-MainAreaWidget-ContainStrict');
            content.disposed.connect(() => this.dispose());
            this._isRevealed = true;
            this._revealed = Promise.resolve(undefined);
        }
    }
    /**
     * Print method. Deferred to content.
     */
    [_printing__WEBPACK_IMPORTED_MODULE_6__.Printing.symbol]() {
        if (!this._content) {
            return null;
        }
        return _printing__WEBPACK_IMPORTED_MODULE_6__.Printing.getPrintFunction(this._content);
    }
    /**
     * The content hosted by the widget.
     */
    get content() {
        return this._content;
    }
    /**
     * The toolbar hosted by the widget.
     */
    get toolbar() {
        return this._toolbar;
    }
    /**
     * A panel for widgets that sit between the toolbar and the content.
     * Imagine a formatting toolbar, notification headers, etc.
     */
    get contentHeader() {
        return this._contentHeader;
    }
    /**
     * Whether the content widget or an error is revealed.
     */
    get isRevealed() {
        return this._isRevealed;
    }
    /**
     * A promise that resolves when the widget is revealed.
     */
    get revealed() {
        return this._revealed;
    }
    /**
     * Handle `'activate-request'` messages.
     */
    onActivateRequest(msg) {
        if (this._isRevealed) {
            this._focusContent();
        }
        else {
            this._spinner.node.focus();
        }
    }
    /**
     * Handle `after-attach` messages for the widget.
     */
    onAfterAttach(msg) {
        super.onAfterAttach(msg);
        // Focus content in capture phase to ensure relevant commands operate on the
        // current main area widget.
        // Add the event listener directly instead of using `handleEvent` in order
        // to save sub-classes from needing to reason about calling it as well.
        this.node.addEventListener('mousedown', this._evtMouseDown, USE_CAPTURE);
    }
    /**
     * Handle `before-detach` messages for the widget.
     */
    onBeforeDetach(msg) {
        this.node.removeEventListener('mousedown', this._evtMouseDown, USE_CAPTURE);
        super.onBeforeDetach(msg);
    }
    /**
     * Handle `'close-request'` messages.
     */
    onCloseRequest(msg) {
        this.dispose();
    }
    /**
     * Handle `'update-request'` messages by forwarding them to the content.
     */
    onUpdateRequest(msg) {
        if (this._content) {
            _lumino_messaging__WEBPACK_IMPORTED_MODULE_1__.MessageLoop.sendMessage(this._content, msg);
        }
    }
    _disposeSpinner() {
        this.node.removeChild(this._spinner.node);
        this._spinner.dispose();
        this.removeClass('jp-MainAreaWidget-ContainStrict');
    }
    /**
     * Update the title based on the attributes of the child widget.
     */
    _updateTitle() {
        if (this._changeGuard || !this.content) {
            return;
        }
        this._changeGuard = true;
        const content = this.content;
        this.title.label = content.title.label;
        this.title.mnemonic = content.title.mnemonic;
        this.title.icon = content.title.icon;
        this.title.iconClass = content.title.iconClass;
        this.title.iconLabel = content.title.iconLabel;
        this.title.caption = content.title.caption;
        this.title.className = content.title.className;
        this.title.dataset = content.title.dataset;
        this._changeGuard = false;
    }
    /**
     * Update the content title based on attributes of the main widget.
     */
    _updateContentTitle() {
        if (this._changeGuard || !this.content) {
            return;
        }
        this._changeGuard = true;
        const content = this.content;
        content.title.label = this.title.label;
        content.title.mnemonic = this.title.mnemonic;
        content.title.icon = this.title.icon;
        content.title.iconClass = this.title.iconClass;
        content.title.iconLabel = this.title.iconLabel;
        content.title.caption = this.title.caption;
        content.title.className = this.title.className;
        content.title.dataset = this.title.dataset;
        this._changeGuard = false;
    }
    /**
     * Give focus to the content.
     */
    _focusContent() {
        if (!this.content) {
            return;
        }
        // Focus the content node if we aren't already focused on it or a
        // descendent.
        if (!this.content.node.contains(document.activeElement)) {
            this.content.node.focus();
        }
        // Activate the content asynchronously (which may change the focus).
        this.content.activate();
    }
}
//# sourceMappingURL=mainareawidget.js.map

/***/ }),

/***/ "../../packages/apputils/lib/menufactory.js":
/*!**************************************************!*\
  !*** ../../packages/apputils/lib/menufactory.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MenuFactory": () => (/* binding */ MenuFactory)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__);
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
 * Helper functions to build a menu from the settings
 */
var MenuFactory;
(function (MenuFactory) {
    /**
     * Create menus from their description
     *
     * @param data Menubar description
     * @param menuFactory Factory for empty menu
     */
    function createMenus(data, menuFactory) {
        return data
            .filter(item => !item.disabled)
            .sort((a, b) => { var _a, _b; return ((_a = a.rank) !== null && _a !== void 0 ? _a : Infinity) - ((_b = b.rank) !== null && _b !== void 0 ? _b : Infinity); })
            .map(menuItem => {
            return dataToMenu(menuItem, menuFactory);
        });
    }
    MenuFactory.createMenus = createMenus;
    /**
     * Convert a menu description in a JupyterLabMenu object
     *
     * @param item Menu description
     * @param menuFactory Empty menu factory
     * @returns The menu widget
     */
    function dataToMenu(item, menuFactory) {
        var _a, _b;
        const menu = menuFactory(item);
        menu.id = item.id;
        // Set the label in case the menu factory did not.
        if (!menu.title.label) {
            menu.title.label = (_a = item.label) !== null && _a !== void 0 ? _a : _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.Text.titleCase(menu.id.trim());
        }
        if (item.icon) {
            menu.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.LabIcon.resolve({ icon: item.icon });
        }
        if (item.mnemonic !== undefined) {
            menu.title.mnemonic = item.mnemonic;
        }
        (_b = item.items) === null || _b === void 0 ? void 0 : _b.filter(item => !item.disabled).sort((a, b) => { var _a, _b; return ((_a = a.rank) !== null && _a !== void 0 ? _a : Infinity) - ((_b = b.rank) !== null && _b !== void 0 ? _b : Infinity); }).map(item => {
            addItem(item, menu, menuFactory);
        });
        return menu;
    }
    /**
     * Convert an item description in a context menu item object
     *
     * @param item Context menu item
     * @param menu Context menu to populate
     * @param menuFactory Empty menu factory
     */
    function addContextItem(item, menu, menuFactory) {
        const { submenu } = item, newItem = __rest(item, ["submenu"]);
        // Commands may not have been registered yet; so we don't force it to exist
        menu.addItem(Object.assign(Object.assign({}, newItem), { submenu: submenu ? dataToMenu(submenu, menuFactory) : null }));
    }
    MenuFactory.addContextItem = addContextItem;
    /**
     * Convert an item description in a menu item object
     *
     * @param item Menu item
     * @param menu Menu to populate
     * @param menuFactory Empty menu factory
     */
    function addItem(item, menu, menuFactory) {
        const { submenu } = item, newItem = __rest(item, ["submenu"]);
        // Commands may not have been registered yet; so we don't force it to exist
        menu.addItem(Object.assign(Object.assign({}, newItem), { submenu: submenu ? dataToMenu(submenu, menuFactory) : null }));
    }
    /**
     * Update an existing list of menu and returns
     * the new elements.
     *
     * #### Note
     * New elements are added to the current menu list.
     *
     * @param menus Current menus
     * @param data New description to take into account
     * @param menuFactory Empty menu factory
     * @returns Newly created menus
     */
    function updateMenus(menus, data, menuFactory) {
        const newMenus = [];
        data.forEach(item => {
            const menu = menus.find(menu => menu.id === item.id);
            if (menu) {
                mergeMenus(item, menu, menuFactory);
            }
            else {
                if (!item.disabled) {
                    newMenus.push(dataToMenu(item, menuFactory));
                }
            }
        });
        menus.push(...newMenus);
        return newMenus;
    }
    MenuFactory.updateMenus = updateMenus;
    function mergeMenus(item, menu, menuFactory) {
        var _a;
        if (item.disabled) {
            menu.dispose();
        }
        else {
            (_a = item.items) === null || _a === void 0 ? void 0 : _a.forEach(entry => {
                var _a, _b;
                const existingItem = menu === null || menu === void 0 ? void 0 : menu.items.find((i, idx) => {
                    var _a, _b, _c;
                    return i.type === entry.type &&
                        i.command === ((_a = entry.command) !== null && _a !== void 0 ? _a : '') &&
                        ((_b = i.submenu) === null || _b === void 0 ? void 0 : _b.id) === ((_c = entry.submenu) === null || _c === void 0 ? void 0 : _c.id);
                });
                if (existingItem && entry.type !== 'separator') {
                    if (entry.disabled) {
                        menu.removeItem(existingItem);
                    }
                    else {
                        switch ((_a = entry.type) !== null && _a !== void 0 ? _a : 'command') {
                            case 'command':
                                if (entry.command) {
                                    if (!_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.JSONExt.deepEqual(existingItem.args, (_b = entry.args) !== null && _b !== void 0 ? _b : {})) {
                                        addItem(entry, menu, menuFactory);
                                    }
                                }
                                break;
                            case 'submenu':
                                if (entry.submenu) {
                                    mergeMenus(entry.submenu, existingItem.submenu, menuFactory);
                                }
                        }
                    }
                }
                else {
                    addItem(entry, menu, menuFactory);
                }
            });
        }
    }
})(MenuFactory || (MenuFactory = {}));
//# sourceMappingURL=menufactory.js.map

/***/ }),

/***/ "../../packages/apputils/lib/printing.js":
/*!***********************************************!*\
  !*** ../../packages/apputils/lib/printing.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Printing": () => (/* binding */ Printing)
/* harmony export */ });
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * Any object is "printable" if it implements the `IPrintable` interface.
 *
 * To do this it, it must have a method called `Printing.symbol` which returns either a function
 * to print the object or null if it cannot be printed.
 *
 * One way of printing is to use the `printWidget` function, which creates a hidden iframe
 * and copies the DOM nodes from your widget to that iframe and printing just that iframe.
 *
 * Another way to print is to use the `printURL` function, which takes a URL and prints that page.
 */
var Printing;
(function (Printing) {
    /**
     * Symbol to use for a method that returns a function to print an object.
     */
    Printing.symbol = Symbol('printable');
    /**
     * Returns whether an object implements a print method.
     */
    function isPrintable(a) {
        if (typeof a !== 'object' || !a) {
            return false;
        }
        return Printing.symbol in a;
    }
    Printing.isPrintable = isPrintable;
    /**
     * Returns the print function for an object, or null if it does not provide a handler.
     */
    function getPrintFunction(val) {
        if (isPrintable(val)) {
            return val[Printing.symbol]();
        }
        return null;
    }
    Printing.getPrintFunction = getPrintFunction;
    /**
     * Prints a widget by copying it's DOM node
     * to a hidden iframe and printing that iframe.
     */
    function printWidget(widget) {
        return printContent(widget.node);
    }
    Printing.printWidget = printWidget;
    /**
     * Prints a URL by loading it into an iframe.
     *
     * @param url URL to load into an iframe.
     */
    async function printURL(url) {
        const settings = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__.ServerConnection.makeSettings();
        const text = await (await _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__.ServerConnection.makeRequest(url, {}, settings)).text();
        return printContent(text);
    }
    Printing.printURL = printURL;
    /**
     * Prints a URL or an element in an iframe and then removes the iframe after printing.
     */
    async function printContent(textOrEl) {
        const isText = typeof textOrEl === 'string';
        const iframe = createIFrame();
        const parent = window.document.body;
        parent.appendChild(iframe);
        if (isText) {
            iframe.srcdoc = textOrEl;
            await resolveWhenLoaded(iframe);
        }
        else {
            iframe.src = 'about:blank';
            await resolveWhenLoaded(iframe);
            setIFrameNode(iframe, textOrEl);
        }
        const printed = resolveAfterEvent();
        launchPrint(iframe.contentWindow);
        // Once the print dialog has been dismissed, we regain event handling,
        // and it should be safe to discard the hidden iframe.
        await printed;
        parent.removeChild(iframe);
    }
    /**
     * Creates a new hidden iframe and appends it to the document
     *
     * Modified from
     * https://github.com/joseluisq/printd/blob/eb7948d602583c055ab6dee3ee294b6a421da4b6/src/index.ts#L24
     */
    function createIFrame() {
        const el = window.document.createElement('iframe');
        // We need both allow-modals and allow-same-origin to be able to
        // call print in the iframe.
        // We intentionally do not allow scripts:
        // https://github.com/jupyterlab/jupyterlab/pull/5850#pullrequestreview-230899790
        el.setAttribute('sandbox', 'allow-modals allow-same-origin');
        const css = 'visibility:hidden;width:0;height:0;position:absolute;z-index:-9999;bottom:0;';
        el.setAttribute('style', css);
        el.setAttribute('width', '0');
        el.setAttribute('height', '0');
        return el;
    }
    /**
     * Copies a node from the base document to the iframe.
     */
    function setIFrameNode(iframe, node) {
        iframe.contentDocument.body.appendChild(node.cloneNode(true));
        iframe.contentDocument.close();
    }
    /**
     * Promise that resolves when all resources are loaded in the window.
     */
    function resolveWhenLoaded(iframe) {
        return new Promise(resolve => {
            iframe.onload = () => resolve();
        });
    }
    /**
     * A promise that resolves after the next mousedown, mousemove, or
     * keydown event. We use this as a proxy for determining when the
     * main window has regained control after the print dialog is removed.
     *
     * We can't use the usual window.onafterprint handler because we
     * disallow Javascript execution in the print iframe.
     */
    function resolveAfterEvent() {
        return new Promise(resolve => {
            const onEvent = () => {
                document.removeEventListener('mousemove', onEvent, true);
                document.removeEventListener('mousedown', onEvent, true);
                document.removeEventListener('keydown', onEvent, true);
                resolve();
            };
            document.addEventListener('mousemove', onEvent, true);
            document.addEventListener('mousedown', onEvent, true);
            document.addEventListener('keydown', onEvent, true);
        });
    }
    /**
     * Prints a content window.
     */
    function launchPrint(contentWindow) {
        const result = contentWindow.document.execCommand('print', false);
        // execCommand won't work in firefox so we call the `print` method instead if it fails
        // https://github.com/joseluisq/printd/blob/eb7948d602583c055ab6dee3ee294b6a421da4b6/src/index.ts#L148
        if (!result) {
            contentWindow.print();
        }
    }
})(Printing || (Printing = {}));
//# sourceMappingURL=printing.js.map

/***/ }),

/***/ "../../packages/apputils/lib/sanitizer.js":
/*!************************************************!*\
  !*** ../../packages/apputils/lib/sanitizer.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sanitizer": () => (/* binding */ Sanitizer),
/* harmony export */   "defaultSanitizer": () => (/* binding */ defaultSanitizer)
/* harmony export */ });
/* harmony import */ var sanitize_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sanitize-html */ "../../node_modules/sanitize-html/index.js");
/* harmony import */ var sanitize_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sanitize_html__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
// sanitize-html uses the url package, so we depend on a standalone version of
// it which acts as a polyfill for browsers.

/**
 * Helper class that contains regular expressions for inline CSS style validation.
 *
 * Which properties (and values) to allow is largely based on the Google Caja project:
 *   https://github.com/google/caja
 *
 * The regular expressions are largly based on the syntax definition found at
 * https://developer.mozilla.org/en-US/docs/Web/CSS.
 */
class CssProp {
    static reg(r) {
        return new RegExp('^' + r + '$', 'i');
    }
}
/*
 * Numeric base expressions used to help build more complex regular expressions
 */
CssProp.N = {
    integer: `[+-]?[0-9]+`,
    integer_pos: `[+]?[0-9]+`,
    integer_zero_ff: `([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])`,
    number: `[+-]?([0-9]*[.])?[0-9]+(e-?[0-9]*)?`,
    number_pos: `[+]?([0-9]*[.])?[0-9]+(e-?[0-9]*)?`,
    number_zero_hundred: `[+]?(([0-9]|[1-9][0-9])([.][0-9]+)?|100)`,
    number_zero_one: `[+]?(1([.][0]+)?|0?([.][0-9]+)?)`
};
/*
 * Base expressions of common CSS syntax elements
 */
CssProp.B = {
    angle: `(${CssProp.N.number}(deg|rad|grad|turn)|0)`,
    frequency: `${CssProp.N.number}(Hz|kHz)`,
    ident: String.raw `-?([_a-z]|[\xA0-\xFF]|\\[0-9a-f]{1,6}(\r\n|[ \t\r\n\f])?|\\[^\r\n\f0-9a-f])([_a-z0-9-]|[\xA0-\xFF]|\\[0-9a-f]{1,6}(\r\n|[ \t\r\n\f])?|\\[^\r\n\f0-9a-f])*`,
    len_or_perc: `(0|${CssProp.N.number}(px|em|rem|ex|in|cm|mm|pt|pc|%))`,
    length: `(${CssProp.N.number}(px|em|rem|ex|in|cm|mm|pt|pc)|0)`,
    length_pos: `(${CssProp.N.number_pos}(px|em|rem|ex|in|cm|mm|pt|pc)|0)`,
    percentage: `${CssProp.N.number}%`,
    percentage_pos: `${CssProp.N.number_pos}%`,
    percentage_zero_hundred: `${CssProp.N.number_zero_hundred}%`,
    string: String.raw `(\"([^\n\r\f\\"]|\\\n|\r\n|\r|\f|\\[0-9a-f]{1,6}(\r\n|[ \t\r\n\f])?|\\[^\r\n\f0-9a-f])*\")|(\'([^\n\r\f\\']|\\\n|\r\n|\r|\f|\\[0-9a-f]{1,6}(\r\n|[ \t\r\n\f])?|\\[^\r\n\f0-9a-f])*\')`,
    time: `${CssProp.N.number}(s|ms)`,
    url: `url\\(.*?\\)`,
    z_index: `[+-]?[0-9]{1,7}`
};
/*
 * Atomic (i.e. not dependant on other regular expressions) sub RegEx segments
 */
CssProp.A = {
    absolute_size: `xx-small|x-small|small|medium|large|x-large|xx-large`,
    attachment: `scroll|fixed|local`,
    bg_origin: `border-box|padding-box|content-box`,
    border_style: `none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset`,
    box: `border-box|padding-box|content-box`,
    display_inside: `auto|block|table|flex|grid`,
    display_outside: `block-level|inline-level|none|table-row-group|table-header-group|table-footer-group|table-row|table-cell|table-column-group|table-column|table-caption`,
    ending_shape: `circle|ellipse`,
    generic_family: `serif|sans-serif|cursive|fantasy|monospace`,
    generic_voice: `male|female|child`,
    relative_size: `smaller|larger`,
    repeat_style: `repeat-x|repeat-y|((?:repeat|space|round|no-repeat)(?:\\s*(?:repeat|space|round|no-repeat))?)`,
    side_or_corner: `(left|right)?\\s*(top|bottom)?`,
    single_animation_direction: `normal|reverse|alternate|alternate-reverse`,
    single_animation_fill_mode: `none|forwards|backwards|both`,
    single_animation_play_state: `running|paused`
};
/*
 * Color definition sub expressions
 */
CssProp._COLOR = {
    hex: `\\#(0x)?[0-9a-f]+`,
    name: `aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|transparent|violet|wheat|white|whitesmoke|yellow|yellowgreen`,
    rgb: String.raw `rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)`,
    rgba: String.raw `rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(${CssProp.N.integer_zero_ff}|${CssProp.N.number_zero_one}|${CssProp.B.percentage_zero_hundred})\s*\)`
};
/*
 * Compound (i.e. dependant on other (sub) regular expressions) sub RegEx segments
 */
CssProp._C = {
    alpha: `${CssProp.N.integer_zero_ff}|${CssProp.N.number_zero_one}|${CssProp.B.percentage_zero_hundred}`,
    alphavalue: CssProp.N.number_zero_one,
    bg_position: `((${CssProp.B.len_or_perc}|left|center|right|top|bottom)\\s*){1,4}`,
    bg_size: `(${CssProp.B.length_pos}|${CssProp.B.percentage}|auto){1,2}|cover|contain`,
    border_width: `thin|medium|thick|${CssProp.B.length}`,
    bottom: `${CssProp.B.length}|auto`,
    color: `${CssProp._COLOR.hex}|${CssProp._COLOR.rgb}|${CssProp._COLOR.rgba}|${CssProp._COLOR.name}`,
    color_stop_length: `(${CssProp.B.len_or_perc}\\s*){1,2}`,
    linear_color_hint: `${CssProp.B.len_or_perc}`,
    family_name: `${CssProp.B.string}|(${CssProp.B.ident}\\s*)+`,
    image_decl: CssProp.B.url,
    left: `${CssProp.B.length}|auto`,
    loose_quotable_words: `(${CssProp.B.ident})+`,
    margin_width: `${CssProp.B.len_or_perc}|auto`,
    padding_width: `${CssProp.B.length_pos}|${CssProp.B.percentage_pos}`,
    page_url: CssProp.B.url,
    position: `((${CssProp.B.len_or_perc}|left|center|right|top|bottom)\\s*){1,4}`,
    right: `${CssProp.B.length}|auto`,
    shadow: '',
    size: `closest-side|farthest-side|closest-corner|farthest-corner|${CssProp.B.length}|(${CssProp.B.len_or_perc})\\s+(${CssProp.B.len_or_perc})`,
    top: `${CssProp.B.length}|auto`
};
CssProp._C1 = {
    image_list: `image\\(\\s*(${CssProp.B.url})*\\s*(${CssProp.B.url}|${CssProp._C.color})\\s*\\)`,
    linear_color_stop: `(${CssProp._C.color})(\\s*${CssProp._C.color_stop_length})?`,
    shadow: `((${CssProp._C.color})\\s+((${CssProp.B.length})\\s*){2,4}(\s+inset)?)|((inset\\s+)?((${CssProp.B.length})\\s*){2,4}\\s*(${CssProp._C.color})?)`
};
CssProp._C2 = {
    color_stop_list: `((${CssProp._C1.linear_color_stop})(\\s*(${CssProp._C.linear_color_hint}))?\\s*,\\s*)+(${CssProp._C1.linear_color_stop})`,
    shape: `rect\\(\\s*(${CssProp._C.top})\\s*,\\s*(${CssProp._C.right})\\s*,\\s*(${CssProp._C.bottom})\\s*,\\s*(${CssProp._C.left})\\s*\\)`
};
CssProp._C3 = {
    linear_gradient: `linear-gradient\\((((${CssProp.B.angle})|to\\s+(${CssProp.A.side_or_corner}))\\s*,\\s*)?\\s*(${CssProp._C2.color_stop_list})\\s*\\)`,
    radial_gradient: `radial-gradient\\(((((${CssProp.A.ending_shape})|(${CssProp._C.size}))\\s*)*\\s*(at\\s+${CssProp._C.position})?\\s*,\\s*)?\\s*(${CssProp._C2.color_stop_list})\\s*\\)`
};
CssProp._C4 = {
    image: `${CssProp.B.url}|${CssProp._C3.linear_gradient}|${CssProp._C3.radial_gradient}|${CssProp._C1.image_list}`,
    bg_image: `(${CssProp.B.url}|${CssProp._C3.linear_gradient}|${CssProp._C3.radial_gradient}|${CssProp._C1.image_list})|none`
};
CssProp.C = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, CssProp._C), CssProp._C1), CssProp._C2), CssProp._C3), CssProp._C4);
/*
 * Property value regular expressions not dependant on other sub expressions
 */
CssProp.AP = {
    border_collapse: `collapse|separate`,
    box: `normal|none|contents`,
    box_sizing: `content-box|padding-box|border-box`,
    caption_side: `top|bottom`,
    clear: `none|left|right|both`,
    direction: `ltr|rtl`,
    empty_cells: `show|hide`,
    float: `left|right|none`,
    font_stretch: `normal|wider|narrower|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded`,
    font_style: `normal|italic|oblique`,
    font_variant: `normal|small-caps`,
    font_weight: `normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900`,
    list_style_position: `inside|outside`,
    list_style_type: `disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-greek|lower-latin|upper-latin|armenian|georgian|lower-alpha|upper-alpha|none`,
    overflow: `visible|hidden|scroll|auto`,
    overflow_wrap: `normal|break-word`,
    overflow_x: `visible|hidden|scroll|auto|no-display|no-content`,
    page_break_after: `auto|always|avoid|left|right`,
    page_break_before: `auto|always|avoid|left|right`,
    page_break_inside: `avoid|auto`,
    position: `static|relative|absolute`,
    resize: `none|both|horizontal|vertical`,
    speak: `normal|none|spell-out`,
    speak_header: `once|always`,
    speak_numeral: `digits|continuous`,
    speak_punctuation: `code|none`,
    table_layout: `auto|fixed`,
    text_align: `left|right|center|justify`,
    text_decoration: `none|((underline|overline|line-through|blink)\\s*)+`,
    text_transform: `capitalize|uppercase|lowercase|none`,
    text_wrap: `normal|unrestricted|none|suppress`,
    unicode_bidi: `normal|embed|bidi-override`,
    visibility: `visible|hidden|collapse`,
    white_space: `normal|pre|nowrap|pre-wrap|pre-line`,
    word_break: `normal|keep-all|break-all`
};
/*
 * Compound propertiy value regular expressions (i.e. dependant on other sub expressions)
 */
CssProp._CP = {
    background_attachment: `${CssProp.A.attachment}(,\\s*${CssProp.A.attachment})*`,
    background_color: CssProp.C.color,
    background_origin: `${CssProp.A.box}(,\\s*${CssProp.A.box})*`,
    background_repeat: `${CssProp.A.repeat_style}(,\\s*${CssProp.A.repeat_style})*`,
    border: `((${CssProp.C.border_width}|${CssProp.A.border_style}|${CssProp.C.color})\\s*){1,3}`,
    border_radius: `((${CssProp.B.len_or_perc})\\s*){1,4}(\\/\\s*((${CssProp.B.len_or_perc})\\s*){1,4})?`,
    border_spacing: `${CssProp.B.length}\\s*(${CssProp.B.length})?`,
    border_top_color: CssProp.C.color,
    border_top_style: CssProp.A.border_style,
    border_width: `((${CssProp.C.border_width})\\s*){1,4}`,
    color: CssProp.C.color,
    cursor: `(${CssProp.B.url}(\\s*,\\s*)?)*(auto|crosshair|default|pointer|move|e-resize|ne-resize|nw-resize|n-resize|se-resize|sw-resize|s-resize|w-resize|text|wait|help|progress|all-scroll|col-resize|hand|no-drop|not-allowed|row-resize|vertical-text)`,
    display: `inline|block|list-item|run-in|inline-list-item|inline-block|table|inline-table|table-cell|table-caption|flex|inline-flex|grid|inline-grid|${CssProp.A.display_inside}|${CssProp.A.display_outside}|inherit|inline-box|inline-stack`,
    display_outside: CssProp.A.display_outside,
    elevation: `${CssProp.B.angle}|below|level|above|higher|lower`,
    font_family: `(${CssProp.C.family_name}|${CssProp.A.generic_family})(,\\s*(${CssProp.C.family_name}|${CssProp.A.generic_family}))*`,
    height: `${CssProp.B.length}|${CssProp.B.percentage}|auto`,
    letter_spacing: `normal|${CssProp.B.length}`,
    list_style_image: `${CssProp.C.image}|none`,
    margin_right: CssProp.C.margin_width,
    max_height: `${CssProp.B.length_pos}|${CssProp.B.percentage_pos}|none|auto`,
    min_height: `${CssProp.B.length_pos}|${CssProp.B.percentage_pos}|auto`,
    opacity: CssProp.C.alphavalue,
    outline_color: `${CssProp.C.color}|invert`,
    outline_width: CssProp.C.border_width,
    padding: `((${CssProp.C.padding_width})\\s*){1,4}`,
    padding_top: CssProp.C.padding_width,
    pitch_range: CssProp.N.number,
    right: `${CssProp.B.length}|${CssProp.B.percentage}|auto`,
    stress: CssProp.N.number,
    text_indent: `${CssProp.B.length}|${CssProp.B.percentage}`,
    text_shadow: `none|${CssProp.C.shadow}(,\\s*(${CssProp.C.shadow}))*`,
    volume: `${CssProp.N.number_pos}|${CssProp.B.percentage_pos}|silent|x-soft|soft|medium|loud|x-loud`,
    word_wrap: CssProp.AP.overflow_wrap,
    zoom: `normal|${CssProp.N.number_pos}|${CssProp.B.percentage_pos}`,
    backface_visibility: CssProp.AP.visibility,
    background_clip: `${CssProp.A.box}(,\\s*(${CssProp.A.box}))*`,
    background_position: `${CssProp.C.bg_position}(,\\s*(${CssProp.C.bg_position}))*`,
    border_bottom_color: CssProp.C.color,
    border_bottom_style: CssProp.A.border_style,
    border_color: `((${CssProp.C.color})\\s*){1,4}`,
    border_left_color: CssProp.C.color,
    border_right_color: CssProp.C.color,
    border_style: `((${CssProp.A.border_style})\\s*){1,4}`,
    border_top_left_radius: `(${CssProp.B.length}|${CssProp.B.percentage})(\\s*(${CssProp.B.length}|${CssProp.B.percentage}))?`,
    border_top_width: CssProp.C.border_width,
    box_shadow: `none|${CssProp.C.shadow}(,\\s*(${CssProp.C.shadow}))*`,
    clip: `${CssProp.C.shape}|auto`,
    display_inside: CssProp.A.display_inside,
    font_size: `${CssProp.A.absolute_size}|${CssProp.A.relative_size}|${CssProp.B.length_pos}|${CssProp.B.percentage_pos}`,
    line_height: `normal|${CssProp.N.number_pos}|${CssProp.B.length_pos}|${CssProp.B.percentage_pos}`,
    margin_left: CssProp.C.margin_width,
    max_width: `${CssProp.B.length_pos}|${CssProp.B.percentage_pos}|none|auto`,
    outline_style: CssProp.A.border_style,
    padding_bottom: CssProp.C.padding_width,
    padding_right: CssProp.C.padding_width,
    perspective: `none|${CssProp.B.length}`,
    richness: CssProp.N.number,
    text_overflow: `((clip|ellipsis|${CssProp.B.string})\\s*){1,2}`,
    top: `${CssProp.B.length}|${CssProp.B.percentage}|auto`,
    width: `${CssProp.B.length_pos}|${CssProp.B.percentage_pos}|auto`,
    z_index: `auto|${CssProp.B.z_index}`,
    // Simplified background
    background: `(((${CssProp.C.bg_position}\\s*(\\/\\s*${CssProp.C.bg_size})?)|(${CssProp.A.repeat_style})|(${CssProp.A.attachment})|(${CssProp.A.bg_origin})|(${CssProp.C.bg_image})|(${CssProp.C.color}))\\s*)+`,
    background_size: `${CssProp.C.bg_size}(,\\s*${CssProp.C.bg_size})*`,
    border_bottom_left_radius: `(${CssProp.B.length}|${CssProp.B.percentage})(\\s*(${CssProp.B.length}|${CssProp.B.percentage}))?`,
    border_bottom_width: CssProp.C.border_width,
    border_left_style: CssProp.A.border_style,
    border_right_style: CssProp.A.border_style,
    border_top: `((${CssProp.C.border_width}|${CssProp.A.border_style}|${CssProp.C.color})\\s*){1,3}`,
    bottom: `${CssProp.B.len_or_perc}|auto`,
    list_style: `((${CssProp.AP.list_style_type}|${CssProp.AP.list_style_position}|${CssProp.C.image}|none})\\s*){1,3}`,
    margin_top: CssProp.C.margin_width,
    outline: `((${CssProp.C.color}|invert|${CssProp.A.border_style}|${CssProp.C.border_width})\\s*){1,3}`,
    overflow_y: CssProp.AP.overflow_x,
    pitch: `${CssProp.B.frequency}|x-low|low|medium|high|x-high`,
    vertical_align: `baseline|sub|super|top|text-top|middle|bottom|text-bottom|${CssProp.B.len_or_perc}`,
    word_spacing: `normal|${CssProp.B.length}`,
    background_image: `${CssProp.C.bg_image}(,\\s*${CssProp.C.bg_image})*`,
    border_bottom_right_radius: `(${CssProp.B.length}|${CssProp.B.percentage})(\\s*(${CssProp.B.length}|${CssProp.B.percentage}))?`,
    border_left_width: CssProp.C.border_width,
    border_right_width: CssProp.C.border_width,
    left: `${CssProp.B.len_or_perc}|auto`,
    margin_bottom: CssProp.C.margin_width,
    pause_after: `${CssProp.B.time}|${CssProp.B.percentage}`,
    speech_rate: `${CssProp.N.number}|x-slow|slow|medium|fast|x-fast|faster|slower`,
    transition_duration: `${CssProp.B.time}(,\\s*${CssProp.B.time})*`,
    border_bottom: `((${CssProp.C.border_width}|${CssProp.A.border_style}|${CssProp.C.color})\\s*){1,3}`,
    border_right: `((${CssProp.C.border_width}|${CssProp.A.border_style}|${CssProp.C.color})\\s*){1,3}`,
    margin: `((${CssProp.C.margin_width})\\s*){1,4}`,
    padding_left: CssProp.C.padding_width,
    border_left: `((${CssProp.C.border_width}|${CssProp.A.border_style}|${CssProp.C.color})\\s*){1,3}`,
    quotes: `(${CssProp.B.string}\\s*${CssProp.B.string})+|none`,
    border_top_right_radius: `(${CssProp.B.length}|${CssProp.B.percentage})(\\s*(${CssProp.B.length}|${CssProp.B.percentage}))?`,
    min_width: `${CssProp.B.length_pos}|${CssProp.B.percentage_pos}|auto`
};
CssProp._CP1 = {
    font: `(((((${CssProp.AP.font_style}|${CssProp.AP.font_variant}|${CssProp.AP.font_weight})\\s*){1,3})?\\s*(${CssProp._CP.font_size})\\s*(\\/\\s*(${CssProp._CP.line_height}))?\\s+(${CssProp._CP.font_family}))|caption|icon|menu|message-box|small-caption|status-bar)`
};
CssProp.CP = Object.assign(Object.assign({}, CssProp._CP), CssProp._CP1);
// CSS Property value validation regular expressions for use with sanitize-html
CssProp.BORDER_COLLAPSE = CssProp.reg(CssProp.AP.border_collapse);
CssProp.BOX = CssProp.reg(CssProp.AP.box);
CssProp.BOX_SIZING = CssProp.reg(CssProp.AP.box_sizing);
CssProp.CAPTION_SIDE = CssProp.reg(CssProp.AP.caption_side);
CssProp.CLEAR = CssProp.reg(CssProp.AP.clear);
CssProp.DIRECTION = CssProp.reg(CssProp.AP.direction);
CssProp.EMPTY_CELLS = CssProp.reg(CssProp.AP.empty_cells);
CssProp.FLOAT = CssProp.reg(CssProp.AP.float);
CssProp.FONT_STRETCH = CssProp.reg(CssProp.AP.font_stretch);
CssProp.FONT_STYLE = CssProp.reg(CssProp.AP.font_style);
CssProp.FONT_VARIANT = CssProp.reg(CssProp.AP.font_variant);
CssProp.FONT_WEIGHT = CssProp.reg(CssProp.AP.font_weight);
CssProp.LIST_STYLE_POSITION = CssProp.reg(CssProp.AP.list_style_position);
CssProp.LIST_STYLE_TYPE = CssProp.reg(CssProp.AP.list_style_type);
CssProp.OVERFLOW = CssProp.reg(CssProp.AP.overflow);
CssProp.OVERFLOW_WRAP = CssProp.reg(CssProp.AP.overflow_wrap);
CssProp.OVERFLOW_X = CssProp.reg(CssProp.AP.overflow_x);
CssProp.PAGE_BREAK_AFTER = CssProp.reg(CssProp.AP.page_break_after);
CssProp.PAGE_BREAK_BEFORE = CssProp.reg(CssProp.AP.page_break_before);
CssProp.PAGE_BREAK_INSIDE = CssProp.reg(CssProp.AP.page_break_inside);
CssProp.POSITION = CssProp.reg(CssProp.AP.position);
CssProp.RESIZE = CssProp.reg(CssProp.AP.resize);
CssProp.SPEAK = CssProp.reg(CssProp.AP.speak);
CssProp.SPEAK_HEADER = CssProp.reg(CssProp.AP.speak_header);
CssProp.SPEAK_NUMERAL = CssProp.reg(CssProp.AP.speak_numeral);
CssProp.SPEAK_PUNCTUATION = CssProp.reg(CssProp.AP.speak_punctuation);
CssProp.TABLE_LAYOUT = CssProp.reg(CssProp.AP.table_layout);
CssProp.TEXT_ALIGN = CssProp.reg(CssProp.AP.text_align);
CssProp.TEXT_DECORATION = CssProp.reg(CssProp.AP.text_decoration);
CssProp.TEXT_TRANSFORM = CssProp.reg(CssProp.AP.text_transform);
CssProp.TEXT_WRAP = CssProp.reg(CssProp.AP.text_wrap);
CssProp.UNICODE_BIDI = CssProp.reg(CssProp.AP.unicode_bidi);
CssProp.VISIBILITY = CssProp.reg(CssProp.AP.visibility);
CssProp.WHITE_SPACE = CssProp.reg(CssProp.AP.white_space);
CssProp.WORD_BREAK = CssProp.reg(CssProp.AP.word_break);
CssProp.BACKGROUND_ATTACHMENT = CssProp.reg(CssProp.CP.background_attachment);
CssProp.BACKGROUND_COLOR = CssProp.reg(CssProp.CP.background_color);
CssProp.BACKGROUND_ORIGIN = CssProp.reg(CssProp.CP.background_origin);
CssProp.BACKGROUND_REPEAT = CssProp.reg(CssProp.CP.background_repeat);
CssProp.BORDER = CssProp.reg(CssProp.CP.border);
CssProp.BORDER_RADIUS = CssProp.reg(CssProp.CP.border_radius);
CssProp.BORDER_SPACING = CssProp.reg(CssProp.CP.border_spacing);
CssProp.BORDER_TOP_COLOR = CssProp.reg(CssProp.CP.border_top_color);
CssProp.BORDER_TOP_STYLE = CssProp.reg(CssProp.CP.border_top_style);
CssProp.BORDER_WIDTH = CssProp.reg(CssProp.CP.border_width);
CssProp.COLOR = CssProp.reg(CssProp.CP.color);
CssProp.CURSOR = CssProp.reg(CssProp.CP.cursor);
CssProp.DISPLAY = CssProp.reg(CssProp.CP.display);
CssProp.DISPLAY_OUTSIDE = CssProp.reg(CssProp.CP.display_outside);
CssProp.ELEVATION = CssProp.reg(CssProp.CP.elevation);
CssProp.FONT_FAMILY = CssProp.reg(CssProp.CP.font_family);
CssProp.HEIGHT = CssProp.reg(CssProp.CP.height);
CssProp.LETTER_SPACING = CssProp.reg(CssProp.CP.letter_spacing);
CssProp.LIST_STYLE_IMAGE = CssProp.reg(CssProp.CP.list_style_image);
CssProp.MARGIN_RIGHT = CssProp.reg(CssProp.CP.margin_right);
CssProp.MAX_HEIGHT = CssProp.reg(CssProp.CP.max_height);
CssProp.MIN_HEIGHT = CssProp.reg(CssProp.CP.min_height);
CssProp.OPACITY = CssProp.reg(CssProp.CP.opacity);
CssProp.OUTLINE_COLOR = CssProp.reg(CssProp.CP.outline_color);
CssProp.OUTLINE_WIDTH = CssProp.reg(CssProp.CP.outline_width);
CssProp.PADDING = CssProp.reg(CssProp.CP.padding);
CssProp.PADDING_TOP = CssProp.reg(CssProp.CP.padding_top);
CssProp.PITCH_RANGE = CssProp.reg(CssProp.CP.pitch_range);
CssProp.RIGHT = CssProp.reg(CssProp.CP.right);
CssProp.STRESS = CssProp.reg(CssProp.CP.stress);
CssProp.TEXT_INDENT = CssProp.reg(CssProp.CP.text_indent);
CssProp.TEXT_SHADOW = CssProp.reg(CssProp.CP.text_shadow);
CssProp.VOLUME = CssProp.reg(CssProp.CP.volume);
CssProp.WORD_WRAP = CssProp.reg(CssProp.CP.word_wrap);
CssProp.ZOOM = CssProp.reg(CssProp.CP.zoom);
CssProp.BACKFACE_VISIBILITY = CssProp.reg(CssProp.CP.backface_visibility);
CssProp.BACKGROUND_CLIP = CssProp.reg(CssProp.CP.background_clip);
CssProp.BACKGROUND_POSITION = CssProp.reg(CssProp.CP.background_position);
CssProp.BORDER_BOTTOM_COLOR = CssProp.reg(CssProp.CP.border_bottom_color);
CssProp.BORDER_BOTTOM_STYLE = CssProp.reg(CssProp.CP.border_bottom_style);
CssProp.BORDER_COLOR = CssProp.reg(CssProp.CP.border_color);
CssProp.BORDER_LEFT_COLOR = CssProp.reg(CssProp.CP.border_left_color);
CssProp.BORDER_RIGHT_COLOR = CssProp.reg(CssProp.CP.border_right_color);
CssProp.BORDER_STYLE = CssProp.reg(CssProp.CP.border_style);
CssProp.BORDER_TOP_LEFT_RADIUS = CssProp.reg(CssProp.CP.border_top_left_radius);
CssProp.BORDER_TOP_WIDTH = CssProp.reg(CssProp.CP.border_top_width);
CssProp.BOX_SHADOW = CssProp.reg(CssProp.CP.box_shadow);
CssProp.CLIP = CssProp.reg(CssProp.CP.clip);
CssProp.DISPLAY_INSIDE = CssProp.reg(CssProp.CP.display_inside);
CssProp.FONT_SIZE = CssProp.reg(CssProp.CP.font_size);
CssProp.LINE_HEIGHT = CssProp.reg(CssProp.CP.line_height);
CssProp.MARGIN_LEFT = CssProp.reg(CssProp.CP.margin_left);
CssProp.MAX_WIDTH = CssProp.reg(CssProp.CP.max_width);
CssProp.OUTLINE_STYLE = CssProp.reg(CssProp.CP.outline_style);
CssProp.PADDING_BOTTOM = CssProp.reg(CssProp.CP.padding_bottom);
CssProp.PADDING_RIGHT = CssProp.reg(CssProp.CP.padding_right);
CssProp.PERSPECTIVE = CssProp.reg(CssProp.CP.perspective);
CssProp.RICHNESS = CssProp.reg(CssProp.CP.richness);
CssProp.TEXT_OVERFLOW = CssProp.reg(CssProp.CP.text_overflow);
CssProp.TOP = CssProp.reg(CssProp.CP.top);
CssProp.WIDTH = CssProp.reg(CssProp.CP.width);
CssProp.Z_INDEX = CssProp.reg(CssProp.CP.z_index);
CssProp.BACKGROUND = CssProp.reg(CssProp.CP.background);
CssProp.BACKGROUND_SIZE = CssProp.reg(CssProp.CP.background_size);
CssProp.BORDER_BOTTOM_LEFT_RADIUS = CssProp.reg(CssProp.CP.border_bottom_left_radius);
CssProp.BORDER_BOTTOM_WIDTH = CssProp.reg(CssProp.CP.border_bottom_width);
CssProp.BORDER_LEFT_STYLE = CssProp.reg(CssProp.CP.border_left_style);
CssProp.BORDER_RIGHT_STYLE = CssProp.reg(CssProp.CP.border_right_style);
CssProp.BORDER_TOP = CssProp.reg(CssProp.CP.border_top);
CssProp.BOTTOM = CssProp.reg(CssProp.CP.bottom);
CssProp.LIST_STYLE = CssProp.reg(CssProp.CP.list_style);
CssProp.MARGIN_TOP = CssProp.reg(CssProp.CP.margin_top);
CssProp.OUTLINE = CssProp.reg(CssProp.CP.outline);
CssProp.OVERFLOW_Y = CssProp.reg(CssProp.CP.overflow_y);
CssProp.PITCH = CssProp.reg(CssProp.CP.pitch);
CssProp.VERTICAL_ALIGN = CssProp.reg(CssProp.CP.vertical_align);
CssProp.WORD_SPACING = CssProp.reg(CssProp.CP.word_spacing);
CssProp.BACKGROUND_IMAGE = CssProp.reg(CssProp.CP.background_image);
CssProp.BORDER_BOTTOM_RIGHT_RADIUS = CssProp.reg(CssProp.CP.border_bottom_right_radius);
CssProp.BORDER_LEFT_WIDTH = CssProp.reg(CssProp.CP.border_left_width);
CssProp.BORDER_RIGHT_WIDTH = CssProp.reg(CssProp.CP.border_right_width);
CssProp.LEFT = CssProp.reg(CssProp.CP.left);
CssProp.MARGIN_BOTTOM = CssProp.reg(CssProp.CP.margin_bottom);
CssProp.PAUSE_AFTER = CssProp.reg(CssProp.CP.pause_after);
CssProp.SPEECH_RATE = CssProp.reg(CssProp.CP.speech_rate);
CssProp.TRANSITION_DURATION = CssProp.reg(CssProp.CP.transition_duration);
CssProp.BORDER_BOTTOM = CssProp.reg(CssProp.CP.border_bottom);
CssProp.BORDER_RIGHT = CssProp.reg(CssProp.CP.border_right);
CssProp.MARGIN = CssProp.reg(CssProp.CP.margin);
CssProp.PADDING_LEFT = CssProp.reg(CssProp.CP.padding_left);
CssProp.BORDER_LEFT = CssProp.reg(CssProp.CP.border_left);
CssProp.FONT = CssProp.reg(CssProp.CP.font);
CssProp.QUOTES = CssProp.reg(CssProp.CP.quotes);
CssProp.BORDER_TOP_RIGHT_RADIUS = CssProp.reg(CssProp.CP.border_top_right_radius);
CssProp.MIN_WIDTH = CssProp.reg(CssProp.CP.min_width);
/**
 * A class to sanitize HTML strings.
 */
class Sanitizer {
    constructor() {
        this._options = {
            // HTML tags that are allowed to be used. Tags were extracted from Google Caja
            allowedTags: [
                'a',
                'abbr',
                'acronym',
                'address',
                'area',
                'article',
                'aside',
                'audio',
                'b',
                'bdi',
                'bdo',
                'big',
                'blockquote',
                'br',
                'button',
                'canvas',
                'caption',
                'center',
                'cite',
                'code',
                'col',
                'colgroup',
                'colspan',
                'command',
                'data',
                'datalist',
                'dd',
                'del',
                'details',
                'dfn',
                'dir',
                'div',
                'dl',
                'dt',
                'em',
                'fieldset',
                'figcaption',
                'figure',
                'font',
                'footer',
                'form',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'header',
                'hgroup',
                'hr',
                'i',
                // 'iframe' is allowed by Google Caja, but disallowed by default by sanitize-html
                // , 'iframe'
                'img',
                'input',
                'ins',
                'kbd',
                'label',
                'legend',
                'li',
                'map',
                'mark',
                'menu',
                'meter',
                'nav',
                'nobr',
                'ol',
                'optgroup',
                'option',
                'output',
                'p',
                'pre',
                'progress',
                'q',
                'rowspan',
                's',
                'samp',
                'section',
                'select',
                'small',
                'source',
                'span',
                'strike',
                'strong',
                'sub',
                'summary',
                'sup',
                'table',
                'tbody',
                'td',
                'textarea',
                'tfoot',
                'th',
                'thead',
                'time',
                'tr',
                'track',
                'tt',
                'u',
                'ul',
                'var',
                'video',
                'wbr'
            ],
            // Attributes that HTML tags are allowed to have, extracted from Google Caja.
            // See https://github.com/jupyterlab/jupyterlab/issues/1812#issuecomment-285848435
            allowedAttributes: {
                '*': [
                    'class',
                    'dir',
                    'draggable',
                    'hidden',
                    'id',
                    'inert',
                    'itemprop',
                    'itemref',
                    'itemscope',
                    'lang',
                    'spellcheck',
                    'style',
                    'title',
                    'translate'
                ],
                // 'rel' and 'target' were *not* allowed by Google Caja
                a: [
                    'accesskey',
                    'coords',
                    'href',
                    'hreflang',
                    'name',
                    'rel',
                    'shape',
                    'tabindex',
                    'target',
                    'type'
                ],
                area: [
                    'accesskey',
                    'alt',
                    'coords',
                    'href',
                    'nohref',
                    'shape',
                    'tabindex'
                ],
                // 'autoplay' was *not* allowed by Google Caja
                audio: [
                    'autoplay',
                    'controls',
                    'loop',
                    'mediagroup',
                    'muted',
                    'preload',
                    'src'
                ],
                bdo: ['dir'],
                blockquote: ['cite'],
                br: ['clear'],
                button: [
                    'accesskey',
                    'data-commandlinker-args',
                    'data-commandlinker-command',
                    'disabled',
                    'name',
                    'tabindex',
                    'type',
                    'value'
                ],
                canvas: ['height', 'width'],
                caption: ['align'],
                col: ['align', 'char', 'charoff', 'span', 'valign', 'width'],
                colgroup: ['align', 'char', 'charoff', 'span', 'valign', 'width'],
                command: [
                    'checked',
                    'command',
                    'disabled',
                    'icon',
                    'label',
                    'radiogroup',
                    'type'
                ],
                data: ['value'],
                del: ['cite', 'datetime'],
                details: ['open'],
                dir: ['compact'],
                div: ['align'],
                dl: ['compact'],
                fieldset: ['disabled'],
                font: ['color', 'face', 'size'],
                form: [
                    'accept',
                    'autocomplete',
                    'enctype',
                    'method',
                    'name',
                    'novalidate'
                ],
                h1: ['align'],
                h2: ['align'],
                h3: ['align'],
                h4: ['align'],
                h5: ['align'],
                h6: ['align'],
                hr: ['align', 'noshade', 'size', 'width'],
                iframe: [
                    'align',
                    'frameborder',
                    'height',
                    'marginheight',
                    'marginwidth',
                    'width'
                ],
                img: [
                    'align',
                    'alt',
                    'border',
                    'height',
                    'hspace',
                    'ismap',
                    'name',
                    'src',
                    'usemap',
                    'vspace',
                    'width'
                ],
                input: [
                    'accept',
                    'accesskey',
                    'align',
                    'alt',
                    'autocomplete',
                    'checked',
                    'disabled',
                    'inputmode',
                    'ismap',
                    'list',
                    'max',
                    'maxlength',
                    'min',
                    'multiple',
                    'name',
                    'placeholder',
                    'readonly',
                    'required',
                    'size',
                    'src',
                    'step',
                    'tabindex',
                    'type',
                    'usemap',
                    'value'
                ],
                ins: ['cite', 'datetime'],
                label: ['accesskey', 'for'],
                legend: ['accesskey', 'align'],
                li: ['type', 'value'],
                map: ['name'],
                menu: ['compact', 'label', 'type'],
                meter: ['high', 'low', 'max', 'min', 'value'],
                ol: ['compact', 'reversed', 'start', 'type'],
                optgroup: ['disabled', 'label'],
                option: ['disabled', 'label', 'selected', 'value'],
                output: ['for', 'name'],
                p: ['align'],
                pre: ['width'],
                progress: ['max', 'min', 'value'],
                q: ['cite'],
                select: [
                    'autocomplete',
                    'disabled',
                    'multiple',
                    'name',
                    'required',
                    'size',
                    'tabindex'
                ],
                source: ['type'],
                table: [
                    'align',
                    'bgcolor',
                    'border',
                    'cellpadding',
                    'cellspacing',
                    'frame',
                    'rules',
                    'summary',
                    'width'
                ],
                tbody: ['align', 'char', 'charoff', 'valign'],
                td: [
                    'abbr',
                    'align',
                    'axis',
                    'bgcolor',
                    'char',
                    'charoff',
                    'colspan',
                    'headers',
                    'height',
                    'nowrap',
                    'rowspan',
                    'scope',
                    'valign',
                    'width'
                ],
                textarea: [
                    'accesskey',
                    'autocomplete',
                    'cols',
                    'disabled',
                    'inputmode',
                    'name',
                    'placeholder',
                    'readonly',
                    'required',
                    'rows',
                    'tabindex',
                    'wrap'
                ],
                tfoot: ['align', 'char', 'charoff', 'valign'],
                th: [
                    'abbr',
                    'align',
                    'axis',
                    'bgcolor',
                    'char',
                    'charoff',
                    'colspan',
                    'headers',
                    'height',
                    'nowrap',
                    'rowspan',
                    'scope',
                    'valign',
                    'width'
                ],
                thead: ['align', 'char', 'charoff', 'valign'],
                tr: ['align', 'bgcolor', 'char', 'charoff', 'valign'],
                track: ['default', 'kind', 'label', 'srclang'],
                ul: ['compact', 'type'],
                video: [
                    'autoplay',
                    'controls',
                    'height',
                    'loop',
                    'mediagroup',
                    'muted',
                    'poster',
                    'preload',
                    'src',
                    'width'
                ]
            },
            // Inline CSS styles that HTML tags may have (and their allowed values)
            allowedStyles: {
                // To simplify the data, all styles are allowed on all tags that allow the style attribute
                '*': {
                    'backface-visibility': [CssProp.BACKFACE_VISIBILITY],
                    background: [CssProp.BACKGROUND],
                    'background-attachment': [CssProp.BACKGROUND_ATTACHMENT],
                    'background-clip': [CssProp.BACKGROUND_CLIP],
                    'background-color': [CssProp.BACKGROUND_COLOR],
                    'background-image': [CssProp.BACKGROUND_IMAGE],
                    'background-origin': [CssProp.BACKGROUND_ORIGIN],
                    'background-position': [CssProp.BACKGROUND_POSITION],
                    'background-repeat': [CssProp.BACKGROUND_REPEAT],
                    'background-size': [CssProp.BACKGROUND_SIZE],
                    border: [CssProp.BORDER],
                    'border-bottom': [CssProp.BORDER_BOTTOM],
                    'border-bottom-color': [CssProp.BORDER_BOTTOM_COLOR],
                    'border-bottom-left-radius': [CssProp.BORDER_BOTTOM_LEFT_RADIUS],
                    'border-bottom-right-radius': [CssProp.BORDER_BOTTOM_RIGHT_RADIUS],
                    'border-bottom-style': [CssProp.BORDER_BOTTOM_STYLE],
                    'border-bottom-width': [CssProp.BORDER_BOTTOM_WIDTH],
                    'border-collapse': [CssProp.BORDER_COLLAPSE],
                    'border-color': [CssProp.BORDER_COLOR],
                    'border-left': [CssProp.BORDER_LEFT],
                    'border-left-color': [CssProp.BORDER_LEFT_COLOR],
                    'border-left-style': [CssProp.BORDER_LEFT_STYLE],
                    'border-left-width': [CssProp.BORDER_LEFT_WIDTH],
                    'border-radius': [CssProp.BORDER_RADIUS],
                    'border-right': [CssProp.BORDER_RIGHT],
                    'border-right-color': [CssProp.BORDER_RIGHT_COLOR],
                    'border-right-style': [CssProp.BORDER_RIGHT_STYLE],
                    'border-right-width': [CssProp.BORDER_RIGHT_WIDTH],
                    'border-spacing': [CssProp.BORDER_SPACING],
                    'border-style': [CssProp.BORDER_STYLE],
                    'border-top': [CssProp.BORDER_TOP],
                    'border-top-color': [CssProp.BORDER_TOP_COLOR],
                    'border-top-left-radius': [CssProp.BORDER_TOP_LEFT_RADIUS],
                    'border-top-right-radius': [CssProp.BORDER_TOP_RIGHT_RADIUS],
                    'border-top-style': [CssProp.BORDER_TOP_STYLE],
                    'border-top-width': [CssProp.BORDER_TOP_WIDTH],
                    'border-width': [CssProp.BORDER_WIDTH],
                    bottom: [CssProp.BOTTOM],
                    box: [CssProp.BOX],
                    'box-shadow': [CssProp.BOX_SHADOW],
                    'box-sizing': [CssProp.BOX_SIZING],
                    'caption-side': [CssProp.CAPTION_SIDE],
                    clear: [CssProp.CLEAR],
                    clip: [CssProp.CLIP],
                    color: [CssProp.COLOR],
                    cursor: [CssProp.CURSOR],
                    direction: [CssProp.DIRECTION],
                    display: [CssProp.DISPLAY],
                    'display-inside': [CssProp.DISPLAY_INSIDE],
                    'display-outside': [CssProp.DISPLAY_OUTSIDE],
                    elevation: [CssProp.ELEVATION],
                    'empty-cells': [CssProp.EMPTY_CELLS],
                    float: [CssProp.FLOAT],
                    font: [CssProp.FONT],
                    'font-family': [CssProp.FONT_FAMILY],
                    'font-size': [CssProp.FONT_SIZE],
                    'font-stretch': [CssProp.FONT_STRETCH],
                    'font-style': [CssProp.FONT_STYLE],
                    'font-variant': [CssProp.FONT_VARIANT],
                    'font-weight': [CssProp.FONT_WEIGHT],
                    height: [CssProp.HEIGHT],
                    left: [CssProp.LEFT],
                    'letter-spacing': [CssProp.LETTER_SPACING],
                    'line-height': [CssProp.LINE_HEIGHT],
                    'list-style': [CssProp.LIST_STYLE],
                    'list-style-image': [CssProp.LIST_STYLE_IMAGE],
                    'list-style-position': [CssProp.LIST_STYLE_POSITION],
                    'list-style-type': [CssProp.LIST_STYLE_TYPE],
                    margin: [CssProp.MARGIN],
                    'margin-bottom': [CssProp.MARGIN_BOTTOM],
                    'margin-left': [CssProp.MARGIN_LEFT],
                    'margin-right': [CssProp.MARGIN_RIGHT],
                    'margin-top': [CssProp.MARGIN_TOP],
                    'max-height': [CssProp.MAX_HEIGHT],
                    'max-width': [CssProp.MAX_WIDTH],
                    'min-height': [CssProp.MIN_HEIGHT],
                    'min-width': [CssProp.MIN_WIDTH],
                    opacity: [CssProp.OPACITY],
                    outline: [CssProp.OUTLINE],
                    'outline-color': [CssProp.OUTLINE_COLOR],
                    'outline-style': [CssProp.OUTLINE_STYLE],
                    'outline-width': [CssProp.OUTLINE_WIDTH],
                    overflow: [CssProp.OVERFLOW],
                    'overflow-wrap': [CssProp.OVERFLOW_WRAP],
                    'overflow-x': [CssProp.OVERFLOW_X],
                    'overflow-y': [CssProp.OVERFLOW_Y],
                    padding: [CssProp.PADDING],
                    'padding-bottom': [CssProp.PADDING_BOTTOM],
                    'padding-left': [CssProp.PADDING_LEFT],
                    'padding-right': [CssProp.PADDING_RIGHT],
                    'padding-top': [CssProp.PADDING_TOP],
                    'page-break-after': [CssProp.PAGE_BREAK_AFTER],
                    'page-break-before': [CssProp.PAGE_BREAK_BEFORE],
                    'page-break-inside': [CssProp.PAGE_BREAK_INSIDE],
                    'pause-after': [CssProp.PAUSE_AFTER],
                    perspective: [CssProp.PERSPECTIVE],
                    pitch: [CssProp.PITCH],
                    'pitch-range': [CssProp.PITCH_RANGE],
                    position: [CssProp.POSITION],
                    quotes: [CssProp.QUOTES],
                    resize: [CssProp.RESIZE],
                    richness: [CssProp.RICHNESS],
                    right: [CssProp.RIGHT],
                    speak: [CssProp.SPEAK],
                    'speak-header': [CssProp.SPEAK_HEADER],
                    'speak-numeral': [CssProp.SPEAK_NUMERAL],
                    'speak-punctuation': [CssProp.SPEAK_PUNCTUATION],
                    'speech-rate': [CssProp.SPEECH_RATE],
                    stress: [CssProp.STRESS],
                    'table-layout': [CssProp.TABLE_LAYOUT],
                    'text-align': [CssProp.TEXT_ALIGN],
                    'text-decoration': [CssProp.TEXT_DECORATION],
                    'text-indent': [CssProp.TEXT_INDENT],
                    'text-overflow': [CssProp.TEXT_OVERFLOW],
                    'text-shadow': [CssProp.TEXT_SHADOW],
                    'text-transform': [CssProp.TEXT_TRANSFORM],
                    'text-wrap': [CssProp.TEXT_WRAP],
                    top: [CssProp.TOP],
                    'unicode-bidi': [CssProp.UNICODE_BIDI],
                    'vertical-align': [CssProp.VERTICAL_ALIGN],
                    visibility: [CssProp.VISIBILITY],
                    volume: [CssProp.VOLUME],
                    'white-space': [CssProp.WHITE_SPACE],
                    width: [CssProp.WIDTH],
                    'word-break': [CssProp.WORD_BREAK],
                    'word-spacing': [CssProp.WORD_SPACING],
                    'word-wrap': [CssProp.WORD_WRAP],
                    'z-index': [CssProp.Z_INDEX],
                    zoom: [CssProp.ZOOM]
                }
            },
            transformTags: {
                // Set the "rel" attribute for <a> tags to "nofollow".
                a: sanitize_html__WEBPACK_IMPORTED_MODULE_0___default().simpleTransform('a', { rel: 'nofollow' }),
                // Set the "disabled" attribute for <input> tags.
                input: sanitize_html__WEBPACK_IMPORTED_MODULE_0___default().simpleTransform('input', { disabled: 'disabled' })
            },
            allowedSchemesByTag: {
                // Allow 'attachment:' img src (used for markdown cell attachments).
                img: sanitize_html__WEBPACK_IMPORTED_MODULE_0___default().defaults.allowedSchemes.concat(['attachment'])
            },
            // Override of the default option, so we can skip 'src' attribute validation.
            // 'src' Attributes are validated to be URIs, which does not allow for embedded (image) data.
            // Since embedded data is no longer deemed to be a threat, validation can be skipped.
            // See https://github.com/jupyterlab/jupyterlab/issues/5183
            allowedSchemesAppliedToAttributes: ['href', 'cite']
        };
    }
    /**
     * Sanitize an HTML string.
     *
     * @param dirty - The dirty text.
     *
     * @param options - The optional sanitization options.
     *
     * @returns The sanitized string.
     */
    sanitize(dirty, options) {
        return sanitize_html__WEBPACK_IMPORTED_MODULE_0___default()(dirty, Object.assign(Object.assign({}, this._options), (options || {})));
    }
}
/**
 * The default instance of an `ISanitizer` meant for use by user code.
 */
const defaultSanitizer = new Sanitizer();
//# sourceMappingURL=sanitizer.js.map

/***/ }),

/***/ "../../packages/apputils/lib/search.js":
/*!*********************************************!*\
  !*** ../../packages/apputils/lib/search.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateFilterFunction": () => (/* binding */ updateFilterFunction),
/* harmony export */   "FilterBox": () => (/* binding */ FilterBox),
/* harmony export */   "FilenameSearcher": () => (/* binding */ FilenameSearcher)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _vdom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vdom */ "../../packages/apputils/lib/vdom.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.




/**
 * Perform a fuzzy search on a single item.
 */
function fuzzySearch(source, query) {
    // Set up the match score and indices array.
    let score = Infinity;
    let indices = null;
    // The regex for search word boundaries
    const rgx = /\b\w/g;
    let continueSearch = true;
    // Search the source by word boundary.
    while (continueSearch) {
        // Find the next word boundary in the source.
        let rgxMatch = rgx.exec(source);
        // Break if there is no more source context.
        if (!rgxMatch) {
            break;
        }
        // Run the string match on the relevant substring.
        let match = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__.StringExt.matchSumOfDeltas(source, query, rgxMatch.index);
        // Break if there is no match.
        if (!match) {
            break;
        }
        // Update the match if the score is better.
        if (match && match.score <= score) {
            score = match.score;
            indices = match.indices;
        }
    }
    // Bail if there was no match.
    if (!indices || score === Infinity) {
        return null;
    }
    // Handle a split match.
    return {
        score,
        indices
    };
}
const updateFilterFunction = (value, useFuzzyFilter, caseSensitive) => {
    return (item) => {
        if (useFuzzyFilter) {
            // Run the fuzzy search for the item and query.
            const query = value.toLowerCase();
            let score = fuzzySearch(item, query);
            // Ignore the item if it is not a match.
            if (!score) {
                return false;
            }
            return true;
        }
        if (!caseSensitive) {
            item = item.toLocaleLowerCase();
            value = value.toLocaleLowerCase();
        }
        const i = item.indexOf(value);
        if (i === -1) {
            return false;
        }
        return true;
    };
};
const FilterBox = (props) => {
    var _a;
    const [filter, setFilter] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)((_a = props.initialQuery) !== null && _a !== void 0 ? _a : '');
    if (props.forceRefresh) {
        (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
            props.updateFilter((item) => {
                return true;
            });
        }, []);
    }
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
        // If there is an initial search value, pass the parent the initial filter function for that value.
        if (props.initialQuery !== undefined) {
            props.updateFilter(updateFilterFunction(props.initialQuery, props.useFuzzyFilter, props.caseSensitive), props.initialQuery);
        }
    }, []);
    /**
     * Handler for search input changes.
     */
    const handleChange = (e) => {
        const target = e.target;
        setFilter(target.value);
        props.updateFilter(updateFilterFunction(target.value, props.useFuzzyFilter, props.caseSensitive), target.value);
    };
    return (react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.InputGroup, { type: "text", rightIcon: "ui-components:search", placeholder: props.placeholder, onChange: handleChange, className: "jp-FilterBox", value: filter }));
};
/**
 * A widget which hosts a input textbox to filter on file names.
 */
const FilenameSearcher = (props) => {
    return _vdom__WEBPACK_IMPORTED_MODULE_3__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_2___default().createElement(FilterBox, { updateFilter: props.updateFilter, useFuzzyFilter: props.useFuzzyFilter, placeholder: props.placeholder, forceRefresh: props.forceRefresh, caseSensitive: props.caseSensitive }));
};
//# sourceMappingURL=search.js.map

/***/ }),

/***/ "../../packages/apputils/lib/sessioncontext.js":
/*!*****************************************************!*\
  !*** ../../packages/apputils/lib/sessioncontext.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionContext": () => (/* binding */ SessionContext),
/* harmony export */   "sessionContextDialogs": () => (/* binding */ sessionContextDialogs)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dialog */ "../../packages/apputils/lib/dialog.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.








/**
 * The default implementation for a session context object.
 */
class SessionContext {
    /**
     * Construct a new session context.
     */
    constructor(options) {
        var _a, _b, _c, _d;
        this._path = '';
        this._name = '';
        this._type = '';
        this._prevKernelName = '';
        this._isDisposed = false;
        this._disposed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._session = null;
        this._ready = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.PromiseDelegate();
        this._initializing = false;
        this._initStarted = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.PromiseDelegate();
        this._initPromise = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.PromiseDelegate();
        this._isReady = false;
        this._isTerminating = false;
        this._isRestarting = false;
        this._kernelChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._sessionChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._statusChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._connectionStatusChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._pendingInput = false;
        this._iopubMessage = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._unhandledMessage = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._propertyChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._dialog = null;
        this._busyDisposable = null;
        this._pendingKernelName = '';
        this._pendingSessionRequest = '';
        this.sessionManager = options.sessionManager;
        this.specsManager = options.specsManager;
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this._path = (_a = options.path) !== null && _a !== void 0 ? _a : _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.UUID.uuid4();
        this._type = (_b = options.type) !== null && _b !== void 0 ? _b : '';
        this._name = (_c = options.name) !== null && _c !== void 0 ? _c : '';
        this._setBusy = options.setBusy;
        this._kernelPreference = (_d = options.kernelPreference) !== null && _d !== void 0 ? _d : {};
    }
    /**
     * The current session connection.
     */
    get session() {
        var _a;
        return (_a = this._session) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * The session path.
     *
     * #### Notes
     * Typically `.session.path` should be used. This attribute is useful if
     * there is no current session.
     */
    get path() {
        return this._path;
    }
    /**
     * The session type.
     *
     * #### Notes
     * Typically `.session.type` should be used. This attribute is useful if
     * there is no current session.
     */
    get type() {
        return this._type;
    }
    /**
     * The session name.
     *
     * #### Notes
     * Typically `.session.name` should be used. This attribute is useful if
     * there is no current session.
     */
    get name() {
        return this._name;
    }
    /**
     * A signal emitted when the kernel connection changes, proxied from the session connection.
     */
    get kernelChanged() {
        return this._kernelChanged;
    }
    /**
     * A signal emitted when the session connection changes.
     */
    get sessionChanged() {
        return this._sessionChanged;
    }
    /**
     * A signal emitted when the kernel status changes, proxied from the kernel.
     */
    get statusChanged() {
        return this._statusChanged;
    }
    /**
     * A flag indicating if the session has ending input, proxied from the kernel.
     */
    get pendingInput() {
        return this._pendingInput;
    }
    /**
     * A signal emitted when the kernel status changes, proxied from the kernel.
     */
    get connectionStatusChanged() {
        return this._connectionStatusChanged;
    }
    /**
     * A signal emitted for iopub kernel messages, proxied from the kernel.
     */
    get iopubMessage() {
        return this._iopubMessage;
    }
    /**
     * A signal emitted for an unhandled kernel message, proxied from the kernel.
     */
    get unhandledMessage() {
        return this._unhandledMessage;
    }
    /**
     * A signal emitted when a session property changes, proxied from the current session.
     */
    get propertyChanged() {
        return this._propertyChanged;
    }
    /**
     * The kernel preference of this client session.
     *
     * This is used when selecting a new kernel, and should reflect the sort of
     * kernel the activity prefers.
     */
    get kernelPreference() {
        return this._kernelPreference;
    }
    set kernelPreference(value) {
        this._kernelPreference = value;
    }
    /**
     * Whether the context is ready.
     */
    get isReady() {
        return this._isReady;
    }
    /**
     * A promise that is fulfilled when the context is ready.
     */
    get ready() {
        return this._ready.promise;
    }
    /**
     * Whether the context is terminating.
     */
    get isTerminating() {
        return this._isTerminating;
    }
    /**
     * Whether the context is restarting.
     */
    get isRestarting() {
        return this._isRestarting;
    }
    /**
     * Whether the kernel is "No Kernel" or not.
     *
     * #### Notes
     * As the displayed name is translated, this can be used directly.
     */
    get hasNoKernel() {
        return this.kernelDisplayName === this.noKernelName;
    }
    /**
     * The display name of the current kernel, or a sensible alternative.
     *
     * #### Notes
     * This is a convenience function to have a consistent sensible name for the
     * kernel.
     */
    get kernelDisplayName() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const kernel = (_a = this.session) === null || _a === void 0 ? void 0 : _a.kernel;
        if (this._pendingKernelName === this.noKernelName) {
            return this.noKernelName;
        }
        if (!kernel &&
            !this.isReady &&
            this.kernelPreference.canStart !== false &&
            this.kernelPreference.shouldStart !== false) {
            let name = this._pendingKernelName ||
                SessionContext.getDefaultKernel({
                    specs: this.specsManager.specs,
                    sessions: this.sessionManager.running(),
                    preference: this.kernelPreference
                }) ||
                '';
            if (name) {
                name = (_d = (_c = (_b = this.specsManager.specs) === null || _b === void 0 ? void 0 : _b.kernelspecs[name]) === null || _c === void 0 ? void 0 : _c.display_name) !== null && _d !== void 0 ? _d : name;
                return name;
            }
            return this.noKernelName;
        }
        if (this._pendingKernelName) {
            return ((_g = (_f = (_e = this.specsManager.specs) === null || _e === void 0 ? void 0 : _e.kernelspecs[this._pendingKernelName]) === null || _f === void 0 ? void 0 : _f.display_name) !== null && _g !== void 0 ? _g : this._pendingKernelName);
        }
        if (!kernel) {
            return this.noKernelName;
        }
        return ((_k = (_j = (_h = this.specsManager.specs) === null || _h === void 0 ? void 0 : _h.kernelspecs[kernel.name]) === null || _j === void 0 ? void 0 : _j.display_name) !== null && _k !== void 0 ? _k : kernel.name);
    }
    /**
     * A sensible status to display
     *
     * #### Notes
     * This combines the status and connection status into a single status for
     * the user.
     */
    get kernelDisplayStatus() {
        var _a, _b;
        const kernel = (_a = this.session) === null || _a === void 0 ? void 0 : _a.kernel;
        if (this._isTerminating) {
            return 'terminating';
        }
        if (this._isRestarting) {
            return 'restarting';
        }
        if (this._pendingKernelName === this.noKernelName) {
            return 'unknown';
        }
        if (!kernel && this._pendingKernelName) {
            return 'initializing';
        }
        if (!kernel &&
            !this.isReady &&
            this.kernelPreference.canStart !== false &&
            this.kernelPreference.shouldStart !== false) {
            return 'initializing';
        }
        return ((_b = ((kernel === null || kernel === void 0 ? void 0 : kernel.connectionStatus) === 'connected'
            ? kernel === null || kernel === void 0 ? void 0 : kernel.status : kernel === null || kernel === void 0 ? void 0 : kernel.connectionStatus)) !== null && _b !== void 0 ? _b : 'unknown');
    }
    /**
     * The name of the previously started kernel.
     */
    get prevKernelName() {
        return this._prevKernelName;
    }
    /**
     * Test whether the context is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * A signal emitted when the poll is disposed.
     */
    get disposed() {
        return this._disposed;
    }
    /**
     * Get the constant displayed name for "No Kernel"
     */
    get noKernelName() {
        return this._trans.__('No Kernel');
    }
    /**
     * Dispose of the resources held by the context.
     */
    dispose() {
        if (this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        this._disposed.emit();
        if (this._session) {
            if (this.kernelPreference.shutdownOnDispose) {
                // Fire and forget the session shutdown request
                this.sessionManager.shutdown(this._session.id).catch(reason => {
                    console.error(`Kernel not shut down ${reason}`);
                });
            }
            // Dispose the session connection
            this._session.dispose();
            this._session = null;
        }
        if (this._dialog) {
            this._dialog.dispose();
        }
        if (this._busyDisposable) {
            this._busyDisposable.dispose();
            this._busyDisposable = null;
        }
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal.clearData(this);
    }
    /**
     * Restart the current Kernel.
     *
     * @returns A promise that resolves when the kernel is restarted.
     */
    async restartKernel() {
        var _a, _b, _c, _d, _e, _f;
        const kernel = ((_a = this.session) === null || _a === void 0 ? void 0 : _a.kernel) || null;
        if (this._isRestarting) {
            return;
        }
        this._isRestarting = true;
        this._isReady = false;
        this._statusChanged.emit('restarting');
        try {
            await ((_c = (_b = this.session) === null || _b === void 0 ? void 0 : _b.kernel) === null || _c === void 0 ? void 0 : _c.restart());
            this._isReady = true;
        }
        catch (e) {
            console.error(e);
        }
        this._isRestarting = false;
        this._statusChanged.emit(((_e = (_d = this.session) === null || _d === void 0 ? void 0 : _d.kernel) === null || _e === void 0 ? void 0 : _e.status) || 'unknown');
        this._kernelChanged.emit({
            name: 'kernel',
            oldValue: kernel,
            newValue: ((_f = this.session) === null || _f === void 0 ? void 0 : _f.kernel) || null
        });
    }
    /**
     * Change the current kernel associated with the session.
     */
    async changeKernel(options = {}) {
        if (this.isDisposed) {
            throw new Error('Disposed');
        }
        // Wait for the initialization method to try
        // and start its kernel first to ensure consistent
        // ordering.
        await this._initStarted.promise;
        return this._changeKernel(options);
    }
    /**
     * Kill the kernel and shutdown the session.
     *
     * @returns A promise that resolves when the session is shut down.
     */
    async shutdown() {
        if (this.isDisposed || !this._initializing) {
            return;
        }
        await this._initStarted.promise;
        this._pendingSessionRequest = '';
        this._pendingKernelName = this.noKernelName;
        return this._shutdownSession();
    }
    /**
     * Initialize the session context
     *
     * @returns A promise that resolves with whether to ask the user to select a kernel.
     *
     * #### Notes
     * If a server session exists on the current path, we will connect to it.
     * If preferences include disabling `canStart` or `shouldStart`, no
     * server session will be started.
     * If a kernel id is given, we attempt to start a session with that id.
     * If a default kernel is available, we connect to it.
     * Otherwise we ask the user to select a kernel.
     */
    async initialize() {
        if (this._initializing) {
            return this._initPromise.promise;
        }
        this._initializing = true;
        const needsSelection = await this._initialize();
        if (!needsSelection) {
            this._isReady = true;
            this._ready.resolve(undefined);
        }
        if (!this._pendingSessionRequest) {
            this._initStarted.resolve(void 0);
        }
        this._initPromise.resolve(needsSelection);
        return needsSelection;
    }
    /**
     * Inner initialize function that doesn't handle promises.
     * This makes it easier to consolidate promise handling logic.
     */
    async _initialize() {
        const manager = this.sessionManager;
        await manager.ready;
        await manager.refreshRunning();
        const model = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.find)(manager.running(), item => {
            return item.path === this._path;
        });
        if (model) {
            try {
                const session = manager.connectTo({ model });
                this._handleNewSession(session);
            }
            catch (err) {
                void this._handleSessionError(err);
                return Promise.reject(err);
            }
        }
        return await this._startIfNecessary();
    }
    /**
     * Shut down the current session.
     */
    async _shutdownSession() {
        var _a;
        const session = this._session;
        // Capture starting values in case an error is raised.
        const isTerminating = this._isTerminating;
        const isReady = this._isReady;
        this._isTerminating = true;
        this._isReady = false;
        this._statusChanged.emit('terminating');
        try {
            await (session === null || session === void 0 ? void 0 : session.shutdown());
            this._isTerminating = false;
            session === null || session === void 0 ? void 0 : session.dispose();
            this._session = null;
            const kernel = (session === null || session === void 0 ? void 0 : session.kernel) || null;
            this._statusChanged.emit('unknown');
            this._kernelChanged.emit({
                name: 'kernel',
                oldValue: kernel,
                newValue: null
            });
            this._sessionChanged.emit({
                name: 'session',
                oldValue: session,
                newValue: null
            });
        }
        catch (err) {
            this._isTerminating = isTerminating;
            this._isReady = isReady;
            const status = (_a = session === null || session === void 0 ? void 0 : session.kernel) === null || _a === void 0 ? void 0 : _a.status;
            if (status === undefined) {
                this._statusChanged.emit('unknown');
            }
            else {
                this._statusChanged.emit(status);
            }
            throw err;
        }
        return;
    }
    /**
     * Start the session if necessary.
     *
     * @returns Whether to ask the user to pick a kernel.
     */
    async _startIfNecessary() {
        var _a;
        const preference = this.kernelPreference;
        if (this.isDisposed || ((_a = this.session) === null || _a === void 0 ? void 0 : _a.kernel) ||
            preference.shouldStart === false ||
            preference.canStart === false) {
            // Not necessary to start a kernel
            return false;
        }
        let options;
        if (preference.id) {
            options = { id: preference.id };
        }
        else {
            const name = SessionContext.getDefaultKernel({
                specs: this.specsManager.specs,
                sessions: this.sessionManager.running(),
                preference
            });
            if (name) {
                options = { name };
            }
        }
        if (options) {
            try {
                await this._changeKernel(options);
                return false;
            }
            catch (err) {
                /* no-op */
            }
        }
        // Always fall back to selecting a kernel
        return true;
    }
    /**
     * Change the kernel.
     */
    async _changeKernel(model = {}, isInit = false) {
        if (model.name) {
            this._pendingKernelName = model.name;
        }
        if (!this._session) {
            this._kernelChanged.emit({
                name: 'kernel',
                oldValue: null,
                newValue: null
            });
        }
        // Guarantee that the initialized kernel
        // will be started first.
        if (!this._pendingSessionRequest) {
            this._initStarted.resolve(void 0);
        }
        // If we already have a session, just change the kernel.
        if (this._session && !this._isTerminating) {
            try {
                await this._session.changeKernel(model);
                return this._session.kernel;
            }
            catch (err) {
                void this._handleSessionError(err);
                throw err;
            }
        }
        // Use a UUID for the path to overcome a race condition on the server
        // where it will re-use a session for a given path but only after
        // the kernel finishes starting.
        // We later switch to the real path below.
        // Use the correct directory so the kernel will be started in that directory.
        const dirName = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.dirname(this._path);
        const requestId = (this._pendingSessionRequest = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.join(dirName, _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.UUID.uuid4()));
        try {
            this._statusChanged.emit('starting');
            const session = await this.sessionManager.startNew({
                path: requestId,
                type: this._type,
                name: this._name,
                kernel: model
            });
            // Handle a preempt.
            if (this._pendingSessionRequest !== session.path) {
                await session.shutdown();
                session.dispose();
                return null;
            }
            // Change to the real path.
            await session.setPath(this._path);
            // Update the name in case it has changed since we launched the session.
            await session.setName(this._name);
            if (this._session && !this._isTerminating) {
                await this._shutdownSession();
            }
            return this._handleNewSession(session);
        }
        catch (err) {
            void this._handleSessionError(err);
            throw err;
        }
    }
    /**
     * Handle a new session object.
     */
    _handleNewSession(session) {
        var _a, _b, _c;
        if (this.isDisposed) {
            throw Error('Disposed');
        }
        if (!this._isReady) {
            this._isReady = true;
            this._ready.resolve(undefined);
        }
        if (this._session) {
            this._session.dispose();
        }
        this._session = session;
        this._pendingKernelName = '';
        if (session) {
            this._prevKernelName = (_b = (_a = session.kernel) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
            session.disposed.connect(this._onSessionDisposed, this);
            session.propertyChanged.connect(this._onPropertyChanged, this);
            session.kernelChanged.connect(this._onKernelChanged, this);
            session.statusChanged.connect(this._onStatusChanged, this);
            session.connectionStatusChanged.connect(this._onConnectionStatusChanged, this);
            session.pendingInput.connect(this._onPendingInput, this);
            session.iopubMessage.connect(this._onIopubMessage, this);
            session.unhandledMessage.connect(this._onUnhandledMessage, this);
            if (session.path !== this._path) {
                this._onPropertyChanged(session, 'path');
            }
            if (session.name !== this._name) {
                this._onPropertyChanged(session, 'name');
            }
            if (session.type !== this._type) {
                this._onPropertyChanged(session, 'type');
            }
        }
        // Any existing session/kernel connection was disposed above when the session was
        // disposed, so the oldValue should be null.
        this._sessionChanged.emit({
            name: 'session',
            oldValue: null,
            newValue: session
        });
        this._kernelChanged.emit({
            oldValue: null,
            newValue: (session === null || session === void 0 ? void 0 : session.kernel) || null,
            name: 'kernel'
        });
        this._statusChanged.emit(((_c = session === null || session === void 0 ? void 0 : session.kernel) === null || _c === void 0 ? void 0 : _c.status) || 'unknown');
        return (session === null || session === void 0 ? void 0 : session.kernel) || null;
    }
    /**
     * Handle an error in session startup.
     */
    async _handleSessionError(err) {
        this._handleNewSession(null);
        let traceback = '';
        let message = '';
        try {
            traceback = err.traceback;
            message = err.message;
        }
        catch (err) {
            // no-op
        }
        await this._displayKernelError(message, traceback);
    }
    /**
     * Display kernel error
     */
    async _displayKernelError(message, traceback) {
        const body = (react__WEBPACK_IMPORTED_MODULE_6__.createElement("div", null,
            message && react__WEBPACK_IMPORTED_MODULE_6__.createElement("pre", null, message),
            traceback && (react__WEBPACK_IMPORTED_MODULE_6__.createElement("details", { className: "jp-mod-wide" },
                react__WEBPACK_IMPORTED_MODULE_6__.createElement("pre", null, traceback)))));
        const dialog = (this._dialog = new _dialog__WEBPACK_IMPORTED_MODULE_7__.Dialog({
            title: this._trans.__('Error Starting Kernel'),
            body,
            buttons: [_dialog__WEBPACK_IMPORTED_MODULE_7__.Dialog.okButton()]
        }));
        await dialog.launch();
        this._dialog = null;
    }
    /**
     * Handle a session termination.
     */
    _onSessionDisposed() {
        if (this._session) {
            const oldValue = this._session;
            this._session = null;
            const newValue = this._session;
            this._sessionChanged.emit({ name: 'session', oldValue, newValue });
        }
    }
    /**
     * Handle a change to a session property.
     */
    _onPropertyChanged(sender, property) {
        switch (property) {
            case 'path':
                this._path = sender.path;
                break;
            case 'name':
                this._name = sender.name;
                break;
            case 'type':
                this._type = sender.type;
                break;
            default:
                throw new Error(`unrecognized property ${property}`);
        }
        this._propertyChanged.emit(property);
    }
    /**
     * Handle a change to the kernel.
     */
    _onKernelChanged(sender, args) {
        this._kernelChanged.emit(args);
    }
    /**
     * Handle a change to the session status.
     */
    _onStatusChanged(sender, status) {
        var _a;
        if (status === 'dead') {
            const model = (_a = sender.kernel) === null || _a === void 0 ? void 0 : _a.model;
            if (model === null || model === void 0 ? void 0 : model.reason) {
                const traceback = model.traceback || '';
                void this._displayKernelError(model.reason, traceback);
            }
        }
        // Set that this kernel is busy, if we haven't already
        // If we have already, and now we aren't busy, dispose
        // of the busy disposable.
        if (this._setBusy) {
            if (status === 'busy') {
                if (!this._busyDisposable) {
                    this._busyDisposable = this._setBusy();
                }
            }
            else {
                if (this._busyDisposable) {
                    this._busyDisposable.dispose();
                    this._busyDisposable = null;
                }
            }
        }
        // Proxy the signal
        this._statusChanged.emit(status);
    }
    /**
     * Handle a change to the session status.
     */
    _onConnectionStatusChanged(sender, status) {
        // Proxy the signal
        this._connectionStatusChanged.emit(status);
    }
    /**
     * Handle a change to the pending input.
     */
    _onPendingInput(sender, value) {
        // Set the signal value
        this._pendingInput = value;
    }
    /**
     * Handle an iopub message.
     */
    _onIopubMessage(sender, message) {
        if (message.header.msg_type === 'shutdown_reply') {
            this.session.kernel.removeInputGuard();
        }
        this._iopubMessage.emit(message);
    }
    /**
     * Handle an unhandled message.
     */
    _onUnhandledMessage(sender, message) {
        this._unhandledMessage.emit(message);
    }
}
/**
 * A namespace for `SessionContext` statics.
 */
(function (SessionContext) {
    /**
     * Get the default kernel name given select options.
     */
    function getDefaultKernel(options) {
        return Private.getDefaultKernel(options);
    }
    SessionContext.getDefaultKernel = getDefaultKernel;
})(SessionContext || (SessionContext = {}));
/**
 * The default implementation of the client session dialog provider.
 */
const sessionContextDialogs = {
    /**
     * Select a kernel for the session.
     */
    async selectKernel(sessionContext, translator) {
        if (sessionContext.isDisposed) {
            return Promise.resolve();
        }
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        const trans = translator.load('jupyterlab');
        // If there is no existing kernel, offer the option
        // to keep no kernel.
        let label = trans.__('Cancel');
        if (sessionContext.hasNoKernel) {
            label = sessionContext.kernelDisplayName;
        }
        const buttons = [
            _dialog__WEBPACK_IMPORTED_MODULE_7__.Dialog.cancelButton({ label }),
            _dialog__WEBPACK_IMPORTED_MODULE_7__.Dialog.okButton({ label: trans.__('Select') })
        ];
        const dialog = new _dialog__WEBPACK_IMPORTED_MODULE_7__.Dialog({
            title: trans.__('Select Kernel'),
            body: new Private.KernelSelector(sessionContext, translator),
            buttons
        });
        const result = await dialog.launch();
        if (sessionContext.isDisposed || !result.button.accept) {
            return;
        }
        const model = result.value;
        if (model === null && !sessionContext.hasNoKernel) {
            return sessionContext.shutdown();
        }
        if (model) {
            await sessionContext.changeKernel(model);
        }
    },
    /**
     * Restart the session.
     *
     * @returns A promise that resolves with whether the kernel has restarted.
     *
     * #### Notes
     * If there is a running kernel, present a dialog.
     * If there is no kernel, we start a kernel with the last run
     * kernel name and resolves with `true`.
     */
    async restart(sessionContext, translator) {
        var _a;
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        const trans = translator.load('jupyterlab');
        await sessionContext.initialize();
        if (sessionContext.isDisposed) {
            throw new Error('session already disposed');
        }
        const kernel = (_a = sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel;
        if (!kernel && sessionContext.prevKernelName) {
            await sessionContext.changeKernel({
                name: sessionContext.prevKernelName
            });
            return true;
        }
        // Bail if there is no previous kernel to start.
        if (!kernel) {
            throw new Error('No kernel to restart');
        }
        const restartBtn = _dialog__WEBPACK_IMPORTED_MODULE_7__.Dialog.warnButton({ label: 'Restart' });
        const result = await (0,_dialog__WEBPACK_IMPORTED_MODULE_7__.showDialog)({
            title: trans.__('Restart Kernel?'),
            body: trans.__('Do you want to restart the current kernel? All variables will be lost.'),
            buttons: [_dialog__WEBPACK_IMPORTED_MODULE_7__.Dialog.cancelButton(), restartBtn]
        });
        if (kernel.isDisposed) {
            return false;
        }
        if (result.button.accept) {
            await sessionContext.restartKernel();
            return true;
        }
        return false;
    }
};
/**
 * The namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * A widget that provides a kernel selection.
     */
    class KernelSelector extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.Widget {
        /**
         * Create a new kernel selector widget.
         */
        constructor(sessionContext, translator) {
            super({ node: createSelectorNode(sessionContext, translator) });
        }
        /**
         * Get the value of the kernel selector widget.
         */
        getValue() {
            const selector = this.node.querySelector('select');
            return JSON.parse(selector.value);
        }
    }
    Private.KernelSelector = KernelSelector;
    /**
     * Create a node for a kernel selector widget.
     */
    function createSelectorNode(sessionContext, translator) {
        // Create the dialog body.
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        const trans = translator.load('jupyterlab');
        const body = document.createElement('div');
        const text = document.createElement('label');
        text.textContent = `${trans.__('Select kernel for:')} "${sessionContext.name}"`;
        body.appendChild(text);
        const options = getKernelSearch(sessionContext);
        const selector = document.createElement('select');
        populateKernelSelect(selector, options, translator, !sessionContext.hasNoKernel ? sessionContext.kernelDisplayName : null);
        body.appendChild(selector);
        return body;
    }
    /**
     * Get the default kernel name given select options.
     */
    function getDefaultKernel(options) {
        var _a;
        const { specs, preference } = options;
        const { name, language, shouldStart, canStart, autoStartDefault } = preference;
        if (!specs || shouldStart === false || canStart === false) {
            return null;
        }
        const defaultName = autoStartDefault ? specs.default : null;
        if (!name && !language) {
            return defaultName;
        }
        // Look for an exact match of a spec name.
        for (const specName in specs.kernelspecs) {
            if (specName === name) {
                return name;
            }
        }
        // Bail if there is no language.
        if (!language) {
            return defaultName;
        }
        // Check for a single kernel matching the language.
        const matches = [];
        for (const specName in specs.kernelspecs) {
            const kernelLanguage = (_a = specs.kernelspecs[specName]) === null || _a === void 0 ? void 0 : _a.language;
            if (language === kernelLanguage) {
                matches.push(specName);
            }
        }
        if (matches.length === 1) {
            const specName = matches[0];
            console.warn('No exact match found for ' +
                specName +
                ', using kernel ' +
                specName +
                ' that matches ' +
                'language=' +
                language);
            return specName;
        }
        // No matches found.
        return defaultName;
    }
    Private.getDefaultKernel = getDefaultKernel;
    /**
     * Populate a kernel select node for the session.
     */
    function populateKernelSelect(node, options, translator, currentKernelDisplayName = null) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        const { preference, sessions, specs } = options;
        const { name, id, language, canStart, shouldStart } = preference;
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        const trans = translator.load('jupyterlab');
        if (!specs || canStart === false) {
            node.appendChild(optionForNone(translator));
            node.value = 'null';
            node.disabled = true;
            return;
        }
        node.disabled = false;
        // Create mappings of display names and languages for kernel name.
        const displayNames = Object.create(null);
        const languages = Object.create(null);
        for (const name in specs.kernelspecs) {
            const spec = specs.kernelspecs[name];
            displayNames[name] = spec.display_name;
            languages[name] = spec.language;
        }
        // Handle a kernel by name.
        const names = [];
        if (name && name in specs.kernelspecs) {
            names.push(name);
        }
        // Then look by language.
        if (language) {
            for (const specName in specs.kernelspecs) {
                if (name !== specName && languages[specName] === language) {
                    names.push(specName);
                }
            }
        }
        // Use the default kernel if no kernels were found.
        if (!names.length) {
            names.push(specs.default);
        }
        // Handle a preferred kernels in order of display name.
        const preferred = document.createElement('optgroup');
        preferred.label = trans.__('Start Preferred Kernel');
        names.sort((a, b) => displayNames[a].localeCompare(displayNames[b]));
        for (const name of names) {
            preferred.appendChild(optionForName(name, displayNames[name]));
        }
        if (preferred.firstChild) {
            node.appendChild(preferred);
        }
        // Add an option for no kernel
        node.appendChild(optionForNone());
        const other = document.createElement('optgroup');
        other.label = trans.__('Start Other Kernel');
        // Add the rest of the kernel names in alphabetical order.
        const otherNames = [];
        for (const specName in specs.kernelspecs) {
            if (names.indexOf(specName) !== -1) {
                continue;
            }
            otherNames.push(specName);
        }
        otherNames.sort((a, b) => displayNames[a].localeCompare(displayNames[b]));
        for (const otherName of otherNames) {
            other.appendChild(optionForName(otherName, displayNames[otherName]));
        }
        // Add a separator option if there were any other names.
        if (otherNames.length) {
            node.appendChild(other);
        }
        // Handle the default value.
        if (shouldStart === false) {
            node.value = 'null';
        }
        else {
            let selectedIndex = 0;
            if (currentKernelDisplayName) {
                // Select current kernel by default.
                selectedIndex = [...node.options].findIndex(option => option.text === currentKernelDisplayName);
                selectedIndex = Math.max(selectedIndex, 0);
            }
            node.selectedIndex = selectedIndex;
        }
        // Bail if there are no sessions.
        if (!sessions) {
            return;
        }
        // Add the sessions using the preferred language first.
        const matchingSessions = [];
        const otherSessions = [];
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.each)(sessions, session => {
            var _a;
            if (language &&
                session.kernel &&
                languages[session.kernel.name] === language &&
                session.kernel.id !== id) {
                matchingSessions.push(session);
            }
            else if (((_a = session.kernel) === null || _a === void 0 ? void 0 : _a.id) !== id) {
                otherSessions.push(session);
            }
        });
        const matching = document.createElement('optgroup');
        matching.label = trans.__('Use Kernel from Preferred Session');
        node.appendChild(matching);
        if (matchingSessions.length) {
            matchingSessions.sort((a, b) => {
                return a.path.localeCompare(b.path);
            });
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.each)(matchingSessions, session => {
                const name = session.kernel ? displayNames[session.kernel.name] : '';
                matching.appendChild(optionForSession(session, name, translator));
            });
        }
        const otherSessionsNode = document.createElement('optgroup');
        otherSessionsNode.label = trans.__('Use Kernel from Other Session');
        node.appendChild(otherSessionsNode);
        if (otherSessions.length) {
            otherSessions.sort((a, b) => {
                return a.path.localeCompare(b.path);
            });
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.each)(otherSessions, session => {
                const name = session.kernel
                    ? displayNames[session.kernel.name] || session.kernel.name
                    : '';
                otherSessionsNode.appendChild(optionForSession(session, name, translator));
            });
        }
    }
    Private.populateKernelSelect = populateKernelSelect;
    /**
     * Get the kernel search options given a session context and session manager.
     */
    function getKernelSearch(sessionContext) {
        return {
            specs: sessionContext.specsManager.specs,
            sessions: sessionContext.sessionManager.running(),
            preference: sessionContext.kernelPreference
        };
    }
    /**
     * Create an option element for a kernel name.
     */
    function optionForName(name, displayName) {
        const option = document.createElement('option');
        option.text = displayName;
        option.value = JSON.stringify({ name });
        return option;
    }
    /**
     * Create an option for no kernel.
     */
    function optionForNone(translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        const trans = translator.load('jupyterlab');
        const group = document.createElement('optgroup');
        group.label = trans.__('Use No Kernel');
        const option = document.createElement('option');
        option.text = trans.__('No Kernel');
        option.value = 'null';
        group.appendChild(option);
        return group;
    }
    /**
     * Create an option element for a session.
     */
    function optionForSession(session, displayName, translator) {
        var _a, _b;
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        const trans = translator.load('jupyterlab');
        const option = document.createElement('option');
        const sessionName = session.name || _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.basename(session.path);
        option.text = sessionName;
        option.value = JSON.stringify({ id: (_a = session.kernel) === null || _a === void 0 ? void 0 : _a.id });
        option.title =
            `${trans.__('Path:')} ${session.path}\n` +
                `${trans.__('Name:')} ${sessionName}\n` +
                `${trans.__('Kernel Name:')} ${displayName}\n` +
                `${trans.__('Kernel Id:')} ${(_b = session.kernel) === null || _b === void 0 ? void 0 : _b.id}`;
        return option;
    }
})(Private || (Private = {}));
//# sourceMappingURL=sessioncontext.js.map

/***/ }),

/***/ "../../packages/apputils/lib/spinner.js":
/*!**********************************************!*\
  !*** ../../packages/apputils/lib/spinner.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Spinner": () => (/* binding */ Spinner)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/

/**
 * The spinner class.
 */
class Spinner extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    /**
     * Construct a spinner widget.
     */
    constructor() {
        super();
        this.addClass('jp-Spinner');
        this.node.tabIndex = -1;
        const content = document.createElement('div');
        content.className = 'jp-SpinnerContent';
        this.node.appendChild(content);
    }
    /**
     * Handle `'activate-request'` messages.
     */
    onActivateRequest(msg) {
        this.node.focus();
    }
}
//# sourceMappingURL=spinner.js.map

/***/ }),

/***/ "../../packages/apputils/lib/splash.js":
/*!*********************************************!*\
  !*** ../../packages/apputils/lib/splash.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ISplashScreen": () => (/* binding */ ISplashScreen)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The main menu token.
 */
const ISplashScreen = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/apputils:ISplashScreen');
//# sourceMappingURL=splash.js.map

/***/ }),

/***/ "../../packages/apputils/lib/styling.js":
/*!**********************************************!*\
  !*** ../../packages/apputils/lib/styling.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Styling": () => (/* binding */ Styling)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * A namespace for node styling.
 */
var Styling;
(function (Styling) {
    /**
     * Style a node and its child elements with the default tag names.
     *
     * @param node - The base node.
     *
     * @param className - The optional CSS class to add to styled nodes.
     */
    function styleNode(node, className = '') {
        styleNodeByTag(node, 'select', className);
        styleNodeByTag(node, 'textarea', className);
        styleNodeByTag(node, 'input', className);
        styleNodeByTag(node, 'button', className);
    }
    Styling.styleNode = styleNode;
    /**
     * Style a node and its elements that have a given tag name.
     *
     * @param node - The base node.
     *
     * @param tagName - The html tag name to style.
     *
     * @param className - The optional CSS class to add to styled nodes.
     */
    function styleNodeByTag(node, tagName, className = '') {
        if (node.localName === tagName) {
            node.classList.add('jp-mod-styled');
        }
        if (node.localName === 'select') {
            wrapSelect(node);
        }
        const nodes = node.getElementsByTagName(tagName);
        for (let i = 0; i < nodes.length; i++) {
            const child = nodes[i];
            child.classList.add('jp-mod-styled');
            if (className) {
                child.classList.add(className);
            }
            if (tagName === 'select') {
                wrapSelect(child);
            }
        }
    }
    Styling.styleNodeByTag = styleNodeByTag;
    /**
     * Wrap a select node.
     */
    function wrapSelect(node) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('jp-select-wrapper');
        node.addEventListener('focus', Private.onFocus);
        node.addEventListener('blur', Private.onFocus);
        node.classList.add('jp-mod-styled');
        if (node.parentElement) {
            node.parentElement.replaceChild(wrapper, node);
        }
        wrapper.appendChild(node);
        // add the icon node
        wrapper.appendChild(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.caretDownEmptyIcon.element({
            tag: 'span',
            stylesheet: 'select',
            right: '8px',
            top: '5px',
            width: '18px'
        }));
        return wrapper;
    }
    Styling.wrapSelect = wrapSelect;
})(Styling || (Styling = {}));
/**
 * The namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * Handle a focus event on a styled select.
     */
    function onFocus(event) {
        const target = event.target;
        const parent = target.parentElement;
        if (!parent) {
            return;
        }
        if (event.type === 'focus') {
            parent.classList.add('jp-mod-focused');
        }
        else {
            parent.classList.remove('jp-mod-focused');
        }
    }
    Private.onFocus = onFocus;
})(Private || (Private = {}));
//# sourceMappingURL=styling.js.map

/***/ }),

/***/ "../../packages/apputils/lib/thememanager.js":
/*!***************************************************!*\
  !*** ../../packages/apputils/lib/thememanager.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ThemeManager": () => (/* binding */ ThemeManager)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable?7038");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dialog */ "../../packages/apputils/lib/dialog.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.






/**
 * The number of milliseconds between theme loading attempts.
 */
const REQUEST_INTERVAL = 75;
/**
 * The number of times to attempt to load a theme before giving up.
 */
const REQUEST_THRESHOLD = 20;
/**
 * A class that provides theme management.
 */
class ThemeManager {
    /**
     * Construct a new theme manager.
     */
    constructor(options) {
        this._current = null;
        this._links = [];
        this._overrides = {};
        this._overrideProps = {};
        this._outstanding = null;
        this._pending = 0;
        this._requests = {};
        this._themes = {};
        this._themeChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        const { host, key, splash, url } = options;
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        const registry = options.settings;
        this._base = url;
        this._host = host;
        this._splash = splash || null;
        void registry.load(key).then(settings => {
            this._settings = settings;
            // set up css overrides once we have a pointer to the settings schema
            this._initOverrideProps();
            this._settings.changed.connect(this._loadSettings, this);
            this._loadSettings();
        });
    }
    /**
     * Get the name of the current theme.
     */
    get theme() {
        return this._current;
    }
    /**
     * The names of the registered themes.
     */
    get themes() {
        return Object.keys(this._themes);
    }
    /**
     * A signal fired when the application theme changes.
     */
    get themeChanged() {
        return this._themeChanged;
    }
    /**
     * Get the value of a CSS variable from its key.
     *
     * @param key - A Jupyterlab CSS variable, without the leading '--jp-'.
     *
     * @return value - The current value of the Jupyterlab CSS variable
     */
    getCSS(key) {
        var _a;
        return ((_a = this._overrides[key]) !== null && _a !== void 0 ? _a : getComputedStyle(document.documentElement).getPropertyValue(`--jp-${key}`));
    }
    /**
     * Load a theme CSS file by path.
     *
     * @param path - The path of the file to load.
     */
    loadCSS(path) {
        const base = this._base;
        const href = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.isLocal(path) ? _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(base, path) : path;
        const links = this._links;
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');
            link.setAttribute('href', href);
            link.addEventListener('load', () => {
                resolve(undefined);
            });
            link.addEventListener('error', () => {
                reject(`Stylesheet failed to load: ${href}`);
            });
            document.body.appendChild(link);
            links.push(link);
            // add any css overrides to document
            this.loadCSSOverrides();
        });
    }
    /**
     * Loads all current CSS overrides from settings. If an override has been
     * removed or is invalid, this function unloads it instead.
     */
    loadCSSOverrides() {
        var _a;
        const newOverrides = (_a = this._settings.user['overrides']) !== null && _a !== void 0 ? _a : {};
        // iterate over the union of current and new CSS override keys
        Object.keys(Object.assign(Object.assign({}, this._overrides), newOverrides)).forEach(key => {
            const val = newOverrides[key];
            if (val && this.validateCSS(key, val)) {
                // validation succeeded, set the override
                document.documentElement.style.setProperty(`--jp-${key}`, val);
            }
            else {
                // if key is not present or validation failed, the override will be removed
                delete newOverrides[key];
                document.documentElement.style.removeProperty(`--jp-${key}`);
            }
        });
        // replace the current overrides with the new ones
        this._overrides = newOverrides;
    }
    /**
     * Validate a CSS value w.r.t. a key
     *
     * @param key - A Jupyterlab CSS variable, without the leading '--jp-'.
     *
     * @param val - A candidate CSS value
     */
    validateCSS(key, val) {
        // determine the css property corresponding to the key
        const prop = this._overrideProps[key];
        if (!prop) {
            console.warn('CSS validation failed: could not find property corresponding to key.\n' +
                `key: '${key}', val: '${val}'`);
            return false;
        }
        // use built-in validation once we have the corresponding property
        if (CSS.supports(prop, val)) {
            return true;
        }
        else {
            console.warn('CSS validation failed: invalid value.\n' +
                `key: '${key}', val: '${val}', prop: '${prop}'`);
            return false;
        }
    }
    /**
     * Register a theme with the theme manager.
     *
     * @param theme - The theme to register.
     *
     * @returns A disposable that can be used to unregister the theme.
     */
    register(theme) {
        const { name } = theme;
        const themes = this._themes;
        if (themes[name]) {
            throw new Error(`Theme already registered for ${name}`);
        }
        themes[name] = theme;
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_3__.DisposableDelegate(() => {
            delete themes[name];
        });
    }
    /**
     * Add a CSS override to the settings.
     */
    setCSSOverride(key, value) {
        return this._settings.set('overrides', Object.assign(Object.assign({}, this._overrides), { [key]: value }));
    }
    /**
     * Set the current theme.
     */
    setTheme(name) {
        return this._settings.set('theme', name);
    }
    /**
     * Test whether a given theme is light.
     */
    isLight(name) {
        return this._themes[name].isLight;
    }
    /**
     * Increase a font size w.r.t. its current setting or its value in the
     * current theme.
     *
     * @param key - A Jupyterlab font size CSS variable, without the leading '--jp-'.
     */
    incrFontSize(key) {
        return this._incrFontSize(key, true);
    }
    /**
     * Decrease a font size w.r.t. its current setting or its value in the
     * current theme.
     *
     * @param key - A Jupyterlab font size CSS variable, without the leading '--jp-'.
     */
    decrFontSize(key) {
        return this._incrFontSize(key, false);
    }
    /**
     * Test whether a given theme styles scrollbars,
     * and if the user has scrollbar styling enabled.
     */
    themeScrollbars(name) {
        return (!!this._settings.composite['theme-scrollbars'] &&
            !!this._themes[name].themeScrollbars);
    }
    /**
     * Test if the user has scrollbar styling enabled.
     */
    isToggledThemeScrollbars() {
        return !!this._settings.composite['theme-scrollbars'];
    }
    /**
     * Toggle the `theme-scrollbars` setting.
     */
    toggleThemeScrollbars() {
        return this._settings.set('theme-scrollbars', !this._settings.composite['theme-scrollbars']);
    }
    /**
     * Get the display name of the theme.
     */
    getDisplayName(name) {
        var _a, _b;
        return (_b = (_a = this._themes[name]) === null || _a === void 0 ? void 0 : _a.displayName) !== null && _b !== void 0 ? _b : name;
    }
    /**
     * Change a font size by a positive or negative increment.
     */
    _incrFontSize(key, add = true) {
        var _a;
        // get the numeric and unit parts of the current font size
        const parts = ((_a = this.getCSS(key)) !== null && _a !== void 0 ? _a : '13px').split(/([a-zA-Z]+)/);
        // determine the increment
        const incr = (add ? 1 : -1) * (parts[1] === 'em' ? 0.1 : 1);
        // increment the font size and set it as an override
        return this.setCSSOverride(key, `${Number(parts[0]) + incr}${parts[1]}`);
    }
    /**
     * Initialize the key -> property dict for the overrides
     */
    _initOverrideProps() {
        const definitions = this._settings.schema.definitions;
        const overidesSchema = definitions.cssOverrides.properties;
        Object.keys(overidesSchema).forEach(key => {
            // override validation is against the CSS property in the description
            // field. Example: for key ui-font-family, .description is font-family
            this._overrideProps[key] = overidesSchema[key].description;
        });
    }
    /**
     * Handle the current settings.
     */
    _loadSettings() {
        const outstanding = this._outstanding;
        const pending = this._pending;
        const requests = this._requests;
        // If another request is pending, cancel it.
        if (pending) {
            window.clearTimeout(pending);
            this._pending = 0;
        }
        const settings = this._settings;
        const themes = this._themes;
        const theme = settings.composite['theme'];
        // If another promise is outstanding, wait until it finishes before
        // attempting to load the settings. Because outstanding promises cannot
        // be aborted, the order in which they occur must be enforced.
        if (outstanding) {
            outstanding
                .then(() => {
                this._loadSettings();
            })
                .catch(() => {
                this._loadSettings();
            });
            this._outstanding = null;
            return;
        }
        // Increment the request counter.
        requests[theme] = requests[theme] ? requests[theme] + 1 : 1;
        // If the theme exists, load it right away.
        if (themes[theme]) {
            this._outstanding = this._loadTheme(theme);
            delete requests[theme];
            return;
        }
        // If the request has taken too long, give up.
        if (requests[theme] > REQUEST_THRESHOLD) {
            const fallback = settings.default('theme');
            // Stop tracking the requests for this theme.
            delete requests[theme];
            if (!themes[fallback]) {
                this._onError(this._trans.__('Neither theme %1 nor default %2 loaded.', theme, fallback));
                return;
            }
            console.warn(`Could not load theme ${theme}, using default ${fallback}.`);
            this._outstanding = this._loadTheme(fallback);
            return;
        }
        // If the theme does not yet exist, attempt to wait for it.
        this._pending = window.setTimeout(() => {
            this._loadSettings();
        }, REQUEST_INTERVAL);
    }
    /**
     * Load the theme.
     *
     * #### Notes
     * This method assumes that the `theme` exists.
     */
    _loadTheme(theme) {
        var _a;
        const current = this._current;
        const links = this._links;
        const themes = this._themes;
        const splash = this._splash
            ? this._splash.show(themes[theme].isLight)
            : new _lumino_disposable__WEBPACK_IMPORTED_MODULE_3__.DisposableDelegate(() => undefined);
        // Unload any CSS files that have been loaded.
        links.forEach(link => {
            if (link.parentElement) {
                link.parentElement.removeChild(link);
            }
        });
        links.length = 0;
        const themeProps = (_a = this._settings.schema.properties) === null || _a === void 0 ? void 0 : _a.theme;
        if (themeProps) {
            themeProps.enum = Object.keys(themes).map(value => { var _a; return (_a = themes[value].displayName) !== null && _a !== void 0 ? _a : value; });
        }
        // Unload the previously loaded theme.
        const old = current ? themes[current].unload() : Promise.resolve();
        return Promise.all([old, themes[theme].load()])
            .then(() => {
            this._current = theme;
            this._themeChanged.emit({
                name: 'theme',
                oldValue: current,
                newValue: theme
            });
            // Need to force a redraw of the app here to avoid a Chrome rendering
            // bug that can leave the scrollbars in an invalid state
            this._host.hide();
            // If we hide/show the widget too quickly, no redraw will happen.
            // requestAnimationFrame delays until after the next frame render.
            requestAnimationFrame(() => {
                this._host.show();
                Private.fitAll(this._host);
                splash.dispose();
            });
        })
            .catch(reason => {
            this._onError(reason);
            splash.dispose();
        });
    }
    /**
     * Handle a theme error.
     */
    _onError(reason) {
        void (0,_dialog__WEBPACK_IMPORTED_MODULE_5__.showDialog)({
            title: this._trans.__('Error Loading Theme'),
            body: String(reason),
            buttons: [_dialog__WEBPACK_IMPORTED_MODULE_5__.Dialog.okButton({ label: this._trans.__('OK') })]
        });
    }
}
/**
 * A namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * Fit a widget and all of its children, recursively.
     */
    function fitAll(widget) {
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.each)(widget.children(), fitAll);
        widget.fit();
    }
    Private.fitAll = fitAll;
})(Private || (Private = {}));
//# sourceMappingURL=thememanager.js.map

/***/ }),

/***/ "../../packages/apputils/lib/tokens.js":
/*!*********************************************!*\
  !*** ../../packages/apputils/lib/tokens.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ISessionContextDialogs": () => (/* binding */ ISessionContextDialogs),
/* harmony export */   "IThemeManager": () => (/* binding */ IThemeManager),
/* harmony export */   "ISanitizer": () => (/* binding */ ISanitizer),
/* harmony export */   "IToolbarWidgetRegistry": () => (/* binding */ IToolbarWidgetRegistry)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The session context dialogs token.
 */
const ISessionContextDialogs = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/apputils:ISessionContextDialogs');
/* tslint:enable */
/* tslint:disable */
/**
 * The theme manager token.
 */
const IThemeManager = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/apputils:IThemeManager');
/**
 * The sanitizer token.
 */
const ISanitizer = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/apputils:ISanitizer');
/**
 * The toolbar registry token.
 */
const IToolbarWidgetRegistry = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/apputils:IToolbarWidgetRegistry');
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/apputils/lib/toolbar/factory.js":
/*!******************************************************!*\
  !*** ../../packages/apputils/lib/toolbar/factory.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createToolbarFactory": () => (/* binding */ createToolbarFactory),
/* harmony export */   "setToolbar": () => (/* binding */ setToolbar)
/* harmony export */ });
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/observables */ "webpack/sharing/consume/default/@jupyterlab/observables/@jupyterlab/observables");
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dialog */ "../../packages/apputils/lib/dialog.js");





/**
 * Default toolbar item rank
 *
 * #### Notes
 * This will place item just before the white spacer item in the notebook toolbar.
 */
const DEFAULT_TOOLBAR_ITEM_RANK = 50;
/**
 * Display warning when the toolbar definition have been modified.
 *
 * @param trans Translation bundle
 */
async function displayInformation(trans) {
    const result = await (0,_dialog__WEBPACK_IMPORTED_MODULE_4__.showDialog)({
        title: trans.__('Information'),
        body: trans.__('Toolbar customization has changed. You will need to reload JupyterLab to see the changes.'),
        buttons: [
            _dialog__WEBPACK_IMPORTED_MODULE_4__.Dialog.cancelButton(),
            _dialog__WEBPACK_IMPORTED_MODULE_4__.Dialog.okButton({ label: trans.__('Reload') })
        ]
    });
    if (result.button.accept) {
        location.reload();
    }
}
/**
 * Set the toolbar definition by accumulating all settings definition.
 *
 * The list will be populated only with the enabled items.
 *
 * @param toolbarItems Observable list to populate
 * @param registry Application settings registry
 * @param factoryName Widget factory name that needs a toolbar
 * @param pluginId Settings plugin id
 * @param translator Translator object
 * @param propertyId Property holding the toolbar definition in the settings; default 'toolbar'
 * @returns List of toolbar items
 */
async function setToolbarItems(toolbarItems, registry, factoryName, pluginId, translator, propertyId = 'toolbar') {
    var _a;
    const trans = translator.load('jupyterlab');
    let canonical;
    let loaded = {};
    /**
     * Populate the plugin's schema defaults.
     *
     * We keep track of disabled entries in case the plugin is loaded
     * after the toolbar initialization.
     */
    function populate(schema) {
        var _a, _b;
        loaded = {};
        const pluginDefaults = Object.keys(registry.plugins)
            .map(plugin => {
            var _a, _b;
            const items = (_b = ((_a = registry.plugins[plugin].schema['jupyter.lab.toolbars']) !== null && _a !== void 0 ? _a : {})[factoryName]) !== null && _b !== void 0 ? _b : [];
            loaded[plugin] = items;
            return items;
        })
            .concat([(_b = ((_a = schema['jupyter.lab.toolbars']) !== null && _a !== void 0 ? _a : {})[factoryName]) !== null && _b !== void 0 ? _b : []])
            .reduceRight((acc, val) => _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_1__.SettingRegistry.reconcileToolbarItems(acc, val, true), []);
        // Apply default value as last step to take into account overrides.json
        // The standard default being [] as the plugin must use `jupyter.lab.toolbars.<factory>`
        // to define their default value.
        schema.properties[propertyId].default = _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_1__.SettingRegistry.reconcileToolbarItems(pluginDefaults, schema.properties[propertyId].default, true).sort((a, b) => {
            var _a, _b;
            return ((_a = a.rank) !== null && _a !== void 0 ? _a : DEFAULT_TOOLBAR_ITEM_RANK) -
                ((_b = b.rank) !== null && _b !== void 0 ? _b : DEFAULT_TOOLBAR_ITEM_RANK);
        });
    }
    // Transform the plugin object to return different schema than the default.
    registry.transform(pluginId, {
        compose: plugin => {
            var _a, _b, _c, _d, _e;
            // Only override the canonical schema the first time.
            if (!canonical) {
                canonical = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.JSONExt.deepCopy(plugin.schema);
                populate(canonical);
            }
            const defaults = (_c = ((_b = ((_a = canonical.properties) !== null && _a !== void 0 ? _a : {})[propertyId]) !== null && _b !== void 0 ? _b : {}).default) !== null && _c !== void 0 ? _c : [];
            // Initialize the settings
            const user = plugin.data.user;
            const composite = plugin.data.composite;
            // Overrides the value with using the aggregated default for the toolbar property
            user[propertyId] = (_d = plugin.data.user[propertyId]) !== null && _d !== void 0 ? _d : [];
            composite[propertyId] = ((_e = _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_1__.SettingRegistry.reconcileToolbarItems(defaults, user[propertyId], false)) !== null && _e !== void 0 ? _e : []).sort((a, b) => {
                var _a, _b;
                return ((_a = a.rank) !== null && _a !== void 0 ? _a : DEFAULT_TOOLBAR_ITEM_RANK) -
                    ((_b = b.rank) !== null && _b !== void 0 ? _b : DEFAULT_TOOLBAR_ITEM_RANK);
            });
            plugin.data = { composite, user };
            return plugin;
        },
        fetch: plugin => {
            // Only override the canonical schema the first time.
            if (!canonical) {
                canonical = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.JSONExt.deepCopy(plugin.schema);
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
    // React to customization by the user
    settings.changed.connect(() => {
        var _a;
        const newItems = (_a = settings.composite[propertyId]) !== null && _a !== void 0 ? _a : [];
        transferSettings(newItems);
    });
    // React to plugin changes
    registry.pluginChanged.connect(async (sender, plugin) => {
        var _a, _b, _c, _d;
        // As the plugin storing the toolbar definition is transformed using
        // the above definition, if it changes, this means that a request to
        // reloaded was triggered. Hence the toolbar definitions from the other
        // plugins has been automatically reset during the transform step.
        if (plugin !== pluginId) {
            // If a plugin changed its toolbar items
            const oldItems = (_a = loaded[plugin]) !== null && _a !== void 0 ? _a : [];
            const newItems = (_c = ((_b = registry.plugins[plugin].schema['jupyter.lab.toolbars']) !== null && _b !== void 0 ? _b : {})[factoryName]) !== null && _c !== void 0 ? _c : [];
            if (!_lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.JSONExt.deepEqual(oldItems, newItems)) {
                if (loaded[plugin]) {
                    // The plugin has changed, request the user to reload the UI
                    await displayInformation(trans);
                }
                else {
                    // The plugin was not yet loaded => update the toolbar items list
                    loaded[plugin] = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.JSONExt.deepCopy(newItems);
                    const newList = ((_d = _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_1__.SettingRegistry.reconcileToolbarItems((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.toArray)(toolbarItems), newItems, false)) !== null && _d !== void 0 ? _d : []).sort((a, b) => {
                        var _a, _b;
                        return ((_a = a.rank) !== null && _a !== void 0 ? _a : DEFAULT_TOOLBAR_ITEM_RANK) -
                            ((_b = b.rank) !== null && _b !== void 0 ? _b : DEFAULT_TOOLBAR_ITEM_RANK);
                    });
                    transferSettings(newList);
                }
            }
        }
    });
    const transferSettings = (newItems) => {
        // This is not optimal but safer because a toolbar item with the same
        // name cannot be inserted (it will be a no-op). But that could happen
        // if the settings are changing the items order.
        toolbarItems.clear();
        toolbarItems.pushAll(newItems.filter(item => !item.disabled));
    };
    // Initialize the toolbar
    transferSettings((_a = settings.composite[propertyId]) !== null && _a !== void 0 ? _a : []);
}
/**
 * Create the toolbar factory for a given container widget based
 * on a data description stored in settings
 *
 * @param toolbarRegistry Toolbar widgets registry
 * @param settingsRegistry Settings registry
 * @param factoryName Toolbar container factory name
 * @param pluginId Settings plugin id
 * @param translator Translator
 * @param propertyId Toolbar definition key in the settings plugin
 * @returns List of toolbar widgets factory
 */
function createToolbarFactory(toolbarRegistry, settingsRegistry, factoryName, pluginId, translator, propertyId = 'toolbar') {
    const items = new _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__.ObservableList({
        itemCmp: (a, b) => _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.JSONExt.deepEqual(a, b)
    });
    // Get toolbar definition from the settings
    setToolbarItems(items, settingsRegistry, factoryName, pluginId, translator, propertyId).catch(reason => {
        console.error(`Failed to load toolbar items for factory ${factoryName} from ${pluginId}`, reason);
    });
    return (widget) => {
        const updateToolbar = (list, change) => {
            switch (change.type) {
                case 'move':
                    toolbar.move(change.oldIndex, change.newIndex);
                    break;
                case 'add':
                    change.newValues.forEach(item => toolbar.push({
                        name: item.name,
                        widget: toolbarRegistry.createWidget(factoryName, widget, item)
                    }));
                    break;
                case 'remove':
                    change.oldValues.forEach(() => toolbar.remove(change.oldIndex));
                    break;
                case 'set':
                    change.newValues.forEach(item => toolbar.set(change.newIndex, {
                        name: item.name,
                        widget: toolbarRegistry.createWidget(factoryName, widget, item)
                    }));
                    break;
            }
        };
        const toolbar = new _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__.ObservableList({
            values: (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.toArray)(items).map(item => {
                return {
                    name: item.name,
                    widget: toolbarRegistry.createWidget(factoryName, widget, item)
                };
            })
        });
        items.changed.connect(updateToolbar);
        widget.disposed.connect(() => {
            items.changed.disconnect(updateToolbar);
        });
        return toolbar;
    };
}
/**
 * Set the toolbar items of a widget from a factory
 *
 * @param widget Widget with the toolbar to set
 * @param factory Toolbar items factory
 */
function setToolbar(widget, factory) {
    if (!widget.toolbar) {
        console.log(`Widget ${widget.id} has no 'toolbar'.`);
        return;
    }
    const items = factory(widget);
    if (Array.isArray(items)) {
        items.forEach(({ name, widget: item }) => {
            widget.toolbar.addItem(name, item);
        });
    }
    else {
        const updateToolbar = (list, changes) => {
            switch (changes.type) {
                case 'add':
                    changes.newValues.forEach((item, index) => {
                        widget.toolbar.insertItem(changes.newIndex + index, item.name, item.widget);
                    });
                    break;
                case 'move':
                    changes.oldValues.forEach(item => {
                        item.widget.parent = null;
                    });
                    changes.newValues.forEach((item, index) => {
                        widget.toolbar.insertItem(changes.newIndex + index, item.name, item.widget);
                    });
                    break;
                case 'remove':
                    changes.oldValues.forEach(item => {
                        item.widget.parent = null;
                    });
                    break;
                case 'set':
                    changes.oldValues.forEach(item => {
                        item.widget.parent = null;
                    });
                    changes.newValues.forEach((item, index) => {
                        const existingIndex = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.findIndex)(widget.toolbar.names(), name => item.name === name);
                        if (existingIndex >= 0) {
                            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.toArray)(widget.toolbar.children())[existingIndex].parent = null;
                        }
                        widget.toolbar.insertItem(changes.newIndex + index, item.name, item.widget);
                    });
                    break;
            }
        };
        updateToolbar(items, {
            newIndex: 0,
            newValues: (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.toArray)(items),
            oldIndex: 0,
            oldValues: [],
            type: 'add'
        });
        items.changed.connect(updateToolbar);
        widget.disposed.connect(() => {
            items.changed.disconnect(updateToolbar);
        });
    }
}
//# sourceMappingURL=factory.js.map

/***/ }),

/***/ "../../packages/apputils/lib/toolbar/index.js":
/*!****************************************************!*\
  !*** ../../packages/apputils/lib/toolbar/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createToolbarFactory": () => (/* reexport safe */ _factory__WEBPACK_IMPORTED_MODULE_0__.createToolbarFactory),
/* harmony export */   "setToolbar": () => (/* reexport safe */ _factory__WEBPACK_IMPORTED_MODULE_0__.setToolbar),
/* harmony export */   "ToolbarWidgetRegistry": () => (/* reexport safe */ _registry__WEBPACK_IMPORTED_MODULE_1__.ToolbarWidgetRegistry),
/* harmony export */   "createDefaultFactory": () => (/* reexport safe */ _registry__WEBPACK_IMPORTED_MODULE_1__.createDefaultFactory),
/* harmony export */   "CommandToolbarButton": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_2__.CommandToolbarButton),
/* harmony export */   "CommandToolbarButtonComponent": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_2__.CommandToolbarButtonComponent),
/* harmony export */   "ReactiveToolbar": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_2__.ReactiveToolbar),
/* harmony export */   "Toolbar": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_2__.Toolbar),
/* harmony export */   "ToolbarButton": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton),
/* harmony export */   "ToolbarButtonComponent": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_2__.ToolbarButtonComponent),
/* harmony export */   "addCommandToolbarButtonClass": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_2__.addCommandToolbarButtonClass),
/* harmony export */   "addToolbarButtonClass": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_2__.addToolbarButtonClass)
/* harmony export */ });
/* harmony import */ var _factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory */ "../../packages/apputils/lib/toolbar/factory.js");
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./registry */ "../../packages/apputils/lib/toolbar/registry.js");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./widget */ "../../packages/apputils/lib/toolbar/widget.js");



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/apputils/lib/toolbar/registry.js":
/*!*******************************************************!*\
  !*** ../../packages/apputils/lib/toolbar/registry.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToolbarWidgetRegistry": () => (/* binding */ ToolbarWidgetRegistry),
/* harmony export */   "createDefaultFactory": () => (/* binding */ createDefaultFactory)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./widget */ "../../packages/apputils/lib/toolbar/widget.js");



/**
 * Concrete implementation of IToolbarWidgetRegistry interface
 */
class ToolbarWidgetRegistry {
    constructor(options) {
        this._widgets = new Map();
        this._defaultFactory = options.defaultFactory;
    }
    /**
     * Default toolbar item factory
     */
    get defaultFactory() {
        return this._defaultFactory;
    }
    set defaultFactory(factory) {
        this._defaultFactory = factory;
    }
    /**
     * Create a toolbar item widget
     *
     * @param widgetFactory The widget factory name that creates the toolbar
     * @param widget The newly widget containing the toolbar
     * @param toolbarItem The toolbar item definition
     * @returns The widget to be inserted in the toolbar.
     */
    createWidget(widgetFactory, widget, toolbarItem) {
        var _a;
        const factory = (_a = this._widgets.get(widgetFactory)) === null || _a === void 0 ? void 0 : _a.get(toolbarItem.name);
        return factory
            ? factory(widget)
            : this._defaultFactory(widgetFactory, widget, toolbarItem);
    }
    /**
     * Register a new toolbar item factory
     *
     * @param widgetFactory The widget factory name that creates the toolbar
     * @param toolbarItemName The unique toolbar item
     * @param factory The factory function that receives the widget containing the toolbar and returns the toolbar widget.
     * @returns The previously defined factory
     */
    registerFactory(widgetFactory, toolbarItemName, factory) {
        let namespace = this._widgets.get(widgetFactory);
        const oldFactory = namespace === null || namespace === void 0 ? void 0 : namespace.get(toolbarItemName);
        if (!namespace) {
            namespace = new Map();
            this._widgets.set(widgetFactory, namespace);
        }
        namespace.set(toolbarItemName, factory);
        return oldFactory;
    }
}
/**
 * Create the default toolbar item widget factory
 *
 * @param commands Application commands registry
 * @returns Default factory
 */
function createDefaultFactory(commands) {
    return (widgetFactory, widget, toolbarItem) => {
        var _a;
        switch ((_a = toolbarItem.type) !== null && _a !== void 0 ? _a : 'command') {
            case 'command': {
                const { command: tId, args: tArgs, label: tLabel, icon: tIcon } = toolbarItem;
                const id = tId !== null && tId !== void 0 ? tId : '';
                const args = Object.assign({ toolbar: true }, tArgs);
                const icon = tIcon ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon.resolve({ icon: tIcon }) : undefined;
                // If there is an icon, undefined label will results in no label
                // otherwise the label will be set using the setting or the command label
                const label = (icon !== null && icon !== void 0 ? icon : commands.icon(id, args)) ? tLabel !== null && tLabel !== void 0 ? tLabel : '' : tLabel;
                return new _widget__WEBPACK_IMPORTED_MODULE_2__.CommandToolbarButton({
                    commands,
                    id,
                    args,
                    icon,
                    label
                });
            }
            case 'spacer':
                return _widget__WEBPACK_IMPORTED_MODULE_2__.Toolbar.createSpacerItem();
            default:
                return new _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Widget();
        }
    };
}
//# sourceMappingURL=registry.js.map

/***/ }),

/***/ "../../packages/apputils/lib/toolbar/widget.js":
/*!*****************************************************!*\
  !*** ../../packages/apputils/lib/toolbar/widget.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Toolbar": () => (/* binding */ Toolbar),
/* harmony export */   "ReactiveToolbar": () => (/* binding */ ReactiveToolbar),
/* harmony export */   "ToolbarButtonComponent": () => (/* binding */ ToolbarButtonComponent),
/* harmony export */   "addToolbarButtonClass": () => (/* binding */ addToolbarButtonClass),
/* harmony export */   "ToolbarButton": () => (/* binding */ ToolbarButton),
/* harmony export */   "CommandToolbarButtonComponent": () => (/* binding */ CommandToolbarButtonComponent),
/* harmony export */   "addCommandToolbarButtonClass": () => (/* binding */ addCommandToolbarButtonClass),
/* harmony export */   "CommandToolbarButton": () => (/* binding */ CommandToolbarButton)
/* harmony export */ });
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_commands__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/commands */ "webpack/sharing/consume/default/@lumino/commands/@lumino/commands?8e96");
/* harmony import */ var _lumino_commands__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_commands__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/messaging */ "webpack/sharing/consume/default/@lumino/messaging/@lumino/messaging?790d");
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_messaging__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/properties */ "webpack/sharing/consume/default/@lumino/properties/@lumino/properties?140a");
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_properties__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _sessioncontext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../sessioncontext */ "../../packages/apputils/lib/sessioncontext.js");
/* harmony import */ var _kernelstatuses__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../kernelstatuses */ "../../packages/apputils/lib/kernelstatuses.js");
/* harmony import */ var _vdom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../vdom */ "../../packages/apputils/lib/vdom.js");
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling/@lumino/polling");
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_lumino_polling__WEBPACK_IMPORTED_MODULE_8__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.












/**
 * The class name added to toolbars.
 */
const TOOLBAR_CLASS = 'jp-Toolbar';
/**
 * Toolbar pop-up opener button name
 */
const TOOLBAR_OPENER_NAME = 'toolbar-popup-opener';
/**
 * The class name added to toolbar items.
 */
const TOOLBAR_ITEM_CLASS = 'jp-Toolbar-item';
/**
 * The class name added to toolbar kernel name text.
 */
const TOOLBAR_KERNEL_NAME_CLASS = 'jp-Toolbar-kernelName';
/**
 * The class name added to toolbar spacer.
 */
const TOOLBAR_SPACER_CLASS = 'jp-Toolbar-spacer';
/**
 * The class name added to toolbar kernel status icon.
 */
const TOOLBAR_KERNEL_STATUS_CLASS = 'jp-Toolbar-kernelStatus';
/**
 * A layout for toolbars.
 *
 * #### Notes
 * This layout automatically collapses its height if there are no visible
 * toolbar widgets, and expands to the standard toolbar height if there are
 * visible toolbar widgets.
 */
class ToolbarLayout extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.PanelLayout {
    constructor() {
        super(...arguments);
        this._dirty = false;
    }
    /**
     * A message handler invoked on a `'fit-request'` message.
     *
     * If any child widget is visible, expand the toolbar height to the normal
     * toolbar height.
     */
    onFitRequest(msg) {
        super.onFitRequest(msg);
        if (this.parent.isAttached) {
            // If there are any widgets not explicitly hidden, expand the toolbar to
            // accommodate them.
            if ((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.some)(this.widgets, w => !w.isHidden)) {
                this.parent.node.style.minHeight = 'var(--jp-private-toolbar-height)';
                this.parent.removeClass('jp-Toolbar-micro');
            }
            else {
                this.parent.node.style.minHeight = '';
                this.parent.addClass('jp-Toolbar-micro');
            }
        }
        // Set the dirty flag to ensure only a single update occurs.
        this._dirty = true;
        // Notify the ancestor that it should fit immediately. This may
        // cause a resize of the parent, fulfilling the required update.
        if (this.parent.parent) {
            _lumino_messaging__WEBPACK_IMPORTED_MODULE_4__.MessageLoop.sendMessage(this.parent.parent, _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Widget.Msg.FitRequest);
        }
        // If the dirty flag is still set, the parent was not resized.
        // Trigger the required update on the parent widget immediately.
        if (this._dirty) {
            _lumino_messaging__WEBPACK_IMPORTED_MODULE_4__.MessageLoop.sendMessage(this.parent, _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Widget.Msg.UpdateRequest);
        }
    }
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    onUpdateRequest(msg) {
        super.onUpdateRequest(msg);
        if (this.parent.isVisible) {
            this._dirty = false;
        }
    }
    /**
     * A message handler invoked on a `'child-shown'` message.
     */
    onChildShown(msg) {
        super.onChildShown(msg);
        // Post a fit request for the parent widget.
        this.parent.fit();
    }
    /**
     * A message handler invoked on a `'child-hidden'` message.
     */
    onChildHidden(msg) {
        super.onChildHidden(msg);
        // Post a fit request for the parent widget.
        this.parent.fit();
    }
    /**
     * A message handler invoked on a `'before-attach'` message.
     */
    onBeforeAttach(msg) {
        super.onBeforeAttach(msg);
        // Post a fit request for the parent widget.
        this.parent.fit();
    }
    /**
     * Attach a widget to the parent's DOM node.
     *
     * @param index - The current index of the widget in the layout.
     *
     * @param widget - The widget to attach to the parent.
     *
     * #### Notes
     * This is a reimplementation of the superclass method.
     */
    attachWidget(index, widget) {
        super.attachWidget(index, widget);
        // Post a fit request for the parent widget.
        this.parent.fit();
    }
    /**
     * Detach a widget from the parent's DOM node.
     *
     * @param index - The previous index of the widget in the layout.
     *
     * @param widget - The widget to detach from the parent.
     *
     * #### Notes
     * This is a reimplementation of the superclass method.
     */
    detachWidget(index, widget) {
        super.detachWidget(index, widget);
        // Post a fit request for the parent widget.
        this.parent.fit();
    }
}
/**
 * A class which provides a toolbar widget.
 */
class Toolbar extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Widget {
    /**
     * Construct a new toolbar widget.
     */
    constructor(options = {}) {
        var _a;
        super();
        this.addClass(TOOLBAR_CLASS);
        this.layout = (_a = options.layout) !== null && _a !== void 0 ? _a : new ToolbarLayout();
    }
    /**
     * Get an iterator over the ordered toolbar item names.
     *
     * @returns An iterator over the toolbar item names.
     */
    names() {
        const layout = this.layout;
        return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.map)(layout.widgets, widget => {
            return Private.nameProperty.get(widget);
        });
    }
    /**
     * Add an item to the end of the toolbar.
     *
     * @param name - The name of the widget to add to the toolbar.
     *
     * @param widget - The widget to add to the toolbar.
     *
     * @param index - The optional name of the item to insert after.
     *
     * @returns Whether the item was added to toolbar.  Returns false if
     *   an item of the same name is already in the toolbar.
     *
     * #### Notes
     * The item can be removed from the toolbar by setting its parent to `null`.
     */
    addItem(name, widget) {
        const layout = this.layout;
        return this.insertItem(layout.widgets.length, name, widget);
    }
    /**
     * Insert an item into the toolbar at the specified index.
     *
     * @param index - The index at which to insert the item.
     *
     * @param name - The name of the item.
     *
     * @param widget - The widget to add.
     *
     * @returns Whether the item was added to the toolbar. Returns false if
     *   an item of the same name is already in the toolbar.
     *
     * #### Notes
     * The index will be clamped to the bounds of the items.
     * The item can be removed from the toolbar by setting its parent to `null`.
     */
    insertItem(index, name, widget) {
        const existing = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.find)(this.names(), value => value === name);
        if (existing) {
            return false;
        }
        widget.addClass(TOOLBAR_ITEM_CLASS);
        const layout = this.layout;
        const j = Math.max(0, Math.min(index, layout.widgets.length));
        layout.insertWidget(j, widget);
        Private.nameProperty.set(widget, name);
        return true;
    }
    /**
     * Insert an item into the toolbar at the after a target item.
     *
     * @param at - The target item to insert after.
     *
     * @param name - The name of the item.
     *
     * @param widget - The widget to add.
     *
     * @returns Whether the item was added to the toolbar. Returns false if
     *   an item of the same name is already in the toolbar.
     *
     * #### Notes
     * The index will be clamped to the bounds of the items.
     * The item can be removed from the toolbar by setting its parent to `null`.
     */
    insertAfter(at, name, widget) {
        return this._insertRelative(at, 1, name, widget);
    }
    /**
     * Insert an item into the toolbar at the before a target item.
     *
     * @param at - The target item to insert before.
     *
     * @param name - The name of the item.
     *
     * @param widget - The widget to add.
     *
     * @returns Whether the item was added to the toolbar. Returns false if
     *   an item of the same name is already in the toolbar.
     *
     * #### Notes
     * The index will be clamped to the bounds of the items.
     * The item can be removed from the toolbar by setting its parent to `null`.
     */
    insertBefore(at, name, widget) {
        return this._insertRelative(at, 0, name, widget);
    }
    _insertRelative(at, offset, name, widget) {
        const nameWithIndex = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.map)(this.names(), (name, i) => {
            return { name: name, index: i };
        });
        const target = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.find)(nameWithIndex, x => x.name === at);
        if (target) {
            return this.insertItem(target.index + offset, name, widget);
        }
        return false;
    }
    /**
     * Handle the DOM events for the widget.
     *
     * @param event - The DOM event sent to the widget.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the dock panel's node. It should
     * not be called directly by user code.
     */
    handleEvent(event) {
        switch (event.type) {
            case 'click':
                this.handleClick(event);
                break;
            default:
                break;
        }
    }
    /**
     * Handle a DOM click event.
     */
    handleClick(event) {
        // Stop propagating the click outside the toolbar
        event.stopPropagation();
        // Clicking a label focuses the corresponding control
        // that is linked with `for` attribute, so let it be.
        if (event.target instanceof HTMLLabelElement) {
            const forId = event.target.getAttribute('for');
            if (forId && this.node.querySelector(`#${forId}`)) {
                return;
            }
        }
        // If this click already focused a control, let it be.
        if (this.node.contains(document.activeElement)) {
            return;
        }
        // Otherwise, activate the parent widget, which may take focus if desired.
        if (this.parent) {
            this.parent.activate();
        }
    }
    /**
     * Handle `after-attach` messages for the widget.
     */
    onAfterAttach(msg) {
        this.node.addEventListener('click', this);
    }
    /**
     * Handle `before-detach` messages for the widget.
     */
    onBeforeDetach(msg) {
        this.node.removeEventListener('click', this);
    }
}
/**
 * A class which provides a toolbar widget.
 */
class ReactiveToolbar extends Toolbar {
    /**
     * Construct a new toolbar widget.
     */
    constructor() {
        super();
        this.popupOpener = new ToolbarPopupOpener();
        this._widgetWidths = {};
        this.insertItem(0, TOOLBAR_OPENER_NAME, this.popupOpener);
        this.popupOpener.hide();
        this._resizer = new _lumino_polling__WEBPACK_IMPORTED_MODULE_8__.Throttler(this._onResize.bind(this), 500);
    }
    /**
     * Dispose of the widget and its descendant widgets.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        if (this._resizer) {
            this._resizer.dispose();
        }
        super.dispose();
    }
    /**
     * Insert an item into the toolbar at the after a target item.
     *
     * @param at - The target item to insert after.
     *
     * @param name - The name of the item.
     *
     * @param widget - The widget to add.
     *
     * @returns Whether the item was added to the toolbar. Returns false if
     *   an item of the same name is already in the toolbar or if the target
     *   is the toolbar pop-up opener.
     *
     * #### Notes
     * The index will be clamped to the bounds of the items.
     * The item can be removed from the toolbar by setting its parent to `null`.
     */
    insertAfter(at, name, widget) {
        if (at === TOOLBAR_OPENER_NAME) {
            return false;
        }
        return super.insertAfter(at, name, widget);
    }
    /**
     * Insert an item into the toolbar at the specified index.
     *
     * @param index - The index at which to insert the item.
     *
     * @param name - The name of the item.
     *
     * @param widget - The widget to add.
     *
     * @returns Whether the item was added to the toolbar. Returns false if
     *   an item of the same name is already in the toolbar.
     *
     * #### Notes
     * The index will be clamped to the bounds of the items.
     * The item can be removed from the toolbar by setting its parent to `null`.
     */
    insertItem(index, name, widget) {
        if (widget instanceof ToolbarPopupOpener) {
            return super.insertItem(index, name, widget);
        }
        else {
            const j = Math.max(0, Math.min(index, this.layout.widgets.length - 1));
            return super.insertItem(j, name, widget);
        }
    }
    /**
     * A message handler invoked on a `'before-hide'` message.
     *
     * It will hide the pop-up panel
     */
    onBeforeHide(msg) {
        this.popupOpener.hidePopup();
        super.onBeforeHide(msg);
    }
    onResize(msg) {
        super.onResize(msg);
        if (msg.width > 0 && this._resizer) {
            void this._resizer.invoke();
        }
    }
    _onResize() {
        if (this.parent && this.parent.isAttached) {
            const toolbarWidth = this.node.clientWidth;
            const opener = this.popupOpener;
            const openerWidth = 30;
            const toolbarPadding = 2;
            const layout = this.layout;
            let width = opener.isHidden
                ? toolbarPadding
                : toolbarPadding + openerWidth;
            let index = 0;
            const widgetsToRemove = [];
            const toIndex = layout.widgets.length - 1;
            while (index < toIndex) {
                const widget = layout.widgets[index];
                this._saveWidgetWidth(widget);
                width += this._getWidgetWidth(widget);
                if (widgetsToRemove.length === 0 &&
                    opener.isHidden &&
                    width + openerWidth > toolbarWidth) {
                    width += openerWidth;
                }
                if (width > toolbarWidth) {
                    widgetsToRemove.push(widget);
                }
                index++;
            }
            while (widgetsToRemove.length > 0) {
                const widget = widgetsToRemove.pop();
                width -= this._getWidgetWidth(widget);
                opener.addWidget(widget);
            }
            if (opener.widgetCount() > 0) {
                const widgetsToAdd = [];
                let index = 0;
                let widget = opener.widgetAt(index);
                const widgetCount = opener.widgetCount();
                width += this._getWidgetWidth(widget);
                if (widgetCount === 1 && width - openerWidth <= toolbarWidth) {
                    width -= openerWidth;
                }
                while (width < toolbarWidth && index < widgetCount) {
                    widgetsToAdd.push(widget);
                    index++;
                    widget = opener.widgetAt(index);
                    if (widget) {
                        width += this._getWidgetWidth(widget);
                    }
                    else {
                        break;
                    }
                }
                while (widgetsToAdd.length > 0) {
                    const widget = widgetsToAdd.shift();
                    this.addItem(Private.nameProperty.get(widget), widget);
                }
            }
            if (opener.widgetCount() > 0) {
                opener.updatePopup();
                opener.show();
            }
            else {
                opener.hide();
            }
        }
    }
    _saveWidgetWidth(widget) {
        const widgetName = Private.nameProperty.get(widget);
        this._widgetWidths[widgetName] = widget.hasClass(TOOLBAR_SPACER_CLASS)
            ? 2
            : widget.node.clientWidth;
    }
    _getWidgetWidth(widget) {
        const widgetName = Private.nameProperty.get(widget);
        return this._widgetWidths[widgetName];
    }
}
/**
 * The namespace for Toolbar class statics.
 */
(function (Toolbar) {
    /**
     * Create an interrupt toolbar item.
     *
     * @deprecated since version v3.2
     * This is dead code now.
     */
    function createInterruptButton(sessionContext, translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator;
        const trans = translator.load('jupyterlab');
        return new ToolbarButton({
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.stopIcon,
            onClick: () => {
                var _a, _b;
                void ((_b = (_a = sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel) === null || _b === void 0 ? void 0 : _b.interrupt());
            },
            tooltip: trans.__('Interrupt the kernel')
        });
    }
    Toolbar.createInterruptButton = createInterruptButton;
    /**
     * Create a restart toolbar item.
     *
     * @deprecated since v3.2
     * This is dead code now.
     */
    function createRestartButton(sessionContext, dialogs, translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator;
        const trans = translator.load('jupyterlab');
        return new ToolbarButton({
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.refreshIcon,
            onClick: () => {
                void (dialogs !== null && dialogs !== void 0 ? dialogs : _sessioncontext__WEBPACK_IMPORTED_MODULE_9__.sessionContextDialogs).restart(sessionContext, translator);
            },
            tooltip: trans.__('Restart the kernel')
        });
    }
    Toolbar.createRestartButton = createRestartButton;
    /**
     * Create a toolbar spacer item.
     *
     * #### Notes
     * It is a flex spacer that separates the left toolbar items
     * from the right toolbar items.
     */
    function createSpacerItem() {
        return new Private.Spacer();
    }
    Toolbar.createSpacerItem = createSpacerItem;
    /**
     * Create a kernel name indicator item.
     *
     * #### Notes
     * It will display the `'display_name`' of the session context. It can
     * handle a change in context or kernel.
     */
    function createKernelNameItem(sessionContext, dialogs, translator) {
        const el = _vdom__WEBPACK_IMPORTED_MODULE_10__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_7__.createElement(Private.KernelNameComponent, { sessionContext: sessionContext, dialogs: dialogs !== null && dialogs !== void 0 ? dialogs : _sessioncontext__WEBPACK_IMPORTED_MODULE_9__.sessionContextDialogs, translator: translator }));
        el.addClass('jp-KernelName');
        return el;
    }
    Toolbar.createKernelNameItem = createKernelNameItem;
    /**
     * Create a kernel status indicator item.
     *
     * #### Notes
     * It will show a busy status if the kernel status is busy.
     * It will show the current status in the node title.
     * It can handle a change to the context or the kernel.
     */
    function createKernelStatusItem(sessionContext, translator) {
        return new Private.KernelStatus(sessionContext, translator);
    }
    Toolbar.createKernelStatusItem = createKernelStatusItem;
})(Toolbar || (Toolbar = {}));
/**
 * React component for a toolbar button.
 *
 * @param props - The props for ToolbarButtonComponent.
 */
function ToolbarButtonComponent(props) {
    var _a, _b;
    // In some browsers, a button click event moves the focus from the main
    // content to the button (see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus).
    // We avoid a click event by calling preventDefault in mousedown, and
    // we bind the button action to `mousedown`.
    const handleMouseDown = (event) => {
        var _a;
        // Fire action only when left button is pressed.
        if (event.button === 0) {
            event.preventDefault();
            (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props);
        }
    };
    const handleKeyDown = (event) => {
        var _a;
        const { key } = event;
        if (key === 'Enter' || key === ' ') {
            (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props);
        }
    };
    const handleClick = (event) => {
        var _a;
        if (event.button === 0) {
            (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props);
        }
    };
    const getTooltip = () => {
        if (props.enabled === false && props.disabledTooltip) {
            return props.disabledTooltip;
        }
        else if (props.pressed && props.pressedTooltip) {
            return props.pressedTooltip;
        }
        else {
            return props.tooltip || props.iconLabel;
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_7__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.Button, Object.assign({ className: props.className
            ? props.className + ' jp-ToolbarButtonComponent'
            : 'jp-ToolbarButtonComponent', "aria-pressed": props.pressed, "aria-disabled": props.enabled === false }, props.dataset, { disabled: props.enabled === false, onClick: ((_a = props.actualOnClick) !== null && _a !== void 0 ? _a : false) ? handleClick : undefined, onMouseDown: !((_b = props.actualOnClick) !== null && _b !== void 0 ? _b : false) ? handleMouseDown : undefined, onKeyDown: handleKeyDown, title: getTooltip(), minimal: true }),
        (props.icon || props.iconClass) && (react__WEBPACK_IMPORTED_MODULE_7__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.LabIcon.resolveReact, { icon: props.pressed ? props.pressedIcon : props.icon, iconClass: 
            // add some extra classes for proper support of icons-as-css-background
            (0,_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.classes)(props.iconClass, 'jp-Icon'), className: "jp-ToolbarButtonComponent-icon", tag: "span", stylesheet: "toolbarButton" })),
        props.label && (react__WEBPACK_IMPORTED_MODULE_7__.createElement("span", { className: "jp-ToolbarButtonComponent-label" }, props.label))));
}
/**
 * Adds the toolbar button class to the toolbar widget.
 * @param w Toolbar button widget.
 */
function addToolbarButtonClass(w) {
    w.addClass('jp-ToolbarButton');
    return w;
}
/**
 * Phosphor Widget version of static ToolbarButtonComponent.
 */
class ToolbarButton extends _vdom__WEBPACK_IMPORTED_MODULE_10__.ReactWidget {
    /**
     * Creates a toolbar button
     * @param props props for underlying `ToolbarButton` component
     */
    constructor(props = {}) {
        var _a, _b;
        super();
        this.props = props;
        addToolbarButtonClass(this);
        this._enabled = (_a = props.enabled) !== null && _a !== void 0 ? _a : true;
        this._pressed = this._enabled && ((_b = props.pressed) !== null && _b !== void 0 ? _b : false);
        this._onClick = props.onClick;
    }
    /**
     * Sets the pressed state for the button
     * @param value true if button is pressed, false otherwise
     */
    set pressed(value) {
        if (this.enabled && value !== this._pressed) {
            this._pressed = value;
            this.update();
        }
    }
    /**
     * Returns true if button is pressed, false otherwise
     */
    get pressed() {
        return this._pressed;
    }
    /**
     * Sets the enabled state for the button
     * @param value true to enable the button, false otherwise
     */
    set enabled(value) {
        if (value != this._enabled) {
            this._enabled = value;
            if (!this._enabled) {
                this._pressed = false;
            }
            this.update();
        }
    }
    /**
     * Returns true if button is enabled, false otherwise
     */
    get enabled() {
        return this._enabled;
    }
    /**
     * Sets the click handler for the button
     * @param value click handler
     */
    set onClick(value) {
        if (value !== this._onClick) {
            this._onClick = value;
            this.update();
        }
    }
    /**
     * Returns the click handler for the button
     */
    get onClick() {
        return this._onClick;
    }
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_7__.createElement(ToolbarButtonComponent, Object.assign({}, this.props, { pressed: this.pressed, enabled: this.enabled, onClick: this.onClick })));
    }
}
/**
 * React component for a toolbar button that wraps a command.
 *
 * This wraps the ToolbarButtonComponent and watches the command registry
 * for changes to the command.
 */
function CommandToolbarButtonComponent(props) {
    return (react__WEBPACK_IMPORTED_MODULE_7__.createElement(_vdom__WEBPACK_IMPORTED_MODULE_10__.UseSignal, { signal: props.commands.commandChanged, shouldUpdate: (sender, args) => (args.id === props.id && args.type === 'changed') ||
            args.type === 'many-changed' }, () => react__WEBPACK_IMPORTED_MODULE_7__.createElement(ToolbarButtonComponent, Object.assign({}, Private.propsFromCommand(props)))));
}
/*
 * Adds the command toolbar button class to the command toolbar widget.
 * @param w Command toolbar button widget.
 */
function addCommandToolbarButtonClass(w) {
    w.addClass('jp-CommandToolbarButton');
    return w;
}
/**
 * Phosphor Widget version of CommandToolbarButtonComponent.
 */
class CommandToolbarButton extends _vdom__WEBPACK_IMPORTED_MODULE_10__.ReactWidget {
    /**
     * Creates a command toolbar button
     * @param props props for underlying `CommandToolbarButtonComponent` component
     */
    constructor(props) {
        super();
        this.props = props;
        addCommandToolbarButtonClass(this);
    }
    render() {
        return react__WEBPACK_IMPORTED_MODULE_7__.createElement(CommandToolbarButtonComponent, Object.assign({}, this.props));
    }
}
/**
 *  A class which provides a toolbar popup
 *  used to store widgets that don't fit
 *  in the toolbar when it is resized
 */
class ToolbarPopup extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Widget {
    /**
     *  Construct a new ToolbarPopup
     */
    constructor() {
        super();
        this.width = 0;
        this.addClass('jp-Toolbar-responsive-popup');
        this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.PanelLayout();
        _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Widget.attach(this, document.body);
        this.hide();
    }
    /**
     * Updates the width of the popup, this
     * should match with the toolbar width
     *
     * @param width - The width to resize to
     * @protected
     */
    updateWidth(width) {
        if (width > 0) {
            this.width = width;
            this.node.style.width = `${width}px`;
        }
    }
    /**
     * Aligns the popup to left bottom of widget
     *
     * @param widget the widget to align to
     * @private
     */
    alignTo(widget) {
        const { height: widgetHeight, width: widgetWidth, x: widgetX, y: widgetY } = widget.node.getBoundingClientRect();
        const width = this.width;
        this.node.style.left = `${widgetX + widgetWidth - width + 1}px`;
        this.node.style.top = `${widgetY + widgetHeight + 1}px`;
    }
    /**
     * Inserts the widget at specified index
     * @param index the index
     * @param widget widget to add
     */
    insertWidget(index, widget) {
        this.layout.insertWidget(0, widget);
    }
    /**
     *  Total number of widgets in the popup
     */
    widgetCount() {
        return this.layout.widgets.length;
    }
    /**
     * Returns the widget at index
     * @param index the index
     */
    widgetAt(index) {
        return this.layout.widgets[index];
    }
}
/**
 *  A class that provides a ToolbarPopupOpener,
 *  which is a button added to toolbar when
 *  the toolbar items overflow toolbar width
 */
class ToolbarPopupOpener extends ToolbarButton {
    /**
     *  Create a new popup opener
     */
    constructor() {
        super({
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.ellipsesIcon,
            onClick: () => {
                this.handleClick();
            }
        });
        this.addClass('jp-Toolbar-responsive-opener');
        this.popup = new ToolbarPopup();
    }
    /**
     * Add widget to the popup, prepends widgets
     * @param widget the widget to add
     */
    addWidget(widget) {
        this.popup.insertWidget(0, widget);
    }
    /**
     * Dispose of the widget and its descendant widgets.
     *
     * #### Notes
     * It is unsafe to use the widget after it has been disposed.
     *
     * All calls made to this method after the first are a no-op.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this.popup.dispose();
        super.dispose();
    }
    /**
     * Hides the opener and the popup
     */
    hide() {
        super.hide();
        this.hidePopup();
    }
    /**
     * Hides the popup
     */
    hidePopup() {
        this.popup.hide();
    }
    /**
     *  Updates width and position of the popup
     *  to align with the toolbar
     */
    updatePopup() {
        this.popup.updateWidth(this.parent.node.clientWidth);
        this.popup.alignTo(this.parent);
    }
    /**
     * Returns widget at index in the popup
     * @param index
     */
    widgetAt(index) {
        return this.popup.widgetAt(index);
    }
    /**
     * Returns total number of widgets in the popup
     *
     * @returns Number of widgets
     */
    widgetCount() {
        return this.popup.widgetCount();
    }
    handleClick() {
        this.updatePopup();
        this.popup.setHidden(!this.popup.isHidden);
    }
}
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    function propsFromCommand(options) {
        var _a, _b;
        const { commands, id, args } = options;
        const iconClass = commands.iconClass(id, args);
        const iconLabel = commands.iconLabel(id, args);
        // DEPRECATED: remove _icon when lumino 2.0 is adopted
        // if icon is aliasing iconClass, don't use it
        const _icon = (_a = options.icon) !== null && _a !== void 0 ? _a : commands.icon(id, args);
        const icon = _icon === iconClass ? undefined : _icon;
        const label = commands.label(id, args);
        let className = commands.className(id, args);
        // Add the boolean state classes.
        if (commands.isToggled(id, args)) {
            className += ' lm-mod-toggled';
        }
        if (!commands.isVisible(id, args)) {
            className += ' lm-mod-hidden';
        }
        let tooltip = commands.caption(id, args) || options.label || label || iconLabel;
        // Shows hot keys in tooltips
        const binding = commands.keyBindings.find(b => b.command === id);
        if (binding) {
            const ks = _lumino_commands__WEBPACK_IMPORTED_MODULE_3__.CommandRegistry.formatKeystroke(binding.keys.join(' '));
            tooltip = `${tooltip} (${ks})`;
        }
        const onClick = () => {
            void commands.execute(id, args);
        };
        const enabled = commands.isEnabled(id, args);
        return {
            className,
            dataset: { 'data-command': options.id },
            icon,
            iconClass,
            tooltip,
            onClick,
            enabled,
            label: (_b = options.label) !== null && _b !== void 0 ? _b : label
        };
    }
    Private.propsFromCommand = propsFromCommand;
    /**
     * An attached property for the name of a toolbar item.
     */
    Private.nameProperty = new _lumino_properties__WEBPACK_IMPORTED_MODULE_5__.AttachedProperty({
        name: 'name',
        create: () => ''
    });
    /**
     * A no-op function.
     */
    function noOp() {
        /* no-op */
    }
    Private.noOp = noOp;
    /**
     * A spacer widget.
     */
    class Spacer extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Widget {
        /**
         * Construct a new spacer widget.
         */
        constructor() {
            super();
            this.addClass(TOOLBAR_SPACER_CLASS);
        }
    }
    Private.Spacer = Spacer;
    /**
     * React component for a kernel name button.
     *
     * This wraps the ToolbarButtonComponent and watches the kernel
     * session for changes.
     */
    function KernelNameComponent(props) {
        const translator = props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator;
        const trans = translator.load('jupyterlab');
        const callback = () => {
            void props.dialogs.selectKernel(props.sessionContext, translator);
        };
        return (react__WEBPACK_IMPORTED_MODULE_7__.createElement(_vdom__WEBPACK_IMPORTED_MODULE_10__.UseSignal, { signal: props.sessionContext.kernelChanged, initialSender: props.sessionContext }, sessionContext => (react__WEBPACK_IMPORTED_MODULE_7__.createElement(ToolbarButtonComponent, { className: TOOLBAR_KERNEL_NAME_CLASS, onClick: callback, tooltip: trans.__('Switch kernel'), label: sessionContext === null || sessionContext === void 0 ? void 0 : sessionContext.kernelDisplayName }))));
    }
    Private.KernelNameComponent = KernelNameComponent;
    /**
     * A toolbar item that displays kernel status.
     */
    class KernelStatus extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Widget {
        /**
         * Construct a new kernel status widget.
         */
        constructor(sessionContext, translator) {
            super();
            this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator;
            this._trans = this.translator.load('jupyterlab');
            this.addClass(TOOLBAR_KERNEL_STATUS_CLASS);
            this._statusNames = (0,_kernelstatuses__WEBPACK_IMPORTED_MODULE_11__.translateKernelStatuses)(this.translator);
            this._onStatusChanged(sessionContext);
            sessionContext.statusChanged.connect(this._onStatusChanged, this);
            sessionContext.connectionStatusChanged.connect(this._onStatusChanged, this);
        }
        /**
         * Handle a status on a kernel.
         */
        _onStatusChanged(sessionContext) {
            if (this.isDisposed) {
                return;
            }
            const status = sessionContext.kernelDisplayStatus;
            const circleIconProps = {
                container: this.node,
                title: this._trans.__('Kernel %1', this._statusNames[status] || status),
                stylesheet: 'toolbarButton',
                alignSelf: 'normal',
                height: '24px'
            };
            // set the icon
            _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.LabIcon.remove(this.node);
            if (status === 'busy' ||
                status === 'starting' ||
                status === 'terminating' ||
                status === 'restarting' ||
                status === 'initializing') {
                _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.circleIcon.element(circleIconProps);
            }
            else if (status === 'connecting' ||
                status === 'disconnected' ||
                status === 'unknown') {
                _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.offlineBoltIcon.element(circleIconProps);
            }
            else {
                _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.circleEmptyIcon.element(circleIconProps);
            }
        }
    }
    Private.KernelStatus = KernelStatus;
})(Private || (Private = {}));
//# sourceMappingURL=widget.js.map

/***/ }),

/***/ "../../packages/apputils/lib/vdom.js":
/*!*******************************************!*\
  !*** ../../packages/apputils/lib/vdom.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactWidget": () => (/* binding */ ReactWidget),
/* harmony export */   "VDomRenderer": () => (/* binding */ VDomRenderer),
/* harmony export */   "UseSignal": () => (/* binding */ UseSignal),
/* harmony export */   "VDomModel": () => (/* binding */ VDomModel)
/* harmony export */ });
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/messaging */ "webpack/sharing/consume/default/@lumino/messaging/@lumino/messaging?790d");
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_messaging__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom */ "webpack/sharing/consume/default/react-dom/react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_4__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.





/**
 * An abstract class for a Phosphor widget which renders a React component.
 */
class ReactWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget {
    /**
     * Creates a new `ReactWidget` that renders a constant element.
     * @param element React element to render.
     */
    static create(element) {
        return new (class extends ReactWidget {
            render() {
                return element;
            }
        })();
    }
    /**
     * Called to update the state of the widget.
     *
     * The default implementation of this method triggers
     * VDOM based rendering by calling the `renderDOM` method.
     */
    onUpdateRequest(msg) {
        this.renderPromise = this.renderDOM();
    }
    /**
     * Called after the widget is attached to the DOM
     */
    onAfterAttach(msg) {
        // Make *sure* the widget is rendered.
        _lumino_messaging__WEBPACK_IMPORTED_MODULE_0__.MessageLoop.sendMessage(this, _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget.Msg.UpdateRequest);
    }
    /**
     * Called before the widget is detached from the DOM.
     */
    onBeforeDetach(msg) {
        // Unmount the component so it can tear down.
        react_dom__WEBPACK_IMPORTED_MODULE_4__.unmountComponentAtNode(this.node);
    }
    /**
     * Render the React nodes to the DOM.
     *
     * @returns a promise that resolves when the rendering is done.
     */
    renderDOM() {
        return new Promise(resolve => {
            const vnode = this.render();
            // Split up the array/element cases so type inference chooses the right
            // signature.
            if (Array.isArray(vnode)) {
                react_dom__WEBPACK_IMPORTED_MODULE_4__.render(vnode, this.node, resolve);
            }
            else if (vnode) {
                react_dom__WEBPACK_IMPORTED_MODULE_4__.render(vnode, this.node, resolve);
            }
        });
    }
}
/**
 * An abstract ReactWidget with a model.
 */
class VDomRenderer extends ReactWidget {
    /**
     * Create a new VDomRenderer
     */
    constructor(model) {
        super();
        this._modelChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
        this.model = (model !== null && model !== void 0 ? model : null);
    }
    /**
     * A signal emitted when the model changes.
     */
    get modelChanged() {
        return this._modelChanged;
    }
    /**
     * Set the model and fire changed signals.
     */
    set model(newValue) {
        if (this._model === newValue) {
            return;
        }
        if (this._model) {
            this._model.stateChanged.disconnect(this.update, this);
        }
        this._model = newValue;
        if (newValue) {
            newValue.stateChanged.connect(this.update, this);
        }
        this.update();
        this._modelChanged.emit(void 0);
    }
    /**
     * Get the current model.
     */
    get model() {
        return this._model;
    }
    /**
     * Dispose this widget.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._model = null;
        super.dispose();
    }
}
/**
 * UseSignal provides a way to hook up a Phosphor signal to a React element,
 * so that the element is re-rendered every time the signal fires.
 *
 * It is implemented through the "render props" technique, using the `children`
 * prop as a function to render, so that it can be used either as a prop or as a child
 * of this element
 * https://reactjs.org/docs/render-props.html
 *
 *
 * Example as child:
 *
 * ```
 * function LiveButton(isActiveSignal: ISignal<any, boolean>) {
 *  return (
 *    <UseSignal signal={isActiveSignal} initialArgs={True}>
 *     {(_, isActive) => <Button isActive={isActive}>}
 *    </UseSignal>
 *  )
 * }
 * ```
 *
 * Example as prop:
 *
 * ```
 * function LiveButton(isActiveSignal: ISignal<any, boolean>) {
 *  return (
 *    <UseSignal
 *      signal={isActiveSignal}
 *      initialArgs={True}
 *      children={(_, isActive) => <Button isActive={isActive}>}
 *    />
 *  )
 * }
 * ```
 */
class UseSignal extends react__WEBPACK_IMPORTED_MODULE_3__.Component {
    constructor(props) {
        super(props);
        this.slot = (sender, args) => {
            // skip setting new state if we have a shouldUpdate function and it returns false
            if (this.props.shouldUpdate && !this.props.shouldUpdate(sender, args)) {
                return;
            }
            this.setState({ value: [sender, args] });
        };
        this.state = { value: [this.props.initialSender, this.props.initialArgs] };
    }
    componentDidMount() {
        this.props.signal.connect(this.slot);
    }
    componentWillUnmount() {
        this.props.signal.disconnect(this.slot);
    }
    render() {
        return this.props.children(...this.state.value);
    }
}
/**
 * Concrete implementation of VDomRenderer model.
 */
class VDomModel {
    constructor() {
        /**
         * A signal emitted when any model state changes.
         */
        this.stateChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
        this._isDisposed = false;
    }
    /**
     * Test whether the model is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose the model.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal.clearData(this);
    }
}
//# sourceMappingURL=vdom.js.map

/***/ }),

/***/ "../../packages/apputils/lib/widgettracker.js":
/*!****************************************************!*\
  !*** ../../packages/apputils/lib/widgettracker.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WidgetTracker": () => (/* binding */ WidgetTracker)
/* harmony export */ });
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/statedb */ "webpack/sharing/consume/default/@jupyterlab/statedb/@jupyterlab/statedb");
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * A class that keeps track of widget instances on an Application shell.
 *
 * @typeparam T - The type of widget being tracked. Defaults to `Widget`.
 *
 * #### Notes
 * The API surface area of this concrete implementation is substantially larger
 * than the widget tracker interface it implements. The interface is intended
 * for export by JupyterLab plugins that create widgets and have clients who may
 * wish to keep track of newly created widgets. This class, however, can be used
 * internally by plugins to restore state as well.
 */
class WidgetTracker {
    /**
     * Create a new widget tracker.
     *
     * @param options - The instantiation options for a widget tracker.
     */
    constructor(options) {
        this._currentChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
        this._isDisposed = false;
        this._widgetAdded = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
        this._widgetUpdated = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
        const focus = (this._focusTracker = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.FocusTracker());
        const pool = (this._pool = new _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__.RestorablePool(options));
        this.namespace = options.namespace;
        focus.currentChanged.connect((_, current) => {
            if (current.newValue !== this.currentWidget) {
                pool.current = current.newValue;
            }
        }, this);
        pool.added.connect((_, widget) => {
            this._widgetAdded.emit(widget);
        }, this);
        pool.currentChanged.connect((_, widget) => {
            // If the pool's current reference is `null` but the focus tracker has a
            // current widget, update the pool to match the focus tracker.
            if (widget === null && focus.currentWidget) {
                pool.current = focus.currentWidget;
                return;
            }
            this.onCurrentChanged(widget);
            this._currentChanged.emit(widget);
        }, this);
        pool.updated.connect((_, widget) => {
            this._widgetUpdated.emit(widget);
        }, this);
    }
    /**
     * A signal emitted when the current widget changes.
     */
    get currentChanged() {
        return this._currentChanged;
    }
    /**
     * The current widget is the most recently focused or added widget.
     *
     * #### Notes
     * It is the most recently focused widget, or the most recently added
     * widget if no widget has taken focus.
     */
    get currentWidget() {
        return this._pool.current || null;
    }
    /**
     * A promise resolved when the tracker has been restored.
     */
    get restored() {
        return this._pool.restored;
    }
    /**
     * The number of widgets held by the tracker.
     */
    get size() {
        return this._pool.size;
    }
    /**
     * A signal emitted when a widget is added.
     *
     * #### Notes
     * This signal will only fire when a widget is added to the tracker. It will
     * not fire if a widget is injected into the tracker.
     */
    get widgetAdded() {
        return this._widgetAdded;
    }
    /**
     * A signal emitted when a widget is updated.
     */
    get widgetUpdated() {
        return this._widgetUpdated;
    }
    /**
     * Add a new widget to the tracker.
     *
     * @param widget - The widget being added.
     *
     * #### Notes
     * The widget passed into the tracker is added synchronously; its existence in
     * the tracker can be checked with the `has()` method. The promise this method
     * returns resolves after the widget has been added and saved to an underlying
     * restoration connector, if one is available.
     *
     * The newly added widget becomes the current widget unless the focus tracker
     * already had a focused widget.
     */
    async add(widget) {
        this._focusTracker.add(widget);
        await this._pool.add(widget);
        if (!this._focusTracker.activeWidget) {
            this._pool.current = widget;
        }
    }
    /**
     * Test whether the tracker is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the tracker.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        this._pool.dispose();
        this._focusTracker.dispose();
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal.clearData(this);
    }
    /**
     * Find the first widget in the tracker that satisfies a filter function.
     *
     * @param - fn The filter function to call on each widget.
     *
     * #### Notes
     * If no widget is found, the value returned is `undefined`.
     */
    find(fn) {
        return this._pool.find(fn);
    }
    /**
     * Iterate through each widget in the tracker.
     *
     * @param fn - The function to call on each widget.
     */
    forEach(fn) {
        return this._pool.forEach(fn);
    }
    /**
     * Filter the widgets in the tracker based on a predicate.
     *
     * @param fn - The function by which to filter.
     */
    filter(fn) {
        return this._pool.filter(fn);
    }
    /**
     * Inject a foreign widget into the widget tracker.
     *
     * @param widget - The widget to inject into the tracker.
     *
     * #### Notes
     * Injected widgets will not have their state saved by the tracker.
     *
     * The primary use case for widget injection is for a plugin that offers a
     * sub-class of an extant plugin to have its instances share the same commands
     * as the parent plugin (since most relevant commands will use the
     * `currentWidget` of the parent plugin's widget tracker). In this situation,
     * the sub-class plugin may well have its own widget tracker for layout and
     * state restoration in addition to injecting its widgets into the parent
     * plugin's widget tracker.
     */
    inject(widget) {
        return this._pool.inject(widget);
    }
    /**
     * Check if this tracker has the specified widget.
     *
     * @param widget - The widget whose existence is being checked.
     */
    has(widget) {
        return this._pool.has(widget);
    }
    /**
     * Restore the widgets in this tracker's namespace.
     *
     * @param options - The configuration options that describe restoration.
     *
     * @returns A promise that resolves when restoration has completed.
     *
     * #### Notes
     * This function should not typically be invoked by client code.
     * Its primary use case is to be invoked by a restorer.
     */
    async restore(options) {
        return this._pool.restore(options);
    }
    /**
     * Save the restore data for a given widget.
     *
     * @param widget - The widget being saved.
     */
    async save(widget) {
        return this._pool.save(widget);
    }
    /**
     * Handle the current change event.
     *
     * #### Notes
     * The default implementation is a no-op.
     */
    onCurrentChanged(value) {
        /* no-op */
    }
}
//# sourceMappingURL=widgettracker.js.map

/***/ }),

/***/ "../../packages/apputils/lib/windowresolver.js":
/*!*****************************************************!*\
  !*** ../../packages/apputils/lib/windowresolver.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IWindowResolver": () => (/* binding */ IWindowResolver),
/* harmony export */   "WindowResolver": () => (/* binding */ WindowResolver)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The default window resolver token.
 */
const IWindowResolver = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/apputils:IWindowResolver');
/**
 * A concrete implementation of a window name resolver.
 */
class WindowResolver {
    /**
     * The resolved window name.
     *
     * #### Notes
     * If the `resolve` promise has not resolved, the behavior is undefined.
     */
    get name() {
        return this._name;
    }
    /**
     * Resolve a window name to use as a handle among shared resources.
     *
     * @param candidate - The potential window name being resolved.
     *
     * #### Notes
     * Typically, the name candidate should be a JupyterLab workspace name or
     * an empty string if there is no workspace.
     *
     * If the returned promise rejects, a window name cannot be resolved without
     * user intervention, which typically means navigation to a new URL.
     */
    resolve(candidate) {
        return Private.resolve(candidate).then(name => {
            this._name = name;
        });
    }
}
/*
 * A namespace for private module data.
 */
var Private;
(function (Private) {
    /**
     * The internal prefix for private local storage keys.
     */
    const PREFIX = '@jupyterlab/statedb:StateDB';
    /**
     * The local storage beacon key.
     */
    const BEACON = `${PREFIX}:beacon`;
    /**
     * The timeout (in ms) to wait for beacon responders.
     *
     * #### Notes
     * This value is a whole number between 200 and 500 in order to prevent
     * perfect timeout collisions between multiple simultaneously opening windows
     * that have the same URL. This is an edge case because multiple windows
     * should not ordinarily share the same URL, but it can be contrived.
     */
    const TIMEOUT = Math.floor(200 + Math.random() * 300);
    /**
     * The local storage window key.
     */
    const WINDOW = `${PREFIX}:window`;
    /**
     * Current beacon request
     *
     * #### Notes
     * We keep track of the current request so that we can ignore our own beacon
     * requests. This is to work around a bug in Safari, where Safari sometimes
     * triggers local storage events for changes made by the current tab. See
     * https://github.com/jupyterlab/jupyterlab/issues/6921#issuecomment-540817283
     * for more details.
     */
    let currentBeaconRequest = null;
    /**
     * A potential preferred default window name.
     */
    let candidate = null;
    /**
     * The window name promise.
     */
    const delegate = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.PromiseDelegate();
    /**
     * The known window names.
     */
    const known = {};
    /**
     * The window name.
     */
    let name = null;
    /**
     * Whether the name resolution has completed.
     */
    let resolved = false;
    /**
     * Start the storage event handler.
     */
    function initialize() {
        // Listen to all storage events for beacons and window names.
        window.addEventListener('storage', (event) => {
            const { key, newValue } = event;
            // All the keys we care about have values.
            if (newValue === null) {
                return;
            }
            // If the beacon was fired, respond with a ping.
            if (key === BEACON &&
                newValue !== currentBeaconRequest &&
                candidate !== null) {
                ping(resolved ? name : candidate);
                return;
            }
            // If the window name is resolved, bail.
            if (resolved || key !== WINDOW) {
                return;
            }
            const reported = newValue.replace(/\-\d+$/, '');
            // Store the reported window name.
            known[reported] = null;
            // If a reported window name and candidate collide, reject the candidate.
            if (!candidate || candidate in known) {
                reject();
            }
        });
    }
    /**
     * Ping peers with payload.
     */
    function ping(payload) {
        if (payload === null) {
            return;
        }
        const { localStorage } = window;
        localStorage.setItem(WINDOW, `${payload}-${new Date().getTime()}`);
    }
    /**
     * Reject the candidate.
     */
    function reject() {
        resolved = true;
        currentBeaconRequest = null;
        delegate.reject(`Window name candidate "${candidate}" already exists`);
    }
    /**
     * Returns a promise that resolves with the window name used for restoration.
     */
    function resolve(potential) {
        if (resolved) {
            return delegate.promise;
        }
        // Set the local candidate.
        candidate = potential;
        if (candidate in known) {
            reject();
            return delegate.promise;
        }
        const { localStorage, setTimeout } = window;
        // Wait until other windows have reported before claiming the candidate.
        setTimeout(() => {
            if (resolved) {
                return;
            }
            // If the window name has not already been resolved, check one last time
            // to confirm it is not a duplicate before resolving.
            if (!candidate || candidate in known) {
                return reject();
            }
            resolved = true;
            currentBeaconRequest = null;
            delegate.resolve((name = candidate));
            ping(name);
        }, TIMEOUT);
        // Fire the beacon to collect other windows' names.
        currentBeaconRequest = `${Math.random()}-${new Date().getTime()}`;
        localStorage.setItem(BEACON, currentBeaconRequest);
        return delegate.promise;
    }
    Private.resolve = resolve;
    // Initialize the storage listener at runtime.
    (() => {
        initialize();
    })();
})(Private || (Private = {}));
//# sourceMappingURL=windowresolver.js.map

/***/ }),

/***/ "?49ab":
/*!**************************************!*\
  !*** ./terminal-highlight (ignored) ***!
  \**************************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?2013":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?5f65":
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?62b2":
/*!*******************************!*\
  !*** source-map-js (ignored) ***!
  \*******************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?4877":
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwdXRpbHMvbGliL2NsaXBib2FyZC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwdXRpbHMvbGliL2NvbGxhcHNlLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9hcHB1dGlscy9saWIvY29tbWFuZGxpbmtlci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwdXRpbHMvbGliL2NvbW1hbmRwYWxldHRlLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9hcHB1dGlscy9saWIvZGlhbG9nLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9hcHB1dGlscy9saWIvZG9tdXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2FwcHV0aWxzL2xpYi9ob3ZlcmJveC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwdXRpbHMvbGliL2lmcmFtZS5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwdXRpbHMvbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9hcHB1dGlscy9saWIvaW5wdXRkaWFsb2cuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2FwcHV0aWxzL2xpYi9rZXJuZWxzdGF0dXNlcy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwdXRpbHMvbGliL21haW5hcmVhd2lkZ2V0LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9hcHB1dGlscy9saWIvbWVudWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2FwcHV0aWxzL2xpYi9wcmludGluZy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwdXRpbHMvbGliL3Nhbml0aXplci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwdXRpbHMvbGliL3NlYXJjaC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwdXRpbHMvbGliL3Nlc3Npb25jb250ZXh0LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9hcHB1dGlscy9saWIvc3Bpbm5lci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwdXRpbHMvbGliL3NwbGFzaC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwdXRpbHMvbGliL3N0eWxpbmcuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2FwcHV0aWxzL2xpYi90aGVtZW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2FwcHV0aWxzL2xpYi90b2tlbnMuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2FwcHV0aWxzL2xpYi90b29sYmFyL2ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2FwcHV0aWxzL2xpYi90b29sYmFyL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9hcHB1dGlscy9saWIvdG9vbGJhci9yZWdpc3RyeS5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwdXRpbHMvbGliL3Rvb2xiYXIvd2lkZ2V0LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9hcHB1dGlscy9saWIvdmRvbS5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwdXRpbHMvbGliL3dpZGdldHRyYWNrZXIuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2FwcHV0aWxzL2xpYi93aW5kb3dyZXNvbHZlci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvaWdub3JlZHwvb3B0L2p1cHl0ZXJsYWIvbm9kZV9tb2R1bGVzL3Nhbml0aXplLWh0bWwvbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGlifC4vdGVybWluYWwtaGlnaGxpZ2h0Iiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC9pZ25vcmVkfC9vcHQvanVweXRlcmxhYi9ub2RlX21vZHVsZXMvc2FuaXRpemUtaHRtbC9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWJ8ZnMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wL2lnbm9yZWR8L29wdC9qdXB5dGVybGFiL25vZGVfbW9kdWxlcy9zYW5pdGl6ZS1odG1sL25vZGVfbW9kdWxlcy9wb3N0Y3NzL2xpYnxwYXRoIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC9pZ25vcmVkfC9vcHQvanVweXRlcmxhYi9ub2RlX21vZHVsZXMvc2FuaXRpemUtaHRtbC9ub2RlX21vZHVsZXMvcG9zdGNzcy9saWJ8c291cmNlLW1hcC1qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvaWdub3JlZHwvb3B0L2p1cHl0ZXJsYWIvbm9kZV9tb2R1bGVzL3Nhbml0aXplLWh0bWwvbm9kZV9tb2R1bGVzL3Bvc3Rjc3MvbGlifHVybCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQzZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RkFBOEYsU0FBUztBQUN2RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsU0FBUztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw4QkFBOEI7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJC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QztBQUNyRjtBQUNBLFlBQVksMERBQWE7QUFDekI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxPQUFPO0FBQ2pFLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtEQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsdURBQUk7QUFDMUI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLG1EQUFtRCxRQUFRO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDhCQUE4QjtBQUM3QyxlQUFlLDRDQUE0QztBQUMzRCxtQ0FBbUMsbUVBQWM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdURBQUk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsWUFBWSx1REFBSTtBQUNoQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFlBQVksdURBQUk7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsbUVBQWM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxtRUFBYztBQUNqRDtBQUNBO0FBQ0EsNENBQTRDLG1FQUFnQjtBQUM1RDtBQUNBLHVDQUF1Qyx1RUFBdUU7QUFDOUc7QUFDQSxlQUFlLGtCQUFrQixHQUFHLGFBQWE7QUFDakQsbUJBQW1CLGtCQUFrQixHQUFHLFlBQVk7QUFDcEQsbUJBQW1CLHlCQUF5QixHQUFHLFlBQVk7QUFDM0QsbUJBQW1CLHVCQUF1QixHQUFHLGlFQUFpRTtBQUM5RztBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0IsMEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QztBQUN6QztBQUNBO0FBQ0E7QUFDTyxzQkFBc0IsbURBQU07QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JBO0FBQ0E7QUFDMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDTywwQkFBMEIsb0RBQUs7QUFDdEMsa0M7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUMrRDtBQUMvRDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGlGQUEwQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLENBQUMsMEJBQTBCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0IsbUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkdBO0FBQ0E7QUFDK0M7QUFDVTtBQUNoQjtBQUNlO0FBQ2I7QUFDRztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMscURBQU07QUFDdkMsZUFBZSx5QkFBeUI7QUFDeEMsZ0RBQWdELG1FQUFjO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpSkFBaUosSUFBSTtBQUNySjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlFQUFjLFNBQVMsOERBQVc7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLHFEQUFxRCxLQUFLO0FBQzFELGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLElBQUk7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0UsSUFBSTtBQUMxRTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsSUFBSSxXQUFXLElBQUk7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixJQUFJLFdBQVcsSUFBSSxZQUFZLEtBQUs7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0EsNERBQTRELEtBQUs7QUFDakU7QUFDQTtBQUNBLG1CQUFtQixrRUFBa0I7QUFDckM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZFQUE2RSxxQkFBcUIsZUFBZTtBQUNqSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHdCQUF3QixFQUFFLFNBQVM7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxNQUFNLGtCQUFrQixTQUFTO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGtFQUFrQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSxRQUFRLGdGQUFnRixFQUFFO0FBQzFKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG1EQUFVO0FBQ3ZCO0FBQ0E7QUFDQSxzQkFBc0Isb0RBQWUsRUFBRSw4QkFBOEI7QUFDckUsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVEQUFJO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0Isd0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbllBO0FBQ0E7QUFDMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDTyxtQ0FBbUMsb0RBQUs7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLDBCQUEwQixvREFBSztBQUN0QztBQUNBO0FBQ0E7QUFDTyx1QkFBdUIsb0RBQUs7QUFDbkM7QUFDQTtBQUNBO0FBQ08sbUNBQW1DLG9EQUFLO0FBQy9DLGtDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJ5RDtBQUNLO0FBQ1A7QUFDWDtBQUNHO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG1EQUFVO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLFlBQVksd0RBQW1CO0FBQy9CLFlBQVksb0RBQWUsRUFBRSw0QkFBNEI7QUFDekQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZFQUE2RTtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1JQUFtSTtBQUNuSTtBQUNBO0FBQ0EsU0FBUztBQUNULHFHQUFxRztBQUNyRyx1Q0FBdUMsOEZBQXFDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCw4RkFBcUM7QUFDckY7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLCtEQUFnQjtBQUM1QztBQUNBO0FBQ0EsMEdBQTBHLGtEQUFrRDtBQUM1SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLDhGQUFxQztBQUNoRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsMkJBQTJCO0FBQzNCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwrREFBZ0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0lBQXNJO0FBQ3RJLGlCQUFpQixnRUFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLCtEQUFnQjtBQUNyRCwyQ0FBMkMsOEZBQXFDLENBQUMsMERBQU87QUFDeEY7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxzQkFBc0IsbUVBQWM7QUFDcEMsMkJBQTJCLGdFQUFpQjtBQUM1QyxLQUFLO0FBQ0w7QUFDQTtBQUNBLGtFQUFrRSxZQUFZLFFBQVEsU0FBUztBQUMvRixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsbUVBQWM7QUFDMUMsb0JBQW9CLDBEQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLDhCQUE4QixVQUFVO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHFCQUFxQjtBQUM3QztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsOENBQThDLDREQUFTO0FBQ3ZEO0FBQ0EsNEJBQTRCLDBEQUFPO0FBQ25DO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwREFBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxtQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3UjBCO0FBQ0M7QUFDRjtBQUN6QixpQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSG9EO0FBQ1g7QUFDZ0I7QUFDekQ7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix3REFBd0Q7QUFDL0U7QUFDQSw0Q0FBNEMsZ0JBQWdCO0FBQzVELHFDQUFxQyxzRUFBZSxFQUFFLGNBQWM7QUFDcEU7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHlEQUFvQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSx1QkFBdUIsNkRBQXdCO0FBQy9DO0FBQ0EsMkJBQTJCLG1EQUFNO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLG9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkZBO0FBQ0E7QUFDeUQ7QUFDK0Y7QUFDcEc7QUFDRDtBQUNIO0FBQ007QUFDQTtBQUN2QjtBQUMyQjtBQUNFO0FBQ1g7QUFDTDtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHdEQUFXO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix1REFBSTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksc0VBQXVCLHFCQUFxQixrRUFBcUI7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNFQUF1QixjQUFjLHFFQUF3QjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxzQkFBc0IsbURBQU07QUFDbkM7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsc0RBQUc7QUFDbEI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsdURBQUk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsc0RBQUc7QUFDakMsb0JBQW9CO0FBQ3BCLFNBQVM7QUFDVCx1QkFBdUIsdURBQUk7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsTUFBTTtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNEQUFTO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwrREFBZ0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlOQTtBQUNBO0FBQzJEO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ08sNEJBQTRCLG9EQUFLO0FBQ3hDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsT0FBTztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixPQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qiw4REFBZTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUIsd0NBQXdDLFFBQVEsR0FBRyxxQkFBcUI7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsVUFBVTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSwyQkFBMkI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGtDQUFrQyxjQUFjLEdBQUcscUJBQXFCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMsMEJBQTBCO0FBQzNCLDBDOzs7Ozs7Ozs7O0FDMUxBLGU7Ozs7Ozs7Ozs7QUNBQSxlOzs7Ozs7Ozs7O0FDQUEsZTs7Ozs7Ozs7OztBQ0FBLGU7Ozs7Ozs7Ozs7QUNBQSxlIiwiZmlsZSI6InBhY2thZ2VzX2FwcHV0aWxzX2xpYl9pbmRleF9qcy5iZWZhZTNkMmMyODA0ZGU5YjU4YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IE1pbWVEYXRhIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuLyoqXG4gKiBUaGUgY2xpcGJvYXJkIGludGVyZmFjZS5cbiAqL1xuZXhwb3J0IHZhciBDbGlwYm9hcmQ7XG4oZnVuY3Rpb24gKENsaXBib2FyZCkge1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYXBwbGljYXRpb24gY2xpcGJvYXJkIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldEluc3RhbmNlKCkge1xuICAgICAgICByZXR1cm4gUHJpdmF0ZS5pbnN0YW5jZTtcbiAgICB9XG4gICAgQ2xpcGJvYXJkLmdldEluc3RhbmNlID0gZ2V0SW5zdGFuY2U7XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBhcHBsaWNhdGlvbiBjbGlwYm9hcmQgaW5zdGFuY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0SW5zdGFuY2UodmFsdWUpIHtcbiAgICAgICAgUHJpdmF0ZS5pbnN0YW5jZSA9IHZhbHVlO1xuICAgIH1cbiAgICBDbGlwYm9hcmQuc2V0SW5zdGFuY2UgPSBzZXRJbnN0YW5jZTtcbiAgICAvKipcbiAgICAgKiBDb3B5IHRleHQgdG8gdGhlIHN5c3RlbSBjbGlwYm9hcmQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBjYW4gb25seSBiZSBjYWxsZWQgaW4gcmVzcG9uc2UgdG8gYSB1c2VyIGlucHV0IGV2ZW50LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvcHlUb1N5c3RlbShjbGlwYm9hcmREYXRhKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gZXZlbnQuY2xpcGJvYXJkRGF0YSB8fCB3aW5kb3cuY2xpcGJvYXJkRGF0YTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2xpcGJvYXJkRGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBkYXRhLnNldERhdGEoJ3RleHQnLCBjbGlwYm9hcmREYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsaXBib2FyZERhdGEudHlwZXMoKS5tYXAoKG1pbWVUeXBlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc2V0RGF0YShtaW1lVHlwZSwgY2xpcGJvYXJkRGF0YS5nZXREYXRhKG1pbWVUeXBlKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjb3B5JywgaGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY29weScsIGhhbmRsZXIpO1xuICAgICAgICBnZW5lcmF0ZUV2ZW50KG5vZGUpO1xuICAgIH1cbiAgICBDbGlwYm9hcmQuY29weVRvU3lzdGVtID0gY29weVRvU3lzdGVtO1xuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIGEgY2xpcGJvYXJkIGV2ZW50IG9uIGEgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIC0gVGhlIGVsZW1lbnQgb24gd2hpY2ggdG8gZ2VuZXJhdGUgdGhlIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCB0byBnZW5lcmF0ZS5cbiAgICAgKiAgIGAncGFzdGUnYCBldmVudHMgY2Fubm90IGJlIHByb2dyYW1tYXRpY2FsbHkgZ2VuZXJhdGVkLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgY2FuIG9ubHkgYmUgY2FsbGVkIGluIHJlc3BvbnNlIHRvIGEgdXNlciBpbnB1dCBldmVudC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZUV2ZW50KG5vZGUsIHR5cGUgPSAnY29weScpIHtcbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTIxMDM2N1xuICAgICAgICAvLyBJZGVudGlmeSBzZWxlY3RlZCB0ZXh0LlxuICAgICAgICBsZXQgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAvLyBTYXZlIHRoZSBjdXJyZW50IHNlbGVjdGlvbi5cbiAgICAgICAgY29uc3Qgc2F2ZWRSYW5nZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IChzZWwgPT09IG51bGwgfHwgc2VsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZWwucmFuZ2VDb3VudCkgfHwgMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICBzYXZlZFJhbmdlc1tpXSA9IHNlbC5nZXRSYW5nZUF0KGkpLmNsb25lUmFuZ2UoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZWxlY3QgdGhlIG5vZGUgY29udGVudC5cbiAgICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMobm9kZSk7XG4gICAgICAgIGlmIChzZWwpIHtcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRXhlY3V0ZSB0aGUgY29tbWFuZC5cbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQodHlwZSk7XG4gICAgICAgIC8vIFJlc3RvcmUgdGhlIHByZXZpb3VzIHNlbGVjdGlvbi5cbiAgICAgICAgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICBpZiAoc2VsKSB7XG4gICAgICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2F2ZWRSYW5nZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgICAgICBzZWwuYWRkUmFuZ2Uoc2F2ZWRSYW5nZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIENsaXBib2FyZC5nZW5lcmF0ZUV2ZW50ID0gZ2VuZXJhdGVFdmVudDtcbn0pKENsaXBib2FyZCB8fCAoQ2xpcGJvYXJkID0ge30pKTtcbi8qKlxuICogVGhlIG5hbWVzcGFjZSBmb3IgbW9kdWxlIHByaXZhdGUgZGF0YS5cbiAqL1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgYXBwbGljYXRpb24gY2xpcGJvYXJkIGluc3RhbmNlLlxuICAgICAqL1xuICAgIFByaXZhdGUuaW5zdGFuY2UgPSBuZXcgTWltZURhdGEoKTtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2xpcGJvYXJkLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IGNhcmV0RG93bkljb24sIGNhcmV0VXBJY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG5pbXBvcnQgeyBQYW5lbCwgUGFuZWxMYXlvdXQsIFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG4vKipcbiAqIEEgcGFuZWwgdGhhdCBzdXBwb3J0cyBhIGNvbGxhcHNpYmxlIGhlYWRlciBtYWRlIGZyb20gdGhlIHdpZGdldCdzIHRpdGxlLlxuICogQ2xpY2tpbmcgb24gdGhlIHRpdGxlIGV4cGFuZHMgb3IgY29udHJhY3RzIHRoZSB3aWRnZXQuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb2xsYXBzZSBleHRlbmRzIFdpZGdldCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fY29sbGFwc2VDaGFuZ2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgY29uc3QgeyB3aWRnZXQsIGNvbGxhcHNlZCA9IHRydWUgfSA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLUNvbGxhcHNlJyk7XG4gICAgICAgIHRoaXMuX2hlYWRlciA9IG5ldyBXaWRnZXQoKTtcbiAgICAgICAgdGhpcy5faGVhZGVyLmFkZENsYXNzKCdqcC1Db2xsYXBzZS1oZWFkZXInKTtcbiAgICAgICAgdGhpcy5fY29udGVudCA9IG5ldyBQYW5lbCgpO1xuICAgICAgICB0aGlzLl9jb250ZW50LmFkZENsYXNzKCdqcC1Db2xsYXBzZS1jb250ZW50cycpO1xuICAgICAgICBjb25zdCBsYXlvdXQgPSBuZXcgUGFuZWxMYXlvdXQoKTtcbiAgICAgICAgdGhpcy5sYXlvdXQgPSBsYXlvdXQ7XG4gICAgICAgIGxheW91dC5hZGRXaWRnZXQodGhpcy5faGVhZGVyKTtcbiAgICAgICAgbGF5b3V0LmFkZFdpZGdldCh0aGlzLl9jb250ZW50KTtcbiAgICAgICAgdGhpcy53aWRnZXQgPSB3aWRnZXQ7XG4gICAgICAgIHRoaXMuY29sbGFwc2VkID0gY29sbGFwc2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgd2lkZ2V0IGluc2lkZSB0aGUgY29sbGFwc2UgcGFuZWwuXG4gICAgICovXG4gICAgZ2V0IHdpZGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZGdldDtcbiAgICB9XG4gICAgc2V0IHdpZGdldCh3aWRnZXQpIHtcbiAgICAgICAgY29uc3Qgb2xkV2lkZ2V0ID0gdGhpcy5fd2lkZ2V0O1xuICAgICAgICBpZiAob2xkV2lkZ2V0KSB7XG4gICAgICAgICAgICBvbGRXaWRnZXQudGl0bGUuY2hhbmdlZC5kaXNjb25uZWN0KHRoaXMuX29uVGl0bGVDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgICAgIG9sZFdpZGdldC5wYXJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3dpZGdldCA9IHdpZGdldDtcbiAgICAgICAgd2lkZ2V0LnRpdGxlLmNoYW5nZWQuY29ubmVjdCh0aGlzLl9vblRpdGxlQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuX29uVGl0bGVDaGFuZ2VkKHdpZGdldC50aXRsZSk7XG4gICAgICAgIHRoaXMuX2NvbnRlbnQuYWRkV2lkZ2V0KHdpZGdldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjb2xsYXBzZWQgc3RhdGUgb2YgdGhlIHBhbmVsLlxuICAgICAqL1xuICAgIGdldCBjb2xsYXBzZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsYXBzZWQ7XG4gICAgfVxuICAgIHNldCBjb2xsYXBzZWQodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLl9jb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxhcHNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl91bmNvbGxhcHNlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZm9yIHdoZW4gdGhlIHdpZGdldCBjb2xsYXBzZSBzdGF0ZSBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGdldCBjb2xsYXBzZUNoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsYXBzZUNoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSB0aGUgY29sbGFwc2Ugc3RhdGUgb2YgdGhlIHBhbmVsLlxuICAgICAqL1xuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZWQgPSAhdGhpcy5jb2xsYXBzZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2UgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gRGVsZXRlIHJlZmVyZW5jZXMgd2UgZXhwbGljaXRseSBob2xkIHRvIG90aGVyIHdpZGdldHMuXG4gICAgICAgIHRoaXMuX2hlYWRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX3dpZGdldCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSBudWxsO1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgRE9NIGV2ZW50cyBmb3IgdGhlIENvbGxhcHNlIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudCAtIFRoZSBET00gZXZlbnQgc2VudCB0byB0aGUgcGFuZWwuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBtZXRob2QgaW1wbGVtZW50cyB0aGUgRE9NIGBFdmVudExpc3RlbmVyYCBpbnRlcmZhY2UgYW5kIGlzXG4gICAgICogY2FsbGVkIGluIHJlc3BvbnNlIHRvIGV2ZW50cyBvbiB0aGUgcGFuZWwncyBET00gbm9kZS4gSXQgc2hvdWxkXG4gICAgICogbm90IGJlIGNhbGxlZCBkaXJlY3RseSBieSB1c2VyIGNvZGUuXG4gICAgICovXG4gICAgaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0Q2xpY2soZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkFmdGVyQXR0YWNoKG1zZykge1xuICAgICAgICB0aGlzLl9oZWFkZXIubm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpO1xuICAgIH1cbiAgICBvbkJlZm9yZURldGFjaChtc2cpIHtcbiAgICAgICAgdGhpcy5faGVhZGVyLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzKTtcbiAgICB9XG4gICAgX2NvbGxhcHNlKCkge1xuICAgICAgICB0aGlzLl9jb2xsYXBzZWQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5fY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5fY29udGVudC5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0SGVhZGVyKCk7XG4gICAgICAgIHRoaXMuX2NvbGxhcHNlQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgfVxuICAgIF91bmNvbGxhcHNlKCkge1xuICAgICAgICB0aGlzLl9jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NldEhlYWRlcigpO1xuICAgICAgICB0aGlzLl9jb2xsYXBzZUNoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgIH1cbiAgICBfZXZ0Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBgY2hhbmdlZGAgc2lnbmFsIG9mIGEgdGl0bGUgb2JqZWN0LlxuICAgICAqL1xuICAgIF9vblRpdGxlQ2hhbmdlZChzZW5kZXIpIHtcbiAgICAgICAgdGhpcy5fc2V0SGVhZGVyKCk7XG4gICAgfVxuICAgIF9zZXRIZWFkZXIoKSB7XG4gICAgICAgICh0aGlzLl9jb2xsYXBzZWQgPyBjYXJldFVwSWNvbiA6IGNhcmV0RG93bkljb24pLmVsZW1lbnQoe1xuICAgICAgICAgICAgY29udGFpbmVyOiB0aGlzLl9oZWFkZXIubm9kZSxcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLl93aWRnZXQudGl0bGUubGFiZWwsXG4gICAgICAgICAgICBlbGVtZW50UG9zaXRpb246ICdyaWdodCcsXG4gICAgICAgICAgICBoZWlnaHQ6ICcyOHB4J1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb2xsYXBzZS5qcy5tYXAiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEpTT05FeHQgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG4vKipcbiAqIFRoZSBjb21tYW5kIGRhdGEgYXR0cmlidXRlIGFkZGVkIHRvIG5vZGVzIHRoYXQgYXJlIGNvbm5lY3RlZC5cbiAqL1xuY29uc3QgQ09NTUFORF9BVFRSID0gJ2NvbW1hbmRsaW5rZXItY29tbWFuZCc7XG4vKipcbiAqIFRoZSBhcmdzIGRhdGEgYXR0cmlidXRlIGFkZGVkIHRvIG5vZGVzIHRoYXQgYXJlIGNvbm5lY3RlZC5cbiAqL1xuY29uc3QgQVJHU19BVFRSID0gJ2NvbW1hbmRsaW5rZXItYXJncyc7XG4vKipcbiAqIEEgc3RhdGljIGNsYXNzIHRoYXQgcHJvdmlkZXMgaGVscGVyIG1ldGhvZHMgdG8gZ2VuZXJhdGUgY2xpY2thYmxlIG5vZGVzIHRoYXRcbiAqIGV4ZWN1dGUgcmVnaXN0ZXJlZCBjb21tYW5kcyB3aXRoIHByZS1wb3B1bGF0ZWQgYXJndW1lbnRzLlxuICovXG5leHBvcnQgY2xhc3MgQ29tbWFuZExpbmtlciB7XG4gICAgLyoqXG4gICAgICogSW5zdGFudGlhdGUgYSBuZXcgY29tbWFuZCBsaW5rZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2NvbW1hbmRzID0gb3B0aW9ucy5jb21tYW5kcztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUZXN0IHdoZXRoZXIgdGhlIGxpbmtlciBpcyBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSBsaW5rZXIuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbm5lY3QgYSBjb21tYW5kL2FyZ3VtZW50IHBhaXIgdG8gYSBnaXZlbiBub2RlIHNvIHRoYXQgd2hlbiBpdCBpcyBjbGlja2VkLFxuICAgICAqIHRoZSBjb21tYW5kIHdpbGwgZXhlY3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIC0gVGhlIG5vZGUgYmVpbmcgY29ubmVjdGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbW1hbmQgLSBUaGUgY29tbWFuZCBJRCB0byBleGVjdXRlIHVwb24gY2xpY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYXJncyAtIFRoZSBhcmd1bWVudHMgd2l0aCB3aGljaCB0byBpbnZva2UgdGhlIGNvbW1hbmQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgc2FtZSBub2RlIHRoYXQgd2FzIHBhc3NlZCBpbiwgYWZ0ZXIgaXQgaGFzIGJlZW4gY29ubmVjdGVkLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIE9ubHkgYGNsaWNrYCBldmVudHMgd2lsbCBleGVjdXRlIHRoZSBjb21tYW5kIG9uIGEgY29ubmVjdGVkIG5vZGUuIFNvLCB0aGVyZVxuICAgICAqIGFyZSB0d28gY29uc2lkZXJhdGlvbnMgdGhhdCBhcmUgcmVsZXZhbnQ6XG4gICAgICogMS4gSWYgYSBub2RlIGlzIGNvbm5lY3RlZCwgdGhlIGRlZmF1bHQgY2xpY2sgYWN0aW9uIHdpbGwgYmUgcHJldmVudGVkLlxuICAgICAqIDIuIFRoZSBgSFRNTEVsZW1lbnRgIHBhc3NlZCBpbiBzaG91bGQgYmUgY2xpY2thYmxlLlxuICAgICAqL1xuICAgIGNvbm5lY3ROb2RlKG5vZGUsIGNvbW1hbmQsIGFyZ3MpIHtcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoYGRhdGEtJHtDT01NQU5EX0FUVFJ9YCwgY29tbWFuZCk7XG4gICAgICAgIGlmIChhcmdzICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGBkYXRhLSR7QVJHU19BVFRSfWAsIEpTT04uc3RyaW5naWZ5KGFyZ3MpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzY29ubmVjdCBhIG5vZGUgdGhhdCBoYXMgYmVlbiBjb25uZWN0ZWQgdG8gZXhlY3V0ZSBhIGNvbW1hbmQgb24gY2xpY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSAtIFRoZSBub2RlIGJlaW5nIGRpc2Nvbm5lY3RlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBzYW1lIG5vZGUgdGhhdCB3YXMgcGFzc2VkIGluLCBhZnRlciBpdCBoYXMgYmVlbiBkaXNjb25uZWN0ZWQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBtZXRob2QgaXMgc2FmZSB0byBjYWxsIG11bHRpcGxlIHRpbWVzIGFuZCBpcyBzYWZlIHRvIGNhbGwgb24gbm9kZXNcbiAgICAgKiB0aGF0IHdlcmUgbmV2ZXIgY29ubmVjdGVkLlxuICAgICAqXG4gICAgICogVGhpcyBtZXRob2QgY2FuIGJlIGNhbGxlZCBvbiByZW5kZXJlZCB2aXJ0dWFsIERPTSBub2RlcyB0aGF0IHdlcmUgcG9wdWxhdGVkXG4gICAgICogdXNpbmcgdGhlIGBwb3B1bGF0ZVZOb2RlRGF0YXNldGAgbWV0aG9kIGluIG9yZGVyIHRvIGRpc2Nvbm5lY3QgdGhlbSBmcm9tXG4gICAgICogZXhlY3V0aW5nIHRoZWlyIGNvbW1hbmQvYXJndW1lbnQgcGFpci5cbiAgICAgKi9cbiAgICBkaXNjb25uZWN0Tm9kZShub2RlKSB7XG4gICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGBkYXRhLSR7Q09NTUFORF9BVFRSfWApO1xuICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShgZGF0YS0ke0FSR1NfQVRUUn1gKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgRE9NIGV2ZW50cyBmb3IgdGhlIGNvbW1hbmQgbGlua2VyIGhlbHBlciBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudCAtIFRoZSBET00gZXZlbnQgc2VudCB0byB0aGUgY2xhc3MuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBtZXRob2QgaW1wbGVtZW50cyB0aGUgRE9NIGBFdmVudExpc3RlbmVyYCBpbnRlcmZhY2UgYW5kIGlzXG4gICAgICogY2FsbGVkIGluIHJlc3BvbnNlIHRvIGV2ZW50cyBvbiB0aGUgcGFuZWwncyBET00gbm9kZS4gSXQgc2hvdWxkXG4gICAgICogbm90IGJlIGNhbGxlZCBkaXJlY3RseSBieSB1c2VyIGNvZGUuXG4gICAgICovXG4gICAgaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0Q2xpY2soZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUG9wdWxhdGUgdGhlIGBkYXRhc2V0YCBhdHRyaWJ1dGUgd2l0aGluIHRoZSBjb2xsZWN0aW9uIG9mIGF0dHJpYnV0ZXMgdXNlZFxuICAgICAqIHRvIGluc3RhbnRpYXRlIGEgdmlydHVhbCBET00gbm9kZSB3aXRoIHRoZSB2YWx1ZXMgbmVjZXNzYXJ5IGZvciBpdHNcbiAgICAgKiByZW5kZXJlZCBET00gbm9kZSB0byByZXNwb25kIHRvIGNsaWNrcyBieSBleGVjdXRpbmcgYSBjb21tYW5kL2FyZ3VtZW50XG4gICAgICogcGFpci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb21tYW5kIC0gVGhlIGNvbW1hbmQgSUQgdG8gZXhlY3V0ZSB1cG9uIGNsaWNrLlxuICAgICAqXG4gICAgICogQHBhcmFtIGFyZ3MgLSBUaGUgYXJndW1lbnRzIHdpdGggd2hpY2ggdG8gaW52b2tlIHRoZSBjb21tYW5kLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBgZGF0YXNldGAgY29sbGVjdGlvbiBmb3IgdXNlIHdpdGhpbiB2aXJ0dWFsIG5vZGUgYXR0cmlidXRlcy5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgcmV0dXJuIHZhbHVlIGNhbiBiZSB1c2VkIG9uIGl0cyBvd24gYXMgdGhlIHZhbHVlIGZvciB0aGUgYGRhdGFzZXRgXG4gICAgICogYXR0cmlidXRlIG9mIGEgdmlydHVhbCBlbGVtZW50LCBvciBpdCBjYW4gYmUgYWRkZWQgdG8gYW4gZXhpc3RpbmcgYGRhdGFzZXRgXG4gICAgICogYXMgaW4gdGhlIGV4YW1wbGUgYmVsb3cuXG4gICAgICpcbiAgICAgKiAjIyMjIEV4YW1wbGVcbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogbGV0IGNvbW1hbmQgPSAnc29tZTpjb21tYW5kLWlkJztcbiAgICAgKiBsZXQgYXJncyA9IHsgYWxwaGE6ICdiZXRhJyB9O1xuICAgICAqIGxldCBhbmNob3IgPSBoLmEoe1xuICAgICAqICAgY2xhc3NOYW1lOiAnc29tZS1jbGFzcycsXG4gICAgICogICBkYXRhc2V0OiB7XG4gICAgICogICAgIGZvbzogJzEnLFxuICAgICAqICAgICBiYXI6ICcyJyxcbiAgICAgKiAgICAgLi4vLi4ubGlua2VyLnBvcHVsYXRlVk5vZGVEYXRhc2V0KGNvbW1hbmQsIGFyZ3MpXG4gICAgICogICB9XG4gICAgICogfSwgJ3NvbWUgdGV4dCcpO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHBvcHVsYXRlVk5vZGVEYXRhc2V0KGNvbW1hbmQsIGFyZ3MpIHtcbiAgICAgICAgbGV0IGRhdGFzZXQ7XG4gICAgICAgIGlmIChhcmdzICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGRhdGFzZXQgPSB7IFtBUkdTX0FUVFJdOiBKU09OLnN0cmluZ2lmeShhcmdzKSwgW0NPTU1BTkRfQVRUUl06IGNvbW1hbmQgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGFzZXQgPSB7IFtDT01NQU5EX0FUVFJdOiBjb21tYW5kIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGFzZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBnbG9iYWwgY2xpY2sgaGFuZGxlciB0aGF0IGRlcGxveXMgY29tbWFuZHMvYXJndW1lbnQgcGFpcnMgdGhhdCBhcmVcbiAgICAgKiBhdHRhY2hlZCB0byB0aGUgbm9kZSBiZWluZyBjbGlja2VkLlxuICAgICAqL1xuICAgIF9ldnRDbGljayhldmVudCkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICB3aGlsZSAodGFyZ2V0ICYmIHRhcmdldC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0Lmhhc0F0dHJpYnV0ZShgZGF0YS0ke0NPTU1BTkRfQVRUUn1gKSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tbWFuZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoYGRhdGEtJHtDT01NQU5EX0FUVFJ9YCk7XG4gICAgICAgICAgICAgICAgaWYgKCFjb21tYW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgYXJnc1ZhbHVlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShgZGF0YS0ke0FSR1NfQVRUUn1gKTtcbiAgICAgICAgICAgICAgICBsZXQgYXJncyA9IEpTT05FeHQuZW1wdHlPYmplY3Q7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3NWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBhcmdzID0gSlNPTi5wYXJzZShhcmdzVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2b2lkIHRoaXMuX2NvbW1hbmRzLmV4ZWN1dGUoY29tbWFuZCwgYXJncyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21tYW5kbGlua2VyLmpzLm1hcCIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxufCBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBQYW5lbCwgV2lkZ2V0IH0gZnJvbSAnQGx1bWluby93aWRnZXRzJztcbmltcG9ydCB7IHNlYXJjaEljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbi8qIHRzbGludDpkaXNhYmxlICovXG4vKipcbiAqIFRoZSBjb21tYW5kIHBhbGV0dGUgdG9rZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBJQ29tbWFuZFBhbGV0dGUgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL2FwcHV0aWxzOklDb21tYW5kUGFsZXR0ZScpO1xuLyoqXG4gKiBDbGFzcyBuYW1lIGlkZW50aWZ5aW5nIHRoZSBpbnB1dCBncm91cCB3aXRoIHNlYXJjaCBpY29uLlxuICovXG5jb25zdCBTRUFSQ0hfSUNPTl9HUk9VUF9DTEFTUyA9ICdqcC1TZWFyY2hJY29uR3JvdXAnO1xuLyoqXG4gKiBXcmFwIHRoZSBjb21tYW5kIHBhbGV0dGUgaW4gYSBtb2RhbCB0byBtYWtlIGl0IG1vcmUgdXNhYmxlLlxuICovXG5leHBvcnQgY2xhc3MgTW9kYWxDb21tYW5kUGFsZXR0ZSBleHRlbmRzIFBhbmVsIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLU1vZGFsQ29tbWFuZFBhbGV0dGUnKTtcbiAgICAgICAgdGhpcy5pZCA9ICdtb2RhbC1jb21tYW5kLXBhbGV0dGUnO1xuICAgICAgICB0aGlzLnBhbGV0dGUgPSBvcHRpb25zLmNvbW1hbmRQYWxldHRlO1xuICAgICAgICB0aGlzLl9jb21tYW5kUGFsZXR0ZS5jb21tYW5kcy5jb21tYW5kRXhlY3V0ZWQuY29ubmVjdCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0F0dGFjaGVkICYmIHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlQW5kUmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHJlcXVpcmVkIHRvIHByb3Blcmx5IHJlY2VpdmUgYmx1ciBhbmQgZm9jdXMgZXZlbnRzO1xuICAgICAgICAvLyBzZWxlY3Rpb24gb2YgaXRlbXMgd2l0aCBtb3VzZSBtYXkgbm90IHdvcmsgd2l0aG91dCB0aGlzLlxuICAgICAgICB0aGlzLm5vZGUudGFiSW5kZXggPSAwO1xuICAgIH1cbiAgICBnZXQgcGFsZXR0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRQYWxldHRlO1xuICAgIH1cbiAgICBzZXQgcGFsZXR0ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9jb21tYW5kUGFsZXR0ZSA9IHZhbHVlO1xuICAgICAgICBpZiAoIXRoaXMuc2VhcmNoSWNvbkdyb3VwKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21tYW5kUGFsZXR0ZS5pbnB1dE5vZGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIHRoaXMuY3JlYXRlU2VhcmNoSWNvbkdyb3VwKCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkV2lkZ2V0KHZhbHVlKTtcbiAgICAgICAgdGhpcy5oaWRlQW5kUmVzZXQoKTtcbiAgICB9XG4gICAgYXR0YWNoKCkge1xuICAgICAgICBXaWRnZXQuYXR0YWNoKHRoaXMsIGRvY3VtZW50LmJvZHkpO1xuICAgIH1cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIFdpZGdldC5kZXRhY2godGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhpZGUgdGhlIG1vZGFsIGNvbW1hbmQgcGFsZXR0ZSBhbmQgcmVzZXQgaXRzIHNlYXJjaC5cbiAgICAgKi9cbiAgICBoaWRlQW5kUmVzZXQoKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB0aGlzLl9jb21tYW5kUGFsZXR0ZS5pbnB1dE5vZGUudmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy5fY29tbWFuZFBhbGV0dGUucmVmcmVzaCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgaW5jb21pbmcgZXZlbnRzLlxuICAgICAqL1xuICAgIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAna2V5ZG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0S2V5ZG93bihldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdibHVyJzoge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBmb2N1cyBzaGlmdGVkIG91dHNpZGUgb2YgdGhpcyBET00gZWxlbWVudCwgaGlkZSBhbmQgcmVzZXQuXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIC8vIGZvY3VzIHdlbnQgYXdheSBmcm9tIGNoaWxkIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY29udGFpbnMoZXZlbnQudGFyZ2V0KSAmJlxuICAgICAgICAgICAgICAgICAgICAvLyBhbmQgaXQgZGlkIE5PVCBnbyB0byBhbm90aGVyIGNoaWxkIGVsZW1lbnQgYnV0IHNvbWVwbGFjZSBlbHNlXG4gICAgICAgICAgICAgICAgICAgICF0aGlzLm5vZGUuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUFuZFJlc2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnY29udGV4dG1lbnUnOlxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmQgdGhlIGVsZW1lbnQgd2l0aCBzZWFyY2ggaWNvbiBncm91cC5cbiAgICAgKi9cbiAgICBnZXQgc2VhcmNoSWNvbkdyb3VwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZFBhbGV0dGUubm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFNFQVJDSF9JQ09OX0dST1VQX0NMQVNTKVswXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGVsZW1lbnQgd2l0aCBzZWFyY2ggaWNvbiBncm91cC5cbiAgICAgKi9cbiAgICBjcmVhdGVTZWFyY2hJY29uR3JvdXAoKSB7XG4gICAgICAgIGNvbnN0IGlucHV0R3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaW5wdXRHcm91cC5jbGFzc0xpc3QuYWRkKFNFQVJDSF9JQ09OX0dST1VQX0NMQVNTKTtcbiAgICAgICAgc2VhcmNoSWNvbi5yZW5kZXIoaW5wdXRHcm91cCk7XG4gICAgICAgIHJldHVybiBpbnB1dEdyb3VwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAgQSBtZXNzYWdlIGhhbmRsZXIgaW52b2tlZCBvbiBhbiBgJ2FmdGVyLWF0dGFjaCdgIG1lc3NhZ2UuXG4gICAgICovXG4gICAgb25BZnRlckF0dGFjaChtc2cpIHtcbiAgICAgICAgdGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcywgdHJ1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqICBBIG1lc3NhZ2UgaGFuZGxlciBpbnZva2VkIG9uIGFuIGAnYWZ0ZXItZGV0YWNoJ2AgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBvbkFmdGVyRGV0YWNoKG1zZykge1xuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMsIHRydWUpO1xuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLCB0cnVlKTtcbiAgICB9XG4gICAgb25CZWZvcmVIaWRlKG1zZykge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcywgdHJ1ZSk7XG4gICAgfVxuICAgIG9uQWZ0ZXJTaG93KG1zZykge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcywgdHJ1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgbWVzc2FnZSBoYW5kbGVyIGludm9rZWQgb24gYW4gYCdhY3RpdmF0ZS1yZXF1ZXN0J2AgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBvbkFjdGl2YXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBdHRhY2hlZCkge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLl9jb21tYW5kUGFsZXR0ZS5hY3RpdmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgYCdrZXlkb3duJ2AgZXZlbnQgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgX2V2dEtleWRvd24oZXZlbnQpIHtcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGVzY2FwZSBrZXlcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIDI3OiAvLyBFc2NhcGUuXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVBbmRSZXNldCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbW1hbmRwYWxldHRlLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IEJ1dHRvbiwgY2xvc2VJY29uLCBMYWJJY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyBBcnJheUV4dCwgZWFjaCwgbWFwLCB0b0FycmF5IH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IHsgUHJvbWlzZURlbGVnYXRlIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgTWVzc2FnZUxvb3AgfSBmcm9tICdAbHVtaW5vL21lc3NhZ2luZyc7XG5pbXBvcnQgeyBQYW5lbCwgUGFuZWxMYXlvdXQsIFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTdHlsaW5nIH0gZnJvbSAnLi9zdHlsaW5nJztcbmltcG9ydCB7IFJlYWN0V2lkZ2V0IH0gZnJvbSAnLi92ZG9tJztcbmltcG9ydCB7IFdpZGdldFRyYWNrZXIgfSBmcm9tICcuL3dpZGdldHRyYWNrZXInO1xuLyoqXG4gKiBDcmVhdGUgYW5kIHNob3cgYSBkaWFsb2cuXG4gKlxuICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgZGlhbG9nIHNldHVwIG9wdGlvbnMuXG4gKlxuICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB3aGV0aGVyIHRoZSBkaWFsb2cgd2FzIGFjY2VwdGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0RpYWxvZyhvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKG9wdGlvbnMpO1xuICAgIHJldHVybiBkaWFsb2cubGF1bmNoKCk7XG59XG4vKipcbiAqIFNob3cgYW4gZXJyb3IgbWVzc2FnZSBkaWFsb2cuXG4gKlxuICogQHBhcmFtIHRpdGxlIC0gVGhlIHRpdGxlIG9mIHRoZSBkaWFsb2cgYm94LlxuICpcbiAqIEBwYXJhbSBlcnJvciAtIHRoZSBlcnJvciB0byBzaG93IGluIHRoZSBkaWFsb2cgYm9keSAoZWl0aGVyIGEgc3RyaW5nXG4gKiAgIG9yIGFuIG9iamVjdCB3aXRoIGEgc3RyaW5nIGBtZXNzYWdlYCBwcm9wZXJ0eSkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3JNZXNzYWdlKHRpdGxlLCBlcnJvciwgYnV0dG9ucyA9IFtcbiAgICBEaWFsb2cub2tCdXR0b24oeyBsYWJlbDogJ0Rpc21pc3MnIH0pXG5dKSB7XG4gICAgY29uc29sZS53YXJuKCdTaG93aW5nIGVycm9yOicsIGVycm9yKTtcbiAgICAvLyBDYWNoZSBwcm9taXNlcyB0byBwcmV2ZW50IG11bHRpcGxlIGNvcGllcyBvZiBpZGVudGljYWwgZGlhbG9ncyBzaG93aW5nXG4gICAgLy8gdG8gdGhlIHVzZXIuXG4gICAgY29uc3QgYm9keSA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IGVycm9yLm1lc3NhZ2U7XG4gICAgY29uc3Qga2V5ID0gdGl0bGUgKyAnLS0tLScgKyBib2R5O1xuICAgIGNvbnN0IHByb21pc2UgPSBQcml2YXRlLmVycm9yTWVzc2FnZVByb21pc2VDYWNoZS5nZXQoa2V5KTtcbiAgICBpZiAocHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ1Byb21pc2UgPSBzaG93RGlhbG9nKHtcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIGJvZHk6IGJvZHksXG4gICAgICAgICAgICBidXR0b25zOiBidXR0b25zXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgUHJpdmF0ZS5lcnJvck1lc3NhZ2VQcm9taXNlQ2FjaGUuZGVsZXRlKGtleSk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIC8vIFRPRE86IFVzZSAuZmluYWxseSgpIGFib3ZlIHdoZW4gc3VwcG9ydGVkXG4gICAgICAgICAgICBQcml2YXRlLmVycm9yTWVzc2FnZVByb21pc2VDYWNoZS5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9KTtcbiAgICAgICAgUHJpdmF0ZS5lcnJvck1lc3NhZ2VQcm9taXNlQ2FjaGUuc2V0KGtleSwgZGlhbG9nUHJvbWlzZSk7XG4gICAgICAgIHJldHVybiBkaWFsb2dQcm9taXNlO1xuICAgIH1cbn1cbi8qKlxuICogQSBtb2RhbCBkaWFsb2cgd2lkZ2V0LlxuICovXG5leHBvcnQgY2xhc3MgRGlhbG9nIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBkaWFsb2cgcGFuZWwgaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFRoZSBkaWFsb2cgc2V0dXAgb3B0aW9ucy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZm9jdXNOb2RlU2VsZWN0b3IgPSAnJztcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtRGlhbG9nJyk7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBQcml2YXRlLmhhbmRsZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gbm9ybWFsaXplZC5yZW5kZXJlcjtcbiAgICAgICAgdGhpcy5faG9zdCA9IG5vcm1hbGl6ZWQuaG9zdDtcbiAgICAgICAgdGhpcy5fZGVmYXVsdEJ1dHRvbiA9IG5vcm1hbGl6ZWQuZGVmYXVsdEJ1dHRvbjtcbiAgICAgICAgdGhpcy5fYnV0dG9ucyA9IG5vcm1hbGl6ZWQuYnV0dG9ucztcbiAgICAgICAgdGhpcy5faGFzQ2xvc2UgPSBub3JtYWxpemVkLmhhc0Nsb3NlO1xuICAgICAgICB0aGlzLl9idXR0b25Ob2RlcyA9IHRvQXJyYXkobWFwKHRoaXMuX2J1dHRvbnMsIGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVuZGVyZXIuY3JlYXRlQnV0dG9uTm9kZShidXR0b24pO1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMuX2xhc3RNb3VzZURvd25JbkRpYWxvZyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5sYXlvdXQgPSBuZXcgUGFuZWxMYXlvdXQoKSk7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBuZXcgUGFuZWwoKTtcbiAgICAgICAgY29udGVudC5hZGRDbGFzcygnanAtRGlhbG9nLWNvbnRlbnQnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb250ZW50LmFkZENsYXNzKCdqcC1EaWFsb2ctY29udGVudC1zbWFsbCcpO1xuICAgICAgICB9XG4gICAgICAgIGxheW91dC5hZGRXaWRnZXQoY29udGVudCk7XG4gICAgICAgIHRoaXMuX2JvZHkgPSBub3JtYWxpemVkLmJvZHk7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IHJlbmRlcmVyLmNyZWF0ZUhlYWRlcihub3JtYWxpemVkLnRpdGxlLCAoKSA9PiB0aGlzLnJlamVjdCgpLCBvcHRpb25zKTtcbiAgICAgICAgY29uc3QgYm9keSA9IHJlbmRlcmVyLmNyZWF0ZUJvZHkobm9ybWFsaXplZC5ib2R5KTtcbiAgICAgICAgY29uc3QgZm9vdGVyID0gcmVuZGVyZXIuY3JlYXRlRm9vdGVyKHRoaXMuX2J1dHRvbk5vZGVzKTtcbiAgICAgICAgY29udGVudC5hZGRXaWRnZXQoaGVhZGVyKTtcbiAgICAgICAgY29udGVudC5hZGRXaWRnZXQoYm9keSk7XG4gICAgICAgIGNvbnRlbnQuYWRkV2lkZ2V0KGZvb3Rlcik7XG4gICAgICAgIHRoaXMuX3ByaW1hcnkgPSB0aGlzLl9idXR0b25Ob2Rlc1t0aGlzLl9kZWZhdWx0QnV0dG9uXTtcbiAgICAgICAgdGhpcy5fZm9jdXNOb2RlU2VsZWN0b3IgPSBvcHRpb25zLmZvY3VzTm9kZVNlbGVjdG9yO1xuICAgICAgICAvLyBBZGQgbmV3IGRpYWxvZ3MgdG8gdGhlIHRyYWNrZXIuXG4gICAgICAgIHZvaWQgRGlhbG9nLnRyYWNrZXIuYWRkKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgdXNlZCBieSB0aGUgZGlhbG9nLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLl9wcm9taXNlO1xuICAgICAgICBpZiAocHJvbWlzZSkge1xuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZSA9IG51bGw7XG4gICAgICAgICAgICBwcm9taXNlLnJlamVjdCh2b2lkIDApO1xuICAgICAgICAgICAgQXJyYXlFeHQucmVtb3ZlRmlyc3RPZihQcml2YXRlLmxhdW5jaFF1ZXVlLCBwcm9taXNlLnByb21pc2UpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGF1bmNoIHRoZSBkaWFsb2cgYXMgYSBtb2RhbCB3aW5kb3cuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXN1bHQgb2YgdGhlIGRpYWxvZy5cbiAgICAgKi9cbiAgICBsYXVuY2goKSB7XG4gICAgICAgIC8vIFJldHVybiB0aGUgZXhpc3RpbmcgZGlhbG9nIGlmIGFscmVhZHkgb3Blbi5cbiAgICAgICAgaWYgKHRoaXMuX3Byb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlLnByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvbWlzZSA9ICh0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2VEZWxlZ2F0ZSgpKTtcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBQcm9taXNlLmFsbChQcml2YXRlLmxhdW5jaFF1ZXVlKTtcbiAgICAgICAgUHJpdmF0ZS5sYXVuY2hRdWV1ZS5wdXNoKHRoaXMuX3Byb21pc2UucHJvbWlzZSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlcy50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIERvIG5vdCBzaG93IERpYWxvZyBpZiBpdCB3YXMgZGlzcG9zZWQgb2YgYmVmb3JlIGl0IHdhcyBhdCB0aGUgZnJvbnQgb2YgdGhlIGxhdW5jaCBxdWV1ZVxuICAgICAgICAgICAgaWYgKCF0aGlzLl9wcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IGJ1dHRvbjogRGlhbG9nLmNhbmNlbEJ1dHRvbigpLCB2YWx1ZTogbnVsbCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFdpZGdldC5hdHRhY2godGhpcywgdGhpcy5faG9zdCk7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZS5wcm9taXNlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzb2x2ZSB0aGUgY3VycmVudCBkaWFsb2cuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggLSBBbiBvcHRpb25hbCBpbmRleCB0byB0aGUgYnV0dG9uIHRvIHJlc29sdmUuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogV2lsbCBkZWZhdWx0IHRvIHRoZSBkZWZhdWx0SW5kZXguXG4gICAgICogV2lsbCByZXNvbHZlIHRoZSBjdXJyZW50IGBzaG93KClgIHdpdGggdGhlIGJ1dHRvbiB2YWx1ZS5cbiAgICAgKiBXaWxsIGJlIGEgbm8tb3AgaWYgdGhlIGRpYWxvZyBpcyBub3Qgc2hvd24uXG4gICAgICovXG4gICAgcmVzb2x2ZShpbmRleCkge1xuICAgICAgICBpZiAoIXRoaXMuX3Byb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLl9kZWZhdWx0QnV0dG9uO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Jlc29sdmUodGhpcy5fYnV0dG9uc1tpbmRleF0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWplY3QgdGhlIGN1cnJlbnQgZGlhbG9nIHdpdGggYSBkZWZhdWx0IHJlamVjdCB2YWx1ZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBXaWxsIGJlIGEgbm8tb3AgaWYgdGhlIGRpYWxvZyBpcyBub3Qgc2hvd24uXG4gICAgICovXG4gICAgcmVqZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuX3Byb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZXNvbHZlKERpYWxvZy5jYW5jZWxCdXR0b24oKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgRE9NIGV2ZW50cyBmb3IgdGhlIGRpcmVjdG9yeSBsaXN0aW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50IC0gVGhlIERPTSBldmVudCBzZW50IHRvIHRoZSB3aWRnZXQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBtZXRob2QgaW1wbGVtZW50cyB0aGUgRE9NIGBFdmVudExpc3RlbmVyYCBpbnRlcmZhY2UgYW5kIGlzXG4gICAgICogY2FsbGVkIGluIHJlc3BvbnNlIHRvIGV2ZW50cyBvbiB0aGUgcGFuZWwncyBET00gbm9kZS4gSXQgc2hvdWxkXG4gICAgICogbm90IGJlIGNhbGxlZCBkaXJlY3RseSBieSB1c2VyIGNvZGUuXG4gICAgICovXG4gICAgaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdrZXlkb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldnRLZXlkb3duKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vdXNlZG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0TW91c2VEb3duKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldnRDbGljayhldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdmb2N1cyc6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0Rm9jdXMoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY29udGV4dG1lbnUnOlxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqICBBIG1lc3NhZ2UgaGFuZGxlciBpbnZva2VkIG9uIGFuIGAnYWZ0ZXItYXR0YWNoJ2AgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBvbkFmdGVyQXR0YWNoKG1zZykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMsIHRydWUpO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcywgdHJ1ZSk7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcywgdHJ1ZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2ZpcnN0ID0gUHJpdmF0ZS5maW5kRmlyc3RGb2N1c2FibGUodGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5fb3JpZ2luYWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICBpZiAodGhpcy5fZm9jdXNOb2RlU2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignLmpwLURpYWxvZy1ib2R5Jyk7XG4gICAgICAgICAgICBjb25zdCBlbCA9IGJvZHkgPT09IG51bGwgfHwgYm9keSA9PT0gdm9pZCAwID8gdm9pZCAwIDogYm9keS5xdWVyeVNlbGVjdG9yKHRoaXMuX2ZvY3VzTm9kZVNlbGVjdG9yKTtcbiAgICAgICAgICAgIGlmIChlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ByaW1hcnkgPSBlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAoX2EgPSB0aGlzLl9wcmltYXJ5KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9jdXMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogIEEgbWVzc2FnZSBoYW5kbGVyIGludm9rZWQgb24gYW4gYCdhZnRlci1kZXRhY2gnYCBtZXNzYWdlLlxuICAgICAqL1xuICAgIG9uQWZ0ZXJEZXRhY2gobXNnKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMsIHRydWUpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcywgdHJ1ZSk7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsLmZvY3VzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgbWVzc2FnZSBoYW5kbGVyIGludm9rZWQgb24gYSBgJ2Nsb3NlLXJlcXVlc3QnYCBtZXNzYWdlLlxuICAgICAqL1xuICAgIG9uQ2xvc2VSZXF1ZXN0KG1zZykge1xuICAgICAgICBpZiAodGhpcy5fcHJvbWlzZSkge1xuICAgICAgICAgICAgdGhpcy5yZWplY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5vbkNsb3NlUmVxdWVzdChtc2cpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGAnY2xpY2snYCBldmVudCBmb3IgYSBkaWFsb2cgYnV0dG9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50IC0gVGhlIERPTSBldmVudCBzZW50IHRvIHRoZSB3aWRnZXRcbiAgICAgKi9cbiAgICBfZXZ0Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMubm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqcC1EaWFsb2ctY29udGVudCcpWzBdO1xuICAgICAgICBpZiAoIWNvbnRlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2hhc0Nsb3NlICYmICF0aGlzLl9sYXN0TW91c2VEb3duSW5EaWFsb2cpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlamVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgYnV0dG9uTm9kZSBvZiB0aGlzLl9idXR0b25Ob2Rlcykge1xuICAgICAgICAgICAgaWYgKGJ1dHRvbk5vZGUuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fYnV0dG9uTm9kZXMuaW5kZXhPZihidXR0b25Ob2RlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmUoaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgYCdrZXlkb3duJ2AgZXZlbnQgZm9yIHRoZSB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnQgLSBUaGUgRE9NIGV2ZW50IHNlbnQgdG8gdGhlIHdpZGdldFxuICAgICAqL1xuICAgIF9ldnRLZXlkb3duKGV2ZW50KSB7XG4gICAgICAgIC8vIENoZWNrIGZvciBlc2NhcGUga2V5XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSAyNzogLy8gRXNjYXBlLlxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2hhc0Nsb3NlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzNzoge1xuICAgICAgICAgICAgICAgIC8vIExlZnQgYXJyb3dcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVFbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUVsIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkeCA9IHRoaXMuX2J1dHRvbk5vZGVzLmluZGV4T2YoYWN0aXZlRWwpIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSGFuZGxlIGEgbGVmdCBhcnJvd3Mgb24gdGhlIGZpcnN0IGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBpZiAoaWR4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWR4ID0gdGhpcy5fYnV0dG9uTm9kZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlID0gdGhpcy5fYnV0dG9uTm9kZXNbaWR4XTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIDM5OiB7XG4gICAgICAgICAgICAgICAgLy8gUmlnaHQgYXJyb3dcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVFbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUVsIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkeCA9IHRoaXMuX2J1dHRvbk5vZGVzLmluZGV4T2YoYWN0aXZlRWwpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSGFuZGxlIGEgcmlnaHQgYXJyb3dzIG9uIHRoZSBsYXN0IGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ID09IHRoaXMuX2J1dHRvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZHggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9idXR0b25Ob2Rlc1tpZHhdO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgOToge1xuICAgICAgICAgICAgICAgIC8vIFRhYi5cbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgYSB0YWIgb24gdGhlIGxhc3QgYnV0dG9uLlxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9idXR0b25Ob2Rlc1t0aGlzLl9idXR0b25zLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBub2RlICYmICFldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlyc3QuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIDEzOiB7XG4gICAgICAgICAgICAgICAgLy8gRW50ZXIuXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVFbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4O1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVFbCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gdGhpcy5fYnV0dG9uTm9kZXMuaW5kZXhPZihhY3RpdmVFbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucmVzb2x2ZShpbmRleCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgYCdmb2N1cydgIGV2ZW50IGZvciB0aGUgd2lkZ2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50IC0gVGhlIERPTSBldmVudCBzZW50IHRvIHRoZSB3aWRnZXRcbiAgICAgKi9cbiAgICBfZXZ0Rm9jdXMoZXZlbnQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGlmICghdGhpcy5ub2RlLmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgKF9hID0gdGhpcy5fYnV0dG9uTm9kZXNbdGhpcy5fZGVmYXVsdEJ1dHRvbl0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgYCdtb3VzZWRvd24nYCBldmVudCBmb3IgdGhlIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudCAtIFRoZSBET00gZXZlbnQgc2VudCB0byB0aGUgd2lkZ2V0XG4gICAgICovXG4gICAgX2V2dE1vdXNlRG93bihldmVudCkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5ub2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2pwLURpYWxvZy1jb250ZW50JylbMF07XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgdGhpcy5fbGFzdE1vdXNlRG93bkluRGlhbG9nID0gY29udGVudC5jb250YWlucyh0YXJnZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXNvbHZlIGEgYnV0dG9uIGl0ZW0uXG4gICAgICovXG4gICAgX3Jlc29sdmUoYnV0dG9uKSB7XG4gICAgICAgIC8vIFByZXZlbnQgbG9vcGJhY2suXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLl9wcm9taXNlO1xuICAgICAgICBpZiAoIXByb21pc2UpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Byb21pc2UgPSBudWxsO1xuICAgICAgICBBcnJheUV4dC5yZW1vdmVGaXJzdE9mKFByaXZhdGUubGF1bmNoUXVldWUsIHByb21pc2UucHJvbWlzZSk7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLl9ib2R5O1xuICAgICAgICBsZXQgdmFsdWUgPSBudWxsO1xuICAgICAgICBpZiAoYnV0dG9uLmFjY2VwdCAmJlxuICAgICAgICAgICAgYm9keSBpbnN0YW5jZW9mIFdpZGdldCAmJlxuICAgICAgICAgICAgdHlwZW9mIGJvZHkuZ2V0VmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhbHVlID0gYm9keS5nZXRWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICBwcm9taXNlLnJlc29sdmUoeyBidXR0b24sIHZhbHVlIH0pO1xuICAgIH1cbn1cbi8qKlxuICogVGhlIG5hbWVzcGFjZSBmb3IgRGlhbG9nIGNsYXNzIHN0YXRpY3MuXG4gKi9cbihmdW5jdGlvbiAoRGlhbG9nKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgYnV0dG9uIGl0ZW0uXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlQnV0dG9uKHZhbHVlKSB7XG4gICAgICAgIHZhbHVlLmFjY2VwdCA9IHZhbHVlLmFjY2VwdCAhPT0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRMYWJlbCA9IHZhbHVlLmFjY2VwdCA/ICdPSycgOiAnQ2FuY2VsJztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxhYmVsOiB2YWx1ZS5sYWJlbCB8fCBkZWZhdWx0TGFiZWwsXG4gICAgICAgICAgICBpY29uQ2xhc3M6IHZhbHVlLmljb25DbGFzcyB8fCAnJyxcbiAgICAgICAgICAgIGljb25MYWJlbDogdmFsdWUuaWNvbkxhYmVsIHx8ICcnLFxuICAgICAgICAgICAgY2FwdGlvbjogdmFsdWUuY2FwdGlvbiB8fCAnJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogdmFsdWUuY2xhc3NOYW1lIHx8ICcnLFxuICAgICAgICAgICAgYWNjZXB0OiB2YWx1ZS5hY2NlcHQsXG4gICAgICAgICAgICBhY3Rpb25zOiB2YWx1ZS5hY3Rpb25zIHx8IFtdLFxuICAgICAgICAgICAgZGlzcGxheVR5cGU6IHZhbHVlLmRpc3BsYXlUeXBlIHx8ICdkZWZhdWx0J1xuICAgICAgICB9O1xuICAgIH1cbiAgICBEaWFsb2cuY3JlYXRlQnV0dG9uID0gY3JlYXRlQnV0dG9uO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHJlamVjdCBidXR0b24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gY2FuY2VsQnV0dG9uKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBvcHRpb25zLmFjY2VwdCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gY3JlYXRlQnV0dG9uKG9wdGlvbnMpO1xuICAgIH1cbiAgICBEaWFsb2cuY2FuY2VsQnV0dG9uID0gY2FuY2VsQnV0dG9uO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBhY2NlcHQgYnV0dG9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG9rQnV0dG9uKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBvcHRpb25zLmFjY2VwdCA9IHRydWU7XG4gICAgICAgIHJldHVybiBjcmVhdGVCdXR0b24ob3B0aW9ucyk7XG4gICAgfVxuICAgIERpYWxvZy5va0J1dHRvbiA9IG9rQnV0dG9uO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHdhcm4gYnV0dG9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHdhcm5CdXR0b24ob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIG9wdGlvbnMuZGlzcGxheVR5cGUgPSAnd2Fybic7XG4gICAgICAgIHJldHVybiBjcmVhdGVCdXR0b24ob3B0aW9ucyk7XG4gICAgfVxuICAgIERpYWxvZy53YXJuQnV0dG9uID0gd2FybkJ1dHRvbjtcbiAgICAvKipcbiAgICAgKiBEaXNwb3NlcyBhbGwgZGlhbG9nIGluc3RhbmNlcy5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBvbmx5IGJlIHVzZWQgaW4gdGVzdHMgb3IgY2FzZXMgd2hlcmUgYXBwbGljYXRpb24gc3RhdGVcbiAgICAgKiBtYXkgYmUgZGlzY2FyZGVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgICAgICBEaWFsb2cudHJhY2tlci5mb3JFYWNoKGRpYWxvZyA9PiB7XG4gICAgICAgICAgICBkaWFsb2cuZGlzcG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRGlhbG9nLmZsdXNoID0gZmx1c2g7XG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgYSBkaWFsb2cgcmVuZGVyZXIuXG4gICAgICovXG4gICAgY2xhc3MgUmVuZGVyZXIge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIHRoZSBoZWFkZXIgb2YgdGhlIGRpYWxvZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHRpdGxlIC0gVGhlIHRpdGxlIG9mIHRoZSBkaWFsb2cuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIEEgd2lkZ2V0IGZvciB0aGUgZGlhbG9nIGhlYWRlci5cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZUhlYWRlcih0aXRsZSwgcmVqZWN0ID0gKCkgPT4ge1xuICAgICAgICAgICAgLyogZW1wdHkgKi9cbiAgICAgICAgfSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgICAgICBsZXQgaGVhZGVyO1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlTW91c2VEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gRmlyZSBhY3Rpb24gb25seSB3aGVuIGxlZnQgYnV0dG9uIGlzIHByZXNzZWQuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsga2V5IH0gPSBldmVudDtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnRW50ZXInIHx8IGtleSA9PT0gJyAnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRpdGxlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGhlYWRlciA9IFJlYWN0V2lkZ2V0LmNyZWF0ZShSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5oYXNDbG9zZSAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgY2xhc3NOYW1lOiBcImpwLURpYWxvZy1jbG9zZS1idXR0b25cIiwgb25Nb3VzZURvd246IGhhbmRsZU1vdXNlRG93biwgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duLCB0aXRsZTogXCJDYW5jZWxcIiwgbWluaW1hbDogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJJY29uLnJlc29sdmVSZWFjdCwgeyBpY29uOiBjbG9zZUljb24sIGljb25DbGFzczogXCJqcC1JY29uXCIsIGNsYXNzTmFtZTogXCJqcC1Ub29sYmFyQnV0dG9uQ29tcG9uZW50LWljb25cIiwgdGFnOiBcInNwYW5cIiB9KSkpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBoZWFkZXIgPSBSZWFjdFdpZGdldC5jcmVhdGUodGl0bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGVhZGVyLmFkZENsYXNzKCdqcC1EaWFsb2ctaGVhZGVyJyk7XG4gICAgICAgICAgICBTdHlsaW5nLnN0eWxlTm9kZShoZWFkZXIubm9kZSk7XG4gICAgICAgICAgICByZXR1cm4gaGVhZGVyO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgdGhlIGJvZHkgb2YgdGhlIGRpYWxvZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIGlucHV0IHZhbHVlIGZvciB0aGUgYm9keS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgQSB3aWRnZXQgZm9yIHRoZSBib2R5LlxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlQm9keSh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IGJvZHk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGJvZHkgPSBuZXcgV2lkZ2V0KHsgbm9kZTogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpIH0pO1xuICAgICAgICAgICAgICAgIGJvZHkubm9kZS50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICBib2R5ID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBib2R5ID0gUmVhY3RXaWRnZXQuY3JlYXRlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAvLyBJbW1lZGlhdGVseSB1cGRhdGUgdGhlIGJvZHkgZXZlbiB0aG91Z2ggaXQgaGFzIG5vdCB5ZXQgYXR0YWNoZWQgaW5cbiAgICAgICAgICAgICAgICAvLyBvcmRlciB0byB0cmlnZ2VyIGEgcmVuZGVyIG9mIHRoZSBET00gbm9kZXMgZnJvbSB0aGUgUmVhY3QgZWxlbWVudC5cbiAgICAgICAgICAgICAgICBNZXNzYWdlTG9vcC5zZW5kTWVzc2FnZShib2R5LCBXaWRnZXQuTXNnLlVwZGF0ZVJlcXVlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9keS5hZGRDbGFzcygnanAtRGlhbG9nLWJvZHknKTtcbiAgICAgICAgICAgIFN0eWxpbmcuc3R5bGVOb2RlKGJvZHkubm9kZSk7XG4gICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIHRoZSBmb290ZXIgb2YgdGhlIGRpYWxvZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGJ1dHRvbk5vZGVzIC0gVGhlIGJ1dHRvbnMgbm9kZXMgdG8gYWRkIHRvIHRoZSBmb290ZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIEEgd2lkZ2V0IGZvciB0aGUgZm9vdGVyLlxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlRm9vdGVyKGJ1dHRvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvb3RlciA9IG5ldyBXaWRnZXQoKTtcbiAgICAgICAgICAgIGZvb3Rlci5hZGRDbGFzcygnanAtRGlhbG9nLWZvb3RlcicpO1xuICAgICAgICAgICAgZWFjaChidXR0b25zLCBidXR0b24gPT4ge1xuICAgICAgICAgICAgICAgIGZvb3Rlci5ub2RlLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFN0eWxpbmcuc3R5bGVOb2RlKGZvb3Rlci5ub2RlKTtcbiAgICAgICAgICAgIHJldHVybiBmb290ZXI7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhIGJ1dHRvbiBub2RlIGZvciB0aGUgZGlhbG9nLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gYnV0dG9uIC0gVGhlIGJ1dHRvbiBkYXRhLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBBIG5vZGUgZm9yIHRoZSBidXR0b24uXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVCdXR0b25Ob2RlKGJ1dHRvbikge1xuICAgICAgICAgICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgZS5jbGFzc05hbWUgPSB0aGlzLmNyZWF0ZUl0ZW1DbGFzcyhidXR0b24pO1xuICAgICAgICAgICAgZS5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlckljb24oYnV0dG9uKSk7XG4gICAgICAgICAgICBlLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyTGFiZWwoYnV0dG9uKSk7XG4gICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIHRoZSBjbGFzcyBuYW1lIGZvciB0aGUgYnV0dG9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gZGF0YSAtIFRoZSBkYXRhIHRvIHVzZSBmb3IgdGhlIGNsYXNzIG5hbWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBmdWxsIGNsYXNzIG5hbWUgZm9yIHRoZSBidXR0b24uXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVJdGVtQ2xhc3MoZGF0YSkge1xuICAgICAgICAgICAgLy8gU2V0dXAgdGhlIGluaXRpYWwgY2xhc3MgbmFtZS5cbiAgICAgICAgICAgIGxldCBuYW1lID0gJ2pwLURpYWxvZy1idXR0b24nO1xuICAgICAgICAgICAgLy8gQWRkIHRoZSBvdGhlciBzdGF0ZSBjbGFzc2VzLlxuICAgICAgICAgICAgaWYgKGRhdGEuYWNjZXB0KSB7XG4gICAgICAgICAgICAgICAgbmFtZSArPSAnIGpwLW1vZC1hY2NlcHQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmFtZSArPSAnIGpwLW1vZC1yZWplY3QnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuZGlzcGxheVR5cGUgPT09ICd3YXJuJykge1xuICAgICAgICAgICAgICAgIG5hbWUgKz0gJyBqcC1tb2Qtd2Fybic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBZGQgdGhlIGV4dHJhIGNsYXNzLlxuICAgICAgICAgICAgY29uc3QgZXh0cmEgPSBkYXRhLmNsYXNzTmFtZTtcbiAgICAgICAgICAgIGlmIChleHRyYSkge1xuICAgICAgICAgICAgICAgIG5hbWUgKz0gYCAke2V4dHJhfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGNvbXBsZXRlIGNsYXNzIG5hbWUuXG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmVuZGVyIGFuIGljb24gZWxlbWVudCBmb3IgYSBkaWFsb2cgaXRlbS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGRhdGEgLSBUaGUgZGF0YSB0byB1c2UgZm9yIHJlbmRlcmluZyB0aGUgaWNvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgQW4gSFRNTCBlbGVtZW50IHJlcHJlc2VudGluZyB0aGUgaWNvbi5cbiAgICAgICAgICovXG4gICAgICAgIHJlbmRlckljb24oZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZS5jbGFzc05hbWUgPSB0aGlzLmNyZWF0ZUljb25DbGFzcyhkYXRhKTtcbiAgICAgICAgICAgIGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZGF0YS5pY29uTGFiZWwpKTtcbiAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgdGhlIGNsYXNzIG5hbWUgZm9yIHRoZSBidXR0b24gaWNvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGRhdGEgLSBUaGUgZGF0YSB0byB1c2UgZm9yIHRoZSBjbGFzcyBuYW1lLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgZnVsbCBjbGFzcyBuYW1lIGZvciB0aGUgaXRlbSBpY29uLlxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlSWNvbkNsYXNzKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSAnanAtRGlhbG9nLWJ1dHRvbkljb24nO1xuICAgICAgICAgICAgY29uc3QgZXh0cmEgPSBkYXRhLmljb25DbGFzcztcbiAgICAgICAgICAgIHJldHVybiBleHRyYSA/IGAke25hbWV9ICR7ZXh0cmF9YCA6IG5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbmRlciB0aGUgbGFiZWwgZWxlbWVudCBmb3IgYSBidXR0b24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBkYXRhIC0gVGhlIGRhdGEgdG8gdXNlIGZvciByZW5kZXJpbmcgdGhlIGxhYmVsLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBBbiBIVE1MIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBpdGVtIGxhYmVsLlxuICAgICAgICAgKi9cbiAgICAgICAgcmVuZGVyTGFiZWwoZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZS5jbGFzc05hbWUgPSAnanAtRGlhbG9nLWJ1dHRvbkxhYmVsJztcbiAgICAgICAgICAgIGUudGl0bGUgPSBkYXRhLmNhcHRpb247XG4gICAgICAgICAgICBlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRhdGEubGFiZWwpKTtcbiAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICB9XG4gICAgfVxuICAgIERpYWxvZy5SZW5kZXJlciA9IFJlbmRlcmVyO1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IHJlbmRlcmVyIGluc3RhbmNlLlxuICAgICAqL1xuICAgIERpYWxvZy5kZWZhdWx0UmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoKTtcbiAgICAvKipcbiAgICAgKiBUaGUgZGlhbG9nIHdpZGdldCB0cmFja2VyLlxuICAgICAqL1xuICAgIERpYWxvZy50cmFja2VyID0gbmV3IFdpZGdldFRyYWNrZXIoe1xuICAgICAgICBuYW1lc3BhY2U6ICdAanVweXRlcmxhYi9hcHB1dGlsczpEaWFsb2cnXG4gICAgfSk7XG59KShEaWFsb2cgfHwgKERpYWxvZyA9IHt9KSk7XG4vKipcbiAqIFRoZSBuYW1lc3BhY2UgZm9yIG1vZHVsZSBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogVGhlIHF1ZXVlIGZvciBsYXVuY2hpbmcgZGlhbG9ncy5cbiAgICAgKi9cbiAgICBQcml2YXRlLmxhdW5jaFF1ZXVlID0gW107XG4gICAgUHJpdmF0ZS5lcnJvck1lc3NhZ2VQcm9taXNlQ2FjaGUgPSBuZXcgTWFwKCk7XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBpbnB1dCBvcHRpb25zIGZvciBhIGRpYWxvZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIGlucHV0IG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIG5ldyBvcHRpb25zIG9iamVjdCB3aXRoIGRlZmF1bHRzIGFwcGxpZWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFuZGxlT3B0aW9ucyhvcHRpb25zID0ge30pIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaDtcbiAgICAgICAgY29uc3QgYnV0dG9ucyA9IChfYSA9IG9wdGlvbnMuYnV0dG9ucykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW1xuICAgICAgICAgICAgRGlhbG9nLmNhbmNlbEJ1dHRvbigpLFxuICAgICAgICAgICAgRGlhbG9nLm9rQnV0dG9uKClcbiAgICAgICAgXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpdGxlOiAoX2IgPSBvcHRpb25zLnRpdGxlKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJyxcbiAgICAgICAgICAgIGJvZHk6IChfYyA9IG9wdGlvbnMuYm9keSkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogJycsXG4gICAgICAgICAgICBob3N0OiAoX2QgPSBvcHRpb25zLmhvc3QpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IGRvY3VtZW50LmJvZHksXG4gICAgICAgICAgICBidXR0b25zLFxuICAgICAgICAgICAgZGVmYXVsdEJ1dHRvbjogKF9lID0gb3B0aW9ucy5kZWZhdWx0QnV0dG9uKSAhPT0gbnVsbCAmJiBfZSAhPT0gdm9pZCAwID8gX2UgOiBidXR0b25zLmxlbmd0aCAtIDEsXG4gICAgICAgICAgICByZW5kZXJlcjogKF9mID0gb3B0aW9ucy5yZW5kZXJlcikgIT09IG51bGwgJiYgX2YgIT09IHZvaWQgMCA/IF9mIDogRGlhbG9nLmRlZmF1bHRSZW5kZXJlcixcbiAgICAgICAgICAgIGZvY3VzTm9kZVNlbGVjdG9yOiAoX2cgPSBvcHRpb25zLmZvY3VzTm9kZVNlbGVjdG9yKSAhPT0gbnVsbCAmJiBfZyAhPT0gdm9pZCAwID8gX2cgOiAnJyxcbiAgICAgICAgICAgIGhhc0Nsb3NlOiAoX2ggPSBvcHRpb25zLmhhc0Nsb3NlKSAhPT0gbnVsbCAmJiBfaCAhPT0gdm9pZCAwID8gX2ggOiB0cnVlXG4gICAgICAgIH07XG4gICAgfVxuICAgIFByaXZhdGUuaGFuZGxlT3B0aW9ucyA9IGhhbmRsZU9wdGlvbnM7XG4gICAgLyoqXG4gICAgICogIEZpbmQgdGhlIGZpcnN0IGZvY3VzYWJsZSBpdGVtIGluIHRoZSBkaWFsb2cuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZEZpcnN0Rm9jdXNhYmxlKG5vZGUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlU2VsZWN0b3JzID0gW1xuICAgICAgICAgICAgJ2lucHV0JyxcbiAgICAgICAgICAgICdzZWxlY3QnLFxuICAgICAgICAgICAgJ2FbaHJlZl0nLFxuICAgICAgICAgICAgJ3RleHRhcmVhJyxcbiAgICAgICAgICAgICdidXR0b24nLFxuICAgICAgICAgICAgJ1t0YWJpbmRleF0nXG4gICAgICAgIF0uam9pbignLCcpO1xuICAgICAgICByZXR1cm4gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKGNhbmRpZGF0ZVNlbGVjdG9ycylbMF07XG4gICAgfVxuICAgIFByaXZhdGUuZmluZEZpcnN0Rm9jdXNhYmxlID0gZmluZEZpcnN0Rm9jdXNhYmxlO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaWFsb2cuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgQXJyYXlFeHQgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgRWxlbWVudEV4dCB9IGZyb20gJ0BsdW1pbm8vZG9tdXRpbHMnO1xuLyoqXG4gKiBUaGUgbmFtZXNwYWNlIGZvciBET00gdXRpbGl0aWVzLlxuICovXG5leHBvcnQgdmFyIERPTVV0aWxzO1xuKGZ1bmN0aW9uIChET01VdGlscykge1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaW5kZXggb2YgdGhlIG5vZGUgYXQgYSBjbGllbnQgcG9zaXRpb24sIG9yIGAtMWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGl0VGVzdE5vZGVzKG5vZGVzLCB4LCB5KSB7XG4gICAgICAgIHJldHVybiBBcnJheUV4dC5maW5kRmlyc3RJbmRleChub2Rlcywgbm9kZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gRWxlbWVudEV4dC5oaXRUZXN0KG5vZGUsIHgsIHkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRE9NVXRpbHMuaGl0VGVzdE5vZGVzID0gaGl0VGVzdE5vZGVzO1xuICAgIC8qKlxuICAgICAqIEZpbmQgdGhlIGZpcnN0IGVsZW1lbnQgbWF0Y2hpbmcgYSBjbGFzcyBuYW1lLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpbmRFbGVtZW50KHBhcmVudCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIHJldHVybiBwYXJlbnQucXVlcnlTZWxlY3RvcihgLiR7Y2xhc3NOYW1lfWApO1xuICAgIH1cbiAgICBET01VdGlscy5maW5kRWxlbWVudCA9IGZpbmRFbGVtZW50O1xuICAgIC8qKlxuICAgICAqIEZpbmQgdGhlIGZpcnN0IGVsZW1lbnQgbWF0Y2hpbmcgYSBjbGFzcyBuYW1lLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpbmRFbGVtZW50cyhwYXJlbnQsIGNsYXNzTmFtZSkge1xuICAgICAgICByZXR1cm4gcGFyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgRE9NVXRpbHMuZmluZEVsZW1lbnRzID0gZmluZEVsZW1lbnRzO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIERPTSBpZCB3aXRoIHByZWZpeCBcImlkLVwiIHRvIHNvbHZlIGJ1ZyBmb3IgVVVJRHMgYmVnaW5uaW5nIHdpdGggbnVtYmVycy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVEb21JRCgpIHtcbiAgICAgICAgcmV0dXJuIGBpZC0ke1VVSUQudXVpZDQoKX1gO1xuICAgIH1cbiAgICBET01VdGlscy5jcmVhdGVEb21JRCA9IGNyZWF0ZURvbUlEO1xufSkoRE9NVXRpbHMgfHwgKERPTVV0aWxzID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbXV0aWxzLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gYWxsIGhvdmVyIGJveGVzLlxuICovXG5jb25zdCBIT1ZFUkJPWF9DTEFTUyA9ICdqcC1Ib3ZlckJveCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGEgaG92ZXJpbmcgbm9kZSB0aGF0IGlzIHNjcm9sbGVkIG91dCBvZiB2aWV3LlxuICovXG5jb25zdCBPVVRPRlZJRVdfQ0xBU1MgPSAnanAtbW9kLW91dG9mdmlldyc7XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBgSG92ZXJCb3hgIG1lbWJlcnMuXG4gKi9cbmV4cG9ydCB2YXIgSG92ZXJCb3g7XG4oZnVuY3Rpb24gKEhvdmVyQm94KSB7XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB2aXNpYmxlIGRpbWVuc2lvbnMgb2YgYSBob3ZlcmluZyBib3ggYW5jaG9yZWQgdG8gYW4gZWRpdG9yIGN1cnNvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIGhvdmVyIGJveCBnZW9tZXRyeSBjYWxjdWxhdGlvbiBvcHRpb25zLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNldEdlb21ldHJ5KG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgeyBhbmNob3IsIGhvc3QsIG5vZGUsIHByaXZpbGVnZSB9ID0gb3B0aW9ucztcbiAgICAgICAgLy8gQWRkIGhvdmVyIGJveCBjbGFzcyBpZiBpdCBkb2VzIG5vdCBleGlzdC5cbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKEhPVkVSQk9YX0NMQVNTKTtcbiAgICAgICAgLy8gSGlkZSB0aGUgaG92ZXIgYm94IGJlZm9yZSBxdWVyeWluZyB0aGUgRE9NIGZvciB0aGUgYW5jaG9yIGNvb3JkaW5hdGVzLlxuICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoT1VUT0ZWSUVXX0NMQVNTKTtcbiAgICAgICAgLy8gSWYgdGhlIGN1cnJlbnQgY29vcmRpbmF0ZXMgYXJlIG5vdCB2aXNpYmxlLCBiYWlsLlxuICAgICAgICBpZiAoIWhvc3QuY29udGFpbnMoZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChhbmNob3IubGVmdCwgYW5jaG9yLnRvcCkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2xlYXIgYW55IHByZXZpb3VzbHkgc2V0IG1heC1oZWlnaHQuXG4gICAgICAgIG5vZGUuc3R5bGUubWF4SGVpZ2h0ID0gJyc7XG4gICAgICAgIC8vIENsZWFyIGFueSBwcm9ncmFtbWF0aWNhbGx5IHNldCBtYXJnaW4tdG9wLlxuICAgICAgICBub2RlLnN0eWxlLm1hcmdpblRvcCA9ICcnO1xuICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIG5vZGUgaXMgdmlzaWJsZSBzbyB0aGF0IGl0cyBkaW1lbnNpb25zIGNhbiBiZSBxdWVyaWVkLlxuICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoT1VUT0ZWSUVXX0NMQVNTKTtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBvcHRpb25zLnN0eWxlIHx8IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgICAgICBjb25zdCBpbm5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgY29uc3Qgc3BhY2VBYm92ZSA9IGFuY2hvci50b3A7XG4gICAgICAgIGNvbnN0IHNwYWNlQmVsb3cgPSBpbm5lckhlaWdodCAtIGFuY2hvci5ib3R0b207XG4gICAgICAgIGNvbnN0IG1hcmdpblRvcCA9IHBhcnNlSW50KHN0eWxlLm1hcmdpblRvcCwgMTApIHx8IDA7XG4gICAgICAgIGNvbnN0IG1pbkhlaWdodCA9IHBhcnNlSW50KHN0eWxlLm1pbkhlaWdodCwgMTApIHx8IG9wdGlvbnMubWluSGVpZ2h0O1xuICAgICAgICBsZXQgbWF4SGVpZ2h0ID0gcGFyc2VJbnQoc3R5bGUubWF4SGVpZ2h0LCAxMCkgfHwgb3B0aW9ucy5tYXhIZWlnaHQ7XG4gICAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIHRvIHJlbmRlciBhYm92ZSBvciBiZWxvdzsgY2hlY2sgcHJpdmlsZWdlLlxuICAgICAgICBjb25zdCByZW5kZXJCZWxvdyA9IHByaXZpbGVnZSA9PT0gJ2ZvcmNlQWJvdmUnXG4gICAgICAgICAgICA/IGZhbHNlXG4gICAgICAgICAgICA6IHByaXZpbGVnZSA9PT0gJ2ZvcmNlQmVsb3cnXG4gICAgICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICAgICAgOiBwcml2aWxlZ2UgPT09ICdhYm92ZSdcbiAgICAgICAgICAgICAgICAgICAgPyBzcGFjZUFib3ZlIDwgbWF4SGVpZ2h0ICYmIHNwYWNlQWJvdmUgPCBzcGFjZUJlbG93XG4gICAgICAgICAgICAgICAgICAgIDogc3BhY2VCZWxvdyA+PSBtYXhIZWlnaHQgfHwgc3BhY2VCZWxvdyA+PSBzcGFjZUFib3ZlO1xuICAgICAgICBpZiAocmVuZGVyQmVsb3cpIHtcbiAgICAgICAgICAgIG1heEhlaWdodCA9IE1hdGgubWluKHNwYWNlQmVsb3cgLSBtYXJnaW5Ub3AsIG1heEhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtYXhIZWlnaHQgPSBNYXRoLm1pbihzcGFjZUFib3ZlLCBtYXhIZWlnaHQpO1xuICAgICAgICAgICAgLy8gSWYgdGhlIGJveCByZW5kZXJzIGFib3ZlIHRoZSB0ZXh0LCBpdHMgdG9wIG1hcmdpbiBpcyBpcnJlbGV2YW50LlxuICAgICAgICAgICAgbm9kZS5zdHlsZS5tYXJnaW5Ub3AgPSAnMHB4JztcbiAgICAgICAgfVxuICAgICAgICBub2RlLnN0eWxlLm1heEhlaWdodCA9IGAke21heEhlaWdodH1weGA7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgYm94IG91Z2h0IHRvIGJlIHZpc2libGUuXG4gICAgICAgIGNvbnN0IHdpdGhpbkJvdW5kcyA9IG1heEhlaWdodCA+IG1pbkhlaWdodCAmJlxuICAgICAgICAgICAgKHNwYWNlQmVsb3cgPj0gbWluSGVpZ2h0IHx8IHNwYWNlQWJvdmUgPj0gbWluSGVpZ2h0KTtcbiAgICAgICAgaWYgKCF3aXRoaW5Cb3VuZHMpIHtcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZChPVVRPRlZJRVdfQ0xBU1MpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBvc2l0aW9uIHRoZSBib3ggdmVydGljYWxseS5cbiAgICAgICAgY29uc3Qgb2Zmc2V0QWJvdmUgPSAob3B0aW9ucy5vZmZzZXQgJiZcbiAgICAgICAgICAgIG9wdGlvbnMub2Zmc2V0LnZlcnRpY2FsICYmXG4gICAgICAgICAgICBvcHRpb25zLm9mZnNldC52ZXJ0aWNhbC5hYm92ZSkgfHxcbiAgICAgICAgICAgIDA7XG4gICAgICAgIGNvbnN0IG9mZnNldEJlbG93ID0gKG9wdGlvbnMub2Zmc2V0ICYmXG4gICAgICAgICAgICBvcHRpb25zLm9mZnNldC52ZXJ0aWNhbCAmJlxuICAgICAgICAgICAgb3B0aW9ucy5vZmZzZXQudmVydGljYWwuYmVsb3cpIHx8XG4gICAgICAgICAgICAwO1xuICAgICAgICBjb25zdCB0b3AgPSByZW5kZXJCZWxvd1xuICAgICAgICAgICAgPyBpbm5lckhlaWdodCAtIHNwYWNlQmVsb3cgKyBvZmZzZXRCZWxvd1xuICAgICAgICAgICAgOiBzcGFjZUFib3ZlIC0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgKyBvZmZzZXRBYm92ZTtcbiAgICAgICAgbm9kZS5zdHlsZS50b3AgPSBgJHtNYXRoLmZsb29yKHRvcCl9cHhgO1xuICAgICAgICAvLyBQb3NpdGlvbiB0aGUgYm94IGhvcml6b250YWxseS5cbiAgICAgICAgY29uc3Qgb2Zmc2V0SG9yaXpvbnRhbCA9IChvcHRpb25zLm9mZnNldCAmJiBvcHRpb25zLm9mZnNldC5ob3Jpem9udGFsKSB8fCAwO1xuICAgICAgICBsZXQgbGVmdCA9IGFuY2hvci5sZWZ0ICsgb2Zmc2V0SG9yaXpvbnRhbDtcbiAgICAgICAgbm9kZS5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5jZWlsKGxlZnQpfXB4YDtcbiAgICAgICAgbm9kZS5zdHlsZS53aWR0aCA9ICdhdXRvJztcbiAgICAgICAgLy8gRXhwYW5kIHRoZSBtZW51IHdpZHRoIGJ5IHRoZSBzY3JvbGxiYXIgc2l6ZSwgaWYgcHJlc2VudC5cbiAgICAgICAgaWYgKG5vZGUuc2Nyb2xsSGVpZ2h0ID49IG1heEhlaWdodCkge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS53aWR0aCA9IGAkezIgKiBub2RlLm9mZnNldFdpZHRoIC0gbm9kZS5jbGllbnRXaWR0aH1gO1xuICAgICAgICAgICAgbm9kZS5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIE1vdmUgbGVmdCB0byBmaXQgaW4gdGhlIHdpbmRvdy5cbiAgICAgICAgY29uc3QgcmlnaHQgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0O1xuICAgICAgICBpZiAocmlnaHQgPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgICAgICAgICAgbGVmdCAtPSByaWdodCAtIHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5jZWlsKGxlZnQpfXB4YDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBIb3ZlckJveC5zZXRHZW9tZXRyeSA9IHNldEdlb21ldHJ5O1xufSkoSG92ZXJCb3ggfHwgKEhvdmVyQm94ID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhvdmVyYm94LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG4vKipcbiAqIEEgcGhvc3Bob3Igd2lkZ2V0IHdoaWNoIHdyYXBzIGFuIElGcmFtZS5cbiAqL1xuZXhwb3J0IGNsYXNzIElGcmFtZSBleHRlbmRzIFdpZGdldCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IElGcmFtZSB3aWRnZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKHsgbm9kZTogUHJpdmF0ZS5jcmVhdGVOb2RlKCkgfSk7XG4gICAgICAgIHRoaXMuX3NhbmRib3ggPSBbXTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtSUZyYW1lJyk7XG4gICAgICAgIHRoaXMuc2FuZGJveCA9IG9wdGlvbnMuc2FuZGJveCB8fCBbXTtcbiAgICAgICAgdGhpcy5yZWZlcnJlclBvbGljeSA9IG9wdGlvbnMucmVmZXJyZXJQb2xpY3kgfHwgJ25vLXJlZmVycmVyJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVmZXJyZXIgcG9saWN5IGZvciB0aGUgaWZyYW1lLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIEJ5IGRlZmF1bHQsIGBuby1yZWZlcnJlcmAgaXMgY2hvc2VuLlxuICAgICAqXG4gICAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZVxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IVE1MSUZyYW1lRWxlbWVudC9yZWZlcnJlclBvbGljeVxuICAgICAqL1xuICAgIGdldCByZWZlcnJlclBvbGljeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZmVycmVyUG9saWN5O1xuICAgIH1cbiAgICBzZXQgcmVmZXJyZXJQb2xpY3kodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlZmVycmVyUG9saWN5ID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlZmVycmVyUG9saWN5ID0gdmFsdWU7XG4gICAgICAgIGNvbnN0IGlmcmFtZSA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKTtcbiAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgncmVmZXJyZXJwb2xpY3knLCB2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEV4Y2VwdGlvbnMgdG8gdGhlIHNhbmRib3hpbmcuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogQnkgZGVmYXVsdCwgYWxsIHNhbmRib3hpbmcgc2VjdXJpdHkgcG9saWNpZXMgYXJlIGVuYWJsZWQuXG4gICAgICogVGhpcyBzZXR0aW5nIGFsbG93cyB0aGUgdXNlciB0byBzZWxlY3RpdmVseSBkaXNhYmxlIHRoZXNlXG4gICAgICogcG9saWNpZXMuIFRoaXMgc2hvdWxkIGJlIGRvbmUgd2l0aCBjYXJlLCBhcyBpdCBjYW5cbiAgICAgKiBpbnRyb2R1Y2Ugc2VjdXJpdHkgcmlza3MsIGFuZCBwb3NzaWJseSBhbGxvdyBtYWxpY2lvdXNcbiAgICAgKiBzaXRlcyB0byBleGVjdXRlIGNvZGUgaW4gYSBKdXB5dGVyTGFiIHNlc3Npb24uXG4gICAgICpcbiAgICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlXG4gICAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9FbGVtZW50L2lmcmFtZVxuICAgICAqL1xuICAgIGdldCBzYW5kYm94KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2FuZGJveC5zbGljZSgpO1xuICAgIH1cbiAgICBzZXQgc2FuZGJveCh2YWx1ZXMpIHtcbiAgICAgICAgdGhpcy5fc2FuZGJveCA9IHZhbHVlcy5zbGljZSgpO1xuICAgICAgICBjb25zdCBpZnJhbWUgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignaWZyYW1lJyk7XG4gICAgICAgIGNvbnN0IGV4Y2VwdGlvbnMgPSB2YWx1ZXMubGVuZ3RoID8gdmFsdWVzLmpvaW4oJyAnKSA6ICcnO1xuICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzYW5kYm94JywgZXhjZXB0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSB1cmwgb2YgdGhlIElGcmFtZS5cbiAgICAgKi9cbiAgICBnZXQgdXJsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpLmdldEF0dHJpYnV0ZSgnc3JjJykgfHwgJyc7XG4gICAgfVxuICAgIHNldCB1cmwodXJsKSB7XG4gICAgICAgIHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHVybCk7XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgcHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgbWFpbiBjb250ZW50IG5vZGUgb2YgYW4gaWZyYW1lIHdpZGdldC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVOb2RlKCkge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzYW5kYm94JywgJycpO1xuICAgICAgICBpZnJhbWUuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgICBpZnJhbWUuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIFByaXZhdGUuY3JlYXRlTm9kZSA9IGNyZWF0ZU5vZGU7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlmcmFtZS5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBhcHB1dGlsc1xuICovXG5leHBvcnQgKiBmcm9tICcuL2NsaXBib2FyZCc7XG5leHBvcnQgKiBmcm9tICcuL2NvbGxhcHNlJztcbmV4cG9ydCAqIGZyb20gJy4vY29tbWFuZGxpbmtlcic7XG5leHBvcnQgKiBmcm9tICcuL2NvbW1hbmRwYWxldHRlJztcbmV4cG9ydCAqIGZyb20gJy4vZGlhbG9nJztcbmV4cG9ydCAqIGZyb20gJy4vZG9tdXRpbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9ob3ZlcmJveCc7XG5leHBvcnQgKiBmcm9tICcuL2lmcmFtZSc7XG5leHBvcnQgKiBmcm9tICcuL2lucHV0ZGlhbG9nJztcbmV4cG9ydCAqIGZyb20gJy4vbWFpbmFyZWF3aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9tZW51ZmFjdG9yeSc7XG5leHBvcnQgKiBmcm9tICcuL3ByaW50aW5nJztcbmV4cG9ydCAqIGZyb20gJy4vc2FuaXRpemVyJztcbmV4cG9ydCAqIGZyb20gJy4vc2VhcmNoJztcbmV4cG9ydCAqIGZyb20gJy4vc2Vzc2lvbmNvbnRleHQnO1xuZXhwb3J0ICogZnJvbSAnLi9zcGlubmVyJztcbmV4cG9ydCAqIGZyb20gJy4vc3BsYXNoJztcbmV4cG9ydCAqIGZyb20gJy4vc3R5bGluZyc7XG5leHBvcnQgKiBmcm9tICcuL3RoZW1lbWFuYWdlcic7XG5leHBvcnQgKiBmcm9tICcuL3Rva2Vucyc7XG5leHBvcnQgKiBmcm9tICcuL3Rvb2xiYXInO1xuZXhwb3J0ICogZnJvbSAnLi92ZG9tJztcbmV4cG9ydCAqIGZyb20gJy4vd2lkZ2V0dHJhY2tlcic7XG5leHBvcnQgKiBmcm9tICcuL3dpbmRvd3Jlc29sdmVyJztcbmV4cG9ydCAqIGZyb20gJy4va2VybmVsc3RhdHVzZXMnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSAnQGx1bWluby93aWRnZXRzJztcbmltcG9ydCB7IERpYWxvZywgc2hvd0RpYWxvZyB9IGZyb20gJy4vZGlhbG9nJztcbmltcG9ydCB7IFN0eWxpbmcgfSBmcm9tICcuL3N0eWxpbmcnO1xuY29uc3QgSU5QVVRfRElBTE9HX0NMQVNTID0gJ2pwLUlucHV0LURpYWxvZyc7XG5jb25zdCBJTlBVVF9CT09MRUFOX0RJQUxPR19DTEFTUyA9ICdqcC1JbnB1dC1Cb29sZWFuLURpYWxvZyc7XG4vKipcbiAqIE5hbWVzcGFjZSBmb3IgaW5wdXQgZGlhbG9nc1xuICovXG5leHBvcnQgdmFyIElucHV0RGlhbG9nO1xuKGZ1bmN0aW9uIChJbnB1dERpYWxvZykge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbmQgc2hvdyBhIGlucHV0IGRpYWxvZyBmb3IgYSBib29sZWFuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgZGlhbG9nIHNldHVwIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHdoZXRoZXIgdGhlIGRpYWxvZyB3YXMgYWNjZXB0ZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRCb29sZWFuKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHNob3dEaWFsb2coT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBib2R5OiBuZXcgSW5wdXRCb29sZWFuRGlhbG9nKG9wdGlvbnMpLCBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgRGlhbG9nLmNhbmNlbEJ1dHRvbih7IGxhYmVsOiBvcHRpb25zLmNhbmNlbExhYmVsIH0pLFxuICAgICAgICAgICAgICAgIERpYWxvZy5va0J1dHRvbih7IGxhYmVsOiBvcHRpb25zLm9rTGFiZWwgfSlcbiAgICAgICAgICAgIF0sIGZvY3VzTm9kZVNlbGVjdG9yOiAnaW5wdXQnIH0pKTtcbiAgICB9XG4gICAgSW5wdXREaWFsb2cuZ2V0Qm9vbGVhbiA9IGdldEJvb2xlYW47XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuZCBzaG93IGEgaW5wdXQgZGlhbG9nIGZvciBhIG51bWJlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIGRpYWxvZyBzZXR1cCBvcHRpb25zLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB3aGV0aGVyIHRoZSBkaWFsb2cgd2FzIGFjY2VwdGVkXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0TnVtYmVyKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHNob3dEaWFsb2coT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBib2R5OiBuZXcgSW5wdXROdW1iZXJEaWFsb2cob3B0aW9ucyksIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICBEaWFsb2cuY2FuY2VsQnV0dG9uKHsgbGFiZWw6IG9wdGlvbnMuY2FuY2VsTGFiZWwgfSksXG4gICAgICAgICAgICAgICAgRGlhbG9nLm9rQnV0dG9uKHsgbGFiZWw6IG9wdGlvbnMub2tMYWJlbCB9KVxuICAgICAgICAgICAgXSwgZm9jdXNOb2RlU2VsZWN0b3I6ICdpbnB1dCcgfSkpO1xuICAgIH1cbiAgICBJbnB1dERpYWxvZy5nZXROdW1iZXIgPSBnZXROdW1iZXI7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuZCBzaG93IGEgaW5wdXQgZGlhbG9nIGZvciBhIGNob2ljZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIGRpYWxvZyBzZXR1cCBvcHRpb25zLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB3aGV0aGVyIHRoZSBkaWFsb2cgd2FzIGFjY2VwdGVkXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0SXRlbShvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBzaG93RGlhbG9nKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgYm9keTogbmV3IElucHV0SXRlbXNEaWFsb2cob3B0aW9ucyksIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICBEaWFsb2cuY2FuY2VsQnV0dG9uKHsgbGFiZWw6IG9wdGlvbnMuY2FuY2VsTGFiZWwgfSksXG4gICAgICAgICAgICAgICAgRGlhbG9nLm9rQnV0dG9uKHsgbGFiZWw6IG9wdGlvbnMub2tMYWJlbCB9KVxuICAgICAgICAgICAgXSwgZm9jdXNOb2RlU2VsZWN0b3I6IG9wdGlvbnMuZWRpdGFibGUgPyAnaW5wdXQnIDogJ3NlbGVjdCcgfSkpO1xuICAgIH1cbiAgICBJbnB1dERpYWxvZy5nZXRJdGVtID0gZ2V0SXRlbTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW5kIHNob3cgYSBpbnB1dCBkaWFsb2cgZm9yIGEgdGV4dC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIGRpYWxvZyBzZXR1cCBvcHRpb25zLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB3aGV0aGVyIHRoZSBkaWFsb2cgd2FzIGFjY2VwdGVkXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0VGV4dChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBzaG93RGlhbG9nKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgYm9keTogbmV3IElucHV0VGV4dERpYWxvZyhvcHRpb25zKSwgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgIERpYWxvZy5jYW5jZWxCdXR0b24oeyBsYWJlbDogb3B0aW9ucy5jYW5jZWxMYWJlbCB9KSxcbiAgICAgICAgICAgICAgICBEaWFsb2cub2tCdXR0b24oeyBsYWJlbDogb3B0aW9ucy5va0xhYmVsIH0pXG4gICAgICAgICAgICBdLCBmb2N1c05vZGVTZWxlY3RvcjogJ2lucHV0JyB9KSk7XG4gICAgfVxuICAgIElucHV0RGlhbG9nLmdldFRleHQgPSBnZXRUZXh0O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbmQgc2hvdyBhIGlucHV0IGRpYWxvZyBmb3IgYSBwYXNzd29yZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIGRpYWxvZyBzZXR1cCBvcHRpb25zLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB3aGV0aGVyIHRoZSBkaWFsb2cgd2FzIGFjY2VwdGVkXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UGFzc3dvcmQob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gc2hvd0RpYWxvZyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IGJvZHk6IG5ldyBJbnB1dFBhc3N3b3JkRGlhbG9nKG9wdGlvbnMpLCBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgRGlhbG9nLmNhbmNlbEJ1dHRvbih7IGxhYmVsOiBvcHRpb25zLmNhbmNlbExhYmVsIH0pLFxuICAgICAgICAgICAgICAgIERpYWxvZy5va0J1dHRvbih7IGxhYmVsOiBvcHRpb25zLm9rTGFiZWwgfSlcbiAgICAgICAgICAgIF0sIGZvY3VzTm9kZVNlbGVjdG9yOiAnaW5wdXQnIH0pKTtcbiAgICB9XG4gICAgSW5wdXREaWFsb2cuZ2V0UGFzc3dvcmQgPSBnZXRQYXNzd29yZDtcbn0pKElucHV0RGlhbG9nIHx8IChJbnB1dERpYWxvZyA9IHt9KSk7XG4vKipcbiAqIEJhc2Ugd2lkZ2V0IGZvciBpbnB1dCBkaWFsb2cgYm9keVxuICovXG5jbGFzcyBJbnB1dERpYWxvZ0Jhc2UgZXh0ZW5kcyBXaWRnZXQge1xuICAgIC8qKlxuICAgICAqIElucHV0RGlhbG9nIGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGFiZWwgSW5wdXQgZmllbGQgbGFiZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihsYWJlbCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKElOUFVUX0RJQUxPR19DTEFTUyk7XG4gICAgICAgIHRoaXMuX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgdGhpcy5faW5wdXQuY2xhc3NMaXN0LmFkZCgnanAtbW9kLXN0eWxlZCcpO1xuICAgICAgICB0aGlzLl9pbnB1dC5pZCA9ICdqcC1kaWFsb2ctaW5wdXQtaWQnO1xuICAgICAgICBpZiAobGFiZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgbGFiZWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIGxhYmVsRWxlbWVudC50ZXh0Q29udGVudCA9IGxhYmVsO1xuICAgICAgICAgICAgbGFiZWxFbGVtZW50Lmh0bWxGb3IgPSB0aGlzLl9pbnB1dC5pZDtcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIG5vZGVcbiAgICAgICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZChsYWJlbEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZCh0aGlzLl9pbnB1dCk7XG4gICAgfVxufVxuLyoqXG4gKiBXaWRnZXQgYm9keSBmb3IgaW5wdXQgYm9vbGVhbiBkaWFsb2dcbiAqL1xuY2xhc3MgSW5wdXRCb29sZWFuRGlhbG9nIGV4dGVuZHMgSW5wdXREaWFsb2dCYXNlIHtcbiAgICAvKipcbiAgICAgKiBJbnB1dEJvb2xlYW5EaWFsb2cgY29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIENvbnN0cnVjdG9yIG9wdGlvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMubGFiZWwpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKElOUFVUX0JPT0xFQU5fRElBTE9HX0NMQVNTKTtcbiAgICAgICAgdGhpcy5faW5wdXQudHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgIHRoaXMuX2lucHV0LmNoZWNrZWQgPSBvcHRpb25zLnZhbHVlID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRleHQgc3BlY2lmaWVkIGJ5IHRoZSB1c2VyXG4gICAgICovXG4gICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnB1dC5jaGVja2VkO1xuICAgIH1cbn1cbi8qKlxuICogV2lkZ2V0IGJvZHkgZm9yIGlucHV0IG51bWJlciBkaWFsb2dcbiAqL1xuY2xhc3MgSW5wdXROdW1iZXJEaWFsb2cgZXh0ZW5kcyBJbnB1dERpYWxvZ0Jhc2Uge1xuICAgIC8qKlxuICAgICAqIElucHV0TnVtYmVyRGlhbG9nIGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBDb25zdHJ1Y3RvciBvcHRpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zLmxhYmVsKTtcbiAgICAgICAgdGhpcy5faW5wdXQudHlwZSA9ICdudW1iZXInO1xuICAgICAgICB0aGlzLl9pbnB1dC52YWx1ZSA9IG9wdGlvbnMudmFsdWUgPyBvcHRpb25zLnZhbHVlLnRvU3RyaW5nKCkgOiAnMCc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbnVtYmVyIHNwZWNpZmllZCBieSB0aGUgdXNlci5cbiAgICAgKi9cbiAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lucHV0LnZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMuX2lucHV0LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIuTmFOO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBXaWRnZXQgYm9keSBmb3IgaW5wdXQgdGV4dCBkaWFsb2dcbiAqL1xuY2xhc3MgSW5wdXRUZXh0RGlhbG9nIGV4dGVuZHMgSW5wdXREaWFsb2dCYXNlIHtcbiAgICAvKipcbiAgICAgKiBJbnB1dFRleHREaWFsb2cgY29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIENvbnN0cnVjdG9yIG9wdGlvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMubGFiZWwpO1xuICAgICAgICB0aGlzLl9pbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICB0aGlzLl9pbnB1dC52YWx1ZSA9IG9wdGlvbnMudGV4dCA/IG9wdGlvbnMudGV4dCA6ICcnO1xuICAgICAgICBpZiAob3B0aW9ucy5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgdGhpcy5faW5wdXQucGxhY2Vob2xkZXIgPSBvcHRpb25zLnBsYWNlaG9sZGVyO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdGV4dCBzcGVjaWZpZWQgYnkgdGhlIHVzZXJcbiAgICAgKi9cbiAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lucHV0LnZhbHVlO1xuICAgIH1cbn1cbi8qKlxuICogV2lkZ2V0IGJvZHkgZm9yIGlucHV0IHBhc3N3b3JkIGRpYWxvZ1xuICovXG5jbGFzcyBJbnB1dFBhc3N3b3JkRGlhbG9nIGV4dGVuZHMgSW5wdXREaWFsb2dCYXNlIHtcbiAgICAvKipcbiAgICAgKiBJbnB1dFBhc3N3b3JkRGlhbG9nIGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBDb25zdHJ1Y3RvciBvcHRpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zLmxhYmVsKTtcbiAgICAgICAgdGhpcy5faW5wdXQudHlwZSA9ICdwYXNzd29yZCc7XG4gICAgICAgIHRoaXMuX2lucHV0LnZhbHVlID0gb3B0aW9ucy50ZXh0ID8gb3B0aW9ucy50ZXh0IDogJyc7XG4gICAgICAgIGlmIChvcHRpb25zLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnB1dC5wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0ZXh0IHNwZWNpZmllZCBieSB0aGUgdXNlclxuICAgICAqL1xuICAgIGdldFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXQudmFsdWU7XG4gICAgfVxufVxuLyoqXG4gKiBXaWRnZXQgYm9keSBmb3IgaW5wdXQgbGlzdCBkaWFsb2dcbiAqL1xuY2xhc3MgSW5wdXRJdGVtc0RpYWxvZyBleHRlbmRzIElucHV0RGlhbG9nQmFzZSB7XG4gICAgLyoqXG4gICAgICogSW5wdXRJdGVtc0RpYWxvZyBjb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgQ29uc3RydWN0b3Igb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucy5sYWJlbCk7XG4gICAgICAgIHRoaXMuX2VkaXRhYmxlID0gb3B0aW9ucy5lZGl0YWJsZSB8fCBmYWxzZTtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBvcHRpb25zLmN1cnJlbnQgfHwgMDtcbiAgICAgICAgbGV0IGRlZmF1bHRJbmRleDtcbiAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgZGVmYXVsdEluZGV4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oY3VycmVudCwgb3B0aW9ucy5pdGVtcy5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICBjdXJyZW50ID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICAgICBvcHRpb25zLml0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gZGVmYXVsdEluZGV4KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGl0ZW07XG4gICAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBpdGVtO1xuICAgICAgICAgICAgdGhpcy5fbGlzdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZWRpdGFibGUpIHtcbiAgICAgICAgICAgIC8qIFVzZSBvZiBsaXN0IGFuZCBkYXRhbGlzdCAqL1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RhdGFsaXN0Jyk7XG4gICAgICAgICAgICBkYXRhLmlkID0gJ2lucHV0LWRpYWxvZy1pdGVtcyc7XG4gICAgICAgICAgICBkYXRhLmFwcGVuZENoaWxkKHRoaXMuX2xpc3QpO1xuICAgICAgICAgICAgdGhpcy5faW5wdXQudHlwZSA9ICdsaXN0JztcbiAgICAgICAgICAgIHRoaXMuX2lucHV0LnZhbHVlID0gY3VycmVudDtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0LnNldEF0dHJpYnV0ZSgnbGlzdCcsIGRhdGEuaWQpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnB1dC5wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvKiBVc2Ugc2VsZWN0IGRpcmVjdGx5ICovXG4gICAgICAgICAgICB0aGlzLl9pbnB1dC5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZChTdHlsaW5nLndyYXBTZWxlY3QodGhpcy5fbGlzdCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdXNlciBjaG9pY2VcbiAgICAgKi9cbiAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VkaXRhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5wdXQudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlucHV0ZGlhbG9nLmpzLm1hcCIsImltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gdHJhbnNsYXRlIGtlcm5lbCBzdGF0dXNlcyBtYXBwaW5nIGJ5IHVzaW5nXG4gKiBpbnB1dCB0cmFuc2xhdG9yLlxuICpcbiAqIEBwYXJhbSB0cmFuc2xhdG9yIC0gLSBMYW5ndWFnZSB0cmFuc2xhdG9yLlxuICogQHJldHVybiBUaGUgdHJhbnNsYXRlZCBrZXJuZWwgc3RhdHVzIG1hcHBpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVLZXJuZWxTdGF0dXNlcyh0cmFuc2xhdG9yKSB7XG4gICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICBjb25zdCB0cmFuc2xhdGVkID0ge1xuICAgICAgICB1bmtub3duOiB0cmFucy5fXygnVW5rbm93bicpLFxuICAgICAgICBzdGFydGluZzogdHJhbnMuX18oJ1N0YXJ0aW5nJyksXG4gICAgICAgIGlkbGU6IHRyYW5zLl9fKCdJZGxlJyksXG4gICAgICAgIGJ1c3k6IHRyYW5zLl9fKCdCdXN5JyksXG4gICAgICAgIHRlcm1pbmF0aW5nOiB0cmFucy5fXygnVGVybWluYXRpbmcnKSxcbiAgICAgICAgcmVzdGFydGluZzogdHJhbnMuX18oJ1Jlc3RhcnRpbmcnKSxcbiAgICAgICAgYXV0b3Jlc3RhcnRpbmc6IHRyYW5zLl9fKCdBdXRvcmVzdGFydGluZycpLFxuICAgICAgICBkZWFkOiB0cmFucy5fXygnRGVhZCcpLFxuICAgICAgICBjb25uZWN0ZWQ6IHRyYW5zLl9fKCdDb25uZWN0ZWQnKSxcbiAgICAgICAgY29ubmVjdGluZzogdHJhbnMuX18oJ0Nvbm5lY3RpbmcnKSxcbiAgICAgICAgZGlzY29ubmVjdGVkOiB0cmFucy5fXygnRGlzY29ubmVjdGVkJyksXG4gICAgICAgIGluaXRpYWxpemluZzogdHJhbnMuX18oJ0luaXRpYWxpemluZycpLFxuICAgICAgICAnJzogJydcbiAgICB9O1xuICAgIHJldHVybiB0cmFuc2xhdGVkO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9a2VybmVsc3RhdHVzZXMuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBNZXNzYWdlTG9vcCB9IGZyb20gJ0BsdW1pbm8vbWVzc2FnaW5nJztcbmltcG9ydCB7IEJveExheW91dCwgQm94UGFuZWwsIFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgeyBET01VdGlscyB9IGZyb20gJy4vZG9tdXRpbHMnO1xuaW1wb3J0IHsgUHJpbnRpbmcgfSBmcm9tICcuL3ByaW50aW5nJztcbmltcG9ydCB7IFNwaW5uZXIgfSBmcm9tICcuL3NwaW5uZXInO1xuaW1wb3J0IHsgUmVhY3RpdmVUb29sYmFyIH0gZnJvbSAnLi90b29sYmFyJztcbi8qKlxuICogQSBmbGFnIHRvIGluZGljYXRlIHRoYXQgZXZlbnQgaGFuZGxlcnMgYXJlIGNhdWdodCBpbiB0aGUgY2FwdHVyZSBwaGFzZS5cbiAqL1xuY29uc3QgVVNFX0NBUFRVUkUgPSB0cnVlO1xuLyoqXG4gKiBBIHdpZGdldCBtZWFudCB0byBiZSBjb250YWluZWQgaW4gdGhlIEp1cHl0ZXJMYWIgbWFpbiBhcmVhLlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIE1pcnJvcnMgYWxsIG9mIHRoZSBgdGl0bGVgIGF0dHJpYnV0ZXMgb2YgdGhlIGNvbnRlbnQuXG4gKiBUaGlzIHdpZGdldCBpcyBgY2xvc2FibGVgIGJ5IGRlZmF1bHQuXG4gKiBUaGlzIHdpZGdldCBpcyBhdXRvbWF0aWNhbGx5IGRpc3Bvc2VkIHdoZW4gY2xvc2VkLlxuICogVGhpcyB3aWRnZXQgZW5zdXJlcyBpdHMgb3duIGZvY3VzIHdoZW4gYWN0aXZhdGVkLlxuICovXG5leHBvcnQgY2xhc3MgTWFpbkFyZWFXaWRnZXQgZXh0ZW5kcyBXaWRnZXQge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBtYWluIGFyZWEgd2lkZ2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgaW5pdGlhbGl6aW5nIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fY2hhbmdlR3VhcmQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc3Bpbm5lciA9IG5ldyBTcGlubmVyKCk7XG4gICAgICAgIHRoaXMuX2lzUmV2ZWFsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZXZ0TW91c2VEb3duID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm5vZGUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mb2N1c0NvbnRlbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtTWFpbkFyZWFXaWRnZXQnKTtcbiAgICAgICAgLy8gU2V0IGNvbnRhaW49c3RyaWN0IHRvIGF2b2lkIG1hbnkgZm9yY2VkIGxheW91dCByZW5kZXJpbmcgd2hpbGUgYWRkaW5nIGNlbGxzLlxuICAgICAgICAvLyBEb24ndCBmb3JnZXQgdG8gcmVtb3ZlIHRoZSBDU1MgY2xhc3Mgd2hlbiB5b3VyIHJlbW92ZSB0aGUgc3Bpbm5lciB0byBhbGxvd1xuICAgICAgICAvLyB0aGUgY29udGVudCB0byBiZSByZW5kZXJlZC5cbiAgICAgICAgLy8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vanVweXRlcmxhYi9qdXB5dGVybGFiL2lzc3Vlcy85MzgxXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLU1haW5BcmVhV2lkZ2V0LUNvbnRhaW5TdHJpY3QnKTtcbiAgICAgICAgdGhpcy5pZCA9IERPTVV0aWxzLmNyZWF0ZURvbUlEKCk7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gKG9wdGlvbnMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcikubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCBjb250ZW50ID0gKHRoaXMuX2NvbnRlbnQgPSBvcHRpb25zLmNvbnRlbnQpO1xuICAgICAgICBjb250ZW50Lm5vZGUuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3JlZ2lvbicpO1xuICAgICAgICBjb250ZW50Lm5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgdHJhbnMuX18oJ25vdGVib29rIGNvbnRlbnQnKSk7XG4gICAgICAgIGNvbnN0IHRvb2xiYXIgPSAodGhpcy5fdG9vbGJhciA9IG9wdGlvbnMudG9vbGJhciB8fCBuZXcgUmVhY3RpdmVUb29sYmFyKCkpO1xuICAgICAgICB0b29sYmFyLm5vZGUuc2V0QXR0cmlidXRlKCdyb2xlJywgJ25hdmlnYXRpb24nKTtcbiAgICAgICAgdG9vbGJhci5ub2RlLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHRyYW5zLl9fKCdub3RlYm9vayBhY3Rpb25zJykpO1xuICAgICAgICBjb25zdCBjb250ZW50SGVhZGVyID0gKHRoaXMuX2NvbnRlbnRIZWFkZXIgPVxuICAgICAgICAgICAgb3B0aW9ucy5jb250ZW50SGVhZGVyIHx8XG4gICAgICAgICAgICAgICAgbmV3IEJveFBhbmVsKHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiAndG9wLXRvLWJvdHRvbScsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNpbmc6IDBcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgIGNvbnN0IGxheW91dCA9ICh0aGlzLmxheW91dCA9IG5ldyBCb3hMYXlvdXQoeyBzcGFjaW5nOiAwIH0pKTtcbiAgICAgICAgbGF5b3V0LmRpcmVjdGlvbiA9ICd0b3AtdG8tYm90dG9tJztcbiAgICAgICAgQm94TGF5b3V0LnNldFN0cmV0Y2godG9vbGJhciwgMCk7XG4gICAgICAgIEJveExheW91dC5zZXRTdHJldGNoKGNvbnRlbnRIZWFkZXIsIDApO1xuICAgICAgICBCb3hMYXlvdXQuc2V0U3RyZXRjaChjb250ZW50LCAxKTtcbiAgICAgICAgbGF5b3V0LmFkZFdpZGdldCh0b29sYmFyKTtcbiAgICAgICAgbGF5b3V0LmFkZFdpZGdldChjb250ZW50SGVhZGVyKTtcbiAgICAgICAgbGF5b3V0LmFkZFdpZGdldChjb250ZW50KTtcbiAgICAgICAgaWYgKCFjb250ZW50LmlkKSB7XG4gICAgICAgICAgICBjb250ZW50LmlkID0gRE9NVXRpbHMuY3JlYXRlRG9tSUQoKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZW50Lm5vZGUudGFiSW5kZXggPSAwO1xuICAgICAgICB0aGlzLl91cGRhdGVUaXRsZSgpO1xuICAgICAgICBjb250ZW50LnRpdGxlLmNoYW5nZWQuY29ubmVjdCh0aGlzLl91cGRhdGVUaXRsZSwgdGhpcyk7XG4gICAgICAgIHRoaXMudGl0bGUuY2xvc2FibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnRpdGxlLmNoYW5nZWQuY29ubmVjdCh0aGlzLl91cGRhdGVDb250ZW50VGl0bGUsIHRoaXMpO1xuICAgICAgICBpZiAob3B0aW9ucy5yZXZlYWwpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZCh0aGlzLl9zcGlubmVyLm5vZGUpO1xuICAgICAgICAgICAgdGhpcy5fcmV2ZWFsZWQgPSBvcHRpb25zLnJldmVhbFxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudC5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRlbnQuZGlzcG9zZWQuY29ubmVjdCgoKSA9PiB0aGlzLmRpc3Bvc2UoKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5fc3Bpbm5lci5ub2RlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2VTcGlubmVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNSZXZlYWxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb2N1c0NvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTaG93IGEgcmV2ZWFsZWQgcHJvbWlzZSBlcnJvci5cbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBXaWRnZXQoKTtcbiAgICAgICAgICAgICAgICBlcnJvci5hZGRDbGFzcygnanAtTWFpbkFyZWFXaWRnZXQtZXJyb3InKTtcbiAgICAgICAgICAgICAgICAvLyBTaG93IHRoZSBlcnJvciB0byB0aGUgdXNlci5cbiAgICAgICAgICAgICAgICBjb25zdCBwcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTtcbiAgICAgICAgICAgICAgICBwcmUudGV4dENvbnRlbnQgPSBTdHJpbmcoZSk7XG4gICAgICAgICAgICAgICAgZXJyb3Iubm9kZS5hcHBlbmRDaGlsZChwcmUpO1xuICAgICAgICAgICAgICAgIEJveExheW91dC5zZXRTdHJldGNoKGVycm9yLCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXNwb3NlU3Bpbm5lcigpO1xuICAgICAgICAgICAgICAgIGNvbnRlbnQuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRvb2xiYXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2xiYXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIGxheW91dC5hZGRXaWRnZXQoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzUmV2ZWFsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgbm8gcmV2ZWFsIHByb21pc2UuXG4gICAgICAgICAgICB0aGlzLl9zcGlubmVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2pwLU1haW5BcmVhV2lkZ2V0LUNvbnRhaW5TdHJpY3QnKTtcbiAgICAgICAgICAgIGNvbnRlbnQuZGlzcG9zZWQuY29ubmVjdCgoKSA9PiB0aGlzLmRpc3Bvc2UoKSk7XG4gICAgICAgICAgICB0aGlzLl9pc1JldmVhbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3JldmVhbGVkID0gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJpbnQgbWV0aG9kLiBEZWZlcnJlZCB0byBjb250ZW50LlxuICAgICAqL1xuICAgIFtQcmludGluZy5zeW1ib2xdKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2NvbnRlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcmludGluZy5nZXRQcmludEZ1bmN0aW9uKHRoaXMuX2NvbnRlbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY29udGVudCBob3N0ZWQgYnkgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBnZXQgY29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSB0b29sYmFyIGhvc3RlZCBieSB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIGdldCB0b29sYmFyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbGJhcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwYW5lbCBmb3Igd2lkZ2V0cyB0aGF0IHNpdCBiZXR3ZWVuIHRoZSB0b29sYmFyIGFuZCB0aGUgY29udGVudC5cbiAgICAgKiBJbWFnaW5lIGEgZm9ybWF0dGluZyB0b29sYmFyLCBub3RpZmljYXRpb24gaGVhZGVycywgZXRjLlxuICAgICAqL1xuICAgIGdldCBjb250ZW50SGVhZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudEhlYWRlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgY29udGVudCB3aWRnZXQgb3IgYW4gZXJyb3IgaXMgcmV2ZWFsZWQuXG4gICAgICovXG4gICAgZ2V0IGlzUmV2ZWFsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1JldmVhbGVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB3aWRnZXQgaXMgcmV2ZWFsZWQuXG4gICAgICovXG4gICAgZ2V0IHJldmVhbGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmV2ZWFsZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgJ2FjdGl2YXRlLXJlcXVlc3QnYCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBvbkFjdGl2YXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzUmV2ZWFsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzQ29udGVudCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc3Bpbm5lci5ub2RlLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGBhZnRlci1hdHRhY2hgIG1lc3NhZ2VzIGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIG9uQWZ0ZXJBdHRhY2gobXNnKSB7XG4gICAgICAgIHN1cGVyLm9uQWZ0ZXJBdHRhY2gobXNnKTtcbiAgICAgICAgLy8gRm9jdXMgY29udGVudCBpbiBjYXB0dXJlIHBoYXNlIHRvIGVuc3VyZSByZWxldmFudCBjb21tYW5kcyBvcGVyYXRlIG9uIHRoZVxuICAgICAgICAvLyBjdXJyZW50IG1haW4gYXJlYSB3aWRnZXQuXG4gICAgICAgIC8vIEFkZCB0aGUgZXZlbnQgbGlzdGVuZXIgZGlyZWN0bHkgaW5zdGVhZCBvZiB1c2luZyBgaGFuZGxlRXZlbnRgIGluIG9yZGVyXG4gICAgICAgIC8vIHRvIHNhdmUgc3ViLWNsYXNzZXMgZnJvbSBuZWVkaW5nIHRvIHJlYXNvbiBhYm91dCBjYWxsaW5nIGl0IGFzIHdlbGwuXG4gICAgICAgIHRoaXMubm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9ldnRNb3VzZURvd24sIFVTRV9DQVBUVVJFKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGBiZWZvcmUtZGV0YWNoYCBtZXNzYWdlcyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBvbkJlZm9yZURldGFjaChtc2cpIHtcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX2V2dE1vdXNlRG93biwgVVNFX0NBUFRVUkUpO1xuICAgICAgICBzdXBlci5vbkJlZm9yZURldGFjaChtc2cpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYCdjbG9zZS1yZXF1ZXN0J2AgbWVzc2FnZXMuXG4gICAgICovXG4gICAgb25DbG9zZVJlcXVlc3QobXNnKSB7XG4gICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYCd1cGRhdGUtcmVxdWVzdCdgIG1lc3NhZ2VzIGJ5IGZvcndhcmRpbmcgdGhlbSB0byB0aGUgY29udGVudC5cbiAgICAgKi9cbiAgICBvblVwZGF0ZVJlcXVlc3QobXNnKSB7XG4gICAgICAgIGlmICh0aGlzLl9jb250ZW50KSB7XG4gICAgICAgICAgICBNZXNzYWdlTG9vcC5zZW5kTWVzc2FnZSh0aGlzLl9jb250ZW50LCBtc2cpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9kaXNwb3NlU3Bpbm5lcigpIHtcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKHRoaXMuX3NwaW5uZXIubm9kZSk7XG4gICAgICAgIHRoaXMuX3NwaW5uZXIuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdqcC1NYWluQXJlYVdpZGdldC1Db250YWluU3RyaWN0Jyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgdGl0bGUgYmFzZWQgb24gdGhlIGF0dHJpYnV0ZXMgb2YgdGhlIGNoaWxkIHdpZGdldC5cbiAgICAgKi9cbiAgICBfdXBkYXRlVGl0bGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jaGFuZ2VHdWFyZCB8fCAhdGhpcy5jb250ZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2hhbmdlR3VhcmQgPSB0cnVlO1xuICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5jb250ZW50O1xuICAgICAgICB0aGlzLnRpdGxlLmxhYmVsID0gY29udGVudC50aXRsZS5sYWJlbDtcbiAgICAgICAgdGhpcy50aXRsZS5tbmVtb25pYyA9IGNvbnRlbnQudGl0bGUubW5lbW9uaWM7XG4gICAgICAgIHRoaXMudGl0bGUuaWNvbiA9IGNvbnRlbnQudGl0bGUuaWNvbjtcbiAgICAgICAgdGhpcy50aXRsZS5pY29uQ2xhc3MgPSBjb250ZW50LnRpdGxlLmljb25DbGFzcztcbiAgICAgICAgdGhpcy50aXRsZS5pY29uTGFiZWwgPSBjb250ZW50LnRpdGxlLmljb25MYWJlbDtcbiAgICAgICAgdGhpcy50aXRsZS5jYXB0aW9uID0gY29udGVudC50aXRsZS5jYXB0aW9uO1xuICAgICAgICB0aGlzLnRpdGxlLmNsYXNzTmFtZSA9IGNvbnRlbnQudGl0bGUuY2xhc3NOYW1lO1xuICAgICAgICB0aGlzLnRpdGxlLmRhdGFzZXQgPSBjb250ZW50LnRpdGxlLmRhdGFzZXQ7XG4gICAgICAgIHRoaXMuX2NoYW5nZUd1YXJkID0gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgY29udGVudCB0aXRsZSBiYXNlZCBvbiBhdHRyaWJ1dGVzIG9mIHRoZSBtYWluIHdpZGdldC5cbiAgICAgKi9cbiAgICBfdXBkYXRlQ29udGVudFRpdGxlKCkge1xuICAgICAgICBpZiAodGhpcy5fY2hhbmdlR3VhcmQgfHwgIXRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoYW5nZUd1YXJkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuY29udGVudDtcbiAgICAgICAgY29udGVudC50aXRsZS5sYWJlbCA9IHRoaXMudGl0bGUubGFiZWw7XG4gICAgICAgIGNvbnRlbnQudGl0bGUubW5lbW9uaWMgPSB0aGlzLnRpdGxlLm1uZW1vbmljO1xuICAgICAgICBjb250ZW50LnRpdGxlLmljb24gPSB0aGlzLnRpdGxlLmljb247XG4gICAgICAgIGNvbnRlbnQudGl0bGUuaWNvbkNsYXNzID0gdGhpcy50aXRsZS5pY29uQ2xhc3M7XG4gICAgICAgIGNvbnRlbnQudGl0bGUuaWNvbkxhYmVsID0gdGhpcy50aXRsZS5pY29uTGFiZWw7XG4gICAgICAgIGNvbnRlbnQudGl0bGUuY2FwdGlvbiA9IHRoaXMudGl0bGUuY2FwdGlvbjtcbiAgICAgICAgY29udGVudC50aXRsZS5jbGFzc05hbWUgPSB0aGlzLnRpdGxlLmNsYXNzTmFtZTtcbiAgICAgICAgY29udGVudC50aXRsZS5kYXRhc2V0ID0gdGhpcy50aXRsZS5kYXRhc2V0O1xuICAgICAgICB0aGlzLl9jaGFuZ2VHdWFyZCA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHaXZlIGZvY3VzIHRvIHRoZSBjb250ZW50LlxuICAgICAqL1xuICAgIF9mb2N1c0NvbnRlbnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb250ZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gRm9jdXMgdGhlIGNvbnRlbnQgbm9kZSBpZiB3ZSBhcmVuJ3QgYWxyZWFkeSBmb2N1c2VkIG9uIGl0IG9yIGFcbiAgICAgICAgLy8gZGVzY2VuZGVudC5cbiAgICAgICAgaWYgKCF0aGlzLmNvbnRlbnQubm9kZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Lm5vZGUuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBY3RpdmF0ZSB0aGUgY29udGVudCBhc3luY2hyb25vdXNseSAod2hpY2ggbWF5IGNoYW5nZSB0aGUgZm9jdXMpLlxuICAgICAgICB0aGlzLmNvbnRlbnQuYWN0aXZhdGUoKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluYXJlYXdpZGdldC5qcy5tYXAiLCJ2YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBUZXh0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IExhYkljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IEpTT05FeHQgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbnMgdG8gYnVpbGQgYSBtZW51IGZyb20gdGhlIHNldHRpbmdzXG4gKi9cbmV4cG9ydCB2YXIgTWVudUZhY3Rvcnk7XG4oZnVuY3Rpb24gKE1lbnVGYWN0b3J5KSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG1lbnVzIGZyb20gdGhlaXIgZGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhIE1lbnViYXIgZGVzY3JpcHRpb25cbiAgICAgKiBAcGFyYW0gbWVudUZhY3RvcnkgRmFjdG9yeSBmb3IgZW1wdHkgbWVudVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZU1lbnVzKGRhdGEsIG1lbnVGYWN0b3J5KSB7XG4gICAgICAgIHJldHVybiBkYXRhXG4gICAgICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gIWl0ZW0uZGlzYWJsZWQpXG4gICAgICAgICAgICAuc29ydCgoYSwgYikgPT4geyB2YXIgX2EsIF9iOyByZXR1cm4gKChfYSA9IGEucmFuaykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogSW5maW5pdHkpIC0gKChfYiA9IGIucmFuaykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogSW5maW5pdHkpOyB9KVxuICAgICAgICAgICAgLm1hcChtZW51SXRlbSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YVRvTWVudShtZW51SXRlbSwgbWVudUZhY3RvcnkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgTWVudUZhY3RvcnkuY3JlYXRlTWVudXMgPSBjcmVhdGVNZW51cztcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgbWVudSBkZXNjcmlwdGlvbiBpbiBhIEp1cHl0ZXJMYWJNZW51IG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIGl0ZW0gTWVudSBkZXNjcmlwdGlvblxuICAgICAqIEBwYXJhbSBtZW51RmFjdG9yeSBFbXB0eSBtZW51IGZhY3RvcnlcbiAgICAgKiBAcmV0dXJucyBUaGUgbWVudSB3aWRnZXRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkYXRhVG9NZW51KGl0ZW0sIG1lbnVGYWN0b3J5KSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IG1lbnUgPSBtZW51RmFjdG9yeShpdGVtKTtcbiAgICAgICAgbWVudS5pZCA9IGl0ZW0uaWQ7XG4gICAgICAgIC8vIFNldCB0aGUgbGFiZWwgaW4gY2FzZSB0aGUgbWVudSBmYWN0b3J5IGRpZCBub3QuXG4gICAgICAgIGlmICghbWVudS50aXRsZS5sYWJlbCkge1xuICAgICAgICAgICAgbWVudS50aXRsZS5sYWJlbCA9IChfYSA9IGl0ZW0ubGFiZWwpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFRleHQudGl0bGVDYXNlKG1lbnUuaWQudHJpbSgpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbS5pY29uKSB7XG4gICAgICAgICAgICBtZW51LnRpdGxlLmljb24gPSBMYWJJY29uLnJlc29sdmUoeyBpY29uOiBpdGVtLmljb24gfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0ubW5lbW9uaWMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbWVudS50aXRsZS5tbmVtb25pYyA9IGl0ZW0ubW5lbW9uaWM7XG4gICAgICAgIH1cbiAgICAgICAgKF9iID0gaXRlbS5pdGVtcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmZpbHRlcihpdGVtID0+ICFpdGVtLmRpc2FibGVkKS5zb3J0KChhLCBiKSA9PiB7IHZhciBfYSwgX2I7IHJldHVybiAoKF9hID0gYS5yYW5rKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBJbmZpbml0eSkgLSAoKF9iID0gYi5yYW5rKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBJbmZpbml0eSk7IH0pLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgIGFkZEl0ZW0oaXRlbSwgbWVudSwgbWVudUZhY3RvcnkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1lbnU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYW4gaXRlbSBkZXNjcmlwdGlvbiBpbiBhIGNvbnRleHQgbWVudSBpdGVtIG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIGl0ZW0gQ29udGV4dCBtZW51IGl0ZW1cbiAgICAgKiBAcGFyYW0gbWVudSBDb250ZXh0IG1lbnUgdG8gcG9wdWxhdGVcbiAgICAgKiBAcGFyYW0gbWVudUZhY3RvcnkgRW1wdHkgbWVudSBmYWN0b3J5XG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkQ29udGV4dEl0ZW0oaXRlbSwgbWVudSwgbWVudUZhY3RvcnkpIHtcbiAgICAgICAgY29uc3QgeyBzdWJtZW51IH0gPSBpdGVtLCBuZXdJdGVtID0gX19yZXN0KGl0ZW0sIFtcInN1Ym1lbnVcIl0pO1xuICAgICAgICAvLyBDb21tYW5kcyBtYXkgbm90IGhhdmUgYmVlbiByZWdpc3RlcmVkIHlldDsgc28gd2UgZG9uJ3QgZm9yY2UgaXQgdG8gZXhpc3RcbiAgICAgICAgbWVudS5hZGRJdGVtKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbmV3SXRlbSksIHsgc3VibWVudTogc3VibWVudSA/IGRhdGFUb01lbnUoc3VibWVudSwgbWVudUZhY3RvcnkpIDogbnVsbCB9KSk7XG4gICAgfVxuICAgIE1lbnVGYWN0b3J5LmFkZENvbnRleHRJdGVtID0gYWRkQ29udGV4dEl0ZW07XG4gICAgLyoqXG4gICAgICogQ29udmVydCBhbiBpdGVtIGRlc2NyaXB0aW9uIGluIGEgbWVudSBpdGVtIG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIGl0ZW0gTWVudSBpdGVtXG4gICAgICogQHBhcmFtIG1lbnUgTWVudSB0byBwb3B1bGF0ZVxuICAgICAqIEBwYXJhbSBtZW51RmFjdG9yeSBFbXB0eSBtZW51IGZhY3RvcnlcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhZGRJdGVtKGl0ZW0sIG1lbnUsIG1lbnVGYWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IHsgc3VibWVudSB9ID0gaXRlbSwgbmV3SXRlbSA9IF9fcmVzdChpdGVtLCBbXCJzdWJtZW51XCJdKTtcbiAgICAgICAgLy8gQ29tbWFuZHMgbWF5IG5vdCBoYXZlIGJlZW4gcmVnaXN0ZXJlZCB5ZXQ7IHNvIHdlIGRvbid0IGZvcmNlIGl0IHRvIGV4aXN0XG4gICAgICAgIG1lbnUuYWRkSXRlbShPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG5ld0l0ZW0pLCB7IHN1Ym1lbnU6IHN1Ym1lbnUgPyBkYXRhVG9NZW51KHN1Ym1lbnUsIG1lbnVGYWN0b3J5KSA6IG51bGwgfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgbGlzdCBvZiBtZW51IGFuZCByZXR1cm5zXG4gICAgICogdGhlIG5ldyBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZVxuICAgICAqIE5ldyBlbGVtZW50cyBhcmUgYWRkZWQgdG8gdGhlIGN1cnJlbnQgbWVudSBsaXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIG1lbnVzIEN1cnJlbnQgbWVudXNcbiAgICAgKiBAcGFyYW0gZGF0YSBOZXcgZGVzY3JpcHRpb24gdG8gdGFrZSBpbnRvIGFjY291bnRcbiAgICAgKiBAcGFyYW0gbWVudUZhY3RvcnkgRW1wdHkgbWVudSBmYWN0b3J5XG4gICAgICogQHJldHVybnMgTmV3bHkgY3JlYXRlZCBtZW51c1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZU1lbnVzKG1lbnVzLCBkYXRhLCBtZW51RmFjdG9yeSkge1xuICAgICAgICBjb25zdCBuZXdNZW51cyA9IFtdO1xuICAgICAgICBkYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZW51ID0gbWVudXMuZmluZChtZW51ID0+IG1lbnUuaWQgPT09IGl0ZW0uaWQpO1xuICAgICAgICAgICAgaWYgKG1lbnUpIHtcbiAgICAgICAgICAgICAgICBtZXJnZU1lbnVzKGl0ZW0sIG1lbnUsIG1lbnVGYWN0b3J5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdNZW51cy5wdXNoKGRhdGFUb01lbnUoaXRlbSwgbWVudUZhY3RvcnkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBtZW51cy5wdXNoKC4uLm5ld01lbnVzKTtcbiAgICAgICAgcmV0dXJuIG5ld01lbnVzO1xuICAgIH1cbiAgICBNZW51RmFjdG9yeS51cGRhdGVNZW51cyA9IHVwZGF0ZU1lbnVzO1xuICAgIGZ1bmN0aW9uIG1lcmdlTWVudXMoaXRlbSwgbWVudSwgbWVudUZhY3RvcnkpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgbWVudS5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAoX2EgPSBpdGVtLml0ZW1zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICBjb25zdCBleGlzdGluZ0l0ZW0gPSBtZW51ID09PSBudWxsIHx8IG1lbnUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lbnUuaXRlbXMuZmluZCgoaSwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaS50eXBlID09PSBlbnRyeS50eXBlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBpLmNvbW1hbmQgPT09ICgoX2EgPSBlbnRyeS5jb21tYW5kKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICgoX2IgPSBpLnN1Ym1lbnUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5pZCkgPT09ICgoX2MgPSBlbnRyeS5zdWJtZW51KSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ0l0ZW0gJiYgZW50cnkudHlwZSAhPT0gJ3NlcGFyYXRvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51LnJlbW92ZUl0ZW0oZXhpc3RpbmdJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoKF9hID0gZW50cnkudHlwZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJ2NvbW1hbmQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY29tbWFuZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5jb21tYW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUpTT05FeHQuZGVlcEVxdWFsKGV4aXN0aW5nSXRlbS5hcmdzLCAoX2IgPSBlbnRyeS5hcmdzKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiB7fSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtKGVudHJ5LCBtZW51LCBtZW51RmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3VibWVudSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5zdWJtZW51KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXJnZU1lbnVzKGVudHJ5LnN1Ym1lbnUsIGV4aXN0aW5nSXRlbS5zdWJtZW51LCBtZW51RmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkSXRlbShlbnRyeSwgbWVudSwgbWVudUZhY3RvcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSkoTWVudUZhY3RvcnkgfHwgKE1lbnVGYWN0b3J5ID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lbnVmYWN0b3J5LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFNlcnZlckNvbm5lY3Rpb24gfSBmcm9tICdAanVweXRlcmxhYi9zZXJ2aWNlcyc7XG4vKipcbiAqIEFueSBvYmplY3QgaXMgXCJwcmludGFibGVcIiBpZiBpdCBpbXBsZW1lbnRzIHRoZSBgSVByaW50YWJsZWAgaW50ZXJmYWNlLlxuICpcbiAqIFRvIGRvIHRoaXMgaXQsIGl0IG11c3QgaGF2ZSBhIG1ldGhvZCBjYWxsZWQgYFByaW50aW5nLnN5bWJvbGAgd2hpY2ggcmV0dXJucyBlaXRoZXIgYSBmdW5jdGlvblxuICogdG8gcHJpbnQgdGhlIG9iamVjdCBvciBudWxsIGlmIGl0IGNhbm5vdCBiZSBwcmludGVkLlxuICpcbiAqIE9uZSB3YXkgb2YgcHJpbnRpbmcgaXMgdG8gdXNlIHRoZSBgcHJpbnRXaWRnZXRgIGZ1bmN0aW9uLCB3aGljaCBjcmVhdGVzIGEgaGlkZGVuIGlmcmFtZVxuICogYW5kIGNvcGllcyB0aGUgRE9NIG5vZGVzIGZyb20geW91ciB3aWRnZXQgdG8gdGhhdCBpZnJhbWUgYW5kIHByaW50aW5nIGp1c3QgdGhhdCBpZnJhbWUuXG4gKlxuICogQW5vdGhlciB3YXkgdG8gcHJpbnQgaXMgdG8gdXNlIHRoZSBgcHJpbnRVUkxgIGZ1bmN0aW9uLCB3aGljaCB0YWtlcyBhIFVSTCBhbmQgcHJpbnRzIHRoYXQgcGFnZS5cbiAqL1xuZXhwb3J0IHZhciBQcmludGluZztcbihmdW5jdGlvbiAoUHJpbnRpbmcpIHtcbiAgICAvKipcbiAgICAgKiBTeW1ib2wgdG8gdXNlIGZvciBhIG1ldGhvZCB0aGF0IHJldHVybnMgYSBmdW5jdGlvbiB0byBwcmludCBhbiBvYmplY3QuXG4gICAgICovXG4gICAgUHJpbnRpbmcuc3ltYm9sID0gU3ltYm9sKCdwcmludGFibGUnKTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgYW4gb2JqZWN0IGltcGxlbWVudHMgYSBwcmludCBtZXRob2QuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNQcmludGFibGUoYSkge1xuICAgICAgICBpZiAodHlwZW9mIGEgIT09ICdvYmplY3QnIHx8ICFhKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByaW50aW5nLnN5bWJvbCBpbiBhO1xuICAgIH1cbiAgICBQcmludGluZy5pc1ByaW50YWJsZSA9IGlzUHJpbnRhYmxlO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHByaW50IGZ1bmN0aW9uIGZvciBhbiBvYmplY3QsIG9yIG51bGwgaWYgaXQgZG9lcyBub3QgcHJvdmlkZSBhIGhhbmRsZXIuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UHJpbnRGdW5jdGlvbih2YWwpIHtcbiAgICAgICAgaWYgKGlzUHJpbnRhYmxlKHZhbCkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWxbUHJpbnRpbmcuc3ltYm9sXSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBQcmludGluZy5nZXRQcmludEZ1bmN0aW9uID0gZ2V0UHJpbnRGdW5jdGlvbjtcbiAgICAvKipcbiAgICAgKiBQcmludHMgYSB3aWRnZXQgYnkgY29weWluZyBpdCdzIERPTSBub2RlXG4gICAgICogdG8gYSBoaWRkZW4gaWZyYW1lIGFuZCBwcmludGluZyB0aGF0IGlmcmFtZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcmludFdpZGdldCh3aWRnZXQpIHtcbiAgICAgICAgcmV0dXJuIHByaW50Q29udGVudCh3aWRnZXQubm9kZSk7XG4gICAgfVxuICAgIFByaW50aW5nLnByaW50V2lkZ2V0ID0gcHJpbnRXaWRnZXQ7XG4gICAgLyoqXG4gICAgICogUHJpbnRzIGEgVVJMIGJ5IGxvYWRpbmcgaXQgaW50byBhbiBpZnJhbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdXJsIFVSTCB0byBsb2FkIGludG8gYW4gaWZyYW1lLlxuICAgICAqL1xuICAgIGFzeW5jIGZ1bmN0aW9uIHByaW50VVJMKHVybCkge1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IFNlcnZlckNvbm5lY3Rpb24ubWFrZVNldHRpbmdzKCk7XG4gICAgICAgIGNvbnN0IHRleHQgPSBhd2FpdCAoYXdhaXQgU2VydmVyQ29ubmVjdGlvbi5tYWtlUmVxdWVzdCh1cmwsIHt9LCBzZXR0aW5ncykpLnRleHQoKTtcbiAgICAgICAgcmV0dXJuIHByaW50Q29udGVudCh0ZXh0KTtcbiAgICB9XG4gICAgUHJpbnRpbmcucHJpbnRVUkwgPSBwcmludFVSTDtcbiAgICAvKipcbiAgICAgKiBQcmludHMgYSBVUkwgb3IgYW4gZWxlbWVudCBpbiBhbiBpZnJhbWUgYW5kIHRoZW4gcmVtb3ZlcyB0aGUgaWZyYW1lIGFmdGVyIHByaW50aW5nLlxuICAgICAqL1xuICAgIGFzeW5jIGZ1bmN0aW9uIHByaW50Q29udGVudCh0ZXh0T3JFbCkge1xuICAgICAgICBjb25zdCBpc1RleHQgPSB0eXBlb2YgdGV4dE9yRWwgPT09ICdzdHJpbmcnO1xuICAgICAgICBjb25zdCBpZnJhbWUgPSBjcmVhdGVJRnJhbWUoKTtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gd2luZG93LmRvY3VtZW50LmJvZHk7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgICBpZiAoaXNUZXh0KSB7XG4gICAgICAgICAgICBpZnJhbWUuc3JjZG9jID0gdGV4dE9yRWw7XG4gICAgICAgICAgICBhd2FpdCByZXNvbHZlV2hlbkxvYWRlZChpZnJhbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWZyYW1lLnNyYyA9ICdhYm91dDpibGFuayc7XG4gICAgICAgICAgICBhd2FpdCByZXNvbHZlV2hlbkxvYWRlZChpZnJhbWUpO1xuICAgICAgICAgICAgc2V0SUZyYW1lTm9kZShpZnJhbWUsIHRleHRPckVsKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcmludGVkID0gcmVzb2x2ZUFmdGVyRXZlbnQoKTtcbiAgICAgICAgbGF1bmNoUHJpbnQoaWZyYW1lLmNvbnRlbnRXaW5kb3cpO1xuICAgICAgICAvLyBPbmNlIHRoZSBwcmludCBkaWFsb2cgaGFzIGJlZW4gZGlzbWlzc2VkLCB3ZSByZWdhaW4gZXZlbnQgaGFuZGxpbmcsXG4gICAgICAgIC8vIGFuZCBpdCBzaG91bGQgYmUgc2FmZSB0byBkaXNjYXJkIHRoZSBoaWRkZW4gaWZyYW1lLlxuICAgICAgICBhd2FpdCBwcmludGVkO1xuICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBoaWRkZW4gaWZyYW1lIGFuZCBhcHBlbmRzIGl0IHRvIHRoZSBkb2N1bWVudFxuICAgICAqXG4gICAgICogTW9kaWZpZWQgZnJvbVxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9qb3NlbHVpc3EvcHJpbnRkL2Jsb2IvZWI3OTQ4ZDYwMjU4M2MwNTVhYjZkZWUzZWUyOTRiNmE0MjFkYTRiNi9zcmMvaW5kZXgudHMjTDI0XG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlSUZyYW1lKCkge1xuICAgICAgICBjb25zdCBlbCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAgLy8gV2UgbmVlZCBib3RoIGFsbG93LW1vZGFscyBhbmQgYWxsb3ctc2FtZS1vcmlnaW4gdG8gYmUgYWJsZSB0b1xuICAgICAgICAvLyBjYWxsIHByaW50IGluIHRoZSBpZnJhbWUuXG4gICAgICAgIC8vIFdlIGludGVudGlvbmFsbHkgZG8gbm90IGFsbG93IHNjcmlwdHM6XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qdXB5dGVybGFiL2p1cHl0ZXJsYWIvcHVsbC81ODUwI3B1bGxyZXF1ZXN0cmV2aWV3LTIzMDg5OTc5MFxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3NhbmRib3gnLCAnYWxsb3ctbW9kYWxzIGFsbG93LXNhbWUtb3JpZ2luJyk7XG4gICAgICAgIGNvbnN0IGNzcyA9ICd2aXNpYmlsaXR5OmhpZGRlbjt3aWR0aDowO2hlaWdodDowO3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6LTk5OTk7Ym90dG9tOjA7JztcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdzdHlsZScsIGNzcyk7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMCcpO1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcwJyk7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29waWVzIGEgbm9kZSBmcm9tIHRoZSBiYXNlIGRvY3VtZW50IHRvIHRoZSBpZnJhbWUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0SUZyYW1lTm9kZShpZnJhbWUsIG5vZGUpIHtcbiAgICAgICAgaWZyYW1lLmNvbnRlbnREb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGUuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgaWZyYW1lLmNvbnRlbnREb2N1bWVudC5jbG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiBhbGwgcmVzb3VyY2VzIGFyZSBsb2FkZWQgaW4gdGhlIHdpbmRvdy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXNvbHZlV2hlbkxvYWRlZChpZnJhbWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgaWZyYW1lLm9ubG9hZCA9ICgpID0+IHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGFmdGVyIHRoZSBuZXh0IG1vdXNlZG93biwgbW91c2Vtb3ZlLCBvclxuICAgICAqIGtleWRvd24gZXZlbnQuIFdlIHVzZSB0aGlzIGFzIGEgcHJveHkgZm9yIGRldGVybWluaW5nIHdoZW4gdGhlXG4gICAgICogbWFpbiB3aW5kb3cgaGFzIHJlZ2FpbmVkIGNvbnRyb2wgYWZ0ZXIgdGhlIHByaW50IGRpYWxvZyBpcyByZW1vdmVkLlxuICAgICAqXG4gICAgICogV2UgY2FuJ3QgdXNlIHRoZSB1c3VhbCB3aW5kb3cub25hZnRlcnByaW50IGhhbmRsZXIgYmVjYXVzZSB3ZVxuICAgICAqIGRpc2FsbG93IEphdmFzY3JpcHQgZXhlY3V0aW9uIGluIHRoZSBwcmludCBpZnJhbWUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZUFmdGVyRXZlbnQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9uRXZlbnQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25FdmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25FdmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uRXZlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbkV2ZW50LCB0cnVlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG9uRXZlbnQsIHRydWUpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uRXZlbnQsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJpbnRzIGEgY29udGVudCB3aW5kb3cuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbGF1bmNoUHJpbnQoY29udGVudFdpbmRvdykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjb250ZW50V2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdwcmludCcsIGZhbHNlKTtcbiAgICAgICAgLy8gZXhlY0NvbW1hbmQgd29uJ3Qgd29yayBpbiBmaXJlZm94IHNvIHdlIGNhbGwgdGhlIGBwcmludGAgbWV0aG9kIGluc3RlYWQgaWYgaXQgZmFpbHNcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2pvc2VsdWlzcS9wcmludGQvYmxvYi9lYjc5NDhkNjAyNTgzYzA1NWFiNmRlZTNlZTI5NGI2YTQyMWRhNGI2L3NyYy9pbmRleC50cyNMMTQ4XG4gICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICBjb250ZW50V2luZG93LnByaW50KCk7XG4gICAgICAgIH1cbiAgICB9XG59KShQcmludGluZyB8fCAoUHJpbnRpbmcgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJpbnRpbmcuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLy8gc2FuaXRpemUtaHRtbCB1c2VzIHRoZSB1cmwgcGFja2FnZSwgc28gd2UgZGVwZW5kIG9uIGEgc3RhbmRhbG9uZSB2ZXJzaW9uIG9mXG4vLyBpdCB3aGljaCBhY3RzIGFzIGEgcG9seWZpbGwgZm9yIGJyb3dzZXJzLlxuaW1wb3J0IHNhbml0aXplIGZyb20gJ3Nhbml0aXplLWh0bWwnO1xuLyoqXG4gKiBIZWxwZXIgY2xhc3MgdGhhdCBjb250YWlucyByZWd1bGFyIGV4cHJlc3Npb25zIGZvciBpbmxpbmUgQ1NTIHN0eWxlIHZhbGlkYXRpb24uXG4gKlxuICogV2hpY2ggcHJvcGVydGllcyAoYW5kIHZhbHVlcykgdG8gYWxsb3cgaXMgbGFyZ2VseSBiYXNlZCBvbiB0aGUgR29vZ2xlIENhamEgcHJvamVjdDpcbiAqICAgaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZS9jYWphXG4gKlxuICogVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbnMgYXJlIGxhcmdseSBiYXNlZCBvbiB0aGUgc3ludGF4IGRlZmluaXRpb24gZm91bmQgYXRcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy5cbiAqL1xuY2xhc3MgQ3NzUHJvcCB7XG4gICAgc3RhdGljIHJlZyhyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHIgKyAnJCcsICdpJyk7XG4gICAgfVxufVxuLypcbiAqIE51bWVyaWMgYmFzZSBleHByZXNzaW9ucyB1c2VkIHRvIGhlbHAgYnVpbGQgbW9yZSBjb21wbGV4IHJlZ3VsYXIgZXhwcmVzc2lvbnNcbiAqL1xuQ3NzUHJvcC5OID0ge1xuICAgIGludGVnZXI6IGBbKy1dP1swLTldK2AsXG4gICAgaW50ZWdlcl9wb3M6IGBbK10/WzAtOV0rYCxcbiAgICBpbnRlZ2VyX3plcm9fZmY6IGAoWzAtOV18WzEtOV1bMC05XXwxWzAtOV1bMC05XXwyWzAtNF1bMC05XXwyNVswLTVdKWAsXG4gICAgbnVtYmVyOiBgWystXT8oWzAtOV0qWy5dKT9bMC05XSsoZS0/WzAtOV0qKT9gLFxuICAgIG51bWJlcl9wb3M6IGBbK10/KFswLTldKlsuXSk/WzAtOV0rKGUtP1swLTldKik/YCxcbiAgICBudW1iZXJfemVyb19odW5kcmVkOiBgWytdPygoWzAtOV18WzEtOV1bMC05XSkoWy5dWzAtOV0rKT98MTAwKWAsXG4gICAgbnVtYmVyX3plcm9fb25lOiBgWytdPygxKFsuXVswXSspP3wwPyhbLl1bMC05XSspPylgXG59O1xuLypcbiAqIEJhc2UgZXhwcmVzc2lvbnMgb2YgY29tbW9uIENTUyBzeW50YXggZWxlbWVudHNcbiAqL1xuQ3NzUHJvcC5CID0ge1xuICAgIGFuZ2xlOiBgKCR7Q3NzUHJvcC5OLm51bWJlcn0oZGVnfHJhZHxncmFkfHR1cm4pfDApYCxcbiAgICBmcmVxdWVuY3k6IGAke0Nzc1Byb3AuTi5udW1iZXJ9KEh6fGtIeilgLFxuICAgIGlkZW50OiBTdHJpbmcucmF3IGAtPyhbX2Etel18W1xceEEwLVxceEZGXXxcXFxcWzAtOWEtZl17MSw2fShcXHJcXG58WyBcXHRcXHJcXG5cXGZdKT98XFxcXFteXFxyXFxuXFxmMC05YS1mXSkoW19hLXowLTktXXxbXFx4QTAtXFx4RkZdfFxcXFxbMC05YS1mXXsxLDZ9KFxcclxcbnxbIFxcdFxcclxcblxcZl0pP3xcXFxcW15cXHJcXG5cXGYwLTlhLWZdKSpgLFxuICAgIGxlbl9vcl9wZXJjOiBgKDB8JHtDc3NQcm9wLk4ubnVtYmVyfShweHxlbXxyZW18ZXh8aW58Y218bW18cHR8cGN8JSkpYCxcbiAgICBsZW5ndGg6IGAoJHtDc3NQcm9wLk4ubnVtYmVyfShweHxlbXxyZW18ZXh8aW58Y218bW18cHR8cGMpfDApYCxcbiAgICBsZW5ndGhfcG9zOiBgKCR7Q3NzUHJvcC5OLm51bWJlcl9wb3N9KHB4fGVtfHJlbXxleHxpbnxjbXxtbXxwdHxwYyl8MClgLFxuICAgIHBlcmNlbnRhZ2U6IGAke0Nzc1Byb3AuTi5udW1iZXJ9JWAsXG4gICAgcGVyY2VudGFnZV9wb3M6IGAke0Nzc1Byb3AuTi5udW1iZXJfcG9zfSVgLFxuICAgIHBlcmNlbnRhZ2VfemVyb19odW5kcmVkOiBgJHtDc3NQcm9wLk4ubnVtYmVyX3plcm9faHVuZHJlZH0lYCxcbiAgICBzdHJpbmc6IFN0cmluZy5yYXcgYChcXFwiKFteXFxuXFxyXFxmXFxcXFwiXXxcXFxcXFxufFxcclxcbnxcXHJ8XFxmfFxcXFxbMC05YS1mXXsxLDZ9KFxcclxcbnxbIFxcdFxcclxcblxcZl0pP3xcXFxcW15cXHJcXG5cXGYwLTlhLWZdKSpcXFwiKXwoXFwnKFteXFxuXFxyXFxmXFxcXCddfFxcXFxcXG58XFxyXFxufFxccnxcXGZ8XFxcXFswLTlhLWZdezEsNn0oXFxyXFxufFsgXFx0XFxyXFxuXFxmXSk/fFxcXFxbXlxcclxcblxcZjAtOWEtZl0pKlxcJylgLFxuICAgIHRpbWU6IGAke0Nzc1Byb3AuTi5udW1iZXJ9KHN8bXMpYCxcbiAgICB1cmw6IGB1cmxcXFxcKC4qP1xcXFwpYCxcbiAgICB6X2luZGV4OiBgWystXT9bMC05XXsxLDd9YFxufTtcbi8qXG4gKiBBdG9taWMgKGkuZS4gbm90IGRlcGVuZGFudCBvbiBvdGhlciByZWd1bGFyIGV4cHJlc3Npb25zKSBzdWIgUmVnRXggc2VnbWVudHNcbiAqL1xuQ3NzUHJvcC5BID0ge1xuICAgIGFic29sdXRlX3NpemU6IGB4eC1zbWFsbHx4LXNtYWxsfHNtYWxsfG1lZGl1bXxsYXJnZXx4LWxhcmdlfHh4LWxhcmdlYCxcbiAgICBhdHRhY2htZW50OiBgc2Nyb2xsfGZpeGVkfGxvY2FsYCxcbiAgICBiZ19vcmlnaW46IGBib3JkZXItYm94fHBhZGRpbmctYm94fGNvbnRlbnQtYm94YCxcbiAgICBib3JkZXJfc3R5bGU6IGBub25lfGhpZGRlbnxkb3R0ZWR8ZGFzaGVkfHNvbGlkfGRvdWJsZXxncm9vdmV8cmlkZ2V8aW5zZXR8b3V0c2V0YCxcbiAgICBib3g6IGBib3JkZXItYm94fHBhZGRpbmctYm94fGNvbnRlbnQtYm94YCxcbiAgICBkaXNwbGF5X2luc2lkZTogYGF1dG98YmxvY2t8dGFibGV8ZmxleHxncmlkYCxcbiAgICBkaXNwbGF5X291dHNpZGU6IGBibG9jay1sZXZlbHxpbmxpbmUtbGV2ZWx8bm9uZXx0YWJsZS1yb3ctZ3JvdXB8dGFibGUtaGVhZGVyLWdyb3VwfHRhYmxlLWZvb3Rlci1ncm91cHx0YWJsZS1yb3d8dGFibGUtY2VsbHx0YWJsZS1jb2x1bW4tZ3JvdXB8dGFibGUtY29sdW1ufHRhYmxlLWNhcHRpb25gLFxuICAgIGVuZGluZ19zaGFwZTogYGNpcmNsZXxlbGxpcHNlYCxcbiAgICBnZW5lcmljX2ZhbWlseTogYHNlcmlmfHNhbnMtc2VyaWZ8Y3Vyc2l2ZXxmYW50YXN5fG1vbm9zcGFjZWAsXG4gICAgZ2VuZXJpY192b2ljZTogYG1hbGV8ZmVtYWxlfGNoaWxkYCxcbiAgICByZWxhdGl2ZV9zaXplOiBgc21hbGxlcnxsYXJnZXJgLFxuICAgIHJlcGVhdF9zdHlsZTogYHJlcGVhdC14fHJlcGVhdC15fCgoPzpyZXBlYXR8c3BhY2V8cm91bmR8bm8tcmVwZWF0KSg/OlxcXFxzKig/OnJlcGVhdHxzcGFjZXxyb3VuZHxuby1yZXBlYXQpKT8pYCxcbiAgICBzaWRlX29yX2Nvcm5lcjogYChsZWZ0fHJpZ2h0KT9cXFxccyoodG9wfGJvdHRvbSk/YCxcbiAgICBzaW5nbGVfYW5pbWF0aW9uX2RpcmVjdGlvbjogYG5vcm1hbHxyZXZlcnNlfGFsdGVybmF0ZXxhbHRlcm5hdGUtcmV2ZXJzZWAsXG4gICAgc2luZ2xlX2FuaW1hdGlvbl9maWxsX21vZGU6IGBub25lfGZvcndhcmRzfGJhY2t3YXJkc3xib3RoYCxcbiAgICBzaW5nbGVfYW5pbWF0aW9uX3BsYXlfc3RhdGU6IGBydW5uaW5nfHBhdXNlZGBcbn07XG4vKlxuICogQ29sb3IgZGVmaW5pdGlvbiBzdWIgZXhwcmVzc2lvbnNcbiAqL1xuQ3NzUHJvcC5fQ09MT1IgPSB7XG4gICAgaGV4OiBgXFxcXCMoMHgpP1swLTlhLWZdK2AsXG4gICAgbmFtZTogYGFsaWNlYmx1ZXxhbnRpcXVld2hpdGV8YXF1YXxhcXVhbWFyaW5lfGF6dXJlfGJlaWdlfGJpc3F1ZXxibGFja3xibGFuY2hlZGFsbW9uZHxibHVlfGJsdWV2aW9sZXR8YnJvd258YnVybHl3b29kfGNhZGV0Ymx1ZXxjaGFydHJldXNlfGNob2NvbGF0ZXxjb3JhbHxjb3JuZmxvd2VyYmx1ZXxjb3Juc2lsa3xjcmltc29ufGN5YW58ZGFya2JsdWV8ZGFya2N5YW58ZGFya2dvbGRlbnJvZHxkYXJrZ3JheXxkYXJrZ3JlZW58ZGFya2toYWtpfGRhcmttYWdlbnRhfGRhcmtvbGl2ZWdyZWVufGRhcmtvcmFuZ2V8ZGFya29yY2hpZHxkYXJrcmVkfGRhcmtzYWxtb258ZGFya3NlYWdyZWVufGRhcmtzbGF0ZWJsdWV8ZGFya3NsYXRlZ3JheXxkYXJrdHVycXVvaXNlfGRhcmt2aW9sZXR8ZGVlcHBpbmt8ZGVlcHNreWJsdWV8ZGltZ3JheXxkb2RnZXJibHVlfGZpcmVicmlja3xmbG9yYWx3aGl0ZXxmb3Jlc3RncmVlbnxmdWNoc2lhfGdhaW5zYm9yb3xnaG9zdHdoaXRlfGdvbGR8Z29sZGVucm9kfGdyYXl8Z3JlZW58Z3JlZW55ZWxsb3d8aG9uZXlkZXd8aG90cGlua3xpbmRpYW5yZWR8aW5kaWdvfGl2b3J5fGtoYWtpfGxhdmVuZGVyfGxhdmVuZGVyYmx1c2h8bGF3bmdyZWVufGxlbW9uY2hpZmZvbnxsaWdodGJsdWV8bGlnaHRjb3JhbHxsaWdodGN5YW58bGlnaHRnb2xkZW5yb2R5ZWxsb3d8bGlnaHRncmVlbnxsaWdodGdyZXl8bGlnaHRwaW5rfGxpZ2h0c2FsbW9ufGxpZ2h0c2VhZ3JlZW58bGlnaHRza3libHVlfGxpZ2h0c2xhdGVncmF5fGxpZ2h0c3RlZWxibHVlfGxpZ2h0eWVsbG93fGxpbWV8bGltZWdyZWVufGxpbmVufG1hZ2VudGF8bWFyb29ufG1lZGl1bWFxdWFtYXJpbmV8bWVkaXVtYmx1ZXxtZWRpdW1vcmNoaWR8bWVkaXVtcHVycGxlfG1lZGl1bXNlYWdyZWVufG1lZGl1bXNsYXRlYmx1ZXxtZWRpdW1zcHJpbmdncmVlbnxtZWRpdW10dXJxdW9pc2V8bWVkaXVtdmlvbGV0cmVkfG1pZG5pZ2h0Ymx1ZXxtaW50Y3JlYW18bWlzdHlyb3NlfG1vY2Nhc2lufG5hdmFqb3doaXRlfG5hdnl8b2xkbGFjZXxvbGl2ZXxvbGl2ZWRyYWJ8b3JhbmdlfG9yYW5nZXJlZHxvcmNoaWR8cGFsZWdvbGRlbnJvZHxwYWxlZ3JlZW58cGFsZXR1cnF1b2lzZXxwYWxldmlvbGV0cmVkfHBhcGF5YXdoaXB8cGVhY2hwdWZmfHBlcnV8cGlua3xwbHVtfHBvd2RlcmJsdWV8cHVycGxlfHJlZHxyb3N5YnJvd258cm95YWxibHVlfHNhZGRsZWJyb3dufHNhbG1vbnxzYW5keWJyb3dufHNlYWdyZWVufHNlYXNoZWxsfHNpZW5uYXxzaWx2ZXJ8c2t5Ymx1ZXxzbGF0ZWJsdWV8c2xhdGVncmF5fHNub3d8c3ByaW5nZ3JlZW58c3RlZWxibHVlfHRhbnx0ZWFsfHRoaXN0bGV8dG9tYXRvfHR1cnF1b2lzZXx0cmFuc3BhcmVudHx2aW9sZXR8d2hlYXR8d2hpdGV8d2hpdGVzbW9rZXx5ZWxsb3d8eWVsbG93Z3JlZW5gLFxuICAgIHJnYjogU3RyaW5nLnJhdyBgcmdiXFwoXFxzKihcXGR7MSwzfSlcXHMqLFxccyooXFxkezEsM30pXFxzKixcXHMqKFxcZHsxLDN9KVxccypcXClgLFxuICAgIHJnYmE6IFN0cmluZy5yYXcgYHJnYmFcXChcXHMqKFxcZHsxLDN9KVxccyosXFxzKihcXGR7MSwzfSlcXHMqLFxccyooXFxkezEsM30pXFxzKixcXHMqKCR7Q3NzUHJvcC5OLmludGVnZXJfemVyb19mZn18JHtDc3NQcm9wLk4ubnVtYmVyX3plcm9fb25lfXwke0Nzc1Byb3AuQi5wZXJjZW50YWdlX3plcm9faHVuZHJlZH0pXFxzKlxcKWBcbn07XG4vKlxuICogQ29tcG91bmQgKGkuZS4gZGVwZW5kYW50IG9uIG90aGVyIChzdWIpIHJlZ3VsYXIgZXhwcmVzc2lvbnMpIHN1YiBSZWdFeCBzZWdtZW50c1xuICovXG5Dc3NQcm9wLl9DID0ge1xuICAgIGFscGhhOiBgJHtDc3NQcm9wLk4uaW50ZWdlcl96ZXJvX2ZmfXwke0Nzc1Byb3AuTi5udW1iZXJfemVyb19vbmV9fCR7Q3NzUHJvcC5CLnBlcmNlbnRhZ2VfemVyb19odW5kcmVkfWAsXG4gICAgYWxwaGF2YWx1ZTogQ3NzUHJvcC5OLm51bWJlcl96ZXJvX29uZSxcbiAgICBiZ19wb3NpdGlvbjogYCgoJHtDc3NQcm9wLkIubGVuX29yX3BlcmN9fGxlZnR8Y2VudGVyfHJpZ2h0fHRvcHxib3R0b20pXFxcXHMqKXsxLDR9YCxcbiAgICBiZ19zaXplOiBgKCR7Q3NzUHJvcC5CLmxlbmd0aF9wb3N9fCR7Q3NzUHJvcC5CLnBlcmNlbnRhZ2V9fGF1dG8pezEsMn18Y292ZXJ8Y29udGFpbmAsXG4gICAgYm9yZGVyX3dpZHRoOiBgdGhpbnxtZWRpdW18dGhpY2t8JHtDc3NQcm9wLkIubGVuZ3RofWAsXG4gICAgYm90dG9tOiBgJHtDc3NQcm9wLkIubGVuZ3RofXxhdXRvYCxcbiAgICBjb2xvcjogYCR7Q3NzUHJvcC5fQ09MT1IuaGV4fXwke0Nzc1Byb3AuX0NPTE9SLnJnYn18JHtDc3NQcm9wLl9DT0xPUi5yZ2JhfXwke0Nzc1Byb3AuX0NPTE9SLm5hbWV9YCxcbiAgICBjb2xvcl9zdG9wX2xlbmd0aDogYCgke0Nzc1Byb3AuQi5sZW5fb3JfcGVyY31cXFxccyopezEsMn1gLFxuICAgIGxpbmVhcl9jb2xvcl9oaW50OiBgJHtDc3NQcm9wLkIubGVuX29yX3BlcmN9YCxcbiAgICBmYW1pbHlfbmFtZTogYCR7Q3NzUHJvcC5CLnN0cmluZ318KCR7Q3NzUHJvcC5CLmlkZW50fVxcXFxzKikrYCxcbiAgICBpbWFnZV9kZWNsOiBDc3NQcm9wLkIudXJsLFxuICAgIGxlZnQ6IGAke0Nzc1Byb3AuQi5sZW5ndGh9fGF1dG9gLFxuICAgIGxvb3NlX3F1b3RhYmxlX3dvcmRzOiBgKCR7Q3NzUHJvcC5CLmlkZW50fSkrYCxcbiAgICBtYXJnaW5fd2lkdGg6IGAke0Nzc1Byb3AuQi5sZW5fb3JfcGVyY318YXV0b2AsXG4gICAgcGFkZGluZ193aWR0aDogYCR7Q3NzUHJvcC5CLmxlbmd0aF9wb3N9fCR7Q3NzUHJvcC5CLnBlcmNlbnRhZ2VfcG9zfWAsXG4gICAgcGFnZV91cmw6IENzc1Byb3AuQi51cmwsXG4gICAgcG9zaXRpb246IGAoKCR7Q3NzUHJvcC5CLmxlbl9vcl9wZXJjfXxsZWZ0fGNlbnRlcnxyaWdodHx0b3B8Ym90dG9tKVxcXFxzKil7MSw0fWAsXG4gICAgcmlnaHQ6IGAke0Nzc1Byb3AuQi5sZW5ndGh9fGF1dG9gLFxuICAgIHNoYWRvdzogJycsXG4gICAgc2l6ZTogYGNsb3Nlc3Qtc2lkZXxmYXJ0aGVzdC1zaWRlfGNsb3Nlc3QtY29ybmVyfGZhcnRoZXN0LWNvcm5lcnwke0Nzc1Byb3AuQi5sZW5ndGh9fCgke0Nzc1Byb3AuQi5sZW5fb3JfcGVyY30pXFxcXHMrKCR7Q3NzUHJvcC5CLmxlbl9vcl9wZXJjfSlgLFxuICAgIHRvcDogYCR7Q3NzUHJvcC5CLmxlbmd0aH18YXV0b2Bcbn07XG5Dc3NQcm9wLl9DMSA9IHtcbiAgICBpbWFnZV9saXN0OiBgaW1hZ2VcXFxcKFxcXFxzKigke0Nzc1Byb3AuQi51cmx9KSpcXFxccyooJHtDc3NQcm9wLkIudXJsfXwke0Nzc1Byb3AuX0MuY29sb3J9KVxcXFxzKlxcXFwpYCxcbiAgICBsaW5lYXJfY29sb3Jfc3RvcDogYCgke0Nzc1Byb3AuX0MuY29sb3J9KShcXFxccyoke0Nzc1Byb3AuX0MuY29sb3Jfc3RvcF9sZW5ndGh9KT9gLFxuICAgIHNoYWRvdzogYCgoJHtDc3NQcm9wLl9DLmNvbG9yfSlcXFxccysoKCR7Q3NzUHJvcC5CLmxlbmd0aH0pXFxcXHMqKXsyLDR9KFxccytpbnNldCk/KXwoKGluc2V0XFxcXHMrKT8oKCR7Q3NzUHJvcC5CLmxlbmd0aH0pXFxcXHMqKXsyLDR9XFxcXHMqKCR7Q3NzUHJvcC5fQy5jb2xvcn0pPylgXG59O1xuQ3NzUHJvcC5fQzIgPSB7XG4gICAgY29sb3Jfc3RvcF9saXN0OiBgKCgke0Nzc1Byb3AuX0MxLmxpbmVhcl9jb2xvcl9zdG9wfSkoXFxcXHMqKCR7Q3NzUHJvcC5fQy5saW5lYXJfY29sb3JfaGludH0pKT9cXFxccyosXFxcXHMqKSsoJHtDc3NQcm9wLl9DMS5saW5lYXJfY29sb3Jfc3RvcH0pYCxcbiAgICBzaGFwZTogYHJlY3RcXFxcKFxcXFxzKigke0Nzc1Byb3AuX0MudG9wfSlcXFxccyosXFxcXHMqKCR7Q3NzUHJvcC5fQy5yaWdodH0pXFxcXHMqLFxcXFxzKigke0Nzc1Byb3AuX0MuYm90dG9tfSlcXFxccyosXFxcXHMqKCR7Q3NzUHJvcC5fQy5sZWZ0fSlcXFxccypcXFxcKWBcbn07XG5Dc3NQcm9wLl9DMyA9IHtcbiAgICBsaW5lYXJfZ3JhZGllbnQ6IGBsaW5lYXItZ3JhZGllbnRcXFxcKCgoKCR7Q3NzUHJvcC5CLmFuZ2xlfSl8dG9cXFxccysoJHtDc3NQcm9wLkEuc2lkZV9vcl9jb3JuZXJ9KSlcXFxccyosXFxcXHMqKT9cXFxccyooJHtDc3NQcm9wLl9DMi5jb2xvcl9zdG9wX2xpc3R9KVxcXFxzKlxcXFwpYCxcbiAgICByYWRpYWxfZ3JhZGllbnQ6IGByYWRpYWwtZ3JhZGllbnRcXFxcKCgoKCgke0Nzc1Byb3AuQS5lbmRpbmdfc2hhcGV9KXwoJHtDc3NQcm9wLl9DLnNpemV9KSlcXFxccyopKlxcXFxzKihhdFxcXFxzKyR7Q3NzUHJvcC5fQy5wb3NpdGlvbn0pP1xcXFxzKixcXFxccyopP1xcXFxzKigke0Nzc1Byb3AuX0MyLmNvbG9yX3N0b3BfbGlzdH0pXFxcXHMqXFxcXClgXG59O1xuQ3NzUHJvcC5fQzQgPSB7XG4gICAgaW1hZ2U6IGAke0Nzc1Byb3AuQi51cmx9fCR7Q3NzUHJvcC5fQzMubGluZWFyX2dyYWRpZW50fXwke0Nzc1Byb3AuX0MzLnJhZGlhbF9ncmFkaWVudH18JHtDc3NQcm9wLl9DMS5pbWFnZV9saXN0fWAsXG4gICAgYmdfaW1hZ2U6IGAoJHtDc3NQcm9wLkIudXJsfXwke0Nzc1Byb3AuX0MzLmxpbmVhcl9ncmFkaWVudH18JHtDc3NQcm9wLl9DMy5yYWRpYWxfZ3JhZGllbnR9fCR7Q3NzUHJvcC5fQzEuaW1hZ2VfbGlzdH0pfG5vbmVgXG59O1xuQ3NzUHJvcC5DID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBDc3NQcm9wLl9DKSwgQ3NzUHJvcC5fQzEpLCBDc3NQcm9wLl9DMiksIENzc1Byb3AuX0MzKSwgQ3NzUHJvcC5fQzQpO1xuLypcbiAqIFByb3BlcnR5IHZhbHVlIHJlZ3VsYXIgZXhwcmVzc2lvbnMgbm90IGRlcGVuZGFudCBvbiBvdGhlciBzdWIgZXhwcmVzc2lvbnNcbiAqL1xuQ3NzUHJvcC5BUCA9IHtcbiAgICBib3JkZXJfY29sbGFwc2U6IGBjb2xsYXBzZXxzZXBhcmF0ZWAsXG4gICAgYm94OiBgbm9ybWFsfG5vbmV8Y29udGVudHNgLFxuICAgIGJveF9zaXppbmc6IGBjb250ZW50LWJveHxwYWRkaW5nLWJveHxib3JkZXItYm94YCxcbiAgICBjYXB0aW9uX3NpZGU6IGB0b3B8Ym90dG9tYCxcbiAgICBjbGVhcjogYG5vbmV8bGVmdHxyaWdodHxib3RoYCxcbiAgICBkaXJlY3Rpb246IGBsdHJ8cnRsYCxcbiAgICBlbXB0eV9jZWxsczogYHNob3d8aGlkZWAsXG4gICAgZmxvYXQ6IGBsZWZ0fHJpZ2h0fG5vbmVgLFxuICAgIGZvbnRfc3RyZXRjaDogYG5vcm1hbHx3aWRlcnxuYXJyb3dlcnx1bHRyYS1jb25kZW5zZWR8ZXh0cmEtY29uZGVuc2VkfGNvbmRlbnNlZHxzZW1pLWNvbmRlbnNlZHxzZW1pLWV4cGFuZGVkfGV4cGFuZGVkfGV4dHJhLWV4cGFuZGVkfHVsdHJhLWV4cGFuZGVkYCxcbiAgICBmb250X3N0eWxlOiBgbm9ybWFsfGl0YWxpY3xvYmxpcXVlYCxcbiAgICBmb250X3ZhcmlhbnQ6IGBub3JtYWx8c21hbGwtY2Fwc2AsXG4gICAgZm9udF93ZWlnaHQ6IGBub3JtYWx8Ym9sZHxib2xkZXJ8bGlnaHRlcnwxMDB8MjAwfDMwMHw0MDB8NTAwfDYwMHw3MDB8ODAwfDkwMGAsXG4gICAgbGlzdF9zdHlsZV9wb3NpdGlvbjogYGluc2lkZXxvdXRzaWRlYCxcbiAgICBsaXN0X3N0eWxlX3R5cGU6IGBkaXNjfGNpcmNsZXxzcXVhcmV8ZGVjaW1hbHxkZWNpbWFsLWxlYWRpbmctemVyb3xsb3dlci1yb21hbnx1cHBlci1yb21hbnxsb3dlci1ncmVla3xsb3dlci1sYXRpbnx1cHBlci1sYXRpbnxhcm1lbmlhbnxnZW9yZ2lhbnxsb3dlci1hbHBoYXx1cHBlci1hbHBoYXxub25lYCxcbiAgICBvdmVyZmxvdzogYHZpc2libGV8aGlkZGVufHNjcm9sbHxhdXRvYCxcbiAgICBvdmVyZmxvd193cmFwOiBgbm9ybWFsfGJyZWFrLXdvcmRgLFxuICAgIG92ZXJmbG93X3g6IGB2aXNpYmxlfGhpZGRlbnxzY3JvbGx8YXV0b3xuby1kaXNwbGF5fG5vLWNvbnRlbnRgLFxuICAgIHBhZ2VfYnJlYWtfYWZ0ZXI6IGBhdXRvfGFsd2F5c3xhdm9pZHxsZWZ0fHJpZ2h0YCxcbiAgICBwYWdlX2JyZWFrX2JlZm9yZTogYGF1dG98YWx3YXlzfGF2b2lkfGxlZnR8cmlnaHRgLFxuICAgIHBhZ2VfYnJlYWtfaW5zaWRlOiBgYXZvaWR8YXV0b2AsXG4gICAgcG9zaXRpb246IGBzdGF0aWN8cmVsYXRpdmV8YWJzb2x1dGVgLFxuICAgIHJlc2l6ZTogYG5vbmV8Ym90aHxob3Jpem9udGFsfHZlcnRpY2FsYCxcbiAgICBzcGVhazogYG5vcm1hbHxub25lfHNwZWxsLW91dGAsXG4gICAgc3BlYWtfaGVhZGVyOiBgb25jZXxhbHdheXNgLFxuICAgIHNwZWFrX251bWVyYWw6IGBkaWdpdHN8Y29udGludW91c2AsXG4gICAgc3BlYWtfcHVuY3R1YXRpb246IGBjb2RlfG5vbmVgLFxuICAgIHRhYmxlX2xheW91dDogYGF1dG98Zml4ZWRgLFxuICAgIHRleHRfYWxpZ246IGBsZWZ0fHJpZ2h0fGNlbnRlcnxqdXN0aWZ5YCxcbiAgICB0ZXh0X2RlY29yYXRpb246IGBub25lfCgodW5kZXJsaW5lfG92ZXJsaW5lfGxpbmUtdGhyb3VnaHxibGluaylcXFxccyopK2AsXG4gICAgdGV4dF90cmFuc2Zvcm06IGBjYXBpdGFsaXplfHVwcGVyY2FzZXxsb3dlcmNhc2V8bm9uZWAsXG4gICAgdGV4dF93cmFwOiBgbm9ybWFsfHVucmVzdHJpY3RlZHxub25lfHN1cHByZXNzYCxcbiAgICB1bmljb2RlX2JpZGk6IGBub3JtYWx8ZW1iZWR8YmlkaS1vdmVycmlkZWAsXG4gICAgdmlzaWJpbGl0eTogYHZpc2libGV8aGlkZGVufGNvbGxhcHNlYCxcbiAgICB3aGl0ZV9zcGFjZTogYG5vcm1hbHxwcmV8bm93cmFwfHByZS13cmFwfHByZS1saW5lYCxcbiAgICB3b3JkX2JyZWFrOiBgbm9ybWFsfGtlZXAtYWxsfGJyZWFrLWFsbGBcbn07XG4vKlxuICogQ29tcG91bmQgcHJvcGVydGl5IHZhbHVlIHJlZ3VsYXIgZXhwcmVzc2lvbnMgKGkuZS4gZGVwZW5kYW50IG9uIG90aGVyIHN1YiBleHByZXNzaW9ucylcbiAqL1xuQ3NzUHJvcC5fQ1AgPSB7XG4gICAgYmFja2dyb3VuZF9hdHRhY2htZW50OiBgJHtDc3NQcm9wLkEuYXR0YWNobWVudH0oLFxcXFxzKiR7Q3NzUHJvcC5BLmF0dGFjaG1lbnR9KSpgLFxuICAgIGJhY2tncm91bmRfY29sb3I6IENzc1Byb3AuQy5jb2xvcixcbiAgICBiYWNrZ3JvdW5kX29yaWdpbjogYCR7Q3NzUHJvcC5BLmJveH0oLFxcXFxzKiR7Q3NzUHJvcC5BLmJveH0pKmAsXG4gICAgYmFja2dyb3VuZF9yZXBlYXQ6IGAke0Nzc1Byb3AuQS5yZXBlYXRfc3R5bGV9KCxcXFxccyoke0Nzc1Byb3AuQS5yZXBlYXRfc3R5bGV9KSpgLFxuICAgIGJvcmRlcjogYCgoJHtDc3NQcm9wLkMuYm9yZGVyX3dpZHRofXwke0Nzc1Byb3AuQS5ib3JkZXJfc3R5bGV9fCR7Q3NzUHJvcC5DLmNvbG9yfSlcXFxccyopezEsM31gLFxuICAgIGJvcmRlcl9yYWRpdXM6IGAoKCR7Q3NzUHJvcC5CLmxlbl9vcl9wZXJjfSlcXFxccyopezEsNH0oXFxcXC9cXFxccyooKCR7Q3NzUHJvcC5CLmxlbl9vcl9wZXJjfSlcXFxccyopezEsNH0pP2AsXG4gICAgYm9yZGVyX3NwYWNpbmc6IGAke0Nzc1Byb3AuQi5sZW5ndGh9XFxcXHMqKCR7Q3NzUHJvcC5CLmxlbmd0aH0pP2AsXG4gICAgYm9yZGVyX3RvcF9jb2xvcjogQ3NzUHJvcC5DLmNvbG9yLFxuICAgIGJvcmRlcl90b3Bfc3R5bGU6IENzc1Byb3AuQS5ib3JkZXJfc3R5bGUsXG4gICAgYm9yZGVyX3dpZHRoOiBgKCgke0Nzc1Byb3AuQy5ib3JkZXJfd2lkdGh9KVxcXFxzKil7MSw0fWAsXG4gICAgY29sb3I6IENzc1Byb3AuQy5jb2xvcixcbiAgICBjdXJzb3I6IGAoJHtDc3NQcm9wLkIudXJsfShcXFxccyosXFxcXHMqKT8pKihhdXRvfGNyb3NzaGFpcnxkZWZhdWx0fHBvaW50ZXJ8bW92ZXxlLXJlc2l6ZXxuZS1yZXNpemV8bnctcmVzaXplfG4tcmVzaXplfHNlLXJlc2l6ZXxzdy1yZXNpemV8cy1yZXNpemV8dy1yZXNpemV8dGV4dHx3YWl0fGhlbHB8cHJvZ3Jlc3N8YWxsLXNjcm9sbHxjb2wtcmVzaXplfGhhbmR8bm8tZHJvcHxub3QtYWxsb3dlZHxyb3ctcmVzaXplfHZlcnRpY2FsLXRleHQpYCxcbiAgICBkaXNwbGF5OiBgaW5saW5lfGJsb2NrfGxpc3QtaXRlbXxydW4taW58aW5saW5lLWxpc3QtaXRlbXxpbmxpbmUtYmxvY2t8dGFibGV8aW5saW5lLXRhYmxlfHRhYmxlLWNlbGx8dGFibGUtY2FwdGlvbnxmbGV4fGlubGluZS1mbGV4fGdyaWR8aW5saW5lLWdyaWR8JHtDc3NQcm9wLkEuZGlzcGxheV9pbnNpZGV9fCR7Q3NzUHJvcC5BLmRpc3BsYXlfb3V0c2lkZX18aW5oZXJpdHxpbmxpbmUtYm94fGlubGluZS1zdGFja2AsXG4gICAgZGlzcGxheV9vdXRzaWRlOiBDc3NQcm9wLkEuZGlzcGxheV9vdXRzaWRlLFxuICAgIGVsZXZhdGlvbjogYCR7Q3NzUHJvcC5CLmFuZ2xlfXxiZWxvd3xsZXZlbHxhYm92ZXxoaWdoZXJ8bG93ZXJgLFxuICAgIGZvbnRfZmFtaWx5OiBgKCR7Q3NzUHJvcC5DLmZhbWlseV9uYW1lfXwke0Nzc1Byb3AuQS5nZW5lcmljX2ZhbWlseX0pKCxcXFxccyooJHtDc3NQcm9wLkMuZmFtaWx5X25hbWV9fCR7Q3NzUHJvcC5BLmdlbmVyaWNfZmFtaWx5fSkpKmAsXG4gICAgaGVpZ2h0OiBgJHtDc3NQcm9wLkIubGVuZ3RofXwke0Nzc1Byb3AuQi5wZXJjZW50YWdlfXxhdXRvYCxcbiAgICBsZXR0ZXJfc3BhY2luZzogYG5vcm1hbHwke0Nzc1Byb3AuQi5sZW5ndGh9YCxcbiAgICBsaXN0X3N0eWxlX2ltYWdlOiBgJHtDc3NQcm9wLkMuaW1hZ2V9fG5vbmVgLFxuICAgIG1hcmdpbl9yaWdodDogQ3NzUHJvcC5DLm1hcmdpbl93aWR0aCxcbiAgICBtYXhfaGVpZ2h0OiBgJHtDc3NQcm9wLkIubGVuZ3RoX3Bvc318JHtDc3NQcm9wLkIucGVyY2VudGFnZV9wb3N9fG5vbmV8YXV0b2AsXG4gICAgbWluX2hlaWdodDogYCR7Q3NzUHJvcC5CLmxlbmd0aF9wb3N9fCR7Q3NzUHJvcC5CLnBlcmNlbnRhZ2VfcG9zfXxhdXRvYCxcbiAgICBvcGFjaXR5OiBDc3NQcm9wLkMuYWxwaGF2YWx1ZSxcbiAgICBvdXRsaW5lX2NvbG9yOiBgJHtDc3NQcm9wLkMuY29sb3J9fGludmVydGAsXG4gICAgb3V0bGluZV93aWR0aDogQ3NzUHJvcC5DLmJvcmRlcl93aWR0aCxcbiAgICBwYWRkaW5nOiBgKCgke0Nzc1Byb3AuQy5wYWRkaW5nX3dpZHRofSlcXFxccyopezEsNH1gLFxuICAgIHBhZGRpbmdfdG9wOiBDc3NQcm9wLkMucGFkZGluZ193aWR0aCxcbiAgICBwaXRjaF9yYW5nZTogQ3NzUHJvcC5OLm51bWJlcixcbiAgICByaWdodDogYCR7Q3NzUHJvcC5CLmxlbmd0aH18JHtDc3NQcm9wLkIucGVyY2VudGFnZX18YXV0b2AsXG4gICAgc3RyZXNzOiBDc3NQcm9wLk4ubnVtYmVyLFxuICAgIHRleHRfaW5kZW50OiBgJHtDc3NQcm9wLkIubGVuZ3RofXwke0Nzc1Byb3AuQi5wZXJjZW50YWdlfWAsXG4gICAgdGV4dF9zaGFkb3c6IGBub25lfCR7Q3NzUHJvcC5DLnNoYWRvd30oLFxcXFxzKigke0Nzc1Byb3AuQy5zaGFkb3d9KSkqYCxcbiAgICB2b2x1bWU6IGAke0Nzc1Byb3AuTi5udW1iZXJfcG9zfXwke0Nzc1Byb3AuQi5wZXJjZW50YWdlX3Bvc318c2lsZW50fHgtc29mdHxzb2Z0fG1lZGl1bXxsb3VkfHgtbG91ZGAsXG4gICAgd29yZF93cmFwOiBDc3NQcm9wLkFQLm92ZXJmbG93X3dyYXAsXG4gICAgem9vbTogYG5vcm1hbHwke0Nzc1Byb3AuTi5udW1iZXJfcG9zfXwke0Nzc1Byb3AuQi5wZXJjZW50YWdlX3Bvc31gLFxuICAgIGJhY2tmYWNlX3Zpc2liaWxpdHk6IENzc1Byb3AuQVAudmlzaWJpbGl0eSxcbiAgICBiYWNrZ3JvdW5kX2NsaXA6IGAke0Nzc1Byb3AuQS5ib3h9KCxcXFxccyooJHtDc3NQcm9wLkEuYm94fSkpKmAsXG4gICAgYmFja2dyb3VuZF9wb3NpdGlvbjogYCR7Q3NzUHJvcC5DLmJnX3Bvc2l0aW9ufSgsXFxcXHMqKCR7Q3NzUHJvcC5DLmJnX3Bvc2l0aW9ufSkpKmAsXG4gICAgYm9yZGVyX2JvdHRvbV9jb2xvcjogQ3NzUHJvcC5DLmNvbG9yLFxuICAgIGJvcmRlcl9ib3R0b21fc3R5bGU6IENzc1Byb3AuQS5ib3JkZXJfc3R5bGUsXG4gICAgYm9yZGVyX2NvbG9yOiBgKCgke0Nzc1Byb3AuQy5jb2xvcn0pXFxcXHMqKXsxLDR9YCxcbiAgICBib3JkZXJfbGVmdF9jb2xvcjogQ3NzUHJvcC5DLmNvbG9yLFxuICAgIGJvcmRlcl9yaWdodF9jb2xvcjogQ3NzUHJvcC5DLmNvbG9yLFxuICAgIGJvcmRlcl9zdHlsZTogYCgoJHtDc3NQcm9wLkEuYm9yZGVyX3N0eWxlfSlcXFxccyopezEsNH1gLFxuICAgIGJvcmRlcl90b3BfbGVmdF9yYWRpdXM6IGAoJHtDc3NQcm9wLkIubGVuZ3RofXwke0Nzc1Byb3AuQi5wZXJjZW50YWdlfSkoXFxcXHMqKCR7Q3NzUHJvcC5CLmxlbmd0aH18JHtDc3NQcm9wLkIucGVyY2VudGFnZX0pKT9gLFxuICAgIGJvcmRlcl90b3Bfd2lkdGg6IENzc1Byb3AuQy5ib3JkZXJfd2lkdGgsXG4gICAgYm94X3NoYWRvdzogYG5vbmV8JHtDc3NQcm9wLkMuc2hhZG93fSgsXFxcXHMqKCR7Q3NzUHJvcC5DLnNoYWRvd30pKSpgLFxuICAgIGNsaXA6IGAke0Nzc1Byb3AuQy5zaGFwZX18YXV0b2AsXG4gICAgZGlzcGxheV9pbnNpZGU6IENzc1Byb3AuQS5kaXNwbGF5X2luc2lkZSxcbiAgICBmb250X3NpemU6IGAke0Nzc1Byb3AuQS5hYnNvbHV0ZV9zaXplfXwke0Nzc1Byb3AuQS5yZWxhdGl2ZV9zaXplfXwke0Nzc1Byb3AuQi5sZW5ndGhfcG9zfXwke0Nzc1Byb3AuQi5wZXJjZW50YWdlX3Bvc31gLFxuICAgIGxpbmVfaGVpZ2h0OiBgbm9ybWFsfCR7Q3NzUHJvcC5OLm51bWJlcl9wb3N9fCR7Q3NzUHJvcC5CLmxlbmd0aF9wb3N9fCR7Q3NzUHJvcC5CLnBlcmNlbnRhZ2VfcG9zfWAsXG4gICAgbWFyZ2luX2xlZnQ6IENzc1Byb3AuQy5tYXJnaW5fd2lkdGgsXG4gICAgbWF4X3dpZHRoOiBgJHtDc3NQcm9wLkIubGVuZ3RoX3Bvc318JHtDc3NQcm9wLkIucGVyY2VudGFnZV9wb3N9fG5vbmV8YXV0b2AsXG4gICAgb3V0bGluZV9zdHlsZTogQ3NzUHJvcC5BLmJvcmRlcl9zdHlsZSxcbiAgICBwYWRkaW5nX2JvdHRvbTogQ3NzUHJvcC5DLnBhZGRpbmdfd2lkdGgsXG4gICAgcGFkZGluZ19yaWdodDogQ3NzUHJvcC5DLnBhZGRpbmdfd2lkdGgsXG4gICAgcGVyc3BlY3RpdmU6IGBub25lfCR7Q3NzUHJvcC5CLmxlbmd0aH1gLFxuICAgIHJpY2huZXNzOiBDc3NQcm9wLk4ubnVtYmVyLFxuICAgIHRleHRfb3ZlcmZsb3c6IGAoKGNsaXB8ZWxsaXBzaXN8JHtDc3NQcm9wLkIuc3RyaW5nfSlcXFxccyopezEsMn1gLFxuICAgIHRvcDogYCR7Q3NzUHJvcC5CLmxlbmd0aH18JHtDc3NQcm9wLkIucGVyY2VudGFnZX18YXV0b2AsXG4gICAgd2lkdGg6IGAke0Nzc1Byb3AuQi5sZW5ndGhfcG9zfXwke0Nzc1Byb3AuQi5wZXJjZW50YWdlX3Bvc318YXV0b2AsXG4gICAgel9pbmRleDogYGF1dG98JHtDc3NQcm9wLkIuel9pbmRleH1gLFxuICAgIC8vIFNpbXBsaWZpZWQgYmFja2dyb3VuZFxuICAgIGJhY2tncm91bmQ6IGAoKCgke0Nzc1Byb3AuQy5iZ19wb3NpdGlvbn1cXFxccyooXFxcXC9cXFxccyoke0Nzc1Byb3AuQy5iZ19zaXplfSk/KXwoJHtDc3NQcm9wLkEucmVwZWF0X3N0eWxlfSl8KCR7Q3NzUHJvcC5BLmF0dGFjaG1lbnR9KXwoJHtDc3NQcm9wLkEuYmdfb3JpZ2lufSl8KCR7Q3NzUHJvcC5DLmJnX2ltYWdlfSl8KCR7Q3NzUHJvcC5DLmNvbG9yfSkpXFxcXHMqKStgLFxuICAgIGJhY2tncm91bmRfc2l6ZTogYCR7Q3NzUHJvcC5DLmJnX3NpemV9KCxcXFxccyoke0Nzc1Byb3AuQy5iZ19zaXplfSkqYCxcbiAgICBib3JkZXJfYm90dG9tX2xlZnRfcmFkaXVzOiBgKCR7Q3NzUHJvcC5CLmxlbmd0aH18JHtDc3NQcm9wLkIucGVyY2VudGFnZX0pKFxcXFxzKigke0Nzc1Byb3AuQi5sZW5ndGh9fCR7Q3NzUHJvcC5CLnBlcmNlbnRhZ2V9KSk/YCxcbiAgICBib3JkZXJfYm90dG9tX3dpZHRoOiBDc3NQcm9wLkMuYm9yZGVyX3dpZHRoLFxuICAgIGJvcmRlcl9sZWZ0X3N0eWxlOiBDc3NQcm9wLkEuYm9yZGVyX3N0eWxlLFxuICAgIGJvcmRlcl9yaWdodF9zdHlsZTogQ3NzUHJvcC5BLmJvcmRlcl9zdHlsZSxcbiAgICBib3JkZXJfdG9wOiBgKCgke0Nzc1Byb3AuQy5ib3JkZXJfd2lkdGh9fCR7Q3NzUHJvcC5BLmJvcmRlcl9zdHlsZX18JHtDc3NQcm9wLkMuY29sb3J9KVxcXFxzKil7MSwzfWAsXG4gICAgYm90dG9tOiBgJHtDc3NQcm9wLkIubGVuX29yX3BlcmN9fGF1dG9gLFxuICAgIGxpc3Rfc3R5bGU6IGAoKCR7Q3NzUHJvcC5BUC5saXN0X3N0eWxlX3R5cGV9fCR7Q3NzUHJvcC5BUC5saXN0X3N0eWxlX3Bvc2l0aW9ufXwke0Nzc1Byb3AuQy5pbWFnZX18bm9uZX0pXFxcXHMqKXsxLDN9YCxcbiAgICBtYXJnaW5fdG9wOiBDc3NQcm9wLkMubWFyZ2luX3dpZHRoLFxuICAgIG91dGxpbmU6IGAoKCR7Q3NzUHJvcC5DLmNvbG9yfXxpbnZlcnR8JHtDc3NQcm9wLkEuYm9yZGVyX3N0eWxlfXwke0Nzc1Byb3AuQy5ib3JkZXJfd2lkdGh9KVxcXFxzKil7MSwzfWAsXG4gICAgb3ZlcmZsb3dfeTogQ3NzUHJvcC5BUC5vdmVyZmxvd194LFxuICAgIHBpdGNoOiBgJHtDc3NQcm9wLkIuZnJlcXVlbmN5fXx4LWxvd3xsb3d8bWVkaXVtfGhpZ2h8eC1oaWdoYCxcbiAgICB2ZXJ0aWNhbF9hbGlnbjogYGJhc2VsaW5lfHN1YnxzdXBlcnx0b3B8dGV4dC10b3B8bWlkZGxlfGJvdHRvbXx0ZXh0LWJvdHRvbXwke0Nzc1Byb3AuQi5sZW5fb3JfcGVyY31gLFxuICAgIHdvcmRfc3BhY2luZzogYG5vcm1hbHwke0Nzc1Byb3AuQi5sZW5ndGh9YCxcbiAgICBiYWNrZ3JvdW5kX2ltYWdlOiBgJHtDc3NQcm9wLkMuYmdfaW1hZ2V9KCxcXFxccyoke0Nzc1Byb3AuQy5iZ19pbWFnZX0pKmAsXG4gICAgYm9yZGVyX2JvdHRvbV9yaWdodF9yYWRpdXM6IGAoJHtDc3NQcm9wLkIubGVuZ3RofXwke0Nzc1Byb3AuQi5wZXJjZW50YWdlfSkoXFxcXHMqKCR7Q3NzUHJvcC5CLmxlbmd0aH18JHtDc3NQcm9wLkIucGVyY2VudGFnZX0pKT9gLFxuICAgIGJvcmRlcl9sZWZ0X3dpZHRoOiBDc3NQcm9wLkMuYm9yZGVyX3dpZHRoLFxuICAgIGJvcmRlcl9yaWdodF93aWR0aDogQ3NzUHJvcC5DLmJvcmRlcl93aWR0aCxcbiAgICBsZWZ0OiBgJHtDc3NQcm9wLkIubGVuX29yX3BlcmN9fGF1dG9gLFxuICAgIG1hcmdpbl9ib3R0b206IENzc1Byb3AuQy5tYXJnaW5fd2lkdGgsXG4gICAgcGF1c2VfYWZ0ZXI6IGAke0Nzc1Byb3AuQi50aW1lfXwke0Nzc1Byb3AuQi5wZXJjZW50YWdlfWAsXG4gICAgc3BlZWNoX3JhdGU6IGAke0Nzc1Byb3AuTi5udW1iZXJ9fHgtc2xvd3xzbG93fG1lZGl1bXxmYXN0fHgtZmFzdHxmYXN0ZXJ8c2xvd2VyYCxcbiAgICB0cmFuc2l0aW9uX2R1cmF0aW9uOiBgJHtDc3NQcm9wLkIudGltZX0oLFxcXFxzKiR7Q3NzUHJvcC5CLnRpbWV9KSpgLFxuICAgIGJvcmRlcl9ib3R0b206IGAoKCR7Q3NzUHJvcC5DLmJvcmRlcl93aWR0aH18JHtDc3NQcm9wLkEuYm9yZGVyX3N0eWxlfXwke0Nzc1Byb3AuQy5jb2xvcn0pXFxcXHMqKXsxLDN9YCxcbiAgICBib3JkZXJfcmlnaHQ6IGAoKCR7Q3NzUHJvcC5DLmJvcmRlcl93aWR0aH18JHtDc3NQcm9wLkEuYm9yZGVyX3N0eWxlfXwke0Nzc1Byb3AuQy5jb2xvcn0pXFxcXHMqKXsxLDN9YCxcbiAgICBtYXJnaW46IGAoKCR7Q3NzUHJvcC5DLm1hcmdpbl93aWR0aH0pXFxcXHMqKXsxLDR9YCxcbiAgICBwYWRkaW5nX2xlZnQ6IENzc1Byb3AuQy5wYWRkaW5nX3dpZHRoLFxuICAgIGJvcmRlcl9sZWZ0OiBgKCgke0Nzc1Byb3AuQy5ib3JkZXJfd2lkdGh9fCR7Q3NzUHJvcC5BLmJvcmRlcl9zdHlsZX18JHtDc3NQcm9wLkMuY29sb3J9KVxcXFxzKil7MSwzfWAsXG4gICAgcXVvdGVzOiBgKCR7Q3NzUHJvcC5CLnN0cmluZ31cXFxccyoke0Nzc1Byb3AuQi5zdHJpbmd9KSt8bm9uZWAsXG4gICAgYm9yZGVyX3RvcF9yaWdodF9yYWRpdXM6IGAoJHtDc3NQcm9wLkIubGVuZ3RofXwke0Nzc1Byb3AuQi5wZXJjZW50YWdlfSkoXFxcXHMqKCR7Q3NzUHJvcC5CLmxlbmd0aH18JHtDc3NQcm9wLkIucGVyY2VudGFnZX0pKT9gLFxuICAgIG1pbl93aWR0aDogYCR7Q3NzUHJvcC5CLmxlbmd0aF9wb3N9fCR7Q3NzUHJvcC5CLnBlcmNlbnRhZ2VfcG9zfXxhdXRvYFxufTtcbkNzc1Byb3AuX0NQMSA9IHtcbiAgICBmb250OiBgKCgoKCgke0Nzc1Byb3AuQVAuZm9udF9zdHlsZX18JHtDc3NQcm9wLkFQLmZvbnRfdmFyaWFudH18JHtDc3NQcm9wLkFQLmZvbnRfd2VpZ2h0fSlcXFxccyopezEsM30pP1xcXFxzKigke0Nzc1Byb3AuX0NQLmZvbnRfc2l6ZX0pXFxcXHMqKFxcXFwvXFxcXHMqKCR7Q3NzUHJvcC5fQ1AubGluZV9oZWlnaHR9KSk/XFxcXHMrKCR7Q3NzUHJvcC5fQ1AuZm9udF9mYW1pbHl9KSl8Y2FwdGlvbnxpY29ufG1lbnV8bWVzc2FnZS1ib3h8c21hbGwtY2FwdGlvbnxzdGF0dXMtYmFyKWBcbn07XG5Dc3NQcm9wLkNQID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBDc3NQcm9wLl9DUCksIENzc1Byb3AuX0NQMSk7XG4vLyBDU1MgUHJvcGVydHkgdmFsdWUgdmFsaWRhdGlvbiByZWd1bGFyIGV4cHJlc3Npb25zIGZvciB1c2Ugd2l0aCBzYW5pdGl6ZS1odG1sXG5Dc3NQcm9wLkJPUkRFUl9DT0xMQVBTRSA9IENzc1Byb3AucmVnKENzc1Byb3AuQVAuYm9yZGVyX2NvbGxhcHNlKTtcbkNzc1Byb3AuQk9YID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5BUC5ib3gpO1xuQ3NzUHJvcC5CT1hfU0laSU5HID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5BUC5ib3hfc2l6aW5nKTtcbkNzc1Byb3AuQ0FQVElPTl9TSURFID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5BUC5jYXB0aW9uX3NpZGUpO1xuQ3NzUHJvcC5DTEVBUiA9IENzc1Byb3AucmVnKENzc1Byb3AuQVAuY2xlYXIpO1xuQ3NzUHJvcC5ESVJFQ1RJT04gPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkFQLmRpcmVjdGlvbik7XG5Dc3NQcm9wLkVNUFRZX0NFTExTID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5BUC5lbXB0eV9jZWxscyk7XG5Dc3NQcm9wLkZMT0FUID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5BUC5mbG9hdCk7XG5Dc3NQcm9wLkZPTlRfU1RSRVRDSCA9IENzc1Byb3AucmVnKENzc1Byb3AuQVAuZm9udF9zdHJldGNoKTtcbkNzc1Byb3AuRk9OVF9TVFlMRSA9IENzc1Byb3AucmVnKENzc1Byb3AuQVAuZm9udF9zdHlsZSk7XG5Dc3NQcm9wLkZPTlRfVkFSSUFOVCA9IENzc1Byb3AucmVnKENzc1Byb3AuQVAuZm9udF92YXJpYW50KTtcbkNzc1Byb3AuRk9OVF9XRUlHSFQgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkFQLmZvbnRfd2VpZ2h0KTtcbkNzc1Byb3AuTElTVF9TVFlMRV9QT1NJVElPTiA9IENzc1Byb3AucmVnKENzc1Byb3AuQVAubGlzdF9zdHlsZV9wb3NpdGlvbik7XG5Dc3NQcm9wLkxJU1RfU1RZTEVfVFlQRSA9IENzc1Byb3AucmVnKENzc1Byb3AuQVAubGlzdF9zdHlsZV90eXBlKTtcbkNzc1Byb3AuT1ZFUkZMT1cgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkFQLm92ZXJmbG93KTtcbkNzc1Byb3AuT1ZFUkZMT1dfV1JBUCA9IENzc1Byb3AucmVnKENzc1Byb3AuQVAub3ZlcmZsb3dfd3JhcCk7XG5Dc3NQcm9wLk9WRVJGTE9XX1ggPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkFQLm92ZXJmbG93X3gpO1xuQ3NzUHJvcC5QQUdFX0JSRUFLX0FGVEVSID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5BUC5wYWdlX2JyZWFrX2FmdGVyKTtcbkNzc1Byb3AuUEFHRV9CUkVBS19CRUZPUkUgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkFQLnBhZ2VfYnJlYWtfYmVmb3JlKTtcbkNzc1Byb3AuUEFHRV9CUkVBS19JTlNJREUgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkFQLnBhZ2VfYnJlYWtfaW5zaWRlKTtcbkNzc1Byb3AuUE9TSVRJT04gPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkFQLnBvc2l0aW9uKTtcbkNzc1Byb3AuUkVTSVpFID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5BUC5yZXNpemUpO1xuQ3NzUHJvcC5TUEVBSyA9IENzc1Byb3AucmVnKENzc1Byb3AuQVAuc3BlYWspO1xuQ3NzUHJvcC5TUEVBS19IRUFERVIgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkFQLnNwZWFrX2hlYWRlcik7XG5Dc3NQcm9wLlNQRUFLX05VTUVSQUwgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkFQLnNwZWFrX251bWVyYWwpO1xuQ3NzUHJvcC5TUEVBS19QVU5DVFVBVElPTiA9IENzc1Byb3AucmVnKENzc1Byb3AuQVAuc3BlYWtfcHVuY3R1YXRpb24pO1xuQ3NzUHJvcC5UQUJMRV9MQVlPVVQgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkFQLnRhYmxlX2xheW91dCk7XG5Dc3NQcm9wLlRFWFRfQUxJR04gPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkFQLnRleHRfYWxpZ24pO1xuQ3NzUHJvcC5URVhUX0RFQ09SQVRJT04gPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkFQLnRleHRfZGVjb3JhdGlvbik7XG5Dc3NQcm9wLlRFWFRfVFJBTlNGT1JNID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5BUC50ZXh0X3RyYW5zZm9ybSk7XG5Dc3NQcm9wLlRFWFRfV1JBUCA9IENzc1Byb3AucmVnKENzc1Byb3AuQVAudGV4dF93cmFwKTtcbkNzc1Byb3AuVU5JQ09ERV9CSURJID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5BUC51bmljb2RlX2JpZGkpO1xuQ3NzUHJvcC5WSVNJQklMSVRZID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5BUC52aXNpYmlsaXR5KTtcbkNzc1Byb3AuV0hJVEVfU1BBQ0UgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkFQLndoaXRlX3NwYWNlKTtcbkNzc1Byb3AuV09SRF9CUkVBSyA9IENzc1Byb3AucmVnKENzc1Byb3AuQVAud29yZF9icmVhayk7XG5Dc3NQcm9wLkJBQ0tHUk9VTkRfQVRUQUNITUVOVCA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYmFja2dyb3VuZF9hdHRhY2htZW50KTtcbkNzc1Byb3AuQkFDS0dST1VORF9DT0xPUiA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYmFja2dyb3VuZF9jb2xvcik7XG5Dc3NQcm9wLkJBQ0tHUk9VTkRfT1JJR0lOID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5iYWNrZ3JvdW5kX29yaWdpbik7XG5Dc3NQcm9wLkJBQ0tHUk9VTkRfUkVQRUFUID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5iYWNrZ3JvdW5kX3JlcGVhdCk7XG5Dc3NQcm9wLkJPUkRFUiA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYm9yZGVyKTtcbkNzc1Byb3AuQk9SREVSX1JBRElVUyA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYm9yZGVyX3JhZGl1cyk7XG5Dc3NQcm9wLkJPUkRFUl9TUEFDSU5HID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5ib3JkZXJfc3BhY2luZyk7XG5Dc3NQcm9wLkJPUkRFUl9UT1BfQ09MT1IgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLmJvcmRlcl90b3BfY29sb3IpO1xuQ3NzUHJvcC5CT1JERVJfVE9QX1NUWUxFID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5ib3JkZXJfdG9wX3N0eWxlKTtcbkNzc1Byb3AuQk9SREVSX1dJRFRIID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5ib3JkZXJfd2lkdGgpO1xuQ3NzUHJvcC5DT0xPUiA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuY29sb3IpO1xuQ3NzUHJvcC5DVVJTT1IgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLmN1cnNvcik7XG5Dc3NQcm9wLkRJU1BMQVkgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLmRpc3BsYXkpO1xuQ3NzUHJvcC5ESVNQTEFZX09VVFNJREUgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLmRpc3BsYXlfb3V0c2lkZSk7XG5Dc3NQcm9wLkVMRVZBVElPTiA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuZWxldmF0aW9uKTtcbkNzc1Byb3AuRk9OVF9GQU1JTFkgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLmZvbnRfZmFtaWx5KTtcbkNzc1Byb3AuSEVJR0hUID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5oZWlnaHQpO1xuQ3NzUHJvcC5MRVRURVJfU1BBQ0lORyA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AubGV0dGVyX3NwYWNpbmcpO1xuQ3NzUHJvcC5MSVNUX1NUWUxFX0lNQUdFID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5saXN0X3N0eWxlX2ltYWdlKTtcbkNzc1Byb3AuTUFSR0lOX1JJR0hUID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5tYXJnaW5fcmlnaHQpO1xuQ3NzUHJvcC5NQVhfSEVJR0hUID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5tYXhfaGVpZ2h0KTtcbkNzc1Byb3AuTUlOX0hFSUdIVCA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AubWluX2hlaWdodCk7XG5Dc3NQcm9wLk9QQUNJVFkgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLm9wYWNpdHkpO1xuQ3NzUHJvcC5PVVRMSU5FX0NPTE9SID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5vdXRsaW5lX2NvbG9yKTtcbkNzc1Byb3AuT1VUTElORV9XSURUSCA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1Aub3V0bGluZV93aWR0aCk7XG5Dc3NQcm9wLlBBRERJTkcgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLnBhZGRpbmcpO1xuQ3NzUHJvcC5QQURESU5HX1RPUCA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AucGFkZGluZ190b3ApO1xuQ3NzUHJvcC5QSVRDSF9SQU5HRSA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AucGl0Y2hfcmFuZ2UpO1xuQ3NzUHJvcC5SSUdIVCA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AucmlnaHQpO1xuQ3NzUHJvcC5TVFJFU1MgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLnN0cmVzcyk7XG5Dc3NQcm9wLlRFWFRfSU5ERU5UID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC50ZXh0X2luZGVudCk7XG5Dc3NQcm9wLlRFWFRfU0hBRE9XID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC50ZXh0X3NoYWRvdyk7XG5Dc3NQcm9wLlZPTFVNRSA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1Audm9sdW1lKTtcbkNzc1Byb3AuV09SRF9XUkFQID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC53b3JkX3dyYXApO1xuQ3NzUHJvcC5aT09NID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC56b29tKTtcbkNzc1Byb3AuQkFDS0ZBQ0VfVklTSUJJTElUWSA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYmFja2ZhY2VfdmlzaWJpbGl0eSk7XG5Dc3NQcm9wLkJBQ0tHUk9VTkRfQ0xJUCA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYmFja2dyb3VuZF9jbGlwKTtcbkNzc1Byb3AuQkFDS0dST1VORF9QT1NJVElPTiA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYmFja2dyb3VuZF9wb3NpdGlvbik7XG5Dc3NQcm9wLkJPUkRFUl9CT1RUT01fQ09MT1IgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLmJvcmRlcl9ib3R0b21fY29sb3IpO1xuQ3NzUHJvcC5CT1JERVJfQk9UVE9NX1NUWUxFID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5ib3JkZXJfYm90dG9tX3N0eWxlKTtcbkNzc1Byb3AuQk9SREVSX0NPTE9SID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5ib3JkZXJfY29sb3IpO1xuQ3NzUHJvcC5CT1JERVJfTEVGVF9DT0xPUiA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYm9yZGVyX2xlZnRfY29sb3IpO1xuQ3NzUHJvcC5CT1JERVJfUklHSFRfQ09MT1IgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLmJvcmRlcl9yaWdodF9jb2xvcik7XG5Dc3NQcm9wLkJPUkRFUl9TVFlMRSA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYm9yZGVyX3N0eWxlKTtcbkNzc1Byb3AuQk9SREVSX1RPUF9MRUZUX1JBRElVUyA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYm9yZGVyX3RvcF9sZWZ0X3JhZGl1cyk7XG5Dc3NQcm9wLkJPUkRFUl9UT1BfV0lEVEggPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLmJvcmRlcl90b3Bfd2lkdGgpO1xuQ3NzUHJvcC5CT1hfU0hBRE9XID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5ib3hfc2hhZG93KTtcbkNzc1Byb3AuQ0xJUCA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuY2xpcCk7XG5Dc3NQcm9wLkRJU1BMQVlfSU5TSURFID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5kaXNwbGF5X2luc2lkZSk7XG5Dc3NQcm9wLkZPTlRfU0laRSA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuZm9udF9zaXplKTtcbkNzc1Byb3AuTElORV9IRUlHSFQgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLmxpbmVfaGVpZ2h0KTtcbkNzc1Byb3AuTUFSR0lOX0xFRlQgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLm1hcmdpbl9sZWZ0KTtcbkNzc1Byb3AuTUFYX1dJRFRIID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5tYXhfd2lkdGgpO1xuQ3NzUHJvcC5PVVRMSU5FX1NUWUxFID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5vdXRsaW5lX3N0eWxlKTtcbkNzc1Byb3AuUEFERElOR19CT1RUT00gPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLnBhZGRpbmdfYm90dG9tKTtcbkNzc1Byb3AuUEFERElOR19SSUdIVCA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AucGFkZGluZ19yaWdodCk7XG5Dc3NQcm9wLlBFUlNQRUNUSVZFID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5wZXJzcGVjdGl2ZSk7XG5Dc3NQcm9wLlJJQ0hORVNTID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5yaWNobmVzcyk7XG5Dc3NQcm9wLlRFWFRfT1ZFUkZMT1cgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLnRleHRfb3ZlcmZsb3cpO1xuQ3NzUHJvcC5UT1AgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLnRvcCk7XG5Dc3NQcm9wLldJRFRIID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC53aWR0aCk7XG5Dc3NQcm9wLlpfSU5ERVggPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLnpfaW5kZXgpO1xuQ3NzUHJvcC5CQUNLR1JPVU5EID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5iYWNrZ3JvdW5kKTtcbkNzc1Byb3AuQkFDS0dST1VORF9TSVpFID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5iYWNrZ3JvdW5kX3NpemUpO1xuQ3NzUHJvcC5CT1JERVJfQk9UVE9NX0xFRlRfUkFESVVTID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5ib3JkZXJfYm90dG9tX2xlZnRfcmFkaXVzKTtcbkNzc1Byb3AuQk9SREVSX0JPVFRPTV9XSURUSCA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYm9yZGVyX2JvdHRvbV93aWR0aCk7XG5Dc3NQcm9wLkJPUkRFUl9MRUZUX1NUWUxFID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5ib3JkZXJfbGVmdF9zdHlsZSk7XG5Dc3NQcm9wLkJPUkRFUl9SSUdIVF9TVFlMRSA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYm9yZGVyX3JpZ2h0X3N0eWxlKTtcbkNzc1Byb3AuQk9SREVSX1RPUCA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYm9yZGVyX3RvcCk7XG5Dc3NQcm9wLkJPVFRPTSA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYm90dG9tKTtcbkNzc1Byb3AuTElTVF9TVFlMRSA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AubGlzdF9zdHlsZSk7XG5Dc3NQcm9wLk1BUkdJTl9UT1AgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLm1hcmdpbl90b3ApO1xuQ3NzUHJvcC5PVVRMSU5FID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5vdXRsaW5lKTtcbkNzc1Byb3AuT1ZFUkZMT1dfWSA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1Aub3ZlcmZsb3dfeSk7XG5Dc3NQcm9wLlBJVENIID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5waXRjaCk7XG5Dc3NQcm9wLlZFUlRJQ0FMX0FMSUdOID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC52ZXJ0aWNhbF9hbGlnbik7XG5Dc3NQcm9wLldPUkRfU1BBQ0lORyA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1Aud29yZF9zcGFjaW5nKTtcbkNzc1Byb3AuQkFDS0dST1VORF9JTUFHRSA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYmFja2dyb3VuZF9pbWFnZSk7XG5Dc3NQcm9wLkJPUkRFUl9CT1RUT01fUklHSFRfUkFESVVTID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5ib3JkZXJfYm90dG9tX3JpZ2h0X3JhZGl1cyk7XG5Dc3NQcm9wLkJPUkRFUl9MRUZUX1dJRFRIID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5ib3JkZXJfbGVmdF93aWR0aCk7XG5Dc3NQcm9wLkJPUkRFUl9SSUdIVF9XSURUSCA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYm9yZGVyX3JpZ2h0X3dpZHRoKTtcbkNzc1Byb3AuTEVGVCA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AubGVmdCk7XG5Dc3NQcm9wLk1BUkdJTl9CT1RUT00gPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLm1hcmdpbl9ib3R0b20pO1xuQ3NzUHJvcC5QQVVTRV9BRlRFUiA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AucGF1c2VfYWZ0ZXIpO1xuQ3NzUHJvcC5TUEVFQ0hfUkFURSA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1Auc3BlZWNoX3JhdGUpO1xuQ3NzUHJvcC5UUkFOU0lUSU9OX0RVUkFUSU9OID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC50cmFuc2l0aW9uX2R1cmF0aW9uKTtcbkNzc1Byb3AuQk9SREVSX0JPVFRPTSA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYm9yZGVyX2JvdHRvbSk7XG5Dc3NQcm9wLkJPUkRFUl9SSUdIVCA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AuYm9yZGVyX3JpZ2h0KTtcbkNzc1Byb3AuTUFSR0lOID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5tYXJnaW4pO1xuQ3NzUHJvcC5QQURESU5HX0xFRlQgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLnBhZGRpbmdfbGVmdCk7XG5Dc3NQcm9wLkJPUkRFUl9MRUZUID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5ib3JkZXJfbGVmdCk7XG5Dc3NQcm9wLkZPTlQgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLmZvbnQpO1xuQ3NzUHJvcC5RVU9URVMgPSBDc3NQcm9wLnJlZyhDc3NQcm9wLkNQLnF1b3Rlcyk7XG5Dc3NQcm9wLkJPUkRFUl9UT1BfUklHSFRfUkFESVVTID0gQ3NzUHJvcC5yZWcoQ3NzUHJvcC5DUC5ib3JkZXJfdG9wX3JpZ2h0X3JhZGl1cyk7XG5Dc3NQcm9wLk1JTl9XSURUSCA9IENzc1Byb3AucmVnKENzc1Byb3AuQ1AubWluX3dpZHRoKTtcbi8qKlxuICogQSBjbGFzcyB0byBzYW5pdGl6ZSBIVE1MIHN0cmluZ3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBTYW5pdGl6ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0ge1xuICAgICAgICAgICAgLy8gSFRNTCB0YWdzIHRoYXQgYXJlIGFsbG93ZWQgdG8gYmUgdXNlZC4gVGFncyB3ZXJlIGV4dHJhY3RlZCBmcm9tIEdvb2dsZSBDYWphXG4gICAgICAgICAgICBhbGxvd2VkVGFnczogW1xuICAgICAgICAgICAgICAgICdhJyxcbiAgICAgICAgICAgICAgICAnYWJicicsXG4gICAgICAgICAgICAgICAgJ2Fjcm9ueW0nLFxuICAgICAgICAgICAgICAgICdhZGRyZXNzJyxcbiAgICAgICAgICAgICAgICAnYXJlYScsXG4gICAgICAgICAgICAgICAgJ2FydGljbGUnLFxuICAgICAgICAgICAgICAgICdhc2lkZScsXG4gICAgICAgICAgICAgICAgJ2F1ZGlvJyxcbiAgICAgICAgICAgICAgICAnYicsXG4gICAgICAgICAgICAgICAgJ2JkaScsXG4gICAgICAgICAgICAgICAgJ2JkbycsXG4gICAgICAgICAgICAgICAgJ2JpZycsXG4gICAgICAgICAgICAgICAgJ2Jsb2NrcXVvdGUnLFxuICAgICAgICAgICAgICAgICdicicsXG4gICAgICAgICAgICAgICAgJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgJ2NhbnZhcycsXG4gICAgICAgICAgICAgICAgJ2NhcHRpb24nLFxuICAgICAgICAgICAgICAgICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICdjaXRlJyxcbiAgICAgICAgICAgICAgICAnY29kZScsXG4gICAgICAgICAgICAgICAgJ2NvbCcsXG4gICAgICAgICAgICAgICAgJ2NvbGdyb3VwJyxcbiAgICAgICAgICAgICAgICAnY29sc3BhbicsXG4gICAgICAgICAgICAgICAgJ2NvbW1hbmQnLFxuICAgICAgICAgICAgICAgICdkYXRhJyxcbiAgICAgICAgICAgICAgICAnZGF0YWxpc3QnLFxuICAgICAgICAgICAgICAgICdkZCcsXG4gICAgICAgICAgICAgICAgJ2RlbCcsXG4gICAgICAgICAgICAgICAgJ2RldGFpbHMnLFxuICAgICAgICAgICAgICAgICdkZm4nLFxuICAgICAgICAgICAgICAgICdkaXInLFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICdkbCcsXG4gICAgICAgICAgICAgICAgJ2R0JyxcbiAgICAgICAgICAgICAgICAnZW0nLFxuICAgICAgICAgICAgICAgICdmaWVsZHNldCcsXG4gICAgICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nLFxuICAgICAgICAgICAgICAgICdmaWd1cmUnLFxuICAgICAgICAgICAgICAgICdmb250JyxcbiAgICAgICAgICAgICAgICAnZm9vdGVyJyxcbiAgICAgICAgICAgICAgICAnZm9ybScsXG4gICAgICAgICAgICAgICAgJ2gxJyxcbiAgICAgICAgICAgICAgICAnaDInLFxuICAgICAgICAgICAgICAgICdoMycsXG4gICAgICAgICAgICAgICAgJ2g0JyxcbiAgICAgICAgICAgICAgICAnaDUnLFxuICAgICAgICAgICAgICAgICdoNicsXG4gICAgICAgICAgICAgICAgJ2hlYWRlcicsXG4gICAgICAgICAgICAgICAgJ2hncm91cCcsXG4gICAgICAgICAgICAgICAgJ2hyJyxcbiAgICAgICAgICAgICAgICAnaScsXG4gICAgICAgICAgICAgICAgLy8gJ2lmcmFtZScgaXMgYWxsb3dlZCBieSBHb29nbGUgQ2FqYSwgYnV0IGRpc2FsbG93ZWQgYnkgZGVmYXVsdCBieSBzYW5pdGl6ZS1odG1sXG4gICAgICAgICAgICAgICAgLy8gLCAnaWZyYW1lJ1xuICAgICAgICAgICAgICAgICdpbWcnLFxuICAgICAgICAgICAgICAgICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgJ2lucycsXG4gICAgICAgICAgICAgICAgJ2tiZCcsXG4gICAgICAgICAgICAgICAgJ2xhYmVsJyxcbiAgICAgICAgICAgICAgICAnbGVnZW5kJyxcbiAgICAgICAgICAgICAgICAnbGknLFxuICAgICAgICAgICAgICAgICdtYXAnLFxuICAgICAgICAgICAgICAgICdtYXJrJyxcbiAgICAgICAgICAgICAgICAnbWVudScsXG4gICAgICAgICAgICAgICAgJ21ldGVyJyxcbiAgICAgICAgICAgICAgICAnbmF2JyxcbiAgICAgICAgICAgICAgICAnbm9icicsXG4gICAgICAgICAgICAgICAgJ29sJyxcbiAgICAgICAgICAgICAgICAnb3B0Z3JvdXAnLFxuICAgICAgICAgICAgICAgICdvcHRpb24nLFxuICAgICAgICAgICAgICAgICdvdXRwdXQnLFxuICAgICAgICAgICAgICAgICdwJyxcbiAgICAgICAgICAgICAgICAncHJlJyxcbiAgICAgICAgICAgICAgICAncHJvZ3Jlc3MnLFxuICAgICAgICAgICAgICAgICdxJyxcbiAgICAgICAgICAgICAgICAncm93c3BhbicsXG4gICAgICAgICAgICAgICAgJ3MnLFxuICAgICAgICAgICAgICAgICdzYW1wJyxcbiAgICAgICAgICAgICAgICAnc2VjdGlvbicsXG4gICAgICAgICAgICAgICAgJ3NlbGVjdCcsXG4gICAgICAgICAgICAgICAgJ3NtYWxsJyxcbiAgICAgICAgICAgICAgICAnc291cmNlJyxcbiAgICAgICAgICAgICAgICAnc3BhbicsXG4gICAgICAgICAgICAgICAgJ3N0cmlrZScsXG4gICAgICAgICAgICAgICAgJ3N0cm9uZycsXG4gICAgICAgICAgICAgICAgJ3N1YicsXG4gICAgICAgICAgICAgICAgJ3N1bW1hcnknLFxuICAgICAgICAgICAgICAgICdzdXAnLFxuICAgICAgICAgICAgICAgICd0YWJsZScsXG4gICAgICAgICAgICAgICAgJ3Rib2R5JyxcbiAgICAgICAgICAgICAgICAndGQnLFxuICAgICAgICAgICAgICAgICd0ZXh0YXJlYScsXG4gICAgICAgICAgICAgICAgJ3Rmb290JyxcbiAgICAgICAgICAgICAgICAndGgnLFxuICAgICAgICAgICAgICAgICd0aGVhZCcsXG4gICAgICAgICAgICAgICAgJ3RpbWUnLFxuICAgICAgICAgICAgICAgICd0cicsXG4gICAgICAgICAgICAgICAgJ3RyYWNrJyxcbiAgICAgICAgICAgICAgICAndHQnLFxuICAgICAgICAgICAgICAgICd1JyxcbiAgICAgICAgICAgICAgICAndWwnLFxuICAgICAgICAgICAgICAgICd2YXInLFxuICAgICAgICAgICAgICAgICd2aWRlbycsXG4gICAgICAgICAgICAgICAgJ3dicidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAvLyBBdHRyaWJ1dGVzIHRoYXQgSFRNTCB0YWdzIGFyZSBhbGxvd2VkIHRvIGhhdmUsIGV4dHJhY3RlZCBmcm9tIEdvb2dsZSBDYWphLlxuICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qdXB5dGVybGFiL2p1cHl0ZXJsYWIvaXNzdWVzLzE4MTIjaXNzdWVjb21tZW50LTI4NTg0ODQzNVxuICAgICAgICAgICAgYWxsb3dlZEF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAnKic6IFtcbiAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgJ2RpcicsXG4gICAgICAgICAgICAgICAgICAgICdkcmFnZ2FibGUnLFxuICAgICAgICAgICAgICAgICAgICAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgJ2lkJyxcbiAgICAgICAgICAgICAgICAgICAgJ2luZXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgJ2l0ZW1wcm9wJyxcbiAgICAgICAgICAgICAgICAgICAgJ2l0ZW1yZWYnLFxuICAgICAgICAgICAgICAgICAgICAnaXRlbXNjb3BlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2xhbmcnLFxuICAgICAgICAgICAgICAgICAgICAnc3BlbGxjaGVjaycsXG4gICAgICAgICAgICAgICAgICAgICdzdHlsZScsXG4gICAgICAgICAgICAgICAgICAgICd0aXRsZScsXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2xhdGUnXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAvLyAncmVsJyBhbmQgJ3RhcmdldCcgd2VyZSAqbm90KiBhbGxvd2VkIGJ5IEdvb2dsZSBDYWphXG4gICAgICAgICAgICAgICAgYTogW1xuICAgICAgICAgICAgICAgICAgICAnYWNjZXNza2V5JyxcbiAgICAgICAgICAgICAgICAgICAgJ2Nvb3JkcycsXG4gICAgICAgICAgICAgICAgICAgICdocmVmJyxcbiAgICAgICAgICAgICAgICAgICAgJ2hyZWZsYW5nJyxcbiAgICAgICAgICAgICAgICAgICAgJ25hbWUnLFxuICAgICAgICAgICAgICAgICAgICAncmVsJyxcbiAgICAgICAgICAgICAgICAgICAgJ3NoYXBlJyxcbiAgICAgICAgICAgICAgICAgICAgJ3RhYmluZGV4JyxcbiAgICAgICAgICAgICAgICAgICAgJ3RhcmdldCcsXG4gICAgICAgICAgICAgICAgICAgICd0eXBlJ1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgYXJlYTogW1xuICAgICAgICAgICAgICAgICAgICAnYWNjZXNza2V5JyxcbiAgICAgICAgICAgICAgICAgICAgJ2FsdCcsXG4gICAgICAgICAgICAgICAgICAgICdjb29yZHMnLFxuICAgICAgICAgICAgICAgICAgICAnaHJlZicsXG4gICAgICAgICAgICAgICAgICAgICdub2hyZWYnLFxuICAgICAgICAgICAgICAgICAgICAnc2hhcGUnLFxuICAgICAgICAgICAgICAgICAgICAndGFiaW5kZXgnXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAvLyAnYXV0b3BsYXknIHdhcyAqbm90KiBhbGxvd2VkIGJ5IEdvb2dsZSBDYWphXG4gICAgICAgICAgICAgICAgYXVkaW86IFtcbiAgICAgICAgICAgICAgICAgICAgJ2F1dG9wbGF5JyxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRyb2xzJyxcbiAgICAgICAgICAgICAgICAgICAgJ2xvb3AnLFxuICAgICAgICAgICAgICAgICAgICAnbWVkaWFncm91cCcsXG4gICAgICAgICAgICAgICAgICAgICdtdXRlZCcsXG4gICAgICAgICAgICAgICAgICAgICdwcmVsb2FkJyxcbiAgICAgICAgICAgICAgICAgICAgJ3NyYydcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGJkbzogWydkaXInXSxcbiAgICAgICAgICAgICAgICBibG9ja3F1b3RlOiBbJ2NpdGUnXSxcbiAgICAgICAgICAgICAgICBicjogWydjbGVhciddLFxuICAgICAgICAgICAgICAgIGJ1dHRvbjogW1xuICAgICAgICAgICAgICAgICAgICAnYWNjZXNza2V5JyxcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGEtY29tbWFuZGxpbmtlci1hcmdzJyxcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGEtY29tbWFuZGxpbmtlci1jb21tYW5kJyxcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc2FibGVkJyxcbiAgICAgICAgICAgICAgICAgICAgJ25hbWUnLFxuICAgICAgICAgICAgICAgICAgICAndGFiaW5kZXgnLFxuICAgICAgICAgICAgICAgICAgICAndHlwZScsXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSdcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGNhbnZhczogWydoZWlnaHQnLCAnd2lkdGgnXSxcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBbJ2FsaWduJ10sXG4gICAgICAgICAgICAgICAgY29sOiBbJ2FsaWduJywgJ2NoYXInLCAnY2hhcm9mZicsICdzcGFuJywgJ3ZhbGlnbicsICd3aWR0aCddLFxuICAgICAgICAgICAgICAgIGNvbGdyb3VwOiBbJ2FsaWduJywgJ2NoYXInLCAnY2hhcm9mZicsICdzcGFuJywgJ3ZhbGlnbicsICd3aWR0aCddLFxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6IFtcbiAgICAgICAgICAgICAgICAgICAgJ2NoZWNrZWQnLFxuICAgICAgICAgICAgICAgICAgICAnY29tbWFuZCcsXG4gICAgICAgICAgICAgICAgICAgICdkaXNhYmxlZCcsXG4gICAgICAgICAgICAgICAgICAgICdpY29uJyxcbiAgICAgICAgICAgICAgICAgICAgJ2xhYmVsJyxcbiAgICAgICAgICAgICAgICAgICAgJ3JhZGlvZ3JvdXAnLFxuICAgICAgICAgICAgICAgICAgICAndHlwZSdcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGRhdGE6IFsndmFsdWUnXSxcbiAgICAgICAgICAgICAgICBkZWw6IFsnY2l0ZScsICdkYXRldGltZSddLFxuICAgICAgICAgICAgICAgIGRldGFpbHM6IFsnb3BlbiddLFxuICAgICAgICAgICAgICAgIGRpcjogWydjb21wYWN0J10sXG4gICAgICAgICAgICAgICAgZGl2OiBbJ2FsaWduJ10sXG4gICAgICAgICAgICAgICAgZGw6IFsnY29tcGFjdCddLFxuICAgICAgICAgICAgICAgIGZpZWxkc2V0OiBbJ2Rpc2FibGVkJ10sXG4gICAgICAgICAgICAgICAgZm9udDogWydjb2xvcicsICdmYWNlJywgJ3NpemUnXSxcbiAgICAgICAgICAgICAgICBmb3JtOiBbXG4gICAgICAgICAgICAgICAgICAgICdhY2NlcHQnLFxuICAgICAgICAgICAgICAgICAgICAnYXV0b2NvbXBsZXRlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VuY3R5cGUnLFxuICAgICAgICAgICAgICAgICAgICAnbWV0aG9kJyxcbiAgICAgICAgICAgICAgICAgICAgJ25hbWUnLFxuICAgICAgICAgICAgICAgICAgICAnbm92YWxpZGF0ZSdcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGgxOiBbJ2FsaWduJ10sXG4gICAgICAgICAgICAgICAgaDI6IFsnYWxpZ24nXSxcbiAgICAgICAgICAgICAgICBoMzogWydhbGlnbiddLFxuICAgICAgICAgICAgICAgIGg0OiBbJ2FsaWduJ10sXG4gICAgICAgICAgICAgICAgaDU6IFsnYWxpZ24nXSxcbiAgICAgICAgICAgICAgICBoNjogWydhbGlnbiddLFxuICAgICAgICAgICAgICAgIGhyOiBbJ2FsaWduJywgJ25vc2hhZGUnLCAnc2l6ZScsICd3aWR0aCddLFxuICAgICAgICAgICAgICAgIGlmcmFtZTogW1xuICAgICAgICAgICAgICAgICAgICAnYWxpZ24nLFxuICAgICAgICAgICAgICAgICAgICAnZnJhbWVib3JkZXInLFxuICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgJ21hcmdpbmhlaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICdtYXJnaW53aWR0aCcsXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCdcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGltZzogW1xuICAgICAgICAgICAgICAgICAgICAnYWxpZ24nLFxuICAgICAgICAgICAgICAgICAgICAnYWx0JyxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlcicsXG4gICAgICAgICAgICAgICAgICAgICdoZWlnaHQnLFxuICAgICAgICAgICAgICAgICAgICAnaHNwYWNlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2lzbWFwJyxcbiAgICAgICAgICAgICAgICAgICAgJ25hbWUnLFxuICAgICAgICAgICAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICAgICAgICAgICAgJ3VzZW1hcCcsXG4gICAgICAgICAgICAgICAgICAgICd2c3BhY2UnLFxuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBpbnB1dDogW1xuICAgICAgICAgICAgICAgICAgICAnYWNjZXB0JyxcbiAgICAgICAgICAgICAgICAgICAgJ2FjY2Vzc2tleScsXG4gICAgICAgICAgICAgICAgICAgICdhbGlnbicsXG4gICAgICAgICAgICAgICAgICAgICdhbHQnLFxuICAgICAgICAgICAgICAgICAgICAnYXV0b2NvbXBsZXRlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2NoZWNrZWQnLFxuICAgICAgICAgICAgICAgICAgICAnZGlzYWJsZWQnLFxuICAgICAgICAgICAgICAgICAgICAnaW5wdXRtb2RlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2lzbWFwJyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpc3QnLFxuICAgICAgICAgICAgICAgICAgICAnbWF4JyxcbiAgICAgICAgICAgICAgICAgICAgJ21heGxlbmd0aCcsXG4gICAgICAgICAgICAgICAgICAgICdtaW4nLFxuICAgICAgICAgICAgICAgICAgICAnbXVsdGlwbGUnLFxuICAgICAgICAgICAgICAgICAgICAnbmFtZScsXG4gICAgICAgICAgICAgICAgICAgICdwbGFjZWhvbGRlcicsXG4gICAgICAgICAgICAgICAgICAgICdyZWFkb25seScsXG4gICAgICAgICAgICAgICAgICAgICdyZXF1aXJlZCcsXG4gICAgICAgICAgICAgICAgICAgICdzaXplJyxcbiAgICAgICAgICAgICAgICAgICAgJ3NyYycsXG4gICAgICAgICAgICAgICAgICAgICdzdGVwJyxcbiAgICAgICAgICAgICAgICAgICAgJ3RhYmluZGV4JyxcbiAgICAgICAgICAgICAgICAgICAgJ3R5cGUnLFxuICAgICAgICAgICAgICAgICAgICAndXNlbWFwJyxcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJ1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgaW5zOiBbJ2NpdGUnLCAnZGF0ZXRpbWUnXSxcbiAgICAgICAgICAgICAgICBsYWJlbDogWydhY2Nlc3NrZXknLCAnZm9yJ10sXG4gICAgICAgICAgICAgICAgbGVnZW5kOiBbJ2FjY2Vzc2tleScsICdhbGlnbiddLFxuICAgICAgICAgICAgICAgIGxpOiBbJ3R5cGUnLCAndmFsdWUnXSxcbiAgICAgICAgICAgICAgICBtYXA6IFsnbmFtZSddLFxuICAgICAgICAgICAgICAgIG1lbnU6IFsnY29tcGFjdCcsICdsYWJlbCcsICd0eXBlJ10sXG4gICAgICAgICAgICAgICAgbWV0ZXI6IFsnaGlnaCcsICdsb3cnLCAnbWF4JywgJ21pbicsICd2YWx1ZSddLFxuICAgICAgICAgICAgICAgIG9sOiBbJ2NvbXBhY3QnLCAncmV2ZXJzZWQnLCAnc3RhcnQnLCAndHlwZSddLFxuICAgICAgICAgICAgICAgIG9wdGdyb3VwOiBbJ2Rpc2FibGVkJywgJ2xhYmVsJ10sXG4gICAgICAgICAgICAgICAgb3B0aW9uOiBbJ2Rpc2FibGVkJywgJ2xhYmVsJywgJ3NlbGVjdGVkJywgJ3ZhbHVlJ10sXG4gICAgICAgICAgICAgICAgb3V0cHV0OiBbJ2ZvcicsICduYW1lJ10sXG4gICAgICAgICAgICAgICAgcDogWydhbGlnbiddLFxuICAgICAgICAgICAgICAgIHByZTogWyd3aWR0aCddLFxuICAgICAgICAgICAgICAgIHByb2dyZXNzOiBbJ21heCcsICdtaW4nLCAndmFsdWUnXSxcbiAgICAgICAgICAgICAgICBxOiBbJ2NpdGUnXSxcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IFtcbiAgICAgICAgICAgICAgICAgICAgJ2F1dG9jb21wbGV0ZScsXG4gICAgICAgICAgICAgICAgICAgICdkaXNhYmxlZCcsXG4gICAgICAgICAgICAgICAgICAgICdtdWx0aXBsZScsXG4gICAgICAgICAgICAgICAgICAgICduYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgJ3JlcXVpcmVkJyxcbiAgICAgICAgICAgICAgICAgICAgJ3NpemUnLFxuICAgICAgICAgICAgICAgICAgICAndGFiaW5kZXgnXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3VyY2U6IFsndHlwZSddLFxuICAgICAgICAgICAgICAgIHRhYmxlOiBbXG4gICAgICAgICAgICAgICAgICAgICdhbGlnbicsXG4gICAgICAgICAgICAgICAgICAgICdiZ2NvbG9yJyxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlcicsXG4gICAgICAgICAgICAgICAgICAgICdjZWxscGFkZGluZycsXG4gICAgICAgICAgICAgICAgICAgICdjZWxsc3BhY2luZycsXG4gICAgICAgICAgICAgICAgICAgICdmcmFtZScsXG4gICAgICAgICAgICAgICAgICAgICdydWxlcycsXG4gICAgICAgICAgICAgICAgICAgICdzdW1tYXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJ1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgdGJvZHk6IFsnYWxpZ24nLCAnY2hhcicsICdjaGFyb2ZmJywgJ3ZhbGlnbiddLFxuICAgICAgICAgICAgICAgIHRkOiBbXG4gICAgICAgICAgICAgICAgICAgICdhYmJyJyxcbiAgICAgICAgICAgICAgICAgICAgJ2FsaWduJyxcbiAgICAgICAgICAgICAgICAgICAgJ2F4aXMnLFxuICAgICAgICAgICAgICAgICAgICAnYmdjb2xvcicsXG4gICAgICAgICAgICAgICAgICAgICdjaGFyJyxcbiAgICAgICAgICAgICAgICAgICAgJ2NoYXJvZmYnLFxuICAgICAgICAgICAgICAgICAgICAnY29sc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICdoZWFkZXJzJyxcbiAgICAgICAgICAgICAgICAgICAgJ2hlaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICdub3dyYXAnLFxuICAgICAgICAgICAgICAgICAgICAncm93c3BhbicsXG4gICAgICAgICAgICAgICAgICAgICdzY29wZScsXG4gICAgICAgICAgICAgICAgICAgICd2YWxpZ24nLFxuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB0ZXh0YXJlYTogW1xuICAgICAgICAgICAgICAgICAgICAnYWNjZXNza2V5JyxcbiAgICAgICAgICAgICAgICAgICAgJ2F1dG9jb21wbGV0ZScsXG4gICAgICAgICAgICAgICAgICAgICdjb2xzJyxcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc2FibGVkJyxcbiAgICAgICAgICAgICAgICAgICAgJ2lucHV0bW9kZScsXG4gICAgICAgICAgICAgICAgICAgICduYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgJ3BsYWNlaG9sZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgJ3JlYWRvbmx5JyxcbiAgICAgICAgICAgICAgICAgICAgJ3JlcXVpcmVkJyxcbiAgICAgICAgICAgICAgICAgICAgJ3Jvd3MnLFxuICAgICAgICAgICAgICAgICAgICAndGFiaW5kZXgnLFxuICAgICAgICAgICAgICAgICAgICAnd3JhcCdcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHRmb290OiBbJ2FsaWduJywgJ2NoYXInLCAnY2hhcm9mZicsICd2YWxpZ24nXSxcbiAgICAgICAgICAgICAgICB0aDogW1xuICAgICAgICAgICAgICAgICAgICAnYWJicicsXG4gICAgICAgICAgICAgICAgICAgICdhbGlnbicsXG4gICAgICAgICAgICAgICAgICAgICdheGlzJyxcbiAgICAgICAgICAgICAgICAgICAgJ2JnY29sb3InLFxuICAgICAgICAgICAgICAgICAgICAnY2hhcicsXG4gICAgICAgICAgICAgICAgICAgICdjaGFyb2ZmJyxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbHNwYW4nLFxuICAgICAgICAgICAgICAgICAgICAnaGVhZGVycycsXG4gICAgICAgICAgICAgICAgICAgICdoZWlnaHQnLFxuICAgICAgICAgICAgICAgICAgICAnbm93cmFwJyxcbiAgICAgICAgICAgICAgICAgICAgJ3Jvd3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICAnc2NvcGUnLFxuICAgICAgICAgICAgICAgICAgICAndmFsaWduJyxcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJ1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgdGhlYWQ6IFsnYWxpZ24nLCAnY2hhcicsICdjaGFyb2ZmJywgJ3ZhbGlnbiddLFxuICAgICAgICAgICAgICAgIHRyOiBbJ2FsaWduJywgJ2JnY29sb3InLCAnY2hhcicsICdjaGFyb2ZmJywgJ3ZhbGlnbiddLFxuICAgICAgICAgICAgICAgIHRyYWNrOiBbJ2RlZmF1bHQnLCAna2luZCcsICdsYWJlbCcsICdzcmNsYW5nJ10sXG4gICAgICAgICAgICAgICAgdWw6IFsnY29tcGFjdCcsICd0eXBlJ10sXG4gICAgICAgICAgICAgICAgdmlkZW86IFtcbiAgICAgICAgICAgICAgICAgICAgJ2F1dG9wbGF5JyxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRyb2xzJyxcbiAgICAgICAgICAgICAgICAgICAgJ2hlaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICdsb29wJyxcbiAgICAgICAgICAgICAgICAgICAgJ21lZGlhZ3JvdXAnLFxuICAgICAgICAgICAgICAgICAgICAnbXV0ZWQnLFxuICAgICAgICAgICAgICAgICAgICAncG9zdGVyJyxcbiAgICAgICAgICAgICAgICAgICAgJ3ByZWxvYWQnLFxuICAgICAgICAgICAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBJbmxpbmUgQ1NTIHN0eWxlcyB0aGF0IEhUTUwgdGFncyBtYXkgaGF2ZSAoYW5kIHRoZWlyIGFsbG93ZWQgdmFsdWVzKVxuICAgICAgICAgICAgYWxsb3dlZFN0eWxlczoge1xuICAgICAgICAgICAgICAgIC8vIFRvIHNpbXBsaWZ5IHRoZSBkYXRhLCBhbGwgc3R5bGVzIGFyZSBhbGxvd2VkIG9uIGFsbCB0YWdzIHRoYXQgYWxsb3cgdGhlIHN0eWxlIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICcqJzoge1xuICAgICAgICAgICAgICAgICAgICAnYmFja2ZhY2UtdmlzaWJpbGl0eSc6IFtDc3NQcm9wLkJBQ0tGQUNFX1ZJU0lCSUxJVFldLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBbQ3NzUHJvcC5CQUNLR1JPVU5EXSxcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtYXR0YWNobWVudCc6IFtDc3NQcm9wLkJBQ0tHUk9VTkRfQVRUQUNITUVOVF0sXG4gICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNsaXAnOiBbQ3NzUHJvcC5CQUNLR1JPVU5EX0NMSVBdLFxuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IFtDc3NQcm9wLkJBQ0tHUk9VTkRfQ09MT1JdLFxuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZSc6IFtDc3NQcm9wLkJBQ0tHUk9VTkRfSU1BR0VdLFxuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1vcmlnaW4nOiBbQ3NzUHJvcC5CQUNLR1JPVU5EX09SSUdJTl0sXG4gICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLXBvc2l0aW9uJzogW0Nzc1Byb3AuQkFDS0dST1VORF9QT1NJVElPTl0sXG4gICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLXJlcGVhdCc6IFtDc3NQcm9wLkJBQ0tHUk9VTkRfUkVQRUFUXSxcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtc2l6ZSc6IFtDc3NQcm9wLkJBQ0tHUk9VTkRfU0laRV0sXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogW0Nzc1Byb3AuQk9SREVSXSxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlci1ib3R0b20nOiBbQ3NzUHJvcC5CT1JERVJfQk9UVE9NXSxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlci1ib3R0b20tY29sb3InOiBbQ3NzUHJvcC5CT1JERVJfQk9UVE9NX0NPTE9SXSxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXMnOiBbQ3NzUHJvcC5CT1JERVJfQk9UVE9NX0xFRlRfUkFESVVTXSxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzJzogW0Nzc1Byb3AuQk9SREVSX0JPVFRPTV9SSUdIVF9SQURJVVNdLFxuICAgICAgICAgICAgICAgICAgICAnYm9yZGVyLWJvdHRvbS1zdHlsZSc6IFtDc3NQcm9wLkJPUkRFUl9CT1RUT01fU1RZTEVdLFxuICAgICAgICAgICAgICAgICAgICAnYm9yZGVyLWJvdHRvbS13aWR0aCc6IFtDc3NQcm9wLkJPUkRFUl9CT1RUT01fV0lEVEhdLFxuICAgICAgICAgICAgICAgICAgICAnYm9yZGVyLWNvbGxhcHNlJzogW0Nzc1Byb3AuQk9SREVSX0NPTExBUFNFXSxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlci1jb2xvcic6IFtDc3NQcm9wLkJPUkRFUl9DT0xPUl0sXG4gICAgICAgICAgICAgICAgICAgICdib3JkZXItbGVmdCc6IFtDc3NQcm9wLkJPUkRFUl9MRUZUXSxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlci1sZWZ0LWNvbG9yJzogW0Nzc1Byb3AuQk9SREVSX0xFRlRfQ09MT1JdLFxuICAgICAgICAgICAgICAgICAgICAnYm9yZGVyLWxlZnQtc3R5bGUnOiBbQ3NzUHJvcC5CT1JERVJfTEVGVF9TVFlMRV0sXG4gICAgICAgICAgICAgICAgICAgICdib3JkZXItbGVmdC13aWR0aCc6IFtDc3NQcm9wLkJPUkRFUl9MRUZUX1dJRFRIXSxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiBbQ3NzUHJvcC5CT1JERVJfUkFESVVTXSxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlci1yaWdodCc6IFtDc3NQcm9wLkJPUkRFUl9SSUdIVF0sXG4gICAgICAgICAgICAgICAgICAgICdib3JkZXItcmlnaHQtY29sb3InOiBbQ3NzUHJvcC5CT1JERVJfUklHSFRfQ09MT1JdLFxuICAgICAgICAgICAgICAgICAgICAnYm9yZGVyLXJpZ2h0LXN0eWxlJzogW0Nzc1Byb3AuQk9SREVSX1JJR0hUX1NUWUxFXSxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlci1yaWdodC13aWR0aCc6IFtDc3NQcm9wLkJPUkRFUl9SSUdIVF9XSURUSF0sXG4gICAgICAgICAgICAgICAgICAgICdib3JkZXItc3BhY2luZyc6IFtDc3NQcm9wLkJPUkRFUl9TUEFDSU5HXSxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlci1zdHlsZSc6IFtDc3NQcm9wLkJPUkRFUl9TVFlMRV0sXG4gICAgICAgICAgICAgICAgICAgICdib3JkZXItdG9wJzogW0Nzc1Byb3AuQk9SREVSX1RPUF0sXG4gICAgICAgICAgICAgICAgICAgICdib3JkZXItdG9wLWNvbG9yJzogW0Nzc1Byb3AuQk9SREVSX1RPUF9DT0xPUl0sXG4gICAgICAgICAgICAgICAgICAgICdib3JkZXItdG9wLWxlZnQtcmFkaXVzJzogW0Nzc1Byb3AuQk9SREVSX1RPUF9MRUZUX1JBRElVU10sXG4gICAgICAgICAgICAgICAgICAgICdib3JkZXItdG9wLXJpZ2h0LXJhZGl1cyc6IFtDc3NQcm9wLkJPUkRFUl9UT1BfUklHSFRfUkFESVVTXSxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlci10b3Atc3R5bGUnOiBbQ3NzUHJvcC5CT1JERVJfVE9QX1NUWUxFXSxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlci10b3Atd2lkdGgnOiBbQ3NzUHJvcC5CT1JERVJfVE9QX1dJRFRIXSxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlci13aWR0aCc6IFtDc3NQcm9wLkJPUkRFUl9XSURUSF0sXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogW0Nzc1Byb3AuQk9UVE9NXSxcbiAgICAgICAgICAgICAgICAgICAgYm94OiBbQ3NzUHJvcC5CT1hdLFxuICAgICAgICAgICAgICAgICAgICAnYm94LXNoYWRvdyc6IFtDc3NQcm9wLkJPWF9TSEFET1ddLFxuICAgICAgICAgICAgICAgICAgICAnYm94LXNpemluZyc6IFtDc3NQcm9wLkJPWF9TSVpJTkddLFxuICAgICAgICAgICAgICAgICAgICAnY2FwdGlvbi1zaWRlJzogW0Nzc1Byb3AuQ0FQVElPTl9TSURFXSxcbiAgICAgICAgICAgICAgICAgICAgY2xlYXI6IFtDc3NQcm9wLkNMRUFSXSxcbiAgICAgICAgICAgICAgICAgICAgY2xpcDogW0Nzc1Byb3AuQ0xJUF0sXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBbQ3NzUHJvcC5DT0xPUl0sXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogW0Nzc1Byb3AuQ1VSU09SXSxcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBbQ3NzUHJvcC5ESVJFQ1RJT05dLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBbQ3NzUHJvcC5ESVNQTEFZXSxcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXktaW5zaWRlJzogW0Nzc1Byb3AuRElTUExBWV9JTlNJREVdLFxuICAgICAgICAgICAgICAgICAgICAnZGlzcGxheS1vdXRzaWRlJzogW0Nzc1Byb3AuRElTUExBWV9PVVRTSURFXSxcbiAgICAgICAgICAgICAgICAgICAgZWxldmF0aW9uOiBbQ3NzUHJvcC5FTEVWQVRJT05dLFxuICAgICAgICAgICAgICAgICAgICAnZW1wdHktY2VsbHMnOiBbQ3NzUHJvcC5FTVBUWV9DRUxMU10sXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0OiBbQ3NzUHJvcC5GTE9BVF0sXG4gICAgICAgICAgICAgICAgICAgIGZvbnQ6IFtDc3NQcm9wLkZPTlRdLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1mYW1pbHknOiBbQ3NzUHJvcC5GT05UX0ZBTUlMWV0sXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiBbQ3NzUHJvcC5GT05UX1NJWkVdLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zdHJldGNoJzogW0Nzc1Byb3AuRk9OVF9TVFJFVENIXSxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc3R5bGUnOiBbQ3NzUHJvcC5GT05UX1NUWUxFXSxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtdmFyaWFudCc6IFtDc3NQcm9wLkZPTlRfVkFSSUFOVF0sXG4gICAgICAgICAgICAgICAgICAgICdmb250LXdlaWdodCc6IFtDc3NQcm9wLkZPTlRfV0VJR0hUXSxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBbQ3NzUHJvcC5IRUlHSFRdLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBbQ3NzUHJvcC5MRUZUXSxcbiAgICAgICAgICAgICAgICAgICAgJ2xldHRlci1zcGFjaW5nJzogW0Nzc1Byb3AuTEVUVEVSX1NQQUNJTkddLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiBbQ3NzUHJvcC5MSU5FX0hFSUdIVF0sXG4gICAgICAgICAgICAgICAgICAgICdsaXN0LXN0eWxlJzogW0Nzc1Byb3AuTElTVF9TVFlMRV0sXG4gICAgICAgICAgICAgICAgICAgICdsaXN0LXN0eWxlLWltYWdlJzogW0Nzc1Byb3AuTElTVF9TVFlMRV9JTUFHRV0sXG4gICAgICAgICAgICAgICAgICAgICdsaXN0LXN0eWxlLXBvc2l0aW9uJzogW0Nzc1Byb3AuTElTVF9TVFlMRV9QT1NJVElPTl0sXG4gICAgICAgICAgICAgICAgICAgICdsaXN0LXN0eWxlLXR5cGUnOiBbQ3NzUHJvcC5MSVNUX1NUWUxFX1RZUEVdLFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IFtDc3NQcm9wLk1BUkdJTl0sXG4gICAgICAgICAgICAgICAgICAgICdtYXJnaW4tYm90dG9tJzogW0Nzc1Byb3AuTUFSR0lOX0JPVFRPTV0sXG4gICAgICAgICAgICAgICAgICAgICdtYXJnaW4tbGVmdCc6IFtDc3NQcm9wLk1BUkdJTl9MRUZUXSxcbiAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1yaWdodCc6IFtDc3NQcm9wLk1BUkdJTl9SSUdIVF0sXG4gICAgICAgICAgICAgICAgICAgICdtYXJnaW4tdG9wJzogW0Nzc1Byb3AuTUFSR0lOX1RPUF0sXG4gICAgICAgICAgICAgICAgICAgICdtYXgtaGVpZ2h0JzogW0Nzc1Byb3AuTUFYX0hFSUdIVF0sXG4gICAgICAgICAgICAgICAgICAgICdtYXgtd2lkdGgnOiBbQ3NzUHJvcC5NQVhfV0lEVEhdLFxuICAgICAgICAgICAgICAgICAgICAnbWluLWhlaWdodCc6IFtDc3NQcm9wLk1JTl9IRUlHSFRdLFxuICAgICAgICAgICAgICAgICAgICAnbWluLXdpZHRoJzogW0Nzc1Byb3AuTUlOX1dJRFRIXSxcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogW0Nzc1Byb3AuT1BBQ0lUWV0sXG4gICAgICAgICAgICAgICAgICAgIG91dGxpbmU6IFtDc3NQcm9wLk9VVExJTkVdLFxuICAgICAgICAgICAgICAgICAgICAnb3V0bGluZS1jb2xvcic6IFtDc3NQcm9wLk9VVExJTkVfQ09MT1JdLFxuICAgICAgICAgICAgICAgICAgICAnb3V0bGluZS1zdHlsZSc6IFtDc3NQcm9wLk9VVExJTkVfU1RZTEVdLFxuICAgICAgICAgICAgICAgICAgICAnb3V0bGluZS13aWR0aCc6IFtDc3NQcm9wLk9VVExJTkVfV0lEVEhdLFxuICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogW0Nzc1Byb3AuT1ZFUkZMT1ddLFxuICAgICAgICAgICAgICAgICAgICAnb3ZlcmZsb3ctd3JhcCc6IFtDc3NQcm9wLk9WRVJGTE9XX1dSQVBdLFxuICAgICAgICAgICAgICAgICAgICAnb3ZlcmZsb3cteCc6IFtDc3NQcm9wLk9WRVJGTE9XX1hdLFxuICAgICAgICAgICAgICAgICAgICAnb3ZlcmZsb3cteSc6IFtDc3NQcm9wLk9WRVJGTE9XX1ldLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBbQ3NzUHJvcC5QQURESU5HXSxcbiAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctYm90dG9tJzogW0Nzc1Byb3AuUEFERElOR19CT1RUT01dLFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1sZWZ0JzogW0Nzc1Byb3AuUEFERElOR19MRUZUXSxcbiAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBbQ3NzUHJvcC5QQURESU5HX1JJR0hUXSxcbiAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctdG9wJzogW0Nzc1Byb3AuUEFERElOR19UT1BdLFxuICAgICAgICAgICAgICAgICAgICAncGFnZS1icmVhay1hZnRlcic6IFtDc3NQcm9wLlBBR0VfQlJFQUtfQUZURVJdLFxuICAgICAgICAgICAgICAgICAgICAncGFnZS1icmVhay1iZWZvcmUnOiBbQ3NzUHJvcC5QQUdFX0JSRUFLX0JFRk9SRV0sXG4gICAgICAgICAgICAgICAgICAgICdwYWdlLWJyZWFrLWluc2lkZSc6IFtDc3NQcm9wLlBBR0VfQlJFQUtfSU5TSURFXSxcbiAgICAgICAgICAgICAgICAgICAgJ3BhdXNlLWFmdGVyJzogW0Nzc1Byb3AuUEFVU0VfQUZURVJdLFxuICAgICAgICAgICAgICAgICAgICBwZXJzcGVjdGl2ZTogW0Nzc1Byb3AuUEVSU1BFQ1RJVkVdLFxuICAgICAgICAgICAgICAgICAgICBwaXRjaDogW0Nzc1Byb3AuUElUQ0hdLFxuICAgICAgICAgICAgICAgICAgICAncGl0Y2gtcmFuZ2UnOiBbQ3NzUHJvcC5QSVRDSF9SQU5HRV0sXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBbQ3NzUHJvcC5QT1NJVElPTl0sXG4gICAgICAgICAgICAgICAgICAgIHF1b3RlczogW0Nzc1Byb3AuUVVPVEVTXSxcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplOiBbQ3NzUHJvcC5SRVNJWkVdLFxuICAgICAgICAgICAgICAgICAgICByaWNobmVzczogW0Nzc1Byb3AuUklDSE5FU1NdLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogW0Nzc1Byb3AuUklHSFRdLFxuICAgICAgICAgICAgICAgICAgICBzcGVhazogW0Nzc1Byb3AuU1BFQUtdLFxuICAgICAgICAgICAgICAgICAgICAnc3BlYWstaGVhZGVyJzogW0Nzc1Byb3AuU1BFQUtfSEVBREVSXSxcbiAgICAgICAgICAgICAgICAgICAgJ3NwZWFrLW51bWVyYWwnOiBbQ3NzUHJvcC5TUEVBS19OVU1FUkFMXSxcbiAgICAgICAgICAgICAgICAgICAgJ3NwZWFrLXB1bmN0dWF0aW9uJzogW0Nzc1Byb3AuU1BFQUtfUFVOQ1RVQVRJT05dLFxuICAgICAgICAgICAgICAgICAgICAnc3BlZWNoLXJhdGUnOiBbQ3NzUHJvcC5TUEVFQ0hfUkFURV0sXG4gICAgICAgICAgICAgICAgICAgIHN0cmVzczogW0Nzc1Byb3AuU1RSRVNTXSxcbiAgICAgICAgICAgICAgICAgICAgJ3RhYmxlLWxheW91dCc6IFtDc3NQcm9wLlRBQkxFX0xBWU9VVF0sXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0LWFsaWduJzogW0Nzc1Byb3AuVEVYVF9BTElHTl0sXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0LWRlY29yYXRpb24nOiBbQ3NzUHJvcC5URVhUX0RFQ09SQVRJT05dLFxuICAgICAgICAgICAgICAgICAgICAndGV4dC1pbmRlbnQnOiBbQ3NzUHJvcC5URVhUX0lOREVOVF0sXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0LW92ZXJmbG93JzogW0Nzc1Byb3AuVEVYVF9PVkVSRkxPV10sXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0LXNoYWRvdyc6IFtDc3NQcm9wLlRFWFRfU0hBRE9XXSxcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQtdHJhbnNmb3JtJzogW0Nzc1Byb3AuVEVYVF9UUkFOU0ZPUk1dLFxuICAgICAgICAgICAgICAgICAgICAndGV4dC13cmFwJzogW0Nzc1Byb3AuVEVYVF9XUkFQXSxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBbQ3NzUHJvcC5UT1BdLFxuICAgICAgICAgICAgICAgICAgICAndW5pY29kZS1iaWRpJzogW0Nzc1Byb3AuVU5JQ09ERV9CSURJXSxcbiAgICAgICAgICAgICAgICAgICAgJ3ZlcnRpY2FsLWFsaWduJzogW0Nzc1Byb3AuVkVSVElDQUxfQUxJR05dLFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBbQ3NzUHJvcC5WSVNJQklMSVRZXSxcbiAgICAgICAgICAgICAgICAgICAgdm9sdW1lOiBbQ3NzUHJvcC5WT0xVTUVdLFxuICAgICAgICAgICAgICAgICAgICAnd2hpdGUtc3BhY2UnOiBbQ3NzUHJvcC5XSElURV9TUEFDRV0sXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBbQ3NzUHJvcC5XSURUSF0sXG4gICAgICAgICAgICAgICAgICAgICd3b3JkLWJyZWFrJzogW0Nzc1Byb3AuV09SRF9CUkVBS10sXG4gICAgICAgICAgICAgICAgICAgICd3b3JkLXNwYWNpbmcnOiBbQ3NzUHJvcC5XT1JEX1NQQUNJTkddLFxuICAgICAgICAgICAgICAgICAgICAnd29yZC13cmFwJzogW0Nzc1Byb3AuV09SRF9XUkFQXSxcbiAgICAgICAgICAgICAgICAgICAgJ3otaW5kZXgnOiBbQ3NzUHJvcC5aX0lOREVYXSxcbiAgICAgICAgICAgICAgICAgICAgem9vbTogW0Nzc1Byb3AuWk9PTV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHJhbnNmb3JtVGFnczoge1xuICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgXCJyZWxcIiBhdHRyaWJ1dGUgZm9yIDxhPiB0YWdzIHRvIFwibm9mb2xsb3dcIi5cbiAgICAgICAgICAgICAgICBhOiBzYW5pdGl6ZS5zaW1wbGVUcmFuc2Zvcm0oJ2EnLCB7IHJlbDogJ25vZm9sbG93JyB9KSxcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIFwiZGlzYWJsZWRcIiBhdHRyaWJ1dGUgZm9yIDxpbnB1dD4gdGFncy5cbiAgICAgICAgICAgICAgICBpbnB1dDogc2FuaXRpemUuc2ltcGxlVHJhbnNmb3JtKCdpbnB1dCcsIHsgZGlzYWJsZWQ6ICdkaXNhYmxlZCcgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbGxvd2VkU2NoZW1lc0J5VGFnOiB7XG4gICAgICAgICAgICAgICAgLy8gQWxsb3cgJ2F0dGFjaG1lbnQ6JyBpbWcgc3JjICh1c2VkIGZvciBtYXJrZG93biBjZWxsIGF0dGFjaG1lbnRzKS5cbiAgICAgICAgICAgICAgICBpbWc6IHNhbml0aXplLmRlZmF1bHRzLmFsbG93ZWRTY2hlbWVzLmNvbmNhdChbJ2F0dGFjaG1lbnQnXSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBPdmVycmlkZSBvZiB0aGUgZGVmYXVsdCBvcHRpb24sIHNvIHdlIGNhbiBza2lwICdzcmMnIGF0dHJpYnV0ZSB2YWxpZGF0aW9uLlxuICAgICAgICAgICAgLy8gJ3NyYycgQXR0cmlidXRlcyBhcmUgdmFsaWRhdGVkIHRvIGJlIFVSSXMsIHdoaWNoIGRvZXMgbm90IGFsbG93IGZvciBlbWJlZGRlZCAoaW1hZ2UpIGRhdGEuXG4gICAgICAgICAgICAvLyBTaW5jZSBlbWJlZGRlZCBkYXRhIGlzIG5vIGxvbmdlciBkZWVtZWQgdG8gYmUgYSB0aHJlYXQsIHZhbGlkYXRpb24gY2FuIGJlIHNraXBwZWQuXG4gICAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2p1cHl0ZXJsYWIvanVweXRlcmxhYi9pc3N1ZXMvNTE4M1xuICAgICAgICAgICAgYWxsb3dlZFNjaGVtZXNBcHBsaWVkVG9BdHRyaWJ1dGVzOiBbJ2hyZWYnLCAnY2l0ZSddXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhbml0aXplIGFuIEhUTUwgc3RyaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRpcnR5IC0gVGhlIGRpcnR5IHRleHQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFRoZSBvcHRpb25hbCBzYW5pdGl6YXRpb24gb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBzYW5pdGl6ZWQgc3RyaW5nLlxuICAgICAqL1xuICAgIHNhbml0aXplKGRpcnR5LCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBzYW5pdGl6ZShkaXJ0eSwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9vcHRpb25zKSwgKG9wdGlvbnMgfHwge30pKSk7XG4gICAgfVxufVxuLyoqXG4gKiBUaGUgZGVmYXVsdCBpbnN0YW5jZSBvZiBhbiBgSVNhbml0aXplcmAgbWVhbnQgZm9yIHVzZSBieSB1c2VyIGNvZGUuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2FuaXRpemVyID0gbmV3IFNhbml0aXplcigpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2FuaXRpemVyLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IElucHV0R3JvdXAgfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IFN0cmluZ0V4dCB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUmVhY3RXaWRnZXQgfSBmcm9tICcuL3Zkb20nO1xuLyoqXG4gKiBQZXJmb3JtIGEgZnV6enkgc2VhcmNoIG9uIGEgc2luZ2xlIGl0ZW0uXG4gKi9cbmZ1bmN0aW9uIGZ1enp5U2VhcmNoKHNvdXJjZSwgcXVlcnkpIHtcbiAgICAvLyBTZXQgdXAgdGhlIG1hdGNoIHNjb3JlIGFuZCBpbmRpY2VzIGFycmF5LlxuICAgIGxldCBzY29yZSA9IEluZmluaXR5O1xuICAgIGxldCBpbmRpY2VzID0gbnVsbDtcbiAgICAvLyBUaGUgcmVnZXggZm9yIHNlYXJjaCB3b3JkIGJvdW5kYXJpZXNcbiAgICBjb25zdCByZ3ggPSAvXFxiXFx3L2c7XG4gICAgbGV0IGNvbnRpbnVlU2VhcmNoID0gdHJ1ZTtcbiAgICAvLyBTZWFyY2ggdGhlIHNvdXJjZSBieSB3b3JkIGJvdW5kYXJ5LlxuICAgIHdoaWxlIChjb250aW51ZVNlYXJjaCkge1xuICAgICAgICAvLyBGaW5kIHRoZSBuZXh0IHdvcmQgYm91bmRhcnkgaW4gdGhlIHNvdXJjZS5cbiAgICAgICAgbGV0IHJneE1hdGNoID0gcmd4LmV4ZWMoc291cmNlKTtcbiAgICAgICAgLy8gQnJlYWsgaWYgdGhlcmUgaXMgbm8gbW9yZSBzb3VyY2UgY29udGV4dC5cbiAgICAgICAgaWYgKCFyZ3hNYXRjaCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUnVuIHRoZSBzdHJpbmcgbWF0Y2ggb24gdGhlIHJlbGV2YW50IHN1YnN0cmluZy5cbiAgICAgICAgbGV0IG1hdGNoID0gU3RyaW5nRXh0Lm1hdGNoU3VtT2ZEZWx0YXMoc291cmNlLCBxdWVyeSwgcmd4TWF0Y2guaW5kZXgpO1xuICAgICAgICAvLyBCcmVhayBpZiB0aGVyZSBpcyBubyBtYXRjaC5cbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXBkYXRlIHRoZSBtYXRjaCBpZiB0aGUgc2NvcmUgaXMgYmV0dGVyLlxuICAgICAgICBpZiAobWF0Y2ggJiYgbWF0Y2guc2NvcmUgPD0gc2NvcmUpIHtcbiAgICAgICAgICAgIHNjb3JlID0gbWF0Y2guc2NvcmU7XG4gICAgICAgICAgICBpbmRpY2VzID0gbWF0Y2guaW5kaWNlcztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBCYWlsIGlmIHRoZXJlIHdhcyBubyBtYXRjaC5cbiAgICBpZiAoIWluZGljZXMgfHwgc2NvcmUgPT09IEluZmluaXR5KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyBIYW5kbGUgYSBzcGxpdCBtYXRjaC5cbiAgICByZXR1cm4ge1xuICAgICAgICBzY29yZSxcbiAgICAgICAgaW5kaWNlc1xuICAgIH07XG59XG5leHBvcnQgY29uc3QgdXBkYXRlRmlsdGVyRnVuY3Rpb24gPSAodmFsdWUsIHVzZUZ1enp5RmlsdGVyLCBjYXNlU2Vuc2l0aXZlKSA9PiB7XG4gICAgcmV0dXJuIChpdGVtKSA9PiB7XG4gICAgICAgIGlmICh1c2VGdXp6eUZpbHRlcikge1xuICAgICAgICAgICAgLy8gUnVuIHRoZSBmdXp6eSBzZWFyY2ggZm9yIHRoZSBpdGVtIGFuZCBxdWVyeS5cbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGxldCBzY29yZSA9IGZ1enp5U2VhcmNoKGl0ZW0sIHF1ZXJ5KTtcbiAgICAgICAgICAgIC8vIElnbm9yZSB0aGUgaXRlbSBpZiBpdCBpcyBub3QgYSBtYXRjaC5cbiAgICAgICAgICAgIGlmICghc2NvcmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhc2VTZW5zaXRpdmUpIHtcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaSA9IGl0ZW0uaW5kZXhPZih2YWx1ZSk7XG4gICAgICAgIGlmIChpID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG59O1xuZXhwb3J0IGNvbnN0IEZpbHRlckJveCA9IChwcm9wcykgPT4ge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBbZmlsdGVyLCBzZXRGaWx0ZXJdID0gdXNlU3RhdGUoKF9hID0gcHJvcHMuaW5pdGlhbFF1ZXJ5KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJyk7XG4gICAgaWYgKHByb3BzLmZvcmNlUmVmcmVzaCkge1xuICAgICAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICAgICAgcHJvcHMudXBkYXRlRmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbiBpbml0aWFsIHNlYXJjaCB2YWx1ZSwgcGFzcyB0aGUgcGFyZW50IHRoZSBpbml0aWFsIGZpbHRlciBmdW5jdGlvbiBmb3IgdGhhdCB2YWx1ZS5cbiAgICAgICAgaWYgKHByb3BzLmluaXRpYWxRdWVyeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwcm9wcy51cGRhdGVGaWx0ZXIodXBkYXRlRmlsdGVyRnVuY3Rpb24ocHJvcHMuaW5pdGlhbFF1ZXJ5LCBwcm9wcy51c2VGdXp6eUZpbHRlciwgcHJvcHMuY2FzZVNlbnNpdGl2ZSksIHByb3BzLmluaXRpYWxRdWVyeSk7XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3Igc2VhcmNoIGlucHV0IGNoYW5nZXMuXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgIHNldEZpbHRlcih0YXJnZXQudmFsdWUpO1xuICAgICAgICBwcm9wcy51cGRhdGVGaWx0ZXIodXBkYXRlRmlsdGVyRnVuY3Rpb24odGFyZ2V0LnZhbHVlLCBwcm9wcy51c2VGdXp6eUZpbHRlciwgcHJvcHMuY2FzZVNlbnNpdGl2ZSksIHRhcmdldC52YWx1ZSk7XG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRHcm91cCwgeyB0eXBlOiBcInRleHRcIiwgcmlnaHRJY29uOiBcInVpLWNvbXBvbmVudHM6c2VhcmNoXCIsIHBsYWNlaG9sZGVyOiBwcm9wcy5wbGFjZWhvbGRlciwgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBcImpwLUZpbHRlckJveFwiLCB2YWx1ZTogZmlsdGVyIH0pKTtcbn07XG4vKipcbiAqIEEgd2lkZ2V0IHdoaWNoIGhvc3RzIGEgaW5wdXQgdGV4dGJveCB0byBmaWx0ZXIgb24gZmlsZSBuYW1lcy5cbiAqL1xuZXhwb3J0IGNvbnN0IEZpbGVuYW1lU2VhcmNoZXIgPSAocHJvcHMpID0+IHtcbiAgICByZXR1cm4gUmVhY3RXaWRnZXQuY3JlYXRlKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsdGVyQm94LCB7IHVwZGF0ZUZpbHRlcjogcHJvcHMudXBkYXRlRmlsdGVyLCB1c2VGdXp6eUZpbHRlcjogcHJvcHMudXNlRnV6enlGaWx0ZXIsIHBsYWNlaG9sZGVyOiBwcm9wcy5wbGFjZWhvbGRlciwgZm9yY2VSZWZyZXNoOiBwcm9wcy5mb3JjZVJlZnJlc2gsIGNhc2VTZW5zaXRpdmU6IHByb3BzLmNhc2VTZW5zaXRpdmUgfSkpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlYXJjaC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBQYXRoRXh0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgZWFjaCwgZmluZCB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCB7IFByb21pc2VEZWxlZ2F0ZSwgVVVJRCB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBEaWFsb2csIHNob3dEaWFsb2cgfSBmcm9tICcuL2RpYWxvZyc7XG4vKipcbiAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGZvciBhIHNlc3Npb24gY29udGV4dCBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXNzaW9uQ29udGV4dCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IHNlc3Npb24gY29udGV4dC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgdGhpcy5fcGF0aCA9ICcnO1xuICAgICAgICB0aGlzLl9uYW1lID0gJyc7XG4gICAgICAgIHRoaXMuX3R5cGUgPSAnJztcbiAgICAgICAgdGhpcy5fcHJldktlcm5lbE5hbWUgPSAnJztcbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9kaXNwb3NlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX3Nlc3Npb24gPSBudWxsO1xuICAgICAgICB0aGlzLl9yZWFkeSA9IG5ldyBQcm9taXNlRGVsZWdhdGUoKTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXRTdGFydGVkID0gbmV3IFByb21pc2VEZWxlZ2F0ZSgpO1xuICAgICAgICB0aGlzLl9pbml0UHJvbWlzZSA9IG5ldyBQcm9taXNlRGVsZWdhdGUoKTtcbiAgICAgICAgdGhpcy5faXNSZWFkeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1Rlcm1pbmF0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzUmVzdGFydGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9rZXJuZWxDaGFuZ2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fc2Vzc2lvbkNoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9zdGF0dXNDaGFuZ2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGlvblN0YXR1c0NoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9wZW5kaW5nSW5wdXQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW9wdWJNZXNzYWdlID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fdW5oYW5kbGVkTWVzc2FnZSA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX3Byb3BlcnR5Q2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2RpYWxvZyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2J1c3lEaXNwb3NhYmxlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGVuZGluZ0tlcm5lbE5hbWUgPSAnJztcbiAgICAgICAgdGhpcy5fcGVuZGluZ1Nlc3Npb25SZXF1ZXN0ID0gJyc7XG4gICAgICAgIHRoaXMuc2Vzc2lvbk1hbmFnZXIgPSBvcHRpb25zLnNlc3Npb25NYW5hZ2VyO1xuICAgICAgICB0aGlzLnNwZWNzTWFuYWdlciA9IG9wdGlvbnMuc3BlY3NNYW5hZ2VyO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSBvcHRpb25zLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMuX3RyYW5zID0gdGhpcy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgdGhpcy5fcGF0aCA9IChfYSA9IG9wdGlvbnMucGF0aCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogVVVJRC51dWlkNCgpO1xuICAgICAgICB0aGlzLl90eXBlID0gKF9iID0gb3B0aW9ucy50eXBlKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJztcbiAgICAgICAgdGhpcy5fbmFtZSA9IChfYyA9IG9wdGlvbnMubmFtZSkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogJyc7XG4gICAgICAgIHRoaXMuX3NldEJ1c3kgPSBvcHRpb25zLnNldEJ1c3k7XG4gICAgICAgIHRoaXMuX2tlcm5lbFByZWZlcmVuY2UgPSAoX2QgPSBvcHRpb25zLmtlcm5lbFByZWZlcmVuY2UpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IHt9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBzZXNzaW9uIGNvbm5lY3Rpb24uXG4gICAgICovXG4gICAgZ2V0IHNlc3Npb24oKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuX3Nlc3Npb24pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzZXNzaW9uIHBhdGguXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVHlwaWNhbGx5IGAuc2Vzc2lvbi5wYXRoYCBzaG91bGQgYmUgdXNlZC4gVGhpcyBhdHRyaWJ1dGUgaXMgdXNlZnVsIGlmXG4gICAgICogdGhlcmUgaXMgbm8gY3VycmVudCBzZXNzaW9uLlxuICAgICAqL1xuICAgIGdldCBwYXRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHNlc3Npb24gdHlwZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUeXBpY2FsbHkgYC5zZXNzaW9uLnR5cGVgIHNob3VsZCBiZSB1c2VkLiBUaGlzIGF0dHJpYnV0ZSBpcyB1c2VmdWwgaWZcbiAgICAgKiB0aGVyZSBpcyBubyBjdXJyZW50IHNlc3Npb24uXG4gICAgICovXG4gICAgZ2V0IHR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgc2Vzc2lvbiBuYW1lLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFR5cGljYWxseSBgLnNlc3Npb24ubmFtZWAgc2hvdWxkIGJlIHVzZWQuIFRoaXMgYXR0cmlidXRlIGlzIHVzZWZ1bCBpZlxuICAgICAqIHRoZXJlIGlzIG5vIGN1cnJlbnQgc2Vzc2lvbi5cbiAgICAgKi9cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUga2VybmVsIGNvbm5lY3Rpb24gY2hhbmdlcywgcHJveGllZCBmcm9tIHRoZSBzZXNzaW9uIGNvbm5lY3Rpb24uXG4gICAgICovXG4gICAgZ2V0IGtlcm5lbENoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9rZXJuZWxDaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIHNlc3Npb24gY29ubmVjdGlvbiBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGdldCBzZXNzaW9uQ2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nlc3Npb25DaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIGtlcm5lbCBzdGF0dXMgY2hhbmdlcywgcHJveGllZCBmcm9tIHRoZSBrZXJuZWwuXG4gICAgICovXG4gICAgZ2V0IHN0YXR1c0NoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0dXNDaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiB0aGUgc2Vzc2lvbiBoYXMgZW5kaW5nIGlucHV0LCBwcm94aWVkIGZyb20gdGhlIGtlcm5lbC5cbiAgICAgKi9cbiAgICBnZXQgcGVuZGluZ0lucHV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGVuZGluZ0lucHV0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIGtlcm5lbCBzdGF0dXMgY2hhbmdlcywgcHJveGllZCBmcm9tIHRoZSBrZXJuZWwuXG4gICAgICovXG4gICAgZ2V0IGNvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29ubmVjdGlvblN0YXR1c0NoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgZm9yIGlvcHViIGtlcm5lbCBtZXNzYWdlcywgcHJveGllZCBmcm9tIHRoZSBrZXJuZWwuXG4gICAgICovXG4gICAgZ2V0IGlvcHViTWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lvcHViTWVzc2FnZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCBmb3IgYW4gdW5oYW5kbGVkIGtlcm5lbCBtZXNzYWdlLCBwcm94aWVkIGZyb20gdGhlIGtlcm5lbC5cbiAgICAgKi9cbiAgICBnZXQgdW5oYW5kbGVkTWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VuaGFuZGxlZE1lc3NhZ2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiBhIHNlc3Npb24gcHJvcGVydHkgY2hhbmdlcywgcHJveGllZCBmcm9tIHRoZSBjdXJyZW50IHNlc3Npb24uXG4gICAgICovXG4gICAgZ2V0IHByb3BlcnR5Q2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnR5Q2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGtlcm5lbCBwcmVmZXJlbmNlIG9mIHRoaXMgY2xpZW50IHNlc3Npb24uXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIHVzZWQgd2hlbiBzZWxlY3RpbmcgYSBuZXcga2VybmVsLCBhbmQgc2hvdWxkIHJlZmxlY3QgdGhlIHNvcnQgb2ZcbiAgICAgKiBrZXJuZWwgdGhlIGFjdGl2aXR5IHByZWZlcnMuXG4gICAgICovXG4gICAgZ2V0IGtlcm5lbFByZWZlcmVuY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9rZXJuZWxQcmVmZXJlbmNlO1xuICAgIH1cbiAgICBzZXQga2VybmVsUHJlZmVyZW5jZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9rZXJuZWxQcmVmZXJlbmNlID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGNvbnRleHQgaXMgcmVhZHkuXG4gICAgICovXG4gICAgZ2V0IGlzUmVhZHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1JlYWR5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgd2hlbiB0aGUgY29udGV4dCBpcyByZWFkeS5cbiAgICAgKi9cbiAgICBnZXQgcmVhZHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFkeS5wcm9taXNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBjb250ZXh0IGlzIHRlcm1pbmF0aW5nLlxuICAgICAqL1xuICAgIGdldCBpc1Rlcm1pbmF0aW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNUZXJtaW5hdGluZztcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgY29udGV4dCBpcyByZXN0YXJ0aW5nLlxuICAgICAqL1xuICAgIGdldCBpc1Jlc3RhcnRpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1Jlc3RhcnRpbmc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGtlcm5lbCBpcyBcIk5vIEtlcm5lbFwiIG9yIG5vdC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBBcyB0aGUgZGlzcGxheWVkIG5hbWUgaXMgdHJhbnNsYXRlZCwgdGhpcyBjYW4gYmUgdXNlZCBkaXJlY3RseS5cbiAgICAgKi9cbiAgICBnZXQgaGFzTm9LZXJuZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmtlcm5lbERpc3BsYXlOYW1lID09PSB0aGlzLm5vS2VybmVsTmFtZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGRpc3BsYXkgbmFtZSBvZiB0aGUgY3VycmVudCBrZXJuZWwsIG9yIGEgc2Vuc2libGUgYWx0ZXJuYXRpdmUuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGhhdmUgYSBjb25zaXN0ZW50IHNlbnNpYmxlIG5hbWUgZm9yIHRoZVxuICAgICAqIGtlcm5lbC5cbiAgICAgKi9cbiAgICBnZXQga2VybmVsRGlzcGxheU5hbWUoKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaztcbiAgICAgICAgY29uc3Qga2VybmVsID0gKF9hID0gdGhpcy5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eua2VybmVsO1xuICAgICAgICBpZiAodGhpcy5fcGVuZGluZ0tlcm5lbE5hbWUgPT09IHRoaXMubm9LZXJuZWxOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub0tlcm5lbE5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFrZXJuZWwgJiZcbiAgICAgICAgICAgICF0aGlzLmlzUmVhZHkgJiZcbiAgICAgICAgICAgIHRoaXMua2VybmVsUHJlZmVyZW5jZS5jYW5TdGFydCAhPT0gZmFsc2UgJiZcbiAgICAgICAgICAgIHRoaXMua2VybmVsUHJlZmVyZW5jZS5zaG91bGRTdGFydCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGxldCBuYW1lID0gdGhpcy5fcGVuZGluZ0tlcm5lbE5hbWUgfHxcbiAgICAgICAgICAgICAgICBTZXNzaW9uQ29udGV4dC5nZXREZWZhdWx0S2VybmVsKHtcbiAgICAgICAgICAgICAgICAgICAgc3BlY3M6IHRoaXMuc3BlY3NNYW5hZ2VyLnNwZWNzLFxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uczogdGhpcy5zZXNzaW9uTWFuYWdlci5ydW5uaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHByZWZlcmVuY2U6IHRoaXMua2VybmVsUHJlZmVyZW5jZVxuICAgICAgICAgICAgICAgIH0pIHx8XG4gICAgICAgICAgICAgICAgJyc7XG4gICAgICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgICAgIG5hbWUgPSAoX2QgPSAoX2MgPSAoX2IgPSB0aGlzLnNwZWNzTWFuYWdlci5zcGVjcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmtlcm5lbHNwZWNzW25hbWVdKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZGlzcGxheV9uYW1lKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiBuYW1lO1xuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9LZXJuZWxOYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9wZW5kaW5nS2VybmVsTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuICgoX2cgPSAoX2YgPSAoX2UgPSB0aGlzLnNwZWNzTWFuYWdlci5zcGVjcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLmtlcm5lbHNwZWNzW3RoaXMuX3BlbmRpbmdLZXJuZWxOYW1lXSkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLmRpc3BsYXlfbmFtZSkgIT09IG51bGwgJiYgX2cgIT09IHZvaWQgMCA/IF9nIDogdGhpcy5fcGVuZGluZ0tlcm5lbE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgha2VybmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub0tlcm5lbE5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICgoX2sgPSAoX2ogPSAoX2ggPSB0aGlzLnNwZWNzTWFuYWdlci5zcGVjcykgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oLmtlcm5lbHNwZWNzW2tlcm5lbC5uYW1lXSkgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qLmRpc3BsYXlfbmFtZSkgIT09IG51bGwgJiYgX2sgIT09IHZvaWQgMCA/IF9rIDoga2VybmVsLm5hbWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNlbnNpYmxlIHN0YXR1cyB0byBkaXNwbGF5XG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBjb21iaW5lcyB0aGUgc3RhdHVzIGFuZCBjb25uZWN0aW9uIHN0YXR1cyBpbnRvIGEgc2luZ2xlIHN0YXR1cyBmb3JcbiAgICAgKiB0aGUgdXNlci5cbiAgICAgKi9cbiAgICBnZXQga2VybmVsRGlzcGxheVN0YXR1cygpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3Qga2VybmVsID0gKF9hID0gdGhpcy5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eua2VybmVsO1xuICAgICAgICBpZiAodGhpcy5faXNUZXJtaW5hdGluZykge1xuICAgICAgICAgICAgcmV0dXJuICd0ZXJtaW5hdGluZyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2lzUmVzdGFydGluZykge1xuICAgICAgICAgICAgcmV0dXJuICdyZXN0YXJ0aW5nJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcGVuZGluZ0tlcm5lbE5hbWUgPT09IHRoaXMubm9LZXJuZWxOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgICAgICB9XG4gICAgICAgIGlmICgha2VybmVsICYmIHRoaXMuX3BlbmRpbmdLZXJuZWxOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2luaXRpYWxpemluZyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFrZXJuZWwgJiZcbiAgICAgICAgICAgICF0aGlzLmlzUmVhZHkgJiZcbiAgICAgICAgICAgIHRoaXMua2VybmVsUHJlZmVyZW5jZS5jYW5TdGFydCAhPT0gZmFsc2UgJiZcbiAgICAgICAgICAgIHRoaXMua2VybmVsUHJlZmVyZW5jZS5zaG91bGRTdGFydCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiAnaW5pdGlhbGl6aW5nJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKChfYiA9ICgoa2VybmVsID09PSBudWxsIHx8IGtlcm5lbCA9PT0gdm9pZCAwID8gdm9pZCAwIDoga2VybmVsLmNvbm5lY3Rpb25TdGF0dXMpID09PSAnY29ubmVjdGVkJ1xuICAgICAgICAgICAgPyBrZXJuZWwgPT09IG51bGwgfHwga2VybmVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBrZXJuZWwuc3RhdHVzIDoga2VybmVsID09PSBudWxsIHx8IGtlcm5lbCA9PT0gdm9pZCAwID8gdm9pZCAwIDoga2VybmVsLmNvbm5lY3Rpb25TdGF0dXMpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAndW5rbm93bicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgcHJldmlvdXNseSBzdGFydGVkIGtlcm5lbC5cbiAgICAgKi9cbiAgICBnZXQgcHJldktlcm5lbE5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcmV2S2VybmVsTmFtZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIHRoZSBjb250ZXh0IGlzIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBpc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEaXNwb3NlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBwb2xsIGlzIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBkaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3Bvc2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNvbnN0YW50IGRpc3BsYXllZCBuYW1lIGZvciBcIk5vIEtlcm5lbFwiXG4gICAgICovXG4gICAgZ2V0IG5vS2VybmVsTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zLl9fKCdObyBLZXJuZWwnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIGNvbnRleHQuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZGlzcG9zZWQuZW1pdCgpO1xuICAgICAgICBpZiAodGhpcy5fc2Vzc2lvbikge1xuICAgICAgICAgICAgaWYgKHRoaXMua2VybmVsUHJlZmVyZW5jZS5zaHV0ZG93bk9uRGlzcG9zZSkge1xuICAgICAgICAgICAgICAgIC8vIEZpcmUgYW5kIGZvcmdldCB0aGUgc2Vzc2lvbiBzaHV0ZG93biByZXF1ZXN0XG4gICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uTWFuYWdlci5zaHV0ZG93bih0aGlzLl9zZXNzaW9uLmlkKS5jYXRjaChyZWFzb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBLZXJuZWwgbm90IHNodXQgZG93biAke3JlYXNvbn1gKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERpc3Bvc2UgdGhlIHNlc3Npb24gY29ubmVjdGlvblxuICAgICAgICAgICAgdGhpcy5fc2Vzc2lvbi5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl9zZXNzaW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZGlhbG9nKSB7XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9idXN5RGlzcG9zYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fYnVzeURpc3Bvc2FibGUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5fYnVzeURpc3Bvc2FibGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIFNpZ25hbC5jbGVhckRhdGEodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc3RhcnQgdGhlIGN1cnJlbnQgS2VybmVsLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUga2VybmVsIGlzIHJlc3RhcnRlZC5cbiAgICAgKi9cbiAgICBhc3luYyByZXN0YXJ0S2VybmVsKCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcbiAgICAgICAgY29uc3Qga2VybmVsID0gKChfYSA9IHRoaXMuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmtlcm5lbCkgfHwgbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX2lzUmVzdGFydGluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzUmVzdGFydGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuX2lzUmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc3RhdHVzQ2hhbmdlZC5lbWl0KCdyZXN0YXJ0aW5nJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCAoKF9jID0gKF9iID0gdGhpcy5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iua2VybmVsKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucmVzdGFydCgpKTtcbiAgICAgICAgICAgIHRoaXMuX2lzUmVhZHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzUmVzdGFydGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zdGF0dXNDaGFuZ2VkLmVtaXQoKChfZSA9IChfZCA9IHRoaXMuc2Vzc2lvbikgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmtlcm5lbCkgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnN0YXR1cykgfHwgJ3Vua25vd24nKTtcbiAgICAgICAgdGhpcy5fa2VybmVsQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgIG5hbWU6ICdrZXJuZWwnLFxuICAgICAgICAgICAgb2xkVmFsdWU6IGtlcm5lbCxcbiAgICAgICAgICAgIG5ld1ZhbHVlOiAoKF9mID0gdGhpcy5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Yua2VybmVsKSB8fCBudWxsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGFuZ2UgdGhlIGN1cnJlbnQga2VybmVsIGFzc29jaWF0ZWQgd2l0aCB0aGUgc2Vzc2lvbi5cbiAgICAgKi9cbiAgICBhc3luYyBjaGFuZ2VLZXJuZWwob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRGlzcG9zZWQnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXYWl0IGZvciB0aGUgaW5pdGlhbGl6YXRpb24gbWV0aG9kIHRvIHRyeVxuICAgICAgICAvLyBhbmQgc3RhcnQgaXRzIGtlcm5lbCBmaXJzdCB0byBlbnN1cmUgY29uc2lzdGVudFxuICAgICAgICAvLyBvcmRlcmluZy5cbiAgICAgICAgYXdhaXQgdGhpcy5faW5pdFN0YXJ0ZWQucHJvbWlzZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYW5nZUtlcm5lbChvcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogS2lsbCB0aGUga2VybmVsIGFuZCBzaHV0ZG93biB0aGUgc2Vzc2lvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNlc3Npb24gaXMgc2h1dCBkb3duLlxuICAgICAqL1xuICAgIGFzeW5jIHNodXRkb3duKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkIHx8ICF0aGlzLl9pbml0aWFsaXppbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLl9pbml0U3RhcnRlZC5wcm9taXNlO1xuICAgICAgICB0aGlzLl9wZW5kaW5nU2Vzc2lvblJlcXVlc3QgPSAnJztcbiAgICAgICAgdGhpcy5fcGVuZGluZ0tlcm5lbE5hbWUgPSB0aGlzLm5vS2VybmVsTmFtZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NodXRkb3duU2Vzc2lvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBzZXNzaW9uIGNvbnRleHRcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggd2hldGhlciB0byBhc2sgdGhlIHVzZXIgdG8gc2VsZWN0IGEga2VybmVsLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIElmIGEgc2VydmVyIHNlc3Npb24gZXhpc3RzIG9uIHRoZSBjdXJyZW50IHBhdGgsIHdlIHdpbGwgY29ubmVjdCB0byBpdC5cbiAgICAgKiBJZiBwcmVmZXJlbmNlcyBpbmNsdWRlIGRpc2FibGluZyBgY2FuU3RhcnRgIG9yIGBzaG91bGRTdGFydGAsIG5vXG4gICAgICogc2VydmVyIHNlc3Npb24gd2lsbCBiZSBzdGFydGVkLlxuICAgICAqIElmIGEga2VybmVsIGlkIGlzIGdpdmVuLCB3ZSBhdHRlbXB0IHRvIHN0YXJ0IGEgc2Vzc2lvbiB3aXRoIHRoYXQgaWQuXG4gICAgICogSWYgYSBkZWZhdWx0IGtlcm5lbCBpcyBhdmFpbGFibGUsIHdlIGNvbm5lY3QgdG8gaXQuXG4gICAgICogT3RoZXJ3aXNlIHdlIGFzayB0aGUgdXNlciB0byBzZWxlY3QgYSBrZXJuZWwuXG4gICAgICovXG4gICAgYXN5bmMgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luaXRpYWxpemluZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRQcm9taXNlLnByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6aW5nID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgbmVlZHNTZWxlY3Rpb24gPSBhd2FpdCB0aGlzLl9pbml0aWFsaXplKCk7XG4gICAgICAgIGlmICghbmVlZHNTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2lzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fcmVhZHkucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fcGVuZGluZ1Nlc3Npb25SZXF1ZXN0KSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0U3RhcnRlZC5yZXNvbHZlKHZvaWQgMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW5pdFByb21pc2UucmVzb2x2ZShuZWVkc1NlbGVjdGlvbik7XG4gICAgICAgIHJldHVybiBuZWVkc1NlbGVjdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5uZXIgaW5pdGlhbGl6ZSBmdW5jdGlvbiB0aGF0IGRvZXNuJ3QgaGFuZGxlIHByb21pc2VzLlxuICAgICAqIFRoaXMgbWFrZXMgaXQgZWFzaWVyIHRvIGNvbnNvbGlkYXRlIHByb21pc2UgaGFuZGxpbmcgbG9naWMuXG4gICAgICovXG4gICAgYXN5bmMgX2luaXRpYWxpemUoKSB7XG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLnNlc3Npb25NYW5hZ2VyO1xuICAgICAgICBhd2FpdCBtYW5hZ2VyLnJlYWR5O1xuICAgICAgICBhd2FpdCBtYW5hZ2VyLnJlZnJlc2hSdW5uaW5nKCk7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gZmluZChtYW5hZ2VyLnJ1bm5pbmcoKSwgaXRlbSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5wYXRoID09PSB0aGlzLl9wYXRoO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlc3Npb24gPSBtYW5hZ2VyLmNvbm5lY3RUbyh7IG1vZGVsIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZU5ld1Nlc3Npb24oc2Vzc2lvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdm9pZCB0aGlzLl9oYW5kbGVTZXNzaW9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fc3RhcnRJZk5lY2Vzc2FyeSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaHV0IGRvd24gdGhlIGN1cnJlbnQgc2Vzc2lvbi5cbiAgICAgKi9cbiAgICBhc3luYyBfc2h1dGRvd25TZXNzaW9uKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHNlc3Npb24gPSB0aGlzLl9zZXNzaW9uO1xuICAgICAgICAvLyBDYXB0dXJlIHN0YXJ0aW5nIHZhbHVlcyBpbiBjYXNlIGFuIGVycm9yIGlzIHJhaXNlZC5cbiAgICAgICAgY29uc3QgaXNUZXJtaW5hdGluZyA9IHRoaXMuX2lzVGVybWluYXRpbmc7XG4gICAgICAgIGNvbnN0IGlzUmVhZHkgPSB0aGlzLl9pc1JlYWR5O1xuICAgICAgICB0aGlzLl9pc1Rlcm1pbmF0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5faXNSZWFkeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zdGF0dXNDaGFuZ2VkLmVtaXQoJ3Rlcm1pbmF0aW5nJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCAoc2Vzc2lvbiA9PT0gbnVsbCB8fCBzZXNzaW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXNzaW9uLnNodXRkb3duKCkpO1xuICAgICAgICAgICAgdGhpcy5faXNUZXJtaW5hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgc2Vzc2lvbiA9PT0gbnVsbCB8fCBzZXNzaW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXNzaW9uLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX3Nlc3Npb24gPSBudWxsO1xuICAgICAgICAgICAgY29uc3Qga2VybmVsID0gKHNlc3Npb24gPT09IG51bGwgfHwgc2Vzc2lvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2Vzc2lvbi5rZXJuZWwpIHx8IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zdGF0dXNDaGFuZ2VkLmVtaXQoJ3Vua25vd24nKTtcbiAgICAgICAgICAgIHRoaXMuX2tlcm5lbENoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2tlcm5lbCcsXG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IGtlcm5lbCxcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogbnVsbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9zZXNzaW9uQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnc2Vzc2lvbicsXG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IHNlc3Npb24sXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IG51bGxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzVGVybWluYXRpbmcgPSBpc1Rlcm1pbmF0aW5nO1xuICAgICAgICAgICAgdGhpcy5faXNSZWFkeSA9IGlzUmVhZHk7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSAoX2EgPSBzZXNzaW9uID09PSBudWxsIHx8IHNlc3Npb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlc3Npb24ua2VybmVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc3RhdHVzO1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdHVzQ2hhbmdlZC5lbWl0KCd1bmtub3duJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0dXNDaGFuZ2VkLmVtaXQoc3RhdHVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0IHRoZSBzZXNzaW9uIGlmIG5lY2Vzc2FyeS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFdoZXRoZXIgdG8gYXNrIHRoZSB1c2VyIHRvIHBpY2sgYSBrZXJuZWwuXG4gICAgICovXG4gICAgYXN5bmMgX3N0YXJ0SWZOZWNlc3NhcnkoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgcHJlZmVyZW5jZSA9IHRoaXMua2VybmVsUHJlZmVyZW5jZTtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCB8fCAoKF9hID0gdGhpcy5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eua2VybmVsKSB8fFxuICAgICAgICAgICAgcHJlZmVyZW5jZS5zaG91bGRTdGFydCA9PT0gZmFsc2UgfHxcbiAgICAgICAgICAgIHByZWZlcmVuY2UuY2FuU3RhcnQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAvLyBOb3QgbmVjZXNzYXJ5IHRvIHN0YXJ0IGEga2VybmVsXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9wdGlvbnM7XG4gICAgICAgIGlmIChwcmVmZXJlbmNlLmlkKSB7XG4gICAgICAgICAgICBvcHRpb25zID0geyBpZDogcHJlZmVyZW5jZS5pZCB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IFNlc3Npb25Db250ZXh0LmdldERlZmF1bHRLZXJuZWwoe1xuICAgICAgICAgICAgICAgIHNwZWNzOiB0aGlzLnNwZWNzTWFuYWdlci5zcGVjcyxcbiAgICAgICAgICAgICAgICBzZXNzaW9uczogdGhpcy5zZXNzaW9uTWFuYWdlci5ydW5uaW5nKCksXG4gICAgICAgICAgICAgICAgcHJlZmVyZW5jZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7IG5hbWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9jaGFuZ2VLZXJuZWwob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIC8qIG5vLW9wICovXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWx3YXlzIGZhbGwgYmFjayB0byBzZWxlY3RpbmcgYSBrZXJuZWxcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoYW5nZSB0aGUga2VybmVsLlxuICAgICAqL1xuICAgIGFzeW5jIF9jaGFuZ2VLZXJuZWwobW9kZWwgPSB7fSwgaXNJbml0ID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKG1vZGVsLm5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdLZXJuZWxOYW1lID0gbW9kZWwubmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3Nlc3Npb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2tlcm5lbENoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2tlcm5lbCcsXG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IG51bGwsXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IG51bGxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEd1YXJhbnRlZSB0aGF0IHRoZSBpbml0aWFsaXplZCBrZXJuZWxcbiAgICAgICAgLy8gd2lsbCBiZSBzdGFydGVkIGZpcnN0LlxuICAgICAgICBpZiAoIXRoaXMuX3BlbmRpbmdTZXNzaW9uUmVxdWVzdCkge1xuICAgICAgICAgICAgdGhpcy5faW5pdFN0YXJ0ZWQucmVzb2x2ZSh2b2lkIDApO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIGFscmVhZHkgaGF2ZSBhIHNlc3Npb24sIGp1c3QgY2hhbmdlIHRoZSBrZXJuZWwuXG4gICAgICAgIGlmICh0aGlzLl9zZXNzaW9uICYmICF0aGlzLl9pc1Rlcm1pbmF0aW5nKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3Nlc3Npb24uY2hhbmdlS2VybmVsKG1vZGVsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbi5rZXJuZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdm9pZCB0aGlzLl9oYW5kbGVTZXNzaW9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXNlIGEgVVVJRCBmb3IgdGhlIHBhdGggdG8gb3ZlcmNvbWUgYSByYWNlIGNvbmRpdGlvbiBvbiB0aGUgc2VydmVyXG4gICAgICAgIC8vIHdoZXJlIGl0IHdpbGwgcmUtdXNlIGEgc2Vzc2lvbiBmb3IgYSBnaXZlbiBwYXRoIGJ1dCBvbmx5IGFmdGVyXG4gICAgICAgIC8vIHRoZSBrZXJuZWwgZmluaXNoZXMgc3RhcnRpbmcuXG4gICAgICAgIC8vIFdlIGxhdGVyIHN3aXRjaCB0byB0aGUgcmVhbCBwYXRoIGJlbG93LlxuICAgICAgICAvLyBVc2UgdGhlIGNvcnJlY3QgZGlyZWN0b3J5IHNvIHRoZSBrZXJuZWwgd2lsbCBiZSBzdGFydGVkIGluIHRoYXQgZGlyZWN0b3J5LlxuICAgICAgICBjb25zdCBkaXJOYW1lID0gUGF0aEV4dC5kaXJuYW1lKHRoaXMuX3BhdGgpO1xuICAgICAgICBjb25zdCByZXF1ZXN0SWQgPSAodGhpcy5fcGVuZGluZ1Nlc3Npb25SZXF1ZXN0ID0gUGF0aEV4dC5qb2luKGRpck5hbWUsIFVVSUQudXVpZDQoKSkpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdHVzQ2hhbmdlZC5lbWl0KCdzdGFydGluZycpO1xuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IHRoaXMuc2Vzc2lvbk1hbmFnZXIuc3RhcnROZXcoe1xuICAgICAgICAgICAgICAgIHBhdGg6IHJlcXVlc3RJZCxcbiAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl90eXBlLFxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuX25hbWUsXG4gICAgICAgICAgICAgICAga2VybmVsOiBtb2RlbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBIYW5kbGUgYSBwcmVlbXB0LlxuICAgICAgICAgICAgaWYgKHRoaXMuX3BlbmRpbmdTZXNzaW9uUmVxdWVzdCAhPT0gc2Vzc2lvbi5wYXRoKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2Vzc2lvbi5zaHV0ZG93bigpO1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2hhbmdlIHRvIHRoZSByZWFsIHBhdGguXG4gICAgICAgICAgICBhd2FpdCBzZXNzaW9uLnNldFBhdGgodGhpcy5fcGF0aCk7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIG5hbWUgaW4gY2FzZSBpdCBoYXMgY2hhbmdlZCBzaW5jZSB3ZSBsYXVuY2hlZCB0aGUgc2Vzc2lvbi5cbiAgICAgICAgICAgIGF3YWl0IHNlc3Npb24uc2V0TmFtZSh0aGlzLl9uYW1lKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZXNzaW9uICYmICF0aGlzLl9pc1Rlcm1pbmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fc2h1dGRvd25TZXNzaW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlTmV3U2Vzc2lvbihzZXNzaW9uKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB2b2lkIHRoaXMuX2hhbmRsZVNlc3Npb25FcnJvcihlcnIpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIG5ldyBzZXNzaW9uIG9iamVjdC5cbiAgICAgKi9cbiAgICBfaGFuZGxlTmV3U2Vzc2lvbihzZXNzaW9uKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignRGlzcG9zZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2lzUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fcmVhZHkucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9zZXNzaW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXNzaW9uLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXNzaW9uID0gc2Vzc2lvbjtcbiAgICAgICAgdGhpcy5fcGVuZGluZ0tlcm5lbE5hbWUgPSAnJztcbiAgICAgICAgaWYgKHNlc3Npb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZLZXJuZWxOYW1lID0gKF9iID0gKF9hID0gc2Vzc2lvbi5rZXJuZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJztcbiAgICAgICAgICAgIHNlc3Npb24uZGlzcG9zZWQuY29ubmVjdCh0aGlzLl9vblNlc3Npb25EaXNwb3NlZCwgdGhpcyk7XG4gICAgICAgICAgICBzZXNzaW9uLnByb3BlcnR5Q2hhbmdlZC5jb25uZWN0KHRoaXMuX29uUHJvcGVydHlDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgICAgIHNlc3Npb24ua2VybmVsQ2hhbmdlZC5jb25uZWN0KHRoaXMuX29uS2VybmVsQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgICAgICBzZXNzaW9uLnN0YXR1c0NoYW5nZWQuY29ubmVjdCh0aGlzLl9vblN0YXR1c0NoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgc2Vzc2lvbi5jb25uZWN0aW9uU3RhdHVzQ2hhbmdlZC5jb25uZWN0KHRoaXMuX29uQ29ubmVjdGlvblN0YXR1c0NoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgc2Vzc2lvbi5wZW5kaW5nSW5wdXQuY29ubmVjdCh0aGlzLl9vblBlbmRpbmdJbnB1dCwgdGhpcyk7XG4gICAgICAgICAgICBzZXNzaW9uLmlvcHViTWVzc2FnZS5jb25uZWN0KHRoaXMuX29uSW9wdWJNZXNzYWdlLCB0aGlzKTtcbiAgICAgICAgICAgIHNlc3Npb24udW5oYW5kbGVkTWVzc2FnZS5jb25uZWN0KHRoaXMuX29uVW5oYW5kbGVkTWVzc2FnZSwgdGhpcyk7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi5wYXRoICE9PSB0aGlzLl9wYXRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25Qcm9wZXJ0eUNoYW5nZWQoc2Vzc2lvbiwgJ3BhdGgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZXNzaW9uLm5hbWUgIT09IHRoaXMuX25hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vblByb3BlcnR5Q2hhbmdlZChzZXNzaW9uLCAnbmFtZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlc3Npb24udHlwZSAhPT0gdGhpcy5fdHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29uUHJvcGVydHlDaGFuZ2VkKHNlc3Npb24sICd0eXBlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQW55IGV4aXN0aW5nIHNlc3Npb24va2VybmVsIGNvbm5lY3Rpb24gd2FzIGRpc3Bvc2VkIGFib3ZlIHdoZW4gdGhlIHNlc3Npb24gd2FzXG4gICAgICAgIC8vIGRpc3Bvc2VkLCBzbyB0aGUgb2xkVmFsdWUgc2hvdWxkIGJlIG51bGwuXG4gICAgICAgIHRoaXMuX3Nlc3Npb25DaGFuZ2VkLmVtaXQoe1xuICAgICAgICAgICAgbmFtZTogJ3Nlc3Npb24nLFxuICAgICAgICAgICAgb2xkVmFsdWU6IG51bGwsXG4gICAgICAgICAgICBuZXdWYWx1ZTogc2Vzc2lvblxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fa2VybmVsQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgIG9sZFZhbHVlOiBudWxsLFxuICAgICAgICAgICAgbmV3VmFsdWU6IChzZXNzaW9uID09PSBudWxsIHx8IHNlc3Npb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlc3Npb24ua2VybmVsKSB8fCBudWxsLFxuICAgICAgICAgICAgbmFtZTogJ2tlcm5lbCdcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3N0YXR1c0NoYW5nZWQuZW1pdCgoKF9jID0gc2Vzc2lvbiA9PT0gbnVsbCB8fCBzZXNzaW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXNzaW9uLmtlcm5lbCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnN0YXR1cykgfHwgJ3Vua25vd24nKTtcbiAgICAgICAgcmV0dXJuIChzZXNzaW9uID09PSBudWxsIHx8IHNlc3Npb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlc3Npb24ua2VybmVsKSB8fCBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYW4gZXJyb3IgaW4gc2Vzc2lvbiBzdGFydHVwLlxuICAgICAqL1xuICAgIGFzeW5jIF9oYW5kbGVTZXNzaW9uRXJyb3IoZXJyKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZU5ld1Nlc3Npb24obnVsbCk7XG4gICAgICAgIGxldCB0cmFjZWJhY2sgPSAnJztcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRyYWNlYmFjayA9IGVyci50cmFjZWJhY2s7XG4gICAgICAgICAgICBtZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gbm8tb3BcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLl9kaXNwbGF5S2VybmVsRXJyb3IobWVzc2FnZSwgdHJhY2ViYWNrKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcGxheSBrZXJuZWwgZXJyb3JcbiAgICAgKi9cbiAgICBhc3luYyBfZGlzcGxheUtlcm5lbEVycm9yKG1lc3NhZ2UsIHRyYWNlYmFjaykge1xuICAgICAgICBjb25zdCBib2R5ID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgIG1lc3NhZ2UgJiYgUmVhY3QuY3JlYXRlRWxlbWVudChcInByZVwiLCBudWxsLCBtZXNzYWdlKSxcbiAgICAgICAgICAgIHRyYWNlYmFjayAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRldGFpbHNcIiwgeyBjbGFzc05hbWU6IFwianAtbW9kLXdpZGVcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwcmVcIiwgbnVsbCwgdHJhY2ViYWNrKSkpKSk7XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9ICh0aGlzLl9kaWFsb2cgPSBuZXcgRGlhbG9nKHtcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLl90cmFucy5fXygnRXJyb3IgU3RhcnRpbmcgS2VybmVsJyksXG4gICAgICAgICAgICBib2R5LFxuICAgICAgICAgICAgYnV0dG9uczogW0RpYWxvZy5va0J1dHRvbigpXVxuICAgICAgICB9KSk7XG4gICAgICAgIGF3YWl0IGRpYWxvZy5sYXVuY2goKTtcbiAgICAgICAgdGhpcy5fZGlhbG9nID0gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgc2Vzc2lvbiB0ZXJtaW5hdGlvbi5cbiAgICAgKi9cbiAgICBfb25TZXNzaW9uRGlzcG9zZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zZXNzaW9uKSB7XG4gICAgICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuX3Nlc3Npb247XG4gICAgICAgICAgICB0aGlzLl9zZXNzaW9uID0gbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5fc2Vzc2lvbjtcbiAgICAgICAgICAgIHRoaXMuX3Nlc3Npb25DaGFuZ2VkLmVtaXQoeyBuYW1lOiAnc2Vzc2lvbicsIG9sZFZhbHVlLCBuZXdWYWx1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gYSBzZXNzaW9uIHByb3BlcnR5LlxuICAgICAqL1xuICAgIF9vblByb3BlcnR5Q2hhbmdlZChzZW5kZXIsIHByb3BlcnR5KSB7XG4gICAgICAgIHN3aXRjaCAocHJvcGVydHkpIHtcbiAgICAgICAgICAgIGNhc2UgJ3BhdGgnOlxuICAgICAgICAgICAgICAgIHRoaXMuX3BhdGggPSBzZW5kZXIucGF0aDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ25hbWUnOlxuICAgICAgICAgICAgICAgIHRoaXMuX25hbWUgPSBzZW5kZXIubmFtZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3R5cGUnOlxuICAgICAgICAgICAgICAgIHRoaXMuX3R5cGUgPSBzZW5kZXIudHlwZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnJlY29nbml6ZWQgcHJvcGVydHkgJHtwcm9wZXJ0eX1gKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcm9wZXJ0eUNoYW5nZWQuZW1pdChwcm9wZXJ0eSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUga2VybmVsLlxuICAgICAqL1xuICAgIF9vbktlcm5lbENoYW5nZWQoc2VuZGVyLCBhcmdzKSB7XG4gICAgICAgIHRoaXMuX2tlcm5lbENoYW5nZWQuZW1pdChhcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBzZXNzaW9uIHN0YXR1cy5cbiAgICAgKi9cbiAgICBfb25TdGF0dXNDaGFuZ2VkKHNlbmRlciwgc3RhdHVzKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2RlYWQnKSB7XG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9IChfYSA9IHNlbmRlci5rZXJuZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tb2RlbDtcbiAgICAgICAgICAgIGlmIChtb2RlbCA9PT0gbnVsbCB8fCBtb2RlbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9kZWwucmVhc29uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHJhY2ViYWNrID0gbW9kZWwudHJhY2ViYWNrIHx8ICcnO1xuICAgICAgICAgICAgICAgIHZvaWQgdGhpcy5fZGlzcGxheUtlcm5lbEVycm9yKG1vZGVsLnJlYXNvbiwgdHJhY2ViYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgdGhhdCB0aGlzIGtlcm5lbCBpcyBidXN5LCBpZiB3ZSBoYXZlbid0IGFscmVhZHlcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhbHJlYWR5LCBhbmQgbm93IHdlIGFyZW4ndCBidXN5LCBkaXNwb3NlXG4gICAgICAgIC8vIG9mIHRoZSBidXN5IGRpc3Bvc2FibGUuXG4gICAgICAgIGlmICh0aGlzLl9zZXRCdXN5KSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnYnVzeScpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2J1c3lEaXNwb3NhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1c3lEaXNwb3NhYmxlID0gdGhpcy5fc2V0QnVzeSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9idXN5RGlzcG9zYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idXN5RGlzcG9zYWJsZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1c3lEaXNwb3NhYmxlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gUHJveHkgdGhlIHNpZ25hbFxuICAgICAgICB0aGlzLl9zdGF0dXNDaGFuZ2VkLmVtaXQoc3RhdHVzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBzZXNzaW9uIHN0YXR1cy5cbiAgICAgKi9cbiAgICBfb25Db25uZWN0aW9uU3RhdHVzQ2hhbmdlZChzZW5kZXIsIHN0YXR1cykge1xuICAgICAgICAvLyBQcm94eSB0aGUgc2lnbmFsXG4gICAgICAgIHRoaXMuX2Nvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkLmVtaXQoc3RhdHVzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBwZW5kaW5nIGlucHV0LlxuICAgICAqL1xuICAgIF9vblBlbmRpbmdJbnB1dChzZW5kZXIsIHZhbHVlKSB7XG4gICAgICAgIC8vIFNldCB0aGUgc2lnbmFsIHZhbHVlXG4gICAgICAgIHRoaXMuX3BlbmRpbmdJbnB1dCA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYW4gaW9wdWIgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBfb25Jb3B1Yk1lc3NhZ2Uoc2VuZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmIChtZXNzYWdlLmhlYWRlci5tc2dfdHlwZSA9PT0gJ3NodXRkb3duX3JlcGx5Jykge1xuICAgICAgICAgICAgdGhpcy5zZXNzaW9uLmtlcm5lbC5yZW1vdmVJbnB1dEd1YXJkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW9wdWJNZXNzYWdlLmVtaXQobWVzc2FnZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhbiB1bmhhbmRsZWQgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBfb25VbmhhbmRsZWRNZXNzYWdlKHNlbmRlciwgbWVzc2FnZSkge1xuICAgICAgICB0aGlzLl91bmhhbmRsZWRNZXNzYWdlLmVtaXQobWVzc2FnZSk7XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgYFNlc3Npb25Db250ZXh0YCBzdGF0aWNzLlxuICovXG4oZnVuY3Rpb24gKFNlc3Npb25Db250ZXh0KSB7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkZWZhdWx0IGtlcm5lbCBuYW1lIGdpdmVuIHNlbGVjdCBvcHRpb25zLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldERlZmF1bHRLZXJuZWwob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gUHJpdmF0ZS5nZXREZWZhdWx0S2VybmVsKG9wdGlvbnMpO1xuICAgIH1cbiAgICBTZXNzaW9uQ29udGV4dC5nZXREZWZhdWx0S2VybmVsID0gZ2V0RGVmYXVsdEtlcm5lbDtcbn0pKFNlc3Npb25Db250ZXh0IHx8IChTZXNzaW9uQ29udGV4dCA9IHt9KSk7XG4vKipcbiAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBjbGllbnQgc2Vzc2lvbiBkaWFsb2cgcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBzZXNzaW9uQ29udGV4dERpYWxvZ3MgPSB7XG4gICAgLyoqXG4gICAgICogU2VsZWN0IGEga2VybmVsIGZvciB0aGUgc2Vzc2lvbi5cbiAgICAgKi9cbiAgICBhc3luYyBzZWxlY3RLZXJuZWwoc2Vzc2lvbkNvbnRleHQsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgaWYgKHNlc3Npb25Db250ZXh0LmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gZXhpc3Rpbmcga2VybmVsLCBvZmZlciB0aGUgb3B0aW9uXG4gICAgICAgIC8vIHRvIGtlZXAgbm8ga2VybmVsLlxuICAgICAgICBsZXQgbGFiZWwgPSB0cmFucy5fXygnQ2FuY2VsJyk7XG4gICAgICAgIGlmIChzZXNzaW9uQ29udGV4dC5oYXNOb0tlcm5lbCkge1xuICAgICAgICAgICAgbGFiZWwgPSBzZXNzaW9uQ29udGV4dC5rZXJuZWxEaXNwbGF5TmFtZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBidXR0b25zID0gW1xuICAgICAgICAgICAgRGlhbG9nLmNhbmNlbEJ1dHRvbih7IGxhYmVsIH0pLFxuICAgICAgICAgICAgRGlhbG9nLm9rQnV0dG9uKHsgbGFiZWw6IHRyYW5zLl9fKCdTZWxlY3QnKSB9KVxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKHtcbiAgICAgICAgICAgIHRpdGxlOiB0cmFucy5fXygnU2VsZWN0IEtlcm5lbCcpLFxuICAgICAgICAgICAgYm9keTogbmV3IFByaXZhdGUuS2VybmVsU2VsZWN0b3Ioc2Vzc2lvbkNvbnRleHQsIHRyYW5zbGF0b3IpLFxuICAgICAgICAgICAgYnV0dG9uc1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGlhbG9nLmxhdW5jaCgpO1xuICAgICAgICBpZiAoc2Vzc2lvbkNvbnRleHQuaXNEaXNwb3NlZCB8fCAhcmVzdWx0LmJ1dHRvbi5hY2NlcHQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtb2RlbCA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKG1vZGVsID09PSBudWxsICYmICFzZXNzaW9uQ29udGV4dC5oYXNOb0tlcm5lbCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb25Db250ZXh0LnNodXRkb3duKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgICAgICBhd2FpdCBzZXNzaW9uQ29udGV4dC5jaGFuZ2VLZXJuZWwobW9kZWwpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBSZXN0YXJ0IHRoZSBzZXNzaW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB3aGV0aGVyIHRoZSBrZXJuZWwgaGFzIHJlc3RhcnRlZC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBJZiB0aGVyZSBpcyBhIHJ1bm5pbmcga2VybmVsLCBwcmVzZW50IGEgZGlhbG9nLlxuICAgICAqIElmIHRoZXJlIGlzIG5vIGtlcm5lbCwgd2Ugc3RhcnQgYSBrZXJuZWwgd2l0aCB0aGUgbGFzdCBydW5cbiAgICAgKiBrZXJuZWwgbmFtZSBhbmQgcmVzb2x2ZXMgd2l0aCBgdHJ1ZWAuXG4gICAgICovXG4gICAgYXN5bmMgcmVzdGFydChzZXNzaW9uQ29udGV4dCwgdHJhbnNsYXRvcikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBhd2FpdCBzZXNzaW9uQ29udGV4dC5pbml0aWFsaXplKCk7XG4gICAgICAgIGlmIChzZXNzaW9uQ29udGV4dC5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Nlc3Npb24gYWxyZWFkeSBkaXNwb3NlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGtlcm5lbCA9IChfYSA9IHNlc3Npb25Db250ZXh0LnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5rZXJuZWw7XG4gICAgICAgIGlmICgha2VybmVsICYmIHNlc3Npb25Db250ZXh0LnByZXZLZXJuZWxOYW1lKSB7XG4gICAgICAgICAgICBhd2FpdCBzZXNzaW9uQ29udGV4dC5jaGFuZ2VLZXJuZWwoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHNlc3Npb25Db250ZXh0LnByZXZLZXJuZWxOYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIEJhaWwgaWYgdGhlcmUgaXMgbm8gcHJldmlvdXMga2VybmVsIHRvIHN0YXJ0LlxuICAgICAgICBpZiAoIWtlcm5lbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBrZXJuZWwgdG8gcmVzdGFydCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3RhcnRCdG4gPSBEaWFsb2cud2FybkJ1dHRvbih7IGxhYmVsOiAnUmVzdGFydCcgfSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHNob3dEaWFsb2coe1xuICAgICAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdSZXN0YXJ0IEtlcm5lbD8nKSxcbiAgICAgICAgICAgIGJvZHk6IHRyYW5zLl9fKCdEbyB5b3Ugd2FudCB0byByZXN0YXJ0IHRoZSBjdXJyZW50IGtlcm5lbD8gQWxsIHZhcmlhYmxlcyB3aWxsIGJlIGxvc3QuJyksXG4gICAgICAgICAgICBidXR0b25zOiBbRGlhbG9nLmNhbmNlbEJ1dHRvbigpLCByZXN0YXJ0QnRuXVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGtlcm5lbC5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdC5idXR0b24uYWNjZXB0KSB7XG4gICAgICAgICAgICBhd2FpdCBzZXNzaW9uQ29udGV4dC5yZXN0YXJ0S2VybmVsKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcbi8qKlxuICogVGhlIG5hbWVzcGFjZSBmb3IgbW9kdWxlIHByaXZhdGUgZGF0YS5cbiAqL1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICAvKipcbiAgICAgKiBBIHdpZGdldCB0aGF0IHByb3ZpZGVzIGEga2VybmVsIHNlbGVjdGlvbi5cbiAgICAgKi9cbiAgICBjbGFzcyBLZXJuZWxTZWxlY3RvciBleHRlbmRzIFdpZGdldCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgYSBuZXcga2VybmVsIHNlbGVjdG9yIHdpZGdldC5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKHNlc3Npb25Db250ZXh0LCB0cmFuc2xhdG9yKSB7XG4gICAgICAgICAgICBzdXBlcih7IG5vZGU6IGNyZWF0ZVNlbGVjdG9yTm9kZShzZXNzaW9uQ29udGV4dCwgdHJhbnNsYXRvcikgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgdmFsdWUgb2YgdGhlIGtlcm5lbCBzZWxlY3RvciB3aWRnZXQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpO1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc2VsZWN0b3IudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFByaXZhdGUuS2VybmVsU2VsZWN0b3IgPSBLZXJuZWxTZWxlY3RvcjtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBub2RlIGZvciBhIGtlcm5lbCBzZWxlY3RvciB3aWRnZXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JOb2RlKHNlc3Npb25Db250ZXh0LCB0cmFuc2xhdG9yKSB7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgZGlhbG9nIGJvZHkuXG4gICAgICAgIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gYCR7dHJhbnMuX18oJ1NlbGVjdCBrZXJuZWwgZm9yOicpfSBcIiR7c2Vzc2lvbkNvbnRleHQubmFtZX1cImA7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBnZXRLZXJuZWxTZWFyY2goc2Vzc2lvbkNvbnRleHQpO1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICAgICBwb3B1bGF0ZUtlcm5lbFNlbGVjdChzZWxlY3Rvciwgb3B0aW9ucywgdHJhbnNsYXRvciwgIXNlc3Npb25Db250ZXh0Lmhhc05vS2VybmVsID8gc2Vzc2lvbkNvbnRleHQua2VybmVsRGlzcGxheU5hbWUgOiBudWxsKTtcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChzZWxlY3Rvcik7XG4gICAgICAgIHJldHVybiBib2R5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGRlZmF1bHQga2VybmVsIG5hbWUgZ2l2ZW4gc2VsZWN0IG9wdGlvbnMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0RGVmYXVsdEtlcm5lbChvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgeyBzcGVjcywgcHJlZmVyZW5jZSB9ID0gb3B0aW9ucztcbiAgICAgICAgY29uc3QgeyBuYW1lLCBsYW5ndWFnZSwgc2hvdWxkU3RhcnQsIGNhblN0YXJ0LCBhdXRvU3RhcnREZWZhdWx0IH0gPSBwcmVmZXJlbmNlO1xuICAgICAgICBpZiAoIXNwZWNzIHx8IHNob3VsZFN0YXJ0ID09PSBmYWxzZSB8fCBjYW5TdGFydCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRlZmF1bHROYW1lID0gYXV0b1N0YXJ0RGVmYXVsdCA/IHNwZWNzLmRlZmF1bHQgOiBudWxsO1xuICAgICAgICBpZiAoIW5hbWUgJiYgIWxhbmd1YWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdE5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTG9vayBmb3IgYW4gZXhhY3QgbWF0Y2ggb2YgYSBzcGVjIG5hbWUuXG4gICAgICAgIGZvciAoY29uc3Qgc3BlY05hbWUgaW4gc3BlY3Mua2VybmVsc3BlY3MpIHtcbiAgICAgICAgICAgIGlmIChzcGVjTmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEJhaWwgaWYgdGhlcmUgaXMgbm8gbGFuZ3VhZ2UuXG4gICAgICAgIGlmICghbGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0TmFtZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDaGVjayBmb3IgYSBzaW5nbGUga2VybmVsIG1hdGNoaW5nIHRoZSBsYW5ndWFnZS5cbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHNwZWNOYW1lIGluIHNwZWNzLmtlcm5lbHNwZWNzKSB7XG4gICAgICAgICAgICBjb25zdCBrZXJuZWxMYW5ndWFnZSA9IChfYSA9IHNwZWNzLmtlcm5lbHNwZWNzW3NwZWNOYW1lXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxhbmd1YWdlO1xuICAgICAgICAgICAgaWYgKGxhbmd1YWdlID09PSBrZXJuZWxMYW5ndWFnZSkge1xuICAgICAgICAgICAgICAgIG1hdGNoZXMucHVzaChzcGVjTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBzcGVjTmFtZSA9IG1hdGNoZXNbMF07XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ05vIGV4YWN0IG1hdGNoIGZvdW5kIGZvciAnICtcbiAgICAgICAgICAgICAgICBzcGVjTmFtZSArXG4gICAgICAgICAgICAgICAgJywgdXNpbmcga2VybmVsICcgK1xuICAgICAgICAgICAgICAgIHNwZWNOYW1lICtcbiAgICAgICAgICAgICAgICAnIHRoYXQgbWF0Y2hlcyAnICtcbiAgICAgICAgICAgICAgICAnbGFuZ3VhZ2U9JyArXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIHNwZWNOYW1lO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5vIG1hdGNoZXMgZm91bmQuXG4gICAgICAgIHJldHVybiBkZWZhdWx0TmFtZTtcbiAgICB9XG4gICAgUHJpdmF0ZS5nZXREZWZhdWx0S2VybmVsID0gZ2V0RGVmYXVsdEtlcm5lbDtcbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZSBhIGtlcm5lbCBzZWxlY3Qgbm9kZSBmb3IgdGhlIHNlc3Npb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVLZXJuZWxTZWxlY3Qobm9kZSwgb3B0aW9ucywgdHJhbnNsYXRvciwgY3VycmVudEtlcm5lbERpc3BsYXlOYW1lID0gbnVsbCkge1xuICAgICAgICB3aGlsZSAobm9kZS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBwcmVmZXJlbmNlLCBzZXNzaW9ucywgc3BlY3MgfSA9IG9wdGlvbnM7XG4gICAgICAgIGNvbnN0IHsgbmFtZSwgaWQsIGxhbmd1YWdlLCBjYW5TdGFydCwgc2hvdWxkU3RhcnQgfSA9IHByZWZlcmVuY2U7XG4gICAgICAgIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBpZiAoIXNwZWNzIHx8IGNhblN0YXJ0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChvcHRpb25Gb3JOb25lKHRyYW5zbGF0b3IpKTtcbiAgICAgICAgICAgIG5vZGUudmFsdWUgPSAnbnVsbCc7XG4gICAgICAgICAgICBub2RlLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBub2RlLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIC8vIENyZWF0ZSBtYXBwaW5ncyBvZiBkaXNwbGF5IG5hbWVzIGFuZCBsYW5ndWFnZXMgZm9yIGtlcm5lbCBuYW1lLlxuICAgICAgICBjb25zdCBkaXNwbGF5TmFtZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBjb25zdCBsYW5ndWFnZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gc3BlY3Mua2VybmVsc3BlY3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHNwZWMgPSBzcGVjcy5rZXJuZWxzcGVjc1tuYW1lXTtcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lc1tuYW1lXSA9IHNwZWMuZGlzcGxheV9uYW1lO1xuICAgICAgICAgICAgbGFuZ3VhZ2VzW25hbWVdID0gc3BlYy5sYW5ndWFnZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBIYW5kbGUgYSBrZXJuZWwgYnkgbmFtZS5cbiAgICAgICAgY29uc3QgbmFtZXMgPSBbXTtcbiAgICAgICAgaWYgKG5hbWUgJiYgbmFtZSBpbiBzcGVjcy5rZXJuZWxzcGVjcykge1xuICAgICAgICAgICAgbmFtZXMucHVzaChuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGVuIGxvb2sgYnkgbGFuZ3VhZ2UuXG4gICAgICAgIGlmIChsYW5ndWFnZSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzcGVjTmFtZSBpbiBzcGVjcy5rZXJuZWxzcGVjcykge1xuICAgICAgICAgICAgICAgIGlmIChuYW1lICE9PSBzcGVjTmFtZSAmJiBsYW5ndWFnZXNbc3BlY05hbWVdID09PSBsYW5ndWFnZSkge1xuICAgICAgICAgICAgICAgICAgICBuYW1lcy5wdXNoKHNwZWNOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXNlIHRoZSBkZWZhdWx0IGtlcm5lbCBpZiBubyBrZXJuZWxzIHdlcmUgZm91bmQuXG4gICAgICAgIGlmICghbmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBuYW1lcy5wdXNoKHNwZWNzLmRlZmF1bHQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEhhbmRsZSBhIHByZWZlcnJlZCBrZXJuZWxzIGluIG9yZGVyIG9mIGRpc3BsYXkgbmFtZS5cbiAgICAgICAgY29uc3QgcHJlZmVycmVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0Z3JvdXAnKTtcbiAgICAgICAgcHJlZmVycmVkLmxhYmVsID0gdHJhbnMuX18oJ1N0YXJ0IFByZWZlcnJlZCBLZXJuZWwnKTtcbiAgICAgICAgbmFtZXMuc29ydCgoYSwgYikgPT4gZGlzcGxheU5hbWVzW2FdLmxvY2FsZUNvbXBhcmUoZGlzcGxheU5hbWVzW2JdKSk7XG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBuYW1lcykge1xuICAgICAgICAgICAgcHJlZmVycmVkLmFwcGVuZENoaWxkKG9wdGlvbkZvck5hbWUobmFtZSwgZGlzcGxheU5hbWVzW25hbWVdKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZWZlcnJlZC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKHByZWZlcnJlZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIGFuIG9wdGlvbiBmb3Igbm8ga2VybmVsXG4gICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQob3B0aW9uRm9yTm9uZSgpKTtcbiAgICAgICAgY29uc3Qgb3RoZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRncm91cCcpO1xuICAgICAgICBvdGhlci5sYWJlbCA9IHRyYW5zLl9fKCdTdGFydCBPdGhlciBLZXJuZWwnKTtcbiAgICAgICAgLy8gQWRkIHRoZSByZXN0IG9mIHRoZSBrZXJuZWwgbmFtZXMgaW4gYWxwaGFiZXRpY2FsIG9yZGVyLlxuICAgICAgICBjb25zdCBvdGhlck5hbWVzID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgc3BlY05hbWUgaW4gc3BlY3Mua2VybmVsc3BlY3MpIHtcbiAgICAgICAgICAgIGlmIChuYW1lcy5pbmRleE9mKHNwZWNOYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG90aGVyTmFtZXMucHVzaChzcGVjTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgb3RoZXJOYW1lcy5zb3J0KChhLCBiKSA9PiBkaXNwbGF5TmFtZXNbYV0ubG9jYWxlQ29tcGFyZShkaXNwbGF5TmFtZXNbYl0pKTtcbiAgICAgICAgZm9yIChjb25zdCBvdGhlck5hbWUgb2Ygb3RoZXJOYW1lcykge1xuICAgICAgICAgICAgb3RoZXIuYXBwZW5kQ2hpbGQob3B0aW9uRm9yTmFtZShvdGhlck5hbWUsIGRpc3BsYXlOYW1lc1tvdGhlck5hbWVdKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIGEgc2VwYXJhdG9yIG9wdGlvbiBpZiB0aGVyZSB3ZXJlIGFueSBvdGhlciBuYW1lcy5cbiAgICAgICAgaWYgKG90aGVyTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKG90aGVyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBIYW5kbGUgdGhlIGRlZmF1bHQgdmFsdWUuXG4gICAgICAgIGlmIChzaG91bGRTdGFydCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIG5vZGUudmFsdWUgPSAnbnVsbCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgICAgICAgICBpZiAoY3VycmVudEtlcm5lbERpc3BsYXlOYW1lKSB7XG4gICAgICAgICAgICAgICAgLy8gU2VsZWN0IGN1cnJlbnQga2VybmVsIGJ5IGRlZmF1bHQuXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJbmRleCA9IFsuLi5ub2RlLm9wdGlvbnNdLmZpbmRJbmRleChvcHRpb24gPT4gb3B0aW9uLnRleHQgPT09IGN1cnJlbnRLZXJuZWxEaXNwbGF5TmFtZSk7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJbmRleCA9IE1hdGgubWF4KHNlbGVjdGVkSW5kZXgsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5zZWxlY3RlZEluZGV4ID0gc2VsZWN0ZWRJbmRleDtcbiAgICAgICAgfVxuICAgICAgICAvLyBCYWlsIGlmIHRoZXJlIGFyZSBubyBzZXNzaW9ucy5cbiAgICAgICAgaWYgKCFzZXNzaW9ucykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCB0aGUgc2Vzc2lvbnMgdXNpbmcgdGhlIHByZWZlcnJlZCBsYW5ndWFnZSBmaXJzdC5cbiAgICAgICAgY29uc3QgbWF0Y2hpbmdTZXNzaW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBvdGhlclNlc3Npb25zID0gW107XG4gICAgICAgIGVhY2goc2Vzc2lvbnMsIHNlc3Npb24gPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgaWYgKGxhbmd1YWdlICYmXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5rZXJuZWwgJiZcbiAgICAgICAgICAgICAgICBsYW5ndWFnZXNbc2Vzc2lvbi5rZXJuZWwubmFtZV0gPT09IGxhbmd1YWdlICYmXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5rZXJuZWwuaWQgIT09IGlkKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hpbmdTZXNzaW9ucy5wdXNoKHNlc3Npb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKChfYSA9IHNlc3Npb24ua2VybmVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWQpICE9PSBpZCkge1xuICAgICAgICAgICAgICAgIG90aGVyU2Vzc2lvbnMucHVzaChzZXNzaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG1hdGNoaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0Z3JvdXAnKTtcbiAgICAgICAgbWF0Y2hpbmcubGFiZWwgPSB0cmFucy5fXygnVXNlIEtlcm5lbCBmcm9tIFByZWZlcnJlZCBTZXNzaW9uJyk7XG4gICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQobWF0Y2hpbmcpO1xuICAgICAgICBpZiAobWF0Y2hpbmdTZXNzaW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG1hdGNoaW5nU2Vzc2lvbnMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnBhdGgubG9jYWxlQ29tcGFyZShiLnBhdGgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlYWNoKG1hdGNoaW5nU2Vzc2lvbnMsIHNlc3Npb24gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBzZXNzaW9uLmtlcm5lbCA/IGRpc3BsYXlOYW1lc1tzZXNzaW9uLmtlcm5lbC5uYW1lXSA6ICcnO1xuICAgICAgICAgICAgICAgIG1hdGNoaW5nLmFwcGVuZENoaWxkKG9wdGlvbkZvclNlc3Npb24oc2Vzc2lvbiwgbmFtZSwgdHJhbnNsYXRvcikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3RoZXJTZXNzaW9uc05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRncm91cCcpO1xuICAgICAgICBvdGhlclNlc3Npb25zTm9kZS5sYWJlbCA9IHRyYW5zLl9fKCdVc2UgS2VybmVsIGZyb20gT3RoZXIgU2Vzc2lvbicpO1xuICAgICAgICBub2RlLmFwcGVuZENoaWxkKG90aGVyU2Vzc2lvbnNOb2RlKTtcbiAgICAgICAgaWYgKG90aGVyU2Vzc2lvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBvdGhlclNlc3Npb25zLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5wYXRoLmxvY2FsZUNvbXBhcmUoYi5wYXRoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWFjaChvdGhlclNlc3Npb25zLCBzZXNzaW9uID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gc2Vzc2lvbi5rZXJuZWxcbiAgICAgICAgICAgICAgICAgICAgPyBkaXNwbGF5TmFtZXNbc2Vzc2lvbi5rZXJuZWwubmFtZV0gfHwgc2Vzc2lvbi5rZXJuZWwubmFtZVxuICAgICAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICAgICAgICAgIG90aGVyU2Vzc2lvbnNOb2RlLmFwcGVuZENoaWxkKG9wdGlvbkZvclNlc3Npb24oc2Vzc2lvbiwgbmFtZSwgdHJhbnNsYXRvcikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUHJpdmF0ZS5wb3B1bGF0ZUtlcm5lbFNlbGVjdCA9IHBvcHVsYXRlS2VybmVsU2VsZWN0O1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUga2VybmVsIHNlYXJjaCBvcHRpb25zIGdpdmVuIGEgc2Vzc2lvbiBjb250ZXh0IGFuZCBzZXNzaW9uIG1hbmFnZXIuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0S2VybmVsU2VhcmNoKHNlc3Npb25Db250ZXh0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzcGVjczogc2Vzc2lvbkNvbnRleHQuc3BlY3NNYW5hZ2VyLnNwZWNzLFxuICAgICAgICAgICAgc2Vzc2lvbnM6IHNlc3Npb25Db250ZXh0LnNlc3Npb25NYW5hZ2VyLnJ1bm5pbmcoKSxcbiAgICAgICAgICAgIHByZWZlcmVuY2U6IHNlc3Npb25Db250ZXh0Lmtlcm5lbFByZWZlcmVuY2VcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIG9wdGlvbiBlbGVtZW50IGZvciBhIGtlcm5lbCBuYW1lLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG9wdGlvbkZvck5hbWUobmFtZSwgZGlzcGxheU5hbWUpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgIG9wdGlvbi50ZXh0ID0gZGlzcGxheU5hbWU7XG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHsgbmFtZSB9KTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIG9wdGlvbiBmb3Igbm8ga2VybmVsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG9wdGlvbkZvck5vbmUodHJhbnNsYXRvcikge1xuICAgICAgICB0cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRncm91cCcpO1xuICAgICAgICBncm91cC5sYWJlbCA9IHRyYW5zLl9fKCdVc2UgTm8gS2VybmVsJyk7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICBvcHRpb24udGV4dCA9IHRyYW5zLl9fKCdObyBLZXJuZWwnKTtcbiAgICAgICAgb3B0aW9uLnZhbHVlID0gJ251bGwnO1xuICAgICAgICBncm91cC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBvcHRpb24gZWxlbWVudCBmb3IgYSBzZXNzaW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG9wdGlvbkZvclNlc3Npb24oc2Vzc2lvbiwgZGlzcGxheU5hbWUsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICBjb25zdCBzZXNzaW9uTmFtZSA9IHNlc3Npb24ubmFtZSB8fCBQYXRoRXh0LmJhc2VuYW1lKHNlc3Npb24ucGF0aCk7XG4gICAgICAgIG9wdGlvbi50ZXh0ID0gc2Vzc2lvbk5hbWU7XG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHsgaWQ6IChfYSA9IHNlc3Npb24ua2VybmVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWQgfSk7XG4gICAgICAgIG9wdGlvbi50aXRsZSA9XG4gICAgICAgICAgICBgJHt0cmFucy5fXygnUGF0aDonKX0gJHtzZXNzaW9uLnBhdGh9XFxuYCArXG4gICAgICAgICAgICAgICAgYCR7dHJhbnMuX18oJ05hbWU6Jyl9ICR7c2Vzc2lvbk5hbWV9XFxuYCArXG4gICAgICAgICAgICAgICAgYCR7dHJhbnMuX18oJ0tlcm5lbCBOYW1lOicpfSAke2Rpc3BsYXlOYW1lfVxcbmAgK1xuICAgICAgICAgICAgICAgIGAke3RyYW5zLl9fKCdLZXJuZWwgSWQ6Jyl9ICR7KF9iID0gc2Vzc2lvbi5rZXJuZWwpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5pZH1gO1xuICAgICAgICByZXR1cm4gb3B0aW9uO1xuICAgIH1cbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2Vzc2lvbmNvbnRleHQuanMubWFwIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuLyoqXG4gKiBUaGUgc3Bpbm5lciBjbGFzcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNwaW5uZXIgZXh0ZW5kcyBXaWRnZXQge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIHNwaW5uZXIgd2lkZ2V0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1TcGlubmVyJyk7XG4gICAgICAgIHRoaXMubm9kZS50YWJJbmRleCA9IC0xO1xuICAgICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRlbnQuY2xhc3NOYW1lID0gJ2pwLVNwaW5uZXJDb250ZW50JztcbiAgICAgICAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYCdhY3RpdmF0ZS1yZXF1ZXN0J2AgbWVzc2FnZXMuXG4gICAgICovXG4gICAgb25BY3RpdmF0ZVJlcXVlc3QobXNnKSB7XG4gICAgICAgIHRoaXMubm9kZS5mb2N1cygpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNwaW5uZXIuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG4vKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLyoqXG4gKiBUaGUgbWFpbiBtZW51IHRva2VuLlxuICovXG5leHBvcnQgY29uc3QgSVNwbGFzaFNjcmVlbiA9IG5ldyBUb2tlbignQGp1cHl0ZXJsYWIvYXBwdXRpbHM6SVNwbGFzaFNjcmVlbicpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3BsYXNoLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IGNhcmV0RG93bkVtcHR5SWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3Igbm9kZSBzdHlsaW5nLlxuICovXG5leHBvcnQgdmFyIFN0eWxpbmc7XG4oZnVuY3Rpb24gKFN0eWxpbmcpIHtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBhIG5vZGUgYW5kIGl0cyBjaGlsZCBlbGVtZW50cyB3aXRoIHRoZSBkZWZhdWx0IHRhZyBuYW1lcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIC0gVGhlIGJhc2Ugbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjbGFzc05hbWUgLSBUaGUgb3B0aW9uYWwgQ1NTIGNsYXNzIHRvIGFkZCB0byBzdHlsZWQgbm9kZXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3R5bGVOb2RlKG5vZGUsIGNsYXNzTmFtZSA9ICcnKSB7XG4gICAgICAgIHN0eWxlTm9kZUJ5VGFnKG5vZGUsICdzZWxlY3QnLCBjbGFzc05hbWUpO1xuICAgICAgICBzdHlsZU5vZGVCeVRhZyhub2RlLCAndGV4dGFyZWEnLCBjbGFzc05hbWUpO1xuICAgICAgICBzdHlsZU5vZGVCeVRhZyhub2RlLCAnaW5wdXQnLCBjbGFzc05hbWUpO1xuICAgICAgICBzdHlsZU5vZGVCeVRhZyhub2RlLCAnYnV0dG9uJywgY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgU3R5bGluZy5zdHlsZU5vZGUgPSBzdHlsZU5vZGU7XG4gICAgLyoqXG4gICAgICogU3R5bGUgYSBub2RlIGFuZCBpdHMgZWxlbWVudHMgdGhhdCBoYXZlIGEgZ2l2ZW4gdGFnIG5hbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSAtIFRoZSBiYXNlIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGFnTmFtZSAtIFRoZSBodG1sIHRhZyBuYW1lIHRvIHN0eWxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNsYXNzTmFtZSAtIFRoZSBvcHRpb25hbCBDU1MgY2xhc3MgdG8gYWRkIHRvIHN0eWxlZCBub2Rlcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdHlsZU5vZGVCeVRhZyhub2RlLCB0YWdOYW1lLCBjbGFzc05hbWUgPSAnJykge1xuICAgICAgICBpZiAobm9kZS5sb2NhbE5hbWUgPT09IHRhZ05hbWUpIHtcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCgnanAtbW9kLXN0eWxlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLmxvY2FsTmFtZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgICAgIHdyYXBTZWxlY3Qobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm9kZXMgPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IG5vZGVzW2ldO1xuICAgICAgICAgICAgY2hpbGQuY2xhc3NMaXN0LmFkZCgnanAtbW9kLXN0eWxlZCcpO1xuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIGNoaWxkLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0YWdOYW1lID09PSAnc2VsZWN0Jykge1xuICAgICAgICAgICAgICAgIHdyYXBTZWxlY3QoY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFN0eWxpbmcuc3R5bGVOb2RlQnlUYWcgPSBzdHlsZU5vZGVCeVRhZztcbiAgICAvKipcbiAgICAgKiBXcmFwIGEgc2VsZWN0IG5vZGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gd3JhcFNlbGVjdChub2RlKSB7XG4gICAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdqcC1zZWxlY3Qtd3JhcHBlcicpO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgUHJpdmF0ZS5vbkZvY3VzKTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgUHJpdmF0ZS5vbkZvY3VzKTtcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKCdqcC1tb2Qtc3R5bGVkJyk7XG4gICAgICAgIGlmIChub2RlLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIG5vZGUucGFyZW50RWxlbWVudC5yZXBsYWNlQ2hpbGQod3JhcHBlciwgbm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgLy8gYWRkIHRoZSBpY29uIG5vZGVcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChjYXJldERvd25FbXB0eUljb24uZWxlbWVudCh7XG4gICAgICAgICAgICB0YWc6ICdzcGFuJyxcbiAgICAgICAgICAgIHN0eWxlc2hlZXQ6ICdzZWxlY3QnLFxuICAgICAgICAgICAgcmlnaHQ6ICc4cHgnLFxuICAgICAgICAgICAgdG9wOiAnNXB4JyxcbiAgICAgICAgICAgIHdpZHRoOiAnMThweCdcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICB9XG4gICAgU3R5bGluZy53cmFwU2VsZWN0ID0gd3JhcFNlbGVjdDtcbn0pKFN0eWxpbmcgfHwgKFN0eWxpbmcgPSB7fSkpO1xuLyoqXG4gKiBUaGUgbmFtZXNwYWNlIGZvciBtb2R1bGUgcHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGZvY3VzIGV2ZW50IG9uIGEgc3R5bGVkIHNlbGVjdC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBvbkZvY3VzKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdmb2N1cycpIHtcbiAgICAgICAgICAgIHBhcmVudC5jbGFzc0xpc3QuYWRkKCdqcC1tb2QtZm9jdXNlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2pwLW1vZC1mb2N1c2VkJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUHJpdmF0ZS5vbkZvY3VzID0gb25Gb2N1cztcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3R5bGluZy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBVUkxFeHQgfSBmcm9tICdAanVweXRlcmxhYi9jb3JldXRpbHMnO1xuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBlYWNoIH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IHsgRGlzcG9zYWJsZURlbGVnYXRlIH0gZnJvbSAnQGx1bWluby9kaXNwb3NhYmxlJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmltcG9ydCB7IERpYWxvZywgc2hvd0RpYWxvZyB9IGZyb20gJy4vZGlhbG9nJztcbi8qKlxuICogVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgYmV0d2VlbiB0aGVtZSBsb2FkaW5nIGF0dGVtcHRzLlxuICovXG5jb25zdCBSRVFVRVNUX0lOVEVSVkFMID0gNzU7XG4vKipcbiAqIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gYXR0ZW1wdCB0byBsb2FkIGEgdGhlbWUgYmVmb3JlIGdpdmluZyB1cC5cbiAqL1xuY29uc3QgUkVRVUVTVF9USFJFU0hPTEQgPSAyMDtcbi8qKlxuICogQSBjbGFzcyB0aGF0IHByb3ZpZGVzIHRoZW1lIG1hbmFnZW1lbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBUaGVtZU1hbmFnZXIge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyB0aGVtZSBtYW5hZ2VyLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2xpbmtzID0gW107XG4gICAgICAgIHRoaXMuX292ZXJyaWRlcyA9IHt9O1xuICAgICAgICB0aGlzLl9vdmVycmlkZVByb3BzID0ge307XG4gICAgICAgIHRoaXMuX291dHN0YW5kaW5nID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGVuZGluZyA9IDA7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RzID0ge307XG4gICAgICAgIHRoaXMuX3RoZW1lcyA9IHt9O1xuICAgICAgICB0aGlzLl90aGVtZUNoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICBjb25zdCB7IGhvc3QsIGtleSwgc3BsYXNoLCB1cmwgfSA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMudHJhbnNsYXRvciA9IG9wdGlvbnMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgdGhpcy5fdHJhbnMgPSB0aGlzLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCByZWdpc3RyeSA9IG9wdGlvbnMuc2V0dGluZ3M7XG4gICAgICAgIHRoaXMuX2Jhc2UgPSB1cmw7XG4gICAgICAgIHRoaXMuX2hvc3QgPSBob3N0O1xuICAgICAgICB0aGlzLl9zcGxhc2ggPSBzcGxhc2ggfHwgbnVsbDtcbiAgICAgICAgdm9pZCByZWdpc3RyeS5sb2FkKGtleSkudGhlbihzZXR0aW5ncyA9PiB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICAgICAgLy8gc2V0IHVwIGNzcyBvdmVycmlkZXMgb25jZSB3ZSBoYXZlIGEgcG9pbnRlciB0byB0aGUgc2V0dGluZ3Mgc2NoZW1hXG4gICAgICAgICAgICB0aGlzLl9pbml0T3ZlcnJpZGVQcm9wcygpO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3MuY2hhbmdlZC5jb25uZWN0KHRoaXMuX2xvYWRTZXR0aW5ncywgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9sb2FkU2V0dGluZ3MoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbmFtZSBvZiB0aGUgY3VycmVudCB0aGVtZS5cbiAgICAgKi9cbiAgICBnZXQgdGhlbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZXMgb2YgdGhlIHJlZ2lzdGVyZWQgdGhlbWVzLlxuICAgICAqL1xuICAgIGdldCB0aGVtZXMoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl90aGVtZXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBmaXJlZCB3aGVuIHRoZSBhcHBsaWNhdGlvbiB0aGVtZSBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGdldCB0aGVtZUNoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aGVtZUNoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdmFsdWUgb2YgYSBDU1MgdmFyaWFibGUgZnJvbSBpdHMga2V5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGtleSAtIEEgSnVweXRlcmxhYiBDU1MgdmFyaWFibGUsIHdpdGhvdXQgdGhlIGxlYWRpbmcgJy0tanAtJy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gdmFsdWUgLSBUaGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgSnVweXRlcmxhYiBDU1MgdmFyaWFibGVcbiAgICAgKi9cbiAgICBnZXRDU1Moa2V5KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuICgoX2EgPSB0aGlzLl9vdmVycmlkZXNba2V5XSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoYC0tanAtJHtrZXl9YCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb2FkIGEgdGhlbWUgQ1NTIGZpbGUgYnkgcGF0aC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoIC0gVGhlIHBhdGggb2YgdGhlIGZpbGUgdG8gbG9hZC5cbiAgICAgKi9cbiAgICBsb2FkQ1NTKHBhdGgpIHtcbiAgICAgICAgY29uc3QgYmFzZSA9IHRoaXMuX2Jhc2U7XG4gICAgICAgIGNvbnN0IGhyZWYgPSBVUkxFeHQuaXNMb2NhbChwYXRoKSA/IFVSTEV4dC5qb2luKGJhc2UsIHBhdGgpIDogcGF0aDtcbiAgICAgICAgY29uc3QgbGlua3MgPSB0aGlzLl9saW5rcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgncmVsJywgJ3N0eWxlc2hlZXQnKTtcbiAgICAgICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoYFN0eWxlc2hlZXQgZmFpbGVkIHRvIGxvYWQ6ICR7aHJlZn1gKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgICAgICAgIGxpbmtzLnB1c2gobGluayk7XG4gICAgICAgICAgICAvLyBhZGQgYW55IGNzcyBvdmVycmlkZXMgdG8gZG9jdW1lbnRcbiAgICAgICAgICAgIHRoaXMubG9hZENTU092ZXJyaWRlcygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9hZHMgYWxsIGN1cnJlbnQgQ1NTIG92ZXJyaWRlcyBmcm9tIHNldHRpbmdzLiBJZiBhbiBvdmVycmlkZSBoYXMgYmVlblxuICAgICAqIHJlbW92ZWQgb3IgaXMgaW52YWxpZCwgdGhpcyBmdW5jdGlvbiB1bmxvYWRzIGl0IGluc3RlYWQuXG4gICAgICovXG4gICAgbG9hZENTU092ZXJyaWRlcygpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBuZXdPdmVycmlkZXMgPSAoX2EgPSB0aGlzLl9zZXR0aW5ncy51c2VyWydvdmVycmlkZXMnXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDoge307XG4gICAgICAgIC8vIGl0ZXJhdGUgb3ZlciB0aGUgdW5pb24gb2YgY3VycmVudCBhbmQgbmV3IENTUyBvdmVycmlkZSBrZXlzXG4gICAgICAgIE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fb3ZlcnJpZGVzKSwgbmV3T3ZlcnJpZGVzKSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsID0gbmV3T3ZlcnJpZGVzW2tleV07XG4gICAgICAgICAgICBpZiAodmFsICYmIHRoaXMudmFsaWRhdGVDU1Moa2V5LCB2YWwpKSB7XG4gICAgICAgICAgICAgICAgLy8gdmFsaWRhdGlvbiBzdWNjZWVkZWQsIHNldCB0aGUgb3ZlcnJpZGVcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoYC0tanAtJHtrZXl9YCwgdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGlmIGtleSBpcyBub3QgcHJlc2VudCBvciB2YWxpZGF0aW9uIGZhaWxlZCwgdGhlIG92ZXJyaWRlIHdpbGwgYmUgcmVtb3ZlZFxuICAgICAgICAgICAgICAgIGRlbGV0ZSBuZXdPdmVycmlkZXNba2V5XTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoYC0tanAtJHtrZXl9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyByZXBsYWNlIHRoZSBjdXJyZW50IG92ZXJyaWRlcyB3aXRoIHRoZSBuZXcgb25lc1xuICAgICAgICB0aGlzLl9vdmVycmlkZXMgPSBuZXdPdmVycmlkZXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIGEgQ1NTIHZhbHVlIHcuci50LiBhIGtleVxuICAgICAqXG4gICAgICogQHBhcmFtIGtleSAtIEEgSnVweXRlcmxhYiBDU1MgdmFyaWFibGUsIHdpdGhvdXQgdGhlIGxlYWRpbmcgJy0tanAtJy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWwgLSBBIGNhbmRpZGF0ZSBDU1MgdmFsdWVcbiAgICAgKi9cbiAgICB2YWxpZGF0ZUNTUyhrZXksIHZhbCkge1xuICAgICAgICAvLyBkZXRlcm1pbmUgdGhlIGNzcyBwcm9wZXJ0eSBjb3JyZXNwb25kaW5nIHRvIHRoZSBrZXlcbiAgICAgICAgY29uc3QgcHJvcCA9IHRoaXMuX292ZXJyaWRlUHJvcHNba2V5XTtcbiAgICAgICAgaWYgKCFwcm9wKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NTUyB2YWxpZGF0aW9uIGZhaWxlZDogY291bGQgbm90IGZpbmQgcHJvcGVydHkgY29ycmVzcG9uZGluZyB0byBrZXkuXFxuJyArXG4gICAgICAgICAgICAgICAgYGtleTogJyR7a2V5fScsIHZhbDogJyR7dmFsfSdgKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1c2UgYnVpbHQtaW4gdmFsaWRhdGlvbiBvbmNlIHdlIGhhdmUgdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydHlcbiAgICAgICAgaWYgKENTUy5zdXBwb3J0cyhwcm9wLCB2YWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignQ1NTIHZhbGlkYXRpb24gZmFpbGVkOiBpbnZhbGlkIHZhbHVlLlxcbicgK1xuICAgICAgICAgICAgICAgIGBrZXk6ICcke2tleX0nLCB2YWw6ICcke3ZhbH0nLCBwcm9wOiAnJHtwcm9wfSdgKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBhIHRoZW1lIHdpdGggdGhlIHRoZW1lIG1hbmFnZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGhlbWUgLSBUaGUgdGhlbWUgdG8gcmVnaXN0ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIGRpc3Bvc2FibGUgdGhhdCBjYW4gYmUgdXNlZCB0byB1bnJlZ2lzdGVyIHRoZSB0aGVtZS5cbiAgICAgKi9cbiAgICByZWdpc3Rlcih0aGVtZSkge1xuICAgICAgICBjb25zdCB7IG5hbWUgfSA9IHRoZW1lO1xuICAgICAgICBjb25zdCB0aGVtZXMgPSB0aGlzLl90aGVtZXM7XG4gICAgICAgIGlmICh0aGVtZXNbbmFtZV0pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlbWUgYWxyZWFkeSByZWdpc3RlcmVkIGZvciAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhlbWVzW25hbWVdID0gdGhlbWU7XG4gICAgICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZURlbGVnYXRlKCgpID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGVtZXNbbmFtZV07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgYSBDU1Mgb3ZlcnJpZGUgdG8gdGhlIHNldHRpbmdzLlxuICAgICAqL1xuICAgIHNldENTU092ZXJyaWRlKGtleSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLnNldCgnb3ZlcnJpZGVzJywgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9vdmVycmlkZXMpLCB7IFtrZXldOiB2YWx1ZSB9KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY3VycmVudCB0aGVtZS5cbiAgICAgKi9cbiAgICBzZXRUaGVtZShuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncy5zZXQoJ3RoZW1lJywgbmFtZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRlc3Qgd2hldGhlciBhIGdpdmVuIHRoZW1lIGlzIGxpZ2h0LlxuICAgICAqL1xuICAgIGlzTGlnaHQobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGhlbWVzW25hbWVdLmlzTGlnaHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluY3JlYXNlIGEgZm9udCBzaXplIHcuci50LiBpdHMgY3VycmVudCBzZXR0aW5nIG9yIGl0cyB2YWx1ZSBpbiB0aGVcbiAgICAgKiBjdXJyZW50IHRoZW1lLlxuICAgICAqXG4gICAgICogQHBhcmFtIGtleSAtIEEgSnVweXRlcmxhYiBmb250IHNpemUgQ1NTIHZhcmlhYmxlLCB3aXRob3V0IHRoZSBsZWFkaW5nICctLWpwLScuXG4gICAgICovXG4gICAgaW5jckZvbnRTaXplKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5jckZvbnRTaXplKGtleSwgdHJ1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlY3JlYXNlIGEgZm9udCBzaXplIHcuci50LiBpdHMgY3VycmVudCBzZXR0aW5nIG9yIGl0cyB2YWx1ZSBpbiB0aGVcbiAgICAgKiBjdXJyZW50IHRoZW1lLlxuICAgICAqXG4gICAgICogQHBhcmFtIGtleSAtIEEgSnVweXRlcmxhYiBmb250IHNpemUgQ1NTIHZhcmlhYmxlLCB3aXRob3V0IHRoZSBsZWFkaW5nICctLWpwLScuXG4gICAgICovXG4gICAgZGVjckZvbnRTaXplKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5jckZvbnRTaXplKGtleSwgZmFsc2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUZXN0IHdoZXRoZXIgYSBnaXZlbiB0aGVtZSBzdHlsZXMgc2Nyb2xsYmFycyxcbiAgICAgKiBhbmQgaWYgdGhlIHVzZXIgaGFzIHNjcm9sbGJhciBzdHlsaW5nIGVuYWJsZWQuXG4gICAgICovXG4gICAgdGhlbWVTY3JvbGxiYXJzKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuICghIXRoaXMuX3NldHRpbmdzLmNvbXBvc2l0ZVsndGhlbWUtc2Nyb2xsYmFycyddICYmXG4gICAgICAgICAgICAhIXRoaXMuX3RoZW1lc1tuYW1lXS50aGVtZVNjcm9sbGJhcnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUZXN0IGlmIHRoZSB1c2VyIGhhcyBzY3JvbGxiYXIgc3R5bGluZyBlbmFibGVkLlxuICAgICAqL1xuICAgIGlzVG9nZ2xlZFRoZW1lU2Nyb2xsYmFycygpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fc2V0dGluZ3MuY29tcG9zaXRlWyd0aGVtZS1zY3JvbGxiYXJzJ107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSB0aGUgYHRoZW1lLXNjcm9sbGJhcnNgIHNldHRpbmcuXG4gICAgICovXG4gICAgdG9nZ2xlVGhlbWVTY3JvbGxiYXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3Muc2V0KCd0aGVtZS1zY3JvbGxiYXJzJywgIXRoaXMuX3NldHRpbmdzLmNvbXBvc2l0ZVsndGhlbWUtc2Nyb2xsYmFycyddKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkaXNwbGF5IG5hbWUgb2YgdGhlIHRoZW1lLlxuICAgICAqL1xuICAgIGdldERpc3BsYXlOYW1lKG5hbWUpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgcmV0dXJuIChfYiA9IChfYSA9IHRoaXMuX3RoZW1lc1tuYW1lXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRpc3BsYXlOYW1lKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBuYW1lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGFuZ2UgYSBmb250IHNpemUgYnkgYSBwb3NpdGl2ZSBvciBuZWdhdGl2ZSBpbmNyZW1lbnQuXG4gICAgICovXG4gICAgX2luY3JGb250U2l6ZShrZXksIGFkZCA9IHRydWUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyBnZXQgdGhlIG51bWVyaWMgYW5kIHVuaXQgcGFydHMgb2YgdGhlIGN1cnJlbnQgZm9udCBzaXplXG4gICAgICAgIGNvbnN0IHBhcnRzID0gKChfYSA9IHRoaXMuZ2V0Q1NTKGtleSkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcxM3B4Jykuc3BsaXQoLyhbYS16QS1aXSspLyk7XG4gICAgICAgIC8vIGRldGVybWluZSB0aGUgaW5jcmVtZW50XG4gICAgICAgIGNvbnN0IGluY3IgPSAoYWRkID8gMSA6IC0xKSAqIChwYXJ0c1sxXSA9PT0gJ2VtJyA/IDAuMSA6IDEpO1xuICAgICAgICAvLyBpbmNyZW1lbnQgdGhlIGZvbnQgc2l6ZSBhbmQgc2V0IGl0IGFzIGFuIG92ZXJyaWRlXG4gICAgICAgIHJldHVybiB0aGlzLnNldENTU092ZXJyaWRlKGtleSwgYCR7TnVtYmVyKHBhcnRzWzBdKSArIGluY3J9JHtwYXJ0c1sxXX1gKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUga2V5IC0+IHByb3BlcnR5IGRpY3QgZm9yIHRoZSBvdmVycmlkZXNcbiAgICAgKi9cbiAgICBfaW5pdE92ZXJyaWRlUHJvcHMoKSB7XG4gICAgICAgIGNvbnN0IGRlZmluaXRpb25zID0gdGhpcy5fc2V0dGluZ3Muc2NoZW1hLmRlZmluaXRpb25zO1xuICAgICAgICBjb25zdCBvdmVyaWRlc1NjaGVtYSA9IGRlZmluaXRpb25zLmNzc092ZXJyaWRlcy5wcm9wZXJ0aWVzO1xuICAgICAgICBPYmplY3Qua2V5cyhvdmVyaWRlc1NjaGVtYSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgLy8gb3ZlcnJpZGUgdmFsaWRhdGlvbiBpcyBhZ2FpbnN0IHRoZSBDU1MgcHJvcGVydHkgaW4gdGhlIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAvLyBmaWVsZC4gRXhhbXBsZTogZm9yIGtleSB1aS1mb250LWZhbWlseSwgLmRlc2NyaXB0aW9uIGlzIGZvbnQtZmFtaWx5XG4gICAgICAgICAgICB0aGlzLl9vdmVycmlkZVByb3BzW2tleV0gPSBvdmVyaWRlc1NjaGVtYVtrZXldLmRlc2NyaXB0aW9uO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBjdXJyZW50IHNldHRpbmdzLlxuICAgICAqL1xuICAgIF9sb2FkU2V0dGluZ3MoKSB7XG4gICAgICAgIGNvbnN0IG91dHN0YW5kaW5nID0gdGhpcy5fb3V0c3RhbmRpbmc7XG4gICAgICAgIGNvbnN0IHBlbmRpbmcgPSB0aGlzLl9wZW5kaW5nO1xuICAgICAgICBjb25zdCByZXF1ZXN0cyA9IHRoaXMuX3JlcXVlc3RzO1xuICAgICAgICAvLyBJZiBhbm90aGVyIHJlcXVlc3QgaXMgcGVuZGluZywgY2FuY2VsIGl0LlxuICAgICAgICBpZiAocGVuZGluZykge1xuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChwZW5kaW5nKTtcbiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmcgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5fc2V0dGluZ3M7XG4gICAgICAgIGNvbnN0IHRoZW1lcyA9IHRoaXMuX3RoZW1lcztcbiAgICAgICAgY29uc3QgdGhlbWUgPSBzZXR0aW5ncy5jb21wb3NpdGVbJ3RoZW1lJ107XG4gICAgICAgIC8vIElmIGFub3RoZXIgcHJvbWlzZSBpcyBvdXRzdGFuZGluZywgd2FpdCB1bnRpbCBpdCBmaW5pc2hlcyBiZWZvcmVcbiAgICAgICAgLy8gYXR0ZW1wdGluZyB0byBsb2FkIHRoZSBzZXR0aW5ncy4gQmVjYXVzZSBvdXRzdGFuZGluZyBwcm9taXNlcyBjYW5ub3RcbiAgICAgICAgLy8gYmUgYWJvcnRlZCwgdGhlIG9yZGVyIGluIHdoaWNoIHRoZXkgb2NjdXIgbXVzdCBiZSBlbmZvcmNlZC5cbiAgICAgICAgaWYgKG91dHN0YW5kaW5nKSB7XG4gICAgICAgICAgICBvdXRzdGFuZGluZ1xuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fb3V0c3RhbmRpbmcgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEluY3JlbWVudCB0aGUgcmVxdWVzdCBjb3VudGVyLlxuICAgICAgICByZXF1ZXN0c1t0aGVtZV0gPSByZXF1ZXN0c1t0aGVtZV0gPyByZXF1ZXN0c1t0aGVtZV0gKyAxIDogMTtcbiAgICAgICAgLy8gSWYgdGhlIHRoZW1lIGV4aXN0cywgbG9hZCBpdCByaWdodCBhd2F5LlxuICAgICAgICBpZiAodGhlbWVzW3RoZW1lXSkge1xuICAgICAgICAgICAgdGhpcy5fb3V0c3RhbmRpbmcgPSB0aGlzLl9sb2FkVGhlbWUodGhlbWUpO1xuICAgICAgICAgICAgZGVsZXRlIHJlcXVlc3RzW3RoZW1lXTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgcmVxdWVzdCBoYXMgdGFrZW4gdG9vIGxvbmcsIGdpdmUgdXAuXG4gICAgICAgIGlmIChyZXF1ZXN0c1t0aGVtZV0gPiBSRVFVRVNUX1RIUkVTSE9MRCkge1xuICAgICAgICAgICAgY29uc3QgZmFsbGJhY2sgPSBzZXR0aW5ncy5kZWZhdWx0KCd0aGVtZScpO1xuICAgICAgICAgICAgLy8gU3RvcCB0cmFja2luZyB0aGUgcmVxdWVzdHMgZm9yIHRoaXMgdGhlbWUuXG4gICAgICAgICAgICBkZWxldGUgcmVxdWVzdHNbdGhlbWVdO1xuICAgICAgICAgICAgaWYgKCF0aGVtZXNbZmFsbGJhY2tdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25FcnJvcih0aGlzLl90cmFucy5fXygnTmVpdGhlciB0aGVtZSAlMSBub3IgZGVmYXVsdCAlMiBsb2FkZWQuJywgdGhlbWUsIGZhbGxiYWNrKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBDb3VsZCBub3QgbG9hZCB0aGVtZSAke3RoZW1lfSwgdXNpbmcgZGVmYXVsdCAke2ZhbGxiYWNrfS5gKTtcbiAgICAgICAgICAgIHRoaXMuX291dHN0YW5kaW5nID0gdGhpcy5fbG9hZFRoZW1lKGZhbGxiYWNrKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgdGhlbWUgZG9lcyBub3QgeWV0IGV4aXN0LCBhdHRlbXB0IHRvIHdhaXQgZm9yIGl0LlxuICAgICAgICB0aGlzLl9wZW5kaW5nID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbG9hZFNldHRpbmdzKCk7XG4gICAgICAgIH0sIFJFUVVFU1RfSU5URVJWQUwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb2FkIHRoZSB0aGVtZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIG1ldGhvZCBhc3N1bWVzIHRoYXQgdGhlIGB0aGVtZWAgZXhpc3RzLlxuICAgICAqL1xuICAgIF9sb2FkVGhlbWUodGhlbWUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5fY3VycmVudDtcbiAgICAgICAgY29uc3QgbGlua3MgPSB0aGlzLl9saW5rcztcbiAgICAgICAgY29uc3QgdGhlbWVzID0gdGhpcy5fdGhlbWVzO1xuICAgICAgICBjb25zdCBzcGxhc2ggPSB0aGlzLl9zcGxhc2hcbiAgICAgICAgICAgID8gdGhpcy5fc3BsYXNoLnNob3codGhlbWVzW3RoZW1lXS5pc0xpZ2h0KVxuICAgICAgICAgICAgOiBuZXcgRGlzcG9zYWJsZURlbGVnYXRlKCgpID0+IHVuZGVmaW5lZCk7XG4gICAgICAgIC8vIFVubG9hZCBhbnkgQ1NTIGZpbGVzIHRoYXQgaGF2ZSBiZWVuIGxvYWRlZC5cbiAgICAgICAgbGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgICAgIGlmIChsaW5rLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBsaW5rLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsaW5rcy5sZW5ndGggPSAwO1xuICAgICAgICBjb25zdCB0aGVtZVByb3BzID0gKF9hID0gdGhpcy5fc2V0dGluZ3Muc2NoZW1hLnByb3BlcnRpZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50aGVtZTtcbiAgICAgICAgaWYgKHRoZW1lUHJvcHMpIHtcbiAgICAgICAgICAgIHRoZW1lUHJvcHMuZW51bSA9IE9iamVjdC5rZXlzKHRoZW1lcykubWFwKHZhbHVlID0+IHsgdmFyIF9hOyByZXR1cm4gKF9hID0gdGhlbWVzW3ZhbHVlXS5kaXNwbGF5TmFtZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdmFsdWU7IH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVubG9hZCB0aGUgcHJldmlvdXNseSBsb2FkZWQgdGhlbWUuXG4gICAgICAgIGNvbnN0IG9sZCA9IGN1cnJlbnQgPyB0aGVtZXNbY3VycmVudF0udW5sb2FkKCkgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtvbGQsIHRoZW1lc1t0aGVtZV0ubG9hZCgpXSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnQgPSB0aGVtZTtcbiAgICAgICAgICAgIHRoaXMuX3RoZW1lQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgICAgICBuYW1lOiAndGhlbWUnLFxuICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBjdXJyZW50LFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiB0aGVtZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBOZWVkIHRvIGZvcmNlIGEgcmVkcmF3IG9mIHRoZSBhcHAgaGVyZSB0byBhdm9pZCBhIENocm9tZSByZW5kZXJpbmdcbiAgICAgICAgICAgIC8vIGJ1ZyB0aGF0IGNhbiBsZWF2ZSB0aGUgc2Nyb2xsYmFycyBpbiBhbiBpbnZhbGlkIHN0YXRlXG4gICAgICAgICAgICB0aGlzLl9ob3N0LmhpZGUoKTtcbiAgICAgICAgICAgIC8vIElmIHdlIGhpZGUvc2hvdyB0aGUgd2lkZ2V0IHRvbyBxdWlja2x5LCBubyByZWRyYXcgd2lsbCBoYXBwZW4uXG4gICAgICAgICAgICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgZGVsYXlzIHVudGlsIGFmdGVyIHRoZSBuZXh0IGZyYW1lIHJlbmRlci5cbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5faG9zdC5zaG93KCk7XG4gICAgICAgICAgICAgICAgUHJpdmF0ZS5maXRBbGwodGhpcy5faG9zdCk7XG4gICAgICAgICAgICAgICAgc3BsYXNoLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHJlYXNvbiA9PiB7XG4gICAgICAgICAgICB0aGlzLl9vbkVycm9yKHJlYXNvbik7XG4gICAgICAgICAgICBzcGxhc2guZGlzcG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgdGhlbWUgZXJyb3IuXG4gICAgICovXG4gICAgX29uRXJyb3IocmVhc29uKSB7XG4gICAgICAgIHZvaWQgc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICB0aXRsZTogdGhpcy5fdHJhbnMuX18oJ0Vycm9yIExvYWRpbmcgVGhlbWUnKSxcbiAgICAgICAgICAgIGJvZHk6IFN0cmluZyhyZWFzb24pLFxuICAgICAgICAgICAgYnV0dG9uczogW0RpYWxvZy5va0J1dHRvbih7IGxhYmVsOiB0aGlzLl90cmFucy5fXygnT0snKSB9KV1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgbW9kdWxlIHByaXZhdGUgZGF0YS5cbiAqL1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICAvKipcbiAgICAgKiBGaXQgYSB3aWRnZXQgYW5kIGFsbCBvZiBpdHMgY2hpbGRyZW4sIHJlY3Vyc2l2ZWx5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpdEFsbCh3aWRnZXQpIHtcbiAgICAgICAgZWFjaCh3aWRnZXQuY2hpbGRyZW4oKSwgZml0QWxsKTtcbiAgICAgICAgd2lkZ2V0LmZpdCgpO1xuICAgIH1cbiAgICBQcml2YXRlLmZpdEFsbCA9IGZpdEFsbDtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhlbWVtYW5hZ2VyLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuLyogdHNsaW50OmRpc2FibGUgKi9cbi8qKlxuICogVGhlIHNlc3Npb24gY29udGV4dCBkaWFsb2dzIHRva2VuLlxuICovXG5leHBvcnQgY29uc3QgSVNlc3Npb25Db250ZXh0RGlhbG9ncyA9IG5ldyBUb2tlbignQGp1cHl0ZXJsYWIvYXBwdXRpbHM6SVNlc3Npb25Db250ZXh0RGlhbG9ncycpO1xuLyogdHNsaW50OmVuYWJsZSAqL1xuLyogdHNsaW50OmRpc2FibGUgKi9cbi8qKlxuICogVGhlIHRoZW1lIG1hbmFnZXIgdG9rZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBJVGhlbWVNYW5hZ2VyID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi9hcHB1dGlsczpJVGhlbWVNYW5hZ2VyJyk7XG4vKipcbiAqIFRoZSBzYW5pdGl6ZXIgdG9rZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBJU2FuaXRpemVyID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi9hcHB1dGlsczpJU2FuaXRpemVyJyk7XG4vKipcbiAqIFRoZSB0b29sYmFyIHJlZ2lzdHJ5IHRva2VuLlxuICovXG5leHBvcnQgY29uc3QgSVRvb2xiYXJXaWRnZXRSZWdpc3RyeSA9IG5ldyBUb2tlbignQGp1cHl0ZXJsYWIvYXBwdXRpbHM6SVRvb2xiYXJXaWRnZXRSZWdpc3RyeScpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9rZW5zLmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGVMaXN0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvb2JzZXJ2YWJsZXMnO1xuaW1wb3J0IHsgU2V0dGluZ1JlZ2lzdHJ5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvc2V0dGluZ3JlZ2lzdHJ5JztcbmltcG9ydCB7IGZpbmRJbmRleCwgdG9BcnJheSB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCB7IEpTT05FeHQgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBEaWFsb2csIHNob3dEaWFsb2cgfSBmcm9tICcuLi9kaWFsb2cnO1xuLyoqXG4gKiBEZWZhdWx0IHRvb2xiYXIgaXRlbSByYW5rXG4gKlxuICogIyMjIyBOb3Rlc1xuICogVGhpcyB3aWxsIHBsYWNlIGl0ZW0ganVzdCBiZWZvcmUgdGhlIHdoaXRlIHNwYWNlciBpdGVtIGluIHRoZSBub3RlYm9vayB0b29sYmFyLlxuICovXG5jb25zdCBERUZBVUxUX1RPT0xCQVJfSVRFTV9SQU5LID0gNTA7XG4vKipcbiAqIERpc3BsYXkgd2FybmluZyB3aGVuIHRoZSB0b29sYmFyIGRlZmluaXRpb24gaGF2ZSBiZWVuIG1vZGlmaWVkLlxuICpcbiAqIEBwYXJhbSB0cmFucyBUcmFuc2xhdGlvbiBidW5kbGVcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZGlzcGxheUluZm9ybWF0aW9uKHRyYW5zKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc2hvd0RpYWxvZyh7XG4gICAgICAgIHRpdGxlOiB0cmFucy5fXygnSW5mb3JtYXRpb24nKSxcbiAgICAgICAgYm9keTogdHJhbnMuX18oJ1Rvb2xiYXIgY3VzdG9taXphdGlvbiBoYXMgY2hhbmdlZC4gWW91IHdpbGwgbmVlZCB0byByZWxvYWQgSnVweXRlckxhYiB0byBzZWUgdGhlIGNoYW5nZXMuJyksXG4gICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgIERpYWxvZy5jYW5jZWxCdXR0b24oKSxcbiAgICAgICAgICAgIERpYWxvZy5va0J1dHRvbih7IGxhYmVsOiB0cmFucy5fXygnUmVsb2FkJykgfSlcbiAgICAgICAgXVxuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuYnV0dG9uLmFjY2VwdCkge1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9XG59XG4vKipcbiAqIFNldCB0aGUgdG9vbGJhciBkZWZpbml0aW9uIGJ5IGFjY3VtdWxhdGluZyBhbGwgc2V0dGluZ3MgZGVmaW5pdGlvbi5cbiAqXG4gKiBUaGUgbGlzdCB3aWxsIGJlIHBvcHVsYXRlZCBvbmx5IHdpdGggdGhlIGVuYWJsZWQgaXRlbXMuXG4gKlxuICogQHBhcmFtIHRvb2xiYXJJdGVtcyBPYnNlcnZhYmxlIGxpc3QgdG8gcG9wdWxhdGVcbiAqIEBwYXJhbSByZWdpc3RyeSBBcHBsaWNhdGlvbiBzZXR0aW5ncyByZWdpc3RyeVxuICogQHBhcmFtIGZhY3RvcnlOYW1lIFdpZGdldCBmYWN0b3J5IG5hbWUgdGhhdCBuZWVkcyBhIHRvb2xiYXJcbiAqIEBwYXJhbSBwbHVnaW5JZCBTZXR0aW5ncyBwbHVnaW4gaWRcbiAqIEBwYXJhbSB0cmFuc2xhdG9yIFRyYW5zbGF0b3Igb2JqZWN0XG4gKiBAcGFyYW0gcHJvcGVydHlJZCBQcm9wZXJ0eSBob2xkaW5nIHRoZSB0b29sYmFyIGRlZmluaXRpb24gaW4gdGhlIHNldHRpbmdzOyBkZWZhdWx0ICd0b29sYmFyJ1xuICogQHJldHVybnMgTGlzdCBvZiB0b29sYmFyIGl0ZW1zXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHNldFRvb2xiYXJJdGVtcyh0b29sYmFySXRlbXMsIHJlZ2lzdHJ5LCBmYWN0b3J5TmFtZSwgcGx1Z2luSWQsIHRyYW5zbGF0b3IsIHByb3BlcnR5SWQgPSAndG9vbGJhcicpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICBsZXQgY2Fub25pY2FsO1xuICAgIGxldCBsb2FkZWQgPSB7fTtcbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZSB0aGUgcGx1Z2luJ3Mgc2NoZW1hIGRlZmF1bHRzLlxuICAgICAqXG4gICAgICogV2Uga2VlcCB0cmFjayBvZiBkaXNhYmxlZCBlbnRyaWVzIGluIGNhc2UgdGhlIHBsdWdpbiBpcyBsb2FkZWRcbiAgICAgKiBhZnRlciB0aGUgdG9vbGJhciBpbml0aWFsaXphdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZShzY2hlbWEpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgbG9hZGVkID0ge307XG4gICAgICAgIGNvbnN0IHBsdWdpbkRlZmF1bHRzID0gT2JqZWN0LmtleXMocmVnaXN0cnkucGx1Z2lucylcbiAgICAgICAgICAgIC5tYXAocGx1Z2luID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IChfYiA9ICgoX2EgPSByZWdpc3RyeS5wbHVnaW5zW3BsdWdpbl0uc2NoZW1hWydqdXB5dGVyLmxhYi50b29sYmFycyddKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB7fSlbZmFjdG9yeU5hbWVdKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBbXTtcbiAgICAgICAgICAgIGxvYWRlZFtwbHVnaW5dID0gaXRlbXM7XG4gICAgICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY29uY2F0KFsoX2IgPSAoKF9hID0gc2NoZW1hWydqdXB5dGVyLmxhYi50b29sYmFycyddKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB7fSlbZmFjdG9yeU5hbWVdKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBbXV0pXG4gICAgICAgICAgICAucmVkdWNlUmlnaHQoKGFjYywgdmFsKSA9PiBTZXR0aW5nUmVnaXN0cnkucmVjb25jaWxlVG9vbGJhckl0ZW1zKGFjYywgdmFsLCB0cnVlKSwgW10pO1xuICAgICAgICAvLyBBcHBseSBkZWZhdWx0IHZhbHVlIGFzIGxhc3Qgc3RlcCB0byB0YWtlIGludG8gYWNjb3VudCBvdmVycmlkZXMuanNvblxuICAgICAgICAvLyBUaGUgc3RhbmRhcmQgZGVmYXVsdCBiZWluZyBbXSBhcyB0aGUgcGx1Z2luIG11c3QgdXNlIGBqdXB5dGVyLmxhYi50b29sYmFycy48ZmFjdG9yeT5gXG4gICAgICAgIC8vIHRvIGRlZmluZSB0aGVpciBkZWZhdWx0IHZhbHVlLlxuICAgICAgICBzY2hlbWEucHJvcGVydGllc1twcm9wZXJ0eUlkXS5kZWZhdWx0ID0gU2V0dGluZ1JlZ2lzdHJ5LnJlY29uY2lsZVRvb2xiYXJJdGVtcyhwbHVnaW5EZWZhdWx0cywgc2NoZW1hLnByb3BlcnRpZXNbcHJvcGVydHlJZF0uZGVmYXVsdCwgdHJ1ZSkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIHJldHVybiAoKF9hID0gYS5yYW5rKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBERUZBVUxUX1RPT0xCQVJfSVRFTV9SQU5LKSAtXG4gICAgICAgICAgICAgICAgKChfYiA9IGIucmFuaykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogREVGQVVMVF9UT09MQkFSX0lURU1fUkFOSyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBUcmFuc2Zvcm0gdGhlIHBsdWdpbiBvYmplY3QgdG8gcmV0dXJuIGRpZmZlcmVudCBzY2hlbWEgdGhhbiB0aGUgZGVmYXVsdC5cbiAgICByZWdpc3RyeS50cmFuc2Zvcm0ocGx1Z2luSWQsIHtcbiAgICAgICAgY29tcG9zZTogcGx1Z2luID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2U7XG4gICAgICAgICAgICAvLyBPbmx5IG92ZXJyaWRlIHRoZSBjYW5vbmljYWwgc2NoZW1hIHRoZSBmaXJzdCB0aW1lLlxuICAgICAgICAgICAgaWYgKCFjYW5vbmljYWwpIHtcbiAgICAgICAgICAgICAgICBjYW5vbmljYWwgPSBKU09ORXh0LmRlZXBDb3B5KHBsdWdpbi5zY2hlbWEpO1xuICAgICAgICAgICAgICAgIHBvcHVsYXRlKGNhbm9uaWNhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0cyA9IChfYyA9ICgoX2IgPSAoKF9hID0gY2Fub25pY2FsLnByb3BlcnRpZXMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHt9KVtwcm9wZXJ0eUlkXSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDoge30pLmRlZmF1bHQpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IFtdO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgc2V0dGluZ3NcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBwbHVnaW4uZGF0YS51c2VyO1xuICAgICAgICAgICAgY29uc3QgY29tcG9zaXRlID0gcGx1Z2luLmRhdGEuY29tcG9zaXRlO1xuICAgICAgICAgICAgLy8gT3ZlcnJpZGVzIHRoZSB2YWx1ZSB3aXRoIHVzaW5nIHRoZSBhZ2dyZWdhdGVkIGRlZmF1bHQgZm9yIHRoZSB0b29sYmFyIHByb3BlcnR5XG4gICAgICAgICAgICB1c2VyW3Byb3BlcnR5SWRdID0gKF9kID0gcGx1Z2luLmRhdGEudXNlcltwcm9wZXJ0eUlkXSkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogW107XG4gICAgICAgICAgICBjb21wb3NpdGVbcHJvcGVydHlJZF0gPSAoKF9lID0gU2V0dGluZ1JlZ2lzdHJ5LnJlY29uY2lsZVRvb2xiYXJJdGVtcyhkZWZhdWx0cywgdXNlcltwcm9wZXJ0eUlkXSwgZmFsc2UpKSAhPT0gbnVsbCAmJiBfZSAhPT0gdm9pZCAwID8gX2UgOiBbXSkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoX2EgPSBhLnJhbmspICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IERFRkFVTFRfVE9PTEJBUl9JVEVNX1JBTkspIC1cbiAgICAgICAgICAgICAgICAgICAgKChfYiA9IGIucmFuaykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogREVGQVVMVF9UT09MQkFSX0lURU1fUkFOSyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBsdWdpbi5kYXRhID0geyBjb21wb3NpdGUsIHVzZXIgfTtcbiAgICAgICAgICAgIHJldHVybiBwbHVnaW47XG4gICAgICAgIH0sXG4gICAgICAgIGZldGNoOiBwbHVnaW4gPT4ge1xuICAgICAgICAgICAgLy8gT25seSBvdmVycmlkZSB0aGUgY2Fub25pY2FsIHNjaGVtYSB0aGUgZmlyc3QgdGltZS5cbiAgICAgICAgICAgIGlmICghY2Fub25pY2FsKSB7XG4gICAgICAgICAgICAgICAgY2Fub25pY2FsID0gSlNPTkV4dC5kZWVwQ29weShwbHVnaW4uc2NoZW1hKTtcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZShjYW5vbmljYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkYXRhOiBwbHVnaW4uZGF0YSxcbiAgICAgICAgICAgICAgICBpZDogcGx1Z2luLmlkLFxuICAgICAgICAgICAgICAgIHJhdzogcGx1Z2luLnJhdyxcbiAgICAgICAgICAgICAgICBzY2hlbWE6IGNhbm9uaWNhbCxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBwbHVnaW4udmVyc2lvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIFJlcG9wdWxhdGUgdGhlIGNhbm9uaWNhbCB2YXJpYWJsZSBhZnRlciB0aGUgc2V0dGluZyByZWdpc3RyeSBoYXNcbiAgICAvLyBwcmVsb2FkZWQgYWxsIGluaXRpYWwgcGx1Z2lucy5cbiAgICBjYW5vbmljYWwgPSBudWxsO1xuICAgIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgcmVnaXN0cnkubG9hZChwbHVnaW5JZCk7XG4gICAgLy8gUmVhY3QgdG8gY3VzdG9taXphdGlvbiBieSB0aGUgdXNlclxuICAgIHNldHRpbmdzLmNoYW5nZWQuY29ubmVjdCgoKSA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgbmV3SXRlbXMgPSAoX2EgPSBzZXR0aW5ncy5jb21wb3NpdGVbcHJvcGVydHlJZF0pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdO1xuICAgICAgICB0cmFuc2ZlclNldHRpbmdzKG5ld0l0ZW1zKTtcbiAgICB9KTtcbiAgICAvLyBSZWFjdCB0byBwbHVnaW4gY2hhbmdlc1xuICAgIHJlZ2lzdHJ5LnBsdWdpbkNoYW5nZWQuY29ubmVjdChhc3luYyAoc2VuZGVyLCBwbHVnaW4pID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICAvLyBBcyB0aGUgcGx1Z2luIHN0b3JpbmcgdGhlIHRvb2xiYXIgZGVmaW5pdGlvbiBpcyB0cmFuc2Zvcm1lZCB1c2luZ1xuICAgICAgICAvLyB0aGUgYWJvdmUgZGVmaW5pdGlvbiwgaWYgaXQgY2hhbmdlcywgdGhpcyBtZWFucyB0aGF0IGEgcmVxdWVzdCB0b1xuICAgICAgICAvLyByZWxvYWRlZCB3YXMgdHJpZ2dlcmVkLiBIZW5jZSB0aGUgdG9vbGJhciBkZWZpbml0aW9ucyBmcm9tIHRoZSBvdGhlclxuICAgICAgICAvLyBwbHVnaW5zIGhhcyBiZWVuIGF1dG9tYXRpY2FsbHkgcmVzZXQgZHVyaW5nIHRoZSB0cmFuc2Zvcm0gc3RlcC5cbiAgICAgICAgaWYgKHBsdWdpbiAhPT0gcGx1Z2luSWQpIHtcbiAgICAgICAgICAgIC8vIElmIGEgcGx1Z2luIGNoYW5nZWQgaXRzIHRvb2xiYXIgaXRlbXNcbiAgICAgICAgICAgIGNvbnN0IG9sZEl0ZW1zID0gKF9hID0gbG9hZGVkW3BsdWdpbl0pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdO1xuICAgICAgICAgICAgY29uc3QgbmV3SXRlbXMgPSAoX2MgPSAoKF9iID0gcmVnaXN0cnkucGx1Z2luc1twbHVnaW5dLnNjaGVtYVsnanVweXRlci5sYWIudG9vbGJhcnMnXSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDoge30pW2ZhY3RvcnlOYW1lXSkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogW107XG4gICAgICAgICAgICBpZiAoIUpTT05FeHQuZGVlcEVxdWFsKG9sZEl0ZW1zLCBuZXdJdGVtcykpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9hZGVkW3BsdWdpbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHBsdWdpbiBoYXMgY2hhbmdlZCwgcmVxdWVzdCB0aGUgdXNlciB0byByZWxvYWQgdGhlIFVJXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRpc3BsYXlJbmZvcm1hdGlvbih0cmFucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgcGx1Z2luIHdhcyBub3QgeWV0IGxvYWRlZCA9PiB1cGRhdGUgdGhlIHRvb2xiYXIgaXRlbXMgbGlzdFxuICAgICAgICAgICAgICAgICAgICBsb2FkZWRbcGx1Z2luXSA9IEpTT05FeHQuZGVlcENvcHkobmV3SXRlbXMpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdMaXN0ID0gKChfZCA9IFNldHRpbmdSZWdpc3RyeS5yZWNvbmNpbGVUb29sYmFySXRlbXModG9BcnJheSh0b29sYmFySXRlbXMpLCBuZXdJdGVtcywgZmFsc2UpKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiBbXSkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoKF9hID0gYS5yYW5rKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBERUZBVUxUX1RPT0xCQVJfSVRFTV9SQU5LKSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKChfYiA9IGIucmFuaykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogREVGQVVMVF9UT09MQkFSX0lURU1fUkFOSyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2ZlclNldHRpbmdzKG5ld0xpc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHRyYW5zZmVyU2V0dGluZ3MgPSAobmV3SXRlbXMpID0+IHtcbiAgICAgICAgLy8gVGhpcyBpcyBub3Qgb3B0aW1hbCBidXQgc2FmZXIgYmVjYXVzZSBhIHRvb2xiYXIgaXRlbSB3aXRoIHRoZSBzYW1lXG4gICAgICAgIC8vIG5hbWUgY2Fubm90IGJlIGluc2VydGVkIChpdCB3aWxsIGJlIGEgbm8tb3ApLiBCdXQgdGhhdCBjb3VsZCBoYXBwZW5cbiAgICAgICAgLy8gaWYgdGhlIHNldHRpbmdzIGFyZSBjaGFuZ2luZyB0aGUgaXRlbXMgb3JkZXIuXG4gICAgICAgIHRvb2xiYXJJdGVtcy5jbGVhcigpO1xuICAgICAgICB0b29sYmFySXRlbXMucHVzaEFsbChuZXdJdGVtcy5maWx0ZXIoaXRlbSA9PiAhaXRlbS5kaXNhYmxlZCkpO1xuICAgIH07XG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgdG9vbGJhclxuICAgIHRyYW5zZmVyU2V0dGluZ3MoKF9hID0gc2V0dGluZ3MuY29tcG9zaXRlW3Byb3BlcnR5SWRdKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXSk7XG59XG4vKipcbiAqIENyZWF0ZSB0aGUgdG9vbGJhciBmYWN0b3J5IGZvciBhIGdpdmVuIGNvbnRhaW5lciB3aWRnZXQgYmFzZWRcbiAqIG9uIGEgZGF0YSBkZXNjcmlwdGlvbiBzdG9yZWQgaW4gc2V0dGluZ3NcbiAqXG4gKiBAcGFyYW0gdG9vbGJhclJlZ2lzdHJ5IFRvb2xiYXIgd2lkZ2V0cyByZWdpc3RyeVxuICogQHBhcmFtIHNldHRpbmdzUmVnaXN0cnkgU2V0dGluZ3MgcmVnaXN0cnlcbiAqIEBwYXJhbSBmYWN0b3J5TmFtZSBUb29sYmFyIGNvbnRhaW5lciBmYWN0b3J5IG5hbWVcbiAqIEBwYXJhbSBwbHVnaW5JZCBTZXR0aW5ncyBwbHVnaW4gaWRcbiAqIEBwYXJhbSB0cmFuc2xhdG9yIFRyYW5zbGF0b3JcbiAqIEBwYXJhbSBwcm9wZXJ0eUlkIFRvb2xiYXIgZGVmaW5pdGlvbiBrZXkgaW4gdGhlIHNldHRpbmdzIHBsdWdpblxuICogQHJldHVybnMgTGlzdCBvZiB0b29sYmFyIHdpZGdldHMgZmFjdG9yeVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVG9vbGJhckZhY3RvcnkodG9vbGJhclJlZ2lzdHJ5LCBzZXR0aW5nc1JlZ2lzdHJ5LCBmYWN0b3J5TmFtZSwgcGx1Z2luSWQsIHRyYW5zbGF0b3IsIHByb3BlcnR5SWQgPSAndG9vbGJhcicpIHtcbiAgICBjb25zdCBpdGVtcyA9IG5ldyBPYnNlcnZhYmxlTGlzdCh7XG4gICAgICAgIGl0ZW1DbXA6IChhLCBiKSA9PiBKU09ORXh0LmRlZXBFcXVhbChhLCBiKVxuICAgIH0pO1xuICAgIC8vIEdldCB0b29sYmFyIGRlZmluaXRpb24gZnJvbSB0aGUgc2V0dGluZ3NcbiAgICBzZXRUb29sYmFySXRlbXMoaXRlbXMsIHNldHRpbmdzUmVnaXN0cnksIGZhY3RvcnlOYW1lLCBwbHVnaW5JZCwgdHJhbnNsYXRvciwgcHJvcGVydHlJZCkuY2F0Y2gocmVhc29uID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIGxvYWQgdG9vbGJhciBpdGVtcyBmb3IgZmFjdG9yeSAke2ZhY3RvcnlOYW1lfSBmcm9tICR7cGx1Z2luSWR9YCwgcmVhc29uKTtcbiAgICB9KTtcbiAgICByZXR1cm4gKHdpZGdldCkgPT4ge1xuICAgICAgICBjb25zdCB1cGRhdGVUb29sYmFyID0gKGxpc3QsIGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChjaGFuZ2UudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vdmUnOlxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyLm1vdmUoY2hhbmdlLm9sZEluZGV4LCBjaGFuZ2UubmV3SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhZGQnOlxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2UubmV3VmFsdWVzLmZvckVhY2goaXRlbSA9PiB0b29sYmFyLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiB0b29sYmFyUmVnaXN0cnkuY3JlYXRlV2lkZ2V0KGZhY3RvcnlOYW1lLCB3aWRnZXQsIGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlLm9sZFZhbHVlcy5mb3JFYWNoKCgpID0+IHRvb2xiYXIucmVtb3ZlKGNoYW5nZS5vbGRJbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzZXQnOlxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2UubmV3VmFsdWVzLmZvckVhY2goaXRlbSA9PiB0b29sYmFyLnNldChjaGFuZ2UubmV3SW5kZXgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogdG9vbGJhclJlZ2lzdHJ5LmNyZWF0ZVdpZGdldChmYWN0b3J5TmFtZSwgd2lkZ2V0LCBpdGVtKVxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB0b29sYmFyID0gbmV3IE9ic2VydmFibGVMaXN0KHtcbiAgICAgICAgICAgIHZhbHVlczogdG9BcnJheShpdGVtcykubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiB0b29sYmFyUmVnaXN0cnkuY3JlYXRlV2lkZ2V0KGZhY3RvcnlOYW1lLCB3aWRnZXQsIGl0ZW0pXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBpdGVtcy5jaGFuZ2VkLmNvbm5lY3QodXBkYXRlVG9vbGJhcik7XG4gICAgICAgIHdpZGdldC5kaXNwb3NlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGl0ZW1zLmNoYW5nZWQuZGlzY29ubmVjdCh1cGRhdGVUb29sYmFyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0b29sYmFyO1xuICAgIH07XG59XG4vKipcbiAqIFNldCB0aGUgdG9vbGJhciBpdGVtcyBvZiBhIHdpZGdldCBmcm9tIGEgZmFjdG9yeVxuICpcbiAqIEBwYXJhbSB3aWRnZXQgV2lkZ2V0IHdpdGggdGhlIHRvb2xiYXIgdG8gc2V0XG4gKiBAcGFyYW0gZmFjdG9yeSBUb29sYmFyIGl0ZW1zIGZhY3RvcnlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFRvb2xiYXIod2lkZ2V0LCBmYWN0b3J5KSB7XG4gICAgaWYgKCF3aWRnZXQudG9vbGJhcikge1xuICAgICAgICBjb25zb2xlLmxvZyhgV2lkZ2V0ICR7d2lkZ2V0LmlkfSBoYXMgbm8gJ3Rvb2xiYXInLmApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGl0ZW1zID0gZmFjdG9yeSh3aWRnZXQpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW1zKSkge1xuICAgICAgICBpdGVtcy5mb3JFYWNoKCh7IG5hbWUsIHdpZGdldDogaXRlbSB9KSA9PiB7XG4gICAgICAgICAgICB3aWRnZXQudG9vbGJhci5hZGRJdGVtKG5hbWUsIGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZVRvb2xiYXIgPSAobGlzdCwgY2hhbmdlcykgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChjaGFuZ2VzLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdhZGQnOlxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VzLm5ld1ZhbHVlcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnRvb2xiYXIuaW5zZXJ0SXRlbShjaGFuZ2VzLm5ld0luZGV4ICsgaW5kZXgsIGl0ZW0ubmFtZSwgaXRlbS53aWRnZXQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZXMub2xkVmFsdWVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLndpZGdldC5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlcy5uZXdWYWx1ZXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC50b29sYmFyLmluc2VydEl0ZW0oY2hhbmdlcy5uZXdJbmRleCArIGluZGV4LCBpdGVtLm5hbWUsIGl0ZW0ud2lkZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZXMub2xkVmFsdWVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLndpZGdldC5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2V0JzpcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlcy5vbGRWYWx1ZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ud2lkZ2V0LnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VzLm5ld1ZhbHVlcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdJbmRleCA9IGZpbmRJbmRleCh3aWRnZXQudG9vbGJhci5uYW1lcygpLCBuYW1lID0+IGl0ZW0ubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9BcnJheSh3aWRnZXQudG9vbGJhci5jaGlsZHJlbigpKVtleGlzdGluZ0luZGV4XS5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LnRvb2xiYXIuaW5zZXJ0SXRlbShjaGFuZ2VzLm5ld0luZGV4ICsgaW5kZXgsIGl0ZW0ubmFtZSwgaXRlbS53aWRnZXQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHVwZGF0ZVRvb2xiYXIoaXRlbXMsIHtcbiAgICAgICAgICAgIG5ld0luZGV4OiAwLFxuICAgICAgICAgICAgbmV3VmFsdWVzOiB0b0FycmF5KGl0ZW1zKSxcbiAgICAgICAgICAgIG9sZEluZGV4OiAwLFxuICAgICAgICAgICAgb2xkVmFsdWVzOiBbXSxcbiAgICAgICAgICAgIHR5cGU6ICdhZGQnXG4gICAgICAgIH0pO1xuICAgICAgICBpdGVtcy5jaGFuZ2VkLmNvbm5lY3QodXBkYXRlVG9vbGJhcik7XG4gICAgICAgIHdpZGdldC5kaXNwb3NlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGl0ZW1zLmNoYW5nZWQuZGlzY29ubmVjdCh1cGRhdGVUb29sYmFyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmFjdG9yeS5qcy5tYXAiLCJleHBvcnQgKiBmcm9tICcuL2ZhY3RvcnknO1xuZXhwb3J0ICogZnJvbSAnLi9yZWdpc3RyeSc7XG5leHBvcnQgKiBmcm9tICcuL3dpZGdldCc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJpbXBvcnQgeyBMYWJJY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuaW1wb3J0IHsgQ29tbWFuZFRvb2xiYXJCdXR0b24sIFRvb2xiYXIgfSBmcm9tICcuL3dpZGdldCc7XG4vKipcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIElUb29sYmFyV2lkZ2V0UmVnaXN0cnkgaW50ZXJmYWNlXG4gKi9cbmV4cG9ydCBjbGFzcyBUb29sYmFyV2lkZ2V0UmVnaXN0cnkge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fd2lkZ2V0cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fZGVmYXVsdEZhY3RvcnkgPSBvcHRpb25zLmRlZmF1bHRGYWN0b3J5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHRvb2xiYXIgaXRlbSBmYWN0b3J5XG4gICAgICovXG4gICAgZ2V0IGRlZmF1bHRGYWN0b3J5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdEZhY3Rvcnk7XG4gICAgfVxuICAgIHNldCBkZWZhdWx0RmFjdG9yeShmYWN0b3J5KSB7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRGYWN0b3J5ID0gZmFjdG9yeTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgdG9vbGJhciBpdGVtIHdpZGdldFxuICAgICAqXG4gICAgICogQHBhcmFtIHdpZGdldEZhY3RvcnkgVGhlIHdpZGdldCBmYWN0b3J5IG5hbWUgdGhhdCBjcmVhdGVzIHRoZSB0b29sYmFyXG4gICAgICogQHBhcmFtIHdpZGdldCBUaGUgbmV3bHkgd2lkZ2V0IGNvbnRhaW5pbmcgdGhlIHRvb2xiYXJcbiAgICAgKiBAcGFyYW0gdG9vbGJhckl0ZW0gVGhlIHRvb2xiYXIgaXRlbSBkZWZpbml0aW9uXG4gICAgICogQHJldHVybnMgVGhlIHdpZGdldCB0byBiZSBpbnNlcnRlZCBpbiB0aGUgdG9vbGJhci5cbiAgICAgKi9cbiAgICBjcmVhdGVXaWRnZXQod2lkZ2V0RmFjdG9yeSwgd2lkZ2V0LCB0b29sYmFySXRlbSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSAoX2EgPSB0aGlzLl93aWRnZXRzLmdldCh3aWRnZXRGYWN0b3J5KSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldCh0b29sYmFySXRlbS5uYW1lKTtcbiAgICAgICAgcmV0dXJuIGZhY3RvcnlcbiAgICAgICAgICAgID8gZmFjdG9yeSh3aWRnZXQpXG4gICAgICAgICAgICA6IHRoaXMuX2RlZmF1bHRGYWN0b3J5KHdpZGdldEZhY3RvcnksIHdpZGdldCwgdG9vbGJhckl0ZW0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBhIG5ldyB0b29sYmFyIGl0ZW0gZmFjdG9yeVxuICAgICAqXG4gICAgICogQHBhcmFtIHdpZGdldEZhY3RvcnkgVGhlIHdpZGdldCBmYWN0b3J5IG5hbWUgdGhhdCBjcmVhdGVzIHRoZSB0b29sYmFyXG4gICAgICogQHBhcmFtIHRvb2xiYXJJdGVtTmFtZSBUaGUgdW5pcXVlIHRvb2xiYXIgaXRlbVxuICAgICAqIEBwYXJhbSBmYWN0b3J5IFRoZSBmYWN0b3J5IGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgdGhlIHdpZGdldCBjb250YWluaW5nIHRoZSB0b29sYmFyIGFuZCByZXR1cm5zIHRoZSB0b29sYmFyIHdpZGdldC5cbiAgICAgKiBAcmV0dXJucyBUaGUgcHJldmlvdXNseSBkZWZpbmVkIGZhY3RvcnlcbiAgICAgKi9cbiAgICByZWdpc3RlckZhY3Rvcnkod2lkZ2V0RmFjdG9yeSwgdG9vbGJhckl0ZW1OYW1lLCBmYWN0b3J5KSB7XG4gICAgICAgIGxldCBuYW1lc3BhY2UgPSB0aGlzLl93aWRnZXRzLmdldCh3aWRnZXRGYWN0b3J5KTtcbiAgICAgICAgY29uc3Qgb2xkRmFjdG9yeSA9IG5hbWVzcGFjZSA9PT0gbnVsbCB8fCBuYW1lc3BhY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5hbWVzcGFjZS5nZXQodG9vbGJhckl0ZW1OYW1lKTtcbiAgICAgICAgaWYgKCFuYW1lc3BhY2UpIHtcbiAgICAgICAgICAgIG5hbWVzcGFjZSA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuX3dpZGdldHMuc2V0KHdpZGdldEZhY3RvcnksIG5hbWVzcGFjZSk7XG4gICAgICAgIH1cbiAgICAgICAgbmFtZXNwYWNlLnNldCh0b29sYmFySXRlbU5hbWUsIGZhY3RvcnkpO1xuICAgICAgICByZXR1cm4gb2xkRmFjdG9yeTtcbiAgICB9XG59XG4vKipcbiAqIENyZWF0ZSB0aGUgZGVmYXVsdCB0b29sYmFyIGl0ZW0gd2lkZ2V0IGZhY3RvcnlcbiAqXG4gKiBAcGFyYW0gY29tbWFuZHMgQXBwbGljYXRpb24gY29tbWFuZHMgcmVnaXN0cnlcbiAqIEByZXR1cm5zIERlZmF1bHQgZmFjdG9yeVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGVmYXVsdEZhY3RvcnkoY29tbWFuZHMpIHtcbiAgICByZXR1cm4gKHdpZGdldEZhY3RvcnksIHdpZGdldCwgdG9vbGJhckl0ZW0pID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBzd2l0Y2ggKChfYSA9IHRvb2xiYXJJdGVtLnR5cGUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICdjb21tYW5kJykge1xuICAgICAgICAgICAgY2FzZSAnY29tbWFuZCc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGNvbW1hbmQ6IHRJZCwgYXJnczogdEFyZ3MsIGxhYmVsOiB0TGFiZWwsIGljb246IHRJY29uIH0gPSB0b29sYmFySXRlbTtcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IHRJZCAhPT0gbnVsbCAmJiB0SWQgIT09IHZvaWQgMCA/IHRJZCA6ICcnO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBPYmplY3QuYXNzaWduKHsgdG9vbGJhcjogdHJ1ZSB9LCB0QXJncyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaWNvbiA9IHRJY29uID8gTGFiSWNvbi5yZXNvbHZlKHsgaWNvbjogdEljb24gfSkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYW4gaWNvbiwgdW5kZWZpbmVkIGxhYmVsIHdpbGwgcmVzdWx0cyBpbiBubyBsYWJlbFxuICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSB0aGUgbGFiZWwgd2lsbCBiZSBzZXQgdXNpbmcgdGhlIHNldHRpbmcgb3IgdGhlIGNvbW1hbmQgbGFiZWxcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IChpY29uICE9PSBudWxsICYmIGljb24gIT09IHZvaWQgMCA/IGljb24gOiBjb21tYW5kcy5pY29uKGlkLCBhcmdzKSkgPyB0TGFiZWwgIT09IG51bGwgJiYgdExhYmVsICE9PSB2b2lkIDAgPyB0TGFiZWwgOiAnJyA6IHRMYWJlbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbW1hbmRUb29sYmFyQnV0dG9uKHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZHMsXG4gICAgICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgICAgICBhcmdzLFxuICAgICAgICAgICAgICAgICAgICBpY29uLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnc3BhY2VyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gVG9vbGJhci5jcmVhdGVTcGFjZXJJdGVtKCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgV2lkZ2V0KCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVnaXN0cnkuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBCdXR0b24sIGNpcmNsZUVtcHR5SWNvbiwgY2lyY2xlSWNvbiwgY2xhc3NlcywgZWxsaXBzZXNJY29uLCBMYWJJY29uLCBvZmZsaW5lQm9sdEljb24sIHJlZnJlc2hJY29uLCBzdG9wSWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgZmluZCwgbWFwLCBzb21lIH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IHsgQ29tbWFuZFJlZ2lzdHJ5IH0gZnJvbSAnQGx1bWluby9jb21tYW5kcyc7XG5pbXBvcnQgeyBNZXNzYWdlTG9vcCB9IGZyb20gJ0BsdW1pbm8vbWVzc2FnaW5nJztcbmltcG9ydCB7IEF0dGFjaGVkUHJvcGVydHkgfSBmcm9tICdAbHVtaW5vL3Byb3BlcnRpZXMnO1xuaW1wb3J0IHsgUGFuZWxMYXlvdXQsIFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzZXNzaW9uQ29udGV4dERpYWxvZ3MgfSBmcm9tICcuLi9zZXNzaW9uY29udGV4dCc7XG5pbXBvcnQgeyB0cmFuc2xhdGVLZXJuZWxTdGF0dXNlcyB9IGZyb20gJy4uL2tlcm5lbHN0YXR1c2VzJztcbmltcG9ydCB7IFJlYWN0V2lkZ2V0LCBVc2VTaWduYWwgfSBmcm9tICcuLi92ZG9tJztcbmltcG9ydCB7IFRocm90dGxlciB9IGZyb20gJ0BsdW1pbm8vcG9sbGluZyc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRvb2xiYXJzLlxuICovXG5jb25zdCBUT09MQkFSX0NMQVNTID0gJ2pwLVRvb2xiYXInO1xuLyoqXG4gKiBUb29sYmFyIHBvcC11cCBvcGVuZXIgYnV0dG9uIG5hbWVcbiAqL1xuY29uc3QgVE9PTEJBUl9PUEVORVJfTkFNRSA9ICd0b29sYmFyLXBvcHVwLW9wZW5lcic7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRvb2xiYXIgaXRlbXMuXG4gKi9cbmNvbnN0IFRPT0xCQVJfSVRFTV9DTEFTUyA9ICdqcC1Ub29sYmFyLWl0ZW0nO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byB0b29sYmFyIGtlcm5lbCBuYW1lIHRleHQuXG4gKi9cbmNvbnN0IFRPT0xCQVJfS0VSTkVMX05BTUVfQ0xBU1MgPSAnanAtVG9vbGJhci1rZXJuZWxOYW1lJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdG9vbGJhciBzcGFjZXIuXG4gKi9cbmNvbnN0IFRPT0xCQVJfU1BBQ0VSX0NMQVNTID0gJ2pwLVRvb2xiYXItc3BhY2VyJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdG9vbGJhciBrZXJuZWwgc3RhdHVzIGljb24uXG4gKi9cbmNvbnN0IFRPT0xCQVJfS0VSTkVMX1NUQVRVU19DTEFTUyA9ICdqcC1Ub29sYmFyLWtlcm5lbFN0YXR1cyc7XG4vKipcbiAqIEEgbGF5b3V0IGZvciB0b29sYmFycy5cbiAqXG4gKiAjIyMjIE5vdGVzXG4gKiBUaGlzIGxheW91dCBhdXRvbWF0aWNhbGx5IGNvbGxhcHNlcyBpdHMgaGVpZ2h0IGlmIHRoZXJlIGFyZSBubyB2aXNpYmxlXG4gKiB0b29sYmFyIHdpZGdldHMsIGFuZCBleHBhbmRzIHRvIHRoZSBzdGFuZGFyZCB0b29sYmFyIGhlaWdodCBpZiB0aGVyZSBhcmVcbiAqIHZpc2libGUgdG9vbGJhciB3aWRnZXRzLlxuICovXG5jbGFzcyBUb29sYmFyTGF5b3V0IGV4dGVuZHMgUGFuZWxMYXlvdXQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLl9kaXJ0eSA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIG1lc3NhZ2UgaGFuZGxlciBpbnZva2VkIG9uIGEgYCdmaXQtcmVxdWVzdCdgIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBJZiBhbnkgY2hpbGQgd2lkZ2V0IGlzIHZpc2libGUsIGV4cGFuZCB0aGUgdG9vbGJhciBoZWlnaHQgdG8gdGhlIG5vcm1hbFxuICAgICAqIHRvb2xiYXIgaGVpZ2h0LlxuICAgICAqL1xuICAgIG9uRml0UmVxdWVzdChtc2cpIHtcbiAgICAgICAgc3VwZXIub25GaXRSZXF1ZXN0KG1zZyk7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudC5pc0F0dGFjaGVkKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgYW55IHdpZGdldHMgbm90IGV4cGxpY2l0bHkgaGlkZGVuLCBleHBhbmQgdGhlIHRvb2xiYXIgdG9cbiAgICAgICAgICAgIC8vIGFjY29tbW9kYXRlIHRoZW0uXG4gICAgICAgICAgICBpZiAoc29tZSh0aGlzLndpZGdldHMsIHcgPT4gIXcuaXNIaWRkZW4pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQubm9kZS5zdHlsZS5taW5IZWlnaHQgPSAndmFyKC0tanAtcHJpdmF0ZS10b29sYmFyLWhlaWdodCknO1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LnJlbW92ZUNsYXNzKCdqcC1Ub29sYmFyLW1pY3JvJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5ub2RlLnN0eWxlLm1pbkhlaWdodCA9ICcnO1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmFkZENsYXNzKCdqcC1Ub29sYmFyLW1pY3JvJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2V0IHRoZSBkaXJ0eSBmbGFnIHRvIGVuc3VyZSBvbmx5IGEgc2luZ2xlIHVwZGF0ZSBvY2N1cnMuXG4gICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgLy8gTm90aWZ5IHRoZSBhbmNlc3RvciB0aGF0IGl0IHNob3VsZCBmaXQgaW1tZWRpYXRlbHkuIFRoaXMgbWF5XG4gICAgICAgIC8vIGNhdXNlIGEgcmVzaXplIG9mIHRoZSBwYXJlbnQsIGZ1bGZpbGxpbmcgdGhlIHJlcXVpcmVkIHVwZGF0ZS5cbiAgICAgICAgaWYgKHRoaXMucGFyZW50LnBhcmVudCkge1xuICAgICAgICAgICAgTWVzc2FnZUxvb3Auc2VuZE1lc3NhZ2UodGhpcy5wYXJlbnQucGFyZW50LCBXaWRnZXQuTXNnLkZpdFJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSBkaXJ0eSBmbGFnIGlzIHN0aWxsIHNldCwgdGhlIHBhcmVudCB3YXMgbm90IHJlc2l6ZWQuXG4gICAgICAgIC8vIFRyaWdnZXIgdGhlIHJlcXVpcmVkIHVwZGF0ZSBvbiB0aGUgcGFyZW50IHdpZGdldCBpbW1lZGlhdGVseS5cbiAgICAgICAgaWYgKHRoaXMuX2RpcnR5KSB7XG4gICAgICAgICAgICBNZXNzYWdlTG9vcC5zZW5kTWVzc2FnZSh0aGlzLnBhcmVudCwgV2lkZ2V0Lk1zZy5VcGRhdGVSZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIG1lc3NhZ2UgaGFuZGxlciBpbnZva2VkIG9uIGFuIGAndXBkYXRlLXJlcXVlc3QnYCBtZXNzYWdlLlxuICAgICAqL1xuICAgIG9uVXBkYXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgc3VwZXIub25VcGRhdGVSZXF1ZXN0KG1zZyk7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudC5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBtZXNzYWdlIGhhbmRsZXIgaW52b2tlZCBvbiBhIGAnY2hpbGQtc2hvd24nYCBtZXNzYWdlLlxuICAgICAqL1xuICAgIG9uQ2hpbGRTaG93bihtc2cpIHtcbiAgICAgICAgc3VwZXIub25DaGlsZFNob3duKG1zZyk7XG4gICAgICAgIC8vIFBvc3QgYSBmaXQgcmVxdWVzdCBmb3IgdGhlIHBhcmVudCB3aWRnZXQuXG4gICAgICAgIHRoaXMucGFyZW50LmZpdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIG1lc3NhZ2UgaGFuZGxlciBpbnZva2VkIG9uIGEgYCdjaGlsZC1oaWRkZW4nYCBtZXNzYWdlLlxuICAgICAqL1xuICAgIG9uQ2hpbGRIaWRkZW4obXNnKSB7XG4gICAgICAgIHN1cGVyLm9uQ2hpbGRIaWRkZW4obXNnKTtcbiAgICAgICAgLy8gUG9zdCBhIGZpdCByZXF1ZXN0IGZvciB0aGUgcGFyZW50IHdpZGdldC5cbiAgICAgICAgdGhpcy5wYXJlbnQuZml0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgbWVzc2FnZSBoYW5kbGVyIGludm9rZWQgb24gYSBgJ2JlZm9yZS1hdHRhY2gnYCBtZXNzYWdlLlxuICAgICAqL1xuICAgIG9uQmVmb3JlQXR0YWNoKG1zZykge1xuICAgICAgICBzdXBlci5vbkJlZm9yZUF0dGFjaChtc2cpO1xuICAgICAgICAvLyBQb3N0IGEgZml0IHJlcXVlc3QgZm9yIHRoZSBwYXJlbnQgd2lkZ2V0LlxuICAgICAgICB0aGlzLnBhcmVudC5maXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0YWNoIGEgd2lkZ2V0IHRvIHRoZSBwYXJlbnQncyBET00gbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCAtIFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSB3aWRnZXQgaW4gdGhlIGxheW91dC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWRnZXQgLSBUaGUgd2lkZ2V0IHRvIGF0dGFjaCB0byB0aGUgcGFyZW50LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgaXMgYSByZWltcGxlbWVudGF0aW9uIG9mIHRoZSBzdXBlcmNsYXNzIG1ldGhvZC5cbiAgICAgKi9cbiAgICBhdHRhY2hXaWRnZXQoaW5kZXgsIHdpZGdldCkge1xuICAgICAgICBzdXBlci5hdHRhY2hXaWRnZXQoaW5kZXgsIHdpZGdldCk7XG4gICAgICAgIC8vIFBvc3QgYSBmaXQgcmVxdWVzdCBmb3IgdGhlIHBhcmVudCB3aWRnZXQuXG4gICAgICAgIHRoaXMucGFyZW50LmZpdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZXRhY2ggYSB3aWRnZXQgZnJvbSB0aGUgcGFyZW50J3MgRE9NIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggLSBUaGUgcHJldmlvdXMgaW5kZXggb2YgdGhlIHdpZGdldCBpbiB0aGUgbGF5b3V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHdpZGdldCAtIFRoZSB3aWRnZXQgdG8gZGV0YWNoIGZyb20gdGhlIHBhcmVudC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGlzIGEgcmVpbXBsZW1lbnRhdGlvbiBvZiB0aGUgc3VwZXJjbGFzcyBtZXRob2QuXG4gICAgICovXG4gICAgZGV0YWNoV2lkZ2V0KGluZGV4LCB3aWRnZXQpIHtcbiAgICAgICAgc3VwZXIuZGV0YWNoV2lkZ2V0KGluZGV4LCB3aWRnZXQpO1xuICAgICAgICAvLyBQb3N0IGEgZml0IHJlcXVlc3QgZm9yIHRoZSBwYXJlbnQgd2lkZ2V0LlxuICAgICAgICB0aGlzLnBhcmVudC5maXQoKTtcbiAgICB9XG59XG4vKipcbiAqIEEgY2xhc3Mgd2hpY2ggcHJvdmlkZXMgYSB0b29sYmFyIHdpZGdldC5cbiAqL1xuZXhwb3J0IGNsYXNzIFRvb2xiYXIgZXh0ZW5kcyBXaWRnZXQge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyB0b29sYmFyIHdpZGdldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKFRPT0xCQVJfQ0xBU1MpO1xuICAgICAgICB0aGlzLmxheW91dCA9IChfYSA9IG9wdGlvbnMubGF5b3V0KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBuZXcgVG9vbGJhckxheW91dCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gaXRlcmF0b3Igb3ZlciB0aGUgb3JkZXJlZCB0b29sYmFyIGl0ZW0gbmFtZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBbiBpdGVyYXRvciBvdmVyIHRoZSB0b29sYmFyIGl0ZW0gbmFtZXMuXG4gICAgICovXG4gICAgbmFtZXMoKSB7XG4gICAgICAgIGNvbnN0IGxheW91dCA9IHRoaXMubGF5b3V0O1xuICAgICAgICByZXR1cm4gbWFwKGxheW91dC53aWRnZXRzLCB3aWRnZXQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFByaXZhdGUubmFtZVByb3BlcnR5LmdldCh3aWRnZXQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGFuIGl0ZW0gdG8gdGhlIGVuZCBvZiB0aGUgdG9vbGJhci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHdpZGdldCB0byBhZGQgdG8gdGhlIHRvb2xiYXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IC0gVGhlIHdpZGdldCB0byBhZGQgdG8gdGhlIHRvb2xiYXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggLSBUaGUgb3B0aW9uYWwgbmFtZSBvZiB0aGUgaXRlbSB0byBpbnNlcnQgYWZ0ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBpdGVtIHdhcyBhZGRlZCB0byB0b29sYmFyLiAgUmV0dXJucyBmYWxzZSBpZlxuICAgICAqICAgYW4gaXRlbSBvZiB0aGUgc2FtZSBuYW1lIGlzIGFscmVhZHkgaW4gdGhlIHRvb2xiYXIuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIGl0ZW0gY2FuIGJlIHJlbW92ZWQgZnJvbSB0aGUgdG9vbGJhciBieSBzZXR0aW5nIGl0cyBwYXJlbnQgdG8gYG51bGxgLlxuICAgICAqL1xuICAgIGFkZEl0ZW0obmFtZSwgd2lkZ2V0KSB7XG4gICAgICAgIGNvbnN0IGxheW91dCA9IHRoaXMubGF5b3V0O1xuICAgICAgICByZXR1cm4gdGhpcy5pbnNlcnRJdGVtKGxheW91dC53aWRnZXRzLmxlbmd0aCwgbmFtZSwgd2lkZ2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0IGFuIGl0ZW0gaW50byB0aGUgdG9vbGJhciBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IC0gVGhlIGluZGV4IGF0IHdoaWNoIHRvIGluc2VydCB0aGUgaXRlbS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGl0ZW0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IC0gVGhlIHdpZGdldCB0byBhZGQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBpdGVtIHdhcyBhZGRlZCB0byB0aGUgdG9vbGJhci4gUmV0dXJucyBmYWxzZSBpZlxuICAgICAqICAgYW4gaXRlbSBvZiB0aGUgc2FtZSBuYW1lIGlzIGFscmVhZHkgaW4gdGhlIHRvb2xiYXIuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIGluZGV4IHdpbGwgYmUgY2xhbXBlZCB0byB0aGUgYm91bmRzIG9mIHRoZSBpdGVtcy5cbiAgICAgKiBUaGUgaXRlbSBjYW4gYmUgcmVtb3ZlZCBmcm9tIHRoZSB0b29sYmFyIGJ5IHNldHRpbmcgaXRzIHBhcmVudCB0byBgbnVsbGAuXG4gICAgICovXG4gICAgaW5zZXJ0SXRlbShpbmRleCwgbmFtZSwgd2lkZ2V0KSB7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nID0gZmluZCh0aGlzLm5hbWVzKCksIHZhbHVlID0+IHZhbHVlID09PSBuYW1lKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgd2lkZ2V0LmFkZENsYXNzKFRPT0xCQVJfSVRFTV9DTEFTUyk7XG4gICAgICAgIGNvbnN0IGxheW91dCA9IHRoaXMubGF5b3V0O1xuICAgICAgICBjb25zdCBqID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oaW5kZXgsIGxheW91dC53aWRnZXRzLmxlbmd0aCkpO1xuICAgICAgICBsYXlvdXQuaW5zZXJ0V2lkZ2V0KGosIHdpZGdldCk7XG4gICAgICAgIFByaXZhdGUubmFtZVByb3BlcnR5LnNldCh3aWRnZXQsIG5hbWUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0IGFuIGl0ZW0gaW50byB0aGUgdG9vbGJhciBhdCB0aGUgYWZ0ZXIgYSB0YXJnZXQgaXRlbS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhdCAtIFRoZSB0YXJnZXQgaXRlbSB0byBpbnNlcnQgYWZ0ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBpdGVtLlxuICAgICAqXG4gICAgICogQHBhcmFtIHdpZGdldCAtIFRoZSB3aWRnZXQgdG8gYWRkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgV2hldGhlciB0aGUgaXRlbSB3YXMgYWRkZWQgdG8gdGhlIHRvb2xiYXIuIFJldHVybnMgZmFsc2UgaWZcbiAgICAgKiAgIGFuIGl0ZW0gb2YgdGhlIHNhbWUgbmFtZSBpcyBhbHJlYWR5IGluIHRoZSB0b29sYmFyLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSBpbmRleCB3aWxsIGJlIGNsYW1wZWQgdG8gdGhlIGJvdW5kcyBvZiB0aGUgaXRlbXMuXG4gICAgICogVGhlIGl0ZW0gY2FuIGJlIHJlbW92ZWQgZnJvbSB0aGUgdG9vbGJhciBieSBzZXR0aW5nIGl0cyBwYXJlbnQgdG8gYG51bGxgLlxuICAgICAqL1xuICAgIGluc2VydEFmdGVyKGF0LCBuYW1lLCB3aWRnZXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc2VydFJlbGF0aXZlKGF0LCAxLCBuYW1lLCB3aWRnZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnQgYW4gaXRlbSBpbnRvIHRoZSB0b29sYmFyIGF0IHRoZSBiZWZvcmUgYSB0YXJnZXQgaXRlbS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhdCAtIFRoZSB0YXJnZXQgaXRlbSB0byBpbnNlcnQgYmVmb3JlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgaXRlbS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWRnZXQgLSBUaGUgd2lkZ2V0IHRvIGFkZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIGl0ZW0gd2FzIGFkZGVkIHRvIHRoZSB0b29sYmFyLiBSZXR1cm5zIGZhbHNlIGlmXG4gICAgICogICBhbiBpdGVtIG9mIHRoZSBzYW1lIG5hbWUgaXMgYWxyZWFkeSBpbiB0aGUgdG9vbGJhci5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgaW5kZXggd2lsbCBiZSBjbGFtcGVkIHRvIHRoZSBib3VuZHMgb2YgdGhlIGl0ZW1zLlxuICAgICAqIFRoZSBpdGVtIGNhbiBiZSByZW1vdmVkIGZyb20gdGhlIHRvb2xiYXIgYnkgc2V0dGluZyBpdHMgcGFyZW50IHRvIGBudWxsYC5cbiAgICAgKi9cbiAgICBpbnNlcnRCZWZvcmUoYXQsIG5hbWUsIHdpZGdldCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5zZXJ0UmVsYXRpdmUoYXQsIDAsIG5hbWUsIHdpZGdldCk7XG4gICAgfVxuICAgIF9pbnNlcnRSZWxhdGl2ZShhdCwgb2Zmc2V0LCBuYW1lLCB3aWRnZXQpIHtcbiAgICAgICAgY29uc3QgbmFtZVdpdGhJbmRleCA9IG1hcCh0aGlzLm5hbWVzKCksIChuYW1lLCBpKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBuYW1lOiBuYW1lLCBpbmRleDogaSB9O1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZmluZChuYW1lV2l0aEluZGV4LCB4ID0+IHgubmFtZSA9PT0gYXQpO1xuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnNlcnRJdGVtKHRhcmdldC5pbmRleCArIG9mZnNldCwgbmFtZSwgd2lkZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgRE9NIGV2ZW50cyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudCAtIFRoZSBET00gZXZlbnQgc2VudCB0byB0aGUgd2lkZ2V0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgbWV0aG9kIGltcGxlbWVudHMgdGhlIERPTSBgRXZlbnRMaXN0ZW5lcmAgaW50ZXJmYWNlIGFuZCBpc1xuICAgICAqIGNhbGxlZCBpbiByZXNwb25zZSB0byBldmVudHMgb24gdGhlIGRvY2sgcGFuZWwncyBub2RlLiBJdCBzaG91bGRcbiAgICAgKiBub3QgYmUgY2FsbGVkIGRpcmVjdGx5IGJ5IHVzZXIgY29kZS5cbiAgICAgKi9cbiAgICBoYW5kbGVFdmVudChldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNsaWNrKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgRE9NIGNsaWNrIGV2ZW50LlxuICAgICAqL1xuICAgIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIC8vIFN0b3AgcHJvcGFnYXRpbmcgdGhlIGNsaWNrIG91dHNpZGUgdGhlIHRvb2xiYXJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIC8vIENsaWNraW5nIGEgbGFiZWwgZm9jdXNlcyB0aGUgY29ycmVzcG9uZGluZyBjb250cm9sXG4gICAgICAgIC8vIHRoYXQgaXMgbGlua2VkIHdpdGggYGZvcmAgYXR0cmlidXRlLCBzbyBsZXQgaXQgYmUuXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MTGFiZWxFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCBmb3JJZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2ZvcicpO1xuICAgICAgICAgICAgaWYgKGZvcklkICYmIHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKGAjJHtmb3JJZH1gKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGlzIGNsaWNrIGFscmVhZHkgZm9jdXNlZCBhIGNvbnRyb2wsIGxldCBpdCBiZS5cbiAgICAgICAgaWYgKHRoaXMubm9kZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIE90aGVyd2lzZSwgYWN0aXZhdGUgdGhlIHBhcmVudCB3aWRnZXQsIHdoaWNoIG1heSB0YWtlIGZvY3VzIGlmIGRlc2lyZWQuXG4gICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuYWN0aXZhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYGFmdGVyLWF0dGFjaGAgbWVzc2FnZXMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgb25BZnRlckF0dGFjaChtc2cpIHtcbiAgICAgICAgdGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgYmVmb3JlLWRldGFjaGAgbWVzc2FnZXMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgb25CZWZvcmVEZXRhY2gobXNnKSB7XG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpO1xuICAgIH1cbn1cbi8qKlxuICogQSBjbGFzcyB3aGljaCBwcm92aWRlcyBhIHRvb2xiYXIgd2lkZ2V0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhY3RpdmVUb29sYmFyIGV4dGVuZHMgVG9vbGJhciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IHRvb2xiYXIgd2lkZ2V0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnBvcHVwT3BlbmVyID0gbmV3IFRvb2xiYXJQb3B1cE9wZW5lcigpO1xuICAgICAgICB0aGlzLl93aWRnZXRXaWR0aHMgPSB7fTtcbiAgICAgICAgdGhpcy5pbnNlcnRJdGVtKDAsIFRPT0xCQVJfT1BFTkVSX05BTUUsIHRoaXMucG9wdXBPcGVuZXIpO1xuICAgICAgICB0aGlzLnBvcHVwT3BlbmVyLmhpZGUoKTtcbiAgICAgICAgdGhpcy5fcmVzaXplciA9IG5ldyBUaHJvdHRsZXIodGhpcy5fb25SZXNpemUuYmluZCh0aGlzKSwgNTAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgd2lkZ2V0IGFuZCBpdHMgZGVzY2VuZGFudCB3aWRnZXRzLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcmVzaXplcikge1xuICAgICAgICAgICAgdGhpcy5fcmVzaXplci5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnQgYW4gaXRlbSBpbnRvIHRoZSB0b29sYmFyIGF0IHRoZSBhZnRlciBhIHRhcmdldCBpdGVtLlxuICAgICAqXG4gICAgICogQHBhcmFtIGF0IC0gVGhlIHRhcmdldCBpdGVtIHRvIGluc2VydCBhZnRlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGl0ZW0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IC0gVGhlIHdpZGdldCB0byBhZGQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBpdGVtIHdhcyBhZGRlZCB0byB0aGUgdG9vbGJhci4gUmV0dXJucyBmYWxzZSBpZlxuICAgICAqICAgYW4gaXRlbSBvZiB0aGUgc2FtZSBuYW1lIGlzIGFscmVhZHkgaW4gdGhlIHRvb2xiYXIgb3IgaWYgdGhlIHRhcmdldFxuICAgICAqICAgaXMgdGhlIHRvb2xiYXIgcG9wLXVwIG9wZW5lci5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgaW5kZXggd2lsbCBiZSBjbGFtcGVkIHRvIHRoZSBib3VuZHMgb2YgdGhlIGl0ZW1zLlxuICAgICAqIFRoZSBpdGVtIGNhbiBiZSByZW1vdmVkIGZyb20gdGhlIHRvb2xiYXIgYnkgc2V0dGluZyBpdHMgcGFyZW50IHRvIGBudWxsYC5cbiAgICAgKi9cbiAgICBpbnNlcnRBZnRlcihhdCwgbmFtZSwgd2lkZ2V0KSB7XG4gICAgICAgIGlmIChhdCA9PT0gVE9PTEJBUl9PUEVORVJfTkFNRSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5pbnNlcnRBZnRlcihhdCwgbmFtZSwgd2lkZ2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0IGFuIGl0ZW0gaW50byB0aGUgdG9vbGJhciBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IC0gVGhlIGluZGV4IGF0IHdoaWNoIHRvIGluc2VydCB0aGUgaXRlbS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGl0ZW0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IC0gVGhlIHdpZGdldCB0byBhZGQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBpdGVtIHdhcyBhZGRlZCB0byB0aGUgdG9vbGJhci4gUmV0dXJucyBmYWxzZSBpZlxuICAgICAqICAgYW4gaXRlbSBvZiB0aGUgc2FtZSBuYW1lIGlzIGFscmVhZHkgaW4gdGhlIHRvb2xiYXIuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIGluZGV4IHdpbGwgYmUgY2xhbXBlZCB0byB0aGUgYm91bmRzIG9mIHRoZSBpdGVtcy5cbiAgICAgKiBUaGUgaXRlbSBjYW4gYmUgcmVtb3ZlZCBmcm9tIHRoZSB0b29sYmFyIGJ5IHNldHRpbmcgaXRzIHBhcmVudCB0byBgbnVsbGAuXG4gICAgICovXG4gICAgaW5zZXJ0SXRlbShpbmRleCwgbmFtZSwgd2lkZ2V0KSB7XG4gICAgICAgIGlmICh3aWRnZXQgaW5zdGFuY2VvZiBUb29sYmFyUG9wdXBPcGVuZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5pbnNlcnRJdGVtKGluZGV4LCBuYW1lLCB3aWRnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaiA9IE1hdGgubWF4KDAsIE1hdGgubWluKGluZGV4LCB0aGlzLmxheW91dC53aWRnZXRzLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5pbnNlcnRJdGVtKGosIG5hbWUsIHdpZGdldCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBtZXNzYWdlIGhhbmRsZXIgaW52b2tlZCBvbiBhIGAnYmVmb3JlLWhpZGUnYCBtZXNzYWdlLlxuICAgICAqXG4gICAgICogSXQgd2lsbCBoaWRlIHRoZSBwb3AtdXAgcGFuZWxcbiAgICAgKi9cbiAgICBvbkJlZm9yZUhpZGUobXNnKSB7XG4gICAgICAgIHRoaXMucG9wdXBPcGVuZXIuaGlkZVBvcHVwKCk7XG4gICAgICAgIHN1cGVyLm9uQmVmb3JlSGlkZShtc2cpO1xuICAgIH1cbiAgICBvblJlc2l6ZShtc2cpIHtcbiAgICAgICAgc3VwZXIub25SZXNpemUobXNnKTtcbiAgICAgICAgaWYgKG1zZy53aWR0aCA+IDAgJiYgdGhpcy5fcmVzaXplcikge1xuICAgICAgICAgICAgdm9pZCB0aGlzLl9yZXNpemVyLmludm9rZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9vblJlc2l6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmlzQXR0YWNoZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvb2xiYXJXaWR0aCA9IHRoaXMubm9kZS5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIGNvbnN0IG9wZW5lciA9IHRoaXMucG9wdXBPcGVuZXI7XG4gICAgICAgICAgICBjb25zdCBvcGVuZXJXaWR0aCA9IDMwO1xuICAgICAgICAgICAgY29uc3QgdG9vbGJhclBhZGRpbmcgPSAyO1xuICAgICAgICAgICAgY29uc3QgbGF5b3V0ID0gdGhpcy5sYXlvdXQ7XG4gICAgICAgICAgICBsZXQgd2lkdGggPSBvcGVuZXIuaXNIaWRkZW5cbiAgICAgICAgICAgICAgICA/IHRvb2xiYXJQYWRkaW5nXG4gICAgICAgICAgICAgICAgOiB0b29sYmFyUGFkZGluZyArIG9wZW5lcldpZHRoO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIGNvbnN0IHdpZGdldHNUb1JlbW92ZSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgdG9JbmRleCA9IGxheW91dC53aWRnZXRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPCB0b0luZGV4KSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gbGF5b3V0LndpZGdldHNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NhdmVXaWRnZXRXaWR0aCh3aWRnZXQpO1xuICAgICAgICAgICAgICAgIHdpZHRoICs9IHRoaXMuX2dldFdpZGdldFdpZHRoKHdpZGdldCk7XG4gICAgICAgICAgICAgICAgaWYgKHdpZGdldHNUb1JlbW92ZS5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVyLmlzSGlkZGVuICYmXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoICsgb3BlbmVyV2lkdGggPiB0b29sYmFyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGggKz0gb3BlbmVyV2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh3aWR0aCA+IHRvb2xiYXJXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICB3aWRnZXRzVG9SZW1vdmUucHVzaCh3aWRnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKHdpZGdldHNUb1JlbW92ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gd2lkZ2V0c1RvUmVtb3ZlLnBvcCgpO1xuICAgICAgICAgICAgICAgIHdpZHRoIC09IHRoaXMuX2dldFdpZGdldFdpZHRoKHdpZGdldCk7XG4gICAgICAgICAgICAgICAgb3BlbmVyLmFkZFdpZGdldCh3aWRnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wZW5lci53aWRnZXRDb3VudCgpID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldHNUb0FkZCA9IFtdO1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IHdpZGdldCA9IG9wZW5lci53aWRnZXRBdChpbmRleCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0Q291bnQgPSBvcGVuZXIud2lkZ2V0Q291bnQoKTtcbiAgICAgICAgICAgICAgICB3aWR0aCArPSB0aGlzLl9nZXRXaWRnZXRXaWR0aCh3aWRnZXQpO1xuICAgICAgICAgICAgICAgIGlmICh3aWRnZXRDb3VudCA9PT0gMSAmJiB3aWR0aCAtIG9wZW5lcldpZHRoIDw9IHRvb2xiYXJXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aCAtPSBvcGVuZXJXaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKHdpZHRoIDwgdG9vbGJhcldpZHRoICYmIGluZGV4IDwgd2lkZ2V0Q291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0c1RvQWRkLnB1c2god2lkZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0ID0gb3BlbmVyLndpZGdldEF0KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggKz0gdGhpcy5fZ2V0V2lkZ2V0V2lkdGgod2lkZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdoaWxlICh3aWRnZXRzVG9BZGQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSB3aWRnZXRzVG9BZGQuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKFByaXZhdGUubmFtZVByb3BlcnR5LmdldCh3aWRnZXQpLCB3aWRnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcGVuZXIud2lkZ2V0Q291bnQoKSA+IDApIHtcbiAgICAgICAgICAgICAgICBvcGVuZXIudXBkYXRlUG9wdXAoKTtcbiAgICAgICAgICAgICAgICBvcGVuZXIuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3BlbmVyLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfc2F2ZVdpZGdldFdpZHRoKHdpZGdldCkge1xuICAgICAgICBjb25zdCB3aWRnZXROYW1lID0gUHJpdmF0ZS5uYW1lUHJvcGVydHkuZ2V0KHdpZGdldCk7XG4gICAgICAgIHRoaXMuX3dpZGdldFdpZHRoc1t3aWRnZXROYW1lXSA9IHdpZGdldC5oYXNDbGFzcyhUT09MQkFSX1NQQUNFUl9DTEFTUylcbiAgICAgICAgICAgID8gMlxuICAgICAgICAgICAgOiB3aWRnZXQubm9kZS5jbGllbnRXaWR0aDtcbiAgICB9XG4gICAgX2dldFdpZGdldFdpZHRoKHdpZGdldCkge1xuICAgICAgICBjb25zdCB3aWRnZXROYW1lID0gUHJpdmF0ZS5uYW1lUHJvcGVydHkuZ2V0KHdpZGdldCk7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWRnZXRXaWR0aHNbd2lkZ2V0TmFtZV07XG4gICAgfVxufVxuLyoqXG4gKiBUaGUgbmFtZXNwYWNlIGZvciBUb29sYmFyIGNsYXNzIHN0YXRpY3MuXG4gKi9cbihmdW5jdGlvbiAoVG9vbGJhcikge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBpbnRlcnJ1cHQgdG9vbGJhciBpdGVtLlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiB2My4yXG4gICAgICogVGhpcyBpcyBkZWFkIGNvZGUgbm93LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUludGVycnVwdEJ1dHRvbihzZXNzaW9uQ29udGV4dCwgdHJhbnNsYXRvcikge1xuICAgICAgICB0cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgcmV0dXJuIG5ldyBUb29sYmFyQnV0dG9uKHtcbiAgICAgICAgICAgIGljb246IHN0b3BJY29uLFxuICAgICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgdm9pZCAoKF9iID0gKF9hID0gc2Vzc2lvbkNvbnRleHQuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmtlcm5lbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmludGVycnVwdCgpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiB0cmFucy5fXygnSW50ZXJydXB0IHRoZSBrZXJuZWwnKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgVG9vbGJhci5jcmVhdGVJbnRlcnJ1cHRCdXR0b24gPSBjcmVhdGVJbnRlcnJ1cHRCdXR0b247XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcmVzdGFydCB0b29sYmFyIGl0ZW0uXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2My4yXG4gICAgICogVGhpcyBpcyBkZWFkIGNvZGUgbm93LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVJlc3RhcnRCdXR0b24oc2Vzc2lvbkNvbnRleHQsIGRpYWxvZ3MsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHJldHVybiBuZXcgVG9vbGJhckJ1dHRvbih7XG4gICAgICAgICAgICBpY29uOiByZWZyZXNoSWNvbixcbiAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB2b2lkIChkaWFsb2dzICE9PSBudWxsICYmIGRpYWxvZ3MgIT09IHZvaWQgMCA/IGRpYWxvZ3MgOiBzZXNzaW9uQ29udGV4dERpYWxvZ3MpLnJlc3RhcnQoc2Vzc2lvbkNvbnRleHQsIHRyYW5zbGF0b3IpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IHRyYW5zLl9fKCdSZXN0YXJ0IHRoZSBrZXJuZWwnKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgVG9vbGJhci5jcmVhdGVSZXN0YXJ0QnV0dG9uID0gY3JlYXRlUmVzdGFydEJ1dHRvbjtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSB0b29sYmFyIHNwYWNlciBpdGVtLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIEl0IGlzIGEgZmxleCBzcGFjZXIgdGhhdCBzZXBhcmF0ZXMgdGhlIGxlZnQgdG9vbGJhciBpdGVtc1xuICAgICAqIGZyb20gdGhlIHJpZ2h0IHRvb2xiYXIgaXRlbXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlU3BhY2VySXRlbSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcml2YXRlLlNwYWNlcigpO1xuICAgIH1cbiAgICBUb29sYmFyLmNyZWF0ZVNwYWNlckl0ZW0gPSBjcmVhdGVTcGFjZXJJdGVtO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGtlcm5lbCBuYW1lIGluZGljYXRvciBpdGVtLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIEl0IHdpbGwgZGlzcGxheSB0aGUgYCdkaXNwbGF5X25hbWVgJyBvZiB0aGUgc2Vzc2lvbiBjb250ZXh0LiBJdCBjYW5cbiAgICAgKiBoYW5kbGUgYSBjaGFuZ2UgaW4gY29udGV4dCBvciBrZXJuZWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlS2VybmVsTmFtZUl0ZW0oc2Vzc2lvbkNvbnRleHQsIGRpYWxvZ3MsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgY29uc3QgZWwgPSBSZWFjdFdpZGdldC5jcmVhdGUoUmVhY3QuY3JlYXRlRWxlbWVudChQcml2YXRlLktlcm5lbE5hbWVDb21wb25lbnQsIHsgc2Vzc2lvbkNvbnRleHQ6IHNlc3Npb25Db250ZXh0LCBkaWFsb2dzOiBkaWFsb2dzICE9PSBudWxsICYmIGRpYWxvZ3MgIT09IHZvaWQgMCA/IGRpYWxvZ3MgOiBzZXNzaW9uQ29udGV4dERpYWxvZ3MsIHRyYW5zbGF0b3I6IHRyYW5zbGF0b3IgfSkpO1xuICAgICAgICBlbC5hZGRDbGFzcygnanAtS2VybmVsTmFtZScpO1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgfVxuICAgIFRvb2xiYXIuY3JlYXRlS2VybmVsTmFtZUl0ZW0gPSBjcmVhdGVLZXJuZWxOYW1lSXRlbTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBrZXJuZWwgc3RhdHVzIGluZGljYXRvciBpdGVtLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIEl0IHdpbGwgc2hvdyBhIGJ1c3kgc3RhdHVzIGlmIHRoZSBrZXJuZWwgc3RhdHVzIGlzIGJ1c3kuXG4gICAgICogSXQgd2lsbCBzaG93IHRoZSBjdXJyZW50IHN0YXR1cyBpbiB0aGUgbm9kZSB0aXRsZS5cbiAgICAgKiBJdCBjYW4gaGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBjb250ZXh0IG9yIHRoZSBrZXJuZWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlS2VybmVsU3RhdHVzSXRlbShzZXNzaW9uQ29udGV4dCwgdHJhbnNsYXRvcikge1xuICAgICAgICByZXR1cm4gbmV3IFByaXZhdGUuS2VybmVsU3RhdHVzKHNlc3Npb25Db250ZXh0LCB0cmFuc2xhdG9yKTtcbiAgICB9XG4gICAgVG9vbGJhci5jcmVhdGVLZXJuZWxTdGF0dXNJdGVtID0gY3JlYXRlS2VybmVsU3RhdHVzSXRlbTtcbn0pKFRvb2xiYXIgfHwgKFRvb2xiYXIgPSB7fSkpO1xuLyoqXG4gKiBSZWFjdCBjb21wb25lbnQgZm9yIGEgdG9vbGJhciBidXR0b24uXG4gKlxuICogQHBhcmFtIHByb3BzIC0gVGhlIHByb3BzIGZvciBUb29sYmFyQnV0dG9uQ29tcG9uZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gVG9vbGJhckJ1dHRvbkNvbXBvbmVudChwcm9wcykge1xuICAgIHZhciBfYSwgX2I7XG4gICAgLy8gSW4gc29tZSBicm93c2VycywgYSBidXR0b24gY2xpY2sgZXZlbnQgbW92ZXMgdGhlIGZvY3VzIGZyb20gdGhlIG1haW5cbiAgICAvLyBjb250ZW50IHRvIHRoZSBidXR0b24gKHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvYnV0dG9uI0NsaWNraW5nX2FuZF9mb2N1cykuXG4gICAgLy8gV2UgYXZvaWQgYSBjbGljayBldmVudCBieSBjYWxsaW5nIHByZXZlbnREZWZhdWx0IGluIG1vdXNlZG93biwgYW5kXG4gICAgLy8gd2UgYmluZCB0aGUgYnV0dG9uIGFjdGlvbiB0byBgbW91c2Vkb3duYC5cbiAgICBjb25zdCBoYW5kbGVNb3VzZURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyBGaXJlIGFjdGlvbiBvbmx5IHdoZW4gbGVmdCBidXR0b24gaXMgcHJlc3NlZC5cbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIChfYSA9IHByb3BzLm9uQ2xpY2spID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHByb3BzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHsga2V5IH0gPSBldmVudDtcbiAgICAgICAgaWYgKGtleSA9PT0gJ0VudGVyJyB8fCBrZXkgPT09ICcgJykge1xuICAgICAgICAgICAgKF9hID0gcHJvcHMub25DbGljaykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwocHJvcHMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIChfYSA9IHByb3BzLm9uQ2xpY2spID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHByb3BzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZ2V0VG9vbHRpcCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHByb3BzLmVuYWJsZWQgPT09IGZhbHNlICYmIHByb3BzLmRpc2FibGVkVG9vbHRpcCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzLmRpc2FibGVkVG9vbHRpcDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwcm9wcy5wcmVzc2VkICYmIHByb3BzLnByZXNzZWRUb29sdGlwKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcHMucHJlc3NlZFRvb2x0aXA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcHMudG9vbHRpcCB8fCBwcm9wcy5pY29uTGFiZWw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIE9iamVjdC5hc3NpZ24oeyBjbGFzc05hbWU6IHByb3BzLmNsYXNzTmFtZVxuICAgICAgICAgICAgPyBwcm9wcy5jbGFzc05hbWUgKyAnIGpwLVRvb2xiYXJCdXR0b25Db21wb25lbnQnXG4gICAgICAgICAgICA6ICdqcC1Ub29sYmFyQnV0dG9uQ29tcG9uZW50JywgXCJhcmlhLXByZXNzZWRcIjogcHJvcHMucHJlc3NlZCwgXCJhcmlhLWRpc2FibGVkXCI6IHByb3BzLmVuYWJsZWQgPT09IGZhbHNlIH0sIHByb3BzLmRhdGFzZXQsIHsgZGlzYWJsZWQ6IHByb3BzLmVuYWJsZWQgPT09IGZhbHNlLCBvbkNsaWNrOiAoKF9hID0gcHJvcHMuYWN0dWFsT25DbGljaykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZmFsc2UpID8gaGFuZGxlQ2xpY2sgOiB1bmRlZmluZWQsIG9uTW91c2VEb3duOiAhKChfYiA9IHByb3BzLmFjdHVhbE9uQ2xpY2spICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IGZhbHNlKSA/IGhhbmRsZU1vdXNlRG93biA6IHVuZGVmaW5lZCwgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duLCB0aXRsZTogZ2V0VG9vbHRpcCgpLCBtaW5pbWFsOiB0cnVlIH0pLFxuICAgICAgICAocHJvcHMuaWNvbiB8fCBwcm9wcy5pY29uQ2xhc3MpICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KExhYkljb24ucmVzb2x2ZVJlYWN0LCB7IGljb246IHByb3BzLnByZXNzZWQgPyBwcm9wcy5wcmVzc2VkSWNvbiA6IHByb3BzLmljb24sIGljb25DbGFzczogXG4gICAgICAgICAgICAvLyBhZGQgc29tZSBleHRyYSBjbGFzc2VzIGZvciBwcm9wZXIgc3VwcG9ydCBvZiBpY29ucy1hcy1jc3MtYmFja2dyb3VuZFxuICAgICAgICAgICAgY2xhc3Nlcyhwcm9wcy5pY29uQ2xhc3MsICdqcC1JY29uJyksIGNsYXNzTmFtZTogXCJqcC1Ub29sYmFyQnV0dG9uQ29tcG9uZW50LWljb25cIiwgdGFnOiBcInNwYW5cIiwgc3R5bGVzaGVldDogXCJ0b29sYmFyQnV0dG9uXCIgfSkpLFxuICAgICAgICBwcm9wcy5sYWJlbCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwianAtVG9vbGJhckJ1dHRvbkNvbXBvbmVudC1sYWJlbFwiIH0sIHByb3BzLmxhYmVsKSkpKTtcbn1cbi8qKlxuICogQWRkcyB0aGUgdG9vbGJhciBidXR0b24gY2xhc3MgdG8gdGhlIHRvb2xiYXIgd2lkZ2V0LlxuICogQHBhcmFtIHcgVG9vbGJhciBidXR0b24gd2lkZ2V0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9vbGJhckJ1dHRvbkNsYXNzKHcpIHtcbiAgICB3LmFkZENsYXNzKCdqcC1Ub29sYmFyQnV0dG9uJyk7XG4gICAgcmV0dXJuIHc7XG59XG4vKipcbiAqIFBob3NwaG9yIFdpZGdldCB2ZXJzaW9uIG9mIHN0YXRpYyBUb29sYmFyQnV0dG9uQ29tcG9uZW50LlxuICovXG5leHBvcnQgY2xhc3MgVG9vbGJhckJ1dHRvbiBleHRlbmRzIFJlYWN0V2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgdG9vbGJhciBidXR0b25cbiAgICAgKiBAcGFyYW0gcHJvcHMgcHJvcHMgZm9yIHVuZGVybHlpbmcgYFRvb2xiYXJCdXR0b25gIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzID0ge30pIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgICBhZGRUb29sYmFyQnV0dG9uQ2xhc3ModGhpcyk7XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSAoX2EgPSBwcm9wcy5lbmFibGVkKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB0cnVlO1xuICAgICAgICB0aGlzLl9wcmVzc2VkID0gdGhpcy5fZW5hYmxlZCAmJiAoKF9iID0gcHJvcHMucHJlc3NlZCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogZmFsc2UpO1xuICAgICAgICB0aGlzLl9vbkNsaWNrID0gcHJvcHMub25DbGljaztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJlc3NlZCBzdGF0ZSBmb3IgdGhlIGJ1dHRvblxuICAgICAqIEBwYXJhbSB2YWx1ZSB0cnVlIGlmIGJ1dHRvbiBpcyBwcmVzc2VkLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBzZXQgcHJlc3NlZCh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVkICYmIHZhbHVlICE9PSB0aGlzLl9wcmVzc2VkKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmVzc2VkID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBidXR0b24gaXMgcHJlc3NlZCwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgICovXG4gICAgZ2V0IHByZXNzZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcmVzc2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBlbmFibGVkIHN0YXRlIGZvciB0aGUgYnV0dG9uXG4gICAgICogQHBhcmFtIHZhbHVlIHRydWUgdG8gZW5hYmxlIHRoZSBidXR0b24sIGZhbHNlIG90aGVyd2lzZVxuICAgICAqL1xuICAgIHNldCBlbmFibGVkKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPSB0aGlzLl9lbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmFibGVkID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2VuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcmVzc2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBidXR0b24gaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgICovXG4gICAgZ2V0IGVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjbGljayBoYW5kbGVyIGZvciB0aGUgYnV0dG9uXG4gICAgICogQHBhcmFtIHZhbHVlIGNsaWNrIGhhbmRsZXJcbiAgICAgKi9cbiAgICBzZXQgb25DbGljayh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX29uQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMuX29uQ2xpY2sgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY2xpY2sgaGFuZGxlciBmb3IgdGhlIGJ1dHRvblxuICAgICAqL1xuICAgIGdldCBvbkNsaWNrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb25DbGljaztcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVG9vbGJhckJ1dHRvbkNvbXBvbmVudCwgT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcywgeyBwcmVzc2VkOiB0aGlzLnByZXNzZWQsIGVuYWJsZWQ6IHRoaXMuZW5hYmxlZCwgb25DbGljazogdGhpcy5vbkNsaWNrIH0pKSk7XG4gICAgfVxufVxuLyoqXG4gKiBSZWFjdCBjb21wb25lbnQgZm9yIGEgdG9vbGJhciBidXR0b24gdGhhdCB3cmFwcyBhIGNvbW1hbmQuXG4gKlxuICogVGhpcyB3cmFwcyB0aGUgVG9vbGJhckJ1dHRvbkNvbXBvbmVudCBhbmQgd2F0Y2hlcyB0aGUgY29tbWFuZCByZWdpc3RyeVxuICogZm9yIGNoYW5nZXMgdG8gdGhlIGNvbW1hbmQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDb21tYW5kVG9vbGJhckJ1dHRvbkNvbXBvbmVudChwcm9wcykge1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChVc2VTaWduYWwsIHsgc2lnbmFsOiBwcm9wcy5jb21tYW5kcy5jb21tYW5kQ2hhbmdlZCwgc2hvdWxkVXBkYXRlOiAoc2VuZGVyLCBhcmdzKSA9PiAoYXJncy5pZCA9PT0gcHJvcHMuaWQgJiYgYXJncy50eXBlID09PSAnY2hhbmdlZCcpIHx8XG4gICAgICAgICAgICBhcmdzLnR5cGUgPT09ICdtYW55LWNoYW5nZWQnIH0sICgpID0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoVG9vbGJhckJ1dHRvbkNvbXBvbmVudCwgT2JqZWN0LmFzc2lnbih7fSwgUHJpdmF0ZS5wcm9wc0Zyb21Db21tYW5kKHByb3BzKSkpKSk7XG59XG4vKlxuICogQWRkcyB0aGUgY29tbWFuZCB0b29sYmFyIGJ1dHRvbiBjbGFzcyB0byB0aGUgY29tbWFuZCB0b29sYmFyIHdpZGdldC5cbiAqIEBwYXJhbSB3IENvbW1hbmQgdG9vbGJhciBidXR0b24gd2lkZ2V0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkQ29tbWFuZFRvb2xiYXJCdXR0b25DbGFzcyh3KSB7XG4gICAgdy5hZGRDbGFzcygnanAtQ29tbWFuZFRvb2xiYXJCdXR0b24nKTtcbiAgICByZXR1cm4gdztcbn1cbi8qKlxuICogUGhvc3Bob3IgV2lkZ2V0IHZlcnNpb24gb2YgQ29tbWFuZFRvb2xiYXJCdXR0b25Db21wb25lbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21tYW5kVG9vbGJhckJ1dHRvbiBleHRlbmRzIFJlYWN0V2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY29tbWFuZCB0b29sYmFyIGJ1dHRvblxuICAgICAqIEBwYXJhbSBwcm9wcyBwcm9wcyBmb3IgdW5kZXJseWluZyBgQ29tbWFuZFRvb2xiYXJCdXR0b25Db21wb25lbnRgIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgICAgYWRkQ29tbWFuZFRvb2xiYXJCdXR0b25DbGFzcyh0aGlzKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21tYW5kVG9vbGJhckJ1dHRvbkNvbXBvbmVudCwgT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcykpO1xuICAgIH1cbn1cbi8qKlxuICogIEEgY2xhc3Mgd2hpY2ggcHJvdmlkZXMgYSB0b29sYmFyIHBvcHVwXG4gKiAgdXNlZCB0byBzdG9yZSB3aWRnZXRzIHRoYXQgZG9uJ3QgZml0XG4gKiAgaW4gdGhlIHRvb2xiYXIgd2hlbiBpdCBpcyByZXNpemVkXG4gKi9cbmNsYXNzIFRvb2xiYXJQb3B1cCBleHRlbmRzIFdpZGdldCB7XG4gICAgLyoqXG4gICAgICogIENvbnN0cnVjdCBhIG5ldyBUb29sYmFyUG9wdXBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDA7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLVRvb2xiYXItcmVzcG9uc2l2ZS1wb3B1cCcpO1xuICAgICAgICB0aGlzLmxheW91dCA9IG5ldyBQYW5lbExheW91dCgpO1xuICAgICAgICBXaWRnZXQuYXR0YWNoKHRoaXMsIGRvY3VtZW50LmJvZHkpO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgd2lkdGggb2YgdGhlIHBvcHVwLCB0aGlzXG4gICAgICogc2hvdWxkIG1hdGNoIHdpdGggdGhlIHRvb2xiYXIgd2lkdGhcbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWR0aCAtIFRoZSB3aWR0aCB0byByZXNpemUgdG9cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgdXBkYXRlV2lkdGgod2lkdGgpIHtcbiAgICAgICAgaWYgKHdpZHRoID4gMCkge1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWducyB0aGUgcG9wdXAgdG8gbGVmdCBib3R0b20gb2Ygd2lkZ2V0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IHRoZSB3aWRnZXQgdG8gYWxpZ24gdG9cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFsaWduVG8od2lkZ2V0KSB7XG4gICAgICAgIGNvbnN0IHsgaGVpZ2h0OiB3aWRnZXRIZWlnaHQsIHdpZHRoOiB3aWRnZXRXaWR0aCwgeDogd2lkZ2V0WCwgeTogd2lkZ2V0WSB9ID0gd2lkZ2V0Lm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy5ub2RlLnN0eWxlLmxlZnQgPSBgJHt3aWRnZXRYICsgd2lkZ2V0V2lkdGggLSB3aWR0aCArIDF9cHhgO1xuICAgICAgICB0aGlzLm5vZGUuc3R5bGUudG9wID0gYCR7d2lkZ2V0WSArIHdpZGdldEhlaWdodCArIDF9cHhgO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoZSB3aWRnZXQgYXQgc3BlY2lmaWVkIGluZGV4XG4gICAgICogQHBhcmFtIGluZGV4IHRoZSBpbmRleFxuICAgICAqIEBwYXJhbSB3aWRnZXQgd2lkZ2V0IHRvIGFkZFxuICAgICAqL1xuICAgIGluc2VydFdpZGdldChpbmRleCwgd2lkZ2V0KSB7XG4gICAgICAgIHRoaXMubGF5b3V0Lmluc2VydFdpZGdldCgwLCB3aWRnZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAgVG90YWwgbnVtYmVyIG9mIHdpZGdldHMgaW4gdGhlIHBvcHVwXG4gICAgICovXG4gICAgd2lkZ2V0Q291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxheW91dC53aWRnZXRzLmxlbmd0aDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgd2lkZ2V0IGF0IGluZGV4XG4gICAgICogQHBhcmFtIGluZGV4IHRoZSBpbmRleFxuICAgICAqL1xuICAgIHdpZGdldEF0KGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxheW91dC53aWRnZXRzW2luZGV4XTtcbiAgICB9XG59XG4vKipcbiAqICBBIGNsYXNzIHRoYXQgcHJvdmlkZXMgYSBUb29sYmFyUG9wdXBPcGVuZXIsXG4gKiAgd2hpY2ggaXMgYSBidXR0b24gYWRkZWQgdG8gdG9vbGJhciB3aGVuXG4gKiAgdGhlIHRvb2xiYXIgaXRlbXMgb3ZlcmZsb3cgdG9vbGJhciB3aWR0aFxuICovXG5jbGFzcyBUb29sYmFyUG9wdXBPcGVuZXIgZXh0ZW5kcyBUb29sYmFyQnV0dG9uIHtcbiAgICAvKipcbiAgICAgKiAgQ3JlYXRlIGEgbmV3IHBvcHVwIG9wZW5lclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBpY29uOiBlbGxpcHNlc0ljb24sXG4gICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtVG9vbGJhci1yZXNwb25zaXZlLW9wZW5lcicpO1xuICAgICAgICB0aGlzLnBvcHVwID0gbmV3IFRvb2xiYXJQb3B1cCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgd2lkZ2V0IHRvIHRoZSBwb3B1cCwgcHJlcGVuZHMgd2lkZ2V0c1xuICAgICAqIEBwYXJhbSB3aWRnZXQgdGhlIHdpZGdldCB0byBhZGRcbiAgICAgKi9cbiAgICBhZGRXaWRnZXQod2lkZ2V0KSB7XG4gICAgICAgIHRoaXMucG9wdXAuaW5zZXJ0V2lkZ2V0KDAsIHdpZGdldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHdpZGdldCBhbmQgaXRzIGRlc2NlbmRhbnQgd2lkZ2V0cy5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBJdCBpcyB1bnNhZmUgdG8gdXNlIHRoZSB3aWRnZXQgYWZ0ZXIgaXQgaGFzIGJlZW4gZGlzcG9zZWQuXG4gICAgICpcbiAgICAgKiBBbGwgY2FsbHMgbWFkZSB0byB0aGlzIG1ldGhvZCBhZnRlciB0aGUgZmlyc3QgYXJlIGEgbm8tb3AuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9wdXAuZGlzcG9zZSgpO1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSBvcGVuZXIgYW5kIHRoZSBwb3B1cFxuICAgICAqL1xuICAgIGhpZGUoKSB7XG4gICAgICAgIHN1cGVyLmhpZGUoKTtcbiAgICAgICAgdGhpcy5oaWRlUG9wdXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIHBvcHVwXG4gICAgICovXG4gICAgaGlkZVBvcHVwKCkge1xuICAgICAgICB0aGlzLnBvcHVwLmhpZGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogIFVwZGF0ZXMgd2lkdGggYW5kIHBvc2l0aW9uIG9mIHRoZSBwb3B1cFxuICAgICAqICB0byBhbGlnbiB3aXRoIHRoZSB0b29sYmFyXG4gICAgICovXG4gICAgdXBkYXRlUG9wdXAoKSB7XG4gICAgICAgIHRoaXMucG9wdXAudXBkYXRlV2lkdGgodGhpcy5wYXJlbnQubm9kZS5jbGllbnRXaWR0aCk7XG4gICAgICAgIHRoaXMucG9wdXAuYWxpZ25Ubyh0aGlzLnBhcmVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgd2lkZ2V0IGF0IGluZGV4IGluIHRoZSBwb3B1cFxuICAgICAqIEBwYXJhbSBpbmRleFxuICAgICAqL1xuICAgIHdpZGdldEF0KGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcHVwLndpZGdldEF0KGluZGV4KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0b3RhbCBudW1iZXIgb2Ygd2lkZ2V0cyBpbiB0aGUgcG9wdXBcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE51bWJlciBvZiB3aWRnZXRzXG4gICAgICovXG4gICAgd2lkZ2V0Q291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcHVwLndpZGdldENvdW50KCk7XG4gICAgfVxuICAgIGhhbmRsZUNsaWNrKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVBvcHVwKCk7XG4gICAgICAgIHRoaXMucG9wdXAuc2V0SGlkZGVuKCF0aGlzLnBvcHVwLmlzSGlkZGVuKTtcbiAgICB9XG59XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgZnVuY3Rpb24gcHJvcHNGcm9tQ29tbWFuZChvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMsIGlkLCBhcmdzIH0gPSBvcHRpb25zO1xuICAgICAgICBjb25zdCBpY29uQ2xhc3MgPSBjb21tYW5kcy5pY29uQ2xhc3MoaWQsIGFyZ3MpO1xuICAgICAgICBjb25zdCBpY29uTGFiZWwgPSBjb21tYW5kcy5pY29uTGFiZWwoaWQsIGFyZ3MpO1xuICAgICAgICAvLyBERVBSRUNBVEVEOiByZW1vdmUgX2ljb24gd2hlbiBsdW1pbm8gMi4wIGlzIGFkb3B0ZWRcbiAgICAgICAgLy8gaWYgaWNvbiBpcyBhbGlhc2luZyBpY29uQ2xhc3MsIGRvbid0IHVzZSBpdFxuICAgICAgICBjb25zdCBfaWNvbiA9IChfYSA9IG9wdGlvbnMuaWNvbikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogY29tbWFuZHMuaWNvbihpZCwgYXJncyk7XG4gICAgICAgIGNvbnN0IGljb24gPSBfaWNvbiA9PT0gaWNvbkNsYXNzID8gdW5kZWZpbmVkIDogX2ljb247XG4gICAgICAgIGNvbnN0IGxhYmVsID0gY29tbWFuZHMubGFiZWwoaWQsIGFyZ3MpO1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gY29tbWFuZHMuY2xhc3NOYW1lKGlkLCBhcmdzKTtcbiAgICAgICAgLy8gQWRkIHRoZSBib29sZWFuIHN0YXRlIGNsYXNzZXMuXG4gICAgICAgIGlmIChjb21tYW5kcy5pc1RvZ2dsZWQoaWQsIGFyZ3MpKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgKz0gJyBsbS1tb2QtdG9nZ2xlZCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb21tYW5kcy5pc1Zpc2libGUoaWQsIGFyZ3MpKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgKz0gJyBsbS1tb2QtaGlkZGVuJztcbiAgICAgICAgfVxuICAgICAgICBsZXQgdG9vbHRpcCA9IGNvbW1hbmRzLmNhcHRpb24oaWQsIGFyZ3MpIHx8IG9wdGlvbnMubGFiZWwgfHwgbGFiZWwgfHwgaWNvbkxhYmVsO1xuICAgICAgICAvLyBTaG93cyBob3Qga2V5cyBpbiB0b29sdGlwc1xuICAgICAgICBjb25zdCBiaW5kaW5nID0gY29tbWFuZHMua2V5QmluZGluZ3MuZmluZChiID0+IGIuY29tbWFuZCA9PT0gaWQpO1xuICAgICAgICBpZiAoYmluZGluZykge1xuICAgICAgICAgICAgY29uc3Qga3MgPSBDb21tYW5kUmVnaXN0cnkuZm9ybWF0S2V5c3Ryb2tlKGJpbmRpbmcua2V5cy5qb2luKCcgJykpO1xuICAgICAgICAgICAgdG9vbHRpcCA9IGAke3Rvb2x0aXB9ICgke2tzfSlgO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB2b2lkIGNvbW1hbmRzLmV4ZWN1dGUoaWQsIGFyZ3MpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlbmFibGVkID0gY29tbWFuZHMuaXNFbmFibGVkKGlkLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgIGRhdGFzZXQ6IHsgJ2RhdGEtY29tbWFuZCc6IG9wdGlvbnMuaWQgfSxcbiAgICAgICAgICAgIGljb24sXG4gICAgICAgICAgICBpY29uQ2xhc3MsXG4gICAgICAgICAgICB0b29sdGlwLFxuICAgICAgICAgICAgb25DbGljayxcbiAgICAgICAgICAgIGVuYWJsZWQsXG4gICAgICAgICAgICBsYWJlbDogKF9iID0gb3B0aW9ucy5sYWJlbCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogbGFiZWxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUHJpdmF0ZS5wcm9wc0Zyb21Db21tYW5kID0gcHJvcHNGcm9tQ29tbWFuZDtcbiAgICAvKipcbiAgICAgKiBBbiBhdHRhY2hlZCBwcm9wZXJ0eSBmb3IgdGhlIG5hbWUgb2YgYSB0b29sYmFyIGl0ZW0uXG4gICAgICovXG4gICAgUHJpdmF0ZS5uYW1lUHJvcGVydHkgPSBuZXcgQXR0YWNoZWRQcm9wZXJ0eSh7XG4gICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgY3JlYXRlOiAoKSA9PiAnJ1xuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEEgbm8tb3AgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gbm9PcCgpIHtcbiAgICAgICAgLyogbm8tb3AgKi9cbiAgICB9XG4gICAgUHJpdmF0ZS5ub09wID0gbm9PcDtcbiAgICAvKipcbiAgICAgKiBBIHNwYWNlciB3aWRnZXQuXG4gICAgICovXG4gICAgY2xhc3MgU3BhY2VyIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnN0cnVjdCBhIG5ldyBzcGFjZXIgd2lkZ2V0LlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcyhUT09MQkFSX1NQQUNFUl9DTEFTUyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUHJpdmF0ZS5TcGFjZXIgPSBTcGFjZXI7XG4gICAgLyoqXG4gICAgICogUmVhY3QgY29tcG9uZW50IGZvciBhIGtlcm5lbCBuYW1lIGJ1dHRvbi5cbiAgICAgKlxuICAgICAqIFRoaXMgd3JhcHMgdGhlIFRvb2xiYXJCdXR0b25Db21wb25lbnQgYW5kIHdhdGNoZXMgdGhlIGtlcm5lbFxuICAgICAqIHNlc3Npb24gZm9yIGNoYW5nZXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gS2VybmVsTmFtZUNvbXBvbmVudChwcm9wcykge1xuICAgICAgICBjb25zdCB0cmFuc2xhdG9yID0gcHJvcHMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB2b2lkIHByb3BzLmRpYWxvZ3Muc2VsZWN0S2VybmVsKHByb3BzLnNlc3Npb25Db250ZXh0LCB0cmFuc2xhdG9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFVzZVNpZ25hbCwgeyBzaWduYWw6IHByb3BzLnNlc3Npb25Db250ZXh0Lmtlcm5lbENoYW5nZWQsIGluaXRpYWxTZW5kZXI6IHByb3BzLnNlc3Npb25Db250ZXh0IH0sIHNlc3Npb25Db250ZXh0ID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xiYXJCdXR0b25Db21wb25lbnQsIHsgY2xhc3NOYW1lOiBUT09MQkFSX0tFUk5FTF9OQU1FX0NMQVNTLCBvbkNsaWNrOiBjYWxsYmFjaywgdG9vbHRpcDogdHJhbnMuX18oJ1N3aXRjaCBrZXJuZWwnKSwgbGFiZWw6IHNlc3Npb25Db250ZXh0ID09PSBudWxsIHx8IHNlc3Npb25Db250ZXh0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXNzaW9uQ29udGV4dC5rZXJuZWxEaXNwbGF5TmFtZSB9KSkpKTtcbiAgICB9XG4gICAgUHJpdmF0ZS5LZXJuZWxOYW1lQ29tcG9uZW50ID0gS2VybmVsTmFtZUNvbXBvbmVudDtcbiAgICAvKipcbiAgICAgKiBBIHRvb2xiYXIgaXRlbSB0aGF0IGRpc3BsYXlzIGtlcm5lbCBzdGF0dXMuXG4gICAgICovXG4gICAgY2xhc3MgS2VybmVsU3RhdHVzIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnN0cnVjdCBhIG5ldyBrZXJuZWwgc3RhdHVzIHdpZGdldC5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKHNlc3Npb25Db250ZXh0LCB0cmFuc2xhdG9yKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zID0gdGhpcy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoVE9PTEJBUl9LRVJORUxfU1RBVFVTX0NMQVNTKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXR1c05hbWVzID0gdHJhbnNsYXRlS2VybmVsU3RhdHVzZXModGhpcy50cmFuc2xhdG9yKTtcbiAgICAgICAgICAgIHRoaXMuX29uU3RhdHVzQ2hhbmdlZChzZXNzaW9uQ29udGV4dCk7XG4gICAgICAgICAgICBzZXNzaW9uQ29udGV4dC5zdGF0dXNDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25TdGF0dXNDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgICAgIHNlc3Npb25Db250ZXh0LmNvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25TdGF0dXNDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIGEgc3RhdHVzIG9uIGEga2VybmVsLlxuICAgICAgICAgKi9cbiAgICAgICAgX29uU3RhdHVzQ2hhbmdlZChzZXNzaW9uQ29udGV4dCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHNlc3Npb25Db250ZXh0Lmtlcm5lbERpc3BsYXlTdGF0dXM7XG4gICAgICAgICAgICBjb25zdCBjaXJjbGVJY29uUHJvcHMgPSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyOiB0aGlzLm5vZGUsXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuX3RyYW5zLl9fKCdLZXJuZWwgJTEnLCB0aGlzLl9zdGF0dXNOYW1lc1tzdGF0dXNdIHx8IHN0YXR1cyksXG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldDogJ3Rvb2xiYXJCdXR0b24nLFxuICAgICAgICAgICAgICAgIGFsaWduU2VsZjogJ25vcm1hbCcsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMjRweCdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBzZXQgdGhlIGljb25cbiAgICAgICAgICAgIExhYkljb24ucmVtb3ZlKHRoaXMubm9kZSk7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnYnVzeScgfHxcbiAgICAgICAgICAgICAgICBzdGF0dXMgPT09ICdzdGFydGluZycgfHxcbiAgICAgICAgICAgICAgICBzdGF0dXMgPT09ICd0ZXJtaW5hdGluZycgfHxcbiAgICAgICAgICAgICAgICBzdGF0dXMgPT09ICdyZXN0YXJ0aW5nJyB8fFxuICAgICAgICAgICAgICAgIHN0YXR1cyA9PT0gJ2luaXRpYWxpemluZycpIHtcbiAgICAgICAgICAgICAgICBjaXJjbGVJY29uLmVsZW1lbnQoY2lyY2xlSWNvblByb3BzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHN0YXR1cyA9PT0gJ2Nvbm5lY3RpbmcnIHx8XG4gICAgICAgICAgICAgICAgc3RhdHVzID09PSAnZGlzY29ubmVjdGVkJyB8fFxuICAgICAgICAgICAgICAgIHN0YXR1cyA9PT0gJ3Vua25vd24nKSB7XG4gICAgICAgICAgICAgICAgb2ZmbGluZUJvbHRJY29uLmVsZW1lbnQoY2lyY2xlSWNvblByb3BzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNpcmNsZUVtcHR5SWNvbi5lbGVtZW50KGNpcmNsZUljb25Qcm9wcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgUHJpdmF0ZS5LZXJuZWxTdGF0dXMgPSBLZXJuZWxTdGF0dXM7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpZGdldC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBNZXNzYWdlTG9vcCB9IGZyb20gJ0BsdW1pbm8vbWVzc2FnaW5nJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuLyoqXG4gKiBBbiBhYnN0cmFjdCBjbGFzcyBmb3IgYSBQaG9zcGhvciB3aWRnZXQgd2hpY2ggcmVuZGVycyBhIFJlYWN0IGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWN0V2lkZ2V0IGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGBSZWFjdFdpZGdldGAgdGhhdCByZW5kZXJzIGEgY29uc3RhbnQgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gZWxlbWVudCBSZWFjdCBlbGVtZW50IHRvIHJlbmRlci5cbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyAoY2xhc3MgZXh0ZW5kcyBSZWFjdFdpZGdldCB7XG4gICAgICAgICAgICByZW5kZXIoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB0byB1cGRhdGUgdGhlIHN0YXRlIG9mIHRoZSB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIG1ldGhvZCB0cmlnZ2Vyc1xuICAgICAqIFZET00gYmFzZWQgcmVuZGVyaW5nIGJ5IGNhbGxpbmcgdGhlIGByZW5kZXJET01gIG1ldGhvZC5cbiAgICAgKi9cbiAgICBvblVwZGF0ZVJlcXVlc3QobXNnKSB7XG4gICAgICAgIHRoaXMucmVuZGVyUHJvbWlzZSA9IHRoaXMucmVuZGVyRE9NKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCBhZnRlciB0aGUgd2lkZ2V0IGlzIGF0dGFjaGVkIHRvIHRoZSBET01cbiAgICAgKi9cbiAgICBvbkFmdGVyQXR0YWNoKG1zZykge1xuICAgICAgICAvLyBNYWtlICpzdXJlKiB0aGUgd2lkZ2V0IGlzIHJlbmRlcmVkLlxuICAgICAgICBNZXNzYWdlTG9vcC5zZW5kTWVzc2FnZSh0aGlzLCBXaWRnZXQuTXNnLlVwZGF0ZVJlcXVlc3QpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYmVmb3JlIHRoZSB3aWRnZXQgaXMgZGV0YWNoZWQgZnJvbSB0aGUgRE9NLlxuICAgICAqL1xuICAgIG9uQmVmb3JlRGV0YWNoKG1zZykge1xuICAgICAgICAvLyBVbm1vdW50IHRoZSBjb21wb25lbnQgc28gaXQgY2FuIHRlYXIgZG93bi5cbiAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLm5vZGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgdGhlIFJlYWN0IG5vZGVzIHRvIHRoZSBET00uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSByZW5kZXJpbmcgaXMgZG9uZS5cbiAgICAgKi9cbiAgICByZW5kZXJET00oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZub2RlID0gdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIC8vIFNwbGl0IHVwIHRoZSBhcnJheS9lbGVtZW50IGNhc2VzIHNvIHR5cGUgaW5mZXJlbmNlIGNob29zZXMgdGhlIHJpZ2h0XG4gICAgICAgICAgICAvLyBzaWduYXR1cmUuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2bm9kZSkpIHtcbiAgICAgICAgICAgICAgICBSZWFjdERPTS5yZW5kZXIodm5vZGUsIHRoaXMubm9kZSwgcmVzb2x2ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh2bm9kZSkge1xuICAgICAgICAgICAgICAgIFJlYWN0RE9NLnJlbmRlcih2bm9kZSwgdGhpcy5ub2RlLCByZXNvbHZlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBBbiBhYnN0cmFjdCBSZWFjdFdpZGdldCB3aXRoIGEgbW9kZWwuXG4gKi9cbmV4cG9ydCBjbGFzcyBWRG9tUmVuZGVyZXIgZXh0ZW5kcyBSZWFjdFdpZGdldCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IFZEb21SZW5kZXJlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1vZGVsKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX21vZGVsQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMubW9kZWwgPSAobW9kZWwgIT09IG51bGwgJiYgbW9kZWwgIT09IHZvaWQgMCA/IG1vZGVsIDogbnVsbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgbW9kZWwgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBnZXQgbW9kZWxDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZWxDaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIG1vZGVsIGFuZCBmaXJlIGNoYW5nZWQgc2lnbmFscy5cbiAgICAgKi9cbiAgICBzZXQgbW9kZWwobmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX21vZGVsID09PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9tb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5fbW9kZWwuc3RhdGVDaGFuZ2VkLmRpc2Nvbm5lY3QodGhpcy51cGRhdGUsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21vZGVsID0gbmV3VmFsdWU7XG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgbmV3VmFsdWUuc3RhdGVDaGFuZ2VkLmNvbm5lY3QodGhpcy51cGRhdGUsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIHRoaXMuX21vZGVsQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCBtb2RlbC5cbiAgICAgKi9cbiAgICBnZXQgbW9kZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSB0aGlzIHdpZGdldC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbW9kZWwgPSBudWxsO1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxufVxuLyoqXG4gKiBVc2VTaWduYWwgcHJvdmlkZXMgYSB3YXkgdG8gaG9vayB1cCBhIFBob3NwaG9yIHNpZ25hbCB0byBhIFJlYWN0IGVsZW1lbnQsXG4gKiBzbyB0aGF0IHRoZSBlbGVtZW50IGlzIHJlLXJlbmRlcmVkIGV2ZXJ5IHRpbWUgdGhlIHNpZ25hbCBmaXJlcy5cbiAqXG4gKiBJdCBpcyBpbXBsZW1lbnRlZCB0aHJvdWdoIHRoZSBcInJlbmRlciBwcm9wc1wiIHRlY2huaXF1ZSwgdXNpbmcgdGhlIGBjaGlsZHJlbmBcbiAqIHByb3AgYXMgYSBmdW5jdGlvbiB0byByZW5kZXIsIHNvIHRoYXQgaXQgY2FuIGJlIHVzZWQgZWl0aGVyIGFzIGEgcHJvcCBvciBhcyBhIGNoaWxkXG4gKiBvZiB0aGlzIGVsZW1lbnRcbiAqIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZW5kZXItcHJvcHMuaHRtbFxuICpcbiAqXG4gKiBFeGFtcGxlIGFzIGNoaWxkOlxuICpcbiAqIGBgYFxuICogZnVuY3Rpb24gTGl2ZUJ1dHRvbihpc0FjdGl2ZVNpZ25hbDogSVNpZ25hbDxhbnksIGJvb2xlYW4+KSB7XG4gKiAgcmV0dXJuIChcbiAqICAgIDxVc2VTaWduYWwgc2lnbmFsPXtpc0FjdGl2ZVNpZ25hbH0gaW5pdGlhbEFyZ3M9e1RydWV9PlxuICogICAgIHsoXywgaXNBY3RpdmUpID0+IDxCdXR0b24gaXNBY3RpdmU9e2lzQWN0aXZlfT59XG4gKiAgICA8L1VzZVNpZ25hbD5cbiAqICApXG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBFeGFtcGxlIGFzIHByb3A6XG4gKlxuICogYGBgXG4gKiBmdW5jdGlvbiBMaXZlQnV0dG9uKGlzQWN0aXZlU2lnbmFsOiBJU2lnbmFsPGFueSwgYm9vbGVhbj4pIHtcbiAqICByZXR1cm4gKFxuICogICAgPFVzZVNpZ25hbFxuICogICAgICBzaWduYWw9e2lzQWN0aXZlU2lnbmFsfVxuICogICAgICBpbml0aWFsQXJncz17VHJ1ZX1cbiAqICAgICAgY2hpbGRyZW49eyhfLCBpc0FjdGl2ZSkgPT4gPEJ1dHRvbiBpc0FjdGl2ZT17aXNBY3RpdmV9Pn1cbiAqICAgIC8+XG4gKiAgKVxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VTaWduYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zbG90ID0gKHNlbmRlciwgYXJncykgPT4ge1xuICAgICAgICAgICAgLy8gc2tpcCBzZXR0aW5nIG5ldyBzdGF0ZSBpZiB3ZSBoYXZlIGEgc2hvdWxkVXBkYXRlIGZ1bmN0aW9uIGFuZCBpdCByZXR1cm5zIGZhbHNlXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG91bGRVcGRhdGUgJiYgIXRoaXMucHJvcHMuc2hvdWxkVXBkYXRlKHNlbmRlciwgYXJncykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IFtzZW5kZXIsIGFyZ3NdIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnN0YXRlID0geyB2YWx1ZTogW3RoaXMucHJvcHMuaW5pdGlhbFNlbmRlciwgdGhpcy5wcm9wcy5pbml0aWFsQXJnc10gfTtcbiAgICB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc2lnbmFsLmNvbm5lY3QodGhpcy5zbG90KTtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc2lnbmFsLmRpc2Nvbm5lY3QodGhpcy5zbG90KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbiguLi50aGlzLnN0YXRlLnZhbHVlKTtcbiAgICB9XG59XG4vKipcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIFZEb21SZW5kZXJlciBtb2RlbC5cbiAqL1xuZXhwb3J0IGNsYXNzIFZEb21Nb2RlbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gYW55IG1vZGVsIHN0YXRlIGNoYW5nZXMuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIHRoZSBtb2RlbCBpcyBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2UgdGhlIG1vZGVsLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgU2lnbmFsLmNsZWFyRGF0YSh0aGlzKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD12ZG9tLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFJlc3RvcmFibGVQb29sIH0gZnJvbSAnQGp1cHl0ZXJsYWIvc3RhdGVkYic7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG5pbXBvcnQgeyBGb2N1c1RyYWNrZXIgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuLyoqXG4gKiBBIGNsYXNzIHRoYXQga2VlcHMgdHJhY2sgb2Ygd2lkZ2V0IGluc3RhbmNlcyBvbiBhbiBBcHBsaWNhdGlvbiBzaGVsbC5cbiAqXG4gKiBAdHlwZXBhcmFtIFQgLSBUaGUgdHlwZSBvZiB3aWRnZXQgYmVpbmcgdHJhY2tlZC4gRGVmYXVsdHMgdG8gYFdpZGdldGAuXG4gKlxuICogIyMjIyBOb3Rlc1xuICogVGhlIEFQSSBzdXJmYWNlIGFyZWEgb2YgdGhpcyBjb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBpcyBzdWJzdGFudGlhbGx5IGxhcmdlclxuICogdGhhbiB0aGUgd2lkZ2V0IHRyYWNrZXIgaW50ZXJmYWNlIGl0IGltcGxlbWVudHMuIFRoZSBpbnRlcmZhY2UgaXMgaW50ZW5kZWRcbiAqIGZvciBleHBvcnQgYnkgSnVweXRlckxhYiBwbHVnaW5zIHRoYXQgY3JlYXRlIHdpZGdldHMgYW5kIGhhdmUgY2xpZW50cyB3aG8gbWF5XG4gKiB3aXNoIHRvIGtlZXAgdHJhY2sgb2YgbmV3bHkgY3JlYXRlZCB3aWRnZXRzLiBUaGlzIGNsYXNzLCBob3dldmVyLCBjYW4gYmUgdXNlZFxuICogaW50ZXJuYWxseSBieSBwbHVnaW5zIHRvIHJlc3RvcmUgc3RhdGUgYXMgd2VsbC5cbiAqL1xuZXhwb3J0IGNsYXNzIFdpZGdldFRyYWNrZXIge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyB3aWRnZXQgdHJhY2tlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIGluc3RhbnRpYXRpb24gb3B0aW9ucyBmb3IgYSB3aWRnZXQgdHJhY2tlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRDaGFuZ2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl93aWRnZXRBZGRlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX3dpZGdldFVwZGF0ZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICBjb25zdCBmb2N1cyA9ICh0aGlzLl9mb2N1c1RyYWNrZXIgPSBuZXcgRm9jdXNUcmFja2VyKCkpO1xuICAgICAgICBjb25zdCBwb29sID0gKHRoaXMuX3Bvb2wgPSBuZXcgUmVzdG9yYWJsZVBvb2wob3B0aW9ucykpO1xuICAgICAgICB0aGlzLm5hbWVzcGFjZSA9IG9wdGlvbnMubmFtZXNwYWNlO1xuICAgICAgICBmb2N1cy5jdXJyZW50Q2hhbmdlZC5jb25uZWN0KChfLCBjdXJyZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoY3VycmVudC5uZXdWYWx1ZSAhPT0gdGhpcy5jdXJyZW50V2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgcG9vbC5jdXJyZW50ID0gY3VycmVudC5uZXdWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHBvb2wuYWRkZWQuY29ubmVjdCgoXywgd2lkZ2V0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl93aWRnZXRBZGRlZC5lbWl0KHdpZGdldCk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICBwb29sLmN1cnJlbnRDaGFuZ2VkLmNvbm5lY3QoKF8sIHdpZGdldCkgPT4ge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHBvb2wncyBjdXJyZW50IHJlZmVyZW5jZSBpcyBgbnVsbGAgYnV0IHRoZSBmb2N1cyB0cmFja2VyIGhhcyBhXG4gICAgICAgICAgICAvLyBjdXJyZW50IHdpZGdldCwgdXBkYXRlIHRoZSBwb29sIHRvIG1hdGNoIHRoZSBmb2N1cyB0cmFja2VyLlxuICAgICAgICAgICAgaWYgKHdpZGdldCA9PT0gbnVsbCAmJiBmb2N1cy5jdXJyZW50V2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgcG9vbC5jdXJyZW50ID0gZm9jdXMuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uQ3VycmVudENoYW5nZWQod2lkZ2V0KTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRDaGFuZ2VkLmVtaXQod2lkZ2V0KTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHBvb2wudXBkYXRlZC5jb25uZWN0KChfLCB3aWRnZXQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3dpZGdldFVwZGF0ZWQuZW1pdCh3aWRnZXQpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBjdXJyZW50IHdpZGdldCBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGdldCBjdXJyZW50Q2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRDaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCB3aWRnZXQgaXMgdGhlIG1vc3QgcmVjZW50bHkgZm9jdXNlZCBvciBhZGRlZCB3aWRnZXQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogSXQgaXMgdGhlIG1vc3QgcmVjZW50bHkgZm9jdXNlZCB3aWRnZXQsIG9yIHRoZSBtb3N0IHJlY2VudGx5IGFkZGVkXG4gICAgICogd2lkZ2V0IGlmIG5vIHdpZGdldCBoYXMgdGFrZW4gZm9jdXMuXG4gICAgICovXG4gICAgZ2V0IGN1cnJlbnRXaWRnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb29sLmN1cnJlbnQgfHwgbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHJlc29sdmVkIHdoZW4gdGhlIHRyYWNrZXIgaGFzIGJlZW4gcmVzdG9yZWQuXG4gICAgICovXG4gICAgZ2V0IHJlc3RvcmVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9vbC5yZXN0b3JlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiB3aWRnZXRzIGhlbGQgYnkgdGhlIHRyYWNrZXIuXG4gICAgICovXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb29sLnNpemU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiBhIHdpZGdldCBpcyBhZGRlZC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIHNpZ25hbCB3aWxsIG9ubHkgZmlyZSB3aGVuIGEgd2lkZ2V0IGlzIGFkZGVkIHRvIHRoZSB0cmFja2VyLiBJdCB3aWxsXG4gICAgICogbm90IGZpcmUgaWYgYSB3aWRnZXQgaXMgaW5qZWN0ZWQgaW50byB0aGUgdHJhY2tlci5cbiAgICAgKi9cbiAgICBnZXQgd2lkZ2V0QWRkZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWRnZXRBZGRlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIGEgd2lkZ2V0IGlzIHVwZGF0ZWQuXG4gICAgICovXG4gICAgZ2V0IHdpZGdldFVwZGF0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWRnZXRVcGRhdGVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgYSBuZXcgd2lkZ2V0IHRvIHRoZSB0cmFja2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHdpZGdldCAtIFRoZSB3aWRnZXQgYmVpbmcgYWRkZWQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIHdpZGdldCBwYXNzZWQgaW50byB0aGUgdHJhY2tlciBpcyBhZGRlZCBzeW5jaHJvbm91c2x5OyBpdHMgZXhpc3RlbmNlIGluXG4gICAgICogdGhlIHRyYWNrZXIgY2FuIGJlIGNoZWNrZWQgd2l0aCB0aGUgYGhhcygpYCBtZXRob2QuIFRoZSBwcm9taXNlIHRoaXMgbWV0aG9kXG4gICAgICogcmV0dXJucyByZXNvbHZlcyBhZnRlciB0aGUgd2lkZ2V0IGhhcyBiZWVuIGFkZGVkIGFuZCBzYXZlZCB0byBhbiB1bmRlcmx5aW5nXG4gICAgICogcmVzdG9yYXRpb24gY29ubmVjdG9yLCBpZiBvbmUgaXMgYXZhaWxhYmxlLlxuICAgICAqXG4gICAgICogVGhlIG5ld2x5IGFkZGVkIHdpZGdldCBiZWNvbWVzIHRoZSBjdXJyZW50IHdpZGdldCB1bmxlc3MgdGhlIGZvY3VzIHRyYWNrZXJcbiAgICAgKiBhbHJlYWR5IGhhZCBhIGZvY3VzZWQgd2lkZ2V0LlxuICAgICAqL1xuICAgIGFzeW5jIGFkZCh3aWRnZXQpIHtcbiAgICAgICAgdGhpcy5fZm9jdXNUcmFja2VyLmFkZCh3aWRnZXQpO1xuICAgICAgICBhd2FpdCB0aGlzLl9wb29sLmFkZCh3aWRnZXQpO1xuICAgICAgICBpZiAoIXRoaXMuX2ZvY3VzVHJhY2tlci5hY3RpdmVXaWRnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Bvb2wuY3VycmVudCA9IHdpZGdldDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBUZXN0IHdoZXRoZXIgdGhlIHRyYWNrZXIgaXMgZGlzcG9zZWQuXG4gICAgICovXG4gICAgZ2V0IGlzRGlzcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0Rpc3Bvc2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUgdHJhY2tlci5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3Bvb2wuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9mb2N1c1RyYWNrZXIuZGlzcG9zZSgpO1xuICAgICAgICBTaWduYWwuY2xlYXJEYXRhKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kIHRoZSBmaXJzdCB3aWRnZXQgaW4gdGhlIHRyYWNrZXIgdGhhdCBzYXRpc2ZpZXMgYSBmaWx0ZXIgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gLSBmbiBUaGUgZmlsdGVyIGZ1bmN0aW9uIHRvIGNhbGwgb24gZWFjaCB3aWRnZXQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogSWYgbm8gd2lkZ2V0IGlzIGZvdW5kLCB0aGUgdmFsdWUgcmV0dXJuZWQgaXMgYHVuZGVmaW5lZGAuXG4gICAgICovXG4gICAgZmluZChmbikge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9vbC5maW5kKGZuKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSXRlcmF0ZSB0aHJvdWdoIGVhY2ggd2lkZ2V0IGluIHRoZSB0cmFja2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgb24gZWFjaCB3aWRnZXQuXG4gICAgICovXG4gICAgZm9yRWFjaChmbikge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9vbC5mb3JFYWNoKGZuKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmlsdGVyIHRoZSB3aWRnZXRzIGluIHRoZSB0cmFja2VyIGJhc2VkIG9uIGEgcHJlZGljYXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGZuIC0gVGhlIGZ1bmN0aW9uIGJ5IHdoaWNoIHRvIGZpbHRlci5cbiAgICAgKi9cbiAgICBmaWx0ZXIoZm4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvb2wuZmlsdGVyKGZuKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5qZWN0IGEgZm9yZWlnbiB3aWRnZXQgaW50byB0aGUgd2lkZ2V0IHRyYWNrZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IC0gVGhlIHdpZGdldCB0byBpbmplY3QgaW50byB0aGUgdHJhY2tlci5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBJbmplY3RlZCB3aWRnZXRzIHdpbGwgbm90IGhhdmUgdGhlaXIgc3RhdGUgc2F2ZWQgYnkgdGhlIHRyYWNrZXIuXG4gICAgICpcbiAgICAgKiBUaGUgcHJpbWFyeSB1c2UgY2FzZSBmb3Igd2lkZ2V0IGluamVjdGlvbiBpcyBmb3IgYSBwbHVnaW4gdGhhdCBvZmZlcnMgYVxuICAgICAqIHN1Yi1jbGFzcyBvZiBhbiBleHRhbnQgcGx1Z2luIHRvIGhhdmUgaXRzIGluc3RhbmNlcyBzaGFyZSB0aGUgc2FtZSBjb21tYW5kc1xuICAgICAqIGFzIHRoZSBwYXJlbnQgcGx1Z2luIChzaW5jZSBtb3N0IHJlbGV2YW50IGNvbW1hbmRzIHdpbGwgdXNlIHRoZVxuICAgICAqIGBjdXJyZW50V2lkZ2V0YCBvZiB0aGUgcGFyZW50IHBsdWdpbidzIHdpZGdldCB0cmFja2VyKS4gSW4gdGhpcyBzaXR1YXRpb24sXG4gICAgICogdGhlIHN1Yi1jbGFzcyBwbHVnaW4gbWF5IHdlbGwgaGF2ZSBpdHMgb3duIHdpZGdldCB0cmFja2VyIGZvciBsYXlvdXQgYW5kXG4gICAgICogc3RhdGUgcmVzdG9yYXRpb24gaW4gYWRkaXRpb24gdG8gaW5qZWN0aW5nIGl0cyB3aWRnZXRzIGludG8gdGhlIHBhcmVudFxuICAgICAqIHBsdWdpbidzIHdpZGdldCB0cmFja2VyLlxuICAgICAqL1xuICAgIGluamVjdCh3aWRnZXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvb2wuaW5qZWN0KHdpZGdldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoaXMgdHJhY2tlciBoYXMgdGhlIHNwZWNpZmllZCB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IC0gVGhlIHdpZGdldCB3aG9zZSBleGlzdGVuY2UgaXMgYmVpbmcgY2hlY2tlZC5cbiAgICAgKi9cbiAgICBoYXMod2lkZ2V0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb29sLmhhcyh3aWRnZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXN0b3JlIHRoZSB3aWRnZXRzIGluIHRoaXMgdHJhY2tlcidzIG5hbWVzcGFjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0aGF0IGRlc2NyaWJlIHJlc3RvcmF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiByZXN0b3JhdGlvbiBoYXMgY29tcGxldGVkLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIG5vdCB0eXBpY2FsbHkgYmUgaW52b2tlZCBieSBjbGllbnQgY29kZS5cbiAgICAgKiBJdHMgcHJpbWFyeSB1c2UgY2FzZSBpcyB0byBiZSBpbnZva2VkIGJ5IGEgcmVzdG9yZXIuXG4gICAgICovXG4gICAgYXN5bmMgcmVzdG9yZShvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb29sLnJlc3RvcmUob3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhdmUgdGhlIHJlc3RvcmUgZGF0YSBmb3IgYSBnaXZlbiB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IC0gVGhlIHdpZGdldCBiZWluZyBzYXZlZC5cbiAgICAgKi9cbiAgICBhc3luYyBzYXZlKHdpZGdldCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9vbC5zYXZlKHdpZGdldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgY3VycmVudCBjaGFuZ2UgZXZlbnQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gaXMgYSBuby1vcC5cbiAgICAgKi9cbiAgICBvbkN1cnJlbnRDaGFuZ2VkKHZhbHVlKSB7XG4gICAgICAgIC8qIG5vLW9wICovXG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2lkZ2V0dHJhY2tlci5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBQcm9taXNlRGVsZWdhdGUsIFRva2VuIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuLyogdHNsaW50OmRpc2FibGUgKi9cbi8qKlxuICogVGhlIGRlZmF1bHQgd2luZG93IHJlc29sdmVyIHRva2VuLlxuICovXG5leHBvcnQgY29uc3QgSVdpbmRvd1Jlc29sdmVyID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi9hcHB1dGlsczpJV2luZG93UmVzb2x2ZXInKTtcbi8qKlxuICogQSBjb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIHdpbmRvdyBuYW1lIHJlc29sdmVyLlxuICovXG5leHBvcnQgY2xhc3MgV2luZG93UmVzb2x2ZXIge1xuICAgIC8qKlxuICAgICAqIFRoZSByZXNvbHZlZCB3aW5kb3cgbmFtZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBJZiB0aGUgYHJlc29sdmVgIHByb21pc2UgaGFzIG5vdCByZXNvbHZlZCwgdGhlIGJlaGF2aW9yIGlzIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc29sdmUgYSB3aW5kb3cgbmFtZSB0byB1c2UgYXMgYSBoYW5kbGUgYW1vbmcgc2hhcmVkIHJlc291cmNlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjYW5kaWRhdGUgLSBUaGUgcG90ZW50aWFsIHdpbmRvdyBuYW1lIGJlaW5nIHJlc29sdmVkLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFR5cGljYWxseSwgdGhlIG5hbWUgY2FuZGlkYXRlIHNob3VsZCBiZSBhIEp1cHl0ZXJMYWIgd29ya3NwYWNlIG5hbWUgb3JcbiAgICAgKiBhbiBlbXB0eSBzdHJpbmcgaWYgdGhlcmUgaXMgbm8gd29ya3NwYWNlLlxuICAgICAqXG4gICAgICogSWYgdGhlIHJldHVybmVkIHByb21pc2UgcmVqZWN0cywgYSB3aW5kb3cgbmFtZSBjYW5ub3QgYmUgcmVzb2x2ZWQgd2l0aG91dFxuICAgICAqIHVzZXIgaW50ZXJ2ZW50aW9uLCB3aGljaCB0eXBpY2FsbHkgbWVhbnMgbmF2aWdhdGlvbiB0byBhIG5ldyBVUkwuXG4gICAgICovXG4gICAgcmVzb2x2ZShjYW5kaWRhdGUpIHtcbiAgICAgICAgcmV0dXJuIFByaXZhdGUucmVzb2x2ZShjYW5kaWRhdGUpLnRoZW4obmFtZSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLypcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIG1vZHVsZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIFRoZSBpbnRlcm5hbCBwcmVmaXggZm9yIHByaXZhdGUgbG9jYWwgc3RvcmFnZSBrZXlzLlxuICAgICAqL1xuICAgIGNvbnN0IFBSRUZJWCA9ICdAanVweXRlcmxhYi9zdGF0ZWRiOlN0YXRlREInO1xuICAgIC8qKlxuICAgICAqIFRoZSBsb2NhbCBzdG9yYWdlIGJlYWNvbiBrZXkuXG4gICAgICovXG4gICAgY29uc3QgQkVBQ09OID0gYCR7UFJFRklYfTpiZWFjb25gO1xuICAgIC8qKlxuICAgICAqIFRoZSB0aW1lb3V0IChpbiBtcykgdG8gd2FpdCBmb3IgYmVhY29uIHJlc3BvbmRlcnMuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyB2YWx1ZSBpcyBhIHdob2xlIG51bWJlciBiZXR3ZWVuIDIwMCBhbmQgNTAwIGluIG9yZGVyIHRvIHByZXZlbnRcbiAgICAgKiBwZXJmZWN0IHRpbWVvdXQgY29sbGlzaW9ucyBiZXR3ZWVuIG11bHRpcGxlIHNpbXVsdGFuZW91c2x5IG9wZW5pbmcgd2luZG93c1xuICAgICAqIHRoYXQgaGF2ZSB0aGUgc2FtZSBVUkwuIFRoaXMgaXMgYW4gZWRnZSBjYXNlIGJlY2F1c2UgbXVsdGlwbGUgd2luZG93c1xuICAgICAqIHNob3VsZCBub3Qgb3JkaW5hcmlseSBzaGFyZSB0aGUgc2FtZSBVUkwsIGJ1dCBpdCBjYW4gYmUgY29udHJpdmVkLlxuICAgICAqL1xuICAgIGNvbnN0IFRJTUVPVVQgPSBNYXRoLmZsb29yKDIwMCArIE1hdGgucmFuZG9tKCkgKiAzMDApO1xuICAgIC8qKlxuICAgICAqIFRoZSBsb2NhbCBzdG9yYWdlIHdpbmRvdyBrZXkuXG4gICAgICovXG4gICAgY29uc3QgV0lORE9XID0gYCR7UFJFRklYfTp3aW5kb3dgO1xuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgYmVhY29uIHJlcXVlc3RcbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBXZSBrZWVwIHRyYWNrIG9mIHRoZSBjdXJyZW50IHJlcXVlc3Qgc28gdGhhdCB3ZSBjYW4gaWdub3JlIG91ciBvd24gYmVhY29uXG4gICAgICogcmVxdWVzdHMuIFRoaXMgaXMgdG8gd29yayBhcm91bmQgYSBidWcgaW4gU2FmYXJpLCB3aGVyZSBTYWZhcmkgc29tZXRpbWVzXG4gICAgICogdHJpZ2dlcnMgbG9jYWwgc3RvcmFnZSBldmVudHMgZm9yIGNoYW5nZXMgbWFkZSBieSB0aGUgY3VycmVudCB0YWIuIFNlZVxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9qdXB5dGVybGFiL2p1cHl0ZXJsYWIvaXNzdWVzLzY5MjEjaXNzdWVjb21tZW50LTU0MDgxNzI4M1xuICAgICAqIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICovXG4gICAgbGV0IGN1cnJlbnRCZWFjb25SZXF1ZXN0ID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBBIHBvdGVudGlhbCBwcmVmZXJyZWQgZGVmYXVsdCB3aW5kb3cgbmFtZS5cbiAgICAgKi9cbiAgICBsZXQgY2FuZGlkYXRlID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBUaGUgd2luZG93IG5hbWUgcHJvbWlzZS5cbiAgICAgKi9cbiAgICBjb25zdCBkZWxlZ2F0ZSA9IG5ldyBQcm9taXNlRGVsZWdhdGUoKTtcbiAgICAvKipcbiAgICAgKiBUaGUga25vd24gd2luZG93IG5hbWVzLlxuICAgICAqL1xuICAgIGNvbnN0IGtub3duID0ge307XG4gICAgLyoqXG4gICAgICogVGhlIHdpbmRvdyBuYW1lLlxuICAgICAqL1xuICAgIGxldCBuYW1lID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBuYW1lIHJlc29sdXRpb24gaGFzIGNvbXBsZXRlZC5cbiAgICAgKi9cbiAgICBsZXQgcmVzb2x2ZWQgPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBTdGFydCB0aGUgc3RvcmFnZSBldmVudCBoYW5kbGVyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgICAgIC8vIExpc3RlbiB0byBhbGwgc3RvcmFnZSBldmVudHMgZm9yIGJlYWNvbnMgYW5kIHdpbmRvdyBuYW1lcy5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsga2V5LCBuZXdWYWx1ZSB9ID0gZXZlbnQ7XG4gICAgICAgICAgICAvLyBBbGwgdGhlIGtleXMgd2UgY2FyZSBhYm91dCBoYXZlIHZhbHVlcy5cbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHRoZSBiZWFjb24gd2FzIGZpcmVkLCByZXNwb25kIHdpdGggYSBwaW5nLlxuICAgICAgICAgICAgaWYgKGtleSA9PT0gQkVBQ09OICYmXG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgIT09IGN1cnJlbnRCZWFjb25SZXF1ZXN0ICYmXG4gICAgICAgICAgICAgICAgY2FuZGlkYXRlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcGluZyhyZXNvbHZlZCA/IG5hbWUgOiBjYW5kaWRhdGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHRoZSB3aW5kb3cgbmFtZSBpcyByZXNvbHZlZCwgYmFpbC5cbiAgICAgICAgICAgIGlmIChyZXNvbHZlZCB8fCBrZXkgIT09IFdJTkRPVykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlcG9ydGVkID0gbmV3VmFsdWUucmVwbGFjZSgvXFwtXFxkKyQvLCAnJyk7XG4gICAgICAgICAgICAvLyBTdG9yZSB0aGUgcmVwb3J0ZWQgd2luZG93IG5hbWUuXG4gICAgICAgICAgICBrbm93bltyZXBvcnRlZF0gPSBudWxsO1xuICAgICAgICAgICAgLy8gSWYgYSByZXBvcnRlZCB3aW5kb3cgbmFtZSBhbmQgY2FuZGlkYXRlIGNvbGxpZGUsIHJlamVjdCB0aGUgY2FuZGlkYXRlLlxuICAgICAgICAgICAgaWYgKCFjYW5kaWRhdGUgfHwgY2FuZGlkYXRlIGluIGtub3duKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQaW5nIHBlZXJzIHdpdGggcGF5bG9hZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwaW5nKHBheWxvYWQpIHtcbiAgICAgICAgaWYgKHBheWxvYWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IGxvY2FsU3RvcmFnZSB9ID0gd2luZG93O1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShXSU5ET1csIGAke3BheWxvYWR9LSR7bmV3IERhdGUoKS5nZXRUaW1lKCl9YCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlamVjdCB0aGUgY2FuZGlkYXRlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlamVjdCgpIHtcbiAgICAgICAgcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICBjdXJyZW50QmVhY29uUmVxdWVzdCA9IG51bGw7XG4gICAgICAgIGRlbGVnYXRlLnJlamVjdChgV2luZG93IG5hbWUgY2FuZGlkYXRlIFwiJHtjYW5kaWRhdGV9XCIgYWxyZWFkeSBleGlzdHNgKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSB3aW5kb3cgbmFtZSB1c2VkIGZvciByZXN0b3JhdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXNvbHZlKHBvdGVudGlhbCkge1xuICAgICAgICBpZiAocmVzb2x2ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZS5wcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNldCB0aGUgbG9jYWwgY2FuZGlkYXRlLlxuICAgICAgICBjYW5kaWRhdGUgPSBwb3RlbnRpYWw7XG4gICAgICAgIGlmIChjYW5kaWRhdGUgaW4ga25vd24pIHtcbiAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlLnByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBsb2NhbFN0b3JhZ2UsIHNldFRpbWVvdXQgfSA9IHdpbmRvdztcbiAgICAgICAgLy8gV2FpdCB1bnRpbCBvdGhlciB3aW5kb3dzIGhhdmUgcmVwb3J0ZWQgYmVmb3JlIGNsYWltaW5nIHRoZSBjYW5kaWRhdGUuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc29sdmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgdGhlIHdpbmRvdyBuYW1lIGhhcyBub3QgYWxyZWFkeSBiZWVuIHJlc29sdmVkLCBjaGVjayBvbmUgbGFzdCB0aW1lXG4gICAgICAgICAgICAvLyB0byBjb25maXJtIGl0IGlzIG5vdCBhIGR1cGxpY2F0ZSBiZWZvcmUgcmVzb2x2aW5nLlxuICAgICAgICAgICAgaWYgKCFjYW5kaWRhdGUgfHwgY2FuZGlkYXRlIGluIGtub3duKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgY3VycmVudEJlYWNvblJlcXVlc3QgPSBudWxsO1xuICAgICAgICAgICAgZGVsZWdhdGUucmVzb2x2ZSgobmFtZSA9IGNhbmRpZGF0ZSkpO1xuICAgICAgICAgICAgcGluZyhuYW1lKTtcbiAgICAgICAgfSwgVElNRU9VVCk7XG4gICAgICAgIC8vIEZpcmUgdGhlIGJlYWNvbiB0byBjb2xsZWN0IG90aGVyIHdpbmRvd3MnIG5hbWVzLlxuICAgICAgICBjdXJyZW50QmVhY29uUmVxdWVzdCA9IGAke01hdGgucmFuZG9tKCl9LSR7bmV3IERhdGUoKS5nZXRUaW1lKCl9YDtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQkVBQ09OLCBjdXJyZW50QmVhY29uUmVxdWVzdCk7XG4gICAgICAgIHJldHVybiBkZWxlZ2F0ZS5wcm9taXNlO1xuICAgIH1cbiAgICBQcml2YXRlLnJlc29sdmUgPSByZXNvbHZlO1xuICAgIC8vIEluaXRpYWxpemUgdGhlIHN0b3JhZ2UgbGlzdGVuZXIgYXQgcnVudGltZS5cbiAgICAoKCkgPT4ge1xuICAgICAgICBpbml0aWFsaXplKCk7XG4gICAgfSkoKTtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2luZG93cmVzb2x2ZXIuanMubWFwIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==