(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_notebook_lib_index_js"],{

/***/ "../../packages/notebook/lib/actions.js":
/*!**********************************************!*\
  !*** ../../packages/notebook/lib/actions.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KernelError": () => (/* binding */ KernelError),
/* harmony export */   "NotebookActions": () => (/* binding */ NotebookActions)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/cells */ "webpack/sharing/consume/default/@jupyterlab/cells/@jupyterlab/cells");
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/domutils */ "webpack/sharing/consume/default/@lumino/domutils/@lumino/domutils?0bc5");
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_domutils__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.








/**
 * The mimetype used for Jupyter cell data.
 */
const JUPYTER_CELL_MIME = 'application/vnd.jupyter.cells';
class KernelError extends Error {
    /**
     * Construct the kernel error.
     */
    constructor(content) {
        const errorContent = content;
        const errorName = errorContent.ename;
        const errorValue = errorContent.evalue;
        super(`KernelReplyNotOK: ${errorName} ${errorValue}`);
        this.errorName = errorName;
        this.errorValue = errorValue;
        this.traceback = errorContent.traceback;
        Object.setPrototypeOf(this, KernelError.prototype);
    }
}
/**
 * A collection of actions that run against notebooks.
 *
 * #### Notes
 * All of the actions are a no-op if there is no model on the notebook.
 * The actions set the widget `mode` to `'command'` unless otherwise specified.
 * The actions will preserve the selection on the notebook widget unless
 * otherwise specified.
 */
class NotebookActions {
    /**
     * A signal that emits whenever a cell completes execution.
     */
    static get executed() {
        return Private.executed;
    }
    /**
     * A signal that emits whenever a cell execution is scheduled.
     */
    static get executionScheduled() {
        return Private.executionScheduled;
    }
    /**
     * A signal that emits whenever a cell execution is scheduled.
     */
    static get selectionExecuted() {
        return Private.selectionExecuted;
    }
    /**
     * A private constructor for the `NotebookActions` class.
     *
     * #### Notes
     * This class can never be instantiated. Its static member `executed` will be
     * merged with the `NotebookActions` namespace. The reason it exists as a
     * standalone class is because at run time, the `Private.executed` variable
     * does not yet exist, so it needs to be referenced via a getter.
     */
    constructor() {
        // Intentionally empty.
    }
}
/**
 * A namespace for `NotebookActions` static methods.
 */
(function (NotebookActions) {
    /**
     * Split the active cell into two or more cells.
     *
     * @param notebook The target notebook widget.
     *
     * #### Notes
     * It will preserve the existing mode.
     * The last cell will be activated if no selection is found.
     * If text was selected, the cell containing the selection will
     * be activated.
     * The existing selection will be cleared.
     * The activated cell will have focus and the cursor will
     * remain in the initial position.
     * The leading whitespace in the second cell will be removed.
     * If there is no content, two empty cells will be created.
     * Both cells will have the same type as the original cell.
     * This action can be undone.
     */
    function splitCell(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        if (!Private.isNotebookRendered(notebook)) {
            return;
        }
        const state = Private.getState(notebook);
        notebook.deselectAll();
        const nbModel = notebook.model;
        const index = notebook.activeCellIndex;
        const child = notebook.widgets[index];
        const editor = child.editor;
        const selections = editor.getSelections();
        const orig = child.model.value.text;
        const offsets = [0];
        let start = -1;
        let end = -1;
        for (let i = 0; i < selections.length; i++) {
            // append start and end to handle selections
            // cursors will have same start and end
            start = editor.getOffsetAt(selections[i].start);
            end = editor.getOffsetAt(selections[i].end);
            if (start < end) {
                offsets.push(start);
                offsets.push(end);
            }
            else if (end < start) {
                offsets.push(end);
                offsets.push(start);
            }
            else {
                offsets.push(start);
            }
        }
        offsets.push(orig.length);
        const clones = [];
        for (let i = 0; i + 1 < offsets.length; i++) {
            const clone = Private.cloneCell(nbModel, child.model);
            clones.push(clone);
        }
        for (let i = 0; i < clones.length; i++) {
            if (i !== clones.length - 1 && clones[i].type === 'code') {
                clones[i].outputs.clear();
            }
            clones[i].value.text = orig
                .slice(offsets[i], offsets[i + 1])
                .replace(/^\n+/, '')
                .replace(/\n+$/, '');
        }
        const cells = nbModel.cells;
        cells.beginCompoundOperation();
        for (let i = 0; i < clones.length; i++) {
            if (i === 0) {
                cells.set(index, clones[i]);
            }
            else {
                cells.insert(index + i, clones[i]);
            }
        }
        cells.endCompoundOperation();
        // If there is a selection the selected cell will be activated
        const activeCellDelta = start !== end ? 2 : 1;
        notebook.activeCellIndex = index + clones.length - activeCellDelta;
        const focusedEditor = notebook.activeCell.editor;
        focusedEditor.focus();
        Private.handleState(notebook, state);
    }
    NotebookActions.splitCell = splitCell;
    /**
     * Merge the selected cells.
     *
     * @param notebook - The target notebook widget.
     *
     * @param mergeAbove - If only one cell is selected, indicates whether to merge it
     *    with the cell above (true) or below (false, default).
     *
     * #### Notes
     * The widget mode will be preserved.
     * If only one cell is selected and `mergeAbove` is true, the above cell will be selected.
     * If only one cell is selected and `mergeAbove` is false, the below cell will be selected.
     * If the active cell is a code cell, its outputs will be cleared.
     * This action can be undone.
     * The final cell will have the same type as the active cell.
     * If the active cell is a markdown cell, it will be unrendered.
     */
    function mergeCells(notebook, mergeAbove = false) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        if (!Private.isNotebookRendered(notebook)) {
            return;
        }
        const state = Private.getState(notebook);
        const toMerge = [];
        const toDelete = [];
        const model = notebook.model;
        const cells = model.cells;
        const primary = notebook.activeCell;
        const active = notebook.activeCellIndex;
        const attachments = {};
        // Get the cells to merge.
        notebook.widgets.forEach((child, index) => {
            if (notebook.isSelectedOrActive(child)) {
                toMerge.push(child.model.value.text);
                if (index !== active) {
                    toDelete.push(child.model);
                }
                // Collect attachments if the cell is a markdown cell or a raw cell
                const model = child.model;
                if ((0,_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__.isRawCellModel)(model) || (0,_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__.isMarkdownCellModel)(model)) {
                    for (const key of model.attachments.keys) {
                        attachments[key] = model.attachments.get(key).toJSON();
                    }
                }
            }
        });
        // Check for only a single cell selected.
        if (toMerge.length === 1) {
            // Merge with the cell above when mergeAbove is true
            if (mergeAbove === true) {
                // Bail if it is the first cell.
                if (active === 0) {
                    return;
                }
                // Otherwise merge with the previous cell.
                const cellModel = cells.get(active - 1);
                toMerge.unshift(cellModel.value.text);
                toDelete.push(cellModel);
            }
            else if (mergeAbove === false) {
                // Bail if it is the last cell.
                if (active === cells.length - 1) {
                    return;
                }
                // Otherwise merge with the next cell.
                const cellModel = cells.get(active + 1);
                toMerge.push(cellModel.value.text);
                toDelete.push(cellModel);
            }
        }
        notebook.deselectAll();
        // Create a new cell for the source to preserve history.
        const newModel = Private.cloneCell(model, primary.model);
        newModel.value.text = toMerge.join('\n\n');
        if ((0,_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__.isCodeCellModel)(newModel)) {
            newModel.outputs.clear();
        }
        else if ((0,_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__.isMarkdownCellModel)(newModel) || (0,_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__.isRawCellModel)(newModel)) {
            newModel.attachments.fromJSON(attachments);
        }
        // Make the changes while preserving history.
        cells.beginCompoundOperation();
        cells.set(active, newModel);
        toDelete.forEach(cell => {
            cells.removeValue(cell);
        });
        cells.endCompoundOperation();
        // If the original cell is a markdown cell, make sure
        // the new cell is unrendered.
        if (primary instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__.MarkdownCell) {
            notebook.activeCell.rendered = false;
        }
        Private.handleState(notebook, state);
    }
    NotebookActions.mergeCells = mergeCells;
    /**
     * Delete the selected cells.
     *
     * @param notebook - The target notebook widget.
     *
     * #### Notes
     * The cell after the last selected cell will be activated.
     * It will add a code cell if all cells are deleted.
     * This action can be undone.
     */
    function deleteCells(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        if (!Private.isNotebookRendered(notebook)) {
            return;
        }
        const state = Private.getState(notebook);
        Private.deleteCells(notebook);
        Private.handleState(notebook, state, true);
    }
    NotebookActions.deleteCells = deleteCells;
    /**
     * Insert a new code cell above the active cell.
     *
     * @param notebook - The target notebook widget.
     *
     * #### Notes
     * The widget mode will be preserved.
     * This action can be undone.
     * The existing selection will be cleared.
     * The new cell will the active cell.
     */
    function insertAbove(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        if (!Private.isNotebookRendered(notebook)) {
            return;
        }
        const state = Private.getState(notebook);
        const model = notebook.model;
        const cell = model.contentFactory.createCell(notebook.notebookConfig.defaultCell, {});
        const active = notebook.activeCellIndex;
        model.cells.insert(active, cell);
        // Make the newly inserted cell active.
        notebook.activeCellIndex = active;
        notebook.deselectAll();
        Private.handleState(notebook, state, true);
    }
    NotebookActions.insertAbove = insertAbove;
    /**
     * Insert a new code cell below the active cell.
     *
     * @param notebook - The target notebook widget.
     *
     * #### Notes
     * The widget mode will be preserved.
     * This action can be undone.
     * The existing selection will be cleared.
     * The new cell will be the active cell.
     */
    function insertBelow(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        if (!Private.isNotebookRendered(notebook)) {
            return;
        }
        const state = Private.getState(notebook);
        const model = notebook.model;
        const cell = model.contentFactory.createCell(notebook.notebookConfig.defaultCell, {});
        model.cells.insert(notebook.activeCellIndex + 1, cell);
        // Make the newly inserted cell active.
        notebook.activeCellIndex++;
        notebook.deselectAll();
        Private.handleState(notebook, state, true);
    }
    NotebookActions.insertBelow = insertBelow;
    /**
     * Move the selected cell(s) down.
     *
     * @param notebook = The target notebook widget.
     */
    function moveDown(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        if (!Private.isNotebookRendered(notebook)) {
            return;
        }
        const state = Private.getState(notebook);
        const cells = notebook.model.cells;
        const widgets = notebook.widgets;
        cells.beginCompoundOperation();
        for (let i = cells.length - 2; i > -1; i--) {
            if (notebook.isSelectedOrActive(widgets[i])) {
                if (!notebook.isSelectedOrActive(widgets[i + 1])) {
                    cells.move(i, i + 1);
                    if (notebook.activeCellIndex === i) {
                        notebook.activeCellIndex++;
                    }
                    notebook.select(widgets[i + 1]);
                    notebook.deselect(widgets[i]);
                }
            }
        }
        cells.endCompoundOperation();
        Private.handleState(notebook, state, true);
    }
    NotebookActions.moveDown = moveDown;
    /**
     * Move the selected cell(s) up.
     *
     * @param widget - The target notebook widget.
     */
    function moveUp(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        if (!Private.isNotebookRendered(notebook)) {
            return;
        }
        const state = Private.getState(notebook);
        const cells = notebook.model.cells;
        const widgets = notebook.widgets;
        cells.beginCompoundOperation();
        for (let i = 1; i < cells.length; i++) {
            if (notebook.isSelectedOrActive(widgets[i])) {
                if (!notebook.isSelectedOrActive(widgets[i - 1])) {
                    cells.move(i, i - 1);
                    if (notebook.activeCellIndex === i) {
                        notebook.activeCellIndex--;
                    }
                    notebook.select(widgets[i - 1]);
                    notebook.deselect(widgets[i]);
                }
            }
        }
        cells.endCompoundOperation();
        Private.handleState(notebook, state, true);
    }
    NotebookActions.moveUp = moveUp;
    /**
     * Change the selected cell type(s).
     *
     * @param notebook - The target notebook widget.
     *
     * @param value - The target cell type.
     *
     * #### Notes
     * It should preserve the widget mode.
     * This action can be undone.
     * The existing selection will be cleared.
     * Any cells converted to markdown will be unrendered.
     */
    function changeCellType(notebook, value) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = Private.getState(notebook);
        Private.changeCellType(notebook, value);
        Private.handleState(notebook, state);
    }
    NotebookActions.changeCellType = changeCellType;
    /**
     * Run the selected cell(s).
     *
     * @param notebook - The target notebook widget.
     *
     * @param sessionContext - The optional client session object.
     *
     * #### Notes
     * The last selected cell will be activated, but not scrolled into view.
     * The existing selection will be cleared.
     * An execution error will prevent the remaining code cells from executing.
     * All markdown cells will be rendered.
     */
    function run(notebook, sessionContext) {
        if (!notebook.model || !notebook.activeCell) {
            return Promise.resolve(false);
        }
        const state = Private.getState(notebook);
        const promise = Private.runSelected(notebook, sessionContext);
        Private.handleRunState(notebook, state, false);
        return promise;
    }
    NotebookActions.run = run;
    /**
     * Run the selected cell(s) and advance to the next cell.
     *
     * @param notebook - The target notebook widget.
     *
     * @param sessionContext - The optional client session object.
     *
     * #### Notes
     * The existing selection will be cleared.
     * The cell after the last selected cell will be activated and scrolled into view.
     * An execution error will prevent the remaining code cells from executing.
     * All markdown cells will be rendered.
     * If the last selected cell is the last cell, a new code cell
     * will be created in `'edit'` mode.  The new cell creation can be undone.
     */
    function runAndAdvance(notebook, sessionContext) {
        if (!notebook.model || !notebook.activeCell) {
            return Promise.resolve(false);
        }
        const state = Private.getState(notebook);
        const promise = Private.runSelected(notebook, sessionContext);
        const model = notebook.model;
        if (notebook.activeCellIndex === notebook.widgets.length - 1) {
            const cell = model.contentFactory.createCell(notebook.notebookConfig.defaultCell, {});
            // Do not use push here, as we want an widget insertion
            // to make sure no placeholder widget is rendered.
            model.cells.insert(notebook.widgets.length, cell);
            notebook.activeCellIndex++;
            notebook.mode = 'edit';
        }
        else {
            notebook.activeCellIndex++;
        }
        Private.handleRunState(notebook, state, true);
        return promise;
    }
    NotebookActions.runAndAdvance = runAndAdvance;
    /**
     * Run the selected cell(s) and insert a new code cell.
     *
     * @param notebook - The target notebook widget.
     *
     * @param sessionContext - The optional client session object.
     *
     * #### Notes
     * An execution error will prevent the remaining code cells from executing.
     * All markdown cells will be rendered.
     * The widget mode will be set to `'edit'` after running.
     * The existing selection will be cleared.
     * The cell insert can be undone.
     * The new cell will be scrolled into view.
     */
    function runAndInsert(notebook, sessionContext) {
        if (!notebook.model || !notebook.activeCell) {
            return Promise.resolve(false);
        }
        if (!Private.isNotebookRendered(notebook)) {
            return Promise.resolve(false);
        }
        const state = Private.getState(notebook);
        const promise = Private.runSelected(notebook, sessionContext);
        const model = notebook.model;
        const cell = model.contentFactory.createCell(notebook.notebookConfig.defaultCell, {});
        model.cells.insert(notebook.activeCellIndex + 1, cell);
        notebook.activeCellIndex++;
        notebook.mode = 'edit';
        Private.handleRunState(notebook, state, true);
        return promise;
    }
    NotebookActions.runAndInsert = runAndInsert;
    /**
     * Run all of the cells in the notebook.
     *
     * @param notebook - The target notebook widget.
     *
     * @param sessionContext - The optional client session object.
     *
     * #### Notes
     * The existing selection will be cleared.
     * An execution error will prevent the remaining code cells from executing.
     * All markdown cells will be rendered.
     * The last cell in the notebook will be activated and scrolled into view.
     */
    function runAll(notebook, sessionContext) {
        if (!notebook.model || !notebook.activeCell) {
            return Promise.resolve(false);
        }
        const state = Private.getState(notebook);
        notebook.widgets.forEach(child => {
            notebook.select(child);
        });
        const promise = Private.runSelected(notebook, sessionContext);
        Private.handleRunState(notebook, state, true);
        return promise;
    }
    NotebookActions.runAll = runAll;
    function renderAllMarkdown(notebook, sessionContext) {
        if (!notebook.model || !notebook.activeCell) {
            return Promise.resolve(false);
        }
        const previousIndex = notebook.activeCellIndex;
        const state = Private.getState(notebook);
        notebook.widgets.forEach((child, index) => {
            if (child.model.type === 'markdown') {
                notebook.select(child);
                // This is to make sure that the activeCell
                // does not get executed
                notebook.activeCellIndex = index;
            }
        });
        if (notebook.activeCell.model.type !== 'markdown') {
            return Promise.resolve(true);
        }
        const promise = Private.runSelected(notebook, sessionContext);
        notebook.activeCellIndex = previousIndex;
        Private.handleRunState(notebook, state, true);
        return promise;
    }
    NotebookActions.renderAllMarkdown = renderAllMarkdown;
    /**
     * Run all of the cells before the currently active cell (exclusive).
     *
     * @param notebook - The target notebook widget.
     *
     * @param sessionContext - The optional client session object.
     *
     * #### Notes
     * The existing selection will be cleared.
     * An execution error will prevent the remaining code cells from executing.
     * All markdown cells will be rendered.
     * The currently active cell will remain selected.
     */
    function runAllAbove(notebook, sessionContext) {
        const { activeCell, activeCellIndex, model } = notebook;
        if (!model || !activeCell || activeCellIndex < 1) {
            return Promise.resolve(false);
        }
        const state = Private.getState(notebook);
        notebook.activeCellIndex--;
        notebook.deselectAll();
        for (let i = 0; i < notebook.activeCellIndex; ++i) {
            notebook.select(notebook.widgets[i]);
        }
        const promise = Private.runSelected(notebook, sessionContext);
        notebook.activeCellIndex++;
        Private.handleRunState(notebook, state, true);
        return promise;
    }
    NotebookActions.runAllAbove = runAllAbove;
    /**
     * Run all of the cells after the currently active cell (inclusive).
     *
     * @param notebook - The target notebook widget.
     *
     * @param sessionContext - The optional client session object.
     *
     * #### Notes
     * The existing selection will be cleared.
     * An execution error will prevent the remaining code cells from executing.
     * All markdown cells will be rendered.
     * The last cell in the notebook will be activated and scrolled into view.
     */
    function runAllBelow(notebook, sessionContext) {
        if (!notebook.model || !notebook.activeCell) {
            return Promise.resolve(false);
        }
        const state = Private.getState(notebook);
        notebook.deselectAll();
        for (let i = notebook.activeCellIndex; i < notebook.widgets.length; ++i) {
            notebook.select(notebook.widgets[i]);
        }
        const promise = Private.runSelected(notebook, sessionContext);
        Private.handleRunState(notebook, state, true);
        return promise;
    }
    NotebookActions.runAllBelow = runAllBelow;
    /**
     * Replaces the selection in the active cell of the notebook.
     *
     * @param notebook - The target notebook widget.
     * @param text - The text to replace the selection.
     */
    function replaceSelection(notebook, text) {
        var _a, _b;
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        (_b = (_a = notebook.activeCell.editor).replaceSelection) === null || _b === void 0 ? void 0 : _b.call(_a, text);
    }
    NotebookActions.replaceSelection = replaceSelection;
    /**
     * Select the above the active cell.
     *
     * @param notebook - The target notebook widget.
     *
     * #### Notes
     * The widget mode will be preserved.
     * This is a no-op if the first cell is the active cell.
     * This will skip any collapsed cells.
     * The existing selection will be cleared.
     */
    function selectAbove(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        if (notebook.activeCellIndex === 0) {
            return;
        }
        let possibleNextCellIndex = notebook.activeCellIndex - 1;
        // find first non hidden cell above current cell
        while (possibleNextCellIndex >= 0) {
            const possibleNextCell = notebook.widgets[possibleNextCellIndex];
            if (!possibleNextCell.inputHidden && !possibleNextCell.isHidden) {
                break;
            }
            possibleNextCellIndex -= 1;
        }
        const state = Private.getState(notebook);
        notebook.activeCellIndex = possibleNextCellIndex;
        notebook.deselectAll();
        Private.handleState(notebook, state, true);
    }
    NotebookActions.selectAbove = selectAbove;
    /**
     * Select the cell below the active cell.
     *
     * @param notebook - The target notebook widget.
     *
     * #### Notes
     * The widget mode will be preserved.
     * This is a no-op if the last cell is the active cell.
     * This will skip any collapsed cells.
     * The existing selection will be cleared.
     */
    function selectBelow(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        let maxCellIndex = notebook.widgets.length - 1;
        // Find last non-hidden cell
        while (notebook.widgets[maxCellIndex].isHidden ||
            notebook.widgets[maxCellIndex].inputHidden) {
            maxCellIndex -= 1;
        }
        if (notebook.activeCellIndex === maxCellIndex) {
            return;
        }
        let possibleNextCellIndex = notebook.activeCellIndex + 1;
        // find first non hidden cell below current cell
        while (possibleNextCellIndex < maxCellIndex) {
            let possibleNextCell = notebook.widgets[possibleNextCellIndex];
            if (!possibleNextCell.inputHidden && !possibleNextCell.isHidden) {
                break;
            }
            possibleNextCellIndex += 1;
        }
        const state = Private.getState(notebook);
        notebook.activeCellIndex = possibleNextCellIndex;
        notebook.deselectAll();
        Private.handleState(notebook, state, true);
    }
    NotebookActions.selectBelow = selectBelow;
    /**
     * Extend the selection to the cell above.
     *
     * @param notebook - The target notebook widget.
     * @param toTop - If true, denotes selection to extend to the top.
     *
     * #### Notes
     * This is a no-op if the first cell is the active cell.
     * The new cell will be activated.
     */
    function extendSelectionAbove(notebook, toTop = false) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        // Do not wrap around.
        if (notebook.activeCellIndex === 0) {
            return;
        }
        const state = Private.getState(notebook);
        notebook.mode = 'command';
        // Check if toTop is true, if yes, selection is made to the top.
        if (toTop) {
            notebook.extendContiguousSelectionTo(0);
        }
        else {
            notebook.extendContiguousSelectionTo(notebook.activeCellIndex - 1);
        }
        Private.handleState(notebook, state, true);
    }
    NotebookActions.extendSelectionAbove = extendSelectionAbove;
    /**
     * Extend the selection to the cell below.
     *
     * @param notebook - The target notebook widget.
     * @param toBottom - If true, denotes selection to extend to the bottom.
     *
     * #### Notes
     * This is a no-op if the last cell is the active cell.
     * The new cell will be activated.
     */
    function extendSelectionBelow(notebook, toBottom = false) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        // Do not wrap around.
        if (notebook.activeCellIndex === notebook.widgets.length - 1) {
            return;
        }
        const state = Private.getState(notebook);
        notebook.mode = 'command';
        // Check if toBottom is true, if yes selection is made to the bottom.
        if (toBottom) {
            notebook.extendContiguousSelectionTo(notebook.widgets.length - 1);
        }
        else {
            notebook.extendContiguousSelectionTo(notebook.activeCellIndex + 1);
        }
        Private.handleState(notebook, state, true);
    }
    NotebookActions.extendSelectionBelow = extendSelectionBelow;
    /**
     * Select all of the cells of the notebook.
     *
     * @param notebook - the target notebook widget.
     */
    function selectAll(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        notebook.widgets.forEach(child => {
            notebook.select(child);
        });
    }
    NotebookActions.selectAll = selectAll;
    /**
     * Deselect all of the cells of the notebook.
     *
     * @param notebook - the target notebook widget.
     */
    function deselectAll(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        notebook.deselectAll();
    }
    NotebookActions.deselectAll = deselectAll;
    /**
     * Copy the selected cell(s) data to a clipboard.
     *
     * @param notebook - The target notebook widget.
     */
    function copy(notebook) {
        Private.copyOrCut(notebook, false);
    }
    NotebookActions.copy = copy;
    /**
     * Cut the selected cell data to a clipboard.
     *
     * @param notebook - The target notebook widget.
     *
     * #### Notes
     * This action can be undone.
     * A new code cell is added if all cells are cut.
     */
    function cut(notebook) {
        if (!Private.isNotebookRendered(notebook)) {
            return;
        }
        Private.copyOrCut(notebook, true);
    }
    NotebookActions.cut = cut;
    /**
     * Paste cells from the application clipboard.
     *
     * @param notebook - The target notebook widget.
     *
     * @param mode - the mode of adding cells:
     *   'below' (default) adds cells below the active cell,
     *   'belowSelected' adds cells below all selected cells,
     *   'above' adds cells above the active cell, and
     *   'replace' removes the currently selected cells and adds cells in their place.
     *
     * #### Notes
     * The last pasted cell becomes the active cell.
     * This is a no-op if there is no cell data on the clipboard.
     * This action can be undone.
     */
    function paste(notebook, mode = 'below') {
        if (!Private.isNotebookRendered(notebook)) {
            return;
        }
        const clipboard = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Clipboard.getInstance();
        if (!clipboard.hasData(JUPYTER_CELL_MIME)) {
            return;
        }
        const values = clipboard.getData(JUPYTER_CELL_MIME);
        addCells(notebook, mode, values, true);
    }
    NotebookActions.paste = paste;
    /**
     * Duplicate selected cells in the notebook without using the application clipboard.
     *
     * @param notebook - The target notebook widget.
     *
     * @param mode - the mode of adding cells:
     *   'below' (default) adds cells below the active cell,
     *   'belowSelected' adds cells below all selected cells,
     *   'above' adds cells above the active cell, and
     *   'replace' removes the currently selected cells and adds cells in their place.
     *
     * #### Notes
     * The last pasted cell becomes the active cell.
     * This is a no-op if there is no cell data on the clipboard.
     * This action can be undone.
     */
    function duplicate(notebook, mode = 'below') {
        const values = Private.selectedCells(notebook);
        if (!values || values.length === 0) {
            return;
        }
        addCells(notebook, mode, values, false); // Cells not from the clipboard
    }
    NotebookActions.duplicate = duplicate;
    /**
     * Adds cells to the notebook.
     *
     * @param notebook - The target notebook widget.
     *
     * @param mode - the mode of adding cells:
     *   'below' (default) adds cells below the active cell,
     *   'belowSelected' adds cells below all selected cells,
     *   'above' adds cells above the active cell, and
     *   'replace' removes the currently selected cells and adds cells in their place.
     *
     * @param values — The cells to add to the notebook.
     *
     * @param cellsFromClipboard — True if the cells were sourced from the clipboard.
     *
     * #### Notes
     * The last added cell becomes the active cell.
     * This is a no-op if values is an empty array.
     * This action can be undone.
     */
    function addCells(notebook, mode = 'below', values, cellsFromClipboard = false) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = Private.getState(notebook);
        const model = notebook.model;
        notebook.mode = 'command';
        const newCells = values.map(cell => {
            switch (cell.cell_type) {
                case 'code':
                    if (notebook.lastClipboardInteraction === 'cut' &&
                        typeof cell.id === 'string') {
                        let cell_id = cell.id;
                        return model.contentFactory.createCodeCell({
                            id: cell_id,
                            cell: cell
                        });
                    }
                    else {
                        return model.contentFactory.createCodeCell({ cell });
                    }
                case 'markdown':
                    return model.contentFactory.createMarkdownCell({ cell });
                default:
                    return model.contentFactory.createRawCell({ cell });
            }
        });
        const cells = notebook.model.cells;
        let index;
        cells.beginCompoundOperation();
        // Set the starting index of the paste operation depending upon the mode.
        switch (mode) {
            case 'below':
                index = notebook.activeCellIndex;
                break;
            case 'belowSelected':
                notebook.widgets.forEach((child, childIndex) => {
                    if (notebook.isSelectedOrActive(child)) {
                        index = childIndex;
                    }
                });
                break;
            case 'above':
                index = notebook.activeCellIndex - 1;
                break;
            case 'replace': {
                // Find the cells to delete.
                const toDelete = [];
                notebook.widgets.forEach((child, index) => {
                    const deletable = child.model.metadata.get('deletable') !== false;
                    if (notebook.isSelectedOrActive(child) && deletable) {
                        toDelete.push(index);
                    }
                });
                // If cells are not deletable, we may not have anything to delete.
                if (toDelete.length > 0) {
                    // Delete the cells as one undo event.
                    toDelete.reverse().forEach(i => {
                        cells.remove(i);
                    });
                }
                index = toDelete[0];
                break;
            }
            default:
                break;
        }
        newCells.forEach(cell => {
            cells.insert(++index, cell);
        });
        cells.endCompoundOperation();
        notebook.activeCellIndex += newCells.length;
        notebook.deselectAll();
        if (cellsFromClipboard) {
            notebook.lastClipboardInteraction = 'paste';
        }
        Private.handleState(notebook, state);
    }
    /**
     * Undo a cell action.
     *
     * @param notebook - The target notebook widget.
     *
     * #### Notes
     * This is a no-op if if there are no cell actions to undo.
     */
    function undo(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        if (!Private.isNotebookRendered(notebook)) {
            return;
        }
        const state = Private.getState(notebook);
        notebook.mode = 'command';
        notebook.model.sharedModel.undo();
        notebook.deselectAll();
        Private.handleState(notebook, state);
    }
    NotebookActions.undo = undo;
    /**
     * Redo a cell action.
     *
     * @param notebook - The target notebook widget.
     *
     * #### Notes
     * This is a no-op if there are no cell actions to redo.
     */
    function redo(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = Private.getState(notebook);
        notebook.mode = 'command';
        notebook.model.sharedModel.redo();
        notebook.deselectAll();
        Private.handleState(notebook, state);
    }
    NotebookActions.redo = redo;
    /**
     * Toggle the line number of all cells.
     *
     * @param notebook - The target notebook widget.
     *
     * #### Notes
     * The original state is based on the state of the active cell.
     * The `mode` of the widget will be preserved.
     */
    function toggleAllLineNumbers(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = Private.getState(notebook);
        const config = notebook.editorConfig;
        const lineNumbers = !(config.code.lineNumbers &&
            config.markdown.lineNumbers &&
            config.raw.lineNumbers);
        const newConfig = {
            code: Object.assign(Object.assign({}, config.code), { lineNumbers }),
            markdown: Object.assign(Object.assign({}, config.markdown), { lineNumbers }),
            raw: Object.assign(Object.assign({}, config.raw), { lineNumbers })
        };
        notebook.editorConfig = newConfig;
        Private.handleState(notebook, state);
    }
    NotebookActions.toggleAllLineNumbers = toggleAllLineNumbers;
    /**
     * Clear the code outputs of the selected cells.
     *
     * @param notebook - The target notebook widget.
     *
     * #### Notes
     * The widget `mode` will be preserved.
     */
    function clearOutputs(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = Private.getState(notebook);
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(notebook.model.cells, (cell, index) => {
            const child = notebook.widgets[index];
            if (notebook.isSelectedOrActive(child) && cell.type === 'code') {
                cell.clearExecution();
                child.outputHidden = false;
            }
        });
        Private.handleState(notebook, state, true);
    }
    NotebookActions.clearOutputs = clearOutputs;
    /**
     * Clear all the code outputs on the widget.
     *
     * @param notebook - The target notebook widget.
     *
     * #### Notes
     * The widget `mode` will be preserved.
     */
    function clearAllOutputs(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = Private.getState(notebook);
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(notebook.model.cells, (cell, index) => {
            const child = notebook.widgets[index];
            if (cell.type === 'code') {
                cell.clearExecution();
                child.outputHidden = false;
            }
        });
        Private.handleState(notebook, state, true);
    }
    NotebookActions.clearAllOutputs = clearAllOutputs;
    /**
     * Hide the code on selected code cells.
     *
     * @param notebook - The target notebook widget.
     */
    function hideCode(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = Private.getState(notebook);
        notebook.widgets.forEach(cell => {
            if (notebook.isSelectedOrActive(cell) && cell.model.type === 'code') {
                cell.inputHidden = true;
            }
        });
        Private.handleState(notebook, state);
    }
    NotebookActions.hideCode = hideCode;
    /**
     * Show the code on selected code cells.
     *
     * @param notebook - The target notebook widget.
     */
    function showCode(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = Private.getState(notebook);
        notebook.widgets.forEach(cell => {
            if (notebook.isSelectedOrActive(cell) && cell.model.type === 'code') {
                cell.inputHidden = false;
            }
        });
        Private.handleState(notebook, state);
    }
    NotebookActions.showCode = showCode;
    /**
     * Hide the code on all code cells.
     *
     * @param notebook - The target notebook widget.
     */
    function hideAllCode(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = Private.getState(notebook);
        notebook.widgets.forEach(cell => {
            if (cell.model.type === 'code') {
                cell.inputHidden = true;
            }
        });
        Private.handleState(notebook, state);
    }
    NotebookActions.hideAllCode = hideAllCode;
    /**
     * Show the code on all code cells.
     *
     * @param widget - The target notebook widget.
     */
    function showAllCode(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = Private.getState(notebook);
        notebook.widgets.forEach(cell => {
            if (cell.model.type === 'code') {
                cell.inputHidden = false;
            }
        });
        Private.handleState(notebook, state);
    }
    NotebookActions.showAllCode = showAllCode;
    /**
     * Hide the output on selected code cells.
     *
     * @param notebook - The target notebook widget.
     */
    function hideOutput(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = Private.getState(notebook);
        notebook.widgets.forEach(cell => {
            if (notebook.isSelectedOrActive(cell) && cell.model.type === 'code') {
                cell.outputHidden = true;
            }
        });
        Private.handleState(notebook, state, true);
    }
    NotebookActions.hideOutput = hideOutput;
    /**
     * Show the output on selected code cells.
     *
     * @param notebook - The target notebook widget.
     */
    function showOutput(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = Private.getState(notebook);
        notebook.widgets.forEach(cell => {
            if (notebook.isSelectedOrActive(cell) && cell.model.type === 'code') {
                cell.outputHidden = false;
            }
        });
        Private.handleState(notebook, state);
    }
    NotebookActions.showOutput = showOutput;
    /**
     * Hide the output on all code cells.
     *
     * @param notebook - The target notebook widget.
     */
    function hideAllOutputs(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = Private.getState(notebook);
        notebook.widgets.forEach(cell => {
            if (cell.model.type === 'code') {
                cell.outputHidden = true;
            }
        });
        Private.handleState(notebook, state, true);
    }
    NotebookActions.hideAllOutputs = hideAllOutputs;
    /**
     * Render side-by-side.
     *
     * @param notebook - The target notebook widget.
     */
    function renderSideBySide(notebook) {
        notebook.renderingLayout = 'side-by-side';
    }
    NotebookActions.renderSideBySide = renderSideBySide;
    /**
     * Render not side-by-side.
     *
     * @param notebook - The target notebook widget.
     */
    function renderDefault(notebook) {
        notebook.renderingLayout = 'default';
    }
    NotebookActions.renderDefault = renderDefault;
    /**
     * Show the output on all code cells.
     *
     * @param notebook - The target notebook widget.
     */
    function showAllOutputs(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = Private.getState(notebook);
        notebook.widgets.forEach(cell => {
            if (cell.model.type === 'code') {
                cell.outputHidden = false;
            }
        });
        Private.handleState(notebook, state);
    }
    NotebookActions.showAllOutputs = showAllOutputs;
    /**
     * Enable output scrolling for all selected cells.
     *
     * @param notebook - The target notebook widget.
     */
    function enableOutputScrolling(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = Private.getState(notebook);
        notebook.widgets.forEach(cell => {
            if (notebook.isSelectedOrActive(cell) && cell.model.type === 'code') {
                cell.outputsScrolled = true;
            }
        });
        Private.handleState(notebook, state, true);
    }
    NotebookActions.enableOutputScrolling = enableOutputScrolling;
    /**
     * Disable output scrolling for all selected cells.
     *
     * @param notebook - The target notebook widget.
     */
    function disableOutputScrolling(notebook) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = Private.getState(notebook);
        notebook.widgets.forEach(cell => {
            if (notebook.isSelectedOrActive(cell) && cell.model.type === 'code') {
                cell.outputsScrolled = false;
            }
        });
        Private.handleState(notebook, state);
    }
    NotebookActions.disableOutputScrolling = disableOutputScrolling;
    /**
     * Go to the last cell that is run or current if it is running.
     *
     * Note: This requires execution timing to be toggled on or this will have
     * no effect.
     *
     * @param notebook - The target notebook widget.
     */
    function selectLastRunCell(notebook) {
        let latestTime = null;
        let latestCellIdx = null;
        notebook.widgets.forEach((cell, cellIndx) => {
            if (cell.model.type === 'code') {
                const execution = cell.model.metadata.get('execution');
                if (execution &&
                    _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__.JSONExt.isObject(execution) &&
                    execution['iopub.status.busy'] !== undefined) {
                    // The busy status is used as soon as a request is received:
                    // https://jupyter-client.readthedocs.io/en/stable/messaging.html
                    const timestamp = execution['iopub.status.busy'].toString();
                    if (timestamp) {
                        const startTime = new Date(timestamp);
                        if (!latestTime || startTime >= latestTime) {
                            latestTime = startTime;
                            latestCellIdx = cellIndx;
                        }
                    }
                }
            }
        });
        if (latestCellIdx !== null) {
            notebook.activeCellIndex = latestCellIdx;
        }
    }
    NotebookActions.selectLastRunCell = selectLastRunCell;
    /**
     * Set the markdown header level.
     *
     * @param notebook - The target notebook widget.
     *
     * @param level - The header level.
     *
     * #### Notes
     * All selected cells will be switched to markdown.
     * The level will be clamped between 1 and 6.
     * If there is an existing header, it will be replaced.
     * There will always be one blank space after the header.
     * The cells will be unrendered.
     */
    function setMarkdownHeader(notebook, level) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = Private.getState(notebook);
        const cells = notebook.model.cells;
        level = Math.min(Math.max(level, 1), 6);
        notebook.widgets.forEach((child, index) => {
            if (notebook.isSelectedOrActive(child)) {
                Private.setMarkdownHeader(cells.get(index), level);
            }
        });
        Private.changeCellType(notebook, 'markdown');
        Private.handleState(notebook, state);
    }
    NotebookActions.setMarkdownHeader = setMarkdownHeader;
    /**
     * Collapse all cells in given notebook.
     *
     * @param notebook - The target notebook widget.
     */
    function collapseAll(notebook) {
        for (const cell of notebook.widgets) {
            if (NotebookActions.getHeadingInfo(cell).isHeading) {
                NotebookActions.setHeadingCollapse(cell, true, notebook);
                NotebookActions.setCellCollapse(cell, true);
            }
        }
    }
    NotebookActions.collapseAll = collapseAll;
    /**
     * Un-collapse all cells in given notebook.
     *
     * @param notebook - The target notebook widget.
     */
    function expandAllHeadings(notebook) {
        for (const cell of notebook.widgets) {
            if (NotebookActions.getHeadingInfo(cell).isHeading) {
                NotebookActions.setHeadingCollapse(cell, false, notebook);
                // similar to collapseAll.
                NotebookActions.setCellCollapse(cell, false);
            }
        }
    }
    NotebookActions.expandAllHeadings = expandAllHeadings;
    function findNearestParentHeader(cell, notebook) {
        const index = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.findIndex)(notebook.widgets, (possibleCell, index) => {
            return cell.model.id === possibleCell.model.id;
        });
        if (index === -1) {
            return;
        }
        // Finds the nearest header above the given cell. If the cell is a header itself, it does not return itself;
        // this can be checked directly by calling functions.
        if (index >= notebook.widgets.length) {
            return;
        }
        let childHeaderInfo = getHeadingInfo(notebook.widgets[index]);
        for (let cellN = index - 1; cellN >= 0; cellN--) {
            if (cellN < notebook.widgets.length) {
                let hInfo = getHeadingInfo(notebook.widgets[cellN]);
                if (hInfo.isHeading &&
                    hInfo.headingLevel < childHeaderInfo.headingLevel) {
                    return notebook.widgets[cellN];
                }
            }
        }
        // else no parent header found.
        return;
    }
    /**
     * Finds the "parent" heading of the given cell and expands.
     * Used for the case that a cell becomes active that is within a collapsed heading.
     * @param cell - "Child" cell that has become the active cell
     * @param notebook - The target notebook widget.
     */
    function expandParent(cell, notebook) {
        let nearestParentCell = findNearestParentHeader(cell, notebook);
        if (!nearestParentCell) {
            return;
        }
        if (!getHeadingInfo(nearestParentCell).collapsed &&
            !nearestParentCell.isHidden) {
            return;
        }
        if (nearestParentCell.isHidden) {
            expandParent(nearestParentCell, notebook);
        }
        if (getHeadingInfo(nearestParentCell).collapsed) {
            setHeadingCollapse(nearestParentCell, false, notebook);
        }
    }
    NotebookActions.expandParent = expandParent;
    /**
     * Finds the next heading that isn't a child of the given markdown heading.
     * @param cell - "Child" cell that has become the active cell
     * @param notebook - The target notebook widget.
     */
    function findNextParentHeading(cell, notebook) {
        let index = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.findIndex)(notebook.widgets, (possibleCell, index) => {
            return cell.model.id === possibleCell.model.id;
        });
        if (index === -1) {
            return -1;
        }
        let childHeaderInfo = getHeadingInfo(cell);
        for (index = index + 1; index < notebook.widgets.length; index++) {
            let hInfo = getHeadingInfo(notebook.widgets[index]);
            if (hInfo.isHeading &&
                hInfo.headingLevel <= childHeaderInfo.headingLevel) {
                return index;
            }
        }
        // else no parent header found. return the index of the last cell
        return notebook.widgets.length;
    }
    NotebookActions.findNextParentHeading = findNextParentHeading;
    /**
     * Set the given cell and ** all "child" cells **
     * to the given collapse / expand if cell is
     * a markdown header.
     *
     * @param cell - The cell
     * @param collapsing - Whether to collapse or expand the cell
     * @param notebook - The target notebook widget.
     */
    function setHeadingCollapse(cell, collapsing, notebook) {
        const which = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.findIndex)(notebook.widgets, (possibleCell, index) => {
            return cell.model.id === possibleCell.model.id;
        });
        if (which === -1) {
            return -1;
        }
        if (!notebook.widgets.length) {
            return which + 1;
        }
        let selectedHeadingInfo = NotebookActions.getHeadingInfo(cell);
        if (cell.isHidden ||
            !(cell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__.MarkdownCell) ||
            !selectedHeadingInfo.isHeading) {
            // otherwise collapsing and uncollapsing already hidden stuff can
            // cause some funny looking bugs.
            return which + 1;
        }
        let localCollapsed = false;
        let localCollapsedLevel = 0;
        // iterate through all cells after the active cell.
        let cellNum;
        for (cellNum = which + 1; cellNum < notebook.widgets.length; cellNum++) {
            let subCell = notebook.widgets[cellNum];
            let subCellHeadingInfo = NotebookActions.getHeadingInfo(subCell);
            if (subCellHeadingInfo.isHeading &&
                subCellHeadingInfo.headingLevel <= selectedHeadingInfo.headingLevel) {
                // then reached an equivalent or higher heading level than the
                // original the end of the collapse.
                cellNum -= 1;
                break;
            }
            if (localCollapsed &&
                subCellHeadingInfo.isHeading &&
                subCellHeadingInfo.headingLevel <= localCollapsedLevel) {
                // then reached the end of the local collapsed, so unset NotebookActions.
                localCollapsed = false;
            }
            if (collapsing || localCollapsed) {
                // then no extra handling is needed for further locally collapsed
                // headings.
                subCell.setHidden(true);
                continue;
            }
            if (subCellHeadingInfo.collapsed && subCellHeadingInfo.isHeading) {
                localCollapsed = true;
                localCollapsedLevel = subCellHeadingInfo.headingLevel;
                // but don't collapse the locally collapsed heading, so continue to
                // expand the heading. This will get noticed in the next round.
            }
            subCell.setHidden(false);
        }
        if (cellNum === notebook.widgets.length) {
            cell.numberChildNodes = cellNum - which - 1;
        }
        else {
            cell.numberChildNodes = cellNum - which;
        }
        NotebookActions.setCellCollapse(cell, collapsing);
        return cellNum + 1;
    }
    NotebookActions.setHeadingCollapse = setHeadingCollapse;
    /**
     * Toggles the collapse state of the active cell of the given notebook
     * and ** all of its "child" cells ** if the cell is a heading.
     *
     * @param notebook - The target notebook widget.
     */
    function toggleCurrentHeadingCollapse(notebook) {
        if (!notebook.activeCell || notebook.activeCellIndex === undefined) {
            return;
        }
        let headingInfo = NotebookActions.getHeadingInfo(notebook.activeCell);
        if (headingInfo.isHeading) {
            // Then toggle!
            NotebookActions.setHeadingCollapse(notebook.activeCell, !headingInfo.collapsed, notebook);
        }
        _lumino_domutils__WEBPACK_IMPORTED_MODULE_5__.ElementExt.scrollIntoViewIfNeeded(notebook.node, notebook.activeCell.node);
    }
    NotebookActions.toggleCurrentHeadingCollapse = toggleCurrentHeadingCollapse;
    /**
     * If cell is a markdown heading, sets the headingCollapsed field,
     * and otherwise hides the cell.
     *
     * @param cell - The cell to collapse / expand
     * @param collapsing - Whether to collapse or expand the given cell
     */
    function setCellCollapse(cell, collapsing) {
        if (cell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__.MarkdownCell) {
            cell.headingCollapsed = collapsing;
        }
        else {
            cell.setHidden(collapsing);
        }
    }
    NotebookActions.setCellCollapse = setCellCollapse;
    /**
     * If given cell is a markdown heading, returns the heading level.
     * If given cell is not markdown, returns 7 (there are only 6 levels of markdown headings)
     *
     * @param cell - The target cell widget.
     */
    function getHeadingInfo(cell) {
        if (!(cell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__.MarkdownCell)) {
            return { isHeading: false, headingLevel: 7 };
        }
        let level = cell.headingInfo.level;
        let collapsed = cell.headingCollapsed;
        return { isHeading: level > 0, headingLevel: level, collapsed: collapsed };
    }
    NotebookActions.getHeadingInfo = getHeadingInfo;
    /**
     * Trust the notebook after prompting the user.
     *
     * @param notebook - The target notebook widget.
     *
     * @returns a promise that resolves when the transaction is finished.
     *
     * #### Notes
     * No dialog will be presented if the notebook is already trusted.
     */
    function trust(notebook, translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        const trans = translator.load('jupyterlab');
        if (!notebook.model) {
            return Promise.resolve();
        }
        // Do nothing if already trusted.
        const cells = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.toArray)(notebook.model.cells);
        const trusted = cells.every(cell => cell.trusted);
        // FIXME
        const trustMessage = (react__WEBPACK_IMPORTED_MODULE_7__.createElement("p", null,
            trans.__('A trusted Jupyter notebook may execute hidden malicious code when you open it.'),
            react__WEBPACK_IMPORTED_MODULE_7__.createElement("br", null),
            trans.__('Selecting trust will re-render this notebook in a trusted state.'),
            react__WEBPACK_IMPORTED_MODULE_7__.createElement("br", null),
            trans.__('For more information, see'),
            ' ',
            react__WEBPACK_IMPORTED_MODULE_7__.createElement("a", { href: "https://jupyter-server.readthedocs.io/en/stable/operators/security.html", target: "_blank", rel: "noopener noreferrer" }, trans.__('the Jupyter security documentation'))));
        if (trusted) {
            return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                body: trans.__('Notebook is already trusted'),
                buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: trans.__('Ok') })]
            }).then(() => undefined);
        }
        return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
            body: trustMessage,
            title: trans.__('Trust this notebook?'),
            buttons: [
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: trans.__('Cancel') }),
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: trans.__('Ok') })
            ] // FIXME?
        }).then(result => {
            if (result.button.accept) {
                cells.forEach(cell => {
                    cell.trusted = true;
                });
            }
        });
    }
    NotebookActions.trust = trust;
})(NotebookActions || (NotebookActions = {}));
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * A signal that emits whenever a cell completes execution.
     */
    Private.executed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_6__.Signal({});
    /**
     * A signal that emits whenever a cell execution is scheduled.
     */
    Private.executionScheduled = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_6__.Signal({});
    /**
     * A signal that emits when one notebook's cells are all executed.
     */
    Private.selectionExecuted = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_6__.Signal({});
    function isNotebookRendered(notebook) {
        const translator = notebook.translator;
        const trans = translator.load('jupyterlab');
        if (notebook.remainingCellToRenderCount !== 0) {
            (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                body: trans.__(`Notebook is still rendering and has for now (%1) remaining cells to render.

Please wait for the complete rendering before invoking that action.`, notebook.remainingCellToRenderCount),
                buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: trans.__('Ok') })]
            }).catch(reason => {
                console.error('An error occurred when displaying notebook rendering warning', reason);
            });
            return false;
        }
        return true;
    }
    Private.isNotebookRendered = isNotebookRendered;
    /**
     * Get the state of a widget before running an action.
     */
    function getState(notebook) {
        return {
            wasFocused: notebook.node.contains(document.activeElement),
            activeCell: notebook.activeCell
        };
    }
    Private.getState = getState;
    /**
     * Handle the state of a widget after running an action.
     */
    function handleState(notebook, state, scrollIfNeeded = false) {
        const { activeCell, node } = notebook;
        if (state.wasFocused || notebook.mode === 'edit') {
            notebook.activate();
        }
        if (scrollIfNeeded && activeCell) {
            _lumino_domutils__WEBPACK_IMPORTED_MODULE_5__.ElementExt.scrollIntoViewIfNeeded(node, activeCell.node);
        }
    }
    Private.handleState = handleState;
    /**
     * Handle the state of a widget after running a run action.
     */
    function handleRunState(notebook, state, scroll = false) {
        if (state.wasFocused || notebook.mode === 'edit') {
            notebook.activate();
        }
        if (scroll && state.activeCell) {
            // Scroll to the top of the previous active cell output.
            const rect = state.activeCell.inputArea.node.getBoundingClientRect();
            notebook.scrollToPosition(rect.bottom, 45);
        }
    }
    Private.handleRunState = handleRunState;
    /**
     * Clone a cell model.
     */
    function cloneCell(model, cell) {
        switch (cell.type) {
            case 'code':
                // TODO why isn't modeldb or id passed here?
                return model.contentFactory.createCodeCell({ cell: cell.toJSON() });
            case 'markdown':
                // TODO why isn't modeldb or id passed here?
                return model.contentFactory.createMarkdownCell({ cell: cell.toJSON() });
            default:
                // TODO why isn't modeldb or id passed here?
                return model.contentFactory.createRawCell({ cell: cell.toJSON() });
        }
    }
    Private.cloneCell = cloneCell;
    /**
     * Run the selected cells.
     */
    function runSelected(notebook, sessionContext) {
        notebook.mode = 'command';
        let lastIndex = notebook.activeCellIndex;
        const selected = notebook.widgets.filter((child, index) => {
            const active = notebook.isSelectedOrActive(child);
            if (active) {
                lastIndex = index;
            }
            return active;
        });
        notebook.activeCellIndex = lastIndex;
        notebook.deselectAll();
        return Promise.all(selected.map(child => runCell(notebook, child, sessionContext)))
            .then(results => {
            if (notebook.isDisposed) {
                return false;
            }
            Private.selectionExecuted.emit({
                notebook,
                lastCell: notebook.widgets[lastIndex]
            });
            // Post an update request.
            notebook.update();
            return results.every(result => result);
        })
            .catch(reason => {
            if (reason.message.startsWith('KernelReplyNotOK')) {
                selected.map(cell => {
                    // Remove '*' prompt from cells that didn't execute
                    if (cell.model.type === 'code' &&
                        cell.model.executionCount == null) {
                        cell.setPrompt('');
                    }
                });
            }
            else {
                throw reason;
            }
            Private.selectionExecuted.emit({
                notebook,
                lastCell: notebook.widgets[lastIndex]
            });
            notebook.update();
            return false;
        });
    }
    Private.runSelected = runSelected;
    /**
     * Run a cell.
     */
    function runCell(notebook, cell, sessionContext, translator) {
        var _a, _b, _c;
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        const trans = translator.load('jupyterlab');
        switch (cell.model.type) {
            case 'markdown':
                cell.rendered = true;
                cell.inputHidden = false;
                Private.executed.emit({ notebook, cell, success: true });
                break;
            case 'code':
                if (sessionContext) {
                    if (sessionContext.isTerminating) {
                        void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                            title: trans.__('Kernel Terminating'),
                            body: trans.__('The kernel for %1 appears to be terminating. You can not run any cell for now.', (_a = sessionContext.session) === null || _a === void 0 ? void 0 : _a.path),
                            buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: trans.__('Ok') })]
                        });
                        break;
                    }
                    if (sessionContext.pendingInput) {
                        void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                            title: trans.__('Cell not executed due to pending input'),
                            body: trans.__('The cell has not been executed to avoid kernel deadlock as there is another pending input! Submit your pending input and try again.'),
                            buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: trans.__('Ok') })]
                        });
                        return Promise.resolve(false);
                    }
                    if (sessionContext.hasNoKernel) {
                        void _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.sessionContextDialogs.selectKernel(sessionContext);
                        return Promise.resolve(false);
                    }
                    const deletedCells = (_c = (_b = notebook.model) === null || _b === void 0 ? void 0 : _b.deletedCells) !== null && _c !== void 0 ? _c : [];
                    Private.executionScheduled.emit({ notebook, cell });
                    return _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__.CodeCell.execute(cell, sessionContext, {
                        deletedCells,
                        recordTiming: notebook.notebookConfig.recordTiming
                    })
                        .then(reply => {
                        deletedCells.splice(0, deletedCells.length);
                        if (cell.isDisposed) {
                            return false;
                        }
                        if (!reply) {
                            return true;
                        }
                        if (reply.content.status === 'ok') {
                            const content = reply.content;
                            if (content.payload && content.payload.length) {
                                handlePayload(content, notebook, cell);
                            }
                            return true;
                        }
                        else {
                            throw new KernelError(reply.content);
                        }
                    })
                        .catch(reason => {
                        if (cell.isDisposed || reason.message.startsWith('Canceled')) {
                            return false;
                        }
                        Private.executed.emit({ notebook, cell, success: false, error: reason });
                        throw reason;
                    })
                        .then(ran => {
                        if (ran) {
                            Private.executed.emit({ notebook, cell, success: true });
                        }
                        return ran;
                    });
                }
                cell.model.clearExecution();
                break;
            default:
                break;
        }
        return Promise.resolve(true);
    }
    /**
     * Handle payloads from an execute reply.
     *
     * #### Notes
     * Payloads are deprecated and there are no official interfaces for them in
     * the kernel type definitions.
     * See [Payloads (DEPRECATED)](https://jupyter-client.readthedocs.io/en/latest/messaging.html#payloads-deprecated).
     */
    function handlePayload(content, notebook, cell) {
        var _a;
        const setNextInput = (_a = content.payload) === null || _a === void 0 ? void 0 : _a.filter(i => {
            return i.source === 'set_next_input';
        })[0];
        if (!setNextInput) {
            return;
        }
        const text = setNextInput.text;
        const replace = setNextInput.replace;
        if (replace) {
            cell.model.value.text = text;
            return;
        }
        // Create a new code cell and add as the next cell.
        const newCell = notebook.model.contentFactory.createCodeCell({});
        const cells = notebook.model.cells;
        const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.firstIndexOf((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.toArray)(cells), cell.model);
        newCell.value.text = text;
        if (index === -1) {
            cells.push(newCell);
        }
        else {
            cells.insert(index + 1, newCell);
        }
    }
    /**
     * Get the selected cell(s) without affecting the clipboard.
     *
     * @param notebook - The target notebook widget.
     *
     * @returns A list of 0 or more selected cells
     */
    function selectedCells(notebook) {
        return notebook.widgets
            .filter(cell => notebook.isSelectedOrActive(cell))
            .map(cell => cell.model.toJSON())
            .map(cellJSON => {
            if (cellJSON.metadata.deletable !== undefined) {
                delete cellJSON.metadata.deletable;
            }
            return cellJSON;
        });
    }
    Private.selectedCells = selectedCells;
    /**
     * Copy or cut the selected cell data to the application clipboard.
     *
     * @param notebook - The target notebook widget.
     *
     * @param cut - True if the cells should be cut, false if they should be copied.
     */
    function copyOrCut(notebook, cut) {
        if (!notebook.model || !notebook.activeCell) {
            return;
        }
        const state = getState(notebook);
        const clipboard = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Clipboard.getInstance();
        notebook.mode = 'command';
        clipboard.clear();
        const data = Private.selectedCells(notebook);
        clipboard.setData(JUPYTER_CELL_MIME, data);
        if (cut) {
            deleteCells(notebook);
        }
        else {
            notebook.deselectAll();
        }
        if (cut) {
            notebook.lastClipboardInteraction = 'cut';
        }
        else {
            notebook.lastClipboardInteraction = 'copy';
        }
        handleState(notebook, state);
    }
    Private.copyOrCut = copyOrCut;
    /**
     * Change the selected cell type(s).
     *
     * @param notebook - The target notebook widget.
     *
     * @param value - The target cell type.
     *
     * #### Notes
     * It should preserve the widget mode.
     * This action can be undone.
     * The existing selection will be cleared.
     * Any cells converted to markdown will be unrendered.
     */
    function changeCellType(notebook, value) {
        const model = notebook.model;
        const cells = model.cells;
        cells.beginCompoundOperation();
        notebook.widgets.forEach((child, index) => {
            if (!notebook.isSelectedOrActive(child)) {
                return;
            }
            if (child.model.type !== value) {
                const cell = child.model.toJSON();
                let newCell;
                switch (value) {
                    case 'code':
                        newCell = model.contentFactory.createCodeCell({ cell });
                        break;
                    case 'markdown':
                        newCell = model.contentFactory.createMarkdownCell({ cell });
                        if (child.model.type === 'code') {
                            newCell.trusted = false;
                        }
                        break;
                    default:
                        newCell = model.contentFactory.createRawCell({ cell });
                        if (child.model.type === 'code') {
                            newCell.trusted = false;
                        }
                }
                cells.set(index, newCell);
            }
            if (value === 'markdown') {
                // Fetch the new widget and unrender it.
                child = notebook.widgets[index];
                child.rendered = false;
            }
        });
        cells.endCompoundOperation();
        notebook.deselectAll();
    }
    Private.changeCellType = changeCellType;
    /**
     * Delete the selected cells.
     *
     * @param notebook - The target notebook widget.
     *
     * #### Notes
     * The cell after the last selected cell will be activated.
     * If the last cell is deleted, then the previous one will be activated.
     * It will add a code cell if all cells are deleted.
     * This action can be undone.
     */
    function deleteCells(notebook) {
        const model = notebook.model;
        const cells = model.cells;
        const toDelete = [];
        notebook.mode = 'command';
        // Find the cells to delete.
        notebook.widgets.forEach((child, index) => {
            const deletable = child.model.metadata.get('deletable') !== false;
            if (notebook.isSelectedOrActive(child) && deletable) {
                toDelete.push(index);
                model.deletedCells.push(child.model.id);
            }
        });
        // If cells are not deletable, we may not have anything to delete.
        if (toDelete.length > 0) {
            // Delete the cells as one undo event.
            cells.beginCompoundOperation();
            // Delete cells in reverse order to maintain the correct indices.
            toDelete.reverse().forEach(index => {
                cells.remove(index);
            });
            // Add a new cell if the notebook is empty. This is done
            // within the compound operation to make the deletion of
            // a notebook's last cell undoable.
            if (!cells.length) {
                cells.push(model.contentFactory.createCell(notebook.notebookConfig.defaultCell, {}));
            }
            cells.endCompoundOperation();
            // Select the *first* interior cell not deleted or the cell
            // *after* the last selected cell.
            // Note: The activeCellIndex is clamped to the available cells,
            // so if the last cell is deleted the previous cell will be activated.
            // The *first* index is the index of the last cell in the initial
            // toDelete list due to the `reverse` operation above.
            notebook.activeCellIndex = toDelete[0] - toDelete.length + 1;
        }
        // Deselect any remaining, undeletable cells. Do this even if we don't
        // delete anything so that users are aware *something* happened.
        notebook.deselectAll();
    }
    Private.deleteCells = deleteCells;
    /**
     * Set the markdown header level of a cell.
     */
    function setMarkdownHeader(cell, level) {
        // Remove existing header or leading white space.
        let source = cell.value.text;
        const regex = /^(#+\s*)|^(\s*)/;
        const newHeader = Array(level + 1).join('#') + ' ';
        const matches = regex.exec(source);
        if (matches) {
            source = source.slice(matches[0].length);
        }
        cell.value.text = newHeader + source;
    }
    Private.setMarkdownHeader = setMarkdownHeader;
})(Private || (Private = {}));
//# sourceMappingURL=actions.js.map

/***/ }),

/***/ "../../packages/notebook/lib/celllist.js":
/*!***********************************************!*\
  !*** ../../packages/notebook/lib/celllist.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CellList": () => (/* binding */ CellList)
/* harmony export */ });
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/observables */ "webpack/sharing/consume/default/@jupyterlab/observables/@jupyterlab/observables");
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/shared-models */ "webpack/sharing/consume/default/@jupyterlab/shared-models/@jupyterlab/shared-models");
/* harmony import */ var _jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_3__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.




/**
 * A cell list object that supports undo/redo.
 */
class CellList {
    /**
     * Construct the cell list.
     */
    constructor(modelDB, factory, model) {
        /**
         * Prevents that the modeldb event handler is executed when the shared-model event handler is executed and vice-versa.
         */
        this._mutex = _jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_1__.createMutex();
        this._isDisposed = false;
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal(this);
        this._factory = factory;
        this._cellOrder = modelDB.createList('cellOrder');
        this._cellMap = new _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__.ObservableMap();
        this._cellOrder.changed.connect(this._onOrderChanged, this);
        this.nbmodel = model;
        this.nbmodel.changed.connect(this.onSharedModelChanged, this);
        this.changed.connect(this.onModelDBChanged, this);
    }
    onModelDBChanged(self, change) {
        this._mutex(() => {
            const nbmodel = this.nbmodel;
            nbmodel.transact(() => {
                if (change.type === 'set' || change.type === 'remove') {
                    nbmodel.deleteCellRange(change.oldIndex, change.oldIndex + change.oldValues.length);
                }
                if (change.type === 'set' ||
                    change.type === 'add' ||
                    change.type === 'move') {
                    const cells = change.newValues.map(cell => {
                        return cell.sharedModel.clone();
                    });
                    let insertLocation = change.newIndex;
                    if (change.type === 'move' && insertLocation > change.oldIndex) {
                        insertLocation += change.oldValues.length;
                    }
                    nbmodel.insertCells(insertLocation, cells);
                    change.newValues.forEach((cell, index) => {
                        cell.switchSharedModel(cells[index], false);
                    });
                }
                if (change.type === 'move') {
                    let from = change.oldIndex;
                    if (from >= change.newIndex) {
                        from += change.oldValues.length;
                    }
                    nbmodel.deleteCellRange(from, from + change.oldValues.length);
                }
            });
        });
    }
    onSharedModelChanged(self, change) {
        this._mutex(() => {
            var _a;
            let currpos = 0;
            (_a = change.cellsChange) === null || _a === void 0 ? void 0 : _a.forEach(delta => {
                if (delta.insert != null) {
                    const cells = delta.insert.map(nbcell => {
                        const cell = this._factory.createCell(nbcell.cell_type, {});
                        cell.switchSharedModel(nbcell, true);
                        return cell;
                    });
                    this.insertAll(currpos, cells);
                    currpos += delta.insert.length;
                }
                else if (delta.delete != null) {
                    this.removeRange(currpos, currpos + delta.delete);
                }
                else if (delta.retain != null) {
                    currpos += delta.retain;
                }
            });
        });
    }
    /**
     * A signal emitted when the cell list has changed.
     */
    get changed() {
        return this._changed;
    }
    /**
     * Test whether the cell list has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Test whether the list is empty.
     *
     * @returns `true` if the cell list is empty, `false` otherwise.
     *
     * #### Notes
     * This is a read-only property.
     *
     * #### Complexity
     * Constant.
     *
     * #### Iterator Validity
     * No changes.
     */
    get isEmpty() {
        return this._cellOrder.length === 0;
    }
    /**
     * Get the length of the cell list.
     *
     * @return The number of cells in the cell list.
     *
     * #### Notes
     * This is a read-only property.
     *
     * #### Complexity
     * Constant.
     *
     * #### Iterator Validity
     * No changes.
     */
    get length() {
        return this._cellOrder.length;
    }
    /**
     * Create an iterator over the cells in the cell list.
     *
     * @returns A new iterator starting at the front of the cell list.
     *
     * #### Complexity
     * Constant.
     *
     * #### Iterator Validity
     * No changes.
     */
    iter() {
        const arr = [];
        for (const id of (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.toArray)(this._cellOrder)) {
            arr.push(this._cellMap.get(id));
        }
        return new _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.ArrayIterator(arr);
    }
    /**
     * Dispose of the resources held by the cell list.
     */
    dispose() {
        if (this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal.clearData(this);
        // Clean up the cell map and cell order objects.
        for (const cell of this._cellMap.values()) {
            cell.dispose();
        }
        this._cellMap.dispose();
        this._cellOrder.dispose();
    }
    /**
     * Get the cell at the specified index.
     *
     * @param index - The positive integer index of interest.
     *
     * @returns The cell at the specified index.
     *
     * #### Complexity
     * Constant.
     *
     * #### Iterator Validity
     * No changes.
     *
     * #### Undefined Behavior
     * An `index` which is non-integral or out of range.
     */
    get(index) {
        return this._cellMap.get(this._cellOrder.get(index));
    }
    /**
     * Set the cell at the specified index.
     *
     * @param index - The positive integer index of interest.
     *
     * @param cell - The cell to set at the specified index.
     *
     * #### Complexity
     * Constant.
     *
     * #### Iterator Validity
     * No changes.
     *
     * #### Undefined Behavior
     * An `index` which is non-integral or out of range.
     *
     * #### Notes
     * This should be considered to transfer ownership of the
     * cell to the `CellList`. As such, `cell.dispose()` should
     * not be called by other actors.
     */
    set(index, cell) {
        // Set the internal data structures.
        this._cellMap.set(cell.id, cell);
        this._cellOrder.set(index, cell.id);
    }
    /**
     * Add a cell to the back of the cell list.
     *
     * @param cell - The cell to add to the back of the cell list.
     *
     * @returns The new length of the cell list.
     *
     * #### Complexity
     * Constant.
     *
     * #### Iterator Validity
     * No changes.
     *
     * #### Notes
     * This should be considered to transfer ownership of the
     * cell to the `CellList`. As such, `cell.dispose()` should
     * not be called by other actors.
     */
    push(cell) {
        // Set the internal data structures.
        this._cellMap.set(cell.id, cell);
        const num = this._cellOrder.push(cell.id);
        return num;
    }
    /**
     * Insert a cell into the cell list at a specific index.
     *
     * @param index - The index at which to insert the cell.
     *
     * @param cell - The cell to set at the specified index.
     *
     * @returns The new length of the cell list.
     *
     * #### Complexity
     * Linear.
     *
     * #### Iterator Validity
     * No changes.
     *
     * #### Notes
     * The `index` will be clamped to the bounds of the cell list.
     *
     * #### Undefined Behavior
     * An `index` which is non-integral.
     *
     * #### Notes
     * This should be considered to transfer ownership of the
     * cell to the `CellList`. As such, `cell.dispose()` should
     * not be called by other actors.
     */
    insert(index, cell) {
        // Set the internal data structures.
        this._cellMap.set(cell.id, cell);
        this._cellOrder.insert(index, cell.id);
    }
    /**
     * Remove the first occurrence of a cell from the cell list.
     *
     * @param cell - The cell of interest.
     *
     * @returns The index of the removed cell, or `-1` if the cell
     *   is not contained in the cell list.
     *
     * #### Complexity
     * Linear.
     *
     * #### Iterator Validity
     * Iterators pointing at the removed cell and beyond are invalidated.
     */
    removeValue(cell) {
        const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.ArrayExt.findFirstIndex((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.toArray)(this._cellOrder), id => this._cellMap.get(id) === cell);
        this.remove(index);
        return index;
    }
    /**
     * Remove and return the cell at a specific index.
     *
     * @param index - The index of the cell of interest.
     *
     * @returns The cell at the specified index, or `undefined` if the
     *   index is out of range.
     *
     * #### Complexity
     * Constant.
     *
     * #### Iterator Validity
     * Iterators pointing at the removed cell and beyond are invalidated.
     *
     * #### Undefined Behavior
     * An `index` which is non-integral.
     */
    remove(index) {
        const id = this._cellOrder.get(index);
        this._cellOrder.remove(index);
        const cell = this._cellMap.get(id);
        return cell;
    }
    /**
     * Remove all cells from the cell list.
     *
     * #### Complexity
     * Linear.
     *
     * #### Iterator Validity
     * All current iterators are invalidated.
     */
    clear() {
        this._cellOrder.clear();
    }
    /**
     * Move a cell from one index to another.
     *
     * @parm fromIndex - The index of the element to move.
     *
     * @param toIndex - The index to move the element to.
     *
     * #### Complexity
     * Constant.
     *
     * #### Iterator Validity
     * Iterators pointing at the lesser of the `fromIndex` and the `toIndex`
     * and beyond are invalidated.
     *
     * #### Undefined Behavior
     * A `fromIndex` or a `toIndex` which is non-integral.
     */
    move(fromIndex, toIndex) {
        this._cellOrder.move(fromIndex, toIndex);
    }
    /**
     * Push a set of cells to the back of the cell list.
     *
     * @param cells - An iterable or array-like set of cells to add.
     *
     * @returns The new length of the cell list.
     *
     * #### Complexity
     * Linear.
     *
     * #### Iterator Validity
     * No changes.
     *
     * #### Notes
     * This should be considered to transfer ownership of the
     * cells to the `CellList`. As such, `cell.dispose()` should
     * not be called by other actors.
     */
    pushAll(cells) {
        const newValues = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.toArray)(cells);
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.each)(newValues, cell => {
            // Set the internal data structures.
            this._cellMap.set(cell.id, cell);
            this._cellOrder.push(cell.id);
        });
        return this.length;
    }
    /**
     * Insert a set of items into the cell list at the specified index.
     *
     * @param index - The index at which to insert the cells.
     *
     * @param cells - The cells to insert at the specified index.
     *
     * @returns The new length of the cell list.
     *
     * #### Complexity.
     * Linear.
     *
     * #### Iterator Validity
     * No changes.
     *
     * #### Notes
     * The `index` will be clamped to the bounds of the cell list.
     *
     * #### Undefined Behavior.
     * An `index` which is non-integral.
     *
     * #### Notes
     * This should be considered to transfer ownership of the
     * cells to the `CellList`. As such, `cell.dispose()` should
     * not be called by other actors.
     */
    insertAll(index, cells) {
        const newValues = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.toArray)(cells);
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.each)(newValues, cell => {
            this._cellMap.set(cell.id, cell);
            // @todo it looks like this compound operation shoult start before the `each` loop.
            this._cellOrder.beginCompoundOperation();
            this._cellOrder.insert(index++, cell.id);
            this._cellOrder.endCompoundOperation();
        });
        return this.length;
    }
    /**
     * Remove a range of items from the cell list.
     *
     * @param startIndex - The start index of the range to remove (inclusive).
     *
     * @param endIndex - The end index of the range to remove (exclusive).
     *
     * @returns The new length of the cell list.
     *
     * #### Complexity
     * Linear.
     *
     * #### Iterator Validity
     * Iterators pointing to the first removed cell and beyond are invalid.
     *
     * #### Undefined Behavior
     * A `startIndex` or `endIndex` which is non-integral.
     */
    removeRange(startIndex, endIndex) {
        this._cellOrder.removeRange(startIndex, endIndex);
        return this.length;
    }
    /**
     * Whether the object can redo changes.
     */
    get canRedo() {
        return this.nbmodel.canRedo();
    }
    /**
     * Whether the object can undo changes.
     */
    get canUndo() {
        return this.nbmodel.canUndo();
    }
    /**
     * Begin a compound operation.
     *
     * @param isUndoAble - Whether the operation is undoable.
     *   The default is `true`.
     */
    beginCompoundOperation(isUndoAble) {
        this._cellOrder.beginCompoundOperation(isUndoAble);
    }
    /**
     * End a compound operation.
     */
    endCompoundOperation() {
        this._cellOrder.endCompoundOperation();
    }
    /**
     * Undo an operation.
     */
    undo() {
        this.nbmodel.undo();
    }
    /**
     * Redo an operation.
     */
    redo() {
        this.nbmodel.redo();
    }
    /**
     * Clear the change stack.
     */
    clearUndo() {
        this.nbmodel.clearUndoHistory();
    }
    _onOrderChanged(order, change) {
        if (change.type === 'add' || change.type === 'set') {
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.each)(change.newValues, id => {
                const existingCell = this._cellMap.get(id);
                if (existingCell == null) {
                    const cellDB = this._factory.modelDB;
                    const cellType = cellDB.createValue(id + '.type');
                    let cell;
                    switch (cellType.get()) {
                        case 'code':
                            cell = this._factory.createCodeCell({ id: id });
                            break;
                        case 'markdown':
                            cell = this._factory.createMarkdownCell({ id: id });
                            break;
                        default:
                            cell = this._factory.createRawCell({ id: id });
                            break;
                    }
                    this._cellMap.set(id, cell);
                }
                else if (!existingCell.sharedModel.isStandalone) {
                    this._mutex(() => {
                        // it does already exist, probably because it was deleted previously and we introduced it
                        // copy it to a fresh codecell instance
                        const cell = existingCell.toJSON();
                        let freshCell = null;
                        switch (cell.cell_type) {
                            case 'code':
                                freshCell = this._factory.createCodeCell({ cell });
                                break;
                            case 'markdown':
                                freshCell = this._factory.createMarkdownCell({ cell });
                                break;
                            default:
                                freshCell = this._factory.createRawCell({ cell });
                                break;
                        }
                        this._cellMap.set(id, freshCell);
                    });
                }
            });
        }
        const newValues = [];
        const oldValues = [];
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.each)(change.newValues, id => {
            newValues.push(this._cellMap.get(id));
        });
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.each)(change.oldValues, id => {
            oldValues.push(this._cellMap.get(id));
        });
        this._changed.emit({
            type: change.type,
            oldIndex: change.oldIndex,
            newIndex: change.newIndex,
            oldValues,
            newValues
        });
    }
}
//# sourceMappingURL=celllist.js.map

/***/ }),

/***/ "../../packages/notebook/lib/default-toolbar.js":
/*!******************************************************!*\
  !*** ../../packages/notebook/lib/default-toolbar.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToolbarItems": () => (/* binding */ ToolbarItems),
/* harmony export */   "CellTypeSwitcher": () => (/* binding */ CellTypeSwitcher)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions */ "../../packages/notebook/lib/actions.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.





/**
 * The class name added to toolbar cell type dropdown wrapper.
 */
const TOOLBAR_CELLTYPE_CLASS = 'jp-Notebook-toolbarCellType';
/**
 * The class name added to toolbar cell type dropdown.
 */
const TOOLBAR_CELLTYPE_DROPDOWN_CLASS = 'jp-Notebook-toolbarCellTypeDropdown';
/**
 * A namespace for the default toolbar items.
 */
var ToolbarItems;
(function (ToolbarItems) {
    /**
     * Create save button toolbar item.
     *
     * @deprecated since v3.2
     * This is dead code now.
     */
    function createSaveButton(panel, translator) {
        const trans = (translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator).load('jupyterlab');
        function onClick() {
            if (panel.context.model.readOnly) {
                return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                    title: trans.__('Cannot Save'),
                    body: trans.__('Document is read-only'),
                    buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: trans.__('Ok') })]
                });
            }
            void panel.context.save().then(() => {
                if (!panel.isDisposed) {
                    return panel.context.createCheckpoint();
                }
            });
        }
        return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.addToolbarButtonClass)(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.UseSignal, { signal: panel.context.fileChanged }, () => (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButtonComponent, { icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.saveIcon, onClick: onClick, tooltip: trans.__('Save the notebook contents and create checkpoint'), enabled: !!(panel &&
                panel.context &&
                panel.context.contentsModel &&
                panel.context.contentsModel.writable) })))));
    }
    ToolbarItems.createSaveButton = createSaveButton;
    /**
     * Create an insert toolbar item.
     *
     * @deprecated since v3.2
     * This is dead code now.
     */
    function createInsertButton(panel, translator) {
        const trans = (translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator).load('jupyterlab');
        return new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.addIcon,
            onClick: () => {
                _actions__WEBPACK_IMPORTED_MODULE_4__.NotebookActions.insertBelow(panel.content);
            },
            tooltip: trans.__('Insert a cell below')
        });
    }
    ToolbarItems.createInsertButton = createInsertButton;
    /**
     * Create a cut toolbar item.
     *
     * @deprecated since v3.2
     * This is dead code now.
     */
    function createCutButton(panel, translator) {
        const trans = (translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator).load('jupyterlab');
        return new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.cutIcon,
            onClick: () => {
                _actions__WEBPACK_IMPORTED_MODULE_4__.NotebookActions.cut(panel.content);
            },
            tooltip: trans.__('Cut the selected cells')
        });
    }
    ToolbarItems.createCutButton = createCutButton;
    /**
     * Create a copy toolbar item.
     *
     * @deprecated since v3.2
     * This is dead code now.
     */
    function createCopyButton(panel, translator) {
        const trans = (translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator).load('jupyterlab');
        return new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.copyIcon,
            onClick: () => {
                _actions__WEBPACK_IMPORTED_MODULE_4__.NotebookActions.copy(panel.content);
            },
            tooltip: trans.__('Copy the selected cells')
        });
    }
    ToolbarItems.createCopyButton = createCopyButton;
    /**
     * Create a paste toolbar item.
     *
     * @deprecated since v3.2
     * This is dead code now.
     */
    function createPasteButton(panel, translator) {
        const trans = (translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator).load('jupyterlab');
        return new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.pasteIcon,
            onClick: () => {
                _actions__WEBPACK_IMPORTED_MODULE_4__.NotebookActions.paste(panel.content);
            },
            tooltip: trans.__('Paste cells from the clipboard')
        });
    }
    ToolbarItems.createPasteButton = createPasteButton;
    /**
     * Create a run toolbar item.
     *
     * @deprecated since v3.2
     * This is dead code now.
     */
    function createRunButton(panel, translator) {
        const trans = (translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator).load('jupyterlab');
        return new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.runIcon,
            onClick: () => {
                void _actions__WEBPACK_IMPORTED_MODULE_4__.NotebookActions.runAndAdvance(panel.content, panel.sessionContext);
            },
            tooltip: trans.__('Run the selected cells and advance')
        });
    }
    ToolbarItems.createRunButton = createRunButton;
    /**
     * Create a restart run all toolbar item
     *
     * @deprecated since v3.2
     * This is dead code now.
     */
    function createRestartRunAllButton(panel, dialogs, translator) {
        const trans = (translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator).load('jupyterlab');
        return new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.fastForwardIcon,
            onClick: () => {
                void (dialogs !== null && dialogs !== void 0 ? dialogs : _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.sessionContextDialogs)
                    .restart(panel.sessionContext, translator)
                    .then(restarted => {
                    if (restarted) {
                        void _actions__WEBPACK_IMPORTED_MODULE_4__.NotebookActions.runAll(panel.content, panel.sessionContext);
                    }
                    return restarted;
                });
            },
            tooltip: trans.__('Restart the kernel, then re-run the whole notebook')
        });
    }
    ToolbarItems.createRestartRunAllButton = createRestartRunAllButton;
    /**
     * Create a cell type switcher item.
     *
     * #### Notes
     * It will display the type of the current active cell.
     * If more than one cell is selected but are of different types,
     * it will display `'-'`.
     * When the user changes the cell type, it will change the
     * cell types of the selected cells.
     * It can handle a change to the context.
     */
    function createCellTypeItem(panel, translator) {
        return new CellTypeSwitcher(panel.content, translator);
    }
    ToolbarItems.createCellTypeItem = createCellTypeItem;
    /**
     * Get the default toolbar items for panel
     */
    function getDefaultItems(panel, sessionDialogs, translator) {
        return [
            { name: 'save', widget: createSaveButton(panel, translator) },
            { name: 'insert', widget: createInsertButton(panel, translator) },
            { name: 'cut', widget: createCutButton(panel, translator) },
            { name: 'copy', widget: createCopyButton(panel, translator) },
            { name: 'paste', widget: createPasteButton(panel, translator) },
            { name: 'run', widget: createRunButton(panel, translator) },
            {
                name: 'interrupt',
                widget: _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Toolbar.createInterruptButton(panel.sessionContext, translator)
            },
            {
                name: 'restart',
                widget: _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Toolbar.createRestartButton(panel.sessionContext, sessionDialogs, translator)
            },
            {
                name: 'restart-and-run',
                widget: createRestartRunAllButton(panel, sessionDialogs, translator)
            },
            { name: 'cellType', widget: createCellTypeItem(panel, translator) },
            { name: 'spacer', widget: _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Toolbar.createSpacerItem() },
            {
                name: 'kernelName',
                widget: _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Toolbar.createKernelNameItem(panel.sessionContext, sessionDialogs, translator)
            }
        ];
    }
    ToolbarItems.getDefaultItems = getDefaultItems;
})(ToolbarItems || (ToolbarItems = {}));
/**
 * A toolbar widget that switches cell types.
 */
class CellTypeSwitcher extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget {
    /**
     * Construct a new cell type switcher.
     */
    constructor(widget, translator) {
        super();
        /**
         * Handle `change` events for the HTMLSelect component.
         */
        this.handleChange = (event) => {
            if (event.target.value !== '-') {
                _actions__WEBPACK_IMPORTED_MODULE_4__.NotebookActions.changeCellType(this._notebook, event.target.value);
                this._notebook.activate();
            }
        };
        /**
         * Handle `keydown` events for the HTMLSelect component.
         */
        this.handleKeyDown = (event) => {
            if (event.keyCode === 13) {
                this._notebook.activate();
            }
        };
        this._trans = (translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator).load('jupyterlab');
        this.addClass(TOOLBAR_CELLTYPE_CLASS);
        this._notebook = widget;
        if (widget.model) {
            this.update();
        }
        widget.activeCellChanged.connect(this.update, this);
        // Follow a change in the selection.
        widget.selectionChanged.connect(this.update, this);
    }
    render() {
        let value = '-';
        if (this._notebook.activeCell) {
            value = this._notebook.activeCell.model.type;
        }
        for (const widget of this._notebook.widgets) {
            if (this._notebook.isSelectedOrActive(widget)) {
                if (widget.model.type !== value) {
                    value = '-';
                    break;
                }
            }
        }
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.HTMLSelect, { className: TOOLBAR_CELLTYPE_DROPDOWN_CLASS, onChange: this.handleChange, onKeyDown: this.handleKeyDown, value: value, "aria-label": this._trans.__('Cell type'), title: this._trans.__('Select the cell type') },
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("option", { value: "-" }, "-"),
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("option", { value: "code" }, this._trans.__('Code')),
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("option", { value: "markdown" }, this._trans.__('Markdown')),
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("option", { value: "raw" }, this._trans.__('Raw'))));
    }
}
//# sourceMappingURL=default-toolbar.js.map

/***/ }),

/***/ "../../packages/notebook/lib/executionindicator.js":
/*!*********************************************************!*\
  !*** ../../packages/notebook/lib/executionindicator.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExecutionIndicatorComponent": () => (/* binding */ ExecutionIndicatorComponent),
/* harmony export */   "ExecutionIndicator": () => (/* binding */ ExecutionIndicator)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/statusbar */ "webpack/sharing/consume/default/@jupyterlab/statusbar/@jupyterlab/statusbar");
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_5__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.






/**
 * A react functional component for rendering execution indicator.
 */
function ExecutionIndicatorComponent(props) {
    const translator = props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
    const kernelStatuses = (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.translateKernelStatuses)(translator);
    const trans = translator.load('jupyterlab');
    const state = props.state;
    const showOnToolBar = props.displayOption.showOnToolBar;
    const showProgress = props.displayOption.showProgress;
    const tooltipClass = showOnToolBar ? 'down' : 'up';
    const emptyDiv = react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", null);
    if (!state) {
        return emptyDiv;
    }
    const kernelStatus = state.kernelStatus;
    const circleIconProps = {
        alignSelf: 'normal',
        height: '24px'
    };
    const time = state.totalTime;
    const scheduledCellNumber = state.scheduledCellNumber || 0;
    const remainingCellNumber = state.scheduledCell.size || 0;
    const executedCellNumber = scheduledCellNumber - remainingCellNumber;
    let percentage = (100 * executedCellNumber) / scheduledCellNumber;
    let displayClass = showProgress ? '' : 'hidden';
    if (!showProgress && percentage < 100) {
        percentage = 0;
    }
    const progressBar = (percentage) => (react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_3__.ProgressCircle, { progress: percentage, width: 16, height: 24 }));
    const titleFactory = (translatedStatus) => trans.__('Kernel status: %1', translatedStatus);
    const reactElement = (status, circle, popup) => (react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { className: 'jp-Notebook-ExecutionIndicator', title: showProgress ? '' : titleFactory(kernelStatuses[status]), "data-status": status },
        circle,
        react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { className: `jp-Notebook-ExecutionIndicator-tooltip ${tooltipClass} ${displayClass}` },
            react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", null,
                " ",
                titleFactory(kernelStatuses[status]),
                " "),
            popup)));
    if (state.kernelStatus === 'connecting' ||
        state.kernelStatus === 'disconnected' ||
        state.kernelStatus === 'unknown') {
        return reactElement(kernelStatus, react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__.offlineBoltIcon.react, Object.assign({}, circleIconProps)), []);
    }
    if (state.kernelStatus === 'starting' ||
        state.kernelStatus === 'terminating' ||
        state.kernelStatus === 'restarting' ||
        state.kernelStatus === 'initializing') {
        return reactElement(kernelStatus, react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__.circleIcon.react, Object.assign({}, circleIconProps)), []);
    }
    if (state.executionStatus === 'busy') {
        return reactElement('busy', progressBar(percentage), [
            react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", { key: 0 }, trans.__(`Executed ${executedCellNumber}/${scheduledCellNumber} requests`)),
            react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", { key: 1 }, trans._n('Elapsed time: %1 second', 'Elapsed time: %1 seconds', time))
        ]);
    }
    else {
        if (time === 0) {
            return reactElement('idle', progressBar(100), []);
        }
        else {
            return reactElement('idle', progressBar(100), [
                react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", { key: 0 }, trans._n('Executed %1 request', 'Executed %1 requests', scheduledCellNumber)),
                react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", { key: 1 }, trans._n('Elapsed time: %1 second', 'Elapsed time: %1 seconds', time))
            ]);
        }
    }
}
/**
 * A VDomRenderer widget for displaying the execution status.
 */
class ExecutionIndicator extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomRenderer {
    /**
     * Construct the kernel status widget.
     */
    constructor(translator, showProgress = true) {
        super(new ExecutionIndicator.Model());
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this.addClass(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_3__.interactiveItem);
    }
    /**
     * Render the execution status item.
     */
    render() {
        if (this.model === null || !this.model.renderFlag) {
            return react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", null);
        }
        else {
            const nb = this.model.currentNotebook;
            if (!nb) {
                return (react__WEBPACK_IMPORTED_MODULE_2___default().createElement(ExecutionIndicatorComponent, { displayOption: this.model.displayOption, state: undefined, translator: this.translator }));
            }
            return (react__WEBPACK_IMPORTED_MODULE_2___default().createElement(ExecutionIndicatorComponent, { displayOption: this.model.displayOption, state: this.model.executionState(nb), translator: this.translator }));
        }
    }
}
/**
 * A namespace for ExecutionIndicator statics.
 */
(function (ExecutionIndicator) {
    /**
     * A VDomModel for the execution status indicator.
     */
    class Model extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomModel {
        constructor() {
            super();
            /**
             * A weak map to hold execution status of multiple notebooks.
             */
            this._notebookExecutionProgress = new WeakMap();
            this._displayOption = { showOnToolBar: true, showProgress: true };
            this._renderFlag = true;
        }
        /**
         * Attach a notebook with session context to model in order to keep
         * track of multiple notebooks. If a session context is already
         * attached, only set current activated notebook to input.
         *
         * @param data - The  notebook and session context to be attached to model
         */
        attachNotebook(data) {
            var _a, _b, _c, _d;
            if (data && data.content && data.context) {
                const nb = data.content;
                const context = data.context;
                this._currentNotebook = nb;
                if (!this._notebookExecutionProgress.has(nb)) {
                    this._notebookExecutionProgress.set(nb, {
                        executionStatus: 'idle',
                        kernelStatus: 'idle',
                        totalTime: 0,
                        interval: 0,
                        timeout: 0,
                        scheduledCell: new Set(),
                        scheduledCellNumber: 0,
                        needReset: true
                    });
                    const state = this._notebookExecutionProgress.get(nb);
                    const contextStatusChanged = (ctx) => {
                        if (state) {
                            state.kernelStatus = ctx.kernelDisplayStatus;
                        }
                        this.stateChanged.emit(void 0);
                    };
                    context.statusChanged.connect(contextStatusChanged, this);
                    const contextConnectionStatusChanged = (ctx) => {
                        if (state) {
                            state.kernelStatus = ctx.kernelDisplayStatus;
                        }
                        this.stateChanged.emit(void 0);
                    };
                    context.connectionStatusChanged.connect(contextConnectionStatusChanged, this);
                    context.disposed.connect(ctx => {
                        ctx.connectionStatusChanged.disconnect(contextConnectionStatusChanged, this);
                        ctx.statusChanged.disconnect(contextStatusChanged, this);
                    });
                    const handleKernelMsg = (sender, msg) => {
                        const message = msg.msg;
                        const msgId = message.header.msg_id;
                        if (_jupyterlab_services__WEBPACK_IMPORTED_MODULE_5__.KernelMessage.isCommMsgMsg(message) &&
                            message.content.data['method']) {
                            // Execution request from Comm message
                            const method = message.content.data['method'];
                            if (method !== 'request_state' && method !== 'update') {
                                this._cellScheduledCallback(nb, msgId);
                                this._startTimer(nb);
                            }
                        }
                        else if (message.header.msg_type === 'execute_request') {
                            // A cell code is scheduled for executing
                            this._cellScheduledCallback(nb, msgId);
                        }
                        else if (_jupyterlab_services__WEBPACK_IMPORTED_MODULE_5__.KernelMessage.isStatusMsg(message) &&
                            message.content.execution_state === 'idle') {
                            // Idle status message case.
                            const parentId = message.parent_header
                                .msg_id;
                            this._cellExecutedCallback(nb, parentId);
                        }
                        else if (message.header.msg_type === 'execute_input') {
                            // A cell code starts executing.
                            this._startTimer(nb);
                        }
                    };
                    (_b = (_a = context.session) === null || _a === void 0 ? void 0 : _a.kernel) === null || _b === void 0 ? void 0 : _b.anyMessage.connect(handleKernelMsg);
                    (_d = (_c = context.session) === null || _c === void 0 ? void 0 : _c.kernel) === null || _d === void 0 ? void 0 : _d.disposed.connect(kernel => kernel.anyMessage.disconnect(handleKernelMsg));
                    const kernelChangedSlot = (_, kernelData) => {
                        if (state) {
                            this._resetTime(state);
                            this.stateChanged.emit(void 0);
                            if (kernelData.newValue) {
                                kernelData.newValue.anyMessage.connect(handleKernelMsg);
                            }
                        }
                    };
                    context.kernelChanged.connect(kernelChangedSlot);
                    context.disposed.connect(ctx => ctx.kernelChanged.disconnect(kernelChangedSlot));
                }
            }
        }
        /**
         * The current activated notebook in model.
         */
        get currentNotebook() {
            return this._currentNotebook;
        }
        /**
         * The display options for progress bar and elapsed time.
         */
        get displayOption() {
            return this._displayOption;
        }
        /**
         * Set the display options for progress bar and elapsed time.
         *
         * @param options - Options to be used
         */
        set displayOption(options) {
            this._displayOption = options;
        }
        /**
         * Get the execution state associated with a notebook.
         *
         * @param nb - The notebook used to identify execution
         * state.
         *
         * @return - The associated execution state.
         */
        executionState(nb) {
            return this._notebookExecutionProgress.get(nb);
        }
        /**
         * The function is called on kernel's idle status message.
         * It is used to keep track number of executed
         * cell or Comm custom messages and the status of kernel.
         *
         * @param  nb - The notebook which contains the executed code
         * cell.
         * @param  msg_id - The id of message.
         *
         * ### Note
         *
         * To keep track of cells executed under 1 second,
         * the execution state is marked as `needReset` 1 second after executing
         * these cells. This `Timeout` will be cleared if there is any cell
         * scheduled after that.
         */
        _cellExecutedCallback(nb, msg_id) {
            const state = this._notebookExecutionProgress.get(nb);
            if (state && state.scheduledCell.has(msg_id)) {
                state.scheduledCell.delete(msg_id);
                if (state.scheduledCell.size === 0) {
                    window.setTimeout(() => {
                        state.executionStatus = 'idle';
                        clearInterval(state.interval);
                        this.stateChanged.emit(void 0);
                    }, 150);
                    state.timeout = window.setTimeout(() => {
                        state.needReset = true;
                    }, 1000);
                }
            }
        }
        /**
         * This function is called on kernel's `execute_input` message to start
         * the elapsed time counter.
         *
         * @param  nb - The notebook which contains the scheduled execution request.
         */
        _startTimer(nb) {
            const state = this._notebookExecutionProgress.get(nb);
            if (state) {
                if (state.executionStatus !== 'busy') {
                    state.executionStatus = 'busy';
                    clearTimeout(state.timeout);
                    this.stateChanged.emit(void 0);
                    state.interval = window.setInterval(() => {
                        this._tick(state);
                    }, 1000);
                }
            }
        }
        /**
         * The function is called on kernel's `execute_request` message or Comm message, it is
         * used to keep track number of scheduled cell or Comm execution message
         * and the status of kernel.
         *
         * @param  nb - The notebook which contains the scheduled code.
         * cell
         * @param  msg_id - The id of message.
         */
        _cellScheduledCallback(nb, msg_id) {
            const state = this._notebookExecutionProgress.get(nb);
            if (state && !state.scheduledCell.has(msg_id)) {
                if (state.needReset) {
                    this._resetTime(state);
                }
                state.scheduledCell.add(msg_id);
                state.scheduledCellNumber += 1;
            }
        }
        /**
         * Increment the executed time of input execution state
         * and emit `stateChanged` signal to re-render the indicator.
         *
         * @param  data - the state to be updated.
         */
        _tick(data) {
            data.totalTime += 1;
            this.stateChanged.emit(void 0);
        }
        /**
         * Reset the input execution state.
         *
         * @param  data - the state to be rested.
         */
        _resetTime(data) {
            data.totalTime = 0;
            data.scheduledCellNumber = 0;
            data.executionStatus = 'idle';
            data.scheduledCell = new Set();
            clearTimeout(data.timeout);
            clearInterval(data.interval);
            data.needReset = false;
        }
        get renderFlag() {
            return this._renderFlag;
        }
        updateRenderOption(options) {
            if (this.displayOption.showOnToolBar) {
                if (!options.showOnToolBar) {
                    this._renderFlag = false;
                }
                else {
                    this._renderFlag = true;
                }
            }
            this.displayOption.showProgress = options.showProgress;
            this.stateChanged.emit(void 0);
        }
    }
    ExecutionIndicator.Model = Model;
    function createExecutionIndicatorItem(panel, translator, loadSettings) {
        const toolbarItem = new ExecutionIndicator(translator);
        toolbarItem.model.displayOption = {
            showOnToolBar: true,
            showProgress: true
        };
        toolbarItem.model.attachNotebook({
            content: panel.content,
            context: panel.sessionContext
        });
        panel.disposed.connect(() => {
            toolbarItem.dispose();
        });
        if (loadSettings) {
            loadSettings
                .then(settings => {
                toolbarItem.model.updateRenderOption(getSettingValue(settings));
                settings.changed.connect(newSettings => {
                    toolbarItem.model.updateRenderOption(getSettingValue(newSettings));
                });
            })
                .catch((reason) => {
                console.error(reason.message);
            });
        }
        return toolbarItem;
    }
    ExecutionIndicator.createExecutionIndicatorItem = createExecutionIndicatorItem;
    function getSettingValue(settings) {
        let showOnToolBar = true;
        let showProgress = true;
        const configValues = settings.get('kernelStatus').composite;
        if (configValues) {
            showOnToolBar = !configValues.showOnStatusBar;
            showProgress = configValues.showProgress;
        }
        return { showOnToolBar, showProgress };
    }
    ExecutionIndicator.getSettingValue = getSettingValue;
})(ExecutionIndicator || (ExecutionIndicator = {}));
//# sourceMappingURL=executionindicator.js.map

/***/ }),

/***/ "../../packages/notebook/lib/index.js":
/*!********************************************!*\
  !*** ../../packages/notebook/lib/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KernelError": () => (/* reexport safe */ _actions__WEBPACK_IMPORTED_MODULE_0__.KernelError),
/* harmony export */   "NotebookActions": () => (/* reexport safe */ _actions__WEBPACK_IMPORTED_MODULE_0__.NotebookActions),
/* harmony export */   "CellTypeSwitcher": () => (/* reexport safe */ _default_toolbar__WEBPACK_IMPORTED_MODULE_1__.CellTypeSwitcher),
/* harmony export */   "ToolbarItems": () => (/* reexport safe */ _default_toolbar__WEBPACK_IMPORTED_MODULE_1__.ToolbarItems),
/* harmony export */   "NotebookModel": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_2__.NotebookModel),
/* harmony export */   "NotebookModelFactory": () => (/* reexport safe */ _modelfactory__WEBPACK_IMPORTED_MODULE_3__.NotebookModelFactory),
/* harmony export */   "CommandEditStatus": () => (/* reexport safe */ _modestatus__WEBPACK_IMPORTED_MODULE_4__.CommandEditStatus),
/* harmony export */   "NotebookTools": () => (/* reexport safe */ _notebooktools__WEBPACK_IMPORTED_MODULE_5__.NotebookTools),
/* harmony export */   "NotebookPanel": () => (/* reexport safe */ _panel__WEBPACK_IMPORTED_MODULE_6__.NotebookPanel),
/* harmony export */   "INotebookTools": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_7__.INotebookTools),
/* harmony export */   "INotebookTracker": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_7__.INotebookTracker),
/* harmony export */   "INotebookWidgetFactory": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_7__.INotebookWidgetFactory),
/* harmony export */   "NotebookTracker": () => (/* reexport safe */ _tracker__WEBPACK_IMPORTED_MODULE_8__.NotebookTracker),
/* harmony export */   "NotebookTrustStatus": () => (/* reexport safe */ _truststatus__WEBPACK_IMPORTED_MODULE_9__.NotebookTrustStatus),
/* harmony export */   "Notebook": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_10__.Notebook),
/* harmony export */   "StaticNotebook": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_10__.StaticNotebook),
/* harmony export */   "NotebookWidgetFactory": () => (/* reexport safe */ _widgetfactory__WEBPACK_IMPORTED_MODULE_11__.NotebookWidgetFactory),
/* harmony export */   "ExecutionIndicator": () => (/* reexport safe */ _executionindicator__WEBPACK_IMPORTED_MODULE_12__.ExecutionIndicator),
/* harmony export */   "ExecutionIndicatorComponent": () => (/* reexport safe */ _executionindicator__WEBPACK_IMPORTED_MODULE_12__.ExecutionIndicatorComponent)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "../../packages/notebook/lib/actions.js");
/* harmony import */ var _default_toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default-toolbar */ "../../packages/notebook/lib/default-toolbar.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model */ "../../packages/notebook/lib/model.js");
/* harmony import */ var _modelfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modelfactory */ "../../packages/notebook/lib/modelfactory.js");
/* harmony import */ var _modestatus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modestatus */ "../../packages/notebook/lib/modestatus.js");
/* harmony import */ var _notebooktools__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notebooktools */ "../../packages/notebook/lib/notebooktools.js");
/* harmony import */ var _panel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./panel */ "../../packages/notebook/lib/panel.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tokens */ "../../packages/notebook/lib/tokens.js");
/* harmony import */ var _tracker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tracker */ "../../packages/notebook/lib/tracker.js");
/* harmony import */ var _truststatus__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./truststatus */ "../../packages/notebook/lib/truststatus.js");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./widget */ "../../packages/notebook/lib/widget.js");
/* harmony import */ var _widgetfactory__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./widgetfactory */ "../../packages/notebook/lib/widgetfactory.js");
/* harmony import */ var _executionindicator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./executionindicator */ "../../packages/notebook/lib/executionindicator.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module notebook
 */













//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/notebook/lib/model.js":
/*!********************************************!*\
  !*** ../../packages/notebook/lib/model.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotebookModel": () => (/* binding */ NotebookModel)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/cells */ "webpack/sharing/consume/default/@jupyterlab/cells/@jupyterlab/cells");
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/nbformat */ "webpack/sharing/consume/default/@jupyterlab/nbformat/@jupyterlab/nbformat");
/* harmony import */ var _jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/observables */ "webpack/sharing/consume/default/@jupyterlab/observables/@jupyterlab/observables");
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_observables__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/shared-models */ "webpack/sharing/consume/default/@jupyterlab/shared-models/@jupyterlab/shared-models");
/* harmony import */ var _jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _celllist__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./celllist */ "../../packages/notebook/lib/celllist.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.









const UNSHARED_KEYS = ['kernelspec', 'language_info'];
/**
 * An implementation of a notebook Model.
 */
class NotebookModel {
    /**
     * Construct a new notebook model.
     */
    constructor(options = {}) {
        /**
         * A mutex to update the shared model.
         */
        this._modelDBMutex = _jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_4__.createMutex();
        this._readOnly = false;
        this._contentChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal(this);
        this._stateChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal(this);
        this._nbformat = _jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_2__.MAJOR_VERSION;
        this._nbformatMinor = _jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_2__.MINOR_VERSION;
        this._isDisposed = false;
        if (options.modelDB) {
            this.modelDB = options.modelDB;
        }
        else {
            this.modelDB = new _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_3__.ModelDB();
        }
        this.sharedModel = _jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_4__.YNotebook.create(options.disableDocumentWideUndoRedo || false);
        this._isInitialized = options.isInitialized === false ? false : true;
        const factory = options.contentFactory || NotebookModel.defaultContentFactory;
        this.contentFactory = factory.clone(this.modelDB.view('cells'));
        this._cells = new _celllist__WEBPACK_IMPORTED_MODULE_8__.CellList(this.modelDB, this.contentFactory, this.sharedModel);
        this._trans = (options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__.nullTranslator).load('jupyterlab');
        this._cells.changed.connect(this._onCellsChanged, this);
        // Handle initial metadata.
        const metadata = this.modelDB.createMap('metadata');
        if (!metadata.has('language_info')) {
            const name = options.languagePreference || '';
            metadata.set('language_info', { name });
        }
        this._ensureMetadata();
        metadata.changed.connect(this._onMetadataChanged, this);
        this._deletedCells = [];
        this.sharedModel.dirty = false;
        this.sharedModel.changed.connect(this._onStateChanged, this);
    }
    /**
     * A signal emitted when the document content changes.
     */
    get contentChanged() {
        return this._contentChanged;
    }
    /**
     * A signal emitted when the document state changes.
     */
    get stateChanged() {
        return this._stateChanged;
    }
    /**
     * The dirty state of the document.
     */
    get dirty() {
        return this.sharedModel.dirty;
    }
    set dirty(newValue) {
        if (newValue === this.dirty) {
            return;
        }
        this.sharedModel.dirty = newValue;
    }
    /**
     * The read only state of the document.
     */
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(newValue) {
        if (newValue === this._readOnly) {
            return;
        }
        const oldValue = this._readOnly;
        this._readOnly = newValue;
        this.triggerStateChange({ name: 'readOnly', oldValue, newValue });
    }
    /**
     * The metadata associated with the notebook.
     */
    get metadata() {
        return this.modelDB.get('metadata');
    }
    /**
     * Get the observable list of notebook cells.
     */
    get cells() {
        return this._cells;
    }
    /**
     * The major version number of the nbformat.
     */
    get nbformat() {
        return this._nbformat;
    }
    /**
     * The minor version number of the nbformat.
     */
    get nbformatMinor() {
        return this._nbformatMinor;
    }
    /**
     * The default kernel name of the document.
     */
    get defaultKernelName() {
        const spec = this.metadata.get('kernelspec');
        return spec ? spec.name : '';
    }
    /**
     * A list of deleted cells for the notebook..
     */
    get deletedCells() {
        return this._deletedCells;
    }
    /**
     * If the model is initialized or not.
     */
    get isInitialized() {
        return this._isInitialized;
    }
    /**
     * The default kernel language of the document.
     */
    get defaultKernelLanguage() {
        const info = this.metadata.get('language_info');
        return info ? info.name : '';
    }
    /**
     * Dispose of the resources held by the model.
     */
    dispose() {
        // Do nothing if already disposed.
        if (this.isDisposed) {
            return;
        }
        const cells = this.cells;
        this._cells = null;
        cells.dispose();
        this._isDisposed = true;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal.clearData(this);
    }
    /**
     * Serialize the model to a string.
     */
    toString() {
        return JSON.stringify(this.toJSON());
    }
    /**
     * Deserialize the model from a string.
     *
     * #### Notes
     * Should emit a [contentChanged] signal.
     */
    fromString(value) {
        this.fromJSON(JSON.parse(value));
    }
    /**
     * Serialize the model to JSON.
     */
    toJSON() {
        var _a, _b;
        const cells = [];
        for (let i = 0; i < ((_b = (_a = this.cells) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0); i++) {
            const cell = this.cells.get(i).toJSON();
            if (this._nbformat === 4 && this._nbformatMinor <= 4) {
                // strip cell ids if we have notebook format 4.0-4.4
                delete cell.id;
            }
            cells.push(cell);
        }
        this._ensureMetadata();
        const metadata = this.sharedModel.getMetadata();
        for (const key of this.metadata.keys()) {
            metadata[key] = JSON.parse(JSON.stringify(this.metadata.get(key)));
        }
        return {
            metadata,
            nbformat_minor: this._nbformatMinor,
            nbformat: this._nbformat,
            cells
        };
    }
    /**
     * Deserialize the model from JSON.
     *
     * #### Notes
     * Should emit a [contentChanged] signal.
     */
    fromJSON(value) {
        const cells = [];
        const factory = this.contentFactory;
        const useId = value.nbformat === 4 && value.nbformat_minor >= 5;
        for (const cell of value.cells) {
            const options = { cell };
            if (useId) {
                options.id = cell.id;
            }
            switch (cell.cell_type) {
                case 'code':
                    cells.push(factory.createCodeCell(options));
                    break;
                case 'markdown':
                    cells.push(factory.createMarkdownCell(options));
                    break;
                case 'raw':
                    cells.push(factory.createRawCell(options));
                    break;
                default:
                    continue;
            }
        }
        this.cells.beginCompoundOperation();
        this.cells.clear();
        this.cells.pushAll(cells);
        this.cells.endCompoundOperation();
        this.sharedModel.nbformat_minor =
            _jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_2__.MINOR_VERSION;
        this.sharedModel.nbformat = _jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_2__.MAJOR_VERSION;
        const origNbformat = value.metadata.orig_nbformat;
        if (value.nbformat !== this._nbformat) {
            this.sharedModel.nbformat = value.nbformat;
        }
        if (value.nbformat_minor > this._nbformatMinor) {
            this.sharedModel.nbformat_minor =
                value.nbformat_minor;
        }
        // Alert the user if the format changes.
        if (origNbformat !== undefined && this._nbformat !== origNbformat) {
            const newer = this._nbformat > origNbformat;
            let msg;
            if (newer) {
                msg = this._trans.__(`This notebook has been converted from an older notebook format (v%1)
to the current notebook format (v%2).
The next time you save this notebook, the current notebook format (v%2) will be used.
'Older versions of Jupyter may not be able to read the new format.' To preserve the original format version,
close the notebook without saving it.`, origNbformat, this._nbformat);
            }
            else {
                msg = this._trans.__(`This notebook has been converted from an newer notebook format (v%1)
to the current notebook format (v%2).
The next time you save this notebook, the current notebook format (v%2) will be used.
Some features of the original notebook may not be available.' To preserve the original format version,
close the notebook without saving it.`, origNbformat, this._nbformat);
            }
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: this._trans.__('Notebook converted'),
                body: msg,
                buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: this._trans.__('Ok') })]
            });
        }
        // Update the metadata.
        this.metadata.clear();
        const metadata = value.metadata;
        for (const key in metadata) {
            // orig_nbformat is not intended to be stored per spec.
            if (key === 'orig_nbformat') {
                continue;
            }
            this.metadata.set(key, metadata[key]);
        }
        this._ensureMetadata();
        this.dirty = true;
    }
    /**
     * Initialize the model with its current state.
     *
     * # Notes
     * Adds an empty code cell if the model is empty
     * and clears undo state.
     */
    initialize() {
        if (!this.cells.length) {
            const factory = this.contentFactory;
            this.cells.push(factory.createCodeCell({}));
        }
        this._isInitialized = true;
        this.cells.clearUndo();
    }
    /**
     * Handle a change in the cells list.
     */
    _onCellsChanged(list, change) {
        switch (change.type) {
            case 'add':
                change.newValues.forEach(cell => {
                    cell.contentChanged.connect(this.triggerContentChange, this);
                });
                break;
            case 'remove':
                break;
            case 'set':
                change.newValues.forEach(cell => {
                    cell.contentChanged.connect(this.triggerContentChange, this);
                });
                break;
            default:
                break;
        }
        this.triggerContentChange();
    }
    _onStateChanged(sender, changes) {
        if (changes.stateChange) {
            changes.stateChange.forEach(value => {
                if (value.name === 'nbformat') {
                    this._nbformat = value.newValue;
                }
                if (value.name === 'nbformatMinor') {
                    this._nbformatMinor = value.newValue;
                }
                if (value.name !== 'dirty' || value.oldValue !== value.newValue) {
                    this.triggerStateChange(value);
                }
            });
        }
        if (changes.metadataChange) {
            const metadata = changes.metadataChange.newValue;
            this._modelDBMutex(() => {
                Object.entries(metadata).forEach(([key, value]) => {
                    this.metadata.set(key, value);
                });
            });
        }
    }
    _onMetadataChanged(metadata, change) {
        if (!UNSHARED_KEYS.includes(change.key)) {
            this._modelDBMutex(() => {
                this.sharedModel.updateMetadata(metadata.toJSON());
            });
        }
        this.triggerContentChange();
    }
    /**
     * Make sure we have the required metadata fields.
     */
    _ensureMetadata() {
        const metadata = this.metadata;
        if (!metadata.has('language_info')) {
            metadata.set('language_info', { name: '' });
        }
        if (!metadata.has('kernelspec')) {
            metadata.set('kernelspec', { name: '', display_name: '' });
        }
    }
    /**
     * Trigger a state change signal.
     */
    triggerStateChange(args) {
        this._stateChanged.emit(args);
    }
    /**
     * Trigger a content changed signal.
     */
    triggerContentChange() {
        this._contentChanged.emit(void 0);
        this.dirty = true;
    }
    /**
     * Whether the model is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
}
/**
 * The namespace for the `NotebookModel` class statics.
 */
(function (NotebookModel) {
    /**
     * The default implementation of an `IContentFactory`.
     */
    class ContentFactory {
        /**
         * Create a new cell model factory.
         */
        constructor(options) {
            this.codeCellContentFactory =
                options.codeCellContentFactory || _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__.CodeCellModel.defaultContentFactory;
            this.modelDB = options.modelDB;
        }
        /**
         * Create a new cell by cell type.
         *
         * @param type:  the type of the cell to create.
         *
         * @param options: the cell creation options.
         *
         * #### Notes
         * This method is intended to be a convenience method to programmatically
         * call the other cell creation methods in the factory.
         */
        createCell(type, options) {
            switch (type) {
                case 'code':
                    return this.createCodeCell(options);
                case 'markdown':
                    return this.createMarkdownCell(options);
                case 'raw':
                default:
                    return this.createRawCell(options);
            }
        }
        /**
         * Create a new code cell.
         *
         * @param source - The data to use for the original source data.
         *
         * @returns A new code cell. If a source cell is provided, the
         *   new cell will be initialized with the data from the source.
         *   If the contentFactory is not provided, the instance
         *   `codeCellContentFactory` will be used.
         */
        createCodeCell(options) {
            if (options.contentFactory) {
                options.contentFactory = this.codeCellContentFactory;
            }
            if (this.modelDB) {
                if (!options.id) {
                    options.id = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_6__.UUID.uuid4();
                }
                options.modelDB = this.modelDB.view(options.id);
            }
            return new _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__.CodeCellModel(options);
        }
        /**
         * Create a new markdown cell.
         *
         * @param source - The data to use for the original source data.
         *
         * @returns A new markdown cell. If a source cell is provided, the
         *   new cell will be initialized with the data from the source.
         */
        createMarkdownCell(options) {
            if (this.modelDB) {
                if (!options.id) {
                    options.id = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_6__.UUID.uuid4();
                }
                options.modelDB = this.modelDB.view(options.id);
            }
            return new _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__.MarkdownCellModel(options);
        }
        /**
         * Create a new raw cell.
         *
         * @param source - The data to use for the original source data.
         *
         * @returns A new raw cell. If a source cell is provided, the
         *   new cell will be initialized with the data from the source.
         */
        createRawCell(options) {
            if (this.modelDB) {
                if (!options.id) {
                    options.id = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_6__.UUID.uuid4();
                }
                options.modelDB = this.modelDB.view(options.id);
            }
            return new _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__.RawCellModel(options);
        }
        /**
         * Clone the content factory with a new IModelDB.
         */
        clone(modelDB) {
            return new ContentFactory({
                modelDB: modelDB,
                codeCellContentFactory: this.codeCellContentFactory
            });
        }
    }
    NotebookModel.ContentFactory = ContentFactory;
    /**
     * The default `ContentFactory` instance.
     */
    NotebookModel.defaultContentFactory = new ContentFactory({});
})(NotebookModel || (NotebookModel = {}));
//# sourceMappingURL=model.js.map

/***/ }),

/***/ "../../packages/notebook/lib/modelfactory.js":
/*!***************************************************!*\
  !*** ../../packages/notebook/lib/modelfactory.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotebookModelFactory": () => (/* binding */ NotebookModelFactory)
/* harmony export */ });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "../../packages/notebook/lib/model.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * A model factory for notebooks.
 */
class NotebookModelFactory {
    /**
     * Construct a new notebook model factory.
     */
    constructor(options) {
        this._disposed = false;
        this._disableDocumentWideUndoRedo =
            options.disableDocumentWideUndoRedo || false;
        const codeCellContentFactory = options.codeCellContentFactory;
        this.contentFactory =
            options.contentFactory ||
                new _model__WEBPACK_IMPORTED_MODULE_0__.NotebookModel.ContentFactory({ codeCellContentFactory });
    }
    /**
     * Define the disableDocumentWideUndoRedo property.
     */
    set disableDocumentWideUndoRedo(disableDocumentWideUndoRedo) {
        this._disableDocumentWideUndoRedo = disableDocumentWideUndoRedo;
    }
    /**
     * The name of the model.
     */
    get name() {
        return 'notebook';
    }
    /**
     * The content type of the file.
     */
    get contentType() {
        return 'notebook';
    }
    /**
     * The format of the file.
     */
    get fileFormat() {
        return 'json';
    }
    /**
     * Get whether the model factory has been disposed.
     */
    get isDisposed() {
        return this._disposed;
    }
    /**
     * Dispose of the model factory.
     */
    dispose() {
        this._disposed = true;
    }
    /**
     * Create a new model for a given path.
     *
     * @param languagePreference - An optional kernel language preference.
     *
     * @returns A new document model.
     */
    createNew(languagePreference, modelDB, isInitialized) {
        const contentFactory = this.contentFactory;
        return new _model__WEBPACK_IMPORTED_MODULE_0__.NotebookModel({
            languagePreference,
            contentFactory,
            modelDB,
            isInitialized,
            disableDocumentWideUndoRedo: this._disableDocumentWideUndoRedo
        });
    }
    /**
     * Get the preferred kernel language given a path.
     */
    preferredLanguage(path) {
        return '';
    }
}
//# sourceMappingURL=modelfactory.js.map

/***/ }),

/***/ "../../packages/notebook/lib/modestatus.js":
/*!*************************************************!*\
  !*** ../../packages/notebook/lib/modestatus.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommandEditStatus": () => (/* binding */ CommandEditStatus)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/statusbar */ "webpack/sharing/consume/default/@jupyterlab/statusbar/@jupyterlab/statusbar");
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




/**
 * A pure function for rendering a Command/Edit mode component.
 *
 * @param props: the props for rendering the component.
 *
 * @returns a tsx component for command/edit mode.
 */
function CommandEditComponent(props) {
    const trans = (props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator).load('jupyterlab');
    return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__.TextItem, { source: trans.__('Mode: %1', props.modeNames[props.notebookMode]) }));
}
/**
 * StatusBar item to display which notebook mode user is in.
 */
class CommandEditStatus extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomRenderer {
    /**
     * Construct a new CommandEdit status item.
     */
    constructor(translator) {
        super(new CommandEditStatus.Model());
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this._modeNames = {
            command: this._trans.__('Command'),
            edit: this._trans.__('Edit')
        };
    }
    /**
     * Render the CommandEdit status item.
     */
    render() {
        if (!this.model) {
            return null;
        }
        this.node.title = this._trans.__('Notebook is in %1 mode', this._modeNames[this.model.notebookMode]);
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(CommandEditComponent, { notebookMode: this.model.notebookMode, translator: this.translator, modeNames: this._modeNames }));
    }
}
/**
 * A namespace for CommandEdit statics.
 */
(function (CommandEditStatus) {
    /**
     * A VDomModel for the CommandEdit renderer.
     */
    class Model extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomModel {
        constructor() {
            super(...arguments);
            /**
             * On a change to the notebook, update the mode.
             */
            this._onChanged = (_notebook) => {
                const oldMode = this._notebookMode;
                if (this._notebook) {
                    this._notebookMode = _notebook.mode;
                }
                else {
                    this._notebookMode = 'command';
                }
                this._triggerChange(oldMode, this._notebookMode);
            };
            this._notebookMode = 'command';
            this._notebook = null;
        }
        /**
         * The current mode of the current notebook.
         */
        get notebookMode() {
            return this._notebookMode;
        }
        /**
         * Set the current notebook for the model.
         */
        set notebook(notebook) {
            const oldNotebook = this._notebook;
            if (oldNotebook !== null) {
                oldNotebook.stateChanged.disconnect(this._onChanged, this);
                oldNotebook.activeCellChanged.disconnect(this._onChanged, this);
                oldNotebook.modelContentChanged.disconnect(this._onChanged, this);
            }
            const oldMode = this._notebookMode;
            this._notebook = notebook;
            if (this._notebook === null) {
                this._notebookMode = 'command';
            }
            else {
                this._notebookMode = this._notebook.mode;
                this._notebook.stateChanged.connect(this._onChanged, this);
                this._notebook.activeCellChanged.connect(this._onChanged, this);
                this._notebook.modelContentChanged.connect(this._onChanged, this);
            }
            this._triggerChange(oldMode, this._notebookMode);
        }
        /**
         * Trigger a state change for the renderer.
         */
        _triggerChange(oldState, newState) {
            if (oldState !== newState) {
                this.stateChanged.emit(void 0);
            }
        }
    }
    CommandEditStatus.Model = Model;
})(CommandEditStatus || (CommandEditStatus = {}));
//# sourceMappingURL=modestatus.js.map

/***/ }),

/***/ "../../packages/notebook/lib/notebooktools.js":
/*!****************************************************!*\
  !*** ../../packages/notebook/lib/notebooktools.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotebookTools": () => (/* binding */ NotebookTools)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/observables */ "webpack/sharing/consume/default/@jupyterlab/observables/@jupyterlab/observables");
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_observables__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/messaging */ "webpack/sharing/consume/default/@lumino/messaging/@lumino/messaging?790d");
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_messaging__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/virtualdom */ "webpack/sharing/consume/default/@lumino/virtualdom/@lumino/virtualdom?7070");
/* harmony import */ var _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_7__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.








class RankedPanel extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__.Widget {
    constructor() {
        super();
        this._items = [];
        this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__.PanelLayout();
        this.addClass('jp-RankedPanel');
    }
    addWidget(widget, rank) {
        const rankItem = { widget, rank };
        const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayExt.upperBound(this._items, rankItem, Private.itemCmp);
        _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayExt.insert(this._items, index, rankItem);
        const layout = this.layout;
        layout.insertWidget(index, widget);
    }
    /**
     * Handle the removal of a child
     *
     */
    onChildRemoved(msg) {
        const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayExt.findFirstIndex(this._items, item => item.widget === msg.child);
        if (index !== -1) {
            _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayExt.removeAt(this._items, index);
        }
    }
}
/**
 * A widget that provides metadata tools.
 */
class NotebookTools extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__.Widget {
    /**
     * Construct a new NotebookTools object.
     */
    constructor(options) {
        super();
        this.addClass('jp-NotebookTools');
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this._commonTools = new RankedPanel();
        this._advancedTools = new RankedPanel();
        this._advancedTools.title.label = this._trans.__('Advanced Tools');
        const layout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__.PanelLayout());
        layout.addWidget(this._commonTools);
        layout.addWidget(new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Collapse({ widget: this._advancedTools }));
        this._tracker = options.tracker;
        this._tracker.currentChanged.connect(this._onActiveNotebookPanelChanged, this);
        this._tracker.activeCellChanged.connect(this._onActiveCellChanged, this);
        this._tracker.selectionChanged.connect(this._onSelectionChanged, this);
        this._onActiveNotebookPanelChanged();
        this._onActiveCellChanged();
        this._onSelectionChanged();
    }
    /**
     * The active cell widget.
     */
    get activeCell() {
        return this._tracker.activeCell;
    }
    /**
     * The currently selected cells.
     */
    get selectedCells() {
        const panel = this._tracker.currentWidget;
        if (!panel) {
            return [];
        }
        const notebook = panel.content;
        return notebook.widgets.filter(cell => notebook.isSelectedOrActive(cell));
    }
    /**
     * The current notebook.
     */
    get activeNotebookPanel() {
        return this._tracker.currentWidget;
    }
    /**
     * Add a cell tool item.
     */
    addItem(options) {
        var _a;
        const tool = options.tool;
        const rank = (_a = options.rank) !== null && _a !== void 0 ? _a : 100;
        let section;
        if (options.section === 'advanced') {
            section = this._advancedTools;
        }
        else {
            section = this._commonTools;
        }
        tool.addClass('jp-NotebookTools-tool');
        section.addWidget(tool, rank);
        // TODO: perhaps the necessary notebookTools functionality should be
        // consolidated into a single object, rather than a broad reference to this.
        tool.notebookTools = this;
        // Trigger the tool to update its active notebook and cell.
        _lumino_messaging__WEBPACK_IMPORTED_MODULE_5__.MessageLoop.sendMessage(tool, NotebookTools.ActiveNotebookPanelMessage);
        _lumino_messaging__WEBPACK_IMPORTED_MODULE_5__.MessageLoop.sendMessage(tool, NotebookTools.ActiveCellMessage);
    }
    /**
     * Handle a change to the notebook panel.
     */
    _onActiveNotebookPanelChanged() {
        if (this._prevActiveNotebookModel &&
            !this._prevActiveNotebookModel.isDisposed) {
            this._prevActiveNotebookModel.metadata.changed.disconnect(this._onActiveNotebookPanelMetadataChanged, this);
        }
        const activeNBModel = this.activeNotebookPanel && this.activeNotebookPanel.content
            ? this.activeNotebookPanel.content.model
            : null;
        this._prevActiveNotebookModel = activeNBModel;
        if (activeNBModel) {
            activeNBModel.metadata.changed.connect(this._onActiveNotebookPanelMetadataChanged, this);
        }
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.each)(this._toolChildren(), widget => {
            _lumino_messaging__WEBPACK_IMPORTED_MODULE_5__.MessageLoop.sendMessage(widget, NotebookTools.ActiveNotebookPanelMessage);
        });
    }
    /**
     * Handle a change to the active cell.
     */
    _onActiveCellChanged() {
        if (this._prevActiveCell && !this._prevActiveCell.isDisposed) {
            this._prevActiveCell.metadata.changed.disconnect(this._onActiveCellMetadataChanged, this);
        }
        const activeCell = this.activeCell ? this.activeCell.model : null;
        this._prevActiveCell = activeCell;
        if (activeCell) {
            activeCell.metadata.changed.connect(this._onActiveCellMetadataChanged, this);
        }
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.each)(this._toolChildren(), widget => {
            _lumino_messaging__WEBPACK_IMPORTED_MODULE_5__.MessageLoop.sendMessage(widget, NotebookTools.ActiveCellMessage);
        });
    }
    /**
     * Handle a change in the selection.
     */
    _onSelectionChanged() {
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.each)(this._toolChildren(), widget => {
            _lumino_messaging__WEBPACK_IMPORTED_MODULE_5__.MessageLoop.sendMessage(widget, NotebookTools.SelectionMessage);
        });
    }
    /**
     * Handle a change in the active cell metadata.
     */
    _onActiveNotebookPanelMetadataChanged(sender, args) {
        const message = new _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_2__.ObservableJSON.ChangeMessage('activenotebookpanel-metadata-changed', args);
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.each)(this._toolChildren(), widget => {
            _lumino_messaging__WEBPACK_IMPORTED_MODULE_5__.MessageLoop.sendMessage(widget, message);
        });
    }
    /**
     * Handle a change in the notebook model metadata.
     */
    _onActiveCellMetadataChanged(sender, args) {
        const message = new _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_2__.ObservableJSON.ChangeMessage('activecell-metadata-changed', args);
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.each)(this._toolChildren(), widget => {
            _lumino_messaging__WEBPACK_IMPORTED_MODULE_5__.MessageLoop.sendMessage(widget, message);
        });
    }
    _toolChildren() {
        return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.chain)(this._commonTools.children(), this._advancedTools.children());
    }
}
/**
 * The namespace for NotebookTools class statics.
 */
(function (NotebookTools) {
    /**
     * A singleton conflatable `'activenotebookpanel-changed'` message.
     */
    NotebookTools.ActiveNotebookPanelMessage = new _lumino_messaging__WEBPACK_IMPORTED_MODULE_5__.ConflatableMessage('activenotebookpanel-changed');
    /**
     * A singleton conflatable `'activecell-changed'` message.
     */
    NotebookTools.ActiveCellMessage = new _lumino_messaging__WEBPACK_IMPORTED_MODULE_5__.ConflatableMessage('activecell-changed');
    /**
     * A singleton conflatable `'selection-changed'` message.
     */
    NotebookTools.SelectionMessage = new _lumino_messaging__WEBPACK_IMPORTED_MODULE_5__.ConflatableMessage('selection-changed');
    /**
     * The base notebook tool, meant to be subclassed.
     */
    class Tool extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__.Widget {
        dispose() {
            super.dispose();
            if (this.notebookTools) {
                this.notebookTools = null;
            }
        }
        /**
         * Process a message sent to the widget.
         *
         * @param msg - The message sent to the widget.
         */
        processMessage(msg) {
            super.processMessage(msg);
            switch (msg.type) {
                case 'activenotebookpanel-changed':
                    this.onActiveNotebookPanelChanged(msg);
                    break;
                case 'activecell-changed':
                    this.onActiveCellChanged(msg);
                    break;
                case 'selection-changed':
                    this.onSelectionChanged(msg);
                    break;
                case 'activecell-metadata-changed':
                    this.onActiveCellMetadataChanged(msg);
                    break;
                case 'activenotebookpanel-metadata-changed':
                    this.onActiveNotebookPanelMetadataChanged(msg);
                    break;
                default:
                    break;
            }
        }
        /**
         * Handle a change to the notebook panel.
         *
         * #### Notes
         * The default implementation is a no-op.
         */
        onActiveNotebookPanelChanged(msg) {
            /* no-op */
        }
        /**
         * Handle a change to the active cell.
         *
         * #### Notes
         * The default implementation is a no-op.
         */
        onActiveCellChanged(msg) {
            /* no-op */
        }
        /**
         * Handle a change to the selection.
         *
         * #### Notes
         * The default implementation is a no-op.
         */
        onSelectionChanged(msg) {
            /* no-op */
        }
        /**
         * Handle a change to the metadata of the active cell.
         *
         * #### Notes
         * The default implementation is a no-op.
         */
        onActiveCellMetadataChanged(msg) {
            /* no-op */
        }
        /**
         * Handle a change to the metadata of the active cell.
         *
         * #### Notes
         * The default implementation is a no-op.
         */
        onActiveNotebookPanelMetadataChanged(msg) {
            /* no-op */
        }
    }
    NotebookTools.Tool = Tool;
    /**
     * A cell tool displaying the active cell contents.
     */
    class ActiveCellTool extends Tool {
        /**
         * Construct a new active cell tool.
         */
        constructor() {
            super();
            this._model = new _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditor.Model();
            this.addClass('jp-ActiveCellTool');
            this.addClass('jp-InputArea');
            this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__.PanelLayout();
        }
        /**
         * Dispose of the resources used by the tool.
         */
        dispose() {
            if (this._model === null) {
                return;
            }
            this._model.dispose();
            this._model = null;
            super.dispose();
        }
        /**
         * Handle a change to the active cell.
         */
        onActiveCellChanged() {
            const activeCell = this.notebookTools.activeCell;
            const layout = this.layout;
            const count = layout.widgets.length;
            for (let i = 0; i < count; i++) {
                layout.widgets[0].dispose();
            }
            if (this._cellModel && !this._cellModel.isDisposed) {
                this._cellModel.value.changed.disconnect(this._onValueChanged, this);
                this._cellModel.mimeTypeChanged.disconnect(this._onMimeTypeChanged, this);
            }
            if (!activeCell) {
                const cell = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__.Widget();
                cell.addClass('jp-InputArea-editor');
                cell.addClass('jp-InputArea-editor');
                layout.addWidget(cell);
                this._cellModel = null;
                return;
            }
            const promptNode = activeCell.promptNode
                ? activeCell.promptNode.cloneNode(true)
                : undefined;
            const prompt = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__.Widget({ node: promptNode });
            const factory = activeCell.contentFactory.editorFactory;
            const cellModel = (this._cellModel = activeCell.model);
            cellModel.value.changed.connect(this._onValueChanged, this);
            cellModel.mimeTypeChanged.connect(this._onMimeTypeChanged, this);
            this._model.value.text = cellModel.value.text.split('\n')[0];
            this._model.mimeType = cellModel.mimeType;
            const model = this._model;
            const editorWidget = new _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditorWrapper({ model, factory });
            editorWidget.addClass('jp-InputArea-editor');
            editorWidget.addClass('jp-InputArea-editor');
            editorWidget.editor.setOption('readOnly', true);
            layout.addWidget(prompt);
            layout.addWidget(editorWidget);
        }
        /**
         * Handle a change to the current editor value.
         */
        _onValueChanged() {
            this._model.value.text = this._cellModel.value.text.split('\n')[0];
        }
        /**
         * Handle a change to the current editor mimetype.
         */
        _onMimeTypeChanged() {
            this._model.mimeType = this._cellModel.mimeType;
        }
    }
    NotebookTools.ActiveCellTool = ActiveCellTool;
    /**
     * A raw metadata editor.
     */
    class MetadataEditorTool extends Tool {
        /**
         * Construct a new raw metadata tool.
         */
        constructor(options) {
            super();
            const { editorFactory } = options;
            this.addClass('jp-MetadataEditorTool');
            const layout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__.PanelLayout());
            this.editor = new _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.JSONEditor({
                editorFactory
            });
            this.editor.title.label = options.label || 'Edit Metadata';
            const titleNode = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__.Widget({ node: document.createElement('label') });
            titleNode.node.textContent = options.label || 'Edit Metadata';
            layout.addWidget(titleNode);
            layout.addWidget(this.editor);
        }
    }
    NotebookTools.MetadataEditorTool = MetadataEditorTool;
    /**
     * A notebook metadata editor
     */
    class NotebookMetadataEditorTool extends MetadataEditorTool {
        constructor(options) {
            const translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.nullTranslator;
            const trans = translator.load('jupyterlab');
            options.label = options.label || trans.__('Notebook Metadata');
            super(options);
        }
        /**
         * Handle a change to the notebook.
         */
        onActiveNotebookPanelChanged(msg) {
            this._update();
        }
        /**
         * Handle a change to the notebook metadata.
         */
        onActiveNotebookPanelMetadataChanged(msg) {
            this._update();
        }
        _update() {
            var _a, _b;
            const nb = this.notebookTools.activeNotebookPanel &&
                this.notebookTools.activeNotebookPanel.content;
            this.editor.source = (_b = (_a = nb === null || nb === void 0 ? void 0 : nb.model) === null || _a === void 0 ? void 0 : _a.metadata) !== null && _b !== void 0 ? _b : null;
        }
    }
    NotebookTools.NotebookMetadataEditorTool = NotebookMetadataEditorTool;
    /**
     * A cell metadata editor
     */
    class CellMetadataEditorTool extends MetadataEditorTool {
        constructor(options) {
            const translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.nullTranslator;
            const trans = translator.load('jupyterlab');
            options.label = options.label || trans.__('Cell Metadata');
            super(options);
        }
        /**
         * Handle a change to the active cell.
         */
        onActiveCellChanged(msg) {
            this._update();
        }
        /**
         * Handle a change to the active cell metadata.
         */
        onActiveCellMetadataChanged(msg) {
            this._update();
        }
        _update() {
            const cell = this.notebookTools.activeCell;
            this.editor.source = cell ? cell.model.metadata : null;
        }
    }
    NotebookTools.CellMetadataEditorTool = CellMetadataEditorTool;
    /**
     * A cell tool that provides a selection for a given metadata key.
     */
    class KeySelector extends Tool {
        /**
         * Construct a new KeySelector.
         */
        constructor(options) {
            // TODO: use react
            super({ node: Private.createSelectorNode(options) });
            /**
             * Get the value for the data.
             */
            this._getValue = (cell) => {
                let value = cell.model.metadata.get(this.key);
                if (value === undefined) {
                    value = this._default;
                }
                return value;
            };
            /**
             * Set the value for the data.
             */
            this._setValue = (cell, value) => {
                if (value === this._default) {
                    cell.model.metadata.delete(this.key);
                }
                else {
                    cell.model.metadata.set(this.key, value);
                }
            };
            this._changeGuard = false;
            this.addClass('jp-KeySelector');
            this.key = options.key;
            this._default = options.default;
            this._validCellTypes = options.validCellTypes || [];
            this._getter = options.getter || this._getValue;
            this._setter = options.setter || this._setValue;
        }
        /**
         * The select node for the widget.
         */
        get selectNode() {
            return this.node.getElementsByTagName('select')[0];
        }
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
                case 'change':
                    this.onValueChanged();
                    break;
                default:
                    break;
            }
        }
        /**
         * Handle `after-attach` messages for the widget.
         */
        onAfterAttach(msg) {
            const node = this.selectNode;
            node.addEventListener('change', this);
        }
        /**
         * Handle `before-detach` messages for the widget.
         */
        onBeforeDetach(msg) {
            const node = this.selectNode;
            node.removeEventListener('change', this);
        }
        /**
         * Handle a change to the active cell.
         */
        onActiveCellChanged(msg) {
            const select = this.selectNode;
            const activeCell = this.notebookTools.activeCell;
            if (!activeCell) {
                select.disabled = true;
                select.value = '';
                return;
            }
            const cellType = activeCell.model.type;
            if (this._validCellTypes.length &&
                this._validCellTypes.indexOf(cellType) === -1) {
                select.value = '';
                select.disabled = true;
                return;
            }
            select.disabled = false;
            this._changeGuard = true;
            const getter = this._getter;
            select.value = JSON.stringify(getter(activeCell));
            this._changeGuard = false;
        }
        /**
         * Handle a change to the metadata of the active cell.
         */
        onActiveCellMetadataChanged(msg) {
            if (this._changeGuard) {
                return;
            }
            const select = this.selectNode;
            const cell = this.notebookTools.activeCell;
            if (msg.args.key === this.key && cell) {
                this._changeGuard = true;
                const getter = this._getter;
                select.value = JSON.stringify(getter(cell));
                this._changeGuard = false;
            }
        }
        /**
         * Handle a change to the value.
         */
        onValueChanged() {
            const activeCell = this.notebookTools.activeCell;
            if (!activeCell || this._changeGuard) {
                return;
            }
            this._changeGuard = true;
            const select = this.selectNode;
            const setter = this._setter;
            setter(activeCell, JSON.parse(select.value));
            this._changeGuard = false;
        }
    }
    NotebookTools.KeySelector = KeySelector;
    /**
     * Create a slideshow selector.
     */
    function createSlideShowSelector(translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.nullTranslator;
        const trans = translator.load('jupyterlab');
        trans.__('');
        const options = {
            key: 'slideshow',
            title: trans.__('Slide Type'),
            optionValueArray: [
                ['-', null],
                [trans.__('Slide'), 'slide'],
                [trans.__('Sub-Slide'), 'subslide'],
                [trans.__('Fragment'), 'fragment'],
                [trans.__('Skip'), 'skip'],
                [trans.__('Notes'), 'notes']
            ],
            getter: cell => {
                const value = cell.model.metadata.get('slideshow');
                return value && value['slide_type'];
            },
            setter: (cell, value) => {
                let data = cell.model.metadata.get('slideshow') || Object.create(null);
                if (value === null) {
                    // Make a shallow copy so we aren't modifying the original metadata.
                    data = Object.assign({}, data);
                    delete data.slide_type;
                }
                else {
                    data = Object.assign(Object.assign({}, data), { slide_type: value });
                }
                if (Object.keys(data).length > 0) {
                    cell.model.metadata.set('slideshow', data);
                }
                else {
                    cell.model.metadata.delete('slideshow');
                }
            }
        };
        return new KeySelector(options);
    }
    NotebookTools.createSlideShowSelector = createSlideShowSelector;
    /**
     * Create an nbconvert selector.
     */
    function createNBConvertSelector(optionValueArray, translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.nullTranslator;
        const trans = translator.load('jupyterlab');
        return new KeySelector({
            key: 'raw_mimetype',
            title: trans.__('Raw NBConvert Format'),
            optionValueArray: optionValueArray,
            validCellTypes: ['raw']
        });
    }
    NotebookTools.createNBConvertSelector = createNBConvertSelector;
})(NotebookTools || (NotebookTools = {}));
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * A comparator function for widget rank items.
     */
    function itemCmp(first, second) {
        return first.rank - second.rank;
    }
    Private.itemCmp = itemCmp;
    /**
     * Create the node for a KeySelector.
     */
    function createSelectorNode(options) {
        const name = options.key;
        const title = options.title || name[0].toLocaleUpperCase() + name.slice(1);
        const optionNodes = [];
        let value;
        let option;
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.each)(options.optionValueArray, item => {
            option = item[0];
            value = JSON.stringify(item[1]);
            optionNodes.push(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_6__.h.option({ value }, option));
        });
        const node = _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_6__.VirtualDOM.realize(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_6__.h.div({}, _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_6__.h.label(title, _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_6__.h.select({}, optionNodes))));
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Styling.styleNode(node);
        return node;
    }
    Private.createSelectorNode = createSelectorNode;
})(Private || (Private = {}));
//# sourceMappingURL=notebooktools.js.map

/***/ }),

/***/ "../../packages/notebook/lib/panel.js":
/*!********************************************!*\
  !*** ../../packages/notebook/lib/panel.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotebookPanel": () => (/* binding */ NotebookPanel)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/cells */ "webpack/sharing/consume/default/@jupyterlab/cells/@jupyterlab/cells");
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./widget */ "../../packages/notebook/lib/widget.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.








/**
 * The class name added to notebook panels.
 */
const NOTEBOOK_PANEL_CLASS = 'jp-NotebookPanel';
const NOTEBOOK_PANEL_TOOLBAR_CLASS = 'jp-NotebookPanel-toolbar';
const NOTEBOOK_PANEL_NOTEBOOK_CLASS = 'jp-NotebookPanel-notebook';
/**
 * The class name to add when the document is loaded for the search box.
 */
const SEARCH_DOCUMENT_LOADED_CLASS = 'jp-DocumentSearch-document-loaded';
/**
 * A widget that hosts a notebook toolbar and content area.
 *
 * #### Notes
 * The widget keeps the document metadata in sync with the current
 * kernel on the context.
 */
class NotebookPanel extends _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_3__.DocumentWidget {
    /**
     * Construct a new notebook panel.
     */
    constructor(options) {
        super(options);
        /**
         * Whether we are currently in a series of autorestarts we have already
         * notified the user about.
         */
        this._autorestarting = false;
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        // Set up CSS classes
        this.addClass(NOTEBOOK_PANEL_CLASS);
        this.toolbar.addClass(NOTEBOOK_PANEL_TOOLBAR_CLASS);
        this.content.addClass(NOTEBOOK_PANEL_NOTEBOOK_CLASS);
        // Set up things related to the context
        this.content.model = this.context.model;
        this.context.sessionContext.kernelChanged.connect(this._onKernelChanged, this);
        this.context.sessionContext.statusChanged.connect(this._onSessionStatusChanged, this);
        this.content.fullyRendered.connect(this._onFullyRendered, this);
        this.context.saveState.connect(this._onSave, this);
        void this.revealed.then(() => {
            if (this.isDisposed) {
                // this widget has already been disposed, bail
                return;
            }
            // Set the document edit mode on initial open if it looks like a new document.
            if (this.content.widgets.length === 1) {
                const cellModel = this.content.widgets[0].model;
                if (cellModel.type === 'code' && cellModel.value.text === '') {
                    this.content.mode = 'edit';
                }
            }
        });
    }
    _onSave(sender, state) {
        if (state === 'started' && this.model) {
            // Find markdown cells
            const { cells } = this.model;
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_5__.each)(cells, cell => {
                if ((0,_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_1__.isMarkdownCellModel)(cell)) {
                    for (const key of cell.attachments.keys) {
                        if (!cell.value.text.includes(key)) {
                            cell.attachments.remove(key);
                        }
                    }
                }
            });
        }
    }
    /**
     * The session context used by the panel.
     */
    get sessionContext() {
        return this.context.sessionContext;
    }
    /**
     * The model for the widget.
     */
    get model() {
        return this.content.model;
    }
    /**
     * Update the options for the current notebook panel.
     *
     * @param config new options to set
     */
    setConfig(config) {
        this.content.editorConfig = config.editorConfig;
        this.content.notebookConfig = config.notebookConfig;
        // Update kernel shutdown behavior
        const kernelPreference = this.context.sessionContext.kernelPreference;
        this.context.sessionContext.kernelPreference = Object.assign(Object.assign({}, kernelPreference), { shutdownOnDispose: config.kernelShutdown });
    }
    /**
     * Set URI fragment identifier.
     */
    setFragment(fragment) {
        void this.context.ready.then(() => {
            this.content.setFragment(fragment);
        });
    }
    /**
     * Dispose of the resources used by the widget.
     */
    dispose() {
        this.content.dispose();
        super.dispose();
    }
    /**
     * Prints the notebook by converting to HTML with nbconvert.
     */
    [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Printing.symbol]() {
        return async () => {
            // Save before generating HTML
            if (this.context.model.dirty && !this.context.model.readOnly) {
                await this.context.save();
            }
            await _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Printing.printURL(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getNBConvertURL({
                format: 'html',
                download: false,
                path: this.context.path
            }));
        };
    }
    /**
     * Handle a fully rendered signal notebook.
     */
    _onFullyRendered(notebook, fullyRendered) {
        fullyRendered
            ? this.removeClass(SEARCH_DOCUMENT_LOADED_CLASS)
            : this.addClass(SEARCH_DOCUMENT_LOADED_CLASS);
    }
    /**
     * Handle a change in the kernel by updating the document metadata.
     */
    _onKernelChanged(sender, args) {
        if (!this.model || !args.newValue) {
            return;
        }
        const { newValue } = args;
        void newValue.info.then(info => {
            var _a;
            if (this.model &&
                ((_a = this.context.sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel) === newValue) {
                this._updateLanguage(info.language_info);
            }
        });
        void this._updateSpec(newValue);
    }
    _onSessionStatusChanged(sender, status) {
        var _a;
        // If the status is autorestarting, and we aren't already in a series of
        // autorestarts, show the dialog.
        if (status === 'autorestarting' && !this._autorestarting) {
            // The kernel died and the server is restarting it. We notify the user so
            // they know why their kernel state is gone.
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: this._trans.__('Kernel Restarting'),
                body: this._trans.__('The kernel for %1 appears to have died. It will restart automatically.', (_a = this.sessionContext.session) === null || _a === void 0 ? void 0 : _a.path),
                buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: this._trans.__('Ok') })]
            });
            this._autorestarting = true;
        }
        else if (status === 'restarting') {
            // Another autorestart attempt will first change the status to
            // restarting, then to autorestarting again, so we don't reset the
            // autorestarting status if the status is 'restarting'.
            /* no-op */
        }
        else {
            this._autorestarting = false;
        }
    }
    /**
     * Update the kernel language.
     */
    _updateLanguage(language) {
        this.model.metadata.set('language_info', language);
    }
    /**
     * Update the kernel spec.
     */
    async _updateSpec(kernel) {
        const spec = await kernel.spec;
        if (this.isDisposed) {
            return;
        }
        this.model.metadata.set('kernelspec', {
            name: kernel.name,
            display_name: spec === null || spec === void 0 ? void 0 : spec.display_name,
            language: spec === null || spec === void 0 ? void 0 : spec.language
        });
    }
}
/**
 * A namespace for `NotebookPanel` statics.
 */
(function (NotebookPanel) {
    /**
     * The default implementation of an `IContentFactory`.
     */
    class ContentFactory extends _widget__WEBPACK_IMPORTED_MODULE_7__.Notebook.ContentFactory {
        /**
         * Create a new content area for the panel.
         */
        createNotebook(options) {
            return new _widget__WEBPACK_IMPORTED_MODULE_7__.Notebook(options);
        }
    }
    NotebookPanel.ContentFactory = ContentFactory;
    /**
     * Default content factory for the notebook panel.
     */
    NotebookPanel.defaultContentFactory = new ContentFactory();
    /* tslint:disable */
    /**
     * The notebook renderer token.
     */
    NotebookPanel.IContentFactory = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_6__.Token('@jupyterlab/notebook:IContentFactory');
    /* tslint:enable */
})(NotebookPanel || (NotebookPanel = {}));
//# sourceMappingURL=panel.js.map

/***/ }),

/***/ "../../packages/notebook/lib/tokens.js":
/*!*********************************************!*\
  !*** ../../packages/notebook/lib/tokens.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INotebookWidgetFactory": () => (/* binding */ INotebookWidgetFactory),
/* harmony export */   "INotebookTools": () => (/* binding */ INotebookTools),
/* harmony export */   "INotebookTracker": () => (/* binding */ INotebookTracker)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The notebook widget factory token.
 */
const INotebookWidgetFactory = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/notebook:INotebookWidgetFactory');
/* tslint:enable */
/* tslint:disable */
/**
 * The notebook tools token.
 */
const INotebookTools = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/notebook:INotebookTools');
/* tslint:disable */
/**
 * The notebook tracker token.
 */
const INotebookTracker = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/notebook:INotebookTracker');
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/notebook/lib/tracker.js":
/*!**********************************************!*\
  !*** ../../packages/notebook/lib/tracker.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotebookTracker": () => (/* binding */ NotebookTracker)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_1__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


class NotebookTracker extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.WidgetTracker {
    constructor() {
        super(...arguments);
        this._activeCell = null;
        this._activeCellChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
        this._selectionChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
    }
    /**
     * The currently focused cell.
     *
     * #### Notes
     * This is a read-only property. If there is no cell with the focus, then this
     * value is `null`.
     */
    get activeCell() {
        const widget = this.currentWidget;
        if (!widget) {
            return null;
        }
        return widget.content.activeCell || null;
    }
    /**
     * A signal emitted when the current active cell changes.
     *
     * #### Notes
     * If there is no cell with the focus, then `null` will be emitted.
     */
    get activeCellChanged() {
        return this._activeCellChanged;
    }
    /**
     * A signal emitted when the selection state changes.
     */
    get selectionChanged() {
        return this._selectionChanged;
    }
    /**
     * Add a new notebook panel to the tracker.
     *
     * @param panel - The notebook panel being added.
     */
    add(panel) {
        const promise = super.add(panel);
        panel.content.activeCellChanged.connect(this._onActiveCellChanged, this);
        panel.content.selectionChanged.connect(this._onSelectionChanged, this);
        return promise;
    }
    /**
     * Dispose of the resources held by the tracker.
     */
    dispose() {
        this._activeCell = null;
        super.dispose();
    }
    /**
     * Handle the current change event.
     */
    onCurrentChanged(widget) {
        // Store an internal reference to active cell to prevent false positives.
        const activeCell = this.activeCell;
        if (activeCell && activeCell === this._activeCell) {
            return;
        }
        this._activeCell = activeCell;
        if (!widget) {
            return;
        }
        // Since the notebook has changed, immediately signal an active cell change
        this._activeCellChanged.emit(widget.content.activeCell || null);
    }
    _onActiveCellChanged(sender, cell) {
        // Check if the active cell change happened for the current notebook.
        if (this.currentWidget && this.currentWidget.content === sender) {
            this._activeCell = cell || null;
            this._activeCellChanged.emit(this._activeCell);
        }
    }
    _onSelectionChanged(sender) {
        // Check if the selection change happened for the current notebook.
        if (this.currentWidget && this.currentWidget.content === sender) {
            this._selectionChanged.emit(void 0);
        }
    }
}
//# sourceMappingURL=tracker.js.map

/***/ }),

/***/ "../../packages/notebook/lib/truststatus.js":
/*!**************************************************!*\
  !*** ../../packages/notebook/lib/truststatus.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotebookTrustStatus": () => (/* binding */ NotebookTrustStatus)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);





/**
 * Determine the notebook trust status message.
 */
function cellTrust(props, translator) {
    translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
    const trans = translator.load('jupyterlab');
    if (props.trustedCells === props.totalCells) {
        return [
            trans.__('Notebook trusted: %1 of %2 cells trusted.', props.trustedCells, props.totalCells),
            'jp-StatusItem-trusted'
        ];
    }
    else if (props.activeCellTrusted) {
        return [
            trans.__('Active cell trusted: %1 of %2 cells trusted.', props.trustedCells, props.totalCells),
            'jp-StatusItem-trusted'
        ];
    }
    else {
        return [
            trans.__('Notebook not trusted: %1 of %2 cells trusted.', props.trustedCells, props.totalCells),
            'jp-StatusItem-untrusted'
        ];
    }
}
/**
 * A pure function for a notebook trust status component.
 *
 * @param props: the props for the component.
 *
 * @returns a tsx component for notebook trust.
 */
function NotebookTrustComponent(props) {
    if (props.allCellsTrusted) {
        return react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.trustedIcon.react, { top: '2px', stylesheet: 'statusBar' });
    }
    else {
        return react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.notTrustedIcon.react, { top: '2px', stylesheet: 'statusBar' });
    }
}
/**
 * The NotebookTrust status item.
 */
class NotebookTrustStatus extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomRenderer {
    /**
     * Construct a new status item.
     */
    constructor(translator) {
        super(new NotebookTrustStatus.Model());
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
    }
    /**
     * Render the NotebookTrust status item.
     */
    render() {
        if (!this.model) {
            return null;
        }
        this.node.title = cellTrust(this.model, this.translator)[0];
        return (react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_4___default().createElement(NotebookTrustComponent, { allCellsTrusted: this.model.trustedCells === this.model.totalCells, activeCellTrusted: this.model.activeCellTrusted, totalCells: this.model.totalCells, trustedCells: this.model.trustedCells })));
    }
}
/**
 * A namespace for NotebookTrust statics.
 */
(function (NotebookTrustStatus) {
    /**
     * A VDomModel for the NotebookTrust status item.
     */
    class Model extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomModel {
        constructor() {
            super(...arguments);
            this._trustedCells = 0;
            this._totalCells = 0;
            this._activeCellTrusted = false;
            this._notebook = null;
        }
        /**
         * The number of trusted cells in the current notebook.
         */
        get trustedCells() {
            return this._trustedCells;
        }
        /**
         * The total number of cells in the current notebook.
         */
        get totalCells() {
            return this._totalCells;
        }
        /**
         * Whether the active cell is trusted.
         */
        get activeCellTrusted() {
            return this._activeCellTrusted;
        }
        /**
         * The current notebook for the model.
         */
        get notebook() {
            return this._notebook;
        }
        set notebook(model) {
            const oldNotebook = this._notebook;
            if (oldNotebook !== null) {
                oldNotebook.activeCellChanged.disconnect(this._onActiveCellChanged, this);
                oldNotebook.modelContentChanged.disconnect(this._onModelChanged, this);
            }
            const oldState = this._getAllState();
            this._notebook = model;
            if (this._notebook === null) {
                this._trustedCells = 0;
                this._totalCells = 0;
                this._activeCellTrusted = false;
            }
            else {
                // Add listeners
                this._notebook.activeCellChanged.connect(this._onActiveCellChanged, this);
                this._notebook.modelContentChanged.connect(this._onModelChanged, this);
                // Derive values
                if (this._notebook.activeCell !== undefined) {
                    this._activeCellTrusted = this._notebook.activeCell.model.trusted;
                }
                else {
                    this._activeCellTrusted = false;
                }
                const { total, trusted } = this._deriveCellTrustState(this._notebook.model);
                this._totalCells = total;
                this._trustedCells = trusted;
            }
            this._triggerChange(oldState, this._getAllState());
        }
        /**
         * When the notebook model changes, update the trust state.
         */
        _onModelChanged(notebook) {
            const oldState = this._getAllState();
            const { total, trusted } = this._deriveCellTrustState(notebook.model);
            this._totalCells = total;
            this._trustedCells = trusted;
            this._triggerChange(oldState, this._getAllState());
        }
        /**
         * When the active cell changes, update the trust state.
         */
        _onActiveCellChanged(model, cell) {
            const oldState = this._getAllState();
            if (cell) {
                this._activeCellTrusted = cell.model.trusted;
            }
            else {
                this._activeCellTrusted = false;
            }
            this._triggerChange(oldState, this._getAllState());
        }
        /**
         * Given a notebook model, figure out how many of the cells are trusted.
         */
        _deriveCellTrustState(model) {
            if (model === null) {
                return { total: 0, trusted: 0 };
            }
            const cells = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.toArray)(model.cells);
            const trusted = cells.reduce((accum, current) => {
                if (current.trusted) {
                    return accum + 1;
                }
                else {
                    return accum;
                }
            }, 0);
            const total = cells.length;
            return {
                total,
                trusted
            };
        }
        /**
         * Get the current state of the model.
         */
        _getAllState() {
            return [this._trustedCells, this._totalCells, this.activeCellTrusted];
        }
        /**
         * Trigger a change in the renderer.
         */
        _triggerChange(oldState, newState) {
            if (oldState[0] !== newState[0] ||
                oldState[1] !== newState[1] ||
                oldState[2] !== newState[2]) {
                this.stateChanged.emit(void 0);
            }
        }
    }
    NotebookTrustStatus.Model = Model;
})(NotebookTrustStatus || (NotebookTrustStatus = {}));
//# sourceMappingURL=truststatus.js.map

/***/ }),

/***/ "../../packages/notebook/lib/widget.js":
/*!*********************************************!*\
  !*** ../../packages/notebook/lib/widget.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StaticNotebook": () => (/* binding */ StaticNotebook),
/* harmony export */   "Notebook": () => (/* binding */ Notebook)
/* harmony export */ });
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/cells */ "webpack/sharing/consume/default/@jupyterlab/cells/@jupyterlab/cells");
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/domutils */ "webpack/sharing/consume/default/@lumino/domutils/@lumino/domutils?0bc5");
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_domutils__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_dragdrop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/dragdrop */ "webpack/sharing/consume/default/@lumino/dragdrop/@lumino/dragdrop?1f0e");
/* harmony import */ var _lumino_dragdrop__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_dragdrop__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/properties */ "webpack/sharing/consume/default/@lumino/properties/@lumino/properties?140a");
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_properties__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @lumino/virtualdom */ "webpack/sharing/consume/default/@lumino/virtualdom/@lumino/virtualdom?7070");
/* harmony import */ var _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./actions */ "../../packages/notebook/lib/actions.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.












/**
 * The data attribute added to a widget that has an active kernel.
 */
const KERNEL_USER = 'jpKernelUser';
/**
 * The data attribute added to a widget that can run code.
 */
const CODE_RUNNER = 'jpCodeRunner';
/**
 * The data attribute added to a widget that can undo.
 */
const UNDOER = 'jpUndoer';
/**
 * The class name added to notebook widgets.
 */
const NB_CLASS = 'jp-Notebook';
/**
 * The class name added to notebook widget cells.
 */
const NB_CELL_CLASS = 'jp-Notebook-cell';
/**
 * The class name added to a notebook in edit mode.
 */
const EDIT_CLASS = 'jp-mod-editMode';
/**
 * The class name added to a notebook in command mode.
 */
const COMMAND_CLASS = 'jp-mod-commandMode';
/**
 * The class name added to the active cell.
 */
const ACTIVE_CLASS = 'jp-mod-active';
/**
 * The class name added to selected cells.
 */
const SELECTED_CLASS = 'jp-mod-selected';
/**
 * The class name added to an active cell when there are other selected cells.
 */
const OTHER_SELECTED_CLASS = 'jp-mod-multiSelected';
/**
 * The class name added to unconfined images.
 */
const UNCONFINED_CLASS = 'jp-mod-unconfined';
/**
 * The class name added to a drop target.
 */
const DROP_TARGET_CLASS = 'jp-mod-dropTarget';
/**
 * The class name added to a drop source.
 */
const DROP_SOURCE_CLASS = 'jp-mod-dropSource';
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
/**
 * The mimetype used for Jupyter cell data.
 */
const JUPYTER_CELL_MIME = 'application/vnd.jupyter.cells';
/**
 * The threshold in pixels to start a drag event.
 */
const DRAG_THRESHOLD = 5;
/**
 * The class attached to the heading collapser button
 */
const HEADING_COLLAPSER_CLASS = 'jp-collapseHeadingButton';
const SIDE_BY_SIDE_CLASS = 'jp-mod-sideBySide';
if (window.requestIdleCallback === undefined) {
    // On Safari, requestIdleCallback is not available, so we use replacement functions for `idleCallbacks`
    // See: https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API#falling_back_to_settimeout
    window.requestIdleCallback = function (handler) {
        let startTime = Date.now();
        return setTimeout(function () {
            handler({
                didTimeout: false,
                timeRemaining: function () {
                    return Math.max(0, 50.0 - (Date.now() - startTime));
                }
            });
        }, 1);
    };
    window.cancelIdleCallback = function (id) {
        clearTimeout(id);
    };
}
/**
 * A widget which renders static non-interactive notebooks.
 *
 * #### Notes
 * The widget model must be set separately and can be changed
 * at any time.  Consumers of the widget must account for a
 * `null` model, and may want to listen to the `modelChanged`
 * signal.
 */
class StaticNotebook extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_10__.Widget {
    /**
     * Construct a notebook widget.
     */
    constructor(options) {
        var _a, _b;
        super();
        this._editorConfig = StaticNotebook.defaultEditorConfig;
        this._notebookConfig = StaticNotebook.defaultNotebookConfig;
        this._mimetype = 'text/plain';
        this._model = null;
        this._modelChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_8__.Signal(this);
        this._modelContentChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_8__.Signal(this);
        this._fullyRendered = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_8__.Signal(this);
        this._placeholderCellRendered = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_8__.Signal(this);
        this._renderedCellsCount = 0;
        this.addClass(NB_CLASS);
        this.node.dataset[KERNEL_USER] = 'true';
        this.node.dataset[UNDOER] = 'true';
        this.node.dataset[CODE_RUNNER] = 'true';
        this.rendermime = options.rendermime;
        this.translator = (_a = options.translator) !== null && _a !== void 0 ? _a : _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        this.layout = new Private.NotebookPanelLayout();
        this.contentFactory =
            options.contentFactory || StaticNotebook.defaultContentFactory;
        this.editorConfig =
            options.editorConfig || StaticNotebook.defaultEditorConfig;
        this.notebookConfig =
            options.notebookConfig || StaticNotebook.defaultNotebookConfig;
        this._mimetypeService = options.mimeTypeService;
        this.renderingLayout = (_b = options.notebookConfig) === null || _b === void 0 ? void 0 : _b.renderingLayout;
        // Section for the virtual-notebook behavior.
        this._idleCallBack = null;
        this._toRenderMap = new Map();
        this._cellsArray = new Array();
        if ('IntersectionObserver' in window) {
            this._observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(o => {
                    if (o.isIntersecting) {
                        observer.unobserve(o.target);
                        const ci = this._toRenderMap.get(o.target.id);
                        if (ci) {
                            const { cell, index } = ci;
                            this._renderPlaceholderCell(cell, index);
                        }
                    }
                });
            }, {
                root: this.node,
                threshold: 1,
                rootMargin: `${this.notebookConfig.observedTopMargin} 0px ${this.notebookConfig.observedBottomMargin} 0px`
            });
        }
    }
    /**
     * A signal emitted when the notebook is fully rendered.
     */
    get fullyRendered() {
        return this._fullyRendered;
    }
    /**
     * A signal emitted when the a placeholder cell is rendered.
     */
    get placeholderCellRendered() {
        return this._placeholderCellRendered;
    }
    /**
     * A signal emitted when the model of the notebook changes.
     */
    get modelChanged() {
        return this._modelChanged;
    }
    /**
     * A signal emitted when the model content changes.
     *
     * #### Notes
     * This is a convenience signal that follows the current model.
     */
    get modelContentChanged() {
        return this._modelContentChanged;
    }
    /**
     * The model for the widget.
     */
    get model() {
        return this._model;
    }
    set model(newValue) {
        newValue = newValue || null;
        if (this._model === newValue) {
            return;
        }
        const oldValue = this._model;
        this._model = newValue;
        if (oldValue && oldValue.modelDB.isCollaborative) {
            void oldValue.modelDB.connected.then(() => {
                oldValue.modelDB.collaborators.changed.disconnect(this._onCollaboratorsChanged, this);
            });
        }
        if (newValue && newValue.modelDB.isCollaborative) {
            void newValue.modelDB.connected.then(() => {
                newValue.modelDB.collaborators.changed.connect(this._onCollaboratorsChanged, this);
            });
        }
        // Trigger private, protected, and public changes.
        this._onModelChanged(oldValue, newValue);
        this.onModelChanged(oldValue, newValue);
        this._modelChanged.emit(void 0);
    }
    /**
     * Get the mimetype for code cells.
     */
    get codeMimetype() {
        return this._mimetype;
    }
    /**
     * A read-only sequence of the widgets in the notebook.
     */
    get widgets() {
        return this.layout.widgets;
    }
    /**
     * A configuration object for cell editor settings.
     */
    get editorConfig() {
        return this._editorConfig;
    }
    set editorConfig(value) {
        this._editorConfig = value;
        this._updateEditorConfig();
    }
    /**
     * A configuration object for notebook settings.
     */
    get notebookConfig() {
        return this._notebookConfig;
    }
    set notebookConfig(value) {
        this._notebookConfig = value;
        this._updateNotebookConfig();
    }
    get renderingLayout() {
        return this._renderingLayout;
    }
    set renderingLayout(value) {
        this._renderingLayout = value;
        if (this._renderingLayout === 'side-by-side') {
            this.node.classList.add(SIDE_BY_SIDE_CLASS);
        }
        else {
            this.node.classList.remove(SIDE_BY_SIDE_CLASS);
        }
    }
    /**
     * Dispose of the resources held by the widget.
     */
    dispose() {
        // Do nothing if already disposed.
        if (this.isDisposed) {
            return;
        }
        this._model = null;
        super.dispose();
    }
    /**
     * Handle a new model.
     *
     * #### Notes
     * This method is called after the model change has been handled
     * internally and before the `modelChanged` signal is emitted.
     * The default implementation is a no-op.
     */
    onModelChanged(oldValue, newValue) {
        // No-op.
    }
    /**
     * Handle changes to the notebook model content.
     *
     * #### Notes
     * The default implementation emits the `modelContentChanged` signal.
     */
    onModelContentChanged(model, args) {
        this._modelContentChanged.emit(void 0);
    }
    /**
     * Handle changes to the notebook model metadata.
     *
     * #### Notes
     * The default implementation updates the mimetypes of the code cells
     * when the `language_info` metadata changes.
     */
    onMetadataChanged(sender, args) {
        switch (args.key) {
            case 'language_info':
                this._updateMimetype();
                break;
            default:
                break;
        }
    }
    /**
     * Handle a cell being inserted.
     *
     * The default implementation is a no-op
     */
    onCellInserted(index, cell) {
        // This is a no-op.
    }
    /**
     * Handle a cell being moved.
     *
     * The default implementation is a no-op
     */
    onCellMoved(fromIndex, toIndex) {
        // This is a no-op.
    }
    /**
     * Handle a cell being removed.
     *
     * The default implementation is a no-op
     */
    onCellRemoved(index, cell) {
        // This is a no-op.
    }
    /**
     * Handle a new model on the widget.
     */
    _onModelChanged(oldValue, newValue) {
        const layout = this.layout;
        if (oldValue) {
            oldValue.cells.changed.disconnect(this._onCellsChanged, this);
            oldValue.metadata.changed.disconnect(this.onMetadataChanged, this);
            oldValue.contentChanged.disconnect(this.onModelContentChanged, this);
            // TODO: reuse existing cell widgets if possible. Remember to initially
            // clear the history of each cell if we do this.
            while (layout.widgets.length) {
                this._removeCell(0);
            }
        }
        if (!newValue) {
            this._mimetype = 'text/plain';
            return;
        }
        this._updateMimetype();
        const cells = newValue.cells;
        if (!cells.length && newValue.isInitialized) {
            cells.push(newValue.contentFactory.createCell(this.notebookConfig.defaultCell, {}));
        }
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(cells, (cell, i) => {
            this._insertCell(i, cell, 'set');
        });
        cells.changed.connect(this._onCellsChanged, this);
        newValue.contentChanged.connect(this.onModelContentChanged, this);
        newValue.metadata.changed.connect(this.onMetadataChanged, this);
    }
    /**
     * Handle a change cells event.
     */
    _onCellsChanged(sender, args) {
        let index = 0;
        switch (args.type) {
            case 'add':
                index = args.newIndex;
                // eslint-disable-next-line no-case-declarations
                const insertType = args.oldIndex == -1 ? 'push' : 'insert';
                (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(args.newValues, value => {
                    this._insertCell(index++, value, insertType);
                });
                break;
            case 'move':
                this._moveCell(args.oldIndex, args.newIndex);
                break;
            case 'remove':
                (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(args.oldValues, value => {
                    this._removeCell(args.oldIndex);
                });
                // Add default cell if there are no cells remaining.
                if (!sender.length) {
                    const model = this.model;
                    // Add the cell in a new context to avoid triggering another
                    // cell changed event during the handling of this signal.
                    requestAnimationFrame(() => {
                        if (model && !model.isDisposed && !model.cells.length) {
                            model.cells.push(model.contentFactory.createCell(this.notebookConfig.defaultCell, {}));
                        }
                    });
                }
                break;
            case 'set':
                // TODO: reuse existing widgets if possible.
                index = args.newIndex;
                (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(args.newValues, value => {
                    // Note: this ordering (insert then remove)
                    // is important for getting the active cell
                    // index for the editable notebook correct.
                    this._insertCell(index, value, 'set');
                    this._removeCell(index + 1);
                    index++;
                });
                break;
            default:
                return;
        }
    }
    /**
     * Create a cell widget and insert into the notebook.
     */
    _insertCell(index, cell, insertType) {
        let widget;
        switch (cell.type) {
            case 'code':
                widget = this._createCodeCell(cell);
                widget.model.mimeType = this._mimetype;
                break;
            case 'markdown':
                widget = this._createMarkdownCell(cell);
                if (cell.value.text === '') {
                    widget.rendered = false;
                }
                break;
            default:
                widget = this._createRawCell(cell);
        }
        widget.addClass(NB_CELL_CLASS);
        const layout = this.layout;
        this._cellsArray.push(widget);
        if (this._observer &&
            insertType === 'push' &&
            this._renderedCellsCount >=
                this.notebookConfig.numberCellsToRenderDirectly &&
            cell.type !== 'markdown') {
            // We have an observer and we are have been asked to push (not to insert).
            // and we are above the number of cells to render directly, then
            // we will add a placeholder and let the intersection observer or the
            // idle browser render those placeholder cells.
            this._toRenderMap.set(widget.model.id, { index: index, cell: widget });
            const placeholder = this._createPlaceholderCell(cell, index);
            placeholder.node.id = widget.model.id;
            layout.insertWidget(index, placeholder);
            this.onCellInserted(index, placeholder);
            this._fullyRendered.emit(false);
            this._observer.observe(placeholder.node);
        }
        else {
            // We have no intersection observer, or we insert, or we are below
            // the number of cells to render directly, so we render directly.
            layout.insertWidget(index, widget);
            this.onCellInserted(index, widget);
            this._incrementRenderedCount();
        }
        this._scheduleCellRenderOnIdle();
    }
    _scheduleCellRenderOnIdle() {
        if (this._observer &&
            this.notebookConfig.renderCellOnIdle &&
            !this.isDisposed) {
            if (!this._idleCallBack) {
                const renderPlaceholderCells = this._renderPlaceholderCells.bind(this);
                this._idleCallBack = window.requestIdleCallback(renderPlaceholderCells, {
                    timeout: 3000
                });
            }
        }
    }
    _renderPlaceholderCells(deadline) {
        if (this.notebookConfig.remainingTimeBeforeRescheduling > 0) {
            const timeRemaining = deadline.timeRemaining();
            // In case this got triggered because of timeout or when there are screen updates (https://w3c.github.io/requestidlecallback/#idle-periods),
            // avoiding the render and rescheduling the place holder cell rendering.
            if (deadline.didTimeout ||
                timeRemaining < this.notebookConfig.remainingTimeBeforeRescheduling) {
                if (this._idleCallBack) {
                    window.cancelIdleCallback(this._idleCallBack);
                    this._idleCallBack = null;
                }
                this._scheduleCellRenderOnIdle();
            }
        }
        if (this._renderedCellsCount < this._cellsArray.length &&
            this._renderedCellsCount >=
                this.notebookConfig.numberCellsToRenderDirectly) {
            const ci = this._toRenderMap.entries().next();
            this._renderPlaceholderCell(ci.value[1].cell, ci.value[1].index);
        }
    }
    _renderPlaceholderCell(cell, index) {
        // We don't have cancel mechanism for scheduled requestIdleCallback(renderPlaceholderCells),
        // adding defensive check for layout in case tab is closed.
        if (!this.layout) {
            return;
        }
        const pl = this.layout;
        pl.removeWidgetAt(index);
        pl.insertWidget(index, cell);
        this._toRenderMap.delete(cell.model.id);
        this._incrementRenderedCount();
        this.onCellInserted(index, cell);
        this._placeholderCellRendered.emit(cell);
    }
    /**
     * Create a code cell widget from a code cell model.
     */
    _createCodeCell(model) {
        const rendermime = this.rendermime;
        const contentFactory = this.contentFactory;
        const editorConfig = this.editorConfig.code;
        const options = {
            editorConfig,
            model,
            rendermime,
            contentFactory,
            updateEditorOnShow: false,
            placeholder: false,
            maxNumberOutputs: this.notebookConfig.maxNumberOutputs
        };
        const cell = this.contentFactory.createCodeCell(options, this);
        cell.syncCollapse = true;
        cell.syncEditable = true;
        cell.syncScrolled = true;
        return cell;
    }
    /**
     * Create a markdown cell widget from a markdown cell model.
     */
    _createMarkdownCell(model) {
        const rendermime = this.rendermime;
        const contentFactory = this.contentFactory;
        const editorConfig = this.editorConfig.markdown;
        const options = {
            editorConfig,
            model,
            rendermime,
            contentFactory,
            updateEditorOnShow: false,
            placeholder: false,
            showEditorForReadOnlyMarkdown: this._notebookConfig
                .showEditorForReadOnlyMarkdown
        };
        const cell = this.contentFactory.createMarkdownCell(options, this);
        cell.syncCollapse = true;
        cell.syncEditable = true;
        // Connect collapsed signal for each markdown cell widget
        cell.toggleCollapsedSignal.connect((newCell, collapsed) => {
            _actions__WEBPACK_IMPORTED_MODULE_11__.NotebookActions.setHeadingCollapse(newCell, collapsed, this);
        });
        return cell;
    }
    /**
     * Create a placeholder cell widget from a raw cell model.
     */
    _createPlaceholderCell(model, index) {
        const contentFactory = this.contentFactory;
        const editorConfig = this.editorConfig.raw;
        const options = {
            editorConfig,
            model,
            contentFactory,
            updateEditorOnShow: false,
            placeholder: true
        };
        const cell = this.contentFactory.createRawCell(options, this);
        cell.node.innerHTML = `
      <div class="jp-Cell-Placeholder">
        <div class="jp-Cell-Placeholder-wrapper">
        </div>
      </div>`;
        cell.inputHidden = true;
        cell.syncCollapse = true;
        cell.syncEditable = true;
        return cell;
    }
    /**
     * Create a raw cell widget from a raw cell model.
     */
    _createRawCell(model) {
        const contentFactory = this.contentFactory;
        const editorConfig = this.editorConfig.raw;
        const options = {
            editorConfig,
            model,
            contentFactory,
            updateEditorOnShow: false,
            placeholder: false
        };
        const cell = this.contentFactory.createRawCell(options, this);
        cell.syncCollapse = true;
        cell.syncEditable = true;
        return cell;
    }
    /**
     * Move a cell widget.
     */
    _moveCell(fromIndex, toIndex) {
        const layout = this.layout;
        layout.insertWidget(toIndex, layout.widgets[fromIndex]);
        this.onCellMoved(fromIndex, toIndex);
    }
    /**
     * Remove a cell widget.
     */
    _removeCell(index) {
        const layout = this.layout;
        const widget = layout.widgets[index];
        widget.parent = null;
        this.onCellRemoved(index, widget);
        widget.dispose();
    }
    /**
     * Update the mimetype of the notebook.
     */
    _updateMimetype() {
        var _a;
        const info = (_a = this._model) === null || _a === void 0 ? void 0 : _a.metadata.get('language_info');
        if (!info) {
            return;
        }
        this._mimetype = this._mimetypeService.getMimeTypeByLanguage(info);
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(this.widgets, widget => {
            if (widget.model.type === 'code') {
                widget.model.mimeType = this._mimetype;
            }
        });
    }
    /**
     * Handle an update to the collaborators.
     */
    _onCollaboratorsChanged() {
        var _a, _b, _c;
        // If there are selections corresponding to non-collaborators,
        // they are stale and should be removed.
        for (let i = 0; i < this.widgets.length; i++) {
            const cell = this.widgets[i];
            for (const key of cell.model.selections.keys()) {
                if (false === ((_c = (_b = (_a = this._model) === null || _a === void 0 ? void 0 : _a.modelDB) === null || _b === void 0 ? void 0 : _b.collaborators) === null || _c === void 0 ? void 0 : _c.has(key))) {
                    cell.model.selections.delete(key);
                }
            }
        }
    }
    /**
     * Update editor settings for notebook cells.
     */
    _updateEditorConfig() {
        for (let i = 0; i < this.widgets.length; i++) {
            const cell = this.widgets[i];
            let config = {};
            switch (cell.model.type) {
                case 'code':
                    config = this._editorConfig.code;
                    break;
                case 'markdown':
                    config = this._editorConfig.markdown;
                    break;
                default:
                    config = this._editorConfig.raw;
                    break;
            }
            cell.editor.setOptions(Object.assign({}, config));
            cell.editor.refresh();
        }
    }
    /**
     * Apply updated notebook settings.
     */
    _updateNotebookConfig() {
        // Apply scrollPastEnd setting.
        this.toggleClass('jp-mod-scrollPastEnd', this._notebookConfig.scrollPastEnd);
        // Control editor visibility for read-only Markdown cells
        const showEditorForReadOnlyMarkdown = this._notebookConfig
            .showEditorForReadOnlyMarkdown;
        // 'this._cellsArray' check is here as '_updateNotebookConfig()'
        // can be called before 'this._cellsArray' is defined
        if (showEditorForReadOnlyMarkdown !== undefined && this._cellsArray) {
            for (const cell of this._cellsArray) {
                if (cell.model.type === 'markdown') {
                    cell.showEditorForReadOnly = showEditorForReadOnlyMarkdown;
                }
            }
        }
    }
    _incrementRenderedCount() {
        if (this._toRenderMap.size === 0) {
            this._fullyRendered.emit(true);
        }
        this._renderedCellsCount++;
    }
    get remainingCellToRenderCount() {
        return this._toRenderMap.size;
    }
}
/**
 * The namespace for the `StaticNotebook` class statics.
 */
(function (StaticNotebook) {
    /**
     * Default configuration options for cell editors.
     */
    StaticNotebook.defaultEditorConfig = {
        code: Object.assign(Object.assign({}, _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditor.defaultConfig), { lineWrap: 'off', matchBrackets: true, autoClosingBrackets: false }),
        markdown: Object.assign(Object.assign({}, _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditor.defaultConfig), { lineWrap: 'on', matchBrackets: false, autoClosingBrackets: false }),
        raw: Object.assign(Object.assign({}, _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditor.defaultConfig), { lineWrap: 'on', matchBrackets: false, autoClosingBrackets: false })
    };
    /**
     * Default configuration options for notebooks.
     */
    StaticNotebook.defaultNotebookConfig = {
        scrollPastEnd: true,
        defaultCell: 'code',
        recordTiming: false,
        numberCellsToRenderDirectly: 99999,
        remainingTimeBeforeRescheduling: 50,
        renderCellOnIdle: true,
        observedTopMargin: '1000px',
        observedBottomMargin: '1000px',
        maxNumberOutputs: 50,
        showEditorForReadOnlyMarkdown: true,
        disableDocumentWideUndoRedo: false,
        renderingLayout: 'default',
        sideBySideLeftMarginOverride: '10px',
        sideBySideRightMarginOverride: '10px'
    };
    /**
     * The default implementation of an `IContentFactory`.
     */
    class ContentFactory extends _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.Cell.ContentFactory {
        /**
         * Create a new code cell widget.
         *
         * #### Notes
         * If no cell content factory is passed in with the options, the one on the
         * notebook content factory is used.
         */
        createCodeCell(options, parent) {
            if (!options.contentFactory) {
                options.contentFactory = this;
            }
            return new _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.CodeCell(options).initializeState();
        }
        /**
         * Create a new markdown cell widget.
         *
         * #### Notes
         * If no cell content factory is passed in with the options, the one on the
         * notebook content factory is used.
         */
        createMarkdownCell(options, parent) {
            if (!options.contentFactory) {
                options.contentFactory = this;
            }
            return new _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.MarkdownCell(options).initializeState();
        }
        /**
         * Create a new raw cell widget.
         *
         * #### Notes
         * If no cell content factory is passed in with the options, the one on the
         * notebook content factory is used.
         */
        createRawCell(options, parent) {
            if (!options.contentFactory) {
                options.contentFactory = this;
            }
            return new _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.RawCell(options).initializeState();
        }
    }
    StaticNotebook.ContentFactory = ContentFactory;
    /**
     * Default content factory for the static notebook widget.
     */
    StaticNotebook.defaultContentFactory = new ContentFactory();
})(StaticNotebook || (StaticNotebook = {}));
/**
 * A notebook widget that supports interactivity.
 */
class Notebook extends StaticNotebook {
    /**
     * Construct a notebook widget.
     */
    constructor(options) {
        super(Private.processNotebookOptions(options));
        this._activeCellIndex = -1;
        this._activeCell = null;
        this._mode = 'command';
        this._drag = null;
        this._fragment = '';
        this._dragData = null;
        this._mouseMode = null;
        this._activeCellChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_8__.Signal(this);
        this._stateChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_8__.Signal(this);
        this._selectionChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_8__.Signal(this);
        this._checkCacheOnNextResize = false;
        this._lastClipboardInteraction = null;
        this.node.tabIndex = 0; // Allow the widget to take focus.
        // Allow the node to scroll while dragging items.
        this.node.setAttribute('data-lm-dragscroll', 'true');
    }
    /**
     * A signal emitted when the active cell changes.
     *
     * #### Notes
     * This can be due to the active index changing or the
     * cell at the active index changing.
     */
    get activeCellChanged() {
        return this._activeCellChanged;
    }
    /**
     * A signal emitted when the state of the notebook changes.
     */
    get stateChanged() {
        return this._stateChanged;
    }
    /**
     * A signal emitted when the selection state of the notebook changes.
     */
    get selectionChanged() {
        return this._selectionChanged;
    }
    /**
     * The interactivity mode of the notebook.
     */
    get mode() {
        return this._mode;
    }
    set mode(newValue) {
        const activeCell = this.activeCell;
        if (!activeCell) {
            newValue = 'command';
        }
        if (newValue === this._mode) {
            this._ensureFocus();
            return;
        }
        // Post an update request.
        this.update();
        const oldValue = this._mode;
        this._mode = newValue;
        if (newValue === 'edit') {
            // Edit mode deselects all cells.
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(this.widgets, widget => {
                this.deselect(widget);
            });
            //  Edit mode unrenders an active markdown widget.
            if (activeCell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.MarkdownCell) {
                activeCell.rendered = false;
            }
            activeCell.inputHidden = false;
        }
        else {
            // Focus on the notebook document, which blurs the active cell.
            this.node.focus();
        }
        this._stateChanged.emit({ name: 'mode', oldValue, newValue });
        this._ensureFocus();
    }
    /**
     * The active cell index of the notebook.
     *
     * #### Notes
     * The index will be clamped to the bounds of the notebook cells.
     */
    get activeCellIndex() {
        if (!this.model) {
            return -1;
        }
        return this.model.cells.length ? this._activeCellIndex : -1;
    }
    set activeCellIndex(newValue) {
        const oldValue = this._activeCellIndex;
        if (!this.model || !this.model.cells.length) {
            newValue = -1;
        }
        else {
            newValue = Math.max(newValue, 0);
            newValue = Math.min(newValue, this.model.cells.length - 1);
        }
        this._activeCellIndex = newValue;
        const cell = this.widgets[newValue];
        if (cell !== this._activeCell) {
            // Post an update request.
            this.update();
            this._activeCell = cell;
            this._activeCellChanged.emit(cell);
        }
        if (this.mode === 'edit' && cell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.MarkdownCell) {
            cell.rendered = false;
        }
        this._ensureFocus();
        if (newValue === oldValue) {
            return;
        }
        this._trimSelections();
        this._stateChanged.emit({ name: 'activeCellIndex', oldValue, newValue });
    }
    /**
     * Get the active cell widget.
     *
     * #### Notes
     * This is a cell or `null` if there is no active cell.
     */
    get activeCell() {
        return this._activeCell;
    }
    get lastClipboardInteraction() {
        return this._lastClipboardInteraction;
    }
    set lastClipboardInteraction(newValue) {
        this._lastClipboardInteraction = newValue;
    }
    /**
     * Dispose of the resources held by the widget.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._activeCell = null;
        super.dispose();
    }
    /**
     * Select a cell widget.
     *
     * #### Notes
     * It is a no-op if the value does not change.
     * It will emit the `selectionChanged` signal.
     */
    select(widget) {
        if (Private.selectedProperty.get(widget)) {
            return;
        }
        Private.selectedProperty.set(widget, true);
        this._selectionChanged.emit(void 0);
        this.update();
    }
    /**
     * Deselect a cell widget.
     *
     * #### Notes
     * It is a no-op if the value does not change.
     * It will emit the `selectionChanged` signal.
     */
    deselect(widget) {
        if (!Private.selectedProperty.get(widget)) {
            return;
        }
        Private.selectedProperty.set(widget, false);
        this._selectionChanged.emit(void 0);
        this.update();
    }
    /**
     * Whether a cell is selected.
     */
    isSelected(widget) {
        return Private.selectedProperty.get(widget);
    }
    /**
     * Whether a cell is selected or is the active cell.
     */
    isSelectedOrActive(widget) {
        if (widget === this._activeCell) {
            return true;
        }
        return Private.selectedProperty.get(widget);
    }
    /**
     * Deselect all of the cells.
     */
    deselectAll() {
        let changed = false;
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(this.widgets, widget => {
            if (Private.selectedProperty.get(widget)) {
                changed = true;
            }
            Private.selectedProperty.set(widget, false);
        });
        if (changed) {
            this._selectionChanged.emit(void 0);
        }
        // Make sure we have a valid active cell.
        this.activeCellIndex = this.activeCellIndex; // eslint-disable-line
        this.update();
    }
    /**
     * Move the head of an existing contiguous selection to extend the selection.
     *
     * @param index - The new head of the existing selection.
     *
     * #### Notes
     * If there is no existing selection, the active cell is considered an
     * existing one-cell selection.
     *
     * If the new selection is a single cell, that cell becomes the active cell
     * and all cells are deselected.
     *
     * There is no change if there are no cells (i.e., activeCellIndex is -1).
     */
    extendContiguousSelectionTo(index) {
        let { head, anchor } = this.getContiguousSelection();
        let i;
        // Handle the case of no current selection.
        if (anchor === null || head === null) {
            if (index === this.activeCellIndex) {
                // Already collapsed selection, nothing more to do.
                return;
            }
            // We will start a new selection below.
            head = this.activeCellIndex;
            anchor = this.activeCellIndex;
        }
        // Move the active cell. We do this before the collapsing shortcut below.
        this.activeCellIndex = index;
        // Make sure the index is valid, according to the rules for setting and clipping the
        // active cell index. This may change the index.
        index = this.activeCellIndex;
        // Collapse the selection if it is only the active cell.
        if (index === anchor) {
            this.deselectAll();
            return;
        }
        let selectionChanged = false;
        if (head < index) {
            if (head < anchor) {
                Private.selectedProperty.set(this.widgets[head], false);
                selectionChanged = true;
            }
            // Toggle everything strictly between head and index except anchor.
            for (i = head + 1; i < index; i++) {
                if (i !== anchor) {
                    Private.selectedProperty.set(this.widgets[i], !Private.selectedProperty.get(this.widgets[i]));
                    selectionChanged = true;
                }
            }
        }
        else if (index < head) {
            if (anchor < head) {
                Private.selectedProperty.set(this.widgets[head], false);
                selectionChanged = true;
            }
            // Toggle everything strictly between index and head except anchor.
            for (i = index + 1; i < head; i++) {
                if (i !== anchor) {
                    Private.selectedProperty.set(this.widgets[i], !Private.selectedProperty.get(this.widgets[i]));
                    selectionChanged = true;
                }
            }
        }
        // Anchor and index should *always* be selected.
        if (!Private.selectedProperty.get(this.widgets[anchor])) {
            selectionChanged = true;
        }
        Private.selectedProperty.set(this.widgets[anchor], true);
        if (!Private.selectedProperty.get(this.widgets[index])) {
            selectionChanged = true;
        }
        Private.selectedProperty.set(this.widgets[index], true);
        if (selectionChanged) {
            this._selectionChanged.emit(void 0);
        }
    }
    /**
     * Get the head and anchor of a contiguous cell selection.
     *
     * The head of a contiguous selection is always the active cell.
     *
     * If there are no cells selected, `{head: null, anchor: null}` is returned.
     *
     * Throws an error if the currently selected cells do not form a contiguous
     * selection.
     */
    getContiguousSelection() {
        const cells = this.widgets;
        const first = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.findFirstIndex(cells, c => this.isSelected(c));
        // Return early if no cells are selected.
        if (first === -1) {
            return { head: null, anchor: null };
        }
        const last = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.findLastIndex(cells, c => this.isSelected(c), -1, first);
        // Check that the selection is contiguous.
        for (let i = first; i <= last; i++) {
            if (!this.isSelected(cells[i])) {
                throw new Error('Selection not contiguous');
            }
        }
        // Check that the active cell is one of the endpoints of the selection.
        const activeIndex = this.activeCellIndex;
        if (first !== activeIndex && last !== activeIndex) {
            throw new Error('Active cell not at endpoint of selection');
        }
        // Determine the head and anchor of the selection.
        if (first === activeIndex) {
            return { head: first, anchor: last };
        }
        else {
            return { head: last, anchor: first };
        }
    }
    /**
     * Scroll so that the given position is centered.
     *
     * @param position - The vertical position in the notebook widget.
     *
     * @param threshold - An optional threshold for the scroll (0-50, defaults to
     * 25).
     *
     * #### Notes
     * If the position is within the threshold percentage of the widget height,
     * measured from the center of the widget, the scroll position will not be
     * changed. A threshold of 0 means we will always scroll so the position is
     * centered, and a threshold of 50 means scrolling only happens if position is
     * outside the current window.
     */
    scrollToPosition(position, threshold = 25) {
        const node = this.node;
        const ar = node.getBoundingClientRect();
        const delta = position - ar.top - ar.height / 2;
        if (Math.abs(delta) > (ar.height * threshold) / 100) {
            node.scrollTop += delta;
        }
    }
    /**
     * Scroll so that the given cell is in view. Selects and activates cell.
     *
     * @param cell - A cell in the notebook widget.
     *
     */
    scrollToCell(cell) {
        // use Phosphor to scroll
        _lumino_domutils__WEBPACK_IMPORTED_MODULE_5__.ElementExt.scrollIntoViewIfNeeded(this.node, cell.node);
        // change selection and active cell:
        this.deselectAll();
        this.select(cell);
        cell.activate();
    }
    /**
     * Set URI fragment identifier.
     */
    setFragment(fragment) {
        // Wait all cells are rendered then set fragment and update.
        void Promise.all(this.widgets.map(widget => widget.ready)).then(() => {
            this._fragment = fragment;
            this.update();
        });
    }
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
        if (!this.model) {
            return;
        }
        switch (event.type) {
            case 'contextmenu':
                if (event.eventPhase === Event.CAPTURING_PHASE) {
                    this._evtContextMenuCapture(event);
                }
                break;
            case 'mousedown':
                if (event.eventPhase === Event.CAPTURING_PHASE) {
                    this._evtMouseDownCapture(event);
                }
                else {
                    this._evtMouseDown(event);
                }
                break;
            case 'mouseup':
                if (event.currentTarget === document) {
                    this._evtDocumentMouseup(event);
                }
                break;
            case 'mousemove':
                if (event.currentTarget === document) {
                    this._evtDocumentMousemove(event);
                }
                break;
            case 'keydown':
                this._ensureFocus(true);
                break;
            case 'dblclick':
                this._evtDblClick(event);
                break;
            case 'focusin':
                this._evtFocusIn(event);
                break;
            case 'focusout':
                this._evtFocusOut(event);
                break;
            case 'lm-dragenter':
                this._evtDragEnter(event);
                break;
            case 'lm-dragleave':
                this._evtDragLeave(event);
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
        node.addEventListener('contextmenu', this, true);
        node.addEventListener('mousedown', this, true);
        node.addEventListener('mousedown', this);
        node.addEventListener('keydown', this);
        node.addEventListener('dblclick', this);
        node.addEventListener('focusin', this);
        node.addEventListener('focusout', this);
        // Capture drag events for the notebook widget
        // in order to preempt the drag/drop handlers in the
        // code editor widgets, which can take text data.
        node.addEventListener('lm-dragenter', this, true);
        node.addEventListener('lm-dragleave', this, true);
        node.addEventListener('lm-dragover', this, true);
        node.addEventListener('lm-drop', this, true);
    }
    /**
     * Handle `before-detach` messages for the widget.
     */
    onBeforeDetach(msg) {
        const node = this.node;
        node.removeEventListener('contextmenu', this, true);
        node.removeEventListener('mousedown', this, true);
        node.removeEventListener('mousedown', this);
        node.removeEventListener('keydown', this);
        node.removeEventListener('dblclick', this);
        node.removeEventListener('focusin', this);
        node.removeEventListener('focusout', this);
        node.removeEventListener('lm-dragenter', this, true);
        node.removeEventListener('lm-dragleave', this, true);
        node.removeEventListener('lm-dragover', this, true);
        node.removeEventListener('lm-drop', this, true);
        document.removeEventListener('mousemove', this, true);
        document.removeEventListener('mouseup', this, true);
    }
    /**
     * A message handler invoked on an `'after-show'` message.
     */
    onAfterShow(msg) {
        this._checkCacheOnNextResize = true;
    }
    /**
     * A message handler invoked on a `'resize'` message.
     */
    onResize(msg) {
        if (!this._checkCacheOnNextResize) {
            return super.onResize(msg);
        }
        this._checkCacheOnNextResize = false;
        const cache = this._cellLayoutStateCache;
        const width = parseInt(this.node.style.width, 10);
        if (cache) {
            if (width === cache.width) {
                // Cache identical, do nothing
                return;
            }
        }
        // Update cache
        this._cellLayoutStateCache = { width };
        // Fallback:
        for (const w of this.widgets) {
            if (w instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.Cell) {
                w.editorWidget.update();
            }
        }
    }
    /**
     * A message handler invoked on an `'before-hide'` message.
     */
    onBeforeHide(msg) {
        // Update cache
        const width = parseInt(this.node.style.width, 10);
        this._cellLayoutStateCache = { width };
    }
    /**
     * Handle `'activate-request'` messages.
     */
    onActivateRequest(msg) {
        this._ensureFocus(true);
    }
    /**
     * Handle `update-request` messages sent to the widget.
     */
    onUpdateRequest(msg) {
        const activeCell = this.activeCell;
        // Set the appropriate classes on the cells.
        if (this.mode === 'edit') {
            this.addClass(EDIT_CLASS);
            this.removeClass(COMMAND_CLASS);
        }
        else {
            this.addClass(COMMAND_CLASS);
            this.removeClass(EDIT_CLASS);
        }
        if (activeCell) {
            activeCell.addClass(ACTIVE_CLASS);
        }
        let count = 0;
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(this.widgets, widget => {
            if (widget !== activeCell) {
                widget.removeClass(ACTIVE_CLASS);
            }
            widget.removeClass(OTHER_SELECTED_CLASS);
            if (this.isSelectedOrActive(widget)) {
                widget.addClass(SELECTED_CLASS);
                count++;
            }
            else {
                widget.removeClass(SELECTED_CLASS);
            }
        });
        if (count > 1) {
            activeCell === null || activeCell === void 0 ? void 0 : activeCell.addClass(OTHER_SELECTED_CLASS);
        }
        if (this._fragment) {
            let el;
            try {
                el = this.node.querySelector(this._fragment.startsWith('#')
                    ? `#${CSS.escape(this._fragment.slice(1))}`
                    : this._fragment);
            }
            catch (error) {
                console.warn('Unable to set URI fragment identifier', error);
            }
            if (el) {
                el.scrollIntoView();
            }
            this._fragment = '';
        }
    }
    /**
     * Handle a cell being inserted.
     */
    onCellInserted(index, cell) {
        if (this.model && this.model.modelDB.isCollaborative) {
            const modelDB = this.model.modelDB;
            void modelDB.connected.then(() => {
                if (!cell.isDisposed) {
                    // Setup the selection style for collaborators.
                    const localCollaborator = modelDB.collaborators.localCollaborator;
                    cell.editor.uuid = localCollaborator.sessionId;
                    cell.editor.selectionStyle = Object.assign(Object.assign({}, _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditor.defaultSelectionStyle), { color: localCollaborator.color });
                }
            });
        }
        cell.editor.edgeRequested.connect(this._onEdgeRequest, this);
        // If the insertion happened above, increment the active cell
        // index, otherwise it stays the same.
        this.activeCellIndex =
            index <= this.activeCellIndex
                ? this.activeCellIndex + 1
                : this.activeCellIndex;
    }
    /**
     * Handle a cell being moved.
     */
    onCellMoved(fromIndex, toIndex) {
        const i = this.activeCellIndex;
        if (fromIndex === i) {
            this.activeCellIndex = toIndex;
        }
        else if (fromIndex < i && i <= toIndex) {
            this.activeCellIndex--;
        }
        else if (toIndex <= i && i < fromIndex) {
            this.activeCellIndex++;
        }
    }
    /**
     * Handle a cell being removed.
     */
    onCellRemoved(index, cell) {
        // If the removal happened above, decrement the active
        // cell index, otherwise it stays the same.
        this.activeCellIndex =
            index <= this.activeCellIndex
                ? this.activeCellIndex - 1
                : this.activeCellIndex;
        if (this.isSelected(cell)) {
            this._selectionChanged.emit(void 0);
        }
    }
    /**
     * Handle a new model.
     */
    onModelChanged(oldValue, newValue) {
        super.onModelChanged(oldValue, newValue);
        // Try to set the active cell index to 0.
        // It will be set to `-1` if there is no new model or the model is empty.
        this.activeCellIndex = 0;
    }
    /**
     * Handle edge request signals from cells.
     */
    _onEdgeRequest(editor, location) {
        const prev = this.activeCellIndex;
        if (location === 'top') {
            this.activeCellIndex--;
            // Move the cursor to the first position on the last line.
            if (this.activeCellIndex < prev) {
                const editor = this.activeCell.editor;
                const lastLine = editor.lineCount - 1;
                editor.setCursorPosition({ line: lastLine, column: 0 });
            }
        }
        else if (location === 'bottom') {
            this.activeCellIndex++;
            // Move the cursor to the first character.
            if (this.activeCellIndex > prev) {
                const editor = this.activeCell.editor;
                editor.setCursorPosition({ line: 0, column: 0 });
            }
        }
        this.mode = 'edit';
    }
    /**
     * Ensure that the notebook has proper focus.
     */
    _ensureFocus(force = false) {
        const activeCell = this.activeCell;
        if (this.mode === 'edit' && activeCell) {
            if (!activeCell.editor.hasFocus()) {
                activeCell.editor.focus();
            }
        }
        if (force && !this.node.contains(document.activeElement)) {
            this.node.focus();
        }
    }
    /**
     * Find the cell index containing the target html element.
     *
     * #### Notes
     * Returns -1 if the cell is not found.
     */
    _findCell(node) {
        // Trace up the DOM hierarchy to find the root cell node.
        // Then find the corresponding child and select it.
        let n = node;
        while (n && n !== this.node) {
            if (n.classList.contains(NB_CELL_CLASS)) {
                const i = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.findFirstIndex(this.widgets, widget => widget.node === n);
                if (i !== -1) {
                    return i;
                }
                break;
            }
            n = n.parentElement;
        }
        return -1;
    }
    /**
     * Find the target of html mouse event and cell index containing this target.
     *
     * #### Notes
     * Returned index is -1 if the cell is not found.
     */
    _findEventTargetAndCell(event) {
        let target = event.target;
        let index = this._findCell(target);
        if (index === -1) {
            // `event.target` sometimes gives an orphaned node in Firefox 57, which
            // can have `null` anywhere in its parent line. If we fail to find a cell
            // using `event.target`, try again using a target reconstructed from the
            // position of the click event.
            target = document.elementFromPoint(event.clientX, event.clientY);
            index = this._findCell(target);
        }
        return [target, index];
    }
    /**
     * Handle `contextmenu` event.
     */
    _evtContextMenuCapture(event) {
        // Allow the event to propagate un-modified if the user
        // is holding the shift-key (and probably requesting
        // the native context menu).
        if (event.shiftKey) {
            return;
        }
        const [target, index] = this._findEventTargetAndCell(event);
        const widget = this.widgets[index];
        if (widget && widget.editorWidget.node.contains(target)) {
            // Prevent CodeMirror from focusing the editor.
            // TODO: find an editor-agnostic solution.
            event.preventDefault();
        }
    }
    /**
     * Handle `mousedown` event in the capture phase for the widget.
     */
    _evtMouseDownCapture(event) {
        const { button, shiftKey } = event;
        const [target, index] = this._findEventTargetAndCell(event);
        const widget = this.widgets[index];
        // On OS X, the context menu may be triggered with ctrl-left-click. In
        // Firefox, ctrl-left-click gives an event with button 2, but in Chrome,
        // ctrl-left-click gives an event with button 0 with the ctrl modifier.
        if (button === 2 &&
            !shiftKey &&
            widget &&
            widget.editorWidget.node.contains(target)) {
            this.mode = 'command';
            // Prevent CodeMirror from focusing the editor.
            // TODO: find an editor-agnostic solution.
            event.preventDefault();
        }
    }
    /**
     * Handle `mousedown` events for the widget.
     */
    _evtMouseDown(event) {
        var _a;
        const { button, shiftKey } = event;
        // We only handle main or secondary button actions.
        if (!(button === 0 || button === 2)) {
            return;
        }
        // Shift right-click gives the browser default behavior.
        if (shiftKey && button === 2) {
            return;
        }
        const [target, index] = this._findEventTargetAndCell(event);
        const widget = this.widgets[index];
        let targetArea;
        if (widget) {
            if (widget.editorWidget.node.contains(target)) {
                targetArea = 'input';
            }
            else if (widget.promptNode.contains(target)) {
                targetArea = 'prompt';
            }
            else {
                targetArea = 'cell';
            }
        }
        else {
            targetArea = 'notebook';
        }
        // Make sure we go to command mode if the click isn't in the cell editor If
        // we do click in the cell editor, the editor handles the focus event to
        // switch to edit mode.
        if (targetArea !== 'input') {
            this.mode = 'command';
        }
        if (targetArea === 'notebook') {
            this.deselectAll();
        }
        else if (targetArea === 'prompt' || targetArea === 'cell') {
            // We don't want to prevent the default selection behavior
            // if there is currently text selected in an output.
            const hasSelection = ((_a = window.getSelection()) !== null && _a !== void 0 ? _a : '').toString() !== '';
            if (button === 0 && shiftKey && !hasSelection) {
                // Prevent browser selecting text in prompt or output
                event.preventDefault();
                // Shift-click - extend selection
                try {
                    this.extendContiguousSelectionTo(index);
                }
                catch (e) {
                    console.error(e);
                    this.deselectAll();
                    return;
                }
                // Enter selecting mode
                this._mouseMode = 'select';
                document.addEventListener('mouseup', this, true);
                document.addEventListener('mousemove', this, true);
            }
            else if (button === 0 && !shiftKey) {
                // Prepare to start a drag if we are on the drag region.
                if (targetArea === 'prompt') {
                    // Prepare for a drag start
                    this._dragData = {
                        pressX: event.clientX,
                        pressY: event.clientY,
                        index: index
                    };
                    // Enter possible drag mode
                    this._mouseMode = 'couldDrag';
                    document.addEventListener('mouseup', this, true);
                    document.addEventListener('mousemove', this, true);
                    event.preventDefault();
                }
                if (!this.isSelectedOrActive(widget)) {
                    this.deselectAll();
                    this.activeCellIndex = index;
                }
            }
            else if (button === 2) {
                if (!this.isSelectedOrActive(widget)) {
                    this.deselectAll();
                    this.activeCellIndex = index;
                }
                event.preventDefault();
            }
        }
        else if (targetArea === 'input') {
            if (button === 2 && !this.isSelectedOrActive(widget)) {
                this.deselectAll();
                this.activeCellIndex = index;
            }
        }
        // If we didn't set focus above, make sure we get focus now.
        this._ensureFocus(true);
    }
    /**
     * Handle the `'mouseup'` event on the document.
     */
    _evtDocumentMouseup(event) {
        event.preventDefault();
        event.stopPropagation();
        // Remove the event listeners we put on the document
        document.removeEventListener('mousemove', this, true);
        document.removeEventListener('mouseup', this, true);
        if (this._mouseMode === 'couldDrag') {
            // We didn't end up dragging if we are here, so treat it as a click event.
            const [, index] = this._findEventTargetAndCell(event);
            this.deselectAll();
            this.activeCellIndex = index;
        }
        this._mouseMode = null;
    }
    /**
     * Handle the `'mousemove'` event for the widget.
     */
    _evtDocumentMousemove(event) {
        event.preventDefault();
        event.stopPropagation();
        // If in select mode, update the selection
        switch (this._mouseMode) {
            case 'select': {
                const target = event.target;
                const index = this._findCell(target);
                if (index !== -1) {
                    this.extendContiguousSelectionTo(index);
                }
                break;
            }
            case 'couldDrag': {
                // Check for a drag initialization.
                const data = this._dragData;
                const dx = Math.abs(event.clientX - data.pressX);
                const dy = Math.abs(event.clientY - data.pressY);
                if (dx >= DRAG_THRESHOLD || dy >= DRAG_THRESHOLD) {
                    this._mouseMode = null;
                    this._startDrag(data.index, event.clientX, event.clientY);
                }
                break;
            }
            default:
                break;
        }
    }
    /**
     * Handle the `'lm-dragenter'` event for the widget.
     */
    _evtDragEnter(event) {
        if (!event.mimeData.hasData(JUPYTER_CELL_MIME)) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        const target = event.target;
        const index = this._findCell(target);
        if (index === -1) {
            return;
        }
        const widget = this.layout.widgets[index];
        widget.node.classList.add(DROP_TARGET_CLASS);
    }
    /**
     * Handle the `'lm-dragleave'` event for the widget.
     */
    _evtDragLeave(event) {
        if (!event.mimeData.hasData(JUPYTER_CELL_MIME)) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        const elements = this.node.getElementsByClassName(DROP_TARGET_CLASS);
        if (elements.length) {
            elements[0].classList.remove(DROP_TARGET_CLASS);
        }
    }
    /**
     * Handle the `'lm-dragover'` event for the widget.
     */
    _evtDragOver(event) {
        if (!event.mimeData.hasData(JUPYTER_CELL_MIME)) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        event.dropAction = event.proposedAction;
        const elements = this.node.getElementsByClassName(DROP_TARGET_CLASS);
        if (elements.length) {
            elements[0].classList.remove(DROP_TARGET_CLASS);
        }
        const target = event.target;
        const index = this._findCell(target);
        if (index === -1) {
            return;
        }
        const widget = this.layout.widgets[index];
        widget.node.classList.add(DROP_TARGET_CLASS);
    }
    /**
     * Handle the `'lm-drop'` event for the widget.
     */
    _evtDrop(event) {
        if (!event.mimeData.hasData(JUPYTER_CELL_MIME)) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (event.proposedAction === 'none') {
            event.dropAction = 'none';
            return;
        }
        let target = event.target;
        while (target && target.parentElement) {
            if (target.classList.contains(DROP_TARGET_CLASS)) {
                target.classList.remove(DROP_TARGET_CLASS);
                break;
            }
            target = target.parentElement;
        }
        // Model presence should be checked before calling event handlers
        const model = this.model;
        const source = event.source;
        if (source === this) {
            // Handle the case where we are moving cells within
            // the same notebook.
            event.dropAction = 'move';
            const toMove = event.mimeData.getData('internal:cells');
            // For collapsed markdown headings with hidden "child" cells, move all
            // child cells as well as the markdown heading.
            const cell = toMove[toMove.length - 1];
            if (cell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.MarkdownCell && cell.headingCollapsed) {
                const nextParent = _actions__WEBPACK_IMPORTED_MODULE_11__.NotebookActions.findNextParentHeading(cell, source);
                if (nextParent > 0) {
                    const index = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.findIndex)(source.widgets, (possibleCell) => {
                        return cell.model.id === possibleCell.model.id;
                    });
                    toMove.push(...source.widgets.slice(index + 1, nextParent));
                }
            }
            // Compute the to/from indices for the move.
            let fromIndex = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.firstIndexOf(this.widgets, toMove[0]);
            let toIndex = this._findCell(target);
            // This check is needed for consistency with the view.
            if (toIndex !== -1 && toIndex > fromIndex) {
                toIndex -= 1;
            }
            else if (toIndex === -1) {
                // If the drop is within the notebook but not on any cell,
                // most often this means it is past the cell areas, so
                // set it to move the cells to the end of the notebook.
                toIndex = this.widgets.length - 1;
            }
            // Don't move if we are within the block of selected cells.
            if (toIndex >= fromIndex && toIndex < fromIndex + toMove.length) {
                return;
            }
            // Move the cells one by one
            model.cells.beginCompoundOperation();
            if (fromIndex < toIndex) {
                (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(toMove, cellWidget => {
                    model.cells.move(fromIndex, toIndex);
                });
            }
            else if (fromIndex > toIndex) {
                (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(toMove, cellWidget => {
                    model.cells.move(fromIndex++, toIndex++);
                });
            }
            model.cells.endCompoundOperation();
        }
        else {
            // Handle the case where we are copying cells between
            // notebooks.
            event.dropAction = 'copy';
            // Find the target cell and insert the copied cells.
            let index = this._findCell(target);
            if (index === -1) {
                index = this.widgets.length;
            }
            const start = index;
            const values = event.mimeData.getData(JUPYTER_CELL_MIME);
            const factory = model.contentFactory;
            // Insert the copies of the original cells.
            model.cells.beginCompoundOperation();
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(values, (cell) => {
                let value;
                switch (cell.cell_type) {
                    case 'code':
                        value = factory.createCodeCell({ cell });
                        break;
                    case 'markdown':
                        value = factory.createMarkdownCell({ cell });
                        break;
                    default:
                        value = factory.createRawCell({ cell });
                        break;
                }
                model.cells.insert(index++, value);
            });
            model.cells.endCompoundOperation();
            // Select the inserted cells.
            this.deselectAll();
            this.activeCellIndex = start;
            this.extendContiguousSelectionTo(index - 1);
        }
    }
    /**
     * Start a drag event.
     */
    _startDrag(index, clientX, clientY) {
        var _a;
        const cells = this.model.cells;
        const selected = [];
        const toMove = [];
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(this.widgets, (widget, i) => {
            const cell = cells.get(i);
            if (this.isSelectedOrActive(widget)) {
                widget.addClass(DROP_SOURCE_CLASS);
                selected.push(cell.toJSON());
                toMove.push(widget);
            }
        });
        const activeCell = this.activeCell;
        let dragImage = null;
        let countString;
        if ((activeCell === null || activeCell === void 0 ? void 0 : activeCell.model.type) === 'code') {
            const executionCount = activeCell.model
                .executionCount;
            countString = ' ';
            if (executionCount) {
                countString = executionCount.toString();
            }
        }
        else {
            countString = '';
        }
        // Create the drag image.
        dragImage = Private.createDragImage(selected.length, countString, (_a = activeCell === null || activeCell === void 0 ? void 0 : activeCell.model.value.text.split('\n')[0].slice(0, 26)) !== null && _a !== void 0 ? _a : '');
        // Set up the drag event.
        this._drag = new _lumino_dragdrop__WEBPACK_IMPORTED_MODULE_6__.Drag({
            mimeData: new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__.MimeData(),
            dragImage,
            supportedActions: 'copy-move',
            proposedAction: 'copy',
            source: this
        });
        this._drag.mimeData.setData(JUPYTER_CELL_MIME, selected);
        // Add mimeData for the fully reified cell widgets, for the
        // case where the target is in the same notebook and we
        // can just move the cells.
        this._drag.mimeData.setData('internal:cells', toMove);
        // Add mimeData for the text content of the selected cells,
        // allowing for drag/drop into plain text fields.
        const textContent = toMove.map(cell => cell.model.value.text).join('\n');
        this._drag.mimeData.setData('text/plain', textContent);
        // Remove mousemove and mouseup listeners and start the drag.
        document.removeEventListener('mousemove', this, true);
        document.removeEventListener('mouseup', this, true);
        this._mouseMode = null;
        void this._drag.start(clientX, clientY).then(action => {
            if (this.isDisposed) {
                return;
            }
            this._drag = null;
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(toMove, widget => {
                widget.removeClass(DROP_SOURCE_CLASS);
            });
        });
    }
    /**
     * Handle `focus` events for the widget.
     */
    _evtFocusIn(event) {
        const target = event.target;
        const index = this._findCell(target);
        if (index !== -1) {
            const widget = this.widgets[index];
            // If the editor itself does not have focus, ensure command mode.
            if (!widget.editorWidget.node.contains(target)) {
                this.mode = 'command';
            }
            this.activeCellIndex = index;
            // If the editor has focus, ensure edit mode.
            const node = widget.editorWidget.node;
            if (node.contains(target)) {
                this.mode = 'edit';
            }
            this.activeCellIndex = index;
        }
        else {
            // No cell has focus, ensure command mode.
            this.mode = 'command';
        }
    }
    /**
     * Handle `focusout` events for the notebook.
     */
    _evtFocusOut(event) {
        const relatedTarget = event.relatedTarget;
        // Bail if the window is losing focus, to preserve edit mode. This test
        // assumes that we explicitly focus things rather than calling blur()
        if (!relatedTarget) {
            return;
        }
        // Bail if the item gaining focus is another cell,
        // and we should not be entering command mode.
        const index = this._findCell(relatedTarget);
        if (index !== -1) {
            const widget = this.widgets[index];
            if (widget.editorWidget.node.contains(relatedTarget)) {
                return;
            }
        }
        // Otherwise enter command mode if not already.
        if (this.mode !== 'command') {
            this.mode = 'command';
            // Switching to command mode currently focuses the notebook element, so
            // refocus the relatedTarget so the focus actually switches as intended.
            if (relatedTarget) {
                relatedTarget.focus();
            }
        }
    }
    /**
     * Handle `dblclick` events for the widget.
     */
    _evtDblClick(event) {
        const model = this.model;
        if (!model) {
            return;
        }
        this.deselectAll();
        const [target, index] = this._findEventTargetAndCell(event);
        if (event.target.classList.contains(HEADING_COLLAPSER_CLASS)) {
            return;
        }
        if (index === -1) {
            return;
        }
        this.activeCellIndex = index;
        if (model.cells.get(index).type === 'markdown') {
            const widget = this.widgets[index];
            widget.rendered = false;
        }
        else if (target.localName === 'img') {
            target.classList.toggle(UNCONFINED_CLASS);
        }
    }
    /**
     * Remove selections from inactive cells to avoid
     * spurious cursors.
     */
    _trimSelections() {
        for (let i = 0; i < this.widgets.length; i++) {
            if (i !== this._activeCellIndex) {
                const cell = this.widgets[i];
                cell.model.selections.delete(cell.editor.uuid);
            }
        }
    }
}
/**
 * The namespace for the `Notebook` class statics.
 */
(function (Notebook) {
    /**
     * The default implementation of a notebook content factory..
     *
     * #### Notes
     * Override methods on this class to customize the default notebook factory
     * methods that create notebook content.
     */
    class ContentFactory extends StaticNotebook.ContentFactory {
    }
    Notebook.ContentFactory = ContentFactory;
    Notebook.defaultContentFactory = new ContentFactory();
})(Notebook || (Notebook = {}));
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * An attached property for the selected state of a cell.
     */
    Private.selectedProperty = new _lumino_properties__WEBPACK_IMPORTED_MODULE_7__.AttachedProperty({
        name: 'selected',
        create: () => false
    });
    /**
     * A custom panel layout for the notebook.
     */
    class NotebookPanelLayout extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_10__.PanelLayout {
        /**
         * A message handler invoked on an `'update-request'` message.
         *
         * #### Notes
         * This is a reimplementation of the base class method,
         * and is a no-op.
         */
        onUpdateRequest(msg) {
            // This is a no-op.
        }
    }
    Private.NotebookPanelLayout = NotebookPanelLayout;
    /**
     * Create a cell drag image.
     */
    function createDragImage(count, promptNumber, cellContent) {
        if (count > 1) {
            if (promptNumber !== '') {
                return _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.VirtualDOM.realize(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.div(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.div({ className: DRAG_IMAGE_CLASS }, _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.span({ className: CELL_DRAG_PROMPT_CLASS }, '[' + promptNumber + ']:'), _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.span({ className: CELL_DRAG_CONTENT_CLASS }, cellContent)), _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.div({ className: CELL_DRAG_MULTIPLE_BACK }, '')));
            }
            else {
                return _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.VirtualDOM.realize(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.div(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.div({ className: DRAG_IMAGE_CLASS }, _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.span({ className: CELL_DRAG_PROMPT_CLASS }), _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.span({ className: CELL_DRAG_CONTENT_CLASS }, cellContent)), _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.div({ className: CELL_DRAG_MULTIPLE_BACK }, '')));
            }
        }
        else {
            if (promptNumber !== '') {
                return _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.VirtualDOM.realize(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.div(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.div({ className: `${DRAG_IMAGE_CLASS} ${SINGLE_DRAG_IMAGE_CLASS}` }, _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.span({ className: CELL_DRAG_PROMPT_CLASS }, '[' + promptNumber + ']:'), _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.span({ className: CELL_DRAG_CONTENT_CLASS }, cellContent))));
            }
            else {
                return _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.VirtualDOM.realize(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.div(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.div({ className: `${DRAG_IMAGE_CLASS} ${SINGLE_DRAG_IMAGE_CLASS}` }, _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.span({ className: CELL_DRAG_PROMPT_CLASS }), _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_9__.h.span({ className: CELL_DRAG_CONTENT_CLASS }, cellContent))));
            }
        }
    }
    Private.createDragImage = createDragImage;
    /**
     * Process the `IOptions` passed to the notebook widget.
     *
     * #### Notes
     * This defaults the content factory to that in the `Notebook` namespace.
     */
    function processNotebookOptions(options) {
        if (options.contentFactory) {
            return options;
        }
        else {
            return {
                rendermime: options.rendermime,
                languagePreference: options.languagePreference,
                contentFactory: Notebook.defaultContentFactory,
                mimeTypeService: options.mimeTypeService
            };
        }
    }
    Private.processNotebookOptions = processNotebookOptions;
})(Private || (Private = {}));
//# sourceMappingURL=widget.js.map

/***/ }),

/***/ "../../packages/notebook/lib/widgetfactory.js":
/*!****************************************************!*\
  !*** ../../packages/notebook/lib/widgetfactory.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotebookWidgetFactory": () => (/* binding */ NotebookWidgetFactory)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _default_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./default-toolbar */ "../../packages/notebook/lib/default-toolbar.js");
/* harmony import */ var _panel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./panel */ "../../packages/notebook/lib/panel.js");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./widget */ "../../packages/notebook/lib/widget.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.





/**
 * A widget factory for notebook panels.
 */
class NotebookWidgetFactory extends _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__.ABCWidgetFactory {
    /**
     * Construct a new notebook widget factory.
     *
     * @param options - The options used to construct the factory.
     */
    constructor(options) {
        super(options);
        this.rendermime = options.rendermime;
        this.contentFactory =
            options.contentFactory || _panel__WEBPACK_IMPORTED_MODULE_2__.NotebookPanel.defaultContentFactory;
        this.mimeTypeService = options.mimeTypeService;
        this._editorConfig =
            options.editorConfig || _widget__WEBPACK_IMPORTED_MODULE_3__.StaticNotebook.defaultEditorConfig;
        this._notebookConfig =
            options.notebookConfig || _widget__WEBPACK_IMPORTED_MODULE_3__.StaticNotebook.defaultNotebookConfig;
        this._sessionDialogs = options.sessionDialogs || _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.sessionContextDialogs;
    }
    /**
     * A configuration object for cell editor settings.
     */
    get editorConfig() {
        return this._editorConfig;
    }
    set editorConfig(value) {
        this._editorConfig = value;
    }
    /**
     * A configuration object for notebook settings.
     */
    get notebookConfig() {
        return this._notebookConfig;
    }
    set notebookConfig(value) {
        this._notebookConfig = value;
    }
    /**
     * Create a new widget.
     *
     * #### Notes
     * The factory will start the appropriate kernel.
     */
    createNewWidget(context, source) {
        const nbOptions = {
            rendermime: source
                ? source.content.rendermime
                : this.rendermime.clone({ resolver: context.urlResolver }),
            contentFactory: this.contentFactory,
            mimeTypeService: this.mimeTypeService,
            editorConfig: source ? source.content.editorConfig : this._editorConfig,
            notebookConfig: source
                ? source.content.notebookConfig
                : this._notebookConfig,
            translator: this.translator
        };
        const content = this.contentFactory.createNotebook(nbOptions);
        return new _panel__WEBPACK_IMPORTED_MODULE_2__.NotebookPanel({ context, content });
    }
    /**
     * Default factory for toolbar items to be added after the widget is created.
     */
    defaultToolbarFactory(widget) {
        return _default_toolbar__WEBPACK_IMPORTED_MODULE_4__.ToolbarItems.getDefaultItems(widget, this._sessionDialogs, this.translator);
    }
}
//# sourceMappingURL=widgetfactory.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbm90ZWJvb2svbGliL2FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL25vdGVib29rL2xpYi9jZWxsbGlzdC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbm90ZWJvb2svbGliL2RlZmF1bHQtdG9vbGJhci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbm90ZWJvb2svbGliL2V4ZWN1dGlvbmluZGljYXRvci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbm90ZWJvb2svbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9ub3RlYm9vay9saWIvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL25vdGVib29rL2xpYi9tb2RlbGZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL25vdGVib29rL2xpYi9tb2Rlc3RhdHVzLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9ub3RlYm9vay9saWIvbm90ZWJvb2t0b29scy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbm90ZWJvb2svbGliL3BhbmVsLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9ub3RlYm9vay9saWIvdG9rZW5zLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9ub3RlYm9vay9saWIvdHJhY2tlci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbm90ZWJvb2svbGliL3RydXN0c3RhdHVzLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9ub3RlYm9vay9saWIvd2lkZ2V0LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9ub3RlYm9vay9saWIvd2lkZ2V0ZmFjdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQzRGO0FBQ3FCO0FBQ3hEO0FBQ2M7QUFDM0I7QUFDRTtBQUNIO0FBQ1o7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFVBQVUsR0FBRyxXQUFXO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix1QkFBdUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHdCQUF3QjtBQUMvQztBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUVBQWMsV0FBVyxzRUFBbUI7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksa0VBQWU7QUFDM0I7QUFDQTtBQUNBLGlCQUFpQixzRUFBbUIsY0FBYyxpRUFBYztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsMkRBQVk7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRGQUE0RjtBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRGQUE0RjtBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFFBQVE7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnR0FBZ0c7QUFDaEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRGQUE0RjtBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHFDQUFxQztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsOEJBQThCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qyw2QkFBNkI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHVFQUFxQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxvRUFBb0UsT0FBTztBQUMzRTtBQUNBO0FBQ0Esb0VBQW9FLE9BQU87QUFDM0U7QUFDQSwrREFBK0QsT0FBTztBQUN0RTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxpQkFBaUIsY0FBYztBQUMvRSxvREFBb0QscUJBQXFCLGNBQWM7QUFDdkYsK0NBQStDLGdCQUFnQixjQUFjO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdURBQUk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1REFBSTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsK0RBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw0REFBUztBQUMvQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsWUFBWTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QWtGO0FBQ2xGO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsMERBQU87QUFDaEM7QUFDQTtBQUNBLG1CQUFtQiw0REFBYTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtEQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHNFQUF1QixDQUFDLDBEQUFPO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsMERBQU87QUFDakMsUUFBUSx1REFBSTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDBEQUFPO0FBQ2pDLFFBQVEsdURBQUk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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RUFBMEI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLDJFQUF5QjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLENBQUMsZ0RBQWdEO0FBQ2pELDhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdFlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUNRO0FBQ1Y7QUFDTztBQUNGO0FBQ0c7QUFDUjtBQUNDO0FBQ0M7QUFDSTtBQUNMO0FBQ087QUFDSztBQUNyQyxpQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUMwRDtBQUN5QjtBQUNsQztBQUNDO0FBQ0U7QUFDSztBQUNoQjtBQUNFO0FBQ0w7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsa0VBQWtCO0FBQy9DO0FBQ0EsbUNBQW1DLHFEQUFNO0FBQ3pDLGlDQUFpQyxxREFBTTtBQUN2Qyx5QkFBeUIsK0RBQXNCO0FBQy9DLDhCQUE4QiwrREFBc0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw0REFBTztBQUN0QztBQUNBLDJCQUEyQix1RUFBdUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLCtDQUFRO0FBQ2xDLDZDQUE2QyxtRUFBYztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLE9BQU87QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsdUNBQXVDO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsK0RBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtIQUFrSDtBQUN6STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsbUVBQWM7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsNENBQTRDO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RkFBNkY7QUFDN0Y7QUFDQSxRQUFRLHVEQUFJO0FBQ1o7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix1REFBSTtBQUNwQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHVEQUFJO0FBQ3BCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0hBQWdIO0FBQ2hIO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsdURBQUk7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCw2QkFBNkI7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx5RUFBa0M7QUFDOUMsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdURBQUk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix5QkFBeUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHlCQUF5QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxFQUFFLDRFQUF3QixJQUFJLG1FQUFtRTtBQUM3SSxnREFBZ0QsRUFBRSw0RUFBd0IsSUFBSSxtRUFBbUU7QUFDakosMkNBQTJDLEVBQUUsNEVBQXdCLElBQUksbUVBQW1FO0FBQzVJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsa0VBQW1CO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsdURBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDJEQUFZO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzREFBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsd0NBQXdDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLHFEQUFNO0FBQzVDLGlDQUFpQyxxREFBTTtBQUN2QyxxQ0FBcUMscURBQU07QUFDM0M7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksdURBQUk7QUFDaEI7QUFDQSxhQUFhO0FBQ2I7QUFDQSxzQ0FBc0MsMkRBQVk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxtQ0FBbUM7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsMkRBQVk7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsOENBQThDO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1REFBSTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGVBQWU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsV0FBVztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsVUFBVTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMseUJBQXlCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixzRUFBdUI7QUFDN0M7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBLHFCQUFxQixxRUFBc0I7QUFDM0M7QUFDQSwyQkFBMkIsV0FBVztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwrRUFBaUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBLDZCQUE2QixtREFBSTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdURBQUk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG9DQUFvQztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxFQUFFLG9GQUFnQyxJQUFJLGlDQUFpQztBQUN0SjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyw0QkFBNEI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMscUJBQXFCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixzRUFBdUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsbUJBQW1CO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1CQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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LEVBQUUsZUFBZSxpQkFBaUIsR0FBRyx3QkFBd0IsR0FBRyxFQUFFLHNEQUFNLEVBQUUsb0NBQW9DLEdBQUcsc0RBQU0sRUFBRSxxQ0FBcUM7QUFDbk47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0Isa0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqakVBO0FBQ0E7QUFDNkQ7QUFDRjtBQUNWO0FBQ1Q7QUFDRTtBQUMxQztBQUNBO0FBQ0E7QUFDTyxvQ0FBb0MscUVBQWdCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyx1RUFBbUM7QUFDekU7QUFDQTtBQUNBLG9DQUFvQyx1RUFBa0M7QUFDdEU7QUFDQSxzQ0FBc0MseUVBQW9DO0FBQzFFLHlEQUF5RCx1RUFBcUI7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxnQ0FBZ0M7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlEQUFhLEVBQUUsbUJBQW1CO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDBFQUE0QjtBQUMzQztBQUNBO0FBQ0EseUMiLCJmaWxlIjoicGFja2FnZXNfbm90ZWJvb2tfbGliX2luZGV4X2pzLmU3NDBmMTViYmU3NDljODc5ZWYwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgQ2xpcGJvYXJkLCBEaWFsb2csIHNlc3Npb25Db250ZXh0RGlhbG9ncywgc2hvd0RpYWxvZyB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IENvZGVDZWxsLCBpc0NvZGVDZWxsTW9kZWwsIGlzTWFya2Rvd25DZWxsTW9kZWwsIGlzUmF3Q2VsbE1vZGVsLCBNYXJrZG93bkNlbGwgfSBmcm9tICdAanVweXRlcmxhYi9jZWxscyc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IEFycmF5RXh0LCBlYWNoLCBmaW5kSW5kZXgsIHRvQXJyYXkgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG5pbXBvcnQgeyBKU09ORXh0IH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgRWxlbWVudEV4dCB9IGZyb20gJ0BsdW1pbm8vZG9tdXRpbHMnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBUaGUgbWltZXR5cGUgdXNlZCBmb3IgSnVweXRlciBjZWxsIGRhdGEuXG4gKi9cbmNvbnN0IEpVUFlURVJfQ0VMTF9NSU1FID0gJ2FwcGxpY2F0aW9uL3ZuZC5qdXB5dGVyLmNlbGxzJztcbmV4cG9ydCBjbGFzcyBLZXJuZWxFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgdGhlIGtlcm5lbCBlcnJvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb250ZW50KSB7XG4gICAgICAgIGNvbnN0IGVycm9yQ29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIGNvbnN0IGVycm9yTmFtZSA9IGVycm9yQ29udGVudC5lbmFtZTtcbiAgICAgICAgY29uc3QgZXJyb3JWYWx1ZSA9IGVycm9yQ29udGVudC5ldmFsdWU7XG4gICAgICAgIHN1cGVyKGBLZXJuZWxSZXBseU5vdE9LOiAke2Vycm9yTmFtZX0gJHtlcnJvclZhbHVlfWApO1xuICAgICAgICB0aGlzLmVycm9yTmFtZSA9IGVycm9yTmFtZTtcbiAgICAgICAgdGhpcy5lcnJvclZhbHVlID0gZXJyb3JWYWx1ZTtcbiAgICAgICAgdGhpcy50cmFjZWJhY2sgPSBlcnJvckNvbnRlbnQudHJhY2ViYWNrO1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgS2VybmVsRXJyb3IucHJvdG90eXBlKTtcbiAgICB9XG59XG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBhY3Rpb25zIHRoYXQgcnVuIGFnYWluc3Qgbm90ZWJvb2tzLlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIEFsbCBvZiB0aGUgYWN0aW9ucyBhcmUgYSBuby1vcCBpZiB0aGVyZSBpcyBubyBtb2RlbCBvbiB0aGUgbm90ZWJvb2suXG4gKiBUaGUgYWN0aW9ucyBzZXQgdGhlIHdpZGdldCBgbW9kZWAgdG8gYCdjb21tYW5kJ2AgdW5sZXNzIG90aGVyd2lzZSBzcGVjaWZpZWQuXG4gKiBUaGUgYWN0aW9ucyB3aWxsIHByZXNlcnZlIHRoZSBzZWxlY3Rpb24gb24gdGhlIG5vdGVib29rIHdpZGdldCB1bmxlc3NcbiAqIG90aGVyd2lzZSBzcGVjaWZpZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBOb3RlYm9va0FjdGlvbnMge1xuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIHRoYXQgZW1pdHMgd2hlbmV2ZXIgYSBjZWxsIGNvbXBsZXRlcyBleGVjdXRpb24uXG4gICAgICovXG4gICAgc3RhdGljIGdldCBleGVjdXRlZCgpIHtcbiAgICAgICAgcmV0dXJuIFByaXZhdGUuZXhlY3V0ZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIHRoYXQgZW1pdHMgd2hlbmV2ZXIgYSBjZWxsIGV4ZWN1dGlvbiBpcyBzY2hlZHVsZWQuXG4gICAgICovXG4gICAgc3RhdGljIGdldCBleGVjdXRpb25TY2hlZHVsZWQoKSB7XG4gICAgICAgIHJldHVybiBQcml2YXRlLmV4ZWN1dGlvblNjaGVkdWxlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgdGhhdCBlbWl0cyB3aGVuZXZlciBhIGNlbGwgZXhlY3V0aW9uIGlzIHNjaGVkdWxlZC5cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IHNlbGVjdGlvbkV4ZWN1dGVkKCkge1xuICAgICAgICByZXR1cm4gUHJpdmF0ZS5zZWxlY3Rpb25FeGVjdXRlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcml2YXRlIGNvbnN0cnVjdG9yIGZvciB0aGUgYE5vdGVib29rQWN0aW9uc2AgY2xhc3MuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBjbGFzcyBjYW4gbmV2ZXIgYmUgaW5zdGFudGlhdGVkLiBJdHMgc3RhdGljIG1lbWJlciBgZXhlY3V0ZWRgIHdpbGwgYmVcbiAgICAgKiBtZXJnZWQgd2l0aCB0aGUgYE5vdGVib29rQWN0aW9uc2AgbmFtZXNwYWNlLiBUaGUgcmVhc29uIGl0IGV4aXN0cyBhcyBhXG4gICAgICogc3RhbmRhbG9uZSBjbGFzcyBpcyBiZWNhdXNlIGF0IHJ1biB0aW1lLCB0aGUgYFByaXZhdGUuZXhlY3V0ZWRgIHZhcmlhYmxlXG4gICAgICogZG9lcyBub3QgeWV0IGV4aXN0LCBzbyBpdCBuZWVkcyB0byBiZSByZWZlcmVuY2VkIHZpYSBhIGdldHRlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gSW50ZW50aW9uYWxseSBlbXB0eS5cbiAgICB9XG59XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBgTm90ZWJvb2tBY3Rpb25zYCBzdGF0aWMgbWV0aG9kcy5cbiAqL1xuKGZ1bmN0aW9uIChOb3RlYm9va0FjdGlvbnMpIHtcbiAgICAvKipcbiAgICAgKiBTcGxpdCB0aGUgYWN0aXZlIGNlbGwgaW50byB0d28gb3IgbW9yZSBjZWxscy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub3RlYm9vayBUaGUgdGFyZ2V0IG5vdGVib29rIHdpZGdldC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBJdCB3aWxsIHByZXNlcnZlIHRoZSBleGlzdGluZyBtb2RlLlxuICAgICAqIFRoZSBsYXN0IGNlbGwgd2lsbCBiZSBhY3RpdmF0ZWQgaWYgbm8gc2VsZWN0aW9uIGlzIGZvdW5kLlxuICAgICAqIElmIHRleHQgd2FzIHNlbGVjdGVkLCB0aGUgY2VsbCBjb250YWluaW5nIHRoZSBzZWxlY3Rpb24gd2lsbFxuICAgICAqIGJlIGFjdGl2YXRlZC5cbiAgICAgKiBUaGUgZXhpc3Rpbmcgc2VsZWN0aW9uIHdpbGwgYmUgY2xlYXJlZC5cbiAgICAgKiBUaGUgYWN0aXZhdGVkIGNlbGwgd2lsbCBoYXZlIGZvY3VzIGFuZCB0aGUgY3Vyc29yIHdpbGxcbiAgICAgKiByZW1haW4gaW4gdGhlIGluaXRpYWwgcG9zaXRpb24uXG4gICAgICogVGhlIGxlYWRpbmcgd2hpdGVzcGFjZSBpbiB0aGUgc2Vjb25kIGNlbGwgd2lsbCBiZSByZW1vdmVkLlxuICAgICAqIElmIHRoZXJlIGlzIG5vIGNvbnRlbnQsIHR3byBlbXB0eSBjZWxscyB3aWxsIGJlIGNyZWF0ZWQuXG4gICAgICogQm90aCBjZWxscyB3aWxsIGhhdmUgdGhlIHNhbWUgdHlwZSBhcyB0aGUgb3JpZ2luYWwgY2VsbC5cbiAgICAgKiBUaGlzIGFjdGlvbiBjYW4gYmUgdW5kb25lLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNwbGl0Q2VsbChub3RlYm9vaykge1xuICAgICAgICBpZiAoIW5vdGVib29rLm1vZGVsIHx8ICFub3RlYm9vay5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFQcml2YXRlLmlzTm90ZWJvb2tSZW5kZXJlZChub3RlYm9vaykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGF0ZSA9IFByaXZhdGUuZ2V0U3RhdGUobm90ZWJvb2spO1xuICAgICAgICBub3RlYm9vay5kZXNlbGVjdEFsbCgpO1xuICAgICAgICBjb25zdCBuYk1vZGVsID0gbm90ZWJvb2subW9kZWw7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gbm90ZWJvb2suYWN0aXZlQ2VsbEluZGV4O1xuICAgICAgICBjb25zdCBjaGlsZCA9IG5vdGVib29rLndpZGdldHNbaW5kZXhdO1xuICAgICAgICBjb25zdCBlZGl0b3IgPSBjaGlsZC5lZGl0b3I7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbnMgPSBlZGl0b3IuZ2V0U2VsZWN0aW9ucygpO1xuICAgICAgICBjb25zdCBvcmlnID0gY2hpbGQubW9kZWwudmFsdWUudGV4dDtcbiAgICAgICAgY29uc3Qgb2Zmc2V0cyA9IFswXTtcbiAgICAgICAgbGV0IHN0YXJ0ID0gLTE7XG4gICAgICAgIGxldCBlbmQgPSAtMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBhcHBlbmQgc3RhcnQgYW5kIGVuZCB0byBoYW5kbGUgc2VsZWN0aW9uc1xuICAgICAgICAgICAgLy8gY3Vyc29ycyB3aWxsIGhhdmUgc2FtZSBzdGFydCBhbmQgZW5kXG4gICAgICAgICAgICBzdGFydCA9IGVkaXRvci5nZXRPZmZzZXRBdChzZWxlY3Rpb25zW2ldLnN0YXJ0KTtcbiAgICAgICAgICAgIGVuZCA9IGVkaXRvci5nZXRPZmZzZXRBdChzZWxlY3Rpb25zW2ldLmVuZCk7XG4gICAgICAgICAgICBpZiAoc3RhcnQgPCBlbmQpIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRzLnB1c2goc3RhcnQpO1xuICAgICAgICAgICAgICAgIG9mZnNldHMucHVzaChlbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZW5kIDwgc3RhcnQpIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRzLnB1c2goZW5kKTtcbiAgICAgICAgICAgICAgICBvZmZzZXRzLnB1c2goc3RhcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0cy5wdXNoKHN0YXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvZmZzZXRzLnB1c2gob3JpZy5sZW5ndGgpO1xuICAgICAgICBjb25zdCBjbG9uZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgKyAxIDwgb2Zmc2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2xvbmUgPSBQcml2YXRlLmNsb25lQ2VsbChuYk1vZGVsLCBjaGlsZC5tb2RlbCk7XG4gICAgICAgICAgICBjbG9uZXMucHVzaChjbG9uZSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbG9uZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpICE9PSBjbG9uZXMubGVuZ3RoIC0gMSAmJiBjbG9uZXNbaV0udHlwZSA9PT0gJ2NvZGUnKSB7XG4gICAgICAgICAgICAgICAgY2xvbmVzW2ldLm91dHB1dHMuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsb25lc1tpXS52YWx1ZS50ZXh0ID0gb3JpZ1xuICAgICAgICAgICAgICAgIC5zbGljZShvZmZzZXRzW2ldLCBvZmZzZXRzW2kgKyAxXSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXlxcbisvLCAnJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxuKyQvLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2VsbHMgPSBuYk1vZGVsLmNlbGxzO1xuICAgICAgICBjZWxscy5iZWdpbkNvbXBvdW5kT3BlcmF0aW9uKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xvbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNlbGxzLnNldChpbmRleCwgY2xvbmVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNlbGxzLmluc2VydChpbmRleCArIGksIGNsb25lc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2VsbHMuZW5kQ29tcG91bmRPcGVyYXRpb24oKTtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBzZWxlY3Rpb24gdGhlIHNlbGVjdGVkIGNlbGwgd2lsbCBiZSBhY3RpdmF0ZWRcbiAgICAgICAgY29uc3QgYWN0aXZlQ2VsbERlbHRhID0gc3RhcnQgIT09IGVuZCA/IDIgOiAxO1xuICAgICAgICBub3RlYm9vay5hY3RpdmVDZWxsSW5kZXggPSBpbmRleCArIGNsb25lcy5sZW5ndGggLSBhY3RpdmVDZWxsRGVsdGE7XG4gICAgICAgIGNvbnN0IGZvY3VzZWRFZGl0b3IgPSBub3RlYm9vay5hY3RpdmVDZWxsLmVkaXRvcjtcbiAgICAgICAgZm9jdXNlZEVkaXRvci5mb2N1cygpO1xuICAgICAgICBQcml2YXRlLmhhbmRsZVN0YXRlKG5vdGVib29rLCBzdGF0ZSk7XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy5zcGxpdENlbGwgPSBzcGxpdENlbGw7XG4gICAgLyoqXG4gICAgICogTWVyZ2UgdGhlIHNlbGVjdGVkIGNlbGxzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWVyZ2VBYm92ZSAtIElmIG9ubHkgb25lIGNlbGwgaXMgc2VsZWN0ZWQsIGluZGljYXRlcyB3aGV0aGVyIHRvIG1lcmdlIGl0XG4gICAgICogICAgd2l0aCB0aGUgY2VsbCBhYm92ZSAodHJ1ZSkgb3IgYmVsb3cgKGZhbHNlLCBkZWZhdWx0KS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgd2lkZ2V0IG1vZGUgd2lsbCBiZSBwcmVzZXJ2ZWQuXG4gICAgICogSWYgb25seSBvbmUgY2VsbCBpcyBzZWxlY3RlZCBhbmQgYG1lcmdlQWJvdmVgIGlzIHRydWUsIHRoZSBhYm92ZSBjZWxsIHdpbGwgYmUgc2VsZWN0ZWQuXG4gICAgICogSWYgb25seSBvbmUgY2VsbCBpcyBzZWxlY3RlZCBhbmQgYG1lcmdlQWJvdmVgIGlzIGZhbHNlLCB0aGUgYmVsb3cgY2VsbCB3aWxsIGJlIHNlbGVjdGVkLlxuICAgICAqIElmIHRoZSBhY3RpdmUgY2VsbCBpcyBhIGNvZGUgY2VsbCwgaXRzIG91dHB1dHMgd2lsbCBiZSBjbGVhcmVkLlxuICAgICAqIFRoaXMgYWN0aW9uIGNhbiBiZSB1bmRvbmUuXG4gICAgICogVGhlIGZpbmFsIGNlbGwgd2lsbCBoYXZlIHRoZSBzYW1lIHR5cGUgYXMgdGhlIGFjdGl2ZSBjZWxsLlxuICAgICAqIElmIHRoZSBhY3RpdmUgY2VsbCBpcyBhIG1hcmtkb3duIGNlbGwsIGl0IHdpbGwgYmUgdW5yZW5kZXJlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtZXJnZUNlbGxzKG5vdGVib29rLCBtZXJnZUFib3ZlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFub3RlYm9vay5tb2RlbCB8fCAhbm90ZWJvb2suYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghUHJpdmF0ZS5pc05vdGVib29rUmVuZGVyZWQobm90ZWJvb2spKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBQcml2YXRlLmdldFN0YXRlKG5vdGVib29rKTtcbiAgICAgICAgY29uc3QgdG9NZXJnZSA9IFtdO1xuICAgICAgICBjb25zdCB0b0RlbGV0ZSA9IFtdO1xuICAgICAgICBjb25zdCBtb2RlbCA9IG5vdGVib29rLm1vZGVsO1xuICAgICAgICBjb25zdCBjZWxscyA9IG1vZGVsLmNlbGxzO1xuICAgICAgICBjb25zdCBwcmltYXJ5ID0gbm90ZWJvb2suYWN0aXZlQ2VsbDtcbiAgICAgICAgY29uc3QgYWN0aXZlID0gbm90ZWJvb2suYWN0aXZlQ2VsbEluZGV4O1xuICAgICAgICBjb25zdCBhdHRhY2htZW50cyA9IHt9O1xuICAgICAgICAvLyBHZXQgdGhlIGNlbGxzIHRvIG1lcmdlLlxuICAgICAgICBub3RlYm9vay53aWRnZXRzLmZvckVhY2goKGNoaWxkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKG5vdGVib29rLmlzU2VsZWN0ZWRPckFjdGl2ZShjaGlsZCkpIHtcbiAgICAgICAgICAgICAgICB0b01lcmdlLnB1c2goY2hpbGQubW9kZWwudmFsdWUudGV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSBhY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9EZWxldGUucHVzaChjaGlsZC5tb2RlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIENvbGxlY3QgYXR0YWNobWVudHMgaWYgdGhlIGNlbGwgaXMgYSBtYXJrZG93biBjZWxsIG9yIGEgcmF3IGNlbGxcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RlbCA9IGNoaWxkLm1vZGVsO1xuICAgICAgICAgICAgICAgIGlmIChpc1Jhd0NlbGxNb2RlbChtb2RlbCkgfHwgaXNNYXJrZG93bkNlbGxNb2RlbChtb2RlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgbW9kZWwuYXR0YWNobWVudHMua2V5cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudHNba2V5XSA9IG1vZGVsLmF0dGFjaG1lbnRzLmdldChrZXkpLnRvSlNPTigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQ2hlY2sgZm9yIG9ubHkgYSBzaW5nbGUgY2VsbCBzZWxlY3RlZC5cbiAgICAgICAgaWYgKHRvTWVyZ2UubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAvLyBNZXJnZSB3aXRoIHRoZSBjZWxsIGFib3ZlIHdoZW4gbWVyZ2VBYm92ZSBpcyB0cnVlXG4gICAgICAgICAgICBpZiAobWVyZ2VBYm92ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIC8vIEJhaWwgaWYgaXQgaXMgdGhlIGZpcnN0IGNlbGwuXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBtZXJnZSB3aXRoIHRoZSBwcmV2aW91cyBjZWxsLlxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxNb2RlbCA9IGNlbGxzLmdldChhY3RpdmUgLSAxKTtcbiAgICAgICAgICAgICAgICB0b01lcmdlLnVuc2hpZnQoY2VsbE1vZGVsLnZhbHVlLnRleHQpO1xuICAgICAgICAgICAgICAgIHRvRGVsZXRlLnB1c2goY2VsbE1vZGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG1lcmdlQWJvdmUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgLy8gQmFpbCBpZiBpdCBpcyB0aGUgbGFzdCBjZWxsLlxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmUgPT09IGNlbGxzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgbWVyZ2Ugd2l0aCB0aGUgbmV4dCBjZWxsLlxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxNb2RlbCA9IGNlbGxzLmdldChhY3RpdmUgKyAxKTtcbiAgICAgICAgICAgICAgICB0b01lcmdlLnB1c2goY2VsbE1vZGVsLnZhbHVlLnRleHQpO1xuICAgICAgICAgICAgICAgIHRvRGVsZXRlLnB1c2goY2VsbE1vZGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBub3RlYm9vay5kZXNlbGVjdEFsbCgpO1xuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgY2VsbCBmb3IgdGhlIHNvdXJjZSB0byBwcmVzZXJ2ZSBoaXN0b3J5LlxuICAgICAgICBjb25zdCBuZXdNb2RlbCA9IFByaXZhdGUuY2xvbmVDZWxsKG1vZGVsLCBwcmltYXJ5Lm1vZGVsKTtcbiAgICAgICAgbmV3TW9kZWwudmFsdWUudGV4dCA9IHRvTWVyZ2Uuam9pbignXFxuXFxuJyk7XG4gICAgICAgIGlmIChpc0NvZGVDZWxsTW9kZWwobmV3TW9kZWwpKSB7XG4gICAgICAgICAgICBuZXdNb2RlbC5vdXRwdXRzLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNNYXJrZG93bkNlbGxNb2RlbChuZXdNb2RlbCkgfHwgaXNSYXdDZWxsTW9kZWwobmV3TW9kZWwpKSB7XG4gICAgICAgICAgICBuZXdNb2RlbC5hdHRhY2htZW50cy5mcm9tSlNPTihhdHRhY2htZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTWFrZSB0aGUgY2hhbmdlcyB3aGlsZSBwcmVzZXJ2aW5nIGhpc3RvcnkuXG4gICAgICAgIGNlbGxzLmJlZ2luQ29tcG91bmRPcGVyYXRpb24oKTtcbiAgICAgICAgY2VsbHMuc2V0KGFjdGl2ZSwgbmV3TW9kZWwpO1xuICAgICAgICB0b0RlbGV0ZS5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgY2VsbHMucmVtb3ZlVmFsdWUoY2VsbCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjZWxscy5lbmRDb21wb3VuZE9wZXJhdGlvbigpO1xuICAgICAgICAvLyBJZiB0aGUgb3JpZ2luYWwgY2VsbCBpcyBhIG1hcmtkb3duIGNlbGwsIG1ha2Ugc3VyZVxuICAgICAgICAvLyB0aGUgbmV3IGNlbGwgaXMgdW5yZW5kZXJlZC5cbiAgICAgICAgaWYgKHByaW1hcnkgaW5zdGFuY2VvZiBNYXJrZG93bkNlbGwpIHtcbiAgICAgICAgICAgIG5vdGVib29rLmFjdGl2ZUNlbGwucmVuZGVyZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBQcml2YXRlLmhhbmRsZVN0YXRlKG5vdGVib29rLCBzdGF0ZSk7XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy5tZXJnZUNlbGxzID0gbWVyZ2VDZWxscztcbiAgICAvKipcbiAgICAgKiBEZWxldGUgdGhlIHNlbGVjdGVkIGNlbGxzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIGNlbGwgYWZ0ZXIgdGhlIGxhc3Qgc2VsZWN0ZWQgY2VsbCB3aWxsIGJlIGFjdGl2YXRlZC5cbiAgICAgKiBJdCB3aWxsIGFkZCBhIGNvZGUgY2VsbCBpZiBhbGwgY2VsbHMgYXJlIGRlbGV0ZWQuXG4gICAgICogVGhpcyBhY3Rpb24gY2FuIGJlIHVuZG9uZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkZWxldGVDZWxscyhub3RlYm9vaykge1xuICAgICAgICBpZiAoIW5vdGVib29rLm1vZGVsIHx8ICFub3RlYm9vay5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFQcml2YXRlLmlzTm90ZWJvb2tSZW5kZXJlZChub3RlYm9vaykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGF0ZSA9IFByaXZhdGUuZ2V0U3RhdGUobm90ZWJvb2spO1xuICAgICAgICBQcml2YXRlLmRlbGV0ZUNlbGxzKG5vdGVib29rKTtcbiAgICAgICAgUHJpdmF0ZS5oYW5kbGVTdGF0ZShub3RlYm9vaywgc3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBOb3RlYm9va0FjdGlvbnMuZGVsZXRlQ2VsbHMgPSBkZWxldGVDZWxscztcbiAgICAvKipcbiAgICAgKiBJbnNlcnQgYSBuZXcgY29kZSBjZWxsIGFib3ZlIHRoZSBhY3RpdmUgY2VsbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub3RlYm9vayAtIFRoZSB0YXJnZXQgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSB3aWRnZXQgbW9kZSB3aWxsIGJlIHByZXNlcnZlZC5cbiAgICAgKiBUaGlzIGFjdGlvbiBjYW4gYmUgdW5kb25lLlxuICAgICAqIFRoZSBleGlzdGluZyBzZWxlY3Rpb24gd2lsbCBiZSBjbGVhcmVkLlxuICAgICAqIFRoZSBuZXcgY2VsbCB3aWxsIHRoZSBhY3RpdmUgY2VsbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbnNlcnRBYm92ZShub3RlYm9vaykge1xuICAgICAgICBpZiAoIW5vdGVib29rLm1vZGVsIHx8ICFub3RlYm9vay5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFQcml2YXRlLmlzTm90ZWJvb2tSZW5kZXJlZChub3RlYm9vaykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGF0ZSA9IFByaXZhdGUuZ2V0U3RhdGUobm90ZWJvb2spO1xuICAgICAgICBjb25zdCBtb2RlbCA9IG5vdGVib29rLm1vZGVsO1xuICAgICAgICBjb25zdCBjZWxsID0gbW9kZWwuY29udGVudEZhY3RvcnkuY3JlYXRlQ2VsbChub3RlYm9vay5ub3RlYm9va0NvbmZpZy5kZWZhdWx0Q2VsbCwge30pO1xuICAgICAgICBjb25zdCBhY3RpdmUgPSBub3RlYm9vay5hY3RpdmVDZWxsSW5kZXg7XG4gICAgICAgIG1vZGVsLmNlbGxzLmluc2VydChhY3RpdmUsIGNlbGwpO1xuICAgICAgICAvLyBNYWtlIHRoZSBuZXdseSBpbnNlcnRlZCBjZWxsIGFjdGl2ZS5cbiAgICAgICAgbm90ZWJvb2suYWN0aXZlQ2VsbEluZGV4ID0gYWN0aXZlO1xuICAgICAgICBub3RlYm9vay5kZXNlbGVjdEFsbCgpO1xuICAgICAgICBQcml2YXRlLmhhbmRsZVN0YXRlKG5vdGVib29rLCBzdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy5pbnNlcnRBYm92ZSA9IGluc2VydEFib3ZlO1xuICAgIC8qKlxuICAgICAqIEluc2VydCBhIG5ldyBjb2RlIGNlbGwgYmVsb3cgdGhlIGFjdGl2ZSBjZWxsLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIHdpZGdldCBtb2RlIHdpbGwgYmUgcHJlc2VydmVkLlxuICAgICAqIFRoaXMgYWN0aW9uIGNhbiBiZSB1bmRvbmUuXG4gICAgICogVGhlIGV4aXN0aW5nIHNlbGVjdGlvbiB3aWxsIGJlIGNsZWFyZWQuXG4gICAgICogVGhlIG5ldyBjZWxsIHdpbGwgYmUgdGhlIGFjdGl2ZSBjZWxsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluc2VydEJlbG93KG5vdGVib29rKSB7XG4gICAgICAgIGlmICghbm90ZWJvb2subW9kZWwgfHwgIW5vdGVib29rLmFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVByaXZhdGUuaXNOb3RlYm9va1JlbmRlcmVkKG5vdGVib29rKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXRlID0gUHJpdmF0ZS5nZXRTdGF0ZShub3RlYm9vayk7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gbm90ZWJvb2subW9kZWw7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBtb2RlbC5jb250ZW50RmFjdG9yeS5jcmVhdGVDZWxsKG5vdGVib29rLm5vdGVib29rQ29uZmlnLmRlZmF1bHRDZWxsLCB7fSk7XG4gICAgICAgIG1vZGVsLmNlbGxzLmluc2VydChub3RlYm9vay5hY3RpdmVDZWxsSW5kZXggKyAxLCBjZWxsKTtcbiAgICAgICAgLy8gTWFrZSB0aGUgbmV3bHkgaW5zZXJ0ZWQgY2VsbCBhY3RpdmUuXG4gICAgICAgIG5vdGVib29rLmFjdGl2ZUNlbGxJbmRleCsrO1xuICAgICAgICBub3RlYm9vay5kZXNlbGVjdEFsbCgpO1xuICAgICAgICBQcml2YXRlLmhhbmRsZVN0YXRlKG5vdGVib29rLCBzdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy5pbnNlcnRCZWxvdyA9IGluc2VydEJlbG93O1xuICAgIC8qKlxuICAgICAqIE1vdmUgdGhlIHNlbGVjdGVkIGNlbGwocykgZG93bi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub3RlYm9vayA9IFRoZSB0YXJnZXQgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG1vdmVEb3duKG5vdGVib29rKSB7XG4gICAgICAgIGlmICghbm90ZWJvb2subW9kZWwgfHwgIW5vdGVib29rLmFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVByaXZhdGUuaXNOb3RlYm9va1JlbmRlcmVkKG5vdGVib29rKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXRlID0gUHJpdmF0ZS5nZXRTdGF0ZShub3RlYm9vayk7XG4gICAgICAgIGNvbnN0IGNlbGxzID0gbm90ZWJvb2subW9kZWwuY2VsbHM7XG4gICAgICAgIGNvbnN0IHdpZGdldHMgPSBub3RlYm9vay53aWRnZXRzO1xuICAgICAgICBjZWxscy5iZWdpbkNvbXBvdW5kT3BlcmF0aW9uKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSBjZWxscy5sZW5ndGggLSAyOyBpID4gLTE7IGktLSkge1xuICAgICAgICAgICAgaWYgKG5vdGVib29rLmlzU2VsZWN0ZWRPckFjdGl2ZSh3aWRnZXRzW2ldKSkge1xuICAgICAgICAgICAgICAgIGlmICghbm90ZWJvb2suaXNTZWxlY3RlZE9yQWN0aXZlKHdpZGdldHNbaSArIDFdKSkge1xuICAgICAgICAgICAgICAgICAgICBjZWxscy5tb3ZlKGksIGkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdGVib29rLmFjdGl2ZUNlbGxJbmRleCA9PT0gaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2suYWN0aXZlQ2VsbEluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2suc2VsZWN0KHdpZGdldHNbaSArIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2suZGVzZWxlY3Qod2lkZ2V0c1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNlbGxzLmVuZENvbXBvdW5kT3BlcmF0aW9uKCk7XG4gICAgICAgIFByaXZhdGUuaGFuZGxlU3RhdGUobm90ZWJvb2ssIHN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLm1vdmVEb3duID0gbW92ZURvd247XG4gICAgLyoqXG4gICAgICogTW92ZSB0aGUgc2VsZWN0ZWQgY2VsbChzKSB1cC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWRnZXQgLSBUaGUgdGFyZ2V0IG5vdGVib29rIHdpZGdldC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtb3ZlVXAobm90ZWJvb2spIHtcbiAgICAgICAgaWYgKCFub3RlYm9vay5tb2RlbCB8fCAhbm90ZWJvb2suYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghUHJpdmF0ZS5pc05vdGVib29rUmVuZGVyZWQobm90ZWJvb2spKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBQcml2YXRlLmdldFN0YXRlKG5vdGVib29rKTtcbiAgICAgICAgY29uc3QgY2VsbHMgPSBub3RlYm9vay5tb2RlbC5jZWxscztcbiAgICAgICAgY29uc3Qgd2lkZ2V0cyA9IG5vdGVib29rLndpZGdldHM7XG4gICAgICAgIGNlbGxzLmJlZ2luQ29tcG91bmRPcGVyYXRpb24oKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG5vdGVib29rLmlzU2VsZWN0ZWRPckFjdGl2ZSh3aWRnZXRzW2ldKSkge1xuICAgICAgICAgICAgICAgIGlmICghbm90ZWJvb2suaXNTZWxlY3RlZE9yQWN0aXZlKHdpZGdldHNbaSAtIDFdKSkge1xuICAgICAgICAgICAgICAgICAgICBjZWxscy5tb3ZlKGksIGkgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdGVib29rLmFjdGl2ZUNlbGxJbmRleCA9PT0gaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2suYWN0aXZlQ2VsbEluZGV4LS07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2suc2VsZWN0KHdpZGdldHNbaSAtIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgbm90ZWJvb2suZGVzZWxlY3Qod2lkZ2V0c1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNlbGxzLmVuZENvbXBvdW5kT3BlcmF0aW9uKCk7XG4gICAgICAgIFByaXZhdGUuaGFuZGxlU3RhdGUobm90ZWJvb2ssIHN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLm1vdmVVcCA9IG1vdmVVcDtcbiAgICAvKipcbiAgICAgKiBDaGFuZ2UgdGhlIHNlbGVjdGVkIGNlbGwgdHlwZShzKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub3RlYm9vayAtIFRoZSB0YXJnZXQgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHRhcmdldCBjZWxsIHR5cGUuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogSXQgc2hvdWxkIHByZXNlcnZlIHRoZSB3aWRnZXQgbW9kZS5cbiAgICAgKiBUaGlzIGFjdGlvbiBjYW4gYmUgdW5kb25lLlxuICAgICAqIFRoZSBleGlzdGluZyBzZWxlY3Rpb24gd2lsbCBiZSBjbGVhcmVkLlxuICAgICAqIEFueSBjZWxscyBjb252ZXJ0ZWQgdG8gbWFya2Rvd24gd2lsbCBiZSB1bnJlbmRlcmVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNoYW5nZUNlbGxUeXBlKG5vdGVib29rLCB2YWx1ZSkge1xuICAgICAgICBpZiAoIW5vdGVib29rLm1vZGVsIHx8ICFub3RlYm9vay5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBQcml2YXRlLmdldFN0YXRlKG5vdGVib29rKTtcbiAgICAgICAgUHJpdmF0ZS5jaGFuZ2VDZWxsVHlwZShub3RlYm9vaywgdmFsdWUpO1xuICAgICAgICBQcml2YXRlLmhhbmRsZVN0YXRlKG5vdGVib29rLCBzdGF0ZSk7XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy5jaGFuZ2VDZWxsVHlwZSA9IGNoYW5nZUNlbGxUeXBlO1xuICAgIC8qKlxuICAgICAqIFJ1biB0aGUgc2VsZWN0ZWQgY2VsbChzKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub3RlYm9vayAtIFRoZSB0YXJnZXQgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHNlc3Npb25Db250ZXh0IC0gVGhlIG9wdGlvbmFsIGNsaWVudCBzZXNzaW9uIG9iamVjdC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgbGFzdCBzZWxlY3RlZCBjZWxsIHdpbGwgYmUgYWN0aXZhdGVkLCBidXQgbm90IHNjcm9sbGVkIGludG8gdmlldy5cbiAgICAgKiBUaGUgZXhpc3Rpbmcgc2VsZWN0aW9uIHdpbGwgYmUgY2xlYXJlZC5cbiAgICAgKiBBbiBleGVjdXRpb24gZXJyb3Igd2lsbCBwcmV2ZW50IHRoZSByZW1haW5pbmcgY29kZSBjZWxscyBmcm9tIGV4ZWN1dGluZy5cbiAgICAgKiBBbGwgbWFya2Rvd24gY2VsbHMgd2lsbCBiZSByZW5kZXJlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBydW4obm90ZWJvb2ssIHNlc3Npb25Db250ZXh0KSB7XG4gICAgICAgIGlmICghbm90ZWJvb2subW9kZWwgfHwgIW5vdGVib29rLmFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXRlID0gUHJpdmF0ZS5nZXRTdGF0ZShub3RlYm9vayk7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBQcml2YXRlLnJ1blNlbGVjdGVkKG5vdGVib29rLCBzZXNzaW9uQ29udGV4dCk7XG4gICAgICAgIFByaXZhdGUuaGFuZGxlUnVuU3RhdGUobm90ZWJvb2ssIHN0YXRlLCBmYWxzZSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICBOb3RlYm9va0FjdGlvbnMucnVuID0gcnVuO1xuICAgIC8qKlxuICAgICAqIFJ1biB0aGUgc2VsZWN0ZWQgY2VsbChzKSBhbmQgYWR2YW5jZSB0byB0aGUgbmV4dCBjZWxsLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2Vzc2lvbkNvbnRleHQgLSBUaGUgb3B0aW9uYWwgY2xpZW50IHNlc3Npb24gb2JqZWN0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSBleGlzdGluZyBzZWxlY3Rpb24gd2lsbCBiZSBjbGVhcmVkLlxuICAgICAqIFRoZSBjZWxsIGFmdGVyIHRoZSBsYXN0IHNlbGVjdGVkIGNlbGwgd2lsbCBiZSBhY3RpdmF0ZWQgYW5kIHNjcm9sbGVkIGludG8gdmlldy5cbiAgICAgKiBBbiBleGVjdXRpb24gZXJyb3Igd2lsbCBwcmV2ZW50IHRoZSByZW1haW5pbmcgY29kZSBjZWxscyBmcm9tIGV4ZWN1dGluZy5cbiAgICAgKiBBbGwgbWFya2Rvd24gY2VsbHMgd2lsbCBiZSByZW5kZXJlZC5cbiAgICAgKiBJZiB0aGUgbGFzdCBzZWxlY3RlZCBjZWxsIGlzIHRoZSBsYXN0IGNlbGwsIGEgbmV3IGNvZGUgY2VsbFxuICAgICAqIHdpbGwgYmUgY3JlYXRlZCBpbiBgJ2VkaXQnYCBtb2RlLiAgVGhlIG5ldyBjZWxsIGNyZWF0aW9uIGNhbiBiZSB1bmRvbmUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcnVuQW5kQWR2YW5jZShub3RlYm9vaywgc2Vzc2lvbkNvbnRleHQpIHtcbiAgICAgICAgaWYgKCFub3RlYm9vay5tb2RlbCB8fCAhbm90ZWJvb2suYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBQcml2YXRlLmdldFN0YXRlKG5vdGVib29rKTtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IFByaXZhdGUucnVuU2VsZWN0ZWQobm90ZWJvb2ssIHNlc3Npb25Db250ZXh0KTtcbiAgICAgICAgY29uc3QgbW9kZWwgPSBub3RlYm9vay5tb2RlbDtcbiAgICAgICAgaWYgKG5vdGVib29rLmFjdGl2ZUNlbGxJbmRleCA9PT0gbm90ZWJvb2sud2lkZ2V0cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gbW9kZWwuY29udGVudEZhY3RvcnkuY3JlYXRlQ2VsbChub3RlYm9vay5ub3RlYm9va0NvbmZpZy5kZWZhdWx0Q2VsbCwge30pO1xuICAgICAgICAgICAgLy8gRG8gbm90IHVzZSBwdXNoIGhlcmUsIGFzIHdlIHdhbnQgYW4gd2lkZ2V0IGluc2VydGlvblxuICAgICAgICAgICAgLy8gdG8gbWFrZSBzdXJlIG5vIHBsYWNlaG9sZGVyIHdpZGdldCBpcyByZW5kZXJlZC5cbiAgICAgICAgICAgIG1vZGVsLmNlbGxzLmluc2VydChub3RlYm9vay53aWRnZXRzLmxlbmd0aCwgY2VsbCk7XG4gICAgICAgICAgICBub3RlYm9vay5hY3RpdmVDZWxsSW5kZXgrKztcbiAgICAgICAgICAgIG5vdGVib29rLm1vZGUgPSAnZWRpdCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBub3RlYm9vay5hY3RpdmVDZWxsSW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICBQcml2YXRlLmhhbmRsZVJ1blN0YXRlKG5vdGVib29rLCBzdGF0ZSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICBOb3RlYm9va0FjdGlvbnMucnVuQW5kQWR2YW5jZSA9IHJ1bkFuZEFkdmFuY2U7XG4gICAgLyoqXG4gICAgICogUnVuIHRoZSBzZWxlY3RlZCBjZWxsKHMpIGFuZCBpbnNlcnQgYSBuZXcgY29kZSBjZWxsLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2Vzc2lvbkNvbnRleHQgLSBUaGUgb3B0aW9uYWwgY2xpZW50IHNlc3Npb24gb2JqZWN0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIEFuIGV4ZWN1dGlvbiBlcnJvciB3aWxsIHByZXZlbnQgdGhlIHJlbWFpbmluZyBjb2RlIGNlbGxzIGZyb20gZXhlY3V0aW5nLlxuICAgICAqIEFsbCBtYXJrZG93biBjZWxscyB3aWxsIGJlIHJlbmRlcmVkLlxuICAgICAqIFRoZSB3aWRnZXQgbW9kZSB3aWxsIGJlIHNldCB0byBgJ2VkaXQnYCBhZnRlciBydW5uaW5nLlxuICAgICAqIFRoZSBleGlzdGluZyBzZWxlY3Rpb24gd2lsbCBiZSBjbGVhcmVkLlxuICAgICAqIFRoZSBjZWxsIGluc2VydCBjYW4gYmUgdW5kb25lLlxuICAgICAqIFRoZSBuZXcgY2VsbCB3aWxsIGJlIHNjcm9sbGVkIGludG8gdmlldy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBydW5BbmRJbnNlcnQobm90ZWJvb2ssIHNlc3Npb25Db250ZXh0KSB7XG4gICAgICAgIGlmICghbm90ZWJvb2subW9kZWwgfHwgIW5vdGVib29rLmFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghUHJpdmF0ZS5pc05vdGVib29rUmVuZGVyZWQobm90ZWJvb2spKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGF0ZSA9IFByaXZhdGUuZ2V0U3RhdGUobm90ZWJvb2spO1xuICAgICAgICBjb25zdCBwcm9taXNlID0gUHJpdmF0ZS5ydW5TZWxlY3RlZChub3RlYm9vaywgc2Vzc2lvbkNvbnRleHQpO1xuICAgICAgICBjb25zdCBtb2RlbCA9IG5vdGVib29rLm1vZGVsO1xuICAgICAgICBjb25zdCBjZWxsID0gbW9kZWwuY29udGVudEZhY3RvcnkuY3JlYXRlQ2VsbChub3RlYm9vay5ub3RlYm9va0NvbmZpZy5kZWZhdWx0Q2VsbCwge30pO1xuICAgICAgICBtb2RlbC5jZWxscy5pbnNlcnQobm90ZWJvb2suYWN0aXZlQ2VsbEluZGV4ICsgMSwgY2VsbCk7XG4gICAgICAgIG5vdGVib29rLmFjdGl2ZUNlbGxJbmRleCsrO1xuICAgICAgICBub3RlYm9vay5tb2RlID0gJ2VkaXQnO1xuICAgICAgICBQcml2YXRlLmhhbmRsZVJ1blN0YXRlKG5vdGVib29rLCBzdGF0ZSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICBOb3RlYm9va0FjdGlvbnMucnVuQW5kSW5zZXJ0ID0gcnVuQW5kSW5zZXJ0O1xuICAgIC8qKlxuICAgICAqIFJ1biBhbGwgb2YgdGhlIGNlbGxzIGluIHRoZSBub3RlYm9vay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub3RlYm9vayAtIFRoZSB0YXJnZXQgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHNlc3Npb25Db250ZXh0IC0gVGhlIG9wdGlvbmFsIGNsaWVudCBzZXNzaW9uIG9iamVjdC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgZXhpc3Rpbmcgc2VsZWN0aW9uIHdpbGwgYmUgY2xlYXJlZC5cbiAgICAgKiBBbiBleGVjdXRpb24gZXJyb3Igd2lsbCBwcmV2ZW50IHRoZSByZW1haW5pbmcgY29kZSBjZWxscyBmcm9tIGV4ZWN1dGluZy5cbiAgICAgKiBBbGwgbWFya2Rvd24gY2VsbHMgd2lsbCBiZSByZW5kZXJlZC5cbiAgICAgKiBUaGUgbGFzdCBjZWxsIGluIHRoZSBub3RlYm9vayB3aWxsIGJlIGFjdGl2YXRlZCBhbmQgc2Nyb2xsZWQgaW50byB2aWV3LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJ1bkFsbChub3RlYm9vaywgc2Vzc2lvbkNvbnRleHQpIHtcbiAgICAgICAgaWYgKCFub3RlYm9vay5tb2RlbCB8fCAhbm90ZWJvb2suYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBQcml2YXRlLmdldFN0YXRlKG5vdGVib29rKTtcbiAgICAgICAgbm90ZWJvb2sud2lkZ2V0cy5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgIG5vdGVib29rLnNlbGVjdChjaGlsZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBwcm9taXNlID0gUHJpdmF0ZS5ydW5TZWxlY3RlZChub3RlYm9vaywgc2Vzc2lvbkNvbnRleHQpO1xuICAgICAgICBQcml2YXRlLmhhbmRsZVJ1blN0YXRlKG5vdGVib29rLCBzdGF0ZSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICBOb3RlYm9va0FjdGlvbnMucnVuQWxsID0gcnVuQWxsO1xuICAgIGZ1bmN0aW9uIHJlbmRlckFsbE1hcmtkb3duKG5vdGVib29rLCBzZXNzaW9uQ29udGV4dCkge1xuICAgICAgICBpZiAoIW5vdGVib29rLm1vZGVsIHx8ICFub3RlYm9vay5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcmV2aW91c0luZGV4ID0gbm90ZWJvb2suYWN0aXZlQ2VsbEluZGV4O1xuICAgICAgICBjb25zdCBzdGF0ZSA9IFByaXZhdGUuZ2V0U3RhdGUobm90ZWJvb2spO1xuICAgICAgICBub3RlYm9vay53aWRnZXRzLmZvckVhY2goKGNoaWxkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoaWxkLm1vZGVsLnR5cGUgPT09ICdtYXJrZG93bicpIHtcbiAgICAgICAgICAgICAgICBub3RlYm9vay5zZWxlY3QoY2hpbGQpO1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGFjdGl2ZUNlbGxcbiAgICAgICAgICAgICAgICAvLyBkb2VzIG5vdCBnZXQgZXhlY3V0ZWRcbiAgICAgICAgICAgICAgICBub3RlYm9vay5hY3RpdmVDZWxsSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChub3RlYm9vay5hY3RpdmVDZWxsLm1vZGVsLnR5cGUgIT09ICdtYXJrZG93bicpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IFByaXZhdGUucnVuU2VsZWN0ZWQobm90ZWJvb2ssIHNlc3Npb25Db250ZXh0KTtcbiAgICAgICAgbm90ZWJvb2suYWN0aXZlQ2VsbEluZGV4ID0gcHJldmlvdXNJbmRleDtcbiAgICAgICAgUHJpdmF0ZS5oYW5kbGVSdW5TdGF0ZShub3RlYm9vaywgc3RhdGUsIHRydWUpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLnJlbmRlckFsbE1hcmtkb3duID0gcmVuZGVyQWxsTWFya2Rvd247XG4gICAgLyoqXG4gICAgICogUnVuIGFsbCBvZiB0aGUgY2VsbHMgYmVmb3JlIHRoZSBjdXJyZW50bHkgYWN0aXZlIGNlbGwgKGV4Y2x1c2l2ZSkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm90ZWJvb2sgLSBUaGUgdGFyZ2V0IG5vdGVib29rIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzZXNzaW9uQ29udGV4dCAtIFRoZSBvcHRpb25hbCBjbGllbnQgc2Vzc2lvbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIGV4aXN0aW5nIHNlbGVjdGlvbiB3aWxsIGJlIGNsZWFyZWQuXG4gICAgICogQW4gZXhlY3V0aW9uIGVycm9yIHdpbGwgcHJldmVudCB0aGUgcmVtYWluaW5nIGNvZGUgY2VsbHMgZnJvbSBleGVjdXRpbmcuXG4gICAgICogQWxsIG1hcmtkb3duIGNlbGxzIHdpbGwgYmUgcmVuZGVyZWQuXG4gICAgICogVGhlIGN1cnJlbnRseSBhY3RpdmUgY2VsbCB3aWxsIHJlbWFpbiBzZWxlY3RlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBydW5BbGxBYm92ZShub3RlYm9vaywgc2Vzc2lvbkNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgeyBhY3RpdmVDZWxsLCBhY3RpdmVDZWxsSW5kZXgsIG1vZGVsIH0gPSBub3RlYm9vaztcbiAgICAgICAgaWYgKCFtb2RlbCB8fCAhYWN0aXZlQ2VsbCB8fCBhY3RpdmVDZWxsSW5kZXggPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGF0ZSA9IFByaXZhdGUuZ2V0U3RhdGUobm90ZWJvb2spO1xuICAgICAgICBub3RlYm9vay5hY3RpdmVDZWxsSW5kZXgtLTtcbiAgICAgICAgbm90ZWJvb2suZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub3RlYm9vay5hY3RpdmVDZWxsSW5kZXg7ICsraSkge1xuICAgICAgICAgICAgbm90ZWJvb2suc2VsZWN0KG5vdGVib29rLndpZGdldHNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBQcml2YXRlLnJ1blNlbGVjdGVkKG5vdGVib29rLCBzZXNzaW9uQ29udGV4dCk7XG4gICAgICAgIG5vdGVib29rLmFjdGl2ZUNlbGxJbmRleCsrO1xuICAgICAgICBQcml2YXRlLmhhbmRsZVJ1blN0YXRlKG5vdGVib29rLCBzdGF0ZSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICBOb3RlYm9va0FjdGlvbnMucnVuQWxsQWJvdmUgPSBydW5BbGxBYm92ZTtcbiAgICAvKipcbiAgICAgKiBSdW4gYWxsIG9mIHRoZSBjZWxscyBhZnRlciB0aGUgY3VycmVudGx5IGFjdGl2ZSBjZWxsIChpbmNsdXNpdmUpLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2Vzc2lvbkNvbnRleHQgLSBUaGUgb3B0aW9uYWwgY2xpZW50IHNlc3Npb24gb2JqZWN0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSBleGlzdGluZyBzZWxlY3Rpb24gd2lsbCBiZSBjbGVhcmVkLlxuICAgICAqIEFuIGV4ZWN1dGlvbiBlcnJvciB3aWxsIHByZXZlbnQgdGhlIHJlbWFpbmluZyBjb2RlIGNlbGxzIGZyb20gZXhlY3V0aW5nLlxuICAgICAqIEFsbCBtYXJrZG93biBjZWxscyB3aWxsIGJlIHJlbmRlcmVkLlxuICAgICAqIFRoZSBsYXN0IGNlbGwgaW4gdGhlIG5vdGVib29rIHdpbGwgYmUgYWN0aXZhdGVkIGFuZCBzY3JvbGxlZCBpbnRvIHZpZXcuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcnVuQWxsQmVsb3cobm90ZWJvb2ssIHNlc3Npb25Db250ZXh0KSB7XG4gICAgICAgIGlmICghbm90ZWJvb2subW9kZWwgfHwgIW5vdGVib29rLmFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXRlID0gUHJpdmF0ZS5nZXRTdGF0ZShub3RlYm9vayk7XG4gICAgICAgIG5vdGVib29rLmRlc2VsZWN0QWxsKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSBub3RlYm9vay5hY3RpdmVDZWxsSW5kZXg7IGkgPCBub3RlYm9vay53aWRnZXRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBub3RlYm9vay5zZWxlY3Qobm90ZWJvb2sud2lkZ2V0c1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IFByaXZhdGUucnVuU2VsZWN0ZWQobm90ZWJvb2ssIHNlc3Npb25Db250ZXh0KTtcbiAgICAgICAgUHJpdmF0ZS5oYW5kbGVSdW5TdGF0ZShub3RlYm9vaywgc3RhdGUsIHRydWUpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLnJ1bkFsbEJlbG93ID0gcnVuQWxsQmVsb3c7XG4gICAgLyoqXG4gICAgICogUmVwbGFjZXMgdGhlIHNlbGVjdGlvbiBpbiB0aGUgYWN0aXZlIGNlbGwgb2YgdGhlIG5vdGVib29rLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICogQHBhcmFtIHRleHQgLSBUaGUgdGV4dCB0byByZXBsYWNlIHRoZSBzZWxlY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVwbGFjZVNlbGVjdGlvbihub3RlYm9vaywgdGV4dCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBpZiAoIW5vdGVib29rLm1vZGVsIHx8ICFub3RlYm9vay5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgKF9iID0gKF9hID0gbm90ZWJvb2suYWN0aXZlQ2VsbC5lZGl0b3IpLnJlcGxhY2VTZWxlY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCB0ZXh0KTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLnJlcGxhY2VTZWxlY3Rpb24gPSByZXBsYWNlU2VsZWN0aW9uO1xuICAgIC8qKlxuICAgICAqIFNlbGVjdCB0aGUgYWJvdmUgdGhlIGFjdGl2ZSBjZWxsLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIHdpZGdldCBtb2RlIHdpbGwgYmUgcHJlc2VydmVkLlxuICAgICAqIFRoaXMgaXMgYSBuby1vcCBpZiB0aGUgZmlyc3QgY2VsbCBpcyB0aGUgYWN0aXZlIGNlbGwuXG4gICAgICogVGhpcyB3aWxsIHNraXAgYW55IGNvbGxhcHNlZCBjZWxscy5cbiAgICAgKiBUaGUgZXhpc3Rpbmcgc2VsZWN0aW9uIHdpbGwgYmUgY2xlYXJlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZWxlY3RBYm92ZShub3RlYm9vaykge1xuICAgICAgICBpZiAoIW5vdGVib29rLm1vZGVsIHx8ICFub3RlYm9vay5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vdGVib29rLmFjdGl2ZUNlbGxJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwb3NzaWJsZU5leHRDZWxsSW5kZXggPSBub3RlYm9vay5hY3RpdmVDZWxsSW5kZXggLSAxO1xuICAgICAgICAvLyBmaW5kIGZpcnN0IG5vbiBoaWRkZW4gY2VsbCBhYm92ZSBjdXJyZW50IGNlbGxcbiAgICAgICAgd2hpbGUgKHBvc3NpYmxlTmV4dENlbGxJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBwb3NzaWJsZU5leHRDZWxsID0gbm90ZWJvb2sud2lkZ2V0c1twb3NzaWJsZU5leHRDZWxsSW5kZXhdO1xuICAgICAgICAgICAgaWYgKCFwb3NzaWJsZU5leHRDZWxsLmlucHV0SGlkZGVuICYmICFwb3NzaWJsZU5leHRDZWxsLmlzSGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3NzaWJsZU5leHRDZWxsSW5kZXggLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGF0ZSA9IFByaXZhdGUuZ2V0U3RhdGUobm90ZWJvb2spO1xuICAgICAgICBub3RlYm9vay5hY3RpdmVDZWxsSW5kZXggPSBwb3NzaWJsZU5leHRDZWxsSW5kZXg7XG4gICAgICAgIG5vdGVib29rLmRlc2VsZWN0QWxsKCk7XG4gICAgICAgIFByaXZhdGUuaGFuZGxlU3RhdGUobm90ZWJvb2ssIHN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLnNlbGVjdEFib3ZlID0gc2VsZWN0QWJvdmU7XG4gICAgLyoqXG4gICAgICogU2VsZWN0IHRoZSBjZWxsIGJlbG93IHRoZSBhY3RpdmUgY2VsbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub3RlYm9vayAtIFRoZSB0YXJnZXQgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSB3aWRnZXQgbW9kZSB3aWxsIGJlIHByZXNlcnZlZC5cbiAgICAgKiBUaGlzIGlzIGEgbm8tb3AgaWYgdGhlIGxhc3QgY2VsbCBpcyB0aGUgYWN0aXZlIGNlbGwuXG4gICAgICogVGhpcyB3aWxsIHNraXAgYW55IGNvbGxhcHNlZCBjZWxscy5cbiAgICAgKiBUaGUgZXhpc3Rpbmcgc2VsZWN0aW9uIHdpbGwgYmUgY2xlYXJlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZWxlY3RCZWxvdyhub3RlYm9vaykge1xuICAgICAgICBpZiAoIW5vdGVib29rLm1vZGVsIHx8ICFub3RlYm9vay5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1heENlbGxJbmRleCA9IG5vdGVib29rLndpZGdldHMubGVuZ3RoIC0gMTtcbiAgICAgICAgLy8gRmluZCBsYXN0IG5vbi1oaWRkZW4gY2VsbFxuICAgICAgICB3aGlsZSAobm90ZWJvb2sud2lkZ2V0c1ttYXhDZWxsSW5kZXhdLmlzSGlkZGVuIHx8XG4gICAgICAgICAgICBub3RlYm9vay53aWRnZXRzW21heENlbGxJbmRleF0uaW5wdXRIaWRkZW4pIHtcbiAgICAgICAgICAgIG1heENlbGxJbmRleCAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub3RlYm9vay5hY3RpdmVDZWxsSW5kZXggPT09IG1heENlbGxJbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwb3NzaWJsZU5leHRDZWxsSW5kZXggPSBub3RlYm9vay5hY3RpdmVDZWxsSW5kZXggKyAxO1xuICAgICAgICAvLyBmaW5kIGZpcnN0IG5vbiBoaWRkZW4gY2VsbCBiZWxvdyBjdXJyZW50IGNlbGxcbiAgICAgICAgd2hpbGUgKHBvc3NpYmxlTmV4dENlbGxJbmRleCA8IG1heENlbGxJbmRleCkge1xuICAgICAgICAgICAgbGV0IHBvc3NpYmxlTmV4dENlbGwgPSBub3RlYm9vay53aWRnZXRzW3Bvc3NpYmxlTmV4dENlbGxJbmRleF07XG4gICAgICAgICAgICBpZiAoIXBvc3NpYmxlTmV4dENlbGwuaW5wdXRIaWRkZW4gJiYgIXBvc3NpYmxlTmV4dENlbGwuaXNIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBvc3NpYmxlTmV4dENlbGxJbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXRlID0gUHJpdmF0ZS5nZXRTdGF0ZShub3RlYm9vayk7XG4gICAgICAgIG5vdGVib29rLmFjdGl2ZUNlbGxJbmRleCA9IHBvc3NpYmxlTmV4dENlbGxJbmRleDtcbiAgICAgICAgbm90ZWJvb2suZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgUHJpdmF0ZS5oYW5kbGVTdGF0ZShub3RlYm9vaywgc3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBOb3RlYm9va0FjdGlvbnMuc2VsZWN0QmVsb3cgPSBzZWxlY3RCZWxvdztcbiAgICAvKipcbiAgICAgKiBFeHRlbmQgdGhlIHNlbGVjdGlvbiB0byB0aGUgY2VsbCBhYm92ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub3RlYm9vayAtIFRoZSB0YXJnZXQgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqIEBwYXJhbSB0b1RvcCAtIElmIHRydWUsIGRlbm90ZXMgc2VsZWN0aW9uIHRvIGV4dGVuZCB0byB0aGUgdG9wLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgaXMgYSBuby1vcCBpZiB0aGUgZmlyc3QgY2VsbCBpcyB0aGUgYWN0aXZlIGNlbGwuXG4gICAgICogVGhlIG5ldyBjZWxsIHdpbGwgYmUgYWN0aXZhdGVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGV4dGVuZFNlbGVjdGlvbkFib3ZlKG5vdGVib29rLCB0b1RvcCA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghbm90ZWJvb2subW9kZWwgfHwgIW5vdGVib29rLmFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBEbyBub3Qgd3JhcCBhcm91bmQuXG4gICAgICAgIGlmIChub3RlYm9vay5hY3RpdmVDZWxsSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGF0ZSA9IFByaXZhdGUuZ2V0U3RhdGUobm90ZWJvb2spO1xuICAgICAgICBub3RlYm9vay5tb2RlID0gJ2NvbW1hbmQnO1xuICAgICAgICAvLyBDaGVjayBpZiB0b1RvcCBpcyB0cnVlLCBpZiB5ZXMsIHNlbGVjdGlvbiBpcyBtYWRlIHRvIHRoZSB0b3AuXG4gICAgICAgIGlmICh0b1RvcCkge1xuICAgICAgICAgICAgbm90ZWJvb2suZXh0ZW5kQ29udGlndW91c1NlbGVjdGlvblRvKDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm90ZWJvb2suZXh0ZW5kQ29udGlndW91c1NlbGVjdGlvblRvKG5vdGVib29rLmFjdGl2ZUNlbGxJbmRleCAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIFByaXZhdGUuaGFuZGxlU3RhdGUobm90ZWJvb2ssIHN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLmV4dGVuZFNlbGVjdGlvbkFib3ZlID0gZXh0ZW5kU2VsZWN0aW9uQWJvdmU7XG4gICAgLyoqXG4gICAgICogRXh0ZW5kIHRoZSBzZWxlY3Rpb24gdG8gdGhlIGNlbGwgYmVsb3cuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm90ZWJvb2sgLSBUaGUgdGFyZ2V0IG5vdGVib29rIHdpZGdldC5cbiAgICAgKiBAcGFyYW0gdG9Cb3R0b20gLSBJZiB0cnVlLCBkZW5vdGVzIHNlbGVjdGlvbiB0byBleHRlbmQgdG8gdGhlIGJvdHRvbS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGlzIGEgbm8tb3AgaWYgdGhlIGxhc3QgY2VsbCBpcyB0aGUgYWN0aXZlIGNlbGwuXG4gICAgICogVGhlIG5ldyBjZWxsIHdpbGwgYmUgYWN0aXZhdGVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGV4dGVuZFNlbGVjdGlvbkJlbG93KG5vdGVib29rLCB0b0JvdHRvbSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghbm90ZWJvb2subW9kZWwgfHwgIW5vdGVib29rLmFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBEbyBub3Qgd3JhcCBhcm91bmQuXG4gICAgICAgIGlmIChub3RlYm9vay5hY3RpdmVDZWxsSW5kZXggPT09IG5vdGVib29rLndpZGdldHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXRlID0gUHJpdmF0ZS5nZXRTdGF0ZShub3RlYm9vayk7XG4gICAgICAgIG5vdGVib29rLm1vZGUgPSAnY29tbWFuZCc7XG4gICAgICAgIC8vIENoZWNrIGlmIHRvQm90dG9tIGlzIHRydWUsIGlmIHllcyBzZWxlY3Rpb24gaXMgbWFkZSB0byB0aGUgYm90dG9tLlxuICAgICAgICBpZiAodG9Cb3R0b20pIHtcbiAgICAgICAgICAgIG5vdGVib29rLmV4dGVuZENvbnRpZ3VvdXNTZWxlY3Rpb25Ubyhub3RlYm9vay53aWRnZXRzLmxlbmd0aCAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm90ZWJvb2suZXh0ZW5kQ29udGlndW91c1NlbGVjdGlvblRvKG5vdGVib29rLmFjdGl2ZUNlbGxJbmRleCArIDEpO1xuICAgICAgICB9XG4gICAgICAgIFByaXZhdGUuaGFuZGxlU3RhdGUobm90ZWJvb2ssIHN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLmV4dGVuZFNlbGVjdGlvbkJlbG93ID0gZXh0ZW5kU2VsZWN0aW9uQmVsb3c7XG4gICAgLyoqXG4gICAgICogU2VsZWN0IGFsbCBvZiB0aGUgY2VsbHMgb2YgdGhlIG5vdGVib29rLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gdGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2VsZWN0QWxsKG5vdGVib29rKSB7XG4gICAgICAgIGlmICghbm90ZWJvb2subW9kZWwgfHwgIW5vdGVib29rLmFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBub3RlYm9vay53aWRnZXRzLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgbm90ZWJvb2suc2VsZWN0KGNoaWxkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy5zZWxlY3RBbGwgPSBzZWxlY3RBbGw7XG4gICAgLyoqXG4gICAgICogRGVzZWxlY3QgYWxsIG9mIHRoZSBjZWxscyBvZiB0aGUgbm90ZWJvb2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm90ZWJvb2sgLSB0aGUgdGFyZ2V0IG5vdGVib29rIHdpZGdldC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkZXNlbGVjdEFsbChub3RlYm9vaykge1xuICAgICAgICBpZiAoIW5vdGVib29rLm1vZGVsIHx8ICFub3RlYm9vay5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbm90ZWJvb2suZGVzZWxlY3RBbGwoKTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLmRlc2VsZWN0QWxsID0gZGVzZWxlY3RBbGw7XG4gICAgLyoqXG4gICAgICogQ29weSB0aGUgc2VsZWN0ZWQgY2VsbChzKSBkYXRhIHRvIGEgY2xpcGJvYXJkLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29weShub3RlYm9vaykge1xuICAgICAgICBQcml2YXRlLmNvcHlPckN1dChub3RlYm9vaywgZmFsc2UpO1xuICAgIH1cbiAgICBOb3RlYm9va0FjdGlvbnMuY29weSA9IGNvcHk7XG4gICAgLyoqXG4gICAgICogQ3V0IHRoZSBzZWxlY3RlZCBjZWxsIGRhdGEgdG8gYSBjbGlwYm9hcmQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm90ZWJvb2sgLSBUaGUgdGFyZ2V0IG5vdGVib29rIHdpZGdldC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGFjdGlvbiBjYW4gYmUgdW5kb25lLlxuICAgICAqIEEgbmV3IGNvZGUgY2VsbCBpcyBhZGRlZCBpZiBhbGwgY2VsbHMgYXJlIGN1dC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjdXQobm90ZWJvb2spIHtcbiAgICAgICAgaWYgKCFQcml2YXRlLmlzTm90ZWJvb2tSZW5kZXJlZChub3RlYm9vaykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBQcml2YXRlLmNvcHlPckN1dChub3RlYm9vaywgdHJ1ZSk7XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy5jdXQgPSBjdXQ7XG4gICAgLyoqXG4gICAgICogUGFzdGUgY2VsbHMgZnJvbSB0aGUgYXBwbGljYXRpb24gY2xpcGJvYXJkLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbW9kZSAtIHRoZSBtb2RlIG9mIGFkZGluZyBjZWxsczpcbiAgICAgKiAgICdiZWxvdycgKGRlZmF1bHQpIGFkZHMgY2VsbHMgYmVsb3cgdGhlIGFjdGl2ZSBjZWxsLFxuICAgICAqICAgJ2JlbG93U2VsZWN0ZWQnIGFkZHMgY2VsbHMgYmVsb3cgYWxsIHNlbGVjdGVkIGNlbGxzLFxuICAgICAqICAgJ2Fib3ZlJyBhZGRzIGNlbGxzIGFib3ZlIHRoZSBhY3RpdmUgY2VsbCwgYW5kXG4gICAgICogICAncmVwbGFjZScgcmVtb3ZlcyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGNlbGxzIGFuZCBhZGRzIGNlbGxzIGluIHRoZWlyIHBsYWNlLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSBsYXN0IHBhc3RlZCBjZWxsIGJlY29tZXMgdGhlIGFjdGl2ZSBjZWxsLlxuICAgICAqIFRoaXMgaXMgYSBuby1vcCBpZiB0aGVyZSBpcyBubyBjZWxsIGRhdGEgb24gdGhlIGNsaXBib2FyZC5cbiAgICAgKiBUaGlzIGFjdGlvbiBjYW4gYmUgdW5kb25lLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHBhc3RlKG5vdGVib29rLCBtb2RlID0gJ2JlbG93Jykge1xuICAgICAgICBpZiAoIVByaXZhdGUuaXNOb3RlYm9va1JlbmRlcmVkKG5vdGVib29rKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNsaXBib2FyZCA9IENsaXBib2FyZC5nZXRJbnN0YW5jZSgpO1xuICAgICAgICBpZiAoIWNsaXBib2FyZC5oYXNEYXRhKEpVUFlURVJfQ0VMTF9NSU1FKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IGNsaXBib2FyZC5nZXREYXRhKEpVUFlURVJfQ0VMTF9NSU1FKTtcbiAgICAgICAgYWRkQ2VsbHMobm90ZWJvb2ssIG1vZGUsIHZhbHVlcywgdHJ1ZSk7XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy5wYXN0ZSA9IHBhc3RlO1xuICAgIC8qKlxuICAgICAqIER1cGxpY2F0ZSBzZWxlY3RlZCBjZWxscyBpbiB0aGUgbm90ZWJvb2sgd2l0aG91dCB1c2luZyB0aGUgYXBwbGljYXRpb24gY2xpcGJvYXJkLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbW9kZSAtIHRoZSBtb2RlIG9mIGFkZGluZyBjZWxsczpcbiAgICAgKiAgICdiZWxvdycgKGRlZmF1bHQpIGFkZHMgY2VsbHMgYmVsb3cgdGhlIGFjdGl2ZSBjZWxsLFxuICAgICAqICAgJ2JlbG93U2VsZWN0ZWQnIGFkZHMgY2VsbHMgYmVsb3cgYWxsIHNlbGVjdGVkIGNlbGxzLFxuICAgICAqICAgJ2Fib3ZlJyBhZGRzIGNlbGxzIGFib3ZlIHRoZSBhY3RpdmUgY2VsbCwgYW5kXG4gICAgICogICAncmVwbGFjZScgcmVtb3ZlcyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGNlbGxzIGFuZCBhZGRzIGNlbGxzIGluIHRoZWlyIHBsYWNlLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSBsYXN0IHBhc3RlZCBjZWxsIGJlY29tZXMgdGhlIGFjdGl2ZSBjZWxsLlxuICAgICAqIFRoaXMgaXMgYSBuby1vcCBpZiB0aGVyZSBpcyBubyBjZWxsIGRhdGEgb24gdGhlIGNsaXBib2FyZC5cbiAgICAgKiBUaGlzIGFjdGlvbiBjYW4gYmUgdW5kb25lLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGR1cGxpY2F0ZShub3RlYm9vaywgbW9kZSA9ICdiZWxvdycpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gUHJpdmF0ZS5zZWxlY3RlZENlbGxzKG5vdGVib29rKTtcbiAgICAgICAgaWYgKCF2YWx1ZXMgfHwgdmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGFkZENlbGxzKG5vdGVib29rLCBtb2RlLCB2YWx1ZXMsIGZhbHNlKTsgLy8gQ2VsbHMgbm90IGZyb20gdGhlIGNsaXBib2FyZFxuICAgIH1cbiAgICBOb3RlYm9va0FjdGlvbnMuZHVwbGljYXRlID0gZHVwbGljYXRlO1xuICAgIC8qKlxuICAgICAqIEFkZHMgY2VsbHMgdG8gdGhlIG5vdGVib29rLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbW9kZSAtIHRoZSBtb2RlIG9mIGFkZGluZyBjZWxsczpcbiAgICAgKiAgICdiZWxvdycgKGRlZmF1bHQpIGFkZHMgY2VsbHMgYmVsb3cgdGhlIGFjdGl2ZSBjZWxsLFxuICAgICAqICAgJ2JlbG93U2VsZWN0ZWQnIGFkZHMgY2VsbHMgYmVsb3cgYWxsIHNlbGVjdGVkIGNlbGxzLFxuICAgICAqICAgJ2Fib3ZlJyBhZGRzIGNlbGxzIGFib3ZlIHRoZSBhY3RpdmUgY2VsbCwgYW5kXG4gICAgICogICAncmVwbGFjZScgcmVtb3ZlcyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGNlbGxzIGFuZCBhZGRzIGNlbGxzIGluIHRoZWlyIHBsYWNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlcyDigJQgVGhlIGNlbGxzIHRvIGFkZCB0byB0aGUgbm90ZWJvb2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2VsbHNGcm9tQ2xpcGJvYXJkIOKAlCBUcnVlIGlmIHRoZSBjZWxscyB3ZXJlIHNvdXJjZWQgZnJvbSB0aGUgY2xpcGJvYXJkLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSBsYXN0IGFkZGVkIGNlbGwgYmVjb21lcyB0aGUgYWN0aXZlIGNlbGwuXG4gICAgICogVGhpcyBpcyBhIG5vLW9wIGlmIHZhbHVlcyBpcyBhbiBlbXB0eSBhcnJheS5cbiAgICAgKiBUaGlzIGFjdGlvbiBjYW4gYmUgdW5kb25lLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZENlbGxzKG5vdGVib29rLCBtb2RlID0gJ2JlbG93JywgdmFsdWVzLCBjZWxsc0Zyb21DbGlwYm9hcmQgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIW5vdGVib29rLm1vZGVsIHx8ICFub3RlYm9vay5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBQcml2YXRlLmdldFN0YXRlKG5vdGVib29rKTtcbiAgICAgICAgY29uc3QgbW9kZWwgPSBub3RlYm9vay5tb2RlbDtcbiAgICAgICAgbm90ZWJvb2subW9kZSA9ICdjb21tYW5kJztcbiAgICAgICAgY29uc3QgbmV3Q2VsbHMgPSB2YWx1ZXMubWFwKGNlbGwgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChjZWxsLmNlbGxfdHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvZGUnOlxuICAgICAgICAgICAgICAgICAgICBpZiAobm90ZWJvb2subGFzdENsaXBib2FyZEludGVyYWN0aW9uID09PSAnY3V0JyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGNlbGwuaWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbF9pZCA9IGNlbGwuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9kZWwuY29udGVudEZhY3RvcnkuY3JlYXRlQ29kZUNlbGwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjZWxsX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGw6IGNlbGxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vZGVsLmNvbnRlbnRGYWN0b3J5LmNyZWF0ZUNvZGVDZWxsKHsgY2VsbCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgJ21hcmtkb3duJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vZGVsLmNvbnRlbnRGYWN0b3J5LmNyZWF0ZU1hcmtkb3duQ2VsbCh7IGNlbGwgfSk7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vZGVsLmNvbnRlbnRGYWN0b3J5LmNyZWF0ZVJhd0NlbGwoeyBjZWxsIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgY2VsbHMgPSBub3RlYm9vay5tb2RlbC5jZWxscztcbiAgICAgICAgbGV0IGluZGV4O1xuICAgICAgICBjZWxscy5iZWdpbkNvbXBvdW5kT3BlcmF0aW9uKCk7XG4gICAgICAgIC8vIFNldCB0aGUgc3RhcnRpbmcgaW5kZXggb2YgdGhlIHBhc3RlIG9wZXJhdGlvbiBkZXBlbmRpbmcgdXBvbiB0aGUgbW9kZS5cbiAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdiZWxvdyc6XG4gICAgICAgICAgICAgICAgaW5kZXggPSBub3RlYm9vay5hY3RpdmVDZWxsSW5kZXg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdiZWxvd1NlbGVjdGVkJzpcbiAgICAgICAgICAgICAgICBub3RlYm9vay53aWRnZXRzLmZvckVhY2goKGNoaWxkLCBjaGlsZEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub3RlYm9vay5pc1NlbGVjdGVkT3JBY3RpdmUoY2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGNoaWxkSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Fib3ZlJzpcbiAgICAgICAgICAgICAgICBpbmRleCA9IG5vdGVib29rLmFjdGl2ZUNlbGxJbmRleCAtIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyZXBsYWNlJzoge1xuICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIGNlbGxzIHRvIGRlbGV0ZS5cbiAgICAgICAgICAgICAgICBjb25zdCB0b0RlbGV0ZSA9IFtdO1xuICAgICAgICAgICAgICAgIG5vdGVib29rLndpZGdldHMuZm9yRWFjaCgoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbGV0YWJsZSA9IGNoaWxkLm1vZGVsLm1ldGFkYXRhLmdldCgnZGVsZXRhYmxlJykgIT09IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm90ZWJvb2suaXNTZWxlY3RlZE9yQWN0aXZlKGNoaWxkKSAmJiBkZWxldGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvRGVsZXRlLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gSWYgY2VsbHMgYXJlIG5vdCBkZWxldGFibGUsIHdlIG1heSBub3QgaGF2ZSBhbnl0aGluZyB0byBkZWxldGUuXG4gICAgICAgICAgICAgICAgaWYgKHRvRGVsZXRlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSBjZWxscyBhcyBvbmUgdW5kbyBldmVudC5cbiAgICAgICAgICAgICAgICAgICAgdG9EZWxldGUucmV2ZXJzZSgpLmZvckVhY2goaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxscy5yZW1vdmUoaSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbmRleCA9IHRvRGVsZXRlWzBdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBuZXdDZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgY2VsbHMuaW5zZXJ0KCsraW5kZXgsIGNlbGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2VsbHMuZW5kQ29tcG91bmRPcGVyYXRpb24oKTtcbiAgICAgICAgbm90ZWJvb2suYWN0aXZlQ2VsbEluZGV4ICs9IG5ld0NlbGxzLmxlbmd0aDtcbiAgICAgICAgbm90ZWJvb2suZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgaWYgKGNlbGxzRnJvbUNsaXBib2FyZCkge1xuICAgICAgICAgICAgbm90ZWJvb2subGFzdENsaXBib2FyZEludGVyYWN0aW9uID0gJ3Bhc3RlJztcbiAgICAgICAgfVxuICAgICAgICBQcml2YXRlLmhhbmRsZVN0YXRlKG5vdGVib29rLCBzdGF0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVuZG8gYSBjZWxsIGFjdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub3RlYm9vayAtIFRoZSB0YXJnZXQgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgaXMgYSBuby1vcCBpZiBpZiB0aGVyZSBhcmUgbm8gY2VsbCBhY3Rpb25zIHRvIHVuZG8uXG4gICAgICovXG4gICAgZnVuY3Rpb24gdW5kbyhub3RlYm9vaykge1xuICAgICAgICBpZiAoIW5vdGVib29rLm1vZGVsIHx8ICFub3RlYm9vay5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFQcml2YXRlLmlzTm90ZWJvb2tSZW5kZXJlZChub3RlYm9vaykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGF0ZSA9IFByaXZhdGUuZ2V0U3RhdGUobm90ZWJvb2spO1xuICAgICAgICBub3RlYm9vay5tb2RlID0gJ2NvbW1hbmQnO1xuICAgICAgICBub3RlYm9vay5tb2RlbC5zaGFyZWRNb2RlbC51bmRvKCk7XG4gICAgICAgIG5vdGVib29rLmRlc2VsZWN0QWxsKCk7XG4gICAgICAgIFByaXZhdGUuaGFuZGxlU3RhdGUobm90ZWJvb2ssIHN0YXRlKTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLnVuZG8gPSB1bmRvO1xuICAgIC8qKlxuICAgICAqIFJlZG8gYSBjZWxsIGFjdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub3RlYm9vayAtIFRoZSB0YXJnZXQgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgaXMgYSBuby1vcCBpZiB0aGVyZSBhcmUgbm8gY2VsbCBhY3Rpb25zIHRvIHJlZG8uXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVkbyhub3RlYm9vaykge1xuICAgICAgICBpZiAoIW5vdGVib29rLm1vZGVsIHx8ICFub3RlYm9vay5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBQcml2YXRlLmdldFN0YXRlKG5vdGVib29rKTtcbiAgICAgICAgbm90ZWJvb2subW9kZSA9ICdjb21tYW5kJztcbiAgICAgICAgbm90ZWJvb2subW9kZWwuc2hhcmVkTW9kZWwucmVkbygpO1xuICAgICAgICBub3RlYm9vay5kZXNlbGVjdEFsbCgpO1xuICAgICAgICBQcml2YXRlLmhhbmRsZVN0YXRlKG5vdGVib29rLCBzdGF0ZSk7XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy5yZWRvID0gcmVkbztcbiAgICAvKipcbiAgICAgKiBUb2dnbGUgdGhlIGxpbmUgbnVtYmVyIG9mIGFsbCBjZWxscy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub3RlYm9vayAtIFRoZSB0YXJnZXQgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSBvcmlnaW5hbCBzdGF0ZSBpcyBiYXNlZCBvbiB0aGUgc3RhdGUgb2YgdGhlIGFjdGl2ZSBjZWxsLlxuICAgICAqIFRoZSBgbW9kZWAgb2YgdGhlIHdpZGdldCB3aWxsIGJlIHByZXNlcnZlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0b2dnbGVBbGxMaW5lTnVtYmVycyhub3RlYm9vaykge1xuICAgICAgICBpZiAoIW5vdGVib29rLm1vZGVsIHx8ICFub3RlYm9vay5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBQcml2YXRlLmdldFN0YXRlKG5vdGVib29rKTtcbiAgICAgICAgY29uc3QgY29uZmlnID0gbm90ZWJvb2suZWRpdG9yQ29uZmlnO1xuICAgICAgICBjb25zdCBsaW5lTnVtYmVycyA9ICEoY29uZmlnLmNvZGUubGluZU51bWJlcnMgJiZcbiAgICAgICAgICAgIGNvbmZpZy5tYXJrZG93bi5saW5lTnVtYmVycyAmJlxuICAgICAgICAgICAgY29uZmlnLnJhdy5saW5lTnVtYmVycyk7XG4gICAgICAgIGNvbnN0IG5ld0NvbmZpZyA9IHtcbiAgICAgICAgICAgIGNvZGU6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnLmNvZGUpLCB7IGxpbmVOdW1iZXJzIH0pLFxuICAgICAgICAgICAgbWFya2Rvd246IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnLm1hcmtkb3duKSwgeyBsaW5lTnVtYmVycyB9KSxcbiAgICAgICAgICAgIHJhdzogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjb25maWcucmF3KSwgeyBsaW5lTnVtYmVycyB9KVxuICAgICAgICB9O1xuICAgICAgICBub3RlYm9vay5lZGl0b3JDb25maWcgPSBuZXdDb25maWc7XG4gICAgICAgIFByaXZhdGUuaGFuZGxlU3RhdGUobm90ZWJvb2ssIHN0YXRlKTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLnRvZ2dsZUFsbExpbmVOdW1iZXJzID0gdG9nZ2xlQWxsTGluZU51bWJlcnM7XG4gICAgLyoqXG4gICAgICogQ2xlYXIgdGhlIGNvZGUgb3V0cHV0cyBvZiB0aGUgc2VsZWN0ZWQgY2VsbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm90ZWJvb2sgLSBUaGUgdGFyZ2V0IG5vdGVib29rIHdpZGdldC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgd2lkZ2V0IGBtb2RlYCB3aWxsIGJlIHByZXNlcnZlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjbGVhck91dHB1dHMobm90ZWJvb2spIHtcbiAgICAgICAgaWYgKCFub3RlYm9vay5tb2RlbCB8fCAhbm90ZWJvb2suYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXRlID0gUHJpdmF0ZS5nZXRTdGF0ZShub3RlYm9vayk7XG4gICAgICAgIGVhY2gobm90ZWJvb2subW9kZWwuY2VsbHMsIChjZWxsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBub3RlYm9vay53aWRnZXRzW2luZGV4XTtcbiAgICAgICAgICAgIGlmIChub3RlYm9vay5pc1NlbGVjdGVkT3JBY3RpdmUoY2hpbGQpICYmIGNlbGwudHlwZSA9PT0gJ2NvZGUnKSB7XG4gICAgICAgICAgICAgICAgY2VsbC5jbGVhckV4ZWN1dGlvbigpO1xuICAgICAgICAgICAgICAgIGNoaWxkLm91dHB1dEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgUHJpdmF0ZS5oYW5kbGVTdGF0ZShub3RlYm9vaywgc3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBOb3RlYm9va0FjdGlvbnMuY2xlYXJPdXRwdXRzID0gY2xlYXJPdXRwdXRzO1xuICAgIC8qKlxuICAgICAqIENsZWFyIGFsbCB0aGUgY29kZSBvdXRwdXRzIG9uIHRoZSB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm90ZWJvb2sgLSBUaGUgdGFyZ2V0IG5vdGVib29rIHdpZGdldC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgd2lkZ2V0IGBtb2RlYCB3aWxsIGJlIHByZXNlcnZlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjbGVhckFsbE91dHB1dHMobm90ZWJvb2spIHtcbiAgICAgICAgaWYgKCFub3RlYm9vay5tb2RlbCB8fCAhbm90ZWJvb2suYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXRlID0gUHJpdmF0ZS5nZXRTdGF0ZShub3RlYm9vayk7XG4gICAgICAgIGVhY2gobm90ZWJvb2subW9kZWwuY2VsbHMsIChjZWxsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBub3RlYm9vay53aWRnZXRzW2luZGV4XTtcbiAgICAgICAgICAgIGlmIChjZWxsLnR5cGUgPT09ICdjb2RlJykge1xuICAgICAgICAgICAgICAgIGNlbGwuY2xlYXJFeGVjdXRpb24oKTtcbiAgICAgICAgICAgICAgICBjaGlsZC5vdXRwdXRIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFByaXZhdGUuaGFuZGxlU3RhdGUobm90ZWJvb2ssIHN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLmNsZWFyQWxsT3V0cHV0cyA9IGNsZWFyQWxsT3V0cHV0cztcbiAgICAvKipcbiAgICAgKiBIaWRlIHRoZSBjb2RlIG9uIHNlbGVjdGVkIGNvZGUgY2VsbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm90ZWJvb2sgLSBUaGUgdGFyZ2V0IG5vdGVib29rIHdpZGdldC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoaWRlQ29kZShub3RlYm9vaykge1xuICAgICAgICBpZiAoIW5vdGVib29rLm1vZGVsIHx8ICFub3RlYm9vay5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBQcml2YXRlLmdldFN0YXRlKG5vdGVib29rKTtcbiAgICAgICAgbm90ZWJvb2sud2lkZ2V0cy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgaWYgKG5vdGVib29rLmlzU2VsZWN0ZWRPckFjdGl2ZShjZWxsKSAmJiBjZWxsLm1vZGVsLnR5cGUgPT09ICdjb2RlJykge1xuICAgICAgICAgICAgICAgIGNlbGwuaW5wdXRIaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgUHJpdmF0ZS5oYW5kbGVTdGF0ZShub3RlYm9vaywgc3RhdGUpO1xuICAgIH1cbiAgICBOb3RlYm9va0FjdGlvbnMuaGlkZUNvZGUgPSBoaWRlQ29kZTtcbiAgICAvKipcbiAgICAgKiBTaG93IHRoZSBjb2RlIG9uIHNlbGVjdGVkIGNvZGUgY2VsbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm90ZWJvb2sgLSBUaGUgdGFyZ2V0IG5vdGVib29rIHdpZGdldC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzaG93Q29kZShub3RlYm9vaykge1xuICAgICAgICBpZiAoIW5vdGVib29rLm1vZGVsIHx8ICFub3RlYm9vay5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBQcml2YXRlLmdldFN0YXRlKG5vdGVib29rKTtcbiAgICAgICAgbm90ZWJvb2sud2lkZ2V0cy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgaWYgKG5vdGVib29rLmlzU2VsZWN0ZWRPckFjdGl2ZShjZWxsKSAmJiBjZWxsLm1vZGVsLnR5cGUgPT09ICdjb2RlJykge1xuICAgICAgICAgICAgICAgIGNlbGwuaW5wdXRIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFByaXZhdGUuaGFuZGxlU3RhdGUobm90ZWJvb2ssIHN0YXRlKTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLnNob3dDb2RlID0gc2hvd0NvZGU7XG4gICAgLyoqXG4gICAgICogSGlkZSB0aGUgY29kZSBvbiBhbGwgY29kZSBjZWxscy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub3RlYm9vayAtIFRoZSB0YXJnZXQgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhpZGVBbGxDb2RlKG5vdGVib29rKSB7XG4gICAgICAgIGlmICghbm90ZWJvb2subW9kZWwgfHwgIW5vdGVib29rLmFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGF0ZSA9IFByaXZhdGUuZ2V0U3RhdGUobm90ZWJvb2spO1xuICAgICAgICBub3RlYm9vay53aWRnZXRzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICBpZiAoY2VsbC5tb2RlbC50eXBlID09PSAnY29kZScpIHtcbiAgICAgICAgICAgICAgICBjZWxsLmlucHV0SGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFByaXZhdGUuaGFuZGxlU3RhdGUobm90ZWJvb2ssIHN0YXRlKTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLmhpZGVBbGxDb2RlID0gaGlkZUFsbENvZGU7XG4gICAgLyoqXG4gICAgICogU2hvdyB0aGUgY29kZSBvbiBhbGwgY29kZSBjZWxscy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWRnZXQgLSBUaGUgdGFyZ2V0IG5vdGVib29rIHdpZGdldC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzaG93QWxsQ29kZShub3RlYm9vaykge1xuICAgICAgICBpZiAoIW5vdGVib29rLm1vZGVsIHx8ICFub3RlYm9vay5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBQcml2YXRlLmdldFN0YXRlKG5vdGVib29rKTtcbiAgICAgICAgbm90ZWJvb2sud2lkZ2V0cy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgaWYgKGNlbGwubW9kZWwudHlwZSA9PT0gJ2NvZGUnKSB7XG4gICAgICAgICAgICAgICAgY2VsbC5pbnB1dEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgUHJpdmF0ZS5oYW5kbGVTdGF0ZShub3RlYm9vaywgc3RhdGUpO1xuICAgIH1cbiAgICBOb3RlYm9va0FjdGlvbnMuc2hvd0FsbENvZGUgPSBzaG93QWxsQ29kZTtcbiAgICAvKipcbiAgICAgKiBIaWRlIHRoZSBvdXRwdXQgb24gc2VsZWN0ZWQgY29kZSBjZWxscy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub3RlYm9vayAtIFRoZSB0YXJnZXQgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhpZGVPdXRwdXQobm90ZWJvb2spIHtcbiAgICAgICAgaWYgKCFub3RlYm9vay5tb2RlbCB8fCAhbm90ZWJvb2suYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXRlID0gUHJpdmF0ZS5nZXRTdGF0ZShub3RlYm9vayk7XG4gICAgICAgIG5vdGVib29rLndpZGdldHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgIGlmIChub3RlYm9vay5pc1NlbGVjdGVkT3JBY3RpdmUoY2VsbCkgJiYgY2VsbC5tb2RlbC50eXBlID09PSAnY29kZScpIHtcbiAgICAgICAgICAgICAgICBjZWxsLm91dHB1dEhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBQcml2YXRlLmhhbmRsZVN0YXRlKG5vdGVib29rLCBzdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy5oaWRlT3V0cHV0ID0gaGlkZU91dHB1dDtcbiAgICAvKipcbiAgICAgKiBTaG93IHRoZSBvdXRwdXQgb24gc2VsZWN0ZWQgY29kZSBjZWxscy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub3RlYm9vayAtIFRoZSB0YXJnZXQgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNob3dPdXRwdXQobm90ZWJvb2spIHtcbiAgICAgICAgaWYgKCFub3RlYm9vay5tb2RlbCB8fCAhbm90ZWJvb2suYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXRlID0gUHJpdmF0ZS5nZXRTdGF0ZShub3RlYm9vayk7XG4gICAgICAgIG5vdGVib29rLndpZGdldHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgIGlmIChub3RlYm9vay5pc1NlbGVjdGVkT3JBY3RpdmUoY2VsbCkgJiYgY2VsbC5tb2RlbC50eXBlID09PSAnY29kZScpIHtcbiAgICAgICAgICAgICAgICBjZWxsLm91dHB1dEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgUHJpdmF0ZS5oYW5kbGVTdGF0ZShub3RlYm9vaywgc3RhdGUpO1xuICAgIH1cbiAgICBOb3RlYm9va0FjdGlvbnMuc2hvd091dHB1dCA9IHNob3dPdXRwdXQ7XG4gICAgLyoqXG4gICAgICogSGlkZSB0aGUgb3V0cHV0IG9uIGFsbCBjb2RlIGNlbGxzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGlkZUFsbE91dHB1dHMobm90ZWJvb2spIHtcbiAgICAgICAgaWYgKCFub3RlYm9vay5tb2RlbCB8fCAhbm90ZWJvb2suYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXRlID0gUHJpdmF0ZS5nZXRTdGF0ZShub3RlYm9vayk7XG4gICAgICAgIG5vdGVib29rLndpZGdldHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgIGlmIChjZWxsLm1vZGVsLnR5cGUgPT09ICdjb2RlJykge1xuICAgICAgICAgICAgICAgIGNlbGwub3V0cHV0SGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFByaXZhdGUuaGFuZGxlU3RhdGUobm90ZWJvb2ssIHN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLmhpZGVBbGxPdXRwdXRzID0gaGlkZUFsbE91dHB1dHM7XG4gICAgLyoqXG4gICAgICogUmVuZGVyIHNpZGUtYnktc2lkZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub3RlYm9vayAtIFRoZSB0YXJnZXQgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlbmRlclNpZGVCeVNpZGUobm90ZWJvb2spIHtcbiAgICAgICAgbm90ZWJvb2sucmVuZGVyaW5nTGF5b3V0ID0gJ3NpZGUtYnktc2lkZSc7XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy5yZW5kZXJTaWRlQnlTaWRlID0gcmVuZGVyU2lkZUJ5U2lkZTtcbiAgICAvKipcbiAgICAgKiBSZW5kZXIgbm90IHNpZGUtYnktc2lkZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub3RlYm9vayAtIFRoZSB0YXJnZXQgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlbmRlckRlZmF1bHQobm90ZWJvb2spIHtcbiAgICAgICAgbm90ZWJvb2sucmVuZGVyaW5nTGF5b3V0ID0gJ2RlZmF1bHQnO1xuICAgIH1cbiAgICBOb3RlYm9va0FjdGlvbnMucmVuZGVyRGVmYXVsdCA9IHJlbmRlckRlZmF1bHQ7XG4gICAgLyoqXG4gICAgICogU2hvdyB0aGUgb3V0cHV0IG9uIGFsbCBjb2RlIGNlbGxzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2hvd0FsbE91dHB1dHMobm90ZWJvb2spIHtcbiAgICAgICAgaWYgKCFub3RlYm9vay5tb2RlbCB8fCAhbm90ZWJvb2suYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXRlID0gUHJpdmF0ZS5nZXRTdGF0ZShub3RlYm9vayk7XG4gICAgICAgIG5vdGVib29rLndpZGdldHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgIGlmIChjZWxsLm1vZGVsLnR5cGUgPT09ICdjb2RlJykge1xuICAgICAgICAgICAgICAgIGNlbGwub3V0cHV0SGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBQcml2YXRlLmhhbmRsZVN0YXRlKG5vdGVib29rLCBzdGF0ZSk7XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy5zaG93QWxsT3V0cHV0cyA9IHNob3dBbGxPdXRwdXRzO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSBvdXRwdXQgc2Nyb2xsaW5nIGZvciBhbGwgc2VsZWN0ZWQgY2VsbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm90ZWJvb2sgLSBUaGUgdGFyZ2V0IG5vdGVib29rIHdpZGdldC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlbmFibGVPdXRwdXRTY3JvbGxpbmcobm90ZWJvb2spIHtcbiAgICAgICAgaWYgKCFub3RlYm9vay5tb2RlbCB8fCAhbm90ZWJvb2suYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXRlID0gUHJpdmF0ZS5nZXRTdGF0ZShub3RlYm9vayk7XG4gICAgICAgIG5vdGVib29rLndpZGdldHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgIGlmIChub3RlYm9vay5pc1NlbGVjdGVkT3JBY3RpdmUoY2VsbCkgJiYgY2VsbC5tb2RlbC50eXBlID09PSAnY29kZScpIHtcbiAgICAgICAgICAgICAgICBjZWxsLm91dHB1dHNTY3JvbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBQcml2YXRlLmhhbmRsZVN0YXRlKG5vdGVib29rLCBzdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy5lbmFibGVPdXRwdXRTY3JvbGxpbmcgPSBlbmFibGVPdXRwdXRTY3JvbGxpbmc7XG4gICAgLyoqXG4gICAgICogRGlzYWJsZSBvdXRwdXQgc2Nyb2xsaW5nIGZvciBhbGwgc2VsZWN0ZWQgY2VsbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm90ZWJvb2sgLSBUaGUgdGFyZ2V0IG5vdGVib29rIHdpZGdldC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkaXNhYmxlT3V0cHV0U2Nyb2xsaW5nKG5vdGVib29rKSB7XG4gICAgICAgIGlmICghbm90ZWJvb2subW9kZWwgfHwgIW5vdGVib29rLmFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGF0ZSA9IFByaXZhdGUuZ2V0U3RhdGUobm90ZWJvb2spO1xuICAgICAgICBub3RlYm9vay53aWRnZXRzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICBpZiAobm90ZWJvb2suaXNTZWxlY3RlZE9yQWN0aXZlKGNlbGwpICYmIGNlbGwubW9kZWwudHlwZSA9PT0gJ2NvZGUnKSB7XG4gICAgICAgICAgICAgICAgY2VsbC5vdXRwdXRzU2Nyb2xsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFByaXZhdGUuaGFuZGxlU3RhdGUobm90ZWJvb2ssIHN0YXRlKTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLmRpc2FibGVPdXRwdXRTY3JvbGxpbmcgPSBkaXNhYmxlT3V0cHV0U2Nyb2xsaW5nO1xuICAgIC8qKlxuICAgICAqIEdvIHRvIHRoZSBsYXN0IGNlbGwgdGhhdCBpcyBydW4gb3IgY3VycmVudCBpZiBpdCBpcyBydW5uaW5nLlxuICAgICAqXG4gICAgICogTm90ZTogVGhpcyByZXF1aXJlcyBleGVjdXRpb24gdGltaW5nIHRvIGJlIHRvZ2dsZWQgb24gb3IgdGhpcyB3aWxsIGhhdmVcbiAgICAgKiBubyBlZmZlY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm90ZWJvb2sgLSBUaGUgdGFyZ2V0IG5vdGVib29rIHdpZGdldC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZWxlY3RMYXN0UnVuQ2VsbChub3RlYm9vaykge1xuICAgICAgICBsZXQgbGF0ZXN0VGltZSA9IG51bGw7XG4gICAgICAgIGxldCBsYXRlc3RDZWxsSWR4ID0gbnVsbDtcbiAgICAgICAgbm90ZWJvb2sud2lkZ2V0cy5mb3JFYWNoKChjZWxsLCBjZWxsSW5keCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNlbGwubW9kZWwudHlwZSA9PT0gJ2NvZGUnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXhlY3V0aW9uID0gY2VsbC5tb2RlbC5tZXRhZGF0YS5nZXQoJ2V4ZWN1dGlvbicpO1xuICAgICAgICAgICAgICAgIGlmIChleGVjdXRpb24gJiZcbiAgICAgICAgICAgICAgICAgICAgSlNPTkV4dC5pc09iamVjdChleGVjdXRpb24pICYmXG4gICAgICAgICAgICAgICAgICAgIGV4ZWN1dGlvblsnaW9wdWIuc3RhdHVzLmJ1c3knXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBidXN5IHN0YXR1cyBpcyB1c2VkIGFzIHNvb24gYXMgYSByZXF1ZXN0IGlzIHJlY2VpdmVkOlxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL2p1cHl0ZXItY2xpZW50LnJlYWR0aGVkb2NzLmlvL2VuL3N0YWJsZS9tZXNzYWdpbmcuaHRtbFxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBleGVjdXRpb25bJ2lvcHViLnN0YXR1cy5idXN5J10udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUodGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGF0ZXN0VGltZSB8fCBzdGFydFRpbWUgPj0gbGF0ZXN0VGltZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdGVzdFRpbWUgPSBzdGFydFRpbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF0ZXN0Q2VsbElkeCA9IGNlbGxJbmR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGxhdGVzdENlbGxJZHggIT09IG51bGwpIHtcbiAgICAgICAgICAgIG5vdGVib29rLmFjdGl2ZUNlbGxJbmRleCA9IGxhdGVzdENlbGxJZHg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLnNlbGVjdExhc3RSdW5DZWxsID0gc2VsZWN0TGFzdFJ1bkNlbGw7XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBtYXJrZG93biBoZWFkZXIgbGV2ZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm90ZWJvb2sgLSBUaGUgdGFyZ2V0IG5vdGVib29rIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsZXZlbCAtIFRoZSBoZWFkZXIgbGV2ZWwuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogQWxsIHNlbGVjdGVkIGNlbGxzIHdpbGwgYmUgc3dpdGNoZWQgdG8gbWFya2Rvd24uXG4gICAgICogVGhlIGxldmVsIHdpbGwgYmUgY2xhbXBlZCBiZXR3ZWVuIDEgYW5kIDYuXG4gICAgICogSWYgdGhlcmUgaXMgYW4gZXhpc3RpbmcgaGVhZGVyLCBpdCB3aWxsIGJlIHJlcGxhY2VkLlxuICAgICAqIFRoZXJlIHdpbGwgYWx3YXlzIGJlIG9uZSBibGFuayBzcGFjZSBhZnRlciB0aGUgaGVhZGVyLlxuICAgICAqIFRoZSBjZWxscyB3aWxsIGJlIHVucmVuZGVyZWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0TWFya2Rvd25IZWFkZXIobm90ZWJvb2ssIGxldmVsKSB7XG4gICAgICAgIGlmICghbm90ZWJvb2subW9kZWwgfHwgIW5vdGVib29rLmFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGF0ZSA9IFByaXZhdGUuZ2V0U3RhdGUobm90ZWJvb2spO1xuICAgICAgICBjb25zdCBjZWxscyA9IG5vdGVib29rLm1vZGVsLmNlbGxzO1xuICAgICAgICBsZXZlbCA9IE1hdGgubWluKE1hdGgubWF4KGxldmVsLCAxKSwgNik7XG4gICAgICAgIG5vdGVib29rLndpZGdldHMuZm9yRWFjaCgoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAobm90ZWJvb2suaXNTZWxlY3RlZE9yQWN0aXZlKGNoaWxkKSkge1xuICAgICAgICAgICAgICAgIFByaXZhdGUuc2V0TWFya2Rvd25IZWFkZXIoY2VsbHMuZ2V0KGluZGV4KSwgbGV2ZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgUHJpdmF0ZS5jaGFuZ2VDZWxsVHlwZShub3RlYm9vaywgJ21hcmtkb3duJyk7XG4gICAgICAgIFByaXZhdGUuaGFuZGxlU3RhdGUobm90ZWJvb2ssIHN0YXRlKTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLnNldE1hcmtkb3duSGVhZGVyID0gc2V0TWFya2Rvd25IZWFkZXI7XG4gICAgLyoqXG4gICAgICogQ29sbGFwc2UgYWxsIGNlbGxzIGluIGdpdmVuIG5vdGVib29rLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29sbGFwc2VBbGwobm90ZWJvb2spIHtcbiAgICAgICAgZm9yIChjb25zdCBjZWxsIG9mIG5vdGVib29rLndpZGdldHMpIHtcbiAgICAgICAgICAgIGlmIChOb3RlYm9va0FjdGlvbnMuZ2V0SGVhZGluZ0luZm8oY2VsbCkuaXNIZWFkaW5nKSB7XG4gICAgICAgICAgICAgICAgTm90ZWJvb2tBY3Rpb25zLnNldEhlYWRpbmdDb2xsYXBzZShjZWxsLCB0cnVlLCBub3RlYm9vayk7XG4gICAgICAgICAgICAgICAgTm90ZWJvb2tBY3Rpb25zLnNldENlbGxDb2xsYXBzZShjZWxsLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBOb3RlYm9va0FjdGlvbnMuY29sbGFwc2VBbGwgPSBjb2xsYXBzZUFsbDtcbiAgICAvKipcbiAgICAgKiBVbi1jb2xsYXBzZSBhbGwgY2VsbHMgaW4gZ2l2ZW4gbm90ZWJvb2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm90ZWJvb2sgLSBUaGUgdGFyZ2V0IG5vdGVib29rIHdpZGdldC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBleHBhbmRBbGxIZWFkaW5ncyhub3RlYm9vaykge1xuICAgICAgICBmb3IgKGNvbnN0IGNlbGwgb2Ygbm90ZWJvb2sud2lkZ2V0cykge1xuICAgICAgICAgICAgaWYgKE5vdGVib29rQWN0aW9ucy5nZXRIZWFkaW5nSW5mbyhjZWxsKS5pc0hlYWRpbmcpIHtcbiAgICAgICAgICAgICAgICBOb3RlYm9va0FjdGlvbnMuc2V0SGVhZGluZ0NvbGxhcHNlKGNlbGwsIGZhbHNlLCBub3RlYm9vayk7XG4gICAgICAgICAgICAgICAgLy8gc2ltaWxhciB0byBjb2xsYXBzZUFsbC5cbiAgICAgICAgICAgICAgICBOb3RlYm9va0FjdGlvbnMuc2V0Q2VsbENvbGxhcHNlKGNlbGwsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBOb3RlYm9va0FjdGlvbnMuZXhwYW5kQWxsSGVhZGluZ3MgPSBleHBhbmRBbGxIZWFkaW5ncztcbiAgICBmdW5jdGlvbiBmaW5kTmVhcmVzdFBhcmVudEhlYWRlcihjZWxsLCBub3RlYm9vaykge1xuICAgICAgICBjb25zdCBpbmRleCA9IGZpbmRJbmRleChub3RlYm9vay53aWRnZXRzLCAocG9zc2libGVDZWxsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGwubW9kZWwuaWQgPT09IHBvc3NpYmxlQ2VsbC5tb2RlbC5pZDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBGaW5kcyB0aGUgbmVhcmVzdCBoZWFkZXIgYWJvdmUgdGhlIGdpdmVuIGNlbGwuIElmIHRoZSBjZWxsIGlzIGEgaGVhZGVyIGl0c2VsZiwgaXQgZG9lcyBub3QgcmV0dXJuIGl0c2VsZjtcbiAgICAgICAgLy8gdGhpcyBjYW4gYmUgY2hlY2tlZCBkaXJlY3RseSBieSBjYWxsaW5nIGZ1bmN0aW9ucy5cbiAgICAgICAgaWYgKGluZGV4ID49IG5vdGVib29rLndpZGdldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNoaWxkSGVhZGVySW5mbyA9IGdldEhlYWRpbmdJbmZvKG5vdGVib29rLndpZGdldHNbaW5kZXhdKTtcbiAgICAgICAgZm9yIChsZXQgY2VsbE4gPSBpbmRleCAtIDE7IGNlbGxOID49IDA7IGNlbGxOLS0pIHtcbiAgICAgICAgICAgIGlmIChjZWxsTiA8IG5vdGVib29rLndpZGdldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGhJbmZvID0gZ2V0SGVhZGluZ0luZm8obm90ZWJvb2sud2lkZ2V0c1tjZWxsTl0pO1xuICAgICAgICAgICAgICAgIGlmIChoSW5mby5pc0hlYWRpbmcgJiZcbiAgICAgICAgICAgICAgICAgICAgaEluZm8uaGVhZGluZ0xldmVsIDwgY2hpbGRIZWFkZXJJbmZvLmhlYWRpbmdMZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm90ZWJvb2sud2lkZ2V0c1tjZWxsTl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGVsc2Ugbm8gcGFyZW50IGhlYWRlciBmb3VuZC5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgXCJwYXJlbnRcIiBoZWFkaW5nIG9mIHRoZSBnaXZlbiBjZWxsIGFuZCBleHBhbmRzLlxuICAgICAqIFVzZWQgZm9yIHRoZSBjYXNlIHRoYXQgYSBjZWxsIGJlY29tZXMgYWN0aXZlIHRoYXQgaXMgd2l0aGluIGEgY29sbGFwc2VkIGhlYWRpbmcuXG4gICAgICogQHBhcmFtIGNlbGwgLSBcIkNoaWxkXCIgY2VsbCB0aGF0IGhhcyBiZWNvbWUgdGhlIGFjdGl2ZSBjZWxsXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZXhwYW5kUGFyZW50KGNlbGwsIG5vdGVib29rKSB7XG4gICAgICAgIGxldCBuZWFyZXN0UGFyZW50Q2VsbCA9IGZpbmROZWFyZXN0UGFyZW50SGVhZGVyKGNlbGwsIG5vdGVib29rKTtcbiAgICAgICAgaWYgKCFuZWFyZXN0UGFyZW50Q2VsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZ2V0SGVhZGluZ0luZm8obmVhcmVzdFBhcmVudENlbGwpLmNvbGxhcHNlZCAmJlxuICAgICAgICAgICAgIW5lYXJlc3RQYXJlbnRDZWxsLmlzSGlkZGVuKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5lYXJlc3RQYXJlbnRDZWxsLmlzSGlkZGVuKSB7XG4gICAgICAgICAgICBleHBhbmRQYXJlbnQobmVhcmVzdFBhcmVudENlbGwsIG5vdGVib29rKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2V0SGVhZGluZ0luZm8obmVhcmVzdFBhcmVudENlbGwpLmNvbGxhcHNlZCkge1xuICAgICAgICAgICAgc2V0SGVhZGluZ0NvbGxhcHNlKG5lYXJlc3RQYXJlbnRDZWxsLCBmYWxzZSwgbm90ZWJvb2spO1xuICAgICAgICB9XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy5leHBhbmRQYXJlbnQgPSBleHBhbmRQYXJlbnQ7XG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIG5leHQgaGVhZGluZyB0aGF0IGlzbid0IGEgY2hpbGQgb2YgdGhlIGdpdmVuIG1hcmtkb3duIGhlYWRpbmcuXG4gICAgICogQHBhcmFtIGNlbGwgLSBcIkNoaWxkXCIgY2VsbCB0aGF0IGhhcyBiZWNvbWUgdGhlIGFjdGl2ZSBjZWxsXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZE5leHRQYXJlbnRIZWFkaW5nKGNlbGwsIG5vdGVib29rKSB7XG4gICAgICAgIGxldCBpbmRleCA9IGZpbmRJbmRleChub3RlYm9vay53aWRnZXRzLCAocG9zc2libGVDZWxsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGwubW9kZWwuaWQgPT09IHBvc3NpYmxlQ2VsbC5tb2RlbC5pZDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2hpbGRIZWFkZXJJbmZvID0gZ2V0SGVhZGluZ0luZm8oY2VsbCk7XG4gICAgICAgIGZvciAoaW5kZXggPSBpbmRleCArIDE7IGluZGV4IDwgbm90ZWJvb2sud2lkZ2V0cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCBoSW5mbyA9IGdldEhlYWRpbmdJbmZvKG5vdGVib29rLndpZGdldHNbaW5kZXhdKTtcbiAgICAgICAgICAgIGlmIChoSW5mby5pc0hlYWRpbmcgJiZcbiAgICAgICAgICAgICAgICBoSW5mby5oZWFkaW5nTGV2ZWwgPD0gY2hpbGRIZWFkZXJJbmZvLmhlYWRpbmdMZXZlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBlbHNlIG5vIHBhcmVudCBoZWFkZXIgZm91bmQuIHJldHVybiB0aGUgaW5kZXggb2YgdGhlIGxhc3QgY2VsbFxuICAgICAgICByZXR1cm4gbm90ZWJvb2sud2lkZ2V0cy5sZW5ndGg7XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy5maW5kTmV4dFBhcmVudEhlYWRpbmcgPSBmaW5kTmV4dFBhcmVudEhlYWRpbmc7XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBnaXZlbiBjZWxsIGFuZCAqKiBhbGwgXCJjaGlsZFwiIGNlbGxzICoqXG4gICAgICogdG8gdGhlIGdpdmVuIGNvbGxhcHNlIC8gZXhwYW5kIGlmIGNlbGwgaXNcbiAgICAgKiBhIG1hcmtkb3duIGhlYWRlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjZWxsIC0gVGhlIGNlbGxcbiAgICAgKiBAcGFyYW0gY29sbGFwc2luZyAtIFdoZXRoZXIgdG8gY29sbGFwc2Ugb3IgZXhwYW5kIHRoZSBjZWxsXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0SGVhZGluZ0NvbGxhcHNlKGNlbGwsIGNvbGxhcHNpbmcsIG5vdGVib29rKSB7XG4gICAgICAgIGNvbnN0IHdoaWNoID0gZmluZEluZGV4KG5vdGVib29rLndpZGdldHMsIChwb3NzaWJsZUNlbGwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5tb2RlbC5pZCA9PT0gcG9zc2libGVDZWxsLm1vZGVsLmlkO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHdoaWNoID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbm90ZWJvb2sud2lkZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB3aGljaCArIDE7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlbGVjdGVkSGVhZGluZ0luZm8gPSBOb3RlYm9va0FjdGlvbnMuZ2V0SGVhZGluZ0luZm8oY2VsbCk7XG4gICAgICAgIGlmIChjZWxsLmlzSGlkZGVuIHx8XG4gICAgICAgICAgICAhKGNlbGwgaW5zdGFuY2VvZiBNYXJrZG93bkNlbGwpIHx8XG4gICAgICAgICAgICAhc2VsZWN0ZWRIZWFkaW5nSW5mby5pc0hlYWRpbmcpIHtcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBjb2xsYXBzaW5nIGFuZCB1bmNvbGxhcHNpbmcgYWxyZWFkeSBoaWRkZW4gc3R1ZmYgY2FuXG4gICAgICAgICAgICAvLyBjYXVzZSBzb21lIGZ1bm55IGxvb2tpbmcgYnVncy5cbiAgICAgICAgICAgIHJldHVybiB3aGljaCArIDE7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxvY2FsQ29sbGFwc2VkID0gZmFsc2U7XG4gICAgICAgIGxldCBsb2NhbENvbGxhcHNlZExldmVsID0gMDtcbiAgICAgICAgLy8gaXRlcmF0ZSB0aHJvdWdoIGFsbCBjZWxscyBhZnRlciB0aGUgYWN0aXZlIGNlbGwuXG4gICAgICAgIGxldCBjZWxsTnVtO1xuICAgICAgICBmb3IgKGNlbGxOdW0gPSB3aGljaCArIDE7IGNlbGxOdW0gPCBub3RlYm9vay53aWRnZXRzLmxlbmd0aDsgY2VsbE51bSsrKSB7XG4gICAgICAgICAgICBsZXQgc3ViQ2VsbCA9IG5vdGVib29rLndpZGdldHNbY2VsbE51bV07XG4gICAgICAgICAgICBsZXQgc3ViQ2VsbEhlYWRpbmdJbmZvID0gTm90ZWJvb2tBY3Rpb25zLmdldEhlYWRpbmdJbmZvKHN1YkNlbGwpO1xuICAgICAgICAgICAgaWYgKHN1YkNlbGxIZWFkaW5nSW5mby5pc0hlYWRpbmcgJiZcbiAgICAgICAgICAgICAgICBzdWJDZWxsSGVhZGluZ0luZm8uaGVhZGluZ0xldmVsIDw9IHNlbGVjdGVkSGVhZGluZ0luZm8uaGVhZGluZ0xldmVsKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlbiByZWFjaGVkIGFuIGVxdWl2YWxlbnQgb3IgaGlnaGVyIGhlYWRpbmcgbGV2ZWwgdGhhbiB0aGVcbiAgICAgICAgICAgICAgICAvLyBvcmlnaW5hbCB0aGUgZW5kIG9mIHRoZSBjb2xsYXBzZS5cbiAgICAgICAgICAgICAgICBjZWxsTnVtIC09IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobG9jYWxDb2xsYXBzZWQgJiZcbiAgICAgICAgICAgICAgICBzdWJDZWxsSGVhZGluZ0luZm8uaXNIZWFkaW5nICYmXG4gICAgICAgICAgICAgICAgc3ViQ2VsbEhlYWRpbmdJbmZvLmhlYWRpbmdMZXZlbCA8PSBsb2NhbENvbGxhcHNlZExldmVsKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlbiByZWFjaGVkIHRoZSBlbmQgb2YgdGhlIGxvY2FsIGNvbGxhcHNlZCwgc28gdW5zZXQgTm90ZWJvb2tBY3Rpb25zLlxuICAgICAgICAgICAgICAgIGxvY2FsQ29sbGFwc2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29sbGFwc2luZyB8fCBsb2NhbENvbGxhcHNlZCkge1xuICAgICAgICAgICAgICAgIC8vIHRoZW4gbm8gZXh0cmEgaGFuZGxpbmcgaXMgbmVlZGVkIGZvciBmdXJ0aGVyIGxvY2FsbHkgY29sbGFwc2VkXG4gICAgICAgICAgICAgICAgLy8gaGVhZGluZ3MuXG4gICAgICAgICAgICAgICAgc3ViQ2VsbC5zZXRIaWRkZW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3ViQ2VsbEhlYWRpbmdJbmZvLmNvbGxhcHNlZCAmJiBzdWJDZWxsSGVhZGluZ0luZm8uaXNIZWFkaW5nKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxDb2xsYXBzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxvY2FsQ29sbGFwc2VkTGV2ZWwgPSBzdWJDZWxsSGVhZGluZ0luZm8uaGVhZGluZ0xldmVsO1xuICAgICAgICAgICAgICAgIC8vIGJ1dCBkb24ndCBjb2xsYXBzZSB0aGUgbG9jYWxseSBjb2xsYXBzZWQgaGVhZGluZywgc28gY29udGludWUgdG9cbiAgICAgICAgICAgICAgICAvLyBleHBhbmQgdGhlIGhlYWRpbmcuIFRoaXMgd2lsbCBnZXQgbm90aWNlZCBpbiB0aGUgbmV4dCByb3VuZC5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1YkNlbGwuc2V0SGlkZGVuKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2VsbE51bSA9PT0gbm90ZWJvb2sud2lkZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNlbGwubnVtYmVyQ2hpbGROb2RlcyA9IGNlbGxOdW0gLSB3aGljaCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjZWxsLm51bWJlckNoaWxkTm9kZXMgPSBjZWxsTnVtIC0gd2hpY2g7XG4gICAgICAgIH1cbiAgICAgICAgTm90ZWJvb2tBY3Rpb25zLnNldENlbGxDb2xsYXBzZShjZWxsLCBjb2xsYXBzaW5nKTtcbiAgICAgICAgcmV0dXJuIGNlbGxOdW0gKyAxO1xuICAgIH1cbiAgICBOb3RlYm9va0FjdGlvbnMuc2V0SGVhZGluZ0NvbGxhcHNlID0gc2V0SGVhZGluZ0NvbGxhcHNlO1xuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIGNvbGxhcHNlIHN0YXRlIG9mIHRoZSBhY3RpdmUgY2VsbCBvZiB0aGUgZ2l2ZW4gbm90ZWJvb2tcbiAgICAgKiBhbmQgKiogYWxsIG9mIGl0cyBcImNoaWxkXCIgY2VsbHMgKiogaWYgdGhlIGNlbGwgaXMgYSBoZWFkaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdG9nZ2xlQ3VycmVudEhlYWRpbmdDb2xsYXBzZShub3RlYm9vaykge1xuICAgICAgICBpZiAoIW5vdGVib29rLmFjdGl2ZUNlbGwgfHwgbm90ZWJvb2suYWN0aXZlQ2VsbEluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaGVhZGluZ0luZm8gPSBOb3RlYm9va0FjdGlvbnMuZ2V0SGVhZGluZ0luZm8obm90ZWJvb2suYWN0aXZlQ2VsbCk7XG4gICAgICAgIGlmIChoZWFkaW5nSW5mby5pc0hlYWRpbmcpIHtcbiAgICAgICAgICAgIC8vIFRoZW4gdG9nZ2xlIVxuICAgICAgICAgICAgTm90ZWJvb2tBY3Rpb25zLnNldEhlYWRpbmdDb2xsYXBzZShub3RlYm9vay5hY3RpdmVDZWxsLCAhaGVhZGluZ0luZm8uY29sbGFwc2VkLCBub3RlYm9vayk7XG4gICAgICAgIH1cbiAgICAgICAgRWxlbWVudEV4dC5zY3JvbGxJbnRvVmlld0lmTmVlZGVkKG5vdGVib29rLm5vZGUsIG5vdGVib29rLmFjdGl2ZUNlbGwubm9kZSk7XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy50b2dnbGVDdXJyZW50SGVhZGluZ0NvbGxhcHNlID0gdG9nZ2xlQ3VycmVudEhlYWRpbmdDb2xsYXBzZTtcbiAgICAvKipcbiAgICAgKiBJZiBjZWxsIGlzIGEgbWFya2Rvd24gaGVhZGluZywgc2V0cyB0aGUgaGVhZGluZ0NvbGxhcHNlZCBmaWVsZCxcbiAgICAgKiBhbmQgb3RoZXJ3aXNlIGhpZGVzIHRoZSBjZWxsLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNlbGwgLSBUaGUgY2VsbCB0byBjb2xsYXBzZSAvIGV4cGFuZFxuICAgICAqIEBwYXJhbSBjb2xsYXBzaW5nIC0gV2hldGhlciB0byBjb2xsYXBzZSBvciBleHBhbmQgdGhlIGdpdmVuIGNlbGxcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRDZWxsQ29sbGFwc2UoY2VsbCwgY29sbGFwc2luZykge1xuICAgICAgICBpZiAoY2VsbCBpbnN0YW5jZW9mIE1hcmtkb3duQ2VsbCkge1xuICAgICAgICAgICAgY2VsbC5oZWFkaW5nQ29sbGFwc2VkID0gY29sbGFwc2luZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNlbGwuc2V0SGlkZGVuKGNvbGxhcHNpbmcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy5zZXRDZWxsQ29sbGFwc2UgPSBzZXRDZWxsQ29sbGFwc2U7XG4gICAgLyoqXG4gICAgICogSWYgZ2l2ZW4gY2VsbCBpcyBhIG1hcmtkb3duIGhlYWRpbmcsIHJldHVybnMgdGhlIGhlYWRpbmcgbGV2ZWwuXG4gICAgICogSWYgZ2l2ZW4gY2VsbCBpcyBub3QgbWFya2Rvd24sIHJldHVybnMgNyAodGhlcmUgYXJlIG9ubHkgNiBsZXZlbHMgb2YgbWFya2Rvd24gaGVhZGluZ3MpXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2VsbCAtIFRoZSB0YXJnZXQgY2VsbCB3aWRnZXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0SGVhZGluZ0luZm8oY2VsbCkge1xuICAgICAgICBpZiAoIShjZWxsIGluc3RhbmNlb2YgTWFya2Rvd25DZWxsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgaXNIZWFkaW5nOiBmYWxzZSwgaGVhZGluZ0xldmVsOiA3IH07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxldmVsID0gY2VsbC5oZWFkaW5nSW5mby5sZXZlbDtcbiAgICAgICAgbGV0IGNvbGxhcHNlZCA9IGNlbGwuaGVhZGluZ0NvbGxhcHNlZDtcbiAgICAgICAgcmV0dXJuIHsgaXNIZWFkaW5nOiBsZXZlbCA+IDAsIGhlYWRpbmdMZXZlbDogbGV2ZWwsIGNvbGxhcHNlZDogY29sbGFwc2VkIH07XG4gICAgfVxuICAgIE5vdGVib29rQWN0aW9ucy5nZXRIZWFkaW5nSW5mbyA9IGdldEhlYWRpbmdJbmZvO1xuICAgIC8qKlxuICAgICAqIFRydXN0IHRoZSBub3RlYm9vayBhZnRlciBwcm9tcHRpbmcgdGhlIHVzZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm90ZWJvb2sgLSBUaGUgdGFyZ2V0IG5vdGVib29rIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHRyYW5zYWN0aW9uIGlzIGZpbmlzaGVkLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIE5vIGRpYWxvZyB3aWxsIGJlIHByZXNlbnRlZCBpZiB0aGUgbm90ZWJvb2sgaXMgYWxyZWFkeSB0cnVzdGVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRydXN0KG5vdGVib29rLCB0cmFuc2xhdG9yKSB7XG4gICAgICAgIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBpZiAoIW5vdGVib29rLm1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBhbHJlYWR5IHRydXN0ZWQuXG4gICAgICAgIGNvbnN0IGNlbGxzID0gdG9BcnJheShub3RlYm9vay5tb2RlbC5jZWxscyk7XG4gICAgICAgIGNvbnN0IHRydXN0ZWQgPSBjZWxscy5ldmVyeShjZWxsID0+IGNlbGwudHJ1c3RlZCk7XG4gICAgICAgIC8vIEZJWE1FXG4gICAgICAgIGNvbnN0IHRydXN0TWVzc2FnZSA9IChSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLFxuICAgICAgICAgICAgdHJhbnMuX18oJ0EgdHJ1c3RlZCBKdXB5dGVyIG5vdGVib29rIG1heSBleGVjdXRlIGhpZGRlbiBtYWxpY2lvdXMgY29kZSB3aGVuIHlvdSBvcGVuIGl0LicpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJyXCIsIG51bGwpLFxuICAgICAgICAgICAgdHJhbnMuX18oJ1NlbGVjdGluZyB0cnVzdCB3aWxsIHJlLXJlbmRlciB0aGlzIG5vdGVib29rIGluIGEgdHJ1c3RlZCBzdGF0ZS4nKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJiclwiLCBudWxsKSxcbiAgICAgICAgICAgIHRyYW5zLl9fKCdGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlJyksXG4gICAgICAgICAgICAnICcsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGhyZWY6IFwiaHR0cHM6Ly9qdXB5dGVyLXNlcnZlci5yZWFkdGhlZG9jcy5pby9lbi9zdGFibGUvb3BlcmF0b3JzL3NlY3VyaXR5Lmh0bWxcIiwgdGFyZ2V0OiBcIl9ibGFua1wiLCByZWw6IFwibm9vcGVuZXIgbm9yZWZlcnJlclwiIH0sIHRyYW5zLl9fKCd0aGUgSnVweXRlciBzZWN1cml0eSBkb2N1bWVudGF0aW9uJykpKSk7XG4gICAgICAgIGlmICh0cnVzdGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICAgICAgYm9keTogdHJhbnMuX18oJ05vdGVib29rIGlzIGFscmVhZHkgdHJ1c3RlZCcpLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtEaWFsb2cub2tCdXR0b24oeyBsYWJlbDogdHJhbnMuX18oJ09rJykgfSldXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNob3dEaWFsb2coe1xuICAgICAgICAgICAgYm9keTogdHJ1c3RNZXNzYWdlLFxuICAgICAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdUcnVzdCB0aGlzIG5vdGVib29rPycpLFxuICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgIERpYWxvZy5jYW5jZWxCdXR0b24oeyBsYWJlbDogdHJhbnMuX18oJ0NhbmNlbCcpIH0pLFxuICAgICAgICAgICAgICAgIERpYWxvZy53YXJuQnV0dG9uKHsgbGFiZWw6IHRyYW5zLl9fKCdPaycpIH0pXG4gICAgICAgICAgICBdIC8vIEZJWE1FP1xuICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmJ1dHRvbi5hY2NlcHQpIHtcbiAgICAgICAgICAgICAgICBjZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnRydXN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgTm90ZWJvb2tBY3Rpb25zLnRydXN0ID0gdHJ1c3Q7XG59KShOb3RlYm9va0FjdGlvbnMgfHwgKE5vdGVib29rQWN0aW9ucyA9IHt9KSk7XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgdGhhdCBlbWl0cyB3aGVuZXZlciBhIGNlbGwgY29tcGxldGVzIGV4ZWN1dGlvbi5cbiAgICAgKi9cbiAgICBQcml2YXRlLmV4ZWN1dGVkID0gbmV3IFNpZ25hbCh7fSk7XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgdGhhdCBlbWl0cyB3aGVuZXZlciBhIGNlbGwgZXhlY3V0aW9uIGlzIHNjaGVkdWxlZC5cbiAgICAgKi9cbiAgICBQcml2YXRlLmV4ZWN1dGlvblNjaGVkdWxlZCA9IG5ldyBTaWduYWwoe30pO1xuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIHRoYXQgZW1pdHMgd2hlbiBvbmUgbm90ZWJvb2sncyBjZWxscyBhcmUgYWxsIGV4ZWN1dGVkLlxuICAgICAqL1xuICAgIFByaXZhdGUuc2VsZWN0aW9uRXhlY3V0ZWQgPSBuZXcgU2lnbmFsKHt9KTtcbiAgICBmdW5jdGlvbiBpc05vdGVib29rUmVuZGVyZWQobm90ZWJvb2spIHtcbiAgICAgICAgY29uc3QgdHJhbnNsYXRvciA9IG5vdGVib29rLnRyYW5zbGF0b3I7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGlmIChub3RlYm9vay5yZW1haW5pbmdDZWxsVG9SZW5kZXJDb3VudCAhPT0gMCkge1xuICAgICAgICAgICAgc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICAgICAgYm9keTogdHJhbnMuX18oYE5vdGVib29rIGlzIHN0aWxsIHJlbmRlcmluZyBhbmQgaGFzIGZvciBub3cgKCUxKSByZW1haW5pbmcgY2VsbHMgdG8gcmVuZGVyLlxuXG5QbGVhc2Ugd2FpdCBmb3IgdGhlIGNvbXBsZXRlIHJlbmRlcmluZyBiZWZvcmUgaW52b2tpbmcgdGhhdCBhY3Rpb24uYCwgbm90ZWJvb2sucmVtYWluaW5nQ2VsbFRvUmVuZGVyQ291bnQpLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtEaWFsb2cub2tCdXR0b24oeyBsYWJlbDogdHJhbnMuX18oJ09rJykgfSldXG4gICAgICAgICAgICB9KS5jYXRjaChyZWFzb24gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkIHdoZW4gZGlzcGxheWluZyBub3RlYm9vayByZW5kZXJpbmcgd2FybmluZycsIHJlYXNvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgUHJpdmF0ZS5pc05vdGVib29rUmVuZGVyZWQgPSBpc05vdGVib29rUmVuZGVyZWQ7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzdGF0ZSBvZiBhIHdpZGdldCBiZWZvcmUgcnVubmluZyBhbiBhY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0U3RhdGUobm90ZWJvb2spIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdhc0ZvY3VzZWQ6IG5vdGVib29rLm5vZGUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCksXG4gICAgICAgICAgICBhY3RpdmVDZWxsOiBub3RlYm9vay5hY3RpdmVDZWxsXG4gICAgICAgIH07XG4gICAgfVxuICAgIFByaXZhdGUuZ2V0U3RhdGUgPSBnZXRTdGF0ZTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIHN0YXRlIG9mIGEgd2lkZ2V0IGFmdGVyIHJ1bm5pbmcgYW4gYWN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhbmRsZVN0YXRlKG5vdGVib29rLCBzdGF0ZSwgc2Nyb2xsSWZOZWVkZWQgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCB7IGFjdGl2ZUNlbGwsIG5vZGUgfSA9IG5vdGVib29rO1xuICAgICAgICBpZiAoc3RhdGUud2FzRm9jdXNlZCB8fCBub3RlYm9vay5tb2RlID09PSAnZWRpdCcpIHtcbiAgICAgICAgICAgIG5vdGVib29rLmFjdGl2YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjcm9sbElmTmVlZGVkICYmIGFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIEVsZW1lbnRFeHQuc2Nyb2xsSW50b1ZpZXdJZk5lZWRlZChub2RlLCBhY3RpdmVDZWxsLm5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFByaXZhdGUuaGFuZGxlU3RhdGUgPSBoYW5kbGVTdGF0ZTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIHN0YXRlIG9mIGEgd2lkZ2V0IGFmdGVyIHJ1bm5pbmcgYSBydW4gYWN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhbmRsZVJ1blN0YXRlKG5vdGVib29rLCBzdGF0ZSwgc2Nyb2xsID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHN0YXRlLndhc0ZvY3VzZWQgfHwgbm90ZWJvb2subW9kZSA9PT0gJ2VkaXQnKSB7XG4gICAgICAgICAgICBub3RlYm9vay5hY3RpdmF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY3JvbGwgJiYgc3RhdGUuYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgLy8gU2Nyb2xsIHRvIHRoZSB0b3Agb2YgdGhlIHByZXZpb3VzIGFjdGl2ZSBjZWxsIG91dHB1dC5cbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBzdGF0ZS5hY3RpdmVDZWxsLmlucHV0QXJlYS5ub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgbm90ZWJvb2suc2Nyb2xsVG9Qb3NpdGlvbihyZWN0LmJvdHRvbSwgNDUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFByaXZhdGUuaGFuZGxlUnVuU3RhdGUgPSBoYW5kbGVSdW5TdGF0ZTtcbiAgICAvKipcbiAgICAgKiBDbG9uZSBhIGNlbGwgbW9kZWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY2xvbmVDZWxsKG1vZGVsLCBjZWxsKSB7XG4gICAgICAgIHN3aXRjaCAoY2VsbC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdjb2RlJzpcbiAgICAgICAgICAgICAgICAvLyBUT0RPIHdoeSBpc24ndCBtb2RlbGRiIG9yIGlkIHBhc3NlZCBoZXJlP1xuICAgICAgICAgICAgICAgIHJldHVybiBtb2RlbC5jb250ZW50RmFjdG9yeS5jcmVhdGVDb2RlQ2VsbCh7IGNlbGw6IGNlbGwudG9KU09OKCkgfSk7XG4gICAgICAgICAgICBjYXNlICdtYXJrZG93bic6XG4gICAgICAgICAgICAgICAgLy8gVE9ETyB3aHkgaXNuJ3QgbW9kZWxkYiBvciBpZCBwYXNzZWQgaGVyZT9cbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kZWwuY29udGVudEZhY3RvcnkuY3JlYXRlTWFya2Rvd25DZWxsKHsgY2VsbDogY2VsbC50b0pTT04oKSB9KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gVE9ETyB3aHkgaXNuJ3QgbW9kZWxkYiBvciBpZCBwYXNzZWQgaGVyZT9cbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kZWwuY29udGVudEZhY3RvcnkuY3JlYXRlUmF3Q2VsbCh7IGNlbGw6IGNlbGwudG9KU09OKCkgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUHJpdmF0ZS5jbG9uZUNlbGwgPSBjbG9uZUNlbGw7XG4gICAgLyoqXG4gICAgICogUnVuIHRoZSBzZWxlY3RlZCBjZWxscy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBydW5TZWxlY3RlZChub3RlYm9vaywgc2Vzc2lvbkNvbnRleHQpIHtcbiAgICAgICAgbm90ZWJvb2subW9kZSA9ICdjb21tYW5kJztcbiAgICAgICAgbGV0IGxhc3RJbmRleCA9IG5vdGVib29rLmFjdGl2ZUNlbGxJbmRleDtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBub3RlYm9vay53aWRnZXRzLmZpbHRlcigoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBub3RlYm9vay5pc1NlbGVjdGVkT3JBY3RpdmUoY2hpbGQpO1xuICAgICAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGxhc3RJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjdGl2ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5vdGVib29rLmFjdGl2ZUNlbGxJbmRleCA9IGxhc3RJbmRleDtcbiAgICAgICAgbm90ZWJvb2suZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHNlbGVjdGVkLm1hcChjaGlsZCA9PiBydW5DZWxsKG5vdGVib29rLCBjaGlsZCwgc2Vzc2lvbkNvbnRleHQpKSlcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgaWYgKG5vdGVib29rLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBQcml2YXRlLnNlbGVjdGlvbkV4ZWN1dGVkLmVtaXQoe1xuICAgICAgICAgICAgICAgIG5vdGVib29rLFxuICAgICAgICAgICAgICAgIGxhc3RDZWxsOiBub3RlYm9vay53aWRnZXRzW2xhc3RJbmRleF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gUG9zdCBhbiB1cGRhdGUgcmVxdWVzdC5cbiAgICAgICAgICAgIG5vdGVib29rLnVwZGF0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHMuZXZlcnkocmVzdWx0ID0+IHJlc3VsdCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2gocmVhc29uID0+IHtcbiAgICAgICAgICAgIGlmIChyZWFzb24ubWVzc2FnZS5zdGFydHNXaXRoKCdLZXJuZWxSZXBseU5vdE9LJykpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZC5tYXAoY2VsbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSAnKicgcHJvbXB0IGZyb20gY2VsbHMgdGhhdCBkaWRuJ3QgZXhlY3V0ZVxuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbC5tb2RlbC50eXBlID09PSAnY29kZScgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwubW9kZWwuZXhlY3V0aW9uQ291bnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5zZXRQcm9tcHQoJycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyByZWFzb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBQcml2YXRlLnNlbGVjdGlvbkV4ZWN1dGVkLmVtaXQoe1xuICAgICAgICAgICAgICAgIG5vdGVib29rLFxuICAgICAgICAgICAgICAgIGxhc3RDZWxsOiBub3RlYm9vay53aWRnZXRzW2xhc3RJbmRleF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbm90ZWJvb2sudXBkYXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBQcml2YXRlLnJ1blNlbGVjdGVkID0gcnVuU2VsZWN0ZWQ7XG4gICAgLyoqXG4gICAgICogUnVuIGEgY2VsbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBydW5DZWxsKG5vdGVib29rLCBjZWxsLCBzZXNzaW9uQ29udGV4dCwgdHJhbnNsYXRvcikge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHN3aXRjaCAoY2VsbC5tb2RlbC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdtYXJrZG93bic6XG4gICAgICAgICAgICAgICAgY2VsbC5yZW5kZXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2VsbC5pbnB1dEhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIFByaXZhdGUuZXhlY3V0ZWQuZW1pdCh7IG5vdGVib29rLCBjZWxsLCBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY29kZSc6XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb25Db250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uQ29udGV4dC5pc1Rlcm1pbmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2b2lkIHNob3dEaWFsb2coe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFucy5fXygnS2VybmVsIFRlcm1pbmF0aW5nJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogdHJhbnMuX18oJ1RoZSBrZXJuZWwgZm9yICUxIGFwcGVhcnMgdG8gYmUgdGVybWluYXRpbmcuIFlvdSBjYW4gbm90IHJ1biBhbnkgY2VsbCBmb3Igbm93LicsIChfYSA9IHNlc3Npb25Db250ZXh0LnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wYXRoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbRGlhbG9nLm9rQnV0dG9uKHsgbGFiZWw6IHRyYW5zLl9fKCdPaycpIH0pXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbkNvbnRleHQucGVuZGluZ0lucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2b2lkIHNob3dEaWFsb2coe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFucy5fXygnQ2VsbCBub3QgZXhlY3V0ZWQgZHVlIHRvIHBlbmRpbmcgaW5wdXQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiB0cmFucy5fXygnVGhlIGNlbGwgaGFzIG5vdCBiZWVuIGV4ZWN1dGVkIHRvIGF2b2lkIGtlcm5lbCBkZWFkbG9jayBhcyB0aGVyZSBpcyBhbm90aGVyIHBlbmRpbmcgaW5wdXQhIFN1Ym1pdCB5b3VyIHBlbmRpbmcgaW5wdXQgYW5kIHRyeSBhZ2Fpbi4nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbRGlhbG9nLm9rQnV0dG9uKHsgbGFiZWw6IHRyYW5zLl9fKCdPaycpIH0pXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbkNvbnRleHQuaGFzTm9LZXJuZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgc2Vzc2lvbkNvbnRleHREaWFsb2dzLnNlbGVjdEtlcm5lbChzZXNzaW9uQ29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVkQ2VsbHMgPSAoX2MgPSAoX2IgPSBub3RlYm9vay5tb2RlbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmRlbGV0ZWRDZWxscykgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogW107XG4gICAgICAgICAgICAgICAgICAgIFByaXZhdGUuZXhlY3V0aW9uU2NoZWR1bGVkLmVtaXQoeyBub3RlYm9vaywgY2VsbCB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvZGVDZWxsLmV4ZWN1dGUoY2VsbCwgc2Vzc2lvbkNvbnRleHQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZWRDZWxscyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZFRpbWluZzogbm90ZWJvb2subm90ZWJvb2tDb25maWcucmVjb3JkVGltaW5nXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXBseSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVkQ2VsbHMuc3BsaWNlKDAsIGRlbGV0ZWRDZWxscy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVwbHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXBseS5jb250ZW50LnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSByZXBseS5jb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50LnBheWxvYWQgJiYgY29udGVudC5wYXlsb2FkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVQYXlsb2FkKGNvbnRlbnQsIG5vdGVib29rLCBjZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgS2VybmVsRXJyb3IocmVwbHkuY29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2gocmVhc29uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsLmlzRGlzcG9zZWQgfHwgcmVhc29uLm1lc3NhZ2Uuc3RhcnRzV2l0aCgnQ2FuY2VsZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFByaXZhdGUuZXhlY3V0ZWQuZW1pdCh7IG5vdGVib29rLCBjZWxsLCBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IHJlYXNvbiB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IHJlYXNvbjtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJhbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJpdmF0ZS5leGVjdXRlZC5lbWl0KHsgbm90ZWJvb2ssIGNlbGwsIHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmFuO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2VsbC5tb2RlbC5jbGVhckV4ZWN1dGlvbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgcGF5bG9hZHMgZnJvbSBhbiBleGVjdXRlIHJlcGx5LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFBheWxvYWRzIGFyZSBkZXByZWNhdGVkIGFuZCB0aGVyZSBhcmUgbm8gb2ZmaWNpYWwgaW50ZXJmYWNlcyBmb3IgdGhlbSBpblxuICAgICAqIHRoZSBrZXJuZWwgdHlwZSBkZWZpbml0aW9ucy5cbiAgICAgKiBTZWUgW1BheWxvYWRzIChERVBSRUNBVEVEKV0oaHR0cHM6Ly9qdXB5dGVyLWNsaWVudC5yZWFkdGhlZG9jcy5pby9lbi9sYXRlc3QvbWVzc2FnaW5nLmh0bWwjcGF5bG9hZHMtZGVwcmVjYXRlZCkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFuZGxlUGF5bG9hZChjb250ZW50LCBub3RlYm9vaywgY2VsbCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHNldE5leHRJbnB1dCA9IChfYSA9IGNvbnRlbnQucGF5bG9hZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZpbHRlcihpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpLnNvdXJjZSA9PT0gJ3NldF9uZXh0X2lucHV0JztcbiAgICAgICAgfSlbMF07XG4gICAgICAgIGlmICghc2V0TmV4dElucHV0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGV4dCA9IHNldE5leHRJbnB1dC50ZXh0O1xuICAgICAgICBjb25zdCByZXBsYWNlID0gc2V0TmV4dElucHV0LnJlcGxhY2U7XG4gICAgICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICAgICAgICBjZWxsLm1vZGVsLnZhbHVlLnRleHQgPSB0ZXh0O1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBjb2RlIGNlbGwgYW5kIGFkZCBhcyB0aGUgbmV4dCBjZWxsLlxuICAgICAgICBjb25zdCBuZXdDZWxsID0gbm90ZWJvb2subW9kZWwuY29udGVudEZhY3RvcnkuY3JlYXRlQ29kZUNlbGwoe30pO1xuICAgICAgICBjb25zdCBjZWxscyA9IG5vdGVib29rLm1vZGVsLmNlbGxzO1xuICAgICAgICBjb25zdCBpbmRleCA9IEFycmF5RXh0LmZpcnN0SW5kZXhPZih0b0FycmF5KGNlbGxzKSwgY2VsbC5tb2RlbCk7XG4gICAgICAgIG5ld0NlbGwudmFsdWUudGV4dCA9IHRleHQ7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIGNlbGxzLnB1c2gobmV3Q2VsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjZWxscy5pbnNlcnQoaW5kZXggKyAxLCBuZXdDZWxsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHNlbGVjdGVkIGNlbGwocykgd2l0aG91dCBhZmZlY3RpbmcgdGhlIGNsaXBib2FyZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub3RlYm9vayAtIFRoZSB0YXJnZXQgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBsaXN0IG9mIDAgb3IgbW9yZSBzZWxlY3RlZCBjZWxsc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNlbGVjdGVkQ2VsbHMobm90ZWJvb2spIHtcbiAgICAgICAgcmV0dXJuIG5vdGVib29rLndpZGdldHNcbiAgICAgICAgICAgIC5maWx0ZXIoY2VsbCA9PiBub3RlYm9vay5pc1NlbGVjdGVkT3JBY3RpdmUoY2VsbCkpXG4gICAgICAgICAgICAubWFwKGNlbGwgPT4gY2VsbC5tb2RlbC50b0pTT04oKSlcbiAgICAgICAgICAgIC5tYXAoY2VsbEpTT04gPT4ge1xuICAgICAgICAgICAgaWYgKGNlbGxKU09OLm1ldGFkYXRhLmRlbGV0YWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGNlbGxKU09OLm1ldGFkYXRhLmRlbGV0YWJsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjZWxsSlNPTjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFByaXZhdGUuc2VsZWN0ZWRDZWxscyA9IHNlbGVjdGVkQ2VsbHM7XG4gICAgLyoqXG4gICAgICogQ29weSBvciBjdXQgdGhlIHNlbGVjdGVkIGNlbGwgZGF0YSB0byB0aGUgYXBwbGljYXRpb24gY2xpcGJvYXJkLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3V0IC0gVHJ1ZSBpZiB0aGUgY2VsbHMgc2hvdWxkIGJlIGN1dCwgZmFsc2UgaWYgdGhleSBzaG91bGQgYmUgY29waWVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvcHlPckN1dChub3RlYm9vaywgY3V0KSB7XG4gICAgICAgIGlmICghbm90ZWJvb2subW9kZWwgfHwgIW5vdGVib29rLmFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGF0ZSA9IGdldFN0YXRlKG5vdGVib29rKTtcbiAgICAgICAgY29uc3QgY2xpcGJvYXJkID0gQ2xpcGJvYXJkLmdldEluc3RhbmNlKCk7XG4gICAgICAgIG5vdGVib29rLm1vZGUgPSAnY29tbWFuZCc7XG4gICAgICAgIGNsaXBib2FyZC5jbGVhcigpO1xuICAgICAgICBjb25zdCBkYXRhID0gUHJpdmF0ZS5zZWxlY3RlZENlbGxzKG5vdGVib29rKTtcbiAgICAgICAgY2xpcGJvYXJkLnNldERhdGEoSlVQWVRFUl9DRUxMX01JTUUsIGRhdGEpO1xuICAgICAgICBpZiAoY3V0KSB7XG4gICAgICAgICAgICBkZWxldGVDZWxscyhub3RlYm9vayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBub3RlYm9vay5kZXNlbGVjdEFsbCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXQpIHtcbiAgICAgICAgICAgIG5vdGVib29rLmxhc3RDbGlwYm9hcmRJbnRlcmFjdGlvbiA9ICdjdXQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm90ZWJvb2subGFzdENsaXBib2FyZEludGVyYWN0aW9uID0gJ2NvcHknO1xuICAgICAgICB9XG4gICAgICAgIGhhbmRsZVN0YXRlKG5vdGVib29rLCBzdGF0ZSk7XG4gICAgfVxuICAgIFByaXZhdGUuY29weU9yQ3V0ID0gY29weU9yQ3V0O1xuICAgIC8qKlxuICAgICAqIENoYW5nZSB0aGUgc2VsZWN0ZWQgY2VsbCB0eXBlKHMpLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdGFyZ2V0IGNlbGwgdHlwZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBJdCBzaG91bGQgcHJlc2VydmUgdGhlIHdpZGdldCBtb2RlLlxuICAgICAqIFRoaXMgYWN0aW9uIGNhbiBiZSB1bmRvbmUuXG4gICAgICogVGhlIGV4aXN0aW5nIHNlbGVjdGlvbiB3aWxsIGJlIGNsZWFyZWQuXG4gICAgICogQW55IGNlbGxzIGNvbnZlcnRlZCB0byBtYXJrZG93biB3aWxsIGJlIHVucmVuZGVyZWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY2hhbmdlQ2VsbFR5cGUobm90ZWJvb2ssIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gbm90ZWJvb2subW9kZWw7XG4gICAgICAgIGNvbnN0IGNlbGxzID0gbW9kZWwuY2VsbHM7XG4gICAgICAgIGNlbGxzLmJlZ2luQ29tcG91bmRPcGVyYXRpb24oKTtcbiAgICAgICAgbm90ZWJvb2sud2lkZ2V0cy5mb3JFYWNoKChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICghbm90ZWJvb2suaXNTZWxlY3RlZE9yQWN0aXZlKGNoaWxkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGlsZC5tb2RlbC50eXBlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBjaGlsZC5tb2RlbC50b0pTT04oKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q2VsbDtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NvZGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2VsbCA9IG1vZGVsLmNvbnRlbnRGYWN0b3J5LmNyZWF0ZUNvZGVDZWxsKHsgY2VsbCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtYXJrZG93bic6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdDZWxsID0gbW9kZWwuY29udGVudEZhY3RvcnkuY3JlYXRlTWFya2Rvd25DZWxsKHsgY2VsbCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZC5tb2RlbC50eXBlID09PSAnY29kZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDZWxsLnRydXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2VsbCA9IG1vZGVsLmNvbnRlbnRGYWN0b3J5LmNyZWF0ZVJhd0NlbGwoeyBjZWxsIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkLm1vZGVsLnR5cGUgPT09ICdjb2RlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NlbGwudHJ1c3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjZWxscy5zZXQoaW5kZXgsIG5ld0NlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnbWFya2Rvd24nKSB7XG4gICAgICAgICAgICAgICAgLy8gRmV0Y2ggdGhlIG5ldyB3aWRnZXQgYW5kIHVucmVuZGVyIGl0LlxuICAgICAgICAgICAgICAgIGNoaWxkID0gbm90ZWJvb2sud2lkZ2V0c1tpbmRleF07XG4gICAgICAgICAgICAgICAgY2hpbGQucmVuZGVyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNlbGxzLmVuZENvbXBvdW5kT3BlcmF0aW9uKCk7XG4gICAgICAgIG5vdGVib29rLmRlc2VsZWN0QWxsKCk7XG4gICAgfVxuICAgIFByaXZhdGUuY2hhbmdlQ2VsbFR5cGUgPSBjaGFuZ2VDZWxsVHlwZTtcbiAgICAvKipcbiAgICAgKiBEZWxldGUgdGhlIHNlbGVjdGVkIGNlbGxzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vdGVib29rIC0gVGhlIHRhcmdldCBub3RlYm9vayB3aWRnZXQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIGNlbGwgYWZ0ZXIgdGhlIGxhc3Qgc2VsZWN0ZWQgY2VsbCB3aWxsIGJlIGFjdGl2YXRlZC5cbiAgICAgKiBJZiB0aGUgbGFzdCBjZWxsIGlzIGRlbGV0ZWQsIHRoZW4gdGhlIHByZXZpb3VzIG9uZSB3aWxsIGJlIGFjdGl2YXRlZC5cbiAgICAgKiBJdCB3aWxsIGFkZCBhIGNvZGUgY2VsbCBpZiBhbGwgY2VsbHMgYXJlIGRlbGV0ZWQuXG4gICAgICogVGhpcyBhY3Rpb24gY2FuIGJlIHVuZG9uZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkZWxldGVDZWxscyhub3RlYm9vaykge1xuICAgICAgICBjb25zdCBtb2RlbCA9IG5vdGVib29rLm1vZGVsO1xuICAgICAgICBjb25zdCBjZWxscyA9IG1vZGVsLmNlbGxzO1xuICAgICAgICBjb25zdCB0b0RlbGV0ZSA9IFtdO1xuICAgICAgICBub3RlYm9vay5tb2RlID0gJ2NvbW1hbmQnO1xuICAgICAgICAvLyBGaW5kIHRoZSBjZWxscyB0byBkZWxldGUuXG4gICAgICAgIG5vdGVib29rLndpZGdldHMuZm9yRWFjaCgoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZWxldGFibGUgPSBjaGlsZC5tb2RlbC5tZXRhZGF0YS5nZXQoJ2RlbGV0YWJsZScpICE9PSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChub3RlYm9vay5pc1NlbGVjdGVkT3JBY3RpdmUoY2hpbGQpICYmIGRlbGV0YWJsZSkge1xuICAgICAgICAgICAgICAgIHRvRGVsZXRlLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgICAgIG1vZGVsLmRlbGV0ZWRDZWxscy5wdXNoKGNoaWxkLm1vZGVsLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIElmIGNlbGxzIGFyZSBub3QgZGVsZXRhYmxlLCB3ZSBtYXkgbm90IGhhdmUgYW55dGhpbmcgdG8gZGVsZXRlLlxuICAgICAgICBpZiAodG9EZWxldGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSBjZWxscyBhcyBvbmUgdW5kbyBldmVudC5cbiAgICAgICAgICAgIGNlbGxzLmJlZ2luQ29tcG91bmRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgIC8vIERlbGV0ZSBjZWxscyBpbiByZXZlcnNlIG9yZGVyIHRvIG1haW50YWluIHRoZSBjb3JyZWN0IGluZGljZXMuXG4gICAgICAgICAgICB0b0RlbGV0ZS5yZXZlcnNlKCkuZm9yRWFjaChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgY2VsbHMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gQWRkIGEgbmV3IGNlbGwgaWYgdGhlIG5vdGVib29rIGlzIGVtcHR5LiBUaGlzIGlzIGRvbmVcbiAgICAgICAgICAgIC8vIHdpdGhpbiB0aGUgY29tcG91bmQgb3BlcmF0aW9uIHRvIG1ha2UgdGhlIGRlbGV0aW9uIG9mXG4gICAgICAgICAgICAvLyBhIG5vdGVib29rJ3MgbGFzdCBjZWxsIHVuZG9hYmxlLlxuICAgICAgICAgICAgaWYgKCFjZWxscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjZWxscy5wdXNoKG1vZGVsLmNvbnRlbnRGYWN0b3J5LmNyZWF0ZUNlbGwobm90ZWJvb2subm90ZWJvb2tDb25maWcuZGVmYXVsdENlbGwsIHt9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjZWxscy5lbmRDb21wb3VuZE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgLy8gU2VsZWN0IHRoZSAqZmlyc3QqIGludGVyaW9yIGNlbGwgbm90IGRlbGV0ZWQgb3IgdGhlIGNlbGxcbiAgICAgICAgICAgIC8vICphZnRlciogdGhlIGxhc3Qgc2VsZWN0ZWQgY2VsbC5cbiAgICAgICAgICAgIC8vIE5vdGU6IFRoZSBhY3RpdmVDZWxsSW5kZXggaXMgY2xhbXBlZCB0byB0aGUgYXZhaWxhYmxlIGNlbGxzLFxuICAgICAgICAgICAgLy8gc28gaWYgdGhlIGxhc3QgY2VsbCBpcyBkZWxldGVkIHRoZSBwcmV2aW91cyBjZWxsIHdpbGwgYmUgYWN0aXZhdGVkLlxuICAgICAgICAgICAgLy8gVGhlICpmaXJzdCogaW5kZXggaXMgdGhlIGluZGV4IG9mIHRoZSBsYXN0IGNlbGwgaW4gdGhlIGluaXRpYWxcbiAgICAgICAgICAgIC8vIHRvRGVsZXRlIGxpc3QgZHVlIHRvIHRoZSBgcmV2ZXJzZWAgb3BlcmF0aW9uIGFib3ZlLlxuICAgICAgICAgICAgbm90ZWJvb2suYWN0aXZlQ2VsbEluZGV4ID0gdG9EZWxldGVbMF0gLSB0b0RlbGV0ZS5sZW5ndGggKyAxO1xuICAgICAgICB9XG4gICAgICAgIC8vIERlc2VsZWN0IGFueSByZW1haW5pbmcsIHVuZGVsZXRhYmxlIGNlbGxzLiBEbyB0aGlzIGV2ZW4gaWYgd2UgZG9uJ3RcbiAgICAgICAgLy8gZGVsZXRlIGFueXRoaW5nIHNvIHRoYXQgdXNlcnMgYXJlIGF3YXJlICpzb21ldGhpbmcqIGhhcHBlbmVkLlxuICAgICAgICBub3RlYm9vay5kZXNlbGVjdEFsbCgpO1xuICAgIH1cbiAgICBQcml2YXRlLmRlbGV0ZUNlbGxzID0gZGVsZXRlQ2VsbHM7XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBtYXJrZG93biBoZWFkZXIgbGV2ZWwgb2YgYSBjZWxsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNldE1hcmtkb3duSGVhZGVyKGNlbGwsIGxldmVsKSB7XG4gICAgICAgIC8vIFJlbW92ZSBleGlzdGluZyBoZWFkZXIgb3IgbGVhZGluZyB3aGl0ZSBzcGFjZS5cbiAgICAgICAgbGV0IHNvdXJjZSA9IGNlbGwudmFsdWUudGV4dDtcbiAgICAgICAgY29uc3QgcmVnZXggPSAvXigjK1xccyopfF4oXFxzKikvO1xuICAgICAgICBjb25zdCBuZXdIZWFkZXIgPSBBcnJheShsZXZlbCArIDEpLmpvaW4oJyMnKSArICcgJztcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHJlZ2V4LmV4ZWMoc291cmNlKTtcbiAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgIHNvdXJjZSA9IHNvdXJjZS5zbGljZShtYXRjaGVzWzBdLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgY2VsbC52YWx1ZS50ZXh0ID0gbmV3SGVhZGVyICsgc291cmNlO1xuICAgIH1cbiAgICBQcml2YXRlLnNldE1hcmtkb3duSGVhZGVyID0gc2V0TWFya2Rvd25IZWFkZXI7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFjdGlvbnMuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgT2JzZXJ2YWJsZU1hcCB9IGZyb20gJ0BqdXB5dGVybGFiL29ic2VydmFibGVzJztcbmltcG9ydCAqIGFzIG1vZGVscyBmcm9tICdAanVweXRlcmxhYi9zaGFyZWQtbW9kZWxzJztcbmltcG9ydCB7IEFycmF5RXh0LCBBcnJheUl0ZXJhdG9yLCBlYWNoLCB0b0FycmF5IH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuLyoqXG4gKiBBIGNlbGwgbGlzdCBvYmplY3QgdGhhdCBzdXBwb3J0cyB1bmRvL3JlZG8uXG4gKi9cbmV4cG9ydCBjbGFzcyBDZWxsTGlzdCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IHRoZSBjZWxsIGxpc3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobW9kZWxEQiwgZmFjdG9yeSwgbW9kZWwpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByZXZlbnRzIHRoYXQgdGhlIG1vZGVsZGIgZXZlbnQgaGFuZGxlciBpcyBleGVjdXRlZCB3aGVuIHRoZSBzaGFyZWQtbW9kZWwgZXZlbnQgaGFuZGxlciBpcyBleGVjdXRlZCBhbmQgdmljZS12ZXJzYS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX211dGV4ID0gbW9kZWxzLmNyZWF0ZU11dGV4KCk7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2ZhY3RvcnkgPSBmYWN0b3J5O1xuICAgICAgICB0aGlzLl9jZWxsT3JkZXIgPSBtb2RlbERCLmNyZWF0ZUxpc3QoJ2NlbGxPcmRlcicpO1xuICAgICAgICB0aGlzLl9jZWxsTWFwID0gbmV3IE9ic2VydmFibGVNYXAoKTtcbiAgICAgICAgdGhpcy5fY2VsbE9yZGVyLmNoYW5nZWQuY29ubmVjdCh0aGlzLl9vbk9yZGVyQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMubmJtb2RlbCA9IG1vZGVsO1xuICAgICAgICB0aGlzLm5ibW9kZWwuY2hhbmdlZC5jb25uZWN0KHRoaXMub25TaGFyZWRNb2RlbENoYW5nZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLmNoYW5nZWQuY29ubmVjdCh0aGlzLm9uTW9kZWxEQkNoYW5nZWQsIHRoaXMpO1xuICAgIH1cbiAgICBvbk1vZGVsREJDaGFuZ2VkKHNlbGYsIGNoYW5nZSkge1xuICAgICAgICB0aGlzLl9tdXRleCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYm1vZGVsID0gdGhpcy5uYm1vZGVsO1xuICAgICAgICAgICAgbmJtb2RlbC50cmFuc2FjdCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZS50eXBlID09PSAnc2V0JyB8fCBjaGFuZ2UudHlwZSA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgbmJtb2RlbC5kZWxldGVDZWxsUmFuZ2UoY2hhbmdlLm9sZEluZGV4LCBjaGFuZ2Uub2xkSW5kZXggKyBjaGFuZ2Uub2xkVmFsdWVzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UudHlwZSA9PT0gJ3NldCcgfHxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlLnR5cGUgPT09ICdhZGQnIHx8XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZS50eXBlID09PSAnbW92ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbHMgPSBjaGFuZ2UubmV3VmFsdWVzLm1hcChjZWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjZWxsLnNoYXJlZE1vZGVsLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5zZXJ0TG9jYXRpb24gPSBjaGFuZ2UubmV3SW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UudHlwZSA9PT0gJ21vdmUnICYmIGluc2VydExvY2F0aW9uID4gY2hhbmdlLm9sZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRMb2NhdGlvbiArPSBjaGFuZ2Uub2xkVmFsdWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBuYm1vZGVsLmluc2VydENlbGxzKGluc2VydExvY2F0aW9uLCBjZWxscyk7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZS5uZXdWYWx1ZXMuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuc3dpdGNoU2hhcmVkTW9kZWwoY2VsbHNbaW5kZXhdLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlLnR5cGUgPT09ICdtb3ZlJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbSA9IGNoYW5nZS5vbGRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZyb20gPj0gY2hhbmdlLm5ld0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tICs9IGNoYW5nZS5vbGRWYWx1ZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5ibW9kZWwuZGVsZXRlQ2VsbFJhbmdlKGZyb20sIGZyb20gKyBjaGFuZ2Uub2xkVmFsdWVzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblNoYXJlZE1vZGVsQ2hhbmdlZChzZWxmLCBjaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5fbXV0ZXgoKCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgbGV0IGN1cnJwb3MgPSAwO1xuICAgICAgICAgICAgKF9hID0gY2hhbmdlLmNlbGxzQ2hhbmdlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9yRWFjaChkZWx0YSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhLmluc2VydCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxzID0gZGVsdGEuaW5zZXJ0Lm1hcChuYmNlbGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuX2ZhY3RvcnkuY3JlYXRlQ2VsbChuYmNlbGwuY2VsbF90eXBlLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLnN3aXRjaFNoYXJlZE1vZGVsKG5iY2VsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2VsbDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0QWxsKGN1cnJwb3MsIGNlbGxzKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycnBvcyArPSBkZWx0YS5pbnNlcnQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkZWx0YS5kZWxldGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVJhbmdlKGN1cnJwb3MsIGN1cnJwb3MgKyBkZWx0YS5kZWxldGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkZWx0YS5yZXRhaW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJycG9zICs9IGRlbHRhLnJldGFpbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgY2VsbCBsaXN0IGhhcyBjaGFuZ2VkLlxuICAgICAqL1xuICAgIGdldCBjaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIHRoZSBjZWxsIGxpc3QgaGFzIGJlZW4gZGlzcG9zZWQuXG4gICAgICovXG4gICAgZ2V0IGlzRGlzcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0Rpc3Bvc2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUZXN0IHdoZXRoZXIgdGhlIGxpc3QgaXMgZW1wdHkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGNlbGwgbGlzdCBpcyBlbXB0eSwgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBpcyBhIHJlYWQtb25seSBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqICMjIyMgQ29tcGxleGl0eVxuICAgICAqIENvbnN0YW50LlxuICAgICAqXG4gICAgICogIyMjIyBJdGVyYXRvciBWYWxpZGl0eVxuICAgICAqIE5vIGNoYW5nZXMuXG4gICAgICovXG4gICAgZ2V0IGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsT3JkZXIubGVuZ3RoID09PSAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGxlbmd0aCBvZiB0aGUgY2VsbCBsaXN0LlxuICAgICAqXG4gICAgICogQHJldHVybiBUaGUgbnVtYmVyIG9mIGNlbGxzIGluIHRoZSBjZWxsIGxpc3QuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBpcyBhIHJlYWQtb25seSBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqICMjIyMgQ29tcGxleGl0eVxuICAgICAqIENvbnN0YW50LlxuICAgICAqXG4gICAgICogIyMjIyBJdGVyYXRvciBWYWxpZGl0eVxuICAgICAqIE5vIGNoYW5nZXMuXG4gICAgICovXG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxPcmRlci5sZW5ndGg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBpdGVyYXRvciBvdmVyIHRoZSBjZWxscyBpbiB0aGUgY2VsbCBsaXN0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBuZXcgaXRlcmF0b3Igc3RhcnRpbmcgYXQgdGhlIGZyb250IG9mIHRoZSBjZWxsIGxpc3QuXG4gICAgICpcbiAgICAgKiAjIyMjIENvbXBsZXhpdHlcbiAgICAgKiBDb25zdGFudC5cbiAgICAgKlxuICAgICAqICMjIyMgSXRlcmF0b3IgVmFsaWRpdHlcbiAgICAgKiBObyBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGl0ZXIoKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGlkIG9mIHRvQXJyYXkodGhpcy5fY2VsbE9yZGVyKSkge1xuICAgICAgICAgICAgYXJyLnB1c2godGhpcy5fY2VsbE1hcC5nZXQoaWQpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEFycmF5SXRlcmF0b3IoYXJyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIGNlbGwgbGlzdC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5faXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICBTaWduYWwuY2xlYXJEYXRhKHRoaXMpO1xuICAgICAgICAvLyBDbGVhbiB1cCB0aGUgY2VsbCBtYXAgYW5kIGNlbGwgb3JkZXIgb2JqZWN0cy5cbiAgICAgICAgZm9yIChjb25zdCBjZWxsIG9mIHRoaXMuX2NlbGxNYXAudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGNlbGwuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NlbGxNYXAuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9jZWxsT3JkZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNlbGwgYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCAtIFRoZSBwb3NpdGl2ZSBpbnRlZ2VyIGluZGV4IG9mIGludGVyZXN0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIGNlbGwgYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAgICAgKlxuICAgICAqICMjIyMgQ29tcGxleGl0eVxuICAgICAqIENvbnN0YW50LlxuICAgICAqXG4gICAgICogIyMjIyBJdGVyYXRvciBWYWxpZGl0eVxuICAgICAqIE5vIGNoYW5nZXMuXG4gICAgICpcbiAgICAgKiAjIyMjIFVuZGVmaW5lZCBCZWhhdmlvclxuICAgICAqIEFuIGBpbmRleGAgd2hpY2ggaXMgbm9uLWludGVncmFsIG9yIG91dCBvZiByYW5nZS5cbiAgICAgKi9cbiAgICBnZXQoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxNYXAuZ2V0KHRoaXMuX2NlbGxPcmRlci5nZXQoaW5kZXgpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjZWxsIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggLSBUaGUgcG9zaXRpdmUgaW50ZWdlciBpbmRleCBvZiBpbnRlcmVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjZWxsIC0gVGhlIGNlbGwgdG8gc2V0IGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICpcbiAgICAgKiAjIyMjIENvbXBsZXhpdHlcbiAgICAgKiBDb25zdGFudC5cbiAgICAgKlxuICAgICAqICMjIyMgSXRlcmF0b3IgVmFsaWRpdHlcbiAgICAgKiBObyBjaGFuZ2VzLlxuICAgICAqXG4gICAgICogIyMjIyBVbmRlZmluZWQgQmVoYXZpb3JcbiAgICAgKiBBbiBgaW5kZXhgIHdoaWNoIGlzIG5vbi1pbnRlZ3JhbCBvciBvdXQgb2YgcmFuZ2UuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBzaG91bGQgYmUgY29uc2lkZXJlZCB0byB0cmFuc2ZlciBvd25lcnNoaXAgb2YgdGhlXG4gICAgICogY2VsbCB0byB0aGUgYENlbGxMaXN0YC4gQXMgc3VjaCwgYGNlbGwuZGlzcG9zZSgpYCBzaG91bGRcbiAgICAgKiBub3QgYmUgY2FsbGVkIGJ5IG90aGVyIGFjdG9ycy5cbiAgICAgKi9cbiAgICBzZXQoaW5kZXgsIGNlbGwpIHtcbiAgICAgICAgLy8gU2V0IHRoZSBpbnRlcm5hbCBkYXRhIHN0cnVjdHVyZXMuXG4gICAgICAgIHRoaXMuX2NlbGxNYXAuc2V0KGNlbGwuaWQsIGNlbGwpO1xuICAgICAgICB0aGlzLl9jZWxsT3JkZXIuc2V0KGluZGV4LCBjZWxsLmlkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgY2VsbCB0byB0aGUgYmFjayBvZiB0aGUgY2VsbCBsaXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNlbGwgLSBUaGUgY2VsbCB0byBhZGQgdG8gdGhlIGJhY2sgb2YgdGhlIGNlbGwgbGlzdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXcgbGVuZ3RoIG9mIHRoZSBjZWxsIGxpc3QuXG4gICAgICpcbiAgICAgKiAjIyMjIENvbXBsZXhpdHlcbiAgICAgKiBDb25zdGFudC5cbiAgICAgKlxuICAgICAqICMjIyMgSXRlcmF0b3IgVmFsaWRpdHlcbiAgICAgKiBObyBjaGFuZ2VzLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgc2hvdWxkIGJlIGNvbnNpZGVyZWQgdG8gdHJhbnNmZXIgb3duZXJzaGlwIG9mIHRoZVxuICAgICAqIGNlbGwgdG8gdGhlIGBDZWxsTGlzdGAuIEFzIHN1Y2gsIGBjZWxsLmRpc3Bvc2UoKWAgc2hvdWxkXG4gICAgICogbm90IGJlIGNhbGxlZCBieSBvdGhlciBhY3RvcnMuXG4gICAgICovXG4gICAgcHVzaChjZWxsKSB7XG4gICAgICAgIC8vIFNldCB0aGUgaW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmVzLlxuICAgICAgICB0aGlzLl9jZWxsTWFwLnNldChjZWxsLmlkLCBjZWxsKTtcbiAgICAgICAgY29uc3QgbnVtID0gdGhpcy5fY2VsbE9yZGVyLnB1c2goY2VsbC5pZCk7XG4gICAgICAgIHJldHVybiBudW07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydCBhIGNlbGwgaW50byB0aGUgY2VsbCBsaXN0IGF0IGEgc3BlY2lmaWMgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggLSBUaGUgaW5kZXggYXQgd2hpY2ggdG8gaW5zZXJ0IHRoZSBjZWxsLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNlbGwgLSBUaGUgY2VsbCB0byBzZXQgYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXcgbGVuZ3RoIG9mIHRoZSBjZWxsIGxpc3QuXG4gICAgICpcbiAgICAgKiAjIyMjIENvbXBsZXhpdHlcbiAgICAgKiBMaW5lYXIuXG4gICAgICpcbiAgICAgKiAjIyMjIEl0ZXJhdG9yIFZhbGlkaXR5XG4gICAgICogTm8gY2hhbmdlcy5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgYGluZGV4YCB3aWxsIGJlIGNsYW1wZWQgdG8gdGhlIGJvdW5kcyBvZiB0aGUgY2VsbCBsaXN0LlxuICAgICAqXG4gICAgICogIyMjIyBVbmRlZmluZWQgQmVoYXZpb3JcbiAgICAgKiBBbiBgaW5kZXhgIHdoaWNoIGlzIG5vbi1pbnRlZ3JhbC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIHNob3VsZCBiZSBjb25zaWRlcmVkIHRvIHRyYW5zZmVyIG93bmVyc2hpcCBvZiB0aGVcbiAgICAgKiBjZWxsIHRvIHRoZSBgQ2VsbExpc3RgLiBBcyBzdWNoLCBgY2VsbC5kaXNwb3NlKClgIHNob3VsZFxuICAgICAqIG5vdCBiZSBjYWxsZWQgYnkgb3RoZXIgYWN0b3JzLlxuICAgICAqL1xuICAgIGluc2VydChpbmRleCwgY2VsbCkge1xuICAgICAgICAvLyBTZXQgdGhlIGludGVybmFsIGRhdGEgc3RydWN0dXJlcy5cbiAgICAgICAgdGhpcy5fY2VsbE1hcC5zZXQoY2VsbC5pZCwgY2VsbCk7XG4gICAgICAgIHRoaXMuX2NlbGxPcmRlci5pbnNlcnQoaW5kZXgsIGNlbGwuaWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYSBjZWxsIGZyb20gdGhlIGNlbGwgbGlzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjZWxsIC0gVGhlIGNlbGwgb2YgaW50ZXJlc3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgaW5kZXggb2YgdGhlIHJlbW92ZWQgY2VsbCwgb3IgYC0xYCBpZiB0aGUgY2VsbFxuICAgICAqICAgaXMgbm90IGNvbnRhaW5lZCBpbiB0aGUgY2VsbCBsaXN0LlxuICAgICAqXG4gICAgICogIyMjIyBDb21wbGV4aXR5XG4gICAgICogTGluZWFyLlxuICAgICAqXG4gICAgICogIyMjIyBJdGVyYXRvciBWYWxpZGl0eVxuICAgICAqIEl0ZXJhdG9ycyBwb2ludGluZyBhdCB0aGUgcmVtb3ZlZCBjZWxsIGFuZCBiZXlvbmQgYXJlIGludmFsaWRhdGVkLlxuICAgICAqL1xuICAgIHJlbW92ZVZhbHVlKGNlbGwpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBBcnJheUV4dC5maW5kRmlyc3RJbmRleCh0b0FycmF5KHRoaXMuX2NlbGxPcmRlciksIGlkID0+IHRoaXMuX2NlbGxNYXAuZ2V0KGlkKSA9PT0gY2VsbCk7XG4gICAgICAgIHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYW5kIHJldHVybiB0aGUgY2VsbCBhdCBhIHNwZWNpZmljIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBjZWxsIG9mIGludGVyZXN0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIGNlbGwgYXQgdGhlIHNwZWNpZmllZCBpbmRleCwgb3IgYHVuZGVmaW5lZGAgaWYgdGhlXG4gICAgICogICBpbmRleCBpcyBvdXQgb2YgcmFuZ2UuXG4gICAgICpcbiAgICAgKiAjIyMjIENvbXBsZXhpdHlcbiAgICAgKiBDb25zdGFudC5cbiAgICAgKlxuICAgICAqICMjIyMgSXRlcmF0b3IgVmFsaWRpdHlcbiAgICAgKiBJdGVyYXRvcnMgcG9pbnRpbmcgYXQgdGhlIHJlbW92ZWQgY2VsbCBhbmQgYmV5b25kIGFyZSBpbnZhbGlkYXRlZC5cbiAgICAgKlxuICAgICAqICMjIyMgVW5kZWZpbmVkIEJlaGF2aW9yXG4gICAgICogQW4gYGluZGV4YCB3aGljaCBpcyBub24taW50ZWdyYWwuXG4gICAgICovXG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5fY2VsbE9yZGVyLmdldChpbmRleCk7XG4gICAgICAgIHRoaXMuX2NlbGxPcmRlci5yZW1vdmUoaW5kZXgpO1xuICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5fY2VsbE1hcC5nZXQoaWQpO1xuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBjZWxscyBmcm9tIHRoZSBjZWxsIGxpc3QuXG4gICAgICpcbiAgICAgKiAjIyMjIENvbXBsZXhpdHlcbiAgICAgKiBMaW5lYXIuXG4gICAgICpcbiAgICAgKiAjIyMjIEl0ZXJhdG9yIFZhbGlkaXR5XG4gICAgICogQWxsIGN1cnJlbnQgaXRlcmF0b3JzIGFyZSBpbnZhbGlkYXRlZC5cbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fY2VsbE9yZGVyLmNsZWFyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1vdmUgYSBjZWxsIGZyb20gb25lIGluZGV4IHRvIGFub3RoZXIuXG4gICAgICpcbiAgICAgKiBAcGFybSBmcm9tSW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgdG8gbW92ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0b0luZGV4IC0gVGhlIGluZGV4IHRvIG1vdmUgdGhlIGVsZW1lbnQgdG8uXG4gICAgICpcbiAgICAgKiAjIyMjIENvbXBsZXhpdHlcbiAgICAgKiBDb25zdGFudC5cbiAgICAgKlxuICAgICAqICMjIyMgSXRlcmF0b3IgVmFsaWRpdHlcbiAgICAgKiBJdGVyYXRvcnMgcG9pbnRpbmcgYXQgdGhlIGxlc3NlciBvZiB0aGUgYGZyb21JbmRleGAgYW5kIHRoZSBgdG9JbmRleGBcbiAgICAgKiBhbmQgYmV5b25kIGFyZSBpbnZhbGlkYXRlZC5cbiAgICAgKlxuICAgICAqICMjIyMgVW5kZWZpbmVkIEJlaGF2aW9yXG4gICAgICogQSBgZnJvbUluZGV4YCBvciBhIGB0b0luZGV4YCB3aGljaCBpcyBub24taW50ZWdyYWwuXG4gICAgICovXG4gICAgbW92ZShmcm9tSW5kZXgsIHRvSW5kZXgpIHtcbiAgICAgICAgdGhpcy5fY2VsbE9yZGVyLm1vdmUoZnJvbUluZGV4LCB0b0luZGV4KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaCBhIHNldCBvZiBjZWxscyB0byB0aGUgYmFjayBvZiB0aGUgY2VsbCBsaXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNlbGxzIC0gQW4gaXRlcmFibGUgb3IgYXJyYXktbGlrZSBzZXQgb2YgY2VsbHMgdG8gYWRkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ldyBsZW5ndGggb2YgdGhlIGNlbGwgbGlzdC5cbiAgICAgKlxuICAgICAqICMjIyMgQ29tcGxleGl0eVxuICAgICAqIExpbmVhci5cbiAgICAgKlxuICAgICAqICMjIyMgSXRlcmF0b3IgVmFsaWRpdHlcbiAgICAgKiBObyBjaGFuZ2VzLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgc2hvdWxkIGJlIGNvbnNpZGVyZWQgdG8gdHJhbnNmZXIgb3duZXJzaGlwIG9mIHRoZVxuICAgICAqIGNlbGxzIHRvIHRoZSBgQ2VsbExpc3RgLiBBcyBzdWNoLCBgY2VsbC5kaXNwb3NlKClgIHNob3VsZFxuICAgICAqIG5vdCBiZSBjYWxsZWQgYnkgb3RoZXIgYWN0b3JzLlxuICAgICAqL1xuICAgIHB1c2hBbGwoY2VsbHMpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWVzID0gdG9BcnJheShjZWxscyk7XG4gICAgICAgIGVhY2gobmV3VmFsdWVzLCBjZWxsID0+IHtcbiAgICAgICAgICAgIC8vIFNldCB0aGUgaW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmVzLlxuICAgICAgICAgICAgdGhpcy5fY2VsbE1hcC5zZXQoY2VsbC5pZCwgY2VsbCk7XG4gICAgICAgICAgICB0aGlzLl9jZWxsT3JkZXIucHVzaChjZWxsLmlkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmxlbmd0aDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0IGEgc2V0IG9mIGl0ZW1zIGludG8gdGhlIGNlbGwgbGlzdCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IC0gVGhlIGluZGV4IGF0IHdoaWNoIHRvIGluc2VydCB0aGUgY2VsbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2VsbHMgLSBUaGUgY2VsbHMgdG8gaW5zZXJ0IGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3IGxlbmd0aCBvZiB0aGUgY2VsbCBsaXN0LlxuICAgICAqXG4gICAgICogIyMjIyBDb21wbGV4aXR5LlxuICAgICAqIExpbmVhci5cbiAgICAgKlxuICAgICAqICMjIyMgSXRlcmF0b3IgVmFsaWRpdHlcbiAgICAgKiBObyBjaGFuZ2VzLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSBgaW5kZXhgIHdpbGwgYmUgY2xhbXBlZCB0byB0aGUgYm91bmRzIG9mIHRoZSBjZWxsIGxpc3QuXG4gICAgICpcbiAgICAgKiAjIyMjIFVuZGVmaW5lZCBCZWhhdmlvci5cbiAgICAgKiBBbiBgaW5kZXhgIHdoaWNoIGlzIG5vbi1pbnRlZ3JhbC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIHNob3VsZCBiZSBjb25zaWRlcmVkIHRvIHRyYW5zZmVyIG93bmVyc2hpcCBvZiB0aGVcbiAgICAgKiBjZWxscyB0byB0aGUgYENlbGxMaXN0YC4gQXMgc3VjaCwgYGNlbGwuZGlzcG9zZSgpYCBzaG91bGRcbiAgICAgKiBub3QgYmUgY2FsbGVkIGJ5IG90aGVyIGFjdG9ycy5cbiAgICAgKi9cbiAgICBpbnNlcnRBbGwoaW5kZXgsIGNlbGxzKSB7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlcyA9IHRvQXJyYXkoY2VsbHMpO1xuICAgICAgICBlYWNoKG5ld1ZhbHVlcywgY2VsbCA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jZWxsTWFwLnNldChjZWxsLmlkLCBjZWxsKTtcbiAgICAgICAgICAgIC8vIEB0b2RvIGl0IGxvb2tzIGxpa2UgdGhpcyBjb21wb3VuZCBvcGVyYXRpb24gc2hvdWx0IHN0YXJ0IGJlZm9yZSB0aGUgYGVhY2hgIGxvb3AuXG4gICAgICAgICAgICB0aGlzLl9jZWxsT3JkZXIuYmVnaW5Db21wb3VuZE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5fY2VsbE9yZGVyLmluc2VydChpbmRleCsrLCBjZWxsLmlkKTtcbiAgICAgICAgICAgIHRoaXMuX2NlbGxPcmRlci5lbmRDb21wb3VuZE9wZXJhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSByYW5nZSBvZiBpdGVtcyBmcm9tIHRoZSBjZWxsIGxpc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RhcnRJbmRleCAtIFRoZSBzdGFydCBpbmRleCBvZiB0aGUgcmFuZ2UgdG8gcmVtb3ZlIChpbmNsdXNpdmUpLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVuZEluZGV4IC0gVGhlIGVuZCBpbmRleCBvZiB0aGUgcmFuZ2UgdG8gcmVtb3ZlIChleGNsdXNpdmUpLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ldyBsZW5ndGggb2YgdGhlIGNlbGwgbGlzdC5cbiAgICAgKlxuICAgICAqICMjIyMgQ29tcGxleGl0eVxuICAgICAqIExpbmVhci5cbiAgICAgKlxuICAgICAqICMjIyMgSXRlcmF0b3IgVmFsaWRpdHlcbiAgICAgKiBJdGVyYXRvcnMgcG9pbnRpbmcgdG8gdGhlIGZpcnN0IHJlbW92ZWQgY2VsbCBhbmQgYmV5b25kIGFyZSBpbnZhbGlkLlxuICAgICAqXG4gICAgICogIyMjIyBVbmRlZmluZWQgQmVoYXZpb3JcbiAgICAgKiBBIGBzdGFydEluZGV4YCBvciBgZW5kSW5kZXhgIHdoaWNoIGlzIG5vbi1pbnRlZ3JhbC5cbiAgICAgKi9cbiAgICByZW1vdmVSYW5nZShzdGFydEluZGV4LCBlbmRJbmRleCkge1xuICAgICAgICB0aGlzLl9jZWxsT3JkZXIucmVtb3ZlUmFuZ2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIG9iamVjdCBjYW4gcmVkbyBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGdldCBjYW5SZWRvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYm1vZGVsLmNhblJlZG8oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgb2JqZWN0IGNhbiB1bmRvIGNoYW5nZXMuXG4gICAgICovXG4gICAgZ2V0IGNhblVuZG8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ibW9kZWwuY2FuVW5kbygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCZWdpbiBhIGNvbXBvdW5kIG9wZXJhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpc1VuZG9BYmxlIC0gV2hldGhlciB0aGUgb3BlcmF0aW9uIGlzIHVuZG9hYmxlLlxuICAgICAqICAgVGhlIGRlZmF1bHQgaXMgYHRydWVgLlxuICAgICAqL1xuICAgIGJlZ2luQ29tcG91bmRPcGVyYXRpb24oaXNVbmRvQWJsZSkge1xuICAgICAgICB0aGlzLl9jZWxsT3JkZXIuYmVnaW5Db21wb3VuZE9wZXJhdGlvbihpc1VuZG9BYmxlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5kIGEgY29tcG91bmQgb3BlcmF0aW9uLlxuICAgICAqL1xuICAgIGVuZENvbXBvdW5kT3BlcmF0aW9uKCkge1xuICAgICAgICB0aGlzLl9jZWxsT3JkZXIuZW5kQ29tcG91bmRPcGVyYXRpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVW5kbyBhbiBvcGVyYXRpb24uXG4gICAgICovXG4gICAgdW5kbygpIHtcbiAgICAgICAgdGhpcy5uYm1vZGVsLnVuZG8oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVkbyBhbiBvcGVyYXRpb24uXG4gICAgICovXG4gICAgcmVkbygpIHtcbiAgICAgICAgdGhpcy5uYm1vZGVsLnJlZG8oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYXIgdGhlIGNoYW5nZSBzdGFjay5cbiAgICAgKi9cbiAgICBjbGVhclVuZG8oKSB7XG4gICAgICAgIHRoaXMubmJtb2RlbC5jbGVhclVuZG9IaXN0b3J5KCk7XG4gICAgfVxuICAgIF9vbk9yZGVyQ2hhbmdlZChvcmRlciwgY2hhbmdlKSB7XG4gICAgICAgIGlmIChjaGFuZ2UudHlwZSA9PT0gJ2FkZCcgfHwgY2hhbmdlLnR5cGUgPT09ICdzZXQnKSB7XG4gICAgICAgICAgICBlYWNoKGNoYW5nZS5uZXdWYWx1ZXMsIGlkID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBleGlzdGluZ0NlbGwgPSB0aGlzLl9jZWxsTWFwLmdldChpZCk7XG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nQ2VsbCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxEQiA9IHRoaXMuX2ZhY3RvcnkubW9kZWxEQjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbFR5cGUgPSBjZWxsREIuY3JlYXRlVmFsdWUoaWQgKyAnLnR5cGUnKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGw7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY2VsbFR5cGUuZ2V0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NvZGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwgPSB0aGlzLl9mYWN0b3J5LmNyZWF0ZUNvZGVDZWxsKHsgaWQ6IGlkIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWFya2Rvd24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwgPSB0aGlzLl9mYWN0b3J5LmNyZWF0ZU1hcmtkb3duQ2VsbCh7IGlkOiBpZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbCA9IHRoaXMuX2ZhY3RvcnkuY3JlYXRlUmF3Q2VsbCh7IGlkOiBpZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZWxsTWFwLnNldChpZCwgY2VsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFleGlzdGluZ0NlbGwuc2hhcmVkTW9kZWwuaXNTdGFuZGFsb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX211dGV4KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0IGRvZXMgYWxyZWFkeSBleGlzdCwgcHJvYmFibHkgYmVjYXVzZSBpdCB3YXMgZGVsZXRlZCBwcmV2aW91c2x5IGFuZCB3ZSBpbnRyb2R1Y2VkIGl0XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb3B5IGl0IHRvIGEgZnJlc2ggY29kZWNlbGwgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBleGlzdGluZ0NlbGwudG9KU09OKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJlc2hDZWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY2VsbC5jZWxsX3R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjb2RlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJlc2hDZWxsID0gdGhpcy5fZmFjdG9yeS5jcmVhdGVDb2RlQ2VsbCh7IGNlbGwgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ21hcmtkb3duJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJlc2hDZWxsID0gdGhpcy5fZmFjdG9yeS5jcmVhdGVNYXJrZG93bkNlbGwoeyBjZWxsIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmVzaENlbGwgPSB0aGlzLl9mYWN0b3J5LmNyZWF0ZVJhd0NlbGwoeyBjZWxsIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NlbGxNYXAuc2V0KGlkLCBmcmVzaENlbGwpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdWYWx1ZXMgPSBbXTtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWVzID0gW107XG4gICAgICAgIGVhY2goY2hhbmdlLm5ld1ZhbHVlcywgaWQgPT4ge1xuICAgICAgICAgICAgbmV3VmFsdWVzLnB1c2godGhpcy5fY2VsbE1hcC5nZXQoaWQpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVhY2goY2hhbmdlLm9sZFZhbHVlcywgaWQgPT4ge1xuICAgICAgICAgICAgb2xkVmFsdWVzLnB1c2godGhpcy5fY2VsbE1hcC5nZXQoaWQpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiBjaGFuZ2UudHlwZSxcbiAgICAgICAgICAgIG9sZEluZGV4OiBjaGFuZ2Uub2xkSW5kZXgsXG4gICAgICAgICAgICBuZXdJbmRleDogY2hhbmdlLm5ld0luZGV4LFxuICAgICAgICAgICAgb2xkVmFsdWVzLFxuICAgICAgICAgICAgbmV3VmFsdWVzXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNlbGxsaXN0LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IGFkZFRvb2xiYXJCdXR0b25DbGFzcywgRGlhbG9nLCBSZWFjdFdpZGdldCwgc2Vzc2lvbkNvbnRleHREaWFsb2dzLCBzaG93RGlhbG9nLCBUb29sYmFyLCBUb29sYmFyQnV0dG9uLCBUb29sYmFyQnV0dG9uQ29tcG9uZW50LCBVc2VTaWduYWwgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGFkZEljb24sIGNvcHlJY29uLCBjdXRJY29uLCBmYXN0Rm9yd2FyZEljb24sIEhUTUxTZWxlY3QsIHBhc3RlSWNvbiwgcnVuSWNvbiwgc2F2ZUljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE5vdGVib29rQWN0aW9ucyB9IGZyb20gJy4vYWN0aW9ucyc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRvb2xiYXIgY2VsbCB0eXBlIGRyb3Bkb3duIHdyYXBwZXIuXG4gKi9cbmNvbnN0IFRPT0xCQVJfQ0VMTFRZUEVfQ0xBU1MgPSAnanAtTm90ZWJvb2stdG9vbGJhckNlbGxUeXBlJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdG9vbGJhciBjZWxsIHR5cGUgZHJvcGRvd24uXG4gKi9cbmNvbnN0IFRPT0xCQVJfQ0VMTFRZUEVfRFJPUERPV05fQ0xBU1MgPSAnanAtTm90ZWJvb2stdG9vbGJhckNlbGxUeXBlRHJvcGRvd24nO1xuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgdGhlIGRlZmF1bHQgdG9vbGJhciBpdGVtcy5cbiAqL1xuZXhwb3J0IHZhciBUb29sYmFySXRlbXM7XG4oZnVuY3Rpb24gKFRvb2xiYXJJdGVtcykge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBzYXZlIGJ1dHRvbiB0b29sYmFyIGl0ZW0uXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2My4yXG4gICAgICogVGhpcyBpcyBkZWFkIGNvZGUgbm93LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVNhdmVCdXR0b24ocGFuZWwsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSAodHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcikubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBmdW5jdGlvbiBvbkNsaWNrKCkge1xuICAgICAgICAgICAgaWYgKHBhbmVsLmNvbnRleHQubW9kZWwucmVhZE9ubHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFucy5fXygnQ2Fubm90IFNhdmUnKSxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogdHJhbnMuX18oJ0RvY3VtZW50IGlzIHJlYWQtb25seScpLFxuICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbRGlhbG9nLm9rQnV0dG9uKHsgbGFiZWw6IHRyYW5zLl9fKCdPaycpIH0pXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdm9pZCBwYW5lbC5jb250ZXh0LnNhdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXBhbmVsLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhbmVsLmNvbnRleHQuY3JlYXRlQ2hlY2twb2ludCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhZGRUb29sYmFyQnV0dG9uQ2xhc3MoUmVhY3RXaWRnZXQuY3JlYXRlKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVXNlU2lnbmFsLCB7IHNpZ25hbDogcGFuZWwuY29udGV4dC5maWxlQ2hhbmdlZCB9LCAoKSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChUb29sYmFyQnV0dG9uQ29tcG9uZW50LCB7IGljb246IHNhdmVJY29uLCBvbkNsaWNrOiBvbkNsaWNrLCB0b29sdGlwOiB0cmFucy5fXygnU2F2ZSB0aGUgbm90ZWJvb2sgY29udGVudHMgYW5kIGNyZWF0ZSBjaGVja3BvaW50JyksIGVuYWJsZWQ6ICEhKHBhbmVsICYmXG4gICAgICAgICAgICAgICAgcGFuZWwuY29udGV4dCAmJlxuICAgICAgICAgICAgICAgIHBhbmVsLmNvbnRleHQuY29udGVudHNNb2RlbCAmJlxuICAgICAgICAgICAgICAgIHBhbmVsLmNvbnRleHQuY29udGVudHNNb2RlbC53cml0YWJsZSkgfSkpKSkpO1xuICAgIH1cbiAgICBUb29sYmFySXRlbXMuY3JlYXRlU2F2ZUJ1dHRvbiA9IGNyZWF0ZVNhdmVCdXR0b247XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGluc2VydCB0b29sYmFyIGl0ZW0uXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2My4yXG4gICAgICogVGhpcyBpcyBkZWFkIGNvZGUgbm93LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUluc2VydEJ1dHRvbihwYW5lbCwgdHJhbnNsYXRvcikge1xuICAgICAgICBjb25zdCB0cmFucyA9ICh0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yKS5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHJldHVybiBuZXcgVG9vbGJhckJ1dHRvbih7XG4gICAgICAgICAgICBpY29uOiBhZGRJY29uLFxuICAgICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgIE5vdGVib29rQWN0aW9ucy5pbnNlcnRCZWxvdyhwYW5lbC5jb250ZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiB0cmFucy5fXygnSW5zZXJ0IGEgY2VsbCBiZWxvdycpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBUb29sYmFySXRlbXMuY3JlYXRlSW5zZXJ0QnV0dG9uID0gY3JlYXRlSW5zZXJ0QnV0dG9uO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGN1dCB0b29sYmFyIGl0ZW0uXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2My4yXG4gICAgICogVGhpcyBpcyBkZWFkIGNvZGUgbm93LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUN1dEJ1dHRvbihwYW5lbCwgdHJhbnNsYXRvcikge1xuICAgICAgICBjb25zdCB0cmFucyA9ICh0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yKS5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHJldHVybiBuZXcgVG9vbGJhckJ1dHRvbih7XG4gICAgICAgICAgICBpY29uOiBjdXRJY29uLFxuICAgICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgIE5vdGVib29rQWN0aW9ucy5jdXQocGFuZWwuY29udGVudCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9vbHRpcDogdHJhbnMuX18oJ0N1dCB0aGUgc2VsZWN0ZWQgY2VsbHMnKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgVG9vbGJhckl0ZW1zLmNyZWF0ZUN1dEJ1dHRvbiA9IGNyZWF0ZUN1dEJ1dHRvbjtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBjb3B5IHRvb2xiYXIgaXRlbS5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYzLjJcbiAgICAgKiBUaGlzIGlzIGRlYWQgY29kZSBub3cuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29weUJ1dHRvbihwYW5lbCwgdHJhbnNsYXRvcikge1xuICAgICAgICBjb25zdCB0cmFucyA9ICh0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yKS5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHJldHVybiBuZXcgVG9vbGJhckJ1dHRvbih7XG4gICAgICAgICAgICBpY29uOiBjb3B5SWNvbixcbiAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBOb3RlYm9va0FjdGlvbnMuY29weShwYW5lbC5jb250ZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiB0cmFucy5fXygnQ29weSB0aGUgc2VsZWN0ZWQgY2VsbHMnKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgVG9vbGJhckl0ZW1zLmNyZWF0ZUNvcHlCdXR0b24gPSBjcmVhdGVDb3B5QnV0dG9uO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHBhc3RlIHRvb2xiYXIgaXRlbS5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYzLjJcbiAgICAgKiBUaGlzIGlzIGRlYWQgY29kZSBub3cuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlUGFzdGVCdXR0b24ocGFuZWwsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSAodHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcikubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICByZXR1cm4gbmV3IFRvb2xiYXJCdXR0b24oe1xuICAgICAgICAgICAgaWNvbjogcGFzdGVJY29uLFxuICAgICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgIE5vdGVib29rQWN0aW9ucy5wYXN0ZShwYW5lbC5jb250ZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiB0cmFucy5fXygnUGFzdGUgY2VsbHMgZnJvbSB0aGUgY2xpcGJvYXJkJylcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFRvb2xiYXJJdGVtcy5jcmVhdGVQYXN0ZUJ1dHRvbiA9IGNyZWF0ZVBhc3RlQnV0dG9uO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHJ1biB0b29sYmFyIGl0ZW0uXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2My4yXG4gICAgICogVGhpcyBpcyBkZWFkIGNvZGUgbm93LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVJ1bkJ1dHRvbihwYW5lbCwgdHJhbnNsYXRvcikge1xuICAgICAgICBjb25zdCB0cmFucyA9ICh0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yKS5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHJldHVybiBuZXcgVG9vbGJhckJ1dHRvbih7XG4gICAgICAgICAgICBpY29uOiBydW5JY29uLFxuICAgICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZvaWQgTm90ZWJvb2tBY3Rpb25zLnJ1bkFuZEFkdmFuY2UocGFuZWwuY29udGVudCwgcGFuZWwuc2Vzc2lvbkNvbnRleHQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IHRyYW5zLl9fKCdSdW4gdGhlIHNlbGVjdGVkIGNlbGxzIGFuZCBhZHZhbmNlJylcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFRvb2xiYXJJdGVtcy5jcmVhdGVSdW5CdXR0b24gPSBjcmVhdGVSdW5CdXR0b247XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcmVzdGFydCBydW4gYWxsIHRvb2xiYXIgaXRlbVxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjMuMlxuICAgICAqIFRoaXMgaXMgZGVhZCBjb2RlIG5vdy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVSZXN0YXJ0UnVuQWxsQnV0dG9uKHBhbmVsLCBkaWFsb2dzLCB0cmFuc2xhdG9yKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gKHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3IpLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgcmV0dXJuIG5ldyBUb29sYmFyQnV0dG9uKHtcbiAgICAgICAgICAgIGljb246IGZhc3RGb3J3YXJkSWNvbixcbiAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB2b2lkIChkaWFsb2dzICE9PSBudWxsICYmIGRpYWxvZ3MgIT09IHZvaWQgMCA/IGRpYWxvZ3MgOiBzZXNzaW9uQ29udGV4dERpYWxvZ3MpXG4gICAgICAgICAgICAgICAgICAgIC5yZXN0YXJ0KHBhbmVsLnNlc3Npb25Db250ZXh0LCB0cmFuc2xhdG9yKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXN0YXJ0ZWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2b2lkIE5vdGVib29rQWN0aW9ucy5ydW5BbGwocGFuZWwuY29udGVudCwgcGFuZWwuc2Vzc2lvbkNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN0YXJ0ZWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9vbHRpcDogdHJhbnMuX18oJ1Jlc3RhcnQgdGhlIGtlcm5lbCwgdGhlbiByZS1ydW4gdGhlIHdob2xlIG5vdGVib29rJylcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFRvb2xiYXJJdGVtcy5jcmVhdGVSZXN0YXJ0UnVuQWxsQnV0dG9uID0gY3JlYXRlUmVzdGFydFJ1bkFsbEJ1dHRvbjtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBjZWxsIHR5cGUgc3dpdGNoZXIgaXRlbS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBJdCB3aWxsIGRpc3BsYXkgdGhlIHR5cGUgb2YgdGhlIGN1cnJlbnQgYWN0aXZlIGNlbGwuXG4gICAgICogSWYgbW9yZSB0aGFuIG9uZSBjZWxsIGlzIHNlbGVjdGVkIGJ1dCBhcmUgb2YgZGlmZmVyZW50IHR5cGVzLFxuICAgICAqIGl0IHdpbGwgZGlzcGxheSBgJy0nYC5cbiAgICAgKiBXaGVuIHRoZSB1c2VyIGNoYW5nZXMgdGhlIGNlbGwgdHlwZSwgaXQgd2lsbCBjaGFuZ2UgdGhlXG4gICAgICogY2VsbCB0eXBlcyBvZiB0aGUgc2VsZWN0ZWQgY2VsbHMuXG4gICAgICogSXQgY2FuIGhhbmRsZSBhIGNoYW5nZSB0byB0aGUgY29udGV4dC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVDZWxsVHlwZUl0ZW0ocGFuZWwsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDZWxsVHlwZVN3aXRjaGVyKHBhbmVsLmNvbnRlbnQsIHRyYW5zbGF0b3IpO1xuICAgIH1cbiAgICBUb29sYmFySXRlbXMuY3JlYXRlQ2VsbFR5cGVJdGVtID0gY3JlYXRlQ2VsbFR5cGVJdGVtO1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZGVmYXVsdCB0b29sYmFyIGl0ZW1zIGZvciBwYW5lbFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldERlZmF1bHRJdGVtcyhwYW5lbCwgc2Vzc2lvbkRpYWxvZ3MsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHsgbmFtZTogJ3NhdmUnLCB3aWRnZXQ6IGNyZWF0ZVNhdmVCdXR0b24ocGFuZWwsIHRyYW5zbGF0b3IpIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdpbnNlcnQnLCB3aWRnZXQ6IGNyZWF0ZUluc2VydEJ1dHRvbihwYW5lbCwgdHJhbnNsYXRvcikgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2N1dCcsIHdpZGdldDogY3JlYXRlQ3V0QnV0dG9uKHBhbmVsLCB0cmFuc2xhdG9yKSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnY29weScsIHdpZGdldDogY3JlYXRlQ29weUJ1dHRvbihwYW5lbCwgdHJhbnNsYXRvcikgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3Bhc3RlJywgd2lkZ2V0OiBjcmVhdGVQYXN0ZUJ1dHRvbihwYW5lbCwgdHJhbnNsYXRvcikgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3J1bicsIHdpZGdldDogY3JlYXRlUnVuQnV0dG9uKHBhbmVsLCB0cmFuc2xhdG9yKSB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdpbnRlcnJ1cHQnLFxuICAgICAgICAgICAgICAgIHdpZGdldDogVG9vbGJhci5jcmVhdGVJbnRlcnJ1cHRCdXR0b24ocGFuZWwuc2Vzc2lvbkNvbnRleHQsIHRyYW5zbGF0b3IpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdyZXN0YXJ0JyxcbiAgICAgICAgICAgICAgICB3aWRnZXQ6IFRvb2xiYXIuY3JlYXRlUmVzdGFydEJ1dHRvbihwYW5lbC5zZXNzaW9uQ29udGV4dCwgc2Vzc2lvbkRpYWxvZ3MsIHRyYW5zbGF0b3IpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdyZXN0YXJ0LWFuZC1ydW4nLFxuICAgICAgICAgICAgICAgIHdpZGdldDogY3JlYXRlUmVzdGFydFJ1bkFsbEJ1dHRvbihwYW5lbCwgc2Vzc2lvbkRpYWxvZ3MsIHRyYW5zbGF0b3IpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnY2VsbFR5cGUnLCB3aWRnZXQ6IGNyZWF0ZUNlbGxUeXBlSXRlbShwYW5lbCwgdHJhbnNsYXRvcikgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3NwYWNlcicsIHdpZGdldDogVG9vbGJhci5jcmVhdGVTcGFjZXJJdGVtKCkgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAna2VybmVsTmFtZScsXG4gICAgICAgICAgICAgICAgd2lkZ2V0OiBUb29sYmFyLmNyZWF0ZUtlcm5lbE5hbWVJdGVtKHBhbmVsLnNlc3Npb25Db250ZXh0LCBzZXNzaW9uRGlhbG9ncywgdHJhbnNsYXRvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICB9XG4gICAgVG9vbGJhckl0ZW1zLmdldERlZmF1bHRJdGVtcyA9IGdldERlZmF1bHRJdGVtcztcbn0pKFRvb2xiYXJJdGVtcyB8fCAoVG9vbGJhckl0ZW1zID0ge30pKTtcbi8qKlxuICogQSB0b29sYmFyIHdpZGdldCB0aGF0IHN3aXRjaGVzIGNlbGwgdHlwZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDZWxsVHlwZVN3aXRjaGVyIGV4dGVuZHMgUmVhY3RXaWRnZXQge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBjZWxsIHR5cGUgc3dpdGNoZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2lkZ2V0LCB0cmFuc2xhdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYGNoYW5nZWAgZXZlbnRzIGZvciB0aGUgSFRNTFNlbGVjdCBjb21wb25lbnQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZSAhPT0gJy0nKSB7XG4gICAgICAgICAgICAgICAgTm90ZWJvb2tBY3Rpb25zLmNoYW5nZUNlbGxUeXBlKHRoaXMuX25vdGVib29rLCBldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX25vdGVib29rLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYGtleWRvd25gIGV2ZW50cyBmb3IgdGhlIEhUTUxTZWxlY3QgY29tcG9uZW50LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5oYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ub3RlYm9vay5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl90cmFucyA9ICh0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yKS5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoVE9PTEJBUl9DRUxMVFlQRV9DTEFTUyk7XG4gICAgICAgIHRoaXMuX25vdGVib29rID0gd2lkZ2V0O1xuICAgICAgICBpZiAod2lkZ2V0Lm1vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHdpZGdldC5hY3RpdmVDZWxsQ2hhbmdlZC5jb25uZWN0KHRoaXMudXBkYXRlLCB0aGlzKTtcbiAgICAgICAgLy8gRm9sbG93IGEgY2hhbmdlIGluIHRoZSBzZWxlY3Rpb24uXG4gICAgICAgIHdpZGdldC5zZWxlY3Rpb25DaGFuZ2VkLmNvbm5lY3QodGhpcy51cGRhdGUsIHRoaXMpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9ICctJztcbiAgICAgICAgaWYgKHRoaXMuX25vdGVib29rLmFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5fbm90ZWJvb2suYWN0aXZlQ2VsbC5tb2RlbC50eXBlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qgd2lkZ2V0IG9mIHRoaXMuX25vdGVib29rLndpZGdldHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9ub3RlYm9vay5pc1NlbGVjdGVkT3JBY3RpdmUod2lkZ2V0KSkge1xuICAgICAgICAgICAgICAgIGlmICh3aWRnZXQubW9kZWwudHlwZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAnLSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoSFRNTFNlbGVjdCwgeyBjbGFzc05hbWU6IFRPT0xCQVJfQ0VMTFRZUEVfRFJPUERPV05fQ0xBU1MsIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSwgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleURvd24sIHZhbHVlOiB2YWx1ZSwgXCJhcmlhLWxhYmVsXCI6IHRoaXMuX3RyYW5zLl9fKCdDZWxsIHR5cGUnKSwgdGl0bGU6IHRoaXMuX3RyYW5zLl9fKCdTZWxlY3QgdGhlIGNlbGwgdHlwZScpIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwiLVwiIH0sIFwiLVwiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJjb2RlXCIgfSwgdGhpcy5fdHJhbnMuX18oJ0NvZGUnKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwibWFya2Rvd25cIiB9LCB0aGlzLl90cmFucy5fXygnTWFya2Rvd24nKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwicmF3XCIgfSwgdGhpcy5fdHJhbnMuX18oJ1JhdycpKSkpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlZmF1bHQtdG9vbGJhci5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyB0cmFuc2xhdGVLZXJuZWxTdGF0dXNlcywgVkRvbU1vZGVsLCBWRG9tUmVuZGVyZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBpbnRlcmFjdGl2ZUl0ZW0sIFByb2dyZXNzQ2lyY2xlIH0gZnJvbSAnQGp1cHl0ZXJsYWIvc3RhdHVzYmFyJztcbmltcG9ydCB7IGNpcmNsZUljb24sIG9mZmxpbmVCb2x0SWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgS2VybmVsTWVzc2FnZSB9IGZyb20gJ0BqdXB5dGVybGFiL3NlcnZpY2VzJztcbi8qKlxuICogQSByZWFjdCBmdW5jdGlvbmFsIGNvbXBvbmVudCBmb3IgcmVuZGVyaW5nIGV4ZWN1dGlvbiBpbmRpY2F0b3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBFeGVjdXRpb25JbmRpY2F0b3JDb21wb25lbnQocHJvcHMpIHtcbiAgICBjb25zdCB0cmFuc2xhdG9yID0gcHJvcHMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICBjb25zdCBrZXJuZWxTdGF0dXNlcyA9IHRyYW5zbGF0ZUtlcm5lbFN0YXR1c2VzKHRyYW5zbGF0b3IpO1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgY29uc3Qgc3RhdGUgPSBwcm9wcy5zdGF0ZTtcbiAgICBjb25zdCBzaG93T25Ub29sQmFyID0gcHJvcHMuZGlzcGxheU9wdGlvbi5zaG93T25Ub29sQmFyO1xuICAgIGNvbnN0IHNob3dQcm9ncmVzcyA9IHByb3BzLmRpc3BsYXlPcHRpb24uc2hvd1Byb2dyZXNzO1xuICAgIGNvbnN0IHRvb2x0aXBDbGFzcyA9IHNob3dPblRvb2xCYXIgPyAnZG93bicgOiAndXAnO1xuICAgIGNvbnN0IGVtcHR5RGl2ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsKTtcbiAgICBpZiAoIXN0YXRlKSB7XG4gICAgICAgIHJldHVybiBlbXB0eURpdjtcbiAgICB9XG4gICAgY29uc3Qga2VybmVsU3RhdHVzID0gc3RhdGUua2VybmVsU3RhdHVzO1xuICAgIGNvbnN0IGNpcmNsZUljb25Qcm9wcyA9IHtcbiAgICAgICAgYWxpZ25TZWxmOiAnbm9ybWFsJyxcbiAgICAgICAgaGVpZ2h0OiAnMjRweCdcbiAgICB9O1xuICAgIGNvbnN0IHRpbWUgPSBzdGF0ZS50b3RhbFRpbWU7XG4gICAgY29uc3Qgc2NoZWR1bGVkQ2VsbE51bWJlciA9IHN0YXRlLnNjaGVkdWxlZENlbGxOdW1iZXIgfHwgMDtcbiAgICBjb25zdCByZW1haW5pbmdDZWxsTnVtYmVyID0gc3RhdGUuc2NoZWR1bGVkQ2VsbC5zaXplIHx8IDA7XG4gICAgY29uc3QgZXhlY3V0ZWRDZWxsTnVtYmVyID0gc2NoZWR1bGVkQ2VsbE51bWJlciAtIHJlbWFpbmluZ0NlbGxOdW1iZXI7XG4gICAgbGV0IHBlcmNlbnRhZ2UgPSAoMTAwICogZXhlY3V0ZWRDZWxsTnVtYmVyKSAvIHNjaGVkdWxlZENlbGxOdW1iZXI7XG4gICAgbGV0IGRpc3BsYXlDbGFzcyA9IHNob3dQcm9ncmVzcyA/ICcnIDogJ2hpZGRlbic7XG4gICAgaWYgKCFzaG93UHJvZ3Jlc3MgJiYgcGVyY2VudGFnZSA8IDEwMCkge1xuICAgICAgICBwZXJjZW50YWdlID0gMDtcbiAgICB9XG4gICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSAocGVyY2VudGFnZSkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUHJvZ3Jlc3NDaXJjbGUsIHsgcHJvZ3Jlc3M6IHBlcmNlbnRhZ2UsIHdpZHRoOiAxNiwgaGVpZ2h0OiAyNCB9KSk7XG4gICAgY29uc3QgdGl0bGVGYWN0b3J5ID0gKHRyYW5zbGF0ZWRTdGF0dXMpID0+IHRyYW5zLl9fKCdLZXJuZWwgc3RhdHVzOiAlMScsIHRyYW5zbGF0ZWRTdGF0dXMpO1xuICAgIGNvbnN0IHJlYWN0RWxlbWVudCA9IChzdGF0dXMsIGNpcmNsZSwgcG9wdXApID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnanAtTm90ZWJvb2stRXhlY3V0aW9uSW5kaWNhdG9yJywgdGl0bGU6IHNob3dQcm9ncmVzcyA/ICcnIDogdGl0bGVGYWN0b3J5KGtlcm5lbFN0YXR1c2VzW3N0YXR1c10pLCBcImRhdGEtc3RhdHVzXCI6IHN0YXR1cyB9LFxuICAgICAgICBjaXJjbGUsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IGBqcC1Ob3RlYm9vay1FeGVjdXRpb25JbmRpY2F0b3ItdG9vbHRpcCAke3Rvb2x0aXBDbGFzc30gJHtkaXNwbGF5Q2xhc3N9YCB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCxcbiAgICAgICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgICAgICB0aXRsZUZhY3Rvcnkoa2VybmVsU3RhdHVzZXNbc3RhdHVzXSksXG4gICAgICAgICAgICAgICAgXCIgXCIpLFxuICAgICAgICAgICAgcG9wdXApKSk7XG4gICAgaWYgKHN0YXRlLmtlcm5lbFN0YXR1cyA9PT0gJ2Nvbm5lY3RpbmcnIHx8XG4gICAgICAgIHN0YXRlLmtlcm5lbFN0YXR1cyA9PT0gJ2Rpc2Nvbm5lY3RlZCcgfHxcbiAgICAgICAgc3RhdGUua2VybmVsU3RhdHVzID09PSAndW5rbm93bicpIHtcbiAgICAgICAgcmV0dXJuIHJlYWN0RWxlbWVudChrZXJuZWxTdGF0dXMsIFJlYWN0LmNyZWF0ZUVsZW1lbnQob2ZmbGluZUJvbHRJY29uLnJlYWN0LCBPYmplY3QuYXNzaWduKHt9LCBjaXJjbGVJY29uUHJvcHMpKSwgW10pO1xuICAgIH1cbiAgICBpZiAoc3RhdGUua2VybmVsU3RhdHVzID09PSAnc3RhcnRpbmcnIHx8XG4gICAgICAgIHN0YXRlLmtlcm5lbFN0YXR1cyA9PT0gJ3Rlcm1pbmF0aW5nJyB8fFxuICAgICAgICBzdGF0ZS5rZXJuZWxTdGF0dXMgPT09ICdyZXN0YXJ0aW5nJyB8fFxuICAgICAgICBzdGF0ZS5rZXJuZWxTdGF0dXMgPT09ICdpbml0aWFsaXppbmcnKSB7XG4gICAgICAgIHJldHVybiByZWFjdEVsZW1lbnQoa2VybmVsU3RhdHVzLCBSZWFjdC5jcmVhdGVFbGVtZW50KGNpcmNsZUljb24ucmVhY3QsIE9iamVjdC5hc3NpZ24oe30sIGNpcmNsZUljb25Qcm9wcykpLCBbXSk7XG4gICAgfVxuICAgIGlmIChzdGF0ZS5leGVjdXRpb25TdGF0dXMgPT09ICdidXN5Jykge1xuICAgICAgICByZXR1cm4gcmVhY3RFbGVtZW50KCdidXN5JywgcHJvZ3Jlc3NCYXIocGVyY2VudGFnZSksIFtcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsga2V5OiAwIH0sIHRyYW5zLl9fKGBFeGVjdXRlZCAke2V4ZWN1dGVkQ2VsbE51bWJlcn0vJHtzY2hlZHVsZWRDZWxsTnVtYmVyfSByZXF1ZXN0c2ApKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsga2V5OiAxIH0sIHRyYW5zLl9uKCdFbGFwc2VkIHRpbWU6ICUxIHNlY29uZCcsICdFbGFwc2VkIHRpbWU6ICUxIHNlY29uZHMnLCB0aW1lKSlcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAodGltZSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWN0RWxlbWVudCgnaWRsZScsIHByb2dyZXNzQmFyKDEwMCksIFtdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZWFjdEVsZW1lbnQoJ2lkbGUnLCBwcm9ncmVzc0JhcigxMDApLCBbXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBrZXk6IDAgfSwgdHJhbnMuX24oJ0V4ZWN1dGVkICUxIHJlcXVlc3QnLCAnRXhlY3V0ZWQgJTEgcmVxdWVzdHMnLCBzY2hlZHVsZWRDZWxsTnVtYmVyKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBrZXk6IDEgfSwgdHJhbnMuX24oJ0VsYXBzZWQgdGltZTogJTEgc2Vjb25kJywgJ0VsYXBzZWQgdGltZTogJTEgc2Vjb25kcycsIHRpbWUpKVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEEgVkRvbVJlbmRlcmVyIHdpZGdldCBmb3IgZGlzcGxheWluZyB0aGUgZXhlY3V0aW9uIHN0YXR1cy5cbiAqL1xuZXhwb3J0IGNsYXNzIEV4ZWN1dGlvbkluZGljYXRvciBleHRlbmRzIFZEb21SZW5kZXJlciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IHRoZSBrZXJuZWwgc3RhdHVzIHdpZGdldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0cmFuc2xhdG9yLCBzaG93UHJvZ3Jlc3MgPSB0cnVlKSB7XG4gICAgICAgIHN1cGVyKG5ldyBFeGVjdXRpb25JbmRpY2F0b3IuTW9kZWwoKSk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoaW50ZXJhY3RpdmVJdGVtKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIHRoZSBleGVjdXRpb24gc3RhdHVzIGl0ZW0uXG4gICAgICovXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlbCA9PT0gbnVsbCB8fCAhdGhpcy5tb2RlbC5yZW5kZXJGbGFnKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5iID0gdGhpcy5tb2RlbC5jdXJyZW50Tm90ZWJvb2s7XG4gICAgICAgICAgICBpZiAoIW5iKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEV4ZWN1dGlvbkluZGljYXRvckNvbXBvbmVudCwgeyBkaXNwbGF5T3B0aW9uOiB0aGlzLm1vZGVsLmRpc3BsYXlPcHRpb24sIHN0YXRlOiB1bmRlZmluZWQsIHRyYW5zbGF0b3I6IHRoaXMudHJhbnNsYXRvciB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRXhlY3V0aW9uSW5kaWNhdG9yQ29tcG9uZW50LCB7IGRpc3BsYXlPcHRpb246IHRoaXMubW9kZWwuZGlzcGxheU9wdGlvbiwgc3RhdGU6IHRoaXMubW9kZWwuZXhlY3V0aW9uU3RhdGUobmIpLCB0cmFuc2xhdG9yOiB0aGlzLnRyYW5zbGF0b3IgfSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgRXhlY3V0aW9uSW5kaWNhdG9yIHN0YXRpY3MuXG4gKi9cbihmdW5jdGlvbiAoRXhlY3V0aW9uSW5kaWNhdG9yKSB7XG4gICAgLyoqXG4gICAgICogQSBWRG9tTW9kZWwgZm9yIHRoZSBleGVjdXRpb24gc3RhdHVzIGluZGljYXRvci5cbiAgICAgKi9cbiAgICBjbGFzcyBNb2RlbCBleHRlbmRzIFZEb21Nb2RlbCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSB3ZWFrIG1hcCB0byBob2xkIGV4ZWN1dGlvbiBzdGF0dXMgb2YgbXVsdGlwbGUgbm90ZWJvb2tzLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLl9ub3RlYm9va0V4ZWN1dGlvblByb2dyZXNzID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlPcHRpb24gPSB7IHNob3dPblRvb2xCYXI6IHRydWUsIHNob3dQcm9ncmVzczogdHJ1ZSB9O1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyRmxhZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEF0dGFjaCBhIG5vdGVib29rIHdpdGggc2Vzc2lvbiBjb250ZXh0IHRvIG1vZGVsIGluIG9yZGVyIHRvIGtlZXBcbiAgICAgICAgICogdHJhY2sgb2YgbXVsdGlwbGUgbm90ZWJvb2tzLiBJZiBhIHNlc3Npb24gY29udGV4dCBpcyBhbHJlYWR5XG4gICAgICAgICAqIGF0dGFjaGVkLCBvbmx5IHNldCBjdXJyZW50IGFjdGl2YXRlZCBub3RlYm9vayB0byBpbnB1dC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGRhdGEgLSBUaGUgIG5vdGVib29rIGFuZCBzZXNzaW9uIGNvbnRleHQgdG8gYmUgYXR0YWNoZWQgdG8gbW9kZWxcbiAgICAgICAgICovXG4gICAgICAgIGF0dGFjaE5vdGVib29rKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuY29udGVudCAmJiBkYXRhLmNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuYiA9IGRhdGEuY29udGVudDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gZGF0YS5jb250ZXh0O1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnROb3RlYm9vayA9IG5iO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbm90ZWJvb2tFeGVjdXRpb25Qcm9ncmVzcy5oYXMobmIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25vdGVib29rRXhlY3V0aW9uUHJvZ3Jlc3Muc2V0KG5iLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleGVjdXRpb25TdGF0dXM6ICdpZGxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtlcm5lbFN0YXR1czogJ2lkbGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxUaW1lOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWw6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkQ2VsbDogbmV3IFNldCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkQ2VsbE51bWJlcjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRSZXNldDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9ub3RlYm9va0V4ZWN1dGlvblByb2dyZXNzLmdldChuYik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRleHRTdGF0dXNDaGFuZ2VkID0gKGN0eCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUua2VybmVsU3RhdHVzID0gY3R4Lmtlcm5lbERpc3BsYXlTdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RhdHVzQ2hhbmdlZC5jb25uZWN0KGNvbnRleHRTdGF0dXNDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGV4dENvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkID0gKGN0eCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUua2VybmVsU3RhdHVzID0gY3R4Lmtlcm5lbERpc3BsYXlTdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY29ubmVjdGlvblN0YXR1c0NoYW5nZWQuY29ubmVjdChjb250ZXh0Q29ubmVjdGlvblN0YXR1c0NoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmRpc3Bvc2VkLmNvbm5lY3QoY3R4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5jb25uZWN0aW9uU3RhdHVzQ2hhbmdlZC5kaXNjb25uZWN0KGNvbnRleHRDb25uZWN0aW9uU3RhdHVzQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguc3RhdHVzQ2hhbmdlZC5kaXNjb25uZWN0KGNvbnRleHRTdGF0dXNDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRsZUtlcm5lbE1zZyA9IChzZW5kZXIsIG1zZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IG1zZy5tc2c7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtc2dJZCA9IG1lc3NhZ2UuaGVhZGVyLm1zZ19pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChLZXJuZWxNZXNzYWdlLmlzQ29tbU1zZ01zZyhtZXNzYWdlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuY29udGVudC5kYXRhWydtZXRob2QnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGlvbiByZXF1ZXN0IGZyb20gQ29tbSBtZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gbWVzc2FnZS5jb250ZW50LmRhdGFbJ21ldGhvZCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRob2QgIT09ICdyZXF1ZXN0X3N0YXRlJyAmJiBtZXRob2QgIT09ICd1cGRhdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NlbGxTY2hlZHVsZWRDYWxsYmFjayhuYiwgbXNnSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFydFRpbWVyKG5iKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChtZXNzYWdlLmhlYWRlci5tc2dfdHlwZSA9PT0gJ2V4ZWN1dGVfcmVxdWVzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBIGNlbGwgY29kZSBpcyBzY2hlZHVsZWQgZm9yIGV4ZWN1dGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NlbGxTY2hlZHVsZWRDYWxsYmFjayhuYiwgbXNnSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoS2VybmVsTWVzc2FnZS5pc1N0YXR1c01zZyhtZXNzYWdlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuY29udGVudC5leGVjdXRpb25fc3RhdGUgPT09ICdpZGxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElkbGUgc3RhdHVzIG1lc3NhZ2UgY2FzZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRJZCA9IG1lc3NhZ2UucGFyZW50X2hlYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubXNnX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NlbGxFeGVjdXRlZENhbGxiYWNrKG5iLCBwYXJlbnRJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChtZXNzYWdlLmhlYWRlci5tc2dfdHlwZSA9PT0gJ2V4ZWN1dGVfaW5wdXQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQSBjZWxsIGNvZGUgc3RhcnRzIGV4ZWN1dGluZy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFydFRpbWVyKG5iKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgKF9iID0gKF9hID0gY29udGV4dC5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eua2VybmVsKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYW55TWVzc2FnZS5jb25uZWN0KGhhbmRsZUtlcm5lbE1zZyk7XG4gICAgICAgICAgICAgICAgICAgIChfZCA9IChfYyA9IGNvbnRleHQuc2Vzc2lvbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmtlcm5lbCkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmRpc3Bvc2VkLmNvbm5lY3Qoa2VybmVsID0+IGtlcm5lbC5hbnlNZXNzYWdlLmRpc2Nvbm5lY3QoaGFuZGxlS2VybmVsTXNnKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtlcm5lbENoYW5nZWRTbG90ID0gKF8sIGtlcm5lbERhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0VGltZShzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXJuZWxEYXRhLm5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtlcm5lbERhdGEubmV3VmFsdWUuYW55TWVzc2FnZS5jb25uZWN0KGhhbmRsZUtlcm5lbE1zZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lmtlcm5lbENoYW5nZWQuY29ubmVjdChrZXJuZWxDaGFuZ2VkU2xvdCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZGlzcG9zZWQuY29ubmVjdChjdHggPT4gY3R4Lmtlcm5lbENoYW5nZWQuZGlzY29ubmVjdChrZXJuZWxDaGFuZ2VkU2xvdCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGN1cnJlbnQgYWN0aXZhdGVkIG5vdGVib29rIGluIG1vZGVsLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IGN1cnJlbnROb3RlYm9vaygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50Tm90ZWJvb2s7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkaXNwbGF5IG9wdGlvbnMgZm9yIHByb2dyZXNzIGJhciBhbmQgZWxhcHNlZCB0aW1lLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IGRpc3BsYXlPcHRpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGlzcGxheU9wdGlvbjtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHRoZSBkaXNwbGF5IG9wdGlvbnMgZm9yIHByb2dyZXNzIGJhciBhbmQgZWxhcHNlZCB0aW1lLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgdG8gYmUgdXNlZFxuICAgICAgICAgKi9cbiAgICAgICAgc2V0IGRpc3BsYXlPcHRpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5fZGlzcGxheU9wdGlvbiA9IG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgZXhlY3V0aW9uIHN0YXRlIGFzc29jaWF0ZWQgd2l0aCBhIG5vdGVib29rLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gbmIgLSBUaGUgbm90ZWJvb2sgdXNlZCB0byBpZGVudGlmeSBleGVjdXRpb25cbiAgICAgICAgICogc3RhdGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4gLSBUaGUgYXNzb2NpYXRlZCBleGVjdXRpb24gc3RhdGUuXG4gICAgICAgICAqL1xuICAgICAgICBleGVjdXRpb25TdGF0ZShuYikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25vdGVib29rRXhlY3V0aW9uUHJvZ3Jlc3MuZ2V0KG5iKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBrZXJuZWwncyBpZGxlIHN0YXR1cyBtZXNzYWdlLlxuICAgICAgICAgKiBJdCBpcyB1c2VkIHRvIGtlZXAgdHJhY2sgbnVtYmVyIG9mIGV4ZWN1dGVkXG4gICAgICAgICAqIGNlbGwgb3IgQ29tbSBjdXN0b20gbWVzc2FnZXMgYW5kIHRoZSBzdGF0dXMgb2Yga2VybmVsLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gIG5iIC0gVGhlIG5vdGVib29rIHdoaWNoIGNvbnRhaW5zIHRoZSBleGVjdXRlZCBjb2RlXG4gICAgICAgICAqIGNlbGwuXG4gICAgICAgICAqIEBwYXJhbSAgbXNnX2lkIC0gVGhlIGlkIG9mIG1lc3NhZ2UuXG4gICAgICAgICAqXG4gICAgICAgICAqICMjIyBOb3RlXG4gICAgICAgICAqXG4gICAgICAgICAqIFRvIGtlZXAgdHJhY2sgb2YgY2VsbHMgZXhlY3V0ZWQgdW5kZXIgMSBzZWNvbmQsXG4gICAgICAgICAqIHRoZSBleGVjdXRpb24gc3RhdGUgaXMgbWFya2VkIGFzIGBuZWVkUmVzZXRgIDEgc2Vjb25kIGFmdGVyIGV4ZWN1dGluZ1xuICAgICAgICAgKiB0aGVzZSBjZWxscy4gVGhpcyBgVGltZW91dGAgd2lsbCBiZSBjbGVhcmVkIGlmIHRoZXJlIGlzIGFueSBjZWxsXG4gICAgICAgICAqIHNjaGVkdWxlZCBhZnRlciB0aGF0LlxuICAgICAgICAgKi9cbiAgICAgICAgX2NlbGxFeGVjdXRlZENhbGxiYWNrKG5iLCBtc2dfaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fbm90ZWJvb2tFeGVjdXRpb25Qcm9ncmVzcy5nZXQobmIpO1xuICAgICAgICAgICAgaWYgKHN0YXRlICYmIHN0YXRlLnNjaGVkdWxlZENlbGwuaGFzKG1zZ19pZCkpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZS5zY2hlZHVsZWRDZWxsLmRlbGV0ZShtc2dfaWQpO1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5zY2hlZHVsZWRDZWxsLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuZXhlY3V0aW9uU3RhdHVzID0gJ2lkbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzdGF0ZS5pbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5uZWVkUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGtlcm5lbCdzIGBleGVjdXRlX2lucHV0YCBtZXNzYWdlIHRvIHN0YXJ0XG4gICAgICAgICAqIHRoZSBlbGFwc2VkIHRpbWUgY291bnRlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtICBuYiAtIFRoZSBub3RlYm9vayB3aGljaCBjb250YWlucyB0aGUgc2NoZWR1bGVkIGV4ZWN1dGlvbiByZXF1ZXN0LlxuICAgICAgICAgKi9cbiAgICAgICAgX3N0YXJ0VGltZXIobmIpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fbm90ZWJvb2tFeGVjdXRpb25Qcm9ncmVzcy5nZXQobmIpO1xuICAgICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLmV4ZWN1dGlvblN0YXR1cyAhPT0gJ2J1c3knKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmV4ZWN1dGlvblN0YXR1cyA9ICdidXN5JztcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHN0YXRlLnRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmludGVydmFsID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpY2soc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgb24ga2VybmVsJ3MgYGV4ZWN1dGVfcmVxdWVzdGAgbWVzc2FnZSBvciBDb21tIG1lc3NhZ2UsIGl0IGlzXG4gICAgICAgICAqIHVzZWQgdG8ga2VlcCB0cmFjayBudW1iZXIgb2Ygc2NoZWR1bGVkIGNlbGwgb3IgQ29tbSBleGVjdXRpb24gbWVzc2FnZVxuICAgICAgICAgKiBhbmQgdGhlIHN0YXR1cyBvZiBrZXJuZWwuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSAgbmIgLSBUaGUgbm90ZWJvb2sgd2hpY2ggY29udGFpbnMgdGhlIHNjaGVkdWxlZCBjb2RlLlxuICAgICAgICAgKiBjZWxsXG4gICAgICAgICAqIEBwYXJhbSAgbXNnX2lkIC0gVGhlIGlkIG9mIG1lc3NhZ2UuXG4gICAgICAgICAqL1xuICAgICAgICBfY2VsbFNjaGVkdWxlZENhbGxiYWNrKG5iLCBtc2dfaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fbm90ZWJvb2tFeGVjdXRpb25Qcm9ncmVzcy5nZXQobmIpO1xuICAgICAgICAgICAgaWYgKHN0YXRlICYmICFzdGF0ZS5zY2hlZHVsZWRDZWxsLmhhcyhtc2dfaWQpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLm5lZWRSZXNldCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNldFRpbWUoc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGF0ZS5zY2hlZHVsZWRDZWxsLmFkZChtc2dfaWQpO1xuICAgICAgICAgICAgICAgIHN0YXRlLnNjaGVkdWxlZENlbGxOdW1iZXIgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSW5jcmVtZW50IHRoZSBleGVjdXRlZCB0aW1lIG9mIGlucHV0IGV4ZWN1dGlvbiBzdGF0ZVxuICAgICAgICAgKiBhbmQgZW1pdCBgc3RhdGVDaGFuZ2VkYCBzaWduYWwgdG8gcmUtcmVuZGVyIHRoZSBpbmRpY2F0b3IuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSAgZGF0YSAtIHRoZSBzdGF0ZSB0byBiZSB1cGRhdGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgX3RpY2soZGF0YSkge1xuICAgICAgICAgICAgZGF0YS50b3RhbFRpbWUgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmVzZXQgdGhlIGlucHV0IGV4ZWN1dGlvbiBzdGF0ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtICBkYXRhIC0gdGhlIHN0YXRlIHRvIGJlIHJlc3RlZC5cbiAgICAgICAgICovXG4gICAgICAgIF9yZXNldFRpbWUoZGF0YSkge1xuICAgICAgICAgICAgZGF0YS50b3RhbFRpbWUgPSAwO1xuICAgICAgICAgICAgZGF0YS5zY2hlZHVsZWRDZWxsTnVtYmVyID0gMDtcbiAgICAgICAgICAgIGRhdGEuZXhlY3V0aW9uU3RhdHVzID0gJ2lkbGUnO1xuICAgICAgICAgICAgZGF0YS5zY2hlZHVsZWRDZWxsID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGRhdGEudGltZW91dCk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGRhdGEuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgZGF0YS5uZWVkUmVzZXQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgcmVuZGVyRmxhZygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJGbGFnO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZVJlbmRlck9wdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5T3B0aW9uLnNob3dPblRvb2xCYXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuc2hvd09uVG9vbEJhcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJGbGFnID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJGbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlPcHRpb24uc2hvd1Byb2dyZXNzID0gb3B0aW9ucy5zaG93UHJvZ3Jlc3M7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgRXhlY3V0aW9uSW5kaWNhdG9yLk1vZGVsID0gTW9kZWw7XG4gICAgZnVuY3Rpb24gY3JlYXRlRXhlY3V0aW9uSW5kaWNhdG9ySXRlbShwYW5lbCwgdHJhbnNsYXRvciwgbG9hZFNldHRpbmdzKSB7XG4gICAgICAgIGNvbnN0IHRvb2xiYXJJdGVtID0gbmV3IEV4ZWN1dGlvbkluZGljYXRvcih0cmFuc2xhdG9yKTtcbiAgICAgICAgdG9vbGJhckl0ZW0ubW9kZWwuZGlzcGxheU9wdGlvbiA9IHtcbiAgICAgICAgICAgIHNob3dPblRvb2xCYXI6IHRydWUsXG4gICAgICAgICAgICBzaG93UHJvZ3Jlc3M6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgdG9vbGJhckl0ZW0ubW9kZWwuYXR0YWNoTm90ZWJvb2soe1xuICAgICAgICAgICAgY29udGVudDogcGFuZWwuY29udGVudCxcbiAgICAgICAgICAgIGNvbnRleHQ6IHBhbmVsLnNlc3Npb25Db250ZXh0XG4gICAgICAgIH0pO1xuICAgICAgICBwYW5lbC5kaXNwb3NlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgIHRvb2xiYXJJdGVtLmRpc3Bvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChsb2FkU2V0dGluZ3MpIHtcbiAgICAgICAgICAgIGxvYWRTZXR0aW5nc1xuICAgICAgICAgICAgICAgIC50aGVuKHNldHRpbmdzID0+IHtcbiAgICAgICAgICAgICAgICB0b29sYmFySXRlbS5tb2RlbC51cGRhdGVSZW5kZXJPcHRpb24oZ2V0U2V0dGluZ1ZhbHVlKHNldHRpbmdzKSk7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuY2hhbmdlZC5jb25uZWN0KG5ld1NldHRpbmdzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhckl0ZW0ubW9kZWwudXBkYXRlUmVuZGVyT3B0aW9uKGdldFNldHRpbmdWYWx1ZShuZXdTZXR0aW5ncykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVhc29uLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvb2xiYXJJdGVtO1xuICAgIH1cbiAgICBFeGVjdXRpb25JbmRpY2F0b3IuY3JlYXRlRXhlY3V0aW9uSW5kaWNhdG9ySXRlbSA9IGNyZWF0ZUV4ZWN1dGlvbkluZGljYXRvckl0ZW07XG4gICAgZnVuY3Rpb24gZ2V0U2V0dGluZ1ZhbHVlKHNldHRpbmdzKSB7XG4gICAgICAgIGxldCBzaG93T25Ub29sQmFyID0gdHJ1ZTtcbiAgICAgICAgbGV0IHNob3dQcm9ncmVzcyA9IHRydWU7XG4gICAgICAgIGNvbnN0IGNvbmZpZ1ZhbHVlcyA9IHNldHRpbmdzLmdldCgna2VybmVsU3RhdHVzJykuY29tcG9zaXRlO1xuICAgICAgICBpZiAoY29uZmlnVmFsdWVzKSB7XG4gICAgICAgICAgICBzaG93T25Ub29sQmFyID0gIWNvbmZpZ1ZhbHVlcy5zaG93T25TdGF0dXNCYXI7XG4gICAgICAgICAgICBzaG93UHJvZ3Jlc3MgPSBjb25maWdWYWx1ZXMuc2hvd1Byb2dyZXNzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHNob3dPblRvb2xCYXIsIHNob3dQcm9ncmVzcyB9O1xuICAgIH1cbiAgICBFeGVjdXRpb25JbmRpY2F0b3IuZ2V0U2V0dGluZ1ZhbHVlID0gZ2V0U2V0dGluZ1ZhbHVlO1xufSkoRXhlY3V0aW9uSW5kaWNhdG9yIHx8IChFeGVjdXRpb25JbmRpY2F0b3IgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhlY3V0aW9uaW5kaWNhdG9yLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIG5vdGVib29rXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYWN0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL2RlZmF1bHQtdG9vbGJhcic7XG5leHBvcnQgKiBmcm9tICcuL21vZGVsJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxmYWN0b3J5JztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZXN0YXR1cyc7XG5leHBvcnQgKiBmcm9tICcuL25vdGVib29rdG9vbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9wYW5lbCc7XG5leHBvcnQgKiBmcm9tICcuL3Rva2Vucyc7XG5leHBvcnQgKiBmcm9tICcuL3RyYWNrZXInO1xuZXhwb3J0ICogZnJvbSAnLi90cnVzdHN0YXR1cyc7XG5leHBvcnQgKiBmcm9tICcuL3dpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL3dpZGdldGZhY3RvcnknO1xuZXhwb3J0ICogZnJvbSAnLi9leGVjdXRpb25pbmRpY2F0b3InO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgRGlhbG9nLCBzaG93RGlhbG9nIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgQ29kZUNlbGxNb2RlbCwgTWFya2Rvd25DZWxsTW9kZWwsIFJhd0NlbGxNb2RlbCB9IGZyb20gJ0BqdXB5dGVybGFiL2NlbGxzJztcbmltcG9ydCAqIGFzIG5iZm9ybWF0IGZyb20gJ0BqdXB5dGVybGFiL25iZm9ybWF0JztcbmltcG9ydCB7IE1vZGVsREIgfSBmcm9tICdAanVweXRlcmxhYi9vYnNlcnZhYmxlcyc7XG5pbXBvcnQgKiBhcyBtb2RlbHMgZnJvbSAnQGp1cHl0ZXJsYWIvc2hhcmVkLW1vZGVscyc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IFVVSUQgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG5pbXBvcnQgeyBDZWxsTGlzdCB9IGZyb20gJy4vY2VsbGxpc3QnO1xuY29uc3QgVU5TSEFSRURfS0VZUyA9IFsna2VybmVsc3BlYycsICdsYW5ndWFnZV9pbmZvJ107XG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIGEgbm90ZWJvb2sgTW9kZWwuXG4gKi9cbmV4cG9ydCBjbGFzcyBOb3RlYm9va01vZGVsIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgbm90ZWJvb2sgbW9kZWwuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIG11dGV4IHRvIHVwZGF0ZSB0aGUgc2hhcmVkIG1vZGVsLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fbW9kZWxEQk11dGV4ID0gbW9kZWxzLmNyZWF0ZU11dGV4KCk7XG4gICAgICAgIHRoaXMuX3JlYWRPbmx5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRDaGFuZ2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fc3RhdGVDaGFuZ2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fbmJmb3JtYXQgPSBuYmZvcm1hdC5NQUpPUl9WRVJTSU9OO1xuICAgICAgICB0aGlzLl9uYmZvcm1hdE1pbm9yID0gbmJmb3JtYXQuTUlOT1JfVkVSU0lPTjtcbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICBpZiAob3B0aW9ucy5tb2RlbERCKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsREIgPSBvcHRpb25zLm1vZGVsREI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsREIgPSBuZXcgTW9kZWxEQigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hhcmVkTW9kZWwgPSBtb2RlbHMuWU5vdGVib29rLmNyZWF0ZShvcHRpb25zLmRpc2FibGVEb2N1bWVudFdpZGVVbmRvUmVkbyB8fCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX2lzSW5pdGlhbGl6ZWQgPSBvcHRpb25zLmlzSW5pdGlhbGl6ZWQgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gb3B0aW9ucy5jb250ZW50RmFjdG9yeSB8fCBOb3RlYm9va01vZGVsLmRlZmF1bHRDb250ZW50RmFjdG9yeTtcbiAgICAgICAgdGhpcy5jb250ZW50RmFjdG9yeSA9IGZhY3RvcnkuY2xvbmUodGhpcy5tb2RlbERCLnZpZXcoJ2NlbGxzJykpO1xuICAgICAgICB0aGlzLl9jZWxscyA9IG5ldyBDZWxsTGlzdCh0aGlzLm1vZGVsREIsIHRoaXMuY29udGVudEZhY3RvcnksIHRoaXMuc2hhcmVkTW9kZWwpO1xuICAgICAgICB0aGlzLl90cmFucyA9IChvcHRpb25zLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3IpLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgdGhpcy5fY2VsbHMuY2hhbmdlZC5jb25uZWN0KHRoaXMuX29uQ2VsbHNDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgLy8gSGFuZGxlIGluaXRpYWwgbWV0YWRhdGEuXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gdGhpcy5tb2RlbERCLmNyZWF0ZU1hcCgnbWV0YWRhdGEnKTtcbiAgICAgICAgaWYgKCFtZXRhZGF0YS5oYXMoJ2xhbmd1YWdlX2luZm8nKSkge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IG9wdGlvbnMubGFuZ3VhZ2VQcmVmZXJlbmNlIHx8ICcnO1xuICAgICAgICAgICAgbWV0YWRhdGEuc2V0KCdsYW5ndWFnZV9pbmZvJywgeyBuYW1lIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Vuc3VyZU1ldGFkYXRhKCk7XG4gICAgICAgIG1ldGFkYXRhLmNoYW5nZWQuY29ubmVjdCh0aGlzLl9vbk1ldGFkYXRhQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuX2RlbGV0ZWRDZWxscyA9IFtdO1xuICAgICAgICB0aGlzLnNoYXJlZE1vZGVsLmRpcnR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hhcmVkTW9kZWwuY2hhbmdlZC5jb25uZWN0KHRoaXMuX29uU3RhdGVDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBkb2N1bWVudCBjb250ZW50IGNoYW5nZXMuXG4gICAgICovXG4gICAgZ2V0IGNvbnRlbnRDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudENoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgZG9jdW1lbnQgc3RhdGUgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBnZXQgc3RhdGVDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGVDaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZGlydHkgc3RhdGUgb2YgdGhlIGRvY3VtZW50LlxuICAgICAqL1xuICAgIGdldCBkaXJ0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkTW9kZWwuZGlydHk7XG4gICAgfVxuICAgIHNldCBkaXJ0eShuZXdWYWx1ZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRoaXMuZGlydHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoYXJlZE1vZGVsLmRpcnR5ID0gbmV3VmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSByZWFkIG9ubHkgc3RhdGUgb2YgdGhlIGRvY3VtZW50LlxuICAgICAqL1xuICAgIGdldCByZWFkT25seSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRPbmx5O1xuICAgIH1cbiAgICBzZXQgcmVhZE9ubHkobmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0aGlzLl9yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5fcmVhZE9ubHk7XG4gICAgICAgIHRoaXMuX3JlYWRPbmx5ID0gbmV3VmFsdWU7XG4gICAgICAgIHRoaXMudHJpZ2dlclN0YXRlQ2hhbmdlKHsgbmFtZTogJ3JlYWRPbmx5Jywgb2xkVmFsdWUsIG5ld1ZhbHVlIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgbWV0YWRhdGEgYXNzb2NpYXRlZCB3aXRoIHRoZSBub3RlYm9vay5cbiAgICAgKi9cbiAgICBnZXQgbWV0YWRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsREIuZ2V0KCdtZXRhZGF0YScpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG9ic2VydmFibGUgbGlzdCBvZiBub3RlYm9vayBjZWxscy5cbiAgICAgKi9cbiAgICBnZXQgY2VsbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxscztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG1ham9yIHZlcnNpb24gbnVtYmVyIG9mIHRoZSBuYmZvcm1hdC5cbiAgICAgKi9cbiAgICBnZXQgbmJmb3JtYXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYmZvcm1hdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG1pbm9yIHZlcnNpb24gbnVtYmVyIG9mIHRoZSBuYmZvcm1hdC5cbiAgICAgKi9cbiAgICBnZXQgbmJmb3JtYXRNaW5vcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25iZm9ybWF0TWlub3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGtlcm5lbCBuYW1lIG9mIHRoZSBkb2N1bWVudC5cbiAgICAgKi9cbiAgICBnZXQgZGVmYXVsdEtlcm5lbE5hbWUoKSB7XG4gICAgICAgIGNvbnN0IHNwZWMgPSB0aGlzLm1ldGFkYXRhLmdldCgna2VybmVsc3BlYycpO1xuICAgICAgICByZXR1cm4gc3BlYyA/IHNwZWMubmFtZSA6ICcnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIGxpc3Qgb2YgZGVsZXRlZCBjZWxscyBmb3IgdGhlIG5vdGVib29rLi5cbiAgICAgKi9cbiAgICBnZXQgZGVsZXRlZENlbGxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVsZXRlZENlbGxzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgbW9kZWwgaXMgaW5pdGlhbGl6ZWQgb3Igbm90LlxuICAgICAqL1xuICAgIGdldCBpc0luaXRpYWxpemVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNJbml0aWFsaXplZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQga2VybmVsIGxhbmd1YWdlIG9mIHRoZSBkb2N1bWVudC5cbiAgICAgKi9cbiAgICBnZXQgZGVmYXVsdEtlcm5lbExhbmd1YWdlKCkge1xuICAgICAgICBjb25zdCBpbmZvID0gdGhpcy5tZXRhZGF0YS5nZXQoJ2xhbmd1YWdlX2luZm8nKTtcbiAgICAgICAgcmV0dXJuIGluZm8gPyBpbmZvLm5hbWUgOiAnJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIG1vZGVsLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgYWxyZWFkeSBkaXNwb3NlZC5cbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNlbGxzID0gdGhpcy5jZWxscztcbiAgICAgICAgdGhpcy5fY2VsbHMgPSBudWxsO1xuICAgICAgICBjZWxscy5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICBTaWduYWwuY2xlYXJEYXRhKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXJpYWxpemUgdGhlIG1vZGVsIHRvIGEgc3RyaW5nLlxuICAgICAqL1xuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy50b0pTT04oKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlc2VyaWFsaXplIHRoZSBtb2RlbCBmcm9tIGEgc3RyaW5nLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFNob3VsZCBlbWl0IGEgW2NvbnRlbnRDaGFuZ2VkXSBzaWduYWwuXG4gICAgICovXG4gICAgZnJvbVN0cmluZyh2YWx1ZSkge1xuICAgICAgICB0aGlzLmZyb21KU09OKEpTT04ucGFyc2UodmFsdWUpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VyaWFsaXplIHRoZSBtb2RlbCB0byBKU09OLlxuICAgICAqL1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgY2VsbHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAoKF9iID0gKF9hID0gdGhpcy5jZWxscykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMCk7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuY2VsbHMuZ2V0KGkpLnRvSlNPTigpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX25iZm9ybWF0ID09PSA0ICYmIHRoaXMuX25iZm9ybWF0TWlub3IgPD0gNCkge1xuICAgICAgICAgICAgICAgIC8vIHN0cmlwIGNlbGwgaWRzIGlmIHdlIGhhdmUgbm90ZWJvb2sgZm9ybWF0IDQuMC00LjRcbiAgICAgICAgICAgICAgICBkZWxldGUgY2VsbC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNlbGxzLnB1c2goY2VsbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZW5zdXJlTWV0YWRhdGEoKTtcbiAgICAgICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzLnNoYXJlZE1vZGVsLmdldE1ldGFkYXRhKCk7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMubWV0YWRhdGEua2V5cygpKSB7XG4gICAgICAgICAgICBtZXRhZGF0YVtrZXldID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLm1ldGFkYXRhLmdldChrZXkpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1ldGFkYXRhLFxuICAgICAgICAgICAgbmJmb3JtYXRfbWlub3I6IHRoaXMuX25iZm9ybWF0TWlub3IsXG4gICAgICAgICAgICBuYmZvcm1hdDogdGhpcy5fbmJmb3JtYXQsXG4gICAgICAgICAgICBjZWxsc1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZXNlcmlhbGl6ZSB0aGUgbW9kZWwgZnJvbSBKU09OLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFNob3VsZCBlbWl0IGEgW2NvbnRlbnRDaGFuZ2VkXSBzaWduYWwuXG4gICAgICovXG4gICAgZnJvbUpTT04odmFsdWUpIHtcbiAgICAgICAgY29uc3QgY2VsbHMgPSBbXTtcbiAgICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuY29udGVudEZhY3Rvcnk7XG4gICAgICAgIGNvbnN0IHVzZUlkID0gdmFsdWUubmJmb3JtYXQgPT09IDQgJiYgdmFsdWUubmJmb3JtYXRfbWlub3IgPj0gNTtcbiAgICAgICAgZm9yIChjb25zdCBjZWxsIG9mIHZhbHVlLmNlbGxzKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0geyBjZWxsIH07XG4gICAgICAgICAgICBpZiAodXNlSWQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmlkID0gY2VsbC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoY2VsbC5jZWxsX3R5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjb2RlJzpcbiAgICAgICAgICAgICAgICAgICAgY2VsbHMucHVzaChmYWN0b3J5LmNyZWF0ZUNvZGVDZWxsKG9wdGlvbnMpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWFya2Rvd24nOlxuICAgICAgICAgICAgICAgICAgICBjZWxscy5wdXNoKGZhY3RvcnkuY3JlYXRlTWFya2Rvd25DZWxsKG9wdGlvbnMpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmF3JzpcbiAgICAgICAgICAgICAgICAgICAgY2VsbHMucHVzaChmYWN0b3J5LmNyZWF0ZVJhd0NlbGwob3B0aW9ucykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNlbGxzLmJlZ2luQ29tcG91bmRPcGVyYXRpb24oKTtcbiAgICAgICAgdGhpcy5jZWxscy5jbGVhcigpO1xuICAgICAgICB0aGlzLmNlbGxzLnB1c2hBbGwoY2VsbHMpO1xuICAgICAgICB0aGlzLmNlbGxzLmVuZENvbXBvdW5kT3BlcmF0aW9uKCk7XG4gICAgICAgIHRoaXMuc2hhcmVkTW9kZWwubmJmb3JtYXRfbWlub3IgPVxuICAgICAgICAgICAgbmJmb3JtYXQuTUlOT1JfVkVSU0lPTjtcbiAgICAgICAgdGhpcy5zaGFyZWRNb2RlbC5uYmZvcm1hdCA9IG5iZm9ybWF0Lk1BSk9SX1ZFUlNJT047XG4gICAgICAgIGNvbnN0IG9yaWdOYmZvcm1hdCA9IHZhbHVlLm1ldGFkYXRhLm9yaWdfbmJmb3JtYXQ7XG4gICAgICAgIGlmICh2YWx1ZS5uYmZvcm1hdCAhPT0gdGhpcy5fbmJmb3JtYXQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkTW9kZWwubmJmb3JtYXQgPSB2YWx1ZS5uYmZvcm1hdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUubmJmb3JtYXRfbWlub3IgPiB0aGlzLl9uYmZvcm1hdE1pbm9yKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXJlZE1vZGVsLm5iZm9ybWF0X21pbm9yID1cbiAgICAgICAgICAgICAgICB2YWx1ZS5uYmZvcm1hdF9taW5vcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBBbGVydCB0aGUgdXNlciBpZiB0aGUgZm9ybWF0IGNoYW5nZXMuXG4gICAgICAgIGlmIChvcmlnTmJmb3JtYXQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9uYmZvcm1hdCAhPT0gb3JpZ05iZm9ybWF0KSB7XG4gICAgICAgICAgICBjb25zdCBuZXdlciA9IHRoaXMuX25iZm9ybWF0ID4gb3JpZ05iZm9ybWF0O1xuICAgICAgICAgICAgbGV0IG1zZztcbiAgICAgICAgICAgIGlmIChuZXdlcikge1xuICAgICAgICAgICAgICAgIG1zZyA9IHRoaXMuX3RyYW5zLl9fKGBUaGlzIG5vdGVib29rIGhhcyBiZWVuIGNvbnZlcnRlZCBmcm9tIGFuIG9sZGVyIG5vdGVib29rIGZvcm1hdCAodiUxKVxudG8gdGhlIGN1cnJlbnQgbm90ZWJvb2sgZm9ybWF0ICh2JTIpLlxuVGhlIG5leHQgdGltZSB5b3Ugc2F2ZSB0aGlzIG5vdGVib29rLCB0aGUgY3VycmVudCBub3RlYm9vayBmb3JtYXQgKHYlMikgd2lsbCBiZSB1c2VkLlxuJ09sZGVyIHZlcnNpb25zIG9mIEp1cHl0ZXIgbWF5IG5vdCBiZSBhYmxlIHRvIHJlYWQgdGhlIG5ldyBmb3JtYXQuJyBUbyBwcmVzZXJ2ZSB0aGUgb3JpZ2luYWwgZm9ybWF0IHZlcnNpb24sXG5jbG9zZSB0aGUgbm90ZWJvb2sgd2l0aG91dCBzYXZpbmcgaXQuYCwgb3JpZ05iZm9ybWF0LCB0aGlzLl9uYmZvcm1hdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBtc2cgPSB0aGlzLl90cmFucy5fXyhgVGhpcyBub3RlYm9vayBoYXMgYmVlbiBjb252ZXJ0ZWQgZnJvbSBhbiBuZXdlciBub3RlYm9vayBmb3JtYXQgKHYlMSlcbnRvIHRoZSBjdXJyZW50IG5vdGVib29rIGZvcm1hdCAodiUyKS5cblRoZSBuZXh0IHRpbWUgeW91IHNhdmUgdGhpcyBub3RlYm9vaywgdGhlIGN1cnJlbnQgbm90ZWJvb2sgZm9ybWF0ICh2JTIpIHdpbGwgYmUgdXNlZC5cblNvbWUgZmVhdHVyZXMgb2YgdGhlIG9yaWdpbmFsIG5vdGVib29rIG1heSBub3QgYmUgYXZhaWxhYmxlLicgVG8gcHJlc2VydmUgdGhlIG9yaWdpbmFsIGZvcm1hdCB2ZXJzaW9uLFxuY2xvc2UgdGhlIG5vdGVib29rIHdpdGhvdXQgc2F2aW5nIGl0LmAsIG9yaWdOYmZvcm1hdCwgdGhpcy5fbmJmb3JtYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdm9pZCBzaG93RGlhbG9nKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5fdHJhbnMuX18oJ05vdGVib29rIGNvbnZlcnRlZCcpLFxuICAgICAgICAgICAgICAgIGJvZHk6IG1zZyxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbRGlhbG9nLm9rQnV0dG9uKHsgbGFiZWw6IHRoaXMuX3RyYW5zLl9fKCdPaycpIH0pXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXBkYXRlIHRoZSBtZXRhZGF0YS5cbiAgICAgICAgdGhpcy5tZXRhZGF0YS5jbGVhcigpO1xuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IHZhbHVlLm1ldGFkYXRhO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBtZXRhZGF0YSkge1xuICAgICAgICAgICAgLy8gb3JpZ19uYmZvcm1hdCBpcyBub3QgaW50ZW5kZWQgdG8gYmUgc3RvcmVkIHBlciBzcGVjLlxuICAgICAgICAgICAgaWYgKGtleSA9PT0gJ29yaWdfbmJmb3JtYXQnKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1ldGFkYXRhLnNldChrZXksIG1ldGFkYXRhW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Vuc3VyZU1ldGFkYXRhKCk7XG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBtb2RlbCB3aXRoIGl0cyBjdXJyZW50IHN0YXRlLlxuICAgICAqXG4gICAgICogIyBOb3Rlc1xuICAgICAqIEFkZHMgYW4gZW1wdHkgY29kZSBjZWxsIGlmIHRoZSBtb2RlbCBpcyBlbXB0eVxuICAgICAqIGFuZCBjbGVhcnMgdW5kbyBzdGF0ZS5cbiAgICAgKi9cbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2VsbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5jb250ZW50RmFjdG9yeTtcbiAgICAgICAgICAgIHRoaXMuY2VsbHMucHVzaChmYWN0b3J5LmNyZWF0ZUNvZGVDZWxsKHt9KSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2VsbHMuY2xlYXJVbmRvKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSBpbiB0aGUgY2VsbHMgbGlzdC5cbiAgICAgKi9cbiAgICBfb25DZWxsc0NoYW5nZWQobGlzdCwgY2hhbmdlKSB7XG4gICAgICAgIHN3aXRjaCAoY2hhbmdlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2FkZCc6XG4gICAgICAgICAgICAgICAgY2hhbmdlLm5ld1ZhbHVlcy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNvbnRlbnRDaGFuZ2VkLmNvbm5lY3QodGhpcy50cmlnZ2VyQ29udGVudENoYW5nZSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyZW1vdmUnOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2V0JzpcbiAgICAgICAgICAgICAgICBjaGFuZ2UubmV3VmFsdWVzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY29udGVudENoYW5nZWQuY29ubmVjdCh0aGlzLnRyaWdnZXJDb250ZW50Q2hhbmdlLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmlnZ2VyQ29udGVudENoYW5nZSgpO1xuICAgIH1cbiAgICBfb25TdGF0ZUNoYW5nZWQoc2VuZGVyLCBjaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLnN0YXRlQ2hhbmdlKSB7XG4gICAgICAgICAgICBjaGFuZ2VzLnN0YXRlQ2hhbmdlLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5uYW1lID09PSAnbmJmb3JtYXQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25iZm9ybWF0ID0gdmFsdWUubmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5uYW1lID09PSAnbmJmb3JtYXRNaW5vcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmJmb3JtYXRNaW5vciA9IHZhbHVlLm5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUubmFtZSAhPT0gJ2RpcnR5JyB8fCB2YWx1ZS5vbGRWYWx1ZSAhPT0gdmFsdWUubmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyU3RhdGVDaGFuZ2UodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzLm1ldGFkYXRhQ2hhbmdlKSB7XG4gICAgICAgICAgICBjb25zdCBtZXRhZGF0YSA9IGNoYW5nZXMubWV0YWRhdGFDaGFuZ2UubmV3VmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9tb2RlbERCTXV0ZXgoKCkgPT4ge1xuICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKG1ldGFkYXRhKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRhZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfb25NZXRhZGF0YUNoYW5nZWQobWV0YWRhdGEsIGNoYW5nZSkge1xuICAgICAgICBpZiAoIVVOU0hBUkVEX0tFWVMuaW5jbHVkZXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGVsREJNdXRleCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRNb2RlbC51cGRhdGVNZXRhZGF0YShtZXRhZGF0YS50b0pTT04oKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyaWdnZXJDb250ZW50Q2hhbmdlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ha2Ugc3VyZSB3ZSBoYXZlIHRoZSByZXF1aXJlZCBtZXRhZGF0YSBmaWVsZHMuXG4gICAgICovXG4gICAgX2Vuc3VyZU1ldGFkYXRhKCkge1xuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IHRoaXMubWV0YWRhdGE7XG4gICAgICAgIGlmICghbWV0YWRhdGEuaGFzKCdsYW5ndWFnZV9pbmZvJykpIHtcbiAgICAgICAgICAgIG1ldGFkYXRhLnNldCgnbGFuZ3VhZ2VfaW5mbycsIHsgbmFtZTogJycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXRhZGF0YS5oYXMoJ2tlcm5lbHNwZWMnKSkge1xuICAgICAgICAgICAgbWV0YWRhdGEuc2V0KCdrZXJuZWxzcGVjJywgeyBuYW1lOiAnJywgZGlzcGxheV9uYW1lOiAnJyB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyIGEgc3RhdGUgY2hhbmdlIHNpZ25hbC5cbiAgICAgKi9cbiAgICB0cmlnZ2VyU3RhdGVDaGFuZ2UoYXJncykge1xuICAgICAgICB0aGlzLl9zdGF0ZUNoYW5nZWQuZW1pdChhcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJpZ2dlciBhIGNvbnRlbnQgY2hhbmdlZCBzaWduYWwuXG4gICAgICovXG4gICAgdHJpZ2dlckNvbnRlbnRDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIG1vZGVsIGlzIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBpc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEaXNwb3NlZDtcbiAgICB9XG59XG4vKipcbiAqIFRoZSBuYW1lc3BhY2UgZm9yIHRoZSBgTm90ZWJvb2tNb2RlbGAgY2xhc3Mgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChOb3RlYm9va01vZGVsKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgYW4gYElDb250ZW50RmFjdG9yeWAuXG4gICAgICovXG4gICAgY2xhc3MgQ29udGVudEZhY3Rvcnkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgbmV3IGNlbGwgbW9kZWwgZmFjdG9yeS5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuY29kZUNlbGxDb250ZW50RmFjdG9yeSA9XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb2RlQ2VsbENvbnRlbnRGYWN0b3J5IHx8IENvZGVDZWxsTW9kZWwuZGVmYXVsdENvbnRlbnRGYWN0b3J5O1xuICAgICAgICAgICAgdGhpcy5tb2RlbERCID0gb3B0aW9ucy5tb2RlbERCO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgYSBuZXcgY2VsbCBieSBjZWxsIHR5cGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB0eXBlOiAgdGhlIHR5cGUgb2YgdGhlIGNlbGwgdG8gY3JlYXRlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gb3B0aW9uczogdGhlIGNlbGwgY3JlYXRpb24gb3B0aW9ucy5cbiAgICAgICAgICpcbiAgICAgICAgICogIyMjIyBOb3Rlc1xuICAgICAgICAgKiBUaGlzIG1ldGhvZCBpcyBpbnRlbmRlZCB0byBiZSBhIGNvbnZlbmllbmNlIG1ldGhvZCB0byBwcm9ncmFtbWF0aWNhbGx5XG4gICAgICAgICAqIGNhbGwgdGhlIG90aGVyIGNlbGwgY3JlYXRpb24gbWV0aG9kcyBpbiB0aGUgZmFjdG9yeS5cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZUNlbGwodHlwZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29kZSc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUNvZGVDZWxsKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21hcmtkb3duJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTWFya2Rvd25DZWxsKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Jhdyc6XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlUmF3Q2VsbChvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgbmV3IGNvZGUgY2VsbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHNvdXJjZSAtIFRoZSBkYXRhIHRvIHVzZSBmb3IgdGhlIG9yaWdpbmFsIHNvdXJjZSBkYXRhLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBBIG5ldyBjb2RlIGNlbGwuIElmIGEgc291cmNlIGNlbGwgaXMgcHJvdmlkZWQsIHRoZVxuICAgICAgICAgKiAgIG5ldyBjZWxsIHdpbGwgYmUgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZGF0YSBmcm9tIHRoZSBzb3VyY2UuXG4gICAgICAgICAqICAgSWYgdGhlIGNvbnRlbnRGYWN0b3J5IGlzIG5vdCBwcm92aWRlZCwgdGhlIGluc3RhbmNlXG4gICAgICAgICAqICAgYGNvZGVDZWxsQ29udGVudEZhY3RvcnlgIHdpbGwgYmUgdXNlZC5cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZUNvZGVDZWxsKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNvbnRlbnRGYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZW50RmFjdG9yeSA9IHRoaXMuY29kZUNlbGxDb250ZW50RmFjdG9yeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsREIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5pZCA9IFVVSUQudXVpZDQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5tb2RlbERCID0gdGhpcy5tb2RlbERCLnZpZXcob3B0aW9ucy5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IENvZGVDZWxsTW9kZWwob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhIG5ldyBtYXJrZG93biBjZWxsLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gc291cmNlIC0gVGhlIGRhdGEgdG8gdXNlIGZvciB0aGUgb3JpZ2luYWwgc291cmNlIGRhdGEuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIEEgbmV3IG1hcmtkb3duIGNlbGwuIElmIGEgc291cmNlIGNlbGwgaXMgcHJvdmlkZWQsIHRoZVxuICAgICAgICAgKiAgIG5ldyBjZWxsIHdpbGwgYmUgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZGF0YSBmcm9tIHRoZSBzb3VyY2UuXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVNYXJrZG93bkNlbGwob3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWxEQikge1xuICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy5pZCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmlkID0gVVVJRC51dWlkNCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcHRpb25zLm1vZGVsREIgPSB0aGlzLm1vZGVsREIudmlldyhvcHRpb25zLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgTWFya2Rvd25DZWxsTW9kZWwob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhIG5ldyByYXcgY2VsbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHNvdXJjZSAtIFRoZSBkYXRhIHRvIHVzZSBmb3IgdGhlIG9yaWdpbmFsIHNvdXJjZSBkYXRhLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBBIG5ldyByYXcgY2VsbC4gSWYgYSBzb3VyY2UgY2VsbCBpcyBwcm92aWRlZCwgdGhlXG4gICAgICAgICAqICAgbmV3IGNlbGwgd2lsbCBiZSBpbml0aWFsaXplZCB3aXRoIHRoZSBkYXRhIGZyb20gdGhlIHNvdXJjZS5cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZVJhd0NlbGwob3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWxEQikge1xuICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy5pZCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmlkID0gVVVJRC51dWlkNCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcHRpb25zLm1vZGVsREIgPSB0aGlzLm1vZGVsREIudmlldyhvcHRpb25zLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUmF3Q2VsbE1vZGVsKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbG9uZSB0aGUgY29udGVudCBmYWN0b3J5IHdpdGggYSBuZXcgSU1vZGVsREIuXG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZShtb2RlbERCKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENvbnRlbnRGYWN0b3J5KHtcbiAgICAgICAgICAgICAgICBtb2RlbERCOiBtb2RlbERCLFxuICAgICAgICAgICAgICAgIGNvZGVDZWxsQ29udGVudEZhY3Rvcnk6IHRoaXMuY29kZUNlbGxDb250ZW50RmFjdG9yeVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgTm90ZWJvb2tNb2RlbC5Db250ZW50RmFjdG9yeSA9IENvbnRlbnRGYWN0b3J5O1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGBDb250ZW50RmFjdG9yeWAgaW5zdGFuY2UuXG4gICAgICovXG4gICAgTm90ZWJvb2tNb2RlbC5kZWZhdWx0Q29udGVudEZhY3RvcnkgPSBuZXcgQ29udGVudEZhY3Rvcnkoe30pO1xufSkoTm90ZWJvb2tNb2RlbCB8fCAoTm90ZWJvb2tNb2RlbCA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2RlbC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBOb3RlYm9va01vZGVsIH0gZnJvbSAnLi9tb2RlbCc7XG4vKipcbiAqIEEgbW9kZWwgZmFjdG9yeSBmb3Igbm90ZWJvb2tzLlxuICovXG5leHBvcnQgY2xhc3MgTm90ZWJvb2tNb2RlbEZhY3Rvcnkge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBub3RlYm9vayBtb2RlbCBmYWN0b3J5LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fZGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGlzYWJsZURvY3VtZW50V2lkZVVuZG9SZWRvID1cbiAgICAgICAgICAgIG9wdGlvbnMuZGlzYWJsZURvY3VtZW50V2lkZVVuZG9SZWRvIHx8IGZhbHNlO1xuICAgICAgICBjb25zdCBjb2RlQ2VsbENvbnRlbnRGYWN0b3J5ID0gb3B0aW9ucy5jb2RlQ2VsbENvbnRlbnRGYWN0b3J5O1xuICAgICAgICB0aGlzLmNvbnRlbnRGYWN0b3J5ID1cbiAgICAgICAgICAgIG9wdGlvbnMuY29udGVudEZhY3RvcnkgfHxcbiAgICAgICAgICAgICAgICBuZXcgTm90ZWJvb2tNb2RlbC5Db250ZW50RmFjdG9yeSh7IGNvZGVDZWxsQ29udGVudEZhY3RvcnkgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmluZSB0aGUgZGlzYWJsZURvY3VtZW50V2lkZVVuZG9SZWRvIHByb3BlcnR5LlxuICAgICAqL1xuICAgIHNldCBkaXNhYmxlRG9jdW1lbnRXaWRlVW5kb1JlZG8oZGlzYWJsZURvY3VtZW50V2lkZVVuZG9SZWRvKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVEb2N1bWVudFdpZGVVbmRvUmVkbyA9IGRpc2FibGVEb2N1bWVudFdpZGVVbmRvUmVkbztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsLlxuICAgICAqL1xuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gJ25vdGVib29rJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGNvbnRlbnQgdHlwZSBvZiB0aGUgZmlsZS5cbiAgICAgKi9cbiAgICBnZXQgY29udGVudFR5cGUoKSB7XG4gICAgICAgIHJldHVybiAnbm90ZWJvb2snO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZm9ybWF0IG9mIHRoZSBmaWxlLlxuICAgICAqL1xuICAgIGdldCBmaWxlRm9ybWF0KCkge1xuICAgICAgICByZXR1cm4gJ2pzb24nO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgd2hldGhlciB0aGUgbW9kZWwgZmFjdG9yeSBoYXMgYmVlbiBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3Bvc2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSBtb2RlbCBmYWN0b3J5LlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IG1vZGVsIGZvciBhIGdpdmVuIHBhdGguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2VQcmVmZXJlbmNlIC0gQW4gb3B0aW9uYWwga2VybmVsIGxhbmd1YWdlIHByZWZlcmVuY2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIG5ldyBkb2N1bWVudCBtb2RlbC5cbiAgICAgKi9cbiAgICBjcmVhdGVOZXcobGFuZ3VhZ2VQcmVmZXJlbmNlLCBtb2RlbERCLCBpc0luaXRpYWxpemVkKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRGYWN0b3J5ID0gdGhpcy5jb250ZW50RmFjdG9yeTtcbiAgICAgICAgcmV0dXJuIG5ldyBOb3RlYm9va01vZGVsKHtcbiAgICAgICAgICAgIGxhbmd1YWdlUHJlZmVyZW5jZSxcbiAgICAgICAgICAgIGNvbnRlbnRGYWN0b3J5LFxuICAgICAgICAgICAgbW9kZWxEQixcbiAgICAgICAgICAgIGlzSW5pdGlhbGl6ZWQsXG4gICAgICAgICAgICBkaXNhYmxlRG9jdW1lbnRXaWRlVW5kb1JlZG86IHRoaXMuX2Rpc2FibGVEb2N1bWVudFdpZGVVbmRvUmVkb1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBwcmVmZXJyZWQga2VybmVsIGxhbmd1YWdlIGdpdmVuIGEgcGF0aC5cbiAgICAgKi9cbiAgICBwcmVmZXJyZWRMYW5ndWFnZShwYXRoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2RlbGZhY3RvcnkuanMubWFwIiwiaW1wb3J0IHsgVkRvbU1vZGVsLCBWRG9tUmVuZGVyZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBUZXh0SXRlbSB9IGZyb20gJ0BqdXB5dGVybGFiL3N0YXR1c2Jhcic7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8qKlxuICogQSBwdXJlIGZ1bmN0aW9uIGZvciByZW5kZXJpbmcgYSBDb21tYW5kL0VkaXQgbW9kZSBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHByb3BzOiB0aGUgcHJvcHMgZm9yIHJlbmRlcmluZyB0aGUgY29tcG9uZW50LlxuICpcbiAqIEByZXR1cm5zIGEgdHN4IGNvbXBvbmVudCBmb3IgY29tbWFuZC9lZGl0IG1vZGUuXG4gKi9cbmZ1bmN0aW9uIENvbW1hbmRFZGl0Q29tcG9uZW50KHByb3BzKSB7XG4gICAgY29uc3QgdHJhbnMgPSAocHJvcHMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcikubG9hZCgnanVweXRlcmxhYicpO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0SXRlbSwgeyBzb3VyY2U6IHRyYW5zLl9fKCdNb2RlOiAlMScsIHByb3BzLm1vZGVOYW1lc1twcm9wcy5ub3RlYm9va01vZGVdKSB9KSk7XG59XG4vKipcbiAqIFN0YXR1c0JhciBpdGVtIHRvIGRpc3BsYXkgd2hpY2ggbm90ZWJvb2sgbW9kZSB1c2VyIGlzIGluLlxuICovXG5leHBvcnQgY2xhc3MgQ29tbWFuZEVkaXRTdGF0dXMgZXh0ZW5kcyBWRG9tUmVuZGVyZXIge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBDb21tYW5kRWRpdCBzdGF0dXMgaXRlbS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0cmFuc2xhdG9yKSB7XG4gICAgICAgIHN1cGVyKG5ldyBDb21tYW5kRWRpdFN0YXR1cy5Nb2RlbCgpKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgdGhpcy5fdHJhbnMgPSB0aGlzLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICB0aGlzLl9tb2RlTmFtZXMgPSB7XG4gICAgICAgICAgICBjb21tYW5kOiB0aGlzLl90cmFucy5fXygnQ29tbWFuZCcpLFxuICAgICAgICAgICAgZWRpdDogdGhpcy5fdHJhbnMuX18oJ0VkaXQnKVxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgdGhlIENvbW1hbmRFZGl0IHN0YXR1cyBpdGVtLlxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUudGl0bGUgPSB0aGlzLl90cmFucy5fXygnTm90ZWJvb2sgaXMgaW4gJTEgbW9kZScsIHRoaXMuX21vZGVOYW1lc1t0aGlzLm1vZGVsLm5vdGVib29rTW9kZV0pO1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tbWFuZEVkaXRDb21wb25lbnQsIHsgbm90ZWJvb2tNb2RlOiB0aGlzLm1vZGVsLm5vdGVib29rTW9kZSwgdHJhbnNsYXRvcjogdGhpcy50cmFuc2xhdG9yLCBtb2RlTmFtZXM6IHRoaXMuX21vZGVOYW1lcyB9KSk7XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgQ29tbWFuZEVkaXQgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChDb21tYW5kRWRpdFN0YXR1cykge1xuICAgIC8qKlxuICAgICAqIEEgVkRvbU1vZGVsIGZvciB0aGUgQ29tbWFuZEVkaXQgcmVuZGVyZXIuXG4gICAgICovXG4gICAgY2xhc3MgTW9kZWwgZXh0ZW5kcyBWRG9tTW9kZWwge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIE9uIGEgY2hhbmdlIHRvIHRoZSBub3RlYm9vaywgdXBkYXRlIHRoZSBtb2RlLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZWQgPSAoX25vdGVib29rKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkTW9kZSA9IHRoaXMuX25vdGVib29rTW9kZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbm90ZWJvb2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbm90ZWJvb2tNb2RlID0gX25vdGVib29rLm1vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ub3RlYm9va01vZGUgPSAnY29tbWFuZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDaGFuZ2Uob2xkTW9kZSwgdGhpcy5fbm90ZWJvb2tNb2RlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9ub3RlYm9va01vZGUgPSAnY29tbWFuZCc7XG4gICAgICAgICAgICB0aGlzLl9ub3RlYm9vayA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjdXJyZW50IG1vZGUgb2YgdGhlIGN1cnJlbnQgbm90ZWJvb2suXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgbm90ZWJvb2tNb2RlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25vdGVib29rTW9kZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHRoZSBjdXJyZW50IG5vdGVib29rIGZvciB0aGUgbW9kZWwuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQgbm90ZWJvb2sobm90ZWJvb2spIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZE5vdGVib29rID0gdGhpcy5fbm90ZWJvb2s7XG4gICAgICAgICAgICBpZiAob2xkTm90ZWJvb2sgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvbGROb3RlYm9vay5zdGF0ZUNoYW5nZWQuZGlzY29ubmVjdCh0aGlzLl9vbkNoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgICAgIG9sZE5vdGVib29rLmFjdGl2ZUNlbGxDaGFuZ2VkLmRpc2Nvbm5lY3QodGhpcy5fb25DaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBvbGROb3RlYm9vay5tb2RlbENvbnRlbnRDaGFuZ2VkLmRpc2Nvbm5lY3QodGhpcy5fb25DaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG9sZE1vZGUgPSB0aGlzLl9ub3RlYm9va01vZGU7XG4gICAgICAgICAgICB0aGlzLl9ub3RlYm9vayA9IG5vdGVib29rO1xuICAgICAgICAgICAgaWYgKHRoaXMuX25vdGVib29rID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbm90ZWJvb2tNb2RlID0gJ2NvbW1hbmQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbm90ZWJvb2tNb2RlID0gdGhpcy5fbm90ZWJvb2subW9kZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ub3RlYm9vay5zdGF0ZUNoYW5nZWQuY29ubmVjdCh0aGlzLl9vbkNoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX25vdGVib29rLmFjdGl2ZUNlbGxDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25DaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ub3RlYm9vay5tb2RlbENvbnRlbnRDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25DaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDaGFuZ2Uob2xkTW9kZSwgdGhpcy5fbm90ZWJvb2tNb2RlKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVHJpZ2dlciBhIHN0YXRlIGNoYW5nZSBmb3IgdGhlIHJlbmRlcmVyLlxuICAgICAgICAgKi9cbiAgICAgICAgX3RyaWdnZXJDaGFuZ2Uob2xkU3RhdGUsIG5ld1N0YXRlKSB7XG4gICAgICAgICAgICBpZiAob2xkU3RhdGUgIT09IG5ld1N0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIENvbW1hbmRFZGl0U3RhdHVzLk1vZGVsID0gTW9kZWw7XG59KShDb21tYW5kRWRpdFN0YXR1cyB8fCAoQ29tbWFuZEVkaXRTdGF0dXMgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9kZXN0YXR1cy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBDb2xsYXBzZSwgU3R5bGluZyB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IENvZGVFZGl0b3IsIENvZGVFZGl0b3JXcmFwcGVyLCBKU09ORWRpdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29kZWVkaXRvcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlSlNPTiB9IGZyb20gJ0BqdXB5dGVybGFiL29ic2VydmFibGVzJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgQXJyYXlFeHQsIGNoYWluLCBlYWNoIH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IHsgQ29uZmxhdGFibGVNZXNzYWdlLCBNZXNzYWdlTG9vcCB9IGZyb20gJ0BsdW1pbm8vbWVzc2FnaW5nJztcbmltcG9ydCB7IGgsIFZpcnR1YWxET00gfSBmcm9tICdAbHVtaW5vL3ZpcnR1YWxkb20nO1xuaW1wb3J0IHsgUGFuZWxMYXlvdXQsIFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5jbGFzcyBSYW5rZWRQYW5lbCBleHRlbmRzIFdpZGdldCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gW107XG4gICAgICAgIHRoaXMubGF5b3V0ID0gbmV3IFBhbmVsTGF5b3V0KCk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLVJhbmtlZFBhbmVsJyk7XG4gICAgfVxuICAgIGFkZFdpZGdldCh3aWRnZXQsIHJhbmspIHtcbiAgICAgICAgY29uc3QgcmFua0l0ZW0gPSB7IHdpZGdldCwgcmFuayB9O1xuICAgICAgICBjb25zdCBpbmRleCA9IEFycmF5RXh0LnVwcGVyQm91bmQodGhpcy5faXRlbXMsIHJhbmtJdGVtLCBQcml2YXRlLml0ZW1DbXApO1xuICAgICAgICBBcnJheUV4dC5pbnNlcnQodGhpcy5faXRlbXMsIGluZGV4LCByYW5rSXRlbSk7XG4gICAgICAgIGNvbnN0IGxheW91dCA9IHRoaXMubGF5b3V0O1xuICAgICAgICBsYXlvdXQuaW5zZXJ0V2lkZ2V0KGluZGV4LCB3aWRnZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIHJlbW92YWwgb2YgYSBjaGlsZFxuICAgICAqXG4gICAgICovXG4gICAgb25DaGlsZFJlbW92ZWQobXNnKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gQXJyYXlFeHQuZmluZEZpcnN0SW5kZXgodGhpcy5faXRlbXMsIGl0ZW0gPT4gaXRlbS53aWRnZXQgPT09IG1zZy5jaGlsZCk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIEFycmF5RXh0LnJlbW92ZUF0KHRoaXMuX2l0ZW1zLCBpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEEgd2lkZ2V0IHRoYXQgcHJvdmlkZXMgbWV0YWRhdGEgdG9vbHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBOb3RlYm9va1Rvb2xzIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgTm90ZWJvb2tUb29scyBvYmplY3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1Ob3RlYm9va1Rvb2xzJyk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRvciA9IG9wdGlvbnMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgdGhpcy5fdHJhbnMgPSB0aGlzLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICB0aGlzLl9jb21tb25Ub29scyA9IG5ldyBSYW5rZWRQYW5lbCgpO1xuICAgICAgICB0aGlzLl9hZHZhbmNlZFRvb2xzID0gbmV3IFJhbmtlZFBhbmVsKCk7XG4gICAgICAgIHRoaXMuX2FkdmFuY2VkVG9vbHMudGl0bGUubGFiZWwgPSB0aGlzLl90cmFucy5fXygnQWR2YW5jZWQgVG9vbHMnKTtcbiAgICAgICAgY29uc3QgbGF5b3V0ID0gKHRoaXMubGF5b3V0ID0gbmV3IFBhbmVsTGF5b3V0KCkpO1xuICAgICAgICBsYXlvdXQuYWRkV2lkZ2V0KHRoaXMuX2NvbW1vblRvb2xzKTtcbiAgICAgICAgbGF5b3V0LmFkZFdpZGdldChuZXcgQ29sbGFwc2UoeyB3aWRnZXQ6IHRoaXMuX2FkdmFuY2VkVG9vbHMgfSkpO1xuICAgICAgICB0aGlzLl90cmFja2VyID0gb3B0aW9ucy50cmFja2VyO1xuICAgICAgICB0aGlzLl90cmFja2VyLmN1cnJlbnRDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25BY3RpdmVOb3RlYm9va1BhbmVsQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuX3RyYWNrZXIuYWN0aXZlQ2VsbENoYW5nZWQuY29ubmVjdCh0aGlzLl9vbkFjdGl2ZUNlbGxDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fdHJhY2tlci5zZWxlY3Rpb25DaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25TZWxlY3Rpb25DaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fb25BY3RpdmVOb3RlYm9va1BhbmVsQ2hhbmdlZCgpO1xuICAgICAgICB0aGlzLl9vbkFjdGl2ZUNlbGxDaGFuZ2VkKCk7XG4gICAgICAgIHRoaXMuX29uU2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgYWN0aXZlIGNlbGwgd2lkZ2V0LlxuICAgICAqL1xuICAgIGdldCBhY3RpdmVDZWxsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHJhY2tlci5hY3RpdmVDZWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGNlbGxzLlxuICAgICAqL1xuICAgIGdldCBzZWxlY3RlZENlbGxzKCkge1xuICAgICAgICBjb25zdCBwYW5lbCA9IHRoaXMuX3RyYWNrZXIuY3VycmVudFdpZGdldDtcbiAgICAgICAgaWYgKCFwYW5lbCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5vdGVib29rID0gcGFuZWwuY29udGVudDtcbiAgICAgICAgcmV0dXJuIG5vdGVib29rLndpZGdldHMuZmlsdGVyKGNlbGwgPT4gbm90ZWJvb2suaXNTZWxlY3RlZE9yQWN0aXZlKGNlbGwpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgbm90ZWJvb2suXG4gICAgICovXG4gICAgZ2V0IGFjdGl2ZU5vdGVib29rUGFuZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIGNlbGwgdG9vbCBpdGVtLlxuICAgICAqL1xuICAgIGFkZEl0ZW0ob3B0aW9ucykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHRvb2wgPSBvcHRpb25zLnRvb2w7XG4gICAgICAgIGNvbnN0IHJhbmsgPSAoX2EgPSBvcHRpb25zLnJhbmspICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDEwMDtcbiAgICAgICAgbGV0IHNlY3Rpb247XG4gICAgICAgIGlmIChvcHRpb25zLnNlY3Rpb24gPT09ICdhZHZhbmNlZCcpIHtcbiAgICAgICAgICAgIHNlY3Rpb24gPSB0aGlzLl9hZHZhbmNlZFRvb2xzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VjdGlvbiA9IHRoaXMuX2NvbW1vblRvb2xzO1xuICAgICAgICB9XG4gICAgICAgIHRvb2wuYWRkQ2xhc3MoJ2pwLU5vdGVib29rVG9vbHMtdG9vbCcpO1xuICAgICAgICBzZWN0aW9uLmFkZFdpZGdldCh0b29sLCByYW5rKTtcbiAgICAgICAgLy8gVE9ETzogcGVyaGFwcyB0aGUgbmVjZXNzYXJ5IG5vdGVib29rVG9vbHMgZnVuY3Rpb25hbGl0eSBzaG91bGQgYmVcbiAgICAgICAgLy8gY29uc29saWRhdGVkIGludG8gYSBzaW5nbGUgb2JqZWN0LCByYXRoZXIgdGhhbiBhIGJyb2FkIHJlZmVyZW5jZSB0byB0aGlzLlxuICAgICAgICB0b29sLm5vdGVib29rVG9vbHMgPSB0aGlzO1xuICAgICAgICAvLyBUcmlnZ2VyIHRoZSB0b29sIHRvIHVwZGF0ZSBpdHMgYWN0aXZlIG5vdGVib29rIGFuZCBjZWxsLlxuICAgICAgICBNZXNzYWdlTG9vcC5zZW5kTWVzc2FnZSh0b29sLCBOb3RlYm9va1Rvb2xzLkFjdGl2ZU5vdGVib29rUGFuZWxNZXNzYWdlKTtcbiAgICAgICAgTWVzc2FnZUxvb3Auc2VuZE1lc3NhZ2UodG9vbCwgTm90ZWJvb2tUb29scy5BY3RpdmVDZWxsTWVzc2FnZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUgbm90ZWJvb2sgcGFuZWwuXG4gICAgICovXG4gICAgX29uQWN0aXZlTm90ZWJvb2tQYW5lbENoYW5nZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9wcmV2QWN0aXZlTm90ZWJvb2tNb2RlbCAmJlxuICAgICAgICAgICAgIXRoaXMuX3ByZXZBY3RpdmVOb3RlYm9va01vZGVsLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZBY3RpdmVOb3RlYm9va01vZGVsLm1ldGFkYXRhLmNoYW5nZWQuZGlzY29ubmVjdCh0aGlzLl9vbkFjdGl2ZU5vdGVib29rUGFuZWxNZXRhZGF0YUNoYW5nZWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFjdGl2ZU5CTW9kZWwgPSB0aGlzLmFjdGl2ZU5vdGVib29rUGFuZWwgJiYgdGhpcy5hY3RpdmVOb3RlYm9va1BhbmVsLmNvbnRlbnRcbiAgICAgICAgICAgID8gdGhpcy5hY3RpdmVOb3RlYm9va1BhbmVsLmNvbnRlbnQubW9kZWxcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgdGhpcy5fcHJldkFjdGl2ZU5vdGVib29rTW9kZWwgPSBhY3RpdmVOQk1vZGVsO1xuICAgICAgICBpZiAoYWN0aXZlTkJNb2RlbCkge1xuICAgICAgICAgICAgYWN0aXZlTkJNb2RlbC5tZXRhZGF0YS5jaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25BY3RpdmVOb3RlYm9va1BhbmVsTWV0YWRhdGFDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlYWNoKHRoaXMuX3Rvb2xDaGlsZHJlbigpLCB3aWRnZXQgPT4ge1xuICAgICAgICAgICAgTWVzc2FnZUxvb3Auc2VuZE1lc3NhZ2Uod2lkZ2V0LCBOb3RlYm9va1Rvb2xzLkFjdGl2ZU5vdGVib29rUGFuZWxNZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUgYWN0aXZlIGNlbGwuXG4gICAgICovXG4gICAgX29uQWN0aXZlQ2VsbENoYW5nZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9wcmV2QWN0aXZlQ2VsbCAmJiAhdGhpcy5fcHJldkFjdGl2ZUNlbGwuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgdGhpcy5fcHJldkFjdGl2ZUNlbGwubWV0YWRhdGEuY2hhbmdlZC5kaXNjb25uZWN0KHRoaXMuX29uQWN0aXZlQ2VsbE1ldGFkYXRhQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWN0aXZlQ2VsbCA9IHRoaXMuYWN0aXZlQ2VsbCA/IHRoaXMuYWN0aXZlQ2VsbC5tb2RlbCA6IG51bGw7XG4gICAgICAgIHRoaXMuX3ByZXZBY3RpdmVDZWxsID0gYWN0aXZlQ2VsbDtcbiAgICAgICAgaWYgKGFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIGFjdGl2ZUNlbGwubWV0YWRhdGEuY2hhbmdlZC5jb25uZWN0KHRoaXMuX29uQWN0aXZlQ2VsbE1ldGFkYXRhQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWFjaCh0aGlzLl90b29sQ2hpbGRyZW4oKSwgd2lkZ2V0ID0+IHtcbiAgICAgICAgICAgIE1lc3NhZ2VMb29wLnNlbmRNZXNzYWdlKHdpZGdldCwgTm90ZWJvb2tUb29scy5BY3RpdmVDZWxsTWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgaW4gdGhlIHNlbGVjdGlvbi5cbiAgICAgKi9cbiAgICBfb25TZWxlY3Rpb25DaGFuZ2VkKCkge1xuICAgICAgICBlYWNoKHRoaXMuX3Rvb2xDaGlsZHJlbigpLCB3aWRnZXQgPT4ge1xuICAgICAgICAgICAgTWVzc2FnZUxvb3Auc2VuZE1lc3NhZ2Uod2lkZ2V0LCBOb3RlYm9va1Rvb2xzLlNlbGVjdGlvbk1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIGluIHRoZSBhY3RpdmUgY2VsbCBtZXRhZGF0YS5cbiAgICAgKi9cbiAgICBfb25BY3RpdmVOb3RlYm9va1BhbmVsTWV0YWRhdGFDaGFuZ2VkKHNlbmRlciwgYXJncykge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gbmV3IE9ic2VydmFibGVKU09OLkNoYW5nZU1lc3NhZ2UoJ2FjdGl2ZW5vdGVib29rcGFuZWwtbWV0YWRhdGEtY2hhbmdlZCcsIGFyZ3MpO1xuICAgICAgICBlYWNoKHRoaXMuX3Rvb2xDaGlsZHJlbigpLCB3aWRnZXQgPT4ge1xuICAgICAgICAgICAgTWVzc2FnZUxvb3Auc2VuZE1lc3NhZ2Uod2lkZ2V0LCBtZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSBpbiB0aGUgbm90ZWJvb2sgbW9kZWwgbWV0YWRhdGEuXG4gICAgICovXG4gICAgX29uQWN0aXZlQ2VsbE1ldGFkYXRhQ2hhbmdlZChzZW5kZXIsIGFyZ3MpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IG5ldyBPYnNlcnZhYmxlSlNPTi5DaGFuZ2VNZXNzYWdlKCdhY3RpdmVjZWxsLW1ldGFkYXRhLWNoYW5nZWQnLCBhcmdzKTtcbiAgICAgICAgZWFjaCh0aGlzLl90b29sQ2hpbGRyZW4oKSwgd2lkZ2V0ID0+IHtcbiAgICAgICAgICAgIE1lc3NhZ2VMb29wLnNlbmRNZXNzYWdlKHdpZGdldCwgbWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfdG9vbENoaWxkcmVuKCkge1xuICAgICAgICByZXR1cm4gY2hhaW4odGhpcy5fY29tbW9uVG9vbHMuY2hpbGRyZW4oKSwgdGhpcy5fYWR2YW5jZWRUb29scy5jaGlsZHJlbigpKTtcbiAgICB9XG59XG4vKipcbiAqIFRoZSBuYW1lc3BhY2UgZm9yIE5vdGVib29rVG9vbHMgY2xhc3Mgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChOb3RlYm9va1Rvb2xzKSB7XG4gICAgLyoqXG4gICAgICogQSBzaW5nbGV0b24gY29uZmxhdGFibGUgYCdhY3RpdmVub3RlYm9va3BhbmVsLWNoYW5nZWQnYCBtZXNzYWdlLlxuICAgICAqL1xuICAgIE5vdGVib29rVG9vbHMuQWN0aXZlTm90ZWJvb2tQYW5lbE1lc3NhZ2UgPSBuZXcgQ29uZmxhdGFibGVNZXNzYWdlKCdhY3RpdmVub3RlYm9va3BhbmVsLWNoYW5nZWQnKTtcbiAgICAvKipcbiAgICAgKiBBIHNpbmdsZXRvbiBjb25mbGF0YWJsZSBgJ2FjdGl2ZWNlbGwtY2hhbmdlZCdgIG1lc3NhZ2UuXG4gICAgICovXG4gICAgTm90ZWJvb2tUb29scy5BY3RpdmVDZWxsTWVzc2FnZSA9IG5ldyBDb25mbGF0YWJsZU1lc3NhZ2UoJ2FjdGl2ZWNlbGwtY2hhbmdlZCcpO1xuICAgIC8qKlxuICAgICAqIEEgc2luZ2xldG9uIGNvbmZsYXRhYmxlIGAnc2VsZWN0aW9uLWNoYW5nZWQnYCBtZXNzYWdlLlxuICAgICAqL1xuICAgIE5vdGVib29rVG9vbHMuU2VsZWN0aW9uTWVzc2FnZSA9IG5ldyBDb25mbGF0YWJsZU1lc3NhZ2UoJ3NlbGVjdGlvbi1jaGFuZ2VkJyk7XG4gICAgLyoqXG4gICAgICogVGhlIGJhc2Ugbm90ZWJvb2sgdG9vbCwgbWVhbnQgdG8gYmUgc3ViY2xhc3NlZC5cbiAgICAgKi9cbiAgICBjbGFzcyBUb29sIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAgICAgZGlzcG9zZSgpIHtcbiAgICAgICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm5vdGVib29rVG9vbHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVib29rVG9vbHMgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQcm9jZXNzIGEgbWVzc2FnZSBzZW50IHRvIHRoZSB3aWRnZXQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBtc2cgLSBUaGUgbWVzc2FnZSBzZW50IHRvIHRoZSB3aWRnZXQuXG4gICAgICAgICAqL1xuICAgICAgICBwcm9jZXNzTWVzc2FnZShtc2cpIHtcbiAgICAgICAgICAgIHN1cGVyLnByb2Nlc3NNZXNzYWdlKG1zZyk7XG4gICAgICAgICAgICBzd2l0Y2ggKG1zZy50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYWN0aXZlbm90ZWJvb2twYW5lbC1jaGFuZ2VkJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkFjdGl2ZU5vdGVib29rUGFuZWxDaGFuZ2VkKG1zZyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FjdGl2ZWNlbGwtY2hhbmdlZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25BY3RpdmVDZWxsQ2hhbmdlZChtc2cpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzZWxlY3Rpb24tY2hhbmdlZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkKG1zZyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FjdGl2ZWNlbGwtbWV0YWRhdGEtY2hhbmdlZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25BY3RpdmVDZWxsTWV0YWRhdGFDaGFuZ2VkKG1zZyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FjdGl2ZW5vdGVib29rcGFuZWwtbWV0YWRhdGEtY2hhbmdlZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25BY3RpdmVOb3RlYm9va1BhbmVsTWV0YWRhdGFDaGFuZ2VkKG1zZyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIG5vdGVib29rIHBhbmVsLlxuICAgICAgICAgKlxuICAgICAgICAgKiAjIyMjIE5vdGVzXG4gICAgICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGlzIGEgbm8tb3AuXG4gICAgICAgICAqL1xuICAgICAgICBvbkFjdGl2ZU5vdGVib29rUGFuZWxDaGFuZ2VkKG1zZykge1xuICAgICAgICAgICAgLyogbm8tb3AgKi9cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBhY3RpdmUgY2VsbC5cbiAgICAgICAgICpcbiAgICAgICAgICogIyMjIyBOb3Rlc1xuICAgICAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBpcyBhIG5vLW9wLlxuICAgICAgICAgKi9cbiAgICAgICAgb25BY3RpdmVDZWxsQ2hhbmdlZChtc2cpIHtcbiAgICAgICAgICAgIC8qIG5vLW9wICovXG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUgc2VsZWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiAjIyMjIE5vdGVzXG4gICAgICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGlzIGEgbm8tb3AuXG4gICAgICAgICAqL1xuICAgICAgICBvblNlbGVjdGlvbkNoYW5nZWQobXNnKSB7XG4gICAgICAgICAgICAvKiBuby1vcCAqL1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIG1ldGFkYXRhIG9mIHRoZSBhY3RpdmUgY2VsbC5cbiAgICAgICAgICpcbiAgICAgICAgICogIyMjIyBOb3Rlc1xuICAgICAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBpcyBhIG5vLW9wLlxuICAgICAgICAgKi9cbiAgICAgICAgb25BY3RpdmVDZWxsTWV0YWRhdGFDaGFuZ2VkKG1zZykge1xuICAgICAgICAgICAgLyogbm8tb3AgKi9cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBtZXRhZGF0YSBvZiB0aGUgYWN0aXZlIGNlbGwuXG4gICAgICAgICAqXG4gICAgICAgICAqICMjIyMgTm90ZXNcbiAgICAgICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gaXMgYSBuby1vcC5cbiAgICAgICAgICovXG4gICAgICAgIG9uQWN0aXZlTm90ZWJvb2tQYW5lbE1ldGFkYXRhQ2hhbmdlZChtc2cpIHtcbiAgICAgICAgICAgIC8qIG5vLW9wICovXG4gICAgICAgIH1cbiAgICB9XG4gICAgTm90ZWJvb2tUb29scy5Ub29sID0gVG9vbDtcbiAgICAvKipcbiAgICAgKiBBIGNlbGwgdG9vbCBkaXNwbGF5aW5nIHRoZSBhY3RpdmUgY2VsbCBjb250ZW50cy5cbiAgICAgKi9cbiAgICBjbGFzcyBBY3RpdmVDZWxsVG9vbCBleHRlbmRzIFRvb2wge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29uc3RydWN0IGEgbmV3IGFjdGl2ZSBjZWxsIHRvb2wuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9tb2RlbCA9IG5ldyBDb2RlRWRpdG9yLk1vZGVsKCk7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1BY3RpdmVDZWxsVG9vbCcpO1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtSW5wdXRBcmVhJyk7XG4gICAgICAgICAgICB0aGlzLmxheW91dCA9IG5ldyBQYW5lbExheW91dCgpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgdXNlZCBieSB0aGUgdG9vbC5cbiAgICAgICAgICovXG4gICAgICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbW9kZWwgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9tb2RlbC5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl9tb2RlbCA9IG51bGw7XG4gICAgICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUgYWN0aXZlIGNlbGwuXG4gICAgICAgICAqL1xuICAgICAgICBvbkFjdGl2ZUNlbGxDaGFuZ2VkKCkge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlQ2VsbCA9IHRoaXMubm90ZWJvb2tUb29scy5hY3RpdmVDZWxsO1xuICAgICAgICAgICAgY29uc3QgbGF5b3V0ID0gdGhpcy5sYXlvdXQ7XG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IGxheW91dC53aWRnZXRzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGxheW91dC53aWRnZXRzWzBdLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9jZWxsTW9kZWwgJiYgIXRoaXMuX2NlbGxNb2RlbC5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2VsbE1vZGVsLnZhbHVlLmNoYW5nZWQuZGlzY29ubmVjdCh0aGlzLl9vblZhbHVlQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2VsbE1vZGVsLm1pbWVUeXBlQ2hhbmdlZC5kaXNjb25uZWN0KHRoaXMuX29uTWltZVR5cGVDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBuZXcgV2lkZ2V0KCk7XG4gICAgICAgICAgICAgICAgY2VsbC5hZGRDbGFzcygnanAtSW5wdXRBcmVhLWVkaXRvcicpO1xuICAgICAgICAgICAgICAgIGNlbGwuYWRkQ2xhc3MoJ2pwLUlucHV0QXJlYS1lZGl0b3InKTtcbiAgICAgICAgICAgICAgICBsYXlvdXQuYWRkV2lkZ2V0KGNlbGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NlbGxNb2RlbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcHJvbXB0Tm9kZSA9IGFjdGl2ZUNlbGwucHJvbXB0Tm9kZVxuICAgICAgICAgICAgICAgID8gYWN0aXZlQ2VsbC5wcm9tcHROb2RlLmNsb25lTm9kZSh0cnVlKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3QgcHJvbXB0ID0gbmV3IFdpZGdldCh7IG5vZGU6IHByb21wdE5vZGUgfSk7XG4gICAgICAgICAgICBjb25zdCBmYWN0b3J5ID0gYWN0aXZlQ2VsbC5jb250ZW50RmFjdG9yeS5lZGl0b3JGYWN0b3J5O1xuICAgICAgICAgICAgY29uc3QgY2VsbE1vZGVsID0gKHRoaXMuX2NlbGxNb2RlbCA9IGFjdGl2ZUNlbGwubW9kZWwpO1xuICAgICAgICAgICAgY2VsbE1vZGVsLnZhbHVlLmNoYW5nZWQuY29ubmVjdCh0aGlzLl9vblZhbHVlQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgICAgICBjZWxsTW9kZWwubWltZVR5cGVDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25NaW1lVHlwZUNoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fbW9kZWwudmFsdWUudGV4dCA9IGNlbGxNb2RlbC52YWx1ZS50ZXh0LnNwbGl0KCdcXG4nKVswXTtcbiAgICAgICAgICAgIHRoaXMuX21vZGVsLm1pbWVUeXBlID0gY2VsbE1vZGVsLm1pbWVUeXBlO1xuICAgICAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLl9tb2RlbDtcbiAgICAgICAgICAgIGNvbnN0IGVkaXRvcldpZGdldCA9IG5ldyBDb2RlRWRpdG9yV3JhcHBlcih7IG1vZGVsLCBmYWN0b3J5IH0pO1xuICAgICAgICAgICAgZWRpdG9yV2lkZ2V0LmFkZENsYXNzKCdqcC1JbnB1dEFyZWEtZWRpdG9yJyk7XG4gICAgICAgICAgICBlZGl0b3JXaWRnZXQuYWRkQ2xhc3MoJ2pwLUlucHV0QXJlYS1lZGl0b3InKTtcbiAgICAgICAgICAgIGVkaXRvcldpZGdldC5lZGl0b3Iuc2V0T3B0aW9uKCdyZWFkT25seScsIHRydWUpO1xuICAgICAgICAgICAgbGF5b3V0LmFkZFdpZGdldChwcm9tcHQpO1xuICAgICAgICAgICAgbGF5b3V0LmFkZFdpZGdldChlZGl0b3JXaWRnZXQpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIGN1cnJlbnQgZWRpdG9yIHZhbHVlLlxuICAgICAgICAgKi9cbiAgICAgICAgX29uVmFsdWVDaGFuZ2VkKCkge1xuICAgICAgICAgICAgdGhpcy5fbW9kZWwudmFsdWUudGV4dCA9IHRoaXMuX2NlbGxNb2RlbC52YWx1ZS50ZXh0LnNwbGl0KCdcXG4nKVswXTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBjdXJyZW50IGVkaXRvciBtaW1ldHlwZS5cbiAgICAgICAgICovXG4gICAgICAgIF9vbk1pbWVUeXBlQ2hhbmdlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGVsLm1pbWVUeXBlID0gdGhpcy5fY2VsbE1vZGVsLm1pbWVUeXBlO1xuICAgICAgICB9XG4gICAgfVxuICAgIE5vdGVib29rVG9vbHMuQWN0aXZlQ2VsbFRvb2wgPSBBY3RpdmVDZWxsVG9vbDtcbiAgICAvKipcbiAgICAgKiBBIHJhdyBtZXRhZGF0YSBlZGl0b3IuXG4gICAgICovXG4gICAgY2xhc3MgTWV0YWRhdGFFZGl0b3JUb29sIGV4dGVuZHMgVG9vbCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgcmF3IG1ldGFkYXRhIHRvb2wuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgY29uc3QgeyBlZGl0b3JGYWN0b3J5IH0gPSBvcHRpb25zO1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtTWV0YWRhdGFFZGl0b3JUb29sJyk7XG4gICAgICAgICAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5sYXlvdXQgPSBuZXcgUGFuZWxMYXlvdXQoKSk7XG4gICAgICAgICAgICB0aGlzLmVkaXRvciA9IG5ldyBKU09ORWRpdG9yKHtcbiAgICAgICAgICAgICAgICBlZGl0b3JGYWN0b3J5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnRpdGxlLmxhYmVsID0gb3B0aW9ucy5sYWJlbCB8fCAnRWRpdCBNZXRhZGF0YSc7XG4gICAgICAgICAgICBjb25zdCB0aXRsZU5vZGUgPSBuZXcgV2lkZ2V0KHsgbm9kZTogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKSB9KTtcbiAgICAgICAgICAgIHRpdGxlTm9kZS5ub2RlLnRleHRDb250ZW50ID0gb3B0aW9ucy5sYWJlbCB8fCAnRWRpdCBNZXRhZGF0YSc7XG4gICAgICAgICAgICBsYXlvdXQuYWRkV2lkZ2V0KHRpdGxlTm9kZSk7XG4gICAgICAgICAgICBsYXlvdXQuYWRkV2lkZ2V0KHRoaXMuZWRpdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBOb3RlYm9va1Rvb2xzLk1ldGFkYXRhRWRpdG9yVG9vbCA9IE1ldGFkYXRhRWRpdG9yVG9vbDtcbiAgICAvKipcbiAgICAgKiBBIG5vdGVib29rIG1ldGFkYXRhIGVkaXRvclxuICAgICAqL1xuICAgIGNsYXNzIE5vdGVib29rTWV0YWRhdGFFZGl0b3JUb29sIGV4dGVuZHMgTWV0YWRhdGFFZGl0b3JUb29sIHtcbiAgICAgICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRvciA9IG9wdGlvbnMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgICAgICBvcHRpb25zLmxhYmVsID0gb3B0aW9ucy5sYWJlbCB8fCB0cmFucy5fXygnTm90ZWJvb2sgTWV0YWRhdGEnKTtcbiAgICAgICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIG5vdGVib29rLlxuICAgICAgICAgKi9cbiAgICAgICAgb25BY3RpdmVOb3RlYm9va1BhbmVsQ2hhbmdlZChtc2cpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIG5vdGVib29rIG1ldGFkYXRhLlxuICAgICAgICAgKi9cbiAgICAgICAgb25BY3RpdmVOb3RlYm9va1BhbmVsTWV0YWRhdGFDaGFuZ2VkKG1zZykge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgX3VwZGF0ZSgpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICBjb25zdCBuYiA9IHRoaXMubm90ZWJvb2tUb29scy5hY3RpdmVOb3RlYm9va1BhbmVsICYmXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlYm9va1Rvb2xzLmFjdGl2ZU5vdGVib29rUGFuZWwuY29udGVudDtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNvdXJjZSA9IChfYiA9IChfYSA9IG5iID09PSBudWxsIHx8IG5iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuYi5tb2RlbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1ldGFkYXRhKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIE5vdGVib29rVG9vbHMuTm90ZWJvb2tNZXRhZGF0YUVkaXRvclRvb2wgPSBOb3RlYm9va01ldGFkYXRhRWRpdG9yVG9vbDtcbiAgICAvKipcbiAgICAgKiBBIGNlbGwgbWV0YWRhdGEgZWRpdG9yXG4gICAgICovXG4gICAgY2xhc3MgQ2VsbE1ldGFkYXRhRWRpdG9yVG9vbCBleHRlbmRzIE1ldGFkYXRhRWRpdG9yVG9vbCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0b3IgPSBvcHRpb25zLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICAgICAgb3B0aW9ucy5sYWJlbCA9IG9wdGlvbnMubGFiZWwgfHwgdHJhbnMuX18oJ0NlbGwgTWV0YWRhdGEnKTtcbiAgICAgICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIGFjdGl2ZSBjZWxsLlxuICAgICAgICAgKi9cbiAgICAgICAgb25BY3RpdmVDZWxsQ2hhbmdlZChtc2cpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIGFjdGl2ZSBjZWxsIG1ldGFkYXRhLlxuICAgICAgICAgKi9cbiAgICAgICAgb25BY3RpdmVDZWxsTWV0YWRhdGFDaGFuZ2VkKG1zZykge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgX3VwZGF0ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLm5vdGVib29rVG9vbHMuYWN0aXZlQ2VsbDtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNvdXJjZSA9IGNlbGwgPyBjZWxsLm1vZGVsLm1ldGFkYXRhIDogbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBOb3RlYm9va1Rvb2xzLkNlbGxNZXRhZGF0YUVkaXRvclRvb2wgPSBDZWxsTWV0YWRhdGFFZGl0b3JUb29sO1xuICAgIC8qKlxuICAgICAqIEEgY2VsbCB0b29sIHRoYXQgcHJvdmlkZXMgYSBzZWxlY3Rpb24gZm9yIGEgZ2l2ZW4gbWV0YWRhdGEga2V5LlxuICAgICAqL1xuICAgIGNsYXNzIEtleVNlbGVjdG9yIGV4dGVuZHMgVG9vbCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgS2V5U2VsZWN0b3IuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiB1c2UgcmVhY3RcbiAgICAgICAgICAgIHN1cGVyKHsgbm9kZTogUHJpdmF0ZS5jcmVhdGVTZWxlY3Rvck5vZGUob3B0aW9ucykgfSk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEdldCB0aGUgdmFsdWUgZm9yIHRoZSBkYXRhLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLl9nZXRWYWx1ZSA9IChjZWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gY2VsbC5tb2RlbC5tZXRhZGF0YS5nZXQodGhpcy5rZXkpO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5fZGVmYXVsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogU2V0IHRoZSB2YWx1ZSBmb3IgdGhlIGRhdGEuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuX3NldFZhbHVlID0gKGNlbGwsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLl9kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwubW9kZWwubWV0YWRhdGEuZGVsZXRlKHRoaXMua2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwubW9kZWwubWV0YWRhdGEuc2V0KHRoaXMua2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZUd1YXJkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1LZXlTZWxlY3RvcicpO1xuICAgICAgICAgICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleTtcbiAgICAgICAgICAgIHRoaXMuX2RlZmF1bHQgPSBvcHRpb25zLmRlZmF1bHQ7XG4gICAgICAgICAgICB0aGlzLl92YWxpZENlbGxUeXBlcyA9IG9wdGlvbnMudmFsaWRDZWxsVHlwZXMgfHwgW107XG4gICAgICAgICAgICB0aGlzLl9nZXR0ZXIgPSBvcHRpb25zLmdldHRlciB8fCB0aGlzLl9nZXRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRlciA9IG9wdGlvbnMuc2V0dGVyIHx8IHRoaXMuX3NldFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgc2VsZWN0IG5vZGUgZm9yIHRoZSB3aWRnZXQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgc2VsZWN0Tm9kZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NlbGVjdCcpWzBdO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgdGhlIERPTSBldmVudHMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBldmVudCAtIFRoZSBET00gZXZlbnQgc2VudCB0byB0aGUgd2lkZ2V0LlxuICAgICAgICAgKlxuICAgICAgICAgKiAjIyMjIE5vdGVzXG4gICAgICAgICAqIFRoaXMgbWV0aG9kIGltcGxlbWVudHMgdGhlIERPTSBgRXZlbnRMaXN0ZW5lcmAgaW50ZXJmYWNlIGFuZCBpc1xuICAgICAgICAgKiBjYWxsZWQgaW4gcmVzcG9uc2UgdG8gZXZlbnRzIG9uIHRoZSBub3RlYm9vayBwYW5lbCdzIG5vZGUuIEl0IHNob3VsZFxuICAgICAgICAgKiBub3QgYmUgY2FsbGVkIGRpcmVjdGx5IGJ5IHVzZXIgY29kZS5cbiAgICAgICAgICovXG4gICAgICAgIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjaGFuZ2UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYGFmdGVyLWF0dGFjaGAgbWVzc2FnZXMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICAgICAqL1xuICAgICAgICBvbkFmdGVyQXR0YWNoKG1zZykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuc2VsZWN0Tm9kZTtcbiAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZSBgYmVmb3JlLWRldGFjaGAgbWVzc2FnZXMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICAgICAqL1xuICAgICAgICBvbkJlZm9yZURldGFjaChtc2cpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLnNlbGVjdE5vZGU7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIGFjdGl2ZSBjZWxsLlxuICAgICAgICAgKi9cbiAgICAgICAgb25BY3RpdmVDZWxsQ2hhbmdlZChtc2cpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IHRoaXMuc2VsZWN0Tm9kZTtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUNlbGwgPSB0aGlzLm5vdGVib29rVG9vbHMuYWN0aXZlQ2VsbDtcbiAgICAgICAgICAgIGlmICghYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZWN0LnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2VsbFR5cGUgPSBhY3RpdmVDZWxsLm1vZGVsLnR5cGU7XG4gICAgICAgICAgICBpZiAodGhpcy5fdmFsaWRDZWxsVHlwZXMubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsaWRDZWxsVHlwZXMuaW5kZXhPZihjZWxsVHlwZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0LnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgc2VsZWN0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxlY3QuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZUd1YXJkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IGdldHRlciA9IHRoaXMuX2dldHRlcjtcbiAgICAgICAgICAgIHNlbGVjdC52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KGdldHRlcihhY3RpdmVDZWxsKSk7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VHdWFyZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIG1ldGFkYXRhIG9mIHRoZSBhY3RpdmUgY2VsbC5cbiAgICAgICAgICovXG4gICAgICAgIG9uQWN0aXZlQ2VsbE1ldGFkYXRhQ2hhbmdlZChtc2cpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGFuZ2VHdWFyZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IHRoaXMuc2VsZWN0Tm9kZTtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLm5vdGVib29rVG9vbHMuYWN0aXZlQ2VsbDtcbiAgICAgICAgICAgIGlmIChtc2cuYXJncy5rZXkgPT09IHRoaXMua2V5ICYmIGNlbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VHdWFyZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc3QgZ2V0dGVyID0gdGhpcy5fZ2V0dGVyO1xuICAgICAgICAgICAgICAgIHNlbGVjdC52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KGdldHRlcihjZWxsKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlR3VhcmQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSB2YWx1ZS5cbiAgICAgICAgICovXG4gICAgICAgIG9uVmFsdWVDaGFuZ2VkKCkge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlQ2VsbCA9IHRoaXMubm90ZWJvb2tUb29scy5hY3RpdmVDZWxsO1xuICAgICAgICAgICAgaWYgKCFhY3RpdmVDZWxsIHx8IHRoaXMuX2NoYW5nZUd1YXJkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY2hhbmdlR3VhcmQgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ID0gdGhpcy5zZWxlY3ROb2RlO1xuICAgICAgICAgICAgY29uc3Qgc2V0dGVyID0gdGhpcy5fc2V0dGVyO1xuICAgICAgICAgICAgc2V0dGVyKGFjdGl2ZUNlbGwsIEpTT04ucGFyc2Uoc2VsZWN0LnZhbHVlKSk7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VHdWFyZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIE5vdGVib29rVG9vbHMuS2V5U2VsZWN0b3IgPSBLZXlTZWxlY3RvcjtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBzbGlkZXNob3cgc2VsZWN0b3IuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlU2xpZGVTaG93U2VsZWN0b3IodHJhbnNsYXRvcikge1xuICAgICAgICB0cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgdHJhbnMuX18oJycpO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAga2V5OiAnc2xpZGVzaG93JyxcbiAgICAgICAgICAgIHRpdGxlOiB0cmFucy5fXygnU2xpZGUgVHlwZScpLFxuICAgICAgICAgICAgb3B0aW9uVmFsdWVBcnJheTogW1xuICAgICAgICAgICAgICAgIFsnLScsIG51bGxdLFxuICAgICAgICAgICAgICAgIFt0cmFucy5fXygnU2xpZGUnKSwgJ3NsaWRlJ10sXG4gICAgICAgICAgICAgICAgW3RyYW5zLl9fKCdTdWItU2xpZGUnKSwgJ3N1YnNsaWRlJ10sXG4gICAgICAgICAgICAgICAgW3RyYW5zLl9fKCdGcmFnbWVudCcpLCAnZnJhZ21lbnQnXSxcbiAgICAgICAgICAgICAgICBbdHJhbnMuX18oJ1NraXAnKSwgJ3NraXAnXSxcbiAgICAgICAgICAgICAgICBbdHJhbnMuX18oJ05vdGVzJyksICdub3RlcyddXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZ2V0dGVyOiBjZWxsID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNlbGwubW9kZWwubWV0YWRhdGEuZ2V0KCdzbGlkZXNob3cnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWVbJ3NsaWRlX3R5cGUnXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXR0ZXI6IChjZWxsLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gY2VsbC5tb2RlbC5tZXRhZGF0YS5nZXQoJ3NsaWRlc2hvdycpIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2UgYSBzaGFsbG93IGNvcHkgc28gd2UgYXJlbid0IG1vZGlmeWluZyB0aGUgb3JpZ2luYWwgbWV0YWRhdGEuXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGRhdGEuc2xpZGVfdHlwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGRhdGEpLCB7IHNsaWRlX3R5cGU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLm1vZGVsLm1ldGFkYXRhLnNldCgnc2xpZGVzaG93JywgZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLm1vZGVsLm1ldGFkYXRhLmRlbGV0ZSgnc2xpZGVzaG93Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IEtleVNlbGVjdG9yKG9wdGlvbnMpO1xuICAgIH1cbiAgICBOb3RlYm9va1Rvb2xzLmNyZWF0ZVNsaWRlU2hvd1NlbGVjdG9yID0gY3JlYXRlU2xpZGVTaG93U2VsZWN0b3I7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIG5iY29udmVydCBzZWxlY3Rvci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVOQkNvbnZlcnRTZWxlY3RvcihvcHRpb25WYWx1ZUFycmF5LCB0cmFuc2xhdG9yKSB7XG4gICAgICAgIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICByZXR1cm4gbmV3IEtleVNlbGVjdG9yKHtcbiAgICAgICAgICAgIGtleTogJ3Jhd19taW1ldHlwZScsXG4gICAgICAgICAgICB0aXRsZTogdHJhbnMuX18oJ1JhdyBOQkNvbnZlcnQgRm9ybWF0JyksXG4gICAgICAgICAgICBvcHRpb25WYWx1ZUFycmF5OiBvcHRpb25WYWx1ZUFycmF5LFxuICAgICAgICAgICAgdmFsaWRDZWxsVHlwZXM6IFsncmF3J11cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE5vdGVib29rVG9vbHMuY3JlYXRlTkJDb252ZXJ0U2VsZWN0b3IgPSBjcmVhdGVOQkNvbnZlcnRTZWxlY3Rvcjtcbn0pKE5vdGVib29rVG9vbHMgfHwgKE5vdGVib29rVG9vbHMgPSB7fSkpO1xuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgcHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEEgY29tcGFyYXRvciBmdW5jdGlvbiBmb3Igd2lkZ2V0IHJhbmsgaXRlbXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXRlbUNtcChmaXJzdCwgc2Vjb25kKSB7XG4gICAgICAgIHJldHVybiBmaXJzdC5yYW5rIC0gc2Vjb25kLnJhbms7XG4gICAgfVxuICAgIFByaXZhdGUuaXRlbUNtcCA9IGl0ZW1DbXA7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBub2RlIGZvciBhIEtleVNlbGVjdG9yLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yTm9kZShvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBvcHRpb25zLmtleTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBvcHRpb25zLnRpdGxlIHx8IG5hbWVbMF0udG9Mb2NhbGVVcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSk7XG4gICAgICAgIGNvbnN0IG9wdGlvbk5vZGVzID0gW107XG4gICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgbGV0IG9wdGlvbjtcbiAgICAgICAgZWFjaChvcHRpb25zLm9wdGlvblZhbHVlQXJyYXksIGl0ZW0gPT4ge1xuICAgICAgICAgICAgb3B0aW9uID0gaXRlbVswXTtcbiAgICAgICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkoaXRlbVsxXSk7XG4gICAgICAgICAgICBvcHRpb25Ob2Rlcy5wdXNoKGgub3B0aW9uKHsgdmFsdWUgfSwgb3B0aW9uKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBub2RlID0gVmlydHVhbERPTS5yZWFsaXplKGguZGl2KHt9LCBoLmxhYmVsKHRpdGxlLCBoLnNlbGVjdCh7fSwgb3B0aW9uTm9kZXMpKSkpO1xuICAgICAgICBTdHlsaW5nLnN0eWxlTm9kZShub2RlKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIFByaXZhdGUuY3JlYXRlU2VsZWN0b3JOb2RlID0gY3JlYXRlU2VsZWN0b3JOb2RlO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ub3RlYm9va3Rvb2xzLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IERpYWxvZywgUHJpbnRpbmcsIHNob3dEaWFsb2cgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBpc01hcmtkb3duQ2VsbE1vZGVsIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY2VsbHMnO1xuaW1wb3J0IHsgUGFnZUNvbmZpZyB9IGZyb20gJ0BqdXB5dGVybGFiL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBEb2N1bWVudFdpZGdldCB9IGZyb20gJ0BqdXB5dGVybGFiL2RvY3JlZ2lzdHJ5JztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgZWFjaCB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgTm90ZWJvb2sgfSBmcm9tICcuL3dpZGdldCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIG5vdGVib29rIHBhbmVscy5cbiAqL1xuY29uc3QgTk9URUJPT0tfUEFORUxfQ0xBU1MgPSAnanAtTm90ZWJvb2tQYW5lbCc7XG5jb25zdCBOT1RFQk9PS19QQU5FTF9UT09MQkFSX0NMQVNTID0gJ2pwLU5vdGVib29rUGFuZWwtdG9vbGJhcic7XG5jb25zdCBOT1RFQk9PS19QQU5FTF9OT1RFQk9PS19DTEFTUyA9ICdqcC1Ob3RlYm9va1BhbmVsLW5vdGVib29rJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgdG8gYWRkIHdoZW4gdGhlIGRvY3VtZW50IGlzIGxvYWRlZCBmb3IgdGhlIHNlYXJjaCBib3guXG4gKi9cbmNvbnN0IFNFQVJDSF9ET0NVTUVOVF9MT0FERURfQ0xBU1MgPSAnanAtRG9jdW1lbnRTZWFyY2gtZG9jdW1lbnQtbG9hZGVkJztcbi8qKlxuICogQSB3aWRnZXQgdGhhdCBob3N0cyBhIG5vdGVib29rIHRvb2xiYXIgYW5kIGNvbnRlbnQgYXJlYS5cbiAqXG4gKiAjIyMjIE5vdGVzXG4gKiBUaGUgd2lkZ2V0IGtlZXBzIHRoZSBkb2N1bWVudCBtZXRhZGF0YSBpbiBzeW5jIHdpdGggdGhlIGN1cnJlbnRcbiAqIGtlcm5lbCBvbiB0aGUgY29udGV4dC5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vdGVib29rUGFuZWwgZXh0ZW5kcyBEb2N1bWVudFdpZGdldCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IG5vdGVib29rIHBhbmVsLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGV0aGVyIHdlIGFyZSBjdXJyZW50bHkgaW4gYSBzZXJpZXMgb2YgYXV0b3Jlc3RhcnRzIHdlIGhhdmUgYWxyZWFkeVxuICAgICAgICAgKiBub3RpZmllZCB0aGUgdXNlciBhYm91dC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2F1dG9yZXN0YXJ0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudHJhbnNsYXRvciA9IG9wdGlvbnMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgdGhpcy5fdHJhbnMgPSB0aGlzLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICAvLyBTZXQgdXAgQ1NTIGNsYXNzZXNcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhOT1RFQk9PS19QQU5FTF9DTEFTUyk7XG4gICAgICAgIHRoaXMudG9vbGJhci5hZGRDbGFzcyhOT1RFQk9PS19QQU5FTF9UT09MQkFSX0NMQVNTKTtcbiAgICAgICAgdGhpcy5jb250ZW50LmFkZENsYXNzKE5PVEVCT09LX1BBTkVMX05PVEVCT09LX0NMQVNTKTtcbiAgICAgICAgLy8gU2V0IHVwIHRoaW5ncyByZWxhdGVkIHRvIHRoZSBjb250ZXh0XG4gICAgICAgIHRoaXMuY29udGVudC5tb2RlbCA9IHRoaXMuY29udGV4dC5tb2RlbDtcbiAgICAgICAgdGhpcy5jb250ZXh0LnNlc3Npb25Db250ZXh0Lmtlcm5lbENoYW5nZWQuY29ubmVjdCh0aGlzLl9vbktlcm5lbENoYW5nZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLmNvbnRleHQuc2Vzc2lvbkNvbnRleHQuc3RhdHVzQ2hhbmdlZC5jb25uZWN0KHRoaXMuX29uU2Vzc2lvblN0YXR1c0NoYW5nZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLmNvbnRlbnQuZnVsbHlSZW5kZXJlZC5jb25uZWN0KHRoaXMuX29uRnVsbHlSZW5kZXJlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuY29udGV4dC5zYXZlU3RhdGUuY29ubmVjdCh0aGlzLl9vblNhdmUsIHRoaXMpO1xuICAgICAgICB2b2lkIHRoaXMucmV2ZWFsZWQudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3aWRnZXQgaGFzIGFscmVhZHkgYmVlbiBkaXNwb3NlZCwgYmFpbFxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNldCB0aGUgZG9jdW1lbnQgZWRpdCBtb2RlIG9uIGluaXRpYWwgb3BlbiBpZiBpdCBsb29rcyBsaWtlIGEgbmV3IGRvY3VtZW50LlxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC53aWRnZXRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxNb2RlbCA9IHRoaXMuY29udGVudC53aWRnZXRzWzBdLm1vZGVsO1xuICAgICAgICAgICAgICAgIGlmIChjZWxsTW9kZWwudHlwZSA9PT0gJ2NvZGUnICYmIGNlbGxNb2RlbC52YWx1ZS50ZXh0ID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQubW9kZSA9ICdlZGl0JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfb25TYXZlKHNlbmRlciwgc3RhdGUpIHtcbiAgICAgICAgaWYgKHN0YXRlID09PSAnc3RhcnRlZCcgJiYgdGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgLy8gRmluZCBtYXJrZG93biBjZWxsc1xuICAgICAgICAgICAgY29uc3QgeyBjZWxscyB9ID0gdGhpcy5tb2RlbDtcbiAgICAgICAgICAgIGVhY2goY2VsbHMsIGNlbGwgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpc01hcmtkb3duQ2VsbE1vZGVsKGNlbGwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGNlbGwuYXR0YWNobWVudHMua2V5cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjZWxsLnZhbHVlLnRleHQuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuYXR0YWNobWVudHMucmVtb3ZlKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgc2Vzc2lvbiBjb250ZXh0IHVzZWQgYnkgdGhlIHBhbmVsLlxuICAgICAqL1xuICAgIGdldCBzZXNzaW9uQ29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5zZXNzaW9uQ29udGV4dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG1vZGVsIGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIGdldCBtb2RlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5tb2RlbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBvcHRpb25zIGZvciB0aGUgY3VycmVudCBub3RlYm9vayBwYW5lbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb25maWcgbmV3IG9wdGlvbnMgdG8gc2V0XG4gICAgICovXG4gICAgc2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgICB0aGlzLmNvbnRlbnQuZWRpdG9yQ29uZmlnID0gY29uZmlnLmVkaXRvckNvbmZpZztcbiAgICAgICAgdGhpcy5jb250ZW50Lm5vdGVib29rQ29uZmlnID0gY29uZmlnLm5vdGVib29rQ29uZmlnO1xuICAgICAgICAvLyBVcGRhdGUga2VybmVsIHNodXRkb3duIGJlaGF2aW9yXG4gICAgICAgIGNvbnN0IGtlcm5lbFByZWZlcmVuY2UgPSB0aGlzLmNvbnRleHQuc2Vzc2lvbkNvbnRleHQua2VybmVsUHJlZmVyZW5jZTtcbiAgICAgICAgdGhpcy5jb250ZXh0LnNlc3Npb25Db250ZXh0Lmtlcm5lbFByZWZlcmVuY2UgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGtlcm5lbFByZWZlcmVuY2UpLCB7IHNodXRkb3duT25EaXNwb3NlOiBjb25maWcua2VybmVsU2h1dGRvd24gfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCBVUkkgZnJhZ21lbnQgaWRlbnRpZmllci5cbiAgICAgKi9cbiAgICBzZXRGcmFnbWVudChmcmFnbWVudCkge1xuICAgICAgICB2b2lkIHRoaXMuY29udGV4dC5yZWFkeS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRGcmFnbWVudChmcmFnbWVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgdXNlZCBieSB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5kaXNwb3NlKCk7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJpbnRzIHRoZSBub3RlYm9vayBieSBjb252ZXJ0aW5nIHRvIEhUTUwgd2l0aCBuYmNvbnZlcnQuXG4gICAgICovXG4gICAgW1ByaW50aW5nLnN5bWJvbF0oKSB7XG4gICAgICAgIHJldHVybiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAvLyBTYXZlIGJlZm9yZSBnZW5lcmF0aW5nIEhUTUxcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRleHQubW9kZWwuZGlydHkgJiYgIXRoaXMuY29udGV4dC5tb2RlbC5yZWFkT25seSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCBQcmludGluZy5wcmludFVSTChQYWdlQ29uZmlnLmdldE5CQ29udmVydFVSTCh7XG4gICAgICAgICAgICAgICAgZm9ybWF0OiAnaHRtbCcsXG4gICAgICAgICAgICAgICAgZG93bmxvYWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHBhdGg6IHRoaXMuY29udGV4dC5wYXRoXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGZ1bGx5IHJlbmRlcmVkIHNpZ25hbCBub3RlYm9vay5cbiAgICAgKi9cbiAgICBfb25GdWxseVJlbmRlcmVkKG5vdGVib29rLCBmdWxseVJlbmRlcmVkKSB7XG4gICAgICAgIGZ1bGx5UmVuZGVyZWRcbiAgICAgICAgICAgID8gdGhpcy5yZW1vdmVDbGFzcyhTRUFSQ0hfRE9DVU1FTlRfTE9BREVEX0NMQVNTKVxuICAgICAgICAgICAgOiB0aGlzLmFkZENsYXNzKFNFQVJDSF9ET0NVTUVOVF9MT0FERURfQ0xBU1MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgaW4gdGhlIGtlcm5lbCBieSB1cGRhdGluZyB0aGUgZG9jdW1lbnQgbWV0YWRhdGEuXG4gICAgICovXG4gICAgX29uS2VybmVsQ2hhbmdlZChzZW5kZXIsIGFyZ3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1vZGVsIHx8ICFhcmdzLm5ld1ZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBuZXdWYWx1ZSB9ID0gYXJncztcbiAgICAgICAgdm9pZCBuZXdWYWx1ZS5pbmZvLnRoZW4oaW5mbyA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlbCAmJlxuICAgICAgICAgICAgICAgICgoX2EgPSB0aGlzLmNvbnRleHQuc2Vzc2lvbkNvbnRleHQuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmtlcm5lbCkgPT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlTGFuZ3VhZ2UoaW5mby5sYW5ndWFnZV9pbmZvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZvaWQgdGhpcy5fdXBkYXRlU3BlYyhuZXdWYWx1ZSk7XG4gICAgfVxuICAgIF9vblNlc3Npb25TdGF0dXNDaGFuZ2VkKHNlbmRlciwgc3RhdHVzKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgLy8gSWYgdGhlIHN0YXR1cyBpcyBhdXRvcmVzdGFydGluZywgYW5kIHdlIGFyZW4ndCBhbHJlYWR5IGluIGEgc2VyaWVzIG9mXG4gICAgICAgIC8vIGF1dG9yZXN0YXJ0cywgc2hvdyB0aGUgZGlhbG9nLlxuICAgICAgICBpZiAoc3RhdHVzID09PSAnYXV0b3Jlc3RhcnRpbmcnICYmICF0aGlzLl9hdXRvcmVzdGFydGluZykge1xuICAgICAgICAgICAgLy8gVGhlIGtlcm5lbCBkaWVkIGFuZCB0aGUgc2VydmVyIGlzIHJlc3RhcnRpbmcgaXQuIFdlIG5vdGlmeSB0aGUgdXNlciBzb1xuICAgICAgICAgICAgLy8gdGhleSBrbm93IHdoeSB0aGVpciBrZXJuZWwgc3RhdGUgaXMgZ29uZS5cbiAgICAgICAgICAgIHZvaWQgc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuX3RyYW5zLl9fKCdLZXJuZWwgUmVzdGFydGluZycpLFxuICAgICAgICAgICAgICAgIGJvZHk6IHRoaXMuX3RyYW5zLl9fKCdUaGUga2VybmVsIGZvciAlMSBhcHBlYXJzIHRvIGhhdmUgZGllZC4gSXQgd2lsbCByZXN0YXJ0IGF1dG9tYXRpY2FsbHkuJywgKF9hID0gdGhpcy5zZXNzaW9uQ29udGV4dC5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGF0aCksXG4gICAgICAgICAgICAgICAgYnV0dG9uczogW0RpYWxvZy5va0J1dHRvbih7IGxhYmVsOiB0aGlzLl90cmFucy5fXygnT2snKSB9KV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fYXV0b3Jlc3RhcnRpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0YXR1cyA9PT0gJ3Jlc3RhcnRpbmcnKSB7XG4gICAgICAgICAgICAvLyBBbm90aGVyIGF1dG9yZXN0YXJ0IGF0dGVtcHQgd2lsbCBmaXJzdCBjaGFuZ2UgdGhlIHN0YXR1cyB0b1xuICAgICAgICAgICAgLy8gcmVzdGFydGluZywgdGhlbiB0byBhdXRvcmVzdGFydGluZyBhZ2Fpbiwgc28gd2UgZG9uJ3QgcmVzZXQgdGhlXG4gICAgICAgICAgICAvLyBhdXRvcmVzdGFydGluZyBzdGF0dXMgaWYgdGhlIHN0YXR1cyBpcyAncmVzdGFydGluZycuXG4gICAgICAgICAgICAvKiBuby1vcCAqL1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYXV0b3Jlc3RhcnRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIGtlcm5lbCBsYW5ndWFnZS5cbiAgICAgKi9cbiAgICBfdXBkYXRlTGFuZ3VhZ2UobGFuZ3VhZ2UpIHtcbiAgICAgICAgdGhpcy5tb2RlbC5tZXRhZGF0YS5zZXQoJ2xhbmd1YWdlX2luZm8nLCBsYW5ndWFnZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUga2VybmVsIHNwZWMuXG4gICAgICovXG4gICAgYXN5bmMgX3VwZGF0ZVNwZWMoa2VybmVsKSB7XG4gICAgICAgIGNvbnN0IHNwZWMgPSBhd2FpdCBrZXJuZWwuc3BlYztcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kZWwubWV0YWRhdGEuc2V0KCdrZXJuZWxzcGVjJywge1xuICAgICAgICAgICAgbmFtZToga2VybmVsLm5hbWUsXG4gICAgICAgICAgICBkaXNwbGF5X25hbWU6IHNwZWMgPT09IG51bGwgfHwgc3BlYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3BlYy5kaXNwbGF5X25hbWUsXG4gICAgICAgICAgICBsYW5ndWFnZTogc3BlYyA9PT0gbnVsbCB8fCBzcGVjID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzcGVjLmxhbmd1YWdlXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIGBOb3RlYm9va1BhbmVsYCBzdGF0aWNzLlxuICovXG4oZnVuY3Rpb24gKE5vdGVib29rUGFuZWwpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiBhbiBgSUNvbnRlbnRGYWN0b3J5YC5cbiAgICAgKi9cbiAgICBjbGFzcyBDb250ZW50RmFjdG9yeSBleHRlbmRzIE5vdGVib29rLkNvbnRlbnRGYWN0b3J5IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhIG5ldyBjb250ZW50IGFyZWEgZm9yIHRoZSBwYW5lbC5cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZU5vdGVib29rKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTm90ZWJvb2sob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgTm90ZWJvb2tQYW5lbC5Db250ZW50RmFjdG9yeSA9IENvbnRlbnRGYWN0b3J5O1xuICAgIC8qKlxuICAgICAqIERlZmF1bHQgY29udGVudCBmYWN0b3J5IGZvciB0aGUgbm90ZWJvb2sgcGFuZWwuXG4gICAgICovXG4gICAgTm90ZWJvb2tQYW5lbC5kZWZhdWx0Q29udGVudEZhY3RvcnkgPSBuZXcgQ29udGVudEZhY3RvcnkoKTtcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuICAgIC8qKlxuICAgICAqIFRoZSBub3RlYm9vayByZW5kZXJlciB0b2tlbi5cbiAgICAgKi9cbiAgICBOb3RlYm9va1BhbmVsLklDb250ZW50RmFjdG9yeSA9IG5ldyBUb2tlbignQGp1cHl0ZXJsYWIvbm90ZWJvb2s6SUNvbnRlbnRGYWN0b3J5Jyk7XG4gICAgLyogdHNsaW50OmVuYWJsZSAqL1xufSkoTm90ZWJvb2tQYW5lbCB8fCAoTm90ZWJvb2tQYW5lbCA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYW5lbC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbi8qIHRzbGludDpkaXNhYmxlICovXG4vKipcbiAqIFRoZSBub3RlYm9vayB3aWRnZXQgZmFjdG9yeSB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IElOb3RlYm9va1dpZGdldEZhY3RvcnkgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL25vdGVib29rOklOb3RlYm9va1dpZGdldEZhY3RvcnknKTtcbi8qIHRzbGludDplbmFibGUgKi9cbi8qIHRzbGludDpkaXNhYmxlICovXG4vKipcbiAqIFRoZSBub3RlYm9vayB0b29scyB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IElOb3RlYm9va1Rvb2xzID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi9ub3RlYm9vazpJTm90ZWJvb2tUb29scycpO1xuLyogdHNsaW50OmRpc2FibGUgKi9cbi8qKlxuICogVGhlIG5vdGVib29rIHRyYWNrZXIgdG9rZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBJTm90ZWJvb2tUcmFja2VyID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi9ub3RlYm9vazpJTm90ZWJvb2tUcmFja2VyJyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b2tlbnMuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgV2lkZ2V0VHJhY2tlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmV4cG9ydCBjbGFzcyBOb3RlYm9va1RyYWNrZXIgZXh0ZW5kcyBXaWRnZXRUcmFja2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5fYWN0aXZlQ2VsbCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUNlbGxDaGFuZ2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50bHkgZm9jdXNlZCBjZWxsLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgaXMgYSByZWFkLW9ubHkgcHJvcGVydHkuIElmIHRoZXJlIGlzIG5vIGNlbGwgd2l0aCB0aGUgZm9jdXMsIHRoZW4gdGhpc1xuICAgICAqIHZhbHVlIGlzIGBudWxsYC5cbiAgICAgKi9cbiAgICBnZXQgYWN0aXZlQ2VsbCgpIHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdGhpcy5jdXJyZW50V2lkZ2V0O1xuICAgICAgICBpZiAoIXdpZGdldCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdpZGdldC5jb250ZW50LmFjdGl2ZUNlbGwgfHwgbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBjdXJyZW50IGFjdGl2ZSBjZWxsIGNoYW5nZXMuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogSWYgdGhlcmUgaXMgbm8gY2VsbCB3aXRoIHRoZSBmb2N1cywgdGhlbiBgbnVsbGAgd2lsbCBiZSBlbWl0dGVkLlxuICAgICAqL1xuICAgIGdldCBhY3RpdmVDZWxsQ2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUNlbGxDaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdGlvbiBzdGF0ZSBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGdldCBzZWxlY3Rpb25DaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgbmV3IG5vdGVib29rIHBhbmVsIHRvIHRoZSB0cmFja2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhbmVsIC0gVGhlIG5vdGVib29rIHBhbmVsIGJlaW5nIGFkZGVkLlxuICAgICAqL1xuICAgIGFkZChwYW5lbCkge1xuICAgICAgICBjb25zdCBwcm9taXNlID0gc3VwZXIuYWRkKHBhbmVsKTtcbiAgICAgICAgcGFuZWwuY29udGVudC5hY3RpdmVDZWxsQ2hhbmdlZC5jb25uZWN0KHRoaXMuX29uQWN0aXZlQ2VsbENoYW5nZWQsIHRoaXMpO1xuICAgICAgICBwYW5lbC5jb250ZW50LnNlbGVjdGlvbkNoYW5nZWQuY29ubmVjdCh0aGlzLl9vblNlbGVjdGlvbkNoYW5nZWQsIHRoaXMpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIHRyYWNrZXIuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlQ2VsbCA9IG51bGw7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBjdXJyZW50IGNoYW5nZSBldmVudC5cbiAgICAgKi9cbiAgICBvbkN1cnJlbnRDaGFuZ2VkKHdpZGdldCkge1xuICAgICAgICAvLyBTdG9yZSBhbiBpbnRlcm5hbCByZWZlcmVuY2UgdG8gYWN0aXZlIGNlbGwgdG8gcHJldmVudCBmYWxzZSBwb3NpdGl2ZXMuXG4gICAgICAgIGNvbnN0IGFjdGl2ZUNlbGwgPSB0aGlzLmFjdGl2ZUNlbGw7XG4gICAgICAgIGlmIChhY3RpdmVDZWxsICYmIGFjdGl2ZUNlbGwgPT09IHRoaXMuX2FjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hY3RpdmVDZWxsID0gYWN0aXZlQ2VsbDtcbiAgICAgICAgaWYgKCF3aWRnZXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBTaW5jZSB0aGUgbm90ZWJvb2sgaGFzIGNoYW5nZWQsIGltbWVkaWF0ZWx5IHNpZ25hbCBhbiBhY3RpdmUgY2VsbCBjaGFuZ2VcbiAgICAgICAgdGhpcy5fYWN0aXZlQ2VsbENoYW5nZWQuZW1pdCh3aWRnZXQuY29udGVudC5hY3RpdmVDZWxsIHx8IG51bGwpO1xuICAgIH1cbiAgICBfb25BY3RpdmVDZWxsQ2hhbmdlZChzZW5kZXIsIGNlbGwpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGFjdGl2ZSBjZWxsIGNoYW5nZSBoYXBwZW5lZCBmb3IgdGhlIGN1cnJlbnQgbm90ZWJvb2suXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRXaWRnZXQgJiYgdGhpcy5jdXJyZW50V2lkZ2V0LmNvbnRlbnQgPT09IHNlbmRlcikge1xuICAgICAgICAgICAgdGhpcy5fYWN0aXZlQ2VsbCA9IGNlbGwgfHwgbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUNlbGxDaGFuZ2VkLmVtaXQodGhpcy5fYWN0aXZlQ2VsbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX29uU2VsZWN0aW9uQ2hhbmdlZChzZW5kZXIpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNlbGVjdGlvbiBjaGFuZ2UgaGFwcGVuZWQgZm9yIHRoZSBjdXJyZW50IG5vdGVib29rLlxuICAgICAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ICYmIHRoaXMuY3VycmVudFdpZGdldC5jb250ZW50ID09PSBzZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbkNoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJhY2tlci5qcy5tYXAiLCJpbXBvcnQgeyBWRG9tTW9kZWwsIFZEb21SZW5kZXJlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgbm90VHJ1c3RlZEljb24sIHRydXN0ZWRJY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyB0b0FycmF5IH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8qKlxuICogRGV0ZXJtaW5lIHRoZSBub3RlYm9vayB0cnVzdCBzdGF0dXMgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gY2VsbFRydXN0KHByb3BzLCB0cmFuc2xhdG9yKSB7XG4gICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICBpZiAocHJvcHMudHJ1c3RlZENlbGxzID09PSBwcm9wcy50b3RhbENlbGxzKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0cmFucy5fXygnTm90ZWJvb2sgdHJ1c3RlZDogJTEgb2YgJTIgY2VsbHMgdHJ1c3RlZC4nLCBwcm9wcy50cnVzdGVkQ2VsbHMsIHByb3BzLnRvdGFsQ2VsbHMpLFxuICAgICAgICAgICAgJ2pwLVN0YXR1c0l0ZW0tdHJ1c3RlZCdcbiAgICAgICAgXTtcbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMuYWN0aXZlQ2VsbFRydXN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHRyYW5zLl9fKCdBY3RpdmUgY2VsbCB0cnVzdGVkOiAlMSBvZiAlMiBjZWxscyB0cnVzdGVkLicsIHByb3BzLnRydXN0ZWRDZWxscywgcHJvcHMudG90YWxDZWxscyksXG4gICAgICAgICAgICAnanAtU3RhdHVzSXRlbS10cnVzdGVkJ1xuICAgICAgICBdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHRyYW5zLl9fKCdOb3RlYm9vayBub3QgdHJ1c3RlZDogJTEgb2YgJTIgY2VsbHMgdHJ1c3RlZC4nLCBwcm9wcy50cnVzdGVkQ2VsbHMsIHByb3BzLnRvdGFsQ2VsbHMpLFxuICAgICAgICAgICAgJ2pwLVN0YXR1c0l0ZW0tdW50cnVzdGVkJ1xuICAgICAgICBdO1xuICAgIH1cbn1cbi8qKlxuICogQSBwdXJlIGZ1bmN0aW9uIGZvciBhIG5vdGVib29rIHRydXN0IHN0YXR1cyBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHByb3BzOiB0aGUgcHJvcHMgZm9yIHRoZSBjb21wb25lbnQuXG4gKlxuICogQHJldHVybnMgYSB0c3ggY29tcG9uZW50IGZvciBub3RlYm9vayB0cnVzdC5cbiAqL1xuZnVuY3Rpb24gTm90ZWJvb2tUcnVzdENvbXBvbmVudChwcm9wcykge1xuICAgIGlmIChwcm9wcy5hbGxDZWxsc1RydXN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodHJ1c3RlZEljb24ucmVhY3QsIHsgdG9wOiAnMnB4Jywgc3R5bGVzaGVldDogJ3N0YXR1c0JhcicgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChub3RUcnVzdGVkSWNvbi5yZWFjdCwgeyB0b3A6ICcycHgnLCBzdHlsZXNoZWV0OiAnc3RhdHVzQmFyJyB9KTtcbiAgICB9XG59XG4vKipcbiAqIFRoZSBOb3RlYm9va1RydXN0IHN0YXR1cyBpdGVtLlxuICovXG5leHBvcnQgY2xhc3MgTm90ZWJvb2tUcnVzdFN0YXR1cyBleHRlbmRzIFZEb21SZW5kZXJlciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IHN0YXR1cyBpdGVtLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHRyYW5zbGF0b3IpIHtcbiAgICAgICAgc3VwZXIobmV3IE5vdGVib29rVHJ1c3RTdGF0dXMuTW9kZWwoKSk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlciB0aGUgTm90ZWJvb2tUcnVzdCBzdGF0dXMgaXRlbS5cbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLnRpdGxlID0gY2VsbFRydXN0KHRoaXMubW9kZWwsIHRoaXMudHJhbnNsYXRvcilbMF07XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChOb3RlYm9va1RydXN0Q29tcG9uZW50LCB7IGFsbENlbGxzVHJ1c3RlZDogdGhpcy5tb2RlbC50cnVzdGVkQ2VsbHMgPT09IHRoaXMubW9kZWwudG90YWxDZWxscywgYWN0aXZlQ2VsbFRydXN0ZWQ6IHRoaXMubW9kZWwuYWN0aXZlQ2VsbFRydXN0ZWQsIHRvdGFsQ2VsbHM6IHRoaXMubW9kZWwudG90YWxDZWxscywgdHJ1c3RlZENlbGxzOiB0aGlzLm1vZGVsLnRydXN0ZWRDZWxscyB9KSkpO1xuICAgIH1cbn1cbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIE5vdGVib29rVHJ1c3Qgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChOb3RlYm9va1RydXN0U3RhdHVzKSB7XG4gICAgLyoqXG4gICAgICogQSBWRG9tTW9kZWwgZm9yIHRoZSBOb3RlYm9va1RydXN0IHN0YXR1cyBpdGVtLlxuICAgICAqL1xuICAgIGNsYXNzIE1vZGVsIGV4dGVuZHMgVkRvbU1vZGVsIHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICAgICAgdGhpcy5fdHJ1c3RlZENlbGxzID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3RvdGFsQ2VsbHMgPSAwO1xuICAgICAgICAgICAgdGhpcy5fYWN0aXZlQ2VsbFRydXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX25vdGVib29rID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG51bWJlciBvZiB0cnVzdGVkIGNlbGxzIGluIHRoZSBjdXJyZW50IG5vdGVib29rLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IHRydXN0ZWRDZWxscygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90cnVzdGVkQ2VsbHM7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0b3RhbCBudW1iZXIgb2YgY2VsbHMgaW4gdGhlIGN1cnJlbnQgbm90ZWJvb2suXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgdG90YWxDZWxscygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90b3RhbENlbGxzO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGV0aGVyIHRoZSBhY3RpdmUgY2VsbCBpcyB0cnVzdGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IGFjdGl2ZUNlbGxUcnVzdGVkKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUNlbGxUcnVzdGVkO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY3VycmVudCBub3RlYm9vayBmb3IgdGhlIG1vZGVsLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IG5vdGVib29rKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25vdGVib29rO1xuICAgICAgICB9XG4gICAgICAgIHNldCBub3RlYm9vayhtb2RlbCkge1xuICAgICAgICAgICAgY29uc3Qgb2xkTm90ZWJvb2sgPSB0aGlzLl9ub3RlYm9vaztcbiAgICAgICAgICAgIGlmIChvbGROb3RlYm9vayAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG9sZE5vdGVib29rLmFjdGl2ZUNlbGxDaGFuZ2VkLmRpc2Nvbm5lY3QodGhpcy5fb25BY3RpdmVDZWxsQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgb2xkTm90ZWJvb2subW9kZWxDb250ZW50Q2hhbmdlZC5kaXNjb25uZWN0KHRoaXMuX29uTW9kZWxDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG9sZFN0YXRlID0gdGhpcy5fZ2V0QWxsU3RhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuX25vdGVib29rID0gbW9kZWw7XG4gICAgICAgICAgICBpZiAodGhpcy5fbm90ZWJvb2sgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90cnVzdGVkQ2VsbHMgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvdGFsQ2VsbHMgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUNlbGxUcnVzdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgbGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgdGhpcy5fbm90ZWJvb2suYWN0aXZlQ2VsbENoYW5nZWQuY29ubmVjdCh0aGlzLl9vbkFjdGl2ZUNlbGxDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ub3RlYm9vay5tb2RlbENvbnRlbnRDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25Nb2RlbENoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgICAgIC8vIERlcml2ZSB2YWx1ZXNcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbm90ZWJvb2suYWN0aXZlQ2VsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUNlbGxUcnVzdGVkID0gdGhpcy5fbm90ZWJvb2suYWN0aXZlQ2VsbC5tb2RlbC50cnVzdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlQ2VsbFRydXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgeyB0b3RhbCwgdHJ1c3RlZCB9ID0gdGhpcy5fZGVyaXZlQ2VsbFRydXN0U3RhdGUodGhpcy5fbm90ZWJvb2subW9kZWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvdGFsQ2VsbHMgPSB0b3RhbDtcbiAgICAgICAgICAgICAgICB0aGlzLl90cnVzdGVkQ2VsbHMgPSB0cnVzdGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNoYW5nZShvbGRTdGF0ZSwgdGhpcy5fZ2V0QWxsU3RhdGUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZW4gdGhlIG5vdGVib29rIG1vZGVsIGNoYW5nZXMsIHVwZGF0ZSB0aGUgdHJ1c3Qgc3RhdGUuXG4gICAgICAgICAqL1xuICAgICAgICBfb25Nb2RlbENoYW5nZWQobm90ZWJvb2spIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFN0YXRlID0gdGhpcy5fZ2V0QWxsU3RhdGUoKTtcbiAgICAgICAgICAgIGNvbnN0IHsgdG90YWwsIHRydXN0ZWQgfSA9IHRoaXMuX2Rlcml2ZUNlbGxUcnVzdFN0YXRlKG5vdGVib29rLm1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMuX3RvdGFsQ2VsbHMgPSB0b3RhbDtcbiAgICAgICAgICAgIHRoaXMuX3RydXN0ZWRDZWxscyA9IHRydXN0ZWQ7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyQ2hhbmdlKG9sZFN0YXRlLCB0aGlzLl9nZXRBbGxTdGF0ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogV2hlbiB0aGUgYWN0aXZlIGNlbGwgY2hhbmdlcywgdXBkYXRlIHRoZSB0cnVzdCBzdGF0ZS5cbiAgICAgICAgICovXG4gICAgICAgIF9vbkFjdGl2ZUNlbGxDaGFuZ2VkKG1vZGVsLCBjZWxsKSB7XG4gICAgICAgICAgICBjb25zdCBvbGRTdGF0ZSA9IHRoaXMuX2dldEFsbFN0YXRlKCk7XG4gICAgICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUNlbGxUcnVzdGVkID0gY2VsbC5tb2RlbC50cnVzdGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlQ2VsbFRydXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDaGFuZ2Uob2xkU3RhdGUsIHRoaXMuX2dldEFsbFN0YXRlKCkpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHaXZlbiBhIG5vdGVib29rIG1vZGVsLCBmaWd1cmUgb3V0IGhvdyBtYW55IG9mIHRoZSBjZWxscyBhcmUgdHJ1c3RlZC5cbiAgICAgICAgICovXG4gICAgICAgIF9kZXJpdmVDZWxsVHJ1c3RTdGF0ZShtb2RlbCkge1xuICAgICAgICAgICAgaWYgKG1vZGVsID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdG90YWw6IDAsIHRydXN0ZWQ6IDAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNlbGxzID0gdG9BcnJheShtb2RlbC5jZWxscyk7XG4gICAgICAgICAgICBjb25zdCB0cnVzdGVkID0gY2VsbHMucmVkdWNlKChhY2N1bSwgY3VycmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LnRydXN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjY3VtICsgMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2N1bTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsID0gY2VsbHMubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgICAgICB0cnVzdGVkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIG1vZGVsLlxuICAgICAgICAgKi9cbiAgICAgICAgX2dldEFsbFN0YXRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIFt0aGlzLl90cnVzdGVkQ2VsbHMsIHRoaXMuX3RvdGFsQ2VsbHMsIHRoaXMuYWN0aXZlQ2VsbFRydXN0ZWRdO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmlnZ2VyIGEgY2hhbmdlIGluIHRoZSByZW5kZXJlci5cbiAgICAgICAgICovXG4gICAgICAgIF90cmlnZ2VyQ2hhbmdlKG9sZFN0YXRlLCBuZXdTdGF0ZSkge1xuICAgICAgICAgICAgaWYgKG9sZFN0YXRlWzBdICE9PSBuZXdTdGF0ZVswXSB8fFxuICAgICAgICAgICAgICAgIG9sZFN0YXRlWzFdICE9PSBuZXdTdGF0ZVsxXSB8fFxuICAgICAgICAgICAgICAgIG9sZFN0YXRlWzJdICE9PSBuZXdTdGF0ZVsyXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBOb3RlYm9va1RydXN0U3RhdHVzLk1vZGVsID0gTW9kZWw7XG59KShOb3RlYm9va1RydXN0U3RhdHVzIHx8IChOb3RlYm9va1RydXN0U3RhdHVzID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRydXN0c3RhdHVzLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IENlbGwsIENvZGVDZWxsLCBNYXJrZG93bkNlbGwsIFJhd0NlbGwgfSBmcm9tICdAanVweXRlcmxhYi9jZWxscyc7XG5pbXBvcnQgeyBDb2RlRWRpdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29kZWVkaXRvcic7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IEFycmF5RXh0LCBlYWNoLCBmaW5kSW5kZXggfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG5pbXBvcnQgeyBNaW1lRGF0YSB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbmltcG9ydCB7IEVsZW1lbnRFeHQgfSBmcm9tICdAbHVtaW5vL2RvbXV0aWxzJztcbmltcG9ydCB7IERyYWcgfSBmcm9tICdAbHVtaW5vL2RyYWdkcm9wJztcbmltcG9ydCB7IEF0dGFjaGVkUHJvcGVydHkgfSBmcm9tICdAbHVtaW5vL3Byb3BlcnRpZXMnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuaW1wb3J0IHsgaCwgVmlydHVhbERPTSB9IGZyb20gJ0BsdW1pbm8vdmlydHVhbGRvbSc7XG5pbXBvcnQgeyBQYW5lbExheW91dCwgV2lkZ2V0IH0gZnJvbSAnQGx1bWluby93aWRnZXRzJztcbmltcG9ydCB7IE5vdGVib29rQWN0aW9ucyB9IGZyb20gJy4vYWN0aW9ucyc7XG4vKipcbiAqIFRoZSBkYXRhIGF0dHJpYnV0ZSBhZGRlZCB0byBhIHdpZGdldCB0aGF0IGhhcyBhbiBhY3RpdmUga2VybmVsLlxuICovXG5jb25zdCBLRVJORUxfVVNFUiA9ICdqcEtlcm5lbFVzZXInO1xuLyoqXG4gKiBUaGUgZGF0YSBhdHRyaWJ1dGUgYWRkZWQgdG8gYSB3aWRnZXQgdGhhdCBjYW4gcnVuIGNvZGUuXG4gKi9cbmNvbnN0IENPREVfUlVOTkVSID0gJ2pwQ29kZVJ1bm5lcic7XG4vKipcbiAqIFRoZSBkYXRhIGF0dHJpYnV0ZSBhZGRlZCB0byBhIHdpZGdldCB0aGF0IGNhbiB1bmRvLlxuICovXG5jb25zdCBVTkRPRVIgPSAnanBVbmRvZXInO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBub3RlYm9vayB3aWRnZXRzLlxuICovXG5jb25zdCBOQl9DTEFTUyA9ICdqcC1Ob3RlYm9vayc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIG5vdGVib29rIHdpZGdldCBjZWxscy5cbiAqL1xuY29uc3QgTkJfQ0VMTF9DTEFTUyA9ICdqcC1Ob3RlYm9vay1jZWxsJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gYSBub3RlYm9vayBpbiBlZGl0IG1vZGUuXG4gKi9cbmNvbnN0IEVESVRfQ0xBU1MgPSAnanAtbW9kLWVkaXRNb2RlJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gYSBub3RlYm9vayBpbiBjb21tYW5kIG1vZGUuXG4gKi9cbmNvbnN0IENPTU1BTkRfQ0xBU1MgPSAnanAtbW9kLWNvbW1hbmRNb2RlJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIGFjdGl2ZSBjZWxsLlxuICovXG5jb25zdCBBQ1RJVkVfQ0xBU1MgPSAnanAtbW9kLWFjdGl2ZSc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHNlbGVjdGVkIGNlbGxzLlxuICovXG5jb25zdCBTRUxFQ1RFRF9DTEFTUyA9ICdqcC1tb2Qtc2VsZWN0ZWQnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBhbiBhY3RpdmUgY2VsbCB3aGVuIHRoZXJlIGFyZSBvdGhlciBzZWxlY3RlZCBjZWxscy5cbiAqL1xuY29uc3QgT1RIRVJfU0VMRUNURURfQ0xBU1MgPSAnanAtbW9kLW11bHRpU2VsZWN0ZWQnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byB1bmNvbmZpbmVkIGltYWdlcy5cbiAqL1xuY29uc3QgVU5DT05GSU5FRF9DTEFTUyA9ICdqcC1tb2QtdW5jb25maW5lZCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGEgZHJvcCB0YXJnZXQuXG4gKi9cbmNvbnN0IERST1BfVEFSR0VUX0NMQVNTID0gJ2pwLW1vZC1kcm9wVGFyZ2V0Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gYSBkcm9wIHNvdXJjZS5cbiAqL1xuY29uc3QgRFJPUF9TT1VSQ0VfQ0xBU1MgPSAnanAtbW9kLWRyb3BTb3VyY2UnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBkcmFnIGltYWdlcy5cbiAqL1xuY29uc3QgRFJBR19JTUFHRV9DTEFTUyA9ICdqcC1kcmFnSW1hZ2UnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBzaW5ndWxhciBkcmFnIGltYWdlc1xuICovXG5jb25zdCBTSU5HTEVfRFJBR19JTUFHRV9DTEFTUyA9ICdqcC1kcmFnSW1hZ2Utc2luZ2xlUHJvbXB0Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIGRyYWcgaW1hZ2UgY2VsbCBjb250ZW50LlxuICovXG5jb25zdCBDRUxMX0RSQUdfQ09OVEVOVF9DTEFTUyA9ICdqcC1kcmFnSW1hZ2UtY29udGVudCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRoZSBkcmFnIGltYWdlIGNlbGwgY29udGVudC5cbiAqL1xuY29uc3QgQ0VMTF9EUkFHX1BST01QVF9DTEFTUyA9ICdqcC1kcmFnSW1hZ2UtcHJvbXB0Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIGRyYWcgaW1hZ2UgY2VsbCBjb250ZW50LlxuICovXG5jb25zdCBDRUxMX0RSQUdfTVVMVElQTEVfQkFDSyA9ICdqcC1kcmFnSW1hZ2UtbXVsdGlwbGVCYWNrJztcbi8qKlxuICogVGhlIG1pbWV0eXBlIHVzZWQgZm9yIEp1cHl0ZXIgY2VsbCBkYXRhLlxuICovXG5jb25zdCBKVVBZVEVSX0NFTExfTUlNRSA9ICdhcHBsaWNhdGlvbi92bmQuanVweXRlci5jZWxscyc7XG4vKipcbiAqIFRoZSB0aHJlc2hvbGQgaW4gcGl4ZWxzIHRvIHN0YXJ0IGEgZHJhZyBldmVudC5cbiAqL1xuY29uc3QgRFJBR19USFJFU0hPTEQgPSA1O1xuLyoqXG4gKiBUaGUgY2xhc3MgYXR0YWNoZWQgdG8gdGhlIGhlYWRpbmcgY29sbGFwc2VyIGJ1dHRvblxuICovXG5jb25zdCBIRUFESU5HX0NPTExBUFNFUl9DTEFTUyA9ICdqcC1jb2xsYXBzZUhlYWRpbmdCdXR0b24nO1xuY29uc3QgU0lERV9CWV9TSURFX0NMQVNTID0gJ2pwLW1vZC1zaWRlQnlTaWRlJztcbmlmICh3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT24gU2FmYXJpLCByZXF1ZXN0SWRsZUNhbGxiYWNrIGlzIG5vdCBhdmFpbGFibGUsIHNvIHdlIHVzZSByZXBsYWNlbWVudCBmdW5jdGlvbnMgZm9yIGBpZGxlQ2FsbGJhY2tzYFxuICAgIC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0JhY2tncm91bmRfVGFza3NfQVBJI2ZhbGxpbmdfYmFja190b19zZXR0aW1lb3V0XG4gICAgd2luZG93LnJlcXVlc3RJZGxlQ2FsbGJhY2sgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICBsZXQgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaGFuZGxlcih7XG4gICAgICAgICAgICAgICAgZGlkVGltZW91dDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGltZVJlbWFpbmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgNTAuMCAtIChEYXRlLm5vdygpIC0gc3RhcnRUaW1lKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIDEpO1xuICAgIH07XG4gICAgd2luZG93LmNhbmNlbElkbGVDYWxsYmFjayA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgIH07XG59XG4vKipcbiAqIEEgd2lkZ2V0IHdoaWNoIHJlbmRlcnMgc3RhdGljIG5vbi1pbnRlcmFjdGl2ZSBub3RlYm9va3MuXG4gKlxuICogIyMjIyBOb3Rlc1xuICogVGhlIHdpZGdldCBtb2RlbCBtdXN0IGJlIHNldCBzZXBhcmF0ZWx5IGFuZCBjYW4gYmUgY2hhbmdlZFxuICogYXQgYW55IHRpbWUuICBDb25zdW1lcnMgb2YgdGhlIHdpZGdldCBtdXN0IGFjY291bnQgZm9yIGFcbiAqIGBudWxsYCBtb2RlbCwgYW5kIG1heSB3YW50IHRvIGxpc3RlbiB0byB0aGUgYG1vZGVsQ2hhbmdlZGBcbiAqIHNpZ25hbC5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRpY05vdGVib29rIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBub3RlYm9vayB3aWRnZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9lZGl0b3JDb25maWcgPSBTdGF0aWNOb3RlYm9vay5kZWZhdWx0RWRpdG9yQ29uZmlnO1xuICAgICAgICB0aGlzLl9ub3RlYm9va0NvbmZpZyA9IFN0YXRpY05vdGVib29rLmRlZmF1bHROb3RlYm9va0NvbmZpZztcbiAgICAgICAgdGhpcy5fbWltZXR5cGUgPSAndGV4dC9wbGFpbic7XG4gICAgICAgIHRoaXMuX21vZGVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbW9kZWxDaGFuZ2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fbW9kZWxDb250ZW50Q2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2Z1bGx5UmVuZGVyZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlckNlbGxSZW5kZXJlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkQ2VsbHNDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoTkJfQ0xBU1MpO1xuICAgICAgICB0aGlzLm5vZGUuZGF0YXNldFtLRVJORUxfVVNFUl0gPSAndHJ1ZSc7XG4gICAgICAgIHRoaXMubm9kZS5kYXRhc2V0W1VORE9FUl0gPSAndHJ1ZSc7XG4gICAgICAgIHRoaXMubm9kZS5kYXRhc2V0W0NPREVfUlVOTkVSXSA9ICd0cnVlJztcbiAgICAgICAgdGhpcy5yZW5kZXJtaW1lID0gb3B0aW9ucy5yZW5kZXJtaW1lO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSAoX2EgPSBvcHRpb25zLnRyYW5zbGF0b3IpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICB0aGlzLmxheW91dCA9IG5ldyBQcml2YXRlLk5vdGVib29rUGFuZWxMYXlvdXQoKTtcbiAgICAgICAgdGhpcy5jb250ZW50RmFjdG9yeSA9XG4gICAgICAgICAgICBvcHRpb25zLmNvbnRlbnRGYWN0b3J5IHx8IFN0YXRpY05vdGVib29rLmRlZmF1bHRDb250ZW50RmFjdG9yeTtcbiAgICAgICAgdGhpcy5lZGl0b3JDb25maWcgPVxuICAgICAgICAgICAgb3B0aW9ucy5lZGl0b3JDb25maWcgfHwgU3RhdGljTm90ZWJvb2suZGVmYXVsdEVkaXRvckNvbmZpZztcbiAgICAgICAgdGhpcy5ub3RlYm9va0NvbmZpZyA9XG4gICAgICAgICAgICBvcHRpb25zLm5vdGVib29rQ29uZmlnIHx8IFN0YXRpY05vdGVib29rLmRlZmF1bHROb3RlYm9va0NvbmZpZztcbiAgICAgICAgdGhpcy5fbWltZXR5cGVTZXJ2aWNlID0gb3B0aW9ucy5taW1lVHlwZVNlcnZpY2U7XG4gICAgICAgIHRoaXMucmVuZGVyaW5nTGF5b3V0ID0gKF9iID0gb3B0aW9ucy5ub3RlYm9va0NvbmZpZykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnJlbmRlcmluZ0xheW91dDtcbiAgICAgICAgLy8gU2VjdGlvbiBmb3IgdGhlIHZpcnR1YWwtbm90ZWJvb2sgYmVoYXZpb3IuXG4gICAgICAgIHRoaXMuX2lkbGVDYWxsQmFjayA9IG51bGw7XG4gICAgICAgIHRoaXMuX3RvUmVuZGVyTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9jZWxsc0FycmF5ID0gbmV3IEFycmF5KCk7XG4gICAgICAgIGlmICgnSW50ZXJzZWN0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdykge1xuICAgICAgICAgICAgdGhpcy5fb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKG8gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoby5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKG8udGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNpID0gdGhpcy5fdG9SZW5kZXJNYXAuZ2V0KG8udGFyZ2V0LmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgY2VsbCwgaW5kZXggfSA9IGNpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclBsYWNlaG9sZGVyQ2VsbChjZWxsLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByb290OiB0aGlzLm5vZGUsXG4gICAgICAgICAgICAgICAgdGhyZXNob2xkOiAxLFxuICAgICAgICAgICAgICAgIHJvb3RNYXJnaW46IGAke3RoaXMubm90ZWJvb2tDb25maWcub2JzZXJ2ZWRUb3BNYXJnaW59IDBweCAke3RoaXMubm90ZWJvb2tDb25maWcub2JzZXJ2ZWRCb3R0b21NYXJnaW59IDBweGBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgbm90ZWJvb2sgaXMgZnVsbHkgcmVuZGVyZWQuXG4gICAgICovXG4gICAgZ2V0IGZ1bGx5UmVuZGVyZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mdWxseVJlbmRlcmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIGEgcGxhY2Vob2xkZXIgY2VsbCBpcyByZW5kZXJlZC5cbiAgICAgKi9cbiAgICBnZXQgcGxhY2Vob2xkZXJDZWxsUmVuZGVyZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlckNlbGxSZW5kZXJlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBtb2RlbCBvZiB0aGUgbm90ZWJvb2sgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBnZXQgbW9kZWxDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZWxDaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIG1vZGVsIGNvbnRlbnQgY2hhbmdlcy5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGlzIGEgY29udmVuaWVuY2Ugc2lnbmFsIHRoYXQgZm9sbG93cyB0aGUgY3VycmVudCBtb2RlbC5cbiAgICAgKi9cbiAgICBnZXQgbW9kZWxDb250ZW50Q2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZGVsQ29udGVudENoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBtb2RlbCBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBnZXQgbW9kZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlbDtcbiAgICB9XG4gICAgc2V0IG1vZGVsKG5ld1ZhbHVlKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUgfHwgbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX21vZGVsID09PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5fbW9kZWw7XG4gICAgICAgIHRoaXMuX21vZGVsID0gbmV3VmFsdWU7XG4gICAgICAgIGlmIChvbGRWYWx1ZSAmJiBvbGRWYWx1ZS5tb2RlbERCLmlzQ29sbGFib3JhdGl2ZSkge1xuICAgICAgICAgICAgdm9pZCBvbGRWYWx1ZS5tb2RlbERCLmNvbm5lY3RlZC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZS5tb2RlbERCLmNvbGxhYm9yYXRvcnMuY2hhbmdlZC5kaXNjb25uZWN0KHRoaXMuX29uQ29sbGFib3JhdG9yc0NoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIG5ld1ZhbHVlLm1vZGVsREIuaXNDb2xsYWJvcmF0aXZlKSB7XG4gICAgICAgICAgICB2b2lkIG5ld1ZhbHVlLm1vZGVsREIuY29ubmVjdGVkLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlLm1vZGVsREIuY29sbGFib3JhdG9ycy5jaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25Db2xsYWJvcmF0b3JzQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUcmlnZ2VyIHByaXZhdGUsIHByb3RlY3RlZCwgYW5kIHB1YmxpYyBjaGFuZ2VzLlxuICAgICAgICB0aGlzLl9vbk1vZGVsQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgIHRoaXMuX21vZGVsQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbWltZXR5cGUgZm9yIGNvZGUgY2VsbHMuXG4gICAgICovXG4gICAgZ2V0IGNvZGVNaW1ldHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbWV0eXBlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHJlYWQtb25seSBzZXF1ZW5jZSBvZiB0aGUgd2lkZ2V0cyBpbiB0aGUgbm90ZWJvb2suXG4gICAgICovXG4gICAgZ2V0IHdpZGdldHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxheW91dC53aWRnZXRzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZvciBjZWxsIGVkaXRvciBzZXR0aW5ncy5cbiAgICAgKi9cbiAgICBnZXQgZWRpdG9yQ29uZmlnKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yQ29uZmlnO1xuICAgIH1cbiAgICBzZXQgZWRpdG9yQ29uZmlnKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2VkaXRvckNvbmZpZyA9IHZhbHVlO1xuICAgICAgICB0aGlzLl91cGRhdGVFZGl0b3JDb25maWcoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBjb25maWd1cmF0aW9uIG9iamVjdCBmb3Igbm90ZWJvb2sgc2V0dGluZ3MuXG4gICAgICovXG4gICAgZ2V0IG5vdGVib29rQ29uZmlnKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbm90ZWJvb2tDb25maWc7XG4gICAgfVxuICAgIHNldCBub3RlYm9va0NvbmZpZyh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9ub3RlYm9va0NvbmZpZyA9IHZhbHVlO1xuICAgICAgICB0aGlzLl91cGRhdGVOb3RlYm9va0NvbmZpZygpO1xuICAgIH1cbiAgICBnZXQgcmVuZGVyaW5nTGF5b3V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyaW5nTGF5b3V0O1xuICAgIH1cbiAgICBzZXQgcmVuZGVyaW5nTGF5b3V0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmluZ0xheW91dCA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5fcmVuZGVyaW5nTGF5b3V0ID09PSAnc2lkZS1ieS1zaWRlJykge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5hZGQoU0lERV9CWV9TSURFX0NMQVNTKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QucmVtb3ZlKFNJREVfQllfU0lERV9DTEFTUyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGFscmVhZHkgZGlzcG9zZWQuXG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tb2RlbCA9IG51bGw7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgbmV3IG1vZGVsLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBhZnRlciB0aGUgbW9kZWwgY2hhbmdlIGhhcyBiZWVuIGhhbmRsZWRcbiAgICAgKiBpbnRlcm5hbGx5IGFuZCBiZWZvcmUgdGhlIGBtb2RlbENoYW5nZWRgIHNpZ25hbCBpcyBlbWl0dGVkLlxuICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGlzIGEgbm8tb3AuXG4gICAgICovXG4gICAgb25Nb2RlbENoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgIC8vIE5vLW9wLlxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2hhbmdlcyB0byB0aGUgbm90ZWJvb2sgbW9kZWwgY29udGVudC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBlbWl0cyB0aGUgYG1vZGVsQ29udGVudENoYW5nZWRgIHNpZ25hbC5cbiAgICAgKi9cbiAgICBvbk1vZGVsQ29udGVudENoYW5nZWQobW9kZWwsIGFyZ3MpIHtcbiAgICAgICAgdGhpcy5fbW9kZWxDb250ZW50Q2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBjaGFuZ2VzIHRvIHRoZSBub3RlYm9vayBtb2RlbCBtZXRhZGF0YS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiB1cGRhdGVzIHRoZSBtaW1ldHlwZXMgb2YgdGhlIGNvZGUgY2VsbHNcbiAgICAgKiB3aGVuIHRoZSBgbGFuZ3VhZ2VfaW5mb2AgbWV0YWRhdGEgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBvbk1ldGFkYXRhQ2hhbmdlZChzZW5kZXIsIGFyZ3MpIHtcbiAgICAgICAgc3dpdGNoIChhcmdzLmtleSkge1xuICAgICAgICAgICAgY2FzZSAnbGFuZ3VhZ2VfaW5mbyc6XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlTWltZXR5cGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2VsbCBiZWluZyBpbnNlcnRlZC5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGlzIGEgbm8tb3BcbiAgICAgKi9cbiAgICBvbkNlbGxJbnNlcnRlZChpbmRleCwgY2VsbCkge1xuICAgICAgICAvLyBUaGlzIGlzIGEgbm8tb3AuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNlbGwgYmVpbmcgbW92ZWQuXG4gICAgICpcbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBpcyBhIG5vLW9wXG4gICAgICovXG4gICAgb25DZWxsTW92ZWQoZnJvbUluZGV4LCB0b0luZGV4KSB7XG4gICAgICAgIC8vIFRoaXMgaXMgYSBuby1vcC5cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2VsbCBiZWluZyByZW1vdmVkLlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gaXMgYSBuby1vcFxuICAgICAqL1xuICAgIG9uQ2VsbFJlbW92ZWQoaW5kZXgsIGNlbGwpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhIG5vLW9wLlxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBuZXcgbW9kZWwgb24gdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBfb25Nb2RlbENoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGxheW91dCA9IHRoaXMubGF5b3V0O1xuICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgIG9sZFZhbHVlLmNlbGxzLmNoYW5nZWQuZGlzY29ubmVjdCh0aGlzLl9vbkNlbGxzQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgICAgICBvbGRWYWx1ZS5tZXRhZGF0YS5jaGFuZ2VkLmRpc2Nvbm5lY3QodGhpcy5vbk1ldGFkYXRhQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgICAgICBvbGRWYWx1ZS5jb250ZW50Q2hhbmdlZC5kaXNjb25uZWN0KHRoaXMub25Nb2RlbENvbnRlbnRDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgICAgIC8vIFRPRE86IHJldXNlIGV4aXN0aW5nIGNlbGwgd2lkZ2V0cyBpZiBwb3NzaWJsZS4gUmVtZW1iZXIgdG8gaW5pdGlhbGx5XG4gICAgICAgICAgICAvLyBjbGVhciB0aGUgaGlzdG9yeSBvZiBlYWNoIGNlbGwgaWYgd2UgZG8gdGhpcy5cbiAgICAgICAgICAgIHdoaWxlIChsYXlvdXQud2lkZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVDZWxsKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21pbWV0eXBlID0gJ3RleHQvcGxhaW4nO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZU1pbWV0eXBlKCk7XG4gICAgICAgIGNvbnN0IGNlbGxzID0gbmV3VmFsdWUuY2VsbHM7XG4gICAgICAgIGlmICghY2VsbHMubGVuZ3RoICYmIG5ld1ZhbHVlLmlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGNlbGxzLnB1c2gobmV3VmFsdWUuY29udGVudEZhY3RvcnkuY3JlYXRlQ2VsbCh0aGlzLm5vdGVib29rQ29uZmlnLmRlZmF1bHRDZWxsLCB7fSkpO1xuICAgICAgICB9XG4gICAgICAgIGVhY2goY2VsbHMsIChjZWxsLCBpKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9pbnNlcnRDZWxsKGksIGNlbGwsICdzZXQnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNlbGxzLmNoYW5nZWQuY29ubmVjdCh0aGlzLl9vbkNlbGxzQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIG5ld1ZhbHVlLmNvbnRlbnRDaGFuZ2VkLmNvbm5lY3QodGhpcy5vbk1vZGVsQ29udGVudENoYW5nZWQsIHRoaXMpO1xuICAgICAgICBuZXdWYWx1ZS5tZXRhZGF0YS5jaGFuZ2VkLmNvbm5lY3QodGhpcy5vbk1ldGFkYXRhQ2hhbmdlZCwgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSBjZWxscyBldmVudC5cbiAgICAgKi9cbiAgICBfb25DZWxsc0NoYW5nZWQoc2VuZGVyLCBhcmdzKSB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIHN3aXRjaCAoYXJncy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdhZGQnOlxuICAgICAgICAgICAgICAgIGluZGV4ID0gYXJncy5uZXdJbmRleDtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY2FzZS1kZWNsYXJhdGlvbnNcbiAgICAgICAgICAgICAgICBjb25zdCBpbnNlcnRUeXBlID0gYXJncy5vbGRJbmRleCA9PSAtMSA/ICdwdXNoJyA6ICdpbnNlcnQnO1xuICAgICAgICAgICAgICAgIGVhY2goYXJncy5uZXdWYWx1ZXMsIHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5zZXJ0Q2VsbChpbmRleCsrLCB2YWx1ZSwgaW5zZXJ0VHlwZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb3ZlJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlQ2VsbChhcmdzLm9sZEluZGV4LCBhcmdzLm5ld0luZGV4KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgZWFjaChhcmdzLm9sZFZhbHVlcywgdmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVDZWxsKGFyZ3Mub2xkSW5kZXgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIEFkZCBkZWZhdWx0IGNlbGwgaWYgdGhlcmUgYXJlIG5vIGNlbGxzIHJlbWFpbmluZy5cbiAgICAgICAgICAgICAgICBpZiAoIXNlbmRlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsO1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIGNlbGwgaW4gYSBuZXcgY29udGV4dCB0byBhdm9pZCB0cmlnZ2VyaW5nIGFub3RoZXJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2VsbCBjaGFuZ2VkIGV2ZW50IGR1cmluZyB0aGUgaGFuZGxpbmcgb2YgdGhpcyBzaWduYWwuXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kZWwgJiYgIW1vZGVsLmlzRGlzcG9zZWQgJiYgIW1vZGVsLmNlbGxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmNlbGxzLnB1c2gobW9kZWwuY29udGVudEZhY3RvcnkuY3JlYXRlQ2VsbCh0aGlzLm5vdGVib29rQ29uZmlnLmRlZmF1bHRDZWxsLCB7fSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzZXQnOlxuICAgICAgICAgICAgICAgIC8vIFRPRE86IHJldXNlIGV4aXN0aW5nIHdpZGdldHMgaWYgcG9zc2libGUuXG4gICAgICAgICAgICAgICAgaW5kZXggPSBhcmdzLm5ld0luZGV4O1xuICAgICAgICAgICAgICAgIGVhY2goYXJncy5uZXdWYWx1ZXMsIHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTm90ZTogdGhpcyBvcmRlcmluZyAoaW5zZXJ0IHRoZW4gcmVtb3ZlKVxuICAgICAgICAgICAgICAgICAgICAvLyBpcyBpbXBvcnRhbnQgZm9yIGdldHRpbmcgdGhlIGFjdGl2ZSBjZWxsXG4gICAgICAgICAgICAgICAgICAgIC8vIGluZGV4IGZvciB0aGUgZWRpdGFibGUgbm90ZWJvb2sgY29ycmVjdC5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5zZXJ0Q2VsbChpbmRleCwgdmFsdWUsICdzZXQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQ2VsbChpbmRleCArIDEpO1xuICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgY2VsbCB3aWRnZXQgYW5kIGluc2VydCBpbnRvIHRoZSBub3RlYm9vay5cbiAgICAgKi9cbiAgICBfaW5zZXJ0Q2VsbChpbmRleCwgY2VsbCwgaW5zZXJ0VHlwZSkge1xuICAgICAgICBsZXQgd2lkZ2V0O1xuICAgICAgICBzd2l0Y2ggKGNlbGwudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnY29kZSc6XG4gICAgICAgICAgICAgICAgd2lkZ2V0ID0gdGhpcy5fY3JlYXRlQ29kZUNlbGwoY2VsbCk7XG4gICAgICAgICAgICAgICAgd2lkZ2V0Lm1vZGVsLm1pbWVUeXBlID0gdGhpcy5fbWltZXR5cGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtYXJrZG93bic6XG4gICAgICAgICAgICAgICAgd2lkZ2V0ID0gdGhpcy5fY3JlYXRlTWFya2Rvd25DZWxsKGNlbGwpO1xuICAgICAgICAgICAgICAgIGlmIChjZWxsLnZhbHVlLnRleHQgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpZGdldC5yZW5kZXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgd2lkZ2V0ID0gdGhpcy5fY3JlYXRlUmF3Q2VsbChjZWxsKTtcbiAgICAgICAgfVxuICAgICAgICB3aWRnZXQuYWRkQ2xhc3MoTkJfQ0VMTF9DTEFTUyk7XG4gICAgICAgIGNvbnN0IGxheW91dCA9IHRoaXMubGF5b3V0O1xuICAgICAgICB0aGlzLl9jZWxsc0FycmF5LnB1c2god2lkZ2V0KTtcbiAgICAgICAgaWYgKHRoaXMuX29ic2VydmVyICYmXG4gICAgICAgICAgICBpbnNlcnRUeXBlID09PSAncHVzaCcgJiZcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVkQ2VsbHNDb3VudCA+PVxuICAgICAgICAgICAgICAgIHRoaXMubm90ZWJvb2tDb25maWcubnVtYmVyQ2VsbHNUb1JlbmRlckRpcmVjdGx5ICYmXG4gICAgICAgICAgICBjZWxsLnR5cGUgIT09ICdtYXJrZG93bicpIHtcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgYW4gb2JzZXJ2ZXIgYW5kIHdlIGFyZSBoYXZlIGJlZW4gYXNrZWQgdG8gcHVzaCAobm90IHRvIGluc2VydCkuXG4gICAgICAgICAgICAvLyBhbmQgd2UgYXJlIGFib3ZlIHRoZSBudW1iZXIgb2YgY2VsbHMgdG8gcmVuZGVyIGRpcmVjdGx5LCB0aGVuXG4gICAgICAgICAgICAvLyB3ZSB3aWxsIGFkZCBhIHBsYWNlaG9sZGVyIGFuZCBsZXQgdGhlIGludGVyc2VjdGlvbiBvYnNlcnZlciBvciB0aGVcbiAgICAgICAgICAgIC8vIGlkbGUgYnJvd3NlciByZW5kZXIgdGhvc2UgcGxhY2Vob2xkZXIgY2VsbHMuXG4gICAgICAgICAgICB0aGlzLl90b1JlbmRlck1hcC5zZXQod2lkZ2V0Lm1vZGVsLmlkLCB7IGluZGV4OiBpbmRleCwgY2VsbDogd2lkZ2V0IH0pO1xuICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLl9jcmVhdGVQbGFjZWhvbGRlckNlbGwoY2VsbCwgaW5kZXgpO1xuICAgICAgICAgICAgcGxhY2Vob2xkZXIubm9kZS5pZCA9IHdpZGdldC5tb2RlbC5pZDtcbiAgICAgICAgICAgIGxheW91dC5pbnNlcnRXaWRnZXQoaW5kZXgsIHBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgIHRoaXMub25DZWxsSW5zZXJ0ZWQoaW5kZXgsIHBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgIHRoaXMuX2Z1bGx5UmVuZGVyZWQuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLl9vYnNlcnZlci5vYnNlcnZlKHBsYWNlaG9sZGVyLm5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gV2UgaGF2ZSBubyBpbnRlcnNlY3Rpb24gb2JzZXJ2ZXIsIG9yIHdlIGluc2VydCwgb3Igd2UgYXJlIGJlbG93XG4gICAgICAgICAgICAvLyB0aGUgbnVtYmVyIG9mIGNlbGxzIHRvIHJlbmRlciBkaXJlY3RseSwgc28gd2UgcmVuZGVyIGRpcmVjdGx5LlxuICAgICAgICAgICAgbGF5b3V0Lmluc2VydFdpZGdldChpbmRleCwgd2lkZ2V0KTtcbiAgICAgICAgICAgIHRoaXMub25DZWxsSW5zZXJ0ZWQoaW5kZXgsIHdpZGdldCk7XG4gICAgICAgICAgICB0aGlzLl9pbmNyZW1lbnRSZW5kZXJlZENvdW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2NoZWR1bGVDZWxsUmVuZGVyT25JZGxlKCk7XG4gICAgfVxuICAgIF9zY2hlZHVsZUNlbGxSZW5kZXJPbklkbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9vYnNlcnZlciAmJlxuICAgICAgICAgICAgdGhpcy5ub3RlYm9va0NvbmZpZy5yZW5kZXJDZWxsT25JZGxlICYmXG4gICAgICAgICAgICAhdGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2lkbGVDYWxsQmFjaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlbmRlclBsYWNlaG9sZGVyQ2VsbHMgPSB0aGlzLl9yZW5kZXJQbGFjZWhvbGRlckNlbGxzLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5faWRsZUNhbGxCYWNrID0gd2luZG93LnJlcXVlc3RJZGxlQ2FsbGJhY2socmVuZGVyUGxhY2Vob2xkZXJDZWxscywge1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAzMDAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3JlbmRlclBsYWNlaG9sZGVyQ2VsbHMoZGVhZGxpbmUpIHtcbiAgICAgICAgaWYgKHRoaXMubm90ZWJvb2tDb25maWcucmVtYWluaW5nVGltZUJlZm9yZVJlc2NoZWR1bGluZyA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVSZW1haW5pbmcgPSBkZWFkbGluZS50aW1lUmVtYWluaW5nKCk7XG4gICAgICAgICAgICAvLyBJbiBjYXNlIHRoaXMgZ290IHRyaWdnZXJlZCBiZWNhdXNlIG9mIHRpbWVvdXQgb3Igd2hlbiB0aGVyZSBhcmUgc2NyZWVuIHVwZGF0ZXMgKGh0dHBzOi8vdzNjLmdpdGh1Yi5pby9yZXF1ZXN0aWRsZWNhbGxiYWNrLyNpZGxlLXBlcmlvZHMpLFxuICAgICAgICAgICAgLy8gYXZvaWRpbmcgdGhlIHJlbmRlciBhbmQgcmVzY2hlZHVsaW5nIHRoZSBwbGFjZSBob2xkZXIgY2VsbCByZW5kZXJpbmcuXG4gICAgICAgICAgICBpZiAoZGVhZGxpbmUuZGlkVGltZW91dCB8fFxuICAgICAgICAgICAgICAgIHRpbWVSZW1haW5pbmcgPCB0aGlzLm5vdGVib29rQ29uZmlnLnJlbWFpbmluZ1RpbWVCZWZvcmVSZXNjaGVkdWxpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faWRsZUNhbGxCYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxJZGxlQ2FsbGJhY2sodGhpcy5faWRsZUNhbGxCYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faWRsZUNhbGxCYWNrID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVDZWxsUmVuZGVyT25JZGxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3JlbmRlcmVkQ2VsbHNDb3VudCA8IHRoaXMuX2NlbGxzQXJyYXkubGVuZ3RoICYmXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlZENlbGxzQ291bnQgPj1cbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVib29rQ29uZmlnLm51bWJlckNlbGxzVG9SZW5kZXJEaXJlY3RseSkge1xuICAgICAgICAgICAgY29uc3QgY2kgPSB0aGlzLl90b1JlbmRlck1hcC5lbnRyaWVzKCkubmV4dCgpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyUGxhY2Vob2xkZXJDZWxsKGNpLnZhbHVlWzFdLmNlbGwsIGNpLnZhbHVlWzFdLmluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfcmVuZGVyUGxhY2Vob2xkZXJDZWxsKGNlbGwsIGluZGV4KSB7XG4gICAgICAgIC8vIFdlIGRvbid0IGhhdmUgY2FuY2VsIG1lY2hhbmlzbSBmb3Igc2NoZWR1bGVkIHJlcXVlc3RJZGxlQ2FsbGJhY2socmVuZGVyUGxhY2Vob2xkZXJDZWxscyksXG4gICAgICAgIC8vIGFkZGluZyBkZWZlbnNpdmUgY2hlY2sgZm9yIGxheW91dCBpbiBjYXNlIHRhYiBpcyBjbG9zZWQuXG4gICAgICAgIGlmICghdGhpcy5sYXlvdXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwbCA9IHRoaXMubGF5b3V0O1xuICAgICAgICBwbC5yZW1vdmVXaWRnZXRBdChpbmRleCk7XG4gICAgICAgIHBsLmluc2VydFdpZGdldChpbmRleCwgY2VsbCk7XG4gICAgICAgIHRoaXMuX3RvUmVuZGVyTWFwLmRlbGV0ZShjZWxsLm1vZGVsLmlkKTtcbiAgICAgICAgdGhpcy5faW5jcmVtZW50UmVuZGVyZWRDb3VudCgpO1xuICAgICAgICB0aGlzLm9uQ2VsbEluc2VydGVkKGluZGV4LCBjZWxsKTtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJDZWxsUmVuZGVyZWQuZW1pdChjZWxsKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgY29kZSBjZWxsIHdpZGdldCBmcm9tIGEgY29kZSBjZWxsIG1vZGVsLlxuICAgICAqL1xuICAgIF9jcmVhdGVDb2RlQ2VsbChtb2RlbCkge1xuICAgICAgICBjb25zdCByZW5kZXJtaW1lID0gdGhpcy5yZW5kZXJtaW1lO1xuICAgICAgICBjb25zdCBjb250ZW50RmFjdG9yeSA9IHRoaXMuY29udGVudEZhY3Rvcnk7XG4gICAgICAgIGNvbnN0IGVkaXRvckNvbmZpZyA9IHRoaXMuZWRpdG9yQ29uZmlnLmNvZGU7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBlZGl0b3JDb25maWcsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIHJlbmRlcm1pbWUsXG4gICAgICAgICAgICBjb250ZW50RmFjdG9yeSxcbiAgICAgICAgICAgIHVwZGF0ZUVkaXRvck9uU2hvdzogZmFsc2UsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogZmFsc2UsXG4gICAgICAgICAgICBtYXhOdW1iZXJPdXRwdXRzOiB0aGlzLm5vdGVib29rQ29uZmlnLm1heE51bWJlck91dHB1dHNcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuY29udGVudEZhY3RvcnkuY3JlYXRlQ29kZUNlbGwob3B0aW9ucywgdGhpcyk7XG4gICAgICAgIGNlbGwuc3luY0NvbGxhcHNlID0gdHJ1ZTtcbiAgICAgICAgY2VsbC5zeW5jRWRpdGFibGUgPSB0cnVlO1xuICAgICAgICBjZWxsLnN5bmNTY3JvbGxlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBtYXJrZG93biBjZWxsIHdpZGdldCBmcm9tIGEgbWFya2Rvd24gY2VsbCBtb2RlbC5cbiAgICAgKi9cbiAgICBfY3JlYXRlTWFya2Rvd25DZWxsKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IHJlbmRlcm1pbWUgPSB0aGlzLnJlbmRlcm1pbWU7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRGYWN0b3J5ID0gdGhpcy5jb250ZW50RmFjdG9yeTtcbiAgICAgICAgY29uc3QgZWRpdG9yQ29uZmlnID0gdGhpcy5lZGl0b3JDb25maWcubWFya2Rvd247XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBlZGl0b3JDb25maWcsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIHJlbmRlcm1pbWUsXG4gICAgICAgICAgICBjb250ZW50RmFjdG9yeSxcbiAgICAgICAgICAgIHVwZGF0ZUVkaXRvck9uU2hvdzogZmFsc2UsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogZmFsc2UsXG4gICAgICAgICAgICBzaG93RWRpdG9yRm9yUmVhZE9ubHlNYXJrZG93bjogdGhpcy5fbm90ZWJvb2tDb25maWdcbiAgICAgICAgICAgICAgICAuc2hvd0VkaXRvckZvclJlYWRPbmx5TWFya2Rvd25cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuY29udGVudEZhY3RvcnkuY3JlYXRlTWFya2Rvd25DZWxsKG9wdGlvbnMsIHRoaXMpO1xuICAgICAgICBjZWxsLnN5bmNDb2xsYXBzZSA9IHRydWU7XG4gICAgICAgIGNlbGwuc3luY0VkaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gQ29ubmVjdCBjb2xsYXBzZWQgc2lnbmFsIGZvciBlYWNoIG1hcmtkb3duIGNlbGwgd2lkZ2V0XG4gICAgICAgIGNlbGwudG9nZ2xlQ29sbGFwc2VkU2lnbmFsLmNvbm5lY3QoKG5ld0NlbGwsIGNvbGxhcHNlZCkgPT4ge1xuICAgICAgICAgICAgTm90ZWJvb2tBY3Rpb25zLnNldEhlYWRpbmdDb2xsYXBzZShuZXdDZWxsLCBjb2xsYXBzZWQsIHRoaXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHBsYWNlaG9sZGVyIGNlbGwgd2lkZ2V0IGZyb20gYSByYXcgY2VsbCBtb2RlbC5cbiAgICAgKi9cbiAgICBfY3JlYXRlUGxhY2Vob2xkZXJDZWxsKG1vZGVsLCBpbmRleCkge1xuICAgICAgICBjb25zdCBjb250ZW50RmFjdG9yeSA9IHRoaXMuY29udGVudEZhY3Rvcnk7XG4gICAgICAgIGNvbnN0IGVkaXRvckNvbmZpZyA9IHRoaXMuZWRpdG9yQ29uZmlnLnJhdztcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGVkaXRvckNvbmZpZyxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgY29udGVudEZhY3RvcnksXG4gICAgICAgICAgICB1cGRhdGVFZGl0b3JPblNob3c6IGZhbHNlLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuY29udGVudEZhY3RvcnkuY3JlYXRlUmF3Q2VsbChvcHRpb25zLCB0aGlzKTtcbiAgICAgICAgY2VsbC5ub2RlLmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJqcC1DZWxsLVBsYWNlaG9sZGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJqcC1DZWxsLVBsYWNlaG9sZGVyLXdyYXBwZXJcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICAgICAgICBjZWxsLmlucHV0SGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgY2VsbC5zeW5jQ29sbGFwc2UgPSB0cnVlO1xuICAgICAgICBjZWxsLnN5bmNFZGl0YWJsZSA9IHRydWU7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSByYXcgY2VsbCB3aWRnZXQgZnJvbSBhIHJhdyBjZWxsIG1vZGVsLlxuICAgICAqL1xuICAgIF9jcmVhdGVSYXdDZWxsKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRGYWN0b3J5ID0gdGhpcy5jb250ZW50RmFjdG9yeTtcbiAgICAgICAgY29uc3QgZWRpdG9yQ29uZmlnID0gdGhpcy5lZGl0b3JDb25maWcucmF3O1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgZWRpdG9yQ29uZmlnLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBjb250ZW50RmFjdG9yeSxcbiAgICAgICAgICAgIHVwZGF0ZUVkaXRvck9uU2hvdzogZmFsc2UsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuY29udGVudEZhY3RvcnkuY3JlYXRlUmF3Q2VsbChvcHRpb25zLCB0aGlzKTtcbiAgICAgICAgY2VsbC5zeW5jQ29sbGFwc2UgPSB0cnVlO1xuICAgICAgICBjZWxsLnN5bmNFZGl0YWJsZSA9IHRydWU7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNb3ZlIGEgY2VsbCB3aWRnZXQuXG4gICAgICovXG4gICAgX21vdmVDZWxsKGZyb21JbmRleCwgdG9JbmRleCkge1xuICAgICAgICBjb25zdCBsYXlvdXQgPSB0aGlzLmxheW91dDtcbiAgICAgICAgbGF5b3V0Lmluc2VydFdpZGdldCh0b0luZGV4LCBsYXlvdXQud2lkZ2V0c1tmcm9tSW5kZXhdKTtcbiAgICAgICAgdGhpcy5vbkNlbGxNb3ZlZChmcm9tSW5kZXgsIHRvSW5kZXgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBjZWxsIHdpZGdldC5cbiAgICAgKi9cbiAgICBfcmVtb3ZlQ2VsbChpbmRleCkge1xuICAgICAgICBjb25zdCBsYXlvdXQgPSB0aGlzLmxheW91dDtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gbGF5b3V0LndpZGdldHNbaW5kZXhdO1xuICAgICAgICB3aWRnZXQucGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5vbkNlbGxSZW1vdmVkKGluZGV4LCB3aWRnZXQpO1xuICAgICAgICB3aWRnZXQuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIG1pbWV0eXBlIG9mIHRoZSBub3RlYm9vay5cbiAgICAgKi9cbiAgICBfdXBkYXRlTWltZXR5cGUoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgaW5mbyA9IChfYSA9IHRoaXMuX21vZGVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWV0YWRhdGEuZ2V0KCdsYW5ndWFnZV9pbmZvJyk7XG4gICAgICAgIGlmICghaW5mbykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21pbWV0eXBlID0gdGhpcy5fbWltZXR5cGVTZXJ2aWNlLmdldE1pbWVUeXBlQnlMYW5ndWFnZShpbmZvKTtcbiAgICAgICAgZWFjaCh0aGlzLndpZGdldHMsIHdpZGdldCA9PiB7XG4gICAgICAgICAgICBpZiAod2lkZ2V0Lm1vZGVsLnR5cGUgPT09ICdjb2RlJykge1xuICAgICAgICAgICAgICAgIHdpZGdldC5tb2RlbC5taW1lVHlwZSA9IHRoaXMuX21pbWV0eXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGFuIHVwZGF0ZSB0byB0aGUgY29sbGFib3JhdG9ycy5cbiAgICAgKi9cbiAgICBfb25Db2xsYWJvcmF0b3JzQ2hhbmdlZCgpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBzZWxlY3Rpb25zIGNvcnJlc3BvbmRpbmcgdG8gbm9uLWNvbGxhYm9yYXRvcnMsXG4gICAgICAgIC8vIHRoZXkgYXJlIHN0YWxlIGFuZCBzaG91bGQgYmUgcmVtb3ZlZC5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndpZGdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLndpZGdldHNbaV07XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBjZWxsLm1vZGVsLnNlbGVjdGlvbnMua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZhbHNlID09PSAoKF9jID0gKF9iID0gKF9hID0gdGhpcy5fbW9kZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tb2RlbERCKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY29sbGFib3JhdG9ycykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmhhcyhrZXkpKSkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLm1vZGVsLnNlbGVjdGlvbnMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBlZGl0b3Igc2V0dGluZ3MgZm9yIG5vdGVib29rIGNlbGxzLlxuICAgICAqL1xuICAgIF91cGRhdGVFZGl0b3JDb25maWcoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53aWRnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy53aWRnZXRzW2ldO1xuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IHt9O1xuICAgICAgICAgICAgc3dpdGNoIChjZWxsLm1vZGVsLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjb2RlJzpcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gdGhpcy5fZWRpdG9yQ29uZmlnLmNvZGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21hcmtkb3duJzpcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gdGhpcy5fZWRpdG9yQ29uZmlnLm1hcmtkb3duO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjb25maWcgPSB0aGlzLl9lZGl0b3JDb25maWcucmF3O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNlbGwuZWRpdG9yLnNldE9wdGlvbnMoT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKSk7XG4gICAgICAgICAgICBjZWxsLmVkaXRvci5yZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwbHkgdXBkYXRlZCBub3RlYm9vayBzZXR0aW5ncy5cbiAgICAgKi9cbiAgICBfdXBkYXRlTm90ZWJvb2tDb25maWcoKSB7XG4gICAgICAgIC8vIEFwcGx5IHNjcm9sbFBhc3RFbmQgc2V0dGluZy5cbiAgICAgICAgdGhpcy50b2dnbGVDbGFzcygnanAtbW9kLXNjcm9sbFBhc3RFbmQnLCB0aGlzLl9ub3RlYm9va0NvbmZpZy5zY3JvbGxQYXN0RW5kKTtcbiAgICAgICAgLy8gQ29udHJvbCBlZGl0b3IgdmlzaWJpbGl0eSBmb3IgcmVhZC1vbmx5IE1hcmtkb3duIGNlbGxzXG4gICAgICAgIGNvbnN0IHNob3dFZGl0b3JGb3JSZWFkT25seU1hcmtkb3duID0gdGhpcy5fbm90ZWJvb2tDb25maWdcbiAgICAgICAgICAgIC5zaG93RWRpdG9yRm9yUmVhZE9ubHlNYXJrZG93bjtcbiAgICAgICAgLy8gJ3RoaXMuX2NlbGxzQXJyYXknIGNoZWNrIGlzIGhlcmUgYXMgJ191cGRhdGVOb3RlYm9va0NvbmZpZygpJ1xuICAgICAgICAvLyBjYW4gYmUgY2FsbGVkIGJlZm9yZSAndGhpcy5fY2VsbHNBcnJheScgaXMgZGVmaW5lZFxuICAgICAgICBpZiAoc2hvd0VkaXRvckZvclJlYWRPbmx5TWFya2Rvd24gIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9jZWxsc0FycmF5KSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNlbGwgb2YgdGhpcy5fY2VsbHNBcnJheSkge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsLm1vZGVsLnR5cGUgPT09ICdtYXJrZG93bicpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5zaG93RWRpdG9yRm9yUmVhZE9ubHkgPSBzaG93RWRpdG9yRm9yUmVhZE9ubHlNYXJrZG93bjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2luY3JlbWVudFJlbmRlcmVkQ291bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLl90b1JlbmRlck1hcC5zaXplID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9mdWxseVJlbmRlcmVkLmVtaXQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVuZGVyZWRDZWxsc0NvdW50Kys7XG4gICAgfVxuICAgIGdldCByZW1haW5pbmdDZWxsVG9SZW5kZXJDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvUmVuZGVyTWFwLnNpemU7XG4gICAgfVxufVxuLyoqXG4gKiBUaGUgbmFtZXNwYWNlIGZvciB0aGUgYFN0YXRpY05vdGVib29rYCBjbGFzcyBzdGF0aWNzLlxuICovXG4oZnVuY3Rpb24gKFN0YXRpY05vdGVib29rKSB7XG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIGNlbGwgZWRpdG9ycy5cbiAgICAgKi9cbiAgICBTdGF0aWNOb3RlYm9vay5kZWZhdWx0RWRpdG9yQ29uZmlnID0ge1xuICAgICAgICBjb2RlOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIENvZGVFZGl0b3IuZGVmYXVsdENvbmZpZyksIHsgbGluZVdyYXA6ICdvZmYnLCBtYXRjaEJyYWNrZXRzOiB0cnVlLCBhdXRvQ2xvc2luZ0JyYWNrZXRzOiBmYWxzZSB9KSxcbiAgICAgICAgbWFya2Rvd246IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgQ29kZUVkaXRvci5kZWZhdWx0Q29uZmlnKSwgeyBsaW5lV3JhcDogJ29uJywgbWF0Y2hCcmFja2V0czogZmFsc2UsIGF1dG9DbG9zaW5nQnJhY2tldHM6IGZhbHNlIH0pLFxuICAgICAgICByYXc6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgQ29kZUVkaXRvci5kZWZhdWx0Q29uZmlnKSwgeyBsaW5lV3JhcDogJ29uJywgbWF0Y2hCcmFja2V0czogZmFsc2UsIGF1dG9DbG9zaW5nQnJhY2tldHM6IGZhbHNlIH0pXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3Igbm90ZWJvb2tzLlxuICAgICAqL1xuICAgIFN0YXRpY05vdGVib29rLmRlZmF1bHROb3RlYm9va0NvbmZpZyA9IHtcbiAgICAgICAgc2Nyb2xsUGFzdEVuZDogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdENlbGw6ICdjb2RlJyxcbiAgICAgICAgcmVjb3JkVGltaW5nOiBmYWxzZSxcbiAgICAgICAgbnVtYmVyQ2VsbHNUb1JlbmRlckRpcmVjdGx5OiA5OTk5OSxcbiAgICAgICAgcmVtYWluaW5nVGltZUJlZm9yZVJlc2NoZWR1bGluZzogNTAsXG4gICAgICAgIHJlbmRlckNlbGxPbklkbGU6IHRydWUsXG4gICAgICAgIG9ic2VydmVkVG9wTWFyZ2luOiAnMTAwMHB4JyxcbiAgICAgICAgb2JzZXJ2ZWRCb3R0b21NYXJnaW46ICcxMDAwcHgnLFxuICAgICAgICBtYXhOdW1iZXJPdXRwdXRzOiA1MCxcbiAgICAgICAgc2hvd0VkaXRvckZvclJlYWRPbmx5TWFya2Rvd246IHRydWUsXG4gICAgICAgIGRpc2FibGVEb2N1bWVudFdpZGVVbmRvUmVkbzogZmFsc2UsXG4gICAgICAgIHJlbmRlcmluZ0xheW91dDogJ2RlZmF1bHQnLFxuICAgICAgICBzaWRlQnlTaWRlTGVmdE1hcmdpbk92ZXJyaWRlOiAnMTBweCcsXG4gICAgICAgIHNpZGVCeVNpZGVSaWdodE1hcmdpbk92ZXJyaWRlOiAnMTBweCdcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGFuIGBJQ29udGVudEZhY3RvcnlgLlxuICAgICAqL1xuICAgIGNsYXNzIENvbnRlbnRGYWN0b3J5IGV4dGVuZHMgQ2VsbC5Db250ZW50RmFjdG9yeSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgYSBuZXcgY29kZSBjZWxsIHdpZGdldC5cbiAgICAgICAgICpcbiAgICAgICAgICogIyMjIyBOb3Rlc1xuICAgICAgICAgKiBJZiBubyBjZWxsIGNvbnRlbnQgZmFjdG9yeSBpcyBwYXNzZWQgaW4gd2l0aCB0aGUgb3B0aW9ucywgdGhlIG9uZSBvbiB0aGVcbiAgICAgICAgICogbm90ZWJvb2sgY29udGVudCBmYWN0b3J5IGlzIHVzZWQuXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVDb2RlQ2VsbChvcHRpb25zLCBwYXJlbnQpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5jb250ZW50RmFjdG9yeSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGVudEZhY3RvcnkgPSB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2RlQ2VsbChvcHRpb25zKS5pbml0aWFsaXplU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgbmV3IG1hcmtkb3duIGNlbGwgd2lkZ2V0LlxuICAgICAgICAgKlxuICAgICAgICAgKiAjIyMjIE5vdGVzXG4gICAgICAgICAqIElmIG5vIGNlbGwgY29udGVudCBmYWN0b3J5IGlzIHBhc3NlZCBpbiB3aXRoIHRoZSBvcHRpb25zLCB0aGUgb25lIG9uIHRoZVxuICAgICAgICAgKiBub3RlYm9vayBjb250ZW50IGZhY3RvcnkgaXMgdXNlZC5cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZU1hcmtkb3duQ2VsbChvcHRpb25zLCBwYXJlbnQpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5jb250ZW50RmFjdG9yeSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGVudEZhY3RvcnkgPSB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBNYXJrZG93bkNlbGwob3B0aW9ucykuaW5pdGlhbGl6ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhIG5ldyByYXcgY2VsbCB3aWRnZXQuXG4gICAgICAgICAqXG4gICAgICAgICAqICMjIyMgTm90ZXNcbiAgICAgICAgICogSWYgbm8gY2VsbCBjb250ZW50IGZhY3RvcnkgaXMgcGFzc2VkIGluIHdpdGggdGhlIG9wdGlvbnMsIHRoZSBvbmUgb24gdGhlXG4gICAgICAgICAqIG5vdGVib29rIGNvbnRlbnQgZmFjdG9yeSBpcyB1c2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlUmF3Q2VsbChvcHRpb25zLCBwYXJlbnQpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5jb250ZW50RmFjdG9yeSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGVudEZhY3RvcnkgPSB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYXdDZWxsKG9wdGlvbnMpLmluaXRpYWxpemVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFN0YXRpY05vdGVib29rLkNvbnRlbnRGYWN0b3J5ID0gQ29udGVudEZhY3Rvcnk7XG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBjb250ZW50IGZhY3RvcnkgZm9yIHRoZSBzdGF0aWMgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqL1xuICAgIFN0YXRpY05vdGVib29rLmRlZmF1bHRDb250ZW50RmFjdG9yeSA9IG5ldyBDb250ZW50RmFjdG9yeSgpO1xufSkoU3RhdGljTm90ZWJvb2sgfHwgKFN0YXRpY05vdGVib29rID0ge30pKTtcbi8qKlxuICogQSBub3RlYm9vayB3aWRnZXQgdGhhdCBzdXBwb3J0cyBpbnRlcmFjdGl2aXR5LlxuICovXG5leHBvcnQgY2xhc3MgTm90ZWJvb2sgZXh0ZW5kcyBTdGF0aWNOb3RlYm9vayB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoUHJpdmF0ZS5wcm9jZXNzTm90ZWJvb2tPcHRpb25zKG9wdGlvbnMpKTtcbiAgICAgICAgdGhpcy5fYWN0aXZlQ2VsbEluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUNlbGwgPSBudWxsO1xuICAgICAgICB0aGlzLl9tb2RlID0gJ2NvbW1hbmQnO1xuICAgICAgICB0aGlzLl9kcmFnID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZnJhZ21lbnQgPSAnJztcbiAgICAgICAgdGhpcy5fZHJhZ0RhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLl9tb3VzZU1vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLl9hY3RpdmVDZWxsQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbkNoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9jaGVja0NhY2hlT25OZXh0UmVzaXplID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2xhc3RDbGlwYm9hcmRJbnRlcmFjdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMubm9kZS50YWJJbmRleCA9IDA7IC8vIEFsbG93IHRoZSB3aWRnZXQgdG8gdGFrZSBmb2N1cy5cbiAgICAgICAgLy8gQWxsb3cgdGhlIG5vZGUgdG8gc2Nyb2xsIHdoaWxlIGRyYWdnaW5nIGl0ZW1zLlxuICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLWxtLWRyYWdzY3JvbGwnLCAndHJ1ZScpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIGFjdGl2ZSBjZWxsIGNoYW5nZXMuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBjYW4gYmUgZHVlIHRvIHRoZSBhY3RpdmUgaW5kZXggY2hhbmdpbmcgb3IgdGhlXG4gICAgICogY2VsbCBhdCB0aGUgYWN0aXZlIGluZGV4IGNoYW5naW5nLlxuICAgICAqL1xuICAgIGdldCBhY3RpdmVDZWxsQ2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUNlbGxDaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIHN0YXRlIG9mIHRoZSBub3RlYm9vayBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGdldCBzdGF0ZUNoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZUNoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0aW9uIHN0YXRlIG9mIHRoZSBub3RlYm9vayBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGdldCBzZWxlY3Rpb25DaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGludGVyYWN0aXZpdHkgbW9kZSBvZiB0aGUgbm90ZWJvb2suXG4gICAgICovXG4gICAgZ2V0IG1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlO1xuICAgIH1cbiAgICBzZXQgbW9kZShuZXdWYWx1ZSkge1xuICAgICAgICBjb25zdCBhY3RpdmVDZWxsID0gdGhpcy5hY3RpdmVDZWxsO1xuICAgICAgICBpZiAoIWFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gJ2NvbW1hbmQnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdGhpcy5fbW9kZSkge1xuICAgICAgICAgICAgdGhpcy5fZW5zdXJlRm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBQb3N0IGFuIHVwZGF0ZSByZXF1ZXN0LlxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuX21vZGU7XG4gICAgICAgIHRoaXMuX21vZGUgPSBuZXdWYWx1ZTtcbiAgICAgICAgaWYgKG5ld1ZhbHVlID09PSAnZWRpdCcpIHtcbiAgICAgICAgICAgIC8vIEVkaXQgbW9kZSBkZXNlbGVjdHMgYWxsIGNlbGxzLlxuICAgICAgICAgICAgZWFjaCh0aGlzLndpZGdldHMsIHdpZGdldCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXNlbGVjdCh3aWRnZXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAgRWRpdCBtb2RlIHVucmVuZGVycyBhbiBhY3RpdmUgbWFya2Rvd24gd2lkZ2V0LlxuICAgICAgICAgICAgaWYgKGFjdGl2ZUNlbGwgaW5zdGFuY2VvZiBNYXJrZG93bkNlbGwpIHtcbiAgICAgICAgICAgICAgICBhY3RpdmVDZWxsLnJlbmRlcmVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhY3RpdmVDZWxsLmlucHV0SGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBGb2N1cyBvbiB0aGUgbm90ZWJvb2sgZG9jdW1lbnQsIHdoaWNoIGJsdXJzIHRoZSBhY3RpdmUgY2VsbC5cbiAgICAgICAgICAgIHRoaXMubm9kZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlZC5lbWl0KHsgbmFtZTogJ21vZGUnLCBvbGRWYWx1ZSwgbmV3VmFsdWUgfSk7XG4gICAgICAgIHRoaXMuX2Vuc3VyZUZvY3VzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBhY3RpdmUgY2VsbCBpbmRleCBvZiB0aGUgbm90ZWJvb2suXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIGluZGV4IHdpbGwgYmUgY2xhbXBlZCB0byB0aGUgYm91bmRzIG9mIHRoZSBub3RlYm9vayBjZWxscy5cbiAgICAgKi9cbiAgICBnZXQgYWN0aXZlQ2VsbEluZGV4KCkge1xuICAgICAgICBpZiAoIXRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5jZWxscy5sZW5ndGggPyB0aGlzLl9hY3RpdmVDZWxsSW5kZXggOiAtMTtcbiAgICB9XG4gICAgc2V0IGFjdGl2ZUNlbGxJbmRleChuZXdWYWx1ZSkge1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuX2FjdGl2ZUNlbGxJbmRleDtcbiAgICAgICAgaWYgKCF0aGlzLm1vZGVsIHx8ICF0aGlzLm1vZGVsLmNlbGxzLmxlbmd0aCkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gTWF0aC5tYXgobmV3VmFsdWUsIDApO1xuICAgICAgICAgICAgbmV3VmFsdWUgPSBNYXRoLm1pbihuZXdWYWx1ZSwgdGhpcy5tb2RlbC5jZWxscy5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hY3RpdmVDZWxsSW5kZXggPSBuZXdWYWx1ZTtcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMud2lkZ2V0c1tuZXdWYWx1ZV07XG4gICAgICAgIGlmIChjZWxsICE9PSB0aGlzLl9hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICAvLyBQb3N0IGFuIHVwZGF0ZSByZXF1ZXN0LlxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUNlbGwgPSBjZWxsO1xuICAgICAgICAgICAgdGhpcy5fYWN0aXZlQ2VsbENoYW5nZWQuZW1pdChjZWxsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnZWRpdCcgJiYgY2VsbCBpbnN0YW5jZW9mIE1hcmtkb3duQ2VsbCkge1xuICAgICAgICAgICAgY2VsbC5yZW5kZXJlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Vuc3VyZUZvY3VzKCk7XG4gICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90cmltU2VsZWN0aW9ucygpO1xuICAgICAgICB0aGlzLl9zdGF0ZUNoYW5nZWQuZW1pdCh7IG5hbWU6ICdhY3RpdmVDZWxsSW5kZXgnLCBvbGRWYWx1ZSwgbmV3VmFsdWUgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYWN0aXZlIGNlbGwgd2lkZ2V0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgaXMgYSBjZWxsIG9yIGBudWxsYCBpZiB0aGVyZSBpcyBubyBhY3RpdmUgY2VsbC5cbiAgICAgKi9cbiAgICBnZXQgYWN0aXZlQ2VsbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUNlbGw7XG4gICAgfVxuICAgIGdldCBsYXN0Q2xpcGJvYXJkSW50ZXJhY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXN0Q2xpcGJvYXJkSW50ZXJhY3Rpb247XG4gICAgfVxuICAgIHNldCBsYXN0Q2xpcGJvYXJkSW50ZXJhY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbGFzdENsaXBib2FyZEludGVyYWN0aW9uID0gbmV3VmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2FjdGl2ZUNlbGwgPSBudWxsO1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbGVjdCBhIGNlbGwgd2lkZ2V0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIEl0IGlzIGEgbm8tb3AgaWYgdGhlIHZhbHVlIGRvZXMgbm90IGNoYW5nZS5cbiAgICAgKiBJdCB3aWxsIGVtaXQgdGhlIGBzZWxlY3Rpb25DaGFuZ2VkYCBzaWduYWwuXG4gICAgICovXG4gICAgc2VsZWN0KHdpZGdldCkge1xuICAgICAgICBpZiAoUHJpdmF0ZS5zZWxlY3RlZFByb3BlcnR5LmdldCh3aWRnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgUHJpdmF0ZS5zZWxlY3RlZFByb3BlcnR5LnNldCh3aWRnZXQsIHRydWUpO1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb25DaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVzZWxlY3QgYSBjZWxsIHdpZGdldC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBJdCBpcyBhIG5vLW9wIGlmIHRoZSB2YWx1ZSBkb2VzIG5vdCBjaGFuZ2UuXG4gICAgICogSXQgd2lsbCBlbWl0IHRoZSBgc2VsZWN0aW9uQ2hhbmdlZGAgc2lnbmFsLlxuICAgICAqL1xuICAgIGRlc2VsZWN0KHdpZGdldCkge1xuICAgICAgICBpZiAoIVByaXZhdGUuc2VsZWN0ZWRQcm9wZXJ0eS5nZXQod2lkZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFByaXZhdGUuc2VsZWN0ZWRQcm9wZXJ0eS5zZXQod2lkZ2V0LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbkNoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGEgY2VsbCBpcyBzZWxlY3RlZC5cbiAgICAgKi9cbiAgICBpc1NlbGVjdGVkKHdpZGdldCkge1xuICAgICAgICByZXR1cm4gUHJpdmF0ZS5zZWxlY3RlZFByb3BlcnR5LmdldCh3aWRnZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGEgY2VsbCBpcyBzZWxlY3RlZCBvciBpcyB0aGUgYWN0aXZlIGNlbGwuXG4gICAgICovXG4gICAgaXNTZWxlY3RlZE9yQWN0aXZlKHdpZGdldCkge1xuICAgICAgICBpZiAod2lkZ2V0ID09PSB0aGlzLl9hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJpdmF0ZS5zZWxlY3RlZFByb3BlcnR5LmdldCh3aWRnZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZXNlbGVjdCBhbGwgb2YgdGhlIGNlbGxzLlxuICAgICAqL1xuICAgIGRlc2VsZWN0QWxsKCkge1xuICAgICAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICBlYWNoKHRoaXMud2lkZ2V0cywgd2lkZ2V0ID0+IHtcbiAgICAgICAgICAgIGlmIChQcml2YXRlLnNlbGVjdGVkUHJvcGVydHkuZ2V0KHdpZGdldCkpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFByaXZhdGUuc2VsZWN0ZWRQcm9wZXJ0eS5zZXQod2lkZ2V0LCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgYSB2YWxpZCBhY3RpdmUgY2VsbC5cbiAgICAgICAgdGhpcy5hY3RpdmVDZWxsSW5kZXggPSB0aGlzLmFjdGl2ZUNlbGxJbmRleDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNb3ZlIHRoZSBoZWFkIG9mIGFuIGV4aXN0aW5nIGNvbnRpZ3VvdXMgc2VsZWN0aW9uIHRvIGV4dGVuZCB0aGUgc2VsZWN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IC0gVGhlIG5ldyBoZWFkIG9mIHRoZSBleGlzdGluZyBzZWxlY3Rpb24uXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogSWYgdGhlcmUgaXMgbm8gZXhpc3Rpbmcgc2VsZWN0aW9uLCB0aGUgYWN0aXZlIGNlbGwgaXMgY29uc2lkZXJlZCBhblxuICAgICAqIGV4aXN0aW5nIG9uZS1jZWxsIHNlbGVjdGlvbi5cbiAgICAgKlxuICAgICAqIElmIHRoZSBuZXcgc2VsZWN0aW9uIGlzIGEgc2luZ2xlIGNlbGwsIHRoYXQgY2VsbCBiZWNvbWVzIHRoZSBhY3RpdmUgY2VsbFxuICAgICAqIGFuZCBhbGwgY2VsbHMgYXJlIGRlc2VsZWN0ZWQuXG4gICAgICpcbiAgICAgKiBUaGVyZSBpcyBubyBjaGFuZ2UgaWYgdGhlcmUgYXJlIG5vIGNlbGxzIChpLmUuLCBhY3RpdmVDZWxsSW5kZXggaXMgLTEpLlxuICAgICAqL1xuICAgIGV4dGVuZENvbnRpZ3VvdXNTZWxlY3Rpb25UbyhpbmRleCkge1xuICAgICAgICBsZXQgeyBoZWFkLCBhbmNob3IgfSA9IHRoaXMuZ2V0Q29udGlndW91c1NlbGVjdGlvbigpO1xuICAgICAgICBsZXQgaTtcbiAgICAgICAgLy8gSGFuZGxlIHRoZSBjYXNlIG9mIG5vIGN1cnJlbnQgc2VsZWN0aW9uLlxuICAgICAgICBpZiAoYW5jaG9yID09PSBudWxsIHx8IGhlYWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5hY3RpdmVDZWxsSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAvLyBBbHJlYWR5IGNvbGxhcHNlZCBzZWxlY3Rpb24sIG5vdGhpbmcgbW9yZSB0byBkby5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBXZSB3aWxsIHN0YXJ0IGEgbmV3IHNlbGVjdGlvbiBiZWxvdy5cbiAgICAgICAgICAgIGhlYWQgPSB0aGlzLmFjdGl2ZUNlbGxJbmRleDtcbiAgICAgICAgICAgIGFuY2hvciA9IHRoaXMuYWN0aXZlQ2VsbEluZGV4O1xuICAgICAgICB9XG4gICAgICAgIC8vIE1vdmUgdGhlIGFjdGl2ZSBjZWxsLiBXZSBkbyB0aGlzIGJlZm9yZSB0aGUgY29sbGFwc2luZyBzaG9ydGN1dCBiZWxvdy5cbiAgICAgICAgdGhpcy5hY3RpdmVDZWxsSW5kZXggPSBpbmRleDtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBpbmRleCBpcyB2YWxpZCwgYWNjb3JkaW5nIHRvIHRoZSBydWxlcyBmb3Igc2V0dGluZyBhbmQgY2xpcHBpbmcgdGhlXG4gICAgICAgIC8vIGFjdGl2ZSBjZWxsIGluZGV4LiBUaGlzIG1heSBjaGFuZ2UgdGhlIGluZGV4LlxuICAgICAgICBpbmRleCA9IHRoaXMuYWN0aXZlQ2VsbEluZGV4O1xuICAgICAgICAvLyBDb2xsYXBzZSB0aGUgc2VsZWN0aW9uIGlmIGl0IGlzIG9ubHkgdGhlIGFjdGl2ZSBjZWxsLlxuICAgICAgICBpZiAoaW5kZXggPT09IGFuY2hvcikge1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZWxlY3Rpb25DaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIGlmIChoZWFkIDwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChoZWFkIDwgYW5jaG9yKSB7XG4gICAgICAgICAgICAgICAgUHJpdmF0ZS5zZWxlY3RlZFByb3BlcnR5LnNldCh0aGlzLndpZGdldHNbaGVhZF0sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRvZ2dsZSBldmVyeXRoaW5nIHN0cmljdGx5IGJldHdlZW4gaGVhZCBhbmQgaW5kZXggZXhjZXB0IGFuY2hvci5cbiAgICAgICAgICAgIGZvciAoaSA9IGhlYWQgKyAxOyBpIDwgaW5kZXg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpICE9PSBhbmNob3IpIHtcbiAgICAgICAgICAgICAgICAgICAgUHJpdmF0ZS5zZWxlY3RlZFByb3BlcnR5LnNldCh0aGlzLndpZGdldHNbaV0sICFQcml2YXRlLnNlbGVjdGVkUHJvcGVydHkuZ2V0KHRoaXMud2lkZ2V0c1tpXSkpO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPCBoZWFkKSB7XG4gICAgICAgICAgICBpZiAoYW5jaG9yIDwgaGVhZCkge1xuICAgICAgICAgICAgICAgIFByaXZhdGUuc2VsZWN0ZWRQcm9wZXJ0eS5zZXQodGhpcy53aWRnZXRzW2hlYWRdLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUb2dnbGUgZXZlcnl0aGluZyBzdHJpY3RseSBiZXR3ZWVuIGluZGV4IGFuZCBoZWFkIGV4Y2VwdCBhbmNob3IuXG4gICAgICAgICAgICBmb3IgKGkgPSBpbmRleCArIDE7IGkgPCBoZWFkOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSAhPT0gYW5jaG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIFByaXZhdGUuc2VsZWN0ZWRQcm9wZXJ0eS5zZXQodGhpcy53aWRnZXRzW2ldLCAhUHJpdmF0ZS5zZWxlY3RlZFByb3BlcnR5LmdldCh0aGlzLndpZGdldHNbaV0pKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEFuY2hvciBhbmQgaW5kZXggc2hvdWxkICphbHdheXMqIGJlIHNlbGVjdGVkLlxuICAgICAgICBpZiAoIVByaXZhdGUuc2VsZWN0ZWRQcm9wZXJ0eS5nZXQodGhpcy53aWRnZXRzW2FuY2hvcl0pKSB7XG4gICAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBQcml2YXRlLnNlbGVjdGVkUHJvcGVydHkuc2V0KHRoaXMud2lkZ2V0c1thbmNob3JdLCB0cnVlKTtcbiAgICAgICAgaWYgKCFQcml2YXRlLnNlbGVjdGVkUHJvcGVydHkuZ2V0KHRoaXMud2lkZ2V0c1tpbmRleF0pKSB7XG4gICAgICAgICAgICBzZWxlY3Rpb25DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBQcml2YXRlLnNlbGVjdGVkUHJvcGVydHkuc2V0KHRoaXMud2lkZ2V0c1tpbmRleF0sIHRydWUpO1xuICAgICAgICBpZiAoc2VsZWN0aW9uQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBoZWFkIGFuZCBhbmNob3Igb2YgYSBjb250aWd1b3VzIGNlbGwgc2VsZWN0aW9uLlxuICAgICAqXG4gICAgICogVGhlIGhlYWQgb2YgYSBjb250aWd1b3VzIHNlbGVjdGlvbiBpcyBhbHdheXMgdGhlIGFjdGl2ZSBjZWxsLlxuICAgICAqXG4gICAgICogSWYgdGhlcmUgYXJlIG5vIGNlbGxzIHNlbGVjdGVkLCBge2hlYWQ6IG51bGwsIGFuY2hvcjogbnVsbH1gIGlzIHJldHVybmVkLlxuICAgICAqXG4gICAgICogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgY2VsbHMgZG8gbm90IGZvcm0gYSBjb250aWd1b3VzXG4gICAgICogc2VsZWN0aW9uLlxuICAgICAqL1xuICAgIGdldENvbnRpZ3VvdXNTZWxlY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGNlbGxzID0gdGhpcy53aWRnZXRzO1xuICAgICAgICBjb25zdCBmaXJzdCA9IEFycmF5RXh0LmZpbmRGaXJzdEluZGV4KGNlbGxzLCBjID0+IHRoaXMuaXNTZWxlY3RlZChjKSk7XG4gICAgICAgIC8vIFJldHVybiBlYXJseSBpZiBubyBjZWxscyBhcmUgc2VsZWN0ZWQuXG4gICAgICAgIGlmIChmaXJzdCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGhlYWQ6IG51bGwsIGFuY2hvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhc3QgPSBBcnJheUV4dC5maW5kTGFzdEluZGV4KGNlbGxzLCBjID0+IHRoaXMuaXNTZWxlY3RlZChjKSwgLTEsIGZpcnN0KTtcbiAgICAgICAgLy8gQ2hlY2sgdGhhdCB0aGUgc2VsZWN0aW9uIGlzIGNvbnRpZ3VvdXMuXG4gICAgICAgIGZvciAobGV0IGkgPSBmaXJzdDsgaSA8PSBsYXN0OyBpKyspIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKGNlbGxzW2ldKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2VsZWN0aW9uIG5vdCBjb250aWd1b3VzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgdGhhdCB0aGUgYWN0aXZlIGNlbGwgaXMgb25lIG9mIHRoZSBlbmRwb2ludHMgb2YgdGhlIHNlbGVjdGlvbi5cbiAgICAgICAgY29uc3QgYWN0aXZlSW5kZXggPSB0aGlzLmFjdGl2ZUNlbGxJbmRleDtcbiAgICAgICAgaWYgKGZpcnN0ICE9PSBhY3RpdmVJbmRleCAmJiBsYXN0ICE9PSBhY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3RpdmUgY2VsbCBub3QgYXQgZW5kcG9pbnQgb2Ygc2VsZWN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBoZWFkIGFuZCBhbmNob3Igb2YgdGhlIHNlbGVjdGlvbi5cbiAgICAgICAgaWYgKGZpcnN0ID09PSBhY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgaGVhZDogZmlyc3QsIGFuY2hvcjogbGFzdCB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgaGVhZDogbGFzdCwgYW5jaG9yOiBmaXJzdCB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNjcm9sbCBzbyB0aGF0IHRoZSBnaXZlbiBwb3NpdGlvbiBpcyBjZW50ZXJlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwb3NpdGlvbiAtIFRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiBpbiB0aGUgbm90ZWJvb2sgd2lkZ2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHRocmVzaG9sZCAtIEFuIG9wdGlvbmFsIHRocmVzaG9sZCBmb3IgdGhlIHNjcm9sbCAoMC01MCwgZGVmYXVsdHMgdG9cbiAgICAgKiAyNSkuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogSWYgdGhlIHBvc2l0aW9uIGlzIHdpdGhpbiB0aGUgdGhyZXNob2xkIHBlcmNlbnRhZ2Ugb2YgdGhlIHdpZGdldCBoZWlnaHQsXG4gICAgICogbWVhc3VyZWQgZnJvbSB0aGUgY2VudGVyIG9mIHRoZSB3aWRnZXQsIHRoZSBzY3JvbGwgcG9zaXRpb24gd2lsbCBub3QgYmVcbiAgICAgKiBjaGFuZ2VkLiBBIHRocmVzaG9sZCBvZiAwIG1lYW5zIHdlIHdpbGwgYWx3YXlzIHNjcm9sbCBzbyB0aGUgcG9zaXRpb24gaXNcbiAgICAgKiBjZW50ZXJlZCwgYW5kIGEgdGhyZXNob2xkIG9mIDUwIG1lYW5zIHNjcm9sbGluZyBvbmx5IGhhcHBlbnMgaWYgcG9zaXRpb24gaXNcbiAgICAgKiBvdXRzaWRlIHRoZSBjdXJyZW50IHdpbmRvdy5cbiAgICAgKi9cbiAgICBzY3JvbGxUb1Bvc2l0aW9uKHBvc2l0aW9uLCB0aHJlc2hvbGQgPSAyNSkge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5ub2RlO1xuICAgICAgICBjb25zdCBhciA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gcG9zaXRpb24gLSBhci50b3AgLSBhci5oZWlnaHQgLyAyO1xuICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGEpID4gKGFyLmhlaWdodCAqIHRocmVzaG9sZCkgLyAxMDApIHtcbiAgICAgICAgICAgIG5vZGUuc2Nyb2xsVG9wICs9IGRlbHRhO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNjcm9sbCBzbyB0aGF0IHRoZSBnaXZlbiBjZWxsIGlzIGluIHZpZXcuIFNlbGVjdHMgYW5kIGFjdGl2YXRlcyBjZWxsLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNlbGwgLSBBIGNlbGwgaW4gdGhlIG5vdGVib29rIHdpZGdldC5cbiAgICAgKlxuICAgICAqL1xuICAgIHNjcm9sbFRvQ2VsbChjZWxsKSB7XG4gICAgICAgIC8vIHVzZSBQaG9zcGhvciB0byBzY3JvbGxcbiAgICAgICAgRWxlbWVudEV4dC5zY3JvbGxJbnRvVmlld0lmTmVlZGVkKHRoaXMubm9kZSwgY2VsbC5ub2RlKTtcbiAgICAgICAgLy8gY2hhbmdlIHNlbGVjdGlvbiBhbmQgYWN0aXZlIGNlbGw6XG4gICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgdGhpcy5zZWxlY3QoY2VsbCk7XG4gICAgICAgIGNlbGwuYWN0aXZhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IFVSSSBmcmFnbWVudCBpZGVudGlmaWVyLlxuICAgICAqL1xuICAgIHNldEZyYWdtZW50KGZyYWdtZW50KSB7XG4gICAgICAgIC8vIFdhaXQgYWxsIGNlbGxzIGFyZSByZW5kZXJlZCB0aGVuIHNldCBmcmFnbWVudCBhbmQgdXBkYXRlLlxuICAgICAgICB2b2lkIFByb21pc2UuYWxsKHRoaXMud2lkZ2V0cy5tYXAod2lkZ2V0ID0+IHdpZGdldC5yZWFkeSkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZnJhZ21lbnQgPSBmcmFnbWVudDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIERPTSBldmVudHMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnQgLSBUaGUgRE9NIGV2ZW50IHNlbnQgdG8gdGhlIHdpZGdldC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIG1ldGhvZCBpbXBsZW1lbnRzIHRoZSBET00gYEV2ZW50TGlzdGVuZXJgIGludGVyZmFjZSBhbmQgaXNcbiAgICAgKiBjYWxsZWQgaW4gcmVzcG9uc2UgdG8gZXZlbnRzIG9uIHRoZSBub3RlYm9vayBwYW5lbCdzIG5vZGUuIEl0IHNob3VsZFxuICAgICAqIG5vdCBiZSBjYWxsZWQgZGlyZWN0bHkgYnkgdXNlciBjb2RlLlxuICAgICAqL1xuICAgIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnY29udGV4dG1lbnUnOlxuICAgICAgICAgICAgICAgIGlmIChldmVudC5ldmVudFBoYXNlID09PSBFdmVudC5DQVBUVVJJTkdfUEhBU0UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZ0Q29udGV4dE1lbnVDYXB0dXJlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgICAgICAgICAgIGlmIChldmVudC5ldmVudFBoYXNlID09PSBFdmVudC5DQVBUVVJJTkdfUEhBU0UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZ0TW91c2VEb3duQ2FwdHVyZShldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldnRNb3VzZURvd24oZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vdXNldXAnOlxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0ID09PSBkb2N1bWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldnREb2N1bWVudE1vdXNldXAoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vdXNlbW92ZSc6XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQgPT09IGRvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2dERvY3VtZW50TW91c2Vtb3ZlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdrZXlkb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9lbnN1cmVGb2N1cyh0cnVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RibGNsaWNrJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldnREYmxDbGljayhldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdmb2N1c2luJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldnRGb2N1c0luKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2ZvY3Vzb3V0JzpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldnRGb2N1c091dChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsbS1kcmFnZW50ZXInOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dERyYWdFbnRlcihldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsbS1kcmFnbGVhdmUnOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dERyYWdMZWF2ZShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsbS1kcmFnb3Zlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0RHJhZ092ZXIoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbG0tZHJvcCc6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0RHJvcChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgYWZ0ZXItYXR0YWNoYCBtZXNzYWdlcyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBvbkFmdGVyQXR0YWNoKG1zZykge1xuICAgICAgICBzdXBlci5vbkFmdGVyQXR0YWNoKG1zZyk7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzKTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcyk7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCB0aGlzKTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcyk7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzKTtcbiAgICAgICAgLy8gQ2FwdHVyZSBkcmFnIGV2ZW50cyBmb3IgdGhlIG5vdGVib29rIHdpZGdldFxuICAgICAgICAvLyBpbiBvcmRlciB0byBwcmVlbXB0IHRoZSBkcmFnL2Ryb3AgaGFuZGxlcnMgaW4gdGhlXG4gICAgICAgIC8vIGNvZGUgZWRpdG9yIHdpZGdldHMsIHdoaWNoIGNhbiB0YWtlIHRleHQgZGF0YS5cbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdsbS1kcmFnZW50ZXInLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdsbS1kcmFnbGVhdmUnLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdsbS1kcmFnb3ZlcicsIHRoaXMsIHRydWUpO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2xtLWRyb3AnLCB0aGlzLCB0cnVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGBiZWZvcmUtZGV0YWNoYCBtZXNzYWdlcyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBvbkJlZm9yZURldGFjaChtc2cpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMsIHRydWUpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMsIHRydWUpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzKTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzKTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xtLWRyYWdlbnRlcicsIHRoaXMsIHRydWUpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xtLWRyYWdsZWF2ZScsIHRoaXMsIHRydWUpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xtLWRyYWdvdmVyJywgdGhpcywgdHJ1ZSk7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG0tZHJvcCcsIHRoaXMsIHRydWUpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMsIHRydWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIG1lc3NhZ2UgaGFuZGxlciBpbnZva2VkIG9uIGFuIGAnYWZ0ZXItc2hvdydgIG1lc3NhZ2UuXG4gICAgICovXG4gICAgb25BZnRlclNob3cobXNnKSB7XG4gICAgICAgIHRoaXMuX2NoZWNrQ2FjaGVPbk5leHRSZXNpemUgPSB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIG1lc3NhZ2UgaGFuZGxlciBpbnZva2VkIG9uIGEgYCdyZXNpemUnYCBtZXNzYWdlLlxuICAgICAqL1xuICAgIG9uUmVzaXplKG1zZykge1xuICAgICAgICBpZiAoIXRoaXMuX2NoZWNrQ2FjaGVPbk5leHRSZXNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5vblJlc2l6ZShtc2cpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoZWNrQ2FjaGVPbk5leHRSZXNpemUgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgY2FjaGUgPSB0aGlzLl9jZWxsTGF5b3V0U3RhdGVDYWNoZTtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBwYXJzZUludCh0aGlzLm5vZGUuc3R5bGUud2lkdGgsIDEwKTtcbiAgICAgICAgaWYgKGNhY2hlKSB7XG4gICAgICAgICAgICBpZiAod2lkdGggPT09IGNhY2hlLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2FjaGUgaWRlbnRpY2FsLCBkbyBub3RoaW5nXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFVwZGF0ZSBjYWNoZVxuICAgICAgICB0aGlzLl9jZWxsTGF5b3V0U3RhdGVDYWNoZSA9IHsgd2lkdGggfTtcbiAgICAgICAgLy8gRmFsbGJhY2s6XG4gICAgICAgIGZvciAoY29uc3QgdyBvZiB0aGlzLndpZGdldHMpIHtcbiAgICAgICAgICAgIGlmICh3IGluc3RhbmNlb2YgQ2VsbCkge1xuICAgICAgICAgICAgICAgIHcuZWRpdG9yV2lkZ2V0LnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgbWVzc2FnZSBoYW5kbGVyIGludm9rZWQgb24gYW4gYCdiZWZvcmUtaGlkZSdgIG1lc3NhZ2UuXG4gICAgICovXG4gICAgb25CZWZvcmVIaWRlKG1zZykge1xuICAgICAgICAvLyBVcGRhdGUgY2FjaGVcbiAgICAgICAgY29uc3Qgd2lkdGggPSBwYXJzZUludCh0aGlzLm5vZGUuc3R5bGUud2lkdGgsIDEwKTtcbiAgICAgICAgdGhpcy5fY2VsbExheW91dFN0YXRlQ2FjaGUgPSB7IHdpZHRoIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgJ2FjdGl2YXRlLXJlcXVlc3QnYCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBvbkFjdGl2YXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgdGhpcy5fZW5zdXJlRm9jdXModHJ1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgdXBkYXRlLXJlcXVlc3RgIG1lc3NhZ2VzIHNlbnQgdG8gdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBvblVwZGF0ZVJlcXVlc3QobXNnKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUNlbGwgPSB0aGlzLmFjdGl2ZUNlbGw7XG4gICAgICAgIC8vIFNldCB0aGUgYXBwcm9wcmlhdGUgY2xhc3NlcyBvbiB0aGUgY2VsbHMuXG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdlZGl0Jykge1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcyhFRElUX0NMQVNTKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoQ09NTUFORF9DTEFTUyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKENPTU1BTkRfQ0xBU1MpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhFRElUX0NMQVNTKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgYWN0aXZlQ2VsbC5hZGRDbGFzcyhBQ1RJVkVfQ0xBU1MpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGVhY2godGhpcy53aWRnZXRzLCB3aWRnZXQgPT4ge1xuICAgICAgICAgICAgaWYgKHdpZGdldCAhPT0gYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgICAgIHdpZGdldC5yZW1vdmVDbGFzcyhBQ1RJVkVfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2lkZ2V0LnJlbW92ZUNsYXNzKE9USEVSX1NFTEVDVEVEX0NMQVNTKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0ZWRPckFjdGl2ZSh3aWRnZXQpKSB7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LmFkZENsYXNzKFNFTEVDVEVEX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LnJlbW92ZUNsYXNzKFNFTEVDVEVEX0NMQVNTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjb3VudCA+IDEpIHtcbiAgICAgICAgICAgIGFjdGl2ZUNlbGwgPT09IG51bGwgfHwgYWN0aXZlQ2VsbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYWN0aXZlQ2VsbC5hZGRDbGFzcyhPVEhFUl9TRUxFQ1RFRF9DTEFTUyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2ZyYWdtZW50KSB7XG4gICAgICAgICAgICBsZXQgZWw7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGVsID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IodGhpcy5fZnJhZ21lbnQuc3RhcnRzV2l0aCgnIycpXG4gICAgICAgICAgICAgICAgICAgID8gYCMke0NTUy5lc2NhcGUodGhpcy5fZnJhZ21lbnQuc2xpY2UoMSkpfWBcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLl9mcmFnbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VuYWJsZSB0byBzZXQgVVJJIGZyYWdtZW50IGlkZW50aWZpZXInLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgICAgICBlbC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZnJhZ21lbnQgPSAnJztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjZWxsIGJlaW5nIGluc2VydGVkLlxuICAgICAqL1xuICAgIG9uQ2VsbEluc2VydGVkKGluZGV4LCBjZWxsKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwubW9kZWxEQi5pc0NvbGxhYm9yYXRpdmUpIHtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsREIgPSB0aGlzLm1vZGVsLm1vZGVsREI7XG4gICAgICAgICAgICB2b2lkIG1vZGVsREIuY29ubmVjdGVkLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghY2VsbC5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldHVwIHRoZSBzZWxlY3Rpb24gc3R5bGUgZm9yIGNvbGxhYm9yYXRvcnMuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsQ29sbGFib3JhdG9yID0gbW9kZWxEQi5jb2xsYWJvcmF0b3JzLmxvY2FsQ29sbGFib3JhdG9yO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmVkaXRvci51dWlkID0gbG9jYWxDb2xsYWJvcmF0b3Iuc2Vzc2lvbklkO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmVkaXRvci5zZWxlY3Rpb25TdHlsZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgQ29kZUVkaXRvci5kZWZhdWx0U2VsZWN0aW9uU3R5bGUpLCB7IGNvbG9yOiBsb2NhbENvbGxhYm9yYXRvci5jb2xvciB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjZWxsLmVkaXRvci5lZGdlUmVxdWVzdGVkLmNvbm5lY3QodGhpcy5fb25FZGdlUmVxdWVzdCwgdGhpcyk7XG4gICAgICAgIC8vIElmIHRoZSBpbnNlcnRpb24gaGFwcGVuZWQgYWJvdmUsIGluY3JlbWVudCB0aGUgYWN0aXZlIGNlbGxcbiAgICAgICAgLy8gaW5kZXgsIG90aGVyd2lzZSBpdCBzdGF5cyB0aGUgc2FtZS5cbiAgICAgICAgdGhpcy5hY3RpdmVDZWxsSW5kZXggPVxuICAgICAgICAgICAgaW5kZXggPD0gdGhpcy5hY3RpdmVDZWxsSW5kZXhcbiAgICAgICAgICAgICAgICA/IHRoaXMuYWN0aXZlQ2VsbEluZGV4ICsgMVxuICAgICAgICAgICAgICAgIDogdGhpcy5hY3RpdmVDZWxsSW5kZXg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNlbGwgYmVpbmcgbW92ZWQuXG4gICAgICovXG4gICAgb25DZWxsTW92ZWQoZnJvbUluZGV4LCB0b0luZGV4KSB7XG4gICAgICAgIGNvbnN0IGkgPSB0aGlzLmFjdGl2ZUNlbGxJbmRleDtcbiAgICAgICAgaWYgKGZyb21JbmRleCA9PT0gaSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVDZWxsSW5kZXggPSB0b0luZGV4O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZyb21JbmRleCA8IGkgJiYgaSA8PSB0b0luZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUNlbGxJbmRleC0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRvSW5kZXggPD0gaSAmJiBpIDwgZnJvbUluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUNlbGxJbmRleCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNlbGwgYmVpbmcgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICBvbkNlbGxSZW1vdmVkKGluZGV4LCBjZWxsKSB7XG4gICAgICAgIC8vIElmIHRoZSByZW1vdmFsIGhhcHBlbmVkIGFib3ZlLCBkZWNyZW1lbnQgdGhlIGFjdGl2ZVxuICAgICAgICAvLyBjZWxsIGluZGV4LCBvdGhlcndpc2UgaXQgc3RheXMgdGhlIHNhbWUuXG4gICAgICAgIHRoaXMuYWN0aXZlQ2VsbEluZGV4ID1cbiAgICAgICAgICAgIGluZGV4IDw9IHRoaXMuYWN0aXZlQ2VsbEluZGV4XG4gICAgICAgICAgICAgICAgPyB0aGlzLmFjdGl2ZUNlbGxJbmRleCAtIDFcbiAgICAgICAgICAgICAgICA6IHRoaXMuYWN0aXZlQ2VsbEluZGV4O1xuICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGNlbGwpKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25DaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBuZXcgbW9kZWwuXG4gICAgICovXG4gICAgb25Nb2RlbENoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgIHN1cGVyLm9uTW9kZWxDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgIC8vIFRyeSB0byBzZXQgdGhlIGFjdGl2ZSBjZWxsIGluZGV4IHRvIDAuXG4gICAgICAgIC8vIEl0IHdpbGwgYmUgc2V0IHRvIGAtMWAgaWYgdGhlcmUgaXMgbm8gbmV3IG1vZGVsIG9yIHRoZSBtb2RlbCBpcyBlbXB0eS5cbiAgICAgICAgdGhpcy5hY3RpdmVDZWxsSW5kZXggPSAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZWRnZSByZXF1ZXN0IHNpZ25hbHMgZnJvbSBjZWxscy5cbiAgICAgKi9cbiAgICBfb25FZGdlUmVxdWVzdChlZGl0b3IsIGxvY2F0aW9uKSB7XG4gICAgICAgIGNvbnN0IHByZXYgPSB0aGlzLmFjdGl2ZUNlbGxJbmRleDtcbiAgICAgICAgaWYgKGxvY2F0aW9uID09PSAndG9wJykge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVDZWxsSW5kZXgtLTtcbiAgICAgICAgICAgIC8vIE1vdmUgdGhlIGN1cnNvciB0byB0aGUgZmlyc3QgcG9zaXRpb24gb24gdGhlIGxhc3QgbGluZS5cbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUNlbGxJbmRleCA8IHByZXYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0b3IgPSB0aGlzLmFjdGl2ZUNlbGwuZWRpdG9yO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RMaW5lID0gZWRpdG9yLmxpbmVDb3VudCAtIDE7XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNldEN1cnNvclBvc2l0aW9uKHsgbGluZTogbGFzdExpbmUsIGNvbHVtbjogMCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsb2NhdGlvbiA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQ2VsbEluZGV4Kys7XG4gICAgICAgICAgICAvLyBNb3ZlIHRoZSBjdXJzb3IgdG8gdGhlIGZpcnN0IGNoYXJhY3Rlci5cbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUNlbGxJbmRleCA+IHByZXYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0b3IgPSB0aGlzLmFjdGl2ZUNlbGwuZWRpdG9yO1xuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRDdXJzb3JQb3NpdGlvbih7IGxpbmU6IDAsIGNvbHVtbjogMCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGUgPSAnZWRpdCc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVuc3VyZSB0aGF0IHRoZSBub3RlYm9vayBoYXMgcHJvcGVyIGZvY3VzLlxuICAgICAqL1xuICAgIF9lbnN1cmVGb2N1cyhmb3JjZSA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUNlbGwgPSB0aGlzLmFjdGl2ZUNlbGw7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdlZGl0JyAmJiBhY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICBpZiAoIWFjdGl2ZUNlbGwuZWRpdG9yLmhhc0ZvY3VzKCkpIHtcbiAgICAgICAgICAgICAgICBhY3RpdmVDZWxsLmVkaXRvci5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChmb3JjZSAmJiAhdGhpcy5ub2RlLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kIHRoZSBjZWxsIGluZGV4IGNvbnRhaW5pbmcgdGhlIHRhcmdldCBodG1sIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogUmV0dXJucyAtMSBpZiB0aGUgY2VsbCBpcyBub3QgZm91bmQuXG4gICAgICovXG4gICAgX2ZpbmRDZWxsKG5vZGUpIHtcbiAgICAgICAgLy8gVHJhY2UgdXAgdGhlIERPTSBoaWVyYXJjaHkgdG8gZmluZCB0aGUgcm9vdCBjZWxsIG5vZGUuXG4gICAgICAgIC8vIFRoZW4gZmluZCB0aGUgY29ycmVzcG9uZGluZyBjaGlsZCBhbmQgc2VsZWN0IGl0LlxuICAgICAgICBsZXQgbiA9IG5vZGU7XG4gICAgICAgIHdoaWxlIChuICYmIG4gIT09IHRoaXMubm9kZSkge1xuICAgICAgICAgICAgaWYgKG4uY2xhc3NMaXN0LmNvbnRhaW5zKE5CX0NFTExfQ0xBU1MpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaSA9IEFycmF5RXh0LmZpbmRGaXJzdEluZGV4KHRoaXMud2lkZ2V0cywgd2lkZ2V0ID0+IHdpZGdldC5ub2RlID09PSBuKTtcbiAgICAgICAgICAgICAgICBpZiAoaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbiA9IG4ucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmQgdGhlIHRhcmdldCBvZiBodG1sIG1vdXNlIGV2ZW50IGFuZCBjZWxsIGluZGV4IGNvbnRhaW5pbmcgdGhpcyB0YXJnZXQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogUmV0dXJuZWQgaW5kZXggaXMgLTEgaWYgdGhlIGNlbGwgaXMgbm90IGZvdW5kLlxuICAgICAqL1xuICAgIF9maW5kRXZlbnRUYXJnZXRBbmRDZWxsKGV2ZW50KSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuX2ZpbmRDZWxsKHRhcmdldCk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIGBldmVudC50YXJnZXRgIHNvbWV0aW1lcyBnaXZlcyBhbiBvcnBoYW5lZCBub2RlIGluIEZpcmVmb3ggNTcsIHdoaWNoXG4gICAgICAgICAgICAvLyBjYW4gaGF2ZSBgbnVsbGAgYW55d2hlcmUgaW4gaXRzIHBhcmVudCBsaW5lLiBJZiB3ZSBmYWlsIHRvIGZpbmQgYSBjZWxsXG4gICAgICAgICAgICAvLyB1c2luZyBgZXZlbnQudGFyZ2V0YCwgdHJ5IGFnYWluIHVzaW5nIGEgdGFyZ2V0IHJlY29uc3RydWN0ZWQgZnJvbSB0aGVcbiAgICAgICAgICAgIC8vIHBvc2l0aW9uIG9mIHRoZSBjbGljayBldmVudC5cbiAgICAgICAgICAgIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuX2ZpbmRDZWxsKHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt0YXJnZXQsIGluZGV4XTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGBjb250ZXh0bWVudWAgZXZlbnQuXG4gICAgICovXG4gICAgX2V2dENvbnRleHRNZW51Q2FwdHVyZShldmVudCkge1xuICAgICAgICAvLyBBbGxvdyB0aGUgZXZlbnQgdG8gcHJvcGFnYXRlIHVuLW1vZGlmaWVkIGlmIHRoZSB1c2VyXG4gICAgICAgIC8vIGlzIGhvbGRpbmcgdGhlIHNoaWZ0LWtleSAoYW5kIHByb2JhYmx5IHJlcXVlc3RpbmdcbiAgICAgICAgLy8gdGhlIG5hdGl2ZSBjb250ZXh0IG1lbnUpLlxuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbdGFyZ2V0LCBpbmRleF0gPSB0aGlzLl9maW5kRXZlbnRUYXJnZXRBbmRDZWxsKGV2ZW50KTtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdGhpcy53aWRnZXRzW2luZGV4XTtcbiAgICAgICAgaWYgKHdpZGdldCAmJiB3aWRnZXQuZWRpdG9yV2lkZ2V0Lm5vZGUuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgLy8gUHJldmVudCBDb2RlTWlycm9yIGZyb20gZm9jdXNpbmcgdGhlIGVkaXRvci5cbiAgICAgICAgICAgIC8vIFRPRE86IGZpbmQgYW4gZWRpdG9yLWFnbm9zdGljIHNvbHV0aW9uLlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYG1vdXNlZG93bmAgZXZlbnQgaW4gdGhlIGNhcHR1cmUgcGhhc2UgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgX2V2dE1vdXNlRG93bkNhcHR1cmUoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgeyBidXR0b24sIHNoaWZ0S2V5IH0gPSBldmVudDtcbiAgICAgICAgY29uc3QgW3RhcmdldCwgaW5kZXhdID0gdGhpcy5fZmluZEV2ZW50VGFyZ2V0QW5kQ2VsbChldmVudCk7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IHRoaXMud2lkZ2V0c1tpbmRleF07XG4gICAgICAgIC8vIE9uIE9TIFgsIHRoZSBjb250ZXh0IG1lbnUgbWF5IGJlIHRyaWdnZXJlZCB3aXRoIGN0cmwtbGVmdC1jbGljay4gSW5cbiAgICAgICAgLy8gRmlyZWZveCwgY3RybC1sZWZ0LWNsaWNrIGdpdmVzIGFuIGV2ZW50IHdpdGggYnV0dG9uIDIsIGJ1dCBpbiBDaHJvbWUsXG4gICAgICAgIC8vIGN0cmwtbGVmdC1jbGljayBnaXZlcyBhbiBldmVudCB3aXRoIGJ1dHRvbiAwIHdpdGggdGhlIGN0cmwgbW9kaWZpZXIuXG4gICAgICAgIGlmIChidXR0b24gPT09IDIgJiZcbiAgICAgICAgICAgICFzaGlmdEtleSAmJlxuICAgICAgICAgICAgd2lkZ2V0ICYmXG4gICAgICAgICAgICB3aWRnZXQuZWRpdG9yV2lkZ2V0Lm5vZGUuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5tb2RlID0gJ2NvbW1hbmQnO1xuICAgICAgICAgICAgLy8gUHJldmVudCBDb2RlTWlycm9yIGZyb20gZm9jdXNpbmcgdGhlIGVkaXRvci5cbiAgICAgICAgICAgIC8vIFRPRE86IGZpbmQgYW4gZWRpdG9yLWFnbm9zdGljIHNvbHV0aW9uLlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYG1vdXNlZG93bmAgZXZlbnRzIGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIF9ldnRNb3VzZURvd24oZXZlbnQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCB7IGJ1dHRvbiwgc2hpZnRLZXkgfSA9IGV2ZW50O1xuICAgICAgICAvLyBXZSBvbmx5IGhhbmRsZSBtYWluIG9yIHNlY29uZGFyeSBidXR0b24gYWN0aW9ucy5cbiAgICAgICAgaWYgKCEoYnV0dG9uID09PSAwIHx8IGJ1dHRvbiA9PT0gMikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBTaGlmdCByaWdodC1jbGljayBnaXZlcyB0aGUgYnJvd3NlciBkZWZhdWx0IGJlaGF2aW9yLlxuICAgICAgICBpZiAoc2hpZnRLZXkgJiYgYnV0dG9uID09PSAyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgW3RhcmdldCwgaW5kZXhdID0gdGhpcy5fZmluZEV2ZW50VGFyZ2V0QW5kQ2VsbChldmVudCk7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IHRoaXMud2lkZ2V0c1tpbmRleF07XG4gICAgICAgIGxldCB0YXJnZXRBcmVhO1xuICAgICAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgICAgICBpZiAod2lkZ2V0LmVkaXRvcldpZGdldC5ub2RlLmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRBcmVhID0gJ2lucHV0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHdpZGdldC5wcm9tcHROb2RlLmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRBcmVhID0gJ3Byb21wdCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRBcmVhID0gJ2NlbGwnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0QXJlYSA9ICdub3RlYm9vayc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGdvIHRvIGNvbW1hbmQgbW9kZSBpZiB0aGUgY2xpY2sgaXNuJ3QgaW4gdGhlIGNlbGwgZWRpdG9yIElmXG4gICAgICAgIC8vIHdlIGRvIGNsaWNrIGluIHRoZSBjZWxsIGVkaXRvciwgdGhlIGVkaXRvciBoYW5kbGVzIHRoZSBmb2N1cyBldmVudCB0b1xuICAgICAgICAvLyBzd2l0Y2ggdG8gZWRpdCBtb2RlLlxuICAgICAgICBpZiAodGFyZ2V0QXJlYSAhPT0gJ2lucHV0Jykge1xuICAgICAgICAgICAgdGhpcy5tb2RlID0gJ2NvbW1hbmQnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YXJnZXRBcmVhID09PSAnbm90ZWJvb2snKSB7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGFyZ2V0QXJlYSA9PT0gJ3Byb21wdCcgfHwgdGFyZ2V0QXJlYSA9PT0gJ2NlbGwnKSB7XG4gICAgICAgICAgICAvLyBXZSBkb24ndCB3YW50IHRvIHByZXZlbnQgdGhlIGRlZmF1bHQgc2VsZWN0aW9uIGJlaGF2aW9yXG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBjdXJyZW50bHkgdGV4dCBzZWxlY3RlZCBpbiBhbiBvdXRwdXQuXG4gICAgICAgICAgICBjb25zdCBoYXNTZWxlY3Rpb24gPSAoKF9hID0gd2luZG93LmdldFNlbGVjdGlvbigpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJykudG9TdHJpbmcoKSAhPT0gJyc7XG4gICAgICAgICAgICBpZiAoYnV0dG9uID09PSAwICYmIHNoaWZ0S2V5ICYmICFoYXNTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IGJyb3dzZXIgc2VsZWN0aW5nIHRleHQgaW4gcHJvbXB0IG9yIG91dHB1dFxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgLy8gU2hpZnQtY2xpY2sgLSBleHRlbmQgc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHRlbmRDb250aWd1b3VzU2VsZWN0aW9uVG8oaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gRW50ZXIgc2VsZWN0aW5nIG1vZGVcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZU1vZGUgPSAnc2VsZWN0JztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24gPT09IDAgJiYgIXNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgLy8gUHJlcGFyZSB0byBzdGFydCBhIGRyYWcgaWYgd2UgYXJlIG9uIHRoZSBkcmFnIHJlZ2lvbi5cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0QXJlYSA9PT0gJ3Byb21wdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJlcGFyZSBmb3IgYSBkcmFnIHN0YXJ0XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RyYWdEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJlc3NYOiBldmVudC5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlc3NZOiBldmVudC5jbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIC8vIEVudGVyIHBvc3NpYmxlIGRyYWcgbW9kZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZU1vZGUgPSAnY291bGREcmFnJztcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2VsZWN0ZWRPckFjdGl2ZSh3aWRnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVDZWxsSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChidXR0b24gPT09IDIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZE9yQWN0aXZlKHdpZGdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUNlbGxJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRhcmdldEFyZWEgPT09ICdpbnB1dCcpIHtcbiAgICAgICAgICAgIGlmIChidXR0b24gPT09IDIgJiYgIXRoaXMuaXNTZWxlY3RlZE9yQWN0aXZlKHdpZGdldCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVDZWxsSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB3ZSBkaWRuJ3Qgc2V0IGZvY3VzIGFib3ZlLCBtYWtlIHN1cmUgd2UgZ2V0IGZvY3VzIG5vdy5cbiAgICAgICAgdGhpcy5fZW5zdXJlRm9jdXModHJ1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgYCdtb3VzZXVwJ2AgZXZlbnQgb24gdGhlIGRvY3VtZW50LlxuICAgICAqL1xuICAgIF9ldnREb2N1bWVudE1vdXNldXAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXJzIHdlIHB1dCBvbiB0aGUgZG9jdW1lbnRcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcywgdHJ1ZSk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuX21vdXNlTW9kZSA9PT0gJ2NvdWxkRHJhZycpIHtcbiAgICAgICAgICAgIC8vIFdlIGRpZG4ndCBlbmQgdXAgZHJhZ2dpbmcgaWYgd2UgYXJlIGhlcmUsIHNvIHRyZWF0IGl0IGFzIGEgY2xpY2sgZXZlbnQuXG4gICAgICAgICAgICBjb25zdCBbLCBpbmRleF0gPSB0aGlzLl9maW5kRXZlbnRUYXJnZXRBbmRDZWxsKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQ2VsbEluZGV4ID0gaW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbW91c2VNb2RlID0gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBgJ21vdXNlbW92ZSdgIGV2ZW50IGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIF9ldnREb2N1bWVudE1vdXNlbW92ZShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgLy8gSWYgaW4gc2VsZWN0IG1vZGUsIHVwZGF0ZSB0aGUgc2VsZWN0aW9uXG4gICAgICAgIHN3aXRjaCAodGhpcy5fbW91c2VNb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZmluZENlbGwodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXh0ZW5kQ29udGlndW91c1NlbGVjdGlvblRvKGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdjb3VsZERyYWcnOiB7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGEgZHJhZyBpbml0aWFsaXphdGlvbi5cbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5fZHJhZ0RhdGE7XG4gICAgICAgICAgICAgICAgY29uc3QgZHggPSBNYXRoLmFicyhldmVudC5jbGllbnRYIC0gZGF0YS5wcmVzc1gpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGR5ID0gTWF0aC5hYnMoZXZlbnQuY2xpZW50WSAtIGRhdGEucHJlc3NZKTtcbiAgICAgICAgICAgICAgICBpZiAoZHggPj0gRFJBR19USFJFU0hPTEQgfHwgZHkgPj0gRFJBR19USFJFU0hPTEQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW91c2VNb2RlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhcnREcmFnKGRhdGEuaW5kZXgsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBgJ2xtLWRyYWdlbnRlcidgIGV2ZW50IGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIF9ldnREcmFnRW50ZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudC5taW1lRGF0YS5oYXNEYXRhKEpVUFlURVJfQ0VMTF9NSU1FKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZmluZENlbGwodGFyZ2V0KTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IHRoaXMubGF5b3V0LndpZGdldHNbaW5kZXhdO1xuICAgICAgICB3aWRnZXQubm9kZS5jbGFzc0xpc3QuYWRkKERST1BfVEFSR0VUX0NMQVNTKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBgJ2xtLWRyYWdsZWF2ZSdgIGV2ZW50IGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIF9ldnREcmFnTGVhdmUoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudC5taW1lRGF0YS5oYXNEYXRhKEpVUFlURVJfQ0VMTF9NSU1FKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCBlbGVtZW50cyA9IHRoaXMubm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKERST1BfVEFSR0VUX0NMQVNTKTtcbiAgICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbWVudHNbMF0uY2xhc3NMaXN0LnJlbW92ZShEUk9QX1RBUkdFVF9DTEFTUyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBgJ2xtLWRyYWdvdmVyJ2AgZXZlbnQgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgX2V2dERyYWdPdmVyKGV2ZW50KSB7XG4gICAgICAgIGlmICghZXZlbnQubWltZURhdGEuaGFzRGF0YShKVVBZVEVSX0NFTExfTUlNRSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQuZHJvcEFjdGlvbiA9IGV2ZW50LnByb3Bvc2VkQWN0aW9uO1xuICAgICAgICBjb25zdCBlbGVtZW50cyA9IHRoaXMubm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKERST1BfVEFSR0VUX0NMQVNTKTtcbiAgICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbWVudHNbMF0uY2xhc3NMaXN0LnJlbW92ZShEUk9QX1RBUkdFVF9DTEFTUyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2ZpbmRDZWxsKHRhcmdldCk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB3aWRnZXQgPSB0aGlzLmxheW91dC53aWRnZXRzW2luZGV4XTtcbiAgICAgICAgd2lkZ2V0Lm5vZGUuY2xhc3NMaXN0LmFkZChEUk9QX1RBUkdFVF9DTEFTUyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgYCdsbS1kcm9wJ2AgZXZlbnQgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgX2V2dERyb3AoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudC5taW1lRGF0YS5oYXNEYXRhKEpVUFlURVJfQ0VMTF9NSU1FKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAoZXZlbnQucHJvcG9zZWRBY3Rpb24gPT09ICdub25lJykge1xuICAgICAgICAgICAgZXZlbnQuZHJvcEFjdGlvbiA9ICdub25lJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICB3aGlsZSAodGFyZ2V0ICYmIHRhcmdldC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhEUk9QX1RBUkdFVF9DTEFTUykpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShEUk9QX1RBUkdFVF9DTEFTUyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICAvLyBNb2RlbCBwcmVzZW5jZSBzaG91bGQgYmUgY2hlY2tlZCBiZWZvcmUgY2FsbGluZyBldmVudCBoYW5kbGVyc1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWw7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IGV2ZW50LnNvdXJjZTtcbiAgICAgICAgaWYgKHNvdXJjZSA9PT0gdGhpcykge1xuICAgICAgICAgICAgLy8gSGFuZGxlIHRoZSBjYXNlIHdoZXJlIHdlIGFyZSBtb3ZpbmcgY2VsbHMgd2l0aGluXG4gICAgICAgICAgICAvLyB0aGUgc2FtZSBub3RlYm9vay5cbiAgICAgICAgICAgIGV2ZW50LmRyb3BBY3Rpb24gPSAnbW92ZSc7XG4gICAgICAgICAgICBjb25zdCB0b01vdmUgPSBldmVudC5taW1lRGF0YS5nZXREYXRhKCdpbnRlcm5hbDpjZWxscycpO1xuICAgICAgICAgICAgLy8gRm9yIGNvbGxhcHNlZCBtYXJrZG93biBoZWFkaW5ncyB3aXRoIGhpZGRlbiBcImNoaWxkXCIgY2VsbHMsIG1vdmUgYWxsXG4gICAgICAgICAgICAvLyBjaGlsZCBjZWxscyBhcyB3ZWxsIGFzIHRoZSBtYXJrZG93biBoZWFkaW5nLlxuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRvTW92ZVt0b01vdmUubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZiAoY2VsbCBpbnN0YW5jZW9mIE1hcmtkb3duQ2VsbCAmJiBjZWxsLmhlYWRpbmdDb2xsYXBzZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0UGFyZW50ID0gTm90ZWJvb2tBY3Rpb25zLmZpbmROZXh0UGFyZW50SGVhZGluZyhjZWxsLCBzb3VyY2UpO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0UGFyZW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGZpbmRJbmRleChzb3VyY2Uud2lkZ2V0cywgKHBvc3NpYmxlQ2VsbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNlbGwubW9kZWwuaWQgPT09IHBvc3NpYmxlQ2VsbC5tb2RlbC5pZDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRvTW92ZS5wdXNoKC4uLnNvdXJjZS53aWRnZXRzLnNsaWNlKGluZGV4ICsgMSwgbmV4dFBhcmVudCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENvbXB1dGUgdGhlIHRvL2Zyb20gaW5kaWNlcyBmb3IgdGhlIG1vdmUuXG4gICAgICAgICAgICBsZXQgZnJvbUluZGV4ID0gQXJyYXlFeHQuZmlyc3RJbmRleE9mKHRoaXMud2lkZ2V0cywgdG9Nb3ZlWzBdKTtcbiAgICAgICAgICAgIGxldCB0b0luZGV4ID0gdGhpcy5fZmluZENlbGwodGFyZ2V0KTtcbiAgICAgICAgICAgIC8vIFRoaXMgY2hlY2sgaXMgbmVlZGVkIGZvciBjb25zaXN0ZW5jeSB3aXRoIHRoZSB2aWV3LlxuICAgICAgICAgICAgaWYgKHRvSW5kZXggIT09IC0xICYmIHRvSW5kZXggPiBmcm9tSW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0b0luZGV4IC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0b0luZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBkcm9wIGlzIHdpdGhpbiB0aGUgbm90ZWJvb2sgYnV0IG5vdCBvbiBhbnkgY2VsbCxcbiAgICAgICAgICAgICAgICAvLyBtb3N0IG9mdGVuIHRoaXMgbWVhbnMgaXQgaXMgcGFzdCB0aGUgY2VsbCBhcmVhcywgc29cbiAgICAgICAgICAgICAgICAvLyBzZXQgaXQgdG8gbW92ZSB0aGUgY2VsbHMgdG8gdGhlIGVuZCBvZiB0aGUgbm90ZWJvb2suXG4gICAgICAgICAgICAgICAgdG9JbmRleCA9IHRoaXMud2lkZ2V0cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRG9uJ3QgbW92ZSBpZiB3ZSBhcmUgd2l0aGluIHRoZSBibG9jayBvZiBzZWxlY3RlZCBjZWxscy5cbiAgICAgICAgICAgIGlmICh0b0luZGV4ID49IGZyb21JbmRleCAmJiB0b0luZGV4IDwgZnJvbUluZGV4ICsgdG9Nb3ZlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE1vdmUgdGhlIGNlbGxzIG9uZSBieSBvbmVcbiAgICAgICAgICAgIG1vZGVsLmNlbGxzLmJlZ2luQ29tcG91bmRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgIGlmIChmcm9tSW5kZXggPCB0b0luZGV4KSB7XG4gICAgICAgICAgICAgICAgZWFjaCh0b01vdmUsIGNlbGxXaWRnZXQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5jZWxscy5tb3ZlKGZyb21JbmRleCwgdG9JbmRleCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChmcm9tSW5kZXggPiB0b0luZGV4KSB7XG4gICAgICAgICAgICAgICAgZWFjaCh0b01vdmUsIGNlbGxXaWRnZXQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5jZWxscy5tb3ZlKGZyb21JbmRleCsrLCB0b0luZGV4KyspO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbW9kZWwuY2VsbHMuZW5kQ29tcG91bmRPcGVyYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgY2FzZSB3aGVyZSB3ZSBhcmUgY29weWluZyBjZWxscyBiZXR3ZWVuXG4gICAgICAgICAgICAvLyBub3RlYm9va3MuXG4gICAgICAgICAgICBldmVudC5kcm9wQWN0aW9uID0gJ2NvcHknO1xuICAgICAgICAgICAgLy8gRmluZCB0aGUgdGFyZ2V0IGNlbGwgYW5kIGluc2VydCB0aGUgY29waWVkIGNlbGxzLlxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fZmluZENlbGwodGFyZ2V0KTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IHRoaXMud2lkZ2V0cy5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGluZGV4O1xuICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gZXZlbnQubWltZURhdGEuZ2V0RGF0YShKVVBZVEVSX0NFTExfTUlNRSk7XG4gICAgICAgICAgICBjb25zdCBmYWN0b3J5ID0gbW9kZWwuY29udGVudEZhY3Rvcnk7XG4gICAgICAgICAgICAvLyBJbnNlcnQgdGhlIGNvcGllcyBvZiB0aGUgb3JpZ2luYWwgY2VsbHMuXG4gICAgICAgICAgICBtb2RlbC5jZWxscy5iZWdpbkNvbXBvdW5kT3BlcmF0aW9uKCk7XG4gICAgICAgICAgICBlYWNoKHZhbHVlcywgKGNlbGwpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjZWxsLmNlbGxfdHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjb2RlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZmFjdG9yeS5jcmVhdGVDb2RlQ2VsbCh7IGNlbGwgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWFya2Rvd24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBmYWN0b3J5LmNyZWF0ZU1hcmtkb3duQ2VsbCh7IGNlbGwgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZmFjdG9yeS5jcmVhdGVSYXdDZWxsKHsgY2VsbCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtb2RlbC5jZWxscy5pbnNlcnQoaW5kZXgrKywgdmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtb2RlbC5jZWxscy5lbmRDb21wb3VuZE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgLy8gU2VsZWN0IHRoZSBpbnNlcnRlZCBjZWxscy5cbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQ2VsbEluZGV4ID0gc3RhcnQ7XG4gICAgICAgICAgICB0aGlzLmV4dGVuZENvbnRpZ3VvdXNTZWxlY3Rpb25UbyhpbmRleCAtIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0IGEgZHJhZyBldmVudC5cbiAgICAgKi9cbiAgICBfc3RhcnREcmFnKGluZGV4LCBjbGllbnRYLCBjbGllbnRZKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgY2VsbHMgPSB0aGlzLm1vZGVsLmNlbGxzO1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IFtdO1xuICAgICAgICBjb25zdCB0b01vdmUgPSBbXTtcbiAgICAgICAgZWFjaCh0aGlzLndpZGdldHMsICh3aWRnZXQsIGkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBjZWxscy5nZXQoaSk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkT3JBY3RpdmUod2lkZ2V0KSkge1xuICAgICAgICAgICAgICAgIHdpZGdldC5hZGRDbGFzcyhEUk9QX1NPVVJDRV9DTEFTUyk7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQucHVzaChjZWxsLnRvSlNPTigpKTtcbiAgICAgICAgICAgICAgICB0b01vdmUucHVzaCh3aWRnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgYWN0aXZlQ2VsbCA9IHRoaXMuYWN0aXZlQ2VsbDtcbiAgICAgICAgbGV0IGRyYWdJbWFnZSA9IG51bGw7XG4gICAgICAgIGxldCBjb3VudFN0cmluZztcbiAgICAgICAgaWYgKChhY3RpdmVDZWxsID09PSBudWxsIHx8IGFjdGl2ZUNlbGwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFjdGl2ZUNlbGwubW9kZWwudHlwZSkgPT09ICdjb2RlJykge1xuICAgICAgICAgICAgY29uc3QgZXhlY3V0aW9uQ291bnQgPSBhY3RpdmVDZWxsLm1vZGVsXG4gICAgICAgICAgICAgICAgLmV4ZWN1dGlvbkNvdW50O1xuICAgICAgICAgICAgY291bnRTdHJpbmcgPSAnICc7XG4gICAgICAgICAgICBpZiAoZXhlY3V0aW9uQ291bnQpIHtcbiAgICAgICAgICAgICAgICBjb3VudFN0cmluZyA9IGV4ZWN1dGlvbkNvdW50LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb3VudFN0cmluZyA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgZHJhZyBpbWFnZS5cbiAgICAgICAgZHJhZ0ltYWdlID0gUHJpdmF0ZS5jcmVhdGVEcmFnSW1hZ2Uoc2VsZWN0ZWQubGVuZ3RoLCBjb3VudFN0cmluZywgKF9hID0gYWN0aXZlQ2VsbCA9PT0gbnVsbCB8fCBhY3RpdmVDZWxsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhY3RpdmVDZWxsLm1vZGVsLnZhbHVlLnRleHQuc3BsaXQoJ1xcbicpWzBdLnNsaWNlKDAsIDI2KSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJycpO1xuICAgICAgICAvLyBTZXQgdXAgdGhlIGRyYWcgZXZlbnQuXG4gICAgICAgIHRoaXMuX2RyYWcgPSBuZXcgRHJhZyh7XG4gICAgICAgICAgICBtaW1lRGF0YTogbmV3IE1pbWVEYXRhKCksXG4gICAgICAgICAgICBkcmFnSW1hZ2UsXG4gICAgICAgICAgICBzdXBwb3J0ZWRBY3Rpb25zOiAnY29weS1tb3ZlJyxcbiAgICAgICAgICAgIHByb3Bvc2VkQWN0aW9uOiAnY29weScsXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXNcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2RyYWcubWltZURhdGEuc2V0RGF0YShKVVBZVEVSX0NFTExfTUlNRSwgc2VsZWN0ZWQpO1xuICAgICAgICAvLyBBZGQgbWltZURhdGEgZm9yIHRoZSBmdWxseSByZWlmaWVkIGNlbGwgd2lkZ2V0cywgZm9yIHRoZVxuICAgICAgICAvLyBjYXNlIHdoZXJlIHRoZSB0YXJnZXQgaXMgaW4gdGhlIHNhbWUgbm90ZWJvb2sgYW5kIHdlXG4gICAgICAgIC8vIGNhbiBqdXN0IG1vdmUgdGhlIGNlbGxzLlxuICAgICAgICB0aGlzLl9kcmFnLm1pbWVEYXRhLnNldERhdGEoJ2ludGVybmFsOmNlbGxzJywgdG9Nb3ZlKTtcbiAgICAgICAgLy8gQWRkIG1pbWVEYXRhIGZvciB0aGUgdGV4dCBjb250ZW50IG9mIHRoZSBzZWxlY3RlZCBjZWxscyxcbiAgICAgICAgLy8gYWxsb3dpbmcgZm9yIGRyYWcvZHJvcCBpbnRvIHBsYWluIHRleHQgZmllbGRzLlxuICAgICAgICBjb25zdCB0ZXh0Q29udGVudCA9IHRvTW92ZS5tYXAoY2VsbCA9PiBjZWxsLm1vZGVsLnZhbHVlLnRleHQpLmpvaW4oJ1xcbicpO1xuICAgICAgICB0aGlzLl9kcmFnLm1pbWVEYXRhLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0ZXh0Q29udGVudCk7XG4gICAgICAgIC8vIFJlbW92ZSBtb3VzZW1vdmUgYW5kIG1vdXNldXAgbGlzdGVuZXJzIGFuZCBzdGFydCB0aGUgZHJhZy5cbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcywgdHJ1ZSk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fbW91c2VNb2RlID0gbnVsbDtcbiAgICAgICAgdm9pZCB0aGlzLl9kcmFnLnN0YXJ0KGNsaWVudFgsIGNsaWVudFkpLnRoZW4oYWN0aW9uID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9kcmFnID0gbnVsbDtcbiAgICAgICAgICAgIGVhY2godG9Nb3ZlLCB3aWRnZXQgPT4ge1xuICAgICAgICAgICAgICAgIHdpZGdldC5yZW1vdmVDbGFzcyhEUk9QX1NPVVJDRV9DTEFTUyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgZm9jdXNgIGV2ZW50cyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBfZXZ0Rm9jdXNJbihldmVudCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZmluZENlbGwodGFyZ2V0KTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdGhpcy53aWRnZXRzW2luZGV4XTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBlZGl0b3IgaXRzZWxmIGRvZXMgbm90IGhhdmUgZm9jdXMsIGVuc3VyZSBjb21tYW5kIG1vZGUuXG4gICAgICAgICAgICBpZiAoIXdpZGdldC5lZGl0b3JXaWRnZXQubm9kZS5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlID0gJ2NvbW1hbmQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hY3RpdmVDZWxsSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIC8vIElmIHRoZSBlZGl0b3IgaGFzIGZvY3VzLCBlbnN1cmUgZWRpdCBtb2RlLlxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHdpZGdldC5lZGl0b3JXaWRnZXQubm9kZTtcbiAgICAgICAgICAgIGlmIChub2RlLmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGUgPSAnZWRpdCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUNlbGxJbmRleCA9IGluZGV4O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gTm8gY2VsbCBoYXMgZm9jdXMsIGVuc3VyZSBjb21tYW5kIG1vZGUuXG4gICAgICAgICAgICB0aGlzLm1vZGUgPSAnY29tbWFuZCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGBmb2N1c291dGAgZXZlbnRzIGZvciB0aGUgbm90ZWJvb2suXG4gICAgICovXG4gICAgX2V2dEZvY3VzT3V0KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHJlbGF0ZWRUYXJnZXQgPSBldmVudC5yZWxhdGVkVGFyZ2V0O1xuICAgICAgICAvLyBCYWlsIGlmIHRoZSB3aW5kb3cgaXMgbG9zaW5nIGZvY3VzLCB0byBwcmVzZXJ2ZSBlZGl0IG1vZGUuIFRoaXMgdGVzdFxuICAgICAgICAvLyBhc3N1bWVzIHRoYXQgd2UgZXhwbGljaXRseSBmb2N1cyB0aGluZ3MgcmF0aGVyIHRoYW4gY2FsbGluZyBibHVyKClcbiAgICAgICAgaWYgKCFyZWxhdGVkVGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gQmFpbCBpZiB0aGUgaXRlbSBnYWluaW5nIGZvY3VzIGlzIGFub3RoZXIgY2VsbCxcbiAgICAgICAgLy8gYW5kIHdlIHNob3VsZCBub3QgYmUgZW50ZXJpbmcgY29tbWFuZCBtb2RlLlxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2ZpbmRDZWxsKHJlbGF0ZWRUYXJnZXQpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXQgPSB0aGlzLndpZGdldHNbaW5kZXhdO1xuICAgICAgICAgICAgaWYgKHdpZGdldC5lZGl0b3JXaWRnZXQubm9kZS5jb250YWlucyhyZWxhdGVkVGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBPdGhlcndpc2UgZW50ZXIgY29tbWFuZCBtb2RlIGlmIG5vdCBhbHJlYWR5LlxuICAgICAgICBpZiAodGhpcy5tb2RlICE9PSAnY29tbWFuZCcpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZSA9ICdjb21tYW5kJztcbiAgICAgICAgICAgIC8vIFN3aXRjaGluZyB0byBjb21tYW5kIG1vZGUgY3VycmVudGx5IGZvY3VzZXMgdGhlIG5vdGVib29rIGVsZW1lbnQsIHNvXG4gICAgICAgICAgICAvLyByZWZvY3VzIHRoZSByZWxhdGVkVGFyZ2V0IHNvIHRoZSBmb2N1cyBhY3R1YWxseSBzd2l0Y2hlcyBhcyBpbnRlbmRlZC5cbiAgICAgICAgICAgIGlmIChyZWxhdGVkVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmVsYXRlZFRhcmdldC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgZGJsY2xpY2tgIGV2ZW50cyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBfZXZ0RGJsQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsO1xuICAgICAgICBpZiAoIW1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgICAgICBjb25zdCBbdGFyZ2V0LCBpbmRleF0gPSB0aGlzLl9maW5kRXZlbnRUYXJnZXRBbmRDZWxsKGV2ZW50KTtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoSEVBRElOR19DT0xMQVBTRVJfQ0xBU1MpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWN0aXZlQ2VsbEluZGV4ID0gaW5kZXg7XG4gICAgICAgIGlmIChtb2RlbC5jZWxscy5nZXQoaW5kZXgpLnR5cGUgPT09ICdtYXJrZG93bicpIHtcbiAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IHRoaXMud2lkZ2V0c1tpbmRleF07XG4gICAgICAgICAgICB3aWRnZXQucmVuZGVyZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0YXJnZXQubG9jYWxOYW1lID09PSAnaW1nJykge1xuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoVU5DT05GSU5FRF9DTEFTUyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHNlbGVjdGlvbnMgZnJvbSBpbmFjdGl2ZSBjZWxscyB0byBhdm9pZFxuICAgICAqIHNwdXJpb3VzIGN1cnNvcnMuXG4gICAgICovXG4gICAgX3RyaW1TZWxlY3Rpb25zKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMud2lkZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgIT09IHRoaXMuX2FjdGl2ZUNlbGxJbmRleCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLndpZGdldHNbaV07XG4gICAgICAgICAgICAgICAgY2VsbC5tb2RlbC5zZWxlY3Rpb25zLmRlbGV0ZShjZWxsLmVkaXRvci51dWlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogVGhlIG5hbWVzcGFjZSBmb3IgdGhlIGBOb3RlYm9va2AgY2xhc3Mgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChOb3RlYm9vaykge1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGEgbm90ZWJvb2sgY29udGVudCBmYWN0b3J5Li5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBPdmVycmlkZSBtZXRob2RzIG9uIHRoaXMgY2xhc3MgdG8gY3VzdG9taXplIHRoZSBkZWZhdWx0IG5vdGVib29rIGZhY3RvcnlcbiAgICAgKiBtZXRob2RzIHRoYXQgY3JlYXRlIG5vdGVib29rIGNvbnRlbnQuXG4gICAgICovXG4gICAgY2xhc3MgQ29udGVudEZhY3RvcnkgZXh0ZW5kcyBTdGF0aWNOb3RlYm9vay5Db250ZW50RmFjdG9yeSB7XG4gICAgfVxuICAgIE5vdGVib29rLkNvbnRlbnRGYWN0b3J5ID0gQ29udGVudEZhY3Rvcnk7XG4gICAgTm90ZWJvb2suZGVmYXVsdENvbnRlbnRGYWN0b3J5ID0gbmV3IENvbnRlbnRGYWN0b3J5KCk7XG59KShOb3RlYm9vayB8fCAoTm90ZWJvb2sgPSB7fSkpO1xuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgcHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEFuIGF0dGFjaGVkIHByb3BlcnR5IGZvciB0aGUgc2VsZWN0ZWQgc3RhdGUgb2YgYSBjZWxsLlxuICAgICAqL1xuICAgIFByaXZhdGUuc2VsZWN0ZWRQcm9wZXJ0eSA9IG5ldyBBdHRhY2hlZFByb3BlcnR5KHtcbiAgICAgICAgbmFtZTogJ3NlbGVjdGVkJyxcbiAgICAgICAgY3JlYXRlOiAoKSA9PiBmYWxzZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEEgY3VzdG9tIHBhbmVsIGxheW91dCBmb3IgdGhlIG5vdGVib29rLlxuICAgICAqL1xuICAgIGNsYXNzIE5vdGVib29rUGFuZWxMYXlvdXQgZXh0ZW5kcyBQYW5lbExheW91dCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIG1lc3NhZ2UgaGFuZGxlciBpbnZva2VkIG9uIGFuIGAndXBkYXRlLXJlcXVlc3QnYCBtZXNzYWdlLlxuICAgICAgICAgKlxuICAgICAgICAgKiAjIyMjIE5vdGVzXG4gICAgICAgICAqIFRoaXMgaXMgYSByZWltcGxlbWVudGF0aW9uIG9mIHRoZSBiYXNlIGNsYXNzIG1ldGhvZCxcbiAgICAgICAgICogYW5kIGlzIGEgbm8tb3AuXG4gICAgICAgICAqL1xuICAgICAgICBvblVwZGF0ZVJlcXVlc3QobXNnKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIGEgbm8tb3AuXG4gICAgICAgIH1cbiAgICB9XG4gICAgUHJpdmF0ZS5Ob3RlYm9va1BhbmVsTGF5b3V0ID0gTm90ZWJvb2tQYW5lbExheW91dDtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBjZWxsIGRyYWcgaW1hZ2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlRHJhZ0ltYWdlKGNvdW50LCBwcm9tcHROdW1iZXIsIGNlbGxDb250ZW50KSB7XG4gICAgICAgIGlmIChjb3VudCA+IDEpIHtcbiAgICAgICAgICAgIGlmIChwcm9tcHROdW1iZXIgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFZpcnR1YWxET00ucmVhbGl6ZShoLmRpdihoLmRpdih7IGNsYXNzTmFtZTogRFJBR19JTUFHRV9DTEFTUyB9LCBoLnNwYW4oeyBjbGFzc05hbWU6IENFTExfRFJBR19QUk9NUFRfQ0xBU1MgfSwgJ1snICsgcHJvbXB0TnVtYmVyICsgJ106JyksIGguc3Bhbih7IGNsYXNzTmFtZTogQ0VMTF9EUkFHX0NPTlRFTlRfQ0xBU1MgfSwgY2VsbENvbnRlbnQpKSwgaC5kaXYoeyBjbGFzc05hbWU6IENFTExfRFJBR19NVUxUSVBMRV9CQUNLIH0sICcnKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFZpcnR1YWxET00ucmVhbGl6ZShoLmRpdihoLmRpdih7IGNsYXNzTmFtZTogRFJBR19JTUFHRV9DTEFTUyB9LCBoLnNwYW4oeyBjbGFzc05hbWU6IENFTExfRFJBR19QUk9NUFRfQ0xBU1MgfSksIGguc3Bhbih7IGNsYXNzTmFtZTogQ0VMTF9EUkFHX0NPTlRFTlRfQ0xBU1MgfSwgY2VsbENvbnRlbnQpKSwgaC5kaXYoeyBjbGFzc05hbWU6IENFTExfRFJBR19NVUxUSVBMRV9CQUNLIH0sICcnKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHByb21wdE51bWJlciAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gVmlydHVhbERPTS5yZWFsaXplKGguZGl2KGguZGl2KHsgY2xhc3NOYW1lOiBgJHtEUkFHX0lNQUdFX0NMQVNTfSAke1NJTkdMRV9EUkFHX0lNQUdFX0NMQVNTfWAgfSwgaC5zcGFuKHsgY2xhc3NOYW1lOiBDRUxMX0RSQUdfUFJPTVBUX0NMQVNTIH0sICdbJyArIHByb21wdE51bWJlciArICddOicpLCBoLnNwYW4oeyBjbGFzc05hbWU6IENFTExfRFJBR19DT05URU5UX0NMQVNTIH0sIGNlbGxDb250ZW50KSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBWaXJ0dWFsRE9NLnJlYWxpemUoaC5kaXYoaC5kaXYoeyBjbGFzc05hbWU6IGAke0RSQUdfSU1BR0VfQ0xBU1N9ICR7U0lOR0xFX0RSQUdfSU1BR0VfQ0xBU1N9YCB9LCBoLnNwYW4oeyBjbGFzc05hbWU6IENFTExfRFJBR19QUk9NUFRfQ0xBU1MgfSksIGguc3Bhbih7IGNsYXNzTmFtZTogQ0VMTF9EUkFHX0NPTlRFTlRfQ0xBU1MgfSwgY2VsbENvbnRlbnQpKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFByaXZhdGUuY3JlYXRlRHJhZ0ltYWdlID0gY3JlYXRlRHJhZ0ltYWdlO1xuICAgIC8qKlxuICAgICAqIFByb2Nlc3MgdGhlIGBJT3B0aW9uc2AgcGFzc2VkIHRvIHRoZSBub3RlYm9vayB3aWRnZXQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBkZWZhdWx0cyB0aGUgY29udGVudCBmYWN0b3J5IHRvIHRoYXQgaW4gdGhlIGBOb3RlYm9va2AgbmFtZXNwYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHByb2Nlc3NOb3RlYm9va09wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy5jb250ZW50RmFjdG9yeSkge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlbmRlcm1pbWU6IG9wdGlvbnMucmVuZGVybWltZSxcbiAgICAgICAgICAgICAgICBsYW5ndWFnZVByZWZlcmVuY2U6IG9wdGlvbnMubGFuZ3VhZ2VQcmVmZXJlbmNlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRGYWN0b3J5OiBOb3RlYm9vay5kZWZhdWx0Q29udGVudEZhY3RvcnksXG4gICAgICAgICAgICAgICAgbWltZVR5cGVTZXJ2aWNlOiBvcHRpb25zLm1pbWVUeXBlU2VydmljZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBQcml2YXRlLnByb2Nlc3NOb3RlYm9va09wdGlvbnMgPSBwcm9jZXNzTm90ZWJvb2tPcHRpb25zO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD13aWRnZXQuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgc2Vzc2lvbkNvbnRleHREaWFsb2dzIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgQUJDV2lkZ2V0RmFjdG9yeSB9IGZyb20gJ0BqdXB5dGVybGFiL2RvY3JlZ2lzdHJ5JztcbmltcG9ydCB7IFRvb2xiYXJJdGVtcyB9IGZyb20gJy4vZGVmYXVsdC10b29sYmFyJztcbmltcG9ydCB7IE5vdGVib29rUGFuZWwgfSBmcm9tICcuL3BhbmVsJztcbmltcG9ydCB7IFN0YXRpY05vdGVib29rIH0gZnJvbSAnLi93aWRnZXQnO1xuLyoqXG4gKiBBIHdpZGdldCBmYWN0b3J5IGZvciBub3RlYm9vayBwYW5lbHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBOb3RlYm9va1dpZGdldEZhY3RvcnkgZXh0ZW5kcyBBQkNXaWRnZXRGYWN0b3J5IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgbm90ZWJvb2sgd2lkZ2V0IGZhY3RvcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIHVzZWQgdG8gY29uc3RydWN0IHRoZSBmYWN0b3J5LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucmVuZGVybWltZSA9IG9wdGlvbnMucmVuZGVybWltZTtcbiAgICAgICAgdGhpcy5jb250ZW50RmFjdG9yeSA9XG4gICAgICAgICAgICBvcHRpb25zLmNvbnRlbnRGYWN0b3J5IHx8IE5vdGVib29rUGFuZWwuZGVmYXVsdENvbnRlbnRGYWN0b3J5O1xuICAgICAgICB0aGlzLm1pbWVUeXBlU2VydmljZSA9IG9wdGlvbnMubWltZVR5cGVTZXJ2aWNlO1xuICAgICAgICB0aGlzLl9lZGl0b3JDb25maWcgPVxuICAgICAgICAgICAgb3B0aW9ucy5lZGl0b3JDb25maWcgfHwgU3RhdGljTm90ZWJvb2suZGVmYXVsdEVkaXRvckNvbmZpZztcbiAgICAgICAgdGhpcy5fbm90ZWJvb2tDb25maWcgPVxuICAgICAgICAgICAgb3B0aW9ucy5ub3RlYm9va0NvbmZpZyB8fCBTdGF0aWNOb3RlYm9vay5kZWZhdWx0Tm90ZWJvb2tDb25maWc7XG4gICAgICAgIHRoaXMuX3Nlc3Npb25EaWFsb2dzID0gb3B0aW9ucy5zZXNzaW9uRGlhbG9ncyB8fCBzZXNzaW9uQ29udGV4dERpYWxvZ3M7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgY29uZmlndXJhdGlvbiBvYmplY3QgZm9yIGNlbGwgZWRpdG9yIHNldHRpbmdzLlxuICAgICAqL1xuICAgIGdldCBlZGl0b3JDb25maWcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZGl0b3JDb25maWc7XG4gICAgfVxuICAgIHNldCBlZGl0b3JDb25maWcodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZWRpdG9yQ29uZmlnID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgY29uZmlndXJhdGlvbiBvYmplY3QgZm9yIG5vdGVib29rIHNldHRpbmdzLlxuICAgICAqL1xuICAgIGdldCBub3RlYm9va0NvbmZpZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vdGVib29rQ29uZmlnO1xuICAgIH1cbiAgICBzZXQgbm90ZWJvb2tDb25maWcodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbm90ZWJvb2tDb25maWcgPSB2YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHdpZGdldC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgZmFjdG9yeSB3aWxsIHN0YXJ0IHRoZSBhcHByb3ByaWF0ZSBrZXJuZWwuXG4gICAgICovXG4gICAgY3JlYXRlTmV3V2lkZ2V0KGNvbnRleHQsIHNvdXJjZSkge1xuICAgICAgICBjb25zdCBuYk9wdGlvbnMgPSB7XG4gICAgICAgICAgICByZW5kZXJtaW1lOiBzb3VyY2VcbiAgICAgICAgICAgICAgICA/IHNvdXJjZS5jb250ZW50LnJlbmRlcm1pbWVcbiAgICAgICAgICAgICAgICA6IHRoaXMucmVuZGVybWltZS5jbG9uZSh7IHJlc29sdmVyOiBjb250ZXh0LnVybFJlc29sdmVyIH0pLFxuICAgICAgICAgICAgY29udGVudEZhY3Rvcnk6IHRoaXMuY29udGVudEZhY3RvcnksXG4gICAgICAgICAgICBtaW1lVHlwZVNlcnZpY2U6IHRoaXMubWltZVR5cGVTZXJ2aWNlLFxuICAgICAgICAgICAgZWRpdG9yQ29uZmlnOiBzb3VyY2UgPyBzb3VyY2UuY29udGVudC5lZGl0b3JDb25maWcgOiB0aGlzLl9lZGl0b3JDb25maWcsXG4gICAgICAgICAgICBub3RlYm9va0NvbmZpZzogc291cmNlXG4gICAgICAgICAgICAgICAgPyBzb3VyY2UuY29udGVudC5ub3RlYm9va0NvbmZpZ1xuICAgICAgICAgICAgICAgIDogdGhpcy5fbm90ZWJvb2tDb25maWcsXG4gICAgICAgICAgICB0cmFuc2xhdG9yOiB0aGlzLnRyYW5zbGF0b3JcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuY29udGVudEZhY3RvcnkuY3JlYXRlTm90ZWJvb2sobmJPcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIG5ldyBOb3RlYm9va1BhbmVsKHsgY29udGV4dCwgY29udGVudCB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBmYWN0b3J5IGZvciB0b29sYmFyIGl0ZW1zIHRvIGJlIGFkZGVkIGFmdGVyIHRoZSB3aWRnZXQgaXMgY3JlYXRlZC5cbiAgICAgKi9cbiAgICBkZWZhdWx0VG9vbGJhckZhY3Rvcnkod2lkZ2V0KSB7XG4gICAgICAgIHJldHVybiBUb29sYmFySXRlbXMuZ2V0RGVmYXVsdEl0ZW1zKHdpZGdldCwgdGhpcy5fc2Vzc2lvbkRpYWxvZ3MsIHRoaXMudHJhbnNsYXRvcik7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2lkZ2V0ZmFjdG9yeS5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9