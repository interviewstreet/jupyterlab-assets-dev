(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_documentsearch_lib_index_js"],{

/***/ "../../packages/documentsearch/lib/index.js":
/*!**************************************************!*\
  !*** ../../packages/documentsearch/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CodeMirrorSearchProvider": () => (/* reexport safe */ _providers_codemirrorsearchprovider__WEBPACK_IMPORTED_MODULE_0__.CodeMirrorSearchProvider),
/* harmony export */   "SearchState": () => (/* reexport safe */ _providers_codemirrorsearchprovider__WEBPACK_IMPORTED_MODULE_0__.SearchState),
/* harmony export */   "FOUND_CLASSES": () => (/* reexport safe */ _providers_genericsearchprovider__WEBPACK_IMPORTED_MODULE_1__.FOUND_CLASSES),
/* harmony export */   "GenericSearchProvider": () => (/* reexport safe */ _providers_genericsearchprovider__WEBPACK_IMPORTED_MODULE_1__.GenericSearchProvider),
/* harmony export */   "NotebookSearchProvider": () => (/* reexport safe */ _providers_notebooksearchprovider__WEBPACK_IMPORTED_MODULE_2__.NotebookSearchProvider),
/* harmony export */   "SearchInstance": () => (/* reexport safe */ _searchinstance__WEBPACK_IMPORTED_MODULE_3__.SearchInstance),
/* harmony export */   "SearchProviderRegistry": () => (/* reexport safe */ _searchproviderregistry__WEBPACK_IMPORTED_MODULE_4__.SearchProviderRegistry),
/* harmony export */   "ISearchProviderRegistry": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_5__.ISearchProviderRegistry)
/* harmony export */ });
/* harmony import */ var _providers_codemirrorsearchprovider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./providers/codemirrorsearchprovider */ "../../packages/documentsearch/lib/providers/codemirrorsearchprovider.js");
/* harmony import */ var _providers_genericsearchprovider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./providers/genericsearchprovider */ "../../packages/documentsearch/lib/providers/genericsearchprovider.js");
/* harmony import */ var _providers_notebooksearchprovider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./providers/notebooksearchprovider */ "../../packages/documentsearch/lib/providers/notebooksearchprovider.js");
/* harmony import */ var _searchinstance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./searchinstance */ "../../packages/documentsearch/lib/searchinstance.js");
/* harmony import */ var _searchproviderregistry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./searchproviderregistry */ "../../packages/documentsearch/lib/searchproviderregistry.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tokens */ "../../packages/documentsearch/lib/tokens.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module documentsearch
 */







//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/documentsearch/lib/providers/codemirrorsearchprovider.js":
/*!*******************************************************************************!*\
  !*** ../../packages/documentsearch/lib/providers/codemirrorsearchprovider.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CodeMirrorSearchProvider": () => (/* binding */ CodeMirrorSearchProvider),
/* harmony export */   "SearchState": () => (/* binding */ SearchState)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/codemirror */ "webpack/sharing/consume/default/@jupyterlab/codemirror/@jupyterlab/codemirror");
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/fileeditor */ "webpack/sharing/consume/default/@jupyterlab/fileeditor/@jupyterlab/fileeditor");
/* harmony import */ var _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! codemirror */ "webpack/sharing/consume/default/codemirror/codemirror");
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(codemirror__WEBPACK_IMPORTED_MODULE_4__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/*
  Parts of the implementation of the search in this file were derived from
  CodeMirror's search at:
  https://github.com/codemirror/CodeMirror/blob/c2676685866c571a1c9c82cb25018cc08b4d42b2/addon/search/search.js
  which is licensed with the following license:

  MIT License

  Copyright (C) 2017 by Marijn Haverbeke <marijnh@gmail.com> and others

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/





class CodeMirrorSearchProvider {
    constructor() {
        /**
         * Set to true if the widget under search is read-only, false
         * if it is editable.  Will be used to determine whether to show
         * the replace option.
         */
        this.isReadOnly = false;
        /**
         * Set whether or not the CodemirrorSearchProvider will wrap to the beginning
         * or end of the document on invocations of highlightNext or highlightPrevious, respectively
         */
        this.isSubProvider = false;
        this._matchState = {};
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal(this);
    }
    /**
     * Get an initial query value if applicable so that it can be entered
     * into the search box as an initial query
     *
     * @returns Initial value used to populate the search box.
     */
    getInitialQuery(searchTarget) {
        const cm = searchTarget.content.editor;
        const selection = cm.doc.getSelection();
        // if there are newlines, just return empty string
        return selection.search(/\r?\n|\r/g) === -1 ? selection : '';
    }
    /**
     * Initialize the search using the provided options.  Should update the UI
     * to highlight all matches and "select" whatever the first match should be.
     *
     * @param query A RegExp to be use to perform the search
     * @param searchTarget The widget to be searched
     * @param [filters={}] Filter parameters to pass to provider
     *
     * @returns A promise that resolves with a list of all matches
     */
    async startQuery(query, searchTarget, filters = {}) {
        if (!CodeMirrorSearchProvider.canSearchOn(searchTarget)) {
            throw new Error('Cannot find Codemirror instance to search');
        }
        // canSearchOn is a type guard that guarantees the type of .editor
        this._cm = searchTarget.content.editor;
        return this._startQuery(query);
    }
    /**
     * Initialize the search using a CodeMirrorEditor object.
     */
    async startQueryCodeMirror(query, searchTarget) {
        this._cm = searchTarget;
        return this._startQuery(query, false);
    }
    refreshOverlay() {
        this._refreshOverlay();
    }
    async _startQuery(query, refreshOverlay = true) {
        // no point in removing overlay in the middle of the search
        await this.endQuery(false);
        this._query = query;
        codemirror__WEBPACK_IMPORTED_MODULE_4__.on(this._cm.doc, 'change', this._onDocChanged.bind(this));
        if (refreshOverlay) {
            this._refreshOverlay();
        }
        this._setInitialMatches(query);
        const matches = this._parseMatchesFromState();
        if (matches.length === 0) {
            return [];
        }
        if (!this.isSubProvider) {
            const cursorMatch = this._findNext(false);
            const match = cursorMatch &&
                this._matchState[cursorMatch.from.line][cursorMatch.from.ch];
            this._currentMatch = match;
        }
        return matches;
    }
    /**
     * Clears state of a search provider to prepare for startQuery to be called
     * in order to start a new query or refresh an existing one.
     *
     * @returns A promise that resolves when the search provider is ready to
     * begin a new search.
     */
    async endQuery(removeOverlay = true) {
        this._matchState = {};
        this._currentMatch = null;
        if (removeOverlay) {
            this._cm.removeOverlay(this._overlay);
        }
        const from = this._cm.getCursor('from');
        const to = this._cm.getCursor('to');
        // Setting a reverse selection to allow search-as-you-type to maintain the
        // current selected match.  See comment in _findNext for more details.
        if (from !== to) {
            this._cm.setSelection({
                start: this._toEditorPos(to),
                end: this._toEditorPos(from)
            });
        }
        codemirror__WEBPACK_IMPORTED_MODULE_4__.off(this._cm.doc, 'change', this._onDocChanged.bind(this));
    }
    /**
     * Resets UI state, removes all matches.
     *
     * @returns A promise that resolves when all state has been cleaned up.
     */
    async endSearch() {
        if (!this.isSubProvider) {
            this._cm.focus();
        }
        return this.endQuery();
    }
    /**
     * Move the current match indicator to the next match.
     *
     * @returns A promise that resolves once the action has completed.
     */
    async highlightNext() {
        const cursorMatch = this._findNext(false);
        if (!cursorMatch) {
            return;
        }
        const match = this._matchState[cursorMatch.from.line][cursorMatch.from.ch];
        this._currentMatch = match;
        return match;
    }
    /**
     * Move the current match indicator to the previous match.
     *
     * @returns A promise that resolves once the action has completed.
     */
    async highlightPrevious() {
        const cursorMatch = this._findNext(true);
        if (!cursorMatch) {
            return;
        }
        const match = this._matchState[cursorMatch.from.line][cursorMatch.from.ch];
        this._currentMatch = match;
        return match;
    }
    /**
     * Replace the currently selected match with the provided text
     *
     * @returns A promise that resolves with a boolean indicating whether a replace occurred.
     */
    async replaceCurrentMatch(newText) {
        // If the current selection exactly matches the current match,
        // replace it.  Otherwise, just select the next match after the cursor.
        let replaceOccurred = false;
        if (this._currentMatchIsSelected()) {
            const cursor = this._cm.getSearchCursor(this._query, this._cm.getCursor('from'), !this._query.ignoreCase);
            if (!cursor.findNext()) {
                return replaceOccurred;
            }
            replaceOccurred = true;
            cursor.replace(newText);
        }
        await this.highlightNext();
        return replaceOccurred;
    }
    /**
     * Replace all matches in the notebook with the provided text
     *
     * @returns A promise that resolves with a boolean indicating whether a replace occurred.
     */
    async replaceAllMatches(newText) {
        let replaceOccurred = false;
        return new Promise((resolve, _) => {
            this._cm.operation(() => {
                const cursor = this._cm.getSearchCursor(this._query, undefined, !this._query.ignoreCase);
                while (cursor.findNext()) {
                    replaceOccurred = true;
                    cursor.replace(newText);
                }
                this._matchState = {};
                this._currentMatch = null;
                resolve(replaceOccurred);
            });
        });
    }
    /**
     * Report whether or not this provider has the ability to search on the given object
     */
    static canSearchOn(domain) {
        return (domain instanceof _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.MainAreaWidget &&
            domain.content instanceof _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_2__.FileEditor &&
            domain.content.editor instanceof _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_1__.CodeMirrorEditor);
    }
    /**
     * The same list of matches provided by the startQuery promise resolution
     */
    get matches() {
        return this._parseMatchesFromState();
    }
    get currentMatch() {
        return this._currentMatch;
    }
    /**
     * Signal indicating that something in the search has changed, so the UI should update
     */
    get changed() {
        return this._changed;
    }
    /**
     * The current index of the selected match.
     */
    get currentMatchIndex() {
        if (!this._currentMatch) {
            return null;
        }
        return this._currentMatch.index;
    }
    clearSelection() {
        return undefined;
    }
    get editor() {
        return this._cm;
    }
    _onDocChanged(_, changeObj) {
        var _a, _b;
        // If we get newlines added/removed, the line numbers across the
        // match state are all shifted, so here we need to recalculate it
        if (changeObj.text.length > 1 || ((_b = (_a = changeObj.removed) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 1) {
            this._setInitialMatches(this._query);
            this._changed.emit(undefined);
        }
    }
    _refreshOverlay() {
        this._cm.operation(() => {
            // clear search first
            this._cm.removeOverlay(this._overlay);
            this._overlay = this._getSearchOverlay();
            this._cm.addOverlay(this._overlay);
            this._changed.emit(undefined);
        });
    }
    /**
     * Do a full search on the entire document.
     *
     * This manually constructs the initial match state across the whole
     * document. This must be done manually because the codemirror overlay
     * is lazy-loaded, so it will only tokenize lines that are in or near
     * the viewport.  This is sufficient for efficiently maintaining the
     * state when changes are made to the document, as changes occur in or
     * near the viewport, but to scan the whole document, a manual search
     * across the entire content is required.
     *
     * @param query The search term
     */
    _setInitialMatches(query) {
        this._matchState = {};
        const start = codemirror__WEBPACK_IMPORTED_MODULE_4__.Pos(this._cm.doc.firstLine(), 0);
        const end = codemirror__WEBPACK_IMPORTED_MODULE_4__.Pos(this._cm.doc.lastLine());
        const content = this._cm.doc.getRange(start, end);
        const lines = content.split('\n');
        const totalMatchIndex = 0;
        lines.forEach((line, lineNumber) => {
            query.lastIndex = 0;
            let match = query.exec(line);
            while (match) {
                const col = match.index;
                const matchObj = {
                    text: match[0],
                    line: lineNumber,
                    column: col,
                    fragment: line,
                    index: totalMatchIndex
                };
                if (!this._matchState[lineNumber]) {
                    this._matchState[lineNumber] = {};
                }
                this._matchState[lineNumber][col] = matchObj;
                match = query.exec(line);
            }
        });
    }
    _getSearchOverlay() {
        return {
            /**
             * Token function is called when a line needs to be processed -
             * when the overlay is initially created, it's called on all lines;
             * when a line is modified and needs to be re-evaluated, it's called
             * on just that line.
             *
             * This implementation of the token function both constructs/maintains
             * the overlay and keeps track of the match state as the document is
             * updated while a search is active.
             */
            token: (stream) => {
                const currentPos = stream.pos;
                this._query.lastIndex = currentPos;
                const lineText = stream.string;
                const match = this._query.exec(lineText);
                const line = stream.lineOracle.line;
                // If starting at position 0, the tokenization of this line has just started.
                // Blow away everything on this line in the state so it can be updated.
                if (stream.start === currentPos &&
                    currentPos === 0 &&
                    !!this._matchState[line]) {
                    this._matchState[line] = {};
                }
                if (match && match.index === currentPos) {
                    // found match, add it to state
                    const matchLength = match[0].length;
                    const matchObj = {
                        text: lineText.substr(currentPos, matchLength),
                        line: line,
                        column: currentPos,
                        fragment: lineText,
                        index: 0 // fill in index when flattening, later
                    };
                    if (!this._matchState[line]) {
                        this._matchState[line] = {};
                    }
                    this._matchState[line][currentPos] = matchObj;
                    // move the stream along and return searching style for the token
                    stream.pos += matchLength || 1;
                    // if the last thing on the line was a match, make sure we still
                    // emit the changed signal so the display can pick up the updates
                    if (stream.eol()) {
                        this._changed.emit(undefined);
                    }
                    return 'searching';
                }
                else if (match) {
                    // there's a match in the stream, advance the stream to its position
                    stream.pos = match.index;
                }
                else {
                    // no matches, consume the rest of the stream
                    this._changed.emit(undefined);
                    stream.skipToEnd();
                }
            }
        };
    }
    _findNext(reverse) {
        return this._cm.operation(() => {
            const caseSensitive = this._query.ignoreCase;
            // In order to support search-as-you-type, we needed a way to allow the first
            // match to be selected when a search is started, but prevent the selected
            // search to move for each new keypress.  To do this, when a search is ended,
            // the cursor is reversed, putting the head at the 'from' position.  When a new
            // search is started, the cursor we want is at the 'from' position, so that the same
            // match is selected when the next key is entered (if it is still a match).
            //
            // When toggling through a search normally, the cursor is always set in the forward
            // direction, so head is always at the 'to' position.  That way, if reverse = false,
            // the search proceeds from the 'to' position during normal toggling.  If reverse = true,
            // the search always proceeds from the 'anchor' position, which is at the 'from'.
            const cursorToGet = reverse ? 'anchor' : 'head';
            const lastPosition = this._cm.getCursor(cursorToGet);
            const position = this._toEditorPos(lastPosition);
            let cursor = this._cm.getSearchCursor(this._query, lastPosition, !caseSensitive);
            if (!cursor.find(reverse)) {
                // if we don't want to loop, no more matches found, reset the cursor and exit
                if (this.isSubProvider) {
                    this._cm.setCursorPosition(position, { scroll: false });
                    this._currentMatch = null;
                    return null;
                }
                // if we do want to loop, try searching from the bottom/top
                const startOrEnd = reverse
                    ? codemirror__WEBPACK_IMPORTED_MODULE_4__.Pos(this._cm.lastLine())
                    : codemirror__WEBPACK_IMPORTED_MODULE_4__.Pos(this._cm.firstLine(), 0);
                cursor = this._cm.getSearchCursor(this._query, startOrEnd, !caseSensitive);
                if (!cursor.find(reverse)) {
                    return null;
                }
            }
            const fromPos = cursor.from();
            const toPos = cursor.to();
            const selRange = {
                start: {
                    line: fromPos.line,
                    column: fromPos.ch
                },
                end: {
                    line: toPos.line,
                    column: toPos.ch
                }
            };
            this._cm.setSelection(selRange);
            this._cm.scrollIntoView({
                from: fromPos,
                to: toPos
            }, 100);
            return {
                from: fromPos,
                to: toPos
            };
        });
    }
    _parseMatchesFromState() {
        let index = 0;
        // Flatten state map and update the index of each match
        const matches = Object.keys(this._matchState).reduce((result, lineNumber) => {
            const lineKey = parseInt(lineNumber, 10);
            const lineMatches = this._matchState[lineKey];
            Object.keys(lineMatches).forEach((pos) => {
                const posKey = parseInt(pos, 10);
                const match = lineMatches[posKey];
                match.index = index;
                index += 1;
                result.push(match);
            });
            return result;
        }, []);
        return matches;
    }
    _toEditorPos(posIn) {
        return {
            line: posIn.line,
            column: posIn.ch
        };
    }
    _currentMatchIsSelected() {
        if (!this._currentMatch) {
            return false;
        }
        const currentSelection = this._cm.getSelection();
        const currentSelectionLength = currentSelection.end.column - currentSelection.start.column;
        const selectionIsOneLine = currentSelection.start.line === currentSelection.end.line;
        return (this._currentMatch.line === currentSelection.start.line &&
            this._currentMatch.column === currentSelection.start.column &&
            this._currentMatch.text.length === currentSelectionLength &&
            selectionIsOneLine);
    }
}
class SearchState {
}
//# sourceMappingURL=codemirrorsearchprovider.js.map

/***/ }),

/***/ "../../packages/documentsearch/lib/providers/genericsearchprovider.js":
/*!****************************************************************************!*\
  !*** ../../packages/documentsearch/lib/providers/genericsearchprovider.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FOUND_CLASSES": () => (/* binding */ FOUND_CLASSES),
/* harmony export */   "GenericSearchProvider": () => (/* binding */ GenericSearchProvider)
/* harmony export */ });
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_1__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


const FOUND_CLASSES = ['cm-string', 'cm-overlay', 'cm-searching'];
const SELECTED_CLASSES = ['CodeMirror-selectedtext'];
class GenericSearchProvider {
    constructor() {
        /**
         * Set to true if the widget under search is read-only, false
         * if it is editable.  Will be used to determine whether to show
         * the replace option.
         */
        this.isReadOnly = true;
        /**
         * Set whether or not this will wrap to the beginning
         * or end of the document on invocations of highlightNext or highlightPrevious, respectively
         */
        this.isSubProvider = false;
        this._matches = [];
        this._mutationObserver = new MutationObserver(this._onWidgetChanged.bind(this));
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal(this);
    }
    /**
     * Get an initial query value if applicable so that it can be entered
     * into the search box as an initial query
     *
     * @returns Initial value used to populate the search box.
     */
    getInitialQuery(searchTarget) {
        return '';
    }
    /**
     * Initialize the search using the provided options.  Should update the UI
     * to highlight all matches and "select" whatever the first match should be.
     *
     * @param query A RegExp to be use to perform the search
     * @param searchTarget The widget to be searched
     * @param [filters={}] Filter parameters to pass to provider
     *
     * @returns A promise that resolves with a list of all matches
     */
    async startQuery(query, searchTarget, filters = {}) {
        const that = this; // eslint-disable-line
        // No point in removing overlay in the middle of the search
        await this.endQuery(false);
        this._widget = searchTarget;
        this._query = query;
        this._mutationObserver.disconnect();
        const matches = [];
        const walker = document.createTreeWalker(this._widget.node, NodeFilter.SHOW_TEXT, {
            acceptNode: node => {
                // Filter subtrees of UNSUPPORTED_ELEMENTS and nodes that
                // do not contain our search text
                let parentElement = node.parentElement;
                while (parentElement !== this._widget.node) {
                    if (parentElement.nodeName in
                        GenericSearchProvider.UNSUPPORTED_ELEMENTS) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    parentElement = parentElement.parentElement;
                }
                return that._query.test(node.textContent)
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
            }
        }, false);
        const nodes = [];
        const originalNodes = [];
        // We MUST gather nodes first, otherwise the updates below will find each result twice
        let node = walker.nextNode();
        while (node) {
            nodes.push(node);
            /* We store them here as we want to avoid saving a modified one
             * This happens with something like this: <pre><span>Hello</span> world</pre> and looking for o
             * The o in world is found after the o in hello which means the pre could have been modified already
             * While there may be a better data structure to do this for performance, this was easy to reason about.
             */
            originalNodes.push(node.parentElement.cloneNode(true));
            node = walker.nextNode();
        }
        // We'll need to copy the regexp to ensure its 'g' and that we start the index count from 0
        const flags = this._query.flags.indexOf('g') === -1 ? query.flags + 'g' : query.flags;
        nodes.forEach((node, nodeIndex) => {
            const q = new RegExp(query.source, flags);
            const subsections = [];
            let match = q.exec(node.textContent);
            while (match) {
                subsections.push({
                    start: match.index,
                    end: match.index + match[0].length,
                    text: match[0]
                });
                match = q.exec(node.textContent);
            }
            const originalNode = originalNodes[nodeIndex];
            const originalLength = node.textContent.length; // Node length will change below
            let lastNodeAdded = null;
            // Go backwards as index may change if we go forwards
            const newMatches = [];
            for (let idx = subsections.length - 1; idx >= 0; --idx) {
                const { start, end, text } = subsections[idx];
                // TODO: support tspan for svg when svg support is added
                const spannedNode = document.createElement('span');
                spannedNode.classList.add(...FOUND_CLASSES);
                spannedNode.textContent = text;
                // Splice the text out before we add it back in with a span
                node.textContent = `${node.textContent.slice(0, start)}${node.textContent.slice(end)}`;
                // Are we replacing somewhere in the middle?
                if ((node === null || node === void 0 ? void 0 : node.nodeType) == Node.TEXT_NODE) {
                    const endText = node.splitText(start);
                    node.parentNode.insertBefore(spannedNode, endText);
                    // Are we replacing from the start?
                }
                else if (start === 0) {
                    node.parentNode.prepend(spannedNode);
                    // Are we replacing at the end?
                }
                else if (end === originalLength) {
                    node.parentNode.append(spannedNode);
                    // Are the two results are adjacent to each other?
                }
                else if (lastNodeAdded && end === subsections[idx + 1].start) {
                    node.parentNode.insertBefore(spannedNode, lastNodeAdded);
                }
                lastNodeAdded = spannedNode;
                newMatches.unshift({
                    text,
                    fragment: '',
                    line: 0,
                    column: 0,
                    index: -1,
                    // GenericSearchFields
                    matchesIndex: -1,
                    indexInOriginal: idx,
                    spanElement: spannedNode,
                    originalNode
                });
            }
            matches.push(...newMatches);
        });
        matches.forEach((match, idx) => {
            // This may be changed when this is a subprovider :/
            match.index = idx;
            // TODO: matchesIndex is declared as readonly. Why are we setting it here?
            match.matchesIndex = idx;
        });
        if (!this.isSubProvider && matches.length > 0) {
            this._currentMatch = matches[0];
        }
        // Watch for future changes:
        this._mutationObserver.observe(this._widget.node, 
        // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit
        {
            attributes: false,
            characterData: true,
            childList: true,
            subtree: true
        });
        this._matches = matches;
        return this._matches;
    }
    refreshOverlay() {
        // We don't have an overlay, we are directly changing the DOM
    }
    /**
     * Clears state of a search provider to prepare for startQuery to be called
     * in order to start a new query or refresh an existing one.
     *
     * @returns A promise that resolves when the search provider is ready to
     * begin a new search.
     */
    async endQuery(removeOverlay = true) {
        this._matches.forEach(match => {
            // We already took care of this parent with another match
            if (match.indexInOriginal !== 0) {
                return;
            }
            match.spanElement.parentElement.replaceWith(match.originalNode);
        });
        this._matches = [];
        this._currentMatch = null;
        this._mutationObserver.disconnect();
    }
    /**
     * Resets UI state, removes all matches.
     *
     * @returns A promise that resolves when all state has been cleaned up.
     */
    async endSearch() {
        return this.endQuery();
    }
    /**
     * Move the current match indicator to the next match.
     *
     * @returns A promise that resolves once the action has completed.
     */
    async highlightNext() {
        return this._highlightNext(false);
    }
    /**
     * Move the current match indicator to the previous match.
     *
     * @returns A promise that resolves once the action has completed.
     */
    async highlightPrevious() {
        return this._highlightNext(true);
    }
    _highlightNext(reverse) {
        if (this._matches.length === 0) {
            return undefined;
        }
        if (!this._currentMatch) {
            this._currentMatch = reverse
                ? this._matches[this.matches.length - 1]
                : this._matches[0];
        }
        else {
            this._currentMatch.spanElement.classList.remove(...SELECTED_CLASSES);
            let nextIndex = reverse
                ? this._currentMatch.matchesIndex - 1
                : this._currentMatch.matchesIndex + 1;
            // When we are a subprovider, don't loop
            if (this.isSubProvider) {
                if (nextIndex < 0 || nextIndex >= this._matches.length) {
                    this._currentMatch = null;
                    return undefined;
                }
            }
            // Cheap way to make this a circular buffer
            nextIndex = (nextIndex + this._matches.length) % this._matches.length;
            this._currentMatch = this._matches[nextIndex];
        }
        if (this._currentMatch) {
            this._currentMatch.spanElement.classList.add(...SELECTED_CLASSES);
            // If not in view, scroll just enough to see it
            if (!elementInViewport(this._currentMatch.spanElement)) {
                this._currentMatch.spanElement.scrollIntoView(reverse);
            }
            this._currentMatch.spanElement.focus();
        }
        return this._currentMatch;
    }
    /**
     * Replace the currently selected match with the provided text
     *
     * @returns A promise that resolves with a boolean indicating whether a replace occurred.
     */
    async replaceCurrentMatch(newText) {
        return Promise.resolve(false);
    }
    /**
     * Replace all matches in the notebook with the provided text
     *
     * @returns A promise that resolves with a boolean indicating whether a replace occurred.
     */
    async replaceAllMatches(newText) {
        // This is read only, but we could loosen this in theory for input boxes...
        return Promise.resolve(false);
    }
    /**
     * Report whether or not this provider has the ability to search on the given object
     */
    static canSearchOn(domain) {
        return domain instanceof _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Widget;
    }
    /**
     * The same list of matches provided by the startQuery promise resolution
     */
    get matches() {
        // Ensure that no other fn can overwrite matches index property
        // We shallow clone each node
        return this._matches
            ? this._matches.map(m => Object.assign({}, m))
            : this._matches;
    }
    /**
     * Signal indicating that something in the search has changed, so the UI should update
     */
    get changed() {
        return this._changed;
    }
    /**
     * The current index of the selected match.
     */
    get currentMatchIndex() {
        if (!this._currentMatch) {
            return null;
        }
        return this._currentMatch.index;
    }
    get currentMatch() {
        return this._currentMatch;
    }
    clearSelection() {
        return;
    }
    async _onWidgetChanged(mutations, observer) {
        // This is typically cheap, but we do not control the rate of change or size of the output
        await this.startQuery(this._query, this._widget);
        this._changed.emit(undefined);
    }
}
/**
 * We choose opt out as most node types should be searched (e.g. script).
 * Even nodes like <data>, could have textContent we care about.
 *
 * Note: nodeName is capitalized, so we do the same here
 */
GenericSearchProvider.UNSUPPORTED_ELEMENTS = {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Document_metadata
    BASE: true,
    HEAD: true,
    LINK: true,
    META: true,
    STYLE: true,
    TITLE: true,
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Sectioning_root
    BODY: true,
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Content_sectioning
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Text_content
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Inline_text_semantics
    // Above is searched
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Image_and_multimedia
    AREA: true,
    AUDIO: true,
    IMG: true,
    MAP: true,
    TRACK: true,
    VIDEO: true,
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Embedded_content
    APPLET: true,
    EMBED: true,
    IFRAME: true,
    NOEMBED: true,
    OBJECT: true,
    PARAM: true,
    PICTURE: true,
    SOURCE: true,
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Scripting
    CANVAS: true,
    NOSCRIPT: true,
    SCRIPT: true,
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Demarcating_edits
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Table_content
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Forms
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Interactive_elements
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Web_Components
    // Above is searched
    // Other:
    SVG: true
};
function elementInViewport(el) {
    const boundingClientRect = el.getBoundingClientRect();
    return (boundingClientRect.top >= 0 &&
        boundingClientRect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        boundingClientRect.left >= 0 &&
        boundingClientRect.right <=
            (window.innerWidth || document.documentElement.clientWidth));
}
//# sourceMappingURL=genericsearchprovider.js.map

/***/ }),

/***/ "../../packages/documentsearch/lib/providers/notebooksearchprovider.js":
/*!*****************************************************************************!*\
  !*** ../../packages/documentsearch/lib/providers/notebooksearchprovider.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotebookSearchProvider": () => (/* binding */ NotebookSearchProvider)
/* harmony export */ });
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/cells */ "webpack/sharing/consume/default/@jupyterlab/cells/@jupyterlab/cells");
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! codemirror */ "webpack/sharing/consume/default/codemirror/codemirror");
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(codemirror__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _codemirrorsearchprovider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./codemirrorsearchprovider */ "../../packages/documentsearch/lib/providers/codemirrorsearchprovider.js");
/* harmony import */ var _genericsearchprovider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./genericsearchprovider */ "../../packages/documentsearch/lib/providers/genericsearchprovider.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







