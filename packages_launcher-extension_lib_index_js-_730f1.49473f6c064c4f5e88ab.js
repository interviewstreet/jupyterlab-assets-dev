(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_launcher-extension_lib_index_js-_730f1"],{

/***/ "../../packages/launcher-extension/lib/index.js":
/*!******************************************************!*\
  !*** ../../packages/launcher-extension/lib/index.js ***!
  \******************************************************/
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
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/launcher */ "webpack/sharing/consume/default/@jupyterlab/launcher/@jupyterlab/launcher");
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_5__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module launcher-extension
 */






/**
 * The command IDs used by the launcher plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.create = 'launcher:create';
})(CommandIDs || (CommandIDs = {}));
/**
 * A service providing an interface to the the launcher.
 */
const plugin = {
    activate,
    id: '@jupyterlab/launcher-extension:plugin',
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.ITranslator],
    optional: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell, _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette],
    provides: _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2__.ILauncher,
    autoStart: true
};
/**
 * Export the plugin as default.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);
/**
 * Activate the launcher.
 */
function activate(app, translator, labShell, palette) {
    const { commands, shell } = app;
    const trans = translator.load('jupyterlab');
    const model = new _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2__.LauncherModel();
    commands.addCommand(CommandIDs.create, {
        label: trans.__('New Launcher'),
        execute: (args) => {
            const cwd = args['cwd'] ? String(args['cwd']) : '';
            const id = `launcher-${Private.id++}`;
            const callback = (item) => {
                shell.add(item, 'main', { ref: id });
            };
            const launcher = new _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2__.Launcher({
                model,
                cwd,
                callback,
                commands,
                translator
            });
            launcher.model = model;
            launcher.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__.launcherIcon;
            launcher.title.label = trans.__('Launcher');
            const main = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MainAreaWidget({ content: launcher });
            // If there are any other widgets open, remove the launcher close icon.
            main.title.closable = !!(0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_5__.toArray)(shell.widgets('main')).length;
            main.id = id;
            shell.add(main, 'main', {
                activate: args['activate'],
                ref: args['ref']
            });
            if (labShell) {
                labShell.layoutModified.connect(() => {
                    // If there is only a launcher open, remove the close icon.
                    main.title.closable = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_5__.toArray)(labShell.widgets('main')).length > 1;
                }, main);
            }
            return main;
        }
    });
    if (palette) {
        palette.addItem({
            command: CommandIDs.create,
            category: trans.__('Launcher')
        });
    }
    if (labShell) {
        labShell.addButtonEnabled = true;
        labShell.addRequested.connect((sender, arg) => {
            var _a;
            // Get the ref for the current tab of the tabbar which the add button was clicked
            const ref = ((_a = arg.currentTitle) === null || _a === void 0 ? void 0 : _a.owner.id) ||
                arg.titles[arg.titles.length - 1].owner.id;
            if (commands.hasCommand('filebrowser:create-main-launcher')) {
                // If a file browser is defined connect the launcher to it
                return commands.execute('filebrowser:create-main-launcher', { ref });
            }
            return commands.execute(CommandIDs.create, { ref });
        });
    }
    return model;
}
/**
 * The namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * The incrementing id used for launcher widgets.
     */
    Private.id = 0;
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbGF1bmNoZXItZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ29EO0FBQ21CO0FBQ0c7QUFDcEI7QUFDRztBQUNiO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZ0VBQVc7QUFDMUIsZUFBZSw4REFBUyxFQUFFLGlFQUFlO0FBQ3pDLGNBQWMsMkRBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLE1BQU0sRUFBQztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsa0JBQWtCO0FBQzdCO0FBQ0Esc0JBQXNCLCtEQUFhO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGFBQWE7QUFDaEQ7QUFDQSx5Q0FBeUMsVUFBVTtBQUNuRDtBQUNBLGlDQUFpQywwREFBUTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0Esa0NBQWtDLG1FQUFZO0FBQzlDO0FBQ0EsNkJBQTZCLGdFQUFjLEVBQUUsb0JBQW9CO0FBQ2pFO0FBQ0Esb0NBQW9DLDBEQUFPO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQywwREFBTztBQUNqRCxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkVBQTZFLE1BQU07QUFDbkY7QUFDQSx3REFBd0QsTUFBTTtBQUM5RCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0IsaUMiLCJmaWxlIjoicGFja2FnZXNfbGF1bmNoZXItZXh0ZW5zaW9uX2xpYl9pbmRleF9qcy1fNzMwZjEuNDk0NzNmNmMwNjRjNGY1ZTg4YWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBsYXVuY2hlci1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgSUxhYlNoZWxsIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgSUNvbW1hbmRQYWxldHRlLCBNYWluQXJlYVdpZGdldCB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IElMYXVuY2hlciwgTGF1bmNoZXIsIExhdW5jaGVyTW9kZWwgfSBmcm9tICdAanVweXRlcmxhYi9sYXVuY2hlcic7XG5pbXBvcnQgeyBJVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGxhdW5jaGVySWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgdG9BcnJheSB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbi8qKlxuICogVGhlIGNvbW1hbmQgSURzIHVzZWQgYnkgdGhlIGxhdW5jaGVyIHBsdWdpbi5cbiAqL1xudmFyIENvbW1hbmRJRHM7XG4oZnVuY3Rpb24gKENvbW1hbmRJRHMpIHtcbiAgICBDb21tYW5kSURzLmNyZWF0ZSA9ICdsYXVuY2hlcjpjcmVhdGUnO1xufSkoQ29tbWFuZElEcyB8fCAoQ29tbWFuZElEcyA9IHt9KSk7XG4vKipcbiAqIEEgc2VydmljZSBwcm92aWRpbmcgYW4gaW50ZXJmYWNlIHRvIHRoZSB0aGUgbGF1bmNoZXIuXG4gKi9cbmNvbnN0IHBsdWdpbiA9IHtcbiAgICBhY3RpdmF0ZSxcbiAgICBpZDogJ0BqdXB5dGVybGFiL2xhdW5jaGVyLWV4dGVuc2lvbjpwbHVnaW4nLFxuICAgIHJlcXVpcmVzOiBbSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbSUxhYlNoZWxsLCBJQ29tbWFuZFBhbGV0dGVdLFxuICAgIHByb3ZpZGVzOiBJTGF1bmNoZXIsXG4gICAgYXV0b1N0YXJ0OiB0cnVlXG59O1xuLyoqXG4gKiBFeHBvcnQgdGhlIHBsdWdpbiBhcyBkZWZhdWx0LlxuICovXG5leHBvcnQgZGVmYXVsdCBwbHVnaW47XG4vKipcbiAqIEFjdGl2YXRlIHRoZSBsYXVuY2hlci5cbiAqL1xuZnVuY3Rpb24gYWN0aXZhdGUoYXBwLCB0cmFuc2xhdG9yLCBsYWJTaGVsbCwgcGFsZXR0ZSkge1xuICAgIGNvbnN0IHsgY29tbWFuZHMsIHNoZWxsIH0gPSBhcHA7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICBjb25zdCBtb2RlbCA9IG5ldyBMYXVuY2hlck1vZGVsKCk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmNyZWF0ZSwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ05ldyBMYXVuY2hlcicpLFxuICAgICAgICBleGVjdXRlOiAoYXJncykgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3dkID0gYXJnc1snY3dkJ10gPyBTdHJpbmcoYXJnc1snY3dkJ10pIDogJyc7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGBsYXVuY2hlci0ke1ByaXZhdGUuaWQrK31gO1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHNoZWxsLmFkZChpdGVtLCAnbWFpbicsIHsgcmVmOiBpZCB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBsYXVuY2hlciA9IG5ldyBMYXVuY2hlcih7XG4gICAgICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICAgICAgY3dkLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIGNvbW1hbmRzLFxuICAgICAgICAgICAgICAgIHRyYW5zbGF0b3JcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGF1bmNoZXIubW9kZWwgPSBtb2RlbDtcbiAgICAgICAgICAgIGxhdW5jaGVyLnRpdGxlLmljb24gPSBsYXVuY2hlckljb247XG4gICAgICAgICAgICBsYXVuY2hlci50aXRsZS5sYWJlbCA9IHRyYW5zLl9fKCdMYXVuY2hlcicpO1xuICAgICAgICAgICAgY29uc3QgbWFpbiA9IG5ldyBNYWluQXJlYVdpZGdldCh7IGNvbnRlbnQ6IGxhdW5jaGVyIH0pO1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIGFueSBvdGhlciB3aWRnZXRzIG9wZW4sIHJlbW92ZSB0aGUgbGF1bmNoZXIgY2xvc2UgaWNvbi5cbiAgICAgICAgICAgIG1haW4udGl0bGUuY2xvc2FibGUgPSAhIXRvQXJyYXkoc2hlbGwud2lkZ2V0cygnbWFpbicpKS5sZW5ndGg7XG4gICAgICAgICAgICBtYWluLmlkID0gaWQ7XG4gICAgICAgICAgICBzaGVsbC5hZGQobWFpbiwgJ21haW4nLCB7XG4gICAgICAgICAgICAgICAgYWN0aXZhdGU6IGFyZ3NbJ2FjdGl2YXRlJ10sXG4gICAgICAgICAgICAgICAgcmVmOiBhcmdzWydyZWYnXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobGFiU2hlbGwpIHtcbiAgICAgICAgICAgICAgICBsYWJTaGVsbC5sYXlvdXRNb2RpZmllZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgb25seSBhIGxhdW5jaGVyIG9wZW4sIHJlbW92ZSB0aGUgY2xvc2UgaWNvbi5cbiAgICAgICAgICAgICAgICAgICAgbWFpbi50aXRsZS5jbG9zYWJsZSA9IHRvQXJyYXkobGFiU2hlbGwud2lkZ2V0cygnbWFpbicpKS5sZW5ndGggPiAxO1xuICAgICAgICAgICAgICAgIH0sIG1haW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1haW47XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAocGFsZXR0ZSkge1xuICAgICAgICBwYWxldHRlLmFkZEl0ZW0oe1xuICAgICAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy5jcmVhdGUsXG4gICAgICAgICAgICBjYXRlZ29yeTogdHJhbnMuX18oJ0xhdW5jaGVyJylcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChsYWJTaGVsbCkge1xuICAgICAgICBsYWJTaGVsbC5hZGRCdXR0b25FbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgbGFiU2hlbGwuYWRkUmVxdWVzdGVkLmNvbm5lY3QoKHNlbmRlciwgYXJnKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIHJlZiBmb3IgdGhlIGN1cnJlbnQgdGFiIG9mIHRoZSB0YWJiYXIgd2hpY2ggdGhlIGFkZCBidXR0b24gd2FzIGNsaWNrZWRcbiAgICAgICAgICAgIGNvbnN0IHJlZiA9ICgoX2EgPSBhcmcuY3VycmVudFRpdGxlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub3duZXIuaWQpIHx8XG4gICAgICAgICAgICAgICAgYXJnLnRpdGxlc1thcmcudGl0bGVzLmxlbmd0aCAtIDFdLm93bmVyLmlkO1xuICAgICAgICAgICAgaWYgKGNvbW1hbmRzLmhhc0NvbW1hbmQoJ2ZpbGVicm93c2VyOmNyZWF0ZS1tYWluLWxhdW5jaGVyJykpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBhIGZpbGUgYnJvd3NlciBpcyBkZWZpbmVkIGNvbm5lY3QgdGhlIGxhdW5jaGVyIHRvIGl0XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmRzLmV4ZWN1dGUoJ2ZpbGVicm93c2VyOmNyZWF0ZS1tYWluLWxhdW5jaGVyJywgeyByZWYgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29tbWFuZHMuZXhlY3V0ZShDb21tYW5kSURzLmNyZWF0ZSwgeyByZWYgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbW9kZWw7XG59XG4vKipcbiAqIFRoZSBuYW1lc3BhY2UgZm9yIG1vZHVsZSBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGluY3JlbWVudGluZyBpZCB1c2VkIGZvciBsYXVuY2hlciB3aWRnZXRzLlxuICAgICAqL1xuICAgIFByaXZhdGUuaWQgPSAwO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9