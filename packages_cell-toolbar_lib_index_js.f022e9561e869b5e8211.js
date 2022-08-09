(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_cell-toolbar_lib_index_js"],{

/***/ "../../packages/cell-toolbar/lib/celltoolbartracker.js":
/*!*************************************************************!*\
  !*** ../../packages/cell-toolbar/lib/celltoolbartracker.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CellToolbarTracker": () => (/* binding */ CellToolbarTracker),
/* harmony export */   "CellBarExtension": () => (/* binding */ CellBarExtension)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/observables */ "webpack/sharing/consume/default/@jupyterlab/observables/@jupyterlab/observables");
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_observables__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_3__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/




/**
 * Widget cell toolbar classes
 */
const CELL_TOOLBAR_CLASS = 'jp-cell-toolbar';
const CELL_MENU_CLASS = 'jp-cell-menu';
/**
 * Class for a cell whose contents overlap with the cell toolbar
 */
const TOOLBAR_OVERLAP_CLASS = 'jp-toolbar-overlap';
/**
 * Watch a notebook so that a cell toolbar appears on the active cell
 */
class CellToolbarTracker {
    constructor(panel, toolbar) {
        this._isDisposed = false;
        this._panel = panel;
        this._previousActiveCell = this._panel.content.activeCell;
        this._toolbar = toolbar;
        this._onToolbarChanged();
        this._toolbar.changed.connect(this._onToolbarChanged, this);
        // Only add the toolbar to the notebook's active cell (if any) once it has fully rendered and been revealed.
        void panel.revealed.then(() => this._onActiveCellChanged(panel.content));
        // Handle subsequent changes of active cell.
        panel.content.activeCellChanged.connect(this._onActiveCellChanged, this);
    }
    _onActiveCellChanged(notebook) {
        if (this._previousActiveCell) {
            this._removeToolbar(this._previousActiveCell.model);
        }
        const activeCell = notebook.activeCell;
        if (!activeCell) {
            return;
        }
        this._addToolbar(activeCell.model);
        this._previousActiveCell = activeCell;
        this._updateCellForToolbarOverlap(activeCell);
    }
    get isDisposed() {
        return this._isDisposed;
    }
    dispose() {
        var _a;
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        this._toolbar.changed.disconnect(this._onToolbarChanged, this);
        const cells = (_a = this._panel) === null || _a === void 0 ? void 0 : _a.context.model.cells;
        if (cells) {
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.each)(cells.iter(), model => this._removeToolbar(model));
        }
        this._panel = null;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal.clearData(this);
    }
    _addToolbar(model) {
        const cell = this._getCell(model);
        if (cell) {
            const toolbarWidget = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Toolbar();
            toolbarWidget.addClass(CELL_MENU_CLASS);
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.toArray)(this._toolbar).forEach(({ name, widget }) => {
                toolbarWidget.addItem(name, widget);
            });
            toolbarWidget.addClass(CELL_TOOLBAR_CLASS);
            cell.layout.insertWidget(0, toolbarWidget);
            // For rendered markdown, watch for resize events.
            cell.displayChanged.connect(this._resizeEventCallback, this);
            // Watch for changes in the cell's contents.
            cell.model.contentChanged.connect(this._changedEventCallback, this);
        }
    }
    _getCell(model) {
        var _a;
        return (_a = this._panel) === null || _a === void 0 ? void 0 : _a.content.widgets.find(widget => widget.model === model);
    }
    _findToolbarWidgets(cell) {
        const widgets = cell.layout.widgets;
        // Search for header using the CSS class or use the first one if not found.
        return widgets.filter(widget => widget.hasClass(CELL_TOOLBAR_CLASS)) || [];
    }
    _removeToolbar(model) {
        const cell = this._getCell(model);
        if (cell) {
            this._findToolbarWidgets(cell).forEach(widget => widget.dispose());
            // Attempt to remove the resize and changed event handlers.
            cell.displayChanged.disconnect(this._resizeEventCallback, this);
            cell.model.contentChanged.disconnect(this._changedEventCallback, this);
        }
    }
    /**
     * Call back on settings changes
     */
    _onToolbarChanged() {
        var _a;
        // Reset toolbar when settings changes
        const activeCell = (_a = this._panel) === null || _a === void 0 ? void 0 : _a.content.activeCell;
        if (activeCell) {
            this._removeToolbar(activeCell.model);
            this._addToolbar(activeCell.model);
        }
    }
    _changedEventCallback() {
        var _a;
        const activeCell = (_a = this._panel) === null || _a === void 0 ? void 0 : _a.content.activeCell;
        if (activeCell === null || activeCell === undefined) {
            return;
        }
        this._updateCellForToolbarOverlap(activeCell);
    }
    _resizeEventCallback() {
        var _a;
        const activeCell = (_a = this._panel) === null || _a === void 0 ? void 0 : _a.content.activeCell;
        if (activeCell === null || activeCell === undefined) {
            return;
        }
        this._updateCellForToolbarOverlap(activeCell);
    }
    _updateCellForToolbarOverlap(activeCell) {
        // Remove the "toolbar overlap" class from the cell, rendering the cell's toolbar
        const activeCellElement = activeCell.node;
        activeCellElement.classList.remove(TOOLBAR_OVERLAP_CLASS);
        if (this._cellToolbarOverlapsContents(activeCell)) {
            // Add the "toolbar overlap" class to the cell, completely concealing the toolbar,
            // if the first line of the content overlaps with it at all
            activeCellElement.classList.add(TOOLBAR_OVERLAP_CLASS);
        }
    }
    _cellToolbarOverlapsContents(activeCell) {
        const cellType = activeCell.model.type;
        // If the toolbar is too large for the current cell, hide it.
        const cellLeft = this._cellEditorWidgetLeft(activeCell);
        const cellRight = this._cellEditorWidgetRight(activeCell);
        const toolbarLeft = this._cellToolbarLeft(activeCell);
        if (toolbarLeft === null) {
            return false;
        }
        // The toolbar should not take up more than 50% of the cell.
        if ((cellLeft + cellRight) / 2 > toolbarLeft) {
            return true;
        }
        if (cellType === 'markdown' && activeCell.rendered) {
            // Check for overlap in rendered markdown content
            return this._markdownOverlapsToolbar(activeCell);
        }
        // Check for overlap in code content
        return this._codeOverlapsToolbar(activeCell);
    }
    /**
     * Check for overlap between rendered Markdown and the cell toolbar
     *
     * @param activeCell A rendered MarkdownCell
     * @returns `true` if the first line of the output overlaps with the cell toolbar, `false` otherwise
     */
    _markdownOverlapsToolbar(activeCell) {
        const markdownOutput = activeCell.inputArea; // Rendered markdown appears in the input area
        // Get the rendered markdown as a widget.
        const markdownOutputWidget = markdownOutput.renderedInput;
        const markdownOutputElement = markdownOutputWidget.node;
        const firstOutputElementChild = markdownOutputElement.firstElementChild;
        if (firstOutputElementChild === null) {
            return false;
        }
        // Temporarily set the element's max width so that the bounding client rectangle only encompasses the content.
        const oldMaxWidth = firstOutputElementChild.style.maxWidth;
        firstOutputElementChild.style.maxWidth = 'max-content';
        const lineRight = firstOutputElementChild.getBoundingClientRect().right;
        // Reinstate the old max width.
        firstOutputElementChild.style.maxWidth = oldMaxWidth;
        const toolbarLeft = this._cellToolbarLeft(activeCell);
        return toolbarLeft === null ? false : lineRight > toolbarLeft;
    }
    _codeOverlapsToolbar(activeCell) {
        const editorWidget = activeCell.editorWidget;
        const editor = activeCell.editor;
        if (editor.lineCount < 1) {
            return false; // Nothing in the editor
        }
        const codeMirrorLines = editorWidget.node.getElementsByClassName('CodeMirror-line');
        if (codeMirrorLines.length < 1) {
            return false; // No lines present
        }
        const lineRight = codeMirrorLines[0].children[0] // First span under first pre
            .getBoundingClientRect().right;
        const toolbarLeft = this._cellToolbarLeft(activeCell);
        return toolbarLeft === null ? false : lineRight > toolbarLeft;
    }
    _cellEditorWidgetLeft(activeCell) {
        return activeCell.editorWidget.node.getBoundingClientRect().left;
    }
    _cellEditorWidgetRight(activeCell) {
        return activeCell.editorWidget.node.getBoundingClientRect().right;
    }
    _cellToolbarLeft(activeCell) {
        const toolbarWidgets = this._findToolbarWidgets(activeCell);
        if (toolbarWidgets.length < 1) {
            return null;
        }
        const activeCellToolbar = toolbarWidgets[0].node;
        return activeCellToolbar.getBoundingClientRect().left;
    }
}
const defaultToolbarItems = [
    {
        command: 'notebook:duplicate-below',
        name: 'duplicate-cell'
    },
    {
        command: 'notebook:move-cell-up',
        name: 'move-cell-up'
    },
    {
        command: 'notebook:move-cell-down',
        name: 'move-cell-down'
    },
    {
        command: 'notebook:insert-cell-above',
        name: 'insert-cell-above'
    },
    {
        command: 'notebook:insert-cell-below',
        name: 'insert-cell-below'
    },
    {
        command: 'notebook:delete-cell',
        name: 'delete-cell'
    }
];
/**
 * Widget extension that creates a CellToolbarTracker each time a notebook is
 * created.
 */
