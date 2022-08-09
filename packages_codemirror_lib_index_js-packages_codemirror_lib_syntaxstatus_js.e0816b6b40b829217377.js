(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_codemirror_lib_index_js-packages_codemirror_lib_syntaxstatus_js"],{

/***/ "../../packages/codemirror/lib/codemirror-ipython.js":
/*!***********************************************************!*\
  !*** ../../packages/codemirror/lib/codemirror-ipython.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! codemirror */ "webpack/sharing/consume/default/codemirror/codemirror");
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(codemirror__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var codemirror_mode_meta__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! codemirror/mode/meta */ "../../node_modules/codemirror/mode/meta.js");
/* harmony import */ var codemirror_mode_meta__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_meta__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var codemirror_mode_python_python__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! codemirror/mode/python/python */ "../../node_modules/codemirror/mode/python/python.js");
/* harmony import */ var codemirror_mode_python_python__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_python_python__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * Define an IPython codemirror mode.
 *
 * It is a slightly altered Python Mode with a `?` operator.
 */
codemirror__WEBPACK_IMPORTED_MODULE_0___default().defineMode('ipython', (config, modeOptions) => {
    const pythonConf = {};
    for (const prop in modeOptions) {
        if (modeOptions.hasOwnProperty(prop)) {
            pythonConf[prop] = modeOptions[prop];
        }
    }
    pythonConf.name = 'python';
    pythonConf.singleOperators = new RegExp('^[\\+\\-\\*/%&|@\\^~<>!\\?]');
    pythonConf.identifiers = new RegExp('^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*');
    return codemirror__WEBPACK_IMPORTED_MODULE_0___default().getMode(config, pythonConf);
}, 'python');
codemirror__WEBPACK_IMPORTED_MODULE_0___default().defineMIME('text/x-ipython', 'ipython');
codemirror__WEBPACK_IMPORTED_MODULE_0___default().modeInfo.push({
    ext: [],
    mime: 'text/x-ipython',
    mode: 'ipython',
    name: 'ipython'
});
//# sourceMappingURL=codemirror-ipython.js.map

/***/ }),

/***/ "../../packages/codemirror/lib/codemirror-ipythongfm.js":
/*!**************************************************************!*\
  !*** ../../packages/codemirror/lib/codemirror-ipythongfm.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! codemirror */ "webpack/sharing/consume/default/codemirror/codemirror");
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(codemirror__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var codemirror_addon_mode_multiplex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! codemirror/addon/mode/multiplex */ "../../node_modules/codemirror/addon/mode/multiplex.js");
/* harmony import */ var codemirror_addon_mode_multiplex__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_mode_multiplex__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var codemirror_mode_gfm_gfm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! codemirror/mode/gfm/gfm */ "../../node_modules/codemirror/mode/gfm/gfm.js");
/* harmony import */ var codemirror_mode_gfm_gfm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_gfm_gfm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var codemirror_mode_stex_stex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! codemirror/mode/stex/stex */ "../../node_modules/codemirror/mode/stex/stex.js");
/* harmony import */ var codemirror_mode_stex_stex__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_stex_stex__WEBPACK_IMPORTED_MODULE_3__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.




/**
 * Define an IPython GFM (GitHub Flavored Markdown) mode.
 *
 * Is just a slightly altered GFM Mode with support for LaTeX.
 * LaTeX support was supported by Codemirror GFM as of
 *   https://github.com/codemirror/CodeMirror/pull/567
 *  But was later removed in
 *   https://github.com/codemirror/CodeMirror/commit/d9c9f1b1ffe984aee41307f3e927f80d1f23590c
 */
codemirror__WEBPACK_IMPORTED_MODULE_0___default().defineMode('ipythongfm', (config, modeOptions) => {
    const gfmMode = codemirror__WEBPACK_IMPORTED_MODULE_0___default().getMode(config, {
        name: 'gfm',
        // Override list3 with an under-used token, rather than `keyword`
        tokenTypeOverrides: { list3: 'string-2' }
    });
    const texMode = codemirror__WEBPACK_IMPORTED_MODULE_0___default().getMode(config, {
        name: 'stex',
        inMathMode: true
    });
    return codemirror__WEBPACK_IMPORTED_MODULE_0___default().multiplexingMode(gfmMode, 
    // force parsing inline code and code blocks with gfmMode to prevent
    // parsing them as tex see:
    // https://github.com/jupyterlab/jupyterlab/issues/6774
    {
        open: '<code>',
        close: '</code>',
        mode: gfmMode,
        parseDelimiters: true
    }, {
        open: '<pre>',
        close: '</pre>',
        mode: gfmMode,
        parseDelimiters: true
    }, {
        open: '```',
        close: '```',
        mode: gfmMode,
        parseDelimiters: true
    }, {
        open: '`',
        close: '`',
        mode: gfmMode,
        parseDelimiters: true
    }, 
    // only if we did not match a code element or block,
    // then try do parse using the tex mode
    {
        open: '$$',
        close: '$$',
        mode: texMode,
        delimStyle: 'delimit'
    }, {
        // `$math mode$` is only matched if both opening
        // and closing $ are in the same line
        open: /\$(?=.*\$)/,
        close: '$',
        mode: texMode,
        delimStyle: 'delimit'
    }, {
        open: '\\(',
        close: '\\)',
        mode: texMode,
        delimStyle: 'delimit'
    }, {
        open: '\\[',
        close: '\\]',
        mode: texMode,
        delimStyle: 'delimit'
    }
    // .. more multiplexed styles can follow here
    );
}, 'gfm');
codemirror__WEBPACK_IMPORTED_MODULE_0___default().defineMIME('text/x-ipythongfm', 'ipythongfm');
codemirror__WEBPACK_IMPORTED_MODULE_0___default().modeInfo.push({
    ext: [],
    mime: 'text/x-ipythongfm',
    mode: 'ipythongfm',
    name: 'ipythongfm'
});
//# sourceMappingURL=codemirror-ipythongfm.js.map

/***/ }),

/***/ "../../packages/codemirror/lib/editor.js":
/*!***********************************************!*\
  !*** ../../packages/codemirror/lib/editor.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CodeMirrorEditor": () => (/* binding */ CodeMirrorEditor)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable?7038");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling/@lumino/polling");
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_polling__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! codemirror */ "webpack/sharing/consume/default/codemirror/codemirror");
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(codemirror__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var codemirror_addon_comment_comment_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! codemirror/addon/comment/comment.js */ "../../node_modules/codemirror/addon/comment/comment.js");
/* harmony import */ var codemirror_addon_comment_comment_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_comment_comment_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var codemirror_addon_display_rulers_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! codemirror/addon/display/rulers.js */ "../../node_modules/codemirror/addon/display/rulers.js");
/* harmony import */ var codemirror_addon_display_rulers_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_display_rulers_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var codemirror_addon_edit_closebrackets_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! codemirror/addon/edit/closebrackets.js */ "../../node_modules/codemirror/addon/edit/closebrackets.js");
/* harmony import */ var codemirror_addon_edit_closebrackets_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_edit_closebrackets_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var codemirror_addon_edit_matchbrackets_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! codemirror/addon/edit/matchbrackets.js */ "../../node_modules/codemirror/addon/edit/matchbrackets.js");
/* harmony import */ var codemirror_addon_edit_matchbrackets_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_edit_matchbrackets_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var codemirror_addon_fold_brace_fold_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! codemirror/addon/fold/brace-fold.js */ "../../node_modules/codemirror/addon/fold/brace-fold.js");
/* harmony import */ var codemirror_addon_fold_brace_fold_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_fold_brace_fold_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var codemirror_addon_fold_comment_fold_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! codemirror/addon/fold/comment-fold.js */ "../../node_modules/codemirror/addon/fold/comment-fold.js");
/* harmony import */ var codemirror_addon_fold_comment_fold_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_fold_comment_fold_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var codemirror_addon_fold_foldcode_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! codemirror/addon/fold/foldcode.js */ "../../node_modules/codemirror/addon/fold/foldcode.js");
/* harmony import */ var codemirror_addon_fold_foldcode_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_fold_foldcode_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var codemirror_addon_fold_foldgutter_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! codemirror/addon/fold/foldgutter.js */ "../../node_modules/codemirror/addon/fold/foldgutter.js");
/* harmony import */ var codemirror_addon_fold_foldgutter_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_fold_foldgutter_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var codemirror_addon_fold_indent_fold_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! codemirror/addon/fold/indent-fold.js */ "../../node_modules/codemirror/addon/fold/indent-fold.js");
/* harmony import */ var codemirror_addon_fold_indent_fold_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_fold_indent_fold_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var codemirror_addon_fold_markdown_fold_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! codemirror/addon/fold/markdown-fold.js */ "../../node_modules/codemirror/addon/fold/markdown-fold.js");
/* harmony import */ var codemirror_addon_fold_markdown_fold_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_fold_markdown_fold_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var codemirror_addon_fold_xml_fold_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! codemirror/addon/fold/xml-fold.js */ "../../node_modules/codemirror/addon/fold/xml-fold.js");
/* harmony import */ var codemirror_addon_fold_xml_fold_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_fold_xml_fold_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var codemirror_addon_mode_simple__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! codemirror/addon/mode/simple */ "../../node_modules/codemirror/addon/mode/simple.js");
/* harmony import */ var codemirror_addon_mode_simple__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_mode_simple__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var codemirror_addon_scroll_scrollpastend_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! codemirror/addon/scroll/scrollpastend.js */ "../../node_modules/codemirror/addon/scroll/scrollpastend.js");
/* harmony import */ var codemirror_addon_scroll_scrollpastend_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_scroll_scrollpastend_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var codemirror_addon_search_jump_to_line__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! codemirror/addon/search/jump-to-line */ "../../node_modules/codemirror/addon/search/jump-to-line.js");
/* harmony import */ var codemirror_addon_search_jump_to_line__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_search_jump_to_line__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var codemirror_addon_search_search__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! codemirror/addon/search/search */ "../../node_modules/codemirror/addon/search/search.js");
/* harmony import */ var codemirror_addon_search_search__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_search_search__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var codemirror_addon_search_searchcursor__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! codemirror/addon/search/searchcursor */ "../../node_modules/codemirror/addon/search/searchcursor.js");
/* harmony import */ var codemirror_addon_search_searchcursor__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_search_searchcursor__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var codemirror_addon_selection_active_line__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! codemirror/addon/selection/active-line */ "../../node_modules/codemirror/addon/selection/active-line.js");
/* harmony import */ var codemirror_addon_selection_active_line__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_selection_active_line__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var codemirror_addon_selection_mark_selection__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! codemirror/addon/selection/mark-selection */ "../../node_modules/codemirror/addon/selection/mark-selection.js");
/* harmony import */ var codemirror_addon_selection_mark_selection__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_selection_mark_selection__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var codemirror_addon_selection_selection_pointer__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! codemirror/addon/selection/selection-pointer */ "../../node_modules/codemirror/addon/selection/selection-pointer.js");
/* harmony import */ var codemirror_addon_selection_selection_pointer__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_selection_selection_pointer__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var codemirror_addon_edit_trailingspace_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! codemirror/addon/edit/trailingspace.js */ "../../node_modules/codemirror/addon/edit/trailingspace.js");
/* harmony import */ var codemirror_addon_edit_trailingspace_js__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_edit_trailingspace_js__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var codemirror_keymap_emacs_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! codemirror/keymap/emacs.js */ "../../node_modules/codemirror/keymap/emacs.js");
/* harmony import */ var codemirror_keymap_emacs_js__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(codemirror_keymap_emacs_js__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var codemirror_keymap_sublime_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! codemirror/keymap/sublime.js */ "../../node_modules/codemirror/keymap/sublime.js");
/* harmony import */ var codemirror_keymap_sublime_js__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(codemirror_keymap_sublime_js__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var y_codemirror__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! y-codemirror */ "../../node_modules/y-codemirror/src/y-codemirror.js");
/* harmony import */ var _mode__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./mode */ "../../packages/codemirror/lib/mode.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
// / <reference types="codemirror"/>
// / <reference types="codemirror/searchcursor"/>
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

































// import 'codemirror/keymap/vim.js';  lazy loading of vim mode is available in ../codemirror-extension/index.ts
/**
 * The class name added to CodeMirrorWidget instances.
 */
const EDITOR_CLASS = 'jp-CodeMirrorEditor';
/**
 * The class name added to read only cell editor widgets.
 */
const READ_ONLY_CLASS = 'jp-mod-readOnly';
/**
 * The class name for the hover box for collaborator cursors.
 */
const COLLABORATOR_CURSOR_CLASS = 'jp-CollaboratorCursor';
/**
 * The class name for the hover box for collaborator cursors.
 */
const COLLABORATOR_HOVER_CLASS = 'jp-CollaboratorCursor-hover';
/**
 * The key code for the up arrow key.
 */
const UP_ARROW = 38;
/**
 * The key code for the down arrow key.
 */
const DOWN_ARROW = 40;
/**
 * The time that a collaborator name hover persists.
 */
const HOVER_TIMEOUT = 1000;
// @todo Remove the duality of having a modeldb and a y-codemirror
// binding as it just introduces a lot of additional complexity without gaining anything.
const USE_YCODEMIRROR_BINDING = true;
/**
 * CodeMirror editor.
 */
