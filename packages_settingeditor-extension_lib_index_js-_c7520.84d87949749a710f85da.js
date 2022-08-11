(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_settingeditor-extension_lib_index_js-_c7520"],{

/***/ "../../packages/settingeditor-extension/lib/index.js":
/*!***********************************************************!*\
  !*** ../../packages/settingeditor-extension/lib/index.js ***!
  \***********************************************************/
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
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_settingeditor_lib_tokens__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jupyterlab/settingeditor/lib/tokens */ "../../packages/settingeditor/lib/tokens.js");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/statedb */ "webpack/sharing/consume/default/@jupyterlab/statedb/@jupyterlab/statedb");
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module settingeditor-extension
 */










/**
 * The command IDs used by the setting editor.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.open = 'settingeditor:open';
    CommandIDs.openJSON = 'settingeditor:open-json';
    CommandIDs.revert = 'settingeditor:revert';
    CommandIDs.save = 'settingeditor:save';
})(CommandIDs || (CommandIDs = {}));
/**
 * The default setting editor extension.
 */
const plugin = {
    id: '@jupyterlab/settingeditor-extension:form-ui',
    requires: [
        _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.ISettingRegistry,
        _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_6__.IStateDB,
        _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__.ITranslator,
        _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.IFormComponentRegistry,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabStatus
    ],
    optional: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer, _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette, _jupyterlab_settingeditor_lib_tokens__WEBPACK_IMPORTED_MODULE_8__.IJSONSettingEditorTracker],
    autoStart: true,
    provides: _jupyterlab_settingeditor_lib_tokens__WEBPACK_IMPORTED_MODULE_8__.ISettingEditorTracker,
    activate
};
/**
 * Activate the setting editor extension.
 */
function activate(app, registry, state, translator, editorRegistry, status, restorer, palette, jsonEditor) {
    const trans = translator.load('jupyterlab');
    const { commands, shell } = app;
    const namespace = 'setting-editor';
    const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
        namespace
    });
    // Handle state restoration.
    if (restorer) {
        void restorer.restore(tracker, {
            command: CommandIDs.open,
            args: widget => ({}),
            name: widget => namespace
        });
    }
    const openUi = async (args) => {
        if (tracker.currentWidget && !tracker.currentWidget.isDisposed) {
            if (!tracker.currentWidget.isAttached) {
                shell.add(tracker.currentWidget);
            }
            shell.activateById(tracker.currentWidget.id);
            return;
        }
        const key = plugin.id;
        const { SettingsEditor } = await __webpack_require__.e(/*! import() */ "webpack_sharing_consume_default_jupyterlab_settingeditor_jupyterlab_settingeditor").then(__webpack_require__.t.bind(__webpack_require__, /*! @jupyterlab/settingeditor */ "webpack/sharing/consume/default/@jupyterlab/settingeditor/@jupyterlab/settingeditor", 23));
        const editor = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MainAreaWidget({
            content: new SettingsEditor({
                editorRegistry,
                key,
                registry,
                state,
                commands,
                toSkip: [
                    '@jupyterlab/application-extension:context-menu',
                    '@jupyterlab/mainmenu-extension:plugin'
                ],
                translator,
                status,
                query: args.query
            })
        });
        if (jsonEditor) {
            editor.toolbar.addItem('spacer', _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Toolbar.createSpacerItem());
            editor.toolbar.addItem('open-json-editor', new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.CommandToolbarButton({
                commands,
                id: CommandIDs.openJSON,
                icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.launchIcon,
                label: trans.__('JSON Settings Editor')
            }));
        }
        editor.id = namespace;
        editor.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.settingsIcon;
        editor.title.label = trans.__('Settings');
        editor.title.closable = true;
        void tracker.add(editor);
        shell.add(editor);
    };
    commands.addCommand(CommandIDs.open, {
        execute: async (args) => {
            registry.load(plugin.id).then(settings => {
                var _a, _b;
                ((_a = args.settingEditorType) !== null && _a !== void 0 ? _a : settings.get('settingEditorType').composite ===
                    'json') ? commands.execute(CommandIDs.openJSON)
                    : openUi({ query: (_b = args.query) !== null && _b !== void 0 ? _b : '' });
            });
        },
        label: args => {
            if (args.label) {
                return args.label;
            }
            return trans.__('Advanced Settings Editor');
        }
    });
    if (palette) {
        palette.addItem({
            category: trans.__('Settings'),
            command: CommandIDs.open,
            args: { settingEditorType: 'ui' }
        });
    }
    return tracker;
}
/**
 * The default setting editor extension.
 */
