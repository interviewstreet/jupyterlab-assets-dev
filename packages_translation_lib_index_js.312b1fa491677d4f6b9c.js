(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_translation_lib_index_js"],{

/***/ "../../packages/translation/lib/base.js":
/*!**********************************************!*\
  !*** ../../packages/translation/lib/base.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nullTranslator": () => (/* binding */ nullTranslator)
/* harmony export */ });
/* harmony import */ var _gettext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gettext */ "../../packages/translation/lib/gettext.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * A translator that loads a dummy language bundle that returns the same input
 * strings.
 */
class NullTranslator {
    constructor(bundle) {
        this._languageBundle = bundle;
    }
    load(domain) {
        return this._languageBundle;
    }
    locale() {
        return 'en';
    }
}
/**
 * A language bundle that returns the same input strings.
 */
class NullLanguageBundle {
    __(msgid, ...args) {
        return this.gettext(msgid, ...args);
    }
    _n(msgid, msgid_plural, n, ...args) {
        return this.ngettext(msgid, msgid_plural, n, ...args);
    }
    _p(msgctxt, msgid, ...args) {
        return this.pgettext(msgctxt, msgid, ...args);
    }
    _np(msgctxt, msgid, msgid_plural, n, ...args) {
        return this.npgettext(msgctxt, msgid, msgid_plural, n, ...args);
    }
    gettext(msgid, ...args) {
        return _gettext__WEBPACK_IMPORTED_MODULE_0__.Gettext.strfmt(msgid, ...args);
    }
    ngettext(msgid, msgid_plural, n, ...args) {
        return _gettext__WEBPACK_IMPORTED_MODULE_0__.Gettext.strfmt(n == 1 ? msgid : msgid_plural, ...[n].concat(args));
    }
    pgettext(msgctxt, msgid, ...args) {
        return _gettext__WEBPACK_IMPORTED_MODULE_0__.Gettext.strfmt(msgid, ...args);
    }
    npgettext(msgctxt, msgid, msgid_plural, n, ...args) {
        return this.ngettext(msgid, msgid_plural, n, ...args);
    }
    dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, ...args) {
        return this.ngettext(msgid, msgid_plural, n, ...args);
    }
}
/**
 * The application null translator instance that just returns the same text.
 * Also provides interpolation.
 */
const nullTranslator = new NullTranslator(new NullLanguageBundle());
//# sourceMappingURL=base.js.map

/***/ }),

/***/ "../../packages/translation/lib/gettext.js":
/*!*************************************************!*\
  !*** ../../packages/translation/lib/gettext.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gettext": () => (/* binding */ Gettext)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "../../packages/translation/lib/utils.js");
/* ----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|
| Base gettext.js implementation.
| Copyright (c) Guillaume Potier.
| Distributed under the terms of the Modified MIT License.
| See: https://github.com/guillaumepotier/gettext.js
|
| Type definitions.
| Copyright (c) Julien Crouzet and Florian Schwingenschlögl.
| Distributed under the terms of the Modified MIT License.
| See: https://github.com/DefinitelyTyped/DefinitelyTyped
|----------------------------------------------------------------------------*/

/**
 * Gettext class providing localization methods.
 */
class Gettext {
    constructor(options) {
        options = options || {};
        // default values that could be overridden in Gettext() constructor
        this._defaults = {
            domain: 'messages',
            locale: document.documentElement.getAttribute('lang') || 'en',
            pluralFunc: function (n) {
                return { nplurals: 2, plural: n != 1 ? 1 : 0 };
            },
            contextDelimiter: String.fromCharCode(4),
            stringsPrefix: ''
        };
        // Ensure the correct separator is used
        this._locale = (options.locale || this._defaults.locale).replace('_', '-');
        this._domain = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.normalizeDomain)(options.domain || this._defaults.domain);
        this._contextDelimiter =
            options.contextDelimiter || this._defaults.contextDelimiter;
        this._stringsPrefix = options.stringsPrefix || this._defaults.stringsPrefix;
        this._pluralFuncs = {};
        this._dictionary = {};
        this._pluralForms = {};
        if (options.messages) {
            this._dictionary[this._domain] = {};
            this._dictionary[this._domain][this._locale] = options.messages;
        }
        if (options.pluralForms) {
            this._pluralForms[this._locale] = options.pluralForms;
        }
    }
    /**
     * Set current context delimiter.
     *
     * @param delimiter - The delimiter to set.
     */
    setContextDelimiter(delimiter) {
        this._contextDelimiter = delimiter;
    }
    /**
     * Get current context delimiter.
     *
     * @return The current delimiter.
     */
    getContextDelimiter() {
        return this._contextDelimiter;
    }
    /**
     * Set current locale.
     *
     * @param locale - The locale to set.
     */
    setLocale(locale) {
        this._locale = locale.replace('_', '-');
    }
    /**
     * Get current locale.
     *
     * @return The current locale.
     */
    getLocale() {
        return this._locale;
    }
    /**
     * Set current domain.
     *
     * @param domain - The domain to set.
     */
    setDomain(domain) {
        this._domain = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.normalizeDomain)(domain);
    }
    /**
     * Get current domain.
     *
     * @return The current domain string.
     */
    getDomain() {
        return this._domain;
    }
    /**
     * Set current strings prefix.
     *
     * @param prefix - The string prefix to set.
     */
    setStringsPrefix(prefix) {
        this._stringsPrefix = prefix;
    }
    /**
     * Get current strings prefix.
     *
     * @return The strings prefix.
     */
    getStringsPrefix() {
        return this._stringsPrefix;
    }
    /**
     * `sprintf` equivalent, takes a string and some arguments to make a
     * computed string.
     *
     * @param fmt - The string to interpolate.
     * @param args - The variables to use in interpolation.
     *
     * ### Examples
     * strfmt("%1 dogs are in %2", 7, "the kitchen"); => "7 dogs are in the kitchen"
     * strfmt("I like %1, bananas and %1", "apples"); => "I like apples, bananas and apples"
     */
    static strfmt(fmt, ...args) {
        return (fmt
            // put space after double % to prevent placeholder replacement of such matches
            .replace(/%%/g, '%% ')
            // replace placeholders
            .replace(/%(\d+)/g, function (str, p1) {
            return args[p1 - 1];
        })
            // replace double % and space with single %
            .replace(/%% /g, '%'));
    }
    /**
     * Load json translations strings (In Jed 2.x format).
     *
     * @param jsonData - The translation strings plus metadata.
     * @param domain - The translation domain, e.g. "jupyterlab".
     */
    loadJSON(jsonData, domain) {
        if (!jsonData[''] ||
            !jsonData['']['language'] ||
            !jsonData['']['pluralForms']) {
            throw new Error(`Wrong jsonData, it must have an empty key ("") with "language" and "pluralForms" information: ${jsonData}`);
        }
        domain = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.normalizeDomain)(domain);
        let headers = jsonData[''];
        let jsonDataCopy = JSON.parse(JSON.stringify(jsonData));
        delete jsonDataCopy[''];
        this.setMessages(domain || this._defaults.domain, headers['language'], jsonDataCopy, headers['pluralForms']);
    }
    /**
     * Shorthand for gettext.
     *
     * @param msgid - The singular string to translate.
     * @param args - Any additional values to use with interpolation.
     *
     * @return A translated string if found, or the original string.
     *
     * ### Notes
     * This is not a private method (starts with an underscore) it is just
     * a shorter and standard way to call these methods.
     */
    __(msgid, ...args) {
        return this.gettext(msgid, ...args);
    }
    /**
     * Shorthand for ngettext.
     *
     * @param msgid - The singular string to translate.
     * @param msgid_plural - The plural string to translate.
     * @param n - The number for pluralization.
     * @param args - Any additional values to use with interpolation.
     *
     * @return A translated string if found, or the original string.
     *
     * ### Notes
     * This is not a private method (starts with an underscore) it is just
     * a shorter and standard way to call these methods.
     */
    _n(msgid, msgid_plural, n, ...args) {
        return this.ngettext(msgid, msgid_plural, n, ...args);
    }
    /**
     * Shorthand for pgettext.
     *
     * @param msgctxt - The message context.
     * @param msgid - The singular string to translate.
     * @param args - Any additional values to use with interpolation.
     *
     * @return A translated string if found, or the original string.
     *
     * ### Notes
     * This is not a private method (starts with an underscore) it is just
     * a shorter and standard way to call these methods.
     */
    _p(msgctxt, msgid, ...args) {
        return this.pgettext(msgctxt, msgid, ...args);
    }
    /**
     * Shorthand for npgettext.
     *
     * @param msgctxt - The message context.
     * @param msgid - The singular string to translate.
     * @param msgid_plural - The plural string to translate.
     * @param n - The number for pluralization.
     * @param args - Any additional values to use with interpolation.
     *
     * @return A translated string if found, or the original string.
     *
     * ### Notes
     * This is not a private method (starts with an underscore) it is just
     * a shorter and standard way to call these methods.
     */
    _np(msgctxt, msgid, msgid_plural, n, ...args) {
        return this.npgettext(msgctxt, msgid, msgid_plural, n, ...args);
    }
    /**
     * Translate a singular string with extra interpolation values.
     *
     * @param msgid - The singular string to translate.
     * @param args - Any additional values to use with interpolation.
     *
     * @return A translated string if found, or the original string.
     */
    gettext(msgid, ...args) {
        return this.dcnpgettext('', '', msgid, '', 0, ...args);
    }
    /**
     * Translate a plural string with extra interpolation values.
     *
     * @param msgid - The singular string to translate.
     * @param args - Any additional values to use with interpolation.
     *
     * @return A translated string if found, or the original string.
     */
    ngettext(msgid, msgid_plural, n, ...args) {
        return this.dcnpgettext('', '', msgid, msgid_plural, n, ...args);
    }
    /**
     * Translate a contextualized singular string with extra interpolation values.
     *
     * @param msgctxt - The message context.
     * @param msgid - The singular string to translate.
     * @param args - Any additional values to use with interpolation.
     *
     * @return A translated string if found, or the original string.
     *
     * ### Notes
     * This is not a private method (starts with an underscore) it is just
     * a shorter and standard way to call these methods.
     */
    pgettext(msgctxt, msgid, ...args) {
        return this.dcnpgettext('', msgctxt, msgid, '', 0, ...args);
    }
    /**
     * Translate a contextualized plural string with extra interpolation values.
     *
     * @param msgctxt - The message context.
     * @param msgid - The singular string to translate.
     * @param msgid_plural - The plural string to translate.
     * @param n - The number for pluralization.
     * @param args - Any additional values to use with interpolation
     *
     * @return A translated string if found, or the original string.
     */
    npgettext(msgctxt, msgid, msgid_plural, n, ...args) {
        return this.dcnpgettext('', msgctxt, msgid, msgid_plural, n, ...args);
    }
    /**
     * Translate a singular string with extra interpolation values.
     *
     * @param domain - The translations domain.
     * @param msgctxt - The message context.
     * @param msgid - The singular string to translate.
     * @param msgid_plural - The plural string to translate.
     * @param n - The number for pluralization.
     * @param args - Any additional values to use with interpolation
     *
     * @return A translated string if found, or the original string.
     */
    dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, ...args) {
        domain = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.normalizeDomain)(domain) || this._domain;
        let translation;
        let key = msgctxt
            ? msgctxt + this._contextDelimiter + msgid
            : msgid;
        let options = { pluralForm: false };
        let exist = false;
        let locale = this._locale;
        let locales = this.expandLocale(this._locale);
        for (let i in locales) {
            locale = locales[i];
            exist =
                this._dictionary[domain] &&
                    this._dictionary[domain][locale] &&
                    this._dictionary[domain][locale][key];
            // check condition are valid (.length)
            // because it's not possible to define both a singular and a plural form of the same msgid,
            // we need to check that the stored form is the same as the expected one.
            // if not, we'll just ignore the translation and consider it as not translated.
            if (msgid_plural) {
                exist = exist && this._dictionary[domain][locale][key].length > 1;
            }
            else {
                exist = exist && this._dictionary[domain][locale][key].length == 1;
            }
            if (exist) {
                // This ensures that a variation is used.
                options.locale = locale;
                break;
            }
        }
        if (!exist) {
            translation = [msgid];
            options.pluralFunc = this._defaults.pluralFunc;
        }
        else {
            translation = this._dictionary[domain][locale][key];
        }
        // Singular form
        if (!msgid_plural) {
            return this.t(translation, n, options, ...args);
        }
        // Plural one
        options.pluralForm = true;
        let value = exist ? translation : [msgid, msgid_plural];
        return this.t(value, n, options, ...args);
    }
    /**
     * Split a locale into parent locales. "es-CO" -> ["es-CO", "es"]
     *
     * @param locale - The locale string.
     *
     * @return An array of locales.
     */
    expandLocale(locale) {
        let locales = [locale];
        let i = locale.lastIndexOf('-');
        while (i > 0) {
            locale = locale.slice(0, i);
            locales.push(locale);
            i = locale.lastIndexOf('-');
        }
        return locales;
    }
    /**
     * Split a locale into parent locales. "es-CO" -> ["es-CO", "es"]
     *
     * @param pluralForm - Plural form string..
     * @return An function to compute plural forms.
     */
    getPluralFunc(pluralForm) {
        // Plural form string regexp
        // taken from https://github.com/Orange-OpenSource/gettext.js/blob/master/lib.gettext.js
        // plural forms list available here http://localization-guide.readthedocs.org/en/latest/l10n/pluralforms.html
        let pf_re = new RegExp('^\\s*nplurals\\s*=\\s*[0-9]+\\s*;\\s*plural\\s*=\\s*(?:\\s|[-\\?\\|&=!<>+*/%:;n0-9_()])+');
        if (!pf_re.test(pluralForm))
            throw new Error(Gettext.strfmt('The plural form "%1" is not valid', pluralForm));
        // Careful here, this is a hidden eval() equivalent..
        // Risk should be reasonable though since we test the pluralForm through regex before
        // taken from https://github.com/Orange-OpenSource/gettext.js/blob/master/lib.gettext.js
        // TODO: should test if https://github.com/soney/jsep present and use it if so
        return new Function('n', 'let plural, nplurals; ' +
            pluralForm +
            ' return { nplurals: nplurals, plural: (plural === true ? 1 : (plural ? plural : 0)) };');
    }
    /**
     * Remove the context delimiter from string.
     *
     * @param str - Translation string.
     * @return A translation string without context.
     */
    removeContext(str) {
        // if there is context, remove it
        if (str.indexOf(this._contextDelimiter) !== -1) {
            let parts = str.split(this._contextDelimiter);
            return parts[1];
        }
        return str;
    }
    /**
     * Proper translation function that handle plurals and directives.
     *
     * @param messages - List of translation strings.
     * @param n - The number for pluralization.
     * @param options - Translation options.
     * @param args - Any variables to interpolate.
     *
     * @return A translation string without context.
     *
     * ### Notes
     * Contains juicy parts of https://github.com/Orange-OpenSource/gettext.js/blob/master/lib.gettext.js
     */
    t(messages, n, options, ...args) {
        // Singular is very easy, just pass dictionary message through strfmt
        if (!options.pluralForm)
            return (this._stringsPrefix +
                Gettext.strfmt(this.removeContext(messages[0]), ...args));
        let plural;
        // if a plural func is given, use that one
        if (options.pluralFunc) {
            plural = options.pluralFunc(n);
            // if plural form never interpreted before, do it now and store it
        }
        else if (!this._pluralFuncs[options.locale || '']) {
            this._pluralFuncs[options.locale || ''] = this.getPluralFunc(this._pluralForms[options.locale || '']);
            plural = this._pluralFuncs[options.locale || ''](n);
            // we have the plural function, compute the plural result
        }
        else {
            plural = this._pluralFuncs[options.locale || ''](n);
        }
        // If there is a problem with plurals, fallback to singular one
        if ('undefined' === typeof !plural.plural ||
            plural.plural > plural.nplurals ||
            messages.length <= plural.plural)
            plural.plural = 0;
        return (this._stringsPrefix +
            Gettext.strfmt(this.removeContext(messages[plural.plural]), ...[n].concat(args)));
    }
    /**
     * Set messages after loading them.
     *
     * @param domain - The translation domain.
     * @param locale - The translation locale.
     * @param messages - List of translation strings.
     * @param pluralForms - Plural form string.
     *
     * ### Notes
     * Contains juicy parts of https://github.com/Orange-OpenSource/gettext.js/blob/master/lib.gettext.js
     */
    setMessages(domain, locale, messages, pluralForms) {
        domain = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.normalizeDomain)(domain);
        if (pluralForms)
            this._pluralForms[locale] = pluralForms;
        if (!this._dictionary[domain])
            this._dictionary[domain] = {};
        this._dictionary[domain][locale] = messages;
    }
}

