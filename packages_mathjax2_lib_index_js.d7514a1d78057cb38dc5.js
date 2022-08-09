(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_mathjax2_lib_index_js"],{

/***/ "../../packages/mathjax2/lib/index.js":
/*!********************************************!*\
  !*** ../../packages/mathjax2/lib/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MathJaxTypesetter": () => (/* binding */ MathJaxTypesetter)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module mathjax2
 */

/**
 * The MathJax Typesetter.
 */
class MathJaxTypesetter {
    /**
     * Create a new MathJax typesetter.
     */
    constructor(options) {
        this._initPromise = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.PromiseDelegate();
        this._initialized = false;
        this._url = options.url;
        this._config = options.config;
    }
    /**
     * Typeset the math in a node.
     *
     * #### Notes
     * MathJax schedules the typesetting asynchronously,
     * but there are not currently any callbacks or Promises
     * firing when it is done.
     */
    typeset(node) {
        if (!this._initialized) {
            this._init();
        }
        void this._initPromise.promise.then(() => {
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, node]);
            try {
                MathJax.Hub.Queue(['Require', MathJax.Ajax, '[MathJax]/extensions/TeX/AMSmath.js'], () => {
                    MathJax.InputJax.TeX.resetEquationNumbers();
                });
            }
            catch (e) {
                console.error('Error queueing resetEquationNumbers:', e);
            }
        });
    }
    /**
     * Initialize MathJax.
     */
    _init() {
        const head = document.getElementsByTagName('head')[0];
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `${this._url}?config=${this._config}&amp;delayStartupUntil=configured`;
        script.charset = 'utf-8';
        head.appendChild(script);
        script.addEventListener('load', () => {
            this._onLoad();
        });
        this._initialized = true;
    }
    /**
     * Handle MathJax loading.
     */
    _onLoad() {
        MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [
                    ['$', '$'],
                    ['\\(', '\\)']
                ],
                displayMath: [
                    ['$$', '$$'],
                    ['\\[', '\\]']
                ],
                processEscapes: true,
                processEnvironments: true
            },
            // Center justify equations in code and markdown cells. Elsewhere
            // we use CSS to left justify single line equations in code cells.
            displayAlign: 'center',
            CommonHTML: {
                linebreaks: { automatic: true }
            },
            'HTML-CSS': {
                availableFonts: [],
                imageFont: null,
                preferredFont: null,
                webFont: 'STIX-Web',
                styles: { '.MathJax_Display': { margin: 0 } },
                linebreaks: { automatic: true }
            },
            skipStartupTypeset: true,
            messageStyle: 'none'
        });
        MathJax.Hub.Configured();
        this._initPromise.resolve(void 0);
    }
}
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbWF0aGpheDIvbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyw4REFBZTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixVQUFVLFVBQVUsYUFBYSxLQUFLO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixzQkFBc0IsWUFBWSxFQUFFO0FBQzdELDZCQUE2QjtBQUM3QixhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDIiwiZmlsZSI6InBhY2thZ2VzX21hdGhqYXgyX2xpYl9pbmRleF9qcy5kNzUxNGExZDc4MDU3Y2IzOGRjNS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxufCBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgbWF0aGpheDJcbiAqL1xuaW1wb3J0IHsgUHJvbWlzZURlbGVnYXRlIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuLyoqXG4gKiBUaGUgTWF0aEpheCBUeXBlc2V0dGVyLlxuICovXG5leHBvcnQgY2xhc3MgTWF0aEpheFR5cGVzZXR0ZXIge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBNYXRoSmF4IHR5cGVzZXR0ZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9pbml0UHJvbWlzZSA9IG5ldyBQcm9taXNlRGVsZWdhdGUoKTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdXJsID0gb3B0aW9ucy51cmw7XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IG9wdGlvbnMuY29uZmlnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUeXBlc2V0IHRoZSBtYXRoIGluIGEgbm9kZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBNYXRoSmF4IHNjaGVkdWxlcyB0aGUgdHlwZXNldHRpbmcgYXN5bmNocm9ub3VzbHksXG4gICAgICogYnV0IHRoZXJlIGFyZSBub3QgY3VycmVudGx5IGFueSBjYWxsYmFja3Mgb3IgUHJvbWlzZXNcbiAgICAgKiBmaXJpbmcgd2hlbiBpdCBpcyBkb25lLlxuICAgICAqL1xuICAgIHR5cGVzZXQobm9kZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdm9pZCB0aGlzLl9pbml0UHJvbWlzZS5wcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgTWF0aEpheC5IdWIuUXVldWUoWydUeXBlc2V0JywgTWF0aEpheC5IdWIsIG5vZGVdKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgTWF0aEpheC5IdWIuUXVldWUoWydSZXF1aXJlJywgTWF0aEpheC5BamF4LCAnW01hdGhKYXhdL2V4dGVuc2lvbnMvVGVYL0FNU21hdGguanMnXSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBNYXRoSmF4LklucHV0SmF4LlRlWC5yZXNldEVxdWF0aW9uTnVtYmVycygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBxdWV1ZWluZyByZXNldEVxdWF0aW9uTnVtYmVyczonLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgTWF0aEpheC5cbiAgICAgKi9cbiAgICBfaW5pdCgpIHtcbiAgICAgICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICBzY3JpcHQuc3JjID0gYCR7dGhpcy5fdXJsfT9jb25maWc9JHt0aGlzLl9jb25maWd9JmFtcDtkZWxheVN0YXJ0dXBVbnRpbD1jb25maWd1cmVkYDtcbiAgICAgICAgc2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuICAgICAgICBoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fb25Mb2FkKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBNYXRoSmF4IGxvYWRpbmcuXG4gICAgICovXG4gICAgX29uTG9hZCgpIHtcbiAgICAgICAgTWF0aEpheC5IdWIuQ29uZmlnKHtcbiAgICAgICAgICAgIHRleDJqYXg6IHtcbiAgICAgICAgICAgICAgICBpbmxpbmVNYXRoOiBbXG4gICAgICAgICAgICAgICAgICAgIFsnJCcsICckJ10sXG4gICAgICAgICAgICAgICAgICAgIFsnXFxcXCgnLCAnXFxcXCknXVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgZGlzcGxheU1hdGg6IFtcbiAgICAgICAgICAgICAgICAgICAgWyckJCcsICckJCddLFxuICAgICAgICAgICAgICAgICAgICBbJ1xcXFxbJywgJ1xcXFxdJ11cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHByb2Nlc3NFc2NhcGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHByb2Nlc3NFbnZpcm9ubWVudHM6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBDZW50ZXIganVzdGlmeSBlcXVhdGlvbnMgaW4gY29kZSBhbmQgbWFya2Rvd24gY2VsbHMuIEVsc2V3aGVyZVxuICAgICAgICAgICAgLy8gd2UgdXNlIENTUyB0byBsZWZ0IGp1c3RpZnkgc2luZ2xlIGxpbmUgZXF1YXRpb25zIGluIGNvZGUgY2VsbHMuXG4gICAgICAgICAgICBkaXNwbGF5QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgQ29tbW9uSFRNTDoge1xuICAgICAgICAgICAgICAgIGxpbmVicmVha3M6IHsgYXV0b21hdGljOiB0cnVlIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnSFRNTC1DU1MnOiB7XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlRm9udHM6IFtdLFxuICAgICAgICAgICAgICAgIGltYWdlRm9udDogbnVsbCxcbiAgICAgICAgICAgICAgICBwcmVmZXJyZWRGb250OiBudWxsLFxuICAgICAgICAgICAgICAgIHdlYkZvbnQ6ICdTVElYLVdlYicsXG4gICAgICAgICAgICAgICAgc3R5bGVzOiB7ICcuTWF0aEpheF9EaXNwbGF5JzogeyBtYXJnaW46IDAgfSB9LFxuICAgICAgICAgICAgICAgIGxpbmVicmVha3M6IHsgYXV0b21hdGljOiB0cnVlIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBza2lwU3RhcnR1cFR5cGVzZXQ6IHRydWUsXG4gICAgICAgICAgICBtZXNzYWdlU3R5bGU6ICdub25lJ1xuICAgICAgICB9KTtcbiAgICAgICAgTWF0aEpheC5IdWIuQ29uZmlndXJlZCgpO1xuICAgICAgICB0aGlzLl9pbml0UHJvbWlzZS5yZXNvbHZlKHZvaWQgMCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==