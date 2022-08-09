(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_rendermime_lib_index_js"],{

/***/ "../../packages/rendermime/lib/attachmentmodel.js":
/*!********************************************************!*\
  !*** ../../packages/rendermime/lib/attachmentmodel.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttachmentModel": () => (/* binding */ AttachmentModel)
/* harmony export */ });
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/observables */ "webpack/sharing/consume/default/@jupyterlab/observables/@jupyterlab/observables");
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/



/**
 * The default implementation of a notebook attachment model.
 */
class AttachmentModel {
    /**
     * Construct a new attachment model.
     */
    constructor(options) {
        // All attachments are untrusted
        this.trusted = false;
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(this);
        this._raw = {};
        const data = Private.getData(options.value);
        this._data = new _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__.ObservableJSON({ values: data });
        this._rawData = data;
        // Make a copy of the data.
        const value = options.value;
        for (const key in value) {
            // Ignore data and metadata that were stripped.
            switch (key) {
                case 'data':
                    break;
                default:
                    this._raw[key] = Private.extract(value, key);
            }
        }
    }
    /**
     * A signal emitted when the attachment model changes.
     */
    get changed() {
        return this._changed;
    }
    /**
     * Dispose of the resources used by the attachment model.
     */
    dispose() {
        this._data.dispose();
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal.clearData(this);
    }
    /**
     * The data associated with the model.
     */
    get data() {
        return this._rawData;
    }
    /**
     * The metadata associated with the model.
     */
    get metadata() {
        return {};
    }
    /**
     * Set the data associated with the model.
     *
     * #### Notes
     * Depending on the implementation of the mime model,
     * this call may or may not have deferred effects,
     */
    setData(options) {
        if (options.data) {
            this._updateObservable(this._data, options.data);
            this._rawData = options.data;
        }
        this._changed.emit(void 0);
    }
    /**
     * Serialize the model to JSON.
     */
    toJSON() {
        const attachment = {};
        for (const key in this._raw) {
            attachment[key] = Private.extract(this._raw, key);
        }
        return attachment;
    }
    /**
     * Update an observable JSON object using a readonly JSON object.
     */
    _updateObservable(observable, data) {
        const oldKeys = observable.keys();
        const newKeys = Object.keys(data);
        // Handle removed keys.
        for (const key of oldKeys) {
            if (newKeys.indexOf(key) === -1) {
                observable.delete(key);
            }
        }
        // Handle changed data.
        for (const key of newKeys) {
            const oldValue = observable.get(key);
            const newValue = data[key];
            if (oldValue !== newValue) {
                observable.set(key, newValue);
            }
        }
    }
}
/**
 * The namespace for AttachmentModel statics.
 */
(function (AttachmentModel) {
    /**
     * Get the data for an attachment.
     *
     * @params bundle - A kernel attachment MIME bundle.
     *
     * @returns - The data for the payload.
     */
    function getData(bundle) {
        return Private.getData(bundle);
    }
    AttachmentModel.getData = getData;
})(AttachmentModel || (AttachmentModel = {}));
/**
 * The namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * Get the data from a notebook attachment.
     */
    function getData(bundle) {
        return convertBundle(bundle);
    }
    Private.getData = getData;
    /**
     * Get the bundle options given attachment model options.
     */
    function getBundleOptions(options) {
        const data = getData(options.value);
        return { data };
    }
    Private.getBundleOptions = getBundleOptions;
    /**
     * Extract a value from a JSONObject.
     */
    function extract(value, key) {
        const item = value[key];
        if (item === undefined || _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.isPrimitive(item)) {
            return item;
        }
        return _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepCopy(item);
    }
    Private.extract = extract;
    /**
     * Convert a mime bundle to mime data.
     */
    function convertBundle(bundle) {
        const map = Object.create(null);
        for (const mimeType in bundle) {
            map[mimeType] = extract(bundle, mimeType);
        }
        return map;
    }
})(Private || (Private = {}));
//# sourceMappingURL=attachmentmodel.js.map

/***/ }),

/***/ "../../packages/rendermime/lib/factories.js":
/*!**************************************************!*\
  !*** ../../packages/rendermime/lib/factories.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "htmlRendererFactory": () => (/* binding */ htmlRendererFactory),
/* harmony export */   "imageRendererFactory": () => (/* binding */ imageRendererFactory),
/* harmony export */   "latexRendererFactory": () => (/* binding */ latexRendererFactory),
/* harmony export */   "markdownRendererFactory": () => (/* binding */ markdownRendererFactory),
/* harmony export */   "svgRendererFactory": () => (/* binding */ svgRendererFactory),
/* harmony export */   "textRendererFactory": () => (/* binding */ textRendererFactory),
/* harmony export */   "javaScriptRendererFactory": () => (/* binding */ javaScriptRendererFactory),
/* harmony export */   "standardRendererFactories": () => (/* binding */ standardRendererFactories)
/* harmony export */ });
/* harmony import */ var _widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./widgets */ "../../packages/rendermime/lib/widgets.js");

/**
 * A mime renderer factory for raw html.
 */
const htmlRendererFactory = {
    safe: true,
    mimeTypes: ['text/html'],
    defaultRank: 50,
    createRenderer: options => new _widgets__WEBPACK_IMPORTED_MODULE_0__.RenderedHTML(options)
};
/**
 * A mime renderer factory for images.
 */
const imageRendererFactory = {
    safe: true,
    mimeTypes: ['image/bmp', 'image/png', 'image/jpeg', 'image/gif'],
    defaultRank: 90,
    createRenderer: options => new _widgets__WEBPACK_IMPORTED_MODULE_0__.RenderedImage(options)
};
/**
 * A mime renderer factory for LaTeX.
 */
const latexRendererFactory = {
    safe: true,
    mimeTypes: ['text/latex'],
    defaultRank: 70,
    createRenderer: options => new _widgets__WEBPACK_IMPORTED_MODULE_0__.RenderedLatex(options)
};
/**
 * A mime renderer factory for Markdown.
 */
const markdownRendererFactory = {
    safe: true,
    mimeTypes: ['text/markdown'],
    defaultRank: 60,
    createRenderer: options => new _widgets__WEBPACK_IMPORTED_MODULE_0__.RenderedMarkdown(options)
};
/**
 * A mime renderer factory for svg.
 */
const svgRendererFactory = {
    safe: false,
    mimeTypes: ['image/svg+xml'],
    defaultRank: 80,
    createRenderer: options => new _widgets__WEBPACK_IMPORTED_MODULE_0__.RenderedSVG(options)
};
/**
 * A mime renderer factory for plain and jupyter console text data.
 */
const textRendererFactory = {
    safe: true,
    mimeTypes: [
        'text/plain',
        'application/vnd.jupyter.stdout',
        'application/vnd.jupyter.stderr'
    ],
    defaultRank: 120,
    createRenderer: options => new _widgets__WEBPACK_IMPORTED_MODULE_0__.RenderedText(options)
};
/**
 * A placeholder factory for rendered JavaScript.
 */
const javaScriptRendererFactory = {
    safe: false,
    mimeTypes: ['text/javascript', 'application/javascript'],
    defaultRank: 110,
    createRenderer: options => new _widgets__WEBPACK_IMPORTED_MODULE_0__.RenderedJavaScript(options)
};
/**
 * The standard factories provided by the rendermime package.
 */
const standardRendererFactories = [
    htmlRendererFactory,
    markdownRendererFactory,
    latexRendererFactory,
    svgRendererFactory,
    imageRendererFactory,
    javaScriptRendererFactory,
    textRendererFactory
];
//# sourceMappingURL=factories.js.map

/***/ }),

/***/ "../../packages/rendermime/lib/index.js":
/*!**********************************************!*\
  !*** ../../packages/rendermime/lib/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttachmentModel": () => (/* reexport safe */ _attachmentmodel__WEBPACK_IMPORTED_MODULE_1__.AttachmentModel),
/* harmony export */   "htmlRendererFactory": () => (/* reexport safe */ _factories__WEBPACK_IMPORTED_MODULE_2__.htmlRendererFactory),
/* harmony export */   "imageRendererFactory": () => (/* reexport safe */ _factories__WEBPACK_IMPORTED_MODULE_2__.imageRendererFactory),
/* harmony export */   "javaScriptRendererFactory": () => (/* reexport safe */ _factories__WEBPACK_IMPORTED_MODULE_2__.javaScriptRendererFactory),
/* harmony export */   "latexRendererFactory": () => (/* reexport safe */ _factories__WEBPACK_IMPORTED_MODULE_2__.latexRendererFactory),
/* harmony export */   "markdownRendererFactory": () => (/* reexport safe */ _factories__WEBPACK_IMPORTED_MODULE_2__.markdownRendererFactory),
/* harmony export */   "standardRendererFactories": () => (/* reexport safe */ _factories__WEBPACK_IMPORTED_MODULE_2__.standardRendererFactories),
/* harmony export */   "svgRendererFactory": () => (/* reexport safe */ _factories__WEBPACK_IMPORTED_MODULE_2__.svgRendererFactory),
/* harmony export */   "textRendererFactory": () => (/* reexport safe */ _factories__WEBPACK_IMPORTED_MODULE_2__.textRendererFactory),
/* harmony export */   "removeMath": () => (/* reexport safe */ _latex__WEBPACK_IMPORTED_MODULE_3__.removeMath),
/* harmony export */   "replaceMath": () => (/* reexport safe */ _latex__WEBPACK_IMPORTED_MODULE_3__.replaceMath),
/* harmony export */   "MimeModel": () => (/* reexport safe */ _mimemodel__WEBPACK_IMPORTED_MODULE_4__.MimeModel),
/* harmony export */   "OutputModel": () => (/* reexport safe */ _outputmodel__WEBPACK_IMPORTED_MODULE_5__.OutputModel),
/* harmony export */   "RenderMimeRegistry": () => (/* reexport safe */ _registry__WEBPACK_IMPORTED_MODULE_6__.RenderMimeRegistry),
/* harmony export */   "renderHTML": () => (/* reexport safe */ _renderers__WEBPACK_IMPORTED_MODULE_7__.renderHTML),
/* harmony export */   "renderImage": () => (/* reexport safe */ _renderers__WEBPACK_IMPORTED_MODULE_7__.renderImage),
/* harmony export */   "renderLatex": () => (/* reexport safe */ _renderers__WEBPACK_IMPORTED_MODULE_7__.renderLatex),
/* harmony export */   "renderMarkdown": () => (/* reexport safe */ _renderers__WEBPACK_IMPORTED_MODULE_7__.renderMarkdown),
/* harmony export */   "renderSVG": () => (/* reexport safe */ _renderers__WEBPACK_IMPORTED_MODULE_7__.renderSVG),
/* harmony export */   "renderText": () => (/* reexport safe */ _renderers__WEBPACK_IMPORTED_MODULE_7__.renderText),
/* harmony export */   "ILatexTypesetter": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_8__.ILatexTypesetter),
/* harmony export */   "IRenderMimeRegistry": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_8__.IRenderMimeRegistry),
/* harmony export */   "RenderedCommon": () => (/* reexport safe */ _widgets__WEBPACK_IMPORTED_MODULE_9__.RenderedCommon),
/* harmony export */   "RenderedHTML": () => (/* reexport safe */ _widgets__WEBPACK_IMPORTED_MODULE_9__.RenderedHTML),
/* harmony export */   "RenderedHTMLCommon": () => (/* reexport safe */ _widgets__WEBPACK_IMPORTED_MODULE_9__.RenderedHTMLCommon),
/* harmony export */   "RenderedImage": () => (/* reexport safe */ _widgets__WEBPACK_IMPORTED_MODULE_9__.RenderedImage),
/* harmony export */   "RenderedJavaScript": () => (/* reexport safe */ _widgets__WEBPACK_IMPORTED_MODULE_9__.RenderedJavaScript),
/* harmony export */   "RenderedLatex": () => (/* reexport safe */ _widgets__WEBPACK_IMPORTED_MODULE_9__.RenderedLatex),
/* harmony export */   "RenderedMarkdown": () => (/* reexport safe */ _widgets__WEBPACK_IMPORTED_MODULE_9__.RenderedMarkdown),
/* harmony export */   "RenderedSVG": () => (/* reexport safe */ _widgets__WEBPACK_IMPORTED_MODULE_9__.RenderedSVG),
/* harmony export */   "RenderedText": () => (/* reexport safe */ _widgets__WEBPACK_IMPORTED_MODULE_9__.RenderedText)
/* harmony export */ });
/* harmony import */ var _jupyterlab_rendermime_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/rendermime-interfaces */ "webpack/sharing/consume/default/@jupyterlab/rendermime-interfaces/@jupyterlab/rendermime-interfaces");
/* harmony import */ var _jupyterlab_rendermime_interfaces__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime_interfaces__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _jupyterlab_rendermime_interfaces__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _jupyterlab_rendermime_interfaces__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _attachmentmodel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attachmentmodel */ "../../packages/rendermime/lib/attachmentmodel.js");
/* harmony import */ var _factories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories */ "../../packages/rendermime/lib/factories.js");
/* harmony import */ var _latex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./latex */ "../../packages/rendermime/lib/latex.js");
/* harmony import */ var _mimemodel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mimemodel */ "../../packages/rendermime/lib/mimemodel.js");
/* harmony import */ var _outputmodel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./outputmodel */ "../../packages/rendermime/lib/outputmodel.js");
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./registry */ "../../packages/rendermime/lib/registry.js");
/* harmony import */ var _renderers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./renderers */ "../../packages/rendermime/lib/renderers.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tokens */ "../../packages/rendermime/lib/tokens.js");
/* harmony import */ var _widgets__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./widgets */ "../../packages/rendermime/lib/widgets.js");
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module rendermime
 */










//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/rendermime/lib/latex.js":
/*!**********************************************!*\
  !*** ../../packages/rendermime/lib/latex.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeMath": () => (/* binding */ removeMath),
/* harmony export */   "replaceMath": () => (/* binding */ replaceMath)
/* harmony export */ });
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
// Some magic for deferring mathematical expressions to MathJax
// by hiding them from the Markdown parser.
// Some of the code here is adapted with permission from Davide Cervone
// under the terms of the Apache2 license governing the MathJax project.
// Other minor modifications are also due to StackExchange and are used with
// permission.
const inline = '$'; // the inline math delimiter
// MATHSPLIT contains the pattern for math delimiters and special symbols
// needed for searching for math in the text input.
const MATHSPLIT = /(\$\$?|\\(?:begin|end)\{[a-z]*\*?\}|\\[{}$]|[{}]|(?:\n\s*)+|@@\d+@@|\\\\(?:\(|\)|\[|\]))/i;
/**
 *  Break up the text into its component parts and search
 *    through them for math delimiters, braces, linebreaks, etc.
 *  Math delimiters must match and braces must balance.
 *  Don't allow math to pass through a double linebreak
 *    (which will be a paragraph).
 */
function removeMath(text) {
    const math = []; // stores math strings for later
    let start = null;
    let end = null;
    let last = null;
    let braces = 0;
    let deTilde;
    // Except for extreme edge cases, this should catch precisely those pieces of the markdown
    // source that will later be turned into code spans. While MathJax will not TeXify code spans,
    // we still have to consider them at this point; the following issue has happened several times:
    //
    //     `$foo` and `$bar` are variables.  -->  <code>$foo ` and `$bar</code> are variables.
    const hasCodeSpans = text.includes('`') || text.includes('~~~');
    if (hasCodeSpans) {
        text = text
            .replace(/~/g, '~T')
            // note: the `fence` (three or more consecutive tildes or backticks)
            // can be followed by an `info string` but this cannot include backticks,
            // see specification: https://spec.commonmark.org/0.30/#info-string
            .replace(/^(?<fence>`{3,}|(~T){3,})[^`\n]*\n([\s\S]*?)^\k<fence>`*$/gm, wholematch => wholematch.replace(/\$/g, '~D'))
            .replace(/(^|[^\\])(`+)([^\n]*?[^`\n])\2(?!`)/gm, wholematch => wholematch.replace(/\$/g, '~D'));
        deTilde = (text) => {
            return text.replace(/~([TD])/g, (wholematch, character) => character === 'T' ? '~' : inline);
        };
    }
    else {
        deTilde = (text) => {
            return text;
        };
    }
    let blocks = text.replace(/\r\n?/g, '\n').split(MATHSPLIT);
    for (let i = 1, m = blocks.length; i < m; i += 2) {
        const block = blocks[i];
        if (block.charAt(0) === '@') {
            //
            //  Things that look like our math markers will get
            //  stored and then retrieved along with the math.
            //
            blocks[i] = '@@' + math.length + '@@';
            math.push(block);
        }
        else if (start !== null) {
            //
            //  If we are in math, look for the end delimiter,
            //    but don't go past double line breaks, and
            //    and balance braces within the math.
            //
            if (block === end) {
                if (braces) {
                    last = i;
                }
                else {
                    blocks = processMath(start, i, deTilde, math, blocks);
                    start = null;
                    end = null;
                    last = null;
                }
            }
            else if (block.match(/\n.*\n/)) {
                if (last !== null) {
                    i = last;
                    blocks = processMath(start, i, deTilde, math, blocks);
                }
                start = null;
                end = null;
                last = null;
                braces = 0;
            }
            else if (block === '{') {
                braces++;
            }
            else if (block === '}' && braces) {
                braces--;
            }
        }
        else {
            //
            //  Look for math start delimiters and when
            //    found, set up the end delimiter.
            //
            if (block === inline || block === '$$') {
                start = i;
                end = block;
                braces = 0;
            }
            else if (block === '\\\\(' || block === '\\\\[') {
                start = i;
                end = block.slice(-1) === '(' ? '\\\\)' : '\\\\]';
                braces = 0;
            }
            else if (block.substr(1, 5) === 'begin') {
                start = i;
                end = '\\end' + block.substr(6);
                braces = 0;
            }
        }
    }
    if (start !== null && last !== null) {
        blocks = processMath(start, last, deTilde, math, blocks);
        start = null;
        end = null;
        last = null;
    }
    return { text: deTilde(blocks.join('')), math };
}
/**
 * Put back the math strings that were saved,
 * and clear the math array (no need to keep it around).
 */
function replaceMath(text, math) {
    /**
     * Replace a math placeholder with its corresponding group.
     * The math delimiters "\\(", "\\[", "\\)" and "\\]" are replaced
     * removing one backslash in order to be interpreted correctly by MathJax.
     */
    const process = (match, n) => {
        let group = math[n];
        if (group.substr(0, 3) === '\\\\(' &&
            group.substr(group.length - 3) === '\\\\)') {
            group = '\\(' + group.substring(3, group.length - 3) + '\\)';
        }
        else if (group.substr(0, 3) === '\\\\[' &&
            group.substr(group.length - 3) === '\\\\]') {
            group = '\\[' + group.substring(3, group.length - 3) + '\\]';
        }
        return group;
    };
    // Replace all the math group placeholders in the text
    // with the saved strings.
    return text.replace(/@@(\d+)@@/g, process);
}
/**
 * Process math blocks.
 *
 * The math is in blocks i through j, so
 *   collect it into one block and clear the others.
 *  Replace &, <, and > by named entities.
 *  For IE, put <br> at the ends of comments since IE removes \n.
 *  Clear the current math positions and store the index of the
 *   math, then push the math string onto the storage array.
 *  The preProcess function is called on all blocks if it has been passed in
 */
function processMath(i, j, preProcess, math, blocks) {
    let block = blocks
        .slice(i, j + 1)
        .join('')
        .replace(/&/g, '&amp;') // use HTML entity for &
        .replace(/</g, '&lt;') // use HTML entity for <
        .replace(/>/g, '&gt;'); // use HTML entity for >
    if (navigator && navigator.appName === 'Microsoft Internet Explorer') {
        block = block.replace(/(%[^\n]*)\n/g, '$1<br/>\n');
    }
    while (j > i) {
        blocks[j] = '';
        j--;
    }
    blocks[i] = '@@' + math.length + '@@'; // replace the current block text with a unique tag to find later
    if (preProcess) {
        block = preProcess(block);
    }
    math.push(block);
    return blocks;
}
//# sourceMappingURL=latex.js.map

/***/ }),

/***/ "../../packages/rendermime/lib/mimemodel.js":
/*!**************************************************!*\
  !*** ../../packages/rendermime/lib/mimemodel.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MimeModel": () => (/* binding */ MimeModel)
/* harmony export */ });
/**
 * The default mime model implementation.
 */
class MimeModel {
    /**
     * Construct a new mime model.
     */
    constructor(options = {}) {
        this.trusted = !!options.trusted;
        this._data = options.data || {};
        this._metadata = options.metadata || {};
        this._callback = options.callback || Private.noOp;
    }
    /**
     * The data associated with the model.
     */
    get data() {
        return this._data;
    }
    /**
     * The metadata associated with the model.
     */
    get metadata() {
        return this._metadata;
    }
    /**
     * Set the data associated with the model.
     *
     * #### Notes
     * Depending on the implementation of the mime model,
     * this call may or may not have deferred effects,
     */
    setData(options) {
        this._data = options.data || this._data;
        this._metadata = options.metadata || this._metadata;
        this._callback(options);
    }
}
/**
 * The namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * A no-op callback function.
     */
    function noOp() {
        /* no-op */
    }
    Private.noOp = noOp;
})(Private || (Private = {}));
//# sourceMappingURL=mimemodel.js.map

/***/ }),

/***/ "../../packages/rendermime/lib/outputmodel.js":
/*!****************************************************!*\
  !*** ../../packages/rendermime/lib/outputmodel.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OutputModel": () => (/* binding */ OutputModel)
/* harmony export */ });
/* harmony import */ var _jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/nbformat */ "webpack/sharing/consume/default/@jupyterlab/nbformat/@jupyterlab/nbformat");
/* harmony import */ var _jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/observables */ "webpack/sharing/consume/default/@jupyterlab/observables/@jupyterlab/observables");
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_observables__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_3__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/




/**
 * The default implementation of a notebook output model.
 */
class OutputModel {
    /**
     * Construct a new output model.
     */
    constructor(options) {
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal(this);
        this._raw = {};
        const { data, metadata, trusted } = Private.getBundleOptions(options);
        this._data = new _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_1__.ObservableJSON({ values: data });
        this._rawData = data;
        this._metadata = new _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_1__.ObservableJSON({ values: metadata });
        this._rawMetadata = metadata;
        this.trusted = trusted;
        // Make a copy of the data.
        const value = options.value;
        for (const key in value) {
            // Ignore data and metadata that were stripped.
            switch (key) {
                case 'data':
                case 'metadata':
                    break;
                default:
                    this._raw[key] = Private.extract(value, key);
            }
        }
        this.type = value.output_type;
        if (_jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0__.isExecuteResult(value)) {
            this.executionCount = value.execution_count;
        }
        else {
            this.executionCount = null;
        }
    }
    /**
     * A signal emitted when the output model changes.
     */
    get changed() {
        return this._changed;
    }
    /**
     * Dispose of the resources used by the output model.
     */
    dispose() {
        this._data.dispose();
        this._metadata.dispose();
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal.clearData(this);
    }
    /**
     * The data associated with the model.
     */
    get data() {
        return this._rawData;
    }
    /**
     * The metadata associated with the model.
     */
    get metadata() {
        return this._rawMetadata;
    }
    /**
     * Set the data associated with the model.
     *
     * #### Notes
     * Depending on the implementation of the mime model,
     * this call may or may not have deferred effects,
     */
    setData(options) {
        if (options.data) {
            this._updateObservable(this._data, options.data);
            this._rawData = options.data;
        }
        if (options.metadata) {
            this._updateObservable(this._metadata, options.metadata);
            this._rawMetadata = options.metadata;
        }
        this._changed.emit(void 0);
    }
    /**
     * Serialize the model to JSON.
     */
    toJSON() {
        const output = {};
        for (const key in this._raw) {
            output[key] = Private.extract(this._raw, key);
        }
        switch (this.type) {
            case 'display_data':
            case 'execute_result':
            case 'update_display_data':
                output['data'] = this.data;
                output['metadata'] = this.metadata;
                break;
            default:
                break;
        }
        // Remove transient data.
        delete output['transient'];
        return output;
    }
    /**
     * Update an observable JSON object using a readonly JSON object.
     */
    _updateObservable(observable, data) {
        const oldKeys = observable.keys();
        const newKeys = Object.keys(data);
        // Handle removed keys.
        for (const key of oldKeys) {
            if (newKeys.indexOf(key) === -1) {
                observable.delete(key);
            }
        }
        // Handle changed data.
        for (const key of newKeys) {
            const oldValue = observable.get(key);
            const newValue = data[key];
            if (oldValue !== newValue) {
                observable.set(key, newValue);
            }
        }
    }
}
/**
 * The namespace for OutputModel statics.
 */
(function (OutputModel) {
    /**
     * Get the data for an output.
     *
     * @params output - A kernel output message payload.
     *
     * @returns - The data for the payload.
     */
    function getData(output) {
        return Private.getData(output);
    }
    OutputModel.getData = getData;
    /**
     * Get the metadata from an output message.
     *
     * @params output - A kernel output message payload.
     *
     * @returns - The metadata for the payload.
     */
    function getMetadata(output) {
        return Private.getMetadata(output);
    }
    OutputModel.getMetadata = getMetadata;
})(OutputModel || (OutputModel = {}));
/**
 * The namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * Get the data from a notebook output.
     */
    function getData(output) {
        let bundle = {};
        if (_jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0__.isExecuteResult(output) ||
            _jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0__.isDisplayData(output) ||
            _jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0__.isDisplayUpdate(output)) {
            bundle = output.data;
        }
        else if (_jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0__.isStream(output)) {
            if (output.name === 'stderr') {
                bundle['application/vnd.jupyter.stderr'] = output.text;
            }
            else {
                bundle['application/vnd.jupyter.stdout'] = output.text;
            }
        }
        else if (_jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0__.isError(output)) {
            bundle['application/vnd.jupyter.error'] = output;
            const traceback = output.traceback.join('\n');
            bundle['application/vnd.jupyter.stderr'] =
                traceback || `${output.ename}: ${output.evalue}`;
        }
        return convertBundle(bundle);
    }
    Private.getData = getData;
    /**
     * Get the metadata from an output message.
     */
    function getMetadata(output) {
        const value = Object.create(null);
        if (_jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0__.isExecuteResult(output) || _jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0__.isDisplayData(output)) {
            for (const key in output.metadata) {
                value[key] = extract(output.metadata, key);
            }
        }
        return value;
    }
    Private.getMetadata = getMetadata;
    /**
     * Get the bundle options given output model options.
     */
    function getBundleOptions(options) {
        const data = getData(options.value);
        const metadata = getMetadata(options.value);
        const trusted = !!options.trusted;
        return { data, metadata, trusted };
    }
    Private.getBundleOptions = getBundleOptions;
    /**
     * Extract a value from a JSONObject.
     */
    function extract(value, key) {
        const item = value[key];
        if (item === undefined || _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.JSONExt.isPrimitive(item)) {
            return item;
        }
        return JSON.parse(JSON.stringify(item));
    }
    Private.extract = extract;
    /**
     * Convert a mime bundle to mime data.
     */
    function convertBundle(bundle) {
        const map = Object.create(null);
        for (const mimeType in bundle) {
            map[mimeType] = extract(bundle, mimeType);
        }
        return map;
    }
})(Private || (Private = {}));
//# sourceMappingURL=outputmodel.js.map

/***/ }),

/***/ "../../packages/rendermime/lib/registry.js":
/*!*************************************************!*\
  !*** ../../packages/rendermime/lib/registry.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderMimeRegistry": () => (/* binding */ RenderMimeRegistry)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mimemodel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mimemodel */ "../../packages/rendermime/lib/mimemodel.js");
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/




/**
 * An object which manages mime renderer factories.
 *
 * This object is used to render mime models using registered mime
 * renderers, selecting the preferred mime renderer to render the
 * model into a widget.
 *
 * #### Notes
 * This class is not intended to be subclassed.
 */
