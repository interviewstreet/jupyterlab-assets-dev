(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_toc_lib_index_js"],{

/***/ "../../packages/toc/lib/generators/index.js":
/*!**************************************************!*\
  !*** ../../packages/toc/lib/generators/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createLatexGenerator": () => (/* reexport safe */ _latex__WEBPACK_IMPORTED_MODULE_0__.createLatexGenerator),
/* harmony export */   "createMarkdownGenerator": () => (/* reexport safe */ _markdown__WEBPACK_IMPORTED_MODULE_1__.createMarkdownGenerator),
/* harmony export */   "createRenderedMarkdownGenerator": () => (/* reexport safe */ _markdown__WEBPACK_IMPORTED_MODULE_1__.createRenderedMarkdownGenerator),
/* harmony export */   "createNotebookGenerator": () => (/* reexport safe */ _notebook__WEBPACK_IMPORTED_MODULE_2__.createNotebookGenerator),
/* harmony export */   "createPythonGenerator": () => (/* reexport safe */ _python__WEBPACK_IMPORTED_MODULE_3__.createPythonGenerator)
/* harmony export */ });
/* harmony import */ var _latex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./latex */ "../../packages/toc/lib/generators/latex/index.js");
/* harmony import */ var _markdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./markdown */ "../../packages/toc/lib/generators/markdown/index.js");
/* harmony import */ var _notebook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notebook */ "../../packages/toc/lib/generators/notebook/index.js");
/* harmony import */ var _python__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./python */ "../../packages/toc/lib/generators/python/index.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
// Note: keep in alphabetical order...




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/latex/index.js":
/*!********************************************************!*\
  !*** ../../packages/toc/lib/generators/latex/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createLatexGenerator": () => (/* binding */ createLatexGenerator)
/* harmony export */ });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * Maps LaTeX section headings to HTML header levels.
 *
 * ## Notes
 *
 * -   As `part` and `chapter` section headings appear to be less common, assign them to heading level 1.
 *
 * @private
 */
const LATEX_LEVELS = {
    part: 1,
    chapter: 1,
    section: 1,
    subsection: 2,
    subsubsection: 3,
    paragraph: 4,
    subparagraph: 5
};
/**
 * Converts array elements to "entries".
 *
 * @private
 * @param arr - input array
 * @returns input array
 *
 * @example
 * const arr = toEntries([4,5,6]);
 * // returns [[4,0], [5,1], [6,2]]
 */
function toEntries(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = [arr[i], i];
    }
    return arr;
}
/**
 * Returns a boolean indicating whether this ToC generator is enabled.
 *
 * @private
 * @param editor - editor widget
 * @returns boolean indicating whether this ToC generator is enabled
 */
function isEnabled(editor) {
    // Only enable this if the editor MIME type matches one of a few LaTeX variants:
    let mime = editor.content.model.mimeType;
    return mime === 'text/x-latex' || mime === 'text/x-stex';
}
/**
 * Generates a table of contents.
 *
 * @private
 * @param editor - editor widget
 * @returns a list of headings
 */
function generate(editor) {
    // Split the text into lines:
    let lines = editor.content.model.value.text.split('\n');
    // Convert the list into "entries" so we can use the line number to scroll the editor upon ToC item click:
    lines = toEntries(lines);
    // Iterate over the lines to get the heading level and text for each line:
    let headings = [];
    for (let i = 0; i < lines.length; i++) {
        const RE = /^\s*\\(section|subsection|subsubsection){(.+)}/;
        const match = lines[i][0].match(RE);
        if (match) {
            headings.push({
                text: match[2],
                level: LATEX_LEVELS[match[1]],
                onClick: onClick(lines[i][1])
            });
        }
    }
    return headings;
    /**
     * Returns a "click" handler.
     *
     * @private
     * @param line - line number
     * @returns click handler
     */
    function onClick(line) {
        return () => {
            editor.content.editor.setCursorPosition({
                line: line,
                column: 0
            });
        };
    }
}
/**
 * Returns a ToC generator for LaTeX files.
 *
 * @private
 * @param tracker - file editor tracker
 * @returns ToC generator capable of parsing LaTeX files
 */
function createLatexGenerator(tracker) {
    return {
        tracker,
        usesLatex: true,
        isEnabled: isEnabled,
        generate: generate
    };
}
/**
 * Exports.
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/markdown/get_headings.js":
/*!******************************************************************!*\
  !*** ../../packages/toc/lib/generators/markdown/get_headings.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getHeadings": () => (/* binding */ getHeadings)
/* harmony export */ });
/* harmony import */ var _utils_generate_numbering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/generate_numbering */ "../../packages/toc/lib/utils/generate_numbering.js");
/* harmony import */ var _utils_parse_heading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/parse_heading */ "../../packages/toc/lib/utils/parse_heading.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * Parses a provided string and returns a list of headings.
 *
 * @private
 * @param text - input text
 * @param onClick - callback which returns a "click" handler
 * @param dict - numbering dictionary
 * @param numberingH1 - whether first level header should be numbered
 * @returns list of headings
 */
function getHeadings(text, onClick, dict, numberingH1) {
    // Split the text into lines:
    const lines = text.split('\n');
    // Iterate over the lines to get the header level and text for each line:
    let headings = [];
    let FLG;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        // Don't check for Markdown headings if in a code block:
        if (line.indexOf('```') === 0) {
            FLG = !FLG;
        }
        if (FLG) {
            continue;
        }
        line += lines[i + 1] ? '\n' + lines[i + 1] : '';
        const heading = (0,_utils_parse_heading__WEBPACK_IMPORTED_MODULE_0__.parseHeading)(line); // append the next line to capture alternative style Markdown headings
        if (heading) {
            let level = heading.level;
            if (!numberingH1) {
                level -= 1;
            }
            headings.push({
                text: heading.text,
                numbering: (0,_utils_generate_numbering__WEBPACK_IMPORTED_MODULE_1__.generateNumbering)(dict, level),
                level: heading.level,
                onClick: onClick(i)
            });
        }
    }
    return headings;
}
/**
 * Exports.
 */

//# sourceMappingURL=get_headings.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/markdown/get_rendered_headings.js":
/*!***************************************************************************!*\
  !*** ../../packages/toc/lib/generators/markdown/get_rendered_headings.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRenderedHeadings": () => (/* binding */ getRenderedHeadings)
/* harmony export */ });
/* harmony import */ var _utils_generate_numbering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/generate_numbering */ "../../packages/toc/lib/utils/generate_numbering.js");
/* harmony import */ var _utils_sanitizer_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/sanitizer_options */ "../../packages/toc/lib/utils/sanitizer_options.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * Returns a "click" handler.
 *
 * @private
 * @param heading - heading element
 * @returns "click" handler
 */
function onClick(heading) {
    return () => {
        heading.scrollIntoView();
    };
}
/**
 * Processes an HTML element containing rendered Markdown and returns a list of headings.
 *
 * @private
 * @param node - HTML element
 * @param sanitizer - HTML sanitizer
 * @param dict - numbering dictionary
 * @param numbering - boolean indicating whether to enable numbering
 * @param numberingH1 - whether first level header should be numbered
 * @returns list of headings
 */
function getRenderedHeadings(node, sanitizer, dict, numbering = true, numberingH1 = true) {
    let nodes = node.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let headings = [];
    for (let i = 0; i < nodes.length; i++) {
        const heading = nodes[i];
        let level = parseInt(heading.tagName[1], 10);
        let text = heading.textContent ? heading.textContent : '';
        let hide = !numbering;
        // Show/hide numbering DOM element based on user settings:
        if (heading.getElementsByClassName('numbering-entry').length > 0) {
            heading.removeChild(heading.getElementsByClassName('numbering-entry')[0]);
        }
        let html = sanitizer.sanitize(heading.innerHTML, _utils_sanitizer_options__WEBPACK_IMPORTED_MODULE_0__.sanitizerOptions);
        html = html.replace('¶', ''); // remove the anchor symbol
        // Generate a numbering string:
        if (!numberingH1) {
            level -= 1;
        }
        let nstr = (0,_utils_generate_numbering__WEBPACK_IMPORTED_MODULE_1__.generateNumbering)(dict, level);
        // Generate the numbering DOM element:
        let nhtml = '';
        if (!hide) {
            nhtml = '<span class="numbering-entry">' + nstr + '</span>';
        }
        // Append the numbering element to the document:
        heading.innerHTML = nhtml + html;
        headings.push({
            level,
            text: text.replace('¶', ''),
            numbering: nstr,
            html,
            onClick: onClick(heading)
        });
    }
    return headings;
}
/**
 * Exports.
 */

//# sourceMappingURL=get_rendered_headings.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/markdown/index.js":
/*!***********************************************************!*\
  !*** ../../packages/toc/lib/generators/markdown/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMarkdownGenerator": () => (/* binding */ createMarkdownGenerator),
/* harmony export */   "createRenderedMarkdownGenerator": () => (/* binding */ createRenderedMarkdownGenerator)
/* harmony export */ });
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_is_markdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/is_markdown */ "../../packages/toc/lib/utils/is_markdown.js");
/* harmony import */ var _options_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./options_manager */ "../../packages/toc/lib/generators/markdown/options_manager.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./render */ "../../packages/toc/lib/generators/markdown/render.js");
/* harmony import */ var _toolbar_generator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toolbar_generator */ "../../packages/toc/lib/generators/markdown/toolbar_generator.js");
/* harmony import */ var _get_headings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get_headings */ "../../packages/toc/lib/generators/markdown/get_headings.js");
/* harmony import */ var _get_rendered_headings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./get_rendered_headings */ "../../packages/toc/lib/generators/markdown/get_rendered_headings.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







/**
 * Returns a boolean indicating whether this ToC generator is enabled.
 *
 * @private
 * @param editor - editor widget
 * @returns boolean indicating whether this ToC generator is enabled
 */
function isEnabled(editor) {
    // Only enable this if the editor MIME type matches one of a few Markdown variants:
    return (0,_utils_is_markdown__WEBPACK_IMPORTED_MODULE_1__.isMarkdown)(editor.content.model.mimeType);
}
/**
 * Generates a table of contents.
 *
 * @private
 * @param editor - editor widget
 * @param options - manage Markdown ToC generator options
 * @returns a list of headings
 */
function generate(editor, options) {
    let dict = {};
    let numberingH1 = true;
    if (options !== undefined) {
        numberingH1 = options.numberingH1;
    }
    return (0,_get_headings__WEBPACK_IMPORTED_MODULE_2__.getHeadings)(editor.content.model.value.text, onClick, dict, numberingH1);
    /**
     * Returns a "click" handler.
     *
     * @private
     * @param line - line number
     * @returns click handler
     */
    function onClick(line) {
        return () => {
            editor.content.editor.setCursorPosition({
                line: line,
                column: 0
            });
        };
    }
}
/**
 * Returns a ToC generator for Markdown files.
 *
 * @private
 * @param tracker - file editor tracker
 * @param widget - table of contents widget
 * @param sanitizer - HTML sanitizer
 * @param settings - advanced settings for toc extension
 * @returns ToC generator capable of parsing Markdown files
 */
function createMarkdownGenerator(tracker, widget, sanitizer, translator, settings) {
    let numberingH1 = true;
    if (settings) {
        numberingH1 = settings.composite.numberingH1;
    }
    const options = new _options_manager__WEBPACK_IMPORTED_MODULE_3__.OptionsManager(widget, {
        numbering: true,
        numberingH1: numberingH1,
        sanitizer,
        translator: translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator
    });
    if (settings) {
        settings.changed.connect(() => {
            options.numberingH1 = settings.composite.numberingH1;
        });
    }
    return {
        tracker,
        usesLatex: true,
        options: options,
        toolbarGenerator: generateToolbar,
        itemRenderer: renderItem,
        isEnabled: isEnabled,
        generate: generate
    };
    /**
     * Returns a toolbar generator.
     *
     * @private
     * @returns toolbar generator
     */
    function generateToolbar() {
        return (0,_toolbar_generator__WEBPACK_IMPORTED_MODULE_4__.toolbar)(options);
    }
    /**
     * Renders a table of contents item.
     *
     * @private
     * @param item - heading to render
     * @returns rendered item
     */
    function renderItem(item) {
        return (0,_render__WEBPACK_IMPORTED_MODULE_5__.render)(options, item);
    }
}
/**
 * Returns a ToC generator for rendered Markdown files.
 *
 * @param tracker - Markdown viewer tracker
 * @param sanitizer - HTML sanitizer
 * @param widget - table of contents widget
 * @param settings - advanced settings for toc extension
 * @returns ToC generator capable of parsing rendered Markdown files
 */
function createRenderedMarkdownGenerator(tracker, widget, sanitizer, translator, settings) {
    let numberingH1 = true;
    if (settings) {
        numberingH1 = settings.composite.numberingH1;
    }
    const options = new _options_manager__WEBPACK_IMPORTED_MODULE_3__.OptionsManager(widget, {
        numbering: true,
        numberingH1: numberingH1,
        sanitizer,
        translator: translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator
    });
    if (settings) {
        settings.changed.connect(() => {
            options.numberingH1 = settings.composite.numberingH1;
        });
    }
    return {
        tracker,
        usesLatex: true,
        options: options,
        toolbarGenerator: generateToolbar,
        itemRenderer: renderItem,
        generate: generate
    };
    /**
     * Returns a toolbar generator.
     *
     * @private
     * @returns toolbar generator
     */
    function generateToolbar() {
        return (0,_toolbar_generator__WEBPACK_IMPORTED_MODULE_4__.toolbar)(options);
    }
    /**
     * Renders a table of contents item.
     *
     * @private
     * @param item - heading to render
     * @returns rendered item
     */
    function renderItem(item) {
        return (0,_render__WEBPACK_IMPORTED_MODULE_5__.render)(options, item);
    }
    /**
     * Generates a table of contents.
     *
     * @private
     * @param widget - Markdown document widget
     * @returns a list of headings
     */
    function generate(widget) {
        let dict = {};
        return (0,_get_rendered_headings__WEBPACK_IMPORTED_MODULE_6__.getRenderedHeadings)(widget.content.node, sanitizer, dict, options.numbering, options.numberingH1);
    }
}
/**
 * Exports.
 */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/markdown/options_manager.js":
/*!*********************************************************************!*\
  !*** ../../packages/toc/lib/generators/markdown/options_manager.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OptionsManager": () => (/* binding */ OptionsManager)
/* harmony export */ });
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * Class for managing Markdown ToC generator options.
 *
 * @private
 */
class OptionsManager {
    /**
     * Returns an options manager.
     *
     * @param widget - table of contents widget
     * @param options - generator options
     * @returns options manager
     */
    constructor(widget, options) {
        this._numbering = options.numbering;
        this._numberingH1 = options.numberingH1;
        this._widget = widget;
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator;
        this.sanitizer = options.sanitizer;
    }
    /**
     * Gets/sets ToC generator numbering.
     */
    set numbering(value) {
        this._numbering = value;
        this._widget.update();
    }
    get numbering() {
        return this._numbering;
    }
    /**
     * Gets/sets ToC generator numbering h1 headers.
     */
    set numberingH1(value) {
        if (this._numberingH1 != value) {
            this._numberingH1 = value;
            this._widget.update();
        }
    }
    get numberingH1() {
        return this._numberingH1;
    }
    /**
     * Initializes options.
     *
     * ## Notes
     *
     * -  This will **not** change notebook meta-data.
     *
     * @param numbering - boolean indicating whether to number items
     */
    initializeOptions(numbering, numberingH1) {
        this._numbering = numbering;
        this._numberingH1 = numberingH1;
        this._widget.update();
    }
}
/**
 * Exports.
 */

//# sourceMappingURL=options_manager.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/markdown/render.js":
/*!************************************************************!*\
  !*** ../../packages/toc/lib/generators/markdown/render.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_sanitizer_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/sanitizer_options */ "../../packages/toc/lib/utils/sanitizer_options.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * Renders a Markdown table of contents item.
 *
 * @private
 * @param options - generator options
 * @param item - numbered heading
 * @returns rendered item
 */
function render(options, item) {
    let fontSizeClass = 'toc-level-size-' + item.level;
    // Render item numbering:
    let numbering = item.numbering && options.numbering ? item.numbering : '';
    // Render the item:
    let jsx;
    if (item.html) {
        let html = options.sanitizer.sanitize(item.html, _utils_sanitizer_options__WEBPACK_IMPORTED_MODULE_1__.sanitizerOptions);
        jsx = (react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { dangerouslySetInnerHTML: { __html: numbering + html }, className: 'toc-markdown-cell ' + fontSizeClass }));
    }
    else {
        jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: fontSizeClass },
            " ",
            numbering + item.text);
    }
    return jsx;
}
/**
 * Exports.
 */

//# sourceMappingURL=render.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/markdown/toolbar_generator.js":
/*!***********************************************************************!*\
  !*** ../../packages/toc/lib/generators/markdown/toolbar_generator.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toolbar": () => (/* binding */ toolbar)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * Returns a component for rendering a Markdown table of contents toolbar.
 *
 * @private
 * @param options - generator options
 * @returns toolbar component
 */
function toolbar(options) {
    return class Toolbar extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
        /**
         * Returns a component for rendering a Markdown table of contents toolbar.
         *
         * @param props - toolbar properties
         * @returns toolbar component
         */
        constructor(props) {
            super(props);
            this.state = { numbering: false };
            options.initializeOptions(false, options.numberingH1);
            this._trans = options.translator.load('jupyterlab');
        }
        /**
         * Renders a toolbar.
         *
         * @returns rendered toolbar
         */
        render() {
            const toggleNumbering = () => {
                options.numbering = !options.numbering;
                this.setState({ numbering: options.numbering });
            };
            const icon = (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { onClick: event => toggleNumbering(), role: "text", "aria-label": this._trans.__('Toggle Auto-Numbering'), title: this._trans.__('Toggle Auto-Numbering'), className: this.state.numbering
                    ? 'toc-toolbar-icon-selected'
                    : 'toc-toolbar-icon' },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.numberingIcon.react, null)));
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: 'toc-toolbar' }, icon)));
        }
    };
}
/**
 * Exports.
 */

//# sourceMappingURL=toolbar_generator.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/notebook/append_collapsible_heading.js":
/*!********************************************************************************!*\
  !*** ../../packages/toc/lib/generators/notebook/append_collapsible_heading.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appendCollapsibleHeading": () => (/* binding */ appendCollapsibleHeading)
/* harmony export */ });
/* harmony import */ var _is_heading_filtered__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is_heading_filtered */ "../../packages/toc/lib/generators/notebook/is_heading_filtered.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * Appends a collapsible notebook heading to a list of headings.
 *
 * @private
 * @param headings - list of notebook headings
 * @param heading - rendered heading
 * @param prev - previous heading
 * @param collapseLevel - collapse level
 * @param tags - filter tags
 * @param collapsed - boolean indicating whether a heading is collapsed
 * @param cellCollapseMetadata - indicates which metadata string to use based on the cellSyncSetting
 * @returns result tuple
 */
function appendCollapsibleHeading(headings, heading, prev, collapseLevel, tags, collapsed, cellCollapseMetadata) {
    const len = headings.length;
    if (!(0,_is_heading_filtered__WEBPACK_IMPORTED_MODULE_0__.isHeadingFiltered)(heading, tags)) {
        // If the previous heading is a higher level heading, update the heading to note that it has a child heading...
        if (prev && prev.type === 'header' && prev.level < heading.level) {
            for (let j = len - 1; j >= 0; j--) {
                if (headings[j] === prev) {
                    // TODO: can a heading be the child of multiple headings? If not, we can `break` here upon finding a parent heading, so we don't traverse the entire heading list...
                    headings[j].hasChild = true;
                }
            }
        }
        // If the collapse level doesn't include the heading, or, if there is no collapsing, add to headings and adjust the collapse level...
        if (collapseLevel >= heading.level || collapseLevel < 0) {
            headings.push(heading);
            collapseLevel = collapsed ? heading.level : -1;
        }
        prev = heading;
    }
    else if (prev && heading.level <= prev.level) {
        // If the heading is filtered out and has a lower level previous heading, determine if the heading has a parent...
        let parent = false;
        let k = len - 1;
        for (; k >= 0; k--) {
            if (headings[k].level < heading.level) {
                prev = headings[k];
                parent = true;
                break;
            }
        }
        // If there is no parent, reset collapsing...
        if (parent) {
            const isCollapsed = headings[k + 1].cellRef.model.metadata.get(cellCollapseMetadata);
            collapseLevel = isCollapsed ? headings[k + 1].level : -1;
        }
        else {
            prev = null;
            collapseLevel = -1;
        }
    }
    return [headings, prev, collapseLevel];
}
/**
 * Exports.
 */

//# sourceMappingURL=append_collapsible_heading.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/notebook/append_heading.js":
/*!********************************************************************!*\
  !*** ../../packages/toc/lib/generators/notebook/append_heading.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appendHeading": () => (/* binding */ appendHeading)
/* harmony export */ });
/* harmony import */ var _is_heading_filtered__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is_heading_filtered */ "../../packages/toc/lib/generators/notebook/is_heading_filtered.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * Appends a notebook heading to a list of headings.
 *
 * @private
 * @param headings - list of notebook headings
 * @param heading - rendered heading
 * @param prev - previous heading
 * @param collapseLevel - collapse level
 * @param tags - filter tags
 * @returns result tuple
 */
function appendHeading(headings, heading, prev, collapseLevel, tags) {
    if (heading && !(0,_is_heading_filtered__WEBPACK_IMPORTED_MODULE_0__.isHeadingFiltered)(heading, tags) && heading.text) {
        // Determine whether this heading is a child of a "header" notebook heading...
        if (prev && prev.type === 'header') {
            for (let j = headings.length - 1; j >= 0; j--) {
                if (headings[j] === prev) {
                    // TODO: can a heading be the child of multiple headings? If not, we can `break` here upon finding a parent heading, so we don't traverse the entire heading list...
                    headings[j].hasChild = true;
                }
            }
        }
        if (collapseLevel < 0) {
            headings.push(heading);
        }
        prev = heading;
    }
    return [headings, prev];
}
//# sourceMappingURL=append_heading.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/notebook/append_markdown_heading.js":
/*!*****************************************************************************!*\
  !*** ../../packages/toc/lib/generators/notebook/append_markdown_heading.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appendMarkdownHeading": () => (/* binding */ appendMarkdownHeading)
/* harmony export */ });
/* harmony import */ var _append_collapsible_heading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./append_collapsible_heading */ "../../packages/toc/lib/generators/notebook/append_collapsible_heading.js");
/* harmony import */ var _append_heading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./append_heading */ "../../packages/toc/lib/generators/notebook/append_heading.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * Appends a Markdown notebook heading to a list of headings.
 *
 * @private
 * @param headings - list of notebook headings
 * @param heading - rendered heading
 * @param prev - previous heading
 * @param collapseLevel - collapse level
 * @param tags - filter tags
 * @param collapsed - boolean indicating whether a heading is collapsed
 * @param showMarkdown - boolean indicating whether to show Markdown previews
 * @param cellCollapseMetadata - indicates which metadata string to use based on the cellSyncSetting
 * @returns result tuple
 */
function appendMarkdownHeading(heading, headings, prev, collapseLevel, tags, collapsed, showMarkdown, cellCollapseMetadata) {
    if (heading && heading.type === 'markdown' && showMarkdown) {
        // Append a Markdown preview heading:
        [headings, prev] = (0,_append_heading__WEBPACK_IMPORTED_MODULE_0__.appendHeading)(headings, heading, prev, collapseLevel, tags);
    }
    else if (heading && heading.type === 'header') {
        [headings, prev, collapseLevel] = (0,_append_collapsible_heading__WEBPACK_IMPORTED_MODULE_1__.appendCollapsibleHeading)(headings, heading, prev, collapseLevel, tags, collapsed, cellCollapseMetadata);
    }
    return [headings, prev, collapseLevel];
}
/**
 * Exports.
 */

//# sourceMappingURL=append_markdown_heading.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/notebook/codemirror.js":
/*!****************************************************************!*\
  !*** ../../packages/toc/lib/generators/notebook/codemirror.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CodeComponent": () => (/* binding */ CodeComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_sanitizer_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/sanitizer_options */ "../../packages/toc/lib/utils/sanitizer_options.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * Class for rendering a code component.
 *
 * @private
 */
class CodeComponent extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    /**
     * Returns a code component.
     *
     * @param props - component properties
     * @returns code component
     */
    constructor(props) {
        super(props);
        this.state = { heading: props.heading };
    }
    /**
     * Updates code component state.
     *
     * @param props - component properties
     */
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ heading: nextProps.heading });
    }
    /**
     * Renders a code component.
     *
     * @returns rendered component
     */
    render() {
        // Get the current rendered CodeMirror:
        let html = this.state.heading.cellRef.editor.host.innerHTML;
        // Sanitize the HTML:
        html = this.props.sanitizer.sanitize(html, _utils_sanitizer_options__WEBPACK_IMPORTED_MODULE_1__.sanitizerOptions);
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "cm-toc", dangerouslySetInnerHTML: { __html: html } }));
    }
}
/**
 * Exports.
 */

//# sourceMappingURL=codemirror.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/notebook/get_code_cell_heading.js":
/*!***************************************************************************!*\
  !*** ../../packages/toc/lib/generators/notebook/get_code_cell_heading.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCodeCellHeading": () => (/* binding */ getCodeCellHeading)
/* harmony export */ });
/* harmony import */ var _utils_headings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/headings */ "../../packages/toc/lib/utils/headings.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * Returns a code entry notebook heading from a code string.
 *
 * @private
 * @param text - code string
 * @param onClick - callback which returns a "click" handler
 * @param executionCount - execution count
 * @param lastLevel - last heading level
 * @param cellRef - cell reference
 * @param index - index of referenced cell relative to other cells in the notebook
 * @returns notebook heading
 */
function getCodeCellHeading(text, onClick, executionCount, lastLevel, cellRef, index = -1, isRunning = _utils_headings__WEBPACK_IMPORTED_MODULE_0__.RunningStatus.Idle) {
    let headings = [];
    if (index === -1) {
        console.warn('Deprecation warning! index argument will become mandatory in the next version');
    }
    if (text) {
        const lines = text.split('\n');
        const len = Math.min(lines.length, 3);
        let str = '';
        let i = 0;
        for (; i < len - 1; i++) {
            str += lines[i] + '\n';
        }
        str += lines[i];
        headings.push({
            text: str,
            level: lastLevel + 1,
            onClick: onClick(0),
            type: 'code',
            prompt: executionCount,
            cellRef: cellRef,
            hasChild: false,
            index: index,
            isRunning
        });
    }
    return headings[0];
}
/**
 * Exports.
 */

//# sourceMappingURL=get_code_cell_heading.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/notebook/get_last_heading_level.js":
/*!****************************************************************************!*\
  !*** ../../packages/toc/lib/generators/notebook/get_last_heading_level.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLastHeadingLevel": () => (/* binding */ getLastHeadingLevel)
/* harmony export */ });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * Returns the last heading level.
 *
 * @private
 * @param headings - list of notebook headings
 * @returns heading level
 */
function getLastHeadingLevel(headings) {
    if (headings.length > 0) {
        let loc = headings.length - 1;
        while (loc >= 0) {
            if (headings[loc].type === 'header') {
                return headings[loc].level;
            }
            loc -= 1;
        }
    }
    return 0;
}
/**
 * Exports.
 */

//# sourceMappingURL=get_last_heading_level.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/notebook/get_markdown_heading.js":
/*!**************************************************************************!*\
  !*** ../../packages/toc/lib/generators/notebook/get_markdown_heading.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMarkdownHeadings": () => (/* binding */ getMarkdownHeadings)
/* harmony export */ });
/* harmony import */ var _utils_generate_numbering__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/generate_numbering */ "../../packages/toc/lib/utils/generate_numbering.js");
/* harmony import */ var _utils_headings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/headings */ "../../packages/toc/lib/utils/headings.js");
/* harmony import */ var _utils_parse_heading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/parse_heading */ "../../packages/toc/lib/utils/parse_heading.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * Parses a Markdown string and returns a notebook heading.
 *
 * @private
 * @param text - Markdown string
 * @param onClick - callback which returns a "click" handler
 * @param dict - numbering dictionary
 * @param lastLevel - last level
 * @param cellRef - cell reference
 * @param index - index of referenced cell relative to other cells in the notebook
 * @returns notebook heading
 */
function getMarkdownHeadings(text, onClick, dict, lastLevel, cellRef, index = -1, isRunning = _utils_headings__WEBPACK_IMPORTED_MODULE_0__.RunningStatus.Idle) {
    const callback = onClick(0);
    let headings = [];
    if (index === -1) {
        console.warn('Deprecation warning! index argument will become mandatory in the next version');
    }
    for (const line of text.split('\n')) {
        if (line) {
            const heading = (0,_utils_parse_heading__WEBPACK_IMPORTED_MODULE_1__.parseHeading)(line);
            if (heading) {
                headings.push({
                    text: heading.text,
                    level: heading.level,
                    numbering: (0,_utils_generate_numbering__WEBPACK_IMPORTED_MODULE_2__.generateNumbering)(dict, heading.level),
                    onClick: callback,
                    type: 'header',
                    cellRef: cellRef,
                    hasChild: false,
                    isRunning,
                    index
                });
            }
            else {
                headings.push({
                    text: line,
                    level: lastLevel + 1,
                    onClick: callback,
                    type: 'markdown',
                    cellRef: cellRef,
                    hasChild: false,
                    isRunning,
                    index
                });
            }
        }
    }
    return headings;
}
/**
 * Exports.
 */

//# sourceMappingURL=get_markdown_heading.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/notebook/get_rendered_html_heading.js":
/*!*******************************************************************************!*\
  !*** ../../packages/toc/lib/generators/notebook/get_rendered_html_heading.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRenderedHTMLHeadings": () => (/* binding */ getRenderedHTMLHeadings)
/* harmony export */ });
/* harmony import */ var _utils_generate_numbering__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/generate_numbering */ "../../packages/toc/lib/utils/generate_numbering.js");
/* harmony import */ var _utils_headings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/headings */ "../../packages/toc/lib/utils/headings.js");
/* harmony import */ var _utils_sanitizer_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/sanitizer_options */ "../../packages/toc/lib/utils/sanitizer_options.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * Returns a notebook heading from an HTML element.
 *
 * @private
 * @param node - HTML element
 * @param onClick - callback which returns a "click" handler
 * @param dict - numbering dictionary
 * @param lastLevel - last level
 * @param numbering - boolean indicating whether to enable numbering
 * @param numberingH1 - boolean indicating whether to enable first level headers numbering
 * @param cellRef - cell reference
 * @param index - index of referenced cell relative to other cells in the notebook
 * @returns notebook heading
 */
function getRenderedHTMLHeadings(node, onClick, sanitizer, dict, lastLevel, numbering = false, numberingH1 = true, cellRef, index = -1, isRunning = _utils_headings__WEBPACK_IMPORTED_MODULE_0__.RunningStatus.Idle) {
    let nodes = node.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
    if (index === -1) {
        console.warn('Deprecation warning! index argument will become mandatory in the next version');
    }
    let headings = [];
    for (const el of nodes) {
        if (el.classList.contains('jp-toc-ignore')) {
            // skip this element if a special class name is included
            continue;
        }
        if (el.nodeName.toLowerCase() === 'p') {
            if (el.innerHTML) {
                let html = sanitizer.sanitize(el.innerHTML, _utils_sanitizer_options__WEBPACK_IMPORTED_MODULE_1__.sanitizerOptions);
                headings.push({
                    level: lastLevel + 1,
                    html: html.replace('¶', ''),
                    text: el.textContent ? el.textContent : '',
                    onClick: onClick(el),
                    type: 'markdown',
                    cellRef: cellRef,
                    hasChild: false,
                    index: index,
                    isRunning
                });
            }
            continue;
        }
        if (el.getElementsByClassName('numbering-entry').length > 0) {
            el.removeChild(el.getElementsByClassName('numbering-entry')[0]);
        }
        let html = sanitizer.sanitize(el.innerHTML, _utils_sanitizer_options__WEBPACK_IMPORTED_MODULE_1__.sanitizerOptions);
        html = html.replace('¶', '');
        let level = parseInt(el.tagName[1], 10);
        if (!numberingH1) {
            level -= 1;
        }
        let nstr = (0,_utils_generate_numbering__WEBPACK_IMPORTED_MODULE_2__.generateNumbering)(dict, level);
        if (numbering) {
            const nhtml = document.createElement('span');
            nhtml.classList.add('numbering-entry');
            nhtml.textContent = nstr !== null && nstr !== void 0 ? nstr : '';
            el.insertBefore(nhtml, el.firstChild);
        }
        headings.push({
            level: level,
            text: el.textContent ? el.textContent : '',
            numbering: nstr,
            html: html,
            onClick: onClick(el),
            type: 'header',
            cellRef: cellRef,
            hasChild: false,
            index: index,
            isRunning
        });
    }
    return headings;
}
/**
 * Exports.
 */

//# sourceMappingURL=get_rendered_html_heading.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/notebook/index.js":
/*!***********************************************************!*\
  !*** ../../packages/toc/lib/generators/notebook/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createNotebookGenerator": () => (/* binding */ createNotebookGenerator)
/* harmony export */ });
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/cells */ "webpack/sharing/consume/default/@jupyterlab/cells/@jupyterlab/cells");
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_is_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/is_dom */ "../../packages/toc/lib/utils/is_dom.js");
/* harmony import */ var _utils_is_markdown__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/is_markdown */ "../../packages/toc/lib/utils/is_markdown.js");
/* harmony import */ var _append_heading__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./append_heading */ "../../packages/toc/lib/generators/notebook/append_heading.js");
/* harmony import */ var _append_markdown_heading__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./append_markdown_heading */ "../../packages/toc/lib/generators/notebook/append_markdown_heading.js");
/* harmony import */ var _get_code_cell_heading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./get_code_cell_heading */ "../../packages/toc/lib/generators/notebook/get_code_cell_heading.js");
/* harmony import */ var _get_last_heading_level__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./get_last_heading_level */ "../../packages/toc/lib/generators/notebook/get_last_heading_level.js");
/* harmony import */ var _get_markdown_heading__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./get_markdown_heading */ "../../packages/toc/lib/generators/notebook/get_markdown_heading.js");
/* harmony import */ var _get_rendered_html_heading__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./get_rendered_html_heading */ "../../packages/toc/lib/generators/notebook/get_rendered_html_heading.js");
/* harmony import */ var _options_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./options_manager */ "../../packages/toc/lib/generators/notebook/options_manager.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ "../../packages/toc/lib/generators/notebook/render.js");
/* harmony import */ var _toolbar_generator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toolbar_generator */ "../../packages/toc/lib/generators/notebook/toolbar_generator.js");
/* harmony import */ var _utils_headings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/headings */ "../../packages/toc/lib/utils/headings.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.















