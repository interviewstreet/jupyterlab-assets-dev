(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_launcher_lib_index_js"],{

/***/ "../../packages/launcher/lib/index.js":
/*!********************************************!*\
  !*** ../../packages/launcher/lib/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ILauncher": () => (/* binding */ ILauncher),
/* harmony export */   "LauncherModel": () => (/* binding */ LauncherModel),
/* harmony export */   "Launcher": () => (/* binding */ Launcher)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable?7038");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/properties */ "webpack/sharing/consume/default/@lumino/properties/@lumino/properties?140a");
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_properties__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module launcher
 */









/**
 * The class name added to Launcher instances.
 */
const LAUNCHER_CLASS = 'jp-Launcher';
/* tslint:disable */
/**
 * The launcher token.
 */
const ILauncher = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__.Token('@jupyterlab/launcher:ILauncher');
/**
 * LauncherModel keeps track of the path to working directory and has a list of
 * LauncherItems, which the Launcher will render.
 */
class LauncherModel extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomModel {
    constructor() {
        super(...arguments);
        this.itemsList = [];
    }
    /**
     * Add a command item to the launcher, and trigger re-render event for parent
     * widget.
     *
     * @param options - The specification options for a launcher item.
     *
     * @returns A disposable that will remove the item from Launcher, and trigger
     * re-render event for parent widget.
     *
     */
    add(options) {
        // Create a copy of the options to circumvent mutations to the original.
        const item = Private.createItem(options);
        this.itemsList.push(item);
        this.stateChanged.emit(void 0);
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_5__.DisposableDelegate(() => {
            _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.removeFirstOf(this.itemsList, item);
            this.stateChanged.emit(void 0);
        });
    }
    /**
     * Return an iterator of launcher items.
     */
    items() {
        return new _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayIterator(this.itemsList);
    }
}
/**
 * A virtual-DOM-based widget for the Launcher.
 */
class Launcher extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomRenderer {
    /**
     * Construct a new launcher widget.
     */
    constructor(options) {
        super(options.model);
        this._pending = false;
        this._cwd = '';
        this._cwd = options.cwd;
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this._callback = options.callback;
        this._commands = options.commands;
        this.addClass(LAUNCHER_CLASS);
    }
    /**
     * The cwd of the launcher.
     */
    get cwd() {
        return this._cwd;
    }
    set cwd(value) {
        this._cwd = value;
        this.update();
    }
    /**
     * Whether there is a pending item being launched.
     */
    get pending() {
        return this._pending;
    }
    set pending(value) {
        this._pending = value;
    }
    /**
     * Render the launcher to virtual DOM nodes.
     */
    render() {
        // Bail if there is no model.
        if (!this.model) {
            return null;
        }
        const knownCategories = [
            this._trans.__('Notebook'),
            this._trans.__('Console'),
            this._trans.__('Other')
        ];
        const kernelCategories = [
            this._trans.__('Notebook'),
            this._trans.__('Console')
        ];
        // First group-by categories
        const categories = Object.create(null);
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(this.model.items(), (item, index) => {
            const cat = item.category || this._trans.__('Other');
            if (!(cat in categories)) {
                categories[cat] = [];
            }
            categories[cat].push(item);
        });
        // Within each category sort by rank
        for (const cat in categories) {
            categories[cat] = categories[cat].sort((a, b) => {
                return Private.sortCmp(a, b, this._cwd, this._commands);
            });
        }
        // Variable to help create sections
        const sections = [];
        let section;
        // Assemble the final ordered list of categories, beginning with
        // KNOWN_CATEGORIES.
        const orderedCategories = [];
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(knownCategories, (cat, index) => {
            orderedCategories.push(cat);
        });
        for (const cat in categories) {
            if (knownCategories.indexOf(cat) === -1) {
                orderedCategories.push(cat);
            }
        }
        // Now create the sections for each category
        orderedCategories.forEach(cat => {
            if (!categories[cat]) {
                return;
            }
            const item = categories[cat][0];
            const args = Object.assign(Object.assign({}, item.args), { cwd: this.cwd });
            const kernel = kernelCategories.indexOf(cat) > -1;
            // DEPRECATED: remove _icon when lumino 2.0 is adopted
            // if icon is aliasing iconClass, don't use it
            const iconClass = this._commands.iconClass(item.command, args);
            const _icon = this._commands.icon(item.command, args);
            const icon = _icon === iconClass ? undefined : _icon;
            if (cat in categories) {
                section = (react__WEBPACK_IMPORTED_MODULE_8__.createElement("div", { className: "jp-Launcher-section", key: cat },
                    react__WEBPACK_IMPORTED_MODULE_8__.createElement("div", { className: "jp-Launcher-sectionHeader" },
                        react__WEBPACK_IMPORTED_MODULE_8__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.LabIcon.resolveReact, { icon: icon, iconClass: (0,_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.classes)(iconClass, 'jp-Icon-cover'), stylesheet: "launcherSection" }),
                        react__WEBPACK_IMPORTED_MODULE_8__.createElement("h2", { className: "jp-Launcher-sectionTitle" }, cat)),
                    react__WEBPACK_IMPORTED_MODULE_8__.createElement("div", { className: "jp-Launcher-cardContainer" }, (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.toArray)((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.map)(categories[cat], (item) => {
                        return Card(kernel, item, this, this._commands, this._trans, this._callback);
                    })))));
                sections.push(section);
            }
        });
        // Wrap the sections in body and content divs.
        return (react__WEBPACK_IMPORTED_MODULE_8__.createElement("div", { className: "jp-Launcher-body" },
            react__WEBPACK_IMPORTED_MODULE_8__.createElement("div", { className: "jp-Launcher-content" },
                react__WEBPACK_IMPORTED_MODULE_8__.createElement("div", { className: "jp-Launcher-cwd" },
                    react__WEBPACK_IMPORTED_MODULE_8__.createElement("h3", null, this.cwd)),
                sections)));
    }
}
/**
 * A pure tsx component for a launcher card.
 *
 * @param kernel - whether the item takes uses a kernel.
 *
 * @param item - the launcher item to render.
 *
 * @param launcher - the Launcher instance to which this is added.
 *
 * @param launcherCallback - a callback to call after an item has been launched.
 *
 * @returns a vdom `VirtualElement` for the launcher card.
 */