class RenderMimeRegistry {
    /**
     * Construct a new rendermime.
     *
     * @param options - The options for initializing the instance.
     */
    constructor(options = {}) {
        this._id = 0;
        this._ranks = {};
        this._types = null;
        this._factories = {};
        // Parse the options.
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        this.resolver = options.resolver || null;
        this.linkHandler = options.linkHandler || null;
        this.latexTypesetter = options.latexTypesetter || null;
        this.sanitizer = options.sanitizer || _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.defaultSanitizer;
        // Add the initial factories.
        if (options.initialFactories) {
            for (const factory of options.initialFactories) {
                this.addFactory(factory);
            }
        }
    }
    /**
     * The ordered list of mimeTypes.
     */
    get mimeTypes() {
        return this._types || (this._types = Private.sortedTypes(this._ranks));
    }
    /**
     * Find the preferred mime type for a mime bundle.
     *
     * @param bundle - The bundle of mime data.
     *
     * @param safe - How to consider safe/unsafe factories. If 'ensure',
     *   it will only consider safe factories. If 'any', any factory will be
     *   considered. If 'prefer', unsafe factories will be considered, but
     *   only after the safe options have been exhausted.
     *
     * @returns The preferred mime type from the available factories,
     *   or `undefined` if the mime type cannot be rendered.
     */
    preferredMimeType(bundle, safe = 'ensure') {
        // Try to find a safe factory first, if preferred.
        if (safe === 'ensure' || safe === 'prefer') {
            for (const mt of this.mimeTypes) {
                if (mt in bundle && this._factories[mt].safe) {
                    return mt;
                }
            }
        }
        if (safe !== 'ensure') {
            // Otherwise, search for the best factory among all factories.
            for (const mt of this.mimeTypes) {
                if (mt in bundle) {
                    return mt;
                }
            }
        }
        // Otherwise, no matching mime type exists.
        return undefined;
    }
    /**
     * Create a renderer for a mime type.
     *
     * @param mimeType - The mime type of interest.
     *
     * @returns A new renderer for the given mime type.
     *
     * @throws An error if no factory exists for the mime type.
     */
    createRenderer(mimeType) {
        // Throw an error if no factory exists for the mime type.
        if (!(mimeType in this._factories)) {
            throw new Error(`No factory for mime type: '${mimeType}'`);
        }
        // Invoke the best factory for the given mime type.
        return this._factories[mimeType].createRenderer({
            mimeType,
            resolver: this.resolver,
            sanitizer: this.sanitizer,
            linkHandler: this.linkHandler,
            latexTypesetter: this.latexTypesetter,
            translator: this.translator
        });
    }
    /**
     * Create a new mime model.  This is a convenience method.
     *
     * @options - The options used to create the model.
     *
     * @returns A new mime model.
     */
    createModel(options = {}) {
        return new _mimemodel__WEBPACK_IMPORTED_MODULE_3__.MimeModel(options);
    }
    /**
     * Create a clone of this rendermime instance.
     *
     * @param options - The options for configuring the clone.
     *
     * @returns A new independent clone of the rendermime.
     */
    clone(options = {}) {
        // Create the clone.
        const clone = new RenderMimeRegistry({
            resolver: options.resolver || this.resolver || undefined,
            sanitizer: options.sanitizer || this.sanitizer || undefined,
            linkHandler: options.linkHandler || this.linkHandler || undefined,
            latexTypesetter: options.latexTypesetter || this.latexTypesetter || undefined,
            translator: this.translator
        });
        // Clone the internal state.
        clone._factories = Object.assign({}, this._factories);
        clone._ranks = Object.assign({}, this._ranks);
        clone._id = this._id;
        // Return the cloned object.
        return clone;
    }
    /**
     * Get the renderer factory registered for a mime type.
     *
     * @param mimeType - The mime type of interest.
     *
     * @returns The factory for the mime type, or `undefined`.
     */
    getFactory(mimeType) {
        return this._factories[mimeType];
    }
    /**
     * Add a renderer factory to the rendermime.
     *
     * @param factory - The renderer factory of interest.
     *
     * @param rank - The rank of the renderer. A lower rank indicates
     *   a higher priority for rendering. If not given, the rank will
     *   defer to the `defaultRank` of the factory.  If no `defaultRank`
     *   is given, it will default to 100.
     *
     * #### Notes
     * The renderer will replace an existing renderer for the given
     * mimeType.
     */
    addFactory(factory, rank) {
        if (rank === undefined) {
            rank = factory.defaultRank;
            if (rank === undefined) {
                rank = 100;
            }
        }
        for (const mt of factory.mimeTypes) {
            this._factories[mt] = factory;
            this._ranks[mt] = { rank, id: this._id++ };
        }
        this._types = null;
    }
    /**
     * Remove a mime type.
     *
     * @param mimeType - The mime type of interest.
     */
    removeMimeType(mimeType) {
        delete this._factories[mimeType];
        delete this._ranks[mimeType];
        this._types = null;
    }
    /**
     * Get the rank for a given mime type.
     *
     * @param mimeType - The mime type of interest.
     *
     * @returns The rank of the mime type or undefined.
     */
    getRank(mimeType) {
        const rank = this._ranks[mimeType];
        return rank && rank.rank;
    }
    /**
     * Set the rank of a given mime type.
     *
     * @param mimeType - The mime type of interest.
     *
     * @param rank - The new rank to assign.
     *
     * #### Notes
     * This is a no-op if the mime type is not registered.
     */
    setRank(mimeType, rank) {
        if (!this._ranks[mimeType]) {
            return;
        }
        const id = this._id++;
        this._ranks[mimeType] = { rank, id };
        this._types = null;
    }
}
/**
 * The namespace for `RenderMimeRegistry` class statics.
 */
(function (RenderMimeRegistry) {
    /**
     * A default resolver that uses a given reference path and a contents manager.
     */
    class UrlResolver {
        /**
         * Create a new url resolver.
         */
        constructor(options) {
            if (options.path) {
                this._path = options.path;
            }
            else if (options.session) {
                this._session = options.session;
            }
            else {
                throw new Error("Either 'path' or 'session' must be given as a constructor option");
            }
            this._contents = options.contents;
        }
        /**
         * The path of the object, from which local urls can be derived.
         */
        get path() {
            var _a;
            return (_a = this._path) !== null && _a !== void 0 ? _a : this._session.path;
        }
        set path(value) {
            this._path = value;
        }
        /**
         * Resolve a relative url to an absolute url path.
         */
        async resolveUrl(url) {
            if (this.isLocal(url)) {
                const cwd = encodeURI(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.dirname(this.path));
                url = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.resolve(cwd, url);
            }
            return url;
        }
        /**
         * Get the download url of a given absolute url path.
         *
         * #### Notes
         * The returned URL may include a query parameter.
         */
        async getDownloadUrl(urlPath) {
            if (this.isLocal(urlPath)) {
                // decode url->path before passing to contents api
                return this._contents.getDownloadUrl(decodeURIComponent(urlPath));
            }
            return urlPath;
        }
        /**
         * Whether the URL should be handled by the resolver
         * or not.
         *
         * #### Notes
         * This is similar to the `isLocal` check in `URLExt`,
         * but it also checks whether the path points to any
         * of the `IDrive`s that may be registered with the contents
         * manager.
         */
        isLocal(url) {
            if (this.isMalformed(url)) {
                return false;
            }
            return _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.URLExt.isLocal(url) || !!this._contents.driveName(decodeURI(url));
        }
        /**
         * Whether the URL can be decoded using `decodeURI`.
         */
        isMalformed(url) {
            try {
                decodeURI(url);
                return false;
            }
            catch (error) {
                if (error instanceof URIError) {
                    return true;
                }
                throw error;
            }
        }
    }
    RenderMimeRegistry.UrlResolver = UrlResolver;
})(RenderMimeRegistry || (RenderMimeRegistry = {}));
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * Get the mime types in the map, ordered by rank.
     */
    function sortedTypes(map) {
        return Object.keys(map).sort((a, b) => {
            const p1 = map[a];
            const p2 = map[b];
            if (p1.rank !== p2.rank) {
                return p1.rank - p2.rank;
            }
            return p1.id - p2.id;
        });
    }
    Private.sortedTypes = sortedTypes;
    function sessionConnection(s) {
        return s.sessionChanged
            ? s.session
            : s;
    }
    Private.sessionConnection = sessionConnection;
})(Private || (Private = {}));
//# sourceMappingURL=registry.js.map

/***/ }),

/***/ "../../packages/rendermime/lib/renderers.js":
/*!**************************************************!*\
  !*** ../../packages/rendermime/lib/renderers.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderHTML": () => (/* binding */ renderHTML),
/* harmony export */   "renderImage": () => (/* binding */ renderImage),
/* harmony export */   "renderLatex": () => (/* binding */ renderLatex),
/* harmony export */   "renderMarkdown": () => (/* binding */ renderMarkdown),
/* harmony export */   "renderSVG": () => (/* binding */ renderSVG),
/* harmony export */   "renderText": () => (/* binding */ renderText)
/* harmony export */ });
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/codemirror */ "webpack/sharing/consume/default/@jupyterlab/codemirror/@jupyterlab/codemirror");
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_escape__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash.escape */ "../../node_modules/lodash.escape/index.js");
/* harmony import */ var lodash_escape__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_escape__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! marked */ "../../packages/rendermime/node_modules/marked/lib/marked.esm.js");
/* harmony import */ var _latex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./latex */ "../../packages/rendermime/lib/latex.js");
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







/**
 * Render HTML into a host node.
 *
 * @params options - The options for rendering.
 *
 * @returns A promise which resolves when rendering is complete.
 */
function renderHTML(options) {
    // Unpack the options.
    let { host, source, trusted, sanitizer, resolver, linkHandler, shouldTypeset, latexTypesetter, translator } = options;
    translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
    const trans = translator === null || translator === void 0 ? void 0 : translator.load('jupyterlab');
    let originalSource = source;
    // Bail early if the source is empty.
    if (!source) {
        host.textContent = '';
        return Promise.resolve(undefined);
    }
    // Sanitize the source if it is not trusted. This removes all
    // `<script>` tags as well as other potentially harmful HTML.
    if (!trusted) {
        originalSource = `${source}`;
        source = sanitizer.sanitize(source);
    }
    // Set the inner HTML of the host.
    host.innerHTML = source;
    if (host.getElementsByTagName('script').length > 0) {
        // If output it trusted, eval any script tags contained in the HTML.
        // This is not done automatically by the browser when script tags are
        // created by setting `innerHTML`.
        if (trusted) {
            Private.evalInnerHTMLScriptTags(host);
        }
        else {
            const container = document.createElement('div');
            const warning = document.createElement('pre');
            warning.textContent = trans.__('This HTML output contains inline scripts. Are you sure that you want to run arbitrary Javascript within your JupyterLab session?');
            const runButton = document.createElement('button');
            runButton.textContent = trans.__('Run');
            runButton.onclick = event => {
                host.innerHTML = originalSource;
                Private.evalInnerHTMLScriptTags(host);
                if (host.firstChild) {
                    host.removeChild(host.firstChild);
                }
            };
            container.appendChild(warning);
            container.appendChild(runButton);
            host.insertBefore(container, host.firstChild);
        }
    }
    // Handle default behavior of nodes.
    Private.handleDefaults(host, resolver);
    // Patch the urls if a resolver is available.
    let promise;
    if (resolver) {
        promise = Private.handleUrls(host, resolver, linkHandler);
    }
    else {
        promise = Promise.resolve(undefined);
    }
    // Return the final rendered promise.
    return promise.then(() => {
        if (shouldTypeset && latexTypesetter) {
            latexTypesetter.typeset(host);
        }
    });
}
/**
 * Render an image into a host node.
 *
 * @params options - The options for rendering.
 *
 * @returns A promise which resolves when rendering is complete.
 */
function renderImage(options) {
    // Unpack the options.
    const { host, mimeType, source, width, height, needsBackground, unconfined } = options;
    // Clear the content in the host.
    host.textContent = '';
    // Create the image element.
    const img = document.createElement('img');
    // Set the source of the image.
    img.src = `data:${mimeType};base64,${source}`;
    // Set the size of the image if provided.
    if (typeof height === 'number') {
        img.height = height;
    }
    if (typeof width === 'number') {
        img.width = width;
    }
    if (needsBackground === 'light') {
        img.classList.add('jp-needs-light-background');
    }
    else if (needsBackground === 'dark') {
        img.classList.add('jp-needs-dark-background');
    }
    if (unconfined === true) {
        img.classList.add('jp-mod-unconfined');
    }
    // Add the image to the host.
    host.appendChild(img);
    // Return the rendered promise.
    return Promise.resolve(undefined);
}
/**
 * Render LaTeX into a host node.
 *
 * @params options - The options for rendering.
 *
 * @returns A promise which resolves when rendering is complete.
 */
function renderLatex(options) {
    // Unpack the options.
    const { host, source, shouldTypeset, latexTypesetter } = options;
    // Set the source on the node.
    host.textContent = source;
    // Typeset the node if needed.
    if (shouldTypeset && latexTypesetter) {
        latexTypesetter.typeset(host);
    }
    // Return the rendered promise.
    return Promise.resolve(undefined);
}
/**
 * Render Markdown into a host node.
 *
 * @params options - The options for rendering.
 *
 * @returns A promise which resolves when rendering is complete.
 */
async function renderMarkdown(options) {
    // Unpack the options.
    const { host, source } = options, others = __rest(options, ["host", "source"]);
    // Clear the content if there is no source.
    if (!source) {
        host.textContent = '';
        return;
    }
    // Separate math from normal markdown text.
    const parts = (0,_latex__WEBPACK_IMPORTED_MODULE_6__.removeMath)(source);
    // Convert the markdown to HTML.
    let html = await Private.renderMarked(parts['text']);
    // Replace math.
    html = (0,_latex__WEBPACK_IMPORTED_MODULE_6__.replaceMath)(html, parts['math']);
    // Render HTML.
    await renderHTML(Object.assign({ host, source: html }, others));
    // Apply ids to the header nodes.
    Private.headerAnchors(host);
}
/**
 * Render SVG into a host node.
 *
 * @params options - The options for rendering.
 *
 * @returns A promise which resolves when rendering is complete.
 */
function renderSVG(options) {
    // Unpack the options.
    let { host, source, trusted, unconfined } = options;
    // Clear the content if there is no source.
    if (!source) {
        host.textContent = '';
        return Promise.resolve(undefined);
    }
    // Display a message if the source is not trusted.
    if (!trusted) {
        host.textContent =
            'Cannot display an untrusted SVG. Maybe you need to run the cell?';
        return Promise.resolve(undefined);
    }
    // Add missing SVG namespace (if actually missing)
    const patt = '<svg[^>]+xmlns=[^>]+svg';
    if (source.search(patt) < 0) {
        source = source.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    // Render in img so that user can save it easily
    const img = new Image();
    img.src = `data:image/svg+xml,${encodeURIComponent(source)}`;
    host.appendChild(img);
    if (unconfined === true) {
        host.classList.add('jp-mod-unconfined');
    }
    return Promise.resolve();
}
/**
 * Replace URLs with links.
 *
 * @param content - The text content of a node.
 *
 * @returns A list of text nodes and anchor elements.
 */
function autolink(content) {
    // Taken from Visual Studio Code:
    // https://github.com/microsoft/vscode/blob/9f709d170b06e991502153f281ec3c012add2e42/src/vs/workbench/contrib/debug/browser/linkDetector.ts#L17-L18
    const controlCodes = '\\u0000-\\u0020\\u007f-\\u009f';
    const webLinkRegex = new RegExp('(?:[a-zA-Z][a-zA-Z0-9+.-]{2,}:\\/\\/|data:|www\\.)[^\\s' +
        controlCodes +
        '"]{2,}[^\\s' +
        controlCodes +
        '"\'(){}\\[\\],:;.!?]', 'ug');
    const nodes = [];
    let lastIndex = 0;
    let match;
    while (null != (match = webLinkRegex.exec(content))) {
        if (match.index !== lastIndex) {
            nodes.push(document.createTextNode(content.slice(lastIndex, match.index)));
        }
        let url = match[0];
        // Special case when the URL ends with ">" or "<"
        const lastChars = url.slice(-1);
        const endsWithGtLt = ['>', '<'].indexOf(lastChars) !== -1;
        const len = endsWithGtLt ? url.length - 1 : url.length;
        const anchor = document.createElement('a');
        url = url.slice(0, len);
        anchor.href = url.startsWith('www.') ? 'https://' + url : url;
        anchor.rel = 'noopener';
        anchor.target = '_blank';
        anchor.appendChild(document.createTextNode(url.slice(0, len)));
        nodes.push(anchor);
        lastIndex = match.index + len;
    }
    if (lastIndex !== content.length) {
        nodes.push(document.createTextNode(content.slice(lastIndex, content.length)));
    }
    return nodes;
}
/**
 * Split a shallow node (node without nested nodes inside) at a given text content position.
 *
 * @param node the shallow node to be split
 * @param at the position in textContent at which the split should occur
 */
function splitShallowNode(node, at) {
    var _a, _b;
    const pre = node.cloneNode();
    pre.textContent = (_a = node.textContent) === null || _a === void 0 ? void 0 : _a.substr(0, at);
    const post = node.cloneNode();
    post.textContent = (_b = node.textContent) === null || _b === void 0 ? void 0 : _b.substr(at);
    return {
        pre: pre,
        post: post
    };
}
/**
 * Render text into a host node.
 *
 * @params options - The options for rendering.
 *
 * @returns A promise which resolves when rendering is complete.
 */
function renderText(options) {
    var _a, _b;
    // Unpack the options.
    const { host, sanitizer, source } = options;
    // Create the HTML content.
    const content = sanitizer.sanitize(Private.ansiSpan(source), {
        allowedTags: ['span']
    });
    // Set the sanitized content for the host node.
    const pre = document.createElement('pre');
    pre.innerHTML = content;
    const preTextContent = pre.textContent;
    if (preTextContent) {
        // Note: only text nodes and span elements should be present after sanitization in the `<pre>` element.
        const linkedNodes = autolink(preTextContent);
        let inAnchorElement = false;
        const combinedNodes = [];
        const preNodes = Array.from(pre.childNodes);
        while (preNodes.length && linkedNodes.length) {
            // Use non-null assertions to workaround TypeScript context awareness limitation
            // (if any of the arrays were empty, we would not enter the body of the loop).
            let preNode = preNodes.shift();
            let linkNode = linkedNodes.shift();
            // This should never happen because we modify the arrays in flight so they should end simultaneously,
            // but this makes the coding assistance happy and might make it easier to conceptualize.
            if (typeof preNode === 'undefined') {
                combinedNodes.push(linkNode);
                break;
            }
            if (typeof linkNode === 'undefined') {
                combinedNodes.push(preNode);
                break;
            }
            let preLen = (_a = preNode.textContent) === null || _a === void 0 ? void 0 : _a.length;
            let linkLen = (_b = linkNode.textContent) === null || _b === void 0 ? void 0 : _b.length;
            if (preLen && linkLen) {
                if (preLen > linkLen) {
                    // Split pre node and only keep the shorter part
                    let { pre: keep, post: postpone } = splitShallowNode(preNode, linkLen);
                    preNodes.unshift(postpone);
                    preNode = keep;
                }
                else if (linkLen > preLen) {
                    let { pre: keep, post: postpone } = splitShallowNode(linkNode, preLen);
                    linkedNodes.unshift(postpone);
                    linkNode = keep;
                }
            }
            const lastCombined = combinedNodes[combinedNodes.length - 1];
            // If we are already in an anchor element and the anchor element did not change,
            // we should insert the node from <pre> which is either Text node or coloured span Element
            // into the anchor content as a child
            if (inAnchorElement &&
                linkNode.href ===
                    lastCombined.href) {
                lastCombined.appendChild(preNode);
            }
            else {
                // the `linkNode` is either Text or AnchorElement;
                const isAnchor = linkNode.nodeType !== Node.TEXT_NODE;
                // if we are NOT about to start an anchor element, just add the pre Node
                if (!isAnchor) {
                    combinedNodes.push(preNode);
                    inAnchorElement = false;
                }
                else {
                    // otherwise start a new anchor; the contents of the `linkNode` and `preNode` should be the same,
                    // so we just put the neatly formatted `preNode` inside the anchor node (`linkNode`)
                    // and append that to combined nodes.
                    linkNode.textContent = '';
                    linkNode.appendChild(preNode);
                    combinedNodes.push(linkNode);
                    inAnchorElement = true;
                }
            }
        }
        // TODO: replace with `.replaceChildren()` once the target ES version allows it
        pre.innerHTML = '';
        for (const child of combinedNodes) {
            pre.appendChild(child);
        }
    }
    host.appendChild(pre);
    // Return the rendered promise.
    return Promise.resolve(undefined);
}
/**
 * The namespace for module implementation details.
 */
var Private;
(function (Private) {
    /**
     * Eval the script tags contained in a host populated by `innerHTML`.
     *
     * When script tags are created via `innerHTML`, the browser does not
     * evaluate them when they are added to the page. This function works
     * around that by creating new equivalent script nodes manually, and
     * replacing the originals.
     */
    function evalInnerHTMLScriptTags(host) {
        // Create a snapshot of the current script nodes.
        const scripts = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.toArray)(host.getElementsByTagName('script'));
        // Loop over each script node.
        for (const script of scripts) {
            // Skip any scripts which no longer have a parent.
            if (!script.parentNode) {
                continue;
            }
            // Create a new script node which will be clone.
            const clone = document.createElement('script');
            // Copy the attributes into the clone.
            const attrs = script.attributes;
            for (let i = 0, n = attrs.length; i < n; ++i) {
                const { name, value } = attrs[i];
                clone.setAttribute(name, value);
            }
            // Copy the text content into the clone.
            clone.textContent = script.textContent;
            // Replace the old script in the parent.
            script.parentNode.replaceChild(clone, script);
        }
    }
    Private.evalInnerHTMLScriptTags = evalInnerHTMLScriptTags;
    /**
     * Render markdown for the specified content.
     *
     * @param content - The string of markdown to render.
     *
     * @return A promise which resolves with the rendered content.
     */
    function renderMarked(content) {
        initializeMarked();
        return new Promise((resolve, reject) => {
            (0,marked__WEBPACK_IMPORTED_MODULE_5__.marked)(content, (err, content) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(content);
                }
            });
        });
    }
    Private.renderMarked = renderMarked;
    /**
     * Handle the default behavior of nodes.
     */
    function handleDefaults(node, resolver) {
        // Handle anchor elements.
        const anchors = node.getElementsByTagName('a');
        for (let i = 0; i < anchors.length; i++) {
            const el = anchors[i];
            // skip when processing a elements inside svg
            // which are of type SVGAnimatedString
            if (!(el instanceof HTMLAnchorElement)) {
                continue;
            }
            const path = el.href;
            const isLocal = resolver && resolver.isLocal
                ? resolver.isLocal(path)
                : _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.URLExt.isLocal(path);
            // set target attribute if not already present
            if (!el.target) {
                el.target = isLocal ? '_self' : '_blank';
            }
            // set rel as 'noopener' for non-local anchors
            if (!isLocal) {
                el.rel = 'noopener';
            }
        }
        // Handle image elements.
        const imgs = node.getElementsByTagName('img');
        for (let i = 0; i < imgs.length; i++) {
            if (!imgs[i].alt) {
                imgs[i].alt = 'Image';
            }
        }
    }
    Private.handleDefaults = handleDefaults;
    /**
     * Resolve the relative urls in element `src` and `href` attributes.
     *
     * @param node - The head html element.
     *
     * @param resolver - A url resolver.
     *
     * @param linkHandler - An optional link handler for nodes.
     *
     * @returns a promise fulfilled when the relative urls have been resolved.
     */
    function handleUrls(node, resolver, linkHandler) {
        // Set up an array to collect promises.
        const promises = [];
        // Handle HTML Elements with src attributes.
        const nodes = node.querySelectorAll('*[src]');
        for (let i = 0; i < nodes.length; i++) {
            promises.push(handleAttr(nodes[i], 'src', resolver));
        }
        // Handle anchor elements.
        const anchors = node.getElementsByTagName('a');
        for (let i = 0; i < anchors.length; i++) {
            promises.push(handleAnchor(anchors[i], resolver, linkHandler));
        }
        // Handle link elements.
        const links = node.getElementsByTagName('link');
        for (let i = 0; i < links.length; i++) {
            promises.push(handleAttr(links[i], 'href', resolver));
        }
        // Wait on all promises.
        return Promise.all(promises).then(() => undefined);
    }
    Private.handleUrls = handleUrls;
    /**
     * Apply ids to headers.
     */
    function headerAnchors(node) {
        var _a;
        const headerNames = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        for (const headerType of headerNames) {
            const headers = node.getElementsByTagName(headerType);
            for (let i = 0; i < headers.length; i++) {
                const header = headers[i];
                header.id = ((_a = header.textContent) !== null && _a !== void 0 ? _a : '').replace(/ /g, '-');
                const anchor = document.createElement('a');
                anchor.target = '_self';
                anchor.textContent = '¶';
                anchor.href = '#' + header.id;
                anchor.classList.add('jp-InternalAnchorLink');
                header.appendChild(anchor);
            }
        }
    }
    Private.headerAnchors = headerAnchors;
    /**
     * Handle a node with a `src` or `href` attribute.
     */
    async function handleAttr(node, name, resolver) {
        const source = node.getAttribute(name) || '';
        const isLocal = resolver.isLocal
            ? resolver.isLocal(source)
            : _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.URLExt.isLocal(source);
        if (!source || !isLocal) {
            return;
        }
        try {
            const urlPath = await resolver.resolveUrl(source);
            let url = await resolver.getDownloadUrl(urlPath);
            if (_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.URLExt.parse(url).protocol !== 'data:') {
                // Bust caching for local src attrs.
                // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
                url += (/\?/.test(url) ? '&' : '?') + new Date().getTime();
            }
            node.setAttribute(name, url);
        }
        catch (err) {
            // If there was an error getting the url,
            // just make it an empty link and report the error.
            node.setAttribute(name, '');
            throw err;
        }
    }
    /**
     * Handle an anchor node.
     */
    function handleAnchor(anchor, resolver, linkHandler) {
        // Get the link path without the location prepended.
        // (e.g. "./foo.md#Header 1" vs "http://localhost:8888/foo.md#Header 1")
        let href = anchor.getAttribute('href') || '';
        const isLocal = resolver.isLocal
            ? resolver.isLocal(href)
            : _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.URLExt.isLocal(href);
        // Bail if it is not a file-like url.
        if (!href || !isLocal) {
            return Promise.resolve(undefined);
        }
        // Remove the hash until we can handle it.
        const hash = anchor.hash;
        if (hash) {
            // Handle internal link in the file.
            if (hash === href) {
                anchor.target = '_self';
                return Promise.resolve(undefined);
            }
            // For external links, remove the hash until we have hash handling.
            href = href.replace(hash, '');
        }
        // Get the appropriate file path.
        return resolver
            .resolveUrl(href)
            .then(urlPath => {
            // decode encoded url from url to api path
            const path = decodeURIComponent(urlPath);
            // Handle the click override.
            if (linkHandler) {
                linkHandler.handleLink(anchor, path, hash);
            }
            // Get the appropriate file download path.
            return resolver.getDownloadUrl(urlPath);
        })
            .then(url => {
            // Set the visible anchor.
            anchor.href = url + hash;
        })
            .catch(err => {
            // If there was an error getting the url,
            // just make it an empty link.
            anchor.href = '';
        });
    }
    let markedInitialized = false;
    /**
     * Support GitHub flavored Markdown, leave sanitizing to external library.
     */
    function initializeMarked() {
        if (markedInitialized) {
            return;
        }
        markedInitialized = true;
        marked__WEBPACK_IMPORTED_MODULE_5__.marked.setOptions({
            gfm: true,
            sanitize: false,
            // breaks: true; We can't use GFM breaks as it causes problems with tables
            langPrefix: `cm-s-${_jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_0__.CodeMirrorEditor.defaultConfig.theme} language-`,
            highlight: (code, lang, callback) => {
                const cb = (err, code) => {
                    if (callback) {
                        callback(err, code);
                    }
                    return code;
                };
                if (!lang) {
                    // no language, no highlight
                    return cb(null, code);
                }
                _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_0__.Mode.ensure(lang)
                    .then(spec => {
                    const el = document.createElement('div');
                    if (!spec) {
                        console.error(`No CodeMirror mode: ${lang}`);
                        return cb(null, code);
                    }
                    try {
                        _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_0__.Mode.run(code, spec.mime, el);
                        return cb(null, el.innerHTML);
                    }
                    catch (err) {
                        console.error(`Failed to highlight ${lang} code`, err);
                        return cb(err, code);
                    }
                })
                    .catch(err => {
                    console.error(`No CodeMirror mode: ${lang}`);
                    console.error(`Require CodeMirror mode error: ${err}`);
                    return cb(null, code);
                });
                return code;
            }
        });
    }
    const ANSI_COLORS = [
        'ansi-black',
        'ansi-red',
        'ansi-green',
        'ansi-yellow',
        'ansi-blue',
        'ansi-magenta',
        'ansi-cyan',
        'ansi-white',
        'ansi-black-intense',
        'ansi-red-intense',
        'ansi-green-intense',
        'ansi-yellow-intense',
        'ansi-blue-intense',
        'ansi-magenta-intense',
        'ansi-cyan-intense',
        'ansi-white-intense'
    ];
    /**
     * Create HTML tags for a string with given foreground, background etc. and
     * add them to the `out` array.
     */
    function pushColoredChunk(chunk, fg, bg, bold, underline, inverse, out) {
        if (chunk) {
            const classes = [];
            const styles = [];
            if (bold && typeof fg === 'number' && 0 <= fg && fg < 8) {
                fg += 8; // Bold text uses "intense" colors
            }
            if (inverse) {
                [fg, bg] = [bg, fg];
            }
            if (typeof fg === 'number') {
                classes.push(ANSI_COLORS[fg] + '-fg');
            }
            else if (fg.length) {
                styles.push(`color: rgb(${fg})`);
            }
            else if (inverse) {
                classes.push('ansi-default-inverse-fg');
            }
            if (typeof bg === 'number') {
                classes.push(ANSI_COLORS[bg] + '-bg');
            }
            else if (bg.length) {
                styles.push(`background-color: rgb(${bg})`);
            }
            else if (inverse) {
                classes.push('ansi-default-inverse-bg');
            }
            if (bold) {
                classes.push('ansi-bold');
            }
            if (underline) {
                classes.push('ansi-underline');
            }
            if (classes.length || styles.length) {
                out.push('<span');
                if (classes.length) {
                    out.push(` class="${classes.join(' ')}"`);
                }
                if (styles.length) {
                    out.push(` style="${styles.join('; ')}"`);
                }
                out.push('>');
                out.push(chunk);
                out.push('</span>');
            }
            else {
                out.push(chunk);
            }
        }
    }
    /**
     * Convert ANSI extended colors to R/G/B triple.
     */
    function getExtendedColors(numbers) {
        let r;
        let g;
        let b;
        const n = numbers.shift();
        if (n === 2 && numbers.length >= 3) {
            // 24-bit RGB
            r = numbers.shift();
            g = numbers.shift();
            b = numbers.shift();
            if ([r, g, b].some(c => c < 0 || 255 < c)) {
                throw new RangeError('Invalid range for RGB colors');
            }
        }
        else if (n === 5 && numbers.length >= 1) {
            // 256 colors
            const idx = numbers.shift();
            if (idx < 0) {
                throw new RangeError('Color index must be >= 0');
            }
            else if (idx < 16) {
                // 16 default terminal colors
                return idx;
            }
            else if (idx < 232) {
                // 6x6x6 color cube, see https://stackoverflow.com/a/27165165/500098
                r = Math.floor((idx - 16) / 36);
                r = r > 0 ? 55 + r * 40 : 0;
                g = Math.floor(((idx - 16) % 36) / 6);
                g = g > 0 ? 55 + g * 40 : 0;
                b = (idx - 16) % 6;
                b = b > 0 ? 55 + b * 40 : 0;
            }
            else if (idx < 256) {
                // grayscale, see https://stackoverflow.com/a/27165165/500098
                r = g = b = (idx - 232) * 10 + 8;
            }
            else {
                throw new RangeError('Color index must be < 256');
            }
        }
        else {
            throw new RangeError('Invalid extended color specification');
        }
        return [r, g, b];
    }
    /**
     * Transform ANSI color escape codes into HTML <span> tags with CSS
     * classes such as "ansi-green-intense-fg".
     * The actual colors used are set in the CSS file.
     * This also removes non-color escape sequences.
     * This is supposed to have the same behavior as nbconvert.filters.ansi2html()
     */
    function ansiSpan(str) {
        const ansiRe = /\x1b\[(.*?)([@-~])/g; // eslint-disable-line no-control-regex
        let fg = [];
        let bg = [];
        let bold = false;
        let underline = false;
        let inverse = false;
        let match;
        const out = [];
        const numbers = [];
        let start = 0;
        str = lodash_escape__WEBPACK_IMPORTED_MODULE_4___default()(str);
        str += '\x1b[m'; // Ensure markup for trailing text
        // tslint:disable-next-line
        while ((match = ansiRe.exec(str))) {
            if (match[2] === 'm') {
                const items = match[1].split(';');
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    if (item === '') {
                        numbers.push(0);
                    }
                    else if (item.search(/^\d+$/) !== -1) {
                        numbers.push(parseInt(item, 10));
                    }
                    else {
                        // Ignored: Invalid color specification
                        numbers.length = 0;
                        break;
                    }
                }
            }
            else {
                // Ignored: Not a color code
            }
            const chunk = str.substring(start, match.index);
            pushColoredChunk(chunk, fg, bg, bold, underline, inverse, out);
            start = ansiRe.lastIndex;
            while (numbers.length) {
                const n = numbers.shift();
                switch (n) {
                    case 0:
                        fg = bg = [];
                        bold = false;
                        underline = false;
                        inverse = false;
                        break;
                    case 1:
                    case 5:
                        bold = true;
                        break;
                    case 4:
                        underline = true;
                        break;
                    case 7:
                        inverse = true;
                        break;
                    case 21:
                    case 22:
                        bold = false;
                        break;
                    case 24:
                        underline = false;
                        break;
                    case 27:
                        inverse = false;
                        break;
                    case 30:
                    case 31:
                    case 32:
                    case 33:
                    case 34:
                    case 35:
                    case 36:
                    case 37:
                        fg = n - 30;
                        break;
                    case 38:
                        try {
                            fg = getExtendedColors(numbers);
                        }
                        catch (e) {
                            numbers.length = 0;
                        }
                        break;
                    case 39:
                        fg = [];
                        break;
                    case 40:
                    case 41:
                    case 42:
                    case 43:
                    case 44:
                    case 45:
                    case 46:
                    case 47:
                        bg = n - 40;
                        break;
                    case 48:
                        try {
                            bg = getExtendedColors(numbers);
                        }
                        catch (e) {
                            numbers.length = 0;
                        }
                        break;
                    case 49:
                        bg = [];
                        break;
                    case 90:
                    case 91:
                    case 92:
                    case 93:
                    case 94:
                    case 95:
                    case 96:
                    case 97:
                        fg = n - 90 + 8;
                        break;
                    case 100:
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106:
                    case 107:
                        bg = n - 100 + 8;
                        break;
                    default:
                    // Unknown codes are ignored
                }
            }
        }
        return out.join('');
    }
    Private.ansiSpan = ansiSpan;
})(Private || (Private = {}));
//# sourceMappingURL=renderers.js.map

