(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_markdownviewer-extension_lib_index_js-_03710"],{

/***/ "../../packages/markdownviewer-extension/lib/index.js":
/*!************************************************************!*\
  !*** ../../packages/markdownviewer-extension/lib/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_markdownviewer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/markdownviewer */ "webpack/sharing/consume/default/@jupyterlab/markdownviewer/@jupyterlab/markdownviewer");
/* harmony import */ var _jupyterlab_markdownviewer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_markdownviewer__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module markdownviewer-extension
 */







/**
 * The command IDs used by the markdownviewer plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.markdownPreview = 'markdownviewer:open';
    CommandIDs.markdownEditor = 'markdownviewer:edit';
})(CommandIDs || (CommandIDs = {}));
/**
 * The name of the factory that creates markdown viewer widgets.
 */
const FACTORY = 'Markdown Preview';
/**
 * The markdown viewer plugin.
 */
const plugin = {
    activate,
    id: '@jupyterlab/markdownviewer-extension:plugin',
    provides: _jupyterlab_markdownviewer__WEBPACK_IMPORTED_MODULE_3__.IMarkdownViewerTracker,
    requires: [_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__.IRenderMimeRegistry, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__.ITranslator],
    optional: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer, _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.ISettingRegistry],
    autoStart: true
};
/**
 * Activate the markdown viewer plugin.
 */