function Card(kernel, item, launcher, commands, trans, launcherCallback) {
    // Get some properties of the command
    const command = item.command;
    const args = Object.assign(Object.assign({}, item.args), { cwd: launcher.cwd });
    const caption = commands.caption(command, args);
    const label = commands.label(command, args);
    const title = kernel ? label : caption || label;
    // Build the onclick handler.
    const onclick = () => {
        // If an item has already been launched,
        // don't try to launch another.
        if (launcher.pending === true) {
            return;
        }
        launcher.pending = true;
        void commands
            .execute(command, Object.assign(Object.assign({}, item.args), { cwd: launcher.cwd }))
            .then(value => {
            launcher.pending = false;
            if (value instanceof _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__.Widget) {
                launcherCallback(value);
                launcher.dispose();
            }
        })
            .catch(err => {
            launcher.pending = false;
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(trans._p('Error', 'Launcher Error'), err);
        });
    };
    // With tabindex working, you can now pick a kernel by tabbing around and
    // pressing Enter.
    const onkeypress = (event) => {
        if (event.key === 'Enter') {
            onclick();
        }
    };
    // DEPRECATED: remove _icon when lumino 2.0 is adopted
    // if icon is aliasing iconClass, don't use it
    const iconClass = commands.iconClass(command, args);
    const _icon = commands.icon(command, args);
    const icon = _icon === iconClass ? undefined : _icon;
    // Return the VDOM element.
    return (react__WEBPACK_IMPORTED_MODULE_8__.createElement("div", { className: "jp-LauncherCard", title: title, onClick: onclick, onKeyPress: onkeypress, tabIndex: 0, "data-category": item.category || trans.__('Other'), key: Private.keyProperty.get(item) },
        react__WEBPACK_IMPORTED_MODULE_8__.createElement("div", { className: "jp-LauncherCard-icon" }, kernel ? (item.kernelIconUrl ? (react__WEBPACK_IMPORTED_MODULE_8__.createElement("img", { src: item.kernelIconUrl, className: "jp-Launcher-kernelIcon" })) : (react__WEBPACK_IMPORTED_MODULE_8__.createElement("div", { className: "jp-LauncherCard-noKernelIcon" }, label[0].toUpperCase()))) : (react__WEBPACK_IMPORTED_MODULE_8__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.LabIcon.resolveReact, { icon: icon, iconClass: (0,_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.classes)(iconClass, 'jp-Icon-cover'), stylesheet: "launcherCard" }))),
        react__WEBPACK_IMPORTED_MODULE_8__.createElement("div", { className: "jp-LauncherCard-label", title: title },
            react__WEBPACK_IMPORTED_MODULE_8__.createElement("p", null, label))));
}
/**
 * The namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * An incrementing counter for keys.
     */
    let id = 0;
    /**
     * An attached property for an item's key.
     */
    Private.keyProperty = new _lumino_properties__WEBPACK_IMPORTED_MODULE_6__.AttachedProperty({
        name: 'key',
        create: () => id++
    });
    /**
     * Create a fully specified item given item options.
     */
    function createItem(options) {
        return Object.assign(Object.assign({}, options), { category: options.category || '', rank: options.rank !== undefined ? options.rank : Infinity });
    }
    Private.createItem = createItem;
    /**
     * A sort comparison function for a launcher item.
     */
    function sortCmp(a, b, cwd, commands) {
        // First, compare by rank.
        const r1 = a.rank;
        const r2 = b.rank;
        if (r1 !== r2 && r1 !== undefined && r2 !== undefined) {
            return r1 < r2 ? -1 : 1; // Infinity safe
        }
        // Finally, compare by display name.
        const aLabel = commands.label(a.command, Object.assign(Object.assign({}, a.args), { cwd }));
        const bLabel = commands.label(b.command, Object.assign(Object.assign({}, b.args), { cwd }));
        return aLabel.localeCompare(bLabel);
    }
    Private.sortCmp = sortCmp;
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbGF1bmNoZXIvbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNpRjtBQUN4QjtBQUNJO0FBQ21CO0FBQ3RDO0FBQ2M7QUFDRjtBQUNiO0FBQ1Y7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLHNCQUFzQixvREFBSztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNPLDRCQUE0QiwyREFBUztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrRUFBa0I7QUFDckMsWUFBWSxxRUFBc0I7QUFDbEM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiw0REFBYTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sdUJBQXVCLDhEQUFZO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsbUVBQWM7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVEQUFJO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdURBQUk7QUFDWjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGVBQWUsZ0JBQWdCO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdEQUFtQixTQUFTLDZDQUE2QztBQUNwRyxvQkFBb0IsZ0RBQW1CLFNBQVMseUNBQXlDO0FBQ3pGLHdCQUF3QixnREFBbUIsQ0FBQywyRUFBb0IsR0FBRyx3QkFBd0Isa0VBQU8sNkRBQTZEO0FBQy9KLHdCQUF3QixnREFBbUIsUUFBUSx3Q0FBd0M7QUFDM0Ysb0JBQW9CLGdEQUFtQixTQUFTLHlDQUF5QyxFQUFFLDBEQUFPLENBQUMsc0RBQUc7QUFDdEc7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGdCQUFnQixnREFBbUIsU0FBUyxnQ0FBZ0M7QUFDNUUsWUFBWSxnREFBbUIsU0FBUyxtQ0FBbUM7QUFDM0UsZ0JBQWdCLGdEQUFtQixTQUFTLCtCQUErQjtBQUMzRSxvQkFBb0IsZ0RBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLGVBQWUsb0JBQW9CO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCxlQUFlLG9CQUFvQjtBQUMvRjtBQUNBO0FBQ0EsaUNBQWlDLG1EQUFNO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsaUJBQWlCLHNFQUFnQjtBQUNqQyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksZ0RBQW1CLFNBQVMsNkxBQTZMO0FBQ3JPLFFBQVEsZ0RBQW1CLFNBQVMsb0NBQW9DLGtDQUFrQyxnREFBbUIsU0FBUywrREFBK0QsTUFBTSxnREFBbUIsU0FBUyw0Q0FBNEMsK0JBQStCLGdEQUFtQixDQUFDLDJFQUFvQixHQUFHLHdCQUF3QixrRUFBTywwREFBMEQ7QUFDdGIsUUFBUSxnREFBbUIsU0FBUyxtREFBbUQ7QUFDdkYsWUFBWSxnREFBbUI7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsZ0VBQWdCO0FBQzlDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsYUFBYSwrRkFBK0Y7QUFDeko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBLCtFQUErRSxZQUFZLE1BQU07QUFDakcsK0VBQStFLFlBQVksTUFBTTtBQUNqRztBQUNBO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQixpQyIsImZpbGUiOiJwYWNrYWdlc19sYXVuY2hlcl9saWJfaW5kZXhfanMuZWNhYzk2MWMxMWNlMmM1ZTc4MzYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBsYXVuY2hlclxuICovXG5pbXBvcnQgeyBzaG93RXJyb3JNZXNzYWdlLCBWRG9tTW9kZWwsIFZEb21SZW5kZXJlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgY2xhc3NlcywgTGFiSWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgQXJyYXlFeHQsIEFycmF5SXRlcmF0b3IsIGVhY2gsIG1hcCwgdG9BcnJheSB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgRGlzcG9zYWJsZURlbGVnYXRlIH0gZnJvbSAnQGx1bWluby9kaXNwb3NhYmxlJztcbmltcG9ydCB7IEF0dGFjaGVkUHJvcGVydHkgfSBmcm9tICdAbHVtaW5vL3Byb3BlcnRpZXMnO1xuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSAnQGx1bWluby93aWRnZXRzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gTGF1bmNoZXIgaW5zdGFuY2VzLlxuICovXG5jb25zdCBMQVVOQ0hFUl9DTEFTUyA9ICdqcC1MYXVuY2hlcic7XG4vKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLyoqXG4gKiBUaGUgbGF1bmNoZXIgdG9rZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBJTGF1bmNoZXIgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL2xhdW5jaGVyOklMYXVuY2hlcicpO1xuLyoqXG4gKiBMYXVuY2hlck1vZGVsIGtlZXBzIHRyYWNrIG9mIHRoZSBwYXRoIHRvIHdvcmtpbmcgZGlyZWN0b3J5IGFuZCBoYXMgYSBsaXN0IG9mXG4gKiBMYXVuY2hlckl0ZW1zLCB3aGljaCB0aGUgTGF1bmNoZXIgd2lsbCByZW5kZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBMYXVuY2hlck1vZGVsIGV4dGVuZHMgVkRvbU1vZGVsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5pdGVtc0xpc3QgPSBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgY29tbWFuZCBpdGVtIHRvIHRoZSBsYXVuY2hlciwgYW5kIHRyaWdnZXIgcmUtcmVuZGVyIGV2ZW50IGZvciBwYXJlbnRcbiAgICAgKiB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFRoZSBzcGVjaWZpY2F0aW9uIG9wdGlvbnMgZm9yIGEgbGF1bmNoZXIgaXRlbS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgZGlzcG9zYWJsZSB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBpdGVtIGZyb20gTGF1bmNoZXIsIGFuZCB0cmlnZ2VyXG4gICAgICogcmUtcmVuZGVyIGV2ZW50IGZvciBwYXJlbnQgd2lkZ2V0LlxuICAgICAqXG4gICAgICovXG4gICAgYWRkKG9wdGlvbnMpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgY29weSBvZiB0aGUgb3B0aW9ucyB0byBjaXJjdW12ZW50IG11dGF0aW9ucyB0byB0aGUgb3JpZ2luYWwuXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBQcml2YXRlLmNyZWF0ZUl0ZW0ob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuaXRlbXNMaXN0LnB1c2goaXRlbSk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlRGVsZWdhdGUoKCkgPT4ge1xuICAgICAgICAgICAgQXJyYXlFeHQucmVtb3ZlRmlyc3RPZih0aGlzLml0ZW1zTGlzdCwgaXRlbSk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYW4gaXRlcmF0b3Igb2YgbGF1bmNoZXIgaXRlbXMuXG4gICAgICovXG4gICAgaXRlbXMoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXlJdGVyYXRvcih0aGlzLml0ZW1zTGlzdCk7XG4gICAgfVxufVxuLyoqXG4gKiBBIHZpcnR1YWwtRE9NLWJhc2VkIHdpZGdldCBmb3IgdGhlIExhdW5jaGVyLlxuICovXG5leHBvcnQgY2xhc3MgTGF1bmNoZXIgZXh0ZW5kcyBWRG9tUmVuZGVyZXIge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBsYXVuY2hlciB3aWRnZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zLm1vZGVsKTtcbiAgICAgICAgdGhpcy5fcGVuZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jd2QgPSAnJztcbiAgICAgICAgdGhpcy5fY3dkID0gb3B0aW9ucy5jd2Q7XG4gICAgICAgIHRoaXMudHJhbnNsYXRvciA9IG9wdGlvbnMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgdGhpcy5fdHJhbnMgPSB0aGlzLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICB0aGlzLl9jYWxsYmFjayA9IG9wdGlvbnMuY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX2NvbW1hbmRzID0gb3B0aW9ucy5jb21tYW5kcztcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhMQVVOQ0hFUl9DTEFTUyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjd2Qgb2YgdGhlIGxhdW5jaGVyLlxuICAgICAqL1xuICAgIGdldCBjd2QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jd2Q7XG4gICAgfVxuICAgIHNldCBjd2QodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fY3dkID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlcmUgaXMgYSBwZW5kaW5nIGl0ZW0gYmVpbmcgbGF1bmNoZWQuXG4gICAgICovXG4gICAgZ2V0IHBlbmRpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wZW5kaW5nO1xuICAgIH1cbiAgICBzZXQgcGVuZGluZyh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9wZW5kaW5nID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlciB0aGUgbGF1bmNoZXIgdG8gdmlydHVhbCBET00gbm9kZXMuXG4gICAgICovXG4gICAgcmVuZGVyKCkge1xuICAgICAgICAvLyBCYWlsIGlmIHRoZXJlIGlzIG5vIG1vZGVsLlxuICAgICAgICBpZiAoIXRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGtub3duQ2F0ZWdvcmllcyA9IFtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zLl9fKCdOb3RlYm9vaycpLFxuICAgICAgICAgICAgdGhpcy5fdHJhbnMuX18oJ0NvbnNvbGUnKSxcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zLl9fKCdPdGhlcicpXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IGtlcm5lbENhdGVnb3JpZXMgPSBbXG4gICAgICAgICAgICB0aGlzLl90cmFucy5fXygnTm90ZWJvb2snKSxcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zLl9fKCdDb25zb2xlJylcbiAgICAgICAgXTtcbiAgICAgICAgLy8gRmlyc3QgZ3JvdXAtYnkgY2F0ZWdvcmllc1xuICAgICAgICBjb25zdCBjYXRlZ29yaWVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWFjaCh0aGlzLm1vZGVsLml0ZW1zKCksIChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2F0ID0gaXRlbS5jYXRlZ29yeSB8fCB0aGlzLl90cmFucy5fXygnT3RoZXInKTtcbiAgICAgICAgICAgIGlmICghKGNhdCBpbiBjYXRlZ29yaWVzKSkge1xuICAgICAgICAgICAgICAgIGNhdGVnb3JpZXNbY2F0XSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0ZWdvcmllc1tjYXRdLnB1c2goaXRlbSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBXaXRoaW4gZWFjaCBjYXRlZ29yeSBzb3J0IGJ5IHJhbmtcbiAgICAgICAgZm9yIChjb25zdCBjYXQgaW4gY2F0ZWdvcmllcykge1xuICAgICAgICAgICAgY2F0ZWdvcmllc1tjYXRdID0gY2F0ZWdvcmllc1tjYXRdLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJpdmF0ZS5zb3J0Q21wKGEsIGIsIHRoaXMuX2N3ZCwgdGhpcy5fY29tbWFuZHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVmFyaWFibGUgdG8gaGVscCBjcmVhdGUgc2VjdGlvbnNcbiAgICAgICAgY29uc3Qgc2VjdGlvbnMgPSBbXTtcbiAgICAgICAgbGV0IHNlY3Rpb247XG4gICAgICAgIC8vIEFzc2VtYmxlIHRoZSBmaW5hbCBvcmRlcmVkIGxpc3Qgb2YgY2F0ZWdvcmllcywgYmVnaW5uaW5nIHdpdGhcbiAgICAgICAgLy8gS05PV05fQ0FURUdPUklFUy5cbiAgICAgICAgY29uc3Qgb3JkZXJlZENhdGVnb3JpZXMgPSBbXTtcbiAgICAgICAgZWFjaChrbm93bkNhdGVnb3JpZXMsIChjYXQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBvcmRlcmVkQ2F0ZWdvcmllcy5wdXNoKGNhdCk7XG4gICAgICAgIH0pO1xuICAgICAgICBmb3IgKGNvbnN0IGNhdCBpbiBjYXRlZ29yaWVzKSB7XG4gICAgICAgICAgICBpZiAoa25vd25DYXRlZ29yaWVzLmluZGV4T2YoY2F0KSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBvcmRlcmVkQ2F0ZWdvcmllcy5wdXNoKGNhdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm93IGNyZWF0ZSB0aGUgc2VjdGlvbnMgZm9yIGVhY2ggY2F0ZWdvcnlcbiAgICAgICAgb3JkZXJlZENhdGVnb3JpZXMuZm9yRWFjaChjYXQgPT4ge1xuICAgICAgICAgICAgaWYgKCFjYXRlZ29yaWVzW2NhdF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gY2F0ZWdvcmllc1tjYXRdWzBdO1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgaXRlbS5hcmdzKSwgeyBjd2Q6IHRoaXMuY3dkIH0pO1xuICAgICAgICAgICAgY29uc3Qga2VybmVsID0ga2VybmVsQ2F0ZWdvcmllcy5pbmRleE9mKGNhdCkgPiAtMTtcbiAgICAgICAgICAgIC8vIERFUFJFQ0FURUQ6IHJlbW92ZSBfaWNvbiB3aGVuIGx1bWlubyAyLjAgaXMgYWRvcHRlZFxuICAgICAgICAgICAgLy8gaWYgaWNvbiBpcyBhbGlhc2luZyBpY29uQ2xhc3MsIGRvbid0IHVzZSBpdFxuICAgICAgICAgICAgY29uc3QgaWNvbkNsYXNzID0gdGhpcy5fY29tbWFuZHMuaWNvbkNsYXNzKGl0ZW0uY29tbWFuZCwgYXJncyk7XG4gICAgICAgICAgICBjb25zdCBfaWNvbiA9IHRoaXMuX2NvbW1hbmRzLmljb24oaXRlbS5jb21tYW5kLCBhcmdzKTtcbiAgICAgICAgICAgIGNvbnN0IGljb24gPSBfaWNvbiA9PT0gaWNvbkNsYXNzID8gdW5kZWZpbmVkIDogX2ljb247XG4gICAgICAgICAgICBpZiAoY2F0IGluIGNhdGVnb3JpZXMpIHtcbiAgICAgICAgICAgICAgICBzZWN0aW9uID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtTGF1bmNoZXItc2VjdGlvblwiLCBrZXk6IGNhdCB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLUxhdW5jaGVyLXNlY3Rpb25IZWFkZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJJY29uLnJlc29sdmVSZWFjdCwgeyBpY29uOiBpY29uLCBpY29uQ2xhc3M6IGNsYXNzZXMoaWNvbkNsYXNzLCAnanAtSWNvbi1jb3ZlcicpLCBzdHlsZXNoZWV0OiBcImxhdW5jaGVyU2VjdGlvblwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImgyXCIsIHsgY2xhc3NOYW1lOiBcImpwLUxhdW5jaGVyLXNlY3Rpb25UaXRsZVwiIH0sIGNhdCkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLUxhdW5jaGVyLWNhcmRDb250YWluZXJcIiB9LCB0b0FycmF5KG1hcChjYXRlZ29yaWVzW2NhdF0sIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ2FyZChrZXJuZWwsIGl0ZW0sIHRoaXMsIHRoaXMuX2NvbW1hbmRzLCB0aGlzLl90cmFucywgdGhpcy5fY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB9KSkpKSk7XG4gICAgICAgICAgICAgICAgc2VjdGlvbnMucHVzaChzZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFdyYXAgdGhlIHNlY3Rpb25zIGluIGJvZHkgYW5kIGNvbnRlbnQgZGl2cy5cbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLUxhdW5jaGVyLWJvZHlcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJqcC1MYXVuY2hlci1jb250ZW50XCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLUxhdW5jaGVyLWN3ZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCBudWxsLCB0aGlzLmN3ZCkpLFxuICAgICAgICAgICAgICAgIHNlY3Rpb25zKSkpO1xuICAgIH1cbn1cbi8qKlxuICogQSBwdXJlIHRzeCBjb21wb25lbnQgZm9yIGEgbGF1bmNoZXIgY2FyZC5cbiAqXG4gKiBAcGFyYW0ga2VybmVsIC0gd2hldGhlciB0aGUgaXRlbSB0YWtlcyB1c2VzIGEga2VybmVsLlxuICpcbiAqIEBwYXJhbSBpdGVtIC0gdGhlIGxhdW5jaGVyIGl0ZW0gdG8gcmVuZGVyLlxuICpcbiAqIEBwYXJhbSBsYXVuY2hlciAtIHRoZSBMYXVuY2hlciBpbnN0YW5jZSB0byB3aGljaCB0aGlzIGlzIGFkZGVkLlxuICpcbiAqIEBwYXJhbSBsYXVuY2hlckNhbGxiYWNrIC0gYSBjYWxsYmFjayB0byBjYWxsIGFmdGVyIGFuIGl0ZW0gaGFzIGJlZW4gbGF1bmNoZWQuXG4gKlxuICogQHJldHVybnMgYSB2ZG9tIGBWaXJ0dWFsRWxlbWVudGAgZm9yIHRoZSBsYXVuY2hlciBjYXJkLlxuICovXG5mdW5jdGlvbiBDYXJkKGtlcm5lbCwgaXRlbSwgbGF1bmNoZXIsIGNvbW1hbmRzLCB0cmFucywgbGF1bmNoZXJDYWxsYmFjaykge1xuICAgIC8vIEdldCBzb21lIHByb3BlcnRpZXMgb2YgdGhlIGNvbW1hbmRcbiAgICBjb25zdCBjb21tYW5kID0gaXRlbS5jb21tYW5kO1xuICAgIGNvbnN0IGFyZ3MgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGl0ZW0uYXJncyksIHsgY3dkOiBsYXVuY2hlci5jd2QgfSk7XG4gICAgY29uc3QgY2FwdGlvbiA9IGNvbW1hbmRzLmNhcHRpb24oY29tbWFuZCwgYXJncyk7XG4gICAgY29uc3QgbGFiZWwgPSBjb21tYW5kcy5sYWJlbChjb21tYW5kLCBhcmdzKTtcbiAgICBjb25zdCB0aXRsZSA9IGtlcm5lbCA/IGxhYmVsIDogY2FwdGlvbiB8fCBsYWJlbDtcbiAgICAvLyBCdWlsZCB0aGUgb25jbGljayBoYW5kbGVyLlxuICAgIGNvbnN0IG9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIC8vIElmIGFuIGl0ZW0gaGFzIGFscmVhZHkgYmVlbiBsYXVuY2hlZCxcbiAgICAgICAgLy8gZG9uJ3QgdHJ5IHRvIGxhdW5jaCBhbm90aGVyLlxuICAgICAgICBpZiAobGF1bmNoZXIucGVuZGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxhdW5jaGVyLnBlbmRpbmcgPSB0cnVlO1xuICAgICAgICB2b2lkIGNvbW1hbmRzXG4gICAgICAgICAgICAuZXhlY3V0ZShjb21tYW5kLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGl0ZW0uYXJncyksIHsgY3dkOiBsYXVuY2hlci5jd2QgfSkpXG4gICAgICAgICAgICAudGhlbih2YWx1ZSA9PiB7XG4gICAgICAgICAgICBsYXVuY2hlci5wZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICBsYXVuY2hlckNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBsYXVuY2hlci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGxhdW5jaGVyLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHZvaWQgc2hvd0Vycm9yTWVzc2FnZSh0cmFucy5fcCgnRXJyb3InLCAnTGF1bmNoZXIgRXJyb3InKSwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyBXaXRoIHRhYmluZGV4IHdvcmtpbmcsIHlvdSBjYW4gbm93IHBpY2sgYSBrZXJuZWwgYnkgdGFiYmluZyBhcm91bmQgYW5kXG4gICAgLy8gcHJlc3NpbmcgRW50ZXIuXG4gICAgY29uc3Qgb25rZXlwcmVzcyA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICBvbmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIERFUFJFQ0FURUQ6IHJlbW92ZSBfaWNvbiB3aGVuIGx1bWlubyAyLjAgaXMgYWRvcHRlZFxuICAgIC8vIGlmIGljb24gaXMgYWxpYXNpbmcgaWNvbkNsYXNzLCBkb24ndCB1c2UgaXRcbiAgICBjb25zdCBpY29uQ2xhc3MgPSBjb21tYW5kcy5pY29uQ2xhc3MoY29tbWFuZCwgYXJncyk7XG4gICAgY29uc3QgX2ljb24gPSBjb21tYW5kcy5pY29uKGNvbW1hbmQsIGFyZ3MpO1xuICAgIGNvbnN0IGljb24gPSBfaWNvbiA9PT0gaWNvbkNsYXNzID8gdW5kZWZpbmVkIDogX2ljb247XG4gICAgLy8gUmV0dXJuIHRoZSBWRE9NIGVsZW1lbnQuXG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLUxhdW5jaGVyQ2FyZFwiLCB0aXRsZTogdGl0bGUsIG9uQ2xpY2s6IG9uY2xpY2ssIG9uS2V5UHJlc3M6IG9ua2V5cHJlc3MsIHRhYkluZGV4OiAwLCBcImRhdGEtY2F0ZWdvcnlcIjogaXRlbS5jYXRlZ29yeSB8fCB0cmFucy5fXygnT3RoZXInKSwga2V5OiBQcml2YXRlLmtleVByb3BlcnR5LmdldChpdGVtKSB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLUxhdW5jaGVyQ2FyZC1pY29uXCIgfSwga2VybmVsID8gKGl0ZW0ua2VybmVsSWNvblVybCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsgc3JjOiBpdGVtLmtlcm5lbEljb25VcmwsIGNsYXNzTmFtZTogXCJqcC1MYXVuY2hlci1rZXJuZWxJY29uXCIgfSkpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtTGF1bmNoZXJDYXJkLW5vS2VybmVsSWNvblwiIH0sIGxhYmVsWzBdLnRvVXBwZXJDYXNlKCkpKSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChMYWJJY29uLnJlc29sdmVSZWFjdCwgeyBpY29uOiBpY29uLCBpY29uQ2xhc3M6IGNsYXNzZXMoaWNvbkNsYXNzLCAnanAtSWNvbi1jb3ZlcicpLCBzdHlsZXNoZWV0OiBcImxhdW5jaGVyQ2FyZFwiIH0pKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtTGF1bmNoZXJDYXJkLWxhYmVsXCIsIHRpdGxlOiB0aXRsZSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgbGFiZWwpKSkpO1xufVxuLyoqXG4gKiBUaGUgbmFtZXNwYWNlIGZvciBtb2R1bGUgcHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEFuIGluY3JlbWVudGluZyBjb3VudGVyIGZvciBrZXlzLlxuICAgICAqL1xuICAgIGxldCBpZCA9IDA7XG4gICAgLyoqXG4gICAgICogQW4gYXR0YWNoZWQgcHJvcGVydHkgZm9yIGFuIGl0ZW0ncyBrZXkuXG4gICAgICovXG4gICAgUHJpdmF0ZS5rZXlQcm9wZXJ0eSA9IG5ldyBBdHRhY2hlZFByb3BlcnR5KHtcbiAgICAgICAgbmFtZTogJ2tleScsXG4gICAgICAgIGNyZWF0ZTogKCkgPT4gaWQrK1xuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGZ1bGx5IHNwZWNpZmllZCBpdGVtIGdpdmVuIGl0ZW0gb3B0aW9ucy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVJdGVtKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgY2F0ZWdvcnk6IG9wdGlvbnMuY2F0ZWdvcnkgfHwgJycsIHJhbms6IG9wdGlvbnMucmFuayAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5yYW5rIDogSW5maW5pdHkgfSk7XG4gICAgfVxuICAgIFByaXZhdGUuY3JlYXRlSXRlbSA9IGNyZWF0ZUl0ZW07XG4gICAgLyoqXG4gICAgICogQSBzb3J0IGNvbXBhcmlzb24gZnVuY3Rpb24gZm9yIGEgbGF1bmNoZXIgaXRlbS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzb3J0Q21wKGEsIGIsIGN3ZCwgY29tbWFuZHMpIHtcbiAgICAgICAgLy8gRmlyc3QsIGNvbXBhcmUgYnkgcmFuay5cbiAgICAgICAgY29uc3QgcjEgPSBhLnJhbms7XG4gICAgICAgIGNvbnN0IHIyID0gYi5yYW5rO1xuICAgICAgICBpZiAocjEgIT09IHIyICYmIHIxICE9PSB1bmRlZmluZWQgJiYgcjIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHIxIDwgcjIgPyAtMSA6IDE7IC8vIEluZmluaXR5IHNhZmVcbiAgICAgICAgfVxuICAgICAgICAvLyBGaW5hbGx5LCBjb21wYXJlIGJ5IGRpc3BsYXkgbmFtZS5cbiAgICAgICAgY29uc3QgYUxhYmVsID0gY29tbWFuZHMubGFiZWwoYS5jb21tYW5kLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGEuYXJncyksIHsgY3dkIH0pKTtcbiAgICAgICAgY29uc3QgYkxhYmVsID0gY29tbWFuZHMubGFiZWwoYi5jb21tYW5kLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGIuYXJncyksIHsgY3dkIH0pKTtcbiAgICAgICAgcmV0dXJuIGFMYWJlbC5sb2NhbGVDb21wYXJlKGJMYWJlbCk7XG4gICAgfVxuICAgIFByaXZhdGUuc29ydENtcCA9IHNvcnRDbXA7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=