(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_documentsearch-extension_lib_index_js-_eb391"],{

/***/ "../../packages/documentsearch-extension/lib/index.js":
/*!************************************************************!*\
  !*** ../../packages/documentsearch-extension/lib/index.js ***!
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
/* harmony import */ var _jupyterlab_documentsearch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/documentsearch */ "webpack/sharing/consume/default/@jupyterlab/documentsearch/@jupyterlab/documentsearch");
/* harmony import */ var _jupyterlab_documentsearch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_documentsearch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module documentsearch-extension
 */





const SEARCHABLE_CLASS = 'jp-mod-searchable';
const labShellWidgetListener = {
    id: '@jupyterlab/documentsearch:labShellWidgetListener',
    requires: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell, _jupyterlab_documentsearch__WEBPACK_IMPORTED_MODULE_2__.ISearchProviderRegistry],
    autoStart: true,
    activate: (app, labShell, registry) => {
        // If a given widget is searchable, apply the searchable class.
        // If it's not searchable, remove the class.
        const transformWidgetSearchability = (widget) => {
            if (!widget) {
                return;
            }
            const providerForWidget = registry.getProviderForWidget(widget);
            if (providerForWidget) {
                widget.addClass(SEARCHABLE_CLASS);
            }
            if (!providerForWidget) {
                widget.removeClass(SEARCHABLE_CLASS);
            }
        };
        // Update searchability of the active widget when the registry
        // changes, in case a provider for the current widget was added
        // or removed
        registry.changed.connect(() => transformWidgetSearchability(labShell.activeWidget));
        // Apply the searchable class only to the active widget if it is actually
        // searchable. Remove the searchable class from a widget when it's
        // no longer active.
        labShell.activeChanged.connect((_, args) => {
            const oldWidget = args.oldValue;
            if (oldWidget) {
                oldWidget.removeClass(SEARCHABLE_CLASS);
            }
            transformWidgetSearchability(args.newValue);
        });
    }
};
/**
 * Initialization data for the document-search extension.
 */