//# sourceMappingURL=gettext.js.map

/***/ }),

/***/ "../../packages/translation/lib/index.js":
/*!***********************************************!*\
  !*** ../../packages/translation/lib/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nullTranslator": () => (/* reexport safe */ _base__WEBPACK_IMPORTED_MODULE_0__.nullTranslator),
/* harmony export */   "Gettext": () => (/* reexport safe */ _gettext__WEBPACK_IMPORTED_MODULE_1__.Gettext),
/* harmony export */   "TranslationManager": () => (/* reexport safe */ _manager__WEBPACK_IMPORTED_MODULE_2__.TranslationManager),
/* harmony export */   "requestTranslationsAPI": () => (/* reexport safe */ _server__WEBPACK_IMPORTED_MODULE_3__.requestTranslationsAPI),
/* harmony export */   "ITranslator": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_4__.ITranslator),
/* harmony export */   "ITranslatorConnector": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_4__.ITranslatorConnector),
/* harmony export */   "TranslatorConnector": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_4__.TranslatorConnector)
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "../../packages/translation/lib/base.js");
/* harmony import */ var _gettext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gettext */ "../../packages/translation/lib/gettext.js");
/* harmony import */ var _manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./manager */ "../../packages/translation/lib/manager.js");
/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./server */ "../../packages/translation/lib/server.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tokens */ "../../packages/translation/lib/tokens.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module translation
 */
// Note: keep in alphabetical order...





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/translation/lib/manager.js":
/*!*************************************************!*\
  !*** ../../packages/translation/lib/manager.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TranslationManager": () => (/* binding */ TranslationManager)
/* harmony export */ });
/* harmony import */ var _gettext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gettext */ "../../packages/translation/lib/gettext.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tokens */ "../../packages/translation/lib/tokens.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "../../packages/translation/lib/utils.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * Translation Manager
 */
class TranslationManager {
    constructor(translationsUrl = '', stringsPrefix, serverSettings) {
        this._domainData = {};
        this._translationBundles = {};
        this._connector = new _tokens__WEBPACK_IMPORTED_MODULE_1__.TranslatorConnector(translationsUrl, serverSettings);
        this._stringsPrefix = stringsPrefix || '';
        this._englishBundle = new _gettext__WEBPACK_IMPORTED_MODULE_0__.Gettext({ stringsPrefix: this._stringsPrefix });
    }
    /**
     * Fetch the localization data from the server.
     *
     * @param locale The language locale to use for translations.
     */
    async fetch(locale) {
        var _a, _b;
        this._currentLocale = locale;
        this._languageData = await this._connector.fetch({ language: locale });
        this._domainData = ((_a = this._languageData) === null || _a === void 0 ? void 0 : _a.data) || {};
        const message = (_b = this._languageData) === null || _b === void 0 ? void 0 : _b.message;
        if (message && locale !== 'en') {
            console.warn(message);
        }
    }
    /**
     * Load translation bundles for a given domain.
     *
     * @param domain The translation domain to use for translations.
     */
    load(domain) {
        if (this._domainData) {
            if (this._currentLocale == 'en') {
                return this._englishBundle;
            }
            else {
                domain = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.normalizeDomain)(domain);
                if (!(domain in this._translationBundles)) {
                    let translationBundle = new _gettext__WEBPACK_IMPORTED_MODULE_0__.Gettext({
                        domain: domain,
                        locale: this._currentLocale,
                        stringsPrefix: this._stringsPrefix
                    });
                    if (domain in this._domainData) {
                        let metadata = this._domainData[domain][''];
                        if ('plural_forms' in metadata) {
                            metadata.pluralForms = metadata.plural_forms;
                            delete metadata.plural_forms;
                            this._domainData[domain][''] = metadata;
                        }
                        translationBundle.loadJSON(this._domainData[domain], domain);
                    }
                    this._translationBundles[domain] = translationBundle;
                }
                return this._translationBundles[domain];
            }
        }
        else {
            return this._englishBundle;
        }
    }
}
//# sourceMappingURL=manager.js.map