/***/ }),

/***/ "../../packages/rendermime/lib/tokens.js":
/*!***********************************************!*\
  !*** ../../packages/rendermime/lib/tokens.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IRenderMimeRegistry": () => (/* binding */ IRenderMimeRegistry),
/* harmony export */   "ILatexTypesetter": () => (/* binding */ ILatexTypesetter)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/

/* tslint:disable */
/**
 * The rendermime token.
 */
const IRenderMimeRegistry = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/rendermime:IRenderMimeRegistry');
/* tslint:enable */
/* tslint:disable */
/**
 * The latex typesetter token.
 */
const ILatexTypesetter = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/rendermime:ILatexTypesetter');
/* tslint:enable */
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/rendermime/lib/widgets.js":
/*!************************************************!*\
  !*** ../../packages/rendermime/lib/widgets.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderedCommon": () => (/* binding */ RenderedCommon),
/* harmony export */   "RenderedHTMLCommon": () => (/* binding */ RenderedHTMLCommon),
/* harmony export */   "RenderedHTML": () => (/* binding */ RenderedHTML),
/* harmony export */   "RenderedLatex": () => (/* binding */ RenderedLatex),
/* harmony export */   "RenderedImage": () => (/* binding */ RenderedImage),
/* harmony export */   "RenderedMarkdown": () => (/* binding */ RenderedMarkdown),
/* harmony export */   "RenderedSVG": () => (/* binding */ RenderedSVG),
/* harmony export */   "RenderedText": () => (/* binding */ RenderedText),
/* harmony export */   "RenderedJavaScript": () => (/* binding */ RenderedJavaScript)
/* harmony export */ });
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _renderers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderers */ "../../packages/rendermime/lib/renderers.js");



/**
 * A common base class for mime renderers.
 */
class RenderedCommon extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Widget {
    /**
     * Construct a new rendered common widget.
     *
     * @param options - The options for initializing the widget.
     */
    constructor(options) {
        super();
        this.mimeType = options.mimeType;
        this.sanitizer = options.sanitizer;
        this.resolver = options.resolver;
        this.linkHandler = options.linkHandler;
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator;
        this.latexTypesetter = options.latexTypesetter;
        this.node.dataset['mimeType'] = this.mimeType;
    }
    /**
     * Render a mime model.
     *
     * @param model - The mime model to render.
     *
     * @returns A promise which resolves when rendering is complete.
     *
     * #### Notes
     * If the DOM node for this widget already has content, it is emptied
     * before rendering. Subclasses that do not want this behavior
     * (if, for instance, they are using DOM diffing), should override
     * this method and not call `super.renderModel()`.
     */
    async renderModel(model) {
        // TODO compare model against old model for early bail?
        // Empty any existing content in the node from previous renders
        while (this.node.firstChild) {
            this.node.removeChild(this.node.firstChild);
        }
        // Toggle the trusted class on the widget.
        this.toggleClass('jp-mod-trusted', model.trusted);
        // Render the actual content.
        await this.render(model);
        // Handle the fragment identifier if given.
        const { fragment } = model.metadata;
        if (fragment) {
            this.setFragment(fragment);
        }
    }
    /**
     * Set the URI fragment identifier.
     *
     * @param fragment - The URI fragment identifier.
     */
    setFragment(fragment) {
        /* no-op */
    }
}
/**
 * A common base class for HTML mime renderers.
 */
class RenderedHTMLCommon extends RenderedCommon {
    /**
     * Construct a new rendered HTML common widget.
     *
     * @param options - The options for initializing the widget.
     */
    constructor(options) {
        super(options);
        this.addClass('jp-RenderedHTMLCommon');
    }
    setFragment(fragment) {
        let el;
        try {
            el = this.node.querySelector(fragment.startsWith('#')
                ? `#${CSS.escape(fragment.slice(1))}`
                : fragment);
        }
        catch (error) {
            console.warn('Unable to set URI fragment identifier.', error);
        }
        if (el) {
            el.scrollIntoView();
        }
    }
}
/**
 * A mime renderer for displaying HTML and math.
 */
class RenderedHTML extends RenderedHTMLCommon {
    /**
     * Construct a new rendered HTML widget.
     *
     * @param options - The options for initializing the widget.
     */
    constructor(options) {
        super(options);
        this.addClass('jp-RenderedHTML');
    }
    /**
     * Render a mime model.
     *
     * @param model - The mime model to render.
     *
     * @returns A promise which resolves when rendering is complete.
     */
    render(model) {
        return _renderers__WEBPACK_IMPORTED_MODULE_2__.renderHTML({
            host: this.node,
            source: String(model.data[this.mimeType]),
            trusted: model.trusted,
            resolver: this.resolver,
            sanitizer: this.sanitizer,
            linkHandler: this.linkHandler,
            shouldTypeset: this.isAttached,
            latexTypesetter: this.latexTypesetter,
            translator: this.translator
        });
    }
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    onAfterAttach(msg) {
        if (this.latexTypesetter) {
            this.latexTypesetter.typeset(this.node);
        }
    }
}
/**
 * A mime renderer for displaying LaTeX output.
 */
class RenderedLatex extends RenderedCommon {
    /**
     * Construct a new rendered LaTeX widget.
     *
     * @param options - The options for initializing the widget.
     */
    constructor(options) {
        super(options);
        this.addClass('jp-RenderedLatex');
    }
    /**
     * Render a mime model.
     *
     * @param model - The mime model to render.
     *
     * @returns A promise which resolves when rendering is complete.
     */
    render(model) {
        return _renderers__WEBPACK_IMPORTED_MODULE_2__.renderLatex({
            host: this.node,
            source: String(model.data[this.mimeType]),
            shouldTypeset: this.isAttached,
            latexTypesetter: this.latexTypesetter
        });
    }
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    onAfterAttach(msg) {
        if (this.latexTypesetter) {
            this.latexTypesetter.typeset(this.node);
        }
    }
}
/**
 * A mime renderer for displaying images.
 */
class RenderedImage extends RenderedCommon {
    /**
     * Construct a new rendered image widget.
     *
     * @param options - The options for initializing the widget.
     */
    constructor(options) {
        super(options);
        this.addClass('jp-RenderedImage');
    }
    /**
     * Render a mime model.
     *
     * @param model - The mime model to render.
     *
     * @returns A promise which resolves when rendering is complete.
     */
    render(model) {
        const metadata = model.metadata[this.mimeType];
        return _renderers__WEBPACK_IMPORTED_MODULE_2__.renderImage({
            host: this.node,
            mimeType: this.mimeType,
            source: String(model.data[this.mimeType]),
            width: metadata && metadata.width,
            height: metadata && metadata.height,
            needsBackground: model.metadata['needs_background'],
            unconfined: metadata && metadata.unconfined
        });
    }
}
/**
 * A mime renderer for displaying Markdown with embedded latex.
 */
class RenderedMarkdown extends RenderedHTMLCommon {
    /**
     * Construct a new rendered markdown widget.
     *
     * @param options - The options for initializing the widget.
     */
    constructor(options) {
        super(options);
        this.addClass('jp-RenderedMarkdown');
    }
    /**
     * Render a mime model.
     *
     * @param model - The mime model to render.
     *
     * @returns A promise which resolves when rendering is complete.
     */
    render(model) {
        return _renderers__WEBPACK_IMPORTED_MODULE_2__.renderMarkdown({
            host: this.node,
            source: String(model.data[this.mimeType]),
            trusted: model.trusted,
            resolver: this.resolver,
            sanitizer: this.sanitizer,
            linkHandler: this.linkHandler,
            shouldTypeset: this.isAttached,
            latexTypesetter: this.latexTypesetter,
            translator: this.translator
        });
    }
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    onAfterAttach(msg) {
        if (this.latexTypesetter) {
            this.latexTypesetter.typeset(this.node);
        }
    }
}
/**
 * A widget for displaying SVG content.
 */
class RenderedSVG extends RenderedCommon {
    /**
     * Construct a new rendered SVG widget.
     *
     * @param options - The options for initializing the widget.
     */
    constructor(options) {
        super(options);
        this.addClass('jp-RenderedSVG');
    }
    /**
     * Render a mime model.
     *
     * @param model - The mime model to render.
     *
     * @returns A promise which resolves when rendering is complete.
     */
    render(model) {
        const metadata = model.metadata[this.mimeType];
        return _renderers__WEBPACK_IMPORTED_MODULE_2__.renderSVG({
            host: this.node,
            source: String(model.data[this.mimeType]),
            trusted: model.trusted,
            unconfined: metadata && metadata.unconfined,
            translator: this.translator
        });
    }
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    onAfterAttach(msg) {
        if (this.latexTypesetter) {
            this.latexTypesetter.typeset(this.node);
        }
    }
}
/**
 * A widget for displaying plain text and console text.
 */
class RenderedText extends RenderedCommon {
    /**
     * Construct a new rendered text widget.
     *
     * @param options - The options for initializing the widget.
     */
    constructor(options) {
        super(options);
        this.addClass('jp-RenderedText');
    }
    /**
     * Render a mime model.
     *
     * @param model - The mime model to render.
     *
     * @returns A promise which resolves when rendering is complete.
     */
    render(model) {
        return _renderers__WEBPACK_IMPORTED_MODULE_2__.renderText({
            host: this.node,
            sanitizer: this.sanitizer,
            source: String(model.data[this.mimeType]),
            translator: this.translator
        });
    }
}
/**
 * A widget for displaying JavaScript output.
 */
