(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_nbformat_lib_index_js-_c1311"],{

/***/ "../../packages/nbformat/lib/index.js":
/*!********************************************!*\
  !*** ../../packages/nbformat/lib/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MAJOR_VERSION": () => (/* binding */ MAJOR_VERSION),
/* harmony export */   "MINOR_VERSION": () => (/* binding */ MINOR_VERSION),
/* harmony export */   "validateMimeValue": () => (/* binding */ validateMimeValue),
/* harmony export */   "isRaw": () => (/* binding */ isRaw),
/* harmony export */   "isMarkdown": () => (/* binding */ isMarkdown),
/* harmony export */   "isCode": () => (/* binding */ isCode),
/* harmony export */   "isExecuteResult": () => (/* binding */ isExecuteResult),
/* harmony export */   "isDisplayData": () => (/* binding */ isDisplayData),
/* harmony export */   "isDisplayUpdate": () => (/* binding */ isDisplayUpdate),
/* harmony export */   "isStream": () => (/* binding */ isStream),
/* harmony export */   "isError": () => (/* binding */ isError)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module nbformat
 */
// Notebook format interfaces
// https://nbformat.readthedocs.io/en/latest/format_description.html
// https://github.com/jupyter/nbformat/blob/master/nbformat/v4/nbformat.v4.schema.json

/**
 * The earliest major version of the notebook format we support.
 */
const MAJOR_VERSION = 4;
/**
 * The earliest minor version of the notebook format we support.
 */
const MINOR_VERSION = 4;
/**
 * Validate a mime type/value pair.
 *
 * @param type - The mimetype name.
 *
 * @param value - The value associated with the type.
 *
 * @returns Whether the type/value pair are valid.
 */
function validateMimeValue(type, value) {
    // Check if "application/json" or "application/foo+json"
    const jsonTest = /^application\/(.*?)+\+json$/;
    const isJSONType = type === 'application/json' || jsonTest.test(type);
    const isString = (x) => {
        return Object.prototype.toString.call(x) === '[object String]';
    };
    // If it is an array, make sure if is not a JSON type and it is an
    // array of strings.
    if (Array.isArray(value)) {
        if (isJSONType) {
            return false;
        }
        let valid = true;
        value.forEach(v => {
            if (!isString(v)) {
                valid = false;
            }
        });
        return valid;
    }
    // If it is a string, make sure we are not a JSON type.
    if (isString(value)) {
        return !isJSONType;
    }
    // It is not a string, make sure it is a JSON type.
    if (!isJSONType) {
        return false;
    }
    // It is a JSON type, make sure it is a valid JSON object.
    return _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.JSONExt.isObject(value);
}
/**
 * Test whether a cell is a raw cell.
 */
function isRaw(cell) {
    return cell.cell_type === 'raw';
}
/**
 * Test whether a cell is a markdown cell.
 */
function isMarkdown(cell) {
    return cell.cell_type === 'markdown';
}
/**
 * Test whether a cell is a code cell.
 */
function isCode(cell) {
    return cell.cell_type === 'code';
}
/**
 * Test whether an output is an execute result.
 */
function isExecuteResult(output) {
    return output.output_type === 'execute_result';
}
/**
 * Test whether an output is from display data.
 */
function isDisplayData(output) {
    return output.output_type === 'display_data';
}
/**
 * Test whether an output is from updated display data.
 */
function isDisplayUpdate(output) {
    return output.output_type === 'update_display_data';
}
/**
 * Test whether an output is from a stream.
 */
function isStream(output) {
    return output.output_type === 'stream';
}
/**
 * Test whether an output is an error.
 */
