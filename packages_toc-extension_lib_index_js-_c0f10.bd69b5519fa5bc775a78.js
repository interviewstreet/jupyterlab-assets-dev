(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_toc-extension_lib_index_js-_c0f10"],{

/***/ "../../packages/toc-extension/lib/index.js":
/*!*************************************************!*\
  !*** ../../packages/toc-extension/lib/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/docmanager */ "webpack/sharing/consume/default/@jupyterlab/docmanager/@jupyterlab/docmanager");
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/fileeditor */ "webpack/sharing/consume/default/@jupyterlab/fileeditor/@jupyterlab/fileeditor");
/* harmony import */ var _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_markdownviewer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/markdownviewer */ "webpack/sharing/consume/default/@jupyterlab/markdownviewer/@jupyterlab/markdownviewer");
/* harmony import */ var _jupyterlab_markdownviewer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_markdownviewer__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jupyterlab_toc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jupyterlab/toc */ "webpack/sharing/consume/default/@jupyterlab/toc/@jupyterlab/toc");
/* harmony import */ var _jupyterlab_toc__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_toc__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jupyterlab/cells */ "webpack/sharing/consume/default/@jupyterlab/cells/@jupyterlab/cells");
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_10__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module toc-extension
 */











/**
 * The command IDs used by TOC item.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.runCells = 'toc:run-cells';
})(CommandIDs || (CommandIDs = {}));
/**
 * Activates the ToC extension.
 *
 * @private
 * @param app - Jupyter application
 * @param docmanager - document manager
 * @param rendermime - rendered MIME registry
 * @param translator - translator
 * @param editorTracker - editor tracker
 * @param restorer - application layout restorer
 * @param labShell - Jupyter lab shell
 * @param markdownViewerTracker - Markdown viewer tracker
 * @param notebookTracker - notebook tracker
 * @param settingRegistry - setting registry
 * @returns table of contents registry
 */
