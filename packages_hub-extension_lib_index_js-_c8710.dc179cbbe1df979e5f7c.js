(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_hub-extension_lib_index_js-_c8710"],{

/***/ "../../packages/hub-extension/lib/index.js":
/*!*************************************************!*\
  !*** ../../packages/hub-extension/lib/index.js ***!
  \*************************************************/
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
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module hub-extension
 */




/**
 * The command IDs used by the plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.controlPanel = 'hub:control-panel';
    CommandIDs.logout = 'hub:logout';
    CommandIDs.restart = 'hub:restart';
})(CommandIDs || (CommandIDs = {}));
/**
 * Activate the jupyterhub extension.
 */
function activateHubExtension(app, paths, translator, palette) {
    const trans = translator.load('jupyterlab');
    const hubHost = paths.urls.hubHost || '';
    const hubPrefix = paths.urls.hubPrefix || '';
    const hubUser = paths.urls.hubUser || '';
    const hubServerName = paths.urls.hubServerName || '';
    const baseUrl = paths.urls.base;
    // Bail if not running on JupyterHub.
    if (!hubPrefix) {
        return;
    }
    console.debug('hub-extension: Found configuration ', {
        hubHost: hubHost,
        hubPrefix: hubPrefix
    });
    // If hubServerName is set, use JupyterHub 1.0 URL.
    const restartUrl = hubServerName
        ? hubHost + _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.join(hubPrefix, 'spawn', hubUser, hubServerName)
        : hubHost + _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.join(hubPrefix, 'spawn');
    const { commands } = app;
    commands.addCommand(CommandIDs.restart, {
        label: trans.__('Restart Server'),
        caption: trans.__('Request that the Hub restart this server'),
        execute: () => {
            window.open(restartUrl, '_blank');
        }
    });
    commands.addCommand(CommandIDs.controlPanel, {
        label: trans.__('Hub Control Panel'),
        caption: trans.__('Open the Hub control panel in a new browser tab'),
        execute: () => {
            window.open(hubHost + _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.join(hubPrefix, 'home'), '_blank');
        }
    });
    commands.addCommand(CommandIDs.logout, {
        label: trans.__('Log Out'),
        caption: trans.__('Log out of the Hub'),
        execute: () => {
            window.location.href = hubHost + _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.join(baseUrl, 'logout');
        }
    });
    // Add palette items.
    if (palette) {
        const category = trans.__('Hub');
        palette.addItem({ category, command: CommandIDs.controlPanel });
        palette.addItem({ category, command: CommandIDs.logout });
    }
}
/**
 * Initialization data for the hub-extension.
 */
const hubExtension = {
    activate: activateHubExtension,
    id: 'jupyter.extensions.hub-extension',
    requires: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterFrontEnd.IPaths, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette],
    autoStart: true
};
/**
 * Plugin to load menu description based on settings file
 */
const hubExtensionMenu = {
    activate: () => void 0,
    id: 'jupyter.extensions.hub-extension:plugin',
    autoStart: true
};
/**
 * The default JupyterLab connection lost provider. This may be overridden
 * to provide custom behavior when a connection to the server is lost.
 *
 * If the application is being deployed within a JupyterHub context,
 * this will provide a dialog that prompts the user to restart the server.
 * Otherwise, it shows an error dialog.
 */
