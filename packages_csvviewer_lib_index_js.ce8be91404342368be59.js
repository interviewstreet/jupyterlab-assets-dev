(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_csvviewer_lib_index_js"],{

/***/ "../../packages/csvviewer/lib/index.js":
/*!*********************************************!*\
  !*** ../../packages/csvviewer/lib/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DSVModel": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_0__.DSVModel),
/* harmony export */   "parseDSV": () => (/* reexport safe */ _parse__WEBPACK_IMPORTED_MODULE_1__.parseDSV),
/* harmony export */   "parseDSVNoQuotes": () => (/* reexport safe */ _parse__WEBPACK_IMPORTED_MODULE_1__.parseDSVNoQuotes),
/* harmony export */   "CSVDelimiter": () => (/* reexport safe */ _toolbar__WEBPACK_IMPORTED_MODULE_2__.CSVDelimiter),
/* harmony export */   "CSVDocumentWidget": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_3__.CSVDocumentWidget),
/* harmony export */   "CSVViewer": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_3__.CSVViewer),
/* harmony export */   "CSVViewerFactory": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_3__.CSVViewerFactory),
/* harmony export */   "GridSearchService": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_3__.GridSearchService),
/* harmony export */   "TSVViewerFactory": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_3__.TSVViewerFactory),
/* harmony export */   "TextRenderConfig": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_3__.TextRenderConfig)
/* harmony export */ });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "../../packages/csvviewer/lib/model.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse */ "../../packages/csvviewer/lib/parse.js");
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toolbar */ "../../packages/csvviewer/lib/toolbar.js");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./widget */ "../../packages/csvviewer/lib/widget.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module csvviewer
 */




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/csvviewer/lib/model.js":
/*!*********************************************!*\
  !*** ../../packages/csvviewer/lib/model.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DSVModel": () => (/* binding */ DSVModel)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_datagrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/datagrid */ "webpack/sharing/consume/default/@lumino/datagrid/@lumino/datagrid");
/* harmony import */ var _lumino_datagrid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_datagrid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parse */ "../../packages/csvviewer/lib/parse.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/*
Possible ideas for further implementation:

- Show a spinner or something visible when we are doing delayed parsing.
- The cache right now handles scrolling down great - it gets the next several hundred rows. However, scrolling up causes lots of cache misses - each new row causes a flush of the cache. When invalidating an entire cache, we should put the requested row in middle of the cache (adjusting for rows at the beginning or end). When populating a cache, we should retrieve rows both above and below the requested row.
- When we have a header, and we are guessing the parser to use, try checking just the part of the file *after* the header row for quotes. I think often a first header row is quoted, but the rest of the file is not and can be parsed much faster.
- autdetect the delimiter (look for comma, tab, semicolon in first line. If more than one found, parse first row with comma, tab, semicolon delimiters. One with most fields wins).
- Toolbar buttons to control the row delimiter, the parsing engine (quoted/not quoted), the quote character, etc.
- Investigate incremental loading strategies in the parseAsync function. In initial investigations, setting the chunk size to 100k in parseAsync seems cause instability with large files in Chrome (such as 8-million row files). Perhaps this is because we are recycling the row offset and column offset arrays quickly? It doesn't seem that there is a memory leak. On this theory, perhaps we just need to keep the offsets list an actual list, and pass it into the parsing function to extend without copying, and finalize it into an array buffer only when we are done parsing. Or perhaps we double the size of the array buffer each time, which may be wasteful, but at the end we trim it down if it's too wasteful (perhaps we have our own object that is backed by an array buffer, but has a push method that will automatically double the array buffer size as needed, and a trim function to finalize the array to exactly the size needed)? Or perhaps we don't use array buffers at all - compare the memory cost and speed of keeping the offsets as lists instead of memory buffers.
- Investigate a time-based incremental parsing strategy, rather than a row-based one. The parser could take a maximum time to parse (say 300ms), and will parse up to that duration, in which case the parser probably also needs a way to notify when it has reached the end of a file.
- For very large files, where we are only storing a small cache, scrolling is very laggy in Safari. It would be good to profile it.
*/
/**
 * Possible delimiter-separated data parsers.
 */
const PARSERS = {
    quotes: _parse__WEBPACK_IMPORTED_MODULE_2__.parseDSV,
    noquotes: _parse__WEBPACK_IMPORTED_MODULE_2__.parseDSVNoQuotes
};
/**
 * A data model implementation for in-memory delimiter-separated data.
 *
 * #### Notes
 * This model handles data with up to 2**32 characters.
 */
class DSVModel extends _lumino_datagrid__WEBPACK_IMPORTED_MODULE_1__.DataModel {
    /**
     * Create a data model with static CSV data.
     *
     * @param options - The options for initializing the data model.
     */
    constructor(options) {
        super();
        this._rowCount = 0;
        // Cache information
        /**
         * The header strings.
         */
        this._header = [];
        /**
         * The column offset cache, starting with row _columnOffsetsStartingRow
         *
         * #### Notes
         * The index of the first character in the data string for row r, column c is
         * _columnOffsets[(r-this._columnOffsetsStartingRow)*numColumns+c]
         */
        this._columnOffsets = new Uint32Array(0);
        /**
         * The row that _columnOffsets[0] represents.
         */
        this._columnOffsetsStartingRow = 0;
        /**
         * The maximum number of rows to parse when there is a cache miss.
         */
        this._maxCacheGet = 1000;
        /**
         * The index for the start of each row.
         */
        this._rowOffsets = new Uint32Array(0);
        // Bookkeeping variables.
        this._delayedParse = null;
        this._startedParsing = false;
        this._doneParsing = false;
        this._isDisposed = false;
        this._ready = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.PromiseDelegate();
        let { data, delimiter = ',', rowDelimiter = undefined, quote = '"', quoteParser = undefined, header = true, initialRows = 500 } = options;
        this._rawData = data;
        this._delimiter = delimiter;
        this._quote = quote;
        this._quoteEscaped = new RegExp(quote + quote, 'g');
        this._initialRows = initialRows;
        // Guess the row delimiter if it was not supplied. This will be fooled if a
        // different line delimiter possibility appears in the first row.
        if (rowDelimiter === undefined) {
            const i = data.slice(0, 5000).indexOf('\r');
            if (i === -1) {
                rowDelimiter = '\n';
            }
            else if (data[i + 1] === '\n') {
                rowDelimiter = '\r\n';
            }
            else {
                rowDelimiter = '\r';
            }
        }
        this._rowDelimiter = rowDelimiter;
        if (quoteParser === undefined) {
            // Check for the existence of quotes if the quoteParser is not set.
            quoteParser = data.indexOf(quote) >= 0;
        }
        this._parser = quoteParser ? 'quotes' : 'noquotes';
        // Parse the data.
        this.parseAsync();
        // Cache the header row.
        if (header === true && this._columnCount > 0) {
            const h = [];
            for (let c = 0; c < this._columnCount; c++) {
                h.push(this._getField(0, c));
            }
            this._header = h;
        }
    }
    /**
     * Whether this model has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * A promise that resolves when the model has parsed all of its data.
     */
    get ready() {
        return this._ready.promise;
    }
    /**
     * The string representation of the data.
     */
    get rawData() {
        return this._rawData;
    }
    set rawData(value) {
        this._rawData = value;
    }
    /**
     * The initial chunk of rows to parse.
     */
    get initialRows() {
        return this._initialRows;
    }
    set initialRows(value) {
        this._initialRows = value;
    }
    /**
     * The header strings.
     */
    get header() {
        return this._header;
    }
    set header(value) {
        this._header = value;
    }
    /**
     * The delimiter between entries on the same row.
     */
    get delimiter() {
        return this._delimiter;
    }
    /**
     * The delimiter between rows.
     */
    get rowDelimiter() {
        return this._rowDelimiter;
    }
    /**
     * A boolean determined by whether parsing has completed.
     */
    get doneParsing() {
        return this._doneParsing;
    }
    /**
     * Get the row count for a region in the data model.
     *
     * @param region - The row region of interest.
     *
     * @returns - The row count for the region.
     */
    rowCount(region) {
        if (region === 'body') {
            if (this._header.length === 0) {
                return this._rowCount;
            }
            else {
                return this._rowCount - 1;
            }
        }
        return 1;
    }
    /**
     * Get the column count for a region in the data model.
     *
     * @param region - The column region of interest.
     *
     * @returns - The column count for the region.
     */
    columnCount(region) {
        if (region === 'body') {
            return this._columnCount;
        }
        return 1;
    }
    /**
     * Get the data value for a cell in the data model.
     *
     * @param region - The cell region of interest.
     *
     * @param row - The row index of the cell of interest.
     *
     * @param column - The column index of the cell of interest.
     *
     * @param returns - The data value for the specified cell.
     */
    data(region, row, column) {
        let value;
        // Look up the field and value for the region.
        switch (region) {
            case 'body':
                if (this._header.length === 0) {
                    value = this._getField(row, column);
                }
                else {
                    value = this._getField(row + 1, column);
                }
                break;
            case 'column-header':
                if (this._header.length === 0) {
                    value = (column + 1).toString();
                }
                else {
                    value = this._header[column];
                }
                break;
            case 'row-header':
                value = (row + 1).toString();
                break;
            case 'corner-header':
                value = '';
                break;
            default:
                throw 'unreachable';
        }
        // Return the final value.
        return value;
    }
    /**
     * Dispose the resources held by this model.
     */
    dispose() {
        if (this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        this._columnCount = undefined;
        this._rowCount = undefined;
        this._rowOffsets = null;
        this._columnOffsets = null;
        this._rawData = null;
        // Clear out state associated with the asynchronous parsing.
        if (this._doneParsing === false) {
            // Explicitly catch this rejection at least once so an error is not thrown
            // to the console.
            this.ready.catch(() => {
                return;
            });
            this._ready.reject(undefined);
        }
        if (this._delayedParse !== null) {
            window.clearTimeout(this._delayedParse);
        }
    }
    /**
     * Get the index in the data string for the first character of a row and
     * column.
     *
     * @param row - The row of the data item.
     * @param column - The column of the data item.
     * @returns - The index into the data string where the data item starts.
     */
    getOffsetIndex(row, column) {
        // Declare local variables.
        const ncols = this._columnCount;
        // Check to see if row *should* be in the cache, based on the cache size.
        let rowIndex = (row - this._columnOffsetsStartingRow) * ncols;
        if (rowIndex < 0 || rowIndex > this._columnOffsets.length) {
            // Row isn't in the cache, so we invalidate the entire cache and set up
            // the cache to hold the requested row.
            this._columnOffsets.fill(0xffffffff);
            this._columnOffsetsStartingRow = row;
            rowIndex = 0;
        }
        // Check to see if we need to fetch the row data into the cache.
        if (this._columnOffsets[rowIndex] === 0xffffffff) {
            // Figure out how many rows below us also need to be fetched.
            let maxRows = 1;
            while (maxRows <= this._maxCacheGet &&
                this._columnOffsets[rowIndex + maxRows * ncols] === 0xffffff) {
                maxRows++;
            }
            // Parse the data to get the column offsets.
            const { offsets } = PARSERS[this._parser]({
                data: this._rawData,
                delimiter: this._delimiter,
                rowDelimiter: this._rowDelimiter,
                quote: this._quote,
                columnOffsets: true,
                maxRows: maxRows,
                ncols: ncols,
                startIndex: this._rowOffsets[row]
            });
            // Copy results to the cache.
            for (let i = 0; i < offsets.length; i++) {
                this._columnOffsets[rowIndex + i] = offsets[i];
            }
        }
        // Return the offset index from cache.
        return this._columnOffsets[rowIndex + column];
    }
    /**
     * Parse the data string asynchronously.
     *
     * #### Notes
     * It can take several seconds to parse a several hundred megabyte string, so
     * we parse the first 500 rows to get something up on the screen, then we
     * parse the full data string asynchronously.
     */
    parseAsync() {
        // Number of rows to get initially.
        let currentRows = this._initialRows;
        // Number of rows to get in each chunk thereafter. We set this high to just
        // get the rest of the rows for now.
        let chunkRows = Math.pow(2, 32) - 1;
        // We give the UI a chance to draw by delaying the chunk parsing.
        const delay = 30; // milliseconds
        // Define a function to parse a chunk up to and including endRow.
        const parseChunk = (endRow) => {
            try {
                this._computeRowOffsets(endRow);
            }
            catch (e) {
                // Sometimes the data string cannot be parsed with the full parser (for
                // example, we may have the wrong delimiter). In these cases, fall back to
                // the simpler parser so we can show something.
                if (this._parser === 'quotes') {
                    console.warn(e);
                    this._parser = 'noquotes';
                    this._resetParser();
                    this._computeRowOffsets(endRow);
                }
                else {
                    throw e;
                }
            }
            return this._doneParsing;
        };
        // Reset the parser to its initial state.
        this._resetParser();
        // Parse the first rows to give us the start of the data right away.
        const done = parseChunk(currentRows);
        // If we are done, return early.
        if (done) {
            return;
        }
        // Define a function to recursively parse the next chunk after a delay.
        const delayedParse = () => {
            // Parse up to the new end row.
            const done = parseChunk(currentRows + chunkRows);
            currentRows += chunkRows;
            // Gradually double the chunk size until we reach a million rows, if we
            // start below a million-row chunk size.
            if (chunkRows < 1000000) {
                chunkRows *= 2;
            }
            // If we aren't done, the schedule another parse.
            if (done) {
                this._delayedParse = null;
            }
            else {
                this._delayedParse = window.setTimeout(delayedParse, delay);
            }
        };
        // Parse full data string in chunks, delayed by a few milliseconds to give the UI a chance to draw.
        this._delayedParse = window.setTimeout(delayedParse, delay);
    }
    /**
     * Compute the row offsets and initialize the column offset cache.
     *
     * @param endRow - The last row to parse, from the start of the data (first
     * row is row 1).
     *
     * #### Notes
     * This method supports parsing the data incrementally by calling it with
     * incrementally higher endRow. Rows that have already been parsed will not be
     * parsed again.
     */
    _computeRowOffsets(endRow = 4294967295) {
        var _a;
        // If we've already parsed up to endRow, or if we've already parsed the
        // entire data set, return early.
        if (this._rowCount >= endRow || this._doneParsing === true) {
            return;
        }
        // Compute the column count if we don't already have it.
        if (this._columnCount === undefined) {
            // Get number of columns in first row
            this._columnCount = PARSERS[this._parser]({
                data: this._rawData,
                delimiter: this._delimiter,
                rowDelimiter: this._rowDelimiter,
                quote: this._quote,
                columnOffsets: true,
                maxRows: 1
            }).ncols;
        }
        // `reparse` is the number of rows we are requesting to parse over again.
        // We generally start at the beginning of the last row offset, so that the
        // first row offset returned is the same as the last row offset we already
        // have. We parse the data up to and including the requested row.
        const reparse = this._rowCount > 0 ? 1 : 0;
        const { nrows, offsets } = PARSERS[this._parser]({
            data: this._rawData,
            startIndex: (_a = this._rowOffsets[this._rowCount - reparse]) !== null && _a !== void 0 ? _a : 0,
            delimiter: this._delimiter,
            rowDelimiter: this._rowDelimiter,
            quote: this._quote,
            columnOffsets: false,
            maxRows: endRow - this._rowCount + reparse
        });
        // If we have already set up our initial bookkeeping, return early if we
        // did not get any new rows beyond the last row that we've parsed, i.e.,
        // nrows===1.
        if (this._startedParsing && nrows <= reparse) {
            this._doneParsing = true;
            this._ready.resolve(undefined);
            return;
        }
        this._startedParsing = true;
        // Update the row count, accounting for how many rows were reparsed.
        const oldRowCount = this._rowCount;
        const duplicateRows = Math.min(nrows, reparse);
        this._rowCount = oldRowCount + nrows - duplicateRows;
        // If we didn't reach the requested row, we must be done.
        if (this._rowCount < endRow) {
            this._doneParsing = true;
            this._ready.resolve(undefined);
        }
        // Copy the new offsets into a new row offset array if needed.
        if (this._rowCount > oldRowCount) {
            const oldRowOffsets = this._rowOffsets;
            this._rowOffsets = new Uint32Array(this._rowCount);
            this._rowOffsets.set(oldRowOffsets);
            this._rowOffsets.set(offsets, oldRowCount - duplicateRows);
        }
        // Expand the column offsets array if needed
        // If the full column offsets array is small enough, build a cache big
        // enough for all column offsets. We allocate up to 128 megabytes:
        // 128*(2**20 bytes/M)/(4 bytes/entry) = 33554432 entries.
        const maxColumnOffsetsRows = Math.floor(33554432 / this._columnCount);
        // We need to expand the column offset array if we were storing all column
        // offsets before. Check to see if the previous size was small enough that
        // we stored all column offsets.
        if (oldRowCount <= maxColumnOffsetsRows) {
            // Check to see if the new column offsets array is small enough to still
            // store, or if we should cut over to a small cache.
            if (this._rowCount <= maxColumnOffsetsRows) {
                // Expand the existing column offset array for new column offsets.
                const oldColumnOffsets = this._columnOffsets;
                this._columnOffsets = new Uint32Array(this._rowCount * this._columnCount);
                this._columnOffsets.set(oldColumnOffsets);
                this._columnOffsets.fill(0xffffffff, oldColumnOffsets.length);
            }
            else {
                // If not, then our cache size is at most the maximum number of rows we
                // fill in the cache at a time.
                const oldColumnOffsets = this._columnOffsets;
                this._columnOffsets = new Uint32Array(Math.min(this._maxCacheGet, maxColumnOffsetsRows) * this._columnCount);
                // Fill in the entries we already have.
                this._columnOffsets.set(oldColumnOffsets.subarray(0, this._columnOffsets.length));
                // Invalidate the rest of the entries.
                this._columnOffsets.fill(0xffffffff, oldColumnOffsets.length);
                this._columnOffsetsStartingRow = 0;
            }
        }
        // We have more rows than before, so emit the rows-inserted change signal.
        let firstIndex = oldRowCount;
        if (this._header.length > 0) {
            firstIndex -= 1;
        }
        this.emitChanged({
            type: 'rows-inserted',
            region: 'body',
            index: firstIndex,
            span: this._rowCount - oldRowCount
        });
    }
    /**
     * Get the parsed string field for a row and column.
     *
     * @param row - The row number of the data item.
     * @param column - The column number of the data item.
     * @returns The parsed string for the data item.
     */
    _getField(row, column) {
        // Declare local variables.
        let value;
        let nextIndex;
        // Find the index for the first character in the field.
        const index = this.getOffsetIndex(row, column);
        // Initialize the trim adjustments.
        let trimRight = 0;
        let trimLeft = 0;
        // Find the end of the slice (the start of the next field), and how much we
        // should adjust to trim off a trailing field or row delimiter. First check
        // if we are getting the last column.
        if (column === this._columnCount - 1) {
            // Check if we are getting any row but the last.
            if (row < this._rowCount - 1) {
                // Set the next offset to the next row, column 0.
                nextIndex = this.getOffsetIndex(row + 1, 0);
                // Since we are not at the last row, we need to trim off the row
                // delimiter.
                trimRight += this._rowDelimiter.length;
            }
            else {
                // We are getting the last data item, so the slice end is the end of the
                // data string.
                nextIndex = this._rawData.length;
                // The string may or may not end in a row delimiter (RFC 4180 2.2), so
                // we explicitly check if we should trim off a row delimiter.
                if (this._rawData[nextIndex - 1] ===
                    this._rowDelimiter[this._rowDelimiter.length - 1]) {
                    trimRight += this._rowDelimiter.length;
                }
            }
        }
        else {
            // The next field starts at the next column offset.
            nextIndex = this.getOffsetIndex(row, column + 1);
            // Trim off the delimiter if it exists at the end of the field
            if (index < nextIndex &&
                this._rawData[nextIndex - 1] === this._delimiter) {
                trimRight += 1;
            }
        }
        // Check to see if the field begins with a quote. If it does, trim a quote on either side.
        if (this._rawData[index] === this._quote) {
            trimLeft += 1;
            trimRight += 1;
        }
        // Slice the actual value out of the data string.
        value = this._rawData.slice(index + trimLeft, nextIndex - trimRight);
        // If we have a quoted field and we have an escaped quote inside it, unescape it.
        if (trimLeft === 1 && value.indexOf(this._quote) !== -1) {
            value = value.replace(this._quoteEscaped, this._quote);
        }
        // Return the value.
        return value;
    }
    /**
     * Reset the parser state.
     */
    _resetParser() {
        this._columnCount = undefined;
        this._rowOffsets = new Uint32Array(0);
        this._rowCount = 0;
        this._startedParsing = false;
        this._columnOffsets = new Uint32Array(0);
        // Clear out state associated with the asynchronous parsing.
        if (this._doneParsing === false) {
            // Explicitly catch this rejection at least once so an error is not thrown
            // to the console.
            this.ready.catch(() => {
                return;
            });
            this._ready.reject(undefined);
        }
        this._doneParsing = false;
        this._ready = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.PromiseDelegate();
        if (this._delayedParse !== null) {
            window.clearTimeout(this._delayedParse);
            this._delayedParse = null;
        }
        this.emitChanged({ type: 'model-reset' });
    }
}
//# sourceMappingURL=model.js.map

/***/ }),

/***/ "../../packages/csvviewer/lib/parse.js":
/*!*********************************************!*\
  !*** ../../packages/csvviewer/lib/parse.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseDSV": () => (/* binding */ parseDSV),
/* harmony export */   "parseDSVNoQuotes": () => (/* binding */ parseDSVNoQuotes)
/* harmony export */ });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * Possible parser states.
 */