class NotebookSearchProvider {
    constructor() {
        /**
         * Set to true if the widget under search is read-only, false
         * if it is editable.  Will be used to determine whether to show
         * the replace option.
         */
        this.isReadOnly = false;
        this.hasOutputs = true;
        this._searchProviders = [];
        this._unRenderedMarkdownCells = [];
        this._cellsWithMatches = [];
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal(this);
    }
    /**
     * Get an initial query value if applicable so that it can be entered
     * into the search box as an initial query
     *
     * @returns Initial value used to populate the search box.
     */
    getInitialQuery(searchTarget) {
        var _a;
        const activeCell = searchTarget.content.activeCell;
        const selection = (_a = activeCell === null || activeCell === void 0 ? void 0 : activeCell.editor) === null || _a === void 0 ? void 0 : _a.doc.getSelection();
        // if there are newlines, just return empty string
        return (selection === null || selection === void 0 ? void 0 : selection.search(/\r?\n|\r/g)) === -1 ? selection : '';
    }
    /**
     * Initialize the search using the provided options. Should update the UI
     * to highlight all matches and "select" whatever the first match should be.
     *
     * @param query A RegExp to be use to perform the search
     * @param searchTarget The widget to be searched
     * @param filters Filter parameters to pass to provider
     *
     * @returns A promise that resolves with a list of all matches
     */
    async startQuery(query, searchTarget, filters) {
        this._searchTarget = searchTarget;
        let cells = this._searchTarget.content.widgets;
        this._filters =
            !filters || Object.entries(filters).length === 0
                ? { output: true, selectedCells: false }
                : filters;
        const selectedCells = cells.filter(cell => this._searchTarget.content.isSelectedOrActive(cell));
        if (this._filters.selectedCells && selectedCells.length > 0) {
            cells = selectedCells;
        }
        // hide the current notebook widget to prevent expensive layout re-calculation operations
        this._searchTarget.hide();
        let indexTotal = 0;
        const allMatches = [];
        // For each cell, create a search provider and collect the matches
        for (const cell of cells) {
            const cmEditor = cell.editor;
            const cmSearchProvider = new _codemirrorsearchprovider__WEBPACK_IMPORTED_MODULE_5__.CodeMirrorSearchProvider();
            cmSearchProvider.isSubProvider = true;
            // If a rendered MarkdownCell contains a match, unrender it so that
            // CodeMirror can show the match(es).  If the MarkdownCell is not
            // rendered, putting CodeMirror on the page, CodeMirror will not run
            // the mode, which will prevent the search from occurring.
            // Keep track so that the cell can be rerendered when the search is ended
            // or if there are no matches
            let cellShouldReRender = false;
            if (cell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.MarkdownCell && cell.rendered) {
                cell.rendered = false;
                cellShouldReRender = true;
            }
            // Unhide hidden cells for the same reason as above
            if (cell.inputHidden) {
                cell.inputHidden = false;
            }
            // chain promises to ensure indexing is sequential
            const matchesFromCell = await cmSearchProvider.startQueryCodeMirror(query, cmEditor);
            if (cell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.MarkdownCell) {
                if (matchesFromCell.length !== 0) {
                    // un-render markdown cells with matches
                    this._unRenderedMarkdownCells.push(cell);
                }
                else if (cellShouldReRender) {
                    // was rendered previously, no need to refresh
                    cell.rendered = true;
                }
            }
            if (matchesFromCell.length !== 0) {
                cmSearchProvider.refreshOverlay();
                this._cellsWithMatches.push(cell);
            }
            // update the match indices to reflect the whole document index values
            matchesFromCell.forEach(match => {
                match.index = match.index + indexTotal;
            });
            indexTotal += matchesFromCell.length;
            // search has been initialized, connect the changed signal
            cmSearchProvider.changed.connect(this._onSearchProviderChanged, this);
            allMatches.concat(matchesFromCell);
            this._searchProviders.push({
                cell: cell,
                provider: cmSearchProvider
            });
            if (cell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.CodeCell && this._filters.output) {
                const outputProvider = new _genericsearchprovider__WEBPACK_IMPORTED_MODULE_6__.GenericSearchProvider();
                outputProvider.isSubProvider = true;
                const matchesFromOutput = await outputProvider.startQuery(query, cell.outputArea);
                matchesFromOutput.map(match => {
                    match.index = match.index + indexTotal;
                });
                indexTotal += matchesFromOutput.length;
                allMatches.concat(matchesFromOutput);
                outputProvider.changed.connect(this._onSearchProviderChanged, this);
                this._searchProviders.push({
                    cell: cell,
                    provider: outputProvider
                });
            }
        }
        // show the widget again, recalculation of layout will matter again
        // and so that the next step will scroll correctly to the first match
        this._searchTarget.show();
        this._currentMatch = await this._stepNext(this._updatedCurrentProvider(false));
        this._refreshCurrentCellEditor();
        this._refreshCellsEditorsInBackground(this._cellsWithMatches);
        return allMatches;
    }
    /**
     * Gradually refresh cells in the background so that the user will not
     * experience frozen interface, `n` cells at a time.
     */
    _refreshCellsEditorsInBackground(cells, n = 5) {
        let i = 0;
        const refreshNextNCells = () => {
            for (let stop = i + n; i < stop && i < cells.length; i++) {
                cells[i].editor.refresh();
            }
            if (i < cells.length) {
                window.setTimeout(refreshNextNCells, 0);
            }
        };
        window.setTimeout(refreshNextNCells, 0);
    }
    /**
     * Refresh the editor in the cell for the current match.
     */
    _refreshCurrentCellEditor() {
        const notebook = this._searchTarget.content;
        notebook.activeCell.editor.refresh();
    }
    /**
     * Clears state of a search provider to prepare for startQuery to be called
     * in order to start a new query or refresh an existing one.
     *
     * @returns A promise that resolves when the search provider is ready to
     * begin a new search.
     */
    async endQuery() {
        this._searchTarget.hide();
        const queriesEnded = [];
        this._searchProviders.forEach(({ provider }) => {
            queriesEnded.push(provider.endQuery());
            provider.changed.disconnect(this._onSearchProviderChanged, this);
        });
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal.disconnectBetween(this._searchTarget.model.cells, this);
        this._searchProviders = [];
        this._currentProvider = null;
        this._unRenderedMarkdownCells.forEach((cell) => {
            // Guard against the case where markdown cells have been deleted
            if (!cell.isDisposed) {
                cell.rendered = true;
            }
        });
        this._unRenderedMarkdownCells = [];
        await Promise.all(queriesEnded);
        this._searchTarget.show();
        this._refreshCurrentCellEditor();
        // re-render all non-markdown cells with matches (which were rendered, thus do not need refreshing)
        this._refreshCellsEditorsInBackground(this._cellsWithMatches.filter((cell) => !(cell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.MarkdownCell)));
        this._cellsWithMatches = [];
    }
    /**
     * Resets UI state, removes all matches.
     *
     * @returns A promise that resolves when all state has been cleaned up.
     */
    async endSearch() {
        this._searchTarget.hide();
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal.disconnectBetween(this._searchTarget.model.cells, this);
        const index = this._searchTarget.content.activeCellIndex;
        const searchEnded = [];
        this._searchProviders.forEach(({ provider }) => {
            searchEnded.push(provider.endSearch());
            provider.changed.disconnect(this._onSearchProviderChanged, this);
        });
        this._searchProviders = [];
        this._currentProvider = null;
        this._unRenderedMarkdownCells.forEach((cell) => {
            cell.rendered = true;
        });
        this._unRenderedMarkdownCells = [];
        this._searchTarget.content.activeCellIndex = index;
        this._searchTarget.content.mode = 'edit';
        this._currentMatch = null;
        await Promise.all(searchEnded);
        this._searchTarget.show();
        this._refreshCurrentCellEditor();
        this._searchTarget = null;
        // re-render all non-markdown cells with matches (which were rendered, thus do not need refreshing)
        this._refreshCellsEditorsInBackground(this._cellsWithMatches.filter((cell) => !(cell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.MarkdownCell)));
        this._cellsWithMatches = [];
    }
    /**
     * Move the current match indicator to the next match.
     *
     * @returns A promise that resolves once the action has completed.
     */
    async highlightNext() {
        this._currentMatch = await this._stepNext(this._updatedCurrentProvider(false));
        return this._currentMatch;
    }
    /**
     * Move the current match indicator to the previous match.
     *
     * @returns A promise that resolves once the action has completed.
     */
    async highlightPrevious() {
        this._currentMatch = await this._stepNext(this._updatedCurrentProvider(true), true);
        return this._currentMatch;
    }
    /**
     * Replace the currently selected match with the provided text
     *
     * @returns A promise that resolves with a boolean indicating whether a replace occurred.
     */
    async replaceCurrentMatch(newText) {
        const notebook = this._searchTarget.content;
        const editor = notebook.activeCell.editor;
        let replaceOccurred = false;
        if (this._currentMatchIsSelected(editor)) {
            const { provider } = this._currentProvider;
            replaceOccurred = await provider.replaceCurrentMatch(newText);
            if (replaceOccurred) {
                this._currentMatch = provider.currentMatch;
                // If there was a replacement and there is another match, then the CodeMirrorSearchProvider
                // already highlighted the next match, so we can return early to avoid skipping a match.
                if (this._currentMatch) {
                    return replaceOccurred;
                }
            }
        }
        await this.highlightNext();
        return replaceOccurred;
    }
    /**
     * Replace all matches in the notebook with the provided text
     *
     * @returns A promise that resolves with a boolean indicating whether a replace occurred.
     */
    async replaceAllMatches(newText) {
        let replaceOccurred = false;
        for (const index in this._searchProviders) {
            const { provider } = this._searchProviders[index];
            const singleReplaceOccurred = await provider.replaceAllMatches(newText);
            replaceOccurred = singleReplaceOccurred ? true : replaceOccurred;
        }
        this._currentMatch = null;
        return replaceOccurred;
    }
    /**
     * Report whether or not this provider has the ability to search on the given object
     */
    static canSearchOn(domain) {
        // check to see if the CMSearchProvider can search on the
        // first cell, false indicates another editor is present
        return domain instanceof _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookPanel;
    }
    /**
     * The same list of matches provided by the startQuery promise resolution
     */
    get matches() {
        return [].concat(...this._getMatchesFromCells());
    }
    /**
     * Signal indicating that something in the search has changed, so the UI should update
     */
    get changed() {
        return this._changed;
    }
    /**
     * The current index of the selected match.
     */
    get currentMatchIndex() {
        if (!this._currentMatch) {
            return null;
        }
        return this._currentMatch.index;
    }
    _updatedCurrentProvider(reverse) {
        if (this._currentProvider &&
            this._currentProvider.cell === this._searchTarget.content.activeCell) {
            return this._currentProvider;
        }
        let provider;
        if (!this._currentProvider) {
            const find = reverse ? _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.ArrayExt.findLastValue : _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.ArrayExt.findFirstValue;
            provider = find(this._searchProviders, provider => this._searchTarget.content.activeCell === provider.cell);
        }
        else {
            const currentProviderIndex = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.ArrayExt.firstIndexOf(this._searchProviders, this._currentProvider);
            const nextProviderIndex = ((reverse ? currentProviderIndex - 1 : currentProviderIndex + 1) +
                this._searchProviders.length) %
                this._searchProviders.length;
            provider = this._searchProviders[nextProviderIndex];
        }
        this._currentProvider = provider;
        return provider;
    }
    async _stepNext(currentSearchPair, reverse = false, steps = 0) {
        const { provider } = currentSearchPair;
        // highlightNext/Previous will not be able to search rendered MarkdownCells or
        // hidden code cells, but that is okay here because in startQuery, we unrendered
        // all cells with matches and unhide all cells
        const match = reverse
            ? await provider.highlightPrevious()
            : await provider.highlightNext();
        // If there was no match in this cell, try the next cell
        if (!match) {
            const providerIndex = this._searchProviders.indexOf(currentSearchPair);
            const numProviders = this._searchProviders.length;
            // We have looped around the whole notebook and have searched the original
            // cell once more and found no matches.  Do not proceed with incrementing the
            // active cell index so that the active cell doesn't change
            if (steps === numProviders) {
                return undefined;
            }
            const nextIndex = ((reverse ? providerIndex - 1 : providerIndex + 1) + numProviders) %
                numProviders;
            const nextSearchPair = this._searchProviders[nextIndex];
            if (nextSearchPair.provider instanceof _codemirrorsearchprovider__WEBPACK_IMPORTED_MODULE_5__.CodeMirrorSearchProvider) {
                const editor = nextSearchPair.provider.editor;
                // move the cursor of the next cell to the start/end of the cell so it can
                // search the whole thing (but don't scroll because we haven't found anything yet)
                const newPosCM = reverse
                    ? codemirror__WEBPACK_IMPORTED_MODULE_4___default().Pos(editor.lastLine())
                    : codemirror__WEBPACK_IMPORTED_MODULE_4___default().Pos(editor.firstLine(), 0);
                const newPos = {
                    line: newPosCM.line,
                    column: newPosCM.ch
                };
                editor.setCursorPosition(newPos, { scroll: false });
            }
            this._currentProvider = nextSearchPair;
            return this._stepNext(nextSearchPair, reverse, steps + 1);
        }
        const notebook = this._searchTarget.content;
        notebook.activeCellIndex = notebook.widgets.indexOf(currentSearchPair.cell);
        return match;
    }
    _getMatchesFromCells() {
        let indexTotal = 0;
        const result = [];
        this._searchProviders.forEach(({ provider }) => {
            const cellMatches = provider.matches;
            cellMatches.forEach(match => {
                match.index = match.index + indexTotal;
            });
            indexTotal += cellMatches.length;
            result.push(cellMatches);
        });
        return result;
    }
    _onSearchProviderChanged() {
        this._changed.emit(undefined);
    }
    _currentMatchIsSelected(cm) {
        if (!this._currentMatch) {
            return false;
        }
        const currentSelection = cm.getSelection();
        const currentSelectionLength = currentSelection.end.column - currentSelection.start.column;
        const selectionIsOneLine = currentSelection.start.line === currentSelection.end.line;
        return (this._currentMatch.line === currentSelection.start.line &&
            this._currentMatch.column === currentSelection.start.column &&
            this._currentMatch.text.length === currentSelectionLength &&
            selectionIsOneLine);
    }
}
//# sourceMappingURL=notebooksearchprovider.js.map

/***/ }),

/***/ "../../packages/documentsearch/lib/searchinstance.js":
/*!***********************************************************!*\
  !*** ../../packages/documentsearch/lib/searchinstance.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SearchInstance": () => (/* binding */ SearchInstance)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _searchoverlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./searchoverlay */ "../../packages/documentsearch/lib/searchoverlay.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.






/**
 * Represents a search on a single widget.
 */
class SearchInstance {
    constructor(widget, searchProvider, translator, searchDebounceTime = 500) {
        this._displayState = {
            currentIndex: 0,
            totalMatches: 0,
            caseSensitive: false,
            useRegex: false,
            searchText: '',
            query: null,
            errorMessage: '',
            searchInputFocused: true,
            replaceInputFocused: false,
            forceFocus: true,
            replaceText: '',
            replaceEntryShown: false,
            filters: { output: true, selectedCells: false },
            filtersOpen: false
        };
        this._displayUpdateSignal = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal(this);
        this._isDisposed = false;
        this._disposed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal(this);
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        this._widget = widget;
        this._activeProvider = searchProvider;
        const initialQuery = this._activeProvider.getInitialQuery(this._widget);
        this._displayState.searchText = initialQuery || '';
        this._searchWidget = (0,_searchoverlay__WEBPACK_IMPORTED_MODULE_5__.createSearchOverlay)({
            widgetChanged: this._displayUpdateSignal,
            overlayState: this._displayState,
            onCaseSensitiveToggled: this._onCaseSensitiveToggled.bind(this),
            onRegexToggled: this._onRegexToggled.bind(this),
            onHighlightNext: this._highlightNext.bind(this),
            onHighlightPrevious: this._highlightPrevious.bind(this),
            onStartQuery: this._startQuery.bind(this),
            onReplaceCurrent: this._replaceCurrent.bind(this),
            onReplaceAll: this._replaceAll.bind(this),
            onEndSearch: this.dispose.bind(this),
            isReadOnly: this._activeProvider.isReadOnly,
            hasOutputs: this._activeProvider.hasOutputs || false,
            searchDebounceTime: searchDebounceTime,
            translator: this.translator
        });
        this._widget.disposed.connect(() => {
            this.dispose();
        });
        this._searchWidget.disposed.connect(() => {
            this._widget.activate();
            this.dispose();
        });
        // TODO: this does not update if the toolbar changes height.
        if (this._widget instanceof _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.MainAreaWidget) {
            // Offset the position of the search widget to not cover the toolbar.
            this._searchWidget.node.style.top = `${this._widget.toolbar.node.clientHeight}px`;
        }
        if (this._widget instanceof _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookPanel) {
            this._widget.content.activeCellChanged.connect(() => {
                if (this._displayState.query &&
                    this._displayState.filters.selectedCells) {
                    void this._startQuery(this._displayState.query, this._displayState.filters);
                }
            });
        }
        this._displaySearchWidget();
    }
    /**
     * The search widget.
     */
    get searchWidget() {
        return this._searchWidget;
    }
    /**
     * The search provider.
     */
    get provider() {
        return this._activeProvider;
    }
    /**
     * Focus the search widget input.
     */
    focusInput() {
        this._displayState.forceFocus = true;
        this._displayState.searchInputFocused = true;
        // Trigger a rerender without resetting the forceFocus.
        this._displayUpdateSignal.emit(this._displayState);
        this._displayState.forceFocus = false;
    }
    /**
     * Set the search text
     *
     * It does not trigger a view update.
     */
    setSearchText(search) {
        this._displayState.searchText = search;
    }
    /**
     * Set the replace text
     *
     * It does not trigger a view update.
     */
    setReplaceText(replace) {
        this._displayState.replaceText = replace;
    }
    /**
     * If there is a replace box, show it.
     */
    showReplace() {
        this._displayState.replaceEntryShown = true;
    }
    /**
     * Updates the match index and total display in the search widget.
     */
    updateIndices() {
        this._displayState.totalMatches = this._activeProvider.matches.length;
        this._displayState.currentIndex = this._activeProvider.currentMatchIndex;
        this._updateDisplay();
    }
    _updateDisplay() {
        // Reset the focus attribute to make sure we don't steal focus.
        this._displayState.forceFocus = false;
        // Trigger a rerender
        this._displayUpdateSignal.emit(this._displayState);
    }
    async _startQuery(query, filters) {
        // save the last query (or set it to the current query if this is the first)
        if (this._activeProvider && this._displayState.query) {
            await this._activeProvider.endQuery();
        }
        this._displayState.query = query;
        this._displayState.filters = filters;
        await this._activeProvider.startQuery(query, this._widget, filters);
        this.updateIndices();
        // this signal should get injected when the widget is
        // created and hooked up to react!
        this._activeProvider.changed.connect(this.updateIndices, this);
    }
    async _replaceCurrent(newText) {
        if (this._activeProvider && this._displayState.query) {
            await this._activeProvider.replaceCurrentMatch(newText);
            this.updateIndices();
        }
    }
    async _replaceAll(newText) {
        if (this._activeProvider && this._displayState.query) {
            await this._activeProvider.replaceAllMatches(newText);
            this.updateIndices();
        }
    }
    /**
     * Dispose of the resources held by the search instance.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        // If a query hasn't been executed yet, no need to call endSearch
        if (this._displayState.query) {
            void this._activeProvider.endSearch();
        }
        this._searchWidget.dispose();
        this._disposed.emit(undefined);
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal.clearData(this);
    }
    /**
     * Test if the object has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * A signal emitted when the object is disposed.
     */
    get disposed() {
        return this._disposed;
    }
    /**
     * Display search widget.
     */
    _displaySearchWidget() {
        if (!this._searchWidget.isAttached) {
            _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget.attach(this._searchWidget, this._widget.node);
        }
    }
    async _highlightNext() {
        if (!this._displayState.query) {
            return;
        }
        await this._activeProvider.highlightNext();
        this.updateIndices();
    }
    async _highlightPrevious() {
        if (!this._displayState.query) {
            return;
        }
        await this._activeProvider.highlightPrevious();
        this.updateIndices();
    }
    _onCaseSensitiveToggled() {
        this._displayState.caseSensitive = !this._displayState.caseSensitive;
        this._updateDisplay();
    }
    _onRegexToggled() {
        this._displayState.useRegex = !this._displayState.useRegex;
        this._updateDisplay();
    }
}
//# sourceMappingURL=searchinstance.js.map

/***/ }),

/***/ "../../packages/documentsearch/lib/searchoverlay.js":
/*!**********************************************************!*\
  !*** ../../packages/documentsearch/lib/searchoverlay.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSearchOverlay": () => (/* binding */ createSearchOverlay)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling/@lumino/polling");
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_polling__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.





