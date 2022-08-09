(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_celltags_lib_index_js"],{

/***/ "../../packages/celltags/lib/addwidget.js":
/*!************************************************!*\
  !*** ../../packages/celltags/lib/addwidget.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddWidget": () => (/* binding */ AddWidget)
/* harmony export */ });
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_2__);



/**
 * A widget which hosts a cell tags area.
 */
class AddWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget {
    /**
     * Construct a new tag widget.
     */
    constructor(translator) {
        super();
        this.parent = null;
        this.input = document.createElement('input');
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this.addClass('tag');
        this.editing = false;
        this.buildTag();
    }
    /**
     * Create input box with icon and attach to this.node.
     */
    buildTag() {
        const text = this.input || document.createElement('input');
        text.value = this._trans.__('Add Tag');
        text.contentEditable = 'true';
        text.className = 'add-tag';
        text.style.width = '49px';
        this.input = text;
        const tag = document.createElement('div');
        tag.className = 'tag-holder';
        tag.appendChild(text);
        const iconContainer = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.addIcon.element({
            tag: 'span',
            elementPosition: 'center',
            height: '18px',
            width: '18px',
            marginLeft: '3px',
            marginRight: '-5px'
        });
        this.addClass('unapplied-tag');
        tag.appendChild(iconContainer);
        this.node.appendChild(tag);
    }
    /**
     * Handle `after-attach` messages for the widget.
     */
    onAfterAttach() {
        this.node.addEventListener('mousedown', this);
        this.input.addEventListener('keydown', this);
        this.input.addEventListener('focus', this);
        this.input.addEventListener('blur', this);
    }
    /**
     * Handle `before-detach` messages for the widget.
     */
    onBeforeDetach() {
        this.node.removeEventListener('mousedown', this);
        this.input.removeEventListener('keydown', this);
        this.input.removeEventListener('focus', this);
        this.input.removeEventListener('blur', this);
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
            case 'mousedown':
                this._evtMouseDown(event);
                break;
            case 'keydown':
                this._evtKeyDown(event);
                break;
            case 'blur':
                this._evtBlur();
                break;
            case 'focus':
                this._evtFocus();
                break;
            default:
                break;
        }
    }
    /**
     * Handle the `'mousedown'` event for the input box.
     *
     * @param event - The DOM event sent to the widget
     */
    _evtMouseDown(event) {
        if (!this.editing) {
            this.editing = true;
            this.input.value = '';
            this.input.focus();
        }
        else if (event.target !== this.input) {
            if (this.input.value !== '') {
                const value = this.input.value;
                this.parent.addTag(value);
                this.input.blur();
                this._evtBlur();
            }
        }
        event.preventDefault();
    }
    /**
     * Handle the `'focus'` event for the input box.
     */
    _evtFocus() {
        if (!this.editing) {
            this.input.blur();
        }
    }
    /**
     * Handle the `'keydown'` event for the input box.
     *
     * @param event - The DOM event sent to the widget
     */
    _evtKeyDown(event) {
        const tmp = document.createElement('span');
        tmp.className = 'add-tag';
        tmp.innerHTML = this.input.value;
        // set width to the pixel length of the text
        document.body.appendChild(tmp);
        this.input.style.width = tmp.getBoundingClientRect().width + 8 + 'px';
        document.body.removeChild(tmp);
        // if they hit Enter, add the tag and reset state
        if (event.keyCode === 13) {
            const value = this.input.value;
            this.parent.addTag(value);
            this.input.blur();
            this._evtBlur();
        }
    }
    /**
     * Handle the `'focusout'` event for the input box.
     */
    _evtBlur() {
        if (this.editing) {
            this.editing = false;
            this.input.value = this._trans.__('Add Tag');
            this.input.style.width = '49px';
        }
    }
}
//# sourceMappingURL=addwidget.js.map

/***/ }),

/***/ "../../packages/celltags/lib/index.js":
/*!********************************************!*\
  !*** ../../packages/celltags/lib/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddWidget": () => (/* reexport safe */ _addwidget__WEBPACK_IMPORTED_MODULE_0__.AddWidget),
/* harmony export */   "TagTool": () => (/* reexport safe */ _tool__WEBPACK_IMPORTED_MODULE_1__.TagTool),
/* harmony export */   "TagWidget": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_2__.TagWidget)
/* harmony export */ });
/* harmony import */ var _addwidget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addwidget */ "../../packages/celltags/lib/addwidget.js");
/* harmony import */ var _tool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tool */ "../../packages/celltags/lib/tool.js");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./widget */ "../../packages/celltags/lib/widget.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module celltags
 */



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/celltags/lib/tool.js":
/*!*******************************************!*\
  !*** ../../packages/celltags/lib/tool.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TagTool": () => (/* binding */ TagTool)
/* harmony export */ });
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _addwidget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addwidget */ "../../packages/celltags/lib/addwidget.js");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./widget */ "../../packages/celltags/lib/widget.js");






/**
 * A Tool for tag operations.
 */