class CellBarExtension {
    constructor(commands, toolbarFactory) {
        this._commands = commands;
        this._toolbarFactory = toolbarFactory !== null && toolbarFactory !== void 0 ? toolbarFactory : this.defaultToolbarFactory;
    }
    get defaultToolbarFactory() {
        const itemFactory = (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.createDefaultFactory)(this._commands);
        return (widget) => new _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_1__.ObservableList({
            values: defaultToolbarItems.map(item => {
                return {
                    name: item.name,
                    widget: itemFactory(CellBarExtension.FACTORY_NAME, widget, item)
                };
            })
        });
    }
    createNew(panel) {
        return new CellToolbarTracker(panel, this._toolbarFactory(panel));
    }
}
CellBarExtension.FACTORY_NAME = 'Cell';
//# sourceMappingURL=celltoolbartracker.js.map

/***/ }),

/***/ "../../packages/cell-toolbar/lib/index.js":
/*!************************************************!*\
  !*** ../../packages/cell-toolbar/lib/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CellBarExtension": () => (/* reexport safe */ _celltoolbartracker__WEBPACK_IMPORTED_MODULE_0__.CellBarExtension),
/* harmony export */   "CellToolbarTracker": () => (/* reexport safe */ _celltoolbartracker__WEBPACK_IMPORTED_MODULE_0__.CellToolbarTracker)
/* harmony export */ });
/* harmony import */ var _celltoolbartracker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./celltoolbartracker */ "../../packages/cell-toolbar/lib/celltoolbartracker.js");
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module cell-toolbar
 */

