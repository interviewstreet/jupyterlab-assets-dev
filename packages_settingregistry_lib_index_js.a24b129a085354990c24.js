(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_settingregistry_lib_index_js"],{

/***/ "../../packages/settingregistry/lib/index.js":
/*!***************************************************!*\
  !*** ../../packages/settingregistry/lib/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultSchemaValidator": () => (/* reexport safe */ _settingregistry__WEBPACK_IMPORTED_MODULE_0__.DefaultSchemaValidator),
/* harmony export */   "SettingRegistry": () => (/* reexport safe */ _settingregistry__WEBPACK_IMPORTED_MODULE_0__.SettingRegistry),
/* harmony export */   "Settings": () => (/* reexport safe */ _settingregistry__WEBPACK_IMPORTED_MODULE_0__.Settings),
/* harmony export */   "ISettingRegistry": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_1__.ISettingRegistry)
/* harmony export */ });
/* harmony import */ var _settingregistry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settingregistry */ "../../packages/settingregistry/lib/settingregistry.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tokens */ "../../packages/settingregistry/lib/tokens.js");
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module settingregistry
 */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/settingregistry/lib/plugin-schema.json":
/*!*************************************************************!*\
  !*** ../../packages/settingregistry/lib/plugin-schema.json ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema","title":"JupyterLab Plugin Settings/Preferences Schema","description":"JupyterLab plugin settings/preferences schema","version":"1.0.0","type":"object","additionalProperties":true,"properties":{"jupyter.lab.internationalization":{"type":"object","properties":{"selectors":{"type":"array","items":{"type":"string","minLength":1}},"domain":{"type":"string","minLength":1}}},"jupyter.lab.menus":{"type":"object","properties":{"main":{"title":"Main menu entries","description":"List of menu items to add to the main menubar.","items":{"$ref":"#/definitions/menu"},"type":"array","default":[]},"context":{"title":"The application context menu.","description":"List of context menu items.","items":{"allOf":[{"$ref":"#/definitions/menuItem"},{"properties":{"selector":{"description":"The CSS selector for the context menu item.","type":"string"}}}]},"type":"array","default":[]}},"additionalProperties":false},"jupyter.lab.setting-deprecated":{"type":"boolean","default":false},"jupyter.lab.setting-icon":{"type":"string","default":""},"jupyter.lab.setting-icon-class":{"type":"string","default":""},"jupyter.lab.setting-icon-label":{"type":"string","default":"Plugin"},"jupyter.lab.shortcuts":{"items":{"$ref":"#/definitions/shortcut"},"type":"array","default":[]},"jupyter.lab.toolbars":{"properties":{"^\\\\w[\\\\w-\\\\.]*$":{"items":{"$ref":"#/definitions/toolbarItem"},"type":"array","default":[]}},"type":"object","default":{}},"jupyter.lab.transform":{"type":"boolean","default":false}},"definitions":{"menu":{"properties":{"disabled":{"description":"Whether the menu is disabled or not","type":"boolean","default":false},"icon":{"description":"Menu icon id","type":"string"},"id":{"description":"Menu unique id","oneOf":[{"type":"string","enum":["jp-menu-file","jp-menu-file-new","jp-menu-edit","jp-menu-help","jp-menu-kernel","jp-menu-run","jp-menu-settings","jp-menu-view","jp-menu-tabs"]},{"type":"string","pattern":"[a-z][a-z0-9\\\\-_]+"}]},"items":{"description":"Menu items","type":"array","items":{"$ref":"#/definitions/menuItem"}},"label":{"description":"Menu label","type":"string"},"mnemonic":{"description":"Mnemonic index for the label","type":"number","minimum":-1,"default":-1},"rank":{"description":"Menu rank","type":"number","minimum":0}},"required":["id"],"type":"object"},"menuItem":{"properties":{"args":{"description":"Command arguments","type":"object"},"command":{"description":"Command id","type":"string"},"disabled":{"description":"Whether the item is disabled or not","type":"boolean","default":false},"type":{"description":"Item type","type":"string","enum":["command","submenu","separator"],"default":"command"},"rank":{"description":"Item rank","type":"number","minimum":0},"submenu":{"oneOf":[{"$ref":"#/definitions/menu"},{"type":"null"}]}},"type":"object"},"shortcut":{"properties":{"args":{"title":"The arguments for the command","type":"object"},"command":{"title":"The command id","description":"The command executed when the binding is matched.","type":"string"},"disabled":{"description":"Whether this shortcut is disabled or not.","type":"boolean","default":false},"keys":{"title":"The key sequence for the binding","description":"The key shortcut like `Accel A` or the sequence of shortcuts to press like [`Accel A`, `B`]","items":{"type":"string"},"type":"array"},"macKeys":{"title":"The key sequence for the binding on macOS","description":"The key shortcut like `Cmd A` or the sequence of shortcuts to press like [`Cmd A`, `B`]","items":{"type":"string"},"type":"array"},"winKeys":{"title":"The key sequence for the binding on Windows","description":"The key shortcut like `Ctrl A` or the sequence of shortcuts to press like [`Ctrl A`, `B`]","items":{"type":"string"},"type":"array"},"linuxKeys":{"title":"The key sequence for the binding on Linux","description":"The key shortcut like `Ctrl A` or the sequence of shortcuts to press like [`Ctrl A`, `B`]","items":{"type":"string"},"type":"array"},"selector":{"title":"CSS selector","type":"string"}},"required":["command","keys","selector"],"type":"object"},"toolbarItem":{"properties":{"name":{"title":"Unique name","type":"string"},"args":{"title":"Command arguments","type":"object"},"command":{"title":"Command id","type":"string","default":""},"disabled":{"title":"Whether the item is ignored or not","type":"boolean","default":false},"icon":{"title":"Item icon id","description":"If defined, it will override the command icon","type":"string"},"label":{"title":"Item label","description":"If defined, it will override the command label","type":"string"},"type":{"title":"Item type","type":"string","enum":["command","spacer"]},"rank":{"title":"Item rank","type":"number","minimum":0,"default":50}},"required":["name"],"additionalProperties":false,"type":"object"}}}');

/***/ }),

/***/ "../../packages/settingregistry/lib/settingregistry.js":
/*!*************************************************************!*\
  !*** ../../packages/settingregistry/lib/settingregistry.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultSchemaValidator": () => (/* binding */ DefaultSchemaValidator),
/* harmony export */   "SettingRegistry": () => (/* binding */ SettingRegistry),
/* harmony export */   "Settings": () => (/* binding */ Settings)
/* harmony export */ });
/* harmony import */ var _lumino_commands__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/commands */ "webpack/sharing/consume/default/@lumino/commands/@lumino/commands");
/* harmony import */ var _lumino_commands__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_commands__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ajv */ "../../node_modules/ajv/lib/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var json5__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! json5 */ "../../node_modules/json5/dist/index.js");
/* harmony import */ var json5__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(json5__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _plugin_schema_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plugin-schema.json */ "../../packages/settingregistry/lib/plugin-schema.json");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







/**
 * An alias for the JSON deep copy function.
 */
const copy = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepCopy;
/**
 * The default number of milliseconds before a `load()` call to the registry
 * will wait before timing out if it requires a transformation that has not been
 * registered.
 */
const DEFAULT_TRANSFORM_TIMEOUT = 1000;
/**
 * The ASCII record separator character.
 */
const RECORD_SEPARATOR = String.fromCharCode(30);
/**
 * The default implementation of a schema validator.
 */
class DefaultSchemaValidator {
    /**
     * Instantiate a schema validator.
     */
    constructor() {
        this._composer = new (ajv__WEBPACK_IMPORTED_MODULE_4___default())({ useDefaults: true });
        this._validator = new (ajv__WEBPACK_IMPORTED_MODULE_4___default())();
        this._composer.addSchema(_plugin_schema_json__WEBPACK_IMPORTED_MODULE_6__, 'jupyterlab-plugin-schema');
        this._validator.addSchema(_plugin_schema_json__WEBPACK_IMPORTED_MODULE_6__, 'jupyterlab-plugin-schema');
    }
    /**
     * Validate a plugin's schema and user data; populate the `composite` data.
     *
     * @param plugin - The plugin being validated. Its `composite` data will be
     * populated by reference.
     *
     * @param populate - Whether plugin data should be populated, defaults to
     * `true`.
     *
     * @return A list of errors if either the schema or data fail to validate or
     * `null` if there are no errors.
     */
    validateData(plugin, populate = true) {
        const validate = this._validator.getSchema(plugin.id);
        const compose = this._composer.getSchema(plugin.id);
        // If the schemas do not exist, add them to the validator and continue.
        if (!validate || !compose) {
            if (plugin.schema.type !== 'object') {
                const keyword = 'schema';
                const message = `Setting registry schemas' root-level type must be ` +
                    `'object', rejecting type: ${plugin.schema.type}`;
                return [{ dataPath: 'type', keyword, schemaPath: '', message }];
            }
            const errors = this._addSchema(plugin.id, plugin.schema);
            return errors || this.validateData(plugin);
        }
        // Parse the raw commented JSON into a user map.
        let user;
        try {
            user = json5__WEBPACK_IMPORTED_MODULE_5__.parse(plugin.raw);
        }
        catch (error) {
            if (error instanceof SyntaxError) {
                return [
                    {
                        dataPath: '',
                        keyword: 'syntax',
                        schemaPath: '',
                        message: error.message
                    }
                ];
            }
            const { column, description } = error;
            const line = error.lineNumber;
            return [
                {
                    dataPath: '',
                    keyword: 'parse',
                    schemaPath: '',
                    message: `${description} (line ${line} column ${column})`
                }
            ];
        }
        if (!validate(user)) {
            return validate.errors;
        }
        // Copy the user data before merging defaults into composite map.
        const composite = copy(user);
        if (!compose(composite)) {
            return compose.errors;
        }
        if (populate) {
            plugin.data = { composite, user };
        }
        return null;
    }
    /**
     * Add a schema to the validator.
     *
     * @param plugin - The plugin ID.
     *
     * @param schema - The schema being added.
     *
     * @return A list of errors if the schema fails to validate or `null` if there
     * are no errors.
     *
     * #### Notes
     * It is safe to call this function multiple times with the same plugin name.
     */
    _addSchema(plugin, schema) {
        const composer = this._composer;
        const validator = this._validator;
        const validate = validator.getSchema('jupyterlab-plugin-schema');
        // Validate against the main schema.
        if (!validate(schema)) {
            return validate.errors;
        }
        // Validate against the JSON schema meta-schema.
        if (!validator.validateSchema(schema)) {
            return validator.errors;
        }
        // Remove if schema already exists.
        composer.removeSchema(plugin);
        validator.removeSchema(plugin);
        // Add schema to the validator and composer.
        composer.addSchema(schema, plugin);
        validator.addSchema(schema, plugin);
        return null;
    }
}
/**
 * The default concrete implementation of a setting registry.
 */
