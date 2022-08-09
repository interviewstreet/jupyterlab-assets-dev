(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_imageviewer-extension_lib_index_js-_c86f1"],{

/***/ "../../packages/imageviewer-extension/lib/index.js":
/*!*********************************************************!*\
  !*** ../../packages/imageviewer-extension/lib/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "addCommands": () => (/* binding */ addCommands)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_imageviewer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/imageviewer */ "webpack/sharing/consume/default/@jupyterlab/imageviewer/@jupyterlab/imageviewer");
/* harmony import */ var _jupyterlab_imageviewer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_imageviewer__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module imageviewer-extension
 */




/**
 * The command IDs used by the image widget plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.resetImage = 'imageviewer:reset-image';
    CommandIDs.zoomIn = 'imageviewer:zoom-in';
    CommandIDs.zoomOut = 'imageviewer:zoom-out';
    CommandIDs.flipHorizontal = 'imageviewer:flip-horizontal';
    CommandIDs.flipVertical = 'imageviewer:flip-vertical';
    CommandIDs.rotateClockwise = 'imageviewer:rotate-clockwise';
    CommandIDs.rotateCounterclockwise = 'imageviewer:rotate-counterclockwise';
    CommandIDs.invertColors = 'imageviewer:invert-colors';
})(CommandIDs || (CommandIDs = {}));
/**
 * The list of file types for images.
 */
const FILE_TYPES = ['png', 'gif', 'jpeg', 'bmp', 'ico', 'tiff'];
/**
 * The name of the factory that creates image widgets.
 */
const FACTORY = 'Image';
/**
 * The name of the factory that creates image widgets.
 */
const TEXT_FACTORY = 'Image (Text)';
/**
 * The list of file types for images with optional text modes.
 */
const TEXT_FILE_TYPES = ['svg', 'xbm'];
/**
 * The test pattern for text file types in paths.
 */
const TEXT_FILE_REGEX = new RegExp(`[.](${TEXT_FILE_TYPES.join('|')})$`);
/**
 * The image file handler extension.
 */
const plugin = {
    activate,
    id: '@jupyterlab/imageviewer-extension:plugin',
    provides: _jupyterlab_imageviewer__WEBPACK_IMPORTED_MODULE_2__.IImageTracker,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer],
    autoStart: true
};
/**
 * Export the plugin as default.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);
/**
 * Activate the image widget extension.
 */
function activate(app, translator, palette, restorer) {
    const trans = translator.load('jupyterlab');
    const namespace = 'image-widget';
    function onWidgetCreated(sender, widget) {
        var _a, _b;
        // Notify the widget tracker if restore data needs to update.
        widget.context.pathChanged.connect(() => {
            void tracker.save(widget);
        });
        void tracker.add(widget);
        const types = app.docRegistry.getFileTypesForPath(widget.context.path);
        if (types.length > 0) {
            widget.title.icon = types[0].icon;
            widget.title.iconClass = (_a = types[0].iconClass) !== null && _a !== void 0 ? _a : '';
            widget.title.iconLabel = (_b = types[0].iconLabel) !== null && _b !== void 0 ? _b : '';
        }
    }
    const factory = new _jupyterlab_imageviewer__WEBPACK_IMPORTED_MODULE_2__.ImageViewerFactory({
        name: FACTORY,
        modelName: 'base64',
        fileTypes: [...FILE_TYPES, ...TEXT_FILE_TYPES],
        defaultFor: FILE_TYPES,
        readOnly: true
    });
    const textFactory = new _jupyterlab_imageviewer__WEBPACK_IMPORTED_MODULE_2__.ImageViewerFactory({
        name: TEXT_FACTORY,
        modelName: 'text',
        fileTypes: TEXT_FILE_TYPES,
        defaultFor: TEXT_FILE_TYPES,
        readOnly: true
    });
    [factory, textFactory].forEach(factory => {
        app.docRegistry.addWidgetFactory(factory);
        factory.widgetCreated.connect(onWidgetCreated);
    });
    const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
        namespace
    });
    if (restorer) {
        // Handle state restoration.
        void restorer.restore(tracker, {
            command: 'docmanager:open',
            args: widget => ({
                path: widget.context.path,
                factory: TEXT_FILE_REGEX.test(widget.context.path)
                    ? TEXT_FACTORY
                    : FACTORY
            }),
            name: widget => widget.context.path
        });
    }
    addCommands(app, tracker, translator);
    if (palette) {
        const category = trans.__('Image Viewer');
        [
            CommandIDs.zoomIn,
            CommandIDs.zoomOut,
            CommandIDs.resetImage,
            CommandIDs.rotateClockwise,
            CommandIDs.rotateCounterclockwise,
            CommandIDs.flipHorizontal,
            CommandIDs.flipVertical,
            CommandIDs.invertColors
        ].forEach(command => {
            palette.addItem({ command, category });
        });
    }
    return tracker;
}
/**
 * Add the commands for the image widget.
 */
