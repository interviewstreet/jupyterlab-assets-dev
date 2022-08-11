(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_cells_lib_index_js"],{

/***/ "../../packages/cells/lib/celldragutils.js":
/*!*************************************************!*\
  !*** ../../packages/cells/lib/celldragutils.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CellDragUtils": () => (/* binding */ CellDragUtils)
/* harmony export */ });
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/virtualdom */ "webpack/sharing/consume/default/@lumino/virtualdom/@lumino/virtualdom");
/* harmony import */ var _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * This module contains some utility functions to operate on cells. This
 * could be shared by widgets that contain cells, like the CodeConsole or
 * Notebook widgets.
 */


/**
 * Constants for drag
 */
/**
 * The threshold in pixels to start a drag event.
 */
const DRAG_THRESHOLD = 5;
/**
 * The class name added to drag images.
 */
const DRAG_IMAGE_CLASS = 'jp-dragImage';
/**
 * The class name added to singular drag images
 */
const SINGLE_DRAG_IMAGE_CLASS = 'jp-dragImage-singlePrompt';
/**
 * The class name added to the drag image cell content.
 */
const CELL_DRAG_CONTENT_CLASS = 'jp-dragImage-content';
/**
 * The class name added to the drag image cell content.
 */
const CELL_DRAG_PROMPT_CLASS = 'jp-dragImage-prompt';
/**
 * The class name added to the drag image cell content.
 */
const CELL_DRAG_MULTIPLE_BACK = 'jp-dragImage-multipleBack';
var CellDragUtils;
(function (CellDragUtils) {
    /**
     * Find the cell index containing the target html element.
     * This function traces up the DOM hierarchy to find the root cell
     * node. Then find the corresponding child and select it.
     *
     * @param node - the cell node or a child of the cell node.
     * @param cells - an iterable of Cells
     * @param isCellNode - a function that takes in a node and checks if
     * it is a cell node.
     *
     * @returns index of the cell we're looking for. Returns -1 if
     * the cell is not founds
     */
    function findCell(node, cells, isCellNode) {
        let cellIndex = -1;
        while (node && node.parentElement) {
            if (isCellNode(node)) {
                (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.each)(cells, (cell, index) => {
                    if (cell.node === node) {
                        cellIndex = index;
                        return false;
                    }
                });
                break;
            }
            node = node.parentElement;
        }
        return cellIndex;
    }
    CellDragUtils.findCell = findCell;
    /**
     * Detect which part of the cell triggered the MouseEvent
     *
     * @param cell - The cell which contains the MouseEvent's target
     * @param target - The DOM node which triggered the MouseEvent
     */
    function detectTargetArea(cell, target) {
        let targetArea;
        if (cell) {
            if (cell.editorWidget.node.contains(target)) {
                targetArea = 'input';
            }
            else if (cell.promptNode.contains(target)) {
                targetArea = 'prompt';
            }
            else {
                targetArea = 'cell';
            }
        }
        else {
            targetArea = 'unknown';
        }
        return targetArea;
    }
    CellDragUtils.detectTargetArea = detectTargetArea;
    /**
     * Detect if a drag event should be started. This is down if the
     * mouse is moved beyond a certain distance (DRAG_THRESHOLD).
     *
     * @param prevX - X Coordinate of the mouse pointer during the mousedown event
     * @param prevY - Y Coordinate of the mouse pointer during the mousedown event
     * @param nextX - Current X Coordinate of the mouse pointer
     * @param nextY - Current Y Coordinate of the mouse pointer
     */
    function shouldStartDrag(prevX, prevY, nextX, nextY) {
        const dx = Math.abs(nextX - prevX);
        const dy = Math.abs(nextY - prevY);
        return dx >= DRAG_THRESHOLD || dy >= DRAG_THRESHOLD;
    }
    CellDragUtils.shouldStartDrag = shouldStartDrag;
    /**
     * Create an image for the cell(s) to be dragged
     *
     * @param activeCell - The cell from where the drag event is triggered
     * @param selectedCells - The cells to be dragged
     */
    function createCellDragImage(activeCell, selectedCells) {
        const count = selectedCells.length;
        let promptNumber;
        if (activeCell.model.type === 'code') {
            const executionCount = activeCell.model
                .executionCount;
            promptNumber = ' ';
            if (executionCount) {
                promptNumber = executionCount.toString();
            }
        }
        else {
            promptNumber = '';
        }
        const cellContent = activeCell.model.value.text.split('\n')[0].slice(0, 26);
        if (count > 1) {
            if (promptNumber !== '') {
                return _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.VirtualDOM.realize(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.div(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.div({ className: DRAG_IMAGE_CLASS }, _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.span({ className: CELL_DRAG_PROMPT_CLASS }, '[' + promptNumber + ']:'), _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.span({ className: CELL_DRAG_CONTENT_CLASS }, cellContent)), _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.div({ className: CELL_DRAG_MULTIPLE_BACK }, '')));
            }
            else {
                return _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.VirtualDOM.realize(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.div(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.div({ className: DRAG_IMAGE_CLASS }, _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.span({ className: CELL_DRAG_PROMPT_CLASS }), _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.span({ className: CELL_DRAG_CONTENT_CLASS }, cellContent)), _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.div({ className: CELL_DRAG_MULTIPLE_BACK }, '')));
            }
        }
        else {
            if (promptNumber !== '') {
                return _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.VirtualDOM.realize(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.div(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.div({ className: `${DRAG_IMAGE_CLASS} ${SINGLE_DRAG_IMAGE_CLASS}` }, _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.span({ className: CELL_DRAG_PROMPT_CLASS }, '[' + promptNumber + ']:'), _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.span({ className: CELL_DRAG_CONTENT_CLASS }, cellContent))));
            }
            else {
                return _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.VirtualDOM.realize(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.div(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.div({ className: `${DRAG_IMAGE_CLASS} ${SINGLE_DRAG_IMAGE_CLASS}` }, _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.span({ className: CELL_DRAG_PROMPT_CLASS }), _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_1__.h.span({ className: CELL_DRAG_CONTENT_CLASS }, cellContent))));
            }
        }
    }
    CellDragUtils.createCellDragImage = createCellDragImage;
})(CellDragUtils || (CellDragUtils = {}));
//# sourceMappingURL=celldragutils.js.map

/***/ }),

/***/ "../../packages/cells/lib/collapser.js":
/*!*********************************************!*\
  !*** ../../packages/cells/lib/collapser.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Collapser": () => (/* binding */ Collapser),
/* harmony export */   "InputCollapser": () => (/* binding */ InputCollapser),
/* harmony export */   "OutputCollapser": () => (/* binding */ OutputCollapser)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/domutils */ "webpack/sharing/consume/default/@lumino/domutils/@lumino/domutils");
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_domutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/



/**
 * The CSS class added to all collapsers.
 */
const COLLAPSER_CLASS = 'jp-Collapser';
/**
 * The CSS class added to the collapser child.
 */
const COLLAPSER_CHILD_CLASS = 'jp-Collapser-child';
/**
 * The CSS class added to input collapsers.
 */
const INPUT_COLLAPSER = 'jp-InputCollapser';
/**
 * The CSS class added to output collapsers.
 */
const OUTPUT_COLLAPSER = 'jp-OutputCollapser';
/**
 * Abstract collapser base class.
 *
 * ### Notes
 * A collapser is a visible div to the left of a cell's
 * input/output that a user can click on to collapse the
 * input/output.
 */
class Collapser extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget {
    /**
     * Construct a new collapser.
     */
    constructor() {
        super();
        this.addClass(COLLAPSER_CLASS);
    }
    /**
     * Is the input/output of the parent collapsed.
     */
    get collapsed() {
        return false;
    }
    /**
     * Render the collapser with the virtual DOM.
     */
    render() {
        const childClass = COLLAPSER_CHILD_CLASS;
        return react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", { className: childClass, onClick: e => this.handleClick(e) });
    }
}
/**
 * A collapser subclass to collapse a cell's input area.
 */
class InputCollapser extends Collapser {
    /**
     * Construct a new input collapser.
     */
    constructor() {
        super();
        this.addClass(INPUT_COLLAPSER);
    }
    /**
     * Is the cell's input collapsed?
     */
    get collapsed() {
        var _a;
        const cell = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.parent;
        if (cell) {
            return cell.inputHidden;
        }
        else {
            return false;
        }
    }
    /**
     * Handle a click event for the user to collapse the cell's input.
     */
    handleClick(e) {
        var _a;
        const cell = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.parent;
        if (cell) {
            cell.inputHidden = !cell.inputHidden;
        }
        /* We need this until we watch the cell state */
        this.update();
    }
}
/**
 * A collapser subclass to collapse a cell's output area.
 */
class OutputCollapser extends Collapser {
    /**
     * Construct a new output collapser.
     */
    constructor() {
        super();
        this.addClass(OUTPUT_COLLAPSER);
    }
    /**
     * Is the cell's output collapsed?
     */
    get collapsed() {
        var _a;
        const cell = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.parent;
        if (cell) {
            return cell.outputHidden;
        }
        else {
            return false;
        }
    }
    /**
     * Handle a click event for the user to collapse the cell's output.
     */
    handleClick(e) {
        var _a, _b;
        const cell = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.parent;
        if (cell) {
            cell.outputHidden = !cell.outputHidden;
            /* Scroll cell into view after output collapse */
            if (cell.outputHidden) {
                let area = (_b = cell.parent) === null || _b === void 0 ? void 0 : _b.node;
                if (area) {
                    _lumino_domutils__WEBPACK_IMPORTED_MODULE_1__.ElementExt.scrollIntoViewIfNeeded(area, cell.node);
                }
            }
        }
        /* We need this until we watch the cell state */
        this.update();
    }
}
//# sourceMappingURL=collapser.js.map

/***/ }),

/***/ "../../packages/cells/lib/headerfooter.js":
/*!************************************************!*\
  !*** ../../packages/cells/lib/headerfooter.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CellHeader": () => (/* binding */ CellHeader),
/* harmony export */   "CellFooter": () => (/* binding */ CellFooter)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/

/**
 * The CSS class added to the cell header.
 */
const CELL_HEADER_CLASS = 'jp-CellHeader';
/**
 * The CSS class added to the cell footer.
 */
const CELL_FOOTER_CLASS = 'jp-CellFooter';
/**
 * Default implementation of a cell header.
 */
class CellHeader extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    /**
     * Construct a new cell header.
     */
    constructor() {
        super();
        this.addClass(CELL_HEADER_CLASS);
    }
}
/**
 * Default implementation of a cell footer.
 */
class CellFooter extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    /**
     * Construct a new cell footer.
     */
    constructor() {
        super();
        this.addClass(CELL_FOOTER_CLASS);
    }
}
//# sourceMappingURL=headerfooter.js.map

/***/ }),

/***/ "../../packages/cells/lib/index.js":
/*!*****************************************!*\
  !*** ../../packages/cells/lib/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CellDragUtils": () => (/* reexport safe */ _celldragutils__WEBPACK_IMPORTED_MODULE_0__.CellDragUtils),
/* harmony export */   "Collapser": () => (/* reexport safe */ _collapser__WEBPACK_IMPORTED_MODULE_1__.Collapser),
/* harmony export */   "InputCollapser": () => (/* reexport safe */ _collapser__WEBPACK_IMPORTED_MODULE_1__.InputCollapser),
/* harmony export */   "OutputCollapser": () => (/* reexport safe */ _collapser__WEBPACK_IMPORTED_MODULE_1__.OutputCollapser),
/* harmony export */   "CellFooter": () => (/* reexport safe */ _headerfooter__WEBPACK_IMPORTED_MODULE_2__.CellFooter),
/* harmony export */   "CellHeader": () => (/* reexport safe */ _headerfooter__WEBPACK_IMPORTED_MODULE_2__.CellHeader),
/* harmony export */   "InputArea": () => (/* reexport safe */ _inputarea__WEBPACK_IMPORTED_MODULE_3__.InputArea),
/* harmony export */   "InputPrompt": () => (/* reexport safe */ _inputarea__WEBPACK_IMPORTED_MODULE_3__.InputPrompt),
/* harmony export */   "AttachmentsCellModel": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_4__.AttachmentsCellModel),
/* harmony export */   "CellModel": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_4__.CellModel),
/* harmony export */   "CodeCellModel": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_4__.CodeCellModel),
/* harmony export */   "MarkdownCellModel": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_4__.MarkdownCellModel),
/* harmony export */   "RawCellModel": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_4__.RawCellModel),
/* harmony export */   "isCodeCellModel": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_4__.isCodeCellModel),
/* harmony export */   "isMarkdownCellModel": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_4__.isMarkdownCellModel),
/* harmony export */   "isRawCellModel": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_4__.isRawCellModel),
/* harmony export */   "InputPlaceholder": () => (/* reexport safe */ _placeholder__WEBPACK_IMPORTED_MODULE_5__.InputPlaceholder),
/* harmony export */   "OutputPlaceholder": () => (/* reexport safe */ _placeholder__WEBPACK_IMPORTED_MODULE_5__.OutputPlaceholder),
/* harmony export */   "Placeholder": () => (/* reexport safe */ _placeholder__WEBPACK_IMPORTED_MODULE_5__.Placeholder),
/* harmony export */   "AttachmentsCell": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_6__.AttachmentsCell),
/* harmony export */   "Cell": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_6__.Cell),
/* harmony export */   "CodeCell": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_6__.CodeCell),
/* harmony export */   "MARKDOWN_HEADING_COLLAPSED": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_6__.MARKDOWN_HEADING_COLLAPSED),
/* harmony export */   "MarkdownCell": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_6__.MarkdownCell),
/* harmony export */   "RawCell": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_6__.RawCell)
/* harmony export */ });
/* harmony import */ var _celldragutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./celldragutils */ "../../packages/cells/lib/celldragutils.js");
/* harmony import */ var _collapser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collapser */ "../../packages/cells/lib/collapser.js");
/* harmony import */ var _headerfooter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./headerfooter */ "../../packages/cells/lib/headerfooter.js");
/* harmony import */ var _inputarea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inputarea */ "../../packages/cells/lib/inputarea.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./model */ "../../packages/cells/lib/model.js");
/* harmony import */ var _placeholder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./placeholder */ "../../packages/cells/lib/placeholder.js");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./widget */ "../../packages/cells/lib/widget.js");
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module cells
 */







//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/cells/lib/inputarea.js":
/*!*********************************************!*\
  !*** ../../packages/cells/lib/inputarea.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputArea": () => (/* binding */ InputArea),
/* harmony export */   "InputPrompt": () => (/* binding */ InputPrompt)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/codemirror */ "webpack/sharing/consume/default/@jupyterlab/codemirror/@jupyterlab/codemirror");
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_2__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/




/**
 * The class name added to input area widgets.
 */
const INPUT_AREA_CLASS = 'jp-InputArea';
/**
 * The class name added to the prompt area of cell.
 */
const INPUT_AREA_PROMPT_CLASS = 'jp-InputArea-prompt';
/**
 * The class name added to OutputPrompt.
 */
const INPUT_PROMPT_CLASS = 'jp-InputPrompt';
/**
 * The class name added to the editor area of the cell.
 */
const INPUT_AREA_EDITOR_CLASS = 'jp-InputArea-editor';
/** ****************************************************************************
 * InputArea
 ******************************************************************************/
/**
 * An input area widget, which hosts a prompt and an editor widget.
 */
class InputArea extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    /**
     * Construct an input area widget.
     */
    constructor(options) {
        super();
        this.addClass(INPUT_AREA_CLASS);
        const model = (this.model = options.model);
        const contentFactory = (this.contentFactory =
            options.contentFactory || InputArea.defaultContentFactory);
        // Prompt
        const prompt = (this._prompt = contentFactory.createInputPrompt());
        prompt.addClass(INPUT_AREA_PROMPT_CLASS);
        // Editor
        const editorOptions = {
            model,
            factory: contentFactory.editorFactory,
            updateOnShow: options.updateOnShow
        };
        const editor = (this._editor = new _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditorWrapper(editorOptions));
        editor.addClass(INPUT_AREA_EDITOR_CLASS);
        const layout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.PanelLayout());
        layout.addWidget(prompt);
        if (!options.placeholder) {
            layout.addWidget(editor);
        }
    }
    /**
     * Get the CodeEditorWrapper used by the cell.
     */
    get editorWidget() {
        return this._editor;
    }
    /**
     * Get the CodeEditor used by the cell.
     */
    get editor() {
        return this._editor.editor;
    }
    /**
     * Get the prompt node used by the cell.
     */
    get promptNode() {
        return this._prompt.node;
    }
    /**
     * Get the rendered input area widget, if any.
     */
    get renderedInput() {
        return this._rendered;
    }
    /**
     * Render an input instead of the text editor.
     */
    renderInput(widget) {
        const layout = this.layout;
        if (this._rendered) {
            this._rendered.parent = null;
        }
        this._editor.hide();
        this._rendered = widget;
        layout.addWidget(widget);
    }
    /**
     * Show the text editor.
     */
    showEditor() {
        if (this._rendered) {
            this._rendered.parent = null;
        }
        this._editor.show();
    }
    /**
     * Set the prompt of the input area.
     */
    setPrompt(value) {
        this._prompt.executionCount = value;
    }
    /**
     * Dispose of the resources held by the widget.
     */
    dispose() {
        // Do nothing if already disposed.
        if (this.isDisposed) {
            return;
        }
        this._prompt = null;
        this._editor = null;
        this._rendered = null;
        super.dispose();
    }
}
/**
 * A namespace for `InputArea` statics.
 */
(function (InputArea) {
    /**
     * Default implementation of `IContentFactory`.
     *
     * This defaults to using an `editorFactory` based on CodeMirror.
     */
    class ContentFactory {
        /**
         * Construct a `ContentFactory`.
         */
        constructor(options = {}) {
            this._editor = options.editorFactory || InputArea.defaultEditorFactory;
        }
        /**
         * Return the `CodeEditor.Factory` being used.
         */
        get editorFactory() {
            return this._editor;
        }
        /**
         * Create an input prompt.
         */
        createInputPrompt() {
            return new InputPrompt();
        }
    }
    InputArea.ContentFactory = ContentFactory;
    /**
     * A function to create the default CodeMirror editor factory.
     */
    function _createDefaultEditorFactory() {
        const editorServices = new _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_2__.CodeMirrorEditorFactory();
        return editorServices.newInlineEditor;
    }
    /**
     * The default editor factory singleton based on CodeMirror.
     */
    InputArea.defaultEditorFactory = _createDefaultEditorFactory();
    /**
     * The default `ContentFactory` instance.
     */
    InputArea.defaultContentFactory = new ContentFactory({});
})(InputArea || (InputArea = {}));
/**
 * The default input prompt implementation.
 */
class InputPrompt extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    /*
     * Create an output prompt widget.
     */
    constructor() {
        super();
        this._executionCount = null;
        this.addClass(INPUT_PROMPT_CLASS);
    }
    /**
     * The execution count for the prompt.
     */
    get executionCount() {
        return this._executionCount;
    }
    set executionCount(value) {
        this._executionCount = value;
        if (value === null) {
            this.node.textContent = ' ';
        }
        else {
            this.node.textContent = `[${value || ' '}]:`;
        }
    }
}
//# sourceMappingURL=inputarea.js.map

/***/ }),

/***/ "../../packages/cells/lib/model.js":
/*!*****************************************!*\
  !*** ../../packages/cells/lib/model.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isCodeCellModel": () => (/* binding */ isCodeCellModel),
/* harmony export */   "isMarkdownCellModel": () => (/* binding */ isMarkdownCellModel),
/* harmony export */   "isRawCellModel": () => (/* binding */ isRawCellModel),
/* harmony export */   "CellModel": () => (/* binding */ CellModel),
/* harmony export */   "AttachmentsCellModel": () => (/* binding */ AttachmentsCellModel),
/* harmony export */   "RawCellModel": () => (/* binding */ RawCellModel),
/* harmony export */   "MarkdownCellModel": () => (/* binding */ MarkdownCellModel),
/* harmony export */   "CodeCellModel": () => (/* binding */ CodeCellModel)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_attachments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/attachments */ "webpack/sharing/consume/default/@jupyterlab/attachments/@jupyterlab/attachments");
/* harmony import */ var _jupyterlab_attachments__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_attachments__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/shared-models */ "webpack/sharing/consume/default/@jupyterlab/shared-models/@jupyterlab/shared-models");
/* harmony import */ var _jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/outputarea */ "webpack/sharing/consume/default/@jupyterlab/outputarea/@jupyterlab/outputarea");
/* harmony import */ var _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_5__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
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







const globalModelDBMutex = _jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_4__.createMutex();
function isCodeCellModel(model) {
    return model.type === 'code';
}
function isMarkdownCellModel(model) {
    return model.type === 'markdown';
}
function isRawCellModel(model) {
    return model.type === 'raw';
}
/**
 * An implementation of the cell model.
 */
class CellModel extends _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_3__.CodeEditor.Model {
    /**
     * Construct a cell model from optional cell content.
     */
    constructor(options) {
        var _a;
        super({
            modelDB: options.modelDB,
            id: options.id || ((_a = options.cell) === null || _a === void 0 ? void 0 : _a.id) || _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.UUID.uuid4()
        });
        /**
         * A signal emitted when the state of the model changes.
         */
        this.contentChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
        /**
         * A signal emitted when a model state changes.
         */
        this.stateChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
        this.value.changed.connect(this.onGenericChange, this);
        const cellType = this.modelDB.createValue('type');
        cellType.set(this.type);
        const observableMetadata = this.modelDB.createMap('metadata');
        observableMetadata.changed.connect(this.onModelDBMetadataChange, this);
        observableMetadata.changed.connect(this.onGenericChange, this);
        const cell = options.cell;
        const trusted = this.modelDB.createValue('trusted');
        trusted.changed.connect(this.onTrustedChanged, this);
        if (!cell) {
            trusted.set(false);
            return;
        }
        trusted.set(!!cell.metadata['trusted']);
        delete cell.metadata['trusted'];
        // Set the text value, normalizing line endings to \n
        if (Array.isArray(cell.source)) {
            this.value.text = cell.source
                .map(s => s.replace(/\r\n/g, '\n').replace(/\r/g, '\n'))
                .join('');
        }
        else {
            this.value.text = cell.source.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        }
        const metadata = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.JSONExt.deepCopy(cell.metadata);
        if (this.type !== 'raw') {
            delete metadata['format'];
        }
        if (this.type !== 'code') {
            delete metadata['collapsed'];
            delete metadata['scrolled'];
        }
        for (const key in metadata) {
            observableMetadata.set(key, metadata[key]);
        }
    }
    /**
     * The type of cell.
     */
    get type() {
        // This getter really should be abstract, but our current constructor
        // depends on .type working
        return 'raw';
    }
    /**
     * The id for the cell.
     */
    get id() {
        return this.sharedModel.getId();
    }
    /**
     * The metadata associated with the cell.
     */
    get metadata() {
        return this.modelDB.get('metadata');
    }
    /**
     * Get the trusted state of the model.
     */
    get trusted() {
        return this.modelDB.getValue('trusted');
    }
    /**
     * Set the trusted state of the model.
     */
    set trusted(newValue) {
        const oldValue = this.trusted;
        if (oldValue === newValue) {
            return;
        }
        this.modelDB.setValue('trusted', newValue);
    }
    /**
     * Serialize the model to JSON.
     */
    toJSON() {
        const metadata = Object.create(null);
        for (const key of this.metadata.keys()) {
            const value = JSON.parse(JSON.stringify(this.metadata.get(key)));
            metadata[key] = value;
        }
        if (this.trusted) {
            metadata['trusted'] = true;
        }
        return {
            cell_type: this.type,
            source: this.value.text,
            metadata
        };
    }
    /**
     * Handle a change to the trusted state.
     *
     * The default implementation is a no-op.
     */
    onTrustedChanged(trusted, args) {
        /* no-op */
    }
    /**
     * When we initialize a cell model, we create a standalone model that cannot be shared in a YNotebook.
     * Call this function to re-initialize the local representation based on a fresh shared model (e.g. models.YFile or models.YCodeCell).
     *
     * @param sharedModel
     * @param reinitialize Whether to reinitialize the shared model.
     */
    switchSharedModel(sharedModel, reinitialize) {
        if (reinitialize) {
            const newValue = sharedModel.getMetadata();
            if (newValue) {
                this._updateModelDBMetadata(newValue);
            }
        }
        super.switchSharedModel(sharedModel, reinitialize);
    }
    /**
     * Handle a change to the cell metadata modelDB and reflect it in the shared model.
     */
    onModelDBMetadataChange(sender, event) {
        const metadata = this.sharedModel.getMetadata();
        globalModelDBMutex(() => {
            switch (event.type) {
                case 'add':
                    this._changeCellMetadata(metadata, event);
                    break;
                case 'change':
                    this._changeCellMetadata(metadata, event);
                    break;
                case 'remove':
                    delete metadata[event.key];
                    break;
                default:
                    throw new Error(`Invalid event type: ${event.type}`);
            }
            this.sharedModel.setMetadata(metadata);
        });
    }
    /**
     * Change the cell metadata for a given event.
     *
     * @param metadata The cell metadata.
     * @param event The event to handle.
     */
    _changeCellMetadata(metadata, event) {
        switch (event.key) {
            case 'jupyter':
                metadata.jupyter = event.newValue;
                break;
            case 'collapsed':
                metadata.collapsed = event.newValue;
                break;
            case 'name':
                metadata.name = event.newValue;
                break;
            case 'scrolled':
                metadata.scrolled = event.newValue;
                break;
            case 'tags':
                metadata.tags = event.newValue;
                break;
            case 'trusted':
                metadata.trusted = event.newValue;
                break;
            default:
                // The default is applied for custom metadata that are not
                // defined in the official nbformat but which are defined
                // by the user.
                metadata[event.key] = event.newValue;
        }
    }
    /**
     * Handle a change to the cell shared model and reflect it in modelDB.
     * We update the modeldb metadata when the shared model changes.
     *
     * This method overrides the CodeEditor protected _onSharedModelChanged
     * so we first call super._onSharedModelChanged
     *
     * @override CodeEditor._onSharedModelChanged
     */
    _onSharedModelChanged(sender, change) {
        super._onSharedModelChanged(sender, change);
        globalModelDBMutex(() => {
            var _a;
            if (change.metadataChange) {
                const newValue = (_a = change.metadataChange) === null || _a === void 0 ? void 0 : _a.newValue;
                if (newValue) {
                    this._updateModelDBMetadata(newValue);
                }
            }
        });
    }
    _updateModelDBMetadata(metadata) {
        Object.keys(metadata).map(key => {
            switch (key) {
                case 'collapsed':
                    this.metadata.set('collapsed', metadata.jupyter);
                    break;
                case 'jupyter':
                    this.metadata.set('jupyter', metadata.jupyter);
                    break;
                case 'name':
                    this.metadata.set('name', metadata.name);
                    break;
                case 'scrolled':
                    this.metadata.set('scrolled', metadata.scrolled);
                    break;
                case 'tags':
                    this.metadata.set('tags', metadata.tags);
                    break;
                case 'trusted':
                    this.metadata.set('trusted', metadata.trusted);
                    break;
                default:
                    // The default is applied for custom metadata that are not
                    // defined in the official nbformat but which are defined
                    // by the user.
                    this.metadata.set(key, metadata[key]);
            }
        });
    }
    /**
     * Handle a change to the observable value.
     */
    onGenericChange() {
        this.contentChanged.emit(void 0);
    }
}
/**
 * A base implementation for cell models with attachments.
 */
class AttachmentsCellModel extends CellModel {
    /**
     * Construct a new cell with optional attachments.
     */
    constructor(options) {
        super(options);
        const factory = options.contentFactory || AttachmentsCellModel.defaultContentFactory;
        let attachments;
        const cell = options.cell;
        if (cell && (cell.cell_type === 'raw' || cell.cell_type === 'markdown')) {
            attachments = cell
                .attachments;
        }
        this._attachments = factory.createAttachmentsModel({
            values: attachments,
            modelDB: this.modelDB
        });
        this._attachments.stateChanged.connect(this.onGenericChange, this);
    }
    /**
     * Get the attachments of the model.
     */
    get attachments() {
        return this._attachments;
    }
    /**
     * Serialize the model to JSON.
     */
    toJSON() {
        const cell = super.toJSON();
        if (this.attachments.length) {
            cell.attachments = this.attachments.toJSON();
        }
        return cell;
    }
}
/**
 * The namespace for `AttachmentsCellModel` statics.
 */
(function (AttachmentsCellModel) {
    /**
     * The default implementation of an `IContentFactory`.
     */
    class ContentFactory {
        /**
         * Create an attachments model.
         */
        createAttachmentsModel(options) {
            return new _jupyterlab_attachments__WEBPACK_IMPORTED_MODULE_2__.AttachmentsModel(options);
        }
    }
    AttachmentsCellModel.ContentFactory = ContentFactory;
    /**
     * The shared `ContentFactory` instance.
     */
    AttachmentsCellModel.defaultContentFactory = new ContentFactory();
})(AttachmentsCellModel || (AttachmentsCellModel = {}));
/**
 * An implementation of a raw cell model.
 */
class RawCellModel extends AttachmentsCellModel {
    /**
     * The type of the cell.
     */
    get type() {
        return 'raw';
    }
    /**
     * Serialize the model to JSON.
     */
    toJSON() {
        const cell = super.toJSON();
        cell.id = this.id;
        return cell;
    }
}
/**
 * An implementation of a markdown cell model.
 */
class MarkdownCellModel extends AttachmentsCellModel {
    /**
     * Construct a markdown cell model from optional cell content.
     */
    constructor(options) {
        super(options);
        // Use the Github-flavored markdown mode.
        this.mimeType = 'text/x-ipythongfm';
    }
    /**
     * The type of the cell.
     */
    get type() {
        return 'markdown';
    }
    /**
     * Serialize the model to JSON.
     */
    toJSON() {
        const cell = super.toJSON();
        cell.id = this.id;
        return cell;
    }
}
/**
 * An implementation of a code cell Model.
 */
