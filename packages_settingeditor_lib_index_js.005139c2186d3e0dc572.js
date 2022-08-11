(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_settingeditor_lib_index_js"],{

/***/ "../../packages/settingeditor/lib/SettingsFormEditor.js":
/*!**************************************************************!*\
  !*** ../../packages/settingeditor/lib/SettingsFormEditor.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsFormEditor": () => (/* binding */ SettingsFormEditor)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling/@lumino/polling");
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_polling__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _rjsf_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @rjsf/core */ "../../node_modules/@rjsf/core/dist/es/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/







/**
 * Indentation to use when saving the settings as JSON document.
 */
const JSON_INDENTATION = 4;
/**
 * Template to allow for custom buttons to re-order/remove entries in an array.
 * Necessary to create accessible buttons.
 */
const CustomArrayTemplateFactory = (translator) => {
    const trans = translator.load('jupyterlab');
    const factory = (props) => {
        var _a;
        return (react__WEBPACK_IMPORTED_MODULE_6___default().createElement("div", { className: props.className },
            react__WEBPACK_IMPORTED_MODULE_6___default().createElement(props.TitleField, { title: props.title, required: props.required, id: `${props.idSchema.$id}-title` }),
            react__WEBPACK_IMPORTED_MODULE_6___default().createElement(props.DescriptionField, { id: `${props.idSchema.$id}-description`, description: (_a = props.schema.description) !== null && _a !== void 0 ? _a : '' }),
            props.items.map(item => {
                return (react__WEBPACK_IMPORTED_MODULE_6___default().createElement("div", { key: item.key, className: item.className },
                    item.children,
                    react__WEBPACK_IMPORTED_MODULE_6___default().createElement("div", { className: "jp-ArrayOperations" },
                        react__WEBPACK_IMPORTED_MODULE_6___default().createElement("button", { className: "jp-mod-styled jp-mod-reject", onClick: item.onReorderClick(item.index, item.index - 1), disabled: !item.hasMoveUp }, trans.__('Move Up')),
                        react__WEBPACK_IMPORTED_MODULE_6___default().createElement("button", { className: "jp-mod-styled jp-mod-reject", onClick: item.onReorderClick(item.index, item.index + 1), disabled: !item.hasMoveDown }, trans.__('Move Down')),
                        react__WEBPACK_IMPORTED_MODULE_6___default().createElement("button", { className: "jp-mod-styled jp-mod-warn", onClick: item.onDropIndexClick(item.index), disabled: !item.hasRemove }, trans.__('Remove')))));
            }),
            props.canAdd && (react__WEBPACK_IMPORTED_MODULE_6___default().createElement("button", { className: "jp-mod-styled jp-mod-reject", onClick: props.onAddClick }, trans.__('Add')))));
    };
    factory.displayName = 'CustomArrayTemplate';
    return factory;
};
/**
 * Template with custom add button, necessary for accessiblity and internationalization.
 */
const CustomObjectTemplateFactory = (translator) => {
    const trans = translator.load('jupyterlab');
    const factory = (props) => {
        const { TitleField, DescriptionField } = props;
        return (react__WEBPACK_IMPORTED_MODULE_6___default().createElement("fieldset", { id: props.idSchema.$id },
            (props.uiSchema['ui:title'] || props.title) && (react__WEBPACK_IMPORTED_MODULE_6___default().createElement(TitleField, { id: `${props.idSchema.$id}__title`, title: props.title || props.uiSchema['ui:title'], required: props.required })),
            props.description && (react__WEBPACK_IMPORTED_MODULE_6___default().createElement(DescriptionField, { id: `${props.idSchema.$id}__description`, description: props.description })),
            props.properties.map(property => property.content),
            _rjsf_core__WEBPACK_IMPORTED_MODULE_5__.utils.canExpand(props.schema, props.uiSchema, props.formData) && (react__WEBPACK_IMPORTED_MODULE_6___default().createElement("button", { className: "jp-mod-styled jp-mod-reject", onClick: props.onAddClick(props.schema), disabled: props.disabled || props.readonly }, trans.__('Add')))));
    };
    factory.displayName = 'CustomObjectTemplate';
    return factory;
};
/**
 * Renders the modified indicator and errors
 */
const CustomTemplate = (props) => {
    var _a;
    const { formData, schema, label, displayLabel, id, formContext, errors, rawErrors, children, onKeyChange, onDropPropertyClick } = props;
    /**
     * Determine if the field has been modified
     * Schema Id is formatted as 'root_<field name>.<nexted field name>'
     * This logic parses out the field name to find the default value
     * before determining if the field has been modified.
     */
    const schemaIds = id.split('_');
    schemaIds.shift();
    const schemaId = schemaIds.join('.');
    let defaultValue;
    if (schemaIds.length === 1) {
        defaultValue = formContext.settings.default(schemaId);
    }
    else if (schemaIds.length > 1) {
        const allDefaultsForObject = {};
        allDefaultsForObject[schemaIds[0]] = formContext.settings.default(schemaIds[0]);
        defaultValue = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.reduce)(schemaIds, (acc, val, i) => {
            return acc === null || acc === void 0 ? void 0 : acc[val];
        }, allDefaultsForObject);
    }
    const isModified = schemaId !== '' &&
        formData !== undefined &&
        defaultValue !== undefined &&
        !schema.properties &&
        schema.type !== 'array' &&
        !_lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.JSONExt.deepEqual(formData, defaultValue);
    const isRoot = schemaId === '';
    const needsDescription = !isRoot &&
        schema.type != 'object' &&
        id !=
            'jp-SettingsEditor-@jupyterlab/shortcuts-extension:shortcuts_shortcuts';
    // While we can implement "remove" button for array items in array template,
    // object templates do not provide a way to do this; instead we need to add
    // buttons here (and first check if the field can be removed = is additional).
    const isAdditional = schema.hasOwnProperty(_rjsf_core__WEBPACK_IMPORTED_MODULE_5__.utils.ADDITIONAL_PROPERTY_FLAG);
    return (react__WEBPACK_IMPORTED_MODULE_6___default().createElement("div", { className: `form-group ${displayLabel || schema.type === 'boolean' ? 'small-field' : ''}` },
        // Only show the modified indicator if there are no errors
        isModified && !rawErrors && react__WEBPACK_IMPORTED_MODULE_6___default().createElement("div", { className: "jp-modifiedIndicator" }),
        // Shows a red indicator for fields that have validation errors
        rawErrors && react__WEBPACK_IMPORTED_MODULE_6___default().createElement("div", { className: "jp-modifiedIndicator jp-errorIndicator" }),
        react__WEBPACK_IMPORTED_MODULE_6___default().createElement("div", { className: "jp-FormGroup-content" },
            displayLabel && !isRoot && label && !isAdditional && (react__WEBPACK_IMPORTED_MODULE_6___default().createElement("h3", { className: "jp-FormGroup-fieldLabel jp-FormGroup-contentItem" }, label)),
            isAdditional && (react__WEBPACK_IMPORTED_MODULE_6___default().createElement("input", { className: "jp-FormGroup-contentItem jp-mod-styled", type: "text", onBlur: event => onKeyChange(event.target.value), defaultValue: label })),
            react__WEBPACK_IMPORTED_MODULE_6___default().createElement("div", { className: `${isRoot
                    ? 'jp-root'
                    : schema.type === 'object'
                        ? 'jp-objectFieldWrapper'
                        : 'jp-inputFieldWrapper jp-FormGroup-contentItem'}` }, children),
            isAdditional && (react__WEBPACK_IMPORTED_MODULE_6___default().createElement("button", { className: "jp-FormGroup-contentItem jp-mod-styled jp-mod-warn jp-FormGroup-removeButton", onClick: onDropPropertyClick(label) }, 'Remove')),
            schema.description && needsDescription && (react__WEBPACK_IMPORTED_MODULE_6___default().createElement("div", { className: "jp-FormGroup-description" }, schema.description)),
            isModified && schema.default !== undefined && (react__WEBPACK_IMPORTED_MODULE_6___default().createElement("div", { className: "jp-FormGroup-default" },
                "Default: ", (_a = schema.default) === null || _a === void 0 ? void 0 :
                _a.toLocaleString())),
            react__WEBPACK_IMPORTED_MODULE_6___default().createElement("div", { className: "validationErrors" }, errors))));
};
/**
 * A React component that prepares the settings for a
 * given plugin to be rendered in the FormEditor.
 */
class SettingsFormEditor extends (react__WEBPACK_IMPORTED_MODULE_6___default().Component) {
    constructor(props) {
        super(props);
        /**
         * Handler for the "Restore to defaults" button - clears all
         * modified settings then calls `setFormData` to restore the
         * values.
         */
        this.reset = async (event) => {
            event.stopPropagation();
            for (const field in this.props.settings.user) {
                await this.props.settings.remove(field);
            }
            this._formData = this.props.settings.composite;
            this.setState({ isModified: false });
        };
        /**
         * Callback on plugin selection
         * @param list Plugin list
         * @param id Plugin id
         */
        this.onSelect = (list, id) => {
            if (id === this.props.settings.id) {
                this.props.onCollapseChange(false);
            }
        };
        this._onChange = (e) => {
            this.props.hasError(e.errors.length !== 0);
            this._formData = e.formData;
            if (e.errors.length === 0) {
                this.props.updateDirtyState(true);
                void this._debouncer.invoke();
            }
            this.props.onSelect(this.props.settings.id);
        };
        const { settings } = props;
        this._formData = settings.composite;
        this.state = {
            isModified: settings.isModified,
            uiSchema: {},
            filteredSchema: this.props.settings.schema,
            arrayFieldTemplate: CustomArrayTemplateFactory(this.props.translator),
            objectFieldTemplate: CustomObjectTemplateFactory(this.props.translator),
            formContext: { settings: this.props.settings }
        };
        this.handleChange = this.handleChange.bind(this);
        this._debouncer = new _lumino_polling__WEBPACK_IMPORTED_MODULE_4__.Debouncer(this.handleChange);
    }
    componentDidMount() {
        this._setUiSchema();
        this._setFilteredSchema();
    }
    componentDidUpdate(prevProps) {
        this._setUiSchema(prevProps.renderers);
        this._setFilteredSchema(prevProps.filteredValues);
        if (prevProps.translator !== this.props.translator) {
            this.setState({
                arrayFieldTemplate: CustomArrayTemplateFactory(this.props.translator),
                objectFieldTemplate: CustomObjectTemplateFactory(this.props.translator)
            });
        }
        if (prevProps.settings !== this.props.settings) {
            this.setState({ formContext: { settings: this.props.settings } });
        }
    }
    /**
     * Handler for edits made in the form editor.
     * @param data - Form data sent from the form editor
     */
    handleChange() {
        // Prevent unnecessary save when opening settings that haven't been modified.
        if (!this.props.settings.isModified &&
            this.props.settings.isDefault(this._formData)) {
            this.props.updateDirtyState(false);
            return;
        }
        this.props.settings
            .save(JSON.stringify(this._formData, undefined, JSON_INDENTATION))
            .then(() => {
            this.props.updateDirtyState(false);
            this.setState({ isModified: this.props.settings.isModified });
        })
            .catch((reason) => {
            this.props.updateDirtyState(false);
            const trans = this.props.translator.load('jupyterlab');
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(trans.__('Error saving settings.'), reason);
        });
    }
    render() {
        const trans = this.props.translator.load('jupyterlab');
        const icon = this.props.isCollapsed ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.caretRightIcon : _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.caretDownIcon;
        return (react__WEBPACK_IMPORTED_MODULE_6___default().createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_6___default().createElement("div", { className: "jp-SettingsHeader", onClick: () => {
                    this.props.onCollapseChange(!this.props.isCollapsed);
                    this.props.onSelect(this.props.settings.id);
                } },
                react__WEBPACK_IMPORTED_MODULE_6___default().createElement("header", { className: "jp-SettingsTitle" },
                    react__WEBPACK_IMPORTED_MODULE_6___default().createElement(icon.react, { tag: "span", elementPosition: "center", className: "jp-SettingsTitle-caret" }),
                    react__WEBPACK_IMPORTED_MODULE_6___default().createElement("h2", null, this.props.settings.schema.title),
                    react__WEBPACK_IMPORTED_MODULE_6___default().createElement("div", { className: "jp-SettingsHeader-description" }, this.props.settings.schema.description)),
                this.state.isModified && (react__WEBPACK_IMPORTED_MODULE_6___default().createElement("button", { className: "jp-RestoreButton", onClick: this.reset }, trans.__('Restore to Defaults')))),
            !this.props.isCollapsed && (react__WEBPACK_IMPORTED_MODULE_6___default().createElement(_rjsf_core__WEBPACK_IMPORTED_MODULE_5__.default, { schema: this.state.filteredSchema, formData: this._formData, FieldTemplate: CustomTemplate, ArrayFieldTemplate: this.state.arrayFieldTemplate, ObjectFieldTemplate: this.state.objectFieldTemplate, uiSchema: this.state.uiSchema, fields: this.props.renderers, formContext: this.state.formContext, liveValidate: true, idPrefix: `jp-SettingsEditor-${this.props.settings.id}`, onChange: this._onChange }))));
    }
    _setUiSchema(prevRenderers) {
        var _a;
        if (!prevRenderers ||
            !_lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.JSONExt.deepEqual(Object.keys(prevRenderers).sort(), Object.keys(this.props.renderers).sort())) {
            /**
             * Construct uiSchema to pass any custom renderers to the form editor.
             */
            const uiSchema = {};
            for (const id in this.props.renderers) {
                if (Object.keys((_a = this.props.settings.schema.properties) !== null && _a !== void 0 ? _a : {}).includes(id)) {
                    uiSchema[id] = {
                        'ui:field': id
                    };
                }
            }
            this.setState({ uiSchema });
        }
    }
    _setFilteredSchema(prevFilteredValues) {
        var _a, _b, _c, _d;
        if (prevFilteredValues === undefined ||
            !_lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.JSONExt.deepEqual(prevFilteredValues, this.props.filteredValues)) {
            /**
             * Only show fields that match search value.
             */
            const filteredSchema = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.JSONExt.deepCopy(this.props.settings.schema);
            if ((_b = (_a = this.props.filteredValues) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0 > 0) {
                for (const field in filteredSchema.properties) {
                    if (!((_c = this.props.filteredValues) === null || _c === void 0 ? void 0 : _c.includes((_d = filteredSchema.properties[field].title) !== null && _d !== void 0 ? _d : field))) {
                        delete filteredSchema.properties[field];
                    }
                }
            }
            this.setState({ filteredSchema });
        }
    }
}
//# sourceMappingURL=SettingsFormEditor.js.map

/***/ }),

/***/ "../../packages/settingeditor/lib/index.js":
/*!*************************************************!*\
  !*** ../../packages/settingeditor/lib/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsEditor": () => (/* reexport safe */ _settingseditor__WEBPACK_IMPORTED_MODULE_0__.SettingsEditor),
/* harmony export */   "JsonSettingEditor": () => (/* reexport safe */ _jsonsettingeditor__WEBPACK_IMPORTED_MODULE_1__.JsonSettingEditor),
/* harmony export */   "IJSONSettingEditorTracker": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_2__.IJSONSettingEditorTracker),
/* harmony export */   "ISettingEditorTracker": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_2__.ISettingEditorTracker)
/* harmony export */ });
/* harmony import */ var _settingseditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settingseditor */ "../../packages/settingeditor/lib/settingseditor.js");
/* harmony import */ var _jsonsettingeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jsonsettingeditor */ "../../packages/settingeditor/lib/jsonsettingeditor.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tokens */ "../../packages/settingeditor/lib/tokens.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module settingeditor
 */



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/settingeditor/lib/inspector.js":
/*!*****************************************************!*\
  !*** ../../packages/settingeditor/lib/inspector.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createInspector": () => (/* binding */ createInspector)
/* harmony export */ });
/* harmony import */ var _jupyterlab_inspector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/inspector */ "webpack/sharing/consume/default/@jupyterlab/inspector/@jupyterlab/inspector");
/* harmony import */ var _jupyterlab_inspector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_inspector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/statedb */ "webpack/sharing/consume/default/@jupyterlab/statedb/@jupyterlab/statedb");
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/




/**
 * Create a raw editor inspector.
 */
function createInspector(editor, rendermime, translator) {
    translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.nullTranslator;
    const trans = translator.load('jupyterlab');
    const connector = new InspectorConnector(editor, translator);
    const inspector = new _jupyterlab_inspector__WEBPACK_IMPORTED_MODULE_0__.InspectorPanel({
        initialContent: trans.__('Any errors will be listed here'),
        translator: translator
    });
    const handler = new _jupyterlab_inspector__WEBPACK_IMPORTED_MODULE_0__.InspectionHandler({
        connector,
        rendermime: rendermime ||
            new _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1__.RenderMimeRegistry({
                initialFactories: _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1__.standardRendererFactories,
                translator: translator
            })
    });
    inspector.addClass('jp-SettingsDebug');
    inspector.source = handler;
    handler.editor = editor.source;
    return inspector;
}
/**
 * The data connector used to populate a code inspector.
 *
 * #### Notes
 * This data connector debounces fetch requests to throttle them at no more than
 * one request per 100ms. This means that using the connector to populate
 * multiple client objects can lead to missed fetch responses.
 */
class InspectorConnector extends _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_2__.DataConnector {
    constructor(editor, translator) {
        super();
        this._current = 0;
        this._editor = editor;
        this._trans = (translator !== null && translator !== void 0 ? translator : _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.nullTranslator).load('jupyterlab');
    }
    /**
     * Fetch inspection requests.
     */
    fetch(request) {
        return new Promise(resolve => {
            // Debounce requests at a rate of 100ms.
            const current = (this._current = window.setTimeout(() => {
                if (current !== this._current) {
                    return resolve(undefined);
                }
                const errors = this._validate(request.text);
                if (!errors) {
                    return resolve({
                        data: { 'text/markdown': this._trans.__('No errors found') },
                        metadata: {}
                    });
                }
                resolve({ data: this.render(errors), metadata: {} });
            }, 100));
        });
    }
    /**
     * Render validation errors as an HTML string.
     */
    render(errors) {
        return {
            'text/markdown': errors.map(this.renderError.bind(this)).join('')
        };
    }
    /**
     * Render an individual validation error as a markdown string.
     */
    renderError(error) {
        var _a;
        switch (error.keyword) {
            case 'additionalProperties':
                return `**\`[${this._trans.__('additional property error')}]\`**
          ${this._trans.__('`%1` is not a valid property', (_a = error.params) === null || _a === void 0 ? void 0 : _a.additionalProperty)}`;
            case 'syntax':
                return `**\`[${this._trans.__('syntax error')}]\`** *${error.message}*`;
            case 'type':
                return `**\`[${this._trans.__('type error')}]\`**
          \`${error.dataPath}\` ${error.message}`;
            default:
                return `**\`[${this._trans.__('error')}]\`** *${error.message}*`;
        }
    }
    _validate(raw) {
        const editor = this._editor;
        if (!editor.settings) {
            return null;
        }
        const { id, schema, version } = editor.settings;
        const data = { composite: {}, user: {} };
        const validator = editor.registry.validator;
        return validator.validateData({ data, id, raw, schema, version }, false);
    }
}
//# sourceMappingURL=inspector.js.map

/***/ }),

/***/ "../../packages/settingeditor/lib/jsonsettingeditor.js":
/*!*************************************************************!*\
  !*** ../../packages/settingeditor/lib/jsonsettingeditor.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsonSettingEditor": () => (/* binding */ JsonSettingEditor)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _plugineditor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plugineditor */ "../../packages/settingeditor/lib/plugineditor.js");
/* harmony import */ var _pluginlist__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pluginlist */ "../../packages/settingeditor/lib/pluginlist.js");
/* harmony import */ var _splitpanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./splitpanel */ "../../packages/settingeditor/lib/splitpanel.js");
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/








/**
 * The ratio panes in the setting editor.
 */
const DEFAULT_LAYOUT = {
    sizes: [1, 3],
    container: {
        editor: 'raw',
        plugin: '',
        sizes: [1, 1]
    }
};
/**
 * An interface for modifying and saving application settings.
 */
class JsonSettingEditor extends _splitpanel__WEBPACK_IMPORTED_MODULE_5__.SplitPanel {
    /**
     * Create a new setting editor.
     */
    constructor(options) {
        super({
            orientation: 'horizontal',
            renderer: _splitpanel__WEBPACK_IMPORTED_MODULE_5__.SplitPanel.defaultRenderer,
            spacing: 1
        });
        this._fetching = null;
        this._saving = false;
        this._state = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.JSONExt.deepCopy(DEFAULT_LAYOUT);
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        const trans = this.translator.load('jupyterlab');
        this.addClass('jp-SettingEditor');
        this.key = options.key;
        this.state = options.state;
        const { commands, editorFactory, rendermime } = options;
        const registry = (this.registry = options.registry);
        const instructions = (this._instructions = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_4__.createElement(react__WEBPACK_IMPORTED_MODULE_4__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("h2", null,
                react__WEBPACK_IMPORTED_MODULE_4__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.jupyterIcon.react, { className: "jp-SettingEditorInstructions-icon", tag: "span", elementPosition: "center", height: "auto", width: "60px" }),
                react__WEBPACK_IMPORTED_MODULE_4__.createElement("span", { className: "jp-SettingEditorInstructions-title" }, trans.__('Settings'))),
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("span", { className: "jp-SettingEditorInstructions-text" }, trans.__('Select a plugin from the list to view and edit its preferences.')))));
        instructions.addClass('jp-SettingEditorInstructions');
        const editor = (this._editor = new _plugineditor__WEBPACK_IMPORTED_MODULE_6__.PluginEditor({
            commands,
            editorFactory,
            registry,
            rendermime,
            translator: this.translator
        }));
        const confirm = () => editor.confirm();
        const list = (this._list = new _pluginlist__WEBPACK_IMPORTED_MODULE_7__.PluginList({
            confirm,
            registry,
            translator: this.translator
        }));
        const when = options.when;
        if (when) {
            this._when = Array.isArray(when) ? Promise.all(when) : when;
        }
        this.addWidget(list);
        this.addWidget(instructions);
        _splitpanel__WEBPACK_IMPORTED_MODULE_5__.SplitPanel.setStretch(list, 0);
        _splitpanel__WEBPACK_IMPORTED_MODULE_5__.SplitPanel.setStretch(instructions, 1);
        _splitpanel__WEBPACK_IMPORTED_MODULE_5__.SplitPanel.setStretch(editor, 1);
        editor.stateChanged.connect(this._onStateChanged, this);
        list.changed.connect(this._onStateChanged, this);
        this.handleMoved.connect(this._onStateChanged, this);
    }
    /**
     * Whether the raw editor revert functionality is enabled.
     */
    get canRevertRaw() {
        return this._editor.raw.canRevert;
    }
    /**
     * Whether the raw editor save functionality is enabled.
     */
    get canSaveRaw() {
        return this._editor.raw.canSave;
    }
    /**
     * Emits when the commands passed in at instantiation change.
     */
    get commandsChanged() {
        return this._editor.raw.commandsChanged;
    }
    /**
     * The currently loaded settings.
     */
    get settings() {
        return this._editor.settings;
    }
    /**
     * The inspectable raw user editor source for the currently loaded settings.
     */
    get source() {
        return this._editor.raw.source;
    }
    /**
     * Dispose of the resources held by the setting editor.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        super.dispose();
        this._editor.dispose();
        this._instructions.dispose();
        this._list.dispose();
    }
    /**
     * Revert raw editor back to original settings.
     */
    revert() {
        this._editor.raw.revert();
    }
    /**
     * Save the contents of the raw editor.
     */
    save() {
        return this._editor.raw.save();
    }
    /**
     * Handle `'after-attach'` messages.
     */
    onAfterAttach(msg) {
        super.onAfterAttach(msg);
        this.hide();
        this._fetchState()
            .then(() => {
            this.show();
            this._setState();
        })
            .catch(reason => {
            console.error('Fetching setting editor state failed', reason);
            this.show();
            this._setState();
        });
    }
    /**
     * Handle `'close-request'` messages.
     */
    onCloseRequest(msg) {
        this._editor
            .confirm()
            .then(() => {
            super.onCloseRequest(msg);
            this.dispose();
        })
            .catch(() => {
            /* no op */
        });
    }
    /**
     * Get the state of the panel.
     */
    _fetchState() {
        if (this._fetching) {
            return this._fetching;
        }
        const { key, state } = this;
        const promises = [state.fetch(key), this._when];
        return (this._fetching = Promise.all(promises).then(([value]) => {
            this._fetching = null;
            if (this._saving) {
                return;
            }
            this._state = Private.normalizeState(value, this._state);
        }));
    }
    /**
     * Handle root level layout state changes.
     */
    async _onStateChanged() {
        this._state.sizes = this.relativeSizes();
        this._state.container = this._editor.state;
        this._state.container.plugin = this._list.selection;
        try {
            await this._saveState();
        }
        catch (error) {
            console.error('Saving setting editor state failed', error);
        }
        this._setState();
    }
    /**
     * Set the state of the setting editor.
     */
    async _saveState() {
        const { key, state } = this;
        const value = this._state;
        this._saving = true;
        try {
            await state.save(key, value);
            this._saving = false;
        }
        catch (error) {
            this._saving = false;
            throw error;
        }
    }
    /**
     * Set the layout sizes.
     */
    _setLayout() {
        const editor = this._editor;
        const state = this._state;
        editor.state = state.container;
        // Allow the message queue (which includes fit requests that might disrupt
        // setting relative sizes) to clear before setting sizes.
        requestAnimationFrame(() => {
            this.setRelativeSizes(state.sizes);
        });
    }
    /**
     * Set the presets of the setting editor.
     */
    _setState() {
        const editor = this._editor;
        const list = this._list;
        const { container } = this._state;
        if (!container.plugin) {
            editor.settings = null;
            list.selection = '';
            this._setLayout();
            return;
        }
        if (editor.settings && editor.settings.id === container.plugin) {
            this._setLayout();
            return;
        }
        const instructions = this._instructions;
        this.registry
            .load(container.plugin)
            .then(settings => {
            if (instructions.isAttached) {
                instructions.parent = null;
            }
            if (!editor.isAttached) {
                this.addWidget(editor);
            }
            editor.settings = settings;
            list.selection = container.plugin;
            this._setLayout();
        })
            .catch(reason => {
            console.error(`Loading ${container.plugin} settings failed.`, reason);
            list.selection = this._state.container.plugin = '';
            editor.settings = null;
            this._setLayout();
        });
    }
}
/**
 * A namespace for private module data.
 */