/**
 * Returns a ToC generator for notebooks.
 *
 * @param tracker - notebook tracker
 * @param widget - table of contents widget
 * @param sanitizer - HTML sanitizer
 * @param translator - Language translator
 * @param settings - advanced settings for toc extension
 * @returns ToC generator capable of parsing notebooks
 */
function createNotebookGenerator(tracker, widget, sanitizer, translator, settings) {
    return new NotebookGenerator(tracker, widget, sanitizer, translator, settings);
}
class NotebookGenerator {
    /**
     * Notebook Table of Content Generator constructor
     *
     * @param tracker - notebook tracker
     * @param widget - table of contents widget
     * @param sanitizer - HTML sanitizer
     * @param translator - Language translator
     * @param settings - advanced settings for toc extension
     */
    constructor(tracker, widget, sanitizer, translator, settings) {
        /**
         * Renders a table of contents item.
         *
         * @param item - heading to render
         * @param toc - list of all headers to render
         * @returns rendered item
         */
        this.itemRenderer = (item, toc = []) => {
            return (0,_render__WEBPACK_IMPORTED_MODULE_3__.render)(this.options, this.tracker, this.widget, item, toc);
        };
        this.sanitizer = sanitizer;
        this.tracker = tracker;
        this.widget = widget;
        this._runningCells = new Array();
        let numberingH1 = true;
        let includeOutput = true;
        let syncCollapseState = false;
        if (settings) {
            numberingH1 = settings.composite.numberingH1;
            includeOutput = settings.composite.includeOutput;
            syncCollapseState = settings.composite.syncCollapseState;
        }
        const options = (this.options = new _options_manager__WEBPACK_IMPORTED_MODULE_4__.OptionsManager(widget, tracker, {
            numbering: false,
            numberingH1: numberingH1,
            includeOutput: includeOutput,
            syncCollapseState: syncCollapseState,
            sanitizer: sanitizer,
            translator: translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator
        }));
        if (settings) {
            settings.changed.connect(() => {
                options.numberingH1 = settings.composite.numberingH1;
                options.includeOutput = settings.composite.includeOutput;
                options.syncCollapseState = settings.composite
                    .syncCollapseState;
            });
        }
        tracker.activeCellChanged.connect((sender, args) => {
            widget.update();
        });
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.executionScheduled.connect((_, args) => {
            if (!this._runningCells.includes(args.cell)) {
                this._runningCells.push(args.cell);
            }
        });
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.executed.connect((_, args) => {
            this._runningCells.forEach((cell, index) => {
                if (cell === args.cell) {
                    this._runningCells.splice(index, 1);
                }
            });
        });
    }
    /**
     * Signal to indicate that a collapse event happened to this heading
     * within the ToC.
     */
    get collapseChanged() {
        return this.options.collapseChanged;
    }
    /**
     * Returns a toolbar generator.
     *
     * @returns toolbar generator
     */
    toolbarGenerator() {
        return (0,_toolbar_generator__WEBPACK_IMPORTED_MODULE_5__.toolbar)(this.options, this.tracker);
    }
    /**
     * Generates a table of contents.
     *
     * @param panel - notebook widget
     * @returns a list of headings
     */
    generate(panel) {
        var _a;
        let headings = [];
        let collapseLevel = -1;
        let dict = {};
        // Initialize a variable for keeping track of the previous heading:
        let prev = null;
        // Generate headings by iterating through all notebook cells...
        for (let i = 0; i < panel.content.widgets.length; i++) {
            let cell = panel.content.widgets[i];
            let model = cell.model;
            let cellCollapseMetadata = this.options.syncCollapseState
                ? _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.MARKDOWN_HEADING_COLLAPSED
                : 'toc-hr-collapsed';
            const collapsed = (_a = model.metadata.get(cellCollapseMetadata)) !== null && _a !== void 0 ? _a : false;
            const isRunning = this._runningCells.includes(cell)
                ? this._runningCells[0] === cell
                    ? _utils_headings__WEBPACK_IMPORTED_MODULE_6__.RunningStatus.Running
                    : _utils_headings__WEBPACK_IMPORTED_MODULE_6__.RunningStatus.Scheduled
                : _utils_headings__WEBPACK_IMPORTED_MODULE_6__.RunningStatus.Idle;
            switch (model.type) {
                case 'code': {
                    if (!this.widget || (this.widget && this.options.showCode)) {
                        const onClick = (line) => {
                            return () => {
                                panel.content.activeCellIndex = i;
                                cell.node.scrollIntoView();
                            };
                        };
                        const count = cell.model.executionCount;
                        const executionIndicator = count !== null && count !== void 0 ? count : (isRunning !== _utils_headings__WEBPACK_IMPORTED_MODULE_6__.RunningStatus.Idle ? '*' : ' ');
                        let executionCount = `[${executionIndicator}]: `;
                        let heading = (0,_get_code_cell_heading__WEBPACK_IMPORTED_MODULE_7__.getCodeCellHeading)(model.value.text, onClick, executionCount, (0,_get_last_heading_level__WEBPACK_IMPORTED_MODULE_8__.getLastHeadingLevel)(headings), cell, i, isRunning);
                        [headings, prev] = (0,_append_heading__WEBPACK_IMPORTED_MODULE_9__.appendHeading)(headings, heading, prev, collapseLevel, this.options.filtered);
                    }
                    if (this.options.includeOutput) {
                        // Iterate over the code cell outputs to check for Markdown or HTML from which we can generate ToC headings...
                        for (let j = 0; j < model.outputs.length; j++) {
                            const m = model.outputs.get(j);
                            let dtypes = Object.keys(m.data);
                            dtypes = dtypes.filter(t => (0,_utils_is_markdown__WEBPACK_IMPORTED_MODULE_10__.isMarkdown)(t) || (0,_utils_is_dom__WEBPACK_IMPORTED_MODULE_11__.isDOM)(t));
                            if (!dtypes.length) {
                                continue;
                            }
                            const onClick = (el) => {
                                return () => {
                                    panel.content.activeCellIndex = i;
                                    panel.content.mode = 'command';
                                    el.scrollIntoView();
                                };
                            };
                            let htmlHeadings = (0,_get_rendered_html_heading__WEBPACK_IMPORTED_MODULE_12__.getRenderedHTMLHeadings)(cell.outputArea.widgets[j].node, onClick, this.sanitizer, dict, (0,_get_last_heading_level__WEBPACK_IMPORTED_MODULE_8__.getLastHeadingLevel)(headings), this.options.numbering, this.options.numberingH1, cell, i, isRunning);
                            for (const heading of htmlHeadings) {
                                [headings, prev, collapseLevel] = (0,_append_markdown_heading__WEBPACK_IMPORTED_MODULE_13__.appendMarkdownHeading)(heading, headings, prev, collapseLevel, this.options.filtered, collapsed, this.options.showMarkdown, cellCollapseMetadata);
                            }
                        }
                    }
                    break;
                }
                case 'markdown': {
                    let mcell = cell;
                    let heading;
                    let lastLevel = (0,_get_last_heading_level__WEBPACK_IMPORTED_MODULE_8__.getLastHeadingLevel)(headings);
                    // If the cell is rendered, generate the ToC items from the HTML...
                    if (mcell.rendered && !mcell.inputHidden) {
                        const onClick = (el) => {
                            return () => {
                                if (!mcell.rendered) {
                                    panel.content.activeCellIndex = i;
                                    el.scrollIntoView();
                                }
                                else {
                                    panel.content.mode = 'command';
                                    cell.node.scrollIntoView();
                                    panel.content.activeCellIndex = i;
                                }
                            };
                        };
                        const htmlHeadings = (0,_get_rendered_html_heading__WEBPACK_IMPORTED_MODULE_12__.getRenderedHTMLHeadings)(cell.node, onClick, this.sanitizer, dict, lastLevel, this.options.numbering, this.options.numberingH1, cell, i, isRunning);
                        for (heading of htmlHeadings) {
                            [headings, prev, collapseLevel] = (0,_append_markdown_heading__WEBPACK_IMPORTED_MODULE_13__.appendMarkdownHeading)(heading, headings, prev, collapseLevel, this.options.filtered, collapsed, this.options.showMarkdown, cellCollapseMetadata);
                        }
                        // If not rendered, generate ToC items from the cell text...
                    }
                    else {
                        const onClick = (line) => {
                            return () => {
                                panel.content.activeCellIndex = i;
                                cell.node.scrollIntoView();
                            };
                        };
                        const markdownHeadings = (0,_get_markdown_heading__WEBPACK_IMPORTED_MODULE_14__.getMarkdownHeadings)(model.value.text, onClick, dict, lastLevel, cell, i, isRunning);
                        for (heading of markdownHeadings) {
                            [headings, prev, collapseLevel] = (0,_append_markdown_heading__WEBPACK_IMPORTED_MODULE_13__.appendMarkdownHeading)(heading, headings, prev, collapseLevel, this.options.filtered, collapsed, this.options.showMarkdown, cellCollapseMetadata);
                        }
                    }
                    break;
                }
            }
            // Must be done afterwards as `heading.hasChild` needs to be up to date.
            const lastHeading = headings[headings.length - 1];
            if (lastHeading) {
                lastHeading.isRunning = Math.max(lastHeading.isRunning, isRunning);
            }
        }
        return headings;
    }
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/notebook/is_heading_filtered.js":
/*!*************************************************************************!*\
  !*** ../../packages/toc/lib/generators/notebook/is_heading_filtered.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isHeadingFiltered": () => (/* binding */ isHeadingFiltered)
/* harmony export */ });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * Returns a boolean indicating whether a heading is filtered out by selected tags.
 *
 * @private
 * @param heading - notebook heading
 * @param tags - list of tags
 * @returns boolean indicating whether a heading is filtered
 */
function isHeadingFiltered(heading, tags) {
    if (tags.length === 0) {
        return false;
    }
    if (heading && heading.cellRef) {
        let meta = heading.cellRef.model.metadata;
        let ctags = meta.get('tags');
        if (ctags) {
            for (let j = 0; j < ctags.length; j++) {
                let name = ctags[j];
                for (let k = 0; k < tags.length; k++) {
                    if (tags[k] === name) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}
/**
 * Exports.
 */

//# sourceMappingURL=is_heading_filtered.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/notebook/options_manager.js":
/*!*********************************************************************!*\
  !*** ../../packages/toc/lib/generators/notebook/options_manager.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OptionsManager": () => (/* binding */ OptionsManager)
/* harmony export */ });
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_1__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * Class for managing notebook ToC generator options.
 *
 * @private
 */
class OptionsManager {
    /**
     * Returns an options manager.
     *
     * @param widget - table of contents widget
     * @param notebook - notebook tracker
     * @param options - generator options
     * @returns options manager
     */
    constructor(widget, notebook, options) {
        this._preRenderedToolbar = null;
        this._filtered = [];
        this._showCode = false;
        this._showMarkdown = false;
        this._showTags = false;
        this._tagTool = null;
        this._numbering = options.numbering;
        this._numberingH1 = options.numberingH1;
        this._includeOutput = options.includeOutput;
        this._syncCollapseState = options.syncCollapseState;
        this._widget = widget;
        this._notebook = notebook;
        this.sanitizer = options.sanitizer;
        this.storeTags = [];
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator;
        this._collapseChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
    }
    /**
     * Gets/sets the tag tool component.
     */
    set tagTool(tagTool) {
        this._tagTool = tagTool;
    }
    get tagTool() {
        return this._tagTool;
    }
    /**
     * Sets notebook meta data.
     */
    set notebookMetadata(value) {
        if (this._notebook.currentWidget != null) {
            this._notebook.currentWidget.model.metadata.set(value[0], value[1]);
        }
    }
    /**
     * Gets/sets ToC generator numbering.
     */
    set numbering(value) {
        this._numbering = value;
        this._widget.update();
        this.notebookMetadata = ['toc-autonumbering', this._numbering];
    }
    get numbering() {
        return this._numbering;
    }
    /**
     * Gets/sets ToC generator numbering h1 headers.
     */
    set numberingH1(value) {
        if (this._numberingH1 != value) {
            this._numberingH1 = value;
            this._widget.update();
        }
    }
    get numberingH1() {
        return this._numberingH1;
    }
    /**
     * Toggles whether cell outputs should be included in headings.
     */
    set includeOutput(value) {
        if (this._includeOutput != value) {
            this._includeOutput = value;
            this._widget.update();
        }
    }
    get includeOutput() {
        return this._includeOutput;
    }
    /**
     * Gets/sets option for ToC heading collapsing to be reflected in Notebook and vice versa
     */
    set syncCollapseState(value) {
        if (this._syncCollapseState != value) {
            this._syncCollapseState = value;
            this._widget.update();
        }
    }
    get syncCollapseState() {
        return this._syncCollapseState;
    }
    /**
     * Toggles whether to show code previews in the table of contents.
     */
    set showCode(value) {
        this._showCode = value;
        this.notebookMetadata = ['toc-showcode', this._showCode];
        this._widget.update();
    }
    get showCode() {
        return this._showCode;
    }
    /**
     * Toggles whether to show Markdown previews in the table of contents.
     */
    set showMarkdown(value) {
        this._showMarkdown = value;
        this.notebookMetadata = ['toc-showmarkdowntxt', this._showMarkdown];
        this._widget.update();
    }
    get showMarkdown() {
        return this._showMarkdown;
    }
    /**
     * Signal emitted when a "collapse" twist button is pressed in the ToC
     */
    get collapseChanged() {
        return this._collapseChanged;
    }
    /**
     * Toggles whether to show tags in the table of contents.
     */
    set showTags(value) {
        this._showTags = value;
        this.notebookMetadata = ['toc-showtags', this._showTags];
        this._widget.update();
    }
    get showTags() {
        return this._showTags;
    }
    /**
     * Returns a list of selected tags.
     */
    get filtered() {
        if (this.tagTool) {
            this._filtered = this.tagTool.filtered;
        }
        else if (this.storeTags.length > 0) {
            this._filtered = this.storeTags;
        }
        else {
            this._filtered = [];
        }
        return this._filtered;
    }
    /**
     * Gets/sets a pre-rendered a toolbar.
     */
    set preRenderedToolbar(value) {
        this._preRenderedToolbar = value;
    }
    get preRenderedToolbar() {
        return this._preRenderedToolbar;
    }
    /**
     * Updates a table of contents widget.
     */
    updateWidget() {
        this._widget.update();
    }
    /**
     * Updates a table of contents widget and
     * emits a signal in case an extension wants
     * to perform an action when the collapse button
     * is pressed.
     */
    updateAndCollapse(args) {
        this._collapseChanged.emit(args);
        this._widget.update();
    }
    /**
     * Initializes options.
     *
     * ## Notes
     *
     * -  This will **not** change notebook meta-data.
     *
     * @param numbering - boolean indicating whether to number items
     * @param numberingH1 - boolean indicating whether to number first level items
     * @param includeOutput - boolean indicating whether cell outputs should be included in headings
     * @param syncCollapseState - boolean indicating whether collapsing in ToC should be reflected in Notebook and vice versa
     * @param showCode - boolean indicating whether to show code previews
     * @param showMarkdown - boolean indicating whether to show Markdown previews
     * @param showTags - boolean indicating whether to show tags
     */
    initializeOptions(numbering, numberingH1, includeOutput, syncCollapseState, showCode, showMarkdown, showTags) {
        this._numbering = numbering;
        this._numberingH1 = numberingH1;
        this._includeOutput = includeOutput;
        this._syncCollapseState = syncCollapseState;
        this._showCode = showCode;
        this._showMarkdown = showMarkdown;
        this._showTags = showTags;
        this._widget.update();
    }
}
/**
 * Exports.
 */

//# sourceMappingURL=options_manager.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/notebook/render.js":
/*!************************************************************!*\
  !*** ../../packages/toc/lib/generators/notebook/render.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/cells */ "webpack/sharing/consume/default/@jupyterlab/cells/@jupyterlab/cells");
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/domutils */ "webpack/sharing/consume/default/@lumino/domutils/@lumino/domutils");
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_domutils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_sanitizer_options__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/sanitizer_options */ "../../packages/toc/lib/utils/sanitizer_options.js");
/* harmony import */ var _codemirror__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./codemirror */ "../../packages/toc/lib/generators/notebook/codemirror.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







/**
 * Class name of the toc item list.
 *
 * @private
 */
const TOC_TREE_CLASS = 'jp-TableOfContents-content';
/**
 * Renders a notebook table of contents item.
 *
 * @param options - generator options
 * @param tracker - notebook tracker
 * @param item - notebook heading
 * @param toc - current list of notebook headings
 * @returns rendered item
 */
function render(options, tracker, widget, item, toc = []) {
    if (item.type === 'markdown' || item.type === 'header') {
        const fontSizeClass = item.type === 'header'
            ? `toc-level-size-${item.level}`
            : 'toc-level-size-default';
        const numbering = item.numbering && options.numbering ? item.numbering : '';
        const cellCollapseMetadata = options.syncCollapseState
            ? _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.MARKDOWN_HEADING_COLLAPSED
            : 'toc-hr-collapsed';
        if (item.type === 'header' || options.showMarkdown) {
            const header = item.html ? (react__WEBPACK_IMPORTED_MODULE_4__.createElement("span", { dangerouslySetInnerHTML: {
                    __html: numbering +
                        options.sanitizer.sanitize(item.html, _utils_sanitizer_options__WEBPACK_IMPORTED_MODULE_5__.sanitizerOptions)
                }, className: `${item.type}-cell toc-cell-item` })) : (react__WEBPACK_IMPORTED_MODULE_4__.createElement("span", { className: `${item.type}-cell toc-cell-item` }, numbering + item.text));
            if (item.type === 'header') {
                let button = (react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: "jp-Collapser p-Widget lm-Widget", onClick: (event) => {
                        event.stopPropagation();
                        onClick(tracker, cellCollapseMetadata, item);
                    } },
                    react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: "toc-Collapser-child" })));
                let collapsed;
                if (item.cellRef.model.metadata.has(cellCollapseMetadata)) {
                    collapsed = item.cellRef.model.metadata.get(cellCollapseMetadata);
                }
                let ellipseButton = collapsed ? (react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: "toc-Ellipses", onClick: (event) => {
                        event.stopPropagation();
                        onClick(tracker, cellCollapseMetadata, item);
                    } },
                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.ellipsesIcon.react, null))) : null;
                return (react__WEBPACK_IMPORTED_MODULE_4__.createElement(NotebookHeading, { isActive: tracker.activeCell === item.cellRef ||
                        previousHeader(tracker, item, toc), className: 'toc-entry-holder ' +
                        fontSizeClass +
                        (tracker.activeCell === item.cellRef
                            ? ' toc-active-cell'
                            : previousHeader(tracker, item, toc)
                                ? ' toc-active-cell'
                                : ''), isRunning: item.isRunning, area: widget.node.querySelector(`.${TOC_TREE_CLASS}`) },
                    button,
                    header,
                    ellipseButton));
            }
            else {
                return header;
            }
        }
    }
    if (options.showCode && item.type === 'code') {
        // Render code cells:
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: "toc-code-cell-div" },
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: "toc-code-cell-prompt" }, item.prompt),
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("span", { className: 'toc-code-span' },
                react__WEBPACK_IMPORTED_MODULE_4__.createElement(_codemirror__WEBPACK_IMPORTED_MODULE_6__.CodeComponent, { sanitizer: options.sanitizer, heading: item }))));
    }
    return null;
    /**
     * Callback invoked upon encountering a "click" event.
     *
     * @private
     * @param heading - notebook heading that was clicked
     */
    function onClick(tracker, cellCollapseMetadata, heading) {
        let collapsed = false;
        let syncCollapseState = options.syncCollapseState;
        if (heading.cellRef.model.metadata.get(cellCollapseMetadata)) {
            collapsed = heading.cellRef.model.metadata.get(cellCollapseMetadata);
        }
        if (heading) {
            if (syncCollapseState) {
                // if collapse state is synced, update state here
                if (tracker.currentWidget) {
                    _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.setHeadingCollapse(heading.cellRef, !collapsed, tracker.currentWidget.content);
                }
            }
            else {
                if (collapsed) {
                    heading.cellRef.model.metadata.delete(cellCollapseMetadata);
                }
                else {
                    heading.cellRef.model.metadata.set(cellCollapseMetadata, true);
                }
            }
            options.updateAndCollapse({
                heading: heading,
                collapsedState: collapsed,
                tocType: 'notebook'
            });
        }
        else {
            options.updateWidget();
        }
    }
}
/**
 * Used to find the nearest above heading to an active notebook cell
 *
 * @private
 * @param tracker - notebook tracker
 * @param item - notebook heading
 * @param toc - current list of notebook headings
 * @returns true if heading is nearest above a selected cell, otherwise false
 */
function previousHeader(tracker, item, toc) {
    if (item.index > -1 || (toc === null || toc === void 0 ? void 0 : toc.length)) {
        let activeCellIndex = tracker.currentWidget.content.activeCellIndex;
        let headerIndex = item.index;
        // header index has to be less than the active cell index
        if (headerIndex < activeCellIndex) {
            let tocIndexOfNextHeader = toc.indexOf(item) + 1;
            // return true if header is the last header
            if (tocIndexOfNextHeader >= toc.length) {
                return true;
            }
            // return true if the next header cells index is greater than the active cells index
            let nextHeaderIndex = toc === null || toc === void 0 ? void 0 : toc[tocIndexOfNextHeader].index;
            if (nextHeaderIndex > activeCellIndex) {
                return true;
            }
        }
    }
    return false;
}
/**
 * React component for a single toc heading
 *
 * @private
 */
function NotebookHeading(props) {
    const itemRef = react__WEBPACK_IMPORTED_MODULE_4__.useRef(null);
    const isActive = props.isActive;
    react__WEBPACK_IMPORTED_MODULE_4__.useEffect(() => {
        if (isActive && itemRef.current && props.area) {
            _lumino_domutils__WEBPACK_IMPORTED_MODULE_3__.ElementExt.scrollIntoViewIfNeeded(props.area, itemRef.current.parentElement);
        }
    }, [isActive]);
    return (react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { ref: itemRef, className: (0,_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.classes)(props.className, isActive ? 'toc-active-cell' : ''), "data-running": props.isRunning }, props.children));
}
//# sourceMappingURL=render.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/notebook/tagstool/index.js":
/*!********************************************************************!*\
  !*** ../../packages/toc/lib/generators/notebook/tagstool/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TagsToolComponent": () => (/* binding */ TagsToolComponent)
/* harmony export */ });
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tag_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tag_list */ "../../packages/toc/lib/generators/notebook/tagstool/tag_list.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * Tag dropdown React component.
 *
 * @private
 */
class TagsToolComponent extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    /**
     * Returns a component.
     *
     * @param props - component properties
     * @returns component
     */
    constructor(props) {
        super(props);
        /**
         * Changes the dropdown selection state.
         *
         * @param newState - new state
         * @param add - boolean indicating whether to add to selection
         */
        this.changeSelectionState = (newState, add) => {
            let tags = this.state.selected;
            if (add) {
                tags.push(newState);
                this.setState({ selected: tags });
                this.filterTags(tags);
            }
            else {
                let selected = [];
                for (let i = 0; i < tags.length; i++) {
                    if (tags[i] !== newState) {
                        selected.push(tags[i]);
                    }
                }
                this.setState({ selected: selected });
                this.filterTags(selected);
            }
        };
        /**
         * De-selects all tags in the dropdown and clear filters in the ToC.
         */
        this.deselectAll = () => {
            this.setState({ selected: [] });
            this.props.options.updateWidget();
        };
        /**
         * Select all the cells that contains all of the current tags and activates the first of those cells.
         */
        this.selectAllCellsWithCurrentTags = () => {
            const tags = this.state.selected;
            const panel = this.props.tracker.currentWidget;
            const widgets = panel === null || panel === void 0 ? void 0 : panel.content.widgets;
            panel === null || panel === void 0 ? void 0 : panel.content.deselectAll();
            let changedActive = false;
            widgets === null || widgets === void 0 ? void 0 : widgets.forEach((cell, ix) => {
                const hasAllCurrentTags = tags.every(tag => this.containsTag(tag, cell));
                if (hasAllCurrentTags) {
                    if (!changedActive) {
                        if (panel) {
                            panel.content.activeCellIndex = ix;
                        }
                        changedActive = true;
                    }
                    panel === null || panel === void 0 ? void 0 : panel.content.select(cell);
                }
            });
        };
        /**
         * Filters the ToC by according to selected tags.
         *
         * @param selected - selected tags
         */
        this.filterTags = (selected) => {
            this.setState({ selected });
            this.props.options.updateWidget();
        };
        /**
         * Updates filters.
         */
        this.updateFilters = () => {
            let tmp = [];
            let idx = 0;
            let update = false;
            for (let i = 0; i < this.state.selected.length; i++) {
                if (this.props.tags.indexOf(this.state.selected[i]) > -1) {
                    tmp[idx] = this.state.selected[i];
                    idx += 1;
                }
                else if (this.props.options.showTags === true) {
                    update = true;
                }
            }
            if (update) {
                this.filterTags(tmp);
                this.setState({ selected: tmp });
            }
        };
        this.state = {
            selected: this.props.inputFilter
        };
        const translator = this.props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator;
        this._trans = translator.load('jupyterlab');
    }
    /**
     * Returns a list of selected tags.
     *
     * @returns tag list
     */
    get filtered() {
        return this.state.selected;
    }
    /**
     * Checks whether a cell has a provided tag.
     *
     * @param tag - tag
     * @param cell - cell reference
     * @returns boolean indicating whether a cell has a provided tag
     */
    containsTag(tag, cell) {
        if (cell === null) {
            return false;
        }
        let tagList = cell.model.metadata.get('tags');
        if (tagList) {
            for (let i = 0; i < tagList.length; i++) {
                if (tagList[i] === tag) {
                    return true;
                }
            }
            return false;
        }
    }
    /**
     * Updates filters.
     */
    UNSAFE_componentWillUpdate() {
        this.updateFilters();
    }
    /**
     * Renders the interior of the tag dropdown.
     *
     * @returns rendered component
     */
    render() {
        let jsx = (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "toc-no-tags-div" }, this._trans.__('No Tags Available')));
        let text;
        if (this.state.selected.length === 0) {
            text = (react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: 'toc-filter-button-na' }, this._trans.__('Clear Filters')));
        }
        else if (this.state.selected.length === 1) {
            text = (react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: 'toc-filter-button', onClick: () => this.deselectAll() },
                ' ',
                "Clear 1 Filter",
                ' '));
        }
        else {
            text = (react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: 'toc-filter-button', onClick: () => this.deselectAll() },
                ' ',
                "Clear ",
                this.state.selected.length,
                " Filters",
                ' '));
        }
        let command;
        if (this.state.selected.length === 0) {
            command = (react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: 'toc-filter-button-na', role: "text", "aria-label": this._trans.__('Select All Cells With Current Tags'), title: this._trans.__('Select All Cells With Current Tags') }, this._trans.__('Select All Cells With Current Tags')));
        }
        else {
            command = (react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: 'toc-filter-button', role: "button", "aria-label": this._trans.__('Select All Cells With Current Tags'), title: this._trans.__('Select All Cells With Current Tags'), onClick: this.selectAllCellsWithCurrentTags, onKeyDown: this.selectAllCellsWithCurrentTags }, this._trans.__('Select All Cells With Current Tags')));
        }
        if (this.props.tags && this.props.tags.length > 0) {
            jsx = (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: 'toc-tags-container' },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_tag_list__WEBPACK_IMPORTED_MODULE_2__.TagListComponent, { tags: this.props.tags, selectionStateHandler: this.changeSelectionState, selectedTags: this.state.selected }),
                text,
                command));
        }
        return jsx;
    }
}
/**
 * Exports.
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/notebook/tagstool/tag.js":
/*!******************************************************************!*\
  !*** ../../packages/toc/lib/generators/notebook/tagstool/tag.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TagComponent": () => (/* binding */ TagComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * Abstract class defining a React component containing one tag label.
 *
 * @private
 */
class TagComponent extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    /**
     * Returns a React component.
     *
     * @param props - properties
     * @returns component
     */
    constructor(props) {
        super(props);
    }
    /**
     * Renders a component.
     *
     * @returns rendered component
     */
    render() {
        const tag = this.props.tag;
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { className: "toc-tag-label", key: new Date().toLocaleTimeString() }, tag)));
    }
}
/**
 * Exports.
 */

//# sourceMappingURL=tag.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/notebook/tagstool/tag_list.js":
/*!***********************************************************************!*\
  !*** ../../packages/toc/lib/generators/notebook/tagstool/tag_list.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TagListComponent": () => (/* binding */ TagListComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tag */ "../../packages/toc/lib/generators/notebook/tagstool/tag.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * Class for a React component that renders all tags in a list.
 *
 * @private
 */
class TagListComponent extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    /**
     * Returns a React component.
     *
     * @param props - properties
     * @returns component
     */
    constructor(props) {
        super(props);
        /**
         * Toggles whether a tag is selected when clicked.
         *
         * @param name - tag name
         */
        this.selectedTagWithName = (name) => {
            if (this.props.selectedTags.indexOf(name) >= 0) {
                this.props.selectionStateHandler(name, false);
            }
            else {
                this.props.selectionStateHandler(name, true);
            }
        };
        /**
         * Renders a tag component for each tag within a list of tags.
         *
         * @param tags - list of tags
         */
        this.renderTagComponents = (tags) => {
            const selectedTags = this.props.selectedTags;
            const selectedTagWithName = this.selectedTagWithName;
            return tags.map((tag, index) => {
                const tagClass = selectedTags.indexOf(tag) >= 0
                    ? 'toc-selected-tag toc-tag'
                    : 'toc-unselected-tag toc-tag';
                return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { key: tag, className: tagClass, onClick: event => {
                        selectedTagWithName(tag);
                    }, tabIndex: 0 },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_tag__WEBPACK_IMPORTED_MODULE_1__.TagComponent, { selectionStateHandler: this.props.selectionStateHandler, selectedTags: this.props.selectedTags, tag: tag })));
            });
        };
        this.state = { selected: this.props.selectedTags };
    }
    /**
     * Renders the list of tags in the ToC tags dropdown.
     *
     * @returns rendered list
     */
    render() {
        let tags = this.props.tags;
        let jsx = null;
        if (tags) {
            jsx = this.renderTagComponents(tags);
        }
        return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "toc-tag-holder" }, jsx);
    }
}
/**
 * Exports.
 */

//# sourceMappingURL=tag_list.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/notebook/toolbar_generator.js":
/*!***********************************************************************!*\
  !*** ../../packages/toc/lib/generators/notebook/toolbar_generator.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toolbar": () => (/* binding */ toolbar)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tagstool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tagstool */ "../../packages/toc/lib/generators/notebook/tagstool/index.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * Returns a component for rendering a notebook table of contents toolbar.
 *
 * @private
 * @param options - generator options
 * @param tracker - notebook tracker
 * @returns toolbar component
 */
function toolbar(options, tracker) {
    return class Toolbar extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
        /**
         * Returns a component for rendering a notebook table of contents toolbar.
         *
         * @param props - toolbar properties
         * @returns toolbar component
         */
        constructor(props) {
            super(props);
            this._trans = options.translator.load('jupyterlab');
            this.tagTool = null;
            this.state = {
                showCode: true,
                showMarkdown: false,
                showTags: false,
                numbering: false
            };
            if (tracker.currentWidget) {
                // Read saved user settings in notebook meta data:
                void tracker.currentWidget.context.ready.then(() => {
                    if (tracker.currentWidget) {
                        tracker.currentWidget.content.activeCellChanged.connect(() => {
                            options.updateWidget();
                        });
                        const numbering = tracker.currentWidget.model.metadata.get('toc-autonumbering');
                        const showCode = tracker.currentWidget.model.metadata.get('toc-showcode');
                        const showMarkdown = tracker.currentWidget.model.metadata.get('toc-showmarkdowntxt');
                        const showTags = tracker.currentWidget.model.metadata.get('toc-showtags');
                        options.initializeOptions(numbering || options.numbering, options.numberingH1, options.includeOutput, options.syncCollapseState, showCode || options.showCode, showMarkdown || options.showMarkdown, showTags || options.showTags);
                        this.setState({
                            showCode: options.showCode,
                            showMarkdown: options.showMarkdown,
                            showTags: options.showTags,
                            numbering: options.numbering
                        });
                        this.tags = [];
                    }
                });
            }
        }
        /**
         * Toggle whether to show code previews.
         */
        toggleCode() {
            options.showCode = !options.showCode;
            this.setState({ showCode: options.showCode });
        }
        /**
         * Toggle whether to show Markdown previews.
         */
        toggleMarkdown() {
            options.showMarkdown = !options.showMarkdown;
            this.setState({ showMarkdown: options.showMarkdown });
        }
        /**
         * Toggle whether to number headings.
         */
        toggleNumbering() {
            options.numbering = !options.numbering;
            this.setState({ numbering: options.numbering });
        }
        /**
         * Toggle tag dropdown.
         */
        toggleTagDropdown() {
            if (options.showTags && this.tagTool) {
                options.storeTags = this.tagTool.state.selected;
            }
            options.showTags = !options.showTags;
            this.setState({ showTags: options.showTags });
        }
        /**
         * Loads all document tags.
         */
        loadTags() {
            const notebook = tracker.currentWidget;
            if (notebook) {
                const cells = notebook.model.cells;
                const tags = new Set();
                this.tags = [];
                for (let i = 0; i < cells.length; i++) {
                    const cell = cells.get(i);
                    const list = cell.metadata.get('tags');
                    if (Array.isArray(list)) {
                        list.forEach((tag) => tag && tags.add(tag));
                    }
                }
                this.tags = Array.from(tags);
            }
        }
        /**
         * Renders a toolbar.
         *
         * @returns rendered toolbar
         */
        render() {
            const codeToggleIcon = (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { onClick: event => this.toggleCode(), role: "text", "aria-label": this._trans.__('Toggle Code Cells'), title: this._trans.__('Toggle Code Cells'), className: this.state.showCode
                    ? 'toc-toolbar-code-icon toc-toolbar-icon-selected'
                    : 'toc-toolbar-code-icon toc-toolbar-icon' },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.codeIcon.react, null)));
            const markdownToggleIcon = (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { onClick: event => this.toggleMarkdown(), role: "text", "aria-label": this._trans.__('Toggle Markdown Text Cells'), title: this._trans.__('Toggle Markdown Text Cells'), className: this.state.showMarkdown
                    ? 'toc-toolbar-icon-selected'
                    : 'toc-toolbar-icon' },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.markdownIcon.react, null)));
            const numberingToggleIcon = (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { onClick: event => this.toggleNumbering(), role: "text", "aria-label": this._trans.__('Toggle Auto-Numbering'), title: this._trans.__('Toggle Auto-Numbering'), className: this.state.numbering
                    ? 'toc-toolbar-icon-selected'
                    : 'toc-toolbar-icon' },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.numberingIcon.react, null)));
            let tagDropdown = react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null);
            let tagToggleIcon = (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { role: "text", "aria-label": this._trans.__('Show Tags Menu'), title: this._trans.__('Show Tags Menu'), className: this.state.showTags
                    ? 'toc-toolbar-icon-selected'
                    : 'toc-toolbar-icon' },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.tagIcon.react, null)));
            if (this.state.showTags) {
                this.loadTags();
                const tagTool = (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_tagstool__WEBPACK_IMPORTED_MODULE_2__.TagsToolComponent, { tags: this.tags, tracker: tracker, options: options, inputFilter: options.storeTags, translator: options.translator, ref: tagTool => (this.tagTool = tagTool) }));
                options.tagTool = this.tagTool;
                tagDropdown = react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: 'toc-tag-dropdown' },
                    " ",
                    tagTool,
                    " ");
            }
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: 'toc-toolbar' },
                    codeToggleIcon,
                    markdownToggleIcon,
                    numberingToggleIcon,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: 'toc-tag-dropdown-button', onClick: event => this.toggleTagDropdown() }, tagToggleIcon)),
                tagDropdown));
        }
    };
}
/**
 * Exports.
 */