class TagTool extends _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__.NotebookTools.Tool {
    /**
     * Construct a new tag Tool.
     *
     * @param tracker - The notebook tracker.
     */
    constructor(tracker, app, translator) {
        super();
        this.tagList = [];
        this.label = false;
        app;
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this.tracker = tracker;
        this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.PanelLayout();
        this.createTagInput();
        this.addClass('jp-TagTool');
    }
    /**
     * Add an AddWidget input box to the layout.
     */
    createTagInput() {
        const layout = this.layout;
        const input = new _addwidget__WEBPACK_IMPORTED_MODULE_4__.AddWidget(this.translator);
        input.id = 'add-tag';
        layout.insertWidget(0, input);
    }
    /**
     * Check whether a tag is applied to the current active cell
     *
     * @param name - The name of the tag.
     *
     * @returns A boolean representing whether it is applied.
     */
    checkApplied(name) {
        var _a;
        const activeCell = (_a = this.tracker) === null || _a === void 0 ? void 0 : _a.activeCell;
        if (activeCell) {
            const tags = activeCell.model.metadata.get('tags');
            if (tags) {
                return tags.includes(name);
            }
        }
        return false;
    }
    /**
     * Add a tag to the current active cell.
     *
     * @param name - The name of the tag.
     */
    addTag(name) {
        var _a, _b;
        const cell = (_a = this.tracker) === null || _a === void 0 ? void 0 : _a.activeCell;
        if (cell) {
            const oldTags = [
                ...((_b = cell.model.metadata.get('tags')) !== null && _b !== void 0 ? _b : [])
            ];
            let tagsToAdd = name.split(/[,\s]+/);
            tagsToAdd = tagsToAdd.filter(tag => tag !== '' && !oldTags.includes(tag));
            cell.model.metadata.set('tags', oldTags.concat(tagsToAdd));
            this.refreshTags();
            this.loadActiveTags();
        }
    }
    /**
     * Remove a tag from the current active cell.
     *
     * @param name - The name of the tag.
     */
    removeTag(name) {
        var _a, _b;
        const cell = (_a = this.tracker) === null || _a === void 0 ? void 0 : _a.activeCell;
        if (cell) {
            const oldTags = [
                ...((_b = cell.model.metadata.get('tags')) !== null && _b !== void 0 ? _b : [])
            ];
            let tags = oldTags.filter(tag => tag !== name);
            cell.model.metadata.set('tags', tags);
            if (tags.length === 0) {
                cell.model.metadata.delete('tags');
            }
            this.refreshTags();
            this.loadActiveTags();
        }
    }
    /**
     * Update each tag widget to represent whether it is applied to the current
     * active cell.
     */
    loadActiveTags() {
        const layout = this.layout;
        for (const widget of layout.widgets) {
            widget.update();
        }
    }
    /**
     * Pull from cell metadata all the tags used in the notebook and update the
     * stored tag list.
     */
    pullTags() {
        var _a, _b, _c;
        const notebook = (_a = this.tracker) === null || _a === void 0 ? void 0 : _a.currentWidget;
        const cells = (_c = (_b = notebook === null || notebook === void 0 ? void 0 : notebook.model) === null || _b === void 0 ? void 0 : _b.cells) !== null && _c !== void 0 ? _c : [];
        const allTags = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.reduce)(cells, (allTags, cell) => {
            var _a;
            const tags = (_a = cell.metadata.get('tags')) !== null && _a !== void 0 ? _a : [];
            return [...allTags, ...tags];
        }, []);
        this.tagList = [...new Set(allTags)].filter(tag => tag !== '');
    }
    /**
     * Pull the most recent list of tags and update the tag widgets - dispose if
     * the tag no longer exists, and create new widgets for new tags.
     */
    refreshTags() {
        this.pullTags();
        const layout = this.layout;
        const tagWidgets = layout.widgets.filter(w => w.id !== 'add-tag');
        tagWidgets.forEach(widget => {
            if (!this.tagList.includes(widget.name)) {
                widget.dispose();
            }
        });
        const tagWidgetNames = tagWidgets.map(w => w.name);
        this.tagList.forEach(tag => {
            if (!tagWidgetNames.includes(tag)) {
                const idx = layout.widgets.length - 1;
                layout.insertWidget(idx, new _widget__WEBPACK_IMPORTED_MODULE_5__.TagWidget(tag));
            }
        });
    }
    /**
     * Validate the 'tags' of cell metadata, ensuring it is a list of strings and
     * that each string doesn't include spaces.
     */
    validateTags(cell, tags) {
        tags = tags.filter(tag => typeof tag === 'string');
        tags = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.reduce)(tags, (allTags, tag) => {
            return [...allTags, ...tag.split(/[,\s]+/)];
        }, []);
        const validTags = [...new Set(tags)].filter(tag => tag !== '');
        cell.model.metadata.set('tags', validTags);
        this.refreshTags();
        this.loadActiveTags();
    }
    /**
     * Handle a change to the active cell.
     */
    onActiveCellChanged() {
        this.loadActiveTags();
    }
    /**
     * Get all tags once available.
     */
    onAfterShow() {
        this.refreshTags();
        this.loadActiveTags();
    }
    /**
     * Upon attach, add label if it doesn't already exist and listen for changes
     * from the notebook tracker.
     */
    onAfterAttach() {
        if (!this.label) {
            const label = document.createElement('label');
            label.textContent = this._trans.__('Cell Tags');
            label.className = 'tag-label';
            this.parent.node.insertBefore(label, this.node);
            this.label = true;
        }
        if (this.tracker.currentWidget) {
            void this.tracker.currentWidget.context.ready.then(() => {
                this.refreshTags();
                this.loadActiveTags();
            });
            this.tracker.currentWidget.model.cells.changed.connect(() => {
                this.refreshTags();
                this.loadActiveTags();
            });
            this.tracker.currentWidget.content.activeCellChanged.connect(() => {
                this.refreshTags();
                this.loadActiveTags();
            });
        }
        this.tracker.currentChanged.connect(() => {
            this.refreshTags();
            this.loadActiveTags();
        });
    }
    /**
     * Handle a change to active cell metadata.
     */
    onActiveCellMetadataChanged() {
        const tags = this.tracker.activeCell.model.metadata.get('tags');
        let taglist = [];
        if (tags) {
            if (typeof tags === 'string') {
                taglist.push(tags);
            }
            else {
                taglist = tags;
            }
        }
        this.validateTags(this.tracker.activeCell, taglist);
    }
}
//# sourceMappingURL=tool.js.map