class CodeMirrorEditor {
    /**
     * Construct a CodeMirror editor.
     */
    constructor(options) {
        var _a;
        /**
         * A signal emitted when either the top or bottom edge is requested.
         */
        this.edgeRequested = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal(this);
        this.selectionMarkers = {};
        this._keydownHandlers = new Array();
        this._changeGuard = false;
        this._uuid = '';
        this._needsRefresh = false;
        this._isDisposed = false;
        this._lastChange = null;
        const host = (this.host = options.host);
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        host.classList.add(EDITOR_CLASS);
        host.classList.add('jp-Editor');
        host.addEventListener('focus', this, true);
        host.addEventListener('blur', this, true);
        host.addEventListener('scroll', this, true);
        this._uuid = options.uuid || _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__.UUID.uuid4();
        // Handle selection style.
        const style = options.selectionStyle || {};
        this._selectionStyle = Object.assign(Object.assign({}, _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditor.defaultSelectionStyle), style);
        const model = (this._model = options.model);
        const config = options.config || {};
        const fullConfig = (this._config = Object.assign(Object.assign({}, CodeMirrorEditor.defaultConfig), config));
        const editor = (this._editor = Private.createEditor(host, fullConfig));
        this._initializeEditorBinding();
        // every time the model is switched, we need to re-initialize the editor binding
        this.model.sharedModelSwitched.connect(this._initializeEditorBinding, this);
        const doc = editor.getDoc();
        // Handle initial values for text, mimetype, and selections.
        if (!USE_YCODEMIRROR_BINDING) {
            doc.setValue(model.value.text);
        }
        this._onMimeTypeChanged();
        this._onCursorActivity();
        this._poll = new _lumino_polling__WEBPACK_IMPORTED_MODULE_6__.Poll({
            factory: async () => {
                this._checkSync();
            },
            frequency: { interval: 3000, backoff: false },
            standby: () => {
                // If changed, only stand by when hidden, otherwise always stand by.
                return this._lastChange ? 'when-hidden' : true;
            }
        });
        // Connect to changes.
        if (!USE_YCODEMIRROR_BINDING) {
            model.value.changed.connect(this._onValueChanged, this);
        }
        model.mimeTypeChanged.connect(this._onMimeTypeChanged, this);
        model.selections.changed.connect(this._onSelectionsChanged, this);
        codemirror__WEBPACK_IMPORTED_MODULE_8___default().on(editor, 'keydown', (editor, event) => {
            const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.findFirstIndex(this._keydownHandlers, handler => {
                if (handler(this, event) === true) {
                    event.preventDefault();
                    return true;
                }
                return false;
            });
            if (index === -1) {
                this.onKeydown(event);
            }
        });
        if (USE_YCODEMIRROR_BINDING) {
            (_a = this._yeditorBinding) === null || _a === void 0 ? void 0 : _a.on('cursorActivity', () => this._onCursorActivity());
        }
        else {
            codemirror__WEBPACK_IMPORTED_MODULE_8___default().on(editor, 'cursorActivity', () => this._onCursorActivity());
            codemirror__WEBPACK_IMPORTED_MODULE_8___default().on(editor.getDoc(), 'beforeChange', (instance, change) => {
                this._beforeDocChanged(instance, change);
            });
        }
        codemirror__WEBPACK_IMPORTED_MODULE_8___default().on(editor.getDoc(), 'change', (instance, change) => {
            // Manually refresh after setValue to make sure editor is properly sized.
            if (change.origin === 'setValue' && this.hasFocus()) {
                this.refresh();
            }
            this._lastChange = change;
        });
        // Turn off paste handling in codemirror since sometimes we want to
        // replace it with our own.
        editor.on('paste', (instance, event) => {
            var _a;
            const handlePaste = (_a = this._config['handlePaste']) !== null && _a !== void 0 ? _a : true;
            if (!handlePaste) {
                event.codemirrorIgnore = true;
            }
        });
        // Manually refresh on paste to make sure editor is properly sized.
        editor.getWrapperElement().addEventListener('paste', () => {
            if (this.hasFocus()) {
                this.refresh();
            }
        });
    }
    /**
     * Initialize the editor binding.
     */
    _initializeEditorBinding() {
        var _a;
        if (!USE_YCODEMIRROR_BINDING) {
            return;
        }
        (_a = this._yeditorBinding) === null || _a === void 0 ? void 0 : _a.destroy();
        const sharedModel = this.model.sharedModel;
        const opts = sharedModel.undoManager
            ? { yUndoManager: sharedModel.undoManager }
            : {};
        const awareness = sharedModel.awareness;
        this._yeditorBinding = new y_codemirror__WEBPACK_IMPORTED_MODULE_32__.CodemirrorBinding(sharedModel.ysource, this.editor, awareness, opts);
    }
    /**
     * The uuid of this editor;
     */
    get uuid() {
        return this._uuid;
    }
    set uuid(value) {
        this._uuid = value;
    }
    /**
     * The selection style of this editor.
     */
    get selectionStyle() {
        return this._selectionStyle;
    }
    set selectionStyle(value) {
        this._selectionStyle = value;
    }
    /**
     * Get the codemirror editor wrapped by the editor.
     */
    get editor() {
        return this._editor;
    }
    /**
     * Get the codemirror doc wrapped by the widget.
     */
    get doc() {
        return this._editor.getDoc();
    }
    /**
     * Get the number of lines in the editor.
     */
    get lineCount() {
        return this.doc.lineCount();
    }
    /**
     * Returns a model for this editor.
     */
    get model() {
        return this._model;
    }
    /**
     * The height of a line in the editor in pixels.
     */
    get lineHeight() {
        return this._editor.defaultTextHeight();
    }
    /**
     * The widget of a character in the editor in pixels.
     */
    get charWidth() {
        return this._editor.defaultCharWidth();
    }
    /**
     * Tests whether the editor is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the widget.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        this.host.removeEventListener('focus', this, true);
        this.host.removeEventListener('blur', this, true);
        this.host.removeEventListener('scroll', this, true);
        if (this._yeditorBinding) {
            this._yeditorBinding.destroy();
        }
        this._keydownHandlers.length = 0;
        this._poll.dispose();
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal.clearData(this);
    }
    /**
     * Get a config option for the editor.
     */
    getOption(option) {
        return this._config[option];
    }
    /**
     * Set a config option for the editor.
     */
    setOption(option, value) {
        // Don't bother setting the option if it is already the same.
        if (this._config[option] !== value) {
            this._config[option] = value;
            Private.setOption(this.editor, option, value, this._config);
        }
    }
    /**
     * Set config options for the editor.
     *
     * This method is preferred when setting several options. The
     * options are set within an operation, which only performs
     * the costly update at the end, and not after every option
     * is set.
     */
    setOptions(options) {
        const editor = this._editor;
        editor.startOperation();
        for (const key in options) {
            const k = key;
            editor.operation(() => {
                this.setOption(k, options[k]);
            });
        }
        editor.endOperation();
    }
    /**
     * Returns the content for the given line number.
     */
    getLine(line) {
        return this.doc.getLine(line);
    }
    /**
     * Find an offset for the given position.
     */
    getOffsetAt(position) {
        return this.doc.indexFromPos({
            ch: position.column,
            line: position.line
        });
    }
    /**
     * Find a position for the given offset.
     */
    getPositionAt(offset) {
        const { ch, line } = this.doc.posFromIndex(offset);
        return { line, column: ch };
    }
    /**
     * Undo one edit (if any undo events are stored).
     */
    undo() {
        this.model.sharedModel.undo();
    }
    /**
     * Redo one undone edit.
     */
    redo() {
        this.model.sharedModel.redo();
    }
    /**
     * Clear the undo history.
     */
    clearHistory() {
        var _a, _b;
        (_b = (_a = this._yeditorBinding) === null || _a === void 0 ? void 0 : _a.yUndoManager) === null || _b === void 0 ? void 0 : _b.clear();
    }
    /**
     * Brings browser focus to this editor text.
     */
    focus() {
        this._editor.focus();
    }
    /**
     * Test whether the editor has keyboard focus.
     */
    hasFocus() {
        return this._editor.getWrapperElement().contains(document.activeElement);
    }
    /**
     * Explicitly blur the editor.
     */
    blur() {
        this._editor.getInputField().blur();
    }
    /**
     * Repaint editor.
     */
    refresh() {
        this._editor.refresh();
        this._needsRefresh = false;
    }
    /**
     * Refresh the editor if it is focused;
     * otherwise postpone refreshing till focusing.
     */
    resizeToFit() {
        if (this.hasFocus()) {
            this.refresh();
        }
        else {
            this._needsRefresh = true;
        }
        this._clearHover();
    }
    // todo: docs, maybe define overlay options as a type?
    addOverlay(mode, options) {
        this._editor.addOverlay(mode, options);
    }
    removeOverlay(mode) {
        this._editor.removeOverlay(mode);
    }
    getSearchCursor(query, start, caseFold) {
        return this._editor.getDoc().getSearchCursor(query, start, caseFold);
    }
    getCursor(start) {
        return this._editor.getDoc().getCursor(start);
    }
    get state() {
        return this._editor.state;
    }
    operation(fn) {
        return this._editor.operation(fn);
    }
    firstLine() {
        return this._editor.getDoc().firstLine();
    }
    lastLine() {
        return this._editor.getDoc().lastLine();
    }
    scrollIntoView(pos, margin) {
        this._editor.scrollIntoView(pos, margin);
    }
    scrollIntoViewCentered(pos) {
        var _a, _b;
        const top = this._editor.charCoords(pos, 'local').top;
        const height = this._editor.getWrapperElement().offsetHeight;
        (_b = (_a = this.host).scrollIntoView) === null || _b === void 0 ? void 0 : _b.call(_a, {
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
        this._editor.scrollTo(null, top - height / 2);
    }
    cursorCoords(where, mode) {
        return this._editor.cursorCoords(where, mode);
    }
    getRange(from, to, separator) {
        return this._editor.getDoc().getRange(from, to, separator);
    }
    /**
     * Add a keydown handler to the editor.
     *
     * @param handler - A keydown handler.
     *
     * @returns A disposable that can be used to remove the handler.
     */
    addKeydownHandler(handler) {
        this._keydownHandlers.push(handler);
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_5__.DisposableDelegate(() => {
            _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.removeAllWhere(this._keydownHandlers, val => val === handler);
        });
    }
    /**
     * Set the size of the editor in pixels.
     */
    setSize(dimension) {
        if (dimension) {
            this._editor.setSize(dimension.width, dimension.height);
        }
        else {
            this._editor.setSize(null, null);
        }
        this._needsRefresh = false;
    }
    /**
     * Reveal the given position in the editor.
     */
    revealPosition(position) {
        const cmPosition = this._toCodeMirrorPosition(position);
        this._editor.scrollIntoView(cmPosition);
    }
    /**
     * Reveal the given selection in the editor.
     */
    revealSelection(selection) {
        const range = {
            from: this._toCodeMirrorPosition(selection.start),
            to: this._toCodeMirrorPosition(selection.end)
        };
        this._editor.scrollIntoView(range);
    }
    /**
     * Get the window coordinates given a cursor position.
     */
    getCoordinateForPosition(position) {
        const pos = this._toCodeMirrorPosition(position);
        const rect = this.editor.charCoords(pos, 'page');
        return rect;
    }
    /**
     * Get the cursor position given window coordinates.
     *
     * @param coordinate - The desired coordinate.
     *
     * @returns The position of the coordinates, or null if not
     *   contained in the editor.
     */
    getPositionForCoordinate(coordinate) {
        return this._toPosition(this.editor.coordsChar(coordinate)) || null;
    }
    /**
     * Returns the primary position of the cursor, never `null`.
     */
    getCursorPosition() {
        const cursor = this.doc.getCursor();
        return this._toPosition(cursor);
    }
    /**
     * Set the primary position of the cursor.
     *
     * #### Notes
     * This will remove any secondary cursors.
     */
    setCursorPosition(position, options) {
        const cursor = this._toCodeMirrorPosition(position);
        this.doc.setCursor(cursor, undefined, options);
        // If the editor does not have focus, this cursor change
        // will get screened out in _onCursorsChanged(). Make an
        // exception for this method.
        if (!this.editor.hasFocus()) {
            this.model.selections.set(this.uuid, this.getSelections());
        }
    }
    /**
     * Returns the primary selection, never `null`.
     */
    getSelection() {
        return this.getSelections()[0];
    }
    /**
     * Set the primary selection. This will remove any secondary cursors.
     */
    setSelection(selection) {
        this.setSelections([selection]);
    }
    /**
     * Gets the selections for all the cursors, never `null` or empty.
     */
    getSelections() {
        const selections = this.doc.listSelections();
        if (selections.length > 0) {
            return selections.map(selection => this._toSelection(selection));
        }
        const cursor = this.doc.getCursor();
        const selection = this._toSelection({ anchor: cursor, head: cursor });
        return [selection];
    }
    /**
     * Sets the selections for all the cursors, should not be empty.
     * Cursors will be removed or added, as necessary.
     * Passing an empty array resets a cursor position to the start of a document.
     */
    setSelections(selections) {
        const cmSelections = this._toCodeMirrorSelections(selections);
        this.doc.setSelections(cmSelections, 0);
    }
    /**
     * Replaces the current selection with the given text.
     *
     * @param text The text to be inserted.
     */
    replaceSelection(text) {
        this.doc.replaceSelection(text);
    }
    /**
     * Get a list of tokens for the current editor text content.
     */
    getTokens() {
        let tokens = [];
        for (let i = 0; i < this.lineCount; ++i) {
            const lineTokens = this.editor.getLineTokens(i).map(t => ({
                offset: this.getOffsetAt({ column: t.start, line: i }),
                value: t.string,
                type: t.type || ''
            }));
            tokens = tokens.concat(lineTokens);
        }
        return tokens;
    }
    /**
     * Get the token at a given editor position.
     */
    getTokenForPosition(position) {
        var _a;
        const cursor = this._toCodeMirrorPosition(position);
        const token = this.editor.getTokenAt(cursor);
        return {
            offset: this.getOffsetAt({ column: token.start, line: cursor.line }),
            value: token.string,
            type: (_a = token.type) !== null && _a !== void 0 ? _a : undefined
        };
    }
    /**
     * Insert a new indented line at the current cursor position.
     */
    newIndentedLine() {
        this.execCommand('newlineAndIndent');
    }
    /**
     * Execute a codemirror command on the editor.
     *
     * @param command - The name of the command to execute.
     */
    execCommand(command) {
        this._editor.execCommand(command);
    }
    /**
     * Handle keydown events from the editor.
     */
    onKeydown(event) {
        const position = this.getCursorPosition();
        const { line, column } = position;
        if (line === 0 && column === 0 && event.keyCode === UP_ARROW) {
            if (!event.shiftKey) {
                this.edgeRequested.emit('top');
            }
            return false;
        }
        if (line === 0 && event.keyCode === UP_ARROW) {
            if (!event.shiftKey) {
                this.edgeRequested.emit('topLine');
            }
            return false;
        }
        const lastLine = this.lineCount - 1;
        const lastCh = this.getLine(lastLine).length;
        if (line === lastLine &&
            column === lastCh &&
            event.keyCode === DOWN_ARROW) {
            if (!event.shiftKey) {
                this.edgeRequested.emit('bottom');
            }
            return false;
        }
        return false;
    }
    /**
     * Converts selections to code mirror selections.
     */
    _toCodeMirrorSelections(selections) {
        if (selections.length > 0) {
            return selections.map(selection => this._toCodeMirrorSelection(selection));
        }
        const position = { line: 0, ch: 0 };
        return [{ anchor: position, head: position }];
    }
    /**
     * Handles a mime type change.
     */
    _onMimeTypeChanged() {
        const mime = this._model.mimeType;
        const editor = this._editor;
        const extraKeys = (editor.getOption('extraKeys') ||
            {});
        const isCode = mime !== 'text/plain' && mime !== 'text/x-ipythongfm';
        if (isCode) {
            extraKeys['Backspace'] = 'delSpaceToPrevTabStop';
        }
        else {
            delete extraKeys['Backspace'];
        }
        this.setOption('extraKeys', extraKeys);
        // TODO: should we provide a hook for when the mode is done being set?
        void _mode__WEBPACK_IMPORTED_MODULE_31__.Mode.ensure(mime).then(spec => {
            var _a;
            this.setOption('mode', (_a = spec === null || spec === void 0 ? void 0 : spec.mime) !== null && _a !== void 0 ? _a : 'null');
        });
    }
    /**
     * Handles a selections change.
     */
    _onSelectionsChanged(selections, args) {
        const uuid = args.key;
        if (uuid !== this.uuid) {
            this._cleanSelections(uuid);
            if (args.type !== 'remove' && args.newValue) {
                this._markSelections(uuid, args.newValue);
            }
        }
    }
    /**
     * Clean selections for the given uuid.
     */
    _cleanSelections(uuid) {
        const markers = this.selectionMarkers[uuid];
        if (markers) {
            markers.forEach(marker => {
                marker.clear();
            });
        }
        delete this.selectionMarkers[uuid];
    }
    /**
     * Marks selections.
     */
    _markSelections(uuid, selections) {
        const markers = [];
        // If we are marking selections corresponding to an active hover,
        // remove it.
        if (uuid === this._hoverId) {
            this._clearHover();
        }
        // If we can id the selection to a specific collaborator,
        // use that information.
        let collaborator;
        if (this._model.modelDB.collaborators) {
            collaborator = this._model.modelDB.collaborators.get(uuid);
        }
        // Style each selection for the uuid.
        selections.forEach(selection => {
            // Only render selections if the start is not equal to the end.
            // In that case, we don't need to render the cursor.
            if (!_lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__.JSONExt.deepEqual(selection.start, selection.end)) {
                // Selections only appear to render correctly if the anchor
                // is before the head in the document. That is, reverse selections
                // do not appear as intended.
                const forward = selection.start.line < selection.end.line ||
                    (selection.start.line === selection.end.line &&
                        selection.start.column <= selection.end.column);
                const anchor = this._toCodeMirrorPosition(forward ? selection.start : selection.end);
                const head = this._toCodeMirrorPosition(forward ? selection.end : selection.start);
                let markerOptions;
                if (collaborator) {
                    markerOptions = this._toTextMarkerOptions(Object.assign(Object.assign({}, selection.style), { color: collaborator.color }));
                }
                else {
                    markerOptions = this._toTextMarkerOptions(selection.style);
                }
                markers.push(this.doc.markText(anchor, head, markerOptions));
            }
            else if (collaborator) {
                const caret = this._getCaret(collaborator);
                markers.push(this.doc.setBookmark(this._toCodeMirrorPosition(selection.end), {
                    widget: caret
                }));
            }
        });
        this.selectionMarkers[uuid] = markers;
    }
    /**
     * Handles a cursor activity event.
     */
    _onCursorActivity() {
        // Only add selections if the editor has focus. This avoids unwanted
        // triggering of cursor activity due to collaborator actions.
        if (this._editor.hasFocus()) {
            const selections = this.getSelections();
            this.model.selections.set(this.uuid, selections);
        }
    }
    /**
     * Converts a code mirror selection to an editor selection.
     */
    _toSelection(selection) {
        return {
            uuid: this.uuid,
            start: this._toPosition(selection.anchor),
            end: this._toPosition(selection.head),
            style: this.selectionStyle
        };
    }
    /**
     * Converts the selection style to a text marker options.
     */
    _toTextMarkerOptions(style) {
        const r = parseInt(style.color.slice(1, 3), 16);
        const g = parseInt(style.color.slice(3, 5), 16);
        const b = parseInt(style.color.slice(5, 7), 16);
        const css = `background-color: rgba( ${r}, ${g}, ${b}, 0.15)`;
        return {
            className: style.className,
            title: style.displayName,
            css
        };
    }
    /**
     * Converts an editor selection to a code mirror selection.
     */
    _toCodeMirrorSelection(selection) {
        return {
            anchor: this._toCodeMirrorPosition(selection.start),
            head: this._toCodeMirrorPosition(selection.end)
        };
    }
    /**
     * Convert a code mirror position to an editor position.
     */
    _toPosition(position) {
        return {
            line: position.line,
            column: position.ch
        };
    }
    /**
     * Convert an editor position to a code mirror position.
     */
    _toCodeMirrorPosition(position) {
        return {
            line: position.line,
            ch: position.column
        };
    }
    /**
     * Handle model value changes.
     */
    _onValueChanged(value, args) {
        if (this._changeGuard) {
            return;
        }
        this._changeGuard = true;
        const doc = this.doc;
        switch (args.type) {
            case 'insert': {
                const pos = doc.posFromIndex(args.start);
                // Replace the range, including a '+input' origin,
                // which indicates that CodeMirror may merge changes
                // for undo/redo purposes.
                doc.replaceRange(args.value, pos, pos, '+input');
                break;
            }
            case 'remove': {
                const from = doc.posFromIndex(args.start);
                const to = doc.posFromIndex(args.end);
                // Replace the range, including a '+input' origin,
                // which indicates that CodeMirror may merge changes
                // for undo/redo purposes.
                doc.replaceRange('', from, to, '+input');
                break;
            }
            case 'set':
                doc.setValue(args.value);
                break;
            default:
                break;
        }
        this._changeGuard = false;
    }
    /**
     * Handles document changes.
     */
    _beforeDocChanged(doc, change) {
        if (this._changeGuard) {
            return;
        }
        this._changeGuard = true;
        const value = this._model.value;
        const start = doc.indexFromPos(change.from);
        const end = doc.indexFromPos(change.to);
        const inserted = change.text.join('\n');
        if (end !== start) {
            value.remove(start, end);
        }
        if (inserted) {
            value.insert(start, inserted);
        }
        this._changeGuard = false;
    }
    /**
     * Handle the DOM events for the editor.
     *
     * @param event - The DOM event sent to the editor.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the editor's DOM node. It should
     * not be called directly by user code.
     */
    handleEvent(event) {
        switch (event.type) {
            case 'focus':
                this._evtFocus(event);
                break;
            case 'blur':
                this._evtBlur(event);
                break;
            case 'scroll':
                this._evtScroll();
                break;
            default:
                break;
        }
    }
    /**
     * Handle `focus` events for the editor.
     */
    _evtFocus(event) {
        if (this._needsRefresh) {
            this.refresh();
        }
        this.host.classList.add('jp-mod-focused');
        // Update the selections on editor gaining focus because
        // the onCursorActivity function filters usual cursor events
        // based on the editor's focus.
        this._onCursorActivity();
    }
    /**
     * Handle `blur` events for the editor.
     */
    _evtBlur(event) {
        this.host.classList.remove('jp-mod-focused');
    }
    /**
     * Handle `scroll` events for the editor.
     */
    _evtScroll() {
        // Remove any active hover.
        this._clearHover();
    }
    /**
     * Clear the hover for a caret, due to things like
     * scrolling, resizing, deactivation, etc, where
     * the position is no longer valid.
     */
    _clearHover() {
        if (this._caretHover) {
            window.clearTimeout(this._hoverTimeout);
            document.body.removeChild(this._caretHover);
            this._caretHover = null;
        }
    }
    /**
     * Construct a caret element representing the position
     * of a collaborator's cursor.
     */
    _getCaret(collaborator) {
        // FIXME-TRANS: Is this localizable?
        const name = collaborator ? collaborator.displayName : 'Anonymous';
        const color = collaborator
            ? collaborator.color
            : this._selectionStyle.color;
        const caret = document.createElement('span');
        caret.className = COLLABORATOR_CURSOR_CLASS;
        caret.style.borderBottomColor = color;
        caret.onmouseenter = () => {
            this._clearHover();
            this._hoverId = collaborator.sessionId;
            const rect = caret.getBoundingClientRect();
            // Construct and place the hover box.
            const hover = document.createElement('div');
            hover.className = COLLABORATOR_HOVER_CLASS;
            hover.style.left = String(rect.left) + 'px';
            hover.style.top = String(rect.bottom) + 'px';
            hover.textContent = name;
            hover.style.backgroundColor = color;
            // If the user mouses over the hover, take over the timer.
            hover.onmouseenter = () => {
                window.clearTimeout(this._hoverTimeout);
            };
            hover.onmouseleave = () => {
                this._hoverTimeout = window.setTimeout(() => {
                    this._clearHover();
                }, HOVER_TIMEOUT);
            };
            this._caretHover = hover;
            document.body.appendChild(hover);
        };
        caret.onmouseleave = () => {
            this._hoverTimeout = window.setTimeout(() => {
                this._clearHover();
            }, HOVER_TIMEOUT);
        };
        return caret;
    }
    /**
     * Check for an out of sync editor.
     */
    _checkSync() {
        const change = this._lastChange;
        if (!change) {
            return;
        }
        this._lastChange = null;
        const editor = this._editor;
        const doc = editor.getDoc();
        if (doc.getValue() === this._model.value.text) {
            return;
        }
        void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
            title: this._trans.__('Code Editor out of Sync'),
            body: this._trans.__('Please open your browser JavaScript console for bug report instructions')
        });
        console.warn('If you are able and willing to publicly share the text or code in your editor, you can help us debug the "Code Editor out of Sync" message by pasting the following to the public issue at https://github.com/jupyterlab/jupyterlab/issues/2951. Please note that the data below includes the text/code in your editor.');
        console.warn(JSON.stringify({
            model: this._model.value.text,
            view: doc.getValue(),
            selections: this.getSelections(),
            cursor: this.getCursorPosition(),
            lineSep: editor.getOption('lineSeparator'),
            mode: editor.getOption('mode'),
            change
        }));
    }
}
/**
 * The namespace for `CodeMirrorEditor` statics.
 */
(function (CodeMirrorEditor) {
    /**
     * The default configuration options for an editor.
     */
    CodeMirrorEditor.defaultConfig = Object.assign(Object.assign({}, _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditor.defaultConfig), { mode: 'null', theme: 'jupyter', smartIndent: true, electricChars: true, keyMap: 'default', extraKeys: null, gutters: [], fixedGutter: true, showCursorWhenSelecting: false, coverGutterNextToScrollbar: false, dragDrop: true, lineSeparator: null, scrollbarStyle: 'native', lineWiseCopyCut: true, scrollPastEnd: false, styleActiveLine: false, styleSelectedText: true, selectionPointer: false, rulers: [], foldGutter: false, handlePaste: true });
    /**
     * Add a command to CodeMirror.
     *
     * @param name - The name of the command to add.
     *
     * @param command - The command function.
     */
    function addCommand(name, command) {
        (codemirror__WEBPACK_IMPORTED_MODULE_8___default().commands)[name] = command;
    }
    CodeMirrorEditor.addCommand = addCommand;
})(CodeMirrorEditor || (CodeMirrorEditor = {}));
/**
 * The namespace for module private data.
 */
var Private;
(function (Private) {
    function createEditor(host, config) {
        const { autoClosingBrackets, fontFamily, fontSize, insertSpaces, lineHeight, lineWrap, wordWrapColumn, tabSize, readOnly } = config, otherOptions = __rest(config, ["autoClosingBrackets", "fontFamily", "fontSize", "insertSpaces", "lineHeight", "lineWrap", "wordWrapColumn", "tabSize", "readOnly"]);
        const bareConfig = Object.assign({ autoCloseBrackets: autoClosingBrackets ? {} : false, indentUnit: tabSize, indentWithTabs: !insertSpaces, lineWrapping: lineWrap === 'off' ? false : true, readOnly }, otherOptions);
        return codemirror__WEBPACK_IMPORTED_MODULE_8___default()(el => {
            if (fontFamily) {
                el.style.fontFamily = fontFamily;
            }
            if (fontSize) {
                el.style.fontSize = fontSize + 'px';
            }
            if (lineHeight) {
                el.style.lineHeight = lineHeight.toString();
            }
            if (readOnly) {
                el.classList.add(READ_ONLY_CLASS);
            }
            if (lineWrap === 'wordWrapColumn') {
                const lines = el.querySelector('.CodeMirror-lines');
                lines.style.width = `${wordWrapColumn}ch`;
            }
            if (lineWrap === 'bounded') {
                const lines = el.querySelector('.CodeMirror-lines');
                lines.style.maxWidth = `${wordWrapColumn}ch`;
            }
            host.appendChild(el);
        }, bareConfig);
    }
    Private.createEditor = createEditor;
    /**
     * Indent or insert a tab as appropriate.
     */
    function indentMoreOrinsertTab(cm) {
        const doc = cm.getDoc();
        const from = doc.getCursor('from');
        const to = doc.getCursor('to');
        const sel = !posEq(from, to);
        if (sel) {
            codemirror__WEBPACK_IMPORTED_MODULE_8___default().commands.indentMore(cm);
            return;
        }
        // Check for start of line.
        const line = doc.getLine(from.line);
        const before = line.slice(0, from.ch);
        if (/^\s*$/.test(before)) {
            codemirror__WEBPACK_IMPORTED_MODULE_8___default().commands.indentMore(cm);
        }
        else {
            if (cm.getOption('indentWithTabs')) {
                codemirror__WEBPACK_IMPORTED_MODULE_8___default().commands.insertTab(cm);
            }
            else {
                codemirror__WEBPACK_IMPORTED_MODULE_8___default().commands.insertSoftTab(cm);
            }
        }
    }
    Private.indentMoreOrinsertTab = indentMoreOrinsertTab;
    /**
     * Delete spaces to the previous tab stop in a codemirror editor.
     */
    function delSpaceToPrevTabStop(cm) {
        var _a;
        const doc = cm.getDoc();
        // default tabsize is 2, according to codemirror docs: https://codemirror.net/doc/manual.html#config
        const tabSize = (_a = cm.getOption('indentUnit')) !== null && _a !== void 0 ? _a : 2;
        const ranges = doc.listSelections(); // handle multicursor
        for (let i = ranges.length - 1; i >= 0; i--) {
            // iterate reverse so any deletions don't overlap
            const head = ranges[i].head;
            const anchor = ranges[i].anchor;
            const isSelection = !posEq(head, anchor);
            if (isSelection) {
                doc.replaceRange('', anchor, head);
            }
            else {
                const line = doc.getLine(head.line).substring(0, head.ch);
                if (line.match(/^\ +$/) !== null) {
                    // delete tabs
                    const prevTabStop = (Math.ceil(head.ch / tabSize) - 1) * tabSize;
                    const from = codemirror__WEBPACK_IMPORTED_MODULE_8___default().Pos(head.line, prevTabStop);
                    doc.replaceRange('', from, head);
                }
                else {
                    // delete non-tabs
                    const from = cm.findPosH(head, -1, 'char', false);
                    doc.replaceRange('', from, head);
                }
            }
        }
    }
    Private.delSpaceToPrevTabStop = delSpaceToPrevTabStop;
    /**
     * Test whether two CodeMirror positions are equal.
     */
    function posEq(a, b) {
        return a.line === b.line && a.ch === b.ch;
    }
    Private.posEq = posEq;
    /**
     * Get the list of active gutters
     *
     * @param config Editor configuration
     */
    function getActiveGutters(config) {
        // The order of the classes will be the gutters order
        const classToSwitch = {
            'CodeMirror-linenumbers': 'lineNumbers',
            'CodeMirror-foldgutter': 'codeFolding'
        };
        return Object.keys(classToSwitch).filter(gutter => config[classToSwitch[gutter]]);
    }
    /**
     * Set a config option for the editor.
     */
    function setOption(editor, option, value, config) {
        const el = editor.getWrapperElement();
        switch (option) {
            case 'cursorBlinkRate':
                editor.setOption(option, value);
                break;
            case 'lineWrap': {
                const lineWrapping = value === 'off' ? false : true;
                const lines = el.querySelector('.CodeMirror-lines');
                const maxWidth = value === 'bounded' ? `${config.wordWrapColumn}ch` : null;
                const width = value === 'wordWrapColumn' ? `${config.wordWrapColumn}ch` : null;
                lines.style.setProperty('max-width', maxWidth);
                lines.style.setProperty('width', width);
                editor.setOption('lineWrapping', lineWrapping);
                break;
            }
            case 'wordWrapColumn': {
                const { lineWrap } = config;
                if (lineWrap === 'wordWrapColumn' || lineWrap === 'bounded') {
                    const lines = el.querySelector('.CodeMirror-lines');
                    const prop = lineWrap === 'wordWrapColumn' ? 'width' : 'maxWidth';
                    lines.style[prop] = `${value}ch`;
                }
                break;
            }
            case 'tabSize':
                editor.setOption('indentUnit', value);
                break;
            case 'insertSpaces':
                editor.setOption('indentWithTabs', !value);
                break;
            case 'autoClosingBrackets':
                editor.setOption('autoCloseBrackets', value);
                break;
            case 'rulers': {
                const rulers = value;
                editor.setOption('rulers', rulers.map(column => {
                    return {
                        column,
                        className: 'jp-CodeMirror-ruler'
                    };
                }));
                break;
            }
            case 'readOnly':
                el.classList.toggle(READ_ONLY_CLASS, value);
                editor.setOption(option, value);
                break;
            case 'fontFamily':
                el.style.fontFamily = value;
                break;
            case 'fontSize':
                el.style.setProperty('font-size', value ? value + 'px' : null);
                break;
            case 'lineHeight':
                el.style.lineHeight = (value ? value.toString() : null);
                break;
            case 'gutters':
                editor.setOption(option, getActiveGutters(config));
                break;
            case 'lineNumbers':
                editor.setOption(option, value);
                editor.setOption('gutters', getActiveGutters(config));
                break;
            case 'codeFolding':
                editor.setOption('foldGutter', value);
                editor.setOption('gutters', getActiveGutters(config));
                break;
            case 'showTrailingSpace':
                editor.setOption(option, value);
                break;
            default:
                editor.setOption(option, value);
                break;
        }
    }
    Private.setOption = setOption;
})(Private || (Private = {}));
/**
 * Add a CodeMirror command to delete until previous non blanking space
 * character or first multiple of tabsize tabstop.
 */
CodeMirrorEditor.addCommand('delSpaceToPrevTabStop', Private.delSpaceToPrevTabStop);
/**
 * Add a CodeMirror command to indent or insert a tab as appropriate.
 */
CodeMirrorEditor.addCommand('indentMoreOrinsertTab', Private.indentMoreOrinsertTab);
//# sourceMappingURL=editor.js.map

/***/ }),

/***/ "../../packages/codemirror/lib/factory.js":
/*!************************************************!*\
  !*** ../../packages/codemirror/lib/factory.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CodeMirrorEditorFactory": () => (/* binding */ CodeMirrorEditorFactory)
/* harmony export */ });
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor */ "../../packages/codemirror/lib/editor.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * CodeMirror editor factory.
 */