//# sourceMappingURL=toolbar_generator.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/python/index.js":
/*!*********************************************************!*\
  !*** ../../packages/toc/lib/generators/python/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPythonGenerator": () => (/* binding */ createPythonGenerator)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "../../packages/toc/lib/generators/python/render.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * Generates a table of contents.
 *
 * @private
 * @param editor - editor widget
 * @returns a list of headings
 */
function generate(editor) {
    // Split the text into lines:
    let lines = editor.content.model.value.text.split('\n');
    // Iterate over the lines to get the heading level and text for each line:
    let headings = [];
    let processingImports = false;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line.indexOf('def ') === 0) {
            processingImports = false;
            headings.push({
                text: line.slice(0, -1),
                level: 2,
                onClick: onClick(i)
            });
        }
        else if (line.indexOf('class ') === 0) {
            processingImports = false;
            headings.push({
                text: line.slice(0, -1),
                level: 1,
                onClick: onClick(i)
            });
        }
        else if (line.indexOf('import ') == 0 && !processingImports) {
            processingImports = true;
            headings.push({
                text: line,
                level: 2,
                onClick: onClick(i)
            });
        }
    }
    return headings;
    /**
     * Returns a "click" handler.
     *
     * @private
     * @param line - line number
     * @returns click handler
     */
    function onClick(line) {
        return () => {
            editor.content.editor.setCursorPosition({
                line: line,
                column: 0
            });
        };
    }
}
/**
 * Returns a boolean indicating whether this ToC generator is enabled.
 *
 * @private
 * @param editor - editor widget
 * @returns boolean indicating whether this ToC generator is enabled
 */
function isEnabled(editor) {
    let mime = editor.content.model.mimeType;
    return mime === 'application/x-python-code' || mime === 'text/x-python';
}
/**
 * Returns a ToC generator for Python files.
 *
 * @private
 * @param tracker - file editor tracker
 * @returns ToC generator capable of parsing Python files
 */
function createPythonGenerator(tracker) {
    return {
        tracker,
        isEnabled: isEnabled,
        itemRenderer: _render__WEBPACK_IMPORTED_MODULE_0__.render,
        generate: generate
    };
}
/**
 * Exports.
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/toc/lib/generators/python/render.js":
/*!**********************************************************!*\
  !*** ../../packages/toc/lib/generators/python/render.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * Renders a Python table of contents item.
 *
 * @private
 * @param item - numbered heading
 * @returns rendered item
 */
function render(item) {
    let fontSizeClass = 'toc-level-size-' + item.level;
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: fontSizeClass + ' toc-entry-holder' },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "jp-Collapser p-Widget lm-Widget" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "toc-Collapser-child" })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "header-cell toc-cell-item" },
            " ",
            item.text,
            " ")));
}
/**
 * Exports.
 */

//# sourceMappingURL=render.js.map

/***/ }),

/***/ "../../packages/toc/lib/index.js":
/*!***************************************!*\
  !*** ../../packages/toc/lib/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createLatexGenerator": () => (/* reexport safe */ _generators__WEBPACK_IMPORTED_MODULE_0__.createLatexGenerator),
/* harmony export */   "createMarkdownGenerator": () => (/* reexport safe */ _generators__WEBPACK_IMPORTED_MODULE_0__.createMarkdownGenerator),
/* harmony export */   "createNotebookGenerator": () => (/* reexport safe */ _generators__WEBPACK_IMPORTED_MODULE_0__.createNotebookGenerator),
/* harmony export */   "createPythonGenerator": () => (/* reexport safe */ _generators__WEBPACK_IMPORTED_MODULE_0__.createPythonGenerator),
/* harmony export */   "createRenderedMarkdownGenerator": () => (/* reexport safe */ _generators__WEBPACK_IMPORTED_MODULE_0__.createRenderedMarkdownGenerator),
/* harmony export */   "ITableOfContentsRegistry": () => (/* reexport safe */ _registry__WEBPACK_IMPORTED_MODULE_1__.ITableOfContentsRegistry),
/* harmony export */   "TableOfContentsRegistry": () => (/* reexport safe */ _registry__WEBPACK_IMPORTED_MODULE_1__.TableOfContentsRegistry),
/* harmony export */   "TableOfContents": () => (/* reexport safe */ _toc__WEBPACK_IMPORTED_MODULE_2__.TableOfContents),
/* harmony export */   "TOCItem": () => (/* reexport safe */ _toc_item__WEBPACK_IMPORTED_MODULE_3__.TOCItem),
/* harmony export */   "RunningStatus": () => (/* reexport safe */ _utils_headings__WEBPACK_IMPORTED_MODULE_4__.RunningStatus),
/* harmony export */   "isNotebookHeading": () => (/* reexport safe */ _utils_headings__WEBPACK_IMPORTED_MODULE_4__.isNotebookHeading)
/* harmony export */ });
/* harmony import */ var _generators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generators */ "../../packages/toc/lib/generators/index.js");
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./registry */ "../../packages/toc/lib/registry.js");
/* harmony import */ var _toc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toc */ "../../packages/toc/lib/toc.js");
/* harmony import */ var _toc_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toc_item */ "../../packages/toc/lib/toc_item.js");
/* harmony import */ var _utils_headings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/headings */ "../../packages/toc/lib/utils/headings.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module toc
 */
// Note: keep in alphabetical order...





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/toc/lib/registry.js":
/*!******************************************!*\
  !*** ../../packages/toc/lib/registry.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ITableOfContentsRegistry": () => (/* binding */ ITableOfContentsRegistry),
/* harmony export */   "TableOfContentsRegistry": () => (/* binding */ TableOfContentsRegistry)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_1__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/* tslint:disable */
/**
 * Table of contents registry token.
 */
const ITableOfContentsRegistry = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/toc:ITableOfContentsRegistry');
/* tslint:enable */
/**
 * Class for registering widgets for which we can generate a table of contents.
 */
class TableOfContentsRegistry {
    constructor() {
        this._collapseChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
        this._generators = [];
    }
    /**
     * Finds a table of contents generator for a widget.
     *
     * ## Notes
     *
     * -   If unable to find a table of contents generator, the method return `undefined`.
     *
     * @param widget - widget
     * @returns table of contents generator
     */
    find(widget) {
        for (let i = 0; i < this._generators.length; i++) {
            const gen = this._generators[i];
            if (gen.tracker.has(widget)) {
                if (gen.isEnabled && !gen.isEnabled(widget)) {
                    continue;
                }
                return gen;
            }
        }
    }
    /**
     * Adds a table of contents generator to the registry.
     *
     * @param generator - table of contents generator
     */
    add(generator) {
        if (generator.collapseChanged) {
            // If there is a collapseChanged for a given generator, propagate the arguments through the registry's signal
            generator.collapseChanged.connect((sender, args) => {
                this._collapseChanged.emit(args);
            });
        }
        this._generators.push(generator);
    }
    get collapseChanged() {
        return this._collapseChanged;
    }
}
//# sourceMappingURL=registry.js.map

/***/ }),

/***/ "../../packages/toc/lib/toc.js":
/*!*************************************!*\
  !*** ../../packages/toc/lib/toc.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableOfContents": () => (/* binding */ TableOfContents)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom */ "webpack/sharing/consume/default/react-dom/react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _toc_tree__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./toc_tree */ "../../packages/toc/lib/toc_tree.js");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_5__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







/**
 * Timeout for throttling ToC rendering.
 *
 * @private
 */
const RENDER_TIMEOUT = 1000;
/**
 * Widget for hosting a notebook table of contents.
 */
class TableOfContents extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget {
    /**
     * Returns a new table of contents.
     *
     * @param options - options
     * @returns widget
     */
    constructor(options) {
        super();
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this._docmanager = options.docmanager;
        this._rendermime = options.rendermime;
        this._trans = this.translator.load('jupyterlab');
        this._headings = [];
        this._entryClicked = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_5__.Signal(this);
        this._entryClicked.connect((toc, item) => {
            this.activeEntry = item.props.heading;
        });
        if (this._current) {
            this._headings = this._current.generator.generate(this._current.widget, this._current.generator.options);
        }
    }
    /**
     * Current widget-generator tuple for the ToC.
     */
    get current() {
        return this._current;
    }
    set current(value) {
        // If they are the same as previously, do nothing...
        if (value &&
            this._current &&
            this._current.widget === value.widget &&
            this._current.generator === value.generator) {
            return;
        }
        this._current = value;
        if (this.generator) {
            if (this.generator.toolbarGenerator) {
                this._toolbar = this.generator.toolbarGenerator();
            }
            else {
                this._toolbar = null;
            }
        }
        // Dispose an old activity monitor if one existed...
        if (this._monitor) {
            this._monitor.dispose();
            this._monitor = null;
        }
        // If we are wiping the ToC, update and return...
        if (!this._current) {
            this.update();
            return;
        }
        // Find the document model associated with the widget:
        const context = this._docmanager.contextForWidget(this._current.widget);
        if (!context || !context.model) {
            throw Error('Could not find a context for the Table of Contents');
        }
        // Throttle the rendering rate of the table of contents:
        this._monitor = new _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.ActivityMonitor({
            signal: context.model.contentChanged,
            timeout: RENDER_TIMEOUT
        });
        this._monitor.activityStopped.connect(this.update, this);
        this.update();
    }
    /**
     * Current table of contents generator.
     *
     * @returns table of contents generator
     */
    get generator() {
        if (this._current) {
            return this._current.generator;
        }
        return null;
    }
    /**
     * Callback invoked upon an update request.
     *
     * @param msg - message
     */
    onUpdateRequest(msg) {
        if (this.isHidden) {
            // Bail early
            return;
        }
        let title = this._trans.__('Table of Contents');
        if (this._current) {
            this._headings = this._current.generator.generate(this._current.widget, this._current.generator.options);
            const context = this._docmanager.contextForWidget(this._current.widget);
            if (context) {
                title = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.basename(context.localPath);
            }
        }
        let itemRenderer = (item) => {
            return react__WEBPACK_IMPORTED_MODULE_3__.createElement("span", null, item.text);
        };
        if (this._current && this._current.generator.itemRenderer) {
            itemRenderer = this._current.generator.itemRenderer;
        }
        let jsx = (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-TableOfContents" },
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-stack-panel-header" }, title)));
        if (this._current && this._current.generator) {
            jsx = (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_toc_tree__WEBPACK_IMPORTED_MODULE_6__.TOCTree, { title: title, toc: this._headings, entryClicked: this._entryClicked, generator: this.generator, itemRenderer: itemRenderer, toolbar: this._toolbar }));
        }
        react_dom__WEBPACK_IMPORTED_MODULE_4__.render(jsx, this.node, () => {
            if (this._current &&
                this._current.generator.usesLatex === true &&
                this._rendermime.latexTypesetter) {
                this._rendermime.latexTypesetter.typeset(this.node);
            }
        });
    }
    /**
     * Current active entry.
     *
     * @returns table of contents active entry
     */
    get activeEntry() {
        return this._activeEntry;
    }
    set activeEntry(value) {
        this._activeEntry = value;
    }
    /**
     * List of headings.
     *
     * @returns table of contents list of headings
     */
    get headings() {
        return this._headings;
    }
    /**
     * Callback invoked to re-render after showing a table of contents.
     *
     * @param msg - message
     */
    onAfterShow(msg) {
        this.update();
    }
}
//# sourceMappingURL=toc.js.map

/***/ }),

/***/ "../../packages/toc/lib/toc_item.js":
/*!******************************************!*\
  !*** ../../packages/toc/lib/toc_item.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TOCItem": () => (/* binding */ TOCItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * React component for a table of contents entry.
 *
 * @private
 */
class TOCItem extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    /**
     * Renders a table of contents entry.
     *
     * @returns rendered entry
     */
    render() {
        const { heading, toc } = this.props;
        // Create an onClick handler for the TOC item
        // that scrolls the anchor into view.
        const onClick = (event) => {
            var _a;
            event.preventDefault();
            event.stopPropagation();
            (_a = this.props.entryClicked) === null || _a === void 0 ? void 0 : _a.emit(this);
            heading.onClick();
        };
        let content = this.props.itemRenderer(heading, toc);
        if (!content) {
            return null;
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", { className: "jp-tocItem", onClick: onClick, onContextMenu: (event) => {
                var _a;
                (_a = this.props.entryClicked) === null || _a === void 0 ? void 0 : _a.emit(this);
                heading.onClick();
            } }, content));
    }
}
/**
 * Exports.
 */

//# sourceMappingURL=toc_item.js.map

/***/ }),

/***/ "../../packages/toc/lib/toc_tree.js":
/*!******************************************!*\
  !*** ../../packages/toc/lib/toc_tree.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TOCTree": () => (/* binding */ TOCTree)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _toc_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toc_item */ "../../packages/toc/lib/toc_item.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * React component for a table of contents tree.
 *
 * @private
 */
class TOCTree extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    /**
     * Renders a table of contents tree.
     */
    render() {
        const Toolbar = this.props.toolbar;
        // Map the heading objects onto a list of JSX elements...
        let i = 0;
        let list = this.props.toc.map(el => {
            return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_toc_item__WEBPACK_IMPORTED_MODULE_1__.TOCItem, { heading: el, toc: this.props.toc, entryClicked: this.props.entryClicked, itemRenderer: this.props.itemRenderer, key: `${el.text}-${el.level}-${i++}` }));
        });
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "jp-TableOfContents" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "jp-stack-panel-header" }, this.props.title),
            Toolbar && react__WEBPACK_IMPORTED_MODULE_0__.createElement(Toolbar, null),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", { className: "jp-TableOfContents-content" }, list)));
    }
}
/**
 * Exports.
 */

//# sourceMappingURL=toc_tree.js.map

/***/ }),

/***/ "../../packages/toc/lib/utils/generate_numbering.js":
/*!**********************************************************!*\
  !*** ../../packages/toc/lib/utils/generate_numbering.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateNumbering": () => (/* binding */ generateNumbering)
/* harmony export */ });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
// Maximum heading level:
const MAX_HEADING_LEVEL = 6;
/**
 * Updates numbering dictionary levels.
 *
 * ## Notes
 *
 * -   Mutates a provided dictionary.
 *
 * @private
 * @param dict - numbering dictionary
 * @param level - current level
 * @returns input dictionary
 */
function update(dict, level) {
    for (let l = level + 1; l <= MAX_HEADING_LEVEL; l++) {
        if (dict[l] !== void 0) {
            dict[l] = void 0;
        }
    }
    if (dict[level] === void 0) {
        dict[level] = 1;
    }
    else {
        dict[level] += 1;
    }
    return dict;
}
/**
 * Generate the current numbering based on a provided numbering dictionary and the current level.
 *
 * @private
 * @param dict - numbering dictionary
 * @param level - current level
 * @returns numbering
 */
function generateNumbering(dict, level) {
    if (dict === null) {
        return;
    }
    let numbering = '';
    dict = update(dict, level);
    if (level >= 1) {
        for (let j = 1; j <= level; j++) {
            numbering += (dict[j] === void 0 ? '0' : dict[j]) + '.';
        }
        numbering += ' ';
    }
    return numbering;
}
/**
 * Exports.
 */

//# sourceMappingURL=generate_numbering.js.map

/***/ }),

/***/ "../../packages/toc/lib/utils/headings.js":
/*!************************************************!*\
  !*** ../../packages/toc/lib/utils/headings.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RunningStatus": () => (/* binding */ RunningStatus),
/* harmony export */   "isNotebookHeading": () => (/* binding */ isNotebookHeading)
/* harmony export */ });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * Cell running status
 */
var RunningStatus;
(function (RunningStatus) {
    /**
     * Cell is idle
     */
    RunningStatus[RunningStatus["Idle"] = -1] = "Idle";
    /**
     * Cell execution is scheduled
     */
    RunningStatus[RunningStatus["Scheduled"] = 0] = "Scheduled";
    /**
     * Cell is running
     */
    RunningStatus[RunningStatus["Running"] = 1] = "Running";
})(RunningStatus || (RunningStatus = {}));
/**
 * Tests whether a heading is a notebook heading.
 *
 * @param heading - heading to test
 * @returns boolean indicating whether a heading is a notebook heading
 */
function isNotebookHeading(heading) {
    return heading.type !== undefined && heading.cellRef !== undefined;
}
//# sourceMappingURL=headings.js.map

/***/ }),

/***/ "../../packages/toc/lib/utils/is_dom.js":
/*!**********************************************!*\
  !*** ../../packages/toc/lib/utils/is_dom.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isDOM": () => (/* binding */ isDOM)
/* harmony export */ });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * Returns whether a MIME type corresponds to either HTML or virtual DOM.
 *
 * @private
 * @param mime - MIME type string
 * @returns boolean indicating whether a provided MIME type corresponds to either HTML or virtual DOM
 *
 * @example
 * const bool = isDOM('text/html');
 * // returns true
 *
 * @example
 * const bool = isDOM('text/plain');
 * // returns false
 */
function isDOM(mime) {
    return mime === 'application/vdom.v1+json' || mime === 'text/html';
}
/**
 * Exports.
 */

//# sourceMappingURL=is_dom.js.map

/***/ }),

/***/ "../../packages/toc/lib/utils/is_markdown.js":
/*!***************************************************!*\
  !*** ../../packages/toc/lib/utils/is_markdown.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isMarkdown": () => (/* binding */ isMarkdown)
/* harmony export */ });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * Returns whether a MIME type corresponds to a Markdown flavor.
 *
 * @private
 * @param mime - MIME type string
 * @returns boolean indicating whether a provided MIME type corresponds to a Markdown flavor
 *
 * @example
 * const bool = isMarkdown('text/markdown');
 * // returns true
 *
 * @example
 * const bool = isMarkdown('text/plain');
 * // returns false
 */
function isMarkdown(mime) {
    return (mime === 'text/x-ipythongfm' ||
        mime === 'text/x-markdown' ||
        mime === 'text/x-gfm' ||
        mime === 'text/markdown');
}
/**
 * Exports.
 */

//# sourceMappingURL=is_markdown.js.map

/***/ }),

/***/ "../../packages/toc/lib/utils/parse_heading.js":
/*!*****************************************************!*\
  !*** ../../packages/toc/lib/utils/parse_heading.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseHeading": () => (/* binding */ parseHeading)
/* harmony export */ });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * Parses a heading, if one exists, from a provided string.
 *
 * ## Notes
 *
 * -   Heading examples:
 *
 *     -   Markdown heading:
 *
 *         ```
 *         # Foo
 *         ```
 *
 *     -   Markdown heading (alternative style):
 *
 *         ```
 *         Foo
 *         ===
 *         ```
 *
 *         ```
 *         Foo
 *         ---
 *         ```
 *
 *     -   HTML heading:
 *
 *         ```
 *         <h3>Foo</h3>
 *         ```
 *
 * @private
 * @param str - input text
 * @returns heading info
 *
 * @example
 * const out = parseHeading('### Foo\n');
 * // returns {'text': 'Foo', 'level': 3, 'type': 'markdown'}
 *
 * @example
 * const out = parseHeading('Foo\n===\n');
 * // returns {'text': 'Foo', 'level': 1, 'type': 'markdown-alt'}
 *
 * @example
 * const out = parseHeading('<h4>Foo</h4>\n');
 * // returns {'text': 'Foo', 'level': 4, 'type': 'html'}
 *
 * @example
 * const out = parseHeading('Foo');
 * // returns null
 */
function parseHeading(str) {
    const lines = str.split('\n');
    // Case: Markdown heading
    let match = lines[0].match(/^([#]{1,6}) (.*)/);
    if (match) {
        return {
            text: match[2].replace(/\[(.+)\]\(.+\)/g, '$1'),
            level: match[1].length,
            type: 'markdown'
        };
    }
    // Case: Markdown heading (alternative style)
    if (lines.length > 1) {
        match = lines[1].match(/^ {0,3}([=]{2,}|[-]{2,})\s*$/);
        if (match) {
            return {
                text: lines[0].replace(/\[(.+)\]\(.+\)/g, '$1'),
                level: match[1][0] === '=' ? 1 : 2,
                type: 'markdown-alt'
            };
        }
    }
    // Case: HTML heading (WARNING: this is not particularly robust, as HTML headings can span multiple lines)
    match = lines[0].match(/<h([1-6]).*>(.*)<\/h\1>/i);
    if (match) {
        return {
            text: match[2],
            level: parseInt(match[1], 10),
            type: 'html'
        };
    }
    return null;
}
/**
 * Exports.
 */

//# sourceMappingURL=parse_heading.js.map

/***/ }),

/***/ "../../packages/toc/lib/utils/sanitizer_options.js":
/*!*********************************************************!*\
  !*** ../../packages/toc/lib/utils/sanitizer_options.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sanitizerOptions": () => (/* binding */ sanitizerOptions)
/* harmony export */ });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * Allowed HTML tags and associated attributes for ToC entries when sanitizing HTML headings.
 *
 * ## Notes
 *
 * -   We specifically disallow anchor tags, since we are adding our own.
 *
 * @private
 */
const sanitizerOptions = {
    allowedTags: [
        'p',
        'blockquote',
        'b',
        'i',
        'strong',
        'em',
        'strike',
        'code',
        'br',
        'div',
        'span',
        'pre',
        'del'
    ],
    allowedAttributes: {
        // Allow "class" attribute for <code> tags.
        code: ['class'],
        // Allow "class" attribute for <span> tags.
        span: ['class'],
        // Allow "class" attribute for <div> tags.
        div: ['class'],
        // Allow "class" attribute for <p> tags.
        p: ['class'],
        // Allow "class" attribute for <pre> tags.
        pre: ['class']
    }
};
/**
 * Exports.
 */