const extension = {
    id: '@jupyterlab/documentsearch:plugin',
    provides: _jupyterlab_documentsearch__WEBPACK_IMPORTED_MODULE_2__.ISearchProviderRegistry,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette, _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__.ISettingRegistry],
    autoStart: true,
    activate: (app, translator, palette, settingRegistry) => {
        const trans = translator.load('jupyterlab');
        let searchDebounceTime = 500;
        // Create registry, retrieve all default providers
        const registry = new _jupyterlab_documentsearch__WEBPACK_IMPORTED_MODULE_2__.SearchProviderRegistry();
        // Register default implementations of the Notebook and CodeMirror search providers
        registry.register('jp-notebookSearchProvider', _jupyterlab_documentsearch__WEBPACK_IMPORTED_MODULE_2__.NotebookSearchProvider);
        registry.register('jp-codeMirrorSearchProvider', _jupyterlab_documentsearch__WEBPACK_IMPORTED_MODULE_2__.CodeMirrorSearchProvider);
        const activeSearches = new Map();
        const startCommand = 'documentsearch:start';
        const startReplaceCommand = 'documentsearch:startWithReplace';
        const nextCommand = 'documentsearch:highlightNext';
        const prevCommand = 'documentsearch:highlightPrevious';
        if (settingRegistry) {
            const loadSettings = settingRegistry.load('@jupyterlab/documentsearch-extension:plugin');
            const updateSettings = (settings) => {
                searchDebounceTime = settings.get('searchDebounceTime')
                    .composite;
            };
            Promise.all([loadSettings, app.restored])
                .then(([settings]) => {
                updateSettings(settings);
                settings.changed.connect(settings => {
                    updateSettings(settings);
                });
            })
                .catch((reason) => {
                console.error(reason.message);
            });
        }
        const currentWidgetHasSearchProvider = () => {
            const currentWidget = app.shell.currentWidget;
            if (!currentWidget) {
                return false;
            }
            return registry.getProviderForWidget(currentWidget) !== undefined;
        };
        const getCurrentWidgetSearchInstance = () => {
            const currentWidget = app.shell.currentWidget;
            if (!currentWidget) {
                return;
            }
            const widgetId = currentWidget.id;
            let searchInstance = activeSearches.get(widgetId);
            if (!searchInstance) {
                const searchProvider = registry.getProviderForWidget(currentWidget);
                if (!searchProvider) {
                    return;
                }
                searchInstance = new _jupyterlab_documentsearch__WEBPACK_IMPORTED_MODULE_2__.SearchInstance(currentWidget, searchProvider, translator, searchDebounceTime);
                activeSearches.set(widgetId, searchInstance);
                // find next and previous are now enabled
                app.commands.notifyCommandChanged();
                searchInstance.disposed.connect(() => {
                    activeSearches.delete(widgetId);
                    // find next and previous are now not enabled
                    app.commands.notifyCommandChanged();
                });
            }
            return searchInstance;
        };
        app.commands.addCommand(startCommand, {
            label: trans.__('Find…'),
            isEnabled: currentWidgetHasSearchProvider,
            execute: args => {
                const searchInstance = getCurrentWidgetSearchInstance();
                if (searchInstance) {
                    const searchText = args['searchText'];
                    if (searchText) {
                        searchInstance.setSearchText(searchText);
                    }
                    searchInstance.focusInput();
                }
            }
        });
        app.commands.addCommand(startReplaceCommand, {
            label: trans.__('Find and Replace…'),
            isEnabled: currentWidgetHasSearchProvider,
            execute: args => {
                const searchInstance = getCurrentWidgetSearchInstance();
                if (searchInstance) {
                    const searchText = args['searchText'];
                    if (searchText) {
                        searchInstance.setSearchText(searchText);
                    }
                    const replaceText = args['replaceText'];
                    if (replaceText) {
                        searchInstance.setReplaceText(replaceText);
                    }
                    searchInstance.showReplace();
                    searchInstance.focusInput();
                }
            }
        });
        app.commands.addCommand(nextCommand, {
            label: trans.__('Find Next'),
            isEnabled: () => {
                const currentWidget = app.shell.currentWidget;
                if (!currentWidget) {
                    return false;
                }
                return activeSearches.has(currentWidget.id);
            },
            execute: async () => {
                const currentWidget = app.shell.currentWidget;
                if (!currentWidget) {
                    return;
                }
                const instance = activeSearches.get(currentWidget.id);
                if (!instance) {
                    return;
                }
                await instance.provider.highlightNext();
                instance.updateIndices();
            }
        });
        app.commands.addCommand(prevCommand, {
            label: trans.__('Find Previous'),
            isEnabled: () => {
                const currentWidget = app.shell.currentWidget;
                if (!currentWidget) {
                    return false;
                }
                return activeSearches.has(currentWidget.id);
            },
            execute: async () => {
                const currentWidget = app.shell.currentWidget;
                if (!currentWidget) {
                    return;
                }
                const instance = activeSearches.get(currentWidget.id);
                if (!instance) {
                    return;
                }
                await instance.provider.highlightPrevious();
                instance.updateIndices();
            }
        });
        // Add the command to the palette.
        if (palette) {
            palette.addItem({
                command: startCommand,
                category: trans.__('Main Area')
            });
            palette.addItem({
                command: nextCommand,
                category: trans.__('Main Area')
            });
            palette.addItem({
                command: prevCommand,
                category: trans.__('Main Area')
            });
        }
        // Provide the registry to the system.
        return registry;
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([extension, labShellWidgetListener]);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZG9jdW1lbnRzZWFyY2gtZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvRDtBQUNHO0FBQ3dHO0FBQ2hHO0FBQ1Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsZUFBZSw4REFBUyxFQUFFLCtFQUF1QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYywrRUFBdUI7QUFDckMsZUFBZSxnRUFBVztBQUMxQixlQUFlLGlFQUFlLEVBQUUseUVBQWdCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsOEVBQXNCO0FBQ25EO0FBQ0EsdURBQXVELDhFQUFzQjtBQUM3RSx5REFBeUQsZ0ZBQXdCO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsc0VBQWM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsbUNBQW1DLEVBQUM7QUFDbkQsaUMiLCJmaWxlIjoicGFja2FnZXNfZG9jdW1lbnRzZWFyY2gtZXh0ZW5zaW9uX2xpYl9pbmRleF9qcy1fZWIzOTEuNzY0NjM3MjI5YTA4ZGM5MjIzNjguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBkb2N1bWVudHNlYXJjaC1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgSUxhYlNoZWxsIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgSUNvbW1hbmRQYWxldHRlIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgQ29kZU1pcnJvclNlYXJjaFByb3ZpZGVyLCBJU2VhcmNoUHJvdmlkZXJSZWdpc3RyeSwgTm90ZWJvb2tTZWFyY2hQcm92aWRlciwgU2VhcmNoSW5zdGFuY2UsIFNlYXJjaFByb3ZpZGVyUmVnaXN0cnkgfSBmcm9tICdAanVweXRlcmxhYi9kb2N1bWVudHNlYXJjaCc7XG5pbXBvcnQgeyBJU2V0dGluZ1JlZ2lzdHJ5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvc2V0dGluZ3JlZ2lzdHJ5JztcbmltcG9ydCB7IElUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuY29uc3QgU0VBUkNIQUJMRV9DTEFTUyA9ICdqcC1tb2Qtc2VhcmNoYWJsZSc7XG5jb25zdCBsYWJTaGVsbFdpZGdldExpc3RlbmVyID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvZG9jdW1lbnRzZWFyY2g6bGFiU2hlbGxXaWRnZXRMaXN0ZW5lcicsXG4gICAgcmVxdWlyZXM6IFtJTGFiU2hlbGwsIElTZWFyY2hQcm92aWRlclJlZ2lzdHJ5XSxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgYWN0aXZhdGU6IChhcHAsIGxhYlNoZWxsLCByZWdpc3RyeSkgPT4ge1xuICAgICAgICAvLyBJZiBhIGdpdmVuIHdpZGdldCBpcyBzZWFyY2hhYmxlLCBhcHBseSB0aGUgc2VhcmNoYWJsZSBjbGFzcy5cbiAgICAgICAgLy8gSWYgaXQncyBub3Qgc2VhcmNoYWJsZSwgcmVtb3ZlIHRoZSBjbGFzcy5cbiAgICAgICAgY29uc3QgdHJhbnNmb3JtV2lkZ2V0U2VhcmNoYWJpbGl0eSA9ICh3aWRnZXQpID0+IHtcbiAgICAgICAgICAgIGlmICghd2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXJGb3JXaWRnZXQgPSByZWdpc3RyeS5nZXRQcm92aWRlckZvcldpZGdldCh3aWRnZXQpO1xuICAgICAgICAgICAgaWYgKHByb3ZpZGVyRm9yV2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LmFkZENsYXNzKFNFQVJDSEFCTEVfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwcm92aWRlckZvcldpZGdldCkge1xuICAgICAgICAgICAgICAgIHdpZGdldC5yZW1vdmVDbGFzcyhTRUFSQ0hBQkxFX0NMQVNTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gVXBkYXRlIHNlYXJjaGFiaWxpdHkgb2YgdGhlIGFjdGl2ZSB3aWRnZXQgd2hlbiB0aGUgcmVnaXN0cnlcbiAgICAgICAgLy8gY2hhbmdlcywgaW4gY2FzZSBhIHByb3ZpZGVyIGZvciB0aGUgY3VycmVudCB3aWRnZXQgd2FzIGFkZGVkXG4gICAgICAgIC8vIG9yIHJlbW92ZWRcbiAgICAgICAgcmVnaXN0cnkuY2hhbmdlZC5jb25uZWN0KCgpID0+IHRyYW5zZm9ybVdpZGdldFNlYXJjaGFiaWxpdHkobGFiU2hlbGwuYWN0aXZlV2lkZ2V0KSk7XG4gICAgICAgIC8vIEFwcGx5IHRoZSBzZWFyY2hhYmxlIGNsYXNzIG9ubHkgdG8gdGhlIGFjdGl2ZSB3aWRnZXQgaWYgaXQgaXMgYWN0dWFsbHlcbiAgICAgICAgLy8gc2VhcmNoYWJsZS4gUmVtb3ZlIHRoZSBzZWFyY2hhYmxlIGNsYXNzIGZyb20gYSB3aWRnZXQgd2hlbiBpdCdzXG4gICAgICAgIC8vIG5vIGxvbmdlciBhY3RpdmUuXG4gICAgICAgIGxhYlNoZWxsLmFjdGl2ZUNoYW5nZWQuY29ubmVjdCgoXywgYXJncykgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2xkV2lkZ2V0ID0gYXJncy5vbGRWYWx1ZTtcbiAgICAgICAgICAgIGlmIChvbGRXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICBvbGRXaWRnZXQucmVtb3ZlQ2xhc3MoU0VBUkNIQUJMRV9DTEFTUyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmFuc2Zvcm1XaWRnZXRTZWFyY2hhYmlsaXR5KGFyZ3MubmV3VmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuLyoqXG4gKiBJbml0aWFsaXphdGlvbiBkYXRhIGZvciB0aGUgZG9jdW1lbnQtc2VhcmNoIGV4dGVuc2lvbi5cbiAqL1xuY29uc3QgZXh0ZW5zaW9uID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvZG9jdW1lbnRzZWFyY2g6cGx1Z2luJyxcbiAgICBwcm92aWRlczogSVNlYXJjaFByb3ZpZGVyUmVnaXN0cnksXG4gICAgcmVxdWlyZXM6IFtJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtJQ29tbWFuZFBhbGV0dGUsIElTZXR0aW5nUmVnaXN0cnldLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgdHJhbnNsYXRvciwgcGFsZXR0ZSwgc2V0dGluZ1JlZ2lzdHJ5KSA9PiB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGxldCBzZWFyY2hEZWJvdW5jZVRpbWUgPSA1MDA7XG4gICAgICAgIC8vIENyZWF0ZSByZWdpc3RyeSwgcmV0cmlldmUgYWxsIGRlZmF1bHQgcHJvdmlkZXJzXG4gICAgICAgIGNvbnN0IHJlZ2lzdHJ5ID0gbmV3IFNlYXJjaFByb3ZpZGVyUmVnaXN0cnkoKTtcbiAgICAgICAgLy8gUmVnaXN0ZXIgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIE5vdGVib29rIGFuZCBDb2RlTWlycm9yIHNlYXJjaCBwcm92aWRlcnNcbiAgICAgICAgcmVnaXN0cnkucmVnaXN0ZXIoJ2pwLW5vdGVib29rU2VhcmNoUHJvdmlkZXInLCBOb3RlYm9va1NlYXJjaFByb3ZpZGVyKTtcbiAgICAgICAgcmVnaXN0cnkucmVnaXN0ZXIoJ2pwLWNvZGVNaXJyb3JTZWFyY2hQcm92aWRlcicsIENvZGVNaXJyb3JTZWFyY2hQcm92aWRlcik7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVNlYXJjaGVzID0gbmV3IE1hcCgpO1xuICAgICAgICBjb25zdCBzdGFydENvbW1hbmQgPSAnZG9jdW1lbnRzZWFyY2g6c3RhcnQnO1xuICAgICAgICBjb25zdCBzdGFydFJlcGxhY2VDb21tYW5kID0gJ2RvY3VtZW50c2VhcmNoOnN0YXJ0V2l0aFJlcGxhY2UnO1xuICAgICAgICBjb25zdCBuZXh0Q29tbWFuZCA9ICdkb2N1bWVudHNlYXJjaDpoaWdobGlnaHROZXh0JztcbiAgICAgICAgY29uc3QgcHJldkNvbW1hbmQgPSAnZG9jdW1lbnRzZWFyY2g6aGlnaGxpZ2h0UHJldmlvdXMnO1xuICAgICAgICBpZiAoc2V0dGluZ1JlZ2lzdHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBsb2FkU2V0dGluZ3MgPSBzZXR0aW5nUmVnaXN0cnkubG9hZCgnQGp1cHl0ZXJsYWIvZG9jdW1lbnRzZWFyY2gtZXh0ZW5zaW9uOnBsdWdpbicpO1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlU2V0dGluZ3MgPSAoc2V0dGluZ3MpID0+IHtcbiAgICAgICAgICAgICAgICBzZWFyY2hEZWJvdW5jZVRpbWUgPSBzZXR0aW5ncy5nZXQoJ3NlYXJjaERlYm91bmNlVGltZScpXG4gICAgICAgICAgICAgICAgICAgIC5jb21wb3NpdGU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgUHJvbWlzZS5hbGwoW2xvYWRTZXR0aW5ncywgYXBwLnJlc3RvcmVkXSlcbiAgICAgICAgICAgICAgICAudGhlbigoW3NldHRpbmdzXSkgPT4ge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVNldHRpbmdzKHNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5jaGFuZ2VkLmNvbm5lY3Qoc2V0dGluZ3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVTZXR0aW5ncyhzZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihyZWFzb24ubWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjdXJyZW50V2lkZ2V0SGFzU2VhcmNoUHJvdmlkZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50V2lkZ2V0ID0gYXBwLnNoZWxsLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVnaXN0cnkuZ2V0UHJvdmlkZXJGb3JXaWRnZXQoY3VycmVudFdpZGdldCkgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZ2V0Q3VycmVudFdpZGdldFNlYXJjaEluc3RhbmNlID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFdpZGdldCA9IGFwcC5zaGVsbC5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50V2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0SWQgPSBjdXJyZW50V2lkZ2V0LmlkO1xuICAgICAgICAgICAgbGV0IHNlYXJjaEluc3RhbmNlID0gYWN0aXZlU2VhcmNoZXMuZ2V0KHdpZGdldElkKTtcbiAgICAgICAgICAgIGlmICghc2VhcmNoSW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2hQcm92aWRlciA9IHJlZ2lzdHJ5LmdldFByb3ZpZGVyRm9yV2lkZ2V0KGN1cnJlbnRXaWRnZXQpO1xuICAgICAgICAgICAgICAgIGlmICghc2VhcmNoUHJvdmlkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWFyY2hJbnN0YW5jZSA9IG5ldyBTZWFyY2hJbnN0YW5jZShjdXJyZW50V2lkZ2V0LCBzZWFyY2hQcm92aWRlciwgdHJhbnNsYXRvciwgc2VhcmNoRGVib3VuY2VUaW1lKTtcbiAgICAgICAgICAgICAgICBhY3RpdmVTZWFyY2hlcy5zZXQod2lkZ2V0SWQsIHNlYXJjaEluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAvLyBmaW5kIG5leHQgYW5kIHByZXZpb3VzIGFyZSBub3cgZW5hYmxlZFxuICAgICAgICAgICAgICAgIGFwcC5jb21tYW5kcy5ub3RpZnlDb21tYW5kQ2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIHNlYXJjaEluc3RhbmNlLmRpc3Bvc2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVTZWFyY2hlcy5kZWxldGUod2lkZ2V0SWQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBmaW5kIG5leHQgYW5kIHByZXZpb3VzIGFyZSBub3cgbm90IGVuYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgYXBwLmNvbW1hbmRzLm5vdGlmeUNvbW1hbmRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VhcmNoSW5zdGFuY2U7XG4gICAgICAgIH07XG4gICAgICAgIGFwcC5jb21tYW5kcy5hZGRDb21tYW5kKHN0YXJ0Q29tbWFuZCwge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdGaW5k4oCmJyksXG4gICAgICAgICAgICBpc0VuYWJsZWQ6IGN1cnJlbnRXaWRnZXRIYXNTZWFyY2hQcm92aWRlcixcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlYXJjaEluc3RhbmNlID0gZ2V0Q3VycmVudFdpZGdldFNlYXJjaEluc3RhbmNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlYXJjaEluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlYXJjaFRleHQgPSBhcmdzWydzZWFyY2hUZXh0J107XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWFyY2hUZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hJbnN0YW5jZS5zZXRTZWFyY2hUZXh0KHNlYXJjaFRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEluc3RhbmNlLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhcHAuY29tbWFuZHMuYWRkQ29tbWFuZChzdGFydFJlcGxhY2VDb21tYW5kLCB7XG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0ZpbmQgYW5kIFJlcGxhY2XigKYnKSxcbiAgICAgICAgICAgIGlzRW5hYmxlZDogY3VycmVudFdpZGdldEhhc1NlYXJjaFByb3ZpZGVyLFxuICAgICAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoSW5zdGFuY2UgPSBnZXRDdXJyZW50V2lkZ2V0U2VhcmNoSW5zdGFuY2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VhcmNoSW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoVGV4dCA9IGFyZ3NbJ3NlYXJjaFRleHQnXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlYXJjaFRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaEluc3RhbmNlLnNldFNlYXJjaFRleHQoc2VhcmNoVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZVRleHQgPSBhcmdzWydyZXBsYWNlVGV4dCddO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVwbGFjZVRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaEluc3RhbmNlLnNldFJlcGxhY2VUZXh0KHJlcGxhY2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hJbnN0YW5jZS5zaG93UmVwbGFjZSgpO1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hJbnN0YW5jZS5mb2N1c0lucHV0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYXBwLmNvbW1hbmRzLmFkZENvbW1hbmQobmV4dENvbW1hbmQsIHtcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnRmluZCBOZXh0JyksXG4gICAgICAgICAgICBpc0VuYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50V2lkZ2V0ID0gYXBwLnNoZWxsLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50V2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2ZVNlYXJjaGVzLmhhcyhjdXJyZW50V2lkZ2V0LmlkKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBleGVjdXRlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFdpZGdldCA9IGFwcC5zaGVsbC5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgICAgIGlmICghY3VycmVudFdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gYWN0aXZlU2VhcmNoZXMuZ2V0KGN1cnJlbnRXaWRnZXQuaWQpO1xuICAgICAgICAgICAgICAgIGlmICghaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhd2FpdCBpbnN0YW5jZS5wcm92aWRlci5oaWdobGlnaHROZXh0KCk7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UudXBkYXRlSW5kaWNlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYXBwLmNvbW1hbmRzLmFkZENvbW1hbmQocHJldkNvbW1hbmQsIHtcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnRmluZCBQcmV2aW91cycpLFxuICAgICAgICAgICAgaXNFbmFibGVkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFdpZGdldCA9IGFwcC5zaGVsbC5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgICAgIGlmICghY3VycmVudFdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhY3RpdmVTZWFyY2hlcy5oYXMoY3VycmVudFdpZGdldC5pZCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXhlY3V0ZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRXaWRnZXQgPSBhcHAuc2hlbGwuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IGFjdGl2ZVNlYXJjaGVzLmdldChjdXJyZW50V2lkZ2V0LmlkKTtcbiAgICAgICAgICAgICAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXdhaXQgaW5zdGFuY2UucHJvdmlkZXIuaGlnaGxpZ2h0UHJldmlvdXMoKTtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS51cGRhdGVJbmRpY2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBBZGQgdGhlIGNvbW1hbmQgdG8gdGhlIHBhbGV0dGUuXG4gICAgICAgIGlmIChwYWxldHRlKSB7XG4gICAgICAgICAgICBwYWxldHRlLmFkZEl0ZW0oe1xuICAgICAgICAgICAgICAgIGNvbW1hbmQ6IHN0YXJ0Q29tbWFuZCxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogdHJhbnMuX18oJ01haW4gQXJlYScpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBhbGV0dGUuYWRkSXRlbSh7XG4gICAgICAgICAgICAgICAgY29tbWFuZDogbmV4dENvbW1hbmQsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHRyYW5zLl9fKCdNYWluIEFyZWEnKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwYWxldHRlLmFkZEl0ZW0oe1xuICAgICAgICAgICAgICAgIGNvbW1hbmQ6IHByZXZDb21tYW5kLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiB0cmFucy5fXygnTWFpbiBBcmVhJylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFByb3ZpZGUgdGhlIHJlZ2lzdHJ5IHRvIHRoZSBzeXN0ZW0uXG4gICAgICAgIHJldHVybiByZWdpc3RyeTtcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgW2V4dGVuc2lvbiwgbGFiU2hlbGxXaWRnZXRMaXN0ZW5lcl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9