class RenderedJavaScript extends RenderedCommon {
    /**
     * Construct a new rendered text widget.
     *
     * @param options - The options for initializing the widget.
     */
    constructor(options) {
        super(options);
        this.addClass('jp-RenderedJavaScript');
    }
    /**
     * Render a mime model.
     *
     * @param model - The mime model to render.
     *
     * @returns A promise which resolves when rendering is complete.
     */
    render(model) {
        const trans = this.translator.load('jupyterlab');
        return _renderers__WEBPACK_IMPORTED_MODULE_2__.renderText({
            host: this.node,
            sanitizer: this.sanitizer,
            source: trans.__('JavaScript output is disabled in JupyterLab'),
            translator: this.translator
        });
    }
}
//# sourceMappingURL=widgets.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvcmVuZGVybWltZS9saWIvYXR0YWNobWVudG1vZGVsLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9yZW5kZXJtaW1lL2xpYi9mYWN0b3JpZXMuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3JlbmRlcm1pbWUvbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9yZW5kZXJtaW1lL2xpYi9sYXRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvcmVuZGVybWltZS9saWIvbWltZW1vZGVsLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9yZW5kZXJtaW1lL2xpYi9vdXRwdXRtb2RlbC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvcmVuZGVybWltZS9saWIvcmVnaXN0cnkuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3JlbmRlcm1pbWUvbGliL3JlbmRlcmVycy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvcmVuZGVybWltZS9saWIvdG9rZW5zLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9yZW5kZXJtaW1lL2xpYi93aWRnZXRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxvREFBTTtBQUNwQix3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DLCtCQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMEJBQTBCO0FBQzNCLHFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuNEJBO0FBQ0E7QUFDQTtBQUNBO0FBQzBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ08sZ0NBQWdDLG9EQUFLO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyw2QkFBNkIsb0RBQUs7QUFDekM7QUFDQSxrQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCeUQ7QUFDaEI7QUFDQTtBQUN6QztBQUNBO0FBQ0E7QUFDTyw2QkFBNkIsbURBQU07QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxtRUFBYztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFdBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDhCQUE4QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsa0RBQW9CO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsbURBQXFCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1EQUFxQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxzREFBd0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlEQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxrREFBb0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxrREFBb0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLG1DIiwiZmlsZSI6InBhY2thZ2VzX3JlbmRlcm1pbWVfbGliX2luZGV4X2pzLjNhNjNhOWFlNjAwNjQ2NjU4YzRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBPYnNlcnZhYmxlSlNPTiB9IGZyb20gJ0BqdXB5dGVybGFiL29ic2VydmFibGVzJztcbmltcG9ydCB7IEpTT05FeHQgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG4vKipcbiAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGEgbm90ZWJvb2sgYXR0YWNobWVudCBtb2RlbC5cbiAqL1xuZXhwb3J0IGNsYXNzIEF0dGFjaG1lbnRNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IGF0dGFjaG1lbnQgbW9kZWwuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICAvLyBBbGwgYXR0YWNobWVudHMgYXJlIHVudHJ1c3RlZFxuICAgICAgICB0aGlzLnRydXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX3JhdyA9IHt9O1xuICAgICAgICBjb25zdCBkYXRhID0gUHJpdmF0ZS5nZXREYXRhKG9wdGlvbnMudmFsdWUpO1xuICAgICAgICB0aGlzLl9kYXRhID0gbmV3IE9ic2VydmFibGVKU09OKHsgdmFsdWVzOiBkYXRhIH0pO1xuICAgICAgICB0aGlzLl9yYXdEYXRhID0gZGF0YTtcbiAgICAgICAgLy8gTWFrZSBhIGNvcHkgb2YgdGhlIGRhdGEuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9ucy52YWx1ZTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIElnbm9yZSBkYXRhIGFuZCBtZXRhZGF0YSB0aGF0IHdlcmUgc3RyaXBwZWQuXG4gICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RhdGEnOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yYXdba2V5XSA9IFByaXZhdGUuZXh0cmFjdCh2YWx1ZSwga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIGF0dGFjaG1lbnQgbW9kZWwgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBnZXQgY2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBhdHRhY2htZW50IG1vZGVsLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuX2RhdGEuZGlzcG9zZSgpO1xuICAgICAgICBTaWduYWwuY2xlYXJEYXRhKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhlIG1vZGVsLlxuICAgICAqL1xuICAgIGdldCBkYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmF3RGF0YTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG1ldGFkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGUgbW9kZWwuXG4gICAgICovXG4gICAgZ2V0IG1ldGFkYXRhKCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhlIG1vZGVsLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIERlcGVuZGluZyBvbiB0aGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIG1pbWUgbW9kZWwsXG4gICAgICogdGhpcyBjYWxsIG1heSBvciBtYXkgbm90IGhhdmUgZGVmZXJyZWQgZWZmZWN0cyxcbiAgICAgKi9cbiAgICBzZXREYXRhKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlT2JzZXJ2YWJsZSh0aGlzLl9kYXRhLCBvcHRpb25zLmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5fcmF3RGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VyaWFsaXplIHRoZSBtb2RlbCB0byBKU09OLlxuICAgICAqL1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3QgYXR0YWNobWVudCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9yYXcpIHtcbiAgICAgICAgICAgIGF0dGFjaG1lbnRba2V5XSA9IFByaXZhdGUuZXh0cmFjdCh0aGlzLl9yYXcsIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0dGFjaG1lbnQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhbiBvYnNlcnZhYmxlIEpTT04gb2JqZWN0IHVzaW5nIGEgcmVhZG9ubHkgSlNPTiBvYmplY3QuXG4gICAgICovXG4gICAgX3VwZGF0ZU9ic2VydmFibGUob2JzZXJ2YWJsZSwgZGF0YSkge1xuICAgICAgICBjb25zdCBvbGRLZXlzID0gb2JzZXJ2YWJsZS5rZXlzKCk7XG4gICAgICAgIGNvbnN0IG5ld0tleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgICAgICAgLy8gSGFuZGxlIHJlbW92ZWQga2V5cy5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2Ygb2xkS2V5cykge1xuICAgICAgICAgICAgaWYgKG5ld0tleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIG9ic2VydmFibGUuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIGNoYW5nZWQgZGF0YS5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgbmV3S2V5cykge1xuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBvYnNlcnZhYmxlLmdldChrZXkpO1xuICAgICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBkYXRhW2tleV07XG4gICAgICAgICAgICBpZiAob2xkVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5zZXQoa2V5LCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIFRoZSBuYW1lc3BhY2UgZm9yIEF0dGFjaG1lbnRNb2RlbCBzdGF0aWNzLlxuICovXG4oZnVuY3Rpb24gKEF0dGFjaG1lbnRNb2RlbCkge1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZGF0YSBmb3IgYW4gYXR0YWNobWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbXMgYnVuZGxlIC0gQSBrZXJuZWwgYXR0YWNobWVudCBNSU1FIGJ1bmRsZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0gVGhlIGRhdGEgZm9yIHRoZSBwYXlsb2FkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldERhdGEoYnVuZGxlKSB7XG4gICAgICAgIHJldHVybiBQcml2YXRlLmdldERhdGEoYnVuZGxlKTtcbiAgICB9XG4gICAgQXR0YWNobWVudE1vZGVsLmdldERhdGEgPSBnZXREYXRhO1xufSkoQXR0YWNobWVudE1vZGVsIHx8IChBdHRhY2htZW50TW9kZWwgPSB7fSkpO1xuLyoqXG4gKiBUaGUgbmFtZXNwYWNlIGZvciBtb2R1bGUgcHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZGF0YSBmcm9tIGEgbm90ZWJvb2sgYXR0YWNobWVudC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXREYXRhKGJ1bmRsZSkge1xuICAgICAgICByZXR1cm4gY29udmVydEJ1bmRsZShidW5kbGUpO1xuICAgIH1cbiAgICBQcml2YXRlLmdldERhdGEgPSBnZXREYXRhO1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYnVuZGxlIG9wdGlvbnMgZ2l2ZW4gYXR0YWNobWVudCBtb2RlbCBvcHRpb25zLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldEJ1bmRsZU9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBjb25zdCBkYXRhID0gZ2V0RGF0YShvcHRpb25zLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHsgZGF0YSB9O1xuICAgIH1cbiAgICBQcml2YXRlLmdldEJ1bmRsZU9wdGlvbnMgPSBnZXRCdW5kbGVPcHRpb25zO1xuICAgIC8qKlxuICAgICAqIEV4dHJhY3QgYSB2YWx1ZSBmcm9tIGEgSlNPTk9iamVjdC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBleHRyYWN0KHZhbHVlLCBrZXkpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHZhbHVlW2tleV07XG4gICAgICAgIGlmIChpdGVtID09PSB1bmRlZmluZWQgfHwgSlNPTkV4dC5pc1ByaW1pdGl2ZShpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEpTT05FeHQuZGVlcENvcHkoaXRlbSk7XG4gICAgfVxuICAgIFByaXZhdGUuZXh0cmFjdCA9IGV4dHJhY3Q7XG4gICAgLyoqXG4gICAgICogQ29udmVydCBhIG1pbWUgYnVuZGxlIHRvIG1pbWUgZGF0YS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb252ZXJ0QnVuZGxlKGJ1bmRsZSkge1xuICAgICAgICBjb25zdCBtYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBmb3IgKGNvbnN0IG1pbWVUeXBlIGluIGJ1bmRsZSkge1xuICAgICAgICAgICAgbWFwW21pbWVUeXBlXSA9IGV4dHJhY3QoYnVuZGxlLCBtaW1lVHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF0dGFjaG1lbnRtb2RlbC5qcy5tYXAiLCJpbXBvcnQgKiBhcyB3aWRnZXRzIGZyb20gJy4vd2lkZ2V0cyc7XG4vKipcbiAqIEEgbWltZSByZW5kZXJlciBmYWN0b3J5IGZvciByYXcgaHRtbC5cbiAqL1xuZXhwb3J0IGNvbnN0IGh0bWxSZW5kZXJlckZhY3RvcnkgPSB7XG4gICAgc2FmZTogdHJ1ZSxcbiAgICBtaW1lVHlwZXM6IFsndGV4dC9odG1sJ10sXG4gICAgZGVmYXVsdFJhbms6IDUwLFxuICAgIGNyZWF0ZVJlbmRlcmVyOiBvcHRpb25zID0+IG5ldyB3aWRnZXRzLlJlbmRlcmVkSFRNTChvcHRpb25zKVxufTtcbi8qKlxuICogQSBtaW1lIHJlbmRlcmVyIGZhY3RvcnkgZm9yIGltYWdlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGltYWdlUmVuZGVyZXJGYWN0b3J5ID0ge1xuICAgIHNhZmU6IHRydWUsXG4gICAgbWltZVR5cGVzOiBbJ2ltYWdlL2JtcCcsICdpbWFnZS9wbmcnLCAnaW1hZ2UvanBlZycsICdpbWFnZS9naWYnXSxcbiAgICBkZWZhdWx0UmFuazogOTAsXG4gICAgY3JlYXRlUmVuZGVyZXI6IG9wdGlvbnMgPT4gbmV3IHdpZGdldHMuUmVuZGVyZWRJbWFnZShvcHRpb25zKVxufTtcbi8qKlxuICogQSBtaW1lIHJlbmRlcmVyIGZhY3RvcnkgZm9yIExhVGVYLlxuICovXG5leHBvcnQgY29uc3QgbGF0ZXhSZW5kZXJlckZhY3RvcnkgPSB7XG4gICAgc2FmZTogdHJ1ZSxcbiAgICBtaW1lVHlwZXM6IFsndGV4dC9sYXRleCddLFxuICAgIGRlZmF1bHRSYW5rOiA3MCxcbiAgICBjcmVhdGVSZW5kZXJlcjogb3B0aW9ucyA9PiBuZXcgd2lkZ2V0cy5SZW5kZXJlZExhdGV4KG9wdGlvbnMpXG59O1xuLyoqXG4gKiBBIG1pbWUgcmVuZGVyZXIgZmFjdG9yeSBmb3IgTWFya2Rvd24uXG4gKi9cbmV4cG9ydCBjb25zdCBtYXJrZG93blJlbmRlcmVyRmFjdG9yeSA9IHtcbiAgICBzYWZlOiB0cnVlLFxuICAgIG1pbWVUeXBlczogWyd0ZXh0L21hcmtkb3duJ10sXG4gICAgZGVmYXVsdFJhbms6IDYwLFxuICAgIGNyZWF0ZVJlbmRlcmVyOiBvcHRpb25zID0+IG5ldyB3aWRnZXRzLlJlbmRlcmVkTWFya2Rvd24ob3B0aW9ucylcbn07XG4vKipcbiAqIEEgbWltZSByZW5kZXJlciBmYWN0b3J5IGZvciBzdmcuXG4gKi9cbmV4cG9ydCBjb25zdCBzdmdSZW5kZXJlckZhY3RvcnkgPSB7XG4gICAgc2FmZTogZmFsc2UsXG4gICAgbWltZVR5cGVzOiBbJ2ltYWdlL3N2Zyt4bWwnXSxcbiAgICBkZWZhdWx0UmFuazogODAsXG4gICAgY3JlYXRlUmVuZGVyZXI6IG9wdGlvbnMgPT4gbmV3IHdpZGdldHMuUmVuZGVyZWRTVkcob3B0aW9ucylcbn07XG4vKipcbiAqIEEgbWltZSByZW5kZXJlciBmYWN0b3J5IGZvciBwbGFpbiBhbmQganVweXRlciBjb25zb2xlIHRleHQgZGF0YS5cbiAqL1xuZXhwb3J0IGNvbnN0IHRleHRSZW5kZXJlckZhY3RvcnkgPSB7XG4gICAgc2FmZTogdHJ1ZSxcbiAgICBtaW1lVHlwZXM6IFtcbiAgICAgICAgJ3RleHQvcGxhaW4nLFxuICAgICAgICAnYXBwbGljYXRpb24vdm5kLmp1cHl0ZXIuc3Rkb3V0JyxcbiAgICAgICAgJ2FwcGxpY2F0aW9uL3ZuZC5qdXB5dGVyLnN0ZGVycidcbiAgICBdLFxuICAgIGRlZmF1bHRSYW5rOiAxMjAsXG4gICAgY3JlYXRlUmVuZGVyZXI6IG9wdGlvbnMgPT4gbmV3IHdpZGdldHMuUmVuZGVyZWRUZXh0KG9wdGlvbnMpXG59O1xuLyoqXG4gKiBBIHBsYWNlaG9sZGVyIGZhY3RvcnkgZm9yIHJlbmRlcmVkIEphdmFTY3JpcHQuXG4gKi9cbmV4cG9ydCBjb25zdCBqYXZhU2NyaXB0UmVuZGVyZXJGYWN0b3J5ID0ge1xuICAgIHNhZmU6IGZhbHNlLFxuICAgIG1pbWVUeXBlczogWyd0ZXh0L2phdmFzY3JpcHQnLCAnYXBwbGljYXRpb24vamF2YXNjcmlwdCddLFxuICAgIGRlZmF1bHRSYW5rOiAxMTAsXG4gICAgY3JlYXRlUmVuZGVyZXI6IG9wdGlvbnMgPT4gbmV3IHdpZGdldHMuUmVuZGVyZWRKYXZhU2NyaXB0KG9wdGlvbnMpXG59O1xuLyoqXG4gKiBUaGUgc3RhbmRhcmQgZmFjdG9yaWVzIHByb3ZpZGVkIGJ5IHRoZSByZW5kZXJtaW1lIHBhY2thZ2UuXG4gKi9cbmV4cG9ydCBjb25zdCBzdGFuZGFyZFJlbmRlcmVyRmFjdG9yaWVzID0gW1xuICAgIGh0bWxSZW5kZXJlckZhY3RvcnksXG4gICAgbWFya2Rvd25SZW5kZXJlckZhY3RvcnksXG4gICAgbGF0ZXhSZW5kZXJlckZhY3RvcnksXG4gICAgc3ZnUmVuZGVyZXJGYWN0b3J5LFxuICAgIGltYWdlUmVuZGVyZXJGYWN0b3J5LFxuICAgIGphdmFTY3JpcHRSZW5kZXJlckZhY3RvcnksXG4gICAgdGV4dFJlbmRlcmVyRmFjdG9yeVxuXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZhY3Rvcmllcy5qcy5tYXAiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIHJlbmRlcm1pbWVcbiAqL1xuZXhwb3J0ICogZnJvbSAnQGp1cHl0ZXJsYWIvcmVuZGVybWltZS1pbnRlcmZhY2VzJztcbmV4cG9ydCAqIGZyb20gJy4vYXR0YWNobWVudG1vZGVsJztcbmV4cG9ydCAqIGZyb20gJy4vZmFjdG9yaWVzJztcbmV4cG9ydCAqIGZyb20gJy4vbGF0ZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9taW1lbW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9vdXRwdXRtb2RlbCc7XG5leHBvcnQgKiBmcm9tICcuL3JlZ2lzdHJ5JztcbmV4cG9ydCAqIGZyb20gJy4vcmVuZGVyZXJzJztcbmV4cG9ydCAqIGZyb20gJy4vdG9rZW5zJztcbmV4cG9ydCAqIGZyb20gJy4vd2lkZ2V0cyc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8vIFNvbWUgbWFnaWMgZm9yIGRlZmVycmluZyBtYXRoZW1hdGljYWwgZXhwcmVzc2lvbnMgdG8gTWF0aEpheFxuLy8gYnkgaGlkaW5nIHRoZW0gZnJvbSB0aGUgTWFya2Rvd24gcGFyc2VyLlxuLy8gU29tZSBvZiB0aGUgY29kZSBoZXJlIGlzIGFkYXB0ZWQgd2l0aCBwZXJtaXNzaW9uIGZyb20gRGF2aWRlIENlcnZvbmVcbi8vIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQXBhY2hlMiBsaWNlbnNlIGdvdmVybmluZyB0aGUgTWF0aEpheCBwcm9qZWN0LlxuLy8gT3RoZXIgbWlub3IgbW9kaWZpY2F0aW9ucyBhcmUgYWxzbyBkdWUgdG8gU3RhY2tFeGNoYW5nZSBhbmQgYXJlIHVzZWQgd2l0aFxuLy8gcGVybWlzc2lvbi5cbmNvbnN0IGlubGluZSA9ICckJzsgLy8gdGhlIGlubGluZSBtYXRoIGRlbGltaXRlclxuLy8gTUFUSFNQTElUIGNvbnRhaW5zIHRoZSBwYXR0ZXJuIGZvciBtYXRoIGRlbGltaXRlcnMgYW5kIHNwZWNpYWwgc3ltYm9sc1xuLy8gbmVlZGVkIGZvciBzZWFyY2hpbmcgZm9yIG1hdGggaW4gdGhlIHRleHQgaW5wdXQuXG5jb25zdCBNQVRIU1BMSVQgPSAvKFxcJFxcJD98XFxcXCg/OmJlZ2lufGVuZClcXHtbYS16XSpcXCo/XFx9fFxcXFxbe30kXXxbe31dfCg/OlxcblxccyopK3xAQFxcZCtAQHxcXFxcXFxcXCg/OlxcKHxcXCl8XFxbfFxcXSkpL2k7XG4vKipcbiAqICBCcmVhayB1cCB0aGUgdGV4dCBpbnRvIGl0cyBjb21wb25lbnQgcGFydHMgYW5kIHNlYXJjaFxuICogICAgdGhyb3VnaCB0aGVtIGZvciBtYXRoIGRlbGltaXRlcnMsIGJyYWNlcywgbGluZWJyZWFrcywgZXRjLlxuICogIE1hdGggZGVsaW1pdGVycyBtdXN0IG1hdGNoIGFuZCBicmFjZXMgbXVzdCBiYWxhbmNlLlxuICogIERvbid0IGFsbG93IG1hdGggdG8gcGFzcyB0aHJvdWdoIGEgZG91YmxlIGxpbmVicmVha1xuICogICAgKHdoaWNoIHdpbGwgYmUgYSBwYXJhZ3JhcGgpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlTWF0aCh0ZXh0KSB7XG4gICAgY29uc3QgbWF0aCA9IFtdOyAvLyBzdG9yZXMgbWF0aCBzdHJpbmdzIGZvciBsYXRlclxuICAgIGxldCBzdGFydCA9IG51bGw7XG4gICAgbGV0IGVuZCA9IG51bGw7XG4gICAgbGV0IGxhc3QgPSBudWxsO1xuICAgIGxldCBicmFjZXMgPSAwO1xuICAgIGxldCBkZVRpbGRlO1xuICAgIC8vIEV4Y2VwdCBmb3IgZXh0cmVtZSBlZGdlIGNhc2VzLCB0aGlzIHNob3VsZCBjYXRjaCBwcmVjaXNlbHkgdGhvc2UgcGllY2VzIG9mIHRoZSBtYXJrZG93blxuICAgIC8vIHNvdXJjZSB0aGF0IHdpbGwgbGF0ZXIgYmUgdHVybmVkIGludG8gY29kZSBzcGFucy4gV2hpbGUgTWF0aEpheCB3aWxsIG5vdCBUZVhpZnkgY29kZSBzcGFucyxcbiAgICAvLyB3ZSBzdGlsbCBoYXZlIHRvIGNvbnNpZGVyIHRoZW0gYXQgdGhpcyBwb2ludDsgdGhlIGZvbGxvd2luZyBpc3N1ZSBoYXMgaGFwcGVuZWQgc2V2ZXJhbCB0aW1lczpcbiAgICAvL1xuICAgIC8vICAgICBgJGZvb2AgYW5kIGAkYmFyYCBhcmUgdmFyaWFibGVzLiAgLS0+ICA8Y29kZT4kZm9vIGAgYW5kIGAkYmFyPC9jb2RlPiBhcmUgdmFyaWFibGVzLlxuICAgIGNvbnN0IGhhc0NvZGVTcGFucyA9IHRleHQuaW5jbHVkZXMoJ2AnKSB8fCB0ZXh0LmluY2x1ZGVzKCd+fn4nKTtcbiAgICBpZiAoaGFzQ29kZVNwYW5zKSB7XG4gICAgICAgIHRleHQgPSB0ZXh0XG4gICAgICAgICAgICAucmVwbGFjZSgvfi9nLCAnflQnKVxuICAgICAgICAgICAgLy8gbm90ZTogdGhlIGBmZW5jZWAgKHRocmVlIG9yIG1vcmUgY29uc2VjdXRpdmUgdGlsZGVzIG9yIGJhY2t0aWNrcylcbiAgICAgICAgICAgIC8vIGNhbiBiZSBmb2xsb3dlZCBieSBhbiBgaW5mbyBzdHJpbmdgIGJ1dCB0aGlzIGNhbm5vdCBpbmNsdWRlIGJhY2t0aWNrcyxcbiAgICAgICAgICAgIC8vIHNlZSBzcGVjaWZpY2F0aW9uOiBodHRwczovL3NwZWMuY29tbW9ubWFyay5vcmcvMC4zMC8jaW5mby1zdHJpbmdcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eKD88ZmVuY2U+YHszLH18KH5UKXszLH0pW15gXFxuXSpcXG4oW1xcc1xcU10qPyleXFxrPGZlbmNlPmAqJC9nbSwgd2hvbGVtYXRjaCA9PiB3aG9sZW1hdGNoLnJlcGxhY2UoL1xcJC9nLCAnfkQnKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC8oXnxbXlxcXFxdKShgKykoW15cXG5dKj9bXmBcXG5dKVxcMig/IWApL2dtLCB3aG9sZW1hdGNoID0+IHdob2xlbWF0Y2gucmVwbGFjZSgvXFwkL2csICd+RCcpKTtcbiAgICAgICAgZGVUaWxkZSA9ICh0ZXh0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9+KFtURF0pL2csICh3aG9sZW1hdGNoLCBjaGFyYWN0ZXIpID0+IGNoYXJhY3RlciA9PT0gJ1QnID8gJ34nIDogaW5saW5lKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRlVGlsZGUgPSAodGV4dCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGxldCBibG9ja3MgPSB0ZXh0LnJlcGxhY2UoL1xcclxcbj8vZywgJ1xcbicpLnNwbGl0KE1BVEhTUExJVCk7XG4gICAgZm9yIChsZXQgaSA9IDEsIG0gPSBibG9ja3MubGVuZ3RoOyBpIDwgbTsgaSArPSAyKSB7XG4gICAgICAgIGNvbnN0IGJsb2NrID0gYmxvY2tzW2ldO1xuICAgICAgICBpZiAoYmxvY2suY2hhckF0KDApID09PSAnQCcpIHtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgVGhpbmdzIHRoYXQgbG9vayBsaWtlIG91ciBtYXRoIG1hcmtlcnMgd2lsbCBnZXRcbiAgICAgICAgICAgIC8vICBzdG9yZWQgYW5kIHRoZW4gcmV0cmlldmVkIGFsb25nIHdpdGggdGhlIG1hdGguXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgYmxvY2tzW2ldID0gJ0BAJyArIG1hdGgubGVuZ3RoICsgJ0BAJztcbiAgICAgICAgICAgIG1hdGgucHVzaChibG9jayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RhcnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgSWYgd2UgYXJlIGluIG1hdGgsIGxvb2sgZm9yIHRoZSBlbmQgZGVsaW1pdGVyLFxuICAgICAgICAgICAgLy8gICAgYnV0IGRvbid0IGdvIHBhc3QgZG91YmxlIGxpbmUgYnJlYWtzLCBhbmRcbiAgICAgICAgICAgIC8vICAgIGFuZCBiYWxhbmNlIGJyYWNlcyB3aXRoaW4gdGhlIG1hdGguXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgaWYgKGJsb2NrID09PSBlbmQpIHtcbiAgICAgICAgICAgICAgICBpZiAoYnJhY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3QgPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tzID0gcHJvY2Vzc01hdGgoc3RhcnQsIGksIGRlVGlsZGUsIG1hdGgsIGJsb2Nrcyk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgbGFzdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmxvY2subWF0Y2goL1xcbi4qXFxuLykpIHtcbiAgICAgICAgICAgICAgICBpZiAobGFzdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpID0gbGFzdDtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tzID0gcHJvY2Vzc01hdGgoc3RhcnQsIGksIGRlVGlsZGUsIG1hdGgsIGJsb2Nrcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBlbmQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGxhc3QgPSBudWxsO1xuICAgICAgICAgICAgICAgIGJyYWNlcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChibG9jayA9PT0gJ3snKSB7XG4gICAgICAgICAgICAgICAgYnJhY2VzKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChibG9jayA9PT0gJ30nICYmIGJyYWNlcykge1xuICAgICAgICAgICAgICAgIGJyYWNlcy0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vICBMb29rIGZvciBtYXRoIHN0YXJ0IGRlbGltaXRlcnMgYW5kIHdoZW5cbiAgICAgICAgICAgIC8vICAgIGZvdW5kLCBzZXQgdXAgdGhlIGVuZCBkZWxpbWl0ZXIuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgaWYgKGJsb2NrID09PSBpbmxpbmUgfHwgYmxvY2sgPT09ICckJCcpIHtcbiAgICAgICAgICAgICAgICBzdGFydCA9IGk7XG4gICAgICAgICAgICAgICAgZW5kID0gYmxvY2s7XG4gICAgICAgICAgICAgICAgYnJhY2VzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJsb2NrID09PSAnXFxcXFxcXFwoJyB8fCBibG9jayA9PT0gJ1xcXFxcXFxcWycpIHtcbiAgICAgICAgICAgICAgICBzdGFydCA9IGk7XG4gICAgICAgICAgICAgICAgZW5kID0gYmxvY2suc2xpY2UoLTEpID09PSAnKCcgPyAnXFxcXFxcXFwpJyA6ICdcXFxcXFxcXF0nO1xuICAgICAgICAgICAgICAgIGJyYWNlcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChibG9jay5zdWJzdHIoMSwgNSkgPT09ICdiZWdpbicpIHtcbiAgICAgICAgICAgICAgICBzdGFydCA9IGk7XG4gICAgICAgICAgICAgICAgZW5kID0gJ1xcXFxlbmQnICsgYmxvY2suc3Vic3RyKDYpO1xuICAgICAgICAgICAgICAgIGJyYWNlcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHN0YXJ0ICE9PSBudWxsICYmIGxhc3QgIT09IG51bGwpIHtcbiAgICAgICAgYmxvY2tzID0gcHJvY2Vzc01hdGgoc3RhcnQsIGxhc3QsIGRlVGlsZGUsIG1hdGgsIGJsb2Nrcyk7XG4gICAgICAgIHN0YXJ0ID0gbnVsbDtcbiAgICAgICAgZW5kID0gbnVsbDtcbiAgICAgICAgbGFzdCA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiB7IHRleHQ6IGRlVGlsZGUoYmxvY2tzLmpvaW4oJycpKSwgbWF0aCB9O1xufVxuLyoqXG4gKiBQdXQgYmFjayB0aGUgbWF0aCBzdHJpbmdzIHRoYXQgd2VyZSBzYXZlZCxcbiAqIGFuZCBjbGVhciB0aGUgbWF0aCBhcnJheSAobm8gbmVlZCB0byBrZWVwIGl0IGFyb3VuZCkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTWF0aCh0ZXh0LCBtYXRoKSB7XG4gICAgLyoqXG4gICAgICogUmVwbGFjZSBhIG1hdGggcGxhY2Vob2xkZXIgd2l0aCBpdHMgY29ycmVzcG9uZGluZyBncm91cC5cbiAgICAgKiBUaGUgbWF0aCBkZWxpbWl0ZXJzIFwiXFxcXChcIiwgXCJcXFxcW1wiLCBcIlxcXFwpXCIgYW5kIFwiXFxcXF1cIiBhcmUgcmVwbGFjZWRcbiAgICAgKiByZW1vdmluZyBvbmUgYmFja3NsYXNoIGluIG9yZGVyIHRvIGJlIGludGVycHJldGVkIGNvcnJlY3RseSBieSBNYXRoSmF4LlxuICAgICAqL1xuICAgIGNvbnN0IHByb2Nlc3MgPSAobWF0Y2gsIG4pID0+IHtcbiAgICAgICAgbGV0IGdyb3VwID0gbWF0aFtuXTtcbiAgICAgICAgaWYgKGdyb3VwLnN1YnN0cigwLCAzKSA9PT0gJ1xcXFxcXFxcKCcgJiZcbiAgICAgICAgICAgIGdyb3VwLnN1YnN0cihncm91cC5sZW5ndGggLSAzKSA9PT0gJ1xcXFxcXFxcKScpIHtcbiAgICAgICAgICAgIGdyb3VwID0gJ1xcXFwoJyArIGdyb3VwLnN1YnN0cmluZygzLCBncm91cC5sZW5ndGggLSAzKSArICdcXFxcKSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZ3JvdXAuc3Vic3RyKDAsIDMpID09PSAnXFxcXFxcXFxbJyAmJlxuICAgICAgICAgICAgZ3JvdXAuc3Vic3RyKGdyb3VwLmxlbmd0aCAtIDMpID09PSAnXFxcXFxcXFxdJykge1xuICAgICAgICAgICAgZ3JvdXAgPSAnXFxcXFsnICsgZ3JvdXAuc3Vic3RyaW5nKDMsIGdyb3VwLmxlbmd0aCAtIDMpICsgJ1xcXFxdJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgfTtcbiAgICAvLyBSZXBsYWNlIGFsbCB0aGUgbWF0aCBncm91cCBwbGFjZWhvbGRlcnMgaW4gdGhlIHRleHRcbiAgICAvLyB3aXRoIHRoZSBzYXZlZCBzdHJpbmdzLlxuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL0BAKFxcZCspQEAvZywgcHJvY2Vzcyk7XG59XG4vKipcbiAqIFByb2Nlc3MgbWF0aCBibG9ja3MuXG4gKlxuICogVGhlIG1hdGggaXMgaW4gYmxvY2tzIGkgdGhyb3VnaCBqLCBzb1xuICogICBjb2xsZWN0IGl0IGludG8gb25lIGJsb2NrIGFuZCBjbGVhciB0aGUgb3RoZXJzLlxuICogIFJlcGxhY2UgJiwgPCwgYW5kID4gYnkgbmFtZWQgZW50aXRpZXMuXG4gKiAgRm9yIElFLCBwdXQgPGJyPiBhdCB0aGUgZW5kcyBvZiBjb21tZW50cyBzaW5jZSBJRSByZW1vdmVzIFxcbi5cbiAqICBDbGVhciB0aGUgY3VycmVudCBtYXRoIHBvc2l0aW9ucyBhbmQgc3RvcmUgdGhlIGluZGV4IG9mIHRoZVxuICogICBtYXRoLCB0aGVuIHB1c2ggdGhlIG1hdGggc3RyaW5nIG9udG8gdGhlIHN0b3JhZ2UgYXJyYXkuXG4gKiAgVGhlIHByZVByb2Nlc3MgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGFsbCBibG9ja3MgaWYgaXQgaGFzIGJlZW4gcGFzc2VkIGluXG4gKi9cbmZ1bmN0aW9uIHByb2Nlc3NNYXRoKGksIGosIHByZVByb2Nlc3MsIG1hdGgsIGJsb2Nrcykge1xuICAgIGxldCBibG9jayA9IGJsb2Nrc1xuICAgICAgICAuc2xpY2UoaSwgaiArIDEpXG4gICAgICAgIC5qb2luKCcnKVxuICAgICAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKSAvLyB1c2UgSFRNTCBlbnRpdHkgZm9yICZcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKSAvLyB1c2UgSFRNTCBlbnRpdHkgZm9yIDxcbiAgICAgICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKTsgLy8gdXNlIEhUTUwgZW50aXR5IGZvciA+XG4gICAgaWYgKG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IuYXBwTmFtZSA9PT0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcicpIHtcbiAgICAgICAgYmxvY2sgPSBibG9jay5yZXBsYWNlKC8oJVteXFxuXSopXFxuL2csICckMTxici8+XFxuJyk7XG4gICAgfVxuICAgIHdoaWxlIChqID4gaSkge1xuICAgICAgICBibG9ja3Nbal0gPSAnJztcbiAgICAgICAgai0tO1xuICAgIH1cbiAgICBibG9ja3NbaV0gPSAnQEAnICsgbWF0aC5sZW5ndGggKyAnQEAnOyAvLyByZXBsYWNlIHRoZSBjdXJyZW50IGJsb2NrIHRleHQgd2l0aCBhIHVuaXF1ZSB0YWcgdG8gZmluZCBsYXRlclxuICAgIGlmIChwcmVQcm9jZXNzKSB7XG4gICAgICAgIGJsb2NrID0gcHJlUHJvY2VzcyhibG9jayk7XG4gICAgfVxuICAgIG1hdGgucHVzaChibG9jayk7XG4gICAgcmV0dXJuIGJsb2Nrcztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxhdGV4LmpzLm1hcCIsIi8qKlxuICogVGhlIGRlZmF1bHQgbWltZSBtb2RlbCBpbXBsZW1lbnRhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIE1pbWVNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IG1pbWUgbW9kZWwuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMudHJ1c3RlZCA9ICEhb3B0aW9ucy50cnVzdGVkO1xuICAgICAgICB0aGlzLl9kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xuICAgICAgICB0aGlzLl9tZXRhZGF0YSA9IG9wdGlvbnMubWV0YWRhdGEgfHwge307XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFjayB8fCBQcml2YXRlLm5vT3A7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGUgbW9kZWwuXG4gICAgICovXG4gICAgZ2V0IGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgbWV0YWRhdGEgYXNzb2NpYXRlZCB3aXRoIHRoZSBtb2RlbC5cbiAgICAgKi9cbiAgICBnZXQgbWV0YWRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGUgbW9kZWwuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogRGVwZW5kaW5nIG9uIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgbWltZSBtb2RlbCxcbiAgICAgKiB0aGlzIGNhbGwgbWF5IG9yIG1heSBub3QgaGF2ZSBkZWZlcnJlZCBlZmZlY3RzLFxuICAgICAqL1xuICAgIHNldERhdGEob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHRoaXMuX2RhdGE7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhID0gb3B0aW9ucy5tZXRhZGF0YSB8fCB0aGlzLl9tZXRhZGF0YTtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sob3B0aW9ucyk7XG4gICAgfVxufVxuLyoqXG4gKiBUaGUgbmFtZXNwYWNlIGZvciBtb2R1bGUgcHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEEgbm8tb3AgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gbm9PcCgpIHtcbiAgICAgICAgLyogbm8tb3AgKi9cbiAgICB9XG4gICAgUHJpdmF0ZS5ub09wID0gbm9PcDtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWltZW1vZGVsLmpzLm1hcCIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxufCBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0ICogYXMgbmJmb3JtYXQgZnJvbSAnQGp1cHl0ZXJsYWIvbmJmb3JtYXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUpTT04gfSBmcm9tICdAanVweXRlcmxhYi9vYnNlcnZhYmxlcyc7XG5pbXBvcnQgeyBKU09ORXh0IH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuLyoqXG4gKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiBhIG5vdGVib29rIG91dHB1dCBtb2RlbC5cbiAqL1xuZXhwb3J0IGNsYXNzIE91dHB1dE1vZGVsIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgb3V0cHV0IG1vZGVsLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fY2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX3JhdyA9IHt9O1xuICAgICAgICBjb25zdCB7IGRhdGEsIG1ldGFkYXRhLCB0cnVzdGVkIH0gPSBQcml2YXRlLmdldEJ1bmRsZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBuZXcgT2JzZXJ2YWJsZUpTT04oeyB2YWx1ZXM6IGRhdGEgfSk7XG4gICAgICAgIHRoaXMuX3Jhd0RhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YSA9IG5ldyBPYnNlcnZhYmxlSlNPTih7IHZhbHVlczogbWV0YWRhdGEgfSk7XG4gICAgICAgIHRoaXMuX3Jhd01ldGFkYXRhID0gbWV0YWRhdGE7XG4gICAgICAgIHRoaXMudHJ1c3RlZCA9IHRydXN0ZWQ7XG4gICAgICAgIC8vIE1ha2UgYSBjb3B5IG9mIHRoZSBkYXRhLlxuICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnMudmFsdWU7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgZGF0YSBhbmQgbWV0YWRhdGEgdGhhdCB3ZXJlIHN0cmlwcGVkLlxuICAgICAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkYXRhJzpcbiAgICAgICAgICAgICAgICBjYXNlICdtZXRhZGF0YSc6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jhd1trZXldID0gUHJpdmF0ZS5leHRyYWN0KHZhbHVlLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudHlwZSA9IHZhbHVlLm91dHB1dF90eXBlO1xuICAgICAgICBpZiAobmJmb3JtYXQuaXNFeGVjdXRlUmVzdWx0KHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5leGVjdXRpb25Db3VudCA9IHZhbHVlLmV4ZWN1dGlvbl9jb3VudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXhlY3V0aW9uQ291bnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgb3V0cHV0IG1vZGVsIGNoYW5nZXMuXG4gICAgICovXG4gICAgZ2V0IGNoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgdXNlZCBieSB0aGUgb3V0cHV0IG1vZGVsLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuX2RhdGEuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YS5kaXNwb3NlKCk7XG4gICAgICAgIFNpZ25hbC5jbGVhckRhdGEodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGUgbW9kZWwuXG4gICAgICovXG4gICAgZ2V0IGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yYXdEYXRhO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgbWV0YWRhdGEgYXNzb2NpYXRlZCB3aXRoIHRoZSBtb2RlbC5cbiAgICAgKi9cbiAgICBnZXQgbWV0YWRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yYXdNZXRhZGF0YTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGUgbW9kZWwuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogRGVwZW5kaW5nIG9uIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgbWltZSBtb2RlbCxcbiAgICAgKiB0aGlzIGNhbGwgbWF5IG9yIG1heSBub3QgaGF2ZSBkZWZlcnJlZCBlZmZlY3RzLFxuICAgICAqL1xuICAgIHNldERhdGEob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy5kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVPYnNlcnZhYmxlKHRoaXMuX2RhdGEsIG9wdGlvbnMuZGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9yYXdEYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVPYnNlcnZhYmxlKHRoaXMuX21ldGFkYXRhLCBvcHRpb25zLm1ldGFkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuX3Jhd01ldGFkYXRhID0gb3B0aW9ucy5tZXRhZGF0YTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VyaWFsaXplIHRoZSBtb2RlbCB0byBKU09OLlxuICAgICAqL1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0ge307XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3Jhdykge1xuICAgICAgICAgICAgb3V0cHV0W2tleV0gPSBQcml2YXRlLmV4dHJhY3QodGhpcy5fcmF3LCBrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdkaXNwbGF5X2RhdGEnOlxuICAgICAgICAgICAgY2FzZSAnZXhlY3V0ZV9yZXN1bHQnOlxuICAgICAgICAgICAgY2FzZSAndXBkYXRlX2Rpc3BsYXlfZGF0YSc6XG4gICAgICAgICAgICAgICAgb3V0cHV0WydkYXRhJ10gPSB0aGlzLmRhdGE7XG4gICAgICAgICAgICAgICAgb3V0cHV0WydtZXRhZGF0YSddID0gdGhpcy5tZXRhZGF0YTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVtb3ZlIHRyYW5zaWVudCBkYXRhLlxuICAgICAgICBkZWxldGUgb3V0cHV0Wyd0cmFuc2llbnQnXTtcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIGFuIG9ic2VydmFibGUgSlNPTiBvYmplY3QgdXNpbmcgYSByZWFkb25seSBKU09OIG9iamVjdC5cbiAgICAgKi9cbiAgICBfdXBkYXRlT2JzZXJ2YWJsZShvYnNlcnZhYmxlLCBkYXRhKSB7XG4gICAgICAgIGNvbnN0IG9sZEtleXMgPSBvYnNlcnZhYmxlLmtleXMoKTtcbiAgICAgICAgY29uc3QgbmV3S2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpO1xuICAgICAgICAvLyBIYW5kbGUgcmVtb3ZlZCBrZXlzLlxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBvbGRLZXlzKSB7XG4gICAgICAgICAgICBpZiAobmV3S2V5cy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBIYW5kbGUgY2hhbmdlZCBkYXRhLlxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBuZXdLZXlzKSB7XG4gICAgICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IG9ic2VydmFibGUuZ2V0KGtleSk7XG4gICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IGRhdGFba2V5XTtcbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlLnNldChrZXksIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogVGhlIG5hbWVzcGFjZSBmb3IgT3V0cHV0TW9kZWwgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChPdXRwdXRNb2RlbCkge1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZGF0YSBmb3IgYW4gb3V0cHV0LlxuICAgICAqXG4gICAgICogQHBhcmFtcyBvdXRwdXQgLSBBIGtlcm5lbCBvdXRwdXQgbWVzc2FnZSBwYXlsb2FkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBUaGUgZGF0YSBmb3IgdGhlIHBheWxvYWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0RGF0YShvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIFByaXZhdGUuZ2V0RGF0YShvdXRwdXQpO1xuICAgIH1cbiAgICBPdXRwdXRNb2RlbC5nZXREYXRhID0gZ2V0RGF0YTtcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1ldGFkYXRhIGZyb20gYW4gb3V0cHV0IG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW1zIG91dHB1dCAtIEEga2VybmVsIG91dHB1dCBtZXNzYWdlIHBheWxvYWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIFRoZSBtZXRhZGF0YSBmb3IgdGhlIHBheWxvYWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0TWV0YWRhdGEob3V0cHV0KSB7XG4gICAgICAgIHJldHVybiBQcml2YXRlLmdldE1ldGFkYXRhKG91dHB1dCk7XG4gICAgfVxuICAgIE91dHB1dE1vZGVsLmdldE1ldGFkYXRhID0gZ2V0TWV0YWRhdGE7XG59KShPdXRwdXRNb2RlbCB8fCAoT3V0cHV0TW9kZWwgPSB7fSkpO1xuLyoqXG4gKiBUaGUgbmFtZXNwYWNlIGZvciBtb2R1bGUgcHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZGF0YSBmcm9tIGEgbm90ZWJvb2sgb3V0cHV0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldERhdGEob3V0cHV0KSB7XG4gICAgICAgIGxldCBidW5kbGUgPSB7fTtcbiAgICAgICAgaWYgKG5iZm9ybWF0LmlzRXhlY3V0ZVJlc3VsdChvdXRwdXQpIHx8XG4gICAgICAgICAgICBuYmZvcm1hdC5pc0Rpc3BsYXlEYXRhKG91dHB1dCkgfHxcbiAgICAgICAgICAgIG5iZm9ybWF0LmlzRGlzcGxheVVwZGF0ZShvdXRwdXQpKSB7XG4gICAgICAgICAgICBidW5kbGUgPSBvdXRwdXQuZGF0YTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYmZvcm1hdC5pc1N0cmVhbShvdXRwdXQpKSB7XG4gICAgICAgICAgICBpZiAob3V0cHV0Lm5hbWUgPT09ICdzdGRlcnInKSB7XG4gICAgICAgICAgICAgICAgYnVuZGxlWydhcHBsaWNhdGlvbi92bmQuanVweXRlci5zdGRlcnInXSA9IG91dHB1dC50ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYnVuZGxlWydhcHBsaWNhdGlvbi92bmQuanVweXRlci5zdGRvdXQnXSA9IG91dHB1dC50ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5iZm9ybWF0LmlzRXJyb3Iob3V0cHV0KSkge1xuICAgICAgICAgICAgYnVuZGxlWydhcHBsaWNhdGlvbi92bmQuanVweXRlci5lcnJvciddID0gb3V0cHV0O1xuICAgICAgICAgICAgY29uc3QgdHJhY2ViYWNrID0gb3V0cHV0LnRyYWNlYmFjay5qb2luKCdcXG4nKTtcbiAgICAgICAgICAgIGJ1bmRsZVsnYXBwbGljYXRpb24vdm5kLmp1cHl0ZXIuc3RkZXJyJ10gPVxuICAgICAgICAgICAgICAgIHRyYWNlYmFjayB8fCBgJHtvdXRwdXQuZW5hbWV9OiAke291dHB1dC5ldmFsdWV9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udmVydEJ1bmRsZShidW5kbGUpO1xuICAgIH1cbiAgICBQcml2YXRlLmdldERhdGEgPSBnZXREYXRhO1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbWV0YWRhdGEgZnJvbSBhbiBvdXRwdXQgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRNZXRhZGF0YShvdXRwdXQpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBpZiAobmJmb3JtYXQuaXNFeGVjdXRlUmVzdWx0KG91dHB1dCkgfHwgbmJmb3JtYXQuaXNEaXNwbGF5RGF0YShvdXRwdXQpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvdXRwdXQubWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZVtrZXldID0gZXh0cmFjdChvdXRwdXQubWV0YWRhdGEsIGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBQcml2YXRlLmdldE1ldGFkYXRhID0gZ2V0TWV0YWRhdGE7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBidW5kbGUgb3B0aW9ucyBnaXZlbiBvdXRwdXQgbW9kZWwgb3B0aW9ucy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRCdW5kbGVPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGdldERhdGEob3B0aW9ucy52YWx1ZSk7XG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gZ2V0TWV0YWRhdGEob3B0aW9ucy52YWx1ZSk7XG4gICAgICAgIGNvbnN0IHRydXN0ZWQgPSAhIW9wdGlvbnMudHJ1c3RlZDtcbiAgICAgICAgcmV0dXJuIHsgZGF0YSwgbWV0YWRhdGEsIHRydXN0ZWQgfTtcbiAgICB9XG4gICAgUHJpdmF0ZS5nZXRCdW5kbGVPcHRpb25zID0gZ2V0QnVuZGxlT3B0aW9ucztcbiAgICAvKipcbiAgICAgKiBFeHRyYWN0IGEgdmFsdWUgZnJvbSBhIEpTT05PYmplY3QuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZXh0cmFjdCh2YWx1ZSwga2V5KSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB2YWx1ZVtrZXldO1xuICAgICAgICBpZiAoaXRlbSA9PT0gdW5kZWZpbmVkIHx8IEpTT05FeHQuaXNQcmltaXRpdmUoaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGl0ZW0pKTtcbiAgICB9XG4gICAgUHJpdmF0ZS5leHRyYWN0ID0gZXh0cmFjdDtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgbWltZSBidW5kbGUgdG8gbWltZSBkYXRhLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnZlcnRCdW5kbGUoYnVuZGxlKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGZvciAoY29uc3QgbWltZVR5cGUgaW4gYnVuZGxlKSB7XG4gICAgICAgICAgICBtYXBbbWltZVR5cGVdID0gZXh0cmFjdChidW5kbGUsIG1pbWVUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b3V0cHV0bW9kZWwuanMubWFwIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBkZWZhdWx0U2FuaXRpemVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgUGF0aEV4dCwgVVJMRXh0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgTWltZU1vZGVsIH0gZnJvbSAnLi9taW1lbW9kZWwnO1xuLyoqXG4gKiBBbiBvYmplY3Qgd2hpY2ggbWFuYWdlcyBtaW1lIHJlbmRlcmVyIGZhY3Rvcmllcy5cbiAqXG4gKiBUaGlzIG9iamVjdCBpcyB1c2VkIHRvIHJlbmRlciBtaW1lIG1vZGVscyB1c2luZyByZWdpc3RlcmVkIG1pbWVcbiAqIHJlbmRlcmVycywgc2VsZWN0aW5nIHRoZSBwcmVmZXJyZWQgbWltZSByZW5kZXJlciB0byByZW5kZXIgdGhlXG4gKiBtb2RlbCBpbnRvIGEgd2lkZ2V0LlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIFRoaXMgY2xhc3MgaXMgbm90IGludGVuZGVkIHRvIGJlIHN1YmNsYXNzZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZW5kZXJNaW1lUmVnaXN0cnkge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyByZW5kZXJtaW1lLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgaW5pdGlhbGl6aW5nIHRoZSBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5faWQgPSAwO1xuICAgICAgICB0aGlzLl9yYW5rcyA9IHt9O1xuICAgICAgICB0aGlzLl90eXBlcyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2ZhY3RvcmllcyA9IHt9O1xuICAgICAgICAvLyBQYXJzZSB0aGUgb3B0aW9ucy5cbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gb3B0aW9ucy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICB0aGlzLnJlc29sdmVyID0gb3B0aW9ucy5yZXNvbHZlciB8fCBudWxsO1xuICAgICAgICB0aGlzLmxpbmtIYW5kbGVyID0gb3B0aW9ucy5saW5rSGFuZGxlciB8fCBudWxsO1xuICAgICAgICB0aGlzLmxhdGV4VHlwZXNldHRlciA9IG9wdGlvbnMubGF0ZXhUeXBlc2V0dGVyIHx8IG51bGw7XG4gICAgICAgIHRoaXMuc2FuaXRpemVyID0gb3B0aW9ucy5zYW5pdGl6ZXIgfHwgZGVmYXVsdFNhbml0aXplcjtcbiAgICAgICAgLy8gQWRkIHRoZSBpbml0aWFsIGZhY3Rvcmllcy5cbiAgICAgICAgaWYgKG9wdGlvbnMuaW5pdGlhbEZhY3Rvcmllcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBmYWN0b3J5IG9mIG9wdGlvbnMuaW5pdGlhbEZhY3Rvcmllcykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRmFjdG9yeShmYWN0b3J5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgb3JkZXJlZCBsaXN0IG9mIG1pbWVUeXBlcy5cbiAgICAgKi9cbiAgICBnZXQgbWltZVR5cGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZXMgfHwgKHRoaXMuX3R5cGVzID0gUHJpdmF0ZS5zb3J0ZWRUeXBlcyh0aGlzLl9yYW5rcykpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kIHRoZSBwcmVmZXJyZWQgbWltZSB0eXBlIGZvciBhIG1pbWUgYnVuZGxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGJ1bmRsZSAtIFRoZSBidW5kbGUgb2YgbWltZSBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNhZmUgLSBIb3cgdG8gY29uc2lkZXIgc2FmZS91bnNhZmUgZmFjdG9yaWVzLiBJZiAnZW5zdXJlJyxcbiAgICAgKiAgIGl0IHdpbGwgb25seSBjb25zaWRlciBzYWZlIGZhY3Rvcmllcy4gSWYgJ2FueScsIGFueSBmYWN0b3J5IHdpbGwgYmVcbiAgICAgKiAgIGNvbnNpZGVyZWQuIElmICdwcmVmZXInLCB1bnNhZmUgZmFjdG9yaWVzIHdpbGwgYmUgY29uc2lkZXJlZCwgYnV0XG4gICAgICogICBvbmx5IGFmdGVyIHRoZSBzYWZlIG9wdGlvbnMgaGF2ZSBiZWVuIGV4aGF1c3RlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBwcmVmZXJyZWQgbWltZSB0eXBlIGZyb20gdGhlIGF2YWlsYWJsZSBmYWN0b3JpZXMsXG4gICAgICogICBvciBgdW5kZWZpbmVkYCBpZiB0aGUgbWltZSB0eXBlIGNhbm5vdCBiZSByZW5kZXJlZC5cbiAgICAgKi9cbiAgICBwcmVmZXJyZWRNaW1lVHlwZShidW5kbGUsIHNhZmUgPSAnZW5zdXJlJykge1xuICAgICAgICAvLyBUcnkgdG8gZmluZCBhIHNhZmUgZmFjdG9yeSBmaXJzdCwgaWYgcHJlZmVycmVkLlxuICAgICAgICBpZiAoc2FmZSA9PT0gJ2Vuc3VyZScgfHwgc2FmZSA9PT0gJ3ByZWZlcicpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbXQgb2YgdGhpcy5taW1lVHlwZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAobXQgaW4gYnVuZGxlICYmIHRoaXMuX2ZhY3Rvcmllc1ttdF0uc2FmZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzYWZlICE9PSAnZW5zdXJlJykge1xuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBzZWFyY2ggZm9yIHRoZSBiZXN0IGZhY3RvcnkgYW1vbmcgYWxsIGZhY3Rvcmllcy5cbiAgICAgICAgICAgIGZvciAoY29uc3QgbXQgb2YgdGhpcy5taW1lVHlwZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAobXQgaW4gYnVuZGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBubyBtYXRjaGluZyBtaW1lIHR5cGUgZXhpc3RzLlxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSByZW5kZXJlciBmb3IgYSBtaW1lIHR5cGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWltZVR5cGUgLSBUaGUgbWltZSB0eXBlIG9mIGludGVyZXN0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBuZXcgcmVuZGVyZXIgZm9yIHRoZSBnaXZlbiBtaW1lIHR5cGUuXG4gICAgICpcbiAgICAgKiBAdGhyb3dzIEFuIGVycm9yIGlmIG5vIGZhY3RvcnkgZXhpc3RzIGZvciB0aGUgbWltZSB0eXBlLlxuICAgICAqL1xuICAgIGNyZWF0ZVJlbmRlcmVyKG1pbWVUeXBlKSB7XG4gICAgICAgIC8vIFRocm93IGFuIGVycm9yIGlmIG5vIGZhY3RvcnkgZXhpc3RzIGZvciB0aGUgbWltZSB0eXBlLlxuICAgICAgICBpZiAoIShtaW1lVHlwZSBpbiB0aGlzLl9mYWN0b3JpZXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGZhY3RvcnkgZm9yIG1pbWUgdHlwZTogJyR7bWltZVR5cGV9J2ApO1xuICAgICAgICB9XG4gICAgICAgIC8vIEludm9rZSB0aGUgYmVzdCBmYWN0b3J5IGZvciB0aGUgZ2l2ZW4gbWltZSB0eXBlLlxuICAgICAgICByZXR1cm4gdGhpcy5fZmFjdG9yaWVzW21pbWVUeXBlXS5jcmVhdGVSZW5kZXJlcih7XG4gICAgICAgICAgICBtaW1lVHlwZSxcbiAgICAgICAgICAgIHJlc29sdmVyOiB0aGlzLnJlc29sdmVyLFxuICAgICAgICAgICAgc2FuaXRpemVyOiB0aGlzLnNhbml0aXplcixcbiAgICAgICAgICAgIGxpbmtIYW5kbGVyOiB0aGlzLmxpbmtIYW5kbGVyLFxuICAgICAgICAgICAgbGF0ZXhUeXBlc2V0dGVyOiB0aGlzLmxhdGV4VHlwZXNldHRlcixcbiAgICAgICAgICAgIHRyYW5zbGF0b3I6IHRoaXMudHJhbnNsYXRvclxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IG1pbWUgbW9kZWwuICBUaGlzIGlzIGEgY29udmVuaWVuY2UgbWV0aG9kLlxuICAgICAqXG4gICAgICogQG9wdGlvbnMgLSBUaGUgb3B0aW9ucyB1c2VkIHRvIGNyZWF0ZSB0aGUgbW9kZWwuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIG5ldyBtaW1lIG1vZGVsLlxuICAgICAqL1xuICAgIGNyZWF0ZU1vZGVsKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICByZXR1cm4gbmV3IE1pbWVNb2RlbChvcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgY2xvbmUgb2YgdGhpcyByZW5kZXJtaW1lIGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY29uZmlndXJpbmcgdGhlIGNsb25lLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBuZXcgaW5kZXBlbmRlbnQgY2xvbmUgb2YgdGhlIHJlbmRlcm1pbWUuXG4gICAgICovXG4gICAgY2xvbmUob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgY2xvbmUuXG4gICAgICAgIGNvbnN0IGNsb25lID0gbmV3IFJlbmRlck1pbWVSZWdpc3RyeSh7XG4gICAgICAgICAgICByZXNvbHZlcjogb3B0aW9ucy5yZXNvbHZlciB8fCB0aGlzLnJlc29sdmVyIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHNhbml0aXplcjogb3B0aW9ucy5zYW5pdGl6ZXIgfHwgdGhpcy5zYW5pdGl6ZXIgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgbGlua0hhbmRsZXI6IG9wdGlvbnMubGlua0hhbmRsZXIgfHwgdGhpcy5saW5rSGFuZGxlciB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICBsYXRleFR5cGVzZXR0ZXI6IG9wdGlvbnMubGF0ZXhUeXBlc2V0dGVyIHx8IHRoaXMubGF0ZXhUeXBlc2V0dGVyIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRyYW5zbGF0b3I6IHRoaXMudHJhbnNsYXRvclxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQ2xvbmUgdGhlIGludGVybmFsIHN0YXRlLlxuICAgICAgICBjbG9uZS5fZmFjdG9yaWVzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fZmFjdG9yaWVzKTtcbiAgICAgICAgY2xvbmUuX3JhbmtzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fcmFua3MpO1xuICAgICAgICBjbG9uZS5faWQgPSB0aGlzLl9pZDtcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBjbG9uZWQgb2JqZWN0LlxuICAgICAgICByZXR1cm4gY2xvbmU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcmVuZGVyZXIgZmFjdG9yeSByZWdpc3RlcmVkIGZvciBhIG1pbWUgdHlwZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtaW1lVHlwZSAtIFRoZSBtaW1lIHR5cGUgb2YgaW50ZXJlc3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgZmFjdG9yeSBmb3IgdGhlIG1pbWUgdHlwZSwgb3IgYHVuZGVmaW5lZGAuXG4gICAgICovXG4gICAgZ2V0RmFjdG9yeShtaW1lVHlwZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmFjdG9yaWVzW21pbWVUeXBlXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgcmVuZGVyZXIgZmFjdG9yeSB0byB0aGUgcmVuZGVybWltZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmYWN0b3J5IC0gVGhlIHJlbmRlcmVyIGZhY3Rvcnkgb2YgaW50ZXJlc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmFuayAtIFRoZSByYW5rIG9mIHRoZSByZW5kZXJlci4gQSBsb3dlciByYW5rIGluZGljYXRlc1xuICAgICAqICAgYSBoaWdoZXIgcHJpb3JpdHkgZm9yIHJlbmRlcmluZy4gSWYgbm90IGdpdmVuLCB0aGUgcmFuayB3aWxsXG4gICAgICogICBkZWZlciB0byB0aGUgYGRlZmF1bHRSYW5rYCBvZiB0aGUgZmFjdG9yeS4gIElmIG5vIGBkZWZhdWx0UmFua2BcbiAgICAgKiAgIGlzIGdpdmVuLCBpdCB3aWxsIGRlZmF1bHQgdG8gMTAwLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSByZW5kZXJlciB3aWxsIHJlcGxhY2UgYW4gZXhpc3RpbmcgcmVuZGVyZXIgZm9yIHRoZSBnaXZlblxuICAgICAqIG1pbWVUeXBlLlxuICAgICAqL1xuICAgIGFkZEZhY3RvcnkoZmFjdG9yeSwgcmFuaykge1xuICAgICAgICBpZiAocmFuayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByYW5rID0gZmFjdG9yeS5kZWZhdWx0UmFuaztcbiAgICAgICAgICAgIGlmIChyYW5rID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByYW5rID0gMTAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbXQgb2YgZmFjdG9yeS5taW1lVHlwZXMpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZhY3Rvcmllc1ttdF0gPSBmYWN0b3J5O1xuICAgICAgICAgICAgdGhpcy5fcmFua3NbbXRdID0geyByYW5rLCBpZDogdGhpcy5faWQrKyB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3R5cGVzID0gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgbWltZSB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1pbWVUeXBlIC0gVGhlIG1pbWUgdHlwZSBvZiBpbnRlcmVzdC5cbiAgICAgKi9cbiAgICByZW1vdmVNaW1lVHlwZShtaW1lVHlwZSkge1xuICAgICAgICBkZWxldGUgdGhpcy5fZmFjdG9yaWVzW21pbWVUeXBlXTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3JhbmtzW21pbWVUeXBlXTtcbiAgICAgICAgdGhpcy5fdHlwZXMgPSBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJhbmsgZm9yIGEgZ2l2ZW4gbWltZSB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1pbWVUeXBlIC0gVGhlIG1pbWUgdHlwZSBvZiBpbnRlcmVzdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSByYW5rIG9mIHRoZSBtaW1lIHR5cGUgb3IgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIGdldFJhbmsobWltZVR5cGUpIHtcbiAgICAgICAgY29uc3QgcmFuayA9IHRoaXMuX3JhbmtzW21pbWVUeXBlXTtcbiAgICAgICAgcmV0dXJuIHJhbmsgJiYgcmFuay5yYW5rO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHJhbmsgb2YgYSBnaXZlbiBtaW1lIHR5cGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWltZVR5cGUgLSBUaGUgbWltZSB0eXBlIG9mIGludGVyZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHJhbmsgLSBUaGUgbmV3IHJhbmsgdG8gYXNzaWduLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgaXMgYSBuby1vcCBpZiB0aGUgbWltZSB0eXBlIGlzIG5vdCByZWdpc3RlcmVkLlxuICAgICAqL1xuICAgIHNldFJhbmsobWltZVR5cGUsIHJhbmspIHtcbiAgICAgICAgaWYgKCF0aGlzLl9yYW5rc1ttaW1lVHlwZV0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpZCA9IHRoaXMuX2lkKys7XG4gICAgICAgIHRoaXMuX3JhbmtzW21pbWVUeXBlXSA9IHsgcmFuaywgaWQgfTtcbiAgICAgICAgdGhpcy5fdHlwZXMgPSBudWxsO1xuICAgIH1cbn1cbi8qKlxuICogVGhlIG5hbWVzcGFjZSBmb3IgYFJlbmRlck1pbWVSZWdpc3RyeWAgY2xhc3Mgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChSZW5kZXJNaW1lUmVnaXN0cnkpIHtcbiAgICAvKipcbiAgICAgKiBBIGRlZmF1bHQgcmVzb2x2ZXIgdGhhdCB1c2VzIGEgZ2l2ZW4gcmVmZXJlbmNlIHBhdGggYW5kIGEgY29udGVudHMgbWFuYWdlci5cbiAgICAgKi9cbiAgICBjbGFzcyBVcmxSZXNvbHZlciB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgYSBuZXcgdXJsIHJlc29sdmVyLlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGF0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhdGggPSBvcHRpb25zLnBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvcHRpb25zLnNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXNzaW9uID0gb3B0aW9ucy5zZXNzaW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRWl0aGVyICdwYXRoJyBvciAnc2Vzc2lvbicgbXVzdCBiZSBnaXZlbiBhcyBhIGNvbnN0cnVjdG9yIG9wdGlvblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnRzID0gb3B0aW9ucy5jb250ZW50cztcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHBhdGggb2YgdGhlIG9iamVjdCwgZnJvbSB3aGljaCBsb2NhbCB1cmxzIGNhbiBiZSBkZXJpdmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IHBhdGgoKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICByZXR1cm4gKF9hID0gdGhpcy5fcGF0aCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5fc2Vzc2lvbi5wYXRoO1xuICAgICAgICB9XG4gICAgICAgIHNldCBwYXRoKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9wYXRoID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlc29sdmUgYSByZWxhdGl2ZSB1cmwgdG8gYW4gYWJzb2x1dGUgdXJsIHBhdGguXG4gICAgICAgICAqL1xuICAgICAgICBhc3luYyByZXNvbHZlVXJsKHVybCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2NhbCh1cmwpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3dkID0gZW5jb2RlVVJJKFBhdGhFeHQuZGlybmFtZSh0aGlzLnBhdGgpKTtcbiAgICAgICAgICAgICAgICB1cmwgPSBQYXRoRXh0LnJlc29sdmUoY3dkLCB1cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBkb3dubG9hZCB1cmwgb2YgYSBnaXZlbiBhYnNvbHV0ZSB1cmwgcGF0aC5cbiAgICAgICAgICpcbiAgICAgICAgICogIyMjIyBOb3Rlc1xuICAgICAgICAgKiBUaGUgcmV0dXJuZWQgVVJMIG1heSBpbmNsdWRlIGEgcXVlcnkgcGFyYW1ldGVyLlxuICAgICAgICAgKi9cbiAgICAgICAgYXN5bmMgZ2V0RG93bmxvYWRVcmwodXJsUGF0aCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2NhbCh1cmxQYXRoKSkge1xuICAgICAgICAgICAgICAgIC8vIGRlY29kZSB1cmwtPnBhdGggYmVmb3JlIHBhc3NpbmcgdG8gY29udGVudHMgYXBpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRzLmdldERvd25sb2FkVXJsKGRlY29kZVVSSUNvbXBvbmVudCh1cmxQYXRoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXJsUGF0aDtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0aGUgVVJMIHNob3VsZCBiZSBoYW5kbGVkIGJ5IHRoZSByZXNvbHZlclxuICAgICAgICAgKiBvciBub3QuXG4gICAgICAgICAqXG4gICAgICAgICAqICMjIyMgTm90ZXNcbiAgICAgICAgICogVGhpcyBpcyBzaW1pbGFyIHRvIHRoZSBgaXNMb2NhbGAgY2hlY2sgaW4gYFVSTEV4dGAsXG4gICAgICAgICAqIGJ1dCBpdCBhbHNvIGNoZWNrcyB3aGV0aGVyIHRoZSBwYXRoIHBvaW50cyB0byBhbnlcbiAgICAgICAgICogb2YgdGhlIGBJRHJpdmVgcyB0aGF0IG1heSBiZSByZWdpc3RlcmVkIHdpdGggdGhlIGNvbnRlbnRzXG4gICAgICAgICAqIG1hbmFnZXIuXG4gICAgICAgICAqL1xuICAgICAgICBpc0xvY2FsKHVybCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNNYWxmb3JtZWQodXJsKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBVUkxFeHQuaXNMb2NhbCh1cmwpIHx8ICEhdGhpcy5fY29udGVudHMuZHJpdmVOYW1lKGRlY29kZVVSSSh1cmwpKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0aGUgVVJMIGNhbiBiZSBkZWNvZGVkIHVzaW5nIGBkZWNvZGVVUklgLlxuICAgICAgICAgKi9cbiAgICAgICAgaXNNYWxmb3JtZWQodXJsKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRlY29kZVVSSSh1cmwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFVSSUVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBSZW5kZXJNaW1lUmVnaXN0cnkuVXJsUmVzb2x2ZXIgPSBVcmxSZXNvbHZlcjtcbn0pKFJlbmRlck1pbWVSZWdpc3RyeSB8fCAoUmVuZGVyTWltZVJlZ2lzdHJ5ID0ge30pKTtcbi8qKlxuICogVGhlIG5hbWVzcGFjZSBmb3IgdGhlIG1vZHVsZSBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbWltZSB0eXBlcyBpbiB0aGUgbWFwLCBvcmRlcmVkIGJ5IHJhbmsuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc29ydGVkVHlwZXMobWFwKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhtYXApLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHAxID0gbWFwW2FdO1xuICAgICAgICAgICAgY29uc3QgcDIgPSBtYXBbYl07XG4gICAgICAgICAgICBpZiAocDEucmFuayAhPT0gcDIucmFuaykge1xuICAgICAgICAgICAgICAgIHJldHVybiBwMS5yYW5rIC0gcDIucmFuaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwMS5pZCAtIHAyLmlkO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgUHJpdmF0ZS5zb3J0ZWRUeXBlcyA9IHNvcnRlZFR5cGVzO1xuICAgIGZ1bmN0aW9uIHNlc3Npb25Db25uZWN0aW9uKHMpIHtcbiAgICAgICAgcmV0dXJuIHMuc2Vzc2lvbkNoYW5nZWRcbiAgICAgICAgICAgID8gcy5zZXNzaW9uXG4gICAgICAgICAgICA6IHM7XG4gICAgfVxuICAgIFByaXZhdGUuc2Vzc2lvbkNvbm5lY3Rpb24gPSBzZXNzaW9uQ29ubmVjdGlvbjtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVnaXN0cnkuanMubWFwIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBDb2RlTWlycm9yRWRpdG9yLCBNb2RlIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29kZW1pcnJvcic7XG5pbXBvcnQgeyBVUkxFeHQgfSBmcm9tICdAanVweXRlcmxhYi9jb3JldXRpbHMnO1xuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyB0b0FycmF5IH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IGVzY2FwZSBmcm9tICdsb2Rhc2guZXNjYXBlJztcbmltcG9ydCB7IG1hcmtlZCB9IGZyb20gJ21hcmtlZCc7XG5pbXBvcnQgeyByZW1vdmVNYXRoLCByZXBsYWNlTWF0aCB9IGZyb20gJy4vbGF0ZXgnO1xuLyoqXG4gKiBSZW5kZXIgSFRNTCBpbnRvIGEgaG9zdCBub2RlLlxuICpcbiAqIEBwYXJhbXMgb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZW5kZXJpbmcuXG4gKlxuICogQHJldHVybnMgQSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHdoZW4gcmVuZGVyaW5nIGlzIGNvbXBsZXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVySFRNTChvcHRpb25zKSB7XG4gICAgLy8gVW5wYWNrIHRoZSBvcHRpb25zLlxuICAgIGxldCB7IGhvc3QsIHNvdXJjZSwgdHJ1c3RlZCwgc2FuaXRpemVyLCByZXNvbHZlciwgbGlua0hhbmRsZXIsIHNob3VsZFR5cGVzZXQsIGxhdGV4VHlwZXNldHRlciwgdHJhbnNsYXRvciB9ID0gb3B0aW9ucztcbiAgICB0cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IgPT09IG51bGwgfHwgdHJhbnNsYXRvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgbGV0IG9yaWdpbmFsU291cmNlID0gc291cmNlO1xuICAgIC8vIEJhaWwgZWFybHkgaWYgdGhlIHNvdXJjZSBpcyBlbXB0eS5cbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICBob3N0LnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICB9XG4gICAgLy8gU2FuaXRpemUgdGhlIHNvdXJjZSBpZiBpdCBpcyBub3QgdHJ1c3RlZC4gVGhpcyByZW1vdmVzIGFsbFxuICAgIC8vIGA8c2NyaXB0PmAgdGFncyBhcyB3ZWxsIGFzIG90aGVyIHBvdGVudGlhbGx5IGhhcm1mdWwgSFRNTC5cbiAgICBpZiAoIXRydXN0ZWQpIHtcbiAgICAgICAgb3JpZ2luYWxTb3VyY2UgPSBgJHtzb3VyY2V9YDtcbiAgICAgICAgc291cmNlID0gc2FuaXRpemVyLnNhbml0aXplKHNvdXJjZSk7XG4gICAgfVxuICAgIC8vIFNldCB0aGUgaW5uZXIgSFRNTCBvZiB0aGUgaG9zdC5cbiAgICBob3N0LmlubmVySFRNTCA9IHNvdXJjZTtcbiAgICBpZiAoaG9zdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JykubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBJZiBvdXRwdXQgaXQgdHJ1c3RlZCwgZXZhbCBhbnkgc2NyaXB0IHRhZ3MgY29udGFpbmVkIGluIHRoZSBIVE1MLlxuICAgICAgICAvLyBUaGlzIGlzIG5vdCBkb25lIGF1dG9tYXRpY2FsbHkgYnkgdGhlIGJyb3dzZXIgd2hlbiBzY3JpcHQgdGFncyBhcmVcbiAgICAgICAgLy8gY3JlYXRlZCBieSBzZXR0aW5nIGBpbm5lckhUTUxgLlxuICAgICAgICBpZiAodHJ1c3RlZCkge1xuICAgICAgICAgICAgUHJpdmF0ZS5ldmFsSW5uZXJIVE1MU2NyaXB0VGFncyhob3N0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3Qgd2FybmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpO1xuICAgICAgICAgICAgd2FybmluZy50ZXh0Q29udGVudCA9IHRyYW5zLl9fKCdUaGlzIEhUTUwgb3V0cHV0IGNvbnRhaW5zIGlubGluZSBzY3JpcHRzLiBBcmUgeW91IHN1cmUgdGhhdCB5b3Ugd2FudCB0byBydW4gYXJiaXRyYXJ5IEphdmFzY3JpcHQgd2l0aGluIHlvdXIgSnVweXRlckxhYiBzZXNzaW9uPycpO1xuICAgICAgICAgICAgY29uc3QgcnVuQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBydW5CdXR0b24udGV4dENvbnRlbnQgPSB0cmFucy5fXygnUnVuJyk7XG4gICAgICAgICAgICBydW5CdXR0b24ub25jbGljayA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBob3N0LmlubmVySFRNTCA9IG9yaWdpbmFsU291cmNlO1xuICAgICAgICAgICAgICAgIFByaXZhdGUuZXZhbElubmVySFRNTFNjcmlwdFRhZ3MoaG9zdCk7XG4gICAgICAgICAgICAgICAgaWYgKGhvc3QuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICBob3N0LnJlbW92ZUNoaWxkKGhvc3QuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh3YXJuaW5nKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChydW5CdXR0b24pO1xuICAgICAgICAgICAgaG9zdC5pbnNlcnRCZWZvcmUoY29udGFpbmVyLCBob3N0LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEhhbmRsZSBkZWZhdWx0IGJlaGF2aW9yIG9mIG5vZGVzLlxuICAgIFByaXZhdGUuaGFuZGxlRGVmYXVsdHMoaG9zdCwgcmVzb2x2ZXIpO1xuICAgIC8vIFBhdGNoIHRoZSB1cmxzIGlmIGEgcmVzb2x2ZXIgaXMgYXZhaWxhYmxlLlxuICAgIGxldCBwcm9taXNlO1xuICAgIGlmIChyZXNvbHZlcikge1xuICAgICAgICBwcm9taXNlID0gUHJpdmF0ZS5oYW5kbGVVcmxzKGhvc3QsIHJlc29sdmVyLCBsaW5rSGFuZGxlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIC8vIFJldHVybiB0aGUgZmluYWwgcmVuZGVyZWQgcHJvbWlzZS5cbiAgICByZXR1cm4gcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKHNob3VsZFR5cGVzZXQgJiYgbGF0ZXhUeXBlc2V0dGVyKSB7XG4gICAgICAgICAgICBsYXRleFR5cGVzZXR0ZXIudHlwZXNldChob3N0KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBSZW5kZXIgYW4gaW1hZ2UgaW50byBhIGhvc3Qgbm9kZS5cbiAqXG4gKiBAcGFyYW1zIG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgcmVuZGVyaW5nLlxuICpcbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aGVuIHJlbmRlcmluZyBpcyBjb21wbGV0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckltYWdlKG9wdGlvbnMpIHtcbiAgICAvLyBVbnBhY2sgdGhlIG9wdGlvbnMuXG4gICAgY29uc3QgeyBob3N0LCBtaW1lVHlwZSwgc291cmNlLCB3aWR0aCwgaGVpZ2h0LCBuZWVkc0JhY2tncm91bmQsIHVuY29uZmluZWQgfSA9IG9wdGlvbnM7XG4gICAgLy8gQ2xlYXIgdGhlIGNvbnRlbnQgaW4gdGhlIGhvc3QuXG4gICAgaG9zdC50ZXh0Q29udGVudCA9ICcnO1xuICAgIC8vIENyZWF0ZSB0aGUgaW1hZ2UgZWxlbWVudC5cbiAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAvLyBTZXQgdGhlIHNvdXJjZSBvZiB0aGUgaW1hZ2UuXG4gICAgaW1nLnNyYyA9IGBkYXRhOiR7bWltZVR5cGV9O2Jhc2U2NCwke3NvdXJjZX1gO1xuICAgIC8vIFNldCB0aGUgc2l6ZSBvZiB0aGUgaW1hZ2UgaWYgcHJvdmlkZWQuXG4gICAgaWYgKHR5cGVvZiBoZWlnaHQgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGltZy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygd2lkdGggPT09ICdudW1iZXInKSB7XG4gICAgICAgIGltZy53aWR0aCA9IHdpZHRoO1xuICAgIH1cbiAgICBpZiAobmVlZHNCYWNrZ3JvdW5kID09PSAnbGlnaHQnKSB7XG4gICAgICAgIGltZy5jbGFzc0xpc3QuYWRkKCdqcC1uZWVkcy1saWdodC1iYWNrZ3JvdW5kJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG5lZWRzQmFja2dyb3VuZCA9PT0gJ2RhcmsnKSB7XG4gICAgICAgIGltZy5jbGFzc0xpc3QuYWRkKCdqcC1uZWVkcy1kYXJrLWJhY2tncm91bmQnKTtcbiAgICB9XG4gICAgaWYgKHVuY29uZmluZWQgPT09IHRydWUpIHtcbiAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoJ2pwLW1vZC11bmNvbmZpbmVkJyk7XG4gICAgfVxuICAgIC8vIEFkZCB0aGUgaW1hZ2UgdG8gdGhlIGhvc3QuXG4gICAgaG9zdC5hcHBlbmRDaGlsZChpbWcpO1xuICAgIC8vIFJldHVybiB0aGUgcmVuZGVyZWQgcHJvbWlzZS5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG59XG4vKipcbiAqIFJlbmRlciBMYVRlWCBpbnRvIGEgaG9zdCBub2RlLlxuICpcbiAqIEBwYXJhbXMgb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZW5kZXJpbmcuXG4gKlxuICogQHJldHVybnMgQSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHdoZW4gcmVuZGVyaW5nIGlzIGNvbXBsZXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyTGF0ZXgob3B0aW9ucykge1xuICAgIC8vIFVucGFjayB0aGUgb3B0aW9ucy5cbiAgICBjb25zdCB7IGhvc3QsIHNvdXJjZSwgc2hvdWxkVHlwZXNldCwgbGF0ZXhUeXBlc2V0dGVyIH0gPSBvcHRpb25zO1xuICAgIC8vIFNldCB0aGUgc291cmNlIG9uIHRoZSBub2RlLlxuICAgIGhvc3QudGV4dENvbnRlbnQgPSBzb3VyY2U7XG4gICAgLy8gVHlwZXNldCB0aGUgbm9kZSBpZiBuZWVkZWQuXG4gICAgaWYgKHNob3VsZFR5cGVzZXQgJiYgbGF0ZXhUeXBlc2V0dGVyKSB7XG4gICAgICAgIGxhdGV4VHlwZXNldHRlci50eXBlc2V0KGhvc3QpO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gdGhlIHJlbmRlcmVkIHByb21pc2UuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xufVxuLyoqXG4gKiBSZW5kZXIgTWFya2Rvd24gaW50byBhIGhvc3Qgbm9kZS5cbiAqXG4gKiBAcGFyYW1zIG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgcmVuZGVyaW5nLlxuICpcbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aGVuIHJlbmRlcmluZyBpcyBjb21wbGV0ZS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbmRlck1hcmtkb3duKG9wdGlvbnMpIHtcbiAgICAvLyBVbnBhY2sgdGhlIG9wdGlvbnMuXG4gICAgY29uc3QgeyBob3N0LCBzb3VyY2UgfSA9IG9wdGlvbnMsIG90aGVycyA9IF9fcmVzdChvcHRpb25zLCBbXCJob3N0XCIsIFwic291cmNlXCJdKTtcbiAgICAvLyBDbGVhciB0aGUgY29udGVudCBpZiB0aGVyZSBpcyBubyBzb3VyY2UuXG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgaG9zdC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFNlcGFyYXRlIG1hdGggZnJvbSBub3JtYWwgbWFya2Rvd24gdGV4dC5cbiAgICBjb25zdCBwYXJ0cyA9IHJlbW92ZU1hdGgoc291cmNlKTtcbiAgICAvLyBDb252ZXJ0IHRoZSBtYXJrZG93biB0byBIVE1MLlxuICAgIGxldCBodG1sID0gYXdhaXQgUHJpdmF0ZS5yZW5kZXJNYXJrZWQocGFydHNbJ3RleHQnXSk7XG4gICAgLy8gUmVwbGFjZSBtYXRoLlxuICAgIGh0bWwgPSByZXBsYWNlTWF0aChodG1sLCBwYXJ0c1snbWF0aCddKTtcbiAgICAvLyBSZW5kZXIgSFRNTC5cbiAgICBhd2FpdCByZW5kZXJIVE1MKE9iamVjdC5hc3NpZ24oeyBob3N0LCBzb3VyY2U6IGh0bWwgfSwgb3RoZXJzKSk7XG4gICAgLy8gQXBwbHkgaWRzIHRvIHRoZSBoZWFkZXIgbm9kZXMuXG4gICAgUHJpdmF0ZS5oZWFkZXJBbmNob3JzKGhvc3QpO1xufVxuLyoqXG4gKiBSZW5kZXIgU1ZHIGludG8gYSBob3N0IG5vZGUuXG4gKlxuICogQHBhcmFtcyBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHJlbmRlcmluZy5cbiAqXG4gKiBAcmV0dXJucyBBIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2hlbiByZW5kZXJpbmcgaXMgY29tcGxldGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTVkcob3B0aW9ucykge1xuICAgIC8vIFVucGFjayB0aGUgb3B0aW9ucy5cbiAgICBsZXQgeyBob3N0LCBzb3VyY2UsIHRydXN0ZWQsIHVuY29uZmluZWQgfSA9IG9wdGlvbnM7XG4gICAgLy8gQ2xlYXIgdGhlIGNvbnRlbnQgaWYgdGhlcmUgaXMgbm8gc291cmNlLlxuICAgIGlmICghc291cmNlKSB7XG4gICAgICAgIGhvc3QudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIH1cbiAgICAvLyBEaXNwbGF5IGEgbWVzc2FnZSBpZiB0aGUgc291cmNlIGlzIG5vdCB0cnVzdGVkLlxuICAgIGlmICghdHJ1c3RlZCkge1xuICAgICAgICBob3N0LnRleHRDb250ZW50ID1cbiAgICAgICAgICAgICdDYW5ub3QgZGlzcGxheSBhbiB1bnRydXN0ZWQgU1ZHLiBNYXliZSB5b3UgbmVlZCB0byBydW4gdGhlIGNlbGw/JztcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIH1cbiAgICAvLyBBZGQgbWlzc2luZyBTVkcgbmFtZXNwYWNlIChpZiBhY3R1YWxseSBtaXNzaW5nKVxuICAgIGNvbnN0IHBhdHQgPSAnPHN2Z1tePl0reG1sbnM9W14+XStzdmcnO1xuICAgIGlmIChzb3VyY2Uuc2VhcmNoKHBhdHQpIDwgMCkge1xuICAgICAgICBzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSgnPHN2ZycsICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIicpO1xuICAgIH1cbiAgICAvLyBSZW5kZXIgaW4gaW1nIHNvIHRoYXQgdXNlciBjYW4gc2F2ZSBpdCBlYXNpbHlcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcuc3JjID0gYGRhdGE6aW1hZ2Uvc3ZnK3htbCwke2VuY29kZVVSSUNvbXBvbmVudChzb3VyY2UpfWA7XG4gICAgaG9zdC5hcHBlbmRDaGlsZChpbWcpO1xuICAgIGlmICh1bmNvbmZpbmVkID09PSB0cnVlKSB7XG4gICAgICAgIGhvc3QuY2xhc3NMaXN0LmFkZCgnanAtbW9kLXVuY29uZmluZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xufVxuLyoqXG4gKiBSZXBsYWNlIFVSTHMgd2l0aCBsaW5rcy5cbiAqXG4gKiBAcGFyYW0gY29udGVudCAtIFRoZSB0ZXh0IGNvbnRlbnQgb2YgYSBub2RlLlxuICpcbiAqIEByZXR1cm5zIEEgbGlzdCBvZiB0ZXh0IG5vZGVzIGFuZCBhbmNob3IgZWxlbWVudHMuXG4gKi9cbmZ1bmN0aW9uIGF1dG9saW5rKGNvbnRlbnQpIHtcbiAgICAvLyBUYWtlbiBmcm9tIFZpc3VhbCBTdHVkaW8gQ29kZTpcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L3ZzY29kZS9ibG9iLzlmNzA5ZDE3MGIwNmU5OTE1MDIxNTNmMjgxZWMzYzAxMmFkZDJlNDIvc3JjL3ZzL3dvcmtiZW5jaC9jb250cmliL2RlYnVnL2Jyb3dzZXIvbGlua0RldGVjdG9yLnRzI0wxNy1MMThcbiAgICBjb25zdCBjb250cm9sQ29kZXMgPSAnXFxcXHUwMDAwLVxcXFx1MDAyMFxcXFx1MDA3Zi1cXFxcdTAwOWYnO1xuICAgIGNvbnN0IHdlYkxpbmtSZWdleCA9IG5ldyBSZWdFeHAoJyg/OlthLXpBLVpdW2EtekEtWjAtOSsuLV17Mix9OlxcXFwvXFxcXC98ZGF0YTp8d3d3XFxcXC4pW15cXFxccycgK1xuICAgICAgICBjb250cm9sQ29kZXMgK1xuICAgICAgICAnXCJdezIsfVteXFxcXHMnICtcbiAgICAgICAgY29udHJvbENvZGVzICtcbiAgICAgICAgJ1wiXFwnKCl7fVxcXFxbXFxcXF0sOjsuIT9dJywgJ3VnJyk7XG4gICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICBsZXQgbGFzdEluZGV4ID0gMDtcbiAgICBsZXQgbWF0Y2g7XG4gICAgd2hpbGUgKG51bGwgIT0gKG1hdGNoID0gd2ViTGlua1JlZ2V4LmV4ZWMoY29udGVudCkpKSB7XG4gICAgICAgIGlmIChtYXRjaC5pbmRleCAhPT0gbGFzdEluZGV4KSB7XG4gICAgICAgICAgICBub2Rlcy5wdXNoKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQuc2xpY2UobGFzdEluZGV4LCBtYXRjaC5pbmRleCkpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdXJsID0gbWF0Y2hbMF07XG4gICAgICAgIC8vIFNwZWNpYWwgY2FzZSB3aGVuIHRoZSBVUkwgZW5kcyB3aXRoIFwiPlwiIG9yIFwiPFwiXG4gICAgICAgIGNvbnN0IGxhc3RDaGFycyA9IHVybC5zbGljZSgtMSk7XG4gICAgICAgIGNvbnN0IGVuZHNXaXRoR3RMdCA9IFsnPicsICc8J10uaW5kZXhPZihsYXN0Q2hhcnMpICE9PSAtMTtcbiAgICAgICAgY29uc3QgbGVuID0gZW5kc1dpdGhHdEx0ID8gdXJsLmxlbmd0aCAtIDEgOiB1cmwubGVuZ3RoO1xuICAgICAgICBjb25zdCBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIHVybCA9IHVybC5zbGljZSgwLCBsZW4pO1xuICAgICAgICBhbmNob3IuaHJlZiA9IHVybC5zdGFydHNXaXRoKCd3d3cuJykgPyAnaHR0cHM6Ly8nICsgdXJsIDogdXJsO1xuICAgICAgICBhbmNob3IucmVsID0gJ25vb3BlbmVyJztcbiAgICAgICAgYW5jaG9yLnRhcmdldCA9ICdfYmxhbmsnO1xuICAgICAgICBhbmNob3IuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodXJsLnNsaWNlKDAsIGxlbikpKTtcbiAgICAgICAgbm9kZXMucHVzaChhbmNob3IpO1xuICAgICAgICBsYXN0SW5kZXggPSBtYXRjaC5pbmRleCArIGxlbjtcbiAgICB9XG4gICAgaWYgKGxhc3RJbmRleCAhPT0gY29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgbm9kZXMucHVzaChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50LnNsaWNlKGxhc3RJbmRleCwgY29udGVudC5sZW5ndGgpKSk7XG4gICAgfVxuICAgIHJldHVybiBub2Rlcztcbn1cbi8qKlxuICogU3BsaXQgYSBzaGFsbG93IG5vZGUgKG5vZGUgd2l0aG91dCBuZXN0ZWQgbm9kZXMgaW5zaWRlKSBhdCBhIGdpdmVuIHRleHQgY29udGVudCBwb3NpdGlvbi5cbiAqXG4gKiBAcGFyYW0gbm9kZSB0aGUgc2hhbGxvdyBub2RlIHRvIGJlIHNwbGl0XG4gKiBAcGFyYW0gYXQgdGhlIHBvc2l0aW9uIGluIHRleHRDb250ZW50IGF0IHdoaWNoIHRoZSBzcGxpdCBzaG91bGQgb2NjdXJcbiAqL1xuZnVuY3Rpb24gc3BsaXRTaGFsbG93Tm9kZShub2RlLCBhdCkge1xuICAgIHZhciBfYSwgX2I7XG4gICAgY29uc3QgcHJlID0gbm9kZS5jbG9uZU5vZGUoKTtcbiAgICBwcmUudGV4dENvbnRlbnQgPSAoX2EgPSBub2RlLnRleHRDb250ZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc3Vic3RyKDAsIGF0KTtcbiAgICBjb25zdCBwb3N0ID0gbm9kZS5jbG9uZU5vZGUoKTtcbiAgICBwb3N0LnRleHRDb250ZW50ID0gKF9iID0gbm9kZS50ZXh0Q29udGVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnN1YnN0cihhdCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJlOiBwcmUsXG4gICAgICAgIHBvc3Q6IHBvc3RcbiAgICB9O1xufVxuLyoqXG4gKiBSZW5kZXIgdGV4dCBpbnRvIGEgaG9zdCBub2RlLlxuICpcbiAqIEBwYXJhbXMgb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZW5kZXJpbmcuXG4gKlxuICogQHJldHVybnMgQSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHdoZW4gcmVuZGVyaW5nIGlzIGNvbXBsZXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyVGV4dChvcHRpb25zKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICAvLyBVbnBhY2sgdGhlIG9wdGlvbnMuXG4gICAgY29uc3QgeyBob3N0LCBzYW5pdGl6ZXIsIHNvdXJjZSB9ID0gb3B0aW9ucztcbiAgICAvLyBDcmVhdGUgdGhlIEhUTUwgY29udGVudC5cbiAgICBjb25zdCBjb250ZW50ID0gc2FuaXRpemVyLnNhbml0aXplKFByaXZhdGUuYW5zaVNwYW4oc291cmNlKSwge1xuICAgICAgICBhbGxvd2VkVGFnczogWydzcGFuJ11cbiAgICB9KTtcbiAgICAvLyBTZXQgdGhlIHNhbml0aXplZCBjb250ZW50IGZvciB0aGUgaG9zdCBub2RlLlxuICAgIGNvbnN0IHByZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpO1xuICAgIHByZS5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIGNvbnN0IHByZVRleHRDb250ZW50ID0gcHJlLnRleHRDb250ZW50O1xuICAgIGlmIChwcmVUZXh0Q29udGVudCkge1xuICAgICAgICAvLyBOb3RlOiBvbmx5IHRleHQgbm9kZXMgYW5kIHNwYW4gZWxlbWVudHMgc2hvdWxkIGJlIHByZXNlbnQgYWZ0ZXIgc2FuaXRpemF0aW9uIGluIHRoZSBgPHByZT5gIGVsZW1lbnQuXG4gICAgICAgIGNvbnN0IGxpbmtlZE5vZGVzID0gYXV0b2xpbmsocHJlVGV4dENvbnRlbnQpO1xuICAgICAgICBsZXQgaW5BbmNob3JFbGVtZW50ID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGNvbWJpbmVkTm9kZXMgPSBbXTtcbiAgICAgICAgY29uc3QgcHJlTm9kZXMgPSBBcnJheS5mcm9tKHByZS5jaGlsZE5vZGVzKTtcbiAgICAgICAgd2hpbGUgKHByZU5vZGVzLmxlbmd0aCAmJiBsaW5rZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIFVzZSBub24tbnVsbCBhc3NlcnRpb25zIHRvIHdvcmthcm91bmQgVHlwZVNjcmlwdCBjb250ZXh0IGF3YXJlbmVzcyBsaW1pdGF0aW9uXG4gICAgICAgICAgICAvLyAoaWYgYW55IG9mIHRoZSBhcnJheXMgd2VyZSBlbXB0eSwgd2Ugd291bGQgbm90IGVudGVyIHRoZSBib2R5IG9mIHRoZSBsb29wKS5cbiAgICAgICAgICAgIGxldCBwcmVOb2RlID0gcHJlTm9kZXMuc2hpZnQoKTtcbiAgICAgICAgICAgIGxldCBsaW5rTm9kZSA9IGxpbmtlZE5vZGVzLnNoaWZ0KCk7XG4gICAgICAgICAgICAvLyBUaGlzIHNob3VsZCBuZXZlciBoYXBwZW4gYmVjYXVzZSB3ZSBtb2RpZnkgdGhlIGFycmF5cyBpbiBmbGlnaHQgc28gdGhleSBzaG91bGQgZW5kIHNpbXVsdGFuZW91c2x5LFxuICAgICAgICAgICAgLy8gYnV0IHRoaXMgbWFrZXMgdGhlIGNvZGluZyBhc3Npc3RhbmNlIGhhcHB5IGFuZCBtaWdodCBtYWtlIGl0IGVhc2llciB0byBjb25jZXB0dWFsaXplLlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcmVOb2RlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGNvbWJpbmVkTm9kZXMucHVzaChsaW5rTm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGxpbmtOb2RlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGNvbWJpbmVkTm9kZXMucHVzaChwcmVOb2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwcmVMZW4gPSAoX2EgPSBwcmVOb2RlLnRleHRDb250ZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IGxpbmtMZW4gPSAoX2IgPSBsaW5rTm9kZS50ZXh0Q29udGVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChwcmVMZW4gJiYgbGlua0xlbikge1xuICAgICAgICAgICAgICAgIGlmIChwcmVMZW4gPiBsaW5rTGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNwbGl0IHByZSBub2RlIGFuZCBvbmx5IGtlZXAgdGhlIHNob3J0ZXIgcGFydFxuICAgICAgICAgICAgICAgICAgICBsZXQgeyBwcmU6IGtlZXAsIHBvc3Q6IHBvc3Rwb25lIH0gPSBzcGxpdFNoYWxsb3dOb2RlKHByZU5vZGUsIGxpbmtMZW4pO1xuICAgICAgICAgICAgICAgICAgICBwcmVOb2Rlcy51bnNoaWZ0KHBvc3Rwb25lKTtcbiAgICAgICAgICAgICAgICAgICAgcHJlTm9kZSA9IGtlZXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxpbmtMZW4gPiBwcmVMZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHsgcHJlOiBrZWVwLCBwb3N0OiBwb3N0cG9uZSB9ID0gc3BsaXRTaGFsbG93Tm9kZShsaW5rTm9kZSwgcHJlTGVuKTtcbiAgICAgICAgICAgICAgICAgICAgbGlua2VkTm9kZXMudW5zaGlmdChwb3N0cG9uZSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmtOb2RlID0ga2VlcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBsYXN0Q29tYmluZWQgPSBjb21iaW5lZE5vZGVzW2NvbWJpbmVkTm9kZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAvLyBJZiB3ZSBhcmUgYWxyZWFkeSBpbiBhbiBhbmNob3IgZWxlbWVudCBhbmQgdGhlIGFuY2hvciBlbGVtZW50IGRpZCBub3QgY2hhbmdlLFxuICAgICAgICAgICAgLy8gd2Ugc2hvdWxkIGluc2VydCB0aGUgbm9kZSBmcm9tIDxwcmU+IHdoaWNoIGlzIGVpdGhlciBUZXh0IG5vZGUgb3IgY29sb3VyZWQgc3BhbiBFbGVtZW50XG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBhbmNob3IgY29udGVudCBhcyBhIGNoaWxkXG4gICAgICAgICAgICBpZiAoaW5BbmNob3JFbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgbGlua05vZGUuaHJlZiA9PT1cbiAgICAgICAgICAgICAgICAgICAgbGFzdENvbWJpbmVkLmhyZWYpIHtcbiAgICAgICAgICAgICAgICBsYXN0Q29tYmluZWQuYXBwZW5kQ2hpbGQocHJlTm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB0aGUgYGxpbmtOb2RlYCBpcyBlaXRoZXIgVGV4dCBvciBBbmNob3JFbGVtZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzQW5jaG9yID0gbGlua05vZGUubm9kZVR5cGUgIT09IE5vZGUuVEVYVF9OT0RFO1xuICAgICAgICAgICAgICAgIC8vIGlmIHdlIGFyZSBOT1QgYWJvdXQgdG8gc3RhcnQgYW4gYW5jaG9yIGVsZW1lbnQsIGp1c3QgYWRkIHRoZSBwcmUgTm9kZVxuICAgICAgICAgICAgICAgIGlmICghaXNBbmNob3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tYmluZWROb2Rlcy5wdXNoKHByZU5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBpbkFuY2hvckVsZW1lbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSBzdGFydCBhIG5ldyBhbmNob3I7IHRoZSBjb250ZW50cyBvZiB0aGUgYGxpbmtOb2RlYCBhbmQgYHByZU5vZGVgIHNob3VsZCBiZSB0aGUgc2FtZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gc28gd2UganVzdCBwdXQgdGhlIG5lYXRseSBmb3JtYXR0ZWQgYHByZU5vZGVgIGluc2lkZSB0aGUgYW5jaG9yIG5vZGUgKGBsaW5rTm9kZWApXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuZCBhcHBlbmQgdGhhdCB0byBjb21iaW5lZCBub2Rlcy5cbiAgICAgICAgICAgICAgICAgICAgbGlua05vZGUudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgbGlua05vZGUuYXBwZW5kQ2hpbGQocHJlTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkTm9kZXMucHVzaChsaW5rTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGluQW5jaG9yRWxlbWVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE86IHJlcGxhY2Ugd2l0aCBgLnJlcGxhY2VDaGlsZHJlbigpYCBvbmNlIHRoZSB0YXJnZXQgRVMgdmVyc2lvbiBhbGxvd3MgaXRcbiAgICAgICAgcHJlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNvbWJpbmVkTm9kZXMpIHtcbiAgICAgICAgICAgIHByZS5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaG9zdC5hcHBlbmRDaGlsZChwcmUpO1xuICAgIC8vIFJldHVybiB0aGUgcmVuZGVyZWQgcHJvbWlzZS5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG59XG4vKipcbiAqIFRoZSBuYW1lc3BhY2UgZm9yIG1vZHVsZSBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEV2YWwgdGhlIHNjcmlwdCB0YWdzIGNvbnRhaW5lZCBpbiBhIGhvc3QgcG9wdWxhdGVkIGJ5IGBpbm5lckhUTUxgLlxuICAgICAqXG4gICAgICogV2hlbiBzY3JpcHQgdGFncyBhcmUgY3JlYXRlZCB2aWEgYGlubmVySFRNTGAsIHRoZSBicm93c2VyIGRvZXMgbm90XG4gICAgICogZXZhbHVhdGUgdGhlbSB3aGVuIHRoZXkgYXJlIGFkZGVkIHRvIHRoZSBwYWdlLiBUaGlzIGZ1bmN0aW9uIHdvcmtzXG4gICAgICogYXJvdW5kIHRoYXQgYnkgY3JlYXRpbmcgbmV3IGVxdWl2YWxlbnQgc2NyaXB0IG5vZGVzIG1hbnVhbGx5LCBhbmRcbiAgICAgKiByZXBsYWNpbmcgdGhlIG9yaWdpbmFscy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBldmFsSW5uZXJIVE1MU2NyaXB0VGFncyhob3N0KSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIHNuYXBzaG90IG9mIHRoZSBjdXJyZW50IHNjcmlwdCBub2Rlcy5cbiAgICAgICAgY29uc3Qgc2NyaXB0cyA9IHRvQXJyYXkoaG9zdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JykpO1xuICAgICAgICAvLyBMb29wIG92ZXIgZWFjaCBzY3JpcHQgbm9kZS5cbiAgICAgICAgZm9yIChjb25zdCBzY3JpcHQgb2Ygc2NyaXB0cykge1xuICAgICAgICAgICAgLy8gU2tpcCBhbnkgc2NyaXB0cyB3aGljaCBubyBsb25nZXIgaGF2ZSBhIHBhcmVudC5cbiAgICAgICAgICAgIGlmICghc2NyaXB0LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBzY3JpcHQgbm9kZSB3aGljaCB3aWxsIGJlIGNsb25lLlxuICAgICAgICAgICAgY29uc3QgY2xvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgIC8vIENvcHkgdGhlIGF0dHJpYnV0ZXMgaW50byB0aGUgY2xvbmUuXG4gICAgICAgICAgICBjb25zdCBhdHRycyA9IHNjcmlwdC5hdHRyaWJ1dGVzO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBhdHRycy5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG5hbWUsIHZhbHVlIH0gPSBhdHRyc1tpXTtcbiAgICAgICAgICAgICAgICBjbG9uZS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ29weSB0aGUgdGV4dCBjb250ZW50IGludG8gdGhlIGNsb25lLlxuICAgICAgICAgICAgY2xvbmUudGV4dENvbnRlbnQgPSBzY3JpcHQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAvLyBSZXBsYWNlIHRoZSBvbGQgc2NyaXB0IGluIHRoZSBwYXJlbnQuXG4gICAgICAgICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY2xvbmUsIHNjcmlwdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUHJpdmF0ZS5ldmFsSW5uZXJIVE1MU2NyaXB0VGFncyA9IGV2YWxJbm5lckhUTUxTY3JpcHRUYWdzO1xuICAgIC8qKlxuICAgICAqIFJlbmRlciBtYXJrZG93biBmb3IgdGhlIHNwZWNpZmllZCBjb250ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRlbnQgLSBUaGUgc3RyaW5nIG9mIG1hcmtkb3duIHRvIHJlbmRlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gQSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHdpdGggdGhlIHJlbmRlcmVkIGNvbnRlbnQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVuZGVyTWFya2VkKGNvbnRlbnQpIHtcbiAgICAgICAgaW5pdGlhbGl6ZU1hcmtlZCgpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbWFya2VkKGNvbnRlbnQsIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFByaXZhdGUucmVuZGVyTWFya2VkID0gcmVuZGVyTWFya2VkO1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiBub2Rlcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoYW5kbGVEZWZhdWx0cyhub2RlLCByZXNvbHZlcikge1xuICAgICAgICAvLyBIYW5kbGUgYW5jaG9yIGVsZW1lbnRzLlxuICAgICAgICBjb25zdCBhbmNob3JzID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFuY2hvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsID0gYW5jaG9yc1tpXTtcbiAgICAgICAgICAgIC8vIHNraXAgd2hlbiBwcm9jZXNzaW5nIGEgZWxlbWVudHMgaW5zaWRlIHN2Z1xuICAgICAgICAgICAgLy8gd2hpY2ggYXJlIG9mIHR5cGUgU1ZHQW5pbWF0ZWRTdHJpbmdcbiAgICAgICAgICAgIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwYXRoID0gZWwuaHJlZjtcbiAgICAgICAgICAgIGNvbnN0IGlzTG9jYWwgPSByZXNvbHZlciAmJiByZXNvbHZlci5pc0xvY2FsXG4gICAgICAgICAgICAgICAgPyByZXNvbHZlci5pc0xvY2FsKHBhdGgpXG4gICAgICAgICAgICAgICAgOiBVUkxFeHQuaXNMb2NhbChwYXRoKTtcbiAgICAgICAgICAgIC8vIHNldCB0YXJnZXQgYXR0cmlidXRlIGlmIG5vdCBhbHJlYWR5IHByZXNlbnRcbiAgICAgICAgICAgIGlmICghZWwudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZWwudGFyZ2V0ID0gaXNMb2NhbCA/ICdfc2VsZicgOiAnX2JsYW5rJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNldCByZWwgYXMgJ25vb3BlbmVyJyBmb3Igbm9uLWxvY2FsIGFuY2hvcnNcbiAgICAgICAgICAgIGlmICghaXNMb2NhbCkge1xuICAgICAgICAgICAgICAgIGVsLnJlbCA9ICdub29wZW5lcic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIGltYWdlIGVsZW1lbnRzLlxuICAgICAgICBjb25zdCBpbWdzID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCFpbWdzW2ldLmFsdCkge1xuICAgICAgICAgICAgICAgIGltZ3NbaV0uYWx0ID0gJ0ltYWdlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBQcml2YXRlLmhhbmRsZURlZmF1bHRzID0gaGFuZGxlRGVmYXVsdHM7XG4gICAgLyoqXG4gICAgICogUmVzb2x2ZSB0aGUgcmVsYXRpdmUgdXJscyBpbiBlbGVtZW50IGBzcmNgIGFuZCBgaHJlZmAgYXR0cmlidXRlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIC0gVGhlIGhlYWQgaHRtbCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc29sdmVyIC0gQSB1cmwgcmVzb2x2ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlua0hhbmRsZXIgLSBBbiBvcHRpb25hbCBsaW5rIGhhbmRsZXIgZm9yIG5vZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgYSBwcm9taXNlIGZ1bGZpbGxlZCB3aGVuIHRoZSByZWxhdGl2ZSB1cmxzIGhhdmUgYmVlbiByZXNvbHZlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoYW5kbGVVcmxzKG5vZGUsIHJlc29sdmVyLCBsaW5rSGFuZGxlcikge1xuICAgICAgICAvLyBTZXQgdXAgYW4gYXJyYXkgdG8gY29sbGVjdCBwcm9taXNlcy5cbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgLy8gSGFuZGxlIEhUTUwgRWxlbWVudHMgd2l0aCBzcmMgYXR0cmlidXRlcy5cbiAgICAgICAgY29uc3Qgbm9kZXMgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJypbc3JjXScpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKGhhbmRsZUF0dHIobm9kZXNbaV0sICdzcmMnLCByZXNvbHZlcikpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEhhbmRsZSBhbmNob3IgZWxlbWVudHMuXG4gICAgICAgIGNvbnN0IGFuY2hvcnMgPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYW5jaG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChoYW5kbGVBbmNob3IoYW5jaG9yc1tpXSwgcmVzb2x2ZXIsIGxpbmtIYW5kbGVyKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIGxpbmsgZWxlbWVudHMuXG4gICAgICAgIGNvbnN0IGxpbmtzID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGluaycpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKGhhbmRsZUF0dHIobGlua3NbaV0sICdocmVmJywgcmVzb2x2ZXIpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXYWl0IG9uIGFsbCBwcm9taXNlcy5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIFByaXZhdGUuaGFuZGxlVXJscyA9IGhhbmRsZVVybHM7XG4gICAgLyoqXG4gICAgICogQXBwbHkgaWRzIHRvIGhlYWRlcnMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGVhZGVyQW5jaG9ycyhub2RlKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgaGVhZGVyTmFtZXMgPSBbJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2J107XG4gICAgICAgIGZvciAoY29uc3QgaGVhZGVyVHlwZSBvZiBoZWFkZXJOYW1lcykge1xuICAgICAgICAgICAgY29uc3QgaGVhZGVycyA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoaGVhZGVyVHlwZSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBoZWFkZXJzW2ldO1xuICAgICAgICAgICAgICAgIGhlYWRlci5pZCA9ICgoX2EgPSBoZWFkZXIudGV4dENvbnRlbnQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcnKS5yZXBsYWNlKC8gL2csICctJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgICAgIGFuY2hvci50YXJnZXQgPSAnX3NlbGYnO1xuICAgICAgICAgICAgICAgIGFuY2hvci50ZXh0Q29udGVudCA9ICfCtic7XG4gICAgICAgICAgICAgICAgYW5jaG9yLmhyZWYgPSAnIycgKyBoZWFkZXIuaWQ7XG4gICAgICAgICAgICAgICAgYW5jaG9yLmNsYXNzTGlzdC5hZGQoJ2pwLUludGVybmFsQW5jaG9yTGluaycpO1xuICAgICAgICAgICAgICAgIGhlYWRlci5hcHBlbmRDaGlsZChhbmNob3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFByaXZhdGUuaGVhZGVyQW5jaG9ycyA9IGhlYWRlckFuY2hvcnM7XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgbm9kZSB3aXRoIGEgYHNyY2Agb3IgYGhyZWZgIGF0dHJpYnV0ZS5cbiAgICAgKi9cbiAgICBhc3luYyBmdW5jdGlvbiBoYW5kbGVBdHRyKG5vZGUsIG5hbWUsIHJlc29sdmVyKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IG5vZGUuZ2V0QXR0cmlidXRlKG5hbWUpIHx8ICcnO1xuICAgICAgICBjb25zdCBpc0xvY2FsID0gcmVzb2x2ZXIuaXNMb2NhbFxuICAgICAgICAgICAgPyByZXNvbHZlci5pc0xvY2FsKHNvdXJjZSlcbiAgICAgICAgICAgIDogVVJMRXh0LmlzTG9jYWwoc291cmNlKTtcbiAgICAgICAgaWYgKCFzb3VyY2UgfHwgIWlzTG9jYWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdXJsUGF0aCA9IGF3YWl0IHJlc29sdmVyLnJlc29sdmVVcmwoc291cmNlKTtcbiAgICAgICAgICAgIGxldCB1cmwgPSBhd2FpdCByZXNvbHZlci5nZXREb3dubG9hZFVybCh1cmxQYXRoKTtcbiAgICAgICAgICAgIGlmIChVUkxFeHQucGFyc2UodXJsKS5wcm90b2NvbCAhPT0gJ2RhdGE6Jykge1xuICAgICAgICAgICAgICAgIC8vIEJ1c3QgY2FjaGluZyBmb3IgbG9jYWwgc3JjIGF0dHJzLlxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9YTUxIdHRwUmVxdWVzdC9Vc2luZ19YTUxIdHRwUmVxdWVzdCNCeXBhc3NpbmdfdGhlX2NhY2hlXG4gICAgICAgICAgICAgICAgdXJsICs9ICgvXFw/Ly50ZXN0KHVybCkgPyAnJicgOiAnPycpICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCB1cmwpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlIHdhcyBhbiBlcnJvciBnZXR0aW5nIHRoZSB1cmwsXG4gICAgICAgICAgICAvLyBqdXN0IG1ha2UgaXQgYW4gZW1wdHkgbGluayBhbmQgcmVwb3J0IHRoZSBlcnJvci5cbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKG5hbWUsICcnKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYW4gYW5jaG9yIG5vZGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFuZGxlQW5jaG9yKGFuY2hvciwgcmVzb2x2ZXIsIGxpbmtIYW5kbGVyKSB7XG4gICAgICAgIC8vIEdldCB0aGUgbGluayBwYXRoIHdpdGhvdXQgdGhlIGxvY2F0aW9uIHByZXBlbmRlZC5cbiAgICAgICAgLy8gKGUuZy4gXCIuL2Zvby5tZCNIZWFkZXIgMVwiIHZzIFwiaHR0cDovL2xvY2FsaG9zdDo4ODg4L2Zvby5tZCNIZWFkZXIgMVwiKVxuICAgICAgICBsZXQgaHJlZiA9IGFuY2hvci5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCAnJztcbiAgICAgICAgY29uc3QgaXNMb2NhbCA9IHJlc29sdmVyLmlzTG9jYWxcbiAgICAgICAgICAgID8gcmVzb2x2ZXIuaXNMb2NhbChocmVmKVxuICAgICAgICAgICAgOiBVUkxFeHQuaXNMb2NhbChocmVmKTtcbiAgICAgICAgLy8gQmFpbCBpZiBpdCBpcyBub3QgYSBmaWxlLWxpa2UgdXJsLlxuICAgICAgICBpZiAoIWhyZWYgfHwgIWlzTG9jYWwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZW1vdmUgdGhlIGhhc2ggdW50aWwgd2UgY2FuIGhhbmRsZSBpdC5cbiAgICAgICAgY29uc3QgaGFzaCA9IGFuY2hvci5oYXNoO1xuICAgICAgICBpZiAoaGFzaCkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGludGVybmFsIGxpbmsgaW4gdGhlIGZpbGUuXG4gICAgICAgICAgICBpZiAoaGFzaCA9PT0gaHJlZikge1xuICAgICAgICAgICAgICAgIGFuY2hvci50YXJnZXQgPSAnX3NlbGYnO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEZvciBleHRlcm5hbCBsaW5rcywgcmVtb3ZlIHRoZSBoYXNoIHVudGlsIHdlIGhhdmUgaGFzaCBoYW5kbGluZy5cbiAgICAgICAgICAgIGhyZWYgPSBocmVmLnJlcGxhY2UoaGFzaCwgJycpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdldCB0aGUgYXBwcm9wcmlhdGUgZmlsZSBwYXRoLlxuICAgICAgICByZXR1cm4gcmVzb2x2ZXJcbiAgICAgICAgICAgIC5yZXNvbHZlVXJsKGhyZWYpXG4gICAgICAgICAgICAudGhlbih1cmxQYXRoID0+IHtcbiAgICAgICAgICAgIC8vIGRlY29kZSBlbmNvZGVkIHVybCBmcm9tIHVybCB0byBhcGkgcGF0aFxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IGRlY29kZVVSSUNvbXBvbmVudCh1cmxQYXRoKTtcbiAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgY2xpY2sgb3ZlcnJpZGUuXG4gICAgICAgICAgICBpZiAobGlua0hhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBsaW5rSGFuZGxlci5oYW5kbGVMaW5rKGFuY2hvciwgcGF0aCwgaGFzaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGFwcHJvcHJpYXRlIGZpbGUgZG93bmxvYWQgcGF0aC5cbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlci5nZXREb3dubG9hZFVybCh1cmxQYXRoKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHVybCA9PiB7XG4gICAgICAgICAgICAvLyBTZXQgdGhlIHZpc2libGUgYW5jaG9yLlxuICAgICAgICAgICAgYW5jaG9yLmhyZWYgPSB1cmwgKyBoYXNoO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSB3YXMgYW4gZXJyb3IgZ2V0dGluZyB0aGUgdXJsLFxuICAgICAgICAgICAgLy8ganVzdCBtYWtlIGl0IGFuIGVtcHR5IGxpbmsuXG4gICAgICAgICAgICBhbmNob3IuaHJlZiA9ICcnO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbGV0IG1hcmtlZEluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogU3VwcG9ydCBHaXRIdWIgZmxhdm9yZWQgTWFya2Rvd24sIGxlYXZlIHNhbml0aXppbmcgdG8gZXh0ZXJuYWwgbGlicmFyeS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplTWFya2VkKCkge1xuICAgICAgICBpZiAobWFya2VkSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBtYXJrZWRJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIG1hcmtlZC5zZXRPcHRpb25zKHtcbiAgICAgICAgICAgIGdmbTogdHJ1ZSxcbiAgICAgICAgICAgIHNhbml0aXplOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIGJyZWFrczogdHJ1ZTsgV2UgY2FuJ3QgdXNlIEdGTSBicmVha3MgYXMgaXQgY2F1c2VzIHByb2JsZW1zIHdpdGggdGFibGVzXG4gICAgICAgICAgICBsYW5nUHJlZml4OiBgY20tcy0ke0NvZGVNaXJyb3JFZGl0b3IuZGVmYXVsdENvbmZpZy50aGVtZX0gbGFuZ3VhZ2UtYCxcbiAgICAgICAgICAgIGhpZ2hsaWdodDogKGNvZGUsIGxhbmcsIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2IgPSAoZXJyLCBjb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyLCBjb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29kZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmICghbGFuZykge1xuICAgICAgICAgICAgICAgICAgICAvLyBubyBsYW5ndWFnZSwgbm8gaGlnaGxpZ2h0XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYihudWxsLCBjb2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgTW9kZS5lbnN1cmUobGFuZylcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oc3BlYyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc3BlYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgTm8gQ29kZU1pcnJvciBtb2RlOiAke2xhbmd9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IobnVsbCwgY29kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZGUucnVuKGNvZGUsIHNwZWMubWltZSwgZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKG51bGwsIGVsLmlubmVySFRNTCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIGhpZ2hsaWdodCAke2xhbmd9IGNvZGVgLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKGVyciwgY29kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgTm8gQ29kZU1pcnJvciBtb2RlOiAke2xhbmd9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFJlcXVpcmUgQ29kZU1pcnJvciBtb2RlIGVycm9yOiAke2Vycn1gKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKG51bGwsIGNvZGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgQU5TSV9DT0xPUlMgPSBbXG4gICAgICAgICdhbnNpLWJsYWNrJyxcbiAgICAgICAgJ2Fuc2ktcmVkJyxcbiAgICAgICAgJ2Fuc2ktZ3JlZW4nLFxuICAgICAgICAnYW5zaS15ZWxsb3cnLFxuICAgICAgICAnYW5zaS1ibHVlJyxcbiAgICAgICAgJ2Fuc2ktbWFnZW50YScsXG4gICAgICAgICdhbnNpLWN5YW4nLFxuICAgICAgICAnYW5zaS13aGl0ZScsXG4gICAgICAgICdhbnNpLWJsYWNrLWludGVuc2UnLFxuICAgICAgICAnYW5zaS1yZWQtaW50ZW5zZScsXG4gICAgICAgICdhbnNpLWdyZWVuLWludGVuc2UnLFxuICAgICAgICAnYW5zaS15ZWxsb3ctaW50ZW5zZScsXG4gICAgICAgICdhbnNpLWJsdWUtaW50ZW5zZScsXG4gICAgICAgICdhbnNpLW1hZ2VudGEtaW50ZW5zZScsXG4gICAgICAgICdhbnNpLWN5YW4taW50ZW5zZScsXG4gICAgICAgICdhbnNpLXdoaXRlLWludGVuc2UnXG4gICAgXTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgSFRNTCB0YWdzIGZvciBhIHN0cmluZyB3aXRoIGdpdmVuIGZvcmVncm91bmQsIGJhY2tncm91bmQgZXRjLiBhbmRcbiAgICAgKiBhZGQgdGhlbSB0byB0aGUgYG91dGAgYXJyYXkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcHVzaENvbG9yZWRDaHVuayhjaHVuaywgZmcsIGJnLCBib2xkLCB1bmRlcmxpbmUsIGludmVyc2UsIG91dCkge1xuICAgICAgICBpZiAoY2h1bmspIHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlcyA9IFtdO1xuICAgICAgICAgICAgaWYgKGJvbGQgJiYgdHlwZW9mIGZnID09PSAnbnVtYmVyJyAmJiAwIDw9IGZnICYmIGZnIDwgOCkge1xuICAgICAgICAgICAgICAgIGZnICs9IDg7IC8vIEJvbGQgdGV4dCB1c2VzIFwiaW50ZW5zZVwiIGNvbG9yc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGludmVyc2UpIHtcbiAgICAgICAgICAgICAgICBbZmcsIGJnXSA9IFtiZywgZmddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmZyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goQU5TSV9DT0xPUlNbZmddICsgJy1mZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZmcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVzLnB1c2goYGNvbG9yOiByZ2IoJHtmZ30pYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpbnZlcnNlKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdhbnNpLWRlZmF1bHQtaW52ZXJzZS1mZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBiZyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goQU5TSV9DT0xPUlNbYmddICsgJy1iZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVzLnB1c2goYGJhY2tncm91bmQtY29sb3I6IHJnYigke2JnfSlgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGludmVyc2UpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goJ2Fuc2ktZGVmYXVsdC1pbnZlcnNlLWJnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYm9sZCkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnYW5zaS1ib2xkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodW5kZXJsaW5lKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdhbnNpLXVuZGVybGluZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNsYXNzZXMubGVuZ3RoIHx8IHN0eWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBvdXQucHVzaCgnPHNwYW4nKTtcbiAgICAgICAgICAgICAgICBpZiAoY2xhc3Nlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0LnB1c2goYCBjbGFzcz1cIiR7Y2xhc3Nlcy5qb2luKCcgJyl9XCJgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0LnB1c2goYCBzdHlsZT1cIiR7c3R5bGVzLmpvaW4oJzsgJyl9XCJgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3V0LnB1c2goJz4nKTtcbiAgICAgICAgICAgICAgICBvdXQucHVzaChjaHVuayk7XG4gICAgICAgICAgICAgICAgb3V0LnB1c2goJzwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG91dC5wdXNoKGNodW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IEFOU0kgZXh0ZW5kZWQgY29sb3JzIHRvIFIvRy9CIHRyaXBsZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRFeHRlbmRlZENvbG9ycyhudW1iZXJzKSB7XG4gICAgICAgIGxldCByO1xuICAgICAgICBsZXQgZztcbiAgICAgICAgbGV0IGI7XG4gICAgICAgIGNvbnN0IG4gPSBudW1iZXJzLnNoaWZ0KCk7XG4gICAgICAgIGlmIChuID09PSAyICYmIG51bWJlcnMubGVuZ3RoID49IDMpIHtcbiAgICAgICAgICAgIC8vIDI0LWJpdCBSR0JcbiAgICAgICAgICAgIHIgPSBudW1iZXJzLnNoaWZ0KCk7XG4gICAgICAgICAgICBnID0gbnVtYmVycy5zaGlmdCgpO1xuICAgICAgICAgICAgYiA9IG51bWJlcnMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChbciwgZywgYl0uc29tZShjID0+IGMgPCAwIHx8IDI1NSA8IGMpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgcmFuZ2UgZm9yIFJHQiBjb2xvcnMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuID09PSA1ICYmIG51bWJlcnMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIC8vIDI1NiBjb2xvcnNcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IG51bWJlcnMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChpZHggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0NvbG9yIGluZGV4IG11c3QgYmUgPj0gMCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaWR4IDwgMTYpIHtcbiAgICAgICAgICAgICAgICAvLyAxNiBkZWZhdWx0IHRlcm1pbmFsIGNvbG9yc1xuICAgICAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpZHggPCAyMzIpIHtcbiAgICAgICAgICAgICAgICAvLyA2eDZ4NiBjb2xvciBjdWJlLCBzZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI3MTY1MTY1LzUwMDA5OFxuICAgICAgICAgICAgICAgIHIgPSBNYXRoLmZsb29yKChpZHggLSAxNikgLyAzNik7XG4gICAgICAgICAgICAgICAgciA9IHIgPiAwID8gNTUgKyByICogNDAgOiAwO1xuICAgICAgICAgICAgICAgIGcgPSBNYXRoLmZsb29yKCgoaWR4IC0gMTYpICUgMzYpIC8gNik7XG4gICAgICAgICAgICAgICAgZyA9IGcgPiAwID8gNTUgKyBnICogNDAgOiAwO1xuICAgICAgICAgICAgICAgIGIgPSAoaWR4IC0gMTYpICUgNjtcbiAgICAgICAgICAgICAgICBiID0gYiA+IDAgPyA1NSArIGIgKiA0MCA6IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpZHggPCAyNTYpIHtcbiAgICAgICAgICAgICAgICAvLyBncmF5c2NhbGUsIHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjcxNjUxNjUvNTAwMDk4XG4gICAgICAgICAgICAgICAgciA9IGcgPSBiID0gKGlkeCAtIDIzMikgKiAxMCArIDg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQ29sb3IgaW5kZXggbXVzdCBiZSA8IDI1NicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgZXh0ZW5kZWQgY29sb3Igc3BlY2lmaWNhdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbciwgZywgYl07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybSBBTlNJIGNvbG9yIGVzY2FwZSBjb2RlcyBpbnRvIEhUTUwgPHNwYW4+IHRhZ3Mgd2l0aCBDU1NcbiAgICAgKiBjbGFzc2VzIHN1Y2ggYXMgXCJhbnNpLWdyZWVuLWludGVuc2UtZmdcIi5cbiAgICAgKiBUaGUgYWN0dWFsIGNvbG9ycyB1c2VkIGFyZSBzZXQgaW4gdGhlIENTUyBmaWxlLlxuICAgICAqIFRoaXMgYWxzbyByZW1vdmVzIG5vbi1jb2xvciBlc2NhcGUgc2VxdWVuY2VzLlxuICAgICAqIFRoaXMgaXMgc3VwcG9zZWQgdG8gaGF2ZSB0aGUgc2FtZSBiZWhhdmlvciBhcyBuYmNvbnZlcnQuZmlsdGVycy5hbnNpMmh0bWwoKVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFuc2lTcGFuKHN0cikge1xuICAgICAgICBjb25zdCBhbnNpUmUgPSAvXFx4MWJcXFsoLio/KShbQC1+XSkvZzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb250cm9sLXJlZ2V4XG4gICAgICAgIGxldCBmZyA9IFtdO1xuICAgICAgICBsZXQgYmcgPSBbXTtcbiAgICAgICAgbGV0IGJvbGQgPSBmYWxzZTtcbiAgICAgICAgbGV0IHVuZGVybGluZSA9IGZhbHNlO1xuICAgICAgICBsZXQgaW52ZXJzZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbWF0Y2g7XG4gICAgICAgIGNvbnN0IG91dCA9IFtdO1xuICAgICAgICBjb25zdCBudW1iZXJzID0gW107XG4gICAgICAgIGxldCBzdGFydCA9IDA7XG4gICAgICAgIHN0ciA9IGVzY2FwZShzdHIpO1xuICAgICAgICBzdHIgKz0gJ1xceDFiW20nOyAvLyBFbnN1cmUgbWFya3VwIGZvciB0cmFpbGluZyB0ZXh0XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICB3aGlsZSAoKG1hdGNoID0gYW5zaVJlLmV4ZWMoc3RyKSkpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaFsyXSA9PT0gJ20nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBtYXRjaFsxXS5zcGxpdCgnOycpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlcnMucHVzaCgwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpdGVtLnNlYXJjaCgvXlxcZCskLykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBudW1iZXJzLnB1c2gocGFyc2VJbnQoaXRlbSwgMTApKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElnbm9yZWQ6IEludmFsaWQgY29sb3Igc3BlY2lmaWNhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVycy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJZ25vcmVkOiBOb3QgYSBjb2xvciBjb2RlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjaHVuayA9IHN0ci5zdWJzdHJpbmcoc3RhcnQsIG1hdGNoLmluZGV4KTtcbiAgICAgICAgICAgIHB1c2hDb2xvcmVkQ2h1bmsoY2h1bmssIGZnLCBiZywgYm9sZCwgdW5kZXJsaW5lLCBpbnZlcnNlLCBvdXQpO1xuICAgICAgICAgICAgc3RhcnQgPSBhbnNpUmUubGFzdEluZGV4O1xuICAgICAgICAgICAgd2hpbGUgKG51bWJlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbiA9IG51bWJlcnMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG4pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgZmcgPSBiZyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9sZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5kZXJsaW5lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZlcnNlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBib2xkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB1bmRlcmxpbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGludmVyc2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjE6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjI6XG4gICAgICAgICAgICAgICAgICAgICAgICBib2xkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVybGluZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZlcnNlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzMDpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzMTpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzMzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzNDpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzNTpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzNjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZnID0gbiAtIDMwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZnID0gZ2V0RXh0ZW5kZWRDb2xvcnMobnVtYmVycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlcnMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAgICAgICAgICAgZmcgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQxOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQyOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQzOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ0OlxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ1OlxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ2OlxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ3OlxuICAgICAgICAgICAgICAgICAgICAgICAgYmcgPSBuIC0gNDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0ODpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcgPSBnZXRFeHRlbmRlZENvbG9ycyhudW1iZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVycy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDk6XG4gICAgICAgICAgICAgICAgICAgICAgICBiZyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTA6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTE6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTI6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTM6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTQ6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTU6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTY6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmZyA9IG4gLSA5MCArIDg7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDA6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTAxOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIDEwMjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDM6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTA0OlxuICAgICAgICAgICAgICAgICAgICBjYXNlIDEwNTpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDY6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgYmcgPSBuIC0gMTAwICsgODtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAvLyBVbmtub3duIGNvZGVzIGFyZSBpZ25vcmVkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQuam9pbignJyk7XG4gICAgfVxuICAgIFByaXZhdGUuYW5zaVNwYW4gPSBhbnNpU3Bhbjtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVuZGVyZXJzLmpzLm1hcCIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxufCBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG4vKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLyoqXG4gKiBUaGUgcmVuZGVybWltZSB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IElSZW5kZXJNaW1lUmVnaXN0cnkgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL3JlbmRlcm1pbWU6SVJlbmRlck1pbWVSZWdpc3RyeScpO1xuLyogdHNsaW50OmVuYWJsZSAqL1xuLyogdHNsaW50OmRpc2FibGUgKi9cbi8qKlxuICogVGhlIGxhdGV4IHR5cGVzZXR0ZXIgdG9rZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBJTGF0ZXhUeXBlc2V0dGVyID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi9yZW5kZXJtaW1lOklMYXRleFR5cGVzZXR0ZXInKTtcbi8qIHRzbGludDplbmFibGUgKi9cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRva2Vucy5qcy5tYXAiLCJpbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgKiBhcyByZW5kZXJlcnMgZnJvbSAnLi9yZW5kZXJlcnMnO1xuLyoqXG4gKiBBIGNvbW1vbiBiYXNlIGNsYXNzIGZvciBtaW1lIHJlbmRlcmVycy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlbmRlcmVkQ29tbW9uIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgcmVuZGVyZWQgY29tbW9uIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGluaXRpYWxpemluZyB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5taW1lVHlwZSA9IG9wdGlvbnMubWltZVR5cGU7XG4gICAgICAgIHRoaXMuc2FuaXRpemVyID0gb3B0aW9ucy5zYW5pdGl6ZXI7XG4gICAgICAgIHRoaXMucmVzb2x2ZXIgPSBvcHRpb25zLnJlc29sdmVyO1xuICAgICAgICB0aGlzLmxpbmtIYW5kbGVyID0gb3B0aW9ucy5saW5rSGFuZGxlcjtcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gb3B0aW9ucy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICB0aGlzLmxhdGV4VHlwZXNldHRlciA9IG9wdGlvbnMubGF0ZXhUeXBlc2V0dGVyO1xuICAgICAgICB0aGlzLm5vZGUuZGF0YXNldFsnbWltZVR5cGUnXSA9IHRoaXMubWltZVR5cGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlciBhIG1pbWUgbW9kZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbW9kZWwgLSBUaGUgbWltZSBtb2RlbCB0byByZW5kZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2hlbiByZW5kZXJpbmcgaXMgY29tcGxldGUuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogSWYgdGhlIERPTSBub2RlIGZvciB0aGlzIHdpZGdldCBhbHJlYWR5IGhhcyBjb250ZW50LCBpdCBpcyBlbXB0aWVkXG4gICAgICogYmVmb3JlIHJlbmRlcmluZy4gU3ViY2xhc3NlcyB0aGF0IGRvIG5vdCB3YW50IHRoaXMgYmVoYXZpb3JcbiAgICAgKiAoaWYsIGZvciBpbnN0YW5jZSwgdGhleSBhcmUgdXNpbmcgRE9NIGRpZmZpbmcpLCBzaG91bGQgb3ZlcnJpZGVcbiAgICAgKiB0aGlzIG1ldGhvZCBhbmQgbm90IGNhbGwgYHN1cGVyLnJlbmRlck1vZGVsKClgLlxuICAgICAqL1xuICAgIGFzeW5jIHJlbmRlck1vZGVsKG1vZGVsKSB7XG4gICAgICAgIC8vIFRPRE8gY29tcGFyZSBtb2RlbCBhZ2FpbnN0IG9sZCBtb2RlbCBmb3IgZWFybHkgYmFpbD9cbiAgICAgICAgLy8gRW1wdHkgYW55IGV4aXN0aW5nIGNvbnRlbnQgaW4gdGhlIG5vZGUgZnJvbSBwcmV2aW91cyByZW5kZXJzXG4gICAgICAgIHdoaWxlICh0aGlzLm5vZGUuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKHRoaXMubm9kZS5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUb2dnbGUgdGhlIHRydXN0ZWQgY2xhc3Mgb24gdGhlIHdpZGdldC5cbiAgICAgICAgdGhpcy50b2dnbGVDbGFzcygnanAtbW9kLXRydXN0ZWQnLCBtb2RlbC50cnVzdGVkKTtcbiAgICAgICAgLy8gUmVuZGVyIHRoZSBhY3R1YWwgY29udGVudC5cbiAgICAgICAgYXdhaXQgdGhpcy5yZW5kZXIobW9kZWwpO1xuICAgICAgICAvLyBIYW5kbGUgdGhlIGZyYWdtZW50IGlkZW50aWZpZXIgaWYgZ2l2ZW4uXG4gICAgICAgIGNvbnN0IHsgZnJhZ21lbnQgfSA9IG1vZGVsLm1ldGFkYXRhO1xuICAgICAgICBpZiAoZnJhZ21lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RnJhZ21lbnQoZnJhZ21lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgVVJJIGZyYWdtZW50IGlkZW50aWZpZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZnJhZ21lbnQgLSBUaGUgVVJJIGZyYWdtZW50IGlkZW50aWZpZXIuXG4gICAgICovXG4gICAgc2V0RnJhZ21lbnQoZnJhZ21lbnQpIHtcbiAgICAgICAgLyogbm8tb3AgKi9cbiAgICB9XG59XG4vKipcbiAqIEEgY29tbW9uIGJhc2UgY2xhc3MgZm9yIEhUTUwgbWltZSByZW5kZXJlcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZW5kZXJlZEhUTUxDb21tb24gZXh0ZW5kcyBSZW5kZXJlZENvbW1vbiB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IHJlbmRlcmVkIEhUTUwgY29tbW9uIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGluaXRpYWxpemluZyB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLVJlbmRlcmVkSFRNTENvbW1vbicpO1xuICAgIH1cbiAgICBzZXRGcmFnbWVudChmcmFnbWVudCkge1xuICAgICAgICBsZXQgZWw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBlbCA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKGZyYWdtZW50LnN0YXJ0c1dpdGgoJyMnKVxuICAgICAgICAgICAgICAgID8gYCMke0NTUy5lc2NhcGUoZnJhZ21lbnQuc2xpY2UoMSkpfWBcbiAgICAgICAgICAgICAgICA6IGZyYWdtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVW5hYmxlIHRvIHNldCBVUkkgZnJhZ21lbnQgaWRlbnRpZmllci4nLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgICBlbC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBBIG1pbWUgcmVuZGVyZXIgZm9yIGRpc3BsYXlpbmcgSFRNTCBhbmQgbWF0aC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlbmRlcmVkSFRNTCBleHRlbmRzIFJlbmRlcmVkSFRNTENvbW1vbiB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IHJlbmRlcmVkIEhUTUwgd2lkZ2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgaW5pdGlhbGl6aW5nIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtUmVuZGVyZWRIVE1MJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlciBhIG1pbWUgbW9kZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbW9kZWwgLSBUaGUgbWltZSBtb2RlbCB0byByZW5kZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2hlbiByZW5kZXJpbmcgaXMgY29tcGxldGUuXG4gICAgICovXG4gICAgcmVuZGVyKG1vZGVsKSB7XG4gICAgICAgIHJldHVybiByZW5kZXJlcnMucmVuZGVySFRNTCh7XG4gICAgICAgICAgICBob3N0OiB0aGlzLm5vZGUsXG4gICAgICAgICAgICBzb3VyY2U6IFN0cmluZyhtb2RlbC5kYXRhW3RoaXMubWltZVR5cGVdKSxcbiAgICAgICAgICAgIHRydXN0ZWQ6IG1vZGVsLnRydXN0ZWQsXG4gICAgICAgICAgICByZXNvbHZlcjogdGhpcy5yZXNvbHZlcixcbiAgICAgICAgICAgIHNhbml0aXplcjogdGhpcy5zYW5pdGl6ZXIsXG4gICAgICAgICAgICBsaW5rSGFuZGxlcjogdGhpcy5saW5rSGFuZGxlcixcbiAgICAgICAgICAgIHNob3VsZFR5cGVzZXQ6IHRoaXMuaXNBdHRhY2hlZCxcbiAgICAgICAgICAgIGxhdGV4VHlwZXNldHRlcjogdGhpcy5sYXRleFR5cGVzZXR0ZXIsXG4gICAgICAgICAgICB0cmFuc2xhdG9yOiB0aGlzLnRyYW5zbGF0b3JcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgbWVzc2FnZSBoYW5kbGVyIGludm9rZWQgb24gYW4gYCdhZnRlci1hdHRhY2gnYCBtZXNzYWdlLlxuICAgICAqL1xuICAgIG9uQWZ0ZXJBdHRhY2gobXNnKSB7XG4gICAgICAgIGlmICh0aGlzLmxhdGV4VHlwZXNldHRlcikge1xuICAgICAgICAgICAgdGhpcy5sYXRleFR5cGVzZXR0ZXIudHlwZXNldCh0aGlzLm5vZGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBBIG1pbWUgcmVuZGVyZXIgZm9yIGRpc3BsYXlpbmcgTGFUZVggb3V0cHV0LlxuICovXG5leHBvcnQgY2xhc3MgUmVuZGVyZWRMYXRleCBleHRlbmRzIFJlbmRlcmVkQ29tbW9uIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgcmVuZGVyZWQgTGFUZVggd2lkZ2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgaW5pdGlhbGl6aW5nIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtUmVuZGVyZWRMYXRleCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgYSBtaW1lIG1vZGVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1vZGVsIC0gVGhlIG1pbWUgbW9kZWwgdG8gcmVuZGVyLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHdoZW4gcmVuZGVyaW5nIGlzIGNvbXBsZXRlLlxuICAgICAqL1xuICAgIHJlbmRlcihtb2RlbCkge1xuICAgICAgICByZXR1cm4gcmVuZGVyZXJzLnJlbmRlckxhdGV4KHtcbiAgICAgICAgICAgIGhvc3Q6IHRoaXMubm9kZSxcbiAgICAgICAgICAgIHNvdXJjZTogU3RyaW5nKG1vZGVsLmRhdGFbdGhpcy5taW1lVHlwZV0pLFxuICAgICAgICAgICAgc2hvdWxkVHlwZXNldDogdGhpcy5pc0F0dGFjaGVkLFxuICAgICAgICAgICAgbGF0ZXhUeXBlc2V0dGVyOiB0aGlzLmxhdGV4VHlwZXNldHRlclxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBtZXNzYWdlIGhhbmRsZXIgaW52b2tlZCBvbiBhbiBgJ2FmdGVyLWF0dGFjaCdgIG1lc3NhZ2UuXG4gICAgICovXG4gICAgb25BZnRlckF0dGFjaChtc2cpIHtcbiAgICAgICAgaWYgKHRoaXMubGF0ZXhUeXBlc2V0dGVyKSB7XG4gICAgICAgICAgICB0aGlzLmxhdGV4VHlwZXNldHRlci50eXBlc2V0KHRoaXMubm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEEgbWltZSByZW5kZXJlciBmb3IgZGlzcGxheWluZyBpbWFnZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZW5kZXJlZEltYWdlIGV4dGVuZHMgUmVuZGVyZWRDb21tb24ge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyByZW5kZXJlZCBpbWFnZSB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBpbml0aWFsaXppbmcgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1SZW5kZXJlZEltYWdlJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlciBhIG1pbWUgbW9kZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbW9kZWwgLSBUaGUgbWltZSBtb2RlbCB0byByZW5kZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2hlbiByZW5kZXJpbmcgaXMgY29tcGxldGUuXG4gICAgICovXG4gICAgcmVuZGVyKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gbW9kZWwubWV0YWRhdGFbdGhpcy5taW1lVHlwZV07XG4gICAgICAgIHJldHVybiByZW5kZXJlcnMucmVuZGVySW1hZ2Uoe1xuICAgICAgICAgICAgaG9zdDogdGhpcy5ub2RlLFxuICAgICAgICAgICAgbWltZVR5cGU6IHRoaXMubWltZVR5cGUsXG4gICAgICAgICAgICBzb3VyY2U6IFN0cmluZyhtb2RlbC5kYXRhW3RoaXMubWltZVR5cGVdKSxcbiAgICAgICAgICAgIHdpZHRoOiBtZXRhZGF0YSAmJiBtZXRhZGF0YS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogbWV0YWRhdGEgJiYgbWV0YWRhdGEuaGVpZ2h0LFxuICAgICAgICAgICAgbmVlZHNCYWNrZ3JvdW5kOiBtb2RlbC5tZXRhZGF0YVsnbmVlZHNfYmFja2dyb3VuZCddLFxuICAgICAgICAgICAgdW5jb25maW5lZDogbWV0YWRhdGEgJiYgbWV0YWRhdGEudW5jb25maW5lZFxuICAgICAgICB9KTtcbiAgICB9XG59XG4vKipcbiAqIEEgbWltZSByZW5kZXJlciBmb3IgZGlzcGxheWluZyBNYXJrZG93biB3aXRoIGVtYmVkZGVkIGxhdGV4LlxuICovXG5leHBvcnQgY2xhc3MgUmVuZGVyZWRNYXJrZG93biBleHRlbmRzIFJlbmRlcmVkSFRNTENvbW1vbiB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IHJlbmRlcmVkIG1hcmtkb3duIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGluaXRpYWxpemluZyB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLVJlbmRlcmVkTWFya2Rvd24nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIGEgbWltZSBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtb2RlbCAtIFRoZSBtaW1lIG1vZGVsIHRvIHJlbmRlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aGVuIHJlbmRlcmluZyBpcyBjb21wbGV0ZS5cbiAgICAgKi9cbiAgICByZW5kZXIobW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVycy5yZW5kZXJNYXJrZG93bih7XG4gICAgICAgICAgICBob3N0OiB0aGlzLm5vZGUsXG4gICAgICAgICAgICBzb3VyY2U6IFN0cmluZyhtb2RlbC5kYXRhW3RoaXMubWltZVR5cGVdKSxcbiAgICAgICAgICAgIHRydXN0ZWQ6IG1vZGVsLnRydXN0ZWQsXG4gICAgICAgICAgICByZXNvbHZlcjogdGhpcy5yZXNvbHZlcixcbiAgICAgICAgICAgIHNhbml0aXplcjogdGhpcy5zYW5pdGl6ZXIsXG4gICAgICAgICAgICBsaW5rSGFuZGxlcjogdGhpcy5saW5rSGFuZGxlcixcbiAgICAgICAgICAgIHNob3VsZFR5cGVzZXQ6IHRoaXMuaXNBdHRhY2hlZCxcbiAgICAgICAgICAgIGxhdGV4VHlwZXNldHRlcjogdGhpcy5sYXRleFR5cGVzZXR0ZXIsXG4gICAgICAgICAgICB0cmFuc2xhdG9yOiB0aGlzLnRyYW5zbGF0b3JcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgbWVzc2FnZSBoYW5kbGVyIGludm9rZWQgb24gYW4gYCdhZnRlci1hdHRhY2gnYCBtZXNzYWdlLlxuICAgICAqL1xuICAgIG9uQWZ0ZXJBdHRhY2gobXNnKSB7XG4gICAgICAgIGlmICh0aGlzLmxhdGV4VHlwZXNldHRlcikge1xuICAgICAgICAgICAgdGhpcy5sYXRleFR5cGVzZXR0ZXIudHlwZXNldCh0aGlzLm5vZGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBBIHdpZGdldCBmb3IgZGlzcGxheWluZyBTVkcgY29udGVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlbmRlcmVkU1ZHIGV4dGVuZHMgUmVuZGVyZWRDb21tb24ge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyByZW5kZXJlZCBTVkcgd2lkZ2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgaW5pdGlhbGl6aW5nIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtUmVuZGVyZWRTVkcnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIGEgbWltZSBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtb2RlbCAtIFRoZSBtaW1lIG1vZGVsIHRvIHJlbmRlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aGVuIHJlbmRlcmluZyBpcyBjb21wbGV0ZS5cbiAgICAgKi9cbiAgICByZW5kZXIobW9kZWwpIHtcbiAgICAgICAgY29uc3QgbWV0YWRhdGEgPSBtb2RlbC5tZXRhZGF0YVt0aGlzLm1pbWVUeXBlXTtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVycy5yZW5kZXJTVkcoe1xuICAgICAgICAgICAgaG9zdDogdGhpcy5ub2RlLFxuICAgICAgICAgICAgc291cmNlOiBTdHJpbmcobW9kZWwuZGF0YVt0aGlzLm1pbWVUeXBlXSksXG4gICAgICAgICAgICB0cnVzdGVkOiBtb2RlbC50cnVzdGVkLFxuICAgICAgICAgICAgdW5jb25maW5lZDogbWV0YWRhdGEgJiYgbWV0YWRhdGEudW5jb25maW5lZCxcbiAgICAgICAgICAgIHRyYW5zbGF0b3I6IHRoaXMudHJhbnNsYXRvclxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBtZXNzYWdlIGhhbmRsZXIgaW52b2tlZCBvbiBhbiBgJ2FmdGVyLWF0dGFjaCdgIG1lc3NhZ2UuXG4gICAgICovXG4gICAgb25BZnRlckF0dGFjaChtc2cpIHtcbiAgICAgICAgaWYgKHRoaXMubGF0ZXhUeXBlc2V0dGVyKSB7XG4gICAgICAgICAgICB0aGlzLmxhdGV4VHlwZXNldHRlci50eXBlc2V0KHRoaXMubm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEEgd2lkZ2V0IGZvciBkaXNwbGF5aW5nIHBsYWluIHRleHQgYW5kIGNvbnNvbGUgdGV4dC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlbmRlcmVkVGV4dCBleHRlbmRzIFJlbmRlcmVkQ29tbW9uIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgcmVuZGVyZWQgdGV4dCB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBpbml0aWFsaXppbmcgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1SZW5kZXJlZFRleHQnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIGEgbWltZSBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtb2RlbCAtIFRoZSBtaW1lIG1vZGVsIHRvIHJlbmRlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aGVuIHJlbmRlcmluZyBpcyBjb21wbGV0ZS5cbiAgICAgKi9cbiAgICByZW5kZXIobW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVycy5yZW5kZXJUZXh0KHtcbiAgICAgICAgICAgIGhvc3Q6IHRoaXMubm9kZSxcbiAgICAgICAgICAgIHNhbml0aXplcjogdGhpcy5zYW5pdGl6ZXIsXG4gICAgICAgICAgICBzb3VyY2U6IFN0cmluZyhtb2RlbC5kYXRhW3RoaXMubWltZVR5cGVdKSxcbiAgICAgICAgICAgIHRyYW5zbGF0b3I6IHRoaXMudHJhbnNsYXRvclxuICAgICAgICB9KTtcbiAgICB9XG59XG4vKipcbiAqIEEgd2lkZ2V0IGZvciBkaXNwbGF5aW5nIEphdmFTY3JpcHQgb3V0cHV0LlxuICovXG5leHBvcnQgY2xhc3MgUmVuZGVyZWRKYXZhU2NyaXB0IGV4dGVuZHMgUmVuZGVyZWRDb21tb24ge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyByZW5kZXJlZCB0ZXh0IHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGluaXRpYWxpemluZyB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLVJlbmRlcmVkSmF2YVNjcmlwdCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgYSBtaW1lIG1vZGVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1vZGVsIC0gVGhlIG1pbWUgbW9kZWwgdG8gcmVuZGVyLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHdoZW4gcmVuZGVyaW5nIGlzIGNvbXBsZXRlLlxuICAgICAqL1xuICAgIHJlbmRlcihtb2RlbCkge1xuICAgICAgICBjb25zdCB0cmFucyA9IHRoaXMudHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHJldHVybiByZW5kZXJlcnMucmVuZGVyVGV4dCh7XG4gICAgICAgICAgICBob3N0OiB0aGlzLm5vZGUsXG4gICAgICAgICAgICBzYW5pdGl6ZXI6IHRoaXMuc2FuaXRpemVyLFxuICAgICAgICAgICAgc291cmNlOiB0cmFucy5fXygnSmF2YVNjcmlwdCBvdXRwdXQgaXMgZGlzYWJsZWQgaW4gSnVweXRlckxhYicpLFxuICAgICAgICAgICAgdHJhbnNsYXRvcjogdGhpcy50cmFuc2xhdG9yXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpZGdldHMuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==