/***/ }),

/***/ "../../packages/translation/lib/server.js":
/*!************************************************!*\
  !*** ../../packages/translation/lib/server.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "requestTranslationsAPI": () => (/* binding */ requestTranslationsAPI)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * The url for the translations service.
 */
const TRANSLATIONS_SETTINGS_URL = 'api/translations';
/**
 * Call the API extension
 *
 * @param locale API REST end point for the extension
 * @param init Initial values for the request
 * @returns The response body interpreted as JSON
 */
async function requestTranslationsAPI(translationsUrl = '', locale = '', init = {}, serverSettings = undefined) {
    // Make request to Jupyter API
    const settings = serverSettings !== null && serverSettings !== void 0 ? serverSettings : _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeSettings();
    translationsUrl =
        translationsUrl || `${settings.appUrl}/${TRANSLATIONS_SETTINGS_URL}/`;
    const requestUrl = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(settings.baseUrl, translationsUrl, locale);
    let response;
    try {
        response = await _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeRequest(requestUrl, init, settings);
    }
    catch (error) {
        throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.NetworkError(error);
    }
    let data = await response.text();
    if (data.length > 0) {
        try {
            data = JSON.parse(data);
        }
        catch (error) {
            console.error('Not a JSON response body.', response);
        }
    }
    if (!response.ok) {
        throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.ResponseError(response, data.message || data);
    }
    return data;
}
//# sourceMappingURL=server.js.map

/***/ }),

/***/ "../../packages/translation/lib/tokens.js":
/*!************************************************!*\
  !*** ../../packages/translation/lib/tokens.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ITranslatorConnector": () => (/* binding */ ITranslatorConnector),
/* harmony export */   "TranslatorConnector": () => (/* binding */ TranslatorConnector),
/* harmony export */   "ITranslator": () => (/* binding */ ITranslator)
/* harmony export */ });
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/statedb */ "webpack/sharing/consume/default/@jupyterlab/statedb/@jupyterlab/statedb");
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./server */ "../../packages/translation/lib/server.js");
/* ----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/



const ITranslatorConnector = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.Token('@jupyterlab/translation:ITranslatorConnector');
class TranslatorConnector extends _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__.DataConnector {
    constructor(translationsUrl = '', serverSettings) {
        super();
        this._translationsUrl = translationsUrl;
        this._serverSettings = serverSettings;
    }
    async fetch(opts) {
        return (0,_server__WEBPACK_IMPORTED_MODULE_2__.requestTranslationsAPI)(this._translationsUrl, opts.language, {}, this._serverSettings);
    }
}
const ITranslator = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.Token('@jupyterlab/translation:ITranslator');
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/translation/lib/utils.js":
/*!***********************************************!*\
  !*** ../../packages/translation/lib/utils.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "normalizeDomain": () => (/* binding */ normalizeDomain)
/* harmony export */ });
/**
 * Normalize domain
 *
 * @param domain Domain to normalize
 * @returns Normalized domain
 */