function isError(output) {
    return output.output_type === 'error';
}
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbmJmb3JtYXQvbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVywrREFBZ0I7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxpQyIsImZpbGUiOiJwYWNrYWdlc19uYmZvcm1hdF9saWJfaW5kZXhfanMtX2MxMzExLjNjY2U0ODQyYjE3NWYyZWM2Y2M2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgbmJmb3JtYXRcbiAqL1xuLy8gTm90ZWJvb2sgZm9ybWF0IGludGVyZmFjZXNcbi8vIGh0dHBzOi8vbmJmb3JtYXQucmVhZHRoZWRvY3MuaW8vZW4vbGF0ZXN0L2Zvcm1hdF9kZXNjcmlwdGlvbi5odG1sXG4vLyBodHRwczovL2dpdGh1Yi5jb20vanVweXRlci9uYmZvcm1hdC9ibG9iL21hc3Rlci9uYmZvcm1hdC92NC9uYmZvcm1hdC52NC5zY2hlbWEuanNvblxuaW1wb3J0IHsgSlNPTkV4dCB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbi8qKlxuICogVGhlIGVhcmxpZXN0IG1ham9yIHZlcnNpb24gb2YgdGhlIG5vdGVib29rIGZvcm1hdCB3ZSBzdXBwb3J0LlxuICovXG5leHBvcnQgY29uc3QgTUFKT1JfVkVSU0lPTiA9IDQ7XG4vKipcbiAqIFRoZSBlYXJsaWVzdCBtaW5vciB2ZXJzaW9uIG9mIHRoZSBub3RlYm9vayBmb3JtYXQgd2Ugc3VwcG9ydC5cbiAqL1xuZXhwb3J0IGNvbnN0IE1JTk9SX1ZFUlNJT04gPSA0O1xuLyoqXG4gKiBWYWxpZGF0ZSBhIG1pbWUgdHlwZS92YWx1ZSBwYWlyLlxuICpcbiAqIEBwYXJhbSB0eXBlIC0gVGhlIG1pbWV0eXBlIG5hbWUuXG4gKlxuICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUgdHlwZS5cbiAqXG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSB0eXBlL3ZhbHVlIHBhaXIgYXJlIHZhbGlkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVNaW1lVmFsdWUodHlwZSwgdmFsdWUpIHtcbiAgICAvLyBDaGVjayBpZiBcImFwcGxpY2F0aW9uL2pzb25cIiBvciBcImFwcGxpY2F0aW9uL2Zvbytqc29uXCJcbiAgICBjb25zdCBqc29uVGVzdCA9IC9eYXBwbGljYXRpb25cXC8oLio/KStcXCtqc29uJC87XG4gICAgY29uc3QgaXNKU09OVHlwZSA9IHR5cGUgPT09ICdhcHBsaWNhdGlvbi9qc29uJyB8fCBqc29uVGVzdC50ZXN0KHR5cGUpO1xuICAgIGNvbnN0IGlzU3RyaW5nID0gKHgpID0+IHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG4gICAgfTtcbiAgICAvLyBJZiBpdCBpcyBhbiBhcnJheSwgbWFrZSBzdXJlIGlmIGlzIG5vdCBhIEpTT04gdHlwZSBhbmQgaXQgaXMgYW5cbiAgICAvLyBhcnJheSBvZiBzdHJpbmdzLlxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBpZiAoaXNKU09OVHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgICAgIHZhbHVlLmZvckVhY2godiA9PiB7XG4gICAgICAgICAgICBpZiAoIWlzU3RyaW5nKHYpKSB7XG4gICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB2YWxpZDtcbiAgICB9XG4gICAgLy8gSWYgaXQgaXMgYSBzdHJpbmcsIG1ha2Ugc3VyZSB3ZSBhcmUgbm90IGEgSlNPTiB0eXBlLlxuICAgIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuICFpc0pTT05UeXBlO1xuICAgIH1cbiAgICAvLyBJdCBpcyBub3QgYSBzdHJpbmcsIG1ha2Ugc3VyZSBpdCBpcyBhIEpTT04gdHlwZS5cbiAgICBpZiAoIWlzSlNPTlR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBJdCBpcyBhIEpTT04gdHlwZSwgbWFrZSBzdXJlIGl0IGlzIGEgdmFsaWQgSlNPTiBvYmplY3QuXG4gICAgcmV0dXJuIEpTT05FeHQuaXNPYmplY3QodmFsdWUpO1xufVxuLyoqXG4gKiBUZXN0IHdoZXRoZXIgYSBjZWxsIGlzIGEgcmF3IGNlbGwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1JhdyhjZWxsKSB7XG4gICAgcmV0dXJuIGNlbGwuY2VsbF90eXBlID09PSAncmF3Jztcbn1cbi8qKlxuICogVGVzdCB3aGV0aGVyIGEgY2VsbCBpcyBhIG1hcmtkb3duIGNlbGwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc01hcmtkb3duKGNlbGwpIHtcbiAgICByZXR1cm4gY2VsbC5jZWxsX3R5cGUgPT09ICdtYXJrZG93bic7XG59XG4vKipcbiAqIFRlc3Qgd2hldGhlciBhIGNlbGwgaXMgYSBjb2RlIGNlbGwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0NvZGUoY2VsbCkge1xuICAgIHJldHVybiBjZWxsLmNlbGxfdHlwZSA9PT0gJ2NvZGUnO1xufVxuLyoqXG4gKiBUZXN0IHdoZXRoZXIgYW4gb3V0cHV0IGlzIGFuIGV4ZWN1dGUgcmVzdWx0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFeGVjdXRlUmVzdWx0KG91dHB1dCkge1xuICAgIHJldHVybiBvdXRwdXQub3V0cHV0X3R5cGUgPT09ICdleGVjdXRlX3Jlc3VsdCc7XG59XG4vKipcbiAqIFRlc3Qgd2hldGhlciBhbiBvdXRwdXQgaXMgZnJvbSBkaXNwbGF5IGRhdGEuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Rpc3BsYXlEYXRhKG91dHB1dCkge1xuICAgIHJldHVybiBvdXRwdXQub3V0cHV0X3R5cGUgPT09ICdkaXNwbGF5X2RhdGEnO1xufVxuLyoqXG4gKiBUZXN0IHdoZXRoZXIgYW4gb3V0cHV0IGlzIGZyb20gdXBkYXRlZCBkaXNwbGF5IGRhdGEuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Rpc3BsYXlVcGRhdGUob3V0cHV0KSB7XG4gICAgcmV0dXJuIG91dHB1dC5vdXRwdXRfdHlwZSA9PT0gJ3VwZGF0ZV9kaXNwbGF5X2RhdGEnO1xufVxuLyoqXG4gKiBUZXN0IHdoZXRoZXIgYW4gb3V0cHV0IGlzIGZyb20gYSBzdHJlYW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmVhbShvdXRwdXQpIHtcbiAgICByZXR1cm4gb3V0cHV0Lm91dHB1dF90eXBlID09PSAnc3RyZWFtJztcbn1cbi8qKlxuICogVGVzdCB3aGV0aGVyIGFuIG91dHB1dCBpcyBhbiBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRXJyb3Iob3V0cHV0KSB7XG4gICAgcmV0dXJuIG91dHB1dC5vdXRwdXRfdHlwZSA9PT0gJ2Vycm9yJztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=