const jsonPlugin = {
    id: '@jupyterlab/settingeditor-extension:plugin',
    requires: [
        _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.ISettingRegistry,
        _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2__.IEditorServices,
        _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_6__.IStateDB,
        _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__.IRenderMimeRegistry,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabStatus,
        _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__.ITranslator
    ],
    optional: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer, _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette],
    autoStart: true,
    provides: _jupyterlab_settingeditor_lib_tokens__WEBPACK_IMPORTED_MODULE_8__.IJSONSettingEditorTracker,
    activate: activateJSON
};
/**
 * Activate the setting editor extension.
 */
function activateJSON(app, registry, editorServices, state, rendermime, status, translator, restorer, palette) {
    const trans = translator.load('jupyterlab');
    const { commands, shell } = app;
    const namespace = 'json-setting-editor';
    const factoryService = editorServices.factoryService;
    const editorFactory = factoryService.newInlineEditor;
    const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
        namespace
    });
    // Handle state restoration.
    if (restorer) {
        void restorer.restore(tracker, {
            command: CommandIDs.openJSON,
            args: widget => ({}),
            name: widget => namespace
        });
    }
    commands.addCommand(CommandIDs.openJSON, {
        execute: async () => {
            if (tracker.currentWidget && !tracker.currentWidget.isDisposed) {
                if (!tracker.currentWidget.isAttached) {
                    shell.add(tracker.currentWidget);
                }
                shell.activateById(tracker.currentWidget.id);
                return;
            }
            const key = plugin.id;
            const when = app.restored;
            const { JsonSettingEditor } = await __webpack_require__.e(/*! import() */ "webpack_sharing_consume_default_jupyterlab_settingeditor_jupyterlab_settingeditor").then(__webpack_require__.t.bind(__webpack_require__, /*! @jupyterlab/settingeditor */ "webpack/sharing/consume/default/@jupyterlab/settingeditor/@jupyterlab/settingeditor", 23));
            const editor = new JsonSettingEditor({
                commands: {
                    registry: commands,
                    revert: CommandIDs.revert,
                    save: CommandIDs.save
                },
                editorFactory,
                key,
                registry,
                rendermime,
                state,
                translator,
                when
            });
            let disposable = null;
            // Notify the command registry when the visibility status of the setting
            // editor's commands change. The setting editor toolbar listens for this
            // signal from the command registry.
            editor.commandsChanged.connect((sender, args) => {
                args.forEach(id => {
                    commands.notifyCommandChanged(id);
                });
                if (editor.canSaveRaw) {
                    if (!disposable) {
                        disposable = status.setDirty();
                    }
                }
                else if (disposable) {
                    disposable.dispose();
                    disposable = null;
                }
                editor.disposed.connect(() => {
                    if (disposable) {
                        disposable.dispose();
                    }
                });
            });
            const container = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MainAreaWidget({
                content: editor
            });
            container.id = namespace;
            container.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.settingsIcon;
            container.title.label = trans.__('Advanced Settings Editor');
            container.title.closable = true;
            void tracker.add(container);
            shell.add(container);
        },
        label: trans.__('Advanced JSON Settings Editor')
    });
    if (palette) {
        palette.addItem({
            category: trans.__('Settings'),
            command: CommandIDs.openJSON
        });
    }
    commands.addCommand(CommandIDs.revert, {
        execute: () => {
            var _a;
            (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content.revert();
        },
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.undoIcon,
        label: trans.__('Revert User Settings'),
        isEnabled: () => { var _a, _b; return (_b = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content.canRevertRaw) !== null && _b !== void 0 ? _b : false; }
    });
    commands.addCommand(CommandIDs.save, {
        execute: () => { var _a; return (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content.save(); },
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.saveIcon,
        label: trans.__('Save User Settings'),
        isEnabled: () => { var _a, _b; return (_b = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content.canSaveRaw) !== null && _b !== void 0 ? _b : false; }
    });
    return tracker;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([plugin, jsonPlugin]);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/settingeditor/lib/tokens.js":
/*!**************************************************!*\
  !*** ../../packages/settingeditor/lib/tokens.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ISettingEditorTracker": () => (/* binding */ ISettingEditorTracker),
/* harmony export */   "IJSONSettingEditorTracker": () => (/* binding */ IJSONSettingEditorTracker)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The setting editor tracker token.
 */
const ISettingEditorTracker = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/settingeditor:ISettingEditorTracker');
/* tslint:enable */
/**
 * The setting editor tracker token.
 */
const IJSONSettingEditorTracker = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/settingeditor:IJSONSettingEditorTracker');
//# sourceMappingURL=tokens.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2V0dGluZ2VkaXRvci1leHRlbnNpb24vbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXR0aW5nZWRpdG9yL2xpYi90b2tlbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNzRTtBQUMrQztBQUM1RDtBQUNzQjtBQUNsQjtBQUMyQztBQUN6QztBQUNoQjtBQUNPO0FBQ3VCO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEseUVBQWdCO0FBQ3hCLFFBQVEseURBQVE7QUFDaEIsUUFBUSxnRUFBVztBQUNuQixRQUFRLDZFQUFzQjtBQUM5QixRQUFRLCtEQUFVO0FBQ2xCO0FBQ0EsZUFBZSxvRUFBZSxFQUFFLGlFQUFlLEVBQUUsMkZBQXlCO0FBQzFFO0FBQ0EsY0FBYyx1RkFBcUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGtCQUFrQjtBQUM3QjtBQUNBLHdCQUF3QiwrREFBYTtBQUNyQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCLFNBQVMsNFNBQW1DO0FBQzVFLDJCQUEyQixnRUFBYztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSw2Q0FBNkMsMEVBQXdCO0FBQ3JFLDJEQUEyRCxzRUFBb0I7QUFDL0U7QUFDQTtBQUNBLHNCQUFzQixpRUFBVTtBQUNoQztBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsNEJBQTRCLG1FQUFZO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsK0RBQStEO0FBQzdGLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHlFQUFnQjtBQUN4QixRQUFRLG1FQUFlO0FBQ3ZCLFFBQVEseURBQVE7QUFDaEIsUUFBUSx1RUFBbUI7QUFDM0IsUUFBUSwrREFBVTtBQUNsQixRQUFRLGdFQUFXO0FBQ25CO0FBQ0EsZUFBZSxvRUFBZSxFQUFFLGlFQUFlO0FBQy9DO0FBQ0EsY0FBYywyRkFBeUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGtCQUFrQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsK0RBQWE7QUFDckM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG9CQUFvQixTQUFTLDRTQUFtQztBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixrQ0FBa0MsZ0VBQWM7QUFDaEQ7QUFDQSxhQUFhO0FBQ2I7QUFDQSxtQ0FBbUMsbUVBQVk7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxjQUFjLCtEQUFRO0FBQ3RCO0FBQ0EsMEJBQTBCLFlBQVksZ0pBQWdKO0FBQ3RMLEtBQUs7QUFDTDtBQUNBLHdCQUF3QixRQUFRLDRGQUE0RixFQUFFO0FBQzlILGNBQWMsK0RBQVE7QUFDdEI7QUFDQSwwQkFBMEIsWUFBWSw4SUFBOEk7QUFDcEwsS0FBSztBQUNMO0FBQ0E7QUFDQSxpRUFBZSxvQkFBb0IsRUFBQztBQUNwQyxpQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN1BBO0FBQ0E7QUFDMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDTyxrQ0FBa0Msb0RBQUs7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDTyxzQ0FBc0Msb0RBQUs7QUFDbEQsa0MiLCJmaWxlIjoicGFja2FnZXNfc2V0dGluZ2VkaXRvci1leHRlbnNpb25fbGliX2luZGV4X2pzLV9jNzUyMC44NGQ4Nzk0OTc0OWE3MTBmODVkYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxufCBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgc2V0dGluZ2VkaXRvci1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgSUxhYlN0YXR1cywgSUxheW91dFJlc3RvcmVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgQ29tbWFuZFRvb2xiYXJCdXR0b24sIElDb21tYW5kUGFsZXR0ZSwgTWFpbkFyZWFXaWRnZXQsIFRvb2xiYXIsIFdpZGdldFRyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBJRWRpdG9yU2VydmljZXMgfSBmcm9tICdAanVweXRlcmxhYi9jb2RlZWRpdG9yJztcbmltcG9ydCB7IElGb3JtQ29tcG9uZW50UmVnaXN0cnksIGxhdW5jaEljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IElSZW5kZXJNaW1lUmVnaXN0cnkgfSBmcm9tICdAanVweXRlcmxhYi9yZW5kZXJtaW1lJztcbmltcG9ydCB7IElKU09OU2V0dGluZ0VkaXRvclRyYWNrZXIsIElTZXR0aW5nRWRpdG9yVHJhY2tlciB9IGZyb20gJ0BqdXB5dGVybGFiL3NldHRpbmdlZGl0b3IvbGliL3Rva2Vucyc7XG5pbXBvcnQgeyBJU2V0dGluZ1JlZ2lzdHJ5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvc2V0dGluZ3JlZ2lzdHJ5JztcbmltcG9ydCB7IElTdGF0ZURCIH0gZnJvbSAnQGp1cHl0ZXJsYWIvc3RhdGVkYic7XG5pbXBvcnQgeyBJVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IHNhdmVJY29uLCBzZXR0aW5nc0ljb24sIHVuZG9JY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG4vKipcbiAqIFRoZSBjb21tYW5kIElEcyB1c2VkIGJ5IHRoZSBzZXR0aW5nIGVkaXRvci5cbiAqL1xudmFyIENvbW1hbmRJRHM7XG4oZnVuY3Rpb24gKENvbW1hbmRJRHMpIHtcbiAgICBDb21tYW5kSURzLm9wZW4gPSAnc2V0dGluZ2VkaXRvcjpvcGVuJztcbiAgICBDb21tYW5kSURzLm9wZW5KU09OID0gJ3NldHRpbmdlZGl0b3I6b3Blbi1qc29uJztcbiAgICBDb21tYW5kSURzLnJldmVydCA9ICdzZXR0aW5nZWRpdG9yOnJldmVydCc7XG4gICAgQ29tbWFuZElEcy5zYXZlID0gJ3NldHRpbmdlZGl0b3I6c2F2ZSc7XG59KShDb21tYW5kSURzIHx8IChDb21tYW5kSURzID0ge30pKTtcbi8qKlxuICogVGhlIGRlZmF1bHQgc2V0dGluZyBlZGl0b3IgZXh0ZW5zaW9uLlxuICovXG5jb25zdCBwbHVnaW4gPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9zZXR0aW5nZWRpdG9yLWV4dGVuc2lvbjpmb3JtLXVpJyxcbiAgICByZXF1aXJlczogW1xuICAgICAgICBJU2V0dGluZ1JlZ2lzdHJ5LFxuICAgICAgICBJU3RhdGVEQixcbiAgICAgICAgSVRyYW5zbGF0b3IsXG4gICAgICAgIElGb3JtQ29tcG9uZW50UmVnaXN0cnksXG4gICAgICAgIElMYWJTdGF0dXNcbiAgICBdLFxuICAgIG9wdGlvbmFsOiBbSUxheW91dFJlc3RvcmVyLCBJQ29tbWFuZFBhbGV0dGUsIElKU09OU2V0dGluZ0VkaXRvclRyYWNrZXJdLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICBwcm92aWRlczogSVNldHRpbmdFZGl0b3JUcmFja2VyLFxuICAgIGFjdGl2YXRlXG59O1xuLyoqXG4gKiBBY3RpdmF0ZSB0aGUgc2V0dGluZyBlZGl0b3IgZXh0ZW5zaW9uLlxuICovXG5mdW5jdGlvbiBhY3RpdmF0ZShhcHAsIHJlZ2lzdHJ5LCBzdGF0ZSwgdHJhbnNsYXRvciwgZWRpdG9yUmVnaXN0cnksIHN0YXR1cywgcmVzdG9yZXIsIHBhbGV0dGUsIGpzb25FZGl0b3IpIHtcbiAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgIGNvbnN0IHsgY29tbWFuZHMsIHNoZWxsIH0gPSBhcHA7XG4gICAgY29uc3QgbmFtZXNwYWNlID0gJ3NldHRpbmctZWRpdG9yJztcbiAgICBjb25zdCB0cmFja2VyID0gbmV3IFdpZGdldFRyYWNrZXIoe1xuICAgICAgICBuYW1lc3BhY2VcbiAgICB9KTtcbiAgICAvLyBIYW5kbGUgc3RhdGUgcmVzdG9yYXRpb24uXG4gICAgaWYgKHJlc3RvcmVyKSB7XG4gICAgICAgIHZvaWQgcmVzdG9yZXIucmVzdG9yZSh0cmFja2VyLCB7XG4gICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLm9wZW4sXG4gICAgICAgICAgICBhcmdzOiB3aWRnZXQgPT4gKHt9KSxcbiAgICAgICAgICAgIG5hbWU6IHdpZGdldCA9PiBuYW1lc3BhY2VcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IG9wZW5VaSA9IGFzeW5jIChhcmdzKSA9PiB7XG4gICAgICAgIGlmICh0cmFja2VyLmN1cnJlbnRXaWRnZXQgJiYgIXRyYWNrZXIuY3VycmVudFdpZGdldC5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICBpZiAoIXRyYWNrZXIuY3VycmVudFdpZGdldC5pc0F0dGFjaGVkKSB7XG4gICAgICAgICAgICAgICAgc2hlbGwuYWRkKHRyYWNrZXIuY3VycmVudFdpZGdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaGVsbC5hY3RpdmF0ZUJ5SWQodHJhY2tlci5jdXJyZW50V2lkZ2V0LmlkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrZXkgPSBwbHVnaW4uaWQ7XG4gICAgICAgIGNvbnN0IHsgU2V0dGluZ3NFZGl0b3IgfSA9IGF3YWl0IGltcG9ydCgnQGp1cHl0ZXJsYWIvc2V0dGluZ2VkaXRvcicpO1xuICAgICAgICBjb25zdCBlZGl0b3IgPSBuZXcgTWFpbkFyZWFXaWRnZXQoe1xuICAgICAgICAgICAgY29udGVudDogbmV3IFNldHRpbmdzRWRpdG9yKHtcbiAgICAgICAgICAgICAgICBlZGl0b3JSZWdpc3RyeSxcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgcmVnaXN0cnksXG4gICAgICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICAgICAgY29tbWFuZHMsXG4gICAgICAgICAgICAgICAgdG9Ta2lwOiBbXG4gICAgICAgICAgICAgICAgICAgICdAanVweXRlcmxhYi9hcHBsaWNhdGlvbi1leHRlbnNpb246Y29udGV4dC1tZW51JyxcbiAgICAgICAgICAgICAgICAgICAgJ0BqdXB5dGVybGFiL21haW5tZW51LWV4dGVuc2lvbjpwbHVnaW4nXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB0cmFuc2xhdG9yLFxuICAgICAgICAgICAgICAgIHN0YXR1cyxcbiAgICAgICAgICAgICAgICBxdWVyeTogYXJncy5xdWVyeVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChqc29uRWRpdG9yKSB7XG4gICAgICAgICAgICBlZGl0b3IudG9vbGJhci5hZGRJdGVtKCdzcGFjZXInLCBUb29sYmFyLmNyZWF0ZVNwYWNlckl0ZW0oKSk7XG4gICAgICAgICAgICBlZGl0b3IudG9vbGJhci5hZGRJdGVtKCdvcGVuLWpzb24tZWRpdG9yJywgbmV3IENvbW1hbmRUb29sYmFyQnV0dG9uKHtcbiAgICAgICAgICAgICAgICBjb21tYW5kcyxcbiAgICAgICAgICAgICAgICBpZDogQ29tbWFuZElEcy5vcGVuSlNPTixcbiAgICAgICAgICAgICAgICBpY29uOiBsYXVuY2hJY29uLFxuICAgICAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnSlNPTiBTZXR0aW5ncyBFZGl0b3InKVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGVkaXRvci5pZCA9IG5hbWVzcGFjZTtcbiAgICAgICAgZWRpdG9yLnRpdGxlLmljb24gPSBzZXR0aW5nc0ljb247XG4gICAgICAgIGVkaXRvci50aXRsZS5sYWJlbCA9IHRyYW5zLl9fKCdTZXR0aW5ncycpO1xuICAgICAgICBlZGl0b3IudGl0bGUuY2xvc2FibGUgPSB0cnVlO1xuICAgICAgICB2b2lkIHRyYWNrZXIuYWRkKGVkaXRvcik7XG4gICAgICAgIHNoZWxsLmFkZChlZGl0b3IpO1xuICAgIH07XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm9wZW4sIHtcbiAgICAgICAgZXhlY3V0ZTogYXN5bmMgKGFyZ3MpID0+IHtcbiAgICAgICAgICAgIHJlZ2lzdHJ5LmxvYWQocGx1Z2luLmlkKS50aGVuKHNldHRpbmdzID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgICgoX2EgPSBhcmdzLnNldHRpbmdFZGl0b3JUeXBlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBzZXR0aW5ncy5nZXQoJ3NldHRpbmdFZGl0b3JUeXBlJykuY29tcG9zaXRlID09PVxuICAgICAgICAgICAgICAgICAgICAnanNvbicpID8gY29tbWFuZHMuZXhlY3V0ZShDb21tYW5kSURzLm9wZW5KU09OKVxuICAgICAgICAgICAgICAgICAgICA6IG9wZW5VaSh7IHF1ZXJ5OiAoX2IgPSBhcmdzLnF1ZXJ5KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBsYWJlbDogYXJncyA9PiB7XG4gICAgICAgICAgICBpZiAoYXJncy5sYWJlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcmdzLmxhYmVsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRyYW5zLl9fKCdBZHZhbmNlZCBTZXR0aW5ncyBFZGl0b3InKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChwYWxldHRlKSB7XG4gICAgICAgIHBhbGV0dGUuYWRkSXRlbSh7XG4gICAgICAgICAgICBjYXRlZ29yeTogdHJhbnMuX18oJ1NldHRpbmdzJyksXG4gICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLm9wZW4sXG4gICAgICAgICAgICBhcmdzOiB7IHNldHRpbmdFZGl0b3JUeXBlOiAndWknIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0cmFja2VyO1xufVxuLyoqXG4gKiBUaGUgZGVmYXVsdCBzZXR0aW5nIGVkaXRvciBleHRlbnNpb24uXG4gKi9cbmNvbnN0IGpzb25QbHVnaW4gPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9zZXR0aW5nZWRpdG9yLWV4dGVuc2lvbjpwbHVnaW4nLFxuICAgIHJlcXVpcmVzOiBbXG4gICAgICAgIElTZXR0aW5nUmVnaXN0cnksXG4gICAgICAgIElFZGl0b3JTZXJ2aWNlcyxcbiAgICAgICAgSVN0YXRlREIsXG4gICAgICAgIElSZW5kZXJNaW1lUmVnaXN0cnksXG4gICAgICAgIElMYWJTdGF0dXMsXG4gICAgICAgIElUcmFuc2xhdG9yXG4gICAgXSxcbiAgICBvcHRpb25hbDogW0lMYXlvdXRSZXN0b3JlciwgSUNvbW1hbmRQYWxldHRlXSxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcHJvdmlkZXM6IElKU09OU2V0dGluZ0VkaXRvclRyYWNrZXIsXG4gICAgYWN0aXZhdGU6IGFjdGl2YXRlSlNPTlxufTtcbi8qKlxuICogQWN0aXZhdGUgdGhlIHNldHRpbmcgZWRpdG9yIGV4dGVuc2lvbi5cbiAqL1xuZnVuY3Rpb24gYWN0aXZhdGVKU09OKGFwcCwgcmVnaXN0cnksIGVkaXRvclNlcnZpY2VzLCBzdGF0ZSwgcmVuZGVybWltZSwgc3RhdHVzLCB0cmFuc2xhdG9yLCByZXN0b3JlciwgcGFsZXR0ZSkge1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgY29uc3QgeyBjb21tYW5kcywgc2hlbGwgfSA9IGFwcDtcbiAgICBjb25zdCBuYW1lc3BhY2UgPSAnanNvbi1zZXR0aW5nLWVkaXRvcic7XG4gICAgY29uc3QgZmFjdG9yeVNlcnZpY2UgPSBlZGl0b3JTZXJ2aWNlcy5mYWN0b3J5U2VydmljZTtcbiAgICBjb25zdCBlZGl0b3JGYWN0b3J5ID0gZmFjdG9yeVNlcnZpY2UubmV3SW5saW5lRWRpdG9yO1xuICAgIGNvbnN0IHRyYWNrZXIgPSBuZXcgV2lkZ2V0VHJhY2tlcih7XG4gICAgICAgIG5hbWVzcGFjZVxuICAgIH0pO1xuICAgIC8vIEhhbmRsZSBzdGF0ZSByZXN0b3JhdGlvbi5cbiAgICBpZiAocmVzdG9yZXIpIHtcbiAgICAgICAgdm9pZCByZXN0b3Jlci5yZXN0b3JlKHRyYWNrZXIsIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMub3BlbkpTT04sXG4gICAgICAgICAgICBhcmdzOiB3aWRnZXQgPT4gKHt9KSxcbiAgICAgICAgICAgIG5hbWU6IHdpZGdldCA9PiBuYW1lc3BhY2VcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5vcGVuSlNPTiwge1xuICAgICAgICBleGVjdXRlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodHJhY2tlci5jdXJyZW50V2lkZ2V0ICYmICF0cmFja2VyLmN1cnJlbnRXaWRnZXQuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgIGlmICghdHJhY2tlci5jdXJyZW50V2lkZ2V0LmlzQXR0YWNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hlbGwuYWRkKHRyYWNrZXIuY3VycmVudFdpZGdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNoZWxsLmFjdGl2YXRlQnlJZCh0cmFja2VyLmN1cnJlbnRXaWRnZXQuaWQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHBsdWdpbi5pZDtcbiAgICAgICAgICAgIGNvbnN0IHdoZW4gPSBhcHAucmVzdG9yZWQ7XG4gICAgICAgICAgICBjb25zdCB7IEpzb25TZXR0aW5nRWRpdG9yIH0gPSBhd2FpdCBpbXBvcnQoJ0BqdXB5dGVybGFiL3NldHRpbmdlZGl0b3InKTtcbiAgICAgICAgICAgIGNvbnN0IGVkaXRvciA9IG5ldyBKc29uU2V0dGluZ0VkaXRvcih7XG4gICAgICAgICAgICAgICAgY29tbWFuZHM6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0cnk6IGNvbW1hbmRzLFxuICAgICAgICAgICAgICAgICAgICByZXZlcnQ6IENvbW1hbmRJRHMucmV2ZXJ0LFxuICAgICAgICAgICAgICAgICAgICBzYXZlOiBDb21tYW5kSURzLnNhdmVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVkaXRvckZhY3RvcnksXG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIHJlZ2lzdHJ5LFxuICAgICAgICAgICAgICAgIHJlbmRlcm1pbWUsXG4gICAgICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRvcixcbiAgICAgICAgICAgICAgICB3aGVuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBkaXNwb3NhYmxlID0gbnVsbDtcbiAgICAgICAgICAgIC8vIE5vdGlmeSB0aGUgY29tbWFuZCByZWdpc3RyeSB3aGVuIHRoZSB2aXNpYmlsaXR5IHN0YXR1cyBvZiB0aGUgc2V0dGluZ1xuICAgICAgICAgICAgLy8gZWRpdG9yJ3MgY29tbWFuZHMgY2hhbmdlLiBUaGUgc2V0dGluZyBlZGl0b3IgdG9vbGJhciBsaXN0ZW5zIGZvciB0aGlzXG4gICAgICAgICAgICAvLyBzaWduYWwgZnJvbSB0aGUgY29tbWFuZCByZWdpc3RyeS5cbiAgICAgICAgICAgIGVkaXRvci5jb21tYW5kc0NoYW5nZWQuY29ubmVjdCgoc2VuZGVyLCBhcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgYXJncy5mb3JFYWNoKGlkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZHMubm90aWZ5Q29tbWFuZENoYW5nZWQoaWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChlZGl0b3IuY2FuU2F2ZVJhdykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWRpc3Bvc2FibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3Bvc2FibGUgPSBzdGF0dXMuc2V0RGlydHkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkaXNwb3NhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3Bvc2FibGUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBkaXNwb3NhYmxlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWRpdG9yLmRpc3Bvc2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzcG9zYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcG9zYWJsZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gbmV3IE1haW5BcmVhV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBlZGl0b3JcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udGFpbmVyLmlkID0gbmFtZXNwYWNlO1xuICAgICAgICAgICAgY29udGFpbmVyLnRpdGxlLmljb24gPSBzZXR0aW5nc0ljb247XG4gICAgICAgICAgICBjb250YWluZXIudGl0bGUubGFiZWwgPSB0cmFucy5fXygnQWR2YW5jZWQgU2V0dGluZ3MgRWRpdG9yJyk7XG4gICAgICAgICAgICBjb250YWluZXIudGl0bGUuY2xvc2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgdm9pZCB0cmFja2VyLmFkZChjb250YWluZXIpO1xuICAgICAgICAgICAgc2hlbGwuYWRkKGNvbnRhaW5lcik7XG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnQWR2YW5jZWQgSlNPTiBTZXR0aW5ncyBFZGl0b3InKVxuICAgIH0pO1xuICAgIGlmIChwYWxldHRlKSB7XG4gICAgICAgIHBhbGV0dGUuYWRkSXRlbSh7XG4gICAgICAgICAgICBjYXRlZ29yeTogdHJhbnMuX18oJ1NldHRpbmdzJyksXG4gICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLm9wZW5KU09OXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMucmV2ZXJ0LCB7XG4gICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIChfYSA9IHRyYWNrZXIuY3VycmVudFdpZGdldCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbnRlbnQucmV2ZXJ0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGljb246IHVuZG9JY29uLFxuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1JldmVydCBVc2VyIFNldHRpbmdzJyksXG4gICAgICAgIGlzRW5hYmxlZDogKCkgPT4geyB2YXIgX2EsIF9iOyByZXR1cm4gKF9iID0gKF9hID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudC5jYW5SZXZlcnRSYXcpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IGZhbHNlOyB9XG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnNhdmUsIHtcbiAgICAgICAgZXhlY3V0ZTogKCkgPT4geyB2YXIgX2E7IHJldHVybiAoX2EgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb250ZW50LnNhdmUoKTsgfSxcbiAgICAgICAgaWNvbjogc2F2ZUljb24sXG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnU2F2ZSBVc2VyIFNldHRpbmdzJyksXG4gICAgICAgIGlzRW5hYmxlZDogKCkgPT4geyB2YXIgX2EsIF9iOyByZXR1cm4gKF9iID0gKF9hID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudC5jYW5TYXZlUmF3KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBmYWxzZTsgfVxuICAgIH0pO1xuICAgIHJldHVybiB0cmFja2VyO1xufVxuZXhwb3J0IGRlZmF1bHQgW3BsdWdpbiwganNvblBsdWdpbl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbi8qIHRzbGludDpkaXNhYmxlICovXG4vKipcbiAqIFRoZSBzZXR0aW5nIGVkaXRvciB0cmFja2VyIHRva2VuLlxuICovXG5leHBvcnQgY29uc3QgSVNldHRpbmdFZGl0b3JUcmFja2VyID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi9zZXR0aW5nZWRpdG9yOklTZXR0aW5nRWRpdG9yVHJhY2tlcicpO1xuLyogdHNsaW50OmVuYWJsZSAqL1xuLyoqXG4gKiBUaGUgc2V0dGluZyBlZGl0b3IgdHJhY2tlciB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IElKU09OU2V0dGluZ0VkaXRvclRyYWNrZXIgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL3NldHRpbmdlZGl0b3I6SUpTT05TZXR0aW5nRWRpdG9yVHJhY2tlcicpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9rZW5zLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=