var Private;
(function (Private) {
    /**
     * Return a normalized restored layout state that defaults to the presets.
     */
    function normalizeState(saved, current) {
        if (!saved) {
            return _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.JSONExt.deepCopy(DEFAULT_LAYOUT);
        }
        if (!('sizes' in saved) || !numberArray(saved.sizes)) {
            saved.sizes = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.JSONExt.deepCopy(DEFAULT_LAYOUT.sizes);
        }
        if (!('container' in saved)) {
            saved.container = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.JSONExt.deepCopy(DEFAULT_LAYOUT.container);
            return saved;
        }
        const container = 'container' in saved &&
            saved.container &&
            typeof saved.container === 'object'
            ? saved.container
            : {};
        saved.container = {
            plugin: typeof container.plugin === 'string'
                ? container.plugin
                : DEFAULT_LAYOUT.container.plugin,
            sizes: numberArray(container.sizes)
                ? container.sizes
                : _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.JSONExt.deepCopy(DEFAULT_LAYOUT.container.sizes)
        };
        return saved;
    }
    Private.normalizeState = normalizeState;
    /**
     * Tests whether an array consists exclusively of numbers.
     */
    function numberArray(value) {
        return Array.isArray(value) && value.every(x => typeof x === 'number');
    }
})(Private || (Private = {}));
//# sourceMappingURL=jsonsettingeditor.js.map

/***/ }),

/***/ "../../packages/settingeditor/lib/plugineditor.js":
/*!********************************************************!*\
  !*** ../../packages/settingeditor/lib/plugineditor.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PluginEditor": () => (/* binding */ PluginEditor)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _raweditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./raweditor */ "../../packages/settingeditor/lib/raweditor.js");
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/






/**
 * The class name added to all plugin editors.
 */
const PLUGIN_EDITOR_CLASS = 'jp-PluginEditor';
/**
 * An individual plugin settings editor.
 */
class PluginEditor extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget {
    /**
     * Create a new plugin editor.
     *
     * @param options - The plugin editor instantiation options.
     */
    constructor(options) {
        super();
        this._settings = null;
        this._stateChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal(this);
        this.addClass(PLUGIN_EDITOR_CLASS);
        const { commands, editorFactory, registry, rendermime, translator } = options;
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        // TODO: Remove this layout. We were using this before when we
        // when we had a way to switch between the raw and table editor
        // Now, the raw editor is the only child and probably could merged into
        // this class directly in the future.
        const layout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.StackedLayout());
        const { onSaveError } = Private;
        this.raw = this._rawEditor = new _raweditor__WEBPACK_IMPORTED_MODULE_5__.RawEditor({
            commands,
            editorFactory,
            onSaveError,
            registry,
            rendermime,
            translator
        });
        this._rawEditor.handleMoved.connect(this._onStateChanged, this);
        layout.addWidget(this._rawEditor);
    }
    /**
     * Tests whether the settings have been modified and need saving.
     */
    get isDirty() {
        return this._rawEditor.isDirty;
    }
    /**
     * The plugin settings being edited.
     */
    get settings() {
        return this._settings;
    }
    set settings(settings) {
        if (this._settings === settings) {
            return;
        }
        const raw = this._rawEditor;
        this._settings = raw.settings = settings;
        this.update();
    }
    /**
     * The plugin editor layout state.
     */
    get state() {
        const plugin = this._settings ? this._settings.id : '';
        const { sizes } = this._rawEditor;
        return { plugin, sizes };
    }
    set state(state) {
        if (_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.JSONExt.deepEqual(this.state, state)) {
            return;
        }
        this._rawEditor.sizes = state.sizes;
        this.update();
    }
    /**
     * A signal that emits when editor layout state changes and needs to be saved.
     */
    get stateChanged() {
        return this._stateChanged;
    }
    /**
     * If the editor is in a dirty state, confirm that the user wants to leave.
     */
    confirm() {
        if (this.isHidden || !this.isAttached || !this.isDirty) {
            return Promise.resolve(undefined);
        }
        return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
            title: this._trans.__('You have unsaved changes.'),
            body: this._trans.__('Do you want to leave without saving?'),
            buttons: [
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: this._trans.__('Cancel') }),
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: this._trans.__('Ok') })
            ]
        }).then(result => {
            if (!result.button.accept) {
                throw new Error('User canceled.');
            }
        });
    }
    /**
     * Dispose of the resources held by the plugin editor.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        super.dispose();
        this._rawEditor.dispose();
    }
    /**
     * Handle `after-attach` messages.
     */
    onAfterAttach(msg) {
        this.update();
    }
    /**
     * Handle `'update-request'` messages.
     */
    onUpdateRequest(msg) {
        const raw = this._rawEditor;
        const settings = this._settings;
        if (!settings) {
            this.hide();
            return;
        }
        this.show();
        raw.show();
    }
    /**
     * Handle layout state changes that need to be saved.
     */
    _onStateChanged() {
        this.stateChanged.emit(undefined);
    }
}
/**
 * A namespace for private module data.
 */
var Private;
(function (Private) {
    /**
     * Handle save errors.
     */
    function onSaveError(reason, translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        const trans = translator.load('jupyterlab');
        console.error(`Saving setting editor value failed: ${reason.message}`);
        void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(trans.__('Your changes were not saved.'), reason);
    }
    Private.onSaveError = onSaveError;
})(Private || (Private = {}));
//# sourceMappingURL=plugineditor.js.map

/***/ }),

/***/ "../../packages/settingeditor/lib/pluginlist.js":
/*!******************************************************!*\
  !*** ../../packages/settingeditor/lib/pluginlist.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PluginList": () => (/* binding */ PluginList)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/






/**
 * The JupyterLab plugin schema key for the setting editor
 * icon class of a plugin.
 */
const ICON_KEY = 'jupyter.lab.setting-icon';
/**
 * The JupyterLab plugin schema key for the setting editor
 * icon class of a plugin.
 */
const ICON_CLASS_KEY = 'jupyter.lab.setting-icon-class';
/**
 * The JupyterLab plugin schema key for the setting editor
 * icon label of a plugin.
 */
const ICON_LABEL_KEY = 'jupyter.lab.setting-icon-label';
/**
 * A list of plugins with editable settings.
 */