//# sourceMappingURL=sanitizer_options.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9jL2xpYi9nZW5lcmF0b3JzL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy90b2MvbGliL2dlbmVyYXRvcnMvbGF0ZXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3RvYy9saWIvZ2VuZXJhdG9ycy9tYXJrZG93bi9nZXRfaGVhZGluZ3MuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3RvYy9saWIvZ2VuZXJhdG9ycy9tYXJrZG93bi9nZXRfcmVuZGVyZWRfaGVhZGluZ3MuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3RvYy9saWIvZ2VuZXJhdG9ycy9tYXJrZG93bi9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9jL2xpYi9nZW5lcmF0b3JzL21hcmtkb3duL29wdGlvbnNfbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9jL2xpYi9nZW5lcmF0b3JzL21hcmtkb3duL3JlbmRlci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9jL2xpYi9nZW5lcmF0b3JzL21hcmtkb3duL3Rvb2xiYXJfZ2VuZXJhdG9yLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy90b2MvbGliL2dlbmVyYXRvcnMvbm90ZWJvb2svYXBwZW5kX2NvbGxhcHNpYmxlX2hlYWRpbmcuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3RvYy9saWIvZ2VuZXJhdG9ycy9ub3RlYm9vay9hcHBlbmRfaGVhZGluZy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9jL2xpYi9nZW5lcmF0b3JzL25vdGVib29rL2FwcGVuZF9tYXJrZG93bl9oZWFkaW5nLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy90b2MvbGliL2dlbmVyYXRvcnMvbm90ZWJvb2svY29kZW1pcnJvci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9jL2xpYi9nZW5lcmF0b3JzL25vdGVib29rL2dldF9jb2RlX2NlbGxfaGVhZGluZy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9jL2xpYi9nZW5lcmF0b3JzL25vdGVib29rL2dldF9sYXN0X2hlYWRpbmdfbGV2ZWwuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3RvYy9saWIvZ2VuZXJhdG9ycy9ub3RlYm9vay9nZXRfbWFya2Rvd25faGVhZGluZy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9jL2xpYi9nZW5lcmF0b3JzL25vdGVib29rL2dldF9yZW5kZXJlZF9odG1sX2hlYWRpbmcuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3RvYy9saWIvZ2VuZXJhdG9ycy9ub3RlYm9vay9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9jL2xpYi9nZW5lcmF0b3JzL25vdGVib29rL2lzX2hlYWRpbmdfZmlsdGVyZWQuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3RvYy9saWIvZ2VuZXJhdG9ycy9ub3RlYm9vay9vcHRpb25zX21hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3RvYy9saWIvZ2VuZXJhdG9ycy9ub3RlYm9vay9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3RvYy9saWIvZ2VuZXJhdG9ycy9ub3RlYm9vay90YWdzdG9vbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9jL2xpYi9nZW5lcmF0b3JzL25vdGVib29rL3RhZ3N0b29sL3RhZy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9jL2xpYi9nZW5lcmF0b3JzL25vdGVib29rL3RhZ3N0b29sL3RhZ19saXN0LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy90b2MvbGliL2dlbmVyYXRvcnMvbm90ZWJvb2svdG9vbGJhcl9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3RvYy9saWIvZ2VuZXJhdG9ycy9weXRob24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3RvYy9saWIvZ2VuZXJhdG9ycy9weXRob24vcmVuZGVyLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy90b2MvbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy90b2MvbGliL3JlZ2lzdHJ5LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy90b2MvbGliL3RvYy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9jL2xpYi90b2NfaXRlbS5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9jL2xpYi90b2NfdHJlZS5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9jL2xpYi91dGlscy9nZW5lcmF0ZV9udW1iZXJpbmcuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3RvYy9saWIvdXRpbHMvaGVhZGluZ3MuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3RvYy9saWIvdXRpbHMvaXNfZG9tLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy90b2MvbGliL3V0aWxzL2lzX21hcmtkb3duLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy90b2MvbGliL3V0aWxzL3BhcnNlX2hlYWRpbmcuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3RvYy9saWIvdXRpbHMvc2FuaXRpemVyX29wdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ3dCO0FBQ0c7QUFDQTtBQUNGO0FBQ3pCLGlD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDMUIsMkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pOQTtBQUNBO0FBQytEO0FBQ1I7QUFDVztBQUNwQjtBQUNmO0FBQ2tDO0FBQ3BCO0FBQzdDO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDNEI7QUFDNUIsNkMiLCJmaWxlIjoicGFja2FnZXNfdG9jX2xpYl9pbmRleF9qcy4wMGVlMzY5ZTEwNmU4Yjk1ODJhZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8vIE5vdGU6IGtlZXAgaW4gYWxwaGFiZXRpY2FsIG9yZGVyLi4uXG5leHBvcnQgKiBmcm9tICcuL2xhdGV4JztcbmV4cG9ydCAqIGZyb20gJy4vbWFya2Rvd24nO1xuZXhwb3J0ICogZnJvbSAnLi9ub3RlYm9vayc7XG5leHBvcnQgKiBmcm9tICcuL3B5dGhvbic7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIE1hcHMgTGFUZVggc2VjdGlvbiBoZWFkaW5ncyB0byBIVE1MIGhlYWRlciBsZXZlbHMuXG4gKlxuICogIyMgTm90ZXNcbiAqXG4gKiAtICAgQXMgYHBhcnRgIGFuZCBgY2hhcHRlcmAgc2VjdGlvbiBoZWFkaW5ncyBhcHBlYXIgdG8gYmUgbGVzcyBjb21tb24sIGFzc2lnbiB0aGVtIHRvIGhlYWRpbmcgbGV2ZWwgMS5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBMQVRFWF9MRVZFTFMgPSB7XG4gICAgcGFydDogMSxcbiAgICBjaGFwdGVyOiAxLFxuICAgIHNlY3Rpb246IDEsXG4gICAgc3Vic2VjdGlvbjogMixcbiAgICBzdWJzdWJzZWN0aW9uOiAzLFxuICAgIHBhcmFncmFwaDogNCxcbiAgICBzdWJwYXJhZ3JhcGg6IDVcbn07XG4vKipcbiAqIENvbnZlcnRzIGFycmF5IGVsZW1lbnRzIHRvIFwiZW50cmllc1wiLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gYXJyIC0gaW5wdXQgYXJyYXlcbiAqIEByZXR1cm5zIGlucHV0IGFycmF5XG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IGFyciA9IHRvRW50cmllcyhbNCw1LDZdKTtcbiAqIC8vIHJldHVybnMgW1s0LDBdLCBbNSwxXSwgWzYsMl1dXG4gKi9cbmZ1bmN0aW9uIHRvRW50cmllcyhhcnIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICBhcnJbaV0gPSBbYXJyW2ldLCBpXTtcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbn1cbi8qKlxuICogUmV0dXJucyBhIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoaXMgVG9DIGdlbmVyYXRvciBpcyBlbmFibGVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gZWRpdG9yIC0gZWRpdG9yIHdpZGdldFxuICogQHJldHVybnMgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdGhpcyBUb0MgZ2VuZXJhdG9yIGlzIGVuYWJsZWRcbiAqL1xuZnVuY3Rpb24gaXNFbmFibGVkKGVkaXRvcikge1xuICAgIC8vIE9ubHkgZW5hYmxlIHRoaXMgaWYgdGhlIGVkaXRvciBNSU1FIHR5cGUgbWF0Y2hlcyBvbmUgb2YgYSBmZXcgTGFUZVggdmFyaWFudHM6XG4gICAgbGV0IG1pbWUgPSBlZGl0b3IuY29udGVudC5tb2RlbC5taW1lVHlwZTtcbiAgICByZXR1cm4gbWltZSA9PT0gJ3RleHQveC1sYXRleCcgfHwgbWltZSA9PT0gJ3RleHQveC1zdGV4Jztcbn1cbi8qKlxuICogR2VuZXJhdGVzIGEgdGFibGUgb2YgY29udGVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSBlZGl0b3IgLSBlZGl0b3Igd2lkZ2V0XG4gKiBAcmV0dXJucyBhIGxpc3Qgb2YgaGVhZGluZ3NcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGUoZWRpdG9yKSB7XG4gICAgLy8gU3BsaXQgdGhlIHRleHQgaW50byBsaW5lczpcbiAgICBsZXQgbGluZXMgPSBlZGl0b3IuY29udGVudC5tb2RlbC52YWx1ZS50ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICAvLyBDb252ZXJ0IHRoZSBsaXN0IGludG8gXCJlbnRyaWVzXCIgc28gd2UgY2FuIHVzZSB0aGUgbGluZSBudW1iZXIgdG8gc2Nyb2xsIHRoZSBlZGl0b3IgdXBvbiBUb0MgaXRlbSBjbGljazpcbiAgICBsaW5lcyA9IHRvRW50cmllcyhsaW5lcyk7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBsaW5lcyB0byBnZXQgdGhlIGhlYWRpbmcgbGV2ZWwgYW5kIHRleHQgZm9yIGVhY2ggbGluZTpcbiAgICBsZXQgaGVhZGluZ3MgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IFJFID0gL15cXHMqXFxcXChzZWN0aW9ufHN1YnNlY3Rpb258c3Vic3Vic2VjdGlvbil7KC4rKX0vO1xuICAgICAgICBjb25zdCBtYXRjaCA9IGxpbmVzW2ldWzBdLm1hdGNoKFJFKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBoZWFkaW5ncy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtYXRjaFsyXSxcbiAgICAgICAgICAgICAgICBsZXZlbDogTEFURVhfTEVWRUxTW21hdGNoWzFdXSxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiBvbkNsaWNrKGxpbmVzW2ldWzFdKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGhlYWRpbmdzO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBcImNsaWNrXCIgaGFuZGxlci5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIGxpbmUgLSBsaW5lIG51bWJlclxuICAgICAqIEByZXR1cm5zIGNsaWNrIGhhbmRsZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBvbkNsaWNrKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGVkaXRvci5jb250ZW50LmVkaXRvci5zZXRDdXJzb3JQb3NpdGlvbih7XG4gICAgICAgICAgICAgICAgbGluZTogbGluZSxcbiAgICAgICAgICAgICAgICBjb2x1bW46IDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbn1cbi8qKlxuICogUmV0dXJucyBhIFRvQyBnZW5lcmF0b3IgZm9yIExhVGVYIGZpbGVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gdHJhY2tlciAtIGZpbGUgZWRpdG9yIHRyYWNrZXJcbiAqIEByZXR1cm5zIFRvQyBnZW5lcmF0b3IgY2FwYWJsZSBvZiBwYXJzaW5nIExhVGVYIGZpbGVzXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUxhdGV4R2VuZXJhdG9yKHRyYWNrZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0cmFja2VyLFxuICAgICAgICB1c2VzTGF0ZXg6IHRydWUsXG4gICAgICAgIGlzRW5hYmxlZDogaXNFbmFibGVkLFxuICAgICAgICBnZW5lcmF0ZTogZ2VuZXJhdGVcbiAgICB9O1xufVxuLyoqXG4gKiBFeHBvcnRzLlxuICovXG5leHBvcnQgeyBjcmVhdGVMYXRleEdlbmVyYXRvciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgZ2VuZXJhdGVOdW1iZXJpbmcgfSBmcm9tICcuLi8uLi91dGlscy9nZW5lcmF0ZV9udW1iZXJpbmcnO1xuaW1wb3J0IHsgcGFyc2VIZWFkaW5nIH0gZnJvbSAnLi4vLi4vdXRpbHMvcGFyc2VfaGVhZGluZyc7XG4vKipcbiAqIFBhcnNlcyBhIHByb3ZpZGVkIHN0cmluZyBhbmQgcmV0dXJucyBhIGxpc3Qgb2YgaGVhZGluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB0ZXh0IC0gaW5wdXQgdGV4dFxuICogQHBhcmFtIG9uQ2xpY2sgLSBjYWxsYmFjayB3aGljaCByZXR1cm5zIGEgXCJjbGlja1wiIGhhbmRsZXJcbiAqIEBwYXJhbSBkaWN0IC0gbnVtYmVyaW5nIGRpY3Rpb25hcnlcbiAqIEBwYXJhbSBudW1iZXJpbmdIMSAtIHdoZXRoZXIgZmlyc3QgbGV2ZWwgaGVhZGVyIHNob3VsZCBiZSBudW1iZXJlZFxuICogQHJldHVybnMgbGlzdCBvZiBoZWFkaW5nc1xuICovXG5mdW5jdGlvbiBnZXRIZWFkaW5ncyh0ZXh0LCBvbkNsaWNrLCBkaWN0LCBudW1iZXJpbmdIMSkge1xuICAgIC8vIFNwbGl0IHRoZSB0ZXh0IGludG8gbGluZXM6XG4gICAgY29uc3QgbGluZXMgPSB0ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGxpbmVzIHRvIGdldCB0aGUgaGVhZGVyIGxldmVsIGFuZCB0ZXh0IGZvciBlYWNoIGxpbmU6XG4gICAgbGV0IGhlYWRpbmdzID0gW107XG4gICAgbGV0IEZMRztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBsaW5lID0gbGluZXNbaV07XG4gICAgICAgIC8vIERvbid0IGNoZWNrIGZvciBNYXJrZG93biBoZWFkaW5ncyBpZiBpbiBhIGNvZGUgYmxvY2s6XG4gICAgICAgIGlmIChsaW5lLmluZGV4T2YoJ2BgYCcpID09PSAwKSB7XG4gICAgICAgICAgICBGTEcgPSAhRkxHO1xuICAgICAgICB9XG4gICAgICAgIGlmIChGTEcpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGxpbmUgKz0gbGluZXNbaSArIDFdID8gJ1xcbicgKyBsaW5lc1tpICsgMV0gOiAnJztcbiAgICAgICAgY29uc3QgaGVhZGluZyA9IHBhcnNlSGVhZGluZyhsaW5lKTsgLy8gYXBwZW5kIHRoZSBuZXh0IGxpbmUgdG8gY2FwdHVyZSBhbHRlcm5hdGl2ZSBzdHlsZSBNYXJrZG93biBoZWFkaW5nc1xuICAgICAgICBpZiAoaGVhZGluZykge1xuICAgICAgICAgICAgbGV0IGxldmVsID0gaGVhZGluZy5sZXZlbDtcbiAgICAgICAgICAgIGlmICghbnVtYmVyaW5nSDEpIHtcbiAgICAgICAgICAgICAgICBsZXZlbCAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGVhZGluZ3MucHVzaCh7XG4gICAgICAgICAgICAgICAgdGV4dDogaGVhZGluZy50ZXh0LFxuICAgICAgICAgICAgICAgIG51bWJlcmluZzogZ2VuZXJhdGVOdW1iZXJpbmcoZGljdCwgbGV2ZWwpLFxuICAgICAgICAgICAgICAgIGxldmVsOiBoZWFkaW5nLmxldmVsLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IG9uQ2xpY2soaSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoZWFkaW5ncztcbn1cbi8qKlxuICogRXhwb3J0cy5cbiAqL1xuZXhwb3J0IHsgZ2V0SGVhZGluZ3MgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdldF9oZWFkaW5ncy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBnZW5lcmF0ZU51bWJlcmluZyB9IGZyb20gJy4uLy4uL3V0aWxzL2dlbmVyYXRlX251bWJlcmluZyc7XG5pbXBvcnQgeyBzYW5pdGl6ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vdXRpbHMvc2FuaXRpemVyX29wdGlvbnMnO1xuLyoqXG4gKiBSZXR1cm5zIGEgXCJjbGlja1wiIGhhbmRsZXIuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSBoZWFkaW5nIC0gaGVhZGluZyBlbGVtZW50XG4gKiBAcmV0dXJucyBcImNsaWNrXCIgaGFuZGxlclxuICovXG5mdW5jdGlvbiBvbkNsaWNrKGhlYWRpbmcpIHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBoZWFkaW5nLnNjcm9sbEludG9WaWV3KCk7XG4gICAgfTtcbn1cbi8qKlxuICogUHJvY2Vzc2VzIGFuIEhUTUwgZWxlbWVudCBjb250YWluaW5nIHJlbmRlcmVkIE1hcmtkb3duIGFuZCByZXR1cm5zIGEgbGlzdCBvZiBoZWFkaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIG5vZGUgLSBIVE1MIGVsZW1lbnRcbiAqIEBwYXJhbSBzYW5pdGl6ZXIgLSBIVE1MIHNhbml0aXplclxuICogQHBhcmFtIGRpY3QgLSBudW1iZXJpbmcgZGljdGlvbmFyeVxuICogQHBhcmFtIG51bWJlcmluZyAtIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRvIGVuYWJsZSBudW1iZXJpbmdcbiAqIEBwYXJhbSBudW1iZXJpbmdIMSAtIHdoZXRoZXIgZmlyc3QgbGV2ZWwgaGVhZGVyIHNob3VsZCBiZSBudW1iZXJlZFxuICogQHJldHVybnMgbGlzdCBvZiBoZWFkaW5nc1xuICovXG5mdW5jdGlvbiBnZXRSZW5kZXJlZEhlYWRpbmdzKG5vZGUsIHNhbml0aXplciwgZGljdCwgbnVtYmVyaW5nID0gdHJ1ZSwgbnVtYmVyaW5nSDEgPSB0cnVlKSB7XG4gICAgbGV0IG5vZGVzID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKCdoMSwgaDIsIGgzLCBoNCwgaDUsIGg2Jyk7XG4gICAgbGV0IGhlYWRpbmdzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBoZWFkaW5nID0gbm9kZXNbaV07XG4gICAgICAgIGxldCBsZXZlbCA9IHBhcnNlSW50KGhlYWRpbmcudGFnTmFtZVsxXSwgMTApO1xuICAgICAgICBsZXQgdGV4dCA9IGhlYWRpbmcudGV4dENvbnRlbnQgPyBoZWFkaW5nLnRleHRDb250ZW50IDogJyc7XG4gICAgICAgIGxldCBoaWRlID0gIW51bWJlcmluZztcbiAgICAgICAgLy8gU2hvdy9oaWRlIG51bWJlcmluZyBET00gZWxlbWVudCBiYXNlZCBvbiB1c2VyIHNldHRpbmdzOlxuICAgICAgICBpZiAoaGVhZGluZy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdudW1iZXJpbmctZW50cnknKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBoZWFkaW5nLnJlbW92ZUNoaWxkKGhlYWRpbmcuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbnVtYmVyaW5nLWVudHJ5JylbMF0pO1xuICAgICAgICB9XG4gICAgICAgIGxldCBodG1sID0gc2FuaXRpemVyLnNhbml0aXplKGhlYWRpbmcuaW5uZXJIVE1MLCBzYW5pdGl6ZXJPcHRpb25zKTtcbiAgICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZSgnwrYnLCAnJyk7IC8vIHJlbW92ZSB0aGUgYW5jaG9yIHN5bWJvbFxuICAgICAgICAvLyBHZW5lcmF0ZSBhIG51bWJlcmluZyBzdHJpbmc6XG4gICAgICAgIGlmICghbnVtYmVyaW5nSDEpIHtcbiAgICAgICAgICAgIGxldmVsIC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5zdHIgPSBnZW5lcmF0ZU51bWJlcmluZyhkaWN0LCBsZXZlbCk7XG4gICAgICAgIC8vIEdlbmVyYXRlIHRoZSBudW1iZXJpbmcgRE9NIGVsZW1lbnQ6XG4gICAgICAgIGxldCBuaHRtbCA9ICcnO1xuICAgICAgICBpZiAoIWhpZGUpIHtcbiAgICAgICAgICAgIG5odG1sID0gJzxzcGFuIGNsYXNzPVwibnVtYmVyaW5nLWVudHJ5XCI+JyArIG5zdHIgKyAnPC9zcGFuPic7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQXBwZW5kIHRoZSBudW1iZXJpbmcgZWxlbWVudCB0byB0aGUgZG9jdW1lbnQ6XG4gICAgICAgIGhlYWRpbmcuaW5uZXJIVE1MID0gbmh0bWwgKyBodG1sO1xuICAgICAgICBoZWFkaW5ncy5wdXNoKHtcbiAgICAgICAgICAgIGxldmVsLFxuICAgICAgICAgICAgdGV4dDogdGV4dC5yZXBsYWNlKCfCticsICcnKSxcbiAgICAgICAgICAgIG51bWJlcmluZzogbnN0cixcbiAgICAgICAgICAgIGh0bWwsXG4gICAgICAgICAgICBvbkNsaWNrOiBvbkNsaWNrKGhlYWRpbmcpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gaGVhZGluZ3M7XG59XG4vKipcbiAqIEV4cG9ydHMuXG4gKi9cbmV4cG9ydCB7IGdldFJlbmRlcmVkSGVhZGluZ3MgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdldF9yZW5kZXJlZF9oZWFkaW5ncy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGlzTWFya2Rvd24gfSBmcm9tICcuLi8uLi91dGlscy9pc19tYXJrZG93bic7XG5pbXBvcnQgeyBPcHRpb25zTWFuYWdlciB9IGZyb20gJy4vb3B0aW9uc19tYW5hZ2VyJztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCB7IHRvb2xiYXIgfSBmcm9tICcuL3Rvb2xiYXJfZ2VuZXJhdG9yJztcbmltcG9ydCB7IGdldEhlYWRpbmdzIH0gZnJvbSAnLi9nZXRfaGVhZGluZ3MnO1xuaW1wb3J0IHsgZ2V0UmVuZGVyZWRIZWFkaW5ncyB9IGZyb20gJy4vZ2V0X3JlbmRlcmVkX2hlYWRpbmdzJztcbi8qKlxuICogUmV0dXJucyBhIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoaXMgVG9DIGdlbmVyYXRvciBpcyBlbmFibGVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gZWRpdG9yIC0gZWRpdG9yIHdpZGdldFxuICogQHJldHVybnMgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdGhpcyBUb0MgZ2VuZXJhdG9yIGlzIGVuYWJsZWRcbiAqL1xuZnVuY3Rpb24gaXNFbmFibGVkKGVkaXRvcikge1xuICAgIC8vIE9ubHkgZW5hYmxlIHRoaXMgaWYgdGhlIGVkaXRvciBNSU1FIHR5cGUgbWF0Y2hlcyBvbmUgb2YgYSBmZXcgTWFya2Rvd24gdmFyaWFudHM6XG4gICAgcmV0dXJuIGlzTWFya2Rvd24oZWRpdG9yLmNvbnRlbnQubW9kZWwubWltZVR5cGUpO1xufVxuLyoqXG4gKiBHZW5lcmF0ZXMgYSB0YWJsZSBvZiBjb250ZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIGVkaXRvciAtIGVkaXRvciB3aWRnZXRcbiAqIEBwYXJhbSBvcHRpb25zIC0gbWFuYWdlIE1hcmtkb3duIFRvQyBnZW5lcmF0b3Igb3B0aW9uc1xuICogQHJldHVybnMgYSBsaXN0IG9mIGhlYWRpbmdzXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlKGVkaXRvciwgb3B0aW9ucykge1xuICAgIGxldCBkaWN0ID0ge307XG4gICAgbGV0IG51bWJlcmluZ0gxID0gdHJ1ZTtcbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG51bWJlcmluZ0gxID0gb3B0aW9ucy5udW1iZXJpbmdIMTtcbiAgICB9XG4gICAgcmV0dXJuIGdldEhlYWRpbmdzKGVkaXRvci5jb250ZW50Lm1vZGVsLnZhbHVlLnRleHQsIG9uQ2xpY2ssIGRpY3QsIG51bWJlcmluZ0gxKTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgXCJjbGlja1wiIGhhbmRsZXIuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSBsaW5lIC0gbGluZSBudW1iZXJcbiAgICAgKiBAcmV0dXJucyBjbGljayBoYW5kbGVyXG4gICAgICovXG4gICAgZnVuY3Rpb24gb25DbGljayhsaW5lKSB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBlZGl0b3IuY29udGVudC5lZGl0b3Iuc2V0Q3Vyc29yUG9zaXRpb24oe1xuICAgICAgICAgICAgICAgIGxpbmU6IGxpbmUsXG4gICAgICAgICAgICAgICAgY29sdW1uOiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG59XG4vKipcbiAqIFJldHVybnMgYSBUb0MgZ2VuZXJhdG9yIGZvciBNYXJrZG93biBmaWxlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHRyYWNrZXIgLSBmaWxlIGVkaXRvciB0cmFja2VyXG4gKiBAcGFyYW0gd2lkZ2V0IC0gdGFibGUgb2YgY29udGVudHMgd2lkZ2V0XG4gKiBAcGFyYW0gc2FuaXRpemVyIC0gSFRNTCBzYW5pdGl6ZXJcbiAqIEBwYXJhbSBzZXR0aW5ncyAtIGFkdmFuY2VkIHNldHRpbmdzIGZvciB0b2MgZXh0ZW5zaW9uXG4gKiBAcmV0dXJucyBUb0MgZ2VuZXJhdG9yIGNhcGFibGUgb2YgcGFyc2luZyBNYXJrZG93biBmaWxlc1xuICovXG5mdW5jdGlvbiBjcmVhdGVNYXJrZG93bkdlbmVyYXRvcih0cmFja2VyLCB3aWRnZXQsIHNhbml0aXplciwgdHJhbnNsYXRvciwgc2V0dGluZ3MpIHtcbiAgICBsZXQgbnVtYmVyaW5nSDEgPSB0cnVlO1xuICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICBudW1iZXJpbmdIMSA9IHNldHRpbmdzLmNvbXBvc2l0ZS5udW1iZXJpbmdIMTtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9ucyA9IG5ldyBPcHRpb25zTWFuYWdlcih3aWRnZXQsIHtcbiAgICAgICAgbnVtYmVyaW5nOiB0cnVlLFxuICAgICAgICBudW1iZXJpbmdIMTogbnVtYmVyaW5nSDEsXG4gICAgICAgIHNhbml0aXplcixcbiAgICAgICAgdHJhbnNsYXRvcjogdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvclxuICAgIH0pO1xuICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICBzZXR0aW5ncy5jaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgb3B0aW9ucy5udW1iZXJpbmdIMSA9IHNldHRpbmdzLmNvbXBvc2l0ZS5udW1iZXJpbmdIMTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHRyYWNrZXIsXG4gICAgICAgIHVzZXNMYXRleDogdHJ1ZSxcbiAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgdG9vbGJhckdlbmVyYXRvcjogZ2VuZXJhdGVUb29sYmFyLFxuICAgICAgICBpdGVtUmVuZGVyZXI6IHJlbmRlckl0ZW0sXG4gICAgICAgIGlzRW5hYmxlZDogaXNFbmFibGVkLFxuICAgICAgICBnZW5lcmF0ZTogZ2VuZXJhdGVcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSB0b29sYmFyIGdlbmVyYXRvci5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHJldHVybnMgdG9vbGJhciBnZW5lcmF0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZVRvb2xiYXIoKSB7XG4gICAgICAgIHJldHVybiB0b29sYmFyKG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGEgdGFibGUgb2YgY29udGVudHMgaXRlbS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIGl0ZW0gLSBoZWFkaW5nIHRvIHJlbmRlclxuICAgICAqIEByZXR1cm5zIHJlbmRlcmVkIGl0ZW1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZW5kZXJJdGVtKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlcihvcHRpb25zLCBpdGVtKTtcbiAgICB9XG59XG4vKipcbiAqIFJldHVybnMgYSBUb0MgZ2VuZXJhdG9yIGZvciByZW5kZXJlZCBNYXJrZG93biBmaWxlcy5cbiAqXG4gKiBAcGFyYW0gdHJhY2tlciAtIE1hcmtkb3duIHZpZXdlciB0cmFja2VyXG4gKiBAcGFyYW0gc2FuaXRpemVyIC0gSFRNTCBzYW5pdGl6ZXJcbiAqIEBwYXJhbSB3aWRnZXQgLSB0YWJsZSBvZiBjb250ZW50cyB3aWRnZXRcbiAqIEBwYXJhbSBzZXR0aW5ncyAtIGFkdmFuY2VkIHNldHRpbmdzIGZvciB0b2MgZXh0ZW5zaW9uXG4gKiBAcmV0dXJucyBUb0MgZ2VuZXJhdG9yIGNhcGFibGUgb2YgcGFyc2luZyByZW5kZXJlZCBNYXJrZG93biBmaWxlc1xuICovXG5mdW5jdGlvbiBjcmVhdGVSZW5kZXJlZE1hcmtkb3duR2VuZXJhdG9yKHRyYWNrZXIsIHdpZGdldCwgc2FuaXRpemVyLCB0cmFuc2xhdG9yLCBzZXR0aW5ncykge1xuICAgIGxldCBudW1iZXJpbmdIMSA9IHRydWU7XG4gICAgaWYgKHNldHRpbmdzKSB7XG4gICAgICAgIG51bWJlcmluZ0gxID0gc2V0dGluZ3MuY29tcG9zaXRlLm51bWJlcmluZ0gxO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHdpZGdldCwge1xuICAgICAgICBudW1iZXJpbmc6IHRydWUsXG4gICAgICAgIG51bWJlcmluZ0gxOiBudW1iZXJpbmdIMSxcbiAgICAgICAgc2FuaXRpemVyLFxuICAgICAgICB0cmFuc2xhdG9yOiB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yXG4gICAgfSk7XG4gICAgaWYgKHNldHRpbmdzKSB7XG4gICAgICAgIHNldHRpbmdzLmNoYW5nZWQuY29ubmVjdCgoKSA9PiB7XG4gICAgICAgICAgICBvcHRpb25zLm51bWJlcmluZ0gxID0gc2V0dGluZ3MuY29tcG9zaXRlLm51bWJlcmluZ0gxO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHJhY2tlcixcbiAgICAgICAgdXNlc0xhdGV4OiB0cnVlLFxuICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICB0b29sYmFyR2VuZXJhdG9yOiBnZW5lcmF0ZVRvb2xiYXIsXG4gICAgICAgIGl0ZW1SZW5kZXJlcjogcmVuZGVySXRlbSxcbiAgICAgICAgZ2VuZXJhdGU6IGdlbmVyYXRlXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgdG9vbGJhciBnZW5lcmF0b3IuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEByZXR1cm5zIHRvb2xiYXIgZ2VuZXJhdG9yXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVUb29sYmFyKCkge1xuICAgICAgICByZXR1cm4gdG9vbGJhcihvcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIHRhYmxlIG9mIGNvbnRlbnRzIGl0ZW0uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSBpdGVtIC0gaGVhZGluZyB0byByZW5kZXJcbiAgICAgKiBAcmV0dXJucyByZW5kZXJlZCBpdGVtXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVuZGVySXRlbShpdGVtKSB7XG4gICAgICAgIHJldHVybiByZW5kZXIob3B0aW9ucywgaXRlbSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHRhYmxlIG9mIGNvbnRlbnRzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IC0gTWFya2Rvd24gZG9jdW1lbnQgd2lkZ2V0XG4gICAgICogQHJldHVybnMgYSBsaXN0IG9mIGhlYWRpbmdzXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGUod2lkZ2V0KSB7XG4gICAgICAgIGxldCBkaWN0ID0ge307XG4gICAgICAgIHJldHVybiBnZXRSZW5kZXJlZEhlYWRpbmdzKHdpZGdldC5jb250ZW50Lm5vZGUsIHNhbml0aXplciwgZGljdCwgb3B0aW9ucy5udW1iZXJpbmcsIG9wdGlvbnMubnVtYmVyaW5nSDEpO1xuICAgIH1cbn1cbi8qKlxuICogRXhwb3J0cy5cbiAqL1xuZXhwb3J0IHsgY3JlYXRlTWFya2Rvd25HZW5lcmF0b3IgfTtcbmV4cG9ydCB7IGNyZWF0ZVJlbmRlcmVkTWFya2Rvd25HZW5lcmF0b3IgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuLyoqXG4gKiBDbGFzcyBmb3IgbWFuYWdpbmcgTWFya2Rvd24gVG9DIGdlbmVyYXRvciBvcHRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIE9wdGlvbnNNYW5hZ2VyIHtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIG9wdGlvbnMgbWFuYWdlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWRnZXQgLSB0YWJsZSBvZiBjb250ZW50cyB3aWRnZXRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIGdlbmVyYXRvciBvcHRpb25zXG4gICAgICogQHJldHVybnMgb3B0aW9ucyBtYW5hZ2VyXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2lkZ2V0LCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX251bWJlcmluZyA9IG9wdGlvbnMubnVtYmVyaW5nO1xuICAgICAgICB0aGlzLl9udW1iZXJpbmdIMSA9IG9wdGlvbnMubnVtYmVyaW5nSDE7XG4gICAgICAgIHRoaXMuX3dpZGdldCA9IHdpZGdldDtcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gb3B0aW9ucy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICB0aGlzLnNhbml0aXplciA9IG9wdGlvbnMuc2FuaXRpemVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzL3NldHMgVG9DIGdlbmVyYXRvciBudW1iZXJpbmcuXG4gICAgICovXG4gICAgc2V0IG51bWJlcmluZyh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9udW1iZXJpbmcgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fd2lkZ2V0LnVwZGF0ZSgpO1xuICAgIH1cbiAgICBnZXQgbnVtYmVyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbnVtYmVyaW5nO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzL3NldHMgVG9DIGdlbmVyYXRvciBudW1iZXJpbmcgaDEgaGVhZGVycy5cbiAgICAgKi9cbiAgICBzZXQgbnVtYmVyaW5nSDEodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX251bWJlcmluZ0gxICE9IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9udW1iZXJpbmdIMSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fd2lkZ2V0LnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBudW1iZXJpbmdIMSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX251bWJlcmluZ0gxO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBvcHRpb25zLlxuICAgICAqXG4gICAgICogIyMgTm90ZXNcbiAgICAgKlxuICAgICAqIC0gIFRoaXMgd2lsbCAqKm5vdCoqIGNoYW5nZSBub3RlYm9vayBtZXRhLWRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbnVtYmVyaW5nIC0gYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gbnVtYmVyIGl0ZW1zXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZU9wdGlvbnMobnVtYmVyaW5nLCBudW1iZXJpbmdIMSkge1xuICAgICAgICB0aGlzLl9udW1iZXJpbmcgPSBudW1iZXJpbmc7XG4gICAgICAgIHRoaXMuX251bWJlcmluZ0gxID0gbnVtYmVyaW5nSDE7XG4gICAgICAgIHRoaXMuX3dpZGdldC51cGRhdGUoKTtcbiAgICB9XG59XG4vKipcbiAqIEV4cG9ydHMuXG4gKi9cbmV4cG9ydCB7IE9wdGlvbnNNYW5hZ2VyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vcHRpb25zX21hbmFnZXIuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgc2FuaXRpemVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL3V0aWxzL3Nhbml0aXplcl9vcHRpb25zJztcbi8qKlxuICogUmVuZGVycyBhIE1hcmtkb3duIHRhYmxlIG9mIGNvbnRlbnRzIGl0ZW0uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gZ2VuZXJhdG9yIG9wdGlvbnNcbiAqIEBwYXJhbSBpdGVtIC0gbnVtYmVyZWQgaGVhZGluZ1xuICogQHJldHVybnMgcmVuZGVyZWQgaXRlbVxuICovXG5mdW5jdGlvbiByZW5kZXIob3B0aW9ucywgaXRlbSkge1xuICAgIGxldCBmb250U2l6ZUNsYXNzID0gJ3RvYy1sZXZlbC1zaXplLScgKyBpdGVtLmxldmVsO1xuICAgIC8vIFJlbmRlciBpdGVtIG51bWJlcmluZzpcbiAgICBsZXQgbnVtYmVyaW5nID0gaXRlbS5udW1iZXJpbmcgJiYgb3B0aW9ucy5udW1iZXJpbmcgPyBpdGVtLm51bWJlcmluZyA6ICcnO1xuICAgIC8vIFJlbmRlciB0aGUgaXRlbTpcbiAgICBsZXQganN4O1xuICAgIGlmIChpdGVtLmh0bWwpIHtcbiAgICAgICAgbGV0IGh0bWwgPSBvcHRpb25zLnNhbml0aXplci5zYW5pdGl6ZShpdGVtLmh0bWwsIHNhbml0aXplck9wdGlvbnMpO1xuICAgICAgICBqc3ggPSAoUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6IG51bWJlcmluZyArIGh0bWwgfSwgY2xhc3NOYW1lOiAndG9jLW1hcmtkb3duLWNlbGwgJyArIGZvbnRTaXplQ2xhc3MgfSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAganN4ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IGZvbnRTaXplQ2xhc3MgfSxcbiAgICAgICAgICAgIFwiIFwiLFxuICAgICAgICAgICAgbnVtYmVyaW5nICsgaXRlbS50ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIGpzeDtcbn1cbi8qKlxuICogRXhwb3J0cy5cbiAqL1xuZXhwb3J0IHsgcmVuZGVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZW5kZXIuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgbnVtYmVyaW5nSWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBSZXR1cm5zIGEgY29tcG9uZW50IGZvciByZW5kZXJpbmcgYSBNYXJrZG93biB0YWJsZSBvZiBjb250ZW50cyB0b29sYmFyLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gb3B0aW9ucyAtIGdlbmVyYXRvciBvcHRpb25zXG4gKiBAcmV0dXJucyB0b29sYmFyIGNvbXBvbmVudFxuICovXG5mdW5jdGlvbiB0b29sYmFyKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gY2xhc3MgVG9vbGJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIGEgY29tcG9uZW50IGZvciByZW5kZXJpbmcgYSBNYXJrZG93biB0YWJsZSBvZiBjb250ZW50cyB0b29sYmFyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gcHJvcHMgLSB0b29sYmFyIHByb3BlcnRpZXNcbiAgICAgICAgICogQHJldHVybnMgdG9vbGJhciBjb21wb25lbnRcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0geyBudW1iZXJpbmc6IGZhbHNlIH07XG4gICAgICAgICAgICBvcHRpb25zLmluaXRpYWxpemVPcHRpb25zKGZhbHNlLCBvcHRpb25zLm51bWJlcmluZ0gxKTtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zID0gb3B0aW9ucy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmVuZGVycyBhIHRvb2xiYXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHJlbmRlcmVkIHRvb2xiYXJcbiAgICAgICAgICovXG4gICAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvZ2dsZU51bWJlcmluZyA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLm51bWJlcmluZyA9ICFvcHRpb25zLm51bWJlcmluZztcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbnVtYmVyaW5nOiBvcHRpb25zLm51bWJlcmluZyB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBpY29uID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBvbkNsaWNrOiBldmVudCA9PiB0b2dnbGVOdW1iZXJpbmcoKSwgcm9sZTogXCJ0ZXh0XCIsIFwiYXJpYS1sYWJlbFwiOiB0aGlzLl90cmFucy5fXygnVG9nZ2xlIEF1dG8tTnVtYmVyaW5nJyksIHRpdGxlOiB0aGlzLl90cmFucy5fXygnVG9nZ2xlIEF1dG8tTnVtYmVyaW5nJyksIGNsYXNzTmFtZTogdGhpcy5zdGF0ZS5udW1iZXJpbmdcbiAgICAgICAgICAgICAgICAgICAgPyAndG9jLXRvb2xiYXItaWNvbi1zZWxlY3RlZCdcbiAgICAgICAgICAgICAgICAgICAgOiAndG9jLXRvb2xiYXItaWNvbicgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KG51bWJlcmluZ0ljb24ucmVhY3QsIG51bGwpKSk7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAndG9jLXRvb2xiYXInIH0sIGljb24pKSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBFeHBvcnRzLlxuICovXG5leHBvcnQgeyB0b29sYmFyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b29sYmFyX2dlbmVyYXRvci5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBpc0hlYWRpbmdGaWx0ZXJlZCB9IGZyb20gJy4vaXNfaGVhZGluZ19maWx0ZXJlZCc7XG4vKipcbiAqIEFwcGVuZHMgYSBjb2xsYXBzaWJsZSBub3RlYm9vayBoZWFkaW5nIHRvIGEgbGlzdCBvZiBoZWFkaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIGhlYWRpbmdzIC0gbGlzdCBvZiBub3RlYm9vayBoZWFkaW5nc1xuICogQHBhcmFtIGhlYWRpbmcgLSByZW5kZXJlZCBoZWFkaW5nXG4gKiBAcGFyYW0gcHJldiAtIHByZXZpb3VzIGhlYWRpbmdcbiAqIEBwYXJhbSBjb2xsYXBzZUxldmVsIC0gY29sbGFwc2UgbGV2ZWxcbiAqIEBwYXJhbSB0YWdzIC0gZmlsdGVyIHRhZ3NcbiAqIEBwYXJhbSBjb2xsYXBzZWQgLSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciBhIGhlYWRpbmcgaXMgY29sbGFwc2VkXG4gKiBAcGFyYW0gY2VsbENvbGxhcHNlTWV0YWRhdGEgLSBpbmRpY2F0ZXMgd2hpY2ggbWV0YWRhdGEgc3RyaW5nIHRvIHVzZSBiYXNlZCBvbiB0aGUgY2VsbFN5bmNTZXR0aW5nXG4gKiBAcmV0dXJucyByZXN1bHQgdHVwbGVcbiAqL1xuZnVuY3Rpb24gYXBwZW5kQ29sbGFwc2libGVIZWFkaW5nKGhlYWRpbmdzLCBoZWFkaW5nLCBwcmV2LCBjb2xsYXBzZUxldmVsLCB0YWdzLCBjb2xsYXBzZWQsIGNlbGxDb2xsYXBzZU1ldGFkYXRhKSB7XG4gICAgY29uc3QgbGVuID0gaGVhZGluZ3MubGVuZ3RoO1xuICAgIGlmICghaXNIZWFkaW5nRmlsdGVyZWQoaGVhZGluZywgdGFncykpIHtcbiAgICAgICAgLy8gSWYgdGhlIHByZXZpb3VzIGhlYWRpbmcgaXMgYSBoaWdoZXIgbGV2ZWwgaGVhZGluZywgdXBkYXRlIHRoZSBoZWFkaW5nIHRvIG5vdGUgdGhhdCBpdCBoYXMgYSBjaGlsZCBoZWFkaW5nLi4uXG4gICAgICAgIGlmIChwcmV2ICYmIHByZXYudHlwZSA9PT0gJ2hlYWRlcicgJiYgcHJldi5sZXZlbCA8IGhlYWRpbmcubGV2ZWwpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBsZW4gLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgICAgIGlmIChoZWFkaW5nc1tqXSA9PT0gcHJldikge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjYW4gYSBoZWFkaW5nIGJlIHRoZSBjaGlsZCBvZiBtdWx0aXBsZSBoZWFkaW5ncz8gSWYgbm90LCB3ZSBjYW4gYGJyZWFrYCBoZXJlIHVwb24gZmluZGluZyBhIHBhcmVudCBoZWFkaW5nLCBzbyB3ZSBkb24ndCB0cmF2ZXJzZSB0aGUgZW50aXJlIGhlYWRpbmcgbGlzdC4uLlxuICAgICAgICAgICAgICAgICAgICBoZWFkaW5nc1tqXS5oYXNDaGlsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSBjb2xsYXBzZSBsZXZlbCBkb2Vzbid0IGluY2x1ZGUgdGhlIGhlYWRpbmcsIG9yLCBpZiB0aGVyZSBpcyBubyBjb2xsYXBzaW5nLCBhZGQgdG8gaGVhZGluZ3MgYW5kIGFkanVzdCB0aGUgY29sbGFwc2UgbGV2ZWwuLi5cbiAgICAgICAgaWYgKGNvbGxhcHNlTGV2ZWwgPj0gaGVhZGluZy5sZXZlbCB8fCBjb2xsYXBzZUxldmVsIDwgMCkge1xuICAgICAgICAgICAgaGVhZGluZ3MucHVzaChoZWFkaW5nKTtcbiAgICAgICAgICAgIGNvbGxhcHNlTGV2ZWwgPSBjb2xsYXBzZWQgPyBoZWFkaW5nLmxldmVsIDogLTE7XG4gICAgICAgIH1cbiAgICAgICAgcHJldiA9IGhlYWRpbmc7XG4gICAgfVxuICAgIGVsc2UgaWYgKHByZXYgJiYgaGVhZGluZy5sZXZlbCA8PSBwcmV2LmxldmVsKSB7XG4gICAgICAgIC8vIElmIHRoZSBoZWFkaW5nIGlzIGZpbHRlcmVkIG91dCBhbmQgaGFzIGEgbG93ZXIgbGV2ZWwgcHJldmlvdXMgaGVhZGluZywgZGV0ZXJtaW5lIGlmIHRoZSBoZWFkaW5nIGhhcyBhIHBhcmVudC4uLlxuICAgICAgICBsZXQgcGFyZW50ID0gZmFsc2U7XG4gICAgICAgIGxldCBrID0gbGVuIC0gMTtcbiAgICAgICAgZm9yICg7IGsgPj0gMDsgay0tKSB7XG4gICAgICAgICAgICBpZiAoaGVhZGluZ3Nba10ubGV2ZWwgPCBoZWFkaW5nLmxldmVsKSB7XG4gICAgICAgICAgICAgICAgcHJldiA9IGhlYWRpbmdzW2tdO1xuICAgICAgICAgICAgICAgIHBhcmVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gcGFyZW50LCByZXNldCBjb2xsYXBzaW5nLi4uXG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzQ29sbGFwc2VkID0gaGVhZGluZ3NbayArIDFdLmNlbGxSZWYubW9kZWwubWV0YWRhdGEuZ2V0KGNlbGxDb2xsYXBzZU1ldGFkYXRhKTtcbiAgICAgICAgICAgIGNvbGxhcHNlTGV2ZWwgPSBpc0NvbGxhcHNlZCA/IGhlYWRpbmdzW2sgKyAxXS5sZXZlbCA6IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcHJldiA9IG51bGw7XG4gICAgICAgICAgICBjb2xsYXBzZUxldmVsID0gLTE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtoZWFkaW5ncywgcHJldiwgY29sbGFwc2VMZXZlbF07XG59XG4vKipcbiAqIEV4cG9ydHMuXG4gKi9cbmV4cG9ydCB7IGFwcGVuZENvbGxhcHNpYmxlSGVhZGluZyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwZW5kX2NvbGxhcHNpYmxlX2hlYWRpbmcuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgaXNIZWFkaW5nRmlsdGVyZWQgfSBmcm9tICcuL2lzX2hlYWRpbmdfZmlsdGVyZWQnO1xuLyoqXG4gKiBBcHBlbmRzIGEgbm90ZWJvb2sgaGVhZGluZyB0byBhIGxpc3Qgb2YgaGVhZGluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSBoZWFkaW5ncyAtIGxpc3Qgb2Ygbm90ZWJvb2sgaGVhZGluZ3NcbiAqIEBwYXJhbSBoZWFkaW5nIC0gcmVuZGVyZWQgaGVhZGluZ1xuICogQHBhcmFtIHByZXYgLSBwcmV2aW91cyBoZWFkaW5nXG4gKiBAcGFyYW0gY29sbGFwc2VMZXZlbCAtIGNvbGxhcHNlIGxldmVsXG4gKiBAcGFyYW0gdGFncyAtIGZpbHRlciB0YWdzXG4gKiBAcmV0dXJucyByZXN1bHQgdHVwbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZEhlYWRpbmcoaGVhZGluZ3MsIGhlYWRpbmcsIHByZXYsIGNvbGxhcHNlTGV2ZWwsIHRhZ3MpIHtcbiAgICBpZiAoaGVhZGluZyAmJiAhaXNIZWFkaW5nRmlsdGVyZWQoaGVhZGluZywgdGFncykgJiYgaGVhZGluZy50ZXh0KSB7XG4gICAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIHRoaXMgaGVhZGluZyBpcyBhIGNoaWxkIG9mIGEgXCJoZWFkZXJcIiBub3RlYm9vayBoZWFkaW5nLi4uXG4gICAgICAgIGlmIChwcmV2ICYmIHByZXYudHlwZSA9PT0gJ2hlYWRlcicpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBoZWFkaW5ncy5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgICAgIGlmIChoZWFkaW5nc1tqXSA9PT0gcHJldikge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjYW4gYSBoZWFkaW5nIGJlIHRoZSBjaGlsZCBvZiBtdWx0aXBsZSBoZWFkaW5ncz8gSWYgbm90LCB3ZSBjYW4gYGJyZWFrYCBoZXJlIHVwb24gZmluZGluZyBhIHBhcmVudCBoZWFkaW5nLCBzbyB3ZSBkb24ndCB0cmF2ZXJzZSB0aGUgZW50aXJlIGhlYWRpbmcgbGlzdC4uLlxuICAgICAgICAgICAgICAgICAgICBoZWFkaW5nc1tqXS5oYXNDaGlsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb2xsYXBzZUxldmVsIDwgMCkge1xuICAgICAgICAgICAgaGVhZGluZ3MucHVzaChoZWFkaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBwcmV2ID0gaGVhZGluZztcbiAgICB9XG4gICAgcmV0dXJuIFtoZWFkaW5ncywgcHJldl07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHBlbmRfaGVhZGluZy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBhcHBlbmRDb2xsYXBzaWJsZUhlYWRpbmcgfSBmcm9tICcuL2FwcGVuZF9jb2xsYXBzaWJsZV9oZWFkaW5nJztcbmltcG9ydCB7IGFwcGVuZEhlYWRpbmcgfSBmcm9tICcuL2FwcGVuZF9oZWFkaW5nJztcbi8qKlxuICogQXBwZW5kcyBhIE1hcmtkb3duIG5vdGVib29rIGhlYWRpbmcgdG8gYSBsaXN0IG9mIGhlYWRpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gaGVhZGluZ3MgLSBsaXN0IG9mIG5vdGVib29rIGhlYWRpbmdzXG4gKiBAcGFyYW0gaGVhZGluZyAtIHJlbmRlcmVkIGhlYWRpbmdcbiAqIEBwYXJhbSBwcmV2IC0gcHJldmlvdXMgaGVhZGluZ1xuICogQHBhcmFtIGNvbGxhcHNlTGV2ZWwgLSBjb2xsYXBzZSBsZXZlbFxuICogQHBhcmFtIHRhZ3MgLSBmaWx0ZXIgdGFnc1xuICogQHBhcmFtIGNvbGxhcHNlZCAtIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIGEgaGVhZGluZyBpcyBjb2xsYXBzZWRcbiAqIEBwYXJhbSBzaG93TWFya2Rvd24gLSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0byBzaG93IE1hcmtkb3duIHByZXZpZXdzXG4gKiBAcGFyYW0gY2VsbENvbGxhcHNlTWV0YWRhdGEgLSBpbmRpY2F0ZXMgd2hpY2ggbWV0YWRhdGEgc3RyaW5nIHRvIHVzZSBiYXNlZCBvbiB0aGUgY2VsbFN5bmNTZXR0aW5nXG4gKiBAcmV0dXJucyByZXN1bHQgdHVwbGVcbiAqL1xuZnVuY3Rpb24gYXBwZW5kTWFya2Rvd25IZWFkaW5nKGhlYWRpbmcsIGhlYWRpbmdzLCBwcmV2LCBjb2xsYXBzZUxldmVsLCB0YWdzLCBjb2xsYXBzZWQsIHNob3dNYXJrZG93biwgY2VsbENvbGxhcHNlTWV0YWRhdGEpIHtcbiAgICBpZiAoaGVhZGluZyAmJiBoZWFkaW5nLnR5cGUgPT09ICdtYXJrZG93bicgJiYgc2hvd01hcmtkb3duKSB7XG4gICAgICAgIC8vIEFwcGVuZCBhIE1hcmtkb3duIHByZXZpZXcgaGVhZGluZzpcbiAgICAgICAgW2hlYWRpbmdzLCBwcmV2XSA9IGFwcGVuZEhlYWRpbmcoaGVhZGluZ3MsIGhlYWRpbmcsIHByZXYsIGNvbGxhcHNlTGV2ZWwsIHRhZ3MpO1xuICAgIH1cbiAgICBlbHNlIGlmIChoZWFkaW5nICYmIGhlYWRpbmcudHlwZSA9PT0gJ2hlYWRlcicpIHtcbiAgICAgICAgW2hlYWRpbmdzLCBwcmV2LCBjb2xsYXBzZUxldmVsXSA9IGFwcGVuZENvbGxhcHNpYmxlSGVhZGluZyhoZWFkaW5ncywgaGVhZGluZywgcHJldiwgY29sbGFwc2VMZXZlbCwgdGFncywgY29sbGFwc2VkLCBjZWxsQ29sbGFwc2VNZXRhZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBbaGVhZGluZ3MsIHByZXYsIGNvbGxhcHNlTGV2ZWxdO1xufVxuLyoqXG4gKiBFeHBvcnRzLlxuICovXG5leHBvcnQgeyBhcHBlbmRNYXJrZG93bkhlYWRpbmcgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcGVuZF9tYXJrZG93bl9oZWFkaW5nLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHNhbml0aXplck9wdGlvbnMgfSBmcm9tICcuLi8uLi91dGlscy9zYW5pdGl6ZXJfb3B0aW9ucyc7XG4vKipcbiAqIENsYXNzIGZvciByZW5kZXJpbmcgYSBjb2RlIGNvbXBvbmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jbGFzcyBDb2RlQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgY29kZSBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvcHMgLSBjb21wb25lbnQgcHJvcGVydGllc1xuICAgICAqIEByZXR1cm5zIGNvZGUgY29tcG9uZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0geyBoZWFkaW5nOiBwcm9wcy5oZWFkaW5nIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgY29kZSBjb21wb25lbnQgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvcHMgLSBjb21wb25lbnQgcHJvcGVydGllc1xuICAgICAqL1xuICAgIFVOU0FGRV9jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgaGVhZGluZzogbmV4dFByb3BzLmhlYWRpbmcgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYSBjb2RlIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHJlbmRlcmVkIGNvbXBvbmVudFxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IHJlbmRlcmVkIENvZGVNaXJyb3I6XG4gICAgICAgIGxldCBodG1sID0gdGhpcy5zdGF0ZS5oZWFkaW5nLmNlbGxSZWYuZWRpdG9yLmhvc3QuaW5uZXJIVE1MO1xuICAgICAgICAvLyBTYW5pdGl6ZSB0aGUgSFRNTDpcbiAgICAgICAgaHRtbCA9IHRoaXMucHJvcHMuc2FuaXRpemVyLnNhbml0aXplKGh0bWwsIHNhbml0aXplck9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiY20tdG9jXCIsIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7IF9faHRtbDogaHRtbCB9IH0pKTtcbiAgICB9XG59XG4vKipcbiAqIEV4cG9ydHMuXG4gKi9cbmV4cG9ydCB7IENvZGVDb21wb25lbnQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvZGVtaXJyb3IuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgUnVubmluZ1N0YXR1cyB9IGZyb20gJy4uLy4uL3V0aWxzL2hlYWRpbmdzJztcbi8qKlxuICogUmV0dXJucyBhIGNvZGUgZW50cnkgbm90ZWJvb2sgaGVhZGluZyBmcm9tIGEgY29kZSBzdHJpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB0ZXh0IC0gY29kZSBzdHJpbmdcbiAqIEBwYXJhbSBvbkNsaWNrIC0gY2FsbGJhY2sgd2hpY2ggcmV0dXJucyBhIFwiY2xpY2tcIiBoYW5kbGVyXG4gKiBAcGFyYW0gZXhlY3V0aW9uQ291bnQgLSBleGVjdXRpb24gY291bnRcbiAqIEBwYXJhbSBsYXN0TGV2ZWwgLSBsYXN0IGhlYWRpbmcgbGV2ZWxcbiAqIEBwYXJhbSBjZWxsUmVmIC0gY2VsbCByZWZlcmVuY2VcbiAqIEBwYXJhbSBpbmRleCAtIGluZGV4IG9mIHJlZmVyZW5jZWQgY2VsbCByZWxhdGl2ZSB0byBvdGhlciBjZWxscyBpbiB0aGUgbm90ZWJvb2tcbiAqIEByZXR1cm5zIG5vdGVib29rIGhlYWRpbmdcbiAqL1xuZnVuY3Rpb24gZ2V0Q29kZUNlbGxIZWFkaW5nKHRleHQsIG9uQ2xpY2ssIGV4ZWN1dGlvbkNvdW50LCBsYXN0TGV2ZWwsIGNlbGxSZWYsIGluZGV4ID0gLTEsIGlzUnVubmluZyA9IFJ1bm5pbmdTdGF0dXMuSWRsZSkge1xuICAgIGxldCBoZWFkaW5ncyA9IFtdO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdEZXByZWNhdGlvbiB3YXJuaW5nISBpbmRleCBhcmd1bWVudCB3aWxsIGJlY29tZSBtYW5kYXRvcnkgaW4gdGhlIG5leHQgdmVyc2lvbicpO1xuICAgIH1cbiAgICBpZiAodGV4dCkge1xuICAgICAgICBjb25zdCBsaW5lcyA9IHRleHQuc3BsaXQoJ1xcbicpO1xuICAgICAgICBjb25zdCBsZW4gPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIDMpO1xuICAgICAgICBsZXQgc3RyID0gJyc7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgZm9yICg7IGkgPCBsZW4gLSAxOyBpKyspIHtcbiAgICAgICAgICAgIHN0ciArPSBsaW5lc1tpXSArICdcXG4nO1xuICAgICAgICB9XG4gICAgICAgIHN0ciArPSBsaW5lc1tpXTtcbiAgICAgICAgaGVhZGluZ3MucHVzaCh7XG4gICAgICAgICAgICB0ZXh0OiBzdHIsXG4gICAgICAgICAgICBsZXZlbDogbGFzdExldmVsICsgMSxcbiAgICAgICAgICAgIG9uQ2xpY2s6IG9uQ2xpY2soMCksXG4gICAgICAgICAgICB0eXBlOiAnY29kZScsXG4gICAgICAgICAgICBwcm9tcHQ6IGV4ZWN1dGlvbkNvdW50LFxuICAgICAgICAgICAgY2VsbFJlZjogY2VsbFJlZixcbiAgICAgICAgICAgIGhhc0NoaWxkOiBmYWxzZSxcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIGlzUnVubmluZ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGhlYWRpbmdzWzBdO1xufVxuLyoqXG4gKiBFeHBvcnRzLlxuICovXG5leHBvcnQgeyBnZXRDb2RlQ2VsbEhlYWRpbmcgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdldF9jb2RlX2NlbGxfaGVhZGluZy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIFJldHVybnMgdGhlIGxhc3QgaGVhZGluZyBsZXZlbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIGhlYWRpbmdzIC0gbGlzdCBvZiBub3RlYm9vayBoZWFkaW5nc1xuICogQHJldHVybnMgaGVhZGluZyBsZXZlbFxuICovXG5mdW5jdGlvbiBnZXRMYXN0SGVhZGluZ0xldmVsKGhlYWRpbmdzKSB7XG4gICAgaWYgKGhlYWRpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IGxvYyA9IGhlYWRpbmdzLmxlbmd0aCAtIDE7XG4gICAgICAgIHdoaWxlIChsb2MgPj0gMCkge1xuICAgICAgICAgICAgaWYgKGhlYWRpbmdzW2xvY10udHlwZSA9PT0gJ2hlYWRlcicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGVhZGluZ3NbbG9jXS5sZXZlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvYyAtPSAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwO1xufVxuLyoqXG4gKiBFeHBvcnRzLlxuICovXG5leHBvcnQgeyBnZXRMYXN0SGVhZGluZ0xldmVsIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1nZXRfbGFzdF9oZWFkaW5nX2xldmVsLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IGdlbmVyYXRlTnVtYmVyaW5nIH0gZnJvbSAnLi4vLi4vdXRpbHMvZ2VuZXJhdGVfbnVtYmVyaW5nJztcbmltcG9ydCB7IFJ1bm5pbmdTdGF0dXMgfSBmcm9tICcuLi8uLi91dGlscy9oZWFkaW5ncyc7XG5pbXBvcnQgeyBwYXJzZUhlYWRpbmcgfSBmcm9tICcuLi8uLi91dGlscy9wYXJzZV9oZWFkaW5nJztcbi8qKlxuICogUGFyc2VzIGEgTWFya2Rvd24gc3RyaW5nIGFuZCByZXR1cm5zIGEgbm90ZWJvb2sgaGVhZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHRleHQgLSBNYXJrZG93biBzdHJpbmdcbiAqIEBwYXJhbSBvbkNsaWNrIC0gY2FsbGJhY2sgd2hpY2ggcmV0dXJucyBhIFwiY2xpY2tcIiBoYW5kbGVyXG4gKiBAcGFyYW0gZGljdCAtIG51bWJlcmluZyBkaWN0aW9uYXJ5XG4gKiBAcGFyYW0gbGFzdExldmVsIC0gbGFzdCBsZXZlbFxuICogQHBhcmFtIGNlbGxSZWYgLSBjZWxsIHJlZmVyZW5jZVxuICogQHBhcmFtIGluZGV4IC0gaW5kZXggb2YgcmVmZXJlbmNlZCBjZWxsIHJlbGF0aXZlIHRvIG90aGVyIGNlbGxzIGluIHRoZSBub3RlYm9va1xuICogQHJldHVybnMgbm90ZWJvb2sgaGVhZGluZ1xuICovXG5mdW5jdGlvbiBnZXRNYXJrZG93bkhlYWRpbmdzKHRleHQsIG9uQ2xpY2ssIGRpY3QsIGxhc3RMZXZlbCwgY2VsbFJlZiwgaW5kZXggPSAtMSwgaXNSdW5uaW5nID0gUnVubmluZ1N0YXR1cy5JZGxlKSB7XG4gICAgY29uc3QgY2FsbGJhY2sgPSBvbkNsaWNrKDApO1xuICAgIGxldCBoZWFkaW5ncyA9IFtdO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdEZXByZWNhdGlvbiB3YXJuaW5nISBpbmRleCBhcmd1bWVudCB3aWxsIGJlY29tZSBtYW5kYXRvcnkgaW4gdGhlIG5leHQgdmVyc2lvbicpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGxpbmUgb2YgdGV4dC5zcGxpdCgnXFxuJykpIHtcbiAgICAgICAgaWYgKGxpbmUpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRpbmcgPSBwYXJzZUhlYWRpbmcobGluZSk7XG4gICAgICAgICAgICBpZiAoaGVhZGluZykge1xuICAgICAgICAgICAgICAgIGhlYWRpbmdzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBoZWFkaW5nLnRleHQsXG4gICAgICAgICAgICAgICAgICAgIGxldmVsOiBoZWFkaW5nLmxldmVsLFxuICAgICAgICAgICAgICAgICAgICBudW1iZXJpbmc6IGdlbmVyYXRlTnVtYmVyaW5nKGRpY3QsIGhlYWRpbmcubGV2ZWwpLFxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2hlYWRlcicsXG4gICAgICAgICAgICAgICAgICAgIGNlbGxSZWY6IGNlbGxSZWYsXG4gICAgICAgICAgICAgICAgICAgIGhhc0NoaWxkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaXNSdW5uaW5nLFxuICAgICAgICAgICAgICAgICAgICBpbmRleFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaGVhZGluZ3MucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGxpbmUsXG4gICAgICAgICAgICAgICAgICAgIGxldmVsOiBsYXN0TGV2ZWwgKyAxLFxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ21hcmtkb3duJyxcbiAgICAgICAgICAgICAgICAgICAgY2VsbFJlZjogY2VsbFJlZixcbiAgICAgICAgICAgICAgICAgICAgaGFzQ2hpbGQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpc1J1bm5pbmcsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGhlYWRpbmdzO1xufVxuLyoqXG4gKiBFeHBvcnRzLlxuICovXG5leHBvcnQgeyBnZXRNYXJrZG93bkhlYWRpbmdzIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1nZXRfbWFya2Rvd25faGVhZGluZy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBnZW5lcmF0ZU51bWJlcmluZyB9IGZyb20gJy4uLy4uL3V0aWxzL2dlbmVyYXRlX251bWJlcmluZyc7XG5pbXBvcnQgeyBSdW5uaW5nU3RhdHVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaGVhZGluZ3MnO1xuaW1wb3J0IHsgc2FuaXRpemVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL3V0aWxzL3Nhbml0aXplcl9vcHRpb25zJztcbi8qKlxuICogUmV0dXJucyBhIG5vdGVib29rIGhlYWRpbmcgZnJvbSBhbiBIVE1MIGVsZW1lbnQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSBub2RlIC0gSFRNTCBlbGVtZW50XG4gKiBAcGFyYW0gb25DbGljayAtIGNhbGxiYWNrIHdoaWNoIHJldHVybnMgYSBcImNsaWNrXCIgaGFuZGxlclxuICogQHBhcmFtIGRpY3QgLSBudW1iZXJpbmcgZGljdGlvbmFyeVxuICogQHBhcmFtIGxhc3RMZXZlbCAtIGxhc3QgbGV2ZWxcbiAqIEBwYXJhbSBudW1iZXJpbmcgLSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgbnVtYmVyaW5nXG4gKiBAcGFyYW0gbnVtYmVyaW5nSDEgLSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgZmlyc3QgbGV2ZWwgaGVhZGVycyBudW1iZXJpbmdcbiAqIEBwYXJhbSBjZWxsUmVmIC0gY2VsbCByZWZlcmVuY2VcbiAqIEBwYXJhbSBpbmRleCAtIGluZGV4IG9mIHJlZmVyZW5jZWQgY2VsbCByZWxhdGl2ZSB0byBvdGhlciBjZWxscyBpbiB0aGUgbm90ZWJvb2tcbiAqIEByZXR1cm5zIG5vdGVib29rIGhlYWRpbmdcbiAqL1xuZnVuY3Rpb24gZ2V0UmVuZGVyZWRIVE1MSGVhZGluZ3Mobm9kZSwgb25DbGljaywgc2FuaXRpemVyLCBkaWN0LCBsYXN0TGV2ZWwsIG51bWJlcmluZyA9IGZhbHNlLCBudW1iZXJpbmdIMSA9IHRydWUsIGNlbGxSZWYsIGluZGV4ID0gLTEsIGlzUnVubmluZyA9IFJ1bm5pbmdTdGF0dXMuSWRsZSkge1xuICAgIGxldCBub2RlcyA9IG5vZGUucXVlcnlTZWxlY3RvckFsbCgnaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCcpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdEZXByZWNhdGlvbiB3YXJuaW5nISBpbmRleCBhcmd1bWVudCB3aWxsIGJlY29tZSBtYW5kYXRvcnkgaW4gdGhlIG5leHQgdmVyc2lvbicpO1xuICAgIH1cbiAgICBsZXQgaGVhZGluZ3MgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGVsIG9mIG5vZGVzKSB7XG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2pwLXRvYy1pZ25vcmUnKSkge1xuICAgICAgICAgICAgLy8gc2tpcCB0aGlzIGVsZW1lbnQgaWYgYSBzcGVjaWFsIGNsYXNzIG5hbWUgaXMgaW5jbHVkZWRcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAncCcpIHtcbiAgICAgICAgICAgIGlmIChlbC5pbm5lckhUTUwpIHtcbiAgICAgICAgICAgICAgICBsZXQgaHRtbCA9IHNhbml0aXplci5zYW5pdGl6ZShlbC5pbm5lckhUTUwsIHNhbml0aXplck9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGhlYWRpbmdzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBsZXZlbDogbGFzdExldmVsICsgMSxcbiAgICAgICAgICAgICAgICAgICAgaHRtbDogaHRtbC5yZXBsYWNlKCfCticsICcnKSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogZWwudGV4dENvbnRlbnQgPyBlbC50ZXh0Q29udGVudCA6ICcnLFxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBvbkNsaWNrKGVsKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ21hcmtkb3duJyxcbiAgICAgICAgICAgICAgICAgICAgY2VsbFJlZjogY2VsbFJlZixcbiAgICAgICAgICAgICAgICAgICAgaGFzQ2hpbGQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGlzUnVubmluZ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ251bWJlcmluZy1lbnRyeScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUNoaWxkKGVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ251bWJlcmluZy1lbnRyeScpWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaHRtbCA9IHNhbml0aXplci5zYW5pdGl6ZShlbC5pbm5lckhUTUwsIHNhbml0aXplck9wdGlvbnMpO1xuICAgICAgICBodG1sID0gaHRtbC5yZXBsYWNlKCfCticsICcnKTtcbiAgICAgICAgbGV0IGxldmVsID0gcGFyc2VJbnQoZWwudGFnTmFtZVsxXSwgMTApO1xuICAgICAgICBpZiAoIW51bWJlcmluZ0gxKSB7XG4gICAgICAgICAgICBsZXZlbCAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuc3RyID0gZ2VuZXJhdGVOdW1iZXJpbmcoZGljdCwgbGV2ZWwpO1xuICAgICAgICBpZiAobnVtYmVyaW5nKSB7XG4gICAgICAgICAgICBjb25zdCBuaHRtbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIG5odG1sLmNsYXNzTGlzdC5hZGQoJ251bWJlcmluZy1lbnRyeScpO1xuICAgICAgICAgICAgbmh0bWwudGV4dENvbnRlbnQgPSBuc3RyICE9PSBudWxsICYmIG5zdHIgIT09IHZvaWQgMCA/IG5zdHIgOiAnJztcbiAgICAgICAgICAgIGVsLmluc2VydEJlZm9yZShuaHRtbCwgZWwuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgaGVhZGluZ3MucHVzaCh7XG4gICAgICAgICAgICBsZXZlbDogbGV2ZWwsXG4gICAgICAgICAgICB0ZXh0OiBlbC50ZXh0Q29udGVudCA/IGVsLnRleHRDb250ZW50IDogJycsXG4gICAgICAgICAgICBudW1iZXJpbmc6IG5zdHIsXG4gICAgICAgICAgICBodG1sOiBodG1sLFxuICAgICAgICAgICAgb25DbGljazogb25DbGljayhlbCksXG4gICAgICAgICAgICB0eXBlOiAnaGVhZGVyJyxcbiAgICAgICAgICAgIGNlbGxSZWY6IGNlbGxSZWYsXG4gICAgICAgICAgICBoYXNDaGlsZDogZmFsc2UsXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICBpc1J1bm5pbmdcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBoZWFkaW5ncztcbn1cbi8qKlxuICogRXhwb3J0cy5cbiAqL1xuZXhwb3J0IHsgZ2V0UmVuZGVyZWRIVE1MSGVhZGluZ3MgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdldF9yZW5kZXJlZF9odG1sX2hlYWRpbmcuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgTUFSS0RPV05fSEVBRElOR19DT0xMQVBTRUQgfSBmcm9tICdAanVweXRlcmxhYi9jZWxscyc7XG5pbXBvcnQgeyBOb3RlYm9va0FjdGlvbnMgfSBmcm9tICdAanVweXRlcmxhYi9ub3RlYm9vayc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGlzRE9NIH0gZnJvbSAnLi4vLi4vdXRpbHMvaXNfZG9tJztcbmltcG9ydCB7IGlzTWFya2Rvd24gfSBmcm9tICcuLi8uLi91dGlscy9pc19tYXJrZG93bic7XG5pbXBvcnQgeyBhcHBlbmRIZWFkaW5nIH0gZnJvbSAnLi9hcHBlbmRfaGVhZGluZyc7XG5pbXBvcnQgeyBhcHBlbmRNYXJrZG93bkhlYWRpbmcgfSBmcm9tICcuL2FwcGVuZF9tYXJrZG93bl9oZWFkaW5nJztcbmltcG9ydCB7IGdldENvZGVDZWxsSGVhZGluZyB9IGZyb20gJy4vZ2V0X2NvZGVfY2VsbF9oZWFkaW5nJztcbmltcG9ydCB7IGdldExhc3RIZWFkaW5nTGV2ZWwgfSBmcm9tICcuL2dldF9sYXN0X2hlYWRpbmdfbGV2ZWwnO1xuaW1wb3J0IHsgZ2V0TWFya2Rvd25IZWFkaW5ncyB9IGZyb20gJy4vZ2V0X21hcmtkb3duX2hlYWRpbmcnO1xuaW1wb3J0IHsgZ2V0UmVuZGVyZWRIVE1MSGVhZGluZ3MgfSBmcm9tICcuL2dldF9yZW5kZXJlZF9odG1sX2hlYWRpbmcnO1xuaW1wb3J0IHsgT3B0aW9uc01hbmFnZXIgfSBmcm9tICcuL29wdGlvbnNfbWFuYWdlcic7XG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICcuL3JlbmRlcic7XG5pbXBvcnQgeyB0b29sYmFyIH0gZnJvbSAnLi90b29sYmFyX2dlbmVyYXRvcic7XG5pbXBvcnQgeyBSdW5uaW5nU3RhdHVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaGVhZGluZ3MnO1xuLyoqXG4gKiBSZXR1cm5zIGEgVG9DIGdlbmVyYXRvciBmb3Igbm90ZWJvb2tzLlxuICpcbiAqIEBwYXJhbSB0cmFja2VyIC0gbm90ZWJvb2sgdHJhY2tlclxuICogQHBhcmFtIHdpZGdldCAtIHRhYmxlIG9mIGNvbnRlbnRzIHdpZGdldFxuICogQHBhcmFtIHNhbml0aXplciAtIEhUTUwgc2FuaXRpemVyXG4gKiBAcGFyYW0gdHJhbnNsYXRvciAtIExhbmd1YWdlIHRyYW5zbGF0b3JcbiAqIEBwYXJhbSBzZXR0aW5ncyAtIGFkdmFuY2VkIHNldHRpbmdzIGZvciB0b2MgZXh0ZW5zaW9uXG4gKiBAcmV0dXJucyBUb0MgZ2VuZXJhdG9yIGNhcGFibGUgb2YgcGFyc2luZyBub3RlYm9va3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vdGVib29rR2VuZXJhdG9yKHRyYWNrZXIsIHdpZGdldCwgc2FuaXRpemVyLCB0cmFuc2xhdG9yLCBzZXR0aW5ncykge1xuICAgIHJldHVybiBuZXcgTm90ZWJvb2tHZW5lcmF0b3IodHJhY2tlciwgd2lkZ2V0LCBzYW5pdGl6ZXIsIHRyYW5zbGF0b3IsIHNldHRpbmdzKTtcbn1cbmNsYXNzIE5vdGVib29rR2VuZXJhdG9yIHtcbiAgICAvKipcbiAgICAgKiBOb3RlYm9vayBUYWJsZSBvZiBDb250ZW50IEdlbmVyYXRvciBjb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHRyYWNrZXIgLSBub3RlYm9vayB0cmFja2VyXG4gICAgICogQHBhcmFtIHdpZGdldCAtIHRhYmxlIG9mIGNvbnRlbnRzIHdpZGdldFxuICAgICAqIEBwYXJhbSBzYW5pdGl6ZXIgLSBIVE1MIHNhbml0aXplclxuICAgICAqIEBwYXJhbSB0cmFuc2xhdG9yIC0gTGFuZ3VhZ2UgdHJhbnNsYXRvclxuICAgICAqIEBwYXJhbSBzZXR0aW5ncyAtIGFkdmFuY2VkIHNldHRpbmdzIGZvciB0b2MgZXh0ZW5zaW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodHJhY2tlciwgd2lkZ2V0LCBzYW5pdGl6ZXIsIHRyYW5zbGF0b3IsIHNldHRpbmdzKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW5kZXJzIGEgdGFibGUgb2YgY29udGVudHMgaXRlbS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGl0ZW0gLSBoZWFkaW5nIHRvIHJlbmRlclxuICAgICAgICAgKiBAcGFyYW0gdG9jIC0gbGlzdCBvZiBhbGwgaGVhZGVycyB0byByZW5kZXJcbiAgICAgICAgICogQHJldHVybnMgcmVuZGVyZWQgaXRlbVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pdGVtUmVuZGVyZXIgPSAoaXRlbSwgdG9jID0gW10pID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZW5kZXIodGhpcy5vcHRpb25zLCB0aGlzLnRyYWNrZXIsIHRoaXMud2lkZ2V0LCBpdGVtLCB0b2MpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNhbml0aXplciA9IHNhbml0aXplcjtcbiAgICAgICAgdGhpcy50cmFja2VyID0gdHJhY2tlcjtcbiAgICAgICAgdGhpcy53aWRnZXQgPSB3aWRnZXQ7XG4gICAgICAgIHRoaXMuX3J1bm5pbmdDZWxscyA9IG5ldyBBcnJheSgpO1xuICAgICAgICBsZXQgbnVtYmVyaW5nSDEgPSB0cnVlO1xuICAgICAgICBsZXQgaW5jbHVkZU91dHB1dCA9IHRydWU7XG4gICAgICAgIGxldCBzeW5jQ29sbGFwc2VTdGF0ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIG51bWJlcmluZ0gxID0gc2V0dGluZ3MuY29tcG9zaXRlLm51bWJlcmluZ0gxO1xuICAgICAgICAgICAgaW5jbHVkZU91dHB1dCA9IHNldHRpbmdzLmNvbXBvc2l0ZS5pbmNsdWRlT3V0cHV0O1xuICAgICAgICAgICAgc3luY0NvbGxhcHNlU3RhdGUgPSBzZXR0aW5ncy5jb21wb3NpdGUuc3luY0NvbGxhcHNlU3RhdGU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9ICh0aGlzLm9wdGlvbnMgPSBuZXcgT3B0aW9uc01hbmFnZXIod2lkZ2V0LCB0cmFja2VyLCB7XG4gICAgICAgICAgICBudW1iZXJpbmc6IGZhbHNlLFxuICAgICAgICAgICAgbnVtYmVyaW5nSDE6IG51bWJlcmluZ0gxLFxuICAgICAgICAgICAgaW5jbHVkZU91dHB1dDogaW5jbHVkZU91dHB1dCxcbiAgICAgICAgICAgIHN5bmNDb2xsYXBzZVN0YXRlOiBzeW5jQ29sbGFwc2VTdGF0ZSxcbiAgICAgICAgICAgIHNhbml0aXplcjogc2FuaXRpemVyLFxuICAgICAgICAgICAgdHJhbnNsYXRvcjogdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvclxuICAgICAgICB9KSk7XG4gICAgICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICAgICAgc2V0dGluZ3MuY2hhbmdlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLm51bWJlcmluZ0gxID0gc2V0dGluZ3MuY29tcG9zaXRlLm51bWJlcmluZ0gxO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuaW5jbHVkZU91dHB1dCA9IHNldHRpbmdzLmNvbXBvc2l0ZS5pbmNsdWRlT3V0cHV0O1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuc3luY0NvbGxhcHNlU3RhdGUgPSBzZXR0aW5ncy5jb21wb3NpdGVcbiAgICAgICAgICAgICAgICAgICAgLnN5bmNDb2xsYXBzZVN0YXRlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJhY2tlci5hY3RpdmVDZWxsQ2hhbmdlZC5jb25uZWN0KChzZW5kZXIsIGFyZ3MpID0+IHtcbiAgICAgICAgICAgIHdpZGdldC51cGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIE5vdGVib29rQWN0aW9ucy5leGVjdXRpb25TY2hlZHVsZWQuY29ubmVjdCgoXywgYXJncykgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9ydW5uaW5nQ2VsbHMuaW5jbHVkZXMoYXJncy5jZWxsKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3J1bm5pbmdDZWxscy5wdXNoKGFyZ3MuY2VsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBOb3RlYm9va0FjdGlvbnMuZXhlY3V0ZWQuY29ubmVjdCgoXywgYXJncykgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcnVubmluZ0NlbGxzLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwgPT09IGFyZ3MuY2VsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ydW5uaW5nQ2VsbHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNpZ25hbCB0byBpbmRpY2F0ZSB0aGF0IGEgY29sbGFwc2UgZXZlbnQgaGFwcGVuZWQgdG8gdGhpcyBoZWFkaW5nXG4gICAgICogd2l0aGluIHRoZSBUb0MuXG4gICAgICovXG4gICAgZ2V0IGNvbGxhcHNlQ2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jb2xsYXBzZUNoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSB0b29sYmFyIGdlbmVyYXRvci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRvb2xiYXIgZ2VuZXJhdG9yXG4gICAgICovXG4gICAgdG9vbGJhckdlbmVyYXRvcigpIHtcbiAgICAgICAgcmV0dXJuIHRvb2xiYXIodGhpcy5vcHRpb25zLCB0aGlzLnRyYWNrZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSB0YWJsZSBvZiBjb250ZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYW5lbCAtIG5vdGVib29rIHdpZGdldFxuICAgICAqIEByZXR1cm5zIGEgbGlzdCBvZiBoZWFkaW5nc1xuICAgICAqL1xuICAgIGdlbmVyYXRlKHBhbmVsKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgbGV0IGhlYWRpbmdzID0gW107XG4gICAgICAgIGxldCBjb2xsYXBzZUxldmVsID0gLTE7XG4gICAgICAgIGxldCBkaWN0ID0ge307XG4gICAgICAgIC8vIEluaXRpYWxpemUgYSB2YXJpYWJsZSBmb3Iga2VlcGluZyB0cmFjayBvZiB0aGUgcHJldmlvdXMgaGVhZGluZzpcbiAgICAgICAgbGV0IHByZXYgPSBudWxsO1xuICAgICAgICAvLyBHZW5lcmF0ZSBoZWFkaW5ncyBieSBpdGVyYXRpbmcgdGhyb3VnaCBhbGwgbm90ZWJvb2sgY2VsbHMuLi5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYW5lbC5jb250ZW50LndpZGdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjZWxsID0gcGFuZWwuY29udGVudC53aWRnZXRzW2ldO1xuICAgICAgICAgICAgbGV0IG1vZGVsID0gY2VsbC5tb2RlbDtcbiAgICAgICAgICAgIGxldCBjZWxsQ29sbGFwc2VNZXRhZGF0YSA9IHRoaXMub3B0aW9ucy5zeW5jQ29sbGFwc2VTdGF0ZVxuICAgICAgICAgICAgICAgID8gTUFSS0RPV05fSEVBRElOR19DT0xMQVBTRURcbiAgICAgICAgICAgICAgICA6ICd0b2MtaHItY29sbGFwc2VkJztcbiAgICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IChfYSA9IG1vZGVsLm1ldGFkYXRhLmdldChjZWxsQ29sbGFwc2VNZXRhZGF0YSkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgaXNSdW5uaW5nID0gdGhpcy5fcnVubmluZ0NlbGxzLmluY2x1ZGVzKGNlbGwpXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9ydW5uaW5nQ2VsbHNbMF0gPT09IGNlbGxcbiAgICAgICAgICAgICAgICAgICAgPyBSdW5uaW5nU3RhdHVzLlJ1bm5pbmdcbiAgICAgICAgICAgICAgICAgICAgOiBSdW5uaW5nU3RhdHVzLlNjaGVkdWxlZFxuICAgICAgICAgICAgICAgIDogUnVubmluZ1N0YXR1cy5JZGxlO1xuICAgICAgICAgICAgc3dpdGNoIChtb2RlbC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29kZSc6IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLndpZGdldCB8fCAodGhpcy53aWRnZXQgJiYgdGhpcy5vcHRpb25zLnNob3dDb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb25DbGljayA9IChsaW5lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFuZWwuY29udGVudC5hY3RpdmVDZWxsSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsLm5vZGUuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gY2VsbC5tb2RlbC5leGVjdXRpb25Db3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4ZWN1dGlvbkluZGljYXRvciA9IGNvdW50ICE9PSBudWxsICYmIGNvdW50ICE9PSB2b2lkIDAgPyBjb3VudCA6IChpc1J1bm5pbmcgIT09IFJ1bm5pbmdTdGF0dXMuSWRsZSA/ICcqJyA6ICcgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXhlY3V0aW9uQ291bnQgPSBgWyR7ZXhlY3V0aW9uSW5kaWNhdG9yfV06IGA7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVhZGluZyA9IGdldENvZGVDZWxsSGVhZGluZyhtb2RlbC52YWx1ZS50ZXh0LCBvbkNsaWNrLCBleGVjdXRpb25Db3VudCwgZ2V0TGFzdEhlYWRpbmdMZXZlbChoZWFkaW5ncyksIGNlbGwsIGksIGlzUnVubmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBbaGVhZGluZ3MsIHByZXZdID0gYXBwZW5kSGVhZGluZyhoZWFkaW5ncywgaGVhZGluZywgcHJldiwgY29sbGFwc2VMZXZlbCwgdGhpcy5vcHRpb25zLmZpbHRlcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmluY2x1ZGVPdXRwdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUgY29kZSBjZWxsIG91dHB1dHMgdG8gY2hlY2sgZm9yIE1hcmtkb3duIG9yIEhUTUwgZnJvbSB3aGljaCB3ZSBjYW4gZ2VuZXJhdGUgVG9DIGhlYWRpbmdzLi4uXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1vZGVsLm91dHB1dHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtID0gbW9kZWwub3V0cHV0cy5nZXQoaik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGR0eXBlcyA9IE9iamVjdC5rZXlzKG0uZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHR5cGVzID0gZHR5cGVzLmZpbHRlcih0ID0+IGlzTWFya2Rvd24odCkgfHwgaXNET00odCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZHR5cGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb25DbGljayA9IChlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFuZWwuY29udGVudC5hY3RpdmVDZWxsSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFuZWwuY29udGVudC5tb2RlID0gJ2NvbW1hbmQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBodG1sSGVhZGluZ3MgPSBnZXRSZW5kZXJlZEhUTUxIZWFkaW5ncyhjZWxsLm91dHB1dEFyZWEud2lkZ2V0c1tqXS5ub2RlLCBvbkNsaWNrLCB0aGlzLnNhbml0aXplciwgZGljdCwgZ2V0TGFzdEhlYWRpbmdMZXZlbChoZWFkaW5ncyksIHRoaXMub3B0aW9ucy5udW1iZXJpbmcsIHRoaXMub3B0aW9ucy5udW1iZXJpbmdIMSwgY2VsbCwgaSwgaXNSdW5uaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGhlYWRpbmcgb2YgaHRtbEhlYWRpbmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtoZWFkaW5ncywgcHJldiwgY29sbGFwc2VMZXZlbF0gPSBhcHBlbmRNYXJrZG93bkhlYWRpbmcoaGVhZGluZywgaGVhZGluZ3MsIHByZXYsIGNvbGxhcHNlTGV2ZWwsIHRoaXMub3B0aW9ucy5maWx0ZXJlZCwgY29sbGFwc2VkLCB0aGlzLm9wdGlvbnMuc2hvd01hcmtkb3duLCBjZWxsQ29sbGFwc2VNZXRhZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlICdtYXJrZG93bic6IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1jZWxsID0gY2VsbDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhlYWRpbmc7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0TGV2ZWwgPSBnZXRMYXN0SGVhZGluZ0xldmVsKGhlYWRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGNlbGwgaXMgcmVuZGVyZWQsIGdlbmVyYXRlIHRoZSBUb0MgaXRlbXMgZnJvbSB0aGUgSFRNTC4uLlxuICAgICAgICAgICAgICAgICAgICBpZiAobWNlbGwucmVuZGVyZWQgJiYgIW1jZWxsLmlucHV0SGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbkNsaWNrID0gKGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtY2VsbC5yZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFuZWwuY29udGVudC5hY3RpdmVDZWxsSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhbmVsLmNvbnRlbnQubW9kZSA9ICdjb21tYW5kJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwubm9kZS5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFuZWwuY29udGVudC5hY3RpdmVDZWxsSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBodG1sSGVhZGluZ3MgPSBnZXRSZW5kZXJlZEhUTUxIZWFkaW5ncyhjZWxsLm5vZGUsIG9uQ2xpY2ssIHRoaXMuc2FuaXRpemVyLCBkaWN0LCBsYXN0TGV2ZWwsIHRoaXMub3B0aW9ucy5udW1iZXJpbmcsIHRoaXMub3B0aW9ucy5udW1iZXJpbmdIMSwgY2VsbCwgaSwgaXNSdW5uaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaGVhZGluZyBvZiBodG1sSGVhZGluZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaGVhZGluZ3MsIHByZXYsIGNvbGxhcHNlTGV2ZWxdID0gYXBwZW5kTWFya2Rvd25IZWFkaW5nKGhlYWRpbmcsIGhlYWRpbmdzLCBwcmV2LCBjb2xsYXBzZUxldmVsLCB0aGlzLm9wdGlvbnMuZmlsdGVyZWQsIGNvbGxhcHNlZCwgdGhpcy5vcHRpb25zLnNob3dNYXJrZG93biwgY2VsbENvbGxhcHNlTWV0YWRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgbm90IHJlbmRlcmVkLCBnZW5lcmF0ZSBUb0MgaXRlbXMgZnJvbSB0aGUgY2VsbCB0ZXh0Li4uXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbkNsaWNrID0gKGxpbmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYW5lbC5jb250ZW50LmFjdGl2ZUNlbGxJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwubm9kZS5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFya2Rvd25IZWFkaW5ncyA9IGdldE1hcmtkb3duSGVhZGluZ3MobW9kZWwudmFsdWUudGV4dCwgb25DbGljaywgZGljdCwgbGFzdExldmVsLCBjZWxsLCBpLCBpc1J1bm5pbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChoZWFkaW5nIG9mIG1hcmtkb3duSGVhZGluZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaGVhZGluZ3MsIHByZXYsIGNvbGxhcHNlTGV2ZWxdID0gYXBwZW5kTWFya2Rvd25IZWFkaW5nKGhlYWRpbmcsIGhlYWRpbmdzLCBwcmV2LCBjb2xsYXBzZUxldmVsLCB0aGlzLm9wdGlvbnMuZmlsdGVyZWQsIGNvbGxhcHNlZCwgdGhpcy5vcHRpb25zLnNob3dNYXJrZG93biwgY2VsbENvbGxhcHNlTWV0YWRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE11c3QgYmUgZG9uZSBhZnRlcndhcmRzIGFzIGBoZWFkaW5nLmhhc0NoaWxkYCBuZWVkcyB0byBiZSB1cCB0byBkYXRlLlxuICAgICAgICAgICAgY29uc3QgbGFzdEhlYWRpbmcgPSBoZWFkaW5nc1toZWFkaW5ncy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmIChsYXN0SGVhZGluZykge1xuICAgICAgICAgICAgICAgIGxhc3RIZWFkaW5nLmlzUnVubmluZyA9IE1hdGgubWF4KGxhc3RIZWFkaW5nLmlzUnVubmluZywgaXNSdW5uaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGVhZGluZ3M7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBSZXR1cm5zIGEgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgYSBoZWFkaW5nIGlzIGZpbHRlcmVkIG91dCBieSBzZWxlY3RlZCB0YWdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gaGVhZGluZyAtIG5vdGVib29rIGhlYWRpbmdcbiAqIEBwYXJhbSB0YWdzIC0gbGlzdCBvZiB0YWdzXG4gKiBAcmV0dXJucyBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciBhIGhlYWRpbmcgaXMgZmlsdGVyZWRcbiAqL1xuZnVuY3Rpb24gaXNIZWFkaW5nRmlsdGVyZWQoaGVhZGluZywgdGFncykge1xuICAgIGlmICh0YWdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChoZWFkaW5nICYmIGhlYWRpbmcuY2VsbFJlZikge1xuICAgICAgICBsZXQgbWV0YSA9IGhlYWRpbmcuY2VsbFJlZi5tb2RlbC5tZXRhZGF0YTtcbiAgICAgICAgbGV0IGN0YWdzID0gbWV0YS5nZXQoJ3RhZ3MnKTtcbiAgICAgICAgaWYgKGN0YWdzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGN0YWdzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBjdGFnc1tqXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRhZ3MubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ3Nba10gPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbi8qKlxuICogRXhwb3J0cy5cbiAqL1xuZXhwb3J0IHsgaXNIZWFkaW5nRmlsdGVyZWQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzX2hlYWRpbmdfZmlsdGVyZWQuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG4vKipcbiAqIENsYXNzIGZvciBtYW5hZ2luZyBub3RlYm9vayBUb0MgZ2VuZXJhdG9yIG9wdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgT3B0aW9uc01hbmFnZXIge1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gb3B0aW9ucyBtYW5hZ2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHdpZGdldCAtIHRhYmxlIG9mIGNvbnRlbnRzIHdpZGdldFxuICAgICAqIEBwYXJhbSBub3RlYm9vayAtIG5vdGVib29rIHRyYWNrZXJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIGdlbmVyYXRvciBvcHRpb25zXG4gICAgICogQHJldHVybnMgb3B0aW9ucyBtYW5hZ2VyXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2lkZ2V0LCBub3RlYm9vaywgb3B0aW9ucykge1xuICAgICAgICB0aGlzLl9wcmVSZW5kZXJlZFRvb2xiYXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9maWx0ZXJlZCA9IFtdO1xuICAgICAgICB0aGlzLl9zaG93Q29kZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zaG93TWFya2Rvd24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc2hvd1RhZ3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdGFnVG9vbCA9IG51bGw7XG4gICAgICAgIHRoaXMuX251bWJlcmluZyA9IG9wdGlvbnMubnVtYmVyaW5nO1xuICAgICAgICB0aGlzLl9udW1iZXJpbmdIMSA9IG9wdGlvbnMubnVtYmVyaW5nSDE7XG4gICAgICAgIHRoaXMuX2luY2x1ZGVPdXRwdXQgPSBvcHRpb25zLmluY2x1ZGVPdXRwdXQ7XG4gICAgICAgIHRoaXMuX3N5bmNDb2xsYXBzZVN0YXRlID0gb3B0aW9ucy5zeW5jQ29sbGFwc2VTdGF0ZTtcbiAgICAgICAgdGhpcy5fd2lkZ2V0ID0gd2lkZ2V0O1xuICAgICAgICB0aGlzLl9ub3RlYm9vayA9IG5vdGVib29rO1xuICAgICAgICB0aGlzLnNhbml0aXplciA9IG9wdGlvbnMuc2FuaXRpemVyO1xuICAgICAgICB0aGlzLnN0b3JlVGFncyA9IFtdO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSBvcHRpb25zLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMuX2NvbGxhcHNlQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMvc2V0cyB0aGUgdGFnIHRvb2wgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHNldCB0YWdUb29sKHRhZ1Rvb2wpIHtcbiAgICAgICAgdGhpcy5fdGFnVG9vbCA9IHRhZ1Rvb2w7XG4gICAgfVxuICAgIGdldCB0YWdUb29sKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGFnVG9vbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyBub3RlYm9vayBtZXRhIGRhdGEuXG4gICAgICovXG4gICAgc2V0IG5vdGVib29rTWV0YWRhdGEodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX25vdGVib29rLmN1cnJlbnRXaWRnZXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbm90ZWJvb2suY3VycmVudFdpZGdldC5tb2RlbC5tZXRhZGF0YS5zZXQodmFsdWVbMF0sIHZhbHVlWzFdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzL3NldHMgVG9DIGdlbmVyYXRvciBudW1iZXJpbmcuXG4gICAgICovXG4gICAgc2V0IG51bWJlcmluZyh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9udW1iZXJpbmcgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fd2lkZ2V0LnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLm5vdGVib29rTWV0YWRhdGEgPSBbJ3RvYy1hdXRvbnVtYmVyaW5nJywgdGhpcy5fbnVtYmVyaW5nXTtcbiAgICB9XG4gICAgZ2V0IG51bWJlcmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX251bWJlcmluZztcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cy9zZXRzIFRvQyBnZW5lcmF0b3IgbnVtYmVyaW5nIGgxIGhlYWRlcnMuXG4gICAgICovXG4gICAgc2V0IG51bWJlcmluZ0gxKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLl9udW1iZXJpbmdIMSAhPSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbnVtYmVyaW5nSDEgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX3dpZGdldC51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgbnVtYmVyaW5nSDEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9udW1iZXJpbmdIMTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyB3aGV0aGVyIGNlbGwgb3V0cHV0cyBzaG91bGQgYmUgaW5jbHVkZWQgaW4gaGVhZGluZ3MuXG4gICAgICovXG4gICAgc2V0IGluY2x1ZGVPdXRwdXQodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luY2x1ZGVPdXRwdXQgIT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2luY2x1ZGVPdXRwdXQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX3dpZGdldC51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgaW5jbHVkZU91dHB1dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luY2x1ZGVPdXRwdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMvc2V0cyBvcHRpb24gZm9yIFRvQyBoZWFkaW5nIGNvbGxhcHNpbmcgdG8gYmUgcmVmbGVjdGVkIGluIE5vdGVib29rIGFuZCB2aWNlIHZlcnNhXG4gICAgICovXG4gICAgc2V0IHN5bmNDb2xsYXBzZVN0YXRlKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLl9zeW5jQ29sbGFwc2VTdGF0ZSAhPSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fc3luY0NvbGxhcHNlU3RhdGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX3dpZGdldC51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgc3luY0NvbGxhcHNlU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zeW5jQ29sbGFwc2VTdGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyB3aGV0aGVyIHRvIHNob3cgY29kZSBwcmV2aWV3cyBpbiB0aGUgdGFibGUgb2YgY29udGVudHMuXG4gICAgICovXG4gICAgc2V0IHNob3dDb2RlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3Nob3dDb2RlID0gdmFsdWU7XG4gICAgICAgIHRoaXMubm90ZWJvb2tNZXRhZGF0YSA9IFsndG9jLXNob3djb2RlJywgdGhpcy5fc2hvd0NvZGVdO1xuICAgICAgICB0aGlzLl93aWRnZXQudXBkYXRlKCk7XG4gICAgfVxuICAgIGdldCBzaG93Q29kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dDb2RlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHdoZXRoZXIgdG8gc2hvdyBNYXJrZG93biBwcmV2aWV3cyBpbiB0aGUgdGFibGUgb2YgY29udGVudHMuXG4gICAgICovXG4gICAgc2V0IHNob3dNYXJrZG93bih2YWx1ZSkge1xuICAgICAgICB0aGlzLl9zaG93TWFya2Rvd24gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5ub3RlYm9va01ldGFkYXRhID0gWyd0b2Mtc2hvd21hcmtkb3dudHh0JywgdGhpcy5fc2hvd01hcmtkb3duXTtcbiAgICAgICAgdGhpcy5fd2lkZ2V0LnVwZGF0ZSgpO1xuICAgIH1cbiAgICBnZXQgc2hvd01hcmtkb3duKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd01hcmtkb3duO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaWduYWwgZW1pdHRlZCB3aGVuIGEgXCJjb2xsYXBzZVwiIHR3aXN0IGJ1dHRvbiBpcyBwcmVzc2VkIGluIHRoZSBUb0NcbiAgICAgKi9cbiAgICBnZXQgY29sbGFwc2VDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sbGFwc2VDaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHdoZXRoZXIgdG8gc2hvdyB0YWdzIGluIHRoZSB0YWJsZSBvZiBjb250ZW50cy5cbiAgICAgKi9cbiAgICBzZXQgc2hvd1RhZ3ModmFsdWUpIHtcbiAgICAgICAgdGhpcy5fc2hvd1RhZ3MgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5ub3RlYm9va01ldGFkYXRhID0gWyd0b2Mtc2hvd3RhZ3MnLCB0aGlzLl9zaG93VGFnc107XG4gICAgICAgIHRoaXMuX3dpZGdldC51cGRhdGUoKTtcbiAgICB9XG4gICAgZ2V0IHNob3dUYWdzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd1RhZ3M7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIHNlbGVjdGVkIHRhZ3MuXG4gICAgICovXG4gICAgZ2V0IGZpbHRlcmVkKCkge1xuICAgICAgICBpZiAodGhpcy50YWdUb29sKSB7XG4gICAgICAgICAgICB0aGlzLl9maWx0ZXJlZCA9IHRoaXMudGFnVG9vbC5maWx0ZXJlZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0b3JlVGFncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9maWx0ZXJlZCA9IHRoaXMuc3RvcmVUYWdzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZmlsdGVyZWQgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMvc2V0cyBhIHByZS1yZW5kZXJlZCBhIHRvb2xiYXIuXG4gICAgICovXG4gICAgc2V0IHByZVJlbmRlcmVkVG9vbGJhcih2YWx1ZSkge1xuICAgICAgICB0aGlzLl9wcmVSZW5kZXJlZFRvb2xiYXIgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IHByZVJlbmRlcmVkVG9vbGJhcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ByZVJlbmRlcmVkVG9vbGJhcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBhIHRhYmxlIG9mIGNvbnRlbnRzIHdpZGdldC5cbiAgICAgKi9cbiAgICB1cGRhdGVXaWRnZXQoKSB7XG4gICAgICAgIHRoaXMuX3dpZGdldC51cGRhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBhIHRhYmxlIG9mIGNvbnRlbnRzIHdpZGdldCBhbmRcbiAgICAgKiBlbWl0cyBhIHNpZ25hbCBpbiBjYXNlIGFuIGV4dGVuc2lvbiB3YW50c1xuICAgICAqIHRvIHBlcmZvcm0gYW4gYWN0aW9uIHdoZW4gdGhlIGNvbGxhcHNlIGJ1dHRvblxuICAgICAqIGlzIHByZXNzZWQuXG4gICAgICovXG4gICAgdXBkYXRlQW5kQ29sbGFwc2UoYXJncykge1xuICAgICAgICB0aGlzLl9jb2xsYXBzZUNoYW5nZWQuZW1pdChhcmdzKTtcbiAgICAgICAgdGhpcy5fd2lkZ2V0LnVwZGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBvcHRpb25zLlxuICAgICAqXG4gICAgICogIyMgTm90ZXNcbiAgICAgKlxuICAgICAqIC0gIFRoaXMgd2lsbCAqKm5vdCoqIGNoYW5nZSBub3RlYm9vayBtZXRhLWRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbnVtYmVyaW5nIC0gYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gbnVtYmVyIGl0ZW1zXG4gICAgICogQHBhcmFtIG51bWJlcmluZ0gxIC0gYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gbnVtYmVyIGZpcnN0IGxldmVsIGl0ZW1zXG4gICAgICogQHBhcmFtIGluY2x1ZGVPdXRwdXQgLSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciBjZWxsIG91dHB1dHMgc2hvdWxkIGJlIGluY2x1ZGVkIGluIGhlYWRpbmdzXG4gICAgICogQHBhcmFtIHN5bmNDb2xsYXBzZVN0YXRlIC0gYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgY29sbGFwc2luZyBpbiBUb0Mgc2hvdWxkIGJlIHJlZmxlY3RlZCBpbiBOb3RlYm9vayBhbmQgdmljZSB2ZXJzYVxuICAgICAqIEBwYXJhbSBzaG93Q29kZSAtIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRvIHNob3cgY29kZSBwcmV2aWV3c1xuICAgICAqIEBwYXJhbSBzaG93TWFya2Rvd24gLSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0byBzaG93IE1hcmtkb3duIHByZXZpZXdzXG4gICAgICogQHBhcmFtIHNob3dUYWdzIC0gYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gc2hvdyB0YWdzXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZU9wdGlvbnMobnVtYmVyaW5nLCBudW1iZXJpbmdIMSwgaW5jbHVkZU91dHB1dCwgc3luY0NvbGxhcHNlU3RhdGUsIHNob3dDb2RlLCBzaG93TWFya2Rvd24sIHNob3dUYWdzKSB7XG4gICAgICAgIHRoaXMuX251bWJlcmluZyA9IG51bWJlcmluZztcbiAgICAgICAgdGhpcy5fbnVtYmVyaW5nSDEgPSBudW1iZXJpbmdIMTtcbiAgICAgICAgdGhpcy5faW5jbHVkZU91dHB1dCA9IGluY2x1ZGVPdXRwdXQ7XG4gICAgICAgIHRoaXMuX3N5bmNDb2xsYXBzZVN0YXRlID0gc3luY0NvbGxhcHNlU3RhdGU7XG4gICAgICAgIHRoaXMuX3Nob3dDb2RlID0gc2hvd0NvZGU7XG4gICAgICAgIHRoaXMuX3Nob3dNYXJrZG93biA9IHNob3dNYXJrZG93bjtcbiAgICAgICAgdGhpcy5fc2hvd1RhZ3MgPSBzaG93VGFncztcbiAgICAgICAgdGhpcy5fd2lkZ2V0LnVwZGF0ZSgpO1xuICAgIH1cbn1cbi8qKlxuICogRXhwb3J0cy5cbiAqL1xuZXhwb3J0IHsgT3B0aW9uc01hbmFnZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9wdGlvbnNfbWFuYWdlci5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBNQVJLRE9XTl9IRUFESU5HX0NPTExBUFNFRCB9IGZyb20gJ0BqdXB5dGVybGFiL2NlbGxzJztcbmltcG9ydCB7IE5vdGVib29rQWN0aW9ucyB9IGZyb20gJ0BqdXB5dGVybGFiL25vdGVib29rJztcbmltcG9ydCB7IGNsYXNzZXMsIGVsbGlwc2VzSWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgRWxlbWVudEV4dCB9IGZyb20gJ0BsdW1pbm8vZG9tdXRpbHMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgc2FuaXRpemVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL3V0aWxzL3Nhbml0aXplcl9vcHRpb25zJztcbmltcG9ydCB7IENvZGVDb21wb25lbnQgfSBmcm9tICcuL2NvZGVtaXJyb3InO1xuLyoqXG4gKiBDbGFzcyBuYW1lIG9mIHRoZSB0b2MgaXRlbSBsaXN0LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IFRPQ19UUkVFX0NMQVNTID0gJ2pwLVRhYmxlT2ZDb250ZW50cy1jb250ZW50Jztcbi8qKlxuICogUmVuZGVycyBhIG5vdGVib29rIHRhYmxlIG9mIGNvbnRlbnRzIGl0ZW0uXG4gKlxuICogQHBhcmFtIG9wdGlvbnMgLSBnZW5lcmF0b3Igb3B0aW9uc1xuICogQHBhcmFtIHRyYWNrZXIgLSBub3RlYm9vayB0cmFja2VyXG4gKiBAcGFyYW0gaXRlbSAtIG5vdGVib29rIGhlYWRpbmdcbiAqIEBwYXJhbSB0b2MgLSBjdXJyZW50IGxpc3Qgb2Ygbm90ZWJvb2sgaGVhZGluZ3NcbiAqIEByZXR1cm5zIHJlbmRlcmVkIGl0ZW1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihvcHRpb25zLCB0cmFja2VyLCB3aWRnZXQsIGl0ZW0sIHRvYyA9IFtdKSB7XG4gICAgaWYgKGl0ZW0udHlwZSA9PT0gJ21hcmtkb3duJyB8fCBpdGVtLnR5cGUgPT09ICdoZWFkZXInKSB7XG4gICAgICAgIGNvbnN0IGZvbnRTaXplQ2xhc3MgPSBpdGVtLnR5cGUgPT09ICdoZWFkZXInXG4gICAgICAgICAgICA/IGB0b2MtbGV2ZWwtc2l6ZS0ke2l0ZW0ubGV2ZWx9YFxuICAgICAgICAgICAgOiAndG9jLWxldmVsLXNpemUtZGVmYXVsdCc7XG4gICAgICAgIGNvbnN0IG51bWJlcmluZyA9IGl0ZW0ubnVtYmVyaW5nICYmIG9wdGlvbnMubnVtYmVyaW5nID8gaXRlbS5udW1iZXJpbmcgOiAnJztcbiAgICAgICAgY29uc3QgY2VsbENvbGxhcHNlTWV0YWRhdGEgPSBvcHRpb25zLnN5bmNDb2xsYXBzZVN0YXRlXG4gICAgICAgICAgICA/IE1BUktET1dOX0hFQURJTkdfQ09MTEFQU0VEXG4gICAgICAgICAgICA6ICd0b2MtaHItY29sbGFwc2VkJztcbiAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ2hlYWRlcicgfHwgb3B0aW9ucy5zaG93TWFya2Rvd24pIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IGl0ZW0uaHRtbCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7XG4gICAgICAgICAgICAgICAgICAgIF9faHRtbDogbnVtYmVyaW5nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2FuaXRpemVyLnNhbml0aXplKGl0ZW0uaHRtbCwgc2FuaXRpemVyT3B0aW9ucylcbiAgICAgICAgICAgICAgICB9LCBjbGFzc05hbWU6IGAke2l0ZW0udHlwZX0tY2VsbCB0b2MtY2VsbC1pdGVtYCB9KSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IGAke2l0ZW0udHlwZX0tY2VsbCB0b2MtY2VsbC1pdGVtYCB9LCBudW1iZXJpbmcgKyBpdGVtLnRleHQpKTtcbiAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdoZWFkZXInKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLUNvbGxhcHNlciBwLVdpZGdldCBsbS1XaWRnZXRcIiwgb25DbGljazogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2sodHJhY2tlciwgY2VsbENvbGxhcHNlTWV0YWRhdGEsIGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidG9jLUNvbGxhcHNlci1jaGlsZFwiIH0pKSk7XG4gICAgICAgICAgICAgICAgbGV0IGNvbGxhcHNlZDtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jZWxsUmVmLm1vZGVsLm1ldGFkYXRhLmhhcyhjZWxsQ29sbGFwc2VNZXRhZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGFwc2VkID0gaXRlbS5jZWxsUmVmLm1vZGVsLm1ldGFkYXRhLmdldChjZWxsQ29sbGFwc2VNZXRhZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBlbGxpcHNlQnV0dG9uID0gY29sbGFwc2VkID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidG9jLUVsbGlwc2VzXCIsIG9uQ2xpY2s6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrKHRyYWNrZXIsIGNlbGxDb2xsYXBzZU1ldGFkYXRhLCBpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KGVsbGlwc2VzSWNvbi5yZWFjdCwgbnVsbCkpKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KE5vdGVib29rSGVhZGluZywgeyBpc0FjdGl2ZTogdHJhY2tlci5hY3RpdmVDZWxsID09PSBpdGVtLmNlbGxSZWYgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzSGVhZGVyKHRyYWNrZXIsIGl0ZW0sIHRvYyksIGNsYXNzTmFtZTogJ3RvYy1lbnRyeS1ob2xkZXIgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZUNsYXNzICtcbiAgICAgICAgICAgICAgICAgICAgICAgICh0cmFja2VyLmFjdGl2ZUNlbGwgPT09IGl0ZW0uY2VsbFJlZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJyB0b2MtYWN0aXZlLWNlbGwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBwcmV2aW91c0hlYWRlcih0cmFja2VyLCBpdGVtLCB0b2MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJyB0b2MtYWN0aXZlLWNlbGwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJycpLCBpc1J1bm5pbmc6IGl0ZW0uaXNSdW5uaW5nLCBhcmVhOiB3aWRnZXQubm9kZS5xdWVyeVNlbGVjdG9yKGAuJHtUT0NfVFJFRV9DTEFTU31gKSB9LFxuICAgICAgICAgICAgICAgICAgICBidXR0b24sXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcixcbiAgICAgICAgICAgICAgICAgICAgZWxsaXBzZUJ1dHRvbikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhlYWRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zaG93Q29kZSAmJiBpdGVtLnR5cGUgPT09ICdjb2RlJykge1xuICAgICAgICAvLyBSZW5kZXIgY29kZSBjZWxsczpcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInRvYy1jb2RlLWNlbGwtZGl2XCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidG9jLWNvZGUtY2VsbC1wcm9tcHRcIiB9LCBpdGVtLnByb21wdCksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogJ3RvYy1jb2RlLXNwYW4nIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDb2RlQ29tcG9uZW50LCB7IHNhbml0aXplcjogb3B0aW9ucy5zYW5pdGl6ZXIsIGhlYWRpbmc6IGl0ZW0gfSkpKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGludm9rZWQgdXBvbiBlbmNvdW50ZXJpbmcgYSBcImNsaWNrXCIgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSBoZWFkaW5nIC0gbm90ZWJvb2sgaGVhZGluZyB0aGF0IHdhcyBjbGlja2VkXG4gICAgICovXG4gICAgZnVuY3Rpb24gb25DbGljayh0cmFja2VyLCBjZWxsQ29sbGFwc2VNZXRhZGF0YSwgaGVhZGluZykge1xuICAgICAgICBsZXQgY29sbGFwc2VkID0gZmFsc2U7XG4gICAgICAgIGxldCBzeW5jQ29sbGFwc2VTdGF0ZSA9IG9wdGlvbnMuc3luY0NvbGxhcHNlU3RhdGU7XG4gICAgICAgIGlmIChoZWFkaW5nLmNlbGxSZWYubW9kZWwubWV0YWRhdGEuZ2V0KGNlbGxDb2xsYXBzZU1ldGFkYXRhKSkge1xuICAgICAgICAgICAgY29sbGFwc2VkID0gaGVhZGluZy5jZWxsUmVmLm1vZGVsLm1ldGFkYXRhLmdldChjZWxsQ29sbGFwc2VNZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhlYWRpbmcpIHtcbiAgICAgICAgICAgIGlmIChzeW5jQ29sbGFwc2VTdGF0ZSkge1xuICAgICAgICAgICAgICAgIC8vIGlmIGNvbGxhcHNlIHN0YXRlIGlzIHN5bmNlZCwgdXBkYXRlIHN0YXRlIGhlcmVcbiAgICAgICAgICAgICAgICBpZiAodHJhY2tlci5jdXJyZW50V2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIE5vdGVib29rQWN0aW9ucy5zZXRIZWFkaW5nQ29sbGFwc2UoaGVhZGluZy5jZWxsUmVmLCAhY29sbGFwc2VkLCB0cmFja2VyLmN1cnJlbnRXaWRnZXQuY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICAgICAgICAgICAgICBoZWFkaW5nLmNlbGxSZWYubW9kZWwubWV0YWRhdGEuZGVsZXRlKGNlbGxDb2xsYXBzZU1ldGFkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRpbmcuY2VsbFJlZi5tb2RlbC5tZXRhZGF0YS5zZXQoY2VsbENvbGxhcHNlTWV0YWRhdGEsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wdGlvbnMudXBkYXRlQW5kQ29sbGFwc2Uoe1xuICAgICAgICAgICAgICAgIGhlYWRpbmc6IGhlYWRpbmcsXG4gICAgICAgICAgICAgICAgY29sbGFwc2VkU3RhdGU6IGNvbGxhcHNlZCxcbiAgICAgICAgICAgICAgICB0b2NUeXBlOiAnbm90ZWJvb2snXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9wdGlvbnMudXBkYXRlV2lkZ2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIFVzZWQgdG8gZmluZCB0aGUgbmVhcmVzdCBhYm92ZSBoZWFkaW5nIHRvIGFuIGFjdGl2ZSBub3RlYm9vayBjZWxsXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB0cmFja2VyIC0gbm90ZWJvb2sgdHJhY2tlclxuICogQHBhcmFtIGl0ZW0gLSBub3RlYm9vayBoZWFkaW5nXG4gKiBAcGFyYW0gdG9jIC0gY3VycmVudCBsaXN0IG9mIG5vdGVib29rIGhlYWRpbmdzXG4gKiBAcmV0dXJucyB0cnVlIGlmIGhlYWRpbmcgaXMgbmVhcmVzdCBhYm92ZSBhIHNlbGVjdGVkIGNlbGwsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBwcmV2aW91c0hlYWRlcih0cmFja2VyLCBpdGVtLCB0b2MpIHtcbiAgICBpZiAoaXRlbS5pbmRleCA+IC0xIHx8ICh0b2MgPT09IG51bGwgfHwgdG9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0b2MubGVuZ3RoKSkge1xuICAgICAgICBsZXQgYWN0aXZlQ2VsbEluZGV4ID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0LmNvbnRlbnQuYWN0aXZlQ2VsbEluZGV4O1xuICAgICAgICBsZXQgaGVhZGVySW5kZXggPSBpdGVtLmluZGV4O1xuICAgICAgICAvLyBoZWFkZXIgaW5kZXggaGFzIHRvIGJlIGxlc3MgdGhhbiB0aGUgYWN0aXZlIGNlbGwgaW5kZXhcbiAgICAgICAgaWYgKGhlYWRlckluZGV4IDwgYWN0aXZlQ2VsbEluZGV4KSB7XG4gICAgICAgICAgICBsZXQgdG9jSW5kZXhPZk5leHRIZWFkZXIgPSB0b2MuaW5kZXhPZihpdGVtKSArIDE7XG4gICAgICAgICAgICAvLyByZXR1cm4gdHJ1ZSBpZiBoZWFkZXIgaXMgdGhlIGxhc3QgaGVhZGVyXG4gICAgICAgICAgICBpZiAodG9jSW5kZXhPZk5leHRIZWFkZXIgPj0gdG9jLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gcmV0dXJuIHRydWUgaWYgdGhlIG5leHQgaGVhZGVyIGNlbGxzIGluZGV4IGlzIGdyZWF0ZXIgdGhhbiB0aGUgYWN0aXZlIGNlbGxzIGluZGV4XG4gICAgICAgICAgICBsZXQgbmV4dEhlYWRlckluZGV4ID0gdG9jID09PSBudWxsIHx8IHRvYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdG9jW3RvY0luZGV4T2ZOZXh0SGVhZGVyXS5pbmRleDtcbiAgICAgICAgICAgIGlmIChuZXh0SGVhZGVySW5kZXggPiBhY3RpdmVDZWxsSW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG4vKipcbiAqIFJlYWN0IGNvbXBvbmVudCBmb3IgYSBzaW5nbGUgdG9jIGhlYWRpbmdcbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBOb3RlYm9va0hlYWRpbmcocHJvcHMpIHtcbiAgICBjb25zdCBpdGVtUmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICAgIGNvbnN0IGlzQWN0aXZlID0gcHJvcHMuaXNBY3RpdmU7XG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGlzQWN0aXZlICYmIGl0ZW1SZWYuY3VycmVudCAmJiBwcm9wcy5hcmVhKSB7XG4gICAgICAgICAgICBFbGVtZW50RXh0LnNjcm9sbEludG9WaWV3SWZOZWVkZWQocHJvcHMuYXJlYSwgaXRlbVJlZi5jdXJyZW50LnBhcmVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfSwgW2lzQWN0aXZlXSk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgcmVmOiBpdGVtUmVmLCBjbGFzc05hbWU6IGNsYXNzZXMocHJvcHMuY2xhc3NOYW1lLCBpc0FjdGl2ZSA/ICd0b2MtYWN0aXZlLWNlbGwnIDogJycpLCBcImRhdGEtcnVubmluZ1wiOiBwcm9wcy5pc1J1bm5pbmcgfSwgcHJvcHMuY2hpbGRyZW4pKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlbmRlci5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFRhZ0xpc3RDb21wb25lbnQgfSBmcm9tICcuL3RhZ19saXN0Jztcbi8qKlxuICogVGFnIGRyb3Bkb3duIFJlYWN0IGNvbXBvbmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jbGFzcyBUYWdzVG9vbENvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9wcyAtIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAgICogQHJldHVybnMgY29tcG9uZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2hhbmdlcyB0aGUgZHJvcGRvd24gc2VsZWN0aW9uIHN0YXRlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gbmV3U3RhdGUgLSBuZXcgc3RhdGVcbiAgICAgICAgICogQHBhcmFtIGFkZCAtIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRvIGFkZCB0byBzZWxlY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2hhbmdlU2VsZWN0aW9uU3RhdGUgPSAobmV3U3RhdGUsIGFkZCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRhZ3MgPSB0aGlzLnN0YXRlLnNlbGVjdGVkO1xuICAgICAgICAgICAgaWYgKGFkZCkge1xuICAgICAgICAgICAgICAgIHRhZ3MucHVzaChuZXdTdGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkOiB0YWdzIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyVGFncyh0YWdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFnc1tpXSAhPT0gbmV3U3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLnB1c2godGFnc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkOiBzZWxlY3RlZCB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclRhZ3Moc2VsZWN0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRGUtc2VsZWN0cyBhbGwgdGFncyBpbiB0aGUgZHJvcGRvd24gYW5kIGNsZWFyIGZpbHRlcnMgaW4gdGhlIFRvQy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGVzZWxlY3RBbGwgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWQ6IFtdIH0pO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLnVwZGF0ZVdpZGdldCgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogU2VsZWN0IGFsbCB0aGUgY2VsbHMgdGhhdCBjb250YWlucyBhbGwgb2YgdGhlIGN1cnJlbnQgdGFncyBhbmQgYWN0aXZhdGVzIHRoZSBmaXJzdCBvZiB0aG9zZSBjZWxscy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2VsZWN0QWxsQ2VsbHNXaXRoQ3VycmVudFRhZ3MgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YWdzID0gdGhpcy5zdGF0ZS5zZWxlY3RlZDtcbiAgICAgICAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5wcm9wcy50cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXRzID0gcGFuZWwgPT09IG51bGwgfHwgcGFuZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhbmVsLmNvbnRlbnQud2lkZ2V0cztcbiAgICAgICAgICAgIHBhbmVsID09PSBudWxsIHx8IHBhbmVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYW5lbC5jb250ZW50LmRlc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICBsZXQgY2hhbmdlZEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgd2lkZ2V0cyA9PT0gbnVsbCB8fCB3aWRnZXRzID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aWRnZXRzLmZvckVhY2goKGNlbGwsIGl4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFzQWxsQ3VycmVudFRhZ3MgPSB0YWdzLmV2ZXJ5KHRhZyA9PiB0aGlzLmNvbnRhaW5zVGFnKHRhZywgY2VsbCkpO1xuICAgICAgICAgICAgICAgIGlmIChoYXNBbGxDdXJyZW50VGFncykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNoYW5nZWRBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYW5lbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhbmVsLmNvbnRlbnQuYWN0aXZlQ2VsbEluZGV4ID0gaXg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwYW5lbCA9PT0gbnVsbCB8fCBwYW5lbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFuZWwuY29udGVudC5zZWxlY3QoY2VsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWx0ZXJzIHRoZSBUb0MgYnkgYWNjb3JkaW5nIHRvIHNlbGVjdGVkIHRhZ3MuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBzZWxlY3RlZCAtIHNlbGVjdGVkIHRhZ3NcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZmlsdGVyVGFncyA9IChzZWxlY3RlZCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkIH0pO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zLnVwZGF0ZVdpZGdldCgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVXBkYXRlcyBmaWx0ZXJzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJzID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRtcCA9IFtdO1xuICAgICAgICAgICAgbGV0IGlkeCA9IDA7XG4gICAgICAgICAgICBsZXQgdXBkYXRlID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhdGUuc2VsZWN0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50YWdzLmluZGV4T2YodGhpcy5zdGF0ZS5zZWxlY3RlZFtpXSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0bXBbaWR4XSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRbaV07XG4gICAgICAgICAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnByb3BzLm9wdGlvbnMuc2hvd1RhZ3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJUYWdzKHRtcCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkOiB0bXAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzZWxlY3RlZDogdGhpcy5wcm9wcy5pbnB1dEZpbHRlclxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB0cmFuc2xhdG9yID0gdGhpcy5wcm9wcy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICB0aGlzLl90cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBzZWxlY3RlZCB0YWdzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgdGFnIGxpc3RcbiAgICAgKi9cbiAgICBnZXQgZmlsdGVyZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnNlbGVjdGVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciBhIGNlbGwgaGFzIGEgcHJvdmlkZWQgdGFnLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRhZyAtIHRhZ1xuICAgICAqIEBwYXJhbSBjZWxsIC0gY2VsbCByZWZlcmVuY2VcbiAgICAgKiBAcmV0dXJucyBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciBhIGNlbGwgaGFzIGEgcHJvdmlkZWQgdGFnXG4gICAgICovXG4gICAgY29udGFpbnNUYWcodGFnLCBjZWxsKSB7XG4gICAgICAgIGlmIChjZWxsID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRhZ0xpc3QgPSBjZWxsLm1vZGVsLm1ldGFkYXRhLmdldCgndGFncycpO1xuICAgICAgICBpZiAodGFnTGlzdCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWdMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhZ0xpc3RbaV0gPT09IHRhZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBmaWx0ZXJzLlxuICAgICAqL1xuICAgIFVOU0FGRV9jb21wb25lbnRXaWxsVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcnMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVycyB0aGUgaW50ZXJpb3Igb2YgdGhlIHRhZyBkcm9wZG93bi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHJlbmRlcmVkIGNvbXBvbmVudFxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGpzeCA9IChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInRvYy1uby10YWdzLWRpdlwiIH0sIHRoaXMuX3RyYW5zLl9fKCdObyBUYWdzIEF2YWlsYWJsZScpKSk7XG4gICAgICAgIGxldCB0ZXh0O1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRleHQgPSAoUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6ICd0b2MtZmlsdGVyLWJ1dHRvbi1uYScgfSwgdGhpcy5fdHJhbnMuX18oJ0NsZWFyIEZpbHRlcnMnKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0ZXh0ID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiAndG9jLWZpbHRlci1idXR0b24nLCBvbkNsaWNrOiAoKSA9PiB0aGlzLmRlc2VsZWN0QWxsKCkgfSxcbiAgICAgICAgICAgICAgICAnICcsXG4gICAgICAgICAgICAgICAgXCJDbGVhciAxIEZpbHRlclwiLFxuICAgICAgICAgICAgICAgICcgJykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGV4dCA9IChSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogJ3RvYy1maWx0ZXItYnV0dG9uJywgb25DbGljazogKCkgPT4gdGhpcy5kZXNlbGVjdEFsbCgpIH0sXG4gICAgICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgICAgIFwiQ2xlYXIgXCIsXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZC5sZW5ndGgsXG4gICAgICAgICAgICAgICAgXCIgRmlsdGVyc1wiLFxuICAgICAgICAgICAgICAgICcgJykpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjb21tYW5kO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbW1hbmQgPSAoUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6ICd0b2MtZmlsdGVyLWJ1dHRvbi1uYScsIHJvbGU6IFwidGV4dFwiLCBcImFyaWEtbGFiZWxcIjogdGhpcy5fdHJhbnMuX18oJ1NlbGVjdCBBbGwgQ2VsbHMgV2l0aCBDdXJyZW50IFRhZ3MnKSwgdGl0bGU6IHRoaXMuX3RyYW5zLl9fKCdTZWxlY3QgQWxsIENlbGxzIFdpdGggQ3VycmVudCBUYWdzJykgfSwgdGhpcy5fdHJhbnMuX18oJ1NlbGVjdCBBbGwgQ2VsbHMgV2l0aCBDdXJyZW50IFRhZ3MnKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29tbWFuZCA9IChSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogJ3RvYy1maWx0ZXItYnV0dG9uJywgcm9sZTogXCJidXR0b25cIiwgXCJhcmlhLWxhYmVsXCI6IHRoaXMuX3RyYW5zLl9fKCdTZWxlY3QgQWxsIENlbGxzIFdpdGggQ3VycmVudCBUYWdzJyksIHRpdGxlOiB0aGlzLl90cmFucy5fXygnU2VsZWN0IEFsbCBDZWxscyBXaXRoIEN1cnJlbnQgVGFncycpLCBvbkNsaWNrOiB0aGlzLnNlbGVjdEFsbENlbGxzV2l0aEN1cnJlbnRUYWdzLCBvbktleURvd246IHRoaXMuc2VsZWN0QWxsQ2VsbHNXaXRoQ3VycmVudFRhZ3MgfSwgdGhpcy5fdHJhbnMuX18oJ1NlbGVjdCBBbGwgQ2VsbHMgV2l0aCBDdXJyZW50IFRhZ3MnKSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRhZ3MgJiYgdGhpcy5wcm9wcy50YWdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGpzeCA9IChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAndG9jLXRhZ3MtY29udGFpbmVyJyB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFnTGlzdENvbXBvbmVudCwgeyB0YWdzOiB0aGlzLnByb3BzLnRhZ3MsIHNlbGVjdGlvblN0YXRlSGFuZGxlcjogdGhpcy5jaGFuZ2VTZWxlY3Rpb25TdGF0ZSwgc2VsZWN0ZWRUYWdzOiB0aGlzLnN0YXRlLnNlbGVjdGVkIH0pLFxuICAgICAgICAgICAgICAgIHRleHQsXG4gICAgICAgICAgICAgICAgY29tbWFuZCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqc3g7XG4gICAgfVxufVxuLyoqXG4gKiBFeHBvcnRzLlxuICovXG5leHBvcnQgeyBUYWdzVG9vbENvbXBvbmVudCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyBkZWZpbmluZyBhIFJlYWN0IGNvbXBvbmVudCBjb250YWluaW5nIG9uZSB0YWcgbGFiZWwuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgVGFnQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgUmVhY3QgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHByb3BzIC0gcHJvcGVydGllc1xuICAgICAqIEByZXR1cm5zIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHJlbmRlcmVkIGNvbXBvbmVudFxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgdGFnID0gdGhpcy5wcm9wcy50YWc7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcInRvYy10YWctbGFiZWxcIiwga2V5OiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpIH0sIHRhZykpKTtcbiAgICB9XG59XG4vKipcbiAqIEV4cG9ydHMuXG4gKi9cbmV4cG9ydCB7IFRhZ0NvbXBvbmVudCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFnLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFRhZ0NvbXBvbmVudCB9IGZyb20gJy4vdGFnJztcbi8qKlxuICogQ2xhc3MgZm9yIGEgUmVhY3QgY29tcG9uZW50IHRoYXQgcmVuZGVycyBhbGwgdGFncyBpbiBhIGxpc3QuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgVGFnTGlzdENvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIFJlYWN0IGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9wcyAtIHByb3BlcnRpZXNcbiAgICAgKiBAcmV0dXJucyBjb21wb25lbnRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUb2dnbGVzIHdoZXRoZXIgYSB0YWcgaXMgc2VsZWN0ZWQgd2hlbiBjbGlja2VkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gbmFtZSAtIHRhZyBuYW1lXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGFnV2l0aE5hbWUgPSAobmFtZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRUYWdzLmluZGV4T2YobmFtZSkgPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0aW9uU3RhdGVIYW5kbGVyKG5hbWUsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0aW9uU3RhdGVIYW5kbGVyKG5hbWUsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVuZGVycyBhIHRhZyBjb21wb25lbnQgZm9yIGVhY2ggdGFnIHdpdGhpbiBhIGxpc3Qgb2YgdGFncy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHRhZ3MgLSBsaXN0IG9mIHRhZ3NcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVuZGVyVGFnQ29tcG9uZW50cyA9ICh0YWdzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRhZ3MgPSB0aGlzLnByb3BzLnNlbGVjdGVkVGFncztcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGFnV2l0aE5hbWUgPSB0aGlzLnNlbGVjdGVkVGFnV2l0aE5hbWU7XG4gICAgICAgICAgICByZXR1cm4gdGFncy5tYXAoKHRhZywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YWdDbGFzcyA9IHNlbGVjdGVkVGFncy5pbmRleE9mKHRhZykgPj0gMFxuICAgICAgICAgICAgICAgICAgICA/ICd0b2Mtc2VsZWN0ZWQtdGFnIHRvYy10YWcnXG4gICAgICAgICAgICAgICAgICAgIDogJ3RvYy11bnNlbGVjdGVkLXRhZyB0b2MtdGFnJztcbiAgICAgICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBrZXk6IHRhZywgY2xhc3NOYW1lOiB0YWdDbGFzcywgb25DbGljazogZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRUYWdXaXRoTmFtZSh0YWcpO1xuICAgICAgICAgICAgICAgICAgICB9LCB0YWJJbmRleDogMCB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhZ0NvbXBvbmVudCwgeyBzZWxlY3Rpb25TdGF0ZUhhbmRsZXI6IHRoaXMucHJvcHMuc2VsZWN0aW9uU3RhdGVIYW5kbGVyLCBzZWxlY3RlZFRhZ3M6IHRoaXMucHJvcHMuc2VsZWN0ZWRUYWdzLCB0YWc6IHRhZyB9KSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IHNlbGVjdGVkOiB0aGlzLnByb3BzLnNlbGVjdGVkVGFncyB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIHRoZSBsaXN0IG9mIHRhZ3MgaW4gdGhlIFRvQyB0YWdzIGRyb3Bkb3duLlxuICAgICAqXG4gICAgICogQHJldHVybnMgcmVuZGVyZWQgbGlzdFxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHRhZ3MgPSB0aGlzLnByb3BzLnRhZ3M7XG4gICAgICAgIGxldCBqc3ggPSBudWxsO1xuICAgICAgICBpZiAodGFncykge1xuICAgICAgICAgICAganN4ID0gdGhpcy5yZW5kZXJUYWdDb21wb25lbnRzKHRhZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInRvYy10YWctaG9sZGVyXCIgfSwganN4KTtcbiAgICB9XG59XG4vKipcbiAqIEV4cG9ydHMuXG4gKi9cbmV4cG9ydCB7IFRhZ0xpc3RDb21wb25lbnQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRhZ19saXN0LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IGNvZGVJY29uLCBtYXJrZG93bkljb24sIG51bWJlcmluZ0ljb24sIHRhZ0ljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFRhZ3NUb29sQ29tcG9uZW50IH0gZnJvbSAnLi90YWdzdG9vbCc7XG4vKipcbiAqIFJldHVybnMgYSBjb21wb25lbnQgZm9yIHJlbmRlcmluZyBhIG5vdGVib29rIHRhYmxlIG9mIGNvbnRlbnRzIHRvb2xiYXIuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gZ2VuZXJhdG9yIG9wdGlvbnNcbiAqIEBwYXJhbSB0cmFja2VyIC0gbm90ZWJvb2sgdHJhY2tlclxuICogQHJldHVybnMgdG9vbGJhciBjb21wb25lbnRcbiAqL1xuZnVuY3Rpb24gdG9vbGJhcihvcHRpb25zLCB0cmFja2VyKSB7XG4gICAgcmV0dXJuIGNsYXNzIFRvb2xiYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyBhIGNvbXBvbmVudCBmb3IgcmVuZGVyaW5nIGEgbm90ZWJvb2sgdGFibGUgb2YgY29udGVudHMgdG9vbGJhci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHByb3BzIC0gdG9vbGJhciBwcm9wZXJ0aWVzXG4gICAgICAgICAqIEByZXR1cm5zIHRvb2xiYXIgY29tcG9uZW50XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICAgICAgdGhpcy5fdHJhbnMgPSBvcHRpb25zLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICAgICAgdGhpcy50YWdUb29sID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgc2hvd0NvZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgc2hvd01hcmtkb3duOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93VGFnczogZmFsc2UsXG4gICAgICAgICAgICAgICAgbnVtYmVyaW5nOiBmYWxzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0cmFja2VyLmN1cnJlbnRXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICAvLyBSZWFkIHNhdmVkIHVzZXIgc2V0dGluZ3MgaW4gbm90ZWJvb2sgbWV0YSBkYXRhOlxuICAgICAgICAgICAgICAgIHZvaWQgdHJhY2tlci5jdXJyZW50V2lkZ2V0LmNvbnRleHQucmVhZHkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFja2VyLmN1cnJlbnRXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrZXIuY3VycmVudFdpZGdldC5jb250ZW50LmFjdGl2ZUNlbGxDaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudXBkYXRlV2lkZ2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG51bWJlcmluZyA9IHRyYWNrZXIuY3VycmVudFdpZGdldC5tb2RlbC5tZXRhZGF0YS5nZXQoJ3RvYy1hdXRvbnVtYmVyaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaG93Q29kZSA9IHRyYWNrZXIuY3VycmVudFdpZGdldC5tb2RlbC5tZXRhZGF0YS5nZXQoJ3RvYy1zaG93Y29kZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hvd01hcmtkb3duID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0Lm1vZGVsLm1ldGFkYXRhLmdldCgndG9jLXNob3dtYXJrZG93bnR4dCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hvd1RhZ3MgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQubW9kZWwubWV0YWRhdGEuZ2V0KCd0b2Mtc2hvd3RhZ3MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuaW5pdGlhbGl6ZU9wdGlvbnMobnVtYmVyaW5nIHx8IG9wdGlvbnMubnVtYmVyaW5nLCBvcHRpb25zLm51bWJlcmluZ0gxLCBvcHRpb25zLmluY2x1ZGVPdXRwdXQsIG9wdGlvbnMuc3luY0NvbGxhcHNlU3RhdGUsIHNob3dDb2RlIHx8IG9wdGlvbnMuc2hvd0NvZGUsIHNob3dNYXJrZG93biB8fCBvcHRpb25zLnNob3dNYXJrZG93biwgc2hvd1RhZ3MgfHwgb3B0aW9ucy5zaG93VGFncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Q29kZTogb3B0aW9ucy5zaG93Q29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TWFya2Rvd246IG9wdGlvbnMuc2hvd01hcmtkb3duLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dUYWdzOiBvcHRpb25zLnNob3dUYWdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlcmluZzogb3B0aW9ucy5udW1iZXJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdzID0gW107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVG9nZ2xlIHdoZXRoZXIgdG8gc2hvdyBjb2RlIHByZXZpZXdzLlxuICAgICAgICAgKi9cbiAgICAgICAgdG9nZ2xlQ29kZSgpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuc2hvd0NvZGUgPSAhb3B0aW9ucy5zaG93Q29kZTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93Q29kZTogb3B0aW9ucy5zaG93Q29kZSB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVG9nZ2xlIHdoZXRoZXIgdG8gc2hvdyBNYXJrZG93biBwcmV2aWV3cy5cbiAgICAgICAgICovXG4gICAgICAgIHRvZ2dsZU1hcmtkb3duKCkge1xuICAgICAgICAgICAgb3B0aW9ucy5zaG93TWFya2Rvd24gPSAhb3B0aW9ucy5zaG93TWFya2Rvd247XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2hvd01hcmtkb3duOiBvcHRpb25zLnNob3dNYXJrZG93biB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVG9nZ2xlIHdoZXRoZXIgdG8gbnVtYmVyIGhlYWRpbmdzLlxuICAgICAgICAgKi9cbiAgICAgICAgdG9nZ2xlTnVtYmVyaW5nKCkge1xuICAgICAgICAgICAgb3B0aW9ucy5udW1iZXJpbmcgPSAhb3B0aW9ucy5udW1iZXJpbmc7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbnVtYmVyaW5nOiBvcHRpb25zLm51bWJlcmluZyB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVG9nZ2xlIHRhZyBkcm9wZG93bi5cbiAgICAgICAgICovXG4gICAgICAgIHRvZ2dsZVRhZ0Ryb3Bkb3duKCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd1RhZ3MgJiYgdGhpcy50YWdUb29sKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5zdG9yZVRhZ3MgPSB0aGlzLnRhZ1Rvb2wuc3RhdGUuc2VsZWN0ZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcHRpb25zLnNob3dUYWdzID0gIW9wdGlvbnMuc2hvd1RhZ3M7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2hvd1RhZ3M6IG9wdGlvbnMuc2hvd1RhZ3MgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIExvYWRzIGFsbCBkb2N1bWVudCB0YWdzLlxuICAgICAgICAgKi9cbiAgICAgICAgbG9hZFRhZ3MoKSB7XG4gICAgICAgICAgICBjb25zdCBub3RlYm9vayA9IHRyYWNrZXIuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgIGlmIChub3RlYm9vaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxzID0gbm90ZWJvb2subW9kZWwuY2VsbHM7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFncyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBjZWxscy5nZXQoaSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBjZWxsLm1ldGFkYXRhLmdldCgndGFncycpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShsaXN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5mb3JFYWNoKCh0YWcpID0+IHRhZyAmJiB0YWdzLmFkZCh0YWcpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnRhZ3MgPSBBcnJheS5mcm9tKHRhZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW5kZXJzIGEgdG9vbGJhci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgcmVuZGVyZWQgdG9vbGJhclxuICAgICAgICAgKi9cbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgICAgY29uc3QgY29kZVRvZ2dsZUljb24gPSAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IG9uQ2xpY2s6IGV2ZW50ID0+IHRoaXMudG9nZ2xlQ29kZSgpLCByb2xlOiBcInRleHRcIiwgXCJhcmlhLWxhYmVsXCI6IHRoaXMuX3RyYW5zLl9fKCdUb2dnbGUgQ29kZSBDZWxscycpLCB0aXRsZTogdGhpcy5fdHJhbnMuX18oJ1RvZ2dsZSBDb2RlIENlbGxzJyksIGNsYXNzTmFtZTogdGhpcy5zdGF0ZS5zaG93Q29kZVxuICAgICAgICAgICAgICAgICAgICA/ICd0b2MtdG9vbGJhci1jb2RlLWljb24gdG9jLXRvb2xiYXItaWNvbi1zZWxlY3RlZCdcbiAgICAgICAgICAgICAgICAgICAgOiAndG9jLXRvb2xiYXItY29kZS1pY29uIHRvYy10b29sYmFyLWljb24nIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChjb2RlSWNvbi5yZWFjdCwgbnVsbCkpKTtcbiAgICAgICAgICAgIGNvbnN0IG1hcmtkb3duVG9nZ2xlSWNvbiA9IChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgb25DbGljazogZXZlbnQgPT4gdGhpcy50b2dnbGVNYXJrZG93bigpLCByb2xlOiBcInRleHRcIiwgXCJhcmlhLWxhYmVsXCI6IHRoaXMuX3RyYW5zLl9fKCdUb2dnbGUgTWFya2Rvd24gVGV4dCBDZWxscycpLCB0aXRsZTogdGhpcy5fdHJhbnMuX18oJ1RvZ2dsZSBNYXJrZG93biBUZXh0IENlbGxzJyksIGNsYXNzTmFtZTogdGhpcy5zdGF0ZS5zaG93TWFya2Rvd25cbiAgICAgICAgICAgICAgICAgICAgPyAndG9jLXRvb2xiYXItaWNvbi1zZWxlY3RlZCdcbiAgICAgICAgICAgICAgICAgICAgOiAndG9jLXRvb2xiYXItaWNvbicgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KG1hcmtkb3duSWNvbi5yZWFjdCwgbnVsbCkpKTtcbiAgICAgICAgICAgIGNvbnN0IG51bWJlcmluZ1RvZ2dsZUljb24gPSAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IG9uQ2xpY2s6IGV2ZW50ID0+IHRoaXMudG9nZ2xlTnVtYmVyaW5nKCksIHJvbGU6IFwidGV4dFwiLCBcImFyaWEtbGFiZWxcIjogdGhpcy5fdHJhbnMuX18oJ1RvZ2dsZSBBdXRvLU51bWJlcmluZycpLCB0aXRsZTogdGhpcy5fdHJhbnMuX18oJ1RvZ2dsZSBBdXRvLU51bWJlcmluZycpLCBjbGFzc05hbWU6IHRoaXMuc3RhdGUubnVtYmVyaW5nXG4gICAgICAgICAgICAgICAgICAgID8gJ3RvYy10b29sYmFyLWljb24tc2VsZWN0ZWQnXG4gICAgICAgICAgICAgICAgICAgIDogJ3RvYy10b29sYmFyLWljb24nIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChudW1iZXJpbmdJY29uLnJlYWN0LCBudWxsKSkpO1xuICAgICAgICAgICAgbGV0IHRhZ0Ryb3Bkb3duID0gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsKTtcbiAgICAgICAgICAgIGxldCB0YWdUb2dnbGVJY29uID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyByb2xlOiBcInRleHRcIiwgXCJhcmlhLWxhYmVsXCI6IHRoaXMuX3RyYW5zLl9fKCdTaG93IFRhZ3MgTWVudScpLCB0aXRsZTogdGhpcy5fdHJhbnMuX18oJ1Nob3cgVGFncyBNZW51JyksIGNsYXNzTmFtZTogdGhpcy5zdGF0ZS5zaG93VGFnc1xuICAgICAgICAgICAgICAgICAgICA/ICd0b2MtdG9vbGJhci1pY29uLXNlbGVjdGVkJ1xuICAgICAgICAgICAgICAgICAgICA6ICd0b2MtdG9vbGJhci1pY29uJyB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGFnSWNvbi5yZWFjdCwgbnVsbCkpKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnNob3dUYWdzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkVGFncygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhZ1Rvb2wgPSAoUmVhY3QuY3JlYXRlRWxlbWVudChUYWdzVG9vbENvbXBvbmVudCwgeyB0YWdzOiB0aGlzLnRhZ3MsIHRyYWNrZXI6IHRyYWNrZXIsIG9wdGlvbnM6IG9wdGlvbnMsIGlucHV0RmlsdGVyOiBvcHRpb25zLnN0b3JlVGFncywgdHJhbnNsYXRvcjogb3B0aW9ucy50cmFuc2xhdG9yLCByZWY6IHRhZ1Rvb2wgPT4gKHRoaXMudGFnVG9vbCA9IHRhZ1Rvb2wpIH0pKTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnRhZ1Rvb2wgPSB0aGlzLnRhZ1Rvb2w7XG4gICAgICAgICAgICAgICAgdGFnRHJvcGRvd24gPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAndG9jLXRhZy1kcm9wZG93bicgfSxcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIsXG4gICAgICAgICAgICAgICAgICAgIHRhZ1Rvb2wsXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICd0b2MtdG9vbGJhcicgfSxcbiAgICAgICAgICAgICAgICAgICAgY29kZVRvZ2dsZUljb24sXG4gICAgICAgICAgICAgICAgICAgIG1hcmtkb3duVG9nZ2xlSWNvbixcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyaW5nVG9nZ2xlSWNvbixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ3RvYy10YWctZHJvcGRvd24tYnV0dG9uJywgb25DbGljazogZXZlbnQgPT4gdGhpcy50b2dnbGVUYWdEcm9wZG93bigpIH0sIHRhZ1RvZ2dsZUljb24pKSxcbiAgICAgICAgICAgICAgICB0YWdEcm9wZG93bikpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbi8qKlxuICogRXhwb3J0cy5cbiAqL1xuZXhwb3J0IHsgdG9vbGJhciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9vbGJhcl9nZW5lcmF0b3IuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAnLi9yZW5kZXInO1xuLyoqXG4gKiBHZW5lcmF0ZXMgYSB0YWJsZSBvZiBjb250ZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIGVkaXRvciAtIGVkaXRvciB3aWRnZXRcbiAqIEByZXR1cm5zIGEgbGlzdCBvZiBoZWFkaW5nc1xuICovXG5mdW5jdGlvbiBnZW5lcmF0ZShlZGl0b3IpIHtcbiAgICAvLyBTcGxpdCB0aGUgdGV4dCBpbnRvIGxpbmVzOlxuICAgIGxldCBsaW5lcyA9IGVkaXRvci5jb250ZW50Lm1vZGVsLnZhbHVlLnRleHQuc3BsaXQoJ1xcbicpO1xuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUgbGluZXMgdG8gZ2V0IHRoZSBoZWFkaW5nIGxldmVsIGFuZCB0ZXh0IGZvciBlYWNoIGxpbmU6XG4gICAgbGV0IGhlYWRpbmdzID0gW107XG4gICAgbGV0IHByb2Nlc3NpbmdJbXBvcnRzID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbGluZSA9IGxpbmVzW2ldLnRyaW0oKTtcbiAgICAgICAgaWYgKGxpbmUuaW5kZXhPZignZGVmICcpID09PSAwKSB7XG4gICAgICAgICAgICBwcm9jZXNzaW5nSW1wb3J0cyA9IGZhbHNlO1xuICAgICAgICAgICAgaGVhZGluZ3MucHVzaCh7XG4gICAgICAgICAgICAgICAgdGV4dDogbGluZS5zbGljZSgwLCAtMSksXG4gICAgICAgICAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgICAgICAgICAgb25DbGljazogb25DbGljayhpKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobGluZS5pbmRleE9mKCdjbGFzcyAnKSA9PT0gMCkge1xuICAgICAgICAgICAgcHJvY2Vzc2luZ0ltcG9ydHMgPSBmYWxzZTtcbiAgICAgICAgICAgIGhlYWRpbmdzLnB1c2goe1xuICAgICAgICAgICAgICAgIHRleHQ6IGxpbmUuc2xpY2UoMCwgLTEpLFxuICAgICAgICAgICAgICAgIGxldmVsOiAxLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IG9uQ2xpY2soaSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxpbmUuaW5kZXhPZignaW1wb3J0ICcpID09IDAgJiYgIXByb2Nlc3NpbmdJbXBvcnRzKSB7XG4gICAgICAgICAgICBwcm9jZXNzaW5nSW1wb3J0cyA9IHRydWU7XG4gICAgICAgICAgICBoZWFkaW5ncy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBsaW5lLFxuICAgICAgICAgICAgICAgIGxldmVsOiAyLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IG9uQ2xpY2soaSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoZWFkaW5ncztcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgXCJjbGlja1wiIGhhbmRsZXIuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSBsaW5lIC0gbGluZSBudW1iZXJcbiAgICAgKiBAcmV0dXJucyBjbGljayBoYW5kbGVyXG4gICAgICovXG4gICAgZnVuY3Rpb24gb25DbGljayhsaW5lKSB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBlZGl0b3IuY29udGVudC5lZGl0b3Iuc2V0Q3Vyc29yUG9zaXRpb24oe1xuICAgICAgICAgICAgICAgIGxpbmU6IGxpbmUsXG4gICAgICAgICAgICAgICAgY29sdW1uOiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG59XG4vKipcbiAqIFJldHVybnMgYSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGlzIFRvQyBnZW5lcmF0b3IgaXMgZW5hYmxlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIGVkaXRvciAtIGVkaXRvciB3aWRnZXRcbiAqIEByZXR1cm5zIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoaXMgVG9DIGdlbmVyYXRvciBpcyBlbmFibGVkXG4gKi9cbmZ1bmN0aW9uIGlzRW5hYmxlZChlZGl0b3IpIHtcbiAgICBsZXQgbWltZSA9IGVkaXRvci5jb250ZW50Lm1vZGVsLm1pbWVUeXBlO1xuICAgIHJldHVybiBtaW1lID09PSAnYXBwbGljYXRpb24veC1weXRob24tY29kZScgfHwgbWltZSA9PT0gJ3RleHQveC1weXRob24nO1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgVG9DIGdlbmVyYXRvciBmb3IgUHl0aG9uIGZpbGVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gdHJhY2tlciAtIGZpbGUgZWRpdG9yIHRyYWNrZXJcbiAqIEByZXR1cm5zIFRvQyBnZW5lcmF0b3IgY2FwYWJsZSBvZiBwYXJzaW5nIFB5dGhvbiBmaWxlc1xuICovXG5mdW5jdGlvbiBjcmVhdGVQeXRob25HZW5lcmF0b3IodHJhY2tlcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRyYWNrZXIsXG4gICAgICAgIGlzRW5hYmxlZDogaXNFbmFibGVkLFxuICAgICAgICBpdGVtUmVuZGVyZXI6IHJlbmRlcixcbiAgICAgICAgZ2VuZXJhdGU6IGdlbmVyYXRlXG4gICAgfTtcbn1cbi8qKlxuICogRXhwb3J0cy5cbiAqL1xuZXhwb3J0IHsgY3JlYXRlUHl0aG9uR2VuZXJhdG9yIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG4vKipcbiAqIFJlbmRlcnMgYSBQeXRob24gdGFibGUgb2YgY29udGVudHMgaXRlbS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIGl0ZW0gLSBudW1iZXJlZCBoZWFkaW5nXG4gKiBAcmV0dXJucyByZW5kZXJlZCBpdGVtXG4gKi9cbmZ1bmN0aW9uIHJlbmRlcihpdGVtKSB7XG4gICAgbGV0IGZvbnRTaXplQ2xhc3MgPSAndG9jLWxldmVsLXNpemUtJyArIGl0ZW0ubGV2ZWw7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBmb250U2l6ZUNsYXNzICsgJyB0b2MtZW50cnktaG9sZGVyJyB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLUNvbGxhcHNlciBwLVdpZGdldCBsbS1XaWRnZXRcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ0b2MtQ29sbGFwc2VyLWNoaWxkXCIgfSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJoZWFkZXItY2VsbCB0b2MtY2VsbC1pdGVtXCIgfSxcbiAgICAgICAgICAgIFwiIFwiLFxuICAgICAgICAgICAgaXRlbS50ZXh0LFxuICAgICAgICAgICAgXCIgXCIpKSk7XG59XG4vKipcbiAqIEV4cG9ydHMuXG4gKi9cbmV4cG9ydCB7IHJlbmRlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVuZGVyLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIHRvY1xuICovXG4vLyBOb3RlOiBrZWVwIGluIGFscGhhYmV0aWNhbCBvcmRlci4uLlxuZXhwb3J0ICogZnJvbSAnLi9nZW5lcmF0b3JzJztcbmV4cG9ydCAqIGZyb20gJy4vcmVnaXN0cnknO1xuZXhwb3J0ICogZnJvbSAnLi90b2MnO1xuZXhwb3J0ICogZnJvbSAnLi90b2NfaXRlbSc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL2hlYWRpbmdzJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuLyogdHNsaW50OmRpc2FibGUgKi9cbi8qKlxuICogVGFibGUgb2YgY29udGVudHMgcmVnaXN0cnkgdG9rZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBJVGFibGVPZkNvbnRlbnRzUmVnaXN0cnkgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL3RvYzpJVGFibGVPZkNvbnRlbnRzUmVnaXN0cnknKTtcbi8qIHRzbGludDplbmFibGUgKi9cbi8qKlxuICogQ2xhc3MgZm9yIHJlZ2lzdGVyaW5nIHdpZGdldHMgZm9yIHdoaWNoIHdlIGNhbiBnZW5lcmF0ZSBhIHRhYmxlIG9mIGNvbnRlbnRzLlxuICovXG5leHBvcnQgY2xhc3MgVGFibGVPZkNvbnRlbnRzUmVnaXN0cnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9jb2xsYXBzZUNoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9nZW5lcmF0b3JzID0gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmRzIGEgdGFibGUgb2YgY29udGVudHMgZ2VuZXJhdG9yIGZvciBhIHdpZGdldC5cbiAgICAgKlxuICAgICAqICMjIE5vdGVzXG4gICAgICpcbiAgICAgKiAtICAgSWYgdW5hYmxlIHRvIGZpbmQgYSB0YWJsZSBvZiBjb250ZW50cyBnZW5lcmF0b3IsIHRoZSBtZXRob2QgcmV0dXJuIGB1bmRlZmluZWRgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHdpZGdldCAtIHdpZGdldFxuICAgICAqIEByZXR1cm5zIHRhYmxlIG9mIGNvbnRlbnRzIGdlbmVyYXRvclxuICAgICAqL1xuICAgIGZpbmQod2lkZ2V0KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZ2VuZXJhdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZ2VuID0gdGhpcy5fZ2VuZXJhdG9yc1tpXTtcbiAgICAgICAgICAgIGlmIChnZW4udHJhY2tlci5oYXMod2lkZ2V0KSkge1xuICAgICAgICAgICAgICAgIGlmIChnZW4uaXNFbmFibGVkICYmICFnZW4uaXNFbmFibGVkKHdpZGdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBnZW47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIHRhYmxlIG9mIGNvbnRlbnRzIGdlbmVyYXRvciB0byB0aGUgcmVnaXN0cnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ2VuZXJhdG9yIC0gdGFibGUgb2YgY29udGVudHMgZ2VuZXJhdG9yXG4gICAgICovXG4gICAgYWRkKGdlbmVyYXRvcikge1xuICAgICAgICBpZiAoZ2VuZXJhdG9yLmNvbGxhcHNlQ2hhbmdlZCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBjb2xsYXBzZUNoYW5nZWQgZm9yIGEgZ2l2ZW4gZ2VuZXJhdG9yLCBwcm9wYWdhdGUgdGhlIGFyZ3VtZW50cyB0aHJvdWdoIHRoZSByZWdpc3RyeSdzIHNpZ25hbFxuICAgICAgICAgICAgZ2VuZXJhdG9yLmNvbGxhcHNlQ2hhbmdlZC5jb25uZWN0KChzZW5kZXIsIGFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2xsYXBzZUNoYW5nZWQuZW1pdChhcmdzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2dlbmVyYXRvcnMucHVzaChnZW5lcmF0b3IpO1xuICAgIH1cbiAgICBnZXQgY29sbGFwc2VDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sbGFwc2VDaGFuZ2VkO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlZ2lzdHJ5LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IEFjdGl2aXR5TW9uaXRvciwgUGF0aEV4dCB9IGZyb20gJ0BqdXB5dGVybGFiL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgVE9DVHJlZSB9IGZyb20gJy4vdG9jX3RyZWUnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuLyoqXG4gKiBUaW1lb3V0IGZvciB0aHJvdHRsaW5nIFRvQyByZW5kZXJpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgUkVOREVSX1RJTUVPVVQgPSAxMDAwO1xuLyoqXG4gKiBXaWRnZXQgZm9yIGhvc3RpbmcgYSBub3RlYm9vayB0YWJsZSBvZiBjb250ZW50cy5cbiAqL1xuZXhwb3J0IGNsYXNzIFRhYmxlT2ZDb250ZW50cyBleHRlbmRzIFdpZGdldCB7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG5ldyB0YWJsZSBvZiBjb250ZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHdpZGdldFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gb3B0aW9ucy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICB0aGlzLl9kb2NtYW5hZ2VyID0gb3B0aW9ucy5kb2NtYW5hZ2VyO1xuICAgICAgICB0aGlzLl9yZW5kZXJtaW1lID0gb3B0aW9ucy5yZW5kZXJtaW1lO1xuICAgICAgICB0aGlzLl90cmFucyA9IHRoaXMudHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHRoaXMuX2hlYWRpbmdzID0gW107XG4gICAgICAgIHRoaXMuX2VudHJ5Q2xpY2tlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2VudHJ5Q2xpY2tlZC5jb25uZWN0KCh0b2MsIGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRW50cnkgPSBpdGVtLnByb3BzLmhlYWRpbmc7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudCkge1xuICAgICAgICAgICAgdGhpcy5faGVhZGluZ3MgPSB0aGlzLl9jdXJyZW50LmdlbmVyYXRvci5nZW5lcmF0ZSh0aGlzLl9jdXJyZW50LndpZGdldCwgdGhpcy5fY3VycmVudC5nZW5lcmF0b3Iub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3VycmVudCB3aWRnZXQtZ2VuZXJhdG9yIHR1cGxlIGZvciB0aGUgVG9DLlxuICAgICAqL1xuICAgIGdldCBjdXJyZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgICB9XG4gICAgc2V0IGN1cnJlbnQodmFsdWUpIHtcbiAgICAgICAgLy8gSWYgdGhleSBhcmUgdGhlIHNhbWUgYXMgcHJldmlvdXNseSwgZG8gbm90aGluZy4uLlxuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnQgJiZcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnQud2lkZ2V0ID09PSB2YWx1ZS53aWRnZXQgJiZcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnQuZ2VuZXJhdG9yID09PSB2YWx1ZS5nZW5lcmF0b3IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJyZW50ID0gdmFsdWU7XG4gICAgICAgIGlmICh0aGlzLmdlbmVyYXRvcikge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2VuZXJhdG9yLnRvb2xiYXJHZW5lcmF0b3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sYmFyID0gdGhpcy5nZW5lcmF0b3IudG9vbGJhckdlbmVyYXRvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbGJhciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gRGlzcG9zZSBhbiBvbGQgYWN0aXZpdHkgbW9uaXRvciBpZiBvbmUgZXhpc3RlZC4uLlxuICAgICAgICBpZiAodGhpcy5fbW9uaXRvcikge1xuICAgICAgICAgICAgdGhpcy5fbW9uaXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl9tb25pdG9yID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB3ZSBhcmUgd2lwaW5nIHRoZSBUb0MsIHVwZGF0ZSBhbmQgcmV0dXJuLi4uXG4gICAgICAgIGlmICghdGhpcy5fY3VycmVudCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBGaW5kIHRoZSBkb2N1bWVudCBtb2RlbCBhc3NvY2lhdGVkIHdpdGggdGhlIHdpZGdldDpcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuX2RvY21hbmFnZXIuY29udGV4dEZvcldpZGdldCh0aGlzLl9jdXJyZW50LndpZGdldCk7XG4gICAgICAgIGlmICghY29udGV4dCB8fCAhY29udGV4dC5tb2RlbCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGEgY29udGV4dCBmb3IgdGhlIFRhYmxlIG9mIENvbnRlbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhyb3R0bGUgdGhlIHJlbmRlcmluZyByYXRlIG9mIHRoZSB0YWJsZSBvZiBjb250ZW50czpcbiAgICAgICAgdGhpcy5fbW9uaXRvciA9IG5ldyBBY3Rpdml0eU1vbml0b3Ioe1xuICAgICAgICAgICAgc2lnbmFsOiBjb250ZXh0Lm1vZGVsLmNvbnRlbnRDaGFuZ2VkLFxuICAgICAgICAgICAgdGltZW91dDogUkVOREVSX1RJTUVPVVRcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX21vbml0b3IuYWN0aXZpdHlTdG9wcGVkLmNvbm5lY3QodGhpcy51cGRhdGUsIHRoaXMpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IHRhYmxlIG9mIGNvbnRlbnRzIGdlbmVyYXRvci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRhYmxlIG9mIGNvbnRlbnRzIGdlbmVyYXRvclxuICAgICAqL1xuICAgIGdldCBnZW5lcmF0b3IoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudC5nZW5lcmF0b3I7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGludm9rZWQgdXBvbiBhbiB1cGRhdGUgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtc2cgLSBtZXNzYWdlXG4gICAgICovXG4gICAgb25VcGRhdGVSZXF1ZXN0KG1zZykge1xuICAgICAgICBpZiAodGhpcy5pc0hpZGRlbikge1xuICAgICAgICAgICAgLy8gQmFpbCBlYXJseVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0aXRsZSA9IHRoaXMuX3RyYW5zLl9fKCdUYWJsZSBvZiBDb250ZW50cycpO1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudCkge1xuICAgICAgICAgICAgdGhpcy5faGVhZGluZ3MgPSB0aGlzLl9jdXJyZW50LmdlbmVyYXRvci5nZW5lcmF0ZSh0aGlzLl9jdXJyZW50LndpZGdldCwgdGhpcy5fY3VycmVudC5nZW5lcmF0b3Iub3B0aW9ucyk7XG4gICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5fZG9jbWFuYWdlci5jb250ZXh0Rm9yV2lkZ2V0KHRoaXMuX2N1cnJlbnQud2lkZ2V0KTtcbiAgICAgICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgdGl0bGUgPSBQYXRoRXh0LmJhc2VuYW1lKGNvbnRleHQubG9jYWxQYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgaXRlbVJlbmRlcmVyID0gKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBpdGVtLnRleHQpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudCAmJiB0aGlzLl9jdXJyZW50LmdlbmVyYXRvci5pdGVtUmVuZGVyZXIpIHtcbiAgICAgICAgICAgIGl0ZW1SZW5kZXJlciA9IHRoaXMuX2N1cnJlbnQuZ2VuZXJhdG9yLml0ZW1SZW5kZXJlcjtcbiAgICAgICAgfVxuICAgICAgICBsZXQganN4ID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtVGFibGVPZkNvbnRlbnRzXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtc3RhY2stcGFuZWwtaGVhZGVyXCIgfSwgdGl0bGUpKSk7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50ICYmIHRoaXMuX2N1cnJlbnQuZ2VuZXJhdG9yKSB7XG4gICAgICAgICAgICBqc3ggPSAoUmVhY3QuY3JlYXRlRWxlbWVudChUT0NUcmVlLCB7IHRpdGxlOiB0aXRsZSwgdG9jOiB0aGlzLl9oZWFkaW5ncywgZW50cnlDbGlja2VkOiB0aGlzLl9lbnRyeUNsaWNrZWQsIGdlbmVyYXRvcjogdGhpcy5nZW5lcmF0b3IsIGl0ZW1SZW5kZXJlcjogaXRlbVJlbmRlcmVyLCB0b29sYmFyOiB0aGlzLl90b29sYmFyIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBSZWFjdERPTS5yZW5kZXIoanN4LCB0aGlzLm5vZGUsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50ICYmXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudC5nZW5lcmF0b3IudXNlc0xhdGV4ID09PSB0cnVlICYmXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVybWltZS5sYXRleFR5cGVzZXR0ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJtaW1lLmxhdGV4VHlwZXNldHRlci50eXBlc2V0KHRoaXMubm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGFjdGl2ZSBlbnRyeS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRhYmxlIG9mIGNvbnRlbnRzIGFjdGl2ZSBlbnRyeVxuICAgICAqL1xuICAgIGdldCBhY3RpdmVFbnRyeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUVudHJ5O1xuICAgIH1cbiAgICBzZXQgYWN0aXZlRW50cnkodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlRW50cnkgPSB2YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBoZWFkaW5ncy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRhYmxlIG9mIGNvbnRlbnRzIGxpc3Qgb2YgaGVhZGluZ3NcbiAgICAgKi9cbiAgICBnZXQgaGVhZGluZ3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWFkaW5ncztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgaW52b2tlZCB0byByZS1yZW5kZXIgYWZ0ZXIgc2hvd2luZyBhIHRhYmxlIG9mIGNvbnRlbnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1zZyAtIG1lc3NhZ2VcbiAgICAgKi9cbiAgICBvbkFmdGVyU2hvdyhtc2cpIHtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b2MuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBSZWFjdCBjb21wb25lbnQgZm9yIGEgdGFibGUgb2YgY29udGVudHMgZW50cnkuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgVE9DSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIHRhYmxlIG9mIGNvbnRlbnRzIGVudHJ5LlxuICAgICAqXG4gICAgICogQHJldHVybnMgcmVuZGVyZWQgZW50cnlcbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgaGVhZGluZywgdG9jIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICAvLyBDcmVhdGUgYW4gb25DbGljayBoYW5kbGVyIGZvciB0aGUgVE9DIGl0ZW1cbiAgICAgICAgLy8gdGhhdCBzY3JvbGxzIHRoZSBhbmNob3IgaW50byB2aWV3LlxuICAgICAgICBjb25zdCBvbkNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAoX2EgPSB0aGlzLnByb3BzLmVudHJ5Q2xpY2tlZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmVtaXQodGhpcyk7XG4gICAgICAgICAgICBoZWFkaW5nLm9uQ2xpY2soKTtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLnByb3BzLml0ZW1SZW5kZXJlcihoZWFkaW5nLCB0b2MpO1xuICAgICAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcImpwLXRvY0l0ZW1cIiwgb25DbGljazogb25DbGljaywgb25Db250ZXh0TWVudTogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIChfYSA9IHRoaXMucHJvcHMuZW50cnlDbGlja2VkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZW1pdCh0aGlzKTtcbiAgICAgICAgICAgICAgICBoZWFkaW5nLm9uQ2xpY2soKTtcbiAgICAgICAgICAgIH0gfSwgY29udGVudCkpO1xuICAgIH1cbn1cbi8qKlxuICogRXhwb3J0cy5cbiAqL1xuZXhwb3J0IHsgVE9DSXRlbSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9jX2l0ZW0uanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVE9DSXRlbSB9IGZyb20gJy4vdG9jX2l0ZW0nO1xuLyoqXG4gKiBSZWFjdCBjb21wb25lbnQgZm9yIGEgdGFibGUgb2YgY29udGVudHMgdHJlZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jbGFzcyBUT0NUcmVlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGEgdGFibGUgb2YgY29udGVudHMgdHJlZS5cbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IFRvb2xiYXIgPSB0aGlzLnByb3BzLnRvb2xiYXI7XG4gICAgICAgIC8vIE1hcCB0aGUgaGVhZGluZyBvYmplY3RzIG9udG8gYSBsaXN0IG9mIEpTWCBlbGVtZW50cy4uLlxuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5wcm9wcy50b2MubWFwKGVsID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChUT0NJdGVtLCB7IGhlYWRpbmc6IGVsLCB0b2M6IHRoaXMucHJvcHMudG9jLCBlbnRyeUNsaWNrZWQ6IHRoaXMucHJvcHMuZW50cnlDbGlja2VkLCBpdGVtUmVuZGVyZXI6IHRoaXMucHJvcHMuaXRlbVJlbmRlcmVyLCBrZXk6IGAke2VsLnRleHR9LSR7ZWwubGV2ZWx9LSR7aSsrfWAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLVRhYmxlT2ZDb250ZW50c1wiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLXN0YWNrLXBhbmVsLWhlYWRlclwiIH0sIHRoaXMucHJvcHMudGl0bGUpLFxuICAgICAgICAgICAgVG9vbGJhciAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xiYXIsIG51bGwpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHsgY2xhc3NOYW1lOiBcImpwLVRhYmxlT2ZDb250ZW50cy1jb250ZW50XCIgfSwgbGlzdCkpKTtcbiAgICB9XG59XG4vKipcbiAqIEV4cG9ydHMuXG4gKi9cbmV4cG9ydCB7IFRPQ1RyZWUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvY190cmVlLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8vIE1heGltdW0gaGVhZGluZyBsZXZlbDpcbmNvbnN0IE1BWF9IRUFESU5HX0xFVkVMID0gNjtcbi8qKlxuICogVXBkYXRlcyBudW1iZXJpbmcgZGljdGlvbmFyeSBsZXZlbHMuXG4gKlxuICogIyMgTm90ZXNcbiAqXG4gKiAtICAgTXV0YXRlcyBhIHByb3ZpZGVkIGRpY3Rpb25hcnkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSBkaWN0IC0gbnVtYmVyaW5nIGRpY3Rpb25hcnlcbiAqIEBwYXJhbSBsZXZlbCAtIGN1cnJlbnQgbGV2ZWxcbiAqIEByZXR1cm5zIGlucHV0IGRpY3Rpb25hcnlcbiAqL1xuZnVuY3Rpb24gdXBkYXRlKGRpY3QsIGxldmVsKSB7XG4gICAgZm9yIChsZXQgbCA9IGxldmVsICsgMTsgbCA8PSBNQVhfSEVBRElOR19MRVZFTDsgbCsrKSB7XG4gICAgICAgIGlmIChkaWN0W2xdICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGRpY3RbbF0gPSB2b2lkIDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRpY3RbbGV2ZWxdID09PSB2b2lkIDApIHtcbiAgICAgICAgZGljdFtsZXZlbF0gPSAxO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZGljdFtsZXZlbF0gKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIGRpY3Q7XG59XG4vKipcbiAqIEdlbmVyYXRlIHRoZSBjdXJyZW50IG51bWJlcmluZyBiYXNlZCBvbiBhIHByb3ZpZGVkIG51bWJlcmluZyBkaWN0aW9uYXJ5IGFuZCB0aGUgY3VycmVudCBsZXZlbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIGRpY3QgLSBudW1iZXJpbmcgZGljdGlvbmFyeVxuICogQHBhcmFtIGxldmVsIC0gY3VycmVudCBsZXZlbFxuICogQHJldHVybnMgbnVtYmVyaW5nXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlTnVtYmVyaW5nKGRpY3QsIGxldmVsKSB7XG4gICAgaWYgKGRpY3QgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgbnVtYmVyaW5nID0gJyc7XG4gICAgZGljdCA9IHVwZGF0ZShkaWN0LCBsZXZlbCk7XG4gICAgaWYgKGxldmVsID49IDEpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPD0gbGV2ZWw7IGorKykge1xuICAgICAgICAgICAgbnVtYmVyaW5nICs9IChkaWN0W2pdID09PSB2b2lkIDAgPyAnMCcgOiBkaWN0W2pdKSArICcuJztcbiAgICAgICAgfVxuICAgICAgICBudW1iZXJpbmcgKz0gJyAnO1xuICAgIH1cbiAgICByZXR1cm4gbnVtYmVyaW5nO1xufVxuLyoqXG4gKiBFeHBvcnRzLlxuICovXG5leHBvcnQgeyBnZW5lcmF0ZU51bWJlcmluZyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2VuZXJhdGVfbnVtYmVyaW5nLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQ2VsbCBydW5uaW5nIHN0YXR1c1xuICovXG5leHBvcnQgdmFyIFJ1bm5pbmdTdGF0dXM7XG4oZnVuY3Rpb24gKFJ1bm5pbmdTdGF0dXMpIHtcbiAgICAvKipcbiAgICAgKiBDZWxsIGlzIGlkbGVcbiAgICAgKi9cbiAgICBSdW5uaW5nU3RhdHVzW1J1bm5pbmdTdGF0dXNbXCJJZGxlXCJdID0gLTFdID0gXCJJZGxlXCI7XG4gICAgLyoqXG4gICAgICogQ2VsbCBleGVjdXRpb24gaXMgc2NoZWR1bGVkXG4gICAgICovXG4gICAgUnVubmluZ1N0YXR1c1tSdW5uaW5nU3RhdHVzW1wiU2NoZWR1bGVkXCJdID0gMF0gPSBcIlNjaGVkdWxlZFwiO1xuICAgIC8qKlxuICAgICAqIENlbGwgaXMgcnVubmluZ1xuICAgICAqL1xuICAgIFJ1bm5pbmdTdGF0dXNbUnVubmluZ1N0YXR1c1tcIlJ1bm5pbmdcIl0gPSAxXSA9IFwiUnVubmluZ1wiO1xufSkoUnVubmluZ1N0YXR1cyB8fCAoUnVubmluZ1N0YXR1cyA9IHt9KSk7XG4vKipcbiAqIFRlc3RzIHdoZXRoZXIgYSBoZWFkaW5nIGlzIGEgbm90ZWJvb2sgaGVhZGluZy5cbiAqXG4gKiBAcGFyYW0gaGVhZGluZyAtIGhlYWRpbmcgdG8gdGVzdFxuICogQHJldHVybnMgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgYSBoZWFkaW5nIGlzIGEgbm90ZWJvb2sgaGVhZGluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOb3RlYm9va0hlYWRpbmcoaGVhZGluZykge1xuICAgIHJldHVybiBoZWFkaW5nLnR5cGUgIT09IHVuZGVmaW5lZCAmJiBoZWFkaW5nLmNlbGxSZWYgIT09IHVuZGVmaW5lZDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlYWRpbmdzLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIGEgTUlNRSB0eXBlIGNvcnJlc3BvbmRzIHRvIGVpdGhlciBIVE1MIG9yIHZpcnR1YWwgRE9NLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gbWltZSAtIE1JTUUgdHlwZSBzdHJpbmdcbiAqIEByZXR1cm5zIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIGEgcHJvdmlkZWQgTUlNRSB0eXBlIGNvcnJlc3BvbmRzIHRvIGVpdGhlciBIVE1MIG9yIHZpcnR1YWwgRE9NXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IGJvb2wgPSBpc0RPTSgndGV4dC9odG1sJyk7XG4gKiAvLyByZXR1cm5zIHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgYm9vbCA9IGlzRE9NKCd0ZXh0L3BsYWluJyk7XG4gKiAvLyByZXR1cm5zIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRE9NKG1pbWUpIHtcbiAgICByZXR1cm4gbWltZSA9PT0gJ2FwcGxpY2F0aW9uL3Zkb20udjEranNvbicgfHwgbWltZSA9PT0gJ3RleHQvaHRtbCc7XG59XG4vKipcbiAqIEV4cG9ydHMuXG4gKi9cbmV4cG9ydCB7IGlzRE9NIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc19kb20uanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgYSBNSU1FIHR5cGUgY29ycmVzcG9uZHMgdG8gYSBNYXJrZG93biBmbGF2b3IuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSBtaW1lIC0gTUlNRSB0eXBlIHN0cmluZ1xuICogQHJldHVybnMgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgYSBwcm92aWRlZCBNSU1FIHR5cGUgY29ycmVzcG9uZHMgdG8gYSBNYXJrZG93biBmbGF2b3JcbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgYm9vbCA9IGlzTWFya2Rvd24oJ3RleHQvbWFya2Rvd24nKTtcbiAqIC8vIHJldHVybnMgdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBib29sID0gaXNNYXJrZG93bigndGV4dC9wbGFpbicpO1xuICogLy8gcmV0dXJucyBmYWxzZVxuICovXG5mdW5jdGlvbiBpc01hcmtkb3duKG1pbWUpIHtcbiAgICByZXR1cm4gKG1pbWUgPT09ICd0ZXh0L3gtaXB5dGhvbmdmbScgfHxcbiAgICAgICAgbWltZSA9PT0gJ3RleHQveC1tYXJrZG93bicgfHxcbiAgICAgICAgbWltZSA9PT0gJ3RleHQveC1nZm0nIHx8XG4gICAgICAgIG1pbWUgPT09ICd0ZXh0L21hcmtkb3duJyk7XG59XG4vKipcbiAqIEV4cG9ydHMuXG4gKi9cbmV4cG9ydCB7IGlzTWFya2Rvd24gfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzX21hcmtkb3duLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogUGFyc2VzIGEgaGVhZGluZywgaWYgb25lIGV4aXN0cywgZnJvbSBhIHByb3ZpZGVkIHN0cmluZy5cbiAqXG4gKiAjIyBOb3Rlc1xuICpcbiAqIC0gICBIZWFkaW5nIGV4YW1wbGVzOlxuICpcbiAqICAgICAtICAgTWFya2Rvd24gaGVhZGluZzpcbiAqXG4gKiAgICAgICAgIGBgYFxuICogICAgICAgICAjIEZvb1xuICogICAgICAgICBgYGBcbiAqXG4gKiAgICAgLSAgIE1hcmtkb3duIGhlYWRpbmcgKGFsdGVybmF0aXZlIHN0eWxlKTpcbiAqXG4gKiAgICAgICAgIGBgYFxuICogICAgICAgICBGb29cbiAqICAgICAgICAgPT09XG4gKiAgICAgICAgIGBgYFxuICpcbiAqICAgICAgICAgYGBgXG4gKiAgICAgICAgIEZvb1xuICogICAgICAgICAtLS1cbiAqICAgICAgICAgYGBgXG4gKlxuICogICAgIC0gICBIVE1MIGhlYWRpbmc6XG4gKlxuICogICAgICAgICBgYGBcbiAqICAgICAgICAgPGgzPkZvbzwvaDM+XG4gKiAgICAgICAgIGBgYFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gc3RyIC0gaW5wdXQgdGV4dFxuICogQHJldHVybnMgaGVhZGluZyBpbmZvXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IG91dCA9IHBhcnNlSGVhZGluZygnIyMjIEZvb1xcbicpO1xuICogLy8gcmV0dXJucyB7J3RleHQnOiAnRm9vJywgJ2xldmVsJzogMywgJ3R5cGUnOiAnbWFya2Rvd24nfVxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBvdXQgPSBwYXJzZUhlYWRpbmcoJ0Zvb1xcbj09PVxcbicpO1xuICogLy8gcmV0dXJucyB7J3RleHQnOiAnRm9vJywgJ2xldmVsJzogMSwgJ3R5cGUnOiAnbWFya2Rvd24tYWx0J31cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgb3V0ID0gcGFyc2VIZWFkaW5nKCc8aDQ+Rm9vPC9oND5cXG4nKTtcbiAqIC8vIHJldHVybnMgeyd0ZXh0JzogJ0ZvbycsICdsZXZlbCc6IDQsICd0eXBlJzogJ2h0bWwnfVxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBvdXQgPSBwYXJzZUhlYWRpbmcoJ0ZvbycpO1xuICogLy8gcmV0dXJucyBudWxsXG4gKi9cbmZ1bmN0aW9uIHBhcnNlSGVhZGluZyhzdHIpIHtcbiAgICBjb25zdCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJyk7XG4gICAgLy8gQ2FzZTogTWFya2Rvd24gaGVhZGluZ1xuICAgIGxldCBtYXRjaCA9IGxpbmVzWzBdLm1hdGNoKC9eKFsjXXsxLDZ9KSAoLiopLyk7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZXh0OiBtYXRjaFsyXS5yZXBsYWNlKC9cXFsoLispXFxdXFwoLitcXCkvZywgJyQxJyksXG4gICAgICAgICAgICBsZXZlbDogbWF0Y2hbMV0ubGVuZ3RoLFxuICAgICAgICAgICAgdHlwZTogJ21hcmtkb3duJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyBDYXNlOiBNYXJrZG93biBoZWFkaW5nIChhbHRlcm5hdGl2ZSBzdHlsZSlcbiAgICBpZiAobGluZXMubGVuZ3RoID4gMSkge1xuICAgICAgICBtYXRjaCA9IGxpbmVzWzFdLm1hdGNoKC9eIHswLDN9KFs9XXsyLH18Wy1dezIsfSlcXHMqJC8pO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdGV4dDogbGluZXNbMF0ucmVwbGFjZSgvXFxbKC4rKVxcXVxcKC4rXFwpL2csICckMScpLFxuICAgICAgICAgICAgICAgIGxldmVsOiBtYXRjaFsxXVswXSA9PT0gJz0nID8gMSA6IDIsXG4gICAgICAgICAgICAgICAgdHlwZTogJ21hcmtkb3duLWFsdCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQ2FzZTogSFRNTCBoZWFkaW5nIChXQVJOSU5HOiB0aGlzIGlzIG5vdCBwYXJ0aWN1bGFybHkgcm9idXN0LCBhcyBIVE1MIGhlYWRpbmdzIGNhbiBzcGFuIG11bHRpcGxlIGxpbmVzKVxuICAgIG1hdGNoID0gbGluZXNbMF0ubWF0Y2goLzxoKFsxLTZdKS4qPiguKik8XFwvaFxcMT4vaSk7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZXh0OiBtYXRjaFsyXSxcbiAgICAgICAgICAgIGxldmVsOiBwYXJzZUludChtYXRjaFsxXSwgMTApLFxuICAgICAgICAgICAgdHlwZTogJ2h0bWwnXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuLyoqXG4gKiBFeHBvcnRzLlxuICovXG5leHBvcnQgeyBwYXJzZUhlYWRpbmcgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhcnNlX2hlYWRpbmcuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBBbGxvd2VkIEhUTUwgdGFncyBhbmQgYXNzb2NpYXRlZCBhdHRyaWJ1dGVzIGZvciBUb0MgZW50cmllcyB3aGVuIHNhbml0aXppbmcgSFRNTCBoZWFkaW5ncy5cbiAqXG4gKiAjIyBOb3Rlc1xuICpcbiAqIC0gICBXZSBzcGVjaWZpY2FsbHkgZGlzYWxsb3cgYW5jaG9yIHRhZ3MsIHNpbmNlIHdlIGFyZSBhZGRpbmcgb3VyIG93bi5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBzYW5pdGl6ZXJPcHRpb25zID0ge1xuICAgIGFsbG93ZWRUYWdzOiBbXG4gICAgICAgICdwJyxcbiAgICAgICAgJ2Jsb2NrcXVvdGUnLFxuICAgICAgICAnYicsXG4gICAgICAgICdpJyxcbiAgICAgICAgJ3N0cm9uZycsXG4gICAgICAgICdlbScsXG4gICAgICAgICdzdHJpa2UnLFxuICAgICAgICAnY29kZScsXG4gICAgICAgICdicicsXG4gICAgICAgICdkaXYnLFxuICAgICAgICAnc3BhbicsXG4gICAgICAgICdwcmUnLFxuICAgICAgICAnZGVsJ1xuICAgIF0sXG4gICAgYWxsb3dlZEF0dHJpYnV0ZXM6IHtcbiAgICAgICAgLy8gQWxsb3cgXCJjbGFzc1wiIGF0dHJpYnV0ZSBmb3IgPGNvZGU+IHRhZ3MuXG4gICAgICAgIGNvZGU6IFsnY2xhc3MnXSxcbiAgICAgICAgLy8gQWxsb3cgXCJjbGFzc1wiIGF0dHJpYnV0ZSBmb3IgPHNwYW4+IHRhZ3MuXG4gICAgICAgIHNwYW46IFsnY2xhc3MnXSxcbiAgICAgICAgLy8gQWxsb3cgXCJjbGFzc1wiIGF0dHJpYnV0ZSBmb3IgPGRpdj4gdGFncy5cbiAgICAgICAgZGl2OiBbJ2NsYXNzJ10sXG4gICAgICAgIC8vIEFsbG93IFwiY2xhc3NcIiBhdHRyaWJ1dGUgZm9yIDxwPiB0YWdzLlxuICAgICAgICBwOiBbJ2NsYXNzJ10sXG4gICAgICAgIC8vIEFsbG93IFwiY2xhc3NcIiBhdHRyaWJ1dGUgZm9yIDxwcmU+IHRhZ3MuXG4gICAgICAgIHByZTogWydjbGFzcyddXG4gICAgfVxufTtcbi8qKlxuICogRXhwb3J0cy5cbiAqL1xuZXhwb3J0IHsgc2FuaXRpemVyT3B0aW9ucyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2FuaXRpemVyX29wdGlvbnMuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==