(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_extensionmanager-extension_lib_index_js-_ef5c0"],{

/***/ "../../packages/extensionmanager-extension/lib/index.js":
/*!**************************************************************!*\
  !*** ../../packages/extensionmanager-extension/lib/index.js ***!
  \**************************************************************/
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
/* harmony import */ var _jupyterlab_extensionmanager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/extensionmanager */ "webpack/sharing/consume/default/@jupyterlab/extensionmanager/@jupyterlab/extensionmanager");
/* harmony import */ var _jupyterlab_extensionmanager__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_extensionmanager__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module extensionmanager-extension
 */






const PLUGIN_ID = '@jupyterlab/extensionmanager-extension:plugin';
/**
 * IDs of the commands added by this extension.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.toggle = 'extensionmanager:toggle';
})(CommandIDs || (CommandIDs = {}));
/**
 * The extension manager plugin.
 */
const plugin = {
    id: PLUGIN_ID,
    autoStart: true,
    requires: [_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__.ISettingRegistry, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.ITranslator],
    optional: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer, _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette],
    activate: async (app, registry, translator, labShell, restorer, palette) => {
        const trans = translator.load('jupyterlab');
        const settings = await registry.load(plugin.id);
        let enabled = settings.composite['enabled'] === true;
        const { commands, serviceManager } = app;
        let view;
        const createView = () => {
            const v = new _jupyterlab_extensionmanager__WEBPACK_IMPORTED_MODULE_2__.ExtensionView(app, serviceManager, settings, translator);
            v.id = 'extensionmanager.main-view';
            v.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__.extensionIcon;
            v.title.caption = trans.__('Extension Manager');
            if (restorer) {
                restorer.add(v, v.id);
            }
            return v;
        };
        if (enabled && labShell) {
            view = createView();
            view.node.setAttribute('role', 'region');
            view.node.setAttribute('aria-label', trans.__('Extension Manager section'));
            labShell.add(view, 'left', { rank: 1000 });
        }
        // If the extension is enabled or disabled,
        // add or remove it from the left area.
        Promise.all([app.restored, registry.load(PLUGIN_ID)])
            .then(([, settings]) => {
            settings.changed.connect(async () => {
                enabled = settings.composite['enabled'] === true;
                if (enabled && !(view === null || view === void 0 ? void 0 : view.isAttached)) {
                    const accepted = await Private.showWarning(trans);
                    if (!accepted) {
                        void settings.set('enabled', false);
                        return;
                    }
                    view = view || createView();
                    view.node.setAttribute('role', 'region');
                    view.node.setAttribute('aria-label', trans.__('Extension Manager section'));
                    if (labShell) {
                        labShell.add(view, 'left', { rank: 1000 });
                    }
                }
                else if (!enabled && (view === null || view === void 0 ? void 0 : view.isAttached)) {
                    app.commands.notifyCommandChanged(CommandIDs.toggle);
                    view.close();
                }
            });
        })
            .catch(reason => {
            console.error(`Something went wrong when reading the settings.\n${reason}`);
        });
        commands.addCommand(CommandIDs.toggle, {
            label: trans.__('Enable Extension Manager'),
            execute: () => {
                if (registry) {
                    void registry.set(plugin.id, 'enabled', !enabled);
                }
            },
            isToggled: () => enabled,
            isEnabled: () => serviceManager.builder.isAvailable
        });
        const category = trans.__('Extension Manager');
        const command = CommandIDs.toggle;
        if (palette) {
            palette.addItem({ command, category });
        }
    }
};
/**
 * Export the plugin as the default.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);
/**
 * A namespace for module-private functions.
 */