class SettingRegistry {
    /**
     * Create a new setting registry.
     */
    constructor(options) {
        /**
         * The schema of the setting registry.
         */
        this.schema = _plugin_schema_json__WEBPACK_IMPORTED_MODULE_6__;
        /**
         * The collection of setting registry plugins.
         */
        this.plugins = Object.create(null);
        this._pluginChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal(this);
        this._ready = Promise.resolve();
        this._transformers = Object.create(null);
        this.connector = options.connector;
        this.validator = options.validator || new DefaultSchemaValidator();
        this._timeout = options.timeout || DEFAULT_TRANSFORM_TIMEOUT;
        // Preload with any available data at instantiation-time.
        if (options.plugins) {
            this._ready = this._preload(options.plugins);
        }
    }
    /**
     * A signal that emits the name of a plugin when its settings change.
     */
    get pluginChanged() {
        return this._pluginChanged;
    }
    /**
     * Get an individual setting.
     *
     * @param plugin - The name of the plugin whose settings are being retrieved.
     *
     * @param key - The name of the setting being retrieved.
     *
     * @returns A promise that resolves when the setting is retrieved.
     */
    async get(plugin, key) {
        // Wait for data preload before allowing normal operation.
        await this._ready;
        const plugins = this.plugins;
        if (plugin in plugins) {
            const { composite, user } = plugins[plugin].data;
            return {
                composite: composite[key] !== undefined ? copy(composite[key]) : undefined,
                user: user[key] !== undefined ? copy(user[key]) : undefined
            };
        }
        return this.load(plugin).then(() => this.get(plugin, key));
    }
    /**
     * Load a plugin's settings into the setting registry.
     *
     * @param plugin - The name of the plugin whose settings are being loaded.
     *
     * @returns A promise that resolves with a plugin settings object or rejects
     * if the plugin is not found.
     */
    async load(plugin) {
        // Wait for data preload before allowing normal operation.
        await this._ready;
        const plugins = this.plugins;
        const registry = this; // eslint-disable-line
        // If the plugin exists, resolve.
        if (plugin in plugins) {
            return new Settings({ plugin: plugins[plugin], registry });
        }
        // If the plugin needs to be loaded from the data connector, fetch.
        return this.reload(plugin);
    }
    /**
     * Reload a plugin's settings into the registry even if they already exist.
     *
     * @param plugin - The name of the plugin whose settings are being reloaded.
     *
     * @returns A promise that resolves with a plugin settings object or rejects
     * with a list of `ISchemaValidator.IError` objects if it fails.
     */
    async reload(plugin) {
        // Wait for data preload before allowing normal operation.
        await this._ready;
        const fetched = await this.connector.fetch(plugin);
        const plugins = this.plugins; // eslint-disable-line
        const registry = this; // eslint-disable-line
        if (fetched === undefined) {
            throw [
                {
                    dataPath: '',
                    keyword: 'id',
                    message: `Could not fetch settings for ${plugin}.`,
                    schemaPath: ''
                }
            ];
        }
        await this._load(await this._transform('fetch', fetched));
        this._pluginChanged.emit(plugin);
        return new Settings({ plugin: plugins[plugin], registry });
    }
    /**
     * Remove a single setting in the registry.
     *
     * @param plugin - The name of the plugin whose setting is being removed.
     *
     * @param key - The name of the setting being removed.
     *
     * @returns A promise that resolves when the setting is removed.
     */
    async remove(plugin, key) {
        // Wait for data preload before allowing normal operation.
        await this._ready;
        const plugins = this.plugins;
        if (!(plugin in plugins)) {
            return;
        }
        const raw = json5__WEBPACK_IMPORTED_MODULE_5__.parse(plugins[plugin].raw);
        // Delete both the value and any associated comment.
        delete raw[key];
        delete raw[`// ${key}`];
        plugins[plugin].raw = Private.annotatedPlugin(plugins[plugin], raw);
        return this._save(plugin);
    }
    /**
     * Set a single setting in the registry.
     *
     * @param plugin - The name of the plugin whose setting is being set.
     *
     * @param key - The name of the setting being set.
     *
     * @param value - The value of the setting being set.
     *
     * @returns A promise that resolves when the setting has been saved.
     *
     */
    async set(plugin, key, value) {
        // Wait for data preload before allowing normal operation.
        await this._ready;
        const plugins = this.plugins;
        if (!(plugin in plugins)) {
            return this.load(plugin).then(() => this.set(plugin, key, value));
        }
        // Parse the raw JSON string removing all comments and return an object.
        const raw = json5__WEBPACK_IMPORTED_MODULE_5__.parse(plugins[plugin].raw);
        plugins[plugin].raw = Private.annotatedPlugin(plugins[plugin], Object.assign(Object.assign({}, raw), { [key]: value }));
        return this._save(plugin);
    }
    /**
     * Register a plugin transform function to act on a specific plugin.
     *
     * @param plugin - The name of the plugin whose settings are transformed.
     *
     * @param transforms - The transform functions applied to the plugin.
     *
     * @returns A disposable that removes the transforms from the registry.
     *
     * #### Notes
     * - `compose` transformations: The registry automatically overwrites a
     * plugin's default values with user overrides, but a plugin may instead wish
     * to merge values. This behavior can be accomplished in a `compose`
     * transformation.
     * - `fetch` transformations: The registry uses the plugin data that is
     * fetched from its connector. If a plugin wants to override, e.g. to update
     * its schema with dynamic defaults, a `fetch` transformation can be applied.
     */
    transform(plugin, transforms) {
        const transformers = this._transformers;
        if (plugin in transformers) {
            throw new Error(`${plugin} already has a transformer.`);
        }
        transformers[plugin] = {
            fetch: transforms.fetch || (plugin => plugin),
            compose: transforms.compose || (plugin => plugin)
        };
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_2__.DisposableDelegate(() => {
            delete transformers[plugin];
        });
    }
    /**
     * Upload a plugin's settings.
     *
     * @param plugin - The name of the plugin whose settings are being set.
     *
     * @param raw - The raw plugin settings being uploaded.
     *
     * @returns A promise that resolves when the settings have been saved.
     */
    async upload(plugin, raw) {
        // Wait for data preload before allowing normal operation.
        await this._ready;
        const plugins = this.plugins;
        if (!(plugin in plugins)) {
            return this.load(plugin).then(() => this.upload(plugin, raw));
        }
        // Set the local copy.
        plugins[plugin].raw = raw;
        return this._save(plugin);
    }
    /**
     * Load a plugin into the registry.
     */
    async _load(data) {
        const plugin = data.id;
        // Validate and preload the item.
        try {
            await this._validate(data);
        }
        catch (errors) {
            const output = [`Validating ${plugin} failed:`];
            errors.forEach((error, index) => {
                const { dataPath, schemaPath, keyword, message } = error;
                if (dataPath || schemaPath) {
                    output.push(`${index} - schema @ ${schemaPath}, data @ ${dataPath}`);
                }
                output.push(`{${keyword}} ${message}`);
            });
            console.warn(output.join('\n'));
            throw errors;
        }
    }
    /**
     * Preload a list of plugins and fail gracefully.
     */
    async _preload(plugins) {
        await Promise.all(plugins.map(async (plugin) => {
            var _a;
            try {
                // Apply a transformation to the plugin if necessary.
                await this._load(await this._transform('fetch', plugin));
            }
            catch (errors) {
                /* Ignore preload timeout errors silently. */
                if (((_a = errors[0]) === null || _a === void 0 ? void 0 : _a.keyword) !== 'timeout') {
                    console.warn('Ignored setting registry preload errors.', errors);
                }
            }
        }));
    }
    /**
     * Save a plugin in the registry.
     */
    async _save(plugin) {
        const plugins = this.plugins;
        if (!(plugin in plugins)) {
            throw new Error(`${plugin} does not exist in setting registry.`);
        }
        try {
            await this._validate(plugins[plugin]);
        }
        catch (errors) {
            console.warn(`${plugin} validation errors:`, errors);
            throw new Error(`${plugin} failed to validate; check console.`);
        }
        await this.connector.save(plugin, plugins[plugin].raw);
        // Fetch and reload the data to guarantee server and client are in sync.
        const fetched = await this.connector.fetch(plugin);
        if (fetched === undefined) {
            throw [
                {
                    dataPath: '',
                    keyword: 'id',
                    message: `Could not fetch settings for ${plugin}.`,
                    schemaPath: ''
                }
            ];
        }
        await this._load(await this._transform('fetch', fetched));
        this._pluginChanged.emit(plugin);
    }
    /**
     * Transform the plugin if necessary.
     */
    async _transform(phase, plugin, started = new Date().getTime()) {
        const elapsed = new Date().getTime() - started;
        const id = plugin.id;
        const transformers = this._transformers;
        const timeout = this._timeout;
        if (!plugin.schema['jupyter.lab.transform']) {
            return plugin;
        }
        if (id in transformers) {
            const transformed = transformers[id][phase].call(null, plugin);
            if (transformed.id !== id) {
                throw [
                    {
                        dataPath: '',
                        keyword: 'id',
                        message: 'Plugin transformations cannot change plugin IDs.',
                        schemaPath: ''
                    }
                ];
            }
            return transformed;
        }
        // If the timeout has not been exceeded, stall and try again in 250ms.
        if (elapsed < timeout) {
            await new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, 250);
            });
            return this._transform(phase, plugin, started);
        }
        throw [
            {
                dataPath: '',
                keyword: 'timeout',
                message: `Transforming ${plugin.id} timed out.`,
                schemaPath: ''
            }
        ];
    }
    /**
     * Validate and preload a plugin, compose the `composite` data.
     */
    async _validate(plugin) {
        // Validate the user data and create the composite data.
        const errors = this.validator.validateData(plugin);
        if (errors) {
            throw errors;
        }
        // Apply a transformation if necessary and set the local copy.
        this.plugins[plugin.id] = await this._transform('compose', plugin);
    }
}
/**
 * A manager for a specific plugin's settings.
 */
class Settings {
    /**
     * Instantiate a new plugin settings manager.
     */
    constructor(options) {
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal(this);
        this._isDisposed = false;
        this.id = options.plugin.id;
        this.registry = options.registry;
        this.registry.pluginChanged.connect(this._onPluginChanged, this);
    }
    /**
     * A signal that emits when the plugin's settings have changed.
     */
    get changed() {
        return this._changed;
    }
    /**
     * The composite of user settings and extension defaults.
     */
    get composite() {
        return this.plugin.data.composite;
    }
    /**
     * Test whether the plugin settings manager disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    get plugin() {
        return this.registry.plugins[this.id];
    }
    /**
     * The plugin's schema.
     */
    get schema() {
        return this.plugin.schema;
    }
    /**
     * The plugin settings raw text value.
     */
    get raw() {
        return this.plugin.raw;
    }
    /**
     * Checks if any fields are different from the default value.
     */
    isDefault(user) {
        for (const key in this.schema.properties) {
            const value = user[key];
            const defaultValue = this.default(key);
            if (value === undefined ||
                defaultValue === undefined ||
                _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepEqual(value, _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.emptyObject) ||
                _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepEqual(value, _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.emptyArray)) {
                continue;
            }
            if (!_lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepEqual(value, defaultValue)) {
                return false;
            }
        }
        return true;
    }
    get isModified() {
        return !this.isDefault(this.user);
    }
    /**
     * The user settings.
     */
    get user() {
        return this.plugin.data.user;
    }
    /**
     * The published version of the NPM package containing these settings.
     */
    get version() {
        return this.plugin.version;
    }
    /**
     * Return the defaults in a commented JSON format.
     */
    annotatedDefaults() {
        return Private.annotatedDefaults(this.schema, this.id);
    }
    /**
     * Calculate the default value of a setting by iterating through the schema.
     *
     * @param key - The name of the setting whose default value is calculated.
     *
     * @returns A calculated default JSON value for a specific setting.
     */
    default(key) {
        return Private.reifyDefault(this.schema, key);
    }
    /**
     * Dispose of the plugin settings resources.
     */
    dispose() {
        if (this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal.clearData(this);
    }
    /**
     * Get an individual setting.
     *
     * @param key - The name of the setting being retrieved.
     *
     * @returns The setting value.
     *
     * #### Notes
     * This method returns synchronously because it uses a cached copy of the
     * plugin settings that is synchronized with the registry.
     */
    get(key) {
        const { composite, user } = this;
        return {
            composite: composite[key] !== undefined ? copy(composite[key]) : undefined,
            user: user[key] !== undefined ? copy(user[key]) : undefined
        };
    }
    /**
     * Remove a single setting.
     *
     * @param key - The name of the setting being removed.
     *
     * @returns A promise that resolves when the setting is removed.
     *
     * #### Notes
     * This function is asynchronous because it writes to the setting registry.
     */
    remove(key) {
        return this.registry.remove(this.plugin.id, key);
    }
    /**
     * Save all of the plugin's user settings at once.
     */
    save(raw) {
        return this.registry.upload(this.plugin.id, raw);
    }
    /**
     * Set a single setting.
     *
     * @param key - The name of the setting being set.
     *
     * @param value - The value of the setting.
     *
     * @returns A promise that resolves when the setting has been saved.
     *
     * #### Notes
     * This function is asynchronous because it writes to the setting registry.
     */
    set(key, value) {
        return this.registry.set(this.plugin.id, key, value);
    }
    /**
     * Validates raw settings with comments.
     *
     * @param raw - The JSON with comments string being validated.
     *
     * @returns A list of errors or `null` if valid.
     */
    validate(raw) {
        const data = { composite: {}, user: {} };
        const { id, schema } = this.plugin;
        const validator = this.registry.validator;
        const version = this.version;
        return validator.validateData({ data, id, raw, schema, version }, false);
    }
    /**
     * Handle plugin changes in the setting registry.
     */
    _onPluginChanged(sender, plugin) {
        if (plugin === this.plugin.id) {
            this._changed.emit(undefined);
        }
    }
}
/**
 * A namespace for `SettingRegistry` statics.
 */
(function (SettingRegistry) {
    /**
     * Reconcile the menus.
     *
     * @param reference The reference list of menus.
     * @param addition The list of menus to add.
     * @param warn Warn if the command items are duplicated within the same menu.
     * @returns The reconciled list of menus.
     */
    function reconcileMenus(reference, addition, warn = false, addNewItems = true) {
        if (!reference) {
            return addition && addNewItems ? _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepCopy(addition) : [];
        }
        if (!addition) {
            return _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepCopy(reference);
        }
        const merged = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepCopy(reference);
        addition.forEach(menu => {
            const refIndex = merged.findIndex(ref => ref.id === menu.id);
            if (refIndex >= 0) {
                merged[refIndex] = Object.assign(Object.assign(Object.assign({}, merged[refIndex]), menu), { items: reconcileItems(merged[refIndex].items, menu.items, warn, addNewItems) });
            }
            else {
                if (addNewItems) {
                    merged.push(menu);
                }
            }
        });
        return merged;
    }
    SettingRegistry.reconcileMenus = reconcileMenus;
    /**
     * Merge two set of menu items.
     *
     * @param reference Reference set of menu items
     * @param addition New items to add
     * @param warn Whether to warn if item is duplicated; default to false
     * @returns The merged set of items
     */
    function reconcileItems(reference, addition, warn = false, addNewItems = true) {
        if (!reference) {
            return addition ? _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepCopy(addition) : undefined;
        }
        if (!addition) {
            return _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepCopy(reference);
        }
        const items = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepCopy(reference);
        // Merge array element depending on the type
        addition.forEach(item => {
            var _a;
            switch ((_a = item.type) !== null && _a !== void 0 ? _a : 'command') {
                case 'separator':
                    if (addNewItems) {
                        items.push(Object.assign({}, item));
                    }
                    break;
                case 'submenu':
                    if (item.submenu) {
                        const refIndex = items.findIndex(ref => { var _a, _b; return ref.type === 'submenu' && ((_a = ref.submenu) === null || _a === void 0 ? void 0 : _a.id) === ((_b = item.submenu) === null || _b === void 0 ? void 0 : _b.id); });
                        if (refIndex < 0) {
                            if (addNewItems) {
                                items.push(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepCopy(item));
                            }
                        }
                        else {
                            items[refIndex] = Object.assign(Object.assign(Object.assign({}, items[refIndex]), item), { submenu: reconcileMenus(items[refIndex].submenu
                                    ? [items[refIndex].submenu]
                                    : null, [item.submenu], warn, addNewItems)[0] });
                        }
                    }
                    break;
                case 'command':
                    if (item.command) {
                        const refIndex = items.findIndex(ref => {
                            var _a, _b;
                            return ref.command === item.command &&
                                ref.selector === item.selector &&
                                _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepEqual((_a = ref.args) !== null && _a !== void 0 ? _a : {}, (_b = item.args) !== null && _b !== void 0 ? _b : {});
                        });
                        if (refIndex < 0) {
                            if (addNewItems) {
                                items.push(Object.assign({}, item));
                            }
                        }
                        else {
                            if (warn) {
                                console.warn(`Menu entry for command '${item.command}' is duplicated.`);
                            }
                            items[refIndex] = Object.assign(Object.assign({}, items[refIndex]), item);
                        }
                    }
            }
        });
        return items;
    }
    SettingRegistry.reconcileItems = reconcileItems;
    /**
     * Remove disabled entries from menu items
     *
     * @param items Menu items
     * @returns Filtered menu items
     */
    function filterDisabledItems(items) {
        return items.reduce((final, value) => {
            var _a;
            const copy = Object.assign({}, value);
            if (!copy.disabled) {
                if (copy.type === 'submenu') {
                    const { submenu } = copy;
                    if (submenu && !submenu.disabled) {
                        copy.submenu = Object.assign(Object.assign({}, submenu), { items: filterDisabledItems((_a = submenu.items) !== null && _a !== void 0 ? _a : []) });
                    }
                }
                final.push(copy);
            }
            return final;
        }, []);
    }
    SettingRegistry.filterDisabledItems = filterDisabledItems;
    /**
     * Reconcile default and user shortcuts and return the composite list.
     *
     * @param defaults - The list of default shortcuts.
     *
     * @param user - The list of user shortcut overrides and additions.
     *
     * @returns A loadable list of shortcuts (omitting disabled and overridden).
     */
    function reconcileShortcuts(defaults, user) {
        const memo = {};
        // If a user shortcut collides with another user shortcut warn and filter.
        user = user.filter(shortcut => {
            const keys = _lumino_commands__WEBPACK_IMPORTED_MODULE_0__.CommandRegistry.normalizeKeys(shortcut).join(RECORD_SEPARATOR);
            if (!keys) {
                console.warn('Skipping this shortcut because there are no actionable keys on this platform', shortcut);
                return false;
            }
            if (!(keys in memo)) {
                memo[keys] = {};
            }
            const { selector } = shortcut;
            if (!(selector in memo[keys])) {
                memo[keys][selector] = false; // Do not warn if a default shortcut conflicts.
                return true;
            }
            console.warn('Skipping this shortcut because it collides with another shortcut.', shortcut);
            return false;
        });
        // If a default shortcut collides with another default, warn and filter,
        // unless one of the shortcuts is a disabling shortcut (so look through
        // disabled shortcuts first). If a shortcut has already been added by the
        // user preferences, filter it out too (this includes shortcuts that are
        // disabled by user preferences).
        defaults = [
            ...defaults.filter(s => !!s.disabled),
            ...defaults.filter(s => !s.disabled)
        ].filter(shortcut => {
            const keys = _lumino_commands__WEBPACK_IMPORTED_MODULE_0__.CommandRegistry.normalizeKeys(shortcut).join(RECORD_SEPARATOR);
            if (!keys) {
                return false;
            }
            if (!(keys in memo)) {
                memo[keys] = {};
            }
            const { disabled, selector } = shortcut;
            if (!(selector in memo[keys])) {
                // Warn of future conflicts if the default shortcut is not disabled.
                memo[keys][selector] = !disabled;
                return true;
            }
            // We have a conflict now. Warn the user if we need to do so.
            if (memo[keys][selector]) {
                console.warn('Skipping this default shortcut because it collides with another default shortcut.', shortcut);
            }
            return false;
        });
        // Return all the shortcuts that should be registered
        return (user
            .concat(defaults)
            .filter(shortcut => !shortcut.disabled)
            // Fix shortcuts comparison in rjsf Form to avoid polluting the user settings
            .map(shortcut => {
            return Object.assign({ args: {} }, shortcut);
        }));
    }
    SettingRegistry.reconcileShortcuts = reconcileShortcuts;
    /**
     * Merge two set of toolbar items.
     *
     * @param reference Reference set of toolbar items
     * @param addition New items to add
     * @param warn Whether to warn if item is duplicated; default to false
     * @returns The merged set of items
     */
    function reconcileToolbarItems(reference, addition, warn = false) {
        if (!reference) {
            return addition ? _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepCopy(addition) : undefined;
        }
        if (!addition) {
            return _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepCopy(reference);
        }
        const items = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepCopy(reference);
        // Merge array element depending on the type
        addition.forEach(item => {
            switch (item.type) {
                case 'command':
                    if (item.command) {
                        const refIndex = items.findIndex(ref => {
                            var _a, _b;
                            return ref.name === item.name &&
                                ref.command === item.command &&
                                _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepEqual((_a = ref.args) !== null && _a !== void 0 ? _a : {}, (_b = item.args) !== null && _b !== void 0 ? _b : {});
                        });
                        if (refIndex < 0) {
                            items.push(Object.assign({}, item));
                        }
                        else {
                            if (warn) {
                                console.warn(`Toolbar item for command '${item.command}' is duplicated.`);
                            }
                            items[refIndex] = Object.assign(Object.assign({}, items[refIndex]), item);
                        }
                    }
                    break;
                case 'spacer':
                default: {
                    const refIndex = items.findIndex(ref => ref.name === item.name);
                    if (refIndex < 0) {
                        items.push(Object.assign({}, item));
                    }
                    else {
                        if (warn) {
                            console.warn(`Toolbar item '${item.name}' is duplicated.`);
                        }
                        items[refIndex] = Object.assign(Object.assign({}, items[refIndex]), item);
                    }
                }
            }
        });
        return items;
    }
    SettingRegistry.reconcileToolbarItems = reconcileToolbarItems;
})(SettingRegistry || (SettingRegistry = {}));
/**
 * A namespace for private module data.
 */
var Private;
(function (Private) {
    /**
     * The default indentation level, uses spaces instead of tabs.
     */
    const indent = '    ';
    /**
     * Replacement text for schema properties missing a `description` field.
     */
    const nondescript = '[missing schema description]';
    /**
     * Replacement text for schema properties missing a `title` field.
     */
    const untitled = '[missing schema title]';
    /**
     * Returns an annotated (JSON with comments) version of a schema's defaults.
     */
    function annotatedDefaults(schema, plugin) {
        const { description, properties, title } = schema;
        const keys = properties
            ? Object.keys(properties).sort((a, b) => a.localeCompare(b))
            : [];
        const length = Math.max((description || nondescript).length, plugin.length);
        return [
            '{',
            prefix(`${title || untitled}`),
            prefix(plugin),
            prefix(description || nondescript),
            prefix('*'.repeat(length)),
            '',
            join(keys.map(key => defaultDocumentedValue(schema, key))),
            '}'
        ].join('\n');
    }
    Private.annotatedDefaults = annotatedDefaults;
    /**
     * Returns an annotated (JSON with comments) version of a plugin's
     * setting data.
     */
    function annotatedPlugin(plugin, data) {
        const { description, title } = plugin.schema;
        const keys = Object.keys(data).sort((a, b) => a.localeCompare(b));
        const length = Math.max((description || nondescript).length, plugin.id.length);
        return [
            '{',
            prefix(`${title || untitled}`),
            prefix(plugin.id),
            prefix(description || nondescript),
            prefix('*'.repeat(length)),
            '',
            join(keys.map(key => documentedValue(plugin.schema, key, data[key]))),
            '}'
        ].join('\n');
    }
    Private.annotatedPlugin = annotatedPlugin;
    /**
     * Returns the default value-with-documentation-string for a
     * specific schema property.
     */
    function defaultDocumentedValue(schema, key) {
        const props = (schema.properties && schema.properties[key]) || {};
        const type = props['type'];
        const description = props['description'] || nondescript;
        const title = props['title'] || '';
        const reified = reifyDefault(schema, key);
        const spaces = indent.length;
        const defaults = reified !== undefined
            ? prefix(`"${key}": ${JSON.stringify(reified, null, spaces)}`, indent)
            : prefix(`"${key}": ${type}`);
        return [prefix(title), prefix(description), defaults]
            .filter(str => str.length)
            .join('\n');
    }
    /**
     * Returns a value-with-documentation-string for a specific schema property.
     */
    function documentedValue(schema, key, value) {
        const props = schema.properties && schema.properties[key];
        const description = (props && props['description']) || nondescript;
        const title = (props && props['title']) || untitled;
        const spaces = indent.length;
        const attribute = prefix(`"${key}": ${JSON.stringify(value, null, spaces)}`, indent);
        return [prefix(title), prefix(description), attribute].join('\n');
    }
    /**
     * Returns a joined string with line breaks and commas where appropriate.
     */
    function join(body) {
        return body.reduce((acc, val, idx) => {
            const rows = val.split('\n');
            const last = rows[rows.length - 1];
            const comment = last.trim().indexOf('//') === 0;
            const comma = comment || idx === body.length - 1 ? '' : ',';
            const separator = idx === body.length - 1 ? '' : '\n\n';
            return acc + val + comma + separator;
        }, '');
    }
    /**
     * Returns a documentation string with a comment prefix added on every line.
     */
    function prefix(source, pre = `${indent}// `) {
        return pre + source.split('\n').join(`\n${pre}`);
    }
    /**
     * Create a fully extrapolated default value for a root key in a schema.
     */
    function reifyDefault(schema, root) {
        var _a, _b, _c;
        const definitions = schema.definitions;
        // If the property is at the root level, traverse its schema.
        schema = (root ? (_a = schema.properties) === null || _a === void 0 ? void 0 : _a[root] : schema) || {};
        if (schema.type === 'object') {
            // Make a copy of the default value to populate.
            const result = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepCopy(schema.default);
            // Iterate through and populate each child property.
            const props = schema.properties || {};
            for (const property in props) {
                result[property] = reifyDefault(props[property]);
            }
            return result;
        }
        else if (schema.type === 'array') {
            // Make a copy of the default value to populate.
            const result = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepCopy(schema.default);
            // Items defines the properties of each item in the array
            let props = schema.items || {};
            // Use referenced definition if one exists
            if (props['$ref'] && definitions) {
                const ref = props['$ref'].replace('#/definitions/', '');
                props = (_b = definitions[ref]) !== null && _b !== void 0 ? _b : {};
            }
            // Iterate through the items in the array and fill in defaults
            for (const item in result) {
                // Use the values that are hard-coded in the default array over the defaults for each field.
                const reified = reifyDefault(props) || {};
                for (const prop in reified) {
                    if ((_c = result[item]) === null || _c === void 0 ? void 0 : _c[prop]) {
                        reified[prop] = result[item][prop];
                    }
                }
                result[item] = reified;
            }
            return result;
        }
        else {
            return schema.default;
        }
    }
    Private.reifyDefault = reifyDefault;
})(Private || (Private = {}));
//# sourceMappingURL=settingregistry.js.map

/***/ }),

