(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_translation-extension_lib_index_js-_57900"],{

/***/ "../../packages/translation-extension/lib/index.js":
/*!*********************************************************!*\
  !*** ../../packages/translation-extension/lib/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommandIDs": () => (/* binding */ CommandIDs),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/mainmenu */ "webpack/sharing/consume/default/@jupyterlab/mainmenu/@jupyterlab/mainmenu");
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__);
/* ----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module translation-extension
 */





/**
 * A namespace for command IDs.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.installAdditionalLanguages = 'jupyterlab-translation:install-additional-languages';
})(CommandIDs || (CommandIDs = {}));
/**
 * Translation plugins
 */
const PLUGIN_ID = '@jupyterlab/translation-extension:plugin';
const translator = {
    id: '@jupyterlab/translation:translator',
    autoStart: true,
    requires: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterFrontEnd.IPaths, _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__.ISettingRegistry],
    provides: _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.ITranslator,
    activate: async (app, paths, settings) => {
        const setting = await settings.load(PLUGIN_ID);
        const currentLocale = setting.get('locale').composite;
        let stringsPrefix = setting.get('stringsPrefix')
            .composite;
        const displayStringsPrefix = setting.get('displayStringsPrefix')
            .composite;
        stringsPrefix = displayStringsPrefix ? stringsPrefix : '';
        const serverSettings = app.serviceManager.serverSettings;
        const translationManager = new _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.TranslationManager(paths.urls.translations, stringsPrefix, serverSettings);
        await translationManager.fetch(currentLocale);
        return translationManager;
    }
};
/**
 * Initialization data for the extension.
 */
const langMenu = {
    id: PLUGIN_ID,
    requires: [_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_2__.IMainMenu, _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__.ISettingRegistry, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.ITranslator],
    autoStart: true,
    activate: (app, mainMenu, settings, translator) => {
        const trans = translator.load('jupyterlab');
        const { commands } = app;
        let currentLocale;
        /**
         * Load the settings for this extension
         *
         * @param setting Extension settings
         */
        function loadSetting(setting) {
            // Read the settings and convert to the correct type
            currentLocale = setting.get('locale').composite;
        }
        settings
            .load(PLUGIN_ID)
            .then(setting => {
            var _a;
            // Read the settings
            loadSetting(setting);
            document.documentElement.lang = currentLocale;
            // Listen for your plugin setting changes using Signal
            setting.changed.connect(loadSetting);
            // Create a languages menu
            const languagesMenu = (_a = mainMenu.settingsMenu.items.find(item => {
                var _a;
                return item.type === 'submenu' &&
                    ((_a = item.submenu) === null || _a === void 0 ? void 0 : _a.id) === 'jp-mainmenu-settings-language';
            })) === null || _a === void 0 ? void 0 : _a.submenu;
            let command;
            const serverSettings = app.serviceManager.serverSettings;
            // Get list of available locales
            (0,_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.requestTranslationsAPI)('', '', {}, serverSettings)
                .then(data => {
                for (const locale in data['data']) {
                    const value = data['data'][locale];
                    const displayName = value.displayName;
                    const nativeName = value.nativeName;
                    const toggled = displayName === nativeName;
                    const label = toggled
                        ? `${displayName}`
                        : `${displayName} - ${nativeName}`;
                    // Add a command per language
                    command = `jupyterlab-translation:${locale}`;
                    commands.addCommand(command, {
                        label: label,
                        caption: label,
                        isEnabled: () => !toggled,
                        isVisible: () => true,
                        isToggled: () => toggled,
                        execute: () => {
                            return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                                title: trans.__('Change interface language?'),
                                body: trans.__('After changing the interface language to %1, you will need to reload JupyterLab to see the changes.', label),
                                buttons: [
                                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton({ label: trans.__('Cancel') }),
                                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: trans.__('Change and reload') })
                                ]
                            }).then(result => {
                                if (result.button.accept) {
                                    setting
                                        .set('locale', locale)
                                        .then(() => {
                                        window.location.reload();
                                    })
                                        .catch(reason => {
                                        console.error(reason);
                                    });
                                }
                            });
                        }
                    });
                    // Add the language command to the menu
                    if (languagesMenu) {
                        languagesMenu.addItem({
                            command,
                            args: {}
                        });
                    }
                }
            })
                .catch(reason => {
                console.error(`Available locales errored!\n${reason}`);
            });
        })
            .catch(reason => {
            console.error(`The jupyterlab translation extension appears to be missing.\n${reason}`);
        });
    }
};
/**
 * Export the plugins as default.
 */