function activate(app, rendermime, translator, restorer, settingRegistry) {
    const trans = translator.load('jupyterlab');
    const { commands, docRegistry } = app;
    // Add the markdown renderer factory.
    rendermime.addFactory(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__.markdownRendererFactory);
    const namespace = 'markdownviewer-widget';
    const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
        namespace
    });
    let config = Object.assign({}, _jupyterlab_markdownviewer__WEBPACK_IMPORTED_MODULE_3__.MarkdownViewer.defaultConfig);
    /**
     * Update the settings of a widget.
     */
    function updateWidget(widget) {
        Object.keys(config).forEach((k) => {
            var _a;
            widget.setOption(k, (_a = config[k]) !== null && _a !== void 0 ? _a : null);
        });
    }
    if (settingRegistry) {
        const updateSettings = (settings) => {
            config = settings.composite;
            tracker.forEach(widget => {
                updateWidget(widget.content);
            });
        };
        // Fetch the initial state of the settings.
        settingRegistry
            .load(plugin.id)
            .then((settings) => {
            settings.changed.connect(() => {
                updateSettings(settings);
            });
            updateSettings(settings);
        })
            .catch((reason) => {
            console.error(reason.message);
        });
    }
    // Register the MarkdownViewer factory.
    const factory = new _jupyterlab_markdownviewer__WEBPACK_IMPORTED_MODULE_3__.MarkdownViewerFactory({
        rendermime,
        name: FACTORY,
        primaryFileType: docRegistry.getFileType('markdown'),
        fileTypes: ['markdown'],
        defaultRendered: ['markdown']
    });
    factory.widgetCreated.connect((sender, widget) => {
        // Notify the widget tracker if restore data needs to update.
        widget.context.pathChanged.connect(() => {
            void tracker.save(widget);
        });
        // Handle the settings of new widgets.
        updateWidget(widget.content);
        void tracker.add(widget);
    });
    docRegistry.addWidgetFactory(factory);
    // Handle state restoration.
    if (restorer) {
        void restorer.restore(tracker, {
            command: 'docmanager:open',
            args: widget => ({ path: widget.context.path, factory: FACTORY }),
            name: widget => widget.context.path
        });
    }
    commands.addCommand(CommandIDs.markdownPreview, {
        label: trans.__('Markdown Preview'),
        execute: args => {
            const path = args['path'];
            if (typeof path !== 'string') {
                return;
            }
            return commands.execute('docmanager:open', {
                path,
                factory: FACTORY,
                options: args['options']
            });
        }
    });
    commands.addCommand(CommandIDs.markdownEditor, {
        execute: () => {
            const widget = tracker.currentWidget;
            if (!widget) {
                return;
            }
            const path = widget.context.path;
            return commands.execute('docmanager:open', {
                path,
                factory: 'Editor',
                options: {
                    mode: 'split-right'
                }
            });
        },
        isVisible: () => {
            const widget = tracker.currentWidget;
            return ((widget && _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PathExt.extname(widget.context.path) === '.md') || false);
        },
        label: trans.__('Show Markdown Editor')
    });
    return tracker;
}
/**
 * Export the plugin as default.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbWFya2Rvd252aWV3ZXItZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDMEQ7QUFDTDtBQUNMO0FBQzJEO0FBQ3JCO0FBQ3ZCO0FBQ1Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdDQUFnQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsOEVBQXNCO0FBQ3BDLGVBQWUsdUVBQW1CLEVBQUUsZ0VBQVc7QUFDL0MsZUFBZSxvRUFBZSxFQUFFLHlFQUFnQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsd0JBQXdCO0FBQ25DO0FBQ0EsMEJBQTBCLDJFQUF1QjtBQUNqRDtBQUNBLHdCQUF3QiwrREFBYTtBQUNyQztBQUNBLEtBQUs7QUFDTCxpQ0FBaUMsRUFBRSxvRkFBNEI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHdCQUF3Qiw2RUFBcUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qiw4Q0FBOEM7QUFDNUU7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsK0JBQStCLGtFQUFlO0FBQzlDLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsTUFBTSxFQUFDO0FBQ3RCLGlDIiwiZmlsZSI6InBhY2thZ2VzX21hcmtkb3dudmlld2VyLWV4dGVuc2lvbl9saWJfaW5kZXhfanMtXzAzNzEwLjVjODVkYjM3ZjFiMThhMDdkYmI2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgbWFya2Rvd252aWV3ZXItZXh0ZW5zaW9uXG4gKi9cbmltcG9ydCB7IElMYXlvdXRSZXN0b3JlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uJztcbmltcG9ydCB7IFdpZGdldFRyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBQYXRoRXh0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IElNYXJrZG93blZpZXdlclRyYWNrZXIsIE1hcmtkb3duVmlld2VyLCBNYXJrZG93blZpZXdlckZhY3RvcnkgfSBmcm9tICdAanVweXRlcmxhYi9tYXJrZG93bnZpZXdlcic7XG5pbXBvcnQgeyBJUmVuZGVyTWltZVJlZ2lzdHJ5LCBtYXJrZG93blJlbmRlcmVyRmFjdG9yeSB9IGZyb20gJ0BqdXB5dGVybGFiL3JlbmRlcm1pbWUnO1xuaW1wb3J0IHsgSVNldHRpbmdSZWdpc3RyeSB9IGZyb20gJ0BqdXB5dGVybGFiL3NldHRpbmdyZWdpc3RyeSc7XG5pbXBvcnQgeyBJVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbi8qKlxuICogVGhlIGNvbW1hbmQgSURzIHVzZWQgYnkgdGhlIG1hcmtkb3dudmlld2VyIHBsdWdpbi5cbiAqL1xudmFyIENvbW1hbmRJRHM7XG4oZnVuY3Rpb24gKENvbW1hbmRJRHMpIHtcbiAgICBDb21tYW5kSURzLm1hcmtkb3duUHJldmlldyA9ICdtYXJrZG93bnZpZXdlcjpvcGVuJztcbiAgICBDb21tYW5kSURzLm1hcmtkb3duRWRpdG9yID0gJ21hcmtkb3dudmlld2VyOmVkaXQnO1xufSkoQ29tbWFuZElEcyB8fCAoQ29tbWFuZElEcyA9IHt9KSk7XG4vKipcbiAqIFRoZSBuYW1lIG9mIHRoZSBmYWN0b3J5IHRoYXQgY3JlYXRlcyBtYXJrZG93biB2aWV3ZXIgd2lkZ2V0cy5cbiAqL1xuY29uc3QgRkFDVE9SWSA9ICdNYXJrZG93biBQcmV2aWV3Jztcbi8qKlxuICogVGhlIG1hcmtkb3duIHZpZXdlciBwbHVnaW4uXG4gKi9cbmNvbnN0IHBsdWdpbiA9IHtcbiAgICBhY3RpdmF0ZSxcbiAgICBpZDogJ0BqdXB5dGVybGFiL21hcmtkb3dudmlld2VyLWV4dGVuc2lvbjpwbHVnaW4nLFxuICAgIHByb3ZpZGVzOiBJTWFya2Rvd25WaWV3ZXJUcmFja2VyLFxuICAgIHJlcXVpcmVzOiBbSVJlbmRlck1pbWVSZWdpc3RyeSwgSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbSUxheW91dFJlc3RvcmVyLCBJU2V0dGluZ1JlZ2lzdHJ5XSxcbiAgICBhdXRvU3RhcnQ6IHRydWVcbn07XG4vKipcbiAqIEFjdGl2YXRlIHRoZSBtYXJrZG93biB2aWV3ZXIgcGx1Z2luLlxuICovXG5mdW5jdGlvbiBhY3RpdmF0ZShhcHAsIHJlbmRlcm1pbWUsIHRyYW5zbGF0b3IsIHJlc3RvcmVyLCBzZXR0aW5nUmVnaXN0cnkpIHtcbiAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgIGNvbnN0IHsgY29tbWFuZHMsIGRvY1JlZ2lzdHJ5IH0gPSBhcHA7XG4gICAgLy8gQWRkIHRoZSBtYXJrZG93biByZW5kZXJlciBmYWN0b3J5LlxuICAgIHJlbmRlcm1pbWUuYWRkRmFjdG9yeShtYXJrZG93blJlbmRlcmVyRmFjdG9yeSk7XG4gICAgY29uc3QgbmFtZXNwYWNlID0gJ21hcmtkb3dudmlld2VyLXdpZGdldCc7XG4gICAgY29uc3QgdHJhY2tlciA9IG5ldyBXaWRnZXRUcmFja2VyKHtcbiAgICAgICAgbmFtZXNwYWNlXG4gICAgfSk7XG4gICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIE1hcmtkb3duVmlld2VyLmRlZmF1bHRDb25maWcpO1xuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgc2V0dGluZ3Mgb2YgYSB3aWRnZXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlV2lkZ2V0KHdpZGdldCkge1xuICAgICAgICBPYmplY3Qua2V5cyhjb25maWcpLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHdpZGdldC5zZXRPcHRpb24oaywgKF9hID0gY29uZmlnW2tdKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBudWxsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChzZXR0aW5nUmVnaXN0cnkpIHtcbiAgICAgICAgY29uc3QgdXBkYXRlU2V0dGluZ3MgPSAoc2V0dGluZ3MpID0+IHtcbiAgICAgICAgICAgIGNvbmZpZyA9IHNldHRpbmdzLmNvbXBvc2l0ZTtcbiAgICAgICAgICAgIHRyYWNrZXIuZm9yRWFjaCh3aWRnZXQgPT4ge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVdpZGdldCh3aWRnZXQuY29udGVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gRmV0Y2ggdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIHNldHRpbmdzLlxuICAgICAgICBzZXR0aW5nUmVnaXN0cnlcbiAgICAgICAgICAgIC5sb2FkKHBsdWdpbi5pZClcbiAgICAgICAgICAgIC50aGVuKChzZXR0aW5ncykgPT4ge1xuICAgICAgICAgICAgc2V0dGluZ3MuY2hhbmdlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB1cGRhdGVTZXR0aW5ncyhzZXR0aW5ncyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHVwZGF0ZVNldHRpbmdzKHNldHRpbmdzKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHJlYXNvbi5tZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIFJlZ2lzdGVyIHRoZSBNYXJrZG93blZpZXdlciBmYWN0b3J5LlxuICAgIGNvbnN0IGZhY3RvcnkgPSBuZXcgTWFya2Rvd25WaWV3ZXJGYWN0b3J5KHtcbiAgICAgICAgcmVuZGVybWltZSxcbiAgICAgICAgbmFtZTogRkFDVE9SWSxcbiAgICAgICAgcHJpbWFyeUZpbGVUeXBlOiBkb2NSZWdpc3RyeS5nZXRGaWxlVHlwZSgnbWFya2Rvd24nKSxcbiAgICAgICAgZmlsZVR5cGVzOiBbJ21hcmtkb3duJ10sXG4gICAgICAgIGRlZmF1bHRSZW5kZXJlZDogWydtYXJrZG93biddXG4gICAgfSk7XG4gICAgZmFjdG9yeS53aWRnZXRDcmVhdGVkLmNvbm5lY3QoKHNlbmRlciwgd2lkZ2V0KSA9PiB7XG4gICAgICAgIC8vIE5vdGlmeSB0aGUgd2lkZ2V0IHRyYWNrZXIgaWYgcmVzdG9yZSBkYXRhIG5lZWRzIHRvIHVwZGF0ZS5cbiAgICAgICAgd2lkZ2V0LmNvbnRleHQucGF0aENoYW5nZWQuY29ubmVjdCgoKSA9PiB7XG4gICAgICAgICAgICB2b2lkIHRyYWNrZXIuc2F2ZSh3aWRnZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gSGFuZGxlIHRoZSBzZXR0aW5ncyBvZiBuZXcgd2lkZ2V0cy5cbiAgICAgICAgdXBkYXRlV2lkZ2V0KHdpZGdldC5jb250ZW50KTtcbiAgICAgICAgdm9pZCB0cmFja2VyLmFkZCh3aWRnZXQpO1xuICAgIH0pO1xuICAgIGRvY1JlZ2lzdHJ5LmFkZFdpZGdldEZhY3RvcnkoZmFjdG9yeSk7XG4gICAgLy8gSGFuZGxlIHN0YXRlIHJlc3RvcmF0aW9uLlxuICAgIGlmIChyZXN0b3Jlcikge1xuICAgICAgICB2b2lkIHJlc3RvcmVyLnJlc3RvcmUodHJhY2tlciwge1xuICAgICAgICAgICAgY29tbWFuZDogJ2RvY21hbmFnZXI6b3BlbicsXG4gICAgICAgICAgICBhcmdzOiB3aWRnZXQgPT4gKHsgcGF0aDogd2lkZ2V0LmNvbnRleHQucGF0aCwgZmFjdG9yeTogRkFDVE9SWSB9KSxcbiAgICAgICAgICAgIG5hbWU6IHdpZGdldCA9PiB3aWRnZXQuY29udGV4dC5wYXRoXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMubWFya2Rvd25QcmV2aWV3LCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnTWFya2Rvd24gUHJldmlldycpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBhcmdzWydwYXRoJ107XG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmRzLmV4ZWN1dGUoJ2RvY21hbmFnZXI6b3BlbicsIHtcbiAgICAgICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgICAgIGZhY3Rvcnk6IEZBQ1RPUlksXG4gICAgICAgICAgICAgICAgb3B0aW9uczogYXJnc1snb3B0aW9ucyddXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5tYXJrZG93bkVkaXRvciwge1xuICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXQgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICBpZiAoIXdpZGdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSB3aWRnZXQuY29udGV4dC5wYXRoO1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmRzLmV4ZWN1dGUoJ2RvY21hbmFnZXI6b3BlbicsIHtcbiAgICAgICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgICAgIGZhY3Rvcnk6ICdFZGl0b3InLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogJ3NwbGl0LXJpZ2h0J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBpc1Zpc2libGU6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IHRyYWNrZXIuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgIHJldHVybiAoKHdpZGdldCAmJiBQYXRoRXh0LmV4dG5hbWUod2lkZ2V0LmNvbnRleHQucGF0aCkgPT09ICcubWQnKSB8fCBmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnU2hvdyBNYXJrZG93biBFZGl0b3InKVxuICAgIH0pO1xuICAgIHJldHVybiB0cmFja2VyO1xufVxuLyoqXG4gKiBFeHBvcnQgdGhlIHBsdWdpbiBhcyBkZWZhdWx0LlxuICovXG5leHBvcnQgZGVmYXVsdCBwbHVnaW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9