class PluginList extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget {
    /**
     * Create a new plugin list.
     */
    constructor(options) {
        var _a;
        super();
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._handleSelectSignal = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._updateFilterSignal = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._allPlugins = [];
        this._settings = {};
        this._scrollTop = 0;
        this._selection = '';
        this.registry = options.registry;
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this.addClass('jp-PluginList');
        this._confirm = options.confirm;
        this.registry.pluginChanged.connect(() => {
            this.update();
        }, this);
        this.mapPlugins = this.mapPlugins.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.setFilter((0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.updateFilterFunction)((_a = options.query) !== null && _a !== void 0 ? _a : '', false, false));
        this.setError = this.setError.bind(this);
        this._evtMousedown = this._evtMousedown.bind(this);
        this._query = options.query;
        this._allPlugins = PluginList.sortPlugins(this.registry).filter(plugin => {
            var _a;
            const { schema } = plugin;
            const deprecated = schema['jupyter.lab.setting-deprecated'] === true;
            const editable = Object.keys(schema.properties || {}).length > 0;
            const extensible = schema.additionalProperties !== false;
            // Filters out a couple of plugins that take too long to load in the new settings editor.
            const correctEditor = 
            // If this is the json settings editor, anything is fine
            this._confirm ||
                // If this is the new settings editor, remove context menu / main menu settings.
                (!this._confirm && !((_a = options.toSkip) !== null && _a !== void 0 ? _a : []).includes(plugin.id));
            return !deprecated && correctEditor && (editable || extensible);
        });
        /**
         * Loads all settings and stores them for easy access when displaying search results.
         */
        const loadSettings = async () => {
            for (const plugin of this._allPlugins) {
                const pluginSettings = (await this.registry.load(plugin.id));
                this._settings[plugin.id] = pluginSettings;
            }
            this.update();
        };
        void loadSettings();
        this._errors = {};
        this.selection = this._allPlugins[0].id;
    }
    /**
     * A signal emitted when a list user interaction happens.
     */
    get changed() {
        return this._changed;
    }
    /**
     * The selection value of the plugin list.
     */
    get scrollTop() {
        var _a;
        return (_a = this.node.querySelector('ul')) === null || _a === void 0 ? void 0 : _a.scrollTop;
    }
    get hasErrors() {
        for (const id in this._errors) {
            if (this._errors[id]) {
                return true;
            }
        }
        return false;
    }
    get filter() {
        return this._filter;
    }
    /**
     * The selection value of the plugin list.
     */
    get selection() {
        return this._selection;
    }
    set selection(selection) {
        this._selection = selection;
        this.update();
    }
    /**
     * Signal that fires when search filter is updated so that settings panel can filter results.
     */
    get updateFilterSignal() {
        return this._updateFilterSignal;
    }
    get handleSelectSignal() {
        return this._handleSelectSignal;
    }
    /**
     * Handle `'update-request'` messages.
     */
    onUpdateRequest(msg) {
        const ul = this.node.querySelector('ul');
        if (ul && this._scrollTop !== undefined) {
            ul.scrollTop = this._scrollTop;
        }
        super.onUpdateRequest(msg);
    }
    /**
     * Handle the `'mousedown'` event for the plugin list.
     *
     * @param event - The DOM event sent to the widget
     */
    _evtMousedown(event) {
        const target = event.currentTarget;
        const id = target.getAttribute('data-id');
        if (!id) {
            return;
        }
        if (this._confirm) {
            this._confirm(id)
                .then(() => {
                this.selection = id;
                this._changed.emit(undefined);
                this.update();
            })
                .catch(() => {
                /* no op */
            });
        }
        else {
            this._scrollTop = this.scrollTop;
            this._selection = id;
            this._handleSelectSignal.emit(id);
            this._changed.emit(undefined);
            this.update();
        }
    }
    /**
     * Check the plugin for a rendering hint's value.
     *
     * #### Notes
     * The order of priority for overridden hints is as follows, from most
     * important to least:
     * 1. Data set by the end user in a settings file.
     * 2. Data set by the plugin author as a schema default.
     * 3. Data set by the plugin author as a top-level key of the schema.
     */
    getHint(key, registry, plugin) {
        // First, give priority to checking if the hint exists in the user data.
        let hint = plugin.data.user[key];
        // Second, check to see if the hint exists in composite data, which folds
        // in default values from the schema.
        if (!hint) {
            hint = plugin.data.composite[key];
        }
        // Third, check to see if the plugin schema has defined the hint.
        if (!hint) {
            hint = plugin.schema[key];
        }
        // Finally, use the defaults from the registry schema.
        if (!hint) {
            const { properties } = registry.schema;
            hint = properties && properties[key] && properties[key].default;
        }
        return typeof hint === 'string' ? hint : '';
    }
    /**
     * Function to recursively filter properties that match search results.
     * @param filter - Function to filter based on search results
     * @param props - Schema properties being filtered
     * @param definitions - Definitions to use for filling in references in properties
     * @param ref - Reference to a definition
     * @returns - String array of properties that match the search results.
     */
    getFilterString(filter, props, definitions, ref) {
        var _a;
        // If properties given are references, populate properties
        // with corresponding definition.
        if (ref && definitions) {
            ref = ref.replace('#/definitions/', '');
            props = (_a = definitions[ref]) !== null && _a !== void 0 ? _a : {};
        }
        // If given properties are an object, advance into the properties
        // for that object instead.
        if (props.properties) {
            props = props.properties;
            // If given properties are an array, advance into the properties
            // for the items instead.
        }
        else if (props.items) {
            props = props.items;
            // Otherwise, you've reached the base case and don't need to check for matching properties
        }
        else {
            return [];
        }
        // If reference found, recurse
        if (props['$ref']) {
            return this.getFilterString(filter, props, definitions, props['$ref']);
        }
        // Make sure props is non-empty before calling reduce
        if (Object.keys(props).length === 0) {
            return [];
        }
        // Iterate through the properties and check for titles / descriptions that match search.
        return Object.keys(props).reduce((acc, value) => {
            var _a, _b;
            // If this is the base case, check for matching title / description
            const subProps = props[value];
            if (!subProps) {
                if (filter((_a = props.title) !== null && _a !== void 0 ? _a : '')) {
                    return props.title;
                }
                if (filter(value)) {
                    return value;
                }
            }
            // If there are properties in the object, check for title / description
            if (filter((_b = subProps.title) !== null && _b !== void 0 ? _b : '')) {
                acc.push(subProps.title);
            }
            if (filter(value)) {
                acc.push(value);
            }
            // Finally, recurse on the properties left.
            acc.concat(this.getFilterString(filter, subProps, definitions, subProps['$ref']));
            return acc;
        }, []);
    }
    /**
     * Updates the filter when the search bar value changes.
     * @param filter Filter function passed by search bar based on search value.
     */
    setFilter(filter, query) {
        this._filter = (plugin) => {
            var _a, _b;
            if (filter((_a = plugin.schema.title) !== null && _a !== void 0 ? _a : '')) {
                return null;
            }
            const filtered = this.getFilterString(filter, (_b = plugin.schema) !== null && _b !== void 0 ? _b : {}, plugin.schema.definitions);
            return filtered;
        };
        this._query = query;
        this._updateFilterSignal.emit(this._filter);
        this.update();
    }
    setError(id, error) {
        if (this._errors[id] !== error) {
            this._errors[id] = error;
            this.update();
        }
        else {
            this._errors[id] = error;
        }
    }
    mapPlugins(plugin) {
        var _a, _b, _c, _d;
        const { id, schema, version } = plugin;
        const trans = this.translator.load('jupyterlab');
        const title = typeof schema.title === 'string' ? trans._p('schema', schema.title) : id;
        const highlightedTitleIndices = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.StringExt.matchSumOfSquares(title.toLocaleLowerCase(), (_b = (_a = this._query) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) !== null && _b !== void 0 ? _b : '');
        const hightlightedTitle = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.StringExt.highlight(title, (_c = highlightedTitleIndices === null || highlightedTitleIndices === void 0 ? void 0 : highlightedTitleIndices.indices) !== null && _c !== void 0 ? _c : [], chunk => {
            return react__WEBPACK_IMPORTED_MODULE_5___default().createElement("mark", null, chunk);
        });
        const description = typeof schema.description === 'string'
            ? trans._p('schema', schema.description)
            : '';
        const itemTitle = `${description}\n${id}\n${version}`;
        const icon = this.getHint(ICON_KEY, this.registry, plugin);
        const iconClass = this.getHint(ICON_CLASS_KEY, this.registry, plugin);
        const iconTitle = this.getHint(ICON_LABEL_KEY, this.registry, plugin);
        const filteredProperties = (_d = this._filter(plugin)) === null || _d === void 0 ? void 0 : _d.map(fieldValue => {
            var _a, _b, _c;
            const highlightedIndices = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.StringExt.matchSumOfSquares(fieldValue.toLocaleLowerCase(), (_b = (_a = this._query) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) !== null && _b !== void 0 ? _b : '');
            const highlighted = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.StringExt.highlight(fieldValue, (_c = highlightedIndices === null || highlightedIndices === void 0 ? void 0 : highlightedIndices.indices) !== null && _c !== void 0 ? _c : [], chunk => {
                return react__WEBPACK_IMPORTED_MODULE_5___default().createElement("mark", null, chunk);
            });
            return react__WEBPACK_IMPORTED_MODULE_5___default().createElement("li", { key: `${id}-${fieldValue}` },
                " ",
                highlighted,
                " ");
        });
        return (react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", { onClick: this._evtMousedown, className: `${id === this.selection
                ? 'jp-mod-selected jp-PluginList-entry'
                : 'jp-PluginList-entry'} ${this._errors[id] ? 'jp-ErrorPlugin' : ''}`, "data-id": id, key: id, title: itemTitle },
            react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", { className: "jp-pluginList-entry-label", role: "tab" },
                react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", { className: "jp-SelectedIndicator" }),
                react__WEBPACK_IMPORTED_MODULE_5___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.LabIcon.resolveReact, { icon: icon || (iconClass ? undefined : _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.settingsIcon), iconClass: (0,_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.classes)(iconClass, 'jp-Icon'), title: iconTitle, tag: "span", stylesheet: "settingsEditor" }),
                react__WEBPACK_IMPORTED_MODULE_5___default().createElement("span", null, hightlightedTitle)),
            react__WEBPACK_IMPORTED_MODULE_5___default().createElement("ul", null, filteredProperties)));
    }
    render() {
        const trans = this.translator.load('jupyterlab');
        // Filter all plugins based on search value before displaying list.
        const allPlugins = this._allPlugins.filter(plugin => {
            const filtered = this._filter(plugin);
            return filtered === null || filtered.length > 0;
        });
        const modifiedPlugins = allPlugins.filter(plugin => {
            var _a;
            return (_a = this._settings[plugin.id]) === null || _a === void 0 ? void 0 : _a.isModified;
        });
        const modifiedItems = modifiedPlugins.map(this.mapPlugins);
        const otherItems = allPlugins
            .filter(plugin => {
            return !modifiedPlugins.includes(plugin);
        })
            .map(this.mapPlugins);
        return (react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", { className: "jp-PluginList-wrapper" },
            react__WEBPACK_IMPORTED_MODULE_5___default().createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.FilterBox, { updateFilter: this.setFilter, useFuzzyFilter: false, placeholder: trans.__('Search…'), forceRefresh: false, caseSensitive: false, initialQuery: this._query }),
            modifiedItems.length > 0 && (react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_5___default().createElement("h1", { className: "jp-PluginList-header" }, trans.__('Modified')),
                react__WEBPACK_IMPORTED_MODULE_5___default().createElement("ul", null, modifiedItems))),
            otherItems.length > 0 && (react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_5___default().createElement("h1", { className: "jp-PluginList-header" }, trans.__('Settings')),
                react__WEBPACK_IMPORTED_MODULE_5___default().createElement("ul", null, otherItems))),
            modifiedItems.length === 0 && otherItems.length === 0 && (react__WEBPACK_IMPORTED_MODULE_5___default().createElement("p", { className: "jp-PluginList-noResults" }, trans.__('No items match your search.')))));
    }
}
/**
 * A namespace for `PluginList` statics.
 */
(function (PluginList) {
    /**
     * Sort a list of plugins by title and ID.
     */
    function sortPlugins(registry) {
        return Object.keys(registry.plugins)
            .map(plugin => registry.plugins[plugin])
            .sort((a, b) => {
            return (a.schema.title || a.id).localeCompare(b.schema.title || b.id);
        });
    }
    PluginList.sortPlugins = sortPlugins;
})(PluginList || (PluginList = {}));
//# sourceMappingURL=pluginlist.js.map

/***/ }),

/***/ "../../packages/settingeditor/lib/raweditor.js":
/*!*****************************************************!*\
  !*** ../../packages/settingeditor/lib/raweditor.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RawEditor": () => (/* binding */ RawEditor)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _inspector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./inspector */ "../../packages/settingeditor/lib/inspector.js");
/* harmony import */ var _splitpanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./splitpanel */ "../../packages/settingeditor/lib/splitpanel.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







/**
 * A class name added to all raw editors.
 */
const RAW_EDITOR_CLASS = 'jp-SettingsRawEditor';
/**
 * A class name added to the user settings editor.
 */
const USER_CLASS = 'jp-SettingsRawEditor-user';
/**
 * A class name added to the user editor when there are validation errors.
 */
const ERROR_CLASS = 'jp-mod-error';
/**
 * A raw JSON settings editor.
 */
class RawEditor extends _splitpanel__WEBPACK_IMPORTED_MODULE_5__.SplitPanel {
    /**
     * Create a new plugin editor.
     */
    constructor(options) {
        super({
            orientation: 'horizontal',
            renderer: _splitpanel__WEBPACK_IMPORTED_MODULE_5__.SplitPanel.defaultRenderer,
            spacing: 1
        });
        this._canRevert = false;
        this._canSave = false;
        this._commandsChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal(this);
        this._settings = null;
        this._toolbar = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Toolbar();
        const { commands, editorFactory, registry, translator } = options;
        this.registry = registry;
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        this._commands = commands;
        // Create read-only defaults editor.
        const defaults = (this._defaults = new _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditorWrapper({
            model: new _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditor.Model(),
            factory: editorFactory
        }));
        defaults.editor.model.value.text = '';
        defaults.editor.model.mimeType = 'text/javascript';
        defaults.editor.setOption('readOnly', true);
        // Create read-write user settings editor.
        const user = (this._user = new _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditorWrapper({
            model: new _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditor.Model(),
            factory: editorFactory,
            config: { lineNumbers: true }
        }));
        user.addClass(USER_CLASS);
        user.editor.model.mimeType = 'text/javascript';
        user.editor.model.value.changed.connect(this._onTextChanged, this);
        // Create and set up an inspector.
        this._inspector = (0,_inspector__WEBPACK_IMPORTED_MODULE_6__.createInspector)(this, options.rendermime, this.translator);
        this.addClass(RAW_EDITOR_CLASS);
        // FIXME-TRANS: onSaveError must have an optional translator?
        this._onSaveError = options.onSaveError;
        this.addWidget(Private.defaultsEditor(defaults, this.translator));
        this.addWidget(Private.userEditor(user, this._toolbar, this._inspector, this.translator));
    }
    /**
     * Whether the raw editor revert functionality is enabled.
     */
    get canRevert() {
        return this._canRevert;
    }
    /**
     * Whether the raw editor save functionality is enabled.
     */
    get canSave() {
        return this._canSave;
    }
    /**
     * Emits when the commands passed in at instantiation change.
     */
    get commandsChanged() {
        return this._commandsChanged;
    }
    /**
     * Tests whether the settings have been modified and need saving.
     */
    get isDirty() {
        var _a, _b;
        return (_b = this._user.editor.model.value.text !== ((_a = this._settings) === null || _a === void 0 ? void 0 : _a.raw)) !== null && _b !== void 0 ? _b : '';
    }
    /**
     * The plugin settings being edited.
     */
    get settings() {
        return this._settings;
    }
    set settings(settings) {
        if (!settings && !this._settings) {
            return;
        }
        const samePlugin = settings && this._settings && settings.plugin === this._settings.plugin;
        if (samePlugin) {
            return;
        }
        const defaults = this._defaults;
        const user = this._user;
        // Disconnect old settings change handler.
        if (this._settings) {
            this._settings.changed.disconnect(this._onSettingsChanged, this);
        }
        if (settings) {
            this._settings = settings;
            this._settings.changed.connect(this._onSettingsChanged, this);
            this._onSettingsChanged();
        }
        else {
            this._settings = null;
            defaults.editor.model.value.text = '';
            user.editor.model.value.text = '';
        }
        this.update();
    }
    /**
     * Get the relative sizes of the two editor panels.
     */
    get sizes() {
        return this.relativeSizes();
    }
    set sizes(sizes) {
        this.setRelativeSizes(sizes);
    }
    /**
     * The inspectable source editor for user input.
     */
    get source() {
        return this._user.editor;
    }
    /**
     * Dispose of the resources held by the raw editor.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        super.dispose();
        this._defaults.dispose();
        this._user.dispose();
    }
    /**
     * Revert the editor back to original settings.
     */
    revert() {
        var _a, _b;
        this._user.editor.model.value.text = (_b = (_a = this.settings) === null || _a === void 0 ? void 0 : _a.raw) !== null && _b !== void 0 ? _b : '';
        this._updateToolbar(false, false);
    }
    /**
     * Save the contents of the raw editor.
     */
    save() {
        if (!this.isDirty || !this._settings) {
            return Promise.resolve(undefined);
        }
        const settings = this._settings;
        const source = this._user.editor.model.value.text;
        return settings
            .save(source)
            .then(() => {
            this._updateToolbar(false, false);
        })
            .catch(reason => {
            this._updateToolbar(true, false);
            this._onSaveError(reason, this.translator);
        });
    }
    /**
     * Handle `after-attach` messages.
     */
    onAfterAttach(msg) {
        Private.populateToolbar(this._commands, this._toolbar);
        this.update();
    }
    /**
     * Handle `'update-request'` messages.
     */
    onUpdateRequest(msg) {
        const settings = this._settings;
        const defaults = this._defaults;
        const user = this._user;
        if (settings) {
            defaults.editor.refresh();
            user.editor.refresh();
        }
    }
    /**
     * Handle text changes in the underlying editor.
     */
    _onTextChanged() {
        const raw = this._user.editor.model.value.text;
        const settings = this._settings;
        this.removeClass(ERROR_CLASS);
        // If there are no settings loaded or there are no changes, bail.
        if (!settings || settings.raw === raw) {
            this._updateToolbar(false, false);
            return;
        }
        const errors = settings.validate(raw);
        if (errors) {
            this.addClass(ERROR_CLASS);
            this._updateToolbar(true, false);
            return;
        }
        this._updateToolbar(true, true);
    }
    /**
     * Handle updates to the settings.
     */
    _onSettingsChanged() {
        var _a, _b;
        const settings = this._settings;
        const defaults = this._defaults;
        const user = this._user;
        defaults.editor.model.value.text = (_a = settings === null || settings === void 0 ? void 0 : settings.annotatedDefaults()) !== null && _a !== void 0 ? _a : '';
        user.editor.model.value.text = (_b = settings === null || settings === void 0 ? void 0 : settings.raw) !== null && _b !== void 0 ? _b : '';
    }
    _updateToolbar(revert = this._canRevert, save = this._canSave) {
        const commands = this._commands;
        this._canRevert = revert;
        this._canSave = save;
        this._commandsChanged.emit([commands.revert, commands.save]);
    }
}
/**
 * A namespace for private module data.
 */
var Private;
(function (Private) {
    /**
     * Returns the wrapped setting defaults editor.
     */
    function defaultsEditor(editor, translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        const trans = translator.load('jupyterlab');
        const widget = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget();
        const layout = (widget.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.BoxLayout({ spacing: 0 }));
        const banner = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget();
        const bar = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Toolbar();
        const defaultTitle = trans.__('System Defaults');
        banner.node.innerText = defaultTitle;
        bar.insertItem(0, 'banner', banner);
        layout.addWidget(bar);
        layout.addWidget(editor);
        return widget;
    }
    Private.defaultsEditor = defaultsEditor;
    /**
     * Populate the raw editor toolbar.
     */
    function populateToolbar(commands, toolbar) {
        const { registry, revert, save } = commands;
        toolbar.addItem('spacer', _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Toolbar.createSpacerItem());
        // Note the button order. The rationale here is that no matter what state
        // the toolbar is in, the relative location of the revert button in the
        // toolbar remains the same.
        [revert, save].forEach(name => {
            const item = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.CommandToolbarButton({ commands: registry, id: name });
            toolbar.addItem(name, item);
        });
    }
    Private.populateToolbar = populateToolbar;
    /**
     * Returns the wrapped user overrides editor.
     */
    function userEditor(editor, toolbar, inspector, translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        const trans = translator.load('jupyterlab');
        const userTitle = trans.__('User Preferences');
        const widget = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget();
        const layout = (widget.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.BoxLayout({ spacing: 0 }));
        const banner = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget();
        banner.node.innerText = userTitle;
        toolbar.insertItem(0, 'banner', banner);
        layout.addWidget(toolbar);
        layout.addWidget(editor);
        layout.addWidget(inspector);
        return widget;
    }
    Private.userEditor = userEditor;
})(Private || (Private = {}));
//# sourceMappingURL=raweditor.js.map

/***/ }),

/***/ "../../packages/settingeditor/lib/settingseditor.js":
/*!**********************************************************!*\
  !*** ../../packages/settingeditor/lib/settingseditor.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsEditor": () => (/* binding */ SettingsEditor)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _pluginlist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pluginlist */ "../../packages/settingeditor/lib/pluginlist.js");
/* harmony import */ var _settingspanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./settingspanel */ "../../packages/settingeditor/lib/settingspanel.js");







/**
 * Form based interface for editing settings.
 */
class SettingsEditor extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.SplitPanel {
    constructor(options) {
        super({
            orientation: 'horizontal',
            renderer: _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.SplitPanel.defaultRenderer,
            spacing: 1
        });
        this._clearDirty = null;
        this._dirty = false;
        this._saveStateChange = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(this);
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this._status = options.status;
        const list = (this._list = new _pluginlist__WEBPACK_IMPORTED_MODULE_5__.PluginList({
            registry: options.registry,
            toSkip: options.toSkip,
            translator: this.translator,
            query: options.query
        }));
        this.addWidget(list);
        this.setDirtyState = this.setDirtyState.bind(this);
        /**
         * Initializes the settings panel after loading the schema for all plugins.
         */
        void Promise.all(_pluginlist__WEBPACK_IMPORTED_MODULE_5__.PluginList.sortPlugins(options.registry)
            .filter(plugin => {
            const { schema } = plugin;
            const deprecated = schema['jupyter.lab.setting-deprecated'] === true;
            const editable = Object.keys(schema.properties || {}).length > 0;
            const extensible = schema.additionalProperties !== false;
            return !deprecated && (editable || extensible);
        })
            .map(async (plugin) => await options.registry.load(plugin.id)))
            .then(settings => {
            const settingsPanel = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_settingspanel__WEBPACK_IMPORTED_MODULE_6__.SettingsPanel, { settings: settings.filter(pluginSettings => { var _a; return !((_a = options.toSkip) !== null && _a !== void 0 ? _a : []).includes(pluginSettings.id); }), editorRegistry: options.editorRegistry, handleSelectSignal: this._list.handleSelectSignal, onSelect: (id) => (this._list.selection = id), hasError: this._list.setError, updateFilterSignal: this._list.updateFilterSignal, updateDirtyState: this.setDirtyState, translator: this.translator, initialFilter: this._list.filter }));
            this.addWidget(settingsPanel);
        })
            .catch(reason => {
            console.error(`Fail to load the setting plugins:\n${reason}`);
        });
    }
    /**
     * A signal emitted on the start and end of a saving operation.
     */
    get saveStateChanged() {
        return this._saveStateChange;
    }
    /**
     * Set the dirty state status
     *
     * @param dirty New status
     */
    setDirtyState(dirty) {
        this._dirty = dirty;
        if (this._dirty && !this._clearDirty) {
            this._clearDirty = this._status.setDirty();
        }
        else if (!this._dirty && this._clearDirty) {
            this._clearDirty.dispose();
            this._clearDirty = null;
        }
        if (dirty) {
            if (!this.title.className.includes('jp-mod-dirty')) {
                this.title.className += ' jp-mod-dirty';
            }
        }
        else {
            this.title.className = this.title.className.replace('jp-mod-dirty', '');
        }
        this._saveStateChange.emit(dirty ? 'started' : 'completed');
    }
    /**
     * A message handler invoked on a `'close-request'` message.
     *
     * @param msg Widget message
     */
    onCloseRequest(msg) {
        const trans = this.translator.load('jupyterlab');
        if (this._list.hasErrors) {
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: trans.__('Warning'),
                body: trans.__('Unsaved changes due to validation error. Continue without saving?')
            }).then(value => {
                if (value.button.accept) {
                    this.dispose();
                    super.onCloseRequest(msg);
                }
            });
        }
        else if (this._dirty) {
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: trans.__('Warning'),
                body: trans.__('Some changes have not been saved. Continue without saving?')
            }).then(value => {
                if (value.button.accept) {
                    this.dispose();
                    super.onCloseRequest(msg);
                }
            });
        }
        else {
            this.dispose();
            super.onCloseRequest(msg);
        }
    }
}
//# sourceMappingURL=settingseditor.js.map

/***/ }),

/***/ "../../packages/settingeditor/lib/settingspanel.js":
/*!*********************************************************!*\
  !*** ../../packages/settingeditor/lib/settingspanel.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsPanel": () => (/* binding */ SettingsPanel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SettingsFormEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SettingsFormEditor */ "../../packages/settingeditor/lib/SettingsFormEditor.js");
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/


/**
 * React component that displays a list of SettingsFormEditor
 * components.
 */
const SettingsPanel = ({ settings, editorRegistry, onSelect, handleSelectSignal, hasError, updateDirtyState, updateFilterSignal, translator, initialFilter }) => {
    const [expandedPlugin, setExpandedPlugin] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [filterPlugin, setFilter] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => initialFilter);
    // Refs used to keep track of "selected" plugin based on scroll location
    const editorRefs = {};
    for (const setting of settings) {
        editorRefs[setting.id] = react__WEBPACK_IMPORTED_MODULE_0___default().useRef(null);
    }
    const wrapperRef = react__WEBPACK_IMPORTED_MODULE_0___default().useRef(null);
    const editorDirtyStates = react__WEBPACK_IMPORTED_MODULE_0___default().useRef({});
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        var _a;
        const onFilterUpdate = (list, newFilter) => {
            setFilter(() => newFilter);
            for (const pluginSettings of settings) {
                const filtered = newFilter(pluginSettings.plugin);
                if (filtered === null || filtered.length > 0) {
                    setExpandedPlugin(pluginSettings.id);
                    break;
                }
            }
        };
        // Set first visible plugin as expanded plugin on initial load.
        for (const pluginSettings of settings) {
            const filtered = filterPlugin(pluginSettings.plugin);
            if (filtered === null || filtered.length > 0) {
                setExpandedPlugin(pluginSettings.id);
                break;
            }
        }
        // When filter updates, only show plugins that match search.
        updateFilterSignal.connect(onFilterUpdate);
        const onSelectChange = (list, pluginId) => {
            var _a, _b;
            setExpandedPlugin(expandedPlugin !== pluginId ? pluginId : null);
            // Scroll to the plugin when a selection is made in the left panel.
            (_b = (_a = editorRefs[pluginId]) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.scrollIntoView(true);
        };
        (_a = handleSelectSignal === null || handleSelectSignal === void 0 ? void 0 : handleSelectSignal.connect) === null || _a === void 0 ? void 0 : _a.call(handleSelectSignal, onSelectChange);
        return () => {
            var _a;
            updateFilterSignal.disconnect(onFilterUpdate);
            (_a = handleSelectSignal === null || handleSelectSignal === void 0 ? void 0 : handleSelectSignal.disconnect) === null || _a === void 0 ? void 0 : _a.call(handleSelectSignal, onSelectChange);
        };
    }, []);
    const updateDirtyStates = (id, dirty) => {
        if (editorDirtyStates.current) {
            editorDirtyStates.current[id] = dirty;
            for (const editor in editorDirtyStates.current) {
                if (editorDirtyStates.current[editor]) {
                    updateDirtyState(true);
                    return;
                }
            }
        }
        updateDirtyState(false);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "jp-SettingsPanel", ref: wrapperRef }, settings.map(pluginSettings => {
        // Pass filtered results to SettingsFormEditor to only display filtered fields.
        const filtered = filterPlugin(pluginSettings.plugin);
        // If filtered results are an array, only show if the array is non-empty.
        if (filtered !== null && filtered.length === 0) {
            return undefined;
        }
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { ref: editorRefs[pluginSettings.id], className: "jp-SettingsForm", key: `${pluginSettings.id}SettingsEditor` },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SettingsFormEditor__WEBPACK_IMPORTED_MODULE_1__.SettingsFormEditor, { isCollapsed: pluginSettings.id !== expandedPlugin, onCollapseChange: (willCollapse) => {
                    if (!willCollapse) {
                        setExpandedPlugin(pluginSettings.id);
                    }
                    else if (pluginSettings.id === expandedPlugin) {
                        setExpandedPlugin(null);
                    }
                }, filteredValues: filtered, settings: pluginSettings, renderers: editorRegistry.renderers, hasError: (error) => {
                    hasError(pluginSettings.id, error);
                }, updateDirtyState: (dirty) => {
                    updateDirtyStates(pluginSettings.id, dirty);
                }, onSelect: onSelect, translator: translator })));
    })));
};
//# sourceMappingURL=settingspanel.js.map

/***/ }),

/***/ "../../packages/settingeditor/lib/splitpanel.js":
/*!******************************************************!*\
  !*** ../../packages/settingeditor/lib/splitpanel.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SplitPanel": () => (/* binding */ SplitPanel)
/* harmony export */ });
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_1__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/


/**
 * A deprecated split panel that will be removed when the phosphor split panel
 * supports a handle moved signal. See https://github.com/phosphorjs/phosphor/issues/297.
 */
class SplitPanel extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.SplitPanel {
    constructor() {
        super(...arguments);
        /**
         * Emits when the split handle has moved.
         */
        this.handleMoved = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal(this);
    }
    handleEvent(event) {
        super.handleEvent(event);
        if (event.type === 'mouseup') {
            this.handleMoved.emit(undefined);
        }
    }
}
//# sourceMappingURL=splitpanel.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2V0dGluZ2VkaXRvci9saWIvU2V0dGluZ3NGb3JtRWRpdG9yLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXR0aW5nZWRpdG9yL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2V0dGluZ2VkaXRvci9saWIvaW5zcGVjdG9yLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXR0aW5nZWRpdG9yL2xpYi9qc29uc2V0dGluZ2VkaXRvci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2V0dGluZ2VkaXRvci9saWIvcGx1Z2luZWRpdG9yLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXR0aW5nZWRpdG9yL2xpYi9wbHVnaW5saXN0LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXR0aW5nZWRpdG9yL2xpYi9yYXdlZGl0b3IuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3NldHRpbmdlZGl0b3IvbGliL3NldHRpbmdzZWRpdG9yLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXR0aW5nZWRpdG9yL2xpYi9zZXR0aW5nc3BhbmVsLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9zZXR0aW5nZWRpdG9yL2xpYi9zcGxpdHBhbmVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDd0Q7QUFDa0I7QUFDL0I7QUFDQztBQUNBO0FBQ0g7QUFDZjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsMERBQW1CLFNBQVMsNkJBQTZCO0FBQ3pFLFlBQVksMERBQW1CLG9CQUFvQixzREFBc0QsbUJBQW1CLFNBQVM7QUFDckksWUFBWSwwREFBbUIsMEJBQTBCLFFBQVEsbUJBQW1CLGlHQUFpRztBQUNyTDtBQUNBLHdCQUF3QiwwREFBbUIsU0FBUywyQ0FBMkM7QUFDL0Y7QUFDQSxvQkFBb0IsMERBQW1CLFNBQVMsa0NBQWtDO0FBQ2xGLHdCQUF3QiwwREFBbUIsWUFBWSxnSUFBZ0k7QUFDdkwsd0JBQXdCLDBEQUFtQixZQUFZLGtJQUFrSTtBQUN6TCx3QkFBd0IsMERBQW1CLFlBQVksZ0hBQWdIO0FBQ3ZLLGFBQWE7QUFDYiw2QkFBNkIsMERBQW1CLFlBQVksc0VBQXNFO0FBQ2xJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSwrQkFBK0I7QUFDOUMsZ0JBQWdCLDBEQUFtQixjQUFjLHlCQUF5QjtBQUMxRSw0REFBNEQsMERBQW1CLGNBQWMsUUFBUSxtQkFBbUIsc0ZBQXNGO0FBQzlNLGtDQUFrQywwREFBbUIsb0JBQW9CLFFBQVEsbUJBQW1CLGdEQUFnRDtBQUNwSjtBQUNBLFlBQVksdURBQWUsbURBQW1ELDBEQUFtQixZQUFZLGdJQUFnSTtBQUM3TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHdIQUF3SDtBQUNuSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix5REFBTTtBQUM3QjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGdFQUFpQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQSwrQ0FBK0Msc0VBQThCO0FBQzdFLFlBQVksMERBQW1CLFNBQVMsMEJBQTBCLCtEQUErRCxHQUFHO0FBQ3BJO0FBQ0Esb0NBQW9DLDBEQUFtQixTQUFTLG9DQUFvQztBQUNwRztBQUNBLHFCQUFxQiwwREFBbUIsU0FBUyxzREFBc0Q7QUFDdkcsUUFBUSwwREFBbUIsU0FBUyxvQ0FBb0M7QUFDeEUsa0VBQWtFLDBEQUFtQixRQUFRLGdFQUFnRTtBQUM3Siw2QkFBNkIsMERBQW1CLFdBQVcsMklBQTJJO0FBQ3RNLFlBQVksMERBQW1CLFNBQVMsZUFBZTtBQUN2RDtBQUNBO0FBQ0E7QUFDQSwwRUFBMEUsR0FBRztBQUM3RSw2QkFBNkIsMERBQW1CLFlBQVksaUlBQWlJO0FBQzdMLHVEQUF1RCwwREFBbUIsU0FBUyx3Q0FBd0M7QUFDM0gsMkRBQTJELDBEQUFtQixTQUFTLG9DQUFvQztBQUMzSDtBQUNBO0FBQ0EsWUFBWSwwREFBbUIsU0FBUyxnQ0FBZ0M7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLGlDQUFpQyx3REFBZTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixvQkFBb0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsV0FBVztBQUMxQjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQSw4QkFBOEIsc0RBQVM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSwyQkFBMkIsZUFBZSxnQ0FBZ0MsRUFBRTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDZDQUE2QztBQUN4RSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHNFQUFnQjtBQUNqQyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsOENBQThDLHFFQUFjLEdBQUcsb0VBQWE7QUFDNUUsZ0JBQWdCLDBEQUFtQjtBQUNuQyxZQUFZLDBEQUFtQixTQUFTO0FBQ3hDO0FBQ0E7QUFDQSxpQkFBaUIsRUFBRTtBQUNuQixnQkFBZ0IsMERBQW1CLFlBQVksZ0NBQWdDO0FBQy9FLG9CQUFvQiwwREFBbUIsY0FBYyw4RUFBOEU7QUFDbkksb0JBQW9CLDBEQUFtQjtBQUN2QyxvQkFBb0IsMERBQW1CLFNBQVMsNkNBQTZDO0FBQzdGLDBDQUEwQywwREFBbUIsWUFBWSxxREFBcUQ7QUFDOUgsd0NBQXdDLDBEQUFtQixDQUFDLCtDQUFJLEdBQUcsMFZBQTBWLHVCQUF1Qiw2QkFBNkI7QUFDamQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGdFQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0hBQWdIO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsV0FBVztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxnRUFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLCtEQUFnQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsOEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDaUM7QUFDRztBQUNYO0FBQ3pCLGlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQzBFO0FBQ2E7QUFDbkM7QUFDSztBQUN6RDtBQUNBO0FBQ0E7QUFDTztBQUNQLCtCQUErQixtRUFBYztBQUM3QztBQUNBO0FBQ0EsMEJBQTBCLGlFQUFjO0FBQ3hDO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsd0JBQXdCLG9FQUFpQjtBQUN6QztBQUNBO0FBQ0EsZ0JBQWdCLHNFQUFrQjtBQUNsQyxrQ0FBa0MsNkVBQXlCO0FBQzNEO0FBQ0EsYUFBYTtBQUNiLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyw4REFBYTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1GQUFtRixtRUFBYztBQUNqRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHFEQUFxRDtBQUNwRjtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHlCQUF5Qix3Q0FBd0MsRUFBRTtBQUNuRSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDRDQUE0QztBQUMzRSxZQUFZLCtIQUErSDtBQUMzSTtBQUNBLCtCQUErQiwrQkFBK0IsU0FBUyxjQUFjO0FBQ3JGO0FBQ0EsK0JBQStCLDZCQUE2QjtBQUM1RCxjQUFjLGVBQWUsS0FBSyxjQUFjO0FBQ2hEO0FBQ0EsK0JBQStCLHdCQUF3QixTQUFTLGNBQWM7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHNCQUFzQjtBQUNyQyxzQkFBc0IsY0FBYyxVQUFVO0FBQzlDO0FBQ0EsdUNBQXVDLGlDQUFpQztBQUN4RTtBQUNBO0FBQ0EscUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDbUQ7QUFDTTtBQUNEO0FBQ1o7QUFDYjtBQUNlO0FBQ0o7QUFDQTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sZ0NBQWdDLG1EQUFVO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixtRUFBMEI7QUFDaEQ7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHNCQUFzQiwrREFBZ0I7QUFDdEMsZ0RBQWdELG1FQUFjO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxzQ0FBc0M7QUFDckQ7QUFDQSxtREFBbUQsb0VBQWtCLENBQUMsZ0RBQW1CLENBQUMsMkNBQWM7QUFDeEcsWUFBWSxnREFBbUI7QUFDL0IsZ0JBQWdCLGdEQUFtQixDQUFDLHdFQUFpQixHQUFHLHdIQUF3SDtBQUNoTCxnQkFBZ0IsZ0RBQW1CLFVBQVUsa0RBQWtEO0FBQy9GLFlBQVksZ0RBQW1CLFVBQVUsaURBQWlEO0FBQzFGO0FBQ0EsMkNBQTJDLHVEQUFZO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx1Q0FBdUMsbURBQVU7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsOERBQXFCO0FBQzdCLFFBQVEsOERBQXFCO0FBQzdCLFFBQVEsOERBQXFCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGFBQWE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFlBQVk7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHFDQUFxQyxpQkFBaUI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwr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QUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsYUFBYTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMERBQW1CLFNBQVMsaURBQWlEO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwwREFBbUIsU0FBUywyRUFBMkUsa0JBQWtCLGlCQUFpQjtBQUMxSixZQUFZLDBEQUFtQixDQUFDLG1FQUFrQixHQUFHO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQiw4Q0FBOEM7QUFDL0QsS0FBSztBQUNMO0FBQ0EseUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDMkM7QUFDWTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNPLHlCQUF5Qix1REFBTTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHFEQUFNO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQyIsImZpbGUiOiJwYWNrYWdlc19zZXR0aW5nZWRpdG9yX2xpYl9pbmRleF9qcy4wMDUxMzljMjE4NmQzZTBkYzU3Mi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxufCBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgc2hvd0Vycm9yTWVzc2FnZSB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IGNhcmV0RG93bkljb24sIGNhcmV0UmlnaHRJY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyByZWR1Y2UgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG5pbXBvcnQgeyBKU09ORXh0IH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgRGVib3VuY2VyIH0gZnJvbSAnQGx1bWluby9wb2xsaW5nJztcbmltcG9ydCBGb3JtLCB7IHV0aWxzIH0gZnJvbSAnQHJqc2YvY29yZSc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBJbmRlbnRhdGlvbiB0byB1c2Ugd2hlbiBzYXZpbmcgdGhlIHNldHRpbmdzIGFzIEpTT04gZG9jdW1lbnQuXG4gKi9cbmNvbnN0IEpTT05fSU5ERU5UQVRJT04gPSA0O1xuLyoqXG4gKiBUZW1wbGF0ZSB0byBhbGxvdyBmb3IgY3VzdG9tIGJ1dHRvbnMgdG8gcmUtb3JkZXIvcmVtb3ZlIGVudHJpZXMgaW4gYW4gYXJyYXkuXG4gKiBOZWNlc3NhcnkgdG8gY3JlYXRlIGFjY2Vzc2libGUgYnV0dG9ucy5cbiAqL1xuY29uc3QgQ3VzdG9tQXJyYXlUZW1wbGF0ZUZhY3RvcnkgPSAodHJhbnNsYXRvcikgPT4ge1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgY29uc3QgZmFjdG9yeSA9IChwcm9wcykgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogcHJvcHMuY2xhc3NOYW1lIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KHByb3BzLlRpdGxlRmllbGQsIHsgdGl0bGU6IHByb3BzLnRpdGxlLCByZXF1aXJlZDogcHJvcHMucmVxdWlyZWQsIGlkOiBgJHtwcm9wcy5pZFNjaGVtYS4kaWR9LXRpdGxlYCB9KSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQocHJvcHMuRGVzY3JpcHRpb25GaWVsZCwgeyBpZDogYCR7cHJvcHMuaWRTY2hlbWEuJGlkfS1kZXNjcmlwdGlvbmAsIGRlc2NyaXB0aW9uOiAoX2EgPSBwcm9wcy5zY2hlbWEuZGVzY3JpcHRpb24pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcnIH0pLFxuICAgICAgICAgICAgcHJvcHMuaXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGtleTogaXRlbS5rZXksIGNsYXNzTmFtZTogaXRlbS5jbGFzc05hbWUgfSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlbixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJqcC1BcnJheU9wZXJhdGlvbnNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJqcC1tb2Qtc3R5bGVkIGpwLW1vZC1yZWplY3RcIiwgb25DbGljazogaXRlbS5vblJlb3JkZXJDbGljayhpdGVtLmluZGV4LCBpdGVtLmluZGV4IC0gMSksIGRpc2FibGVkOiAhaXRlbS5oYXNNb3ZlVXAgfSwgdHJhbnMuX18oJ01vdmUgVXAnKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBcImpwLW1vZC1zdHlsZWQganAtbW9kLXJlamVjdFwiLCBvbkNsaWNrOiBpdGVtLm9uUmVvcmRlckNsaWNrKGl0ZW0uaW5kZXgsIGl0ZW0uaW5kZXggKyAxKSwgZGlzYWJsZWQ6ICFpdGVtLmhhc01vdmVEb3duIH0sIHRyYW5zLl9fKCdNb3ZlIERvd24nKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBcImpwLW1vZC1zdHlsZWQganAtbW9kLXdhcm5cIiwgb25DbGljazogaXRlbS5vbkRyb3BJbmRleENsaWNrKGl0ZW0uaW5kZXgpLCBkaXNhYmxlZDogIWl0ZW0uaGFzUmVtb3ZlIH0sIHRyYW5zLl9fKCdSZW1vdmUnKSkpKSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHByb3BzLmNhbkFkZCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJqcC1tb2Qtc3R5bGVkIGpwLW1vZC1yZWplY3RcIiwgb25DbGljazogcHJvcHMub25BZGRDbGljayB9LCB0cmFucy5fXygnQWRkJykpKSkpO1xuICAgIH07XG4gICAgZmFjdG9yeS5kaXNwbGF5TmFtZSA9ICdDdXN0b21BcnJheVRlbXBsYXRlJztcbiAgICByZXR1cm4gZmFjdG9yeTtcbn07XG4vKipcbiAqIFRlbXBsYXRlIHdpdGggY3VzdG9tIGFkZCBidXR0b24sIG5lY2Vzc2FyeSBmb3IgYWNjZXNzaWJsaXR5IGFuZCBpbnRlcm5hdGlvbmFsaXphdGlvbi5cbiAqL1xuY29uc3QgQ3VzdG9tT2JqZWN0VGVtcGxhdGVGYWN0b3J5ID0gKHRyYW5zbGF0b3IpID0+IHtcbiAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgIGNvbnN0IGZhY3RvcnkgPSAocHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgeyBUaXRsZUZpZWxkLCBEZXNjcmlwdGlvbkZpZWxkIH0gPSBwcm9wcztcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIiwgeyBpZDogcHJvcHMuaWRTY2hlbWEuJGlkIH0sXG4gICAgICAgICAgICAocHJvcHMudWlTY2hlbWFbJ3VpOnRpdGxlJ10gfHwgcHJvcHMudGl0bGUpICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KFRpdGxlRmllbGQsIHsgaWQ6IGAke3Byb3BzLmlkU2NoZW1hLiRpZH1fX3RpdGxlYCwgdGl0bGU6IHByb3BzLnRpdGxlIHx8IHByb3BzLnVpU2NoZW1hWyd1aTp0aXRsZSddLCByZXF1aXJlZDogcHJvcHMucmVxdWlyZWQgfSkpLFxuICAgICAgICAgICAgcHJvcHMuZGVzY3JpcHRpb24gJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGVzY3JpcHRpb25GaWVsZCwgeyBpZDogYCR7cHJvcHMuaWRTY2hlbWEuJGlkfV9fZGVzY3JpcHRpb25gLCBkZXNjcmlwdGlvbjogcHJvcHMuZGVzY3JpcHRpb24gfSkpLFxuICAgICAgICAgICAgcHJvcHMucHJvcGVydGllcy5tYXAocHJvcGVydHkgPT4gcHJvcGVydHkuY29udGVudCksXG4gICAgICAgICAgICB1dGlscy5jYW5FeHBhbmQocHJvcHMuc2NoZW1hLCBwcm9wcy51aVNjaGVtYSwgcHJvcHMuZm9ybURhdGEpICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBcImpwLW1vZC1zdHlsZWQganAtbW9kLXJlamVjdFwiLCBvbkNsaWNrOiBwcm9wcy5vbkFkZENsaWNrKHByb3BzLnNjaGVtYSksIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlZCB8fCBwcm9wcy5yZWFkb25seSB9LCB0cmFucy5fXygnQWRkJykpKSkpO1xuICAgIH07XG4gICAgZmFjdG9yeS5kaXNwbGF5TmFtZSA9ICdDdXN0b21PYmplY3RUZW1wbGF0ZSc7XG4gICAgcmV0dXJuIGZhY3Rvcnk7XG59O1xuLyoqXG4gKiBSZW5kZXJzIHRoZSBtb2RpZmllZCBpbmRpY2F0b3IgYW5kIGVycm9yc1xuICovXG5jb25zdCBDdXN0b21UZW1wbGF0ZSA9IChwcm9wcykgPT4ge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCB7IGZvcm1EYXRhLCBzY2hlbWEsIGxhYmVsLCBkaXNwbGF5TGFiZWwsIGlkLCBmb3JtQ29udGV4dCwgZXJyb3JzLCByYXdFcnJvcnMsIGNoaWxkcmVuLCBvbktleUNoYW5nZSwgb25Ecm9wUHJvcGVydHlDbGljayB9ID0gcHJvcHM7XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIGlmIHRoZSBmaWVsZCBoYXMgYmVlbiBtb2RpZmllZFxuICAgICAqIFNjaGVtYSBJZCBpcyBmb3JtYXR0ZWQgYXMgJ3Jvb3RfPGZpZWxkIG5hbWU+LjxuZXh0ZWQgZmllbGQgbmFtZT4nXG4gICAgICogVGhpcyBsb2dpYyBwYXJzZXMgb3V0IHRoZSBmaWVsZCBuYW1lIHRvIGZpbmQgdGhlIGRlZmF1bHQgdmFsdWVcbiAgICAgKiBiZWZvcmUgZGV0ZXJtaW5pbmcgaWYgdGhlIGZpZWxkIGhhcyBiZWVuIG1vZGlmaWVkLlxuICAgICAqL1xuICAgIGNvbnN0IHNjaGVtYUlkcyA9IGlkLnNwbGl0KCdfJyk7XG4gICAgc2NoZW1hSWRzLnNoaWZ0KCk7XG4gICAgY29uc3Qgc2NoZW1hSWQgPSBzY2hlbWFJZHMuam9pbignLicpO1xuICAgIGxldCBkZWZhdWx0VmFsdWU7XG4gICAgaWYgKHNjaGVtYUlkcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlID0gZm9ybUNvbnRleHQuc2V0dGluZ3MuZGVmYXVsdChzY2hlbWFJZCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHNjaGVtYUlkcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNvbnN0IGFsbERlZmF1bHRzRm9yT2JqZWN0ID0ge307XG4gICAgICAgIGFsbERlZmF1bHRzRm9yT2JqZWN0W3NjaGVtYUlkc1swXV0gPSBmb3JtQ29udGV4dC5zZXR0aW5ncy5kZWZhdWx0KHNjaGVtYUlkc1swXSk7XG4gICAgICAgIGRlZmF1bHRWYWx1ZSA9IHJlZHVjZShzY2hlbWFJZHMsIChhY2MsIHZhbCwgaSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGFjYyA9PT0gbnVsbCB8fCBhY2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFjY1t2YWxdO1xuICAgICAgICB9LCBhbGxEZWZhdWx0c0Zvck9iamVjdCk7XG4gICAgfVxuICAgIGNvbnN0IGlzTW9kaWZpZWQgPSBzY2hlbWFJZCAhPT0gJycgJiZcbiAgICAgICAgZm9ybURhdGEgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBkZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAhc2NoZW1hLnByb3BlcnRpZXMgJiZcbiAgICAgICAgc2NoZW1hLnR5cGUgIT09ICdhcnJheScgJiZcbiAgICAgICAgIUpTT05FeHQuZGVlcEVxdWFsKGZvcm1EYXRhLCBkZWZhdWx0VmFsdWUpO1xuICAgIGNvbnN0IGlzUm9vdCA9IHNjaGVtYUlkID09PSAnJztcbiAgICBjb25zdCBuZWVkc0Rlc2NyaXB0aW9uID0gIWlzUm9vdCAmJlxuICAgICAgICBzY2hlbWEudHlwZSAhPSAnb2JqZWN0JyAmJlxuICAgICAgICBpZCAhPVxuICAgICAgICAgICAgJ2pwLVNldHRpbmdzRWRpdG9yLUBqdXB5dGVybGFiL3Nob3J0Y3V0cy1leHRlbnNpb246c2hvcnRjdXRzX3Nob3J0Y3V0cyc7XG4gICAgLy8gV2hpbGUgd2UgY2FuIGltcGxlbWVudCBcInJlbW92ZVwiIGJ1dHRvbiBmb3IgYXJyYXkgaXRlbXMgaW4gYXJyYXkgdGVtcGxhdGUsXG4gICAgLy8gb2JqZWN0IHRlbXBsYXRlcyBkbyBub3QgcHJvdmlkZSBhIHdheSB0byBkbyB0aGlzOyBpbnN0ZWFkIHdlIG5lZWQgdG8gYWRkXG4gICAgLy8gYnV0dG9ucyBoZXJlIChhbmQgZmlyc3QgY2hlY2sgaWYgdGhlIGZpZWxkIGNhbiBiZSByZW1vdmVkID0gaXMgYWRkaXRpb25hbCkuXG4gICAgY29uc3QgaXNBZGRpdGlvbmFsID0gc2NoZW1hLmhhc093blByb3BlcnR5KHV0aWxzLkFERElUSU9OQUxfUFJPUEVSVFlfRkxBRyk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBgZm9ybS1ncm91cCAke2Rpc3BsYXlMYWJlbCB8fCBzY2hlbWEudHlwZSA9PT0gJ2Jvb2xlYW4nID8gJ3NtYWxsLWZpZWxkJyA6ICcnfWAgfSxcbiAgICAgICAgLy8gT25seSBzaG93IHRoZSBtb2RpZmllZCBpbmRpY2F0b3IgaWYgdGhlcmUgYXJlIG5vIGVycm9yc1xuICAgICAgICBpc01vZGlmaWVkICYmICFyYXdFcnJvcnMgJiYgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJqcC1tb2RpZmllZEluZGljYXRvclwiIH0pLFxuICAgICAgICAvLyBTaG93cyBhIHJlZCBpbmRpY2F0b3IgZm9yIGZpZWxkcyB0aGF0IGhhdmUgdmFsaWRhdGlvbiBlcnJvcnNcbiAgICAgICAgcmF3RXJyb3JzICYmIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtbW9kaWZpZWRJbmRpY2F0b3IganAtZXJyb3JJbmRpY2F0b3JcIiB9KSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJqcC1Gb3JtR3JvdXAtY29udGVudFwiIH0sXG4gICAgICAgICAgICBkaXNwbGF5TGFiZWwgJiYgIWlzUm9vdCAmJiBsYWJlbCAmJiAhaXNBZGRpdGlvbmFsICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwianAtRm9ybUdyb3VwLWZpZWxkTGFiZWwganAtRm9ybUdyb3VwLWNvbnRlbnRJdGVtXCIgfSwgbGFiZWwpKSxcbiAgICAgICAgICAgIGlzQWRkaXRpb25hbCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgY2xhc3NOYW1lOiBcImpwLUZvcm1Hcm91cC1jb250ZW50SXRlbSBqcC1tb2Qtc3R5bGVkXCIsIHR5cGU6IFwidGV4dFwiLCBvbkJsdXI6IGV2ZW50ID0+IG9uS2V5Q2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSksIGRlZmF1bHRWYWx1ZTogbGFiZWwgfSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogYCR7aXNSb290XG4gICAgICAgICAgICAgICAgICAgID8gJ2pwLXJvb3QnXG4gICAgICAgICAgICAgICAgICAgIDogc2NoZW1hLnR5cGUgPT09ICdvYmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdqcC1vYmplY3RGaWVsZFdyYXBwZXInXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdqcC1pbnB1dEZpZWxkV3JhcHBlciBqcC1Gb3JtR3JvdXAtY29udGVudEl0ZW0nfWAgfSwgY2hpbGRyZW4pLFxuICAgICAgICAgICAgaXNBZGRpdGlvbmFsICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBcImpwLUZvcm1Hcm91cC1jb250ZW50SXRlbSBqcC1tb2Qtc3R5bGVkIGpwLW1vZC13YXJuIGpwLUZvcm1Hcm91cC1yZW1vdmVCdXR0b25cIiwgb25DbGljazogb25Ecm9wUHJvcGVydHlDbGljayhsYWJlbCkgfSwgJ1JlbW92ZScpKSxcbiAgICAgICAgICAgIHNjaGVtYS5kZXNjcmlwdGlvbiAmJiBuZWVkc0Rlc2NyaXB0aW9uICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLUZvcm1Hcm91cC1kZXNjcmlwdGlvblwiIH0sIHNjaGVtYS5kZXNjcmlwdGlvbikpLFxuICAgICAgICAgICAgaXNNb2RpZmllZCAmJiBzY2hlbWEuZGVmYXVsdCAhPT0gdW5kZWZpbmVkICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLUZvcm1Hcm91cC1kZWZhdWx0XCIgfSxcbiAgICAgICAgICAgICAgICBcIkRlZmF1bHQ6IFwiLCAoX2EgPSBzY2hlbWEuZGVmYXVsdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6XG4gICAgICAgICAgICAgICAgX2EudG9Mb2NhbGVTdHJpbmcoKSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ2YWxpZGF0aW9uRXJyb3JzXCIgfSwgZXJyb3JzKSkpKTtcbn07XG4vKipcbiAqIEEgUmVhY3QgY29tcG9uZW50IHRoYXQgcHJlcGFyZXMgdGhlIHNldHRpbmdzIGZvciBhXG4gKiBnaXZlbiBwbHVnaW4gdG8gYmUgcmVuZGVyZWQgaW4gdGhlIEZvcm1FZGl0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXR0aW5nc0Zvcm1FZGl0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZXIgZm9yIHRoZSBcIlJlc3RvcmUgdG8gZGVmYXVsdHNcIiBidXR0b24gLSBjbGVhcnMgYWxsXG4gICAgICAgICAqIG1vZGlmaWVkIHNldHRpbmdzIHRoZW4gY2FsbHMgYHNldEZvcm1EYXRhYCB0byByZXN0b3JlIHRoZVxuICAgICAgICAgKiB2YWx1ZXMuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJlc2V0ID0gYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmllbGQgaW4gdGhpcy5wcm9wcy5zZXR0aW5ncy51c2VyKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wcm9wcy5zZXR0aW5ncy5yZW1vdmUoZmllbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZm9ybURhdGEgPSB0aGlzLnByb3BzLnNldHRpbmdzLmNvbXBvc2l0ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc01vZGlmaWVkOiBmYWxzZSB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhbGxiYWNrIG9uIHBsdWdpbiBzZWxlY3Rpb25cbiAgICAgICAgICogQHBhcmFtIGxpc3QgUGx1Z2luIGxpc3RcbiAgICAgICAgICogQHBhcmFtIGlkIFBsdWdpbiBpZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vblNlbGVjdCA9IChsaXN0LCBpZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGlkID09PSB0aGlzLnByb3BzLnNldHRpbmdzLmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNvbGxhcHNlQ2hhbmdlKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fb25DaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5oYXNFcnJvcihlLmVycm9ycy5sZW5ndGggIT09IDApO1xuICAgICAgICAgICAgdGhpcy5fZm9ybURhdGEgPSBlLmZvcm1EYXRhO1xuICAgICAgICAgICAgaWYgKGUuZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudXBkYXRlRGlydHlTdGF0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB2b2lkIHRoaXMuX2RlYm91bmNlci5pbnZva2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TZWxlY3QodGhpcy5wcm9wcy5zZXR0aW5ncy5pZCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHsgc2V0dGluZ3MgfSA9IHByb3BzO1xuICAgICAgICB0aGlzLl9mb3JtRGF0YSA9IHNldHRpbmdzLmNvbXBvc2l0ZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGlzTW9kaWZpZWQ6IHNldHRpbmdzLmlzTW9kaWZpZWQsXG4gICAgICAgICAgICB1aVNjaGVtYToge30sXG4gICAgICAgICAgICBmaWx0ZXJlZFNjaGVtYTogdGhpcy5wcm9wcy5zZXR0aW5ncy5zY2hlbWEsXG4gICAgICAgICAgICBhcnJheUZpZWxkVGVtcGxhdGU6IEN1c3RvbUFycmF5VGVtcGxhdGVGYWN0b3J5KHRoaXMucHJvcHMudHJhbnNsYXRvciksXG4gICAgICAgICAgICBvYmplY3RGaWVsZFRlbXBsYXRlOiBDdXN0b21PYmplY3RUZW1wbGF0ZUZhY3RvcnkodGhpcy5wcm9wcy50cmFuc2xhdG9yKSxcbiAgICAgICAgICAgIGZvcm1Db250ZXh0OiB7IHNldHRpbmdzOiB0aGlzLnByb3BzLnNldHRpbmdzIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9kZWJvdW5jZXIgPSBuZXcgRGVib3VuY2VyKHRoaXMuaGFuZGxlQ2hhbmdlKTtcbiAgICB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuX3NldFVpU2NoZW1hKCk7XG4gICAgICAgIHRoaXMuX3NldEZpbHRlcmVkU2NoZW1hKCk7XG4gICAgfVxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgdGhpcy5fc2V0VWlTY2hlbWEocHJldlByb3BzLnJlbmRlcmVycyk7XG4gICAgICAgIHRoaXMuX3NldEZpbHRlcmVkU2NoZW1hKHByZXZQcm9wcy5maWx0ZXJlZFZhbHVlcyk7XG4gICAgICAgIGlmIChwcmV2UHJvcHMudHJhbnNsYXRvciAhPT0gdGhpcy5wcm9wcy50cmFuc2xhdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBhcnJheUZpZWxkVGVtcGxhdGU6IEN1c3RvbUFycmF5VGVtcGxhdGVGYWN0b3J5KHRoaXMucHJvcHMudHJhbnNsYXRvciksXG4gICAgICAgICAgICAgICAgb2JqZWN0RmllbGRUZW1wbGF0ZTogQ3VzdG9tT2JqZWN0VGVtcGxhdGVGYWN0b3J5KHRoaXMucHJvcHMudHJhbnNsYXRvcilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2UHJvcHMuc2V0dGluZ3MgIT09IHRoaXMucHJvcHMuc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBmb3JtQ29udGV4dDogeyBzZXR0aW5nczogdGhpcy5wcm9wcy5zZXR0aW5ncyB9IH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIGVkaXRzIG1hZGUgaW4gdGhlIGZvcm0gZWRpdG9yLlxuICAgICAqIEBwYXJhbSBkYXRhIC0gRm9ybSBkYXRhIHNlbnQgZnJvbSB0aGUgZm9ybSBlZGl0b3JcbiAgICAgKi9cbiAgICBoYW5kbGVDaGFuZ2UoKSB7XG4gICAgICAgIC8vIFByZXZlbnQgdW5uZWNlc3Nhcnkgc2F2ZSB3aGVuIG9wZW5pbmcgc2V0dGluZ3MgdGhhdCBoYXZlbid0IGJlZW4gbW9kaWZpZWQuXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5zZXR0aW5ncy5pc01vZGlmaWVkICYmXG4gICAgICAgICAgICB0aGlzLnByb3BzLnNldHRpbmdzLmlzRGVmYXVsdCh0aGlzLl9mb3JtRGF0YSkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudXBkYXRlRGlydHlTdGF0ZShmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5zZXR0aW5nc1xuICAgICAgICAgICAgLnNhdmUoSlNPTi5zdHJpbmdpZnkodGhpcy5fZm9ybURhdGEsIHVuZGVmaW5lZCwgSlNPTl9JTkRFTlRBVElPTikpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZURpcnR5U3RhdGUoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzTW9kaWZpZWQ6IHRoaXMucHJvcHMuc2V0dGluZ3MuaXNNb2RpZmllZCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZURpcnR5U3RhdGUoZmFsc2UpO1xuICAgICAgICAgICAgY29uc3QgdHJhbnMgPSB0aGlzLnByb3BzLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICAgICAgdm9pZCBzaG93RXJyb3JNZXNzYWdlKHRyYW5zLl9fKCdFcnJvciBzYXZpbmcgc2V0dGluZ3MuJyksIHJlYXNvbik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdGhpcy5wcm9wcy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgaWNvbiA9IHRoaXMucHJvcHMuaXNDb2xsYXBzZWQgPyBjYXJldFJpZ2h0SWNvbiA6IGNhcmV0RG93bkljb247XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJqcC1TZXR0aW5nc0hlYWRlclwiLCBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25Db2xsYXBzZUNoYW5nZSghdGhpcy5wcm9wcy5pc0NvbGxhcHNlZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25TZWxlY3QodGhpcy5wcm9wcy5zZXR0aW5ncy5pZCk7XG4gICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIiwgeyBjbGFzc05hbWU6IFwianAtU2V0dGluZ3NUaXRsZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoaWNvbi5yZWFjdCwgeyB0YWc6IFwic3BhblwiLCBlbGVtZW50UG9zaXRpb246IFwiY2VudGVyXCIsIGNsYXNzTmFtZTogXCJqcC1TZXR0aW5nc1RpdGxlLWNhcmV0XCIgfSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBudWxsLCB0aGlzLnByb3BzLnNldHRpbmdzLnNjaGVtYS50aXRsZSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtU2V0dGluZ3NIZWFkZXItZGVzY3JpcHRpb25cIiB9LCB0aGlzLnByb3BzLnNldHRpbmdzLnNjaGVtYS5kZXNjcmlwdGlvbikpLFxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuaXNNb2RpZmllZCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJqcC1SZXN0b3JlQnV0dG9uXCIsIG9uQ2xpY2s6IHRoaXMucmVzZXQgfSwgdHJhbnMuX18oJ1Jlc3RvcmUgdG8gRGVmYXVsdHMnKSkpKSxcbiAgICAgICAgICAgICF0aGlzLnByb3BzLmlzQ29sbGFwc2VkICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0sIHsgc2NoZW1hOiB0aGlzLnN0YXRlLmZpbHRlcmVkU2NoZW1hLCBmb3JtRGF0YTogdGhpcy5fZm9ybURhdGEsIEZpZWxkVGVtcGxhdGU6IEN1c3RvbVRlbXBsYXRlLCBBcnJheUZpZWxkVGVtcGxhdGU6IHRoaXMuc3RhdGUuYXJyYXlGaWVsZFRlbXBsYXRlLCBPYmplY3RGaWVsZFRlbXBsYXRlOiB0aGlzLnN0YXRlLm9iamVjdEZpZWxkVGVtcGxhdGUsIHVpU2NoZW1hOiB0aGlzLnN0YXRlLnVpU2NoZW1hLCBmaWVsZHM6IHRoaXMucHJvcHMucmVuZGVyZXJzLCBmb3JtQ29udGV4dDogdGhpcy5zdGF0ZS5mb3JtQ29udGV4dCwgbGl2ZVZhbGlkYXRlOiB0cnVlLCBpZFByZWZpeDogYGpwLVNldHRpbmdzRWRpdG9yLSR7dGhpcy5wcm9wcy5zZXR0aW5ncy5pZH1gLCBvbkNoYW5nZTogdGhpcy5fb25DaGFuZ2UgfSkpKSk7XG4gICAgfVxuICAgIF9zZXRVaVNjaGVtYShwcmV2UmVuZGVyZXJzKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKCFwcmV2UmVuZGVyZXJzIHx8XG4gICAgICAgICAgICAhSlNPTkV4dC5kZWVwRXF1YWwoT2JqZWN0LmtleXMocHJldlJlbmRlcmVycykuc29ydCgpLCBPYmplY3Qua2V5cyh0aGlzLnByb3BzLnJlbmRlcmVycykuc29ydCgpKSkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDb25zdHJ1Y3QgdWlTY2hlbWEgdG8gcGFzcyBhbnkgY3VzdG9tIHJlbmRlcmVycyB0byB0aGUgZm9ybSBlZGl0b3IuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0IHVpU2NoZW1hID0ge307XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGlkIGluIHRoaXMucHJvcHMucmVuZGVyZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKChfYSA9IHRoaXMucHJvcHMuc2V0dGluZ3Muc2NoZW1hLnByb3BlcnRpZXMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHt9KS5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdWlTY2hlbWFbaWRdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpOmZpZWxkJzogaWRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdWlTY2hlbWEgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3NldEZpbHRlcmVkU2NoZW1hKHByZXZGaWx0ZXJlZFZhbHVlcykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgIGlmIChwcmV2RmlsdGVyZWRWYWx1ZXMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgIUpTT05FeHQuZGVlcEVxdWFsKHByZXZGaWx0ZXJlZFZhbHVlcywgdGhpcy5wcm9wcy5maWx0ZXJlZFZhbHVlcykpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogT25seSBzaG93IGZpZWxkcyB0aGF0IG1hdGNoIHNlYXJjaCB2YWx1ZS5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRTY2hlbWEgPSBKU09ORXh0LmRlZXBDb3B5KHRoaXMucHJvcHMuc2V0dGluZ3Muc2NoZW1hKTtcbiAgICAgICAgICAgIGlmICgoX2IgPSAoX2EgPSB0aGlzLnByb3BzLmZpbHRlcmVkVmFsdWVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAwID4gMCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZmllbGQgaW4gZmlsdGVyZWRTY2hlbWEucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISgoX2MgPSB0aGlzLnByb3BzLmZpbHRlcmVkVmFsdWVzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaW5jbHVkZXMoKF9kID0gZmlsdGVyZWRTY2hlbWEucHJvcGVydGllc1tmaWVsZF0udGl0bGUpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IGZpZWxkKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBmaWx0ZXJlZFNjaGVtYS5wcm9wZXJ0aWVzW2ZpZWxkXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBmaWx0ZXJlZFNjaGVtYSB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNldHRpbmdzRm9ybUVkaXRvci5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBzZXR0aW5nZWRpdG9yXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vc2V0dGluZ3NlZGl0b3InO1xuZXhwb3J0ICogZnJvbSAnLi9qc29uc2V0dGluZ2VkaXRvcic7XG5leHBvcnQgKiBmcm9tICcuL3Rva2Vucyc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEluc3BlY3Rpb25IYW5kbGVyLCBJbnNwZWN0b3JQYW5lbCB9IGZyb20gJ0BqdXB5dGVybGFiL2luc3BlY3Rvcic7XG5pbXBvcnQgeyBSZW5kZXJNaW1lUmVnaXN0cnksIHN0YW5kYXJkUmVuZGVyZXJGYWN0b3JpZXMgfSBmcm9tICdAanVweXRlcmxhYi9yZW5kZXJtaW1lJztcbmltcG9ydCB7IERhdGFDb25uZWN0b3IgfSBmcm9tICdAanVweXRlcmxhYi9zdGF0ZWRiJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuLyoqXG4gKiBDcmVhdGUgYSByYXcgZWRpdG9yIGluc3BlY3Rvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluc3BlY3RvcihlZGl0b3IsIHJlbmRlcm1pbWUsIHRyYW5zbGF0b3IpIHtcbiAgICB0cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgIGNvbnN0IGNvbm5lY3RvciA9IG5ldyBJbnNwZWN0b3JDb25uZWN0b3IoZWRpdG9yLCB0cmFuc2xhdG9yKTtcbiAgICBjb25zdCBpbnNwZWN0b3IgPSBuZXcgSW5zcGVjdG9yUGFuZWwoe1xuICAgICAgICBpbml0aWFsQ29udGVudDogdHJhbnMuX18oJ0FueSBlcnJvcnMgd2lsbCBiZSBsaXN0ZWQgaGVyZScpLFxuICAgICAgICB0cmFuc2xhdG9yOiB0cmFuc2xhdG9yXG4gICAgfSk7XG4gICAgY29uc3QgaGFuZGxlciA9IG5ldyBJbnNwZWN0aW9uSGFuZGxlcih7XG4gICAgICAgIGNvbm5lY3RvcixcbiAgICAgICAgcmVuZGVybWltZTogcmVuZGVybWltZSB8fFxuICAgICAgICAgICAgbmV3IFJlbmRlck1pbWVSZWdpc3RyeSh7XG4gICAgICAgICAgICAgICAgaW5pdGlhbEZhY3Rvcmllczogc3RhbmRhcmRSZW5kZXJlckZhY3RvcmllcyxcbiAgICAgICAgICAgICAgICB0cmFuc2xhdG9yOiB0cmFuc2xhdG9yXG4gICAgICAgICAgICB9KVxuICAgIH0pO1xuICAgIGluc3BlY3Rvci5hZGRDbGFzcygnanAtU2V0dGluZ3NEZWJ1ZycpO1xuICAgIGluc3BlY3Rvci5zb3VyY2UgPSBoYW5kbGVyO1xuICAgIGhhbmRsZXIuZWRpdG9yID0gZWRpdG9yLnNvdXJjZTtcbiAgICByZXR1cm4gaW5zcGVjdG9yO1xufVxuLyoqXG4gKiBUaGUgZGF0YSBjb25uZWN0b3IgdXNlZCB0byBwb3B1bGF0ZSBhIGNvZGUgaW5zcGVjdG9yLlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIFRoaXMgZGF0YSBjb25uZWN0b3IgZGVib3VuY2VzIGZldGNoIHJlcXVlc3RzIHRvIHRocm90dGxlIHRoZW0gYXQgbm8gbW9yZSB0aGFuXG4gKiBvbmUgcmVxdWVzdCBwZXIgMTAwbXMuIFRoaXMgbWVhbnMgdGhhdCB1c2luZyB0aGUgY29ubmVjdG9yIHRvIHBvcHVsYXRlXG4gKiBtdWx0aXBsZSBjbGllbnQgb2JqZWN0cyBjYW4gbGVhZCB0byBtaXNzZWQgZmV0Y2ggcmVzcG9uc2VzLlxuICovXG5jbGFzcyBJbnNwZWN0b3JDb25uZWN0b3IgZXh0ZW5kcyBEYXRhQ29ubmVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihlZGl0b3IsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fY3VycmVudCA9IDA7XG4gICAgICAgIHRoaXMuX2VkaXRvciA9IGVkaXRvcjtcbiAgICAgICAgdGhpcy5fdHJhbnMgPSAodHJhbnNsYXRvciAhPT0gbnVsbCAmJiB0cmFuc2xhdG9yICE9PSB2b2lkIDAgPyB0cmFuc2xhdG9yIDogbnVsbFRyYW5zbGF0b3IpLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmV0Y2ggaW5zcGVjdGlvbiByZXF1ZXN0cy5cbiAgICAgKi9cbiAgICBmZXRjaChyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIC8vIERlYm91bmNlIHJlcXVlc3RzIGF0IGEgcmF0ZSBvZiAxMDBtcy5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSAodGhpcy5fY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCAhPT0gdGhpcy5fY3VycmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLl92YWxpZGF0ZShyZXF1ZXN0LnRleHQpO1xuICAgICAgICAgICAgICAgIGlmICghZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgJ3RleHQvbWFya2Rvd24nOiB0aGlzLl90cmFucy5fXygnTm8gZXJyb3JzIGZvdW5kJykgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhOiB7fVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IGRhdGE6IHRoaXMucmVuZGVyKGVycm9ycyksIG1ldGFkYXRhOiB7fSB9KTtcbiAgICAgICAgICAgIH0sIDEwMCkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIHZhbGlkYXRpb24gZXJyb3JzIGFzIGFuIEhUTUwgc3RyaW5nLlxuICAgICAqL1xuICAgIHJlbmRlcihlcnJvcnMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICd0ZXh0L21hcmtkb3duJzogZXJyb3JzLm1hcCh0aGlzLnJlbmRlckVycm9yLmJpbmQodGhpcykpLmpvaW4oJycpXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlciBhbiBpbmRpdmlkdWFsIHZhbGlkYXRpb24gZXJyb3IgYXMgYSBtYXJrZG93biBzdHJpbmcuXG4gICAgICovXG4gICAgcmVuZGVyRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBzd2l0Y2ggKGVycm9yLmtleXdvcmQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gYCoqXFxgWyR7dGhpcy5fdHJhbnMuX18oJ2FkZGl0aW9uYWwgcHJvcGVydHkgZXJyb3InKX1dXFxgKipcbiAgICAgICAgICAke3RoaXMuX3RyYW5zLl9fKCdgJTFgIGlzIG5vdCBhIHZhbGlkIHByb3BlcnR5JywgKF9hID0gZXJyb3IucGFyYW1zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkaXRpb25hbFByb3BlcnR5KX1gO1xuICAgICAgICAgICAgY2FzZSAnc3ludGF4JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gYCoqXFxgWyR7dGhpcy5fdHJhbnMuX18oJ3N5bnRheCBlcnJvcicpfV1cXGAqKiAqJHtlcnJvci5tZXNzYWdlfSpgO1xuICAgICAgICAgICAgY2FzZSAndHlwZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAqKlxcYFske3RoaXMuX3RyYW5zLl9fKCd0eXBlIGVycm9yJyl9XVxcYCoqXG4gICAgICAgICAgXFxgJHtlcnJvci5kYXRhUGF0aH1cXGAgJHtlcnJvci5tZXNzYWdlfWA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBgKipcXGBbJHt0aGlzLl90cmFucy5fXygnZXJyb3InKX1dXFxgKiogKiR7ZXJyb3IubWVzc2FnZX0qYDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfdmFsaWRhdGUocmF3KSB7XG4gICAgICAgIGNvbnN0IGVkaXRvciA9IHRoaXMuX2VkaXRvcjtcbiAgICAgICAgaWYgKCFlZGl0b3Iuc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgaWQsIHNjaGVtYSwgdmVyc2lvbiB9ID0gZWRpdG9yLnNldHRpbmdzO1xuICAgICAgICBjb25zdCBkYXRhID0geyBjb21wb3NpdGU6IHt9LCB1c2VyOiB7fSB9O1xuICAgICAgICBjb25zdCB2YWxpZGF0b3IgPSBlZGl0b3IucmVnaXN0cnkudmFsaWRhdG9yO1xuICAgICAgICByZXR1cm4gdmFsaWRhdG9yLnZhbGlkYXRlRGF0YSh7IGRhdGEsIGlkLCByYXcsIHNjaGVtYSwgdmVyc2lvbiB9LCBmYWxzZSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5zcGVjdG9yLmpzLm1hcCIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxufCBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgUmVhY3RXaWRnZXQgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGp1cHl0ZXJJY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyBKU09ORXh0IH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUGx1Z2luRWRpdG9yIH0gZnJvbSAnLi9wbHVnaW5lZGl0b3InO1xuaW1wb3J0IHsgUGx1Z2luTGlzdCB9IGZyb20gJy4vcGx1Z2lubGlzdCc7XG5pbXBvcnQgeyBTcGxpdFBhbmVsIH0gZnJvbSAnLi9zcGxpdHBhbmVsJztcbi8qKlxuICogVGhlIHJhdGlvIHBhbmVzIGluIHRoZSBzZXR0aW5nIGVkaXRvci5cbiAqL1xuY29uc3QgREVGQVVMVF9MQVlPVVQgPSB7XG4gICAgc2l6ZXM6IFsxLCAzXSxcbiAgICBjb250YWluZXI6IHtcbiAgICAgICAgZWRpdG9yOiAncmF3JyxcbiAgICAgICAgcGx1Z2luOiAnJyxcbiAgICAgICAgc2l6ZXM6IFsxLCAxXVxuICAgIH1cbn07XG4vKipcbiAqIEFuIGludGVyZmFjZSBmb3IgbW9kaWZ5aW5nIGFuZCBzYXZpbmcgYXBwbGljYXRpb24gc2V0dGluZ3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBKc29uU2V0dGluZ0VkaXRvciBleHRlbmRzIFNwbGl0UGFuZWwge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBzZXR0aW5nIGVkaXRvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKHtcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgICAgICByZW5kZXJlcjogU3BsaXRQYW5lbC5kZWZhdWx0UmVuZGVyZXIsXG4gICAgICAgICAgICBzcGFjaW5nOiAxXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9mZXRjaGluZyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NhdmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IEpTT05FeHQuZGVlcENvcHkoREVGQVVMVF9MQVlPVVQpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSBvcHRpb25zLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdGhpcy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtU2V0dGluZ0VkaXRvcicpO1xuICAgICAgICB0aGlzLmtleSA9IG9wdGlvbnMua2V5O1xuICAgICAgICB0aGlzLnN0YXRlID0gb3B0aW9ucy5zdGF0ZTtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kcywgZWRpdG9yRmFjdG9yeSwgcmVuZGVybWltZSB9ID0gb3B0aW9ucztcbiAgICAgICAgY29uc3QgcmVnaXN0cnkgPSAodGhpcy5yZWdpc3RyeSA9IG9wdGlvbnMucmVnaXN0cnkpO1xuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSAodGhpcy5faW5zdHJ1Y3Rpb25zID0gUmVhY3RXaWRnZXQuY3JlYXRlKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDJcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KGp1cHl0ZXJJY29uLnJlYWN0LCB7IGNsYXNzTmFtZTogXCJqcC1TZXR0aW5nRWRpdG9ySW5zdHJ1Y3Rpb25zLWljb25cIiwgdGFnOiBcInNwYW5cIiwgZWxlbWVudFBvc2l0aW9uOiBcImNlbnRlclwiLCBoZWlnaHQ6IFwiYXV0b1wiLCB3aWR0aDogXCI2MHB4XCIgfSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwianAtU2V0dGluZ0VkaXRvckluc3RydWN0aW9ucy10aXRsZVwiIH0sIHRyYW5zLl9fKCdTZXR0aW5ncycpKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJqcC1TZXR0aW5nRWRpdG9ySW5zdHJ1Y3Rpb25zLXRleHRcIiB9LCB0cmFucy5fXygnU2VsZWN0IGEgcGx1Z2luIGZyb20gdGhlIGxpc3QgdG8gdmlldyBhbmQgZWRpdCBpdHMgcHJlZmVyZW5jZXMuJykpKSkpO1xuICAgICAgICBpbnN0cnVjdGlvbnMuYWRkQ2xhc3MoJ2pwLVNldHRpbmdFZGl0b3JJbnN0cnVjdGlvbnMnKTtcbiAgICAgICAgY29uc3QgZWRpdG9yID0gKHRoaXMuX2VkaXRvciA9IG5ldyBQbHVnaW5FZGl0b3Ioe1xuICAgICAgICAgICAgY29tbWFuZHMsXG4gICAgICAgICAgICBlZGl0b3JGYWN0b3J5LFxuICAgICAgICAgICAgcmVnaXN0cnksXG4gICAgICAgICAgICByZW5kZXJtaW1lLFxuICAgICAgICAgICAgdHJhbnNsYXRvcjogdGhpcy50cmFuc2xhdG9yXG4gICAgICAgIH0pKTtcbiAgICAgICAgY29uc3QgY29uZmlybSA9ICgpID0+IGVkaXRvci5jb25maXJtKCk7XG4gICAgICAgIGNvbnN0IGxpc3QgPSAodGhpcy5fbGlzdCA9IG5ldyBQbHVnaW5MaXN0KHtcbiAgICAgICAgICAgIGNvbmZpcm0sXG4gICAgICAgICAgICByZWdpc3RyeSxcbiAgICAgICAgICAgIHRyYW5zbGF0b3I6IHRoaXMudHJhbnNsYXRvclxuICAgICAgICB9KSk7XG4gICAgICAgIGNvbnN0IHdoZW4gPSBvcHRpb25zLndoZW47XG4gICAgICAgIGlmICh3aGVuKSB7XG4gICAgICAgICAgICB0aGlzLl93aGVuID0gQXJyYXkuaXNBcnJheSh3aGVuKSA/IFByb21pc2UuYWxsKHdoZW4pIDogd2hlbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZFdpZGdldChsaXN0KTtcbiAgICAgICAgdGhpcy5hZGRXaWRnZXQoaW5zdHJ1Y3Rpb25zKTtcbiAgICAgICAgU3BsaXRQYW5lbC5zZXRTdHJldGNoKGxpc3QsIDApO1xuICAgICAgICBTcGxpdFBhbmVsLnNldFN0cmV0Y2goaW5zdHJ1Y3Rpb25zLCAxKTtcbiAgICAgICAgU3BsaXRQYW5lbC5zZXRTdHJldGNoKGVkaXRvciwgMSk7XG4gICAgICAgIGVkaXRvci5zdGF0ZUNoYW5nZWQuY29ubmVjdCh0aGlzLl9vblN0YXRlQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIGxpc3QuY2hhbmdlZC5jb25uZWN0KHRoaXMuX29uU3RhdGVDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlZC5jb25uZWN0KHRoaXMuX29uU3RhdGVDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgcmF3IGVkaXRvciByZXZlcnQgZnVuY3Rpb25hbGl0eSBpcyBlbmFibGVkLlxuICAgICAqL1xuICAgIGdldCBjYW5SZXZlcnRSYXcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZGl0b3IucmF3LmNhblJldmVydDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgcmF3IGVkaXRvciBzYXZlIGZ1bmN0aW9uYWxpdHkgaXMgZW5hYmxlZC5cbiAgICAgKi9cbiAgICBnZXQgY2FuU2F2ZVJhdygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VkaXRvci5yYXcuY2FuU2F2ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW1pdHMgd2hlbiB0aGUgY29tbWFuZHMgcGFzc2VkIGluIGF0IGluc3RhbnRpYXRpb24gY2hhbmdlLlxuICAgICAqL1xuICAgIGdldCBjb21tYW5kc0NoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZGl0b3IucmF3LmNvbW1hbmRzQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnRseSBsb2FkZWQgc2V0dGluZ3MuXG4gICAgICovXG4gICAgZ2V0IHNldHRpbmdzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yLnNldHRpbmdzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgaW5zcGVjdGFibGUgcmF3IHVzZXIgZWRpdG9yIHNvdXJjZSBmb3IgdGhlIGN1cnJlbnRseSBsb2FkZWQgc2V0dGluZ3MuXG4gICAgICovXG4gICAgZ2V0IHNvdXJjZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VkaXRvci5yYXcuc291cmNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUgc2V0dGluZyBlZGl0b3IuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fZWRpdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fbGlzdC5kaXNwb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldmVydCByYXcgZWRpdG9yIGJhY2sgdG8gb3JpZ2luYWwgc2V0dGluZ3MuXG4gICAgICovXG4gICAgcmV2ZXJ0KCkge1xuICAgICAgICB0aGlzLl9lZGl0b3IucmF3LnJldmVydCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYXZlIHRoZSBjb250ZW50cyBvZiB0aGUgcmF3IGVkaXRvci5cbiAgICAgKi9cbiAgICBzYXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yLnJhdy5zYXZlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgJ2FmdGVyLWF0dGFjaCdgIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIG9uQWZ0ZXJBdHRhY2gobXNnKSB7XG4gICAgICAgIHN1cGVyLm9uQWZ0ZXJBdHRhY2gobXNnKTtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIHRoaXMuX2ZldGNoU3RhdGUoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLl9zZXRTdGF0ZSgpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHJlYXNvbiA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGZXRjaGluZyBzZXR0aW5nIGVkaXRvciBzdGF0ZSBmYWlsZWQnLCByZWFzb24pO1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLl9zZXRTdGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGAnY2xvc2UtcmVxdWVzdCdgIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIG9uQ2xvc2VSZXF1ZXN0KG1zZykge1xuICAgICAgICB0aGlzLl9lZGl0b3JcbiAgICAgICAgICAgIC5jb25maXJtKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHN1cGVyLm9uQ2xvc2VSZXF1ZXN0KG1zZyk7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAvKiBubyBvcCAqL1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzdGF0ZSBvZiB0aGUgcGFuZWwuXG4gICAgICovXG4gICAgX2ZldGNoU3RhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9mZXRjaGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZldGNoaW5nO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsga2V5LCBzdGF0ZSB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBbc3RhdGUuZmV0Y2goa2V5KSwgdGhpcy5fd2hlbl07XG4gICAgICAgIHJldHVybiAodGhpcy5fZmV0Y2hpbmcgPSBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoW3ZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZmV0Y2hpbmcgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NhdmluZykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gUHJpdmF0ZS5ub3JtYWxpemVTdGF0ZSh2YWx1ZSwgdGhpcy5fc3RhdGUpO1xuICAgICAgICB9KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSByb290IGxldmVsIGxheW91dCBzdGF0ZSBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGFzeW5jIF9vblN0YXRlQ2hhbmdlZCgpIHtcbiAgICAgICAgdGhpcy5fc3RhdGUuc2l6ZXMgPSB0aGlzLnJlbGF0aXZlU2l6ZXMoKTtcbiAgICAgICAgdGhpcy5fc3RhdGUuY29udGFpbmVyID0gdGhpcy5fZWRpdG9yLnN0YXRlO1xuICAgICAgICB0aGlzLl9zdGF0ZS5jb250YWluZXIucGx1Z2luID0gdGhpcy5fbGlzdC5zZWxlY3Rpb247XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9zYXZlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NhdmluZyBzZXR0aW5nIGVkaXRvciBzdGF0ZSBmYWlsZWQnLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0U3RhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBzdGF0ZSBvZiB0aGUgc2V0dGluZyBlZGl0b3IuXG4gICAgICovXG4gICAgYXN5bmMgX3NhdmVTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBrZXksIHN0YXRlIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX3N0YXRlO1xuICAgICAgICB0aGlzLl9zYXZpbmcgPSB0cnVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgc3RhdGUuc2F2ZShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX3NhdmluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5fc2F2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGxheW91dCBzaXplcy5cbiAgICAgKi9cbiAgICBfc2V0TGF5b3V0KCkge1xuICAgICAgICBjb25zdCBlZGl0b3IgPSB0aGlzLl9lZGl0b3I7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fc3RhdGU7XG4gICAgICAgIGVkaXRvci5zdGF0ZSA9IHN0YXRlLmNvbnRhaW5lcjtcbiAgICAgICAgLy8gQWxsb3cgdGhlIG1lc3NhZ2UgcXVldWUgKHdoaWNoIGluY2x1ZGVzIGZpdCByZXF1ZXN0cyB0aGF0IG1pZ2h0IGRpc3J1cHRcbiAgICAgICAgLy8gc2V0dGluZyByZWxhdGl2ZSBzaXplcykgdG8gY2xlYXIgYmVmb3JlIHNldHRpbmcgc2l6ZXMuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFJlbGF0aXZlU2l6ZXMoc3RhdGUuc2l6ZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBwcmVzZXRzIG9mIHRoZSBzZXR0aW5nIGVkaXRvci5cbiAgICAgKi9cbiAgICBfc2V0U3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IGVkaXRvciA9IHRoaXMuX2VkaXRvcjtcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMuX2xpc3Q7XG4gICAgICAgIGNvbnN0IHsgY29udGFpbmVyIH0gPSB0aGlzLl9zdGF0ZTtcbiAgICAgICAgaWYgKCFjb250YWluZXIucGx1Z2luKSB7XG4gICAgICAgICAgICBlZGl0b3Iuc2V0dGluZ3MgPSBudWxsO1xuICAgICAgICAgICAgbGlzdC5zZWxlY3Rpb24gPSAnJztcbiAgICAgICAgICAgIHRoaXMuX3NldExheW91dCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlZGl0b3Iuc2V0dGluZ3MgJiYgZWRpdG9yLnNldHRpbmdzLmlkID09PSBjb250YWluZXIucGx1Z2luKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRMYXlvdXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSB0aGlzLl9pbnN0cnVjdGlvbnM7XG4gICAgICAgIHRoaXMucmVnaXN0cnlcbiAgICAgICAgICAgIC5sb2FkKGNvbnRhaW5lci5wbHVnaW4pXG4gICAgICAgICAgICAudGhlbihzZXR0aW5ncyA9PiB7XG4gICAgICAgICAgICBpZiAoaW5zdHJ1Y3Rpb25zLmlzQXR0YWNoZWQpIHtcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnMucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZWRpdG9yLmlzQXR0YWNoZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFdpZGdldChlZGl0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWRpdG9yLnNldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgICAgICBsaXN0LnNlbGVjdGlvbiA9IGNvbnRhaW5lci5wbHVnaW47XG4gICAgICAgICAgICB0aGlzLl9zZXRMYXlvdXQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChyZWFzb24gPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgTG9hZGluZyAke2NvbnRhaW5lci5wbHVnaW59IHNldHRpbmdzIGZhaWxlZC5gLCByZWFzb24pO1xuICAgICAgICAgICAgbGlzdC5zZWxlY3Rpb24gPSB0aGlzLl9zdGF0ZS5jb250YWluZXIucGx1Z2luID0gJyc7XG4gICAgICAgICAgICBlZGl0b3Iuc2V0dGluZ3MgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fc2V0TGF5b3V0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIHByaXZhdGUgbW9kdWxlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbm9ybWFsaXplZCByZXN0b3JlZCBsYXlvdXQgc3RhdGUgdGhhdCBkZWZhdWx0cyB0byB0aGUgcHJlc2V0cy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBub3JtYWxpemVTdGF0ZShzYXZlZCwgY3VycmVudCkge1xuICAgICAgICBpZiAoIXNhdmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTkV4dC5kZWVwQ29weShERUZBVUxUX0xBWU9VVCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEoJ3NpemVzJyBpbiBzYXZlZCkgfHwgIW51bWJlckFycmF5KHNhdmVkLnNpemVzKSkge1xuICAgICAgICAgICAgc2F2ZWQuc2l6ZXMgPSBKU09ORXh0LmRlZXBDb3B5KERFRkFVTFRfTEFZT1VULnNpemVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISgnY29udGFpbmVyJyBpbiBzYXZlZCkpIHtcbiAgICAgICAgICAgIHNhdmVkLmNvbnRhaW5lciA9IEpTT05FeHQuZGVlcENvcHkoREVGQVVMVF9MQVlPVVQuY29udGFpbmVyKTtcbiAgICAgICAgICAgIHJldHVybiBzYXZlZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb250YWluZXIgPSAnY29udGFpbmVyJyBpbiBzYXZlZCAmJlxuICAgICAgICAgICAgc2F2ZWQuY29udGFpbmVyICYmXG4gICAgICAgICAgICB0eXBlb2Ygc2F2ZWQuY29udGFpbmVyID09PSAnb2JqZWN0J1xuICAgICAgICAgICAgPyBzYXZlZC5jb250YWluZXJcbiAgICAgICAgICAgIDoge307XG4gICAgICAgIHNhdmVkLmNvbnRhaW5lciA9IHtcbiAgICAgICAgICAgIHBsdWdpbjogdHlwZW9mIGNvbnRhaW5lci5wbHVnaW4gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgPyBjb250YWluZXIucGx1Z2luXG4gICAgICAgICAgICAgICAgOiBERUZBVUxUX0xBWU9VVC5jb250YWluZXIucGx1Z2luLFxuICAgICAgICAgICAgc2l6ZXM6IG51bWJlckFycmF5KGNvbnRhaW5lci5zaXplcylcbiAgICAgICAgICAgICAgICA/IGNvbnRhaW5lci5zaXplc1xuICAgICAgICAgICAgICAgIDogSlNPTkV4dC5kZWVwQ29weShERUZBVUxUX0xBWU9VVC5jb250YWluZXIuc2l6ZXMpXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBzYXZlZDtcbiAgICB9XG4gICAgUHJpdmF0ZS5ub3JtYWxpemVTdGF0ZSA9IG5vcm1hbGl6ZVN0YXRlO1xuICAgIC8qKlxuICAgICAqIFRlc3RzIHdoZXRoZXIgYW4gYXJyYXkgY29uc2lzdHMgZXhjbHVzaXZlbHkgb2YgbnVtYmVycy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBudW1iZXJBcnJheSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUuZXZlcnkoeCA9PiB0eXBlb2YgeCA9PT0gJ251bWJlcicpO1xuICAgIH1cbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9anNvbnNldHRpbmdlZGl0b3IuanMubWFwIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBEaWFsb2csIHNob3dEaWFsb2csIHNob3dFcnJvck1lc3NhZ2UgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IEpTT05FeHQgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG5pbXBvcnQgeyBTdGFja2VkTGF5b3V0LCBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuaW1wb3J0IHsgUmF3RWRpdG9yIH0gZnJvbSAnLi9yYXdlZGl0b3InO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBhbGwgcGx1Z2luIGVkaXRvcnMuXG4gKi9cbmNvbnN0IFBMVUdJTl9FRElUT1JfQ0xBU1MgPSAnanAtUGx1Z2luRWRpdG9yJztcbi8qKlxuICogQW4gaW5kaXZpZHVhbCBwbHVnaW4gc2V0dGluZ3MgZWRpdG9yLlxuICovXG5leHBvcnQgY2xhc3MgUGx1Z2luRWRpdG9yIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgcGx1Z2luIGVkaXRvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIHBsdWdpbiBlZGl0b3IgaW5zdGFudGlhdGlvbiBvcHRpb25zLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBudWxsO1xuICAgICAgICB0aGlzLl9zdGF0ZUNoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKFBMVUdJTl9FRElUT1JfQ0xBU1MpO1xuICAgICAgICBjb25zdCB7IGNvbW1hbmRzLCBlZGl0b3JGYWN0b3J5LCByZWdpc3RyeSwgcmVuZGVybWltZSwgdHJhbnNsYXRvciB9ID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgdGhpcy5fdHJhbnMgPSB0aGlzLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICAvLyBUT0RPOiBSZW1vdmUgdGhpcyBsYXlvdXQuIFdlIHdlcmUgdXNpbmcgdGhpcyBiZWZvcmUgd2hlbiB3ZVxuICAgICAgICAvLyB3aGVuIHdlIGhhZCBhIHdheSB0byBzd2l0Y2ggYmV0d2VlbiB0aGUgcmF3IGFuZCB0YWJsZSBlZGl0b3JcbiAgICAgICAgLy8gTm93LCB0aGUgcmF3IGVkaXRvciBpcyB0aGUgb25seSBjaGlsZCBhbmQgcHJvYmFibHkgY291bGQgbWVyZ2VkIGludG9cbiAgICAgICAgLy8gdGhpcyBjbGFzcyBkaXJlY3RseSBpbiB0aGUgZnV0dXJlLlxuICAgICAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5sYXlvdXQgPSBuZXcgU3RhY2tlZExheW91dCgpKTtcbiAgICAgICAgY29uc3QgeyBvblNhdmVFcnJvciB9ID0gUHJpdmF0ZTtcbiAgICAgICAgdGhpcy5yYXcgPSB0aGlzLl9yYXdFZGl0b3IgPSBuZXcgUmF3RWRpdG9yKHtcbiAgICAgICAgICAgIGNvbW1hbmRzLFxuICAgICAgICAgICAgZWRpdG9yRmFjdG9yeSxcbiAgICAgICAgICAgIG9uU2F2ZUVycm9yLFxuICAgICAgICAgICAgcmVnaXN0cnksXG4gICAgICAgICAgICByZW5kZXJtaW1lLFxuICAgICAgICAgICAgdHJhbnNsYXRvclxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fcmF3RWRpdG9yLmhhbmRsZU1vdmVkLmNvbm5lY3QodGhpcy5fb25TdGF0ZUNoYW5nZWQsIHRoaXMpO1xuICAgICAgICBsYXlvdXQuYWRkV2lkZ2V0KHRoaXMuX3Jhd0VkaXRvcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRlc3RzIHdoZXRoZXIgdGhlIHNldHRpbmdzIGhhdmUgYmVlbiBtb2RpZmllZCBhbmQgbmVlZCBzYXZpbmcuXG4gICAgICovXG4gICAgZ2V0IGlzRGlydHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yYXdFZGl0b3IuaXNEaXJ0eTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHBsdWdpbiBzZXR0aW5ncyBiZWluZyBlZGl0ZWQuXG4gICAgICovXG4gICAgZ2V0IHNldHRpbmdzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3M7XG4gICAgfVxuICAgIHNldCBzZXR0aW5ncyhzZXR0aW5ncykge1xuICAgICAgICBpZiAodGhpcy5fc2V0dGluZ3MgPT09IHNldHRpbmdzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmF3ID0gdGhpcy5fcmF3RWRpdG9yO1xuICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHJhdy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgcGx1Z2luIGVkaXRvciBsYXlvdXQgc3RhdGUuXG4gICAgICovXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICBjb25zdCBwbHVnaW4gPSB0aGlzLl9zZXR0aW5ncyA/IHRoaXMuX3NldHRpbmdzLmlkIDogJyc7XG4gICAgICAgIGNvbnN0IHsgc2l6ZXMgfSA9IHRoaXMuX3Jhd0VkaXRvcjtcbiAgICAgICAgcmV0dXJuIHsgcGx1Z2luLCBzaXplcyB9O1xuICAgIH1cbiAgICBzZXQgc3RhdGUoc3RhdGUpIHtcbiAgICAgICAgaWYgKEpTT05FeHQuZGVlcEVxdWFsKHRoaXMuc3RhdGUsIHN0YXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Jhd0VkaXRvci5zaXplcyA9IHN0YXRlLnNpemVzO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCB0aGF0IGVtaXRzIHdoZW4gZWRpdG9yIGxheW91dCBzdGF0ZSBjaGFuZ2VzIGFuZCBuZWVkcyB0byBiZSBzYXZlZC5cbiAgICAgKi9cbiAgICBnZXQgc3RhdGVDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGVDaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgZWRpdG9yIGlzIGluIGEgZGlydHkgc3RhdGUsIGNvbmZpcm0gdGhhdCB0aGUgdXNlciB3YW50cyB0byBsZWF2ZS5cbiAgICAgKi9cbiAgICBjb25maXJtKCkge1xuICAgICAgICBpZiAodGhpcy5pc0hpZGRlbiB8fCAhdGhpcy5pc0F0dGFjaGVkIHx8ICF0aGlzLmlzRGlydHkpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICB0aXRsZTogdGhpcy5fdHJhbnMuX18oJ1lvdSBoYXZlIHVuc2F2ZWQgY2hhbmdlcy4nKSxcbiAgICAgICAgICAgIGJvZHk6IHRoaXMuX3RyYW5zLl9fKCdEbyB5b3Ugd2FudCB0byBsZWF2ZSB3aXRob3V0IHNhdmluZz8nKSxcbiAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICBEaWFsb2cuY2FuY2VsQnV0dG9uKHsgbGFiZWw6IHRoaXMuX3RyYW5zLl9fKCdDYW5jZWwnKSB9KSxcbiAgICAgICAgICAgICAgICBEaWFsb2cub2tCdXR0b24oeyBsYWJlbDogdGhpcy5fdHJhbnMuX18oJ09rJykgfSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQuYnV0dG9uLmFjY2VwdCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVXNlciBjYW5jZWxlZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSBwbHVnaW4gZWRpdG9yLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX3Jhd0VkaXRvci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgYWZ0ZXItYXR0YWNoYCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBvbkFmdGVyQXR0YWNoKG1zZykge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYCd1cGRhdGUtcmVxdWVzdCdgIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIG9uVXBkYXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgY29uc3QgcmF3ID0gdGhpcy5fcmF3RWRpdG9yO1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuX3NldHRpbmdzO1xuICAgICAgICBpZiAoIXNldHRpbmdzKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgcmF3LnNob3coKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGxheW91dCBzdGF0ZSBjaGFuZ2VzIHRoYXQgbmVlZCB0byBiZSBzYXZlZC5cbiAgICAgKi9cbiAgICBfb25TdGF0ZUNoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VkLmVtaXQodW5kZWZpbmVkKTtcbiAgICB9XG59XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIG1vZHVsZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBzYXZlIGVycm9ycy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBvblNhdmVFcnJvcihyZWFzb24sIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFNhdmluZyBzZXR0aW5nIGVkaXRvciB2YWx1ZSBmYWlsZWQ6ICR7cmVhc29uLm1lc3NhZ2V9YCk7XG4gICAgICAgIHZvaWQgc2hvd0Vycm9yTWVzc2FnZSh0cmFucy5fXygnWW91ciBjaGFuZ2VzIHdlcmUgbm90IHNhdmVkLicpLCByZWFzb24pO1xuICAgIH1cbiAgICBQcml2YXRlLm9uU2F2ZUVycm9yID0gb25TYXZlRXJyb3I7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBsdWdpbmVkaXRvci5qcy5tYXAiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEZpbHRlckJveCwgUmVhY3RXaWRnZXQsIHVwZGF0ZUZpbHRlckZ1bmN0aW9uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBjbGFzc2VzLCBMYWJJY29uLCBzZXR0aW5nc0ljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IFN0cmluZ0V4dCB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4vKipcbiAqIFRoZSBKdXB5dGVyTGFiIHBsdWdpbiBzY2hlbWEga2V5IGZvciB0aGUgc2V0dGluZyBlZGl0b3JcbiAqIGljb24gY2xhc3Mgb2YgYSBwbHVnaW4uXG4gKi9cbmNvbnN0IElDT05fS0VZID0gJ2p1cHl0ZXIubGFiLnNldHRpbmctaWNvbic7XG4vKipcbiAqIFRoZSBKdXB5dGVyTGFiIHBsdWdpbiBzY2hlbWEga2V5IGZvciB0aGUgc2V0dGluZyBlZGl0b3JcbiAqIGljb24gY2xhc3Mgb2YgYSBwbHVnaW4uXG4gKi9cbmNvbnN0IElDT05fQ0xBU1NfS0VZID0gJ2p1cHl0ZXIubGFiLnNldHRpbmctaWNvbi1jbGFzcyc7XG4vKipcbiAqIFRoZSBKdXB5dGVyTGFiIHBsdWdpbiBzY2hlbWEga2V5IGZvciB0aGUgc2V0dGluZyBlZGl0b3JcbiAqIGljb24gbGFiZWwgb2YgYSBwbHVnaW4uXG4gKi9cbmNvbnN0IElDT05fTEFCRUxfS0VZID0gJ2p1cHl0ZXIubGFiLnNldHRpbmctaWNvbi1sYWJlbCc7XG4vKipcbiAqIEEgbGlzdCBvZiBwbHVnaW5zIHdpdGggZWRpdGFibGUgc2V0dGluZ3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBQbHVnaW5MaXN0IGV4dGVuZHMgUmVhY3RXaWRnZXQge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBwbHVnaW4gbGlzdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fY2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZVNlbGVjdFNpZ25hbCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUZpbHRlclNpZ25hbCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2FsbFBsdWdpbnMgPSBbXTtcbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSB7fTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gJyc7XG4gICAgICAgIHRoaXMucmVnaXN0cnkgPSBvcHRpb25zLnJlZ2lzdHJ5O1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSBvcHRpb25zLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLVBsdWdpbkxpc3QnKTtcbiAgICAgICAgdGhpcy5fY29uZmlybSA9IG9wdGlvbnMuY29uZmlybTtcbiAgICAgICAgdGhpcy5yZWdpc3RyeS5wbHVnaW5DaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHRoaXMubWFwUGx1Z2lucyA9IHRoaXMubWFwUGx1Z2lucy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNldEZpbHRlciA9IHRoaXMuc2V0RmlsdGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2V0RmlsdGVyKHVwZGF0ZUZpbHRlckZ1bmN0aW9uKChfYSA9IG9wdGlvbnMucXVlcnkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcnLCBmYWxzZSwgZmFsc2UpKTtcbiAgICAgICAgdGhpcy5zZXRFcnJvciA9IHRoaXMuc2V0RXJyb3IuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZXZ0TW91c2Vkb3duID0gdGhpcy5fZXZ0TW91c2Vkb3duLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX3F1ZXJ5ID0gb3B0aW9ucy5xdWVyeTtcbiAgICAgICAgdGhpcy5fYWxsUGx1Z2lucyA9IFBsdWdpbkxpc3Quc29ydFBsdWdpbnModGhpcy5yZWdpc3RyeSkuZmlsdGVyKHBsdWdpbiA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCB7IHNjaGVtYSB9ID0gcGx1Z2luO1xuICAgICAgICAgICAgY29uc3QgZGVwcmVjYXRlZCA9IHNjaGVtYVsnanVweXRlci5sYWIuc2V0dGluZy1kZXByZWNhdGVkJ10gPT09IHRydWU7XG4gICAgICAgICAgICBjb25zdCBlZGl0YWJsZSA9IE9iamVjdC5rZXlzKHNjaGVtYS5wcm9wZXJ0aWVzIHx8IHt9KS5sZW5ndGggPiAwO1xuICAgICAgICAgICAgY29uc3QgZXh0ZW5zaWJsZSA9IHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyAhPT0gZmFsc2U7XG4gICAgICAgICAgICAvLyBGaWx0ZXJzIG91dCBhIGNvdXBsZSBvZiBwbHVnaW5zIHRoYXQgdGFrZSB0b28gbG9uZyB0byBsb2FkIGluIHRoZSBuZXcgc2V0dGluZ3MgZWRpdG9yLlxuICAgICAgICAgICAgY29uc3QgY29ycmVjdEVkaXRvciA9IFxuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyB0aGUganNvbiBzZXR0aW5ncyBlZGl0b3IsIGFueXRoaW5nIGlzIGZpbmVcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpcm0gfHxcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIGlzIHRoZSBuZXcgc2V0dGluZ3MgZWRpdG9yLCByZW1vdmUgY29udGV4dCBtZW51IC8gbWFpbiBtZW51IHNldHRpbmdzLlxuICAgICAgICAgICAgICAgICghdGhpcy5fY29uZmlybSAmJiAhKChfYSA9IG9wdGlvbnMudG9Ta2lwKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXSkuaW5jbHVkZXMocGx1Z2luLmlkKSk7XG4gICAgICAgICAgICByZXR1cm4gIWRlcHJlY2F0ZWQgJiYgY29ycmVjdEVkaXRvciAmJiAoZWRpdGFibGUgfHwgZXh0ZW5zaWJsZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvKipcbiAgICAgICAgICogTG9hZHMgYWxsIHNldHRpbmdzIGFuZCBzdG9yZXMgdGhlbSBmb3IgZWFzeSBhY2Nlc3Mgd2hlbiBkaXNwbGF5aW5nIHNlYXJjaCByZXN1bHRzLlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgbG9hZFNldHRpbmdzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5fYWxsUGx1Z2lucykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBsdWdpblNldHRpbmdzID0gKGF3YWl0IHRoaXMucmVnaXN0cnkubG9hZChwbHVnaW4uaWQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1twbHVnaW4uaWRdID0gcGx1Z2luU2V0dGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9O1xuICAgICAgICB2b2lkIGxvYWRTZXR0aW5ncygpO1xuICAgICAgICB0aGlzLl9lcnJvcnMgPSB7fTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLl9hbGxQbHVnaW5zWzBdLmlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gYSBsaXN0IHVzZXIgaW50ZXJhY3Rpb24gaGFwcGVucy5cbiAgICAgKi9cbiAgICBnZXQgY2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzZWxlY3Rpb24gdmFsdWUgb2YgdGhlIHBsdWdpbiBsaXN0LlxuICAgICAqL1xuICAgIGdldCBzY3JvbGxUb3AoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCd1bCcpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2Nyb2xsVG9wO1xuICAgIH1cbiAgICBnZXQgaGFzRXJyb3JzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGlkIGluIHRoaXMuX2Vycm9ycykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Vycm9yc1tpZF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGdldCBmaWx0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzZWxlY3Rpb24gdmFsdWUgb2YgdGhlIHBsdWdpbiBsaXN0LlxuICAgICAqL1xuICAgIGdldCBzZWxlY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb247XG4gICAgfVxuICAgIHNldCBzZWxlY3Rpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHNlbGVjdGlvbjtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2lnbmFsIHRoYXQgZmlyZXMgd2hlbiBzZWFyY2ggZmlsdGVyIGlzIHVwZGF0ZWQgc28gdGhhdCBzZXR0aW5ncyBwYW5lbCBjYW4gZmlsdGVyIHJlc3VsdHMuXG4gICAgICovXG4gICAgZ2V0IHVwZGF0ZUZpbHRlclNpZ25hbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VwZGF0ZUZpbHRlclNpZ25hbDtcbiAgICB9XG4gICAgZ2V0IGhhbmRsZVNlbGVjdFNpZ25hbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZVNlbGVjdFNpZ25hbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGAndXBkYXRlLXJlcXVlc3QnYCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBvblVwZGF0ZVJlcXVlc3QobXNnKSB7XG4gICAgICAgIGNvbnN0IHVsID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG4gICAgICAgIGlmICh1bCAmJiB0aGlzLl9zY3JvbGxUb3AgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdWwuc2Nyb2xsVG9wID0gdGhpcy5fc2Nyb2xsVG9wO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLm9uVXBkYXRlUmVxdWVzdChtc2cpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGAnbW91c2Vkb3duJ2AgZXZlbnQgZm9yIHRoZSBwbHVnaW4gbGlzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudCAtIFRoZSBET00gZXZlbnQgc2VudCB0byB0aGUgd2lkZ2V0XG4gICAgICovXG4gICAgX2V2dE1vdXNlZG93bihldmVudCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBjb25zdCBpZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jb25maXJtKSB7XG4gICAgICAgICAgICB0aGlzLl9jb25maXJtKGlkKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IGlkO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLyogbm8gb3AgKi9cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxUb3A7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSBpZDtcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZVNlbGVjdFNpZ25hbC5lbWl0KGlkKTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGUgcGx1Z2luIGZvciBhIHJlbmRlcmluZyBoaW50J3MgdmFsdWUuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIG9yZGVyIG9mIHByaW9yaXR5IGZvciBvdmVycmlkZGVuIGhpbnRzIGlzIGFzIGZvbGxvd3MsIGZyb20gbW9zdFxuICAgICAqIGltcG9ydGFudCB0byBsZWFzdDpcbiAgICAgKiAxLiBEYXRhIHNldCBieSB0aGUgZW5kIHVzZXIgaW4gYSBzZXR0aW5ncyBmaWxlLlxuICAgICAqIDIuIERhdGEgc2V0IGJ5IHRoZSBwbHVnaW4gYXV0aG9yIGFzIGEgc2NoZW1hIGRlZmF1bHQuXG4gICAgICogMy4gRGF0YSBzZXQgYnkgdGhlIHBsdWdpbiBhdXRob3IgYXMgYSB0b3AtbGV2ZWwga2V5IG9mIHRoZSBzY2hlbWEuXG4gICAgICovXG4gICAgZ2V0SGludChrZXksIHJlZ2lzdHJ5LCBwbHVnaW4pIHtcbiAgICAgICAgLy8gRmlyc3QsIGdpdmUgcHJpb3JpdHkgdG8gY2hlY2tpbmcgaWYgdGhlIGhpbnQgZXhpc3RzIGluIHRoZSB1c2VyIGRhdGEuXG4gICAgICAgIGxldCBoaW50ID0gcGx1Z2luLmRhdGEudXNlcltrZXldO1xuICAgICAgICAvLyBTZWNvbmQsIGNoZWNrIHRvIHNlZSBpZiB0aGUgaGludCBleGlzdHMgaW4gY29tcG9zaXRlIGRhdGEsIHdoaWNoIGZvbGRzXG4gICAgICAgIC8vIGluIGRlZmF1bHQgdmFsdWVzIGZyb20gdGhlIHNjaGVtYS5cbiAgICAgICAgaWYgKCFoaW50KSB7XG4gICAgICAgICAgICBoaW50ID0gcGx1Z2luLmRhdGEuY29tcG9zaXRlW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcmQsIGNoZWNrIHRvIHNlZSBpZiB0aGUgcGx1Z2luIHNjaGVtYSBoYXMgZGVmaW5lZCB0aGUgaGludC5cbiAgICAgICAgaWYgKCFoaW50KSB7XG4gICAgICAgICAgICBoaW50ID0gcGx1Z2luLnNjaGVtYVtrZXldO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZpbmFsbHksIHVzZSB0aGUgZGVmYXVsdHMgZnJvbSB0aGUgcmVnaXN0cnkgc2NoZW1hLlxuICAgICAgICBpZiAoIWhpbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgcHJvcGVydGllcyB9ID0gcmVnaXN0cnkuc2NoZW1hO1xuICAgICAgICAgICAgaGludCA9IHByb3BlcnRpZXMgJiYgcHJvcGVydGllc1trZXldICYmIHByb3BlcnRpZXNba2V5XS5kZWZhdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlb2YgaGludCA9PT0gJ3N0cmluZycgPyBoaW50IDogJyc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIHJlY3Vyc2l2ZWx5IGZpbHRlciBwcm9wZXJ0aWVzIHRoYXQgbWF0Y2ggc2VhcmNoIHJlc3VsdHMuXG4gICAgICogQHBhcmFtIGZpbHRlciAtIEZ1bmN0aW9uIHRvIGZpbHRlciBiYXNlZCBvbiBzZWFyY2ggcmVzdWx0c1xuICAgICAqIEBwYXJhbSBwcm9wcyAtIFNjaGVtYSBwcm9wZXJ0aWVzIGJlaW5nIGZpbHRlcmVkXG4gICAgICogQHBhcmFtIGRlZmluaXRpb25zIC0gRGVmaW5pdGlvbnMgdG8gdXNlIGZvciBmaWxsaW5nIGluIHJlZmVyZW5jZXMgaW4gcHJvcGVydGllc1xuICAgICAqIEBwYXJhbSByZWYgLSBSZWZlcmVuY2UgdG8gYSBkZWZpbml0aW9uXG4gICAgICogQHJldHVybnMgLSBTdHJpbmcgYXJyYXkgb2YgcHJvcGVydGllcyB0aGF0IG1hdGNoIHRoZSBzZWFyY2ggcmVzdWx0cy5cbiAgICAgKi9cbiAgICBnZXRGaWx0ZXJTdHJpbmcoZmlsdGVyLCBwcm9wcywgZGVmaW5pdGlvbnMsIHJlZikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIElmIHByb3BlcnRpZXMgZ2l2ZW4gYXJlIHJlZmVyZW5jZXMsIHBvcHVsYXRlIHByb3BlcnRpZXNcbiAgICAgICAgLy8gd2l0aCBjb3JyZXNwb25kaW5nIGRlZmluaXRpb24uXG4gICAgICAgIGlmIChyZWYgJiYgZGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICAgIHJlZiA9IHJlZi5yZXBsYWNlKCcjL2RlZmluaXRpb25zLycsICcnKTtcbiAgICAgICAgICAgIHByb3BzID0gKF9hID0gZGVmaW5pdGlvbnNbcmVmXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDoge307XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgZ2l2ZW4gcHJvcGVydGllcyBhcmUgYW4gb2JqZWN0LCBhZHZhbmNlIGludG8gdGhlIHByb3BlcnRpZXNcbiAgICAgICAgLy8gZm9yIHRoYXQgb2JqZWN0IGluc3RlYWQuXG4gICAgICAgIGlmIChwcm9wcy5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBwcm9wcyA9IHByb3BzLnByb3BlcnRpZXM7XG4gICAgICAgICAgICAvLyBJZiBnaXZlbiBwcm9wZXJ0aWVzIGFyZSBhbiBhcnJheSwgYWR2YW5jZSBpbnRvIHRoZSBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAvLyBmb3IgdGhlIGl0ZW1zIGluc3RlYWQuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocHJvcHMuaXRlbXMpIHtcbiAgICAgICAgICAgIHByb3BzID0gcHJvcHMuaXRlbXM7XG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIHlvdSd2ZSByZWFjaGVkIHRoZSBiYXNlIGNhc2UgYW5kIGRvbid0IG5lZWQgdG8gY2hlY2sgZm9yIG1hdGNoaW5nIHByb3BlcnRpZXNcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiByZWZlcmVuY2UgZm91bmQsIHJlY3Vyc2VcbiAgICAgICAgaWYgKHByb3BzWyckcmVmJ10pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpbHRlclN0cmluZyhmaWx0ZXIsIHByb3BzLCBkZWZpbml0aW9ucywgcHJvcHNbJyRyZWYnXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTWFrZSBzdXJlIHByb3BzIGlzIG5vbi1lbXB0eSBiZWZvcmUgY2FsbGluZyByZWR1Y2VcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHByb3BzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJdGVyYXRlIHRocm91Z2ggdGhlIHByb3BlcnRpZXMgYW5kIGNoZWNrIGZvciB0aXRsZXMgLyBkZXNjcmlwdGlvbnMgdGhhdCBtYXRjaCBzZWFyY2guXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhwcm9wcykucmVkdWNlKChhY2MsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgYmFzZSBjYXNlLCBjaGVjayBmb3IgbWF0Y2hpbmcgdGl0bGUgLyBkZXNjcmlwdGlvblxuICAgICAgICAgICAgY29uc3Qgc3ViUHJvcHMgPSBwcm9wc1t2YWx1ZV07XG4gICAgICAgICAgICBpZiAoIXN1YlByb3BzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcigoX2EgPSBwcm9wcy50aXRsZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9wcy50aXRsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBwcm9wZXJ0aWVzIGluIHRoZSBvYmplY3QsIGNoZWNrIGZvciB0aXRsZSAvIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICBpZiAoZmlsdGVyKChfYiA9IHN1YlByb3BzLnRpdGxlKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJykpIHtcbiAgICAgICAgICAgICAgICBhY2MucHVzaChzdWJQcm9wcy50aXRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlsdGVyKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGFjYy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEZpbmFsbHksIHJlY3Vyc2Ugb24gdGhlIHByb3BlcnRpZXMgbGVmdC5cbiAgICAgICAgICAgIGFjYy5jb25jYXQodGhpcy5nZXRGaWx0ZXJTdHJpbmcoZmlsdGVyLCBzdWJQcm9wcywgZGVmaW5pdGlvbnMsIHN1YlByb3BzWyckcmVmJ10pKTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgZmlsdGVyIHdoZW4gdGhlIHNlYXJjaCBiYXIgdmFsdWUgY2hhbmdlcy5cbiAgICAgKiBAcGFyYW0gZmlsdGVyIEZpbHRlciBmdW5jdGlvbiBwYXNzZWQgYnkgc2VhcmNoIGJhciBiYXNlZCBvbiBzZWFyY2ggdmFsdWUuXG4gICAgICovXG4gICAgc2V0RmlsdGVyKGZpbHRlciwgcXVlcnkpIHtcbiAgICAgICAgdGhpcy5fZmlsdGVyID0gKHBsdWdpbikgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIoKF9hID0gcGx1Z2luLnNjaGVtYS50aXRsZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJycpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHRoaXMuZ2V0RmlsdGVyU3RyaW5nKGZpbHRlciwgKF9iID0gcGx1Z2luLnNjaGVtYSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDoge30sIHBsdWdpbi5zY2hlbWEuZGVmaW5pdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9xdWVyeSA9IHF1ZXJ5O1xuICAgICAgICB0aGlzLl91cGRhdGVGaWx0ZXJTaWduYWwuZW1pdCh0aGlzLl9maWx0ZXIpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICBzZXRFcnJvcihpZCwgZXJyb3IpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Vycm9yc1tpZF0gIT09IGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcnNbaWRdID0gZXJyb3I7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZXJyb3JzW2lkXSA9IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1hcFBsdWdpbnMocGx1Z2luKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgY29uc3QgeyBpZCwgc2NoZW1hLCB2ZXJzaW9uIH0gPSBwbHVnaW47XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdGhpcy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSB0eXBlb2Ygc2NoZW1hLnRpdGxlID09PSAnc3RyaW5nJyA/IHRyYW5zLl9wKCdzY2hlbWEnLCBzY2hlbWEudGl0bGUpIDogaWQ7XG4gICAgICAgIGNvbnN0IGhpZ2hsaWdodGVkVGl0bGVJbmRpY2VzID0gU3RyaW5nRXh0Lm1hdGNoU3VtT2ZTcXVhcmVzKHRpdGxlLnRvTG9jYWxlTG93ZXJDYXNlKCksIChfYiA9IChfYSA9IHRoaXMuX3F1ZXJ5KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9Mb2NhbGVMb3dlckNhc2UoKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogJycpO1xuICAgICAgICBjb25zdCBoaWdodGxpZ2h0ZWRUaXRsZSA9IFN0cmluZ0V4dC5oaWdobGlnaHQodGl0bGUsIChfYyA9IGhpZ2hsaWdodGVkVGl0bGVJbmRpY2VzID09PSBudWxsIHx8IGhpZ2hsaWdodGVkVGl0bGVJbmRpY2VzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBoaWdobGlnaHRlZFRpdGxlSW5kaWNlcy5pbmRpY2VzKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBbXSwgY2h1bmsgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJtYXJrXCIsIG51bGwsIGNodW5rKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdHlwZW9mIHNjaGVtYS5kZXNjcmlwdGlvbiA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gdHJhbnMuX3AoJ3NjaGVtYScsIHNjaGVtYS5kZXNjcmlwdGlvbilcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIGNvbnN0IGl0ZW1UaXRsZSA9IGAke2Rlc2NyaXB0aW9ufVxcbiR7aWR9XFxuJHt2ZXJzaW9ufWA7XG4gICAgICAgIGNvbnN0IGljb24gPSB0aGlzLmdldEhpbnQoSUNPTl9LRVksIHRoaXMucmVnaXN0cnksIHBsdWdpbik7XG4gICAgICAgIGNvbnN0IGljb25DbGFzcyA9IHRoaXMuZ2V0SGludChJQ09OX0NMQVNTX0tFWSwgdGhpcy5yZWdpc3RyeSwgcGx1Z2luKTtcbiAgICAgICAgY29uc3QgaWNvblRpdGxlID0gdGhpcy5nZXRIaW50KElDT05fTEFCRUxfS0VZLCB0aGlzLnJlZ2lzdHJ5LCBwbHVnaW4pO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZFByb3BlcnRpZXMgPSAoX2QgPSB0aGlzLl9maWx0ZXIocGx1Z2luKSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLm1hcChmaWVsZFZhbHVlID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgY29uc3QgaGlnaGxpZ2h0ZWRJbmRpY2VzID0gU3RyaW5nRXh0Lm1hdGNoU3VtT2ZTcXVhcmVzKGZpZWxkVmFsdWUudG9Mb2NhbGVMb3dlckNhc2UoKSwgKF9iID0gKF9hID0gdGhpcy5fcXVlcnkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b0xvY2FsZUxvd2VyQ2FzZSgpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJyk7XG4gICAgICAgICAgICBjb25zdCBoaWdobGlnaHRlZCA9IFN0cmluZ0V4dC5oaWdobGlnaHQoZmllbGRWYWx1ZSwgKF9jID0gaGlnaGxpZ2h0ZWRJbmRpY2VzID09PSBudWxsIHx8IGhpZ2hsaWdodGVkSW5kaWNlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogaGlnaGxpZ2h0ZWRJbmRpY2VzLmluZGljZXMpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IFtdLCBjaHVuayA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJtYXJrXCIsIG51bGwsIGNodW5rKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGtleTogYCR7aWR9LSR7ZmllbGRWYWx1ZX1gIH0sXG4gICAgICAgICAgICAgICAgXCIgXCIsXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0ZWQsXG4gICAgICAgICAgICAgICAgXCIgXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgb25DbGljazogdGhpcy5fZXZ0TW91c2Vkb3duLCBjbGFzc05hbWU6IGAke2lkID09PSB0aGlzLnNlbGVjdGlvblxuICAgICAgICAgICAgICAgID8gJ2pwLW1vZC1zZWxlY3RlZCBqcC1QbHVnaW5MaXN0LWVudHJ5J1xuICAgICAgICAgICAgICAgIDogJ2pwLVBsdWdpbkxpc3QtZW50cnknfSAke3RoaXMuX2Vycm9yc1tpZF0gPyAnanAtRXJyb3JQbHVnaW4nIDogJyd9YCwgXCJkYXRhLWlkXCI6IGlkLCBrZXk6IGlkLCB0aXRsZTogaXRlbVRpdGxlIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLXBsdWdpbkxpc3QtZW50cnktbGFiZWxcIiwgcm9sZTogXCJ0YWJcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtU2VsZWN0ZWRJbmRpY2F0b3JcIiB9KSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYkljb24ucmVzb2x2ZVJlYWN0LCB7IGljb246IGljb24gfHwgKGljb25DbGFzcyA/IHVuZGVmaW5lZCA6IHNldHRpbmdzSWNvbiksIGljb25DbGFzczogY2xhc3NlcyhpY29uQ2xhc3MsICdqcC1JY29uJyksIHRpdGxlOiBpY29uVGl0bGUsIHRhZzogXCJzcGFuXCIsIHN0eWxlc2hlZXQ6IFwic2V0dGluZ3NFZGl0b3JcIiB9KSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBoaWdodGxpZ2h0ZWRUaXRsZSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIG51bGwsIGZpbHRlcmVkUHJvcGVydGllcykpKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB0cmFucyA9IHRoaXMudHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIC8vIEZpbHRlciBhbGwgcGx1Z2lucyBiYXNlZCBvbiBzZWFyY2ggdmFsdWUgYmVmb3JlIGRpc3BsYXlpbmcgbGlzdC5cbiAgICAgICAgY29uc3QgYWxsUGx1Z2lucyA9IHRoaXMuX2FsbFBsdWdpbnMuZmlsdGVyKHBsdWdpbiA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHRoaXMuX2ZpbHRlcihwbHVnaW4pO1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkID09PSBudWxsIHx8IGZpbHRlcmVkLmxlbmd0aCA+IDA7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBtb2RpZmllZFBsdWdpbnMgPSBhbGxQbHVnaW5zLmZpbHRlcihwbHVnaW4gPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuX3NldHRpbmdzW3BsdWdpbi5pZF0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pc01vZGlmaWVkO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbW9kaWZpZWRJdGVtcyA9IG1vZGlmaWVkUGx1Z2lucy5tYXAodGhpcy5tYXBQbHVnaW5zKTtcbiAgICAgICAgY29uc3Qgb3RoZXJJdGVtcyA9IGFsbFBsdWdpbnNcbiAgICAgICAgICAgIC5maWx0ZXIocGx1Z2luID0+IHtcbiAgICAgICAgICAgIHJldHVybiAhbW9kaWZpZWRQbHVnaW5zLmluY2x1ZGVzKHBsdWdpbik7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAubWFwKHRoaXMubWFwUGx1Z2lucyk7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJqcC1QbHVnaW5MaXN0LXdyYXBwZXJcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGaWx0ZXJCb3gsIHsgdXBkYXRlRmlsdGVyOiB0aGlzLnNldEZpbHRlciwgdXNlRnV6enlGaWx0ZXI6IGZhbHNlLCBwbGFjZWhvbGRlcjogdHJhbnMuX18oJ1NlYXJjaOKApicpLCBmb3JjZVJlZnJlc2g6IGZhbHNlLCBjYXNlU2Vuc2l0aXZlOiBmYWxzZSwgaW5pdGlhbFF1ZXJ5OiB0aGlzLl9xdWVyeSB9KSxcbiAgICAgICAgICAgIG1vZGlmaWVkSXRlbXMubGVuZ3RoID4gMCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMVwiLCB7IGNsYXNzTmFtZTogXCJqcC1QbHVnaW5MaXN0LWhlYWRlclwiIH0sIHRyYW5zLl9fKCdNb2RpZmllZCcpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgbnVsbCwgbW9kaWZpZWRJdGVtcykpKSxcbiAgICAgICAgICAgIG90aGVySXRlbXMubGVuZ3RoID4gMCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMVwiLCB7IGNsYXNzTmFtZTogXCJqcC1QbHVnaW5MaXN0LWhlYWRlclwiIH0sIHRyYW5zLl9fKCdTZXR0aW5ncycpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgbnVsbCwgb3RoZXJJdGVtcykpKSxcbiAgICAgICAgICAgIG1vZGlmaWVkSXRlbXMubGVuZ3RoID09PSAwICYmIG90aGVySXRlbXMubGVuZ3RoID09PSAwICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCB7IGNsYXNzTmFtZTogXCJqcC1QbHVnaW5MaXN0LW5vUmVzdWx0c1wiIH0sIHRyYW5zLl9fKCdObyBpdGVtcyBtYXRjaCB5b3VyIHNlYXJjaC4nKSkpKSk7XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgYFBsdWdpbkxpc3RgIHN0YXRpY3MuXG4gKi9cbihmdW5jdGlvbiAoUGx1Z2luTGlzdCkge1xuICAgIC8qKlxuICAgICAqIFNvcnQgYSBsaXN0IG9mIHBsdWdpbnMgYnkgdGl0bGUgYW5kIElELlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNvcnRQbHVnaW5zKHJlZ2lzdHJ5KSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhyZWdpc3RyeS5wbHVnaW5zKVxuICAgICAgICAgICAgLm1hcChwbHVnaW4gPT4gcmVnaXN0cnkucGx1Z2luc1twbHVnaW5dKVxuICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoYS5zY2hlbWEudGl0bGUgfHwgYS5pZCkubG9jYWxlQ29tcGFyZShiLnNjaGVtYS50aXRsZSB8fCBiLmlkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFBsdWdpbkxpc3Quc29ydFBsdWdpbnMgPSBzb3J0UGx1Z2lucztcbn0pKFBsdWdpbkxpc3QgfHwgKFBsdWdpbkxpc3QgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGx1Z2lubGlzdC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBDb21tYW5kVG9vbGJhckJ1dHRvbiwgVG9vbGJhciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IENvZGVFZGl0b3IsIENvZGVFZGl0b3JXcmFwcGVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29kZWVkaXRvcic7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmltcG9ydCB7IEJveExheW91dCwgV2lkZ2V0IH0gZnJvbSAnQGx1bWluby93aWRnZXRzJztcbmltcG9ydCB7IGNyZWF0ZUluc3BlY3RvciB9IGZyb20gJy4vaW5zcGVjdG9yJztcbmltcG9ydCB7IFNwbGl0UGFuZWwgfSBmcm9tICcuL3NwbGl0cGFuZWwnO1xuLyoqXG4gKiBBIGNsYXNzIG5hbWUgYWRkZWQgdG8gYWxsIHJhdyBlZGl0b3JzLlxuICovXG5jb25zdCBSQVdfRURJVE9SX0NMQVNTID0gJ2pwLVNldHRpbmdzUmF3RWRpdG9yJztcbi8qKlxuICogQSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRoZSB1c2VyIHNldHRpbmdzIGVkaXRvci5cbiAqL1xuY29uc3QgVVNFUl9DTEFTUyA9ICdqcC1TZXR0aW5nc1Jhd0VkaXRvci11c2VyJztcbi8qKlxuICogQSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRoZSB1c2VyIGVkaXRvciB3aGVuIHRoZXJlIGFyZSB2YWxpZGF0aW9uIGVycm9ycy5cbiAqL1xuY29uc3QgRVJST1JfQ0xBU1MgPSAnanAtbW9kLWVycm9yJztcbi8qKlxuICogQSByYXcgSlNPTiBzZXR0aW5ncyBlZGl0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBSYXdFZGl0b3IgZXh0ZW5kcyBTcGxpdFBhbmVsIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgcGx1Z2luIGVkaXRvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKHtcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgICAgICByZW5kZXJlcjogU3BsaXRQYW5lbC5kZWZhdWx0UmVuZGVyZXIsXG4gICAgICAgICAgICBzcGFjaW5nOiAxXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9jYW5SZXZlcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY2FuU2F2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jb21tYW5kc0NoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Rvb2xiYXIgPSBuZXcgVG9vbGJhcigpO1xuICAgICAgICBjb25zdCB7IGNvbW1hbmRzLCBlZGl0b3JGYWN0b3J5LCByZWdpc3RyeSwgdHJhbnNsYXRvciB9ID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5yZWdpc3RyeSA9IHJlZ2lzdHJ5O1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICB0aGlzLl9jb21tYW5kcyA9IGNvbW1hbmRzO1xuICAgICAgICAvLyBDcmVhdGUgcmVhZC1vbmx5IGRlZmF1bHRzIGVkaXRvci5cbiAgICAgICAgY29uc3QgZGVmYXVsdHMgPSAodGhpcy5fZGVmYXVsdHMgPSBuZXcgQ29kZUVkaXRvcldyYXBwZXIoe1xuICAgICAgICAgICAgbW9kZWw6IG5ldyBDb2RlRWRpdG9yLk1vZGVsKCksXG4gICAgICAgICAgICBmYWN0b3J5OiBlZGl0b3JGYWN0b3J5XG4gICAgICAgIH0pKTtcbiAgICAgICAgZGVmYXVsdHMuZWRpdG9yLm1vZGVsLnZhbHVlLnRleHQgPSAnJztcbiAgICAgICAgZGVmYXVsdHMuZWRpdG9yLm1vZGVsLm1pbWVUeXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgICAgIGRlZmF1bHRzLmVkaXRvci5zZXRPcHRpb24oJ3JlYWRPbmx5JywgdHJ1ZSk7XG4gICAgICAgIC8vIENyZWF0ZSByZWFkLXdyaXRlIHVzZXIgc2V0dGluZ3MgZWRpdG9yLlxuICAgICAgICBjb25zdCB1c2VyID0gKHRoaXMuX3VzZXIgPSBuZXcgQ29kZUVkaXRvcldyYXBwZXIoe1xuICAgICAgICAgICAgbW9kZWw6IG5ldyBDb2RlRWRpdG9yLk1vZGVsKCksXG4gICAgICAgICAgICBmYWN0b3J5OiBlZGl0b3JGYWN0b3J5LFxuICAgICAgICAgICAgY29uZmlnOiB7IGxpbmVOdW1iZXJzOiB0cnVlIH1cbiAgICAgICAgfSkpO1xuICAgICAgICB1c2VyLmFkZENsYXNzKFVTRVJfQ0xBU1MpO1xuICAgICAgICB1c2VyLmVkaXRvci5tb2RlbC5taW1lVHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICB1c2VyLmVkaXRvci5tb2RlbC52YWx1ZS5jaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25UZXh0Q2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIC8vIENyZWF0ZSBhbmQgc2V0IHVwIGFuIGluc3BlY3Rvci5cbiAgICAgICAgdGhpcy5faW5zcGVjdG9yID0gY3JlYXRlSW5zcGVjdG9yKHRoaXMsIG9wdGlvbnMucmVuZGVybWltZSwgdGhpcy50cmFuc2xhdG9yKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhSQVdfRURJVE9SX0NMQVNTKTtcbiAgICAgICAgLy8gRklYTUUtVFJBTlM6IG9uU2F2ZUVycm9yIG11c3QgaGF2ZSBhbiBvcHRpb25hbCB0cmFuc2xhdG9yP1xuICAgICAgICB0aGlzLl9vblNhdmVFcnJvciA9IG9wdGlvbnMub25TYXZlRXJyb3I7XG4gICAgICAgIHRoaXMuYWRkV2lkZ2V0KFByaXZhdGUuZGVmYXVsdHNFZGl0b3IoZGVmYXVsdHMsIHRoaXMudHJhbnNsYXRvcikpO1xuICAgICAgICB0aGlzLmFkZFdpZGdldChQcml2YXRlLnVzZXJFZGl0b3IodXNlciwgdGhpcy5fdG9vbGJhciwgdGhpcy5faW5zcGVjdG9yLCB0aGlzLnRyYW5zbGF0b3IpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgcmF3IGVkaXRvciByZXZlcnQgZnVuY3Rpb25hbGl0eSBpcyBlbmFibGVkLlxuICAgICAqL1xuICAgIGdldCBjYW5SZXZlcnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW5SZXZlcnQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHJhdyBlZGl0b3Igc2F2ZSBmdW5jdGlvbmFsaXR5IGlzIGVuYWJsZWQuXG4gICAgICovXG4gICAgZ2V0IGNhblNhdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW5TYXZlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbWl0cyB3aGVuIHRoZSBjb21tYW5kcyBwYXNzZWQgaW4gYXQgaW5zdGFudGlhdGlvbiBjaGFuZ2UuXG4gICAgICovXG4gICAgZ2V0IGNvbW1hbmRzQ2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRzQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGVzdHMgd2hldGhlciB0aGUgc2V0dGluZ3MgaGF2ZSBiZWVuIG1vZGlmaWVkIGFuZCBuZWVkIHNhdmluZy5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXJ0eSgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgcmV0dXJuIChfYiA9IHRoaXMuX3VzZXIuZWRpdG9yLm1vZGVsLnZhbHVlLnRleHQgIT09ICgoX2EgPSB0aGlzLl9zZXR0aW5ncykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJhdykpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6ICcnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgcGx1Z2luIHNldHRpbmdzIGJlaW5nIGVkaXRlZC5cbiAgICAgKi9cbiAgICBnZXQgc2V0dGluZ3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncztcbiAgICB9XG4gICAgc2V0IHNldHRpbmdzKHNldHRpbmdzKSB7XG4gICAgICAgIGlmICghc2V0dGluZ3MgJiYgIXRoaXMuX3NldHRpbmdzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2FtZVBsdWdpbiA9IHNldHRpbmdzICYmIHRoaXMuX3NldHRpbmdzICYmIHNldHRpbmdzLnBsdWdpbiA9PT0gdGhpcy5fc2V0dGluZ3MucGx1Z2luO1xuICAgICAgICBpZiAoc2FtZVBsdWdpbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRlZmF1bHRzID0gdGhpcy5fZGVmYXVsdHM7XG4gICAgICAgIGNvbnN0IHVzZXIgPSB0aGlzLl91c2VyO1xuICAgICAgICAvLyBEaXNjb25uZWN0IG9sZCBzZXR0aW5ncyBjaGFuZ2UgaGFuZGxlci5cbiAgICAgICAgaWYgKHRoaXMuX3NldHRpbmdzKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncy5jaGFuZ2VkLmRpc2Nvbm5lY3QodGhpcy5fb25TZXR0aW5nc0NoYW5nZWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzLmNoYW5nZWQuY29ubmVjdCh0aGlzLl9vblNldHRpbmdzQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9vblNldHRpbmdzQ2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBudWxsO1xuICAgICAgICAgICAgZGVmYXVsdHMuZWRpdG9yLm1vZGVsLnZhbHVlLnRleHQgPSAnJztcbiAgICAgICAgICAgIHVzZXIuZWRpdG9yLm1vZGVsLnZhbHVlLnRleHQgPSAnJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJlbGF0aXZlIHNpemVzIG9mIHRoZSB0d28gZWRpdG9yIHBhbmVscy5cbiAgICAgKi9cbiAgICBnZXQgc2l6ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbGF0aXZlU2l6ZXMoKTtcbiAgICB9XG4gICAgc2V0IHNpemVzKHNpemVzKSB7XG4gICAgICAgIHRoaXMuc2V0UmVsYXRpdmVTaXplcyhzaXplcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBpbnNwZWN0YWJsZSBzb3VyY2UgZWRpdG9yIGZvciB1c2VyIGlucHV0LlxuICAgICAqL1xuICAgIGdldCBzb3VyY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyLmVkaXRvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIHJhdyBlZGl0b3IuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fZGVmYXVsdHMuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl91c2VyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV2ZXJ0IHRoZSBlZGl0b3IgYmFjayB0byBvcmlnaW5hbCBzZXR0aW5ncy5cbiAgICAgKi9cbiAgICByZXZlcnQoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHRoaXMuX3VzZXIuZWRpdG9yLm1vZGVsLnZhbHVlLnRleHQgPSAoX2IgPSAoX2EgPSB0aGlzLnNldHRpbmdzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmF3KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJztcbiAgICAgICAgdGhpcy5fdXBkYXRlVG9vbGJhcihmYWxzZSwgZmFsc2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYXZlIHRoZSBjb250ZW50cyBvZiB0aGUgcmF3IGVkaXRvci5cbiAgICAgKi9cbiAgICBzYXZlKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNEaXJ0eSB8fCAhdGhpcy5fc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuX3NldHRpbmdzO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSB0aGlzLl91c2VyLmVkaXRvci5tb2RlbC52YWx1ZS50ZXh0O1xuICAgICAgICByZXR1cm4gc2V0dGluZ3NcbiAgICAgICAgICAgIC5zYXZlKHNvdXJjZSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRvb2xiYXIoZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChyZWFzb24gPT4ge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVG9vbGJhcih0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLl9vblNhdmVFcnJvcihyZWFzb24sIHRoaXMudHJhbnNsYXRvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYGFmdGVyLWF0dGFjaGAgbWVzc2FnZXMuXG4gICAgICovXG4gICAgb25BZnRlckF0dGFjaChtc2cpIHtcbiAgICAgICAgUHJpdmF0ZS5wb3B1bGF0ZVRvb2xiYXIodGhpcy5fY29tbWFuZHMsIHRoaXMuX3Rvb2xiYXIpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYCd1cGRhdGUtcmVxdWVzdCdgIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIG9uVXBkYXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLl9zZXR0aW5ncztcbiAgICAgICAgY29uc3QgZGVmYXVsdHMgPSB0aGlzLl9kZWZhdWx0cztcbiAgICAgICAgY29uc3QgdXNlciA9IHRoaXMuX3VzZXI7XG4gICAgICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICAgICAgZGVmYXVsdHMuZWRpdG9yLnJlZnJlc2goKTtcbiAgICAgICAgICAgIHVzZXIuZWRpdG9yLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGV4dCBjaGFuZ2VzIGluIHRoZSB1bmRlcmx5aW5nIGVkaXRvci5cbiAgICAgKi9cbiAgICBfb25UZXh0Q2hhbmdlZCgpIHtcbiAgICAgICAgY29uc3QgcmF3ID0gdGhpcy5fdXNlci5lZGl0b3IubW9kZWwudmFsdWUudGV4dDtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLl9zZXR0aW5ncztcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhFUlJPUl9DTEFTUyk7XG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBzZXR0aW5ncyBsb2FkZWQgb3IgdGhlcmUgYXJlIG5vIGNoYW5nZXMsIGJhaWwuXG4gICAgICAgIGlmICghc2V0dGluZ3MgfHwgc2V0dGluZ3MucmF3ID09PSByYXcpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRvb2xiYXIoZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlcnJvcnMgPSBzZXR0aW5ncy52YWxpZGF0ZShyYXcpO1xuICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKEVSUk9SX0NMQVNTKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRvb2xiYXIodHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZVRvb2xiYXIodHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB1cGRhdGVzIHRvIHRoZSBzZXR0aW5ncy5cbiAgICAgKi9cbiAgICBfb25TZXR0aW5nc0NoYW5nZWQoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5fc2V0dGluZ3M7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRzID0gdGhpcy5fZGVmYXVsdHM7XG4gICAgICAgIGNvbnN0IHVzZXIgPSB0aGlzLl91c2VyO1xuICAgICAgICBkZWZhdWx0cy5lZGl0b3IubW9kZWwudmFsdWUudGV4dCA9IChfYSA9IHNldHRpbmdzID09PSBudWxsIHx8IHNldHRpbmdzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXR0aW5ncy5hbm5vdGF0ZWREZWZhdWx0cygpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcbiAgICAgICAgdXNlci5lZGl0b3IubW9kZWwudmFsdWUudGV4dCA9IChfYiA9IHNldHRpbmdzID09PSBudWxsIHx8IHNldHRpbmdzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXR0aW5ncy5yYXcpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6ICcnO1xuICAgIH1cbiAgICBfdXBkYXRlVG9vbGJhcihyZXZlcnQgPSB0aGlzLl9jYW5SZXZlcnQsIHNhdmUgPSB0aGlzLl9jYW5TYXZlKSB7XG4gICAgICAgIGNvbnN0IGNvbW1hbmRzID0gdGhpcy5fY29tbWFuZHM7XG4gICAgICAgIHRoaXMuX2NhblJldmVydCA9IHJldmVydDtcbiAgICAgICAgdGhpcy5fY2FuU2F2ZSA9IHNhdmU7XG4gICAgICAgIHRoaXMuX2NvbW1hbmRzQ2hhbmdlZC5lbWl0KFtjb21tYW5kcy5yZXZlcnQsIGNvbW1hbmRzLnNhdmVdKTtcbiAgICB9XG59XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIG1vZHVsZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHdyYXBwZWQgc2V0dGluZyBkZWZhdWx0cyBlZGl0b3IuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZGVmYXVsdHNFZGl0b3IoZWRpdG9yLCB0cmFuc2xhdG9yKSB7XG4gICAgICAgIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCB3aWRnZXQgPSBuZXcgV2lkZ2V0KCk7XG4gICAgICAgIGNvbnN0IGxheW91dCA9ICh3aWRnZXQubGF5b3V0ID0gbmV3IEJveExheW91dCh7IHNwYWNpbmc6IDAgfSkpO1xuICAgICAgICBjb25zdCBiYW5uZXIgPSBuZXcgV2lkZ2V0KCk7XG4gICAgICAgIGNvbnN0IGJhciA9IG5ldyBUb29sYmFyKCk7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRUaXRsZSA9IHRyYW5zLl9fKCdTeXN0ZW0gRGVmYXVsdHMnKTtcbiAgICAgICAgYmFubmVyLm5vZGUuaW5uZXJUZXh0ID0gZGVmYXVsdFRpdGxlO1xuICAgICAgICBiYXIuaW5zZXJ0SXRlbSgwLCAnYmFubmVyJywgYmFubmVyKTtcbiAgICAgICAgbGF5b3V0LmFkZFdpZGdldChiYXIpO1xuICAgICAgICBsYXlvdXQuYWRkV2lkZ2V0KGVkaXRvcik7XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfVxuICAgIFByaXZhdGUuZGVmYXVsdHNFZGl0b3IgPSBkZWZhdWx0c0VkaXRvcjtcbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZSB0aGUgcmF3IGVkaXRvciB0b29sYmFyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHBvcHVsYXRlVG9vbGJhcihjb21tYW5kcywgdG9vbGJhcikge1xuICAgICAgICBjb25zdCB7IHJlZ2lzdHJ5LCByZXZlcnQsIHNhdmUgfSA9IGNvbW1hbmRzO1xuICAgICAgICB0b29sYmFyLmFkZEl0ZW0oJ3NwYWNlcicsIFRvb2xiYXIuY3JlYXRlU3BhY2VySXRlbSgpKTtcbiAgICAgICAgLy8gTm90ZSB0aGUgYnV0dG9uIG9yZGVyLiBUaGUgcmF0aW9uYWxlIGhlcmUgaXMgdGhhdCBubyBtYXR0ZXIgd2hhdCBzdGF0ZVxuICAgICAgICAvLyB0aGUgdG9vbGJhciBpcyBpbiwgdGhlIHJlbGF0aXZlIGxvY2F0aW9uIG9mIHRoZSByZXZlcnQgYnV0dG9uIGluIHRoZVxuICAgICAgICAvLyB0b29sYmFyIHJlbWFpbnMgdGhlIHNhbWUuXG4gICAgICAgIFtyZXZlcnQsIHNhdmVdLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbmV3IENvbW1hbmRUb29sYmFyQnV0dG9uKHsgY29tbWFuZHM6IHJlZ2lzdHJ5LCBpZDogbmFtZSB9KTtcbiAgICAgICAgICAgIHRvb2xiYXIuYWRkSXRlbShuYW1lLCBpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFByaXZhdGUucG9wdWxhdGVUb29sYmFyID0gcG9wdWxhdGVUb29sYmFyO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHdyYXBwZWQgdXNlciBvdmVycmlkZXMgZWRpdG9yLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVzZXJFZGl0b3IoZWRpdG9yLCB0b29sYmFyLCBpbnNwZWN0b3IsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGNvbnN0IHVzZXJUaXRsZSA9IHRyYW5zLl9fKCdVc2VyIFByZWZlcmVuY2VzJyk7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IG5ldyBXaWRnZXQoKTtcbiAgICAgICAgY29uc3QgbGF5b3V0ID0gKHdpZGdldC5sYXlvdXQgPSBuZXcgQm94TGF5b3V0KHsgc3BhY2luZzogMCB9KSk7XG4gICAgICAgIGNvbnN0IGJhbm5lciA9IG5ldyBXaWRnZXQoKTtcbiAgICAgICAgYmFubmVyLm5vZGUuaW5uZXJUZXh0ID0gdXNlclRpdGxlO1xuICAgICAgICB0b29sYmFyLmluc2VydEl0ZW0oMCwgJ2Jhbm5lcicsIGJhbm5lcik7XG4gICAgICAgIGxheW91dC5hZGRXaWRnZXQodG9vbGJhcik7XG4gICAgICAgIGxheW91dC5hZGRXaWRnZXQoZWRpdG9yKTtcbiAgICAgICAgbGF5b3V0LmFkZFdpZGdldChpbnNwZWN0b3IpO1xuICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH1cbiAgICBQcml2YXRlLnVzZXJFZGl0b3IgPSB1c2VyRWRpdG9yO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yYXdlZGl0b3IuanMubWFwIiwiaW1wb3J0IHsgUmVhY3RXaWRnZXQsIHNob3dEaWFsb2cgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmltcG9ydCB7IFNwbGl0UGFuZWwgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFBsdWdpbkxpc3QgfSBmcm9tICcuL3BsdWdpbmxpc3QnO1xuaW1wb3J0IHsgU2V0dGluZ3NQYW5lbCB9IGZyb20gJy4vc2V0dGluZ3NwYW5lbCc7XG4vKipcbiAqIEZvcm0gYmFzZWQgaW50ZXJmYWNlIGZvciBlZGl0aW5nIHNldHRpbmdzLlxuICovXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NFZGl0b3IgZXh0ZW5kcyBTcGxpdFBhbmVsIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKHtcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgICAgICByZW5kZXJlcjogU3BsaXRQYW5lbC5kZWZhdWx0UmVuZGVyZXIsXG4gICAgICAgICAgICBzcGFjaW5nOiAxXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9jbGVhckRpcnR5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZGlydHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc2F2ZVN0YXRlQ2hhbmdlID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gb3B0aW9ucy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICB0aGlzLl9zdGF0dXMgPSBvcHRpb25zLnN0YXR1cztcbiAgICAgICAgY29uc3QgbGlzdCA9ICh0aGlzLl9saXN0ID0gbmV3IFBsdWdpbkxpc3Qoe1xuICAgICAgICAgICAgcmVnaXN0cnk6IG9wdGlvbnMucmVnaXN0cnksXG4gICAgICAgICAgICB0b1NraXA6IG9wdGlvbnMudG9Ta2lwLFxuICAgICAgICAgICAgdHJhbnNsYXRvcjogdGhpcy50cmFuc2xhdG9yLFxuICAgICAgICAgICAgcXVlcnk6IG9wdGlvbnMucXVlcnlcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLmFkZFdpZGdldChsaXN0KTtcbiAgICAgICAgdGhpcy5zZXREaXJ0eVN0YXRlID0gdGhpcy5zZXREaXJ0eVN0YXRlLmJpbmQodGhpcyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbml0aWFsaXplcyB0aGUgc2V0dGluZ3MgcGFuZWwgYWZ0ZXIgbG9hZGluZyB0aGUgc2NoZW1hIGZvciBhbGwgcGx1Z2lucy5cbiAgICAgICAgICovXG4gICAgICAgIHZvaWQgUHJvbWlzZS5hbGwoUGx1Z2luTGlzdC5zb3J0UGx1Z2lucyhvcHRpb25zLnJlZ2lzdHJ5KVxuICAgICAgICAgICAgLmZpbHRlcihwbHVnaW4gPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBzY2hlbWEgfSA9IHBsdWdpbjtcbiAgICAgICAgICAgIGNvbnN0IGRlcHJlY2F0ZWQgPSBzY2hlbWFbJ2p1cHl0ZXIubGFiLnNldHRpbmctZGVwcmVjYXRlZCddID09PSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgZWRpdGFibGUgPSBPYmplY3Qua2V5cyhzY2hlbWEucHJvcGVydGllcyB8fCB7fSkubGVuZ3RoID4gMDtcbiAgICAgICAgICAgIGNvbnN0IGV4dGVuc2libGUgPSBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMgIT09IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuICFkZXByZWNhdGVkICYmIChlZGl0YWJsZSB8fCBleHRlbnNpYmxlKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYXAoYXN5bmMgKHBsdWdpbikgPT4gYXdhaXQgb3B0aW9ucy5yZWdpc3RyeS5sb2FkKHBsdWdpbi5pZCkpKVxuICAgICAgICAgICAgLnRoZW4oc2V0dGluZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3NQYW5lbCA9IFJlYWN0V2lkZ2V0LmNyZWF0ZShSZWFjdC5jcmVhdGVFbGVtZW50KFNldHRpbmdzUGFuZWwsIHsgc2V0dGluZ3M6IHNldHRpbmdzLmZpbHRlcihwbHVnaW5TZXR0aW5ncyA9PiB7IHZhciBfYTsgcmV0dXJuICEoKF9hID0gb3B0aW9ucy50b1NraXApICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdKS5pbmNsdWRlcyhwbHVnaW5TZXR0aW5ncy5pZCk7IH0pLCBlZGl0b3JSZWdpc3RyeTogb3B0aW9ucy5lZGl0b3JSZWdpc3RyeSwgaGFuZGxlU2VsZWN0U2lnbmFsOiB0aGlzLl9saXN0LmhhbmRsZVNlbGVjdFNpZ25hbCwgb25TZWxlY3Q6IChpZCkgPT4gKHRoaXMuX2xpc3Quc2VsZWN0aW9uID0gaWQpLCBoYXNFcnJvcjogdGhpcy5fbGlzdC5zZXRFcnJvciwgdXBkYXRlRmlsdGVyU2lnbmFsOiB0aGlzLl9saXN0LnVwZGF0ZUZpbHRlclNpZ25hbCwgdXBkYXRlRGlydHlTdGF0ZTogdGhpcy5zZXREaXJ0eVN0YXRlLCB0cmFuc2xhdG9yOiB0aGlzLnRyYW5zbGF0b3IsIGluaXRpYWxGaWx0ZXI6IHRoaXMuX2xpc3QuZmlsdGVyIH0pKTtcbiAgICAgICAgICAgIHRoaXMuYWRkV2lkZ2V0KHNldHRpbmdzUGFuZWwpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHJlYXNvbiA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsIHRvIGxvYWQgdGhlIHNldHRpbmcgcGx1Z2luczpcXG4ke3JlYXNvbn1gKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgb24gdGhlIHN0YXJ0IGFuZCBlbmQgb2YgYSBzYXZpbmcgb3BlcmF0aW9uLlxuICAgICAqL1xuICAgIGdldCBzYXZlU3RhdGVDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2F2ZVN0YXRlQ2hhbmdlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGRpcnR5IHN0YXRlIHN0YXR1c1xuICAgICAqXG4gICAgICogQHBhcmFtIGRpcnR5IE5ldyBzdGF0dXNcbiAgICAgKi9cbiAgICBzZXREaXJ0eVN0YXRlKGRpcnR5KSB7XG4gICAgICAgIHRoaXMuX2RpcnR5ID0gZGlydHk7XG4gICAgICAgIGlmICh0aGlzLl9kaXJ0eSAmJiAhdGhpcy5fY2xlYXJEaXJ0eSkge1xuICAgICAgICAgICAgdGhpcy5fY2xlYXJEaXJ0eSA9IHRoaXMuX3N0YXR1cy5zZXREaXJ0eSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCF0aGlzLl9kaXJ0eSAmJiB0aGlzLl9jbGVhckRpcnR5KSB7XG4gICAgICAgICAgICB0aGlzLl9jbGVhckRpcnR5LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyRGlydHkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXJ0eSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnRpdGxlLmNsYXNzTmFtZS5pbmNsdWRlcygnanAtbW9kLWRpcnR5JykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlLmNsYXNzTmFtZSArPSAnIGpwLW1vZC1kaXJ0eSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRpdGxlLmNsYXNzTmFtZSA9IHRoaXMudGl0bGUuY2xhc3NOYW1lLnJlcGxhY2UoJ2pwLW1vZC1kaXJ0eScsICcnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zYXZlU3RhdGVDaGFuZ2UuZW1pdChkaXJ0eSA/ICdzdGFydGVkJyA6ICdjb21wbGV0ZWQnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBtZXNzYWdlIGhhbmRsZXIgaW52b2tlZCBvbiBhIGAnY2xvc2UtcmVxdWVzdCdgIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbXNnIFdpZGdldCBtZXNzYWdlXG4gICAgICovXG4gICAgb25DbG9zZVJlcXVlc3QobXNnKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdGhpcy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgaWYgKHRoaXMuX2xpc3QuaGFzRXJyb3JzKSB7XG4gICAgICAgICAgICB2b2lkIHNob3dEaWFsb2coe1xuICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFucy5fXygnV2FybmluZycpLFxuICAgICAgICAgICAgICAgIGJvZHk6IHRyYW5zLl9fKCdVbnNhdmVkIGNoYW5nZXMgZHVlIHRvIHZhbGlkYXRpb24gZXJyb3IuIENvbnRpbnVlIHdpdGhvdXQgc2F2aW5nPycpXG4gICAgICAgICAgICB9KS50aGVuKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuYnV0dG9uLmFjY2VwdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIub25DbG9zZVJlcXVlc3QobXNnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9kaXJ0eSkge1xuICAgICAgICAgICAgdm9pZCBzaG93RGlhbG9nKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogdHJhbnMuX18oJ1dhcm5pbmcnKSxcbiAgICAgICAgICAgICAgICBib2R5OiB0cmFucy5fXygnU29tZSBjaGFuZ2VzIGhhdmUgbm90IGJlZW4gc2F2ZWQuIENvbnRpbnVlIHdpdGhvdXQgc2F2aW5nPycpXG4gICAgICAgICAgICB9KS50aGVuKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuYnV0dG9uLmFjY2VwdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIub25DbG9zZVJlcXVlc3QobXNnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICAgICAgc3VwZXIub25DbG9zZVJlcXVlc3QobXNnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNldHRpbmdzZWRpdG9yLmpzLm1hcCIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxufCBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTZXR0aW5nc0Zvcm1FZGl0b3IgfSBmcm9tICcuL1NldHRpbmdzRm9ybUVkaXRvcic7XG4vKipcbiAqIFJlYWN0IGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGEgbGlzdCBvZiBTZXR0aW5nc0Zvcm1FZGl0b3JcbiAqIGNvbXBvbmVudHMuXG4gKi9cbmV4cG9ydCBjb25zdCBTZXR0aW5nc1BhbmVsID0gKHsgc2V0dGluZ3MsIGVkaXRvclJlZ2lzdHJ5LCBvblNlbGVjdCwgaGFuZGxlU2VsZWN0U2lnbmFsLCBoYXNFcnJvciwgdXBkYXRlRGlydHlTdGF0ZSwgdXBkYXRlRmlsdGVyU2lnbmFsLCB0cmFuc2xhdG9yLCBpbml0aWFsRmlsdGVyIH0pID0+IHtcbiAgICBjb25zdCBbZXhwYW5kZWRQbHVnaW4sIHNldEV4cGFuZGVkUGx1Z2luXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IFtmaWx0ZXJQbHVnaW4sIHNldEZpbHRlcl0gPSB1c2VTdGF0ZSgoKSA9PiBpbml0aWFsRmlsdGVyKTtcbiAgICAvLyBSZWZzIHVzZWQgdG8ga2VlcCB0cmFjayBvZiBcInNlbGVjdGVkXCIgcGx1Z2luIGJhc2VkIG9uIHNjcm9sbCBsb2NhdGlvblxuICAgIGNvbnN0IGVkaXRvclJlZnMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IHNldHRpbmcgb2Ygc2V0dGluZ3MpIHtcbiAgICAgICAgZWRpdG9yUmVmc1tzZXR0aW5nLmlkXSA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgICB9XG4gICAgY29uc3Qgd3JhcHBlclJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgICBjb25zdCBlZGl0b3JEaXJ0eVN0YXRlcyA9IFJlYWN0LnVzZVJlZih7fSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBvbkZpbHRlclVwZGF0ZSA9IChsaXN0LCBuZXdGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIHNldEZpbHRlcigoKSA9PiBuZXdGaWx0ZXIpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBwbHVnaW5TZXR0aW5ncyBvZiBzZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkID0gbmV3RmlsdGVyKHBsdWdpblNldHRpbmdzLnBsdWdpbik7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkID09PSBudWxsIHx8IGZpbHRlcmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RXhwYW5kZWRQbHVnaW4ocGx1Z2luU2V0dGluZ3MuaWQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIFNldCBmaXJzdCB2aXNpYmxlIHBsdWdpbiBhcyBleHBhbmRlZCBwbHVnaW4gb24gaW5pdGlhbCBsb2FkLlxuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpblNldHRpbmdzIG9mIHNldHRpbmdzKSB7XG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IGZpbHRlclBsdWdpbihwbHVnaW5TZXR0aW5ncy5wbHVnaW4pO1xuICAgICAgICAgICAgaWYgKGZpbHRlcmVkID09PSBudWxsIHx8IGZpbHRlcmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzZXRFeHBhbmRlZFBsdWdpbihwbHVnaW5TZXR0aW5ncy5pZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2hlbiBmaWx0ZXIgdXBkYXRlcywgb25seSBzaG93IHBsdWdpbnMgdGhhdCBtYXRjaCBzZWFyY2guXG4gICAgICAgIHVwZGF0ZUZpbHRlclNpZ25hbC5jb25uZWN0KG9uRmlsdGVyVXBkYXRlKTtcbiAgICAgICAgY29uc3Qgb25TZWxlY3RDaGFuZ2UgPSAobGlzdCwgcGx1Z2luSWQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICBzZXRFeHBhbmRlZFBsdWdpbihleHBhbmRlZFBsdWdpbiAhPT0gcGx1Z2luSWQgPyBwbHVnaW5JZCA6IG51bGwpO1xuICAgICAgICAgICAgLy8gU2Nyb2xsIHRvIHRoZSBwbHVnaW4gd2hlbiBhIHNlbGVjdGlvbiBpcyBtYWRlIGluIHRoZSBsZWZ0IHBhbmVsLlxuICAgICAgICAgICAgKF9iID0gKF9hID0gZWRpdG9yUmVmc1twbHVnaW5JZF0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iuc2Nyb2xsSW50b1ZpZXcodHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIChfYSA9IGhhbmRsZVNlbGVjdFNpZ25hbCA9PT0gbnVsbCB8fCBoYW5kbGVTZWxlY3RTaWduYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRsZVNlbGVjdFNpZ25hbC5jb25uZWN0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChoYW5kbGVTZWxlY3RTaWduYWwsIG9uU2VsZWN0Q2hhbmdlKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHVwZGF0ZUZpbHRlclNpZ25hbC5kaXNjb25uZWN0KG9uRmlsdGVyVXBkYXRlKTtcbiAgICAgICAgICAgIChfYSA9IGhhbmRsZVNlbGVjdFNpZ25hbCA9PT0gbnVsbCB8fCBoYW5kbGVTZWxlY3RTaWduYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRsZVNlbGVjdFNpZ25hbC5kaXNjb25uZWN0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChoYW5kbGVTZWxlY3RTaWduYWwsIG9uU2VsZWN0Q2hhbmdlKTtcbiAgICAgICAgfTtcbiAgICB9LCBbXSk7XG4gICAgY29uc3QgdXBkYXRlRGlydHlTdGF0ZXMgPSAoaWQsIGRpcnR5KSA9PiB7XG4gICAgICAgIGlmIChlZGl0b3JEaXJ0eVN0YXRlcy5jdXJyZW50KSB7XG4gICAgICAgICAgICBlZGl0b3JEaXJ0eVN0YXRlcy5jdXJyZW50W2lkXSA9IGRpcnR5O1xuICAgICAgICAgICAgZm9yIChjb25zdCBlZGl0b3IgaW4gZWRpdG9yRGlydHlTdGF0ZXMuY3VycmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChlZGl0b3JEaXJ0eVN0YXRlcy5jdXJyZW50W2VkaXRvcl0pIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGlydHlTdGF0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVEaXJ0eVN0YXRlKGZhbHNlKTtcbiAgICB9O1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJqcC1TZXR0aW5nc1BhbmVsXCIsIHJlZjogd3JhcHBlclJlZiB9LCBzZXR0aW5ncy5tYXAocGx1Z2luU2V0dGluZ3MgPT4ge1xuICAgICAgICAvLyBQYXNzIGZpbHRlcmVkIHJlc3VsdHMgdG8gU2V0dGluZ3NGb3JtRWRpdG9yIHRvIG9ubHkgZGlzcGxheSBmaWx0ZXJlZCBmaWVsZHMuXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gZmlsdGVyUGx1Z2luKHBsdWdpblNldHRpbmdzLnBsdWdpbik7XG4gICAgICAgIC8vIElmIGZpbHRlcmVkIHJlc3VsdHMgYXJlIGFuIGFycmF5LCBvbmx5IHNob3cgaWYgdGhlIGFycmF5IGlzIG5vbi1lbXB0eS5cbiAgICAgICAgaWYgKGZpbHRlcmVkICE9PSBudWxsICYmIGZpbHRlcmVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyByZWY6IGVkaXRvclJlZnNbcGx1Z2luU2V0dGluZ3MuaWRdLCBjbGFzc05hbWU6IFwianAtU2V0dGluZ3NGb3JtXCIsIGtleTogYCR7cGx1Z2luU2V0dGluZ3MuaWR9U2V0dGluZ3NFZGl0b3JgIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNldHRpbmdzRm9ybUVkaXRvciwgeyBpc0NvbGxhcHNlZDogcGx1Z2luU2V0dGluZ3MuaWQgIT09IGV4cGFuZGVkUGx1Z2luLCBvbkNvbGxhcHNlQ2hhbmdlOiAod2lsbENvbGxhcHNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghd2lsbENvbGxhcHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRFeHBhbmRlZFBsdWdpbihwbHVnaW5TZXR0aW5ncy5pZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocGx1Z2luU2V0dGluZ3MuaWQgPT09IGV4cGFuZGVkUGx1Z2luKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRFeHBhbmRlZFBsdWdpbihudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGZpbHRlcmVkVmFsdWVzOiBmaWx0ZXJlZCwgc2V0dGluZ3M6IHBsdWdpblNldHRpbmdzLCByZW5kZXJlcnM6IGVkaXRvclJlZ2lzdHJ5LnJlbmRlcmVycywgaGFzRXJyb3I6IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBoYXNFcnJvcihwbHVnaW5TZXR0aW5ncy5pZCwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0sIHVwZGF0ZURpcnR5U3RhdGU6IChkaXJ0eSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVEaXJ0eVN0YXRlcyhwbHVnaW5TZXR0aW5ncy5pZCwgZGlydHkpO1xuICAgICAgICAgICAgICAgIH0sIG9uU2VsZWN0OiBvblNlbGVjdCwgdHJhbnNsYXRvcjogdHJhbnNsYXRvciB9KSkpO1xuICAgIH0pKSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2V0dGluZ3NwYW5lbC5qcy5tYXAiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmltcG9ydCB7IFNwbGl0UGFuZWwgYXMgU1BhbmVsIH0gZnJvbSAnQGx1bWluby93aWRnZXRzJztcbi8qKlxuICogQSBkZXByZWNhdGVkIHNwbGl0IHBhbmVsIHRoYXQgd2lsbCBiZSByZW1vdmVkIHdoZW4gdGhlIHBob3NwaG9yIHNwbGl0IHBhbmVsXG4gKiBzdXBwb3J0cyBhIGhhbmRsZSBtb3ZlZCBzaWduYWwuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vcGhvc3Bob3Jqcy9waG9zcGhvci9pc3N1ZXMvMjk3LlxuICovXG5leHBvcnQgY2xhc3MgU3BsaXRQYW5lbCBleHRlbmRzIFNQYW5lbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbWl0cyB3aGVuIHRoZSBzcGxpdCBoYW5kbGUgaGFzIG1vdmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5oYW5kbGVNb3ZlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgfVxuICAgIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgIHN1cGVyLmhhbmRsZUV2ZW50KGV2ZW50KTtcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZXVwJykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlZC5lbWl0KHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zcGxpdHBhbmVsLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=