async function activateTOC(app, docmanager, rendermime, translator, editorTracker, restorer, labShell, markdownViewerTracker, notebookTracker, settingRegistry) {
    const trans = translator.load('jupyterlab');
    // Create the ToC widget:
    const toc = new _jupyterlab_toc__WEBPACK_IMPORTED_MODULE_7__.TableOfContents({
        docmanager,
        rendermime,
        translator
    });
    // Create the ToC registry:
    const registry = new _jupyterlab_toc__WEBPACK_IMPORTED_MODULE_7__.TableOfContentsRegistry();
    // Add the ToC to the left area:
    toc.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.tocIcon;
    toc.title.caption = trans.__('Table of Contents');
    toc.id = 'table-of-contents';
    toc.node.setAttribute('role', 'region');
    toc.node.setAttribute('aria-label', trans.__('Table of Contents section'));
    app.shell.add(toc, 'left', { rank: 400 });
    app.commands.addCommand(CommandIDs.runCells, {
        execute: args => {
            if (!notebookTracker) {
                return null;
            }
            const panel = notebookTracker.currentWidget;
            if (panel == null) {
                return;
            }
            const cells = panel.content.widgets;
            if (cells === undefined) {
                return;
            }
            const activeCell = toc.activeEntry.cellRef;
            if (activeCell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_10__.MarkdownCell) {
                let level = activeCell.headingInfo.level;
                for (let i = cells.indexOf(activeCell) + 1; i < cells.length; i++) {
                    const cell = cells[i];
                    if (cell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_10__.MarkdownCell &&
                        cell.headingInfo.level <= level &&
                        cell.headingInfo.level > -1) {
                        break;
                    }
                    if (cell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_10__.CodeCell) {
                        void _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_10__.CodeCell.execute(cell, panel.sessionContext);
                    }
                }
            }
            else {
                if (activeCell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_10__.CodeCell) {
                    void _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_10__.CodeCell.execute(activeCell, panel.sessionContext);
                }
            }
        },
        label: trans.__('Run Cell(s)')
    });
    if (restorer) {
        // Add the ToC widget to the application restorer:
        restorer.add(toc, '@jupyterlab/toc:plugin');
    }
    // Attempt to load plugin settings:
    let settings;
    if (settingRegistry) {
        try {
            settings = await settingRegistry.load('@jupyterlab/toc-extension:plugin');
        }
        catch (error) {
            console.error(`Failed to load settings for the Table of Contents extension.\n\n${error}`);
        }
    }
    // Create a notebook generator:
    if (notebookTracker) {
        const notebookGenerator = (0,_jupyterlab_toc__WEBPACK_IMPORTED_MODULE_7__.createNotebookGenerator)(notebookTracker, toc, rendermime.sanitizer, translator, settings);
        registry.add(notebookGenerator);
    }
    // Create a Markdown generator:
    if (editorTracker) {
        const markdownGenerator = (0,_jupyterlab_toc__WEBPACK_IMPORTED_MODULE_7__.createMarkdownGenerator)(editorTracker, toc, rendermime.sanitizer, translator, settings);
        registry.add(markdownGenerator);
        // Create a LaTeX generator:
        const latexGenerator = (0,_jupyterlab_toc__WEBPACK_IMPORTED_MODULE_7__.createLatexGenerator)(editorTracker);
        registry.add(latexGenerator);
        // Create a Python generator:
        const pythonGenerator = (0,_jupyterlab_toc__WEBPACK_IMPORTED_MODULE_7__.createPythonGenerator)(editorTracker);
        registry.add(pythonGenerator);
    }
    // Create a rendered Markdown generator:
    if (markdownViewerTracker) {
        const renderedMarkdownGenerator = (0,_jupyterlab_toc__WEBPACK_IMPORTED_MODULE_7__.createRenderedMarkdownGenerator)(markdownViewerTracker, toc, rendermime.sanitizer, translator, settings);
        registry.add(renderedMarkdownGenerator);
    }
    // Update the ToC when the active widget changes:
    if (labShell) {
        labShell.currentChanged.connect(onConnect);
    }
    return registry;
    /**
     * Callback invoked when the active widget changes.
     *
     * @private
     */
    function onConnect() {
        let widget = app.shell.currentWidget;
        if (!widget) {
            return;
        }
        let generator = registry.find(widget);
        if (!generator) {
            // If the previously used widget is still available, stick with it.
            // Otherwise, set the current ToC widget to null.
            if (toc.current && toc.current.widget.isDisposed) {
                toc.current = null;
            }
            return;
        }
        toc.current = { widget, generator };
    }
}
/**
 * Initialization data for the ToC extension.
 *
 * @private
 */