class CodeCellModel extends CellModel {
    /**
     * Construct a new code cell with optional original cell content.
     */
    constructor(options) {
        var _a;
        super(options);
        this._executedCode = '';
        this._isDirty = false;
        const factory = options.contentFactory || CodeCellModel.defaultContentFactory;
        const trusted = this.trusted;
        const cell = options.cell;
        let outputs = [];
        const executionCount = this.modelDB.createValue('executionCount');
        if (!executionCount.get()) {
            if (cell && cell.cell_type === 'code') {
                executionCount.set(cell.execution_count || null);
                outputs = (_a = cell.outputs) !== null && _a !== void 0 ? _a : [];
                // If execution count is not null presume the input code was the latest executed
                // TODO load from the notebook file when the dirty state is stored in it
                if (cell.execution_count != null) {
                    // True if execution_count is null or undefined
                    this._executedCode = this.value.text.trim();
                }
            }
            else {
                executionCount.set(null);
            }
        }
        this.value.changed.connect(this._onValueChanged, this);
        executionCount.changed.connect(this._onExecutionCountChanged, this);
        globalModelDBMutex(() => {
            const sharedCell = this.sharedModel;
            sharedCell.setOutputs(outputs);
        });
        this._outputs = factory.createOutputArea({ trusted, values: outputs });
        this._outputs.changed.connect(this.onGenericChange, this);
        this._outputs.changed.connect(this.onModelDBOutputsChange, this);
        // We keep `collapsed` and `jupyter.outputs_hidden` metadata in sync, since
        // they are redundant in nbformat 4.4. See
        // https://github.com/jupyter/nbformat/issues/137
        this.metadata.changed.connect(Private.collapseChanged, this);
        // Sync `collapsed` and `jupyter.outputs_hidden` for the first time, giving
        // preference to `collapsed`.
        if (this.metadata.has('collapsed')) {
            const collapsed = this.metadata.get('collapsed');
            Private.collapseChanged(this.metadata, {
                type: 'change',
                key: 'collapsed',
                oldValue: collapsed,
                newValue: collapsed
            });
        }
        else if (this.metadata.has('jupyter')) {
            const jupyter = this.metadata.get('jupyter');
            if (jupyter.hasOwnProperty('outputs_hidden')) {
                Private.collapseChanged(this.metadata, {
                    type: 'change',
                    key: 'jupyter',
                    oldValue: jupyter,
                    newValue: jupyter
                });
            }
        }
    }
    switchSharedModel(sharedModel, reinitialize) {
        if (reinitialize) {
            this.clearExecution();
            sharedModel.getOutputs().forEach(output => this._outputs.add(output));
        }
        super.switchSharedModel(sharedModel, reinitialize);
    }
    /**
     * The type of the cell.
     */
    get type() {
        return 'code';
    }
    /**
     * The execution count of the cell.
     */
    get executionCount() {
        return this.modelDB.has('executionCount')
            ? this.modelDB.getValue('executionCount')
            : null;
    }
    set executionCount(newValue) {
        const oldValue = this.executionCount;
        if (newValue === oldValue) {
            return;
        }
        this.modelDB.setValue('executionCount', newValue || null);
    }
    /**
     * Whether the cell is dirty or not.
     *
     * A cell is dirty if it is output is not empty and does not
     * result of the input code execution.
     */
    get isDirty() {
        // Test could be done dynamically with this._executedCode
        // but for performance reason, the diff status is stored in a boolean.
        return this._isDirty;
    }
    /**
     * Set whether the cell is dirty or not.
     */
    _setDirty(v) {
        if (v !== this._isDirty) {
            if (!v) {
                this._executedCode = this.value.text.trim();
            }
            this._isDirty = v;
            this.stateChanged.emit({
                name: 'isDirty',
                oldValue: !v,
                newValue: v
            });
        }
    }
    clearExecution() {
        this.outputs.clear();
        this.executionCount = null;
        this._setDirty(false);
        this.metadata.delete('execution');
    }
    /**
     * The cell outputs.
     */
    get outputs() {
        return this._outputs;
    }
    /**
     * Dispose of the resources held by the model.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._outputs.dispose();
        this._outputs = null;
        super.dispose();
    }
    /**
     * Serialize the model to JSON.
     */
    toJSON() {
        const cell = super.toJSON();
        cell.execution_count = this.executionCount || null;
        cell.outputs = this.outputs.toJSON();
        cell.id = this.id;
        return cell;
    }
    /**
     * Handle a change to the trusted state.
     */
    onTrustedChanged(trusted, args) {
        if (this._outputs) {
            this._outputs.trusted = args.newValue;
        }
        this.stateChanged.emit({
            name: 'trusted',
            oldValue: args.oldValue,
            newValue: args.newValue
        });
    }
    /**
     * Handle a change to the cell outputs modelDB and reflect it in the shared model.
     */
    onModelDBOutputsChange(sender, event) {
        const codeCell = this.sharedModel;
        globalModelDBMutex(() => {
            switch (event.type) {
                case 'add': {
                    const outputs = event.newValues.map(output => output.toJSON());
                    codeCell.updateOutputs(event.newIndex, event.newIndex + outputs.length, outputs);
                    break;
                }
                case 'set': {
                    const newValues = event.newValues.map(output => output.toJSON());
                    codeCell.updateOutputs(event.oldIndex, event.oldIndex + newValues.length, newValues);
                    break;
                }
                case 'remove':
                    codeCell.updateOutputs(event.oldIndex, event.oldValues.length);
                    break;
                default:
                    throw new Error(`Invalid event type: ${event.type}`);
            }
        });
    }
    /**
     * Handle a change to the code cell value.
     */
    _onValueChanged() {
        if (this.executionCount !== null) {
            this._setDirty(this._executedCode !== this.value.text.trim());
        }
    }
    /**
     * Handle a change to the output shared model and reflect it in modelDB.
     * We update the modeldb metadata when the nbcell changes.
     *
     * This method overrides the CellModel protected _onSharedModelChanged
     * so we first call super._onSharedModelChanged
     *
     * @override CellModel._onSharedModelChanged
     */
    _onSharedModelChanged(sender, change) {
        super._onSharedModelChanged(sender, change);
        globalModelDBMutex(() => {
            if (change.outputsChange) {
                this.clearExecution();
                sender.getOutputs().forEach(output => this._outputs.add(output));
            }
            if (change.executionCountChange) {
                this.executionCount = change.executionCountChange.newValue
                    ? change.executionCountChange.newValue
                    : null;
            }
        });
    }
    /**
     * Handle a change to the execution count.
     */
    _onExecutionCountChanged(count, args) {
        const codeCell = this.sharedModel;
        globalModelDBMutex(() => {
            codeCell.execution_count = args.newValue
                ? args.newValue
                : null;
        });
        this.contentChanged.emit(void 0);
        this.stateChanged.emit({
            name: 'executionCount',
            oldValue: args.oldValue,
            newValue: args.newValue
        });
        if (args.newValue && this.isDirty) {
            this._setDirty(false);
        }
    }
}
/**
 * The namespace for `CodeCellModel` statics.
 */
(function (CodeCellModel) {
    /**
     * The default implementation of an `IContentFactory`.
     */
    class ContentFactory {
        /**
         * Create an output area.
         */
        createOutputArea(options) {
            return new _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_5__.OutputAreaModel(options);
        }
    }
    CodeCellModel.ContentFactory = ContentFactory;
    /**
     * The shared `ContentFactory` instance.
     */
    CodeCellModel.defaultContentFactory = new ContentFactory();
})(CodeCellModel || (CodeCellModel = {}));
var Private;
(function (Private) {
    function collapseChanged(metadata, args) {
        if (args.key === 'collapsed') {
            const jupyter = (metadata.get('jupyter') || {});
            const { outputs_hidden } = jupyter, newJupyter = __rest(jupyter, ["outputs_hidden"]);
            if (outputs_hidden !== args.newValue) {
                if (args.newValue !== undefined) {
                    newJupyter['outputs_hidden'] = args.newValue;
                }
                if (Object.keys(newJupyter).length === 0) {
                    metadata.delete('jupyter');
                }
                else {
                    metadata.set('jupyter', newJupyter);
                }
            }
        }
        else if (args.key === 'jupyter') {
            const jupyter = (args.newValue || {});
            if (jupyter.hasOwnProperty('outputs_hidden')) {
                metadata.set('collapsed', jupyter.outputs_hidden);
            }
            else {
                metadata.delete('collapsed');
            }
        }
    }
    Private.collapseChanged = collapseChanged;
})(Private || (Private = {}));
//# sourceMappingURL=model.js.map

/***/ }),

/***/ "../../packages/cells/lib/placeholder.js":
/*!***********************************************!*\
  !*** ../../packages/cells/lib/placeholder.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Placeholder": () => (/* binding */ Placeholder),
/* harmony export */   "InputPlaceholder": () => (/* binding */ InputPlaceholder),
/* harmony export */   "OutputPlaceholder": () => (/* binding */ OutputPlaceholder)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/



/**
 * The CSS class added to placeholders.
 */
const PLACEHOLDER_CLASS = 'jp-Placeholder';
/**
 * The CSS classes added to input placeholder prompts.
 */
const INPUT_PROMPT_CLASS = 'jp-Placeholder-prompt jp-InputPrompt';
/**
 * The CSS classes added to output placeholder prompts.
 */
const OUTPUT_PROMPT_CLASS = 'jp-Placeholder-prompt jp-OutputPrompt';
/**
 * The CSS class added to placeholder content.
 */
const CONTENT_CLASS = 'jp-Placeholder-content';
/**
 * The CSS class added to input placeholders.
 */
const INPUT_PLACEHOLDER_CLASS = 'jp-InputPlaceholder';
/**
 * The CSS class added to output placeholders.
 */
const OUTPUT_PLACEHOLDER_CLASS = 'jp-OutputPlaceholder';
/**
 * An abstract base class for placeholders
 *
 * ### Notes
 * A placeholder is the element that is shown when input/output
 * is hidden.
 */
class Placeholder extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ReactWidget {
    /**
     * Construct a new placeholder.
     */
    constructor(callback) {
        super();
        this.addClass(PLACEHOLDER_CLASS);
        this._callback = callback;
    }
    /**
     * Handle the click event.
     */
    handleClick(e) {
        const callback = this._callback;
        callback(e);
    }
}
/**
 * The input placeholder class.
 */
class InputPlaceholder extends Placeholder {
    /**
     * Construct a new input placeholder.
     */
    constructor(callback) {
        super(callback);
        this.addClass(INPUT_PLACEHOLDER_CLASS);
    }
    /**
     * Render the input placeholder using the virtual DOM.
     */
    render() {
        return [
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: INPUT_PROMPT_CLASS, key: "input" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: CONTENT_CLASS, onClick: e => this.handleClick(e), key: "content" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.ellipsesIcon.react, { className: "jp-MoreHorizIcon", elementPosition: "center", height: "auto", width: "32px" }))
        ];
    }
}
/**
 * The output placeholder class.
 */
class OutputPlaceholder extends Placeholder {
    /**
     * Construct a new output placeholder.
     */
    constructor(callback) {
        super(callback);
        this.addClass(OUTPUT_PLACEHOLDER_CLASS);
    }
    /**
     * Render the output placeholder using the virtual DOM.
     */
    render() {
        return [
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: OUTPUT_PROMPT_CLASS, key: "output" }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: CONTENT_CLASS, onClick: e => this.handleClick(e), key: "content" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.ellipsesIcon.react, { className: "jp-MoreHorizIcon", elementPosition: "center", height: "auto", width: "32px" }))
        ];
    }
}
//# sourceMappingURL=placeholder.js.map

/***/ }),

/***/ "../../packages/cells/lib/resizeHandle.js":
/*!************************************************!*\
  !*** ../../packages/cells/lib/resizeHandle.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResizeHandle": () => (/* binding */ ResizeHandle)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);

const RESIZE_HANDLE_CLASS = 'jp-CellResizeHandle';
const CELL_RESIZED_CLASS = 'jp-mod-resizedCell';
/**
 * A handle that allows to change input/output proportions in side-by-side mode.
 */
class ResizeHandle extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor(targetNode) {
        super();
        this.targetNode = targetNode;
        this._isActive = false;
        this._isDragging = false;
        this._protectedWidth = 10;
        this.addClass(RESIZE_HANDLE_CLASS);
    }
    onAfterAttach(msg) {
        super.onAfterAttach(msg);
        this.node.addEventListener('dblclick', this);
        this.node.addEventListener('mousedown', this);
    }
    onAfterDetach(msg) {
        super.onAfterAttach(msg);
        this.node.removeEventListener('dblclick', this);
        this.node.removeEventListener('mousedown', this);
    }
    /**
     * Handle the DOM events for the widget.
     *
     * @param event - The DOM event sent to the widget.
     *
     */
    handleEvent(event) {
        var _a, _b;
        switch (event.type) {
            case 'dblclick':
                (_a = this.targetNode.parentNode) === null || _a === void 0 ? void 0 : _a.childNodes.forEach(node => {
                    node.classList.remove(CELL_RESIZED_CLASS);
                });
                document.documentElement.style.setProperty('--jp-side-by-side-resized-cell', '');
                this._isActive = false;
                break;
            case 'mousedown':
                this._mouseOffset =
                    event.clientX - this.node.getBoundingClientRect().x;
                this._isDragging = true;
                if (!this._isActive) {
                    (_b = this.targetNode.parentNode) === null || _b === void 0 ? void 0 : _b.childNodes.forEach(node => {
                        node.classList.add(CELL_RESIZED_CLASS);
                    });
                    this._isActive = true;
                }
                window.addEventListener('mousemove', this);
                window.addEventListener('mouseup', this);
                break;
            case 'mousemove': {
                if (!this._isActive || !this._isDragging) {
                    return;
                }
                const targetRect = this.targetNode.getBoundingClientRect();
                const inputWidth = event.clientX - targetRect.x - this._mouseOffset;
                const resized_ratio = 1 -
                    Math.min(Math.max(inputWidth, this._protectedWidth), targetRect.width - this._protectedWidth) /
                        (targetRect.width - this._protectedWidth);
                // Added friction to the dragging interaction
                if (Math.round(resized_ratio * 100) % 10 == 0) {
                    document.documentElement.style.setProperty('--jp-side-by-side-resized-cell', resized_ratio + 'fr');
                }
                break;
            }
            case 'mouseup':
                this._isDragging = false;
                window.removeEventListener('mousemove', this);
                window.removeEventListener('mouseup', this);
                break;
            default:
                break;
        }
    }
}
//# sourceMappingURL=resizeHandle.js.map

/***/ }),

/***/ "../../packages/cells/lib/widget.js":
/*!******************************************!*\
  !*** ../../packages/cells/lib/widget.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MARKDOWN_HEADING_COLLAPSED": () => (/* binding */ MARKDOWN_HEADING_COLLAPSED),
/* harmony export */   "Cell": () => (/* binding */ Cell),
/* harmony export */   "CodeCell": () => (/* binding */ CodeCell),
/* harmony export */   "AttachmentsCell": () => (/* binding */ AttachmentsCell),
/* harmony export */   "MarkdownCell": () => (/* binding */ MarkdownCell),
/* harmony export */   "RawCell": () => (/* binding */ RawCell)
/* harmony export */ });
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! marked */ "../../packages/cells/node_modules/marked/lib/marked.esm.js");
/* harmony import */ var _jupyterlab_attachments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/attachments */ "webpack/sharing/consume/default/@jupyterlab/attachments/@jupyterlab/attachments");
/* harmony import */ var _jupyterlab_attachments__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_attachments__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/outputarea */ "webpack/sharing/consume/default/@jupyterlab/outputarea/@jupyterlab/outputarea");
/* harmony import */ var _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling/@lumino/polling");
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_lumino_polling__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _collapser__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./collapser */ "../../packages/cells/lib/collapser.js");
/* harmony import */ var _headerfooter__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./headerfooter */ "../../packages/cells/lib/headerfooter.js");
/* harmony import */ var _inputarea__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./inputarea */ "../../packages/cells/lib/inputarea.js");
/* harmony import */ var _placeholder__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./placeholder */ "../../packages/cells/lib/placeholder.js");
/* harmony import */ var _resizeHandle__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./resizeHandle */ "../../packages/cells/lib/resizeHandle.js");
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
















/**
 * The CSS class added to cell widgets.
 */
const CELL_CLASS = 'jp-Cell';
/**
 * The CSS class added to the cell header.
 */
const CELL_HEADER_CLASS = 'jp-Cell-header';
/**
 * The CSS class added to the cell footer.
 */
const CELL_FOOTER_CLASS = 'jp-Cell-footer';
/**
 * The CSS class added to the cell input wrapper.
 */
const CELL_INPUT_WRAPPER_CLASS = 'jp-Cell-inputWrapper';
/**
 * The CSS class added to the cell output wrapper.
 */
const CELL_OUTPUT_WRAPPER_CLASS = 'jp-Cell-outputWrapper';
/**
 * The CSS class added to the cell input area.
 */
const CELL_INPUT_AREA_CLASS = 'jp-Cell-inputArea';
/**
 * The CSS class added to the cell output area.
 */
const CELL_OUTPUT_AREA_CLASS = 'jp-Cell-outputArea';
/**
 * The CSS class added to the cell input collapser.
 */
const CELL_INPUT_COLLAPSER_CLASS = 'jp-Cell-inputCollapser';
/**
 * The CSS class added to the cell output collapser.
 */
const CELL_OUTPUT_COLLAPSER_CLASS = 'jp-Cell-outputCollapser';
/**
 * The class name added to the cell when readonly.
 */
const READONLY_CLASS = 'jp-mod-readOnly';
/**
 * The class name added to the cell when dirty.
 */
const DIRTY_CLASS = 'jp-mod-dirty';
/**
 * The class name added to code cells.
 */
const CODE_CELL_CLASS = 'jp-CodeCell';
/**
 * The class name added to markdown cells.
 */
const MARKDOWN_CELL_CLASS = 'jp-MarkdownCell';
/**
 * The class name added to rendered markdown output widgets.
 */
const MARKDOWN_OUTPUT_CLASS = 'jp-MarkdownOutput';
const MARKDOWN_HEADING_COLLAPSED = 'jp-MarkdownHeadingCollapsed';
const HEADING_COLLAPSER_CLASS = 'jp-collapseHeadingButton';
const SHOW_HIDDEN_CELLS_CLASS = 'jp-showHiddenCellsButton';
/**
 * The class name added to raw cells.
 */
const RAW_CELL_CLASS = 'jp-RawCell';
/**
 * The class name added to a rendered input area.
 */
const RENDERED_CLASS = 'jp-mod-rendered';
const NO_OUTPUTS_CLASS = 'jp-mod-noOutputs';
/**
 * The text applied to an empty markdown cell.
 */
const DEFAULT_MARKDOWN_TEXT = 'Type Markdown and LaTeX: $ α^2 $';
/**
 * The timeout to wait for change activity to have ceased before rendering.
 */
const RENDER_TIMEOUT = 1000;
/**
 * The mime type for a rich contents drag object.
 */
const CONTENTS_MIME_RICH = 'application/x-jupyter-icontentsrich';
/** ****************************************************************************
 * Cell
 ******************************************************************************/
/**
 * A base cell widget.
 */
class Cell extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_10__.Widget {
    /**
     * Construct a new base cell widget.
     */
    constructor(options) {
        super();
        this._displayChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_9__.Signal(this);
        this._readOnly = false;
        this._inputHidden = false;
        this._syncCollapse = false;
        this._syncEditable = false;
        this._resizeDebouncer = new _lumino_polling__WEBPACK_IMPORTED_MODULE_8__.Debouncer(() => {
            this._displayChanged.emit();
        }, 0);
        this.addClass(CELL_CLASS);
        const model = (this._model = options.model);
        const contentFactory = (this.contentFactory =
            options.contentFactory || Cell.defaultContentFactory);
        this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_10__.PanelLayout();
        // Header
        const header = contentFactory.createCellHeader();
        header.addClass(CELL_HEADER_CLASS);
        this.layout.addWidget(header);
        // Input
        const inputWrapper = (this._inputWrapper = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_10__.Panel());
        inputWrapper.addClass(CELL_INPUT_WRAPPER_CLASS);
        const inputCollapser = new _collapser__WEBPACK_IMPORTED_MODULE_11__.InputCollapser();
        inputCollapser.addClass(CELL_INPUT_COLLAPSER_CLASS);
        const input = (this._input = new _inputarea__WEBPACK_IMPORTED_MODULE_12__.InputArea({
            model,
            contentFactory,
            updateOnShow: options.updateEditorOnShow,
            placeholder: options.placeholder
        }));
        input.addClass(CELL_INPUT_AREA_CLASS);
        inputWrapper.addWidget(inputCollapser);
        inputWrapper.addWidget(input);
        this.layout.addWidget(inputWrapper);
        this._inputPlaceholder = new _placeholder__WEBPACK_IMPORTED_MODULE_13__.InputPlaceholder(() => {
            this.inputHidden = !this.inputHidden;
        });
        // Footer
        const footer = this.contentFactory.createCellFooter();
        footer.addClass(CELL_FOOTER_CLASS);
        this.layout.addWidget(footer);
        // Editor settings
        if (options.editorConfig) {
            this.editor.setOptions(Object.assign({}, options.editorConfig));
        }
        model.metadata.changed.connect(this.onMetadataChanged, this);
    }
    /**
     * Initialize view state from model.
     *
     * #### Notes
     * Should be called after construction. For convenience, returns this, so it
     * can be chained in the construction, like `new Foo().initializeState();`
     */
    initializeState() {
        this.loadCollapseState();
        this.loadEditableState();
        return this;
    }
    /**
     * Signal to indicate that widget has changed visibly (in size, in type, etc)
     */
    get displayChanged() {
        return this._displayChanged;
    }
    /**
     * Get the prompt node used by the cell.
     */
    get promptNode() {
        if (!this._inputHidden) {
            return this._input.promptNode;
        }
        else {
            return this._inputPlaceholder.node
                .firstElementChild;
        }
    }
    /**
     * Get the CodeEditorWrapper used by the cell.
     */
    get editorWidget() {
        return this._input.editorWidget;
    }
    /**
     * Get the CodeEditor used by the cell.
     */
    get editor() {
        return this._input.editor;
    }
    /**
     * Get the model used by the cell.
     */
    get model() {
        return this._model;
    }
    /**
     * Get the input area for the cell.
     */
    get inputArea() {
        return this._input;
    }
    /**
     * The read only state of the cell.
     */
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        if (value === this._readOnly) {
            return;
        }
        this._readOnly = value;
        if (this.syncEditable) {
            this.saveEditableState();
        }
        this.update();
    }
    /**
     * Save view editable state to model
     */
    saveEditableState() {
        const { metadata } = this.model;
        const current = metadata.get('editable');
        if ((this.readOnly && current === false) ||
            (!this.readOnly && current === undefined)) {
            return;
        }
        if (this.readOnly) {
            this.model.metadata.set('editable', false);
        }
        else {
            this.model.metadata.delete('editable');
        }
    }
    /**
     * Load view editable state from model.
     */
    loadEditableState() {
        this.readOnly = this.model.metadata.get('editable') === false;
    }
    /**
     * A promise that resolves when the widget renders for the first time.
     */
    get ready() {
        return Promise.resolve(undefined);
    }
    /**
     * Set the prompt for the widget.
     */
    setPrompt(value) {
        this._input.setPrompt(value);
    }
    /**
     * The view state of input being hidden.
     */
    get inputHidden() {
        return this._inputHidden;
    }
    set inputHidden(value) {
        if (this._inputHidden === value) {
            return;
        }
        const layout = this._inputWrapper.layout;
        if (value) {
            this._input.parent = null;
            layout.addWidget(this._inputPlaceholder);
        }
        else {
            this._inputPlaceholder.parent = null;
            layout.addWidget(this._input);
        }
        this._inputHidden = value;
        if (this.syncCollapse) {
            this.saveCollapseState();
        }
        this.handleInputHidden(value);
    }
    /**
     * Save view collapse state to model
     */
    saveCollapseState() {
        const jupyter = Object.assign({}, this.model.metadata.get('jupyter'));
        if ((this.inputHidden && jupyter.source_hidden === true) ||
            (!this.inputHidden && jupyter.source_hidden === undefined)) {
            return;
        }
        if (this.inputHidden) {
            jupyter.source_hidden = true;
        }
        else {
            delete jupyter.source_hidden;
        }
        if (Object.keys(jupyter).length === 0) {
            this.model.metadata.delete('jupyter');
        }
        else {
            this.model.metadata.set('jupyter', jupyter);
        }
    }
    /**
     * Revert view collapse state from model.
     */
    loadCollapseState() {
        const jupyter = this.model.metadata.get('jupyter') || {};
        this.inputHidden = !!jupyter.source_hidden;
    }
    /**
     * Handle the input being hidden.
     *
     * #### Notes
     * This is called by the `inputHidden` setter so that subclasses
     * can perform actions upon the input being hidden without accessing
     * private state.
     */
    handleInputHidden(value) {
        return;
    }
    /**
     * Whether to sync the collapse state to the cell model.
     */
    get syncCollapse() {
        return this._syncCollapse;
    }
    set syncCollapse(value) {
        if (this._syncCollapse === value) {
            return;
        }
        this._syncCollapse = value;
        if (value) {
            this.loadCollapseState();
        }
    }
    /**
     * Whether to sync the editable state to the cell model.
     */
    get syncEditable() {
        return this._syncEditable;
    }
    set syncEditable(value) {
        if (this._syncEditable === value) {
            return;
        }
        this._syncEditable = value;
        if (value) {
            this.loadEditableState();
        }
    }
    /**
     * Clone the cell, using the same model.
     */
    clone() {
        const constructor = this.constructor;
        return new constructor({
            model: this.model,
            contentFactory: this.contentFactory,
            placeholder: false
        });
    }
    /**
     * Dispose of the resources held by the widget.
     */
    dispose() {
        // Do nothing if already disposed.
        if (this.isDisposed) {
            return;
        }
        this._input = null;
        this._model = null;
        this._inputWrapper = null;
        this._inputPlaceholder = null;
        super.dispose();
    }
    /**
     * Handle `after-attach` messages.
     */
    onAfterAttach(msg) {
        this.update();
    }
    /**
     * Handle `'activate-request'` messages.
     */
    onActivateRequest(msg) {
        this.editor.focus();
    }
    /**
     * Handle `fit-request` messages.
     */
    onFitRequest(msg) {
        // need this for for when a theme changes font size
        this.editor.refresh();
    }
    /**
     * Handle `resize` messages.
     */
    onResize(msg) {
        void this._resizeDebouncer.invoke();
    }
    /**
     * Handle `update-request` messages.
     */
    onUpdateRequest(msg) {
        if (!this._model) {
            return;
        }
        // Handle read only state.
        if (this.editor.getOption('readOnly') !== this._readOnly) {
            this.editor.setOption('readOnly', this._readOnly);
            this.toggleClass(READONLY_CLASS, this._readOnly);
        }
    }
    /**
     * Handle changes in the metadata.
     */
    onMetadataChanged(model, args) {
        switch (args.key) {
            case 'jupyter':
                if (this.syncCollapse) {
                    this.loadCollapseState();
                }
                break;
            case 'editable':
                if (this.syncEditable) {
                    this.loadEditableState();
                }
                break;
            default:
                break;
        }
    }
}
/**
 * The namespace for the `Cell` class statics.
 */
(function (Cell) {
    /**
     * The default implementation of an `IContentFactory`.
     *
     * This includes a CodeMirror editor factory to make it easy to use out of the box.
     */
    class ContentFactory {
        /**
         * Create a content factory for a cell.
         */
        constructor(options = {}) {
            this._editorFactory =
                options.editorFactory || _inputarea__WEBPACK_IMPORTED_MODULE_12__.InputArea.defaultEditorFactory;
        }
        /**
         * The readonly editor factory that create code editors
         */
        get editorFactory() {
            return this._editorFactory;
        }
        /**
         * Create a new cell header for the parent widget.
         */
        createCellHeader() {
            return new _headerfooter__WEBPACK_IMPORTED_MODULE_14__.CellHeader();
        }
        /**
         * Create a new cell header for the parent widget.
         */
        createCellFooter() {
            return new _headerfooter__WEBPACK_IMPORTED_MODULE_14__.CellFooter();
        }
        /**
         * Create an input prompt.
         */
        createInputPrompt() {
            return new _inputarea__WEBPACK_IMPORTED_MODULE_12__.InputPrompt();
        }
        /**
         * Create the output prompt for the widget.
         */
        createOutputPrompt() {
            return new _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_3__.OutputPrompt();
        }
        /**
         * Create an stdin widget.
         */
        createStdin(options) {
            return new _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_3__.Stdin(options);
        }
    }
    Cell.ContentFactory = ContentFactory;
    /**
     * The default content factory for cells.
     */
    Cell.defaultContentFactory = new ContentFactory();
})(Cell || (Cell = {}));
/** ****************************************************************************
 * CodeCell
 ******************************************************************************/
/**
 * A widget for a code cell.
 */
class CodeCell extends Cell {
    /**
     * Construct a code cell widget.
     */
    constructor(options) {
        super(options);
        this._outputHidden = false;
        this._syncScrolled = false;
        this._savingMetadata = false;
        this.addClass(CODE_CELL_CLASS);
        // Only save options not handled by parent constructor.
        const rendermime = (this._rendermime = options.rendermime);
        const contentFactory = this.contentFactory;
        const model = this.model;
        if (!options.placeholder) {
            // Insert the output before the cell footer.
            const outputWrapper = (this._outputWrapper = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_10__.Panel());
            outputWrapper.addClass(CELL_OUTPUT_WRAPPER_CLASS);
            const outputCollapser = new _collapser__WEBPACK_IMPORTED_MODULE_11__.OutputCollapser();
            outputCollapser.addClass(CELL_OUTPUT_COLLAPSER_CLASS);
            const output = (this._output = new _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_3__.OutputArea({
                model: model.outputs,
                rendermime,
                contentFactory: contentFactory,
                maxNumberOutputs: options.maxNumberOutputs
            }));
            output.addClass(CELL_OUTPUT_AREA_CLASS);
            // Set a CSS if there are no outputs, and connect a signal for future
            // changes to the number of outputs. This is for conditional styling
            // if there are no outputs.
            if (model.outputs.length === 0) {
                this.addClass(NO_OUTPUTS_CLASS);
            }
            output.outputLengthChanged.connect(this._outputLengthHandler, this);
            outputWrapper.addWidget(outputCollapser);
            outputWrapper.addWidget(output);
            this.layout.insertWidget(2, new _resizeHandle__WEBPACK_IMPORTED_MODULE_15__.ResizeHandle(this.node));
            this.layout.insertWidget(3, outputWrapper);
            if (model.isDirty) {
                this.addClass(DIRTY_CLASS);
            }
            this._outputPlaceholder = new _placeholder__WEBPACK_IMPORTED_MODULE_13__.OutputPlaceholder(() => {
                this.outputHidden = !this.outputHidden;
            });
        }
        model.stateChanged.connect(this.onStateChanged, this);
    }
    /**
     * Initialize view state from model.
     *
     * #### Notes
     * Should be called after construction. For convenience, returns this, so it
     * can be chained in the construction, like `new Foo().initializeState();`
     */
    initializeState() {
        super.initializeState();
        this.loadScrolledState();
        this.setPrompt(`${this.model.executionCount || ''}`);
        return this;
    }
    /**
     * Get the output area for the cell.
     */
    get outputArea() {
        return this._output;
    }
    /**
     * The view state of output being collapsed.
     */
    get outputHidden() {
        return this._outputHidden;
    }
    set outputHidden(value) {
        if (this._outputHidden === value) {
            return;
        }
        const layout = this._outputWrapper.layout;
        if (value) {
            layout.removeWidget(this._output);
            layout.addWidget(this._outputPlaceholder);
            if (this.inputHidden && !this._outputWrapper.isHidden) {
                this._outputWrapper.hide();
            }
        }
        else {
            if (this._outputWrapper.isHidden) {
                this._outputWrapper.show();
            }
            layout.removeWidget(this._outputPlaceholder);
            layout.addWidget(this._output);
        }
        this._outputHidden = value;
        if (this.syncCollapse) {
            this.saveCollapseState();
        }
    }
    /**
     * Save view collapse state to model
     */
    saveCollapseState() {
        // Because collapse state for a code cell involves two different pieces of
        // metadata (the `collapsed` and `jupyter` metadata keys), we block reacting
        // to changes in metadata until we have fully committed our changes.
        // Otherwise setting one key can trigger a write to the other key to
        // maintain the synced consistency.
        this._savingMetadata = true;
        try {
            super.saveCollapseState();
            const metadata = this.model.metadata;
            const collapsed = this.model.metadata.get('collapsed');
            if ((this.outputHidden && collapsed === true) ||
                (!this.outputHidden && collapsed === undefined)) {
                return;
            }
            // Do not set jupyter.outputs_hidden since it is redundant. See
            // and https://github.com/jupyter/nbformat/issues/137
            if (this.outputHidden) {
                metadata.set('collapsed', true);
            }
            else {
                metadata.delete('collapsed');
            }
        }
        finally {
            this._savingMetadata = false;
        }
    }
    /**
     * Revert view collapse state from model.
     *
     * We consider the `collapsed` metadata key as the source of truth for outputs
     * being hidden.
     */
    loadCollapseState() {
        super.loadCollapseState();
        this.outputHidden = !!this.model.metadata.get('collapsed');
    }
    /**
     * Whether the output is in a scrolled state?
     */
    get outputsScrolled() {
        return this._outputsScrolled;
    }
    set outputsScrolled(value) {
        this.toggleClass('jp-mod-outputsScrolled', value);
        this._outputsScrolled = value;
        if (this.syncScrolled) {
            this.saveScrolledState();
        }
    }
    /**
     * Save view collapse state to model
     */
    saveScrolledState() {
        const { metadata } = this.model;
        const current = metadata.get('scrolled');
        if ((this.outputsScrolled && current === true) ||
            (!this.outputsScrolled && current === undefined)) {
            return;
        }
        if (this.outputsScrolled) {
            metadata.set('scrolled', true);
        }
        else {
            metadata.delete('scrolled');
        }
    }
    /**
     * Revert view collapse state from model.
     */
    loadScrolledState() {
        const metadata = this.model.metadata;
        // We don't have the notion of 'auto' scrolled, so we make it false.
        if (metadata.get('scrolled') === 'auto') {
            this.outputsScrolled = false;
        }
        else {
            this.outputsScrolled = !!metadata.get('scrolled');
        }
    }
    /**
     * Whether to sync the scrolled state to the cell model.
     */
    get syncScrolled() {
        return this._syncScrolled;
    }
    set syncScrolled(value) {
        if (this._syncScrolled === value) {
            return;
        }
        this._syncScrolled = value;
        if (value) {
            this.loadScrolledState();
        }
    }
    /**
     * Handle the input being hidden.
     *
     * #### Notes
     * This method is called by the case cell implementation and is
     * subclasses here so the code cell can watch to see when input
     * is hidden without accessing private state.
     */
    handleInputHidden(value) {
        if (!value && this._outputWrapper.isHidden) {
            this._outputWrapper.show();
        }
        else if (value && !this._outputWrapper.isHidden && this._outputHidden) {
            this._outputWrapper.hide();
        }
    }
    /**
     * Clone the cell, using the same model.
     */
    clone() {
        const constructor = this.constructor;
        return new constructor({
            model: this.model,
            contentFactory: this.contentFactory,
            rendermime: this._rendermime,
            placeholder: false
        });
    }
    /**
     * Clone the OutputArea alone, returning a simplified output area, using the same model.
     */
    cloneOutputArea() {
        return new _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_3__.SimplifiedOutputArea({
            model: this.model.outputs,
            contentFactory: this.contentFactory,
            rendermime: this._rendermime
        });
    }
    /**
     * Dispose of the resources used by the widget.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._output.outputLengthChanged.disconnect(this._outputLengthHandler, this);
        this._rendermime = null;
        this._output = null;
        this._outputWrapper = null;
        this._outputPlaceholder = null;
        super.dispose();
    }
    /**
     * Handle changes in the model.
     */
    onStateChanged(model, args) {
        switch (args.name) {
            case 'executionCount':
                this.setPrompt(`${model.executionCount || ''}`);
                break;
            case 'isDirty':
                if (model.isDirty) {
                    this.addClass(DIRTY_CLASS);
                }
                else {
                    this.removeClass(DIRTY_CLASS);
                }
                break;
            default:
                break;
        }
    }
    /**
     * Handle changes in the metadata.
     */
    onMetadataChanged(model, args) {
        if (this._savingMetadata) {
            // We are in middle of a metadata transaction, so don't react to it.
            return;
        }
        switch (args.key) {
            case 'scrolled':
                if (this.syncScrolled) {
                    this.loadScrolledState();
                }
                break;
            case 'collapsed':
                if (this.syncCollapse) {
                    this.loadCollapseState();
                }
                break;
            default:
                break;
        }
        super.onMetadataChanged(model, args);
    }
    /**
     * Handle changes in the number of outputs in the output area.
     */
    _outputLengthHandler(sender, args) {
        const force = args === 0 ? true : false;
        this.toggleClass(NO_OUTPUTS_CLASS, force);
    }
}
/**
 * The namespace for the `CodeCell` class statics.
 */