/***/ }),

/***/ "../../packages/celltags/lib/widget.js":
/*!*********************************************!*\
  !*** ../../packages/celltags/lib/widget.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TagWidget": () => (/* binding */ TagWidget)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_1__);


/**
 * A widget which hosts a cell tags area.
 */
class TagWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Widget {
    /**
     * Construct a new tag widget.
     */
    constructor(name) {
        super();
        this.parent = null;
        this.applied = true;
        this.name = name;
        this.addClass('tag');
        this.buildTag();
    }
    /**
     * Create tag div with icon and attach to this.node.
     */
    buildTag() {
        const text = document.createElement('span');
        text.textContent = this.name;
        text.style.textOverflow = 'ellipsis';
        const tag = document.createElement('div');
        tag.className = 'tag-holder';
        tag.appendChild(text);
        const iconContainer = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.checkIcon.element({
            tag: 'span',
            elementPosition: 'center',
            height: '18px',
            width: '18px',
            marginLeft: '5px',
            marginRight: '-3px'
        });
        if (this.applied) {
            this.addClass('applied-tag');
        }
        else {
            this.addClass('unapplied-tag');
            iconContainer.style.display = 'none';
        }
        tag.appendChild(iconContainer);
        this.node.appendChild(tag);
    }
    /**
     * Handle `after-attach` messages for the widget.
     */
    onAfterAttach() {
        this.node.addEventListener('mousedown', this);
        this.node.addEventListener('mouseover', this);
        this.node.addEventListener('mouseout', this);
    }
    /**
     * Handle `before-detach` messages for the widget.
     */
    onBeforeDetach() {
        this.node.removeEventListener('mousedown', this);
        this.node.removeEventListener('mouseover', this);
        this.node.removeEventListener('mouseout', this);
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
            case 'mousedown':
                this._evtClick();
                break;
            case 'mouseover':
                this._evtMouseOver();
                break;
            case 'mouseout':
                this._evtMouseOut();
                break;
            default:
                break;
        }
    }
    /**
     * Handle `update-request` messages. Check if applied to current active cell.
     */
    onUpdateRequest() {
        var _a;
        const applied = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.checkApplied(this.name);
        if (applied !== this.applied) {
            this.toggleApplied();
        }
    }
    /**
     * Update styling to reflect whether tag is applied to current active cell.
     */
    toggleApplied() {
        var _a, _b;
        if (this.applied) {
            this.removeClass('applied-tag');
            ((_a = this.node.firstChild) === null || _a === void 0 ? void 0 : _a.lastChild).style.display =
                'none';
            this.addClass('unapplied-tag');
        }
        else {
            this.removeClass('unapplied-tag');
            ((_b = this.node.firstChild) === null || _b === void 0 ? void 0 : _b.lastChild).style.display =
                'inline-block';
            this.addClass('applied-tag');
        }
        this.applied = !this.applied;
    }
    /**
     * Handle the `'click'` event for the widget.
     */
    _evtClick() {
        var _a, _b;
        if (this.applied) {
            (_a = this.parent) === null || _a === void 0 ? void 0 : _a.removeTag(this.name);
        }
        else {
            (_b = this.parent) === null || _b === void 0 ? void 0 : _b.addTag(this.name);
        }
        this.toggleApplied();
    }
    /**
     * Handle the `'mouseover'` event for the widget.
     */
    _evtMouseOver() {
        this.node.classList.add('tag-hover');
    }
    /**
     * Handle the `'mouseout'` event for the widget.
     */
    _evtMouseOut() {
        this.node.classList.remove('tag-hover');
    }
}
//# sourceMappingURL=widget.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY2VsbHRhZ3MvbGliL2FkZHdpZGdldC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY2VsbHRhZ3MvbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9jZWxsdGFncy9saWIvdG9vbC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY2VsbHRhZ3MvbGliL3dpZGdldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlEO0FBQ0w7QUFDWDtBQUN6QztBQUNBO0FBQ0E7QUFDTyx3QkFBd0IsbURBQU07QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsbUVBQWM7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHNFQUFlO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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RUFBaUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0MiLCJmaWxlIjoicGFja2FnZXNfY2VsbHRhZ3NfbGliX2luZGV4X2pzLmYyNDQ5MGExOTg1NzlkZTlmZmMwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBhZGRJY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuLyoqXG4gKiBBIHdpZGdldCB3aGljaCBob3N0cyBhIGNlbGwgdGFncyBhcmVhLlxuICovXG5leHBvcnQgY2xhc3MgQWRkV2lkZ2V0IGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGFnIHdpZGdldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0cmFuc2xhdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMuX3RyYW5zID0gdGhpcy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygndGFnJyk7XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJ1aWxkVGFnKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBpbnB1dCBib3ggd2l0aCBpY29uIGFuZCBhdHRhY2ggdG8gdGhpcy5ub2RlLlxuICAgICAqL1xuICAgIGJ1aWxkVGFnKCkge1xuICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy5pbnB1dCB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICB0ZXh0LnZhbHVlID0gdGhpcy5fdHJhbnMuX18oJ0FkZCBUYWcnKTtcbiAgICAgICAgdGV4dC5jb250ZW50RWRpdGFibGUgPSAndHJ1ZSc7XG4gICAgICAgIHRleHQuY2xhc3NOYW1lID0gJ2FkZC10YWcnO1xuICAgICAgICB0ZXh0LnN0eWxlLndpZHRoID0gJzQ5cHgnO1xuICAgICAgICB0aGlzLmlucHV0ID0gdGV4dDtcbiAgICAgICAgY29uc3QgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRhZy5jbGFzc05hbWUgPSAndGFnLWhvbGRlcic7XG4gICAgICAgIHRhZy5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgICAgY29uc3QgaWNvbkNvbnRhaW5lciA9IGFkZEljb24uZWxlbWVudCh7XG4gICAgICAgICAgICB0YWc6ICdzcGFuJyxcbiAgICAgICAgICAgIGVsZW1lbnRQb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxOHB4JyxcbiAgICAgICAgICAgIHdpZHRoOiAnMThweCcsXG4gICAgICAgICAgICBtYXJnaW5MZWZ0OiAnM3B4JyxcbiAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnLTVweCdcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ3VuYXBwbGllZC10YWcnKTtcbiAgICAgICAgdGFnLmFwcGVuZENoaWxkKGljb25Db250YWluZXIpO1xuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQodGFnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGBhZnRlci1hdHRhY2hgIG1lc3NhZ2VzIGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIG9uQWZ0ZXJBdHRhY2goKSB7XG4gICAgICAgIHRoaXMubm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzKTtcbiAgICAgICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcyk7XG4gICAgICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzKTtcbiAgICAgICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgYmVmb3JlLWRldGFjaGAgbWVzc2FnZXMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgb25CZWZvcmVEZXRhY2goKSB7XG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzKTtcbiAgICAgICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcyk7XG4gICAgICAgIHRoaXMuaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzKTtcbiAgICAgICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgRE9NIGV2ZW50cyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudCAtIFRoZSBET00gZXZlbnQgc2VudCB0byB0aGUgd2lkZ2V0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgbWV0aG9kIGltcGxlbWVudHMgdGhlIERPTSBgRXZlbnRMaXN0ZW5lcmAgaW50ZXJmYWNlIGFuZCBpc1xuICAgICAqIGNhbGxlZCBpbiByZXNwb25zZSB0byBldmVudHMgb24gdGhlIGRvY2sgcGFuZWwncyBub2RlLiBJdCBzaG91bGRcbiAgICAgKiBub3QgYmUgY2FsbGVkIGRpcmVjdGx5IGJ5IHVzZXIgY29kZS5cbiAgICAgKi9cbiAgICBoYW5kbGVFdmVudChldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ21vdXNlZG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0TW91c2VEb3duKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2tleWRvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dEtleURvd24oZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYmx1cic6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0Qmx1cigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZm9jdXMnOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dEZvY3VzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgYCdtb3VzZWRvd24nYCBldmVudCBmb3IgdGhlIGlucHV0IGJveC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudCAtIFRoZSBET00gZXZlbnQgc2VudCB0byB0aGUgd2lkZ2V0XG4gICAgICovXG4gICAgX2V2dE1vdXNlRG93bihldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZWRpdGluZykge1xuICAgICAgICAgICAgdGhpcy5lZGl0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudC50YXJnZXQgIT09IHRoaXMuaW5wdXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0LnZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5pbnB1dC52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5hZGRUYWcodmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuYmx1cigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2dEJsdXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGAnZm9jdXMnYCBldmVudCBmb3IgdGhlIGlucHV0IGJveC5cbiAgICAgKi9cbiAgICBfZXZ0Rm9jdXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5lZGl0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0LmJsdXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGAna2V5ZG93bidgIGV2ZW50IGZvciB0aGUgaW5wdXQgYm94LlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50IC0gVGhlIERPTSBldmVudCBzZW50IHRvIHRoZSB3aWRnZXRcbiAgICAgKi9cbiAgICBfZXZ0S2V5RG93bihldmVudCkge1xuICAgICAgICBjb25zdCB0bXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHRtcC5jbGFzc05hbWUgPSAnYWRkLXRhZyc7XG4gICAgICAgIHRtcC5pbm5lckhUTUwgPSB0aGlzLmlucHV0LnZhbHVlO1xuICAgICAgICAvLyBzZXQgd2lkdGggdG8gdGhlIHBpeGVsIGxlbmd0aCBvZiB0aGUgdGV4dFxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRtcCk7XG4gICAgICAgIHRoaXMuaW5wdXQuc3R5bGUud2lkdGggPSB0bXAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggKyA4ICsgJ3B4JztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0bXApO1xuICAgICAgICAvLyBpZiB0aGV5IGhpdCBFbnRlciwgYWRkIHRoZSB0YWcgYW5kIHJlc2V0IHN0YXRlXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmlucHV0LnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuYWRkVGFnKHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuYmx1cigpO1xuICAgICAgICAgICAgdGhpcy5fZXZ0Qmx1cigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgYCdmb2N1c291dCdgIGV2ZW50IGZvciB0aGUgaW5wdXQgYm94LlxuICAgICAqL1xuICAgIF9ldnRCbHVyKCkge1xuICAgICAgICBpZiAodGhpcy5lZGl0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQudmFsdWUgPSB0aGlzLl90cmFucy5fXygnQWRkIFRhZycpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5zdHlsZS53aWR0aCA9ICc0OXB4JztcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFkZHdpZGdldC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBjZWxsdGFnc1xuICovXG5leHBvcnQgKiBmcm9tICcuL2FkZHdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL3Rvb2wnO1xuZXhwb3J0ICogZnJvbSAnLi93aWRnZXQnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiaW1wb3J0IHsgTm90ZWJvb2tUb29scyB9IGZyb20gJ0BqdXB5dGVybGFiL25vdGVib29rJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgcmVkdWNlIH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IHsgUGFuZWxMYXlvdXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuaW1wb3J0IHsgQWRkV2lkZ2V0IH0gZnJvbSAnLi9hZGR3aWRnZXQnO1xuaW1wb3J0IHsgVGFnV2lkZ2V0IH0gZnJvbSAnLi93aWRnZXQnO1xuLyoqXG4gKiBBIFRvb2wgZm9yIHRhZyBvcGVyYXRpb25zLlxuICovXG5leHBvcnQgY2xhc3MgVGFnVG9vbCBleHRlbmRzIE5vdGVib29rVG9vbHMuVG9vbCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IHRhZyBUb29sLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRyYWNrZXIgLSBUaGUgbm90ZWJvb2sgdHJhY2tlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0cmFja2VyLCBhcHAsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50YWdMaXN0ID0gW107XG4gICAgICAgIHRoaXMubGFiZWwgPSBmYWxzZTtcbiAgICAgICAgYXBwO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICB0aGlzLl90cmFucyA9IHRoaXMudHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHRoaXMudHJhY2tlciA9IHRyYWNrZXI7XG4gICAgICAgIHRoaXMubGF5b3V0ID0gbmV3IFBhbmVsTGF5b3V0KCk7XG4gICAgICAgIHRoaXMuY3JlYXRlVGFnSW5wdXQoKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtVGFnVG9vbCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgYW4gQWRkV2lkZ2V0IGlucHV0IGJveCB0byB0aGUgbGF5b3V0LlxuICAgICAqL1xuICAgIGNyZWF0ZVRhZ0lucHV0KCkge1xuICAgICAgICBjb25zdCBsYXlvdXQgPSB0aGlzLmxheW91dDtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBuZXcgQWRkV2lkZ2V0KHRoaXMudHJhbnNsYXRvcik7XG4gICAgICAgIGlucHV0LmlkID0gJ2FkZC10YWcnO1xuICAgICAgICBsYXlvdXQuaW5zZXJ0V2lkZ2V0KDAsIGlucHV0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgd2hldGhlciBhIHRhZyBpcyBhcHBsaWVkIHRvIHRoZSBjdXJyZW50IGFjdGl2ZSBjZWxsXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSB0YWcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIGJvb2xlYW4gcmVwcmVzZW50aW5nIHdoZXRoZXIgaXQgaXMgYXBwbGllZC5cbiAgICAgKi9cbiAgICBjaGVja0FwcGxpZWQobmFtZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUNlbGwgPSAoX2EgPSB0aGlzLnRyYWNrZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hY3RpdmVDZWxsO1xuICAgICAgICBpZiAoYWN0aXZlQ2VsbCkge1xuICAgICAgICAgICAgY29uc3QgdGFncyA9IGFjdGl2ZUNlbGwubW9kZWwubWV0YWRhdGEuZ2V0KCd0YWdzJyk7XG4gICAgICAgICAgICBpZiAodGFncykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0YWdzLmluY2x1ZGVzKG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgdGFnIHRvIHRoZSBjdXJyZW50IGFjdGl2ZSBjZWxsLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgdGFnLlxuICAgICAqL1xuICAgIGFkZFRhZyhuYW1lKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IGNlbGwgPSAoX2EgPSB0aGlzLnRyYWNrZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hY3RpdmVDZWxsO1xuICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgY29uc3Qgb2xkVGFncyA9IFtcbiAgICAgICAgICAgICAgICAuLi4oKF9iID0gY2VsbC5tb2RlbC5tZXRhZGF0YS5nZXQoJ3RhZ3MnKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogW10pXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgbGV0IHRhZ3NUb0FkZCA9IG5hbWUuc3BsaXQoL1ssXFxzXSsvKTtcbiAgICAgICAgICAgIHRhZ3NUb0FkZCA9IHRhZ3NUb0FkZC5maWx0ZXIodGFnID0+IHRhZyAhPT0gJycgJiYgIW9sZFRhZ3MuaW5jbHVkZXModGFnKSk7XG4gICAgICAgICAgICBjZWxsLm1vZGVsLm1ldGFkYXRhLnNldCgndGFncycsIG9sZFRhZ3MuY29uY2F0KHRhZ3NUb0FkZCkpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVGFncygpO1xuICAgICAgICAgICAgdGhpcy5sb2FkQWN0aXZlVGFncygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIHRhZyBmcm9tIHRoZSBjdXJyZW50IGFjdGl2ZSBjZWxsLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgdGFnLlxuICAgICAqL1xuICAgIHJlbW92ZVRhZyhuYW1lKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IGNlbGwgPSAoX2EgPSB0aGlzLnRyYWNrZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hY3RpdmVDZWxsO1xuICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgY29uc3Qgb2xkVGFncyA9IFtcbiAgICAgICAgICAgICAgICAuLi4oKF9iID0gY2VsbC5tb2RlbC5tZXRhZGF0YS5nZXQoJ3RhZ3MnKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogW10pXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgbGV0IHRhZ3MgPSBvbGRUYWdzLmZpbHRlcih0YWcgPT4gdGFnICE9PSBuYW1lKTtcbiAgICAgICAgICAgIGNlbGwubW9kZWwubWV0YWRhdGEuc2V0KCd0YWdzJywgdGFncyk7XG4gICAgICAgICAgICBpZiAodGFncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjZWxsLm1vZGVsLm1ldGFkYXRhLmRlbGV0ZSgndGFncycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVGFncygpO1xuICAgICAgICAgICAgdGhpcy5sb2FkQWN0aXZlVGFncygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBlYWNoIHRhZyB3aWRnZXQgdG8gcmVwcmVzZW50IHdoZXRoZXIgaXQgaXMgYXBwbGllZCB0byB0aGUgY3VycmVudFxuICAgICAqIGFjdGl2ZSBjZWxsLlxuICAgICAqL1xuICAgIGxvYWRBY3RpdmVUYWdzKCkge1xuICAgICAgICBjb25zdCBsYXlvdXQgPSB0aGlzLmxheW91dDtcbiAgICAgICAgZm9yIChjb25zdCB3aWRnZXQgb2YgbGF5b3V0LndpZGdldHMpIHtcbiAgICAgICAgICAgIHdpZGdldC51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdWxsIGZyb20gY2VsbCBtZXRhZGF0YSBhbGwgdGhlIHRhZ3MgdXNlZCBpbiB0aGUgbm90ZWJvb2sgYW5kIHVwZGF0ZSB0aGVcbiAgICAgKiBzdG9yZWQgdGFnIGxpc3QuXG4gICAgICovXG4gICAgcHVsbFRhZ3MoKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBjb25zdCBub3RlYm9vayA9IChfYSA9IHRoaXMudHJhY2tlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgIGNvbnN0IGNlbGxzID0gKF9jID0gKF9iID0gbm90ZWJvb2sgPT09IG51bGwgfHwgbm90ZWJvb2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5vdGVib29rLm1vZGVsKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2VsbHMpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IFtdO1xuICAgICAgICBjb25zdCBhbGxUYWdzID0gcmVkdWNlKGNlbGxzLCAoYWxsVGFncywgY2VsbCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgdGFncyA9IChfYSA9IGNlbGwubWV0YWRhdGEuZ2V0KCd0YWdzJykpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdO1xuICAgICAgICAgICAgcmV0dXJuIFsuLi5hbGxUYWdzLCAuLi50YWdzXTtcbiAgICAgICAgfSwgW10pO1xuICAgICAgICB0aGlzLnRhZ0xpc3QgPSBbLi4ubmV3IFNldChhbGxUYWdzKV0uZmlsdGVyKHRhZyA9PiB0YWcgIT09ICcnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVsbCB0aGUgbW9zdCByZWNlbnQgbGlzdCBvZiB0YWdzIGFuZCB1cGRhdGUgdGhlIHRhZyB3aWRnZXRzIC0gZGlzcG9zZSBpZlxuICAgICAqIHRoZSB0YWcgbm8gbG9uZ2VyIGV4aXN0cywgYW5kIGNyZWF0ZSBuZXcgd2lkZ2V0cyBmb3IgbmV3IHRhZ3MuXG4gICAgICovXG4gICAgcmVmcmVzaFRhZ3MoKSB7XG4gICAgICAgIHRoaXMucHVsbFRhZ3MoKTtcbiAgICAgICAgY29uc3QgbGF5b3V0ID0gdGhpcy5sYXlvdXQ7XG4gICAgICAgIGNvbnN0IHRhZ1dpZGdldHMgPSBsYXlvdXQud2lkZ2V0cy5maWx0ZXIodyA9PiB3LmlkICE9PSAnYWRkLXRhZycpO1xuICAgICAgICB0YWdXaWRnZXRzLmZvckVhY2god2lkZ2V0ID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy50YWdMaXN0LmluY2x1ZGVzKHdpZGdldC5uYW1lKSkge1xuICAgICAgICAgICAgICAgIHdpZGdldC5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0YWdXaWRnZXROYW1lcyA9IHRhZ1dpZGdldHMubWFwKHcgPT4gdy5uYW1lKTtcbiAgICAgICAgdGhpcy50YWdMaXN0LmZvckVhY2godGFnID0+IHtcbiAgICAgICAgICAgIGlmICghdGFnV2lkZ2V0TmFtZXMuaW5jbHVkZXModGFnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IGxheW91dC53aWRnZXRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgbGF5b3V0Lmluc2VydFdpZGdldChpZHgsIG5ldyBUYWdXaWRnZXQodGFnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSB0aGUgJ3RhZ3MnIG9mIGNlbGwgbWV0YWRhdGEsIGVuc3VyaW5nIGl0IGlzIGEgbGlzdCBvZiBzdHJpbmdzIGFuZFxuICAgICAqIHRoYXQgZWFjaCBzdHJpbmcgZG9lc24ndCBpbmNsdWRlIHNwYWNlcy5cbiAgICAgKi9cbiAgICB2YWxpZGF0ZVRhZ3MoY2VsbCwgdGFncykge1xuICAgICAgICB0YWdzID0gdGFncy5maWx0ZXIodGFnID0+IHR5cGVvZiB0YWcgPT09ICdzdHJpbmcnKTtcbiAgICAgICAgdGFncyA9IHJlZHVjZSh0YWdzLCAoYWxsVGFncywgdGFnKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gWy4uLmFsbFRhZ3MsIC4uLnRhZy5zcGxpdCgvWyxcXHNdKy8pXTtcbiAgICAgICAgfSwgW10pO1xuICAgICAgICBjb25zdCB2YWxpZFRhZ3MgPSBbLi4ubmV3IFNldCh0YWdzKV0uZmlsdGVyKHRhZyA9PiB0YWcgIT09ICcnKTtcbiAgICAgICAgY2VsbC5tb2RlbC5tZXRhZGF0YS5zZXQoJ3RhZ3MnLCB2YWxpZFRhZ3MpO1xuICAgICAgICB0aGlzLnJlZnJlc2hUYWdzKCk7XG4gICAgICAgIHRoaXMubG9hZEFjdGl2ZVRhZ3MoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBhY3RpdmUgY2VsbC5cbiAgICAgKi9cbiAgICBvbkFjdGl2ZUNlbGxDaGFuZ2VkKCkge1xuICAgICAgICB0aGlzLmxvYWRBY3RpdmVUYWdzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgdGFncyBvbmNlIGF2YWlsYWJsZS5cbiAgICAgKi9cbiAgICBvbkFmdGVyU2hvdygpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoVGFncygpO1xuICAgICAgICB0aGlzLmxvYWRBY3RpdmVUYWdzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwb24gYXR0YWNoLCBhZGQgbGFiZWwgaWYgaXQgZG9lc24ndCBhbHJlYWR5IGV4aXN0IGFuZCBsaXN0ZW4gZm9yIGNoYW5nZXNcbiAgICAgKiBmcm9tIHRoZSBub3RlYm9vayB0cmFja2VyLlxuICAgICAqL1xuICAgIG9uQWZ0ZXJBdHRhY2goKSB7XG4gICAgICAgIGlmICghdGhpcy5sYWJlbCkge1xuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSB0aGlzLl90cmFucy5fXygnQ2VsbCBUYWdzJyk7XG4gICAgICAgICAgICBsYWJlbC5jbGFzc05hbWUgPSAndGFnLWxhYmVsJztcbiAgICAgICAgICAgIHRoaXMucGFyZW50Lm5vZGUuaW5zZXJ0QmVmb3JlKGxhYmVsLCB0aGlzLm5vZGUpO1xuICAgICAgICAgICAgdGhpcy5sYWJlbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudHJhY2tlci5jdXJyZW50V2lkZ2V0KSB7XG4gICAgICAgICAgICB2b2lkIHRoaXMudHJhY2tlci5jdXJyZW50V2lkZ2V0LmNvbnRleHQucmVhZHkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoVGFncygpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZEFjdGl2ZVRhZ3MoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy50cmFja2VyLmN1cnJlbnRXaWRnZXQubW9kZWwuY2VsbHMuY2hhbmdlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hUYWdzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQWN0aXZlVGFncygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRyYWNrZXIuY3VycmVudFdpZGdldC5jb250ZW50LmFjdGl2ZUNlbGxDaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFRhZ3MoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRBY3RpdmVUYWdzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyYWNrZXIuY3VycmVudENoYW5nZWQuY29ubmVjdCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hUYWdzKCk7XG4gICAgICAgICAgICB0aGlzLmxvYWRBY3RpdmVUYWdzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gYWN0aXZlIGNlbGwgbWV0YWRhdGEuXG4gICAgICovXG4gICAgb25BY3RpdmVDZWxsTWV0YWRhdGFDaGFuZ2VkKCkge1xuICAgICAgICBjb25zdCB0YWdzID0gdGhpcy50cmFja2VyLmFjdGl2ZUNlbGwubW9kZWwubWV0YWRhdGEuZ2V0KCd0YWdzJyk7XG4gICAgICAgIGxldCB0YWdsaXN0ID0gW107XG4gICAgICAgIGlmICh0YWdzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRhZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGFnbGlzdC5wdXNoKHRhZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFnbGlzdCA9IHRhZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWxpZGF0ZVRhZ3ModGhpcy50cmFja2VyLmFjdGl2ZUNlbGwsIHRhZ2xpc3QpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvb2wuanMubWFwIiwiaW1wb3J0IHsgY2hlY2tJY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuLyoqXG4gKiBBIHdpZGdldCB3aGljaCBob3N0cyBhIGNlbGwgdGFncyBhcmVhLlxuICovXG5leHBvcnQgY2xhc3MgVGFnV2lkZ2V0IGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGFnIHdpZGdldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5hcHBsaWVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygndGFnJyk7XG4gICAgICAgIHRoaXMuYnVpbGRUYWcoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRhZyBkaXYgd2l0aCBpY29uIGFuZCBhdHRhY2ggdG8gdGhpcy5ub2RlLlxuICAgICAqL1xuICAgIGJ1aWxkVGFnKCkge1xuICAgICAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gdGhpcy5uYW1lO1xuICAgICAgICB0ZXh0LnN0eWxlLnRleHRPdmVyZmxvdyA9ICdlbGxpcHNpcyc7XG4gICAgICAgIGNvbnN0IHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0YWcuY2xhc3NOYW1lID0gJ3RhZy1ob2xkZXInO1xuICAgICAgICB0YWcuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgICAgIGNvbnN0IGljb25Db250YWluZXIgPSBjaGVja0ljb24uZWxlbWVudCh7XG4gICAgICAgICAgICB0YWc6ICdzcGFuJyxcbiAgICAgICAgICAgIGVsZW1lbnRQb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxOHB4JyxcbiAgICAgICAgICAgIHdpZHRoOiAnMThweCcsXG4gICAgICAgICAgICBtYXJnaW5MZWZ0OiAnNXB4JyxcbiAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnLTNweCdcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmFwcGxpZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2FwcGxpZWQtdGFnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKCd1bmFwcGxpZWQtdGFnJyk7XG4gICAgICAgICAgICBpY29uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgICAgdGFnLmFwcGVuZENoaWxkKGljb25Db250YWluZXIpO1xuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQodGFnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGBhZnRlci1hdHRhY2hgIG1lc3NhZ2VzIGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIG9uQWZ0ZXJBdHRhY2goKSB7XG4gICAgICAgIHRoaXMubm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGBiZWZvcmUtZGV0YWNoYCBtZXNzYWdlcyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBvbkJlZm9yZURldGFjaCgpIHtcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIERPTSBldmVudHMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnQgLSBUaGUgRE9NIGV2ZW50IHNlbnQgdG8gdGhlIHdpZGdldC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIG1ldGhvZCBpbXBsZW1lbnRzIHRoZSBET00gYEV2ZW50TGlzdGVuZXJgIGludGVyZmFjZSBhbmQgaXNcbiAgICAgKiBjYWxsZWQgaW4gcmVzcG9uc2UgdG8gZXZlbnRzIG9uIHRoZSBkb2NrIHBhbmVsJ3Mgbm9kZS4gSXQgc2hvdWxkXG4gICAgICogbm90IGJlIGNhbGxlZCBkaXJlY3RseSBieSB1c2VyIGNvZGUuXG4gICAgICovXG4gICAgaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dENsaWNrKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb3VzZW92ZXInOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dE1vdXNlT3ZlcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW91c2VvdXQnOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dE1vdXNlT3V0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgdXBkYXRlLXJlcXVlc3RgIG1lc3NhZ2VzLiBDaGVjayBpZiBhcHBsaWVkIHRvIGN1cnJlbnQgYWN0aXZlIGNlbGwuXG4gICAgICovXG4gICAgb25VcGRhdGVSZXF1ZXN0KCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGFwcGxpZWQgPSAoX2EgPSB0aGlzLnBhcmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNoZWNrQXBwbGllZCh0aGlzLm5hbWUpO1xuICAgICAgICBpZiAoYXBwbGllZCAhPT0gdGhpcy5hcHBsaWVkKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUFwcGxpZWQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgc3R5bGluZyB0byByZWZsZWN0IHdoZXRoZXIgdGFnIGlzIGFwcGxpZWQgdG8gY3VycmVudCBhY3RpdmUgY2VsbC5cbiAgICAgKi9cbiAgICB0b2dnbGVBcHBsaWVkKCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBpZiAodGhpcy5hcHBsaWVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdhcHBsaWVkLXRhZycpO1xuICAgICAgICAgICAgKChfYSA9IHRoaXMubm9kZS5maXJzdENoaWxkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGFzdENoaWxkKS5zdHlsZS5kaXNwbGF5ID1cbiAgICAgICAgICAgICAgICAnbm9uZSc7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKCd1bmFwcGxpZWQtdGFnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCd1bmFwcGxpZWQtdGFnJyk7XG4gICAgICAgICAgICAoKF9iID0gdGhpcy5ub2RlLmZpcnN0Q2hpbGQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5sYXN0Q2hpbGQpLnN0eWxlLmRpc3BsYXkgPVxuICAgICAgICAgICAgICAgICdpbmxpbmUtYmxvY2snO1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcygnYXBwbGllZC10YWcnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFwcGxpZWQgPSAhdGhpcy5hcHBsaWVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGAnY2xpY2snYCBldmVudCBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBfZXZ0Q2xpY2soKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmICh0aGlzLmFwcGxpZWQpIHtcbiAgICAgICAgICAgIChfYSA9IHRoaXMucGFyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlVGFnKHRoaXMubmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAoX2IgPSB0aGlzLnBhcmVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFkZFRhZyh0aGlzLm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudG9nZ2xlQXBwbGllZCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGAnbW91c2VvdmVyJ2AgZXZlbnQgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgX2V2dE1vdXNlT3ZlcigpIHtcbiAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5hZGQoJ3RhZy1ob3ZlcicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGAnbW91c2VvdXQnYCBldmVudCBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBfZXZ0TW91c2VPdXQoKSB7XG4gICAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QucmVtb3ZlKCd0YWctaG92ZXInKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD13aWRnZXQuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==