var STATE;
(function (STATE) {
    STATE[STATE["QUOTED_FIELD"] = 0] = "QUOTED_FIELD";
    STATE[STATE["QUOTED_FIELD_QUOTE"] = 1] = "QUOTED_FIELD_QUOTE";
    STATE[STATE["UNQUOTED_FIELD"] = 2] = "UNQUOTED_FIELD";
    STATE[STATE["NEW_FIELD"] = 3] = "NEW_FIELD";
    STATE[STATE["NEW_ROW"] = 4] = "NEW_ROW";
})(STATE || (STATE = {}));
/**
 * Possible row delimiters for the parser.
 */
var ROW_DELIMITER;
(function (ROW_DELIMITER) {
    ROW_DELIMITER[ROW_DELIMITER["CR"] = 0] = "CR";
    ROW_DELIMITER[ROW_DELIMITER["CRLF"] = 1] = "CRLF";
    ROW_DELIMITER[ROW_DELIMITER["LF"] = 2] = "LF";
})(ROW_DELIMITER || (ROW_DELIMITER = {}));
/**
 * Parse delimiter-separated data.
 *
 * @param options: The parser options
 * @returns An object giving the offsets for the rows or columns parsed.
 *
 * #### Notes
 * This implementation is based on [RFC 4180](https://tools.ietf.org/html/rfc4180).
 */
function parseDSV(options) {
    const { data, columnOffsets, delimiter = ',', startIndex = 0, maxRows = 0xffffffff, rowDelimiter = '\r\n', quote = '"' } = options;
    // ncols will be set automatically if it is undefined.
    let ncols = options.ncols;
    // The number of rows we've already parsed.
    let nrows = 0;
    // The row or column offsets we return.
    const offsets = [];
    // Set up some useful local variables.
    const CH_DELIMITER = delimiter.charCodeAt(0);
    const CH_QUOTE = quote.charCodeAt(0);
    const CH_LF = 10; // \n
    const CH_CR = 13; // \r
    const endIndex = data.length;
    const { QUOTED_FIELD, QUOTED_FIELD_QUOTE, UNQUOTED_FIELD, NEW_FIELD, NEW_ROW } = STATE;
    const { CR, LF, CRLF } = ROW_DELIMITER;
    const [rowDelimiterCode, rowDelimiterLength] = rowDelimiter === '\r\n'
        ? [CRLF, 2]
        : rowDelimiter === '\r'
            ? [CR, 1]
            : [LF, 1];
    // Always start off at the beginning of a row.
    let state = NEW_ROW;
    // Set up the starting index.
    let i = startIndex;
    // We initialize to 0 just in case we are asked to parse past the end of the
    // string. In that case, we want the number of columns to be 0.
    let col = 0;
    // Declare some useful temporaries
    let char;
    // Loop through the data string
    while (i < endIndex) {
        // i is the index of a character in the state.
        // If we just hit a new row, and there are still characters left, push a new
        // offset on and reset the column counter. We want this logic at the top of
        // the while loop rather than the bottom because we don't want a trailing
        // row delimiter at the end of the data to trigger a new row offset.
        if (state === NEW_ROW) {
            // Start a new row and reset the column counter.
            offsets.push(i);
            col = 1;
        }
        // Below, we handle this character, modify the parser state and increment the index to be consistent.
        // Get the integer code for the current character, so the comparisons below
        // are faster.
        char = data.charCodeAt(i);
        // Update the parser state. This switch statement is responsible for
        // updating the state to be consistent with the index i+1 (we increment i
        // after the switch statement). In some situations, we may increment i
        // inside this loop to skip over indices as a shortcut.
        switch (state) {
            // At the beginning of a row or field, we can have a quote, row delimiter, or field delimiter.
            case NEW_ROW:
            case NEW_FIELD:
                switch (char) {
                    // If we have a quote, we are starting an escaped field.
                    case CH_QUOTE:
                        state = QUOTED_FIELD;
                        break;
                    // A field delimiter means we are starting a new field.
                    case CH_DELIMITER:
                        state = NEW_FIELD;
                        break;
                    // A row delimiter means we are starting a new row.
                    case CH_CR:
                        if (rowDelimiterCode === CR) {
                            state = NEW_ROW;
                        }
                        else if (rowDelimiterCode === CRLF &&
                            data.charCodeAt(i + 1) === CH_LF) {
                            // If we see an expected \r\n, then increment to the end of the delimiter.
                            i++;
                            state = NEW_ROW;
                        }
                        else {
                            throw `string index ${i} (in row ${nrows}, column ${col}): carriage return found, but not as part of a row delimiter C ${data.charCodeAt(i + 1)}`;
                        }
                        break;
                    case CH_LF:
                        if (rowDelimiterCode === LF) {
                            state = NEW_ROW;
                        }
                        else {
                            throw `string index ${i} (in row ${nrows}, column ${col}): line feed found, but row delimiter starts with a carriage return`;
                        }
                        break;
                    // Otherwise, we are starting an unquoted field.
                    default:
                        state = UNQUOTED_FIELD;
                        break;
                }
                break;
            // We are in a quoted field.
            case QUOTED_FIELD:
                // Skip ahead until we see another quote, which either ends the quoted
                // field or starts an escaped quote.
                i = data.indexOf(quote, i);
                if (i < 0) {
                    throw `string index ${i} (in row ${nrows}, column ${col}): mismatched quote`;
                }
                state = QUOTED_FIELD_QUOTE;
                break;
            // We just saw a quote in a quoted field. This could be the end of the
            // field, or it could be a repeated quote (i.e., an escaped quote according
            // to RFC 4180).
            case QUOTED_FIELD_QUOTE:
                switch (char) {
                    // Another quote means we just saw an escaped quote, so we are still in
                    // the quoted field.
                    case CH_QUOTE:
                        state = QUOTED_FIELD;
                        break;
                    // A field or row delimiter means the quoted field just ended and we are
                    // going into a new field or new row.
                    case CH_DELIMITER:
                        state = NEW_FIELD;
                        break;
                    // A row delimiter means we are starting a new row in the next index.
                    case CH_CR:
                        if (rowDelimiterCode === CR) {
                            state = NEW_ROW;
                        }
                        else if (rowDelimiterCode === CRLF &&
                            data.charCodeAt(i + 1) === CH_LF) {
                            // If we see an expected \r\n, then increment to the end of the delimiter.
                            i++;
                            state = NEW_ROW;
                        }
                        else {
                            throw `string index ${i} (in row ${nrows}, column ${col}): carriage return found, but not as part of a row delimiter C ${data.charCodeAt(i + 1)}`;
                        }
                        break;
                    case CH_LF:
                        if (rowDelimiterCode === LF) {
                            state = NEW_ROW;
                        }
                        else {
                            throw `string index ${i} (in row ${nrows}, column ${col}): line feed found, but row delimiter starts with a carriage return`;
                        }
                        break;
                    default:
                        throw `string index ${i} (in row ${nrows}, column ${col}): quote in escaped field not followed by quote, delimiter, or row delimiter`;
                }
                break;
            // We are in an unquoted field, so the only thing we look for is the next
            // row or field delimiter.
            case UNQUOTED_FIELD:
                // Skip ahead to either the next field delimiter or possible start of a
                // row delimiter (CR or LF).
                while (i < endIndex) {
                    char = data.charCodeAt(i);
                    if (char === CH_DELIMITER || char === CH_LF || char === CH_CR) {
                        break;
                    }
                    i++;
                }
                // Process the character we're seeing in an unquoted field.
                switch (char) {
                    // A field delimiter means we are starting a new field.
                    case CH_DELIMITER:
                        state = NEW_FIELD;
                        break;
                    // A row delimiter means we are starting a new row in the next index.
                    case CH_CR:
                        if (rowDelimiterCode === CR) {
                            state = NEW_ROW;
                        }
                        else if (rowDelimiterCode === CRLF &&
                            data.charCodeAt(i + 1) === CH_LF) {
                            // If we see an expected \r\n, then increment to the end of the delimiter.
                            i++;
                            state = NEW_ROW;
                        }
                        else {
                            throw `string index ${i} (in row ${nrows}, column ${col}): carriage return found, but not as part of a row delimiter C ${data.charCodeAt(i + 1)}`;
                        }
                        break;
                    case CH_LF:
                        if (rowDelimiterCode === LF) {
                            state = NEW_ROW;
                        }
                        else {
                            throw `string index ${i} (in row ${nrows}, column ${col}): line feed found, but row delimiter starts with a carriage return`;
                        }
                        break;
                    // Otherwise, we continue on in the unquoted field.
                    default:
                        continue;
                }
                break;
            // We should never reach this point since the parser state is handled above,
            // so throw an error if we do.
            default:
                throw `string index ${i} (in row ${nrows}, column ${col}): state not recognized`;
        }
        // Increment i to the next character index
        i++;
        // Update return values based on state.
        switch (state) {
            case NEW_ROW:
                nrows++;
                // If ncols is undefined, set it to the number of columns in this row (first row implied).
                if (ncols === undefined) {
                    if (nrows !== 1) {
                        throw new Error('Error parsing default number of columns');
                    }
                    ncols = col;
                }
                // Pad or truncate the column offsets in the previous row if we are
                // returning them.
                if (columnOffsets === true) {
                    if (col < ncols) {
                        // We didn't have enough columns, so add some more column offsets that
                        // point to just before the row delimiter we just saw.
                        for (; col < ncols; col++) {
                            offsets.push(i - rowDelimiterLength);
                        }
                    }
                    else if (col > ncols) {
                        // We had too many columns, so truncate them.
                        offsets.length = offsets.length - (col - ncols);
                    }
                }
                // Shortcut return if nrows reaches the maximum rows we are to parse.
                if (nrows === maxRows) {
                    return { nrows, ncols: columnOffsets ? ncols : 0, offsets };
                }
                break;
            case NEW_FIELD:
                // If we are returning column offsets, log the current index.
                if (columnOffsets === true) {
                    offsets.push(i);
                }
                // Update the column counter.
                col++;
                break;
            default:
                break;
        }
    }
    // If we finished parsing and we are *not* in the NEW_ROW state, then do the
    // column padding/truncation for the last row. Also make sure ncols is
    // defined.
    if (state !== NEW_ROW) {
        nrows++;
        if (columnOffsets === true) {
            // If ncols is *still* undefined, then we only parsed one row and didn't
            // have a newline, so set it to the number of columns we found.
            if (ncols === undefined) {
                ncols = col;
            }
            if (col < ncols) {
                // We didn't have enough columns, so add some more column offsets that
                // point to just before the row delimiter we just saw.
                for (; col < ncols; col++) {
                    offsets.push(i - (rowDelimiterLength - 1));
                }
            }
            else if (col > ncols) {
                // We had too many columns, so truncate them.
                offsets.length = offsets.length - (col - ncols);
            }
        }
    }
    return { nrows, ncols: columnOffsets ? ncols !== null && ncols !== void 0 ? ncols : 0 : 0, offsets };
}
/**
 * Parse delimiter-separated data where no delimiter is quoted.
 *
 * @param options: The parser options
 * @returns An object giving the offsets for the rows or columns parsed.
 *
 * #### Notes
 * This function is an optimized parser for cases where there are no field or
 * row delimiters in quotes. Note that the data can have quotes, but they are
 * not interpreted in any special way. This implementation is based on [RFC
 * 4180](https://tools.ietf.org/html/rfc4180), but disregards quotes.
 */
function parseDSVNoQuotes(options) {
    // Set option defaults.
    const { data, columnOffsets, delimiter = ',', rowDelimiter = '\r\n', startIndex = 0, maxRows = 0xffffffff } = options;
    // ncols will be set automatically if it is undefined.
    let ncols = options.ncols;
    // Set up our return variables.
    const offsets = [];
    let nrows = 0;
    // Set up various state variables.
    const rowDelimiterLength = rowDelimiter.length;
    let currRow = startIndex;
    const len = data.length;
    let nextRow;
    let col;
    let rowString;
    let colIndex;
    // The end of the current row.
    let rowEnd;
    // Start parsing at the start index.
    nextRow = startIndex;
    // Loop through rows until we run out of data or we've reached maxRows.
    while (nextRow !== -1 && nrows < maxRows && currRow < len) {
        // Store the offset for the beginning of the row and increment the rows.
        offsets.push(currRow);
        nrows++;
        // Find the next row delimiter.
        nextRow = data.indexOf(rowDelimiter, currRow);
        // If the next row delimiter is not found, set the end of the row to the
        // end of the data string.
        rowEnd = nextRow === -1 ? len : nextRow;
        // If we are returning column offsets, push them onto the array.
        if (columnOffsets === true) {
            // Find the next field delimiter. We slice the current row out so that
            // the indexOf will stop at the end of the row. It may possibly be faster
            // to just use a loop to check each character.
            col = 1;
            rowString = data.slice(currRow, rowEnd);
            colIndex = rowString.indexOf(delimiter);
            if (ncols === undefined) {
                // If we don't know how many columns we need, loop through and find all
                // of the field delimiters in this row.
                while (colIndex !== -1) {
                    offsets.push(currRow + colIndex + 1);
                    col++;
                    colIndex = rowString.indexOf(delimiter, colIndex + 1);
                }
                // Set ncols to the number of fields we found.
                ncols = col;
            }
            else {
                // If we know the number of columns we expect, find the field delimiters
                // up to that many columns.
                while (colIndex !== -1 && col < ncols) {
                    offsets.push(currRow + colIndex + 1);
                    col++;
                    colIndex = rowString.indexOf(delimiter, colIndex + 1);
                }
                // If we didn't reach the number of columns we expected, pad the offsets
                // with the offset just before the row delimiter.
                while (col < ncols) {
                    offsets.push(rowEnd);
                    col++;
                }
            }
        }
        // Skip past the row delimiter at the end of the row.
        currRow = rowEnd + rowDelimiterLength;
    }
    return { nrows, ncols: columnOffsets ? ncols !== null && ncols !== void 0 ? ncols : 0 : 0, offsets };
}
//# sourceMappingURL=parse.js.map

/***/ }),

/***/ "../../packages/csvviewer/lib/toolbar.js":
/*!***********************************************!*\
  !*** ../../packages/csvviewer/lib/toolbar.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CSVDelimiter": () => (/* binding */ CSVDelimiter)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_4__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.





/**
 * The class name added to a csv toolbar widget.
 */
const CSV_DELIMITER_CLASS = 'jp-CSVDelimiter';
const CSV_DELIMITER_LABEL_CLASS = 'jp-CSVDelimiter-label';
/**
 * The class name added to a csv toolbar's dropdown element.
 */
const CSV_DELIMITER_DROPDOWN_CLASS = 'jp-CSVDelimiter-dropdown';
/**
 * A widget for selecting a delimiter.
 */
class CSVDelimiter extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget {
    /**
     * Construct a new csv table widget.
     */
    constructor(options) {
        super({
            node: Private.createNode(options.widget.delimiter, options.translator)
        });
        this._delimiterChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal(this);
        this._widget = options.widget;
        this.addClass(CSV_DELIMITER_CLASS);
    }
    /**
     * A signal emitted when the delimiter selection has changed.
     *
     * @deprecated since v3.2
     * This is dead code now.
     */
    get delimiterChanged() {
        return this._delimiterChanged;
    }
    /**
     * The delimiter dropdown menu.
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
     * called in response to events on the dock panel's node. It should
     * not be called directly by user code.
     */
    handleEvent(event) {
        switch (event.type) {
            case 'change':
                this._delimiterChanged.emit(this.selectNode.value);
                this._widget.delimiter = this.selectNode.value;
                break;
            default:
                break;
        }
    }
    /**
     * Handle `after-attach` messages for the widget.
     */
    onAfterAttach(msg) {
        this.selectNode.addEventListener('change', this);
    }
    /**
     * Handle `before-detach` messages for the widget.
     */
    onBeforeDetach(msg) {
        this.selectNode.removeEventListener('change', this);
    }
}
/**
 * A namespace for private toolbar methods.
 */
var Private;
(function (Private) {
    /**
     * Create the node for the delimiter switcher.
     */
    function createNode(selected, translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        const trans = translator === null || translator === void 0 ? void 0 : translator.load('jupyterlab');
        // The supported parsing delimiters and labels.
        const delimiters = [
            [',', ','],
            [';', ';'],
            ['\t', trans.__('tab')],
            ['|', trans.__('pipe')],
            ['#', trans.__('hash')]
        ];
        const div = document.createElement('div');
        const label = document.createElement('span');
        const select = document.createElement('select');
        label.textContent = trans.__('Delimiter: ');
        label.className = CSV_DELIMITER_LABEL_CLASS;
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.each)(delimiters, ([delimiter, label]) => {
            const option = document.createElement('option');
            option.value = delimiter;
            option.textContent = label;
            if (delimiter === selected) {
                option.selected = true;
            }
            select.appendChild(option);
        });
        div.appendChild(label);
        const node = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Styling.wrapSelect(select);
        node.classList.add(CSV_DELIMITER_DROPDOWN_CLASS);
        div.appendChild(node);
        return div;
    }
    Private.createNode = createNode;
})(Private || (Private = {}));
//# sourceMappingURL=toolbar.js.map

/***/ }),

/***/ "../../packages/csvviewer/lib/widget.js":
/*!**********************************************!*\
  !*** ../../packages/csvviewer/lib/widget.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextRenderConfig": () => (/* binding */ TextRenderConfig),
/* harmony export */   "GridSearchService": () => (/* binding */ GridSearchService),
/* harmony export */   "CSVViewer": () => (/* binding */ CSVViewer),
/* harmony export */   "CSVDocumentWidget": () => (/* binding */ CSVDocumentWidget),
/* harmony export */   "CSVViewerFactory": () => (/* binding */ CSVViewerFactory),
/* harmony export */   "TSVViewerFactory": () => (/* binding */ TSVViewerFactory)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_datagrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/datagrid */ "webpack/sharing/consume/default/@lumino/datagrid/@lumino/datagrid");
/* harmony import */ var _lumino_datagrid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_datagrid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./model */ "../../packages/csvviewer/lib/model.js");
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./toolbar */ "../../packages/csvviewer/lib/toolbar.js");
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
 * The class name added to a CSV viewer.
 */
const CSV_CLASS = 'jp-CSVViewer';
/**
 * The class name added to a CSV viewer datagrid.
 */
const CSV_GRID_CLASS = 'jp-CSVViewer-grid';
/**
 * The timeout to wait for change activity to have ceased before rendering.
 */
const RENDER_TIMEOUT = 1000;
/**
 * Configuration for cells textrenderer.
 */
class TextRenderConfig {
}
/**
 * Search service remembers the search state and the location of the last
 * match, for incremental searching.
 * Search service is also responsible of providing a cell renderer function
 * to set the background color of cells matching the search text.
 */
class GridSearchService {
    constructor(grid) {
        this._looping = true;
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._grid = grid;
        this._query = null;
        this._row = 0;
        this._column = -1;
    }
    /**
     * A signal fired when the grid changes.
     */
    get changed() {
        return this._changed;
    }
    /**
     * Returns a cellrenderer config function to render each cell background.
     * If cell match, background is matchBackgroundColor, if it's the current
     * match, background is currentMatchBackgroundColor.
     */
    cellBackgroundColorRendererFunc(config) {
        return ({ value, row, column }) => {
            if (this._query) {
                if (value.match(this._query)) {
                    if (this._row === row && this._column === column) {
                        return config.currentMatchBackgroundColor;
                    }
                    return config.matchBackgroundColor;
                }
            }
            return '';
        };
    }
    /**
     * Clear the search.
     */
    clear() {
        this._query = null;
        this._row = 0;
        this._column = -1;
        this._changed.emit(undefined);
    }
    /**
     * incrementally look for searchText.
     */
    find(query, reverse = false) {
        const model = this._grid.dataModel;
        const rowCount = model.rowCount('body');
        const columnCount = model.columnCount('body');
        if (this._query !== query) {
            // reset search
            this._row = 0;
            this._column = -1;
        }
        this._query = query;
        // check if the match is in current viewport
        const minRow = this._grid.scrollY / this._grid.defaultSizes.rowHeight;
        const maxRow = (this._grid.scrollY + this._grid.pageHeight) /
            this._grid.defaultSizes.rowHeight;
        const minColumn = this._grid.scrollX / this._grid.defaultSizes.columnHeaderHeight;
        const maxColumn = (this._grid.scrollX + this._grid.pageWidth) /
            this._grid.defaultSizes.columnHeaderHeight;
        const isInViewport = (row, column) => {
            return (row >= minRow &&
                row <= maxRow &&
                column >= minColumn &&
                column <= maxColumn);
        };
        const increment = reverse ? -1 : 1;
        this._column += increment;
        for (let row = this._row; reverse ? row >= 0 : row < rowCount; row += increment) {
            for (let col = this._column; reverse ? col >= 0 : col < columnCount; col += increment) {
                const cellData = model.data('body', row, col);
                if (cellData.match(query)) {
                    // to update the background of matching cells.
                    // TODO: we only really need to invalidate the previous and current
                    // cell rects, not the entire grid.
                    this._changed.emit(undefined);
                    if (!isInViewport(row, col)) {
                        this._grid.scrollToRow(row);
                    }
                    this._row = row;
                    this._column = col;
                    return true;
                }
            }
            this._column = reverse ? columnCount - 1 : 0;
        }
        // We've finished searching all the way to the limits of the grid. If this
        // is the first time through (looping is true), wrap the indices and search
        // again. Otherwise, give up.
        if (this._looping) {
            this._looping = false;
            this._row = reverse ? 0 : rowCount - 1;
            this._wrapRows(reverse);
            try {
                return this.find(query, reverse);
            }
            finally {
                this._looping = true;
            }
        }
        return false;
    }
    /**
     * Wrap indices if needed to just before the start or just after the end.
     */
    _wrapRows(reverse = false) {
        const model = this._grid.dataModel;
        const rowCount = model.rowCount('body');
        const columnCount = model.columnCount('body');
        if (reverse && this._row <= 0) {
            // if we are at the front, wrap to just past the end.
            this._row = rowCount - 1;
            this._column = columnCount;
        }
        else if (!reverse && this._row >= rowCount - 1) {
            // if we are at the end, wrap to just before the front.
            this._row = 0;
            this._column = -1;
        }
    }
    get query() {
        return this._query;
    }
}
/**
 * A viewer for CSV tables.
 */