(function (CodeCell) {
    /**
     * Execute a cell given a client session.
     */
    async function execute(cell, sessionContext, metadata) {
        var _a;
        const model = cell.model;
        const code = model.value.text;
        if (!code.trim() || !((_a = sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel)) {
            model.clearExecution();
            return;
        }
        const cellId = { cellId: model.id };
        metadata = Object.assign(Object.assign(Object.assign({}, model.metadata.toJSON()), metadata), cellId);
        const { recordTiming } = metadata;
        model.clearExecution();
        cell.outputHidden = false;
        cell.setPrompt('*');
        model.trusted = true;
        let future;
        try {
            const msgPromise = _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_3__.OutputArea.execute(code, cell.outputArea, sessionContext, metadata);
            // cell.outputArea.future assigned synchronously in `execute`
            if (recordTiming) {
                const recordTimingHook = (msg) => {
                    let label;
                    switch (msg.header.msg_type) {
                        case 'status':
                            label = `status.${msg.content.execution_state}`;
                            break;
                        case 'execute_input':
                            label = 'execute_input';
                            break;
                        default:
                            return true;
                    }
                    // If the data is missing, estimate it to now
                    // Date was added in 5.1: https://jupyter-client.readthedocs.io/en/stable/messaging.html#message-header
                    const value = msg.header.date || new Date().toISOString();
                    const timingInfo = Object.assign({}, model.metadata.get('execution'));
                    timingInfo[`iopub.${label}`] = value;
                    model.metadata.set('execution', timingInfo);
                    return true;
                };
                cell.outputArea.future.registerMessageHook(recordTimingHook);
            }
            else {
                model.metadata.delete('execution');
            }
            // Save this execution's future so we can compare in the catch below.
            future = cell.outputArea.future;
            const msg = (await msgPromise);
            model.executionCount = msg.content.execution_count;
            if (recordTiming) {
                const timingInfo = Object.assign({}, model.metadata.get('execution'));
                const started = msg.metadata.started;
                // Started is not in the API, but metadata IPyKernel sends
                if (started) {
                    timingInfo['shell.execute_reply.started'] = started;
                }
                // Per above, the 5.0 spec does not assume date, so we estimate is required
                const finished = msg.header.date;
                timingInfo['shell.execute_reply'] =
                    finished || new Date().toISOString();
                model.metadata.set('execution', timingInfo);
            }
            return msg;
        }
        catch (e) {
            // If we started executing, and the cell is still indicating this
            // execution, clear the prompt.
            if (future && !cell.isDisposed && cell.outputArea.future === future) {
                cell.setPrompt('');
            }
            throw e;
        }
    }
    CodeCell.execute = execute;
})(CodeCell || (CodeCell = {}));
/**
 * `AttachmentsCell` - A base class for a cell widget that allows
 *  attachments to be drag/drop'd or pasted onto it
 */
class AttachmentsCell extends Cell {
    /**
     * Handle the DOM events for the widget.
     *
     * @param event - The DOM event sent to the widget.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the notebook panel's node. It should
     * not be called directly by user code.
     */
    handleEvent(event) {
        switch (event.type) {
            case 'paste':
                this._evtPaste(event);
                break;
            case 'dragenter':
                event.preventDefault();
                break;
            case 'dragover':
                event.preventDefault();
                break;
            case 'drop':
                this._evtNativeDrop(event);
                break;
            case 'lm-dragover':
                this._evtDragOver(event);
                break;
            case 'lm-drop':
                this._evtDrop(event);
                break;
            default:
                break;
        }
    }
    /**
     * Handle `after-attach` messages for the widget.
     */
    onAfterAttach(msg) {
        super.onAfterAttach(msg);
        const node = this.node;
        node.addEventListener('lm-dragover', this);
        node.addEventListener('lm-drop', this);
        node.addEventListener('dragenter', this);
        node.addEventListener('dragover', this);
        node.addEventListener('drop', this);
        node.addEventListener('paste', this);
    }
    /**
     * A message handler invoked on a `'before-detach'`
     * message
     */
    onBeforeDetach(msg) {
        const node = this.node;
        node.removeEventListener('drop', this);
        node.removeEventListener('dragover', this);
        node.removeEventListener('dragenter', this);
        node.removeEventListener('paste', this);
        node.removeEventListener('lm-dragover', this);
        node.removeEventListener('lm-drop', this);
    }
    _evtDragOver(event) {
        const supportedMimeType = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_7__.some)(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__.imageRendererFactory.mimeTypes, mimeType => {
            if (!event.mimeData.hasData(CONTENTS_MIME_RICH)) {
                return false;
            }
            const data = event.mimeData.getData(CONTENTS_MIME_RICH);
            return data.model.mimetype === mimeType;
        });
        if (!supportedMimeType) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        event.dropAction = event.proposedAction;
    }
    /**
     * Handle the `paste` event for the widget
     */
    _evtPaste(event) {
        if (event.clipboardData) {
            const items = event.clipboardData.items;
            for (let i = 0; i < items.length; i++) {
                if (items[i].type === 'text/plain') {
                    // Skip if this text is the path to a file
                    if (i < items.length - 1 && items[i + 1].kind === 'file') {
                        continue;
                    }
                    items[i].getAsString(text => {
                        var _a, _b;
                        (_b = (_a = this.editor).replaceSelection) === null || _b === void 0 ? void 0 : _b.call(_a, text);
                    });
                }
                this._attachFiles(event.clipboardData.items);
            }
        }
        event.preventDefault();
    }
    /**
     * Handle the `drop` event for the widget
     */
    _evtNativeDrop(event) {
        if (event.dataTransfer) {
            this._attachFiles(event.dataTransfer.items);
        }
        event.preventDefault();
    }
    /**
     * Handle the `'lm-drop'` event for the widget.
     */
    _evtDrop(event) {
        const supportedMimeTypes = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_7__.toArray)((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_7__.filter)(event.mimeData.types(), mimeType => {
            if (mimeType === CONTENTS_MIME_RICH) {
                const data = event.mimeData.getData(CONTENTS_MIME_RICH);
                return (_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__.imageRendererFactory.mimeTypes.indexOf(data.model.mimetype) !== -1);
            }
            return _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__.imageRendererFactory.mimeTypes.indexOf(mimeType) !== -1;
        }));
        if (supportedMimeTypes.length === 0) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (event.proposedAction === 'none') {
            event.dropAction = 'none';
            return;
        }
        event.dropAction = 'copy';
        for (const mimeType of supportedMimeTypes) {
            if (mimeType === CONTENTS_MIME_RICH) {
                const { model, withContent } = event.mimeData.getData(CONTENTS_MIME_RICH);
                if (model.type === 'file') {
                    const URI = this._generateURI(model.name);
                    this.updateCellSourceWithAttachment(model.name, URI);
                    void withContent().then(fullModel => {
                        this.model.attachments.set(URI, {
                            [fullModel.mimetype]: fullModel.content
                        });
                    });
                }
            }
            else {
                // Pure mimetype, no useful name to infer
                const URI = this._generateURI();
                this.model.attachments.set(URI, {
                    [mimeType]: event.mimeData.getData(mimeType)
                });
                this.updateCellSourceWithAttachment(URI, URI);
            }
        }
    }
    /**
     * Attaches all DataTransferItems (obtained from
     * clipboard or native drop events) to the cell
     */
    _attachFiles(items) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.kind === 'file') {
                const blob = item.getAsFile();
                if (blob) {
                    this._attachFile(blob);
                }
            }
        }
    }
    /**
     * Takes in a file object and adds it to
     * the cell attachments
     */
    _attachFile(blob) {
        const reader = new FileReader();
        reader.onload = evt => {
            const { href, protocol } = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.parse(reader.result);
            if (protocol !== 'data:') {
                return;
            }
            const dataURIRegex = /([\w+\/\+]+)?(?:;(charset=[\w\d-]*|base64))?,(.*)/;
            const matches = dataURIRegex.exec(href);
            if (!matches || matches.length !== 4) {
                return;
            }
            const mimeType = matches[1];
            const encodedData = matches[3];
            const bundle = { [mimeType]: encodedData };
            const URI = this._generateURI(blob.name);
            if (mimeType.startsWith('image/')) {
                this.model.attachments.set(URI, bundle);
                this.updateCellSourceWithAttachment(blob.name, URI);
            }
        };
        reader.onerror = evt => {
            console.error(`Failed to attach ${blob.name}` + evt);
        };
        reader.readAsDataURL(blob);
    }
    /**
     * Generates a unique URI for a file
     * while preserving the file extension.
     */
    _generateURI(name = '') {
        const lastIndex = name.lastIndexOf('.');
        return lastIndex !== -1
            ? _lumino_coreutils__WEBPACK_IMPORTED_MODULE_6__.UUID.uuid4().concat(name.substring(lastIndex))
            : _lumino_coreutils__WEBPACK_IMPORTED_MODULE_6__.UUID.uuid4();
    }
}
/** ****************************************************************************
 * MarkdownCell
 ******************************************************************************/
/**
 * A widget for a Markdown cell.
 *
 * #### Notes
 * Things get complicated if we want the rendered text to update
 * any time the text changes, the text editor model changes,
 * or the input area model changes.  We don't support automatically
 * updating the rendered text in all of these cases.
 */
class MarkdownCell extends AttachmentsCell {
    /**
     * Construct a Markdown cell widget.
     */
    constructor(options) {
        var _a, _b, _c;
        super(options);
        this._toggleCollapsedSignal = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_9__.Signal(this);
        this._renderer = null;
        this._rendered = true;
        this._prevText = '';
        this._ready = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_6__.PromiseDelegate();
        this._showEditorForReadOnlyMarkdown = true;
        this.addClass(MARKDOWN_CELL_CLASS);
        // Ensure we can resolve attachments:
        this._rendermime = options.rendermime.clone({
            resolver: new _jupyterlab_attachments__WEBPACK_IMPORTED_MODULE_1__.AttachmentsResolver({
                parent: (_a = options.rendermime.resolver) !== null && _a !== void 0 ? _a : undefined,
                model: this.model.attachments
            })
        });
        // Stop codemirror handling paste
        this.editor.setOption('handlePaste', false);
        // Check if heading cell is set to be collapsed
        this._headingCollapsed = ((_b = this.model.metadata.get(MARKDOWN_HEADING_COLLAPSED)) !== null && _b !== void 0 ? _b : false);
        // Throttle the rendering rate of the widget.
        this._monitor = new _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.ActivityMonitor({
            signal: this.model.contentChanged,
            timeout: RENDER_TIMEOUT
        });
        this._monitor.activityStopped.connect(() => {
            if (this._rendered) {
                this.update();
            }
        }, this);
        void this._updateRenderedInput().then(() => {
            this._ready.resolve(void 0);
        });
        this.renderCollapseButtons(this._renderer);
        this.renderInput(this._renderer);
        this._showEditorForReadOnlyMarkdown = (_c = options.showEditorForReadOnlyMarkdown) !== null && _c !== void 0 ? _c : MarkdownCell.defaultShowEditorForReadOnlyMarkdown;
    }
    /**
     * A promise that resolves when the widget renders for the first time.
     */
    get ready() {
        return this._ready.promise;
    }
    /**
     * Text that represents the heading if cell is a heading.
     * Returns empty string if not a heading.
     */
    get headingInfo() {
        let text = this.model.value.text;
        const lines = marked__WEBPACK_IMPORTED_MODULE_0__.marked.lexer(text);
        let line;
        for (line of lines) {
            if (line.type === 'heading') {
                return { text: line.text, level: line.depth };
            }
            else if (line.type === 'html') {
                let match = line.raw.match(/<h([1-6])(.*?)>(.*?)<\/h\1>/);
                if (match === null || match === void 0 ? void 0 : match[3]) {
                    return { text: match[3], level: parseInt(match[1]) };
                }
                return { text: '', level: -1 };
            }
        }
        return { text: '', level: -1 };
    }
    get headingCollapsed() {
        return this._headingCollapsed;
    }
    set headingCollapsed(value) {
        this._headingCollapsed = value;
        if (value) {
            this.model.metadata.set(MARKDOWN_HEADING_COLLAPSED, value);
        }
        else if (this.model.metadata.has(MARKDOWN_HEADING_COLLAPSED)) {
            this.model.metadata.delete(MARKDOWN_HEADING_COLLAPSED);
        }
        const collapseButton = this.inputArea.promptNode.getElementsByClassName(HEADING_COLLAPSER_CLASS)[0];
        if (collapseButton) {
            if (value) {
                collapseButton.classList.add('jp-mod-collapsed');
            }
            else {
                collapseButton.classList.remove('jp-mod-collapsed');
            }
        }
        this.renderCollapseButtons(this._renderer);
    }
    get numberChildNodes() {
        return this._numberChildNodes;
    }
    set numberChildNodes(value) {
        this._numberChildNodes = value;
        this.renderCollapseButtons(this._renderer);
    }
    get toggleCollapsedSignal() {
        return this._toggleCollapsedSignal;
    }
    /**
     * Whether the cell is rendered.
     */
    get rendered() {
        return this._rendered;
    }
    set rendered(value) {
        // Show cell as rendered when cell is not editable
        if (this.readOnly && this._showEditorForReadOnlyMarkdown === false) {
            value = true;
        }
        if (value === this._rendered) {
            return;
        }
        this._rendered = value;
        this._handleRendered();
        // Refreshing an editor can be really expensive, so we don't call it from
        // _handleRendered, since _handledRendered is also called on every update
        // request.
        if (!this._rendered) {
            this.editor.refresh();
        }
        // If the rendered state changed, raise an event.
        this._displayChanged.emit();
    }
    /*
     * Whether the Markdown editor is visible in read-only mode.
     */
    get showEditorForReadOnly() {
        return this._showEditorForReadOnlyMarkdown;
    }
    set showEditorForReadOnly(value) {
        this._showEditorForReadOnlyMarkdown = value;
        if (value === false) {
            this.rendered = true;
        }
    }
    maybeCreateCollapseButton() {
        if (this.headingInfo.level > 0 &&
            this.inputArea.promptNode.getElementsByClassName(HEADING_COLLAPSER_CLASS)
                .length == 0) {
            let collapseButton = this.inputArea.promptNode.appendChild(document.createElement('button'));
            collapseButton.className = `jp-Button ${HEADING_COLLAPSER_CLASS}`;
            collapseButton.setAttribute('data-heading-level', this.headingInfo.level.toString());
            if (this._headingCollapsed) {
                collapseButton.classList.add('jp-mod-collapsed');
            }
            else {
                collapseButton.classList.remove('jp-mod-collapsed');
            }
            collapseButton.onclick = (event) => {
                this.headingCollapsed = !this.headingCollapsed;
                this._toggleCollapsedSignal.emit(this._headingCollapsed);
            };
        }
    }
    maybeCreateOrUpdateExpandButton() {
        var _a, _b;
        const expandButton = this.node.getElementsByClassName(SHOW_HIDDEN_CELLS_CLASS);
        // Create the "show hidden" button if not already created
        if (this.headingCollapsed &&
            expandButton.length === 0 &&
            this._numberChildNodes > 0) {
            const numberChildNodes = document.createElement('button');
            numberChildNodes.className = `bp3-button bp3-minimal jp-Button ${SHOW_HIDDEN_CELLS_CLASS}`;
            _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__.addIcon.render(numberChildNodes);
            const numberChildNodesText = document.createElement('div');
            numberChildNodesText.nodeValue = `${this._numberChildNodes} cell${this._numberChildNodes > 1 ? 's' : ''} hidden`;
            numberChildNodes.appendChild(numberChildNodesText);
            numberChildNodes.onclick = () => {
                this.headingCollapsed = false;
                this._toggleCollapsedSignal.emit(this._headingCollapsed);
            };
            this.node.appendChild(numberChildNodes);
        }
        else if (((_b = (_a = expandButton === null || expandButton === void 0 ? void 0 : expandButton[0]) === null || _a === void 0 ? void 0 : _a.childNodes) === null || _b === void 0 ? void 0 : _b.length) > 1) {
            // If the heading is collapsed, update text
            if (this._headingCollapsed) {
                expandButton[0].childNodes[1].textContent = `${this._numberChildNodes} cell${this._numberChildNodes > 1 ? 's' : ''} hidden`;
                // If the heading isn't collapsed, remove the button
            }
            else {
                for (const el of expandButton) {
                    this.node.removeChild(el);
                }
            }
        }
    }
    /**
     * Render the collapse button for heading cells,
     * and for collapsed heading cells render the "expand hidden cells"
     * button.
     */
    renderCollapseButtons(widget) {
        this.node.classList.toggle(MARKDOWN_HEADING_COLLAPSED, this._headingCollapsed);
        this.maybeCreateCollapseButton();
        this.maybeCreateOrUpdateExpandButton();
    }
    /**
     * Render an input instead of the text editor.
     */
    renderInput(widget) {
        this.addClass(RENDERED_CLASS);
        this.renderCollapseButtons(widget);
        this.inputArea.renderInput(widget);
    }
    /**
     * Show the text editor instead of rendered input.
     */
    showEditor() {
        this.removeClass(RENDERED_CLASS);
        this.inputArea.showEditor();
    }
    /*
     * Handle `update-request` messages.
     */
    onUpdateRequest(msg) {
        // Make sure we are properly rendered.
        this._handleRendered();
        super.onUpdateRequest(msg);
    }
    /**
     * Modify the cell source to include a reference to the attachment.
     */
    updateCellSourceWithAttachment(attachmentName, URI) {
        var _a, _b;
        const textToBeAppended = `![${attachmentName}](attachment:${URI !== null && URI !== void 0 ? URI : attachmentName})`;
        (_b = (_a = this.editor).replaceSelection) === null || _b === void 0 ? void 0 : _b.call(_a, textToBeAppended);
    }
    /**
     * Handle the rendered state.
     */
    _handleRendered() {
        if (!this._rendered) {
            this.showEditor();
        }
        else {
            // TODO: It would be nice for the cell to provide a way for
            // its consumers to hook into when the rendering is done.
            void this._updateRenderedInput();
            this.renderInput(this._renderer);
        }
    }
    /**
     * Update the rendered input.
     */
    _updateRenderedInput() {
        const model = this.model;
        const text = (model && model.value.text) || DEFAULT_MARKDOWN_TEXT;
        // Do not re-render if the text has not changed.
        if (text !== this._prevText) {
            const mimeModel = new _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__.MimeModel({ data: { 'text/markdown': text } });
            if (!this._renderer) {
                this._renderer = this._rendermime.createRenderer('text/markdown');
                this._renderer.addClass(MARKDOWN_OUTPUT_CLASS);
            }
            this._prevText = text;
            return this._renderer.renderModel(mimeModel);
        }
        return Promise.resolve(void 0);
    }
    /**
     * Clone the cell, using the same model.
     */
    clone() {
        const constructor = this.constructor;
        return new constructor({
            model: this.model,
            contentFactory: this.contentFactory,
            rendermime: this._rendermime,
            placeholder: false
        });
    }
}
/**
 * The namespace for the `CodeCell` class statics.
 */
(function (MarkdownCell) {
    /**
     * Default value for showEditorForReadOnlyMarkdown.
     */
    MarkdownCell.defaultShowEditorForReadOnlyMarkdown = true;
})(MarkdownCell || (MarkdownCell = {}));
/** ****************************************************************************
 * RawCell
 ******************************************************************************/
/**
 * A widget for a raw cell.
 */