const connectionlost = {
    id: '@jupyterlab/apputils-extension:connectionlost',
    requires: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterFrontEnd.IPaths, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.ITranslator],
    activate: (app, paths, translator) => {
        const trans = translator.load('jupyterlab');
        const hubPrefix = paths.urls.hubPrefix || '';
        const baseUrl = paths.urls.base;
        // Return the default error message if not running on JupyterHub.
        if (!hubPrefix) {
            return _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ConnectionLost;
        }
        // If we are running on JupyterHub, return a dialog
        // that prompts the user to restart their server.
        let showingError = false;
        const onConnectionLost = async (manager, err) => {
            if (showingError) {
                return;
            }
            showingError = true;
            const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                title: trans.__('Server unavailable or unreachable'),
                body: trans.__('Your server at %1 is not running.\nWould you like to restart it?', baseUrl),
                buttons: [
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: trans.__('Restart') }),
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton({ label: trans.__('Dismiss') })
                ]
            });
            showingError = false;
            if (result.button.accept) {
                await app.commands.execute(CommandIDs.restart);
            }
        };
        return onConnectionLost;
    },
    autoStart: true,
    provides: _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.IConnectionLost
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
    hubExtension,
    hubExtensionMenu,
    connectionlost
]);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvaHViLWV4dGVuc2lvbi9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDMkY7QUFDaEI7QUFDNUI7QUFDTztBQUN0RDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esb0JBQW9CLDhEQUFXO0FBQy9CLG9CQUFvQiw4REFBVztBQUMvQixXQUFXLFdBQVc7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDhEQUFXO0FBQzdDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLDhEQUFXO0FBQ3hEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qiw2Q0FBNkM7QUFDdEUseUJBQXlCLHVDQUF1QztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSwyRUFBc0IsRUFBRSxnRUFBVztBQUNsRCxlQUFlLGlFQUFlO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDJFQUFzQixFQUFFLGdFQUFXO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtRUFBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsZ0VBQVU7QUFDM0M7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlFQUFlLEVBQUUsNkJBQTZCO0FBQ2xFLG9CQUFvQixxRUFBbUIsRUFBRSw2QkFBNkI7QUFDdEU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsY0FBYyxvRUFBZTtBQUM3QjtBQUNBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFDO0FBQ0YsaUMiLCJmaWxlIjoicGFja2FnZXNfaHViLWV4dGVuc2lvbl9saWJfaW5kZXhfanMtX2M4NzEwLmRjMTc5Y2JiZTFkZjk3OWU1ZjdjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBodWItZXh0ZW5zaW9uXG4gKi9cbmltcG9ydCB7IENvbm5lY3Rpb25Mb3N0LCBJQ29ubmVjdGlvbkxvc3QsIEp1cHl0ZXJGcm9udEVuZCB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uJztcbmltcG9ydCB7IERpYWxvZywgSUNvbW1hbmRQYWxldHRlLCBzaG93RGlhbG9nIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgVVJMRXh0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IElUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuLyoqXG4gKiBUaGUgY29tbWFuZCBJRHMgdXNlZCBieSB0aGUgcGx1Z2luLlxuICovXG5leHBvcnQgdmFyIENvbW1hbmRJRHM7XG4oZnVuY3Rpb24gKENvbW1hbmRJRHMpIHtcbiAgICBDb21tYW5kSURzLmNvbnRyb2xQYW5lbCA9ICdodWI6Y29udHJvbC1wYW5lbCc7XG4gICAgQ29tbWFuZElEcy5sb2dvdXQgPSAnaHViOmxvZ291dCc7XG4gICAgQ29tbWFuZElEcy5yZXN0YXJ0ID0gJ2h1YjpyZXN0YXJ0Jztcbn0pKENvbW1hbmRJRHMgfHwgKENvbW1hbmRJRHMgPSB7fSkpO1xuLyoqXG4gKiBBY3RpdmF0ZSB0aGUganVweXRlcmh1YiBleHRlbnNpb24uXG4gKi9cbmZ1bmN0aW9uIGFjdGl2YXRlSHViRXh0ZW5zaW9uKGFwcCwgcGF0aHMsIHRyYW5zbGF0b3IsIHBhbGV0dGUpIHtcbiAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgIGNvbnN0IGh1Ykhvc3QgPSBwYXRocy51cmxzLmh1Ykhvc3QgfHwgJyc7XG4gICAgY29uc3QgaHViUHJlZml4ID0gcGF0aHMudXJscy5odWJQcmVmaXggfHwgJyc7XG4gICAgY29uc3QgaHViVXNlciA9IHBhdGhzLnVybHMuaHViVXNlciB8fCAnJztcbiAgICBjb25zdCBodWJTZXJ2ZXJOYW1lID0gcGF0aHMudXJscy5odWJTZXJ2ZXJOYW1lIHx8ICcnO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwYXRocy51cmxzLmJhc2U7XG4gICAgLy8gQmFpbCBpZiBub3QgcnVubmluZyBvbiBKdXB5dGVySHViLlxuICAgIGlmICghaHViUHJlZml4KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc29sZS5kZWJ1ZygnaHViLWV4dGVuc2lvbjogRm91bmQgY29uZmlndXJhdGlvbiAnLCB7XG4gICAgICAgIGh1Ykhvc3Q6IGh1Ykhvc3QsXG4gICAgICAgIGh1YlByZWZpeDogaHViUHJlZml4XG4gICAgfSk7XG4gICAgLy8gSWYgaHViU2VydmVyTmFtZSBpcyBzZXQsIHVzZSBKdXB5dGVySHViIDEuMCBVUkwuXG4gICAgY29uc3QgcmVzdGFydFVybCA9IGh1YlNlcnZlck5hbWVcbiAgICAgICAgPyBodWJIb3N0ICsgVVJMRXh0LmpvaW4oaHViUHJlZml4LCAnc3Bhd24nLCBodWJVc2VyLCBodWJTZXJ2ZXJOYW1lKVxuICAgICAgICA6IGh1Ykhvc3QgKyBVUkxFeHQuam9pbihodWJQcmVmaXgsICdzcGF3bicpO1xuICAgIGNvbnN0IHsgY29tbWFuZHMgfSA9IGFwcDtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMucmVzdGFydCwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1Jlc3RhcnQgU2VydmVyJyksXG4gICAgICAgIGNhcHRpb246IHRyYW5zLl9fKCdSZXF1ZXN0IHRoYXQgdGhlIEh1YiByZXN0YXJ0IHRoaXMgc2VydmVyJyksXG4gICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKHJlc3RhcnRVcmwsICdfYmxhbmsnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jb250cm9sUGFuZWwsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdIdWIgQ29udHJvbCBQYW5lbCcpLFxuICAgICAgICBjYXB0aW9uOiB0cmFucy5fXygnT3BlbiB0aGUgSHViIGNvbnRyb2wgcGFuZWwgaW4gYSBuZXcgYnJvd3NlciB0YWInKSxcbiAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgd2luZG93Lm9wZW4oaHViSG9zdCArIFVSTEV4dC5qb2luKGh1YlByZWZpeCwgJ2hvbWUnKSwgJ19ibGFuaycpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmxvZ291dCwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0xvZyBPdXQnKSxcbiAgICAgICAgY2FwdGlvbjogdHJhbnMuX18oJ0xvZyBvdXQgb2YgdGhlIEh1YicpLFxuICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGh1Ykhvc3QgKyBVUkxFeHQuam9pbihiYXNlVXJsLCAnbG9nb3V0Jyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBBZGQgcGFsZXR0ZSBpdGVtcy5cbiAgICBpZiAocGFsZXR0ZSkge1xuICAgICAgICBjb25zdCBjYXRlZ29yeSA9IHRyYW5zLl9fKCdIdWInKTtcbiAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHsgY2F0ZWdvcnksIGNvbW1hbmQ6IENvbW1hbmRJRHMuY29udHJvbFBhbmVsIH0pO1xuICAgICAgICBwYWxldHRlLmFkZEl0ZW0oeyBjYXRlZ29yeSwgY29tbWFuZDogQ29tbWFuZElEcy5sb2dvdXQgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBJbml0aWFsaXphdGlvbiBkYXRhIGZvciB0aGUgaHViLWV4dGVuc2lvbi5cbiAqL1xuY29uc3QgaHViRXh0ZW5zaW9uID0ge1xuICAgIGFjdGl2YXRlOiBhY3RpdmF0ZUh1YkV4dGVuc2lvbixcbiAgICBpZDogJ2p1cHl0ZXIuZXh0ZW5zaW9ucy5odWItZXh0ZW5zaW9uJyxcbiAgICByZXF1aXJlczogW0p1cHl0ZXJGcm9udEVuZC5JUGF0aHMsIElUcmFuc2xhdG9yXSxcbiAgICBvcHRpb25hbDogW0lDb21tYW5kUGFsZXR0ZV0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlXG59O1xuLyoqXG4gKiBQbHVnaW4gdG8gbG9hZCBtZW51IGRlc2NyaXB0aW9uIGJhc2VkIG9uIHNldHRpbmdzIGZpbGVcbiAqL1xuY29uc3QgaHViRXh0ZW5zaW9uTWVudSA9IHtcbiAgICBhY3RpdmF0ZTogKCkgPT4gdm9pZCAwLFxuICAgIGlkOiAnanVweXRlci5leHRlbnNpb25zLmh1Yi1leHRlbnNpb246cGx1Z2luJyxcbiAgICBhdXRvU3RhcnQ6IHRydWVcbn07XG4vKipcbiAqIFRoZSBkZWZhdWx0IEp1cHl0ZXJMYWIgY29ubmVjdGlvbiBsb3N0IHByb3ZpZGVyLiBUaGlzIG1heSBiZSBvdmVycmlkZGVuXG4gKiB0byBwcm92aWRlIGN1c3RvbSBiZWhhdmlvciB3aGVuIGEgY29ubmVjdGlvbiB0byB0aGUgc2VydmVyIGlzIGxvc3QuXG4gKlxuICogSWYgdGhlIGFwcGxpY2F0aW9uIGlzIGJlaW5nIGRlcGxveWVkIHdpdGhpbiBhIEp1cHl0ZXJIdWIgY29udGV4dCxcbiAqIHRoaXMgd2lsbCBwcm92aWRlIGEgZGlhbG9nIHRoYXQgcHJvbXB0cyB0aGUgdXNlciB0byByZXN0YXJ0IHRoZSBzZXJ2ZXIuXG4gKiBPdGhlcndpc2UsIGl0IHNob3dzIGFuIGVycm9yIGRpYWxvZy5cbiAqL1xuY29uc3QgY29ubmVjdGlvbmxvc3QgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9hcHB1dGlscy1leHRlbnNpb246Y29ubmVjdGlvbmxvc3QnLFxuICAgIHJlcXVpcmVzOiBbSnVweXRlckZyb250RW5kLklQYXRocywgSVRyYW5zbGF0b3JdLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBwYXRocywgdHJhbnNsYXRvcikgPT4ge1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCBodWJQcmVmaXggPSBwYXRocy51cmxzLmh1YlByZWZpeCB8fCAnJztcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHBhdGhzLnVybHMuYmFzZTtcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBkZWZhdWx0IGVycm9yIG1lc3NhZ2UgaWYgbm90IHJ1bm5pbmcgb24gSnVweXRlckh1Yi5cbiAgICAgICAgaWYgKCFodWJQcmVmaXgpIHtcbiAgICAgICAgICAgIHJldHVybiBDb25uZWN0aW9uTG9zdDtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB3ZSBhcmUgcnVubmluZyBvbiBKdXB5dGVySHViLCByZXR1cm4gYSBkaWFsb2dcbiAgICAgICAgLy8gdGhhdCBwcm9tcHRzIHRoZSB1c2VyIHRvIHJlc3RhcnQgdGhlaXIgc2VydmVyLlxuICAgICAgICBsZXQgc2hvd2luZ0Vycm9yID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IG9uQ29ubmVjdGlvbkxvc3QgPSBhc3luYyAobWFuYWdlciwgZXJyKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2hvd2luZ0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hvd2luZ0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHNob3dEaWFsb2coe1xuICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFucy5fXygnU2VydmVyIHVuYXZhaWxhYmxlIG9yIHVucmVhY2hhYmxlJyksXG4gICAgICAgICAgICAgICAgYm9keTogdHJhbnMuX18oJ1lvdXIgc2VydmVyIGF0ICUxIGlzIG5vdCBydW5uaW5nLlxcbldvdWxkIHlvdSBsaWtlIHRvIHJlc3RhcnQgaXQ/JywgYmFzZVVybCksXG4gICAgICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgICAgICBEaWFsb2cub2tCdXR0b24oeyBsYWJlbDogdHJhbnMuX18oJ1Jlc3RhcnQnKSB9KSxcbiAgICAgICAgICAgICAgICAgICAgRGlhbG9nLmNhbmNlbEJ1dHRvbih7IGxhYmVsOiB0cmFucy5fXygnRGlzbWlzcycpIH0pXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzaG93aW5nRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuYnV0dG9uLmFjY2VwdCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGFwcC5jb21tYW5kcy5leGVjdXRlKENvbW1hbmRJRHMucmVzdGFydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBvbkNvbm5lY3Rpb25Mb3N0O1xuICAgIH0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHByb3ZpZGVzOiBJQ29ubmVjdGlvbkxvc3Rcbn07XG5leHBvcnQgZGVmYXVsdCBbXG4gICAgaHViRXh0ZW5zaW9uLFxuICAgIGh1YkV4dGVuc2lvbk1lbnUsXG4gICAgY29ubmVjdGlvbmxvc3Rcbl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9