class CodeMirrorEditorFactory {
    /**
     * Construct an IEditorFactoryService for CodeMirrorEditors.
     */
    constructor(defaults = {}, translator) {
        /**
         * Create a new editor for inline code.
         */
        this.newInlineEditor = (options) => {
            options.host.dataset.type = 'inline';
            return new _editor__WEBPACK_IMPORTED_MODULE_1__.CodeMirrorEditor(Object.assign(Object.assign({}, options), { config: Object.assign(Object.assign({}, this.inlineCodeMirrorConfig), (options.config || {})), translator: this.translator }));
        };
        /**
         * Create a new editor for a full document.
         */
        this.newDocumentEditor = (options) => {
            options.host.dataset.type = 'document';
            return new _editor__WEBPACK_IMPORTED_MODULE_1__.CodeMirrorEditor(Object.assign(Object.assign({}, options), { config: Object.assign(Object.assign({}, this.documentCodeMirrorConfig), (options.config || {})), translator: this.translator }));
        };
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator;
        this.inlineCodeMirrorConfig = Object.assign(Object.assign(Object.assign({}, _editor__WEBPACK_IMPORTED_MODULE_1__.CodeMirrorEditor.defaultConfig), { extraKeys: {
                'Cmd-Right': 'goLineRight',
                End: 'goLineRight',
                'Cmd-Left': 'goLineLeft',
                Tab: 'indentMoreOrinsertTab',
                'Shift-Tab': 'indentLess',
                'Cmd-/': cm => cm.toggleComment({ indent: true }),
                'Ctrl-/': cm => cm.toggleComment({ indent: true }),
                'Ctrl-G': 'find',
                'Cmd-G': 'find'
            } }), defaults);
        this.documentCodeMirrorConfig = Object.assign(Object.assign(Object.assign({}, _editor__WEBPACK_IMPORTED_MODULE_1__.CodeMirrorEditor.defaultConfig), { extraKeys: {
                Tab: 'indentMoreOrinsertTab',
                'Shift-Tab': 'indentLess',
                'Cmd-/': cm => cm.toggleComment({ indent: true }),
                'Ctrl-/': cm => cm.toggleComment({ indent: true }),
                'Shift-Enter': () => {
                    /* no-op */
                }
            }, lineNumbers: true, scrollPastEnd: true }), defaults);
    }
}
//# sourceMappingURL=factory.js.map

/***/ }),

/***/ "../../packages/codemirror/lib/index.js":
/*!**********************************************!*\
  !*** ../../packages/codemirror/lib/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CodeMirrorEditor": () => (/* reexport safe */ _editor__WEBPACK_IMPORTED_MODULE_2__.CodeMirrorEditor),
/* harmony export */   "CodeMirrorEditorFactory": () => (/* reexport safe */ _factory__WEBPACK_IMPORTED_MODULE_0__.CodeMirrorEditorFactory),
/* harmony export */   "CodeMirrorMimeTypeService": () => (/* reexport safe */ _mimetype__WEBPACK_IMPORTED_MODULE_1__.CodeMirrorMimeTypeService),
/* harmony export */   "Mode": () => (/* reexport safe */ _mode__WEBPACK_IMPORTED_MODULE_3__.Mode),
/* harmony export */   "EditorSyntaxStatus": () => (/* reexport safe */ _syntaxstatus__WEBPACK_IMPORTED_MODULE_4__.EditorSyntaxStatus),
/* harmony export */   "ICodeMirror": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_5__.ICodeMirror),
/* harmony export */   "editorServices": () => (/* binding */ editorServices)
/* harmony export */ });
/* harmony import */ var _factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory */ "../../packages/codemirror/lib/factory.js");
/* harmony import */ var _mimetype__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mimetype */ "../../packages/codemirror/lib/mimetype.js");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor */ "../../packages/codemirror/lib/editor.js");
/* harmony import */ var _mode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mode */ "../../packages/codemirror/lib/mode.js");
/* harmony import */ var _syntaxstatus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./syntaxstatus */ "../../packages/codemirror/lib/syntaxstatus.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tokens */ "../../packages/codemirror/lib/tokens.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module codemirror
 */








/**
 * The default editor services.
 */
const editorServices = {
    factoryService: new _factory__WEBPACK_IMPORTED_MODULE_0__.CodeMirrorEditorFactory(),
    mimeTypeService: new _mimetype__WEBPACK_IMPORTED_MODULE_1__.CodeMirrorMimeTypeService()
};
/**
 * FIXME-TRANS: Maybe an option to be able to pass a translator to the factories?
 *

export function getEditorServices(translator: ITranslator): IEditorServices {
  return {
    factoryService: new CodeMirrorEditorFactory({}, translator),
    mimeTypeService: new CodeMirrorMimeTypeService(translator)
  };
}
 */
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/codemirror/lib/mimetype.js":
/*!*************************************************!*\
  !*** ../../packages/codemirror/lib/mimetype.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CodeMirrorMimeTypeService": () => (/* binding */ CodeMirrorMimeTypeService)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mode */ "../../packages/codemirror/lib/mode.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * The mime type service for CodeMirror.
 */
class CodeMirrorMimeTypeService {
    /**
     * Returns a mime type for the given language info.
     *
     * #### Notes
     * If a mime type cannot be found returns the default mime type `text/plain`, never `null`.
     */
    getMimeTypeByLanguage(info) {
        const ext = info.file_extension || '';
        return _mode__WEBPACK_IMPORTED_MODULE_1__.Mode.findBest(info.codemirror_mode || {
            mimetype: info.mimetype,
            name: info.name,
            ext: [ext.split('.').slice(-1)[0]]
        }).mime;
    }
    /**
     * Returns a mime type for the given file path.
     *
     * #### Notes
     * If a mime type cannot be found returns the default mime type `text/plain`, never `null`.
     */
    getMimeTypeByFilePath(path) {
        const ext = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.extname(path);
        if (ext === '.ipy') {
            return 'text/x-python';
        }
        else if (ext === '.md') {
            return 'text/x-ipythongfm';
        }
        const mode = _mode__WEBPACK_IMPORTED_MODULE_1__.Mode.findByFileName(path) || _mode__WEBPACK_IMPORTED_MODULE_1__.Mode.findBest('');
        return mode.mime;
    }
}
//# sourceMappingURL=mimetype.js.map

/***/ }),

/***/ "../../packages/codemirror/lib/mode.js":
/*!*********************************************!*\
  !*** ../../packages/codemirror/lib/mode.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Mode": () => (/* binding */ Mode)
/* harmony export */ });
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! codemirror */ "webpack/sharing/consume/default/codemirror/codemirror");
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(codemirror__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var codemirror_addon_runmode_runmode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! codemirror/addon/runmode/runmode */ "../../node_modules/codemirror/addon/runmode/runmode.js");
/* harmony import */ var codemirror_addon_runmode_runmode__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_runmode_runmode__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var codemirror_mode_clike_clike__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! codemirror/mode/clike/clike */ "../../node_modules/codemirror/mode/clike/clike.js");
/* harmony import */ var codemirror_mode_clike_clike__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_clike_clike__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var codemirror_mode_css_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! codemirror/mode/css/css */ "../../node_modules/codemirror/mode/css/css.js");
/* harmony import */ var codemirror_mode_css_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_css_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! codemirror/mode/javascript/javascript */ "../../node_modules/codemirror/mode/javascript/javascript.js");
/* harmony import */ var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var codemirror_mode_jsx_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! codemirror/mode/jsx/jsx */ "../../node_modules/codemirror/mode/jsx/jsx.js");
/* harmony import */ var codemirror_mode_jsx_jsx__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_jsx_jsx__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var codemirror_mode_julia_julia__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! codemirror/mode/julia/julia */ "../../node_modules/codemirror/mode/julia/julia.js");
/* harmony import */ var codemirror_mode_julia_julia__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_julia_julia__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! codemirror/mode/markdown/markdown */ "../../node_modules/codemirror/mode/markdown/markdown.js");
/* harmony import */ var codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var codemirror_mode_meta__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! codemirror/mode/meta */ "../../node_modules/codemirror/mode/meta.js");
/* harmony import */ var codemirror_mode_meta__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_meta__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var codemirror_mode_r_r__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! codemirror/mode/r/r */ "../../node_modules/codemirror/mode/r/r.js");
/* harmony import */ var codemirror_mode_r_r__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_r_r__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var codemirror_mode_shell_shell__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! codemirror/mode/shell/shell */ "../../node_modules/codemirror/mode/shell/shell.js");
/* harmony import */ var codemirror_mode_shell_shell__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_shell_shell__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var codemirror_mode_sql_sql__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! codemirror/mode/sql/sql */ "../../node_modules/codemirror/mode/sql/sql.js");
/* harmony import */ var codemirror_mode_sql_sql__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_sql_sql__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _codemirror_ipython__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./codemirror-ipython */ "../../packages/codemirror/lib/codemirror-ipython.js");
/* harmony import */ var _codemirror_ipythongfm__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./codemirror-ipythongfm */ "../../packages/codemirror/lib/codemirror-ipythongfm.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







// Bundle other common modes










/**
 * The namespace for CodeMirror Mode functionality.
 */
var Mode;
(function (Mode) {
    const specLoaders = [
        {
            // Simplest, cheapest check by mode name.
            loader: async (spec) => codemirror__WEBPACK_IMPORTED_MODULE_3___default().modes.hasOwnProperty(spec.mode),
            rank: 0
        },
        {
            // Fetch the mode asynchronously.
            loader: function (spec) {
                return new Promise((resolve, reject) => {
                    // An arrow function below seems to miscompile in our current webpack to
                    // invalid js.
                    Promise.all(/*! AMD require */[__webpack_require__.e("vendors-node_modules_codemirror_mode_apl_apl_js-node_modules_codemirror_mode_asciiarmor_ascii-55b27f"), __webpack_require__.e("node_modules_codemirror_mode_sync_recursive_js_")]).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
                        __webpack_require__("../../node_modules/codemirror/mode sync recursive ^\\.\\/.*\\/.*\\.js$")(`./${spec.mode}/${spec.mode}.js`)
                    ]; (function () {
                        resolve(true);
                    }).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__);}).catch(__webpack_require__.oe);
                });
            },
            rank: 99
        }
    ];
    /**
     * Get the raw list of available modes specs.
     */
    function getModeInfo() {
        return (codemirror__WEBPACK_IMPORTED_MODULE_3___default().modeInfo);
    }
    Mode.getModeInfo = getModeInfo;
    /**
     * Running a CodeMirror mode outside of an editor.
     */
    function run(code, mode, el) {
        codemirror__WEBPACK_IMPORTED_MODULE_3___default().runMode(code, mode, el);
    }
    Mode.run = run;
    /**
     * Ensure a codemirror mode is available by name or Codemirror spec.
     *
     * @param mode - The mode to ensure.  If it is a string, uses [findBest]
     *   to get the appropriate spec.
     *
     * @returns A promise that resolves when the mode is available.
     */
    async function ensure(mode) {
        const spec = findBest(mode);
        for (const specLoader of specLoaders) {
            if (await specLoader.loader(spec)) {
                return spec;
            }
        }
        return null;
    }
    Mode.ensure = ensure;
    function addSpecLoader(loader, rank) {
        const item = { loader, rank };
        const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.ArrayExt.upperBound(specLoaders, item, Private.itemCmp);
        _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.ArrayExt.insert(specLoaders, index, item);
    }
    Mode.addSpecLoader = addSpecLoader;
    /**
     * Find a codemirror mode by name or CodeMirror spec.
     */
    function findBest(mode) {
        var _a;
        const modename = typeof mode === 'string' ? mode : mode.mode || mode.name;
        const mimetype = typeof mode !== 'string' ? mode.mime : modename;
        const ext = typeof mode !== 'string' ? (_a = mode.ext) !== null && _a !== void 0 ? _a : [] : [];
        return (codemirror__WEBPACK_IMPORTED_MODULE_3___default().findModeByName(modename || '') ||
            codemirror__WEBPACK_IMPORTED_MODULE_3___default().findModeByMIME(mimetype || '') ||
            findByExtension(ext) ||
            codemirror__WEBPACK_IMPORTED_MODULE_3___default().findModeByMIME(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_0__.IEditorMimeTypeService.defaultMimeType) ||
            codemirror__WEBPACK_IMPORTED_MODULE_3___default().findModeByMIME('text/plain'));
    }
    Mode.findBest = findBest;
    /**
     * Find a codemirror mode by MIME.
     */
    function findByMIME(mime) {
        return codemirror__WEBPACK_IMPORTED_MODULE_3___default().findModeByMIME(mime);
    }
    Mode.findByMIME = findByMIME;
    /**
     * Find a codemirror mode by name.
     */
    function findByName(name) {
        return codemirror__WEBPACK_IMPORTED_MODULE_3___default().findModeByName(name);
    }
    Mode.findByName = findByName;
    /**
     * Find a codemirror mode by filename.
     */
    function findByFileName(name) {
        const basename = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(name);
        return codemirror__WEBPACK_IMPORTED_MODULE_3___default().findModeByFileName(basename);
    }
    Mode.findByFileName = findByFileName;
    /**
     * Find a codemirror mode by extension.
     */
    function findByExtension(ext) {
        if (typeof ext === 'string') {
            return codemirror__WEBPACK_IMPORTED_MODULE_3___default().findModeByExtension(ext);
        }
        for (let i = 0; i < ext.length; i++) {
            const mode = codemirror__WEBPACK_IMPORTED_MODULE_3___default().findModeByExtension(ext[i]);
            if (mode) {
                return mode;
            }
        }
        return null;
    }
    Mode.findByExtension = findByExtension;
})(Mode || (Mode = {}));
var Private;
(function (Private) {
    /**
     * A less-than comparison function for the loader rank
     */
    function itemCmp(first, second) {
        return first.rank - second.rank;
    }
    Private.itemCmp = itemCmp;
})(Private || (Private = {}));
//# sourceMappingURL=mode.js.map

/***/ }),

/***/ "../../packages/codemirror/lib/syntaxstatus.js":
/*!*****************************************************!*\
  !*** ../../packages/codemirror/lib/syntaxstatus.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditorSyntaxStatus": () => (/* binding */ EditorSyntaxStatus)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/statusbar */ "webpack/sharing/consume/default/@jupyterlab/statusbar/@jupyterlab/statusbar");
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! . */ "../../packages/codemirror/lib/index.js");






/**
 * A pure function that returns a tsx component for an editor syntax item.
 *
 * @param props: the props for the component.
 *
 * @returns an editor syntax component.
 */
function EditorSyntaxComponent(props) {
    return react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__.TextItem, { source: props.mode, onClick: props.handleClick });
}
/**
 * StatusBar item to change the language syntax highlighting of the file editor.
 */
class EditorSyntaxStatus extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomRenderer {
    /**
     * Construct a new VDomRenderer for the status item.
     */
    constructor(opts) {
        super(new EditorSyntaxStatus.Model());
        /**
         * Create a menu for selecting the mode of the editor.
         */
        this._handleClick = () => {
            const modeMenu = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.Menu({ commands: this._commands });
            const command = 'codemirror:change-mode';
            if (this._popup) {
                this._popup.dispose();
            }
            ___WEBPACK_IMPORTED_MODULE_5__.Mode.getModeInfo()
                .sort((a, b) => {
                const aName = a.name || '';
                const bName = b.name || '';
                return aName.localeCompare(bName);
            })
                .forEach(spec => {
                if (spec.mode.indexOf('brainf') === 0) {
                    return;
                }
                const args = {
                    insertSpaces: true,
                    name: spec.name
                };
                modeMenu.addItem({
                    command,
                    args
                });
            });
            this._popup = (0,_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__.showPopup)({
                body: modeMenu,
                anchor: this,
                align: 'left'
            });
        };
        this._popup = null;
        this._commands = opts.commands;
        this.translator = opts.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        const trans = this.translator.load('jupyterlab');
        this.addClass(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__.interactiveItem);
        this.title.caption = trans.__('Change text editor syntax highlighting');
    }
    /**
     * Render the status item.
     */
    render() {
        if (!this.model) {
            return null;
        }
        return (react__WEBPACK_IMPORTED_MODULE_4___default().createElement(EditorSyntaxComponent, { mode: this.model.mode, handleClick: this._handleClick }));
    }
}
/**
 * A namespace for EditorSyntax statics.
 */
(function (EditorSyntaxStatus) {
    /**
     * A VDomModel for the current editor/mode combination.
     */
    class Model extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomModel {
        constructor() {
            super(...arguments);
            /**
             * If the editor mode changes, update the model.
             */
            this._onMIMETypeChange = (mode, change) => {
                const oldMode = this._mode;
                const spec = ___WEBPACK_IMPORTED_MODULE_5__.Mode.findByMIME(change.newValue);
                this._mode = spec.name || spec.mode;
                this._triggerChange(oldMode, this._mode);
            };
            this._mode = '';
            this._editor = null;
        }
        /**
         * The current mode for the editor. If no editor is present,
         * returns the empty string.
         */
        get mode() {
            return this._mode;
        }
        /**
         * The current editor for the application editor tracker.
         */
        get editor() {
            return this._editor;
        }
        set editor(editor) {
            const oldEditor = this._editor;
            if (oldEditor !== null) {
                oldEditor.model.mimeTypeChanged.disconnect(this._onMIMETypeChange);
            }
            const oldMode = this._mode;
            this._editor = editor;
            if (this._editor === null) {
                this._mode = '';
            }
            else {
                const spec = ___WEBPACK_IMPORTED_MODULE_5__.Mode.findByMIME(this._editor.model.mimeType);
                this._mode = spec.name || spec.mode;
                this._editor.model.mimeTypeChanged.connect(this._onMIMETypeChange);
            }
            this._triggerChange(oldMode, this._mode);
        }
        /**
         * Trigger a rerender of the model.
         */
        _triggerChange(oldState, newState) {
            if (oldState !== newState) {
                this.stateChanged.emit(void 0);
            }
        }
    }
    EditorSyntaxStatus.Model = Model;
})(EditorSyntaxStatus || (EditorSyntaxStatus = {}));
//# sourceMappingURL=syntaxstatus.js.map

/***/ }),

/***/ "../../packages/codemirror/lib/tokens.js":
/*!***********************************************!*\
  !*** ../../packages/codemirror/lib/tokens.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ICodeMirror": () => (/* binding */ ICodeMirror)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The CodeMirror token.
 */