class RawCell extends Cell {
    /**
     * Construct a raw cell widget.
     */
    constructor(options) {
        super(options);
        this.addClass(RAW_CELL_CLASS);
    }
    /**
     * Clone the cell, using the same model.
     */
    clone() {
        const constructor = this.constructor;
        return new constructor({
            model: this.model,
            contentFactory: this.contentFactory,
            placeholder: false
        });
    }
}
//# sourceMappingURL=widget.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY2VsbHMvbGliL2NlbGxkcmFndXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2NlbGxzL2xpYi9jb2xsYXBzZXIuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2NlbGxzL2xpYi9oZWFkZXJmb290ZXIuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2NlbGxzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY2VsbHMvbGliL2lucHV0YXJlYS5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY2VsbHMvbGliL21vZGVsLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9jZWxscy9saWIvcGxhY2Vob2xkZXIuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2NlbGxzL2xpYi9yZXNpemVIYW5kbGUuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2NlbGxzL2xpYi93aWRnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDeUM7QUFDVTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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dEU7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxRUFBZ0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9EQUFvRDtBQUNyRDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULGtEQUFrRCwyQkFBMkI7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxXQUFXO0FBQ3RFO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsbUVBQWU7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHNDQUFzQztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRCxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMEJBQTBCO0FBQzNCLGlDOzs7Ozs7Ozs7Ozs7Ozs7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBLHlDQUF5Qyx1RUFBOEI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzREFBVTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNEQUFVO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsb0RBQVc7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixnRUFBWTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHlEQUFLO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxvQkFBb0I7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsbURBQUs7QUFDbEU7QUFDQSx3Q0FBd0Msd0RBQWU7QUFDdkQ7QUFDQSwrQ0FBK0MsOERBQVU7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsd0RBQVk7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsNERBQWlCO0FBQzNEO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RUFBNkU7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsZ0NBQWdDO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsV0FBVztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix3RUFBb0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyw2REFBUyxFQUFFLFFBQVEsd0JBQXdCLEVBQUU7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9DQUFvQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxrQyIsImZpbGUiOiJwYWNrYWdlc19jZWxsc19saWJfaW5kZXhfanMuYjkwZGM4YzVlNTgzMmJmN2E3YjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qKlxuICogVGhpcyBtb2R1bGUgY29udGFpbnMgc29tZSB1dGlsaXR5IGZ1bmN0aW9ucyB0byBvcGVyYXRlIG9uIGNlbGxzLiBUaGlzXG4gKiBjb3VsZCBiZSBzaGFyZWQgYnkgd2lkZ2V0cyB0aGF0IGNvbnRhaW4gY2VsbHMsIGxpa2UgdGhlIENvZGVDb25zb2xlIG9yXG4gKiBOb3RlYm9vayB3aWRnZXRzLlxuICovXG5pbXBvcnQgeyBlYWNoIH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IHsgaCwgVmlydHVhbERPTSB9IGZyb20gJ0BsdW1pbm8vdmlydHVhbGRvbSc7XG4vKipcbiAqIENvbnN0YW50cyBmb3IgZHJhZ1xuICovXG4vKipcbiAqIFRoZSB0aHJlc2hvbGQgaW4gcGl4ZWxzIHRvIHN0YXJ0IGEgZHJhZyBldmVudC5cbiAqL1xuY29uc3QgRFJBR19USFJFU0hPTEQgPSA1O1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBkcmFnIGltYWdlcy5cbiAqL1xuY29uc3QgRFJBR19JTUFHRV9DTEFTUyA9ICdqcC1kcmFnSW1hZ2UnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBzaW5ndWxhciBkcmFnIGltYWdlc1xuICovXG5jb25zdCBTSU5HTEVfRFJBR19JTUFHRV9DTEFTUyA9ICdqcC1kcmFnSW1hZ2Utc2luZ2xlUHJvbXB0Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIGRyYWcgaW1hZ2UgY2VsbCBjb250ZW50LlxuICovXG5jb25zdCBDRUxMX0RSQUdfQ09OVEVOVF9DTEFTUyA9ICdqcC1kcmFnSW1hZ2UtY29udGVudCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRoZSBkcmFnIGltYWdlIGNlbGwgY29udGVudC5cbiAqL1xuY29uc3QgQ0VMTF9EUkFHX1BST01QVF9DTEFTUyA9ICdqcC1kcmFnSW1hZ2UtcHJvbXB0Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIGRyYWcgaW1hZ2UgY2VsbCBjb250ZW50LlxuICovXG5jb25zdCBDRUxMX0RSQUdfTVVMVElQTEVfQkFDSyA9ICdqcC1kcmFnSW1hZ2UtbXVsdGlwbGVCYWNrJztcbmV4cG9ydCB2YXIgQ2VsbERyYWdVdGlscztcbihmdW5jdGlvbiAoQ2VsbERyYWdVdGlscykge1xuICAgIC8qKlxuICAgICAqIEZpbmQgdGhlIGNlbGwgaW5kZXggY29udGFpbmluZyB0aGUgdGFyZ2V0IGh0bWwgZWxlbWVudC5cbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHRyYWNlcyB1cCB0aGUgRE9NIGhpZXJhcmNoeSB0byBmaW5kIHRoZSByb290IGNlbGxcbiAgICAgKiBub2RlLiBUaGVuIGZpbmQgdGhlIGNvcnJlc3BvbmRpbmcgY2hpbGQgYW5kIHNlbGVjdCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIC0gdGhlIGNlbGwgbm9kZSBvciBhIGNoaWxkIG9mIHRoZSBjZWxsIG5vZGUuXG4gICAgICogQHBhcmFtIGNlbGxzIC0gYW4gaXRlcmFibGUgb2YgQ2VsbHNcbiAgICAgKiBAcGFyYW0gaXNDZWxsTm9kZSAtIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBpbiBhIG5vZGUgYW5kIGNoZWNrcyBpZlxuICAgICAqIGl0IGlzIGEgY2VsbCBub2RlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgaW5kZXggb2YgdGhlIGNlbGwgd2UncmUgbG9va2luZyBmb3IuIFJldHVybnMgLTEgaWZcbiAgICAgKiB0aGUgY2VsbCBpcyBub3QgZm91bmRzXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZENlbGwobm9kZSwgY2VsbHMsIGlzQ2VsbE5vZGUpIHtcbiAgICAgICAgbGV0IGNlbGxJbmRleCA9IC0xO1xuICAgICAgICB3aGlsZSAobm9kZSAmJiBub2RlLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChpc0NlbGxOb2RlKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgZWFjaChjZWxscywgKGNlbGwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsLm5vZGUgPT09IG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjZWxsSW5kZXg7XG4gICAgfVxuICAgIENlbGxEcmFnVXRpbHMuZmluZENlbGwgPSBmaW5kQ2VsbDtcbiAgICAvKipcbiAgICAgKiBEZXRlY3Qgd2hpY2ggcGFydCBvZiB0aGUgY2VsbCB0cmlnZ2VyZWQgdGhlIE1vdXNlRXZlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjZWxsIC0gVGhlIGNlbGwgd2hpY2ggY29udGFpbnMgdGhlIE1vdXNlRXZlbnQncyB0YXJnZXRcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IC0gVGhlIERPTSBub2RlIHdoaWNoIHRyaWdnZXJlZCB0aGUgTW91c2VFdmVudFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRldGVjdFRhcmdldEFyZWEoY2VsbCwgdGFyZ2V0KSB7XG4gICAgICAgIGxldCB0YXJnZXRBcmVhO1xuICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgaWYgKGNlbGwuZWRpdG9yV2lkZ2V0Lm5vZGUuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldEFyZWEgPSAnaW5wdXQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2VsbC5wcm9tcHROb2RlLmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRBcmVhID0gJ3Byb21wdCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRBcmVhID0gJ2NlbGwnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0QXJlYSA9ICd1bmtub3duJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0QXJlYTtcbiAgICB9XG4gICAgQ2VsbERyYWdVdGlscy5kZXRlY3RUYXJnZXRBcmVhID0gZGV0ZWN0VGFyZ2V0QXJlYTtcbiAgICAvKipcbiAgICAgKiBEZXRlY3QgaWYgYSBkcmFnIGV2ZW50IHNob3VsZCBiZSBzdGFydGVkLiBUaGlzIGlzIGRvd24gaWYgdGhlXG4gICAgICogbW91c2UgaXMgbW92ZWQgYmV5b25kIGEgY2VydGFpbiBkaXN0YW5jZSAoRFJBR19USFJFU0hPTEQpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHByZXZYIC0gWCBDb29yZGluYXRlIG9mIHRoZSBtb3VzZSBwb2ludGVyIGR1cmluZyB0aGUgbW91c2Vkb3duIGV2ZW50XG4gICAgICogQHBhcmFtIHByZXZZIC0gWSBDb29yZGluYXRlIG9mIHRoZSBtb3VzZSBwb2ludGVyIGR1cmluZyB0aGUgbW91c2Vkb3duIGV2ZW50XG4gICAgICogQHBhcmFtIG5leHRYIC0gQ3VycmVudCBYIENvb3JkaW5hdGUgb2YgdGhlIG1vdXNlIHBvaW50ZXJcbiAgICAgKiBAcGFyYW0gbmV4dFkgLSBDdXJyZW50IFkgQ29vcmRpbmF0ZSBvZiB0aGUgbW91c2UgcG9pbnRlclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNob3VsZFN0YXJ0RHJhZyhwcmV2WCwgcHJldlksIG5leHRYLCBuZXh0WSkge1xuICAgICAgICBjb25zdCBkeCA9IE1hdGguYWJzKG5leHRYIC0gcHJldlgpO1xuICAgICAgICBjb25zdCBkeSA9IE1hdGguYWJzKG5leHRZIC0gcHJldlkpO1xuICAgICAgICByZXR1cm4gZHggPj0gRFJBR19USFJFU0hPTEQgfHwgZHkgPj0gRFJBR19USFJFU0hPTEQ7XG4gICAgfVxuICAgIENlbGxEcmFnVXRpbHMuc2hvdWxkU3RhcnREcmFnID0gc2hvdWxkU3RhcnREcmFnO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBpbWFnZSBmb3IgdGhlIGNlbGwocykgdG8gYmUgZHJhZ2dlZFxuICAgICAqXG4gICAgICogQHBhcmFtIGFjdGl2ZUNlbGwgLSBUaGUgY2VsbCBmcm9tIHdoZXJlIHRoZSBkcmFnIGV2ZW50IGlzIHRyaWdnZXJlZFxuICAgICAqIEBwYXJhbSBzZWxlY3RlZENlbGxzIC0gVGhlIGNlbGxzIHRvIGJlIGRyYWdnZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVDZWxsRHJhZ0ltYWdlKGFjdGl2ZUNlbGwsIHNlbGVjdGVkQ2VsbHMpIHtcbiAgICAgICAgY29uc3QgY291bnQgPSBzZWxlY3RlZENlbGxzLmxlbmd0aDtcbiAgICAgICAgbGV0IHByb21wdE51bWJlcjtcbiAgICAgICAgaWYgKGFjdGl2ZUNlbGwubW9kZWwudHlwZSA9PT0gJ2NvZGUnKSB7XG4gICAgICAgICAgICBjb25zdCBleGVjdXRpb25Db3VudCA9IGFjdGl2ZUNlbGwubW9kZWxcbiAgICAgICAgICAgICAgICAuZXhlY3V0aW9uQ291bnQ7XG4gICAgICAgICAgICBwcm9tcHROdW1iZXIgPSAnICc7XG4gICAgICAgICAgICBpZiAoZXhlY3V0aW9uQ291bnQpIHtcbiAgICAgICAgICAgICAgICBwcm9tcHROdW1iZXIgPSBleGVjdXRpb25Db3VudC50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcHJvbXB0TnVtYmVyID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2VsbENvbnRlbnQgPSBhY3RpdmVDZWxsLm1vZGVsLnZhbHVlLnRleHQuc3BsaXQoJ1xcbicpWzBdLnNsaWNlKDAsIDI2KTtcbiAgICAgICAgaWYgKGNvdW50ID4gMSkge1xuICAgICAgICAgICAgaWYgKHByb21wdE51bWJlciAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gVmlydHVhbERPTS5yZWFsaXplKGguZGl2KGguZGl2KHsgY2xhc3NOYW1lOiBEUkFHX0lNQUdFX0NMQVNTIH0sIGguc3Bhbih7IGNsYXNzTmFtZTogQ0VMTF9EUkFHX1BST01QVF9DTEFTUyB9LCAnWycgKyBwcm9tcHROdW1iZXIgKyAnXTonKSwgaC5zcGFuKHsgY2xhc3NOYW1lOiBDRUxMX0RSQUdfQ09OVEVOVF9DTEFTUyB9LCBjZWxsQ29udGVudCkpLCBoLmRpdih7IGNsYXNzTmFtZTogQ0VMTF9EUkFHX01VTFRJUExFX0JBQ0sgfSwgJycpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gVmlydHVhbERPTS5yZWFsaXplKGguZGl2KGguZGl2KHsgY2xhc3NOYW1lOiBEUkFHX0lNQUdFX0NMQVNTIH0sIGguc3Bhbih7IGNsYXNzTmFtZTogQ0VMTF9EUkFHX1BST01QVF9DTEFTUyB9KSwgaC5zcGFuKHsgY2xhc3NOYW1lOiBDRUxMX0RSQUdfQ09OVEVOVF9DTEFTUyB9LCBjZWxsQ29udGVudCkpLCBoLmRpdih7IGNsYXNzTmFtZTogQ0VMTF9EUkFHX01VTFRJUExFX0JBQ0sgfSwgJycpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAocHJvbXB0TnVtYmVyICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBWaXJ0dWFsRE9NLnJlYWxpemUoaC5kaXYoaC5kaXYoeyBjbGFzc05hbWU6IGAke0RSQUdfSU1BR0VfQ0xBU1N9ICR7U0lOR0xFX0RSQUdfSU1BR0VfQ0xBU1N9YCB9LCBoLnNwYW4oeyBjbGFzc05hbWU6IENFTExfRFJBR19QUk9NUFRfQ0xBU1MgfSwgJ1snICsgcHJvbXB0TnVtYmVyICsgJ106JyksIGguc3Bhbih7IGNsYXNzTmFtZTogQ0VMTF9EUkFHX0NPTlRFTlRfQ0xBU1MgfSwgY2VsbENvbnRlbnQpKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFZpcnR1YWxET00ucmVhbGl6ZShoLmRpdihoLmRpdih7IGNsYXNzTmFtZTogYCR7RFJBR19JTUFHRV9DTEFTU30gJHtTSU5HTEVfRFJBR19JTUFHRV9DTEFTU31gIH0sIGguc3Bhbih7IGNsYXNzTmFtZTogQ0VMTF9EUkFHX1BST01QVF9DTEFTUyB9KSwgaC5zcGFuKHsgY2xhc3NOYW1lOiBDRUxMX0RSQUdfQ09OVEVOVF9DTEFTUyB9LCBjZWxsQ29udGVudCkpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ2VsbERyYWdVdGlscy5jcmVhdGVDZWxsRHJhZ0ltYWdlID0gY3JlYXRlQ2VsbERyYWdJbWFnZTtcbn0pKENlbGxEcmFnVXRpbHMgfHwgKENlbGxEcmFnVXRpbHMgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2VsbGRyYWd1dGlscy5qcy5tYXAiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IFJlYWN0V2lkZ2V0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgRWxlbWVudEV4dCB9IGZyb20gJ0BsdW1pbm8vZG9tdXRpbHMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBUaGUgQ1NTIGNsYXNzIGFkZGVkIHRvIGFsbCBjb2xsYXBzZXJzLlxuICovXG5jb25zdCBDT0xMQVBTRVJfQ0xBU1MgPSAnanAtQ29sbGFwc2VyJztcbi8qKlxuICogVGhlIENTUyBjbGFzcyBhZGRlZCB0byB0aGUgY29sbGFwc2VyIGNoaWxkLlxuICovXG5jb25zdCBDT0xMQVBTRVJfQ0hJTERfQ0xBU1MgPSAnanAtQ29sbGFwc2VyLWNoaWxkJztcbi8qKlxuICogVGhlIENTUyBjbGFzcyBhZGRlZCB0byBpbnB1dCBjb2xsYXBzZXJzLlxuICovXG5jb25zdCBJTlBVVF9DT0xMQVBTRVIgPSAnanAtSW5wdXRDb2xsYXBzZXInO1xuLyoqXG4gKiBUaGUgQ1NTIGNsYXNzIGFkZGVkIHRvIG91dHB1dCBjb2xsYXBzZXJzLlxuICovXG5jb25zdCBPVVRQVVRfQ09MTEFQU0VSID0gJ2pwLU91dHB1dENvbGxhcHNlcic7XG4vKipcbiAqIEFic3RyYWN0IGNvbGxhcHNlciBiYXNlIGNsYXNzLlxuICpcbiAqICMjIyBOb3Rlc1xuICogQSBjb2xsYXBzZXIgaXMgYSB2aXNpYmxlIGRpdiB0byB0aGUgbGVmdCBvZiBhIGNlbGwnc1xuICogaW5wdXQvb3V0cHV0IHRoYXQgYSB1c2VyIGNhbiBjbGljayBvbiB0byBjb2xsYXBzZSB0aGVcbiAqIGlucHV0L291dHB1dC5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbGxhcHNlciBleHRlbmRzIFJlYWN0V2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgY29sbGFwc2VyLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKENPTExBUFNFUl9DTEFTUyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElzIHRoZSBpbnB1dC9vdXRwdXQgb2YgdGhlIHBhcmVudCBjb2xsYXBzZWQuXG4gICAgICovXG4gICAgZ2V0IGNvbGxhcHNlZCgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgdGhlIGNvbGxhcHNlciB3aXRoIHRoZSB2aXJ0dWFsIERPTS5cbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkQ2xhc3MgPSBDT0xMQVBTRVJfQ0hJTERfQ0xBU1M7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjaGlsZENsYXNzLCBvbkNsaWNrOiBlID0+IHRoaXMuaGFuZGxlQ2xpY2soZSkgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBBIGNvbGxhcHNlciBzdWJjbGFzcyB0byBjb2xsYXBzZSBhIGNlbGwncyBpbnB1dCBhcmVhLlxuICovXG5leHBvcnQgY2xhc3MgSW5wdXRDb2xsYXBzZXIgZXh0ZW5kcyBDb2xsYXBzZXIge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBpbnB1dCBjb2xsYXBzZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoSU5QVVRfQ09MTEFQU0VSKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSXMgdGhlIGNlbGwncyBpbnB1dCBjb2xsYXBzZWQ/XG4gICAgICovXG4gICAgZ2V0IGNvbGxhcHNlZCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBjZWxsID0gKF9hID0gdGhpcy5wYXJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wYXJlbnQ7XG4gICAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5pbnB1dEhpZGRlbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjbGljayBldmVudCBmb3IgdGhlIHVzZXIgdG8gY29sbGFwc2UgdGhlIGNlbGwncyBpbnB1dC5cbiAgICAgKi9cbiAgICBoYW5kbGVDbGljayhlKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgY2VsbCA9IChfYSA9IHRoaXMucGFyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGFyZW50O1xuICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgY2VsbC5pbnB1dEhpZGRlbiA9ICFjZWxsLmlucHV0SGlkZGVuO1xuICAgICAgICB9XG4gICAgICAgIC8qIFdlIG5lZWQgdGhpcyB1bnRpbCB3ZSB3YXRjaCB0aGUgY2VsbCBzdGF0ZSAqL1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbn1cbi8qKlxuICogQSBjb2xsYXBzZXIgc3ViY2xhc3MgdG8gY29sbGFwc2UgYSBjZWxsJ3Mgb3V0cHV0IGFyZWEuXG4gKi9cbmV4cG9ydCBjbGFzcyBPdXRwdXRDb2xsYXBzZXIgZXh0ZW5kcyBDb2xsYXBzZXIge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBvdXRwdXQgY29sbGFwc2VyLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKE9VVFBVVF9DT0xMQVBTRVIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJcyB0aGUgY2VsbCdzIG91dHB1dCBjb2xsYXBzZWQ/XG4gICAgICovXG4gICAgZ2V0IGNvbGxhcHNlZCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBjZWxsID0gKF9hID0gdGhpcy5wYXJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wYXJlbnQ7XG4gICAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5vdXRwdXRIaWRkZW47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2xpY2sgZXZlbnQgZm9yIHRoZSB1c2VyIHRvIGNvbGxhcHNlIHRoZSBjZWxsJ3Mgb3V0cHV0LlxuICAgICAqL1xuICAgIGhhbmRsZUNsaWNrKGUpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgY2VsbCA9IChfYSA9IHRoaXMucGFyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGFyZW50O1xuICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgY2VsbC5vdXRwdXRIaWRkZW4gPSAhY2VsbC5vdXRwdXRIaWRkZW47XG4gICAgICAgICAgICAvKiBTY3JvbGwgY2VsbCBpbnRvIHZpZXcgYWZ0ZXIgb3V0cHV0IGNvbGxhcHNlICovXG4gICAgICAgICAgICBpZiAoY2VsbC5vdXRwdXRIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJlYSA9IChfYiA9IGNlbGwucGFyZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iubm9kZTtcbiAgICAgICAgICAgICAgICBpZiAoYXJlYSkge1xuICAgICAgICAgICAgICAgICAgICBFbGVtZW50RXh0LnNjcm9sbEludG9WaWV3SWZOZWVkZWQoYXJlYSwgY2VsbC5ub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyogV2UgbmVlZCB0aGlzIHVudGlsIHdlIHdhdGNoIHRoZSBjZWxsIHN0YXRlICovXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29sbGFwc2VyLmpzLm1hcCIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxufCBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSAnQGx1bWluby93aWRnZXRzJztcbi8qKlxuICogVGhlIENTUyBjbGFzcyBhZGRlZCB0byB0aGUgY2VsbCBoZWFkZXIuXG4gKi9cbmNvbnN0IENFTExfSEVBREVSX0NMQVNTID0gJ2pwLUNlbGxIZWFkZXInO1xuLyoqXG4gKiBUaGUgQ1NTIGNsYXNzIGFkZGVkIHRvIHRoZSBjZWxsIGZvb3Rlci5cbiAqL1xuY29uc3QgQ0VMTF9GT09URVJfQ0xBU1MgPSAnanAtQ2VsbEZvb3Rlcic7XG4vKipcbiAqIERlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgYSBjZWxsIGhlYWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIENlbGxIZWFkZXIgZXh0ZW5kcyBXaWRnZXQge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBjZWxsIGhlYWRlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhDRUxMX0hFQURFUl9DTEFTUyk7XG4gICAgfVxufVxuLyoqXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGEgY2VsbCBmb290ZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBDZWxsRm9vdGVyIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgY2VsbCBmb290ZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoQ0VMTF9GT09URVJfQ0xBU1MpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlYWRlcmZvb3Rlci5qcy5tYXAiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIGNlbGxzXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vY2VsbGRyYWd1dGlscyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbGxhcHNlcic7XG5leHBvcnQgKiBmcm9tICcuL2hlYWRlcmZvb3Rlcic7XG5leHBvcnQgKiBmcm9tICcuL2lucHV0YXJlYSc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVsJztcbmV4cG9ydCAqIGZyb20gJy4vcGxhY2Vob2xkZXInO1xuZXhwb3J0ICogZnJvbSAnLi93aWRnZXQnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBQYW5lbExheW91dCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuaW1wb3J0IHsgQ29kZUVkaXRvcldyYXBwZXIgfSBmcm9tICdAanVweXRlcmxhYi9jb2RlZWRpdG9yJztcbmltcG9ydCB7IENvZGVNaXJyb3JFZGl0b3JGYWN0b3J5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29kZW1pcnJvcic7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGlucHV0IGFyZWEgd2lkZ2V0cy5cbiAqL1xuY29uc3QgSU5QVVRfQVJFQV9DTEFTUyA9ICdqcC1JbnB1dEFyZWEnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byB0aGUgcHJvbXB0IGFyZWEgb2YgY2VsbC5cbiAqL1xuY29uc3QgSU5QVVRfQVJFQV9QUk9NUFRfQ0xBU1MgPSAnanAtSW5wdXRBcmVhLXByb21wdCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIE91dHB1dFByb21wdC5cbiAqL1xuY29uc3QgSU5QVVRfUFJPTVBUX0NMQVNTID0gJ2pwLUlucHV0UHJvbXB0Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIGVkaXRvciBhcmVhIG9mIHRoZSBjZWxsLlxuICovXG5jb25zdCBJTlBVVF9BUkVBX0VESVRPUl9DTEFTUyA9ICdqcC1JbnB1dEFyZWEtZWRpdG9yJztcbi8qKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBJbnB1dEFyZWFcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKipcbiAqIEFuIGlucHV0IGFyZWEgd2lkZ2V0LCB3aGljaCBob3N0cyBhIHByb21wdCBhbmQgYW4gZWRpdG9yIHdpZGdldC5cbiAqL1xuZXhwb3J0IGNsYXNzIElucHV0QXJlYSBleHRlbmRzIFdpZGdldCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGFuIGlucHV0IGFyZWEgd2lkZ2V0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhJTlBVVF9BUkVBX0NMQVNTKTtcbiAgICAgICAgY29uc3QgbW9kZWwgPSAodGhpcy5tb2RlbCA9IG9wdGlvbnMubW9kZWwpO1xuICAgICAgICBjb25zdCBjb250ZW50RmFjdG9yeSA9ICh0aGlzLmNvbnRlbnRGYWN0b3J5ID1cbiAgICAgICAgICAgIG9wdGlvbnMuY29udGVudEZhY3RvcnkgfHwgSW5wdXRBcmVhLmRlZmF1bHRDb250ZW50RmFjdG9yeSk7XG4gICAgICAgIC8vIFByb21wdFxuICAgICAgICBjb25zdCBwcm9tcHQgPSAodGhpcy5fcHJvbXB0ID0gY29udGVudEZhY3RvcnkuY3JlYXRlSW5wdXRQcm9tcHQoKSk7XG4gICAgICAgIHByb21wdC5hZGRDbGFzcyhJTlBVVF9BUkVBX1BST01QVF9DTEFTUyk7XG4gICAgICAgIC8vIEVkaXRvclxuICAgICAgICBjb25zdCBlZGl0b3JPcHRpb25zID0ge1xuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBmYWN0b3J5OiBjb250ZW50RmFjdG9yeS5lZGl0b3JGYWN0b3J5LFxuICAgICAgICAgICAgdXBkYXRlT25TaG93OiBvcHRpb25zLnVwZGF0ZU9uU2hvd1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlZGl0b3IgPSAodGhpcy5fZWRpdG9yID0gbmV3IENvZGVFZGl0b3JXcmFwcGVyKGVkaXRvck9wdGlvbnMpKTtcbiAgICAgICAgZWRpdG9yLmFkZENsYXNzKElOUFVUX0FSRUFfRURJVE9SX0NMQVNTKTtcbiAgICAgICAgY29uc3QgbGF5b3V0ID0gKHRoaXMubGF5b3V0ID0gbmV3IFBhbmVsTGF5b3V0KCkpO1xuICAgICAgICBsYXlvdXQuYWRkV2lkZ2V0KHByb21wdCk7XG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgbGF5b3V0LmFkZFdpZGdldChlZGl0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgQ29kZUVkaXRvcldyYXBwZXIgdXNlZCBieSB0aGUgY2VsbC5cbiAgICAgKi9cbiAgICBnZXQgZWRpdG9yV2lkZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIENvZGVFZGl0b3IgdXNlZCBieSB0aGUgY2VsbC5cbiAgICAgKi9cbiAgICBnZXQgZWRpdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yLmVkaXRvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBwcm9tcHQgbm9kZSB1c2VkIGJ5IHRoZSBjZWxsLlxuICAgICAqL1xuICAgIGdldCBwcm9tcHROb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbXB0Lm5vZGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcmVuZGVyZWQgaW5wdXQgYXJlYSB3aWRnZXQsIGlmIGFueS5cbiAgICAgKi9cbiAgICBnZXQgcmVuZGVyZWRJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgYW4gaW5wdXQgaW5zdGVhZCBvZiB0aGUgdGV4dCBlZGl0b3IuXG4gICAgICovXG4gICAgcmVuZGVySW5wdXQod2lkZ2V0KSB7XG4gICAgICAgIGNvbnN0IGxheW91dCA9IHRoaXMubGF5b3V0O1xuICAgICAgICBpZiAodGhpcy5fcmVuZGVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVkLnBhcmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZWRpdG9yLmhpZGUoKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZWQgPSB3aWRnZXQ7XG4gICAgICAgIGxheW91dC5hZGRXaWRnZXQod2lkZ2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvdyB0aGUgdGV4dCBlZGl0b3IuXG4gICAgICovXG4gICAgc2hvd0VkaXRvcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlbmRlcmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlZC5wYXJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2VkaXRvci5zaG93KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgcHJvbXB0IG9mIHRoZSBpbnB1dCBhcmVhLlxuICAgICAqL1xuICAgIHNldFByb21wdCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9wcm9tcHQuZXhlY3V0aW9uQ291bnQgPSB2YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGFscmVhZHkgZGlzcG9zZWQuXG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcm9tcHQgPSBudWxsO1xuICAgICAgICB0aGlzLl9lZGl0b3IgPSBudWxsO1xuICAgICAgICB0aGlzLl9yZW5kZXJlZCA9IG51bGw7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG59XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBgSW5wdXRBcmVhYCBzdGF0aWNzLlxuICovXG4oZnVuY3Rpb24gKElucHV0QXJlYSkge1xuICAgIC8qKlxuICAgICAqIERlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgYElDb250ZW50RmFjdG9yeWAuXG4gICAgICpcbiAgICAgKiBUaGlzIGRlZmF1bHRzIHRvIHVzaW5nIGFuIGBlZGl0b3JGYWN0b3J5YCBiYXNlZCBvbiBDb2RlTWlycm9yLlxuICAgICAqL1xuICAgIGNsYXNzIENvbnRlbnRGYWN0b3J5IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnN0cnVjdCBhIGBDb250ZW50RmFjdG9yeWAuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRvciA9IG9wdGlvbnMuZWRpdG9yRmFjdG9yeSB8fCBJbnB1dEFyZWEuZGVmYXVsdEVkaXRvckZhY3Rvcnk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiB0aGUgYENvZGVFZGl0b3IuRmFjdG9yeWAgYmVpbmcgdXNlZC5cbiAgICAgICAgICovXG4gICAgICAgIGdldCBlZGl0b3JGYWN0b3J5KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VkaXRvcjtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGFuIGlucHV0IHByb21wdC5cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZUlucHV0UHJvbXB0KCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnB1dFByb21wdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIElucHV0QXJlYS5Db250ZW50RmFjdG9yeSA9IENvbnRlbnRGYWN0b3J5O1xuICAgIC8qKlxuICAgICAqIEEgZnVuY3Rpb24gdG8gY3JlYXRlIHRoZSBkZWZhdWx0IENvZGVNaXJyb3IgZWRpdG9yIGZhY3RvcnkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gX2NyZWF0ZURlZmF1bHRFZGl0b3JGYWN0b3J5KCkge1xuICAgICAgICBjb25zdCBlZGl0b3JTZXJ2aWNlcyA9IG5ldyBDb2RlTWlycm9yRWRpdG9yRmFjdG9yeSgpO1xuICAgICAgICByZXR1cm4gZWRpdG9yU2VydmljZXMubmV3SW5saW5lRWRpdG9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZGVmYXVsdCBlZGl0b3IgZmFjdG9yeSBzaW5nbGV0b24gYmFzZWQgb24gQ29kZU1pcnJvci5cbiAgICAgKi9cbiAgICBJbnB1dEFyZWEuZGVmYXVsdEVkaXRvckZhY3RvcnkgPSBfY3JlYXRlRGVmYXVsdEVkaXRvckZhY3RvcnkoKTtcbiAgICAvKipcbiAgICAgKiBUaGUgZGVmYXVsdCBgQ29udGVudEZhY3RvcnlgIGluc3RhbmNlLlxuICAgICAqL1xuICAgIElucHV0QXJlYS5kZWZhdWx0Q29udGVudEZhY3RvcnkgPSBuZXcgQ29udGVudEZhY3Rvcnkoe30pO1xufSkoSW5wdXRBcmVhIHx8IChJbnB1dEFyZWEgPSB7fSkpO1xuLyoqXG4gKiBUaGUgZGVmYXVsdCBpbnB1dCBwcm9tcHQgaW1wbGVtZW50YXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBJbnB1dFByb21wdCBleHRlbmRzIFdpZGdldCB7XG4gICAgLypcbiAgICAgKiBDcmVhdGUgYW4gb3V0cHV0IHByb21wdCB3aWRnZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2V4ZWN1dGlvbkNvdW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhJTlBVVF9QUk9NUFRfQ0xBU1MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZXhlY3V0aW9uIGNvdW50IGZvciB0aGUgcHJvbXB0LlxuICAgICAqL1xuICAgIGdldCBleGVjdXRpb25Db3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4ZWN1dGlvbkNvdW50O1xuICAgIH1cbiAgICBzZXQgZXhlY3V0aW9uQ291bnQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZXhlY3V0aW9uQ291bnQgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSAnICc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSBgWyR7dmFsdWUgfHwgJyAnfV06YDtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlucHV0YXJlYS5qcy5tYXAiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IEpTT05FeHQgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG5pbXBvcnQgeyBBdHRhY2htZW50c01vZGVsIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXR0YWNobWVudHMnO1xuaW1wb3J0IHsgQ29kZUVkaXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL2NvZGVlZGl0b3InO1xuaW1wb3J0ICogYXMgbW9kZWxzIGZyb20gJ0BqdXB5dGVybGFiL3NoYXJlZC1tb2RlbHMnO1xuaW1wb3J0IHsgVVVJRCB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbmltcG9ydCB7IE91dHB1dEFyZWFNb2RlbCB9IGZyb20gJ0BqdXB5dGVybGFiL291dHB1dGFyZWEnO1xuY29uc3QgZ2xvYmFsTW9kZWxEQk11dGV4ID0gbW9kZWxzLmNyZWF0ZU11dGV4KCk7XG5leHBvcnQgZnVuY3Rpb24gaXNDb2RlQ2VsbE1vZGVsKG1vZGVsKSB7XG4gICAgcmV0dXJuIG1vZGVsLnR5cGUgPT09ICdjb2RlJztcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc01hcmtkb3duQ2VsbE1vZGVsKG1vZGVsKSB7XG4gICAgcmV0dXJuIG1vZGVsLnR5cGUgPT09ICdtYXJrZG93bic7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNSYXdDZWxsTW9kZWwobW9kZWwpIHtcbiAgICByZXR1cm4gbW9kZWwudHlwZSA9PT0gJ3Jhdyc7XG59XG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIHRoZSBjZWxsIG1vZGVsLlxuICovXG5leHBvcnQgY2xhc3MgQ2VsbE1vZGVsIGV4dGVuZHMgQ29kZUVkaXRvci5Nb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgY2VsbCBtb2RlbCBmcm9tIG9wdGlvbmFsIGNlbGwgY29udGVudC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgbW9kZWxEQjogb3B0aW9ucy5tb2RlbERCLFxuICAgICAgICAgICAgaWQ6IG9wdGlvbnMuaWQgfHwgKChfYSA9IG9wdGlvbnMuY2VsbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkKSB8fCBVVUlELnV1aWQ0KClcbiAgICAgICAgfSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIHN0YXRlIG9mIHRoZSBtb2RlbCBjaGFuZ2VzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb250ZW50Q2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gYSBtb2RlbCBzdGF0ZSBjaGFuZ2VzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLnZhbHVlLmNoYW5nZWQuY29ubmVjdCh0aGlzLm9uR2VuZXJpY0NoYW5nZSwgdGhpcyk7XG4gICAgICAgIGNvbnN0IGNlbGxUeXBlID0gdGhpcy5tb2RlbERCLmNyZWF0ZVZhbHVlKCd0eXBlJyk7XG4gICAgICAgIGNlbGxUeXBlLnNldCh0aGlzLnR5cGUpO1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlTWV0YWRhdGEgPSB0aGlzLm1vZGVsREIuY3JlYXRlTWFwKCdtZXRhZGF0YScpO1xuICAgICAgICBvYnNlcnZhYmxlTWV0YWRhdGEuY2hhbmdlZC5jb25uZWN0KHRoaXMub25Nb2RlbERCTWV0YWRhdGFDaGFuZ2UsIHRoaXMpO1xuICAgICAgICBvYnNlcnZhYmxlTWV0YWRhdGEuY2hhbmdlZC5jb25uZWN0KHRoaXMub25HZW5lcmljQ2hhbmdlLCB0aGlzKTtcbiAgICAgICAgY29uc3QgY2VsbCA9IG9wdGlvbnMuY2VsbDtcbiAgICAgICAgY29uc3QgdHJ1c3RlZCA9IHRoaXMubW9kZWxEQi5jcmVhdGVWYWx1ZSgndHJ1c3RlZCcpO1xuICAgICAgICB0cnVzdGVkLmNoYW5nZWQuY29ubmVjdCh0aGlzLm9uVHJ1c3RlZENoYW5nZWQsIHRoaXMpO1xuICAgICAgICBpZiAoIWNlbGwpIHtcbiAgICAgICAgICAgIHRydXN0ZWQuc2V0KGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnVzdGVkLnNldCghIWNlbGwubWV0YWRhdGFbJ3RydXN0ZWQnXSk7XG4gICAgICAgIGRlbGV0ZSBjZWxsLm1ldGFkYXRhWyd0cnVzdGVkJ107XG4gICAgICAgIC8vIFNldCB0aGUgdGV4dCB2YWx1ZSwgbm9ybWFsaXppbmcgbGluZSBlbmRpbmdzIHRvIFxcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjZWxsLnNvdXJjZSkpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUudGV4dCA9IGNlbGwuc291cmNlXG4gICAgICAgICAgICAgICAgLm1hcChzID0+IHMucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKS5yZXBsYWNlKC9cXHIvZywgJ1xcbicpKVxuICAgICAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUudGV4dCA9IGNlbGwuc291cmNlLnJlcGxhY2UoL1xcclxcbi9nLCAnXFxuJykucmVwbGFjZSgvXFxyL2csICdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IEpTT05FeHQuZGVlcENvcHkoY2VsbC5tZXRhZGF0YSk7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT09ICdyYXcnKSB7XG4gICAgICAgICAgICBkZWxldGUgbWV0YWRhdGFbJ2Zvcm1hdCddO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT09ICdjb2RlJykge1xuICAgICAgICAgICAgZGVsZXRlIG1ldGFkYXRhWydjb2xsYXBzZWQnXTtcbiAgICAgICAgICAgIGRlbGV0ZSBtZXRhZGF0YVsnc2Nyb2xsZWQnXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBtZXRhZGF0YSkge1xuICAgICAgICAgICAgb2JzZXJ2YWJsZU1ldGFkYXRhLnNldChrZXksIG1ldGFkYXRhW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSB0eXBlIG9mIGNlbGwuXG4gICAgICovXG4gICAgZ2V0IHR5cGUoKSB7XG4gICAgICAgIC8vIFRoaXMgZ2V0dGVyIHJlYWxseSBzaG91bGQgYmUgYWJzdHJhY3QsIGJ1dCBvdXIgY3VycmVudCBjb25zdHJ1Y3RvclxuICAgICAgICAvLyBkZXBlbmRzIG9uIC50eXBlIHdvcmtpbmdcbiAgICAgICAgcmV0dXJuICdyYXcnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgaWQgZm9yIHRoZSBjZWxsLlxuICAgICAqL1xuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkTW9kZWwuZ2V0SWQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG1ldGFkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGUgY2VsbC5cbiAgICAgKi9cbiAgICBnZXQgbWV0YWRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsREIuZ2V0KCdtZXRhZGF0YScpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRydXN0ZWQgc3RhdGUgb2YgdGhlIG1vZGVsLlxuICAgICAqL1xuICAgIGdldCB0cnVzdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbERCLmdldFZhbHVlKCd0cnVzdGVkJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdHJ1c3RlZCBzdGF0ZSBvZiB0aGUgbW9kZWwuXG4gICAgICovXG4gICAgc2V0IHRydXN0ZWQobmV3VmFsdWUpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLnRydXN0ZWQ7XG4gICAgICAgIGlmIChvbGRWYWx1ZSA9PT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGVsREIuc2V0VmFsdWUoJ3RydXN0ZWQnLCBuZXdWYWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlcmlhbGl6ZSB0aGUgbW9kZWwgdG8gSlNPTi5cbiAgICAgKi9cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5tZXRhZGF0YS5rZXlzKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLm1ldGFkYXRhLmdldChrZXkpKSk7XG4gICAgICAgICAgICBtZXRhZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudHJ1c3RlZCkge1xuICAgICAgICAgICAgbWV0YWRhdGFbJ3RydXN0ZWQnXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNlbGxfdHlwZTogdGhpcy50eXBlLFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLnZhbHVlLnRleHQsXG4gICAgICAgICAgICBtZXRhZGF0YVxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIHRydXN0ZWQgc3RhdGUuXG4gICAgICpcbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBpcyBhIG5vLW9wLlxuICAgICAqL1xuICAgIG9uVHJ1c3RlZENoYW5nZWQodHJ1c3RlZCwgYXJncykge1xuICAgICAgICAvKiBuby1vcCAqL1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGVuIHdlIGluaXRpYWxpemUgYSBjZWxsIG1vZGVsLCB3ZSBjcmVhdGUgYSBzdGFuZGFsb25lIG1vZGVsIHRoYXQgY2Fubm90IGJlIHNoYXJlZCBpbiBhIFlOb3RlYm9vay5cbiAgICAgKiBDYWxsIHRoaXMgZnVuY3Rpb24gdG8gcmUtaW5pdGlhbGl6ZSB0aGUgbG9jYWwgcmVwcmVzZW50YXRpb24gYmFzZWQgb24gYSBmcmVzaCBzaGFyZWQgbW9kZWwgKGUuZy4gbW9kZWxzLllGaWxlIG9yIG1vZGVscy5ZQ29kZUNlbGwpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNoYXJlZE1vZGVsXG4gICAgICogQHBhcmFtIHJlaW5pdGlhbGl6ZSBXaGV0aGVyIHRvIHJlaW5pdGlhbGl6ZSB0aGUgc2hhcmVkIG1vZGVsLlxuICAgICAqL1xuICAgIHN3aXRjaFNoYXJlZE1vZGVsKHNoYXJlZE1vZGVsLCByZWluaXRpYWxpemUpIHtcbiAgICAgICAgaWYgKHJlaW5pdGlhbGl6ZSkge1xuICAgICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBzaGFyZWRNb2RlbC5nZXRNZXRhZGF0YSgpO1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlTW9kZWxEQk1ldGFkYXRhKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdXBlci5zd2l0Y2hTaGFyZWRNb2RlbChzaGFyZWRNb2RlbCwgcmVpbml0aWFsaXplKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBjZWxsIG1ldGFkYXRhIG1vZGVsREIgYW5kIHJlZmxlY3QgaXQgaW4gdGhlIHNoYXJlZCBtb2RlbC5cbiAgICAgKi9cbiAgICBvbk1vZGVsREJNZXRhZGF0YUNoYW5nZShzZW5kZXIsIGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gdGhpcy5zaGFyZWRNb2RlbC5nZXRNZXRhZGF0YSgpO1xuICAgICAgICBnbG9iYWxNb2RlbERCTXV0ZXgoKCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYWRkJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlQ2VsbE1ldGFkYXRhKG1ldGFkYXRhLCBldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NoYW5nZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUNlbGxNZXRhZGF0YShtZXRhZGF0YSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmUnOlxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgbWV0YWRhdGFbZXZlbnQua2V5XTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGV2ZW50IHR5cGU6ICR7ZXZlbnQudHlwZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2hhcmVkTW9kZWwuc2V0TWV0YWRhdGEobWV0YWRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hhbmdlIHRoZSBjZWxsIG1ldGFkYXRhIGZvciBhIGdpdmVuIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIG1ldGFkYXRhIFRoZSBjZWxsIG1ldGFkYXRhLlxuICAgICAqIEBwYXJhbSBldmVudCBUaGUgZXZlbnQgdG8gaGFuZGxlLlxuICAgICAqL1xuICAgIF9jaGFuZ2VDZWxsTWV0YWRhdGEobWV0YWRhdGEsIGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICBjYXNlICdqdXB5dGVyJzpcbiAgICAgICAgICAgICAgICBtZXRhZGF0YS5qdXB5dGVyID0gZXZlbnQubmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjb2xsYXBzZWQnOlxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLmNvbGxhcHNlZCA9IGV2ZW50Lm5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbmFtZSc6XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEubmFtZSA9IGV2ZW50Lm5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2Nyb2xsZWQnOlxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLnNjcm9sbGVkID0gZXZlbnQubmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0YWdzJzpcbiAgICAgICAgICAgICAgICBtZXRhZGF0YS50YWdzID0gZXZlbnQubmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0cnVzdGVkJzpcbiAgICAgICAgICAgICAgICBtZXRhZGF0YS50cnVzdGVkID0gZXZlbnQubmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIFRoZSBkZWZhdWx0IGlzIGFwcGxpZWQgZm9yIGN1c3RvbSBtZXRhZGF0YSB0aGF0IGFyZSBub3RcbiAgICAgICAgICAgICAgICAvLyBkZWZpbmVkIGluIHRoZSBvZmZpY2lhbCBuYmZvcm1hdCBidXQgd2hpY2ggYXJlIGRlZmluZWRcbiAgICAgICAgICAgICAgICAvLyBieSB0aGUgdXNlci5cbiAgICAgICAgICAgICAgICBtZXRhZGF0YVtldmVudC5rZXldID0gZXZlbnQubmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBjZWxsIHNoYXJlZCBtb2RlbCBhbmQgcmVmbGVjdCBpdCBpbiBtb2RlbERCLlxuICAgICAqIFdlIHVwZGF0ZSB0aGUgbW9kZWxkYiBtZXRhZGF0YSB3aGVuIHRoZSBzaGFyZWQgbW9kZWwgY2hhbmdlcy5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIG92ZXJyaWRlcyB0aGUgQ29kZUVkaXRvciBwcm90ZWN0ZWQgX29uU2hhcmVkTW9kZWxDaGFuZ2VkXG4gICAgICogc28gd2UgZmlyc3QgY2FsbCBzdXBlci5fb25TaGFyZWRNb2RlbENoYW5nZWRcbiAgICAgKlxuICAgICAqIEBvdmVycmlkZSBDb2RlRWRpdG9yLl9vblNoYXJlZE1vZGVsQ2hhbmdlZFxuICAgICAqL1xuICAgIF9vblNoYXJlZE1vZGVsQ2hhbmdlZChzZW5kZXIsIGNoYW5nZSkge1xuICAgICAgICBzdXBlci5fb25TaGFyZWRNb2RlbENoYW5nZWQoc2VuZGVyLCBjaGFuZ2UpO1xuICAgICAgICBnbG9iYWxNb2RlbERCTXV0ZXgoKCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgaWYgKGNoYW5nZS5tZXRhZGF0YUNoYW5nZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gKF9hID0gY2hhbmdlLm1ldGFkYXRhQ2hhbmdlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1vZGVsREJNZXRhZGF0YShuZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3VwZGF0ZU1vZGVsREJNZXRhZGF0YShtZXRhZGF0YSkge1xuICAgICAgICBPYmplY3Qua2V5cyhtZXRhZGF0YSkubWFwKGtleSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbGxhcHNlZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWV0YWRhdGEuc2V0KCdjb2xsYXBzZWQnLCBtZXRhZGF0YS5qdXB5dGVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnanVweXRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWV0YWRhdGEuc2V0KCdqdXB5dGVyJywgbWV0YWRhdGEuanVweXRlcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ25hbWUnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGFkYXRhLnNldCgnbmFtZScsIG1ldGFkYXRhLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzY3JvbGxlZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWV0YWRhdGEuc2V0KCdzY3JvbGxlZCcsIG1ldGFkYXRhLnNjcm9sbGVkKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndGFncyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWV0YWRhdGEuc2V0KCd0YWdzJywgbWV0YWRhdGEudGFncyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3RydXN0ZWQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGFkYXRhLnNldCgndHJ1c3RlZCcsIG1ldGFkYXRhLnRydXN0ZWQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgZGVmYXVsdCBpcyBhcHBsaWVkIGZvciBjdXN0b20gbWV0YWRhdGEgdGhhdCBhcmUgbm90XG4gICAgICAgICAgICAgICAgICAgIC8vIGRlZmluZWQgaW4gdGhlIG9mZmljaWFsIG5iZm9ybWF0IGJ1dCB3aGljaCBhcmUgZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAvLyBieSB0aGUgdXNlci5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRhZGF0YS5zZXQoa2V5LCBtZXRhZGF0YVtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUgb2JzZXJ2YWJsZSB2YWx1ZS5cbiAgICAgKi9cbiAgICBvbkdlbmVyaWNDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuY29udGVudENoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgIH1cbn1cbi8qKlxuICogQSBiYXNlIGltcGxlbWVudGF0aW9uIGZvciBjZWxsIG1vZGVscyB3aXRoIGF0dGFjaG1lbnRzLlxuICovXG5leHBvcnQgY2xhc3MgQXR0YWNobWVudHNDZWxsTW9kZWwgZXh0ZW5kcyBDZWxsTW9kZWwge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBjZWxsIHdpdGggb3B0aW9uYWwgYXR0YWNobWVudHMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgY29uc3QgZmFjdG9yeSA9IG9wdGlvbnMuY29udGVudEZhY3RvcnkgfHwgQXR0YWNobWVudHNDZWxsTW9kZWwuZGVmYXVsdENvbnRlbnRGYWN0b3J5O1xuICAgICAgICBsZXQgYXR0YWNobWVudHM7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBvcHRpb25zLmNlbGw7XG4gICAgICAgIGlmIChjZWxsICYmIChjZWxsLmNlbGxfdHlwZSA9PT0gJ3JhdycgfHwgY2VsbC5jZWxsX3R5cGUgPT09ICdtYXJrZG93bicpKSB7XG4gICAgICAgICAgICBhdHRhY2htZW50cyA9IGNlbGxcbiAgICAgICAgICAgICAgICAuYXR0YWNobWVudHM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYXR0YWNobWVudHMgPSBmYWN0b3J5LmNyZWF0ZUF0dGFjaG1lbnRzTW9kZWwoe1xuICAgICAgICAgICAgdmFsdWVzOiBhdHRhY2htZW50cyxcbiAgICAgICAgICAgIG1vZGVsREI6IHRoaXMubW9kZWxEQlxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fYXR0YWNobWVudHMuc3RhdGVDaGFuZ2VkLmNvbm5lY3QodGhpcy5vbkdlbmVyaWNDaGFuZ2UsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGF0dGFjaG1lbnRzIG9mIHRoZSBtb2RlbC5cbiAgICAgKi9cbiAgICBnZXQgYXR0YWNobWVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdHRhY2htZW50cztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VyaWFsaXplIHRoZSBtb2RlbCB0byBKU09OLlxuICAgICAqL1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IHN1cGVyLnRvSlNPTigpO1xuICAgICAgICBpZiAodGhpcy5hdHRhY2htZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNlbGwuYXR0YWNobWVudHMgPSB0aGlzLmF0dGFjaG1lbnRzLnRvSlNPTigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cbn1cbi8qKlxuICogVGhlIG5hbWVzcGFjZSBmb3IgYEF0dGFjaG1lbnRzQ2VsbE1vZGVsYCBzdGF0aWNzLlxuICovXG4oZnVuY3Rpb24gKEF0dGFjaG1lbnRzQ2VsbE1vZGVsKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgYW4gYElDb250ZW50RmFjdG9yeWAuXG4gICAgICovXG4gICAgY2xhc3MgQ29udGVudEZhY3Rvcnkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGFuIGF0dGFjaG1lbnRzIG1vZGVsLlxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlQXR0YWNobWVudHNNb2RlbChvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEF0dGFjaG1lbnRzTW9kZWwob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQXR0YWNobWVudHNDZWxsTW9kZWwuQ29udGVudEZhY3RvcnkgPSBDb250ZW50RmFjdG9yeTtcbiAgICAvKipcbiAgICAgKiBUaGUgc2hhcmVkIGBDb250ZW50RmFjdG9yeWAgaW5zdGFuY2UuXG4gICAgICovXG4gICAgQXR0YWNobWVudHNDZWxsTW9kZWwuZGVmYXVsdENvbnRlbnRGYWN0b3J5ID0gbmV3IENvbnRlbnRGYWN0b3J5KCk7XG59KShBdHRhY2htZW50c0NlbGxNb2RlbCB8fCAoQXR0YWNobWVudHNDZWxsTW9kZWwgPSB7fSkpO1xuLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiBhIHJhdyBjZWxsIG1vZGVsLlxuICovXG5leHBvcnQgY2xhc3MgUmF3Q2VsbE1vZGVsIGV4dGVuZHMgQXR0YWNobWVudHNDZWxsTW9kZWwge1xuICAgIC8qKlxuICAgICAqIFRoZSB0eXBlIG9mIHRoZSBjZWxsLlxuICAgICAqL1xuICAgIGdldCB0eXBlKCkge1xuICAgICAgICByZXR1cm4gJ3Jhdyc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlcmlhbGl6ZSB0aGUgbW9kZWwgdG8gSlNPTi5cbiAgICAgKi9cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBzdXBlci50b0pTT04oKTtcbiAgICAgICAgY2VsbC5pZCA9IHRoaXMuaWQ7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cbn1cbi8qKlxuICogQW4gaW1wbGVtZW50YXRpb24gb2YgYSBtYXJrZG93biBjZWxsIG1vZGVsLlxuICovXG5leHBvcnQgY2xhc3MgTWFya2Rvd25DZWxsTW9kZWwgZXh0ZW5kcyBBdHRhY2htZW50c0NlbGxNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbWFya2Rvd24gY2VsbCBtb2RlbCBmcm9tIG9wdGlvbmFsIGNlbGwgY29udGVudC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICAvLyBVc2UgdGhlIEdpdGh1Yi1mbGF2b3JlZCBtYXJrZG93biBtb2RlLlxuICAgICAgICB0aGlzLm1pbWVUeXBlID0gJ3RleHQveC1pcHl0aG9uZ2ZtJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHR5cGUgb2YgdGhlIGNlbGwuXG4gICAgICovXG4gICAgZ2V0IHR5cGUoKSB7XG4gICAgICAgIHJldHVybiAnbWFya2Rvd24nO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXJpYWxpemUgdGhlIG1vZGVsIHRvIEpTT04uXG4gICAgICovXG4gICAgdG9KU09OKCkge1xuICAgICAgICBjb25zdCBjZWxsID0gc3VwZXIudG9KU09OKCk7XG4gICAgICAgIGNlbGwuaWQgPSB0aGlzLmlkO1xuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICB9XG59XG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIGEgY29kZSBjZWxsIE1vZGVsLlxuICovXG5leHBvcnQgY2xhc3MgQ29kZUNlbGxNb2RlbCBleHRlbmRzIENlbGxNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IGNvZGUgY2VsbCB3aXRoIG9wdGlvbmFsIG9yaWdpbmFsIGNlbGwgY29udGVudC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2V4ZWN1dGVkQ29kZSA9ICcnO1xuICAgICAgICB0aGlzLl9pc0RpcnR5ID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSBvcHRpb25zLmNvbnRlbnRGYWN0b3J5IHx8IENvZGVDZWxsTW9kZWwuZGVmYXVsdENvbnRlbnRGYWN0b3J5O1xuICAgICAgICBjb25zdCB0cnVzdGVkID0gdGhpcy50cnVzdGVkO1xuICAgICAgICBjb25zdCBjZWxsID0gb3B0aW9ucy5jZWxsO1xuICAgICAgICBsZXQgb3V0cHV0cyA9IFtdO1xuICAgICAgICBjb25zdCBleGVjdXRpb25Db3VudCA9IHRoaXMubW9kZWxEQi5jcmVhdGVWYWx1ZSgnZXhlY3V0aW9uQ291bnQnKTtcbiAgICAgICAgaWYgKCFleGVjdXRpb25Db3VudC5nZXQoKSkge1xuICAgICAgICAgICAgaWYgKGNlbGwgJiYgY2VsbC5jZWxsX3R5cGUgPT09ICdjb2RlJykge1xuICAgICAgICAgICAgICAgIGV4ZWN1dGlvbkNvdW50LnNldChjZWxsLmV4ZWN1dGlvbl9jb3VudCB8fCBudWxsKTtcbiAgICAgICAgICAgICAgICBvdXRwdXRzID0gKF9hID0gY2VsbC5vdXRwdXRzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXTtcbiAgICAgICAgICAgICAgICAvLyBJZiBleGVjdXRpb24gY291bnQgaXMgbm90IG51bGwgcHJlc3VtZSB0aGUgaW5wdXQgY29kZSB3YXMgdGhlIGxhdGVzdCBleGVjdXRlZFxuICAgICAgICAgICAgICAgIC8vIFRPRE8gbG9hZCBmcm9tIHRoZSBub3RlYm9vayBmaWxlIHdoZW4gdGhlIGRpcnR5IHN0YXRlIGlzIHN0b3JlZCBpbiBpdFxuICAgICAgICAgICAgICAgIGlmIChjZWxsLmV4ZWN1dGlvbl9jb3VudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRydWUgaWYgZXhlY3V0aW9uX2NvdW50IGlzIG51bGwgb3IgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V4ZWN1dGVkQ29kZSA9IHRoaXMudmFsdWUudGV4dC50cmltKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXhlY3V0aW9uQ291bnQuc2V0KG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudmFsdWUuY2hhbmdlZC5jb25uZWN0KHRoaXMuX29uVmFsdWVDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgZXhlY3V0aW9uQ291bnQuY2hhbmdlZC5jb25uZWN0KHRoaXMuX29uRXhlY3V0aW9uQ291bnRDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgZ2xvYmFsTW9kZWxEQk11dGV4KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNoYXJlZENlbGwgPSB0aGlzLnNoYXJlZE1vZGVsO1xuICAgICAgICAgICAgc2hhcmVkQ2VsbC5zZXRPdXRwdXRzKG91dHB1dHMpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fb3V0cHV0cyA9IGZhY3RvcnkuY3JlYXRlT3V0cHV0QXJlYSh7IHRydXN0ZWQsIHZhbHVlczogb3V0cHV0cyB9KTtcbiAgICAgICAgdGhpcy5fb3V0cHV0cy5jaGFuZ2VkLmNvbm5lY3QodGhpcy5vbkdlbmVyaWNDaGFuZ2UsIHRoaXMpO1xuICAgICAgICB0aGlzLl9vdXRwdXRzLmNoYW5nZWQuY29ubmVjdCh0aGlzLm9uTW9kZWxEQk91dHB1dHNDaGFuZ2UsIHRoaXMpO1xuICAgICAgICAvLyBXZSBrZWVwIGBjb2xsYXBzZWRgIGFuZCBganVweXRlci5vdXRwdXRzX2hpZGRlbmAgbWV0YWRhdGEgaW4gc3luYywgc2luY2VcbiAgICAgICAgLy8gdGhleSBhcmUgcmVkdW5kYW50IGluIG5iZm9ybWF0IDQuNC4gU2VlXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qdXB5dGVyL25iZm9ybWF0L2lzc3Vlcy8xMzdcbiAgICAgICAgdGhpcy5tZXRhZGF0YS5jaGFuZ2VkLmNvbm5lY3QoUHJpdmF0ZS5jb2xsYXBzZUNoYW5nZWQsIHRoaXMpO1xuICAgICAgICAvLyBTeW5jIGBjb2xsYXBzZWRgIGFuZCBganVweXRlci5vdXRwdXRzX2hpZGRlbmAgZm9yIHRoZSBmaXJzdCB0aW1lLCBnaXZpbmdcbiAgICAgICAgLy8gcHJlZmVyZW5jZSB0byBgY29sbGFwc2VkYC5cbiAgICAgICAgaWYgKHRoaXMubWV0YWRhdGEuaGFzKCdjb2xsYXBzZWQnKSkge1xuICAgICAgICAgICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5tZXRhZGF0YS5nZXQoJ2NvbGxhcHNlZCcpO1xuICAgICAgICAgICAgUHJpdmF0ZS5jb2xsYXBzZUNoYW5nZWQodGhpcy5tZXRhZGF0YSwge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdjaGFuZ2UnLFxuICAgICAgICAgICAgICAgIGtleTogJ2NvbGxhcHNlZCcsXG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IGNvbGxhcHNlZCxcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogY29sbGFwc2VkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLm1ldGFkYXRhLmhhcygnanVweXRlcicpKSB7XG4gICAgICAgICAgICBjb25zdCBqdXB5dGVyID0gdGhpcy5tZXRhZGF0YS5nZXQoJ2p1cHl0ZXInKTtcbiAgICAgICAgICAgIGlmIChqdXB5dGVyLmhhc093blByb3BlcnR5KCdvdXRwdXRzX2hpZGRlbicpKSB7XG4gICAgICAgICAgICAgICAgUHJpdmF0ZS5jb2xsYXBzZUNoYW5nZWQodGhpcy5tZXRhZGF0YSwge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY2hhbmdlJyxcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnanVweXRlcicsXG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBqdXB5dGVyLFxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZToganVweXRlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHN3aXRjaFNoYXJlZE1vZGVsKHNoYXJlZE1vZGVsLCByZWluaXRpYWxpemUpIHtcbiAgICAgICAgaWYgKHJlaW5pdGlhbGl6ZSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckV4ZWN1dGlvbigpO1xuICAgICAgICAgICAgc2hhcmVkTW9kZWwuZ2V0T3V0cHV0cygpLmZvckVhY2gob3V0cHV0ID0+IHRoaXMuX291dHB1dHMuYWRkKG91dHB1dCkpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLnN3aXRjaFNoYXJlZE1vZGVsKHNoYXJlZE1vZGVsLCByZWluaXRpYWxpemUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgdHlwZSBvZiB0aGUgY2VsbC5cbiAgICAgKi9cbiAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuICdjb2RlJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGV4ZWN1dGlvbiBjb3VudCBvZiB0aGUgY2VsbC5cbiAgICAgKi9cbiAgICBnZXQgZXhlY3V0aW9uQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsREIuaGFzKCdleGVjdXRpb25Db3VudCcpXG4gICAgICAgICAgICA/IHRoaXMubW9kZWxEQi5nZXRWYWx1ZSgnZXhlY3V0aW9uQ291bnQnKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cbiAgICBzZXQgZXhlY3V0aW9uQ291bnQobmV3VmFsdWUpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLmV4ZWN1dGlvbkNvdW50O1xuICAgICAgICBpZiAobmV3VmFsdWUgPT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2RlbERCLnNldFZhbHVlKCdleGVjdXRpb25Db3VudCcsIG5ld1ZhbHVlIHx8IG51bGwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBjZWxsIGlzIGRpcnR5IG9yIG5vdC5cbiAgICAgKlxuICAgICAqIEEgY2VsbCBpcyBkaXJ0eSBpZiBpdCBpcyBvdXRwdXQgaXMgbm90IGVtcHR5IGFuZCBkb2VzIG5vdFxuICAgICAqIHJlc3VsdCBvZiB0aGUgaW5wdXQgY29kZSBleGVjdXRpb24uXG4gICAgICovXG4gICAgZ2V0IGlzRGlydHkoKSB7XG4gICAgICAgIC8vIFRlc3QgY291bGQgYmUgZG9uZSBkeW5hbWljYWxseSB3aXRoIHRoaXMuX2V4ZWN1dGVkQ29kZVxuICAgICAgICAvLyBidXQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbiwgdGhlIGRpZmYgc3RhdHVzIGlzIHN0b3JlZCBpbiBhIGJvb2xlYW4uXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0RpcnR5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgd2hldGhlciB0aGUgY2VsbCBpcyBkaXJ0eSBvciBub3QuXG4gICAgICovXG4gICAgX3NldERpcnR5KHYpIHtcbiAgICAgICAgaWYgKHYgIT09IHRoaXMuX2lzRGlydHkpIHtcbiAgICAgICAgICAgIGlmICghdikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2V4ZWN1dGVkQ29kZSA9IHRoaXMudmFsdWUudGV4dC50cmltKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9pc0RpcnR5ID0gdjtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VkLmVtaXQoe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdpc0RpcnR5JyxcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZTogIXYsXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IHZcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyRXhlY3V0aW9uKCkge1xuICAgICAgICB0aGlzLm91dHB1dHMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5leGVjdXRpb25Db3VudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NldERpcnR5KGZhbHNlKTtcbiAgICAgICAgdGhpcy5tZXRhZGF0YS5kZWxldGUoJ2V4ZWN1dGlvbicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY2VsbCBvdXRwdXRzLlxuICAgICAqL1xuICAgIGdldCBvdXRwdXRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3V0cHV0cztcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIG1vZGVsLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vdXRwdXRzLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fb3V0cHV0cyA9IG51bGw7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VyaWFsaXplIHRoZSBtb2RlbCB0byBKU09OLlxuICAgICAqL1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IHN1cGVyLnRvSlNPTigpO1xuICAgICAgICBjZWxsLmV4ZWN1dGlvbl9jb3VudCA9IHRoaXMuZXhlY3V0aW9uQ291bnQgfHwgbnVsbDtcbiAgICAgICAgY2VsbC5vdXRwdXRzID0gdGhpcy5vdXRwdXRzLnRvSlNPTigpO1xuICAgICAgICBjZWxsLmlkID0gdGhpcy5pZDtcbiAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUgdHJ1c3RlZCBzdGF0ZS5cbiAgICAgKi9cbiAgICBvblRydXN0ZWRDaGFuZ2VkKHRydXN0ZWQsIGFyZ3MpIHtcbiAgICAgICAgaWYgKHRoaXMuX291dHB1dHMpIHtcbiAgICAgICAgICAgIHRoaXMuX291dHB1dHMudHJ1c3RlZCA9IGFyZ3MubmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICBuYW1lOiAndHJ1c3RlZCcsXG4gICAgICAgICAgICBvbGRWYWx1ZTogYXJncy5vbGRWYWx1ZSxcbiAgICAgICAgICAgIG5ld1ZhbHVlOiBhcmdzLm5ld1ZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIGNlbGwgb3V0cHV0cyBtb2RlbERCIGFuZCByZWZsZWN0IGl0IGluIHRoZSBzaGFyZWQgbW9kZWwuXG4gICAgICovXG4gICAgb25Nb2RlbERCT3V0cHV0c0NoYW5nZShzZW5kZXIsIGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGNvZGVDZWxsID0gdGhpcy5zaGFyZWRNb2RlbDtcbiAgICAgICAgZ2xvYmFsTW9kZWxEQk11dGV4KCgpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FkZCc6IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3V0cHV0cyA9IGV2ZW50Lm5ld1ZhbHVlcy5tYXAob3V0cHV0ID0+IG91dHB1dC50b0pTT04oKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvZGVDZWxsLnVwZGF0ZU91dHB1dHMoZXZlbnQubmV3SW5kZXgsIGV2ZW50Lm5ld0luZGV4ICsgb3V0cHV0cy5sZW5ndGgsIG91dHB1dHMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSAnc2V0Jzoge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdWYWx1ZXMgPSBldmVudC5uZXdWYWx1ZXMubWFwKG91dHB1dCA9PiBvdXRwdXQudG9KU09OKCkpO1xuICAgICAgICAgICAgICAgICAgICBjb2RlQ2VsbC51cGRhdGVPdXRwdXRzKGV2ZW50Lm9sZEluZGV4LCBldmVudC5vbGRJbmRleCArIG5ld1ZhbHVlcy5sZW5ndGgsIG5ld1ZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmUnOlxuICAgICAgICAgICAgICAgICAgICBjb2RlQ2VsbC51cGRhdGVPdXRwdXRzKGV2ZW50Lm9sZEluZGV4LCBldmVudC5vbGRWYWx1ZXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGV2ZW50IHR5cGU6ICR7ZXZlbnQudHlwZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUgY29kZSBjZWxsIHZhbHVlLlxuICAgICAqL1xuICAgIF9vblZhbHVlQ2hhbmdlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZXhlY3V0aW9uQ291bnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldERpcnR5KHRoaXMuX2V4ZWN1dGVkQ29kZSAhPT0gdGhpcy52YWx1ZS50ZXh0LnRyaW0oKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBvdXRwdXQgc2hhcmVkIG1vZGVsIGFuZCByZWZsZWN0IGl0IGluIG1vZGVsREIuXG4gICAgICogV2UgdXBkYXRlIHRoZSBtb2RlbGRiIG1ldGFkYXRhIHdoZW4gdGhlIG5iY2VsbCBjaGFuZ2VzLlxuICAgICAqXG4gICAgICogVGhpcyBtZXRob2Qgb3ZlcnJpZGVzIHRoZSBDZWxsTW9kZWwgcHJvdGVjdGVkIF9vblNoYXJlZE1vZGVsQ2hhbmdlZFxuICAgICAqIHNvIHdlIGZpcnN0IGNhbGwgc3VwZXIuX29uU2hhcmVkTW9kZWxDaGFuZ2VkXG4gICAgICpcbiAgICAgKiBAb3ZlcnJpZGUgQ2VsbE1vZGVsLl9vblNoYXJlZE1vZGVsQ2hhbmdlZFxuICAgICAqL1xuICAgIF9vblNoYXJlZE1vZGVsQ2hhbmdlZChzZW5kZXIsIGNoYW5nZSkge1xuICAgICAgICBzdXBlci5fb25TaGFyZWRNb2RlbENoYW5nZWQoc2VuZGVyLCBjaGFuZ2UpO1xuICAgICAgICBnbG9iYWxNb2RlbERCTXV0ZXgoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoYW5nZS5vdXRwdXRzQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckV4ZWN1dGlvbigpO1xuICAgICAgICAgICAgICAgIHNlbmRlci5nZXRPdXRwdXRzKCkuZm9yRWFjaChvdXRwdXQgPT4gdGhpcy5fb3V0cHV0cy5hZGQob3V0cHV0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hhbmdlLmV4ZWN1dGlvbkNvdW50Q2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjdXRpb25Db3VudCA9IGNoYW5nZS5leGVjdXRpb25Db3VudENoYW5nZS5uZXdWYWx1ZVxuICAgICAgICAgICAgICAgICAgICA/IGNoYW5nZS5leGVjdXRpb25Db3VudENoYW5nZS5uZXdWYWx1ZVxuICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIGV4ZWN1dGlvbiBjb3VudC5cbiAgICAgKi9cbiAgICBfb25FeGVjdXRpb25Db3VudENoYW5nZWQoY291bnQsIGFyZ3MpIHtcbiAgICAgICAgY29uc3QgY29kZUNlbGwgPSB0aGlzLnNoYXJlZE1vZGVsO1xuICAgICAgICBnbG9iYWxNb2RlbERCTXV0ZXgoKCkgPT4ge1xuICAgICAgICAgICAgY29kZUNlbGwuZXhlY3V0aW9uX2NvdW50ID0gYXJncy5uZXdWYWx1ZVxuICAgICAgICAgICAgICAgID8gYXJncy5uZXdWYWx1ZVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29udGVudENoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgIG5hbWU6ICdleGVjdXRpb25Db3VudCcsXG4gICAgICAgICAgICBvbGRWYWx1ZTogYXJncy5vbGRWYWx1ZSxcbiAgICAgICAgICAgIG5ld1ZhbHVlOiBhcmdzLm5ld1ZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYXJncy5uZXdWYWx1ZSAmJiB0aGlzLmlzRGlydHkpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldERpcnR5KGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogVGhlIG5hbWVzcGFjZSBmb3IgYENvZGVDZWxsTW9kZWxgIHN0YXRpY3MuXG4gKi9cbihmdW5jdGlvbiAoQ29kZUNlbGxNb2RlbCkge1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGFuIGBJQ29udGVudEZhY3RvcnlgLlxuICAgICAqL1xuICAgIGNsYXNzIENvbnRlbnRGYWN0b3J5IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhbiBvdXRwdXQgYXJlYS5cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZU91dHB1dEFyZWEob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBPdXRwdXRBcmVhTW9kZWwob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ29kZUNlbGxNb2RlbC5Db250ZW50RmFjdG9yeSA9IENvbnRlbnRGYWN0b3J5O1xuICAgIC8qKlxuICAgICAqIFRoZSBzaGFyZWQgYENvbnRlbnRGYWN0b3J5YCBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBDb2RlQ2VsbE1vZGVsLmRlZmF1bHRDb250ZW50RmFjdG9yeSA9IG5ldyBDb250ZW50RmFjdG9yeSgpO1xufSkoQ29kZUNlbGxNb2RlbCB8fCAoQ29kZUNlbGxNb2RlbCA9IHt9KSk7XG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIGZ1bmN0aW9uIGNvbGxhcHNlQ2hhbmdlZChtZXRhZGF0YSwgYXJncykge1xuICAgICAgICBpZiAoYXJncy5rZXkgPT09ICdjb2xsYXBzZWQnKSB7XG4gICAgICAgICAgICBjb25zdCBqdXB5dGVyID0gKG1ldGFkYXRhLmdldCgnanVweXRlcicpIHx8IHt9KTtcbiAgICAgICAgICAgIGNvbnN0IHsgb3V0cHV0c19oaWRkZW4gfSA9IGp1cHl0ZXIsIG5ld0p1cHl0ZXIgPSBfX3Jlc3QoanVweXRlciwgW1wib3V0cHV0c19oaWRkZW5cIl0pO1xuICAgICAgICAgICAgaWYgKG91dHB1dHNfaGlkZGVuICE9PSBhcmdzLm5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MubmV3VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdKdXB5dGVyWydvdXRwdXRzX2hpZGRlbiddID0gYXJncy5uZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKG5ld0p1cHl0ZXIpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YS5kZWxldGUoJ2p1cHl0ZXInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhLnNldCgnanVweXRlcicsIG5ld0p1cHl0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmdzLmtleSA9PT0gJ2p1cHl0ZXInKSB7XG4gICAgICAgICAgICBjb25zdCBqdXB5dGVyID0gKGFyZ3MubmV3VmFsdWUgfHwge30pO1xuICAgICAgICAgICAgaWYgKGp1cHl0ZXIuaGFzT3duUHJvcGVydHkoJ291dHB1dHNfaGlkZGVuJykpIHtcbiAgICAgICAgICAgICAgICBtZXRhZGF0YS5zZXQoJ2NvbGxhcHNlZCcsIGp1cHl0ZXIub3V0cHV0c19oaWRkZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEuZGVsZXRlKCdjb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBQcml2YXRlLmNvbGxhcHNlQ2hhbmdlZCA9IGNvbGxhcHNlQ2hhbmdlZDtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9kZWwuanMubWFwIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSZWFjdFdpZGdldCB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IGVsbGlwc2VzSWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuLyoqXG4gKiBUaGUgQ1NTIGNsYXNzIGFkZGVkIHRvIHBsYWNlaG9sZGVycy5cbiAqL1xuY29uc3QgUExBQ0VIT0xERVJfQ0xBU1MgPSAnanAtUGxhY2Vob2xkZXInO1xuLyoqXG4gKiBUaGUgQ1NTIGNsYXNzZXMgYWRkZWQgdG8gaW5wdXQgcGxhY2Vob2xkZXIgcHJvbXB0cy5cbiAqL1xuY29uc3QgSU5QVVRfUFJPTVBUX0NMQVNTID0gJ2pwLVBsYWNlaG9sZGVyLXByb21wdCBqcC1JbnB1dFByb21wdCc7XG4vKipcbiAqIFRoZSBDU1MgY2xhc3NlcyBhZGRlZCB0byBvdXRwdXQgcGxhY2Vob2xkZXIgcHJvbXB0cy5cbiAqL1xuY29uc3QgT1VUUFVUX1BST01QVF9DTEFTUyA9ICdqcC1QbGFjZWhvbGRlci1wcm9tcHQganAtT3V0cHV0UHJvbXB0Jztcbi8qKlxuICogVGhlIENTUyBjbGFzcyBhZGRlZCB0byBwbGFjZWhvbGRlciBjb250ZW50LlxuICovXG5jb25zdCBDT05URU5UX0NMQVNTID0gJ2pwLVBsYWNlaG9sZGVyLWNvbnRlbnQnO1xuLyoqXG4gKiBUaGUgQ1NTIGNsYXNzIGFkZGVkIHRvIGlucHV0IHBsYWNlaG9sZGVycy5cbiAqL1xuY29uc3QgSU5QVVRfUExBQ0VIT0xERVJfQ0xBU1MgPSAnanAtSW5wdXRQbGFjZWhvbGRlcic7XG4vKipcbiAqIFRoZSBDU1MgY2xhc3MgYWRkZWQgdG8gb3V0cHV0IHBsYWNlaG9sZGVycy5cbiAqL1xuY29uc3QgT1VUUFVUX1BMQUNFSE9MREVSX0NMQVNTID0gJ2pwLU91dHB1dFBsYWNlaG9sZGVyJztcbi8qKlxuICogQW4gYWJzdHJhY3QgYmFzZSBjbGFzcyBmb3IgcGxhY2Vob2xkZXJzXG4gKlxuICogIyMjIE5vdGVzXG4gKiBBIHBsYWNlaG9sZGVyIGlzIHRoZSBlbGVtZW50IHRoYXQgaXMgc2hvd24gd2hlbiBpbnB1dC9vdXRwdXRcbiAqIGlzIGhpZGRlbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFBsYWNlaG9sZGVyIGV4dGVuZHMgUmVhY3RXaWRnZXQge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBwbGFjZWhvbGRlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjYWxsYmFjaykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKFBMQUNFSE9MREVSX0NMQVNTKTtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBjbGljayBldmVudC5cbiAgICAgKi9cbiAgICBoYW5kbGVDbGljayhlKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgIGNhbGxiYWNrKGUpO1xuICAgIH1cbn1cbi8qKlxuICogVGhlIGlucHV0IHBsYWNlaG9sZGVyIGNsYXNzLlxuICovXG5leHBvcnQgY2xhc3MgSW5wdXRQbGFjZWhvbGRlciBleHRlbmRzIFBsYWNlaG9sZGVyIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgaW5wdXQgcGxhY2Vob2xkZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY2FsbGJhY2spIHtcbiAgICAgICAgc3VwZXIoY2FsbGJhY2spO1xuICAgICAgICB0aGlzLmFkZENsYXNzKElOUFVUX1BMQUNFSE9MREVSX0NMQVNTKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIHRoZSBpbnB1dCBwbGFjZWhvbGRlciB1c2luZyB0aGUgdmlydHVhbCBET00uXG4gICAgICovXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogSU5QVVRfUFJPTVBUX0NMQVNTLCBrZXk6IFwiaW5wdXRcIiB9KSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IENPTlRFTlRfQ0xBU1MsIG9uQ2xpY2s6IGUgPT4gdGhpcy5oYW5kbGVDbGljayhlKSwga2V5OiBcImNvbnRlbnRcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoZWxsaXBzZXNJY29uLnJlYWN0LCB7IGNsYXNzTmFtZTogXCJqcC1Nb3JlSG9yaXpJY29uXCIsIGVsZW1lbnRQb3NpdGlvbjogXCJjZW50ZXJcIiwgaGVpZ2h0OiBcImF1dG9cIiwgd2lkdGg6IFwiMzJweFwiIH0pKVxuICAgICAgICBdO1xuICAgIH1cbn1cbi8qKlxuICogVGhlIG91dHB1dCBwbGFjZWhvbGRlciBjbGFzcy5cbiAqL1xuZXhwb3J0IGNsYXNzIE91dHB1dFBsYWNlaG9sZGVyIGV4dGVuZHMgUGxhY2Vob2xkZXIge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBvdXRwdXQgcGxhY2Vob2xkZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY2FsbGJhY2spIHtcbiAgICAgICAgc3VwZXIoY2FsbGJhY2spO1xuICAgICAgICB0aGlzLmFkZENsYXNzKE9VVFBVVF9QTEFDRUhPTERFUl9DTEFTUyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlciB0aGUgb3V0cHV0IHBsYWNlaG9sZGVyIHVzaW5nIHRoZSB2aXJ0dWFsIERPTS5cbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBPVVRQVVRfUFJPTVBUX0NMQVNTLCBrZXk6IFwib3V0cHV0XCIgfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBDT05URU5UX0NMQVNTLCBvbkNsaWNrOiBlID0+IHRoaXMuaGFuZGxlQ2xpY2soZSksIGtleTogXCJjb250ZW50XCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KGVsbGlwc2VzSWNvbi5yZWFjdCwgeyBjbGFzc05hbWU6IFwianAtTW9yZUhvcml6SWNvblwiLCBlbGVtZW50UG9zaXRpb246IFwiY2VudGVyXCIsIGhlaWdodDogXCJhdXRvXCIsIHdpZHRoOiBcIjMycHhcIiB9KSlcbiAgICAgICAgXTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wbGFjZWhvbGRlci5qcy5tYXAiLCJpbXBvcnQgeyBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuY29uc3QgUkVTSVpFX0hBTkRMRV9DTEFTUyA9ICdqcC1DZWxsUmVzaXplSGFuZGxlJztcbmNvbnN0IENFTExfUkVTSVpFRF9DTEFTUyA9ICdqcC1tb2QtcmVzaXplZENlbGwnO1xuLyoqXG4gKiBBIGhhbmRsZSB0aGF0IGFsbG93cyB0byBjaGFuZ2UgaW5wdXQvb3V0cHV0IHByb3BvcnRpb25zIGluIHNpZGUtYnktc2lkZSBtb2RlLlxuICovXG5leHBvcnQgY2xhc3MgUmVzaXplSGFuZGxlIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXROb2RlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudGFyZ2V0Tm9kZSA9IHRhcmdldE5vZGU7XG4gICAgICAgIHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcHJvdGVjdGVkV2lkdGggPSAxMDtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhSRVNJWkVfSEFORExFX0NMQVNTKTtcbiAgICB9XG4gICAgb25BZnRlckF0dGFjaChtc2cpIHtcbiAgICAgICAgc3VwZXIub25BZnRlckF0dGFjaChtc2cpO1xuICAgICAgICB0aGlzLm5vZGUuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMpO1xuICAgIH1cbiAgICBvbkFmdGVyRGV0YWNoKG1zZykge1xuICAgICAgICBzdXBlci5vbkFmdGVyQXR0YWNoKG1zZyk7XG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgRE9NIGV2ZW50cyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudCAtIFRoZSBET00gZXZlbnQgc2VudCB0byB0aGUgd2lkZ2V0LlxuICAgICAqXG4gICAgICovXG4gICAgaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdkYmxjbGljayc6XG4gICAgICAgICAgICAgICAgKF9hID0gdGhpcy50YXJnZXROb2RlLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jaGlsZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZShDRUxMX1JFU0laRURfQ0xBU1MpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1qcC1zaWRlLWJ5LXNpZGUtcmVzaXplZC1jZWxsJywgJycpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlT2Zmc2V0ID1cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuY2xpZW50WCAtIHRoaXMubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS54O1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9iID0gdGhpcy50YXJnZXROb2RlLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jaGlsZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoQ0VMTF9SRVNJWkVEX0NMQVNTKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb3VzZW1vdmUnOiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0FjdGl2ZSB8fCAhdGhpcy5faXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFJlY3QgPSB0aGlzLnRhcmdldE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXRXaWR0aCA9IGV2ZW50LmNsaWVudFggLSB0YXJnZXRSZWN0LnggLSB0aGlzLl9tb3VzZU9mZnNldDtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNpemVkX3JhdGlvID0gMSAtXG4gICAgICAgICAgICAgICAgICAgIE1hdGgubWluKE1hdGgubWF4KGlucHV0V2lkdGgsIHRoaXMuX3Byb3RlY3RlZFdpZHRoKSwgdGFyZ2V0UmVjdC53aWR0aCAtIHRoaXMuX3Byb3RlY3RlZFdpZHRoKSAvXG4gICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0UmVjdC53aWR0aCAtIHRoaXMuX3Byb3RlY3RlZFdpZHRoKTtcbiAgICAgICAgICAgICAgICAvLyBBZGRlZCBmcmljdGlvbiB0byB0aGUgZHJhZ2dpbmcgaW50ZXJhY3Rpb25cbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5yb3VuZChyZXNpemVkX3JhdGlvICogMTAwKSAlIDEwID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWpwLXNpZGUtYnktc2lkZS1yZXNpemVkLWNlbGwnLCByZXNpemVkX3JhdGlvICsgJ2ZyJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnbW91c2V1cCc6XG4gICAgICAgICAgICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlc2l6ZUhhbmRsZS5qcy5tYXAiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IG1hcmtlZCB9IGZyb20gJ21hcmtlZCc7XG5pbXBvcnQgeyBBdHRhY2htZW50c1Jlc29sdmVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXR0YWNobWVudHMnO1xuaW1wb3J0IHsgQWN0aXZpdHlNb25pdG9yLCBVUkxFeHQgfSBmcm9tICdAanVweXRlcmxhYi9jb3JldXRpbHMnO1xuaW1wb3J0IHsgT3V0cHV0QXJlYSwgT3V0cHV0UHJvbXB0LCBTaW1wbGlmaWVkT3V0cHV0QXJlYSwgU3RkaW4gfSBmcm9tICdAanVweXRlcmxhYi9vdXRwdXRhcmVhJztcbmltcG9ydCB7IGltYWdlUmVuZGVyZXJGYWN0b3J5LCBNaW1lTW9kZWwgfSBmcm9tICdAanVweXRlcmxhYi9yZW5kZXJtaW1lJztcbmltcG9ydCB7IGFkZEljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IFByb21pc2VEZWxlZ2F0ZSwgVVVJRCB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbmltcG9ydCB7IGZpbHRlciwgc29tZSwgdG9BcnJheSB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCB7IERlYm91bmNlciB9IGZyb20gJ0BsdW1pbm8vcG9sbGluZyc7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG5pbXBvcnQgeyBQYW5lbCwgUGFuZWxMYXlvdXQsIFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgeyBJbnB1dENvbGxhcHNlciwgT3V0cHV0Q29sbGFwc2VyIH0gZnJvbSAnLi9jb2xsYXBzZXInO1xuaW1wb3J0IHsgQ2VsbEZvb3RlciwgQ2VsbEhlYWRlciB9IGZyb20gJy4vaGVhZGVyZm9vdGVyJztcbmltcG9ydCB7IElucHV0QXJlYSwgSW5wdXRQcm9tcHQgfSBmcm9tICcuL2lucHV0YXJlYSc7XG5pbXBvcnQgeyBJbnB1dFBsYWNlaG9sZGVyLCBPdXRwdXRQbGFjZWhvbGRlciB9IGZyb20gJy4vcGxhY2Vob2xkZXInO1xuaW1wb3J0IHsgUmVzaXplSGFuZGxlIH0gZnJvbSAnLi9yZXNpemVIYW5kbGUnO1xuLyoqXG4gKiBUaGUgQ1NTIGNsYXNzIGFkZGVkIHRvIGNlbGwgd2lkZ2V0cy5cbiAqL1xuY29uc3QgQ0VMTF9DTEFTUyA9ICdqcC1DZWxsJztcbi8qKlxuICogVGhlIENTUyBjbGFzcyBhZGRlZCB0byB0aGUgY2VsbCBoZWFkZXIuXG4gKi9cbmNvbnN0IENFTExfSEVBREVSX0NMQVNTID0gJ2pwLUNlbGwtaGVhZGVyJztcbi8qKlxuICogVGhlIENTUyBjbGFzcyBhZGRlZCB0byB0aGUgY2VsbCBmb290ZXIuXG4gKi9cbmNvbnN0IENFTExfRk9PVEVSX0NMQVNTID0gJ2pwLUNlbGwtZm9vdGVyJztcbi8qKlxuICogVGhlIENTUyBjbGFzcyBhZGRlZCB0byB0aGUgY2VsbCBpbnB1dCB3cmFwcGVyLlxuICovXG5jb25zdCBDRUxMX0lOUFVUX1dSQVBQRVJfQ0xBU1MgPSAnanAtQ2VsbC1pbnB1dFdyYXBwZXInO1xuLyoqXG4gKiBUaGUgQ1NTIGNsYXNzIGFkZGVkIHRvIHRoZSBjZWxsIG91dHB1dCB3cmFwcGVyLlxuICovXG5jb25zdCBDRUxMX09VVFBVVF9XUkFQUEVSX0NMQVNTID0gJ2pwLUNlbGwtb3V0cHV0V3JhcHBlcic7XG4vKipcbiAqIFRoZSBDU1MgY2xhc3MgYWRkZWQgdG8gdGhlIGNlbGwgaW5wdXQgYXJlYS5cbiAqL1xuY29uc3QgQ0VMTF9JTlBVVF9BUkVBX0NMQVNTID0gJ2pwLUNlbGwtaW5wdXRBcmVhJztcbi8qKlxuICogVGhlIENTUyBjbGFzcyBhZGRlZCB0byB0aGUgY2VsbCBvdXRwdXQgYXJlYS5cbiAqL1xuY29uc3QgQ0VMTF9PVVRQVVRfQVJFQV9DTEFTUyA9ICdqcC1DZWxsLW91dHB1dEFyZWEnO1xuLyoqXG4gKiBUaGUgQ1NTIGNsYXNzIGFkZGVkIHRvIHRoZSBjZWxsIGlucHV0IGNvbGxhcHNlci5cbiAqL1xuY29uc3QgQ0VMTF9JTlBVVF9DT0xMQVBTRVJfQ0xBU1MgPSAnanAtQ2VsbC1pbnB1dENvbGxhcHNlcic7XG4vKipcbiAqIFRoZSBDU1MgY2xhc3MgYWRkZWQgdG8gdGhlIGNlbGwgb3V0cHV0IGNvbGxhcHNlci5cbiAqL1xuY29uc3QgQ0VMTF9PVVRQVVRfQ09MTEFQU0VSX0NMQVNTID0gJ2pwLUNlbGwtb3V0cHV0Q29sbGFwc2VyJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIGNlbGwgd2hlbiByZWFkb25seS5cbiAqL1xuY29uc3QgUkVBRE9OTFlfQ0xBU1MgPSAnanAtbW9kLXJlYWRPbmx5Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIGNlbGwgd2hlbiBkaXJ0eS5cbiAqL1xuY29uc3QgRElSVFlfQ0xBU1MgPSAnanAtbW9kLWRpcnR5Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gY29kZSBjZWxscy5cbiAqL1xuY29uc3QgQ09ERV9DRUxMX0NMQVNTID0gJ2pwLUNvZGVDZWxsJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gbWFya2Rvd24gY2VsbHMuXG4gKi9cbmNvbnN0IE1BUktET1dOX0NFTExfQ0xBU1MgPSAnanAtTWFya2Rvd25DZWxsJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gcmVuZGVyZWQgbWFya2Rvd24gb3V0cHV0IHdpZGdldHMuXG4gKi9cbmNvbnN0IE1BUktET1dOX09VVFBVVF9DTEFTUyA9ICdqcC1NYXJrZG93bk91dHB1dCc7XG5leHBvcnQgY29uc3QgTUFSS0RPV05fSEVBRElOR19DT0xMQVBTRUQgPSAnanAtTWFya2Rvd25IZWFkaW5nQ29sbGFwc2VkJztcbmNvbnN0IEhFQURJTkdfQ09MTEFQU0VSX0NMQVNTID0gJ2pwLWNvbGxhcHNlSGVhZGluZ0J1dHRvbic7XG5jb25zdCBTSE9XX0hJRERFTl9DRUxMU19DTEFTUyA9ICdqcC1zaG93SGlkZGVuQ2VsbHNCdXR0b24nO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byByYXcgY2VsbHMuXG4gKi9cbmNvbnN0IFJBV19DRUxMX0NMQVNTID0gJ2pwLVJhd0NlbGwnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBhIHJlbmRlcmVkIGlucHV0IGFyZWEuXG4gKi9cbmNvbnN0IFJFTkRFUkVEX0NMQVNTID0gJ2pwLW1vZC1yZW5kZXJlZCc7XG5jb25zdCBOT19PVVRQVVRTX0NMQVNTID0gJ2pwLW1vZC1ub091dHB1dHMnO1xuLyoqXG4gKiBUaGUgdGV4dCBhcHBsaWVkIHRvIGFuIGVtcHR5IG1hcmtkb3duIGNlbGwuXG4gKi9cbmNvbnN0IERFRkFVTFRfTUFSS0RPV05fVEVYVCA9ICdUeXBlIE1hcmtkb3duIGFuZCBMYVRlWDogJCDOsV4yICQnO1xuLyoqXG4gKiBUaGUgdGltZW91dCB0byB3YWl0IGZvciBjaGFuZ2UgYWN0aXZpdHkgdG8gaGF2ZSBjZWFzZWQgYmVmb3JlIHJlbmRlcmluZy5cbiAqL1xuY29uc3QgUkVOREVSX1RJTUVPVVQgPSAxMDAwO1xuLyoqXG4gKiBUaGUgbWltZSB0eXBlIGZvciBhIHJpY2ggY29udGVudHMgZHJhZyBvYmplY3QuXG4gKi9cbmNvbnN0IENPTlRFTlRTX01JTUVfUklDSCA9ICdhcHBsaWNhdGlvbi94LWp1cHl0ZXItaWNvbnRlbnRzcmljaCc7XG4vKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogQ2VsbFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKlxuICogQSBiYXNlIGNlbGwgd2lkZ2V0LlxuICovXG5leHBvcnQgY2xhc3MgQ2VsbCBleHRlbmRzIFdpZGdldCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IGJhc2UgY2VsbCB3aWRnZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9kaXNwbGF5Q2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX3JlYWRPbmx5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lucHV0SGlkZGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3N5bmNDb2xsYXBzZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zeW5jRWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVzaXplRGVib3VuY2VyID0gbmV3IERlYm91bmNlcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5Q2hhbmdlZC5lbWl0KCk7XG4gICAgICAgIH0sIDApO1xuICAgICAgICB0aGlzLmFkZENsYXNzKENFTExfQ0xBU1MpO1xuICAgICAgICBjb25zdCBtb2RlbCA9ICh0aGlzLl9tb2RlbCA9IG9wdGlvbnMubW9kZWwpO1xuICAgICAgICBjb25zdCBjb250ZW50RmFjdG9yeSA9ICh0aGlzLmNvbnRlbnRGYWN0b3J5ID1cbiAgICAgICAgICAgIG9wdGlvbnMuY29udGVudEZhY3RvcnkgfHwgQ2VsbC5kZWZhdWx0Q29udGVudEZhY3RvcnkpO1xuICAgICAgICB0aGlzLmxheW91dCA9IG5ldyBQYW5lbExheW91dCgpO1xuICAgICAgICAvLyBIZWFkZXJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gY29udGVudEZhY3RvcnkuY3JlYXRlQ2VsbEhlYWRlcigpO1xuICAgICAgICBoZWFkZXIuYWRkQ2xhc3MoQ0VMTF9IRUFERVJfQ0xBU1MpO1xuICAgICAgICB0aGlzLmxheW91dC5hZGRXaWRnZXQoaGVhZGVyKTtcbiAgICAgICAgLy8gSW5wdXRcbiAgICAgICAgY29uc3QgaW5wdXRXcmFwcGVyID0gKHRoaXMuX2lucHV0V3JhcHBlciA9IG5ldyBQYW5lbCgpKTtcbiAgICAgICAgaW5wdXRXcmFwcGVyLmFkZENsYXNzKENFTExfSU5QVVRfV1JBUFBFUl9DTEFTUyk7XG4gICAgICAgIGNvbnN0IGlucHV0Q29sbGFwc2VyID0gbmV3IElucHV0Q29sbGFwc2VyKCk7XG4gICAgICAgIGlucHV0Q29sbGFwc2VyLmFkZENsYXNzKENFTExfSU5QVVRfQ09MTEFQU0VSX0NMQVNTKTtcbiAgICAgICAgY29uc3QgaW5wdXQgPSAodGhpcy5faW5wdXQgPSBuZXcgSW5wdXRBcmVhKHtcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgY29udGVudEZhY3RvcnksXG4gICAgICAgICAgICB1cGRhdGVPblNob3c6IG9wdGlvbnMudXBkYXRlRWRpdG9yT25TaG93LFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IG9wdGlvbnMucGxhY2Vob2xkZXJcbiAgICAgICAgfSkpO1xuICAgICAgICBpbnB1dC5hZGRDbGFzcyhDRUxMX0lOUFVUX0FSRUFfQ0xBU1MpO1xuICAgICAgICBpbnB1dFdyYXBwZXIuYWRkV2lkZ2V0KGlucHV0Q29sbGFwc2VyKTtcbiAgICAgICAgaW5wdXRXcmFwcGVyLmFkZFdpZGdldChpbnB1dCk7XG4gICAgICAgIHRoaXMubGF5b3V0LmFkZFdpZGdldChpbnB1dFdyYXBwZXIpO1xuICAgICAgICB0aGlzLl9pbnB1dFBsYWNlaG9sZGVyID0gbmV3IElucHV0UGxhY2Vob2xkZXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbnB1dEhpZGRlbiA9ICF0aGlzLmlucHV0SGlkZGVuO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gRm9vdGVyXG4gICAgICAgIGNvbnN0IGZvb3RlciA9IHRoaXMuY29udGVudEZhY3RvcnkuY3JlYXRlQ2VsbEZvb3RlcigpO1xuICAgICAgICBmb290ZXIuYWRkQ2xhc3MoQ0VMTF9GT09URVJfQ0xBU1MpO1xuICAgICAgICB0aGlzLmxheW91dC5hZGRXaWRnZXQoZm9vdGVyKTtcbiAgICAgICAgLy8gRWRpdG9yIHNldHRpbmdzXG4gICAgICAgIGlmIChvcHRpb25zLmVkaXRvckNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2V0T3B0aW9ucyhPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLmVkaXRvckNvbmZpZykpO1xuICAgICAgICB9XG4gICAgICAgIG1vZGVsLm1ldGFkYXRhLmNoYW5nZWQuY29ubmVjdCh0aGlzLm9uTWV0YWRhdGFDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB2aWV3IHN0YXRlIGZyb20gbW9kZWwuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogU2hvdWxkIGJlIGNhbGxlZCBhZnRlciBjb25zdHJ1Y3Rpb24uIEZvciBjb252ZW5pZW5jZSwgcmV0dXJucyB0aGlzLCBzbyBpdFxuICAgICAqIGNhbiBiZSBjaGFpbmVkIGluIHRoZSBjb25zdHJ1Y3Rpb24sIGxpa2UgYG5ldyBGb28oKS5pbml0aWFsaXplU3RhdGUoKTtgXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZVN0YXRlKCkge1xuICAgICAgICB0aGlzLmxvYWRDb2xsYXBzZVN0YXRlKCk7XG4gICAgICAgIHRoaXMubG9hZEVkaXRhYmxlU3RhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNpZ25hbCB0byBpbmRpY2F0ZSB0aGF0IHdpZGdldCBoYXMgY2hhbmdlZCB2aXNpYmx5IChpbiBzaXplLCBpbiB0eXBlLCBldGMpXG4gICAgICovXG4gICAgZ2V0IGRpc3BsYXlDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcGxheUNoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcHJvbXB0IG5vZGUgdXNlZCBieSB0aGUgY2VsbC5cbiAgICAgKi9cbiAgICBnZXQgcHJvbXB0Tm9kZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbnB1dEhpZGRlbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lucHV0LnByb21wdE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5wdXRQbGFjZWhvbGRlci5ub2RlXG4gICAgICAgICAgICAgICAgLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgQ29kZUVkaXRvcldyYXBwZXIgdXNlZCBieSB0aGUgY2VsbC5cbiAgICAgKi9cbiAgICBnZXQgZWRpdG9yV2lkZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXQuZWRpdG9yV2lkZ2V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIENvZGVFZGl0b3IgdXNlZCBieSB0aGUgY2VsbC5cbiAgICAgKi9cbiAgICBnZXQgZWRpdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXQuZWRpdG9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1vZGVsIHVzZWQgYnkgdGhlIGNlbGwuXG4gICAgICovXG4gICAgZ2V0IG1vZGVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaW5wdXQgYXJlYSBmb3IgdGhlIGNlbGwuXG4gICAgICovXG4gICAgZ2V0IGlucHV0QXJlYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lucHV0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgcmVhZCBvbmx5IHN0YXRlIG9mIHRoZSBjZWxsLlxuICAgICAqL1xuICAgIGdldCByZWFkT25seSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRPbmx5O1xuICAgIH1cbiAgICBzZXQgcmVhZE9ubHkodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLl9yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlYWRPbmx5ID0gdmFsdWU7XG4gICAgICAgIGlmICh0aGlzLnN5bmNFZGl0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zYXZlRWRpdGFibGVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhdmUgdmlldyBlZGl0YWJsZSBzdGF0ZSB0byBtb2RlbFxuICAgICAqL1xuICAgIHNhdmVFZGl0YWJsZVN0YXRlKCkge1xuICAgICAgICBjb25zdCB7IG1ldGFkYXRhIH0gPSB0aGlzLm1vZGVsO1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gbWV0YWRhdGEuZ2V0KCdlZGl0YWJsZScpO1xuICAgICAgICBpZiAoKHRoaXMucmVhZE9ubHkgJiYgY3VycmVudCA9PT0gZmFsc2UpIHx8XG4gICAgICAgICAgICAoIXRoaXMucmVhZE9ubHkgJiYgY3VycmVudCA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLm1ldGFkYXRhLnNldCgnZWRpdGFibGUnLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLm1ldGFkYXRhLmRlbGV0ZSgnZWRpdGFibGUnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb2FkIHZpZXcgZWRpdGFibGUgc3RhdGUgZnJvbSBtb2RlbC5cbiAgICAgKi9cbiAgICBsb2FkRWRpdGFibGVTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWFkT25seSA9IHRoaXMubW9kZWwubWV0YWRhdGEuZ2V0KCdlZGl0YWJsZScpID09PSBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgd2lkZ2V0IHJlbmRlcnMgZm9yIHRoZSBmaXJzdCB0aW1lLlxuICAgICAqL1xuICAgIGdldCByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHByb21wdCBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBzZXRQcm9tcHQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5faW5wdXQuc2V0UHJvbXB0KHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHZpZXcgc3RhdGUgb2YgaW5wdXQgYmVpbmcgaGlkZGVuLlxuICAgICAqL1xuICAgIGdldCBpbnB1dEhpZGRlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lucHV0SGlkZGVuO1xuICAgIH1cbiAgICBzZXQgaW5wdXRIaWRkZW4odmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lucHV0SGlkZGVuID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxheW91dCA9IHRoaXMuX2lucHV0V3JhcHBlci5sYXlvdXQ7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5faW5wdXQucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGxheW91dC5hZGRXaWRnZXQodGhpcy5faW5wdXRQbGFjZWhvbGRlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9pbnB1dFBsYWNlaG9sZGVyLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICBsYXlvdXQuYWRkV2lkZ2V0KHRoaXMuX2lucHV0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pbnB1dEhpZGRlbiA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5zeW5jQ29sbGFwc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZUNvbGxhcHNlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhbmRsZUlucHV0SGlkZGVuKHZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2F2ZSB2aWV3IGNvbGxhcHNlIHN0YXRlIHRvIG1vZGVsXG4gICAgICovXG4gICAgc2F2ZUNvbGxhcHNlU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IGp1cHl0ZXIgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm1vZGVsLm1ldGFkYXRhLmdldCgnanVweXRlcicpKTtcbiAgICAgICAgaWYgKCh0aGlzLmlucHV0SGlkZGVuICYmIGp1cHl0ZXIuc291cmNlX2hpZGRlbiA9PT0gdHJ1ZSkgfHxcbiAgICAgICAgICAgICghdGhpcy5pbnB1dEhpZGRlbiAmJiBqdXB5dGVyLnNvdXJjZV9oaWRkZW4gPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pbnB1dEhpZGRlbikge1xuICAgICAgICAgICAganVweXRlci5zb3VyY2VfaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBqdXB5dGVyLnNvdXJjZV9oaWRkZW47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGp1cHl0ZXIpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5tZXRhZGF0YS5kZWxldGUoJ2p1cHl0ZXInKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwubWV0YWRhdGEuc2V0KCdqdXB5dGVyJywganVweXRlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV2ZXJ0IHZpZXcgY29sbGFwc2Ugc3RhdGUgZnJvbSBtb2RlbC5cbiAgICAgKi9cbiAgICBsb2FkQ29sbGFwc2VTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QganVweXRlciA9IHRoaXMubW9kZWwubWV0YWRhdGEuZ2V0KCdqdXB5dGVyJykgfHwge307XG4gICAgICAgIHRoaXMuaW5wdXRIaWRkZW4gPSAhIWp1cHl0ZXIuc291cmNlX2hpZGRlbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBpbnB1dCBiZWluZyBoaWRkZW4uXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBpcyBjYWxsZWQgYnkgdGhlIGBpbnB1dEhpZGRlbmAgc2V0dGVyIHNvIHRoYXQgc3ViY2xhc3Nlc1xuICAgICAqIGNhbiBwZXJmb3JtIGFjdGlvbnMgdXBvbiB0aGUgaW5wdXQgYmVpbmcgaGlkZGVuIHdpdGhvdXQgYWNjZXNzaW5nXG4gICAgICogcHJpdmF0ZSBzdGF0ZS5cbiAgICAgKi9cbiAgICBoYW5kbGVJbnB1dEhpZGRlbih2YWx1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc3luYyB0aGUgY29sbGFwc2Ugc3RhdGUgdG8gdGhlIGNlbGwgbW9kZWwuXG4gICAgICovXG4gICAgZ2V0IHN5bmNDb2xsYXBzZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N5bmNDb2xsYXBzZTtcbiAgICB9XG4gICAgc2V0IHN5bmNDb2xsYXBzZSh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5fc3luY0NvbGxhcHNlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N5bmNDb2xsYXBzZSA9IHZhbHVlO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZENvbGxhcHNlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHN5bmMgdGhlIGVkaXRhYmxlIHN0YXRlIHRvIHRoZSBjZWxsIG1vZGVsLlxuICAgICAqL1xuICAgIGdldCBzeW5jRWRpdGFibGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zeW5jRWRpdGFibGU7XG4gICAgfVxuICAgIHNldCBzeW5jRWRpdGFibGUodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3N5bmNFZGl0YWJsZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zeW5jRWRpdGFibGUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRFZGl0YWJsZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvbmUgdGhlIGNlbGwsIHVzaW5nIHRoZSBzYW1lIG1vZGVsLlxuICAgICAqL1xuICAgIGNsb25lKCkge1xuICAgICAgICBjb25zdCBjb25zdHJ1Y3RvciA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgICAgIHJldHVybiBuZXcgY29uc3RydWN0b3Ioe1xuICAgICAgICAgICAgbW9kZWw6IHRoaXMubW9kZWwsXG4gICAgICAgICAgICBjb250ZW50RmFjdG9yeTogdGhpcy5jb250ZW50RmFjdG9yeSxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGFscmVhZHkgZGlzcG9zZWQuXG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pbnB1dCA9IG51bGw7XG4gICAgICAgIHRoaXMuX21vZGVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5faW5wdXRXcmFwcGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5faW5wdXRQbGFjZWhvbGRlciA9IG51bGw7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGBhZnRlci1hdHRhY2hgIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIG9uQWZ0ZXJBdHRhY2gobXNnKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgJ2FjdGl2YXRlLXJlcXVlc3QnYCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBvbkFjdGl2YXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGBmaXQtcmVxdWVzdGAgbWVzc2FnZXMuXG4gICAgICovXG4gICAgb25GaXRSZXF1ZXN0KG1zZykge1xuICAgICAgICAvLyBuZWVkIHRoaXMgZm9yIGZvciB3aGVuIGEgdGhlbWUgY2hhbmdlcyBmb250IHNpemVcbiAgICAgICAgdGhpcy5lZGl0b3IucmVmcmVzaCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYHJlc2l6ZWAgbWVzc2FnZXMuXG4gICAgICovXG4gICAgb25SZXNpemUobXNnKSB7XG4gICAgICAgIHZvaWQgdGhpcy5fcmVzaXplRGVib3VuY2VyLmludm9rZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYHVwZGF0ZS1yZXF1ZXN0YCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBvblVwZGF0ZVJlcXVlc3QobXNnKSB7XG4gICAgICAgIGlmICghdGhpcy5fbW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBIYW5kbGUgcmVhZCBvbmx5IHN0YXRlLlxuICAgICAgICBpZiAodGhpcy5lZGl0b3IuZ2V0T3B0aW9uKCdyZWFkT25seScpICE9PSB0aGlzLl9yZWFkT25seSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2V0T3B0aW9uKCdyZWFkT25seScsIHRoaXMuX3JlYWRPbmx5KTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQ2xhc3MoUkVBRE9OTFlfQ0xBU1MsIHRoaXMuX3JlYWRPbmx5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2hhbmdlcyBpbiB0aGUgbWV0YWRhdGEuXG4gICAgICovXG4gICAgb25NZXRhZGF0YUNoYW5nZWQobW9kZWwsIGFyZ3MpIHtcbiAgICAgICAgc3dpdGNoIChhcmdzLmtleSkge1xuICAgICAgICAgICAgY2FzZSAnanVweXRlcic6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3luY0NvbGxhcHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZENvbGxhcHNlU3RhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdlZGl0YWJsZSc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3luY0VkaXRhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEVkaXRhYmxlU3RhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBUaGUgbmFtZXNwYWNlIGZvciB0aGUgYENlbGxgIGNsYXNzIHN0YXRpY3MuXG4gKi9cbihmdW5jdGlvbiAoQ2VsbCkge1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGFuIGBJQ29udGVudEZhY3RvcnlgLlxuICAgICAqXG4gICAgICogVGhpcyBpbmNsdWRlcyBhIENvZGVNaXJyb3IgZWRpdG9yIGZhY3RvcnkgdG8gbWFrZSBpdCBlYXN5IHRvIHVzZSBvdXQgb2YgdGhlIGJveC5cbiAgICAgKi9cbiAgICBjbGFzcyBDb250ZW50RmFjdG9yeSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgYSBjb250ZW50IGZhY3RvcnkgZm9yIGEgY2VsbC5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAgICAgdGhpcy5fZWRpdG9yRmFjdG9yeSA9XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5lZGl0b3JGYWN0b3J5IHx8IElucHV0QXJlYS5kZWZhdWx0RWRpdG9yRmFjdG9yeTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHJlYWRvbmx5IGVkaXRvciBmYWN0b3J5IHRoYXQgY3JlYXRlIGNvZGUgZWRpdG9yc1xuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IGVkaXRvckZhY3RvcnkoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yRmFjdG9yeTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgbmV3IGNlbGwgaGVhZGVyIGZvciB0aGUgcGFyZW50IHdpZGdldC5cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZUNlbGxIZWFkZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENlbGxIZWFkZXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgbmV3IGNlbGwgaGVhZGVyIGZvciB0aGUgcGFyZW50IHdpZGdldC5cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZUNlbGxGb290ZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENlbGxGb290ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGFuIGlucHV0IHByb21wdC5cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZUlucHV0UHJvbXB0KCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnB1dFByb21wdCgpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgdGhlIG91dHB1dCBwcm9tcHQgZm9yIHRoZSB3aWRnZXQuXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVPdXRwdXRQcm9tcHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE91dHB1dFByb21wdCgpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgYW4gc3RkaW4gd2lkZ2V0LlxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlU3RkaW4ob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTdGRpbihvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBDZWxsLkNvbnRlbnRGYWN0b3J5ID0gQ29udGVudEZhY3Rvcnk7XG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgY29udGVudCBmYWN0b3J5IGZvciBjZWxscy5cbiAgICAgKi9cbiAgICBDZWxsLmRlZmF1bHRDb250ZW50RmFjdG9yeSA9IG5ldyBDb250ZW50RmFjdG9yeSgpO1xufSkoQ2VsbCB8fCAoQ2VsbCA9IHt9KSk7XG4vKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogQ29kZUNlbGxcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKipcbiAqIEEgd2lkZ2V0IGZvciBhIGNvZGUgY2VsbC5cbiAqL1xuZXhwb3J0IGNsYXNzIENvZGVDZWxsIGV4dGVuZHMgQ2VsbCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgY29kZSBjZWxsIHdpZGdldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9vdXRwdXRIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc3luY1Njcm9sbGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3NhdmluZ01ldGFkYXRhID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoQ09ERV9DRUxMX0NMQVNTKTtcbiAgICAgICAgLy8gT25seSBzYXZlIG9wdGlvbnMgbm90IGhhbmRsZWQgYnkgcGFyZW50IGNvbnN0cnVjdG9yLlxuICAgICAgICBjb25zdCByZW5kZXJtaW1lID0gKHRoaXMuX3JlbmRlcm1pbWUgPSBvcHRpb25zLnJlbmRlcm1pbWUpO1xuICAgICAgICBjb25zdCBjb250ZW50RmFjdG9yeSA9IHRoaXMuY29udGVudEZhY3Rvcnk7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbDtcbiAgICAgICAgaWYgKCFvcHRpb25zLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAvLyBJbnNlcnQgdGhlIG91dHB1dCBiZWZvcmUgdGhlIGNlbGwgZm9vdGVyLlxuICAgICAgICAgICAgY29uc3Qgb3V0cHV0V3JhcHBlciA9ICh0aGlzLl9vdXRwdXRXcmFwcGVyID0gbmV3IFBhbmVsKCkpO1xuICAgICAgICAgICAgb3V0cHV0V3JhcHBlci5hZGRDbGFzcyhDRUxMX09VVFBVVF9XUkFQUEVSX0NMQVNTKTtcbiAgICAgICAgICAgIGNvbnN0IG91dHB1dENvbGxhcHNlciA9IG5ldyBPdXRwdXRDb2xsYXBzZXIoKTtcbiAgICAgICAgICAgIG91dHB1dENvbGxhcHNlci5hZGRDbGFzcyhDRUxMX09VVFBVVF9DT0xMQVBTRVJfQ0xBU1MpO1xuICAgICAgICAgICAgY29uc3Qgb3V0cHV0ID0gKHRoaXMuX291dHB1dCA9IG5ldyBPdXRwdXRBcmVhKHtcbiAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWwub3V0cHV0cyxcbiAgICAgICAgICAgICAgICByZW5kZXJtaW1lLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRGYWN0b3J5OiBjb250ZW50RmFjdG9yeSxcbiAgICAgICAgICAgICAgICBtYXhOdW1iZXJPdXRwdXRzOiBvcHRpb25zLm1heE51bWJlck91dHB1dHNcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIG91dHB1dC5hZGRDbGFzcyhDRUxMX09VVFBVVF9BUkVBX0NMQVNTKTtcbiAgICAgICAgICAgIC8vIFNldCBhIENTUyBpZiB0aGVyZSBhcmUgbm8gb3V0cHV0cywgYW5kIGNvbm5lY3QgYSBzaWduYWwgZm9yIGZ1dHVyZVxuICAgICAgICAgICAgLy8gY2hhbmdlcyB0byB0aGUgbnVtYmVyIG9mIG91dHB1dHMuIFRoaXMgaXMgZm9yIGNvbmRpdGlvbmFsIHN0eWxpbmdcbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBvdXRwdXRzLlxuICAgICAgICAgICAgaWYgKG1vZGVsLm91dHB1dHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzcyhOT19PVVRQVVRTX0NMQVNTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dHB1dC5vdXRwdXRMZW5ndGhDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb3V0cHV0TGVuZ3RoSGFuZGxlciwgdGhpcyk7XG4gICAgICAgICAgICBvdXRwdXRXcmFwcGVyLmFkZFdpZGdldChvdXRwdXRDb2xsYXBzZXIpO1xuICAgICAgICAgICAgb3V0cHV0V3JhcHBlci5hZGRXaWRnZXQob3V0cHV0KTtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Lmluc2VydFdpZGdldCgyLCBuZXcgUmVzaXplSGFuZGxlKHRoaXMubm9kZSkpO1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQuaW5zZXJ0V2lkZ2V0KDMsIG91dHB1dFdyYXBwZXIpO1xuICAgICAgICAgICAgaWYgKG1vZGVsLmlzRGlydHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENsYXNzKERJUlRZX0NMQVNTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX291dHB1dFBsYWNlaG9sZGVyID0gbmV3IE91dHB1dFBsYWNlaG9sZGVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm91dHB1dEhpZGRlbiA9ICF0aGlzLm91dHB1dEhpZGRlbjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIG1vZGVsLnN0YXRlQ2hhbmdlZC5jb25uZWN0KHRoaXMub25TdGF0ZUNoYW5nZWQsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHZpZXcgc3RhdGUgZnJvbSBtb2RlbC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBTaG91bGQgYmUgY2FsbGVkIGFmdGVyIGNvbnN0cnVjdGlvbi4gRm9yIGNvbnZlbmllbmNlLCByZXR1cm5zIHRoaXMsIHNvIGl0XG4gICAgICogY2FuIGJlIGNoYWluZWQgaW4gdGhlIGNvbnN0cnVjdGlvbiwgbGlrZSBgbmV3IEZvbygpLmluaXRpYWxpemVTdGF0ZSgpO2BcbiAgICAgKi9cbiAgICBpbml0aWFsaXplU3RhdGUoKSB7XG4gICAgICAgIHN1cGVyLmluaXRpYWxpemVTdGF0ZSgpO1xuICAgICAgICB0aGlzLmxvYWRTY3JvbGxlZFN0YXRlKCk7XG4gICAgICAgIHRoaXMuc2V0UHJvbXB0KGAke3RoaXMubW9kZWwuZXhlY3V0aW9uQ291bnQgfHwgJyd9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG91dHB1dCBhcmVhIGZvciB0aGUgY2VsbC5cbiAgICAgKi9cbiAgICBnZXQgb3V0cHV0QXJlYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX291dHB1dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHZpZXcgc3RhdGUgb2Ygb3V0cHV0IGJlaW5nIGNvbGxhcHNlZC5cbiAgICAgKi9cbiAgICBnZXQgb3V0cHV0SGlkZGVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3V0cHV0SGlkZGVuO1xuICAgIH1cbiAgICBzZXQgb3V0cHV0SGlkZGVuKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLl9vdXRwdXRIaWRkZW4gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGF5b3V0ID0gdGhpcy5fb3V0cHV0V3JhcHBlci5sYXlvdXQ7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGF5b3V0LnJlbW92ZVdpZGdldCh0aGlzLl9vdXRwdXQpO1xuICAgICAgICAgICAgbGF5b3V0LmFkZFdpZGdldCh0aGlzLl9vdXRwdXRQbGFjZWhvbGRlcik7XG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dEhpZGRlbiAmJiAhdGhpcy5fb3V0cHV0V3JhcHBlci5pc0hpZGRlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX291dHB1dFdyYXBwZXIuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuX291dHB1dFdyYXBwZXIuaXNIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vdXRwdXRXcmFwcGVyLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxheW91dC5yZW1vdmVXaWRnZXQodGhpcy5fb3V0cHV0UGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgbGF5b3V0LmFkZFdpZGdldCh0aGlzLl9vdXRwdXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX291dHB1dEhpZGRlbiA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5zeW5jQ29sbGFwc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZUNvbGxhcHNlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYXZlIHZpZXcgY29sbGFwc2Ugc3RhdGUgdG8gbW9kZWxcbiAgICAgKi9cbiAgICBzYXZlQ29sbGFwc2VTdGF0ZSgpIHtcbiAgICAgICAgLy8gQmVjYXVzZSBjb2xsYXBzZSBzdGF0ZSBmb3IgYSBjb2RlIGNlbGwgaW52b2x2ZXMgdHdvIGRpZmZlcmVudCBwaWVjZXMgb2ZcbiAgICAgICAgLy8gbWV0YWRhdGEgKHRoZSBgY29sbGFwc2VkYCBhbmQgYGp1cHl0ZXJgIG1ldGFkYXRhIGtleXMpLCB3ZSBibG9jayByZWFjdGluZ1xuICAgICAgICAvLyB0byBjaGFuZ2VzIGluIG1ldGFkYXRhIHVudGlsIHdlIGhhdmUgZnVsbHkgY29tbWl0dGVkIG91ciBjaGFuZ2VzLlxuICAgICAgICAvLyBPdGhlcndpc2Ugc2V0dGluZyBvbmUga2V5IGNhbiB0cmlnZ2VyIGEgd3JpdGUgdG8gdGhlIG90aGVyIGtleSB0b1xuICAgICAgICAvLyBtYWludGFpbiB0aGUgc3luY2VkIGNvbnNpc3RlbmN5LlxuICAgICAgICB0aGlzLl9zYXZpbmdNZXRhZGF0YSA9IHRydWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdXBlci5zYXZlQ29sbGFwc2VTdGF0ZSgpO1xuICAgICAgICAgICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzLm1vZGVsLm1ldGFkYXRhO1xuICAgICAgICAgICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5tb2RlbC5tZXRhZGF0YS5nZXQoJ2NvbGxhcHNlZCcpO1xuICAgICAgICAgICAgaWYgKCh0aGlzLm91dHB1dEhpZGRlbiAmJiBjb2xsYXBzZWQgPT09IHRydWUpIHx8XG4gICAgICAgICAgICAgICAgKCF0aGlzLm91dHB1dEhpZGRlbiAmJiBjb2xsYXBzZWQgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEbyBub3Qgc2V0IGp1cHl0ZXIub3V0cHV0c19oaWRkZW4gc2luY2UgaXQgaXMgcmVkdW5kYW50LiBTZWVcbiAgICAgICAgICAgIC8vIGFuZCBodHRwczovL2dpdGh1Yi5jb20vanVweXRlci9uYmZvcm1hdC9pc3N1ZXMvMTM3XG4gICAgICAgICAgICBpZiAodGhpcy5vdXRwdXRIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICBtZXRhZGF0YS5zZXQoJ2NvbGxhcHNlZCcsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEuZGVsZXRlKCdjb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuX3NhdmluZ01ldGFkYXRhID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV2ZXJ0IHZpZXcgY29sbGFwc2Ugc3RhdGUgZnJvbSBtb2RlbC5cbiAgICAgKlxuICAgICAqIFdlIGNvbnNpZGVyIHRoZSBgY29sbGFwc2VkYCBtZXRhZGF0YSBrZXkgYXMgdGhlIHNvdXJjZSBvZiB0cnV0aCBmb3Igb3V0cHV0c1xuICAgICAqIGJlaW5nIGhpZGRlbi5cbiAgICAgKi9cbiAgICBsb2FkQ29sbGFwc2VTdGF0ZSgpIHtcbiAgICAgICAgc3VwZXIubG9hZENvbGxhcHNlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5vdXRwdXRIaWRkZW4gPSAhIXRoaXMubW9kZWwubWV0YWRhdGEuZ2V0KCdjb2xsYXBzZWQnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgb3V0cHV0IGlzIGluIGEgc2Nyb2xsZWQgc3RhdGU/XG4gICAgICovXG4gICAgZ2V0IG91dHB1dHNTY3JvbGxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX291dHB1dHNTY3JvbGxlZDtcbiAgICB9XG4gICAgc2V0IG91dHB1dHNTY3JvbGxlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnRvZ2dsZUNsYXNzKCdqcC1tb2Qtb3V0cHV0c1Njcm9sbGVkJywgdmFsdWUpO1xuICAgICAgICB0aGlzLl9vdXRwdXRzU2Nyb2xsZWQgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuc3luY1Njcm9sbGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVTY3JvbGxlZFN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2F2ZSB2aWV3IGNvbGxhcHNlIHN0YXRlIHRvIG1vZGVsXG4gICAgICovXG4gICAgc2F2ZVNjcm9sbGVkU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgbWV0YWRhdGEgfSA9IHRoaXMubW9kZWw7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBtZXRhZGF0YS5nZXQoJ3Njcm9sbGVkJyk7XG4gICAgICAgIGlmICgodGhpcy5vdXRwdXRzU2Nyb2xsZWQgJiYgY3VycmVudCA9PT0gdHJ1ZSkgfHxcbiAgICAgICAgICAgICghdGhpcy5vdXRwdXRzU2Nyb2xsZWQgJiYgY3VycmVudCA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm91dHB1dHNTY3JvbGxlZCkge1xuICAgICAgICAgICAgbWV0YWRhdGEuc2V0KCdzY3JvbGxlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbWV0YWRhdGEuZGVsZXRlKCdzY3JvbGxlZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldmVydCB2aWV3IGNvbGxhcHNlIHN0YXRlIGZyb20gbW9kZWwuXG4gICAgICovXG4gICAgbG9hZFNjcm9sbGVkU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gdGhpcy5tb2RlbC5tZXRhZGF0YTtcbiAgICAgICAgLy8gV2UgZG9uJ3QgaGF2ZSB0aGUgbm90aW9uIG9mICdhdXRvJyBzY3JvbGxlZCwgc28gd2UgbWFrZSBpdCBmYWxzZS5cbiAgICAgICAgaWYgKG1ldGFkYXRhLmdldCgnc2Nyb2xsZWQnKSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICB0aGlzLm91dHB1dHNTY3JvbGxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vdXRwdXRzU2Nyb2xsZWQgPSAhIW1ldGFkYXRhLmdldCgnc2Nyb2xsZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHN5bmMgdGhlIHNjcm9sbGVkIHN0YXRlIHRvIHRoZSBjZWxsIG1vZGVsLlxuICAgICAqL1xuICAgIGdldCBzeW5jU2Nyb2xsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zeW5jU2Nyb2xsZWQ7XG4gICAgfVxuICAgIHNldCBzeW5jU2Nyb2xsZWQodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3N5bmNTY3JvbGxlZCA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zeW5jU2Nyb2xsZWQgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRTY3JvbGxlZFN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBpbnB1dCBiZWluZyBoaWRkZW4uXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IHRoZSBjYXNlIGNlbGwgaW1wbGVtZW50YXRpb24gYW5kIGlzXG4gICAgICogc3ViY2xhc3NlcyBoZXJlIHNvIHRoZSBjb2RlIGNlbGwgY2FuIHdhdGNoIHRvIHNlZSB3aGVuIGlucHV0XG4gICAgICogaXMgaGlkZGVuIHdpdGhvdXQgYWNjZXNzaW5nIHByaXZhdGUgc3RhdGUuXG4gICAgICovXG4gICAgaGFuZGxlSW5wdXRIaWRkZW4odmFsdWUpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSAmJiB0aGlzLl9vdXRwdXRXcmFwcGVyLmlzSGlkZGVuKSB7XG4gICAgICAgICAgICB0aGlzLl9vdXRwdXRXcmFwcGVyLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSAmJiAhdGhpcy5fb3V0cHV0V3JhcHBlci5pc0hpZGRlbiAmJiB0aGlzLl9vdXRwdXRIaWRkZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX291dHB1dFdyYXBwZXIuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb25lIHRoZSBjZWxsLCB1c2luZyB0aGUgc2FtZSBtb2RlbC5cbiAgICAgKi9cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgY29uc3QgY29uc3RydWN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKHtcbiAgICAgICAgICAgIG1vZGVsOiB0aGlzLm1vZGVsLFxuICAgICAgICAgICAgY29udGVudEZhY3Rvcnk6IHRoaXMuY29udGVudEZhY3RvcnksXG4gICAgICAgICAgICByZW5kZXJtaW1lOiB0aGlzLl9yZW5kZXJtaW1lLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9uZSB0aGUgT3V0cHV0QXJlYSBhbG9uZSwgcmV0dXJuaW5nIGEgc2ltcGxpZmllZCBvdXRwdXQgYXJlYSwgdXNpbmcgdGhlIHNhbWUgbW9kZWwuXG4gICAgICovXG4gICAgY2xvbmVPdXRwdXRBcmVhKCkge1xuICAgICAgICByZXR1cm4gbmV3IFNpbXBsaWZpZWRPdXRwdXRBcmVhKHtcbiAgICAgICAgICAgIG1vZGVsOiB0aGlzLm1vZGVsLm91dHB1dHMsXG4gICAgICAgICAgICBjb250ZW50RmFjdG9yeTogdGhpcy5jb250ZW50RmFjdG9yeSxcbiAgICAgICAgICAgIHJlbmRlcm1pbWU6IHRoaXMuX3JlbmRlcm1pbWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX291dHB1dC5vdXRwdXRMZW5ndGhDaGFuZ2VkLmRpc2Nvbm5lY3QodGhpcy5fb3V0cHV0TGVuZ3RoSGFuZGxlciwgdGhpcyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcm1pbWUgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXRXcmFwcGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3V0cHV0UGxhY2Vob2xkZXIgPSBudWxsO1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBjaGFuZ2VzIGluIHRoZSBtb2RlbC5cbiAgICAgKi9cbiAgICBvblN0YXRlQ2hhbmdlZChtb2RlbCwgYXJncykge1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnZXhlY3V0aW9uQ291bnQnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJvbXB0KGAke21vZGVsLmV4ZWN1dGlvbkNvdW50IHx8ICcnfWApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaXNEaXJ0eSc6XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsLmlzRGlydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzcyhESVJUWV9DTEFTUyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKERJUlRZX0NMQVNTKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBjaGFuZ2VzIGluIHRoZSBtZXRhZGF0YS5cbiAgICAgKi9cbiAgICBvbk1ldGFkYXRhQ2hhbmdlZChtb2RlbCwgYXJncykge1xuICAgICAgICBpZiAodGhpcy5fc2F2aW5nTWV0YWRhdGEpIHtcbiAgICAgICAgICAgIC8vIFdlIGFyZSBpbiBtaWRkbGUgb2YgYSBtZXRhZGF0YSB0cmFuc2FjdGlvbiwgc28gZG9uJ3QgcmVhY3QgdG8gaXQuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChhcmdzLmtleSkge1xuICAgICAgICAgICAgY2FzZSAnc2Nyb2xsZWQnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN5bmNTY3JvbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRTY3JvbGxlZFN0YXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY29sbGFwc2VkJzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zeW5jQ29sbGFwc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkQ29sbGFwc2VTdGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIub25NZXRhZGF0YUNoYW5nZWQobW9kZWwsIGFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2hhbmdlcyBpbiB0aGUgbnVtYmVyIG9mIG91dHB1dHMgaW4gdGhlIG91dHB1dCBhcmVhLlxuICAgICAqL1xuICAgIF9vdXRwdXRMZW5ndGhIYW5kbGVyKHNlbmRlciwgYXJncykge1xuICAgICAgICBjb25zdCBmb3JjZSA9IGFyZ3MgPT09IDAgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHRoaXMudG9nZ2xlQ2xhc3MoTk9fT1VUUFVUU19DTEFTUywgZm9yY2UpO1xuICAgIH1cbn1cbi8qKlxuICogVGhlIG5hbWVzcGFjZSBmb3IgdGhlIGBDb2RlQ2VsbGAgY2xhc3Mgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChDb2RlQ2VsbCkge1xuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYSBjZWxsIGdpdmVuIGEgY2xpZW50IHNlc3Npb24uXG4gICAgICovXG4gICAgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZShjZWxsLCBzZXNzaW9uQ29udGV4dCwgbWV0YWRhdGEpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBtb2RlbCA9IGNlbGwubW9kZWw7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBtb2RlbC52YWx1ZS50ZXh0O1xuICAgICAgICBpZiAoIWNvZGUudHJpbSgpIHx8ICEoKF9hID0gc2Vzc2lvbkNvbnRleHQuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmtlcm5lbCkpIHtcbiAgICAgICAgICAgIG1vZGVsLmNsZWFyRXhlY3V0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2VsbElkID0geyBjZWxsSWQ6IG1vZGVsLmlkIH07XG4gICAgICAgIG1ldGFkYXRhID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsLm1ldGFkYXRhLnRvSlNPTigpKSwgbWV0YWRhdGEpLCBjZWxsSWQpO1xuICAgICAgICBjb25zdCB7IHJlY29yZFRpbWluZyB9ID0gbWV0YWRhdGE7XG4gICAgICAgIG1vZGVsLmNsZWFyRXhlY3V0aW9uKCk7XG4gICAgICAgIGNlbGwub3V0cHV0SGlkZGVuID0gZmFsc2U7XG4gICAgICAgIGNlbGwuc2V0UHJvbXB0KCcqJyk7XG4gICAgICAgIG1vZGVsLnRydXN0ZWQgPSB0cnVlO1xuICAgICAgICBsZXQgZnV0dXJlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgbXNnUHJvbWlzZSA9IE91dHB1dEFyZWEuZXhlY3V0ZShjb2RlLCBjZWxsLm91dHB1dEFyZWEsIHNlc3Npb25Db250ZXh0LCBtZXRhZGF0YSk7XG4gICAgICAgICAgICAvLyBjZWxsLm91dHB1dEFyZWEuZnV0dXJlIGFzc2lnbmVkIHN5bmNocm9ub3VzbHkgaW4gYGV4ZWN1dGVgXG4gICAgICAgICAgICBpZiAocmVjb3JkVGltaW5nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVjb3JkVGltaW5nSG9vayA9IChtc2cpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhYmVsO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG1zZy5oZWFkZXIubXNnX3R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXR1cyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSBgc3RhdHVzLiR7bXNnLmNvbnRlbnQuZXhlY3V0aW9uX3N0YXRlfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdleGVjdXRlX2lucHV0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9ICdleGVjdXRlX2lucHV0JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGRhdGEgaXMgbWlzc2luZywgZXN0aW1hdGUgaXQgdG8gbm93XG4gICAgICAgICAgICAgICAgICAgIC8vIERhdGUgd2FzIGFkZGVkIGluIDUuMTogaHR0cHM6Ly9qdXB5dGVyLWNsaWVudC5yZWFkdGhlZG9jcy5pby9lbi9zdGFibGUvbWVzc2FnaW5nLmh0bWwjbWVzc2FnZS1oZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBtc2cuaGVhZGVyLmRhdGUgfHwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1pbmdJbmZvID0gT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwubWV0YWRhdGEuZ2V0KCdleGVjdXRpb24nKSk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWluZ0luZm9bYGlvcHViLiR7bGFiZWx9YF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubWV0YWRhdGEuc2V0KCdleGVjdXRpb24nLCB0aW1pbmdJbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjZWxsLm91dHB1dEFyZWEuZnV0dXJlLnJlZ2lzdGVyTWVzc2FnZUhvb2socmVjb3JkVGltaW5nSG9vayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb2RlbC5tZXRhZGF0YS5kZWxldGUoJ2V4ZWN1dGlvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2F2ZSB0aGlzIGV4ZWN1dGlvbidzIGZ1dHVyZSBzbyB3ZSBjYW4gY29tcGFyZSBpbiB0aGUgY2F0Y2ggYmVsb3cuXG4gICAgICAgICAgICBmdXR1cmUgPSBjZWxsLm91dHB1dEFyZWEuZnV0dXJlO1xuICAgICAgICAgICAgY29uc3QgbXNnID0gKGF3YWl0IG1zZ1Byb21pc2UpO1xuICAgICAgICAgICAgbW9kZWwuZXhlY3V0aW9uQ291bnQgPSBtc2cuY29udGVudC5leGVjdXRpb25fY291bnQ7XG4gICAgICAgICAgICBpZiAocmVjb3JkVGltaW5nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltaW5nSW5mbyA9IE9iamVjdC5hc3NpZ24oe30sIG1vZGVsLm1ldGFkYXRhLmdldCgnZXhlY3V0aW9uJykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ZWQgPSBtc2cubWV0YWRhdGEuc3RhcnRlZDtcbiAgICAgICAgICAgICAgICAvLyBTdGFydGVkIGlzIG5vdCBpbiB0aGUgQVBJLCBidXQgbWV0YWRhdGEgSVB5S2VybmVsIHNlbmRzXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGltaW5nSW5mb1snc2hlbGwuZXhlY3V0ZV9yZXBseS5zdGFydGVkJ10gPSBzdGFydGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBQZXIgYWJvdmUsIHRoZSA1LjAgc3BlYyBkb2VzIG5vdCBhc3N1bWUgZGF0ZSwgc28gd2UgZXN0aW1hdGUgaXMgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICBjb25zdCBmaW5pc2hlZCA9IG1zZy5oZWFkZXIuZGF0ZTtcbiAgICAgICAgICAgICAgICB0aW1pbmdJbmZvWydzaGVsbC5leGVjdXRlX3JlcGx5J10gPVxuICAgICAgICAgICAgICAgICAgICBmaW5pc2hlZCB8fCBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgbW9kZWwubWV0YWRhdGEuc2V0KCdleGVjdXRpb24nLCB0aW1pbmdJbmZvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtc2c7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIHN0YXJ0ZWQgZXhlY3V0aW5nLCBhbmQgdGhlIGNlbGwgaXMgc3RpbGwgaW5kaWNhdGluZyB0aGlzXG4gICAgICAgICAgICAvLyBleGVjdXRpb24sIGNsZWFyIHRoZSBwcm9tcHQuXG4gICAgICAgICAgICBpZiAoZnV0dXJlICYmICFjZWxsLmlzRGlzcG9zZWQgJiYgY2VsbC5vdXRwdXRBcmVhLmZ1dHVyZSA9PT0gZnV0dXJlKSB7XG4gICAgICAgICAgICAgICAgY2VsbC5zZXRQcm9tcHQoJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBDb2RlQ2VsbC5leGVjdXRlID0gZXhlY3V0ZTtcbn0pKENvZGVDZWxsIHx8IChDb2RlQ2VsbCA9IHt9KSk7XG4vKipcbiAqIGBBdHRhY2htZW50c0NlbGxgIC0gQSBiYXNlIGNsYXNzIGZvciBhIGNlbGwgd2lkZ2V0IHRoYXQgYWxsb3dzXG4gKiAgYXR0YWNobWVudHMgdG8gYmUgZHJhZy9kcm9wJ2Qgb3IgcGFzdGVkIG9udG8gaXRcbiAqL1xuZXhwb3J0IGNsYXNzIEF0dGFjaG1lbnRzQ2VsbCBleHRlbmRzIENlbGwge1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgRE9NIGV2ZW50cyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudCAtIFRoZSBET00gZXZlbnQgc2VudCB0byB0aGUgd2lkZ2V0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgbWV0aG9kIGltcGxlbWVudHMgdGhlIERPTSBgRXZlbnRMaXN0ZW5lcmAgaW50ZXJmYWNlIGFuZCBpc1xuICAgICAqIGNhbGxlZCBpbiByZXNwb25zZSB0byBldmVudHMgb24gdGhlIG5vdGVib29rIHBhbmVsJ3Mgbm9kZS4gSXQgc2hvdWxkXG4gICAgICogbm90IGJlIGNhbGxlZCBkaXJlY3RseSBieSB1c2VyIGNvZGUuXG4gICAgICovXG4gICAgaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdwYXN0ZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0UGFzdGUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZHJhZ2VudGVyJzpcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZHJhZ292ZXInOlxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkcm9wJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldnROYXRpdmVEcm9wKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xtLWRyYWdvdmVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldnREcmFnT3ZlcihldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsbS1kcm9wJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldnREcm9wKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGBhZnRlci1hdHRhY2hgIG1lc3NhZ2VzIGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIG9uQWZ0ZXJBdHRhY2gobXNnKSB7XG4gICAgICAgIHN1cGVyLm9uQWZ0ZXJBdHRhY2gobXNnKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdsbS1kcmFnb3ZlcicsIHRoaXMpO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2xtLWRyb3AnLCB0aGlzKTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCB0aGlzKTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMpO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzKTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIG1lc3NhZ2UgaGFuZGxlciBpbnZva2VkIG9uIGEgYCdiZWZvcmUtZGV0YWNoJ2BcbiAgICAgKiBtZXNzYWdlXG4gICAgICovXG4gICAgb25CZWZvcmVEZXRhY2gobXNnKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcyk7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgdGhpcyk7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGFzdGUnLCB0aGlzKTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdsbS1kcmFnb3ZlcicsIHRoaXMpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xtLWRyb3AnLCB0aGlzKTtcbiAgICB9XG4gICAgX2V2dERyYWdPdmVyKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZE1pbWVUeXBlID0gc29tZShpbWFnZVJlbmRlcmVyRmFjdG9yeS5taW1lVHlwZXMsIG1pbWVUeXBlID0+IHtcbiAgICAgICAgICAgIGlmICghZXZlbnQubWltZURhdGEuaGFzRGF0YShDT05URU5UU19NSU1FX1JJQ0gpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGV2ZW50Lm1pbWVEYXRhLmdldERhdGEoQ09OVEVOVFNfTUlNRV9SSUNIKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhLm1vZGVsLm1pbWV0eXBlID09PSBtaW1lVHlwZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghc3VwcG9ydGVkTWltZVR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQuZHJvcEFjdGlvbiA9IGV2ZW50LnByb3Bvc2VkQWN0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGBwYXN0ZWAgZXZlbnQgZm9yIHRoZSB3aWRnZXRcbiAgICAgKi9cbiAgICBfZXZ0UGFzdGUoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmNsaXBib2FyZERhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gZXZlbnQuY2xpcGJvYXJkRGF0YS5pdGVtcztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXNbaV0udHlwZSA9PT0gJ3RleHQvcGxhaW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNraXAgaWYgdGhpcyB0ZXh0IGlzIHRoZSBwYXRoIHRvIGEgZmlsZVxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IGl0ZW1zLmxlbmd0aCAtIDEgJiYgaXRlbXNbaSArIDFdLmtpbmQgPT09ICdmaWxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbaV0uZ2V0QXNTdHJpbmcodGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgICAgICAgICAgKF9iID0gKF9hID0gdGhpcy5lZGl0b3IpLnJlcGxhY2VTZWxlY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCB0ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2F0dGFjaEZpbGVzKGV2ZW50LmNsaXBib2FyZERhdGEuaXRlbXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgYGRyb3BgIGV2ZW50IGZvciB0aGUgd2lkZ2V0XG4gICAgICovXG4gICAgX2V2dE5hdGl2ZURyb3AoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmRhdGFUcmFuc2Zlcikge1xuICAgICAgICAgICAgdGhpcy5fYXR0YWNoRmlsZXMoZXZlbnQuZGF0YVRyYW5zZmVyLml0ZW1zKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGAnbG0tZHJvcCdgIGV2ZW50IGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIF9ldnREcm9wKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZE1pbWVUeXBlcyA9IHRvQXJyYXkoZmlsdGVyKGV2ZW50Lm1pbWVEYXRhLnR5cGVzKCksIG1pbWVUeXBlID0+IHtcbiAgICAgICAgICAgIGlmIChtaW1lVHlwZSA9PT0gQ09OVEVOVFNfTUlNRV9SSUNIKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGV2ZW50Lm1pbWVEYXRhLmdldERhdGEoQ09OVEVOVFNfTUlNRV9SSUNIKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGltYWdlUmVuZGVyZXJGYWN0b3J5Lm1pbWVUeXBlcy5pbmRleE9mKGRhdGEubW9kZWwubWltZXR5cGUpICE9PSAtMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW1hZ2VSZW5kZXJlckZhY3RvcnkubWltZVR5cGVzLmluZGV4T2YobWltZVR5cGUpICE9PSAtMTtcbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAoc3VwcG9ydGVkTWltZVR5cGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAoZXZlbnQucHJvcG9zZWRBY3Rpb24gPT09ICdub25lJykge1xuICAgICAgICAgICAgZXZlbnQuZHJvcEFjdGlvbiA9ICdub25lJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5kcm9wQWN0aW9uID0gJ2NvcHknO1xuICAgICAgICBmb3IgKGNvbnN0IG1pbWVUeXBlIG9mIHN1cHBvcnRlZE1pbWVUeXBlcykge1xuICAgICAgICAgICAgaWYgKG1pbWVUeXBlID09PSBDT05URU5UU19NSU1FX1JJQ0gpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG1vZGVsLCB3aXRoQ29udGVudCB9ID0gZXZlbnQubWltZURhdGEuZ2V0RGF0YShDT05URU5UU19NSU1FX1JJQ0gpO1xuICAgICAgICAgICAgICAgIGlmIChtb2RlbC50eXBlID09PSAnZmlsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgVVJJID0gdGhpcy5fZ2VuZXJhdGVVUkkobW9kZWwubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ2VsbFNvdXJjZVdpdGhBdHRhY2htZW50KG1vZGVsLm5hbWUsIFVSSSk7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgd2l0aENvbnRlbnQoKS50aGVuKGZ1bGxNb2RlbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmF0dGFjaG1lbnRzLnNldChVUkksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZnVsbE1vZGVsLm1pbWV0eXBlXTogZnVsbE1vZGVsLmNvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBQdXJlIG1pbWV0eXBlLCBubyB1c2VmdWwgbmFtZSB0byBpbmZlclxuICAgICAgICAgICAgICAgIGNvbnN0IFVSSSA9IHRoaXMuX2dlbmVyYXRlVVJJKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5hdHRhY2htZW50cy5zZXQoVVJJLCB7XG4gICAgICAgICAgICAgICAgICAgIFttaW1lVHlwZV06IGV2ZW50Lm1pbWVEYXRhLmdldERhdGEobWltZVR5cGUpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDZWxsU291cmNlV2l0aEF0dGFjaG1lbnQoVVJJLCBVUkkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGFjaGVzIGFsbCBEYXRhVHJhbnNmZXJJdGVtcyAob2J0YWluZWQgZnJvbVxuICAgICAqIGNsaXBib2FyZCBvciBuYXRpdmUgZHJvcCBldmVudHMpIHRvIHRoZSBjZWxsXG4gICAgICovXG4gICAgX2F0dGFjaEZpbGVzKGl0ZW1zKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAgICAgICAgIGlmIChpdGVtLmtpbmQgPT09ICdmaWxlJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2IgPSBpdGVtLmdldEFzRmlsZSgpO1xuICAgICAgICAgICAgICAgIGlmIChibG9iKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2F0dGFjaEZpbGUoYmxvYik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRha2VzIGluIGEgZmlsZSBvYmplY3QgYW5kIGFkZHMgaXQgdG9cbiAgICAgKiB0aGUgY2VsbCBhdHRhY2htZW50c1xuICAgICAqL1xuICAgIF9hdHRhY2hGaWxlKGJsb2IpIHtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGV2dCA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGhyZWYsIHByb3RvY29sIH0gPSBVUkxFeHQucGFyc2UocmVhZGVyLnJlc3VsdCk7XG4gICAgICAgICAgICBpZiAocHJvdG9jb2wgIT09ICdkYXRhOicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRhVVJJUmVnZXggPSAvKFtcXHcrXFwvXFwrXSspPyg/OjsoY2hhcnNldD1bXFx3XFxkLV0qfGJhc2U2NCkpPywoLiopLztcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSBkYXRhVVJJUmVnZXguZXhlYyhocmVmKTtcbiAgICAgICAgICAgIGlmICghbWF0Y2hlcyB8fCBtYXRjaGVzLmxlbmd0aCAhPT0gNCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gbWF0Y2hlc1sxXTtcbiAgICAgICAgICAgIGNvbnN0IGVuY29kZWREYXRhID0gbWF0Y2hlc1szXTtcbiAgICAgICAgICAgIGNvbnN0IGJ1bmRsZSA9IHsgW21pbWVUeXBlXTogZW5jb2RlZERhdGEgfTtcbiAgICAgICAgICAgIGNvbnN0IFVSSSA9IHRoaXMuX2dlbmVyYXRlVVJJKGJsb2IubmFtZSk7XG4gICAgICAgICAgICBpZiAobWltZVR5cGUuc3RhcnRzV2l0aCgnaW1hZ2UvJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmF0dGFjaG1lbnRzLnNldChVUkksIGJ1bmRsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDZWxsU291cmNlV2l0aEF0dGFjaG1lbnQoYmxvYi5uYW1lLCBVUkkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZWFkZXIub25lcnJvciA9IGV2dCA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gYXR0YWNoICR7YmxvYi5uYW1lfWAgKyBldnQpO1xuICAgICAgICB9O1xuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgdW5pcXVlIFVSSSBmb3IgYSBmaWxlXG4gICAgICogd2hpbGUgcHJlc2VydmluZyB0aGUgZmlsZSBleHRlbnNpb24uXG4gICAgICovXG4gICAgX2dlbmVyYXRlVVJJKG5hbWUgPSAnJykge1xuICAgICAgICBjb25zdCBsYXN0SW5kZXggPSBuYW1lLmxhc3RJbmRleE9mKCcuJyk7XG4gICAgICAgIHJldHVybiBsYXN0SW5kZXggIT09IC0xXG4gICAgICAgICAgICA/IFVVSUQudXVpZDQoKS5jb25jYXQobmFtZS5zdWJzdHJpbmcobGFzdEluZGV4KSlcbiAgICAgICAgICAgIDogVVVJRC51dWlkNCgpO1xuICAgIH1cbn1cbi8qKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBNYXJrZG93bkNlbGxcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKipcbiAqIEEgd2lkZ2V0IGZvciBhIE1hcmtkb3duIGNlbGwuXG4gKlxuICogIyMjIyBOb3Rlc1xuICogVGhpbmdzIGdldCBjb21wbGljYXRlZCBpZiB3ZSB3YW50IHRoZSByZW5kZXJlZCB0ZXh0IHRvIHVwZGF0ZVxuICogYW55IHRpbWUgdGhlIHRleHQgY2hhbmdlcywgdGhlIHRleHQgZWRpdG9yIG1vZGVsIGNoYW5nZXMsXG4gKiBvciB0aGUgaW5wdXQgYXJlYSBtb2RlbCBjaGFuZ2VzLiAgV2UgZG9uJ3Qgc3VwcG9ydCBhdXRvbWF0aWNhbGx5XG4gKiB1cGRhdGluZyB0aGUgcmVuZGVyZWQgdGV4dCBpbiBhbGwgb2YgdGhlc2UgY2FzZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXJrZG93bkNlbGwgZXh0ZW5kcyBBdHRhY2htZW50c0NlbGwge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIE1hcmtkb3duIGNlbGwgd2lkZ2V0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl90b2dnbGVDb2xsYXBzZWRTaWduYWwgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcHJldlRleHQgPSAnJztcbiAgICAgICAgdGhpcy5fcmVhZHkgPSBuZXcgUHJvbWlzZURlbGVnYXRlKCk7XG4gICAgICAgIHRoaXMuX3Nob3dFZGl0b3JGb3JSZWFkT25seU1hcmtkb3duID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhNQVJLRE9XTl9DRUxMX0NMQVNTKTtcbiAgICAgICAgLy8gRW5zdXJlIHdlIGNhbiByZXNvbHZlIGF0dGFjaG1lbnRzOlxuICAgICAgICB0aGlzLl9yZW5kZXJtaW1lID0gb3B0aW9ucy5yZW5kZXJtaW1lLmNsb25lKHtcbiAgICAgICAgICAgIHJlc29sdmVyOiBuZXcgQXR0YWNobWVudHNSZXNvbHZlcih7XG4gICAgICAgICAgICAgICAgcGFyZW50OiAoX2EgPSBvcHRpb25zLnJlbmRlcm1pbWUucmVzb2x2ZXIpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBtb2RlbDogdGhpcy5tb2RlbC5hdHRhY2htZW50c1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFN0b3AgY29kZW1pcnJvciBoYW5kbGluZyBwYXN0ZVxuICAgICAgICB0aGlzLmVkaXRvci5zZXRPcHRpb24oJ2hhbmRsZVBhc3RlJywgZmFsc2UpO1xuICAgICAgICAvLyBDaGVjayBpZiBoZWFkaW5nIGNlbGwgaXMgc2V0IHRvIGJlIGNvbGxhcHNlZFxuICAgICAgICB0aGlzLl9oZWFkaW5nQ29sbGFwc2VkID0gKChfYiA9IHRoaXMubW9kZWwubWV0YWRhdGEuZ2V0KE1BUktET1dOX0hFQURJTkdfQ09MTEFQU0VEKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogZmFsc2UpO1xuICAgICAgICAvLyBUaHJvdHRsZSB0aGUgcmVuZGVyaW5nIHJhdGUgb2YgdGhlIHdpZGdldC5cbiAgICAgICAgdGhpcy5fbW9uaXRvciA9IG5ldyBBY3Rpdml0eU1vbml0b3Ioe1xuICAgICAgICAgICAgc2lnbmFsOiB0aGlzLm1vZGVsLmNvbnRlbnRDaGFuZ2VkLFxuICAgICAgICAgICAgdGltZW91dDogUkVOREVSX1RJTUVPVVRcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX21vbml0b3IuYWN0aXZpdHlTdG9wcGVkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3JlbmRlcmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHZvaWQgdGhpcy5fdXBkYXRlUmVuZGVyZWRJbnB1dCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcmVhZHkucmVzb2x2ZSh2b2lkIDApO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW5kZXJDb2xsYXBzZUJ1dHRvbnModGhpcy5fcmVuZGVyZXIpO1xuICAgICAgICB0aGlzLnJlbmRlcklucHV0KHRoaXMuX3JlbmRlcmVyKTtcbiAgICAgICAgdGhpcy5fc2hvd0VkaXRvckZvclJlYWRPbmx5TWFya2Rvd24gPSAoX2MgPSBvcHRpb25zLnNob3dFZGl0b3JGb3JSZWFkT25seU1hcmtkb3duKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBNYXJrZG93bkNlbGwuZGVmYXVsdFNob3dFZGl0b3JGb3JSZWFkT25seU1hcmtkb3duO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB3aWRnZXQgcmVuZGVycyBmb3IgdGhlIGZpcnN0IHRpbWUuXG4gICAgICovXG4gICAgZ2V0IHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVhZHkucHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGV4dCB0aGF0IHJlcHJlc2VudHMgdGhlIGhlYWRpbmcgaWYgY2VsbCBpcyBhIGhlYWRpbmcuXG4gICAgICogUmV0dXJucyBlbXB0eSBzdHJpbmcgaWYgbm90IGEgaGVhZGluZy5cbiAgICAgKi9cbiAgICBnZXQgaGVhZGluZ0luZm8oKSB7XG4gICAgICAgIGxldCB0ZXh0ID0gdGhpcy5tb2RlbC52YWx1ZS50ZXh0O1xuICAgICAgICBjb25zdCBsaW5lcyA9IG1hcmtlZC5sZXhlcih0ZXh0KTtcbiAgICAgICAgbGV0IGxpbmU7XG4gICAgICAgIGZvciAobGluZSBvZiBsaW5lcykge1xuICAgICAgICAgICAgaWYgKGxpbmUudHlwZSA9PT0gJ2hlYWRpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdGV4dDogbGluZS50ZXh0LCBsZXZlbDogbGluZS5kZXB0aCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobGluZS50eXBlID09PSAnaHRtbCcpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2ggPSBsaW5lLnJhdy5tYXRjaCgvPGgoWzEtNl0pKC4qPyk+KC4qPyk8XFwvaFxcMT4vKTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggPT09IG51bGwgfHwgbWF0Y2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1hdGNoWzNdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHRleHQ6IG1hdGNoWzNdLCBsZXZlbDogcGFyc2VJbnQobWF0Y2hbMV0pIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IHRleHQ6ICcnLCBsZXZlbDogLTEgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB0ZXh0OiAnJywgbGV2ZWw6IC0xIH07XG4gICAgfVxuICAgIGdldCBoZWFkaW5nQ29sbGFwc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVhZGluZ0NvbGxhcHNlZDtcbiAgICB9XG4gICAgc2V0IGhlYWRpbmdDb2xsYXBzZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5faGVhZGluZ0NvbGxhcHNlZCA9IHZhbHVlO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwubWV0YWRhdGEuc2V0KE1BUktET1dOX0hFQURJTkdfQ09MTEFQU0VELCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5tb2RlbC5tZXRhZGF0YS5oYXMoTUFSS0RPV05fSEVBRElOR19DT0xMQVBTRUQpKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLm1ldGFkYXRhLmRlbGV0ZShNQVJLRE9XTl9IRUFESU5HX0NPTExBUFNFRCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29sbGFwc2VCdXR0b24gPSB0aGlzLmlucHV0QXJlYS5wcm9tcHROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoSEVBRElOR19DT0xMQVBTRVJfQ0xBU1MpWzBdO1xuICAgICAgICBpZiAoY29sbGFwc2VCdXR0b24pIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbGxhcHNlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2pwLW1vZC1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbGxhcHNlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2pwLW1vZC1jb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlckNvbGxhcHNlQnV0dG9ucyh0aGlzLl9yZW5kZXJlcik7XG4gICAgfVxuICAgIGdldCBudW1iZXJDaGlsZE5vZGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbnVtYmVyQ2hpbGROb2RlcztcbiAgICB9XG4gICAgc2V0IG51bWJlckNoaWxkTm9kZXModmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbnVtYmVyQ2hpbGROb2RlcyA9IHZhbHVlO1xuICAgICAgICB0aGlzLnJlbmRlckNvbGxhcHNlQnV0dG9ucyh0aGlzLl9yZW5kZXJlcik7XG4gICAgfVxuICAgIGdldCB0b2dnbGVDb2xsYXBzZWRTaWduYWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90b2dnbGVDb2xsYXBzZWRTaWduYWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGNlbGwgaXMgcmVuZGVyZWQuXG4gICAgICovXG4gICAgZ2V0IHJlbmRlcmVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyZWQ7XG4gICAgfVxuICAgIHNldCByZW5kZXJlZCh2YWx1ZSkge1xuICAgICAgICAvLyBTaG93IGNlbGwgYXMgcmVuZGVyZWQgd2hlbiBjZWxsIGlzIG5vdCBlZGl0YWJsZVxuICAgICAgICBpZiAodGhpcy5yZWFkT25seSAmJiB0aGlzLl9zaG93RWRpdG9yRm9yUmVhZE9ubHlNYXJrZG93biA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUgPT09IHRoaXMuX3JlbmRlcmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVuZGVyZWQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5faGFuZGxlUmVuZGVyZWQoKTtcbiAgICAgICAgLy8gUmVmcmVzaGluZyBhbiBlZGl0b3IgY2FuIGJlIHJlYWxseSBleHBlbnNpdmUsIHNvIHdlIGRvbid0IGNhbGwgaXQgZnJvbVxuICAgICAgICAvLyBfaGFuZGxlUmVuZGVyZWQsIHNpbmNlIF9oYW5kbGVkUmVuZGVyZWQgaXMgYWxzbyBjYWxsZWQgb24gZXZlcnkgdXBkYXRlXG4gICAgICAgIC8vIHJlcXVlc3QuXG4gICAgICAgIGlmICghdGhpcy5fcmVuZGVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgcmVuZGVyZWQgc3RhdGUgY2hhbmdlZCwgcmFpc2UgYW4gZXZlbnQuXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlDaGFuZ2VkLmVtaXQoKTtcbiAgICB9XG4gICAgLypcbiAgICAgKiBXaGV0aGVyIHRoZSBNYXJrZG93biBlZGl0b3IgaXMgdmlzaWJsZSBpbiByZWFkLW9ubHkgbW9kZS5cbiAgICAgKi9cbiAgICBnZXQgc2hvd0VkaXRvckZvclJlYWRPbmx5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd0VkaXRvckZvclJlYWRPbmx5TWFya2Rvd247XG4gICAgfVxuICAgIHNldCBzaG93RWRpdG9yRm9yUmVhZE9ubHkodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fc2hvd0VkaXRvckZvclJlYWRPbmx5TWFya2Rvd24gPSB2YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbWF5YmVDcmVhdGVDb2xsYXBzZUJ1dHRvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaGVhZGluZ0luZm8ubGV2ZWwgPiAwICYmXG4gICAgICAgICAgICB0aGlzLmlucHV0QXJlYS5wcm9tcHROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoSEVBRElOR19DT0xMQVBTRVJfQ0xBU1MpXG4gICAgICAgICAgICAgICAgLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBsZXQgY29sbGFwc2VCdXR0b24gPSB0aGlzLmlucHV0QXJlYS5wcm9tcHROb2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpKTtcbiAgICAgICAgICAgIGNvbGxhcHNlQnV0dG9uLmNsYXNzTmFtZSA9IGBqcC1CdXR0b24gJHtIRUFESU5HX0NPTExBUFNFUl9DTEFTU31gO1xuICAgICAgICAgICAgY29sbGFwc2VCdXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLWhlYWRpbmctbGV2ZWwnLCB0aGlzLmhlYWRpbmdJbmZvLmxldmVsLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2hlYWRpbmdDb2xsYXBzZWQpIHtcbiAgICAgICAgICAgICAgICBjb2xsYXBzZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdqcC1tb2QtY29sbGFwc2VkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb2xsYXBzZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdqcC1tb2QtY29sbGFwc2VkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2xsYXBzZUJ1dHRvbi5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkaW5nQ29sbGFwc2VkID0gIXRoaXMuaGVhZGluZ0NvbGxhcHNlZDtcbiAgICAgICAgICAgICAgICB0aGlzLl90b2dnbGVDb2xsYXBzZWRTaWduYWwuZW1pdCh0aGlzLl9oZWFkaW5nQ29sbGFwc2VkKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgbWF5YmVDcmVhdGVPclVwZGF0ZUV4cGFuZEJ1dHRvbigpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgZXhwYW5kQnV0dG9uID0gdGhpcy5ub2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoU0hPV19ISURERU5fQ0VMTFNfQ0xBU1MpO1xuICAgICAgICAvLyBDcmVhdGUgdGhlIFwic2hvdyBoaWRkZW5cIiBidXR0b24gaWYgbm90IGFscmVhZHkgY3JlYXRlZFxuICAgICAgICBpZiAodGhpcy5oZWFkaW5nQ29sbGFwc2VkICYmXG4gICAgICAgICAgICBleHBhbmRCdXR0b24ubGVuZ3RoID09PSAwICYmXG4gICAgICAgICAgICB0aGlzLl9udW1iZXJDaGlsZE5vZGVzID4gMCkge1xuICAgICAgICAgICAgY29uc3QgbnVtYmVyQ2hpbGROb2RlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgbnVtYmVyQ2hpbGROb2Rlcy5jbGFzc05hbWUgPSBgYnAzLWJ1dHRvbiBicDMtbWluaW1hbCBqcC1CdXR0b24gJHtTSE9XX0hJRERFTl9DRUxMU19DTEFTU31gO1xuICAgICAgICAgICAgYWRkSWNvbi5yZW5kZXIobnVtYmVyQ2hpbGROb2Rlcyk7XG4gICAgICAgICAgICBjb25zdCBudW1iZXJDaGlsZE5vZGVzVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgbnVtYmVyQ2hpbGROb2Rlc1RleHQubm9kZVZhbHVlID0gYCR7dGhpcy5fbnVtYmVyQ2hpbGROb2Rlc30gY2VsbCR7dGhpcy5fbnVtYmVyQ2hpbGROb2RlcyA+IDEgPyAncycgOiAnJ30gaGlkZGVuYDtcbiAgICAgICAgICAgIG51bWJlckNoaWxkTm9kZXMuYXBwZW5kQ2hpbGQobnVtYmVyQ2hpbGROb2Rlc1RleHQpO1xuICAgICAgICAgICAgbnVtYmVyQ2hpbGROb2Rlcy5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZGluZ0NvbGxhcHNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvZ2dsZUNvbGxhcHNlZFNpZ25hbC5lbWl0KHRoaXMuX2hlYWRpbmdDb2xsYXBzZWQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZChudW1iZXJDaGlsZE5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgoKF9iID0gKF9hID0gZXhwYW5kQnV0dG9uID09PSBudWxsIHx8IGV4cGFuZEJ1dHRvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXhwYW5kQnV0dG9uWzBdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2hpbGROb2RlcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmxlbmd0aCkgPiAxKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgaGVhZGluZyBpcyBjb2xsYXBzZWQsIHVwZGF0ZSB0ZXh0XG4gICAgICAgICAgICBpZiAodGhpcy5faGVhZGluZ0NvbGxhcHNlZCkge1xuICAgICAgICAgICAgICAgIGV4cGFuZEJ1dHRvblswXS5jaGlsZE5vZGVzWzFdLnRleHRDb250ZW50ID0gYCR7dGhpcy5fbnVtYmVyQ2hpbGROb2Rlc30gY2VsbCR7dGhpcy5fbnVtYmVyQ2hpbGROb2RlcyA+IDEgPyAncycgOiAnJ30gaGlkZGVuYDtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgaGVhZGluZyBpc24ndCBjb2xsYXBzZWQsIHJlbW92ZSB0aGUgYnV0dG9uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGVsIG9mIGV4cGFuZEJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgdGhlIGNvbGxhcHNlIGJ1dHRvbiBmb3IgaGVhZGluZyBjZWxscyxcbiAgICAgKiBhbmQgZm9yIGNvbGxhcHNlZCBoZWFkaW5nIGNlbGxzIHJlbmRlciB0aGUgXCJleHBhbmQgaGlkZGVuIGNlbGxzXCJcbiAgICAgKiBidXR0b24uXG4gICAgICovXG4gICAgcmVuZGVyQ29sbGFwc2VCdXR0b25zKHdpZGdldCkge1xuICAgICAgICB0aGlzLm5vZGUuY2xhc3NMaXN0LnRvZ2dsZShNQVJLRE9XTl9IRUFESU5HX0NPTExBUFNFRCwgdGhpcy5faGVhZGluZ0NvbGxhcHNlZCk7XG4gICAgICAgIHRoaXMubWF5YmVDcmVhdGVDb2xsYXBzZUJ1dHRvbigpO1xuICAgICAgICB0aGlzLm1heWJlQ3JlYXRlT3JVcGRhdGVFeHBhbmRCdXR0b24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIGFuIGlucHV0IGluc3RlYWQgb2YgdGhlIHRleHQgZWRpdG9yLlxuICAgICAqL1xuICAgIHJlbmRlcklucHV0KHdpZGdldCkge1xuICAgICAgICB0aGlzLmFkZENsYXNzKFJFTkRFUkVEX0NMQVNTKTtcbiAgICAgICAgdGhpcy5yZW5kZXJDb2xsYXBzZUJ1dHRvbnMod2lkZ2V0KTtcbiAgICAgICAgdGhpcy5pbnB1dEFyZWEucmVuZGVySW5wdXQod2lkZ2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvdyB0aGUgdGV4dCBlZGl0b3IgaW5zdGVhZCBvZiByZW5kZXJlZCBpbnB1dC5cbiAgICAgKi9cbiAgICBzaG93RWRpdG9yKCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKFJFTkRFUkVEX0NMQVNTKTtcbiAgICAgICAgdGhpcy5pbnB1dEFyZWEuc2hvd0VkaXRvcigpO1xuICAgIH1cbiAgICAvKlxuICAgICAqIEhhbmRsZSBgdXBkYXRlLXJlcXVlc3RgIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIG9uVXBkYXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGFyZSBwcm9wZXJseSByZW5kZXJlZC5cbiAgICAgICAgdGhpcy5faGFuZGxlUmVuZGVyZWQoKTtcbiAgICAgICAgc3VwZXIub25VcGRhdGVSZXF1ZXN0KG1zZyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1vZGlmeSB0aGUgY2VsbCBzb3VyY2UgdG8gaW5jbHVkZSBhIHJlZmVyZW5jZSB0byB0aGUgYXR0YWNobWVudC5cbiAgICAgKi9cbiAgICB1cGRhdGVDZWxsU291cmNlV2l0aEF0dGFjaG1lbnQoYXR0YWNobWVudE5hbWUsIFVSSSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCB0ZXh0VG9CZUFwcGVuZGVkID0gYCFbJHthdHRhY2htZW50TmFtZX1dKGF0dGFjaG1lbnQ6JHtVUkkgIT09IG51bGwgJiYgVVJJICE9PSB2b2lkIDAgPyBVUkkgOiBhdHRhY2htZW50TmFtZX0pYDtcbiAgICAgICAgKF9iID0gKF9hID0gdGhpcy5lZGl0b3IpLnJlcGxhY2VTZWxlY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCB0ZXh0VG9CZUFwcGVuZGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSByZW5kZXJlZCBzdGF0ZS5cbiAgICAgKi9cbiAgICBfaGFuZGxlUmVuZGVyZWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5fcmVuZGVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0VkaXRvcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gVE9ETzogSXQgd291bGQgYmUgbmljZSBmb3IgdGhlIGNlbGwgdG8gcHJvdmlkZSBhIHdheSBmb3JcbiAgICAgICAgICAgIC8vIGl0cyBjb25zdW1lcnMgdG8gaG9vayBpbnRvIHdoZW4gdGhlIHJlbmRlcmluZyBpcyBkb25lLlxuICAgICAgICAgICAgdm9pZCB0aGlzLl91cGRhdGVSZW5kZXJlZElucHV0KCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcklucHV0KHRoaXMuX3JlbmRlcmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHJlbmRlcmVkIGlucHV0LlxuICAgICAqL1xuICAgIF91cGRhdGVSZW5kZXJlZElucHV0KCkge1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWw7XG4gICAgICAgIGNvbnN0IHRleHQgPSAobW9kZWwgJiYgbW9kZWwudmFsdWUudGV4dCkgfHwgREVGQVVMVF9NQVJLRE9XTl9URVhUO1xuICAgICAgICAvLyBEbyBub3QgcmUtcmVuZGVyIGlmIHRoZSB0ZXh0IGhhcyBub3QgY2hhbmdlZC5cbiAgICAgICAgaWYgKHRleHQgIT09IHRoaXMuX3ByZXZUZXh0KSB7XG4gICAgICAgICAgICBjb25zdCBtaW1lTW9kZWwgPSBuZXcgTWltZU1vZGVsKHsgZGF0YTogeyAndGV4dC9tYXJrZG93bic6IHRleHQgfSB9KTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fcmVuZGVyZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlciA9IHRoaXMuX3JlbmRlcm1pbWUuY3JlYXRlUmVuZGVyZXIoJ3RleHQvbWFya2Rvd24nKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhNQVJLRE9XTl9PVVRQVVRfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcHJldlRleHQgPSB0ZXh0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcmVyLnJlbmRlck1vZGVsKG1pbWVNb2RlbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2b2lkIDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9uZSB0aGUgY2VsbCwgdXNpbmcgdGhlIHNhbWUgbW9kZWwuXG4gICAgICovXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIGNvbnN0IGNvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICAgICAgcmV0dXJuIG5ldyBjb25zdHJ1Y3Rvcih7XG4gICAgICAgICAgICBtb2RlbDogdGhpcy5tb2RlbCxcbiAgICAgICAgICAgIGNvbnRlbnRGYWN0b3J5OiB0aGlzLmNvbnRlbnRGYWN0b3J5LFxuICAgICAgICAgICAgcmVuZGVybWltZTogdGhpcy5fcmVuZGVybWltZSxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG59XG4vKipcbiAqIFRoZSBuYW1lc3BhY2UgZm9yIHRoZSBgQ29kZUNlbGxgIGNsYXNzIHN0YXRpY3MuXG4gKi9cbihmdW5jdGlvbiAoTWFya2Rvd25DZWxsKSB7XG4gICAgLyoqXG4gICAgICogRGVmYXVsdCB2YWx1ZSBmb3Igc2hvd0VkaXRvckZvclJlYWRPbmx5TWFya2Rvd24uXG4gICAgICovXG4gICAgTWFya2Rvd25DZWxsLmRlZmF1bHRTaG93RWRpdG9yRm9yUmVhZE9ubHlNYXJrZG93biA9IHRydWU7XG59KShNYXJrZG93bkNlbGwgfHwgKE1hcmtkb3duQ2VsbCA9IHt9KSk7XG4vKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogUmF3Q2VsbFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKlxuICogQSB3aWRnZXQgZm9yIGEgcmF3IGNlbGwuXG4gKi9cbmV4cG9ydCBjbGFzcyBSYXdDZWxsIGV4dGVuZHMgQ2VsbCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgcmF3IGNlbGwgd2lkZ2V0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoUkFXX0NFTExfQ0xBU1MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9uZSB0aGUgY2VsbCwgdXNpbmcgdGhlIHNhbWUgbW9kZWwuXG4gICAgICovXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIGNvbnN0IGNvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICAgICAgcmV0dXJuIG5ldyBjb25zdHJ1Y3Rvcih7XG4gICAgICAgICAgICBtb2RlbDogdGhpcy5tb2RlbCxcbiAgICAgICAgICAgIGNvbnRlbnRGYWN0b3J5OiB0aGlzLmNvbnRlbnRGYWN0b3J5LFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpZGdldC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9