function addCommands(app, tracker, translator) {
    const trans = translator.load('jupyterlab');
    const { commands, shell } = app;
    /**
     * Whether there is an active image viewer.
     */
    function isEnabled() {
        return (tracker.currentWidget !== null &&
            tracker.currentWidget === shell.currentWidget);
    }
    commands.addCommand('imageviewer:zoom-in', {
        execute: zoomIn,
        label: trans.__('Zoom In'),
        isEnabled
    });
    commands.addCommand('imageviewer:zoom-out', {
        execute: zoomOut,
        label: trans.__('Zoom Out'),
        isEnabled
    });
    commands.addCommand('imageviewer:reset-image', {
        execute: resetImage,
        label: trans.__('Reset Image'),
        isEnabled
    });
    commands.addCommand('imageviewer:rotate-clockwise', {
        execute: rotateClockwise,
        label: trans.__('Rotate Clockwise'),
        isEnabled
    });
    commands.addCommand('imageviewer:rotate-counterclockwise', {
        execute: rotateCounterclockwise,
        label: trans.__('Rotate Counterclockwise'),
        isEnabled
    });
    commands.addCommand('imageviewer:flip-horizontal', {
        execute: flipHorizontal,
        label: trans.__('Flip image horizontally'),
        isEnabled
    });
    commands.addCommand('imageviewer:flip-vertical', {
        execute: flipVertical,
        label: trans.__('Flip image vertically'),
        isEnabled
    });
    commands.addCommand('imageviewer:invert-colors', {
        execute: invertColors,
        label: trans.__('Invert Colors'),
        isEnabled
    });
    function zoomIn() {
        var _a;
        const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
        if (widget) {
            widget.scale = widget.scale > 1 ? widget.scale + 0.5 : widget.scale * 2;
        }
    }
    function zoomOut() {
        var _a;
        const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
        if (widget) {
            widget.scale = widget.scale > 1 ? widget.scale - 0.5 : widget.scale / 2;
        }
    }
    function resetImage() {
        var _a;
        const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
        if (widget) {
            widget.scale = 1;
            widget.colorinversion = 0;
            widget.resetRotationFlip();
        }
    }
    function rotateClockwise() {
        var _a;
        const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
        if (widget) {
            widget.rotateClockwise();
        }
    }
    function rotateCounterclockwise() {
        var _a;
        const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
        if (widget) {
            widget.rotateCounterclockwise();
        }
    }
    function flipHorizontal() {
        var _a;
        const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
        if (widget) {
            widget.flipHorizontal();
        }
    }
    function flipVertical() {
        var _a;
        const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
        if (widget) {
            widget.flipVertical();
        }
    }
    function invertColors() {
        var _a;
        const widget = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.content;
        if (widget) {
            widget.colorinversion += 1;
            widget.colorinversion %= 2;
        }
    }
}
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvaW1hZ2V2aWV3ZXItZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzBEO0FBQ1k7QUFDTTtBQUN0QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDBCQUEwQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGtFQUFhO0FBQzNCLGVBQWUsZ0VBQVc7QUFDMUIsZUFBZSxpRUFBZSxFQUFFLG9FQUFlO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxNQUFNLEVBQUM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVFQUFrQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLDRCQUE0Qix1RUFBa0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsd0JBQXdCLCtEQUFhO0FBQ3JDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLG9CQUFvQjtBQUNqRCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLFdBQVcsa0JBQWtCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUMiLCJmaWxlIjoicGFja2FnZXNfaW1hZ2V2aWV3ZXItZXh0ZW5zaW9uX2xpYl9pbmRleF9qcy1fYzg2ZjEuOWM3ZTVhZDBmYTQ3YmZkOTYzNzAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBpbWFnZXZpZXdlci1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgSUxheW91dFJlc3RvcmVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgSUNvbW1hbmRQYWxldHRlLCBXaWRnZXRUcmFja2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgSUltYWdlVHJhY2tlciwgSW1hZ2VWaWV3ZXJGYWN0b3J5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvaW1hZ2V2aWV3ZXInO1xuaW1wb3J0IHsgSVRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG4vKipcbiAqIFRoZSBjb21tYW5kIElEcyB1c2VkIGJ5IHRoZSBpbWFnZSB3aWRnZXQgcGx1Z2luLlxuICovXG52YXIgQ29tbWFuZElEcztcbihmdW5jdGlvbiAoQ29tbWFuZElEcykge1xuICAgIENvbW1hbmRJRHMucmVzZXRJbWFnZSA9ICdpbWFnZXZpZXdlcjpyZXNldC1pbWFnZSc7XG4gICAgQ29tbWFuZElEcy56b29tSW4gPSAnaW1hZ2V2aWV3ZXI6em9vbS1pbic7XG4gICAgQ29tbWFuZElEcy56b29tT3V0ID0gJ2ltYWdldmlld2VyOnpvb20tb3V0JztcbiAgICBDb21tYW5kSURzLmZsaXBIb3Jpem9udGFsID0gJ2ltYWdldmlld2VyOmZsaXAtaG9yaXpvbnRhbCc7XG4gICAgQ29tbWFuZElEcy5mbGlwVmVydGljYWwgPSAnaW1hZ2V2aWV3ZXI6ZmxpcC12ZXJ0aWNhbCc7XG4gICAgQ29tbWFuZElEcy5yb3RhdGVDbG9ja3dpc2UgPSAnaW1hZ2V2aWV3ZXI6cm90YXRlLWNsb2Nrd2lzZSc7XG4gICAgQ29tbWFuZElEcy5yb3RhdGVDb3VudGVyY2xvY2t3aXNlID0gJ2ltYWdldmlld2VyOnJvdGF0ZS1jb3VudGVyY2xvY2t3aXNlJztcbiAgICBDb21tYW5kSURzLmludmVydENvbG9ycyA9ICdpbWFnZXZpZXdlcjppbnZlcnQtY29sb3JzJztcbn0pKENvbW1hbmRJRHMgfHwgKENvbW1hbmRJRHMgPSB7fSkpO1xuLyoqXG4gKiBUaGUgbGlzdCBvZiBmaWxlIHR5cGVzIGZvciBpbWFnZXMuXG4gKi9cbmNvbnN0IEZJTEVfVFlQRVMgPSBbJ3BuZycsICdnaWYnLCAnanBlZycsICdibXAnLCAnaWNvJywgJ3RpZmYnXTtcbi8qKlxuICogVGhlIG5hbWUgb2YgdGhlIGZhY3RvcnkgdGhhdCBjcmVhdGVzIGltYWdlIHdpZGdldHMuXG4gKi9cbmNvbnN0IEZBQ1RPUlkgPSAnSW1hZ2UnO1xuLyoqXG4gKiBUaGUgbmFtZSBvZiB0aGUgZmFjdG9yeSB0aGF0IGNyZWF0ZXMgaW1hZ2Ugd2lkZ2V0cy5cbiAqL1xuY29uc3QgVEVYVF9GQUNUT1JZID0gJ0ltYWdlIChUZXh0KSc7XG4vKipcbiAqIFRoZSBsaXN0IG9mIGZpbGUgdHlwZXMgZm9yIGltYWdlcyB3aXRoIG9wdGlvbmFsIHRleHQgbW9kZXMuXG4gKi9cbmNvbnN0IFRFWFRfRklMRV9UWVBFUyA9IFsnc3ZnJywgJ3hibSddO1xuLyoqXG4gKiBUaGUgdGVzdCBwYXR0ZXJuIGZvciB0ZXh0IGZpbGUgdHlwZXMgaW4gcGF0aHMuXG4gKi9cbmNvbnN0IFRFWFRfRklMRV9SRUdFWCA9IG5ldyBSZWdFeHAoYFsuXSgke1RFWFRfRklMRV9UWVBFUy5qb2luKCd8Jyl9KSRgKTtcbi8qKlxuICogVGhlIGltYWdlIGZpbGUgaGFuZGxlciBleHRlbnNpb24uXG4gKi9cbmNvbnN0IHBsdWdpbiA9IHtcbiAgICBhY3RpdmF0ZSxcbiAgICBpZDogJ0BqdXB5dGVybGFiL2ltYWdldmlld2VyLWV4dGVuc2lvbjpwbHVnaW4nLFxuICAgIHByb3ZpZGVzOiBJSW1hZ2VUcmFja2VyLFxuICAgIHJlcXVpcmVzOiBbSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbSUNvbW1hbmRQYWxldHRlLCBJTGF5b3V0UmVzdG9yZXJdLFxuICAgIGF1dG9TdGFydDogdHJ1ZVxufTtcbi8qKlxuICogRXhwb3J0IHRoZSBwbHVnaW4gYXMgZGVmYXVsdC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2luO1xuLyoqXG4gKiBBY3RpdmF0ZSB0aGUgaW1hZ2Ugd2lkZ2V0IGV4dGVuc2lvbi5cbiAqL1xuZnVuY3Rpb24gYWN0aXZhdGUoYXBwLCB0cmFuc2xhdG9yLCBwYWxldHRlLCByZXN0b3Jlcikge1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgY29uc3QgbmFtZXNwYWNlID0gJ2ltYWdlLXdpZGdldCc7XG4gICAgZnVuY3Rpb24gb25XaWRnZXRDcmVhdGVkKHNlbmRlciwgd2lkZ2V0KSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIC8vIE5vdGlmeSB0aGUgd2lkZ2V0IHRyYWNrZXIgaWYgcmVzdG9yZSBkYXRhIG5lZWRzIHRvIHVwZGF0ZS5cbiAgICAgICAgd2lkZ2V0LmNvbnRleHQucGF0aENoYW5nZWQuY29ubmVjdCgoKSA9PiB7XG4gICAgICAgICAgICB2b2lkIHRyYWNrZXIuc2F2ZSh3aWRnZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdm9pZCB0cmFja2VyLmFkZCh3aWRnZXQpO1xuICAgICAgICBjb25zdCB0eXBlcyA9IGFwcC5kb2NSZWdpc3RyeS5nZXRGaWxlVHlwZXNGb3JQYXRoKHdpZGdldC5jb250ZXh0LnBhdGgpO1xuICAgICAgICBpZiAodHlwZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgd2lkZ2V0LnRpdGxlLmljb24gPSB0eXBlc1swXS5pY29uO1xuICAgICAgICAgICAgd2lkZ2V0LnRpdGxlLmljb25DbGFzcyA9IChfYSA9IHR5cGVzWzBdLmljb25DbGFzcykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJyc7XG4gICAgICAgICAgICB3aWRnZXQudGl0bGUuaWNvbkxhYmVsID0gKF9iID0gdHlwZXNbMF0uaWNvbkxhYmVsKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBmYWN0b3J5ID0gbmV3IEltYWdlVmlld2VyRmFjdG9yeSh7XG4gICAgICAgIG5hbWU6IEZBQ1RPUlksXG4gICAgICAgIG1vZGVsTmFtZTogJ2Jhc2U2NCcsXG4gICAgICAgIGZpbGVUeXBlczogWy4uLkZJTEVfVFlQRVMsIC4uLlRFWFRfRklMRV9UWVBFU10sXG4gICAgICAgIGRlZmF1bHRGb3I6IEZJTEVfVFlQRVMsXG4gICAgICAgIHJlYWRPbmx5OiB0cnVlXG4gICAgfSk7XG4gICAgY29uc3QgdGV4dEZhY3RvcnkgPSBuZXcgSW1hZ2VWaWV3ZXJGYWN0b3J5KHtcbiAgICAgICAgbmFtZTogVEVYVF9GQUNUT1JZLFxuICAgICAgICBtb2RlbE5hbWU6ICd0ZXh0JyxcbiAgICAgICAgZmlsZVR5cGVzOiBURVhUX0ZJTEVfVFlQRVMsXG4gICAgICAgIGRlZmF1bHRGb3I6IFRFWFRfRklMRV9UWVBFUyxcbiAgICAgICAgcmVhZE9ubHk6IHRydWVcbiAgICB9KTtcbiAgICBbZmFjdG9yeSwgdGV4dEZhY3RvcnldLmZvckVhY2goZmFjdG9yeSA9PiB7XG4gICAgICAgIGFwcC5kb2NSZWdpc3RyeS5hZGRXaWRnZXRGYWN0b3J5KGZhY3RvcnkpO1xuICAgICAgICBmYWN0b3J5LndpZGdldENyZWF0ZWQuY29ubmVjdChvbldpZGdldENyZWF0ZWQpO1xuICAgIH0pO1xuICAgIGNvbnN0IHRyYWNrZXIgPSBuZXcgV2lkZ2V0VHJhY2tlcih7XG4gICAgICAgIG5hbWVzcGFjZVxuICAgIH0pO1xuICAgIGlmIChyZXN0b3Jlcikge1xuICAgICAgICAvLyBIYW5kbGUgc3RhdGUgcmVzdG9yYXRpb24uXG4gICAgICAgIHZvaWQgcmVzdG9yZXIucmVzdG9yZSh0cmFja2VyLCB7XG4gICAgICAgICAgICBjb21tYW5kOiAnZG9jbWFuYWdlcjpvcGVuJyxcbiAgICAgICAgICAgIGFyZ3M6IHdpZGdldCA9PiAoe1xuICAgICAgICAgICAgICAgIHBhdGg6IHdpZGdldC5jb250ZXh0LnBhdGgsXG4gICAgICAgICAgICAgICAgZmFjdG9yeTogVEVYVF9GSUxFX1JFR0VYLnRlc3Qod2lkZ2V0LmNvbnRleHQucGF0aClcbiAgICAgICAgICAgICAgICAgICAgPyBURVhUX0ZBQ1RPUllcbiAgICAgICAgICAgICAgICAgICAgOiBGQUNUT1JZXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5hbWU6IHdpZGdldCA9PiB3aWRnZXQuY29udGV4dC5wYXRoXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRDb21tYW5kcyhhcHAsIHRyYWNrZXIsIHRyYW5zbGF0b3IpO1xuICAgIGlmIChwYWxldHRlKSB7XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gdHJhbnMuX18oJ0ltYWdlIFZpZXdlcicpO1xuICAgICAgICBbXG4gICAgICAgICAgICBDb21tYW5kSURzLnpvb21JbixcbiAgICAgICAgICAgIENvbW1hbmRJRHMuem9vbU91dCxcbiAgICAgICAgICAgIENvbW1hbmRJRHMucmVzZXRJbWFnZSxcbiAgICAgICAgICAgIENvbW1hbmRJRHMucm90YXRlQ2xvY2t3aXNlLFxuICAgICAgICAgICAgQ29tbWFuZElEcy5yb3RhdGVDb3VudGVyY2xvY2t3aXNlLFxuICAgICAgICAgICAgQ29tbWFuZElEcy5mbGlwSG9yaXpvbnRhbCxcbiAgICAgICAgICAgIENvbW1hbmRJRHMuZmxpcFZlcnRpY2FsLFxuICAgICAgICAgICAgQ29tbWFuZElEcy5pbnZlcnRDb2xvcnNcbiAgICAgICAgXS5mb3JFYWNoKGNvbW1hbmQgPT4ge1xuICAgICAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHsgY29tbWFuZCwgY2F0ZWdvcnkgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdHJhY2tlcjtcbn1cbi8qKlxuICogQWRkIHRoZSBjb21tYW5kcyBmb3IgdGhlIGltYWdlIHdpZGdldC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZENvbW1hbmRzKGFwcCwgdHJhY2tlciwgdHJhbnNsYXRvcikge1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgY29uc3QgeyBjb21tYW5kcywgc2hlbGwgfSA9IGFwcDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZXJlIGlzIGFuIGFjdGl2ZSBpbWFnZSB2aWV3ZXIuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gKHRyYWNrZXIuY3VycmVudFdpZGdldCAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgdHJhY2tlci5jdXJyZW50V2lkZ2V0ID09PSBzaGVsbC5jdXJyZW50V2lkZ2V0KTtcbiAgICB9XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZCgnaW1hZ2V2aWV3ZXI6em9vbS1pbicsIHtcbiAgICAgICAgZXhlY3V0ZTogem9vbUluLFxuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1pvb20gSW4nKSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZCgnaW1hZ2V2aWV3ZXI6em9vbS1vdXQnLCB7XG4gICAgICAgIGV4ZWN1dGU6IHpvb21PdXQsXG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnWm9vbSBPdXQnKSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZCgnaW1hZ2V2aWV3ZXI6cmVzZXQtaW1hZ2UnLCB7XG4gICAgICAgIGV4ZWN1dGU6IHJlc2V0SW1hZ2UsXG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnUmVzZXQgSW1hZ2UnKSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZCgnaW1hZ2V2aWV3ZXI6cm90YXRlLWNsb2Nrd2lzZScsIHtcbiAgICAgICAgZXhlY3V0ZTogcm90YXRlQ2xvY2t3aXNlLFxuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1JvdGF0ZSBDbG9ja3dpc2UnKSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZCgnaW1hZ2V2aWV3ZXI6cm90YXRlLWNvdW50ZXJjbG9ja3dpc2UnLCB7XG4gICAgICAgIGV4ZWN1dGU6IHJvdGF0ZUNvdW50ZXJjbG9ja3dpc2UsXG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnUm90YXRlIENvdW50ZXJjbG9ja3dpc2UnKSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZCgnaW1hZ2V2aWV3ZXI6ZmxpcC1ob3Jpem9udGFsJywge1xuICAgICAgICBleGVjdXRlOiBmbGlwSG9yaXpvbnRhbCxcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdGbGlwIGltYWdlIGhvcml6b250YWxseScpLFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKCdpbWFnZXZpZXdlcjpmbGlwLXZlcnRpY2FsJywge1xuICAgICAgICBleGVjdXRlOiBmbGlwVmVydGljYWwsXG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnRmxpcCBpbWFnZSB2ZXJ0aWNhbGx5JyksXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoJ2ltYWdldmlld2VyOmludmVydC1jb2xvcnMnLCB7XG4gICAgICAgIGV4ZWN1dGU6IGludmVydENvbG9ycyxcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdJbnZlcnQgQ29sb3JzJyksXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHpvb21JbigpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCB3aWRnZXQgPSAoX2EgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb250ZW50O1xuICAgICAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgICAgICB3aWRnZXQuc2NhbGUgPSB3aWRnZXQuc2NhbGUgPiAxID8gd2lkZ2V0LnNjYWxlICsgMC41IDogd2lkZ2V0LnNjYWxlICogMjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB6b29tT3V0KCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IChfYSA9IHRyYWNrZXIuY3VycmVudFdpZGdldCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbnRlbnQ7XG4gICAgICAgIGlmICh3aWRnZXQpIHtcbiAgICAgICAgICAgIHdpZGdldC5zY2FsZSA9IHdpZGdldC5zY2FsZSA+IDEgPyB3aWRnZXQuc2NhbGUgLSAwLjUgOiB3aWRnZXQuc2NhbGUgLyAyO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc2V0SW1hZ2UoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gKF9hID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudDtcbiAgICAgICAgaWYgKHdpZGdldCkge1xuICAgICAgICAgICAgd2lkZ2V0LnNjYWxlID0gMTtcbiAgICAgICAgICAgIHdpZGdldC5jb2xvcmludmVyc2lvbiA9IDA7XG4gICAgICAgICAgICB3aWRnZXQucmVzZXRSb3RhdGlvbkZsaXAoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByb3RhdGVDbG9ja3dpc2UoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gKF9hID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudDtcbiAgICAgICAgaWYgKHdpZGdldCkge1xuICAgICAgICAgICAgd2lkZ2V0LnJvdGF0ZUNsb2Nrd2lzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJvdGF0ZUNvdW50ZXJjbG9ja3dpc2UoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gKF9hID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudDtcbiAgICAgICAgaWYgKHdpZGdldCkge1xuICAgICAgICAgICAgd2lkZ2V0LnJvdGF0ZUNvdW50ZXJjbG9ja3dpc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBmbGlwSG9yaXpvbnRhbCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCB3aWRnZXQgPSAoX2EgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb250ZW50O1xuICAgICAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgICAgICB3aWRnZXQuZmxpcEhvcml6b250YWwoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBmbGlwVmVydGljYWwoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gKF9hID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29udGVudDtcbiAgICAgICAgaWYgKHdpZGdldCkge1xuICAgICAgICAgICAgd2lkZ2V0LmZsaXBWZXJ0aWNhbCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGludmVydENvbG9ycygpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCB3aWRnZXQgPSAoX2EgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb250ZW50O1xuICAgICAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgICAgICB3aWRnZXQuY29sb3JpbnZlcnNpb24gKz0gMTtcbiAgICAgICAgICAgIHdpZGdldC5jb2xvcmludmVyc2lvbiAlPSAyO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==