const ICodeMirror = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/codemirror:ICodeMirror');
//# sourceMappingURL=tokens.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY29kZW1pcnJvci9saWIvY29kZW1pcnJvci1pcHl0aG9uLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9jb2RlbWlycm9yL2xpYi9jb2RlbWlycm9yLWlweXRob25nZm0uanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2NvZGVtaXJyb3IvbGliL2VkaXRvci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY29kZW1pcnJvci9saWIvZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY29kZW1pcnJvci9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2NvZGVtaXJyb3IvbGliL21pbWV0eXBlLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9jb2RlbWlycm9yL2xpYi9tb2RlLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9jb2RlbWlycm9yL2xpYi9zeW50YXhzdGF0dXMuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2NvZGVtaXJyb3IvbGliL3Rva2Vucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNvQztBQUNOO0FBQ1M7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHlEQUFrQjtBQUM3QixDQUFDO0FBQ0QsNERBQXFCO0FBQ3JCLCtEQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCw4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNvQztBQUNLO0FBQ1I7QUFDRTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBcUI7QUFDckIsb0JBQW9CLHlEQUFrQjtBQUN0QztBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLEtBQUs7QUFDTCxvQkFBb0IseURBQWtCO0FBQ3RDO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsV0FBVyxrRUFBMkI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsNERBQXFCO0FBQ3JCLCtEQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxpRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsU0FBSSxJQUFJLFNBQUk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsY0FBYztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2tEO0FBQ0U7QUFDSztBQUNaO0FBQ0s7QUFDTTtBQUNqQjtBQUNJO0FBQ1A7QUFDUztBQUNEO0FBQ0k7QUFDQTtBQUNIO0FBQ0U7QUFDSjtBQUNFO0FBQ0M7QUFDRTtBQUNMO0FBQ0w7QUFDWTtBQUNKO0FBQ047QUFDTTtBQUNFO0FBQ0c7QUFDRztBQUNOO0FBQ1o7QUFDRTtBQUNXO0FBQ25CO0FBQzlCLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxxREFBTTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELG1FQUFjO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyx5REFBVTtBQUMvQztBQUNBO0FBQ0EsNkRBQTZELEVBQUUsb0ZBQWdDO0FBQy9GO0FBQ0E7QUFDQSx5RUFBeUU7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixpREFBSTtBQUM3QjtBQUNBO0FBQ0EsYUFBYTtBQUNiLHdCQUF3QixpQ0FBaUM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvREFBYTtBQUNyQiwwQkFBMEIsc0VBQXVCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxvREFBYTtBQUN6QixZQUFZLG9EQUFhO0FBQ3pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsUUFBUSxvREFBYTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLG1DQUFtQyw0REFBaUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsK0RBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsV0FBVztBQUMxQixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrRUFBa0I7QUFDckMsWUFBWSxzRUFBdUI7QUFDbkMsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxnRUFBVTtBQUN2QjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qiw4Q0FBZTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdEQUFnRDtBQUNqRCx3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzSUE7QUFDQTtBQUMwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNPLHdCQUF3QixvREFBSztBQUNwQyxrQyIsImZpbGUiOiJwYWNrYWdlc19jb2RlbWlycm9yX2xpYl9pbmRleF9qcy1wYWNrYWdlc19jb2RlbWlycm9yX2xpYl9zeW50YXhzdGF0dXNfanMuZTA4MTZiNmI0MGI4MjkyMTczNzcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgQ29kZU1pcnJvciBmcm9tICdjb2RlbWlycm9yJztcbmltcG9ydCAnY29kZW1pcnJvci9tb2RlL21ldGEnO1xuaW1wb3J0ICdjb2RlbWlycm9yL21vZGUvcHl0aG9uL3B5dGhvbic7XG4vKipcbiAqIERlZmluZSBhbiBJUHl0aG9uIGNvZGVtaXJyb3IgbW9kZS5cbiAqXG4gKiBJdCBpcyBhIHNsaWdodGx5IGFsdGVyZWQgUHl0aG9uIE1vZGUgd2l0aCBhIGA/YCBvcGVyYXRvci5cbiAqL1xuQ29kZU1pcnJvci5kZWZpbmVNb2RlKCdpcHl0aG9uJywgKGNvbmZpZywgbW9kZU9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBweXRob25Db25mID0ge307XG4gICAgZm9yIChjb25zdCBwcm9wIGluIG1vZGVPcHRpb25zKSB7XG4gICAgICAgIGlmIChtb2RlT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgcHl0aG9uQ29uZltwcm9wXSA9IG1vZGVPcHRpb25zW3Byb3BdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB5dGhvbkNvbmYubmFtZSA9ICdweXRob24nO1xuICAgIHB5dGhvbkNvbmYuc2luZ2xlT3BlcmF0b3JzID0gbmV3IFJlZ0V4cCgnXltcXFxcK1xcXFwtXFxcXCovJSZ8QFxcXFxefjw+IVxcXFw/XScpO1xuICAgIHB5dGhvbkNvbmYuaWRlbnRpZmllcnMgPSBuZXcgUmVnRXhwKCdeW19BLVphLXpcXHUwMEExLVxcdUZGRkZdW19BLVphLXowLTlcXHUwMEExLVxcdUZGRkZdKicpO1xuICAgIHJldHVybiBDb2RlTWlycm9yLmdldE1vZGUoY29uZmlnLCBweXRob25Db25mKTtcbn0sICdweXRob24nKTtcbkNvZGVNaXJyb3IuZGVmaW5lTUlNRSgndGV4dC94LWlweXRob24nLCAnaXB5dGhvbicpO1xuQ29kZU1pcnJvci5tb2RlSW5mby5wdXNoKHtcbiAgICBleHQ6IFtdLFxuICAgIG1pbWU6ICd0ZXh0L3gtaXB5dGhvbicsXG4gICAgbW9kZTogJ2lweXRob24nLFxuICAgIG5hbWU6ICdpcHl0aG9uJ1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb2RlbWlycm9yLWlweXRob24uanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IENvZGVNaXJyb3IgZnJvbSAnY29kZW1pcnJvcic7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvYWRkb24vbW9kZS9tdWx0aXBsZXgnO1xuaW1wb3J0ICdjb2RlbWlycm9yL21vZGUvZ2ZtL2dmbSc7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvbW9kZS9zdGV4L3N0ZXgnO1xuLyoqXG4gKiBEZWZpbmUgYW4gSVB5dGhvbiBHRk0gKEdpdEh1YiBGbGF2b3JlZCBNYXJrZG93bikgbW9kZS5cbiAqXG4gKiBJcyBqdXN0IGEgc2xpZ2h0bHkgYWx0ZXJlZCBHRk0gTW9kZSB3aXRoIHN1cHBvcnQgZm9yIExhVGVYLlxuICogTGFUZVggc3VwcG9ydCB3YXMgc3VwcG9ydGVkIGJ5IENvZGVtaXJyb3IgR0ZNIGFzIG9mXG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS9jb2RlbWlycm9yL0NvZGVNaXJyb3IvcHVsbC81NjdcbiAqICBCdXQgd2FzIGxhdGVyIHJlbW92ZWQgaW5cbiAqICAgaHR0cHM6Ly9naXRodWIuY29tL2NvZGVtaXJyb3IvQ29kZU1pcnJvci9jb21taXQvZDljOWYxYjFmZmU5ODRhZWU0MTMwN2YzZTkyN2Y4MGQxZjIzNTkwY1xuICovXG5Db2RlTWlycm9yLmRlZmluZU1vZGUoJ2lweXRob25nZm0nLCAoY29uZmlnLCBtb2RlT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGdmbU1vZGUgPSBDb2RlTWlycm9yLmdldE1vZGUoY29uZmlnLCB7XG4gICAgICAgIG5hbWU6ICdnZm0nLFxuICAgICAgICAvLyBPdmVycmlkZSBsaXN0MyB3aXRoIGFuIHVuZGVyLXVzZWQgdG9rZW4sIHJhdGhlciB0aGFuIGBrZXl3b3JkYFxuICAgICAgICB0b2tlblR5cGVPdmVycmlkZXM6IHsgbGlzdDM6ICdzdHJpbmctMicgfVxuICAgIH0pO1xuICAgIGNvbnN0IHRleE1vZGUgPSBDb2RlTWlycm9yLmdldE1vZGUoY29uZmlnLCB7XG4gICAgICAgIG5hbWU6ICdzdGV4JyxcbiAgICAgICAgaW5NYXRoTW9kZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBDb2RlTWlycm9yLm11bHRpcGxleGluZ01vZGUoZ2ZtTW9kZSwgXG4gICAgLy8gZm9yY2UgcGFyc2luZyBpbmxpbmUgY29kZSBhbmQgY29kZSBibG9ja3Mgd2l0aCBnZm1Nb2RlIHRvIHByZXZlbnRcbiAgICAvLyBwYXJzaW5nIHRoZW0gYXMgdGV4IHNlZTpcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vanVweXRlcmxhYi9qdXB5dGVybGFiL2lzc3Vlcy82Nzc0XG4gICAge1xuICAgICAgICBvcGVuOiAnPGNvZGU+JyxcbiAgICAgICAgY2xvc2U6ICc8L2NvZGU+JyxcbiAgICAgICAgbW9kZTogZ2ZtTW9kZSxcbiAgICAgICAgcGFyc2VEZWxpbWl0ZXJzOiB0cnVlXG4gICAgfSwge1xuICAgICAgICBvcGVuOiAnPHByZT4nLFxuICAgICAgICBjbG9zZTogJzwvcHJlPicsXG4gICAgICAgIG1vZGU6IGdmbU1vZGUsXG4gICAgICAgIHBhcnNlRGVsaW1pdGVyczogdHJ1ZVxuICAgIH0sIHtcbiAgICAgICAgb3BlbjogJ2BgYCcsXG4gICAgICAgIGNsb3NlOiAnYGBgJyxcbiAgICAgICAgbW9kZTogZ2ZtTW9kZSxcbiAgICAgICAgcGFyc2VEZWxpbWl0ZXJzOiB0cnVlXG4gICAgfSwge1xuICAgICAgICBvcGVuOiAnYCcsXG4gICAgICAgIGNsb3NlOiAnYCcsXG4gICAgICAgIG1vZGU6IGdmbU1vZGUsXG4gICAgICAgIHBhcnNlRGVsaW1pdGVyczogdHJ1ZVxuICAgIH0sIFxuICAgIC8vIG9ubHkgaWYgd2UgZGlkIG5vdCBtYXRjaCBhIGNvZGUgZWxlbWVudCBvciBibG9jayxcbiAgICAvLyB0aGVuIHRyeSBkbyBwYXJzZSB1c2luZyB0aGUgdGV4IG1vZGVcbiAgICB7XG4gICAgICAgIG9wZW46ICckJCcsXG4gICAgICAgIGNsb3NlOiAnJCQnLFxuICAgICAgICBtb2RlOiB0ZXhNb2RlLFxuICAgICAgICBkZWxpbVN0eWxlOiAnZGVsaW1pdCdcbiAgICB9LCB7XG4gICAgICAgIC8vIGAkbWF0aCBtb2RlJGAgaXMgb25seSBtYXRjaGVkIGlmIGJvdGggb3BlbmluZ1xuICAgICAgICAvLyBhbmQgY2xvc2luZyAkIGFyZSBpbiB0aGUgc2FtZSBsaW5lXG4gICAgICAgIG9wZW46IC9cXCQoPz0uKlxcJCkvLFxuICAgICAgICBjbG9zZTogJyQnLFxuICAgICAgICBtb2RlOiB0ZXhNb2RlLFxuICAgICAgICBkZWxpbVN0eWxlOiAnZGVsaW1pdCdcbiAgICB9LCB7XG4gICAgICAgIG9wZW46ICdcXFxcKCcsXG4gICAgICAgIGNsb3NlOiAnXFxcXCknLFxuICAgICAgICBtb2RlOiB0ZXhNb2RlLFxuICAgICAgICBkZWxpbVN0eWxlOiAnZGVsaW1pdCdcbiAgICB9LCB7XG4gICAgICAgIG9wZW46ICdcXFxcWycsXG4gICAgICAgIGNsb3NlOiAnXFxcXF0nLFxuICAgICAgICBtb2RlOiB0ZXhNb2RlLFxuICAgICAgICBkZWxpbVN0eWxlOiAnZGVsaW1pdCdcbiAgICB9XG4gICAgLy8gLi4gbW9yZSBtdWx0aXBsZXhlZCBzdHlsZXMgY2FuIGZvbGxvdyBoZXJlXG4gICAgKTtcbn0sICdnZm0nKTtcbkNvZGVNaXJyb3IuZGVmaW5lTUlNRSgndGV4dC94LWlweXRob25nZm0nLCAnaXB5dGhvbmdmbScpO1xuQ29kZU1pcnJvci5tb2RlSW5mby5wdXNoKHtcbiAgICBleHQ6IFtdLFxuICAgIG1pbWU6ICd0ZXh0L3gtaXB5dGhvbmdmbScsXG4gICAgbW9kZTogJ2lweXRob25nZm0nLFxuICAgIG5hbWU6ICdpcHl0aG9uZ2ZtJ1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb2RlbWlycm9yLWlweXRob25nZm0uanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLy8gLyA8cmVmZXJlbmNlIHR5cGVzPVwiY29kZW1pcnJvclwiLz5cbi8vIC8gPHJlZmVyZW5jZSB0eXBlcz1cImNvZGVtaXJyb3Ivc2VhcmNoY3Vyc29yXCIvPlxudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsgc2hvd0RpYWxvZyB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IENvZGVFZGl0b3IgfSBmcm9tICdAanVweXRlcmxhYi9jb2RlZWRpdG9yJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgQXJyYXlFeHQgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG5pbXBvcnQgeyBKU09ORXh0LCBVVUlEIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgRGlzcG9zYWJsZURlbGVnYXRlIH0gZnJvbSAnQGx1bWluby9kaXNwb3NhYmxlJztcbmltcG9ydCB7IFBvbGwgfSBmcm9tICdAbHVtaW5vL3BvbGxpbmcnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuaW1wb3J0IENvZGVNaXJyb3IgZnJvbSAnY29kZW1pcnJvcic7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvYWRkb24vY29tbWVudC9jb21tZW50LmpzJztcbmltcG9ydCAnY29kZW1pcnJvci9hZGRvbi9kaXNwbGF5L3J1bGVycy5qcyc7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvYWRkb24vZWRpdC9jbG9zZWJyYWNrZXRzLmpzJztcbmltcG9ydCAnY29kZW1pcnJvci9hZGRvbi9lZGl0L21hdGNoYnJhY2tldHMuanMnO1xuaW1wb3J0ICdjb2RlbWlycm9yL2FkZG9uL2ZvbGQvYnJhY2UtZm9sZC5qcyc7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvYWRkb24vZm9sZC9jb21tZW50LWZvbGQuanMnO1xuaW1wb3J0ICdjb2RlbWlycm9yL2FkZG9uL2ZvbGQvZm9sZGNvZGUuanMnO1xuaW1wb3J0ICdjb2RlbWlycm9yL2FkZG9uL2ZvbGQvZm9sZGd1dHRlci5qcyc7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvYWRkb24vZm9sZC9pbmRlbnQtZm9sZC5qcyc7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvYWRkb24vZm9sZC9tYXJrZG93bi1mb2xkLmpzJztcbmltcG9ydCAnY29kZW1pcnJvci9hZGRvbi9mb2xkL3htbC1mb2xkLmpzJztcbmltcG9ydCAnY29kZW1pcnJvci9hZGRvbi9tb2RlL3NpbXBsZSc7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvYWRkb24vc2Nyb2xsL3Njcm9sbHBhc3RlbmQuanMnO1xuaW1wb3J0ICdjb2RlbWlycm9yL2FkZG9uL3NlYXJjaC9qdW1wLXRvLWxpbmUnO1xuaW1wb3J0ICdjb2RlbWlycm9yL2FkZG9uL3NlYXJjaC9zZWFyY2gnO1xuaW1wb3J0ICdjb2RlbWlycm9yL2FkZG9uL3NlYXJjaC9zZWFyY2hjdXJzb3InO1xuaW1wb3J0ICdjb2RlbWlycm9yL2FkZG9uL3NlbGVjdGlvbi9hY3RpdmUtbGluZSc7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvYWRkb24vc2VsZWN0aW9uL21hcmstc2VsZWN0aW9uJztcbmltcG9ydCAnY29kZW1pcnJvci9hZGRvbi9zZWxlY3Rpb24vc2VsZWN0aW9uLXBvaW50ZXInO1xuaW1wb3J0ICdjb2RlbWlycm9yL2FkZG9uL2VkaXQvdHJhaWxpbmdzcGFjZS5qcyc7XG5pbXBvcnQgJ2NvZGVtaXJyb3Iva2V5bWFwL2VtYWNzLmpzJztcbmltcG9ydCAnY29kZW1pcnJvci9rZXltYXAvc3VibGltZS5qcyc7XG5pbXBvcnQgeyBDb2RlbWlycm9yQmluZGluZyB9IGZyb20gJ3ktY29kZW1pcnJvcic7XG5pbXBvcnQgeyBNb2RlIH0gZnJvbSAnLi9tb2RlJztcbi8vIGltcG9ydCAnY29kZW1pcnJvci9rZXltYXAvdmltLmpzJzsgIGxhenkgbG9hZGluZyBvZiB2aW0gbW9kZSBpcyBhdmFpbGFibGUgaW4gLi4vY29kZW1pcnJvci1leHRlbnNpb24vaW5kZXgudHNcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gQ29kZU1pcnJvcldpZGdldCBpbnN0YW5jZXMuXG4gKi9cbmNvbnN0IEVESVRPUl9DTEFTUyA9ICdqcC1Db2RlTWlycm9yRWRpdG9yJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gcmVhZCBvbmx5IGNlbGwgZWRpdG9yIHdpZGdldHMuXG4gKi9cbmNvbnN0IFJFQURfT05MWV9DTEFTUyA9ICdqcC1tb2QtcmVhZE9ubHknO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBmb3IgdGhlIGhvdmVyIGJveCBmb3IgY29sbGFib3JhdG9yIGN1cnNvcnMuXG4gKi9cbmNvbnN0IENPTExBQk9SQVRPUl9DVVJTT1JfQ0xBU1MgPSAnanAtQ29sbGFib3JhdG9yQ3Vyc29yJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgZm9yIHRoZSBob3ZlciBib3ggZm9yIGNvbGxhYm9yYXRvciBjdXJzb3JzLlxuICovXG5jb25zdCBDT0xMQUJPUkFUT1JfSE9WRVJfQ0xBU1MgPSAnanAtQ29sbGFib3JhdG9yQ3Vyc29yLWhvdmVyJztcbi8qKlxuICogVGhlIGtleSBjb2RlIGZvciB0aGUgdXAgYXJyb3cga2V5LlxuICovXG5jb25zdCBVUF9BUlJPVyA9IDM4O1xuLyoqXG4gKiBUaGUga2V5IGNvZGUgZm9yIHRoZSBkb3duIGFycm93IGtleS5cbiAqL1xuY29uc3QgRE9XTl9BUlJPVyA9IDQwO1xuLyoqXG4gKiBUaGUgdGltZSB0aGF0IGEgY29sbGFib3JhdG9yIG5hbWUgaG92ZXIgcGVyc2lzdHMuXG4gKi9cbmNvbnN0IEhPVkVSX1RJTUVPVVQgPSAxMDAwO1xuLy8gQHRvZG8gUmVtb3ZlIHRoZSBkdWFsaXR5IG9mIGhhdmluZyBhIG1vZGVsZGIgYW5kIGEgeS1jb2RlbWlycm9yXG4vLyBiaW5kaW5nIGFzIGl0IGp1c3QgaW50cm9kdWNlcyBhIGxvdCBvZiBhZGRpdGlvbmFsIGNvbXBsZXhpdHkgd2l0aG91dCBnYWluaW5nIGFueXRoaW5nLlxuY29uc3QgVVNFX1lDT0RFTUlSUk9SX0JJTkRJTkcgPSB0cnVlO1xuLyoqXG4gKiBDb2RlTWlycm9yIGVkaXRvci5cbiAqL1xuZXhwb3J0IGNsYXNzIENvZGVNaXJyb3JFZGl0b3Ige1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIENvZGVNaXJyb3IgZWRpdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIGVpdGhlciB0aGUgdG9wIG9yIGJvdHRvbSBlZGdlIGlzIHJlcXVlc3RlZC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZWRnZVJlcXVlc3RlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTWFya2VycyA9IHt9O1xuICAgICAgICB0aGlzLl9rZXlkb3duSGFuZGxlcnMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdGhpcy5fY2hhbmdlR3VhcmQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdXVpZCA9ICcnO1xuICAgICAgICB0aGlzLl9uZWVkc1JlZnJlc2ggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9sYXN0Q2hhbmdlID0gbnVsbDtcbiAgICAgICAgY29uc3QgaG9zdCA9ICh0aGlzLmhvc3QgPSBvcHRpb25zLmhvc3QpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSBvcHRpb25zLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMuX3RyYW5zID0gdGhpcy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgaG9zdC5jbGFzc0xpc3QuYWRkKEVESVRPUl9DTEFTUyk7XG4gICAgICAgIGhvc3QuY2xhc3NMaXN0LmFkZCgnanAtRWRpdG9yJyk7XG4gICAgICAgIGhvc3QuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgaG9zdC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcywgdHJ1ZSk7XG4gICAgICAgIGhvc3QuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX3V1aWQgPSBvcHRpb25zLnV1aWQgfHwgVVVJRC51dWlkNCgpO1xuICAgICAgICAvLyBIYW5kbGUgc2VsZWN0aW9uIHN0eWxlLlxuICAgICAgICBjb25zdCBzdHlsZSA9IG9wdGlvbnMuc2VsZWN0aW9uU3R5bGUgfHwge307XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvblN0eWxlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBDb2RlRWRpdG9yLmRlZmF1bHRTZWxlY3Rpb25TdHlsZSksIHN0eWxlKTtcbiAgICAgICAgY29uc3QgbW9kZWwgPSAodGhpcy5fbW9kZWwgPSBvcHRpb25zLm1vZGVsKTtcbiAgICAgICAgY29uc3QgY29uZmlnID0gb3B0aW9ucy5jb25maWcgfHwge307XG4gICAgICAgIGNvbnN0IGZ1bGxDb25maWcgPSAodGhpcy5fY29uZmlnID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBDb2RlTWlycm9yRWRpdG9yLmRlZmF1bHRDb25maWcpLCBjb25maWcpKTtcbiAgICAgICAgY29uc3QgZWRpdG9yID0gKHRoaXMuX2VkaXRvciA9IFByaXZhdGUuY3JlYXRlRWRpdG9yKGhvc3QsIGZ1bGxDb25maWcpKTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZUVkaXRvckJpbmRpbmcoKTtcbiAgICAgICAgLy8gZXZlcnkgdGltZSB0aGUgbW9kZWwgaXMgc3dpdGNoZWQsIHdlIG5lZWQgdG8gcmUtaW5pdGlhbGl6ZSB0aGUgZWRpdG9yIGJpbmRpbmdcbiAgICAgICAgdGhpcy5tb2RlbC5zaGFyZWRNb2RlbFN3aXRjaGVkLmNvbm5lY3QodGhpcy5faW5pdGlhbGl6ZUVkaXRvckJpbmRpbmcsIHRoaXMpO1xuICAgICAgICBjb25zdCBkb2MgPSBlZGl0b3IuZ2V0RG9jKCk7XG4gICAgICAgIC8vIEhhbmRsZSBpbml0aWFsIHZhbHVlcyBmb3IgdGV4dCwgbWltZXR5cGUsIGFuZCBzZWxlY3Rpb25zLlxuICAgICAgICBpZiAoIVVTRV9ZQ09ERU1JUlJPUl9CSU5ESU5HKSB7XG4gICAgICAgICAgICBkb2Muc2V0VmFsdWUobW9kZWwudmFsdWUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb25NaW1lVHlwZUNoYW5nZWQoKTtcbiAgICAgICAgdGhpcy5fb25DdXJzb3JBY3Rpdml0eSgpO1xuICAgICAgICB0aGlzLl9wb2xsID0gbmV3IFBvbGwoe1xuICAgICAgICAgICAgZmFjdG9yeTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrU3luYygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZyZXF1ZW5jeTogeyBpbnRlcnZhbDogMzAwMCwgYmFja29mZjogZmFsc2UgfSxcbiAgICAgICAgICAgIHN0YW5kYnk6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBJZiBjaGFuZ2VkLCBvbmx5IHN0YW5kIGJ5IHdoZW4gaGlkZGVuLCBvdGhlcndpc2UgYWx3YXlzIHN0YW5kIGJ5LlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9sYXN0Q2hhbmdlID8gJ3doZW4taGlkZGVuJyA6IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBDb25uZWN0IHRvIGNoYW5nZXMuXG4gICAgICAgIGlmICghVVNFX1lDT0RFTUlSUk9SX0JJTkRJTkcpIHtcbiAgICAgICAgICAgIG1vZGVsLnZhbHVlLmNoYW5nZWQuY29ubmVjdCh0aGlzLl9vblZhbHVlQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgbW9kZWwubWltZVR5cGVDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25NaW1lVHlwZUNoYW5nZWQsIHRoaXMpO1xuICAgICAgICBtb2RlbC5zZWxlY3Rpb25zLmNoYW5nZWQuY29ubmVjdCh0aGlzLl9vblNlbGVjdGlvbnNDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgQ29kZU1pcnJvci5vbihlZGl0b3IsICdrZXlkb3duJywgKGVkaXRvciwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gQXJyYXlFeHQuZmluZEZpcnN0SW5kZXgodGhpcy5fa2V5ZG93bkhhbmRsZXJzLCBoYW5kbGVyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlcih0aGlzLCBldmVudCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChVU0VfWUNPREVNSVJST1JfQklORElORykge1xuICAgICAgICAgICAgKF9hID0gdGhpcy5feWVkaXRvckJpbmRpbmcpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5vbignY3Vyc29yQWN0aXZpdHknLCAoKSA9PiB0aGlzLl9vbkN1cnNvckFjdGl2aXR5KCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgQ29kZU1pcnJvci5vbihlZGl0b3IsICdjdXJzb3JBY3Rpdml0eScsICgpID0+IHRoaXMuX29uQ3Vyc29yQWN0aXZpdHkoKSk7XG4gICAgICAgICAgICBDb2RlTWlycm9yLm9uKGVkaXRvci5nZXREb2MoKSwgJ2JlZm9yZUNoYW5nZScsIChpbnN0YW5jZSwgY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmVmb3JlRG9jQ2hhbmdlZChpbnN0YW5jZSwgY2hhbmdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIENvZGVNaXJyb3Iub24oZWRpdG9yLmdldERvYygpLCAnY2hhbmdlJywgKGluc3RhbmNlLCBjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIC8vIE1hbnVhbGx5IHJlZnJlc2ggYWZ0ZXIgc2V0VmFsdWUgdG8gbWFrZSBzdXJlIGVkaXRvciBpcyBwcm9wZXJseSBzaXplZC5cbiAgICAgICAgICAgIGlmIChjaGFuZ2Uub3JpZ2luID09PSAnc2V0VmFsdWUnICYmIHRoaXMuaGFzRm9jdXMoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbGFzdENoYW5nZSA9IGNoYW5nZTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFR1cm4gb2ZmIHBhc3RlIGhhbmRsaW5nIGluIGNvZGVtaXJyb3Igc2luY2Ugc29tZXRpbWVzIHdlIHdhbnQgdG9cbiAgICAgICAgLy8gcmVwbGFjZSBpdCB3aXRoIG91ciBvd24uXG4gICAgICAgIGVkaXRvci5vbigncGFzdGUnLCAoaW5zdGFuY2UsIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVQYXN0ZSA9IChfYSA9IHRoaXMuX2NvbmZpZ1snaGFuZGxlUGFzdGUnXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdHJ1ZTtcbiAgICAgICAgICAgIGlmICghaGFuZGxlUGFzdGUpIHtcbiAgICAgICAgICAgICAgICBldmVudC5jb2RlbWlycm9ySWdub3JlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIE1hbnVhbGx5IHJlZnJlc2ggb24gcGFzdGUgdG8gbWFrZSBzdXJlIGVkaXRvciBpcyBwcm9wZXJseSBzaXplZC5cbiAgICAgICAgZWRpdG9yLmdldFdyYXBwZXJFbGVtZW50KCkuYWRkRXZlbnRMaXN0ZW5lcigncGFzdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNGb2N1cygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBlZGl0b3IgYmluZGluZy5cbiAgICAgKi9cbiAgICBfaW5pdGlhbGl6ZUVkaXRvckJpbmRpbmcoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKCFVU0VfWUNPREVNSVJST1JfQklORElORykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIChfYSA9IHRoaXMuX3llZGl0b3JCaW5kaW5nKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGVzdHJveSgpO1xuICAgICAgICBjb25zdCBzaGFyZWRNb2RlbCA9IHRoaXMubW9kZWwuc2hhcmVkTW9kZWw7XG4gICAgICAgIGNvbnN0IG9wdHMgPSBzaGFyZWRNb2RlbC51bmRvTWFuYWdlclxuICAgICAgICAgICAgPyB7IHlVbmRvTWFuYWdlcjogc2hhcmVkTW9kZWwudW5kb01hbmFnZXIgfVxuICAgICAgICAgICAgOiB7fTtcbiAgICAgICAgY29uc3QgYXdhcmVuZXNzID0gc2hhcmVkTW9kZWwuYXdhcmVuZXNzO1xuICAgICAgICB0aGlzLl95ZWRpdG9yQmluZGluZyA9IG5ldyBDb2RlbWlycm9yQmluZGluZyhzaGFyZWRNb2RlbC55c291cmNlLCB0aGlzLmVkaXRvciwgYXdhcmVuZXNzLCBvcHRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHV1aWQgb2YgdGhpcyBlZGl0b3I7XG4gICAgICovXG4gICAgZ2V0IHV1aWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91dWlkO1xuICAgIH1cbiAgICBzZXQgdXVpZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl91dWlkID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzZWxlY3Rpb24gc3R5bGUgb2YgdGhpcyBlZGl0b3IuXG4gICAgICovXG4gICAgZ2V0IHNlbGVjdGlvblN0eWxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uU3R5bGU7XG4gICAgfVxuICAgIHNldCBzZWxlY3Rpb25TdHlsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb25TdHlsZSA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNvZGVtaXJyb3IgZWRpdG9yIHdyYXBwZWQgYnkgdGhlIGVkaXRvci5cbiAgICAgKi9cbiAgICBnZXQgZWRpdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNvZGVtaXJyb3IgZG9jIHdyYXBwZWQgYnkgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBnZXQgZG9jKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yLmdldERvYygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG51bWJlciBvZiBsaW5lcyBpbiB0aGUgZWRpdG9yLlxuICAgICAqL1xuICAgIGdldCBsaW5lQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvYy5saW5lQ291bnQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG1vZGVsIGZvciB0aGlzIGVkaXRvci5cbiAgICAgKi9cbiAgICBnZXQgbW9kZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGhlaWdodCBvZiBhIGxpbmUgaW4gdGhlIGVkaXRvciBpbiBwaXhlbHMuXG4gICAgICovXG4gICAgZ2V0IGxpbmVIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZGl0b3IuZGVmYXVsdFRleHRIZWlnaHQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHdpZGdldCBvZiBhIGNoYXJhY3RlciBpbiB0aGUgZWRpdG9yIGluIHBpeGVscy5cbiAgICAgKi9cbiAgICBnZXQgY2hhcldpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yLmRlZmF1bHRDaGFyV2lkdGgoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGVzdHMgd2hldGhlciB0aGUgZWRpdG9yIGlzIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBpc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEaXNwb3NlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuaG9zdC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMsIHRydWUpO1xuICAgICAgICB0aGlzLmhvc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMsIHRydWUpO1xuICAgICAgICB0aGlzLmhvc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcywgdHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLl95ZWRpdG9yQmluZGluZykge1xuICAgICAgICAgICAgdGhpcy5feWVkaXRvckJpbmRpbmcuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2tleWRvd25IYW5kbGVycy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl9wb2xsLmRpc3Bvc2UoKTtcbiAgICAgICAgU2lnbmFsLmNsZWFyRGF0YSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGEgY29uZmlnIG9wdGlvbiBmb3IgdGhlIGVkaXRvci5cbiAgICAgKi9cbiAgICBnZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWdbb3B0aW9uXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IGEgY29uZmlnIG9wdGlvbiBmb3IgdGhlIGVkaXRvci5cbiAgICAgKi9cbiAgICBzZXRPcHRpb24ob3B0aW9uLCB2YWx1ZSkge1xuICAgICAgICAvLyBEb24ndCBib3RoZXIgc2V0dGluZyB0aGUgb3B0aW9uIGlmIGl0IGlzIGFscmVhZHkgdGhlIHNhbWUuXG4gICAgICAgIGlmICh0aGlzLl9jb25maWdbb3B0aW9uXSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZ1tvcHRpb25dID0gdmFsdWU7XG4gICAgICAgICAgICBQcml2YXRlLnNldE9wdGlvbih0aGlzLmVkaXRvciwgb3B0aW9uLCB2YWx1ZSwgdGhpcy5fY29uZmlnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgY29uZmlnIG9wdGlvbnMgZm9yIHRoZSBlZGl0b3IuXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBwcmVmZXJyZWQgd2hlbiBzZXR0aW5nIHNldmVyYWwgb3B0aW9ucy4gVGhlXG4gICAgICogb3B0aW9ucyBhcmUgc2V0IHdpdGhpbiBhbiBvcGVyYXRpb24sIHdoaWNoIG9ubHkgcGVyZm9ybXNcbiAgICAgKiB0aGUgY29zdGx5IHVwZGF0ZSBhdCB0aGUgZW5kLCBhbmQgbm90IGFmdGVyIGV2ZXJ5IG9wdGlvblxuICAgICAqIGlzIHNldC5cbiAgICAgKi9cbiAgICBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZWRpdG9yID0gdGhpcy5fZWRpdG9yO1xuICAgICAgICBlZGl0b3Iuc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgayA9IGtleTtcbiAgICAgICAgICAgIGVkaXRvci5vcGVyYXRpb24oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKGssIG9wdGlvbnNba10pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWRpdG9yLmVuZE9wZXJhdGlvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjb250ZW50IGZvciB0aGUgZ2l2ZW4gbGluZSBudW1iZXIuXG4gICAgICovXG4gICAgZ2V0TGluZShsaW5lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvYy5nZXRMaW5lKGxpbmUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kIGFuIG9mZnNldCBmb3IgdGhlIGdpdmVuIHBvc2l0aW9uLlxuICAgICAqL1xuICAgIGdldE9mZnNldEF0KHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvYy5pbmRleEZyb21Qb3Moe1xuICAgICAgICAgICAgY2g6IHBvc2l0aW9uLmNvbHVtbixcbiAgICAgICAgICAgIGxpbmU6IHBvc2l0aW9uLmxpbmVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmQgYSBwb3NpdGlvbiBmb3IgdGhlIGdpdmVuIG9mZnNldC5cbiAgICAgKi9cbiAgICBnZXRQb3NpdGlvbkF0KG9mZnNldCkge1xuICAgICAgICBjb25zdCB7IGNoLCBsaW5lIH0gPSB0aGlzLmRvYy5wb3NGcm9tSW5kZXgob2Zmc2V0KTtcbiAgICAgICAgcmV0dXJuIHsgbGluZSwgY29sdW1uOiBjaCB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVbmRvIG9uZSBlZGl0IChpZiBhbnkgdW5kbyBldmVudHMgYXJlIHN0b3JlZCkuXG4gICAgICovXG4gICAgdW5kbygpIHtcbiAgICAgICAgdGhpcy5tb2RlbC5zaGFyZWRNb2RlbC51bmRvKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZG8gb25lIHVuZG9uZSBlZGl0LlxuICAgICAqL1xuICAgIHJlZG8oKSB7XG4gICAgICAgIHRoaXMubW9kZWwuc2hhcmVkTW9kZWwucmVkbygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhciB0aGUgdW5kbyBoaXN0b3J5LlxuICAgICAqL1xuICAgIGNsZWFySGlzdG9yeSgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgKF9iID0gKF9hID0gdGhpcy5feWVkaXRvckJpbmRpbmcpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS55VW5kb01hbmFnZXIpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jbGVhcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCcmluZ3MgYnJvd3NlciBmb2N1cyB0byB0aGlzIGVkaXRvciB0ZXh0LlxuICAgICAqL1xuICAgIGZvY3VzKCkge1xuICAgICAgICB0aGlzLl9lZGl0b3IuZm9jdXMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIHRoZSBlZGl0b3IgaGFzIGtleWJvYXJkIGZvY3VzLlxuICAgICAqL1xuICAgIGhhc0ZvY3VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yLmdldFdyYXBwZXJFbGVtZW50KCkuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEV4cGxpY2l0bHkgYmx1ciB0aGUgZWRpdG9yLlxuICAgICAqL1xuICAgIGJsdXIoKSB7XG4gICAgICAgIHRoaXMuX2VkaXRvci5nZXRJbnB1dEZpZWxkKCkuYmx1cigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXBhaW50IGVkaXRvci5cbiAgICAgKi9cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLl9lZGl0b3IucmVmcmVzaCgpO1xuICAgICAgICB0aGlzLl9uZWVkc1JlZnJlc2ggPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVmcmVzaCB0aGUgZWRpdG9yIGlmIGl0IGlzIGZvY3VzZWQ7XG4gICAgICogb3RoZXJ3aXNlIHBvc3Rwb25lIHJlZnJlc2hpbmcgdGlsbCBmb2N1c2luZy5cbiAgICAgKi9cbiAgICByZXNpemVUb0ZpdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzRm9jdXMoKSkge1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9uZWVkc1JlZnJlc2ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NsZWFySG92ZXIoKTtcbiAgICB9XG4gICAgLy8gdG9kbzogZG9jcywgbWF5YmUgZGVmaW5lIG92ZXJsYXkgb3B0aW9ucyBhcyBhIHR5cGU/XG4gICAgYWRkT3ZlcmxheShtb2RlLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2VkaXRvci5hZGRPdmVybGF5KG1vZGUsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZW1vdmVPdmVybGF5KG1vZGUpIHtcbiAgICAgICAgdGhpcy5fZWRpdG9yLnJlbW92ZU92ZXJsYXkobW9kZSk7XG4gICAgfVxuICAgIGdldFNlYXJjaEN1cnNvcihxdWVyeSwgc3RhcnQsIGNhc2VGb2xkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZGl0b3IuZ2V0RG9jKCkuZ2V0U2VhcmNoQ3Vyc29yKHF1ZXJ5LCBzdGFydCwgY2FzZUZvbGQpO1xuICAgIH1cbiAgICBnZXRDdXJzb3Ioc3RhcnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VkaXRvci5nZXREb2MoKS5nZXRDdXJzb3Ioc3RhcnQpO1xuICAgIH1cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZGl0b3Iuc3RhdGU7XG4gICAgfVxuICAgIG9wZXJhdGlvbihmbikge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yLm9wZXJhdGlvbihmbik7XG4gICAgfVxuICAgIGZpcnN0TGluZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VkaXRvci5nZXREb2MoKS5maXJzdExpbmUoKTtcbiAgICB9XG4gICAgbGFzdExpbmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZGl0b3IuZ2V0RG9jKCkubGFzdExpbmUoKTtcbiAgICB9XG4gICAgc2Nyb2xsSW50b1ZpZXcocG9zLCBtYXJnaW4pIHtcbiAgICAgICAgdGhpcy5fZWRpdG9yLnNjcm9sbEludG9WaWV3KHBvcywgbWFyZ2luKTtcbiAgICB9XG4gICAgc2Nyb2xsSW50b1ZpZXdDZW50ZXJlZChwb3MpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgdG9wID0gdGhpcy5fZWRpdG9yLmNoYXJDb29yZHMocG9zLCAnbG9jYWwnKS50b3A7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuX2VkaXRvci5nZXRXcmFwcGVyRWxlbWVudCgpLm9mZnNldEhlaWdodDtcbiAgICAgICAgKF9iID0gKF9hID0gdGhpcy5ob3N0KS5zY3JvbGxJbnRvVmlldykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EsIHtcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnYXV0bycsXG4gICAgICAgICAgICBibG9jazogJ2NlbnRlcicsXG4gICAgICAgICAgICBpbmxpbmU6ICdjZW50ZXInXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9lZGl0b3Iuc2Nyb2xsVG8obnVsbCwgdG9wIC0gaGVpZ2h0IC8gMik7XG4gICAgfVxuICAgIGN1cnNvckNvb3Jkcyh3aGVyZSwgbW9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yLmN1cnNvckNvb3Jkcyh3aGVyZSwgbW9kZSk7XG4gICAgfVxuICAgIGdldFJhbmdlKGZyb20sIHRvLCBzZXBhcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VkaXRvci5nZXREb2MoKS5nZXRSYW5nZShmcm9tLCB0bywgc2VwYXJhdG9yKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEga2V5ZG93biBoYW5kbGVyIHRvIHRoZSBlZGl0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaGFuZGxlciAtIEEga2V5ZG93biBoYW5kbGVyLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBkaXNwb3NhYmxlIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVtb3ZlIHRoZSBoYW5kbGVyLlxuICAgICAqL1xuICAgIGFkZEtleWRvd25IYW5kbGVyKGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5fa2V5ZG93bkhhbmRsZXJzLnB1c2goaGFuZGxlcik7XG4gICAgICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZURlbGVnYXRlKCgpID0+IHtcbiAgICAgICAgICAgIEFycmF5RXh0LnJlbW92ZUFsbFdoZXJlKHRoaXMuX2tleWRvd25IYW5kbGVycywgdmFsID0+IHZhbCA9PT0gaGFuZGxlcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHNpemUgb2YgdGhlIGVkaXRvciBpbiBwaXhlbHMuXG4gICAgICovXG4gICAgc2V0U2l6ZShkaW1lbnNpb24pIHtcbiAgICAgICAgaWYgKGRpbWVuc2lvbikge1xuICAgICAgICAgICAgdGhpcy5fZWRpdG9yLnNldFNpemUoZGltZW5zaW9uLndpZHRoLCBkaW1lbnNpb24uaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRvci5zZXRTaXplKG51bGwsIG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX25lZWRzUmVmcmVzaCA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXZlYWwgdGhlIGdpdmVuIHBvc2l0aW9uIGluIHRoZSBlZGl0b3IuXG4gICAgICovXG4gICAgcmV2ZWFsUG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgY29uc3QgY21Qb3NpdGlvbiA9IHRoaXMuX3RvQ29kZU1pcnJvclBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5fZWRpdG9yLnNjcm9sbEludG9WaWV3KGNtUG9zaXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXZlYWwgdGhlIGdpdmVuIHNlbGVjdGlvbiBpbiB0aGUgZWRpdG9yLlxuICAgICAqL1xuICAgIHJldmVhbFNlbGVjdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSB7XG4gICAgICAgICAgICBmcm9tOiB0aGlzLl90b0NvZGVNaXJyb3JQb3NpdGlvbihzZWxlY3Rpb24uc3RhcnQpLFxuICAgICAgICAgICAgdG86IHRoaXMuX3RvQ29kZU1pcnJvclBvc2l0aW9uKHNlbGVjdGlvbi5lbmQpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2VkaXRvci5zY3JvbGxJbnRvVmlldyhyYW5nZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgd2luZG93IGNvb3JkaW5hdGVzIGdpdmVuIGEgY3Vyc29yIHBvc2l0aW9uLlxuICAgICAqL1xuICAgIGdldENvb3JkaW5hdGVGb3JQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICBjb25zdCBwb3MgPSB0aGlzLl90b0NvZGVNaXJyb3JQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVkaXRvci5jaGFyQ29vcmRzKHBvcywgJ3BhZ2UnKTtcbiAgICAgICAgcmV0dXJuIHJlY3Q7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3Vyc29yIHBvc2l0aW9uIGdpdmVuIHdpbmRvdyBjb29yZGluYXRlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb29yZGluYXRlIC0gVGhlIGRlc2lyZWQgY29vcmRpbmF0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBwb3NpdGlvbiBvZiB0aGUgY29vcmRpbmF0ZXMsIG9yIG51bGwgaWYgbm90XG4gICAgICogICBjb250YWluZWQgaW4gdGhlIGVkaXRvci5cbiAgICAgKi9cbiAgICBnZXRQb3NpdGlvbkZvckNvb3JkaW5hdGUoY29vcmRpbmF0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG9Qb3NpdGlvbih0aGlzLmVkaXRvci5jb29yZHNDaGFyKGNvb3JkaW5hdGUpKSB8fCBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBwcmltYXJ5IHBvc2l0aW9uIG9mIHRoZSBjdXJzb3IsIG5ldmVyIGBudWxsYC5cbiAgICAgKi9cbiAgICBnZXRDdXJzb3JQb3NpdGlvbigpIHtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gdGhpcy5kb2MuZ2V0Q3Vyc29yKCk7XG4gICAgICAgIHJldHVybiB0aGlzLl90b1Bvc2l0aW9uKGN1cnNvcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgcHJpbWFyeSBwb3NpdGlvbiBvZiB0aGUgY3Vyc29yLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgd2lsbCByZW1vdmUgYW55IHNlY29uZGFyeSBjdXJzb3JzLlxuICAgICAqL1xuICAgIHNldEN1cnNvclBvc2l0aW9uKHBvc2l0aW9uLCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHRoaXMuX3RvQ29kZU1pcnJvclBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5kb2Muc2V0Q3Vyc29yKGN1cnNvciwgdW5kZWZpbmVkLCBvcHRpb25zKTtcbiAgICAgICAgLy8gSWYgdGhlIGVkaXRvciBkb2VzIG5vdCBoYXZlIGZvY3VzLCB0aGlzIGN1cnNvciBjaGFuZ2VcbiAgICAgICAgLy8gd2lsbCBnZXQgc2NyZWVuZWQgb3V0IGluIF9vbkN1cnNvcnNDaGFuZ2VkKCkuIE1ha2UgYW5cbiAgICAgICAgLy8gZXhjZXB0aW9uIGZvciB0aGlzIG1ldGhvZC5cbiAgICAgICAgaWYgKCF0aGlzLmVkaXRvci5oYXNGb2N1cygpKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNlbGVjdGlvbnMuc2V0KHRoaXMudXVpZCwgdGhpcy5nZXRTZWxlY3Rpb25zKCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHByaW1hcnkgc2VsZWN0aW9uLCBuZXZlciBgbnVsbGAuXG4gICAgICovXG4gICAgZ2V0U2VsZWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTZWxlY3Rpb25zKClbMF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgcHJpbWFyeSBzZWxlY3Rpb24uIFRoaXMgd2lsbCByZW1vdmUgYW55IHNlY29uZGFyeSBjdXJzb3JzLlxuICAgICAqL1xuICAgIHNldFNlbGVjdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25zKFtzZWxlY3Rpb25dKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2VsZWN0aW9ucyBmb3IgYWxsIHRoZSBjdXJzb3JzLCBuZXZlciBgbnVsbGAgb3IgZW1wdHkuXG4gICAgICovXG4gICAgZ2V0U2VsZWN0aW9ucygpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9ucyA9IHRoaXMuZG9jLmxpc3RTZWxlY3Rpb25zKCk7XG4gICAgICAgIGlmIChzZWxlY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3Rpb25zLm1hcChzZWxlY3Rpb24gPT4gdGhpcy5fdG9TZWxlY3Rpb24oc2VsZWN0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3Vyc29yID0gdGhpcy5kb2MuZ2V0Q3Vyc29yKCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuX3RvU2VsZWN0aW9uKHsgYW5jaG9yOiBjdXJzb3IsIGhlYWQ6IGN1cnNvciB9KTtcbiAgICAgICAgcmV0dXJuIFtzZWxlY3Rpb25dO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzZWxlY3Rpb25zIGZvciBhbGwgdGhlIGN1cnNvcnMsIHNob3VsZCBub3QgYmUgZW1wdHkuXG4gICAgICogQ3Vyc29ycyB3aWxsIGJlIHJlbW92ZWQgb3IgYWRkZWQsIGFzIG5lY2Vzc2FyeS5cbiAgICAgKiBQYXNzaW5nIGFuIGVtcHR5IGFycmF5IHJlc2V0cyBhIGN1cnNvciBwb3NpdGlvbiB0byB0aGUgc3RhcnQgb2YgYSBkb2N1bWVudC5cbiAgICAgKi9cbiAgICBzZXRTZWxlY3Rpb25zKHNlbGVjdGlvbnMpIHtcbiAgICAgICAgY29uc3QgY21TZWxlY3Rpb25zID0gdGhpcy5fdG9Db2RlTWlycm9yU2VsZWN0aW9ucyhzZWxlY3Rpb25zKTtcbiAgICAgICAgdGhpcy5kb2Muc2V0U2VsZWN0aW9ucyhjbVNlbGVjdGlvbnMsIDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlcyB0aGUgY3VycmVudCBzZWxlY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gdGV4dC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0IFRoZSB0ZXh0IHRvIGJlIGluc2VydGVkLlxuICAgICAqL1xuICAgIHJlcGxhY2VTZWxlY3Rpb24odGV4dCkge1xuICAgICAgICB0aGlzLmRvYy5yZXBsYWNlU2VsZWN0aW9uKHRleHQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYSBsaXN0IG9mIHRva2VucyBmb3IgdGhlIGN1cnJlbnQgZWRpdG9yIHRleHQgY29udGVudC5cbiAgICAgKi9cbiAgICBnZXRUb2tlbnMoKSB7XG4gICAgICAgIGxldCB0b2tlbnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpbmVDb3VudDsgKytpKSB7XG4gICAgICAgICAgICBjb25zdCBsaW5lVG9rZW5zID0gdGhpcy5lZGl0b3IuZ2V0TGluZVRva2VucyhpKS5tYXAodCA9PiAoe1xuICAgICAgICAgICAgICAgIG9mZnNldDogdGhpcy5nZXRPZmZzZXRBdCh7IGNvbHVtbjogdC5zdGFydCwgbGluZTogaSB9KSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdC5zdHJpbmcsXG4gICAgICAgICAgICAgICAgdHlwZTogdC50eXBlIHx8ICcnXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0b2tlbnMgPSB0b2tlbnMuY29uY2F0KGxpbmVUb2tlbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2tlbnM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdG9rZW4gYXQgYSBnaXZlbiBlZGl0b3IgcG9zaXRpb24uXG4gICAgICovXG4gICAgZ2V0VG9rZW5Gb3JQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHRoaXMuX3RvQ29kZU1pcnJvclBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLmVkaXRvci5nZXRUb2tlbkF0KGN1cnNvcik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvZmZzZXQ6IHRoaXMuZ2V0T2Zmc2V0QXQoeyBjb2x1bW46IHRva2VuLnN0YXJ0LCBsaW5lOiBjdXJzb3IubGluZSB9KSxcbiAgICAgICAgICAgIHZhbHVlOiB0b2tlbi5zdHJpbmcsXG4gICAgICAgICAgICB0eXBlOiAoX2EgPSB0b2tlbi50eXBlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB1bmRlZmluZWRcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0IGEgbmV3IGluZGVudGVkIGxpbmUgYXQgdGhlIGN1cnJlbnQgY3Vyc29yIHBvc2l0aW9uLlxuICAgICAqL1xuICAgIG5ld0luZGVudGVkTGluZSgpIHtcbiAgICAgICAgdGhpcy5leGVjQ29tbWFuZCgnbmV3bGluZUFuZEluZGVudCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGEgY29kZW1pcnJvciBjb21tYW5kIG9uIHRoZSBlZGl0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29tbWFuZCAtIFRoZSBuYW1lIG9mIHRoZSBjb21tYW5kIHRvIGV4ZWN1dGUuXG4gICAgICovXG4gICAgZXhlY0NvbW1hbmQoY29tbWFuZCkge1xuICAgICAgICB0aGlzLl9lZGl0b3IuZXhlY0NvbW1hbmQoY29tbWFuZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBrZXlkb3duIGV2ZW50cyBmcm9tIHRoZSBlZGl0b3IuXG4gICAgICovXG4gICAgb25LZXlkb3duKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICBjb25zdCB7IGxpbmUsIGNvbHVtbiB9ID0gcG9zaXRpb247XG4gICAgICAgIGlmIChsaW5lID09PSAwICYmIGNvbHVtbiA9PT0gMCAmJiBldmVudC5rZXlDb2RlID09PSBVUF9BUlJPVykge1xuICAgICAgICAgICAgaWYgKCFldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWRnZVJlcXVlc3RlZC5lbWl0KCd0b3AnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGluZSA9PT0gMCAmJiBldmVudC5rZXlDb2RlID09PSBVUF9BUlJPVykge1xuICAgICAgICAgICAgaWYgKCFldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWRnZVJlcXVlc3RlZC5lbWl0KCd0b3BMaW5lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGFzdExpbmUgPSB0aGlzLmxpbmVDb3VudCAtIDE7XG4gICAgICAgIGNvbnN0IGxhc3RDaCA9IHRoaXMuZ2V0TGluZShsYXN0TGluZSkubGVuZ3RoO1xuICAgICAgICBpZiAobGluZSA9PT0gbGFzdExpbmUgJiZcbiAgICAgICAgICAgIGNvbHVtbiA9PT0gbGFzdENoICYmXG4gICAgICAgICAgICBldmVudC5rZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICAgICAgICBpZiAoIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGdlUmVxdWVzdGVkLmVtaXQoJ2JvdHRvbScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29udmVydHMgc2VsZWN0aW9ucyB0byBjb2RlIG1pcnJvciBzZWxlY3Rpb25zLlxuICAgICAqL1xuICAgIF90b0NvZGVNaXJyb3JTZWxlY3Rpb25zKHNlbGVjdGlvbnMpIHtcbiAgICAgICAgaWYgKHNlbGVjdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGlvbnMubWFwKHNlbGVjdGlvbiA9PiB0aGlzLl90b0NvZGVNaXJyb3JTZWxlY3Rpb24oc2VsZWN0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB7IGxpbmU6IDAsIGNoOiAwIH07XG4gICAgICAgIHJldHVybiBbeyBhbmNob3I6IHBvc2l0aW9uLCBoZWFkOiBwb3NpdGlvbiB9XTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBhIG1pbWUgdHlwZSBjaGFuZ2UuXG4gICAgICovXG4gICAgX29uTWltZVR5cGVDaGFuZ2VkKCkge1xuICAgICAgICBjb25zdCBtaW1lID0gdGhpcy5fbW9kZWwubWltZVR5cGU7XG4gICAgICAgIGNvbnN0IGVkaXRvciA9IHRoaXMuX2VkaXRvcjtcbiAgICAgICAgY29uc3QgZXh0cmFLZXlzID0gKGVkaXRvci5nZXRPcHRpb24oJ2V4dHJhS2V5cycpIHx8XG4gICAgICAgICAgICB7fSk7XG4gICAgICAgIGNvbnN0IGlzQ29kZSA9IG1pbWUgIT09ICd0ZXh0L3BsYWluJyAmJiBtaW1lICE9PSAndGV4dC94LWlweXRob25nZm0nO1xuICAgICAgICBpZiAoaXNDb2RlKSB7XG4gICAgICAgICAgICBleHRyYUtleXNbJ0JhY2tzcGFjZSddID0gJ2RlbFNwYWNlVG9QcmV2VGFiU3RvcCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgZXh0cmFLZXlzWydCYWNrc3BhY2UnXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldE9wdGlvbignZXh0cmFLZXlzJywgZXh0cmFLZXlzKTtcbiAgICAgICAgLy8gVE9ETzogc2hvdWxkIHdlIHByb3ZpZGUgYSBob29rIGZvciB3aGVuIHRoZSBtb2RlIGlzIGRvbmUgYmVpbmcgc2V0P1xuICAgICAgICB2b2lkIE1vZGUuZW5zdXJlKG1pbWUpLnRoZW4oc3BlYyA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbignbW9kZScsIChfYSA9IHNwZWMgPT09IG51bGwgfHwgc3BlYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3BlYy5taW1lKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnbnVsbCcpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBhIHNlbGVjdGlvbnMgY2hhbmdlLlxuICAgICAqL1xuICAgIF9vblNlbGVjdGlvbnNDaGFuZ2VkKHNlbGVjdGlvbnMsIGFyZ3MpIHtcbiAgICAgICAgY29uc3QgdXVpZCA9IGFyZ3Mua2V5O1xuICAgICAgICBpZiAodXVpZCAhPT0gdGhpcy51dWlkKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGVhblNlbGVjdGlvbnModXVpZCk7XG4gICAgICAgICAgICBpZiAoYXJncy50eXBlICE9PSAncmVtb3ZlJyAmJiBhcmdzLm5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya1NlbGVjdGlvbnModXVpZCwgYXJncy5uZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYW4gc2VsZWN0aW9ucyBmb3IgdGhlIGdpdmVuIHV1aWQuXG4gICAgICovXG4gICAgX2NsZWFuU2VsZWN0aW9ucyh1dWlkKSB7XG4gICAgICAgIGNvbnN0IG1hcmtlcnMgPSB0aGlzLnNlbGVjdGlvbk1hcmtlcnNbdXVpZF07XG4gICAgICAgIGlmIChtYXJrZXJzKSB7XG4gICAgICAgICAgICBtYXJrZXJzLmZvckVhY2gobWFya2VyID0+IHtcbiAgICAgICAgICAgICAgICBtYXJrZXIuY2xlYXIoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB0aGlzLnNlbGVjdGlvbk1hcmtlcnNbdXVpZF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hcmtzIHNlbGVjdGlvbnMuXG4gICAgICovXG4gICAgX21hcmtTZWxlY3Rpb25zKHV1aWQsIHNlbGVjdGlvbnMpIHtcbiAgICAgICAgY29uc3QgbWFya2VycyA9IFtdO1xuICAgICAgICAvLyBJZiB3ZSBhcmUgbWFya2luZyBzZWxlY3Rpb25zIGNvcnJlc3BvbmRpbmcgdG8gYW4gYWN0aXZlIGhvdmVyLFxuICAgICAgICAvLyByZW1vdmUgaXQuXG4gICAgICAgIGlmICh1dWlkID09PSB0aGlzLl9ob3ZlcklkKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGVhckhvdmVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgY2FuIGlkIHRoZSBzZWxlY3Rpb24gdG8gYSBzcGVjaWZpYyBjb2xsYWJvcmF0b3IsXG4gICAgICAgIC8vIHVzZSB0aGF0IGluZm9ybWF0aW9uLlxuICAgICAgICBsZXQgY29sbGFib3JhdG9yO1xuICAgICAgICBpZiAodGhpcy5fbW9kZWwubW9kZWxEQi5jb2xsYWJvcmF0b3JzKSB7XG4gICAgICAgICAgICBjb2xsYWJvcmF0b3IgPSB0aGlzLl9tb2RlbC5tb2RlbERCLmNvbGxhYm9yYXRvcnMuZ2V0KHV1aWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFN0eWxlIGVhY2ggc2VsZWN0aW9uIGZvciB0aGUgdXVpZC5cbiAgICAgICAgc2VsZWN0aW9ucy5mb3JFYWNoKHNlbGVjdGlvbiA9PiB7XG4gICAgICAgICAgICAvLyBPbmx5IHJlbmRlciBzZWxlY3Rpb25zIGlmIHRoZSBzdGFydCBpcyBub3QgZXF1YWwgdG8gdGhlIGVuZC5cbiAgICAgICAgICAgIC8vIEluIHRoYXQgY2FzZSwgd2UgZG9uJ3QgbmVlZCB0byByZW5kZXIgdGhlIGN1cnNvci5cbiAgICAgICAgICAgIGlmICghSlNPTkV4dC5kZWVwRXF1YWwoc2VsZWN0aW9uLnN0YXJ0LCBzZWxlY3Rpb24uZW5kKSkge1xuICAgICAgICAgICAgICAgIC8vIFNlbGVjdGlvbnMgb25seSBhcHBlYXIgdG8gcmVuZGVyIGNvcnJlY3RseSBpZiB0aGUgYW5jaG9yXG4gICAgICAgICAgICAgICAgLy8gaXMgYmVmb3JlIHRoZSBoZWFkIGluIHRoZSBkb2N1bWVudC4gVGhhdCBpcywgcmV2ZXJzZSBzZWxlY3Rpb25zXG4gICAgICAgICAgICAgICAgLy8gZG8gbm90IGFwcGVhciBhcyBpbnRlbmRlZC5cbiAgICAgICAgICAgICAgICBjb25zdCBmb3J3YXJkID0gc2VsZWN0aW9uLnN0YXJ0LmxpbmUgPCBzZWxlY3Rpb24uZW5kLmxpbmUgfHxcbiAgICAgICAgICAgICAgICAgICAgKHNlbGVjdGlvbi5zdGFydC5saW5lID09PSBzZWxlY3Rpb24uZW5kLmxpbmUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5zdGFydC5jb2x1bW4gPD0gc2VsZWN0aW9uLmVuZC5jb2x1bW4pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IHRoaXMuX3RvQ29kZU1pcnJvclBvc2l0aW9uKGZvcndhcmQgPyBzZWxlY3Rpb24uc3RhcnQgOiBzZWxlY3Rpb24uZW5kKTtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkID0gdGhpcy5fdG9Db2RlTWlycm9yUG9zaXRpb24oZm9yd2FyZCA/IHNlbGVjdGlvbi5lbmQgOiBzZWxlY3Rpb24uc3RhcnQpO1xuICAgICAgICAgICAgICAgIGxldCBtYXJrZXJPcHRpb25zO1xuICAgICAgICAgICAgICAgIGlmIChjb2xsYWJvcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyT3B0aW9ucyA9IHRoaXMuX3RvVGV4dE1hcmtlck9wdGlvbnMoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBzZWxlY3Rpb24uc3R5bGUpLCB7IGNvbG9yOiBjb2xsYWJvcmF0b3IuY29sb3IgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyT3B0aW9ucyA9IHRoaXMuX3RvVGV4dE1hcmtlck9wdGlvbnMoc2VsZWN0aW9uLnN0eWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbWFya2Vycy5wdXNoKHRoaXMuZG9jLm1hcmtUZXh0KGFuY2hvciwgaGVhZCwgbWFya2VyT3B0aW9ucykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29sbGFib3JhdG9yKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FyZXQgPSB0aGlzLl9nZXRDYXJldChjb2xsYWJvcmF0b3IpO1xuICAgICAgICAgICAgICAgIG1hcmtlcnMucHVzaCh0aGlzLmRvYy5zZXRCb29rbWFyayh0aGlzLl90b0NvZGVNaXJyb3JQb3NpdGlvbihzZWxlY3Rpb24uZW5kKSwge1xuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IGNhcmV0XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25NYXJrZXJzW3V1aWRdID0gbWFya2VycztcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBhIGN1cnNvciBhY3Rpdml0eSBldmVudC5cbiAgICAgKi9cbiAgICBfb25DdXJzb3JBY3Rpdml0eSgpIHtcbiAgICAgICAgLy8gT25seSBhZGQgc2VsZWN0aW9ucyBpZiB0aGUgZWRpdG9yIGhhcyBmb2N1cy4gVGhpcyBhdm9pZHMgdW53YW50ZWRcbiAgICAgICAgLy8gdHJpZ2dlcmluZyBvZiBjdXJzb3IgYWN0aXZpdHkgZHVlIHRvIGNvbGxhYm9yYXRvciBhY3Rpb25zLlxuICAgICAgICBpZiAodGhpcy5fZWRpdG9yLmhhc0ZvY3VzKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbnMgPSB0aGlzLmdldFNlbGVjdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMubW9kZWwuc2VsZWN0aW9ucy5zZXQodGhpcy51dWlkLCBzZWxlY3Rpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIGNvZGUgbWlycm9yIHNlbGVjdGlvbiB0byBhbiBlZGl0b3Igc2VsZWN0aW9uLlxuICAgICAqL1xuICAgIF90b1NlbGVjdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHV1aWQ6IHRoaXMudXVpZCxcbiAgICAgICAgICAgIHN0YXJ0OiB0aGlzLl90b1Bvc2l0aW9uKHNlbGVjdGlvbi5hbmNob3IpLFxuICAgICAgICAgICAgZW5kOiB0aGlzLl90b1Bvc2l0aW9uKHNlbGVjdGlvbi5oZWFkKSxcbiAgICAgICAgICAgIHN0eWxlOiB0aGlzLnNlbGVjdGlvblN0eWxlXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoZSBzZWxlY3Rpb24gc3R5bGUgdG8gYSB0ZXh0IG1hcmtlciBvcHRpb25zLlxuICAgICAqL1xuICAgIF90b1RleHRNYXJrZXJPcHRpb25zKHN0eWxlKSB7XG4gICAgICAgIGNvbnN0IHIgPSBwYXJzZUludChzdHlsZS5jb2xvci5zbGljZSgxLCAzKSwgMTYpO1xuICAgICAgICBjb25zdCBnID0gcGFyc2VJbnQoc3R5bGUuY29sb3Iuc2xpY2UoMywgNSksIDE2KTtcbiAgICAgICAgY29uc3QgYiA9IHBhcnNlSW50KHN0eWxlLmNvbG9yLnNsaWNlKDUsIDcpLCAxNik7XG4gICAgICAgIGNvbnN0IGNzcyA9IGBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKCAke3J9LCAke2d9LCAke2J9LCAwLjE1KWA7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IHN0eWxlLmNsYXNzTmFtZSxcbiAgICAgICAgICAgIHRpdGxlOiBzdHlsZS5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgIGNzc1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhbiBlZGl0b3Igc2VsZWN0aW9uIHRvIGEgY29kZSBtaXJyb3Igc2VsZWN0aW9uLlxuICAgICAqL1xuICAgIF90b0NvZGVNaXJyb3JTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmNob3I6IHRoaXMuX3RvQ29kZU1pcnJvclBvc2l0aW9uKHNlbGVjdGlvbi5zdGFydCksXG4gICAgICAgICAgICBoZWFkOiB0aGlzLl90b0NvZGVNaXJyb3JQb3NpdGlvbihzZWxlY3Rpb24uZW5kKVxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgY29kZSBtaXJyb3IgcG9zaXRpb24gdG8gYW4gZWRpdG9yIHBvc2l0aW9uLlxuICAgICAqL1xuICAgIF90b1Bvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsaW5lOiBwb3NpdGlvbi5saW5lLFxuICAgICAgICAgICAgY29sdW1uOiBwb3NpdGlvbi5jaFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGFuIGVkaXRvciBwb3NpdGlvbiB0byBhIGNvZGUgbWlycm9yIHBvc2l0aW9uLlxuICAgICAqL1xuICAgIF90b0NvZGVNaXJyb3JQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGluZTogcG9zaXRpb24ubGluZSxcbiAgICAgICAgICAgIGNoOiBwb3NpdGlvbi5jb2x1bW5cbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIG1vZGVsIHZhbHVlIGNoYW5nZXMuXG4gICAgICovXG4gICAgX29uVmFsdWVDaGFuZ2VkKHZhbHVlLCBhcmdzKSB7XG4gICAgICAgIGlmICh0aGlzLl9jaGFuZ2VHdWFyZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoYW5nZUd1YXJkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgZG9jID0gdGhpcy5kb2M7XG4gICAgICAgIHN3aXRjaCAoYXJncy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdpbnNlcnQnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zID0gZG9jLnBvc0Zyb21JbmRleChhcmdzLnN0YXJ0KTtcbiAgICAgICAgICAgICAgICAvLyBSZXBsYWNlIHRoZSByYW5nZSwgaW5jbHVkaW5nIGEgJytpbnB1dCcgb3JpZ2luLFxuICAgICAgICAgICAgICAgIC8vIHdoaWNoIGluZGljYXRlcyB0aGF0IENvZGVNaXJyb3IgbWF5IG1lcmdlIGNoYW5nZXNcbiAgICAgICAgICAgICAgICAvLyBmb3IgdW5kby9yZWRvIHB1cnBvc2VzLlxuICAgICAgICAgICAgICAgIGRvYy5yZXBsYWNlUmFuZ2UoYXJncy52YWx1ZSwgcG9zLCBwb3MsICcraW5wdXQnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmcm9tID0gZG9jLnBvc0Zyb21JbmRleChhcmdzLnN0YXJ0KTtcbiAgICAgICAgICAgICAgICBjb25zdCB0byA9IGRvYy5wb3NGcm9tSW5kZXgoYXJncy5lbmQpO1xuICAgICAgICAgICAgICAgIC8vIFJlcGxhY2UgdGhlIHJhbmdlLCBpbmNsdWRpbmcgYSAnK2lucHV0JyBvcmlnaW4sXG4gICAgICAgICAgICAgICAgLy8gd2hpY2ggaW5kaWNhdGVzIHRoYXQgQ29kZU1pcnJvciBtYXkgbWVyZ2UgY2hhbmdlc1xuICAgICAgICAgICAgICAgIC8vIGZvciB1bmRvL3JlZG8gcHVycG9zZXMuXG4gICAgICAgICAgICAgICAgZG9jLnJlcGxhY2VSYW5nZSgnJywgZnJvbSwgdG8sICcraW5wdXQnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ3NldCc6XG4gICAgICAgICAgICAgICAgZG9jLnNldFZhbHVlKGFyZ3MudmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jaGFuZ2VHdWFyZCA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGRvY3VtZW50IGNoYW5nZXMuXG4gICAgICovXG4gICAgX2JlZm9yZURvY0NoYW5nZWQoZG9jLCBjaGFuZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NoYW5nZUd1YXJkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2hhbmdlR3VhcmQgPSB0cnVlO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX21vZGVsLnZhbHVlO1xuICAgICAgICBjb25zdCBzdGFydCA9IGRvYy5pbmRleEZyb21Qb3MoY2hhbmdlLmZyb20pO1xuICAgICAgICBjb25zdCBlbmQgPSBkb2MuaW5kZXhGcm9tUG9zKGNoYW5nZS50byk7XG4gICAgICAgIGNvbnN0IGluc2VydGVkID0gY2hhbmdlLnRleHQuam9pbignXFxuJyk7XG4gICAgICAgIGlmIChlbmQgIT09IHN0YXJ0KSB7XG4gICAgICAgICAgICB2YWx1ZS5yZW1vdmUoc3RhcnQsIGVuZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluc2VydGVkKSB7XG4gICAgICAgICAgICB2YWx1ZS5pbnNlcnQoc3RhcnQsIGluc2VydGVkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jaGFuZ2VHdWFyZCA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIERPTSBldmVudHMgZm9yIHRoZSBlZGl0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnQgLSBUaGUgRE9NIGV2ZW50IHNlbnQgdG8gdGhlIGVkaXRvci5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIG1ldGhvZCBpbXBsZW1lbnRzIHRoZSBET00gYEV2ZW50TGlzdGVuZXJgIGludGVyZmFjZSBhbmQgaXNcbiAgICAgKiBjYWxsZWQgaW4gcmVzcG9uc2UgdG8gZXZlbnRzIG9uIHRoZSBlZGl0b3IncyBET00gbm9kZS4gSXQgc2hvdWxkXG4gICAgICogbm90IGJlIGNhbGxlZCBkaXJlY3RseSBieSB1c2VyIGNvZGUuXG4gICAgICovXG4gICAgaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdmb2N1cyc6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0Rm9jdXMoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYmx1cic6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0Qmx1cihldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzY3JvbGwnOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dFNjcm9sbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYGZvY3VzYCBldmVudHMgZm9yIHRoZSBlZGl0b3IuXG4gICAgICovXG4gICAgX2V2dEZvY3VzKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLl9uZWVkc1JlZnJlc2gpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaG9zdC5jbGFzc0xpc3QuYWRkKCdqcC1tb2QtZm9jdXNlZCcpO1xuICAgICAgICAvLyBVcGRhdGUgdGhlIHNlbGVjdGlvbnMgb24gZWRpdG9yIGdhaW5pbmcgZm9jdXMgYmVjYXVzZVxuICAgICAgICAvLyB0aGUgb25DdXJzb3JBY3Rpdml0eSBmdW5jdGlvbiBmaWx0ZXJzIHVzdWFsIGN1cnNvciBldmVudHNcbiAgICAgICAgLy8gYmFzZWQgb24gdGhlIGVkaXRvcidzIGZvY3VzLlxuICAgICAgICB0aGlzLl9vbkN1cnNvckFjdGl2aXR5KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgYmx1cmAgZXZlbnRzIGZvciB0aGUgZWRpdG9yLlxuICAgICAqL1xuICAgIF9ldnRCbHVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaG9zdC5jbGFzc0xpc3QucmVtb3ZlKCdqcC1tb2QtZm9jdXNlZCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYHNjcm9sbGAgZXZlbnRzIGZvciB0aGUgZWRpdG9yLlxuICAgICAqL1xuICAgIF9ldnRTY3JvbGwoKSB7XG4gICAgICAgIC8vIFJlbW92ZSBhbnkgYWN0aXZlIGhvdmVyLlxuICAgICAgICB0aGlzLl9jbGVhckhvdmVyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFyIHRoZSBob3ZlciBmb3IgYSBjYXJldCwgZHVlIHRvIHRoaW5ncyBsaWtlXG4gICAgICogc2Nyb2xsaW5nLCByZXNpemluZywgZGVhY3RpdmF0aW9uLCBldGMsIHdoZXJlXG4gICAgICogdGhlIHBvc2l0aW9uIGlzIG5vIGxvbmdlciB2YWxpZC5cbiAgICAgKi9cbiAgICBfY2xlYXJIb3ZlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhcmV0SG92ZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5faG92ZXJUaW1lb3V0KTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5fY2FyZXRIb3Zlcik7XG4gICAgICAgICAgICB0aGlzLl9jYXJldEhvdmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBjYXJldCBlbGVtZW50IHJlcHJlc2VudGluZyB0aGUgcG9zaXRpb25cbiAgICAgKiBvZiBhIGNvbGxhYm9yYXRvcidzIGN1cnNvci5cbiAgICAgKi9cbiAgICBfZ2V0Q2FyZXQoY29sbGFib3JhdG9yKSB7XG4gICAgICAgIC8vIEZJWE1FLVRSQU5TOiBJcyB0aGlzIGxvY2FsaXphYmxlP1xuICAgICAgICBjb25zdCBuYW1lID0gY29sbGFib3JhdG9yID8gY29sbGFib3JhdG9yLmRpc3BsYXlOYW1lIDogJ0Fub255bW91cyc7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gY29sbGFib3JhdG9yXG4gICAgICAgICAgICA/IGNvbGxhYm9yYXRvci5jb2xvclxuICAgICAgICAgICAgOiB0aGlzLl9zZWxlY3Rpb25TdHlsZS5jb2xvcjtcbiAgICAgICAgY29uc3QgY2FyZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGNhcmV0LmNsYXNzTmFtZSA9IENPTExBQk9SQVRPUl9DVVJTT1JfQ0xBU1M7XG4gICAgICAgIGNhcmV0LnN0eWxlLmJvcmRlckJvdHRvbUNvbG9yID0gY29sb3I7XG4gICAgICAgIGNhcmV0Lm9ubW91c2VlbnRlciA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFySG92ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2hvdmVySWQgPSBjb2xsYWJvcmF0b3Iuc2Vzc2lvbklkO1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IGNhcmV0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgLy8gQ29uc3RydWN0IGFuZCBwbGFjZSB0aGUgaG92ZXIgYm94LlxuICAgICAgICAgICAgY29uc3QgaG92ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGhvdmVyLmNsYXNzTmFtZSA9IENPTExBQk9SQVRPUl9IT1ZFUl9DTEFTUztcbiAgICAgICAgICAgIGhvdmVyLnN0eWxlLmxlZnQgPSBTdHJpbmcocmVjdC5sZWZ0KSArICdweCc7XG4gICAgICAgICAgICBob3Zlci5zdHlsZS50b3AgPSBTdHJpbmcocmVjdC5ib3R0b20pICsgJ3B4JztcbiAgICAgICAgICAgIGhvdmVyLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICAgICAgICAgIGhvdmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgbW91c2VzIG92ZXIgdGhlIGhvdmVyLCB0YWtlIG92ZXIgdGhlIHRpbWVyLlxuICAgICAgICAgICAgaG92ZXIub25tb3VzZWVudGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5faG92ZXJUaW1lb3V0KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBob3Zlci5vbm1vdXNlbGVhdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5faG92ZXJUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbGVhckhvdmVyKCk7XG4gICAgICAgICAgICAgICAgfSwgSE9WRVJfVElNRU9VVCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5fY2FyZXRIb3ZlciA9IGhvdmVyO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChob3Zlcik7XG4gICAgICAgIH07XG4gICAgICAgIGNhcmV0Lm9ubW91c2VsZWF2ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2hvdmVyVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGVhckhvdmVyKCk7XG4gICAgICAgICAgICB9LCBIT1ZFUl9USU1FT1VUKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGNhcmV0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBmb3IgYW4gb3V0IG9mIHN5bmMgZWRpdG9yLlxuICAgICAqL1xuICAgIF9jaGVja1N5bmMoKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZSA9IHRoaXMuX2xhc3RDaGFuZ2U7XG4gICAgICAgIGlmICghY2hhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGFzdENoYW5nZSA9IG51bGw7XG4gICAgICAgIGNvbnN0IGVkaXRvciA9IHRoaXMuX2VkaXRvcjtcbiAgICAgICAgY29uc3QgZG9jID0gZWRpdG9yLmdldERvYygpO1xuICAgICAgICBpZiAoZG9jLmdldFZhbHVlKCkgPT09IHRoaXMuX21vZGVsLnZhbHVlLnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2b2lkIHNob3dEaWFsb2coe1xuICAgICAgICAgICAgdGl0bGU6IHRoaXMuX3RyYW5zLl9fKCdDb2RlIEVkaXRvciBvdXQgb2YgU3luYycpLFxuICAgICAgICAgICAgYm9keTogdGhpcy5fdHJhbnMuX18oJ1BsZWFzZSBvcGVuIHlvdXIgYnJvd3NlciBKYXZhU2NyaXB0IGNvbnNvbGUgZm9yIGJ1ZyByZXBvcnQgaW5zdHJ1Y3Rpb25zJylcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUud2FybignSWYgeW91IGFyZSBhYmxlIGFuZCB3aWxsaW5nIHRvIHB1YmxpY2x5IHNoYXJlIHRoZSB0ZXh0IG9yIGNvZGUgaW4geW91ciBlZGl0b3IsIHlvdSBjYW4gaGVscCB1cyBkZWJ1ZyB0aGUgXCJDb2RlIEVkaXRvciBvdXQgb2YgU3luY1wiIG1lc3NhZ2UgYnkgcGFzdGluZyB0aGUgZm9sbG93aW5nIHRvIHRoZSBwdWJsaWMgaXNzdWUgYXQgaHR0cHM6Ly9naXRodWIuY29tL2p1cHl0ZXJsYWIvanVweXRlcmxhYi9pc3N1ZXMvMjk1MS4gUGxlYXNlIG5vdGUgdGhhdCB0aGUgZGF0YSBiZWxvdyBpbmNsdWRlcyB0aGUgdGV4dC9jb2RlIGluIHlvdXIgZWRpdG9yLicpO1xuICAgICAgICBjb25zb2xlLndhcm4oSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgbW9kZWw6IHRoaXMuX21vZGVsLnZhbHVlLnRleHQsXG4gICAgICAgICAgICB2aWV3OiBkb2MuZ2V0VmFsdWUoKSxcbiAgICAgICAgICAgIHNlbGVjdGlvbnM6IHRoaXMuZ2V0U2VsZWN0aW9ucygpLFxuICAgICAgICAgICAgY3Vyc29yOiB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCksXG4gICAgICAgICAgICBsaW5lU2VwOiBlZGl0b3IuZ2V0T3B0aW9uKCdsaW5lU2VwYXJhdG9yJyksXG4gICAgICAgICAgICBtb2RlOiBlZGl0b3IuZ2V0T3B0aW9uKCdtb2RlJyksXG4gICAgICAgICAgICBjaGFuZ2VcbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbi8qKlxuICogVGhlIG5hbWVzcGFjZSBmb3IgYENvZGVNaXJyb3JFZGl0b3JgIHN0YXRpY3MuXG4gKi9cbihmdW5jdGlvbiAoQ29kZU1pcnJvckVkaXRvcikge1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgYW4gZWRpdG9yLlxuICAgICAqL1xuICAgIENvZGVNaXJyb3JFZGl0b3IuZGVmYXVsdENvbmZpZyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgQ29kZUVkaXRvci5kZWZhdWx0Q29uZmlnKSwgeyBtb2RlOiAnbnVsbCcsIHRoZW1lOiAnanVweXRlcicsIHNtYXJ0SW5kZW50OiB0cnVlLCBlbGVjdHJpY0NoYXJzOiB0cnVlLCBrZXlNYXA6ICdkZWZhdWx0JywgZXh0cmFLZXlzOiBudWxsLCBndXR0ZXJzOiBbXSwgZml4ZWRHdXR0ZXI6IHRydWUsIHNob3dDdXJzb3JXaGVuU2VsZWN0aW5nOiBmYWxzZSwgY292ZXJHdXR0ZXJOZXh0VG9TY3JvbGxiYXI6IGZhbHNlLCBkcmFnRHJvcDogdHJ1ZSwgbGluZVNlcGFyYXRvcjogbnVsbCwgc2Nyb2xsYmFyU3R5bGU6ICduYXRpdmUnLCBsaW5lV2lzZUNvcHlDdXQ6IHRydWUsIHNjcm9sbFBhc3RFbmQ6IGZhbHNlLCBzdHlsZUFjdGl2ZUxpbmU6IGZhbHNlLCBzdHlsZVNlbGVjdGVkVGV4dDogdHJ1ZSwgc2VsZWN0aW9uUG9pbnRlcjogZmFsc2UsIHJ1bGVyczogW10sIGZvbGRHdXR0ZXI6IGZhbHNlLCBoYW5kbGVQYXN0ZTogdHJ1ZSB9KTtcbiAgICAvKipcbiAgICAgKiBBZGQgYSBjb21tYW5kIHRvIENvZGVNaXJyb3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjb21tYW5kIHRvIGFkZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb21tYW5kIC0gVGhlIGNvbW1hbmQgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkQ29tbWFuZChuYW1lLCBjb21tYW5kKSB7XG4gICAgICAgIENvZGVNaXJyb3IuY29tbWFuZHNbbmFtZV0gPSBjb21tYW5kO1xuICAgIH1cbiAgICBDb2RlTWlycm9yRWRpdG9yLmFkZENvbW1hbmQgPSBhZGRDb21tYW5kO1xufSkoQ29kZU1pcnJvckVkaXRvciB8fCAoQ29kZU1pcnJvckVkaXRvciA9IHt9KSk7XG4vKipcbiAqIFRoZSBuYW1lc3BhY2UgZm9yIG1vZHVsZSBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlRWRpdG9yKGhvc3QsIGNvbmZpZykge1xuICAgICAgICBjb25zdCB7IGF1dG9DbG9zaW5nQnJhY2tldHMsIGZvbnRGYW1pbHksIGZvbnRTaXplLCBpbnNlcnRTcGFjZXMsIGxpbmVIZWlnaHQsIGxpbmVXcmFwLCB3b3JkV3JhcENvbHVtbiwgdGFiU2l6ZSwgcmVhZE9ubHkgfSA9IGNvbmZpZywgb3RoZXJPcHRpb25zID0gX19yZXN0KGNvbmZpZywgW1wiYXV0b0Nsb3NpbmdCcmFja2V0c1wiLCBcImZvbnRGYW1pbHlcIiwgXCJmb250U2l6ZVwiLCBcImluc2VydFNwYWNlc1wiLCBcImxpbmVIZWlnaHRcIiwgXCJsaW5lV3JhcFwiLCBcIndvcmRXcmFwQ29sdW1uXCIsIFwidGFiU2l6ZVwiLCBcInJlYWRPbmx5XCJdKTtcbiAgICAgICAgY29uc3QgYmFyZUNvbmZpZyA9IE9iamVjdC5hc3NpZ24oeyBhdXRvQ2xvc2VCcmFja2V0czogYXV0b0Nsb3NpbmdCcmFja2V0cyA/IHt9IDogZmFsc2UsIGluZGVudFVuaXQ6IHRhYlNpemUsIGluZGVudFdpdGhUYWJzOiAhaW5zZXJ0U3BhY2VzLCBsaW5lV3JhcHBpbmc6IGxpbmVXcmFwID09PSAnb2ZmJyA/IGZhbHNlIDogdHJ1ZSwgcmVhZE9ubHkgfSwgb3RoZXJPcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIENvZGVNaXJyb3IoZWwgPT4ge1xuICAgICAgICAgICAgaWYgKGZvbnRGYW1pbHkpIHtcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5mb250RmFtaWx5ID0gZm9udEZhbWlseTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmb250U2l6ZSkge1xuICAgICAgICAgICAgICAgIGVsLnN0eWxlLmZvbnRTaXplID0gZm9udFNpemUgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpbmVIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5saW5lSGVpZ2h0ID0gbGluZUhlaWdodC50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlYWRPbmx5KSB7XG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChSRUFEX09OTFlfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpbmVXcmFwID09PSAnd29yZFdyYXBDb2x1bW4nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZXMgPSBlbC5xdWVyeVNlbGVjdG9yKCcuQ29kZU1pcnJvci1saW5lcycpO1xuICAgICAgICAgICAgICAgIGxpbmVzLnN0eWxlLndpZHRoID0gYCR7d29yZFdyYXBDb2x1bW59Y2hgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpbmVXcmFwID09PSAnYm91bmRlZCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lcyA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5Db2RlTWlycm9yLWxpbmVzJyk7XG4gICAgICAgICAgICAgICAgbGluZXMuc3R5bGUubWF4V2lkdGggPSBgJHt3b3JkV3JhcENvbHVtbn1jaGA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBob3N0LmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgfSwgYmFyZUNvbmZpZyk7XG4gICAgfVxuICAgIFByaXZhdGUuY3JlYXRlRWRpdG9yID0gY3JlYXRlRWRpdG9yO1xuICAgIC8qKlxuICAgICAqIEluZGVudCBvciBpbnNlcnQgYSB0YWIgYXMgYXBwcm9wcmlhdGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5kZW50TW9yZU9yaW5zZXJ0VGFiKGNtKSB7XG4gICAgICAgIGNvbnN0IGRvYyA9IGNtLmdldERvYygpO1xuICAgICAgICBjb25zdCBmcm9tID0gZG9jLmdldEN1cnNvcignZnJvbScpO1xuICAgICAgICBjb25zdCB0byA9IGRvYy5nZXRDdXJzb3IoJ3RvJyk7XG4gICAgICAgIGNvbnN0IHNlbCA9ICFwb3NFcShmcm9tLCB0byk7XG4gICAgICAgIGlmIChzZWwpIHtcbiAgICAgICAgICAgIENvZGVNaXJyb3IuY29tbWFuZHNbJ2luZGVudE1vcmUnXShjbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgZm9yIHN0YXJ0IG9mIGxpbmUuXG4gICAgICAgIGNvbnN0IGxpbmUgPSBkb2MuZ2V0TGluZShmcm9tLmxpbmUpO1xuICAgICAgICBjb25zdCBiZWZvcmUgPSBsaW5lLnNsaWNlKDAsIGZyb20uY2gpO1xuICAgICAgICBpZiAoL15cXHMqJC8udGVzdChiZWZvcmUpKSB7XG4gICAgICAgICAgICBDb2RlTWlycm9yLmNvbW1hbmRzWydpbmRlbnRNb3JlJ10oY20pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNtLmdldE9wdGlvbignaW5kZW50V2l0aFRhYnMnKSkge1xuICAgICAgICAgICAgICAgIENvZGVNaXJyb3IuY29tbWFuZHNbJ2luc2VydFRhYiddKGNtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIENvZGVNaXJyb3IuY29tbWFuZHNbJ2luc2VydFNvZnRUYWInXShjbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgUHJpdmF0ZS5pbmRlbnRNb3JlT3JpbnNlcnRUYWIgPSBpbmRlbnRNb3JlT3JpbnNlcnRUYWI7XG4gICAgLyoqXG4gICAgICogRGVsZXRlIHNwYWNlcyB0byB0aGUgcHJldmlvdXMgdGFiIHN0b3AgaW4gYSBjb2RlbWlycm9yIGVkaXRvci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkZWxTcGFjZVRvUHJldlRhYlN0b3AoY20pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBkb2MgPSBjbS5nZXREb2MoKTtcbiAgICAgICAgLy8gZGVmYXVsdCB0YWJzaXplIGlzIDIsIGFjY29yZGluZyB0byBjb2RlbWlycm9yIGRvY3M6IGh0dHBzOi8vY29kZW1pcnJvci5uZXQvZG9jL21hbnVhbC5odG1sI2NvbmZpZ1xuICAgICAgICBjb25zdCB0YWJTaXplID0gKF9hID0gY20uZ2V0T3B0aW9uKCdpbmRlbnRVbml0JykpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDI7XG4gICAgICAgIGNvbnN0IHJhbmdlcyA9IGRvYy5saXN0U2VsZWN0aW9ucygpOyAvLyBoYW5kbGUgbXVsdGljdXJzb3JcbiAgICAgICAgZm9yIChsZXQgaSA9IHJhbmdlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgLy8gaXRlcmF0ZSByZXZlcnNlIHNvIGFueSBkZWxldGlvbnMgZG9uJ3Qgb3ZlcmxhcFxuICAgICAgICAgICAgY29uc3QgaGVhZCA9IHJhbmdlc1tpXS5oZWFkO1xuICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gcmFuZ2VzW2ldLmFuY2hvcjtcbiAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0aW9uID0gIXBvc0VxKGhlYWQsIGFuY2hvcik7XG4gICAgICAgICAgICBpZiAoaXNTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBkb2MucmVwbGFjZVJhbmdlKCcnLCBhbmNob3IsIGhlYWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZSA9IGRvYy5nZXRMaW5lKGhlYWQubGluZSkuc3Vic3RyaW5nKDAsIGhlYWQuY2gpO1xuICAgICAgICAgICAgICAgIGlmIChsaW5lLm1hdGNoKC9eXFwgKyQvKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGUgdGFic1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2VGFiU3RvcCA9IChNYXRoLmNlaWwoaGVhZC5jaCAvIHRhYlNpemUpIC0gMSkgKiB0YWJTaXplO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmcm9tID0gQ29kZU1pcnJvci5Qb3MoaGVhZC5saW5lLCBwcmV2VGFiU3RvcCk7XG4gICAgICAgICAgICAgICAgICAgIGRvYy5yZXBsYWNlUmFuZ2UoJycsIGZyb20sIGhlYWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVsZXRlIG5vbi10YWJzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZyb20gPSBjbS5maW5kUG9zSChoZWFkLCAtMSwgJ2NoYXInLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGRvYy5yZXBsYWNlUmFuZ2UoJycsIGZyb20sIGhlYWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBQcml2YXRlLmRlbFNwYWNlVG9QcmV2VGFiU3RvcCA9IGRlbFNwYWNlVG9QcmV2VGFiU3RvcDtcbiAgICAvKipcbiAgICAgKiBUZXN0IHdoZXRoZXIgdHdvIENvZGVNaXJyb3IgcG9zaXRpb25zIGFyZSBlcXVhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwb3NFcShhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLmxpbmUgPT09IGIubGluZSAmJiBhLmNoID09PSBiLmNoO1xuICAgIH1cbiAgICBQcml2YXRlLnBvc0VxID0gcG9zRXE7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBsaXN0IG9mIGFjdGl2ZSBndXR0ZXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29uZmlnIEVkaXRvciBjb25maWd1cmF0aW9uXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0QWN0aXZlR3V0dGVycyhjb25maWcpIHtcbiAgICAgICAgLy8gVGhlIG9yZGVyIG9mIHRoZSBjbGFzc2VzIHdpbGwgYmUgdGhlIGd1dHRlcnMgb3JkZXJcbiAgICAgICAgY29uc3QgY2xhc3NUb1N3aXRjaCA9IHtcbiAgICAgICAgICAgICdDb2RlTWlycm9yLWxpbmVudW1iZXJzJzogJ2xpbmVOdW1iZXJzJyxcbiAgICAgICAgICAgICdDb2RlTWlycm9yLWZvbGRndXR0ZXInOiAnY29kZUZvbGRpbmcnXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjbGFzc1RvU3dpdGNoKS5maWx0ZXIoZ3V0dGVyID0+IGNvbmZpZ1tjbGFzc1RvU3dpdGNoW2d1dHRlcl1dKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IGEgY29uZmlnIG9wdGlvbiBmb3IgdGhlIGVkaXRvci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRPcHRpb24oZWRpdG9yLCBvcHRpb24sIHZhbHVlLCBjb25maWcpIHtcbiAgICAgICAgY29uc3QgZWwgPSBlZGl0b3IuZ2V0V3JhcHBlckVsZW1lbnQoKTtcbiAgICAgICAgc3dpdGNoIChvcHRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2N1cnNvckJsaW5rUmF0ZSc6XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNldE9wdGlvbihvcHRpb24sIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xpbmVXcmFwJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVXcmFwcGluZyA9IHZhbHVlID09PSAnb2ZmJyA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lcyA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5Db2RlTWlycm9yLWxpbmVzJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF4V2lkdGggPSB2YWx1ZSA9PT0gJ2JvdW5kZWQnID8gYCR7Y29uZmlnLndvcmRXcmFwQ29sdW1ufWNoYCA6IG51bGw7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkdGggPSB2YWx1ZSA9PT0gJ3dvcmRXcmFwQ29sdW1uJyA/IGAke2NvbmZpZy53b3JkV3JhcENvbHVtbn1jaGAgOiBudWxsO1xuICAgICAgICAgICAgICAgIGxpbmVzLnN0eWxlLnNldFByb3BlcnR5KCdtYXgtd2lkdGgnLCBtYXhXaWR0aCk7XG4gICAgICAgICAgICAgICAgbGluZXMuc3R5bGUuc2V0UHJvcGVydHkoJ3dpZHRoJywgd2lkdGgpO1xuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb24oJ2xpbmVXcmFwcGluZycsIGxpbmVXcmFwcGluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICd3b3JkV3JhcENvbHVtbic6IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGxpbmVXcmFwIH0gPSBjb25maWc7XG4gICAgICAgICAgICAgICAgaWYgKGxpbmVXcmFwID09PSAnd29yZFdyYXBDb2x1bW4nIHx8IGxpbmVXcmFwID09PSAnYm91bmRlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZXMgPSBlbC5xdWVyeVNlbGVjdG9yKCcuQ29kZU1pcnJvci1saW5lcycpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wID0gbGluZVdyYXAgPT09ICd3b3JkV3JhcENvbHVtbicgPyAnd2lkdGgnIDogJ21heFdpZHRoJztcbiAgICAgICAgICAgICAgICAgICAgbGluZXMuc3R5bGVbcHJvcF0gPSBgJHt2YWx1ZX1jaGA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAndGFiU2l6ZSc6XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNldE9wdGlvbignaW5kZW50VW5pdCcsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2luc2VydFNwYWNlcyc6XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNldE9wdGlvbignaW5kZW50V2l0aFRhYnMnLCAhdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYXV0b0Nsb3NpbmdCcmFja2V0cyc6XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNldE9wdGlvbignYXV0b0Nsb3NlQnJhY2tldHMnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdydWxlcnMnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcnVsZXJzID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNldE9wdGlvbigncnVsZXJzJywgcnVsZXJzLm1hcChjb2x1bW4gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnanAtQ29kZU1pcnJvci1ydWxlcidcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdyZWFkT25seSc6XG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShSRUFEX09OTFlfQ0xBU1MsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0T3B0aW9uKG9wdGlvbiwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZm9udEZhbWlseSc6XG4gICAgICAgICAgICAgICAgZWwuc3R5bGUuZm9udEZhbWlseSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZm9udFNpemUnOlxuICAgICAgICAgICAgICAgIGVsLnN0eWxlLnNldFByb3BlcnR5KCdmb250LXNpemUnLCB2YWx1ZSA/IHZhbHVlICsgJ3B4JyA6IG51bGwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbGluZUhlaWdodCc6XG4gICAgICAgICAgICAgICAgZWwuc3R5bGUubGluZUhlaWdodCA9ICh2YWx1ZSA/IHZhbHVlLnRvU3RyaW5nKCkgOiBudWxsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2d1dHRlcnMnOlxuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb24ob3B0aW9uLCBnZXRBY3RpdmVHdXR0ZXJzKGNvbmZpZykpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbGluZU51bWJlcnMnOlxuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb24ob3B0aW9uLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNldE9wdGlvbignZ3V0dGVycycsIGdldEFjdGl2ZUd1dHRlcnMoY29uZmlnKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjb2RlRm9sZGluZyc6XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNldE9wdGlvbignZm9sZEd1dHRlcicsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0T3B0aW9uKCdndXR0ZXJzJywgZ2V0QWN0aXZlR3V0dGVycyhjb25maWcpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3Nob3dUcmFpbGluZ1NwYWNlJzpcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0T3B0aW9uKG9wdGlvbiwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0T3B0aW9uKG9wdGlvbiwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIFByaXZhdGUuc2V0T3B0aW9uID0gc2V0T3B0aW9uO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vKipcbiAqIEFkZCBhIENvZGVNaXJyb3IgY29tbWFuZCB0byBkZWxldGUgdW50aWwgcHJldmlvdXMgbm9uIGJsYW5raW5nIHNwYWNlXG4gKiBjaGFyYWN0ZXIgb3IgZmlyc3QgbXVsdGlwbGUgb2YgdGFic2l6ZSB0YWJzdG9wLlxuICovXG5Db2RlTWlycm9yRWRpdG9yLmFkZENvbW1hbmQoJ2RlbFNwYWNlVG9QcmV2VGFiU3RvcCcsIFByaXZhdGUuZGVsU3BhY2VUb1ByZXZUYWJTdG9wKTtcbi8qKlxuICogQWRkIGEgQ29kZU1pcnJvciBjb21tYW5kIHRvIGluZGVudCBvciBpbnNlcnQgYSB0YWIgYXMgYXBwcm9wcmlhdGUuXG4gKi9cbkNvZGVNaXJyb3JFZGl0b3IuYWRkQ29tbWFuZCgnaW5kZW50TW9yZU9yaW5zZXJ0VGFiJywgUHJpdmF0ZS5pbmRlbnRNb3JlT3JpbnNlcnRUYWIpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZWRpdG9yLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgQ29kZU1pcnJvckVkaXRvciB9IGZyb20gJy4vZWRpdG9yJztcbi8qKlxuICogQ29kZU1pcnJvciBlZGl0b3IgZmFjdG9yeS5cbiAqL1xuZXhwb3J0IGNsYXNzIENvZGVNaXJyb3JFZGl0b3JGYWN0b3J5IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYW4gSUVkaXRvckZhY3RvcnlTZXJ2aWNlIGZvciBDb2RlTWlycm9yRWRpdG9ycy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkZWZhdWx0cyA9IHt9LCB0cmFuc2xhdG9yKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgYSBuZXcgZWRpdG9yIGZvciBpbmxpbmUgY29kZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubmV3SW5saW5lRWRpdG9yID0gKG9wdGlvbnMpID0+IHtcbiAgICAgICAgICAgIG9wdGlvbnMuaG9zdC5kYXRhc2V0LnR5cGUgPSAnaW5saW5lJztcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29kZU1pcnJvckVkaXRvcihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IGNvbmZpZzogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLmlubGluZUNvZGVNaXJyb3JDb25maWcpLCAob3B0aW9ucy5jb25maWcgfHwge30pKSwgdHJhbnNsYXRvcjogdGhpcy50cmFuc2xhdG9yIH0pKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhIG5ldyBlZGl0b3IgZm9yIGEgZnVsbCBkb2N1bWVudC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubmV3RG9jdW1lbnRFZGl0b3IgPSAob3B0aW9ucykgPT4ge1xuICAgICAgICAgICAgb3B0aW9ucy5ob3N0LmRhdGFzZXQudHlwZSA9ICdkb2N1bWVudCc7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENvZGVNaXJyb3JFZGl0b3IoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBjb25maWc6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kb2N1bWVudENvZGVNaXJyb3JDb25maWcpLCAob3B0aW9ucy5jb25maWcgfHwge30pKSwgdHJhbnNsYXRvcjogdGhpcy50cmFuc2xhdG9yIH0pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgdGhpcy5pbmxpbmVDb2RlTWlycm9yQ29uZmlnID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIENvZGVNaXJyb3JFZGl0b3IuZGVmYXVsdENvbmZpZyksIHsgZXh0cmFLZXlzOiB7XG4gICAgICAgICAgICAgICAgJ0NtZC1SaWdodCc6ICdnb0xpbmVSaWdodCcsXG4gICAgICAgICAgICAgICAgRW5kOiAnZ29MaW5lUmlnaHQnLFxuICAgICAgICAgICAgICAgICdDbWQtTGVmdCc6ICdnb0xpbmVMZWZ0JyxcbiAgICAgICAgICAgICAgICBUYWI6ICdpbmRlbnRNb3JlT3JpbnNlcnRUYWInLFxuICAgICAgICAgICAgICAgICdTaGlmdC1UYWInOiAnaW5kZW50TGVzcycsXG4gICAgICAgICAgICAgICAgJ0NtZC0vJzogY20gPT4gY20udG9nZ2xlQ29tbWVudCh7IGluZGVudDogdHJ1ZSB9KSxcbiAgICAgICAgICAgICAgICAnQ3RybC0vJzogY20gPT4gY20udG9nZ2xlQ29tbWVudCh7IGluZGVudDogdHJ1ZSB9KSxcbiAgICAgICAgICAgICAgICAnQ3RybC1HJzogJ2ZpbmQnLFxuICAgICAgICAgICAgICAgICdDbWQtRyc6ICdmaW5kJ1xuICAgICAgICAgICAgfSB9KSwgZGVmYXVsdHMpO1xuICAgICAgICB0aGlzLmRvY3VtZW50Q29kZU1pcnJvckNvbmZpZyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBDb2RlTWlycm9yRWRpdG9yLmRlZmF1bHRDb25maWcpLCB7IGV4dHJhS2V5czoge1xuICAgICAgICAgICAgICAgIFRhYjogJ2luZGVudE1vcmVPcmluc2VydFRhYicsXG4gICAgICAgICAgICAgICAgJ1NoaWZ0LVRhYic6ICdpbmRlbnRMZXNzJyxcbiAgICAgICAgICAgICAgICAnQ21kLS8nOiBjbSA9PiBjbS50b2dnbGVDb21tZW50KHsgaW5kZW50OiB0cnVlIH0pLFxuICAgICAgICAgICAgICAgICdDdHJsLS8nOiBjbSA9PiBjbS50b2dnbGVDb21tZW50KHsgaW5kZW50OiB0cnVlIH0pLFxuICAgICAgICAgICAgICAgICdTaGlmdC1FbnRlcic6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLyogbm8tb3AgKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBsaW5lTnVtYmVyczogdHJ1ZSwgc2Nyb2xsUGFzdEVuZDogdHJ1ZSB9KSwgZGVmYXVsdHMpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZhY3RvcnkuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgY29kZW1pcnJvclxuICovXG5pbXBvcnQgeyBDb2RlTWlycm9yRWRpdG9yRmFjdG9yeSB9IGZyb20gJy4vZmFjdG9yeSc7XG5pbXBvcnQgeyBDb2RlTWlycm9yTWltZVR5cGVTZXJ2aWNlIH0gZnJvbSAnLi9taW1ldHlwZSc7XG5leHBvcnQgKiBmcm9tICcuL2VkaXRvcic7XG5leHBvcnQgKiBmcm9tICcuL2ZhY3RvcnknO1xuZXhwb3J0ICogZnJvbSAnLi9taW1ldHlwZSc7XG5leHBvcnQgKiBmcm9tICcuL21vZGUnO1xuZXhwb3J0ICogZnJvbSAnLi9zeW50YXhzdGF0dXMnO1xuZXhwb3J0ICogZnJvbSAnLi90b2tlbnMnO1xuLyoqXG4gKiBUaGUgZGVmYXVsdCBlZGl0b3Igc2VydmljZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBlZGl0b3JTZXJ2aWNlcyA9IHtcbiAgICBmYWN0b3J5U2VydmljZTogbmV3IENvZGVNaXJyb3JFZGl0b3JGYWN0b3J5KCksXG4gICAgbWltZVR5cGVTZXJ2aWNlOiBuZXcgQ29kZU1pcnJvck1pbWVUeXBlU2VydmljZSgpXG59O1xuLyoqXG4gKiBGSVhNRS1UUkFOUzogTWF5YmUgYW4gb3B0aW9uIHRvIGJlIGFibGUgdG8gcGFzcyBhIHRyYW5zbGF0b3IgdG8gdGhlIGZhY3Rvcmllcz9cbiAqXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZGl0b3JTZXJ2aWNlcyh0cmFuc2xhdG9yOiBJVHJhbnNsYXRvcik6IElFZGl0b3JTZXJ2aWNlcyB7XG4gIHJldHVybiB7XG4gICAgZmFjdG9yeVNlcnZpY2U6IG5ldyBDb2RlTWlycm9yRWRpdG9yRmFjdG9yeSh7fSwgdHJhbnNsYXRvciksXG4gICAgbWltZVR5cGVTZXJ2aWNlOiBuZXcgQ29kZU1pcnJvck1pbWVUeXBlU2VydmljZSh0cmFuc2xhdG9yKVxuICB9O1xufVxuICovXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBQYXRoRXh0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IE1vZGUgfSBmcm9tICcuL21vZGUnO1xuLyoqXG4gKiBUaGUgbWltZSB0eXBlIHNlcnZpY2UgZm9yIENvZGVNaXJyb3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb2RlTWlycm9yTWltZVR5cGVTZXJ2aWNlIHtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbWltZSB0eXBlIGZvciB0aGUgZ2l2ZW4gbGFuZ3VhZ2UgaW5mby5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBJZiBhIG1pbWUgdHlwZSBjYW5ub3QgYmUgZm91bmQgcmV0dXJucyB0aGUgZGVmYXVsdCBtaW1lIHR5cGUgYHRleHQvcGxhaW5gLCBuZXZlciBgbnVsbGAuXG4gICAgICovXG4gICAgZ2V0TWltZVR5cGVCeUxhbmd1YWdlKGluZm8pIHtcbiAgICAgICAgY29uc3QgZXh0ID0gaW5mby5maWxlX2V4dGVuc2lvbiB8fCAnJztcbiAgICAgICAgcmV0dXJuIE1vZGUuZmluZEJlc3QoaW5mby5jb2RlbWlycm9yX21vZGUgfHwge1xuICAgICAgICAgICAgbWltZXR5cGU6IGluZm8ubWltZXR5cGUsXG4gICAgICAgICAgICBuYW1lOiBpbmZvLm5hbWUsXG4gICAgICAgICAgICBleHQ6IFtleHQuc3BsaXQoJy4nKS5zbGljZSgtMSlbMF1dXG4gICAgICAgIH0pLm1pbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBtaW1lIHR5cGUgZm9yIHRoZSBnaXZlbiBmaWxlIHBhdGguXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogSWYgYSBtaW1lIHR5cGUgY2Fubm90IGJlIGZvdW5kIHJldHVybnMgdGhlIGRlZmF1bHQgbWltZSB0eXBlIGB0ZXh0L3BsYWluYCwgbmV2ZXIgYG51bGxgLlxuICAgICAqL1xuICAgIGdldE1pbWVUeXBlQnlGaWxlUGF0aChwYXRoKSB7XG4gICAgICAgIGNvbnN0IGV4dCA9IFBhdGhFeHQuZXh0bmFtZShwYXRoKTtcbiAgICAgICAgaWYgKGV4dCA9PT0gJy5pcHknKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3RleHQveC1weXRob24nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV4dCA9PT0gJy5tZCcpIHtcbiAgICAgICAgICAgIHJldHVybiAndGV4dC94LWlweXRob25nZm0nO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1vZGUgPSBNb2RlLmZpbmRCeUZpbGVOYW1lKHBhdGgpIHx8IE1vZGUuZmluZEJlc3QoJycpO1xuICAgICAgICByZXR1cm4gbW9kZS5taW1lO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1pbWV0eXBlLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IElFZGl0b3JNaW1lVHlwZVNlcnZpY2UgfSBmcm9tICdAanVweXRlcmxhYi9jb2RlZWRpdG9yJztcbmltcG9ydCB7IFBhdGhFeHQgfSBmcm9tICdAanVweXRlcmxhYi9jb3JldXRpbHMnO1xuaW1wb3J0IHsgQXJyYXlFeHQgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG5pbXBvcnQgQ29kZU1pcnJvciBmcm9tICdjb2RlbWlycm9yJztcbmltcG9ydCAnY29kZW1pcnJvci9hZGRvbi9ydW5tb2RlL3J1bm1vZGUnO1xuaW1wb3J0ICdjb2RlbWlycm9yL21vZGUvY2xpa2UvY2xpa2UnO1xuaW1wb3J0ICdjb2RlbWlycm9yL21vZGUvY3NzL2Nzcyc7XG4vLyBCdW5kbGUgb3RoZXIgY29tbW9uIG1vZGVzXG5pbXBvcnQgJ2NvZGVtaXJyb3IvbW9kZS9qYXZhc2NyaXB0L2phdmFzY3JpcHQnO1xuaW1wb3J0ICdjb2RlbWlycm9yL21vZGUvanN4L2pzeCc7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvbW9kZS9qdWxpYS9qdWxpYSc7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvbW9kZS9tYXJrZG93bi9tYXJrZG93bic7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvbW9kZS9tZXRhJztcbmltcG9ydCAnY29kZW1pcnJvci9tb2RlL3Ivcic7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvbW9kZS9zaGVsbC9zaGVsbCc7XG5pbXBvcnQgJ2NvZGVtaXJyb3IvbW9kZS9zcWwvc3FsJztcbmltcG9ydCAnLi9jb2RlbWlycm9yLWlweXRob24nO1xuaW1wb3J0ICcuL2NvZGVtaXJyb3ItaXB5dGhvbmdmbSc7XG4vKipcbiAqIFRoZSBuYW1lc3BhY2UgZm9yIENvZGVNaXJyb3IgTW9kZSBmdW5jdGlvbmFsaXR5LlxuICovXG5leHBvcnQgdmFyIE1vZGU7XG4oZnVuY3Rpb24gKE1vZGUpIHtcbiAgICBjb25zdCBzcGVjTG9hZGVycyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gU2ltcGxlc3QsIGNoZWFwZXN0IGNoZWNrIGJ5IG1vZGUgbmFtZS5cbiAgICAgICAgICAgIGxvYWRlcjogYXN5bmMgKHNwZWMpID0+IENvZGVNaXJyb3IubW9kZXMuaGFzT3duUHJvcGVydHkoc3BlYy5tb2RlKSxcbiAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gRmV0Y2ggdGhlIG1vZGUgYXN5bmNocm9ub3VzbHkuXG4gICAgICAgICAgICBsb2FkZXI6IGZ1bmN0aW9uIChzcGVjKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQW4gYXJyb3cgZnVuY3Rpb24gYmVsb3cgc2VlbXMgdG8gbWlzY29tcGlsZSBpbiBvdXIgY3VycmVudCB3ZWJwYWNrIHRvXG4gICAgICAgICAgICAgICAgICAgIC8vIGludmFsaWQganMuXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgYGNvZGVtaXJyb3IvbW9kZS8ke3NwZWMubW9kZX0vJHtzcGVjLm1vZGV9LmpzYFxuICAgICAgICAgICAgICAgICAgICBdLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByYW5rOiA5OVxuICAgICAgICB9XG4gICAgXTtcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJhdyBsaXN0IG9mIGF2YWlsYWJsZSBtb2RlcyBzcGVjcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRNb2RlSW5mbygpIHtcbiAgICAgICAgcmV0dXJuIENvZGVNaXJyb3IubW9kZUluZm87XG4gICAgfVxuICAgIE1vZGUuZ2V0TW9kZUluZm8gPSBnZXRNb2RlSW5mbztcbiAgICAvKipcbiAgICAgKiBSdW5uaW5nIGEgQ29kZU1pcnJvciBtb2RlIG91dHNpZGUgb2YgYW4gZWRpdG9yLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJ1bihjb2RlLCBtb2RlLCBlbCkge1xuICAgICAgICBDb2RlTWlycm9yLnJ1bk1vZGUoY29kZSwgbW9kZSwgZWwpO1xuICAgIH1cbiAgICBNb2RlLnJ1biA9IHJ1bjtcbiAgICAvKipcbiAgICAgKiBFbnN1cmUgYSBjb2RlbWlycm9yIG1vZGUgaXMgYXZhaWxhYmxlIGJ5IG5hbWUgb3IgQ29kZW1pcnJvciBzcGVjLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1vZGUgLSBUaGUgbW9kZSB0byBlbnN1cmUuICBJZiBpdCBpcyBhIHN0cmluZywgdXNlcyBbZmluZEJlc3RdXG4gICAgICogICB0byBnZXQgdGhlIGFwcHJvcHJpYXRlIHNwZWMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBtb2RlIGlzIGF2YWlsYWJsZS5cbiAgICAgKi9cbiAgICBhc3luYyBmdW5jdGlvbiBlbnN1cmUobW9kZSkge1xuICAgICAgICBjb25zdCBzcGVjID0gZmluZEJlc3QobW9kZSk7XG4gICAgICAgIGZvciAoY29uc3Qgc3BlY0xvYWRlciBvZiBzcGVjTG9hZGVycykge1xuICAgICAgICAgICAgaWYgKGF3YWl0IHNwZWNMb2FkZXIubG9hZGVyKHNwZWMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwZWM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIE1vZGUuZW5zdXJlID0gZW5zdXJlO1xuICAgIGZ1bmN0aW9uIGFkZFNwZWNMb2FkZXIobG9hZGVyLCByYW5rKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB7IGxvYWRlciwgcmFuayB9O1xuICAgICAgICBjb25zdCBpbmRleCA9IEFycmF5RXh0LnVwcGVyQm91bmQoc3BlY0xvYWRlcnMsIGl0ZW0sIFByaXZhdGUuaXRlbUNtcCk7XG4gICAgICAgIEFycmF5RXh0Lmluc2VydChzcGVjTG9hZGVycywgaW5kZXgsIGl0ZW0pO1xuICAgIH1cbiAgICBNb2RlLmFkZFNwZWNMb2FkZXIgPSBhZGRTcGVjTG9hZGVyO1xuICAgIC8qKlxuICAgICAqIEZpbmQgYSBjb2RlbWlycm9yIG1vZGUgYnkgbmFtZSBvciBDb2RlTWlycm9yIHNwZWMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZEJlc3QobW9kZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IG1vZGVuYW1lID0gdHlwZW9mIG1vZGUgPT09ICdzdHJpbmcnID8gbW9kZSA6IG1vZGUubW9kZSB8fCBtb2RlLm5hbWU7XG4gICAgICAgIGNvbnN0IG1pbWV0eXBlID0gdHlwZW9mIG1vZGUgIT09ICdzdHJpbmcnID8gbW9kZS5taW1lIDogbW9kZW5hbWU7XG4gICAgICAgIGNvbnN0IGV4dCA9IHR5cGVvZiBtb2RlICE9PSAnc3RyaW5nJyA/IChfYSA9IG1vZGUuZXh0KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXSA6IFtdO1xuICAgICAgICByZXR1cm4gKENvZGVNaXJyb3IuZmluZE1vZGVCeU5hbWUobW9kZW5hbWUgfHwgJycpIHx8XG4gICAgICAgICAgICBDb2RlTWlycm9yLmZpbmRNb2RlQnlNSU1FKG1pbWV0eXBlIHx8ICcnKSB8fFxuICAgICAgICAgICAgZmluZEJ5RXh0ZW5zaW9uKGV4dCkgfHxcbiAgICAgICAgICAgIENvZGVNaXJyb3IuZmluZE1vZGVCeU1JTUUoSUVkaXRvck1pbWVUeXBlU2VydmljZS5kZWZhdWx0TWltZVR5cGUpIHx8XG4gICAgICAgICAgICBDb2RlTWlycm9yLmZpbmRNb2RlQnlNSU1FKCd0ZXh0L3BsYWluJykpO1xuICAgIH1cbiAgICBNb2RlLmZpbmRCZXN0ID0gZmluZEJlc3Q7XG4gICAgLyoqXG4gICAgICogRmluZCBhIGNvZGVtaXJyb3IgbW9kZSBieSBNSU1FLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpbmRCeU1JTUUobWltZSkge1xuICAgICAgICByZXR1cm4gQ29kZU1pcnJvci5maW5kTW9kZUJ5TUlNRShtaW1lKTtcbiAgICB9XG4gICAgTW9kZS5maW5kQnlNSU1FID0gZmluZEJ5TUlNRTtcbiAgICAvKipcbiAgICAgKiBGaW5kIGEgY29kZW1pcnJvciBtb2RlIGJ5IG5hbWUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZEJ5TmFtZShuYW1lKSB7XG4gICAgICAgIHJldHVybiBDb2RlTWlycm9yLmZpbmRNb2RlQnlOYW1lKG5hbWUpO1xuICAgIH1cbiAgICBNb2RlLmZpbmRCeU5hbWUgPSBmaW5kQnlOYW1lO1xuICAgIC8qKlxuICAgICAqIEZpbmQgYSBjb2RlbWlycm9yIG1vZGUgYnkgZmlsZW5hbWUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZEJ5RmlsZU5hbWUobmFtZSkge1xuICAgICAgICBjb25zdCBiYXNlbmFtZSA9IFBhdGhFeHQuYmFzZW5hbWUobmFtZSk7XG4gICAgICAgIHJldHVybiBDb2RlTWlycm9yLmZpbmRNb2RlQnlGaWxlTmFtZShiYXNlbmFtZSk7XG4gICAgfVxuICAgIE1vZGUuZmluZEJ5RmlsZU5hbWUgPSBmaW5kQnlGaWxlTmFtZTtcbiAgICAvKipcbiAgICAgKiBGaW5kIGEgY29kZW1pcnJvciBtb2RlIGJ5IGV4dGVuc2lvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaW5kQnlFeHRlbnNpb24oZXh0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgZXh0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIENvZGVNaXJyb3IuZmluZE1vZGVCeUV4dGVuc2lvbihleHQpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBtb2RlID0gQ29kZU1pcnJvci5maW5kTW9kZUJ5RXh0ZW5zaW9uKGV4dFtpXSk7XG4gICAgICAgICAgICBpZiAobW9kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBNb2RlLmZpbmRCeUV4dGVuc2lvbiA9IGZpbmRCeUV4dGVuc2lvbjtcbn0pKE1vZGUgfHwgKE1vZGUgPSB7fSkpO1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICAvKipcbiAgICAgKiBBIGxlc3MtdGhhbiBjb21wYXJpc29uIGZ1bmN0aW9uIGZvciB0aGUgbG9hZGVyIHJhbmtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpdGVtQ21wKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgICAgcmV0dXJuIGZpcnN0LnJhbmsgLSBzZWNvbmQucmFuaztcbiAgICB9XG4gICAgUHJpdmF0ZS5pdGVtQ21wID0gaXRlbUNtcDtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9kZS5qcy5tYXAiLCJpbXBvcnQgeyBWRG9tTW9kZWwsIFZEb21SZW5kZXJlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IGludGVyYWN0aXZlSXRlbSwgc2hvd1BvcHVwLCBUZXh0SXRlbSB9IGZyb20gJ0BqdXB5dGVybGFiL3N0YXR1c2Jhcic7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IE1lbnUgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1vZGUgfSBmcm9tICcuJztcbi8qKlxuICogQSBwdXJlIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHRzeCBjb21wb25lbnQgZm9yIGFuIGVkaXRvciBzeW50YXggaXRlbS5cbiAqXG4gKiBAcGFyYW0gcHJvcHM6IHRoZSBwcm9wcyBmb3IgdGhlIGNvbXBvbmVudC5cbiAqXG4gKiBAcmV0dXJucyBhbiBlZGl0b3Igc3ludGF4IGNvbXBvbmVudC5cbiAqL1xuZnVuY3Rpb24gRWRpdG9yU3ludGF4Q29tcG9uZW50KHByb3BzKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEl0ZW0sIHsgc291cmNlOiBwcm9wcy5tb2RlLCBvbkNsaWNrOiBwcm9wcy5oYW5kbGVDbGljayB9KTtcbn1cbi8qKlxuICogU3RhdHVzQmFyIGl0ZW0gdG8gY2hhbmdlIHRoZSBsYW5ndWFnZSBzeW50YXggaGlnaGxpZ2h0aW5nIG9mIHRoZSBmaWxlIGVkaXRvci5cbiAqL1xuZXhwb3J0IGNsYXNzIEVkaXRvclN5bnRheFN0YXR1cyBleHRlbmRzIFZEb21SZW5kZXJlciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IFZEb21SZW5kZXJlciBmb3IgdGhlIHN0YXR1cyBpdGVtLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIobmV3IEVkaXRvclN5bnRheFN0YXR1cy5Nb2RlbCgpKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhIG1lbnUgZm9yIHNlbGVjdGluZyB0aGUgbW9kZSBvZiB0aGUgZWRpdG9yLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5faGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtb2RlTWVudSA9IG5ldyBNZW51KHsgY29tbWFuZHM6IHRoaXMuX2NvbW1hbmRzIH0pO1xuICAgICAgICAgICAgY29uc3QgY29tbWFuZCA9ICdjb2RlbWlycm9yOmNoYW5nZS1tb2RlJztcbiAgICAgICAgICAgIGlmICh0aGlzLl9wb3B1cCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BvcHVwLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE1vZGUuZ2V0TW9kZUluZm8oKVxuICAgICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYU5hbWUgPSBhLm5hbWUgfHwgJyc7XG4gICAgICAgICAgICAgICAgY29uc3QgYk5hbWUgPSBiLm5hbWUgfHwgJyc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFOYW1lLmxvY2FsZUNvbXBhcmUoYk5hbWUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaChzcGVjID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc3BlYy5tb2RlLmluZGV4T2YoJ2JyYWluZicpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgYXJncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0U3BhY2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBzcGVjLm5hbWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG1vZGVNZW51LmFkZEl0ZW0oe1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kLFxuICAgICAgICAgICAgICAgICAgICBhcmdzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX3BvcHVwID0gc2hvd1BvcHVwKHtcbiAgICAgICAgICAgICAgICBib2R5OiBtb2RlTWVudSxcbiAgICAgICAgICAgICAgICBhbmNob3I6IHRoaXMsXG4gICAgICAgICAgICAgICAgYWxpZ246ICdsZWZ0J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3BvcHVwID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY29tbWFuZHMgPSBvcHRzLmNvbW1hbmRzO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSBvcHRzLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdGhpcy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhpbnRlcmFjdGl2ZUl0ZW0pO1xuICAgICAgICB0aGlzLnRpdGxlLmNhcHRpb24gPSB0cmFucy5fXygnQ2hhbmdlIHRleHQgZWRpdG9yIHN5bnRheCBoaWdobGlnaHRpbmcnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIHRoZSBzdGF0dXMgaXRlbS5cbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEVkaXRvclN5bnRheENvbXBvbmVudCwgeyBtb2RlOiB0aGlzLm1vZGVsLm1vZGUsIGhhbmRsZUNsaWNrOiB0aGlzLl9oYW5kbGVDbGljayB9KSk7XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgRWRpdG9yU3ludGF4IHN0YXRpY3MuXG4gKi9cbihmdW5jdGlvbiAoRWRpdG9yU3ludGF4U3RhdHVzKSB7XG4gICAgLyoqXG4gICAgICogQSBWRG9tTW9kZWwgZm9yIHRoZSBjdXJyZW50IGVkaXRvci9tb2RlIGNvbWJpbmF0aW9uLlxuICAgICAqL1xuICAgIGNsYXNzIE1vZGVsIGV4dGVuZHMgVkRvbU1vZGVsIHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiB0aGUgZWRpdG9yIG1vZGUgY2hhbmdlcywgdXBkYXRlIHRoZSBtb2RlbC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5fb25NSU1FVHlwZUNoYW5nZSA9IChtb2RlLCBjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRNb2RlID0gdGhpcy5fbW9kZTtcbiAgICAgICAgICAgICAgICBjb25zdCBzcGVjID0gTW9kZS5maW5kQnlNSU1FKGNoYW5nZS5uZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW9kZSA9IHNwZWMubmFtZSB8fCBzcGVjLm1vZGU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNoYW5nZShvbGRNb2RlLCB0aGlzLl9tb2RlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9tb2RlID0gJyc7XG4gICAgICAgICAgICB0aGlzLl9lZGl0b3IgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY3VycmVudCBtb2RlIGZvciB0aGUgZWRpdG9yLiBJZiBubyBlZGl0b3IgaXMgcHJlc2VudCxcbiAgICAgICAgICogcmV0dXJucyB0aGUgZW1wdHkgc3RyaW5nLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IG1vZGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9kZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGN1cnJlbnQgZWRpdG9yIGZvciB0aGUgYXBwbGljYXRpb24gZWRpdG9yIHRyYWNrZXIuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgZWRpdG9yKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VkaXRvcjtcbiAgICAgICAgfVxuICAgICAgICBzZXQgZWRpdG9yKGVkaXRvcikge1xuICAgICAgICAgICAgY29uc3Qgb2xkRWRpdG9yID0gdGhpcy5fZWRpdG9yO1xuICAgICAgICAgICAgaWYgKG9sZEVkaXRvciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG9sZEVkaXRvci5tb2RlbC5taW1lVHlwZUNoYW5nZWQuZGlzY29ubmVjdCh0aGlzLl9vbk1JTUVUeXBlQ2hhbmdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG9sZE1vZGUgPSB0aGlzLl9tb2RlO1xuICAgICAgICAgICAgdGhpcy5fZWRpdG9yID0gZWRpdG9yO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2VkaXRvciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21vZGUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNwZWMgPSBNb2RlLmZpbmRCeU1JTUUodGhpcy5fZWRpdG9yLm1vZGVsLm1pbWVUeXBlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb2RlID0gc3BlYy5uYW1lIHx8IHNwZWMubW9kZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lZGl0b3IubW9kZWwubWltZVR5cGVDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25NSU1FVHlwZUNoYW5nZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyQ2hhbmdlKG9sZE1vZGUsIHRoaXMuX21vZGUpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmlnZ2VyIGEgcmVyZW5kZXIgb2YgdGhlIG1vZGVsLlxuICAgICAgICAgKi9cbiAgICAgICAgX3RyaWdnZXJDaGFuZ2Uob2xkU3RhdGUsIG5ld1N0YXRlKSB7XG4gICAgICAgICAgICBpZiAob2xkU3RhdGUgIT09IG5ld1N0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIEVkaXRvclN5bnRheFN0YXR1cy5Nb2RlbCA9IE1vZGVsO1xufSkoRWRpdG9yU3ludGF4U3RhdHVzIHx8IChFZGl0b3JTeW50YXhTdGF0dXMgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3ludGF4c3RhdHVzLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuLyogdHNsaW50OmRpc2FibGUgKi9cbi8qKlxuICogVGhlIENvZGVNaXJyb3IgdG9rZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBJQ29kZU1pcnJvciA9IG5ldyBUb2tlbignQGp1cHl0ZXJsYWIvY29kZW1pcnJvcjpJQ29kZU1pcnJvcicpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9rZW5zLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=