const OVERLAY_CLASS = 'jp-DocumentSearch-overlay';
const OVERLAY_ROW_CLASS = 'jp-DocumentSearch-overlay-row';
const INPUT_CLASS = 'jp-DocumentSearch-input';
const INPUT_WRAPPER_CLASS = 'jp-DocumentSearch-input-wrapper';
const INPUT_BUTTON_CLASS_OFF = 'jp-DocumentSearch-input-button-off';
const INPUT_BUTTON_CLASS_ON = 'jp-DocumentSearch-input-button-on';
const INDEX_COUNTER_CLASS = 'jp-DocumentSearch-index-counter';
const UP_DOWN_BUTTON_WRAPPER_CLASS = 'jp-DocumentSearch-up-down-wrapper';
const UP_DOWN_BUTTON_CLASS = 'jp-DocumentSearch-up-down-button';
const ELLIPSES_BUTTON_CLASS = 'jp-DocumentSearch-ellipses-button';
const ELLIPSES_BUTTON_ENABLED_CLASS = 'jp-DocumentSearch-ellipses-button-enabled';
const REGEX_ERROR_CLASS = 'jp-DocumentSearch-regex-error';
const SEARCH_OPTIONS_CLASS = 'jp-DocumentSearch-search-options';
const SEARCH_OPTIONS_DISABLED_CLASS = 'jp-DocumentSearch-search-options-disabled';
const SEARCH_DOCUMENT_LOADING = 'jp-DocumentSearch-document-loading';
const REPLACE_ENTRY_CLASS = 'jp-DocumentSearch-replace-entry';
const REPLACE_BUTTON_CLASS = 'jp-DocumentSearch-replace-button';
const REPLACE_BUTTON_WRAPPER_CLASS = 'jp-DocumentSearch-replace-button-wrapper';
const REPLACE_WRAPPER_CLASS = 'jp-DocumentSearch-replace-wrapper-class';
const REPLACE_TOGGLE_CLASS = 'jp-DocumentSearch-replace-toggle';
const FOCUSED_INPUT = 'jp-DocumentSearch-focused-input';
const TOGGLE_WRAPPER = 'jp-DocumentSearch-toggle-wrapper';
const TOGGLE_PLACEHOLDER = 'jp-DocumentSearch-toggle-placeholder';
const BUTTON_CONTENT_CLASS = 'jp-DocumentSearch-button-content';
const BUTTON_WRAPPER_CLASS = 'jp-DocumentSearch-button-wrapper';
const SPACER_CLASS = 'jp-DocumentSearch-spacer';
class SearchEntry extends react__WEBPACK_IMPORTED_MODULE_4__.Component {
    constructor(props) {
        super(props);
        this.translator = props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this.searchInputRef = react__WEBPACK_IMPORTED_MODULE_4__.createRef();
    }
    /**
     * Focus the input.
     */
    focusInput() {
        var _a;
        // Select (and focus) any text already present.
        // This makes typing in the box starts a new query (the common case),
        // while arrow keys can be used to move cursor in preparation for
        // modifying previous query.
        (_a = this.searchInputRef.current) === null || _a === void 0 ? void 0 : _a.select();
    }
    componentDidUpdate() {
        if (this.props.forceFocus) {
            this.focusInput();
        }
    }
    render() {
        const caseButtonToggleClass = (0,_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.classes)(this.props.caseSensitive ? INPUT_BUTTON_CLASS_ON : INPUT_BUTTON_CLASS_OFF, BUTTON_CONTENT_CLASS);
        const regexButtonToggleClass = (0,_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.classes)(this.props.useRegex ? INPUT_BUTTON_CLASS_ON : INPUT_BUTTON_CLASS_OFF, BUTTON_CONTENT_CLASS);
        const wrapperClass = `${INPUT_WRAPPER_CLASS} ${this.props.inputFocused ? FOCUSED_INPUT : ''}`;
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: wrapperClass },
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("input", { placeholder: this.props.searchText ? undefined : this._trans.__('Find'), className: INPUT_CLASS, value: this.props.searchText, onChange: e => this.props.onChange(e), onKeyDown: e => this.props.onKeydown(e), tabIndex: 0, onFocus: e => this.props.onInputFocus(), onBlur: e => this.props.onInputBlur(), ref: this.searchInputRef }),
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("button", { className: BUTTON_WRAPPER_CLASS, onClick: () => this.props.onCaseSensitiveToggled(), tabIndex: 0 },
                react__WEBPACK_IMPORTED_MODULE_4__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.caseSensitiveIcon.react, { className: caseButtonToggleClass, tag: "span" })),
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("button", { className: BUTTON_WRAPPER_CLASS, onClick: () => this.props.onRegexToggled(), tabIndex: 0 },
                react__WEBPACK_IMPORTED_MODULE_4__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.regexIcon.react, { className: regexButtonToggleClass, tag: "span" }))));
    }
}
class ReplaceEntry extends react__WEBPACK_IMPORTED_MODULE_4__.Component {
    constructor(props) {
        super(props);
        this._trans = (props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator).load('jupyterlab');
        this.replaceInputRef = react__WEBPACK_IMPORTED_MODULE_4__.createRef();
    }
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: REPLACE_WRAPPER_CLASS },
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("input", { placeholder: this.props.replaceText ? undefined : this._trans.__('Replace'), className: REPLACE_ENTRY_CLASS, value: this.props.replaceText, onKeyDown: e => this.props.onReplaceKeydown(e), onChange: e => this.props.onChange(e), tabIndex: 0, ref: this.replaceInputRef }),
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("button", { className: REPLACE_BUTTON_WRAPPER_CLASS, onClick: () => this.props.onReplaceCurrent(), tabIndex: 0 },
                react__WEBPACK_IMPORTED_MODULE_4__.createElement("span", { className: `${REPLACE_BUTTON_CLASS} ${BUTTON_CONTENT_CLASS}`, tabIndex: 0 }, this._trans.__('Replace'))),
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("button", { className: REPLACE_BUTTON_WRAPPER_CLASS, tabIndex: 0, onClick: () => this.props.onReplaceAll() },
                react__WEBPACK_IMPORTED_MODULE_4__.createElement("span", { className: `${REPLACE_BUTTON_CLASS} ${BUTTON_CONTENT_CLASS}`, tabIndex: -1 }, this._trans.__('Replace All')))));
    }
}
function UpDownButtons(props) {
    return (react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: UP_DOWN_BUTTON_WRAPPER_CLASS },
        react__WEBPACK_IMPORTED_MODULE_4__.createElement("button", { className: BUTTON_WRAPPER_CLASS, onClick: () => props.onHighlightPrevious(), tabIndex: 0 },
            react__WEBPACK_IMPORTED_MODULE_4__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.caretUpEmptyThinIcon.react, { className: (0,_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.classes)(UP_DOWN_BUTTON_CLASS, BUTTON_CONTENT_CLASS), tag: "span" })),
        react__WEBPACK_IMPORTED_MODULE_4__.createElement("button", { className: BUTTON_WRAPPER_CLASS, onClick: () => props.onHighlightNext(), tabIndex: 0 },
            react__WEBPACK_IMPORTED_MODULE_4__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.caretDownEmptyThinIcon.react, { className: (0,_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.classes)(UP_DOWN_BUTTON_CLASS, BUTTON_CONTENT_CLASS), tag: "span" }))));
}
function SearchIndices(props) {
    return (react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: INDEX_COUNTER_CLASS }, props.totalMatches === 0
        ? '-/-'
        : `${props.currentIndex === null ? '-' : props.currentIndex + 1}/${props.totalMatches}`));
}
class FilterToggle extends react__WEBPACK_IMPORTED_MODULE_4__.Component {
    render() {
        let className = `${ELLIPSES_BUTTON_CLASS} ${BUTTON_CONTENT_CLASS}`;
        if (this.props.enabled) {
            className = `${className} ${ELLIPSES_BUTTON_ENABLED_CLASS}`;
        }
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement("button", { className: BUTTON_WRAPPER_CLASS, onClick: () => this.props.toggleEnabled(), tabIndex: 0 },
            react__WEBPACK_IMPORTED_MODULE_4__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.ellipsesIcon.react, { className: className, tag: "span", height: "20px", width: "20px" })));
    }
}
class FilterSelection extends react__WEBPACK_IMPORTED_MODULE_4__.Component {
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement("label", { className: SEARCH_OPTIONS_CLASS },
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_4__.createElement("span", { className: this.props.canToggleOutput ? '' : SEARCH_OPTIONS_DISABLED_CLASS }, this.props.trans.__('Search Cell Outputs')),
                react__WEBPACK_IMPORTED_MODULE_4__.createElement("input", { type: "checkbox", disabled: !this.props.canToggleOutput, checked: this.props.searchOutput, onChange: this.props.toggleOutput })),
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_4__.createElement("span", { className: this.props.canToggleSelectedCells
                        ? ''
                        : SEARCH_OPTIONS_DISABLED_CLASS }, this.props.trans.__('Search Selected Cell(s)')),
                react__WEBPACK_IMPORTED_MODULE_4__.createElement("input", { type: "checkbox", disabled: !this.props.canToggleSelectedCells, checked: this.props.searchSelectedCells, onChange: this.props.toggleSelectedCells }))));
    }
}
class SearchOverlay extends react__WEBPACK_IMPORTED_MODULE_4__.Component {
    constructor(props) {
        var _a;
        super(props);
        this.translator = props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this.state = props.overlayState;
        this.replaceEntryRef = react__WEBPACK_IMPORTED_MODULE_4__.createRef();
        this._debouncedStartSearch = new _lumino_polling__WEBPACK_IMPORTED_MODULE_3__.Debouncer(() => {
            this._executeSearch(true, this.state.searchText);
        }, (_a = props.searchDebounceTime) !== null && _a !== void 0 ? _a : 500);
        this._toggleSearchOutput = this._toggleSearchOutput.bind(this);
        this._toggleSearchSelectedCells = this._toggleSearchSelectedCells.bind(this);
    }
    componentDidMount() {
        if (this.state.searchText) {
            this._executeSearch(true, this.state.searchText);
        }
    }
    _onSearchChange(event) {
        const searchText = event.target.value;
        this.setState({ searchText: searchText });
        void this._debouncedStartSearch.invoke();
    }
    _onReplaceChange(event) {
        this.setState({ replaceText: event.target.value });
    }
    _onSearchKeydown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.stopPropagation();
            this._executeSearch(!event.shiftKey);
        }
        else if (event.keyCode === 27) {
            event.preventDefault();
            event.stopPropagation();
            this._onClose();
        }
    }
    _onReplaceKeydown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.stopPropagation();
            this.props.onReplaceCurrent(this.state.replaceText);
        }
    }
    _executeSearch(goForward, searchText, filterChanged = false) {
        // execute search!
        let query;
        const input = searchText ? searchText : this.state.searchText;
        try {
            query = Private.parseQuery(input, this.props.overlayState.caseSensitive, this.props.overlayState.useRegex);
            this.setState({ errorMessage: '' });
        }
        catch (e) {
            this.setState({ errorMessage: e.message });
            return;
        }
        if (Private.regexEqual(this.props.overlayState.query, query) &&
            !filterChanged) {
            if (goForward) {
                this.props.onHighlightNext();
            }
            else {
                this.props.onHighlightPrevious();
            }
            return;
        }
        this.props.onStartQuery(query, this.state.filters);
    }
    _onClose() {
        // Clean up and close widget.
        this.props.onEndSearch();
        this._debouncedStartSearch.dispose();
    }
    _onReplaceToggled() {
        this.setState({
            replaceEntryShown: !this.state.replaceEntryShown
        });
    }
    _onSearchInputFocus() {
        if (!this.state.searchInputFocused) {
            this.setState({ searchInputFocused: true });
        }
    }
    _onSearchInputBlur() {
        if (this.state.searchInputFocused) {
            this.setState({ searchInputFocused: false });
        }
    }
    _toggleSearchOutput() {
        this.setState(prevState => (Object.assign(Object.assign({}, prevState), { filters: Object.assign(Object.assign({}, prevState.filters), { output: !prevState.filters.output }) })), () => this._executeSearch(true, undefined, true));
    }
    _toggleSearchSelectedCells() {
        this.setState(prevState => (Object.assign(Object.assign({}, prevState), { filters: Object.assign(Object.assign({}, prevState.filters), { selectedCells: !prevState.filters.selectedCells }) })), () => this._executeSearch(true, undefined, true));
    }
    _toggleFiltersOpen() {
        this.setState(prevState => ({
            filtersOpen: !prevState.filtersOpen
        }));
    }
    render() {
        const showReplace = !this.props.isReadOnly && this.state.replaceEntryShown;
        const showFilter = this.props.hasOutputs;
        const filterToggle = showFilter ? (react__WEBPACK_IMPORTED_MODULE_4__.createElement(FilterToggle, { enabled: this.state.filtersOpen, toggleEnabled: () => this._toggleFiltersOpen() })) : null;
        const filter = showFilter ? (react__WEBPACK_IMPORTED_MODULE_4__.createElement(FilterSelection, { key: 'filter', canToggleOutput: !showReplace, canToggleSelectedCells: true, searchOutput: this.state.filters.output, searchSelectedCells: this.state.filters.selectedCells, toggleOutput: this._toggleSearchOutput, toggleSelectedCells: this._toggleSearchSelectedCells, trans: this.translator.load('jupyterlab') })) : null;
        const icon = this.state.replaceEntryShown ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.caretDownIcon : _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.caretRightIcon;
        // TODO: Error messages from regex are not currently localizable.
        return [
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: OVERLAY_ROW_CLASS, key: 0 },
                this.props.isReadOnly ? (react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: TOGGLE_PLACEHOLDER })) : (react__WEBPACK_IMPORTED_MODULE_4__.createElement("button", { className: TOGGLE_WRAPPER, onClick: () => this._onReplaceToggled(), tabIndex: 0 },
                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(icon.react, { className: `${REPLACE_TOGGLE_CLASS} ${BUTTON_CONTENT_CLASS}`, tag: "span", elementPosition: "center", height: "20px", width: "20px" }))),
                react__WEBPACK_IMPORTED_MODULE_4__.createElement(SearchEntry, { useRegex: this.props.overlayState.useRegex, caseSensitive: this.props.overlayState.caseSensitive, onCaseSensitiveToggled: () => {
                        this.props.onCaseSensitiveToggled();
                        this._executeSearch(true);
                    }, onRegexToggled: () => {
                        this.props.onRegexToggled();
                        this._executeSearch(true);
                    }, onKeydown: (e) => this._onSearchKeydown(e), onChange: (e) => this._onSearchChange(e), onInputFocus: this._onSearchInputFocus.bind(this), onInputBlur: this._onSearchInputBlur.bind(this), inputFocused: this.state.searchInputFocused, searchText: this.state.searchText, forceFocus: this.props.overlayState.forceFocus, translator: this.translator }),
                react__WEBPACK_IMPORTED_MODULE_4__.createElement(SearchIndices, { currentIndex: this.props.overlayState.currentIndex, totalMatches: this.props.overlayState.totalMatches }),
                react__WEBPACK_IMPORTED_MODULE_4__.createElement(UpDownButtons, { onHighlightPrevious: () => this._executeSearch(false), onHighlightNext: () => this._executeSearch(true) }),
                showReplace ? null : filterToggle,
                react__WEBPACK_IMPORTED_MODULE_4__.createElement("button", { className: BUTTON_WRAPPER_CLASS, onClick: () => this._onClose(), tabIndex: 0 },
                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.closeIcon.react, { className: "jp-icon-hover", elementPosition: "center", height: "16px", width: "16px" }))),
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: OVERLAY_ROW_CLASS, key: 1 }, showReplace ? (react__WEBPACK_IMPORTED_MODULE_4__.createElement(react__WEBPACK_IMPORTED_MODULE_4__.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_4__.createElement(ReplaceEntry, { onReplaceKeydown: (e) => this._onReplaceKeydown(e), onChange: (e) => this._onReplaceChange(e), onReplaceCurrent: () => this.props.onReplaceCurrent(this.state.replaceText), onReplaceAll: () => this.props.onReplaceAll(this.state.replaceText), replaceText: this.state.replaceText, ref: this.replaceEntryRef, translator: this.translator }),
                react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: SPACER_CLASS }),
                filterToggle)) : null),
            this.state.filtersOpen ? filter : null,
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: REGEX_ERROR_CLASS, hidden: !!this.state.errorMessage && this.state.errorMessage.length === 0, key: 3 }, this.state.errorMessage),
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: SEARCH_DOCUMENT_LOADING, key: 4 }, "This document is still loading. Only loaded content will appear in search results until the entire document loads.")
        ];
    }
}
function createSearchOverlay(options) {
    const { widgetChanged, overlayState, onCaseSensitiveToggled, onRegexToggled, onHighlightNext, onHighlightPrevious, onStartQuery, onReplaceCurrent, onReplaceAll, onEndSearch, isReadOnly, hasOutputs, searchDebounceTime, translator } = options;
    const widget = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_4__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.UseSignal, { signal: widgetChanged, initialArgs: overlayState }, (_, args) => {
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement(SearchOverlay, { onCaseSensitiveToggled: onCaseSensitiveToggled, onRegexToggled: onRegexToggled, onHighlightNext: onHighlightNext, onHighlightPrevious: onHighlightPrevious, onStartQuery: onStartQuery, onEndSearch: onEndSearch, onReplaceCurrent: onReplaceCurrent, onReplaceAll: onReplaceAll, overlayState: args, isReadOnly: isReadOnly, hasOutputs: hasOutputs, searchDebounceTime: searchDebounceTime, translator: translator }));
    }));
    widget.addClass(OVERLAY_CLASS);
    return widget;
}
var Private;
(function (Private) {
    function parseQuery(queryString, caseSensitive, regex) {
        const flag = caseSensitive ? 'g' : 'gi';
        // escape regex characters in query if its a string search
        const queryText = regex
            ? queryString
            : queryString.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
        let ret;
        ret = new RegExp(queryText, flag);
        if (ret.test('')) {
            ret = /x^/;
        }
        return ret;
    }
    Private.parseQuery = parseQuery;
    function regexEqual(a, b) {
        if (!a || !b) {
            return false;
        }
        return (a.source === b.source &&
            a.global === b.global &&
            a.ignoreCase === b.ignoreCase &&
            a.multiline === b.multiline);
    }
    Private.regexEqual = regexEqual;
})(Private || (Private = {}));
//# sourceMappingURL=searchoverlay.js.map

/***/ }),

/***/ "../../packages/documentsearch/lib/searchproviderregistry.js":
/*!*******************************************************************!*\
  !*** ../../packages/documentsearch/lib/searchproviderregistry.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SearchProviderRegistry": () => (/* binding */ SearchProviderRegistry)
/* harmony export */ });
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_1__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


class SearchProviderRegistry {
    constructor() {
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
        this._providerMap = new Map();
    }
    /**
     * Add a provider to the registry.
     *
     * @param key - The provider key.
     * @returns A disposable delegate that, when disposed, deregisters the given search provider
     */
    register(key, provider) {
        this._providerMap.set(key, provider);
        this._changed.emit();
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_0__.DisposableDelegate(() => {
            this._providerMap.delete(key);
            this._changed.emit();
        });
    }
    /**
     * Returns a matching provider for the widget.
     *
     * @param widget - The widget to search over.
     * @returns the search provider, or undefined if none exists.
     */
    getProviderForWidget(widget) {
        return this._findMatchingProvider(this._providerMap, widget);
    }
    /**
     * Signal that emits when a new search provider has been registered
     * or removed.
     */
    get changed() {
        return this._changed;
    }
    _findMatchingProvider(providerMap, widget) {
        // iterate through all providers and ask each one if it can search on the
        // widget.
        for (const P of providerMap.values()) {
            if (P.canSearchOn(widget)) {
                return new P();
            }
        }
        return undefined;
    }
}
//# sourceMappingURL=searchproviderregistry.js.map

/***/ }),

/***/ "../../packages/documentsearch/lib/tokens.js":
/*!***************************************************!*\
  !*** ../../packages/documentsearch/lib/tokens.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ISearchProviderRegistry": () => (/* binding */ ISearchProviderRegistry)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The search provider registry token.
 */