const extension = {
    id: '@jupyterlab/toc:plugin',
    autoStart: true,
    provides: _jupyterlab_toc__WEBPACK_IMPORTED_MODULE_7__.ITableOfContentsRegistry,
    requires: [_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_1__.IDocumentManager, _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_5__.IRenderMimeRegistry, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__.ITranslator],
    optional: [
        _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_2__.IEditorTracker,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell,
        _jupyterlab_markdownviewer__WEBPACK_IMPORTED_MODULE_3__.IMarkdownViewerTracker,
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_4__.INotebookTracker,
        _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_6__.ISettingRegistry
    ],
    activate: activateTOC
};
/**
 * Exports.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extension);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9jLWV4dGVuc2lvbi9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDcUU7QUFDWDtBQUNGO0FBQ1k7QUFDWjtBQUNLO0FBQ0U7QUFDa0w7QUFDM0w7QUFDRjtBQUNPO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDREQUFlO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHlCQUF5QixvRUFBUTtBQUNqQztBQUNBLHFCQUFxQiw4REFBTztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxZQUFZO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsNERBQVk7QUFDbEQ7QUFDQSwyREFBMkQsa0JBQWtCO0FBQzdFO0FBQ0Esd0NBQXdDLDREQUFZO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLHdEQUFRO0FBQ2hELDZCQUE2QixnRUFBZ0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsd0RBQVE7QUFDbEQseUJBQXlCLGdFQUFnQjtBQUN6QztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RkFBNkYsTUFBTTtBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx3RUFBdUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msd0VBQXVCO0FBQ3pEO0FBQ0E7QUFDQSwrQkFBK0IscUVBQW9CO0FBQ25EO0FBQ0E7QUFDQSxnQ0FBZ0Msc0VBQXFCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGdGQUErQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxxRUFBd0I7QUFDdEMsZUFBZSxvRUFBZ0IsRUFBRSx1RUFBbUIsRUFBRSxnRUFBVztBQUNqRTtBQUNBLFFBQVEsa0VBQWM7QUFDdEIsUUFBUSxvRUFBZTtBQUN2QixRQUFRLDhEQUFTO0FBQ2pCLFFBQVEsOEVBQXNCO0FBQzlCLFFBQVEsa0VBQWdCO0FBQ3hCLFFBQVEseUVBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLFNBQVMsRUFBQztBQUN6QixpQyIsImZpbGUiOiJwYWNrYWdlc190b2MtZXh0ZW5zaW9uX2xpYl9pbmRleF9qcy1fYzBmMTAuYmQ2OWI1NTE5ZmE1YmM3NzVhNzguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSB0b2MtZXh0ZW5zaW9uXG4gKi9cbmltcG9ydCB7IElMYWJTaGVsbCwgSUxheW91dFJlc3RvcmVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgSURvY3VtZW50TWFuYWdlciB9IGZyb20gJ0BqdXB5dGVybGFiL2RvY21hbmFnZXInO1xuaW1wb3J0IHsgSUVkaXRvclRyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9maWxlZWRpdG9yJztcbmltcG9ydCB7IElNYXJrZG93blZpZXdlclRyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9tYXJrZG93bnZpZXdlcic7XG5pbXBvcnQgeyBJTm90ZWJvb2tUcmFja2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvbm90ZWJvb2snO1xuaW1wb3J0IHsgSVJlbmRlck1pbWVSZWdpc3RyeSB9IGZyb20gJ0BqdXB5dGVybGFiL3JlbmRlcm1pbWUnO1xuaW1wb3J0IHsgSVNldHRpbmdSZWdpc3RyeSB9IGZyb20gJ0BqdXB5dGVybGFiL3NldHRpbmdyZWdpc3RyeSc7XG5pbXBvcnQgeyBjcmVhdGVMYXRleEdlbmVyYXRvciwgY3JlYXRlTWFya2Rvd25HZW5lcmF0b3IsIGNyZWF0ZU5vdGVib29rR2VuZXJhdG9yLCBjcmVhdGVQeXRob25HZW5lcmF0b3IsIGNyZWF0ZVJlbmRlcmVkTWFya2Rvd25HZW5lcmF0b3IsIElUYWJsZU9mQ29udGVudHNSZWdpc3RyeSwgVGFibGVPZkNvbnRlbnRzUmVnaXN0cnkgYXMgUmVnaXN0cnksIFRhYmxlT2ZDb250ZW50cyB9IGZyb20gJ0BqdXB5dGVybGFiL3RvYyc7XG5pbXBvcnQgeyBJVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IHRvY0ljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IENvZGVDZWxsLCBNYXJrZG93bkNlbGwgfSBmcm9tICdAanVweXRlcmxhYi9jZWxscyc7XG4vKipcbiAqIFRoZSBjb21tYW5kIElEcyB1c2VkIGJ5IFRPQyBpdGVtLlxuICovXG52YXIgQ29tbWFuZElEcztcbihmdW5jdGlvbiAoQ29tbWFuZElEcykge1xuICAgIENvbW1hbmRJRHMucnVuQ2VsbHMgPSAndG9jOnJ1bi1jZWxscyc7XG59KShDb21tYW5kSURzIHx8IChDb21tYW5kSURzID0ge30pKTtcbi8qKlxuICogQWN0aXZhdGVzIHRoZSBUb0MgZXh0ZW5zaW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gYXBwIC0gSnVweXRlciBhcHBsaWNhdGlvblxuICogQHBhcmFtIGRvY21hbmFnZXIgLSBkb2N1bWVudCBtYW5hZ2VyXG4gKiBAcGFyYW0gcmVuZGVybWltZSAtIHJlbmRlcmVkIE1JTUUgcmVnaXN0cnlcbiAqIEBwYXJhbSB0cmFuc2xhdG9yIC0gdHJhbnNsYXRvclxuICogQHBhcmFtIGVkaXRvclRyYWNrZXIgLSBlZGl0b3IgdHJhY2tlclxuICogQHBhcmFtIHJlc3RvcmVyIC0gYXBwbGljYXRpb24gbGF5b3V0IHJlc3RvcmVyXG4gKiBAcGFyYW0gbGFiU2hlbGwgLSBKdXB5dGVyIGxhYiBzaGVsbFxuICogQHBhcmFtIG1hcmtkb3duVmlld2VyVHJhY2tlciAtIE1hcmtkb3duIHZpZXdlciB0cmFja2VyXG4gKiBAcGFyYW0gbm90ZWJvb2tUcmFja2VyIC0gbm90ZWJvb2sgdHJhY2tlclxuICogQHBhcmFtIHNldHRpbmdSZWdpc3RyeSAtIHNldHRpbmcgcmVnaXN0cnlcbiAqIEByZXR1cm5zIHRhYmxlIG9mIGNvbnRlbnRzIHJlZ2lzdHJ5XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGFjdGl2YXRlVE9DKGFwcCwgZG9jbWFuYWdlciwgcmVuZGVybWltZSwgdHJhbnNsYXRvciwgZWRpdG9yVHJhY2tlciwgcmVzdG9yZXIsIGxhYlNoZWxsLCBtYXJrZG93blZpZXdlclRyYWNrZXIsIG5vdGVib29rVHJhY2tlciwgc2V0dGluZ1JlZ2lzdHJ5KSB7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAvLyBDcmVhdGUgdGhlIFRvQyB3aWRnZXQ6XG4gICAgY29uc3QgdG9jID0gbmV3IFRhYmxlT2ZDb250ZW50cyh7XG4gICAgICAgIGRvY21hbmFnZXIsXG4gICAgICAgIHJlbmRlcm1pbWUsXG4gICAgICAgIHRyYW5zbGF0b3JcbiAgICB9KTtcbiAgICAvLyBDcmVhdGUgdGhlIFRvQyByZWdpc3RyeTpcbiAgICBjb25zdCByZWdpc3RyeSA9IG5ldyBSZWdpc3RyeSgpO1xuICAgIC8vIEFkZCB0aGUgVG9DIHRvIHRoZSBsZWZ0IGFyZWE6XG4gICAgdG9jLnRpdGxlLmljb24gPSB0b2NJY29uO1xuICAgIHRvYy50aXRsZS5jYXB0aW9uID0gdHJhbnMuX18oJ1RhYmxlIG9mIENvbnRlbnRzJyk7XG4gICAgdG9jLmlkID0gJ3RhYmxlLW9mLWNvbnRlbnRzJztcbiAgICB0b2Mubm9kZS5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncmVnaW9uJyk7XG4gICAgdG9jLm5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgdHJhbnMuX18oJ1RhYmxlIG9mIENvbnRlbnRzIHNlY3Rpb24nKSk7XG4gICAgYXBwLnNoZWxsLmFkZCh0b2MsICdsZWZ0JywgeyByYW5rOiA0MDAgfSk7XG4gICAgYXBwLmNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5ydW5DZWxscywge1xuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGlmICghbm90ZWJvb2tUcmFja2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwYW5lbCA9IG5vdGVib29rVHJhY2tlci5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgaWYgKHBhbmVsID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IHBhbmVsLmNvbnRlbnQud2lkZ2V0cztcbiAgICAgICAgICAgIGlmIChjZWxscyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYWN0aXZlQ2VsbCA9IHRvYy5hY3RpdmVFbnRyeS5jZWxsUmVmO1xuICAgICAgICAgICAgaWYgKGFjdGl2ZUNlbGwgaW5zdGFuY2VvZiBNYXJrZG93bkNlbGwpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGV2ZWwgPSBhY3RpdmVDZWxsLmhlYWRpbmdJbmZvLmxldmVsO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBjZWxscy5pbmRleE9mKGFjdGl2ZUNlbGwpICsgMTsgaSA8IGNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBjZWxsc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwgaW5zdGFuY2VvZiBNYXJrZG93bkNlbGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuaGVhZGluZ0luZm8ubGV2ZWwgPD0gbGV2ZWwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuaGVhZGluZ0luZm8ubGV2ZWwgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwgaW5zdGFuY2VvZiBDb2RlQ2VsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCBDb2RlQ2VsbC5leGVjdXRlKGNlbGwsIHBhbmVsLnNlc3Npb25Db250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVDZWxsIGluc3RhbmNlb2YgQ29kZUNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBDb2RlQ2VsbC5leGVjdXRlKGFjdGl2ZUNlbGwsIHBhbmVsLnNlc3Npb25Db250ZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnUnVuIENlbGwocyknKVxuICAgIH0pO1xuICAgIGlmIChyZXN0b3Jlcikge1xuICAgICAgICAvLyBBZGQgdGhlIFRvQyB3aWRnZXQgdG8gdGhlIGFwcGxpY2F0aW9uIHJlc3RvcmVyOlxuICAgICAgICByZXN0b3Jlci5hZGQodG9jLCAnQGp1cHl0ZXJsYWIvdG9jOnBsdWdpbicpO1xuICAgIH1cbiAgICAvLyBBdHRlbXB0IHRvIGxvYWQgcGx1Z2luIHNldHRpbmdzOlxuICAgIGxldCBzZXR0aW5ncztcbiAgICBpZiAoc2V0dGluZ1JlZ2lzdHJ5KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXR0aW5ncyA9IGF3YWl0IHNldHRpbmdSZWdpc3RyeS5sb2FkKCdAanVweXRlcmxhYi90b2MtZXh0ZW5zaW9uOnBsdWdpbicpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIGxvYWQgc2V0dGluZ3MgZm9yIHRoZSBUYWJsZSBvZiBDb250ZW50cyBleHRlbnNpb24uXFxuXFxuJHtlcnJvcn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBDcmVhdGUgYSBub3RlYm9vayBnZW5lcmF0b3I6XG4gICAgaWYgKG5vdGVib29rVHJhY2tlcikge1xuICAgICAgICBjb25zdCBub3RlYm9va0dlbmVyYXRvciA9IGNyZWF0ZU5vdGVib29rR2VuZXJhdG9yKG5vdGVib29rVHJhY2tlciwgdG9jLCByZW5kZXJtaW1lLnNhbml0aXplciwgdHJhbnNsYXRvciwgc2V0dGluZ3MpO1xuICAgICAgICByZWdpc3RyeS5hZGQobm90ZWJvb2tHZW5lcmF0b3IpO1xuICAgIH1cbiAgICAvLyBDcmVhdGUgYSBNYXJrZG93biBnZW5lcmF0b3I6XG4gICAgaWYgKGVkaXRvclRyYWNrZXIpIHtcbiAgICAgICAgY29uc3QgbWFya2Rvd25HZW5lcmF0b3IgPSBjcmVhdGVNYXJrZG93bkdlbmVyYXRvcihlZGl0b3JUcmFja2VyLCB0b2MsIHJlbmRlcm1pbWUuc2FuaXRpemVyLCB0cmFuc2xhdG9yLCBzZXR0aW5ncyk7XG4gICAgICAgIHJlZ2lzdHJ5LmFkZChtYXJrZG93bkdlbmVyYXRvcik7XG4gICAgICAgIC8vIENyZWF0ZSBhIExhVGVYIGdlbmVyYXRvcjpcbiAgICAgICAgY29uc3QgbGF0ZXhHZW5lcmF0b3IgPSBjcmVhdGVMYXRleEdlbmVyYXRvcihlZGl0b3JUcmFja2VyKTtcbiAgICAgICAgcmVnaXN0cnkuYWRkKGxhdGV4R2VuZXJhdG9yKTtcbiAgICAgICAgLy8gQ3JlYXRlIGEgUHl0aG9uIGdlbmVyYXRvcjpcbiAgICAgICAgY29uc3QgcHl0aG9uR2VuZXJhdG9yID0gY3JlYXRlUHl0aG9uR2VuZXJhdG9yKGVkaXRvclRyYWNrZXIpO1xuICAgICAgICByZWdpc3RyeS5hZGQocHl0aG9uR2VuZXJhdG9yKTtcbiAgICB9XG4gICAgLy8gQ3JlYXRlIGEgcmVuZGVyZWQgTWFya2Rvd24gZ2VuZXJhdG9yOlxuICAgIGlmIChtYXJrZG93blZpZXdlclRyYWNrZXIpIHtcbiAgICAgICAgY29uc3QgcmVuZGVyZWRNYXJrZG93bkdlbmVyYXRvciA9IGNyZWF0ZVJlbmRlcmVkTWFya2Rvd25HZW5lcmF0b3IobWFya2Rvd25WaWV3ZXJUcmFja2VyLCB0b2MsIHJlbmRlcm1pbWUuc2FuaXRpemVyLCB0cmFuc2xhdG9yLCBzZXR0aW5ncyk7XG4gICAgICAgIHJlZ2lzdHJ5LmFkZChyZW5kZXJlZE1hcmtkb3duR2VuZXJhdG9yKTtcbiAgICB9XG4gICAgLy8gVXBkYXRlIHRoZSBUb0Mgd2hlbiB0aGUgYWN0aXZlIHdpZGdldCBjaGFuZ2VzOlxuICAgIGlmIChsYWJTaGVsbCkge1xuICAgICAgICBsYWJTaGVsbC5jdXJyZW50Q2hhbmdlZC5jb25uZWN0KG9uQ29ubmVjdCk7XG4gICAgfVxuICAgIHJldHVybiByZWdpc3RyeTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayBpbnZva2VkIHdoZW4gdGhlIGFjdGl2ZSB3aWRnZXQgY2hhbmdlcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZnVuY3Rpb24gb25Db25uZWN0KCkge1xuICAgICAgICBsZXQgd2lkZ2V0ID0gYXBwLnNoZWxsLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgIGlmICghd2lkZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGdlbmVyYXRvciA9IHJlZ2lzdHJ5LmZpbmQod2lkZ2V0KTtcbiAgICAgICAgaWYgKCFnZW5lcmF0b3IpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBwcmV2aW91c2x5IHVzZWQgd2lkZ2V0IGlzIHN0aWxsIGF2YWlsYWJsZSwgc3RpY2sgd2l0aCBpdC5cbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgc2V0IHRoZSBjdXJyZW50IFRvQyB3aWRnZXQgdG8gbnVsbC5cbiAgICAgICAgICAgIGlmICh0b2MuY3VycmVudCAmJiB0b2MuY3VycmVudC53aWRnZXQuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgIHRvYy5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0b2MuY3VycmVudCA9IHsgd2lkZ2V0LCBnZW5lcmF0b3IgfTtcbiAgICB9XG59XG4vKipcbiAqIEluaXRpYWxpemF0aW9uIGRhdGEgZm9yIHRoZSBUb0MgZXh0ZW5zaW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGV4dGVuc2lvbiA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL3RvYzpwbHVnaW4nLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICBwcm92aWRlczogSVRhYmxlT2ZDb250ZW50c1JlZ2lzdHJ5LFxuICAgIHJlcXVpcmVzOiBbSURvY3VtZW50TWFuYWdlciwgSVJlbmRlck1pbWVSZWdpc3RyeSwgSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbXG4gICAgICAgIElFZGl0b3JUcmFja2VyLFxuICAgICAgICBJTGF5b3V0UmVzdG9yZXIsXG4gICAgICAgIElMYWJTaGVsbCxcbiAgICAgICAgSU1hcmtkb3duVmlld2VyVHJhY2tlcixcbiAgICAgICAgSU5vdGVib29rVHJhY2tlcixcbiAgICAgICAgSVNldHRpbmdSZWdpc3RyeVxuICAgIF0sXG4gICAgYWN0aXZhdGU6IGFjdGl2YXRlVE9DXG59O1xuLyoqXG4gKiBFeHBvcnRzLlxuICovXG5leHBvcnQgZGVmYXVsdCBleHRlbnNpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9