class CSVViewer extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.Widget {
    /**
     * Construct a new CSV viewer.
     */
    constructor(options) {
        super();
        this._monitor = null;
        this._delimiter = ',';
        this._revealed = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.PromiseDelegate();
        this._baseRenderer = null;
        const context = (this._context = options.context);
        const layout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.PanelLayout());
        this.addClass(CSV_CLASS);
        this._grid = new _lumino_datagrid__WEBPACK_IMPORTED_MODULE_3__.DataGrid({
            defaultSizes: {
                rowHeight: 24,
                columnWidth: 144,
                rowHeaderWidth: 64,
                columnHeaderHeight: 36
            }
        });
        this._grid.addClass(CSV_GRID_CLASS);
        this._grid.headerVisibility = 'all';
        this._grid.keyHandler = new _lumino_datagrid__WEBPACK_IMPORTED_MODULE_3__.BasicKeyHandler();
        this._grid.mouseHandler = new _lumino_datagrid__WEBPACK_IMPORTED_MODULE_3__.BasicMouseHandler();
        this._grid.copyConfig = {
            separator: '\t',
            format: _lumino_datagrid__WEBPACK_IMPORTED_MODULE_3__.DataGrid.copyFormatGeneric,
            headers: 'all',
            warningThreshold: 1e6
        };
        layout.addWidget(this._grid);
        this._searchService = new GridSearchService(this._grid);
        this._searchService.changed.connect(this._updateRenderer, this);
        void this._context.ready.then(() => {
            this._updateGrid();
            this._revealed.resolve(undefined);
            // Throttle the rendering rate of the widget.
            this._monitor = new _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.ActivityMonitor({
                signal: context.model.contentChanged,
                timeout: RENDER_TIMEOUT
            });
            this._monitor.activityStopped.connect(this._updateGrid, this);
        });
    }
    /**
     * The CSV widget's context.
     */
    get context() {
        return this._context;
    }
    /**
     * A promise that resolves when the csv viewer is ready to be revealed.
     */
    get revealed() {
        return this._revealed.promise;
    }
    /**
     * The delimiter for the file.
     */
    get delimiter() {
        return this._delimiter;
    }
    set delimiter(value) {
        if (value === this._delimiter) {
            return;
        }
        this._delimiter = value;
        this._updateGrid();
    }
    /**
     * The style used by the data grid.
     */
    get style() {
        return this._grid.style;
    }
    set style(value) {
        this._grid.style = value;
    }
    /**
     * The config used to create text renderer.
     */
    set rendererConfig(rendererConfig) {
        this._baseRenderer = rendererConfig;
        this._updateRenderer();
    }
    /**
     * The search service
     */
    get searchService() {
        return this._searchService;
    }
    /**
     * Dispose of the resources used by the widget.
     */
    dispose() {
        if (this._monitor) {
            this._monitor.dispose();
        }
        super.dispose();
    }
    /**
     * Go to line
     */
    goToLine(lineNumber) {
        this._grid.scrollToRow(lineNumber);
    }
    /**
     * Handle `'activate-request'` messages.
     */
    onActivateRequest(msg) {
        this.node.tabIndex = -1;
        this.node.focus();
    }
    /**
     * Create the model for the grid.
     */
    _updateGrid() {
        const data = this._context.model.toString();
        const delimiter = this._delimiter;
        const oldModel = this._grid.dataModel;
        const dataModel = (this._grid.dataModel = new _model__WEBPACK_IMPORTED_MODULE_6__.DSVModel({
            data,
            delimiter
        }));
        this._grid.selectionModel = new _lumino_datagrid__WEBPACK_IMPORTED_MODULE_3__.BasicSelectionModel({ dataModel });
        if (oldModel) {
            oldModel.dispose();
        }
    }
    /**
     * Update the renderer for the grid.
     */
    _updateRenderer() {
        if (this._baseRenderer === null) {
            return;
        }
        const rendererConfig = this._baseRenderer;
        const renderer = new _lumino_datagrid__WEBPACK_IMPORTED_MODULE_3__.TextRenderer({
            textColor: rendererConfig.textColor,
            horizontalAlignment: rendererConfig.horizontalAlignment,
            backgroundColor: this._searchService.cellBackgroundColorRendererFunc(rendererConfig)
        });
        this._grid.cellRenderers.update({
            body: renderer,
            'column-header': renderer,
            'corner-header': renderer,
            'row-header': renderer
        });
    }
}
/**
 * A document widget for CSV content widgets.
 */
class CSVDocumentWidget extends _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__.DocumentWidget {
    constructor(options) {
        let { content, context, delimiter, reveal } = options, other = __rest(options, ["content", "context", "delimiter", "reveal"]);
        content = content || Private.createContent(context);
        reveal = Promise.all([reveal, content.revealed]);
        super(Object.assign({ content, context, reveal }, other));
        if (delimiter) {
            content.delimiter = delimiter;
        }
    }
    /**
     * Set URI fragment identifier for rows
     */
    setFragment(fragment) {
        const parseFragments = fragment.split('=');
        // TODO: expand to allow columns and cells to be selected
        // reference: https://tools.ietf.org/html/rfc7111#section-3
        if (parseFragments[0] !== '#row') {
            return;
        }
        // multiple rows, separated by semi-colons can be provided, we will just
        // go to the top one
        let topRow = parseFragments[1].split(';')[0];
        // a range of rows can be provided, we will take the first value
        topRow = topRow.split('-')[0];
        // go to that row
        void this.context.ready.then(() => {
            this.content.goToLine(Number(topRow));
        });
    }
}
var Private;
(function (Private) {
    function createContent(context) {
        return new CSVViewer({ context });
    }
    Private.createContent = createContent;
})(Private || (Private = {}));
/**
 * A widget factory for CSV widgets.
 */
class CSVViewerFactory extends _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__.ABCWidgetFactory {
    /**
     * Create a new widget given a context.
     */
    createNewWidget(context) {
        const translator = this.translator;
        return new CSVDocumentWidget({ context, translator });
    }
    /**
     * Default factory for toolbar items to be added after the widget is created.
     */
    defaultToolbarFactory(widget) {
        return [
            {
                name: 'delimiter',
                widget: new _toolbar__WEBPACK_IMPORTED_MODULE_7__.CSVDelimiter({
                    widget: widget.content,
                    translator: this.translator
                })
            }
        ];
    }
}
/**
 * A widget factory for TSV widgets.
 */