var Private;
(function (Private) {
    /**
     * Show a warning dialog about extension security.
     *
     * @returns whether the user accepted the dialog.
     */
    async function showWarning(trans) {
        return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
            title: trans.__('Enable Extension Manager?'),
            body: trans.__(`Thanks for trying out JupyterLab's extension manager.
The JupyterLab development team is excited to have a robust
third-party extension community.
However, we cannot vouch for every extension,
and some may introduce security risks.
Do you want to continue?`),
            buttons: [
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton({ label: trans.__('Disable') }),
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.warnButton({ label: trans.__('Enable') })
            ]
        }).then(result => {
            return result.button.accept;
        });
    }
    Private.showWarning = showWarning;
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZXh0ZW5zaW9ubWFuYWdlci1leHRlbnNpb24vbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDcUU7QUFDTTtBQUNkO0FBQ0U7QUFDVDtBQUNJO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx5RUFBZ0IsRUFBRSxnRUFBVztBQUM1QyxlQUFlLDhEQUFTLEVBQUUsb0VBQWUsRUFBRSxpRUFBZTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMkJBQTJCO0FBQzFDO0FBQ0E7QUFDQSwwQkFBMEIsdUVBQWE7QUFDdkM7QUFDQSwyQkFBMkIsb0VBQWE7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsYUFBYTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELGFBQWE7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLDhFQUE4RSxPQUFPO0FBQ3JGLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsb0JBQW9CO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLE1BQU0sRUFBQztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxnRUFBVTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHFFQUFtQixFQUFFLDZCQUE2QjtBQUNsRSxnQkFBZ0IsbUVBQWlCLEVBQUUsNEJBQTRCO0FBQy9EO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQixpQyIsImZpbGUiOiJwYWNrYWdlc19leHRlbnNpb25tYW5hZ2VyLWV4dGVuc2lvbl9saWJfaW5kZXhfanMtX2VmNWMwLjZiMTZkZGU1NTAwMWNlZjdkYjFjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgZXh0ZW5zaW9ubWFuYWdlci1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgSUxhYlNoZWxsLCBJTGF5b3V0UmVzdG9yZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBEaWFsb2csIElDb21tYW5kUGFsZXR0ZSwgc2hvd0RpYWxvZyB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IEV4dGVuc2lvblZpZXcgfSBmcm9tICdAanVweXRlcmxhYi9leHRlbnNpb25tYW5hZ2VyJztcbmltcG9ydCB7IElTZXR0aW5nUmVnaXN0cnkgfSBmcm9tICdAanVweXRlcmxhYi9zZXR0aW5ncmVnaXN0cnknO1xuaW1wb3J0IHsgSVRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBleHRlbnNpb25JY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5jb25zdCBQTFVHSU5fSUQgPSAnQGp1cHl0ZXJsYWIvZXh0ZW5zaW9ubWFuYWdlci1leHRlbnNpb246cGx1Z2luJztcbi8qKlxuICogSURzIG9mIHRoZSBjb21tYW5kcyBhZGRlZCBieSB0aGlzIGV4dGVuc2lvbi5cbiAqL1xudmFyIENvbW1hbmRJRHM7XG4oZnVuY3Rpb24gKENvbW1hbmRJRHMpIHtcbiAgICBDb21tYW5kSURzLnRvZ2dsZSA9ICdleHRlbnNpb25tYW5hZ2VyOnRvZ2dsZSc7XG59KShDb21tYW5kSURzIHx8IChDb21tYW5kSURzID0ge30pKTtcbi8qKlxuICogVGhlIGV4dGVuc2lvbiBtYW5hZ2VyIHBsdWdpbi5cbiAqL1xuY29uc3QgcGx1Z2luID0ge1xuICAgIGlkOiBQTFVHSU5fSUQsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHJlcXVpcmVzOiBbSVNldHRpbmdSZWdpc3RyeSwgSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbSUxhYlNoZWxsLCBJTGF5b3V0UmVzdG9yZXIsIElDb21tYW5kUGFsZXR0ZV0sXG4gICAgYWN0aXZhdGU6IGFzeW5jIChhcHAsIHJlZ2lzdHJ5LCB0cmFuc2xhdG9yLCBsYWJTaGVsbCwgcmVzdG9yZXIsIHBhbGV0dGUpID0+IHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCByZWdpc3RyeS5sb2FkKHBsdWdpbi5pZCk7XG4gICAgICAgIGxldCBlbmFibGVkID0gc2V0dGluZ3MuY29tcG9zaXRlWydlbmFibGVkJ10gPT09IHRydWU7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMsIHNlcnZpY2VNYW5hZ2VyIH0gPSBhcHA7XG4gICAgICAgIGxldCB2aWV3O1xuICAgICAgICBjb25zdCBjcmVhdGVWaWV3ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdiA9IG5ldyBFeHRlbnNpb25WaWV3KGFwcCwgc2VydmljZU1hbmFnZXIsIHNldHRpbmdzLCB0cmFuc2xhdG9yKTtcbiAgICAgICAgICAgIHYuaWQgPSAnZXh0ZW5zaW9ubWFuYWdlci5tYWluLXZpZXcnO1xuICAgICAgICAgICAgdi50aXRsZS5pY29uID0gZXh0ZW5zaW9uSWNvbjtcbiAgICAgICAgICAgIHYudGl0bGUuY2FwdGlvbiA9IHRyYW5zLl9fKCdFeHRlbnNpb24gTWFuYWdlcicpO1xuICAgICAgICAgICAgaWYgKHJlc3RvcmVyKSB7XG4gICAgICAgICAgICAgICAgcmVzdG9yZXIuYWRkKHYsIHYuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChlbmFibGVkICYmIGxhYlNoZWxsKSB7XG4gICAgICAgICAgICB2aWV3ID0gY3JlYXRlVmlldygpO1xuICAgICAgICAgICAgdmlldy5ub2RlLnNldEF0dHJpYnV0ZSgncm9sZScsICdyZWdpb24nKTtcbiAgICAgICAgICAgIHZpZXcubm9kZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCB0cmFucy5fXygnRXh0ZW5zaW9uIE1hbmFnZXIgc2VjdGlvbicpKTtcbiAgICAgICAgICAgIGxhYlNoZWxsLmFkZCh2aWV3LCAnbGVmdCcsIHsgcmFuazogMTAwMCB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgZXh0ZW5zaW9uIGlzIGVuYWJsZWQgb3IgZGlzYWJsZWQsXG4gICAgICAgIC8vIGFkZCBvciByZW1vdmUgaXQgZnJvbSB0aGUgbGVmdCBhcmVhLlxuICAgICAgICBQcm9taXNlLmFsbChbYXBwLnJlc3RvcmVkLCByZWdpc3RyeS5sb2FkKFBMVUdJTl9JRCldKVxuICAgICAgICAgICAgLnRoZW4oKFssIHNldHRpbmdzXSkgPT4ge1xuICAgICAgICAgICAgc2V0dGluZ3MuY2hhbmdlZC5jb25uZWN0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkID0gc2V0dGluZ3MuY29tcG9zaXRlWydlbmFibGVkJ10gPT09IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKGVuYWJsZWQgJiYgISh2aWV3ID09PSBudWxsIHx8IHZpZXcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpZXcuaXNBdHRhY2hlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWNjZXB0ZWQgPSBhd2FpdCBQcml2YXRlLnNob3dXYXJuaW5nKHRyYW5zKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhY2NlcHRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCBzZXR0aW5ncy5zZXQoJ2VuYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmlldyA9IHZpZXcgfHwgY3JlYXRlVmlldygpO1xuICAgICAgICAgICAgICAgICAgICB2aWV3Lm5vZGUuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3JlZ2lvbicpO1xuICAgICAgICAgICAgICAgICAgICB2aWV3Lm5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgdHJhbnMuX18oJ0V4dGVuc2lvbiBNYW5hZ2VyIHNlY3Rpb24nKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYWJTaGVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiU2hlbGwuYWRkKHZpZXcsICdsZWZ0JywgeyByYW5rOiAxMDAwIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFlbmFibGVkICYmICh2aWV3ID09PSBudWxsIHx8IHZpZXcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpZXcuaXNBdHRhY2hlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwLmNvbW1hbmRzLm5vdGlmeUNvbW1hbmRDaGFuZ2VkKENvbW1hbmRJRHMudG9nZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHJlYXNvbiA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBTb21ldGhpbmcgd2VudCB3cm9uZyB3aGVuIHJlYWRpbmcgdGhlIHNldHRpbmdzLlxcbiR7cmVhc29ufWApO1xuICAgICAgICB9KTtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnRvZ2dsZSwge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdFbmFibGUgRXh0ZW5zaW9uIE1hbmFnZXInKSxcbiAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVnaXN0cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCByZWdpc3RyeS5zZXQocGx1Z2luLmlkLCAnZW5hYmxlZCcsICFlbmFibGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNUb2dnbGVkOiAoKSA9PiBlbmFibGVkLFxuICAgICAgICAgICAgaXNFbmFibGVkOiAoKSA9PiBzZXJ2aWNlTWFuYWdlci5idWlsZGVyLmlzQXZhaWxhYmxlXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBjYXRlZ29yeSA9IHRyYW5zLl9fKCdFeHRlbnNpb24gTWFuYWdlcicpO1xuICAgICAgICBjb25zdCBjb21tYW5kID0gQ29tbWFuZElEcy50b2dnbGU7XG4gICAgICAgIGlmIChwYWxldHRlKSB7XG4gICAgICAgICAgICBwYWxldHRlLmFkZEl0ZW0oeyBjb21tYW5kLCBjYXRlZ29yeSB9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4vKipcbiAqIEV4cG9ydCB0aGUgcGx1Z2luIGFzIHRoZSBkZWZhdWx0LlxuICovXG5leHBvcnQgZGVmYXVsdCBwbHVnaW47XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBtb2R1bGUtcHJpdmF0ZSBmdW5jdGlvbnMuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogU2hvdyBhIHdhcm5pbmcgZGlhbG9nIGFib3V0IGV4dGVuc2lvbiBzZWN1cml0eS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIHVzZXIgYWNjZXB0ZWQgdGhlIGRpYWxvZy5cbiAgICAgKi9cbiAgICBhc3luYyBmdW5jdGlvbiBzaG93V2FybmluZyh0cmFucykge1xuICAgICAgICByZXR1cm4gc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICB0aXRsZTogdHJhbnMuX18oJ0VuYWJsZSBFeHRlbnNpb24gTWFuYWdlcj8nKSxcbiAgICAgICAgICAgIGJvZHk6IHRyYW5zLl9fKGBUaGFua3MgZm9yIHRyeWluZyBvdXQgSnVweXRlckxhYidzIGV4dGVuc2lvbiBtYW5hZ2VyLlxuVGhlIEp1cHl0ZXJMYWIgZGV2ZWxvcG1lbnQgdGVhbSBpcyBleGNpdGVkIHRvIGhhdmUgYSByb2J1c3RcbnRoaXJkLXBhcnR5IGV4dGVuc2lvbiBjb21tdW5pdHkuXG5Ib3dldmVyLCB3ZSBjYW5ub3Qgdm91Y2ggZm9yIGV2ZXJ5IGV4dGVuc2lvbixcbmFuZCBzb21lIG1heSBpbnRyb2R1Y2Ugc2VjdXJpdHkgcmlza3MuXG5EbyB5b3Ugd2FudCB0byBjb250aW51ZT9gKSxcbiAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICBEaWFsb2cuY2FuY2VsQnV0dG9uKHsgbGFiZWw6IHRyYW5zLl9fKCdEaXNhYmxlJykgfSksXG4gICAgICAgICAgICAgICAgRGlhbG9nLndhcm5CdXR0b24oeyBsYWJlbDogdHJhbnMuX18oJ0VuYWJsZScpIH0pXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuYnV0dG9uLmFjY2VwdDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFByaXZhdGUuc2hvd1dhcm5pbmcgPSBzaG93V2FybmluZztcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==