/***/ "../../packages/settingregistry/lib/tokens.js":
/*!****************************************************!*\
  !*** ../../packages/settingregistry/lib/tokens.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ISettingRegistry": () => (/* binding */ ISettingRegistry)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/

/* tslint:disable */
/**
 * The setting registry token.
 */
const ISettingRegistry = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/coreutils:ISettingRegistry');
//# sourceMappingURL=tokens.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2V0dGluZ3JlZ2lzdHJ5L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvc2V0dGluZ3JlZ2lzdHJ5L2xpYi9zZXR0aW5ncmVnaXN0cnkuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3NldHRpbmdyZWdpc3RyeS9saWIvdG9rZW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDa0M7QUFDVDtBQUN6QixpQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ21EO0FBQ1A7QUFDWTtBQUNiO0FBQ3JCO0FBQ1M7QUFDVztBQUMxQztBQUNBO0FBQ0E7QUFDQSxhQUFhLCtEQUFnQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsNENBQUcsRUFBRSxvQkFBb0I7QUFDdEQsOEJBQThCLDRDQUFHO0FBQ2pDLGlDQUFpQyxnREFBTTtBQUN2QyxrQ0FBa0MsZ0RBQU07QUFDeEM7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsbUJBQW1CO0FBQ3BFLHlCQUF5QixxREFBcUQ7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsd0NBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsWUFBWSxTQUFTLEtBQUssVUFBVSxPQUFPO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsZ0RBQU07QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MscURBQU07QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0EsaUNBQWlDLG9DQUFvQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQyw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxPQUFPO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixvQ0FBb0M7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix3Q0FBVztBQUMvQjtBQUNBO0FBQ0EseUJBQXlCLElBQUk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix3Q0FBVztBQUMvQixxR0FBcUcsU0FBUyxlQUFlO0FBQzdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsT0FBTztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGtFQUFrQjtBQUNyQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxPQUFPO0FBQ2pEO0FBQ0EsdUJBQXVCLHlDQUF5QztBQUNoRTtBQUNBLG1DQUFtQyxNQUFNLGNBQWMsV0FBVyxXQUFXLFNBQVM7QUFDdEY7QUFDQSw4QkFBOEIsRUFBRSxTQUFTLEdBQUcsUUFBUTtBQUNwRCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixPQUFPO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsT0FBTztBQUNuQywrQkFBK0IsT0FBTyxvQkFBb0I7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELE9BQU87QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxVQUFVO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHFEQUFNO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsZ0VBQWlCLFFBQVEsa0VBQW1CO0FBQzVELGdCQUFnQixnRUFBaUIsUUFBUSxpRUFBa0I7QUFDM0Q7QUFDQTtBQUNBLGlCQUFpQixnRUFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsK0RBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxrQkFBa0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixjQUFjLFVBQVU7QUFDOUMsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7QUFDQSx1Q0FBdUMsaUNBQWlDO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QywrREFBZ0I7QUFDN0Q7QUFDQTtBQUNBLG1CQUFtQiwrREFBZ0I7QUFDbkM7QUFDQSx1QkFBdUIsK0RBQWdCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSw2QkFBNkIsK0VBQStFO0FBQzNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLCtEQUFnQjtBQUM5QztBQUNBO0FBQ0EsbUJBQW1CLCtEQUFnQjtBQUNuQztBQUNBLHNCQUFzQiwrREFBZ0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLFlBQVksdUtBQXVLLEVBQUU7QUFDdFA7QUFDQTtBQUNBLDJDQUEyQywrREFBZ0I7QUFDM0Q7QUFDQTtBQUNBO0FBQ0EsMEZBQTBGLDRCQUE0QjtBQUN0SDtBQUNBLG1GQUFtRjtBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsZ0VBQWlCLG9EQUFvRCxzREFBc0Q7QUFDM0oseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0UsYUFBYTtBQUNyRjtBQUNBLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQSwyQkFBMkIsVUFBVTtBQUNyQztBQUNBLHFFQUFxRSxhQUFhLHVGQUF1RjtBQUN6SztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QiwyRUFBNkI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsV0FBVztBQUM5QjtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsMkVBQTZCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLFNBQVMsRUFBRTtBQUM3QyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsK0RBQWdCO0FBQzlDO0FBQ0E7QUFDQSxtQkFBbUIsK0RBQWdCO0FBQ25DO0FBQ0Esc0JBQXNCLCtEQUFnQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsZ0VBQWlCLG9EQUFvRCxzREFBc0Q7QUFDM0oseUJBQXlCO0FBQ3pCO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRSxhQUFhO0FBQ3ZGO0FBQ0EsNEVBQTRFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxVQUFVO0FBQ3BFO0FBQ0Esd0VBQXdFO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBDQUEwQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlDQUFpQztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLHNCQUFzQixrQkFBa0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLHNCQUFzQixrQkFBa0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsSUFBSSxLQUFLLHNDQUFzQztBQUN4RSx5QkFBeUIsSUFBSSxLQUFLLEtBQUs7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLElBQUksS0FBSyxvQ0FBb0M7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsT0FBTztBQUM1QyxrREFBa0QsSUFBSTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLCtEQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsK0RBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0IsMkM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcmhDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNPLDZCQUE2QixvREFBSztBQUN6QyxrQyIsImZpbGUiOiJwYWNrYWdlc19zZXR0aW5ncmVnaXN0cnlfbGliX2luZGV4X2pzLmEyNGIxMjlhMDg1MzU0OTkwYzI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBzZXR0aW5ncmVnaXN0cnlcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9zZXR0aW5ncmVnaXN0cnknO1xuZXhwb3J0ICogZnJvbSAnLi90b2tlbnMnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgQ29tbWFuZFJlZ2lzdHJ5IH0gZnJvbSAnQGx1bWluby9jb21tYW5kcyc7XG5pbXBvcnQgeyBKU09ORXh0IH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgRGlzcG9zYWJsZURlbGVnYXRlIH0gZnJvbSAnQGx1bWluby9kaXNwb3NhYmxlJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmltcG9ydCBBanYgZnJvbSAnYWp2JztcbmltcG9ydCAqIGFzIGpzb241IGZyb20gJ2pzb241JztcbmltcG9ydCBTQ0hFTUEgZnJvbSAnLi9wbHVnaW4tc2NoZW1hLmpzb24nO1xuLyoqXG4gKiBBbiBhbGlhcyBmb3IgdGhlIEpTT04gZGVlcCBjb3B5IGZ1bmN0aW9uLlxuICovXG5jb25zdCBjb3B5ID0gSlNPTkV4dC5kZWVwQ29weTtcbi8qKlxuICogVGhlIGRlZmF1bHQgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBiZWZvcmUgYSBgbG9hZCgpYCBjYWxsIHRvIHRoZSByZWdpc3RyeVxuICogd2lsbCB3YWl0IGJlZm9yZSB0aW1pbmcgb3V0IGlmIGl0IHJlcXVpcmVzIGEgdHJhbnNmb3JtYXRpb24gdGhhdCBoYXMgbm90IGJlZW5cbiAqIHJlZ2lzdGVyZWQuXG4gKi9cbmNvbnN0IERFRkFVTFRfVFJBTlNGT1JNX1RJTUVPVVQgPSAxMDAwO1xuLyoqXG4gKiBUaGUgQVNDSUkgcmVjb3JkIHNlcGFyYXRvciBjaGFyYWN0ZXIuXG4gKi9cbmNvbnN0IFJFQ09SRF9TRVBBUkFUT1IgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDMwKTtcbi8qKlxuICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgYSBzY2hlbWEgdmFsaWRhdG9yLlxuICovXG5leHBvcnQgY2xhc3MgRGVmYXVsdFNjaGVtYVZhbGlkYXRvciB7XG4gICAgLyoqXG4gICAgICogSW5zdGFudGlhdGUgYSBzY2hlbWEgdmFsaWRhdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9jb21wb3NlciA9IG5ldyBBanYoeyB1c2VEZWZhdWx0czogdHJ1ZSB9KTtcbiAgICAgICAgdGhpcy5fdmFsaWRhdG9yID0gbmV3IEFqdigpO1xuICAgICAgICB0aGlzLl9jb21wb3Nlci5hZGRTY2hlbWEoU0NIRU1BLCAnanVweXRlcmxhYi1wbHVnaW4tc2NoZW1hJyk7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRvci5hZGRTY2hlbWEoU0NIRU1BLCAnanVweXRlcmxhYi1wbHVnaW4tc2NoZW1hJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIGEgcGx1Z2luJ3Mgc2NoZW1hIGFuZCB1c2VyIGRhdGE7IHBvcHVsYXRlIHRoZSBgY29tcG9zaXRlYCBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBsdWdpbiAtIFRoZSBwbHVnaW4gYmVpbmcgdmFsaWRhdGVkLiBJdHMgYGNvbXBvc2l0ZWAgZGF0YSB3aWxsIGJlXG4gICAgICogcG9wdWxhdGVkIGJ5IHJlZmVyZW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwb3B1bGF0ZSAtIFdoZXRoZXIgcGx1Z2luIGRhdGEgc2hvdWxkIGJlIHBvcHVsYXRlZCwgZGVmYXVsdHMgdG9cbiAgICAgKiBgdHJ1ZWAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIEEgbGlzdCBvZiBlcnJvcnMgaWYgZWl0aGVyIHRoZSBzY2hlbWEgb3IgZGF0YSBmYWlsIHRvIHZhbGlkYXRlIG9yXG4gICAgICogYG51bGxgIGlmIHRoZXJlIGFyZSBubyBlcnJvcnMuXG4gICAgICovXG4gICAgdmFsaWRhdGVEYXRhKHBsdWdpbiwgcG9wdWxhdGUgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRlID0gdGhpcy5fdmFsaWRhdG9yLmdldFNjaGVtYShwbHVnaW4uaWQpO1xuICAgICAgICBjb25zdCBjb21wb3NlID0gdGhpcy5fY29tcG9zZXIuZ2V0U2NoZW1hKHBsdWdpbi5pZCk7XG4gICAgICAgIC8vIElmIHRoZSBzY2hlbWFzIGRvIG5vdCBleGlzdCwgYWRkIHRoZW0gdG8gdGhlIHZhbGlkYXRvciBhbmQgY29udGludWUuXG4gICAgICAgIGlmICghdmFsaWRhdGUgfHwgIWNvbXBvc2UpIHtcbiAgICAgICAgICAgIGlmIChwbHVnaW4uc2NoZW1hLnR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5d29yZCA9ICdzY2hlbWEnO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgU2V0dGluZyByZWdpc3RyeSBzY2hlbWFzJyByb290LWxldmVsIHR5cGUgbXVzdCBiZSBgICtcbiAgICAgICAgICAgICAgICAgICAgYCdvYmplY3QnLCByZWplY3RpbmcgdHlwZTogJHtwbHVnaW4uc2NoZW1hLnR5cGV9YDtcbiAgICAgICAgICAgICAgICByZXR1cm4gW3sgZGF0YVBhdGg6ICd0eXBlJywga2V5d29yZCwgc2NoZW1hUGF0aDogJycsIG1lc3NhZ2UgfV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLl9hZGRTY2hlbWEocGx1Z2luLmlkLCBwbHVnaW4uc2NoZW1hKTtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcnMgfHwgdGhpcy52YWxpZGF0ZURhdGEocGx1Z2luKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBQYXJzZSB0aGUgcmF3IGNvbW1lbnRlZCBKU09OIGludG8gYSB1c2VyIG1hcC5cbiAgICAgICAgbGV0IHVzZXI7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB1c2VyID0ganNvbjUucGFyc2UocGx1Z2luLnJhdyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBTeW50YXhFcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFQYXRoOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXdvcmQ6ICdzeW50YXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NoZW1hUGF0aDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBjb2x1bW4sIGRlc2NyaXB0aW9uIH0gPSBlcnJvcjtcbiAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBlcnJvci5saW5lTnVtYmVyO1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFQYXRoOiAnJyxcbiAgICAgICAgICAgICAgICAgICAga2V5d29yZDogJ3BhcnNlJyxcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1hUGF0aDogJycsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGAke2Rlc2NyaXB0aW9ufSAobGluZSAke2xpbmV9IGNvbHVtbiAke2NvbHVtbn0pYFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2YWxpZGF0ZSh1c2VyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRlLmVycm9ycztcbiAgICAgICAgfVxuICAgICAgICAvLyBDb3B5IHRoZSB1c2VyIGRhdGEgYmVmb3JlIG1lcmdpbmcgZGVmYXVsdHMgaW50byBjb21wb3NpdGUgbWFwLlxuICAgICAgICBjb25zdCBjb21wb3NpdGUgPSBjb3B5KHVzZXIpO1xuICAgICAgICBpZiAoIWNvbXBvc2UoY29tcG9zaXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2UuZXJyb3JzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3B1bGF0ZSkge1xuICAgICAgICAgICAgcGx1Z2luLmRhdGEgPSB7IGNvbXBvc2l0ZSwgdXNlciB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgYSBzY2hlbWEgdG8gdGhlIHZhbGlkYXRvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwbHVnaW4gLSBUaGUgcGx1Z2luIElELlxuICAgICAqXG4gICAgICogQHBhcmFtIHNjaGVtYSAtIFRoZSBzY2hlbWEgYmVpbmcgYWRkZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIEEgbGlzdCBvZiBlcnJvcnMgaWYgdGhlIHNjaGVtYSBmYWlscyB0byB2YWxpZGF0ZSBvciBgbnVsbGAgaWYgdGhlcmVcbiAgICAgKiBhcmUgbm8gZXJyb3JzLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIEl0IGlzIHNhZmUgdG8gY2FsbCB0aGlzIGZ1bmN0aW9uIG11bHRpcGxlIHRpbWVzIHdpdGggdGhlIHNhbWUgcGx1Z2luIG5hbWUuXG4gICAgICovXG4gICAgX2FkZFNjaGVtYShwbHVnaW4sIHNjaGVtYSkge1xuICAgICAgICBjb25zdCBjb21wb3NlciA9IHRoaXMuX2NvbXBvc2VyO1xuICAgICAgICBjb25zdCB2YWxpZGF0b3IgPSB0aGlzLl92YWxpZGF0b3I7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRlID0gdmFsaWRhdG9yLmdldFNjaGVtYSgnanVweXRlcmxhYi1wbHVnaW4tc2NoZW1hJyk7XG4gICAgICAgIC8vIFZhbGlkYXRlIGFnYWluc3QgdGhlIG1haW4gc2NoZW1hLlxuICAgICAgICBpZiAoIXZhbGlkYXRlKHNjaGVtYSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWxpZGF0ZS5lcnJvcnM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVmFsaWRhdGUgYWdhaW5zdCB0aGUgSlNPTiBzY2hlbWEgbWV0YS1zY2hlbWEuXG4gICAgICAgIGlmICghdmFsaWRhdG9yLnZhbGlkYXRlU2NoZW1hKHNjaGVtYSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWxpZGF0b3IuZXJyb3JzO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSBpZiBzY2hlbWEgYWxyZWFkeSBleGlzdHMuXG4gICAgICAgIGNvbXBvc2VyLnJlbW92ZVNjaGVtYShwbHVnaW4pO1xuICAgICAgICB2YWxpZGF0b3IucmVtb3ZlU2NoZW1hKHBsdWdpbik7XG4gICAgICAgIC8vIEFkZCBzY2hlbWEgdG8gdGhlIHZhbGlkYXRvciBhbmQgY29tcG9zZXIuXG4gICAgICAgIGNvbXBvc2VyLmFkZFNjaGVtYShzY2hlbWEsIHBsdWdpbik7XG4gICAgICAgIHZhbGlkYXRvci5hZGRTY2hlbWEoc2NoZW1hLCBwbHVnaW4pO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG4vKipcbiAqIFRoZSBkZWZhdWx0IGNvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIGEgc2V0dGluZyByZWdpc3RyeS5cbiAqL1xuZXhwb3J0IGNsYXNzIFNldHRpbmdSZWdpc3RyeSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHNldHRpbmcgcmVnaXN0cnkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHNjaGVtYSBvZiB0aGUgc2V0dGluZyByZWdpc3RyeS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2NoZW1hID0gU0NIRU1BO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNvbGxlY3Rpb24gb2Ygc2V0dGluZyByZWdpc3RyeSBwbHVnaW5zLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wbHVnaW5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fcGx1Z2luQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX3JlYWR5ID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybWVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuY29ubmVjdG9yID0gb3B0aW9ucy5jb25uZWN0b3I7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gb3B0aW9ucy52YWxpZGF0b3IgfHwgbmV3IERlZmF1bHRTY2hlbWFWYWxpZGF0b3IoKTtcbiAgICAgICAgdGhpcy5fdGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCBERUZBVUxUX1RSQU5TRk9STV9USU1FT1VUO1xuICAgICAgICAvLyBQcmVsb2FkIHdpdGggYW55IGF2YWlsYWJsZSBkYXRhIGF0IGluc3RhbnRpYXRpb24tdGltZS5cbiAgICAgICAgaWYgKG9wdGlvbnMucGx1Z2lucykge1xuICAgICAgICAgICAgdGhpcy5fcmVhZHkgPSB0aGlzLl9wcmVsb2FkKG9wdGlvbnMucGx1Z2lucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgdGhhdCBlbWl0cyB0aGUgbmFtZSBvZiBhIHBsdWdpbiB3aGVuIGl0cyBzZXR0aW5ncyBjaGFuZ2UuXG4gICAgICovXG4gICAgZ2V0IHBsdWdpbkNoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbHVnaW5DaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gaW5kaXZpZHVhbCBzZXR0aW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBsdWdpbiAtIFRoZSBuYW1lIG9mIHRoZSBwbHVnaW4gd2hvc2Ugc2V0dGluZ3MgYXJlIGJlaW5nIHJldHJpZXZlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXkgLSBUaGUgbmFtZSBvZiB0aGUgc2V0dGluZyBiZWluZyByZXRyaWV2ZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzZXR0aW5nIGlzIHJldHJpZXZlZC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXQocGx1Z2luLCBrZXkpIHtcbiAgICAgICAgLy8gV2FpdCBmb3IgZGF0YSBwcmVsb2FkIGJlZm9yZSBhbGxvd2luZyBub3JtYWwgb3BlcmF0aW9uLlxuICAgICAgICBhd2FpdCB0aGlzLl9yZWFkeTtcbiAgICAgICAgY29uc3QgcGx1Z2lucyA9IHRoaXMucGx1Z2lucztcbiAgICAgICAgaWYgKHBsdWdpbiBpbiBwbHVnaW5zKSB7XG4gICAgICAgICAgICBjb25zdCB7IGNvbXBvc2l0ZSwgdXNlciB9ID0gcGx1Z2luc1twbHVnaW5dLmRhdGE7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNvbXBvc2l0ZTogY29tcG9zaXRlW2tleV0gIT09IHVuZGVmaW5lZCA/IGNvcHkoY29tcG9zaXRlW2tleV0pIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHVzZXI6IHVzZXJba2V5XSAhPT0gdW5kZWZpbmVkID8gY29weSh1c2VyW2tleV0pIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWQocGx1Z2luKS50aGVuKCgpID0+IHRoaXMuZ2V0KHBsdWdpbiwga2V5KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvYWQgYSBwbHVnaW4ncyBzZXR0aW5ncyBpbnRvIHRoZSBzZXR0aW5nIHJlZ2lzdHJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBsdWdpbiAtIFRoZSBuYW1lIG9mIHRoZSBwbHVnaW4gd2hvc2Ugc2V0dGluZ3MgYXJlIGJlaW5nIGxvYWRlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYSBwbHVnaW4gc2V0dGluZ3Mgb2JqZWN0IG9yIHJlamVjdHNcbiAgICAgKiBpZiB0aGUgcGx1Z2luIGlzIG5vdCBmb3VuZC5cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkKHBsdWdpbikge1xuICAgICAgICAvLyBXYWl0IGZvciBkYXRhIHByZWxvYWQgYmVmb3JlIGFsbG93aW5nIG5vcm1hbCBvcGVyYXRpb24uXG4gICAgICAgIGF3YWl0IHRoaXMuX3JlYWR5O1xuICAgICAgICBjb25zdCBwbHVnaW5zID0gdGhpcy5wbHVnaW5zO1xuICAgICAgICBjb25zdCByZWdpc3RyeSA9IHRoaXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgLy8gSWYgdGhlIHBsdWdpbiBleGlzdHMsIHJlc29sdmUuXG4gICAgICAgIGlmIChwbHVnaW4gaW4gcGx1Z2lucykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXR0aW5ncyh7IHBsdWdpbjogcGx1Z2luc1twbHVnaW5dLCByZWdpc3RyeSB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgcGx1Z2luIG5lZWRzIHRvIGJlIGxvYWRlZCBmcm9tIHRoZSBkYXRhIGNvbm5lY3RvciwgZmV0Y2guXG4gICAgICAgIHJldHVybiB0aGlzLnJlbG9hZChwbHVnaW4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWxvYWQgYSBwbHVnaW4ncyBzZXR0aW5ncyBpbnRvIHRoZSByZWdpc3RyeSBldmVuIGlmIHRoZXkgYWxyZWFkeSBleGlzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwbHVnaW4gLSBUaGUgbmFtZSBvZiB0aGUgcGx1Z2luIHdob3NlIHNldHRpbmdzIGFyZSBiZWluZyByZWxvYWRlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYSBwbHVnaW4gc2V0dGluZ3Mgb2JqZWN0IG9yIHJlamVjdHNcbiAgICAgKiB3aXRoIGEgbGlzdCBvZiBgSVNjaGVtYVZhbGlkYXRvci5JRXJyb3JgIG9iamVjdHMgaWYgaXQgZmFpbHMuXG4gICAgICovXG4gICAgYXN5bmMgcmVsb2FkKHBsdWdpbikge1xuICAgICAgICAvLyBXYWl0IGZvciBkYXRhIHByZWxvYWQgYmVmb3JlIGFsbG93aW5nIG5vcm1hbCBvcGVyYXRpb24uXG4gICAgICAgIGF3YWl0IHRoaXMuX3JlYWR5O1xuICAgICAgICBjb25zdCBmZXRjaGVkID0gYXdhaXQgdGhpcy5jb25uZWN0b3IuZmV0Y2gocGx1Z2luKTtcbiAgICAgICAgY29uc3QgcGx1Z2lucyA9IHRoaXMucGx1Z2luczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICBjb25zdCByZWdpc3RyeSA9IHRoaXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgaWYgKGZldGNoZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVBhdGg6ICcnLFxuICAgICAgICAgICAgICAgICAgICBrZXl3b3JkOiAnaWQnLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgQ291bGQgbm90IGZldGNoIHNldHRpbmdzIGZvciAke3BsdWdpbn0uYCxcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1hUGF0aDogJydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuX2xvYWQoYXdhaXQgdGhpcy5fdHJhbnNmb3JtKCdmZXRjaCcsIGZldGNoZWQpKTtcbiAgICAgICAgdGhpcy5fcGx1Z2luQ2hhbmdlZC5lbWl0KHBsdWdpbik7XG4gICAgICAgIHJldHVybiBuZXcgU2V0dGluZ3MoeyBwbHVnaW46IHBsdWdpbnNbcGx1Z2luXSwgcmVnaXN0cnkgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIHNpbmdsZSBzZXR0aW5nIGluIHRoZSByZWdpc3RyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwbHVnaW4gLSBUaGUgbmFtZSBvZiB0aGUgcGx1Z2luIHdob3NlIHNldHRpbmcgaXMgYmVpbmcgcmVtb3ZlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXkgLSBUaGUgbmFtZSBvZiB0aGUgc2V0dGluZyBiZWluZyByZW1vdmVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgc2V0dGluZyBpcyByZW1vdmVkLlxuICAgICAqL1xuICAgIGFzeW5jIHJlbW92ZShwbHVnaW4sIGtleSkge1xuICAgICAgICAvLyBXYWl0IGZvciBkYXRhIHByZWxvYWQgYmVmb3JlIGFsbG93aW5nIG5vcm1hbCBvcGVyYXRpb24uXG4gICAgICAgIGF3YWl0IHRoaXMuX3JlYWR5O1xuICAgICAgICBjb25zdCBwbHVnaW5zID0gdGhpcy5wbHVnaW5zO1xuICAgICAgICBpZiAoIShwbHVnaW4gaW4gcGx1Z2lucykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByYXcgPSBqc29uNS5wYXJzZShwbHVnaW5zW3BsdWdpbl0ucmF3KTtcbiAgICAgICAgLy8gRGVsZXRlIGJvdGggdGhlIHZhbHVlIGFuZCBhbnkgYXNzb2NpYXRlZCBjb21tZW50LlxuICAgICAgICBkZWxldGUgcmF3W2tleV07XG4gICAgICAgIGRlbGV0ZSByYXdbYC8vICR7a2V5fWBdO1xuICAgICAgICBwbHVnaW5zW3BsdWdpbl0ucmF3ID0gUHJpdmF0ZS5hbm5vdGF0ZWRQbHVnaW4ocGx1Z2luc1twbHVnaW5dLCByYXcpO1xuICAgICAgICByZXR1cm4gdGhpcy5fc2F2ZShwbHVnaW4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgYSBzaW5nbGUgc2V0dGluZyBpbiB0aGUgcmVnaXN0cnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGx1Z2luIC0gVGhlIG5hbWUgb2YgdGhlIHBsdWdpbiB3aG9zZSBzZXR0aW5nIGlzIGJlaW5nIHNldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXkgLSBUaGUgbmFtZSBvZiB0aGUgc2V0dGluZyBiZWluZyBzZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgb2YgdGhlIHNldHRpbmcgYmVpbmcgc2V0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgc2V0dGluZyBoYXMgYmVlbiBzYXZlZC5cbiAgICAgKlxuICAgICAqL1xuICAgIGFzeW5jIHNldChwbHVnaW4sIGtleSwgdmFsdWUpIHtcbiAgICAgICAgLy8gV2FpdCBmb3IgZGF0YSBwcmVsb2FkIGJlZm9yZSBhbGxvd2luZyBub3JtYWwgb3BlcmF0aW9uLlxuICAgICAgICBhd2FpdCB0aGlzLl9yZWFkeTtcbiAgICAgICAgY29uc3QgcGx1Z2lucyA9IHRoaXMucGx1Z2lucztcbiAgICAgICAgaWYgKCEocGx1Z2luIGluIHBsdWdpbnMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkKHBsdWdpbikudGhlbigoKSA9PiB0aGlzLnNldChwbHVnaW4sIGtleSwgdmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBQYXJzZSB0aGUgcmF3IEpTT04gc3RyaW5nIHJlbW92aW5nIGFsbCBjb21tZW50cyBhbmQgcmV0dXJuIGFuIG9iamVjdC5cbiAgICAgICAgY29uc3QgcmF3ID0ganNvbjUucGFyc2UocGx1Z2luc1twbHVnaW5dLnJhdyk7XG4gICAgICAgIHBsdWdpbnNbcGx1Z2luXS5yYXcgPSBQcml2YXRlLmFubm90YXRlZFBsdWdpbihwbHVnaW5zW3BsdWdpbl0sIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcmF3KSwgeyBba2V5XTogdmFsdWUgfSkpO1xuICAgICAgICByZXR1cm4gdGhpcy5fc2F2ZShwbHVnaW4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBhIHBsdWdpbiB0cmFuc2Zvcm0gZnVuY3Rpb24gdG8gYWN0IG9uIGEgc3BlY2lmaWMgcGx1Z2luLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBsdWdpbiAtIFRoZSBuYW1lIG9mIHRoZSBwbHVnaW4gd2hvc2Ugc2V0dGluZ3MgYXJlIHRyYW5zZm9ybWVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRyYW5zZm9ybXMgLSBUaGUgdHJhbnNmb3JtIGZ1bmN0aW9ucyBhcHBsaWVkIHRvIHRoZSBwbHVnaW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIGRpc3Bvc2FibGUgdGhhdCByZW1vdmVzIHRoZSB0cmFuc2Zvcm1zIGZyb20gdGhlIHJlZ2lzdHJ5LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIC0gYGNvbXBvc2VgIHRyYW5zZm9ybWF0aW9uczogVGhlIHJlZ2lzdHJ5IGF1dG9tYXRpY2FsbHkgb3ZlcndyaXRlcyBhXG4gICAgICogcGx1Z2luJ3MgZGVmYXVsdCB2YWx1ZXMgd2l0aCB1c2VyIG92ZXJyaWRlcywgYnV0IGEgcGx1Z2luIG1heSBpbnN0ZWFkIHdpc2hcbiAgICAgKiB0byBtZXJnZSB2YWx1ZXMuIFRoaXMgYmVoYXZpb3IgY2FuIGJlIGFjY29tcGxpc2hlZCBpbiBhIGBjb21wb3NlYFxuICAgICAqIHRyYW5zZm9ybWF0aW9uLlxuICAgICAqIC0gYGZldGNoYCB0cmFuc2Zvcm1hdGlvbnM6IFRoZSByZWdpc3RyeSB1c2VzIHRoZSBwbHVnaW4gZGF0YSB0aGF0IGlzXG4gICAgICogZmV0Y2hlZCBmcm9tIGl0cyBjb25uZWN0b3IuIElmIGEgcGx1Z2luIHdhbnRzIHRvIG92ZXJyaWRlLCBlLmcuIHRvIHVwZGF0ZVxuICAgICAqIGl0cyBzY2hlbWEgd2l0aCBkeW5hbWljIGRlZmF1bHRzLCBhIGBmZXRjaGAgdHJhbnNmb3JtYXRpb24gY2FuIGJlIGFwcGxpZWQuXG4gICAgICovXG4gICAgdHJhbnNmb3JtKHBsdWdpbiwgdHJhbnNmb3Jtcykge1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1lcnMgPSB0aGlzLl90cmFuc2Zvcm1lcnM7XG4gICAgICAgIGlmIChwbHVnaW4gaW4gdHJhbnNmb3JtZXJzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cGx1Z2lufSBhbHJlYWR5IGhhcyBhIHRyYW5zZm9ybWVyLmApO1xuICAgICAgICB9XG4gICAgICAgIHRyYW5zZm9ybWVyc1twbHVnaW5dID0ge1xuICAgICAgICAgICAgZmV0Y2g6IHRyYW5zZm9ybXMuZmV0Y2ggfHwgKHBsdWdpbiA9PiBwbHVnaW4pLFxuICAgICAgICAgICAgY29tcG9zZTogdHJhbnNmb3Jtcy5jb21wb3NlIHx8IChwbHVnaW4gPT4gcGx1Z2luKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IERpc3Bvc2FibGVEZWxlZ2F0ZSgoKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgdHJhbnNmb3JtZXJzW3BsdWdpbl07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGxvYWQgYSBwbHVnaW4ncyBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwbHVnaW4gLSBUaGUgbmFtZSBvZiB0aGUgcGx1Z2luIHdob3NlIHNldHRpbmdzIGFyZSBiZWluZyBzZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmF3IC0gVGhlIHJhdyBwbHVnaW4gc2V0dGluZ3MgYmVpbmcgdXBsb2FkZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzZXR0aW5ncyBoYXZlIGJlZW4gc2F2ZWQuXG4gICAgICovXG4gICAgYXN5bmMgdXBsb2FkKHBsdWdpbiwgcmF3KSB7XG4gICAgICAgIC8vIFdhaXQgZm9yIGRhdGEgcHJlbG9hZCBiZWZvcmUgYWxsb3dpbmcgbm9ybWFsIG9wZXJhdGlvbi5cbiAgICAgICAgYXdhaXQgdGhpcy5fcmVhZHk7XG4gICAgICAgIGNvbnN0IHBsdWdpbnMgPSB0aGlzLnBsdWdpbnM7XG4gICAgICAgIGlmICghKHBsdWdpbiBpbiBwbHVnaW5zKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZChwbHVnaW4pLnRoZW4oKCkgPT4gdGhpcy51cGxvYWQocGx1Z2luLCByYXcpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgdGhlIGxvY2FsIGNvcHkuXG4gICAgICAgIHBsdWdpbnNbcGx1Z2luXS5yYXcgPSByYXc7XG4gICAgICAgIHJldHVybiB0aGlzLl9zYXZlKHBsdWdpbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvYWQgYSBwbHVnaW4gaW50byB0aGUgcmVnaXN0cnkuXG4gICAgICovXG4gICAgYXN5bmMgX2xvYWQoZGF0YSkge1xuICAgICAgICBjb25zdCBwbHVnaW4gPSBkYXRhLmlkO1xuICAgICAgICAvLyBWYWxpZGF0ZSBhbmQgcHJlbG9hZCB0aGUgaXRlbS5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3ZhbGlkYXRlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IG91dHB1dCA9IFtgVmFsaWRhdGluZyAke3BsdWdpbn0gZmFpbGVkOmBdO1xuICAgICAgICAgICAgZXJyb3JzLmZvckVhY2goKGVycm9yLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YVBhdGgsIHNjaGVtYVBhdGgsIGtleXdvcmQsIG1lc3NhZ2UgfSA9IGVycm9yO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhUGF0aCB8fCBzY2hlbWFQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGAke2luZGV4fSAtIHNjaGVtYSBAICR7c2NoZW1hUGF0aH0sIGRhdGEgQCAke2RhdGFQYXRofWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChgeyR7a2V5d29yZH19ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKG91dHB1dC5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcnM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJlbG9hZCBhIGxpc3Qgb2YgcGx1Z2lucyBhbmQgZmFpbCBncmFjZWZ1bGx5LlxuICAgICAqL1xuICAgIGFzeW5jIF9wcmVsb2FkKHBsdWdpbnMpIHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocGx1Z2lucy5tYXAoYXN5bmMgKHBsdWdpbikgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyBBcHBseSBhIHRyYW5zZm9ybWF0aW9uIHRvIHRoZSBwbHVnaW4gaWYgbmVjZXNzYXJ5LlxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2xvYWQoYXdhaXQgdGhpcy5fdHJhbnNmb3JtKCdmZXRjaCcsIHBsdWdpbikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9ycykge1xuICAgICAgICAgICAgICAgIC8qIElnbm9yZSBwcmVsb2FkIHRpbWVvdXQgZXJyb3JzIHNpbGVudGx5LiAqL1xuICAgICAgICAgICAgICAgIGlmICgoKF9hID0gZXJyb3JzWzBdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eua2V5d29yZCkgIT09ICd0aW1lb3V0Jykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0lnbm9yZWQgc2V0dGluZyByZWdpc3RyeSBwcmVsb2FkIGVycm9ycy4nLCBlcnJvcnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYXZlIGEgcGx1Z2luIGluIHRoZSByZWdpc3RyeS5cbiAgICAgKi9cbiAgICBhc3luYyBfc2F2ZShwbHVnaW4pIHtcbiAgICAgICAgY29uc3QgcGx1Z2lucyA9IHRoaXMucGx1Z2lucztcbiAgICAgICAgaWYgKCEocGx1Z2luIGluIHBsdWdpbnMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cGx1Z2lufSBkb2VzIG5vdCBleGlzdCBpbiBzZXR0aW5nIHJlZ2lzdHJ5LmApO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl92YWxpZGF0ZShwbHVnaW5zW3BsdWdpbl0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcnMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtwbHVnaW59IHZhbGlkYXRpb24gZXJyb3JzOmAsIGVycm9ycyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cGx1Z2lufSBmYWlsZWQgdG8gdmFsaWRhdGU7IGNoZWNrIGNvbnNvbGUuYCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5jb25uZWN0b3Iuc2F2ZShwbHVnaW4sIHBsdWdpbnNbcGx1Z2luXS5yYXcpO1xuICAgICAgICAvLyBGZXRjaCBhbmQgcmVsb2FkIHRoZSBkYXRhIHRvIGd1YXJhbnRlZSBzZXJ2ZXIgYW5kIGNsaWVudCBhcmUgaW4gc3luYy5cbiAgICAgICAgY29uc3QgZmV0Y2hlZCA9IGF3YWl0IHRoaXMuY29ubmVjdG9yLmZldGNoKHBsdWdpbik7XG4gICAgICAgIGlmIChmZXRjaGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFQYXRoOiAnJyxcbiAgICAgICAgICAgICAgICAgICAga2V5d29yZDogJ2lkJyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYENvdWxkIG5vdCBmZXRjaCBzZXR0aW5ncyBmb3IgJHtwbHVnaW59LmAsXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtYVBhdGg6ICcnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLl9sb2FkKGF3YWl0IHRoaXMuX3RyYW5zZm9ybSgnZmV0Y2gnLCBmZXRjaGVkKSk7XG4gICAgICAgIHRoaXMuX3BsdWdpbkNoYW5nZWQuZW1pdChwbHVnaW4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc2Zvcm0gdGhlIHBsdWdpbiBpZiBuZWNlc3NhcnkuXG4gICAgICovXG4gICAgYXN5bmMgX3RyYW5zZm9ybShwaGFzZSwgcGx1Z2luLCBzdGFydGVkID0gbmV3IERhdGUoKS5nZXRUaW1lKCkpIHtcbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnRlZDtcbiAgICAgICAgY29uc3QgaWQgPSBwbHVnaW4uaWQ7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVycyA9IHRoaXMuX3RyYW5zZm9ybWVycztcbiAgICAgICAgY29uc3QgdGltZW91dCA9IHRoaXMuX3RpbWVvdXQ7XG4gICAgICAgIGlmICghcGx1Z2luLnNjaGVtYVsnanVweXRlci5sYWIudHJhbnNmb3JtJ10pIHtcbiAgICAgICAgICAgIHJldHVybiBwbHVnaW47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlkIGluIHRyYW5zZm9ybWVycykge1xuICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtZWQgPSB0cmFuc2Zvcm1lcnNbaWRdW3BoYXNlXS5jYWxsKG51bGwsIHBsdWdpbik7XG4gICAgICAgICAgICBpZiAodHJhbnNmb3JtZWQuaWQgIT09IGlkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhUGF0aDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXl3b3JkOiAnaWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1BsdWdpbiB0cmFuc2Zvcm1hdGlvbnMgY2Fubm90IGNoYW5nZSBwbHVnaW4gSURzLicsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlbWFQYXRoOiAnJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cmFuc2Zvcm1lZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgdGltZW91dCBoYXMgbm90IGJlZW4gZXhjZWVkZWQsIHN0YWxsIGFuZCB0cnkgYWdhaW4gaW4gMjUwbXMuXG4gICAgICAgIGlmIChlbGFwc2VkIDwgdGltZW91dCkge1xuICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9LCAyNTApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtKHBoYXNlLCBwbHVnaW4sIHN0YXJ0ZWQpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkYXRhUGF0aDogJycsXG4gICAgICAgICAgICAgICAga2V5d29yZDogJ3RpbWVvdXQnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBUcmFuc2Zvcm1pbmcgJHtwbHVnaW4uaWR9IHRpbWVkIG91dC5gLFxuICAgICAgICAgICAgICAgIHNjaGVtYVBhdGg6ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIGFuZCBwcmVsb2FkIGEgcGx1Z2luLCBjb21wb3NlIHRoZSBgY29tcG9zaXRlYCBkYXRhLlxuICAgICAqL1xuICAgIGFzeW5jIF92YWxpZGF0ZShwbHVnaW4pIHtcbiAgICAgICAgLy8gVmFsaWRhdGUgdGhlIHVzZXIgZGF0YSBhbmQgY3JlYXRlIHRoZSBjb21wb3NpdGUgZGF0YS5cbiAgICAgICAgY29uc3QgZXJyb3JzID0gdGhpcy52YWxpZGF0b3IudmFsaWRhdGVEYXRhKHBsdWdpbik7XG4gICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9ycztcbiAgICAgICAgfVxuICAgICAgICAvLyBBcHBseSBhIHRyYW5zZm9ybWF0aW9uIGlmIG5lY2Vzc2FyeSBhbmQgc2V0IHRoZSBsb2NhbCBjb3B5LlxuICAgICAgICB0aGlzLnBsdWdpbnNbcGx1Z2luLmlkXSA9IGF3YWl0IHRoaXMuX3RyYW5zZm9ybSgnY29tcG9zZScsIHBsdWdpbik7XG4gICAgfVxufVxuLyoqXG4gKiBBIG1hbmFnZXIgZm9yIGEgc3BlY2lmaWMgcGx1Z2luJ3Mgc2V0dGluZ3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XG4gICAgLyoqXG4gICAgICogSW5zdGFudGlhdGUgYSBuZXcgcGx1Z2luIHNldHRpbmdzIG1hbmFnZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9jaGFuZ2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlkID0gb3B0aW9ucy5wbHVnaW4uaWQ7XG4gICAgICAgIHRoaXMucmVnaXN0cnkgPSBvcHRpb25zLnJlZ2lzdHJ5O1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5LnBsdWdpbkNoYW5nZWQuY29ubmVjdCh0aGlzLl9vblBsdWdpbkNoYW5nZWQsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCB0aGF0IGVtaXRzIHdoZW4gdGhlIHBsdWdpbidzIHNldHRpbmdzIGhhdmUgY2hhbmdlZC5cbiAgICAgKi9cbiAgICBnZXQgY2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjb21wb3NpdGUgb2YgdXNlciBzZXR0aW5ncyBhbmQgZXh0ZW5zaW9uIGRlZmF1bHRzLlxuICAgICAqL1xuICAgIGdldCBjb21wb3NpdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsdWdpbi5kYXRhLmNvbXBvc2l0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIHRoZSBwbHVnaW4gc2V0dGluZ3MgbWFuYWdlciBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGlzcG9zZWQ7XG4gICAgfVxuICAgIGdldCBwbHVnaW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5LnBsdWdpbnNbdGhpcy5pZF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBwbHVnaW4ncyBzY2hlbWEuXG4gICAgICovXG4gICAgZ2V0IHNjaGVtYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGx1Z2luLnNjaGVtYTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHBsdWdpbiBzZXR0aW5ncyByYXcgdGV4dCB2YWx1ZS5cbiAgICAgKi9cbiAgICBnZXQgcmF3KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wbHVnaW4ucmF3O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYW55IGZpZWxkcyBhcmUgZGlmZmVyZW50IGZyb20gdGhlIGRlZmF1bHQgdmFsdWUuXG4gICAgICovXG4gICAgaXNEZWZhdWx0KHVzZXIpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5zY2hlbWEucHJvcGVydGllcykge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB1c2VyW2tleV07XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB0aGlzLmRlZmF1bHQoa2V5KTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBKU09ORXh0LmRlZXBFcXVhbCh2YWx1ZSwgSlNPTkV4dC5lbXB0eU9iamVjdCkgfHxcbiAgICAgICAgICAgICAgICBKU09ORXh0LmRlZXBFcXVhbCh2YWx1ZSwgSlNPTkV4dC5lbXB0eUFycmF5KSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFKU09ORXh0LmRlZXBFcXVhbCh2YWx1ZSwgZGVmYXVsdFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZ2V0IGlzTW9kaWZpZWQoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5pc0RlZmF1bHQodGhpcy51c2VyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHVzZXIgc2V0dGluZ3MuXG4gICAgICovXG4gICAgZ2V0IHVzZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsdWdpbi5kYXRhLnVzZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBwdWJsaXNoZWQgdmVyc2lvbiBvZiB0aGUgTlBNIHBhY2thZ2UgY29udGFpbmluZyB0aGVzZSBzZXR0aW5ncy5cbiAgICAgKi9cbiAgICBnZXQgdmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGx1Z2luLnZlcnNpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgZGVmYXVsdHMgaW4gYSBjb21tZW50ZWQgSlNPTiBmb3JtYXQuXG4gICAgICovXG4gICAgYW5ub3RhdGVkRGVmYXVsdHMoKSB7XG4gICAgICAgIHJldHVybiBQcml2YXRlLmFubm90YXRlZERlZmF1bHRzKHRoaXMuc2NoZW1hLCB0aGlzLmlkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlIHRoZSBkZWZhdWx0IHZhbHVlIG9mIGEgc2V0dGluZyBieSBpdGVyYXRpbmcgdGhyb3VnaCB0aGUgc2NoZW1hLlxuICAgICAqXG4gICAgICogQHBhcmFtIGtleSAtIFRoZSBuYW1lIG9mIHRoZSBzZXR0aW5nIHdob3NlIGRlZmF1bHQgdmFsdWUgaXMgY2FsY3VsYXRlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgY2FsY3VsYXRlZCBkZWZhdWx0IEpTT04gdmFsdWUgZm9yIGEgc3BlY2lmaWMgc2V0dGluZy5cbiAgICAgKi9cbiAgICBkZWZhdWx0KGtleSkge1xuICAgICAgICByZXR1cm4gUHJpdmF0ZS5yZWlmeURlZmF1bHQodGhpcy5zY2hlbWEsIGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHBsdWdpbiBzZXR0aW5ncyByZXNvdXJjZXMuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgU2lnbmFsLmNsZWFyRGF0YSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGFuIGluZGl2aWR1YWwgc2V0dGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXkgLSBUaGUgbmFtZSBvZiB0aGUgc2V0dGluZyBiZWluZyByZXRyaWV2ZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgc2V0dGluZyB2YWx1ZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIHN5bmNocm9ub3VzbHkgYmVjYXVzZSBpdCB1c2VzIGEgY2FjaGVkIGNvcHkgb2YgdGhlXG4gICAgICogcGx1Z2luIHNldHRpbmdzIHRoYXQgaXMgc3luY2hyb25pemVkIHdpdGggdGhlIHJlZ2lzdHJ5LlxuICAgICAqL1xuICAgIGdldChrZXkpIHtcbiAgICAgICAgY29uc3QgeyBjb21wb3NpdGUsIHVzZXIgfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21wb3NpdGU6IGNvbXBvc2l0ZVtrZXldICE9PSB1bmRlZmluZWQgPyBjb3B5KGNvbXBvc2l0ZVtrZXldKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHVzZXI6IHVzZXJba2V5XSAhPT0gdW5kZWZpbmVkID8gY29weSh1c2VyW2tleV0pIDogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIHNpbmdsZSBzZXR0aW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIGtleSAtIFRoZSBuYW1lIG9mIHRoZSBzZXR0aW5nIGJlaW5nIHJlbW92ZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzZXR0aW5nIGlzIHJlbW92ZWQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyBhc3luY2hyb25vdXMgYmVjYXVzZSBpdCB3cml0ZXMgdG8gdGhlIHNldHRpbmcgcmVnaXN0cnkuXG4gICAgICovXG4gICAgcmVtb3ZlKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RyeS5yZW1vdmUodGhpcy5wbHVnaW4uaWQsIGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhdmUgYWxsIG9mIHRoZSBwbHVnaW4ncyB1c2VyIHNldHRpbmdzIGF0IG9uY2UuXG4gICAgICovXG4gICAgc2F2ZShyYXcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0cnkudXBsb2FkKHRoaXMucGx1Z2luLmlkLCByYXcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgYSBzaW5nbGUgc2V0dGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXkgLSBUaGUgbmFtZSBvZiB0aGUgc2V0dGluZyBiZWluZyBzZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgb2YgdGhlIHNldHRpbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzZXR0aW5nIGhhcyBiZWVuIHNhdmVkLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgYXN5bmNocm9ub3VzIGJlY2F1c2UgaXQgd3JpdGVzIHRvIHRoZSBzZXR0aW5nIHJlZ2lzdHJ5LlxuICAgICAqL1xuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5LnNldCh0aGlzLnBsdWdpbi5pZCwga2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyByYXcgc2V0dGluZ3Mgd2l0aCBjb21tZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByYXcgLSBUaGUgSlNPTiB3aXRoIGNvbW1lbnRzIHN0cmluZyBiZWluZyB2YWxpZGF0ZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIGxpc3Qgb2YgZXJyb3JzIG9yIGBudWxsYCBpZiB2YWxpZC5cbiAgICAgKi9cbiAgICB2YWxpZGF0ZShyYXcpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHsgY29tcG9zaXRlOiB7fSwgdXNlcjoge30gfTtcbiAgICAgICAgY29uc3QgeyBpZCwgc2NoZW1hIH0gPSB0aGlzLnBsdWdpbjtcbiAgICAgICAgY29uc3QgdmFsaWRhdG9yID0gdGhpcy5yZWdpc3RyeS52YWxpZGF0b3I7XG4gICAgICAgIGNvbnN0IHZlcnNpb24gPSB0aGlzLnZlcnNpb247XG4gICAgICAgIHJldHVybiB2YWxpZGF0b3IudmFsaWRhdGVEYXRhKHsgZGF0YSwgaWQsIHJhdywgc2NoZW1hLCB2ZXJzaW9uIH0sIGZhbHNlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHBsdWdpbiBjaGFuZ2VzIGluIHRoZSBzZXR0aW5nIHJlZ2lzdHJ5LlxuICAgICAqL1xuICAgIF9vblBsdWdpbkNoYW5nZWQoc2VuZGVyLCBwbHVnaW4pIHtcbiAgICAgICAgaWYgKHBsdWdpbiA9PT0gdGhpcy5wbHVnaW4uaWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgYFNldHRpbmdSZWdpc3RyeWAgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChTZXR0aW5nUmVnaXN0cnkpIHtcbiAgICAvKipcbiAgICAgKiBSZWNvbmNpbGUgdGhlIG1lbnVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlZmVyZW5jZSBUaGUgcmVmZXJlbmNlIGxpc3Qgb2YgbWVudXMuXG4gICAgICogQHBhcmFtIGFkZGl0aW9uIFRoZSBsaXN0IG9mIG1lbnVzIHRvIGFkZC5cbiAgICAgKiBAcGFyYW0gd2FybiBXYXJuIGlmIHRoZSBjb21tYW5kIGl0ZW1zIGFyZSBkdXBsaWNhdGVkIHdpdGhpbiB0aGUgc2FtZSBtZW51LlxuICAgICAqIEByZXR1cm5zIFRoZSByZWNvbmNpbGVkIGxpc3Qgb2YgbWVudXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVjb25jaWxlTWVudXMocmVmZXJlbmNlLCBhZGRpdGlvbiwgd2FybiA9IGZhbHNlLCBhZGROZXdJdGVtcyA9IHRydWUpIHtcbiAgICAgICAgaWYgKCFyZWZlcmVuY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBhZGRpdGlvbiAmJiBhZGROZXdJdGVtcyA/IEpTT05FeHQuZGVlcENvcHkoYWRkaXRpb24pIDogW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhZGRpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIEpTT05FeHQuZGVlcENvcHkocmVmZXJlbmNlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtZXJnZWQgPSBKU09ORXh0LmRlZXBDb3B5KHJlZmVyZW5jZSk7XG4gICAgICAgIGFkZGl0aW9uLmZvckVhY2gobWVudSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZWZJbmRleCA9IG1lcmdlZC5maW5kSW5kZXgocmVmID0+IHJlZi5pZCA9PT0gbWVudS5pZCk7XG4gICAgICAgICAgICBpZiAocmVmSW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIG1lcmdlZFtyZWZJbmRleF0gPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbWVyZ2VkW3JlZkluZGV4XSksIG1lbnUpLCB7IGl0ZW1zOiByZWNvbmNpbGVJdGVtcyhtZXJnZWRbcmVmSW5kZXhdLml0ZW1zLCBtZW51Lml0ZW1zLCB3YXJuLCBhZGROZXdJdGVtcykgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoYWRkTmV3SXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VkLnB1c2gobWVudSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1lcmdlZDtcbiAgICB9XG4gICAgU2V0dGluZ1JlZ2lzdHJ5LnJlY29uY2lsZU1lbnVzID0gcmVjb25jaWxlTWVudXM7XG4gICAgLyoqXG4gICAgICogTWVyZ2UgdHdvIHNldCBvZiBtZW51IGl0ZW1zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlZmVyZW5jZSBSZWZlcmVuY2Ugc2V0IG9mIG1lbnUgaXRlbXNcbiAgICAgKiBAcGFyYW0gYWRkaXRpb24gTmV3IGl0ZW1zIHRvIGFkZFxuICAgICAqIEBwYXJhbSB3YXJuIFdoZXRoZXIgdG8gd2FybiBpZiBpdGVtIGlzIGR1cGxpY2F0ZWQ7IGRlZmF1bHQgdG8gZmFsc2VcbiAgICAgKiBAcmV0dXJucyBUaGUgbWVyZ2VkIHNldCBvZiBpdGVtc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlY29uY2lsZUl0ZW1zKHJlZmVyZW5jZSwgYWRkaXRpb24sIHdhcm4gPSBmYWxzZSwgYWRkTmV3SXRlbXMgPSB0cnVlKSB7XG4gICAgICAgIGlmICghcmVmZXJlbmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gYWRkaXRpb24gPyBKU09ORXh0LmRlZXBDb3B5KGFkZGl0aW9uKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFkZGl0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTkV4dC5kZWVwQ29weShyZWZlcmVuY2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gSlNPTkV4dC5kZWVwQ29weShyZWZlcmVuY2UpO1xuICAgICAgICAvLyBNZXJnZSBhcnJheSBlbGVtZW50IGRlcGVuZGluZyBvbiB0aGUgdHlwZVxuICAgICAgICBhZGRpdGlvbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgc3dpdGNoICgoX2EgPSBpdGVtLnR5cGUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICdjb21tYW5kJykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NlcGFyYXRvcic6XG4gICAgICAgICAgICAgICAgICAgIGlmIChhZGROZXdJdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaChPYmplY3QuYXNzaWduKHt9LCBpdGVtKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3VibWVudSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnN1Ym1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZkluZGV4ID0gaXRlbXMuZmluZEluZGV4KHJlZiA9PiB7IHZhciBfYSwgX2I7IHJldHVybiByZWYudHlwZSA9PT0gJ3N1Ym1lbnUnICYmICgoX2EgPSByZWYuc3VibWVudSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkKSA9PT0gKChfYiA9IGl0ZW0uc3VibWVudSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmlkKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVmSW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFkZE5ld0l0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goSlNPTkV4dC5kZWVwQ29weShpdGVtKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNbcmVmSW5kZXhdID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGl0ZW1zW3JlZkluZGV4XSksIGl0ZW0pLCB7IHN1Ym1lbnU6IHJlY29uY2lsZU1lbnVzKGl0ZW1zW3JlZkluZGV4XS5zdWJtZW51XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFtpdGVtc1tyZWZJbmRleF0uc3VibWVudV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbCwgW2l0ZW0uc3VibWVudV0sIHdhcm4sIGFkZE5ld0l0ZW1zKVswXSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjb21tYW5kJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY29tbWFuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmSW5kZXggPSBpdGVtcy5maW5kSW5kZXgocmVmID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWYuY29tbWFuZCA9PT0gaXRlbS5jb21tYW5kICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZi5zZWxlY3RvciA9PT0gaXRlbS5zZWxlY3RvciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKU09ORXh0LmRlZXBFcXVhbCgoX2EgPSByZWYuYXJncykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDoge30sIChfYiA9IGl0ZW0uYXJncykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDoge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVmSW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFkZE5ld0l0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgaXRlbSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3YXJuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgTWVudSBlbnRyeSBmb3IgY29tbWFuZCAnJHtpdGVtLmNvbW1hbmR9JyBpcyBkdXBsaWNhdGVkLmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tyZWZJbmRleF0gPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGl0ZW1zW3JlZkluZGV4XSksIGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuICAgIFNldHRpbmdSZWdpc3RyeS5yZWNvbmNpbGVJdGVtcyA9IHJlY29uY2lsZUl0ZW1zO1xuICAgIC8qKlxuICAgICAqIFJlbW92ZSBkaXNhYmxlZCBlbnRyaWVzIGZyb20gbWVudSBpdGVtc1xuICAgICAqXG4gICAgICogQHBhcmFtIGl0ZW1zIE1lbnUgaXRlbXNcbiAgICAgKiBAcmV0dXJucyBGaWx0ZXJlZCBtZW51IGl0ZW1zXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmlsdGVyRGlzYWJsZWRJdGVtcyhpdGVtcykge1xuICAgICAgICByZXR1cm4gaXRlbXMucmVkdWNlKChmaW5hbCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IGNvcHkgPSBPYmplY3QuYXNzaWduKHt9LCB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoIWNvcHkuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29weS50eXBlID09PSAnc3VibWVudScpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBzdWJtZW51IH0gPSBjb3B5O1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3VibWVudSAmJiAhc3VibWVudS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29weS5zdWJtZW51ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBzdWJtZW51KSwgeyBpdGVtczogZmlsdGVyRGlzYWJsZWRJdGVtcygoX2EgPSBzdWJtZW51Lml0ZW1zKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXSkgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWwucHVzaChjb3B5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmaW5hbDtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cbiAgICBTZXR0aW5nUmVnaXN0cnkuZmlsdGVyRGlzYWJsZWRJdGVtcyA9IGZpbHRlckRpc2FibGVkSXRlbXM7XG4gICAgLyoqXG4gICAgICogUmVjb25jaWxlIGRlZmF1bHQgYW5kIHVzZXIgc2hvcnRjdXRzIGFuZCByZXR1cm4gdGhlIGNvbXBvc2l0ZSBsaXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGRlZmF1bHRzIC0gVGhlIGxpc3Qgb2YgZGVmYXVsdCBzaG9ydGN1dHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdXNlciAtIFRoZSBsaXN0IG9mIHVzZXIgc2hvcnRjdXQgb3ZlcnJpZGVzIGFuZCBhZGRpdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIGxvYWRhYmxlIGxpc3Qgb2Ygc2hvcnRjdXRzIChvbWl0dGluZyBkaXNhYmxlZCBhbmQgb3ZlcnJpZGRlbikuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVjb25jaWxlU2hvcnRjdXRzKGRlZmF1bHRzLCB1c2VyKSB7XG4gICAgICAgIGNvbnN0IG1lbW8gPSB7fTtcbiAgICAgICAgLy8gSWYgYSB1c2VyIHNob3J0Y3V0IGNvbGxpZGVzIHdpdGggYW5vdGhlciB1c2VyIHNob3J0Y3V0IHdhcm4gYW5kIGZpbHRlci5cbiAgICAgICAgdXNlciA9IHVzZXIuZmlsdGVyKHNob3J0Y3V0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBDb21tYW5kUmVnaXN0cnkubm9ybWFsaXplS2V5cyhzaG9ydGN1dCkuam9pbihSRUNPUkRfU0VQQVJBVE9SKTtcbiAgICAgICAgICAgIGlmICgha2V5cykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignU2tpcHBpbmcgdGhpcyBzaG9ydGN1dCBiZWNhdXNlIHRoZXJlIGFyZSBubyBhY3Rpb25hYmxlIGtleXMgb24gdGhpcyBwbGF0Zm9ybScsIHNob3J0Y3V0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShrZXlzIGluIG1lbW8pKSB7XG4gICAgICAgICAgICAgICAgbWVtb1trZXlzXSA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBzZWxlY3RvciB9ID0gc2hvcnRjdXQ7XG4gICAgICAgICAgICBpZiAoIShzZWxlY3RvciBpbiBtZW1vW2tleXNdKSkge1xuICAgICAgICAgICAgICAgIG1lbW9ba2V5c11bc2VsZWN0b3JdID0gZmFsc2U7IC8vIERvIG5vdCB3YXJuIGlmIGEgZGVmYXVsdCBzaG9ydGN1dCBjb25mbGljdHMuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1NraXBwaW5nIHRoaXMgc2hvcnRjdXQgYmVjYXVzZSBpdCBjb2xsaWRlcyB3aXRoIGFub3RoZXIgc2hvcnRjdXQuJywgc2hvcnRjdXQpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gSWYgYSBkZWZhdWx0IHNob3J0Y3V0IGNvbGxpZGVzIHdpdGggYW5vdGhlciBkZWZhdWx0LCB3YXJuIGFuZCBmaWx0ZXIsXG4gICAgICAgIC8vIHVubGVzcyBvbmUgb2YgdGhlIHNob3J0Y3V0cyBpcyBhIGRpc2FibGluZyBzaG9ydGN1dCAoc28gbG9vayB0aHJvdWdoXG4gICAgICAgIC8vIGRpc2FibGVkIHNob3J0Y3V0cyBmaXJzdCkuIElmIGEgc2hvcnRjdXQgaGFzIGFscmVhZHkgYmVlbiBhZGRlZCBieSB0aGVcbiAgICAgICAgLy8gdXNlciBwcmVmZXJlbmNlcywgZmlsdGVyIGl0IG91dCB0b28gKHRoaXMgaW5jbHVkZXMgc2hvcnRjdXRzIHRoYXQgYXJlXG4gICAgICAgIC8vIGRpc2FibGVkIGJ5IHVzZXIgcHJlZmVyZW5jZXMpLlxuICAgICAgICBkZWZhdWx0cyA9IFtcbiAgICAgICAgICAgIC4uLmRlZmF1bHRzLmZpbHRlcihzID0+ICEhcy5kaXNhYmxlZCksXG4gICAgICAgICAgICAuLi5kZWZhdWx0cy5maWx0ZXIocyA9PiAhcy5kaXNhYmxlZClcbiAgICAgICAgXS5maWx0ZXIoc2hvcnRjdXQgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5cyA9IENvbW1hbmRSZWdpc3RyeS5ub3JtYWxpemVLZXlzKHNob3J0Y3V0KS5qb2luKFJFQ09SRF9TRVBBUkFUT1IpO1xuICAgICAgICAgICAgaWYgKCFrZXlzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEoa2V5cyBpbiBtZW1vKSkge1xuICAgICAgICAgICAgICAgIG1lbW9ba2V5c10gPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgZGlzYWJsZWQsIHNlbGVjdG9yIH0gPSBzaG9ydGN1dDtcbiAgICAgICAgICAgIGlmICghKHNlbGVjdG9yIGluIG1lbW9ba2V5c10pKSB7XG4gICAgICAgICAgICAgICAgLy8gV2FybiBvZiBmdXR1cmUgY29uZmxpY3RzIGlmIHRoZSBkZWZhdWx0IHNob3J0Y3V0IGlzIG5vdCBkaXNhYmxlZC5cbiAgICAgICAgICAgICAgICBtZW1vW2tleXNdW3NlbGVjdG9yXSA9ICFkaXNhYmxlZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFdlIGhhdmUgYSBjb25mbGljdCBub3cuIFdhcm4gdGhlIHVzZXIgaWYgd2UgbmVlZCB0byBkbyBzby5cbiAgICAgICAgICAgIGlmIChtZW1vW2tleXNdW3NlbGVjdG9yXSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignU2tpcHBpbmcgdGhpcyBkZWZhdWx0IHNob3J0Y3V0IGJlY2F1c2UgaXQgY29sbGlkZXMgd2l0aCBhbm90aGVyIGRlZmF1bHQgc2hvcnRjdXQuJywgc2hvcnRjdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gUmV0dXJuIGFsbCB0aGUgc2hvcnRjdXRzIHRoYXQgc2hvdWxkIGJlIHJlZ2lzdGVyZWRcbiAgICAgICAgcmV0dXJuICh1c2VyXG4gICAgICAgICAgICAuY29uY2F0KGRlZmF1bHRzKVxuICAgICAgICAgICAgLmZpbHRlcihzaG9ydGN1dCA9PiAhc2hvcnRjdXQuZGlzYWJsZWQpXG4gICAgICAgICAgICAvLyBGaXggc2hvcnRjdXRzIGNvbXBhcmlzb24gaW4gcmpzZiBGb3JtIHRvIGF2b2lkIHBvbGx1dGluZyB0aGUgdXNlciBzZXR0aW5nc1xuICAgICAgICAgICAgLm1hcChzaG9ydGN1dCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7IGFyZ3M6IHt9IH0sIHNob3J0Y3V0KTtcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBTZXR0aW5nUmVnaXN0cnkucmVjb25jaWxlU2hvcnRjdXRzID0gcmVjb25jaWxlU2hvcnRjdXRzO1xuICAgIC8qKlxuICAgICAqIE1lcmdlIHR3byBzZXQgb2YgdG9vbGJhciBpdGVtcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZWZlcmVuY2UgUmVmZXJlbmNlIHNldCBvZiB0b29sYmFyIGl0ZW1zXG4gICAgICogQHBhcmFtIGFkZGl0aW9uIE5ldyBpdGVtcyB0byBhZGRcbiAgICAgKiBAcGFyYW0gd2FybiBXaGV0aGVyIHRvIHdhcm4gaWYgaXRlbSBpcyBkdXBsaWNhdGVkOyBkZWZhdWx0IHRvIGZhbHNlXG4gICAgICogQHJldHVybnMgVGhlIG1lcmdlZCBzZXQgb2YgaXRlbXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZWNvbmNpbGVUb29sYmFySXRlbXMocmVmZXJlbmNlLCBhZGRpdGlvbiwgd2FybiA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghcmVmZXJlbmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gYWRkaXRpb24gPyBKU09ORXh0LmRlZXBDb3B5KGFkZGl0aW9uKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFkZGl0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTkV4dC5kZWVwQ29weShyZWZlcmVuY2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gSlNPTkV4dC5kZWVwQ29weShyZWZlcmVuY2UpO1xuICAgICAgICAvLyBNZXJnZSBhcnJheSBlbGVtZW50IGRlcGVuZGluZyBvbiB0aGUgdHlwZVxuICAgICAgICBhZGRpdGlvbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjb21tYW5kJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY29tbWFuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmSW5kZXggPSBpdGVtcy5maW5kSW5kZXgocmVmID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWYubmFtZSA9PT0gaXRlbS5uYW1lICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZi5jb21tYW5kID09PSBpdGVtLmNvbW1hbmQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTkV4dC5kZWVwRXF1YWwoKF9hID0gcmVmLmFyZ3MpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHt9LCAoX2IgPSBpdGVtLmFyZ3MpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlZkluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgaXRlbSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdhcm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBUb29sYmFyIGl0ZW0gZm9yIGNvbW1hbmQgJyR7aXRlbS5jb21tYW5kfScgaXMgZHVwbGljYXRlZC5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNbcmVmSW5kZXhdID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBpdGVtc1tyZWZJbmRleF0pLCBpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzcGFjZXInOlxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmSW5kZXggPSBpdGVtcy5maW5kSW5kZXgocmVmID0+IHJlZi5uYW1lID09PSBpdGVtLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVmSW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3YXJuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBUb29sYmFyIGl0ZW0gJyR7aXRlbS5uYW1lfScgaXMgZHVwbGljYXRlZC5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zW3JlZkluZGV4XSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgaXRlbXNbcmVmSW5kZXhdKSwgaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuICAgIFNldHRpbmdSZWdpc3RyeS5yZWNvbmNpbGVUb29sYmFySXRlbXMgPSByZWNvbmNpbGVUb29sYmFySXRlbXM7XG59KShTZXR0aW5nUmVnaXN0cnkgfHwgKFNldHRpbmdSZWdpc3RyeSA9IHt9KSk7XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIG1vZHVsZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGluZGVudGF0aW9uIGxldmVsLCB1c2VzIHNwYWNlcyBpbnN0ZWFkIG9mIHRhYnMuXG4gICAgICovXG4gICAgY29uc3QgaW5kZW50ID0gJyAgICAnO1xuICAgIC8qKlxuICAgICAqIFJlcGxhY2VtZW50IHRleHQgZm9yIHNjaGVtYSBwcm9wZXJ0aWVzIG1pc3NpbmcgYSBgZGVzY3JpcHRpb25gIGZpZWxkLlxuICAgICAqL1xuICAgIGNvbnN0IG5vbmRlc2NyaXB0ID0gJ1ttaXNzaW5nIHNjaGVtYSBkZXNjcmlwdGlvbl0nO1xuICAgIC8qKlxuICAgICAqIFJlcGxhY2VtZW50IHRleHQgZm9yIHNjaGVtYSBwcm9wZXJ0aWVzIG1pc3NpbmcgYSBgdGl0bGVgIGZpZWxkLlxuICAgICAqL1xuICAgIGNvbnN0IHVudGl0bGVkID0gJ1ttaXNzaW5nIHNjaGVtYSB0aXRsZV0nO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYW5ub3RhdGVkIChKU09OIHdpdGggY29tbWVudHMpIHZlcnNpb24gb2YgYSBzY2hlbWEncyBkZWZhdWx0cy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhbm5vdGF0ZWREZWZhdWx0cyhzY2hlbWEsIHBsdWdpbikge1xuICAgICAgICBjb25zdCB7IGRlc2NyaXB0aW9uLCBwcm9wZXJ0aWVzLCB0aXRsZSB9ID0gc2NoZW1hO1xuICAgICAgICBjb25zdCBrZXlzID0gcHJvcGVydGllc1xuICAgICAgICAgICAgPyBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKS5zb3J0KChhLCBiKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpXG4gICAgICAgICAgICA6IFtdO1xuICAgICAgICBjb25zdCBsZW5ndGggPSBNYXRoLm1heCgoZGVzY3JpcHRpb24gfHwgbm9uZGVzY3JpcHQpLmxlbmd0aCwgcGx1Z2luLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAneycsXG4gICAgICAgICAgICBwcmVmaXgoYCR7dGl0bGUgfHwgdW50aXRsZWR9YCksXG4gICAgICAgICAgICBwcmVmaXgocGx1Z2luKSxcbiAgICAgICAgICAgIHByZWZpeChkZXNjcmlwdGlvbiB8fCBub25kZXNjcmlwdCksXG4gICAgICAgICAgICBwcmVmaXgoJyonLnJlcGVhdChsZW5ndGgpKSxcbiAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgam9pbihrZXlzLm1hcChrZXkgPT4gZGVmYXVsdERvY3VtZW50ZWRWYWx1ZShzY2hlbWEsIGtleSkpKSxcbiAgICAgICAgICAgICd9J1xuICAgICAgICBdLmpvaW4oJ1xcbicpO1xuICAgIH1cbiAgICBQcml2YXRlLmFubm90YXRlZERlZmF1bHRzID0gYW5ub3RhdGVkRGVmYXVsdHM7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhbm5vdGF0ZWQgKEpTT04gd2l0aCBjb21tZW50cykgdmVyc2lvbiBvZiBhIHBsdWdpbidzXG4gICAgICogc2V0dGluZyBkYXRhLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFubm90YXRlZFBsdWdpbihwbHVnaW4sIGRhdGEpIHtcbiAgICAgICAgY29uc3QgeyBkZXNjcmlwdGlvbiwgdGl0bGUgfSA9IHBsdWdpbi5zY2hlbWE7XG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKS5zb3J0KChhLCBiKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpO1xuICAgICAgICBjb25zdCBsZW5ndGggPSBNYXRoLm1heCgoZGVzY3JpcHRpb24gfHwgbm9uZGVzY3JpcHQpLmxlbmd0aCwgcGx1Z2luLmlkLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAneycsXG4gICAgICAgICAgICBwcmVmaXgoYCR7dGl0bGUgfHwgdW50aXRsZWR9YCksXG4gICAgICAgICAgICBwcmVmaXgocGx1Z2luLmlkKSxcbiAgICAgICAgICAgIHByZWZpeChkZXNjcmlwdGlvbiB8fCBub25kZXNjcmlwdCksXG4gICAgICAgICAgICBwcmVmaXgoJyonLnJlcGVhdChsZW5ndGgpKSxcbiAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgam9pbihrZXlzLm1hcChrZXkgPT4gZG9jdW1lbnRlZFZhbHVlKHBsdWdpbi5zY2hlbWEsIGtleSwgZGF0YVtrZXldKSkpLFxuICAgICAgICAgICAgJ30nXG4gICAgICAgIF0uam9pbignXFxuJyk7XG4gICAgfVxuICAgIFByaXZhdGUuYW5ub3RhdGVkUGx1Z2luID0gYW5ub3RhdGVkUGx1Z2luO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgdmFsdWUtd2l0aC1kb2N1bWVudGF0aW9uLXN0cmluZyBmb3IgYVxuICAgICAqIHNwZWNpZmljIHNjaGVtYSBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkZWZhdWx0RG9jdW1lbnRlZFZhbHVlKHNjaGVtYSwga2V5KSB7XG4gICAgICAgIGNvbnN0IHByb3BzID0gKHNjaGVtYS5wcm9wZXJ0aWVzICYmIHNjaGVtYS5wcm9wZXJ0aWVzW2tleV0pIHx8IHt9O1xuICAgICAgICBjb25zdCB0eXBlID0gcHJvcHNbJ3R5cGUnXTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBwcm9wc1snZGVzY3JpcHRpb24nXSB8fCBub25kZXNjcmlwdDtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBwcm9wc1sndGl0bGUnXSB8fCAnJztcbiAgICAgICAgY29uc3QgcmVpZmllZCA9IHJlaWZ5RGVmYXVsdChzY2hlbWEsIGtleSk7XG4gICAgICAgIGNvbnN0IHNwYWNlcyA9IGluZGVudC5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRzID0gcmVpZmllZCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHByZWZpeChgXCIke2tleX1cIjogJHtKU09OLnN0cmluZ2lmeShyZWlmaWVkLCBudWxsLCBzcGFjZXMpfWAsIGluZGVudClcbiAgICAgICAgICAgIDogcHJlZml4KGBcIiR7a2V5fVwiOiAke3R5cGV9YCk7XG4gICAgICAgIHJldHVybiBbcHJlZml4KHRpdGxlKSwgcHJlZml4KGRlc2NyaXB0aW9uKSwgZGVmYXVsdHNdXG4gICAgICAgICAgICAuZmlsdGVyKHN0ciA9PiBzdHIubGVuZ3RoKVxuICAgICAgICAgICAgLmpvaW4oJ1xcbicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgdmFsdWUtd2l0aC1kb2N1bWVudGF0aW9uLXN0cmluZyBmb3IgYSBzcGVjaWZpYyBzY2hlbWEgcHJvcGVydHkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZG9jdW1lbnRlZFZhbHVlKHNjaGVtYSwga2V5LCB2YWx1ZSkge1xuICAgICAgICBjb25zdCBwcm9wcyA9IHNjaGVtYS5wcm9wZXJ0aWVzICYmIHNjaGVtYS5wcm9wZXJ0aWVzW2tleV07XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gKHByb3BzICYmIHByb3BzWydkZXNjcmlwdGlvbiddKSB8fCBub25kZXNjcmlwdDtcbiAgICAgICAgY29uc3QgdGl0bGUgPSAocHJvcHMgJiYgcHJvcHNbJ3RpdGxlJ10pIHx8IHVudGl0bGVkO1xuICAgICAgICBjb25zdCBzcGFjZXMgPSBpbmRlbnQubGVuZ3RoO1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBwcmVmaXgoYFwiJHtrZXl9XCI6ICR7SlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIHNwYWNlcyl9YCwgaW5kZW50KTtcbiAgICAgICAgcmV0dXJuIFtwcmVmaXgodGl0bGUpLCBwcmVmaXgoZGVzY3JpcHRpb24pLCBhdHRyaWJ1dGVdLmpvaW4oJ1xcbicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgam9pbmVkIHN0cmluZyB3aXRoIGxpbmUgYnJlYWtzIGFuZCBjb21tYXMgd2hlcmUgYXBwcm9wcmlhdGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gam9pbihib2R5KSB7XG4gICAgICAgIHJldHVybiBib2R5LnJlZHVjZSgoYWNjLCB2YWwsIGlkeCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgcm93cyA9IHZhbC5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgICBjb25zdCBsYXN0ID0gcm93c1tyb3dzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgY29tbWVudCA9IGxhc3QudHJpbSgpLmluZGV4T2YoJy8vJykgPT09IDA7XG4gICAgICAgICAgICBjb25zdCBjb21tYSA9IGNvbW1lbnQgfHwgaWR4ID09PSBib2R5Lmxlbmd0aCAtIDEgPyAnJyA6ICcsJztcbiAgICAgICAgICAgIGNvbnN0IHNlcGFyYXRvciA9IGlkeCA9PT0gYm9keS5sZW5ndGggLSAxID8gJycgOiAnXFxuXFxuJztcbiAgICAgICAgICAgIHJldHVybiBhY2MgKyB2YWwgKyBjb21tYSArIHNlcGFyYXRvcjtcbiAgICAgICAgfSwgJycpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgZG9jdW1lbnRhdGlvbiBzdHJpbmcgd2l0aCBhIGNvbW1lbnQgcHJlZml4IGFkZGVkIG9uIGV2ZXJ5IGxpbmUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcHJlZml4KHNvdXJjZSwgcHJlID0gYCR7aW5kZW50fS8vIGApIHtcbiAgICAgICAgcmV0dXJuIHByZSArIHNvdXJjZS5zcGxpdCgnXFxuJykuam9pbihgXFxuJHtwcmV9YCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGZ1bGx5IGV4dHJhcG9sYXRlZCBkZWZhdWx0IHZhbHVlIGZvciBhIHJvb3Qga2V5IGluIGEgc2NoZW1hLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlaWZ5RGVmYXVsdChzY2hlbWEsIHJvb3QpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGNvbnN0IGRlZmluaXRpb25zID0gc2NoZW1hLmRlZmluaXRpb25zO1xuICAgICAgICAvLyBJZiB0aGUgcHJvcGVydHkgaXMgYXQgdGhlIHJvb3QgbGV2ZWwsIHRyYXZlcnNlIGl0cyBzY2hlbWEuXG4gICAgICAgIHNjaGVtYSA9IChyb290ID8gKF9hID0gc2NoZW1hLnByb3BlcnRpZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVtyb290XSA6IHNjaGVtYSkgfHwge307XG4gICAgICAgIGlmIChzY2hlbWEudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIC8vIE1ha2UgYSBjb3B5IG9mIHRoZSBkZWZhdWx0IHZhbHVlIHRvIHBvcHVsYXRlLlxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gSlNPTkV4dC5kZWVwQ29weShzY2hlbWEuZGVmYXVsdCk7XG4gICAgICAgICAgICAvLyBJdGVyYXRlIHRocm91Z2ggYW5kIHBvcHVsYXRlIGVhY2ggY2hpbGQgcHJvcGVydHkuXG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IHNjaGVtYS5wcm9wZXJ0aWVzIHx8IHt9O1xuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBwcm9wcykge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtwcm9wZXJ0eV0gPSByZWlmeURlZmF1bHQocHJvcHNbcHJvcGVydHldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgIC8vIE1ha2UgYSBjb3B5IG9mIHRoZSBkZWZhdWx0IHZhbHVlIHRvIHBvcHVsYXRlLlxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gSlNPTkV4dC5kZWVwQ29weShzY2hlbWEuZGVmYXVsdCk7XG4gICAgICAgICAgICAvLyBJdGVtcyBkZWZpbmVzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXlcbiAgICAgICAgICAgIGxldCBwcm9wcyA9IHNjaGVtYS5pdGVtcyB8fCB7fTtcbiAgICAgICAgICAgIC8vIFVzZSByZWZlcmVuY2VkIGRlZmluaXRpb24gaWYgb25lIGV4aXN0c1xuICAgICAgICAgICAgaWYgKHByb3BzWyckcmVmJ10gJiYgZGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWYgPSBwcm9wc1snJHJlZiddLnJlcGxhY2UoJyMvZGVmaW5pdGlvbnMvJywgJycpO1xuICAgICAgICAgICAgICAgIHByb3BzID0gKF9iID0gZGVmaW5pdGlvbnNbcmVmXSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDoge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJdGVyYXRlIHRocm91Z2ggdGhlIGl0ZW1zIGluIHRoZSBhcnJheSBhbmQgZmlsbCBpbiBkZWZhdWx0c1xuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIGluIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIC8vIFVzZSB0aGUgdmFsdWVzIHRoYXQgYXJlIGhhcmQtY29kZWQgaW4gdGhlIGRlZmF1bHQgYXJyYXkgb3ZlciB0aGUgZGVmYXVsdHMgZm9yIGVhY2ggZmllbGQuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVpZmllZCA9IHJlaWZ5RGVmYXVsdChwcm9wcykgfHwge307XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIHJlaWZpZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChfYyA9IHJlc3VsdFtpdGVtXSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW3Byb3BdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWlmaWVkW3Byb3BdID0gcmVzdWx0W2l0ZW1dW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdFtpdGVtXSA9IHJlaWZpZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVtYS5kZWZhdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgIFByaXZhdGUucmVpZnlEZWZhdWx0ID0gcmVpZnlEZWZhdWx0O1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXR0aW5ncmVnaXN0cnkuanMubWFwIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbi8qIHRzbGludDpkaXNhYmxlICovXG4vKipcbiAqIFRoZSBzZXR0aW5nIHJlZ2lzdHJ5IHRva2VuLlxuICovXG5leHBvcnQgY29uc3QgSVNldHRpbmdSZWdpc3RyeSA9IG5ldyBUb2tlbignQGp1cHl0ZXJsYWIvY29yZXV0aWxzOklTZXR0aW5nUmVnaXN0cnknKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRva2Vucy5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9