const plugins = [translator, langMenu];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdHJhbnNsYXRpb24tZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzBEO0FBQ0E7QUFDVDtBQUNjO0FBQ21DO0FBQ2xHO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSwyRUFBc0IsRUFBRSx5RUFBZ0I7QUFDdkQsY0FBYyxnRUFBVztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsdUVBQWtCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMkRBQVMsRUFBRSx5RUFBZ0IsRUFBRSxnRUFBVztBQUN2RDtBQUNBO0FBQ0E7QUFDQSxlQUFlLFdBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFlBQVksK0VBQXNCLFdBQVc7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsWUFBWTtBQUN6Qyw2QkFBNkIsWUFBWSxLQUFLLFdBQVc7QUFDekQ7QUFDQSx3REFBd0QsT0FBTztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxnRUFBVTtBQUM3QztBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MscUVBQW1CLEVBQUUsNEJBQTRCO0FBQ3JGLG9DQUFvQyxpRUFBZSxFQUFFLHVDQUF1QztBQUM1RjtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsNkRBQTZELE9BQU87QUFDcEUsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLDBGQUEwRixPQUFPO0FBQ2pHLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxPQUFPLEVBQUM7QUFDdkIsaUMiLCJmaWxlIjoicGFja2FnZXNfdHJhbnNsYXRpb24tZXh0ZW5zaW9uX2xpYl9pbmRleF9qcy1fNTc5MDAuMWFjZGViODc3ZjZjMTVlNTU1OGIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxufCBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgdHJhbnNsYXRpb24tZXh0ZW5zaW9uXG4gKi9cbmltcG9ydCB7IEp1cHl0ZXJGcm9udEVuZCB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uJztcbmltcG9ydCB7IERpYWxvZywgc2hvd0RpYWxvZyB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IElNYWluTWVudSB9IGZyb20gJ0BqdXB5dGVybGFiL21haW5tZW51JztcbmltcG9ydCB7IElTZXR0aW5nUmVnaXN0cnkgfSBmcm9tICdAanVweXRlcmxhYi9zZXR0aW5ncmVnaXN0cnknO1xuaW1wb3J0IHsgSVRyYW5zbGF0b3IsIHJlcXVlc3RUcmFuc2xhdGlvbnNBUEksIFRyYW5zbGF0aW9uTWFuYWdlciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIGNvbW1hbmQgSURzLlxuICovXG5leHBvcnQgdmFyIENvbW1hbmRJRHM7XG4oZnVuY3Rpb24gKENvbW1hbmRJRHMpIHtcbiAgICBDb21tYW5kSURzLmluc3RhbGxBZGRpdGlvbmFsTGFuZ3VhZ2VzID0gJ2p1cHl0ZXJsYWItdHJhbnNsYXRpb246aW5zdGFsbC1hZGRpdGlvbmFsLWxhbmd1YWdlcyc7XG59KShDb21tYW5kSURzIHx8IChDb21tYW5kSURzID0ge30pKTtcbi8qKlxuICogVHJhbnNsYXRpb24gcGx1Z2luc1xuICovXG5jb25zdCBQTFVHSU5fSUQgPSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24tZXh0ZW5zaW9uOnBsdWdpbic7XG5jb25zdCB0cmFuc2xhdG9yID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb246dHJhbnNsYXRvcicsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHJlcXVpcmVzOiBbSnVweXRlckZyb250RW5kLklQYXRocywgSVNldHRpbmdSZWdpc3RyeV0sXG4gICAgcHJvdmlkZXM6IElUcmFuc2xhdG9yLFxuICAgIGFjdGl2YXRlOiBhc3luYyAoYXBwLCBwYXRocywgc2V0dGluZ3MpID0+IHtcbiAgICAgICAgY29uc3Qgc2V0dGluZyA9IGF3YWl0IHNldHRpbmdzLmxvYWQoUExVR0lOX0lEKTtcbiAgICAgICAgY29uc3QgY3VycmVudExvY2FsZSA9IHNldHRpbmcuZ2V0KCdsb2NhbGUnKS5jb21wb3NpdGU7XG4gICAgICAgIGxldCBzdHJpbmdzUHJlZml4ID0gc2V0dGluZy5nZXQoJ3N0cmluZ3NQcmVmaXgnKVxuICAgICAgICAgICAgLmNvbXBvc2l0ZTtcbiAgICAgICAgY29uc3QgZGlzcGxheVN0cmluZ3NQcmVmaXggPSBzZXR0aW5nLmdldCgnZGlzcGxheVN0cmluZ3NQcmVmaXgnKVxuICAgICAgICAgICAgLmNvbXBvc2l0ZTtcbiAgICAgICAgc3RyaW5nc1ByZWZpeCA9IGRpc3BsYXlTdHJpbmdzUHJlZml4ID8gc3RyaW5nc1ByZWZpeCA6ICcnO1xuICAgICAgICBjb25zdCBzZXJ2ZXJTZXR0aW5ncyA9IGFwcC5zZXJ2aWNlTWFuYWdlci5zZXJ2ZXJTZXR0aW5ncztcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb25NYW5hZ2VyID0gbmV3IFRyYW5zbGF0aW9uTWFuYWdlcihwYXRocy51cmxzLnRyYW5zbGF0aW9ucywgc3RyaW5nc1ByZWZpeCwgc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICBhd2FpdCB0cmFuc2xhdGlvbk1hbmFnZXIuZmV0Y2goY3VycmVudExvY2FsZSk7XG4gICAgICAgIHJldHVybiB0cmFuc2xhdGlvbk1hbmFnZXI7XG4gICAgfVxufTtcbi8qKlxuICogSW5pdGlhbGl6YXRpb24gZGF0YSBmb3IgdGhlIGV4dGVuc2lvbi5cbiAqL1xuY29uc3QgbGFuZ01lbnUgPSB7XG4gICAgaWQ6IFBMVUdJTl9JRCxcbiAgICByZXF1aXJlczogW0lNYWluTWVudSwgSVNldHRpbmdSZWdpc3RyeSwgSVRyYW5zbGF0b3JdLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgbWFpbk1lbnUsIHNldHRpbmdzLCB0cmFuc2xhdG9yKSA9PiB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMgfSA9IGFwcDtcbiAgICAgICAgbGV0IGN1cnJlbnRMb2NhbGU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMb2FkIHRoZSBzZXR0aW5ncyBmb3IgdGhpcyBleHRlbnNpb25cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHNldHRpbmcgRXh0ZW5zaW9uIHNldHRpbmdzXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBsb2FkU2V0dGluZyhzZXR0aW5nKSB7XG4gICAgICAgICAgICAvLyBSZWFkIHRoZSBzZXR0aW5ncyBhbmQgY29udmVydCB0byB0aGUgY29ycmVjdCB0eXBlXG4gICAgICAgICAgICBjdXJyZW50TG9jYWxlID0gc2V0dGluZy5nZXQoJ2xvY2FsZScpLmNvbXBvc2l0ZTtcbiAgICAgICAgfVxuICAgICAgICBzZXR0aW5nc1xuICAgICAgICAgICAgLmxvYWQoUExVR0lOX0lEKVxuICAgICAgICAgICAgLnRoZW4oc2V0dGluZyA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAvLyBSZWFkIHRoZSBzZXR0aW5nc1xuICAgICAgICAgICAgbG9hZFNldHRpbmcoc2V0dGluZyk7XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyA9IGN1cnJlbnRMb2NhbGU7XG4gICAgICAgICAgICAvLyBMaXN0ZW4gZm9yIHlvdXIgcGx1Z2luIHNldHRpbmcgY2hhbmdlcyB1c2luZyBTaWduYWxcbiAgICAgICAgICAgIHNldHRpbmcuY2hhbmdlZC5jb25uZWN0KGxvYWRTZXR0aW5nKTtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIGxhbmd1YWdlcyBtZW51XG4gICAgICAgICAgICBjb25zdCBsYW5ndWFnZXNNZW51ID0gKF9hID0gbWFpbk1lbnUuc2V0dGluZ3NNZW51Lml0ZW1zLmZpbmQoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnR5cGUgPT09ICdzdWJtZW51JyAmJlxuICAgICAgICAgICAgICAgICAgICAoKF9hID0gaXRlbS5zdWJtZW51KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWQpID09PSAnanAtbWFpbm1lbnUtc2V0dGluZ3MtbGFuZ3VhZ2UnO1xuICAgICAgICAgICAgfSkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zdWJtZW51O1xuICAgICAgICAgICAgbGV0IGNvbW1hbmQ7XG4gICAgICAgICAgICBjb25zdCBzZXJ2ZXJTZXR0aW5ncyA9IGFwcC5zZXJ2aWNlTWFuYWdlci5zZXJ2ZXJTZXR0aW5ncztcbiAgICAgICAgICAgIC8vIEdldCBsaXN0IG9mIGF2YWlsYWJsZSBsb2NhbGVzXG4gICAgICAgICAgICByZXF1ZXN0VHJhbnNsYXRpb25zQVBJKCcnLCAnJywge30sIHNlcnZlclNldHRpbmdzKVxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbG9jYWxlIGluIGRhdGFbJ2RhdGEnXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGRhdGFbJ2RhdGEnXVtsb2NhbGVdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXNwbGF5TmFtZSA9IHZhbHVlLmRpc3BsYXlOYW1lO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuYXRpdmVOYW1lID0gdmFsdWUubmF0aXZlTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9nZ2xlZCA9IGRpc3BsYXlOYW1lID09PSBuYXRpdmVOYW1lO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRvZ2dsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYCR7ZGlzcGxheU5hbWV9YFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBgJHtkaXNwbGF5TmFtZX0gLSAke25hdGl2ZU5hbWV9YDtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGEgY29tbWFuZCBwZXIgbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA9IGBqdXB5dGVybGFiLXRyYW5zbGF0aW9uOiR7bG9jYWxlfWA7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoY29tbWFuZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogbGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0VuYWJsZWQ6ICgpID0+ICF0b2dnbGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNWaXNpYmxlOiAoKSA9PiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNUb2dnbGVkOiAoKSA9PiB0b2dnbGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaG93RGlhbG9nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdDaGFuZ2UgaW50ZXJmYWNlIGxhbmd1YWdlPycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiB0cmFucy5fXygnQWZ0ZXIgY2hhbmdpbmcgdGhlIGludGVyZmFjZSBsYW5ndWFnZSB0byAlMSwgeW91IHdpbGwgbmVlZCB0byByZWxvYWQgSnVweXRlckxhYiB0byBzZWUgdGhlIGNoYW5nZXMuJywgbGFiZWwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEaWFsb2cuY2FuY2VsQnV0dG9uKHsgbGFiZWw6IHRyYW5zLl9fKCdDYW5jZWwnKSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZy5va0J1dHRvbih7IGxhYmVsOiB0cmFucy5fXygnQ2hhbmdlIGFuZCByZWxvYWQnKSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmJ1dHRvbi5hY2NlcHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0KCdsb2NhbGUnLCBsb2NhbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKHJlYXNvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihyZWFzb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgbGFuZ3VhZ2UgY29tbWFuZCB0byB0aGUgbWVudVxuICAgICAgICAgICAgICAgICAgICBpZiAobGFuZ3VhZ2VzTWVudSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VzTWVudS5hZGRJdGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKHJlYXNvbiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgQXZhaWxhYmxlIGxvY2FsZXMgZXJyb3JlZCFcXG4ke3JlYXNvbn1gKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHJlYXNvbiA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBUaGUganVweXRlcmxhYiB0cmFuc2xhdGlvbiBleHRlbnNpb24gYXBwZWFycyB0byBiZSBtaXNzaW5nLlxcbiR7cmVhc29ufWApO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuLyoqXG4gKiBFeHBvcnQgdGhlIHBsdWdpbnMgYXMgZGVmYXVsdC5cbiAqL1xuY29uc3QgcGx1Z2lucyA9IFt0cmFuc2xhdG9yLCBsYW5nTWVudV07XG5leHBvcnQgZGVmYXVsdCBwbHVnaW5zO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==