const ISearchProviderRegistry = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/documentsearch:ISearchProviderRegistry');
//# sourceMappingURL=tokens.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZG9jdW1lbnRzZWFyY2gvbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9kb2N1bWVudHNlYXJjaC9saWIvcHJvdmlkZXJzL2NvZGVtaXJyb3JzZWFyY2hwcm92aWRlci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZG9jdW1lbnRzZWFyY2gvbGliL3Byb3ZpZGVycy9nZW5lcmljc2VhcmNocHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2RvY3VtZW50c2VhcmNoL2xpYi9wcm92aWRlcnMvbm90ZWJvb2tzZWFyY2hwcm92aWRlci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZG9jdW1lbnRzZWFyY2gvbGliL3NlYXJjaGluc3RhbmNlLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9kb2N1bWVudHNlYXJjaC9saWIvc2VhcmNob3ZlcmxheS5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZG9jdW1lbnRzZWFyY2gvbGliL3NlYXJjaHByb3ZpZGVycmVnaXN0cnkuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2RvY3VtZW50c2VhcmNoL2xpYi90b2tlbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDNkI7QUFDd0I7QUFDSDtBQUNDO0FBQ2xCO0FBQ1E7QUFDaEI7QUFDekIsaUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNzRDtBQUNJO0FBQ047QUFDVDtBQUNGO0FBQ2xDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIscURBQU07QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsMENBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxRQUFRLDJDQUFjO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsZ0VBQWM7QUFDaEQsc0NBQXNDLDhEQUFVO0FBQ2hELDZDQUE2QyxvRUFBZ0I7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwyQ0FBYztBQUNwQyxvQkFBb0IsMkNBQWM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELGdCQUFnQjtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDJDQUFjO0FBQ3BDLHNCQUFzQiwyQ0FBYztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0Esb0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbmRBO0FBQ0E7QUFDMkM7QUFDRjtBQUNsQztBQUNQO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHFEQUFNO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RCwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNEO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxVQUFVO0FBQzVELHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxpQ0FBaUMsRUFBRSw0QkFBNEI7QUFDckc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxtREFBTTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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M0IseUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5UkE7QUFDQTtBQUN3RDtBQUNiO0FBQ3BDO0FBQ1A7QUFDQSw0QkFBNEIscURBQU07QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrRUFBa0I7QUFDckM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xEQTtBQUNBO0FBQzBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ08sb0NBQW9DLG9EQUFLO0FBQ2hELGtDIiwiZmlsZSI6InBhY2thZ2VzX2RvY3VtZW50c2VhcmNoX2xpYl9pbmRleF9qcy4zMTIyNWFhM2UzYzBhODdmN2QwMy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIGRvY3VtZW50c2VhcmNoXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlcyc7XG5leHBvcnQgKiBmcm9tICcuL3Byb3ZpZGVycy9jb2RlbWlycm9yc2VhcmNocHJvdmlkZXInO1xuZXhwb3J0ICogZnJvbSAnLi9wcm92aWRlcnMvZ2VuZXJpY3NlYXJjaHByb3ZpZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vcHJvdmlkZXJzL25vdGVib29rc2VhcmNocHJvdmlkZXInO1xuZXhwb3J0ICogZnJvbSAnLi9zZWFyY2hpbnN0YW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL3NlYXJjaHByb3ZpZGVycmVnaXN0cnknO1xuZXhwb3J0ICogZnJvbSAnLi90b2tlbnMnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLypcbiAgUGFydHMgb2YgdGhlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBzZWFyY2ggaW4gdGhpcyBmaWxlIHdlcmUgZGVyaXZlZCBmcm9tXG4gIENvZGVNaXJyb3IncyBzZWFyY2ggYXQ6XG4gIGh0dHBzOi8vZ2l0aHViLmNvbS9jb2RlbWlycm9yL0NvZGVNaXJyb3IvYmxvYi9jMjY3NjY4NTg2NmM1NzFhMWM5YzgyY2IyNTAxOGNjMDhiNGQ0MmIyL2FkZG9uL3NlYXJjaC9zZWFyY2guanNcbiAgd2hpY2ggaXMgbGljZW5zZWQgd2l0aCB0aGUgZm9sbG93aW5nIGxpY2Vuc2U6XG5cbiAgTUlUIExpY2Vuc2VcblxuICBDb3B5cmlnaHQgKEMpIDIwMTcgYnkgTWFyaWpuIEhhdmVyYmVrZSA8bWFyaWpuaEBnbWFpbC5jb20+IGFuZCBvdGhlcnNcblxuICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAgVEhFIFNPRlRXQVJFLlxuKi9cbmltcG9ydCB7IE1haW5BcmVhV2lkZ2V0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgQ29kZU1pcnJvckVkaXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL2NvZGVtaXJyb3InO1xuaW1wb3J0IHsgRmlsZUVkaXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL2ZpbGVlZGl0b3InO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuaW1wb3J0ICogYXMgQ29kZU1pcnJvciBmcm9tICdjb2RlbWlycm9yJztcbmV4cG9ydCBjbGFzcyBDb2RlTWlycm9yU2VhcmNoUHJvdmlkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHRvIHRydWUgaWYgdGhlIHdpZGdldCB1bmRlciBzZWFyY2ggaXMgcmVhZC1vbmx5LCBmYWxzZVxuICAgICAgICAgKiBpZiBpdCBpcyBlZGl0YWJsZS4gIFdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgd2hldGhlciB0byBzaG93XG4gICAgICAgICAqIHRoZSByZXBsYWNlIG9wdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaXNSZWFkT25seSA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHdoZXRoZXIgb3Igbm90IHRoZSBDb2RlbWlycm9yU2VhcmNoUHJvdmlkZXIgd2lsbCB3cmFwIHRvIHRoZSBiZWdpbm5pbmdcbiAgICAgICAgICogb3IgZW5kIG9mIHRoZSBkb2N1bWVudCBvbiBpbnZvY2F0aW9ucyBvZiBoaWdobGlnaHROZXh0IG9yIGhpZ2hsaWdodFByZXZpb3VzLCByZXNwZWN0aXZlbHlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaXNTdWJQcm92aWRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9tYXRjaFN0YXRlID0ge307XG4gICAgICAgIHRoaXMuX2NoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gaW5pdGlhbCBxdWVyeSB2YWx1ZSBpZiBhcHBsaWNhYmxlIHNvIHRoYXQgaXQgY2FuIGJlIGVudGVyZWRcbiAgICAgKiBpbnRvIHRoZSBzZWFyY2ggYm94IGFzIGFuIGluaXRpYWwgcXVlcnlcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEluaXRpYWwgdmFsdWUgdXNlZCB0byBwb3B1bGF0ZSB0aGUgc2VhcmNoIGJveC5cbiAgICAgKi9cbiAgICBnZXRJbml0aWFsUXVlcnkoc2VhcmNoVGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IGNtID0gc2VhcmNoVGFyZ2V0LmNvbnRlbnQuZWRpdG9yO1xuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSBjbS5kb2MuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBuZXdsaW5lcywganVzdCByZXR1cm4gZW1wdHkgc3RyaW5nXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb24uc2VhcmNoKC9cXHI/XFxufFxcci9nKSA9PT0gLTEgPyBzZWxlY3Rpb24gOiAnJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgc2VhcmNoIHVzaW5nIHRoZSBwcm92aWRlZCBvcHRpb25zLiAgU2hvdWxkIHVwZGF0ZSB0aGUgVUlcbiAgICAgKiB0byBoaWdobGlnaHQgYWxsIG1hdGNoZXMgYW5kIFwic2VsZWN0XCIgd2hhdGV2ZXIgdGhlIGZpcnN0IG1hdGNoIHNob3VsZCBiZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBxdWVyeSBBIFJlZ0V4cCB0byBiZSB1c2UgdG8gcGVyZm9ybSB0aGUgc2VhcmNoXG4gICAgICogQHBhcmFtIHNlYXJjaFRhcmdldCBUaGUgd2lkZ2V0IHRvIGJlIHNlYXJjaGVkXG4gICAgICogQHBhcmFtIFtmaWx0ZXJzPXt9XSBGaWx0ZXIgcGFyYW1ldGVycyB0byBwYXNzIHRvIHByb3ZpZGVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIGEgbGlzdCBvZiBhbGwgbWF0Y2hlc1xuICAgICAqL1xuICAgIGFzeW5jIHN0YXJ0UXVlcnkocXVlcnksIHNlYXJjaFRhcmdldCwgZmlsdGVycyA9IHt9KSB7XG4gICAgICAgIGlmICghQ29kZU1pcnJvclNlYXJjaFByb3ZpZGVyLmNhblNlYXJjaE9uKHNlYXJjaFRhcmdldCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgQ29kZW1pcnJvciBpbnN0YW5jZSB0byBzZWFyY2gnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjYW5TZWFyY2hPbiBpcyBhIHR5cGUgZ3VhcmQgdGhhdCBndWFyYW50ZWVzIHRoZSB0eXBlIG9mIC5lZGl0b3JcbiAgICAgICAgdGhpcy5fY20gPSBzZWFyY2hUYXJnZXQuY29udGVudC5lZGl0b3I7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFydFF1ZXJ5KHF1ZXJ5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgc2VhcmNoIHVzaW5nIGEgQ29kZU1pcnJvckVkaXRvciBvYmplY3QuXG4gICAgICovXG4gICAgYXN5bmMgc3RhcnRRdWVyeUNvZGVNaXJyb3IocXVlcnksIHNlYXJjaFRhcmdldCkge1xuICAgICAgICB0aGlzLl9jbSA9IHNlYXJjaFRhcmdldDtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0UXVlcnkocXVlcnksIGZhbHNlKTtcbiAgICB9XG4gICAgcmVmcmVzaE92ZXJsYXkoKSB7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hPdmVybGF5KCk7XG4gICAgfVxuICAgIGFzeW5jIF9zdGFydFF1ZXJ5KHF1ZXJ5LCByZWZyZXNoT3ZlcmxheSA9IHRydWUpIHtcbiAgICAgICAgLy8gbm8gcG9pbnQgaW4gcmVtb3Zpbmcgb3ZlcmxheSBpbiB0aGUgbWlkZGxlIG9mIHRoZSBzZWFyY2hcbiAgICAgICAgYXdhaXQgdGhpcy5lbmRRdWVyeShmYWxzZSk7XG4gICAgICAgIHRoaXMuX3F1ZXJ5ID0gcXVlcnk7XG4gICAgICAgIENvZGVNaXJyb3Iub24odGhpcy5fY20uZG9jLCAnY2hhbmdlJywgdGhpcy5fb25Eb2NDaGFuZ2VkLmJpbmQodGhpcykpO1xuICAgICAgICBpZiAocmVmcmVzaE92ZXJsYXkpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0SW5pdGlhbE1hdGNoZXMocXVlcnkpO1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gdGhpcy5fcGFyc2VNYXRjaGVzRnJvbVN0YXRlKCk7XG4gICAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5pc1N1YlByb3ZpZGVyKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJzb3JNYXRjaCA9IHRoaXMuX2ZpbmROZXh0KGZhbHNlKTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gY3Vyc29yTWF0Y2ggJiZcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXRjaFN0YXRlW2N1cnNvck1hdGNoLmZyb20ubGluZV1bY3Vyc29yTWF0Y2guZnJvbS5jaF07XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50TWF0Y2ggPSBtYXRjaDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHN0YXRlIG9mIGEgc2VhcmNoIHByb3ZpZGVyIHRvIHByZXBhcmUgZm9yIHN0YXJ0UXVlcnkgdG8gYmUgY2FsbGVkXG4gICAgICogaW4gb3JkZXIgdG8gc3RhcnQgYSBuZXcgcXVlcnkgb3IgcmVmcmVzaCBhbiBleGlzdGluZyBvbmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzZWFyY2ggcHJvdmlkZXIgaXMgcmVhZHkgdG9cbiAgICAgKiBiZWdpbiBhIG5ldyBzZWFyY2guXG4gICAgICovXG4gICAgYXN5bmMgZW5kUXVlcnkocmVtb3ZlT3ZlcmxheSA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5fbWF0Y2hTdGF0ZSA9IHt9O1xuICAgICAgICB0aGlzLl9jdXJyZW50TWF0Y2ggPSBudWxsO1xuICAgICAgICBpZiAocmVtb3ZlT3ZlcmxheSkge1xuICAgICAgICAgICAgdGhpcy5fY20ucmVtb3ZlT3ZlcmxheSh0aGlzLl9vdmVybGF5KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmcm9tID0gdGhpcy5fY20uZ2V0Q3Vyc29yKCdmcm9tJyk7XG4gICAgICAgIGNvbnN0IHRvID0gdGhpcy5fY20uZ2V0Q3Vyc29yKCd0bycpO1xuICAgICAgICAvLyBTZXR0aW5nIGEgcmV2ZXJzZSBzZWxlY3Rpb24gdG8gYWxsb3cgc2VhcmNoLWFzLXlvdS10eXBlIHRvIG1haW50YWluIHRoZVxuICAgICAgICAvLyBjdXJyZW50IHNlbGVjdGVkIG1hdGNoLiAgU2VlIGNvbW1lbnQgaW4gX2ZpbmROZXh0IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICAgIGlmIChmcm9tICE9PSB0bykge1xuICAgICAgICAgICAgdGhpcy5fY20uc2V0U2VsZWN0aW9uKHtcbiAgICAgICAgICAgICAgICBzdGFydDogdGhpcy5fdG9FZGl0b3JQb3ModG8pLFxuICAgICAgICAgICAgICAgIGVuZDogdGhpcy5fdG9FZGl0b3JQb3MoZnJvbSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIENvZGVNaXJyb3Iub2ZmKHRoaXMuX2NtLmRvYywgJ2NoYW5nZScsIHRoaXMuX29uRG9jQ2hhbmdlZC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzZXRzIFVJIHN0YXRlLCByZW1vdmVzIGFsbCBtYXRjaGVzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiBhbGwgc3RhdGUgaGFzIGJlZW4gY2xlYW5lZCB1cC5cbiAgICAgKi9cbiAgICBhc3luYyBlbmRTZWFyY2goKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N1YlByb3ZpZGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9jbS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmVuZFF1ZXJ5KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1vdmUgdGhlIGN1cnJlbnQgbWF0Y2ggaW5kaWNhdG9yIHRvIHRoZSBuZXh0IG1hdGNoLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgb25jZSB0aGUgYWN0aW9uIGhhcyBjb21wbGV0ZWQuXG4gICAgICovXG4gICAgYXN5bmMgaGlnaGxpZ2h0TmV4dCgpIHtcbiAgICAgICAgY29uc3QgY3Vyc29yTWF0Y2ggPSB0aGlzLl9maW5kTmV4dChmYWxzZSk7XG4gICAgICAgIGlmICghY3Vyc29yTWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtYXRjaCA9IHRoaXMuX21hdGNoU3RhdGVbY3Vyc29yTWF0Y2guZnJvbS5saW5lXVtjdXJzb3JNYXRjaC5mcm9tLmNoXTtcbiAgICAgICAgdGhpcy5fY3VycmVudE1hdGNoID0gbWF0Y2g7XG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTW92ZSB0aGUgY3VycmVudCBtYXRjaCBpbmRpY2F0b3IgdG8gdGhlIHByZXZpb3VzIG1hdGNoLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgb25jZSB0aGUgYWN0aW9uIGhhcyBjb21wbGV0ZWQuXG4gICAgICovXG4gICAgYXN5bmMgaGlnaGxpZ2h0UHJldmlvdXMoKSB7XG4gICAgICAgIGNvbnN0IGN1cnNvck1hdGNoID0gdGhpcy5fZmluZE5leHQodHJ1ZSk7XG4gICAgICAgIGlmICghY3Vyc29yTWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtYXRjaCA9IHRoaXMuX21hdGNoU3RhdGVbY3Vyc29yTWF0Y2guZnJvbS5saW5lXVtjdXJzb3JNYXRjaC5mcm9tLmNoXTtcbiAgICAgICAgdGhpcy5fY3VycmVudE1hdGNoID0gbWF0Y2g7XG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVwbGFjZSB0aGUgY3VycmVudGx5IHNlbGVjdGVkIG1hdGNoIHdpdGggdGhlIHByb3ZpZGVkIHRleHRcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciBhIHJlcGxhY2Ugb2NjdXJyZWQuXG4gICAgICovXG4gICAgYXN5bmMgcmVwbGFjZUN1cnJlbnRNYXRjaChuZXdUZXh0KSB7XG4gICAgICAgIC8vIElmIHRoZSBjdXJyZW50IHNlbGVjdGlvbiBleGFjdGx5IG1hdGNoZXMgdGhlIGN1cnJlbnQgbWF0Y2gsXG4gICAgICAgIC8vIHJlcGxhY2UgaXQuICBPdGhlcndpc2UsIGp1c3Qgc2VsZWN0IHRoZSBuZXh0IG1hdGNoIGFmdGVyIHRoZSBjdXJzb3IuXG4gICAgICAgIGxldCByZXBsYWNlT2NjdXJyZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRNYXRjaElzU2VsZWN0ZWQoKSkge1xuICAgICAgICAgICAgY29uc3QgY3Vyc29yID0gdGhpcy5fY20uZ2V0U2VhcmNoQ3Vyc29yKHRoaXMuX3F1ZXJ5LCB0aGlzLl9jbS5nZXRDdXJzb3IoJ2Zyb20nKSwgIXRoaXMuX3F1ZXJ5Lmlnbm9yZUNhc2UpO1xuICAgICAgICAgICAgaWYgKCFjdXJzb3IuZmluZE5leHQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXBsYWNlT2NjdXJyZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXBsYWNlT2NjdXJyZWQgPSB0cnVlO1xuICAgICAgICAgICAgY3Vyc29yLnJlcGxhY2UobmV3VGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5oaWdobGlnaHROZXh0KCk7XG4gICAgICAgIHJldHVybiByZXBsYWNlT2NjdXJyZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcGxhY2UgYWxsIG1hdGNoZXMgaW4gdGhlIG5vdGVib29rIHdpdGggdGhlIHByb3ZpZGVkIHRleHRcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciBhIHJlcGxhY2Ugb2NjdXJyZWQuXG4gICAgICovXG4gICAgYXN5bmMgcmVwbGFjZUFsbE1hdGNoZXMobmV3VGV4dCkge1xuICAgICAgICBsZXQgcmVwbGFjZU9jY3VycmVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgXykgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY20ub3BlcmF0aW9uKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJzb3IgPSB0aGlzLl9jbS5nZXRTZWFyY2hDdXJzb3IodGhpcy5fcXVlcnksIHVuZGVmaW5lZCwgIXRoaXMuX3F1ZXJ5Lmlnbm9yZUNhc2UpO1xuICAgICAgICAgICAgICAgIHdoaWxlIChjdXJzb3IuZmluZE5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlT2NjdXJyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjdXJzb3IucmVwbGFjZShuZXdUZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF0Y2hTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRNYXRjaCA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXBsYWNlT2NjdXJyZWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXBvcnQgd2hldGhlciBvciBub3QgdGhpcyBwcm92aWRlciBoYXMgdGhlIGFiaWxpdHkgdG8gc2VhcmNoIG9uIHRoZSBnaXZlbiBvYmplY3RcbiAgICAgKi9cbiAgICBzdGF0aWMgY2FuU2VhcmNoT24oZG9tYWluKSB7XG4gICAgICAgIHJldHVybiAoZG9tYWluIGluc3RhbmNlb2YgTWFpbkFyZWFXaWRnZXQgJiZcbiAgICAgICAgICAgIGRvbWFpbi5jb250ZW50IGluc3RhbmNlb2YgRmlsZUVkaXRvciAmJlxuICAgICAgICAgICAgZG9tYWluLmNvbnRlbnQuZWRpdG9yIGluc3RhbmNlb2YgQ29kZU1pcnJvckVkaXRvcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGxpc3Qgb2YgbWF0Y2hlcyBwcm92aWRlZCBieSB0aGUgc3RhcnRRdWVyeSBwcm9taXNlIHJlc29sdXRpb25cbiAgICAgKi9cbiAgICBnZXQgbWF0Y2hlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlTWF0Y2hlc0Zyb21TdGF0ZSgpO1xuICAgIH1cbiAgICBnZXQgY3VycmVudE1hdGNoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudE1hdGNoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaWduYWwgaW5kaWNhdGluZyB0aGF0IHNvbWV0aGluZyBpbiB0aGUgc2VhcmNoIGhhcyBjaGFuZ2VkLCBzbyB0aGUgVUkgc2hvdWxkIHVwZGF0ZVxuICAgICAqL1xuICAgIGdldCBjaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIHNlbGVjdGVkIG1hdGNoLlxuICAgICAqL1xuICAgIGdldCBjdXJyZW50TWF0Y2hJbmRleCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jdXJyZW50TWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50TWF0Y2guaW5kZXg7XG4gICAgfVxuICAgIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBnZXQgZWRpdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY207XG4gICAgfVxuICAgIF9vbkRvY0NoYW5nZWQoXywgY2hhbmdlT2JqKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIC8vIElmIHdlIGdldCBuZXdsaW5lcyBhZGRlZC9yZW1vdmVkLCB0aGUgbGluZSBudW1iZXJzIGFjcm9zcyB0aGVcbiAgICAgICAgLy8gbWF0Y2ggc3RhdGUgYXJlIGFsbCBzaGlmdGVkLCBzbyBoZXJlIHdlIG5lZWQgdG8gcmVjYWxjdWxhdGUgaXRcbiAgICAgICAgaWYgKGNoYW5nZU9iai50ZXh0Lmxlbmd0aCA+IDEgfHwgKChfYiA9IChfYSA9IGNoYW5nZU9iai5yZW1vdmVkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAwKSA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldEluaXRpYWxNYXRjaGVzKHRoaXMuX3F1ZXJ5KTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9yZWZyZXNoT3ZlcmxheSgpIHtcbiAgICAgICAgdGhpcy5fY20ub3BlcmF0aW9uKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGNsZWFyIHNlYXJjaCBmaXJzdFxuICAgICAgICAgICAgdGhpcy5fY20ucmVtb3ZlT3ZlcmxheSh0aGlzLl9vdmVybGF5KTtcbiAgICAgICAgICAgIHRoaXMuX292ZXJsYXkgPSB0aGlzLl9nZXRTZWFyY2hPdmVybGF5KCk7XG4gICAgICAgICAgICB0aGlzLl9jbS5hZGRPdmVybGF5KHRoaXMuX292ZXJsYXkpO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlZC5lbWl0KHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEbyBhIGZ1bGwgc2VhcmNoIG9uIHRoZSBlbnRpcmUgZG9jdW1lbnQuXG4gICAgICpcbiAgICAgKiBUaGlzIG1hbnVhbGx5IGNvbnN0cnVjdHMgdGhlIGluaXRpYWwgbWF0Y2ggc3RhdGUgYWNyb3NzIHRoZSB3aG9sZVxuICAgICAqIGRvY3VtZW50LiBUaGlzIG11c3QgYmUgZG9uZSBtYW51YWxseSBiZWNhdXNlIHRoZSBjb2RlbWlycm9yIG92ZXJsYXlcbiAgICAgKiBpcyBsYXp5LWxvYWRlZCwgc28gaXQgd2lsbCBvbmx5IHRva2VuaXplIGxpbmVzIHRoYXQgYXJlIGluIG9yIG5lYXJcbiAgICAgKiB0aGUgdmlld3BvcnQuICBUaGlzIGlzIHN1ZmZpY2llbnQgZm9yIGVmZmljaWVudGx5IG1haW50YWluaW5nIHRoZVxuICAgICAqIHN0YXRlIHdoZW4gY2hhbmdlcyBhcmUgbWFkZSB0byB0aGUgZG9jdW1lbnQsIGFzIGNoYW5nZXMgb2NjdXIgaW4gb3JcbiAgICAgKiBuZWFyIHRoZSB2aWV3cG9ydCwgYnV0IHRvIHNjYW4gdGhlIHdob2xlIGRvY3VtZW50LCBhIG1hbnVhbCBzZWFyY2hcbiAgICAgKiBhY3Jvc3MgdGhlIGVudGlyZSBjb250ZW50IGlzIHJlcXVpcmVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHF1ZXJ5IFRoZSBzZWFyY2ggdGVybVxuICAgICAqL1xuICAgIF9zZXRJbml0aWFsTWF0Y2hlcyhxdWVyeSkge1xuICAgICAgICB0aGlzLl9tYXRjaFN0YXRlID0ge307XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gQ29kZU1pcnJvci5Qb3ModGhpcy5fY20uZG9jLmZpcnN0TGluZSgpLCAwKTtcbiAgICAgICAgY29uc3QgZW5kID0gQ29kZU1pcnJvci5Qb3ModGhpcy5fY20uZG9jLmxhc3RMaW5lKCkpO1xuICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5fY20uZG9jLmdldFJhbmdlKHN0YXJ0LCBlbmQpO1xuICAgICAgICBjb25zdCBsaW5lcyA9IGNvbnRlbnQuc3BsaXQoJ1xcbicpO1xuICAgICAgICBjb25zdCB0b3RhbE1hdGNoSW5kZXggPSAwO1xuICAgICAgICBsaW5lcy5mb3JFYWNoKChsaW5lLCBsaW5lTnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBxdWVyeS5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgbGV0IG1hdGNoID0gcXVlcnkuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIHdoaWxlIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbCA9IG1hdGNoLmluZGV4O1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoT2JqID0ge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBtYXRjaFswXSxcbiAgICAgICAgICAgICAgICAgICAgbGluZTogbGluZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBjb2wsXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBsaW5lLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogdG90YWxNYXRjaEluZGV4XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX21hdGNoU3RhdGVbbGluZU51bWJlcl0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF0Y2hTdGF0ZVtsaW5lTnVtYmVyXSA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9tYXRjaFN0YXRlW2xpbmVOdW1iZXJdW2NvbF0gPSBtYXRjaE9iajtcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHF1ZXJ5LmV4ZWMobGluZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfZ2V0U2VhcmNoT3ZlcmxheSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVG9rZW4gZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gYSBsaW5lIG5lZWRzIHRvIGJlIHByb2Nlc3NlZCAtXG4gICAgICAgICAgICAgKiB3aGVuIHRoZSBvdmVybGF5IGlzIGluaXRpYWxseSBjcmVhdGVkLCBpdCdzIGNhbGxlZCBvbiBhbGwgbGluZXM7XG4gICAgICAgICAgICAgKiB3aGVuIGEgbGluZSBpcyBtb2RpZmllZCBhbmQgbmVlZHMgdG8gYmUgcmUtZXZhbHVhdGVkLCBpdCdzIGNhbGxlZFxuICAgICAgICAgICAgICogb24ganVzdCB0aGF0IGxpbmUuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogVGhpcyBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgdG9rZW4gZnVuY3Rpb24gYm90aCBjb25zdHJ1Y3RzL21haW50YWluc1xuICAgICAgICAgICAgICogdGhlIG92ZXJsYXkgYW5kIGtlZXBzIHRyYWNrIG9mIHRoZSBtYXRjaCBzdGF0ZSBhcyB0aGUgZG9jdW1lbnQgaXNcbiAgICAgICAgICAgICAqIHVwZGF0ZWQgd2hpbGUgYSBzZWFyY2ggaXMgYWN0aXZlLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0b2tlbjogKHN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQb3MgPSBzdHJlYW0ucG9zO1xuICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXJ5Lmxhc3RJbmRleCA9IGN1cnJlbnRQb3M7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZVRleHQgPSBzdHJlYW0uc3RyaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gdGhpcy5fcXVlcnkuZXhlYyhsaW5lVGV4dCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZSA9IHN0cmVhbS5saW5lT3JhY2xlLmxpbmU7XG4gICAgICAgICAgICAgICAgLy8gSWYgc3RhcnRpbmcgYXQgcG9zaXRpb24gMCwgdGhlIHRva2VuaXphdGlvbiBvZiB0aGlzIGxpbmUgaGFzIGp1c3Qgc3RhcnRlZC5cbiAgICAgICAgICAgICAgICAvLyBCbG93IGF3YXkgZXZlcnl0aGluZyBvbiB0aGlzIGxpbmUgaW4gdGhlIHN0YXRlIHNvIGl0IGNhbiBiZSB1cGRhdGVkLlxuICAgICAgICAgICAgICAgIGlmIChzdHJlYW0uc3RhcnQgPT09IGN1cnJlbnRQb3MgJiZcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFBvcyA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAhIXRoaXMuX21hdGNoU3RhdGVbbGluZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF0Y2hTdGF0ZVtsaW5lXSA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggJiYgbWF0Y2guaW5kZXggPT09IGN1cnJlbnRQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZm91bmQgbWF0Y2gsIGFkZCBpdCB0byBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaExlbmd0aCA9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hPYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBsaW5lVGV4dC5zdWJzdHIoY3VycmVudFBvcywgbWF0Y2hMZW5ndGgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogbGluZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogY3VycmVudFBvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBsaW5lVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiAwIC8vIGZpbGwgaW4gaW5kZXggd2hlbiBmbGF0dGVuaW5nLCBsYXRlclxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX21hdGNoU3RhdGVbbGluZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hdGNoU3RhdGVbbGluZV0gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXRjaFN0YXRlW2xpbmVdW2N1cnJlbnRQb3NdID0gbWF0Y2hPYmo7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgdGhlIHN0cmVhbSBhbG9uZyBhbmQgcmV0dXJuIHNlYXJjaGluZyBzdHlsZSBmb3IgdGhlIHRva2VuXG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbS5wb3MgKz0gbWF0Y2hMZW5ndGggfHwgMTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGxhc3QgdGhpbmcgb24gdGhlIGxpbmUgd2FzIGEgbWF0Y2gsIG1ha2Ugc3VyZSB3ZSBzdGlsbFxuICAgICAgICAgICAgICAgICAgICAvLyBlbWl0IHRoZSBjaGFuZ2VkIHNpZ25hbCBzbyB0aGUgZGlzcGxheSBjYW4gcGljayB1cCB0aGUgdXBkYXRlc1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyZWFtLmVvbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3NlYXJjaGluZyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZXJlJ3MgYSBtYXRjaCBpbiB0aGUgc3RyZWFtLCBhZHZhbmNlIHRoZSBzdHJlYW0gdG8gaXRzIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbS5wb3MgPSBtYXRjaC5pbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG5vIG1hdGNoZXMsIGNvbnN1bWUgdGhlIHJlc3Qgb2YgdGhlIHN0cmVhbVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgX2ZpbmROZXh0KHJldmVyc2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NtLm9wZXJhdGlvbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjYXNlU2Vuc2l0aXZlID0gdGhpcy5fcXVlcnkuaWdub3JlQ2FzZTtcbiAgICAgICAgICAgIC8vIEluIG9yZGVyIHRvIHN1cHBvcnQgc2VhcmNoLWFzLXlvdS10eXBlLCB3ZSBuZWVkZWQgYSB3YXkgdG8gYWxsb3cgdGhlIGZpcnN0XG4gICAgICAgICAgICAvLyBtYXRjaCB0byBiZSBzZWxlY3RlZCB3aGVuIGEgc2VhcmNoIGlzIHN0YXJ0ZWQsIGJ1dCBwcmV2ZW50IHRoZSBzZWxlY3RlZFxuICAgICAgICAgICAgLy8gc2VhcmNoIHRvIG1vdmUgZm9yIGVhY2ggbmV3IGtleXByZXNzLiAgVG8gZG8gdGhpcywgd2hlbiBhIHNlYXJjaCBpcyBlbmRlZCxcbiAgICAgICAgICAgIC8vIHRoZSBjdXJzb3IgaXMgcmV2ZXJzZWQsIHB1dHRpbmcgdGhlIGhlYWQgYXQgdGhlICdmcm9tJyBwb3NpdGlvbi4gIFdoZW4gYSBuZXdcbiAgICAgICAgICAgIC8vIHNlYXJjaCBpcyBzdGFydGVkLCB0aGUgY3Vyc29yIHdlIHdhbnQgaXMgYXQgdGhlICdmcm9tJyBwb3NpdGlvbiwgc28gdGhhdCB0aGUgc2FtZVxuICAgICAgICAgICAgLy8gbWF0Y2ggaXMgc2VsZWN0ZWQgd2hlbiB0aGUgbmV4dCBrZXkgaXMgZW50ZXJlZCAoaWYgaXQgaXMgc3RpbGwgYSBtYXRjaCkuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gV2hlbiB0b2dnbGluZyB0aHJvdWdoIGEgc2VhcmNoIG5vcm1hbGx5LCB0aGUgY3Vyc29yIGlzIGFsd2F5cyBzZXQgaW4gdGhlIGZvcndhcmRcbiAgICAgICAgICAgIC8vIGRpcmVjdGlvbiwgc28gaGVhZCBpcyBhbHdheXMgYXQgdGhlICd0bycgcG9zaXRpb24uICBUaGF0IHdheSwgaWYgcmV2ZXJzZSA9IGZhbHNlLFxuICAgICAgICAgICAgLy8gdGhlIHNlYXJjaCBwcm9jZWVkcyBmcm9tIHRoZSAndG8nIHBvc2l0aW9uIGR1cmluZyBub3JtYWwgdG9nZ2xpbmcuICBJZiByZXZlcnNlID0gdHJ1ZSxcbiAgICAgICAgICAgIC8vIHRoZSBzZWFyY2ggYWx3YXlzIHByb2NlZWRzIGZyb20gdGhlICdhbmNob3InIHBvc2l0aW9uLCB3aGljaCBpcyBhdCB0aGUgJ2Zyb20nLlxuICAgICAgICAgICAgY29uc3QgY3Vyc29yVG9HZXQgPSByZXZlcnNlID8gJ2FuY2hvcicgOiAnaGVhZCc7XG4gICAgICAgICAgICBjb25zdCBsYXN0UG9zaXRpb24gPSB0aGlzLl9jbS5nZXRDdXJzb3IoY3Vyc29yVG9HZXQpO1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLl90b0VkaXRvclBvcyhsYXN0UG9zaXRpb24pO1xuICAgICAgICAgICAgbGV0IGN1cnNvciA9IHRoaXMuX2NtLmdldFNlYXJjaEN1cnNvcih0aGlzLl9xdWVyeSwgbGFzdFBvc2l0aW9uLCAhY2FzZVNlbnNpdGl2ZSk7XG4gICAgICAgICAgICBpZiAoIWN1cnNvci5maW5kKHJldmVyc2UpKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgd2UgZG9uJ3Qgd2FudCB0byBsb29wLCBubyBtb3JlIG1hdGNoZXMgZm91bmQsIHJlc2V0IHRoZSBjdXJzb3IgYW5kIGV4aXRcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1N1YlByb3ZpZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtLnNldEN1cnNvclBvc2l0aW9uKHBvc2l0aW9uLCB7IHNjcm9sbDogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRNYXRjaCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiB3ZSBkbyB3YW50IHRvIGxvb3AsIHRyeSBzZWFyY2hpbmcgZnJvbSB0aGUgYm90dG9tL3RvcFxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0T3JFbmQgPSByZXZlcnNlXG4gICAgICAgICAgICAgICAgICAgID8gQ29kZU1pcnJvci5Qb3ModGhpcy5fY20ubGFzdExpbmUoKSlcbiAgICAgICAgICAgICAgICAgICAgOiBDb2RlTWlycm9yLlBvcyh0aGlzLl9jbS5maXJzdExpbmUoKSwgMCk7XG4gICAgICAgICAgICAgICAgY3Vyc29yID0gdGhpcy5fY20uZ2V0U2VhcmNoQ3Vyc29yKHRoaXMuX3F1ZXJ5LCBzdGFydE9yRW5kLCAhY2FzZVNlbnNpdGl2ZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFjdXJzb3IuZmluZChyZXZlcnNlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmcm9tUG9zID0gY3Vyc29yLmZyb20oKTtcbiAgICAgICAgICAgIGNvbnN0IHRvUG9zID0gY3Vyc29yLnRvKCk7XG4gICAgICAgICAgICBjb25zdCBzZWxSYW5nZSA9IHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICBsaW5lOiBmcm9tUG9zLmxpbmUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbjogZnJvbVBvcy5jaFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmU6IHRvUG9zLmxpbmUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbjogdG9Qb3MuY2hcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5fY20uc2V0U2VsZWN0aW9uKHNlbFJhbmdlKTtcbiAgICAgICAgICAgIHRoaXMuX2NtLnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgICAgICAgICBmcm9tOiBmcm9tUG9zLFxuICAgICAgICAgICAgICAgIHRvOiB0b1Bvc1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZnJvbTogZnJvbVBvcyxcbiAgICAgICAgICAgICAgICB0bzogdG9Qb3NcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfcGFyc2VNYXRjaGVzRnJvbVN0YXRlKCkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAvLyBGbGF0dGVuIHN0YXRlIG1hcCBhbmQgdXBkYXRlIHRoZSBpbmRleCBvZiBlYWNoIG1hdGNoXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBPYmplY3Qua2V5cyh0aGlzLl9tYXRjaFN0YXRlKS5yZWR1Y2UoKHJlc3VsdCwgbGluZU51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGluZUtleSA9IHBhcnNlSW50KGxpbmVOdW1iZXIsIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVNYXRjaGVzID0gdGhpcy5fbWF0Y2hTdGF0ZVtsaW5lS2V5XTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGxpbmVNYXRjaGVzKS5mb3JFYWNoKChwb3MpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NLZXkgPSBwYXJzZUludChwb3MsIDEwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9IGxpbmVNYXRjaGVzW3Bvc0tleV07XG4gICAgICAgICAgICAgICAgbWF0Y2guaW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG1hdGNoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSwgW10pO1xuICAgICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICB9XG4gICAgX3RvRWRpdG9yUG9zKHBvc0luKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsaW5lOiBwb3NJbi5saW5lLFxuICAgICAgICAgICAgY29sdW1uOiBwb3NJbi5jaFxuICAgICAgICB9O1xuICAgIH1cbiAgICBfY3VycmVudE1hdGNoSXNTZWxlY3RlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jdXJyZW50TWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjdXJyZW50U2VsZWN0aW9uID0gdGhpcy5fY20uZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZWxlY3Rpb25MZW5ndGggPSBjdXJyZW50U2VsZWN0aW9uLmVuZC5jb2x1bW4gLSBjdXJyZW50U2VsZWN0aW9uLnN0YXJ0LmNvbHVtbjtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uSXNPbmVMaW5lID0gY3VycmVudFNlbGVjdGlvbi5zdGFydC5saW5lID09PSBjdXJyZW50U2VsZWN0aW9uLmVuZC5saW5lO1xuICAgICAgICByZXR1cm4gKHRoaXMuX2N1cnJlbnRNYXRjaC5saW5lID09PSBjdXJyZW50U2VsZWN0aW9uLnN0YXJ0LmxpbmUgJiZcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRNYXRjaC5jb2x1bW4gPT09IGN1cnJlbnRTZWxlY3Rpb24uc3RhcnQuY29sdW1uICYmXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50TWF0Y2gudGV4dC5sZW5ndGggPT09IGN1cnJlbnRTZWxlY3Rpb25MZW5ndGggJiZcbiAgICAgICAgICAgIHNlbGVjdGlvbklzT25lTGluZSk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFNlYXJjaFN0YXRlIHtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvZGVtaXJyb3JzZWFyY2hwcm92aWRlci5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuZXhwb3J0IGNvbnN0IEZPVU5EX0NMQVNTRVMgPSBbJ2NtLXN0cmluZycsICdjbS1vdmVybGF5JywgJ2NtLXNlYXJjaGluZyddO1xuY29uc3QgU0VMRUNURURfQ0xBU1NFUyA9IFsnQ29kZU1pcnJvci1zZWxlY3RlZHRleHQnXTtcbmV4cG9ydCBjbGFzcyBHZW5lcmljU2VhcmNoUHJvdmlkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHRvIHRydWUgaWYgdGhlIHdpZGdldCB1bmRlciBzZWFyY2ggaXMgcmVhZC1vbmx5LCBmYWxzZVxuICAgICAgICAgKiBpZiBpdCBpcyBlZGl0YWJsZS4gIFdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgd2hldGhlciB0byBzaG93XG4gICAgICAgICAqIHRoZSByZXBsYWNlIG9wdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaXNSZWFkT25seSA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgd2hldGhlciBvciBub3QgdGhpcyB3aWxsIHdyYXAgdG8gdGhlIGJlZ2lubmluZ1xuICAgICAgICAgKiBvciBlbmQgb2YgdGhlIGRvY3VtZW50IG9uIGludm9jYXRpb25zIG9mIGhpZ2hsaWdodE5leHQgb3IgaGlnaGxpZ2h0UHJldmlvdXMsIHJlc3BlY3RpdmVseVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc1N1YlByb3ZpZGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX21hdGNoZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMuX29uV2lkZ2V0Q2hhbmdlZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5fY2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBhbiBpbml0aWFsIHF1ZXJ5IHZhbHVlIGlmIGFwcGxpY2FibGUgc28gdGhhdCBpdCBjYW4gYmUgZW50ZXJlZFxuICAgICAqIGludG8gdGhlIHNlYXJjaCBib3ggYXMgYW4gaW5pdGlhbCBxdWVyeVxuICAgICAqXG4gICAgICogQHJldHVybnMgSW5pdGlhbCB2YWx1ZSB1c2VkIHRvIHBvcHVsYXRlIHRoZSBzZWFyY2ggYm94LlxuICAgICAqL1xuICAgIGdldEluaXRpYWxRdWVyeShzZWFyY2hUYXJnZXQpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBzZWFyY2ggdXNpbmcgdGhlIHByb3ZpZGVkIG9wdGlvbnMuICBTaG91bGQgdXBkYXRlIHRoZSBVSVxuICAgICAqIHRvIGhpZ2hsaWdodCBhbGwgbWF0Y2hlcyBhbmQgXCJzZWxlY3RcIiB3aGF0ZXZlciB0aGUgZmlyc3QgbWF0Y2ggc2hvdWxkIGJlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHF1ZXJ5IEEgUmVnRXhwIHRvIGJlIHVzZSB0byBwZXJmb3JtIHRoZSBzZWFyY2hcbiAgICAgKiBAcGFyYW0gc2VhcmNoVGFyZ2V0IFRoZSB3aWRnZXQgdG8gYmUgc2VhcmNoZWRcbiAgICAgKiBAcGFyYW0gW2ZpbHRlcnM9e31dIEZpbHRlciBwYXJhbWV0ZXJzIHRvIHBhc3MgdG8gcHJvdmlkZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYSBsaXN0IG9mIGFsbCBtYXRjaGVzXG4gICAgICovXG4gICAgYXN5bmMgc3RhcnRRdWVyeShxdWVyeSwgc2VhcmNoVGFyZ2V0LCBmaWx0ZXJzID0ge30pIHtcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgLy8gTm8gcG9pbnQgaW4gcmVtb3Zpbmcgb3ZlcmxheSBpbiB0aGUgbWlkZGxlIG9mIHRoZSBzZWFyY2hcbiAgICAgICAgYXdhaXQgdGhpcy5lbmRRdWVyeShmYWxzZSk7XG4gICAgICAgIHRoaXMuX3dpZGdldCA9IHNlYXJjaFRhcmdldDtcbiAgICAgICAgdGhpcy5fcXVlcnkgPSBxdWVyeTtcbiAgICAgICAgdGhpcy5fbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBbXTtcbiAgICAgICAgY29uc3Qgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcih0aGlzLl93aWRnZXQubm9kZSwgTm9kZUZpbHRlci5TSE9XX1RFWFQsIHtcbiAgICAgICAgICAgIGFjY2VwdE5vZGU6IG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgIC8vIEZpbHRlciBzdWJ0cmVlcyBvZiBVTlNVUFBPUlRFRF9FTEVNRU5UUyBhbmQgbm9kZXMgdGhhdFxuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBjb250YWluIG91ciBzZWFyY2ggdGV4dFxuICAgICAgICAgICAgICAgIGxldCBwYXJlbnRFbGVtZW50ID0gbm9kZS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgIHdoaWxlIChwYXJlbnRFbGVtZW50ICE9PSB0aGlzLl93aWRnZXQubm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50RWxlbWVudC5ub2RlTmFtZSBpblxuICAgICAgICAgICAgICAgICAgICAgICAgR2VuZXJpY1NlYXJjaFByb3ZpZGVyLlVOU1VQUE9SVEVEX0VMRU1FTlRTKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfUkVKRUNUO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0Ll9xdWVyeS50ZXN0KG5vZGUudGV4dENvbnRlbnQpXG4gICAgICAgICAgICAgICAgICAgID8gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUXG4gICAgICAgICAgICAgICAgICAgIDogTm9kZUZpbHRlci5GSUxURVJfUkVKRUNUO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gW107XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsTm9kZXMgPSBbXTtcbiAgICAgICAgLy8gV2UgTVVTVCBnYXRoZXIgbm9kZXMgZmlyc3QsIG90aGVyd2lzZSB0aGUgdXBkYXRlcyBiZWxvdyB3aWxsIGZpbmQgZWFjaCByZXN1bHQgdHdpY2VcbiAgICAgICAgbGV0IG5vZGUgPSB3YWxrZXIubmV4dE5vZGUoKTtcbiAgICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgICAgIG5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAvKiBXZSBzdG9yZSB0aGVtIGhlcmUgYXMgd2Ugd2FudCB0byBhdm9pZCBzYXZpbmcgYSBtb2RpZmllZCBvbmVcbiAgICAgICAgICAgICAqIFRoaXMgaGFwcGVucyB3aXRoIHNvbWV0aGluZyBsaWtlIHRoaXM6IDxwcmU+PHNwYW4+SGVsbG88L3NwYW4+IHdvcmxkPC9wcmU+IGFuZCBsb29raW5nIGZvciBvXG4gICAgICAgICAgICAgKiBUaGUgbyBpbiB3b3JsZCBpcyBmb3VuZCBhZnRlciB0aGUgbyBpbiBoZWxsbyB3aGljaCBtZWFucyB0aGUgcHJlIGNvdWxkIGhhdmUgYmVlbiBtb2RpZmllZCBhbHJlYWR5XG4gICAgICAgICAgICAgKiBXaGlsZSB0aGVyZSBtYXkgYmUgYSBiZXR0ZXIgZGF0YSBzdHJ1Y3R1cmUgdG8gZG8gdGhpcyBmb3IgcGVyZm9ybWFuY2UsIHRoaXMgd2FzIGVhc3kgdG8gcmVhc29uIGFib3V0LlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBvcmlnaW5hbE5vZGVzLnB1c2gobm9kZS5wYXJlbnRFbGVtZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICBub2RlID0gd2Fsa2VyLm5leHROb2RlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2UnbGwgbmVlZCB0byBjb3B5IHRoZSByZWdleHAgdG8gZW5zdXJlIGl0cyAnZycgYW5kIHRoYXQgd2Ugc3RhcnQgdGhlIGluZGV4IGNvdW50IGZyb20gMFxuICAgICAgICBjb25zdCBmbGFncyA9IHRoaXMuX3F1ZXJ5LmZsYWdzLmluZGV4T2YoJ2cnKSA9PT0gLTEgPyBxdWVyeS5mbGFncyArICdnJyA6IHF1ZXJ5LmZsYWdzO1xuICAgICAgICBub2Rlcy5mb3JFYWNoKChub2RlLCBub2RlSW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHEgPSBuZXcgUmVnRXhwKHF1ZXJ5LnNvdXJjZSwgZmxhZ3MpO1xuICAgICAgICAgICAgY29uc3Qgc3Vic2VjdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IHEuZXhlYyhub2RlLnRleHRDb250ZW50KTtcbiAgICAgICAgICAgIHdoaWxlIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIHN1YnNlY3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBzdGFydDogbWF0Y2guaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGVuZDogbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IG1hdGNoWzBdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbWF0Y2ggPSBxLmV4ZWMobm9kZS50ZXh0Q29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBvcmlnaW5hbE5vZGUgPSBvcmlnaW5hbE5vZGVzW25vZGVJbmRleF07XG4gICAgICAgICAgICBjb25zdCBvcmlnaW5hbExlbmd0aCA9IG5vZGUudGV4dENvbnRlbnQubGVuZ3RoOyAvLyBOb2RlIGxlbmd0aCB3aWxsIGNoYW5nZSBiZWxvd1xuICAgICAgICAgICAgbGV0IGxhc3ROb2RlQWRkZWQgPSBudWxsO1xuICAgICAgICAgICAgLy8gR28gYmFja3dhcmRzIGFzIGluZGV4IG1heSBjaGFuZ2UgaWYgd2UgZ28gZm9yd2FyZHNcbiAgICAgICAgICAgIGNvbnN0IG5ld01hdGNoZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGlkeCA9IHN1YnNlY3Rpb25zLmxlbmd0aCAtIDE7IGlkeCA+PSAwOyAtLWlkeCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnQsIGVuZCwgdGV4dCB9ID0gc3Vic2VjdGlvbnNbaWR4XTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBzdXBwb3J0IHRzcGFuIGZvciBzdmcgd2hlbiBzdmcgc3VwcG9ydCBpcyBhZGRlZFxuICAgICAgICAgICAgICAgIGNvbnN0IHNwYW5uZWROb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIHNwYW5uZWROb2RlLmNsYXNzTGlzdC5hZGQoLi4uRk9VTkRfQ0xBU1NFUyk7XG4gICAgICAgICAgICAgICAgc3Bhbm5lZE5vZGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICAgICAgICAgIC8vIFNwbGljZSB0aGUgdGV4dCBvdXQgYmVmb3JlIHdlIGFkZCBpdCBiYWNrIGluIHdpdGggYSBzcGFuXG4gICAgICAgICAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IGAke25vZGUudGV4dENvbnRlbnQuc2xpY2UoMCwgc3RhcnQpfSR7bm9kZS50ZXh0Q29udGVudC5zbGljZShlbmQpfWA7XG4gICAgICAgICAgICAgICAgLy8gQXJlIHdlIHJlcGxhY2luZyBzb21ld2hlcmUgaW4gdGhlIG1pZGRsZT9cbiAgICAgICAgICAgICAgICBpZiAoKG5vZGUgPT09IG51bGwgfHwgbm9kZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbm9kZS5ub2RlVHlwZSkgPT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW5kVGV4dCA9IG5vZGUuc3BsaXRUZXh0KHN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzcGFubmVkTm9kZSwgZW5kVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFyZSB3ZSByZXBsYWNpbmcgZnJvbSB0aGUgc3RhcnQ/XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0YXJ0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50Tm9kZS5wcmVwZW5kKHNwYW5uZWROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXJlIHdlIHJlcGxhY2luZyBhdCB0aGUgZW5kP1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlbmQgPT09IG9yaWdpbmFsTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50Tm9kZS5hcHBlbmQoc3Bhbm5lZE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAvLyBBcmUgdGhlIHR3byByZXN1bHRzIGFyZSBhZGphY2VudCB0byBlYWNoIG90aGVyP1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsYXN0Tm9kZUFkZGVkICYmIGVuZCA9PT0gc3Vic2VjdGlvbnNbaWR4ICsgMV0uc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzcGFubmVkTm9kZSwgbGFzdE5vZGVBZGRlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxhc3ROb2RlQWRkZWQgPSBzcGFubmVkTm9kZTtcbiAgICAgICAgICAgICAgICBuZXdNYXRjaGVzLnVuc2hpZnQoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0LFxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogJycsXG4gICAgICAgICAgICAgICAgICAgIGxpbmU6IDAsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbjogMCxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IC0xLFxuICAgICAgICAgICAgICAgICAgICAvLyBHZW5lcmljU2VhcmNoRmllbGRzXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXNJbmRleDogLTEsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4SW5PcmlnaW5hbDogaWR4LFxuICAgICAgICAgICAgICAgICAgICBzcGFuRWxlbWVudDogc3Bhbm5lZE5vZGUsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsTm9kZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKC4uLm5ld01hdGNoZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgbWF0Y2hlcy5mb3JFYWNoKChtYXRjaCwgaWR4KSA9PiB7XG4gICAgICAgICAgICAvLyBUaGlzIG1heSBiZSBjaGFuZ2VkIHdoZW4gdGhpcyBpcyBhIHN1YnByb3ZpZGVyIDovXG4gICAgICAgICAgICBtYXRjaC5pbmRleCA9IGlkeDtcbiAgICAgICAgICAgIC8vIFRPRE86IG1hdGNoZXNJbmRleCBpcyBkZWNsYXJlZCBhcyByZWFkb25seS4gV2h5IGFyZSB3ZSBzZXR0aW5nIGl0IGhlcmU/XG4gICAgICAgICAgICBtYXRjaC5tYXRjaGVzSW5kZXggPSBpZHg7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRoaXMuaXNTdWJQcm92aWRlciAmJiBtYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRNYXRjaCA9IG1hdGNoZXNbMF07XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2F0Y2ggZm9yIGZ1dHVyZSBjaGFuZ2VzOlxuICAgICAgICB0aGlzLl9tdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5fd2lkZ2V0Lm5vZGUsIFxuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTXV0YXRpb25PYnNlcnZlckluaXRcbiAgICAgICAge1xuICAgICAgICAgICAgYXR0cmlidXRlczogZmFsc2UsXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbWF0Y2hlcyA9IG1hdGNoZXM7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXRjaGVzO1xuICAgIH1cbiAgICByZWZyZXNoT3ZlcmxheSgpIHtcbiAgICAgICAgLy8gV2UgZG9uJ3QgaGF2ZSBhbiBvdmVybGF5LCB3ZSBhcmUgZGlyZWN0bHkgY2hhbmdpbmcgdGhlIERPTVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgc3RhdGUgb2YgYSBzZWFyY2ggcHJvdmlkZXIgdG8gcHJlcGFyZSBmb3Igc3RhcnRRdWVyeSB0byBiZSBjYWxsZWRcbiAgICAgKiBpbiBvcmRlciB0byBzdGFydCBhIG5ldyBxdWVyeSBvciByZWZyZXNoIGFuIGV4aXN0aW5nIG9uZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNlYXJjaCBwcm92aWRlciBpcyByZWFkeSB0b1xuICAgICAqIGJlZ2luIGEgbmV3IHNlYXJjaC5cbiAgICAgKi9cbiAgICBhc3luYyBlbmRRdWVyeShyZW1vdmVPdmVybGF5ID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLl9tYXRjaGVzLmZvckVhY2gobWF0Y2ggPT4ge1xuICAgICAgICAgICAgLy8gV2UgYWxyZWFkeSB0b29rIGNhcmUgb2YgdGhpcyBwYXJlbnQgd2l0aCBhbm90aGVyIG1hdGNoXG4gICAgICAgICAgICBpZiAobWF0Y2guaW5kZXhJbk9yaWdpbmFsICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0Y2guc3BhbkVsZW1lbnQucGFyZW50RWxlbWVudC5yZXBsYWNlV2l0aChtYXRjaC5vcmlnaW5hbE5vZGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbWF0Y2hlcyA9IFtdO1xuICAgICAgICB0aGlzLl9jdXJyZW50TWF0Y2ggPSBudWxsO1xuICAgICAgICB0aGlzLl9tdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzZXRzIFVJIHN0YXRlLCByZW1vdmVzIGFsbCBtYXRjaGVzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiBhbGwgc3RhdGUgaGFzIGJlZW4gY2xlYW5lZCB1cC5cbiAgICAgKi9cbiAgICBhc3luYyBlbmRTZWFyY2goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuZFF1ZXJ5KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1vdmUgdGhlIGN1cnJlbnQgbWF0Y2ggaW5kaWNhdG9yIHRvIHRoZSBuZXh0IG1hdGNoLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgb25jZSB0aGUgYWN0aW9uIGhhcyBjb21wbGV0ZWQuXG4gICAgICovXG4gICAgYXN5bmMgaGlnaGxpZ2h0TmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hpZ2hsaWdodE5leHQoZmFsc2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNb3ZlIHRoZSBjdXJyZW50IG1hdGNoIGluZGljYXRvciB0byB0aGUgcHJldmlvdXMgbWF0Y2guXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBvbmNlIHRoZSBhY3Rpb24gaGFzIGNvbXBsZXRlZC5cbiAgICAgKi9cbiAgICBhc3luYyBoaWdobGlnaHRQcmV2aW91cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hpZ2hsaWdodE5leHQodHJ1ZSk7XG4gICAgfVxuICAgIF9oaWdobGlnaHROZXh0KHJldmVyc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuX21hdGNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fY3VycmVudE1hdGNoKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50TWF0Y2ggPSByZXZlcnNlXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9tYXRjaGVzW3RoaXMubWF0Y2hlcy5sZW5ndGggLSAxXVxuICAgICAgICAgICAgICAgIDogdGhpcy5fbWF0Y2hlc1swXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRNYXRjaC5zcGFuRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKC4uLlNFTEVDVEVEX0NMQVNTRVMpO1xuICAgICAgICAgICAgbGV0IG5leHRJbmRleCA9IHJldmVyc2VcbiAgICAgICAgICAgICAgICA/IHRoaXMuX2N1cnJlbnRNYXRjaC5tYXRjaGVzSW5kZXggLSAxXG4gICAgICAgICAgICAgICAgOiB0aGlzLl9jdXJyZW50TWF0Y2gubWF0Y2hlc0luZGV4ICsgMTtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGEgc3VicHJvdmlkZXIsIGRvbid0IGxvb3BcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3ViUHJvdmlkZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV4dEluZGV4IDwgMCB8fCBuZXh0SW5kZXggPj0gdGhpcy5fbWF0Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudE1hdGNoID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDaGVhcCB3YXkgdG8gbWFrZSB0aGlzIGEgY2lyY3VsYXIgYnVmZmVyXG4gICAgICAgICAgICBuZXh0SW5kZXggPSAobmV4dEluZGV4ICsgdGhpcy5fbWF0Y2hlcy5sZW5ndGgpICUgdGhpcy5fbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50TWF0Y2ggPSB0aGlzLl9tYXRjaGVzW25leHRJbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRNYXRjaCkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudE1hdGNoLnNwYW5FbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uU0VMRUNURURfQ0xBU1NFUyk7XG4gICAgICAgICAgICAvLyBJZiBub3QgaW4gdmlldywgc2Nyb2xsIGp1c3QgZW5vdWdoIHRvIHNlZSBpdFxuICAgICAgICAgICAgaWYgKCFlbGVtZW50SW5WaWV3cG9ydCh0aGlzLl9jdXJyZW50TWF0Y2guc3BhbkVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudE1hdGNoLnNwYW5FbGVtZW50LnNjcm9sbEludG9WaWV3KHJldmVyc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY3VycmVudE1hdGNoLnNwYW5FbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRNYXRjaDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVwbGFjZSB0aGUgY3VycmVudGx5IHNlbGVjdGVkIG1hdGNoIHdpdGggdGhlIHByb3ZpZGVkIHRleHRcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciBhIHJlcGxhY2Ugb2NjdXJyZWQuXG4gICAgICovXG4gICAgYXN5bmMgcmVwbGFjZUN1cnJlbnRNYXRjaChuZXdUZXh0KSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlIGFsbCBtYXRjaGVzIGluIHRoZSBub3RlYm9vayB3aXRoIHRoZSBwcm92aWRlZCB0ZXh0XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIGEgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgYSByZXBsYWNlIG9jY3VycmVkLlxuICAgICAqL1xuICAgIGFzeW5jIHJlcGxhY2VBbGxNYXRjaGVzKG5ld1RleHQpIHtcbiAgICAgICAgLy8gVGhpcyBpcyByZWFkIG9ubHksIGJ1dCB3ZSBjb3VsZCBsb29zZW4gdGhpcyBpbiB0aGVvcnkgZm9yIGlucHV0IGJveGVzLi4uXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXBvcnQgd2hldGhlciBvciBub3QgdGhpcyBwcm92aWRlciBoYXMgdGhlIGFiaWxpdHkgdG8gc2VhcmNoIG9uIHRoZSBnaXZlbiBvYmplY3RcbiAgICAgKi9cbiAgICBzdGF0aWMgY2FuU2VhcmNoT24oZG9tYWluKSB7XG4gICAgICAgIHJldHVybiBkb21haW4gaW5zdGFuY2VvZiBXaWRnZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGxpc3Qgb2YgbWF0Y2hlcyBwcm92aWRlZCBieSB0aGUgc3RhcnRRdWVyeSBwcm9taXNlIHJlc29sdXRpb25cbiAgICAgKi9cbiAgICBnZXQgbWF0Y2hlcygpIHtcbiAgICAgICAgLy8gRW5zdXJlIHRoYXQgbm8gb3RoZXIgZm4gY2FuIG92ZXJ3cml0ZSBtYXRjaGVzIGluZGV4IHByb3BlcnR5XG4gICAgICAgIC8vIFdlIHNoYWxsb3cgY2xvbmUgZWFjaCBub2RlXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXRjaGVzXG4gICAgICAgICAgICA/IHRoaXMuX21hdGNoZXMubWFwKG0gPT4gT2JqZWN0LmFzc2lnbih7fSwgbSkpXG4gICAgICAgICAgICA6IHRoaXMuX21hdGNoZXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNpZ25hbCBpbmRpY2F0aW5nIHRoYXQgc29tZXRoaW5nIGluIHRoZSBzZWFyY2ggaGFzIGNoYW5nZWQsIHNvIHRoZSBVSSBzaG91bGQgdXBkYXRlXG4gICAgICovXG4gICAgZ2V0IGNoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgc2VsZWN0ZWQgbWF0Y2guXG4gICAgICovXG4gICAgZ2V0IGN1cnJlbnRNYXRjaEluZGV4KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2N1cnJlbnRNYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRNYXRjaC5pbmRleDtcbiAgICB9XG4gICAgZ2V0IGN1cnJlbnRNYXRjaCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRNYXRjaDtcbiAgICB9XG4gICAgY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXN5bmMgX29uV2lkZ2V0Q2hhbmdlZChtdXRhdGlvbnMsIG9ic2VydmVyKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgdHlwaWNhbGx5IGNoZWFwLCBidXQgd2UgZG8gbm90IGNvbnRyb2wgdGhlIHJhdGUgb2YgY2hhbmdlIG9yIHNpemUgb2YgdGhlIG91dHB1dFxuICAgICAgICBhd2FpdCB0aGlzLnN0YXJ0UXVlcnkodGhpcy5fcXVlcnksIHRoaXMuX3dpZGdldCk7XG4gICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh1bmRlZmluZWQpO1xuICAgIH1cbn1cbi8qKlxuICogV2UgY2hvb3NlIG9wdCBvdXQgYXMgbW9zdCBub2RlIHR5cGVzIHNob3VsZCBiZSBzZWFyY2hlZCAoZS5nLiBzY3JpcHQpLlxuICogRXZlbiBub2RlcyBsaWtlIDxkYXRhPiwgY291bGQgaGF2ZSB0ZXh0Q29udGVudCB3ZSBjYXJlIGFib3V0LlxuICpcbiAqIE5vdGU6IG5vZGVOYW1lIGlzIGNhcGl0YWxpemVkLCBzbyB3ZSBkbyB0aGUgc2FtZSBoZXJlXG4gKi9cbkdlbmVyaWNTZWFyY2hQcm92aWRlci5VTlNVUFBPUlRFRF9FTEVNRU5UUyA9IHtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQjRG9jdW1lbnRfbWV0YWRhdGFcbiAgICBCQVNFOiB0cnVlLFxuICAgIEhFQUQ6IHRydWUsXG4gICAgTElOSzogdHJ1ZSxcbiAgICBNRVRBOiB0cnVlLFxuICAgIFNUWUxFOiB0cnVlLFxuICAgIFRJVExFOiB0cnVlLFxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUTUwvRWxlbWVudCNTZWN0aW9uaW5nX3Jvb3RcbiAgICBCT0RZOiB0cnVlLFxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUTUwvRWxlbWVudCNDb250ZW50X3NlY3Rpb25pbmdcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQjVGV4dF9jb250ZW50XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9FbGVtZW50I0lubGluZV90ZXh0X3NlbWFudGljc1xuICAgIC8vIEFib3ZlIGlzIHNlYXJjaGVkXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9FbGVtZW50I0ltYWdlX2FuZF9tdWx0aW1lZGlhXG4gICAgQVJFQTogdHJ1ZSxcbiAgICBBVURJTzogdHJ1ZSxcbiAgICBJTUc6IHRydWUsXG4gICAgTUFQOiB0cnVlLFxuICAgIFRSQUNLOiB0cnVlLFxuICAgIFZJREVPOiB0cnVlLFxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUTUwvRWxlbWVudCNFbWJlZGRlZF9jb250ZW50XG4gICAgQVBQTEVUOiB0cnVlLFxuICAgIEVNQkVEOiB0cnVlLFxuICAgIElGUkFNRTogdHJ1ZSxcbiAgICBOT0VNQkVEOiB0cnVlLFxuICAgIE9CSkVDVDogdHJ1ZSxcbiAgICBQQVJBTTogdHJ1ZSxcbiAgICBQSUNUVVJFOiB0cnVlLFxuICAgIFNPVVJDRTogdHJ1ZSxcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQjU2NyaXB0aW5nXG4gICAgQ0FOVkFTOiB0cnVlLFxuICAgIE5PU0NSSVBUOiB0cnVlLFxuICAgIFNDUklQVDogdHJ1ZSxcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQjRGVtYXJjYXRpbmdfZWRpdHNcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQjVGFibGVfY29udGVudFxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUTUwvRWxlbWVudCNGb3Jtc1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUTUwvRWxlbWVudCNJbnRlcmFjdGl2ZV9lbGVtZW50c1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUTUwvRWxlbWVudCNXZWJfQ29tcG9uZW50c1xuICAgIC8vIEFib3ZlIGlzIHNlYXJjaGVkXG4gICAgLy8gT3RoZXI6XG4gICAgU1ZHOiB0cnVlXG59O1xuZnVuY3Rpb24gZWxlbWVudEluVmlld3BvcnQoZWwpIHtcbiAgICBjb25zdCBib3VuZGluZ0NsaWVudFJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gKGJvdW5kaW5nQ2xpZW50UmVjdC50b3AgPj0gMCAmJlxuICAgICAgICBib3VuZGluZ0NsaWVudFJlY3QuYm90dG9tIDw9XG4gICAgICAgICAgICAod2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpICYmXG4gICAgICAgIGJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0ID49IDAgJiZcbiAgICAgICAgYm91bmRpbmdDbGllbnRSZWN0LnJpZ2h0IDw9XG4gICAgICAgICAgICAod2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1nZW5lcmljc2VhcmNocHJvdmlkZXIuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgQ29kZUNlbGwsIE1hcmtkb3duQ2VsbCB9IGZyb20gJ0BqdXB5dGVybGFiL2NlbGxzJztcbmltcG9ydCB7IE5vdGVib29rUGFuZWwgfSBmcm9tICdAanVweXRlcmxhYi9ub3RlYm9vayc7XG5pbXBvcnQgeyBBcnJheUV4dCB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmltcG9ydCBDb2RlTWlycm9yIGZyb20gJ2NvZGVtaXJyb3InO1xuaW1wb3J0IHsgQ29kZU1pcnJvclNlYXJjaFByb3ZpZGVyIH0gZnJvbSAnLi9jb2RlbWlycm9yc2VhcmNocHJvdmlkZXInO1xuaW1wb3J0IHsgR2VuZXJpY1NlYXJjaFByb3ZpZGVyIH0gZnJvbSAnLi9nZW5lcmljc2VhcmNocHJvdmlkZXInO1xuZXhwb3J0IGNsYXNzIE5vdGVib29rU2VhcmNoUHJvdmlkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHRvIHRydWUgaWYgdGhlIHdpZGdldCB1bmRlciBzZWFyY2ggaXMgcmVhZC1vbmx5LCBmYWxzZVxuICAgICAgICAgKiBpZiBpdCBpcyBlZGl0YWJsZS4gIFdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgd2hldGhlciB0byBzaG93XG4gICAgICAgICAqIHRoZSByZXBsYWNlIG9wdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaXNSZWFkT25seSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhhc091dHB1dHMgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zZWFyY2hQcm92aWRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5fdW5SZW5kZXJlZE1hcmtkb3duQ2VsbHMgPSBbXTtcbiAgICAgICAgdGhpcy5fY2VsbHNXaXRoTWF0Y2hlcyA9IFtdO1xuICAgICAgICB0aGlzLl9jaGFuZ2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGFuIGluaXRpYWwgcXVlcnkgdmFsdWUgaWYgYXBwbGljYWJsZSBzbyB0aGF0IGl0IGNhbiBiZSBlbnRlcmVkXG4gICAgICogaW50byB0aGUgc2VhcmNoIGJveCBhcyBhbiBpbml0aWFsIHF1ZXJ5XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBJbml0aWFsIHZhbHVlIHVzZWQgdG8gcG9wdWxhdGUgdGhlIHNlYXJjaCBib3guXG4gICAgICovXG4gICAgZ2V0SW5pdGlhbFF1ZXJ5KHNlYXJjaFRhcmdldCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUNlbGwgPSBzZWFyY2hUYXJnZXQuY29udGVudC5hY3RpdmVDZWxsO1xuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSAoX2EgPSBhY3RpdmVDZWxsID09PSBudWxsIHx8IGFjdGl2ZUNlbGwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFjdGl2ZUNlbGwuZWRpdG9yKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZG9jLmdldFNlbGVjdGlvbigpO1xuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbmV3bGluZXMsIGp1c3QgcmV0dXJuIGVtcHR5IHN0cmluZ1xuICAgICAgICByZXR1cm4gKHNlbGVjdGlvbiA9PT0gbnVsbCB8fCBzZWxlY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlbGVjdGlvbi5zZWFyY2goL1xccj9cXG58XFxyL2cpKSA9PT0gLTEgPyBzZWxlY3Rpb24gOiAnJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgc2VhcmNoIHVzaW5nIHRoZSBwcm92aWRlZCBvcHRpb25zLiBTaG91bGQgdXBkYXRlIHRoZSBVSVxuICAgICAqIHRvIGhpZ2hsaWdodCBhbGwgbWF0Y2hlcyBhbmQgXCJzZWxlY3RcIiB3aGF0ZXZlciB0aGUgZmlyc3QgbWF0Y2ggc2hvdWxkIGJlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHF1ZXJ5IEEgUmVnRXhwIHRvIGJlIHVzZSB0byBwZXJmb3JtIHRoZSBzZWFyY2hcbiAgICAgKiBAcGFyYW0gc2VhcmNoVGFyZ2V0IFRoZSB3aWRnZXQgdG8gYmUgc2VhcmNoZWRcbiAgICAgKiBAcGFyYW0gZmlsdGVycyBGaWx0ZXIgcGFyYW1ldGVycyB0byBwYXNzIHRvIHByb3ZpZGVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIGEgbGlzdCBvZiBhbGwgbWF0Y2hlc1xuICAgICAqL1xuICAgIGFzeW5jIHN0YXJ0UXVlcnkocXVlcnksIHNlYXJjaFRhcmdldCwgZmlsdGVycykge1xuICAgICAgICB0aGlzLl9zZWFyY2hUYXJnZXQgPSBzZWFyY2hUYXJnZXQ7XG4gICAgICAgIGxldCBjZWxscyA9IHRoaXMuX3NlYXJjaFRhcmdldC5jb250ZW50LndpZGdldHM7XG4gICAgICAgIHRoaXMuX2ZpbHRlcnMgPVxuICAgICAgICAgICAgIWZpbHRlcnMgfHwgT2JqZWN0LmVudHJpZXMoZmlsdGVycykubGVuZ3RoID09PSAwXG4gICAgICAgICAgICAgICAgPyB7IG91dHB1dDogdHJ1ZSwgc2VsZWN0ZWRDZWxsczogZmFsc2UgfVxuICAgICAgICAgICAgICAgIDogZmlsdGVycztcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRDZWxscyA9IGNlbGxzLmZpbHRlcihjZWxsID0+IHRoaXMuX3NlYXJjaFRhcmdldC5jb250ZW50LmlzU2VsZWN0ZWRPckFjdGl2ZShjZWxsKSk7XG4gICAgICAgIGlmICh0aGlzLl9maWx0ZXJzLnNlbGVjdGVkQ2VsbHMgJiYgc2VsZWN0ZWRDZWxscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjZWxscyA9IHNlbGVjdGVkQ2VsbHM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaGlkZSB0aGUgY3VycmVudCBub3RlYm9vayB3aWRnZXQgdG8gcHJldmVudCBleHBlbnNpdmUgbGF5b3V0IHJlLWNhbGN1bGF0aW9uIG9wZXJhdGlvbnNcbiAgICAgICAgdGhpcy5fc2VhcmNoVGFyZ2V0LmhpZGUoKTtcbiAgICAgICAgbGV0IGluZGV4VG90YWwgPSAwO1xuICAgICAgICBjb25zdCBhbGxNYXRjaGVzID0gW107XG4gICAgICAgIC8vIEZvciBlYWNoIGNlbGwsIGNyZWF0ZSBhIHNlYXJjaCBwcm92aWRlciBhbmQgY29sbGVjdCB0aGUgbWF0Y2hlc1xuICAgICAgICBmb3IgKGNvbnN0IGNlbGwgb2YgY2VsbHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNtRWRpdG9yID0gY2VsbC5lZGl0b3I7XG4gICAgICAgICAgICBjb25zdCBjbVNlYXJjaFByb3ZpZGVyID0gbmV3IENvZGVNaXJyb3JTZWFyY2hQcm92aWRlcigpO1xuICAgICAgICAgICAgY21TZWFyY2hQcm92aWRlci5pc1N1YlByb3ZpZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIElmIGEgcmVuZGVyZWQgTWFya2Rvd25DZWxsIGNvbnRhaW5zIGEgbWF0Y2gsIHVucmVuZGVyIGl0IHNvIHRoYXRcbiAgICAgICAgICAgIC8vIENvZGVNaXJyb3IgY2FuIHNob3cgdGhlIG1hdGNoKGVzKS4gIElmIHRoZSBNYXJrZG93bkNlbGwgaXMgbm90XG4gICAgICAgICAgICAvLyByZW5kZXJlZCwgcHV0dGluZyBDb2RlTWlycm9yIG9uIHRoZSBwYWdlLCBDb2RlTWlycm9yIHdpbGwgbm90IHJ1blxuICAgICAgICAgICAgLy8gdGhlIG1vZGUsIHdoaWNoIHdpbGwgcHJldmVudCB0aGUgc2VhcmNoIGZyb20gb2NjdXJyaW5nLlxuICAgICAgICAgICAgLy8gS2VlcCB0cmFjayBzbyB0aGF0IHRoZSBjZWxsIGNhbiBiZSByZXJlbmRlcmVkIHdoZW4gdGhlIHNlYXJjaCBpcyBlbmRlZFxuICAgICAgICAgICAgLy8gb3IgaWYgdGhlcmUgYXJlIG5vIG1hdGNoZXNcbiAgICAgICAgICAgIGxldCBjZWxsU2hvdWxkUmVSZW5kZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChjZWxsIGluc3RhbmNlb2YgTWFya2Rvd25DZWxsICYmIGNlbGwucmVuZGVyZWQpIHtcbiAgICAgICAgICAgICAgICBjZWxsLnJlbmRlcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY2VsbFNob3VsZFJlUmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFVuaGlkZSBoaWRkZW4gY2VsbHMgZm9yIHRoZSBzYW1lIHJlYXNvbiBhcyBhYm92ZVxuICAgICAgICAgICAgaWYgKGNlbGwuaW5wdXRIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICBjZWxsLmlucHV0SGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjaGFpbiBwcm9taXNlcyB0byBlbnN1cmUgaW5kZXhpbmcgaXMgc2VxdWVudGlhbFxuICAgICAgICAgICAgY29uc3QgbWF0Y2hlc0Zyb21DZWxsID0gYXdhaXQgY21TZWFyY2hQcm92aWRlci5zdGFydFF1ZXJ5Q29kZU1pcnJvcihxdWVyeSwgY21FZGl0b3IpO1xuICAgICAgICAgICAgaWYgKGNlbGwgaW5zdGFuY2VvZiBNYXJrZG93bkNlbGwpIHtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlc0Zyb21DZWxsLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB1bi1yZW5kZXIgbWFya2Rvd24gY2VsbHMgd2l0aCBtYXRjaGVzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VuUmVuZGVyZWRNYXJrZG93bkNlbGxzLnB1c2goY2VsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNlbGxTaG91bGRSZVJlbmRlcikge1xuICAgICAgICAgICAgICAgICAgICAvLyB3YXMgcmVuZGVyZWQgcHJldmlvdXNseSwgbm8gbmVlZCB0byByZWZyZXNoXG4gICAgICAgICAgICAgICAgICAgIGNlbGwucmVuZGVyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXRjaGVzRnJvbUNlbGwubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY21TZWFyY2hQcm92aWRlci5yZWZyZXNoT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NlbGxzV2l0aE1hdGNoZXMucHVzaChjZWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgbWF0Y2ggaW5kaWNlcyB0byByZWZsZWN0IHRoZSB3aG9sZSBkb2N1bWVudCBpbmRleCB2YWx1ZXNcbiAgICAgICAgICAgIG1hdGNoZXNGcm9tQ2VsbC5mb3JFYWNoKG1hdGNoID0+IHtcbiAgICAgICAgICAgICAgICBtYXRjaC5pbmRleCA9IG1hdGNoLmluZGV4ICsgaW5kZXhUb3RhbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW5kZXhUb3RhbCArPSBtYXRjaGVzRnJvbUNlbGwubGVuZ3RoO1xuICAgICAgICAgICAgLy8gc2VhcmNoIGhhcyBiZWVuIGluaXRpYWxpemVkLCBjb25uZWN0IHRoZSBjaGFuZ2VkIHNpZ25hbFxuICAgICAgICAgICAgY21TZWFyY2hQcm92aWRlci5jaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25TZWFyY2hQcm92aWRlckNoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgYWxsTWF0Y2hlcy5jb25jYXQobWF0Y2hlc0Zyb21DZWxsKTtcbiAgICAgICAgICAgIHRoaXMuX3NlYXJjaFByb3ZpZGVycy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjZWxsOiBjZWxsLFxuICAgICAgICAgICAgICAgIHByb3ZpZGVyOiBjbVNlYXJjaFByb3ZpZGVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChjZWxsIGluc3RhbmNlb2YgQ29kZUNlbGwgJiYgdGhpcy5fZmlsdGVycy5vdXRwdXQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvdXRwdXRQcm92aWRlciA9IG5ldyBHZW5lcmljU2VhcmNoUHJvdmlkZXIoKTtcbiAgICAgICAgICAgICAgICBvdXRwdXRQcm92aWRlci5pc1N1YlByb3ZpZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVzRnJvbU91dHB1dCA9IGF3YWl0IG91dHB1dFByb3ZpZGVyLnN0YXJ0UXVlcnkocXVlcnksIGNlbGwub3V0cHV0QXJlYSk7XG4gICAgICAgICAgICAgICAgbWF0Y2hlc0Zyb21PdXRwdXQubWFwKG1hdGNoID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2guaW5kZXggPSBtYXRjaC5pbmRleCArIGluZGV4VG90YWw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaW5kZXhUb3RhbCArPSBtYXRjaGVzRnJvbU91dHB1dC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgYWxsTWF0Y2hlcy5jb25jYXQobWF0Y2hlc0Zyb21PdXRwdXQpO1xuICAgICAgICAgICAgICAgIG91dHB1dFByb3ZpZGVyLmNoYW5nZWQuY29ubmVjdCh0aGlzLl9vblNlYXJjaFByb3ZpZGVyQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VhcmNoUHJvdmlkZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBjZWxsOiBjZWxsLFxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlcjogb3V0cHV0UHJvdmlkZXJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzaG93IHRoZSB3aWRnZXQgYWdhaW4sIHJlY2FsY3VsYXRpb24gb2YgbGF5b3V0IHdpbGwgbWF0dGVyIGFnYWluXG4gICAgICAgIC8vIGFuZCBzbyB0aGF0IHRoZSBuZXh0IHN0ZXAgd2lsbCBzY3JvbGwgY29ycmVjdGx5IHRvIHRoZSBmaXJzdCBtYXRjaFxuICAgICAgICB0aGlzLl9zZWFyY2hUYXJnZXQuc2hvdygpO1xuICAgICAgICB0aGlzLl9jdXJyZW50TWF0Y2ggPSBhd2FpdCB0aGlzLl9zdGVwTmV4dCh0aGlzLl91cGRhdGVkQ3VycmVudFByb3ZpZGVyKGZhbHNlKSk7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hDdXJyZW50Q2VsbEVkaXRvcigpO1xuICAgICAgICB0aGlzLl9yZWZyZXNoQ2VsbHNFZGl0b3JzSW5CYWNrZ3JvdW5kKHRoaXMuX2NlbGxzV2l0aE1hdGNoZXMpO1xuICAgICAgICByZXR1cm4gYWxsTWF0Y2hlcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogR3JhZHVhbGx5IHJlZnJlc2ggY2VsbHMgaW4gdGhlIGJhY2tncm91bmQgc28gdGhhdCB0aGUgdXNlciB3aWxsIG5vdFxuICAgICAqIGV4cGVyaWVuY2UgZnJvemVuIGludGVyZmFjZSwgYG5gIGNlbGxzIGF0IGEgdGltZS5cbiAgICAgKi9cbiAgICBfcmVmcmVzaENlbGxzRWRpdG9yc0luQmFja2dyb3VuZChjZWxscywgbiA9IDUpIHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBjb25zdCByZWZyZXNoTmV4dE5DZWxscyA9ICgpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IHN0b3AgPSBpICsgbjsgaSA8IHN0b3AgJiYgaSA8IGNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY2VsbHNbaV0uZWRpdG9yLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpIDwgY2VsbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQocmVmcmVzaE5leHROQ2VsbHMsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChyZWZyZXNoTmV4dE5DZWxscywgMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZnJlc2ggdGhlIGVkaXRvciBpbiB0aGUgY2VsbCBmb3IgdGhlIGN1cnJlbnQgbWF0Y2guXG4gICAgICovXG4gICAgX3JlZnJlc2hDdXJyZW50Q2VsbEVkaXRvcigpIHtcbiAgICAgICAgY29uc3Qgbm90ZWJvb2sgPSB0aGlzLl9zZWFyY2hUYXJnZXQuY29udGVudDtcbiAgICAgICAgbm90ZWJvb2suYWN0aXZlQ2VsbC5lZGl0b3IucmVmcmVzaCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgc3RhdGUgb2YgYSBzZWFyY2ggcHJvdmlkZXIgdG8gcHJlcGFyZSBmb3Igc3RhcnRRdWVyeSB0byBiZSBjYWxsZWRcbiAgICAgKiBpbiBvcmRlciB0byBzdGFydCBhIG5ldyBxdWVyeSBvciByZWZyZXNoIGFuIGV4aXN0aW5nIG9uZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNlYXJjaCBwcm92aWRlciBpcyByZWFkeSB0b1xuICAgICAqIGJlZ2luIGEgbmV3IHNlYXJjaC5cbiAgICAgKi9cbiAgICBhc3luYyBlbmRRdWVyeSgpIHtcbiAgICAgICAgdGhpcy5fc2VhcmNoVGFyZ2V0LmhpZGUoKTtcbiAgICAgICAgY29uc3QgcXVlcmllc0VuZGVkID0gW107XG4gICAgICAgIHRoaXMuX3NlYXJjaFByb3ZpZGVycy5mb3JFYWNoKCh7IHByb3ZpZGVyIH0pID0+IHtcbiAgICAgICAgICAgIHF1ZXJpZXNFbmRlZC5wdXNoKHByb3ZpZGVyLmVuZFF1ZXJ5KCkpO1xuICAgICAgICAgICAgcHJvdmlkZXIuY2hhbmdlZC5kaXNjb25uZWN0KHRoaXMuX29uU2VhcmNoUHJvdmlkZXJDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFNpZ25hbC5kaXNjb25uZWN0QmV0d2Vlbih0aGlzLl9zZWFyY2hUYXJnZXQubW9kZWwuY2VsbHMsIHRoaXMpO1xuICAgICAgICB0aGlzLl9zZWFyY2hQcm92aWRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5fY3VycmVudFByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdW5SZW5kZXJlZE1hcmtkb3duQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgLy8gR3VhcmQgYWdhaW5zdCB0aGUgY2FzZSB3aGVyZSBtYXJrZG93biBjZWxscyBoYXZlIGJlZW4gZGVsZXRlZFxuICAgICAgICAgICAgaWYgKCFjZWxsLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICBjZWxsLnJlbmRlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3VuUmVuZGVyZWRNYXJrZG93bkNlbGxzID0gW107XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHF1ZXJpZXNFbmRlZCk7XG4gICAgICAgIHRoaXMuX3NlYXJjaFRhcmdldC5zaG93KCk7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hDdXJyZW50Q2VsbEVkaXRvcigpO1xuICAgICAgICAvLyByZS1yZW5kZXIgYWxsIG5vbi1tYXJrZG93biBjZWxscyB3aXRoIG1hdGNoZXMgKHdoaWNoIHdlcmUgcmVuZGVyZWQsIHRodXMgZG8gbm90IG5lZWQgcmVmcmVzaGluZylcbiAgICAgICAgdGhpcy5fcmVmcmVzaENlbGxzRWRpdG9yc0luQmFja2dyb3VuZCh0aGlzLl9jZWxsc1dpdGhNYXRjaGVzLmZpbHRlcigoY2VsbCkgPT4gIShjZWxsIGluc3RhbmNlb2YgTWFya2Rvd25DZWxsKSkpO1xuICAgICAgICB0aGlzLl9jZWxsc1dpdGhNYXRjaGVzID0gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc2V0cyBVSSBzdGF0ZSwgcmVtb3ZlcyBhbGwgbWF0Y2hlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gYWxsIHN0YXRlIGhhcyBiZWVuIGNsZWFuZWQgdXAuXG4gICAgICovXG4gICAgYXN5bmMgZW5kU2VhcmNoKCkge1xuICAgICAgICB0aGlzLl9zZWFyY2hUYXJnZXQuaGlkZSgpO1xuICAgICAgICBTaWduYWwuZGlzY29ubmVjdEJldHdlZW4odGhpcy5fc2VhcmNoVGFyZ2V0Lm1vZGVsLmNlbGxzLCB0aGlzKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9zZWFyY2hUYXJnZXQuY29udGVudC5hY3RpdmVDZWxsSW5kZXg7XG4gICAgICAgIGNvbnN0IHNlYXJjaEVuZGVkID0gW107XG4gICAgICAgIHRoaXMuX3NlYXJjaFByb3ZpZGVycy5mb3JFYWNoKCh7IHByb3ZpZGVyIH0pID0+IHtcbiAgICAgICAgICAgIHNlYXJjaEVuZGVkLnB1c2gocHJvdmlkZXIuZW5kU2VhcmNoKCkpO1xuICAgICAgICAgICAgcHJvdmlkZXIuY2hhbmdlZC5kaXNjb25uZWN0KHRoaXMuX29uU2VhcmNoUHJvdmlkZXJDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3NlYXJjaFByb3ZpZGVycyA9IFtdO1xuICAgICAgICB0aGlzLl9jdXJyZW50UHJvdmlkZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl91blJlbmRlcmVkTWFya2Rvd25DZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLnJlbmRlcmVkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3VuUmVuZGVyZWRNYXJrZG93bkNlbGxzID0gW107XG4gICAgICAgIHRoaXMuX3NlYXJjaFRhcmdldC5jb250ZW50LmFjdGl2ZUNlbGxJbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLl9zZWFyY2hUYXJnZXQuY29udGVudC5tb2RlID0gJ2VkaXQnO1xuICAgICAgICB0aGlzLl9jdXJyZW50TWF0Y2ggPSBudWxsO1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChzZWFyY2hFbmRlZCk7XG4gICAgICAgIHRoaXMuX3NlYXJjaFRhcmdldC5zaG93KCk7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hDdXJyZW50Q2VsbEVkaXRvcigpO1xuICAgICAgICB0aGlzLl9zZWFyY2hUYXJnZXQgPSBudWxsO1xuICAgICAgICAvLyByZS1yZW5kZXIgYWxsIG5vbi1tYXJrZG93biBjZWxscyB3aXRoIG1hdGNoZXMgKHdoaWNoIHdlcmUgcmVuZGVyZWQsIHRodXMgZG8gbm90IG5lZWQgcmVmcmVzaGluZylcbiAgICAgICAgdGhpcy5fcmVmcmVzaENlbGxzRWRpdG9yc0luQmFja2dyb3VuZCh0aGlzLl9jZWxsc1dpdGhNYXRjaGVzLmZpbHRlcigoY2VsbCkgPT4gIShjZWxsIGluc3RhbmNlb2YgTWFya2Rvd25DZWxsKSkpO1xuICAgICAgICB0aGlzLl9jZWxsc1dpdGhNYXRjaGVzID0gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1vdmUgdGhlIGN1cnJlbnQgbWF0Y2ggaW5kaWNhdG9yIHRvIHRoZSBuZXh0IG1hdGNoLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgb25jZSB0aGUgYWN0aW9uIGhhcyBjb21wbGV0ZWQuXG4gICAgICovXG4gICAgYXN5bmMgaGlnaGxpZ2h0TmV4dCgpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudE1hdGNoID0gYXdhaXQgdGhpcy5fc3RlcE5leHQodGhpcy5fdXBkYXRlZEN1cnJlbnRQcm92aWRlcihmYWxzZSkpO1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudE1hdGNoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNb3ZlIHRoZSBjdXJyZW50IG1hdGNoIGluZGljYXRvciB0byB0aGUgcHJldmlvdXMgbWF0Y2guXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBvbmNlIHRoZSBhY3Rpb24gaGFzIGNvbXBsZXRlZC5cbiAgICAgKi9cbiAgICBhc3luYyBoaWdobGlnaHRQcmV2aW91cygpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudE1hdGNoID0gYXdhaXQgdGhpcy5fc3RlcE5leHQodGhpcy5fdXBkYXRlZEN1cnJlbnRQcm92aWRlcih0cnVlKSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50TWF0Y2g7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcGxhY2UgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBtYXRjaCB3aXRoIHRoZSBwcm92aWRlZCB0ZXh0XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIGEgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgYSByZXBsYWNlIG9jY3VycmVkLlxuICAgICAqL1xuICAgIGFzeW5jIHJlcGxhY2VDdXJyZW50TWF0Y2gobmV3VGV4dCkge1xuICAgICAgICBjb25zdCBub3RlYm9vayA9IHRoaXMuX3NlYXJjaFRhcmdldC5jb250ZW50O1xuICAgICAgICBjb25zdCBlZGl0b3IgPSBub3RlYm9vay5hY3RpdmVDZWxsLmVkaXRvcjtcbiAgICAgICAgbGV0IHJlcGxhY2VPY2N1cnJlZCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudE1hdGNoSXNTZWxlY3RlZChlZGl0b3IpKSB7XG4gICAgICAgICAgICBjb25zdCB7IHByb3ZpZGVyIH0gPSB0aGlzLl9jdXJyZW50UHJvdmlkZXI7XG4gICAgICAgICAgICByZXBsYWNlT2NjdXJyZWQgPSBhd2FpdCBwcm92aWRlci5yZXBsYWNlQ3VycmVudE1hdGNoKG5ld1RleHQpO1xuICAgICAgICAgICAgaWYgKHJlcGxhY2VPY2N1cnJlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRNYXRjaCA9IHByb3ZpZGVyLmN1cnJlbnRNYXRjaDtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSB3YXMgYSByZXBsYWNlbWVudCBhbmQgdGhlcmUgaXMgYW5vdGhlciBtYXRjaCwgdGhlbiB0aGUgQ29kZU1pcnJvclNlYXJjaFByb3ZpZGVyXG4gICAgICAgICAgICAgICAgLy8gYWxyZWFkeSBoaWdobGlnaHRlZCB0aGUgbmV4dCBtYXRjaCwgc28gd2UgY2FuIHJldHVybiBlYXJseSB0byBhdm9pZCBza2lwcGluZyBhIG1hdGNoLlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50TWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2VPY2N1cnJlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5oaWdobGlnaHROZXh0KCk7XG4gICAgICAgIHJldHVybiByZXBsYWNlT2NjdXJyZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcGxhY2UgYWxsIG1hdGNoZXMgaW4gdGhlIG5vdGVib29rIHdpdGggdGhlIHByb3ZpZGVkIHRleHRcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciBhIHJlcGxhY2Ugb2NjdXJyZWQuXG4gICAgICovXG4gICAgYXN5bmMgcmVwbGFjZUFsbE1hdGNoZXMobmV3VGV4dCkge1xuICAgICAgICBsZXQgcmVwbGFjZU9jY3VycmVkID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgaW5kZXggaW4gdGhpcy5fc2VhcmNoUHJvdmlkZXJzKSB7XG4gICAgICAgICAgICBjb25zdCB7IHByb3ZpZGVyIH0gPSB0aGlzLl9zZWFyY2hQcm92aWRlcnNbaW5kZXhdO1xuICAgICAgICAgICAgY29uc3Qgc2luZ2xlUmVwbGFjZU9jY3VycmVkID0gYXdhaXQgcHJvdmlkZXIucmVwbGFjZUFsbE1hdGNoZXMobmV3VGV4dCk7XG4gICAgICAgICAgICByZXBsYWNlT2NjdXJyZWQgPSBzaW5nbGVSZXBsYWNlT2NjdXJyZWQgPyB0cnVlIDogcmVwbGFjZU9jY3VycmVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1cnJlbnRNYXRjaCA9IG51bGw7XG4gICAgICAgIHJldHVybiByZXBsYWNlT2NjdXJyZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcG9ydCB3aGV0aGVyIG9yIG5vdCB0aGlzIHByb3ZpZGVyIGhhcyB0aGUgYWJpbGl0eSB0byBzZWFyY2ggb24gdGhlIGdpdmVuIG9iamVjdFxuICAgICAqL1xuICAgIHN0YXRpYyBjYW5TZWFyY2hPbihkb21haW4pIHtcbiAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZSBDTVNlYXJjaFByb3ZpZGVyIGNhbiBzZWFyY2ggb24gdGhlXG4gICAgICAgIC8vIGZpcnN0IGNlbGwsIGZhbHNlIGluZGljYXRlcyBhbm90aGVyIGVkaXRvciBpcyBwcmVzZW50XG4gICAgICAgIHJldHVybiBkb21haW4gaW5zdGFuY2VvZiBOb3RlYm9va1BhbmVsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBsaXN0IG9mIG1hdGNoZXMgcHJvdmlkZWQgYnkgdGhlIHN0YXJ0UXVlcnkgcHJvbWlzZSByZXNvbHV0aW9uXG4gICAgICovXG4gICAgZ2V0IG1hdGNoZXMoKSB7XG4gICAgICAgIHJldHVybiBbXS5jb25jYXQoLi4udGhpcy5fZ2V0TWF0Y2hlc0Zyb21DZWxscygpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2lnbmFsIGluZGljYXRpbmcgdGhhdCBzb21ldGhpbmcgaW4gdGhlIHNlYXJjaCBoYXMgY2hhbmdlZCwgc28gdGhlIFVJIHNob3VsZCB1cGRhdGVcbiAgICAgKi9cbiAgICBnZXQgY2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBzZWxlY3RlZCBtYXRjaC5cbiAgICAgKi9cbiAgICBnZXQgY3VycmVudE1hdGNoSW5kZXgoKSB7XG4gICAgICAgIGlmICghdGhpcy5fY3VycmVudE1hdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudE1hdGNoLmluZGV4O1xuICAgIH1cbiAgICBfdXBkYXRlZEN1cnJlbnRQcm92aWRlcihyZXZlcnNlKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50UHJvdmlkZXIgJiZcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQcm92aWRlci5jZWxsID09PSB0aGlzLl9zZWFyY2hUYXJnZXQuY29udGVudC5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFByb3ZpZGVyO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwcm92aWRlcjtcbiAgICAgICAgaWYgKCF0aGlzLl9jdXJyZW50UHJvdmlkZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbmQgPSByZXZlcnNlID8gQXJyYXlFeHQuZmluZExhc3RWYWx1ZSA6IEFycmF5RXh0LmZpbmRGaXJzdFZhbHVlO1xuICAgICAgICAgICAgcHJvdmlkZXIgPSBmaW5kKHRoaXMuX3NlYXJjaFByb3ZpZGVycywgcHJvdmlkZXIgPT4gdGhpcy5fc2VhcmNoVGFyZ2V0LmNvbnRlbnQuYWN0aXZlQ2VsbCA9PT0gcHJvdmlkZXIuY2VsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UHJvdmlkZXJJbmRleCA9IEFycmF5RXh0LmZpcnN0SW5kZXhPZih0aGlzLl9zZWFyY2hQcm92aWRlcnMsIHRoaXMuX2N1cnJlbnRQcm92aWRlcik7XG4gICAgICAgICAgICBjb25zdCBuZXh0UHJvdmlkZXJJbmRleCA9ICgocmV2ZXJzZSA/IGN1cnJlbnRQcm92aWRlckluZGV4IC0gMSA6IGN1cnJlbnRQcm92aWRlckluZGV4ICsgMSkgK1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlYXJjaFByb3ZpZGVycy5sZW5ndGgpICVcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWFyY2hQcm92aWRlcnMubGVuZ3RoO1xuICAgICAgICAgICAgcHJvdmlkZXIgPSB0aGlzLl9zZWFyY2hQcm92aWRlcnNbbmV4dFByb3ZpZGVySW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQcm92aWRlciA9IHByb3ZpZGVyO1xuICAgICAgICByZXR1cm4gcHJvdmlkZXI7XG4gICAgfVxuICAgIGFzeW5jIF9zdGVwTmV4dChjdXJyZW50U2VhcmNoUGFpciwgcmV2ZXJzZSA9IGZhbHNlLCBzdGVwcyA9IDApIHtcbiAgICAgICAgY29uc3QgeyBwcm92aWRlciB9ID0gY3VycmVudFNlYXJjaFBhaXI7XG4gICAgICAgIC8vIGhpZ2hsaWdodE5leHQvUHJldmlvdXMgd2lsbCBub3QgYmUgYWJsZSB0byBzZWFyY2ggcmVuZGVyZWQgTWFya2Rvd25DZWxscyBvclxuICAgICAgICAvLyBoaWRkZW4gY29kZSBjZWxscywgYnV0IHRoYXQgaXMgb2theSBoZXJlIGJlY2F1c2UgaW4gc3RhcnRRdWVyeSwgd2UgdW5yZW5kZXJlZFxuICAgICAgICAvLyBhbGwgY2VsbHMgd2l0aCBtYXRjaGVzIGFuZCB1bmhpZGUgYWxsIGNlbGxzXG4gICAgICAgIGNvbnN0IG1hdGNoID0gcmV2ZXJzZVxuICAgICAgICAgICAgPyBhd2FpdCBwcm92aWRlci5oaWdobGlnaHRQcmV2aW91cygpXG4gICAgICAgICAgICA6IGF3YWl0IHByb3ZpZGVyLmhpZ2hsaWdodE5leHQoKTtcbiAgICAgICAgLy8gSWYgdGhlcmUgd2FzIG5vIG1hdGNoIGluIHRoaXMgY2VsbCwgdHJ5IHRoZSBuZXh0IGNlbGxcbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXJJbmRleCA9IHRoaXMuX3NlYXJjaFByb3ZpZGVycy5pbmRleE9mKGN1cnJlbnRTZWFyY2hQYWlyKTtcbiAgICAgICAgICAgIGNvbnN0IG51bVByb3ZpZGVycyA9IHRoaXMuX3NlYXJjaFByb3ZpZGVycy5sZW5ndGg7XG4gICAgICAgICAgICAvLyBXZSBoYXZlIGxvb3BlZCBhcm91bmQgdGhlIHdob2xlIG5vdGVib29rIGFuZCBoYXZlIHNlYXJjaGVkIHRoZSBvcmlnaW5hbFxuICAgICAgICAgICAgLy8gY2VsbCBvbmNlIG1vcmUgYW5kIGZvdW5kIG5vIG1hdGNoZXMuICBEbyBub3QgcHJvY2VlZCB3aXRoIGluY3JlbWVudGluZyB0aGVcbiAgICAgICAgICAgIC8vIGFjdGl2ZSBjZWxsIGluZGV4IHNvIHRoYXQgdGhlIGFjdGl2ZSBjZWxsIGRvZXNuJ3QgY2hhbmdlXG4gICAgICAgICAgICBpZiAoc3RlcHMgPT09IG51bVByb3ZpZGVycykge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBuZXh0SW5kZXggPSAoKHJldmVyc2UgPyBwcm92aWRlckluZGV4IC0gMSA6IHByb3ZpZGVySW5kZXggKyAxKSArIG51bVByb3ZpZGVycykgJVxuICAgICAgICAgICAgICAgIG51bVByb3ZpZGVycztcbiAgICAgICAgICAgIGNvbnN0IG5leHRTZWFyY2hQYWlyID0gdGhpcy5fc2VhcmNoUHJvdmlkZXJzW25leHRJbmRleF07XG4gICAgICAgICAgICBpZiAobmV4dFNlYXJjaFBhaXIucHJvdmlkZXIgaW5zdGFuY2VvZiBDb2RlTWlycm9yU2VhcmNoUHJvdmlkZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0b3IgPSBuZXh0U2VhcmNoUGFpci5wcm92aWRlci5lZGl0b3I7XG4gICAgICAgICAgICAgICAgLy8gbW92ZSB0aGUgY3Vyc29yIG9mIHRoZSBuZXh0IGNlbGwgdG8gdGhlIHN0YXJ0L2VuZCBvZiB0aGUgY2VsbCBzbyBpdCBjYW5cbiAgICAgICAgICAgICAgICAvLyBzZWFyY2ggdGhlIHdob2xlIHRoaW5nIChidXQgZG9uJ3Qgc2Nyb2xsIGJlY2F1c2Ugd2UgaGF2ZW4ndCBmb3VuZCBhbnl0aGluZyB5ZXQpXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UG9zQ00gPSByZXZlcnNlXG4gICAgICAgICAgICAgICAgICAgID8gQ29kZU1pcnJvci5Qb3MoZWRpdG9yLmxhc3RMaW5lKCkpXG4gICAgICAgICAgICAgICAgICAgIDogQ29kZU1pcnJvci5Qb3MoZWRpdG9yLmZpcnN0TGluZSgpLCAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmU6IG5ld1Bvc0NNLmxpbmUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbjogbmV3UG9zQ00uY2hcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRDdXJzb3JQb3NpdGlvbihuZXdQb3MsIHsgc2Nyb2xsOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQcm92aWRlciA9IG5leHRTZWFyY2hQYWlyO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXBOZXh0KG5leHRTZWFyY2hQYWlyLCByZXZlcnNlLCBzdGVwcyArIDEpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5vdGVib29rID0gdGhpcy5fc2VhcmNoVGFyZ2V0LmNvbnRlbnQ7XG4gICAgICAgIG5vdGVib29rLmFjdGl2ZUNlbGxJbmRleCA9IG5vdGVib29rLndpZGdldHMuaW5kZXhPZihjdXJyZW50U2VhcmNoUGFpci5jZWxsKTtcbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH1cbiAgICBfZ2V0TWF0Y2hlc0Zyb21DZWxscygpIHtcbiAgICAgICAgbGV0IGluZGV4VG90YWwgPSAwO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgdGhpcy5fc2VhcmNoUHJvdmlkZXJzLmZvckVhY2goKHsgcHJvdmlkZXIgfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbE1hdGNoZXMgPSBwcm92aWRlci5tYXRjaGVzO1xuICAgICAgICAgICAgY2VsbE1hdGNoZXMuZm9yRWFjaChtYXRjaCA9PiB7XG4gICAgICAgICAgICAgICAgbWF0Y2guaW5kZXggPSBtYXRjaC5pbmRleCArIGluZGV4VG90YWw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGluZGV4VG90YWwgKz0gY2VsbE1hdGNoZXMubGVuZ3RoO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbE1hdGNoZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgX29uU2VhcmNoUHJvdmlkZXJDaGFuZ2VkKCkge1xuICAgICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQodW5kZWZpbmVkKTtcbiAgICB9XG4gICAgX2N1cnJlbnRNYXRjaElzU2VsZWN0ZWQoY20pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jdXJyZW50TWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjdXJyZW50U2VsZWN0aW9uID0gY20uZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZWxlY3Rpb25MZW5ndGggPSBjdXJyZW50U2VsZWN0aW9uLmVuZC5jb2x1bW4gLSBjdXJyZW50U2VsZWN0aW9uLnN0YXJ0LmNvbHVtbjtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uSXNPbmVMaW5lID0gY3VycmVudFNlbGVjdGlvbi5zdGFydC5saW5lID09PSBjdXJyZW50U2VsZWN0aW9uLmVuZC5saW5lO1xuICAgICAgICByZXR1cm4gKHRoaXMuX2N1cnJlbnRNYXRjaC5saW5lID09PSBjdXJyZW50U2VsZWN0aW9uLnN0YXJ0LmxpbmUgJiZcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRNYXRjaC5jb2x1bW4gPT09IGN1cnJlbnRTZWxlY3Rpb24uc3RhcnQuY29sdW1uICYmXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50TWF0Y2gudGV4dC5sZW5ndGggPT09IGN1cnJlbnRTZWxlY3Rpb25MZW5ndGggJiZcbiAgICAgICAgICAgIHNlbGVjdGlvbklzT25lTGluZSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm90ZWJvb2tzZWFyY2hwcm92aWRlci5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBNYWluQXJlYVdpZGdldCB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IE5vdGVib29rUGFuZWwgfSBmcm9tICdAanVweXRlcmxhYi9ub3RlYm9vayc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgeyBjcmVhdGVTZWFyY2hPdmVybGF5IH0gZnJvbSAnLi9zZWFyY2hvdmVybGF5Jztcbi8qKlxuICogUmVwcmVzZW50cyBhIHNlYXJjaCBvbiBhIHNpbmdsZSB3aWRnZXQuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZWFyY2hJbnN0YW5jZSB7XG4gICAgY29uc3RydWN0b3Iod2lkZ2V0LCBzZWFyY2hQcm92aWRlciwgdHJhbnNsYXRvciwgc2VhcmNoRGVib3VuY2VUaW1lID0gNTAwKSB7XG4gICAgICAgIHRoaXMuX2Rpc3BsYXlTdGF0ZSA9IHtcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleDogMCxcbiAgICAgICAgICAgIHRvdGFsTWF0Y2hlczogMCxcbiAgICAgICAgICAgIGNhc2VTZW5zaXRpdmU6IGZhbHNlLFxuICAgICAgICAgICAgdXNlUmVnZXg6IGZhbHNlLFxuICAgICAgICAgICAgc2VhcmNoVGV4dDogJycsXG4gICAgICAgICAgICBxdWVyeTogbnVsbCxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJycsXG4gICAgICAgICAgICBzZWFyY2hJbnB1dEZvY3VzZWQ6IHRydWUsXG4gICAgICAgICAgICByZXBsYWNlSW5wdXRGb2N1c2VkOiBmYWxzZSxcbiAgICAgICAgICAgIGZvcmNlRm9jdXM6IHRydWUsXG4gICAgICAgICAgICByZXBsYWNlVGV4dDogJycsXG4gICAgICAgICAgICByZXBsYWNlRW50cnlTaG93bjogZmFsc2UsXG4gICAgICAgICAgICBmaWx0ZXJzOiB7IG91dHB1dDogdHJ1ZSwgc2VsZWN0ZWRDZWxsczogZmFsc2UgfSxcbiAgICAgICAgICAgIGZpbHRlcnNPcGVuOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9kaXNwbGF5VXBkYXRlU2lnbmFsID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9kaXNwb3NlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMuX3dpZGdldCA9IHdpZGdldDtcbiAgICAgICAgdGhpcy5fYWN0aXZlUHJvdmlkZXIgPSBzZWFyY2hQcm92aWRlcjtcbiAgICAgICAgY29uc3QgaW5pdGlhbFF1ZXJ5ID0gdGhpcy5fYWN0aXZlUHJvdmlkZXIuZ2V0SW5pdGlhbFF1ZXJ5KHRoaXMuX3dpZGdldCk7XG4gICAgICAgIHRoaXMuX2Rpc3BsYXlTdGF0ZS5zZWFyY2hUZXh0ID0gaW5pdGlhbFF1ZXJ5IHx8ICcnO1xuICAgICAgICB0aGlzLl9zZWFyY2hXaWRnZXQgPSBjcmVhdGVTZWFyY2hPdmVybGF5KHtcbiAgICAgICAgICAgIHdpZGdldENoYW5nZWQ6IHRoaXMuX2Rpc3BsYXlVcGRhdGVTaWduYWwsXG4gICAgICAgICAgICBvdmVybGF5U3RhdGU6IHRoaXMuX2Rpc3BsYXlTdGF0ZSxcbiAgICAgICAgICAgIG9uQ2FzZVNlbnNpdGl2ZVRvZ2dsZWQ6IHRoaXMuX29uQ2FzZVNlbnNpdGl2ZVRvZ2dsZWQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIG9uUmVnZXhUb2dnbGVkOiB0aGlzLl9vblJlZ2V4VG9nZ2xlZC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgb25IaWdobGlnaHROZXh0OiB0aGlzLl9oaWdobGlnaHROZXh0LmJpbmQodGhpcyksXG4gICAgICAgICAgICBvbkhpZ2hsaWdodFByZXZpb3VzOiB0aGlzLl9oaWdobGlnaHRQcmV2aW91cy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgb25TdGFydFF1ZXJ5OiB0aGlzLl9zdGFydFF1ZXJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgICBvblJlcGxhY2VDdXJyZW50OiB0aGlzLl9yZXBsYWNlQ3VycmVudC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgb25SZXBsYWNlQWxsOiB0aGlzLl9yZXBsYWNlQWxsLmJpbmQodGhpcyksXG4gICAgICAgICAgICBvbkVuZFNlYXJjaDogdGhpcy5kaXNwb3NlLmJpbmQodGhpcyksXG4gICAgICAgICAgICBpc1JlYWRPbmx5OiB0aGlzLl9hY3RpdmVQcm92aWRlci5pc1JlYWRPbmx5LFxuICAgICAgICAgICAgaGFzT3V0cHV0czogdGhpcy5fYWN0aXZlUHJvdmlkZXIuaGFzT3V0cHV0cyB8fCBmYWxzZSxcbiAgICAgICAgICAgIHNlYXJjaERlYm91bmNlVGltZTogc2VhcmNoRGVib3VuY2VUaW1lLFxuICAgICAgICAgICAgdHJhbnNsYXRvcjogdGhpcy50cmFuc2xhdG9yXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl93aWRnZXQuZGlzcG9zZWQuY29ubmVjdCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3NlYXJjaFdpZGdldC5kaXNwb3NlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3dpZGdldC5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBUT0RPOiB0aGlzIGRvZXMgbm90IHVwZGF0ZSBpZiB0aGUgdG9vbGJhciBjaGFuZ2VzIGhlaWdodC5cbiAgICAgICAgaWYgKHRoaXMuX3dpZGdldCBpbnN0YW5jZW9mIE1haW5BcmVhV2lkZ2V0KSB7XG4gICAgICAgICAgICAvLyBPZmZzZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBzZWFyY2ggd2lkZ2V0IHRvIG5vdCBjb3ZlciB0aGUgdG9vbGJhci5cbiAgICAgICAgICAgIHRoaXMuX3NlYXJjaFdpZGdldC5ub2RlLnN0eWxlLnRvcCA9IGAke3RoaXMuX3dpZGdldC50b29sYmFyLm5vZGUuY2xpZW50SGVpZ2h0fXB4YDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fd2lkZ2V0IGluc3RhbmNlb2YgTm90ZWJvb2tQYW5lbCkge1xuICAgICAgICAgICAgdGhpcy5fd2lkZ2V0LmNvbnRlbnQuYWN0aXZlQ2VsbENoYW5nZWQuY29ubmVjdCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Rpc3BsYXlTdGF0ZS5xdWVyeSAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXNwbGF5U3RhdGUuZmlsdGVycy5zZWxlY3RlZENlbGxzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgdGhpcy5fc3RhcnRRdWVyeSh0aGlzLl9kaXNwbGF5U3RhdGUucXVlcnksIHRoaXMuX2Rpc3BsYXlTdGF0ZS5maWx0ZXJzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kaXNwbGF5U2VhcmNoV2lkZ2V0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzZWFyY2ggd2lkZ2V0LlxuICAgICAqL1xuICAgIGdldCBzZWFyY2hXaWRnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWFyY2hXaWRnZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzZWFyY2ggcHJvdmlkZXIuXG4gICAgICovXG4gICAgZ2V0IHByb3ZpZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlUHJvdmlkZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZvY3VzIHRoZSBzZWFyY2ggd2lkZ2V0IGlucHV0LlxuICAgICAqL1xuICAgIGZvY3VzSW5wdXQoKSB7XG4gICAgICAgIHRoaXMuX2Rpc3BsYXlTdGF0ZS5mb3JjZUZvY3VzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZGlzcGxheVN0YXRlLnNlYXJjaElucHV0Rm9jdXNlZCA9IHRydWU7XG4gICAgICAgIC8vIFRyaWdnZXIgYSByZXJlbmRlciB3aXRob3V0IHJlc2V0dGluZyB0aGUgZm9yY2VGb2N1cy5cbiAgICAgICAgdGhpcy5fZGlzcGxheVVwZGF0ZVNpZ25hbC5lbWl0KHRoaXMuX2Rpc3BsYXlTdGF0ZSk7XG4gICAgICAgIHRoaXMuX2Rpc3BsYXlTdGF0ZS5mb3JjZUZvY3VzID0gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgc2VhcmNoIHRleHRcbiAgICAgKlxuICAgICAqIEl0IGRvZXMgbm90IHRyaWdnZXIgYSB2aWV3IHVwZGF0ZS5cbiAgICAgKi9cbiAgICBzZXRTZWFyY2hUZXh0KHNlYXJjaCkge1xuICAgICAgICB0aGlzLl9kaXNwbGF5U3RhdGUuc2VhcmNoVGV4dCA9IHNlYXJjaDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSByZXBsYWNlIHRleHRcbiAgICAgKlxuICAgICAqIEl0IGRvZXMgbm90IHRyaWdnZXIgYSB2aWV3IHVwZGF0ZS5cbiAgICAgKi9cbiAgICBzZXRSZXBsYWNlVGV4dChyZXBsYWNlKSB7XG4gICAgICAgIHRoaXMuX2Rpc3BsYXlTdGF0ZS5yZXBsYWNlVGV4dCA9IHJlcGxhY2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElmIHRoZXJlIGlzIGEgcmVwbGFjZSBib3gsIHNob3cgaXQuXG4gICAgICovXG4gICAgc2hvd1JlcGxhY2UoKSB7XG4gICAgICAgIHRoaXMuX2Rpc3BsYXlTdGF0ZS5yZXBsYWNlRW50cnlTaG93biA9IHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIG1hdGNoIGluZGV4IGFuZCB0b3RhbCBkaXNwbGF5IGluIHRoZSBzZWFyY2ggd2lkZ2V0LlxuICAgICAqL1xuICAgIHVwZGF0ZUluZGljZXMoKSB7XG4gICAgICAgIHRoaXMuX2Rpc3BsYXlTdGF0ZS50b3RhbE1hdGNoZXMgPSB0aGlzLl9hY3RpdmVQcm92aWRlci5tYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgdGhpcy5fZGlzcGxheVN0YXRlLmN1cnJlbnRJbmRleCA9IHRoaXMuX2FjdGl2ZVByb3ZpZGVyLmN1cnJlbnRNYXRjaEluZGV4O1xuICAgICAgICB0aGlzLl91cGRhdGVEaXNwbGF5KCk7XG4gICAgfVxuICAgIF91cGRhdGVEaXNwbGF5KCkge1xuICAgICAgICAvLyBSZXNldCB0aGUgZm9jdXMgYXR0cmlidXRlIHRvIG1ha2Ugc3VyZSB3ZSBkb24ndCBzdGVhbCBmb2N1cy5cbiAgICAgICAgdGhpcy5fZGlzcGxheVN0YXRlLmZvcmNlRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgLy8gVHJpZ2dlciBhIHJlcmVuZGVyXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlVcGRhdGVTaWduYWwuZW1pdCh0aGlzLl9kaXNwbGF5U3RhdGUpO1xuICAgIH1cbiAgICBhc3luYyBfc3RhcnRRdWVyeShxdWVyeSwgZmlsdGVycykge1xuICAgICAgICAvLyBzYXZlIHRoZSBsYXN0IHF1ZXJ5IChvciBzZXQgaXQgdG8gdGhlIGN1cnJlbnQgcXVlcnkgaWYgdGhpcyBpcyB0aGUgZmlyc3QpXG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVQcm92aWRlciAmJiB0aGlzLl9kaXNwbGF5U3RhdGUucXVlcnkpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX2FjdGl2ZVByb3ZpZGVyLmVuZFF1ZXJ5KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZGlzcGxheVN0YXRlLnF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgIHRoaXMuX2Rpc3BsYXlTdGF0ZS5maWx0ZXJzID0gZmlsdGVycztcbiAgICAgICAgYXdhaXQgdGhpcy5fYWN0aXZlUHJvdmlkZXIuc3RhcnRRdWVyeShxdWVyeSwgdGhpcy5fd2lkZ2V0LCBmaWx0ZXJzKTtcbiAgICAgICAgdGhpcy51cGRhdGVJbmRpY2VzKCk7XG4gICAgICAgIC8vIHRoaXMgc2lnbmFsIHNob3VsZCBnZXQgaW5qZWN0ZWQgd2hlbiB0aGUgd2lkZ2V0IGlzXG4gICAgICAgIC8vIGNyZWF0ZWQgYW5kIGhvb2tlZCB1cCB0byByZWFjdCFcbiAgICAgICAgdGhpcy5fYWN0aXZlUHJvdmlkZXIuY2hhbmdlZC5jb25uZWN0KHRoaXMudXBkYXRlSW5kaWNlcywgdGhpcyk7XG4gICAgfVxuICAgIGFzeW5jIF9yZXBsYWNlQ3VycmVudChuZXdUZXh0KSB7XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVQcm92aWRlciAmJiB0aGlzLl9kaXNwbGF5U3RhdGUucXVlcnkpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX2FjdGl2ZVByb3ZpZGVyLnJlcGxhY2VDdXJyZW50TWF0Y2gobmV3VGV4dCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUluZGljZXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBfcmVwbGFjZUFsbChuZXdUZXh0KSB7XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVQcm92aWRlciAmJiB0aGlzLl9kaXNwbGF5U3RhdGUucXVlcnkpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX2FjdGl2ZVByb3ZpZGVyLnJlcGxhY2VBbGxNYXRjaGVzKG5ld1RleHQpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbmRpY2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIHNlYXJjaCBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIC8vIElmIGEgcXVlcnkgaGFzbid0IGJlZW4gZXhlY3V0ZWQgeWV0LCBubyBuZWVkIHRvIGNhbGwgZW5kU2VhcmNoXG4gICAgICAgIGlmICh0aGlzLl9kaXNwbGF5U3RhdGUucXVlcnkpIHtcbiAgICAgICAgICAgIHZvaWQgdGhpcy5fYWN0aXZlUHJvdmlkZXIuZW5kU2VhcmNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2VhcmNoV2lkZ2V0LmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fZGlzcG9zZWQuZW1pdCh1bmRlZmluZWQpO1xuICAgICAgICBTaWduYWwuY2xlYXJEYXRhKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUZXN0IGlmIHRoZSBvYmplY3QgaGFzIGJlZW4gZGlzcG9zZWQuXG4gICAgICovXG4gICAgZ2V0IGlzRGlzcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0Rpc3Bvc2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIG9iamVjdCBpcyBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgZGlzcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwb3NlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcGxheSBzZWFyY2ggd2lkZ2V0LlxuICAgICAqL1xuICAgIF9kaXNwbGF5U2VhcmNoV2lkZ2V0KCkge1xuICAgICAgICBpZiAoIXRoaXMuX3NlYXJjaFdpZGdldC5pc0F0dGFjaGVkKSB7XG4gICAgICAgICAgICBXaWRnZXQuYXR0YWNoKHRoaXMuX3NlYXJjaFdpZGdldCwgdGhpcy5fd2lkZ2V0Lm5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIF9oaWdobGlnaHROZXh0KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2Rpc3BsYXlTdGF0ZS5xdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuX2FjdGl2ZVByb3ZpZGVyLmhpZ2hsaWdodE5leHQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVJbmRpY2VzKCk7XG4gICAgfVxuICAgIGFzeW5jIF9oaWdobGlnaHRQcmV2aW91cygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kaXNwbGF5U3RhdGUucXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLl9hY3RpdmVQcm92aWRlci5oaWdobGlnaHRQcmV2aW91cygpO1xuICAgICAgICB0aGlzLnVwZGF0ZUluZGljZXMoKTtcbiAgICB9XG4gICAgX29uQ2FzZVNlbnNpdGl2ZVRvZ2dsZWQoKSB7XG4gICAgICAgIHRoaXMuX2Rpc3BsYXlTdGF0ZS5jYXNlU2Vuc2l0aXZlID0gIXRoaXMuX2Rpc3BsYXlTdGF0ZS5jYXNlU2Vuc2l0aXZlO1xuICAgICAgICB0aGlzLl91cGRhdGVEaXNwbGF5KCk7XG4gICAgfVxuICAgIF9vblJlZ2V4VG9nZ2xlZCgpIHtcbiAgICAgICAgdGhpcy5fZGlzcGxheVN0YXRlLnVzZVJlZ2V4ID0gIXRoaXMuX2Rpc3BsYXlTdGF0ZS51c2VSZWdleDtcbiAgICAgICAgdGhpcy5fdXBkYXRlRGlzcGxheSgpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlYXJjaGluc3RhbmNlLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFJlYWN0V2lkZ2V0LCBVc2VTaWduYWwgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGNhcmV0RG93bkVtcHR5VGhpbkljb24sIGNhcmV0RG93bkljb24sIGNhcmV0UmlnaHRJY29uLCBjYXJldFVwRW1wdHlUaGluSWNvbiwgY2FzZVNlbnNpdGl2ZUljb24sIGNsYXNzZXMsIGNsb3NlSWNvbiwgZWxsaXBzZXNJY29uLCByZWdleEljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IERlYm91bmNlciB9IGZyb20gJ0BsdW1pbm8vcG9sbGluZyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5jb25zdCBPVkVSTEFZX0NMQVNTID0gJ2pwLURvY3VtZW50U2VhcmNoLW92ZXJsYXknO1xuY29uc3QgT1ZFUkxBWV9ST1dfQ0xBU1MgPSAnanAtRG9jdW1lbnRTZWFyY2gtb3ZlcmxheS1yb3cnO1xuY29uc3QgSU5QVVRfQ0xBU1MgPSAnanAtRG9jdW1lbnRTZWFyY2gtaW5wdXQnO1xuY29uc3QgSU5QVVRfV1JBUFBFUl9DTEFTUyA9ICdqcC1Eb2N1bWVudFNlYXJjaC1pbnB1dC13cmFwcGVyJztcbmNvbnN0IElOUFVUX0JVVFRPTl9DTEFTU19PRkYgPSAnanAtRG9jdW1lbnRTZWFyY2gtaW5wdXQtYnV0dG9uLW9mZic7XG5jb25zdCBJTlBVVF9CVVRUT05fQ0xBU1NfT04gPSAnanAtRG9jdW1lbnRTZWFyY2gtaW5wdXQtYnV0dG9uLW9uJztcbmNvbnN0IElOREVYX0NPVU5URVJfQ0xBU1MgPSAnanAtRG9jdW1lbnRTZWFyY2gtaW5kZXgtY291bnRlcic7XG5jb25zdCBVUF9ET1dOX0JVVFRPTl9XUkFQUEVSX0NMQVNTID0gJ2pwLURvY3VtZW50U2VhcmNoLXVwLWRvd24td3JhcHBlcic7XG5jb25zdCBVUF9ET1dOX0JVVFRPTl9DTEFTUyA9ICdqcC1Eb2N1bWVudFNlYXJjaC11cC1kb3duLWJ1dHRvbic7XG5jb25zdCBFTExJUFNFU19CVVRUT05fQ0xBU1MgPSAnanAtRG9jdW1lbnRTZWFyY2gtZWxsaXBzZXMtYnV0dG9uJztcbmNvbnN0IEVMTElQU0VTX0JVVFRPTl9FTkFCTEVEX0NMQVNTID0gJ2pwLURvY3VtZW50U2VhcmNoLWVsbGlwc2VzLWJ1dHRvbi1lbmFibGVkJztcbmNvbnN0IFJFR0VYX0VSUk9SX0NMQVNTID0gJ2pwLURvY3VtZW50U2VhcmNoLXJlZ2V4LWVycm9yJztcbmNvbnN0IFNFQVJDSF9PUFRJT05TX0NMQVNTID0gJ2pwLURvY3VtZW50U2VhcmNoLXNlYXJjaC1vcHRpb25zJztcbmNvbnN0IFNFQVJDSF9PUFRJT05TX0RJU0FCTEVEX0NMQVNTID0gJ2pwLURvY3VtZW50U2VhcmNoLXNlYXJjaC1vcHRpb25zLWRpc2FibGVkJztcbmNvbnN0IFNFQVJDSF9ET0NVTUVOVF9MT0FESU5HID0gJ2pwLURvY3VtZW50U2VhcmNoLWRvY3VtZW50LWxvYWRpbmcnO1xuY29uc3QgUkVQTEFDRV9FTlRSWV9DTEFTUyA9ICdqcC1Eb2N1bWVudFNlYXJjaC1yZXBsYWNlLWVudHJ5JztcbmNvbnN0IFJFUExBQ0VfQlVUVE9OX0NMQVNTID0gJ2pwLURvY3VtZW50U2VhcmNoLXJlcGxhY2UtYnV0dG9uJztcbmNvbnN0IFJFUExBQ0VfQlVUVE9OX1dSQVBQRVJfQ0xBU1MgPSAnanAtRG9jdW1lbnRTZWFyY2gtcmVwbGFjZS1idXR0b24td3JhcHBlcic7XG5jb25zdCBSRVBMQUNFX1dSQVBQRVJfQ0xBU1MgPSAnanAtRG9jdW1lbnRTZWFyY2gtcmVwbGFjZS13cmFwcGVyLWNsYXNzJztcbmNvbnN0IFJFUExBQ0VfVE9HR0xFX0NMQVNTID0gJ2pwLURvY3VtZW50U2VhcmNoLXJlcGxhY2UtdG9nZ2xlJztcbmNvbnN0IEZPQ1VTRURfSU5QVVQgPSAnanAtRG9jdW1lbnRTZWFyY2gtZm9jdXNlZC1pbnB1dCc7XG5jb25zdCBUT0dHTEVfV1JBUFBFUiA9ICdqcC1Eb2N1bWVudFNlYXJjaC10b2dnbGUtd3JhcHBlcic7XG5jb25zdCBUT0dHTEVfUExBQ0VIT0xERVIgPSAnanAtRG9jdW1lbnRTZWFyY2gtdG9nZ2xlLXBsYWNlaG9sZGVyJztcbmNvbnN0IEJVVFRPTl9DT05URU5UX0NMQVNTID0gJ2pwLURvY3VtZW50U2VhcmNoLWJ1dHRvbi1jb250ZW50JztcbmNvbnN0IEJVVFRPTl9XUkFQUEVSX0NMQVNTID0gJ2pwLURvY3VtZW50U2VhcmNoLWJ1dHRvbi13cmFwcGVyJztcbmNvbnN0IFNQQUNFUl9DTEFTUyA9ICdqcC1Eb2N1bWVudFNlYXJjaC1zcGFjZXInO1xuY2xhc3MgU2VhcmNoRW50cnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gcHJvcHMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgdGhpcy5fdHJhbnMgPSB0aGlzLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICB0aGlzLnNlYXJjaElucHV0UmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZvY3VzIHRoZSBpbnB1dC5cbiAgICAgKi9cbiAgICBmb2N1c0lucHV0KCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIFNlbGVjdCAoYW5kIGZvY3VzKSBhbnkgdGV4dCBhbHJlYWR5IHByZXNlbnQuXG4gICAgICAgIC8vIFRoaXMgbWFrZXMgdHlwaW5nIGluIHRoZSBib3ggc3RhcnRzIGEgbmV3IHF1ZXJ5ICh0aGUgY29tbW9uIGNhc2UpLFxuICAgICAgICAvLyB3aGlsZSBhcnJvdyBrZXlzIGNhbiBiZSB1c2VkIHRvIG1vdmUgY3Vyc29yIGluIHByZXBhcmF0aW9uIGZvclxuICAgICAgICAvLyBtb2RpZnlpbmcgcHJldmlvdXMgcXVlcnkuXG4gICAgICAgIChfYSA9IHRoaXMuc2VhcmNoSW5wdXRSZWYuY3VycmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNlbGVjdCgpO1xuICAgIH1cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmZvcmNlRm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNJbnB1dCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgY2FzZUJ1dHRvblRvZ2dsZUNsYXNzID0gY2xhc3Nlcyh0aGlzLnByb3BzLmNhc2VTZW5zaXRpdmUgPyBJTlBVVF9CVVRUT05fQ0xBU1NfT04gOiBJTlBVVF9CVVRUT05fQ0xBU1NfT0ZGLCBCVVRUT05fQ09OVEVOVF9DTEFTUyk7XG4gICAgICAgIGNvbnN0IHJlZ2V4QnV0dG9uVG9nZ2xlQ2xhc3MgPSBjbGFzc2VzKHRoaXMucHJvcHMudXNlUmVnZXggPyBJTlBVVF9CVVRUT05fQ0xBU1NfT04gOiBJTlBVVF9CVVRUT05fQ0xBU1NfT0ZGLCBCVVRUT05fQ09OVEVOVF9DTEFTUyk7XG4gICAgICAgIGNvbnN0IHdyYXBwZXJDbGFzcyA9IGAke0lOUFVUX1dSQVBQRVJfQ0xBU1N9ICR7dGhpcy5wcm9wcy5pbnB1dEZvY3VzZWQgPyBGT0NVU0VEX0lOUFVUIDogJyd9YDtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiB3cmFwcGVyQ2xhc3MgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLnNlYXJjaFRleHQgPyB1bmRlZmluZWQgOiB0aGlzLl90cmFucy5fXygnRmluZCcpLCBjbGFzc05hbWU6IElOUFVUX0NMQVNTLCB2YWx1ZTogdGhpcy5wcm9wcy5zZWFyY2hUZXh0LCBvbkNoYW5nZTogZSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKGUpLCBvbktleURvd246IGUgPT4gdGhpcy5wcm9wcy5vbktleWRvd24oZSksIHRhYkluZGV4OiAwLCBvbkZvY3VzOiBlID0+IHRoaXMucHJvcHMub25JbnB1dEZvY3VzKCksIG9uQmx1cjogZSA9PiB0aGlzLnByb3BzLm9uSW5wdXRCbHVyKCksIHJlZjogdGhpcy5zZWFyY2hJbnB1dFJlZiB9KSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IEJVVFRPTl9XUkFQUEVSX0NMQVNTLCBvbkNsaWNrOiAoKSA9PiB0aGlzLnByb3BzLm9uQ2FzZVNlbnNpdGl2ZVRvZ2dsZWQoKSwgdGFiSW5kZXg6IDAgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KGNhc2VTZW5zaXRpdmVJY29uLnJlYWN0LCB7IGNsYXNzTmFtZTogY2FzZUJ1dHRvblRvZ2dsZUNsYXNzLCB0YWc6IFwic3BhblwiIH0pKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IEJVVFRPTl9XUkFQUEVSX0NMQVNTLCBvbkNsaWNrOiAoKSA9PiB0aGlzLnByb3BzLm9uUmVnZXhUb2dnbGVkKCksIHRhYkluZGV4OiAwIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChyZWdleEljb24ucmVhY3QsIHsgY2xhc3NOYW1lOiByZWdleEJ1dHRvblRvZ2dsZUNsYXNzLCB0YWc6IFwic3BhblwiIH0pKSkpO1xuICAgIH1cbn1cbmNsYXNzIFJlcGxhY2VFbnRyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLl90cmFucyA9IChwcm9wcy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yKS5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHRoaXMucmVwbGFjZUlucHV0UmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBSRVBMQUNFX1dSQVBQRVJfQ0xBU1MgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLnJlcGxhY2VUZXh0ID8gdW5kZWZpbmVkIDogdGhpcy5fdHJhbnMuX18oJ1JlcGxhY2UnKSwgY2xhc3NOYW1lOiBSRVBMQUNFX0VOVFJZX0NMQVNTLCB2YWx1ZTogdGhpcy5wcm9wcy5yZXBsYWNlVGV4dCwgb25LZXlEb3duOiBlID0+IHRoaXMucHJvcHMub25SZXBsYWNlS2V5ZG93bihlKSwgb25DaGFuZ2U6IGUgPT4gdGhpcy5wcm9wcy5vbkNoYW5nZShlKSwgdGFiSW5kZXg6IDAsIHJlZjogdGhpcy5yZXBsYWNlSW5wdXRSZWYgfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBSRVBMQUNFX0JVVFRPTl9XUkFQUEVSX0NMQVNTLCBvbkNsaWNrOiAoKSA9PiB0aGlzLnByb3BzLm9uUmVwbGFjZUN1cnJlbnQoKSwgdGFiSW5kZXg6IDAgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogYCR7UkVQTEFDRV9CVVRUT05fQ0xBU1N9ICR7QlVUVE9OX0NPTlRFTlRfQ0xBU1N9YCwgdGFiSW5kZXg6IDAgfSwgdGhpcy5fdHJhbnMuX18oJ1JlcGxhY2UnKSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogUkVQTEFDRV9CVVRUT05fV1JBUFBFUl9DTEFTUywgdGFiSW5kZXg6IDAsIG9uQ2xpY2s6ICgpID0+IHRoaXMucHJvcHMub25SZXBsYWNlQWxsKCkgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogYCR7UkVQTEFDRV9CVVRUT05fQ0xBU1N9ICR7QlVUVE9OX0NPTlRFTlRfQ0xBU1N9YCwgdGFiSW5kZXg6IC0xIH0sIHRoaXMuX3RyYW5zLl9fKCdSZXBsYWNlIEFsbCcpKSkpKTtcbiAgICB9XG59XG5mdW5jdGlvbiBVcERvd25CdXR0b25zKHByb3BzKSB7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBVUF9ET1dOX0JVVFRPTl9XUkFQUEVSX0NMQVNTIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IEJVVFRPTl9XUkFQUEVSX0NMQVNTLCBvbkNsaWNrOiAoKSA9PiBwcm9wcy5vbkhpZ2hsaWdodFByZXZpb3VzKCksIHRhYkluZGV4OiAwIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KGNhcmV0VXBFbXB0eVRoaW5JY29uLnJlYWN0LCB7IGNsYXNzTmFtZTogY2xhc3NlcyhVUF9ET1dOX0JVVFRPTl9DTEFTUywgQlVUVE9OX0NPTlRFTlRfQ0xBU1MpLCB0YWc6IFwic3BhblwiIH0pKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogQlVUVE9OX1dSQVBQRVJfQ0xBU1MsIG9uQ2xpY2s6ICgpID0+IHByb3BzLm9uSGlnaGxpZ2h0TmV4dCgpLCB0YWJJbmRleDogMCB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChjYXJldERvd25FbXB0eVRoaW5JY29uLnJlYWN0LCB7IGNsYXNzTmFtZTogY2xhc3NlcyhVUF9ET1dOX0JVVFRPTl9DTEFTUywgQlVUVE9OX0NPTlRFTlRfQ0xBU1MpLCB0YWc6IFwic3BhblwiIH0pKSkpO1xufVxuZnVuY3Rpb24gU2VhcmNoSW5kaWNlcyhwcm9wcykge1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogSU5ERVhfQ09VTlRFUl9DTEFTUyB9LCBwcm9wcy50b3RhbE1hdGNoZXMgPT09IDBcbiAgICAgICAgPyAnLS8tJ1xuICAgICAgICA6IGAke3Byb3BzLmN1cnJlbnRJbmRleCA9PT0gbnVsbCA/ICctJyA6IHByb3BzLmN1cnJlbnRJbmRleCArIDF9LyR7cHJvcHMudG90YWxNYXRjaGVzfWApKTtcbn1cbmNsYXNzIEZpbHRlclRvZ2dsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gYCR7RUxMSVBTRVNfQlVUVE9OX0NMQVNTfSAke0JVVFRPTl9DT05URU5UX0NMQVNTfWA7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZSA9IGAke2NsYXNzTmFtZX0gJHtFTExJUFNFU19CVVRUT05fRU5BQkxFRF9DTEFTU31gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogQlVUVE9OX1dSQVBQRVJfQ0xBU1MsIG9uQ2xpY2s6ICgpID0+IHRoaXMucHJvcHMudG9nZ2xlRW5hYmxlZCgpLCB0YWJJbmRleDogMCB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChlbGxpcHNlc0ljb24ucmVhY3QsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIHRhZzogXCJzcGFuXCIsIGhlaWdodDogXCIyMHB4XCIsIHdpZHRoOiBcIjIwcHhcIiB9KSkpO1xuICAgIH1cbn1cbmNsYXNzIEZpbHRlclNlbGVjdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogU0VBUkNIX09QVElPTlNfQ0xBU1MgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogdGhpcy5wcm9wcy5jYW5Ub2dnbGVPdXRwdXQgPyAnJyA6IFNFQVJDSF9PUFRJT05TX0RJU0FCTEVEX0NMQVNTIH0sIHRoaXMucHJvcHMudHJhbnMuX18oJ1NlYXJjaCBDZWxsIE91dHB1dHMnKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBkaXNhYmxlZDogIXRoaXMucHJvcHMuY2FuVG9nZ2xlT3V0cHV0LCBjaGVja2VkOiB0aGlzLnByb3BzLnNlYXJjaE91dHB1dCwgb25DaGFuZ2U6IHRoaXMucHJvcHMudG9nZ2xlT3V0cHV0IH0pKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogdGhpcy5wcm9wcy5jYW5Ub2dnbGVTZWxlY3RlZENlbGxzXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFNFQVJDSF9PUFRJT05TX0RJU0FCTEVEX0NMQVNTIH0sIHRoaXMucHJvcHMudHJhbnMuX18oJ1NlYXJjaCBTZWxlY3RlZCBDZWxsKHMpJykpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiwgZGlzYWJsZWQ6ICF0aGlzLnByb3BzLmNhblRvZ2dsZVNlbGVjdGVkQ2VsbHMsIGNoZWNrZWQ6IHRoaXMucHJvcHMuc2VhcmNoU2VsZWN0ZWRDZWxscywgb25DaGFuZ2U6IHRoaXMucHJvcHMudG9nZ2xlU2VsZWN0ZWRDZWxscyB9KSkpKTtcbiAgICB9XG59XG5jbGFzcyBTZWFyY2hPdmVybGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gcHJvcHMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHByb3BzLm92ZXJsYXlTdGF0ZTtcbiAgICAgICAgdGhpcy5yZXBsYWNlRW50cnlSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcbiAgICAgICAgdGhpcy5fZGVib3VuY2VkU3RhcnRTZWFyY2ggPSBuZXcgRGVib3VuY2VyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2V4ZWN1dGVTZWFyY2godHJ1ZSwgdGhpcy5zdGF0ZS5zZWFyY2hUZXh0KTtcbiAgICAgICAgfSwgKF9hID0gcHJvcHMuc2VhcmNoRGVib3VuY2VUaW1lKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiA1MDApO1xuICAgICAgICB0aGlzLl90b2dnbGVTZWFyY2hPdXRwdXQgPSB0aGlzLl90b2dnbGVTZWFyY2hPdXRwdXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlU2VhcmNoU2VsZWN0ZWRDZWxscyA9IHRoaXMuX3RvZ2dsZVNlYXJjaFNlbGVjdGVkQ2VsbHMuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlYXJjaFRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2V4ZWN1dGVTZWFyY2godHJ1ZSwgdGhpcy5zdGF0ZS5zZWFyY2hUZXh0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfb25TZWFyY2hDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoVGV4dCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlYXJjaFRleHQ6IHNlYXJjaFRleHQgfSk7XG4gICAgICAgIHZvaWQgdGhpcy5fZGVib3VuY2VkU3RhcnRTZWFyY2guaW52b2tlKCk7XG4gICAgfVxuICAgIF9vblJlcGxhY2VDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHJlcGxhY2VUZXh0OiBldmVudC50YXJnZXQudmFsdWUgfSk7XG4gICAgfVxuICAgIF9vblNlYXJjaEtleWRvd24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLl9leGVjdXRlU2VhcmNoKCFldmVudC5zaGlmdEtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuX29uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfb25SZXBsYWNlS2V5ZG93bihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25SZXBsYWNlQ3VycmVudCh0aGlzLnN0YXRlLnJlcGxhY2VUZXh0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZXhlY3V0ZVNlYXJjaChnb0ZvcndhcmQsIHNlYXJjaFRleHQsIGZpbHRlckNoYW5nZWQgPSBmYWxzZSkge1xuICAgICAgICAvLyBleGVjdXRlIHNlYXJjaCFcbiAgICAgICAgbGV0IHF1ZXJ5O1xuICAgICAgICBjb25zdCBpbnB1dCA9IHNlYXJjaFRleHQgPyBzZWFyY2hUZXh0IDogdGhpcy5zdGF0ZS5zZWFyY2hUZXh0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcXVlcnkgPSBQcml2YXRlLnBhcnNlUXVlcnkoaW5wdXQsIHRoaXMucHJvcHMub3ZlcmxheVN0YXRlLmNhc2VTZW5zaXRpdmUsIHRoaXMucHJvcHMub3ZlcmxheVN0YXRlLnVzZVJlZ2V4KTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBlcnJvck1lc3NhZ2U6ICcnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3JNZXNzYWdlOiBlLm1lc3NhZ2UgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFByaXZhdGUucmVnZXhFcXVhbCh0aGlzLnByb3BzLm92ZXJsYXlTdGF0ZS5xdWVyeSwgcXVlcnkpICYmXG4gICAgICAgICAgICAhZmlsdGVyQ2hhbmdlZCkge1xuICAgICAgICAgICAgaWYgKGdvRm9yd2FyZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25IaWdobGlnaHROZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uSGlnaGxpZ2h0UHJldmlvdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLm9uU3RhcnRRdWVyeShxdWVyeSwgdGhpcy5zdGF0ZS5maWx0ZXJzKTtcbiAgICB9XG4gICAgX29uQ2xvc2UoKSB7XG4gICAgICAgIC8vIENsZWFuIHVwIGFuZCBjbG9zZSB3aWRnZXQuXG4gICAgICAgIHRoaXMucHJvcHMub25FbmRTZWFyY2goKTtcbiAgICAgICAgdGhpcy5fZGVib3VuY2VkU3RhcnRTZWFyY2guZGlzcG9zZSgpO1xuICAgIH1cbiAgICBfb25SZXBsYWNlVG9nZ2xlZCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICByZXBsYWNlRW50cnlTaG93bjogIXRoaXMuc3RhdGUucmVwbGFjZUVudHJ5U2hvd25cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9vblNlYXJjaElucHV0Rm9jdXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5zZWFyY2hJbnB1dEZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hJbnB1dEZvY3VzZWQ6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX29uU2VhcmNoSW5wdXRCbHVyKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZWFyY2hJbnB1dEZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hJbnB1dEZvY3VzZWQ6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIF90b2dnbGVTZWFyY2hPdXRwdXQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUocHJldlN0YXRlID0+IChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHByZXZTdGF0ZSksIHsgZmlsdGVyczogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwcmV2U3RhdGUuZmlsdGVycyksIHsgb3V0cHV0OiAhcHJldlN0YXRlLmZpbHRlcnMub3V0cHV0IH0pIH0pKSwgKCkgPT4gdGhpcy5fZXhlY3V0ZVNlYXJjaCh0cnVlLCB1bmRlZmluZWQsIHRydWUpKTtcbiAgICB9XG4gICAgX3RvZ2dsZVNlYXJjaFNlbGVjdGVkQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUocHJldlN0YXRlID0+IChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHByZXZTdGF0ZSksIHsgZmlsdGVyczogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwcmV2U3RhdGUuZmlsdGVycyksIHsgc2VsZWN0ZWRDZWxsczogIXByZXZTdGF0ZS5maWx0ZXJzLnNlbGVjdGVkQ2VsbHMgfSkgfSkpLCAoKSA9PiB0aGlzLl9leGVjdXRlU2VhcmNoKHRydWUsIHVuZGVmaW5lZCwgdHJ1ZSkpO1xuICAgIH1cbiAgICBfdG9nZ2xlRmlsdGVyc09wZW4oKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUocHJldlN0YXRlID0+ICh7XG4gICAgICAgICAgICBmaWx0ZXJzT3BlbjogIXByZXZTdGF0ZS5maWx0ZXJzT3BlblxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qgc2hvd1JlcGxhY2UgPSAhdGhpcy5wcm9wcy5pc1JlYWRPbmx5ICYmIHRoaXMuc3RhdGUucmVwbGFjZUVudHJ5U2hvd247XG4gICAgICAgIGNvbnN0IHNob3dGaWx0ZXIgPSB0aGlzLnByb3BzLmhhc091dHB1dHM7XG4gICAgICAgIGNvbnN0IGZpbHRlclRvZ2dsZSA9IHNob3dGaWx0ZXIgPyAoUmVhY3QuY3JlYXRlRWxlbWVudChGaWx0ZXJUb2dnbGUsIHsgZW5hYmxlZDogdGhpcy5zdGF0ZS5maWx0ZXJzT3BlbiwgdG9nZ2xlRW5hYmxlZDogKCkgPT4gdGhpcy5fdG9nZ2xlRmlsdGVyc09wZW4oKSB9KSkgOiBudWxsO1xuICAgICAgICBjb25zdCBmaWx0ZXIgPSBzaG93RmlsdGVyID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsdGVyU2VsZWN0aW9uLCB7IGtleTogJ2ZpbHRlcicsIGNhblRvZ2dsZU91dHB1dDogIXNob3dSZXBsYWNlLCBjYW5Ub2dnbGVTZWxlY3RlZENlbGxzOiB0cnVlLCBzZWFyY2hPdXRwdXQ6IHRoaXMuc3RhdGUuZmlsdGVycy5vdXRwdXQsIHNlYXJjaFNlbGVjdGVkQ2VsbHM6IHRoaXMuc3RhdGUuZmlsdGVycy5zZWxlY3RlZENlbGxzLCB0b2dnbGVPdXRwdXQ6IHRoaXMuX3RvZ2dsZVNlYXJjaE91dHB1dCwgdG9nZ2xlU2VsZWN0ZWRDZWxsczogdGhpcy5fdG9nZ2xlU2VhcmNoU2VsZWN0ZWRDZWxscywgdHJhbnM6IHRoaXMudHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJykgfSkpIDogbnVsbDtcbiAgICAgICAgY29uc3QgaWNvbiA9IHRoaXMuc3RhdGUucmVwbGFjZUVudHJ5U2hvd24gPyBjYXJldERvd25JY29uIDogY2FyZXRSaWdodEljb247XG4gICAgICAgIC8vIFRPRE86IEVycm9yIG1lc3NhZ2VzIGZyb20gcmVnZXggYXJlIG5vdCBjdXJyZW50bHkgbG9jYWxpemFibGUuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBPVkVSTEFZX1JPV19DTEFTUywga2V5OiAwIH0sXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5pc1JlYWRPbmx5ID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFRPR0dMRV9QTEFDRUhPTERFUiB9KSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogVE9HR0xFX1dSQVBQRVIsIG9uQ2xpY2s6ICgpID0+IHRoaXMuX29uUmVwbGFjZVRvZ2dsZWQoKSwgdGFiSW5kZXg6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChpY29uLnJlYWN0LCB7IGNsYXNzTmFtZTogYCR7UkVQTEFDRV9UT0dHTEVfQ0xBU1N9ICR7QlVUVE9OX0NPTlRFTlRfQ0xBU1N9YCwgdGFnOiBcInNwYW5cIiwgZWxlbWVudFBvc2l0aW9uOiBcImNlbnRlclwiLCBoZWlnaHQ6IFwiMjBweFwiLCB3aWR0aDogXCIyMHB4XCIgfSkpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlYXJjaEVudHJ5LCB7IHVzZVJlZ2V4OiB0aGlzLnByb3BzLm92ZXJsYXlTdGF0ZS51c2VSZWdleCwgY2FzZVNlbnNpdGl2ZTogdGhpcy5wcm9wcy5vdmVybGF5U3RhdGUuY2FzZVNlbnNpdGl2ZSwgb25DYXNlU2Vuc2l0aXZlVG9nZ2xlZDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNhc2VTZW5zaXRpdmVUb2dnbGVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9leGVjdXRlU2VhcmNoKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9LCBvblJlZ2V4VG9nZ2xlZDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vblJlZ2V4VG9nZ2xlZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXhlY3V0ZVNlYXJjaCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgb25LZXlkb3duOiAoZSkgPT4gdGhpcy5fb25TZWFyY2hLZXlkb3duKGUpLCBvbkNoYW5nZTogKGUpID0+IHRoaXMuX29uU2VhcmNoQ2hhbmdlKGUpLCBvbklucHV0Rm9jdXM6IHRoaXMuX29uU2VhcmNoSW5wdXRGb2N1cy5iaW5kKHRoaXMpLCBvbklucHV0Qmx1cjogdGhpcy5fb25TZWFyY2hJbnB1dEJsdXIuYmluZCh0aGlzKSwgaW5wdXRGb2N1c2VkOiB0aGlzLnN0YXRlLnNlYXJjaElucHV0Rm9jdXNlZCwgc2VhcmNoVGV4dDogdGhpcy5zdGF0ZS5zZWFyY2hUZXh0LCBmb3JjZUZvY3VzOiB0aGlzLnByb3BzLm92ZXJsYXlTdGF0ZS5mb3JjZUZvY3VzLCB0cmFuc2xhdG9yOiB0aGlzLnRyYW5zbGF0b3IgfSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWFyY2hJbmRpY2VzLCB7IGN1cnJlbnRJbmRleDogdGhpcy5wcm9wcy5vdmVybGF5U3RhdGUuY3VycmVudEluZGV4LCB0b3RhbE1hdGNoZXM6IHRoaXMucHJvcHMub3ZlcmxheVN0YXRlLnRvdGFsTWF0Y2hlcyB9KSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFVwRG93bkJ1dHRvbnMsIHsgb25IaWdobGlnaHRQcmV2aW91czogKCkgPT4gdGhpcy5fZXhlY3V0ZVNlYXJjaChmYWxzZSksIG9uSGlnaGxpZ2h0TmV4dDogKCkgPT4gdGhpcy5fZXhlY3V0ZVNlYXJjaCh0cnVlKSB9KSxcbiAgICAgICAgICAgICAgICBzaG93UmVwbGFjZSA/IG51bGwgOiBmaWx0ZXJUb2dnbGUsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogQlVUVE9OX1dSQVBQRVJfQ0xBU1MsIG9uQ2xpY2s6ICgpID0+IHRoaXMuX29uQ2xvc2UoKSwgdGFiSW5kZXg6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChjbG9zZUljb24ucmVhY3QsIHsgY2xhc3NOYW1lOiBcImpwLWljb24taG92ZXJcIiwgZWxlbWVudFBvc2l0aW9uOiBcImNlbnRlclwiLCBoZWlnaHQ6IFwiMTZweFwiLCB3aWR0aDogXCIxNnB4XCIgfSkpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IE9WRVJMQVlfUk9XX0NMQVNTLCBrZXk6IDEgfSwgc2hvd1JlcGxhY2UgPyAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJlcGxhY2VFbnRyeSwgeyBvblJlcGxhY2VLZXlkb3duOiAoZSkgPT4gdGhpcy5fb25SZXBsYWNlS2V5ZG93bihlKSwgb25DaGFuZ2U6IChlKSA9PiB0aGlzLl9vblJlcGxhY2VDaGFuZ2UoZSksIG9uUmVwbGFjZUN1cnJlbnQ6ICgpID0+IHRoaXMucHJvcHMub25SZXBsYWNlQ3VycmVudCh0aGlzLnN0YXRlLnJlcGxhY2VUZXh0KSwgb25SZXBsYWNlQWxsOiAoKSA9PiB0aGlzLnByb3BzLm9uUmVwbGFjZUFsbCh0aGlzLnN0YXRlLnJlcGxhY2VUZXh0KSwgcmVwbGFjZVRleHQ6IHRoaXMuc3RhdGUucmVwbGFjZVRleHQsIHJlZjogdGhpcy5yZXBsYWNlRW50cnlSZWYsIHRyYW5zbGF0b3I6IHRoaXMudHJhbnNsYXRvciB9KSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBTUEFDRVJfQ0xBU1MgfSksXG4gICAgICAgICAgICAgICAgZmlsdGVyVG9nZ2xlKSkgOiBudWxsKSxcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZmlsdGVyc09wZW4gPyBmaWx0ZXIgOiBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogUkVHRVhfRVJST1JfQ0xBU1MsIGhpZGRlbjogISF0aGlzLnN0YXRlLmVycm9yTWVzc2FnZSAmJiB0aGlzLnN0YXRlLmVycm9yTWVzc2FnZS5sZW5ndGggPT09IDAsIGtleTogMyB9LCB0aGlzLnN0YXRlLmVycm9yTWVzc2FnZSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBTRUFSQ0hfRE9DVU1FTlRfTE9BRElORywga2V5OiA0IH0sIFwiVGhpcyBkb2N1bWVudCBpcyBzdGlsbCBsb2FkaW5nLiBPbmx5IGxvYWRlZCBjb250ZW50IHdpbGwgYXBwZWFyIGluIHNlYXJjaCByZXN1bHRzIHVudGlsIHRoZSBlbnRpcmUgZG9jdW1lbnQgbG9hZHMuXCIpXG4gICAgICAgIF07XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlYXJjaE92ZXJsYXkob3B0aW9ucykge1xuICAgIGNvbnN0IHsgd2lkZ2V0Q2hhbmdlZCwgb3ZlcmxheVN0YXRlLCBvbkNhc2VTZW5zaXRpdmVUb2dnbGVkLCBvblJlZ2V4VG9nZ2xlZCwgb25IaWdobGlnaHROZXh0LCBvbkhpZ2hsaWdodFByZXZpb3VzLCBvblN0YXJ0UXVlcnksIG9uUmVwbGFjZUN1cnJlbnQsIG9uUmVwbGFjZUFsbCwgb25FbmRTZWFyY2gsIGlzUmVhZE9ubHksIGhhc091dHB1dHMsIHNlYXJjaERlYm91bmNlVGltZSwgdHJhbnNsYXRvciB9ID0gb3B0aW9ucztcbiAgICBjb25zdCB3aWRnZXQgPSBSZWFjdFdpZGdldC5jcmVhdGUoUmVhY3QuY3JlYXRlRWxlbWVudChVc2VTaWduYWwsIHsgc2lnbmFsOiB3aWRnZXRDaGFuZ2VkLCBpbml0aWFsQXJnczogb3ZlcmxheVN0YXRlIH0sIChfLCBhcmdzKSA9PiB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChTZWFyY2hPdmVybGF5LCB7IG9uQ2FzZVNlbnNpdGl2ZVRvZ2dsZWQ6IG9uQ2FzZVNlbnNpdGl2ZVRvZ2dsZWQsIG9uUmVnZXhUb2dnbGVkOiBvblJlZ2V4VG9nZ2xlZCwgb25IaWdobGlnaHROZXh0OiBvbkhpZ2hsaWdodE5leHQsIG9uSGlnaGxpZ2h0UHJldmlvdXM6IG9uSGlnaGxpZ2h0UHJldmlvdXMsIG9uU3RhcnRRdWVyeTogb25TdGFydFF1ZXJ5LCBvbkVuZFNlYXJjaDogb25FbmRTZWFyY2gsIG9uUmVwbGFjZUN1cnJlbnQ6IG9uUmVwbGFjZUN1cnJlbnQsIG9uUmVwbGFjZUFsbDogb25SZXBsYWNlQWxsLCBvdmVybGF5U3RhdGU6IGFyZ3MsIGlzUmVhZE9ubHk6IGlzUmVhZE9ubHksIGhhc091dHB1dHM6IGhhc091dHB1dHMsIHNlYXJjaERlYm91bmNlVGltZTogc2VhcmNoRGVib3VuY2VUaW1lLCB0cmFuc2xhdG9yOiB0cmFuc2xhdG9yIH0pKTtcbiAgICB9KSk7XG4gICAgd2lkZ2V0LmFkZENsYXNzKE9WRVJMQVlfQ0xBU1MpO1xuICAgIHJldHVybiB3aWRnZXQ7XG59XG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIGZ1bmN0aW9uIHBhcnNlUXVlcnkocXVlcnlTdHJpbmcsIGNhc2VTZW5zaXRpdmUsIHJlZ2V4KSB7XG4gICAgICAgIGNvbnN0IGZsYWcgPSBjYXNlU2Vuc2l0aXZlID8gJ2cnIDogJ2dpJztcbiAgICAgICAgLy8gZXNjYXBlIHJlZ2V4IGNoYXJhY3RlcnMgaW4gcXVlcnkgaWYgaXRzIGEgc3RyaW5nIHNlYXJjaFxuICAgICAgICBjb25zdCBxdWVyeVRleHQgPSByZWdleFxuICAgICAgICAgICAgPyBxdWVyeVN0cmluZ1xuICAgICAgICAgICAgOiBxdWVyeVN0cmluZy5yZXBsYWNlKC9bLVtcXF0ve30oKSorPy5cXFxcXiR8XS9nLCAnXFxcXCQmJyk7XG4gICAgICAgIGxldCByZXQ7XG4gICAgICAgIHJldCA9IG5ldyBSZWdFeHAocXVlcnlUZXh0LCBmbGFnKTtcbiAgICAgICAgaWYgKHJldC50ZXN0KCcnKSkge1xuICAgICAgICAgICAgcmV0ID0gL3heLztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgICBQcml2YXRlLnBhcnNlUXVlcnkgPSBwYXJzZVF1ZXJ5O1xuICAgIGZ1bmN0aW9uIHJlZ2V4RXF1YWwoYSwgYikge1xuICAgICAgICBpZiAoIWEgfHwgIWIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGEuc291cmNlID09PSBiLnNvdXJjZSAmJlxuICAgICAgICAgICAgYS5nbG9iYWwgPT09IGIuZ2xvYmFsICYmXG4gICAgICAgICAgICBhLmlnbm9yZUNhc2UgPT09IGIuaWdub3JlQ2FzZSAmJlxuICAgICAgICAgICAgYS5tdWx0aWxpbmUgPT09IGIubXVsdGlsaW5lKTtcbiAgICB9XG4gICAgUHJpdmF0ZS5yZWdleEVxdWFsID0gcmVnZXhFcXVhbDtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VhcmNob3ZlcmxheS5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBEaXNwb3NhYmxlRGVsZWdhdGUgfSBmcm9tICdAbHVtaW5vL2Rpc3Bvc2FibGUnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuZXhwb3J0IGNsYXNzIFNlYXJjaFByb3ZpZGVyUmVnaXN0cnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9jaGFuZ2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fcHJvdmlkZXJNYXAgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIHByb3ZpZGVyIHRvIHRoZSByZWdpc3RyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXkgLSBUaGUgcHJvdmlkZXIga2V5LlxuICAgICAqIEByZXR1cm5zIEEgZGlzcG9zYWJsZSBkZWxlZ2F0ZSB0aGF0LCB3aGVuIGRpc3Bvc2VkLCBkZXJlZ2lzdGVycyB0aGUgZ2l2ZW4gc2VhcmNoIHByb3ZpZGVyXG4gICAgICovXG4gICAgcmVnaXN0ZXIoa2V5LCBwcm92aWRlcikge1xuICAgICAgICB0aGlzLl9wcm92aWRlck1hcC5zZXQoa2V5LCBwcm92aWRlcik7XG4gICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCgpO1xuICAgICAgICByZXR1cm4gbmV3IERpc3Bvc2FibGVEZWxlZ2F0ZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9wcm92aWRlck1hcC5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG1hdGNoaW5nIHByb3ZpZGVyIGZvciB0aGUgd2lkZ2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHdpZGdldCAtIFRoZSB3aWRnZXQgdG8gc2VhcmNoIG92ZXIuXG4gICAgICogQHJldHVybnMgdGhlIHNlYXJjaCBwcm92aWRlciwgb3IgdW5kZWZpbmVkIGlmIG5vbmUgZXhpc3RzLlxuICAgICAqL1xuICAgIGdldFByb3ZpZGVyRm9yV2lkZ2V0KHdpZGdldCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmluZE1hdGNoaW5nUHJvdmlkZXIodGhpcy5fcHJvdmlkZXJNYXAsIHdpZGdldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNpZ25hbCB0aGF0IGVtaXRzIHdoZW4gYSBuZXcgc2VhcmNoIHByb3ZpZGVyIGhhcyBiZWVuIHJlZ2lzdGVyZWRcbiAgICAgKiBvciByZW1vdmVkLlxuICAgICAqL1xuICAgIGdldCBjaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlZDtcbiAgICB9XG4gICAgX2ZpbmRNYXRjaGluZ1Byb3ZpZGVyKHByb3ZpZGVyTWFwLCB3aWRnZXQpIHtcbiAgICAgICAgLy8gaXRlcmF0ZSB0aHJvdWdoIGFsbCBwcm92aWRlcnMgYW5kIGFzayBlYWNoIG9uZSBpZiBpdCBjYW4gc2VhcmNoIG9uIHRoZVxuICAgICAgICAvLyB3aWRnZXQuXG4gICAgICAgIGZvciAoY29uc3QgUCBvZiBwcm92aWRlck1hcC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKFAuY2FuU2VhcmNoT24od2lkZ2V0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VhcmNocHJvdmlkZXJyZWdpc3RyeS5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbi8qIHRzbGludDpkaXNhYmxlICovXG4vKipcbiAqIFRoZSBzZWFyY2ggcHJvdmlkZXIgcmVnaXN0cnkgdG9rZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBJU2VhcmNoUHJvdmlkZXJSZWdpc3RyeSA9IG5ldyBUb2tlbignQGp1cHl0ZXJsYWIvZG9jdW1lbnRzZWFyY2g6SVNlYXJjaFByb3ZpZGVyUmVnaXN0cnknKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRva2Vucy5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9