function normalizeDomain(domain) {
    return domain.replace('-', '_');
}
//# sourceMappingURL=utils.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdHJhbnNsYXRpb24vbGliL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3RyYW5zbGF0aW9uL2xpYi9nZXR0ZXh0LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy90cmFuc2xhdGlvbi9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL3RyYW5zbGF0aW9uL2xpYi9tYW5hZ2VyLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy90cmFuc2xhdGlvbi9saWIvc2VydmVyLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy90cmFuc2xhdGlvbi9saWIvdG9rZW5zLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy90cmFuc2xhdGlvbi9saWIvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ29DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG9EQUFjO0FBQzdCO0FBQ0E7QUFDQSxlQUFlLG9EQUFjO0FBQzdCO0FBQ0E7QUFDQSxlQUFlLG9EQUFjO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsZ0M7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVEQUFlO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVEQUFlO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRCxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZIQUE2SCxTQUFTO0FBQ3RJO0FBQ0EsaUJBQWlCLHVEQUFlO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHVEQUFlO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsNkNBQTZDO0FBQzlHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDtBQUNBLHNCQUFzQiw2RUFBNkU7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsdURBQWU7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDbUI7QUFDbkIsbUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3VCO0FBQ0c7QUFDQTtBQUNEO0FBQ0E7QUFDekIsaUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDb0M7QUFDVztBQUNMO0FBQzFDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHdEQUFtQjtBQUNqRDtBQUNBLGtDQUFrQyw2Q0FBTyxFQUFFLHFDQUFxQztBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQsbUJBQW1CO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsdURBQWU7QUFDeEM7QUFDQSxnREFBZ0QsNkNBQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRUE7QUFDQTtBQUMrQztBQUNTO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxrRkFBa0Y7QUFDekY7QUFDQSw2RkFBNkYsK0VBQTZCO0FBQzFIO0FBQ0EsOEJBQThCLGdCQUFnQixHQUFHLDBCQUEwQjtBQUMzRSx1QkFBdUIsOERBQVc7QUFDbEM7QUFDQTtBQUNBLHlCQUF5Qiw4RUFBNEI7QUFDckQ7QUFDQTtBQUNBLGtCQUFrQiwrRUFBNkI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnRkFBOEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDb0Q7QUFDVjtBQUNRO0FBQzNDLGlDQUFpQyxvREFBSztBQUN0QyxrQ0FBa0MsOERBQWE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSwrREFBc0IseUNBQXlDO0FBQzlFO0FBQ0E7QUFDTyx3QkFBd0Isb0RBQUs7QUFDcEMsa0M7Ozs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxpQyIsImZpbGUiOiJwYWNrYWdlc190cmFuc2xhdGlvbl9saWJfaW5kZXhfanMuMzEyYjFmYTQ5MTY3N2Q0ZjZiOWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBHZXR0ZXh0IH0gZnJvbSAnLi9nZXR0ZXh0Jztcbi8qKlxuICogQSB0cmFuc2xhdG9yIHRoYXQgbG9hZHMgYSBkdW1teSBsYW5ndWFnZSBidW5kbGUgdGhhdCByZXR1cm5zIHRoZSBzYW1lIGlucHV0XG4gKiBzdHJpbmdzLlxuICovXG5jbGFzcyBOdWxsVHJhbnNsYXRvciB7XG4gICAgY29uc3RydWN0b3IoYnVuZGxlKSB7XG4gICAgICAgIHRoaXMuX2xhbmd1YWdlQnVuZGxlID0gYnVuZGxlO1xuICAgIH1cbiAgICBsb2FkKGRvbWFpbikge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFuZ3VhZ2VCdW5kbGU7XG4gICAgfVxuICAgIGxvY2FsZSgpIHtcbiAgICAgICAgcmV0dXJuICdlbic7XG4gICAgfVxufVxuLyoqXG4gKiBBIGxhbmd1YWdlIGJ1bmRsZSB0aGF0IHJldHVybnMgdGhlIHNhbWUgaW5wdXQgc3RyaW5ncy5cbiAqL1xuY2xhc3MgTnVsbExhbmd1YWdlQnVuZGxlIHtcbiAgICBfXyhtc2dpZCwgLi4uYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXR0ZXh0KG1zZ2lkLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgX24obXNnaWQsIG1zZ2lkX3BsdXJhbCwgbiwgLi4uYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5uZ2V0dGV4dChtc2dpZCwgbXNnaWRfcGx1cmFsLCBuLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgX3AobXNnY3R4dCwgbXNnaWQsIC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGdldHRleHQobXNnY3R4dCwgbXNnaWQsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBfbnAobXNnY3R4dCwgbXNnaWQsIG1zZ2lkX3BsdXJhbCwgbiwgLi4uYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5ucGdldHRleHQobXNnY3R4dCwgbXNnaWQsIG1zZ2lkX3BsdXJhbCwgbiwgLi4uYXJncyk7XG4gICAgfVxuICAgIGdldHRleHQobXNnaWQsIC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIEdldHRleHQuc3RyZm10KG1zZ2lkLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgbmdldHRleHQobXNnaWQsIG1zZ2lkX3BsdXJhbCwgbiwgLi4uYXJncykge1xuICAgICAgICByZXR1cm4gR2V0dGV4dC5zdHJmbXQobiA9PSAxID8gbXNnaWQgOiBtc2dpZF9wbHVyYWwsIC4uLltuXS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgICBwZ2V0dGV4dChtc2djdHh0LCBtc2dpZCwgLi4uYXJncykge1xuICAgICAgICByZXR1cm4gR2V0dGV4dC5zdHJmbXQobXNnaWQsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBucGdldHRleHQobXNnY3R4dCwgbXNnaWQsIG1zZ2lkX3BsdXJhbCwgbiwgLi4uYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5uZ2V0dGV4dChtc2dpZCwgbXNnaWRfcGx1cmFsLCBuLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgZGNucGdldHRleHQoZG9tYWluLCBtc2djdHh0LCBtc2dpZCwgbXNnaWRfcGx1cmFsLCBuLCAuLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5nZXR0ZXh0KG1zZ2lkLCBtc2dpZF9wbHVyYWwsIG4sIC4uLmFyZ3MpO1xuICAgIH1cbn1cbi8qKlxuICogVGhlIGFwcGxpY2F0aW9uIG51bGwgdHJhbnNsYXRvciBpbnN0YW5jZSB0aGF0IGp1c3QgcmV0dXJucyB0aGUgc2FtZSB0ZXh0LlxuICogQWxzbyBwcm92aWRlcyBpbnRlcnBvbGF0aW9uLlxuICovXG5leHBvcnQgY29uc3QgbnVsbFRyYW5zbGF0b3IgPSBuZXcgTnVsbFRyYW5zbGF0b3IobmV3IE51bGxMYW5ndWFnZUJ1bmRsZSgpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2UuanMubWFwIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnxcbnwgQmFzZSBnZXR0ZXh0LmpzIGltcGxlbWVudGF0aW9uLlxufCBDb3B5cmlnaHQgKGMpIEd1aWxsYXVtZSBQb3RpZXIuXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgTUlUIExpY2Vuc2UuXG58IFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2d1aWxsYXVtZXBvdGllci9nZXR0ZXh0LmpzXG58XG58IFR5cGUgZGVmaW5pdGlvbnMuXG58IENvcHlyaWdodCAoYykgSnVsaWVuIENyb3V6ZXQgYW5kIEZsb3JpYW4gU2Nod2luZ2Vuc2NobMO2Z2wuXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgTUlUIExpY2Vuc2UuXG58IFNlZTogaHR0cHM6Ly9naXRodWIuY29tL0RlZmluaXRlbHlUeXBlZC9EZWZpbml0ZWx5VHlwZWRcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IG5vcm1hbGl6ZURvbWFpbiB9IGZyb20gJy4vdXRpbHMnO1xuLyoqXG4gKiBHZXR0ZXh0IGNsYXNzIHByb3ZpZGluZyBsb2NhbGl6YXRpb24gbWV0aG9kcy5cbiAqL1xuY2xhc3MgR2V0dGV4dCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgLy8gZGVmYXVsdCB2YWx1ZXMgdGhhdCBjb3VsZCBiZSBvdmVycmlkZGVuIGluIEdldHRleHQoKSBjb25zdHJ1Y3RvclxuICAgICAgICB0aGlzLl9kZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGRvbWFpbjogJ21lc3NhZ2VzJyxcbiAgICAgICAgICAgIGxvY2FsZTogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnbGFuZycpIHx8ICdlbicsXG4gICAgICAgICAgICBwbHVyYWxGdW5jOiBmdW5jdGlvbiAobikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IG5wbHVyYWxzOiAyLCBwbHVyYWw6IG4gIT0gMSA/IDEgOiAwIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udGV4dERlbGltaXRlcjogU3RyaW5nLmZyb21DaGFyQ29kZSg0KSxcbiAgICAgICAgICAgIHN0cmluZ3NQcmVmaXg6ICcnXG4gICAgICAgIH07XG4gICAgICAgIC8vIEVuc3VyZSB0aGUgY29ycmVjdCBzZXBhcmF0b3IgaXMgdXNlZFxuICAgICAgICB0aGlzLl9sb2NhbGUgPSAob3B0aW9ucy5sb2NhbGUgfHwgdGhpcy5fZGVmYXVsdHMubG9jYWxlKS5yZXBsYWNlKCdfJywgJy0nKTtcbiAgICAgICAgdGhpcy5fZG9tYWluID0gbm9ybWFsaXplRG9tYWluKG9wdGlvbnMuZG9tYWluIHx8IHRoaXMuX2RlZmF1bHRzLmRvbWFpbik7XG4gICAgICAgIHRoaXMuX2NvbnRleHREZWxpbWl0ZXIgPVxuICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0RGVsaW1pdGVyIHx8IHRoaXMuX2RlZmF1bHRzLmNvbnRleHREZWxpbWl0ZXI7XG4gICAgICAgIHRoaXMuX3N0cmluZ3NQcmVmaXggPSBvcHRpb25zLnN0cmluZ3NQcmVmaXggfHwgdGhpcy5fZGVmYXVsdHMuc3RyaW5nc1ByZWZpeDtcbiAgICAgICAgdGhpcy5fcGx1cmFsRnVuY3MgPSB7fTtcbiAgICAgICAgdGhpcy5fZGljdGlvbmFyeSA9IHt9O1xuICAgICAgICB0aGlzLl9wbHVyYWxGb3JtcyA9IHt9O1xuICAgICAgICBpZiAob3B0aW9ucy5tZXNzYWdlcykge1xuICAgICAgICAgICAgdGhpcy5fZGljdGlvbmFyeVt0aGlzLl9kb21haW5dID0ge307XG4gICAgICAgICAgICB0aGlzLl9kaWN0aW9uYXJ5W3RoaXMuX2RvbWFpbl1bdGhpcy5fbG9jYWxlXSA9IG9wdGlvbnMubWVzc2FnZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMucGx1cmFsRm9ybXMpIHtcbiAgICAgICAgICAgIHRoaXMuX3BsdXJhbEZvcm1zW3RoaXMuX2xvY2FsZV0gPSBvcHRpb25zLnBsdXJhbEZvcm1zO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCBjdXJyZW50IGNvbnRleHQgZGVsaW1pdGVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRlbGltaXRlciAtIFRoZSBkZWxpbWl0ZXIgdG8gc2V0LlxuICAgICAqL1xuICAgIHNldENvbnRleHREZWxpbWl0ZXIoZGVsaW1pdGVyKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHREZWxpbWl0ZXIgPSBkZWxpbWl0ZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBjdXJyZW50IGNvbnRleHQgZGVsaW1pdGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiBUaGUgY3VycmVudCBkZWxpbWl0ZXIuXG4gICAgICovXG4gICAgZ2V0Q29udGV4dERlbGltaXRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHREZWxpbWl0ZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCBjdXJyZW50IGxvY2FsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsb2NhbGUgLSBUaGUgbG9jYWxlIHRvIHNldC5cbiAgICAgKi9cbiAgICBzZXRMb2NhbGUobG9jYWxlKSB7XG4gICAgICAgIHRoaXMuX2xvY2FsZSA9IGxvY2FsZS5yZXBsYWNlKCdfJywgJy0nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGN1cnJlbnQgbG9jYWxlLlxuICAgICAqXG4gICAgICogQHJldHVybiBUaGUgY3VycmVudCBsb2NhbGUuXG4gICAgICovXG4gICAgZ2V0TG9jYWxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgY3VycmVudCBkb21haW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZG9tYWluIC0gVGhlIGRvbWFpbiB0byBzZXQuXG4gICAgICovXG4gICAgc2V0RG9tYWluKGRvbWFpbikge1xuICAgICAgICB0aGlzLl9kb21haW4gPSBub3JtYWxpemVEb21haW4oZG9tYWluKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGN1cnJlbnQgZG9tYWluLlxuICAgICAqXG4gICAgICogQHJldHVybiBUaGUgY3VycmVudCBkb21haW4gc3RyaW5nLlxuICAgICAqL1xuICAgIGdldERvbWFpbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RvbWFpbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IGN1cnJlbnQgc3RyaW5ncyBwcmVmaXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJlZml4IC0gVGhlIHN0cmluZyBwcmVmaXggdG8gc2V0LlxuICAgICAqL1xuICAgIHNldFN0cmluZ3NQcmVmaXgocHJlZml4KSB7XG4gICAgICAgIHRoaXMuX3N0cmluZ3NQcmVmaXggPSBwcmVmaXg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBjdXJyZW50IHN0cmluZ3MgcHJlZml4LlxuICAgICAqXG4gICAgICogQHJldHVybiBUaGUgc3RyaW5ncyBwcmVmaXguXG4gICAgICovXG4gICAgZ2V0U3RyaW5nc1ByZWZpeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmluZ3NQcmVmaXg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGBzcHJpbnRmYCBlcXVpdmFsZW50LCB0YWtlcyBhIHN0cmluZyBhbmQgc29tZSBhcmd1bWVudHMgdG8gbWFrZSBhXG4gICAgICogY29tcHV0ZWQgc3RyaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIGZtdCAtIFRoZSBzdHJpbmcgdG8gaW50ZXJwb2xhdGUuXG4gICAgICogQHBhcmFtIGFyZ3MgLSBUaGUgdmFyaWFibGVzIHRvIHVzZSBpbiBpbnRlcnBvbGF0aW9uLlxuICAgICAqXG4gICAgICogIyMjIEV4YW1wbGVzXG4gICAgICogc3RyZm10KFwiJTEgZG9ncyBhcmUgaW4gJTJcIiwgNywgXCJ0aGUga2l0Y2hlblwiKTsgPT4gXCI3IGRvZ3MgYXJlIGluIHRoZSBraXRjaGVuXCJcbiAgICAgKiBzdHJmbXQoXCJJIGxpa2UgJTEsIGJhbmFuYXMgYW5kICUxXCIsIFwiYXBwbGVzXCIpOyA9PiBcIkkgbGlrZSBhcHBsZXMsIGJhbmFuYXMgYW5kIGFwcGxlc1wiXG4gICAgICovXG4gICAgc3RhdGljIHN0cmZtdChmbXQsIC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIChmbXRcbiAgICAgICAgICAgIC8vIHB1dCBzcGFjZSBhZnRlciBkb3VibGUgJSB0byBwcmV2ZW50IHBsYWNlaG9sZGVyIHJlcGxhY2VtZW50IG9mIHN1Y2ggbWF0Y2hlc1xuICAgICAgICAgICAgLnJlcGxhY2UoLyUlL2csICclJSAnKVxuICAgICAgICAgICAgLy8gcmVwbGFjZSBwbGFjZWhvbGRlcnNcbiAgICAgICAgICAgIC5yZXBsYWNlKC8lKFxcZCspL2csIGZ1bmN0aW9uIChzdHIsIHAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJnc1twMSAtIDFdO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLy8gcmVwbGFjZSBkb3VibGUgJSBhbmQgc3BhY2Ugd2l0aCBzaW5nbGUgJVxuICAgICAgICAgICAgLnJlcGxhY2UoLyUlIC9nLCAnJScpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9hZCBqc29uIHRyYW5zbGF0aW9ucyBzdHJpbmdzIChJbiBKZWQgMi54IGZvcm1hdCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ganNvbkRhdGEgLSBUaGUgdHJhbnNsYXRpb24gc3RyaW5ncyBwbHVzIG1ldGFkYXRhLlxuICAgICAqIEBwYXJhbSBkb21haW4gLSBUaGUgdHJhbnNsYXRpb24gZG9tYWluLCBlLmcuIFwianVweXRlcmxhYlwiLlxuICAgICAqL1xuICAgIGxvYWRKU09OKGpzb25EYXRhLCBkb21haW4pIHtcbiAgICAgICAgaWYgKCFqc29uRGF0YVsnJ10gfHxcbiAgICAgICAgICAgICFqc29uRGF0YVsnJ11bJ2xhbmd1YWdlJ10gfHxcbiAgICAgICAgICAgICFqc29uRGF0YVsnJ11bJ3BsdXJhbEZvcm1zJ10pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgV3JvbmcganNvbkRhdGEsIGl0IG11c3QgaGF2ZSBhbiBlbXB0eSBrZXkgKFwiXCIpIHdpdGggXCJsYW5ndWFnZVwiIGFuZCBcInBsdXJhbEZvcm1zXCIgaW5mb3JtYXRpb246ICR7anNvbkRhdGF9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9tYWluID0gbm9ybWFsaXplRG9tYWluKGRvbWFpbik7XG4gICAgICAgIGxldCBoZWFkZXJzID0ganNvbkRhdGFbJyddO1xuICAgICAgICBsZXQganNvbkRhdGFDb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShqc29uRGF0YSkpO1xuICAgICAgICBkZWxldGUganNvbkRhdGFDb3B5WycnXTtcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlcyhkb21haW4gfHwgdGhpcy5fZGVmYXVsdHMuZG9tYWluLCBoZWFkZXJzWydsYW5ndWFnZSddLCBqc29uRGF0YUNvcHksIGhlYWRlcnNbJ3BsdXJhbEZvcm1zJ10pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGhhbmQgZm9yIGdldHRleHQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbXNnaWQgLSBUaGUgc2luZ3VsYXIgc3RyaW5nIHRvIHRyYW5zbGF0ZS5cbiAgICAgKiBAcGFyYW0gYXJncyAtIEFueSBhZGRpdGlvbmFsIHZhbHVlcyB0byB1c2Ugd2l0aCBpbnRlcnBvbGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybiBBIHRyYW5zbGF0ZWQgc3RyaW5nIGlmIGZvdW5kLCBvciB0aGUgb3JpZ2luYWwgc3RyaW5nLlxuICAgICAqXG4gICAgICogIyMjIE5vdGVzXG4gICAgICogVGhpcyBpcyBub3QgYSBwcml2YXRlIG1ldGhvZCAoc3RhcnRzIHdpdGggYW4gdW5kZXJzY29yZSkgaXQgaXMganVzdFxuICAgICAqIGEgc2hvcnRlciBhbmQgc3RhbmRhcmQgd2F5IHRvIGNhbGwgdGhlc2UgbWV0aG9kcy5cbiAgICAgKi9cbiAgICBfXyhtc2dpZCwgLi4uYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXR0ZXh0KG1zZ2lkLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvcnRoYW5kIGZvciBuZ2V0dGV4dC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtc2dpZCAtIFRoZSBzaW5ndWxhciBzdHJpbmcgdG8gdHJhbnNsYXRlLlxuICAgICAqIEBwYXJhbSBtc2dpZF9wbHVyYWwgLSBUaGUgcGx1cmFsIHN0cmluZyB0byB0cmFuc2xhdGUuXG4gICAgICogQHBhcmFtIG4gLSBUaGUgbnVtYmVyIGZvciBwbHVyYWxpemF0aW9uLlxuICAgICAqIEBwYXJhbSBhcmdzIC0gQW55IGFkZGl0aW9uYWwgdmFsdWVzIHRvIHVzZSB3aXRoIGludGVycG9sYXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIEEgdHJhbnNsYXRlZCBzdHJpbmcgaWYgZm91bmQsIG9yIHRoZSBvcmlnaW5hbCBzdHJpbmcuXG4gICAgICpcbiAgICAgKiAjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGlzIG5vdCBhIHByaXZhdGUgbWV0aG9kIChzdGFydHMgd2l0aCBhbiB1bmRlcnNjb3JlKSBpdCBpcyBqdXN0XG4gICAgICogYSBzaG9ydGVyIGFuZCBzdGFuZGFyZCB3YXkgdG8gY2FsbCB0aGVzZSBtZXRob2RzLlxuICAgICAqL1xuICAgIF9uKG1zZ2lkLCBtc2dpZF9wbHVyYWwsIG4sIC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmdldHRleHQobXNnaWQsIG1zZ2lkX3BsdXJhbCwgbiwgLi4uYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3J0aGFuZCBmb3IgcGdldHRleHQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbXNnY3R4dCAtIFRoZSBtZXNzYWdlIGNvbnRleHQuXG4gICAgICogQHBhcmFtIG1zZ2lkIC0gVGhlIHNpbmd1bGFyIHN0cmluZyB0byB0cmFuc2xhdGUuXG4gICAgICogQHBhcmFtIGFyZ3MgLSBBbnkgYWRkaXRpb25hbCB2YWx1ZXMgdG8gdXNlIHdpdGggaW50ZXJwb2xhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gQSB0cmFuc2xhdGVkIHN0cmluZyBpZiBmb3VuZCwgb3IgdGhlIG9yaWdpbmFsIHN0cmluZy5cbiAgICAgKlxuICAgICAqICMjIyBOb3Rlc1xuICAgICAqIFRoaXMgaXMgbm90IGEgcHJpdmF0ZSBtZXRob2QgKHN0YXJ0cyB3aXRoIGFuIHVuZGVyc2NvcmUpIGl0IGlzIGp1c3RcbiAgICAgKiBhIHNob3J0ZXIgYW5kIHN0YW5kYXJkIHdheSB0byBjYWxsIHRoZXNlIG1ldGhvZHMuXG4gICAgICovXG4gICAgX3AobXNnY3R4dCwgbXNnaWQsIC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGdldHRleHQobXNnY3R4dCwgbXNnaWQsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG9ydGhhbmQgZm9yIG5wZ2V0dGV4dC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtc2djdHh0IC0gVGhlIG1lc3NhZ2UgY29udGV4dC5cbiAgICAgKiBAcGFyYW0gbXNnaWQgLSBUaGUgc2luZ3VsYXIgc3RyaW5nIHRvIHRyYW5zbGF0ZS5cbiAgICAgKiBAcGFyYW0gbXNnaWRfcGx1cmFsIC0gVGhlIHBsdXJhbCBzdHJpbmcgdG8gdHJhbnNsYXRlLlxuICAgICAqIEBwYXJhbSBuIC0gVGhlIG51bWJlciBmb3IgcGx1cmFsaXphdGlvbi5cbiAgICAgKiBAcGFyYW0gYXJncyAtIEFueSBhZGRpdGlvbmFsIHZhbHVlcyB0byB1c2Ugd2l0aCBpbnRlcnBvbGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybiBBIHRyYW5zbGF0ZWQgc3RyaW5nIGlmIGZvdW5kLCBvciB0aGUgb3JpZ2luYWwgc3RyaW5nLlxuICAgICAqXG4gICAgICogIyMjIE5vdGVzXG4gICAgICogVGhpcyBpcyBub3QgYSBwcml2YXRlIG1ldGhvZCAoc3RhcnRzIHdpdGggYW4gdW5kZXJzY29yZSkgaXQgaXMganVzdFxuICAgICAqIGEgc2hvcnRlciBhbmQgc3RhbmRhcmQgd2F5IHRvIGNhbGwgdGhlc2UgbWV0aG9kcy5cbiAgICAgKi9cbiAgICBfbnAobXNnY3R4dCwgbXNnaWQsIG1zZ2lkX3BsdXJhbCwgbiwgLi4uYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5ucGdldHRleHQobXNnY3R4dCwgbXNnaWQsIG1zZ2lkX3BsdXJhbCwgbiwgLi4uYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRyYW5zbGF0ZSBhIHNpbmd1bGFyIHN0cmluZyB3aXRoIGV4dHJhIGludGVycG9sYXRpb24gdmFsdWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1zZ2lkIC0gVGhlIHNpbmd1bGFyIHN0cmluZyB0byB0cmFuc2xhdGUuXG4gICAgICogQHBhcmFtIGFyZ3MgLSBBbnkgYWRkaXRpb25hbCB2YWx1ZXMgdG8gdXNlIHdpdGggaW50ZXJwb2xhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gQSB0cmFuc2xhdGVkIHN0cmluZyBpZiBmb3VuZCwgb3IgdGhlIG9yaWdpbmFsIHN0cmluZy5cbiAgICAgKi9cbiAgICBnZXR0ZXh0KG1zZ2lkLCAuLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRjbnBnZXR0ZXh0KCcnLCAnJywgbXNnaWQsICcnLCAwLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJhbnNsYXRlIGEgcGx1cmFsIHN0cmluZyB3aXRoIGV4dHJhIGludGVycG9sYXRpb24gdmFsdWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1zZ2lkIC0gVGhlIHNpbmd1bGFyIHN0cmluZyB0byB0cmFuc2xhdGUuXG4gICAgICogQHBhcmFtIGFyZ3MgLSBBbnkgYWRkaXRpb25hbCB2YWx1ZXMgdG8gdXNlIHdpdGggaW50ZXJwb2xhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gQSB0cmFuc2xhdGVkIHN0cmluZyBpZiBmb3VuZCwgb3IgdGhlIG9yaWdpbmFsIHN0cmluZy5cbiAgICAgKi9cbiAgICBuZ2V0dGV4dChtc2dpZCwgbXNnaWRfcGx1cmFsLCBuLCAuLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRjbnBnZXR0ZXh0KCcnLCAnJywgbXNnaWQsIG1zZ2lkX3BsdXJhbCwgbiwgLi4uYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRyYW5zbGF0ZSBhIGNvbnRleHR1YWxpemVkIHNpbmd1bGFyIHN0cmluZyB3aXRoIGV4dHJhIGludGVycG9sYXRpb24gdmFsdWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1zZ2N0eHQgLSBUaGUgbWVzc2FnZSBjb250ZXh0LlxuICAgICAqIEBwYXJhbSBtc2dpZCAtIFRoZSBzaW5ndWxhciBzdHJpbmcgdG8gdHJhbnNsYXRlLlxuICAgICAqIEBwYXJhbSBhcmdzIC0gQW55IGFkZGl0aW9uYWwgdmFsdWVzIHRvIHVzZSB3aXRoIGludGVycG9sYXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIEEgdHJhbnNsYXRlZCBzdHJpbmcgaWYgZm91bmQsIG9yIHRoZSBvcmlnaW5hbCBzdHJpbmcuXG4gICAgICpcbiAgICAgKiAjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGlzIG5vdCBhIHByaXZhdGUgbWV0aG9kIChzdGFydHMgd2l0aCBhbiB1bmRlcnNjb3JlKSBpdCBpcyBqdXN0XG4gICAgICogYSBzaG9ydGVyIGFuZCBzdGFuZGFyZCB3YXkgdG8gY2FsbCB0aGVzZSBtZXRob2RzLlxuICAgICAqL1xuICAgIHBnZXR0ZXh0KG1zZ2N0eHQsIG1zZ2lkLCAuLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRjbnBnZXR0ZXh0KCcnLCBtc2djdHh0LCBtc2dpZCwgJycsIDAsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc2xhdGUgYSBjb250ZXh0dWFsaXplZCBwbHVyYWwgc3RyaW5nIHdpdGggZXh0cmEgaW50ZXJwb2xhdGlvbiB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbXNnY3R4dCAtIFRoZSBtZXNzYWdlIGNvbnRleHQuXG4gICAgICogQHBhcmFtIG1zZ2lkIC0gVGhlIHNpbmd1bGFyIHN0cmluZyB0byB0cmFuc2xhdGUuXG4gICAgICogQHBhcmFtIG1zZ2lkX3BsdXJhbCAtIFRoZSBwbHVyYWwgc3RyaW5nIHRvIHRyYW5zbGF0ZS5cbiAgICAgKiBAcGFyYW0gbiAtIFRoZSBudW1iZXIgZm9yIHBsdXJhbGl6YXRpb24uXG4gICAgICogQHBhcmFtIGFyZ3MgLSBBbnkgYWRkaXRpb25hbCB2YWx1ZXMgdG8gdXNlIHdpdGggaW50ZXJwb2xhdGlvblxuICAgICAqXG4gICAgICogQHJldHVybiBBIHRyYW5zbGF0ZWQgc3RyaW5nIGlmIGZvdW5kLCBvciB0aGUgb3JpZ2luYWwgc3RyaW5nLlxuICAgICAqL1xuICAgIG5wZ2V0dGV4dChtc2djdHh0LCBtc2dpZCwgbXNnaWRfcGx1cmFsLCBuLCAuLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRjbnBnZXR0ZXh0KCcnLCBtc2djdHh0LCBtc2dpZCwgbXNnaWRfcGx1cmFsLCBuLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJhbnNsYXRlIGEgc2luZ3VsYXIgc3RyaW5nIHdpdGggZXh0cmEgaW50ZXJwb2xhdGlvbiB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZG9tYWluIC0gVGhlIHRyYW5zbGF0aW9ucyBkb21haW4uXG4gICAgICogQHBhcmFtIG1zZ2N0eHQgLSBUaGUgbWVzc2FnZSBjb250ZXh0LlxuICAgICAqIEBwYXJhbSBtc2dpZCAtIFRoZSBzaW5ndWxhciBzdHJpbmcgdG8gdHJhbnNsYXRlLlxuICAgICAqIEBwYXJhbSBtc2dpZF9wbHVyYWwgLSBUaGUgcGx1cmFsIHN0cmluZyB0byB0cmFuc2xhdGUuXG4gICAgICogQHBhcmFtIG4gLSBUaGUgbnVtYmVyIGZvciBwbHVyYWxpemF0aW9uLlxuICAgICAqIEBwYXJhbSBhcmdzIC0gQW55IGFkZGl0aW9uYWwgdmFsdWVzIHRvIHVzZSB3aXRoIGludGVycG9sYXRpb25cbiAgICAgKlxuICAgICAqIEByZXR1cm4gQSB0cmFuc2xhdGVkIHN0cmluZyBpZiBmb3VuZCwgb3IgdGhlIG9yaWdpbmFsIHN0cmluZy5cbiAgICAgKi9cbiAgICBkY25wZ2V0dGV4dChkb21haW4sIG1zZ2N0eHQsIG1zZ2lkLCBtc2dpZF9wbHVyYWwsIG4sIC4uLmFyZ3MpIHtcbiAgICAgICAgZG9tYWluID0gbm9ybWFsaXplRG9tYWluKGRvbWFpbikgfHwgdGhpcy5fZG9tYWluO1xuICAgICAgICBsZXQgdHJhbnNsYXRpb247XG4gICAgICAgIGxldCBrZXkgPSBtc2djdHh0XG4gICAgICAgICAgICA/IG1zZ2N0eHQgKyB0aGlzLl9jb250ZXh0RGVsaW1pdGVyICsgbXNnaWRcbiAgICAgICAgICAgIDogbXNnaWQ7XG4gICAgICAgIGxldCBvcHRpb25zID0geyBwbHVyYWxGb3JtOiBmYWxzZSB9O1xuICAgICAgICBsZXQgZXhpc3QgPSBmYWxzZTtcbiAgICAgICAgbGV0IGxvY2FsZSA9IHRoaXMuX2xvY2FsZTtcbiAgICAgICAgbGV0IGxvY2FsZXMgPSB0aGlzLmV4cGFuZExvY2FsZSh0aGlzLl9sb2NhbGUpO1xuICAgICAgICBmb3IgKGxldCBpIGluIGxvY2FsZXMpIHtcbiAgICAgICAgICAgIGxvY2FsZSA9IGxvY2FsZXNbaV07XG4gICAgICAgICAgICBleGlzdCA9XG4gICAgICAgICAgICAgICAgdGhpcy5fZGljdGlvbmFyeVtkb21haW5dICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpY3Rpb25hcnlbZG9tYWluXVtsb2NhbGVdICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpY3Rpb25hcnlbZG9tYWluXVtsb2NhbGVdW2tleV07XG4gICAgICAgICAgICAvLyBjaGVjayBjb25kaXRpb24gYXJlIHZhbGlkICgubGVuZ3RoKVxuICAgICAgICAgICAgLy8gYmVjYXVzZSBpdCdzIG5vdCBwb3NzaWJsZSB0byBkZWZpbmUgYm90aCBhIHNpbmd1bGFyIGFuZCBhIHBsdXJhbCBmb3JtIG9mIHRoZSBzYW1lIG1zZ2lkLFxuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byBjaGVjayB0aGF0IHRoZSBzdG9yZWQgZm9ybSBpcyB0aGUgc2FtZSBhcyB0aGUgZXhwZWN0ZWQgb25lLlxuICAgICAgICAgICAgLy8gaWYgbm90LCB3ZSdsbCBqdXN0IGlnbm9yZSB0aGUgdHJhbnNsYXRpb24gYW5kIGNvbnNpZGVyIGl0IGFzIG5vdCB0cmFuc2xhdGVkLlxuICAgICAgICAgICAgaWYgKG1zZ2lkX3BsdXJhbCkge1xuICAgICAgICAgICAgICAgIGV4aXN0ID0gZXhpc3QgJiYgdGhpcy5fZGljdGlvbmFyeVtkb21haW5dW2xvY2FsZV1ba2V5XS5sZW5ndGggPiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXhpc3QgPSBleGlzdCAmJiB0aGlzLl9kaWN0aW9uYXJ5W2RvbWFpbl1bbG9jYWxlXVtrZXldLmxlbmd0aCA9PSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV4aXN0KSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBlbnN1cmVzIHRoYXQgYSB2YXJpYXRpb24gaXMgdXNlZC5cbiAgICAgICAgICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGxvY2FsZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWV4aXN0KSB7XG4gICAgICAgICAgICB0cmFuc2xhdGlvbiA9IFttc2dpZF07XG4gICAgICAgICAgICBvcHRpb25zLnBsdXJhbEZ1bmMgPSB0aGlzLl9kZWZhdWx0cy5wbHVyYWxGdW5jO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNsYXRpb24gPSB0aGlzLl9kaWN0aW9uYXJ5W2RvbWFpbl1bbG9jYWxlXVtrZXldO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNpbmd1bGFyIGZvcm1cbiAgICAgICAgaWYgKCFtc2dpZF9wbHVyYWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnQodHJhbnNsYXRpb24sIG4sIG9wdGlvbnMsIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBsdXJhbCBvbmVcbiAgICAgICAgb3B0aW9ucy5wbHVyYWxGb3JtID0gdHJ1ZTtcbiAgICAgICAgbGV0IHZhbHVlID0gZXhpc3QgPyB0cmFuc2xhdGlvbiA6IFttc2dpZCwgbXNnaWRfcGx1cmFsXTtcbiAgICAgICAgcmV0dXJuIHRoaXMudCh2YWx1ZSwgbiwgb3B0aW9ucywgLi4uYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNwbGl0IGEgbG9jYWxlIGludG8gcGFyZW50IGxvY2FsZXMuIFwiZXMtQ09cIiAtPiBbXCJlcy1DT1wiLCBcImVzXCJdXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbG9jYWxlIC0gVGhlIGxvY2FsZSBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIEFuIGFycmF5IG9mIGxvY2FsZXMuXG4gICAgICovXG4gICAgZXhwYW5kTG9jYWxlKGxvY2FsZSkge1xuICAgICAgICBsZXQgbG9jYWxlcyA9IFtsb2NhbGVdO1xuICAgICAgICBsZXQgaSA9IGxvY2FsZS5sYXN0SW5kZXhPZignLScpO1xuICAgICAgICB3aGlsZSAoaSA+IDApIHtcbiAgICAgICAgICAgIGxvY2FsZSA9IGxvY2FsZS5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgIGxvY2FsZXMucHVzaChsb2NhbGUpO1xuICAgICAgICAgICAgaSA9IGxvY2FsZS5sYXN0SW5kZXhPZignLScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb2NhbGVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTcGxpdCBhIGxvY2FsZSBpbnRvIHBhcmVudCBsb2NhbGVzLiBcImVzLUNPXCIgLT4gW1wiZXMtQ09cIiwgXCJlc1wiXVxuICAgICAqXG4gICAgICogQHBhcmFtIHBsdXJhbEZvcm0gLSBQbHVyYWwgZm9ybSBzdHJpbmcuLlxuICAgICAqIEByZXR1cm4gQW4gZnVuY3Rpb24gdG8gY29tcHV0ZSBwbHVyYWwgZm9ybXMuXG4gICAgICovXG4gICAgZ2V0UGx1cmFsRnVuYyhwbHVyYWxGb3JtKSB7XG4gICAgICAgIC8vIFBsdXJhbCBmb3JtIHN0cmluZyByZWdleHBcbiAgICAgICAgLy8gdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vT3JhbmdlLU9wZW5Tb3VyY2UvZ2V0dGV4dC5qcy9ibG9iL21hc3Rlci9saWIuZ2V0dGV4dC5qc1xuICAgICAgICAvLyBwbHVyYWwgZm9ybXMgbGlzdCBhdmFpbGFibGUgaGVyZSBodHRwOi8vbG9jYWxpemF0aW9uLWd1aWRlLnJlYWR0aGVkb2NzLm9yZy9lbi9sYXRlc3QvbDEwbi9wbHVyYWxmb3Jtcy5odG1sXG4gICAgICAgIGxldCBwZl9yZSA9IG5ldyBSZWdFeHAoJ15cXFxccypucGx1cmFsc1xcXFxzKj1cXFxccypbMC05XStcXFxccyo7XFxcXHMqcGx1cmFsXFxcXHMqPVxcXFxzKig/OlxcXFxzfFstXFxcXD9cXFxcfCY9ITw+KyovJTo7bjAtOV8oKV0pKycpO1xuICAgICAgICBpZiAoIXBmX3JlLnRlc3QocGx1cmFsRm9ybSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoR2V0dGV4dC5zdHJmbXQoJ1RoZSBwbHVyYWwgZm9ybSBcIiUxXCIgaXMgbm90IHZhbGlkJywgcGx1cmFsRm9ybSkpO1xuICAgICAgICAvLyBDYXJlZnVsIGhlcmUsIHRoaXMgaXMgYSBoaWRkZW4gZXZhbCgpIGVxdWl2YWxlbnQuLlxuICAgICAgICAvLyBSaXNrIHNob3VsZCBiZSByZWFzb25hYmxlIHRob3VnaCBzaW5jZSB3ZSB0ZXN0IHRoZSBwbHVyYWxGb3JtIHRocm91Z2ggcmVnZXggYmVmb3JlXG4gICAgICAgIC8vIHRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL09yYW5nZS1PcGVuU291cmNlL2dldHRleHQuanMvYmxvYi9tYXN0ZXIvbGliLmdldHRleHQuanNcbiAgICAgICAgLy8gVE9ETzogc2hvdWxkIHRlc3QgaWYgaHR0cHM6Ly9naXRodWIuY29tL3NvbmV5L2pzZXAgcHJlc2VudCBhbmQgdXNlIGl0IGlmIHNvXG4gICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oJ24nLCAnbGV0IHBsdXJhbCwgbnBsdXJhbHM7ICcgK1xuICAgICAgICAgICAgcGx1cmFsRm9ybSArXG4gICAgICAgICAgICAnIHJldHVybiB7IG5wbHVyYWxzOiBucGx1cmFscywgcGx1cmFsOiAocGx1cmFsID09PSB0cnVlID8gMSA6IChwbHVyYWwgPyBwbHVyYWwgOiAwKSkgfTsnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHRoZSBjb250ZXh0IGRlbGltaXRlciBmcm9tIHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzdHIgLSBUcmFuc2xhdGlvbiBzdHJpbmcuXG4gICAgICogQHJldHVybiBBIHRyYW5zbGF0aW9uIHN0cmluZyB3aXRob3V0IGNvbnRleHQuXG4gICAgICovXG4gICAgcmVtb3ZlQ29udGV4dChzdHIpIHtcbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgY29udGV4dCwgcmVtb3ZlIGl0XG4gICAgICAgIGlmIChzdHIuaW5kZXhPZih0aGlzLl9jb250ZXh0RGVsaW1pdGVyKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBwYXJ0cyA9IHN0ci5zcGxpdCh0aGlzLl9jb250ZXh0RGVsaW1pdGVyKTtcbiAgICAgICAgICAgIHJldHVybiBwYXJ0c1sxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm9wZXIgdHJhbnNsYXRpb24gZnVuY3Rpb24gdGhhdCBoYW5kbGUgcGx1cmFscyBhbmQgZGlyZWN0aXZlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtZXNzYWdlcyAtIExpc3Qgb2YgdHJhbnNsYXRpb24gc3RyaW5ncy5cbiAgICAgKiBAcGFyYW0gbiAtIFRoZSBudW1iZXIgZm9yIHBsdXJhbGl6YXRpb24uXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUcmFuc2xhdGlvbiBvcHRpb25zLlxuICAgICAqIEBwYXJhbSBhcmdzIC0gQW55IHZhcmlhYmxlcyB0byBpbnRlcnBvbGF0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gQSB0cmFuc2xhdGlvbiBzdHJpbmcgd2l0aG91dCBjb250ZXh0LlxuICAgICAqXG4gICAgICogIyMjIE5vdGVzXG4gICAgICogQ29udGFpbnMganVpY3kgcGFydHMgb2YgaHR0cHM6Ly9naXRodWIuY29tL09yYW5nZS1PcGVuU291cmNlL2dldHRleHQuanMvYmxvYi9tYXN0ZXIvbGliLmdldHRleHQuanNcbiAgICAgKi9cbiAgICB0KG1lc3NhZ2VzLCBuLCBvcHRpb25zLCAuLi5hcmdzKSB7XG4gICAgICAgIC8vIFNpbmd1bGFyIGlzIHZlcnkgZWFzeSwganVzdCBwYXNzIGRpY3Rpb25hcnkgbWVzc2FnZSB0aHJvdWdoIHN0cmZtdFxuICAgICAgICBpZiAoIW9wdGlvbnMucGx1cmFsRm9ybSlcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5fc3RyaW5nc1ByZWZpeCArXG4gICAgICAgICAgICAgICAgR2V0dGV4dC5zdHJmbXQodGhpcy5yZW1vdmVDb250ZXh0KG1lc3NhZ2VzWzBdKSwgLi4uYXJncykpO1xuICAgICAgICBsZXQgcGx1cmFsO1xuICAgICAgICAvLyBpZiBhIHBsdXJhbCBmdW5jIGlzIGdpdmVuLCB1c2UgdGhhdCBvbmVcbiAgICAgICAgaWYgKG9wdGlvbnMucGx1cmFsRnVuYykge1xuICAgICAgICAgICAgcGx1cmFsID0gb3B0aW9ucy5wbHVyYWxGdW5jKG4pO1xuICAgICAgICAgICAgLy8gaWYgcGx1cmFsIGZvcm0gbmV2ZXIgaW50ZXJwcmV0ZWQgYmVmb3JlLCBkbyBpdCBub3cgYW5kIHN0b3JlIGl0XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXRoaXMuX3BsdXJhbEZ1bmNzW29wdGlvbnMubG9jYWxlIHx8ICcnXSkge1xuICAgICAgICAgICAgdGhpcy5fcGx1cmFsRnVuY3Nbb3B0aW9ucy5sb2NhbGUgfHwgJyddID0gdGhpcy5nZXRQbHVyYWxGdW5jKHRoaXMuX3BsdXJhbEZvcm1zW29wdGlvbnMubG9jYWxlIHx8ICcnXSk7XG4gICAgICAgICAgICBwbHVyYWwgPSB0aGlzLl9wbHVyYWxGdW5jc1tvcHRpb25zLmxvY2FsZSB8fCAnJ10obik7XG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRoZSBwbHVyYWwgZnVuY3Rpb24sIGNvbXB1dGUgdGhlIHBsdXJhbCByZXN1bHRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBsdXJhbCA9IHRoaXMuX3BsdXJhbEZ1bmNzW29wdGlvbnMubG9jYWxlIHx8ICcnXShuKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHByb2JsZW0gd2l0aCBwbHVyYWxzLCBmYWxsYmFjayB0byBzaW5ndWxhciBvbmVcbiAgICAgICAgaWYgKCd1bmRlZmluZWQnID09PSB0eXBlb2YgIXBsdXJhbC5wbHVyYWwgfHxcbiAgICAgICAgICAgIHBsdXJhbC5wbHVyYWwgPiBwbHVyYWwubnBsdXJhbHMgfHxcbiAgICAgICAgICAgIG1lc3NhZ2VzLmxlbmd0aCA8PSBwbHVyYWwucGx1cmFsKVxuICAgICAgICAgICAgcGx1cmFsLnBsdXJhbCA9IDA7XG4gICAgICAgIHJldHVybiAodGhpcy5fc3RyaW5nc1ByZWZpeCArXG4gICAgICAgICAgICBHZXR0ZXh0LnN0cmZtdCh0aGlzLnJlbW92ZUNvbnRleHQobWVzc2FnZXNbcGx1cmFsLnBsdXJhbF0pLCAuLi5bbl0uY29uY2F0KGFyZ3MpKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCBtZXNzYWdlcyBhZnRlciBsb2FkaW5nIHRoZW0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZG9tYWluIC0gVGhlIHRyYW5zbGF0aW9uIGRvbWFpbi5cbiAgICAgKiBAcGFyYW0gbG9jYWxlIC0gVGhlIHRyYW5zbGF0aW9uIGxvY2FsZS5cbiAgICAgKiBAcGFyYW0gbWVzc2FnZXMgLSBMaXN0IG9mIHRyYW5zbGF0aW9uIHN0cmluZ3MuXG4gICAgICogQHBhcmFtIHBsdXJhbEZvcm1zIC0gUGx1cmFsIGZvcm0gc3RyaW5nLlxuICAgICAqXG4gICAgICogIyMjIE5vdGVzXG4gICAgICogQ29udGFpbnMganVpY3kgcGFydHMgb2YgaHR0cHM6Ly9naXRodWIuY29tL09yYW5nZS1PcGVuU291cmNlL2dldHRleHQuanMvYmxvYi9tYXN0ZXIvbGliLmdldHRleHQuanNcbiAgICAgKi9cbiAgICBzZXRNZXNzYWdlcyhkb21haW4sIGxvY2FsZSwgbWVzc2FnZXMsIHBsdXJhbEZvcm1zKSB7XG4gICAgICAgIGRvbWFpbiA9IG5vcm1hbGl6ZURvbWFpbihkb21haW4pO1xuICAgICAgICBpZiAocGx1cmFsRm9ybXMpXG4gICAgICAgICAgICB0aGlzLl9wbHVyYWxGb3Jtc1tsb2NhbGVdID0gcGx1cmFsRm9ybXM7XG4gICAgICAgIGlmICghdGhpcy5fZGljdGlvbmFyeVtkb21haW5dKVxuICAgICAgICAgICAgdGhpcy5fZGljdGlvbmFyeVtkb21haW5dID0ge307XG4gICAgICAgIHRoaXMuX2RpY3Rpb25hcnlbZG9tYWluXVtsb2NhbGVdID0gbWVzc2FnZXM7XG4gICAgfVxufVxuZXhwb3J0IHsgR2V0dGV4dCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2V0dGV4dC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSB0cmFuc2xhdGlvblxuICovXG4vLyBOb3RlOiBrZWVwIGluIGFscGhhYmV0aWNhbCBvcmRlci4uLlxuZXhwb3J0ICogZnJvbSAnLi9iYXNlJztcbmV4cG9ydCAqIGZyb20gJy4vZ2V0dGV4dCc7XG5leHBvcnQgKiBmcm9tICcuL21hbmFnZXInO1xuZXhwb3J0ICogZnJvbSAnLi9zZXJ2ZXInO1xuZXhwb3J0ICogZnJvbSAnLi90b2tlbnMnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgR2V0dGV4dCB9IGZyb20gJy4vZ2V0dGV4dCc7XG5pbXBvcnQgeyBUcmFuc2xhdG9yQ29ubmVjdG9yIH0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHsgbm9ybWFsaXplRG9tYWluIH0gZnJvbSAnLi91dGlscyc7XG4vKipcbiAqIFRyYW5zbGF0aW9uIE1hbmFnZXJcbiAqL1xuZXhwb3J0IGNsYXNzIFRyYW5zbGF0aW9uTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IodHJhbnNsYXRpb25zVXJsID0gJycsIHN0cmluZ3NQcmVmaXgsIHNlcnZlclNldHRpbmdzKSB7XG4gICAgICAgIHRoaXMuX2RvbWFpbkRhdGEgPSB7fTtcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRpb25CdW5kbGVzID0ge307XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RvciA9IG5ldyBUcmFuc2xhdG9yQ29ubmVjdG9yKHRyYW5zbGF0aW9uc1VybCwgc2VydmVyU2V0dGluZ3MpO1xuICAgICAgICB0aGlzLl9zdHJpbmdzUHJlZml4ID0gc3RyaW5nc1ByZWZpeCB8fCAnJztcbiAgICAgICAgdGhpcy5fZW5nbGlzaEJ1bmRsZSA9IG5ldyBHZXR0ZXh0KHsgc3RyaW5nc1ByZWZpeDogdGhpcy5fc3RyaW5nc1ByZWZpeCB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmV0Y2ggdGhlIGxvY2FsaXphdGlvbiBkYXRhIGZyb20gdGhlIHNlcnZlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsb2NhbGUgVGhlIGxhbmd1YWdlIGxvY2FsZSB0byB1c2UgZm9yIHRyYW5zbGF0aW9ucy5cbiAgICAgKi9cbiAgICBhc3luYyBmZXRjaChsb2NhbGUpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdGhpcy5fY3VycmVudExvY2FsZSA9IGxvY2FsZTtcbiAgICAgICAgdGhpcy5fbGFuZ3VhZ2VEYXRhID0gYXdhaXQgdGhpcy5fY29ubmVjdG9yLmZldGNoKHsgbGFuZ3VhZ2U6IGxvY2FsZSB9KTtcbiAgICAgICAgdGhpcy5fZG9tYWluRGF0YSA9ICgoX2EgPSB0aGlzLl9sYW5ndWFnZURhdGEpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kYXRhKSB8fCB7fTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IChfYiA9IHRoaXMuX2xhbmd1YWdlRGF0YSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm1lc3NhZ2U7XG4gICAgICAgIGlmIChtZXNzYWdlICYmIGxvY2FsZSAhPT0gJ2VuJykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvYWQgdHJhbnNsYXRpb24gYnVuZGxlcyBmb3IgYSBnaXZlbiBkb21haW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZG9tYWluIFRoZSB0cmFuc2xhdGlvbiBkb21haW4gdG8gdXNlIGZvciB0cmFuc2xhdGlvbnMuXG4gICAgICovXG4gICAgbG9hZChkb21haW4pIHtcbiAgICAgICAgaWYgKHRoaXMuX2RvbWFpbkRhdGEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50TG9jYWxlID09ICdlbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5nbGlzaEJ1bmRsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbWFpbiA9IG5vcm1hbGl6ZURvbWFpbihkb21haW4pO1xuICAgICAgICAgICAgICAgIGlmICghKGRvbWFpbiBpbiB0aGlzLl90cmFuc2xhdGlvbkJ1bmRsZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0cmFuc2xhdGlvbkJ1bmRsZSA9IG5ldyBHZXR0ZXh0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbWFpbjogZG9tYWluLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxlOiB0aGlzLl9jdXJyZW50TG9jYWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nc1ByZWZpeDogdGhpcy5fc3RyaW5nc1ByZWZpeFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvbWFpbiBpbiB0aGlzLl9kb21haW5EYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWV0YWRhdGEgPSB0aGlzLl9kb21haW5EYXRhW2RvbWFpbl1bJyddO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCdwbHVyYWxfZm9ybXMnIGluIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGEucGx1cmFsRm9ybXMgPSBtZXRhZGF0YS5wbHVyYWxfZm9ybXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG1ldGFkYXRhLnBsdXJhbF9mb3JtcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kb21haW5EYXRhW2RvbWFpbl1bJyddID0gbWV0YWRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbkJ1bmRsZS5sb2FkSlNPTih0aGlzLl9kb21haW5EYXRhW2RvbWFpbl0sIGRvbWFpbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNsYXRpb25CdW5kbGVzW2RvbWFpbl0gPSB0cmFuc2xhdGlvbkJ1bmRsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zbGF0aW9uQnVuZGxlc1tkb21haW5dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuZ2xpc2hCdW5kbGU7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYW5hZ2VyLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFVSTEV4dCB9IGZyb20gJ0BqdXB5dGVybGFiL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBTZXJ2ZXJDb25uZWN0aW9uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvc2VydmljZXMnO1xuLyoqXG4gKiBUaGUgdXJsIGZvciB0aGUgdHJhbnNsYXRpb25zIHNlcnZpY2UuXG4gKi9cbmNvbnN0IFRSQU5TTEFUSU9OU19TRVRUSU5HU19VUkwgPSAnYXBpL3RyYW5zbGF0aW9ucyc7XG4vKipcbiAqIENhbGwgdGhlIEFQSSBleHRlbnNpb25cbiAqXG4gKiBAcGFyYW0gbG9jYWxlIEFQSSBSRVNUIGVuZCBwb2ludCBmb3IgdGhlIGV4dGVuc2lvblxuICogQHBhcmFtIGluaXQgSW5pdGlhbCB2YWx1ZXMgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyBUaGUgcmVzcG9uc2UgYm9keSBpbnRlcnByZXRlZCBhcyBKU09OXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1ZXN0VHJhbnNsYXRpb25zQVBJKHRyYW5zbGF0aW9uc1VybCA9ICcnLCBsb2NhbGUgPSAnJywgaW5pdCA9IHt9LCBzZXJ2ZXJTZXR0aW5ncyA9IHVuZGVmaW5lZCkge1xuICAgIC8vIE1ha2UgcmVxdWVzdCB0byBKdXB5dGVyIEFQSVxuICAgIGNvbnN0IHNldHRpbmdzID0gc2VydmVyU2V0dGluZ3MgIT09IG51bGwgJiYgc2VydmVyU2V0dGluZ3MgIT09IHZvaWQgMCA/IHNlcnZlclNldHRpbmdzIDogU2VydmVyQ29ubmVjdGlvbi5tYWtlU2V0dGluZ3MoKTtcbiAgICB0cmFuc2xhdGlvbnNVcmwgPVxuICAgICAgICB0cmFuc2xhdGlvbnNVcmwgfHwgYCR7c2V0dGluZ3MuYXBwVXJsfS8ke1RSQU5TTEFUSU9OU19TRVRUSU5HU19VUkx9L2A7XG4gICAgY29uc3QgcmVxdWVzdFVybCA9IFVSTEV4dC5qb2luKHNldHRpbmdzLmJhc2VVcmwsIHRyYW5zbGF0aW9uc1VybCwgbG9jYWxlKTtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgdHJ5IHtcbiAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCBTZXJ2ZXJDb25uZWN0aW9uLm1ha2VSZXF1ZXN0KHJlcXVlc3RVcmwsIGluaXQsIHNldHRpbmdzKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBTZXJ2ZXJDb25uZWN0aW9uLk5ldHdvcmtFcnJvcihlcnJvcik7XG4gICAgfVxuICAgIGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm90IGEgSlNPTiByZXNwb25zZSBib2R5LicsIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBTZXJ2ZXJDb25uZWN0aW9uLlJlc3BvbnNlRXJyb3IocmVzcG9uc2UsIGRhdGEubWVzc2FnZSB8fCBkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXJ2ZXIuanMubWFwIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IERhdGFDb25uZWN0b3IgfSBmcm9tICdAanVweXRlcmxhYi9zdGF0ZWRiJztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgcmVxdWVzdFRyYW5zbGF0aW9uc0FQSSB9IGZyb20gJy4vc2VydmVyJztcbmV4cG9ydCBjb25zdCBJVHJhbnNsYXRvckNvbm5lY3RvciA9IG5ldyBUb2tlbignQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb246SVRyYW5zbGF0b3JDb25uZWN0b3InKTtcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdG9yQ29ubmVjdG9yIGV4dGVuZHMgRGF0YUNvbm5lY3RvciB7XG4gICAgY29uc3RydWN0b3IodHJhbnNsYXRpb25zVXJsID0gJycsIHNlcnZlclNldHRpbmdzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3RyYW5zbGF0aW9uc1VybCA9IHRyYW5zbGF0aW9uc1VybDtcbiAgICAgICAgdGhpcy5fc2VydmVyU2V0dGluZ3MgPSBzZXJ2ZXJTZXR0aW5ncztcbiAgICB9XG4gICAgYXN5bmMgZmV0Y2gob3B0cykge1xuICAgICAgICByZXR1cm4gcmVxdWVzdFRyYW5zbGF0aW9uc0FQSSh0aGlzLl90cmFuc2xhdGlvbnNVcmwsIG9wdHMubGFuZ3VhZ2UsIHt9LCB0aGlzLl9zZXJ2ZXJTZXR0aW5ncyk7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IElUcmFuc2xhdG9yID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi90cmFuc2xhdGlvbjpJVHJhbnNsYXRvcicpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9rZW5zLmpzLm1hcCIsIi8qKlxuICogTm9ybWFsaXplIGRvbWFpblxuICpcbiAqIEBwYXJhbSBkb21haW4gRG9tYWluIHRvIG5vcm1hbGl6ZVxuICogQHJldHVybnMgTm9ybWFsaXplZCBkb21haW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZURvbWFpbihkb21haW4pIHtcbiAgICByZXR1cm4gZG9tYWluLnJlcGxhY2UoJy0nLCAnXycpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbHMuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==