class TSVViewerFactory extends CSVViewerFactory {
    /**
     * Create a new widget given a context.
     */
    createNewWidget(context) {
        const delimiter = '\t';
        return new CSVDocumentWidget({
            context,
            delimiter,
            translator: this.translator
        });
    }
}
//# sourceMappingURL=widget.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY3N2dmlld2VyL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY3N2dmlld2VyL2xpYi9tb2RlbC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY3N2dmlld2VyL2xpYi9wYXJzZS5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY3N2dmlld2VyL2xpYi90b29sYmFyLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9jc3Z2aWV3ZXIvbGliL3dpZGdldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN3QjtBQUNBO0FBQ0U7QUFDRDtBQUN6QixpQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ29EO0FBQ1A7QUFDUTtBQUNyRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSw0Q0FBUTtBQUNwQixjQUFjLG9EQUFnQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLHVCQUF1Qix1REFBUztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDhEQUFlO0FBQ3pDLGFBQWEsMEhBQTBIO0FBQ3ZJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix1QkFBdUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFVBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLDJCQUEyQixvQkFBb0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiw4REFBZTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBC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QUFDM0I7QUFDQTtBQUNBO0FBQ08sK0JBQStCLHFFQUFnQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLHNCQUFzQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGtEQUFZO0FBQ3hDO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esa0MiLCJmaWxlIjoicGFja2FnZXNfY3N2dmlld2VyX2xpYl9pbmRleF9qcy5jZThiZTkxNDA0MzQyMzY4YmU1OS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIGNzdnZpZXdlclxuICovXG5leHBvcnQgKiBmcm9tICcuL21vZGVsJztcbmV4cG9ydCAqIGZyb20gJy4vcGFyc2UnO1xuZXhwb3J0ICogZnJvbSAnLi90b29sYmFyJztcbmV4cG9ydCAqIGZyb20gJy4vd2lkZ2V0Jztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFByb21pc2VEZWxlZ2F0ZSB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbmltcG9ydCB7IERhdGFNb2RlbCB9IGZyb20gJ0BsdW1pbm8vZGF0YWdyaWQnO1xuaW1wb3J0IHsgcGFyc2VEU1YsIHBhcnNlRFNWTm9RdW90ZXMgfSBmcm9tICcuL3BhcnNlJztcbi8qXG5Qb3NzaWJsZSBpZGVhcyBmb3IgZnVydGhlciBpbXBsZW1lbnRhdGlvbjpcblxuLSBTaG93IGEgc3Bpbm5lciBvciBzb21ldGhpbmcgdmlzaWJsZSB3aGVuIHdlIGFyZSBkb2luZyBkZWxheWVkIHBhcnNpbmcuXG4tIFRoZSBjYWNoZSByaWdodCBub3cgaGFuZGxlcyBzY3JvbGxpbmcgZG93biBncmVhdCAtIGl0IGdldHMgdGhlIG5leHQgc2V2ZXJhbCBodW5kcmVkIHJvd3MuIEhvd2V2ZXIsIHNjcm9sbGluZyB1cCBjYXVzZXMgbG90cyBvZiBjYWNoZSBtaXNzZXMgLSBlYWNoIG5ldyByb3cgY2F1c2VzIGEgZmx1c2ggb2YgdGhlIGNhY2hlLiBXaGVuIGludmFsaWRhdGluZyBhbiBlbnRpcmUgY2FjaGUsIHdlIHNob3VsZCBwdXQgdGhlIHJlcXVlc3RlZCByb3cgaW4gbWlkZGxlIG9mIHRoZSBjYWNoZSAoYWRqdXN0aW5nIGZvciByb3dzIGF0IHRoZSBiZWdpbm5pbmcgb3IgZW5kKS4gV2hlbiBwb3B1bGF0aW5nIGEgY2FjaGUsIHdlIHNob3VsZCByZXRyaWV2ZSByb3dzIGJvdGggYWJvdmUgYW5kIGJlbG93IHRoZSByZXF1ZXN0ZWQgcm93LlxuLSBXaGVuIHdlIGhhdmUgYSBoZWFkZXIsIGFuZCB3ZSBhcmUgZ3Vlc3NpbmcgdGhlIHBhcnNlciB0byB1c2UsIHRyeSBjaGVja2luZyBqdXN0IHRoZSBwYXJ0IG9mIHRoZSBmaWxlICphZnRlciogdGhlIGhlYWRlciByb3cgZm9yIHF1b3Rlcy4gSSB0aGluayBvZnRlbiBhIGZpcnN0IGhlYWRlciByb3cgaXMgcXVvdGVkLCBidXQgdGhlIHJlc3Qgb2YgdGhlIGZpbGUgaXMgbm90IGFuZCBjYW4gYmUgcGFyc2VkIG11Y2ggZmFzdGVyLlxuLSBhdXRkZXRlY3QgdGhlIGRlbGltaXRlciAobG9vayBmb3IgY29tbWEsIHRhYiwgc2VtaWNvbG9uIGluIGZpcnN0IGxpbmUuIElmIG1vcmUgdGhhbiBvbmUgZm91bmQsIHBhcnNlIGZpcnN0IHJvdyB3aXRoIGNvbW1hLCB0YWIsIHNlbWljb2xvbiBkZWxpbWl0ZXJzLiBPbmUgd2l0aCBtb3N0IGZpZWxkcyB3aW5zKS5cbi0gVG9vbGJhciBidXR0b25zIHRvIGNvbnRyb2wgdGhlIHJvdyBkZWxpbWl0ZXIsIHRoZSBwYXJzaW5nIGVuZ2luZSAocXVvdGVkL25vdCBxdW90ZWQpLCB0aGUgcXVvdGUgY2hhcmFjdGVyLCBldGMuXG4tIEludmVzdGlnYXRlIGluY3JlbWVudGFsIGxvYWRpbmcgc3RyYXRlZ2llcyBpbiB0aGUgcGFyc2VBc3luYyBmdW5jdGlvbi4gSW4gaW5pdGlhbCBpbnZlc3RpZ2F0aW9ucywgc2V0dGluZyB0aGUgY2h1bmsgc2l6ZSB0byAxMDBrIGluIHBhcnNlQXN5bmMgc2VlbXMgY2F1c2UgaW5zdGFiaWxpdHkgd2l0aCBsYXJnZSBmaWxlcyBpbiBDaHJvbWUgKHN1Y2ggYXMgOC1taWxsaW9uIHJvdyBmaWxlcykuIFBlcmhhcHMgdGhpcyBpcyBiZWNhdXNlIHdlIGFyZSByZWN5Y2xpbmcgdGhlIHJvdyBvZmZzZXQgYW5kIGNvbHVtbiBvZmZzZXQgYXJyYXlzIHF1aWNrbHk/IEl0IGRvZXNuJ3Qgc2VlbSB0aGF0IHRoZXJlIGlzIGEgbWVtb3J5IGxlYWsuIE9uIHRoaXMgdGhlb3J5LCBwZXJoYXBzIHdlIGp1c3QgbmVlZCB0byBrZWVwIHRoZSBvZmZzZXRzIGxpc3QgYW4gYWN0dWFsIGxpc3QsIGFuZCBwYXNzIGl0IGludG8gdGhlIHBhcnNpbmcgZnVuY3Rpb24gdG8gZXh0ZW5kIHdpdGhvdXQgY29weWluZywgYW5kIGZpbmFsaXplIGl0IGludG8gYW4gYXJyYXkgYnVmZmVyIG9ubHkgd2hlbiB3ZSBhcmUgZG9uZSBwYXJzaW5nLiBPciBwZXJoYXBzIHdlIGRvdWJsZSB0aGUgc2l6ZSBvZiB0aGUgYXJyYXkgYnVmZmVyIGVhY2ggdGltZSwgd2hpY2ggbWF5IGJlIHdhc3RlZnVsLCBidXQgYXQgdGhlIGVuZCB3ZSB0cmltIGl0IGRvd24gaWYgaXQncyB0b28gd2FzdGVmdWwgKHBlcmhhcHMgd2UgaGF2ZSBvdXIgb3duIG9iamVjdCB0aGF0IGlzIGJhY2tlZCBieSBhbiBhcnJheSBidWZmZXIsIGJ1dCBoYXMgYSBwdXNoIG1ldGhvZCB0aGF0IHdpbGwgYXV0b21hdGljYWxseSBkb3VibGUgdGhlIGFycmF5IGJ1ZmZlciBzaXplIGFzIG5lZWRlZCwgYW5kIGEgdHJpbSBmdW5jdGlvbiB0byBmaW5hbGl6ZSB0aGUgYXJyYXkgdG8gZXhhY3RseSB0aGUgc2l6ZSBuZWVkZWQpPyBPciBwZXJoYXBzIHdlIGRvbid0IHVzZSBhcnJheSBidWZmZXJzIGF0IGFsbCAtIGNvbXBhcmUgdGhlIG1lbW9yeSBjb3N0IGFuZCBzcGVlZCBvZiBrZWVwaW5nIHRoZSBvZmZzZXRzIGFzIGxpc3RzIGluc3RlYWQgb2YgbWVtb3J5IGJ1ZmZlcnMuXG4tIEludmVzdGlnYXRlIGEgdGltZS1iYXNlZCBpbmNyZW1lbnRhbCBwYXJzaW5nIHN0cmF0ZWd5LCByYXRoZXIgdGhhbiBhIHJvdy1iYXNlZCBvbmUuIFRoZSBwYXJzZXIgY291bGQgdGFrZSBhIG1heGltdW0gdGltZSB0byBwYXJzZSAoc2F5IDMwMG1zKSwgYW5kIHdpbGwgcGFyc2UgdXAgdG8gdGhhdCBkdXJhdGlvbiwgaW4gd2hpY2ggY2FzZSB0aGUgcGFyc2VyIHByb2JhYmx5IGFsc28gbmVlZHMgYSB3YXkgdG8gbm90aWZ5IHdoZW4gaXQgaGFzIHJlYWNoZWQgdGhlIGVuZCBvZiBhIGZpbGUuXG4tIEZvciB2ZXJ5IGxhcmdlIGZpbGVzLCB3aGVyZSB3ZSBhcmUgb25seSBzdG9yaW5nIGEgc21hbGwgY2FjaGUsIHNjcm9sbGluZyBpcyB2ZXJ5IGxhZ2d5IGluIFNhZmFyaS4gSXQgd291bGQgYmUgZ29vZCB0byBwcm9maWxlIGl0LlxuKi9cbi8qKlxuICogUG9zc2libGUgZGVsaW1pdGVyLXNlcGFyYXRlZCBkYXRhIHBhcnNlcnMuXG4gKi9cbmNvbnN0IFBBUlNFUlMgPSB7XG4gICAgcXVvdGVzOiBwYXJzZURTVixcbiAgICBub3F1b3RlczogcGFyc2VEU1ZOb1F1b3Rlc1xufTtcbi8qKlxuICogQSBkYXRhIG1vZGVsIGltcGxlbWVudGF0aW9uIGZvciBpbi1tZW1vcnkgZGVsaW1pdGVyLXNlcGFyYXRlZCBkYXRhLlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIFRoaXMgbW9kZWwgaGFuZGxlcyBkYXRhIHdpdGggdXAgdG8gMioqMzIgY2hhcmFjdGVycy5cbiAqL1xuZXhwb3J0IGNsYXNzIERTVk1vZGVsIGV4dGVuZHMgRGF0YU1vZGVsIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBkYXRhIG1vZGVsIHdpdGggc3RhdGljIENTViBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgaW5pdGlhbGl6aW5nIHRoZSBkYXRhIG1vZGVsLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fcm93Q291bnQgPSAwO1xuICAgICAgICAvLyBDYWNoZSBpbmZvcm1hdGlvblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGhlYWRlciBzdHJpbmdzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5faGVhZGVyID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY29sdW1uIG9mZnNldCBjYWNoZSwgc3RhcnRpbmcgd2l0aCByb3cgX2NvbHVtbk9mZnNldHNTdGFydGluZ1Jvd1xuICAgICAgICAgKlxuICAgICAgICAgKiAjIyMjIE5vdGVzXG4gICAgICAgICAqIFRoZSBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZSBkYXRhIHN0cmluZyBmb3Igcm93IHIsIGNvbHVtbiBjIGlzXG4gICAgICAgICAqIF9jb2x1bW5PZmZzZXRzWyhyLXRoaXMuX2NvbHVtbk9mZnNldHNTdGFydGluZ1JvdykqbnVtQ29sdW1ucytjXVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY29sdW1uT2Zmc2V0cyA9IG5ldyBVaW50MzJBcnJheSgwKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSByb3cgdGhhdCBfY29sdW1uT2Zmc2V0c1swXSByZXByZXNlbnRzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY29sdW1uT2Zmc2V0c1N0YXJ0aW5nUm93ID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBtYXhpbXVtIG51bWJlciBvZiByb3dzIHRvIHBhcnNlIHdoZW4gdGhlcmUgaXMgYSBjYWNoZSBtaXNzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fbWF4Q2FjaGVHZXQgPSAxMDAwO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGluZGV4IGZvciB0aGUgc3RhcnQgb2YgZWFjaCByb3cuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9yb3dPZmZzZXRzID0gbmV3IFVpbnQzMkFycmF5KDApO1xuICAgICAgICAvLyBCb29ra2VlcGluZyB2YXJpYWJsZXMuXG4gICAgICAgIHRoaXMuX2RlbGF5ZWRQYXJzZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3N0YXJ0ZWRQYXJzaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2RvbmVQYXJzaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVhZHkgPSBuZXcgUHJvbWlzZURlbGVnYXRlKCk7XG4gICAgICAgIGxldCB7IGRhdGEsIGRlbGltaXRlciA9ICcsJywgcm93RGVsaW1pdGVyID0gdW5kZWZpbmVkLCBxdW90ZSA9ICdcIicsIHF1b3RlUGFyc2VyID0gdW5kZWZpbmVkLCBoZWFkZXIgPSB0cnVlLCBpbml0aWFsUm93cyA9IDUwMCB9ID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5fcmF3RGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuX2RlbGltaXRlciA9IGRlbGltaXRlcjtcbiAgICAgICAgdGhpcy5fcXVvdGUgPSBxdW90ZTtcbiAgICAgICAgdGhpcy5fcXVvdGVFc2NhcGVkID0gbmV3IFJlZ0V4cChxdW90ZSArIHF1b3RlLCAnZycpO1xuICAgICAgICB0aGlzLl9pbml0aWFsUm93cyA9IGluaXRpYWxSb3dzO1xuICAgICAgICAvLyBHdWVzcyB0aGUgcm93IGRlbGltaXRlciBpZiBpdCB3YXMgbm90IHN1cHBsaWVkLiBUaGlzIHdpbGwgYmUgZm9vbGVkIGlmIGFcbiAgICAgICAgLy8gZGlmZmVyZW50IGxpbmUgZGVsaW1pdGVyIHBvc3NpYmlsaXR5IGFwcGVhcnMgaW4gdGhlIGZpcnN0IHJvdy5cbiAgICAgICAgaWYgKHJvd0RlbGltaXRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBpID0gZGF0YS5zbGljZSgwLCA1MDAwKS5pbmRleE9mKCdcXHInKTtcbiAgICAgICAgICAgIGlmIChpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHJvd0RlbGltaXRlciA9ICdcXG4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YVtpICsgMV0gPT09ICdcXG4nKSB7XG4gICAgICAgICAgICAgICAgcm93RGVsaW1pdGVyID0gJ1xcclxcbic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByb3dEZWxpbWl0ZXIgPSAnXFxyJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yb3dEZWxpbWl0ZXIgPSByb3dEZWxpbWl0ZXI7XG4gICAgICAgIGlmIChxdW90ZVBhcnNlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgdGhlIGV4aXN0ZW5jZSBvZiBxdW90ZXMgaWYgdGhlIHF1b3RlUGFyc2VyIGlzIG5vdCBzZXQuXG4gICAgICAgICAgICBxdW90ZVBhcnNlciA9IGRhdGEuaW5kZXhPZihxdW90ZSkgPj0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wYXJzZXIgPSBxdW90ZVBhcnNlciA/ICdxdW90ZXMnIDogJ25vcXVvdGVzJztcbiAgICAgICAgLy8gUGFyc2UgdGhlIGRhdGEuXG4gICAgICAgIHRoaXMucGFyc2VBc3luYygpO1xuICAgICAgICAvLyBDYWNoZSB0aGUgaGVhZGVyIHJvdy5cbiAgICAgICAgaWYgKGhlYWRlciA9PT0gdHJ1ZSAmJiB0aGlzLl9jb2x1bW5Db3VudCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGggPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgdGhpcy5fY29sdW1uQ291bnQ7IGMrKykge1xuICAgICAgICAgICAgICAgIGgucHVzaCh0aGlzLl9nZXRGaWVsZCgwLCBjKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9oZWFkZXIgPSBoO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhpcyBtb2RlbCBoYXMgYmVlbiBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1vZGVsIGhhcyBwYXJzZWQgYWxsIG9mIGl0cyBkYXRhLlxuICAgICAqL1xuICAgIGdldCByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWR5LnByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGEuXG4gICAgICovXG4gICAgZ2V0IHJhd0RhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yYXdEYXRhO1xuICAgIH1cbiAgICBzZXQgcmF3RGF0YSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9yYXdEYXRhID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBpbml0aWFsIGNodW5rIG9mIHJvd3MgdG8gcGFyc2UuXG4gICAgICovXG4gICAgZ2V0IGluaXRpYWxSb3dzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5pdGlhbFJvd3M7XG4gICAgfVxuICAgIHNldCBpbml0aWFsUm93cyh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9pbml0aWFsUm93cyA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgaGVhZGVyIHN0cmluZ3MuXG4gICAgICovXG4gICAgZ2V0IGhlYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlYWRlcjtcbiAgICB9XG4gICAgc2V0IGhlYWRlcih2YWx1ZSkge1xuICAgICAgICB0aGlzLl9oZWFkZXIgPSB2YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGRlbGltaXRlciBiZXR3ZWVuIGVudHJpZXMgb24gdGhlIHNhbWUgcm93LlxuICAgICAqL1xuICAgIGdldCBkZWxpbWl0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWxpbWl0ZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBkZWxpbWl0ZXIgYmV0d2VlbiByb3dzLlxuICAgICAqL1xuICAgIGdldCByb3dEZWxpbWl0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3dEZWxpbWl0ZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgYm9vbGVhbiBkZXRlcm1pbmVkIGJ5IHdoZXRoZXIgcGFyc2luZyBoYXMgY29tcGxldGVkLlxuICAgICAqL1xuICAgIGdldCBkb25lUGFyc2luZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RvbmVQYXJzaW5nO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJvdyBjb3VudCBmb3IgYSByZWdpb24gaW4gdGhlIGRhdGEgbW9kZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVnaW9uIC0gVGhlIHJvdyByZWdpb24gb2YgaW50ZXJlc3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIFRoZSByb3cgY291bnQgZm9yIHRoZSByZWdpb24uXG4gICAgICovXG4gICAgcm93Q291bnQocmVnaW9uKSB7XG4gICAgICAgIGlmIChyZWdpb24gPT09ICdib2R5Jykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2hlYWRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcm93Q291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcm93Q291bnQgLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNvbHVtbiBjb3VudCBmb3IgYSByZWdpb24gaW4gdGhlIGRhdGEgbW9kZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVnaW9uIC0gVGhlIGNvbHVtbiByZWdpb24gb2YgaW50ZXJlc3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIFRoZSBjb2x1bW4gY291bnQgZm9yIHRoZSByZWdpb24uXG4gICAgICovXG4gICAgY29sdW1uQ291bnQocmVnaW9uKSB7XG4gICAgICAgIGlmIChyZWdpb24gPT09ICdib2R5Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtbkNvdW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGRhdGEgdmFsdWUgZm9yIGEgY2VsbCBpbiB0aGUgZGF0YSBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZWdpb24gLSBUaGUgY2VsbCByZWdpb24gb2YgaW50ZXJlc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcm93IC0gVGhlIHJvdyBpbmRleCBvZiB0aGUgY2VsbCBvZiBpbnRlcmVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIGluZGV4IG9mIHRoZSBjZWxsIG9mIGludGVyZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHJldHVybnMgLSBUaGUgZGF0YSB2YWx1ZSBmb3IgdGhlIHNwZWNpZmllZCBjZWxsLlxuICAgICAqL1xuICAgIGRhdGEocmVnaW9uLCByb3csIGNvbHVtbikge1xuICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgIC8vIExvb2sgdXAgdGhlIGZpZWxkIGFuZCB2YWx1ZSBmb3IgdGhlIHJlZ2lvbi5cbiAgICAgICAgc3dpdGNoIChyZWdpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2JvZHknOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9oZWFkZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5fZ2V0RmllbGQocm93LCBjb2x1bW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLl9nZXRGaWVsZChyb3cgKyAxLCBjb2x1bW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NvbHVtbi1oZWFkZXInOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9oZWFkZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gKGNvbHVtbiArIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuX2hlYWRlcltjb2x1bW5dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3Jvdy1oZWFkZXInOlxuICAgICAgICAgICAgICAgIHZhbHVlID0gKHJvdyArIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjb3JuZXItaGVhZGVyJzpcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyAndW5yZWFjaGFibGUnO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJldHVybiB0aGUgZmluYWwgdmFsdWUuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhpcyBtb2RlbC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5faXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9jb2x1bW5Db3VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fcm93Q291bnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3Jvd09mZnNldHMgPSBudWxsO1xuICAgICAgICB0aGlzLl9jb2x1bW5PZmZzZXRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcmF3RGF0YSA9IG51bGw7XG4gICAgICAgIC8vIENsZWFyIG91dCBzdGF0ZSBhc3NvY2lhdGVkIHdpdGggdGhlIGFzeW5jaHJvbm91cyBwYXJzaW5nLlxuICAgICAgICBpZiAodGhpcy5fZG9uZVBhcnNpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAvLyBFeHBsaWNpdGx5IGNhdGNoIHRoaXMgcmVqZWN0aW9uIGF0IGxlYXN0IG9uY2Ugc28gYW4gZXJyb3IgaXMgbm90IHRocm93blxuICAgICAgICAgICAgLy8gdG8gdGhlIGNvbnNvbGUuXG4gICAgICAgICAgICB0aGlzLnJlYWR5LmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX3JlYWR5LnJlamVjdCh1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9kZWxheWVkUGFyc2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fZGVsYXllZFBhcnNlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGluZGV4IGluIHRoZSBkYXRhIHN0cmluZyBmb3IgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBhIHJvdyBhbmRcbiAgICAgKiBjb2x1bW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcm93IC0gVGhlIHJvdyBvZiB0aGUgZGF0YSBpdGVtLlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIG9mIHRoZSBkYXRhIGl0ZW0uXG4gICAgICogQHJldHVybnMgLSBUaGUgaW5kZXggaW50byB0aGUgZGF0YSBzdHJpbmcgd2hlcmUgdGhlIGRhdGEgaXRlbSBzdGFydHMuXG4gICAgICovXG4gICAgZ2V0T2Zmc2V0SW5kZXgocm93LCBjb2x1bW4pIHtcbiAgICAgICAgLy8gRGVjbGFyZSBsb2NhbCB2YXJpYWJsZXMuXG4gICAgICAgIGNvbnN0IG5jb2xzID0gdGhpcy5fY29sdW1uQ291bnQ7XG4gICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiByb3cgKnNob3VsZCogYmUgaW4gdGhlIGNhY2hlLCBiYXNlZCBvbiB0aGUgY2FjaGUgc2l6ZS5cbiAgICAgICAgbGV0IHJvd0luZGV4ID0gKHJvdyAtIHRoaXMuX2NvbHVtbk9mZnNldHNTdGFydGluZ1JvdykgKiBuY29scztcbiAgICAgICAgaWYgKHJvd0luZGV4IDwgMCB8fCByb3dJbmRleCA+IHRoaXMuX2NvbHVtbk9mZnNldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBSb3cgaXNuJ3QgaW4gdGhlIGNhY2hlLCBzbyB3ZSBpbnZhbGlkYXRlIHRoZSBlbnRpcmUgY2FjaGUgYW5kIHNldCB1cFxuICAgICAgICAgICAgLy8gdGhlIGNhY2hlIHRvIGhvbGQgdGhlIHJlcXVlc3RlZCByb3cuXG4gICAgICAgICAgICB0aGlzLl9jb2x1bW5PZmZzZXRzLmZpbGwoMHhmZmZmZmZmZik7XG4gICAgICAgICAgICB0aGlzLl9jb2x1bW5PZmZzZXRzU3RhcnRpbmdSb3cgPSByb3c7XG4gICAgICAgICAgICByb3dJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHdlIG5lZWQgdG8gZmV0Y2ggdGhlIHJvdyBkYXRhIGludG8gdGhlIGNhY2hlLlxuICAgICAgICBpZiAodGhpcy5fY29sdW1uT2Zmc2V0c1tyb3dJbmRleF0gPT09IDB4ZmZmZmZmZmYpIHtcbiAgICAgICAgICAgIC8vIEZpZ3VyZSBvdXQgaG93IG1hbnkgcm93cyBiZWxvdyB1cyBhbHNvIG5lZWQgdG8gYmUgZmV0Y2hlZC5cbiAgICAgICAgICAgIGxldCBtYXhSb3dzID0gMTtcbiAgICAgICAgICAgIHdoaWxlIChtYXhSb3dzIDw9IHRoaXMuX21heENhY2hlR2V0ICYmXG4gICAgICAgICAgICAgICAgdGhpcy5fY29sdW1uT2Zmc2V0c1tyb3dJbmRleCArIG1heFJvd3MgKiBuY29sc10gPT09IDB4ZmZmZmZmKSB7XG4gICAgICAgICAgICAgICAgbWF4Um93cysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUGFyc2UgdGhlIGRhdGEgdG8gZ2V0IHRoZSBjb2x1bW4gb2Zmc2V0cy5cbiAgICAgICAgICAgIGNvbnN0IHsgb2Zmc2V0cyB9ID0gUEFSU0VSU1t0aGlzLl9wYXJzZXJdKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLl9yYXdEYXRhLFxuICAgICAgICAgICAgICAgIGRlbGltaXRlcjogdGhpcy5fZGVsaW1pdGVyLFxuICAgICAgICAgICAgICAgIHJvd0RlbGltaXRlcjogdGhpcy5fcm93RGVsaW1pdGVyLFxuICAgICAgICAgICAgICAgIHF1b3RlOiB0aGlzLl9xdW90ZSxcbiAgICAgICAgICAgICAgICBjb2x1bW5PZmZzZXRzOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1heFJvd3M6IG1heFJvd3MsXG4gICAgICAgICAgICAgICAgbmNvbHM6IG5jb2xzLFxuICAgICAgICAgICAgICAgIHN0YXJ0SW5kZXg6IHRoaXMuX3Jvd09mZnNldHNbcm93XVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBDb3B5IHJlc3VsdHMgdG8gdGhlIGNhY2hlLlxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvZmZzZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29sdW1uT2Zmc2V0c1tyb3dJbmRleCArIGldID0gb2Zmc2V0c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBSZXR1cm4gdGhlIG9mZnNldCBpbmRleCBmcm9tIGNhY2hlLlxuICAgICAgICByZXR1cm4gdGhpcy5fY29sdW1uT2Zmc2V0c1tyb3dJbmRleCArIGNvbHVtbl07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBhcnNlIHRoZSBkYXRhIHN0cmluZyBhc3luY2hyb25vdXNseS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBJdCBjYW4gdGFrZSBzZXZlcmFsIHNlY29uZHMgdG8gcGFyc2UgYSBzZXZlcmFsIGh1bmRyZWQgbWVnYWJ5dGUgc3RyaW5nLCBzb1xuICAgICAqIHdlIHBhcnNlIHRoZSBmaXJzdCA1MDAgcm93cyB0byBnZXQgc29tZXRoaW5nIHVwIG9uIHRoZSBzY3JlZW4sIHRoZW4gd2VcbiAgICAgKiBwYXJzZSB0aGUgZnVsbCBkYXRhIHN0cmluZyBhc3luY2hyb25vdXNseS5cbiAgICAgKi9cbiAgICBwYXJzZUFzeW5jKCkge1xuICAgICAgICAvLyBOdW1iZXIgb2Ygcm93cyB0byBnZXQgaW5pdGlhbGx5LlxuICAgICAgICBsZXQgY3VycmVudFJvd3MgPSB0aGlzLl9pbml0aWFsUm93cztcbiAgICAgICAgLy8gTnVtYmVyIG9mIHJvd3MgdG8gZ2V0IGluIGVhY2ggY2h1bmsgdGhlcmVhZnRlci4gV2Ugc2V0IHRoaXMgaGlnaCB0byBqdXN0XG4gICAgICAgIC8vIGdldCB0aGUgcmVzdCBvZiB0aGUgcm93cyBmb3Igbm93LlxuICAgICAgICBsZXQgY2h1bmtSb3dzID0gTWF0aC5wb3coMiwgMzIpIC0gMTtcbiAgICAgICAgLy8gV2UgZ2l2ZSB0aGUgVUkgYSBjaGFuY2UgdG8gZHJhdyBieSBkZWxheWluZyB0aGUgY2h1bmsgcGFyc2luZy5cbiAgICAgICAgY29uc3QgZGVsYXkgPSAzMDsgLy8gbWlsbGlzZWNvbmRzXG4gICAgICAgIC8vIERlZmluZSBhIGZ1bmN0aW9uIHRvIHBhcnNlIGEgY2h1bmsgdXAgdG8gYW5kIGluY2x1ZGluZyBlbmRSb3cuXG4gICAgICAgIGNvbnN0IHBhcnNlQ2h1bmsgPSAoZW5kUm93KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXB1dGVSb3dPZmZzZXRzKGVuZFJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIFNvbWV0aW1lcyB0aGUgZGF0YSBzdHJpbmcgY2Fubm90IGJlIHBhcnNlZCB3aXRoIHRoZSBmdWxsIHBhcnNlciAoZm9yXG4gICAgICAgICAgICAgICAgLy8gZXhhbXBsZSwgd2UgbWF5IGhhdmUgdGhlIHdyb25nIGRlbGltaXRlcikuIEluIHRoZXNlIGNhc2VzLCBmYWxsIGJhY2sgdG9cbiAgICAgICAgICAgICAgICAvLyB0aGUgc2ltcGxlciBwYXJzZXIgc28gd2UgY2FuIHNob3cgc29tZXRoaW5nLlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wYXJzZXIgPT09ICdxdW90ZXMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFyc2VyID0gJ25vcXVvdGVzJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRQYXJzZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tcHV0ZVJvd09mZnNldHMoZW5kUm93KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RvbmVQYXJzaW5nO1xuICAgICAgICB9O1xuICAgICAgICAvLyBSZXNldCB0aGUgcGFyc2VyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuICAgICAgICB0aGlzLl9yZXNldFBhcnNlcigpO1xuICAgICAgICAvLyBQYXJzZSB0aGUgZmlyc3Qgcm93cyB0byBnaXZlIHVzIHRoZSBzdGFydCBvZiB0aGUgZGF0YSByaWdodCBhd2F5LlxuICAgICAgICBjb25zdCBkb25lID0gcGFyc2VDaHVuayhjdXJyZW50Um93cyk7XG4gICAgICAgIC8vIElmIHdlIGFyZSBkb25lLCByZXR1cm4gZWFybHkuXG4gICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gRGVmaW5lIGEgZnVuY3Rpb24gdG8gcmVjdXJzaXZlbHkgcGFyc2UgdGhlIG5leHQgY2h1bmsgYWZ0ZXIgYSBkZWxheS5cbiAgICAgICAgY29uc3QgZGVsYXllZFBhcnNlID0gKCkgPT4ge1xuICAgICAgICAgICAgLy8gUGFyc2UgdXAgdG8gdGhlIG5ldyBlbmQgcm93LlxuICAgICAgICAgICAgY29uc3QgZG9uZSA9IHBhcnNlQ2h1bmsoY3VycmVudFJvd3MgKyBjaHVua1Jvd3MpO1xuICAgICAgICAgICAgY3VycmVudFJvd3MgKz0gY2h1bmtSb3dzO1xuICAgICAgICAgICAgLy8gR3JhZHVhbGx5IGRvdWJsZSB0aGUgY2h1bmsgc2l6ZSB1bnRpbCB3ZSByZWFjaCBhIG1pbGxpb24gcm93cywgaWYgd2VcbiAgICAgICAgICAgIC8vIHN0YXJ0IGJlbG93IGEgbWlsbGlvbi1yb3cgY2h1bmsgc2l6ZS5cbiAgICAgICAgICAgIGlmIChjaHVua1Jvd3MgPCAxMDAwMDAwKSB7XG4gICAgICAgICAgICAgICAgY2h1bmtSb3dzICo9IDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB3ZSBhcmVuJ3QgZG9uZSwgdGhlIHNjaGVkdWxlIGFub3RoZXIgcGFyc2UuXG4gICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlbGF5ZWRQYXJzZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWxheWVkUGFyc2UgPSB3aW5kb3cuc2V0VGltZW91dChkZWxheWVkUGFyc2UsIGRlbGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gUGFyc2UgZnVsbCBkYXRhIHN0cmluZyBpbiBjaHVua3MsIGRlbGF5ZWQgYnkgYSBmZXcgbWlsbGlzZWNvbmRzIHRvIGdpdmUgdGhlIFVJIGEgY2hhbmNlIHRvIGRyYXcuXG4gICAgICAgIHRoaXMuX2RlbGF5ZWRQYXJzZSA9IHdpbmRvdy5zZXRUaW1lb3V0KGRlbGF5ZWRQYXJzZSwgZGVsYXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIHRoZSByb3cgb2Zmc2V0cyBhbmQgaW5pdGlhbGl6ZSB0aGUgY29sdW1uIG9mZnNldCBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbmRSb3cgLSBUaGUgbGFzdCByb3cgdG8gcGFyc2UsIGZyb20gdGhlIHN0YXJ0IG9mIHRoZSBkYXRhIChmaXJzdFxuICAgICAqIHJvdyBpcyByb3cgMSkuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBtZXRob2Qgc3VwcG9ydHMgcGFyc2luZyB0aGUgZGF0YSBpbmNyZW1lbnRhbGx5IGJ5IGNhbGxpbmcgaXQgd2l0aFxuICAgICAqIGluY3JlbWVudGFsbHkgaGlnaGVyIGVuZFJvdy4gUm93cyB0aGF0IGhhdmUgYWxyZWFkeSBiZWVuIHBhcnNlZCB3aWxsIG5vdCBiZVxuICAgICAqIHBhcnNlZCBhZ2Fpbi5cbiAgICAgKi9cbiAgICBfY29tcHV0ZVJvd09mZnNldHMoZW5kUm93ID0gNDI5NDk2NzI5NSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgcGFyc2VkIHVwIHRvIGVuZFJvdywgb3IgaWYgd2UndmUgYWxyZWFkeSBwYXJzZWQgdGhlXG4gICAgICAgIC8vIGVudGlyZSBkYXRhIHNldCwgcmV0dXJuIGVhcmx5LlxuICAgICAgICBpZiAodGhpcy5fcm93Q291bnQgPj0gZW5kUm93IHx8IHRoaXMuX2RvbmVQYXJzaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgY29sdW1uIGNvdW50IGlmIHdlIGRvbid0IGFscmVhZHkgaGF2ZSBpdC5cbiAgICAgICAgaWYgKHRoaXMuX2NvbHVtbkNvdW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIEdldCBudW1iZXIgb2YgY29sdW1ucyBpbiBmaXJzdCByb3dcbiAgICAgICAgICAgIHRoaXMuX2NvbHVtbkNvdW50ID0gUEFSU0VSU1t0aGlzLl9wYXJzZXJdKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLl9yYXdEYXRhLFxuICAgICAgICAgICAgICAgIGRlbGltaXRlcjogdGhpcy5fZGVsaW1pdGVyLFxuICAgICAgICAgICAgICAgIHJvd0RlbGltaXRlcjogdGhpcy5fcm93RGVsaW1pdGVyLFxuICAgICAgICAgICAgICAgIHF1b3RlOiB0aGlzLl9xdW90ZSxcbiAgICAgICAgICAgICAgICBjb2x1bW5PZmZzZXRzOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1heFJvd3M6IDFcbiAgICAgICAgICAgIH0pLm5jb2xzO1xuICAgICAgICB9XG4gICAgICAgIC8vIGByZXBhcnNlYCBpcyB0aGUgbnVtYmVyIG9mIHJvd3Mgd2UgYXJlIHJlcXVlc3RpbmcgdG8gcGFyc2Ugb3ZlciBhZ2Fpbi5cbiAgICAgICAgLy8gV2UgZ2VuZXJhbGx5IHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxhc3Qgcm93IG9mZnNldCwgc28gdGhhdCB0aGVcbiAgICAgICAgLy8gZmlyc3Qgcm93IG9mZnNldCByZXR1cm5lZCBpcyB0aGUgc2FtZSBhcyB0aGUgbGFzdCByb3cgb2Zmc2V0IHdlIGFscmVhZHlcbiAgICAgICAgLy8gaGF2ZS4gV2UgcGFyc2UgdGhlIGRhdGEgdXAgdG8gYW5kIGluY2x1ZGluZyB0aGUgcmVxdWVzdGVkIHJvdy5cbiAgICAgICAgY29uc3QgcmVwYXJzZSA9IHRoaXMuX3Jvd0NvdW50ID4gMCA/IDEgOiAwO1xuICAgICAgICBjb25zdCB7IG5yb3dzLCBvZmZzZXRzIH0gPSBQQVJTRVJTW3RoaXMuX3BhcnNlcl0oe1xuICAgICAgICAgICAgZGF0YTogdGhpcy5fcmF3RGF0YSxcbiAgICAgICAgICAgIHN0YXJ0SW5kZXg6IChfYSA9IHRoaXMuX3Jvd09mZnNldHNbdGhpcy5fcm93Q291bnQgLSByZXBhcnNlXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMCxcbiAgICAgICAgICAgIGRlbGltaXRlcjogdGhpcy5fZGVsaW1pdGVyLFxuICAgICAgICAgICAgcm93RGVsaW1pdGVyOiB0aGlzLl9yb3dEZWxpbWl0ZXIsXG4gICAgICAgICAgICBxdW90ZTogdGhpcy5fcXVvdGUsXG4gICAgICAgICAgICBjb2x1bW5PZmZzZXRzOiBmYWxzZSxcbiAgICAgICAgICAgIG1heFJvd3M6IGVuZFJvdyAtIHRoaXMuX3Jvd0NvdW50ICsgcmVwYXJzZVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhbHJlYWR5IHNldCB1cCBvdXIgaW5pdGlhbCBib29ra2VlcGluZywgcmV0dXJuIGVhcmx5IGlmIHdlXG4gICAgICAgIC8vIGRpZCBub3QgZ2V0IGFueSBuZXcgcm93cyBiZXlvbmQgdGhlIGxhc3Qgcm93IHRoYXQgd2UndmUgcGFyc2VkLCBpLmUuLFxuICAgICAgICAvLyBucm93cz09PTEuXG4gICAgICAgIGlmICh0aGlzLl9zdGFydGVkUGFyc2luZyAmJiBucm93cyA8PSByZXBhcnNlKSB7XG4gICAgICAgICAgICB0aGlzLl9kb25lUGFyc2luZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9yZWFkeS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhcnRlZFBhcnNpbmcgPSB0cnVlO1xuICAgICAgICAvLyBVcGRhdGUgdGhlIHJvdyBjb3VudCwgYWNjb3VudGluZyBmb3IgaG93IG1hbnkgcm93cyB3ZXJlIHJlcGFyc2VkLlxuICAgICAgICBjb25zdCBvbGRSb3dDb3VudCA9IHRoaXMuX3Jvd0NvdW50O1xuICAgICAgICBjb25zdCBkdXBsaWNhdGVSb3dzID0gTWF0aC5taW4obnJvd3MsIHJlcGFyc2UpO1xuICAgICAgICB0aGlzLl9yb3dDb3VudCA9IG9sZFJvd0NvdW50ICsgbnJvd3MgLSBkdXBsaWNhdGVSb3dzO1xuICAgICAgICAvLyBJZiB3ZSBkaWRuJ3QgcmVhY2ggdGhlIHJlcXVlc3RlZCByb3csIHdlIG11c3QgYmUgZG9uZS5cbiAgICAgICAgaWYgKHRoaXMuX3Jvd0NvdW50IDwgZW5kUm93KSB7XG4gICAgICAgICAgICB0aGlzLl9kb25lUGFyc2luZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9yZWFkeS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29weSB0aGUgbmV3IG9mZnNldHMgaW50byBhIG5ldyByb3cgb2Zmc2V0IGFycmF5IGlmIG5lZWRlZC5cbiAgICAgICAgaWYgKHRoaXMuX3Jvd0NvdW50ID4gb2xkUm93Q291bnQpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFJvd09mZnNldHMgPSB0aGlzLl9yb3dPZmZzZXRzO1xuICAgICAgICAgICAgdGhpcy5fcm93T2Zmc2V0cyA9IG5ldyBVaW50MzJBcnJheSh0aGlzLl9yb3dDb3VudCk7XG4gICAgICAgICAgICB0aGlzLl9yb3dPZmZzZXRzLnNldChvbGRSb3dPZmZzZXRzKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvd09mZnNldHMuc2V0KG9mZnNldHMsIG9sZFJvd0NvdW50IC0gZHVwbGljYXRlUm93cyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRXhwYW5kIHRoZSBjb2x1bW4gb2Zmc2V0cyBhcnJheSBpZiBuZWVkZWRcbiAgICAgICAgLy8gSWYgdGhlIGZ1bGwgY29sdW1uIG9mZnNldHMgYXJyYXkgaXMgc21hbGwgZW5vdWdoLCBidWlsZCBhIGNhY2hlIGJpZ1xuICAgICAgICAvLyBlbm91Z2ggZm9yIGFsbCBjb2x1bW4gb2Zmc2V0cy4gV2UgYWxsb2NhdGUgdXAgdG8gMTI4IG1lZ2FieXRlczpcbiAgICAgICAgLy8gMTI4KigyKioyMCBieXRlcy9NKS8oNCBieXRlcy9lbnRyeSkgPSAzMzU1NDQzMiBlbnRyaWVzLlxuICAgICAgICBjb25zdCBtYXhDb2x1bW5PZmZzZXRzUm93cyA9IE1hdGguZmxvb3IoMzM1NTQ0MzIgLyB0aGlzLl9jb2x1bW5Db3VudCk7XG4gICAgICAgIC8vIFdlIG5lZWQgdG8gZXhwYW5kIHRoZSBjb2x1bW4gb2Zmc2V0IGFycmF5IGlmIHdlIHdlcmUgc3RvcmluZyBhbGwgY29sdW1uXG4gICAgICAgIC8vIG9mZnNldHMgYmVmb3JlLiBDaGVjayB0byBzZWUgaWYgdGhlIHByZXZpb3VzIHNpemUgd2FzIHNtYWxsIGVub3VnaCB0aGF0XG4gICAgICAgIC8vIHdlIHN0b3JlZCBhbGwgY29sdW1uIG9mZnNldHMuXG4gICAgICAgIGlmIChvbGRSb3dDb3VudCA8PSBtYXhDb2x1bW5PZmZzZXRzUm93cykge1xuICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBuZXcgY29sdW1uIG9mZnNldHMgYXJyYXkgaXMgc21hbGwgZW5vdWdoIHRvIHN0aWxsXG4gICAgICAgICAgICAvLyBzdG9yZSwgb3IgaWYgd2Ugc2hvdWxkIGN1dCBvdmVyIHRvIGEgc21hbGwgY2FjaGUuXG4gICAgICAgICAgICBpZiAodGhpcy5fcm93Q291bnQgPD0gbWF4Q29sdW1uT2Zmc2V0c1Jvd3MpIHtcbiAgICAgICAgICAgICAgICAvLyBFeHBhbmQgdGhlIGV4aXN0aW5nIGNvbHVtbiBvZmZzZXQgYXJyYXkgZm9yIG5ldyBjb2x1bW4gb2Zmc2V0cy5cbiAgICAgICAgICAgICAgICBjb25zdCBvbGRDb2x1bW5PZmZzZXRzID0gdGhpcy5fY29sdW1uT2Zmc2V0cztcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2x1bW5PZmZzZXRzID0gbmV3IFVpbnQzMkFycmF5KHRoaXMuX3Jvd0NvdW50ICogdGhpcy5fY29sdW1uQ291bnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbHVtbk9mZnNldHMuc2V0KG9sZENvbHVtbk9mZnNldHMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbHVtbk9mZnNldHMuZmlsbCgweGZmZmZmZmZmLCBvbGRDb2x1bW5PZmZzZXRzLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBub3QsIHRoZW4gb3VyIGNhY2hlIHNpemUgaXMgYXQgbW9zdCB0aGUgbWF4aW11bSBudW1iZXIgb2Ygcm93cyB3ZVxuICAgICAgICAgICAgICAgIC8vIGZpbGwgaW4gdGhlIGNhY2hlIGF0IGEgdGltZS5cbiAgICAgICAgICAgICAgICBjb25zdCBvbGRDb2x1bW5PZmZzZXRzID0gdGhpcy5fY29sdW1uT2Zmc2V0cztcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2x1bW5PZmZzZXRzID0gbmV3IFVpbnQzMkFycmF5KE1hdGgubWluKHRoaXMuX21heENhY2hlR2V0LCBtYXhDb2x1bW5PZmZzZXRzUm93cykgKiB0aGlzLl9jb2x1bW5Db3VudCk7XG4gICAgICAgICAgICAgICAgLy8gRmlsbCBpbiB0aGUgZW50cmllcyB3ZSBhbHJlYWR5IGhhdmUuXG4gICAgICAgICAgICAgICAgdGhpcy5fY29sdW1uT2Zmc2V0cy5zZXQob2xkQ29sdW1uT2Zmc2V0cy5zdWJhcnJheSgwLCB0aGlzLl9jb2x1bW5PZmZzZXRzLmxlbmd0aCkpO1xuICAgICAgICAgICAgICAgIC8vIEludmFsaWRhdGUgdGhlIHJlc3Qgb2YgdGhlIGVudHJpZXMuXG4gICAgICAgICAgICAgICAgdGhpcy5fY29sdW1uT2Zmc2V0cy5maWxsKDB4ZmZmZmZmZmYsIG9sZENvbHVtbk9mZnNldHMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2x1bW5PZmZzZXRzU3RhcnRpbmdSb3cgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFdlIGhhdmUgbW9yZSByb3dzIHRoYW4gYmVmb3JlLCBzbyBlbWl0IHRoZSByb3dzLWluc2VydGVkIGNoYW5nZSBzaWduYWwuXG4gICAgICAgIGxldCBmaXJzdEluZGV4ID0gb2xkUm93Q291bnQ7XG4gICAgICAgIGlmICh0aGlzLl9oZWFkZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZmlyc3RJbmRleCAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdENoYW5nZWQoe1xuICAgICAgICAgICAgdHlwZTogJ3Jvd3MtaW5zZXJ0ZWQnLFxuICAgICAgICAgICAgcmVnaW9uOiAnYm9keScsXG4gICAgICAgICAgICBpbmRleDogZmlyc3RJbmRleCxcbiAgICAgICAgICAgIHNwYW46IHRoaXMuX3Jvd0NvdW50IC0gb2xkUm93Q291bnRcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcGFyc2VkIHN0cmluZyBmaWVsZCBmb3IgYSByb3cgYW5kIGNvbHVtbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByb3cgLSBUaGUgcm93IG51bWJlciBvZiB0aGUgZGF0YSBpdGVtLlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIG51bWJlciBvZiB0aGUgZGF0YSBpdGVtLlxuICAgICAqIEByZXR1cm5zIFRoZSBwYXJzZWQgc3RyaW5nIGZvciB0aGUgZGF0YSBpdGVtLlxuICAgICAqL1xuICAgIF9nZXRGaWVsZChyb3csIGNvbHVtbikge1xuICAgICAgICAvLyBEZWNsYXJlIGxvY2FsIHZhcmlhYmxlcy5cbiAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICBsZXQgbmV4dEluZGV4O1xuICAgICAgICAvLyBGaW5kIHRoZSBpbmRleCBmb3IgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGUgZmllbGQuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRPZmZzZXRJbmRleChyb3csIGNvbHVtbik7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHRyaW0gYWRqdXN0bWVudHMuXG4gICAgICAgIGxldCB0cmltUmlnaHQgPSAwO1xuICAgICAgICBsZXQgdHJpbUxlZnQgPSAwO1xuICAgICAgICAvLyBGaW5kIHRoZSBlbmQgb2YgdGhlIHNsaWNlICh0aGUgc3RhcnQgb2YgdGhlIG5leHQgZmllbGQpLCBhbmQgaG93IG11Y2ggd2VcbiAgICAgICAgLy8gc2hvdWxkIGFkanVzdCB0byB0cmltIG9mZiBhIHRyYWlsaW5nIGZpZWxkIG9yIHJvdyBkZWxpbWl0ZXIuIEZpcnN0IGNoZWNrXG4gICAgICAgIC8vIGlmIHdlIGFyZSBnZXR0aW5nIHRoZSBsYXN0IGNvbHVtbi5cbiAgICAgICAgaWYgKGNvbHVtbiA9PT0gdGhpcy5fY29sdW1uQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAvLyBDaGVjayBpZiB3ZSBhcmUgZ2V0dGluZyBhbnkgcm93IGJ1dCB0aGUgbGFzdC5cbiAgICAgICAgICAgIGlmIChyb3cgPCB0aGlzLl9yb3dDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIG5leHQgb2Zmc2V0IHRvIHRoZSBuZXh0IHJvdywgY29sdW1uIDAuXG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gdGhpcy5nZXRPZmZzZXRJbmRleChyb3cgKyAxLCAwKTtcbiAgICAgICAgICAgICAgICAvLyBTaW5jZSB3ZSBhcmUgbm90IGF0IHRoZSBsYXN0IHJvdywgd2UgbmVlZCB0byB0cmltIG9mZiB0aGUgcm93XG4gICAgICAgICAgICAgICAgLy8gZGVsaW1pdGVyLlxuICAgICAgICAgICAgICAgIHRyaW1SaWdodCArPSB0aGlzLl9yb3dEZWxpbWl0ZXIubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgYXJlIGdldHRpbmcgdGhlIGxhc3QgZGF0YSBpdGVtLCBzbyB0aGUgc2xpY2UgZW5kIGlzIHRoZSBlbmQgb2YgdGhlXG4gICAgICAgICAgICAgICAgLy8gZGF0YSBzdHJpbmcuXG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gdGhpcy5fcmF3RGF0YS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgLy8gVGhlIHN0cmluZyBtYXkgb3IgbWF5IG5vdCBlbmQgaW4gYSByb3cgZGVsaW1pdGVyIChSRkMgNDE4MCAyLjIpLCBzb1xuICAgICAgICAgICAgICAgIC8vIHdlIGV4cGxpY2l0bHkgY2hlY2sgaWYgd2Ugc2hvdWxkIHRyaW0gb2ZmIGEgcm93IGRlbGltaXRlci5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcmF3RGF0YVtuZXh0SW5kZXggLSAxXSA9PT1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93RGVsaW1pdGVyW3RoaXMuX3Jvd0RlbGltaXRlci5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgICAgICAgICB0cmltUmlnaHQgKz0gdGhpcy5fcm93RGVsaW1pdGVyLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBUaGUgbmV4dCBmaWVsZCBzdGFydHMgYXQgdGhlIG5leHQgY29sdW1uIG9mZnNldC5cbiAgICAgICAgICAgIG5leHRJbmRleCA9IHRoaXMuZ2V0T2Zmc2V0SW5kZXgocm93LCBjb2x1bW4gKyAxKTtcbiAgICAgICAgICAgIC8vIFRyaW0gb2ZmIHRoZSBkZWxpbWl0ZXIgaWYgaXQgZXhpc3RzIGF0IHRoZSBlbmQgb2YgdGhlIGZpZWxkXG4gICAgICAgICAgICBpZiAoaW5kZXggPCBuZXh0SW5kZXggJiZcbiAgICAgICAgICAgICAgICB0aGlzLl9yYXdEYXRhW25leHRJbmRleCAtIDFdID09PSB0aGlzLl9kZWxpbWl0ZXIpIHtcbiAgICAgICAgICAgICAgICB0cmltUmlnaHQgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGZpZWxkIGJlZ2lucyB3aXRoIGEgcXVvdGUuIElmIGl0IGRvZXMsIHRyaW0gYSBxdW90ZSBvbiBlaXRoZXIgc2lkZS5cbiAgICAgICAgaWYgKHRoaXMuX3Jhd0RhdGFbaW5kZXhdID09PSB0aGlzLl9xdW90ZSkge1xuICAgICAgICAgICAgdHJpbUxlZnQgKz0gMTtcbiAgICAgICAgICAgIHRyaW1SaWdodCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNsaWNlIHRoZSBhY3R1YWwgdmFsdWUgb3V0IG9mIHRoZSBkYXRhIHN0cmluZy5cbiAgICAgICAgdmFsdWUgPSB0aGlzLl9yYXdEYXRhLnNsaWNlKGluZGV4ICsgdHJpbUxlZnQsIG5leHRJbmRleCAtIHRyaW1SaWdodCk7XG4gICAgICAgIC8vIElmIHdlIGhhdmUgYSBxdW90ZWQgZmllbGQgYW5kIHdlIGhhdmUgYW4gZXNjYXBlZCBxdW90ZSBpbnNpZGUgaXQsIHVuZXNjYXBlIGl0LlxuICAgICAgICBpZiAodHJpbUxlZnQgPT09IDEgJiYgdmFsdWUuaW5kZXhPZih0aGlzLl9xdW90ZSkgIT09IC0xKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UodGhpcy5fcXVvdGVFc2NhcGVkLCB0aGlzLl9xdW90ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmV0dXJuIHRoZSB2YWx1ZS5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXNldCB0aGUgcGFyc2VyIHN0YXRlLlxuICAgICAqL1xuICAgIF9yZXNldFBhcnNlcigpIHtcbiAgICAgICAgdGhpcy5fY29sdW1uQ291bnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3Jvd09mZnNldHMgPSBuZXcgVWludDMyQXJyYXkoMCk7XG4gICAgICAgIHRoaXMuX3Jvd0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fc3RhcnRlZFBhcnNpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29sdW1uT2Zmc2V0cyA9IG5ldyBVaW50MzJBcnJheSgwKTtcbiAgICAgICAgLy8gQ2xlYXIgb3V0IHN0YXRlIGFzc29jaWF0ZWQgd2l0aCB0aGUgYXN5bmNocm9ub3VzIHBhcnNpbmcuXG4gICAgICAgIGlmICh0aGlzLl9kb25lUGFyc2luZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIC8vIEV4cGxpY2l0bHkgY2F0Y2ggdGhpcyByZWplY3Rpb24gYXQgbGVhc3Qgb25jZSBzbyBhbiBlcnJvciBpcyBub3QgdGhyb3duXG4gICAgICAgICAgICAvLyB0byB0aGUgY29uc29sZS5cbiAgICAgICAgICAgIHRoaXMucmVhZHkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fcmVhZHkucmVqZWN0KHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZG9uZVBhcnNpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVhZHkgPSBuZXcgUHJvbWlzZURlbGVnYXRlKCk7XG4gICAgICAgIGlmICh0aGlzLl9kZWxheWVkUGFyc2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fZGVsYXllZFBhcnNlKTtcbiAgICAgICAgICAgIHRoaXMuX2RlbGF5ZWRQYXJzZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0Q2hhbmdlZCh7IHR5cGU6ICdtb2RlbC1yZXNldCcgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9kZWwuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBQb3NzaWJsZSBwYXJzZXIgc3RhdGVzLlxuICovXG52YXIgU1RBVEU7XG4oZnVuY3Rpb24gKFNUQVRFKSB7XG4gICAgU1RBVEVbU1RBVEVbXCJRVU9URURfRklFTERcIl0gPSAwXSA9IFwiUVVPVEVEX0ZJRUxEXCI7XG4gICAgU1RBVEVbU1RBVEVbXCJRVU9URURfRklFTERfUVVPVEVcIl0gPSAxXSA9IFwiUVVPVEVEX0ZJRUxEX1FVT1RFXCI7XG4gICAgU1RBVEVbU1RBVEVbXCJVTlFVT1RFRF9GSUVMRFwiXSA9IDJdID0gXCJVTlFVT1RFRF9GSUVMRFwiO1xuICAgIFNUQVRFW1NUQVRFW1wiTkVXX0ZJRUxEXCJdID0gM10gPSBcIk5FV19GSUVMRFwiO1xuICAgIFNUQVRFW1NUQVRFW1wiTkVXX1JPV1wiXSA9IDRdID0gXCJORVdfUk9XXCI7XG59KShTVEFURSB8fCAoU1RBVEUgPSB7fSkpO1xuLyoqXG4gKiBQb3NzaWJsZSByb3cgZGVsaW1pdGVycyBmb3IgdGhlIHBhcnNlci5cbiAqL1xudmFyIFJPV19ERUxJTUlURVI7XG4oZnVuY3Rpb24gKFJPV19ERUxJTUlURVIpIHtcbiAgICBST1dfREVMSU1JVEVSW1JPV19ERUxJTUlURVJbXCJDUlwiXSA9IDBdID0gXCJDUlwiO1xuICAgIFJPV19ERUxJTUlURVJbUk9XX0RFTElNSVRFUltcIkNSTEZcIl0gPSAxXSA9IFwiQ1JMRlwiO1xuICAgIFJPV19ERUxJTUlURVJbUk9XX0RFTElNSVRFUltcIkxGXCJdID0gMl0gPSBcIkxGXCI7XG59KShST1dfREVMSU1JVEVSIHx8IChST1dfREVMSU1JVEVSID0ge30pKTtcbi8qKlxuICogUGFyc2UgZGVsaW1pdGVyLXNlcGFyYXRlZCBkYXRhLlxuICpcbiAqIEBwYXJhbSBvcHRpb25zOiBUaGUgcGFyc2VyIG9wdGlvbnNcbiAqIEByZXR1cm5zIEFuIG9iamVjdCBnaXZpbmcgdGhlIG9mZnNldHMgZm9yIHRoZSByb3dzIG9yIGNvbHVtbnMgcGFyc2VkLlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIFRoaXMgaW1wbGVtZW50YXRpb24gaXMgYmFzZWQgb24gW1JGQyA0MTgwXShodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNDE4MCkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURTVihvcHRpb25zKSB7XG4gICAgY29uc3QgeyBkYXRhLCBjb2x1bW5PZmZzZXRzLCBkZWxpbWl0ZXIgPSAnLCcsIHN0YXJ0SW5kZXggPSAwLCBtYXhSb3dzID0gMHhmZmZmZmZmZiwgcm93RGVsaW1pdGVyID0gJ1xcclxcbicsIHF1b3RlID0gJ1wiJyB9ID0gb3B0aW9ucztcbiAgICAvLyBuY29scyB3aWxsIGJlIHNldCBhdXRvbWF0aWNhbGx5IGlmIGl0IGlzIHVuZGVmaW5lZC5cbiAgICBsZXQgbmNvbHMgPSBvcHRpb25zLm5jb2xzO1xuICAgIC8vIFRoZSBudW1iZXIgb2Ygcm93cyB3ZSd2ZSBhbHJlYWR5IHBhcnNlZC5cbiAgICBsZXQgbnJvd3MgPSAwO1xuICAgIC8vIFRoZSByb3cgb3IgY29sdW1uIG9mZnNldHMgd2UgcmV0dXJuLlxuICAgIGNvbnN0IG9mZnNldHMgPSBbXTtcbiAgICAvLyBTZXQgdXAgc29tZSB1c2VmdWwgbG9jYWwgdmFyaWFibGVzLlxuICAgIGNvbnN0IENIX0RFTElNSVRFUiA9IGRlbGltaXRlci5jaGFyQ29kZUF0KDApO1xuICAgIGNvbnN0IENIX1FVT1RFID0gcXVvdGUuY2hhckNvZGVBdCgwKTtcbiAgICBjb25zdCBDSF9MRiA9IDEwOyAvLyBcXG5cbiAgICBjb25zdCBDSF9DUiA9IDEzOyAvLyBcXHJcbiAgICBjb25zdCBlbmRJbmRleCA9IGRhdGEubGVuZ3RoO1xuICAgIGNvbnN0IHsgUVVPVEVEX0ZJRUxELCBRVU9URURfRklFTERfUVVPVEUsIFVOUVVPVEVEX0ZJRUxELCBORVdfRklFTEQsIE5FV19ST1cgfSA9IFNUQVRFO1xuICAgIGNvbnN0IHsgQ1IsIExGLCBDUkxGIH0gPSBST1dfREVMSU1JVEVSO1xuICAgIGNvbnN0IFtyb3dEZWxpbWl0ZXJDb2RlLCByb3dEZWxpbWl0ZXJMZW5ndGhdID0gcm93RGVsaW1pdGVyID09PSAnXFxyXFxuJ1xuICAgICAgICA/IFtDUkxGLCAyXVxuICAgICAgICA6IHJvd0RlbGltaXRlciA9PT0gJ1xccidcbiAgICAgICAgICAgID8gW0NSLCAxXVxuICAgICAgICAgICAgOiBbTEYsIDFdO1xuICAgIC8vIEFsd2F5cyBzdGFydCBvZmYgYXQgdGhlIGJlZ2lubmluZyBvZiBhIHJvdy5cbiAgICBsZXQgc3RhdGUgPSBORVdfUk9XO1xuICAgIC8vIFNldCB1cCB0aGUgc3RhcnRpbmcgaW5kZXguXG4gICAgbGV0IGkgPSBzdGFydEluZGV4O1xuICAgIC8vIFdlIGluaXRpYWxpemUgdG8gMCBqdXN0IGluIGNhc2Ugd2UgYXJlIGFza2VkIHRvIHBhcnNlIHBhc3QgdGhlIGVuZCBvZiB0aGVcbiAgICAvLyBzdHJpbmcuIEluIHRoYXQgY2FzZSwgd2Ugd2FudCB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgdG8gYmUgMC5cbiAgICBsZXQgY29sID0gMDtcbiAgICAvLyBEZWNsYXJlIHNvbWUgdXNlZnVsIHRlbXBvcmFyaWVzXG4gICAgbGV0IGNoYXI7XG4gICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBkYXRhIHN0cmluZ1xuICAgIHdoaWxlIChpIDwgZW5kSW5kZXgpIHtcbiAgICAgICAgLy8gaSBpcyB0aGUgaW5kZXggb2YgYSBjaGFyYWN0ZXIgaW4gdGhlIHN0YXRlLlxuICAgICAgICAvLyBJZiB3ZSBqdXN0IGhpdCBhIG5ldyByb3csIGFuZCB0aGVyZSBhcmUgc3RpbGwgY2hhcmFjdGVycyBsZWZ0LCBwdXNoIGEgbmV3XG4gICAgICAgIC8vIG9mZnNldCBvbiBhbmQgcmVzZXQgdGhlIGNvbHVtbiBjb3VudGVyLiBXZSB3YW50IHRoaXMgbG9naWMgYXQgdGhlIHRvcCBvZlxuICAgICAgICAvLyB0aGUgd2hpbGUgbG9vcCByYXRoZXIgdGhhbiB0aGUgYm90dG9tIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCBhIHRyYWlsaW5nXG4gICAgICAgIC8vIHJvdyBkZWxpbWl0ZXIgYXQgdGhlIGVuZCBvZiB0aGUgZGF0YSB0byB0cmlnZ2VyIGEgbmV3IHJvdyBvZmZzZXQuXG4gICAgICAgIGlmIChzdGF0ZSA9PT0gTkVXX1JPVykge1xuICAgICAgICAgICAgLy8gU3RhcnQgYSBuZXcgcm93IGFuZCByZXNldCB0aGUgY29sdW1uIGNvdW50ZXIuXG4gICAgICAgICAgICBvZmZzZXRzLnB1c2goaSk7XG4gICAgICAgICAgICBjb2wgPSAxO1xuICAgICAgICB9XG4gICAgICAgIC8vIEJlbG93LCB3ZSBoYW5kbGUgdGhpcyBjaGFyYWN0ZXIsIG1vZGlmeSB0aGUgcGFyc2VyIHN0YXRlIGFuZCBpbmNyZW1lbnQgdGhlIGluZGV4IHRvIGJlIGNvbnNpc3RlbnQuXG4gICAgICAgIC8vIEdldCB0aGUgaW50ZWdlciBjb2RlIGZvciB0aGUgY3VycmVudCBjaGFyYWN0ZXIsIHNvIHRoZSBjb21wYXJpc29ucyBiZWxvd1xuICAgICAgICAvLyBhcmUgZmFzdGVyLlxuICAgICAgICBjaGFyID0gZGF0YS5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAvLyBVcGRhdGUgdGhlIHBhcnNlciBzdGF0ZS4gVGhpcyBzd2l0Y2ggc3RhdGVtZW50IGlzIHJlc3BvbnNpYmxlIGZvclxuICAgICAgICAvLyB1cGRhdGluZyB0aGUgc3RhdGUgdG8gYmUgY29uc2lzdGVudCB3aXRoIHRoZSBpbmRleCBpKzEgKHdlIGluY3JlbWVudCBpXG4gICAgICAgIC8vIGFmdGVyIHRoZSBzd2l0Y2ggc3RhdGVtZW50KS4gSW4gc29tZSBzaXR1YXRpb25zLCB3ZSBtYXkgaW5jcmVtZW50IGlcbiAgICAgICAgLy8gaW5zaWRlIHRoaXMgbG9vcCB0byBza2lwIG92ZXIgaW5kaWNlcyBhcyBhIHNob3J0Y3V0LlxuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICAvLyBBdCB0aGUgYmVnaW5uaW5nIG9mIGEgcm93IG9yIGZpZWxkLCB3ZSBjYW4gaGF2ZSBhIHF1b3RlLCByb3cgZGVsaW1pdGVyLCBvciBmaWVsZCBkZWxpbWl0ZXIuXG4gICAgICAgICAgICBjYXNlIE5FV19ST1c6XG4gICAgICAgICAgICBjYXNlIE5FV19GSUVMRDpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGNoYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIHF1b3RlLCB3ZSBhcmUgc3RhcnRpbmcgYW4gZXNjYXBlZCBmaWVsZC5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBDSF9RVU9URTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gUVVPVEVEX0ZJRUxEO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIC8vIEEgZmllbGQgZGVsaW1pdGVyIG1lYW5zIHdlIGFyZSBzdGFydGluZyBhIG5ldyBmaWVsZC5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBDSF9ERUxJTUlURVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IE5FV19GSUVMRDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvLyBBIHJvdyBkZWxpbWl0ZXIgbWVhbnMgd2UgYXJlIHN0YXJ0aW5nIGEgbmV3IHJvdy5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBDSF9DUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dEZWxpbWl0ZXJDb2RlID09PSBDUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gTkVXX1JPVztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJvd0RlbGltaXRlckNvZGUgPT09IENSTEYgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmNoYXJDb2RlQXQoaSArIDEpID09PSBDSF9MRikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIHNlZSBhbiBleHBlY3RlZCBcXHJcXG4sIHRoZW4gaW5jcmVtZW50IHRvIHRoZSBlbmQgb2YgdGhlIGRlbGltaXRlci5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBORVdfUk9XO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgYHN0cmluZyBpbmRleCAke2l9IChpbiByb3cgJHtucm93c30sIGNvbHVtbiAke2NvbH0pOiBjYXJyaWFnZSByZXR1cm4gZm91bmQsIGJ1dCBub3QgYXMgcGFydCBvZiBhIHJvdyBkZWxpbWl0ZXIgQyAke2RhdGEuY2hhckNvZGVBdChpICsgMSl9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIENIX0xGOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvd0RlbGltaXRlckNvZGUgPT09IExGKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBORVdfUk9XO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgYHN0cmluZyBpbmRleCAke2l9IChpbiByb3cgJHtucm93c30sIGNvbHVtbiAke2NvbH0pOiBsaW5lIGZlZWQgZm91bmQsIGJ1dCByb3cgZGVsaW1pdGVyIHN0YXJ0cyB3aXRoIGEgY2FycmlhZ2UgcmV0dXJuYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIHdlIGFyZSBzdGFydGluZyBhbiB1bnF1b3RlZCBmaWVsZC5cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gVU5RVU9URURfRklFTEQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBXZSBhcmUgaW4gYSBxdW90ZWQgZmllbGQuXG4gICAgICAgICAgICBjYXNlIFFVT1RFRF9GSUVMRDpcbiAgICAgICAgICAgICAgICAvLyBTa2lwIGFoZWFkIHVudGlsIHdlIHNlZSBhbm90aGVyIHF1b3RlLCB3aGljaCBlaXRoZXIgZW5kcyB0aGUgcXVvdGVkXG4gICAgICAgICAgICAgICAgLy8gZmllbGQgb3Igc3RhcnRzIGFuIGVzY2FwZWQgcXVvdGUuXG4gICAgICAgICAgICAgICAgaSA9IGRhdGEuaW5kZXhPZihxdW90ZSwgaSk7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGBzdHJpbmcgaW5kZXggJHtpfSAoaW4gcm93ICR7bnJvd3N9LCBjb2x1bW4gJHtjb2x9KTogbWlzbWF0Y2hlZCBxdW90ZWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YXRlID0gUVVPVEVEX0ZJRUxEX1FVT1RFO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gV2UganVzdCBzYXcgYSBxdW90ZSBpbiBhIHF1b3RlZCBmaWVsZC4gVGhpcyBjb3VsZCBiZSB0aGUgZW5kIG9mIHRoZVxuICAgICAgICAgICAgLy8gZmllbGQsIG9yIGl0IGNvdWxkIGJlIGEgcmVwZWF0ZWQgcXVvdGUgKGkuZS4sIGFuIGVzY2FwZWQgcXVvdGUgYWNjb3JkaW5nXG4gICAgICAgICAgICAvLyB0byBSRkMgNDE4MCkuXG4gICAgICAgICAgICBjYXNlIFFVT1RFRF9GSUVMRF9RVU9URTpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGNoYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5vdGhlciBxdW90ZSBtZWFucyB3ZSBqdXN0IHNhdyBhbiBlc2NhcGVkIHF1b3RlLCBzbyB3ZSBhcmUgc3RpbGwgaW5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHF1b3RlZCBmaWVsZC5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBDSF9RVU9URTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gUVVPVEVEX0ZJRUxEO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIC8vIEEgZmllbGQgb3Igcm93IGRlbGltaXRlciBtZWFucyB0aGUgcXVvdGVkIGZpZWxkIGp1c3QgZW5kZWQgYW5kIHdlIGFyZVxuICAgICAgICAgICAgICAgICAgICAvLyBnb2luZyBpbnRvIGEgbmV3IGZpZWxkIG9yIG5ldyByb3cuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQ0hfREVMSU1JVEVSOlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBORVdfRklFTEQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy8gQSByb3cgZGVsaW1pdGVyIG1lYW5zIHdlIGFyZSBzdGFydGluZyBhIG5ldyByb3cgaW4gdGhlIG5leHQgaW5kZXguXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQ0hfQ1I6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93RGVsaW1pdGVyQ29kZSA9PT0gQ1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IE5FV19ST1c7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyb3dEZWxpbWl0ZXJDb2RlID09PSBDUkxGICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5jaGFyQ29kZUF0KGkgKyAxKSA9PT0gQ0hfTEYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBzZWUgYW4gZXhwZWN0ZWQgXFxyXFxuLCB0aGVuIGluY3JlbWVudCB0byB0aGUgZW5kIG9mIHRoZSBkZWxpbWl0ZXIuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gTkVXX1JPVztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGBzdHJpbmcgaW5kZXggJHtpfSAoaW4gcm93ICR7bnJvd3N9LCBjb2x1bW4gJHtjb2x9KTogY2FycmlhZ2UgcmV0dXJuIGZvdW5kLCBidXQgbm90IGFzIHBhcnQgb2YgYSByb3cgZGVsaW1pdGVyIEMgJHtkYXRhLmNoYXJDb2RlQXQoaSArIDEpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBDSF9MRjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dEZWxpbWl0ZXJDb2RlID09PSBMRikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gTkVXX1JPVztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGBzdHJpbmcgaW5kZXggJHtpfSAoaW4gcm93ICR7bnJvd3N9LCBjb2x1bW4gJHtjb2x9KTogbGluZSBmZWVkIGZvdW5kLCBidXQgcm93IGRlbGltaXRlciBzdGFydHMgd2l0aCBhIGNhcnJpYWdlIHJldHVybmA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGBzdHJpbmcgaW5kZXggJHtpfSAoaW4gcm93ICR7bnJvd3N9LCBjb2x1bW4gJHtjb2x9KTogcXVvdGUgaW4gZXNjYXBlZCBmaWVsZCBub3QgZm9sbG93ZWQgYnkgcXVvdGUsIGRlbGltaXRlciwgb3Igcm93IGRlbGltaXRlcmA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gV2UgYXJlIGluIGFuIHVucXVvdGVkIGZpZWxkLCBzbyB0aGUgb25seSB0aGluZyB3ZSBsb29rIGZvciBpcyB0aGUgbmV4dFxuICAgICAgICAgICAgLy8gcm93IG9yIGZpZWxkIGRlbGltaXRlci5cbiAgICAgICAgICAgIGNhc2UgVU5RVU9URURfRklFTEQ6XG4gICAgICAgICAgICAgICAgLy8gU2tpcCBhaGVhZCB0byBlaXRoZXIgdGhlIG5leHQgZmllbGQgZGVsaW1pdGVyIG9yIHBvc3NpYmxlIHN0YXJ0IG9mIGFcbiAgICAgICAgICAgICAgICAvLyByb3cgZGVsaW1pdGVyIChDUiBvciBMRikuXG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBlbmRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFyID0gZGF0YS5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhciA9PT0gQ0hfREVMSU1JVEVSIHx8IGNoYXIgPT09IENIX0xGIHx8IGNoYXIgPT09IENIX0NSKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgdGhlIGNoYXJhY3RlciB3ZSdyZSBzZWVpbmcgaW4gYW4gdW5xdW90ZWQgZmllbGQuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjaGFyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEEgZmllbGQgZGVsaW1pdGVyIG1lYW5zIHdlIGFyZSBzdGFydGluZyBhIG5ldyBmaWVsZC5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBDSF9ERUxJTUlURVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IE5FV19GSUVMRDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvLyBBIHJvdyBkZWxpbWl0ZXIgbWVhbnMgd2UgYXJlIHN0YXJ0aW5nIGEgbmV3IHJvdyBpbiB0aGUgbmV4dCBpbmRleC5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBDSF9DUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dEZWxpbWl0ZXJDb2RlID09PSBDUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gTkVXX1JPVztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJvd0RlbGltaXRlckNvZGUgPT09IENSTEYgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmNoYXJDb2RlQXQoaSArIDEpID09PSBDSF9MRikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIHNlZSBhbiBleHBlY3RlZCBcXHJcXG4sIHRoZW4gaW5jcmVtZW50IHRvIHRoZSBlbmQgb2YgdGhlIGRlbGltaXRlci5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBORVdfUk9XO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgYHN0cmluZyBpbmRleCAke2l9IChpbiByb3cgJHtucm93c30sIGNvbHVtbiAke2NvbH0pOiBjYXJyaWFnZSByZXR1cm4gZm91bmQsIGJ1dCBub3QgYXMgcGFydCBvZiBhIHJvdyBkZWxpbWl0ZXIgQyAke2RhdGEuY2hhckNvZGVBdChpICsgMSl9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIENIX0xGOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvd0RlbGltaXRlckNvZGUgPT09IExGKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBORVdfUk9XO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgYHN0cmluZyBpbmRleCAke2l9IChpbiByb3cgJHtucm93c30sIGNvbHVtbiAke2NvbH0pOiBsaW5lIGZlZWQgZm91bmQsIGJ1dCByb3cgZGVsaW1pdGVyIHN0YXJ0cyB3aXRoIGEgY2FycmlhZ2UgcmV0dXJuYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIHdlIGNvbnRpbnVlIG9uIGluIHRoZSB1bnF1b3RlZCBmaWVsZC5cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIFdlIHNob3VsZCBuZXZlciByZWFjaCB0aGlzIHBvaW50IHNpbmNlIHRoZSBwYXJzZXIgc3RhdGUgaXMgaGFuZGxlZCBhYm92ZSxcbiAgICAgICAgICAgIC8vIHNvIHRocm93IGFuIGVycm9yIGlmIHdlIGRvLlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBgc3RyaW5nIGluZGV4ICR7aX0gKGluIHJvdyAke25yb3dzfSwgY29sdW1uICR7Y29sfSk6IHN0YXRlIG5vdCByZWNvZ25pemVkYDtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbmNyZW1lbnQgaSB0byB0aGUgbmV4dCBjaGFyYWN0ZXIgaW5kZXhcbiAgICAgICAgaSsrO1xuICAgICAgICAvLyBVcGRhdGUgcmV0dXJuIHZhbHVlcyBiYXNlZCBvbiBzdGF0ZS5cbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBORVdfUk9XOlxuICAgICAgICAgICAgICAgIG5yb3dzKys7XG4gICAgICAgICAgICAgICAgLy8gSWYgbmNvbHMgaXMgdW5kZWZpbmVkLCBzZXQgaXQgdG8gdGhlIG51bWJlciBvZiBjb2x1bW5zIGluIHRoaXMgcm93IChmaXJzdCByb3cgaW1wbGllZCkuXG4gICAgICAgICAgICAgICAgaWYgKG5jb2xzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5yb3dzICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIHBhcnNpbmcgZGVmYXVsdCBudW1iZXIgb2YgY29sdW1ucycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5jb2xzID0gY29sO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBQYWQgb3IgdHJ1bmNhdGUgdGhlIGNvbHVtbiBvZmZzZXRzIGluIHRoZSBwcmV2aW91cyByb3cgaWYgd2UgYXJlXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuaW5nIHRoZW0uXG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbk9mZnNldHMgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbCA8IG5jb2xzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBkaWRuJ3QgaGF2ZSBlbm91Z2ggY29sdW1ucywgc28gYWRkIHNvbWUgbW9yZSBjb2x1bW4gb2Zmc2V0cyB0aGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2ludCB0byBqdXN0IGJlZm9yZSB0aGUgcm93IGRlbGltaXRlciB3ZSBqdXN0IHNhdy5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoOyBjb2wgPCBuY29sczsgY29sKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRzLnB1c2goaSAtIHJvd0RlbGltaXRlckxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sID4gbmNvbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGhhZCB0b28gbWFueSBjb2x1bW5zLCBzbyB0cnVuY2F0ZSB0aGVtLlxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0cy5sZW5ndGggPSBvZmZzZXRzLmxlbmd0aCAtIChjb2wgLSBuY29scyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gU2hvcnRjdXQgcmV0dXJuIGlmIG5yb3dzIHJlYWNoZXMgdGhlIG1heGltdW0gcm93cyB3ZSBhcmUgdG8gcGFyc2UuXG4gICAgICAgICAgICAgICAgaWYgKG5yb3dzID09PSBtYXhSb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IG5yb3dzLCBuY29sczogY29sdW1uT2Zmc2V0cyA/IG5jb2xzIDogMCwgb2Zmc2V0cyB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTkVXX0ZJRUxEOlxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZSByZXR1cm5pbmcgY29sdW1uIG9mZnNldHMsIGxvZyB0aGUgY3VycmVudCBpbmRleC5cbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uT2Zmc2V0cyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY29sdW1uIGNvdW50ZXIuXG4gICAgICAgICAgICAgICAgY29sKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIElmIHdlIGZpbmlzaGVkIHBhcnNpbmcgYW5kIHdlIGFyZSAqbm90KiBpbiB0aGUgTkVXX1JPVyBzdGF0ZSwgdGhlbiBkbyB0aGVcbiAgICAvLyBjb2x1bW4gcGFkZGluZy90cnVuY2F0aW9uIGZvciB0aGUgbGFzdCByb3cuIEFsc28gbWFrZSBzdXJlIG5jb2xzIGlzXG4gICAgLy8gZGVmaW5lZC5cbiAgICBpZiAoc3RhdGUgIT09IE5FV19ST1cpIHtcbiAgICAgICAgbnJvd3MrKztcbiAgICAgICAgaWYgKGNvbHVtbk9mZnNldHMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIElmIG5jb2xzIGlzICpzdGlsbCogdW5kZWZpbmVkLCB0aGVuIHdlIG9ubHkgcGFyc2VkIG9uZSByb3cgYW5kIGRpZG4ndFxuICAgICAgICAgICAgLy8gaGF2ZSBhIG5ld2xpbmUsIHNvIHNldCBpdCB0byB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgd2UgZm91bmQuXG4gICAgICAgICAgICBpZiAobmNvbHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG5jb2xzID0gY29sO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbCA8IG5jb2xzKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgZGlkbid0IGhhdmUgZW5vdWdoIGNvbHVtbnMsIHNvIGFkZCBzb21lIG1vcmUgY29sdW1uIG9mZnNldHMgdGhhdFxuICAgICAgICAgICAgICAgIC8vIHBvaW50IHRvIGp1c3QgYmVmb3JlIHRoZSByb3cgZGVsaW1pdGVyIHdlIGp1c3Qgc2F3LlxuICAgICAgICAgICAgICAgIGZvciAoOyBjb2wgPCBuY29sczsgY29sKyspIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0cy5wdXNoKGkgLSAocm93RGVsaW1pdGVyTGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbCA+IG5jb2xzKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgaGFkIHRvbyBtYW55IGNvbHVtbnMsIHNvIHRydW5jYXRlIHRoZW0uXG4gICAgICAgICAgICAgICAgb2Zmc2V0cy5sZW5ndGggPSBvZmZzZXRzLmxlbmd0aCAtIChjb2wgLSBuY29scyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgbnJvd3MsIG5jb2xzOiBjb2x1bW5PZmZzZXRzID8gbmNvbHMgIT09IG51bGwgJiYgbmNvbHMgIT09IHZvaWQgMCA/IG5jb2xzIDogMCA6IDAsIG9mZnNldHMgfTtcbn1cbi8qKlxuICogUGFyc2UgZGVsaW1pdGVyLXNlcGFyYXRlZCBkYXRhIHdoZXJlIG5vIGRlbGltaXRlciBpcyBxdW90ZWQuXG4gKlxuICogQHBhcmFtIG9wdGlvbnM6IFRoZSBwYXJzZXIgb3B0aW9uc1xuICogQHJldHVybnMgQW4gb2JqZWN0IGdpdmluZyB0aGUgb2Zmc2V0cyBmb3IgdGhlIHJvd3Mgb3IgY29sdW1ucyBwYXJzZWQuXG4gKlxuICogIyMjIyBOb3Rlc1xuICogVGhpcyBmdW5jdGlvbiBpcyBhbiBvcHRpbWl6ZWQgcGFyc2VyIGZvciBjYXNlcyB3aGVyZSB0aGVyZSBhcmUgbm8gZmllbGQgb3JcbiAqIHJvdyBkZWxpbWl0ZXJzIGluIHF1b3Rlcy4gTm90ZSB0aGF0IHRoZSBkYXRhIGNhbiBoYXZlIHF1b3RlcywgYnV0IHRoZXkgYXJlXG4gKiBub3QgaW50ZXJwcmV0ZWQgaW4gYW55IHNwZWNpYWwgd2F5LiBUaGlzIGltcGxlbWVudGF0aW9uIGlzIGJhc2VkIG9uIFtSRkNcbiAqIDQxODBdKGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM0MTgwKSwgYnV0IGRpc3JlZ2FyZHMgcXVvdGVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEU1ZOb1F1b3RlcyhvcHRpb25zKSB7XG4gICAgLy8gU2V0IG9wdGlvbiBkZWZhdWx0cy5cbiAgICBjb25zdCB7IGRhdGEsIGNvbHVtbk9mZnNldHMsIGRlbGltaXRlciA9ICcsJywgcm93RGVsaW1pdGVyID0gJ1xcclxcbicsIHN0YXJ0SW5kZXggPSAwLCBtYXhSb3dzID0gMHhmZmZmZmZmZiB9ID0gb3B0aW9ucztcbiAgICAvLyBuY29scyB3aWxsIGJlIHNldCBhdXRvbWF0aWNhbGx5IGlmIGl0IGlzIHVuZGVmaW5lZC5cbiAgICBsZXQgbmNvbHMgPSBvcHRpb25zLm5jb2xzO1xuICAgIC8vIFNldCB1cCBvdXIgcmV0dXJuIHZhcmlhYmxlcy5cbiAgICBjb25zdCBvZmZzZXRzID0gW107XG4gICAgbGV0IG5yb3dzID0gMDtcbiAgICAvLyBTZXQgdXAgdmFyaW91cyBzdGF0ZSB2YXJpYWJsZXMuXG4gICAgY29uc3Qgcm93RGVsaW1pdGVyTGVuZ3RoID0gcm93RGVsaW1pdGVyLmxlbmd0aDtcbiAgICBsZXQgY3VyclJvdyA9IHN0YXJ0SW5kZXg7XG4gICAgY29uc3QgbGVuID0gZGF0YS5sZW5ndGg7XG4gICAgbGV0IG5leHRSb3c7XG4gICAgbGV0IGNvbDtcbiAgICBsZXQgcm93U3RyaW5nO1xuICAgIGxldCBjb2xJbmRleDtcbiAgICAvLyBUaGUgZW5kIG9mIHRoZSBjdXJyZW50IHJvdy5cbiAgICBsZXQgcm93RW5kO1xuICAgIC8vIFN0YXJ0IHBhcnNpbmcgYXQgdGhlIHN0YXJ0IGluZGV4LlxuICAgIG5leHRSb3cgPSBzdGFydEluZGV4O1xuICAgIC8vIExvb3AgdGhyb3VnaCByb3dzIHVudGlsIHdlIHJ1biBvdXQgb2YgZGF0YSBvciB3ZSd2ZSByZWFjaGVkIG1heFJvd3MuXG4gICAgd2hpbGUgKG5leHRSb3cgIT09IC0xICYmIG5yb3dzIDwgbWF4Um93cyAmJiBjdXJyUm93IDwgbGVuKSB7XG4gICAgICAgIC8vIFN0b3JlIHRoZSBvZmZzZXQgZm9yIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHJvdyBhbmQgaW5jcmVtZW50IHRoZSByb3dzLlxuICAgICAgICBvZmZzZXRzLnB1c2goY3VyclJvdyk7XG4gICAgICAgIG5yb3dzKys7XG4gICAgICAgIC8vIEZpbmQgdGhlIG5leHQgcm93IGRlbGltaXRlci5cbiAgICAgICAgbmV4dFJvdyA9IGRhdGEuaW5kZXhPZihyb3dEZWxpbWl0ZXIsIGN1cnJSb3cpO1xuICAgICAgICAvLyBJZiB0aGUgbmV4dCByb3cgZGVsaW1pdGVyIGlzIG5vdCBmb3VuZCwgc2V0IHRoZSBlbmQgb2YgdGhlIHJvdyB0byB0aGVcbiAgICAgICAgLy8gZW5kIG9mIHRoZSBkYXRhIHN0cmluZy5cbiAgICAgICAgcm93RW5kID0gbmV4dFJvdyA9PT0gLTEgPyBsZW4gOiBuZXh0Um93O1xuICAgICAgICAvLyBJZiB3ZSBhcmUgcmV0dXJuaW5nIGNvbHVtbiBvZmZzZXRzLCBwdXNoIHRoZW0gb250byB0aGUgYXJyYXkuXG4gICAgICAgIGlmIChjb2x1bW5PZmZzZXRzID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBGaW5kIHRoZSBuZXh0IGZpZWxkIGRlbGltaXRlci4gV2Ugc2xpY2UgdGhlIGN1cnJlbnQgcm93IG91dCBzbyB0aGF0XG4gICAgICAgICAgICAvLyB0aGUgaW5kZXhPZiB3aWxsIHN0b3AgYXQgdGhlIGVuZCBvZiB0aGUgcm93LiBJdCBtYXkgcG9zc2libHkgYmUgZmFzdGVyXG4gICAgICAgICAgICAvLyB0byBqdXN0IHVzZSBhIGxvb3AgdG8gY2hlY2sgZWFjaCBjaGFyYWN0ZXIuXG4gICAgICAgICAgICBjb2wgPSAxO1xuICAgICAgICAgICAgcm93U3RyaW5nID0gZGF0YS5zbGljZShjdXJyUm93LCByb3dFbmQpO1xuICAgICAgICAgICAgY29sSW5kZXggPSByb3dTdHJpbmcuaW5kZXhPZihkZWxpbWl0ZXIpO1xuICAgICAgICAgICAgaWYgKG5jb2xzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBkb24ndCBrbm93IGhvdyBtYW55IGNvbHVtbnMgd2UgbmVlZCwgbG9vcCB0aHJvdWdoIGFuZCBmaW5kIGFsbFxuICAgICAgICAgICAgICAgIC8vIG9mIHRoZSBmaWVsZCBkZWxpbWl0ZXJzIGluIHRoaXMgcm93LlxuICAgICAgICAgICAgICAgIHdoaWxlIChjb2xJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0cy5wdXNoKGN1cnJSb3cgKyBjb2xJbmRleCArIDEpO1xuICAgICAgICAgICAgICAgICAgICBjb2wrKztcbiAgICAgICAgICAgICAgICAgICAgY29sSW5kZXggPSByb3dTdHJpbmcuaW5kZXhPZihkZWxpbWl0ZXIsIGNvbEluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFNldCBuY29scyB0byB0aGUgbnVtYmVyIG9mIGZpZWxkcyB3ZSBmb3VuZC5cbiAgICAgICAgICAgICAgICBuY29scyA9IGNvbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIGtub3cgdGhlIG51bWJlciBvZiBjb2x1bW5zIHdlIGV4cGVjdCwgZmluZCB0aGUgZmllbGQgZGVsaW1pdGVyc1xuICAgICAgICAgICAgICAgIC8vIHVwIHRvIHRoYXQgbWFueSBjb2x1bW5zLlxuICAgICAgICAgICAgICAgIHdoaWxlIChjb2xJbmRleCAhPT0gLTEgJiYgY29sIDwgbmNvbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0cy5wdXNoKGN1cnJSb3cgKyBjb2xJbmRleCArIDEpO1xuICAgICAgICAgICAgICAgICAgICBjb2wrKztcbiAgICAgICAgICAgICAgICAgICAgY29sSW5kZXggPSByb3dTdHJpbmcuaW5kZXhPZihkZWxpbWl0ZXIsIGNvbEluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGRpZG4ndCByZWFjaCB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgd2UgZXhwZWN0ZWQsIHBhZCB0aGUgb2Zmc2V0c1xuICAgICAgICAgICAgICAgIC8vIHdpdGggdGhlIG9mZnNldCBqdXN0IGJlZm9yZSB0aGUgcm93IGRlbGltaXRlci5cbiAgICAgICAgICAgICAgICB3aGlsZSAoY29sIDwgbmNvbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0cy5wdXNoKHJvd0VuZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBTa2lwIHBhc3QgdGhlIHJvdyBkZWxpbWl0ZXIgYXQgdGhlIGVuZCBvZiB0aGUgcm93LlxuICAgICAgICBjdXJyUm93ID0gcm93RW5kICsgcm93RGVsaW1pdGVyTGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4geyBucm93cywgbmNvbHM6IGNvbHVtbk9mZnNldHMgPyBuY29scyAhPT0gbnVsbCAmJiBuY29scyAhPT0gdm9pZCAwID8gbmNvbHMgOiAwIDogMCwgb2Zmc2V0cyB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFyc2UuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgU3R5bGluZyB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgZWFjaCB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGEgY3N2IHRvb2xiYXIgd2lkZ2V0LlxuICovXG5jb25zdCBDU1ZfREVMSU1JVEVSX0NMQVNTID0gJ2pwLUNTVkRlbGltaXRlcic7XG5jb25zdCBDU1ZfREVMSU1JVEVSX0xBQkVMX0NMQVNTID0gJ2pwLUNTVkRlbGltaXRlci1sYWJlbCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGEgY3N2IHRvb2xiYXIncyBkcm9wZG93biBlbGVtZW50LlxuICovXG5jb25zdCBDU1ZfREVMSU1JVEVSX0RST1BET1dOX0NMQVNTID0gJ2pwLUNTVkRlbGltaXRlci1kcm9wZG93bic7XG4vKipcbiAqIEEgd2lkZ2V0IGZvciBzZWxlY3RpbmcgYSBkZWxpbWl0ZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBDU1ZEZWxpbWl0ZXIgZXh0ZW5kcyBXaWRnZXQge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBjc3YgdGFibGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgbm9kZTogUHJpdmF0ZS5jcmVhdGVOb2RlKG9wdGlvbnMud2lkZ2V0LmRlbGltaXRlciwgb3B0aW9ucy50cmFuc2xhdG9yKVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZGVsaW1pdGVyQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX3dpZGdldCA9IG9wdGlvbnMud2lkZ2V0O1xuICAgICAgICB0aGlzLmFkZENsYXNzKENTVl9ERUxJTUlURVJfQ0xBU1MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIGRlbGltaXRlciBzZWxlY3Rpb24gaGFzIGNoYW5nZWQuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2My4yXG4gICAgICogVGhpcyBpcyBkZWFkIGNvZGUgbm93LlxuICAgICAqL1xuICAgIGdldCBkZWxpbWl0ZXJDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVsaW1pdGVyQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGRlbGltaXRlciBkcm9wZG93biBtZW51LlxuICAgICAqL1xuICAgIGdldCBzZWxlY3ROb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzZWxlY3QnKVswXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBET00gZXZlbnRzIGZvciB0aGUgd2lkZ2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50IC0gVGhlIERPTSBldmVudCBzZW50IHRvIHRoZSB3aWRnZXQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBtZXRob2QgaW1wbGVtZW50cyB0aGUgRE9NIGBFdmVudExpc3RlbmVyYCBpbnRlcmZhY2UgYW5kIGlzXG4gICAgICogY2FsbGVkIGluIHJlc3BvbnNlIHRvIGV2ZW50cyBvbiB0aGUgZG9jayBwYW5lbCdzIG5vZGUuIEl0IHNob3VsZFxuICAgICAqIG5vdCBiZSBjYWxsZWQgZGlyZWN0bHkgYnkgdXNlciBjb2RlLlxuICAgICAqL1xuICAgIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnY2hhbmdlJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWxpbWl0ZXJDaGFuZ2VkLmVtaXQodGhpcy5zZWxlY3ROb2RlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl93aWRnZXQuZGVsaW1pdGVyID0gdGhpcy5zZWxlY3ROb2RlLnZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYGFmdGVyLWF0dGFjaGAgbWVzc2FnZXMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgb25BZnRlckF0dGFjaChtc2cpIHtcbiAgICAgICAgdGhpcy5zZWxlY3ROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYGJlZm9yZS1kZXRhY2hgIG1lc3NhZ2VzIGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIG9uQmVmb3JlRGV0YWNoKG1zZykge1xuICAgICAgICB0aGlzLnNlbGVjdE5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcyk7XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgcHJpdmF0ZSB0b29sYmFyIG1ldGhvZHMuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBub2RlIGZvciB0aGUgZGVsaW1pdGVyIHN3aXRjaGVyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZU5vZGUoc2VsZWN0ZWQsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvciA9PT0gbnVsbCB8fCB0cmFuc2xhdG9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgLy8gVGhlIHN1cHBvcnRlZCBwYXJzaW5nIGRlbGltaXRlcnMgYW5kIGxhYmVscy5cbiAgICAgICAgY29uc3QgZGVsaW1pdGVycyA9IFtcbiAgICAgICAgICAgIFsnLCcsICcsJ10sXG4gICAgICAgICAgICBbJzsnLCAnOyddLFxuICAgICAgICAgICAgWydcXHQnLCB0cmFucy5fXygndGFiJyldLFxuICAgICAgICAgICAgWyd8JywgdHJhbnMuX18oJ3BpcGUnKV0sXG4gICAgICAgICAgICBbJyMnLCB0cmFucy5fXygnaGFzaCcpXVxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9IHRyYW5zLl9fKCdEZWxpbWl0ZXI6ICcpO1xuICAgICAgICBsYWJlbC5jbGFzc05hbWUgPSBDU1ZfREVMSU1JVEVSX0xBQkVMX0NMQVNTO1xuICAgICAgICBlYWNoKGRlbGltaXRlcnMsIChbZGVsaW1pdGVyLCBsYWJlbF0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gZGVsaW1pdGVyO1xuICAgICAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gbGFiZWw7XG4gICAgICAgICAgICBpZiAoZGVsaW1pdGVyID09PSBzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBTdHlsaW5nLndyYXBTZWxlY3Qoc2VsZWN0KTtcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKENTVl9ERUxJTUlURVJfRFJPUERPV05fQ0xBU1MpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgfVxuICAgIFByaXZhdGUuY3JlYXRlTm9kZSA9IGNyZWF0ZU5vZGU7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvb2xiYXIuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsgQWN0aXZpdHlNb25pdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IEFCQ1dpZGdldEZhY3RvcnksIERvY3VtZW50V2lkZ2V0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvZG9jcmVnaXN0cnknO1xuaW1wb3J0IHsgUHJvbWlzZURlbGVnYXRlIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgQmFzaWNLZXlIYW5kbGVyLCBCYXNpY01vdXNlSGFuZGxlciwgQmFzaWNTZWxlY3Rpb25Nb2RlbCwgRGF0YUdyaWQsIFRleHRSZW5kZXJlciB9IGZyb20gJ0BsdW1pbm8vZGF0YWdyaWQnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuaW1wb3J0IHsgUGFuZWxMYXlvdXQsIFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgeyBEU1ZNb2RlbCB9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHsgQ1NWRGVsaW1pdGVyIH0gZnJvbSAnLi90b29sYmFyJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gYSBDU1Ygdmlld2VyLlxuICovXG5jb25zdCBDU1ZfQ0xBU1MgPSAnanAtQ1NWVmlld2VyJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gYSBDU1Ygdmlld2VyIGRhdGFncmlkLlxuICovXG5jb25zdCBDU1ZfR1JJRF9DTEFTUyA9ICdqcC1DU1ZWaWV3ZXItZ3JpZCc7XG4vKipcbiAqIFRoZSB0aW1lb3V0IHRvIHdhaXQgZm9yIGNoYW5nZSBhY3Rpdml0eSB0byBoYXZlIGNlYXNlZCBiZWZvcmUgcmVuZGVyaW5nLlxuICovXG5jb25zdCBSRU5ERVJfVElNRU9VVCA9IDEwMDA7XG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGNlbGxzIHRleHRyZW5kZXJlci5cbiAqL1xuZXhwb3J0IGNsYXNzIFRleHRSZW5kZXJDb25maWcge1xufVxuLyoqXG4gKiBTZWFyY2ggc2VydmljZSByZW1lbWJlcnMgdGhlIHNlYXJjaCBzdGF0ZSBhbmQgdGhlIGxvY2F0aW9uIG9mIHRoZSBsYXN0XG4gKiBtYXRjaCwgZm9yIGluY3JlbWVudGFsIHNlYXJjaGluZy5cbiAqIFNlYXJjaCBzZXJ2aWNlIGlzIGFsc28gcmVzcG9uc2libGUgb2YgcHJvdmlkaW5nIGEgY2VsbCByZW5kZXJlciBmdW5jdGlvblxuICogdG8gc2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIGNlbGxzIG1hdGNoaW5nIHRoZSBzZWFyY2ggdGV4dC5cbiAqL1xuZXhwb3J0IGNsYXNzIEdyaWRTZWFyY2hTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihncmlkKSB7XG4gICAgICAgIHRoaXMuX2xvb3BpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9jaGFuZ2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XG4gICAgICAgIHRoaXMuX3F1ZXJ5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcm93ID0gMDtcbiAgICAgICAgdGhpcy5fY29sdW1uID0gLTE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGZpcmVkIHdoZW4gdGhlIGdyaWQgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBnZXQgY2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBjZWxscmVuZGVyZXIgY29uZmlnIGZ1bmN0aW9uIHRvIHJlbmRlciBlYWNoIGNlbGwgYmFja2dyb3VuZC5cbiAgICAgKiBJZiBjZWxsIG1hdGNoLCBiYWNrZ3JvdW5kIGlzIG1hdGNoQmFja2dyb3VuZENvbG9yLCBpZiBpdCdzIHRoZSBjdXJyZW50XG4gICAgICogbWF0Y2gsIGJhY2tncm91bmQgaXMgY3VycmVudE1hdGNoQmFja2dyb3VuZENvbG9yLlxuICAgICAqL1xuICAgIGNlbGxCYWNrZ3JvdW5kQ29sb3JSZW5kZXJlckZ1bmMoY29uZmlnKSB7XG4gICAgICAgIHJldHVybiAoeyB2YWx1ZSwgcm93LCBjb2x1bW4gfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3F1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLm1hdGNoKHRoaXMuX3F1ZXJ5KSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcm93ID09PSByb3cgJiYgdGhpcy5fY29sdW1uID09PSBjb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb25maWcuY3VycmVudE1hdGNoQmFja2dyb3VuZENvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb25maWcubWF0Y2hCYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhciB0aGUgc2VhcmNoLlxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9xdWVyeSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3JvdyA9IDA7XG4gICAgICAgIHRoaXMuX2NvbHVtbiA9IC0xO1xuICAgICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQodW5kZWZpbmVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogaW5jcmVtZW50YWxseSBsb29rIGZvciBzZWFyY2hUZXh0LlxuICAgICAqL1xuICAgIGZpbmQocXVlcnksIHJldmVyc2UgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMuX2dyaWQuZGF0YU1vZGVsO1xuICAgICAgICBjb25zdCByb3dDb3VudCA9IG1vZGVsLnJvd0NvdW50KCdib2R5Jyk7XG4gICAgICAgIGNvbnN0IGNvbHVtbkNvdW50ID0gbW9kZWwuY29sdW1uQ291bnQoJ2JvZHknKTtcbiAgICAgICAgaWYgKHRoaXMuX3F1ZXJ5ICE9PSBxdWVyeSkge1xuICAgICAgICAgICAgLy8gcmVzZXQgc2VhcmNoXG4gICAgICAgICAgICB0aGlzLl9yb3cgPSAwO1xuICAgICAgICAgICAgdGhpcy5fY29sdW1uID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcXVlcnkgPSBxdWVyeTtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG1hdGNoIGlzIGluIGN1cnJlbnQgdmlld3BvcnRcbiAgICAgICAgY29uc3QgbWluUm93ID0gdGhpcy5fZ3JpZC5zY3JvbGxZIC8gdGhpcy5fZ3JpZC5kZWZhdWx0U2l6ZXMucm93SGVpZ2h0O1xuICAgICAgICBjb25zdCBtYXhSb3cgPSAodGhpcy5fZ3JpZC5zY3JvbGxZICsgdGhpcy5fZ3JpZC5wYWdlSGVpZ2h0KSAvXG4gICAgICAgICAgICB0aGlzLl9ncmlkLmRlZmF1bHRTaXplcy5yb3dIZWlnaHQ7XG4gICAgICAgIGNvbnN0IG1pbkNvbHVtbiA9IHRoaXMuX2dyaWQuc2Nyb2xsWCAvIHRoaXMuX2dyaWQuZGVmYXVsdFNpemVzLmNvbHVtbkhlYWRlckhlaWdodDtcbiAgICAgICAgY29uc3QgbWF4Q29sdW1uID0gKHRoaXMuX2dyaWQuc2Nyb2xsWCArIHRoaXMuX2dyaWQucGFnZVdpZHRoKSAvXG4gICAgICAgICAgICB0aGlzLl9ncmlkLmRlZmF1bHRTaXplcy5jb2x1bW5IZWFkZXJIZWlnaHQ7XG4gICAgICAgIGNvbnN0IGlzSW5WaWV3cG9ydCA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChyb3cgPj0gbWluUm93ICYmXG4gICAgICAgICAgICAgICAgcm93IDw9IG1heFJvdyAmJlxuICAgICAgICAgICAgICAgIGNvbHVtbiA+PSBtaW5Db2x1bW4gJiZcbiAgICAgICAgICAgICAgICBjb2x1bW4gPD0gbWF4Q29sdW1uKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgaW5jcmVtZW50ID0gcmV2ZXJzZSA/IC0xIDogMTtcbiAgICAgICAgdGhpcy5fY29sdW1uICs9IGluY3JlbWVudDtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gdGhpcy5fcm93OyByZXZlcnNlID8gcm93ID49IDAgOiByb3cgPCByb3dDb3VudDsgcm93ICs9IGluY3JlbWVudCkge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gdGhpcy5fY29sdW1uOyByZXZlcnNlID8gY29sID49IDAgOiBjb2wgPCBjb2x1bW5Db3VudDsgY29sICs9IGluY3JlbWVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxEYXRhID0gbW9kZWwuZGF0YSgnYm9keScsIHJvdywgY29sKTtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbERhdGEubWF0Y2gocXVlcnkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRvIHVwZGF0ZSB0aGUgYmFja2dyb3VuZCBvZiBtYXRjaGluZyBjZWxscy5cbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogd2Ugb25seSByZWFsbHkgbmVlZCB0byBpbnZhbGlkYXRlIHRoZSBwcmV2aW91cyBhbmQgY3VycmVudFxuICAgICAgICAgICAgICAgICAgICAvLyBjZWxsIHJlY3RzLCBub3QgdGhlIGVudGlyZSBncmlkLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0luVmlld3BvcnQocm93LCBjb2wpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ncmlkLnNjcm9sbFRvUm93KHJvdyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm93ID0gcm93O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb2x1bW4gPSBjb2w7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NvbHVtbiA9IHJldmVyc2UgPyBjb2x1bW5Db3VudCAtIDEgOiAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdlJ3ZlIGZpbmlzaGVkIHNlYXJjaGluZyBhbGwgdGhlIHdheSB0byB0aGUgbGltaXRzIG9mIHRoZSBncmlkLiBJZiB0aGlzXG4gICAgICAgIC8vIGlzIHRoZSBmaXJzdCB0aW1lIHRocm91Z2ggKGxvb3BpbmcgaXMgdHJ1ZSksIHdyYXAgdGhlIGluZGljZXMgYW5kIHNlYXJjaFxuICAgICAgICAvLyBhZ2Fpbi4gT3RoZXJ3aXNlLCBnaXZlIHVwLlxuICAgICAgICBpZiAodGhpcy5fbG9vcGluZykge1xuICAgICAgICAgICAgdGhpcy5fbG9vcGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fcm93ID0gcmV2ZXJzZSA/IDAgOiByb3dDb3VudCAtIDE7XG4gICAgICAgICAgICB0aGlzLl93cmFwUm93cyhyZXZlcnNlKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZChxdWVyeSwgcmV2ZXJzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb29waW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdyYXAgaW5kaWNlcyBpZiBuZWVkZWQgdG8ganVzdCBiZWZvcmUgdGhlIHN0YXJ0IG9yIGp1c3QgYWZ0ZXIgdGhlIGVuZC5cbiAgICAgKi9cbiAgICBfd3JhcFJvd3MocmV2ZXJzZSA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy5fZ3JpZC5kYXRhTW9kZWw7XG4gICAgICAgIGNvbnN0IHJvd0NvdW50ID0gbW9kZWwucm93Q291bnQoJ2JvZHknKTtcbiAgICAgICAgY29uc3QgY29sdW1uQ291bnQgPSBtb2RlbC5jb2x1bW5Db3VudCgnYm9keScpO1xuICAgICAgICBpZiAocmV2ZXJzZSAmJiB0aGlzLl9yb3cgPD0gMCkge1xuICAgICAgICAgICAgLy8gaWYgd2UgYXJlIGF0IHRoZSBmcm9udCwgd3JhcCB0byBqdXN0IHBhc3QgdGhlIGVuZC5cbiAgICAgICAgICAgIHRoaXMuX3JvdyA9IHJvd0NvdW50IC0gMTtcbiAgICAgICAgICAgIHRoaXMuX2NvbHVtbiA9IGNvbHVtbkNvdW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFyZXZlcnNlICYmIHRoaXMuX3JvdyA+PSByb3dDb3VudCAtIDEpIHtcbiAgICAgICAgICAgIC8vIGlmIHdlIGFyZSBhdCB0aGUgZW5kLCB3cmFwIHRvIGp1c3QgYmVmb3JlIHRoZSBmcm9udC5cbiAgICAgICAgICAgIHRoaXMuX3JvdyA9IDA7XG4gICAgICAgICAgICB0aGlzLl9jb2x1bW4gPSAtMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgcXVlcnkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVyeTtcbiAgICB9XG59XG4vKipcbiAqIEEgdmlld2VyIGZvciBDU1YgdGFibGVzLlxuICovXG5leHBvcnQgY2xhc3MgQ1NWVmlld2VyIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgQ1NWIHZpZXdlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX21vbml0b3IgPSBudWxsO1xuICAgICAgICB0aGlzLl9kZWxpbWl0ZXIgPSAnLCc7XG4gICAgICAgIHRoaXMuX3JldmVhbGVkID0gbmV3IFByb21pc2VEZWxlZ2F0ZSgpO1xuICAgICAgICB0aGlzLl9iYXNlUmVuZGVyZXIgPSBudWxsO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gKHRoaXMuX2NvbnRleHQgPSBvcHRpb25zLmNvbnRleHQpO1xuICAgICAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5sYXlvdXQgPSBuZXcgUGFuZWxMYXlvdXQoKSk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoQ1NWX0NMQVNTKTtcbiAgICAgICAgdGhpcy5fZ3JpZCA9IG5ldyBEYXRhR3JpZCh7XG4gICAgICAgICAgICBkZWZhdWx0U2l6ZXM6IHtcbiAgICAgICAgICAgICAgICByb3dIZWlnaHQ6IDI0LFxuICAgICAgICAgICAgICAgIGNvbHVtbldpZHRoOiAxNDQsXG4gICAgICAgICAgICAgICAgcm93SGVhZGVyV2lkdGg6IDY0LFxuICAgICAgICAgICAgICAgIGNvbHVtbkhlYWRlckhlaWdodDogMzZcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2dyaWQuYWRkQ2xhc3MoQ1NWX0dSSURfQ0xBU1MpO1xuICAgICAgICB0aGlzLl9ncmlkLmhlYWRlclZpc2liaWxpdHkgPSAnYWxsJztcbiAgICAgICAgdGhpcy5fZ3JpZC5rZXlIYW5kbGVyID0gbmV3IEJhc2ljS2V5SGFuZGxlcigpO1xuICAgICAgICB0aGlzLl9ncmlkLm1vdXNlSGFuZGxlciA9IG5ldyBCYXNpY01vdXNlSGFuZGxlcigpO1xuICAgICAgICB0aGlzLl9ncmlkLmNvcHlDb25maWcgPSB7XG4gICAgICAgICAgICBzZXBhcmF0b3I6ICdcXHQnLFxuICAgICAgICAgICAgZm9ybWF0OiBEYXRhR3JpZC5jb3B5Rm9ybWF0R2VuZXJpYyxcbiAgICAgICAgICAgIGhlYWRlcnM6ICdhbGwnLFxuICAgICAgICAgICAgd2FybmluZ1RocmVzaG9sZDogMWU2XG4gICAgICAgIH07XG4gICAgICAgIGxheW91dC5hZGRXaWRnZXQodGhpcy5fZ3JpZCk7XG4gICAgICAgIHRoaXMuX3NlYXJjaFNlcnZpY2UgPSBuZXcgR3JpZFNlYXJjaFNlcnZpY2UodGhpcy5fZ3JpZCk7XG4gICAgICAgIHRoaXMuX3NlYXJjaFNlcnZpY2UuY2hhbmdlZC5jb25uZWN0KHRoaXMuX3VwZGF0ZVJlbmRlcmVyLCB0aGlzKTtcbiAgICAgICAgdm9pZCB0aGlzLl9jb250ZXh0LnJlYWR5LnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlR3JpZCgpO1xuICAgICAgICAgICAgdGhpcy5fcmV2ZWFsZWQucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgLy8gVGhyb3R0bGUgdGhlIHJlbmRlcmluZyByYXRlIG9mIHRoZSB3aWRnZXQuXG4gICAgICAgICAgICB0aGlzLl9tb25pdG9yID0gbmV3IEFjdGl2aXR5TW9uaXRvcih7XG4gICAgICAgICAgICAgICAgc2lnbmFsOiBjb250ZXh0Lm1vZGVsLmNvbnRlbnRDaGFuZ2VkLFxuICAgICAgICAgICAgICAgIHRpbWVvdXQ6IFJFTkRFUl9USU1FT1VUXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX21vbml0b3IuYWN0aXZpdHlTdG9wcGVkLmNvbm5lY3QodGhpcy5fdXBkYXRlR3JpZCwgdGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgQ1NWIHdpZGdldCdzIGNvbnRleHQuXG4gICAgICovXG4gICAgZ2V0IGNvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBjc3Ygdmlld2VyIGlzIHJlYWR5IHRvIGJlIHJldmVhbGVkLlxuICAgICAqL1xuICAgIGdldCByZXZlYWxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JldmVhbGVkLnByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBkZWxpbWl0ZXIgZm9yIHRoZSBmaWxlLlxuICAgICAqL1xuICAgIGdldCBkZWxpbWl0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWxpbWl0ZXI7XG4gICAgfVxuICAgIHNldCBkZWxpbWl0ZXIodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLl9kZWxpbWl0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kZWxpbWl0ZXIgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fdXBkYXRlR3JpZCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgc3R5bGUgdXNlZCBieSB0aGUgZGF0YSBncmlkLlxuICAgICAqL1xuICAgIGdldCBzdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dyaWQuc3R5bGU7XG4gICAgfVxuICAgIHNldCBzdHlsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9ncmlkLnN0eWxlID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjb25maWcgdXNlZCB0byBjcmVhdGUgdGV4dCByZW5kZXJlci5cbiAgICAgKi9cbiAgICBzZXQgcmVuZGVyZXJDb25maWcocmVuZGVyZXJDb25maWcpIHtcbiAgICAgICAgdGhpcy5fYmFzZVJlbmRlcmVyID0gcmVuZGVyZXJDb25maWc7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlbmRlcmVyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzZWFyY2ggc2VydmljZVxuICAgICAqL1xuICAgIGdldCBzZWFyY2hTZXJ2aWNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VhcmNoU2VydmljZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5fbW9uaXRvcikge1xuICAgICAgICAgICAgdGhpcy5fbW9uaXRvci5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHbyB0byBsaW5lXG4gICAgICovXG4gICAgZ29Ub0xpbmUobGluZU51bWJlcikge1xuICAgICAgICB0aGlzLl9ncmlkLnNjcm9sbFRvUm93KGxpbmVOdW1iZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYCdhY3RpdmF0ZS1yZXF1ZXN0J2AgbWVzc2FnZXMuXG4gICAgICovXG4gICAgb25BY3RpdmF0ZVJlcXVlc3QobXNnKSB7XG4gICAgICAgIHRoaXMubm9kZS50YWJJbmRleCA9IC0xO1xuICAgICAgICB0aGlzLm5vZGUuZm9jdXMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBtb2RlbCBmb3IgdGhlIGdyaWQuXG4gICAgICovXG4gICAgX3VwZGF0ZUdyaWQoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9jb250ZXh0Lm1vZGVsLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGRlbGltaXRlciA9IHRoaXMuX2RlbGltaXRlcjtcbiAgICAgICAgY29uc3Qgb2xkTW9kZWwgPSB0aGlzLl9ncmlkLmRhdGFNb2RlbDtcbiAgICAgICAgY29uc3QgZGF0YU1vZGVsID0gKHRoaXMuX2dyaWQuZGF0YU1vZGVsID0gbmV3IERTVk1vZGVsKHtcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBkZWxpbWl0ZXJcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLl9ncmlkLnNlbGVjdGlvbk1vZGVsID0gbmV3IEJhc2ljU2VsZWN0aW9uTW9kZWwoeyBkYXRhTW9kZWwgfSk7XG4gICAgICAgIGlmIChvbGRNb2RlbCkge1xuICAgICAgICAgICAgb2xkTW9kZWwuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgcmVuZGVyZXIgZm9yIHRoZSBncmlkLlxuICAgICAqL1xuICAgIF91cGRhdGVSZW5kZXJlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Jhc2VSZW5kZXJlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyQ29uZmlnID0gdGhpcy5fYmFzZVJlbmRlcmVyO1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUZXh0UmVuZGVyZXIoe1xuICAgICAgICAgICAgdGV4dENvbG9yOiByZW5kZXJlckNvbmZpZy50ZXh0Q29sb3IsXG4gICAgICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiByZW5kZXJlckNvbmZpZy5ob3Jpem9udGFsQWxpZ25tZW50LFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLl9zZWFyY2hTZXJ2aWNlLmNlbGxCYWNrZ3JvdW5kQ29sb3JSZW5kZXJlckZ1bmMocmVuZGVyZXJDb25maWcpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9ncmlkLmNlbGxSZW5kZXJlcnMudXBkYXRlKHtcbiAgICAgICAgICAgIGJvZHk6IHJlbmRlcmVyLFxuICAgICAgICAgICAgJ2NvbHVtbi1oZWFkZXInOiByZW5kZXJlcixcbiAgICAgICAgICAgICdjb3JuZXItaGVhZGVyJzogcmVuZGVyZXIsXG4gICAgICAgICAgICAncm93LWhlYWRlcic6IHJlbmRlcmVyXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogQSBkb2N1bWVudCB3aWRnZXQgZm9yIENTViBjb250ZW50IHdpZGdldHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDU1ZEb2N1bWVudFdpZGdldCBleHRlbmRzIERvY3VtZW50V2lkZ2V0IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIGxldCB7IGNvbnRlbnQsIGNvbnRleHQsIGRlbGltaXRlciwgcmV2ZWFsIH0gPSBvcHRpb25zLCBvdGhlciA9IF9fcmVzdChvcHRpb25zLCBbXCJjb250ZW50XCIsIFwiY29udGV4dFwiLCBcImRlbGltaXRlclwiLCBcInJldmVhbFwiXSk7XG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50IHx8IFByaXZhdGUuY3JlYXRlQ29udGVudChjb250ZXh0KTtcbiAgICAgICAgcmV2ZWFsID0gUHJvbWlzZS5hbGwoW3JldmVhbCwgY29udGVudC5yZXZlYWxlZF0pO1xuICAgICAgICBzdXBlcihPYmplY3QuYXNzaWduKHsgY29udGVudCwgY29udGV4dCwgcmV2ZWFsIH0sIG90aGVyKSk7XG4gICAgICAgIGlmIChkZWxpbWl0ZXIpIHtcbiAgICAgICAgICAgIGNvbnRlbnQuZGVsaW1pdGVyID0gZGVsaW1pdGVyO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCBVUkkgZnJhZ21lbnQgaWRlbnRpZmllciBmb3Igcm93c1xuICAgICAqL1xuICAgIHNldEZyYWdtZW50KGZyYWdtZW50KSB7XG4gICAgICAgIGNvbnN0IHBhcnNlRnJhZ21lbnRzID0gZnJhZ21lbnQuc3BsaXQoJz0nKTtcbiAgICAgICAgLy8gVE9ETzogZXhwYW5kIHRvIGFsbG93IGNvbHVtbnMgYW5kIGNlbGxzIHRvIGJlIHNlbGVjdGVkXG4gICAgICAgIC8vIHJlZmVyZW5jZTogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcxMTEjc2VjdGlvbi0zXG4gICAgICAgIGlmIChwYXJzZUZyYWdtZW50c1swXSAhPT0gJyNyb3cnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gbXVsdGlwbGUgcm93cywgc2VwYXJhdGVkIGJ5IHNlbWktY29sb25zIGNhbiBiZSBwcm92aWRlZCwgd2Ugd2lsbCBqdXN0XG4gICAgICAgIC8vIGdvIHRvIHRoZSB0b3Agb25lXG4gICAgICAgIGxldCB0b3BSb3cgPSBwYXJzZUZyYWdtZW50c1sxXS5zcGxpdCgnOycpWzBdO1xuICAgICAgICAvLyBhIHJhbmdlIG9mIHJvd3MgY2FuIGJlIHByb3ZpZGVkLCB3ZSB3aWxsIHRha2UgdGhlIGZpcnN0IHZhbHVlXG4gICAgICAgIHRvcFJvdyA9IHRvcFJvdy5zcGxpdCgnLScpWzBdO1xuICAgICAgICAvLyBnbyB0byB0aGF0IHJvd1xuICAgICAgICB2b2lkIHRoaXMuY29udGV4dC5yZWFkeS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5nb1RvTGluZShOdW1iZXIodG9wUm93KSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udGVudChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBuZXcgQ1NWVmlld2VyKHsgY29udGV4dCB9KTtcbiAgICB9XG4gICAgUHJpdmF0ZS5jcmVhdGVDb250ZW50ID0gY3JlYXRlQ29udGVudDtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLyoqXG4gKiBBIHdpZGdldCBmYWN0b3J5IGZvciBDU1Ygd2lkZ2V0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIENTVlZpZXdlckZhY3RvcnkgZXh0ZW5kcyBBQkNXaWRnZXRGYWN0b3J5IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgd2lkZ2V0IGdpdmVuIGEgY29udGV4dC5cbiAgICAgKi9cbiAgICBjcmVhdGVOZXdXaWRnZXQoY29udGV4dCkge1xuICAgICAgICBjb25zdCB0cmFuc2xhdG9yID0gdGhpcy50cmFuc2xhdG9yO1xuICAgICAgICByZXR1cm4gbmV3IENTVkRvY3VtZW50V2lkZ2V0KHsgY29udGV4dCwgdHJhbnNsYXRvciB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBmYWN0b3J5IGZvciB0b29sYmFyIGl0ZW1zIHRvIGJlIGFkZGVkIGFmdGVyIHRoZSB3aWRnZXQgaXMgY3JlYXRlZC5cbiAgICAgKi9cbiAgICBkZWZhdWx0VG9vbGJhckZhY3Rvcnkod2lkZ2V0KSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2RlbGltaXRlcicsXG4gICAgICAgICAgICAgICAgd2lkZ2V0OiBuZXcgQ1NWRGVsaW1pdGVyKHtcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiB3aWRnZXQuY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRvcjogdGhpcy50cmFuc2xhdG9yXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICB9XG59XG4vKipcbiAqIEEgd2lkZ2V0IGZhY3RvcnkgZm9yIFRTViB3aWRnZXRzLlxuICovXG5leHBvcnQgY2xhc3MgVFNWVmlld2VyRmFjdG9yeSBleHRlbmRzIENTVlZpZXdlckZhY3Rvcnkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyB3aWRnZXQgZ2l2ZW4gYSBjb250ZXh0LlxuICAgICAqL1xuICAgIGNyZWF0ZU5ld1dpZGdldChjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IGRlbGltaXRlciA9ICdcXHQnO1xuICAgICAgICByZXR1cm4gbmV3IENTVkRvY3VtZW50V2lkZ2V0KHtcbiAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICBkZWxpbWl0ZXIsXG4gICAgICAgICAgICB0cmFuc2xhdG9yOiB0aGlzLnRyYW5zbGF0b3JcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2lkZ2V0LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=