//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY2VsbC10b29sYmFyL2xpYi9jZWxsdG9vbGJhcnRyYWNrZXIuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2NlbGwtdG9vbGJhci9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ3FFO0FBQ1o7QUFDUDtBQUNQO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx1REFBSTtBQUNoQjtBQUNBO0FBQ0EsUUFBUSwrREFBZ0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MseURBQU87QUFDN0M7QUFDQSxZQUFZLDBEQUFPLDBCQUEwQixlQUFlO0FBQzVEO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsMEVBQW9CO0FBQ2hELCtCQUErQixtRUFBYztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNxQztBQUNyQyxpQyIsImZpbGUiOiJwYWNrYWdlc19jZWxsLXRvb2xiYXJfbGliX2luZGV4X2pzLmYwMjJlOTU2MWU4NjliNWU4MjExLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBjcmVhdGVEZWZhdWx0RmFjdG9yeSwgVG9vbGJhciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IE9ic2VydmFibGVMaXN0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvb2JzZXJ2YWJsZXMnO1xuaW1wb3J0IHsgZWFjaCwgdG9BcnJheSB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbi8qKlxuICogV2lkZ2V0IGNlbGwgdG9vbGJhciBjbGFzc2VzXG4gKi9cbmNvbnN0IENFTExfVE9PTEJBUl9DTEFTUyA9ICdqcC1jZWxsLXRvb2xiYXInO1xuY29uc3QgQ0VMTF9NRU5VX0NMQVNTID0gJ2pwLWNlbGwtbWVudSc7XG4vKipcbiAqIENsYXNzIGZvciBhIGNlbGwgd2hvc2UgY29udGVudHMgb3ZlcmxhcCB3aXRoIHRoZSBjZWxsIHRvb2xiYXJcbiAqL1xuY29uc3QgVE9PTEJBUl9PVkVSTEFQX0NMQVNTID0gJ2pwLXRvb2xiYXItb3ZlcmxhcCc7XG4vKipcbiAqIFdhdGNoIGEgbm90ZWJvb2sgc28gdGhhdCBhIGNlbGwgdG9vbGJhciBhcHBlYXJzIG9uIHRoZSBhY3RpdmUgY2VsbFxuICovXG5leHBvcnQgY2xhc3MgQ2VsbFRvb2xiYXJUcmFja2VyIHtcbiAgICBjb25zdHJ1Y3RvcihwYW5lbCwgdG9vbGJhcikge1xuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BhbmVsID0gcGFuZWw7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzQWN0aXZlQ2VsbCA9IHRoaXMuX3BhbmVsLmNvbnRlbnQuYWN0aXZlQ2VsbDtcbiAgICAgICAgdGhpcy5fdG9vbGJhciA9IHRvb2xiYXI7XG4gICAgICAgIHRoaXMuX29uVG9vbGJhckNoYW5nZWQoKTtcbiAgICAgICAgdGhpcy5fdG9vbGJhci5jaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25Ub29sYmFyQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIC8vIE9ubHkgYWRkIHRoZSB0b29sYmFyIHRvIHRoZSBub3RlYm9vaydzIGFjdGl2ZSBjZWxsIChpZiBhbnkpIG9uY2UgaXQgaGFzIGZ1bGx5IHJlbmRlcmVkIGFuZCBiZWVuIHJldmVhbGVkLlxuICAgICAgICB2b2lkIHBhbmVsLnJldmVhbGVkLnRoZW4oKCkgPT4gdGhpcy5fb25BY3RpdmVDZWxsQ2hhbmdlZChwYW5lbC5jb250ZW50KSk7XG4gICAgICAgIC8vIEhhbmRsZSBzdWJzZXF1ZW50IGNoYW5nZXMgb2YgYWN0aXZlIGNlbGwuXG4gICAgICAgIHBhbmVsLmNvbnRlbnQuYWN0aXZlQ2VsbENoYW5nZWQuY29ubmVjdCh0aGlzLl9vbkFjdGl2ZUNlbGxDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG4gICAgX29uQWN0aXZlQ2VsbENoYW5nZWQobm90ZWJvb2spIHtcbiAgICAgICAgaWYgKHRoaXMuX3ByZXZpb3VzQWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlVG9vbGJhcih0aGlzLl9wcmV2aW91c0FjdGl2ZUNlbGwubW9kZWwpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFjdGl2ZUNlbGwgPSBub3RlYm9vay5hY3RpdmVDZWxsO1xuICAgICAgICBpZiAoIWFjdGl2ZUNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hZGRUb29sYmFyKGFjdGl2ZUNlbGwubW9kZWwpO1xuICAgICAgICB0aGlzLl9wcmV2aW91c0FjdGl2ZUNlbGwgPSBhY3RpdmVDZWxsO1xuICAgICAgICB0aGlzLl91cGRhdGVDZWxsRm9yVG9vbGJhck92ZXJsYXAoYWN0aXZlQ2VsbCk7XG4gICAgfVxuICAgIGdldCBpc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEaXNwb3NlZDtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3Rvb2xiYXIuY2hhbmdlZC5kaXNjb25uZWN0KHRoaXMuX29uVG9vbGJhckNoYW5nZWQsIHRoaXMpO1xuICAgICAgICBjb25zdCBjZWxscyA9IChfYSA9IHRoaXMuX3BhbmVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGV4dC5tb2RlbC5jZWxscztcbiAgICAgICAgaWYgKGNlbGxzKSB7XG4gICAgICAgICAgICBlYWNoKGNlbGxzLml0ZXIoKSwgbW9kZWwgPT4gdGhpcy5fcmVtb3ZlVG9vbGJhcihtb2RlbCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BhbmVsID0gbnVsbDtcbiAgICAgICAgU2lnbmFsLmNsZWFyRGF0YSh0aGlzKTtcbiAgICB9XG4gICAgX2FkZFRvb2xiYXIobW9kZWwpIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuX2dldENlbGwobW9kZWwpO1xuICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgY29uc3QgdG9vbGJhcldpZGdldCA9IG5ldyBUb29sYmFyKCk7XG4gICAgICAgICAgICB0b29sYmFyV2lkZ2V0LmFkZENsYXNzKENFTExfTUVOVV9DTEFTUyk7XG4gICAgICAgICAgICB0b0FycmF5KHRoaXMuX3Rvb2xiYXIpLmZvckVhY2goKHsgbmFtZSwgd2lkZ2V0IH0pID0+IHtcbiAgICAgICAgICAgICAgICB0b29sYmFyV2lkZ2V0LmFkZEl0ZW0obmFtZSwgd2lkZ2V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdG9vbGJhcldpZGdldC5hZGRDbGFzcyhDRUxMX1RPT0xCQVJfQ0xBU1MpO1xuICAgICAgICAgICAgY2VsbC5sYXlvdXQuaW5zZXJ0V2lkZ2V0KDAsIHRvb2xiYXJXaWRnZXQpO1xuICAgICAgICAgICAgLy8gRm9yIHJlbmRlcmVkIG1hcmtkb3duLCB3YXRjaCBmb3IgcmVzaXplIGV2ZW50cy5cbiAgICAgICAgICAgIGNlbGwuZGlzcGxheUNoYW5nZWQuY29ubmVjdCh0aGlzLl9yZXNpemVFdmVudENhbGxiYWNrLCB0aGlzKTtcbiAgICAgICAgICAgIC8vIFdhdGNoIGZvciBjaGFuZ2VzIGluIHRoZSBjZWxsJ3MgY29udGVudHMuXG4gICAgICAgICAgICBjZWxsLm1vZGVsLmNvbnRlbnRDaGFuZ2VkLmNvbm5lY3QodGhpcy5fY2hhbmdlZEV2ZW50Q2FsbGJhY2ssIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXRDZWxsKG1vZGVsKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuX3BhbmVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudC53aWRnZXRzLmZpbmQod2lkZ2V0ID0+IHdpZGdldC5tb2RlbCA9PT0gbW9kZWwpO1xuICAgIH1cbiAgICBfZmluZFRvb2xiYXJXaWRnZXRzKGNlbGwpIHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0cyA9IGNlbGwubGF5b3V0LndpZGdldHM7XG4gICAgICAgIC8vIFNlYXJjaCBmb3IgaGVhZGVyIHVzaW5nIHRoZSBDU1MgY2xhc3Mgb3IgdXNlIHRoZSBmaXJzdCBvbmUgaWYgbm90IGZvdW5kLlxuICAgICAgICByZXR1cm4gd2lkZ2V0cy5maWx0ZXIod2lkZ2V0ID0+IHdpZGdldC5oYXNDbGFzcyhDRUxMX1RPT0xCQVJfQ0xBU1MpKSB8fCBbXTtcbiAgICB9XG4gICAgX3JlbW92ZVRvb2xiYXIobW9kZWwpIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuX2dldENlbGwobW9kZWwpO1xuICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgdGhpcy5fZmluZFRvb2xiYXJXaWRnZXRzKGNlbGwpLmZvckVhY2god2lkZ2V0ID0+IHdpZGdldC5kaXNwb3NlKCkpO1xuICAgICAgICAgICAgLy8gQXR0ZW1wdCB0byByZW1vdmUgdGhlIHJlc2l6ZSBhbmQgY2hhbmdlZCBldmVudCBoYW5kbGVycy5cbiAgICAgICAgICAgIGNlbGwuZGlzcGxheUNoYW5nZWQuZGlzY29ubmVjdCh0aGlzLl9yZXNpemVFdmVudENhbGxiYWNrLCB0aGlzKTtcbiAgICAgICAgICAgIGNlbGwubW9kZWwuY29udGVudENoYW5nZWQuZGlzY29ubmVjdCh0aGlzLl9jaGFuZ2VkRXZlbnRDYWxsYmFjaywgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbCBiYWNrIG9uIHNldHRpbmdzIGNoYW5nZXNcbiAgICAgKi9cbiAgICBfb25Ub29sYmFyQ2hhbmdlZCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyBSZXNldCB0b29sYmFyIHdoZW4gc2V0dGluZ3MgY2hhbmdlc1xuICAgICAgICBjb25zdCBhY3RpdmVDZWxsID0gKF9hID0gdGhpcy5fcGFuZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb250ZW50LmFjdGl2ZUNlbGw7XG4gICAgICAgIGlmIChhY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVUb29sYmFyKGFjdGl2ZUNlbGwubW9kZWwpO1xuICAgICAgICAgICAgdGhpcy5fYWRkVG9vbGJhcihhY3RpdmVDZWxsLm1vZGVsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfY2hhbmdlZEV2ZW50Q2FsbGJhY2soKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgYWN0aXZlQ2VsbCA9IChfYSA9IHRoaXMuX3BhbmVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudC5hY3RpdmVDZWxsO1xuICAgICAgICBpZiAoYWN0aXZlQ2VsbCA9PT0gbnVsbCB8fCBhY3RpdmVDZWxsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVDZWxsRm9yVG9vbGJhck92ZXJsYXAoYWN0aXZlQ2VsbCk7XG4gICAgfVxuICAgIF9yZXNpemVFdmVudENhbGxiYWNrKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUNlbGwgPSAoX2EgPSB0aGlzLl9wYW5lbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbnRlbnQuYWN0aXZlQ2VsbDtcbiAgICAgICAgaWYgKGFjdGl2ZUNlbGwgPT09IG51bGwgfHwgYWN0aXZlQ2VsbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlQ2VsbEZvclRvb2xiYXJPdmVybGFwKGFjdGl2ZUNlbGwpO1xuICAgIH1cbiAgICBfdXBkYXRlQ2VsbEZvclRvb2xiYXJPdmVybGFwKGFjdGl2ZUNlbGwpIHtcbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBcInRvb2xiYXIgb3ZlcmxhcFwiIGNsYXNzIGZyb20gdGhlIGNlbGwsIHJlbmRlcmluZyB0aGUgY2VsbCdzIHRvb2xiYXJcbiAgICAgICAgY29uc3QgYWN0aXZlQ2VsbEVsZW1lbnQgPSBhY3RpdmVDZWxsLm5vZGU7XG4gICAgICAgIGFjdGl2ZUNlbGxFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoVE9PTEJBUl9PVkVSTEFQX0NMQVNTKTtcbiAgICAgICAgaWYgKHRoaXMuX2NlbGxUb29sYmFyT3ZlcmxhcHNDb250ZW50cyhhY3RpdmVDZWxsKSkge1xuICAgICAgICAgICAgLy8gQWRkIHRoZSBcInRvb2xiYXIgb3ZlcmxhcFwiIGNsYXNzIHRvIHRoZSBjZWxsLCBjb21wbGV0ZWx5IGNvbmNlYWxpbmcgdGhlIHRvb2xiYXIsXG4gICAgICAgICAgICAvLyBpZiB0aGUgZmlyc3QgbGluZSBvZiB0aGUgY29udGVudCBvdmVybGFwcyB3aXRoIGl0IGF0IGFsbFxuICAgICAgICAgICAgYWN0aXZlQ2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChUT09MQkFSX09WRVJMQVBfQ0xBU1MpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9jZWxsVG9vbGJhck92ZXJsYXBzQ29udGVudHMoYWN0aXZlQ2VsbCkge1xuICAgICAgICBjb25zdCBjZWxsVHlwZSA9IGFjdGl2ZUNlbGwubW9kZWwudHlwZTtcbiAgICAgICAgLy8gSWYgdGhlIHRvb2xiYXIgaXMgdG9vIGxhcmdlIGZvciB0aGUgY3VycmVudCBjZWxsLCBoaWRlIGl0LlxuICAgICAgICBjb25zdCBjZWxsTGVmdCA9IHRoaXMuX2NlbGxFZGl0b3JXaWRnZXRMZWZ0KGFjdGl2ZUNlbGwpO1xuICAgICAgICBjb25zdCBjZWxsUmlnaHQgPSB0aGlzLl9jZWxsRWRpdG9yV2lkZ2V0UmlnaHQoYWN0aXZlQ2VsbCk7XG4gICAgICAgIGNvbnN0IHRvb2xiYXJMZWZ0ID0gdGhpcy5fY2VsbFRvb2xiYXJMZWZ0KGFjdGl2ZUNlbGwpO1xuICAgICAgICBpZiAodG9vbGJhckxlZnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGUgdG9vbGJhciBzaG91bGQgbm90IHRha2UgdXAgbW9yZSB0aGFuIDUwJSBvZiB0aGUgY2VsbC5cbiAgICAgICAgaWYgKChjZWxsTGVmdCArIGNlbGxSaWdodCkgLyAyID4gdG9vbGJhckxlZnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjZWxsVHlwZSA9PT0gJ21hcmtkb3duJyAmJiBhY3RpdmVDZWxsLnJlbmRlcmVkKSB7XG4gICAgICAgICAgICAvLyBDaGVjayBmb3Igb3ZlcmxhcCBpbiByZW5kZXJlZCBtYXJrZG93biBjb250ZW50XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Rvd25PdmVybGFwc1Rvb2xiYXIoYWN0aXZlQ2VsbCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgZm9yIG92ZXJsYXAgaW4gY29kZSBjb250ZW50XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2RlT3ZlcmxhcHNUb29sYmFyKGFjdGl2ZUNlbGwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBmb3Igb3ZlcmxhcCBiZXR3ZWVuIHJlbmRlcmVkIE1hcmtkb3duIGFuZCB0aGUgY2VsbCB0b29sYmFyXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYWN0aXZlQ2VsbCBBIHJlbmRlcmVkIE1hcmtkb3duQ2VsbFxuICAgICAqIEByZXR1cm5zIGB0cnVlYCBpZiB0aGUgZmlyc3QgbGluZSBvZiB0aGUgb3V0cHV0IG92ZXJsYXBzIHdpdGggdGhlIGNlbGwgdG9vbGJhciwgYGZhbHNlYCBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBfbWFya2Rvd25PdmVybGFwc1Rvb2xiYXIoYWN0aXZlQ2VsbCkge1xuICAgICAgICBjb25zdCBtYXJrZG93bk91dHB1dCA9IGFjdGl2ZUNlbGwuaW5wdXRBcmVhOyAvLyBSZW5kZXJlZCBtYXJrZG93biBhcHBlYXJzIGluIHRoZSBpbnB1dCBhcmVhXG4gICAgICAgIC8vIEdldCB0aGUgcmVuZGVyZWQgbWFya2Rvd24gYXMgYSB3aWRnZXQuXG4gICAgICAgIGNvbnN0IG1hcmtkb3duT3V0cHV0V2lkZ2V0ID0gbWFya2Rvd25PdXRwdXQucmVuZGVyZWRJbnB1dDtcbiAgICAgICAgY29uc3QgbWFya2Rvd25PdXRwdXRFbGVtZW50ID0gbWFya2Rvd25PdXRwdXRXaWRnZXQubm9kZTtcbiAgICAgICAgY29uc3QgZmlyc3RPdXRwdXRFbGVtZW50Q2hpbGQgPSBtYXJrZG93bk91dHB1dEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIGlmIChmaXJzdE91dHB1dEVsZW1lbnRDaGlsZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRlbXBvcmFyaWx5IHNldCB0aGUgZWxlbWVudCdzIG1heCB3aWR0aCBzbyB0aGF0IHRoZSBib3VuZGluZyBjbGllbnQgcmVjdGFuZ2xlIG9ubHkgZW5jb21wYXNzZXMgdGhlIGNvbnRlbnQuXG4gICAgICAgIGNvbnN0IG9sZE1heFdpZHRoID0gZmlyc3RPdXRwdXRFbGVtZW50Q2hpbGQuc3R5bGUubWF4V2lkdGg7XG4gICAgICAgIGZpcnN0T3V0cHV0RWxlbWVudENoaWxkLnN0eWxlLm1heFdpZHRoID0gJ21heC1jb250ZW50JztcbiAgICAgICAgY29uc3QgbGluZVJpZ2h0ID0gZmlyc3RPdXRwdXRFbGVtZW50Q2hpbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkucmlnaHQ7XG4gICAgICAgIC8vIFJlaW5zdGF0ZSB0aGUgb2xkIG1heCB3aWR0aC5cbiAgICAgICAgZmlyc3RPdXRwdXRFbGVtZW50Q2hpbGQuc3R5bGUubWF4V2lkdGggPSBvbGRNYXhXaWR0aDtcbiAgICAgICAgY29uc3QgdG9vbGJhckxlZnQgPSB0aGlzLl9jZWxsVG9vbGJhckxlZnQoYWN0aXZlQ2VsbCk7XG4gICAgICAgIHJldHVybiB0b29sYmFyTGVmdCA9PT0gbnVsbCA/IGZhbHNlIDogbGluZVJpZ2h0ID4gdG9vbGJhckxlZnQ7XG4gICAgfVxuICAgIF9jb2RlT3ZlcmxhcHNUb29sYmFyKGFjdGl2ZUNlbGwpIHtcbiAgICAgICAgY29uc3QgZWRpdG9yV2lkZ2V0ID0gYWN0aXZlQ2VsbC5lZGl0b3JXaWRnZXQ7XG4gICAgICAgIGNvbnN0IGVkaXRvciA9IGFjdGl2ZUNlbGwuZWRpdG9yO1xuICAgICAgICBpZiAoZWRpdG9yLmxpbmVDb3VudCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gTm90aGluZyBpbiB0aGUgZWRpdG9yXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29kZU1pcnJvckxpbmVzID0gZWRpdG9yV2lkZ2V0Lm5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnQ29kZU1pcnJvci1saW5lJyk7XG4gICAgICAgIGlmIChjb2RlTWlycm9yTGluZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBObyBsaW5lcyBwcmVzZW50XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGluZVJpZ2h0ID0gY29kZU1pcnJvckxpbmVzWzBdLmNoaWxkcmVuWzBdIC8vIEZpcnN0IHNwYW4gdW5kZXIgZmlyc3QgcHJlXG4gICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkucmlnaHQ7XG4gICAgICAgIGNvbnN0IHRvb2xiYXJMZWZ0ID0gdGhpcy5fY2VsbFRvb2xiYXJMZWZ0KGFjdGl2ZUNlbGwpO1xuICAgICAgICByZXR1cm4gdG9vbGJhckxlZnQgPT09IG51bGwgPyBmYWxzZSA6IGxpbmVSaWdodCA+IHRvb2xiYXJMZWZ0O1xuICAgIH1cbiAgICBfY2VsbEVkaXRvcldpZGdldExlZnQoYWN0aXZlQ2VsbCkge1xuICAgICAgICByZXR1cm4gYWN0aXZlQ2VsbC5lZGl0b3JXaWRnZXQubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgIH1cbiAgICBfY2VsbEVkaXRvcldpZGdldFJpZ2h0KGFjdGl2ZUNlbGwpIHtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZUNlbGwuZWRpdG9yV2lkZ2V0Lm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkucmlnaHQ7XG4gICAgfVxuICAgIF9jZWxsVG9vbGJhckxlZnQoYWN0aXZlQ2VsbCkge1xuICAgICAgICBjb25zdCB0b29sYmFyV2lkZ2V0cyA9IHRoaXMuX2ZpbmRUb29sYmFyV2lkZ2V0cyhhY3RpdmVDZWxsKTtcbiAgICAgICAgaWYgKHRvb2xiYXJXaWRnZXRzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFjdGl2ZUNlbGxUb29sYmFyID0gdG9vbGJhcldpZGdldHNbMF0ubm9kZTtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZUNlbGxUb29sYmFyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgfVxufVxuY29uc3QgZGVmYXVsdFRvb2xiYXJJdGVtcyA9IFtcbiAgICB7XG4gICAgICAgIGNvbW1hbmQ6ICdub3RlYm9vazpkdXBsaWNhdGUtYmVsb3cnLFxuICAgICAgICBuYW1lOiAnZHVwbGljYXRlLWNlbGwnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbW1hbmQ6ICdub3RlYm9vazptb3ZlLWNlbGwtdXAnLFxuICAgICAgICBuYW1lOiAnbW92ZS1jZWxsLXVwJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBjb21tYW5kOiAnbm90ZWJvb2s6bW92ZS1jZWxsLWRvd24nLFxuICAgICAgICBuYW1lOiAnbW92ZS1jZWxsLWRvd24nXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbW1hbmQ6ICdub3RlYm9vazppbnNlcnQtY2VsbC1hYm92ZScsXG4gICAgICAgIG5hbWU6ICdpbnNlcnQtY2VsbC1hYm92ZSdcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29tbWFuZDogJ25vdGVib29rOmluc2VydC1jZWxsLWJlbG93JyxcbiAgICAgICAgbmFtZTogJ2luc2VydC1jZWxsLWJlbG93J1xuICAgIH0sXG4gICAge1xuICAgICAgICBjb21tYW5kOiAnbm90ZWJvb2s6ZGVsZXRlLWNlbGwnLFxuICAgICAgICBuYW1lOiAnZGVsZXRlLWNlbGwnXG4gICAgfVxuXTtcbi8qKlxuICogV2lkZ2V0IGV4dGVuc2lvbiB0aGF0IGNyZWF0ZXMgYSBDZWxsVG9vbGJhclRyYWNrZXIgZWFjaCB0aW1lIGEgbm90ZWJvb2sgaXNcbiAqIGNyZWF0ZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBDZWxsQmFyRXh0ZW5zaW9uIHtcbiAgICBjb25zdHJ1Y3Rvcihjb21tYW5kcywgdG9vbGJhckZhY3RvcnkpIHtcbiAgICAgICAgdGhpcy5fY29tbWFuZHMgPSBjb21tYW5kcztcbiAgICAgICAgdGhpcy5fdG9vbGJhckZhY3RvcnkgPSB0b29sYmFyRmFjdG9yeSAhPT0gbnVsbCAmJiB0b29sYmFyRmFjdG9yeSAhPT0gdm9pZCAwID8gdG9vbGJhckZhY3RvcnkgOiB0aGlzLmRlZmF1bHRUb29sYmFyRmFjdG9yeTtcbiAgICB9XG4gICAgZ2V0IGRlZmF1bHRUb29sYmFyRmFjdG9yeSgpIHtcbiAgICAgICAgY29uc3QgaXRlbUZhY3RvcnkgPSBjcmVhdGVEZWZhdWx0RmFjdG9yeSh0aGlzLl9jb21tYW5kcyk7XG4gICAgICAgIHJldHVybiAod2lkZ2V0KSA9PiBuZXcgT2JzZXJ2YWJsZUxpc3Qoe1xuICAgICAgICAgICAgdmFsdWVzOiBkZWZhdWx0VG9vbGJhckl0ZW1zLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldDogaXRlbUZhY3RvcnkoQ2VsbEJhckV4dGVuc2lvbi5GQUNUT1JZX05BTUUsIHdpZGdldCwgaXRlbSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNyZWF0ZU5ldyhwYW5lbCkge1xuICAgICAgICByZXR1cm4gbmV3IENlbGxUb29sYmFyVHJhY2tlcihwYW5lbCwgdGhpcy5fdG9vbGJhckZhY3RvcnkocGFuZWwpKTtcbiAgICB9XG59XG5DZWxsQmFyRXh0ZW5zaW9uLkZBQ1RPUllfTkFNRSA9ICdDZWxsJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNlbGx0b29sYmFydHJhY2tlci5qcy5tYXAiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIGNlbGwtdG9vbGJhclxuICovXG5leHBvcnQgKiBmcm9tICcuL2NlbGx0b29sYmFydHJhY2tlcic7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9